/** @format */

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout";
import NotFound from "./components/NotFound";
import { IndexPage } from "./components/IndexPage";
import { EditPage } from "./components/EditPage";
import { ShowPage } from "./components/ShowPage";
import { NewPage } from "./components/NewPage";
import { useState } from "react";

function App() {
	const [lang, setlang] = useState("en");

	return (
		<BrowserRouter>
			<MainLayout lang={lang} langHandler={setlang}>
				<Routes>
					<Route path="/" element={<IndexPage lang={lang}></IndexPage>}></Route>
					<Route path="/new/" element={<NewPage lang={lang}></NewPage>}></Route>
					<Route
						path="/view/:id"
						element={<ShowPage lang={lang}></ShowPage>}></Route>
					<Route
						path="/edit/:id"
						element={<EditPage lang={lang}></EditPage>}></Route>
					<Route path="*" element={<NotFound lang={lang}></NotFound>}></Route>
				</Routes>
			</MainLayout>
		</BrowserRouter>
	);
}

export default App;
