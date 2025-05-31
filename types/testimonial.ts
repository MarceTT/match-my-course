import { ReactNode } from "react";

export interface Testimonial {
  name: string;
  flag: string;
  originCountry: string,
  destinationCountry: string,
  destinationCity: string,
  image: string,
  text: ReactNode,
}
