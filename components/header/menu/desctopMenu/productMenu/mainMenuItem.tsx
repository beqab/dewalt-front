import { MenuItemWithArrow } from "../../menuItm";

export default function MainMenuItem({
  label,
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <MenuItemWithArrow isActive={isOpen} label={label} onClick={onToggle} />
  );
}
