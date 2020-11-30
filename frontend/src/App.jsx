import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Axios from "axios";
import Message from "./components/Message";
import Login from "./components/Login";
import Warning from "./components/Warning";
import Registration from "./components/Registration";
import Navigation from "./components/Navigation";

function App() {
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [data, setData] = useState({});

  const [userInfo, setUserInfo] = useState({});

  const [isLogged, setIsLogged] = useState(false);

  const [message, setMessage] = useState("");

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const requestServer = (e) => {
    e.preventDefault();
    console.log("server was called");
    Axios({
      method: "POST",
      url: "http://localhost:5005/users/login",
      data: data,
    })
      .then((response) => {
        console.log(response);
        if (response.data.userData) {
          setIsLogged(true);
          setUserInfo(response.data.userData);
          setMessage("");
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/register">
            <Registration values={values} />
          </Route>
          <Route path="/login">
            {isLogged ? (
              <Message userInfo={userInfo} />
            ) : (
              <Login
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
                getValue={getValue}
                requestServer={requestServer}
                values={values}
                data={data}
              />
            )}
            <Warning message={message} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
