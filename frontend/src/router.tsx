import { createBrowserRouter } from "react-router";
import ProductCatalog from "./screens/ProductCatalog";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import { getProducts, getProductById } from "./services/api";
import IndexScreen from "./screens/IndexScreen";
import ErrorPage from "./screens/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/catalog",
    element: <ProductCatalog />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const products = await getProducts();
      return { products };
    },
  },
  {
    path: "/product/:id",
    element: <ProductDetailScreen />,
    errorElement: <ErrorPage />,
    loader: async ({ params }) => {
      const product = await getProductById(params.id || "");
      if (!product) {
        throw new Response("Not Found", { status: 404 });
      }
      return { product };
    },
  },
]);
