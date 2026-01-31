import api from "@/api/api"

// Get TV Series Details
export const getTvSeriesDetails = async (
seriesId: number,
params?: { language?: string; append_to_response?: string }
) => {
const response = await api.get(`/tv/${seriesId}`, { params })
return response.data
}

// Get TV Series Account States
export const getTvSeriesAccountStates = async (
seriesId: number,
sessionId: string
) => {
const response = await api.get(`/tv/${seriesId}/account_states`, {
params: { session_id: sessionId },
})
return response.data
}

// Get TV Series Aggregate Credits
export const getTvSeriesAggregateCredits = async (
seriesId: number,
language?: string
) => {
const response = await api.get(`/tv/${seriesId}/aggregate_credits`, {
params: { language },
})
return response.data
}

// Get TV Series Alternative Titles
export const getTvSeriesAlternativeTitles = async (seriesId: number) => {
const response = await api.get(`/tv/${seriesId}/alternative_titles`)
return response.data
}

// Get TV Series Changes
export const getTvSeriesChanges = async (
seriesId: number,
params?: { start_date?: string; end_date?: string; page?: number }
) => {
const response = await api.get(`/tv/${seriesId}/changes`, { params })
return response.data
}

// Get TV Series Content Ratings
export const getTvSeriesContentRatings = async (seriesId: number) => {
const response = await api.get(`/tv/${seriesId}/content_ratings`)
return response.data
}

// Get TV Series Credits
export const getTvSeriesCredits = async (
seriesId: number,
language?: string
) => {
const response = await api.get(`/tv/${seriesId}/credits`, {
params: { language },
})
return response.data
}

// Get TV Series Episode Groups
export const getTvSeriesEpisodeGroups = async (seriesId: number) => {
const response = await api.get(`/tv/${seriesId}/episode_groups`)
return response.data
}

// Get TV Series External IDs
export const getTvSeriesExternalIds = async (seriesId: number) => {
const response = await api.get(`/tv/${seriesId}/external_ids`)
return response.data
}

// Get TV Series Images
export const getTvSeriesImages = async (
seriesId: number,
params?: { language?: string; include_image_language?: string }
) => {
const response = await api.get(`/tv/${seriesId}/images`, { params })
return response.data
}

// Get TV Series Keywords
export const getTvSeriesKeywords = async (seriesId: number) => {
const response = await api.get(`/tv/${seriesId}/keywords`)
return response.data
}

// Get Latest TV Series
export const getLatestTvSeries = async () => {
const response = await api.get("/tv/latest")
return response.data
}

// Get TV Series Lists
export const getTvSeriesLists = async (
seriesId: number,
params?: { language?: string; page?: number }
) => {
const response = await api.get(`/tv/${seriesId}/lists`, { params })
return response.data
}

// Get TV Series Recommendations
export const getTvSeriesRecommendations = async (
seriesId: number,
params?: { language?: string; page?: number }
) => {
const response = await api.get(`/tv/${seriesId}/recommendations`, { params })
return response.data
}

// Get TV Series Reviews
export const getTvSeriesReviews = async (
seriesId: number,
params?: { language?: string; page?: number }
) => {
const response = await api.get(`/tv/${seriesId}/reviews`, { params })
return response.data
}

// Get TV Series Screened Theatrically
export const getTvSeriesScreenedTheatrically = async (seriesId: number) => {
const response = await api.get(`/tv/${seriesId}/screened_theatrically`)
return response.data
}

// Get Similar TV Series
export const getSimilarTvSeries = async (
seriesId: number,
params?: { language?: string; page?: number }
) => {
const response = await api.get(`/tv/${seriesId}/similar`, { params })
return response.data
}

// Get TV Series Translations
export const getTvSeriesTranslations = async (seriesId: number) => {
const response = await api.get(`/tv/${seriesId}/translations`)
return response.data
}

// Get TV Series Videos
export const getTvSeriesVideos = async (
seriesId: number,
params?: { language?: string; include_video_language?: string }
) => {
const response = await api.get(`/tv/${seriesId}/videos`, { params })
return response.data
}

// Get TV Series Watch Providers
export const getTvSeriesWatchProviders = async (seriesId: number) => {
const response = await api.get(`/tv/${seriesId}/watch/providers`)
return response.data
}

// Rate TV Series
export const rateTvSeries = async (
seriesId: number,
sessionId: string,
value: number
) => {
const response = await api.post(
`/tv/${seriesId}/rating`,
{ value },
{ params: { session_id: sessionId } }
)
return response.data
}

// Delete TV Series Rating
export const deleteTvSeriesRating = async (
seriesId: number,
sessionId: string
) => {
const response = await api.delete(`/tv/${seriesId}/rating`, {
params: { session_id: sessionId },
})
return response.data
}
