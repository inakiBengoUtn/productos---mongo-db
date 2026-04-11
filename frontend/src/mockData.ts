import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Quantum Lens 50mm",
    description:
      "A premium 50mm lens with unprecedented optical clarity and ultra-fast autofocus. Perfect for portraits and low-light street photography. Features a weather-sealed body and Nano-crystal coating.",
    price: 899.99,
    stock: 12,
    availability: true,
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    category: "Photography",
  },
  {
    id: "2",
    name: "Nebula Smartwatch Pro",
    description:
      "Elite smartwatch with a vibrant OLED display and a 14-day battery life. Track your health, sleep, and sports with military-grade precision. Includes sapphire glass and titanium casing.",
    price: 349.5,
    stock: 25,
    availability: true,
    imageUrl:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Zenith Noise Cancelling Headphones",
    description:
      "Immerse yourself in pure sound with active noise cancellation and spatial audio support. Designed for comfort during long listening sessions. Features 40-hour battery life and quick charge.",
    price: 299.0,
    stock: 8,
    availability: true,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    category: "Audio",
  },
  {
    id: "4",
    name: "Titanium X Mechanical Keyboard",
    description:
      "A masterpiece of input performance. Hot-swappable switches, RGB backlighting, and a solid titanium plate. Precision-engineered for enthusiasts and competitive play.",
    price: 189.99,
    stock: 5,
    availability: true,
    imageUrl:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
    category: "Peripherals",
  },
  {
    id: "5",
    name: "Aura Minimalist Lamp",
    description:
      "Sleek, atmospheric lighting with adjustable color temperature and smart home integration. Its sculptural design makes it a center piece for any modern desk or bedside table.",
    price: 125.0,
    stock: 0,
    availability: false,
    imageUrl:
      "https://i.etsystatic.com/52108998/r/il/59e9aa/6141103046/il_340x270.6141103046_kvnw.jpg",
    category: "Home Deco",
  },
  {
    id: "6",
    name: "Core S Pro Backpack",
    description:
      'The ultimate commuter backpack. Water-resistant materials, dedicated 16" laptop compartment, and hidden pockets for security. Ergonomic design for maximum comfort.',
    price: 159.0,
    stock: 18,
    availability: true,
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    category: "Lifestyle",
  },
];

export const getProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 400);
  });
};

export const getProductById = async (
  id: string,
): Promise<Product | undefined> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(products.find((p) => p.id === id)), 400);
  });
};
