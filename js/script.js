// Define UI Element
let form = document.querySelector('#taskForm');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clearTaskBtn');
let filter = document.querySelector('#taskFilter');
let taskInput = document.querySelector('#newTask');


// Define event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);


// Define Function
// Add Task
function addTask(e){
    if(taskInput.value == ''){
        alert("Add a task!");
    }
    else{
        // crete li element 
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value+" "));
        
        let link = document.createElement('a');
        link.setAttribute('href', "#");
        link.innerHTML = 'x';

        li.appendChild(link);
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);
        
        taskInput.value = '';
    }
    e.preventDefault();     // form Ta jate reload na hoy!
}

// Remove Task
function removeTask(e){
    // console.log(e.target);
    if(e.target.hasAttribute("href")){
        if(confirm("Want to delete?")){
            let ele = e.target.parentElement;
            ele.remove();
            // console.log(ele);
            removeFromLS(ele);  // local storage thke rmv er jonno
        }
        
    }
}

// Clear Task
function clearTask(e){
    // taskList.innerHTML = "";  //way 1

    while(taskList.firstChild){    // way 2 | faster way
        // taskList.firstChild.remove();
        taskList.removeChild(taskList.firstChild);    
    }
    localStorage.clear();  // Local storage clear hoye jabe
}


// Filter Task
function filterTask(e){
    let text = e.target.value.toLowerCase();
    
    document.querySelectorAll('li').forEach(task => {

        let item = task.firstChild.textContent.toLowerCase();
        if(item.indexOf(text) != -1){
            task.style.display = "block";
        }
        else{
            task.style.display = "none";
        }
    });
}


// Store in local storage
function storeTaskInLocalStorage (task){
     let allTask;
     if(localStorage.getItem('allTask') === null){
        allTask = [];
     }
     else{
        allTask = JSON.parse(localStorage.getItem('allTask'));
     }
     allTask.push(task);

     localStorage.setItem("allTask", JSON.stringify(allTask));
}


// getTasks
function getTasks(){
    let allTask;
    if(localStorage.getItem('allTask') === null){
        allTask = [];
    } else{
        allTask = JSON.parse(localStorage.getItem('allTask'));
    }

    allTask.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task+" "));
        
        let link = document.createElement('a');
        link.setAttribute('href', "#");
        link.innerHTML = 'x';

        li.appendChild(link);
        taskList.appendChild(li);
    })
}



// remove from local storage
function removeFromLS(taskItem){
    let allTask;
     if(localStorage.getItem('allTask') === null){
        allTask = [];
     }
     else{
        allTask = JSON.parse(localStorage.getItem('allTask'));
     }
     
     let li = taskItem;
     li.removeChild(li.lastChild); // <a>x</a>

     allTask.forEach((task, index) => {
         if(li.textContent.trim() === task){
            allTask.splice(index, 1);
         }
     });

     localStorage.setItem('allTask', JSON.stringify(allTask));
}