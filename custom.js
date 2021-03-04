(function(){

let styleTag = `<style>
                    #drawingCanvas{
                        position: fixed;
                        top:0px;
                        left: 0px;
                        background: transparent;
                        z-index: 99999999;
                    }
                    #drawingOptions{
                        background-color: lightsalmon;
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
                    }
                </style>`;
document.head.innerHTML += styleTag;

let canvas = `<canvas id="drawingCanvas" width="${window.innerWidth-35}" height="${window.innerHeight}"></canvas>`;
document.body.innerHTML += canvas;

let opt = `<div id="drawingOptions">
                <button id="erase">
                    <img src="https://raw.githubusercontent.com/PraneetDixit/Assets/main/eraser.png" alt="Erase">
                </button>
                <button id="remove">
                    <img src="https://raw.githubusercontent.com/PraneetDixit/Assets/main/close.png" alt="Close">
                </button>
        </div>`
document.body.innerHTML += opt;

const c = document.getElementById("drawingCanvas");
c.addEventListener("mousedown", setLastCoords);
c.addEventListener("mousemove", freeForm);

const ctx = c.getContext("2d");

function eraseCanvas(){
    ctx.clearRect(0, 0, document.getElementById("drawingCanvas").width, document.getElementById("drawingCanvas").height);
}

const erase = document.getElementById("erase");
erase.addEventListener("click", eraseCanvas);

function setLastCoords(e) {
    const {x, y} = c.getBoundingClientRect();
    lastX = e.clientX - x;
    lastY = e.clientY - y;
}

function freeForm(e) {
    if (e.buttons !== 1) return;
    penTool(e);
}

function penTool(e) {
    const {x, y} = c.getBoundingClientRect();
    let newX = e.clientX - x;
    let newY = e.clientY - y;
    
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(newX, newY);
    console.log(newX, "   ", lastX);
    console.log(newY, "   ", lastY);
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