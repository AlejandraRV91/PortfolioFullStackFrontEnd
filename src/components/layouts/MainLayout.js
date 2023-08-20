/** @format */
import "./MainLayout.css";

export function MainLayout(props) {
	return (
		<>
			<header>
				<span className="logo">PetPalaceHub</span>
				header
			</header>
			<main>{props.children}</main>
			<footer>footer</footer>
		</>
	);
}
