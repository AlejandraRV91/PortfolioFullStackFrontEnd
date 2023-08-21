/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import email from "./assets/email.svg";
import location from "./assets/location.svg";
import phone from "./assets/phone.svg";

export function Store({ store_id }) {
	const [store, setStore] = useState(undefined);
	let api = process.env.REACT_APP_API_URL;

	useEffect(() => {
		axios
			.get(api + "/pets/stores/" + store_id)
			.then((res) => {
				setStore(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!store) {
		return (
			<div className="spinner">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	}

	return (
		<div
			className="store-details"
			style={{
				width: "100%",
				backgroundColor: "#2a796c44",
				borderRadius: "10px",
				padding: "5px",
			}}>
			<h2>{store.name}</h2>
			<div
				className="store-contact"
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					justifyContent: "space-around",
				}}>
				<p
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<img src={email} alt="email" />
					{store.contact_email}
				</p>
				<p
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<img src={phone} alt="phone" />
					{store.phone_number}
				</p>
				<p
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<img src={location} alt="location" />
					{store.address}
				</p>
			</div>
		</div>
	);
}
