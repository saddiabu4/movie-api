import type { Person } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import PersonCard, { type PersonCardSize } from "./PersonCard"

interface PersonRowProps {
	title: string
	people: Person[]
	cardSize?: PersonCardSize
}

const PersonRow = ({ title, people, cardSize = "small" }: PersonRowProps) => {
	const rowRef = useRef<HTMLDivElement>(null)

	const scroll = (direction: "left" | "right") => {
		if (rowRef.current) {
			const scrollAmount = direction === "left" ? -400 : 400
			rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
		}
	}

	if (!people || people.length === 0) return null

	return (
		<section className='relative py-6 group/row'>
			<h2 className='text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-8 text-center'>
				{title}
			</h2>

			<div className='relative'>
				<button
					onClick={() => scroll("left")}
					className='absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300'
				>
					<ChevronLeft size={24} />
				</button>

				<div
					ref={rowRef}
					className='flex justify-center gap-3 overflow-x-auto scrollbar-hide px-14 md:px-16 lg:px-20 pb-4'
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				>
					{people.map((person) => (
						<PersonCard key={person.id} person={person} size={cardSize} />
					))}
				</div>

				<button
					onClick={() => scroll("right")}
					className='absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300'
				>
					<ChevronRight size={24} />
				</button>
			</div>
		</section>
	)
}

export default PersonRow
