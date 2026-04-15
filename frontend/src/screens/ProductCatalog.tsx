import { useState, useCallback } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import type { Product, ProductFilterRequest } from '../types';
import { getProducts, deleteProduct } from '../services/api';
import { useToast } from '../components/useToast';
import ProductCard from '../components/ProductCard';
import Toolbar from '../components/Toolbar';
import ProductFormModal from '../components/ProductFormModal';
import { Package, Home } from 'lucide-react';
import { Link } from "react-router";
import './ProductCatalog.css';

const ProductCatalog = () => {
    const { products: initialProducts } = useLoaderData() as { products: Product[] };
    const revalidator = useRevalidator();
    const { success, error: toastError } = useToast();

    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
    const [activeFilters, setActiveFilters] = useState<ProductFilterRequest>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingFilter, setLoadingFilter] = useState(false);

    /** Apply filter: calls backend with ProductFilterRequest body */
    const handleFilter = useCallback(async (filters: ProductFilterRequest) => {
        setActiveFilters(filters);
        setLoadingFilter(true);
        try {
            const result = await getProducts(filters);
            setFilteredProducts(result);
            setProducts(result);
        } catch {
            toastError('No se pudo conectar con el servidor. Verificá que el backend esté corriendo en localhost:8080.');
            // fall back to client-side filter
            let result = [...products];
            if (filters.name) {
                const q = filters.name.toLowerCase();
                result = result.filter((p) => p.name.toLowerCase().includes(q));
            }
            if (filters.minPrice !== undefined) result = result.filter((p) => p.price >= filters.minPrice!);
            if (filters.stock !== undefined) result = result.filter((p) => p.stock >= filters.stock!);
            if (filters.active !== undefined) result = result.filter((p) => p.availability === filters.active);
            setFilteredProducts(result);
        } finally {
            setLoadingFilter(false);
        }
    }, [products, toastError]);

    /** After a new product is created, re-fetch with current filters */
    const handleProductCreated = async () => {
        setLoadingFilter(true);
        try {
            const updated = await getProducts(activeFilters);
            setProducts(updated);
            setFilteredProducts(updated);
            success('¡Producto creado exitosamente!');
        } catch {
            toastError('Producto creado, pero no se pudo actualizar el listado. Recargá la página.');
        } finally {
            setLoadingFilter(false);
        }
    };

    /** Delete a product — optimistic removal with rollback on failure */
    const handleDelete = useCallback(async (id: string, name: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setFilteredProducts((prev) => prev.filter((p) => p.id !== id));
        try {
            await deleteProduct(id);
            success(`"${name}" eliminado correctamente.`);
        } catch {
            toastError(`No se pudo eliminar "${name}". Intentá de nuevo.`);
            revalidator.revalidate();
        }
    }, [revalidator, success, toastError]);

    return (
        <div className="catalog-container container">
            <Link to="/" className="home-back-link" id="back-to-home-link">
                <Home size={18} />
                <span>Inicio</span>
            </Link>
            <header className="catalog-header">
                <div className="header-info">
                    <Package className="header-icon" size={32} />
                    <div>
                        <h1 className="gradient-text">Catálogo de Productos</h1>
                        <p className="subtitle">Explorá y administrá tu inventario conectado a MongoDB</p>
                    </div>
                </div>
                <div className="catalog-stats">
                    <div className="stat-item">
                        <span className="stat-value">{filteredProducts.length}</span>
                        <span className="stat-label">
                            {filteredProducts.length !== products.length
                                ? `de ${products.length}`
                                : 'productos'}
                        </span>
                    </div>
                </div>
            </header>

            {/* ── Toolbar: filters + add button ── */}
            <Toolbar onFilter={handleFilter} onAddProduct={() => setIsModalOpen(true)} />

            {loadingFilter ? (
                <div className="skeleton-grid">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="skeleton-card" />
                    ))}
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onDelete={handleDelete}
                        />
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
