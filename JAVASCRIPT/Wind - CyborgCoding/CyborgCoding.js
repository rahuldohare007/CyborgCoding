let p = document.querySelector("p"),
  p_width = p.getBoundingClientRect().width;
function addBubbles() {
  for (var i = 0; i < p_width / 5; i++) {
    let b = document.createElement("div");
    b.className = "bubble";
    b.style.height = Math.random() < 0.5 ? "1px" : "2px";
    b.style.bottom = Math.random() * 95 + "%";
    b.style.animationDelay = 4 * Math.random() + "s";
    p.appendChild(b);
  }
}
addBubbles();
