import React from "react";

const ItemCard = (props) => {
	return (
		<div className="card w-100 h-100" style={{ backgroundColor: '#08314A' }}>
			<img src={props.image} alt="" className="card-img-top img-thumbnail img-fluid" />
			<div className="card-body">
				<h4 className="card-title">{props.itemName}</h4>
				<p className="card-text">{props.description}</p>
				<button type="button" className="btn btn-primary">Contact</button>
			</div>
		</div>
	)
};

export default ItemCard;