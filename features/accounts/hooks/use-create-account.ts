import { InferRequestType, InferResponseType } from 'hono'


import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/lib/hono'

import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]

export const useCreateAccount = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async (json) => {
			const response = await client.api.accounts.$post({ json });

			// Check if the response is ok (status code 2xx)
			if (!response.ok) {
				const errorText = await response.text(); // You can log this for more details
				throw new Error(`Error: ${response.status} - ${errorText}`);
			}

			// Return the JSON response if successful
			return await response.json();
		},
		onSuccess: () => {
			toast.success('Account created successfully');
			queryClient.invalidateQueries({ queryKey: ['accounts'] });
		},
		onError: (error) => {
			console.error('Error creating account:', error);
			toast.error('Failed to create account');
		},
	});

	return mutation;
};

