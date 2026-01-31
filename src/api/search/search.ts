import api from "@/api/api"

// Search Collections
export const searchCollections = async (
query: string,
params?: { language?: string; page?: number; region?: string }
) => {
const response = await api.get("/search/collection", {
params: { query, ...params },
})
return response.data
}

// Search Companies
export const searchCompanies = async (
query: string,
params?: { page?: number }
) => {
const response = await api.get("/search/company", {
params: { query, ...params },
})
return response.data
}

// Search Keywords
export const searchKeywords = async (
query: string,
params?: { page?: number }
) => {
const response = await api.get("/search/keyword", {
params: { query, ...params },
})
return response.data
}

// Search Movies
export const searchMovies = async (
query: string,
params?: {
language?: string
page?: number
include_adult?: boolean
region?: string
year?: number
primary_release_year?: number
}
) => {
const response = await api.get("/search/movie", {
params: { query, ...params },
})
return response.data
}

// Multi Search
export const multiSearch = async (
query: string,
params?: { language?: string; page?: number; include_adult?: boolean }
) => {
const response = await api.get("/search/multi", {
params: { query, ...params },
})
return response.data
}

// Search People
export const searchPeople = async (
query: string,
params?: { language?: string; page?: number; include_adult?: boolean }
) => {
const response = await api.get("/search/person", {
params: { query, ...params },
})
return response.data
}

// Search TV Shows
export const searchTv = async (
query: string,
params?: {
language?: string
page?: number
include_adult?: boolean
first_air_date_year?: number
year?: number
}
) => {
const response = await api.get("/search/tv", {
params: { query, ...params },
})
return response.data
}
