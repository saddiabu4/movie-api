import {
	Facebook,
	Github,
	Heart,
	Instagram,
	Mail,
	Twitter,
	Youtube,
} from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
	const footerLinks = [
		{
			title: "Navigation",
			links: [
				{ name: "Home", path: "/" },
				{ name: "Movies", path: "/movies" },
				{ name: "TV Shows", path: "/tv" },
				{ name: "People", path: "/people" },
			],
		},
		{
			title: "Categories",
			links: [
				{ name: "Action", path: "/genre/28" },
				{ name: "Comedy", path: "/genre/35" },
				{ name: "Drama", path: "/genre/18" },
				{ name: "Horror", path: "/genre/27" },
			],
		},
		{
			title: "Support",
			links: [
				{ name: "FAQ", path: "/faq" },
				{ name: "Help Center", path: "/help" },
				{ name: "Contact Us", path: "/contact" },
				{ name: "Terms of Use", path: "/terms" },
			],
		},
	]

	const socialLinks = [
		{ icon: Facebook, href: "#", label: "Facebook" },
		{ icon: Instagram, href: "#", label: "Instagram" },
		{ icon: Twitter, href: "#", label: "Twitter" },
		{ icon: Youtube, href: "#", label: "Youtube" },
		{ icon: Github, href: "#", label: "Github" },
	]

	return (
		<footer className='relative bg-gradient-to-b from-transparent via-gray-950 to-black mt-16 overflow-hidden'>
			{/* Background Pattern */}
			<div className='absolute inset-0 opacity-5'>
				<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.3),transparent_50%)]' />
			</div>

			{/* Top Border Gradient */}
			<div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent' />

			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8'>
				{/* Main Footer Content */}
				<div className='grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12'>
					{/* Brand Section */}
					<div className='col-span-2'>
						<Link to='/' className='inline-block group'>
							<h2 className='text-red-600 text-3xl font-black tracking-wider logo-glow transition-all group-hover:scale-105'>
								NETFLIX
							</h2>
						</Link>
						<p className='text-gray-400 text-sm mt-4 max-w-xs leading-relaxed'>
							Discover unlimited movies, TV shows, and exclusive content. Stream
							anytime, anywhere on any device.
						</p>

						{/* Social Links */}
						<div className='flex items-center gap-3 mt-6'>
							{socialLinks.map((social) => (
								<a
									key={social.label}
									href={social.href}
									aria-label={social.label}
									className='p-2.5 bg-white/5 hover:bg-red-600 rounded-lg text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1'
								>
									<social.icon size={18} />
								</a>
							))}
						</div>
					</div>

					{/* Links Sections */}
					{footerLinks.map((section) => (
						<div key={section.title}>
							<h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>
								{section.title}
							</h3>
							<ul className='space-y-3'>
								{section.links.map((link) => (
									<li key={link.name}>
										<Link
											to={link.path}
											className='text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:translate-x-1 inline-block'
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Newsletter Section */}
				<div className='mt-12 p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
						<div className='flex-1'>
							<h3 className='text-white font-semibold text-lg mb-1'>
								Subscribe to Newsletter
							</h3>
							<p className='text-gray-400 text-sm'>
								Get the latest updates on new releases and exclusive content.
							</p>
						</div>
						<div className='flex-1 max-w-md'>
							<form className='flex gap-2'>
								<div className='relative flex-1'>
									<Mail
										size={18}
										className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'
									/>
									<input
										type='email'
										placeholder='Enter your email'
										className='w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition-colors'
									/>
								</div>
								<button
									type='submit'
									className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 whitespace-nowrap'
								>
									Subscribe
								</button>
							</form>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className='mt-12 pt-8 border-t border-white/10'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
						<div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 text-xs'>
							<Link
								to='/privacy'
								className='hover:text-white transition-colors'
							>
								Privacy Policy
							</Link>
							<Link to='/terms' className='hover:text-white transition-colors'>
								Terms of Service
							</Link>
							<Link
								to='/cookies'
								className='hover:text-white transition-colors'
							>
								Cookie Preferences
							</Link>
							<Link to='/legal' className='hover:text-white transition-colors'>
								Legal Notices
							</Link>
						</div>

						<p className='text-gray-500 text-xs flex items-center gap-1'>
							Made with{" "}
							<Heart
								size={12}
								className='text-red-500 fill-red-500 animate-pulse'
							/>{" "}
							by Netflix Clone
						</p>
					</div>

					<div className='mt-6 text-center'>
						<p className='text-gray-600 text-xs'>
							© {new Date().getFullYear()} Netflix Clone. All rights reserved.
							<br className='sm:hidden' />
							<span className='hidden sm:inline'> • </span>
							Data provided by{" "}
							<a
								href='https://www.themoviedb.org'
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-400 hover:text-blue-300 hover:underline transition-colors'
							>
								TMDB
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
