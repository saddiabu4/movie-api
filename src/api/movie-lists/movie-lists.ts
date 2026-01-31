import api from "@/api/api"

// Get Now Playing Movies
export const getNowPlayingMovies = async (params?: {
language?: string
page?: number
region?: string
}) => {
const response = await api.get("/movie/now_playing", { params })
return response.data
}

// Get Popular Movies
export const getPopularMovies = async (params?: {
language?: string
page?: number
region?: string
}) => {
const response = await api.get("/movie/popular", { params })
return response.data
}

// Get Top Rated Movies
export const getTopRatedMovies = async (params?: {
language?: string
page?: number
region?: string
}) => {
const response = await api.get("/movie/top_rated", { params })
return response.data
}

// Get Upcoming Movies
export const getUpcomingMovies = async (params?: {
language?: string
page?: number
region?: string
}) => {
const response = await api.get("/movie/upcoming", { params })
return response.data
}
