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

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "25ch",
  },
}));

export default function Login(props) {
  const classes = useStyles();
  return (
    <form onSubmit={props.requestServer}>
      <h1>Login</h1>

      <TextField
        required
        id="outlined-required"
        label="E-mail"
        variant="outlined"
        type="email"
        name="email"
        value={props.data.email}
        onChange={props.getValue}
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
          value={props.data.pwd}
          onChange={props.getValue}
          type={props.values.showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={props.handleClickShowPassword}
                onMouseDown={props.handleMouseDownPassword}
                edge="end"
              >
                {props.values.showPassword ? <Visibility /> : <VisibilityOff />}
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
  );
}
