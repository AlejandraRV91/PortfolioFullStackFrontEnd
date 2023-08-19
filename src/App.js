/** @format */

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout";
import NotFound from "./components/NotFound";
import { IndexPage } from "./components/IndexPage";

function App() {
	return (
		<BrowserRouter>
			<MainLayout>
				<Routes>
					<Route path="/" element={<IndexPage></IndexPage>}></Route>
					<Route path="*" element={<NotFound></NotFound>}></Route>
				</Routes>
			</MainLayout>
		</BrowserRouter>
	);
}

export default App;
