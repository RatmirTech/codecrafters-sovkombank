import { JWTToken } from '@/types/index.types'
import { decodeJwt, jwtVerify } from 'jose'
import Cookies from 'js-cookie'

export const getAccessToken = () => {
	const accessToken = Cookies.get('access_token')
	return accessToken || null
}

export const getUserId = () => {
	const userId = Cookies.get('user_id')
	return userId || null
}

export const saveTokenToCookies = async (accessToken: string) => {
	if (!process.env.NEXT_PUBLIC_JWT_SECRET) return
	const isValid = await jwtVerify(
		accessToken,
		new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
	)
	if (!isValid) return
	Cookies.set('access_token', accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1,
	})
	Cookies.set('user_id', ((await decodeJwt(accessToken)) as JWTToken).id, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1,
	})
}

export const removeTokenFromCookies = () => {
	Cookies.remove('access_token')
	Cookies.remove('user_id')
}
