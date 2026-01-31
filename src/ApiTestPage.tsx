import { useState } from "react"

// Authentication
import {
	createGuestSession,
	createRequestToken,
	validateKey,
} from "@/api/authentication/authentication"

// Changes
import {
	getMovieChangeList,
	getPersonChangeList,
	getTvChangeList,
} from "@/api/changes/changes"

// Collections
import {
	getCollectionDetails,
	getCollectionImages,
	getCollectionTranslations,
} from "@/api/collections/collections"

// Companies
import {
	getCompanyAlternativeNames,
	getCompanyDetails,
	getCompanyImages,
} from "@/api/companies/companies"

// Configuration
import {
	getAPIConfiguration,
	getCountries,
	getJobs,
	getLanguages,
	getPrimaryTranslations,
	getTimezones,
} from "@/api/configuration/configuration"

// Credits
import { getCreditDetails } from "@/api/credits/credits"

// Find
import { findByExternalId } from "@/api/find/find"

// Genres
import { getMovieGenres, getTvGenres } from "@/api/genres/genres"

// Keywords
import { getKeywordDetails } from "@/api/keyvwords/keywords"

// Movie Lists
import {
	getNowPlayingMovies,
	getPopularMovies,
	getTopRatedMovies,
	getUpcomingMovies,
} from "@/api/movie-lists/movie-lists"

// Movies
import {
	getLatestMovie,
	getMovieCredits,
	getMovieDetails,
	getMovieExternalIds,
	getMovieImages,
	getMovieKeywords,
	getMovieRecommendations,
	getMovieReviews,
	getMovieVideos,
	getMovieWatchProviders,
	getSimilarMovies,
} from "@/api/movies/movies"

// Networks
import {
	getNetworkAlternativeNames,
	getNetworkDetails,
	getNetworkImages,
} from "@/api/networks/networks"

// People
import {
	getLatestPerson,
	getPersonCombinedCredits,
	getPersonDetails,
	getPersonExternalIds,
	getPersonImages,
} from "@/api/people/people"

// People Lists
import { getPopularPeople } from "@/api/people-lists/people-lists"

// Reviews
import { getReviewDetails } from "@/api/reviews/reviews"

// Search
import {
	multiSearch,
	searchMovies,
	searchPeople,
	searchTv,
} from "@/api/search/search"

// Trending
import {
	getTrendingAll,
	getTrendingMovies,
	getTrendingPeople,
	getTrendingTv,
} from "@/api/trending/trending"

// TV Episodes
import {
	getTvEpisodeCredits,
	getTvEpisodeDetails,
	getTvEpisodeImages,
} from "@/api/tv-episodes/tv-episodes"

// TV Seasons
import {
	getTvSeasonCredits,
	getTvSeasonDetails,
	getTvSeasonImages,
} from "@/api/tv-seasons/tv-seasons"

// TV Series
import {
	getLatestTvSeries,
	getSimilarTvSeries,
	getTvSeriesCredits,
	getTvSeriesDetails,
	getTvSeriesImages,
	getTvSeriesRecommendations,
	getTvSeriesReviews,
	getTvSeriesVideos,
} from "@/api/tv-series/tv-series"

// TV Series Lists
import {
	getAiringTodayTv,
	getOnTheAirTv,
	getPopularTv,
	getTopRatedTv,
} from "@/api/tv-series-lists/tv-series-lists"

// Watch Providers
import {
	getAvailableRegions,
	getMovieWatchProvidersList,
	getTvWatchProvidersList,
} from "@/api/watch-providers/watch-providers"

interface ApiTest {
	name: string
	category: string
	fn: () => Promise<unknown>
}

