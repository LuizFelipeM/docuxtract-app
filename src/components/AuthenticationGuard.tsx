import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface AuthenticationGuardProps {
  Component: React.ComponentType<object>
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ Component: c }) => {
  const Component = withAuthenticationRequired(c, {
    onRedirecting: () => (
      <div className="page-layout">
        Loading
      </div>
    ),
  });

  return <Component />;
};
