import type { Movie, TvSeries } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"
import MovieCard from "./MovieCard"

interface MovieRowProps {
	title: string
	items: (Movie | TvSeries)[]
	type: "movie" | "tv"
}

const MovieRow = ({ title, items, type }: MovieRowProps) => {
	const rowRef = useRef<HTMLDivElement>(null)
	const [showLeftArrow, setShowLeftArrow] = useState(false)
	const [showRightArrow, setShowRightArrow] = useState(true)

	const checkArrows = () => {
		if (rowRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
			setShowLeftArrow(scrollLeft > 0)
			setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
		}
	}

	const scroll = (direction: "left" | "right") => {
		if (rowRef.current) {
			const scrollAmount = direction === "left" ? -600 : 600
			rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
			setTimeout(checkArrows, 300)
		}
	}

	if (!items || items.length === 0) return null

	return (
		<section className='relative py-6 md:py-8 group/section'>
			{/* Section Header */}
			<div className='flex items-center justify-between mb-4 md:mb-6 px-4 md:px-8 lg:px-12'>
				<div className='flex items-center gap-3'>
					<h2 className='text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-tight'>
						{title}
					</h2>
					<div className='hidden sm:flex items-center gap-1 text-gray-500 text-sm'>
						<span className='w-8 h-0.5 bg-red-600 rounded-full' />
						<span>{items.length} titles</span>
					</div>
				</div>

				{/* Desktop Navigation Arrows */}
				<div className='hidden md:flex items-center gap-2'>
					<button
						onClick={() => scroll("left")}
						disabled={!showLeftArrow}
						className={`p-2 rounded-full transition-all duration-300 ${
							showLeftArrow
								? "bg-white/10 hover:bg-white/20 text-white"
								: "bg-white/5 text-gray-600 cursor-not-allowed"
						}`}
					>
						<ChevronLeft size={20} />
					</button>
					<button
						onClick={() => scroll("right")}
						disabled={!showRightArrow}
						className={`p-2 rounded-full transition-all duration-300 ${
							showRightArrow
								? "bg-white/10 hover:bg-white/20 text-white"
								: "bg-white/5 text-gray-600 cursor-not-allowed"
						}`}
					>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>

			<div className='relative'>
				{/* Left Arrow - Mobile/Tablet */}
				<button
					onClick={() => scroll("left")}
					className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 md:hidden 
						h-full w-12 flex items-center justify-start pl-2
						bg-gradient-to-r from-black via-black/80 to-transparent
						transition-opacity duration-300 ${
							showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}
				>
					<div className='p-2 bg-black/60 backdrop-blur-sm rounded-full'>
						<ChevronLeft size={20} className='text-white' />
					</div>
				</button>

				{/* Movies Row */}
				<div
					ref={rowRef}
					onScroll={checkArrows}
					className='flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-12 pb-4 scroll-smooth'
				>
					{items.map((item, index) => (
						<div
							key={item.id}
							className='animate-fade-in'
							style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
						>
							<MovieCard item={item} type={type} />
						</div>
					))}
				</div>

				{/* Right Arrow - Mobile/Tablet */}
				<button
					onClick={() => scroll("right")}
					className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 md:hidden
						h-full w-12 flex items-center justify-end pr-2
						bg-gradient-to-l from-black via-black/80 to-transparent
						transition-opacity duration-300 ${
							showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}
				>
					<div className='p-2 bg-black/60 backdrop-blur-sm rounded-full'>
						<ChevronRight size={20} className='text-white' />
					</div>
				</button>

				{/* Gradient Edges */}
				<div className='hidden md:block absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10' />
				<div className='hidden md:block absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10' />
			</div>
		</section>
	)
}

export default MovieRow
