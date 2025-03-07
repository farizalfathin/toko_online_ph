import { create } from "zustand";
import { supabase } from "../SupClient";
import Swal from "sweetalert2";
import { v4 } from "uuid";

export const useCart = create((set, get) => ({
  cart: [],
  fetchcart: async (user_id) => {
    const { data, error } = await supabase
      .from("cart")
      .select("*, barang(foto_barang)")
      .eq("id_user", user_id);

    if (!error) set({ cart: data });
  },
  addtocart: async (item) => {
    const { cart } = get();
    const existingitem = cart.find((i) => i.id_produk === item.id_produk);

    if (existingitem) {
      const updateditem = {
        ...existingitem,
        jumlah: existingitem.jumlah + 1,
        harga: (existingitem.jumlah + 1) * item.harga,
      };
      const { error } = await supabase
        .from("cart")
        .update({
          jumlah: updateditem.jumlah,
          harga: updateditem.harga,
        })
        .eq("id", existingitem.id);

      if (error) {
        Swal.fire({
          title: "Tambah ke keranjang Gagal!",
          text: "Anda gagal menambahkan barang baru ke keranjang.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      set((state) => ({
        cart: state.cart.map((cartitem) =>
          cartitem.id === existingitem.id ? updateditem : cartitem
        ),
      }));
    } else {
      const newitem = {
        ...item,
        jumlah: 1,
        harga: item.harga,
      };
      const { data, error } = await supabase.from("cart").insert([newitem]);
      if (error) {
        Swal.fire({
          title: "Tambah ke keranjang Gagal!",
          text: "Anda gagal menambahkan barang baru ke keranjang.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      set((state) => ({ cart: [...state.cart, data] }));
    }
    Swal.fire({
      title: "Tambah ke keranjang Berhasil!",
      text: "Anda berhasil menambahkan barang baru ke keranjang!",
      icon: "success",
      confirmButtonText: "OK",
    });
  },
  incrementItem: async (id) => {
    const { cart } = get();
    const existingitem = cart.find((i) => i.id === id);
    const updateditem = {
      ...existingitem,
      jumlah: existingitem.jumlah + 1,
      harga:
        (existingitem.jumlah + 1) * (existingitem.harga / existingitem.jumlah),
    };
    const { error } = await supabase
      .from("cart")
      .update({
        jumlah: updateditem.jumlah,
        harga: updateditem.harga,
      })
      .eq("id", id);

    if (!error) {
      set((state) => ({
        cart: state.cart.map((cartItem) =>
          cartItem.id === id ? updateditem : cartItem
        ),
      }));
    }
  },
  iecrementItem: async (id) => {
    const { cart, deleteItemCart } = get();

    const existingitem = cart.find((i) => i.id === id);

    if (existingitem.jumlah === 1) {
      if (window.confirm("Anda yakin ingin menghapus barang ini?")) {
        await deleteItemCart(id);
      }
    } else {
      const updateditem = {
        ...existingitem,
        jumlah: existingitem.jumlah - 1,
        harga:
          (existingitem.jumlah - 1) *
          (existingitem.harga / existingitem.jumlah),
      };
      const { error } = await supabase
        .from("cart")
        .update({
          jumlah: updateditem.jumlah,
          harga: updateditem.harga,
        })
        .eq("id", id);

      if (!error) {
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.id === id ? updateditem : cartItem
          ),
        }));
      }
    }
  },
  handlePayment: async (email, full_name) => {
    const { cart } = get();
    const orderId = `Order-${v4()}`;

    const itemDetails = cart.map((item) => ({
      id: item.id,
      price: item.harga / item.jumlah,
      quantity: item.jumlah,
      name: item.nama_produk,
    }));

    const res = await fetch(
      "https://backend-payment-eta.vercel.app/api/payment/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          gross_amount: get().cart.reduce(
            (total, item) => total + item.harga,
            0
          ),
          customer_name: full_name,
          email: email,
          item_details: itemDetails,
        }),
      }
    );

    const { token } = await res.json();

    if (token) {
      window.snap.pay(token, {
        onSuccess: async (midtransResponse) => {
          const paymentChannel = midtransResponse.payment_type || "unknown";

          const { data, error } = await supabase.from("history-payment").insert(
            cart.map((item) => ({
              user_id: item.id_user,
              barang_id: item.id_produk,
              quantity: item.jumlah,
              order_id: orderId,
              status: "Success",
              gross_amount: cart.reduce(
                (total, item) => total + item.harga * item.jumlah,
                0
              ),
              payment_channel: paymentChannel,
            }))
          );

          if (error) {
            console.log(error);
            Swal.fire(
              "Terjadi kesalahan saat menyimpan riwayat",
              error.message,
              "error"
            );
          } else {
            console.log(data);
            window.location.href = "/riwayat";
          }
        },
        onError: (error) => {
          console.log(error);
          Swal.fire("Terjadi kesalahan", error.message, "error");
        },
      });
    }
  },
  deleteItemCart: async (id) => {
    const { error } = await supabase.from("cart").delete().eq("id", id);

    if (error) {
      Swal.fire({
        title: "Gagal hapus barang!",
        text: "Anda gagal menghapus barang di keranjang.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Berhasil hapus barang!",
      text: "Anda berhasil menghapus barang baru ke keranjang!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "/keranjang";
    });
    set((state) => ({
      cart: state.cart.map((cartitem) => cartitem.id !== id),
    }));
  },
}));
