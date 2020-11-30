import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Button,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "25ch",
  },
}));

function App() {
  const classes = useStyles();
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [data, setData] = useState({});

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
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={requestServer}>
        <TextField
          required
          id="outlined-required"
          label="E-mail"
          variant="outlined"
          type="email"
          name="email"
          value={data.email}
          onChange={getValue}
        />
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-password"
            name="pwd"
            value={data.pwd}
            onChange={getValue}
            type={values.showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default App;
