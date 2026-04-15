import { useLoaderData, Link } from "react-router";
import type { Product } from "../types";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Package,
  Tag,
  Hash,
  Layers,
  ImageOff,
} from "lucide-react";
import { motion } from "framer-motion";
import "./ProductDetailScreen.css";

/** Capitalise the first letter of a detail key for display */
function formatKey(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

const ProductDetailScreen = () => {
  const { product } = useLoaderData() as { product: Product };

  // All entries from details that are NOT the visual helpers already shown elsewhere
  const VISUAL_KEYS = new Set(["description", "imageUrl", "category"]);
  const customDetails = Object.entries(product.details ?? {}).filter(
    ([k]) => !VISUAL_KEYS.has(k)
  );

  return (
    <div className="detail-container container">
      <Link to="/catalog" className="back-link" id="back-to-catalog-link">
        <ArrowLeft size={20} />
        <span>Volver al Catálogo</span>
      </Link>

      <motion.div
        className="detail-grid glass-morphism"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* ── Image panel ── */}
        <div className="product-visual">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="detail-image"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div className={`image-fallback ${product.imageUrl ? "hidden" : ""}`}>
            <ImageOff size={64} />
            <span>Sin imagen</span>
          </div>
        </div>

        {/* ── Info panel ── */}
        <div className="product-info-panel">
          {/* Header */}
          <div className="detail-header">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.name}</h1>
            <div className="detail-price-status">
              <span className="detail-price">
                ${product.price.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </span>
              <div className={`status-badge ${product.availability ? "available" : "unavailable"}`}>
                {product.availability ? (
                  <>
                    <CheckCircle size={14} /> <span>En stock</span>
                  </>
                ) : (
                  <>
                    <XCircle size={14} /> <span>Sin stock</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick specs row */}
          <div className="detail-specs">
            <div className="spec-item">
              <Package size={18} />
              <div className="spec-content">
                <span className="spec-label">Stock</span>
                <span className="spec-value">{product.stock} unidades</span>
              </div>
            </div>
            <div className="spec-item">
              <Hash size={18} />
              <div className="spec-content">
                <span className="spec-label">ID Mongo</span>
                <span className="spec-value spec-value--mono" title={product.id}>
                  {product.id.slice(0, 8)}…
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description && product.description !== "Sin descripción" && (
            <div className="detail-section">
              <h3 className="section-title">
                <Tag size={16} /> Descripción
              </h3>
              <p className="detail-description">{product.description}</p>
            </div>
          )}

          {/* ── MongoDB details map ── */}
          {customDetails.length > 0 && (
            <div className="detail-section">
              <h3 className="section-title">
                <Layers size={16} /> Características
                <span className="section-badge">MongoDB details</span>
              </h3>
              <div className="details-map-grid">
                {customDetails.map(([key, value]) => (
                  <motion.div
                    key={key}
                    className="detail-chip"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="chip-key">{formatKey(key)}</span>
                    <span className="chip-value">{String(value)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {customDetails.length === 0 && (
            <div className="no-details-notice">
              Este producto no tiene características adicionales registradas.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailScreen;
