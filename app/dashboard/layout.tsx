import Header from "@/components/header"
import { getSession } from "@/lib/auth"

export default async function RootLayout({ children }) {
  const session = await getSession()

  return (
    <html lang="en">
      <body>
        <Header user={session?.user} />
        <main>{children}</main>
      </body>
    </html>
  )
}