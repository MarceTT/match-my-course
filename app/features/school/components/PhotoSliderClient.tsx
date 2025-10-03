"use client";

import React from "react";
import { PhotoSlider as RPPhotoSlider } from "react-photo-view";
import type { PhotoSliderProps } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function PhotoSlider(props: PhotoSliderProps) {
  return <RPPhotoSlider {...props} />;
}

