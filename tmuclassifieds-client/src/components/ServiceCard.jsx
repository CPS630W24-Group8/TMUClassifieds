import React from "react";
import DeleteEntry from "../components/DeleteEntry";
import { getCookie } from "../cookieManager";

const ServiceCard = (props) => {
	return (
		<div className="card" style={{ backgroundColor: '#08314A' }}>
			<div className="card-body">
				<h4 className="card-title">{props.serviceName}</h4>
				<p className="card-text">{props.user}</p>
				<p className="card-text">{props.description}</p>
				<button type="button" className="btn btn-primary">Contact</button>
				{getCookie("email") === props.user
				? <>
					<button type="button" className="btn btn-success" style={{marginLeft: '10px'}}>Edit</button>
					<DeleteEntry type="service" entry= {props.service} />
				</>
				: ""}
			</div>
		</div>
	)
};

export default ServiceCard;