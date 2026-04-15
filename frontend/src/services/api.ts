import type { CreateProductRequest, ProductFilterRequest, ProductResponse } from "../types";

const BASE_URL = "http://localhost:8080";

/** Maps a ProductResponse from the backend to the Product shape the UI expects */
export function mapToProduct(r: ProductResponse) {
  const d = r.details ?? {};
  return {
    id: r.id,
    name: r.name,
    price: r.price,
    stock: r.stock,
    // availability: stock > 0 (backend doesn't return it directly)
    availability: r.stock > 0,
    // pull optional visual fields from the flexible details map
    description: String(d["description"] ?? "Sin descripción"),
    imageUrl: String(d["imageUrl"] ?? ""),
    category: String(d["category"] ?? "General"),
    // remaining details entries become "features" strings
    features: Object.entries(d)
      .filter(([k]) => !["description", "imageUrl", "category"].includes(k))
      .map(([k, v]) => `${k}: ${v}`),
    // preserve raw details for ProductDetailScreen
    details: d,
  };
}

/** GET /products — sends filter as request body (Spring Boot @RequestBody) */
export async function getProducts(filter: ProductFilterRequest = {}) {
  const url = new URL(`${BASE_URL}/products`);
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Error al obtener productos: ${res.status}`);
  const data: ProductResponse[] = await res.json();
  return data.map(mapToProduct);
}

/** GET /products/{id} */
export async function getProductById(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Error al obtener el producto: ${res.status}`);
  const data: ProductResponse = await res.json();
  return mapToProduct(data);
}

/** POST /products */
export async function createProduct(request: CreateProductRequest) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Error al crear producto: ${res.status}`);
  }
  // 201 Created – no body; Spring returns Location header
}

/** DELETE /products/{id} */
export async function deleteProduct(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Error al eliminar producto: ${res.status}`);
}
