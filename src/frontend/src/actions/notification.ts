import { axiosWithAuth } from '@/api/interceptors'

export const ReadNotification = async (id: string) => {
	try {
		const { data, ...res } = await axiosWithAuth.put(
			`http://${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/notifications/${id}/read`
		)
		return data
	} catch (err: any) {
		return err.response.data
	}
}
