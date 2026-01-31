import api from "@/api/api"

// Get Available Regions
export const getAvailableRegions = async (language?: string) => {
const response = await api.get("/watch/providers/regions", {
params: { language },
})
return response.data
}

// Get Movie Watch Providers List
export const getMovieWatchProvidersList = async (params?: {
language?: string
watch_region?: string
}) => {
const response = await api.get("/watch/providers/movie", { params })
return response.data
}

// Get TV Watch Providers List
export const getTvWatchProvidersList = async (params?: {
language?: string
watch_region?: string
}) => {
const response = await api.get("/watch/providers/tv", { params })
return response.data
}
