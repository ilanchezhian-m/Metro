import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-6xl font-bold mb-4">
        404
      </h1>

      <p className="text-lg text-gray-500 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/">
        <Button>
          Go back home
        </Button>
      </Link>

    </div>
  )
}

export default NotFound