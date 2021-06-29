/* eslint-disable no-restricted-syntax */

export default function getUrlParams(url = window.location.search) {
  const searchParams = new URLSearchParams(url)
  const params = {}
  for (const [key, value] of searchParams) {
    params[key] = value
  }
  return params
}
