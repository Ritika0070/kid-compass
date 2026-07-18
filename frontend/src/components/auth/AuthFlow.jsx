import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoginScene from "./LoginScene";
import SignUpScene from "./SignUpScene";
import VerifyScene from "./VerifyScene";

export default function AuthFlow() {
  const [screen, setScreen] = useState("login"); // 'login' | 'signup' | 'verify'


  const [direction, setDirection] = useState(null);

  const navigate = (next, dir) => {
    setDirection(dir);
    setScreen(next);
  };

  return (

    <AnimatePresence custom={direction} mode="sync">
      {screen === "login" && (
        <LoginScene
          key="login"
          direction={direction}
          onSignUp={() => navigate("signup", "login-signup")}
        />
      )}

      {screen === "signup" && (
        <SignUpScene
          key="signup"
          direction={direction}
          onLogin={() => navigate("login", "signup-login")}
          onSubmit={() => navigate("verify", "signup-verify")}
        />
      )}

      {screen === "verify" && (
        <VerifyScene
          key="verify"
          direction={direction}
          onLogin={() => navigate("login", "verify-login")}
          onSubmit={() => console.log("verified!")}
        />
      )}
    </AnimatePresence>
  );
}