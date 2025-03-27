// // import { useState } from "react"
// // import { useAuth } from "../context/AuthContext"
// // import { Menu, X, Home, FileText, Settings, LogOut, Bell, ChevronLeft, ChevronRight,User } from "lucide-react"
// // import ConfirmModal from "./ConfitmModal"
// // import { Link } from 'react-router-dom'

// // const Sidebar = () => {
// //   const [isOpen, setIsOpen] = useState(true) // Default open on desktop
// //   const [showLogoutModal, setShowLogoutModal] = useState(false)
// //   const { logout } = useAuth()

// //   const toggleSidebar = () => {
// //     setIsOpen(!isOpen)
// //   }

// //   // Icon size based on sidebar state
// //   const iconSize = !isOpen ? 24 : 20

// //   return (
// //     <>
// //       {/* Logout confirmation modal */}
// //       <ConfirmModal
// //         isOpen={showLogoutModal}
// //         onClose={() => setShowLogoutModal(false)}
// //         onConfirm={() => {
// //           logout()
// //         }}
// //       />

// //       {/* Mobile Navbar */}
// //       <div className="lg:hidden bg-teal-600 text-white p-4 flex items-center justify-between">
// //         <div className="flex items-center">
// //           {/* Logo for Mobile */}
// //           <img src="/sayit-logo.png" alt="Logo" className="h-9 w-20 p-1 rounded" />
// //         </div>
// //         <button onClick={toggleSidebar} className="text-white focus:outline-none">
// //           {isOpen ? <X size={24} /> : <Menu size={24} />}
// //         </button>
// //       </div>

// //       {/* Sidebar for desktop / Mobile dropdown */}
// //       <div
// //         className={`
// //         fixed top-0 left-0 h-screen bg-gradient-to-b from-teal-700 via-teal-600 to-teal-800 text-white transition-all duration-300 ease-in-out z-10
// //         ${isOpen ? "w-64" : "w-0 -translate-x-full lg:translate-x-0 lg:w-20"}
// //         lg:h-screen lg:fixed
// //       `}
// //       >
// //         <div className="flex flex-col h-full overflow-y-auto">
// //           {/* Close button for desktop view */}
// //           <button
// //             onClick={toggleSidebar}
// //             className="hidden lg:flex absolute -right-4 top-20 bg-white text-teal-700 rounded-full p-1 shadow-lg z-20"
// //           >
// //             {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
// //           </button>

// //           {/* Logo Section at Top */}
// //           <div className={`p-6 flex justify-center border-b border-teal-500 ${!isOpen && "lg:p-4"}`}>
// //             <img
// //               src="/sayit-logo.png"
// //               alt="Logo"
// //               className="rounded shadow-sm"
// //               style={{ height: isOpen ? "40px" : "20px", width: isOpen ? "110px" : "40px" }}
// //             />
// //           </div>

// //           {/* Menu Items */}
// //           <nav className="flex-grow p-4">
// //             <ul className="space-y-3">
// //               <li>
// //                 <a
// //                   href="#"
// //                   className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
// //                 >
// //                   <Home size={iconSize} />
// //                   <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Dashboard</span>
// //                 </a>
// //               </li>
// //               <li>
// //                 <a
// //                   href="#"
// //                   className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
// //                 >
// //                   <FileText size={iconSize} />
// //                   <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Documents</span>
// //                 </a>
// //               </li>
// //               <li>
// //                 <a
// //                   href="#"
// //                   className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
// //                 >
// //                   <Bell size={iconSize} />
// //                   <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Notifications</span>
// //                 </a>
// //               </li>
// //               <li>
// //                 <a
// //                   href="#"
// //                   className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
// //                 >
// //                   <Settings size={iconSize} />
// //                   <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Settings</span>
// //                 </a>
// //               </li>
// //             </ul>
// //           </nav>

