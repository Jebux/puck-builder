"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

import "@puckeditor/core/puck.css";
import { puckConfig } from "@/puck/config";
import { initialData } from "@/puck/initialData";

import type { Data, Plugin } from "@puckeditor/core";

import { ContentProvider, useContent } from "@/providers/BlocksContext";
import { refineContentModel } from "@/utils/puck/refineContent";

type EditorData = Data<typeof puckConfig>;
type EditorConfig = typeof puckConfig;

const ALLOWED_ROOT_KEYS = new Set(["id", "templateName", "templateKeyName", "groups"]);

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

const STORAGE_KEY = "puck:template";
const CONTENT_KEY = "puck:content";

function EditorInner() {
  const { content, setContent } = useContent();

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

  // (Opcional) cargar contentModel persistido
  React.useEffect(() => {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (!raw) return;
    try {
      setContent(JSON.parse(raw));
    } catch {}
  }, [setContent]);

  return (
    <Puck
      config={puckConfig}
      data={data}
      headerTitle="Page Builder"
      onChange={(next) => setData(next)}
      onPublish={(next) => {
        const cleanedLayout = cleanRoot(next);

        // ✅ Aquí limpiamos el contentModel en base al layout publicado
        const cleanedContent = refineContentModel(cleanedLayout, content);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedLayout));
        localStorage.setItem(CONTENT_KEY, JSON.stringify(cleanedContent));

        // Si quieres, también puedes sincronizar el context con el cleaned:
        setContent(cleanedContent);
      }}
      
    />
  );
}

export default function EditorPage() {
  return (
    <ContentProvider>
      <EditorInner />
    </ContentProvider>
  );
}