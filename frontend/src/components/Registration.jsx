import React from "react";
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

export default function Registration(props) {
  const classes = useStyles();

  const sendData = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    Axios({
      method: "POST",
      url: "http://localhost:5005/users/register",
      data: data,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={sendData}>
      <h1>Registration</h1>

      <TextField
        required
        id="outlined-required"
        label="First Name"
        variant="outlined"
        type="text"
        name="firstName"
      />

      <TextField
        required
        id="outlined-required"
        label="Last Name"
        variant="outlined"
        type="text"
        name="lastName"
      />

      <TextField
        required
        id="outlined-required"
        label="E-mail"
        variant="outlined"
        type="email"
        name="email"
      />
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-password"
          name="pwd"
          type={props.values.showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                {props.values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
    </form>
  );
}
