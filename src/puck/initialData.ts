import type { Data } from "@puckeditor/core";

export const initialData: Data = {
  content: [
    {
      type: "HeadingBlock",
      props: {
        id: "HeadingBlock-1",
        title: "Home",
        size: "text-4xl",
        align: "text-left",
      },
    },
    {
      type: "HeadingBlock",
      props: {
        id: "HeadingBlock-2",
        title: "Home",
        size: "text-4xl",
        align: "text-left",
      },
    },
    {
      type: "TextBlock",
      props: {
        id: "TextBlock-1",
        text: "Edit this page using the editor.",
      },
    },
    {
      type: "ButtonBlock",
      props: {
        id: "ButtonBlock-1",
        label: "Go to Preview",
        href: "/preview",
        variant: "primary",
      },
    },
  ],
  root: {},
  zones: {},
};