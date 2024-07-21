import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import http from "../../api/http";
import "./index.css";

export default function LoginForm({
	showPassword,
	setShowPassword,
	email,
	setEmail,
	password,
	setPassword,
	setFormType,
}) {
	const navigate = useNavigate();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleClickRegister = e => {
		e.preventDefault();
		setEmail("");
		setPassword("");
		setShowPassword(false);
		setFormType(2);
	};

	const handleLogin = async e => {
		try {
			e.preventDefault();

			const { data } = await http({
				method: "POST",
				url: "https://techtest.folkatech.com/api/login",
				data: {
					email,
					password,
				},
			});

			localStorage.setItem("token", data.data.token);
			navigate("/product");
		} catch (error) {
			if (error.response.data) {
				return toast.error(error.response.data.message, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			} else {
				return toast.error("Error request", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			}
		}
	};

	return (
		<Container className="d-flex vh-100 justify-content-center align-items-center">
			<Row className="justify-content-center">
				<Col>
					<div className="login-box">
						<h2>Masuk</h2>
						<Form onSubmit={handleLogin}>
							<Form.Group controlId="formEmail" className="mb-3">
								<Form.Control
									value={email}
									onChange={e => setEmail(e.target.value)}
									type="email"
									placeholder="Email"
									className="px-3 py-2 gotham-400"
								/>
							</Form.Group>
							<Form.Group controlId="formPassword" className="password-group">
								<Form.Control
									value={password}
									onChange={e => setPassword(e.target.value)}
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									className="px-3 py-2 gotham-400"
								/>
								<span className="password-toggle-icon gotham-400" onClick={togglePasswordVisibility}>
									{showPassword ? "Hide" : "Show"}
								</span>
							</Form.Group>
							<a href="/#" onClick={e => e.preventDefault()} className="forgot-password gotham-400">
								Lupa Password?
							</a>
							<Button variant="danger" type="submit" className="login-button gotham-500">
								MASUK
							</Button>
						</Form>
						<div className="separator"></div>
						<p className="register-link gotham-400">
							Belum punya akun?{" "}
							<a href="/#" onClick={handleClickRegister} className="register-button">
								Daftar Sekarang
							</a>
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
