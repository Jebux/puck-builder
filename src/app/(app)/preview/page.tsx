"use client";

import { useEffect, useState } from "react";
import { Render } from "@puckeditor/core";
import { puckConfig } from "@/puck/config";
import { initialData } from "@/puck/initialData";

const STORAGE_KEY = "puck:data";

export default function PreviewPage() {
  const [data, setData] = useState(initialData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
      console.log("Loaded data from localStorage", saved);
    } catch (e) {
      // si el JSON está corrupto, caes a initialData sin romper
      setData(initialData);
      console.log("Error loading data, falling back to initialData", e);
    } finally {
      setReady(true);
    }
  }, []);

  if (!ready) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-8 space-y-6">
      <Render config={puckConfig} data={data} />
    </div>
  );
}