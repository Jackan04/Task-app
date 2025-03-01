let taskForm = document.querySelector("#task-form")
const taskInput = document.querySelector("#task-form input")
const completedTasks = document.querySelector("#completed-tasks")
const remainingTasks = document.querySelector("#remaining-tasks")
const totalTasks = document.querySelector("#total-tasks")
const taskList = document.querySelector("#task-list")
const buttonHideCompleted = document.querySelector("#button-hide-completed")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

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

        const taskElements = document.querySelectorAll(".task")

        taskElements.forEach(taskElement =>{
            if(taskElement.classList.contains("completed")){
                taskElement.style.display = "none"
            }
        })

        localStorage.setItem("tasks", JSON.stringify(tasks))

})


function addNewTask(task){
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
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

            localStorage.setItem("tasks", JSON.stringify(tasks))
            renderTasks()
            updateStats()
    })

  
}

function updateStats(){
    const completedTasksCounter = tasks.filter(task => task.isCompleted).length
    const remainingTasksCounter = tasks.filter(task => !task.isCompleted).length
    const totalTasksCounter = tasks.length
    completedTasks.textContent = completedTasksCounter
    remainingTasks.textContent = remainingTasksCounter
    totalTasks.textContent = totalTasksCounter

}


function renderTasks(){
    taskList.innerHTML = ""
    tasks.sort((a,b) => a.isCompleted - b.isCompleted)
    
    tasks.forEach(task => {
      
        renderTask(task)
    });
}

renderTasks()
updateStats()