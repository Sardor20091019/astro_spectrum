import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminUploadForm from "@/components/AdminUploadForm";
import AdminPhotoList from "@/components/AdminPhotoList";
import AdminApprovalList from "@/components/AdminApprovalList";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Security: Only allow ADMIN users
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
  });

  const approvedPhotos = photos.filter((p) => p.status === "APPROVED");
  const pendingPhotos = photos.filter((p) => p.status === "PENDING");

  return (
    <div className="min-h-screen bg-[#080808] text-white p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-red-500">
            AstroSpectrum Core
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase mt-1">Admin Panel</h1>
          <p className="text-zinc-500 mt-2">Manage submissions, approval queue, and the gallery</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: Upload Form & Pending Approvals */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h2 className="text-xl font-bold mb-6 text-red-500 uppercase tracking-wider text-xs">Add New Photo</h2>
              <AdminUploadForm />
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-xs flex items-center justify-between">
                <span>Pending Submissions</span>
                {pendingPhotos.length > 0 && (
                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full text-[10px]">
                    {pendingPhotos.length}
                  </span>
                )}
              </h2>
              <AdminApprovalList pendingPhotos={pendingPhotos} />
            </div>
          </div>

          {/* Right Side: Existing Photos */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-xs">
              Current Gallery ({approvedPhotos.length})
            </h2>
            <AdminPhotoList initialPhotos={approvedPhotos} />
          </div>
        </div>
      </div>
    </div>
  );
}
