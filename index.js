async function wapper(...levels) {
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
              li.firstElementChild.lastElementChild.textContent,
              li.firstElementChild.firstElementChild.textContent,
            ])
            .map(([score, medal, genre, song]) => {
              return {
                song,
                genre,
                score,
                medal,
                level,
              };
            });
        });
    }

    let arr = new Array();
    for(let i = 0; i < 15; i++){
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

async function render49(playData){
  console.log(playData)
  document.body.innerHTML = `
   <body>
   <style scoped>
  canvas {
    background-repeat: no-repeat;
    background: url("https://private-user-images.githubusercontent.com/48484989/322400544-b827c324-d247-4aa0-bce0-78181d7cf310.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyNzAyNjYsIm5iZiI6MTcxMzI2OTk2NiwicGF0aCI6Ii80ODQ4NDk4OS8zMjI0MDA1NDQtYjgyN2MzMjQtZDI0Ny00YWEwLWJjZTAtNzgxODFkN2NmMzEwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDE2VDEyMTkyNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWEyNjA2NDJiNGM5OGY1YmQ3OTUxOTU4ZWIxZjJlYTNkZDA3MmUyNjUyMWJjZjE3ODY2MjI2ZDZiN2E2MDkzZjImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.gRJR964IJOJJt9_cAF6vpAIokRM7ds9I4-PBZ5K5E2o");
  }
  </style>
   <canvas id="canvas" width="1500" height="2381">
  </canvas>
  </body>
    `;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  var img = new Image();
  img.onload = function(){
    ctx.drawImage(img, 0, 0)
  }
  img.src = ("https://eacache.s.konaminet.jp/game/popn/unilab/images/p/common/medal/meda_none.png");
}


wapper(49).then(data => render49(data));