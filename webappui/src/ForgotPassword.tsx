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
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const ForgotPassword = () => {
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
              Forgot password
            </Typography>

            <Box sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
              />
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <a href="/login">Back to Login</a>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
