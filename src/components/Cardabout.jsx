const Cardabout = () => {
  return (
    <section className="pb-20 bg-blueGray-200 max-md:pb-10 ">
      <div className=" my-14 mx-auto px-4">
        <div className="flex max-lg:flex-col items-center ">
          <div className="w-11/12 lg:w-3/4  mr-auto ml-auto px-16 max-lg:px-10 max-md:px-0 mb-10">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 max-md:mb-0 shadow-lg rounded-lg bg-lightBlue-500">
              <img
                alt="..."
                src="https://kaspin.sgp1.digitaloceanspaces.com/DataGambarArticle/771.webp"
                className="w-full align-middle rounded-t-lg"
              />
            </div>
          </div>
          <div className="w-full md:w-3/4  mr-auto ml-auto px-16 max-lg:px max-lg:px-8  max-md:px-4">
            <h3 className="text-3xl mb-2 leading-normal max-md:text-2xl font-medium">
              solusi belanja online praktis, murah, dan tepercaya
            </h3>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600 max-md:text-base">
              Di Renz Shop, kami percaya bahwa belanja harus menjadi pengalaman
              yang mudah dan menyenangkan. Oleh karena itu, kami menghadirkan
              platform belanja yang memenuhi kebutuhan Anda dengan berbagai
              pilihan produk berkualitas, harga terjangkau, dan layanan yang
              dapat diandalkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cardabout;
