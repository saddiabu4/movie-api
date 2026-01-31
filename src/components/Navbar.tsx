import { Bell, ChevronDown, Menu, Search, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")
	const location = useLocation()

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const navLinks = [
		{ name: "Home", path: "/" },
		{ name: "Movies", path: "/movies" },
		{ name: "TV Shows", path: "/tv" },
		{ name: "People", path: "/people" },
	]

	const isActive = (path: string) => location.pathname === path

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				isScrolled
					? "bg-black/95 backdrop-blur-xl shadow-2xl shadow-black/50"
					: "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
			}`}
		>
			<div className='max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16 md:h-20'>
					{/* Logo */}
					<Link to='/' className='flex-shrink-0 group'>
						<h1 className='text-red-600 text-2xl md:text-3xl font-black tracking-wider logo-glow transition-all duration-300 group-hover:scale-105'>
							ATIF
						</h1>
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-1 lg:space-x-2'>
						{navLinks.map((link) => (
							<Link
								key={link.name}
								to={link.path}
								className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
									isActive(link.path)
										? "text-white bg-white/10"
										: "text-gray-300 hover:text-white hover:bg-white/5"
								}`}
							>
								{link.name}
								{isActive(link.path) && (
									<span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full' />
								)}
							</Link>
						))}
					</div>

					{/* Right Side Icons */}
					<div className='hidden md:flex items-center gap-2'>
						{/* Search */}
						<div className='relative'>
							{isSearchOpen ? (
								<div className='flex items-center animate-scale-in'>
									<input
										type='text'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										placeholder='Search...'
										className='w-48 lg:w-64 px-4 py-2 bg-black/80 border border-white/20 rounded-l-lg text-white text-sm focus:outline-none focus:border-red-500 transition-all'
										autoFocus
										onKeyDown={(e) => {
											if (e.key === "Enter" && searchQuery.trim()) {
												window.location.href = `/search?q=${searchQuery}`
											}
										}}
									/>
									<button
										onClick={() => {
											if (searchQuery.trim()) {
												window.location.href = `/search?q=${searchQuery}`
											}
										}}
										className='px-3 py-2 bg-red-600 hover:bg-red-700 rounded-r-lg transition-colors'
									>
										<Search size={18} />
									</button>
									<button
										onClick={() => {
											setIsSearchOpen(false)
											setSearchQuery("")
										}}
										className='ml-2 p-2 text-gray-400 hover:text-white transition-colors'
									>
										<X size={18} />
									</button>
								</div>
							) : (
								<button
									onClick={() => setIsSearchOpen(true)}
									className='p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300'
								>
									<Search size={20} />
								</button>
							)}
						</div>

						{/* Notifications */}
						<button className='relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300'>
							<Bell size={20} />
							<span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse' />
						</button>

						{/* Profile */}
						<Link
							to='/profile'
							className='flex items-center gap-2 p-1.5 hover:bg-white/10 rounded-lg transition-all duration-300 group'
						>
							<div className='w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-md flex items-center justify-center'>
								<User size={18} className='text-white' />
							</div>
							<ChevronDown
								size={16}
								className='text-gray-400 group-hover:text-white transition-colors hidden lg:block'
							/>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className='flex md:hidden items-center gap-2'>
						<Link
							to='/search'
							className='p-2 text-white hover:bg-white/10 rounded-full transition-colors'
						>
							<Search size={22} />
						</Link>
						<button
							className='p-2 text-white hover:bg-white/10 rounded-full transition-colors'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
					isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className='bg-black/98 backdrop-blur-xl border-t border-white/10'>
					<div className='px-4 py-4 space-y-1'>
						{navLinks.map((link, index) => (
							<Link
								key={link.name}
								to={link.path}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
									isActive(link.path)
										? "bg-red-600/20 text-white border-l-2 border-red-500"
										: "text-gray-300 hover:text-white hover:bg-white/5"
								}`}
								onClick={() => setIsMenuOpen(false)}
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<span className='font-medium'>{link.name}</span>
							</Link>
						))}
						<div className='pt-4 border-t border-white/10'>
							<Link
								to='/profile'
								className='flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all'
								onClick={() => setIsMenuOpen(false)}
							>
								<div className='w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-md flex items-center justify-center'>
									<User size={18} className='text-white' />
								</div>
								<span className='font-medium'>Profile</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
