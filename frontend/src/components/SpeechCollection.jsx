// "use client"

// import { useState, useRef } from "react"
// import { Play, Pause, MoreVertical, Clock, Calendar, Edit, Trash, X } from "lucide-react"
// import { useSpeech } from "../context/SpeechContext"
// import { Link, useParams } from "react-router-dom"

// const SpeechCollection = () => {
//   const { speeches, deleteSpeech } = useSpeech()

//   const [playingSpeechId, setPlayingSpeechId] = useState(null)
//   const [openMenuId, setOpenMenuId] = useState(null)
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [speechToDelete, setSpeechToDelete] = useState(null)
//   const audioRef = useRef(null)

//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const togglePlayback = (id, speechUrl) => {
//     if (playingSpeechId === id) {
//       audioRef.current.pause()
//       setPlayingSpeechId(null)
//     } else {
//       if (audioRef.current) {
//         audioRef.current.src = speechUrl
//         audioRef.current.play().catch((err) => {
//           console.error("Error playing audio:", err)
//         })
//       }
//       setPlayingSpeechId(id)
//     }
//   }

//   const toggleMenu = (id) => {
//     setOpenMenuId(openMenuId === id ? null : id)
//   }

//   const handleAudioEnded = () => {
//     setPlayingSpeechId(null)
//   }

//   const confirmDelete = (speech) => {
//     setSpeechToDelete(speech)
//     setShowDeleteModal(true)
//     setOpenMenuId(null)
//   }

//   const handleDelete = () => {
//     if (speechToDelete) {
//       deleteSpeech(speechToDelete.id)
//       if (playingSpeechId === speechToDelete.id) {
//         audioRef.current.pause()
//         setPlayingSpeechId(null)
//       }
//       setShowDeleteModal(false)
//       setSpeechToDelete(null)
//     }
//   }

//   const handleEdit = (id) => {
//     console.log("Edit speech:", id)
//     setOpenMenuId(null)
//   }

//   return (
//     <div className="relative">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-900">Your Speeches</h2>
//         <div className="text-sm text-gray-500">
//           {speeches.length} {speeches.length === 1 ? "speech" : "speeches"}
//         </div>
//       </div>

//       {speeches.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-gray-500">You haven't created any speeches yet.</p>
//         </div>
//       ) : (
//         <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
//           {speeches.map((speech) => (
//             <div key={speech.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//               <div className="flex flex-col sm:flex-row">
//                 <Link to={`/review/${speech.id}`}>
//                   <div className="sm:w-48 h-48 flex-shrink-0 relative">
//                     <img
//                       src={speech.image || "/placeholder.svg"}
//                       alt={speech.title}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = "/placeholder.svg"
//                       }}
//                     />
//                   </div>
//                 </Link>

//                 <div className="p-4 flex-1 flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-1">{speech.title}</h3>
//                     <p className="text-sm text-gray-500 line-clamp-2 mb-2">{speech.description}</p>

//                     <div className="flex items-center text-xs text-gray-500 space-x-4">
//                       <div className="flex items-center">
//                         <Clock size={14} className="mr-1" />
//                         <span>{speech.duration}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar size={14} className="mr-1" />
//                         <span>{formatDate(speech.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center mt-4">
//                     <div className="flex items-center space-x-3">
//                       <button
//                         onClick={() => togglePlayback(speech.id, speech.speech)}
//                         className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//                       >
//                         {playingSpeechId === speech.id ? <Pause size={16} /> : <Play size={16} />}
//                       </button>
//                       <Link to={`/review/${speech.id}`}>
//                         <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
//                           Review
//                         </button>
//                       </Link>
//                     </div>

//                     <div className="relative">
//                       <button
//                         onClick={() => toggleMenu(speech.id)}
//                         className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
//                       >
//                         <MoreVertical size={18} />
//                       </button>

//                       {openMenuId === speech.id && (
//                         <div className="absolute right-0 bottom-full mb-2 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                           <div className="py-1">
//                             <button
//                               onClick={() => handleEdit(speech.id)}
//                               className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             >
//                               <Edit size={14} className="mr-2" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => confirmDelete(speech)}
//                               className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                             >
//                               <Trash size={14} className="mr-2" />
//                               Delete
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <audio ref={audioRef} onEnded={handleAudioEnded} onError={() => setPlayingSpeechId(null)} />

//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-sm w-full">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium text-gray-900">Confirm Delete</h3>
//               <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-500">
//                 <X size={20} />
//               </button>
//             </div>
//             <p className="text-gray-500 mb-6">
//               Are you sure you want to delete "{speechToDelete?.title}"? This action cannot be undone.
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default SpeechCollection


