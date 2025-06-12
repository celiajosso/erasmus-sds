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
      <div>
        <button
          class="btn btn-soft btn-info mr-2"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        <button
          class="btn btn-soft btn-success"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <span>Welcome, <b>{username}</b></span>
      <button
        class="btn btn-soft btn-error ml-3"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;