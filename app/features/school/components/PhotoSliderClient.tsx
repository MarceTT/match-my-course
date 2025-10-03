"use client";

import React from "react";
import { PhotoSlider as RPPhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type ImageItem = { src: string; key?: string; alt?: string };
type Props = {
  images: ImageItem[];
  visible: boolean;
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  [key: string]: any;
};

export default function PhotoSlider(props: Props) {
  // Tipado laxo para compatibilidad con la lib instalada
  return <RPPhotoSlider {...(props as any)} />;
}
