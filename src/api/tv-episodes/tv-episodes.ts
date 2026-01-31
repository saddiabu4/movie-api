import api from "@/api/api"

// Get TV Episode Details
export const getTvEpisodeDetails = async (
seriesId: number,
seasonNumber: number,
episodeNumber: number,
params?: { language?: string; append_to_response?: string }
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
{ params }
)
return response.data
}

// Get TV Episode Account States
export const getTvEpisodeAccountStates = async (
seriesId: number,
seasonNumber: number,
episodeNumber: number,
sessionId: string
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/account_states`,
{ params: { session_id: sessionId } }
)
return response.data
}

// Get TV Episode Changes
export const getTvEpisodeChanges = async (
episodeId: number,
params?: { start_date?: string; end_date?: string; page?: number }
) => {
const response = await api.get(`/tv/episode/${episodeId}/changes`, { params })
return response.data
}

// Get TV Episode Credits
export const getTvEpisodeCredits = async (
seriesId: number,
seasonNumber: number,
episodeNumber: number,
language?: string
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits`,
{ params: { language } }
)
return response.data
}

// Get TV Episode External IDs
export const getTvEpisodeExternalIds = async (
seriesId: number,
seasonNumber: number,
episodeNumber: number
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/external_ids`
)
return response.data
}

// Get TV Episode Images
export const getTvEpisodeImages = async (
seriesId: number,
seasonNumber: number,
episodeNumber: number,
params?: { language?: string; include_image_language?: string }
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/images`,
{ params }
)
return response.data
}

// Get TV Episode Translations
export const getTvEpisodeTranslations = async (
seriesId: number,
seasonNumber: number,
episodeNumber: number
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/translations`
)
return response.data
}

// Get TV Episode Videos
export const getTvEpisodeVideos = async (
seriesId: number,
seasonNumber: number,
episodeNumber: number,
params?: { language?: string; include_video_language?: string }
) => {
const response = await api.get(
`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/videos`,
{ params }
)
return response.data
}

// Rate TV Episode
export const rateTvEpisode = async (
seriesId: number,
seasonNumber: number,
episodeNumber: number,
sessionId: string,
value: number
) => {
const response = await api.post(
`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/rating`,
{ value },
{ params: { session_id: sessionId } }
)
return response.data
}

// Delete TV Episode Rating
export const deleteTvEpisodeRating = async (
seriesId: number,
seasonNumber: number,
episodeNumber: number,
sessionId: string
) => {
const response = await api.delete(
`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/rating`,
{ params: { session_id: sessionId } }
)
return response.data
}
