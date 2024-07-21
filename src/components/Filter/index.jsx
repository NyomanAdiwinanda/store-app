import React from "react";
import { Accordion, Card, Form } from "react-bootstrap";
import Slider from "rc-slider";
import "./index.css";

export default function FilterComponent({ priceRange, setPriceRange, activeKey, setActiveKey }) {
	const handleToggle = key => {
		if (activeKey.includes(key)) {
			setActiveKey(activeKey.filter(k => k !== key));
		} else {
			setActiveKey([...activeKey, key]);
		}
	};

	return (
		<div className="filter-container">
			<h5 className="filter-header">URUTKAN BERDASARKAN</h5>
			<h6 className="filter-subheader">Harga</h6>
			<div className="d-flex align-items-center filter-price">
				<Slider
					range
					min={10000}
					max={150000}
					step={10000}
					value={priceRange}
					onChange={value => setPriceRange(value)}
					className="price-slider"
				/>
			</div>
			<div className="price-range-text">
				<span>Rp </span>
				<span className="price-box">{priceRange[0].toLocaleString("id-ID")}</span>
				<span> - </span>
				<span>Rp </span>
				<span className="price-box">{priceRange[1].toLocaleString("id-ID")}</span>
			</div>
			<Accordion activeKey={activeKey}>
				{["Origin", "Species", "Roast Level", "Tasted", "Processing"].map((category, index) => (
					<Card key={index}>
						<Accordion.Item eventKey={String(index)} className="accordion-container">
							<Accordion.Header onClick={() => handleToggle(String(index))} className="filter-category gotham-600">
								{category}
							</Accordion.Header>
							<Accordion.Body className="filter-options gotham-400">{getCategoryOptions(category)}</Accordion.Body>
						</Accordion.Item>
					</Card>
				))}
			</Accordion>
		</div>
	);
}

const getCategoryOptions = category => {
	const options = {
		Origin: ["Aceh", "Semarang", "Bandung", "Jawa", "Amerika Selatan", "Lain - Lain"],
		Species: ["Arabika", "Robusta", "Blend"],
		"Roast Level": ["Light Roast", "Medium Roast", "Dark Roast", "Light to Medium Roast"],
		Tasted: ["Sweet", "Floral", "Fruity", "Nutty", "Cocoa", "Spices"],
		Processing: ["Honey White", "Natural", "Honey Gold", "Honey Yellow"],
	};

	return options[category].map((option, idx) => (
		<Form.Check type="checkbox" label={option} key={idx} className="filter-checkbox" />
	));
};
