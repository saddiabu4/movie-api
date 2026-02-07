import type { Movie, TvSeries } from "@/types"
import { formatRating, formatYear, getImageUrl } from "@/utils/helpers"
import { Bookmark, Play, Star } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export type CardSize = "large" | "medium" | "small"

interface MovieCardProps {
	item: Movie | TvSeries
	type: "movie" | "tv"
	size?: CardSize
}

const sizeClasses: Record<CardSize, string> = {
	large: "w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px]",
	medium: "w-[160px] sm:w-[175px] md:w-[190px] lg:w-[200px]",
	small: "w-[140px] sm:w-[150px] md:w-[160px] lg:w-[170px]",
}

const MovieCard = ({ item, type, size = "small" }: MovieCardProps) => {
	const [isHovered, setIsHovered] = useState(false)
	const [imageLoaded, setImageLoaded] = useState(false)

	const title =
		type === "movie" ? (item as Movie).title : (item as TvSeries).name
	const date =
		type === "movie"
			? (item as Movie).release_date
			: (item as TvSeries).first_air_date

	return (
		<Link
			to={`/${type}/${item.id}`}
			className={`group relative flex-shrink-0 ${sizeClasses[size]}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Poster Container */}
			<div className='relative overflow-hidden rounded-xl aspect-[2/3] bg-gray-900 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-red-500/20 group-hover:scale-[1.02]'>
				{/* Loading Skeleton */}
				{!imageLoaded && (
					<div className='absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse' />
				)}

				{/* Image */}
				<img
					src={getImageUrl(item.poster_path, "w342")}
					alt={title}
					className={`w-full h-full object-cover transition-all duration-700 ${
						imageLoaded ? "opacity-100" : "opacity-0"
					} ${isHovered ? "scale-110 brightness-75" : "scale-100"}`}
					loading='lazy'
					onLoad={() => setImageLoaded(true)}
				/>

				{/* Gradient Overlay */}
				<div
					className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-300 ${
						isHovered ? "opacity-100" : "opacity-60"
					}`}
				/>

				{/* Top Actions */}
				<div
					className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${
						isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
					}`}
				>
					<button
						className='p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-red-600 transition-colors'
						onClick={(e) => {
							e.preventDefault()
							// Add to watchlist logic
						}}
					>
						<Bookmark size={14} className='text-white' />
					</button>
				</div>

				{/* Rating Badge */}
				{item.vote_average > 0 && (
					<div className='absolute top-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg'>
						<Star size={12} className='text-yellow-400 fill-yellow-400' />
						<span className='text-white text-xs font-bold'>
							{formatRating(item.vote_average)}
						</span>
					</div>
				)}

				{/* Hover Content */}
				<div
					className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ${
						isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					}`}
				>
					{/* Play Button */}
					<div className='flex justify-center mb-3'>
						<div className='p-3 bg-white rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110'>
							<Play size={20} className='text-black fill-black ml-0.5' />
						</div>
					</div>

					{/* Quick Info */}
					<div className='text-center'>
						<p className='text-white text-sm font-medium line-clamp-1'>
							{title}
						</p>
						<p className='text-gray-400 text-xs mt-1'>{formatYear(date)}</p>
					</div>
				</div>

				{/* Type Badge */}
				<div
					className={`absolute bottom-3 left-3 transition-all duration-300 ${
						isHovered ? "opacity-0" : "opacity-100"
					}`}
				>
					<span className='px-2 py-0.5 bg-red-600/90 text-white text-[10px] font-bold rounded uppercase'>
						{type === "movie" ? "Movie" : "TV"}
					</span>
				</div>
			</div>

			{/* Info Below Card */}
			<div className='mt-3 px-1'>
				<h3 className='text-white text-sm font-semibold truncate group-hover:text-red-400 transition-colors duration-300'>
					{title}
				</h3>
				<div className='flex items-center gap-2 mt-1'>
					<p className='text-gray-500 text-xs'>{formatYear(date)}</p>
					{item.vote_average > 0 && (
						<>
							<span className='text-gray-600'>•</span>
							<span className='text-gray-500 text-xs flex items-center gap-1'>
								<Star size={10} className='text-yellow-500 fill-yellow-500' />
								{formatRating(item.vote_average)}
							</span>
						</>
					)}
				</div>
			</div>
		</Link>
	)
}

export default MovieCard
