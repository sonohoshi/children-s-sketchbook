async function crawl(...levels) {
  let domparser = new DOMParser();

  console.log("popn data crawler running.\nPLZ wait a minute...");

  const PLAY_DATA_URL = "https://p.eagate.573.jp/game/popn/unilab/playdata";
  const MEDAL_IMAGE_URL =
    "https://eacache.s.konaminet.jp/game/popn/unilab/images/p/common/medal";

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

async function render48(playData) {
  const presetX = [191, 395, 599, 804, 1009, 1286];
  const presetY = [
    403, 482, 582, 660, 739,
    818, 897, 997, 1076, 1155,
    1234, 1313, 1392, 1471, 1569,
    1648, 1727, 1806, 1885, 1964,
    2043, 2141, 2220, 2299, 2378,
    2476, 2555, 2634, 2713, 2811,
  ];

  const songData = [
    {
      song: "Aithon",
      posX: presetX[4],
      posY: presetY[29],
    },
    {
      song: "Alia Dimensiva",
      posX: presetX[0],
      posY: presetY[11],
    },
    {
      song: "ANNIVERSARY ∴∵∴ ←↓↑→",
      posX: presetX[0],
      posY: presetY[27],
    },
    {
      song: "asteer",
      posX: presetX[2],
      posY: presetY[29],
    },
    {
      song: "BabeL ～Grand Story～",
      posX: presetX[4],
      posY: presetY[7],
    },
    {
      song: "Battle Against a True Hero/本物のヒーローとの戦い",
      posX: presetX[0],
      posY: presetY[12],
    },
    {
      song: "Celsus Ⅱ",
      posX: presetX[2],
      posY: presetY[27],
    },
    {
      song: "CHIP'N'RIDDIM",
      posX: presetX[2],
      posY: presetY[15],
    },
    {
      song: "Chronoxia",
      posX: presetX[0],
      posY: presetY[3],
    },
    {
      song: "Concertare",
      posX: presetX[5],
      posY: presetY[29],
    },
    {
      song: "Concertino In Blue",
      posX: presetX[4],
      posY: presetY[9],
    },
    {
      song: "cucumis melo",
      posX: presetX[4],
      posY: presetY[18],
    },
    {
      song: "DDR MEGAMIX",
      posX: presetX[5],
      posY: presetY[17],
    },
    {
      song: "Dimensiva Vulnus",
      posX: presetX[1],
      posY: presetY[14],
    },
    {
      song: "Doll's sight",
      posX: presetX[5],
      posY: presetY[27],
    },
    {
      song: "Dracophobia",
      posX: presetX[3],
      posY: presetY[25],
    },
    {
      song: "DUAL STRIKER",
      posX: presetX[1],
      posY: presetY[18],
    },
    {
      song: "Ergosphere",
      posX: presetX[4],
      posY: presetY[22],
    },
    {
      song: "Esperanza",
      posX: presetX[2],
      posY: presetY[7],
    },
    {
      song: "Evans",
      posX: presetX[1],
      posY: presetY[3],
    },
    {
      song: "fffff",
      posX: presetX[2],
      posY: presetY[14],
    },
    {
      song: "fffff op.2",
      posX: presetX[3],
      posY: presetY[14],
    },
    {
      song: "FLOWER",
      posX: presetX[4],
      posY: presetY[25],
    },
    {
      song: "forever under construction",
      posX: presetX[4],
      posY: presetY[26],
    },
    {
      song: "Funky sonic World",
      posX: presetX[1],
      posY: presetY[23],
    },
    {
      song: "GAIA",
      posX: presetX[2],
      posY: presetY[12]
    },
    {
      song: "Globe Glitter",
      posX: presetX[4],
      posY: presetY[5],
    },
    {
      song: "GOLDEN CROSS",
      posX: presetX[1],
      posY: presetY[17],
    },
    {
      song: "good night , mommy",
      posX: presetX[4],
      posY: presetY[21],
    },
    {
      song: "Grand Chariot",
      posX: presetX[4],
      posY: presetY[3],
    },
    {
      song: "Gray clouds",
      posX: presetX[3],
      posY: presetY[10],
    },
    {
      Song: "Hexer",
      posX: presetX[4],
      posY: presetY[19],
    },
    {
      song: "hora de verdad",
      posX: presetX[1],
      posY: presetY[4],
    },
    {
      song: "Idola",
      posX: presetX[0],
      posY: presetY[14],
    },
    {
      song: "Indigo Nocturne",
      posX: presetX[1],
      posY: presetY[19],
    },
    {
      song: "JOMANDA",
      posX: presetX[2],
      posY: presetY[9],
    },
    {
      song: "KETER",
      posX: presetX[3],
      posY: presetY[18],
    },
    {
      song: "La fame di Adria",
      posX: presetX[1],
      posY: presetY[21],
    },
    {
      song: "LEAD Gravity（M）",
      posX: presetX[0],
      posY: presetY[6],
    },
    {
      song: "Leaf",
      posX: presetX[4],
      posY: presetY[0],
    },
    {
      song: "Life is beautiful",
      posX: presetX[4],
      posY: presetY[16],
    },
    {
      song: "Little prayer",
      posX: presetX[0],
      posY: presetY[24]
    },
    {
      song: "Macuilxochitl",
      posX: presetX[1],
      posY: presetY[8],
    },
    {
      song: "MADSPEED狂信道",
      posX: presetX[0],
      posY: presetY[15],
    },
    {
      song: "Majestaria",
      posX: presetX[0],
      posY: presetY[18],
    },
    {
      song: "MEGALOVANIA",
      posX: presetX[1],
      posY: presetY[12],
    },
    {
      song: "Metamorphose",
      posX: presetX[0],
      posY: presetY[9],
    },
    {
      song: "Mirage Age",
      posX: presetX[1],
      posY: presetY[27],
    },
    {
      song: "MVA",
      posX: presetX[1],
      posY: presetY[29],
    },
    {
      song: "NOBUNAGA",
      posX: presetX[3],
      posY: presetY[8]
    },
    {
      song: "Northern Cross",
      posX: presetX[2],
      posY: presetY[24],
    },
    {
      song: "nostos",
      posX: presetX[1],
      posY: presetY[10],
    },
    {
      song: "OVERHEAT -Type P-",
      posX: presetX[3],
      posY: presetY[5],
    },
    {
      song: "POP-STEP-UP",
      posX: presetX[5],
      posY: presetY[0],
    },
    {
      song: "Puberty Dysthymia",
      posX: presetX[1],
      posY: presetY[22],
    },
    {
      song: "Raison d'être～交差する宿命～",
      posX: presetX[1],
      posY: presetY[11],
    },
    {
      song: "Red Roses",
      posX: presetX[5],
      posY: presetY[1],
    },
    {
      song: "Russian Caravan Rhapsody",
      posX: presetX[4],
      posY: presetY[17],
    },
    {
      song: "Sanctum Crusade",
      posX: presetX[4],
      posY: presetY[15],
    },
    {
      song: "saQrifice",
      posX: presetX[2],
      posY: presetY[22],
    },
    {
      song: "Southern Cross",
      posX: presetX[3],
      posY: presetY[26],
    },
    {
      song: "STULTI",
      posX: presetX[2],
      posY: presetY[3],
    },
    {
      song: "SYMPHONY FROM ZERO",
      posX: presetX[2],
      posY: presetY[6],
    },
    {
      song: "The Least 100 sec",
      posX: presetX[0],
      posY: presetY[29],
    },
    {
      song: "Trill auf G",
      posX: presetX[0],
      posY: presetY[28],
    },
    {
      song: "Trixxxter",
      posX: presetX[3],
      posY: presetY[3],
    },
    {
      song: "True Blue",
      posX: presetX[1],
      posY: presetY[25],
    },
    {
      song: "ULTRA BUTTERFLY(坤剛力)",
      posX: presetX[4],
      posY: presetY[2],
    },
    {
      song: "Vairocana",
      posX: presetX[3],
      posY: presetY[0],
    },
    {
      song: "Valanga",
      posX: presetX[0],
      posY: presetY[17],
    },
    {
      song: "Versa",
      posX: presetX[0],
      posY: presetY[1],
    },
    {
      song: "voltississimo",
      posX: presetX[2],
      posY: presetY[5],
    },
    {
      song: "Warriors Aboot",
      posX: presetX[3],
      posY: presetY[22],
    },
    {
      song: "Xジェネの逆襲",
      posX: presetX[1],
      posY: presetY[28],
    },
    {
      song: "ZADAMGA",
      posX: presetX[2],
      posY: presetY[8],
    },
    {
      song: "ZETA～素数の世界と超越者～",
      posX: presetX[1],
      posY: presetY[15],
    },
    {
      song: "あまるがむ",
      posX: presetX[2],
      posY: presetY[19],
    },
    {
      song: "生きてこそ～特別版～",
      posX: presetX[4],
      posY: presetY[23],
    },
    {
      song: "一激必翔",
      posX: presetX[3],
      posY: presetY[29],
    },
    {
      song: "御千手メディテーション",
      posX: presetX[3],
      posY: presetY[9],
    },
    {
      song: "踊るフィーバーロボ",
      posX: presetX[4],
      posY: presetY[8],
    },
    {
      song: "カーニバルの主題による人形のためのいびつな狂想曲",
      posX: presetX[0],
      posY: presetY[23],
    },
    {
      song: "蛇神",
      posX: presetX[1],
      posY: presetY[26],
    },
    {
      song: "金縛りの逢を",
      posX: presetX[0],
      posY: presetY[16],
    },
    {
      song: "カラフルトイズ・ワンダーランド",
      posX: presetX[0],
      posY: presetY[21],
    },
    {
      song: "カラルの月",
      posX: presetX[1],
      posY: presetY[7],
    },
    {
      song: "賢聖シリウスの采配",
      posX: presetX[2],
      posY: presetY[21],
    },
    {
      song: "現代のヘイヨエ祭り",
      posX: presetX[3],
      posY: presetY[15],
    },
    {
      song: "恋はどう？モロ◎波動OK☆方程式！！",
      posX: presetX[2],
      posY: presetY[2],
    },
    {
      song: "子供の落書き帳",
      posX: presetX[3],
      posY: presetY[2],
    },
    {
      song: "コドモライブ",
      posX: presetX[0],
      posY: presetY[4],
    },
    {
      song: "混乱少女♥そふらんちゃん!!",
      posX: presetX[5],
      posY: presetY[23],
    },
    {
      song: "流離",
      posX: presetX[3],
      posY: presetY[16],
    },
    {
      song: "左脳スパーク",
      posX: presetX[1],
      posY: presetY[2],
    },
    {
      song: "雫",
      posX: presetX[2],
      posY: presetY[16],
    },
    {
      song: "灼熱Beach Side Bunny",
      posX: presetX[0],
      posY: presetY[10],
    },
    {
      song: "序",
      posX: presetX[4],
      posY: presetY[4],
    },
    {
      song: "少女と時の花",
      posX: presetX[3],
      posY: presetY[21],
    },
    {
      song: "人妖絵巻其の三「鴉天狗」～ 鞍馬のHAYATE ～",
      posX: presetX[2],
      posY: presetY[17],
    },
    {
      song: "スーパー戦湯ババンバーン",
      posX: presetX[1],
      posY: presetY[24],
    },
    {
      song: "翠雨の祷",
      posX: presetX[4],
      posY: presetY[14],
    },
    {
      song: "進め！爺ちゃん！",
      posX: presetX[5],
      posY: presetY[4],
    },
    {
      song: "西軍||∴⊂SEKIGAHARA⊃∴||東軍",
      posX: presetX[5],
      posY: presetY[26],
    },
    {
      song: "青天ノ霹レキ",
      posX: presetX[4],
      posY: presetY[27],
    },
    {
      song: "雪上断火",
      posX: presetX[0],
      posY: presetY[0],
    },
    {
      song: "創世ノート",
      posX: presetX[1],
      posY: presetY[0],
    },
    {
      song: "多極性ニューロンの崩壊による人間の末路",
      posX: presetX[1],
      posY: presetY[5],
    },
    {
      song: "たまごの物理科学的 及び調理特性に関しての調査、そしてその考察",
      posX: presetX[2],
      posY: presetY[23],
    },
    {
      song: "ちくわパフェだよ☆ＣＫＰ (Yvya Remix)",
      posX: presetX[0],
      posY: presetY[20],
    },
    {
      song: "テンプラ揚三",
      posX: presetX[5],
      posY: presetY[10],
    },
    {
      song: "天ぷらイントロドン！！",
      posX: presetX[4],
      posY: presetY[10],
    },
    {
      song: "轟け！恋のビーンボール！！",
      posX: presetX[0],
      posY: presetY[25],
    },
    {
      song: "バイキングマン",
      posX: presetX[2],
      posY: presetY[0],
    },
    {
      song: "背水之陣 (Kagutsuchi Remix)",
      posX: presetX[3],
      posY: presetY[4],
    },
    {
      song: "背徳と邪悪のエピタフ",
      posX: presetX[0],
      posY: presetY[8],
    },
    {
      song: "万物快楽理論",
      posX: presetX[2],
      posY: presetY[10],
    },
    {
      song: "火風陸空",
      posX: presetX[1],
      posY: presetY[9],
    },
    {
      song: "風林火山",
      posX: presetX[0],
      posY: presetY[22],
    },
    {
      song: "ポチコの幸せな日常 (狂犬U`x´UばうわうHARDCORE Remix)",
      posX: presetX[4],
      posY: presetY[11],
    },
    {
      song: "祭ノ痕、君ヲ憶フ。",
      posX: presetX[3],
      posY: presetY[24],
    },
    {
      song: "魔法のかくれんぼ",
      posX: presetX[3],
      posY: presetY[11],
    },
    {
      song: "満漢全席火花ノ舞",
      posX: presetX[3],
      posY: presetY[19],
    },
    {
      song: "ミサコの告白（みーつけたっ♥）",
      posX: presetX[0],
      posY: presetY[19],
    },
    {
      song: "蟲の棲む処",
      posX: presetX[1],
      posY: presetY[16],
    },
    {
      song: "夜間行",
      posX: presetX[5],
      posY: presetY[22],
    },
    {
      song: "野獣ワイルド",
      posX: presetX[3],
      posY: presetY[17],
    },
    {
      song: "夢について　TYPE C",
      posX: presetX[3],
      posY: presetY[23],
    },
    {
      song: "龍王の霊廟(Mausoleum Of The Primal Dragon)",
      posX: presetX[3],
      posY: presetY[27],
    },
    {
      song: "量子の海のリントヴルム",
      posX: presetX[2],
      posY: presetY[25],
    },
    {
      song: "リリーゼと炎龍レーヴァテイン",
      posX: presetX[3],
      posY: presetY[7],
    },
    {
      song: "霖が哭く",
      posX: presetX[2],
      posY: presetY[4],
    },
    {
      song: "輪廻の鴉",
      posX: presetX[4],
      posY: presetY[24],
    },
    {
      song: "霊魂爆砕 -SOUL EXPLOSION-",
      posX: presetX[0],
      posY: presetY[26],
    },
    {
      song: "令和の国",
      posX: presetX[0],
      posY: presetY[5],
    },
    {
      song: "煉獄事変",
      posX: presetX[2],
      posY: presetY[18],
    },
    {
      song: "路男",
      posX: presetX[0],
      posY: presetY[2],
    },
    {
      song: "海神",
      posX: presetX[2],
      posY: presetY[26],
    },
    {
      song: "革命パッショネイト",
      posX: presetX[0],
      posY: presetY[7],
    },
    {
      song: "乙女繚乱 舞い咲き誇れ",
      posX: presetX[3],
      posY: presetY[12],
    },
    {
      song: "ポルターガイスト",
      posX: presetX[2],
      posY: presetY[11],
    },
    {
      song: "灰の羽搏",
      posX: presetX[4],
      posY: presetY[12],
    },
    {
      song: "Gabbalungang",
      posX: presetX[0],
      posY: presetY[13],
    },
    {
      song: "狼弦暴威",
      posX: presetX[1],
      posY: presetY[13],
    },
    {
      song: "SOLID STATE SQUAD -RISEN RELIC REMIX-",
      posX: presetX[3],
      posY: presetY[6],
    },
    {
      song: "ホーンテッド★メイドランチ",
      posX: presetX[1],
      posY: presetY[6],
    }
    /* TODO: 서열표 업데이트 시 좌표입력 후 지우기
    {
      song: "少年A",
      posX: 0,
      posY: 0
    },
    {
      song: "Dragon Blade -The Arrange-",
      posX: 0,
      posY: 0,
    },
    {
      song: "遊戯大熊猫",
      posX: 0,
      posY: 0
    },
    {
      song: "ただ、それだけの理由で",
      posX: 0,
      posY: 0,
    }
    */
  ];

  function initBodyElement() {
    document.body.innerHTML = `
      <body>
        <canvas id="canvas" width="1500" height="2894">
        </canvas>
      </body>
    `;
  }

  function drawMedals() {
    const canvas = document.getElementById("canvas");
    playData.forEach((element) => {
      var ctx = canvas.getContext("2d");
      var xy = songData.find((e) => e.song == element.song);
      if (xy) {
        var img = new Image();
        img.onload = function () {
          ctx.drawImage(img, xy.posX - 20, xy.posY - 20, 40, 40)
        }
        img.src = element.medal;
      }
    });
  }

  function drawTable() {
    const canvas = document.getElementById("canvas");
    const bg = new Image();
    bg.src = "https://rawcdn.githack.com/sonohoshi/children-s-sketchbook/96906144d80d0dc758520853a421eee62d10777b/img/48table.png";
    bg.crossOrigin = 'anonymous';
    bg.onload = function () {
      canvas.getContext("2d").drawImage(bg, 0, 0)
      drawMedals()
    };
  }

  initBodyElement();
  drawTable();
}

crawl(48).then(data => render48(data));