const Cardvision = () => {
  return (
    <section className="relative pb-24">
      <div className="container mx-auto px-4 max-md:px-8">
        <div className="items-center flex  max-lg:flex-col-reverse">
          <div className="w-full lg:w-3/4 ml-auto mr-auto px-16 max-lg:px-10 max-md:px-0">
            <div className="md:pr-12">
              <h3 className="text-3xl font-semibold max-md:text-2xl">
                Visi dan Misi
              </h3>
              <p className="mt-4 flex flex-col text-lg max-md:text-base leading-relaxed text-blueGray-500">
                <span className=" font-bold text-2xl mb-4 max-md:text-xl">
                  Visi
                </span>
                Menjadi toko online pilihan utama bagi semua orang yang mencari
                kenyamanan, nilai, dan kepercayaan dalam setiap transaksi.
              </p>
              <p className="mt-4 flex flex-col text-lg leading-relaxed text-blueGray-500 max-md:text-base">
                <span className=" font-bold text-2xl mb-4 max-md:text-xl">
                  Misi
                </span>
                Memberikan pengalaman belanja yang luar biasa kepada seluruh
                pelanggan kami. <br /> Menyediakan produk berkualitas tinggi
                dengan harga yang bersahabat. <br /> Membangun kepercayaan
                jangka panjang melalui layanan pelanggan yang ramah dan dukungan
                yang andal.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-3/4 max-lg:mb-14 ml-auto mr-auto  px-16 max-lg:px-10 max-md:px-0 max-md:mb-8">
            <img
              alt="..."
              className="max-w-full rounded-lg shadow-lg"
              src="https://mansajululum.ponpes.id/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-01-at-19.36.25.jpeg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cardvision;
