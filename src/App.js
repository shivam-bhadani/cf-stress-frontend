import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import CopyRight from "./components/CopyRight.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path="/about" exact> <About /></Route>
          <Route path="/login" exact> <Login /></Route>
          <Route path="/signup" exact> <Signup /></Route>
        </Switch>
      </Router>
      <CopyRight />
    </div>
  );
}

export default App;
