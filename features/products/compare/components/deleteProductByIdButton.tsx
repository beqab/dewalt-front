import TrashIcon from "@/components/icons/trashIcon";
import { useCompareContext } from "../compareContext";

export default function DeleteProductByIdButton({ id }: { id: string }) {
  const { deleteProductId } = useCompareContext();

  const handleDeleteProductId = () => {
    deleteProductId(id);
  };

  return (
    <button
      type="button"
      onClick={handleDeleteProductId}
      className="text-text-secondary bg-background h:6.5 hover:text-dark-secondary-100/50 absolute top-[140px] right-2 z-10 flex items-center gap-1 rounded-sm px-2 py-1 text-xs transition-colors md:h-8"
    >
      <TrashIcon />
      <span className="">წაშლა</span>
    </button>
  );
}
