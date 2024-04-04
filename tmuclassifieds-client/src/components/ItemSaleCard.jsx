import React, { useState, useEffect } from "react";
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
	const [newLocation, setNewLocation] = React.useState(props.item.location);
	const [localityName, setLocalityName] = useState(""); //city
	//For distance calculation
	const [userLocation, setUserLocation] = useState({ lat: null, lon: null }); 
	const [distance, setDistance] = useState(null);

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
				alert("Chat room already exist. Please go to the Contact page to access the chat room.");
			}
			else if (data.data.length === 0) {
				// add chat room to database
				await fetch("http://localhost:3001/api/contact/add-room", {
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
		setNewLocation(props.item.location);
		setEditing(false);
		setNoImage(false);
	};

	//Turn coordinates into a city
	async function reverseGeocode(latLonStr) {
		const [lat, lon] = latLonStr.split(',').map(Number);
		const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAuL9uSvpsK1FoEE8K98UfANAqc1eP7hEs`;
	  
		try {
		  const response = await fetch(apiURL);
		  const data = await response.json();
	  
		  if (data.status === "OK") {
			// Loop through the results to find the locality
			const localityInfo = data.results[0].address_components.find(component =>
			  component.types.includes("locality")
			);
	  
			if (localityInfo) {
			  return localityInfo.long_name; // Returns the locality name
			} else {
			  console.error("Local information was not found.");
			  return null;
			}
		  } else {
			console.error("Geocoding failed with status: " + data.status);
			return null;
		  }
		} catch (error) {
		  console.error("Geocoding error: ", error);
		  return null;
		}
	  }
	
	//Get user location 
	const getLocation = () => {
		
	};

	  const toRadians = (degrees) => {
		return degrees * (Math.PI / 180);
	  };
	
	  const calculateDistance = (lat1, lon1, lat2, lon2) => {
		const R = 6371; // Earth's radius in km
		const dLat = toRadians(lat2 - lat1);
		const dLon = toRadians(lon2 - lon1);
		const a =
		  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		  Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
		  Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
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
			body: JSON.stringify({ id: props.item._id, title: newTitle, price: newPrice, description: newDesc, image: file, oldImage: props.item.image, tag: newTag, location: newLocation }),
			headers: { "Content-Type": "application/json" }
		});

		window.location.reload();
	}



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
			  return; // If already loaded, no need to add the script again
			}
			// Check if the script is already being loaded
			if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
			  const script = document.createElement("script");
			  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAuL9uSvpsK1FoEE8K98UfANAqc1eP7hEs&libraries=places&callback=initAutocomplete`;
			  script.async = true;
			  script.defer = true;
			  document.body.appendChild(script);
			}
		};
	
		//address autocomplete
		window.initAutocomplete = () => {
		  new window.google.maps.places.Autocomplete(
			document.getElementById('addressInput'),
			{ types: ['geocode'] }
		  ).addListener('place_changed', onPlaceChanged);
		};
		window.initAutocomplete = initAutocomplete;
	
		//doesn't work atm
		const onPlaceChanged = () => {
			const geocoder = new window.google.maps.Geocoder();
			geocoder.geocode({ 'address': document.getElementById('addressInput').value }, function(results, status) {
			  if (status === 'OK') {
				setNewLocation(`${results[0].geometry.location.lat()}, ${results[0].geometry.location.lng()}`);
			  }
			  //if not ok, don't set the location yet (do nothing)
			});
		};
	
		//turn stored coordinates into a city (for privacy)
		if (props.item.location) {
			reverseGeocode(props.item.location).then(locality => {
			  if (locality) {
				setLocalityName(locality);
			  } else {
				setLocalityName("Locality not found");
			  }
			});
		  }
		
		//getLocation();
		
		//calculate distance (rounded for privacy)

		if (userLocation.lat == null && navigator.geolocation) {
			// Correctly setting userLocation as an object
				navigator.geolocation.getCurrentPosition((position) => {
					setUserLocation({
					lat: position.coords.latitude,
					lon: position.coords.longitude
					});
				});
			} else {
			console.error("Geolocation is not supported by this browser.");
			}
		if (userLocation.lat !== null && props.item.location) {
			const [itemLat, itemLon] = props.item.location.split(',').map(Number);
			console.log("Item location: " + itemLat, itemLon);
			console.log("User location: " + userLocation.lat, userLocation.lon);
			const dist = calculateDistance(userLocation.lat, userLocation.lon, itemLat, itemLon);
			console.log("Distance: " + dist);
			setDistance(Math.round(dist)); // Round the distance to the nearest whole number
			console.log("Distance (rounded): " + distance);
		}


	  }, [userLocation, distance]);	 

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
					<p className="card-text">{localityName || "Fetching locality..."}</p>
					<p classname="card-text">{distance + " km from you"}</p>
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
					<div className="mb-3">
						<label htmlFor="location" className="form-label">Location (Defaults to TMU Campus)</label>
						<br></br>
						<button type="button" id="getLocationBtn" className="location-button" onClick={getLocation}>Get Location</button>
						<input type="text" id="addressInput" className="address-input" placeholder="Enter an address"></input>
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