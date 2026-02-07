import { Footer, MovieCard, Navbar } from "@/components"
import {
	Bell,
	ChevronRight,
	Clock,
	CreditCard,
	Edit2,
	Film,
	Heart,
	LogOut,
	Settings,
	Shield,
	Star,
	Tv,
	User,
} from "lucide-react"
import { useState } from "react"

// Mock user data - in a real app this would come from authentication
const mockUser = {
	name: "John Doe",
	email: "johndoe@example.com",
	avatar: null,
	memberSince: "January 2023",
	plan: "Premium",
}

// Mock watchlist and favorites
const mockWatchlist = [
	{
		id: 550,
		title: "Fight Club",
		poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
		vote_average: 8.4,
		release_date: "1999-10-15",
		genre_ids: [18],
	},
	{
		id: 278,
		title: "The Shawshank Redemption",
		poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
		vote_average: 8.7,
		release_date: "1994-09-23",
		genre_ids: [18, 80],
	},
	{
		id: 238,
		title: "The Godfather",
		poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
		vote_average: 8.7,
		release_date: "1972-03-14",
		genre_ids: [18, 80],
	},
]

type TabType = "overview" | "watchlist" | "favorites" | "settings"

const ProfilePage = () => {
	const [activeTab, setActiveTab] = useState<TabType>("overview")
	const [user] = useState(mockUser)

	const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
		{ key: "overview", label: "Overview", icon: <User size={18} /> },
		{ key: "watchlist", label: "My List", icon: <Clock size={18} /> },
		{ key: "favorites", label: "Favorites", icon: <Heart size={18} /> },
		{ key: "settings", label: "Settings", icon: <Settings size={18} /> },
	]

	const menuItems = [
		{
			icon: <Bell size={20} />,
			label: "Notifications",
			description: "Manage your notification preferences",
		},
		{
			icon: <Shield size={20} />,
			label: "Privacy & Security",
			description: "Control your privacy settings",
		},
		{
			icon: <CreditCard size={20} />,
			label: "Subscription",
			description: "Manage your subscription plan",
		},
	]

	const stats = [
		{ label: "Movies Watched", value: 156, icon: <Film size={24} /> },
		{ label: "TV Shows", value: 42, icon: <Tv size={24} /> },
		{
			label: "Watchlist",
			value: mockWatchlist.length,
			icon: <Clock size={24} />,
		},
		{ label: "Reviews", value: 23, icon: <Star size={24} /> },
	]

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-950 to-black'>
			<Navbar />

			{/* Profile Header */}
			<div className='relative pt-20 pb-8 md:pt-24 overflow-hidden'>
				{/* Background */}
				<div className='absolute inset-0'>
					<div className='absolute inset-0 bg-gradient-to-r from-red-900/20 via-purple-900/20 to-blue-900/20' />
					<div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent' />
				</div>

				<div className='relative max-w-7xl mx-auto px-4 md:px-8'>
					<div className='flex flex-col md:flex-row items-center md:items-end gap-6 pb-8'>
						{/* Avatar */}
						<div className='relative group'>
							<div className='w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-5xl md:text-6xl font-bold shadow-2xl shadow-red-600/30'>
								{user.avatar ? (
									<img
										src={user.avatar}
										alt={user.name}
										className='w-full h-full rounded-full object-cover'
									/>
								) : (
									user.name.charAt(0).toUpperCase()
								)}
							</div>
							<button className='absolute bottom-2 right-2 p-2 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20'>
								<Edit2 size={16} className='text-white' />
							</button>
						</div>

						{/* User Info */}
						<div className='text-center md:text-left'>
							<h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2'>
								{user.name}
							</h1>
							<p className='text-gray-400 mb-2'>{user.email}</p>
							<div className='flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm'>
								<span className='px-3 py-1 bg-red-600/20 text-red-400 rounded-full font-medium'>
									{user.plan} Member
								</span>
								<span className='text-gray-500'>
									Member since {user.memberSince}
								</span>
							</div>
						</div>
					</div>

					{/* Stats */}
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
						{stats.map((stat) => (
							<div
								key={stat.label}
								className='bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300'
							>
								<div className='flex items-center gap-3 mb-2'>
									<div className='text-red-500'>{stat.icon}</div>
								</div>
								<p className='text-2xl md:text-3xl font-bold text-white'>
									{stat.value}
								</p>
								<p className='text-gray-400 text-sm'>{stat.label}</p>
							</div>
						))}
					</div>

					{/* Tabs */}
					<div className='flex gap-2 overflow-x-auto pb-4 scrollbar-hide'>
						{tabs.map((tab) => (
							<button
								key={tab.key}
								onClick={() => setActiveTab(tab.key)}
								className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
									activeTab === tab.key
										? "bg-red-600 text-white shadow-lg shadow-red-600/30"
										: "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
								}`}
							>
								{tab.icon}
								{tab.label}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Content */}
			<div className='max-w-7xl mx-auto px-4 md:px-8 pb-12'>
				{/* Overview Tab */}
				{activeTab === "overview" && (
					<div className='space-y-8'>
						{/* Continue Watching */}
						<div>
							<div className='flex items-center justify-center gap-4 mb-4'>
								<h2 className='text-xl md:text-2xl font-bold text-white'>
									Continue Watching
								</h2>
								<button className='text-red-500 hover:text-red-400 text-sm font-medium'>
									See All
								</button>
							</div>
							<div className='flex flex-wrap justify-center gap-4'>
								{mockWatchlist.slice(0, 5).map((movie) => (
									<MovieCard
										key={movie.id}
										item={movie as any}
										type='movie'
										size='small'
									/>
								))}
							</div>
						</div>

						{/* Quick Actions */}
						<div>
							<h2 className='text-xl md:text-2xl font-bold text-white mb-4'>
								Account Settings
							</h2>
							<div className='space-y-3'>
								{menuItems.map((item) => (
									<button
										key={item.label}
										className='w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300 group'
									>
										<div className='flex items-center gap-4'>
											<div className='p-2 bg-white/5 rounded-lg text-gray-400 group-hover:text-red-500 transition-colors'>
												{item.icon}
											</div>
											<div className='text-left'>
												<p className='text-white font-medium'>{item.label}</p>
												<p className='text-gray-500 text-sm'>
													{item.description}
												</p>
											</div>
										</div>
										<ChevronRight
											size={20}
											className='text-gray-500 group-hover:text-white transition-colors'
										/>
									</button>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Watchlist Tab */}
				{activeTab === "watchlist" && (
					<div>
						<div className='flex items-center justify-center mb-6'>
							<h2 className='text-xl md:text-2xl font-bold text-white'>
								My List ({mockWatchlist.length})
							</h2>
						</div>
						{mockWatchlist.length > 0 ? (
							<div className='flex flex-wrap justify-center gap-4 md:gap-6'>
								{mockWatchlist.map((movie) => (
									<MovieCard
										key={movie.id}
										item={movie as any}
										type='movie'
										size='small'
									/>
								))}
							</div>
						) : (
							<div className='text-center py-20'>
								<Clock size={48} className='mx-auto text-gray-600 mb-4' />
								<p className='text-gray-400 text-lg'>Your watchlist is empty</p>
								<p className='text-gray-500 text-sm mt-2'>
									Add movies and TV shows to watch later
								</p>
							</div>
						)}
					</div>
				)}

				{/* Favorites Tab */}
				{activeTab === "favorites" && (
					<div>
						<div className='flex items-center justify-between mb-6'>
							<h2 className='text-xl md:text-2xl font-bold text-white'>
								Favorites
							</h2>
						</div>
						<div className='text-center py-20'>
							<Heart size={48} className='mx-auto text-gray-600 mb-4' />
							<p className='text-gray-400 text-lg'>No favorites yet</p>
							<p className='text-gray-500 text-sm mt-2'>
								Heart movies and shows to add them here
							</p>
						</div>
					</div>
				)}

				{/* Settings Tab */}
				{activeTab === "settings" && (
					<div className='max-w-2xl space-y-6'>
						{/* Profile Settings */}
						<div className='bg-white/5 rounded-2xl p-6 border border-white/10'>
							<h3 className='text-lg font-bold text-white mb-4'>
								Profile Information
							</h3>
							<div className='space-y-4'>
								<div>
									<label className='block text-gray-400 text-sm mb-2'>
										Display Name
									</label>
									<input
										type='text'
										defaultValue={user.name}
										className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors'
									/>
								</div>
								<div>
									<label className='block text-gray-400 text-sm mb-2'>
										Email
									</label>
									<input
										type='email'
										defaultValue={user.email}
										className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors'
									/>
								</div>
								<button className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors'>
									Save Changes
								</button>
							</div>
						</div>

						{/* Preferences */}
						<div className='bg-white/5 rounded-2xl p-6 border border-white/10'>
							<h3 className='text-lg font-bold text-white mb-4'>Preferences</h3>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div>
										<p className='text-white font-medium'>
											Autoplay next episode
										</p>
										<p className='text-gray-500 text-sm'>
											Automatically play the next episode in a series
										</p>
									</div>
									<button className='w-12 h-6 bg-red-600 rounded-full relative'>
										<span className='absolute right-1 top-1 w-4 h-4 bg-white rounded-full' />
									</button>
								</div>
								<div className='flex items-center justify-between'>
									<div>
										<p className='text-white font-medium'>Autoplay previews</p>
										<p className='text-gray-500 text-sm'>
											Autoplay previews while browsing
										</p>
									</div>
									<button className='w-12 h-6 bg-gray-600 rounded-full relative'>
										<span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full' />
									</button>
								</div>
							</div>
						</div>

						{/* Danger Zone */}
						<div className='bg-red-950/30 rounded-2xl p-6 border border-red-900/30'>
							<h3 className='text-lg font-bold text-white mb-4'>Danger Zone</h3>
							<p className='text-gray-400 text-sm mb-4'>
								Once you delete your account, there is no going back. Please be
								certain.
							</p>
							<button className='flex items-center gap-2 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-500 rounded-xl font-semibold transition-colors'>
								<LogOut size={18} />
								Sign Out
							</button>
						</div>
					</div>
				)}
			</div>

			<Footer />
		</div>
	)
}

export default ProfilePage
