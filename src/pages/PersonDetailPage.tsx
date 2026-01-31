import {
	getPersonCombinedCredits,
	getPersonDetails,
	getPersonImages,
} from "@/api/people/people"
import { Footer, LoadingSpinner, MovieCard, Navbar } from "@/components"
import type { Movie, PersonDetails, TvSeries } from "@/types"
import { formatDate, getProfileUrl, truncateText } from "@/utils/helpers"
import { ArrowLeft, Calendar, Film, MapPin, Tv, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const PersonDetailPage = () => {
	const { id } = useParams<{ id: string }>()
	const [isLoading, setIsLoading] = useState(true)
	const [person, setPerson] = useState<PersonDetails | null>(null)
	const [movieCredits, setMovieCredits] = useState<Movie[]>([])
	const [tvCredits, setTvCredits] = useState<TvSeries[]>([])
	const [images, setImages] = useState<{ file_path: string }[]>([])
	const [showFullBio, setShowFullBio] = useState(false)
	const [activeTab, setActiveTab] = useState<"movies" | "tv">("movies")

	useEffect(() => {
		const fetchData = async () => {
			if (!id) return

			try {
				setIsLoading(true)
				const [personRes, creditsRes, imagesRes] = await Promise.all([
					getPersonDetails(Number(id)),
					getPersonCombinedCredits(Number(id)),
					getPersonImages(Number(id)),
				])

				setPerson(personRes)

				const movies = creditsRes.cast
					.filter(
						(item: Movie & { media_type: string }) =>
							item.media_type === "movie"
					)
					.sort((a: Movie, b: Movie) => b.popularity - a.popularity)
				const tvShows = creditsRes.cast
					.filter(
						(item: TvSeries & { media_type: string }) =>
							item.media_type === "tv"
					)
					.sort((a: TvSeries, b: TvSeries) => b.popularity - a.popularity)

				setMovieCredits(movies)
				setTvCredits(tvShows)
				setImages(imagesRes.profiles || [])
			} catch (error) {
				console.error("Error fetching person details:", error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
		window.scrollTo(0, 0)
	}, [id])

	const calculateAge = (birthday: string, deathday?: string | null) => {
		const birth = new Date(birthday)
		const end = deathday ? new Date(deathday) : new Date()
		const age = Math.floor(
			(end.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
		)
		return age
	}

	if (isLoading) {
		return (
			<div className='min-h-screen bg-black'>
				<Navbar />
				<LoadingSpinner />
			</div>
		)
	}

	if (!person) {
		return (
			<div className='min-h-screen bg-black'>
				<Navbar />
				<div className='flex flex-col items-center justify-center min-h-[60vh]'>
					<div className='text-6xl mb-4'>👤</div>
					<h2 className='text-white text-2xl font-bold mb-2'>
						Person not found
					</h2>
					<p className='text-gray-400 mb-6'>
						The person you're looking for doesn't exist.
					</p>
					<Link
						to='/people'
						className='px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors'
					>
						Browse People
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-950 to-black'>
			<Navbar />

			{/* Hero Section */}
			<div className='relative'>
				{/* Background Gradient */}
				<div className='absolute inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-transparent' />

				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12'>
					{/* Back Button */}
					<Link
						to='/people'
						className='inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group'
					>
						<ArrowLeft
							size={20}
							className='group-hover:-translate-x-1 transition-transform'
						/>
						<span>Back to People</span>
					</Link>

					<div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
						{/* Profile Section */}
						<div className='lg:w-1/3 space-y-6'>
							{/* Profile Image */}
							<div className='relative mx-auto lg:mx-0 w-64 md:w-72 lg:w-full max-w-sm'>
								<img
									src={getProfileUrl(person.profile_path, "h632")}
									alt={person.name}
									className='w-full rounded-2xl shadow-2xl shadow-blue-900/30'
								/>
							</div>

							{/* Personal Info Card */}
							<div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-4'>
								<h3 className='text-white text-lg font-bold mb-4'>
									Personal Info
								</h3>

								<div className='space-y-4'>
									<div>
										<p className='text-gray-500 text-xs uppercase tracking-wider'>
											Known For
										</p>
										<p className='text-white font-medium'>
											{person.known_for_department}
										</p>
									</div>

									{person.gender && (
										<div>
											<p className='text-gray-500 text-xs uppercase tracking-wider'>
												Gender
											</p>
											<p className='text-white font-medium'>
												{person.gender === 1
													? "Female"
													: person.gender === 2
													? "Male"
													: "Other"}
											</p>
										</div>
									)}

									{person.birthday && (
										<div>
											<p className='text-gray-500 text-xs uppercase tracking-wider'>
												Birthday
											</p>
											<p className='text-white font-medium flex items-center gap-2'>
												<Calendar size={14} className='text-blue-400' />
												{formatDate(person.birthday)}
												{!person.deathday && (
													<span className='text-gray-400'>
														({calculateAge(person.birthday)} years old)
													</span>
												)}
											</p>
										</div>
									)}

									{person.deathday && person.birthday && (
										<div>
											<p className='text-gray-500 text-xs uppercase tracking-wider'>
												Deathday
											</p>
											<p className='text-white font-medium flex items-center gap-2'>
												<Calendar size={14} className='text-gray-400' />
												{formatDate(person.deathday)}
												<span className='text-gray-400'>
													({calculateAge(person.birthday, person.deathday)}{" "}
													years old)
												</span>
											</p>
										</div>
									)}

									{person.place_of_birth && (
										<div>
											<p className='text-gray-500 text-xs uppercase tracking-wider'>
												Place of Birth
											</p>
											<p className='text-white font-medium flex items-center gap-2'>
												<MapPin size={14} className='text-blue-400' />
												{person.place_of_birth}
											</p>
										</div>
									)}
								</div>

								{person.also_known_as && person.also_known_as.length > 0 && (
									<div className='pt-4 border-t border-white/10'>
										<p className='text-gray-500 text-xs uppercase tracking-wider mb-2'>
											Also Known As
										</p>
										<div className='flex flex-wrap gap-2'>
											{person.also_known_as.slice(0, 5).map((name, index) => (
												<span
													key={index}
													className='px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-lg'
												>
													{name}
												</span>
											))}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Main Content */}
						<div className='flex-1 space-y-8'>
							{/* Name */}
							<div>
								<h1 className='text-4xl md:text-5xl lg:text-6xl font-black text-white'>
									{person.name}
								</h1>
								<p className='text-blue-400 text-lg mt-2'>
									{person.known_for_department}
								</p>
							</div>

							{/* Stats */}
							<div className='flex gap-6'>
								<div className='text-center'>
									<p className='text-3xl font-bold text-white'>
										{movieCredits.length}
									</p>
									<p className='text-gray-400 text-sm'>Movies</p>
								</div>
								<div className='text-center'>
									<p className='text-3xl font-bold text-white'>
										{tvCredits.length}
									</p>
									<p className='text-gray-400 text-sm'>TV Shows</p>
								</div>
								<div className='text-center'>
									<p className='text-3xl font-bold text-white'>
										{images.length}
									</p>
									<p className='text-gray-400 text-sm'>Photos</p>
								</div>
							</div>

							{/* Biography */}
							<div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
								<h3 className='text-white text-xl font-bold mb-4'>Biography</h3>
								{person.biography ? (
									<div>
										<p className='text-gray-300 leading-relaxed whitespace-pre-line'>
											{showFullBio
												? person.biography
												: truncateText(person.biography, 500)}
										</p>
										{person.biography.length > 500 && (
											<button
												onClick={() => setShowFullBio(!showFullBio)}
												className='text-blue-400 hover:text-blue-300 mt-3 font-medium transition-colors'
											>
												{showFullBio ? "Show Less" : "Read More"}
											</button>
										)}
									</div>
								) : (
									<p className='text-gray-500'>
										No biography available for {person.name}.
									</p>
								)}
							</div>

							{/* Photos */}
							{images.length > 0 && (
								<div>
									<h3 className='text-white text-xl font-bold mb-4'>Photos</h3>
									<div className='flex gap-3 overflow-x-auto pb-4 scrollbar-hide'>
										{images.slice(0, 10).map((image, index) => (
											<img
												key={index}
												src={getProfileUrl(image.file_path, "w185")}
												alt={`${person.name} photo ${index + 1}`}
												className='w-28 h-40 object-cover rounded-xl shrink-0 hover:scale-105 transition-transform cursor-pointer shadow-lg'
											/>
										))}
									</div>
								</div>
							)}

							{/* Credits Tabs */}
							<div>
								<div className='flex gap-2 mb-6'>
									<button
										onClick={() => setActiveTab("movies")}
										className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
											activeTab === "movies"
												? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
												: "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
										}`}
									>
										<Film size={18} />
										Movies ({movieCredits.length})
									</button>
									<button
										onClick={() => setActiveTab("tv")}
										className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
											activeTab === "tv"
												? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
												: "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
										}`}
									>
										<Tv size={18} />
										TV Shows ({tvCredits.length})
									</button>
								</div>

								{/* Credits Grid */}
								<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
									{(activeTab === "movies" ? movieCredits : tvCredits)
										.slice(0, 20)
										.map((item, index) => (
											<div
												key={item.id}
												className='animate-fade-in'
												style={{ animationDelay: `${index * 0.05}s` }}
											>
												<MovieCard
													item={item}
													type={activeTab === "movies" ? "movie" : "tv"}
												/>
											</div>
										))}
								</div>

								{((activeTab === "movies" && movieCredits.length === 0) ||
									(activeTab === "tv" && tvCredits.length === 0)) && (
									<div className='text-center py-12 bg-white/5 rounded-2xl'>
										<User size={48} className='mx-auto text-gray-600 mb-4' />
										<p className='text-gray-500'>
											No {activeTab === "movies" ? "movies" : "TV shows"} found.
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default PersonDetailPage
