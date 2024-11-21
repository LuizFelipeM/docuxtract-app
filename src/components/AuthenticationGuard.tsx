import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

interface AuthenticationGuardProps {
  Component: React.ComponentType<object>
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ Component: c }) => {
  const { t } = useTranslation()

  const Component = withAuthenticationRequired(c, {
    onRedirecting: () => (
      <div className="m-auto text-center">
        <FontAwesomeIcon icon={faSpinner} spin size="6x" className="text-blue-500" />
        <p className="text-xl font-semibold mt-4">{t("loading")}. {t("pleaseWait")}...</p>
      </div>
    ),
  });

  return <Component />;
};
