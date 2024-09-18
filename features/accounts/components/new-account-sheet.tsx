import { useNewAccount } from '@/features/accounts/hooks/use-new-account'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { AccountForm } from './account-form'
import { FormValue } from 'hono/types'
import { z } from 'zod'
import { insertAccountSchema } from '@/db/schema'
import { useCreateAccount } from '@/features/accounts/hooks/use-create-account'

export const NewAccountSheet = () => {
	const { isOpen, onClose } = useNewAccount()

	const mutation = useCreateAccount()

	const formSchema = insertAccountSchema.pick({
		name: true,
	})
	
	type FormValues = z.input<typeof formSchema>

	const onSubmit = (values: FormValues) => {
		mutation.mutate(values, {
		  onSuccess: () => {
			onClose()
		  },
		})
	  }

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>New Account</SheetTitle>
					<SheetDescription>Add a new account to your finance app.</SheetDescription>
				</SheetHeader>
                <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{name:''}}/>
			</SheetContent>
		</Sheet>
	)
}
