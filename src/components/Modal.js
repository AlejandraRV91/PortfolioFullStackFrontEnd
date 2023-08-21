/** @format */

import "./Modal.css";

const Modal = ({ isOpen, onClose, title, message, children }) => {
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
						className="modal-button accept-button page-button"
						onClick={onClose}>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
