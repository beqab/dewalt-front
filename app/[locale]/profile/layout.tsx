import ProfileSidebar from "@/components/profileSidebar";
import MobileProfileMenu from "@/components/profileSidebar/mobileProfileMenu";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-10">
      <div className="customContainer">
        <div className="mt-10 flex gap-6 md:mt-0">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block">
            <ProfileSidebar />
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <div className="md:px-0">
              {/* Mobile Profile Menu */}
              <MobileProfileMenu />

              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
