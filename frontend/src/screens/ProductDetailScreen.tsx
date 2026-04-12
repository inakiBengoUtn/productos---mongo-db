import { useLoaderData, Link } from "react-router";
import type { Product } from "../types";
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Info,
  Tag,
  Package,
  List,
} from "lucide-react";
import { motion } from "framer-motion";
import "./ProductDetailScreen.css";

const ProductDetailScreen = () => {
  const { product } = useLoaderData() as { product: Product };

  return (
    <div className="detail-container container">
      <Link to="/" className="back-link">
        <ArrowLeft size={20} />
        <span>Back to Catalog</span>
      </Link>

      <motion.div
        className="detail-grid glass-morphism"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="product-visual">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="detail-image"
          />
        </div>

        <div className="product-info-panel">
          <div className="detail-header">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.name}</h1>
            <div className="detail-price-status">
              <span className="detail-price">${product.price.toFixed(2)}</span>
              <div
                className={`status-badge ${product.availability ? "available" : "unavailable"}`}
              >
                {product.availability ? (
                  <>
                    <CheckCircle size={14} /> <span>In Stock</span>
                  </>
                ) : (
                  <>
                    <XCircle size={14} /> <span>Out of Stock</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">
              <Info size={16} /> Description
            </h3>
            <p className="detail-description">{product.description}</p>
          </div>

          <div className="detail-specs">
            <div className="spec-item">
              <Package size={18} />
              <div className="spec-content">
                <span className="spec-label">Stock Level</span>
                <span className="spec-value">{product.stock} units</span>
              </div>
            </div>
            <div className="spec-item">
              <Tag size={18} />
              <div className="spec-content">
                <span className="spec-label">Product ID</span>
                <span className="spec-value">
                  #SKU-{product.id.padStart(4, "0")}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <ul className="features-list">
              {product.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <CheckCircle size={14} className="feature-icon-check" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="buy-now-btn" disabled={!product.availability}>
            <ShoppingCart size={20} />
            <span>Add to Inventory</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailScreen;
