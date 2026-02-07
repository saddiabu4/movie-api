import { discoverMovies, discoverTvShows } from "@/api/discover/discover"
import { getMovieGenres, getTvGenres } from "@/api/genres/genres"
import { Footer, LoadingSpinner, MovieCard, Navbar } from "@/components"
import type { Genre, Movie, TvSeries } from "@/types"
import {
	Calendar,
	ChevronLeft,
	ChevronRight,
	Film,
	Star,
	TrendingUp,
	Tv,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

type MediaType = "movie" | "tv"
type SortType =
	| "popularity.desc"
	| "vote_average.desc"
	| "primary_release_date.desc"
	| "revenue.desc"

const GenrePage = () => {
	const { id } = useParams<{ id: string }>()
	const genreId = Number(id)

	const [isLoading, setIsLoading] = useState(true)
	const [movies, setMovies] = useState<Movie[]>([])
	const [tvShows, setTvShows] = useState<TvSeries[]>([])
	const [movieGenres, setMovieGenres] = useState<Genre[]>([])
	const [tvGenres, setTvGenres] = useState<Genre[]>([])
	const [currentGenre, setCurrentGenre] = useState<Genre | null>(null)
	const [mediaType, setMediaType] = useState<MediaType>("movie")
	const [sortBy, setSortBy] = useState<SortType>("popularity.desc")
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	const sortOptions: { key: SortType; label: string; icon: React.ReactNode }[] =
		[
			{
				key: "popularity.desc",
				label: "Most Popular",
				icon: <TrendingUp size={16} />,
			},
			{
				key: "vote_average.desc",
				label: "Top Rated",
				icon: <Star size={16} />,
			},
			{
				key: "primary_release_date.desc",
				label: "Newest",
				icon: <Calendar size={16} />,
			},
		]

	// Fetch genres
	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const [movieRes, tvRes] = await Promise.all([
					getMovieGenres(),
					getTvGenres(),
				])
				setMovieGenres(movieRes?.genres || [])
				setTvGenres(tvRes?.genres || [])
			} catch (error) {
				console.error("Error fetching genres:", error)
			}
		}
		fetchGenres()
	}, [])

	// Find current genre
	useEffect(() => {
		if (movieGenres.length > 0 || tvGenres.length > 0) {
			const genres = mediaType === "movie" ? movieGenres : tvGenres
			const genre = genres.find((g) => g.id === genreId)
			setCurrentGenre(genre || null)
		}
	}, [genreId, movieGenres, tvGenres, mediaType])

	// Fetch content by genre
	useEffect(() => {
		const fetchContent = async () => {
			try {
				setIsLoading(true)

				if (mediaType === "movie") {
					const response = await discoverMovies({
						with_genres: genreId,
						sort_by: sortBy,
						page,
						"vote_count.gte": sortBy === "vote_average.desc" ? 100 : undefined,
					})
					setMovies(response?.results || [])
					setTotalPages(Math.min(response?.total_pages || 1, 500))
				} else {
					const response = await discoverTvShows({
						with_genres: genreId,
						sort_by: sortBy.replace("primary_release_date", "first_air_date"),
						page,
						"vote_count.gte": sortBy === "vote_average.desc" ? 100 : undefined,
					})
					setTvShows(response?.results || [])
					setTotalPages(Math.min(response?.total_pages || 1, 500))
				}
			} catch (error) {
				console.error("Error fetching content:", error)
			} finally {
				setIsLoading(false)
			}
		}

		if (genreId) {
			fetchContent()
		}
	}, [genreId, mediaType, sortBy, page])

	const handleMediaTypeChange = (type: MediaType) => {
		setMediaType(type)
		setPage(1)
	}

	const handleSortChange = (sort: SortType) => {
		setSortBy(sort)
		setPage(1)
	}

	const genres = mediaType === "movie" ? movieGenres : tvGenres
	const content = mediaType === "movie" ? movies : tvShows

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-950 to-black'>
			<Navbar />

			{/* Hero Header */}
			<div className='relative pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden'>
				{/* Background Pattern */}
				<div className='absolute inset-0 opacity-30'>
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,9,20,0.15),transparent_50%)]' />
				</div>

				<div className='relative max-w-7xl mx-auto px-4 md:px-8'>
					{/* Page Title */}
					<div className='flex items-center gap-4 mb-8'>
						<div className='p-3 bg-red-600/20 rounded-2xl'>
							{mediaType === "movie" ? (
								<Film size={32} className='text-red-500' />
							) : (
								<Tv size={32} className='text-red-500' />
							)}
						</div>
						<div>
							<h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-white'>
								{currentGenre?.name || "Genre"}
							</h1>
							<p className='text-gray-400 mt-1'>
								Explore {mediaType === "movie" ? "movies" : "TV shows"} in this
								genre
							</p>
						</div>
					</div>

					{/* Media Type Toggle */}
					<div className='flex gap-2 mb-6'>
						<button
							onClick={() => handleMediaTypeChange("movie")}
							className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
								mediaType === "movie"
									? "bg-red-600 text-white shadow-lg shadow-red-600/30"
									: "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
							}`}
						>
							<Film size={18} />
							Movies
						</button>
						<button
							onClick={() => handleMediaTypeChange("tv")}
							className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
								mediaType === "tv"
									? "bg-red-600 text-white shadow-lg shadow-red-600/30"
									: "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
							}`}
						>
							<Tv size={18} />
							TV Shows
						</button>
					</div>

					{/* Sort Options */}
					<div className='flex flex-wrap gap-2 mb-6'>
						{sortOptions.map((option) => (
							<button
								key={option.key}
								onClick={() => handleSortChange(option.key)}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
									sortBy === option.key
										? "bg-white/20 text-white"
										: "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
								}`}
							>
								{option.icon}
								{option.label}
							</button>
						))}
					</div>

					{/* Other Genres */}
					<div className='relative'>
						<div className='flex gap-2 overflow-x-auto pb-4 scrollbar-hide'>
							{genres.map((genre) => (
								<Link
									key={genre.id}
									to={`/genre/${genre.id}`}
									className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
										genre.id === genreId
											? "bg-red-600 text-white"
											: "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
									}`}
								>
									{genre.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Content Grid */}
			<div className='max-w-7xl mx-auto px-4 md:px-8 pb-12'>
				{isLoading ? (
					<div className='flex justify-center items-center min-h-[400px]'>
						<LoadingSpinner />
					</div>
				) : content.length === 0 ? (
					<div className='text-center py-20'>
						<p className='text-gray-400 text-lg'>
							No {mediaType === "movie" ? "movies" : "TV shows"} found in this
							genre
						</p>
					</div>
				) : (
					<>
						<div className='flex flex-wrap justify-center gap-4 md:gap-6'>
							{content.map((item) => (
								<MovieCard
									key={item.id}
									item={item}
									type={mediaType}
									size='small'
								/>
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className='flex justify-center items-center gap-4 mt-12'>
								<button
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									disabled={page === 1}
									className='flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 border border-white/10'
								>
									<ChevronLeft size={20} />
									Previous
								</button>
								<div className='flex items-center gap-2'>
									<span className='text-white font-bold text-lg'>{page}</span>
									<span className='text-gray-500'>/</span>
									<span className='text-gray-400'>{totalPages}</span>
								</div>
								<button
									onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
									disabled={page === totalPages}
									className='flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 border border-white/10'
								>
									Next
									<ChevronRight size={20} />
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

export default GenrePage
