import React, { useState } from "react";
import DeleteEntry from "../components/DeleteEntry";
import axios from "axios";
import { getCookie } from "../cookieManager";

const ItemSaleCard = (props) => {
	const [editing, setEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(props.item.title);
	const [newImage, setNewImage] = useState();
	const [newPrice, setNewPrice] = useState(props.item.price);
	const [newDesc, setNewDesc] = useState(props.item.description);
	const [noImage, setNoImage] = useState(false);
	const [newTag, setNewTag] = React.useState(props.item.tag);

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
		await fetch("http://localhost:3001/api/contact/find-room", {
			method: 'POST',
			body: JSON.stringify({ user: getCookie('email'), otherUser: otherUser, title: title }),
			headers: { "Content-Type": "application/json" }
		}).then(response => response.json())
		.then(async data => {
			if (data.data.length > 0) {
				alert("Chat room already exist.");
			}
			else if (data.data.length === 0) {
				// add chat room to database
				await fetch("http://localhost:3001/api/contact/add-room", {
					method: 'POST',
					body: JSON.stringify({ user: getCookie('email'), otherUser: otherUser, title: title }),
					headers: { "Content-Type": "application/json" }
				}).then((result) => {
					if (result.status === 200) {
						alert("Chat room is successfully created.");
					}
					else {
						alert(result.status + " - " + result.statusText);
					}
				});
			}
		});
	}

	const imageFile = React.useRef(null);

	const clearForm = () => {
		if (imageFile.current) {
			imageFile.current.value = "";
		}
		setNewTitle(props.item.title);
		setNewDesc(props.item.description);
		setNewImage();
		setNewPrice(props.item.price);
		setNewTag(props.item.tag);
		setEditing(false);
		setNoImage(false);
	};

	const formSubmit = async (event) => {
		event.preventDefault();
		document.querySelector("#cancel-button").click();
		clearForm();

		let file = props.item.image;
		if (noImage) {
			file = "imageIcon.png";
		} else {
			if (newImage != null) {
				console.log(newImage);
				const imageData = new FormData();
				imageData.append("image", newImage);
				const response = await axios.post(
					"http://localhost:3001/api/item-wanted/upload",
					imageData, {
					headers: { "Content-Type": "multipart/form-data" },
				});
				file = response.data.data;
			}
		}
		console.log("image: ", file);
		await fetch("http://localhost:3001/api/item-sale/edit-item", {
			method: 'POST',
			body: JSON.stringify({ id: props.item._id, title: newTitle, price: newPrice, description: newDesc, image: file, oldImage: props.item.image, tag: newTag }),
			headers: { "Content-Type": "application/json" }
		});

		window.location.reload();
	}

	const renderNormal = () => {
		return (
			<div className="card" style={{ backgroundColor: '#08314A' }}>
				<img src={require(`../images/${props.item.image}`)} alt="" className="card-img-top img-thumbnail img-fluid" />
				<div className="card-body">
					<h4 className="card-title">{props.item.title}</h4>
					<p className="card-text">{props.item.user}</p>
					<p className="card-text">${props.item.price}</p>
					<p className="card-text">{props.item.description}</p>
					<p className="card-text"><strong>{props.item.tag}</strong></p>
					{getCookie("email") === props.item.user || props.isAdmin
						? <>
							<button type="button" className="btn btn-success" onClick={editClick}>Edit</button>
							<DeleteEntry type="item sale" entry={props.item} />
						</>
						: <button type="button" className="btn btn-primary" value={JSON.stringify({"user": props.item.user, "title": props.item.title})} onClick={createChatRoom}>Contact</button>}
				</div>
			</div>
		);
	}

	const renderEdit = () => {
		return (
			<div className="card" style={{ backgroundColor: '#08314A' }}>
				<form onSubmit={formSubmit} style={{ margin: "10px" }}>
					<div className="mb-3">
						<label htmlFor="item-title" className="form-label">Title</label>
						<input type="text" className="form-control" id="item-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
					</div>
					<div className="mb-3">
						<label htmlFor="item-image" className="form-label">Image file (optional)</label>
						<input type="file" className="form-control" id="item-image" name="image" ref={imageFile} accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
					</div>
					<div className="mb-3">
						<input className="form-check-input" type="checkbox" id="wantNoImage" onChange={(e) => setNoImage(e.target.checked)} />
						<label className="form-check-label" htmlFor="wantNoImage" style={{ marginLeft: "10px" }}> Select no image file</label>
					</div>
					<div className="mb-3">
						<label htmlFor="item-price" className="form-label">Price</label>
						<input type="number" className="form-control" id="item-price" min="0" step=".01" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
					</div>
					<div className="mb-3">
						<label htmlFor="item-description" className="form-label">Description</label>
						<textarea className="form-control" id="item-description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required />
					</div>
					<div className="mb-3">
						<label htmlFor="item-tag" className="form-label">Tag</label>
						<select className="form-select" id="item-tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} required>
							<option value="textbooks">Textbooks</option>
							<option value="tools">Tools</option>
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

export default ItemSaleCard;