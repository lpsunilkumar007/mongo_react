import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Client, UserRegisterDTO } from "./helper/web-api-helper/WebApiClient";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const userClient = new Client();

  const handleRegister = async () => {
    try {
    const request = new UserRegisterDTO();
    request.name = name
      request.email = email;
      request.password = password;
      const response = await userClient.register(request);
      console.log(response);
      navigate("/login");      
    } catch (error) {
      setError("Register failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <CssBaseline />
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <div className="card">
          <div className="card-body">
            <Avatar sx={{ m: 1, bgcolor: "primary.light", mx: "auto" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5" className="text-center">Register</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Login</Link>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Register;
