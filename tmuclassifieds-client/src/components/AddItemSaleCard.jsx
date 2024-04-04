import React, { useEffect } from 'react';
import axios from "axios";

const AddItemSaleCard = (props) => {
	const [newTitle, setNewTitle] = React.useState("");
	const [newImage, setNewImage] = React.useState();
	const [newPrice, setNewPrice] = React.useState(0);
	const [newDesc, setNewDesc] = React.useState("");
	const [newTag, setNewTag] = React.useState("textbooks");
	const [newLocation, setNewLocation] = React.useState("43.6583323, -79.3778051"); //Campus as default

	const imageFile = React.useRef(null);

	const clearModal = () => {
		if (imageFile.current) {
			imageFile.current.value = "";
		}
		setNewTitle("");
		setNewPrice(0);
		setNewDesc("");
		setNewImage();
		setNewTag("textbooks");
		setNewLocation("43.6583323, -79.3778051");
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		// leave form
		document.querySelector("#cancel-button").click();
		clearModal();

		let image = "imageIcon.png";
		if (newImage != null) {
			console.log(newImage);
			const imageData = new FormData();
			imageData.append("image", newImage);
			const response = await axios.post(
				"https://tmuclassifieds.onrender.com/api/item-wanted/upload",
				imageData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			image = response.data.data;
		}
		console.log("image: ", image);
		const result = await fetch("https://tmuclassifieds.onrender.com/api/item-sale/add-item", {
			method: 'POST',
			body: JSON.stringify({ title: newTitle, description: newDesc, image: image, user: props.user, price: newPrice, tag: newTag, location: newLocation  }),
			headers: { "Content-Type": "application/json" }
		});
		console.log("post: " + result.data);
		window.location.reload();
	};

	const getLocation = () => {
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition((position) => {
			setNewLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
		  });
		} else {
		  console.error("Geolocation is not supported by this browser.");
		}
	};

	useEffect(() => {
		// Load the Google Places API script
		const initAutocomplete = () => {
			new window.google.maps.places.Autocomplete(
			  document.getElementById('addressInput'),
			  { types: ['geocode'] }
			);
		  };
		  
		const loadGoogleMapsScript = () => {
		  if (window.google) {
			initAutocomplete();
		  }
		  const script = document.createElement("script");
		  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAuL9uSvpsK1FoEE8K98UfANAqc1eP7hEs&libraries=places&callback=initAutocomplete`;
		  script.async = true;
		  script.defer = true;
		  document.body.appendChild(script);
		};
	
		window.initAutocomplete = () => {
		  new window.google.maps.places.Autocomplete(
			document.getElementById('addressInput'),
			{ types: ['geocode'] }
		  ).addListener('place_changed', onPlaceChanged);
		};
		window.initAutocomplete = initAutocomplete;
	
		const onPlaceChanged = () => {
			const geocoder = new window.google.maps.Geocoder();
			geocoder.geocode({ 'address': document.getElementById('addressInput').value }, function(results, status) {
			  if (status === 'OK') {
				setNewLocation(`${results[0].geometry.location.lat()}, ${results[0].geometry.location.lng()}`);
			  }
			  //if not ok, don't set the location yet (do nothing)
			});
		};
	
		loadGoogleMapsScript();
	  }, []);	 

	return (
		<div>
			{/* Style used to keep the address autofill IN FRONT of the form, rather than behind*/}
			<style>{`
				.modal {z-index: 20;}
				.modal-backdrop {z-index: 10;}
			`}</style>
			<button type="button" className="btn btn-primary" style={{ 'margin': '20px' }} data-bs-toggle="modal" data-bs-target="#addItemModal">
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
									<label htmlFor="item-title" className="col-form-label">Title </label>
									<input type="text" className="form-control" id="item-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
								</div>
								<div className="mb-3">
									<label htmlFor="item-image" className="col-form-label">Image file (optional)</label>
									<input type="file" className="form-control" id="item-image" name="image" ref={imageFile} accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
								</div>
								<div className="mb-3">
									<label htmlFor="item-price" className="col-form-label">Price</label>
									<input type="number" className="form-control" id="item-price" min="0" step=".01" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
								</div>
								<div className="mb-3">
									<label htmlFor="item-description" className="col-form-label">Description</label>
									<textarea className="form-control" id="item-description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required />
								</div>
								<div className="mb-3">
									<label htmlFor="item-tag" className="form-label">Tag</label>
									<select className="form-select" name="item-tag" id="item-tag" onChange={(e) => setNewTag(e.target.value)}>
										<option value="textbooks">Textbooks</option>
										<option value="tools">Tools</option>
										<option value="other">Other</option>
									</select>
								</div>
								<div className="mb-3">
									<label htmlFor="location" className="form-label">Location (Defaults to TMU Campus)</label>
									<br></br>
									<button type="button" id="getLocationBtn" className="location-button" onClick={getLocation}>Get Location</button>
  									<input type="text" id="addressInput" class="address-input" placeholder="Enter an address"></input>
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

export default AddItemSaleCard;