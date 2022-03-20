import React from "react"
import { ServiceLayerContext } from "./context"

export const ServiceLayerProvider = ({
  services = {},
  children
}) => {
  return (
    <ServiceLayerContext.Provider value={services}>
      {children}
    </ServiceLayerContext.Provider>
  )
}
