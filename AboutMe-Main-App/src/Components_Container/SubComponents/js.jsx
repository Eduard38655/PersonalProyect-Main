// src/components/AutoTranslatePage.jsx
import { useEffect, useRef, useState } from "react";

/**
 * Helper: simple hash (djb2) para generar keys cortas para localStorage.
 */
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  // convertir a positivo y base36 para ahorrar espacio
  return (hash >>> 0).toString(36);
}

/**
 * Llamador al servidor (proxy) que traduce un array de textos y devuelve array de traducciones.
 */
async function translateTextsBatchServer(texts, targetLang = "es") {
  try {
    const resp = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts, target: targetLang })
    });
    if (!resp.ok) {
      const txt = await resp.text();
      throw new Error(`Server translate error: ${resp.status} ${txt}`);
    }
    const json = await resp.json();
    return json.results || texts;
  } catch (err) {
    console.error("translateTextsBatchServer error:", err);
    return texts; // fallback: devolver originales
  }
}

/**
 * Comprueba si el elemento es traducible:
 * - visible (no display:none)
 * - no es input/textarea/code/pre
 * - no tiene elementos hijos (solo texto), para no romper estructura HTML
 * - no tiene atributo data-no-translate
 */
function isTranslatableElement(el) {
  if (!el || el.nodeType !== 1) return false;
  if (el.hasAttribute("data-no-translate")) return false;
  const forbiddenTags = ["INPUT", "TEXTAREA", "CODE", "PRE", "SCRIPT", "STYLE"];
  if (forbiddenTags.includes(el.tagName)) return false;
  if (el.childElementCount > 0) return false; // evita sobrescribir estructuras
  const text = (el.textContent || "").trim();
  if (!text) return false;
  // visible?
  const style = window.getComputedStyle(el);
  if (style && (style.visibility === "hidden" || style.display === "none")) return false;
  return true;
}

/**
 * chunkArray: divide array en partes de tamaño n
 */
function chunkArray(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export default function AutoTranslatePage({
  batchSize = 60, // textos por petición (ajusta según proveedor)
  initialSelectors = "p, h1, h2, h3, span, li, button, a"
}) {
  const [lang, setLang] = useState(() =>
    localStorage.getItem("lang") || (navigator.language && navigator.language.startsWith("es") ? "es" : "en")
  );
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const toggleLang = () => {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
    localStorage.setItem("lang", next);
    document.documentElement.lang = next;
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    // recoge todos los elementos candidatos y filtralos
    const collectElements = () => {
      return Array.from(document.querySelectorAll(initialSelectors)).filter(isTranslatableElement);
    };

    const elements = collectElements();

    // Guardamos originales y agrupamos índices por texto
    const originals = elements.map(el => {
      const orig = el.getAttribute("data-original") || el.textContent;
      el.setAttribute("data-original", orig);
      return orig;
    });

    const textIndexMap = new Map(); // text -> [indices]
    originals.forEach((txt, i) => {
      if (!textIndexMap.has(txt)) textIndexMap.set(txt, []);
      textIndexMap.get(txt).push(i);
    });

    // Comprobar cache localStorage por texto (usamos hash para key)
    const translationsByText = new Map(); // text -> translatedText
    const missingTexts = [];

    for (const [text] of textIndexMap) {
      const key = `trans_${lang}_${hashString(text)}`;
      const cached = localStorage.getItem(key);
      if (cached !== null) {
        translationsByText.set(text, cached);
      } else {
        missingTexts.push(text);
      }
    }

    // Si no faltan textos, aplicar y salir
    if (missingTexts.length === 0) {
      elements.forEach((el, i) => {
        const orig = originals[i];
        const translated = translationsByText.get(orig) || orig;
        el.textContent = translated;
      });
      setLoading(false);
      return;
    }

    // Batching: dividir missingTexts en chunks y pedir por cada chunk
    const chunks = chunkArray(missingTexts, batchSize);

    (async () => {
      try {
        for (const chunk of chunks) {
          if (cancelled) break;
          const translatedChunk = await translateTextsBatchServer(chunk, lang);
          // guardar en cache y en translationsByText
          chunk.forEach((origText, idx) => {
            const translated = translatedChunk[idx] || origText;
            const key = `trans_${lang}_${hashString(origText)}`;
            try {
              localStorage.setItem(key, translated);
            } catch (err) {
              // storage full -> ignorar
            }
            translationsByText.set(origText, translated);
          });
        }

        if (cancelled) return;

        // Aplicar traducciones a todos los elementos (también los que estaban en cache)
        elements.forEach((el, i) => {
          const orig = originals[i];
          const translated = translationsByText.get(orig) || orig;
          el.textContent = translated;
        });
      } catch (err) {
        console.error("AutoTranslatePage error:", err);
        // Fallback: dejar textos originales
        elements.forEach((el, i) => {
          el.textContent = originals[i];
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // MutationObserver para detectar nodos nuevos y traducirlos automáticamente
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      // Si hay nodos añadidos, dispara una pequeña re-evaluación cambiando el lang a mismo valor.
      // Forzamos efecto ejecutando setLang((l) => l) ... pero mejor: re-run translation code directly.
      const added = mutations.some(m => m.addedNodes && m.addedNodes.length > 0);
      if (added) {
        // trigger re-translation by temporarily toggling a no-op state
        setLang(l => l); // esto hace que el useEffect de [lang] se vuelva a ejecutar
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    observerRef.current = observer;
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={toggleLang}
        style={{ marginBottom: 16 }}
        aria-busy={loading}
      >
        {loading ? (lang === "es" ? "Cargando..." : "Loading...") : (lang === "es" ? "EN" : "ES")}
      </button>

      {/* Ejemplo de contenido — puedes dejar tu markup normal */}
      <h1>Welcome to my portfolio!</h1>
      <p>I am a Full-Stack Developer specializing in modern web applications.</p>

      <h2>Projects</h2>
      <p>Technologies I use</p>

      <button>Contact me</button>

      <ul>
        <li>React</li>
        <li>Node.js</li>
        <li>SQL Server</li>
        <li>Express</li>
      </ul>

      <p data-no-translate style={{ marginTop: 20, fontSize: 12, color: "#666" }}>
        Nota: los textos en elementos con <code>data-no-translate</code> no se traducen.
      </p>
    </div>
  );
}
