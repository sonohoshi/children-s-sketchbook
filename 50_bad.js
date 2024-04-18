/* 크롤러 */

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

function Drawer(level) {
  this.level = level;

  this.presetX = [
    263, 678, 1095
  ];

  this.presetY = [
    471, 693, 896,
    1123, 1344, 1547,
    1770, 1997, 2219
  ];

  this.songData = [
    {
      id: 'yIlr2ptoxnRY4enX8Cn/aQ%3D%3D',
      song: "25 o'clock the WORLD",
      posX: this.presetX[2],
      posY: this.presetY[1]
    },
    {
      id: 'LPIFtx8CNKhG0W1AvSphIg%3D%3D',
      song: 'BabeL ～MODEL DD101～',
      posX: this.presetX[0],
      posY: this.presetY[6]
    },
    {
      id: 'lYwRjEjGgk3M44ADutSKuQ%3D%3D',
      song: 'Blue River',
      posX: this.presetX[1],
      posY: this.presetY[8]
    },
    {
      id: 'OoEXEte%2BT31fFiw63CpbPg%3D%3D',
      song: 'Chaos:Q',
      posX: this.presetX[1],
      posY: this.presetY[0]
    },
    {
      id: 'gwdzeAUbAhWPhTyZfaL/LA%3D%3D',
      song: 'ΔΟΓΜΑ',
      posX: this.presetX[2],
      posY: this.presetY[8]
    },
    {
      id: 'f11dcHCK9zwRaIDkGCQK1A%3D%3D',
      song: 'НУМЛ',
      posX: this.presetX[1],
      posY: this.presetY[7]
    },
    {
      id: '9iTaxtyPLRon/bRFfhvPBw%3D%3D',
      song: 'L-an!ma',
      posX: this.presetX[0],
      posY: this.presetY[1]
    },
    {
      id: 'QwgkYc/3nypegzbzhHWt7A%3D%3D',
      song: 'ma plume',
      posX: this.presetX[1],
      posY: this.presetY[5]
    },
    {
      id: 'S6lsyiUA%2BNrm0zzGwbAm7Q%3D%3D',
      song: 'o†o',
      posX: this.presetX[0],
      posY: this.presetY[0]
    },
    {
      id: 'uYtVDD8kWHzolqgs17Egcw%3D%3D',
      song: 'perditus†paradisus',
      posX: this.presetX[1],
      posY: this.presetY[1]
    },
    {
      id: 'eXob85e4ewdGYy89XX0oNg%3D%3D',
      song: 'Popperz Chronicle',
      posX: this.presetX[2],
      posY: this.presetY[0],
    },
    {
      id: 'cfF93fNxKKxo92aT9qDuSQ%3D%3D',
      song: 'Popperz Chronicle',
      posX: this.presetX[1],
      posY: this.presetY[3]
    },
    {
      id: 'MtWwI3HiU2Zf3PQLZ1NTUA%3D%3D',
      song: 'virkatoの主題によるperson09風超絶技巧変奏曲',
      posX: this.presetX[0],
      posY: this.presetY[5]
    },
    {
      id: '/BAvTuSFXEVJYPVxP%2BdBEA%3D%3D',
      song: '音楽',
      posX: this.presetX[1],
      posY: this.presetY[2]
    },
    {
      id: 'wQR9ItkbCwRriXfIqokFxw%3D%3D',
      song: 'シュレーディンガーの猫',
      posX: this.presetX[0],
      posY: this.presetY[7]
    },
    {
      id: 'hhHOwfu9MgEEwNXrC/eEJA%3D%3D',
      song: '序',
      posX: this.presetX[1],
      posY: this.presetY[4]
    },
    {
      id: 'O3RIbi0WGuD3GmbzH7vQjQ%3D%3D',
      song: '少年は空を辿る',
      posX: this.presetX[0],
      posY: this.presetY[4]
    },
    {
      id: 'P21kx2ZcVk6GBWBnh%2Bmi7w%3D%3D',
      song: '真超深ＴＩＯＮ',
      posX: this.presetX[2],
      posY: this.presetY[4]
    },
    {
      id: 'xRI0wzMn1jgN3hGaQGj%2BnQ%3D%3D',
      song: '生命の焔纏いて',
      posX: this.presetX[2],
      posY: this.presetY[3]
    },
    {
      id: 'Bmo8b1iTqwsIcUcbGSY2Sg%3D%3D',
      song: '生命の環を紡いで',
      posX: this.presetX[0],
      posY: this.presetY[8]
    },
    {
      id: 'knrOTlBzn/YPU/fLrHZ0hg%3D%3D',
      song: '辿る君を超えて',
      posX: this.presetX[0],
      posY: this.presetY[3]
    },
    {
      id: 'rkYyiMBeGT%2Bdb1St7YTXtw%3D%3D',
      song: 'ピアノ協奏曲第１番”蠍火”',
      posX: this.presetX[0],
      posY: this.presetY[2]
    },
  ];
}

/* 캔버스 드로어 */

Drawer.prototype.draw = function (playData) {
  this.initBodyElement();
  this.drawTable(playData);
}

Drawer.prototype.initBodyElement = function () {
  document.body.innerHTML = `
    <body>
      <canvas id="canvas" width="1500" height="2344">
      </canvas>
    </body>
  `;
}

Drawer.prototype.drawMedals = function (playData, songData) {
  const canvas = document.getElementById("canvas");
  playData.forEach((element) => {
    var ctx = canvas.getContext("2d");
    var xy = songData.find((e) => e.id == element.id);
    if (xy) {
      var img = new Image();
      img.onload = function () {
        ctx.drawImage(img, xy.posX, xy.posY, 50, 50)
        ctx.font = "32px sans-serif";
        ctx.fillText(element.bads, xy.posX + 195, xy.posY - 32.5);
      }
      img.src = element.medal;
    }
  });
};

Drawer.prototype.drawTable = function (playData) {
  const canvas = document.getElementById("canvas");
  const bg = new Image();
  const drawMedals = this.drawMedals;
  const songData = this.songData;
  bg.src = `https://rawcdn.githack.com/sonohoshi/children-s-sketchbook/96906144d80d0dc758520853a421eee62d10777b/img/${this.level}table.png`;
  bg.crossOrigin = 'anonymous';
  bg.onload = function () {
    canvas.getContext("2d").drawImage(bg, 0, 0);
    drawMedals(playData, songData);
  };
}

/* 스크립트 러너 */

function Runner(level) {
  this.crawler = new Crawler(level);
  this.drawer = new Drawer(level);
}

Runner.prototype.run = async function () {
  const playData = await this.crawler.crawl();
  this.drawer.draw(playData);
}

new Runner(50).run();