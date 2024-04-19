
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthPage from './components/auth/AuthPage'
import Header from './components/web/Header'
import HomePage from './pages/HomePage copy'
import LoginSucess from './components/auth/LoginSucess'
import CreateName from './components/auth/CreateName'
import { useEffect } from 'react'
import InboxPage from './pages/InboxPage'
import UpcomingTaskPage from './pages/UpcomingTaskPage'
import ProjectPage from './pages/ProjectPage copy'
import FilterPage from './pages/FilterPage'
import LabelPage from './pages/LabelPage'
import SettingPage from './pages/SettingPage'
import SettingAccountPage from './components/settings/SettingAccountPage'
import SettingAccountEmail from './components/settings/SettingAccountEmail'
import SettingAccountPassword from './components/settings/SettingAccountPassword'
import SettingThemePage from './components/settings/SettingThemePage'
import SettingGeneralPage from './components/settings/SettingGeneralPage'

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
          <Route path='/app/label/:labelCode' element={<LabelPage></LabelPage>}></Route>
          <Route path='/app/filters-labels' element={<FilterPage></FilterPage>}></Route>
          <Route path='/app/settings' element={<SettingPage></SettingPage>}>
            <Route path='/app/settings/account' element={<SettingAccountPage></SettingAccountPage>}></Route>
            <Route path='/app/settings/account/email' element={<SettingAccountEmail></SettingAccountEmail>}></Route>
            <Route path='/app/settings/account/password' element={<SettingAccountPassword></SettingAccountPassword>}></Route>
            <Route path='/app/settings/theme' element={<SettingThemePage></SettingThemePage>}></Route>
            <Route path='/app/settings/general' element={<SettingGeneralPage></SettingGeneralPage>}></Route>

          </Route>
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
