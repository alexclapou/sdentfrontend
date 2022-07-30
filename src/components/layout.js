import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children, user, setUser }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar user={user} setUser={setUser} />
      <main className="pt-8 sm:pt-0">{children}</main>
      <Footer />
    </div>
  )
}
