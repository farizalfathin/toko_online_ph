import { useEffect, useState } from "react";
import { useAuth } from "../utils/store/useAuth";
import { Focus, HistoryIcon } from "lucide-react";
import { supabase } from "../utils/SupClient";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Profile = () => {
  const {
    id: userId,
    full_name,
    loading,
    email,
    username,
    avatar_url,
  } = useAuth();
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    username: "",
    avatar_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      full_name: full_name || "",
      email: email || "",
      username: username || "",
      avatar_url: avatar_url || "",
    });
    setPreviewImage(avatar_url || "");
  }, [full_name, email, username, avatar_url]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Jika ada gambar baru yang diunggah
      if (formData.avatar_url instanceof File) {
        const fileExt = formData.avatar_url.name.split(".").pop(); // Ekstensi file
        const fileName = `${Date.now()}.${fileExt}`; // Nama unik untuk file
        const filePath = `avatars/${fileName}`;

        // Upload ke bucket Supabase
        const { error: uploadError } = await supabase.storage
          .from("imageCatalog")
          .upload(filePath, formData.avatar_url);

        if (uploadError) throw uploadError;

        // Dapatkan URL gambar
        const { data, error: urlError } = supabase.storage
          .from("imageCatalog")
          .getPublicUrl(filePath);

        if (urlError) throw urlError;

        formData.avatar_url = data.publicUrl;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          email: formData.email,
          username: formData.username,
          avatar_url: formData.avatar_url,
        })
        .eq("id", userId); // Ganti user_id dengan ID pengguna saat ini

      if (updateError) throw updateError;

      Swal.fire({
        title: "Update Profile Berhasil!",
        text: "Anda berhasil Update Profile akun anda!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/profile";
      });
    } catch (error) {
      Swal.fire({
        title: "Login Gagal!",
        text: "Error Update Profile.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <h2 className=" h-screen text-center  flex place-items-center">
        loading
      </h2>
    );
  }
  return (
    <>
      <Helmet>
        <title>Toko Online - Profile</title>
      </Helmet>
      <div className="bg-gradient-to-r from-yellow-800 to-yellow-900 min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-xl w-full p-8 transition-all duration-300 animate-fade-in">
          <div className="flex gap-4 mb-4">
            <Link
              to="/product"
              className="flex items-center rounded shadow-md gap-2 w-fit p-1 hover:bg-zinc-200">
              <IoArrowBack /> Kembali
            </Link>
            <Link
              to="/riwayat"
              className="flex items-center rounded shadow-md gap-2 w-fit p-1 hover:bg-zinc-200">
              <HistoryIcon /> Riwayat Pembelian
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Profile Picture"
                  className="rounded-full w-48 h-48 object-center object-cover border-2 border-yellow-700 mx-auto mb-4 transition-transform duration-300"
                />
                <div className="absolute bottom-5 right-5 flex items-center">
                  <input
                    type="file"
                    id="avatar_url"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData({ ...formData, avatar_url: file }); // Set file value in the form
                        setPreviewImage(URL.createObjectURL(file)); // Update preview avatar
                      }
                    }}
                  />
                  <label
                    htmlFor="avatar_url"
                    className="p-1 bg-yellow-500 border-2 border-white rounded-full cursor-pointer">
                    <Focus className="size-6 text-white" />
                  </label>
                </div>
              </div>

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                placeholder="Input Fullname"
                onChange={handleChange}
                className="px-2 py-1 font-medium text-slate-700 dark:text-white mb-2 border border-yellow-300 rounded"
              />

              <input
                type="text"
                name="username"
                value={formData.username}
                placeholder="Input Username"
                onChange={handleChange}
                className="px-2 py-1 font-medium text-slate-700 dark:text-white mb-2 border border-yellow-300 rounded"
              />
              <input
                type="text"
                name="email"
                value={formData.email}
                placeholder="Input Email"
                onChange={handleChange}
                className="px-2 py-1 font-medium text-slate-700 dark:text-white mb-2 border border-yellow-300 rounded"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 bg-yellow-800 text-white px-4 py-2 rounded-lg hover:bg-yellow-900 transition-colors duration-300">
                {isLoading ? "Loading..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
