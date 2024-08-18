async function crawl(...levels) {
  let domparser = new DOMParser();

  console.log("popn data crawler running.\nPLZ wait a minute...");

  const PLAY_DATA_URL = "https://p.eagate.573.jp/game/popn/unilab/playdata";
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
    whatever(`${PLAY_DATA_URL}/mu_lv.html?page=${page}&level=${level}`, level)
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

  const csv49 = `24/7 Popperz,223,425
BabeL ～Next Story～,174,583
Black Emperor,937,1825
Bossa Gabba,937,1555
Blue River,174,955
Candy Crime Toe Shoes,174,1203
CHERNOBOG,427,1740
DIAVOLO,1237,1039
Eine Haube ～聖地の果てにあるもの～,937,2010
Elemental Creation,427,1308
Festum Duodecimum!,1237,1472
GALAXY FOREST 11.6&12 ,1237,2092
Geiselhaus,427,1555
Hell? or Heaven?,1237,1121
INF-B《L-aste-R》,174,1472
Innocence,174,1039
I'm on Fire,1237,395
K∀MUY,427,583
Lachryma《Re:Queen’M》,682,1390
Last Twilight,682,2010
Line Times,1237,477
ma plume,682,1203
MADSPEED狂信道,682,583
Mecha Kawa Breaker!!,894,425
moon_child,682,1740
neu,682,765
ΩVERSOUL,682,1308
perditus†paradisus,682,1638
Prey,174,2092
QuoN,427,1825
Remain,682,1472
RINИE,937,955
SailRen,427,2292
Satan,1237,2175
Sky High,174,2292
StrayedCatz,937,1472
the Chameleon,682,2092
Timepiece phase II,427,2092
trideca,174,2010
Triple Counter,682,955
Triple Cross,427,1121
Ubertreffen,937,1039
uen,937,583
Unknown Region,427,1203
Vinculum stellarum,427,1472
virkatoの主題によるperson09風超絶技巧変奏曲,937,1121
VOLAQUAS,174,1638
XROSS INFECTION,174,1555
zeeros,937,1740
ZETA～素数の世界と超越者～,937,765
Zirkfied,427,765
アストライアの双皿,937,2092
想い出をありがとう,1237,1390
悲しいね,1237,2010
C18H27NO3,937,1390
激走！！ヤング☆ダンプ！,174,765
限界食堂,427,1039
恋歌疾風！かるたクイーンいろは,174,1740
最小三倍完全数,682,1039
ジオメトリック∮ティーパーティー,427,955
雫,937,1308
鎬,682,1555
シャムシールの舞,174,2175
ちくわパフェだよ☆ＣＫＰ,427,847
終末を追う者,427,1638
生命の焔纏いて,174,1308
世界の果てに約束の凱歌を,682,1121
世界の果てに約束の凱歌を -Advent-,174,847
葬送のエウロパ,427,1390
天空の夜明け,174,1825
IX,682,2292
西馬込交通曲,559,425
バッドエンド・シンドローム,174,1906
ピアノ独奏無言歌 "灰燼",174,662
ブタパンチのテーマ,682,1825
めうめうぺったんたん！！,682,847
未完成ノ蒸氣驅動乙女,427,2010
明滅の果てに,427,1906
粋 -IKI-,174,1390
彼岸花,174,1121
pump up dA CORE,937,847
天泣,937,1203`
  let newCsv = csv49.trim();
  const m = new Map();
  newCsv.split('\n').map(line => {
    var song = line.split(',');
    m.set(song[0], { x: song[1], y: song[2] })
  });
  m.forEach(logMapElements);

  document.body.innerHTML = `
   <body>
   <canvas id="canvas" width="1500" height="2381">
  </canvas>
  </body>
    `;
  const canvas = document.getElementById("canvas");
  const bg = new Image();
  bg.src = "https://rawcdn.githack.com/sonohoshi/children-s-sketchbook/1daa5e221a62bc59e2c44020721c16ed3d404ac2/img/49table.png";
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
