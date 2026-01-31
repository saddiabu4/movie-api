import api from "@/api/api"

// Find by External ID
export const findByExternalId = async (
externalId: string,
externalSource: string,
language?: string
) => {
const response = await api.get(`/find/${externalId}`, {
params: {
external_source: externalSource,
language,
},
})
return response.data
}
