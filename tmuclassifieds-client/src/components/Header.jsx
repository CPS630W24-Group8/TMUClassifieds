import React from "react";

const Header = (props) => {
	return (
		<div style={{ backgroundColor: '#08314A' }}>
			<br />
			<p className="fs-1 text-center">{props.title}</p>
			<p className="text-center">{props.description}</p>
			<br />
			<div style={{ height: '2px', backgroundColor: '#ffc609' }}></div>
		</div>
	)
};

export default Header;