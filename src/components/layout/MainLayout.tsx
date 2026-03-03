import { Outlet } from "react-router-dom"
import Header from "./Header"

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout