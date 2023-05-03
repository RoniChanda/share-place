import React, { Suspense, useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
// import Users from "./user/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import UserPlaces from "./places/pages/UserPlaces";
// import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import ErrorPage from "./shared/pages/Error";
import RootLayout from "./shared/pages/Root";

// Lazy loading
const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const fallback = (
    <div className="center">
      <LoadingSpinner />
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={fallback}>
              <Users />
            </Suspense>
          ),
        },
        {
          path: ":userId/places",
          element: (
            <Suspense fallback={fallback}>
              <UserPlaces />
            </Suspense>
          ),
        },
        {
          path: "places",
          children: [
            {
              path: "new",
              element: isLoggedIn ? (
                <Suspense fallback={fallback}>
                  <NewPlace />
                </Suspense>
              ) : (
                <Navigate to="/auth" />
              ),
            },
            {
              path: ":placeId",
              element: isLoggedIn ? (
                <Suspense fallback={fallback}>
                  <UpdatePlace />
                </Suspense>
              ) : (
                <Navigate to="/auth" />
              ),
            },
          ],
        },
        {
          path: "auth",
          element: !isLoggedIn ? (
            <Suspense fallback={fallback}>
              <Auth />
            </Suspense>
          ) : (
            <Navigate to="/" />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
