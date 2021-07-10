import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";

export const Box = () => {
  const [, drag] = useDrag(() => ({ type: ItemTypes.BOX }));
  return <div ref={drag}>Drag me</div>;
};
