/** @format */
import "./MainLayout.css";

export function MainLayout(props) {
	return (
		<>
			<header>
				<span className="logo">PetPalaceHub</span>
				<div className="header-btns">
					<button>Add a pet</button>
				</div>
			</header>
			<main>{props.children}</main>
			<footer>footer</footer>
		</>
	);
}
