import "./App.css";
import { useState, useRef } from "react";
import TaskList from "./components/taskList";
import CompletedTask from "./components/completedTasks";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [editText, setEditText] = useState("");
	const [taskList, setTaskList] = useState([]);
	const [completedTaskList, setCompletedTaskList] = useState([]);
	const [clickedIndex, setClickedIndex] = useState(null);

	const inputElement = useRef(); // getting a virtual DOM element

	function handleChange(event) {
		setInputValue(event.target.value); // Asynchronous
	}

	function handleEditChange(event) {
		setEditText(event.target.value);
	}

	function handleClick() {
		if (inputValue.trim() !== "") {
			const newTaskList = [...taskList]; // Storing old tasks in a new variable
			newTaskList.push(inputValue);
			inputElement.current.value = "";
			setTaskList(newTaskList);
			setInputValue("");
		}
	}

	function doneClick(index) {
		const newTaskList = [];
		let newCompletedTaskList = [...completedTaskList];
		for (let i = 0; i < taskList.length; i++) {
			if (i !== index) {
				newTaskList.push(taskList[i]);
			} else {
				newCompletedTaskList.push(taskList[i]);
			}
		}
		setTaskList(newTaskList);
		setCompletedTaskList(newCompletedTaskList);
	}

	function undoClick(index) {
		const newTaskList = [...taskList];
		let newCompletedTaskList = [];
		for (let i = 0; i < completedTaskList.length; i++) {
			if (i !== index) {
				newCompletedTaskList.push(completedTaskList[i]);
			} else {
				newTaskList.push(completedTaskList[i]);
			}
		}
		setTaskList(newTaskList);
		setCompletedTaskList(newCompletedTaskList);
	}

	function deleteClick(listName, index) {
		const isDelete = window.confirm("Are you sure you want to delete?");
		if (isDelete) {
			if (listName === "taskList") {
				const newTaskList = [];
				for (let i = 0; i < taskList.length; i++) {
					if (i !== index) {
						newTaskList.push(taskList[i]);
					}
				}
				setTaskList(newTaskList);
			} else {
				const newCompletedTaskList = [];
				for (let i = 0; i < completedTaskList.length; i++) {
					if (i !== index) {
						newCompletedTaskList.push(completedTaskList[i]);
					}
				}
				setCompletedTaskList(newCompletedTaskList);
			}
		}
	}

	function editClick(index) {
		setClickedIndex(index);
	}

	function saveClick() {
		let newTaskList = [...taskList];
		newTaskList[clickedIndex] = editText;
		setTaskList(newTaskList);
		setClickedIndex(null);
	}

	return (
		<div className="App">
			<h1 className="app-header">Welcome to your To-Do List</h1>
			<div className="container">
				<div className="add-task">
					<input
						type="text"
						placeholder="Add a new task"
						onChange={handleChange}
						defaultValue={inputValue}
						ref={inputElement}
					/>
					<button onClick={handleClick}>Add</button>
				</div>
				<div className="taskListContainer">
					<TaskList
						taskList={taskList}
						doneClick={doneClick}
						deleteClick={deleteClick}
						editClick={editClick}
						clickedIndex={clickedIndex}
						saveClick={saveClick}
						handleEditChange={handleEditChange}
					/>
					<CompletedTask
						completedTaskList={completedTaskList}
						deleteClick={deleteClick}
						undoClick={undoClick}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
