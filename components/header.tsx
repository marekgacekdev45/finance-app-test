import React from 'react'
import HeaderLogo from './header-logo'
import Navigation from './navigation'
import { UserButton } from '@clerk/nextjs'

const Header = () => {
	return (
		<header className='bg-gradient-to-b from-blue-700 ti-blue-500 px-4 py-8 lg:px-14 pb-36'>
			<div className='max-w-screen-2xl mx-auto'>
				<div className='w-full flex items-center justify-between mb-14'>
					<div className='flex items-center lg:gap-x-16'>
						<HeaderLogo />
                        <Navigation/>
						
					</div>
					<UserButton/>
				</div>
			</div>
		</header>
	)
}

export default Header
