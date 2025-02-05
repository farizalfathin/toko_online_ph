import { useState } from "react";
import { useAuth } from "../utils/store/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formdata;

    if (!email || !password) {
      Swal.fire({
        title: "Login Gagal!",
        text: "Email dan password tidak boleh kosong.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const { error } = await login(email, password);

    if (error) {
      Swal.fire({
        title: "Login Gagal!",
        text: "Periksa kembali email dan password Anda.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
      return;
    }

    Swal.fire({
      title: "Login Berhasil!",
      text: "Anda berhasil masuk ke akun anda!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/"); // Navigasi ke halaman utama setelah login berhasil
    });
  };

  return (
    <main
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)),url('https://www.fastpay.co.id/blog/wp-content/uploads/2020/02/194.-Ide-dan-Tips-Desain-Interior-Minimarket-Untuk-Tampilan-yang-Menarik.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-600 text-white font-semibold rounded-md shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-600">
            Login
          </button>
          <span>
            tidak punya akun?{" "}
            <Link to={"/register"} className="text-yellow-500">
              Register
            </Link>
          </span>
        </form>
      </div>
    </main>
  );
};

export default Login;