"use client"

import { useState, useRef } from "react"
import { Play, Pause, MoreVertical, Clock, Calendar, Edit, Trash, X } from "lucide-react"
import { useSpeech } from "../context/SpeechContext"
import { Link, useParams } from "react-router-dom"

const SpeechCollection = () => {
  const { speeches, deleteSpeech } = useSpeech()

  const [playingSpeechId, setPlayingSpeechId] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [speechToDelete, setSpeechToDelete] = useState(null)
  const [selectedSpeechIds, setSelectedSpeechIds] = useState([]) // New state for selected speeches
  const audioRef = useRef(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Toggle individual speech selection
  const toggleSpeechSelection = (id) => {
    setSelectedSpeechIds(prev => 
      prev.includes(id) 
        ? prev.filter(speechId => speechId !== id)
        : [...prev, id]
    )
  }

  // Select all speeches
  const toggleSelectAll = () => {
    if (selectedSpeechIds.length === speeches.length) {
      setSelectedSpeechIds([])
    } else {
      setSelectedSpeechIds(speeches.map(speech => speech.id))
    }
  }

  const togglePlayback = (id, speechUrl) => {
    if (playingSpeechId === id) {
      audioRef.current.pause()
      setPlayingSpeechId(null)
    } else {
      if (audioRef.current) {
        audioRef.current.src = speechUrl
        audioRef.current.play().catch((err) => {
          console.error("Error playing audio:", err)
        })
      }
      setPlayingSpeechId(id)
    }
  }

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const handleAudioEnded = () => {
    setPlayingSpeechId(null)
  }

  const confirmDelete = (speech) => {
    setSpeechToDelete(speech)
    setShowDeleteModal(true)
    setOpenMenuId(null)
  }

  const confirmBulkDelete = () => {
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    if (speechToDelete) {
      // Single speech deletion
      deleteSpeech(speechToDelete.id)
      if (playingSpeechId === speechToDelete.id) {
        audioRef.current.pause()
        setPlayingSpeechId(null)
      }
      setSelectedSpeechIds(prev => prev.filter(id => id !== speechToDelete.id))
    } else if (selectedSpeechIds.length > 0) {
      // Bulk deletion
      selectedSpeechIds.forEach(id => {
        deleteSpeech(id)
        if (playingSpeechId === id) {
          audioRef.current.pause()
          setPlayingSpeechId(null)
        }
      })
      setSelectedSpeechIds([])
    }
    setShowDeleteModal(false)
    setSpeechToDelete(null)
  }

  const handleEdit = (id) => {
    console.log("Edit speech:", id)
    setOpenMenuId(null)
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Speeches</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {speeches.length} {speeches.length === 1 ? "speech" : "speeches"}
          </div>
          {speeches.length > 0 && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedSpeechIds.length === speeches.length && speeches.length > 0}
                onChange={toggleSelectAll}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-600">Select All</span>
              {selectedSpeechIds.length > 0 && (
                <button
                  onClick={confirmBulkDelete}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  Delete Selected ({selectedSpeechIds.length})
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {speeches.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">You haven't created any speeches yet.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {speeches.map((speech) => (
            <div key={speech.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="flex items-center p-2">
                  <input
                    type="checkbox"
                    checked={selectedSpeechIds.includes(speech.id)}
                    onChange={() => toggleSpeechSelection(speech.id)}
                    className="h-4 w-4 mr-2"
                  />
                </div>
                <Link to={`/review/${speech.id}`}>
                  <div className="sm:w-48 h-48 flex-shrink-0 relative">
                    <img
                      src={speech.image

 || "/placeholder.svg"}
                      alt={speech.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                </Link>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  {/* Rest of the speech card content remains the same */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{speech.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">{speech.description}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{speech.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(speech.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => togglePlayback(speech.id, speech.speech)}
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        {playingSpeechId === speech.id ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <Link to={`/review/${speech.id}`}>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                          Review
                        </button>
                      </Link>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => toggleMenu(speech.id)}
                        className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenuId === speech.id && (
                        <div className="absolute right-0 bottom-full mb-2 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleEdit(speech.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Edit size={14} className="mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => confirmDelete(speech)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              <Trash size={14} className="mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <audio ref={audioRef} onEnded={handleAudioEnded} onError={() => setPlayingSpeechId(null)} />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Confirm Delete</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-500 mb-6">
              {speechToDelete 
                ? `Are you sure you want to delete "${speechToDelete.title}"?`
                : `Are you sure you want to delete ${selectedSpeechIds.length} selected speech${selectedSpeechIds.length > 1 ? 'es' : ''}?`
              }
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpeechCollection