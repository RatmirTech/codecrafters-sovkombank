import { axiosClassic } from '@/api/interceptors'
import { GetCurrencyRequest, GetCurrencyResponse } from '@/types/index.types'

export const GetCurrency = async (
	data: GetCurrencyRequest
): Promise<GetCurrencyResponse> => {
	const req = await axiosClassic.get(
		`${
			process.env.NEXT_PUBLIC_PREDICTIONS_URL
		}/currencies/get-currency-rates?currency=${data.currency}&days=${7}`
	)
	return req.data
}

export const GetTodaysCurrency = async (
	data: Omit<GetCurrencyRequest, 'days'>
): Promise<GetCurrencyResponse> => {
	const req = await axiosClassic.get(
		`${process.env.NEXT_PUBLIC_PREDICTIONS_URL}/currencies/get-currency-rate?currency=${data.currency}`
	)
	return req.data
}
