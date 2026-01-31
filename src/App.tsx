import { ScrollToTop } from "@/components"
import {
	ContactPage,
	FAQPage,
	GenrePage,
	HelpCenterPage,
	HomePage,
	MovieDetailPage,
	MoviesPage,
	PeoplePage,
	PersonDetailPage,
	ProfilePage,
	SearchPage,
	TermsPage,
	TvDetailPage,
	TvShowsPage,
} from "@/pages"
import { Route, Routes } from "react-router-dom"

function App() {
	return (
		<>
			<ScrollToTop />
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
				<Route path='/faq' element={<FAQPage />} />
				<Route path='/help' element={<HelpCenterPage />} />
				<Route path='/contact' element={<ContactPage />} />
				<Route path='/terms' element={<TermsPage />} />
			</Routes>
		</>
	)
}

export default App
