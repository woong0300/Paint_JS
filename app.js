const canvas = document.getElementById("jsCanvas");

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
}


function onMouseDown(event){
    painting(true);
}

function OnMouseUp(event){
    painting(false);
}

function OnMouseLeave(event){
    painting(false);
}
//스크린에서 그리는 것이면 똑같겠지만 지금은 캔버스사이즈를 임의로 줬기 떄문에
// screenX, Y와 offsetX, Y는 여기서는 달라

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", OnMouseUp)
    canvas.addEventListener("mouseleave", OnMouseLeave)
}

