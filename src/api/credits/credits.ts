import api from "@/api/api"

// Get Credit Details
export const getCreditDetails = async (creditId: string) => {
const response = await api.get(`/credit/${creditId}`)
return response.data
}
