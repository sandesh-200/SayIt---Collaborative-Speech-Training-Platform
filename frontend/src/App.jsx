import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ProfilePage from "./pages/ProfilePage"
import Sidebar from "./components/Sidebar"
import PrivateRoute from "./utils/PrivateRoute"
import Home from "./pages/Home"
import RegisterPage from "./pages/Register"
import { ToastContainer } from "react-toastify"
import NotFoundPage from "./pages/NotFoundPage"
import Speech from "./pages/Speech"
import SpeechReview from "./pages/SpeechReview"

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private Route wrapper around the entire layout */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex min-h-screen">
                {/* Sidebar as a sibling component, not a wrapper */}
                <Sidebar />

                {/* Main content area */}
                <div className="flex-1 transition-all duration-300 ease-in-out pt-[72px] lg:pt-0">
                  {/* Nested routes rendered inside the main content area */}
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/create" element={<Speech />} />
                    <Route path="/review/:speechId" element={<SpeechReview/>}/>
                    {/* Catch-all route for undefined routes within the private route */}
                    <Route path="/*" element={<NotFoundPage />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />

        {/* Catch-all route for undefined routes outside the private route */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App

