import uiSlider from 'nouislider';

let numsInput;
let containerItems;
let createBtn;
let resetBtn;
let rangeSlider;
const maxInputNumber = 100;

window.onload = function () {
    numsInput = document.getElementById("inpNumbers");
    createBtn = document.getElementById("createElems");
    resetBtn = document.getElementById("resetPos");
    containerItems = document.querySelector(".inner-container");
    rangeSlider = document.getElementById("inpRangNumbers");

    numsInput.min = 0;
    numsInput.max = maxInputNumber;
    rangeSlider.addEventListener("input", onRangeInput);
    numsInput.addEventListener("keyup", onNumberInput);
    setInputFilter(numsInput, function (value) {
        return /^\d*$/.test(value);
    });
    createBtn.addEventListener("click", onReadElementsNumber);
    resetBtn.addEventListener("click", onResetElementsPosition);
    let elements = document.querySelectorAll(".item");

    elements.forEach((el, index) => {
        addDragListeners(el);
        colorRect(el, index);
    });
}

function setInputFilter(input, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        input.addEventListener(event, function (inputEvent) {
            if (inputFilter(inputEvent.currentTarget.value)) {
                if (inputEvent.currentTarget.value > maxInputNumber) {
                    inputEvent.currentTarget.value = maxInputNumber;
                }
                inputEvent.currentTarget.oldValue = inputEvent.currentTarget.value;
                inputEvent.currentTarget.oldSelectionStart = inputEvent.currentTarget.selectionStart;
                inputEvent.currentTarget.oldSelectionEnd = inputEvent.currentTarget.selectionEnd;
            } else if (inputEvent.currentTarget.hasOwnProperty("oldValue")) {
                inputEvent.currentTarget.value = inputEvent.currentTarget.oldValue;
                inputEvent.currentTarget.setSelectionRange(inputEvent.currentTarget.oldSelectionStart, inputEvent.currentTarget.oldSelectionEnd);
            }
        });
    });
}

function onNumberInput(inputEvent) {
    const value = inputEvent.target.value;
    changeInputValue(rangeSlider, value);
}

function onRangeInput(inputEvent) {
    const value = inputEvent.target.value
    changeInputValue(numsInput, value);
}

function changeInputValue(inputEl, value) {
    inputEl.value = value;
}

function onReadElementsNumber(clickEvent) {
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

function onResetElementsPosition(clickEvent) {
    elements = document.querySelectorAll(".inner-container .item");
    elements.forEach((el, index) => {
        el.style.removeProperty("left");
        el.style.removeProperty("top");
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
        drag(x, y, touchEvent.currentTarget);
    }
}

function onMouseMove(mouseEvent) {
    if (isDragging) {
        mouseEvent.preventDefault();
        let x = mouseEvent.clientX;
        let y = mouseEvent.clientY;
        drag(x, y, mouseEvent.currentTarget);
    }
}

function setPosition(xPos, yPos, el) {
    el.style.left = xPos + "px";
    el.style.top = yPos + "px";
}

function drag(x, y, el) {
    currentX = x - initialX + offsetX;
    currentY = y - initialY + offsetY;
    setPosition(currentX, currentY, el);
}

function onDragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}
