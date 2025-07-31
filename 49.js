async function crawl(...levels) {
  let domparser = new DOMParser();

  console.log("popn data crawler running.\nPLZ wait a minute...");

  const PLAY_DATA_URL = "https://p.eagate.573.jp/game/popn/jamfizz/playdata";
  function resToText(res) {
    return res.arrayBuffer().then((buffer) => {
      if (res.headers.get("Content-Type").includes("UTF-8")) {
        return new TextDecoder().decode(buffer);
      } else {
        return new TextDecoder("Shift_JIS").decode(buffer)
      }
    })
  }

  function whatever(url, level) {
    return fetch(url)
      .then(resToText)
      .then((text) => domparser.parseFromString(text, "text/html"))
      .then((doc) => doc.querySelectorAll("ul.mu_list_table > li"))
      .then((lis) => {
        return Array.from(lis)
          .filter((li) => li.firstElementChild.className.startsWith("col"))
          .map((li) => [
            // 순서대로 점수 메달 곡제목
            li.children[3].textContent,
            li.children[3].firstChild.src,
            li.firstElementChild.firstElementChild.textContent,
          ])
          .map(([score, medal, song]) => {
            return {
              song,
              score,
              medal,
              level,
            };
          });
      });
  }

  let arr = new Array();
  for (let i = 0; i < 15; i++) {
    arr.push(...(levels.map(level => [i, level])));
  }

  const promises = arr.map(([page, level]) =>
    whatever(`${PLAY_DATA_URL}/mu_lv.html?page=${page}&version=0&category=0&keyword=&lv=${level}&sort=none&sort_type=none`, level)
  );

  const s = (await Promise.all(promises))
    .flat()
    .sort((a, b) => b.point - a.point);
  console.log({ s })
  return s;
}

async function render49(playData) {
  function logMapElements(value, key, map) {
    console.log(`m[${key}] = ${value.x}, ${value.y}`);
  }

  const csv49 = `24/7 Popperz,300,425
BabeL ～Next Story～,180,580
Black Emperor,937,1895
Bossa Gabba,937,1628
Blue River,180,950
Candy Crime Toe Shoes,180,1196
CHERNOBOG,432,1812
DIAVOLO,1237,1032
Eine Haube ～聖地の果てにあるもの～,937,2080
Elemental Creation,432,1383
Festum Duodecimum!,1237,1547
GALAXY FOREST 11.6&12,1237,2163
Geiselhaus,432,1628
Hades Doll,180,1278
Hell? or Heaven?,1237,1115
INF-B《L-aste-R》,180,1547
Innocence,180,1032
I'm on Fire,1237,395
K∀MUY,432,580
Lachryma《Re:Queen’M》,685,1465
Last Twilight,685,2080
Line Times,1237,477
ma plume,685,1196
MADSPEED狂信道,685,580
Megalara Garuda,937,1708
moon_child,685,1812
neu,685,765
ΩVERSOUL,685,1383
perditus†paradisus,685,1708
Prey,180,2163
QuoN,432,1895
Remain,685,1547
RINИE,937,950
SailRen,432,2362
Satan,1237,2245
Sky High,180,2362
StrayedCatz,937,1547
the Chameleon,685,2163
Timepiece phase II,432,2163
trideca,180,2080
Triple Counter,685,950
Triple Cross,432,1115
Ubertreffen,937,1032
uen,937,580
Unknown Region,432,1196
Vinculum stellarum,432,1547
virkatoの主題によるperson09風超絶技巧変奏曲,937,1115
VOLAQUAS,180,1708
XROSS INFECTION,180,1628
zeeros,937,1812
ZETA～素数の世界と超越者～,937,765
Zirkfied,432,765
アストライアの双皿,937,2163
想い出をありがとう,1237,1465
悲しいね,1237,2080
C18H27NO3,937,1465
激走！！ヤング☆ダンプ！,180,765
限界食堂,432,1032
恋歌疾風！かるたクイーンいろは,180,1812
最小三倍完全数,685,1032
ジオメトリック∮ティーパーティー,432,950
雫,937,1383
鎬,685,1628
シャムシールの舞,180,2245
ちくわパフェだよ☆ＣＫＰ,432,847
終末を追う者,432,1708
生命の焔纏いて,180,1383
世界の果てに約束の凱歌を,685,1115
世界の果てに約束の凱歌を -Advent-,180,847
葬送のエウロパ,432,1465
天空の夜明け,180,1895
IX,685,2362
西馬込交通曲,802,425
バッドエンド・シンドローム,180,1976
ピアノ独奏無言歌 "灰燼",180,662
ブタパンチのテーマ,685,1895
めうめうぺったんたん！！,685,847
未完成ノ蒸氣驅動乙女,432,2080
明滅の果てに,432,1976
粋 -IKI-,180,1465
彼岸花,180,1115
pump up dA CORE,937,847
天泣,937,1196`
  let newCsv = csv49.trim();
  const m = new Map();
  newCsv.split('\n').map(line => {
    var song = line.split(',');
    m.set(song[0], { x: song[1], y: song[2] })
  });
  m.forEach(logMapElements);

  document.body.innerHTML = `
   <body>
   <canvas id="canvas" width="1500" height="2470">
  </canvas>
  </body>
    `;
  const canvas = document.getElementById("canvas");
  const bg = new Image();
  bg.src = "https://rawcdn.githack.com/sonohoshi/children-s-sketchbook/64d78c4ac6d4adbbe08079ef13dc7d11d4e947d5/img/49table.png";
  bg.crossOrigin = 'anonymous';
  bg.onload = function () {
    canvas.getContext("2d").drawImage(bg, 0, 0)
    playData.forEach(element => {
      console.log(`try draw ${element.song}`);
      var ctx = canvas.getContext("2d");
      var xy = m.get(element.song);
      var img = new Image();
      img.onload = function () {
        ctx.drawImage(img, xy.x, xy.y, 40, 40)
      }
      img.src = element.medal;
    });
  }
}

crawl(49).then(data => render49(data));
