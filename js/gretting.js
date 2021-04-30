const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      gretting = document.querySelector(".js-gretting");

const CURRENT_USER = "User_name";

const SHOW_CN = "showing";

function saveName(text){
    localStorage.setItem(CURRENT_USER,text);
}

function paintName(text){
    form.classList.remove(SHOW_CN);
    gretting.classList.add(SHOW_CN);
    const date = new Date();
    const hour = date.getHours();
    const hour1 = hour-"12";
    if(hour < 1) {
        gretting.innerText = `It's ${hour1 +24}o'clock, good night ${text}!`;
    } else if( hour < 3) {
        gretting.innerText = `It's late, it's time to sleep ${text}!`;
    } else if (hour < 5) {
        gretting.innerText = `What are you doing at dawn, ${text}?`;
    } else if (hour < 11) {
        gretting.innerText = `Good morning ${text}`;
    } else if (hour < 14) {
        gretting.innerText = `It's an exciting lunch break ${text}!`;
    } else if (hour <18 ) {
        gretting.innerText = `Now ${hour1}o'clock now, ${text}!`;
    } else if (hour <20 ) {
        gretting.innerText = `I hope you have a nice dinner! ${text}`;
    } else if (hour < 23) {
        gretting.innerText = `Are you resting well? ${text}`;
    } else {
        gretting.innerText = `Good night ${text}`;
    }

}

function handleSubmit(e){
    e.preventDefault();
    const currentValue = input.value;
    paintName(currentValue);
    saveName(currentValue);
}

function askName(){
    form.classList.add(SHOW_CN);
    form.addEventListener("submit",handleSubmit);
}

function loadName(){
    const currentUser = localStorage.getItem(CURRENT_USER);
    if(currentUser === null){
        askName()
    } else{
        paintName();
    }
}

function init(){
    loadName();
    setInterval(loadName(),1000);
}

init();