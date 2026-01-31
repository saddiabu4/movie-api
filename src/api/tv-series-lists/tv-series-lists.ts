import api from "@/api/api"

// Get Airing Today TV Shows
export const getAiringTodayTv = async (params?: {
language?: string
page?: number
timezone?: string
}) => {
const response = await api.get("/tv/airing_today", { params })
return response.data
}

// Get On The Air TV Shows
export const getOnTheAirTv = async (params?: {
language?: string
page?: number
timezone?: string
}) => {
const response = await api.get("/tv/on_the_air", { params })
return response.data
}

// Get Popular TV Shows
export const getPopularTv = async (params?: {
language?: string
page?: number
}) => {
const response = await api.get("/tv/popular", { params })
return response.data
}

// Get Top Rated TV Shows
export const getTopRatedTv = async (params?: {
language?: string
page?: number
}) => {
const response = await api.get("/tv/top_rated", { params })
return response.data
}
