"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import "@puckeditor/core/puck.css";
import { puckConfig } from "@/puck/config";
import { initialData } from "@/puck/initialData";

import type { Data, Plugin } from "@puckeditor/core";

import { templatesPlugin } from "@/puck/plugins/templatePlugin";
import { textModifierPlugin } from "@/puck/plugins/textModifierPlugin";

type EditorData = Data<typeof puckConfig>;
type EditorConfig = typeof puckConfig;


const ALLOWED_ROOT_KEYS = new Set([
  "id",
  "templateName",
  "templateKeyName",
  "groups",
]);

export function cleanRoot(data: EditorData): EditorData {
  const cleaned = structuredClone(data);
  const props = cleaned.root?.props as Record<string, unknown> | undefined;
  if (!props) return cleaned;

  for (const key of Object.keys(props)) {
    if (!ALLOWED_ROOT_KEYS.has(key)) delete props[key];
  }

  return cleaned;
}

const Puck = dynamic(
  () =>
    import("@puckeditor/core").then((mod) => {
      return mod.Puck as unknown as React.ComponentType<{
        config: EditorConfig;
        data: EditorData;
        onChange?: (data: EditorData) => void;
        onPublish?: (data: EditorData) => void;
        headerTitle?: string;
        plugins?: Plugin<EditorConfig>[];
      }>;
    }),
  { ssr: false }
);

const STORAGE_KEY = "puck:data";

export default function EditorPage() {
  const [data, setData] = useState<EditorData>(() => {
    if (typeof window === "undefined") return initialData as EditorData;

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialData as EditorData;

    try {
      return JSON.parse(raw) as EditorData;
    } catch {
      return initialData as EditorData;
    }
  });

  console.log("Editor render with data:", data);

  return (
    <Puck
      config={puckConfig}
      data={data}
      headerTitle="Page Builder"
      onChange={(next) => setData(next as EditorData)}
      onPublish={(next) => {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(cleanRoot(next as EditorData))
        );
      }}
      plugins={[
    templatesPlugin((next) => setData(next as EditorData)), 
    textModifierPlugin(data as any, (next) => setData(next as EditorData))
  ]}
      
    />
  );
}