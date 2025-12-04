"use client";
import CompareIcon from "@/components/icons/compareIcon";
import { Button } from "@/components/ui/button";
import { useCompareContext } from "../compareContext";
import Link from "next/link";

export default function CompareLinkButton() {
  const { productIds } = useCompareContext();

  return (
    <Button
      asChild
      variant="default"
      size="sm"
      className="fixed right-4 bottom-4 z-50 flex h-10 items-center gap-2"
    >
      <Link href="/compare">
        <CompareIcon />
        <span className="hidden md:inline">შედარება</span> ({productIds.length})
      </Link>
    </Button>
  );
}
