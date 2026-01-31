import api from "@/api/api"

// Get API Configuration
export const getAPIConfiguration = async () => {
const response = await api.get("/configuration")
return response.data
}

// Get Countries
export const getCountries = async () => {
const response = await api.get("/configuration/countries")
return response.data
}

// Get Jobs
export const getJobs = async () => {
const response = await api.get("/configuration/jobs")
return response.data
}

// Get Languages
export const getLanguages = async () => {
const response = await api.get("/configuration/languages")
return response.data
}

// Get Primary Translations
export const getPrimaryTranslations = async () => {
const response = await api.get("/configuration/primary_translations")
return response.data
}

// Get Timezones
export const getTimezones = async () => {
const response = await api.get("/configuration/timezones")
return response.data
}
