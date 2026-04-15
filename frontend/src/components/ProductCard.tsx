import { useState, useRef, useEffect } from "react";
import type { Product } from "../types";
import { Link } from "react-router";
import { Eye, Trash, EllipsisVertical, ImageOff } from "lucide-react";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string, name: string) => void;
}

const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="product_card">
      <div className="product_image">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div className={`product-card-fallback ${product.imageUrl ? "hidden" : ""}`}>
          <ImageOff size={40} />
        </div>
      </div>
      <div className="product_info">
        <p className="category">{product.category}</p>
        <h3 className="name">{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="stock">
          {product.availability ? (
            <div className="stock_indication stock_available"></div>
          ) : (
            <div className="stock_indication stock_unavailable"></div>
          )}
          <p>{product.stock} in stock</p>
        </div>
      </div>
      <div className="product_actions">
        <div className="options_menu_wrapper" ref={menuRef}>
          <button
            className="options_btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Product options"
            id={`options-btn-${product.id}`}
          >
            <EllipsisVertical size={20} />
          </button>

          {menuOpen && (
            <div className="options_dropdown">
              <button
                className="dropdown_item dropdown_item--danger"
                onClick={() => {
                  setMenuOpen(false);
                  if (window.confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) {
                    onDelete?.(product.id, product.name);
                  }
                }}
              >
                <Trash size={15} />
                <span>Eliminar</span>
              </button>
            </div>
          )}
        </div>

        <p className="price">${product.price.toLocaleString()}</p>
        <Link to={`/product/${product.id}`} className="view_details_btn">
          <Eye size={18} />
          <span>View Details</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
