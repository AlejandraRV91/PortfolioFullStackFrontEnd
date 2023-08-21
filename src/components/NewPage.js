/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Modal from "./Modal";

export function NewPage({ lang }) {
	const [Error, setError] = useState("");
	let navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		age: "",
		weight: "",
		description: "",
		breed: "",
		price: "",
		store_id: "",
		image_url: "",
	});
	let api = process.env.REACT_APP_API_URL;

	const [stores, setstores] = useState([]);

	useEffect(() => {
		axios
			.get(api + "/pets/stores")
			.then((res) => {
				const renamedData = res.data.map((item) => ({
					label: item.name,
					value: item.id,
				}));
				setstores(renamedData);
			})
			.catch((e) => {
				console.log(e);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setFormData({
			...formData,
			[id]: value,
		});
	};

	function handleSubmit(e) {
		e.preventDefault();
		axios
			.post(api + "/pets", formData)
			.then((res) => {
				navigate("/view/" + res.data.id);
			})
			.catch((e) => {
				setError(e.response.data.error);
			});
	}

	return (
		<>
			<form className="p-4 border rounded" onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-md-6 mb-3">
						<label htmlFor="name">
							{lang === "es" ? "Nombre" : "Name"}
						</label>
						<input
							onChange={handleInputChange}
							value={formData.name}
							type="text"
							className="form-control"
							id="name"
							placeholder={
								lang === "es"
									? "Ingresa el Nombre"
									: "Enter name"
							}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<label htmlFor="type">
							{lang === "es" ? "Tipo" : "Type"}
						</label>
						<input
							onChange={handleInputChange}
							value={formData.type}
							type="text"
							className="form-control"
							id="type"
							placeholder={
								lang === "es" ? "Ingresa el Tipo" : "Enter type"
							}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-6 mb-3">
						<label htmlFor="age">
							{lang === "es" ? "Edad" : "Age"}
						</label>
						<input
							onChange={handleInputChange}
							value={formData.age}
							type="number"
							className="form-control"
							id="age"
							placeholder={
								lang === "es" ? "Ingresa la edad" : "Enter age"
							}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<label htmlFor="weight">
							{lang === "es" ? "Peso" : "Weight"}
						</label>
						<input
							onChange={handleInputChange}
							value={formData.weight}
							type="number"
							step="0.01"
							className="form-control"
							id="weight"
							placeholder={
								lang === "es"
									? "Ingresa el peso"
									: "Enter weight"
							}
						/>
					</div>
				</div>

				<div className="mb-3">
					<label htmlFor="description">
						{lang === "es" ? "Descripción" : "Description"}
					</label>
					<textarea
						onChange={handleInputChange}
						value={formData.description}
						className="form-control"
						id="description"
						rows="3"
						placeholder={
							lang === "es"
								? "Ingresa la descripción"
								: "Enter description"
						}></textarea>
				</div>

				<div className="row">
					<div className="col-md-6 mb-3">
						<label htmlFor="breed">
							{lang === "es" ? "Raza" : "Breed"}
						</label>
						<input
							onChange={handleInputChange}
							value={formData.breed}
							type="text"
							className="form-control"
							id="breed"
							placeholder={
								lang === "es"
									? "Ingresa la raza"
									: "Enter breed"
							}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<label htmlFor="price">
							{lang === "es" ? "Precio" : "Price"}
						</label>
						<input
							onChange={handleInputChange}
							value={formData.price}
							type="number"
							step="0.01"
							className="form-control"
							id="price"
							placeholder={
								lang === "es"
									? "Ingresa el precio"
									: "Enter price"
							}
						/>
					</div>
				</div>

				<div className="mb-3">
					<label htmlFor="store_id">
						{lang === "es" ? "Tienda" : "Store"}
					</label>

					<Select
						id="store_id"
						options={stores}
						onChange={(selectedOption) =>
							setFormData({
								...formData,
								store_id: selectedOption.value,
							})
						}
						theme={(theme) => ({
							...theme,
							borderRadius: 10,
							colors: {
								...theme.colors,
								text: "black",
								primary25: "#137051",
								primary: "#0f2c27",
							},
						})}
						placeholder={
							lang === "es"
								? "Selecciona la Tienda"
								: "Select store"
						}
						isSearchable={true}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="image_url">
						{lang === "es" ? "URL de imagen" : "Image URL"}
					</label>
					<input
						onChange={handleInputChange}
						value={formData.image_url}
						type="text"
						className="form-control"
						id="image_url"
						placeholder={
							lang === "es"
								? "Ingresa la URL de la imagen"
								: "Enter image URL"
						}
					/>
				</div>

				<button className="btn btn-primary" type="submit">
					{lang === "es" ? "Enviar" : "Submit"}
				</button>
			</form>

			<Modal
				isOpen={Error !== ""}
				onClose={() => {
					setError("");
				}}
				title="Error"
				message={Error}></Modal>
		</>
	);
}
