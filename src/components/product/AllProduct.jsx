/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Card from "../home/Card";

const AllProduct = ({ product, isLoading, searchProduk, setsearchProduk }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => setShowSkeleton(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  // Filter Produk berdasarkan pencarian
  const filteredProducts = product?.filter((item) =>
    item.nama_barang.toLowerCase().includes(searchProduk.toLowerCase())
  );

  // Data untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Jumlah halaman
  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

  return (
    <section id="product" className="w-[90%] max-lg:w-full">
      <div className=" flex justify-center">
        <input
          type="text"
          className="input input-bordered w-1/2 "
          placeholder="Cari Produk yang anda inginkan"
          value={searchProduk}
          onChange={(e) => setsearchProduk(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-8 place-items-center mt-8">
        {isLoading || showSkeleton ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col space-y-4 p-4 animate-pulse">
              <div className="w-full h-28 bg-gray-300 rounded-lg"></div>
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
            </div>
          ))
        ) : filteredProducts?.length > 0 ? (
          currentItems.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              nama_barang={truncateText(item.nama_barang, 20)}
              foto_barang={item.foto_barang}
              harga={item.harga}
              deskripsi={item.deskripsi}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg col-span-3">
            Barang tidak ditemukan
          </p>
        )}
      </div>

      {/* Paginasi */}
      {filteredProducts?.length > 0 && (
        <div className="join mt-5 flex justify-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`join-item btn ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProduct;
