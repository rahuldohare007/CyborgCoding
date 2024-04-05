const mouse = newV2();
const center = newV2();
const distanceFromCenter = newV2();
const distanceLerped = newV2();
let simulateMouseMovement = true;

const perspective = 500;
const translateZ = -12;
const rotate = 3;
const skew = 3;

const container = document.getElementById("container");
const copies = document.getElementsByClassName("copy");

function updateCenter() {
  const rect = container.getBoundingClientRect();
  center.x = rect.left + rect.width / 2;
  center.y = rect.top + rect.height / 2;
}

function trackMousePosition(event) {
  simulateMouseMovement = false;
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  distanceFromCenter.x = center.x - mouse.x;
  distanceFromCenter.y = center.y - mouse.y;
}

function fakeMousePosition(t) {
  distanceFromCenter.x = Math.sin(t / 500) * window.innerWidth * 0.5;
  distanceFromCenter.y = Math.cos(t / 500) * window.innerWidth * 0.2;
}

function updateTextPosition(t) {
  if (simulateMouseMovement) fakeMousePosition(t);

  lerpV2(distanceLerped, distanceFromCenter);

  for (var i = 1; i < copies.length + 1; i++) {
    const copy = copies[i - 1];
    copy.style.transform = makeTransformString(
      i * distanceLerped.y * 0.03,
      i * translateZ,
      i * rotate * (distanceLerped.x * 0.003),
      i * skew * (distanceLerped.x * 0.003)
    );
  }

  requestAnimationFrame(updateTextPosition);
}

function makeTransformString(y, z, rotate, skew) {
  return `perspective(${perspective}px) translate3d(0px, ${y}px, ${z}px) rotate(${rotate}deg) skew(${skew}deg)`;
}

function lerpV2(position, targetPosition) {
  position.x += (targetPosition.x - position.x) * 0.2;
  position.y += (targetPosition.y - position.y) * 0.2;
}

function newV2(x = 0, y = 0) {
  return {
    x: x,
    y: y,
  };
}

updateCenter();
document.addEventListener("mousemove", trackMousePosition);
window.addEventListener("resize", updateCenter);
requestAnimationFrame(updateTextPosition);
