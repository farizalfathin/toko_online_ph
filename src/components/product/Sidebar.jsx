/* eslint-disable react/prop-types */
import { useState } from "react";

const Sidebar = ({ setSortByName, setSortByPrice, setKategori }) => {
  const [selectedHarga, setSelectedHarga] = useState("");
  const [selectedNama, setSelectedNama] = useState("");
  const [selectedKategori, setSelectedKategori] = useState([]);

  const handleHargaChange = (filter) => {
    setSelectedHarga(filter);
    setSortByPrice(filter);
  };

  const handleNamaChange = (filter) => {
    setSelectedNama(filter);
    setSortByName(filter);
  };

  const handleResetFilter = () => {
    setSelectedHarga("");
    setSelectedNama("");
    setSelectedKategori([]);
    setSortByPrice("");
    setSortByName(""); // Clear search parameters
  };

  const handleKategori = (category) => {
    const updatedKategori = selectedKategori.includes(category)
      ? selectedKategori.filter((cat) => cat !== category)
      : [...selectedKategori, category];

    setSelectedKategori(updatedKategori);
    setKategori(updatedKategori);
  };

  return (
    <aside className="w-[20%]  border-r-2 border-gray-200">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-3 font-bold">Filter Produk</h2>

        <h3 className="text-lg mt-4">Harga</h3>
        <label className="flex items-center gap-2 my-2">
          <input
            type="radio"
            name="price-filter"
            className="radio radio-warning"
            checked={selectedHarga === "termahal"}
            onChange={() => handleHargaChange("termahal")}
          />
          Harga Termahal
        </label>
        <label className="flex items-center gap-2 my-2">
          <input
            type="radio"
            name="price-filter"
            className="radio radio-warning"
            checked={selectedHarga === "termurah"}
            onChange={() => handleHargaChange("termurah")}
          />
          Harga Termurah
        </label>

        <h3 className="text-lg mt-4">Nama</h3>
        <label className="flex items-center gap-2 my-2">
          <input
            type="radio"
            name="name-filter"
            className="radio radio-warning"
            checked={selectedNama === "A-Z"}
            onChange={() => handleNamaChange("A-Z")}
          />
          Nama A-Z
        </label>
        <label className="flex items-center gap-2 my-2">
          <input
            type="radio"
            name="name-filter"
            className="radio radio-warning"
            checked={selectedNama === "Z-A"}
            onChange={() => handleNamaChange("Z-A")}
          />
          Nama Z-A
        </label>

        <button
          className="btn btn-warning mt-5 text-white"
          onClick={handleResetFilter}>
          Reset Filter
        </button>
      </div>

      <div className="flex flex-col gap-4 items-center w-full mt-4">
        <h2 className="text-2xl mb-3 font-bold">Kategori</h2>
        <label className="flex items-center gap-2 my-2">
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            checked={selectedKategori.includes("Makanan")}
            onChange={() => handleKategori("Makanan")}
          />
          Makanan
        </label>
        <label className="flex items-center gap-2 my-2">
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            checked={selectedKategori.includes("Minuman")}
            onChange={() => handleKategori("Minuman")}
          />
          Minuman
        </label>
        <label className="flex items-center gap-2 my-2">
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            checked={selectedKategori.includes("alat")}
            onChange={() => handleKategori("alat")}
          />
          Alat Masak
        </label>
      </div>
    </aside>
  );
};

export default Sidebar;
