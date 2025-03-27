import { useState, useRef, useEffect } from "react"
import { Upload, Mic, X, Pause, Play, ImageIcon } from "lucide-react"
import { useSpeech } from "../context/SpeechContext"
import { toast } from 'react-toastify'

const SpeechCreationForm = () => {

  const {uploadSpeech} = useSpeech()
  // console.log(uploadSpeech)
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    speech: null,
    duration: "00:00:00",
    image: null,
  })

  // UI state
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioPreview, setAudioPreview] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Refs
  const audioRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSpeechUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "audio/mpeg") {
      const audioUrl = URL.createObjectURL(file)
      const audio = new Audio(audioUrl)
  
      audio.addEventListener('loadedmetadata', () => {
        // Ensure duration is a valid number
        const duration = isFinite(audio.duration) ? audio.duration : 0
        
        console.log('Audio Duration:', duration)
        
        const formattedDuration = formatDuration(duration)
        console.log('Formatted Duration:', formattedDuration)
  
        setFormData((prev) => ({
          ...prev,
          speech: file,
          duration: formattedDuration,
        }))
  
        setAudioPreview(audioUrl)
  
        // Clean up the object URL to prevent memory leaks
        URL.revokeObjectURL(audioUrl)
      })
  
      audio.addEventListener('error', (e) => {
        console.error('Error loading audio:', e)
        // Fallback handling
        setFormData((prev) => ({
          ...prev,
          speech: file,
          duration: '00:00',
        }))
      })
  
      // Trigger loading
      audio.load()
    }
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))

      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Format seconds to HH:MM:SS
  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Start recording
  // const startRecording = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true })
  //     .then((stream) => {
  //       mediaRecorderRef.current = new MediaRecorder(stream)
  //       audioChunksRef.current = []

  //       mediaRecorderRef.current.ondataavailable = (e) => {
  //         audioChunksRef.current.push(e.data)
  //       }

  //       mediaRecorderRef.current.onstop = () => {
  //         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mpeg" })
  //         const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mpeg" })

  //         setFormData((prev) => ({
  //           ...prev,
  //           speech: audioFile,
  //           duration: formatDuration(recordingTime),
  //         }))

  //         setAudioPreview(URL.createObjectURL(audioBlob))
  //         setRecordingTime(0)
  //       }

  //       mediaRecorderRef.current.start()
  //       setIsRecording(true)

  //       // Start timer
  //       const startTime = Date.now()
  //       const timerInterval = setInterval(() => {
  //         setRecordingTime((Date.now() - startTime) / 1000)
  //       }, 1000)

  //       mediaRecorderRef.current.timerInterval = timerInterval
  //     })
  //     .catch((err) => {
  //       console.error("Error accessing microphone:", err)
  //     })
  // }

  const startRecording = () => {
    let recordingStartTime = 0; // Local variable to track start time
  
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream)
        audioChunksRef.current = []
  
        // Record start time when recording begins
        recordingStartTime = Date.now()
  
        mediaRecorderRef.current.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data)
        }
  
        mediaRecorderRef.current.onstop = () => {
          // Calculate total recording duration
          const recordingDuration = (Date.now() - recordingStartTime) / 1000
  
          // Stop the timer interval
          if (mediaRecorderRef.current.timerInterval) {
            clearInterval(mediaRecorderRef.current.timerInterval)
          }
  
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mpeg" })
          const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mpeg" })
  
          setFormData((prev) => ({
            ...prev,
            speech: audioFile,
            duration: formatDuration(recordingDuration), // Use calculated duration
          }))
  
          setAudioPreview(URL.createObjectURL(audioBlob))
          setRecordingTime(0)
  
          // Stop all tracks to release the media stream
          stream.getTracks().forEach(track => track.stop())
        }
  
        mediaRecorderRef.current.start()
        setIsRecording(true)
  
        // Start timer
        const timerInterval = setInterval(() => {
          setRecordingTime((prevTime) => (Date.now() - recordingStartTime) / 1000)
        }, 1000)
  
        mediaRecorderRef.current.timerInterval = timerInterval
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err)
      })
  }

  
  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      clearInterval(mediaRecorderRef.current.timerInterval)
      setIsRecording(false)

      // Stop all tracks on the stream
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
    }
  }

  // Toggle audio playback
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle audio ended event
  useEffect(() => {
    const handleAudioEnded = () => {
      setIsPlaying(false)
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnded)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded)
      }
    }
  }, [audioPreview])


