import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/Appcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Header from "./components/Header";
import Main from "./pages/Main";
import Account from "./pages/Account";
import Dish from "./pages/Dish";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import Spinner from "./components/Spinner";
import "./static/app.css";
import "./static/style.css";
import "./static/util.css";
function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Search />} />
          <Route path="/food/:id" element={<Main />} />
          <Route path="/dish/:recipt" element={<Dish />} />
          <Route path="/account" element={<Account />} />
          <Route path="/spinner" element={<Spinner />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
