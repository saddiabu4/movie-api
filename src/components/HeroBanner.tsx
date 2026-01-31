import type { Movie, TvSeries } from "@/types"
import {
	formatRating,
	formatYear,
	getBackdropUrl,
	truncateText,
} from "@/utils/helpers"
import {
	ChevronLeft,
	ChevronRight,
	Info,
	Play,
	Star,
	Volume2,
	VolumeX,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface HeroBannerProps {
	items: (Movie | TvSeries)[]
	type: "movie" | "tv"
}

const HeroBanner = ({ items, type }: HeroBannerProps) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [isMuted, setIsMuted] = useState(true)

	const safeItems = items || []
	const currentItem = safeItems[currentIndex]
	const title =
		type === "movie"
			? (currentItem as Movie)?.title
			: (currentItem as TvSeries)?.name
	const date =
		type === "movie"
			? (currentItem as Movie)?.release_date
			: (currentItem as TvSeries)?.first_air_date

	const handlePrevious = () => {
		if (isTransitioning || safeItems.length === 0) return
		setIsTransitioning(true)
		setCurrentIndex((prev) => (prev === 0 ? safeItems.length - 1 : prev - 1))
		setTimeout(() => setIsTransitioning(false), 700)
	}

	const handleNext = () => {
		if (isTransitioning || safeItems.length === 0) return
		setIsTransitioning(true)
		setCurrentIndex((prev) => (prev + 1) % safeItems.length)
		setTimeout(() => setIsTransitioning(false), 700)
	}

	// Auto slide
	useEffect(() => {
		if (safeItems.length === 0) return
		const timer = setInterval(() => {
			handleNext()
		}, 8000)
		return () => clearInterval(timer)
	}, [safeItems.length])

	// Early return if items is undefined or empty
	if (safeItems.length === 0 || !currentItem) {
		return null
	}

	return (
		<div className='relative h-[85vh] md:h-[90vh] lg:h-screen w-full overflow-hidden'>
			{/* Background Images with Parallax */}
			{safeItems.slice(0, 5).map((item, index) => (
				<div
					key={item.id}
					className={`absolute inset-0 transition-all duration-1000 ease-out ${
						index === currentIndex
							? "opacity-100 scale-100"
							: "opacity-0 scale-105"
					}`}
				>
					<div
						className='absolute inset-0 bg-cover bg-center transform'
						style={{
							backgroundImage: `url(${getBackdropUrl(item.backdrop_path)})`,
						}}
					/>
				</div>
			))}

			{/* Gradient Overlays */}
			<div className='absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent' />
			<div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' />
			<div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent' />

			{/* Animated Particles Effect */}
			<div className='absolute inset-0 opacity-30'>
				<div
					className='absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-float'
					style={{ animationDelay: "0s" }}
				/>
				<div
					className='absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-float'
					style={{ animationDelay: "1s" }}
				/>
				<div
					className='absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-float'
					style={{ animationDelay: "2s" }}
				/>
			</div>

			{/* Content */}
			<div className='relative h-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center'>
				<div
					className={`max-w-2xl lg:max-w-3xl space-y-4 md:space-y-6 transition-all duration-700 ${
						isTransitioning
							? "opacity-0 translate-x-8"
							: "opacity-100 translate-x-0"
					}`}
				>
					{/* Badge */}
					<div className='flex items-center gap-3'>
						<span className='px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md uppercase tracking-wider animate-pulse'>
							{type === "movie" ? "Featured Film" : "Featured Series"}
						</span>
						<span className='text-gray-300 text-sm'>
							#{currentIndex + 1} Trending
						</span>
					</div>

					{/* Title */}
					<h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-2xl'>
						{title}
					</h1>

					{/* Meta Info */}
					<div className='flex flex-wrap items-center gap-3 md:gap-4'>
						<span className='flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 rounded-full'>
							<Star size={16} className='text-yellow-400 fill-yellow-400' />
							<span className='text-yellow-400 font-bold'>
								{formatRating(currentItem.vote_average)}
							</span>
						</span>
						<span className='text-gray-300 font-medium'>
							{formatYear(date)}
						</span>
						<span className='px-3 py-1 border border-white/30 rounded-md text-sm uppercase text-gray-200'>
							{type === "movie" ? "Movie" : "TV Series"}
						</span>
						<span className='hidden md:inline-flex items-center gap-1 text-gray-400'>
							<span className='w-1 h-1 bg-gray-400 rounded-full' />
							{currentItem.vote_count?.toLocaleString()} votes
						</span>
					</div>

					{/* Overview */}
					<p className='text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl'>
						{truncateText(currentItem.overview, 180)}
					</p>

					{/* Buttons */}
					<div className='flex flex-wrap gap-3 md:gap-4 pt-2'>
						<Link
							to={`/${type}/${currentItem.id}`}
							className='group flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
						>
							<Play
								size={22}
								className='fill-black group-hover:scale-110 transition-transform'
							/>
							<span>Play Now</span>
						</Link>
						<Link
							to={`/${type}/${currentItem.id}`}
							className='group flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold hover:bg-white/20 transition-all duration-300 border border-white/20'
						>
							<Info
								size={22}
								className='group-hover:rotate-12 transition-transform'
							/>
							<span>More Info</span>
						</Link>
					</div>
				</div>
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={handlePrevious}
				className='absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 group'
				disabled={isTransitioning}
			>
				<ChevronLeft
					size={24}
					className='group-hover:-translate-x-0.5 transition-transform'
				/>
			</button>
			<button
				onClick={handleNext}
				className='absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 group'
				disabled={isTransitioning}
			>
				<ChevronRight
					size={24}
					className='group-hover:translate-x-0.5 transition-transform'
				/>
			</button>

			{/* Volume Control */}
			<button
				onClick={() => setIsMuted(!isMuted)}
				className='absolute right-4 md:right-8 bottom-32 md:bottom-40 p-3 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full text-white transition-all border border-white/20'
			>
				{isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
			</button>

			{/* Progress Bar & Dots */}
			<div className='absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4'>
				{/* Progress dots */}
				<div className='flex gap-2 md:gap-3'>
					{items.slice(0, 5).map((_, index) => (
						<button
							key={index}
							onClick={() => {
								if (!isTransitioning) {
									setIsTransitioning(true)
									setCurrentIndex(index)
									setTimeout(() => setIsTransitioning(false), 700)
								}
							}}
							className='group relative'
						>
							<div
								className={`w-8 md:w-12 h-1 rounded-full transition-all duration-500 ${
									index === currentIndex
										? "bg-red-500"
										: "bg-white/30 group-hover:bg-white/50"
								}`}
							>
								{index === currentIndex && (
									<div
										className='absolute inset-0 bg-white rounded-full origin-left animate-progress'
										style={{ animationDuration: "8s" }}
									/>
								)}
							</div>
						</button>
					))}
				</div>

				{/* Slide counter */}
				<div className='text-gray-400 text-sm font-medium'>
					<span className='text-white'>{currentIndex + 1}</span>
					<span className='mx-2'>/</span>
					<span>{Math.min(items.length, 5)}</span>
				</div>
			</div>

			{/* Side Gradient for Next Slide Preview */}
			<div className='hidden lg:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/50 to-transparent pointer-events-none' />
		</div>
	)
}

export default HeroBanner
