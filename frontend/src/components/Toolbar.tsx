import { useState } from "react";
import { Search, SlidersHorizontal, Plus, X } from "lucide-react";
import type { ProductFilterRequest } from "../types";
import "./Toolbar.css";

interface ToolbarProps {
  onFilter: (filters: ProductFilterRequest) => void;
  onAddProduct: () => void;
}

const DEFAULT_FILTERS: ProductFilterRequest = {
  name: "",
  minPrice: undefined,
  stock: undefined,
  active: undefined,
};

export default function Toolbar({ onFilter, onAddProduct }: ToolbarProps) {
  const [filters, setFilters] = useState<ProductFilterRequest>(DEFAULT_FILTERS);
  const [expanded, setExpanded] = useState(false);

  const hasActiveFilters =
    !!filters.name ||
    filters.minPrice !== undefined ||
    filters.stock !== undefined ||
    filters.active !== undefined;

  const handleChange = (
    field: keyof ProductFilterRequest,
    value: string | number | boolean | undefined
  ) => {
    const updated = { ...filters, [field]: value === "" ? undefined : value };
    setFilters(updated);
    onFilter(updated);
  };

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS);
    onFilter(DEFAULT_FILTERS);
  };

  return (
    <div className="toolbar">
      <div className="toolbar-main">
        {/* Search input */}
        <div className="toolbar-search">
          <Search size={17} className="search-icon" />
          <input
            id="toolbar-search-input"
            type="text"
            className="toolbar-input"
            placeholder="Buscar productos..."
            value={filters.name ?? ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {filters.name && (
            <button
              className="clear-search-btn"
              onClick={() => handleChange("name", "")}
              aria-label="Limpiar búsqueda"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        <button
          id="toolbar-filters-btn"
          className={`toolbar-icon-btn ${expanded ? "active" : ""}`}
          onClick={() => setExpanded((p) => !p)}
          aria-label="Mostrar filtros"
          title="Filtros avanzados"
        >
          <SlidersHorizontal size={18} />
          {hasActiveFilters && !expanded && (
            <span className="filter-dot" />
          )}
        </button>

        <div className="toolbar-divider" />

        {/* Add product button */}
        <button
          id="toolbar-add-product-btn"
          className="toolbar-add-btn"
          onClick={onAddProduct}
        >
          <Plus size={18} />
          <span>Agregar Producto</span>
        </button>
      </div>

      {/* Expanded filters row */}
      {expanded && (
        <div className="toolbar-filters">
          <div className="filter-group">
            <label htmlFor="filter-min-price">Precio mínimo</label>
            <input
              id="filter-min-price"
              type="number"
              min={0}
              className="filter-input"
              placeholder="$ 0"
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                handleChange(
                  "minPrice",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
            />
          </div>

          <div className="filter-group">
            <label htmlFor="filter-stock">Stock mínimo</label>
            <input
              id="filter-stock"
              type="number"
              min={0}
              className="filter-input"
              placeholder="0 unidades"
              value={filters.stock ?? ""}
              onChange={(e) =>
                handleChange(
                  "stock",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
            />
          </div>

          <div className="filter-group">
            <label htmlFor="filter-active">Disponibilidad</label>
            <select
              id="filter-active"
              className="filter-input filter-select"
              value={
                filters.active === undefined
                  ? ""
                  : filters.active
                  ? "true"
                  : "false"
              }
              onChange={(e) =>
                handleChange(
                  "active",
                  e.target.value === ""
                    ? undefined
                    : e.target.value === "true"
                )
              }
            >
              <option value="">Todos</option>
              <option value="true">Disponibles</option>
              <option value="false">Sin stock</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              id="toolbar-clear-filters-btn"
              className="clear-filters-btn"
              onClick={handleClear}
            >
              <X size={14} />
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}
