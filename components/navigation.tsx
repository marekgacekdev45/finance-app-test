'use client'

import Link from 'next/link'
import { useMedia } from 'react-use'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import NavButton from './nav-button'
import { usePathname, useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const routes = [
	{
		href: '/',
		label: 'Overview',
	},
	{
		href: '/transactions',
		label: 'Transactions',
	},
	{
		href: '/accounts',
		label: 'Accounts',
	},
	{
		href: '/categories',
		label: 'Categories',
	},
	{
		href: '/settings',
		label: 'Settings',
	},
]

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const isMobile = useMedia('(max-width: 1024px)', false)
	const pathname = usePathname()
	const onClick = (href: string) => {
		router.push(href)
		setIsOpen(false)
	}

	if (isMobile) {
		return (
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger>
					<Button
						variant='outline'
						size='sm'
						className='font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition '>
						<Menu className='size-5' />
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='px-2'>
					<nav className='flex flex-col gap-y-2 pt-6'>
						{routes.map(route => (
							<Button
								variant={route.href === pathname ? 'secondary' : 'ghost'}
								key={route.href}
								onClick={() => onClick(route.href)}
								className="w-full justify-start ">
								{route.label}
							</Button>
						))}
					</nav>
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<nav className='hidden lg:flex items-center gap-2 overflow-x-auto'>
			{routes.map(route => (
				<NavButton key={route.href} href={route.href} label={route.label} isActive={pathname === route.href} />
			))}
		</nav>
	)
}

export default Navigation
