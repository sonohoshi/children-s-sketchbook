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

  const csv49 = `24/7 Popperz,183,427
BabeL ～Next Story～,183,582
Black Emperor,940,1898
Bossa Gabba,940,1630
Blue River,183,952
Candy Crime Toe Shoes,183,1198
CHERNOBOG,435,1815
DIAVOLO,1240,1034
Eine Haube ～聖地の果てにあるもの～,940,2083
Elemental Creation,435,1385
Festum Duodecimum!,1240,1549
GALAXY FOREST 11.6&12,1240,2166
Geiselhaus,435,1630
Hades Doll,183,1280
Hell? or Heaven?,1240,1117
INF-B《L-aste-R》,183,1549
Innocence,183,1034
I'm on Fire,1240,397
K∀MUY,435,582
Lachryma《Re:Queen’M》,688,1467
Last Twilight,688,2083
Line Times,1240,479
ma plume,688,1198
MADSPEED狂信道,688,582
Megalara Garuda,940,1711
moon_child,688,1815
neu,688,767
ΩVERSOUL,688,1385
perditus†paradisus,688,1711
Prey,183,2166
QuoN,435,1898
Remain,688,1549
RINИE,940,952
SailRen,435,2365
Satan,1240,2248
Sky High,183,2365
StrayedCatz,940,1549
the Chameleon,688,2166
Timepiece phase II,435,2166
trideca,183,2083
Triple Counter,688,952
Triple Cross,435,1117
Ubertreffen,940,1034
uen,940,582
Unknown Region,435,1198
Vinculum stellarum,435,1549
virkatoの主題によるperson09風超絶技巧変奏曲,940,1117
VOLAQUAS,183,1711
XROSS INFECTION,183,1630
zeeros,940,1815
ZETA～素数の世界と超越者～,940,767
Zirkfied,435,767
アストライアの双皿,940,2166
想い出をありがとう,1240,1467
悲しいね,1240,2083
C18H27NO3,940,1467
激走！！ヤング☆ダンプ！,183,767
限界食堂,435,1034
恋歌疾風！かるたクイーンいろは,183,1815
最小三倍完全数,688,1034
ジオメトリック∮ティーパーティー,435,952
雫,940,1385
鎬,688,1630
シャムシールの舞,183,2248
ちくわパフェだよ☆ＣＫＰ,435,849
終末を追う者,435,1711
生命の焔纏いて,183,1385
世界の果てに約束の凱歌を,688,1117
世界の果てに約束の凱歌を -Advent-,183,849
葬送のエウロパ,435,1467
天空の夜明け,183,1898
IX,688,2365
西馬込交通曲,561,427
バッドエンド・シンドローム,183,1979
ピアノ独奏無言歌 "灰燼",183,664
ブタパンチのテーマ,688,1898
めうめうぺったんたん！！,688,849
未完成ノ蒸氣驅動乙女,435,2083
明滅の果てに,435,1979
粋 -IKI-,183,1467
彼岸花,183,1117
pump up dA CORE,940,849
天泣,940,1198
竜を狩る者,688,1979
MAX KARAI,435,1280
No Border,688,1280
ホットドッグドカぐいレース!!!!,940,1280
嵐の唄,940,427`
// 真夜中のun thé noir 다음에 추가해야함
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
        ctx.drawImage(img, xy.x, xy.y, 38, 38)
      }
      img.src = element.medal;
    });
  }
}

crawl(49).then(data => render49(data));
