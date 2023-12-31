/** @format */

import { useEffect } from "react";
import image1 from "./assets/error-404-alert.png";
import image2 from "./assets/error-404-art.png";

const NotFound = (props) => {
	useEffect(() => {
		document.title = "Error";
	}, []);
	return (
		<div>
			<h2>
				Error 404:{" "}
				{props.lang === "es"
					? "Página no encontrada"
					: "Page not found"}
			</h2>
			<p>
				{props.lang === "es"
					? "La página que estás buscando no existe."
					: "The page you are looking for does not exist."}
			</p>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<img
					src={image1}
					alt="Imagen 1"
					style={{ marginRight: "10px", width: "200px" }}
				/>
				<img
					src={image2}
					alt="Imagen 2"
					style={{ marginLeft: "10px", width: "200px" }}
				/>
			</div>
		</div>
	);
};

export default NotFound;
