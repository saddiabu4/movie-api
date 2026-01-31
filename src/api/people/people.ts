import api from "@/api/api"

// Get Person Details
export const getPersonDetails = async (
personId: number,
params?: { language?: string; append_to_response?: string }
) => {
const response = await api.get(`/person/${personId}`, { params })
return response.data
}

// Get Person Changes
export const getPersonChanges = async (
personId: number,
params?: { start_date?: string; end_date?: string; page?: number }
) => {
const response = await api.get(`/person/${personId}/changes`, { params })
return response.data
}

// Get Person Combined Credits
export const getPersonCombinedCredits = async (
personId: number,
language?: string
) => {
const response = await api.get(`/person/${personId}/combined_credits`, {
params: { language },
})
return response.data
}

// Get Person External IDs
export const getPersonExternalIds = async (personId: number) => {
const response = await api.get(`/person/${personId}/external_ids`)
return response.data
}

// Get Person Images
export const getPersonImages = async (personId: number) => {
const response = await api.get(`/person/${personId}/images`)
return response.data
}

// Get Latest Person
export const getLatestPerson = async () => {
const response = await api.get("/person/latest")
return response.data
}

// Get Person Movie Credits
export const getPersonMovieCredits = async (
personId: number,
language?: string
) => {
const response = await api.get(`/person/${personId}/movie_credits`, {
params: { language },
})
return response.data
}

// Get Person TV Credits
export const getPersonTvCredits = async (
personId: number,
language?: string
) => {
const response = await api.get(`/person/${personId}/tv_credits`, {
params: { language },
})
return response.data
}

// Get Person Translations
export const getPersonTranslations = async (personId: number) => {
const response = await api.get(`/person/${personId}/translations`)
return response.data
}

// Get Person Tagged Images
export const getPersonTaggedImages = async (
personId: number,
params?: { language?: string; page?: number }
) => {
const response = await api.get(`/person/${personId}/tagged_images`, {
params,
})
return response.data
}
