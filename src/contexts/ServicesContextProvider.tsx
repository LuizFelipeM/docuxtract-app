import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { SchemasService } from '../services/SchemasService';
import { ServicesContext } from './ServiceContext';

export const ServicesContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0()

  return (
    <ServicesContext.Provider
      value={{
        schemasService: new SchemasService(getAccessTokenSilently)
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}