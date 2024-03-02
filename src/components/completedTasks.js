function CompletedTask(props) {
	return (
		<div className="completed-task">
			<h3 className="task-list-header">Completed Tasks</h3>
			{props.completedTaskList.length === 0 ? (
				<p className="no-task">No Task is completed in the list</p>
			) : (
				props.completedTaskList.map((task, index) => {
					return (
						<div className="taskDiv" key={index}>
							<p className="taskName">{task}</p>
							<button onClick={() => props.undoClick(index)}>
								Undo
							</button>
							<button
								onClick={() =>
									props.deleteClick("completedTask", index)
								}
							>
								Delete
							</button>
						</div>
					);
				})
			)}
		</div>
	);
}

export default CompletedTask;
