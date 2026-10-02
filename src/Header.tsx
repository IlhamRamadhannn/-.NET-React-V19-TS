import { useContext } from "react";
import { CartContext } from "./contexts";
import { Link } from "@tanstack/react-router";
import {useAppSelector} from "./hooks";
import { selectCartCount } from "./cartSlice";

export default function Header() {
  //const [cart] = useContext(CartContext);
  const cartCount = useAppSelector(selectCartCount);

  return (
    <nav className='grid w-full border-b border-[#ccc] [grid-template-areas:"._logo_logo_logo_cart"]'>
      <Link
        to={"/"}
        className="[grid-area:logo] flex items-center justify-center"
      >
        <h1 className="h-[110px] w-full bg-left bg-no-repeat content-[url('/public/padre_gino.svg')] border-b border-[#ccc] pb-5 pt-5">
          Padre Gino's Pizza
        </h1>
      </Link>

      <div className="[grid-area:cart] flex items-center justify-center text-[40px]">
        🛒
        <span className="relative left-[-17px] top-[-17px] flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-secondary text-[18px] text-white">
          {cartCount}
        </span>
      </div>
    </nav>
  );
}