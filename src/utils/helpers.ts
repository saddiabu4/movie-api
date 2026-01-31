// TMDB Image URL helpers
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export const getImageUrl = (
path: string | null,
size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500"
): string => {
if (!path) return "https://via.placeholder.com/500x750?text=No+Image"
return `${IMAGE_BASE_URL}/${size}${path}`
}

export const getBackdropUrl = (
path: string | null,
size: "w300" | "w780" | "w1280" | "original" = "w1280"
): string => {
if (!path) return "https://via.placeholder.com/1280x720?text=No+Image"
return `${IMAGE_BASE_URL}/${size}${path}`
}

export const getProfileUrl = (
path: string | null,
size: "w45" | "w185" | "h632" | "original" = "w185"
): string => {
if (!path) return "https://via.placeholder.com/185x278?text=No+Image"
return `${IMAGE_BASE_URL}/${size}${path}`
}

// Format date
export const formatDate = (date: string): string => {
if (!date) return "N/A"
return new Date(date).toLocaleDateString("en-US", {
year: "numeric",
month: "long",
day: "numeric",
})
}

// Format year
export const formatYear = (date: string): string => {
if (!date) return "N/A"
return new Date(date).getFullYear().toString()
}

// Format runtime
export const formatRuntime = (minutes: number): string => {
if (!minutes) return "N/A"
const hours = Math.floor(minutes / 60)
const mins = minutes % 60
return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

// Format vote average
export const formatRating = (rating: number): string => {
return rating.toFixed(1)
}

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
if (!text) return ""
if (text.length <= maxLength) return text
return text.slice(0, maxLength) + "..."
}
