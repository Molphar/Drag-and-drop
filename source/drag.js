
let currentX;
let currentY;
let initialX;
let initialY;
let offsetX;
let offsetY;

export function dragStart(x, y, offx, offy) {
    offsetX = isNaN(offx) ? 0 : parseInt(offx, 10);
    offsetY = isNaN(offy) ? 0 : parseInt(offy, 10);
    initialX = x;
    initialY = y;
}

export function dragEnd() {
    initialX = currentX;
    initialY = currentY;
}

export function drag(x, y, el) {
    currentX = x - initialX + offsetX;
    currentY = y - initialY + offsetY;
    setPosition(currentX, currentY, el);
}

function setPosition(xPos, yPos, el) {
    el.style.left = xPos + "px";
    el.style.top = yPos + "px";
}
