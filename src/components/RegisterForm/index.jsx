/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import { RenderIf } from "../../utils/RenderIf";
import http from "../../api/http";
import "./index.css";

export default function RegisterForm({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	email,
	setEmail,
	phoneNumber,
	setPhoneNumber,
	password,
	setPassword,
	confirmPassword,
	setConfirmPassword,
	showPassword,
	setShowPassword,
	showConfirmPassword,
	setShowConfirmPassword,
	setFormType,
}) {
	const [nextForm, setNextForm] = useState(false);

	const togglePasswordVisibility = type => {
		if (type === "first") {
			setShowPassword(!showPassword);
		} else {
			setShowConfirmPassword(!showConfirmPassword);
		}
	};

	const handleClickLogin = e => {
		e.preventDefault();
		setFirstName("");
		setLastName("");
		setEmail("");
		setPhoneNumber("");
		setPassword("");
		setConfirmPassword("");
		setShowPassword(false);
		setShowConfirmPassword(false);
		setFormType(1);
	};

	const handlePreviousForm = e => {
		e.preventDefault();
		setNextForm(false);
	};

	const validateEmail = mail => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			return true;
		}

		return false;
	};

	const handleNextForm = e => {
		e.preventDefault();

		if (!firstName || !lastName || !email) {
			return toast.error("Harap isi semua informasi untuk daftar", {
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

		if (!validateEmail(email)) {
			return toast.error("Invalid Email format", {
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

		setNextForm(true);
	};

	const handleRegister = async e => {
		try {
			e.preventDefault();
			if (password !== confirmPassword) {
				return toast.error("Password tidak sama, harap cek ulang", {
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

			await http({
				method: "POST",
				url: "/register",
				data: {
					name: `${firstName} ${lastName}`,
					email,
					password,
					phone: phoneNumber,
				},
			});

			toast.success("Registrasi berhasil, silahkan login", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});

			setFirstName("");
			setLastName("");
			setEmail("");
			setPhoneNumber("");
			setPassword("");
			setConfirmPassword("");
			setShowPassword(false);
			setShowConfirmPassword(false);
			setFormType(1);
		} catch (error) {
			if (error.response.data.message === "Validation errors") {
				if (error.response.data.data.password) {
					return toast.error(error.response.data.data.password[0], {
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

				if (error.response.data.data.phone) {
					return toast.error(error.response.data.data.phone[0], {
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
			} else {
				return toast.error("Error", {
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
					<RenderIf isTrue={!nextForm}>
						<div className="register-box">
							<h2>Daftar Sekarang</h2>
							<Form onSubmit={handleNextForm}>
								<Form.Group controlId="formNamaDepan" className="mb-3">
									<Form.Control
										value={firstName}
										onChange={e => setFirstName(e.target.value)}
										type="text"
										placeholder="Nama Depan"
										className="px-3 py-2 gotham-400"
									/>
								</Form.Group>
								<Form.Group controlId="formNamaBelakang" className="mb-3">
									<Form.Control
										value={lastName}
										onChange={e => setLastName(e.target.value)}
										type="text"
										placeholder="Nama Belakang"
										className="px-3 py-2 gotham-400"
									/>
								</Form.Group>
								<Form.Group controlId="formEmail" className="mb-3">
									<Form.Control
										value={email}
										onChange={e => setEmail(e.target.value)}
										type="email"
										placeholder="Email"
										className="px-3 py-2 gotham-400"
									/>
								</Form.Group>
								<Button variant="danger" type="submit" className="next-button gotham-400 mt-4">
									SELANJUTNYA
								</Button>
							</Form>
							<div className="separator"></div>
							<p className="register-link gotham-400">
								Sudah punya akun?{" "}
								<a href="/#" onClick={handleClickLogin} className="register-button">
									Masuk
								</a>
							</p>
						</div>
					</RenderIf>

					<RenderIf isTrue={nextForm}>
						<div className="register-box">
							<div className="back-button" onClick={handlePreviousForm}>
								<IoArrowBack size={22} />
								<h3>Kembali</h3>
							</div>
							<Form onSubmit={handleRegister}>
								<Form.Group controlId="formNamaDepan" className="mb-3">
									<Form.Control
										value={phoneNumber}
										onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
										type="text"
										placeholder="Nomor Telepon"
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
									<span className="password-toggle-icon gotham-400" onClick={() => togglePasswordVisibility("first")}>
										{showPassword ? "Hide" : "Show"}
									</span>
								</Form.Group>
								<Form.Group controlId="formPassword" className="password-group">
									<Form.Control
										value={confirmPassword}
										onChange={e => setConfirmPassword(e.target.value)}
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Konfirmasi Password"
										className="px-3 py-2 gotham-400"
									/>
									<span className="password-toggle-icon gotham-400" onClick={() => togglePasswordVisibility("second")}>
										{showConfirmPassword ? "Hide" : "Show"}
									</span>
								</Form.Group>
								<Button variant="danger" type="submit" className="next-button gotham-400 mt-4">
									SELANJUTNYA
								</Button>
							</Form>
							<div className="separator"></div>
							<p className="register-link gotham-400">
								Sudah punya akun?{" "}
								<a href="/#" onClick={handleClickLogin} className="register-button">
									Masuk
								</a>
							</p>
						</div>
					</RenderIf>
				</Col>
			</Row>
		</Container>
	);
}
