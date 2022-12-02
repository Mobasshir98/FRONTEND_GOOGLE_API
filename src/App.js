import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./Components/signup/Signup";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Protected from "./Components/Protected";
import Cookies from "js-cookie";
import { Dashboard } from "./Components/Dashboard/Dashboard";
function App() {
    const token = localStorage.getItem("token")|| Cookies.get("token");
  return (
    <Router>
      <Routes>
        <Route element={<Protected />}>
          <Route path="/subscriptions" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route path="/signup" element={<Signup />} />
        {!token&&<Route path="/login" element={<Login />}/>}
        <Route path="/login" exact element={<Navigate replace to="/dashboard" />} />
        <Route path="/" exact element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
