import { useState } from "react";
import { useRouter } from "next/router";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Link from "next/link";
import css from "./Login.module.scss";

const Login = (props) => {
  // CSS
  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "8px 0" };

  // States
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Functions
  const _doLogin = async (e) => {
    const loginResponse = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });

    if (loginResponse.status === 200) {
      setLoginError(false);
      const userData = await loginResponse.json();
      router.push({
        pathname: "/information",
        query: { data: JSON.stringify(userData) },
      });
      return;
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter Username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={loginError}
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={buttonStyle}
          onClick={_doLogin}
          fullWidth
        >
          Sign in
        </Button>
        {/* 
        <Typography>
          <Link href="/forgotPassword">Forgot password ?</Link>
        </Typography>
        <Typography>
          Do you have an account ?<Link href="/signUp">Sign Up</Link>
        </Typography>
        */}
      </Paper>
    </Grid>
  );
};

export default Login;
