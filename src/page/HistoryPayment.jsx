import { useEffect, useState } from "react";
import { Header } from "../components/tailus/Header";
import { Helmet } from "react-helmet-async";
import useFormatRupiah from "../components/formatRupiah";
import { useAuth } from "../utils/store/useAuth";
import { supabase } from "../utils/SupClient";
import Swal from "sweetalert2";

export default function HistoryPayment() {
  const [riwayat, setRiwayat] = useState([]);
  const { formatrupiah } = useFormatRupiah();
  const { id } = useAuth();

  useEffect(() => {
    const fetchRiwayat = async () => {
      const { data, error } = await supabase
        .from("history-payment")
        .select("*, barang(nama_barang, harga)")
        .eq("user_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        const groupedRiwayat = data.reduce((acc, item) => {
          if (!acc[item.order_id]) {
            acc[item.order_id] = {
              ...item,
              barang: [],
            };
          }
          acc[item.order_id].barang.push({
            nama_barang: item.barang.nama_barang,
            harga: item.barang.harga,
            jumlah: item.quantity,
          });
          return acc;
        }, {});

        setRiwayat(Object.values(groupedRiwayat));
      }
    };

    fetchRiwayat();
  }, [id]);

  const showDetail = (item) => {
    Swal.fire({
      title: "Detail Transaksi",
      html: `
          <div class="text-left text-sm leading-relaxed">
            <p class="mb-2"><strong>Order ID:</strong> ${item.order_id}</p>
            <p class="mb-2"><strong>Status:</strong> 
              <span class="px-2 py-1 rounded-md text-xs font-medium ${
                item.status === "Success"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              }">
                ${item.status}
              </span>
            </p>
            <p class="mb-2"><strong>Tanggal:</strong> ${new Intl.DateTimeFormat(
              "id-ID",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            ).format(new Date(item.created_at))}</p>
            <p class="mb-2"><strong>Metode Pembayaran:</strong> ${
              item.payment_channel || "Tidak Diketahui"
            }</p>
            <p class="mb-2"><strong>Total Harga:</strong> ${formatrupiah(
              item.gross_amount
            )}</p>
      
            <div class="mt-3">
              <p class="font-semibold mb-2 dark:text-gray-100">Barang yang Dibeli:</p>
              <ul class="border rounded-md bg-gray-100 dark:bg-gray-900 dark:border-gray-700 p-2 text-xs dark:text-gray-200">
                ${item.barang
                  .map(
                    (barang) => `
                  <li class="flex justify-between border-b py-1 border-gray-300 dark:border-gray-700 last:border-none">
                    <span>${barang.nama_barang}</span>
                    <span class="font-medium">${formatrupiah(barang.harga)} x ${
                      barang.jumlah
                    } = <strong>${formatrupiah(
                      barang.harga * barang.jumlah
                    )}</strong></span>
                  </li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        `,
      customClass: {
        popup:
          "w-80 md:w-96 bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg dark:shadow-gray-700",
        title: "text-lg font-bold",
        confirmButton:
          "bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 text-sm rounded-md",
      },
      confirmButtonText: "Tutup",
      confirmButtonColor: "#f97316",
    });
  };

  return (
    <>
      <Helmet>
        <title>Toko Online - Riwayat Pembayaran</title>
      </Helmet>
      <Header />
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">History Payment</h1>

        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">No</th>
                <th className="border p-3">OrderId</th>
                <th className="border p-3 hidden md:block">Total Harga</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.length > 0
                ? riwayat.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="border p-3">{index + 1}</td>
                      <td className="border p-3">{item.order_id}</td>
                      <td className="border p-3 hidden md:block">
                        {formatrupiah(item.gross_amount)}
                      </td>
                      <td className="border p-3">
                        <span className="p-1 rounded bg-green-500">
                          {item.status}
                        </span>
                      </td>
                      <td className="border p-3">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          onClick={() => showDetail(item)}>
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
