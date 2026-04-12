import { useState } from 'react';
import { useLoaderData } from 'react-router';
import type { Product, ProductFilterRequest } from '../types';
import ProductCard from '../components/ProductCard';
import Toolbar from '../components/Toolbar';
import ProductFormModal from '../components/ProductFormModal';
import { Package } from 'lucide-react';
import './ProductCatalog.css';

const ProductCatalog = () => {
    const { products: initialProducts } = useLoaderData() as { products: Product[] };
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFilter = (filters: ProductFilterRequest) => {
        let result = [...products];

        if (filters.name) {
            const query = filters.name.toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(query));
        }
        if (filters.minPrice !== undefined) {
            result = result.filter((p) => p.price >= filters.minPrice!);
        }
        if (filters.stock !== undefined) {
            result = result.filter((p) => p.stock >= filters.stock!);
        }
        if (filters.active !== undefined) {
            result = result.filter((p) => p.availability === filters.active);
        }

        setFilteredProducts(result);
    };

    const handleProductCreated = () => {
        // Toast notice — in Stage 2 we'll reload from backend
        window.location.reload();
    };

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
                        <span className="stat-value">{filteredProducts.length}</span>
                        <span className="stat-label">
                            {filteredProducts.length !== products.length
                                ? `de ${products.length}`
                                : 'Total items'}
                        </span>
                    </div>
                </div>
            </header>

            {/* ── Toolbar: filters + add button ── */}
            <Toolbar onFilter={handleFilter} onAddProduct={() => setIsModalOpen(true)} />

            {filteredProducts.length > 0 ? (
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <Package size={48} className="empty-icon" />
                    <p>No se encontraron productos con esos filtros.</p>
                </div>
            )}

            {/* ── Add product modal ── */}
            {isModalOpen && (
                <ProductFormModal
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleProductCreated}
                />
            )}
        </div>
    );
};

export default ProductCatalog;
