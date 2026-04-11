import { createBrowserRouter } from 'react-router';
import ProductCatalog from './screens/ProductCatalog';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { getProducts, getProductById } from './mockData';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProductCatalog />,
        loader: async () => {
            const products = await getProducts();
            return { products };
        }
    },
    {
        path: '/product/:id',
        element: <ProductDetailScreen />,
        loader: async ({ params }) => {
            const product = await getProductById(params.id || '');
            if (!product) {
                throw new Response("Not Found", { status: 404 });
            }
            return { product };
        }
    }
]);
