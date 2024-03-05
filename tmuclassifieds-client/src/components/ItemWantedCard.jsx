import React, { useState } from "react";
import DeleteEntry from "../components/DeleteEntry";
import axios from "axios";
import { getCookie } from "../cookieManager";

const ItemWantedCard = (props) => {
	const [editing, setEditing] = useState(false);
	const [newTitle, setNewTitle] = React.useState(props.item.title);
	const [newImage, setNewImage] = React.useState();
	const [newDesc, setNewDesc] = React.useState(props.item.description);

	const editClick = () => {
		setEditing(true);
	}

	const imageFile = React.useRef(null);

	const clearForm = () => {
		if (imageFile.current) {
			imageFile.current.value = "";
		}
		setNewTitle(props.item.title);
		setNewDesc(props.item.description);
		setNewImage();
		setEditing(false);
	};

	const formSubmit = async (event) => {
		event.preventDefault();
		document.querySelector("#cancel-button").click();
		clearForm();

		let file = props.item.image;
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
		console.log("image: ", file);
		await fetch("http://localhost:3001/api/item-wanted/edit-item", {
			method: 'POST',
			body: JSON.stringify({ id: props.item._id, title: newTitle, description: newDesc, image: file, oldImage: props.item.image }),
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
					<p className="card-text">{props.item.description}</p>
					{getCookie("email") === props.item.user
						? <>
							<button type="button" className="btn btn-success" onClick={editClick}>Edit</button>
							<DeleteEntry type="item wanted" entry={props.item} />
						</>
						: <button type="button" className="btn btn-primary">Contact</button>}
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
						<label htmlFor="item-description" className="form-label">Description</label>
						<textarea className="form-control" id="item-description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required />
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

	/*return (
		<div className="card" style={{ backgroundColor: '#08314A' }}>
			<img src={require(`../images/${props.item.image}`)} alt="" className="card-img-top img-thumbnail img-fluid" />
			<div className="card-body">
				<h4 className="card-title">{props.item.title}</h4>
				<p className="card-text">{props.item.user}</p>
				<p className="card-text">{props.item.description}</p>
				<button type="button" className="btn btn-primary">Contact</button>
				{getCookie("email") === props.item.user
				? <>
					<EditItem type="item wanted" item= {props.item} id={props.item._id} />
					<DeleteEntry type="item wanted" entry= {props.item} />
				</>
				: ""}
			</div>
		</div>
	)*/
};

export default ItemWantedCard;