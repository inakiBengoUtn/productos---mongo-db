package com.productos.mongodb.configuration;

import com.productos.mongodb.model.Product;
import com.productos.mongodb.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final ProductRepo productRepo;

    @Override
    public void run(String... args) {
        if (productRepo.count() > 0) {
            log.info("⏭️  Seeder: La colección de productos ya contiene datos. No se insertará ningún registro.");
            return;
        }

        log.info("🌱 Seeder: La colección está vacía. Iniciando carga de datos de prueba...");

        List<Product> productos = buildProducts();
        productRepo.saveAll(productos);

        log.info("✅ Seeder: {} productos insertados correctamente.", productRepo.count());
    }

    private List<Product> buildProducts() {
        return List.of(

            // ── ELECTRÓNICA ──────────────────────────────────────────────────

            Product.builder()
                .name("Samsung Galaxy S24+")
                .price(1299.99)
                .stock(15)
                .active(true)
                .details(Map.of(
                    "category",         "Electrónica",
                    "description",      "Smartphone flagship con pantalla Dynamic AMOLED 2X y cámara de 50 MP impulsada por IA.",
                    "imageUrl",         "https://pardohogar.vtexassets.com/arquivos/ids/203403-800-auto?v=638627744998700000&width=800&height=auto&aspect=true",
                    "camara",           "50 MP + 12 MP + 10 MP",
                    "bateria",          "4900 mAh",
                    "pantalla",         "6.7\" Dynamic AMOLED 2X 120Hz",
                    "ram",              "12 GB",
                    "almacenamiento",   "256 GB",
                    "sistemaOperativo", "Android 14"
                ))
                .build(),

            Product.builder()
                .name("MacBook Air M3 15\"")
                .price(2199.00)
                .stock(8)
                .active(true)
                .details(Map.of(
                    "category",         "Electrónica",
                    "description",      "Laptop ultradelgada con el chip Apple M3, batería de larga duración y pantalla Liquid Retina.",
                    "imageUrl",         "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606",
                    "procesador",       "Apple M3 (8 núcleos)",
                    "ram",              "8 GB RAM Unificada",
                    "almacenamiento",   "SSD 512 GB",
                    "pantalla",         "15.3\" Liquid Retina 2560x1664",
                    "bateria",          "Hasta 18 horas",
                    "peso",             "1.51 kg"
                ))
                .build(),

            Product.builder()
                .name("Apple Watch Series 9 (45mm)")
                .price(499.00)
                .stock(22)
                .active(true)
                .details(Map.of(
                    "category",         "Electrónica",
                    "description",      "Smartwatch con chip S9, brillo hasta 2000 nits y la nueva función Double Tap.",
                    "imageUrl",         "https://dcdn-us.mitiendanube.com/stores/001/414/148/products/53-1ade89a26c871da35517054475018790-1024-1024.webp",
                    "caja",             "Aluminio de 45 mm",
                    "pantalla",         "Retina LTPO OLED siempre activa",
                    "resistencia",      "Resistente al agua 50 m (WR50)",
                    "bateria",          "Hasta 18 horas",
                    "sistemaOperativo", "watchOS 10",
                    "conectividad",     "GPS + Bluetooth 5.3 + Wi-Fi"
                ))
                .build(),

            Product.builder()
                .name("Sony WH-1000XM5")
                .price(379.99)
                .stock(30)
                .active(true)
                .details(Map.of(
                    "category",         "Electrónica",
                    "description",      "Auriculares over-ear con la mejor cancelación de ruido del mercado y sonido Hi-Res Audio.",
                    "imageUrl",         "https://metapod.com/cdn/shop/files/1_WH-1000XM5_standard_smokypink-Mid.png?v=1768544935&width=500",
                    "cancelacionRuido", "Activa (ANC) con 8 micrófonos",
                    "bateria",          "Hasta 30 horas (con ANC)",
                    "driver",           "30 mm",
                    "conectividad",     "Bluetooth 5.2 / NFC / Jack 3.5mm",
                    "peso",             "250 g",
                    "certificacion",    "Hi-Res Audio"
                ))
                .build(),

            Product.builder()
                .name("iPad Pro 11\" M4")
                .price(1099.00)
                .stock(12)
                .active(true)
                .details(Map.of(
                    "category",         "Electrónica",
                    "description",      "La tablet más potente de Apple, con pantalla Ultra Retina XDR OLED y chip M4.",
                    "imageUrl",         "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-finish-select-202405-11inch-silver_AV1",
                    "procesador",       "Apple M4 (10 núcleos)",
                    "pantalla",         "11\" Ultra Retina XDR OLED 2420x1668",
                    "camara",           "12 MP trasera + 12 MP frontal",
                    "almacenamiento",   "256 GB",
                    "conectividad",     "Wi-Fi 6E + Bluetooth 5.3",
                    "sistemaOperativo", "iPadOS 17"
                ))
                .build(),

            // ── INDUMENTARIA ─────────────────────────────────────────────────

            Product.builder()
                .name("Campera The North Face Thermoball")
                .price(189.99)
                .stock(25)
                .active(true)
                .details(Map.of(
                    "category",    "Indumentaria",
                    "description", "Campera 100% impermeable con relleno PrimaLoft, ideal para climas extremos y actividades outdoor.",
                    "imageUrl",    "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2018/6_1/0/45/226/3007181.jpg",
                    "talle",       "M / L / XL / XXL",
                    "color",       "Negro / Azul marino / Rojo",
                    "material",    "100% Nylon ripstop + relleno PrimaLoft",
                    "temporada",   "Otoño-Invierno",
                    "impermeabilidad", "Membrana DryVent 3L"
                ))
                .build(),

            Product.builder()
                .name("Zapatillas Nike Air Max 270")
                .price(149.99)
                .stock(40)
                .active(true)
                .details(Map.of(
                    "category",    "Indumentaria",
                    "description", "Zapatillas icónicas con la unidad de aire más grande de Nike en el talón, máxima amortiguación y estilo urbano.",
                    "imageUrl",    "https://midwaysports.com/cdn/shop/files/NikeAirMax270Men_sShoes_4_4185b4b9-e8bc-40e2-9a70-a115e0181996.png?v=1762198310",
                    "talle",       "38 al 46",
                    "color",       "Blanco/Negro / Total Orange / Triple Black",
                    "material",    "Malla de ingeniería + cuero sintético",
                    "genero",      "Unisex",
                    "suela",       "Max Air 270 + espuma React"
                ))
                .build(),

            Product.builder()
                .name("Remera Adidas Essentials 3 Tiras")
                .price(39.99)
                .stock(80)
                .active(true)
                .details(Map.of(
                    "category",    "Indumentaria",
                    "description", "Remera deportiva clásica de algodón con las icónicas tres tiras en los hombros. Comfort y estilo cotidiano.",
                    "imageUrl",    "https://www.stockcenter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw5df4e355/products/ADJM2394/ADJM2394-1.JPG",
                    "talle",       "XS / S / M / L / XL",
                    "color",       "Negro / Blanco / Azul / Verde",
                    "material",    "100% Algodón jersey",
                    "genero",      "Hombre",
                    "temporada",   "Primavera-Verano"
                ))
                .build(),

            Product.builder()
                .name("Jeans Levis 501 Original")
                .price(89.99)
                .stock(35)
                .active(true)
                .details(Map.of(
                    "category",    "Indumentaria",
                    "description", "El jean original desde 1873. Corte recto y ajuste relajado para un look atemporal y auténtico.",
                    "imageUrl",    "https://dcdn-us.mitiendanube.com/stores/001/700/324/products/376-867c3832f5d806996617613207431767-1024-1024.webp",
                    "talle",       "28W-38W / 30L-34L",
                    "color",       "Dark Stonewash / Light Indigo / Black",
                    "material",    "100% Denim de algodón",
                    "corte",       "Recto (Straight Fit)",
                    "genero",      "Hombre / Mujer"
                ))
                .build(),

            Product.builder()
                .name("Gorra New Era Yankees 59FIFTY")
                .price(49.99)
                .stock(50)
                .active(true)
                .details(Map.of(
                    "category",    "Indumentaria",
                    "description", "La gorra fitted más icónica del mundo. Insignia oficial de los New York Yankees con ajuste estructurado.",
                    "imageUrl",    "https://f.fcdn.app/imgs/95a311/www.sportmarket.com.uy/smaruy/336c/webp/catalogo/11591126_790_1/1500-1500/gorro-new-era-new-york-yankees-mlb-59fifty-11591126-bordeaux.jpg",
                    "talle",       "6 7/8 a 7 5/8 (Fitted)",
                    "color",       "Navy / Black / Grey",
                    "material",    "100% Lana",
                    "tipo",        "59FIFTY Fitted",
                    "temporada",   "Todo el año"
                ))
                .build(),

            // ── ELECTRODOMÉSTICOS / HOGAR ─────────────────────────────────────

            Product.builder()
                .name("Aire Acondicionado Samsung WindFree 3000 FC")
                .price(899.99)
                .stock(6)
                .active(true)
                .details(Map.of(
                    "category",    "Electrodomésticos",
                    "description", "Split inverter con tecnología WindFree que distribuye el aire frío sin corriente directa, silencioso y eficiente.",
                    "imageUrl",    "https://todoenclima.com/1872-home_default/aire-acondicionado-samsung-f-ar09art-2500-frigorias.jpg",
                    "potencia",    "3000 frigorías (3.5 kW)",
                    "voltaje",     "220V / 50Hz",
                    "eficiencia",  "Clase A+++",
                    "garantia",    "3 años oficial Samsung",
                    "funcion",     "Frío/Calor Inverter"
                ))
                .build(),

            Product.builder()
                .name("Microondas Whirlpool 25L Grill")
                .price(149.99)
                .stock(18)
                .active(true)
                .details(Map.of(
                    "category",    "Electrodomésticos",
                    "description", "Microondas con función grill incorporada, 10 niveles de potencia y panel de control táctil.",
                    "imageUrl",    "https://http2.mlstatic.com/D_NQ_NP_2X_871949-MLA94458703049_102025-F.webp",
                    "capacidad",   "25 litros",
                    "potencia",    "900W (microondas) + 1000W (grill)",
                    "voltaje",     "220V / 50Hz",
                    "garantia",    "1 año oficial",
                    "peso",        "13.5 kg"
                ))
                .build(),

            Product.builder()
                .name("Licuadora Oster BLSTMB-BBG Pro")
                .price(79.99)
                .stock(27)
                .active(true)
                .details(Map.of(
                    "category",    "Electrodomésticos",
                    "description", "Licuadora de alta potencia con vaso de borosilicato resistente al calor y 10 velocidades programables.",
                    "imageUrl",    "https://ostermx.vtexassets.com/arquivos/ids/163790-800-auto?v=638630634209400000&width=800&height=auto&aspect=true",
                    "potencia",    "1200W",
                    "capacidad",   "1.5 litros (vaso de vidrio)",
                    "voltaje",     "220V / 50Hz",
                    "velocidades", "10 velocidades + pulso",
                    "garantia",    "2 años"
                ))
                .build(),

            Product.builder()
                .name("Aspiradora Robot Roomba i5+")
                .price(499.00)
                .stock(9)
                .active(true)
                .details(Map.of(
                    "category",    "Electrodomésticos",
                    "description", "Robot aspiradora con vaciado automático de la base, mapeo inteligente por habitaciones y control por app.",
                    "imageUrl",    "https://tiendanewsan.com.ar/media/catalog/product/cache/e16223670af7ae8877a6c2db5c335df1/i/5/i5-18.jpg",
                    "autonomia",   "Hasta 75 minutos",
                    "consumo",     "28W (robot) + 1400W (base vaciado)",
                    "conectividad","Wi-Fi / App iRobot Home / Alexa / Google Home",
                    "garantia",    "1 año oficial iRobot",
                    "filtro",      "HEPA 10 capas"
                ))
                .build(),

            Product.builder()
                .name("Cafetera De'Longhi Magnifica Evo")
                .price(699.00)
                .stock(11)
                .active(true)
                .details(Map.of(
                    "category",    "Electrodomésticos",
                    "description", "Cafetera súper automática con molinillo integrado, espumador LatteCrema y 6 recetas de café en un toque.",
                    "imageUrl",    "https://http2.mlstatic.com/D_NQ_NP_2X_710168-MLA107458995751_022026-F.webp",
                    "potencia",    "1450W",
                    "presion",     "15 bares",
                    "capacidad",   "Depósito 1.8L + Granos 250g",
                    "garantia",    "2 años oficial De'Longhi",
                    "molinillo",   "Integrado de acero inoxidable"
                ))
                .build()

        );
    }



}
