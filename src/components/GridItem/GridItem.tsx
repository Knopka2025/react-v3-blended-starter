import { ReactNode } from "react";
import style from "./GridItem.module.css";

interface Props {
  children: ReactNode;
}

export default function GridItem({ children }: Props) {
  return <li className={style.item}>{children}</li>;
}
