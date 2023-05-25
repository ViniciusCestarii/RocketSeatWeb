import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'
// always GET
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const registerRespomse = await api.post('/register', {
    code,
  })

  const { token } = registerRespomse.data

  const redirectURL = new URL('/', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30 // to expire in a month

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`, // put the cookie in the session
    },
  })
}
