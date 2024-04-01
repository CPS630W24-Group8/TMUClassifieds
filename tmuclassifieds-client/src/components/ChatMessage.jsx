import React from "react";

const ChatMessage = (props) => {

	return (
        <div>
            <p style={{ marginBottom: '5px' }}>{props.user} <span className="text-secondary" style={{ paddingLeft: '10px' }}>{props.date}</span></p>
            <div className="card text-bg-secondary mb-3">
                <div className="card-body">
                    <p className="card-text">{props.message}</p>
                </div>
            </div>
        </div>
	)
};

export default ChatMessage;