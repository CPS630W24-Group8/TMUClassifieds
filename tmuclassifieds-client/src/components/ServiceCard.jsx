import React from "react";

const ServiceCard = (props) => {
	return (
		<div className="card" style={{ backgroundColor: '#08314A' }}>
			<div className="card-body">
				<h4 className="card-title">{props.serviceName}</h4>
				<p className="card-text">{props.description}</p>
				<button type="button" className="btn btn-primary">Contact</button>
			</div>
		</div>
	)
};

export default ServiceCard;