import React from "react";

const DeleteEntry = (props) => {
	const deleteEntry = async (event) => {
		event.preventDefault();
		if (window.confirm("Are you sure you want to delete the " + props.type + "?")) {
			if (props.type === "item wanted") {
				await fetch("https://tmuclassifieds.onrender.com/api/item-wanted/delete-item", {
					method: 'POST',
					body: JSON.stringify({ entry: props.entry }),
					headers: { "Content-Type": "application/json" }
				});
			}
			else if (props.type === "item sale") {
				await fetch("https://tmuclassifieds.onrender.com/api/item-sale/delete-item", {
					method: 'POST',
					body: JSON.stringify({ entry: props.entry }),
					headers: { "Content-Type": "application/json" }
				});
			}
			else {
				await fetch("https://tmuclassifieds.onrender.com/api/service/delete-service", {
					method: 'POST',
					body: JSON.stringify({ entry: props.entry }),
					headers: { "Content-Type": "application/json" }
				});
			}
			window.location.reload();
		}
	}

	return (
		<button type="button" className="btn btn-danger" onClick={deleteEntry} style={{ marginLeft: '10px' }}>Delete</button>
	)
};

export default DeleteEntry;