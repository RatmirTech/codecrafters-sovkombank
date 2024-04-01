import { axiosWithAuth } from '@/api/interceptors'
import { CreateOrderRequest } from '@/types/index.types'

export const CreateOrder = async (req: CreateOrderRequest): Promise<any> => {
	try {
		const { data, ...res } = await axiosWithAuth.post(
			`${process.env.NEXT_PUBLIC_AXIOS_URL}/orders/create-order`,
			req
		)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const GetMyOrders = async (): Promise<any> => {
	try {
		const { data, ...res } = await axiosWithAuth.get(
			`${process.env.NEXT_PUBLIC_AXIOS_URL}/orders`
		)
		return data
	} catch (err: any) {
		return err.response.data
	}
}
