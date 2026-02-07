import type { Movie, TvSeries } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import MovieCard, { type CardSize } from "./MovieCard"

interface MovieRowProps {
	title: string
	items: (Movie | TvSeries)[]
	type: "movie" | "tv"
	cardSize?: CardSize
}

const MovieRow = ({
	title,
	items,
	type,
	cardSize = "small",
}: MovieRowProps) => {
	const rowRef = useRef<HTMLDivElement>(null)
	const [showLeftArrow, setShowLeftArrow] = useState(false)
	const [showRightArrow, setShowRightArrow] = useState(true)
	const [centerIndex, setCenterIndex] = useState(0)

	const checkArrows = () => {
		if (rowRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
			setShowLeftArrow(scrollLeft > 0)
			setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
		}
	}

	const updateCenterIndex = useCallback(() => {
		if (rowRef.current) {
			const container = rowRef.current
			const containerCenter = container.scrollLeft + container.clientWidth / 2
			const cards = container.querySelectorAll("[data-card-index]")
			let closestIndex = 0
			let closestDistance = Infinity

			cards.forEach((card, index) => {
				const cardElement = card as HTMLElement
				const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2
				const distance = Math.abs(containerCenter - cardCenter)
				if (distance < closestDistance) {
					closestDistance = distance
					closestIndex = index
				}
			})

			setCenterIndex(closestIndex)
		}
	}, [])

	useEffect(() => {
		const container = rowRef.current
		if (container) {
			const handleScroll = () => {
				checkArrows()
				updateCenterIndex()
			}
			container.addEventListener("scroll", handleScroll)
			updateCenterIndex()
			return () => container.removeEventListener("scroll", handleScroll)
		}
	}, [updateCenterIndex])

	const scroll = (direction: "left" | "right") => {
		if (rowRef.current) {
			const scrollAmount = direction === "left" ? -400 : 400
			rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
			setTimeout(() => {
				checkArrows()
				updateCenterIndex()
			}, 300)
		}
	}

	const getCardScale = (index: number): string => {
		const distance = Math.abs(index - centerIndex)
		if (distance === 0) return "scale-110 z-20"
		if (distance === 1) return "scale-100 z-10"
		return "scale-95 z-0"
	}

	if (!items || items.length === 0) return null

	return (
		<section className='relative py-6 md:py-8 group/section'>
			{/* Section Header */}
			<div className='flex items-center justify-center mb-4 md:mb-6 px-4 md:px-8 lg:px-12'>
				<div className='flex items-center gap-3'>
					<h2 className='text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-tight'>
						{title}
					</h2>
					<div className='hidden sm:flex items-center gap-1 text-gray-500 text-sm'>
						<span className='w-8 h-0.5 bg-red-600 rounded-full' />
						<span>{items.length} titles</span>
					</div>
				</div>
			</div>

			<div className='relative'>
				{/* Left Arrow - Mobile/Tablet */}
				<button
					onClick={() => scroll("left")}
					className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 
						h-full w-12 flex items-center justify-start pl-2
						bg-gradient-to-r from-black via-black/80 to-transparent
						transition-opacity duration-300 ${
							showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}
				>
					<div className='p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors'>
						<ChevronLeft size={20} className='text-white' />
					</div>
				</button>

				{/* Movies Row */}
				<div
					ref={rowRef}
					onScroll={checkArrows}
					className='flex justify-start items-center gap-4 md:gap-5 overflow-x-auto scrollbar-hide px-14 md:px-16 lg:px-20 py-8 scroll-smooth'
				>
					{items.map((item, index) => (
						<div
							key={item.id}
							data-card-index={index}
							className={`animate-fade-in transition-all duration-500 ease-out ${getCardScale(
								index
							)}`}
							style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
						>
							<MovieCard item={item} type={type} size={cardSize} />
						</div>
					))}
				</div>

				{/* Right Arrow */}
				<button
					onClick={() => scroll("right")}
					className={`absolute right-0 top-1/2 -translate-y-1/2 z-20
						h-full w-12 flex items-center justify-end pr-2
						bg-gradient-to-l from-black via-black/80 to-transparent
						transition-opacity duration-300 ${
							showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}
				>
					<div className='p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors'>
						<ChevronRight size={20} className='text-white' />
					</div>
				</button>

				{/* Gradient Edges */}
				<div className='absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10' />
				<div className='absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10' />
			</div>
		</section>
	)
}

export default MovieRow
