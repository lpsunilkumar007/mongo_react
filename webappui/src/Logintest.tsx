import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { Client, UserLoginDTO } from "./helper/web-api-helper/WebApiClient";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const userClient = new Client();

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const [error, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const login = async () => {
    try {
      const request = new UserLoginDTO();
      request.email = formData.email;
      request.password = formData.password;
      const response = await userClient.login(request);
      await localStorage.setItem("token", response);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      login();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
            {error && <Typography color="error">{}</Typography>}
            <form onSubmit={handleLogin}>
              <Box sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
                <Grid container justifyContent={"flex-end"}>
                  <Grid item>
                    <a href="/register">Don't have an account? Register</a>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
