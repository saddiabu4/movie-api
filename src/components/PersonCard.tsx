import type { Person } from "@/types"
import { getProfileUrl } from "@/utils/helpers"
import { Film, User } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export type PersonCardSize = "large" | "medium" | "small"

interface PersonCardProps {
	person: Person
	size?: PersonCardSize
}

const sizeClasses: Record<PersonCardSize, string> = {
	large: "w-[180px] sm:w-[210px] md:w-[240px] lg:w-[270px]",
	medium: "w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px]",
	small: "w-[140px] sm:w-[160px] md:w-[170px] lg:w-[180px]",
}

const PersonCard = ({ person, size = "small" }: PersonCardProps) => {
	const [imageLoaded, setImageLoaded] = useState(false)
	const [imageError, setImageError] = useState(false)

	return (
		<Link
			to={`/person/${person.id}`}
			className={`group flex-shrink-0 ${sizeClasses[size]}`}
		>
			{/* Profile Image Container */}
			<div className='relative overflow-hidden rounded-2xl aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:scale-[1.02]'>
				{/* Loading Skeleton */}
				{!imageLoaded && !imageError && (
					<div className='absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse flex items-center justify-center'>
						<User size={40} className='text-gray-600' />
					</div>
				)}

				{/* Image */}
				{!imageError ? (
					<img
						src={getProfileUrl(person.profile_path, "w185")}
						alt={person.name}
						className={`w-full h-full object-cover transition-all duration-700 ${
							imageLoaded ? "opacity-100" : "opacity-0"
						} group-hover:scale-110 group-hover:brightness-90`}
						loading='lazy'
						onLoad={() => setImageLoaded(true)}
						onError={() => setImageError(true)}
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900'>
						<User size={50} className='text-gray-600' />
					</div>
				)}

				{/* Gradient Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity' />

				{/* Hover Content */}
				<div className='absolute inset-x-0 bottom-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
					<div className='flex items-center gap-2 text-gray-300 text-xs'>
						<Film size={12} />
						<span>{person.known_for_department}</span>
					</div>

					{/* Known For Preview */}
					{person.known_for && person.known_for.length > 0 && (
						<div className='mt-2'>
							<p className='text-gray-400 text-[10px] line-clamp-2'>
								Known for:{" "}
								{person.known_for
									.slice(0, 2)
									.map((item) =>
										"title" in item
											? item.title
											: "name" in item
											? item.name
											: ""
									)
									.join(", ")}
							</p>
						</div>
					)}
				</div>

				{/* Department Badge */}
				<div className='absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
					<span className='px-2 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-md uppercase'>
						{person.known_for_department === "Acting"
							? "Actor"
							: person.known_for_department}
					</span>
				</div>
			</div>

			{/* Info Below */}
			<div className='mt-3 px-1 text-center'>
				<h3 className='text-white text-sm font-semibold truncate group-hover:text-purple-400 transition-colors duration-300'>
					{person.name}
				</h3>
				<p className='text-gray-500 text-xs mt-0.5'>
					{person.known_for_department}
				</p>
			</div>
		</Link>
	)
}

export default PersonCard
