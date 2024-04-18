function Drawer(level) {
  this.level = level;

  this.presetX = [
    263, 678, 1095
  ];

  this.presetY = [
    471, 693, 896,
    1118, 1344, 1547,
    1770, 1997, 2219
  ];

  this.songData = [
    {
      id: 'yIlr2ptoxnRY4enX8Cn/aQ%3D%3D',
      song: "25 o'clock the WORLD",
      posX: 1095,
      posY: 693
    },
    {
      id: 'LPIFtx8CNKhG0W1AvSphIg%3D%3D',
      song: 'BabeL ～MODEL DD101～',
      posX: 263,
      posY: 1770
    },
    {
      id: 'lYwRjEjGgk3M44ADutSKuQ%3D%3D',
      song: 'Blue River',
      posX: 678,
      posY: 2219
    },
    {
      id: 'OoEXEte%2BT31fFiw63CpbPg%3D%3D',
      song: 'Chaos:Q',
      posX: 678,
      posY: 471
    },
    {
      id: 'gwdzeAUbAhWPhTyZfaL/LA%3D%3D',
      song: 'ΔΟΓΜΑ',
      posX: 1095,
      posY: 2219
    },
    {
      id: 'f11dcHCK9zwRaIDkGCQK1A%3D%3D',
      song: 'НУМЛ',
      posX: 678,
      posY: 1997
    },
    {
      id: '9iTaxtyPLRon/bRFfhvPBw%3D%3D',
      song: 'L-an!ma',
      posX: 263,
      posY: 693
    },
    {
      id: 'QwgkYc/3nypegzbzhHWt7A%3D%3D',
      song: 'ma plume',
      posX: 678,
      posY: 1547
    },
    {
      id: 'S6lsyiUA%2BNrm0zzGwbAm7Q%3D%3D',
      song: 'o†o',
      posX: 263,
      posY: 471
    },
    {
      id: 'uYtVDD8kWHzolqgs17Egcw%3D%3D',
      song: 'perditus†paradisus',
      posX: 678,
      posY: 693
    },
    {
      id: 'eXob85e4ewdGYy89XX0oNg%3D%3D',
      song: 'Popperz Chronicle',
      posX: 678,
      posY: 1118
    },
    {
      id: 'cfF93fNxKKxo92aT9qDuSQ%3D%3D',
      song: 'Popperz Chronicle',
      posX: 678,
      posY: 1118
    },
    {
      id: 'MtWwI3HiU2Zf3PQLZ1NTUA%3D%3D',
      song: 'virkatoの主題によるperson09風超絶技巧変奏曲',
      posX: 263,
      posY: 1547
    },
    {
      id: '/BAvTuSFXEVJYPVxP%2BdBEA%3D%3D',
      song: '音楽',
      posX: 678,
      posY: 896
    },
    {
      id: 'wQR9ItkbCwRriXfIqokFxw%3D%3D',
      song: 'シュレーディンガーの猫',
      posX: 263,
      posY: 1997
    },
    {
      id: 'hhHOwfu9MgEEwNXrC/eEJA%3D%3D',
      song: '序',
      posX: 678,
      posY: 1344
    },
    {
      id: 'O3RIbi0WGuD3GmbzH7vQjQ%3D%3D',
      song: '少年は空を辿る',
      posX: 263,
      posY: 1344
    },
    {
      id: 'P21kx2ZcVk6GBWBnh%2Bmi7w%3D%3D',
      song: '真超深ＴＩＯＮ',
      posX: 1095,
      posY: 1344
    },
    {
      id: 'xRI0wzMn1jgN3hGaQGj%2BnQ%3D%3D',
      song: '生命の焔纏いて',
      posX: 1095,
      posY: 1118
    },
    {
      id: 'Bmo8b1iTqwsIcUcbGSY2Sg%3D%3D',
      song: '生命の環を紡いで',
      posX: 263,
      posY: 2219
    },
    {
      id: 'knrOTlBzn/YPU/fLrHZ0hg%3D%3D',
      song: '辿る君を超えて',
      posX: 263,
      posY: 1118
    },
    {
      id: 'rkYyiMBeGT%2Bdb1St7YTXtw%3D%3D',
      song: 'ピアノ協奏曲第１番”蠍火”',
      posX: 263,
      posY: 896
    }
  ];
}

Drawer.prototype.draw = function (playData) {
  this.initBodyElement();
  this.drawTable(playData);
}

Drawer.prototype.initBodyElement = function () {
  document.body.innerHTML = `
    <body>
      <canvas id="canvas" width="1500" height="2344">
      </canvas>
    </body>
  `;
}

Drawer.prototype.drawMedals = function (playData, songData) {
  const canvas = document.getElementById("canvas");
  playData.forEach((element) => {
    var ctx = canvas.getContext("2d");
    var xy = songData.find((e) => e.id == element.id);
    if (xy) {
      var img = new Image();
      img.onload = function () {
        ctx.drawImage(img, xy.posX, xy.posY, 40, 40)
      }
      img.src = element.medal;
    }
  });
};

Drawer.prototype.drawTable = function (playData) {
  const canvas = document.getElementById("canvas");
  const bg = new Image();
  const drawMedals = this.drawMedals;
  const songData = this.songData;
  bg.src = `https://rawcdn.githack.com/sonohoshi/children-s-sketchbook/96906144d80d0dc758520853a421eee62d10777b/img/${this.level}table.png`;
  bg.crossOrigin = 'anonymous';
  bg.onload = function () {
    canvas.getContext("2d").drawImage(bg, 0, 0);
    drawMedals(playData, songData);
  };
}