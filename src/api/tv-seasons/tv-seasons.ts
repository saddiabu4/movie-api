import api from "@/api/api"

// Get TV Season Details
export const getTvSeasonDetails = async (
seriesId: number,
seasonNumber: number,
params?: { language?: string; append_to_response?: string }
) => {
const response = await api.get(`/tv/${seriesId}/season/${seasonNumber}`, {
params,
})
return response.data
}

// Get TV Season Account States
export const getTvSeasonAccountStates = async (
seriesId: number,
seasonNumber: number,
sessionId: string
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/account_states`,
{ params: { session_id: sessionId } }
)
return response.data
}

// Get TV Season Aggregate Credits
export const getTvSeasonAggregateCredits = async (
seriesId: number,
seasonNumber: number,
language?: string
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/aggregate_credits`,
{ params: { language } }
)
return response.data
}

// Get TV Season Changes
export const getTvSeasonChanges = async (
seasonId: number,
params?: { start_date?: string; end_date?: string; page?: number }
) => {
const response = await api.get(`/tv/season/${seasonId}/changes`, { params })
return response.data
}

// Get TV Season Credits
export const getTvSeasonCredits = async (
seriesId: number,
seasonNumber: number,
language?: string
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/credits`,
{ params: { language } }
)
return response.data
}

// Get TV Season External IDs
export const getTvSeasonExternalIds = async (
seriesId: number,
seasonNumber: number
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/external_ids`
)
return response.data
}

// Get TV Season Images
export const getTvSeasonImages = async (
seriesId: number,
seasonNumber: number,
params?: { language?: string; include_image_language?: string }
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/images`,
{ params }
)
return response.data
}

// Get TV Season Translations
export const getTvSeasonTranslations = async (
seriesId: number,
seasonNumber: number
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/translations`
)
return response.data
}

// Get TV Season Videos
export const getTvSeasonVideos = async (
seriesId: number,
seasonNumber: number,
params?: { language?: string; include_video_language?: string }
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/videos`,
{ params }
)
return response.data
}

// Get TV Season Watch Providers
export const getTvSeasonWatchProviders = async (
seriesId: number,
seasonNumber: number,
language?: string
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/watch/providers`,
{ params: { language } }
)
return response.data
}
