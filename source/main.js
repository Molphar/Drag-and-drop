import "nouislider/distribute/nouislider.css";
import "../css/styles.css";
import { dragStart, drag, dragEnd, currentX, currentY } from "./drag";
import { CreateSlider, AddInput } from "./slider";

let inpNumbers;
let btnCreate;
let btnResetPosition;
let containerItems;
let rangeSlider;
const maxInputNumber = 100;

window.onload = function() {
    inpNumbers = document.getElementById("elements-count");
    btnCreate = document.getElementById("elements-create");
    btnResetPosition = document.getElementById("reset-posirions");
    containerItems = document.querySelector(".draggable-container");

    rangeSlider = document.getElementById("range-slider");

    inpNumbers.min = 0;
    inpNumbers.max = maxInputNumber;

    CreateSlider(rangeSlider);
    AddInput(rangeSlider, inpNumbers);

    btnCreate.addEventListener("click", onReadElementsNumber);
    btnResetPosition.addEventListener("click", onResetElementsPosition);
    let elements = document.querySelectorAll(".draggable-item");
    NodeListArray(elements, function(el, index) {
        addDragListeners(el);
        colorRect(el, index);
    });
};

function onReadElementsNumber(clickEvent) {
    const nums = inpNumbers.value;
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
    });
}

function onResetElementsPosition(clickEvent) {
    let elements = document.querySelectorAll(
        ".draggable-container .draggable-item"
    );
    NodeListArray(elements, (el, index) => {
        el.style.removeProperty("left");
        el.style.removeProperty("top");
    });
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
    dragStart(
        x,
        y,
        window.getComputedStyle(mouseEvent.currentTarget)["left"],
        window.getComputedStyle(mouseEvent.currentTarget)["top"]
    );
    isDragging = true;
}

function onTouchStart(touchEvent) {
    const touch = touchEvent.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    dragStart(
        x,
        y,
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
    array.forEach((el, index) => {
        func(el, index);
    });
}
