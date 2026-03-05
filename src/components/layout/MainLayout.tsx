import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-6">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout