import React, { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios';
import { useAuth } from './AuthContext';
import Spinner from '../components/Spinner';

const ProfileContext = createContext()


export const ProfileProvider = ({ children }) => {
    const {authTokens} = useAuth()

    const [profile, setProfile] = useState({})
    const [profileLoading, setProfileLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let response = await axios.get('http://localhost:8000/api/profile/', {
                    headers: {
                        Authorization: "Bearer "+String(authTokens.access)
                    }
                })
                // console.log(response)
                if (response.status===200) {
                    
                    const data = await response.data
                    setProfile(data)
                }
            } catch (error) {
                console.log(error)
            }
            setProfileLoading(false)
        }
        fetchProfile()
    }, [])


    return (
        <ProfileContext.Provider value={{ profile }}>
            {profileLoading?<Spinner/>:children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)