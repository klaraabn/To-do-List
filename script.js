
let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
function addTask()
{
	const input = document.getElementById("taskInput");
	const errorElement = document.getElementById("error");
	if (input.value.trim() === "")
	{
		errorElement.textContent= "task cannot be empty";
		return;
	}
	errorElement.textContent="";
	tasks.push({id:Date.now(),text:input.value,done:false});
	input.value=""; //clearing the box
    localStorage.setItem("tasks",JSON.stringify(tasks) );
	renderTasks(); //redrawing the list so the new task shows up
	console.log("addTask ran");
}
console.log("error here");
function renderTasks() {
	const list = document.getElementById("taskList");
	list.innerHTML=""; // empties the list so the tasks aren't duplicated on each redraw 
// we're only wipin gthe display ( <LI> elets n the page) the actual data is still in the task array
	tasks.forEach((t) => { // loops over every task in the array w byerjaa bi haton bel list
		const li = document.createElement("li");
		li.textContent = t.text;
		if (t.done) li.classList.add("done");
		
		const donebutton = document.createElement("button");
		donebutton.textContent=t.done ? "Undo" : "Done";
		donebutton.addEventListener("click", () => toggleTask(t.id));
		
		const deletebutton = document.createElement("button");
		deletebutton.textContent = "Delete";
		deletebutton.addEventListener("click", () => deleteTask(t.id));
		
		list.appendChild(deletebutton);
		list.appendChild(donebutton);
		list.appendChild(li);	// same as append(li)
	});
}
//function toggleTask(id){
 //tasks = tasks.map(t-> t.id === id ? {...t,done:!t.done}:t);
//renderTasks();

function toggleTask(id) {
  tasks = tasks.map(t => {
    if (t.id === id) {
      return { ...t, done: !t.done };
    } else {
      return t;
    }
  });
  renderTasks();
}
function deleteTask(id){
  tasks=tasks.filter(t => t.id != id);
renderTasks();	
}

document.getElementById("addbutton").addEventListener("click",addTask); //when i click the button add it will trigger this 
document.getElementById("taskInput").addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); // same thing bas hal marra eza 3melt Enter
	});
renderTasks(); // draws the tasks loaded from storage on initial load
