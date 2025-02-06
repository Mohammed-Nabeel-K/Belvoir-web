import ShoppingCart from "../../components/ui/cart/ShoppingCart"
import Navbar from '../../../users/components/ui/navbar/Navbar'







export default function CartPage() {

  return (
  <>
    <Navbar/>
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <ShoppingCart />
      
    </div>
  </>
  )
}

