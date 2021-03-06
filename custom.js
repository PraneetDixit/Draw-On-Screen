let canvas = document.createElement("canvas");
canvas.setAttribute("width", `${window.innerWidth}`);
canvas.setAttribute("height", `${window.innerHeight}`);
canvas.setAttribute("id","drawingCanvas");
document.body.appendChild(canvas);
    
let dc = document.getElementById("drawingCanvas");

dc.addEventListener("mousedown", setLastCoords);
dc.addEventListener("mousemove", freeForm);

const ctx = dc.getContext("2d");

function eraseCanvas(){
    ctx.clearRect(0, 0, dc.width, dc.height);
}

const erase = document.getElementById("erase");
erase.addEventListener("click", eraseCanvas);

function setLastCoords(e) {
    const {x, y} = dc.getBoundingClientRect();
    lastX = e.clientX - x;
    lastY = e.clientY - y;
}

function freeForm(e) {
    if (e.buttons !== 1) return;
    penTool(e);
}

let penColor = "red";

function penTool(e) {
    const {x, y} = dc.getBoundingClientRect();
    let newX = e.clientX - x;
    let newY = e.clientY - y;
    
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(newX, newY);
    ctx.strokeStyle = penColor;
    ctx.stroke();
    ctx.closePath();

    lastX = newX;
    lastY = newY;
}

let lastX = 0;
let lastY = 0;

document.querySelectorAll(".colors").forEach(function(item){
   item.addEventListener("click", function(){
       document.querySelectorAll(".colors").forEach(function(innerItem){
           innerItem.classList.remove("active");
       });
       item.classList.add("active");
       penColor = item.id;
   }); 
});

window.onbeforeunload = function(e){
    e.preventDefault();
    chrome.windows.update(parseInt(localStorage.getItem("baseDrawingWindowID")), {
        state: "maximized"
    });
}
