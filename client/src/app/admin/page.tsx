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

  // if (!isUserAuthenticated) {
  //   redirect(`/api/auth/login`);
  // }

  return (
    <section className="w-[100%] h-[100%] min-h-[100vh] px-[1rem] max-w-[1400px]  md:px-[2rem] lg:px-[5rem]">
      {/* <AdminAuthSkeleton /> */}
      <AdminDashboard />
    </section>
  );
}
