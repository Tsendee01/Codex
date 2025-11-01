import type { CSSProperties } from "react";

type TitleScale = "sm" | "md" | "lg";
type BodyScale = "sm" | "md";
type SmallScale = "xs";

type ScaleValue = { fontSize: string; lineHeight: string; fontWeight?: number };

const titleScale: Record<TitleScale, ScaleValue> = {
  sm: { fontSize: "28px", lineHeight: "36px", fontWeight: 600 },
  md: { fontSize: "36px", lineHeight: "44px", fontWeight: 600 },
  lg: { fontSize: "48px", lineHeight: "56px", fontWeight: 700 }
};

const bodyScale: Record<BodyScale, ScaleValue> = {
  sm: { fontSize: "14px", lineHeight: "20px" },
  md: { fontSize: "16px", lineHeight: "24px" }
};

const smallScale: Record<SmallScale, ScaleValue> = {
  xs: { fontSize: "12px", lineHeight: "18px", fontWeight: 500 }
};

export const typography = {
  title: titleScale,
  body: bodyScale,
  small: smallScale
};

function toStyle(value: ScaleValue): CSSProperties {
  return {
    fontSize: value.fontSize,
    lineHeight: value.lineHeight,
    fontWeight: value.fontWeight
  };
}

export function getTitleStyle(scale: TitleScale): CSSProperties {
  return toStyle(titleScale[scale]);
}

export function getBodyStyle(scale: BodyScale): CSSProperties {
  return toStyle(bodyScale[scale]);
}

export function getSmallStyle(scale: SmallScale = "xs"): CSSProperties {
  return toStyle(smallScale[scale]);
}
