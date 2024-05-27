window.onload = function(){
  document.querySelector("#init").addEventListener("click", ReadElementsNumber);
  let elements = document.querySelectorAll(".item");

  elements.forEach((element, index) => {
    addDragListeners(element);
    colorRect(element, index);
  });
}

function ReadElementsNumber(){
  let nums = document.querySelector("#inpNumbers").value;
  let rectCount =  document.querySelectorAll(".item").length;

  let element = document.createElement("div");
  element.appendChild(document.createElement("span"));
  element.classList.add("item");
  let elements = [];
  let outerElement = document.querySelector(".container");
  
  for(let i = 0; i < nums; i++)
  elements.push(element.cloneNode(true));
  
  elements.forEach((el, index) => {
    addDragListeners(el);
    colorRect(el, index + rectCount);
    el.querySelector("span").innerText = index + rectCount + 1;
    outerElement.appendChild(el);
  })
}

function colorRect(el, index){
  el.style.background = `rgb(${5*index}, ${5*index}, ${255 - index})`;
}

function addDragListeners(el){
  el.addEventListener("touchstart", dragStart);
  el.addEventListener("touchmove", drag, false);
  el.addEventListener("touchend", dragEnd, false);
  el.addEventListener("mousedown", dragStart);
  el.addEventListener("mousemove", drag, false);
  el.addEventListener("mouseup", dragEnd, false);
}

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var oofsetX = 0;
var oofsetY = 0;

function dragStart(e) {
 
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  } else {
    initialX = e.clientX;
    initialY = e.clientY;
  }

  let transformProp = e.target.style.transform;
  if(transformProp !== ""){
    let transofm = transformProp.slice(transformProp.indexOf("(") + 1, transformProp.length - 1  );
    [oofsetX, oofsetY] = transofm.split("px, ", 2);
  }  
    active = true;
}
    
// console.log(Hello);

function drag(e) {
  if (active) {
    
    e.preventDefault();
    
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    currentX += +oofsetX;
    currentY += +oofsetY;

    setTranslate(currentX, currentY, e.target);
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}