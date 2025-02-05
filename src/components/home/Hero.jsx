import imageSrc from "../../assets/i.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div
      className=" bg-blue-500  dark:bg-sky-800
     mx-24 rounded-xl text-white my-12 font-serif max-lg:mx-1  max-lg:mt-28 ">
      <div className=" flex max-lg:flex-col py-12">
        <div className=" flex flex-col px-10 gap-10 w-1/2 max-lg:w-full max-mad:text-center ">
          <motion.div
            initial="hidden"
            className="flex flex-col  gap-10 max-md:gap-4 "
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}>
            <motion.h1
              className=" text-4xl font-bold max-md:text-2xl   font-display "
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              Selamat datang di{" "}
              <span className=" text-sky-800 dark:text-sky-500">Renz Shop</span>
            </motion.h1>
            <motion.p variants={FADE_DOWN_ANIMATION_VARIANTS}>
              Halo dan terima kasih telah mengunjungi Renz Shop, tempat belanja
              online yang praktis, murah, dan tepercaya. Kami senang bisa
              menjadi bagian dari pengalaman belanja Anda. Temukan berbagai
              produk berkualitas dengan harga yang ramah di kantong, serta
              layanan yang dirancang untuk memberikan kenyamanan dan kepuasan
              bagi Anda.
            </motion.p>
            <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Link
                to={"/product"}
                className=" bg-sky-500 text-black dark:text-white  w-32 py-2 rounded-lg text-center px-6">
                klik sekarang
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className=" flex justify-center w-1/2 max-lg:w-full mt-7">
          <motion.div
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}>
            <motion.image variants={FADE_UP_ANIMATION_VARIANTS}>
              <img
                src={imageSrc}
                alt=""
                className="h-72 w-full object-contain"
              />
            </motion.image>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
