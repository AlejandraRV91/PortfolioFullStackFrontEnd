/** @format */
import "./MainLayout.css";
import Select from "react-select";

import { useNavigate } from "react-router-dom";
export function MainLayout(props) {
	let navigate = useNavigate();
	return (
		<>
			<header>
				<span
					className="logo"
					onClick={() => {
						navigate("/");
					}}>
					PetPalaceHub
				</span>
				<div className="header-btns">
					<Select
						className="lang-filter"
						options={[
							{ label: "English", value: "en" },
							{ label: "Spanish", value: "es" },
						]}
						onChange={(selectedOption) =>
							props.langHandler(selectedOption.value)
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
						placeholder="Select Language"
						isSearchable={false}
					/>
					<button
						onClick={() => {
							navigate("/new");
						}}>
						{props.lang === "es"
							? "Añadir una mascota"
							: "Add a pet"}
						
					</button>
				</div>
			</header>
			<main>{props.children}</main>
			<footer>footer</footer>
		</>
	);
}
