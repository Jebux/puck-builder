import type { Config } from "@puckeditor/core";

import { Section } from "@/components/blocks/Section";

export const puckConfig: Config = {
    root: {
        fields: {
            id: { type: "text" },
            templateName: { type: "text" },
            templateKeyName: { type: "text" },
            groups: {
                type: "array",
                arrayFields: {
                    value: { type: "text" },
                }
            },
        },
        defaultProps: {
            id: "0987yauhsidf98y73g4",
            templateName: "Default Template",
            templateKeyName: "default-template",
            groups: [
                { value: "published" },
            ],
        },
    },

    components: {
        HeadingBlock: {
            fields: {
                title: { type: "text" },
                size: {
                    type: "select",
                    options: [
                        { label: "H1", value: "text-4xl" },
                        { label: "H2", value: "text-3xl" },
                        { label: "H3", value: "text-2xl" },
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
                        { label: "Color1", value: "text-black" },
                        { label: "Color2", value: "text-white" }
                    ],
                },
            },
            defaultProps: {
                title: "Hello from Puck",
                size: "text-4xl",
                align: "text-left",
                colorText: "text-black",
            },
            render: ({ title, size, align, colorText }) => (
                <h1 className={`${size} ${align} ${colorText} font-bold`}>{title}</h1>
            ),
        },

        GridBlock: {
            fields: {
                cols: {
                    type: "select",
                    options: [
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
                        { label: "4", value: "4" },
                    ],
                },
                gap: {
                    type: "select",
                    options: [
                        { label: "Small", value: "gap-3" },
                        { label: "Medium", value: "gap-6" },
                        { label: "Large", value: "gap-10" },
                    ],
                },

                // 👇 ESTA ES LA CLAVE: un área anidada para soltar bloques
                children: { type: "slot" },
            },

            defaultProps: {
                cols: "2",
                gap: "gap-6",
                children: [],
            },

            render: ({ cols, gap, children: Slot }) => {
                const colsClass =
                    cols === "4" ? "grid-cols-4" : cols === "3" ? "grid-cols-3" : "grid-cols-2";

                return (
                    <div className={`grid ${colsClass} ${gap}`}>
                        <Slot />
                    </div>
                );
            },
        },

        TextBlock: {
            fields: {
                text: { type: "textarea" },
                colorText: {
                    type: "select",
                    options: [
                        { label: "Color1", value: "text-black" },
                        { label: "Color2", value: "text-white" }
                    ],
                },
            },
            defaultProps: {
                text: "This is a text block.",
                colorText: "text-black",
            },
            render: ({ text, colorText }) => <p className={`text-base leading-7 ${colorText}`}>{text}</p>,
        },

        ButtonBlock: {
            fields: {
                label: { type: "text" },
                href: { type: "text" },
                variant: {
                    type: "select",
                    options: [
                        { label: "Primary", value: "primary" },
                        { label: "Outline", value: "outline" },
                    ],
                },
            },
            defaultProps: {
                label: "Click me",
                href: "/",
                variant: "primary",
            },
            render: ({ label, href, variant }) => {
                const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium";
                const styles =
                    variant === "outline"
                        ? "border border-zinc-300 hover:bg-zinc-50"
                        : "bg-zinc-900 text-white hover:bg-zinc-800";

                return (
                    <a className={`${base} ${styles}`} href={href}>
                        {label}
                    </a>
                );
            },
        },

        TwoColumnBlock: {
            fields: {
                gap: {
                    type: "select",
                    options: [
                        { label: "Small", value: "gap-3" },
                        { label: "Medium", value: "gap-6" },
                        { label: "Large", value: "gap-10" },
                    ],
                },
                left: { type: "slot" },
                right: { type: "slot" },
            },

            defaultProps: {
                gap: "gap-6",
            },

            render: ({ gap, left: Left, right: Right }) => {
                return (
                    <div className={`grid grid-cols-1 md:grid-cols-2 ${gap}`}>
                        <div className="min-h-10">
                            <Left />
                        </div>
                        <div className="min-h-10">
                            <Right />
                        </div>
                    </div>
                );
            },
        },
        Section

    },
};

