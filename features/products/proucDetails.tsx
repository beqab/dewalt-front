import DetailsSlider from "./components/detailsSlider";
import ProductInfo from "./components/productInfo";

export default function ProductDetails() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-[1070px] px-[15px] py-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[410px_1fr]">
          <DetailsSlider />
          <ProductInfo />
        </div>
      </div>
    </div>
  );
}
