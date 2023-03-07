let flag = false;
let mainContainer = document.getElementsByTagName("main")[0];
let topPanel = document.getElementById("top-panel");

// 首页特效
// document.getElementById("index-show").addEventListener("mousemove", (() => {
//   let previous = 0;
//   return event => {
//     let now = Date.now();
//     if (now - previous > 16) {
//       let offsX = document.documentElement.clientWidth * 0.5;
//       let offsY = document.documentElement.clientHeight * 0.5;
//       if (flag == false)
//         sway.style.transform = "translate(" + (event.pageX - offsX) * 0.1 + "px" + "," + (event.pageY - offsY) * 0.1 + "px)";
//       previous = now;
//     }
//   }
// })());

window.addEventListener("scroll", (() => {
  let previous = 0;
  return function () {
    let now = Date.now();
    if (now - previous > 16) {
      if (document.documentElement.scrollTop < 5) {
        topPanel.style.boxShadow = "0 0 0 black";
      } else {
        topPanel.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.4)";
      }
      // if (flag == false && document.documentElement.scrollTop > document.documentElement.clientHeight * 0.75) {
      //   mainContainer.style.animation = "cutin 1s ease";
      //   mainContainer.style.opacity = "1";
      //   mainContainer.style.pointerEvents = "auto";
      //   flag = true;
      // }
      // if (flag == true && document.documentElement.scrollTop < document.documentElement.clientHeight * 0.6) {
      //   mainContainer.style.animation = "cutout 1s ease";
      //   mainContainer.style.opacity = "0";
      //   mainContainer.style.pointerEvents = "none";
      //   flag = false;
      // }
      previous = now;
    }
  }
})());

fetch('/friendLinks.json').then(response => {
  return response.json();
}).then(Friends => {
  for (let i = 0; i < Friends.length; ++i) {
    let f = Friends[i];
    let str = `<a class="goline-text" target="_blank" href="${f.href}">${f.name}</a>`;
    document.getElementById("links").innerHTML += str;
  }
});

// 一言
function getHitokoto() {
  fetch('https://v1.hitokoto.cn?c=i').then(r => r.json()).then(myJson => {
    document.getElementById("hitokotoText").innerText = myJson.hitokoto;
    document.getElementById("hitokotoRef").innerText = myJson.from_who;
  });
}
getHitokoto();
document.querySelector("#hitokoto span.refresh").addEventListener("click", getHitokoto);
