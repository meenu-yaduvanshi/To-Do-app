import React from "react";

function TaskList(props) {
	return (
		<div className="task-list">
			<h3 className="task-list-header">Task List</h3>
			{props.taskList.length === 0 ? (
				<p className="no-task">No Task added in the list</p>
			) : (
				props.taskList.map((task, index) => {
					return (
						<div className="taskDiv" key={index}>
							{index === "clickedIndex" ? (
								<>
									{/* <input
										className="edit-field"
										defaultValue={task}
										onChange={handleChange}
									/>
									<button onClick={saveClick}>Save</button> */}
								</>
							) : (
								<>
									<p className="taskName">{task}</p>
									<button
										onClick={() => props.doneClick(index)}
									>
										Done
									</button>
									{/* <button onClick={() => editClick(index)}>
										Edit
									</button> */}
									<button
										onClick={() =>
											props.deleteClick("taskList", index)
										}
									>
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
