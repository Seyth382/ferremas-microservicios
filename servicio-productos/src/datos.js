// servicio-productos/src/datos.js

module.exports = {
    categorias: [
      { id: 1, nombre: "Herramientas Manuales" },
      { id: 2, nombre: "Herramientas Eléctricas" },
      { id: 3, nombre: "Materiales Básicos" },
      { id: 4, nombre: "Equipos de Seguridad" },
      { id: 5, nombre: "Tornillos y Anclajes" },
      { id: 6, nombre: "Fijaciones y Adhesivos" },
      { id: 7, nombre: "Equipos de Medición" }
     
    ],
    productos: [
      {
        codigoProducto: "FER-0001",
        categoriaId: 1,
        marca: "Bosch",
        codigo: "BOS-12345",
        nombre: "Taladro Percutor",
        stock: 12,
        precio: [
          { fecha: "2025-05-01T00:00:00.000Z", valor: 89090.99 }
        ]
      },
      {
        codigoProducto: "FER-0002",
        categoriaId: 1,
        marca: "Ingco",
        codigo: "ING-121314",
        nombre: "Martillo de 3 Golpes",
        stock: 30,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 6900.00 }
        ]
      },
      {
        codigoProducto: "FER-0003",
        categoriaId: 1,
        marca: "Lernen",
        codigo: "LER-56472",
        nombre: "Destornillador",
        stock: 33,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 7490.00 }
        ]
      },
      {
        codigoProducto: "FER-0004",
        categoriaId: 1,
        marca: "Lernen",
        codigo: "LER-56472",
        nombre: "Destornillador",
        stock: 33,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 7490.00 }
        ]
      },
      {
        codigoProducto: "FER-0005",
        categoriaId: 1,
        marca: "TOTAL TOOLS",
        codigo: "TT-564532",
        nombre: "Llave inglesa",
        stock: 23,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 12500.00 }
        ]
      },
      {
        codigoProducto: "FER-0006",
        categoriaId: 2,
        marca: "DEWALT",
        codigo: "D-895532",
        nombre: "Sierra Electrica",
        stock: 12,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 320000.00 }
        ]
      },
      {
        codigoProducto: "FER-0007",
        categoriaId: 2,
        marca: "BAUKER",
        codigo: "BA-778645",
        nombre: "Lijadora",
        stock: 12,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 26990.00 }
        ]
      },
      {
        codigoProducto: "FER-0007",
        categoriaId: 1,
        marca: "BAUKER",
        codigo: "BA-778645",
        nombre: "Lijadora",
        stock: 12,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 26990.00 }
        ]
      },
      {
        codigoProducto: "FER-0008",
        categoriaId: 3,
        marca: "CementoMax",
        codigo: "CEM-67890",
        nombre: "Saco de Cemento 50kg",
        stock: 50,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 4500.00 }
        ]
      },
      {
        codigoProducto: "FER-0009",
        categoriaId: 3,
        marca: "GENERICO",
        codigo: "GEN-15543",
        nombre: "Arena Fina 25kg",
        stock: 40,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 940.00 }
        ]
      },
      {
        codigoProducto: "FER-0010",
        categoriaId: 3,
        marca: "GENERICO",
        codigo: "GEN-75649",
        nombre: "Ladrillo Estructural",
        stock: 400,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 460.00 }
        ]
      },
      {
        codigoProducto: "FER-0011",
        categoriaId: 3,
        marca: "SIPA",
        codigo: "SI-60989",
        nombre: "Pintura Latex",
        stock: 100,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 77102.00 }
        ]
      },
      {
        codigoProducto: "FER-0012",
        categoriaId: 3,
        marca: "CERESITA",
        codigo: "CE-46573",
        nombre: "Barniz",
        stock: 292,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 25000.00 }
        ]
      },
      {
        codigoProducto: "FER-0013",
        categoriaId: 3,
        marca: "INCEFRA",
        codigo: "IN-43324",
        nombre: "Barniz",
        stock: 192,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 7490.00 }
        ]
      },
      {
        codigoProducto: "FER-0014",
        categoriaId: 4,
        marca: "MSA",
        codigo: "MSA-11111",
        nombre: "Casco de seguridad",
        stock: 300,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 11990.00 }
        ]
      },
      {
        codigoProducto: "FER-0015",
        categoriaId: 4,
        marca: "UBERMANN",
        codigo: "UB-43562",
        nombre: "Guantes de seguridad",
        stock: 288,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 9090.00 }
        ]
      },
      {
        codigoProducto: "FER-0016",
        categoriaId: 4,
        marca: "REDLINE",
        codigo: "RED-98768",
        nombre: "Lentes de seguridad",
        stock: 157,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 2790.00 }
        ]
      },
      {
        codigoProducto: "FER-0017",
        categoriaId: 5,
        marca: "FIXSER",
        codigo: "FI-22343",
        nombre: "Tornillo perforante",
        stock: 5000,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 26990.00 }
        ]
      },
      {
        codigoProducto: "FER-0018",
        categoriaId: 6,
        marca: "TOPEX",
        codigo: "TX-36785",
        nombre: "Adhesivo 1kg",
        stock: 500,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 3990.00 }
        ]
      },
      {
        codigoProducto: "FER-0019",
        categoriaId: 7,
        marca: "MILWAUKEE",
        codigo: "MI-65485",
        nombre: "Huincha métrica",
        stock: 220,
        precio: [
          { fecha: "2025-05-10T00:00:00.000Z", valor: 12500.00 }
        ]
      },
      // …
    ]
  };
  

  