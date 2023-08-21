/** @format */

import { useEffect, useState } from "react";
import "./IndexPage.css";
import Select from "react-select";
import axios from "axios";
import Pet from "./Pet";
export function IndexPage(props) {
	const [pets, setpets] = useState([]);
	const [types, settypes] = useState([
		{
			label: "All",
			value: "",
		},
	]);
	const [breeds, setbreeds] = useState([
		{
			label: "All",
			value: "",
		},
	]);
	const [filteredPets, setFilteredPets] = useState([]);
	const [filterValues, setFilterValues] = useState({
		breed: "",
		type: "",
	});

	let api = process.env.REACT_APP_API_URL;

	useEffect(() => {
		if (pets.length === 0) {
			axios
				.get(api + "/pets")
				.then((res) => {
					setpets(res.data);
				})
				.catch((e) => {
					console.log(e);
				});
		}

		if (breeds.length === 1) {
			axios
				.get(api + "/pets/breeds")
				.then((response) => {
					const renamedData = response.data.map((item) => ({
						label: item,
						value: item,
					}));
					setbreeds([...breeds, ...renamedData]);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}

		if (types.length === 1) {
			axios
				.get(api + "/pets/types")
				.then((response) => {
					const renamedData = response.data.map((item) => ({
						label: item,
						value: item,
					}));
					settypes([...types, ...renamedData]);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// Apply filters
		let filtered = pets.filter((pet) => {
			let matchesAllFilters = true;

			if (filterValues.breed && pet.breed !== filterValues.breed) {
				matchesAllFilters = false;
			}

			if (filterValues.type && pet.type !== filterValues.type) {
				matchesAllFilters = false;
			}

			return matchesAllFilters;
		});

		setFilteredPets(filtered);
	}, [filterValues, pets]);

	const handleFilterChange = (key, value) => {
		setFilterValues((prevValues) => ({
			...prevValues,
			[key]: value,
		}));
	};

	if (pets.length === 0) {
		return (
			<>
				<div className="spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="filter-container">
				<span>{props.lang === "es" ? "Filtros" : "Filters"}: </span>
				<Select
					className="filter"
					options={breeds}
					onChange={(selectedOption) =>
						handleFilterChange("breed", selectedOption.value)
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
						props.lang === "es"
							? "Filtrar por Raza"
							: "Filter by Breed"
					}
					isSearchable={true}
				/>

				<Select
					className="filter"
					options={types}
					onChange={(selectedOption) =>
						handleFilterChange("type", selectedOption.value)
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
						props.lang === "es"
							? "Filtrar por tipo"
							: "Filter by Type"
					}
					isSearchable={true}
				/>
			</div>

			<div className="pets-container">
				{filteredPets.map((pet) => {
					return <Pet lang={props.lang} pet={pet} key={pet.id}></Pet>;
				})}
			</div>
		</>
	);
}
