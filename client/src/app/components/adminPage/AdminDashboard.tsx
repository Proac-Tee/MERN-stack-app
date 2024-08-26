"use client";
import React, { FC } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import ProductTable from "./ProductTable";

const AdminDashboard: FC = () => {
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();

  return (
    <section>
      <ProductTable />
    </section>
  );
};

export default AdminDashboard;
