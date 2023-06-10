import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicProvider } from "../contexts/public";
import HomePage from "../pages/Home";
import TeamsPage from "../pages/Teams";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ErrorPage from "../pages/Error";

const AppRoutes = () => {

    return (
        <Router>
            <PublicProvider>
                <Routes>
                    <Route exact path="/" element={<HomePage />}></Route>
                    <Route exact path="/login" element={<LoginPage />}></Route>
                    <Route exact path="/register" element={<RegisterPage />}></Route>
                    <Route exact path="/teams/:competicao" element={<TeamsPage />}></Route>
                    <Route exact path="*" element={<ErrorPage />}></Route>
                </Routes>
            </PublicProvider>
        </Router>
    );
}

export default AppRoutes;