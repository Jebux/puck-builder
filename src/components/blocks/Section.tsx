// Section.tsx (ejemplo para Puck)
import React from "react";

type BgVariant = "bg0" | "bg1" | "bg2" | "bg3";

const BG_MAP: Record<BgVariant, React.CSSProperties> = {
  bg0: { background: "#ffffff" }, // Color default
  bg1: { background: "#0B1220" }, // Color 1
  bg2: { background: "#0F766E" }, // Color 2
  bg3: { background: "#F97316" }, // Color 3
};

export const Section = {
  fields: {
    background: {
      type: "select",
      label: "Background",
      options: [
        { label: "Background 1", value: "bg0" },
        { label: "Background 1", value: "bg1" },
        { label: "Background 2", value: "bg2" },
        { label: "Background 3", value: "bg3" },
      ],
    },
    paddingY: {
      type: "select",
      label: "Padding Y",
      options: [
        { label: "Small", value: "24" },
        { label: "Medium", value: "48" },
        { label: "Large", value: "80" },
      ],
    },
    paddingX: {
      type: "select",
      label: "Padding X",
      options: [
        { label: "Small", value: "24" },
        { label: "Medium", value: "48" },
        { label: "Large", value: "80" },
      ],
    },
    children: { type: "slot" },
  },
  defaultProps: {
    background: "bg0" as BgVariant,
    paddingY: "48",
    paddingX: "48",
  },
  render: ({ background, paddingY, paddingX, children: Slot }: any) => {
    const style = BG_MAP[background as BgVariant] ?? BG_MAP.bg0;

    return (
      <section style={style}>
        <div style={{ paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px`, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
          <Slot />
        </div>
      </section>
    );
  },
};