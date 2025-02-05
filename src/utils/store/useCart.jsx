import { create } from "zustand";
import { supabase } from "../SupClient";
import Swal from "sweetalert2";
export const useCart = create((set, get) => ({
  cart: [],
  fetchcart: async () => {
    const { data, error } = await supabase
      .from("cart")
      .select("*, barang(foto_barang)");

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
