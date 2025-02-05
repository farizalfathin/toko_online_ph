/* eslint-disable react/prop-types */
import { FaBox, FaTruckFast } from "react-icons/fa6";
import { MdOutlinePriceCheck } from "react-icons/md";

const ChooseUS = () => {
  return (
    <div className="">
      <section
        id="features"
        className="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b ">
        <div className="relative mx-auto max-w-5xl text-center">
          <span className=" my-3 flex items-center justify-center  dark:text-gray-400 font-bold uppercase  tracking-wider text-3xl max-md:text-2xl text-black">
            Why choose us
          </span>
        </div>

        <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          <Why
            chart={MdOutlinePriceCheck}
            title="Harga yang Terjangkau"
            description="RenzShop menawarkan produk-produk berkualitas dengan harga yang ramah di kantong, sehingga pelanggan bisa berbelanja tanpa perlu khawatir akan harga yang tinggi."
          />

          <Why
            chart={FaTruckFast}
            title="Pengiriman Cepat dan Aman"
            description="Dengan dukungan layanan pengiriman yang cepat dan terpercaya, RenzShop memastikan barang sampai ke tangan pelanggan secepat mungkin tanpa mengurangi keamanan produk."
          />

          <Why
            chart={FaBox}
            title="Barang yang Lengkap dan Beragam"
            description="RenzShop menyediakan berbagai pilihan produk lengkap untuk memenuhi kebutuhan pelanggan, sehingga pelanggan bisa menemukan segala sesuatu yang mereka cari dalam satu tempat."
          />
        </div>
      </section>
    </div>
  );
};

const Why = ({ chart: Chart, title, description }) => {
  return (
    <div className="rounded-md border border-gray-600 shadow-xl  p-8 text-center">
      <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border-black border">
        {Chart ? <Chart className="text-3xl" /> : <p>No Chart Available</p>}
      </div>
      <h3 className="mt-6 font-bold text-xl">{title}</h3>
      <p className="my-4 mb-0 font-normal  text-justify ">{description}</p>
    </div>
  );
};

export default ChooseUS;