// //           {/* User Profile and Logout at Bottom */}
// //           <div className={`p-4 border-t border-teal-500 ${!isOpen && "lg:p-3"}`}>
// //           <Link to="/profile">
// //             <div
// //               className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors cursor-pointer`}
// //             >
// //               <img src="/api/placeholder/40/40" alt="User" className="h-8 w-8 rounded-full" />
// //               <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>John Doe</span>
// //             </div>
// //             </Link>

// //             <div
// //               onClick={() => {
// //                 setShowLogoutModal(true)
// //               }}
// //               className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors cursor-pointer text-white`}
// //             >
// //               <LogOut size={iconSize} className="text-red-200" />
// //               <span className={`ml-3 ${!isOpen && "lg:hidden"} text-red-200`}>Logout</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Background overlay for mobile when sidebar is open */}
// //       {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden" onClick={toggleSidebar} />}

// //       {/* This div creates the proper margin for content */}
// //       <div
// //         className={`
// //         lg:ml-64 transition-all duration-300 ease-in-out
// //         ${!isOpen && "lg:ml-20"}
// //       `}
// //       />
// //     </>
// //   )
// // }

// // export default Sidebar

// import { useState } from "react"
// import { Menu, X, Home, FileText, Settings, LogOut, Bell, ChevronLeft, ChevronRight } from 'lucide-react'
// import { Link } from 'react-router-dom'

// const Sidebar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(true) // Default open on desktop
//   const [showLogoutModal, setShowLogoutModal] = useState(false)
  
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen)
//   }

//   // Icon size based on sidebar state
//   const iconSize = !isOpen ? 24 : 20

//   const handleLogout = () => {
//     // Implement logout functionality
//     console.log("Logging out...")
//   }

//   return (
//     <div className="flex min-h-screen bg-background">
//       {/* Mobile Navbar */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-teal-600 text-white p-4 flex items-center justify-between">
//         <div className="flex items-center">
//           {/* Logo for Mobile */}
//           <img src="/sayit-logo.png" alt="Logo" className="h-9 w-20 p-1 rounded" />
//         </div>
//         <button onClick={toggleSidebar} className="text-white focus:outline-none">
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`
//           bg-gradient-to-b from-teal-700 via-teal-600 to-teal-800 text-white transition-all duration-300 ease-in-out
//           ${isOpen ? "w-64" : "w-20"}
//           lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col
//           fixed top-0 left-0 h-screen z-10
//           ${isOpen ? "" : "-translate-x-full lg:translate-x-0"}
//         `}
//       >
//         <div className="flex flex-col h-full overflow-y-auto">
//           {/* Close button for desktop view */}
//           <button
//             onClick={toggleSidebar}
//             className="hidden lg:flex absolute -right-4 top-20 bg-white text-teal-700 rounded-full p-1 shadow-lg z-20"
//           >
//             {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//           </button>

//           {/* Logo Section at Top */}
//           <div className={`p-6 flex justify-center border-b border-teal-500 ${!isOpen && "lg:p-4"}`}>
//             <img
//               src="/sayit-logo.png"
//               alt="Logo"
//               className="rounded shadow-sm"
//               style={{ height: isOpen ? "40px" : "20px", width: isOpen ? "110px" : "40px" }}
//             />
//           </div>

//           {/* Menu Items */}
//           <nav className="flex-grow p-4">
//             <ul className="space-y-3">
//               <li>
//                 <Link
//                   to="/"
//                   className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
//                 >
//                   <Home size={iconSize} />
//                   <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Dashboard</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/documents"
//                   className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
//                 >
//                   <FileText size={iconSize} />
//                   <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Documents</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/notifications"
//                   className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
//                 >
//                   <Bell size={iconSize} />
//                   <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Notifications</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/settings"
//                   className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
//                 >
//                   <Settings size={iconSize} />
//                   <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Settings</span>
//                 </Link>
//               </li>
//             </ul>
//           </nav>

