import { Header } from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import ProductList from "../components/home/productlist";
import Floatingbutton from "../components/tailus/Floatingbutton";
import { Link } from "react-router-dom";
import RenderList from "../utils/RenderList";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Toko Online - Home</title>
      </Helmet>
      <Header />
      <main>
        <section className="px-4">
          <div className="bg-yellow-500 dark:bg-yellow-200 rounded-md h-auto p-8 md:p-14 flex flex-col md:flex-row items-center md:h-[500px]">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <h1 className="font-display text-3xl dark:text-black mt-12 md:text-4xl lg:text-7xl font-bold tracking-[-0.02em] drop-shadow-sm leading-[2.5rem] md:leading-[3rem] lg:leading-[5rem]">
                Selamat Datang <br />
                <span className="text-yellow-300">di E-MinMarket</span>
              </h1>

              <div className="mt-4">
                <Link
                  to="/products"
                  className="btn border-none bg-yellow-400 hover:bg-yellow-500 rounded-xl px-4 py-2 md:px-6 md:py-3 text-sm md:text-base dark:text-black">
                  Belanja Sekarang
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="./Shoppin-bag-bro.png"
                className="w-full max-w-xs md:max-w-md lg:max-w-lg"
              />
            </div>
          </div>
        </section>
        <ProductList />

        <section className="px-4 my-20">
          <h2 className="text-center text-4xl font-bold dark:text-white">
            Metode Pembayaran
          </h2>
          <div className="flex justify-center flex-wrap gap-12 mt-8 max-lg:px-2 lg:px-16">
            <RenderList
              of={[
                {
                  logo: "https://i0.wp.com/umsu.ac.id/berita/wp-content/uploads/2024/07/cara-lihat-nomor-gopay-di-aplikasi-gojek.webp?fit=850%2C510&ssl=1",
                },
                {
                  logo: "https://logowik.com/content/uploads/images/shopeepay4268.jpg",
                },
                {
                  logo: "https://logowik.com/content/uploads/images/qris-qris-quick-response-code-indonesian-standard8461.logowik.com.webp",
                },
                {
                  logo: "https://connect-assets.prosple.com/cdn/ff/2w6Fi32m1J2yKsxpsjputBW7vzc3ljxp9_BJUsbmCG8/1648508358/public/styles/scale_and_crop_center_224x224/public/2022-03/Logo-bank-jago-200x200-2022.png?itok=S-tE0dpG",
                },
                {
                  logo: "https://i.pinimg.com/originals/f5/8c/a3/f58ca3528b238877e9855fcac1daa328.jpg",
                },
              ]}
              render={(item, index) => (
                <div key={index} className="flex justify-center items-center">
                  <img
                    src={item.logo}
                    alt="logo"
                    className="h-32 mix-blend-multiply dark:mix-blend-normal dark:rounded-xl"
                  />
                </div>
              )}
            />
          </div>
        </section>

        <section
          className="w-full mb-20 bg-yellow-200"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)),url('https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1571755528/q87txynetfrm0yiemmwk.jpg')",
          }}>
          <div className="flex flex-col items-center gap-4 py-24 max-lg:py-10 max-lg:h-96 max-lg:justify-center max-lg:text-center">
            <h2 className="text-4xl font-bold text-yellow-300">
              Ingin Checkout barang yang kamu mau?
            </h2>
            <p className="text-white">
              Klik tombol di bawah ini untuk cari dan checkout barang belanja
              kamu
            </p>

            <Link
              to="/products"
              className="btn bg-yellow-400 hover:bg-yellow-500 border-none dark:text-white">
              Belanja Sekarang
            </Link>
          </div>
        </section>
      </main>
      <Floatingbutton />
      <Footer />
    </>
  );
};

export default Home;
