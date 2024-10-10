import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Callback: React.FC = () => {
  const { error, isAuthenticated } = useAuth0();

  useEffect(() => console.log('isAuthenticated', isAuthenticated), [isAuthenticated])

  if (error) {
    return (
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Error
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>{error.message}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="flex flex-auto flex-shrink-0 flex-col mt-32 max-w-[120rem] w-[10%]" />
    </div>
  );
};
