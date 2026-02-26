import type { Plugin, Data } from "@puckeditor/core";

// 1. Definimos qué nombres de props de tus componentes contienen texto real.
// Agrega aquí cualquier otra prop que uses en tus componentes (ej: "subtitle", "body").
const TEXT_PROP_KEYS = new Set(["text", "title", "label", "description", "content", "heading"]);

export const textModifierPlugin = (currentData: Data<any>, setData: (data: Data) => void): Plugin => ({
  name: "global-text-modifier",
  label: "Modificador Global",
  icon: <span>📝</span>,
  
  render: () => {
    
    const handleModifyAllText = () => {
      // 2. Función auxiliar que procesa un arreglo de bloques y actualiza sus props
      const processBlocks = (blocks: any[]) => {
        return blocks.map((block) => {
          const newProps = { ...block.props };

          // Revisamos cada propiedad del componente
          for (const key in newProps) {
            // Si el valor es texto y la clave está en nuestra lista de "textos seguros"
            if (typeof newProps[key] === "string" && TEXT_PROP_KEYS.has(key)) {
              
              // --- AQUÍ VA TU LÓGICA DE EDICIÓN ---
              // Como ejemplo, le agregaremos "(Modificado)" al final de cada texto,
              // pero aquí podrías llamar a una IA, traducir, o aplicar un regex.
              newProps[key] = `${newProps[key]} (Modificado)`;
              
            }
          }

          return { ...block, props: newProps };
        });
      };

      // 3. Procesamos los componentes principales (raíz)
      const updatedContent = processBlocks(currentData.content || []);

      // 4. Procesamos los componentes anidados (DropZones)
      const updatedZones: Record<string, any[]> = {};
      if (currentData.zones) {
        for (const zoneKey in currentData.zones) {
          updatedZones[zoneKey] = processBlocks(currentData.zones[zoneKey]);
        }
      }

      // 5. Guardamos el nuevo estado global
      setData({
        ...currentData,
        content: updatedContent,
        zones: updatedZones,
      });
    };

    return (
      <div style={{ padding: 16 }}>
        <h3 style={{ marginBottom: 16, fontSize: "16px", fontWeight: "bold" }}>
          Edición Masiva
        </h3>

        <button
          onClick={handleModifyAllText}
          style={{
            width: "100%",
            padding: "8px",
            background: "#6366f1", // Indigo
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          Transformar Todos los Textos
        </button>
      </div>
    );
  }
});