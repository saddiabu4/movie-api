import {
	getSimilarTvSeries,
	getTvSeriesCredits,
	getTvSeriesDetails,
	getTvSeriesRecommendations,
	getTvSeriesVideos,
} from "@/api/tv-series/tv-series"
import { Footer, LoadingSpinner, MovieRow, Navbar } from "@/components"
import type { Credits, TvSeriesDetails, Video } from "@/types"
import {
	formatDate,
	formatRating,
	formatYear,
	getBackdropUrl,
	getImageUrl,
	getProfileUrl,
} from "@/utils/helpers"
import {
	ArrowLeft,
	Bookmark,
	Calendar,
	Globe,
	Heart,
	Play,
	Share2,
	Star,
	Tv,
	X,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const TvDetailPage = () => {
	const { id } = useParams<{ id: string }>()
	const [isLoading, setIsLoading] = useState(true)
	const [tvShow, setTvShow] = useState<TvSeriesDetails | null>(null)
	const [credits, setCredits] = useState<Credits | null>(null)
	const [recommendations, setRecommendations] = useState([])
	const [similar, setSimilar] = useState([])
	const [videos, setVideos] = useState<Video[]>([])
	const [showTrailer, setShowTrailer] = useState(false)
	const [selectedSeason, setSelectedSeason] = useState(1)
	const [isLiked, setIsLiked] = useState(false)
	const [isBookmarked, setIsBookmarked] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			if (!id) return

			try {
				setIsLoading(true)
				const [tvRes, creditsRes, recommendationsRes, similarRes, videosRes] =
					await Promise.all([
						getTvSeriesDetails(Number(id)),
						getTvSeriesCredits(Number(id)),
						getTvSeriesRecommendations(Number(id)),
						getSimilarTvSeries(Number(id)),
						getTvSeriesVideos(Number(id)),
					])

				setTvShow(tvRes)
				setCredits(creditsRes)
				setRecommendations(recommendationsRes.results)
				setSimilar(similarRes.results)
				setVideos(videosRes.results)
			} catch (error) {
				console.error("Error fetching TV show details:", error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
		window.scrollTo(0, 0)
	}, [id])

	const trailer = videos.find(
		(v) => v.type === "Trailer" && v.site === "YouTube"
	)

	if (isLoading) {
		return (
			<div className='min-h-screen bg-black'>
				<Navbar />
				<LoadingSpinner />
			</div>
		)
	}

	if (!tvShow) {
		return (
			<div className='min-h-screen bg-black'>
				<Navbar />
				<div className='flex flex-col items-center justify-center min-h-[60vh]'>
					<div className='text-6xl mb-4'>📺</div>
					<h2 className='text-white text-2xl font-bold mb-2'>
						TV Show not found
					</h2>
					<p className='text-gray-400 mb-6'>
						The TV show you're looking for doesn't exist.
					</p>
					<Link
						to='/tv'
						className='px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors'
					>
						Browse TV Shows
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-black'>
			<Navbar />

			{/* Hero Section */}
			<div className='relative min-h-screen'>
				{/* Background */}
				<div className='absolute inset-0'>
					<img
						src={getBackdropUrl(tvShow.backdrop_path)}
						alt={tvShow.name}
						className='w-full h-full object-cover'
					/>
					<div className='absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60' />
					<div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />
					<div className='absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent' />
				</div>

				{/* Content */}
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12'>
					{/* Back Button */}
					<Link
						to='/tv'
						className='inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group'
					>
						<ArrowLeft
							size={20}
							className='group-hover:-translate-x-1 transition-transform'
						/>
						<span>Back to TV Shows</span>
					</Link>

					<div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
						{/* Poster */}
						<div className='shrink-0 mx-auto lg:mx-0'>
							<div className='relative group'>
								<img
									src={getImageUrl(tvShow.poster_path, "w500")}
									alt={tvShow.name}
									className='w-64 md:w-72 lg:w-80 rounded-2xl shadow-2xl shadow-purple-900/30 transition-transform duration-500 group-hover:scale-[1.02]'
								/>
								{trailer && (
									<button
										onClick={() => setShowTrailer(true)}
										className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl'
									>
										<div className='w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform'>
											<Play size={28} className='text-black fill-black ml-1' />
										</div>
									</button>
								)}
							</div>
						</div>

						{/* Details */}
						<div className='flex-1 space-y-6'>
							{/* Title & Tagline */}
							<div>
								<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight'>
									{tvShow.name}
								</h1>
								{tvShow.tagline && (
									<p className='text-gray-400 text-lg md:text-xl italic mt-3'>
										"{tvShow.tagline}"
									</p>
								)}
							</div>

							{/* Meta Info */}
							<div className='flex flex-wrap items-center gap-3 md:gap-4'>
								<div className='flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 rounded-xl'>
									<Star size={18} className='text-yellow-400 fill-yellow-400' />
									<span className='text-yellow-400 font-bold text-lg'>
										{formatRating(tvShow.vote_average)}
									</span>
								</div>
								<span className='text-gray-400'>
									{tvShow.vote_count?.toLocaleString()} reviews
								</span>
								<span className='text-gray-600'>•</span>
								<span className='flex items-center gap-1.5 text-gray-300'>
									<Tv size={16} />
									{tvShow.number_of_seasons} Season
									{tvShow.number_of_seasons > 1 ? "s" : ""}
								</span>
								<span className='text-gray-600'>•</span>
								<span className='flex items-center gap-1.5 text-gray-300'>
									<Calendar size={16} />
									{formatYear(tvShow.first_air_date)}
								</span>
							</div>

							{/* Genres */}
							<div className='flex flex-wrap gap-2'>
								{tvShow.genres.map((genre) => (
									<Link
										key={genre.id}
										to={`/genre/${genre.id}`}
										className='px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-xl hover:bg-purple-600 transition-all duration-300 border border-white/10'
									>
										{genre.name}
									</Link>
								))}
							</div>

							{/* Overview */}
							<div>
								<h3 className='text-white text-xl font-bold mb-3'>Overview</h3>
								<p className='text-gray-300 text-lg leading-relaxed'>
									{tvShow.overview || "No overview available."}
								</p>
							</div>

							{/* Action Buttons */}
							<div className='flex flex-wrap gap-3 pt-2'>
								{trailer && (
									<button
										onClick={() => setShowTrailer(true)}
										className='flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 transition-all duration-300 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105'
									>
										<Play size={22} className='fill-white' />
										Watch Trailer
									</button>
								)}
								<button
									onClick={() => setIsBookmarked(!isBookmarked)}
									className={`flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 border ${
										isBookmarked
											? "bg-white text-black"
											: "bg-white/10 text-white border-white/20 hover:bg-white/20"
									}`}
								>
									<Bookmark
										size={20}
										className={isBookmarked ? "fill-black" : ""}
									/>
									<span className='hidden sm:inline'>
										{isBookmarked ? "Saved" : "Save"}
									</span>
								</button>
								<button
									onClick={() => setIsLiked(!isLiked)}
									className={`p-4 rounded-xl transition-all duration-300 border ${
										isLiked
											? "bg-red-600 text-white border-red-600"
											: "bg-white/10 text-white border-white/20 hover:bg-white/20"
									}`}
								>
									<Heart size={20} className={isLiked ? "fill-white" : ""} />
								</button>
								<button className='p-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors border border-white/20'>
									<Share2 size={20} />
								</button>
							</div>

							{/* Additional Info Grid */}
							<div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-6'>
								<div className='bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10'>
									<p className='text-gray-500 text-xs uppercase tracking-wider mb-1'>
										First Aired
									</p>
									<p className='text-white font-semibold'>
										{formatDate(tvShow.first_air_date)}
									</p>
								</div>
								<div className='bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10'>
									<p className='text-gray-500 text-xs uppercase tracking-wider mb-1'>
										Status
									</p>
									<p className='text-white font-semibold'>{tvShow.status}</p>
								</div>
								<div className='bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10'>
									<p className='text-gray-500 text-xs uppercase tracking-wider mb-1'>
										Type
									</p>
									<p className='text-white font-semibold'>{tvShow.type}</p>
								</div>
								<div className='bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10'>
									<p className='text-gray-500 text-xs uppercase tracking-wider mb-1'>
										Episodes
									</p>
									<p className='text-white font-semibold'>
										{tvShow.number_of_episodes}
									</p>
								</div>
							</div>

							{/* Networks */}
							{tvShow.networks && tvShow.networks.length > 0 && (
								<div className='flex items-center gap-3'>
									<span className='text-gray-500 text-sm'>Networks:</span>
									<div className='flex gap-3'>
										{tvShow.networks.map((network) => (
											<div
												key={network.id}
												className='bg-white/10 rounded-lg px-3 py-2'
											>
												{network.logo_path ? (
													<img
														src={getImageUrl(network.logo_path, "w92")}
														alt={network.name}
														className='h-5 object-contain brightness-0 invert'
													/>
												) : (
													<span className='text-white text-sm'>
														{network.name}
													</span>
												)}
											</div>
										))}
									</div>
								</div>
							)}

							{/* Language */}
							<div className='flex items-center gap-2 text-gray-400'>
								<Globe size={16} />
								<span>
									Original Language: {tvShow.original_language.toUpperCase()}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Seasons Section */}
			{tvShow.seasons && tvShow.seasons.length > 0 && (
				<section className='py-12 max-w-7xl mx-auto px-4 md:px-8'>
					<h2 className='text-white text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3'>
						<span className='w-1 h-8 bg-purple-600 rounded-full' />
						Seasons
					</h2>

					{/* Season Selector */}
					<div className='flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide'>
						{tvShow.seasons
							.filter((s) => s.season_number > 0)
							.map((season) => (
								<button
									key={season.id}
									onClick={() => setSelectedSeason(season.season_number)}
									className={`shrink-0 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
										selectedSeason === season.season_number
											? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
											: "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
									}`}
								>
									Season {season.season_number}
								</button>
							))}
					</div>

					{/* Selected Season Info */}
					{tvShow.seasons
						.filter((s) => s.season_number === selectedSeason)
						.map((season) => (
							<div
								key={season.id}
								className='flex flex-col md:flex-row gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'
							>
								<img
									src={getImageUrl(season.poster_path, "w185")}
									alt={season.name}
									className='w-32 md:w-40 rounded-xl shadow-lg mx-auto md:mx-0'
								/>
								<div className='flex-1'>
									<h3 className='text-white text-xl font-bold mb-2'>
										{season.name}
									</h3>
									<div className='flex items-center gap-4 text-gray-400 text-sm mb-4'>
										<span>{season.episode_count} Episodes</span>
										<span>•</span>
										<span>{formatYear(season.air_date)}</span>
									</div>
									<p className='text-gray-300 leading-relaxed'>
										{season.overview ||
											"No overview available for this season."}
									</p>
								</div>
							</div>
						))}
				</section>
			)}

			{/* Cast Section */}
			{credits && credits.cast.length > 0 && (
				<section className='py-12 max-w-7xl mx-auto px-4 md:px-8'>
					<h2 className='text-white text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3'>
						<span className='w-1 h-8 bg-purple-600 rounded-full' />
						Series Cast
					</h2>
					<div className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'>
						{credits.cast.slice(0, 15).map((person, index) => (
							<Link
								key={person.credit_id}
								to={`/person/${person.id}`}
								className='shrink-0 w-32 md:w-36 group animate-fade-in'
								style={{ animationDelay: `${index * 0.05}s` }}
							>
								<div className='overflow-hidden rounded-xl aspect-[3/4] bg-gray-900 shadow-lg'>
									<img
										src={getProfileUrl(person.profile_path)}
										alt={person.name}
										className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
									/>
								</div>
								<h4 className='text-white text-sm font-semibold mt-3 truncate group-hover:text-purple-400 transition-colors'>
									{person.name}
								</h4>
								<p className='text-gray-500 text-xs truncate'>
									{person.character}
								</p>
							</Link>
						))}
					</div>
				</section>
			)}

			{/* Recommendations */}
			{recommendations.length > 0 && (
				<MovieRow
					title='You Might Also Like'
					items={recommendations}
					type='tv'
				/>
			)}

			{/* Similar TV Shows */}
			{similar.length > 0 && (
				<MovieRow title='Similar TV Shows' items={similar} type='tv' />
			)}

			{/* Trailer Modal */}
			{showTrailer && trailer && (
				<div
					className='fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4'
					onClick={() => setShowTrailer(false)}
				>
					<button
						onClick={() => setShowTrailer(false)}
						className='absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors'
					>
						<X size={24} />
					</button>
					<div className='w-full max-w-5xl aspect-video animate-scale-in'>
						<iframe
							src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
							className='w-full h-full rounded-2xl shadow-2xl'
							allow='autoplay; encrypted-media'
							allowFullScreen
						/>
					</div>
				</div>
			)}

			<Footer />
		</div>
	)
}

export default TvDetailPage
