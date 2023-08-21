/** @format */

import React, { useEffect, useState } from "react";
import "./Pet.css";

import { useNavigate } from "react-router-dom";
import { translateString } from "../utils/Functions";
const Pet = ({ pet, lang }) => {
	const [tanslator, settanslator] = useState(pet.type);
	let navigate = useNavigate();
	useEffect(() => {
		if (lang === "es") {
			translateString(pet.type).then((res) => {
				settanslator(res);
			});
		} else {
			settanslator(pet.type);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lang]);
	return (
		<div
			className="pet-card"
			onClick={() => {
				navigate("/view/" + pet.id);
			}}>
			<img className="pet-image" src={pet.image_url} alt={pet.name} />
			<div className="pet-details">
				<h2 className="pet-name">{pet.name}</h2>
				<div className="pet-info">
					<p>
						<strong>{lang === "es" ? "Tipo" : "Type"}:</strong>{" "}
						{tanslator}
					</p>
					<p>
						<strong>{lang === "es" ? "Raza" : "Breed"}:</strong>{" "}
						{pet.breed}
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
