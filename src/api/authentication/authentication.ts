import api from "@/api/api"

// Create Guest Session
export const createGuestSession = async () => {
const response = await api.get("/authentication/guest_session/new")
return response.data
}

// Create Request Token
export const createRequestToken = async () => {
const response = await api.get("/authentication/token/new")
return response.data
}

// Create Session
export const createSession = async (requestToken: string) => {
const response = await api.post("/authentication/session/new", {
request_token: requestToken,
})
return response.data
}

// Create Session (with login)
export const createSessionWithLogin = async (
username: string,
password: string,
requestToken: string
) => {
const response = await api.post(
"/authentication/token/validate_with_login",
{
username,
password,
request_token: requestToken,
}
)
return response.data
}

// Delete Session
export const deleteSession = async (sessionId: string) => {
const response = await api.delete("/authentication/session", {
data: { session_id: sessionId },
})
return response.data
}

// Validate Key
export const validateKey = async () => {
const response = await api.get("/authentication")
return response.data
}
