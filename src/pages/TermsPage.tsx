import { Footer, Navbar } from "@/components"

const TermsPage = () => {
	const sections = [
		{
			title: "1. Qabul qilish va umumiy qoidalar",
			content: `Atif xizmatidan foydalanish orqali siz ushbu Foydalanish shartlarini qabul qilasiz. Agar siz ushbu shartlarga rozi bo'lmasangiz, iltimos xizmatimizdan foydalanmang.

Atif xizmati 18 yoshdan kattalar uchun mo'ljallangan. 18 yoshdan kichik foydalanuvchilar ota-onalar yoki vasiylar nazorati ostida foydalanishlari kerak.

Biz ushbu shartlarni istalgan vaqtda o'zgartirish huquqini saqlab qolamiz. O'zgarishlar haqida sizga email orqali xabar beramiz.`,
		},
		{
			title: "2. A'zolik va hisob",
			content: `Atif a'zoligi sizga turli xil kontentga kirish imkonini beradi. A'zolik turlari va narxlari vaqti-vaqti bilan o'zgarishi mumkin.

Hisobingiz faqat shaxsiy foydalanish uchun mo'ljallangan. Hisob ma'lumotlaringizni boshqa shaxslar bilan bo'lishish qat'iyan taqiqlanadi.

Siz hisobingiz orqali amalga oshiriladigan barcha harakatlar uchun javobgarsiz. Parolingizni xavfsiz saqlang va begonalarga bermang.`,
		},
		{
			title: "3. Xizmatdan foydalanish",
			content: `Atif xizmati faqat shaxsiy, tijorat maqsadida bo'lmagan foydalanish uchun mo'ljallangan.

Quyidagilar qat'iyan taqiqlanadi:
• Kontentni ko'chirish, tarqatish yoki sotish
• Texnik himoya choralarini chetlab o'tish
• Xizmatga zararli dasturlar yuborish
• Boshqa foydalanuvchilarga halaqit berish
• Soxta yoki aldamchi faoliyat yuritish

Atif ushbu qoidalarni buzgan foydalanuvchilarning hisoblarini bekor qilish huquqini saqlaydi.`,
		},
		{
			title: "4. Kontent va intellektual mulk",
			content: `Atif xizmatidagi barcha kontent Atif yoki litsenziya beruvchilarning mulki hisoblanadi. Kontent mualliflik huquqi qonunlari bilan himoyalangan.

Sizga faqat shaxsiy tomosha qilish uchun cheklangan, eksklyuziv bo'lmagan litsenziya beriladi.

Kontentni hech qanday shaklda qayta ishlab chiqarish, tarqatish yoki ommaviy ko'rsatish taqiqlanadi.`,
		},
		{
			title: "5. To'lovlar va bekor qilish",
			content: `A'zolik to'lovi avtomatik ravishda har oy yechib olinadi. To'lov sanasi siz ro'yxatdan o'tgan sanaga bog'liq.

A'zolikni istalgan vaqtda bekor qilishingiz mumkin. Bekor qilgandan so'ng, joriy to'lov davri oxirigacha xizmatdan foydalanishingiz mumkin.

Qaytarilgan mablag'lar faqat maxsus holatlarda ko'rib chiqiladi va Atif ixtiyoriga bog'liq.`,
		},
		{
			title: "6. Maxfiylik",
			content: `Biz sizning shaxsiy ma'lumotlaringizni Maxfiylik siyosatimizga muvofiq yig'amiz va qayta ishlaymiz.

Atif xizmati cookie va shunga o'xshash texnologiyalardan foydalanadi. Bu haqda batafsil ma'lumot Maxfiylik siyosatida keltirilgan.`,
		},
		{
			title: "7. Javobgarlikni cheklash",
			content: `Atif xizmati "bo'lganidek" taqdim etiladi. Biz xizmatning uzluksiz yoki xatosiz ishlashiga kafolat bermaymiz.

Atif texnik nosozliklar, xizmat ko'rsatishning to'xtatilishi yoki kontentning o'chirilishi natijasida yuzaga kelgan zararlar uchun javobgar emas.

Qonun tomonidan ruxsat etilgan maksimal darajada, Atif sizning Atif xizmatidan foydalanishingiz natijasida yuzaga kelgan har qanday bilvosita, tasodifiy, maxsus yoki oqibatli zararlar uchun javobgar bo'lmaydi.`,
		},
		{
			title: "8. Nizolarni hal qilish",
			content: `Ushbu shartlar O'zbekiston Respublikasi qonunlariga muvofiq tartibga solinadi va talqin qilinadi.

Har qanday nizolar birinchi navbatda muzokaralar yo'li bilan hal qilinadi. Agar kelishuv erishilmasa, nizolar O'zbekiston sudlariga topshiriladi.`,
		},
		{
			title: "9. Bog'lanish",
			content: `Ushbu Foydalanish shartlari haqida savollaringiz bo'lsa, biz bilan bog'laning:

Email: legal@atif.uz
Telefon: +998 90 123 45 67
Manzil: Toshkent, O'zbekiston, Islam Karimov ko'chasi, 1`,
		},
	]

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white'>
			<Navbar />

			<div className='max-w-4xl mx-auto px-4 py-24'>
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Foydalanish shartlari
					</h1>
					<p className='text-gray-400'>Oxirgi yangilanish: 2026-yil 1-fevral</p>
				</div>

				<div className='bg-gray-800/30 rounded-xl p-6 mb-8'>
					<p className='text-gray-300 leading-relaxed'>
						Atif xizmatidan foydalanishdan oldin ushbu Foydalanish shartlarini
						diqqat bilan o'qing. Xizmatdan foydalanish orqali siz ushbu
						shartlarga rozilik bildirasiz.
					</p>
				</div>

				<div className='space-y-8'>
					{sections.map((section, index) => (
						<div key={index} className='bg-gray-800/50 rounded-lg p-6'>
							<h2 className='text-xl font-bold mb-4 text-red-500'>
								{section.title}
							</h2>
							<div className='text-gray-300 leading-relaxed whitespace-pre-line'>
								{section.content}
							</div>
						</div>
					))}
				</div>

				<div className='mt-12 text-center'>
					<p className='text-gray-400 mb-4'>Savollaringiz bormi?</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<a
							href='/contact'
							className='bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors'
						>
							Biz bilan bog'laning
						</a>
						<a
							href='/faq'
							className='bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors'
						>
							FAQ ko'rish
						</a>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default TermsPage
