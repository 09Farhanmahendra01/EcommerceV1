import { Layout_props } from "@/types/children-props";
import Image from "next/image";

import Banner from "../../../public/images/3D-ilustration-shopping.jpg";
import IconBrand from "../../../public/icons/Brand.png";

const LayoutAuth = ({ children }: Layout_props) => {
  return (
    <div className="h-svh w-full flex flex-col lg:flex-row bg-white">
      {/* Box 1 */}
      <div
        className="h-1/2 lg:w-3/5 relative overflow-hidden lg:rounded-tr-[10rem] shadow-2xl"
        style={{ backgroundColor: "#845EC2" }}
      >
        <Image
          src={Banner}
          alt="happy-customer-receiving-delivery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute left-3 top-[-13] w-24 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32">
          <Image src={IconBrand} alt="Brand" fill className="object-contain" />
        </div>
      </div>

      {/* Box 2 */}
      <div className="absolute h-120 w-full bottom-0 rounded-t-4xl lg:w-2/5 flex justify-center items-start lg:justify-center lg:items-center bg-white">
        {children}
      </div>
    </div>
  );
};

export default LayoutAuth;
