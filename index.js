// function myFun(){
//     // var y = document.getElementById("list");
//     document.getElementById('list').style.color = 'gray';
//     document.getElementById('list').style.textDecorationLine = 'line-through';
// }

function clearInputs(){
    console.log("Inputs cleared");
    document.getElementById('addList').value = '';
}

var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addItem);

function addItem(){
    var itemText = document.getElementById("addList").value;
    newToDoList(itemText, false);
}

function newToDoList(itemText, completed) {
//   var x = document.getElementById("addList").value;
  clearInputs();
  const node = document.createElement("li");
  const textnode = document.createTextNode(itemText);
  node.appendChild(textnode);
  if(completed){
      node.classList.add("completed");
  }
//   node.className = "";
  document.getElementById("myList").appendChild(node);

  node.addEventListener("dblclick", toggleState);
}

function toggleState(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed");
    }else{
        this.classList.add("completed");
    }
}

// completed button
var clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearCompletedToDoItems);

function clearCompletedToDoItems(){
    var completedItems = document.getElementsByClassName("completed");
    while(completedItems.length>0){
        completedItems.item(0).remove();
    }
}

// Empty List
var clearButton = document.getElementById("empty-button");
clearButton.addEventListener("click", emptyToDoItems);

function emptyToDoItems(){
    var allList = document.getElementsByTagName("li");
    while(allList.length>0){
        allList.item(0).remove();
    }
}


// save list in the local storage
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveListLocal);

var toDoList = document.getElementById("myList");

function saveListLocal() {
    // console.log("Hit save");
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    // console.log(toDos[0]);

    localStorage.setItem("toDos", JSON.stringify(toDos));
}


function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoList(toDo.task, toDo.completed);
        }
    }
    else{
        newToDoList("My", false);
        newToDoList("to-do", true);
        newToDoList("list", false);
    }
}

loadList();