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

async function render(){
  document.body.innerHTML = `
    <body>
    <img
  class="fit-picture"
  src="https://image.dcinside.com/viewimage.php?id=&no=24b0d769e1d32ca73de987fa11d028319b15983a4fe17b29dcc6f7288b8246fae44e12ec30598b2b48f72e9a1b7e4fdc40d2df309c0aae079c14b8c5573ae8885272fe1cd42ebb36ab"/>
    </body>
    `;
}

wapper(48, 49).then(_ => render());
