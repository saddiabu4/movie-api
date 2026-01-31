import { Footer, Navbar } from "@/components"
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react"
import { useState } from "react"

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		// Simulate form submission
		setTimeout(() => {
			setIsSubmitting(false)
			setSubmitted(true)
			setFormData({ name: "", email: "", subject: "", message: "" })
		}, 1500)
	}

	const contactMethods = [
		{
			icon: <Phone className='w-6 h-6' />,
			title: "Telefon",
			description: "24/7 qo'llab-quvvatlash",
			value: "+998 90 123 45 67",
		},
		{
			icon: <Mail className='w-6 h-6' />,
			title: "Email",
			description: "24 soat ichida javob",
			value: "support@atif.uz",
		},
		{
			icon: <MessageCircle className='w-6 h-6' />,
			title: "Jonli chat",
			description: "Hozir mavjud",
			value: "Chat boshlash",
		},
		{
			icon: <MapPin className='w-6 h-6' />,
			title: "Ofis",
			description: "Toshkent, O'zbekiston",
			value: "Islam Karimov ko'chasi, 1",
		},
	]

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white'>
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 py-24'>
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Biz bilan bog'laning
					</h1>
					<p className='text-gray-400 text-lg'>
						Savollaringiz bormi? Biz sizga yordam berishga tayyormiz!
					</p>
				</div>

				{/* Contact Methods */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
					{contactMethods.map((method, index) => (
						<div
							key={index}
							className='bg-gray-800/50 rounded-lg p-6 text-center hover:bg-gray-700/50 transition-colors'
						>
							<div className='inline-flex items-center justify-center w-12 h-12 bg-red-600/20 rounded-full text-red-500 mb-4'>
								{method.icon}
							</div>
							<h3 className='text-lg font-semibold mb-1'>{method.title}</h3>
							<p className='text-gray-400 text-sm mb-2'>{method.description}</p>
							<p className='text-white font-medium'>{method.value}</p>
						</div>
					))}
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Contact Form */}
					<div className='bg-gray-800/50 rounded-xl p-8'>
						<h2 className='text-2xl font-bold mb-6'>Xabar yuboring</h2>

						{submitted ? (
							<div className='text-center py-12'>
								<div className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Send className='w-8 h-8 text-green-500' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>
									Xabaringiz yuborildi!
								</h3>
								<p className='text-gray-400'>
									Tez orada siz bilan bog'lanamiz.
								</p>
								<button
									onClick={() => setSubmitted(false)}
									className='mt-6 text-red-500 hover:text-red-400 font-medium'
								>
									Yana xabar yuborish
								</button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className='space-y-6'>
								<div>
									<label className='block text-sm font-medium mb-2'>
										Ismingiz
									</label>
									<input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleChange}
										required
										className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors'
										placeholder='Ismingizni kiriting'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium mb-2'>
										Email
									</label>
									<input
										type='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										required
										className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors'
										placeholder='email@example.com'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium mb-2'>
										Mavzu
									</label>
									<select
										name='subject'
										value={formData.subject}
										onChange={handleChange}
										required
										className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors'
									>
										<option value=''>Mavzuni tanlang</option>
										<option value='account'>Hisob bilan bog'liq</option>
										<option value='billing'>To'lov bilan bog'liq</option>
										<option value='technical'>Texnik muammo</option>
										<option value='content'>Kontent so'rovi</option>
										<option value='other'>Boshqa</option>
									</select>
								</div>

								<div>
									<label className='block text-sm font-medium mb-2'>
										Xabaringiz
									</label>
									<textarea
										name='message'
										value={formData.message}
										onChange={handleChange}
										required
										rows={5}
										className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-none'
										placeholder='Xabaringizni yozing...'
									/>
								</div>

								<button
									type='submit'
									disabled={isSubmitting}
									className='w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2'
								>
									{isSubmitting ? (
										<>
											<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
											Yuborilmoqda...
										</>
									) : (
										<>
											<Send className='w-5 h-5' />
											Yuborish
										</>
									)}
								</button>
							</form>
						)}
					</div>

					{/* Map & Info */}
					<div>
						<div className='bg-gray-800/50 rounded-xl p-8 mb-6'>
							<h2 className='text-2xl font-bold mb-4'>Ish vaqtlari</h2>
							<div className='space-y-3'>
								<div className='flex justify-between'>
									<span className='text-gray-400'>Dushanba - Juma</span>
									<span>09:00 - 18:00</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-gray-400'>Shanba</span>
									<span>10:00 - 16:00</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-gray-400'>Yakshanba</span>
									<span className='text-red-500'>Yopiq</span>
								</div>
							</div>
						</div>

						<div className='bg-gray-800/50 rounded-xl p-8'>
							<h2 className='text-2xl font-bold mb-4'>Tez-tez javoblar</h2>
							<p className='text-gray-400 mb-4'>
								Ko'p beriladigan savollarga javoblarni FAQ sahifamizda
								topishingiz mumkin.
							</p>
							<a
								href='/faq'
								className='text-red-500 hover:text-red-400 font-medium'
							>
								FAQ sahifasiga o'tish →
							</a>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default ContactPage
