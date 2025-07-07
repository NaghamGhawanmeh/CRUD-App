import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";

import Auth from "./components/Auth";
import Posts from "./components/Posts";
import Users from "./components/Users";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import Sidebar from "./scenes/global/Sidebar";

function App() {
  const [theme, colorMode] = useMode();
  const isLoggedIn = useSelector((reducers) => reducers.authReducer.token);
  console.log("isLoggedIn:", isLoggedIn);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ".MuiDataGrid-root": {
              "--DataGrid-t-header-background-base": "#7075d1",
            },
          }}
        />

        <div className="app" style={{ display: "flex" }}>
          {isLoggedIn && <Sidebar />}

          <main className="content" style={{ flexGrow: 1 }}>
            {/* {isLoggedIn && */}
            <Topbar />
            {/* } */}

            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
