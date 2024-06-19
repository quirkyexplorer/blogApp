import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {

  let auth = {'token':true}return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}

//TODO 
// following this tut https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c