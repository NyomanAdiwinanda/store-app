/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { RenderIf } from "../../utils/RenderIf";

const Auth = () => {
	const navigate = useNavigate();
	const [formType, setFormType] = useState(1);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/product");
		}
	}, []);

	return (
		<div>
			<RenderIf isTrue={formType === 1}>
				<LoginForm
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					setFormType={setFormType}
				/>
			</RenderIf>

			<RenderIf isTrue={formType === 2}>
				<RegisterForm
					firstName={firstName}
					setFirstName={setFirstName}
					lastName={lastName}
					setLastName={setLastName}
					email={email}
					setEmail={setEmail}
					phoneNumber={phoneNumber}
					setPhoneNumber={setPhoneNumber}
					password={password}
					setPassword={setPassword}
					confirmPassword={confirmPassword}
					setConfirmPassword={setConfirmPassword}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					showConfirmPassword={showConfirmPassword}
					setShowConfirmPassword={setShowConfirmPassword}
					setFormType={setFormType}
				/>
			</RenderIf>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
};

export default Auth;
