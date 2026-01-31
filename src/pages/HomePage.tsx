import {
	getNowPlayingMovies,
	getPopularMovies,
	getTopRatedMovies,
	getUpcomingMovies,
} from "@/api/movie-lists/movie-lists"
import { getPopularPeople } from "@/api/people-lists/people-lists"
import {
	getTrendingAll,
	getTrendingMovies,
	getTrendingTv,
} from "@/api/trending/trending"
import {
	getAiringTodayTv,
	getOnTheAirTv,
	getPopularTv,
	getTopRatedTv,
} from "@/api/tv-series-lists/tv-series-lists"
import {
	Footer,
	HeroBanner,
	LoadingSpinner,
	MovieRow,
	Navbar,
	PersonRow,
} from "@/components"
import type { Movie, Person, TvSeries } from "@/types"
import { useEffect, useState } from "react"

const HomePage = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [trendingAll, setTrendingAll] = useState<(Movie | TvSeries)[]>([])
	const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
	const [trendingTv, setTrendingTv] = useState<TvSeries[]>([])
	const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
	const [popularMovies, setPopularMovies] = useState<Movie[]>([])
	const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
	const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
	const [airingTodayTv, setAiringTodayTv] = useState<TvSeries[]>([])
	const [popularTv, setPopularTv] = useState<TvSeries[]>([])
	const [topRatedTv, setTopRatedTv] = useState<TvSeries[]>([])
	const [onTheAirTv, setOnTheAirTv] = useState<TvSeries[]>([])
	const [popularPeople, setPopularPeople] = useState<Person[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const [
					trendingAllRes,
					trendingMoviesRes,
					trendingTvRes,
					nowPlayingRes,
					popularMoviesRes,
					topRatedMoviesRes,
					upcomingRes,
					airingTodayRes,
					popularTvRes,
					topRatedTvRes,
					onTheAirRes,
					popularPeopleRes,
				] = await Promise.all([
					getTrendingAll("day"),
					getTrendingMovies("week"),
					getTrendingTv("week"),
					getNowPlayingMovies(),
					getPopularMovies(),
					getTopRatedMovies(),
					getUpcomingMovies(),
					getAiringTodayTv(),
					getPopularTv(),
					getTopRatedTv(),
					getOnTheAirTv(),
					getPopularPeople(),
				])

				setTrendingAll(trendingAllRes?.results || [])
				setTrendingMovies(trendingMoviesRes?.results || [])
				setTrendingTv(trendingTvRes?.results || [])
				setNowPlayingMovies(nowPlayingRes?.results || [])
				setPopularMovies(popularMoviesRes?.results || [])
				setTopRatedMovies(topRatedMoviesRes?.results || [])
				setUpcomingMovies(upcomingRes?.results || [])
				setAiringTodayTv(airingTodayRes?.results || [])
				setPopularTv(popularTvRes?.results || [])
				setTopRatedTv(topRatedTvRes?.results || [])
				setOnTheAirTv(onTheAirRes?.results || [])
				setPopularPeople(popularPeopleRes?.results || [])
			} catch (error) {
				console.error("Error fetching home data:", error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gradient-to-b from-gray-950 to-black'>
				<Navbar />
				<LoadingSpinner />
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-950 to-black'>
			<Navbar />

			{/* Hero Banner with Trending */}
			<HeroBanner items={trendingAll.slice(0, 5) as any} type='movie' />

			{/* Movie & TV Rows */}
			<div className='relative -mt-24 md:-mt-32 z-10 space-y-2'>
				{/* Trending Section */}
				<div className='pb-4'>
					<MovieRow
						title='🔥 Trending Now'
						items={trendingAll.slice(0, 20)}
						type='movie'
					/>
				</div>

				{/* Movies Section */}
				<div className='py-4 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent'>
					<div className='px-4 md:px-8 lg:px-12 mb-6'>
						<h2 className='text-2xl md:text-3xl font-bold text-white flex items-center gap-3'>
							<span className='w-1 h-8 bg-red-600 rounded-full' />
							Movies
						</h2>
					</div>
					<MovieRow
						title='🎬 Trending Movies'
						items={trendingMovies}
						type='movie'
					/>
					<MovieRow
						title='🎥 Now Playing'
						items={nowPlayingMovies}
						type='movie'
					/>
					<MovieRow
						title='⭐ Popular Movies'
						items={popularMovies}
						type='movie'
					/>
					<MovieRow
						title='🏆 Top Rated Movies'
						items={topRatedMovies}
						type='movie'
					/>
					<MovieRow
						title='🎞️ Upcoming Movies'
						items={upcomingMovies}
						type='movie'
					/>
				</div>

				{/* TV Shows Section */}
				<div className='py-4 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent'>
					<div className='px-4 md:px-8 lg:px-12 mb-6'>
						<h2 className='text-2xl md:text-3xl font-bold text-white flex items-center gap-3'>
							<span className='w-1 h-8 bg-purple-600 rounded-full' />
							TV Shows
						</h2>
					</div>
					<MovieRow title='📺 Trending TV Shows' items={trendingTv} type='tv' />
					<MovieRow title='📡 Airing Today' items={airingTodayTv} type='tv' />
					<MovieRow title='💫 Popular TV Shows' items={popularTv} type='tv' />
					<MovieRow
						title='🌟 Top Rated TV Shows'
						items={topRatedTv}
						type='tv'
					/>
					<MovieRow title='📺 On The Air' items={onTheAirTv} type='tv' />
				</div>

				{/* People Section */}
				<div className='py-4'>
					<PersonRow title='👤 Popular People' people={popularPeople} />
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default HomePage
