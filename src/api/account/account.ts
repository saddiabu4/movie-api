import api from "@/api/api"

export const getAccountDetails = async (accountId: string) => {
	try {
		const response = await api.get(`/account/${accountId}`)
		return response.data
	} catch (error) {
		console.error("Error fetching account details:", error)
		throw error
	}
}

export const toggleFavoriteMovie = async (
	accountId: string,
	sessionId: string,
	movieId: number,
	favorite: boolean
) => {
	const response = await api.post(
		`/account/${accountId}/favorite`,
		{
			media_type: "movie",
			media_id: movieId,
			favorite,
		},
		{
			params: {
				session_id: sessionId,
			},
		}
	)

	return response.data
}

export const getAccountFavoriteMovies = async (
	accountId: string,
	sessionId: string
) => {
	const response = await api.get(`/account/${accountId}/favorite/movies`, {
		params: {
			session_id: sessionId,
		},
	})

	return response.data
}
