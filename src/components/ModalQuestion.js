/** @format */

import "./Modal.css";

const ModalQuestion = ({
	isOpen,
	title,
	message,
	acceptText,
	rejectText,
	onAccept,
	onReject,
	children,
}) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="modal-overlay">
			<div className="modal-container-custom">
				<h2>{title}</h2>
				<p>{message}</p>
				{children}
				<div className="button-container">
					<button
						className="page-button modal-button reject-button"
						onClick={onReject}>
						{rejectText}
					</button>
					<button
						className="modal-button accept-button page-button"
						onClick={onAccept}>
						{acceptText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalQuestion;
