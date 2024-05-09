// Importing packages
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

// Importing stores
import currentUserState from "../../store/staff.store";

// Importing components

// Importing apis
import authApi from "../../apis/auth.api";
import Loader from "../../components/Loader/Loader";

export default function ProtectedRouter() {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);
  const checkUserSession = () => {
   console.log(currentLoggedInUser);
    authApi.verifySession({  
      success: ({ data }) => {
        setCurrentLoggedInUser({
          ...currentLoggedInUser,
          ...data.data,
          isLoggedIn: true,
        });
       

        console.log(currentLoggedInUser);
      },
      error: () => {
        navigate("/");
      },
      final: () => {
        setIsLoaded(true);
      },
    });
  };

  useEffect(() => {
    checkUserSession();
  }, [navigate]);

  return (
    <>
      {isLoaded ? (
        currentLoggedInUser.isLoggedIn ? (
          <Outlet />
        ) : (
          <Navigate to="/" />
        )
      ) : (
         <Loader />
      )}
    </>
  );
}
