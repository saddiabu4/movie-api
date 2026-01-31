import api from "@/api/api"

// Get Collection Details
export const getCollectionDetails = async (
collectionId: number,
language?: string
) => {
const response = await api.get(`/collection/${collectionId}`, {
params: { language },
})
return response.data
}

// Get Collection Images
export const getCollectionImages = async (
collectionId: number,
language?: string
) => {
const response = await api.get(`/collection/${collectionId}/images`, {
params: { language },
})
return response.data
}

// Get Collection Translations
export const getCollectionTranslations = async (collectionId: number) => {
const response = await api.get(`/collection/${collectionId}/translations`)
return response.data
}
