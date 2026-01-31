import {
	GenrePage,
	HomePage,
	MovieDetailPage,
	MoviesPage,
	PeoplePage,
	PersonDetailPage,
	ProfilePage,
	SearchPage,
	TvDetailPage,
	TvShowsPage,
} from "@/pages"
import { Route, Routes } from "react-router-dom"

function App() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/movies' element={<MoviesPage />} />
			<Route path='/tv' element={<TvShowsPage />} />
			<Route path='/movie/:id' element={<MovieDetailPage />} />
			<Route path='/tv/:id' element={<TvDetailPage />} />
			<Route path='/person/:id' element={<PersonDetailPage />} />
			<Route path='/people' element={<PeoplePage />} />
			<Route path='/search' element={<SearchPage />} />
			<Route path='/genre/:id' element={<GenrePage />} />
			<Route path='/profile' element={<ProfilePage />} />
		</Routes>
	)
}

export default App
