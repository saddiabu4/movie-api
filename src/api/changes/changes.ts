import api from "@/api/api"

// Get Movie Change List
export const getMovieChangeList = async (params?: {
start_date?: string
end_date?: string
page?: number
}) => {
const response = await api.get("/movie/changes", { params })
return response.data
}

// Get TV Change List
export const getTvChangeList = async (params?: {
start_date?: string
end_date?: string
page?: number
}) => {
const response = await api.get("/tv/changes", { params })
return response.data
}

// Get Person Change List
export const getPersonChangeList = async (params?: {
start_date?: string
end_date?: string
page?: number
}) => {
const response = await api.get("/person/changes", { params })
return response.data
}
