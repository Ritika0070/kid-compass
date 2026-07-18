import { useState } from "react";
import LoginScene from "./LoginScene";
import SignUpScene from "./SignUpScene";
import VerifyScene from "./VerifyScene";

export default function AuthFlow() {
  const [screen, setScreen] = useState("login"); // 'login' | 'signup' | 'verify'

  if (screen === "login") {
    return <LoginScene onSignUp={() => setScreen("signup")} />;
  }

  if (screen === "signup") {
    return (
      <SignUpScene
        onLogin={() => setScreen("login")}
        onSubmit={() => setScreen("verify")}
      />
    );
  }

  if (screen === "verify") {
    return <VerifyScene onLogin={() => setScreen("login")} onSubmit={() => console.log("verified!")} />;
  }

  return null;
}