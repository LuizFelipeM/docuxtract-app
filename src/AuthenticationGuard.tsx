import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface AuthenticationGuardProps {
  component: React.ComponentType<object>
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        Loading
      </div>
    ),
  });

  return <Component />;
};
