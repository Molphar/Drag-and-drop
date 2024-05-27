let numsInput;
let containerItems;
let initButt;

window.onload = function () {
    initButt = document.getElementById("init");
    numsInput = document.getElementById("inpNumbers");
    containerItems = document.querySelector(".inner-container");

    initButt.addEventListener("click", ReadElementsNumber);
    let elements = document.querySelectorAll(".item");

    elements.forEach((el, index) => {
        addDragListeners(el);
        colorRect(el, index);
    });
}

function ReadElementsNumber() {
    const nums = numsInput.value;
    const rectCount = document.querySelectorAll(".item").length;
    let element = document.createElement("div");
    element.appendChild(document.createElement("span"));
    element.classList.add("item");
    let elements = [];

    for (let i = 0; i < nums; i++) {
        elements.push(element.cloneNode(true));
    }

    elements.forEach((el, index) => {
        addDragListeners(el);
        colorRect(el, index + rectCount);
        el.querySelector("span").innerText = index + rectCount + 1;
        containerItems.appendChild(el);
    })
}

function colorRect(el, index) {
    el.style.background = `rgb(${5 * index}, ${5 * index}, ${255 - index})`;
}

function addDragListeners(el) {
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove, false);
    el.addEventListener("touchend", onDragEnd, false);
    el.addEventListener("mousedown", onMouseStart);
    el.addEventListener("mousemove", onMouseMove, false);
    el.addEventListener("mouseup", onDragEnd, false);
}

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let offsetX;
let offsetY;

function onMouseStart(mouseEvent) {
    let x = mouseEvent.clientX;
    let y = mouseEvent.clientY;
    offsetX = parseInt(window.getComputedStyle(mouseEvent.currentTarget)["left"], 10);
    offsetY = parseInt(window.getComputedStyle(mouseEvent.currentTarget)["top"], 10);
    dragStart(x, y);
}

function onTouchStart(touchEvent) {
    let touch = touchEvent.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    offsetX = parseInt(window.getComputedStyle(mouseEvent.currentTarget)["left"], 10);
    offsetY = parseInt(window.getComputedStyle(mouseEvent.currentTarget)["top"], 10);
    dragStart(x, y);
}

function dragStart(x, y) {
    initialX = x;
    initialY = y;
    isDragging = true;
}

function onTouchMove(touchEvent) {
    if (isDragging) {
        touchEvent.preventDefault();
        let touch = touchEvent.touches[0];
        let x = touch.clientX;
        let y = touch.clientY;
        drag(x, y);
        setPosition(currentX, currentY, touchEvent.currentTarget);
    }
}

function onMouseMove(mouseEvent) {
    if (isDragging) {
        mouseEvent.preventDefault();
        let x = mouseEvent.clientX;
        let y = mouseEvent.clientY;
        drag(x, y);
        setPosition(currentX, currentY, mouseEvent.currentTarget);
    }
}

function setPosition(xPos, yPos, el) {
    el.style.left = xPos + "px";
    el.style.top = yPos + "px";
}

function drag(x, y) {
    currentX = x - initialX + offsetX;
    currentY = y - initialY + offsetY;
}

function onDragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

