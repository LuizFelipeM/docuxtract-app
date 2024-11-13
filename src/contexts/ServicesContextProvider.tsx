import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { SchemasService } from '../services/SchemasService';
import { ServicesContext } from './ServiceContext';
import { PipelinesService } from '../services/PipelinesService';

export const ServicesContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0()

  return (
    <ServicesContext.Provider
      value={{
        schemasService: new SchemasService(getAccessTokenSilently),
        pipelinesService: new PipelinesService(getAccessTokenSilently)
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}