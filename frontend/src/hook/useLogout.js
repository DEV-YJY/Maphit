import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  // no need to send req to the BE
  // FE - Global state + Jwt in localstorage
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}