const handleSubmit = async (e) => {
  e.preventDefault()

  // Check if speech file exists
  if (!formData.speech) {
    toast.warning("Please upload or record a speech file")
    return
  }

  // Create FormData object
  const formDataToSend = new FormData()
  
  // Append all form data
  formDataToSend.append('title', formData.title)
  formDataToSend.append('description', formData.description || '')
  formDataToSend.append('speech', formData.speech)
  
  // Append image if it exists
  if (formData.image) {
    formDataToSend.append('image', formData.image)
  }
  
  // Convert duration to seconds
  const durationInSeconds = durationToSeconds(formData.duration)
  formDataToSend.append('duration', durationInSeconds.toString())

  try {
    // Call uploadSpeech with FormData
    await uploadSpeech(formDataToSend)
    
    // Reset form after successful submission
    setFormData({
      title: "",
      description: "",
      speech: null,
      duration: "00:00:00",
      image: null,
    })
    setAudioPreview(null)
    setImagePreview(null)
  } catch (error) {
    console.error("Error submitting form:", error)
    toast.warning("Failed to create speech. Please try again.")
  }
}

// Helper function to convert HH:MM:SS to seconds
const durationToSeconds = (duration) => {
  const [hours, minutes, seconds] = duration.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

  // Remove audio
  const removeAudio = () => {
    setFormData((prev) => ({
      ...prev,
      speech: null,
      duration: "00:00:00",
    }))
    setAudioPreview(null)
    setIsPlaying(false)
  }

  // Remove image
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }))
    setImagePreview(null)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Speech</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter speech title"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter speech description"
          />
        </div>

        {/* Speech Audio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Speech Audio</label>

          {audioPreview ? (
            <div className="mt-2 p-4 border border-gray-300 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={togglePlayback}
                    className="mr-3 flex-shrink-0 h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <span className="text-sm text-gray-700">Duration: {formData.duration}</span>
                </div>
                <button type="button" onClick={removeAudio} className="text-red-600 hover:text-red-800">
                  <X size={18} />
                </button>
              </div>
              <audio ref={audioRef} src={audioPreview} className="hidden" />
            </div>
          ) : (
            <div className="mt-2 flex space-x-4">
              {/* Upload option */}
              <div className="flex-1">
                <label
                  htmlFor="speech-upload"
                  className={`cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${isRecording ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Upload className="mr-2 h-5 w-5 text-gray-500" />
                  <span>Upload MP3</span>
                  <input
                    id="speech-upload"
                    name="speech-upload"
                    type="file"
                    accept="audio/mpeg"
                    onChange={handleSpeechUpload}
                    disabled={isRecording}
                    className="sr-only"
                  />
                </label>
              </div>

              {/* Record option */}
              <div className="flex-1">
                {isRecording ? (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <span className="mr-2 h-2 w-2 rounded-full bg-white animate-pulse"></span>
                    <span>Stop ({formatDuration(recordingTime)})</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <Mic className="mr-2 h-5 w-5 text-gray-500" />
                    <span>Record</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>

          {imagePreview ? (
            <div className="mt-2 relative">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Speech cover"
                className="h-48 w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="mt-2">
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <ImageIcon className="mr-2 h-5 w-5 text-gray-500" />
                <span>Upload Image</span>
                <input
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Create Speech
          </button>
        </div>
      </form>
    </div>
  )
}

export default SpeechCreationForm

