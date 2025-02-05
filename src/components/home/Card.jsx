/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/store/useAuth";
import { useCart } from "../../utils/store/useCart";

const Card = ({ id, nama_barang, foto_barang, harga, deskripsi }) => {
  const { user, id: userId } = useAuth();
  const { addtocart } = useCart();
  const tambahkeranjang = () => {
    addtocart({
      id_user: userId,
      id_produk: id,
      nama_produk: nama_barang,
      jumlah: 1,
      harga: harga,
    });
  };
  return (
    <div>
      <div className="card bg-base-100 shadow-xl max-w-64">
        <Link to={`/detail/${id}`}>
          <figure className="relative w-full h-48 overflow-hidden">
            <img
              src={foto_barang}
              alt={nama_barang}
              className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
            />
          </figure>
          <div className="card-body p-6 text-start">
            <h2 className="card-title text-xl font-bold text-gray-900 dark:text-white">
              {nama_barang}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {harga}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {deskripsi}
            </p>
          </div>
        </Link>
        {user ? (
          <button
            onClick={tambahkeranjang}
            className="bg-yellow-600 flex justify-center gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
        ) : (
          <Link
            to={"/login"}
            class="bg-yellow-600 flex justify-center gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
