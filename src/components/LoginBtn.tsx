import { Session } from "next-auth"
import { useSession, signIn, signOut } from "next-auth/react"

export type ExtendedSession = Session & {
  token?: any
}

export default function LoginBtn() {
  const { data: session, status } = useSession()
  const extendedSession: ExtendedSession = session as ExtendedSession
  if (extendedSession && status === "authenticated") {
    const userName = extendedSession.token?.user?.name || extendedSession.token?.name
    return (
      <>
        {userName} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}