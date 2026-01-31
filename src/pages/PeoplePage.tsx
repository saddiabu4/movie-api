import { getPopularPeople } from "@/api/people-lists/people-lists"
import { Footer, LoadingSpinner, Navbar, PersonCard } from "@/components"
import type { Person } from "@/types"
import { ChevronLeft, ChevronRight, Users } from "lucide-react"
import { useEffect, useState } from "react"

const PeoplePage = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [people, setPeople] = useState<Person[]>([])
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		const fetchPeople = async () => {
			try {
				setIsLoading(true)
				const response = await getPopularPeople({ page })
				setPeople(response?.results || [])
				setTotalPages(response?.total_pages || 1)
			} catch (error) {
				console.error("Error fetching people:", error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchPeople()
	}, [page])

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-950 to-black'>
			<Navbar />

			{/* Hero Header */}
			<div className='relative pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden'>
				{/* Background Pattern */}
				<div className='absolute inset-0 opacity-30'>
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]' />
				</div>

				<div className='relative max-w-7xl mx-auto px-4 md:px-8'>
					{/* Page Title */}
					<div className='flex items-center gap-4 mb-4'>
						<div className='p-3 bg-blue-600/20 rounded-2xl'>
							<Users size={32} className='text-blue-500' />
						</div>
						<div>
							<h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-white'>
								Popular People
							</h1>
							<p className='text-gray-400 mt-1'>
								Discover trending actors, directors, and more
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* People Grid */}
			<div className='max-w-7xl mx-auto px-4 md:px-8 pb-12'>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<>
						{/* Results Count */}
						<div className='flex items-center justify-between mb-6'>
							<p className='text-gray-400 text-sm'>
								Showing{" "}
								<span className='text-white font-semibold'>
									{people.length}
								</span>{" "}
								popular people
							</p>
							<p className='text-gray-500 text-sm'>
								Page {page} of {Math.min(totalPages, 500)}
							</p>
						</div>

						{/* Grid */}
						<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
							{people.map((person, index) => (
								<div
									key={person.id}
									className='animate-fade-in'
									style={{ animationDelay: `${index * 0.05}s` }}
								>
									<PersonCard person={person} />
								</div>
							))}
						</div>

						{/* Empty State */}
						{people.length === 0 && (
							<div className='text-center py-20'>
								<div className='w-20 h-20 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center'>
									<Users size={40} className='text-gray-600' />
								</div>
								<h3 className='text-white text-xl font-semibold mb-2'>
									No people found
								</h3>
								<p className='text-gray-400'>Try refreshing the page</p>
							</div>
						)}

						{/* Pagination */}
						{totalPages > 1 && people.length > 0 && (
							<div className='flex justify-center items-center gap-4 mt-12'>
								<button
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									disabled={page === 1}
									className='flex items-center gap-2 px-5 py-3 bg-white/5 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all duration-300 border border-white/10'
								>
									<ChevronLeft size={18} />
									<span className='hidden sm:inline'>Previous</span>
								</button>

								{/* Page Numbers */}
								<div className='flex items-center gap-2'>
									{[...Array(Math.min(5, totalPages))].map((_, i) => {
										const pageNum =
											Math.max(1, Math.min(page - 2 + i, totalPages - 4)) + i
										if (pageNum > totalPages || pageNum < 1) return null
										return (
											<button
												key={pageNum}
												onClick={() => setPage(pageNum)}
												className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
													page === pageNum
														? "bg-blue-600 text-white"
														: "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
												}`}
											>
												{pageNum}
											</button>
										)
									})}
								</div>

								<button
									onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
									disabled={page >= Math.min(totalPages, 500)}
									className='flex items-center gap-2 px-5 py-3 bg-white/5 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all duration-300 border border-white/10'
								>
									<span className='hidden sm:inline'>Next</span>
									<ChevronRight size={18} />
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

export default PeoplePage
