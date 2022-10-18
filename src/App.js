import { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import CopyRight from "./components/CopyRight.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import axios from "axios";
import Test from "./pages/Test.jsx";
import Contact from "./pages/Contact.jsx";
import Status from "./pages/Status.jsx";
import ShowTicket from "./pages/ShowTicket.jsx";
import ShowStatus from "./pages/ShowStatus.jsx";

const UserContext = createContext()

function App() {

  const [user, setUser] = useState({});
  
  useEffect(() => {
    (
      async () => {
        const USER_URL = "http://localhost:8000/api/user";
        const res = await axios.get(USER_URL, {
          withCredentials : true
        });
        if(res.data?.name)
          setUser(res.data);
      }
    )();
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact><Home /></Route>
            <Route path="/about" exact> <About /></Route>
            <Route path="/contact" exact> <Contact /></Route>
            <Route path="/login" exact> <Login /></Route>
            <Route path="/signup" exact> <Signup /></Route>
            <Route path="/test/:contestID/:problemIndex" exact> <Test /></Route>
            <Route path="/status" exact> <ShowStatus /> </Route>
            <Route path="/status/ticket/:ticketID" exact> <ShowTicket /> </Route>
            <Route path="/status/:ticketID" exact> <Status /> </Route>
          </Switch>
        </Router>
        <CopyRight />
      </div>
    </UserContext.Provider>
  );
}

export default App;
export {UserContext}
