import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice'
import {Footer, Header} from './components'
import { Outlet } from 'react-router-dom';

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  // Now we will make a state name loading cause we are fetching data from the server so it takes time for network request to be completed so then we will make a laoding state then we can render that using if-else condition if the loading is true then we will show loading icon if false the n we will show the data.
  // Remember always whenevr we need to fetch data from server or database then we should always use loading state
  const [loading, setLoading] = useState(true);
  // now we will make a dispatch state to
  const dispatch = useDispatch()
  // whenever the apllication will load then take a useEffect & ask authService through useEffect that you are logged in or logged out
  useEffect(() => {
    // now ask ask authService that who is your current user
    authService.getCurrentUser()
    .then((userData) => { // if data succesfully fetched then make a calback
      if (userData) {
        dispatch(login({userData}))
      } else{
        dispatch(logout())
      }
    }) 
    .finally(() => setLoading(false))
  }, [])
  
  // if  (loading) {
  //   return <div>Loading...</div>;
  // }

  // or
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO: <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
