"use client";

import dynamic from "next/dynamic";
import "@puckeditor/core/puck.css";

import { puckConfig } from "@/puck/config";
import { initialData } from "@/puck/initialData";
import type { Data } from "@puckeditor/core";

const ALLOWED_ROOT_KEYS = new Set([
  "id",
  "templateName",
  "templateKeyName",
  "groups",
]);

export function cleanRoot(data: Data): Data {
  const cleaned = structuredClone(data);

  // root.props es dinámico, lo tratamos como diccionario
  const props = cleaned.root?.props as Record<string, unknown> | undefined;
  if (!props) return cleaned;

  for (const key of Object.keys(props)) {
    if (!ALLOWED_ROOT_KEYS.has(key)) {
      delete props[key];
    }
  }

  return cleaned;
}


const Puck = dynamic(() => import("@puckeditor/core").then((m) => m.Puck), {
    ssr: false,
});

const STORAGE_KEY = "puck:data";

export default function EditorPage() {
    const saved =
        typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;

    const data = saved ? JSON.parse(saved) : initialData;

    return (
        <Puck
            config={puckConfig}
            data={data}
            headerTitle="Page Builder"
            onPublish={(nextData) => {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanRoot(nextData)));
            }}
            onChange={(nextData) => {
                // opcional: autosave
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanRoot(nextData)));

            }}
        />
    );
}