import React from "react";

const Item = (props) => {
    return (
        <div className="col-12 col-md-4">
            <div className="p-3" style={{'background-color':'#08314A'}}>
                <img src={props.image} alt="" style={{'max-width':'380px','max-height':'270px'}}/>
                <p className="fs-5" style={{'padding-top':'15px'}}>{props.itemName}</p>
                <p>{props.description}</p>
                <button className="btn btn-warning">Contact</button>
            </div>
        </div>
    )
  };
  
  export default Item;