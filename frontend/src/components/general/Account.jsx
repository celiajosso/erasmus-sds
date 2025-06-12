import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Account = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let username = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub;
    } catch {
      username = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

  if (!token || !username) {
    return (
      <div class="hidden lg:flex gap-2">
        <button
          class="btn btn-soft btn-info mr-2 border-2 border-cyan-500"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        <button
          class="btn btn-soft btn-success border-2 border-green-500"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex">
      <span class="my-auto pr-1">Welcome, <b>{username}</b></span>
      <button
        class="btn btn-soft btn-error ml-3 border-2 border-red-400"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;