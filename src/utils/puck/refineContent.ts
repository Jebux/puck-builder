// /utils/puck/refineContent.ts
export type ContentModel = Record<string, string>;

// Extractor genérico: depende de tus keys (titleKey, textKey, etc.)
export function extractContentKeys(layout: unknown): string[] {
  const keys = new Set<string>();
  const visited = new WeakSet<object>();

  const traverse = (node: unknown) => {
    if (!node || typeof node !== "object") return;

    if (visited.has(node as object)) return;
    visited.add(node as object);

    if (Array.isArray(node)) {
      node.forEach(traverse);
      return;
    }

    // node es object
    const obj = node as Record<string, unknown>;

    // 🔥 Aquí defines las "props keys" que representan bindings
    // Ej: props.titleKey, props.textKey...
    const props = obj["props"];
    if (props && typeof props === "object" && !Array.isArray(props)) {
      const p = props as Record<string, unknown>;

      const titleKey = p["titleKey"];
      if (typeof titleKey === "string" && titleKey.trim()) keys.add(titleKey);

      const textKey = p["textKey"];
      if (typeof textKey === "string" && textKey.trim()) keys.add(textKey);

      // si luego agregas más: subtitleKey, buttonTextKey, etc.
    }

    Object.values(obj).forEach(traverse);
  };

  traverse(layout);
  return Array.from(keys);
}

export function refineContentModel<T extends ContentModel>(
  layout: unknown,
  currentContent: T
): ContentModel {
  const validKeys = extractContentKeys(layout);

  const cleaned: ContentModel = {};

  for (const key of validKeys) {
    cleaned[key] = currentContent[key] ?? "";
  }

  return cleaned;
}