/* eslint-disable no-restricted-syntax */

interface paramsType {
  [key: string]: string
}

export default function getUrlParams() {
  const searchParams = new URLSearchParams(window.location.search)
  const params: paramsType = {}
  for (const [key, value] of searchParams) {
    params[key] = value
  }
  return params
}
