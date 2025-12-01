import LineIcon from "../icons/linIcon";
import { cn } from "@/lib/utils";

export default function ShareButton({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        "bg-background-secondary hover:bg-dark-secondary-90/30 flex h-8 cursor-pointer items-center gap-2 rounded p-2 transition-colors",
        className
      )}
    >
      <LineIcon />
      <span className="text-dark-secondary-100 text-sm">გაზიარება</span>
    </button>
  );
}
