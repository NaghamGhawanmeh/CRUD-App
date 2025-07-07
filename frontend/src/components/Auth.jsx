import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/reducers/auth";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginValidation = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const registerValidation = Yup.object({
    username: Yup.string().min(3, "At least 3 characters").required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email: values.email,
        password: values.password,
      });
      setStatus(true);
      setMessage(response.data.message);
      console.log("Response:", response);

      dispatch(
        setLogin({
          token: response.data.token,
          roleId: response.data.roleId,
          userId: response.data.userId,
        })
      );
      navigate("/dashboard");
    } catch (err) {
      setStatus(false);
      setMessage(err.response?.data?.message || "Login failed");
      console.log("err:", err);
    }
  };

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          userName: values.username,
          email: values.email,
          password: values.password,
        }
      );
      setStatus(true);
      setMessage(response.data.message);

      console.log("Response:", response);
    } catch (err) {
      setStatus(false);
      setMessage(err.response?.data?.message || "Register failed");
      console.log("err:", err);
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {isRegister ? "Sign up" : "Sign in"}
          </Typography>
          <Formik
            initialValues={
              isRegister
                ? { username: "", email: "", password: "" }
                : { email: "", password: "" }
            }
            validationSchema={isRegister ? registerValidation : loginValidation}
            onSubmit={isRegister ? handleRegister : handleLogin}
          >
            {({ handleChange, handleBlur, values, touched, errors }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: "16px",
                }}
              >
                {isRegister && (
                  <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <TextField
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Your username"
                      fullWidth
                      variant="outlined"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                  </FormControl>
                )}
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    fullWidth
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••"
                    fullWidth
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </FormControl>
                <Button type="submit" fullWidth variant="contained">
                  {isRegister ? "Sign up" : "Sign in"}
                </Button>
              </Form>
            )}
          </Formik>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              {isRegister
                ? "Already have an account? "
                : "Don't have an account? "}
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Sign in" : "Sign up"}
              </Link>
            </Typography>
            {message && (
              <Typography
                sx={{
                  textAlign: "center",
                  mt: 2,
                  color: status ? "green" : "red",
                }}
              >
                {message}
              </Typography>
            )}
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
};

export default Auth;
