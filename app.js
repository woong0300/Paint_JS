const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");    
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";

//캔버스의 배경이 없는 상태를 막기위해 흰 바탕으로 초기화 해주기!!
ctx.fillStyle ="white";
ctx.fillRect(0, 0, 700, 700);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.linewidth = 2.5;
// console.log(Array.from(colors))
//html.collections라고 나오는 위의 함수를 통해 어레이로 변환가능~!


const rect = document.getElementById("jsRect");
// canvas pixel modifier을 안주면 동작을 안한다잉!! 조심합시다!
canvas.width = 700;
canvas.height = 700;

//context는 canvas안에서 픽셀을 다루는 것!! 여러 default를 설정하자!
// context를 통해 convas에서 그림을 그릴 수 있다.
// canvas는 그냥 html element이고 그 요소 안에서 픽셀을 다룰 수 있다!!



let drawingRect = false;
let filling = false;
let painting = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

//여기서 마우스의 움직임을 가져와서 그리는 것이기 때문에 중요하다!!

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!drawingRect){
        if(!painting){              //이 부분을 지우면 끊었던 부분에서 이어진다.
            ctx.beginPath();        
            ctx.moveTo(x, y);       //여기서 path를 추적!! 아직 사용은 X 
            console.log("making path", x, y);
        }
        else{       //painting이 true가 되면서 위에서 만든 path가 사용되는 것!!
            ctx.lineTo(x, y);
            ctx.stroke();
            console.log("print line", x, y);
            //ctx.closePath();  // if구문을 안쓰는 거랑 비슷한 효과
        }
    
    }
    
}

function onMouseDown(event){
    if(!drawingRect&&!filling){
        painting = true;
    }
    
    //그리는 시작점을 지정해주는 역할만 하는거다.
}

//스크린에서 그리는 것이면 똑같겠지만 지금은 캔버스사이즈를 임의로 줬기 떄문에
// screenX, Y와 offsetX, Y는 여기서는 달라

function handleColorCilck(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    if(filling===true){
        filling = false;
        mode.innerText = "Fill";

    }
    else{
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle
    }
}

function handleCanvasCilck(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    else{

    }
    
}

function handleSaveClick(){
    //default가 PNG라 아랫줄을 지우면 PNG로 저장될 듯
    //const image = canvas.toDataURL("image/jpeg");
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS_your_Drawing";
    link.click();
}

if(canvas){
    if(!drawingRect){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click",handleCanvasCilck)
    }
    
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorCilck));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}


//나만의 부가함수 - 사각형 그리기!!

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let paintingRect = false;
// function getPoint(a, b){
//     return [a, b];
// }
function stopPaintingRect(){
    paintingRect =false;
//     const endX = event.offsetX;
//     const endY = event.offsetY;
//     getPoint(endX, endY)
}

//조건문 설정의 중요성. 이게 뭐라고 여기서 그렇게 오류를...
function handleRectClick(event){
    if(drawingRect===false){
        drawingRect = true;
        console.log(event)
        event.target.style.backgroundColor = "grey";
    }
    else{
        drawingRect = false;
        event.target.style.backgroundColor = "white";
    }
}
//포인터를 좌상향으로 움직여서 그리면 사각형이 반대방향으로 그려지는 버그!!
//우하향으로 대각선을 인식해서 그리는 방식이라 오류가 있다!!!
function onMouseUpRect(event){
    if(drawingRect){
        endX = event.offsetX;
        endY = event.offsetY;
        ctx.strokeRect(startX, startY, Math.abs(startX - endX), Math.abs(startY - endY))
        paintingRect = false;
    }
    
}
function onMouseDownRect(event){
    paintingRect = true;
    startX = event.offsetX;
    startY = event.offsetY;
    
    // const startX = event.offsetX;
    // const startY = event.offsetY;
    // getPoint(startX, startY)
}

function onMouseMoveRect(event){
    if(!drawingRect){
        //ctx.beginPath();        
        //ctx.moveTo(startX, startY);
    }
    else{
        
    }
}
//마우스 우클릭을 막아줄 수 있다
function handleCM(event){
    event.preventDefault();
}

if(rect){
    if(!painting){
        rect.addEventListener("click", handleRectClick);
        canvas.addEventListener("mousemove", onMouseMoveRect);
        canvas.addEventListener("mousedown", onMouseDownRect);
        canvas.addEventListener("mouseup", onMouseUpRect);
        canvas.addEventListener("mouseleave", stopPaintingRect);
        canvas.addEventListener("contextmenu", handleCM);
    }
    
}
