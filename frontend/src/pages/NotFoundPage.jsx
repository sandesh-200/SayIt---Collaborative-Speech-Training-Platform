"use client"
import { useNavigate,useParams } from "react-router-dom"
import { Home, ArrowLeft } from "lucide-react"

const NotFoundPage = () => {
const params = useParams()
const unmatchedPath = params["*"]
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const goHome = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo */}
        <div className="mx-auto">
          <img src="/sayit-logo.png" alt="Logo" className="mx-auto h-12 w-auto" />
        </div>

        {/* Error Image */}
        <div className="flex justify-center">
          <img src={"/placeholder.svg"} alt="Not Found" className="w-64 h-64 object-contain" />
        </div>

        {/* Error Message */}
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Page Not Found</h2>
          <p className="mt-2 text-base text-gray-600">No routes found for {unmatchedPath}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={goBack}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>

          <button
            onClick={goHome}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>



      </div>
    </div>
  )
}

export default NotFoundPage

