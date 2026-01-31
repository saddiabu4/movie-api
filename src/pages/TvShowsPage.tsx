import { getTvGenres } from "@/api/genres/genres"
import {
	getAiringTodayTv,
	getOnTheAirTv,
	getPopularTv,
	getTopRatedTv,
} from "@/api/tv-series-lists/tv-series-lists"
import { Footer, LoadingSpinner, MovieCard, Navbar } from "@/components"
import type { Genre, TvSeries } from "@/types"
import { ChevronLeft, ChevronRight, Flame, Radio, Star, Tv } from "lucide-react"
import { useEffect, useState } from "react"

type FilterType = "popular" | "airing_today" | "on_the_air" | "top_rated"

const TvShowsPage = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [tvShows, setTvShows] = useState<TvSeries[]>([])
	const [genres, setGenres] = useState<Genre[]>([])
	const [activeFilter, setActiveFilter] = useState<FilterType>("popular")
	const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	const filters: { key: FilterType; label: string; icon: React.ReactNode }[] = [
		{ key: "popular", label: "Popular", icon: <Flame size={16} /> },
		{ key: "airing_today", label: "Airing Today", icon: <Radio size={16} /> },
		{ key: "on_the_air", label: "On The Air", icon: <Tv size={16} /> },
		{ key: "top_rated", label: "Top Rated", icon: <Star size={16} /> },
	]

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const res = await getTvGenres()
				setGenres(res.genres)
			} catch (error) {
				console.error("Error fetching genres:", error)
			}
		}
		fetchGenres()
	}, [])

	useEffect(() => {
		const fetchTvShows = async () => {
			try {
				setIsLoading(true)
				let response

				switch (activeFilter) {
					case "airing_today":
						response = await getAiringTodayTv({ page })
						break
					case "on_the_air":
						response = await getOnTheAirTv({ page })
						break
					case "top_rated":
						response = await getTopRatedTv({ page })
						break
					default:
						response = await getPopularTv({ page })
				}

				let filteredShows = response.results
				if (selectedGenre) {
					filteredShows = filteredShows.filter((show: TvSeries) =>
						show.genre_ids.includes(selectedGenre)
					)
				}

				setTvShows(filteredShows)
				setTotalPages(response.total_pages)
			} catch (error) {
				console.error("Error fetching TV shows:", error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchTvShows()
	}, [activeFilter, selectedGenre, page])

	const handleFilterChange = (filter: FilterType) => {
		setActiveFilter(filter)
		setPage(1)
	}

	const handleGenreChange = (genreId: number | null) => {
		setSelectedGenre(genreId)
		setPage(1)
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-950 to-black'>
			<Navbar />

			{/* Hero Header */}
			<div className='relative pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden'>
				{/* Background Pattern */}
				<div className='absolute inset-0 opacity-30'>
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.15),transparent_50%)]' />
				</div>

				<div className='relative max-w-7xl mx-auto px-4 md:px-8'>
					{/* Page Title */}
					<div className='flex items-center gap-4 mb-8'>
						<div className='p-3 bg-purple-600/20 rounded-2xl'>
							<Tv size={32} className='text-purple-500' />
						</div>
						<div>
							<h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-white'>
								TV Shows
							</h1>
							<p className='text-gray-400 mt-1'>
								Explore popular series and binge-worthy content
							</p>
						</div>
					</div>

					{/* Filter Tabs */}
					<div className='flex flex-wrap gap-2 md:gap-3 mb-6'>
						{filters.map((filter) => (
							<button
								key={filter.key}
								onClick={() => handleFilterChange(filter.key)}
								className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
									activeFilter === filter.key
										? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
										: "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
								}`}
							>
								{filter.icon}
								<span className='hidden sm:inline'>{filter.label}</span>
								<span className='sm:hidden'>{filter.label.split(" ")[0]}</span>
							</button>
						))}
					</div>

					{/* Genre Filter */}
					<div className='relative'>
						<div className='flex gap-2 overflow-x-auto pb-4 scrollbar-hide'>
							<button
								onClick={() => handleGenreChange(null)}
								className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
									selectedGenre === null
										? "bg-white text-black shadow-lg"
										: "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
								}`}
							>
								All Genres
							</button>
							{genres.map((genre) => (
								<button
									key={genre.id}
									onClick={() => handleGenreChange(genre.id)}
									className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
										selectedGenre === genre.id
											? "bg-white text-black shadow-lg"
											: "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
									}`}
								>
									{genre.name}
								</button>
							))}
						</div>
						{/* Gradient fade on edges */}
						<div className='absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-gray-950 to-transparent pointer-events-none' />
					</div>
				</div>
			</div>

			{/* TV Shows Grid */}
			<div className='max-w-7xl mx-auto px-4 md:px-8 pb-12'>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<>
						{/* Results Count */}
						<div className='flex items-center justify-between mb-6'>
							<p className='text-gray-400 text-sm'>
								Showing{" "}
								<span className='text-white font-semibold'>
									{tvShows.length}
								</span>{" "}
								results
							</p>
							<p className='text-gray-500 text-sm'>
								Page {page} of {Math.min(totalPages, 500)}
							</p>
						</div>

						{/* Grid */}
						<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
							{tvShows.map((show, index) => (
								<div
									key={show.id}
									className='animate-fade-in'
									style={{ animationDelay: `${index * 0.05}s` }}
								>
									<MovieCard item={show} type='tv' />
								</div>
							))}
						</div>

						{/* Empty State */}
						{tvShows.length === 0 && (
							<div className='text-center py-20'>
								<div className='w-20 h-20 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center'>
									<Tv size={40} className='text-gray-600' />
								</div>
								<h3 className='text-white text-xl font-semibold mb-2'>
									No TV shows found
								</h3>
								<p className='text-gray-400'>Try adjusting your filters</p>
							</div>
						)}

						{/* Pagination */}
						{totalPages > 1 && tvShows.length > 0 && (
							<div className='flex justify-center items-center gap-4 mt-12'>
								<button
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									disabled={page === 1}
									className='flex items-center gap-2 px-5 py-3 bg-white/5 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all duration-300 border border-white/10'
								>
									<ChevronLeft size={18} />
									<span className='hidden sm:inline'>Previous</span>
								</button>

								{/* Page Numbers */}
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
														? "bg-purple-600 text-white"
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
									disabled={page >= Math.min(totalPages, 500)}
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

export default TvShowsPage
