import api from "@/api/api"

// Get Company Details
export const getCompanyDetails = async (companyId: number) => {
const response = await api.get(`/company/${companyId}`)
return response.data
}

// Get Company Alternative Names
export const getCompanyAlternativeNames = async (companyId: number) => {
const response = await api.get(`/company/${companyId}/alternative_names`)
return response.data
}

// Get Company Images
export const getCompanyImages = async (companyId: number) => {
const response = await api.get(`/company/${companyId}/images`)
return response.data
}
