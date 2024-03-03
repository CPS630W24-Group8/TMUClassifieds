import React from "react";
import DeleteEntry from "../components/DeleteEntry";
import { getCookie } from "../cookieManager";

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
				{getCookie("email") === props.user
				? <>
					<button type="button" className="btn btn-success" style={{marginLeft: '10px'}}>Edit</button>
					<DeleteEntry type="item sale" entry= {props.item} />
				</>
				: ""}
			</div>
		</div>
	)
};

export default ItemSaleCard;