/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Image, Button, FormControl, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { CiSquareCheck } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import http from "../../api/http";
import Header from "../../components/Header";
import Breadcrumb from "../../components/Breadcrumb";
import "./index.css";

export default function ProductDetail() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [recommendation, setRecommendation] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedImage, setSelectedImage] = useState(state ? state.product.images[0].image_url : "");
	const [quantity, setQuantity] = useState(1);

	const shuffleArray = array => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	useEffect(() => {
		const fetchRecommendation = async () => {
			try {
				const token = localStorage.getItem("token");
				const { data } = await http({
					method: "GET",
					url: "/product",
					params: {
						keyword: "",
						price: "",
						page: 1,
						limit: 100,
						order: "product_name,ASC",
					},
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const list = data.data.list;
				const shuffledList = shuffleArray([...list]);
				const randomItems = shuffledList.slice(0, 3);
				setRecommendation(randomItems);
			} catch (error) {
				console.log(error);
			}
		};

		if (!state) {
			return navigate("/product");
		}
		fetchRecommendation();
	}, []);

	const handleQuantityChange = value => {
		if (value >= 1) {
			setQuantity(value);
		}
	};

	const handleSearch = async e => {
		try {
			e.preventDefault();
			const token = localStorage.getItem("token");

			const { data } = await http({
				method: "GET",
				url: "/product",
				params: {
					keyword: search,
					price: "",
					page: 1,
					limit: 100,
					order: "product_name,ASC",
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			navigate(`/product`, { state: { data: data.data } });
		} catch (error) {
			console.log(error);
		}
	};

	if (!state) return null;

	return (
		<div id="product-detail">
			<Header search={search} setSearch={setSearch} handleSearch={handleSearch} />
			<Breadcrumb productName={state.product.name} />
			<Container className="my-4">
				<Row>
					<Col md={5}>
						<Image src={selectedImage} fluid />
						<div className="image-thumbnails mt-3 d-flex">
							{state.product.images.map((image, index) => (
								<div onClick={() => setSelectedImage(image.image_url)} key={index} className="thumbnail-container mx-1">
									<Image src={image.image_url} thumbnail />
								</div>
							))}
						</div>
					</Col>
					<Col md={7}>
						<h2 className="product-title">{state.product.name}</h2>
						<h5 className="product-subtitle">{state.product.slug}</h5>
						<div className="star-rating mb-2">
							<FaStar color="gold" />
							<FaStar color="gold" />
							<FaStar color="gold" />
							<FaStar color="gold" />
							<FaStar color="gold" />
							<span className="gotham-300 ml-2">(7)</span>
						</div>
						<div className="price-container">
							<h4 className="product-price">Rp {Number(state.product.price).toLocaleString("id-ID")}</h4>
							<div className="d-flex align-items-center mb-2">
								<CiSquareCheck color="#6F8EFF" />
								<span className="ml-2 text-tersedia">Tersedia</span>
							</div>
						</div>
						<div className="d-flex align-items-center my-3">
							<Button variant="outline-secondary" onClick={() => handleQuantityChange(quantity - 1)}>
								-
							</Button>
							<FormControl
								type="text"
								value={quantity}
								onChange={e => handleQuantityChange(parseInt(e.target.value, 10))}
								className="text-center mx-2"
								style={{ width: "60px" }}
							/>
							<Button variant="outline-secondary" onClick={() => handleQuantityChange(quantity + 1)}>
								+
							</Button>
							<Button variant="danger" className="button-cart">
								Tambah ke Keranjang
							</Button>
							<Button variant="light" className="button-love">
								<FaRegHeart />
							</Button>
						</div>
						<p className="product-description">{state.product.short_description}</p>
					</Col>
				</Row>
				<div className="tabs-container">
					<div className="tab active">DESKRIPSI</div>
					<div className="tab">INFORMASI</div>
				</div>
				<div className="tab-content">
					<p className="product-description">{state.product.description}</p>
				</div>
				<div className="recommendation-container">
					<h4 className="text-center gotham-500">REKOMENDASI UNTUK ANDA</h4>
					<div className="recommendation-separator" />
				</div>
				<Row>
					{recommendation.map(item => (
						<Col key={item.id} md={4} className="mb-4 d-flex">
							<Card className="shadow-sm clickable-card same-height">
								<Card.Img variant="top" src={item.images[0].image_url} className="same-height-img" />
								<Card.Body className="product-text same-height-body">
									<Card.Title className="product-title">{item.name}</Card.Title>
									<Card.Text className="product-subtitle">{item.slug}</Card.Text>
									<div className="star-rating-card mb-2">
										<FaStar color="gold" />
										<FaStar color="gold" />
										<FaStar color="gold" />
										<FaStar color="gold" />
										<FaStar color="gold" />
										<span className="gotham-300 ml-2">(7)</span>
									</div>
									<Card.Text className="product-price">Rp {Number(item.price).toLocaleString("id-ID")}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
}