const apiTests: ApiTest[] = [
	// Authentication
	{ name: "Validate API Key", category: "Authentication", fn: validateKey },
	{
		name: "Create Guest Session",
		category: "Authentication",
		fn: createGuestSession,
	},
	{
		name: "Create Request Token",
		category: "Authentication",
		fn: createRequestToken,
	},

	// Configuration
	{
		name: "Get API Configuration",
		category: "Configuration",
		fn: getAPIConfiguration,
	},
	{ name: "Get Countries", category: "Configuration", fn: getCountries },
	{ name: "Get Jobs", category: "Configuration", fn: getJobs },
	{ name: "Get Languages", category: "Configuration", fn: getLanguages },
	{
		name: "Get Primary Translations",
		category: "Configuration",
		fn: getPrimaryTranslations,
	},
	{ name: "Get Timezones", category: "Configuration", fn: getTimezones },

	// Genres
	{ name: "Get Movie Genres", category: "Genres", fn: getMovieGenres },
	{ name: "Get TV Genres", category: "Genres", fn: getTvGenres },

	// Movie Lists
	{
		name: "Get Now Playing Movies",
		category: "Movie Lists",
		fn: getNowPlayingMovies,
	},
	{ name: "Get Popular Movies", category: "Movie Lists", fn: getPopularMovies },
	{
		name: "Get Top Rated Movies",
		category: "Movie Lists",
		fn: getTopRatedMovies,
	},
	{
		name: "Get Upcoming Movies",
		category: "Movie Lists",
		fn: getUpcomingMovies,
	},

	// Movies
	{
		name: "Get Movie Details (550)",
		category: "Movies",
		fn: () => getMovieDetails(550),
	},
	{
		name: "Get Movie Credits (550)",
		category: "Movies",
		fn: () => getMovieCredits(550),
	},
	{
		name: "Get Movie Images (550)",
		category: "Movies",
		fn: () => getMovieImages(550),
	},
	{
		name: "Get Movie Videos (550)",
		category: "Movies",
		fn: () => getMovieVideos(550),
	},
	{
		name: "Get Movie Recommendations (550)",
		category: "Movies",
		fn: () => getMovieRecommendations(550),
	},
	{
		name: "Get Similar Movies (550)",
		category: "Movies",
		fn: () => getSimilarMovies(550),
	},
	{
		name: "Get Movie Reviews (550)",
		category: "Movies",
		fn: () => getMovieReviews(550),
	},
	{
		name: "Get Movie Keywords (550)",
		category: "Movies",
		fn: () => getMovieKeywords(550),
	},
	{
		name: "Get Movie External IDs (550)",
		category: "Movies",
		fn: () => getMovieExternalIds(550),
	},
	{
		name: "Get Movie Watch Providers (550)",
		category: "Movies",
		fn: () => getMovieWatchProviders(550),
	},
	{ name: "Get Latest Movie", category: "Movies", fn: getLatestMovie },

	// TV Series Lists
	{ name: "Get Airing Today TV", category: "TV Lists", fn: getAiringTodayTv },
	{ name: "Get On The Air TV", category: "TV Lists", fn: getOnTheAirTv },
	{ name: "Get Popular TV", category: "TV Lists", fn: getPopularTv },
	{ name: "Get Top Rated TV", category: "TV Lists", fn: getTopRatedTv },

	// TV Series
	{
		name: "Get TV Series Details (1399)",
		category: "TV Series",
		fn: () => getTvSeriesDetails(1399),
	},
	{
		name: "Get TV Series Credits (1399)",
		category: "TV Series",
		fn: () => getTvSeriesCredits(1399),
	},
	{
		name: "Get TV Series Images (1399)",
		category: "TV Series",
		fn: () => getTvSeriesImages(1399),
	},
	{
		name: "Get TV Series Videos (1399)",
		category: "TV Series",
		fn: () => getTvSeriesVideos(1399),
	},
	{
		name: "Get TV Series Recommendations (1399)",
		category: "TV Series",
		fn: () => getTvSeriesRecommendations(1399),
	},
	{
		name: "Get Similar TV Series (1399)",
		category: "TV Series",
		fn: () => getSimilarTvSeries(1399),
	},
	{
		name: "Get TV Series Reviews (1399)",
		category: "TV Series",
		fn: () => getTvSeriesReviews(1399),
	},
	{
		name: "Get Latest TV Series",
		category: "TV Series",
		fn: getLatestTvSeries,
	},

	// TV Seasons
	{
		name: "Get TV Season Details (1399, S1)",
		category: "TV Seasons",
		fn: () => getTvSeasonDetails(1399, 1),
	},
	{
		name: "Get TV Season Credits (1399, S1)",
		category: "TV Seasons",
		fn: () => getTvSeasonCredits(1399, 1),
	},
	{
		name: "Get TV Season Images (1399, S1)",
		category: "TV Seasons",
		fn: () => getTvSeasonImages(1399, 1),
	},

	// TV Episodes
	{
		name: "Get TV Episode Details (1399, S1, E1)",
		category: "TV Episodes",
		fn: () => getTvEpisodeDetails(1399, 1, 1),
	},
	{
		name: "Get TV Episode Credits (1399, S1, E1)",
		category: "TV Episodes",
		fn: () => getTvEpisodeCredits(1399, 1, 1),
	},
	{
		name: "Get TV Episode Images (1399, S1, E1)",
		category: "TV Episodes",
		fn: () => getTvEpisodeImages(1399, 1, 1),
	},

	// People Lists
	{
		name: "Get Popular People",
		category: "People Lists",
		fn: getPopularPeople,
	},

	// People
	{
		name: "Get Person Details (287)",
		category: "People",
		fn: () => getPersonDetails(287),
	},
	{
		name: "Get Person Combined Credits (287)",
		category: "People",
		fn: () => getPersonCombinedCredits(287),
	},
	{
		name: "Get Person Images (287)",
		category: "People",
		fn: () => getPersonImages(287),
	},
	{
		name: "Get Person External IDs (287)",
		category: "People",
		fn: () => getPersonExternalIds(287),
	},
	{ name: "Get Latest Person", category: "People", fn: getLatestPerson },

	// Search
	{
		name: "Search Movies (Inception)",
		category: "Search",
		fn: () => searchMovies("Inception"),
	},
	{
		name: "Search TV (Breaking Bad)",
		category: "Search",
		fn: () => searchTv("Breaking Bad"),
	},
	{
		name: "Search People (Brad Pitt)",
		category: "Search",
		fn: () => searchPeople("Brad Pitt"),
	},
	{
		name: "Multi Search (Avatar)",
		category: "Search",
		fn: () => multiSearch("Avatar"),
	},

	// Trending
	{
		name: "Get Trending All (Day)",
		category: "Trending",
		fn: () => getTrendingAll("day"),
	},
	{
		name: "Get Trending Movies (Week)",
		category: "Trending",
		fn: () => getTrendingMovies("week"),
	},
	{
		name: "Get Trending TV (Day)",
		category: "Trending",
		fn: () => getTrendingTv("day"),
	},
	{
		name: "Get Trending People (Week)",
		category: "Trending",
		fn: () => getTrendingPeople("week"),
	},

	// Collections
	{
		name: "Get Collection Details (10)",
		category: "Collections",
		fn: () => getCollectionDetails(10),
	},
	{
		name: "Get Collection Images (10)",
		category: "Collections",
		fn: () => getCollectionImages(10),
	},
	{
		name: "Get Collection Translations (10)",
		category: "Collections",
		fn: () => getCollectionTranslations(10),
	},

	// Companies
	{
		name: "Get Company Details (1)",
		category: "Companies",
		fn: () => getCompanyDetails(1),
	},
	{
		name: "Get Company Alternative Names (1)",
		category: "Companies",
		fn: () => getCompanyAlternativeNames(1),
	},
	{
		name: "Get Company Images (1)",
		category: "Companies",
		fn: () => getCompanyImages(1),
	},

	// Networks
	{
		name: "Get Network Details (213)",
		category: "Networks",
		fn: () => getNetworkDetails(213),
	},
	{
		name: "Get Network Alternative Names (213)",
		category: "Networks",
		fn: () => getNetworkAlternativeNames(213),
	},
	{
		name: "Get Network Images (213)",
		category: "Networks",
		fn: () => getNetworkImages(213),
	},

	// Keywords
	{
		name: "Get Keyword Details (378)",
		category: "Keywords",
		fn: () => getKeywordDetails(378),
	},

	// Credits
	{
		name: "Get Credit Details",
		category: "Credits",
		fn: () => getCreditDetails("52542282760ee313280017f9"),
	},

	// Reviews
	{
		name: "Get Review Details",
		category: "Reviews",
		fn: () => getReviewDetails("5488c29bc3a3686f4a00004a"),
	},

	// Find
	{
		name: "Find by IMDB ID (tt0111161)",
		category: "Find",
		fn: () => findByExternalId("tt0111161", "imdb_id"),
	},

	// Changes
	{
		name: "Get Movie Change List",
		category: "Changes",
		fn: getMovieChangeList,
	},
	{ name: "Get TV Change List", category: "Changes", fn: getTvChangeList },
	{
		name: "Get Person Change List",
		category: "Changes",
		fn: getPersonChangeList,
	},

	// Watch Providers
	{
		name: "Get Available Regions",
		category: "Watch Providers",
		fn: getAvailableRegions,
	},
	{
		name: "Get Movie Watch Providers List",
		category: "Watch Providers",
		fn: getMovieWatchProvidersList,
	},
	{
		name: "Get TV Watch Providers List",
		category: "Watch Providers",
		fn: getTvWatchProvidersList,
	},
]

