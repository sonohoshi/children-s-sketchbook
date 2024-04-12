async function wapper(...levels) {
    let domparser = new DOMParser();

    const VERSION = "v0.2 by kimsm";
    console.log("Running popn class script", VERSION, "\nPLZ wait a minute...");

    const MEDAL_BONUS = {
      a: 5000,
      b: 5000,
      c: 5000,
      d: 5000,
      e: 3000,
      f: 3000,
      g: 3000,
      h: 0,
      i: 0,
      j: 0,
      k: 3000,
      none: 0,
    };

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
              li.children[3].firstChild.src
                .replace(`${MEDAL_IMAGE_URL}/meda_`, "")
                .replace(".png", ""),
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
                point:
                  score < 50000
                    ? 0
                    : Math.floor(
                      (100 *
                        (10000 * level +
                          parseInt(score) -
                          50000 +
                          MEDAL_BONUS[medal])) /
                      5440
                    ) / 100,
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
  
    const player = await fetch(`${PLAY_DATA_URL}/index.html`)
      .then(resToText)
      .then((text) => domparser.parseFromString(text, "text/html"))
      .then(
        (doc) =>
          doc.querySelector("#status_table > div.st_box > div:nth-child(2)")
            .textContent
      );

    const s = (await Promise.all(promises))
      .flat()
      .sort((a, b) => b.point - a.point);
    console.log({ s })
}

wapper(48, 49);