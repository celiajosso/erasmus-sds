import GoBack from "./general/GoBack";
import Header from "./general/Header";
import { useRegister } from "./scripts/RegisterLogic";
import { useState } from "react";

const Register = () => {
  const { username, setUsername, password, setPassword, handleRegister, message } = useRegister();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="p-6 flex flex-col content-center flex-wrap">
      <Header
        title={"✍🏼 Register"}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <GoBack/>

      <form
        class="flex flex-col max-w-[400px] mt-20"
        onSubmit={handleRegister}
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full mx-auto sm:w-64 shadow-md border border-gray-500 rounded px-3 py-2 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mx-auto sm:w-64 shadow-md border border-gray-500 rounded px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          type="submit"
          class="btn btn-soft btn-info border-2 border-sky-500"
        >
          Register
        </button>
      </form>
      {message && <p class="mt-5 text-red-500">{message}</p>}
    </div>
  );
};

export default Register;