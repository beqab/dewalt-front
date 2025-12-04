import TrashIcon from "@/components/icons/trashIcon";
import { Button } from "@/components/ui/button";
import { useCompareContext } from "../compareContext";

export default function ClearAllProductsButton() {
  const { deleteProductId } = useCompareContext();

  const handleDeleteProductId = () => {
    deleteProductId("all");
  };

  return (
    <Button
      variant="outline"
      onClick={handleDeleteProductId}
      className="border text-sm"
    >
      <TrashIcon /> გასუფთავება
    </Button>
  );
}