//           {/* User Profile and Logout at Bottom */}
//           <div className={`p-4 border-t border-teal-500 ${!isOpen && "lg:p-3"}`}>
//             <Link
//               to="/profile"
//               className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors cursor-pointer`}
//             >
//               <img src="/api/placeholder/40/40" alt="User" className="h-8 w-8 rounded-full" />
//               <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>John Doe</span>
//             </Link>

//             <button
//               onClick={() => setShowLogoutModal(true)}
//               className={`flex items-center w-full ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors cursor-pointer text-white`}
//             >
//               <LogOut size={iconSize} className="text-red-200" />
//               <span className={`ml-3 ${!isOpen && "lg:hidden"} text-red-200`}>Logout</span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Background overlay for mobile when sidebar is open */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden" 
//           onClick={toggleSidebar} 
//         />
//       )}

//       {/* Main content */}
//       <main className={`flex-1 transition-all duration-300 ease-in-out ${isOpen ? "" : "lg:ml-0"} pt-[72px] lg:pt-0`}>
//         {children}
//       </main>

//       {/* Logout confirmation modal */}
//       {showLogoutModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-sm w-full">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Logout</h3>
//             <p className="text-gray-500 mb-6">Are you sure you want to log out?</p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowLogoutModal(false)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setShowLogoutModal(false);
//                 }}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Sidebar



"use client"

import { useState } from "react"
import { Menu, X, Home, FileText, Settings, LogOut, Bell, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true) // Default open on desktop
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Icon size based on sidebar state
  const iconSize = !isOpen ? 24 : 20

  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logging out...")
  }

  return (
    <>
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-teal-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo for Mobile */}
          <img src="/sayit-logo.png" alt="Logo" className="h-9 w-20 p-1 rounded" />
        </div>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-gradient-to-b from-teal-700 via-teal-600 to-teal-800 text-white transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"}
          lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col
          fixed lg:relative top-0 left-0 h-screen z-10
          ${isOpen ? "" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Close button for desktop view */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex absolute -right-4 top-20 bg-white text-teal-700 rounded-full p-1 shadow-lg z-20"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* Logo Section at Top */}
          <div className={`p-6 flex justify-center border-b border-teal-500 ${!isOpen && "lg:p-4"}`}>
            <img
              src="/sayit-logo.png"
              alt="Logo"
              className="rounded shadow-sm"
              style={{ height: isOpen ? "40px" : "20px", width: isOpen ? "110px" : "40px" }}
            />
          </div>

          {/* Menu Items */}
          <nav className="flex-grow p-4">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/home"
                  className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
                >
                  <Home size={iconSize} />
                  <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
                >
                  <FileText size={iconSize} />
                  <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Create Speech</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/notifications"
                  className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
                >
                  <Bell size={iconSize} />
                  <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Notifications</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors`}
                >
                  <Settings size={iconSize} />
                  <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* User Profile and Logout at Bottom */}
          <div className={`p-4 border-t border-teal-500 ${!isOpen && "lg:p-3"}`}>
            <Link
              to="/profile"
              className={`flex items-center ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors cursor-pointer`}
            >
              <img src="/api/placeholder/40/40" alt="User" className="h-8 w-8 rounded-full" />
              <span className={`ml-3 ${!isOpen && "lg:hidden"}`}>John Doe</span>
            </Link>

            <button
              onClick={() => setShowLogoutModal(true)}
              className={`flex items-center w-full ${isOpen ? "p-3" : "p-3 lg:justify-center"} rounded-lg hover:bg-teal-500 transition-colors cursor-pointer text-white`}
            >
              <LogOut size={iconSize} className="text-red-200" />
              <span className={`ml-3 ${!isOpen && "lg:hidden"} text-red-200`}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Background overlay for mobile when sidebar is open */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden" onClick={toggleSidebar} />}

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleLogout()
                  setShowLogoutModal(false)
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar

