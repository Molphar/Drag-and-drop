import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import '../css/styles.css';
import { dragStart, drag, dragEnd } from './drag.js';

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
    containerItems = document.querySelector(".draggable-container");
    rangeSlider = document.getElementById("range-slider");

    numsInput.min = 0;
    numsInput.max = maxInputNumber;

    noUiSlider.create(rangeSlider, {
        start: 1,
        range: {
            'min': 0,
            'max': 100
        },
        step: 1
    })

    rangeSlider.noUiSlider.on("update", onRangeUpdate);
    numsInput.addEventListener("keyup", onNumberInput);
    setInputFilter(numsInput, function (value) {
        return /^\d*$/.test(value);
    });
    createBtn.addEventListener("click", onReadElementsNumber);
    resetBtn.addEventListener("click", onResetElementsPosition);
    let elements = document.querySelectorAll(".draggable-item");
    NodeListArray(elements, function (el, index) {
        addDragListeners(el);
        colorRect(el, index);

    })
}

function setInputFilter(input, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        input.addEventListener(event, function (inputEvent) {
            if (inputFilter(inputEvent.currentTarget.value)) {

                if (maxInputNumber !== "" && inputEvent.currentTarget.value > maxInputNumber) {
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
    changeRangeValue(value);
}

function onRangeUpdate(values, handle) {
    const value = Math.trunc(values[handle]);
    changeInputValue(numsInput, value);
}

function changeInputValue(inputEl, value) {
    inputEl.value = value;
}

function changeRangeValue(value) {
    rangeSlider.noUiSlider.set(value);
}

function onReadElementsNumber(clickEvent) {
    const nums = numsInput.value;
    const rectCount = document.querySelectorAll(".draggable-item").length;
    let element = document.createElement("div");
    element.appendChild(document.createElement("span"));
    element.classList.add("draggable-item");
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
    let elements = document.querySelectorAll(".draggable-container .draggable-item");
    NodeListArray(elements, (el, index) => {
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

function onMouseStart(mouseEvent) {
    const x = mouseEvent.clientX;
    const y = mouseEvent.clientY;
    dragStart(x, y,
        window.getComputedStyle(mouseEvent.currentTarget)["left"],
        window.getComputedStyle(mouseEvent.currentTarget)["top"]
    );
    isDragging = true;
}

function onTouchStart(touchEvent) {
    const touch = touchEvent.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    dragStart(x, y,
        window.getComputedStyle(touchEvent.currentTarget)["left"],
        window.getComputedStyle(touchEvent.currentTarget)["top"]
    );
    isDragging = true;
}

function onTouchMove(touchEvent) {
    if (isDragging) {
        touchEvent.preventDefault();
        const touch = touchEvent.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;
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

function onDragEnd(e) {
    dragEnd();
    isDragging = false;
}

function NodeListArray(nodeList, func) {
    const array = Array.prototype.slice.call(nodeList);
    array.forEach((el, index) => { func(el, index) });
}