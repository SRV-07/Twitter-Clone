
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './pages/Login/login';
import Home from './pages/Home';
import Signup from './pages/Login/signup';
import ProtectedRoute from './pages/Login/ProtectedRoutes';
import PageLoading from './pages/PageLoading';
import Feed from "./pages/Feed/feed" 
import Explore from "./pages/Explore/Explore"
import Notification from "./pages/Notification/Notification"
import Messages from "./pages/Messages/Messages"
import Bookmarks from "./pages/Bookmarks/Bookmarks"
import Lists from "./pages/Lists/Lists"
import Profile from "./pages/Profile/Profile"
import More from "./pages/More/More"


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} >
      <Route index element={<Feed />} />
      </Route>
      <Route path='/Home' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      <Route path='feed' element={<Feed />} />     
      <Route path='explore' element={<Explore />} />     
      <Route path='notification' element={<Notification />} />     
      <Route path='messages' element={<Messages />} />     
      <Route path='bookmarks' element={<Bookmarks />} />     
      <Route path='lists' element={<Lists />} />     
      <Route path='profile' element={<Profile />} />   
      <Route path='more' element={<More />} /> 
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/page-loading' element={<PageLoading />} />
     </Routes>
     </BrowserRouter>

    </div>
  );
}

export default App;
