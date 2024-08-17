"use client";
import React, { FC } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const AdminDashboard: FC = () => {
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();
  console.log(user?.email);

  return (
    <section>
      Admin AdminDashboard
      <div>
        <LogoutLink>Log out</LogoutLink>
      </div>
    </section>
  );
};

export default AdminDashboard;
