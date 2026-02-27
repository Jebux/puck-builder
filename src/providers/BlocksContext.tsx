"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { ContentModel } from "@/utils/puck/refineContent";

type BlocksContextValue = {
  content: ContentModel;
  setField: (key: string, value: string) => void;
  setContent: React.Dispatch<React.SetStateAction<ContentModel>>;

  // 🔹 NUEVO
  activeBlockId: string | null;
  setActiveBlock: (id: string | null) => void;
};

const BlocksContext = createContext<BlocksContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentModel>({});
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const setField = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const setActiveBlock = (id: string | null) => {
    setActiveBlockId(id);
  };

  const value = useMemo(
    () => ({
      content,
      setField,
      setContent,
      activeBlockId,
      setActiveBlock,
    }),
    [content, activeBlockId]
  );

  return (
    <BlocksContext.Provider value={value}>
      {children}
    </BlocksContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(BlocksContext);
  if (!ctx) throw new Error("ContentProvider missing");
  return ctx;
}