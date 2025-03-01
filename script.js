let taskForm = document.querySelector("#task-form")
const taskInput = document.querySelector("#task-form input")
const completedTasks = document.querySelector("#completed-tasks")
const remainingTasks = document.querySelector("#remaining-tasks")
const totalTasks = document.querySelector("#total-tasks")
const taskList = document.querySelector("#task-list")
const buttonHideCompleted = document.querySelector("#button-hide-completed")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let hideCompleted = false

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

taskForm.addEventListener("submit", function(event){
    event.preventDefault();

    let inputValue = taskInput.value

    if(inputValue == ""){
        return
    }

    const task = {
        id: new Date().getTime(),
        name: inputValue,
        isCompleted: false,
    }

    addNewTask(task)
    taskInput.value = ""
   
})



    buttonHideCompleted.addEventListener("click", function(){
    
        if(hideCompleted){
            buttonHideCompleted.textContent = "Hide completed"
            hideCompleted = false
        }
        else if(hideCompleted == false){
            buttonHideCompleted.textContent = "Show completed"
            hideCompleted = true
        }
    
        renderTasks()
    })




function addNewTask(task){
    tasks.push(task)
    saveTasks()
    renderTask(task)
    renderTasks()
    updateStats()
}

function renderTask(task){
    const taskElement = document.createElement("li")
    taskElement.classList.add("task")
    taskElement.setAttribute("id", task.id)

    if(task.isCompleted){
        taskElement.classList.add("completed")

    }
    taskName = document.createElement("span")
    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = task.isCompleted
    taskName.textContent = task.name
    taskElement.appendChild(checkbox)
    taskElement.appendChild(taskName)
    taskList.appendChild(taskElement)
    taskElement.classList.add("task")

    checkbox.addEventListener("change", function(){
    task.isCompleted = checkbox.checked

        if(task.isCompleted){
            taskElement.classList.add("completed")
            
            
        }
        else{
            taskElement.classList.remove("completed")
            
        }

        saveTasks()
        renderTasks()
        updateStats()
})
        // Removing a task
        taskElement.addEventListener("dblclick", function(event){
        const taskElement = event.target.closest("li"); 
        const taskId = Number(taskElement.id); 
        
        const confirmation = confirm(`Are you sure you want to delete: "${task.name}"?`);

        if(confirmation){
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasks()
            taskElement.remove();
            renderTasks()
            updateStats()
        }
      
    })
  
}

function updateStats(){
    const completedTasksCounter = tasks.filter(task => task.isCompleted).length
    const remainingTasksCounter = tasks.filter(task => !task.isCompleted).length
    const totalTasksCounter = tasks.length

    if(tasks.length == 0){
        completedTasks.textContent = "0"
        remainingTasks.textContent = "0"
        totalTasks.textContent = "0"
    }else{
        completedTasks.textContent = completedTasksCounter
        remainingTasks.textContent = remainingTasksCounter
        totalTasks.textContent = totalTasksCounter
    }
    

    buttonHideCompleted.style.display = tasks.length ? "flex" : "none"

}


function renderTasks(){
    taskList.innerHTML = ""

    tasks.sort((a,b) => a.isCompleted - b.isCompleted)
    tasks.forEach(task => {

        if(hideCompleted && task.isCompleted){
            return
        }
        renderTask(task)
    });

    saveTasks()
}

renderTasks()
updateStats()