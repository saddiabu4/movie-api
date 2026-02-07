import type { Person } from "@/types"
import { getProfileUrl } from "@/utils/helpers"
import { AnimatePresence, motion } from "framer-motion"
import { Award, Camera, Film, Heart, Sparkles, Star, User } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export type PersonCardSize = "large" | "medium" | "small"

interface PersonCardProps {
	person: Person
	size?: PersonCardSize
	index?: number
}

const sizeClasses: Record<PersonCardSize, string> = {
	large: "w-[200px] sm:w-[230px] md:w-[260px] lg:w-[290px]",
	medium: "w-[170px] sm:w-[195px] md:w-[220px] lg:w-[245px]",
	small: "w-[150px] sm:w-[170px] md:w-[185px] lg:w-[200px]",
}

const departmentColors: Record<string, string> = {
	Acting: "from-purple-500 to-pink-500",
	Directing: "from-blue-500 to-cyan-500",
	Writing: "from-amber-500 to-orange-500",
	Production: "from-emerald-500 to-teal-500",
	default: "from-gray-500 to-slate-500",
}

const departmentIcons: Record<string, React.ReactNode> = {
	Acting: <Star size={12} />,
	Directing: <Camera size={12} />,
	Writing: <Film size={12} />,
	Production: <Award size={12} />,
	default: <Sparkles size={12} />,
}

