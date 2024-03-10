
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthPage from './components/auth/AuthPage'
import Header from './components/web/Header'
import HomePage from './pages/HomePage'
import LoginSucess from './components/auth/LoginSucess'
import CreateName from './components/auth/CreateName'
import { useEffect } from 'react'
import InboxPage from './pages/InboxPage'
import UpcomingTaskPage from './pages/UpcomingTaskPage'

import ProjectPage from './pages/ProjectPage'
import FilterPage from './pages/FilterPage'

function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<RedirectPage></RedirectPage>}></Route>
        <Route path='/app' element={<Header></Header>}>
          <Route path='/app/inbox' element={<InboxPage></InboxPage>}></Route>
          <Route path='/app/today' element={<HomePage></HomePage>}></Route>
          <Route path='/app/upcoming' element={<UpcomingTaskPage></UpcomingTaskPage>}></Route>
          <Route path='/app/project/:projectCode' element={<ProjectPage></ProjectPage>}></Route>
          <Route path='/app/filters-labels' element={<FilterPage></FilterPage>}></Route>
        </Route>
        <Route path='/auth' element={<AuthPage></AuthPage>}>
          <Route path='/auth/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/auth/register' element={<RegisterPage></RegisterPage>}></Route>
          <Route path='/auth/login-success' element={<LoginSucess></LoginSucess>}></Route>
          <Route path='/auth/create-name' element={<CreateName></CreateName>}></Route>
        </Route>
      </Routes>
    </>
  )
}
const RedirectPage = () => {
  const redirect = useNavigate();
  useEffect(() => {
    redirect("/app/today");
  })
  return (
    <></>
  );
}
export default App
