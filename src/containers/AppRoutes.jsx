import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicProvider } from "../contexts/public";
import HomePage from "../pages/Home";

const AppRoutes = () => {

    return (
        <Router>
            <PublicProvider>
                <Routes>
                    <Route exact path="/" element={<HomePage />}></Route>
                </Routes>
            </PublicProvider>
        </Router>
    );
}

export default AppRoutes;