/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowPage.css";
import { formatReadableDate, translateString } from "../utils/Functions";
import { Store } from "./Store";
import cart from "./assets/cart-icon.svg";
import deleteIcn from "./assets/delete-icon.svg";
import edit from "./assets/edit-icon.svg";
import ReceiptPDF from "./ReceiptPDF";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import FreeModal from "./FreeModal";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export function ShowPage({ lang }) {
	let navigate = useNavigate();
	const [pet, setpet] = useState([]);
	const [viewPdf, setviewPdf] = useState(false);
	const [cantBuy, setcantBuy] = useState(false);
	const { id } = useParams();
	let api = process.env.REACT_APP_API_URL;
	useEffect(() => {
		axios
			.get(api + "/pets/" + id)
			.then((res) => {
				setpet(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleDelete() {
		axios
			.delete(api + "/pets/" + id)
			.then((res) => {
				navigate("/");
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function handleEdit() {
		navigate("/edit/" + id);
	}

	let handleBuy = () => {
		setviewPdf(false);
		axios
			.put(api + "/pets/" + id, {
				...pet,
				is_available: false,
			})
			.then((res) => {
				setpet(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const [traduction, settraduction] = useState([pet.type, pet.description]);

	useEffect(() => {
		if (lang === "es") {
			translateString([pet.type, pet.description].join("%@")).then(
				(res) => {
					settraduction(res.split("%@"));
				}
			);
		} else {
			settraduction([pet.type, pet.description]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lang, pet]);

	if (pet.length === 0) {
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
			<div className="show-container">
				<Store store_id={pet.store_id}></Store>
				<div className="pet-details-show">
					<img
						className="pet-image-show"
						src={pet.image_url}
						alt={pet.name}
					/>
					<div className="pet-info-show">
						<h2>{pet.name}</h2>
						<p>
							<strong>{lang === "es" ? "Tipo" : "Type"}: </strong>
							{traduction[0]}
						</p>
						<p>
							<strong>{lang === "es" ? "Edad" : "Age"}: </strong>
							{pet.age} {lang === "es" ? "años" : "years"}
						</p>
						<p>
							<strong>
								{lang === "es" ? "Peso" : "Weight"}:{" "}
							</strong>
							{pet.weight} kg
						</p>
						<p>
							<strong>
								{lang === "es" ? "Descripción" : "Description"}:{" "}
							</strong>
							{traduction[1]}
						</p>
						<p>
							<strong>
								{lang === "es" ? "Raza" : "Breed"}:{" "}
							</strong>
							{pet.breed}
						</p>
						<p>
							<strong>
								{lang === "es"
									? "Fecha de ingreso"
									: "Entry Date"}
								:{" "}
							</strong>
							{formatReadableDate(pet.entry_date, lang)}
						</p>
						<div className="buy-btn-container">
							<button
								className="delete-btn"
								onClick={handleDelete}>
								<img src={deleteIcn} alt="delete" />
								Delete
							</button>
							<button className="edit-btn" onClick={handleEdit}>
								<img src={edit} alt="edit" />
								Delete
							</button>
							<button
								className={
									"buy-btn" +
									(pet.is_available ? "" : " disabled")
								}
								onClick={() => {
									if (pet.is_available) {
										setviewPdf(true);
									} else {
										setcantBuy(true);
									}
								}}>
								<img src={cart} alt="cart" />${pet.price}
							</button>
						</div>
					</div>
				</div>
			</div>

			<Modal
				isOpen={cantBuy}
				onClose={() => {
					setcantBuy(false);
				}}
				title="Error"
				message="This pet is no longer available"></Modal>

			<FreeModal
				isOpen={viewPdf}
				rejectText="Close"
				onReject={handleBuy}
				title="Download Receipt PDF"
				message=""
				button={
					<PDFDownloadLink
						document={<ReceiptPDF purchaseInfo={pet}></ReceiptPDF>}
						fileName="purchase_receipt.pdf">
						<button className="modal-button accept-button page-button">
							Download
						</button>
					</PDFDownloadLink>
				}>
				<PDFViewer style={{ width: "50vw", height: "80vh" }}>
					<ReceiptPDF purchaseInfo={pet}></ReceiptPDF>
				</PDFViewer>
			</FreeModal>
		</>
	);
}
