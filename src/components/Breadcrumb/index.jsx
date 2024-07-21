import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RenderIf } from "../../utils/RenderIf";
import "./index.css";

export default function Breadcrumb({ productName }) {
	const navigate = useNavigate();

	return (
		<div id="breadcrumb">
			<a
				href="/#"
				onClick={e => {
					e.preventDefault();
					navigate("/product");
				}}
			>
				Home
			</a>
			<RenderIf isTrue={productName === null}>
				<div className="icon">
					<MdOutlineKeyboardDoubleArrowRight color="#696969" />
				</div>
				<a href="/#" onClick={e => e.preventDefault()}>
					Produk
				</a>
				<div className="icon">
					<MdOutlineKeyboardDoubleArrowRight color="#696969" />
				</div>
				<a href="/#" onClick={e => e.preventDefault()}>
					Roasted Bean
				</a>
			</RenderIf>
			<RenderIf isTrue={productName}>
				<div className="icon">
					<MdOutlineKeyboardDoubleArrowRight color="#696969" />
				</div>
				<a href="/#" onClick={e => e.preventDefault()}>
					{productName}
				</a>
			</RenderIf>
		</div>
	);
}
