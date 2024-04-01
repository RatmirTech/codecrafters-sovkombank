import { axiosClassic } from '@/api/interceptors'
import { saveTokenToCookies } from '@/services/auth-token.service'
import { AuthResponse, RegisterRequest } from '@/types/index.types'

export const Register = async (req: RegisterRequest): Promise<AuthResponse> => {
	try {
		const { data, ...res } = await axiosClassic.post(
			`${process.env.NEXT_PUBLIC_AXIOS_URL}/auth/registration`,
			req
		)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const Login = async (values: {
	phone_number: string
	password: string
}): Promise<AuthResponse> => {
	try {
		const { data, ...res } = await axiosClassic.post(
			`${process.env.NEXT_PUBLIC_AXIOS_URL}/auth/login`,
			values
		)
		if (res.status === 200) {
			saveTokenToCookies(data.token)
		}
		return data
	} catch (err: any) {
		return err.response
	}
}
