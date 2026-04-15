import { Link } from "react-router";
import { useEffect, useState } from "react";
import {
  Package,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Search,
  Boxes,
} from "lucide-react";
import { getProducts } from "../services/api";
import { motion } from "framer-motion";
import "./IndexScreen.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function IndexScreen() {
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [availableProducts, setAvailableProducts] = useState<number | null>(null);
  const [categories, setCategories] = useState<number | null>(null);

  useEffect(() => {
    getProducts({})
      .then((data) => {
        setTotalProducts(data.length);
        setAvailableProducts(data.filter((p) => p.availability).length);
        setCategories(new Set(data.map((p) => p.category)).size);
      })
      .catch(() => {
        // Stats not critical — leave as null, UI handles gracefully
      });
  }, []);

  return (
    <div className="index-screen">
      {/* ── Hero ── */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="hero-icon-wrapper">
            <Package size={36} />
          </div>

          <h1>
            Gestión de <span className="gradient-text">Productos</span>
          </h1>

          <p className="hero-subtitle">
            Administrá tu catálogo de productos de forma simple y eficiente.
            Consultá stock, precios y disponibilidad en tiempo real.
          </p>

          <div className="hero-actions">
            <Link to="/catalog" className="btn-primary" id="hero-catalog-btn">
              Ver Catálogo <ArrowRight size={18} />
            </Link>
            <a
              href="#features"
              className="btn-secondary"
              id="hero-features-btn"
            >
              Conocer más
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Stats Strip ── */}
      <div className="stats-strip">
        {[
          { number: totalProducts, label: "Productos" },
          { number: availableProducts, label: "Disponibles" },
          { number: categories, label: "Categorías" },
        ].map((stat, i) => (
          <motion.div
            className="stat-card"
            key={stat.label}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="stat-number">
              {stat.number !== null ? stat.number : <span className="stat-loading">·</span>}
            </span>
            <span className="stat-text">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Features ── */}
      <section className="features-section" id="features">
        <h2 className="section-title gradient-text">Funcionalidades</h2>
        <p className="section-subtitle">
          Todo lo que necesitás para gestionar tu inventario
        </p>

        <div className="features-grid">
          {[
            {
              icon: <Search size={22} />,
              title: "Búsqueda rápida",
              desc: "Encontrá cualquier producto al instante con filtros por nombre, categoría o disponibilidad.",
            },
            {
              icon: <BarChart3 size={22} />,
              title: "Control de stock",
              desc: "Visualizá el estado del inventario en tiempo real y recibí alertas de productos agotados.",
            },
            {
              icon: <ShieldCheck size={22} />,
              title: "Datos confiables",
              desc: "Información precisa y actualizada respaldada por una base de datos MongoDB.",
            },
            {
              icon: <Boxes size={22} />,
              title: "Catálogo organizado",
              desc: "Productos agrupados por categorías con vista detallada individual.",
            },
            {
              icon: <Package size={22} />,
              title: "Detalle de producto",
              desc: "Consultá precio, descripción, stock y disponibilidad de cada artículo.",
            },
            {
              icon: <ArrowRight size={22} />,
              title: "Navegación fluida",
              desc: "Interfaz moderna con transiciones suaves y diseño responsive.",
            },
          ].map((feat, i) => (
            <motion.div
              className="feature-card"
              key={feat.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="feature-icon">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>¿Listo para explorar el catálogo?</h2>
          <p>Accedé a todos los productos disponibles con un solo clic.</p>
          <Link to="/catalog" className="btn-cta" id="cta-catalog-btn">
            Ir al Catálogo <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="index-footer">
        Trabajo Práctico — Catálogo de Productos · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
