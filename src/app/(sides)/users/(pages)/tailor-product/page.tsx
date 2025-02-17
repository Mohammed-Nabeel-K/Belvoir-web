import Image from 'next/image';
import Link from 'next/link';

const products = [
  { id: 1, title: 'Stylish Jacket', description: 'Premium leather jacket', image: '/jacket.jpg', price: 120 },
  { id: 2, title: 'Casual T-Shirt', description: 'Soft cotton t-shirt', image: '/tshirt.jpg', price: 30 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/users/tailor-product/${product.id}`} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <Image src={product.image} alt={product.title} width={300} height={200} className="rounded" />
            <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
