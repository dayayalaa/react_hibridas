import React from "react";
import './App.css';

function Card(props) {
    return (
        <div className="card">
            <h4>{props.texto}</h4>
            <hr />
            <p>${props.precio + 10}</p>
        </div>
    );
}

export default Card;
