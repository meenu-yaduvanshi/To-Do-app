import React, { useState, useEffect } from "react";

function TaskList(props) {
    const [clickedIndex, setClickedIndex] = useState(-1);
    const [inputValue, setInputValue] = useState("");
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        if (props.newTask) {
            const newTaskList = [...taskList];
            newTaskList.push(props.newTask);
            setTaskList(newTaskList);
        }
    }, [props.newTask]);

    function editClick(index) {
        setClickedIndex(index);
    }

    function saveClick() {
        const updatedTaskList = [...taskList];
        updatedTaskList[clickedIndex] = inputValue;
        setTaskList(updatedTaskList);
        setClickedIndex(-1);
    }

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function deleteClick(index) {
        const isDelete = window.confirm("Are you sure you want to delete?");
        if (isDelete) {
            const newTaskList = [];
            for (let i = 0; i < taskList.length; i++) {
                if (i !== index) {
                    newTaskList.push(taskList[i]);
                }
            }
            setTaskList(newTaskList);
        }
    }

    return (
        <div className="task-list">
            <h3 className="task-list-header">Task List</h3>
            {taskList.length === 0 ? (
                <p className="no-task">No Task added in the list</p>
            ) : (
                taskList.map((task, index) => {
                    return (
                        <div className="taskDiv" key={index}>
                            {index === clickedIndex ? (
                                <>
                                    <input
                                        className="edit-field"
                                        defaultValue={task}
                                        onChange={handleChange}
                                    />
                                    <button onClick={saveClick}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p className="taskName">{task}</p>
                                    <button
                                        onClick={() => props.doneClick(index)}
                                    >
                                        Done
                                    </button>
                                    <button onClick={() => editClick(index)}>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteClick(index)}>
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default TaskList;
