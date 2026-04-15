import { useState } from "react";
import { X, Package, DollarSign, Boxes, Tag, FileText, Image } from "lucide-react";
import type { CreateProductRequest } from "../types";
import { createProduct } from "../services/api";
import "./ProductFormModal.css";

interface ProductFormModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const EMPTY_FORM: CreateProductRequest = {
  name: "",
  price: 0,
  stock: 0,
  details: {},
};

export default function ProductFormModal({
  onClose,
  onSuccess,
}: ProductFormModalProps) {
  const [form, setForm] = useState<CreateProductRequest>(EMPTY_FORM);
  // details as key-value pairs for easy editing
  const [detailRows, setDetailRows] = useState<{ key: string; value: string }[]>([
    { key: "description", value: "" },
    { key: "category", value: "" },
    { key: "imageUrl", value: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleField = (field: keyof Omit<CreateProductRequest, "details">, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "price" || field === "stock" ? Number(value) : value,
    }));
  };

  const handleDetailKeyChange = (index: number, newKey: string) => {
    setDetailRows((rows) =>
      rows.map((r, i) => (i === index ? { ...r, key: newKey } : r))
    );
  };

  const handleDetailValueChange = (index: number, newValue: string) => {
    setDetailRows((rows) =>
      rows.map((r, i) => (i === index ? { ...r, value: newValue } : r))
    );
  };

  const addDetailRow = () => {
    setDetailRows((rows) => [...rows, { key: "", value: "" }]);
  };

  const removeDetailRow = (index: number) => {
    setDetailRows((rows) => rows.filter((_, i) => i !== index));
  };

  const buildPayload = (): CreateProductRequest => {
    const details: Record<string, string> = {};
    detailRows.forEach(({ key, value }) => {
      if (key.trim() && value.trim()) details[key.trim()] = value.trim();
    });
    return { ...form, details };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validación de detalles dinámicos obligatorios
    const customDetailsCount = detailRows.filter(
      (row) =>
        row.key.trim() !== "" &&
        row.value.trim() !== "" &&
        !["description", "category", "imageUrl"].includes(row.key)
    ).length;

    if (customDetailsCount === 0) {
      setError("Debes agregar al menos un detalle o característica que defina a tu producto (Ej: talle, color, capacidad, etc).");
      setLoading(false);
      return;
    }

    // Validar que no haya campos de detalles incompletos
    const hasIncompleteRows = detailRows.some(
      (row) => (row.key.trim() === "" && row.value.trim() !== "") || (row.key.trim() !== "" && row.value.trim() === "")
    );

    if (hasIncompleteRows) {
      setError("Tienes atributos de detalles incompletos. Todos deben tener su nombre y valor.");
      setLoading(false);
      return;
    }

    try {
      const payload = buildPayload();
      await createProduct(payload);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-icon">
              <Package size={20} />
            </div>
            <div>
              <h2 id="modal-title">Nuevo Producto</h2>
              <p>Completá los datos del producto a agregar</p>
            </div>
          </div>
          <button
            id="modal-close-btn"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-row">
            {/* Name */}
            <div className="form-group form-group--full">
              <label htmlFor="new-product-name">
                <Tag size={14} /> Nombre del producto
              </label>
              <input
                id="new-product-name"
                type="text"
                required
                placeholder="Ej: Auriculares Bluetooth Pro"
                value={form.name}
                onChange={(e) => handleField("name", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            {/* Price */}
            <div className="form-group">
              <label htmlFor="new-product-price">
                <DollarSign size={14} /> Precio
              </label>
              <input
                id="new-product-price"
                type="number"
                min={0}
                step={0.01}
                required
                placeholder="0.00"
                value={form.price}
                onChange={(e) => handleField("price", e.target.value)}
              />
            </div>
            {/* Stock */}
            <div className="form-group">
              <label htmlFor="new-product-stock">
                <Boxes size={14} /> Stock
              </label>
              <input
                id="new-product-stock"
                type="number"
                min={0}
                required
                placeholder="0"
                value={form.stock}
                onChange={(e) => handleField("stock", e.target.value)}
              />
            </div>
          </div>

          {/* Details section */}
          <div className="form-section">
            <div className="form-section-header">
              <FileText size={14} />
              <span>Detalles adicionales</span>
              <span className="form-section-hint">(Se guardan en MongoDB como campos flexibles)</span>
            </div>

            <div className="details-grid">
              {detailRows.map((row, i) => (
                <div key={i} className="detail-row">
                  <input
                    type="text"
                    className="detail-key-input"
                    placeholder="Campo"
                    value={row.key}
                    onChange={(e) => handleDetailKeyChange(i, e.target.value)}
                    aria-label={`Nombre campo ${i + 1}`}
                  />
                  {row.key === "imageUrl" ? (
                    <div className="detail-value-with-icon">
                      <Image size={14} className="detail-value-icon" />
                      <input
                        type="url"
                        className="detail-value-input"
                        placeholder="https://..."
                        value={row.value}
                        onChange={(e) => handleDetailValueChange(i, e.target.value)}
                        aria-label={`Valor campo ${i + 1}`}
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="detail-value-input"
                      placeholder="Valor"
                      value={row.value}
                      onChange={(e) => handleDetailValueChange(i, e.target.value)}
                      aria-label={`Valor campo ${i + 1}`}
                    />
                  )}
                  <button
                    type="button"
                    className="remove-detail-btn"
                    onClick={() => removeDetailRow(i)}
                    aria-label={`Eliminar campo ${i + 1}`}
                    title="Eliminar campo"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              id="add-detail-row-btn"
              className="add-detail-btn"
              onClick={addDetailRow}
            >
              + Agregar campo
            </button>
          </div>

          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="modal-actions">
            <button
              type="button"
              id="modal-cancel-btn"
              className="modal-btn modal-btn--cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="modal-submit-btn"
              className="modal-btn modal-btn--submit"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-spinner" />
              ) : (
                <Package size={16} />
              )}
              {loading ? "Guardando..." : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
