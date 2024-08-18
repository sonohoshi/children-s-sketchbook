function showMain() {
    document.body.innerHTML = `
<style>
h1,
h2,
h3,
h4 {
  margin: 0.1rem 0;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
  padding-left: 20px;
}

h3 {
  font-size: 1.2rem;
  padding-left: 40px;
}

h4 {
  font-size: 1rem;
  font-style: italic;
  padding-left: 60px;
}
</style>
<h1>아이들의 낙서장</h1>

<a href=https://twitter.com/popnmusic10>팝픈뮤직 한국 서열표</a>에서 만든 서열표에 자동으로 메달 정보를 기입해주는 <a href=https://github.com/sonohoshi>김선민</a>의 코드 덩어리입니다.<br>
아래의 버튼들을 눌러 갱신된 서열표의 이미지를 보실 수 있습니다.<br>

<form action="javascript: void !function(e){var t=e.createElement('script');t.type='text/javascript',t.src='///rawcdn.githack.com/sonohoshi/children-s-sketchbook/84f0cfe890f21bef92ca397746a6bed7d14d495b/48.js',e.head.appendChild(t)}(document);">
    <input type="submit" value="48" />
</form>
<form action="javascript: void !function(e){var t=e.createElement('script');t.type='text/javascript',t.src='///rawcdn.githack.com/sonohoshi/children-s-sketchbook/1daa5e221a62bc59e2c44020721c16ed3d404ac2/49.js',e.head.appendChild(t)}(document);">
    <input type="submit" value="49" />
</form>
<form action="javascript: void !function(e){var t=e.createElement('script');t.type='text/javascript',t.src='///rawcdn.githack.com/sonohoshi/children-s-sketchbook/84f0cfe890f21bef92ca397746a6bed7d14d495b/50.js',e.head.appendChild(t)}(document);">
    <input type="submit" value="50" />
</form>
<hr style="height: 15px;  
	background-color: #1ed434"/>
<a href="https://github.com/sonohoshi/children-s-sketchbook">github 소스코드 저장소</a><br>
본 스크립트의 개발자와 서열표 제작자분과는 어떠한 관계도 없습니다. 문의는 github, 혹은 twitter @dev_sonohoshi 로 부탁드립니다.<br>
본 스크립트를 사용하여 얻을 수 있는 불이익에 대해 개발자는 책임지지 않습니다.<br>
`;
}

showMain()