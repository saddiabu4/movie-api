import { Footer, Navbar } from "@/components"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface FAQItem {
	question: string
	answer: string
}

const FAQPage = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const faqs: FAQItem[] = [
		{
			question: "Atif nima?",
			answer:
				"Atif - bu filmlar, seriallar, anime, hujjatli filmlar va boshqa turli xil kontentni taklif qiluvchi striminig xizmati. Siz xohlaganingizcha va xohlagan vaqtingizda reklama-bepul tomosha qilishingiz mumkin - barchasi past oylik to'lov evaziga.",
		},
		{
			question: "Atif qancha turadi?",
			answer:
				"Atif-ni smartfon, planshet, Smart TV, noutbuk yoki striminig qurilmangizda oyiga bir past narxda tomosha qiling. Rejalar oyiga $6.99 dan $22.99 gacha. Qo'shimcha xarajatlar yoki shartnomalar yo'q.",
		},
		{
			question: "Qayerda tomosha qilsam bo'ladi?",
			answer:
				"Istalgan joyda, istalgan vaqtda tomosha qiling. Shaxsiy Atif hisobingiz bilan tizimga kiring va atif.uz orqali kompyuteringizda yoki Atif ilovasini o'rnatgan har qanday internet qurilmasida - smart televizorlar, smartfonlar, planshetlar, striminig media pleyerlar va o'yin konsollarida darhol tomosha qiling.",
		},
		{
			question: "Qanday bekor qilaman?",
			answer:
				"Atif moslashuvchan. Bezovta qiladigan shartnomalar va majburiyatlar yo'q. Siz hisobingizni ikki marta bosish orqali onlayn tarzda bekor qilishingiz mumkin. Bekor qilish to'lovlari yo'q - hisobingizni istalgan vaqt boshlang yoki to'xtating.",
		},
		{
			question: "Atif-da nimalarni tomosha qilsam bo'ladi?",
			answer:
				"Atif keng kutubxonaga ega bo'lib, u uzoq metrajli filmlar, hujjatli filmlar, seriallar, anime, mukofotga sazovor bo'lgan Atif originallari va boshqalarni o'z ichiga oladi. Xohlaganingizcha, xohlagan vaqtingizda tomosha qiling.",
		},
		{
			question: "Atif bolalar uchun yaxshimi?",
			answer:
				"Atif Kids tajribasi ota-onalar uchun bolalarning oilaviy ko'ngilochar kontentdan zavqlanishini nazorat qilish imkonini beruvchi a'zoligingizga kiritilgan. Bolalar profillari PIN-kod bilan himoyalangan ota-ona nazorati bilan ta'minlangan bo'lib, bu sizga bolalar tomosha qilishi mumkin bo'lgan kontent darajasini cheklash va ular uchun mos bo'lmagan sarlavhalarni bloklash imkonini beradi.",
		},
	]

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white'>
			<Navbar />

			<div className='max-w-4xl mx-auto px-4 py-24'>
				<h1 className='text-4xl md:text-5xl font-bold text-center mb-4'>
					Ko'p so'raladigan savollar
				</h1>
				<p className='text-gray-400 text-center mb-12'>
					Atif haqida ko'p beriladigan savollarga javoblar
				</p>

				<div className='space-y-4'>
					{faqs.map((faq, index) => (
						<div
							key={index}
							className='bg-gray-800/50 rounded-lg overflow-hidden'
						>
							<button
								className='w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/50 transition-colors'
								onClick={() => toggleFAQ(index)}
							>
								<span className='text-lg font-medium'>{faq.question}</span>
								{openIndex === index ? (
									<ChevronUp className='text-red-500' />
								) : (
									<ChevronDown className='text-gray-400' />
								)}
							</button>
							{openIndex === index && (
								<div className='px-6 pb-4'>
									<p className='text-gray-300 leading-relaxed'>{faq.answer}</p>
								</div>
							)}
						</div>
					))}
				</div>

				<div className='mt-12 text-center'>
					<p className='text-gray-400 mb-4'>
						Savolingizga javob topa olmadingizmi?
					</p>
					<a
						href='/contact'
						className='inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors'
					>
						Biz bilan bog'laning
					</a>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default FAQPage
