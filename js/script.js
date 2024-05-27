var numsInput;
var containerItems;
var initButt;

window.onload = function(){
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

function ReadElementsNumber(){
    const nums = numsInput.value;
    const rectCount = document.querySelectorAll(".item").length;
    let element = document.createElement("div");
    element.appendChild(document.createElement("span"));
    element.classList.add("item");
    let elements = [];
    
    for(let i = 0; i < nums; i++){
        elements.push(element.cloneNode(true));
    }
    
    elements.forEach((el, index) => {
        addDragListeners(el);
        colorRect(el, index + rectCount);
        el.querySelector("span").innerText = index + rectCount + 1;
        containerItems.appendChild(el);
    })
}

function colorRect(el, index){
    el.style.background = `rgb(${5*index}, ${5*index}, ${255 - index})`;
}

function addDragListeners(el){
    el.addEventListener("touchstart", onTouchDragStart);
    el.addEventListener("touchmove", onTouchDrag, false);
    el.addEventListener("touchend", onDragEnd, false);
    el.addEventListener("mousedown", onMouseDragStart);
    el.addEventListener("mousemove", onMouseDrag, false);
    el.addEventListener("mouseup", onDragEnd, false);
}

var isDragging = false;
var currentX;
var currentY;
var initialX;
var initialY;
var offsetX = 0;
var offsetY = 0;

function onMouseDragStart(mouseEvent) {
    let x = mouseEvent.clientX;
    let y = mouseEvent.clientY;
    dragStart(x, y, mouseEvent.target);
}

function onTouchDragStart(touchEvent) {
    let touch = touchEvent.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    dragStart(x, y);
}

function dragStart(x, y, el){
    initialX = x;
    initialY = y;

    let transformProp = el.style.transform;
    if(transformProp !== ""){
        let transofm = transformProp.slice(transformProp.indexOf("(") + 1, transformProp.length - 1    );
        [offsetX, offsetY] = transofm.split("px, ", 2);
    }else{
        offsetX = 0;
        offsetY = 0;
    }
    isDragging = true;

    console.log("dragStart: ", true);
    console.log("initialX", initialX);
    console.log("initialY", initialY);
}

function onTouchDrag(touchEvent) {
    if (isDragging) {
        touchEvent.preventDefault();
        let touch = touchEvent.touches[0]; 
        let x = touch.clientX;
        let y = touch.clientY;
        drag(x, y, touchEvent.target);
    }
}

function onMouseDrag(mouseEvent) {
    if (isDragging) {
        mouseEvent.preventDefault();
        let x = mouseEvent.clientX;
        let y = mouseEvent.clientY;
        drag(x, y, mouseEvent.target);
    }
}

function drag(x, y, el){
    currentX = x - initialX + Number(offsetX);
    currentY = y - initialY + Number(offsetY);
    setTranslate(currentX, currentY, el);
    console.log("drag: ", true);
    console.log("currentX ", currentX);
    console.log("currentY ", currentY);
}

function onDragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
