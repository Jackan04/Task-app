let taskForm = document.querySelector("#task-form")
const taskInput = document.querySelector("#task-form input")
const completedTasks = document.querySelector("#completed-tasks")
const remainingTasks = document.querySelector("#remaining-tasks")
const totalTasks = document.querySelector("#total-tasks")
const taskList = document.querySelector("#task-list")
const buttonHideCompleted = document.querySelector("#button-hide-completed")
const buttonToggleDatePicker = document.querySelector("#button-toggle-datepicker")
const dueDateInput = document.querySelector("#duedate-input")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let hideCompleted = false
let isDatePickerOpen = false

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

taskForm.addEventListener("submit", function(event){
    event.preventDefault();
       
    let inputValue = taskInput.value
    let inputDate = dueDateInput.value

    if(inputValue == ""){
        return
    }

    const task = {
        id: new Date().getTime(),
        name: inputValue,
        isCompleted: false,
        duedate: inputDate,
    }

    addNewTask(task)
    taskInput.value = ""
   
})

buttonToggleDatePicker.addEventListener("click", function(event){
    event.preventDefault()
    
    if(isDatePickerOpen == false){
        dueDateInput.showPicker()
        isDatePickerOpen = true;
    }else {
        dueDateInput.blur(); 
        isDatePickerOpen = false;
    }
    
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
    const dueDateElement = document.createElement("span")
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

    let todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0); 
    
    let taskDate = new Date(task.duedate); 
    taskDate.setHours(0, 0, 0, 0); 
    
    if (taskDate.getTime() === todaysDate.getTime()) { 
       taskElement.style.backgroundColor = "#FFE5D3"
    }
    // else{
    //     dueDateElement.textContent = task.duedate
    // }
    
 
    dueDateElement.style.fontSize = "10px"
    dueDateElement.style.paddingRight = "10px"

    taskElement.append(checkbox, taskName, dueDateElement)
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

// function isToday(dateString) {
//     const today = new Date();
//     const taskDate = new Date(dateString);

//     return (
//         today.getFullYear() === taskDate.getFullYear() &&
//         today.getMonth() === taskDate.getMonth() &&
//         today.getDate() === taskDate.getDate()
//     );
// }



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