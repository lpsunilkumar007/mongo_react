import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Client, UserLoginDTO } from "./helper/web-api-helper/WebApiClient";

const userClient = new Client();

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const request = new UserLoginDTO();
      request.email = email;
      request.password = password;
      const response = await userClient.login(request);
      const data = response;
      localStorage.setItem("token", data['token' as any]);
      console.log(response);
      navigate("/");
 
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <CssBaseline />
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <div className="card">
          <div className="card-body">
            <Avatar sx={{ m: 1, bgcolor: "primary.light", mx: "auto" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5" className="text-center">
              Login
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <a href="/forgotpassword">Forgot password?</a> */}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <Link to="/register">Don't have an account? Register</Link>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
