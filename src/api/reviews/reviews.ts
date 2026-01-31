import api from "@/api/api"

// Get Review Details
export const getReviewDetails = async (reviewId: string) => {
const response = await api.get(`/review/${reviewId}`)
return response.data
}
