import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(authService.getToken());
  const [user, setUserState] = useState(authService.getUser());
  const [registrationNumber, setRegistrationNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = authService.getToken();
    if (storedToken) {
      authService.setAuthToken(storedToken);
      authService.fetchCurrentUser()
        .then((result) => {
          if (result?.success) {
            setUserState(result.user);
          } else {
            authService.logout();
            setTokenState(null);
            setUserState(null);
          }
        })
        .catch(() => {
          authService.logout();
          setTokenState(null);
          setUserState(null);
        });
    }
  }, []);

  const login = async ({ registrationNumber, password }) => {
    setLoading(true);
    try {
      const data = await authService.login({ registrationNumber, password });
      if (data.success) {
        setRegistrationNumber(registrationNumber);
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    if (!registrationNumber) {
      return {
        success: false,
        message: "Registration number is required before OTP verification.",
      };
    }

    setLoading(true);
    try {
      const data = await authService.verifyOtp({
        registrationNumber,
        otp,
      });

      if (data.success && data.token) {
        authService.setToken(data.token);
        authService.saveUser(data.user);
        setTokenState(data.token);
        setUserState(data.user);
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setTokenState(null);
    setUserState(null);
    setRegistrationNumber(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      registrationNumber,
      loading,
      login,
      verifyOtp,
      logout,
      isAuthenticated: Boolean(token),
      setRegistrationNumber,
    }),
    [token, user, registrationNumber, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
