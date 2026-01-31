import api from "@/api/api"

// Create List
export const createList = async (
sessionId: string,
name: string,
description: string,
language?: string
) => {
const response = await api.post(
"/list",
{ name, description, language },
{ params: { session_id: sessionId } }
)
return response.data
}

// Get List Details
export const getListDetails = async (listId: number, language?: string) => {
const response = await api.get(`/list/${listId}`, {
params: { language },
})
return response.data
}

// Delete List
export const deleteList = async (listId: number, sessionId: string) => {
const response = await api.delete(`/list/${listId}`, {
params: { session_id: sessionId },
})
return response.data
}

// Add Movie to List
export const addMovieToList = async (
listId: number,
sessionId: string,
mediaId: number
) => {
const response = await api.post(
`/list/${listId}/add_item`,
{ media_id: mediaId },
{ params: { session_id: sessionId } }
)
return response.data
}

// Remove Movie from List
export const removeMovieFromList = async (
listId: number,
sessionId: string,
mediaId: number
) => {
const response = await api.post(
`/list/${listId}/remove_item`,
{ media_id: mediaId },
{ params: { session_id: sessionId } }
)
return response.data
}

// Clear List
export const clearList = async (listId: number, sessionId: string) => {
const response = await api.post(
`/list/${listId}/clear`,
{},
{ params: { session_id: sessionId, confirm: true } }
)
return response.data
}

// Check Item Status
export const checkItemStatus = async (listId: number, movieId: number) => {
const response = await api.get(`/list/${listId}/item_status`, {
params: { movie_id: movieId },
})
return response.data
}
