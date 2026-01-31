import axios from "axios"

const apiRead = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
	},
})

export default apiRead
