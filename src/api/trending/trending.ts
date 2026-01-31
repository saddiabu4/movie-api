import api from "@/api/api"

// Get Trending All
export const getTrendingAll = async (
timeWindow: "day" | "week",
language?: string
) => {
const response = await api.get(`/trending/all/${timeWindow}`, {
params: { language },
})
return response.data
}

// Get Trending Movies
export const getTrendingMovies = async (
timeWindow: "day" | "week",
language?: string
) => {
const response = await api.get(`/trending/movie/${timeWindow}`, {
params: { language },
})
return response.data
}

// Get Trending People
export const getTrendingPeople = async (
timeWindow: "day" | "week",
language?: string
) => {
const response = await api.get(`/trending/person/${timeWindow}`, {
params: { language },
})
return response.data
}

// Get Trending TV Shows
export const getTrendingTv = async (
timeWindow: "day" | "week",
language?: string
) => {
const response = await api.get(`/trending/tv/${timeWindow}`, {
params: { language },
})
return response.data
}
