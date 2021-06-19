let initialX;
let initialY;
let offsetX;
let offsetY;
let currentX;
let currentY;

const dragStart = (x, y, offx, offy) => {
    console.log(x, y, offx, offy);
    offsetX = isNaN(offx) ? 0 : parseInt(offx, 10);
    offsetY = isNaN(offy) ? 0 : parseInt(offy, 10);
    initialX = x;
    initialY = y;
};

const dragEnd = () => {
    initialX = currentX;
    initialY = currentY;
};

const drag = (x, y, el) => {
    currentX = x - initialX + offsetX;
    currentY = y - initialY + offsetY;
    setPosition(currentX, currentY, el);
};

const setPosition = (xPos, yPos, el) => {
    el.style.left = xPos + "px";
    el.style.top = yPos + "px";
};

export { currentX, currentY };
export { drag, dragEnd, dragStart };
