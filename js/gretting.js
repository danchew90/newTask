const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    gretting = document.querySelector(".js-gretting");

const USER_LS = "currentUser",
    SHOWING_CL = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    console.log(currentValue);
    paintGretting(currentValue);
    saveName(currentValue);
}

function askName(){
    form.classList.add(SHOWING_CL);
    form.addEventListener("submit", handleSubmit);
}

function paintGretting(text){
    form.classList.remove(SHOWING_CL);
    gretting.classList.add(SHOWING_CL);
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
        gretting.innerText = `Now ${hour1}o'clock now, ${text}`;
    } else if (hour <20 ) {
        gretting.innerText = `I hope you have a nice dinner! ${text}`;
    } else if (hour < 23) {
        gretting.innerText = `Are you resting well? ${text}`;
    } else {
        gretting.innerText = `Good night ${text}`;
    }

}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askName();
    } else{
        paintGretting(currentUser);
    }
}

function init(){
    loadName();
    setInterval(loadName(),1000);
}

init();


