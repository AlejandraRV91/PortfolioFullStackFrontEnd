/** @format */

import React from "react";
import "./Pet.css";

const Pet = ({ pet }) => {
	return (
		<div className="pet-card">
			<img className="pet-image" src={pet.image_url} alt={pet.name} />
			<div className="pet-details">
				<h2 className="pet-name">{pet.name}</h2>
				<div className="pet-info">
					<p>
						<strong>Type:</strong> {pet.type}
					</p>
					<p>
						<strong>Breed:</strong> {pet.breed}
					</p>
					<p>
						<strong className="pet-price">${pet.price}</strong> 
					</p>
				</div>
			</div>
		</div>
	);
};

export default Pet;
