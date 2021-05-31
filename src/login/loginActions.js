/*
 * action types
 */
export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'

/*
 * action creators
 */
export function login(token) {
  return { type: LOGGED_IN, token }
}
export function logout(token) {
  return { type: LOGGED_OUT, token }
}
