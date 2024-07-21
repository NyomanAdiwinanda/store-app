/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Dropdown, ButtonGroup, Pagination } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import useDebounce from "../../hooks/useDebounce";
import http from "../../api/http";
import { RenderIf } from "../../utils/RenderIf";
import Header from "../../components/Header";
import Breadcrumb from "../../components/Breadcrumb";
import Filter from "../../components/Filter";
import "./index.css";

export default function ProductList() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [totalData, setTotalData] = useState(0);
	const [productData, setProductData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [itemsPerPage, setItemsPerPage] = useState(12);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("Nama Produk");
	const [priceRange, setPriceRange] = useState([10000, 150000]);
	const [activeKey, setActiveKey] = useState(["0", "1", "2", "3", "4"]);
	const [currentPage, setCurrentPage] = useState(1);
	const debouncedPriceRange = useDebounce(priceRange, 500);
	const [isFetchedFromDetail, setIsFetchedFromDetail] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const token = localStorage.getItem("token");
				const sortObj = {
					"Nama Produk": "product_name,ASC",
					Harga: "price,ASC",
					Tanggal: "date,DESC",
				};

				let priceFilter =
					priceRange[0] === 10000 && priceRange[1] === 150000 ? "" : `${priceRange[0]},${priceRange[1]}`;

				const { data } = await http({
					method: "GET",
					url: "/product",
					params: {
						keyword: search,
						price: priceFilter,
						page: currentPage,
						limit: itemsPerPage,
						order: sortObj[sortBy],
					},
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				setTotalData(data.data.total);
				setProductData(data.data.list);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		if (state && isFetchedFromDetail) {
			setSearch(state.data.list[0].name);
			setTotalData(state.data.total);
			setProductData(state.data.list);
			setLoading(false);
			setIsFetchedFromDetail(false);
		} else {
			fetchData();
		}
	}, [itemsPerPage, sortBy, debouncedPriceRange, currentPage, search]);

	const handleItemsPerPageSelect = e => {
		setCurrentPage(1);
		setItemsPerPage(parseInt(e, 10));
	};

	const handleSortBySelect = e => {
		setSortBy(e);
	};

	const handleSearch = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const token = localStorage.getItem("token");
			const sortObj = {
				"Nama Produk": "product_name,ASC",
				Harga: "price,ASC",
				Tanggal: "date,DESC",
			};

			let priceFilter = priceRange[0] === 10000 && priceRange[1] === 150000 ? "" : `${priceRange[0]},${priceRange[1]}`;

			const { data } = await http({
				method: "GET",
				url: "/product",
				params: {
					keyword: e.target.value === "" ? "" : search,
					price: priceFilter,
					page: 1,
					limit: itemsPerPage,
					order: sortObj[sortBy],
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setTotalData(data.data.total);
			setProductData(data.data.list);
			setCurrentPage(1);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber);
	};

	const totalPages = Math.ceil(totalData / itemsPerPage);

	return (
		<div id="product-list">
			<Header search={search} setSearch={setSearch} handleSearch={handleSearch} />
			<Breadcrumb productName={null} />
			<div className="main-container">
				<Filter
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					activeKey={activeKey}
					setActiveKey={setActiveKey}
				/>

				<div className="card-container">
					<Container>
						<div className="d-flex justify-content-between align-items-center my-3 gotham-400">
							<div className="d-flex align-items-center">
								<p className="mr-2 mb-0">Menampilkan</p>
								<Dropdown as={ButtonGroup} onSelect={handleItemsPerPageSelect}>
									<Dropdown.Toggle variant="light" id="dropdown-items-per-page">
										{itemsPerPage}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item eventKey="6">6</Dropdown.Item>
										<Dropdown.Item eventKey="12">12</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								<p className="ml-2 mb-0">dari {totalData}</p>
							</div>
							<div className="d-flex align-items-center ml-auto">
								<p className="mr-2 mb-0">Urutkan</p>
								<Dropdown as={ButtonGroup} onSelect={handleSortBySelect}>
									<Dropdown.Toggle variant="light" id="dropdown-sort-by">
										{sortBy}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item eventKey="Nama Produk">Nama Produk</Dropdown.Item>
										<Dropdown.Item eventKey="Harga">Harga</Dropdown.Item>
										<Dropdown.Item eventKey="Tanggal">Tanggal</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>
						<RenderIf isTrue={!loading}>
							<Row>
								{productData.map(product => (
									<Col key={product.id} md={4} className="mb-4">
										<Card
											onClick={() => {
												navigate(`/product/${product.id}`, { state: { product } });
											}}
											className="shadow-sm clickable-card product-card"
										>
											<Card.Img variant="top" src={product.images[0].image_url} />
											<Card.Body className="product-text">
												<Card.Title className="product-title">{product.name}</Card.Title>
												<Card.Text className="product-subtitle">{product.slug}</Card.Text>
												<div className="star-icon">
													<FaStar color="gold" />
													<FaStar color="gold" />
													<FaStar color="gold" />
													<FaStar color="gold" />
													<FaStar color="gold" />
													<span className="gotham-300 m-1">(7)</span>
												</div>
												<Card.Text className="product-price">{`Rp ${Number(product.price).toLocaleString(
													"id-ID"
												)}`}</Card.Text>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</RenderIf>
						<RenderIf isTrue={productData.length !== 0}>
							<Pagination className="justify-content-center mt-4 gotham-400">
								<Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
								{Array.from({ length: totalPages }, (_, index) => (
									<Pagination.Item
										key={index + 1}
										active={index + 1 === currentPage}
										onClick={() => handlePageChange(index + 1)}
									>
										{index + 1}
									</Pagination.Item>
								))}
								<Pagination.Next
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
								/>
							</Pagination>
						</RenderIf>
						<RenderIf isTrue={productData.length === 0 && !loading}>
							<div className="empty-result">
								<h2 className="gotham-300">Hasil Pencarian Kosong</h2>
							</div>
						</RenderIf>
					</Container>
				</div>
			</div>
		</div>
	);
}
