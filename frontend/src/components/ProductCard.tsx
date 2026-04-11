import type { Product } from "../types";
import { Link } from "react-router";
import { Eye, Trash } from "lucide-react";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product_card">
      <div className="product_image">
        <img src={product.imageUrl} alt={product.name} />
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
