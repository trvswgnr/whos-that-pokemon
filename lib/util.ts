import { GetServerSidePropsContext } from 'next'

export function getBaseUrl(req?: GetServerSidePropsContext['req']): string {
  let baseUrl = global.window ? window.location.origin : ''

  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    baseUrl = `${protocol}://${req.headers.host}`
  }

  if (!baseUrl) {
    throw new Error('BASE_URL is not defined')
  }

  return baseUrl
}
