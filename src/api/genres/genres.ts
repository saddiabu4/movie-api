import api from "@/api/api"

// Get Movie Genres
export const getMovieGenres = async (language?: string) => {
const response = await api.get("/genre/movie/list", {
params: { language },
})
return response.data
}

// Get TV Genres
export const getTvGenres = async (language?: string) => {
const response = await api.get("/genre/tv/list", {
params: { language },
})
return response.data
}
