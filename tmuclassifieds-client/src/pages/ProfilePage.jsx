import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UnauthDisplay from "../components/UnauthDisplay";
import ItemWantedCard from "../components/ItemWantedCard";
import ItemSaleCard from "../components/ItemSaleCard";
import ServiceCard from "../components/ServiceCard";
import Spinner from "../components/Spinner";
import { getCookie, setCookie } from "../cookieManager";

const ProfilePage = () => {
	const [selectButton, setSelectButton] = useState();
	const [allItemsWanted, setAllItemsWanted] = useState();
	const [allItemsSale, setAllItemsSale] = useState();
	const [allServices, setAllServices] = useState();
	const [waiting, setWaiting] = useState(false);
	const [loggedIn, setLoggedIn] = useState(0);

	useEffect(() => {
		setLoggedIn(getCookie("email") !== "");
	}, []);

	useEffect(() => { getItems(); }, [selectButton]);

	// get all user's items or services from the database
	const getItems = async () => {
		setWaiting(true);
		if (selectButton === "Items Wanted") {
			await fetch(`http://localhost:3001/api/item-wanted/get-user-item?user=${getCookie('email')}`)
				.then(data => data.json())
				.then(item => {
					setAllItemsWanted(item.data);
				});
		} else if (selectButton === "Items for Sale") {
			await fetch(`http://localhost:3001/api/item-sale/get-user-item?user=${getCookie('email')}`)
				.then(data => data.json())
				.then(item => {
					setAllItemsSale(item.data);
				});
		} else if (selectButton === "Academic Services") {
			await fetch(`http://localhost:3001/api/service/get-user-service?user=${getCookie('email')}`)
				.then(data => data.json())
				.then(service => {
					setAllServices(service.data);
				});
		} else if (selectButton === "Settings") {
			// get all user's items wanted
			await fetch(`http://localhost:3001/api/item-wanted/get-user-item?user=${getCookie('email')}`)
				.then(data => data.json())
				.then(item => {
					setAllItemsWanted(item.data);
				});
			// get all user's items for sale
			await fetch(`http://localhost:3001/api/item-sale/get-user-item?user=${getCookie('email')}`)
				.then(data => data.json())
				.then(item => {
					setAllItemsSale(item.data);
				});
			// get all user's services
			await fetch(`http://localhost:3001/api/service/get-user-service?user=${getCookie('email')}`)
				.then(data => data.json())
				.then(service => {
					setAllServices(service.data);
				});
		}
		setWaiting(false);
	}

	const changeEmail = async (event) => {
		event.preventDefault();
		const message = document.getElementById("message-email");
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// check if the email input's format is correct
		if (!emailPattern.test(event.target[0].value)) {
			// create error message
			message.className = "p-3 mb-2 bg-danger text-white";
			message.innerHTML = "Please enter a valid email address.";
		} else {
			message.className = "";
			message.innerHTML = "";
			await fetch("http://localhost:3001/api/auth/change-email", {
				method: "POST",
				body: JSON.stringify({ oldEmail: getCookie("email"), newEmail: event.target[0].value }),
				headers: { "Content-Type": "application/json" }
			}).then((result => result.json())).then(user => {
				if (user.user.email === getCookie("email")) {
					setCookie("email", event.target[0].value);
					window.location.reload();
				}
			});
		}
	}

	const changePassword = async (event) => {
		event.preventDefault();
		const message = document.getElementById("message-password");
		if (event.target[1].value.length < 6) {
			// create error message
			message.className = "p-3 mb-2 bg-danger text-white";
			message.innerHTML = "Password must be at least 6 characters long.";
		} else {
			message.className = "";
			message.innerHTML = "";

			await fetch("http://localhost:3001/api/auth/change-password", {
				method: "POST",
				body: JSON.stringify({ email: getCookie("email"), oldPassword: event.target[0].value, newPassword: event.target[1].value }),
				headers: { "Content-Type": "application/json" }
			}).then((result => result.json())).then(user => {
				// create error message
				if (user.user == null) { 
					// input password does not match user's current password
					message.className = "p-3 mb-2 bg-danger text-white";
					message.innerHTML = "Wrong password. Please enter the correct password.";
				} else {
					window.location.reload();
				}
			});
		}
	}

	const deleteAccount = async () => {
		if (window.confirm("Are you sure you want to delete your account?")) {
			await fetch("http://localhost:3001/api/auth/delete", {
				method: 'POST',
				body: JSON.stringify({ email: getCookie("email") }),
				headers: { "Content-Type": "application/json" }
			}).then(async response => {
				if (response.status == 200) {
					// delete all user's items wanted
					await fetch("http://localhost:3001/api/item-wanted/delete-all", {
						method: 'POST',
						body: JSON.stringify({ email: getCookie("email"), items: allItemsWanted }),
						headers: { "Content-Type": "application/json" }
					});

					// delete all user's items for sale
					await fetch("http://localhost:3001/api/item-sale/delete-all", {
						method: 'POST',
						body: JSON.stringify({ email: getCookie("email"), items: allItemsSale }),
						headers: { "Content-Type": "application/json" }
					});

					// delete all user's service
					await fetch("http://localhost:3001/api/service/delete-all", {
						method: 'POST',
						body: JSON.stringify({ email: getCookie("email") }),
						headers: { "Content-Type": "application/json" }
					});
				}
				setCookie("email", "");
				window.location.reload();
			});
		}
	}

	// change the display of right side page based on the selected option on the left side
	const changeDisplay = () => {
		if (selectButton === "Items Wanted") {
			return (
				<div className="container">
					<div className="row justify-content-center">
						{allItemsWanted == null
							? ""
							: allItemsWanted.map(item =>
								<div className="col-md-4">
									<ItemWantedCard item={item} />
								</div>
							)
						}
					</div>
				</div>
			);
		} else if (selectButton === "Items for Sale") {
			return (
				<div className="container">
					<div className="row justify-content-center">
						{allItemsSale == null
							? ""
							: allItemsSale.map(item =>
								<div className="col-md-4">
									<ItemSaleCard item={item} />
								</div>
							)
						}
					</div>
				</div>
			);
		} else if (selectButton === "Academic Services") {
			return (
				<div className="container">
					<div className="row justify-content-center">
						{allServices == null
							? ""
							: allServices.map(service =>
								<div className="col-md-4">
									<ServiceCard service={service} />
								</div>
							)
						}
					</div>
				</div>
			);
		} else if (selectButton === "Contacts") {
			return;
		} else if (selectButton === "Settings") {
			return (
				<div>
					<p className="fs-5 text-warning-emphasis">Change Email Address</p>
					<p id="message-email" className=""></p>
					<form onSubmit={changeEmail}>
						<div className="mb-3">
							<label htmlFor="new-email" className="form-label">New email address</label>
							<input type="email" className="form-control" id="new-email" required />
						</div>
						<button type="submit" className="btn btn-primary mb-5">Submit</button>
					</form>

					<p className="fs-5 text-warning-emphasis">Change Password</p>
					<p id="message-password" className=""></p>
					<form onSubmit={changePassword}>
						<div className="mb-3">
							<label htmlFor="current-password" className="form-label">Current password</label>
							<input type="password" className="form-control" id="current-password" required />
						</div>
						<div className="mb-3">
							<label htmlFor="new-password" className="form-label">New password</label>
							<input type="password" className="form-control" id="new-password" required />
						</div>
						<button type="submit" className="btn btn-primary mb-5">Submit</button>
					</form>

					<p className="fs-5 text-warning-emphasis">Delete Account</p>
					<p>Delete your account will also delete all your posts and chats from Items Wanted, Items for Sale and Academic Services.</p>
					<button className="btn btn-danger" onClick={deleteAccount}>Delete</button>
				</div>
			);
		}
	}

	if (!loggedIn) {
		return (
			<div>
				<Navbar />
				<Header title="Profile" />
				<br />
				<UnauthDisplay />
				<Footer />
			</div>
		);
	}

	return (
		<div>
			<Navbar />
			<Header title="Profile" description={getCookie("email")} />
			<br />
			<div className="container">
				<div className="row">
					<div className="col-3">
						<div className="d-grid gap-2">
							<input type="radio" className="btn-check" name="options" id="item-wanted" autoComplete="off" onClick={() => { setSelectButton("Items Wanted") }} />
							<label className="btn btn-secondary" htmlFor="item-wanted">Items wanted created</label>

							<input type="radio" className="btn-check" name="options" id="item-sale" autoComplete="off" onClick={() => { setSelectButton("Items for Sale") }} />
							<label className="btn btn-secondary" htmlFor="item-sale">Items for sale created</label>

							<input type="radio" className="btn-check" name="options" id="service" autoComplete="off" onClick={() => { setSelectButton("Academic Services") }} />
							<label className="btn btn-secondary" htmlFor="service">Academic services created</label>

							<input type="radio" className="btn-check" name="options" id="contact" autoComplete="off" onClick={() => { setSelectButton("Contacts") }} />
							<label className="btn btn-secondary" htmlFor="contact">Contacts</label>

							<input type="radio" className="btn-check" name="options" id="setting" autoComplete="off" onClick={() => { setSelectButton("Settings") }} />
							<label className="btn btn-secondary" htmlFor="setting">Settings</label>
						</div>
					</div>
					<div className="col-9">
						{waiting
							? <Spinner />
							: <>
								<p className="fs-3 text-center">{selectButton}</p>
								{changeDisplay()}
							</>}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default ProfilePage;