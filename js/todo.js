const todoForm = document.querySelector(".todoForm"),
      todoInput = todoForm.querySelector("input"),
      pendingList = document.querySelector(".pending"),
      finishedList = document.querySelector(".finished");

const PENDING_LS = "PENDING",
      FINISHED_LS = "FINISHED";

let PD_CN=[],
    FN_CN=[];

let newId=new Date().getTime();

function savePending(){
    localStorage.setItem(PENDING_LS,JSON.stringify(PD_CN));
}
function saveFinished(){
    localStorage.setItem(FINISHED_LS,JSON.stringify(FN_CN));
}
function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    const whatDelete = li.parentNode;
    whatDelete.removeChild(li);
    const cleanTask = PD_CN.filter(function(todo){
        return  todo.id !== parseInt(li.id);
    });
    const cleanFnTask = FN_CN.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });

    PD_CN = cleanTask;
    FN_CN = cleanFnTask;
    saveFinished();
    savePending();
}

function backToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    li.removeChild(btn);

    const fnBtn = document.createElement("button");
    fnBtn.innerText = "✅";
    fnBtn.addEventListener("click",finishedToDo);

    pendingList.append(li);
    li.append(fnBtn);

    const modifiToDo = FN_CN.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });
    const cleanTodo = FN_CN.filter(function(todo){
        return todo.id === parseInt(li.id);
    });

    FN_CN =modifiToDo;
    PD_CN.push(cleanTodo[0]);
    savePending();
    saveFinished();
}

function finishedToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    li.removeChild(btn);

    const mvBtn = document.createElement("button");
    mvBtn.innerText = "⏪";
    mvBtn.addEventListener("click", backToDo);

    finishedList.append(li);
    li.append(mvBtn);

    const modifiToDo = PD_CN.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });
    const cleanToDo = PD_CN.filter(function(todo){
        return todo.id === parseInt(li.id);
    });
    PD_CN = modifiToDo;
    FN_CN.push(cleanToDo[0]);
    saveFinished();
    savePending();
}



function paintToDo(text){
    const li =document.createElement("li"),
          span = document.createElement("span"),
          delBtn = document.createElement("button"),
          fnBtn = document.createElement("button");

    span.innerText = text;
    delBtn.innerText = "❌";
    fnBtn.innerText = "✅";

    delBtn.addEventListener("click",deleteTodo);
    fnBtn.addEventListener("click",finishedToDo);

    pendingList.append(li);
    li.append(span);
    li.append(delBtn);
    li.append(fnBtn);
    li.id = newId

    const newObj = {
        id : newId,
        text : text
    };

    PD_CN.push(newObj);

    savePending();
    newId+=1;
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue =todoInput.value;
    paintToDo(currentValue);
    todoInput.value = "";
}

function loadToDo(){
    const currentPending = localStorage.getItem(PENDING_LS);
    const currentFinished = localStorage.getItem(FINISHED_LS);
    if(currentPending !==null){
        const parsePending = JSON.parse(currentPending);
        parsePending.forEach(function(todo){
            paintToDo(todo.text);
        })
    }
}

function init(){
    loadToDo();
    todoForm.addEventListener("submit",handleSubmit);
}

init();