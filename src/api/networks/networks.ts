import api from "@/api/api"

// Get Network Details
export const getNetworkDetails = async (networkId: number) => {
const response = await api.get(`/network/${networkId}`)
return response.data
}

// Get Network Alternative Names
export const getNetworkAlternativeNames = async (networkId: number) => {
const response = await api.get(`/network/${networkId}/alternative_names`)
return response.data
}

// Get Network Images
export const getNetworkImages = async (networkId: number) => {
const response = await api.get(`/network/${networkId}/images`)
return response.data
}
