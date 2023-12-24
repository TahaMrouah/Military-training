import { Home } from "./Components/pages";
import Username from "./Components/auth/Username";
import Password from "./Components/auth/Password";
import Register from "./Components/auth/Register";
import Profile from "./Components/auth/Profile";
import Reset from "./Components/auth/Reset";
import PageNotFound from "./Components/auth/PageNotFound";
import Recovery from "./Components/auth/Recovery";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/layout/Layout";
/** auth middleware */
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Layout>
              <Home />
            </Layout>
          }
        ></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/password"
          element={
            <ProtectRoute>
              <Password />
            </ProtectRoute>
          }
        ></Route>
        <Route path="/recovery" element={<Recovery />}></Route>
        <Route path="/reset" element={<Reset />}></Route>
        <Route
          path="/profile"
          element={
            <AuthorizeUser>
              <Profile />
            </AuthorizeUser>
          }
        ></Route>
        <Route
          path="/username"
          element={
            isLoggedIn === "true" ? (
              <AuthorizeUser>
                <Profile />
              </AuthorizeUser>
            ) : (
              <Username />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
