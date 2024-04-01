import { axiosWithAuth } from '@/api/interceptors'
import { User } from '@/types/index.types'

export const GetUserData = async (): Promise<User> => {
	try {
		const { data, ...res } = await axiosWithAuth.get(
			`${process.env.NEXT_PUBLIC_AXIOS_URL}/users/get-user-data`
		)
		return data
	} catch (err: any) {
		return err.response.data
	}
}
