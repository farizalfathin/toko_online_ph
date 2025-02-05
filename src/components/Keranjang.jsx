import { useEffect } from "react";
import { useCart } from "../utils/store/useCart";
import { Header } from "./tailus/Header";
import Footer from "./tailus/Footer";

const Keranjang = () => {
  const { fetchcart, cart, deleteItemCart } = useCart();

  useEffect(() => {
    fetchcart();
  }, [fetchcart]);

  return (
    <>
      <Header />
      <div className="flex flex-col place-items-center my-24">
        {/* Header */}
        <h2 className="text-4xl font-bold mb-16">Keranjang</h2>

        {/* Items */}
        <div className="flex flex-col justify-center flex-wrap gap-8  ">
          {cart?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between rounded-lg bg-white shadow-md">
              {/* Product Info */}
              <div className="flex gap-4 ps-6 py-6">
                <img
                  src={item.barang.foto_barang}
                  alt=""
                  className="w-32 h-32 object-cover object-center"
                />
                <h2 className="text-lg font-medium text-gray-800 mb-2">
                  {item.nama_produk}
                </h2>
                <div className=" flex gap-6">
                  <p className="text-gray-600 text-sm mb-2">x{item.jumlah}</p>
                  <p className="text-yellow-500 font-semibold text-sm">
                    {item.harga.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => deleteItemCart(item.id)}
                className="bg-red-500 w-16 flex items-center justify-center text-white rounded-e-md">
                X
              </button>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="mt-6 p-3 border border-gray-200 bg-yellow-50 rounded-lg w-72">
          <h3 className="text-xl font-bold">Total:</h3>
          <p className="text-lg text-yellow-500 font-semibold">
            {cart
              .reduce((acc, item) => acc + item.harga, 0)
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Keranjang;
