import Image from "next/image";

export default function ProductDetail() {
  const product = {
    id: 1,
    title: "Custom Suit",
    description: "Handmade premium suit",
    image: "/suit.jpg",
    price: 250,
    design: {
      title: "Classic Fit",
      description: "Elegant and comfortable",
      image: "/classic-fit.jpg",
      price: 50,
    },
  };

  const totalPrice = product.price + product.design.price;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#0F172A]">Tailor Product Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-custom w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <h2 className="text-xl font-semibold">Product Details</h2>
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={300}
              className="rounded-lg"
            />
            <p className="text-lg font-bold mt-2">{product.title}</p>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-[13px]   mt-2 text-gray-500">Price: ${product.price}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Design Details</h2>
            <Image
              src={product.design.image}
              alt={product.design.title}
              width={400}
              height={300}
              className="rounded-lg mt-2"
            />
            <p className="text-lg font-bold mt-2">{product.design.title}</p>
            <p className="text-gray-700">{product.design.description}</p>
            <p className="text-[13px] mt-2 text-gray-500">
              Design Price: ${product.design.price}
            </p>
          </div>
        </div>
        <p className="text-[17px] text-gray-500 font-bold mt-6 text-center w-max float-right">
          Total Price: ${totalPrice}
        </p>
      </div>
    </div>
  );
}
