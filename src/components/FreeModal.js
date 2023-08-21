/** @format */

import "./Modal.css";

const FreeModal = ({
	isOpen,
	button,
	title,
	message,
	children,
	onReject,
	rejectText,
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
				<div className="button-container-modal-only">
					<button
						className="page-button modal-button reject-button"
						onClick={onReject}>
						{rejectText}
					</button>
					{button}
				</div>
			</div>
		</div>
	);
};

export default FreeModal;
