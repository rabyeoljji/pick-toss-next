import NextAuth, { Account, DefaultSession, NextAuthResult } from 'next-auth'
import { signIn as signInAPI } from '@/actions/fetchers/auth/sign-in'
import Kakao from 'next-auth/providers/kakao'
import Google from 'next-auth/providers/google'
import { getUser } from '@/actions/fetchers/user/get-user'
import { UserDTO } from '@/actions/types/dto/user.dto'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      accessToken: string
      account: Account
      dto: UserDTO
      isNewUser: boolean // 첫 로그인 여부 추가
    } & DefaultSession['user']
  }
}

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  providers: [Kakao, Google],
  callbacks: {
    jwt: async ({ token, account, trigger }) => {
      if (account) {
        try {
          const { accessToken, accessTokenExpiration, signUp } = await signInAPI({
            socialPlatform: account.provider.toUpperCase() as 'GOOGLE' | 'KAKAO',
            accessToken: account.access_token as string,
          })
          token.account = account
          token.accessToken = accessToken
          token.accessTokenExpiration = accessTokenExpiration
          token.isNewUser = signUp
        } catch (error) {
          throw new Error('Failed to get backend access token')
        }
        // 회원가입 했을 때만 첫 사용자인지 알 수 있다
        try {
          const user = await getUser(token.accessToken as string)
          token.userDTO = user
        } catch (error) {
          throw new Error('Failed to get user')
        }
      }

      if (
        token.accessTokenExpiration &&
        Date.now() > new Date(token.accessTokenExpiration as string).getTime()
      ) {
        throw new Error('server token expired')
      }

      if (trigger === 'update') {
        try {
          const user = await getUser(token.accessToken as string)
          token.userDTO = user
        } catch (error) {
          throw new Error('Failed to get user')
        }
      }

      return token
    },

    session: ({ session, token }) => {
      session.user.id = token.sub || ''
      session.user.accessToken = token.accessToken as string
      session.user.dto = token.userDTO as UserDTO
      session.user.account = token.account as Account
      session.user.isNewUser = (token.isNewUser as boolean) ?? false

      return session
    },
  },
}) satisfies NextAuthResult
