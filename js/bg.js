const body = document.querySelector("body");

const IMG_NUM = 7;

function paintNumber(text){
    const image = new Image();
    image.src = `./images/${text+1}.jpeg`;
    image.classList.add("bgImage");
    body.append(image);
}

function genNumber(){
    const number = Math.floor(Math.random()*IMG_NUM);
    return number;
}

function init(){
    const randomNumber = genNumber();
    paintNumber(randomNumber);
}

init();