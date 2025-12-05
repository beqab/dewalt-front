interface LoadingProps {
  message?: string;
  minHeight?: "screen" | "60vh" | "auto";
}

export default function Loading({
  message = "იტვირთება...",
  minHeight = "screen",
}: LoadingProps) {
  const heightClass =
    minHeight === "screen"
      ? "min-h-screen"
      : minHeight === "60vh"
        ? "min-h-[60vh]"
        : "";

  return (
    <div className={`flex ${heightClass} items-center justify-center`}>
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <p className="text-dark-secondary-100 text-sm">{message}</p>
      </div>
    </div>
  );
}

