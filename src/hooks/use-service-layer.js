import { useContext } from "react"
import { ServiceLayerContext } from "../contexts"

export const useServiceLayer = () => {
  return useContext(ServiceLayerContext)
}
