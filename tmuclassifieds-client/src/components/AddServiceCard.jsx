import React from "react";

const AddServiceCard = (props) => {
	const [newTitle, setNewTitle] = React.useState("");
	const [newDesc, setNewDesc] = React.useState("");
	const [newTag, setNewTag] = React.useState("math");

	const clearModal = () => {
		setNewTitle("");
		setNewDesc("");
		setNewTag("math");
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		// leave form
		document.querySelector("#cancel-button").click();
		clearModal();

		const result = await fetch("http://localhost:3001/api/service/add-service", {
			method: 'POST',
			body: JSON.stringify({ title: newTitle, description: newDesc, user: props.user, tag: newTag }),
			headers: { "Content-Type": "application/json" }
		});
		console.log("post: " + result.data);
		window.location.reload();
	};

	return (
		<div>
			<button type="button" className="btn btn-primary" style={{ 'margin': '20px' }} data-bs-toggle="modal" data-bs-target="#addServiceModal">
				{props.buttonTitle}
			</button>

			<div className="modal fade" id="addServiceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">{props.modalTitle}</h1>
						</div>
						<div className="modal-body" >
							<form onSubmit={onSubmit}>
								<div className="mb-3">
									<label htmlFor="service-title" className="col-form-label">Title</label>
									<input type="text" className="form-control" id="service-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
								</div>
								<div className="mb-3">
									<label htmlFor="service-description" className="col-form-label">Description</label>
									<textarea className="form-control" id="service-description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required />
								</div>
								<div className="mb-3">
									<label htmlFor="item-tag" className="form-label">Tag</label>
									<select className="form-select" name="item-tag" id="item-tag" onChange={(e) => setNewTag(e.target.value)}>
										<option value="math">Math</option>
										<option value="writing">Writing</option>
										<option value="other">Other</option>
									</select>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-danger" id="cancel-button" data-bs-dismiss="modal" onClick={clearModal}>Cancel</button>
									<button type="submit" className="btn btn-primary">Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default AddServiceCard;