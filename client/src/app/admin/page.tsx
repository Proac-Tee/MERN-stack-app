import { redirect } from "next/navigation";
import AdminAuthSkeleton from "../components/adminPage/AdminAuthSkeleton";
import AdminDashboard from "../components/adminPage/AdminDashboard";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Admin() {
  const {
    isAuthenticated,
    getUser,
    getPermission,
    getPermissions,
    getAccessTokenRaw,
  } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const canPostProducts = await getPermission("post:product");
  const user = await getUser();
  const permissions = await getPermissions();
  const accessToken = await getAccessTokenRaw();

  if (!isUserAuthenticated) {
    redirect(`/api/auth/login`);
  }

  return (
    <main>
      Admin
      <div>
        <AdminAuthSkeleton />
        <AdminDashboard />
      </div>
    </main>
  );
}
