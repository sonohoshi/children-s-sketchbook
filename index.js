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
  src="https://github-production-user-asset-6210df.s3.amazonaws.com/48484989/322400510-63f83a1e-56a4-4f13-8d2d-b9674e0accfc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240415%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240415T080421Z&X-Amz-Expires=300&X-Amz-Signature=87af1d19e1b9eab4bee0138f1f9682dabdac76fc90d7c5ee7fcd6d32d7e793bb&X-Amz-SignedHeaders=host&actor_id=48484989&key_id=0&repo_id=785611895"/>
    </body>
    `;
}

wapper(48, 49).then(_ => render());
