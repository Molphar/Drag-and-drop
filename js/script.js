let numsInput;
let containerItems;
let initButt;

window.onload = function () {
    initButt = document.getElementById("init");
    numsInput = document.getElementById("inpNumbers");
    containerItems = document.querySelector(".container");

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

var isDragging = false;
var currentX;
var currentY;
var initialX;
var initialY;
var offsetX;
var offsetY;

function onMouseStart(mouseEvent) {
    let x = mouseEvent.clientX;
    let y = mouseEvent.clientY;
    const transform = mouseEvent.currentTarget.style.transform;
    dragStart(x, y, transform);
}

function onTouchStart(touchEvent) {
    let touch = touchEvent.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    const transform = mouseEvent.currentTarget.style.transform;
    dragStart(x, y, transform);
}

function dragStart(x, y, transform) {
    initialX = x;
    initialY = y;

    if (transform !== "") {
        [offsetX, offsetY] = transform
            .slice(transform.indexOf("(") + 1, transform.length - 1)
            .split("px, ", 2);
    } else {
        offsetX = 0;
        offsetY = 0;
    }
    isDragging = true;

}

function onTouchMove(touchEvent) {
    if (isDragging) {
        touchEvent.preventDefault();
        let touch = touchEvent.touches[0];
        let x = touch.clientX;
        let y = touch.clientY;
        drag(x, y);
        setTranslate(currentX, currentY, touchEvent.currentTarget);
    }
}

function onMouseMove(mouseEvent) {
    if (isDragging) {
        mouseEvent.preventDefault();
        let x = mouseEvent.clientX;
        let y = mouseEvent.clientY;
        drag(x, y);
        setTranslate(currentX, currentY, mouseEvent.currentTarget);

    }
}

function drag(x, y) {
    currentX = x - initialX + Number(offsetX);
    currentY = y - initialY + Number(offsetY);
}

function onDragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
