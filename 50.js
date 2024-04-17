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
              `${li.firstElementChild.firstElementChild.textContent}${li.firstElementChild.firstElementChild.href.indexof("0a42H9i6WzV2K4X3vTbFlA") == -1 && li.firstElementChild.firstElementChild.textContent == "Popperz Chronicle" ? "U":""}`,
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
  
    const csv49 = `25 o'clock the WORLD,1095,693
BabeL ～MODEL DD101～,263,1770
Blue River,678,2219
Chaos:Q,678,471
F/S,1095,896
НУМЛ,678,1997
ma plume,678,1547
L-an!ma,263,693
o†o,263,471
perditus†paradisus,678,693
Popperz ChronicleU,1095,471
Popperz Chronicle,678,1118
virkatoの主題によるperson09風超絶技巧変奏曲,263,1547
音楽,678,896896q
シュレーディンガーの猫,263,1997
序,678,1344
少年は空を辿る,263,1344
真超深ＴＩＯＮ,1095,1344
生命の焔纏いて,1095,1118
生命の環を紡いで,263,2219
辿る君を超えて,263,1118
ピアノ協奏曲第１番”蠍火”,263,896
ΔΟΓΜΑ,1095,2219`
    let newCsv = csv49.trim();
    const m = new Map();
    newCsv.split('\n').map(line => {
      var song = line.split(',');
      m.set(song[0], { x: song[1], y: song[2] })
    });
    m.forEach(logMapElements);
  
    document.body.innerHTML = `
     <body>
     <canvas id="canvas" width="1500" height="2344">
    </canvas>
    </body>
      `;
    const canvas = document.getElementById("canvas");
    const bg = new Image();
    bg.src = "https://rawcdn.githack.com/sonohoshi/children-s-sketchbook/96906144d80d0dc758520853a421eee62d10777b/img/50table.png";
    bg.crossOrigin = 'anonymous';
    bg.onload = function () {
      canvas.getContext("2d").drawImage(bg, 0, 0)
      playData.forEach(element => {
        console.log(`try draw ${element.song}`);
        var ctx = canvas.getContext("2d");
        var xy = m.get(element.song);
        var img = new Image();
        img.onload = function () {
          ctx.drawImage(img, xy.x, xy.y, 52, 52)
        }
        img.src = element.medal;
      });
    }
  }
  
  crawl(50).then(data => render49(data));
  