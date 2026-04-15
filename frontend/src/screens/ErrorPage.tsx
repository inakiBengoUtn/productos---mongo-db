import { useRouteError, Link } from "react-router";
import { ServerCrash, ArrowLeft, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import "./ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError() as { status?: number; statusText?: string; message?: string } | null;

  const is404 = error?.status === 404;

  return (
    <div className="error-page">
      <motion.div
        className="error-card glass-morphism"
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="error-icon-wrapper">
          <ServerCrash size={40} />
        </div>

        <h1 className="error-code gradient-text">
          {is404 ? "404" : "Error"}
        </h1>

        <h2 className="error-title">
          {is404 ? "Producto no encontrado" : "No se pudo conectar al servidor"}
        </h2>

        <p className="error-desc">
          {is404
            ? "El producto que buscás no existe o fue eliminado."
            : "El backend no respondió. Verificá que Spring Boot esté corriendo en localhost:8080 y que la base de datos MongoDB esté activa."}
        </p>

        {!is404 && (
          <div className="error-hint">
            <code>mvn spring-boot:run</code>
          </div>
        )}

        <div className="error-actions">
          <Link to="/catalog" className="error-btn error-btn--primary" id="error-back-catalog">
            <ArrowLeft size={18} />
            <span>Volver al Catálogo</span>
          </Link>
          <button
            className="error-btn error-btn--secondary"
            id="error-retry-btn"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} />
            <span>Reintentar</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
