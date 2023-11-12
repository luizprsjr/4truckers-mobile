import { UserDTO } from '@dtos/UserDTO'

export const mockUseAuthUpdateUser = jest.fn()
export const mockUseAuthSignIn = jest.fn()
export const mockUseAuthSignOut = jest.fn()
export const mockUseAuthGoogleSignIn = jest.fn()

export function mockUseAuthReturn(user: UserDTO, isLoading = false) {
  return {
    user,
    updateUser: mockUseAuthUpdateUser,
    signIn: mockUseAuthSignIn,
    googleSignIn: mockUseAuthGoogleSignIn,
    signOut: mockUseAuthSignOut,
    isLoadingUserStorageData: isLoading,
  }
}
