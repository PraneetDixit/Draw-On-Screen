(function(){

let styleTag = document.createElement("style");
styleTag.type = "text/css";
styleTag.appendChild(document.createTextNode(`
                    #drawingCanvas{
                        position: fixed;
                        top:0px;
                        left: 0px;
                        background: transparent;
                        z-index: 99999999;
                    }
                    #drawingOptions{
                        background-color: #ffa07acc;
                        position: fixed;
                        top: 100px;
                        left: 0px;
                        width: fit-content;
                        padding: 20px;
                        z-index: 9999999999;
                    }
                    #drawingOptions button{
                        background-color: transparent;
                        border: none;
                        cursor: pointer;
                        outline: none;
                        display: block;
                    }
                    #drawingOptions button img{
                        width: 30px;
                        height: auto;
                    }
                    #erase{
                        margin-bottom: 25px;
                    }
                    #remove img{
                        width: 25px;
                    }`));
    
document.head.appendChild(styleTag);

let canvas = document.createElement("canvas");
canvas.setAttribute("width", `${window.innerWidth-35}`);
canvas.setAttribute("height", `${window.innerHeight}`);
canvas.setAttribute("id","drawingCanvas");
document.body.appendChild(canvas);

let opt = document.createElement("div");
opt.setAttribute("id", "drawingOptions");
    
let eraseBtn = document.createElement("button");
eraseBtn.setAttribute("id", "erase");
    
let img1 = document.createElement("img");
img1.setAttribute("src", "https://raw.githubusercontent.com/PraneetDixit/Assets/main/eraser.png");
img1.setAttribute("alt", "Erase");
    
eraseBtn.appendChild(img1);
opt.appendChild(eraseBtn);
    
let closeBtn = document.createElement("button");
closeBtn.setAttribute("id", "remove");
    
let img2 = document.createElement("img");
img2.setAttribute("src", "https://raw.githubusercontent.com/PraneetDixit/Assets/main/close.png");
img2.setAttribute("alt", "Remove");
    
closeBtn.appendChild(img2);
opt.appendChild(closeBtn);

document.body.appendChild(opt);
    
document.getElementById("drawingCanvas").addEventListener("mousedown", setLastCoords);
document.getElementById("drawingCanvas").addEventListener("mousemove", freeForm);

const ctx = document.getElementById("drawingCanvas").getContext("2d");

function eraseCanvas(){
    ctx.clearRect(0, 0, document.getElementById("drawingCanvas").width, document.getElementById("drawingCanvas").height);
}

const erase = document.getElementById("erase");
erase.addEventListener("click", eraseCanvas);

function setLastCoords(e) {
    const {x, y} = document.getElementById("drawingCanvas").getBoundingClientRect();
    lastX = e.clientX - x;
    lastY = e.clientY - y;
}

function freeForm(e) {
    if (e.buttons !== 1) return;
    penTool(e);
}

function penTool(e) {
    const {x, y} = document.getElementById("drawingCanvas").getBoundingClientRect();
    let newX = e.clientX - x;
    let newY = e.clientY - y;
    
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(newX, newY);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();

    lastX = newX;
    lastY = newY;
}

let lastX = 0;
let lastY = 0;

const removeDrawing = document.getElementById("remove");
remove.addEventListener("click", function(){
    document.getElementById("drawingCanvas").removeEventListener("mousedown", setLastCoords);
    document.getElementById("drawingCanvas").removeEventListener("mousemove", freeForm);
    erase.removeEventListener("click", eraseCanvas);
    document.getElementById("drawingCanvas").remove();
    document.getElementById("drawingOptions").remove();
});
    
})();
