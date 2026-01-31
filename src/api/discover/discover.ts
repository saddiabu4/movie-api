import api from "@/api/api"

// Discover Movies
export const discoverMovies = async (params?: {
	language?: string
	page?: number
	region?: string
	sort_by?: string
	with_genres?: string | number
	without_genres?: string
	with_keywords?: string
	without_keywords?: string
	year?: number
	primary_release_year?: number
	"primary_release_date.gte"?: string
	"primary_release_date.lte"?: string
	"vote_average.gte"?: number
	"vote_average.lte"?: number
	"vote_count.gte"?: number
	include_adult?: boolean
	include_video?: boolean
}) => {
	const response = await api.get("/discover/movie", { params })
	return response.data
}

// Discover TV Shows
export const discoverTvShows = async (params?: {
	language?: string
	page?: number
	sort_by?: string
	with_genres?: string | number
	without_genres?: string
	with_keywords?: string
	without_keywords?: string
	"first_air_date.gte"?: string
	"first_air_date.lte"?: string
	"vote_average.gte"?: number
	"vote_average.lte"?: number
	"vote_count.gte"?: number
	include_adult?: boolean
	include_null_first_air_dates?: boolean
	with_networks?: string
	with_original_language?: string
}) => {
	const response = await api.get("/discover/tv", { params })
	return response.data
}
