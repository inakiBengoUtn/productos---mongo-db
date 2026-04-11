import { useLoaderData } from 'react-router';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Package } from 'lucide-react';
import './ProductCatalog.css';

const ProductCatalog = () => {
    const { products } = useLoaderData() as { products: Product[] };

    return (
        <div className="catalog-container container">
            <header className="catalog-header">
                <div className="header-info">
                    <Package className="header-icon" size={32} />
                    <div>
                        <h1 className="gradient-text">Product Catalog</h1>
                        <p className="subtitle">Manage and explore your company's high-end inventory</p>
                    </div>
                </div>
                <div className="catalog-stats">
                    <div className="stat-item">
                        <span className="stat-value">{products.length}</span>
                        <span className="stat-label">Total items</span>
                    </div>
                </div>
            </header>

            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductCatalog;
