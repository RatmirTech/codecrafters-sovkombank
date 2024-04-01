import { axiosWithAuth } from '@/api/interceptors'
import {
	AccountResponse,
	CreateAccountRequest,
	GetAccountResponse,
	PutMoneyRequest,
} from '@/types/index.types'

export const CreateAccount = async (
	req: CreateAccountRequest
): Promise<AccountResponse> => {
	try {
		const { data } = await axiosWithAuth.post(
			`${process.env.NEXT_PUBLIC_AXIOS_URL}/accounts/create`,
			req
		)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const GetBankAccounts = async (): Promise<GetAccountResponse> => {
	try {
		const { data, ...res } = await axiosWithAuth.get(
			`${process.env.NEXT_PUBLIC_AXIOS_URL}/accounts/get-bank-accounts`
		)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const PutMoney = async (req: PutMoneyRequest): Promise<any> => {
	try {
		const { data, ...res } = await axiosWithAuth.post(
			`${process.env.NEXT_PUBLIC_AXIOS_URL}/accounts/put-money`,
			req
		)
		return data
	} catch (err: any) {
		return err.response.data
	}
}
