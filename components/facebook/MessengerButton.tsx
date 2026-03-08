import MessengerIcon from "@/components/icons/messengerIcon";

export default function MessengerButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-primary text-dark-secondary-100 focus-visible:outline-primary fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <MessengerIcon className="h-6 w-6" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
