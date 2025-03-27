import React, { useContext, useEffect, createContext, useState } from 'react'
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner';

const SpeechContext = createContext()

export const SpeechProvider = ({ children }) => {
    const { authTokens } = useAuth()
    const [speeches, setSpeeches] = useState([])
    const [speechLoading, setSpeechLoading] = useState(false)
    const [speechMetrics, setSpeechMetrics] = useState({})

    const deleteSpeech = async(speechId)=>{
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/speeches/${speechId}/`, {
                headers: { 
                    'Authorization': `Bearer ${authTokens.access}`,
                }
            });
            
            if (response.status === 204) {
                toast.success("Speech deleted successfully")
                setTimeout(() => fetchSpeeches(), 900);
                
            }
        } catch (error) {
            toast.error("Unable to delete speech. Server error")
            console.error(error)
        }
    }

    // Fetch speeches function that can be called whenever needed
    const fetchSpeeches = async () => {
        setSpeechLoading(true)
        try {
            let response = await axios.get('http://localhost:8000/api/speeches/', {
                headers: {
                    Authorization: "Bearer " + String(authTokens.access)
                }
            })
            if (response.status === 200) {
                const data = await response.data
                setSpeeches(data)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch speeches")
        }
        setSpeechLoading(false)
    }

    const fetchSpeechMetrics = async(speechId)=>{
        try {
            if (authTokens) {
                let response = await axios.get(`http://localhost:8000/api/speech-metrics/${speechId}`, {
                    headers: {
                        Authorization: "Bearer " + String(authTokens.access)
                    }
                })
                if (response.status === 200) {
                    const data = await response.data
                    setSpeechMetrics(data)
                }
            }
           
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch speech metrices")
        }
        setSpeechLoading(false)
    }

    // Initial fetch
    useEffect(() => {
        if (authTokens) {
            
            fetchSpeeches()
        }
    }, [])

    const uploadSpeech = async (speechData) => {
        try {
            toast.loading("Creating speech")
            const response = await axios.post('http://127.0.0.1:8000/api/speeches/', speechData, {
                headers: { 
                    'Authorization': `Bearer ${authTokens.access}`,
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
            
            
            if (response.status === 201) {
                toast.success("Speech created successfully")
                // After successful upload, fetch the updated list of speeches
                setTimeout(() => fetchSpeeches(), 900);
            }
        } catch (error) {
            toast.error("Failed speech upload")
            console.error(error)
        }
    }

    return (
        <SpeechContext.Provider value={{ uploadSpeech, speeches,fetchSpeechMetrics, fetchSpeeches,speechMetrics,deleteSpeech }}>
            {speechLoading ? <Spinner /> : children}
        </SpeechContext.Provider>
    )
}

export const useSpeech = () => useContext(SpeechContext)