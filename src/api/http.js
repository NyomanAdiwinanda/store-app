import axios from "axios";

const http = axios.create({
	baseURL: "https://techtest.folkatech.com/api",
});

export default http;
