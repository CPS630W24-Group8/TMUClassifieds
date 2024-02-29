import React from "react";

const ItemSaleCard = (props) => {
	return (
		<div className="card" style={{ backgroundColor: '#08314A' }}>
			<img src={require(`../images/${props.image}`)} alt="" className="card-img-top img-thumbnail img-fluid" />
			<div className="card-body">
				<h4 className="card-title">{props.itemName}</h4>
                <p className="card-text">{props.user}</p>
                <p className="card-text">${props.price}</p>
				<p className="card-text">{props.description}</p>
				<button type="button" className="btn btn-primary">Contact</button>
			</div>
		</div>
	)
};

export default ItemSaleCard;