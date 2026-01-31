import api from "@/api/api"

// Get Movie Details
export const getMovieDetails = async (
movieId: number,
params?: { language?: string; append_to_response?: string }
) => {
const response = await api.get(`/movie/${movieId}`, { params })
return response.data
}

// Get Movie Account States
export const getMovieAccountStates = async (
movieId: number,
sessionId: string
) => {
const response = await api.get(`/movie/${movieId}/account_states`, {
params: { session_id: sessionId },
})
return response.data
}

// Get Movie Alternative Titles
export const getMovieAlternativeTitles = async (
movieId: number,
country?: string
) => {
const response = await api.get(`/movie/${movieId}/alternative_titles`, {
params: { country },
})
return response.data
}

// Get Movie Changes
export const getMovieChanges = async (
movieId: number,
params?: { start_date?: string; end_date?: string; page?: number }
) => {
const response = await api.get(`/movie/${movieId}/changes`, { params })
return response.data
}

// Get Movie Credits
export const getMovieCredits = async (movieId: number, language?: string) => {
const response = await api.get(`/movie/${movieId}/credits`, {
params: { language },
})
return response.data
}

// Get Movie External IDs
export const getMovieExternalIds = async (movieId: number) => {
const response = await api.get(`/movie/${movieId}/external_ids`)
return response.data
}

// Get Movie Images
export const getMovieImages = async (
movieId: number,
params?: { language?: string; include_image_language?: string }
) => {
const response = await api.get(`/movie/${movieId}/images`, { params })
return response.data
}

// Get Movie Keywords
export const getMovieKeywords = async (movieId: number) => {
const response = await api.get(`/movie/${movieId}/keywords`)
return response.data
}

// Get Latest Movie
export const getLatestMovie = async () => {
const response = await api.get("/movie/latest")
return response.data
}

// Get Movie Lists
export const getMovieLists = async (
movieId: number,
params?: { language?: string; page?: number }
) => {
const response = await api.get(`/movie/${movieId}/lists`, { params })
return response.data
}

// Get Movie Recommendations
export const getMovieRecommendations = async (
movieId: number,
params?: { language?: string; page?: number }
) => {
const response = await api.get(`/movie/${movieId}/recommendations`, {
params,
})
return response.data
}

// Get Movie Release Dates
export const getMovieReleaseDates = async (movieId: number) => {
const response = await api.get(`/movie/${movieId}/release_dates`)
return response.data
}

// Get Movie Reviews
export const getMovieReviews = async (
movieId: number,
params?: { language?: string; page?: number }
) => {
const response = await api.get(`/movie/${movieId}/reviews`, { params })
return response.data
}

// Get Similar Movies
export const getSimilarMovies = async (
movieId: number,
params?: { language?: string; page?: number }
) => {
const response = await api.get(`/movie/${movieId}/similar`, { params })
return response.data
}

// Get Movie Translations
export const getMovieTranslations = async (movieId: number) => {
const response = await api.get(`/movie/${movieId}/translations`)
return response.data
}

// Get Movie Videos
export const getMovieVideos = async (movieId: number, language?: string) => {
const response = await api.get(`/movie/${movieId}/videos`, {
params: { language },
})
return response.data
}

// Get Movie Watch Providers
export const getMovieWatchProviders = async (movieId: number) => {
const response = await api.get(`/movie/${movieId}/watch/providers`)
return response.data
}

// Rate Movie
export const rateMovie = async (
movieId: number,
sessionId: string,
value: number
) => {
const response = await api.post(
`/movie/${movieId}/rating`,
{ value },
{ params: { session_id: sessionId } }
)
return response.data
}

// Delete Movie Rating
export const deleteMovieRating = async (movieId: number, sessionId: string) => {
const response = await api.delete(`/movie/${movieId}/rating`, {
params: { session_id: sessionId },
})
return response.data
}
