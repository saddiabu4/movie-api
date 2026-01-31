import api from "@/api/api"

// Get TV Episode Group Details
export const getTvEpisodeGroupDetails = async (episodeGroupId: string) => {
const response = await api.get(`/tv/episode_group/${episodeGroupId}`)
return response.data
}
