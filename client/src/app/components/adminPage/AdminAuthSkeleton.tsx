import React, { FC } from "react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const AdminAuthSkeleton: FC = () => {
  return (
    <section>
      <LoginLink postLoginRedirectURL="/admin">Sign in</LoginLink>
      <RegisterLink postLoginRedirectURL="/admin">Sign up</RegisterLink>
    </section>
  );
};

export default AdminAuthSkeleton;
