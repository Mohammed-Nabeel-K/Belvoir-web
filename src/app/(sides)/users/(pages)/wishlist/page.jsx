import Navbar from '../../../users/components/ui/navbar/Navbar';
import WishList from '../../components/ui/wishlist/wishlist';





export default function CartPage() {

  return (
  <>
    <Navbar/>
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Wish List</h1>
      <WishList/>
      
    </div>
  </>
  )
}
