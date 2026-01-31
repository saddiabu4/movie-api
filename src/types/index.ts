// Movie Types
interface Movie {
	id: number
	title: string
	original_title: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null
	release_date: string
	vote_average: number
	vote_count: number
	popularity: number
	adult: boolean
	genre_ids: number[]
	original_language: string
	video: boolean
}

interface MovieDetails extends Movie {
	budget: number
	genres: Genre[]
	homepage: string
	imdb_id: string
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	revenue: number
	runtime: number
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string
}

// TV Series Types
interface TvSeries {
	id: number
	name: string
	original_name: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null
	first_air_date: string
	vote_average: number
	vote_count: number
	popularity: number
	adult: boolean
	genre_ids: number[]
	origin_country: string[]
	original_language: string
}

interface TvSeriesDetails extends TvSeries {
	created_by: Creator[]
	episode_run_time: number[]
	genres: Genre[]
	homepage: string
	in_production: boolean
	languages: string[]
	last_air_date: string
	last_episode_to_air: Episode | null
	next_episode_to_air: Episode | null
	networks: Network[]
	number_of_episodes: number
	number_of_seasons: number
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	seasons: Season[]
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string
	type: string
}

// Person Types
interface Person {
	id: number
	name: string
	original_name: string
	profile_path: string | null
	adult: boolean
	popularity: number
	gender: number
	known_for_department: string
	known_for: (Movie | TvSeries)[]
}

interface PersonDetails extends Person {
	also_known_as: string[]
	biography: string
	birthday: string | null
	deathday: string | null
	homepage: string | null
	imdb_id: string
	place_of_birth: string | null
}

// Supporting Types
interface Genre {
	id: number
	name: string
}

interface ProductionCompany {
	id: number
	logo_path: string | null
	name: string
	origin_country: string
}

interface ProductionCountry {
	iso_3166_1: string
	name: string
}

interface SpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}

interface Creator {
	id: number
	credit_id: string
	name: string
	gender: number
	profile_path: string | null
}

interface Episode {
	id: number
	name: string
	overview: string
	vote_average: number
	vote_count: number
	air_date: string
	episode_number: number
	production_code: string
	runtime: number | null
	season_number: number
	show_id: number
	still_path: string | null
}

interface Season {
	air_date: string
	episode_count: number
	id: number
	name: string
	overview: string
	poster_path: string | null
	season_number: number
	vote_average: number
}

interface Network {
	id: number
	logo_path: string | null
	name: string
	origin_country: string
}

// Cast & Crew Types
interface Cast {
	id: number
	name: string
	original_name: string
	profile_path: string | null
	character: string
	credit_id: string
	order: number
	gender: number
	known_for_department: string
	popularity: number
	adult: boolean
	cast_id?: number
}

interface Crew {
	id: number
	name: string
	original_name: string
	profile_path: string | null
	credit_id: string
	department: string
	job: string
	gender: number
	known_for_department: string
	popularity: number
	adult: boolean
}

interface Credits {
	id: number
	cast: Cast[]
	crew: Crew[]
}

// Video Types
interface Video {
	id: string
	iso_639_1: string
	iso_3166_1: string
	key: string
	name: string
	official: boolean
	published_at: string
	site: string
	size: number
	type: string
}

// Response Types
interface PaginatedResponse<T> {
	page: number
	results: T[]
	total_pages: number
	total_results: number
}

// Multi Search Result
interface MultiSearchResult {
	id: number
	media_type: "movie" | "tv" | "person"
	name?: string
	title?: string
	poster_path?: string | null
	profile_path?: string | null
	backdrop_path?: string | null
	overview?: string
	vote_average?: number
	release_date?: string
	first_air_date?: string
}

// Export all types
export type {
	Cast,
	Creator,
	Credits,
	Crew,
	Episode,
	Genre,
	Movie,
	MovieDetails,
	MultiSearchResult,
	Network,
	PaginatedResponse,
	Person,
	PersonDetails,
	ProductionCompany,
	ProductionCountry,
	Season,
	SpokenLanguage,
	TvSeries,
	TvSeriesDetails,
	Video,
}
