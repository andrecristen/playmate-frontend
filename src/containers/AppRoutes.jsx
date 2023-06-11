import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicProvider } from "../contexts/public";
import HomePage from "../pages/Home";
import TeamsPage from "../pages/Teams";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ErrorPage from "../pages/Error";
import LogoutPage from "../pages/Logout";
import AthletesPage from "../pages/Athletes";
import PrivateContainer from "../components/UI/PrivateContainer";

const AppRoutes = () => {

    return (
        <Router>
            <PublicProvider>
                <Routes>
                    {/* Rotas públicas */}
                    <Route exact path="/" element={<HomePage />}></Route>
                    <Route exact path="/login" element={<LoginPage />}></Route>
                    <Route exact path="/logout" element={<LogoutPage />}></Route>
                    <Route exact path="/register" element={<RegisterPage />}></Route>
                    <Route exact path="/teams/:competicao" element={<TeamsPage />}></Route>
                    {/* Rotas para usuários logados */}
                    <Route exact path="/athletes" element={<PrivateContainer><AthletesPage /></PrivateContainer>}></Route>
                    <Route exact path="/clubs" element={<PrivateContainer><AthletesPage /></PrivateContainer>}></Route>
                    <Route exact path="/solicitations" element={<PrivateContainer><AthletesPage /></PrivateContainer>}></Route>
                    <Route exact path="/profile" element={<PrivateContainer><AthletesPage /></PrivateContainer>}></Route>
                    {/* Rotas de erros */}
                    <Route exact path="*" element={<ErrorPage />}></Route>
                </Routes>
            </PublicProvider>
        </Router>
    );
}

export default AppRoutes;