import { NextRequest, NextResponse } from 'next/server'
// always GET
export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0;`, // to delete a cookie we need to put the max-age to zero
    },
  })
}
