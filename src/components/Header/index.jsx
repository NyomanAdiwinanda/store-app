import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button, Container, Dropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import "./index.css";

export default function Header({ search, setSearch, handleSearch }) {
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogOut = e => {
		e.preventDefault();
		navigate("/");
		localStorage.clear();
	};

	return (
		<div id="header">
			<Navbar bg="body" expand="lg" className="justify-content-end">
				<Container fluid className="justify-content-end">
					<Nav className="align-items-center">
						<Form onSubmit={handleSearch} className="d-flex search-form custom-margin">
							<FormControl
								value={search}
								onChange={e => {
									if (e.target.value === "") {
										if (location.pathname === "/product") {
											setSearch(e.target.value);
											return handleSearch(e);
										}
									}

									setSearch(e.target.value);
								}}
								type="text"
								placeholder="Cari produk"
								className="search-input gotham-300"
							/>
							<Button variant="danger" type="submit" className="search-button px-4">
								<FaSearch />
							</Button>
						</Form>
						<Nav.Link className="nav-icon">
							<FaRegHeart size={26} />
						</Nav.Link>
						<Nav.Link className="nav-icon">
							<FiShoppingBag size={26} />
						</Nav.Link>
						<Dropdown align="end">
							<Dropdown.Toggle variant="link" className="nav-icon p-0">
								<FiUser size={26} />
							</Dropdown.Toggle>
							<Dropdown.Menu align="end">
								<Dropdown.Item onClick={handleLogOut} href="/#">
									Logout
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Nav>
				</Container>
			</Navbar>
			<Container fluid className="belanja-button-container">
				<Nav.Link className="text-white text-center bg-danger py-3 belanja-button gotham-500">
					BELANJA <span className="dropdown-toggle"></span>
				</Nav.Link>
			</Container>
		</div>
	);
}
