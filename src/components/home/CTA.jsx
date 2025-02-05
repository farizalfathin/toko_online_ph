import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section
      className="relative w-full bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://admincerdas.s3.ap-southeast-1.amazonaws.com/20220220/9-toko-online.png')",
      }}>
      {/* Overlay hitam */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center gap-4 p-20 text-white max-lg:p-4 justify-center place-items-center h-full">
        <h2 className="font-bold text-4xl max-lg:text-lg">
          Tertarik Untuk Belanja Di Sini
        </h2>
        <p>Silahkan Klik Di Bawah ini</p>
        <Link to={"/product"}>
          <button className="btn bg-sky-400 hover:bg-sky-500 border-none dark:text-white">
            Belanja sekarang
          </button>
        </Link>
      </div>
    </section>
  );
};
