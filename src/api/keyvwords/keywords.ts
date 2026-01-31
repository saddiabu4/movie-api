import api from "@/api/api"

// Get Keyword Details
export const getKeywordDetails = async (keywordId: number) => {
const response = await api.get(`/keyword/${keywordId}`)
return response.data
}

// Get Keyword Movies (Deprecated - use Discover instead)
export const getKeywordMovies = async (
keywordId: number,
params?: { language?: string; page?: number; include_adult?: boolean }
) => {
const response = await api.get(`/keyword/${keywordId}/movies`, { params })
return response.data
}
