const LoadingSpinner = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
			{/* Main Spinner */}
			<div className='relative'>
				{/* Outer Ring */}
				<div className='w-16 h-16 border-4 border-red-600/20 rounded-full' />
				{/* Spinning Ring */}
				<div className='absolute inset-0 w-16 h-16 border-4 border-transparent border-t-red-600 rounded-full animate-spin' />
				{/* Inner Pulse */}
				<div className='absolute inset-2 w-12 h-12 bg-red-600/10 rounded-full animate-pulse' />
				{/* Center Dot */}
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='w-3 h-3 bg-red-600 rounded-full animate-ping' />
				</div>
			</div>

			{/* Loading Text */}
			<div className='flex items-center gap-1'>
				<span className='text-gray-400 text-sm font-medium'>Loading</span>
				<span className='flex gap-1'>
					<span
						className='w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce'
						style={{ animationDelay: "0s" }}
					/>
					<span
						className='w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce'
						style={{ animationDelay: "0.15s" }}
					/>
					<span
						className='w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce'
						style={{ animationDelay: "0.3s" }}
					/>
				</span>
			</div>
		</div>
	)
}

export default LoadingSpinner
