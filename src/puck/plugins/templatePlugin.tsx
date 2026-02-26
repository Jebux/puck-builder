import type { Plugin, Data } from "@puckeditor/core";

// 1. Estructuramos mejor las plantillas para incluir un 'name' visible y los datos completos requeridos por Puck
const templates: Record<string, { name: string; data: Data }> = {
  landing: {
    name: "Landing Page Básica",
    data: {
      content: [
        { type: "Heading", props: { text: "Landing Title" } },
        { type: "ButtonBlock", props: { label: "Get Started" } }
      ],
      root: { props: { title: "Landing Page" } },
      zones: {}
    }
  },
  twoColumns: {
    name: "Estructura de Dos Columnas",
    data: {
      content: [
        { type: "TwoColumnBlock", props: {} }
      ],
      root: { props: { title: "Dos Columnas" } },
      zones: {}
    }
  }
};

export const templatesPlugin = (setData: (data: Data) => void): Plugin => ({
  name: "templates",
  label: "Plantillas",
  icon: <span>📋</span>, // Un ícono simple para que aparezca en el menú lateral
  
  render: () => {
    return (
      <div style={{ padding: 16 }}>
        <h3 style={{ marginBottom: 16, fontSize: "16px", fontWeight: "bold" }}>
          Selecciona una Plantilla
        </h3>

        {/* 2. Contenedor de la lista con Flexbox */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          
          {/* 3. Iteramos sobre el objeto de plantillas */}
          {Object.entries(templates).map(([key, template]) => (
            <div
              key={key}
              onClick={() => {
                // Opcional: Podrías poner un window.confirm() aquí si no quieres que el usuario borre su trabajo por accidente
                setData(template.data);
              }}
              style={{
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: "#fff",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease"
              }}
              // Efectos hover simples (puedes usar clases de Tailwind si lo tienes configurado)
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
            >
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                {template.name}
              </span>
            </div>
          ))}

        </div>
      </div>
    );
  }
});