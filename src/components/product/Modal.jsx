/* eslint-disable react/prop-types */
import { useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";

const SidebarDrawer = ({
  open,
  setOpen,
  setSortByName,
  setSortByPrice,
  setKategori,
}) => {
  const [selectedHarga, setSelectedHarga] = useState("");
  const [selectedNama, setSelectedNama] = useState("");
  const [selectedKategori, setSelectedKategori] = useState([]);

  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, { opacity: [1, 0] });
    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", { y: [yStart, height] });
    setOpen(false);
  };

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
    setSortByPrice("");
    setSortByName("");
  };

  const handleKategori = (category) => {
    const updatedKategori = selectedKategori.includes(category)
      ? selectedKategori.filter((cat) => cat !== category)
      : [...selectedKategori, category];

    setSelectedKategori(updatedKategori);
    setKategori(updatedKategori);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70">
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ ease: "easeInOut" }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) handleClose();
            }}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}>
            <div className="relative z-10 h-full overflow-y-scroll py-4 px-8">
              <div className="flex flex-col ">
                <h2 className="text-2xl mb-3 font-bold text-center">
                  Filter Produk
                </h2>

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
                  className="btn btn-info mt-5 text-white"
                  onClick={handleResetFilter}>
                  Reset Filter
                </button>
              </div>

              <div className="flex flex-col gap-4  w-full mt-4">
                <h2 className="text-2xl mb-3 font-bold text-center">
                  Kategori
                </h2>
                <label className="flex items-center gap-2 my-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-info"
                    checked={selectedKategori.includes("Makanan")}
                    onChange={() => handleKategori("Makanan")}
                  />
                  Makanan
                </label>
                <label className="flex items-center gap-2 my-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-info"
                    checked={selectedKategori.includes("Minuman")}
                    onChange={() => handleKategori("Minuman")}
                  />
                  Minuman
                </label>
                <label className="flex items-center gap-2 my-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-info"
                    checked={selectedKategori.includes("alat")}
                    onChange={() => handleKategori("alat")}
                  />
                  Alat Masak
                </label>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const ResponsivePage = ({ setSortByName, setSortByPrice, setKategori }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="w-full flex justify-center max-lg:my-8 max-lg:mt-36">
      <button
        onClick={() => setDrawerOpen(true)}
        className="rounded bg-sky-400 text-black px-4 py-2 dark:text-white transition-colors hover:bg-indigo-600">
        Filter
      </button>

      <SidebarDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        setSortByName={setSortByName}
        setSortByPrice={setSortByPrice}
        setKategori={setKategori}
      />
    </div>
  );
};

export default ResponsivePage;
