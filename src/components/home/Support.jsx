/* eslint-disable react/prop-types */
const Support = () => {
  return (
    <div>
      <h2 className=" text-center text-4xl max-md:text-2xl font-bold mt-10">
        Support Pembayaran
      </h2>
      <div className=" flex flex-wrap justify-center px-56 gap-12 mt-10 max-lg:px-2 mb-12">
        <LogoSupport
          logo={
            "https://logos-world.net/wp-content/uploads/2023/03/GoPay-Logo.jpg"
          }
        />
        <LogoSupport
          logo={
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhvTtjN1Bj37W3jTiire9jlqgP046Je6-JPvIVEMjW6avji3kH1eC5HyUDIY8q1l6z89kidy_XZz4cX7-d_rdSentSrY94naUFcRo-NhiEvMUWmevEbQz-xRdMLUFSr61dHVvbVDq58GmxM0UAIgwnfCak8KWr0wTa0UmmjdUQTTcm2pEd3YjuHtPj9Q/s2161/Logo%20QRIS.png"
          }
        />
        <LogoSupport
          logo={"https://logowik.com/content/uploads/images/shopeepay4268.jpg"}
        />
        <LogoSupport
          logo={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png"
          }
        />
        <LogoSupport
          logo={"https://static.cdnlogo.com/logos/g/80/google-pay.png"}
        />
        <LogoSupport
          logo={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefI6pAZDTEXZqfmgJTghDkO1wpT39ZsuR8A&s"
          }
        />
        <LogoSupport
          logo={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png"
          }
        />
      </div>
    </div>
  );
};

const LogoSupport = ({ logo }) => {
  return (
    <div className="">
      <img
        src={logo}
        alt=""
        className=" size-24 max-md:size-16 object-contain mix-blend-multiply dark:mix-blend-normal dark:rounded-xl"
      />
    </div>
  );
};

export default Support;
