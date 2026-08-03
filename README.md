# Rick & Morty Character Match — Conexa Frontend Challenge

Dashboard interactivo desarrollado para analizar intersecciones de líneas temporales y coincidencias de episodios entre personajes del multiverso de Rick & Morty.

🌐 **Demo en Vivo (Vercel)**: [https://conexa-frontend-challenge.vercel.app/](https://conexa-frontend-challenge.vercel.app/)

## 🛠️ Tecnologías Utilizadas

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (Sistema de diseño dark interdimensional)
- **Estado Global**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Capa de Red**: Native `fetch` consumiendo la [Rick and Morty REST API](https://rickandmortyapi.com/)
- **Pruebas Unitarias**: [Vitest](https://vitest.dev/)
- **Íconos**: [Lucide React](https://lucide.dev/)

---

## 🏗️ Arquitectura y Decisiones Técnicas

El proyecto sigue una arquitectura limpia basada en **Separación de Responsabilidades (Separation of Concerns)**:

1. **Capa de UI (`src/components`)**:
   - `components/ui/`: Componentes atómicos puramente visuales y reutilizables (`CharacterCard`, `EpisodeCard`, `EpisodeColumn`).
   - `components/features/`: Componentes de negocio complejos (`CharacterPicker`, `EpisodeBoard`).

2. **Capa de Estado y Lógica (`src/store` & `src/hooks`)**:
   - **Zustand (`useCharacterStore`)**: Gestión liviana del estado global para la selección de los dos personajes a comparar.
   - **Custom Hooks (`useCharacters`)**: Manejo de estado local de paginación, búsqueda en tiempo real y *debouncing* (350ms).

3. **Capa de Red y Batch Fetching (`src/services/api.ts`)**:
   - Consumo de la REST API pública.
   - **Estrategia de Batch Fetching**: La REST API de Rick & Morty devuelve los episodios de cada personaje como un arreglo de URLs. Para optimizar el rendimiento y evitar múltiples peticiones HTTP individuales, se implementó una función auxiliar que extrae las IDs únicas de todas las URLs de la página y realiza una **única petición por lote** (`/api/episode/${ids.join(',')}`), mapeando los objetos de episodios completos de forma transparente para los componentes.

4. **Algoritmo de Intersección $O(n)$ (`src/utils/intersection.ts`)**:
   - Para calcular la intersección y exclusividad de episodios entre dos personajes sin incurrir en complejidad cuadrática $O(n \times m)$, se utiliza la estructura de datos `Set` de JavaScript.
   - Esto permite resolver la clasificación en tiempo lineal $O(n)$ garantizando máxima eficiencia computacional.

---

## ✨ Funcionalidades Destacadas

- **Búsqueda Local con Debounce**: Cada panel `CharacterPicker` cuenta con un campo de búsqueda independiente con un retardo de 350ms para evitar sobrecargar la API REST mientras se escribe.
- **Paginación Numerada Interactiva**: Componente de paginación avanzado que permite saltos directos a páginas específicas (`< 1 2 3 ... 42 >`) con indicador de página activa estilo neón.
- **Botón de Reset por Columna**: Permite limpiar la búsqueda y la selección del personaje de una columna específica de forma independiente.
- **Validación de Selección**: El tablero de intersecciones no se muestra hasta que ambos personajes (`Character #1` y `Character #2`) estén seleccionados.
- **Diseño Adaptativo Móvil**: Layout completamente responsive con tarjetas e indicadores ajustados para visualización óptima en cualquier dispositivo.

---

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/cristiannokk/conexa-frontend-challenge.git
cd conexa-rick-morty-challenge
npm install
```

### 2. Ejecutar servidor de desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### 3. Ejecutar pruebas unitarias
```bash
npm test
```

### 4. Compilar para producción
```bash
npm run build
```