interface TestResult {
	name: string
	category: string
	status: "pending" | "success" | "error"
	data?: unknown
	error?: string
	time?: number
}

export default function ApiTestPage() {
	const [results, setResults] = useState<TestResult[]>([])
	const [isRunning, setIsRunning] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState<string>("all")
	const [expandedResult, setExpandedResult] = useState<string | null>(null)

	const categories = [
		"all",
		...Array.from(new Set(apiTests.map((t) => t.category))),
	]
	const filteredTests =
		selectedCategory === "all"
			? apiTests
			: apiTests.filter((t) => t.category === selectedCategory)

	const runAllTests = async () => {
		setIsRunning(true)
		setResults([])

		for (const test of filteredTests) {
			setResults((prev) => [
				...prev,
				{ name: test.name, category: test.category, status: "pending" },
			])
			const startTime = Date.now()
			try {
				const data = await test.fn()
				const endTime = Date.now()
				setResults((prev) =>
					prev.map((r) =>
						r.name === test.name
							? { ...r, status: "success", data, time: endTime - startTime }
							: r
					)
				)
			} catch (error) {
				const endTime = Date.now()
				setResults((prev) =>
					prev.map((r) =>
						r.name === test.name
							? {
									...r,
									status: "error",
									error:
										error instanceof Error ? error.message : "Unknown error",
									time: endTime - startTime,
							  }
							: r
					)
				)
			}
			await new Promise((resolve) => setTimeout(resolve, 100))
		}
		setIsRunning(false)
	}

	const runSingleTest = async (test: ApiTest) => {
		const existingIndex = results.findIndex((r) => r.name === test.name)
		if (existingIndex >= 0) {
			setResults((prev) =>
				prev.map((r, i) =>
					i === existingIndex
						? { ...r, status: "pending", data: undefined, error: undefined }
						: r
				)
			)
		} else {
			setResults((prev) => [
				...prev,
				{ name: test.name, category: test.category, status: "pending" },
			])
		}

		const startTime = Date.now()
		try {
			const data = await test.fn()
			const endTime = Date.now()
			setResults((prev) =>
				prev.map((r) =>
					r.name === test.name
						? { ...r, status: "success", data, time: endTime - startTime }
						: r
				)
			)
		} catch (error) {
			const endTime = Date.now()
			setResults((prev) =>
				prev.map((r) =>
					r.name === test.name
						? {
								...r,
								status: "error",
								error: error instanceof Error ? error.message : "Unknown error",
								time: endTime - startTime,
						  }
						: r
				)
			)
		}
	}

	const successCount = results.filter((r) => r.status === "success").length
	const errorCount = results.filter((r) => r.status === "error").length
	const pendingCount = results.filter((r) => r.status === "pending").length

	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: "#0f0f0f",
				color: "#fff",
				padding: "20px",
				fontFamily: "system-ui, -apple-system, sans-serif",
			}}
		>
			<div style={{ maxWidth: "1400px", margin: "0 auto" }}>
				<div
					style={{
						marginBottom: "30px",
						borderBottom: "1px solid #333",
						paddingBottom: "20px",
					}}
				>
					<h1
						style={{
							fontSize: "2.5rem",
							marginBottom: "10px",
							background: "linear-gradient(90deg, #e50914, #ff6b6b)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						🎬 TMDB API Test Suite
					</h1>
					<p style={{ color: "#888", fontSize: "1rem" }}>
						Test all TMDB API endpoints in one place
					</p>
				</div>

				<div
					style={{
						display: "flex",
						gap: "15px",
						marginBottom: "20px",
						flexWrap: "wrap",
						alignItems: "center",
					}}
				>
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						style={{
							padding: "12px 20px",
							borderRadius: "8px",
							border: "1px solid #333",
							backgroundColor: "#1a1a1a",
							color: "#fff",
							fontSize: "1rem",
							cursor: "pointer",
						}}
					>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat === "all" ? "📁 All Categories" : `📂 ${cat}`}
							</option>
						))}
					</select>
					<button
						onClick={runAllTests}
						disabled={isRunning}
						style={{
							padding: "12px 30px",
							borderRadius: "8px",
							border: "none",
							backgroundColor: isRunning ? "#333" : "#e50914",
							color: "#fff",
							fontSize: "1rem",
							fontWeight: "bold",
							cursor: isRunning ? "not-allowed" : "pointer",
						}}
					>
						{isRunning ? "⏳ Running..." : "🚀 Run All Tests"}
					</button>
					<button
						onClick={() => setResults([])}
						style={{
							padding: "12px 20px",
							borderRadius: "8px",
							border: "1px solid #333",
							backgroundColor: "transparent",
							color: "#fff",
							fontSize: "1rem",
							cursor: "pointer",
						}}
					>
						🗑️ Clear
					</button>
				</div>

				{results.length > 0 && (
					<div
						style={{
							display: "flex",
							gap: "20px",
							marginBottom: "20px",
							flexWrap: "wrap",
						}}
					>
						<div
							style={{
								padding: "15px 25px",
								borderRadius: "8px",
								backgroundColor: "#1a1a1a",
								border: "1px solid #333",
							}}
						>
							<span style={{ color: "#888" }}>Total: </span>
							<span style={{ fontWeight: "bold" }}>{results.length}</span>
						</div>
						<div
							style={{
								padding: "15px 25px",
								borderRadius: "8px",
								backgroundColor: "#0a2a0a",
								border: "1px solid #1a5a1a",
							}}
						>
							<span style={{ color: "#4ade80" }}>✅ Success: </span>
							<span style={{ fontWeight: "bold", color: "#4ade80" }}>
								{successCount}
							</span>
						</div>
						<div
							style={{
								padding: "15px 25px",
								borderRadius: "8px",
								backgroundColor: "#2a0a0a",
								border: "1px solid #5a1a1a",
							}}
						>
							<span style={{ color: "#f87171" }}>❌ Error: </span>
							<span style={{ fontWeight: "bold", color: "#f87171" }}>
								{errorCount}
							</span>
						</div>
						{pendingCount > 0 && (
							<div
								style={{
									padding: "15px 25px",
									borderRadius: "8px",
									backgroundColor: "#2a2a0a",
									border: "1px solid #5a5a1a",
								}}
							>
								<span style={{ color: "#fbbf24" }}>⏳ Pending: </span>
								<span style={{ fontWeight: "bold", color: "#fbbf24" }}>
									{pendingCount}
								</span>
							</div>
						)}
					</div>
				)}

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
						gap: "15px",
					}}
				>
					{filteredTests.map((test) => {
						const result = results.find((r) => r.name === test.name)
						const isExpanded = expandedResult === test.name
						return (
							<div
								key={test.name}
								style={{
									backgroundColor: "#1a1a1a",
									borderRadius: "12px",
									border: `1px solid ${
										result?.status === "success"
											? "#1a5a1a"
											: result?.status === "error"
											? "#5a1a1a"
											: "#333"
									}`,
									overflow: "hidden",
								}}
							>
								<div
									style={{
										padding: "15px 20px",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										borderBottom: isExpanded ? "1px solid #333" : "none",
									}}
								>
									<div>
										<div
											style={{
												fontSize: "0.75rem",
												color: "#888",
												marginBottom: "5px",
											}}
										>
											{test.category}
										</div>
										<div style={{ fontWeight: "500" }}>{test.name}</div>
										{result?.time && (
											<div style={{ fontSize: "0.75rem", color: "#666" }}>
												⏱️ {result.time}ms
											</div>
										)}
									</div>
									<div style={{ display: "flex", gap: "10px" }}>
										{result?.status === "success" && (
											<button
												onClick={() =>
													setExpandedResult(isExpanded ? null : test.name)
												}
												style={{
													padding: "8px 15px",
													borderRadius: "6px",
													border: "none",
													backgroundColor: "#333",
													color: "#fff",
													fontSize: "0.85rem",
													cursor: "pointer",
												}}
											>
												{isExpanded ? "🔼" : "🔽"}
											</button>
										)}
										<button
											onClick={() => runSingleTest(test)}
											disabled={result?.status === "pending"}
											style={{
												padding: "8px 15px",
												borderRadius: "6px",
												border: "none",
												backgroundColor:
													result?.status === "pending" ? "#333" : "#e50914",
												color: "#fff",
												fontSize: "0.85rem",
												cursor:
													result?.status === "pending"
														? "not-allowed"
														: "pointer",
											}}
										>
											{result?.status === "pending"
												? "⏳"
												: result?.status === "success"
												? "🔄"
												: result?.status === "error"
												? "🔄"
												: "▶️"}
										</button>
									</div>
								</div>
								{result?.status === "error" && (
									<div
										style={{
											padding: "15px 20px",
											backgroundColor: "#1a0a0a",
											color: "#f87171",
											fontSize: "0.85rem",
										}}
									>
										❌ {String(result.error)}
									</div>
								)}
								{isExpanded && result?.data !== undefined && (
									<div
										style={{
											padding: "15px 20px",
											backgroundColor: "#0a0a0a",
											maxHeight: "300px",
											overflow: "auto",
										}}
									>
										<pre
											style={{
												margin: 0,
												fontSize: "0.75rem",
												color: "#4ade80",
												whiteSpace: "pre-wrap",
												wordBreak: "break-word",
											}}
										>
											{JSON.stringify(result.data as object, null, 2)}
										</pre>
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
