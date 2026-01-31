import api from "@/api/api"

// Get Guest Session Rated Movies
export const getGuestSessionRatedMovies = async (
guestSessionId: string,
params?: { language?: string; page?: number; sort_by?: string }
) => {
const response = await api.get(
`/guest_session/${guestSessionId}/rated/movies`,
{ params }
)
return response.data
}

// Get Guest Session Rated TV Shows
export const getGuestSessionRatedTv = async (
guestSessionId: string,
params?: { language?: string; page?: number; sort_by?: string }
) => {
const response = await api.get(`/guest_session/${guestSessionId}/rated/tv`, {
params,
})
return response.data
}

// Get Guest Session Rated TV Episodes
export const getGuestSessionRatedTvEpisodes = async (
guestSessionId: string,
params?: { language?: string; page?: number; sort_by?: string }
) => {
const response = await api.get(
`/guest_session/${guestSessionId}/rated/tv/episodes`,
{ params }
)
return response.data
}
