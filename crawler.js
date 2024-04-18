function Crawler(level) {
  this.level = level;
  this.page = 0;
  this.domParser = new DOMParser();
}

Crawler.prototype.crawl = async function () {
  const songList = [];

  while (this.page < 100) {
    const url = `https://p.eagate.573.jp/game/popn/unilab/playdata/mu_lv.html?page=${this.page}&level=${this.level}`;
    const res = await fetch(url);
    const htmlText = await this.resToText(res);
    const document = this.domParser.parseFromString(htmlText, 'text/html');
    const [header, ...songElements] = document.querySelectorAll("ul.mu_list_table > li");

    if (songElements.length == 0) {
      break;
    }

    const promises = Array.from(songElements).map((e) => this.elementToSongData(e));

    for (const promise of promises) {

      songList.push(await promise);
    }

    this.page++;
  }

  return songList;
}

Crawler.prototype.resToText = async function (res) {
  const buffer = await res.arrayBuffer();

  if (res.headers.get("Content-Type").includes("UTF-8")) {
    return new TextDecoder().decode(buffer);
  } else {
    return new TextDecoder("Shift_JIS").decode(buffer)
  }
}

Crawler.prototype.elementToSongData = async function (el) {
  const titleElement = el.children[0];
  const scoreElement = el.children[3];

  const id = this.getSongIdFromUrl(titleElement.firstChild.href);

  const bads = await this.getBadsBySongId(id);

  return {
    id,
    song: titleElement.firstChild.textContent,
    bads,
    score: scoreElement.textContent,
    medal: scoreElement.firstChild.src,
  }
}

Crawler.prototype.getSongIdFromUrl = function (url) {
  const queries = Object.fromEntries(
    url.split('?')[1]
      .split('&')
      .map((e) => e.split('='))
  );

  return decodeURI(queries.no);
}

Crawler.prototype.getBadsBySongId = async function (songId) {
  const detailUrl = `https://p.eagate.573.jp/game/popn/unilab/playdata/mu_detail.html?no=${songId}&back=mu_top`;
  const res = await fetch(detailUrl);
  const htmlText = await this.resToText(res);
  const document = this.domParser.parseFromString(htmlText, 'text/html');
  const [easyEl, normalEl, hyperEl, exEl] = document.querySelectorAll(".my_detail_tb_box > .mu_detail_tb");
  const [coolEl, greatEl, goodEl, badEl] = exEl.querySelectorAll('.judge');

  const badValueEl = badEl.querySelector('.play_value');

  return badValueEl.textContent;
}

const crawler = new Crawler(50);
const drawer = new Drawer(50);

crawler.crawl().then((e) => drawer.draw(e));