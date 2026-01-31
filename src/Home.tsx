import { getAccountDetails } from "@/api/account/account"
import { useEffect, useState } from "react"

const Home = () => {
	const [data, setData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getAccountDetails("22559442")
				setData(result)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchData()
	}, [])

	return (
		<div>
			<h1 className='text-4xl font-bold text-blue-600 underline'>
				Hello World
			</h1>
			{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
		</div>
	)
}

export default Home
