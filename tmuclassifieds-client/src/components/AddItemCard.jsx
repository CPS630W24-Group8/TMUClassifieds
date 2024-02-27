import React from "react";
import axios from "axios";

const AddItemCard = (props) => {
    const [newTitle, setNewTitle] = React.useState("");
    const [newImage, setNewImage] = React.useState();
    const [newDesc, setNewDesc] = React.useState("");

    const imageFile = React.useRef(null);

    const clearModal = () => {
        if (imageFile.current) {
            imageFile.current.value = "";
        }
        setNewTitle("");
        setNewDesc("");
        setNewImage();
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        
        // leave form
        document.querySelector("#cancel-button").click();
        clearModal();

        console.log(newImage);
        const imageData = new FormData();
        imageData.append("image", newImage);
        const response = await axios.post(
            "http://localhost:3001/api/item/upload",
            imageData, {
                headers: {"Content-Type": "multipart/form-data"},
            }
        );
        console.log("result1: "+ response.data);
        console.log("status: "+ response.status);
        const result = await fetch("http://localhost:3001/api/item/add-item", {
            method: 'POST',
            body: JSON.stringify({title: newTitle, description: newDesc, type: props.type}),
            headers: {"Content-Type": "application/json" }
        });
        console.log("result2: "+ result.message);
        window.location.reload();
    };


	return (
        <>
        <button type="button" className="btn btn-primary" style={{'margin':'20px'}} data-bs-toggle="modal" data-bs-target="#addItemModal">
            {props.buttonTitle}
        </button>

        <div className="modal fade" id="addItemModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{props.modalTitle}</h1>
                    </div>
                    <div className="modal-body" >
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label htmlFor ="item-title" className="col-form-label">Title</label>
                                <input type="text" className="form-control" id="item-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="item-image" className="col-form-label">Image file</label>
                                <input type="file" className="form-control" id="item-image" name="image" ref={imageFile} accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor ="item-description" className="col-form-label">Description</label>
                                <textarea className="form-control" id="item-description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required/>
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
        </>
	)
};

export default AddItemCard;