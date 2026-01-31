import {
	multiSearch,
	searchMovies,
	searchPeople,
	searchTv,
} from "@/api/search/search"
import {
	Footer,
	LoadingSpinner,
	MovieCard,
	Navbar,
	PersonCard,
} from "@/components"
import type { Movie, MultiSearchResult, Person, TvSeries } from "@/types"
import {
	ChevronLeft,
	ChevronRight,
	Film,
	Search,
	Tv,
	User,
	X,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

type SearchType = "multi" | "movie" | "tv" | "person"

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [query, setQuery] = useState(searchParams.get("q") || "")
	const [searchType, setSearchType] = useState<SearchType>("multi")
	const [results, setResults] = useState<MultiSearchResult[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [totalResults, setTotalResults] = useState(0)

	const searchTypes: {
		key: SearchType
		label: string
		icon: React.ReactNode
		color: string
	}[] = [
		{ key: "multi", label: "All", icon: <Search size={16} />, color: "red" },
		{ key: "movie", label: "Movies", icon: <Film size={16} />, color: "red" },
		{ key: "tv", label: "TV Shows", icon: <Tv size={16} />, color: "purple" },
		{ key: "person", label: "People", icon: <User size={16} />, color: "blue" },
	]

	const performSearch = useCallback(async () => {
		if (!query.trim()) {
			setResults([])
			return
		}

		try {
			setIsLoading(true)
			let response

			switch (searchType) {
				case "movie":
					response = await searchMovies(query, { page })
					break
				case "tv":
					response = await searchTv(query, { page })
					break
				case "person":
					response = await searchPeople(query, { page })
					break
				default:
					response = await multiSearch(query, { page })
			}

			setResults(response?.results || [])
			setTotalPages(response?.total_pages || 1)
			setTotalResults(response?.total_results || 0)
		} catch (error) {
			console.error("Search error:", error)
		} finally {
			setIsLoading(false)
		}
	}, [query, searchType, page])

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			performSearch()
		}, 500)

		return () => clearTimeout(timeoutId)
	}, [performSearch])

	useEffect(() => {
		if (query) {
			setSearchParams({ q: query })
		} else {
			setSearchParams({})
		}
	}, [query, setSearchParams])

	const handleTypeChange = (type: SearchType) => {
		setSearchType(type)
		setPage(1)
	}

	const clearSearch = () => {
		setQuery("")
		setResults([])
	}

	const renderResultItem = (item: MultiSearchResult) => {
		const mediaType = item.media_type || searchType

		if (mediaType === "person") {
			return <PersonCard key={item.id} person={item as unknown as Person} />
		}

		return (
			<MovieCard
				key={item.id}
				item={item as unknown as Movie | TvSeries}
				type={mediaType === "tv" ? "tv" : "movie"}
			/>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-950 to-black'>
			<Navbar />

			{/* Search Header */}
			<div className='relative pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden'>
				{/* Background Pattern */}
				<div className='absolute inset-0 opacity-30'>
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,9,20,0.1),transparent_50%)]' />
				</div>

				<div className='relative max-w-4xl mx-auto px-4 md:px-8'>
					{/* Page Title */}
					<div className='text-center mb-8'>
						<h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3'>
							Search
						</h1>
						<p className='text-gray-400'>Find movies, TV shows, and people</p>
					</div>

					{/* Search Input */}
					<div className='relative max-w-2xl mx-auto mb-8'>
						<div className='relative group'>
							<Search
								size={22}
								className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors'
							/>
							<input
								type='text'
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder='Search for movies, TV shows, people...'
								className='w-full pl-14 pr-14 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-300'
								autoFocus
							/>
							{query && (
								<button
									onClick={clearSearch}
									className='absolute right-5 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all'
								>
									<X size={20} />
								</button>
							)}
						</div>

						{/* Search hints */}
						{!query && (
							<div className='flex flex-wrap justify-center gap-2 mt-4'>
								{["Action", "Comedy", "Drama", "Sci-Fi"].map((hint) => (
									<button
										key={hint}
										onClick={() => setQuery(hint)}
										className='px-4 py-2 bg-white/5 text-gray-400 text-sm rounded-full hover:bg-white/10 hover:text-white transition-all'
									>
										{hint}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Search Type Tabs */}
					<div className='flex justify-center flex-wrap gap-2 md:gap-3'>
						{searchTypes.map((type) => (
							<button
								key={type.key}
								onClick={() => handleTypeChange(type.key)}
								className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
									searchType === type.key
										? `bg-${type.color}-600 text-white shadow-lg shadow-${type.color}-600/30`
										: "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
								}`}
							>
								{type.icon}
								{type.label}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Results */}
			<div className='max-w-7xl mx-auto px-4 md:px-8 pb-12'>
				{/* Results Count */}
				{query && !isLoading && (
					<div className='mb-6'>
						<p className='text-gray-400'>
							{totalResults > 0 ? (
								<>
									Found{" "}
									<span className='text-white font-semibold'>
										{totalResults.toLocaleString()}
									</span>{" "}
									results for <span className='text-red-400'>"{query}"</span>
								</>
							) : (
								<>
									No results found for{" "}
									<span className='text-red-400'>"{query}"</span>
								</>
							)}
						</p>
					</div>
				)}

				{isLoading ? (
					<LoadingSpinner />
				) : (
					<>
						{results.length > 0 ? (
							<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
								{results.map((item, index) => (
									<div
										key={item.id}
										className='animate-fade-in'
										style={{ animationDelay: `${index * 0.05}s` }}
									>
										{renderResultItem(item)}
									</div>
								))}
							</div>
						) : query ? (
							<div className='text-center py-20'>
								<div className='w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center'>
									<Search size={48} className='text-gray-600' />
								</div>
								<h3 className='text-white text-2xl font-bold mb-3'>
									No results found
								</h3>
								<p className='text-gray-400 max-w-md mx-auto'>
									We couldn't find anything matching your search. Try different
									keywords or check your spelling.
								</p>
							</div>
						) : (
							<div className='text-center py-20'>
								<div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-600/20 to-purple-600/20 rounded-full flex items-center justify-center animate-pulse'>
									<Search size={48} className='text-red-500' />
								</div>
								<h3 className='text-white text-2xl font-bold mb-3'>
									Start your search
								</h3>
								<p className='text-gray-400 max-w-md mx-auto'>
									Discover your favorite movies, TV shows, and actors
								</p>
							</div>
						)}

						{/* Pagination */}
						{results.length > 0 && totalPages > 1 && (
							<div className='flex justify-center items-center gap-4 mt-12'>
								<button
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									disabled={page === 1}
									className='flex items-center gap-2 px-5 py-3 bg-white/5 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all duration-300 border border-white/10'
								>
									<ChevronLeft size={18} />
									<span className='hidden sm:inline'>Previous</span>
								</button>

								<div className='flex items-center gap-2'>
									{[...Array(Math.min(5, totalPages))].map((_, i) => {
										const pageNum =
											Math.max(1, Math.min(page - 2 + i, totalPages - 4)) + i
										if (pageNum > totalPages || pageNum < 1) return null
										return (
											<button
												key={pageNum}
												onClick={() => setPage(pageNum)}
												className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
													page === pageNum
														? "bg-red-600 text-white"
														: "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
												}`}
											>
												{pageNum}
											</button>
										)
									})}
								</div>

								<button
									onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
									disabled={page >= totalPages}
									className='flex items-center gap-2 px-5 py-3 bg-white/5 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all duration-300 border border-white/10'
								>
									<span className='hidden sm:inline'>Next</span>
									<ChevronRight size={18} />
								</button>
							</div>
						)}
					</>
				)}
			</div>

			<Footer />
		</div>
	)
}

export default SearchPage
