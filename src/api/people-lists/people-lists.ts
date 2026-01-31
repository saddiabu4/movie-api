import api from "@/api/api"

// Get Popular People
export const getPopularPeople = async (params?: {
language?: string
page?: number
}) => {
const response = await api.get("/person/popular", { params })
return response.data
}