const PersonCard = ({ person, size = "small", index = 0 }: PersonCardProps) => {
	const [imageLoaded, setImageLoaded] = useState(false)
	const [imageError, setImageError] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const [isLiked, setIsLiked] = useState(false)

	const gradientColor =
		departmentColors[person.known_for_department] || departmentColors.default
	const departmentIcon =
		departmentIcons[person.known_for_department] || departmentIcons.default

	return (
		<motion.div
			initial={{ opacity: 0, y: 40, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{
				duration: 0.6,
				delay: index * 0.08,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
			className={`relative flex-shrink-0 ${sizeClasses[size]}`}
		>
			<Link
				to={`/person/${person.id}`}
				className='block'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<motion.div
					className='relative overflow-hidden rounded-3xl aspect-[3/4] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
				>
					{/* Animated Gradient Border */}
					<motion.div
						className={`absolute -inset-[2px] rounded-3xl bg-gradient-to-r ${gradientColor} opacity-0 blur-md`}
						animate={{
							opacity: isHovered ? 0.8 : 0,
							rotate: isHovered ? 180 : 0,
						}}
						transition={{ duration: 0.6 }}
					/>

					{/* Card Inner */}
					<div className='relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950'>
						{/* Loading State */}
						<AnimatePresence>
							{!imageLoaded && !imageError && (
								<motion.div
									initial={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className='absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800'
								>
									<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer' />
									<div className='flex flex-col items-center justify-center h-full gap-3'>
										<motion.div
											animate={{
												scale: [1, 1.1, 1],
												rotate: [0, 5, -5, 0],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												ease: "easeInOut",
											}}
										>
											<User size={48} className='text-gray-600' />
										</motion.div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Profile Image */}
						{!imageError ? (
							<motion.img
								src={getProfileUrl(person.profile_path, "h632")}
								alt={person.name}
								className='w-full h-full object-cover'
								initial={{ scale: 1.15, opacity: 0 }}
								animate={{
									scale: isHovered ? 1.1 : 1,
									opacity: imageLoaded ? 1 : 0,
									filter: isHovered ? "brightness(0.7)" : "brightness(0.95)",
								}}
								transition={{ duration: 0.6, ease: "easeOut" }}
								loading='lazy'
								onLoad={() => setImageLoaded(true)}
								onError={() => setImageError(true)}
							/>
						) : (
							<motion.div
								className='w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 gap-3'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
							>
								<div
									className={`p-4 rounded-full bg-gradient-to-r ${gradientColor}`}
								>
									<User size={40} className='text-white' />
								</div>
								<span className='text-gray-500 text-xs'>No Image</span>
							</motion.div>
						)}

						{/* Gradient Overlays */}
						<div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90' />
						<motion.div
							className={`absolute inset-0 bg-gradient-to-br ${gradientColor} mix-blend-overlay`}
							animate={{ opacity: isHovered ? 0.3 : 0 }}
							transition={{ duration: 0.4 }}
						/>

						{/* Top Section */}
						<div className='absolute top-3 left-3 right-3 flex justify-between items-start'>
							{/* Department Badge */}
							<motion.div
								initial={{ scale: 0, x: -20 }}
								animate={{ scale: 1, x: 0 }}
								transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
								className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradientColor} shadow-lg`}
							>
								{departmentIcon}
								<span className='text-white text-[10px] font-bold uppercase tracking-wide'>
									{person.known_for_department === "Acting"
										? "Actor"
										: person.known_for_department}
								</span>
							</motion.div>

							{/* Like Button */}
							<motion.button
								initial={{ opacity: 0, scale: 0 }}
								animate={{
									opacity: isHovered ? 1 : 0,
									scale: isHovered ? 1 : 0,
								}}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.9 }}
								transition={{ duration: 0.2 }}
								className={`p-2 rounded-full backdrop-blur-md shadow-lg transition-colors ${
									isLiked
										? "bg-pink-500 text-white"
										: "bg-white/20 text-white hover:bg-pink-500"
								}`}
								onClick={(e) => {
									e.preventDefault()
									setIsLiked(!isLiked)
								}}
							>
								<Heart size={14} className={isLiked ? "fill-white" : ""} />
							</motion.button>
						</div>

						{/* Bottom Content */}
						<motion.div
							className='absolute bottom-0 left-0 right-0 p-4'
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							{/* Name */}
							<motion.h3
								className='text-white font-bold text-base leading-tight mb-1'
								animate={{
									y: isHovered ? -5 : 0,
								}}
								transition={{ duration: 0.3 }}
							>
								{person.name}
							</motion.h3>

							{/* Hover Details */}
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{
									opacity: isHovered ? 1 : 0,
									height: isHovered ? "auto" : 0,
								}}
								transition={{ duration: 0.3 }}
								className='overflow-hidden'
							>
								<div className='flex items-center gap-2 text-gray-300 text-xs mb-2'>
									<Film size={12} />
									<span>{person.known_for_department}</span>
								</div>

								{/* Known For */}
								{person.known_for && person.known_for.length > 0 && (
									<div className='space-y-1'>
										<p className='text-gray-400 text-[10px] font-semibold uppercase tracking-wide'>
											Known for:
										</p>
										<div className='flex flex-wrap gap-1'>
											{person.known_for.slice(0, 2).map((item, i) => (
												<motion.span
													key={i}
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ delay: 0.1 * i }}
													className='px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-[9px] text-gray-300'
												>
													{"title" in item
														? item.title
														: "name" in item
														? item.name
														: ""}
												</motion.span>
											))}
										</div>
									</div>
								)}
							</motion.div>
						</motion.div>

						{/* Floating Particles Effect on Hover */}
						<AnimatePresence>
							{isHovered && (
								<>
									{[...Array(5)].map((_, i) => (
										<motion.div
											key={i}
											className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${gradientColor}`}
											initial={{
												opacity: 0,
												x: "50%",
												y: "100%",
											}}
											animate={{
												opacity: [0, 1, 0],
												x: `${20 + Math.random() * 60}%`,
												y: `${Math.random() * 50}%`,
											}}
											exit={{ opacity: 0 }}
											transition={{
												duration: 1.5 + Math.random(),
												delay: i * 0.1,
												ease: "easeOut",
											}}
										/>
									))}
								</>
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			</Link>

			{/* Info Below Card */}
			<motion.div
				className='mt-4 px-1 text-center'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
			>
				<motion.h3
					className={`text-white text-sm font-bold truncate transition-all duration-300 ${
						isHovered
							? "bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
							: ""
					}`}
				>
					{person.name}
				</motion.h3>
				<motion.p
					className='text-gray-400 text-xs mt-1 flex items-center justify-center gap-1'
					animate={{ opacity: isHovered ? 0.8 : 0.6 }}
				>
					{departmentIcon}
					{person.known_for_department}
				</motion.p>
			</motion.div>
		</motion.div>
	)
}

export default PersonCard
