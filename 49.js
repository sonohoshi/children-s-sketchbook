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

  const csv49 = `24/7 Popperz,226,418
BabeL ～Next Story～,178,575
Black Emperor,937,1809
Bossa Gabba,937,1543
Blue River,178,947
Candy Crime Toe Shoes,178,1193
CHERNOBOG,430,1729
DIAVOLO,1237,1030
Eine Haube ～聖地の果てにあるもの～,937,1996
Elemental Creation,430,1298
Festum Duodecimum!,1237,1462
GALAXY FOREST 11.6&12 ,1237,2078
Geiselhaus,430,1543
Hell? or Heaven?,1237,1111
INF-B《L-aste-R》,178,1462
Innocence,178,1029
I'm on Fire,1237,390
K∀MUY,430,575
Lachryma《Re:Queen’M》,684,1380
Last Twilight,684,1996
Line Times,1237,472
ma plume,684,1193
MADSPEED狂信道,684,575
Mecha Kawa Breaker!!,897,418
moon_child,684,1729
neu,684,760
ΩVERSOUL,684,1298
perditus†paradisus,684,1625
Prey,178,2078
QuoN,430,1809
Remain,684,1462
RINИE,937,947
SailRen,430,2278
Satan,1237,2162
Sky High,178,2278
StrayedCatz,937,1462
the Chameleon,684,2078
Timepiece phase II,430,2078
trideca,178,1996
Triple Counter,684,947
Triple Cross,430,1111
Ubertreffen,937,1029
uen,937,575
Unknown Region,430,1193
Vinculum stellarum,430,1462
virkatoの主題によるperson09風超絶技巧変奏曲,937,1111
VOLAQUAS,178,1625
XROSS INFECTION,178,1543
zeeros,937,1729
ZETA～素数の世界と超越者～,937,760
Zirkfied,430,760
アストライアの双皿,937,2078
想い出をありがとう,1237,1378
悲しいね,1237,1997
C18H27NO3,937,1380
激走！！ヤング☆ダンプ！,178,760
限界食堂,430,1029
恋歌疾風！かるたクイーンいろは,178,1729
最小三倍完全数,684,1029
ジオメトリック∮ティーパーティー,430,947
雫,937,1298
鎬,684,1543
シャムシールの舞,178,2162
ちくわパフェだよ☆ＣＫＰ,430,842
終末を追う者,430,1625
生命の焔纏いて,178,1298
世界の果てに約束の凱歌を,684,1111
世界の果てに約束の凱歌を -Advent-,178,842
葬送のエウロパ,430,1380
天空の夜明け,178,1809
IX,684,2278
西馬込交通曲,562,418
バッドエンド・シンドローム,178,1891
ピアノ独奏無言歌 "灰燼",178,657
ブタパンチのテーマ,684,1809
めうめうぺったんたん！！,684,842
未完成ノ蒸氣驅動乙女,430,1996
明滅の果てに,430,1891
粋 -IKI-,178,1380
彼岸花,178,1111
pump up dA CORE,937,842
天泣,937,1193`
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
