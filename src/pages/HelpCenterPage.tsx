import { Footer, Navbar } from "@/components"
import {
	CreditCard,
	HelpCircle,
	Monitor,
	PlayCircle,
	Settings,
	Shield,
	User,
	Wifi,
} from "lucide-react"
import { Link } from "react-router-dom"

const HelpCenterPage = () => {
	const helpCategories = [
		{
			icon: <PlayCircle className='w-8 h-8' />,
			title: "Boshlash",
			description: "Atif-dan qanday foydalanishni o'rganing",
			links: [
				"Atif-ga qanday ro'yxatdan o'tish mumkin",
				"Birinchi marta sozlash",
				"Profil yaratish",
			],
		},
		{
			icon: <CreditCard className='w-8 h-8' />,
			title: "Hisob va to'lov",
			description: "Hisobingiz va to'lov variantlaringizni boshqaring",
			links: [
				"Rejangizni o'zgartirish",
				"To'lov usulini yangilash",
				"A'zolikni bekor qilish",
			],
		},
		{
			icon: <Monitor className='w-8 h-8' />,
			title: "Tomosha qilish",
			description: "Turli qurilmalarda kontentni tomosha qiling",
			links: [
				"Qo'llab-quvvatlanadigan qurilmalar",
				"Video sifatini sozlash",
				"Yuklab olish va oflayn tomosha",
			],
		},
		{
			icon: <Wifi className='w-8 h-8' />,
			title: "Texnik muammolar",
			description: "Umumiy texnik muammolarni hal qilish",
			links: ["Striminig muammolari", "Ilova xatolari", "Ulanish muammolari"],
		},
		{
			icon: <User className='w-8 h-8' />,
			title: "Profillar",
			description: "Profillaringizni sozlang va boshqaring",
			links: [
				"Profil qo'shish yoki o'chirish",
				"Profil rasmini o'zgartirish",
				"Til sozlamalari",
			],
		},
		{
			icon: <Shield className='w-8 h-8' />,
			title: "Xavfsizlik",
			description: "Hisobingizni xavfsiz saqlang",
			links: [
				"Parolni o'zgartirish",
				"Qurilmalarni chiqarish",
				"Xavfsizlik haqida maslahatlar",
			],
		},
		{
			icon: <Settings className='w-8 h-8' />,
			title: "Sozlamalar",
			description: "Atif tajribangizni moslashtiring",
			links: ["Subtitrlar va audio", "Ijtimoiy ulashish", "Bildirishnomalar"],
		},
		{
			icon: <HelpCircle className='w-8 h-8' />,
			title: "Qo'shimcha yordam",
			description: "Boshqa savollaringiz uchun",
			links: [
				"Jonli chat qo'llab-quvvatlashi",
				"Telefon qo'llab-quvvatlashi",
				"Jamoatchilik forumi",
			],
		},
	]

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white'>
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 py-24'>
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Yordam markazi
					</h1>
					<p className='text-gray-400 text-lg'>
						Atif haqida barcha savollaringizga javob toping
					</p>
				</div>

				{/* Search Box */}
				<div className='max-w-2xl mx-auto mb-12'>
					<div className='relative'>
						<input
							type='text'
							placeholder='Yordam mavzularini qidiring...'
							className='w-full bg-gray-800 border border-gray-700 rounded-lg px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors'
						/>
						<button className='absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors'>
							Qidirish
						</button>
					</div>
				</div>

				{/* Help Categories Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{helpCategories.map((category, index) => (
						<div
							key={index}
							className='bg-gray-800/50 rounded-lg p-6 hover:bg-gray-700/50 transition-colors cursor-pointer group'
						>
							<div className='text-red-500 mb-4 group-hover:scale-110 transition-transform'>
								{category.icon}
							</div>
							<h3 className='text-xl font-semibold mb-2'>{category.title}</h3>
							<p className='text-gray-400 text-sm mb-4'>
								{category.description}
							</p>
							<ul className='space-y-2'>
								{category.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										<a
											href='#'
											className='text-gray-300 text-sm hover:text-red-500 transition-colors'
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Contact Section */}
				<div className='mt-16 bg-gray-800/30 rounded-xl p-8 text-center'>
					<h2 className='text-2xl font-bold mb-4'>Hali ham yordam kerakmi?</h2>
					<p className='text-gray-400 mb-6'>
						Bizning qo'llab-quvvatlash jamoamiz sizga 24/7 yordam berishga
						tayyor
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link
							to='/contact'
							className='bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors'
						>
							Biz bilan bog'laning
						</Link>
						<Link
							to='/faq'
							className='bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors'
						>
							FAQ ko'rish
						</Link>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default HelpCenterPage
