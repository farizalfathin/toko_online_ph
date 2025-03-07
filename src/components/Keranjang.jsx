import { useEffect } from "react";
import { useCart } from "../utils/store/useCart";
import { Header } from "./tailus/Header";
import Footer from "./tailus/Footer";
import { useAuth } from "../utils/store/useAuth";
import { Helmet } from "react-helmet-async";
import { Minus, Plus } from "lucide-react";

const Keranjang = () => {
  const {
    fetchcart,
    cart,
    deleteItemCart,
    handlePayment,
    incrementItem,
    decrementItem,
  } = useCart();
  const { id, email, full_name } = useAuth();

  useEffect(() => {
    fetchcart(id);
  }, [fetchcart, id]);

  return (
    <>
      <Helmet>
        <title>{`Toko Online - ${cart?.length}`}</title>
      </Helmet>
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
              <div className="flex items-start gap-4 ps-6 py-6 me-4">
                <img
                  src={item.barang.foto_barang}
                  alt=""
                  className="w-32 h-32 object-cover object-center"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-medium text-gray-800">
                      {item.nama_produk}
                    </h2>
                    <p className="text-yellow-500 font-semibold text-sm">
                      {item.harga.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                  <div className="w-fit flex items-center">
                    <button
                      className="border"
                      onClick={() => decrementItem(item.id)}>
                      <Minus size={20} />
                    </button>
                    <span className="border-y text-lg px-4 h-[21px] flex items-center">
                      {item.jumlah}
                    </span>
                    <button
                      className="border"
                      onClick={() => incrementItem(item.id)}>
                      <Plus size={20} />
                    </button>
                  </div>
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
        <div className="mt-6 flex gap-4">
          <div className="p-3 border border-gray-200 bg-yellow-50 rounded-lg w-72">
            <h3 className="text-xl font-bold">
              Total:{" "}
              <span className="text-lg text-yellow-500 font-semibold">
                {cart
                  .reduce((acc, item) => acc + item.harga, 0)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
              </span>
            </h3>
          </div>
          <button
            onClick={() => handlePayment(email, full_name)}
            className="bg-red-500 text-white px-3 rounded-md">
            Checkout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Keranjang;
