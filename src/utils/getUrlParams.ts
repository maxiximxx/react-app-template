/* eslint-disable no-restricted-syntax */

interface paramsType {
  [key: string]: string
}

export default function getUrlParams(url = window.location.search) {
  const searchParams = new URLSearchParams(url)
  const params: paramsType = {}
  for (const [key, value] of searchParams) {
    params[key] = value
  }
  return params
}
