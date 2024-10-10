import { createContext } from "react";
import { Services } from "../services/Services";

export const ServicesContext = createContext<Services>({} as Services)