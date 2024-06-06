import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { AuthProvider } from '.AuthContext';
import RouteChangeTracker from './RouteChangeTracker'
import Login from "./pages/common/LoginPage";
import SignUp from "./pages/common/Signup";
import MainPage from "./pages/user/MainPage";
import Similar from "./pages/user/Similar";
import StudyNote from "./pages/user/StudyNote";
import StudyDetail from "./pages/user/StudyDetail";
import Search from "./pages/user/Search";
import Analyze from "./pages/user/Analyze";
import MyPage from "./pages/user/MyPage"; 
import Profile from "./pages/user/Profile";
import Withdraw from "./pages/user/Withdraw";
import Inquiry from "./pages/user/Inquiry";
import Question from "./pages/user/Question";
import Info from "./pages/user/Info";
import Terms from "./pages/user/Termsofuse";
import Policy from "./pages/user/Policy";
import PersonalData from "./pages/user/PersonalData";
import Loading from "./pages/user/Loading";
import Ocr from "./pages/user/Ocr";

import Mainadmin from "./pages/admin/Mainadmin";
import Adminmodify from "./pages/admin/Adminmodify";
import Memberinfoadmin from "./pages/admin/Memberinfoadmin";
import Infoadmin from "./pages/admin/Infoadmin";
import Memberadmin from "./pages/admin/Memberadmin";
import Askadmin from "./pages/admin/Askadmin";
import Saveadmin from "./pages/admin/Saveadmin";
import Wordadmin from "./pages/admin/Wordadmin";
import Aiadmin from "./pages/admin/Aiadmin";
import Modeladmin from "./pages/admin/Modeladmin";
import Dataadmin from "./pages/admin/Dataadmin";

const Router = () => {

    return (
        <BrowserRouter>
            <RouteChangeTracker />
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/similar/" element={<Similar/>}/>
                <Route path="/studynote" element={<StudyNote/>}/>
                <Route path="/studydetail/:sentenceid" element={<StudyDetail/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/analyze/:sentenceId" element={<Analyze/>}/>
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/withdraw" element={<Withdraw/>}/>
                <Route path="/inquiry" element={<Inquiry/>}/>
                <Route path="/question" element={<Question/>}/>
                <Route path="/info" element={<Info/>}/>
                <Route path="/terms" element={<Terms/>}/>
                <Route path="/policy" element={<Policy/>}/>
                <Route path="/personaldata" element={<PersonalData/>}/>
                <Route path="/loading" element={<Loading/>}/>
                <Route path="/ocr" element={<Ocr/>}/>


                <Route path="/mainadmin" element={<Mainadmin/>}/>
                <Route path="/modifyadmin" element={<Adminmodify/>}/>
                <Route path="/memberinfoadmin" element={<Memberinfoadmin/>}/>
                <Route path="/infoadmin" element={<Infoadmin/>}/>
                <Route path="/memberadmin" element={<Memberadmin/>}/>
                <Route path="/askadmin" element={<Askadmin/>}/>
                <Route path="/saveadmin" element={<Saveadmin/>}/>
                <Route path="/Wordadmin" element={<Wordadmin/>}/>
                <Route path="/Aiadmin" element={<Aiadmin/>}/>
                <Route path="/modeladmin" element={<Modeladmin/>}/>
                <Route path="/dataadmin" element={<Dataadmin/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;