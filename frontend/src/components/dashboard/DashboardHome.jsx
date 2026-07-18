import { useAuth } from "../../hooks/useAuth";

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-6 text-center">
      <h1
        style={{ fontFamily: "'Londrina Shadow', cursive", fontSize: "clamp(36px, 6vw, 70px)" }}
      >
        Welcome{user?.name ? `, ${user.name}` : ""}!
      </h1>
      <p
        className="text-gray-700 mt-3"
        style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "clamp(16px, 2.5vw, 22px)" }}
      >
        Dashboard content goes here.
      </p>
    </div>
  );
}