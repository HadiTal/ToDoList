//varaiables
let idDo = 0;

//select element

const addToDo = document.querySelector(".add-input");
const containerLists = document.querySelector(".list-container");
const inputMain = document.getElementById("input-task");
const delInput = document.querySelector(".delete-input");

//event lsitners

eventListner();

function eventListner() {
    addToDo.addEventListener("click", addLisToDo);
    addToDo.addEventListener("click", saveToDoList);
    containerLists.addEventListener("click", removeList);
    delInput.addEventListener("click", deleteAllList);
    document.addEventListener("DOMContentLoaded", loadElementList);
    containerLists.addEventListener("click", editTask);
    containerLists.addEventListener("click", doTask);
}

//functions

//function create element List

function addLisToDo() {
    //Check that if we write the input value in which we specify our activity,
    //if it is not empty, add the list
    if (inputMain.value.length > 0) {
        //Create elements for lists
        const containerInput = document.createElement("div");
        const inputTask = document.createElement("input");
        const tasKDo = document.createElement("span");
        const taskEdit = document.createElement("span");
        const taskDelete = document.createElement("span");

        const iconDo = document.createElement("i");
        const iconEdit = document.createElement("i");
        const iconDelete = document.createElement("i");

        //Extract the last ID and add one to it and assign it to the new list
        let lastId = experstLstId();

        lastId = lastId + 1;

        //Add classes and properties to built-in elements
        containerInput.classList.add("my-list");

        inputTask.setAttribute("type", "text");
        inputTask.setAttribute("readonly", "readonly");
        inputTask.setAttribute("id", lastId);

        tasKDo.classList.add("class-check");
        taskEdit.classList.add("class-edit");
        taskDelete.classList.add("class-del");
        iconDo.classList.add("fas", "fa-check");
        iconDo.setAttribute("aria-hidden", "true");
        iconEdit.classList.add("far", "fa-edit");
        iconEdit.setAttribute("aria-hidden", "true");
        iconDelete.classList.add("fas", "fa-trash");
        iconDelete.setAttribute("aria-hidden", "true");

        //Insert icon elements into span tags
        tasKDo.appendChild(iconDo);
        taskEdit.appendChild(iconEdit);
        taskDelete.appendChild(iconDelete);

        //Assign user activity value to lists
        inputTask.value = inputMain.value;

        containerInput.appendChild(inputTask);
        containerInput.appendChild(tasKDo);
        containerInput.appendChild(taskEdit);
        containerInput.appendChild(taskDelete);

        containerLists.appendChild(containerInput);
    } else {
        window.alert("You must enter a value to add a new activity");
    }
}

//Save new activity in Local Storage
function saveToDoList() {
    const id = experstLstId();

    idDo = experstLstId();

    console.log(idDo);

    const arrayListToDo = checkLocalStorage();

    const textToDo = inputMain.value;

    arrayListToDo.push({ task: textToDo, Do: false, id: (idDo = idDo + 1) });

    localStorage.setItem("listToDo", JSON.stringify(arrayListToDo));

    inputMain.value = "";
}

//Check if this array is in Local Storage or not?
function checkLocalStorage() {
    const listToDo = [];

    let result;

    if (localStorage.getItem("listToDo") === null) {
        result = localStorage.setItem("listToDo", JSON.stringify(listToDo));
    } else {
        result = JSON.parse(localStorage.getItem("listToDo"));
    }

    return JSON.parse(localStorage.getItem("listToDo"));
}

//Remove lists from existing lists

function removeList(e) {
    if (e.target.classList.contains("class-del")) {
        //Execution of the delete function from the local storage
        removeListFromLocalStorage(
            e.target.parentElement.children[0].value,
            e.target.parentElement.children[0].getAttribute("id")
        );

        e.target.parentElement.remove();
    } else if (e.target.classList.contains("fa-trash")) {
        //Execution of the delete function from the local storage
        removeListFromLocalStorage(
            e.target.parentElement.parentElement.children[0].value,
            e.target.parentElement.parentElement.children[0].getAttribute("id")
        );

        e.target.parentElement.parentElement.remove();
    }
}

//Delete all existing lists
function deleteAllList() {
    const list = document.querySelectorAll(".my-list");

    inputMain.value = "";

    if (list.length !== 0) {
        list.forEach((element) => {
            element.remove();
        });

        localStorage.clear();
    }
}

//Remove the desired activity from within the local storage
function removeListFromLocalStorage(valueDelte, idDelete) {
    const arrayListToDo = JSON.parse(localStorage.getItem("listToDo"));

    //
    let id = Number(idDelete);

    arrayListToDo.forEach((element, index) => {
        if (element.task === valueDelte && element.id === id) {
            console.log(element);

            arrayListToDo.splice(index, 1);
        }
    });

    localStorage.setItem("listToDo", JSON.stringify(arrayListToDo));
}

//function Function to extract the last activity ID number

