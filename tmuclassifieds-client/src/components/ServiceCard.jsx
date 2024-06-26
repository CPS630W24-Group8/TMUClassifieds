import React, { useState } from "react";
import DeleteEntry from "../components/DeleteEntry";
import { getCookie } from "../cookieManager";

const ServiceCard = (props) => {
	const [editing, setEditing] = useState(false);
	const [newTitle, setNewTitle] = React.useState(props.service.title);
	const [newDesc, setNewDesc] = React.useState(props.service.description);
	const [newTag, setNewTag] = React.useState(props.service.tag);

	const editClick = () => {
		setEditing(true);
	}

	// create chat room
	const createChatRoom = async (event) => {
		event.preventDefault();
		const data = JSON.parse(event.target.value);
		const otherUser = data.user;
		const title = data.title;
		
		// find if room exist
		await fetch("https://tmuclassifieds.onrender.com/api/contact/find-room", {
			method: 'POST',
			body: JSON.stringify({ user: getCookie('email'), otherUser: otherUser, title: title }),
			headers: { "Content-Type": "application/json" }
		}).then(response => response.json())
		.then(async data => {
			if (data.data.length > 0) {
				alert("Chat room already exist. Please go to the Contact page to access the chat room.");
			}
			else if (data.data.length === 0) {
				// add chat room to database
				await fetch("https://tmuclassifieds.onrender.com/api/contact/add-room", {
					method: 'POST',
					body: JSON.stringify({ user: getCookie('email'), otherUser: otherUser, title: title }),
					headers: { "Content-Type": "application/json" }
				}).then((result) => {
					if (result.status === 200) {
						alert("Chat room is successfully created. Please go to the Contact page to access the chat room.");
					}
					else {
						alert(result.status + " - " + result.statusText + ". The chat room may already exist. Please go to the Contact page to access the chat room.");
					}
				});
			}
		});
	}

	const clearForm = () => {
		setNewTitle(props.service.title);
		setNewDesc(props.service.description);
		setEditing(false);
		setNewTag(props.service.tag);
	};

	const formSubmit = async (event) => {
		event.preventDefault();
		document.querySelector("#cancel-button").click();
		clearForm();

		await fetch("https://tmuclassifieds.onrender.com/api/service/edit-service", {
			method: 'POST',
			body: JSON.stringify({ id: props.service._id, title: newTitle, description: newDesc, tag: newTag }),
			headers: { "Content-Type": "application/json" }
		});

		window.location.reload();
	}

	const renderNormal = () => {
		return (
			<div className="card" style={{ backgroundColor: '#08314A' }}>
				<div className="card-body">
					<h4 className="card-title">{props.service.title}</h4>
					<p className="card-text">{props.service.user}</p>
					<p className="card-text">{props.service.description}</p>
					<p className="card-text"><strong>{props.service.tag}</strong></p>
					{getCookie("email") === props.service.user || props.isAdmin
						? <>
							<button type="button" className="btn btn-success" onClick={editClick}>Edit</button>
							<DeleteEntry type="service" entry={props.service} />
						</>
						: <button type="button" className="btn btn-primary" value={JSON.stringify({"user": props.service.user, "title": props.service.title})} onClick={createChatRoom}>Contact</button>}
				</div>
			</div>
		);
	}

	const renderEdit = () => {
		return (
			<div className="card" style={{ backgroundColor: '#08314A' }}>
				<form onSubmit={formSubmit} style={{ margin: "10px" }}>
					<div className="mb-3">
						<label htmlFor="service-title" className="form-label">Title</label>
						<input type="text" className="form-control" id="service-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
					</div>
					<div className="mb-3">
						<label htmlFor="service-description" className="form-label">Description</label>
						<textarea className="form-control" id="service-description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required />
					</div>
					<div className="mb-3">
						<label htmlFor="service-tag" className="form-label">Tag</label>
						<select className="form-select" id="service-tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} required>
							<option value="math">Math</option>
							<option value="writing">Writing</option>
							<option value="other">Other</option>
						</select>
					</div>
					<button type="button" className="btn btn-danger" id="cancel-button" onClick={clearForm}>Cancel</button>
					<button type="submit" className="btn btn-primary" style={{ marginLeft: '10px' }}>Submit</button>
				</form>
			</div>
		);
	}

	if (editing) {
		return renderEdit();
	} else {
		return renderNormal();
	}
};

export default ServiceCard;