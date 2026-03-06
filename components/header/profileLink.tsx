"use client";

import { Link } from "@/i18n/navigation";
import ProfileIcon from "../icons/profileIcon";
import { useSession } from "next-auth/react";

export default function ProfileLink() {
  const session = useSession();
  const profileLink = session ? "/profile" : "/login";
  return (
    <Link href={profileLink} className="hidden md:block">
      <ProfileIcon className="hidden cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 md:block" />
    </Link>
  );
}
