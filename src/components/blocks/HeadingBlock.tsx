import HeadingBlockComponent, { type HeadingBlockProps } from "./components/HeadingBlockComponent";

// Esto describe el “shape” de lo que tú necesitas leer desde Puck
type HeadingFields = HeadingBlockProps;

// Helper: extrae los fields sin casarte con el tipo interno de Puck
function pickHeadingFields(input: any): HeadingFields {
  // En algunas versiones de Puck los fields vienen en input (spread),
  // en otras vienen en input.props. Probamos ambos.
  const src = input?.props ?? input ?? {};

  return {
    title: src.title ?? "Hello",
    titleKey: src.titleKey ?? "",
    size: src.size ?? "text-4xl",
    align: src.align ?? "text-left",
    colorText: src.colorText ?? "text-black",
  };
}

export const HeadingBlock_test = {
  label: "Heading_test",
  fields: {
    title: { type: "text" },
    titleKey: { type: "text" },
    size: {
      type: "select",
      options: [
        { label: "Small", value: "text-sm" },
        { label: "Medium", value: "text-base" },
        { label: "Large", value: "text-4xl" },
      ],
    },
    align: {
      type: "select",
      options: [
        { label: "Left", value: "text-left" },
        { label: "Center", value: "text-center" },
        { label: "Right", value: "text-right" },
      ],
    },
    colorText: {
      type: "select",
      options: [
        { label: "Black", value: "text-black" },
        { label: "White", value: "text-white" },
      ],
    },
  },
  defaultProps: {
    title: "Hello",
    titleKey: "",
    size: "text-4xl",
    align: "text-left",
    colorText: "text-black",
  },
  render: (input: any) => <HeadingBlockComponent {...pickHeadingFields(input)} />,
} as const;