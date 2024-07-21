import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./utils/ScrollToTop";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop>
				<Routes>
					<Route path="/" element={<Auth />} />
					<Route path="/product" element={<ProductList />} />
					<Route path="/product/:id" element={<ProductDetail />} />
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
}

export default App;
