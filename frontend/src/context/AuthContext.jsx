import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()


  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode((localStorage.getItem('authTokens'))) : null)
  const [authLoading, setAuthLoading] = useState(true)


  const register = async(credentials)=>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/',credentials,{
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(response.status)
      if (response.status===201) {
      toast.success("Registration successful! Redirecting...");
      setTimeout(() => navigate('/login'), 2000);
      }
      else{
        toast.error("Server Error!");
      }
    } catch (error) {
      console.log(error.response)
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  }
  

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', credentials, {
        headers: { 'Content-Type': 'application/json' }
      })
      if (response.status === 200) {
        let data = await response.data
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        toast.success("Successfully Logged In!");
        setTimeout(() => navigate('/home'), 2000);
        // navigate('/home')
      } else {
        alert('Something went wrong')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Login Failed");
    }
  }


  const logout = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  let updateToken = async () => {
    console.log('Update token called')
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/refresh/', {
        refresh: authTokens?.refresh
      });
      if (response.status===200) {
        let data = await response.data
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
      }
      else{
        logout()
      }
    } catch (error) {
      // console.error('Failed to refresh token:', error.response ? error.response.data : error.message);
      logout();
    }
    if (authLoading) {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    if (authLoading && authTokens) {
      updateToken()
    }
    else{
      setAuthLoading(false)
    }

    let fourMinutes = 1000*60*4
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes);
    return ()=>clearInterval(interval)

  }, [authTokens,authLoading])
  


  return (
    <AuthContext.Provider value={{ login, user, logout,register,authTokens }}>
      {authLoading?<Spinner/>:children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)