function experstLstId() {
    let resultId;

    const arrayListToDo = JSON.parse(localStorage.getItem("listToDo"));

    if (arrayListToDo === null || arrayListToDo.length === 0) {
        resultId = idDo;
    } else {
        const arrayDO = JSON.parse(localStorage.getItem("listToDo"));

        resultId = arrayDO[arrayDO.length - 1].id;
    }

    return resultId;
}

//Load elements
function loadElementList() {
    const arrayListToDo = JSON.parse(localStorage.getItem("listToDo"));

    if (arrayListToDo !== null) {
        arrayListToDo.forEach((element) => {
            //Create elements for lists
            const containerInput = document.createElement("div");
            const inputTask = document.createElement("input");
            const tasKDo = document.createElement("span");
            const taskEdit = document.createElement("span");
            const taskDelete = document.createElement("span");

            const iconDo = document.createElement("i");
            const iconEdit = document.createElement("i");
            const iconDelete = document.createElement("i");

            //Add classes and properties to built-in elements
            containerInput.classList.add("my-list");

            inputTask.setAttribute("type", "text");
            inputTask.setAttribute("readonly", "readonly");
            inputTask.setAttribute("id", element.id);

            tasKDo.classList.add("class-check");
            taskEdit.classList.add("class-edit");
            taskDelete.classList.add("class-del");
            iconDo.classList.add("fas", "fa-check");
            iconDo.setAttribute("aria-hidden", "true");
            iconEdit.classList.add("far", "fa-edit");
            iconEdit.setAttribute("aria-hidden", "true");
            iconDelete.classList.add("fas", "fa-trash");
            iconDelete.setAttribute("aria-hidden", "true");

            //Insert icon elements into span tags
            tasKDo.appendChild(iconDo);
            taskEdit.appendChild(iconEdit);
            taskDelete.appendChild(iconDelete);

            //Assign user activity value to lists
            inputTask.value = element.task;

            containerInput.appendChild(inputTask);
            containerInput.appendChild(tasKDo);
            containerInput.appendChild(taskEdit);
            containerInput.appendChild(taskDelete);

            containerLists.appendChild(containerInput);

            if (element.Do === true) {
                inputTask.style.textDecoration = "line-through";
                inputTask.style.backgroundColor = "#F1D4C3";
            }
        });
    }
}

//Edit desired activities
function editTask(e) {
    if (e.target.classList.contains("class-edit")) {
        const arrayListToDo = JSON.parse(localStorage.getItem("listToDo"));

        const valueTask = e.target.parentElement.children[0].value;

        let id = Number(e.target.parentElement.children[0].getAttribute("id"));

        const editValue = window.prompt("edit the select item", valueTask);

        if (editValue !== null) {
            arrayListToDo.forEach((element) => {
                if (element.id === id) {
                    element.task = editValue;
                }
            });
        }

        localStorage.setItem("listToDo", JSON.stringify(arrayListToDo));

        const myListsToDo = document.querySelectorAll(".list-container");

        myListsToDo.forEach((elemnet) => {
            elemnet.children[(id = id - 1)].children[0].value = editValue;
        });
    } else if (e.target.classList.contains("fa-edit")) {
        const arrayListToDo = JSON.parse(localStorage.getItem("listToDo"));

        const valueTask = e.target.parentElement.parentElement.children[0].value;

        let id = Number(
            e.target.parentElement.parentElement.children[0].getAttribute("id")
        );
        const editValue = window.prompt("edit the select item", valueTask);

        if (editValue !== null) {
            arrayListToDo.forEach((element) => {
                if (element.id === id) {
                    element.task = editValue;
                }
            });
        }

        localStorage.setItem("listToDo", JSON.stringify(arrayListToDo));

        const myListsToDo = document.querySelectorAll(".list-container");

        myListsToDo.forEach((elemnet) => {
            elemnet.children[(id = id - 1)].children[0].value = editValue;
        });
    }
}

//Record what is being done
function doTask(e) {
    if (e.target.classList.contains("class-check")) {
        const arrayListToDo = JSON.parse(localStorage.getItem("listToDo"));

        e.target.parentElement.children[0].style.textDecoration = "line-through";
        e.target.parentElement.children[0].style.backgroundColor = "#F1D4C3";
        const id = Number(e.target.parentElement.children[0].getAttribute("id"));

        arrayListToDo.forEach((element) => {
            if (element.id === id) {
                element.Do = true;
            }
        });

        localStorage.setItem("listToDo", JSON.stringify(arrayListToDo));
    } else if (e.target.classList.contains("fa-check")) {
        const arrayListToDo = JSON.parse(localStorage.getItem("listToDo"));

        e.target.parentElement.parentElement.children[0].style.textDecoration =
            "line-through";

        e.target.parentElement.parentElement.children[0].style.backgroundColor =
            "#F1D4C3";

        const id = Number(
            e.target.parentElement.parentElement.children[0].getAttribute("id")
        );
        arrayListToDo.forEach((element) => {
            if (element.id === id) {
                element.Do = true;
            }
        });

        localStorage.setItem("listToDo", JSON.stringify(arrayListToDo));
    }
}