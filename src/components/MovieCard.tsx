import type { Movie, TvSeries } from "@/types"
import { formatRating, formatYear, getImageUrl } from "@/utils/helpers"
import { motion, AnimatePresence } from "framer-motion"
import { Bookmark, Calendar, Heart, Play, Star, Sparkles } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export type CardSize = "large" | "medium" | "small"

interface MovieCardProps {
	item: Movie | TvSeries
	type: "movie" | "tv"
	size?: CardSize
	index?: number
}

const sizeClasses: Record<CardSize, string> = {
	large: "w-[200px] sm:w-[220px] md:w-[250px] lg:w-[280px]",
	medium: "w-[170px] sm:w-[190px] md:w-[210px] lg:w-[230px]",
	small: "w-[150px] sm:w-[165px] md:w-[180px] lg:w-[195px]",
}

const MovieCard = ({ item, type, size = "small", index = 0 }: MovieCardProps) => {
	const [isHovered, setIsHovered] = useState(false)
	const [imageLoaded, setImageLoaded] = useState(false)
	const [isLiked, setIsLiked] = useState(false)
	const [isBookmarked, setIsBookmarked] = useState(false)

	const title =
		type === "movie" ? (item as Movie).title : (item as TvSeries).name
	const date =
		type === "movie"
			? (item as Movie).release_date
			: (item as TvSeries).first_air_date

	const getRatingColor = (rating: number) => {
		if (rating >= 8) return "from-emerald-400 to-green-500"
		if (rating >= 6) return "from-yellow-400 to-orange-500"
		return "from-red-400 to-rose-500"
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				delay: index * 0.1,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
			className={`relative flex-shrink-0 ${sizeClasses[size]}`}
		>
			<Link
				to={`/${type}/${item.id}`}
				className='block'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<motion.div
					className='relative overflow-hidden rounded-2xl aspect-[2/3] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
					whileHover={{ scale: 1.03 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
				>
					{/* Animated Border Glow */}
					<motion.div
						className='absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 opacity-0 blur-sm'
						animate={{ opacity: isHovered ? 0.7 : 0 }}
						transition={{ duration: 0.3 }}
					/>

					{/* Card Inner Container */}
					<div className='relative w-full h-full rounded-2xl overflow-hidden bg-gray-900'>
						{/* Loading Skeleton */}
						<AnimatePresence>
							{!imageLoaded && (
								<motion.div
									initial={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className='absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800'
								>
									<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer' />
									<div className='flex items-center justify-center h-full'>
										<Sparkles className='w-8 h-8 text-gray-600 animate-pulse' />
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Image */}
						<motion.img
							src={getImageUrl(item.poster_path, "w500")}
							alt={title}
							className='w-full h-full object-cover'
							initial={{ scale: 1.1, opacity: 0 }}
							animate={{
								scale: isHovered ? 1.15 : 1,
								opacity: imageLoaded ? 1 : 0,
								filter: isHovered ? "brightness(0.6)" : "brightness(0.9)",
							}}
							transition={{ duration: 0.6, ease: "easeOut" }}
							loading='lazy'
							onLoad={() => setImageLoaded(true)}
						/>

						{/* Gradient Overlays */}
						<div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90' />
						<motion.div
							className='absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80'
							animate={{ opacity: isHovered ? 1 : 0.3 }}
							transition={{ duration: 0.3 }}
						/>

						{/* Top Actions */}
						<div className='absolute top-3 left-3 right-3 flex justify-between items-start'>
							{/* Rating Badge */}
							{item.vote_average > 0 && (
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
									className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${getRatingColor(
										item.vote_average
									)} shadow-lg`}
								>
									<Star size={10} className='text-white fill-white' />
									<span className='text-white text-xs font-bold'>
										{formatRating(item.vote_average)}
									</span>
								</motion.div>
							)}

							{/* Action Buttons */}
							<motion.div
								className='flex gap-2'
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
								transition={{ duration: 0.3 }}
							>
								<motion.button
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.9 }}
									className={`p-2 rounded-full backdrop-blur-md shadow-lg transition-colors ${
										isLiked
											? "bg-red-500 text-white"
											: "bg-white/20 text-white hover:bg-red-500"
									}`}
									onClick={(e) => {
										e.preventDefault()
										setIsLiked(!isLiked)
									}}
								>
									<Heart
										size={14}
										className={isLiked ? "fill-white" : ""}
									/>
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.9 }}
									className={`p-2 rounded-full backdrop-blur-md shadow-lg transition-colors ${
										isBookmarked
											? "bg-purple-500 text-white"
											: "bg-white/20 text-white hover:bg-purple-500"
									}`}
									onClick={(e) => {
										e.preventDefault()
										setIsBookmarked(!isBookmarked)
									}}
								>
									<Bookmark
										size={14}
										className={isBookmarked ? "fill-white" : ""}
									/>
								</motion.button>
							</motion.div>
						</div>

						{/* Center Play Button */}
						<motion.div
							className='absolute inset-0 flex items-center justify-center'
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{
								opacity: isHovered ? 1 : 0,
								scale: isHovered ? 1 : 0.5,
							}}
							transition={{ duration: 0.3, ease: "backOut" }}
						>
							<motion.div
								className='relative'
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								{/* Pulse Ring */}
								<motion.div
									className='absolute inset-0 rounded-full bg-white/30'
									animate={{
										scale: [1, 1.5, 1.5],
										opacity: [0.5, 0, 0],
									}}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										ease: "easeOut",
									}}
								/>
								<div className='relative p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full shadow-2xl shadow-red-500/50'>
									<Play size={24} className='text-white fill-white ml-1' />
								</div>
							</motion.div>
						</motion.div>

						{/* Bottom Info */}
						<motion.div
							className='absolute bottom-0 left-0 right-0 p-4'
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							{/* Type Badge */}
							<motion.div
								className='mb-2'
								animate={{
									opacity: isHovered ? 0 : 1,
									y: isHovered ? 10 : 0,
								}}
								transition={{ duration: 0.2 }}
							>
								<span
									className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-md uppercase ${
										type === "movie"
											? "bg-red-500/90 text-white"
											: "bg-blue-500/90 text-white"
									}`}
								>
									{type === "movie" ? "Movie" : "TV Series"}
								</span>
							</motion.div>

							{/* Hover Info */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{
									opacity: isHovered ? 1 : 0,
									y: isHovered ? 0 : 20,
								}}
								transition={{ duration: 0.3 }}
								className='space-y-2'
							>
								<h3 className='text-white font-bold text-sm line-clamp-2 leading-tight'>
									{title}
								</h3>
								<div className='flex items-center gap-2 text-gray-300 text-xs'>
									<Calendar size={12} />
									<span>{formatYear(date)}</span>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</Link>

			{/* Info Below Card */}
			<motion.div
				className='mt-3 px-1'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<motion.h3
					className='text-white text-sm font-semibold truncate'
					animate={{
						color: isHovered ? "#f43f5e" : "#ffffff",
					}}
					transition={{ duration: 0.3 }}
				>
					{title}
				</motion.h3>
				<div className='flex items-center gap-2 mt-1.5'>
					<span className='text-gray-400 text-xs flex items-center gap-1'>
						<Calendar size={10} className='text-gray-500' />
						{formatYear(date)}
					</span>
					{item.vote_average > 0 && (
						<>
							<span className='text-gray-600'>•</span>
							<span className='text-gray-400 text-xs flex items-center gap-1'>
								<Star
									size={10}
									className={`${
										item.vote_average >= 7
											? "text-emerald-400 fill-emerald-400"
											: item.vote_average >= 5
											? "text-yellow-400 fill-yellow-400"
											: "text-red-400 fill-red-400"
									}`}
								/>
								{formatRating(item.vote_average)}
							</span>
						</>
					)}
				</div>
			</motion.div>
		</motion.div>
	)
}

export default MovieCard
