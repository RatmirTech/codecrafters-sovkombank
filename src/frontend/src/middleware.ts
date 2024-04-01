import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request
	const accessToken = cookies.get('access_token')?.value

	const isPrivatePage = url.includes('/profile') || url.includes('/exchange')
	const isAuthPage = url.includes('/sign-in') || url.includes('/sign-up')

	if (isAuthPage && accessToken) {
		return NextResponse.redirect(new URL('/profile', url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (isPrivatePage && !accessToken) {
		return NextResponse.redirect(new URL('/sign-in', url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile', '/exchange', '/sign-in', '/sign-up'],
}
