import { useState, useEffect } from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/SupClient";
import { Link } from "react-router-dom";
import useFormatRupiah from "../formatRupiah";

const ProductList = () => {
  const { formatrupiah } = useFormatRupiah();
  const [showSkeleton, setShowSkeleton] = useState(true); // Tambahkan state untuk mengontrol skeleton

  const {
    data: getproduct,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await supabase.from("barang").select();
      return res.data;
    },
  });

  useEffect(() => {
    // Jika loading selesai, tunggu 3 detik sebelum skeleton dihapus
    if (!isLoading) {
      const timeout = setTimeout(() => setShowSkeleton(false), 3000);
      return () => clearTimeout(timeout); // Bersihkan timeout jika komponen unmount
    }
  }, [isLoading]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  if (error) return <h2>Data error</h2>;

  return (
    <div className="mt-10">
      <p className="text-5xl text-center font-bold max-md:text-3xl">
        Our Products
      </p>

      <div className="grid grid-cols-3  max-md:grid-cols-1 max-md:place-items-center max-lg:mx-0 gap-32 max-lg:gap-12 mx-14 mt-10">
        {isLoading || showSkeleton
          ? // Skeleton loading menggunakan DaisyUI
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col  space-y-4 p-4 ">
                <div className=" skeleton flex justify-center place-items-center mb-8 w-36 h-20 bg-gray-300 rounded-lg"></div>
                <div className=" skeleton w-44 h-4 bg-gray-300 rounded"></div>
                <div className=" skeleton w-20 h-4 bg-gray-300 rounded"></div>
              </div>
            ))
          : // Tampilkan data setelah skeleton selesai
            getproduct &&
            getproduct.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                nama_barang={truncateText(item.nama_barang, 20)}
                foto_barang={item.foto_barang}
                harga={formatrupiah(item.harga)}
                deskripsi={item.deskripsi}
              />
            ))}
      </div>

      <div className="flex justify-center my-9">
        <Link
          to={"/product"}
          className="btn bg-yellow-500 text-center dark:bg-yellow-700 dark:text-white">
          Lihat Produk selengkapnya
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
