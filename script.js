/* ==========================================
   EL JARDÍN DE SNOOPY
   CATÁLOGO, CARRITO Y PEDIDOS
========================================== */

"use strict";

/* ==========================================
   1. CATÁLOGO DE 16 PRODUCTOS
========================================== */

const productos = [
    {
        id: 1,
        nombre: "Ramo de rosas rojas",
        precio: 350,
        emoji: "🌹",
        descripcion: "Hermosas rosas para expresar tu amor."
    },
    {
        id: 2,
        nombre: "Ramo de girasoles",
        precio: 280,
        emoji: "🌻",
        descripcion: "Flores llenas de alegría y luz."
    },
    {
        id: 3,
        nombre: "Ramo de tulipanes",
        precio: 400,
        emoji: "🌷",
        descripcion: "Elegancia y belleza para cualquier ocasión."
    },
    {
        id: 4,
        nombre: "Ramo de margaritas",
        precio: 250,
        emoji: "🌼",
        descripcion: "Un detalle sencillo y lleno de ternura."
    },
    {
        id: 5,
        nombre: "Ramo de lirios",
        precio: 380,
        emoji: "🤍",
        descripcion: "Flores elegantes para momentos especiales."
    },
    {
        id: 6,
        nombre: "Ramo de flores mixtas",
        precio: 450,
        emoji: "💐",
        descripcion: "Una combinación de flores para sorprender."
    },
    {
        id: 7,
        nombre: "Ramo de orquídeas",
        precio: 520,
        emoji: "🪻",
        descripcion: "Un regalo sofisticado y elegante."
    },
    {
        id: 8,
        nombre: "Ramo de claveles",
        precio: 300,
        emoji: "💐",
        descripcion: "Flores llenas de cariño y tradición."
    },
    {
        id: 9,
        nombre: "Ramo de peonías",
        precio: 580,
        emoji: "🌸",
        descripcion: "Flores delicadas para ocasiones especiales."
    },
    {
        id: 10,
        nombre: "Ramo de lavanda",
        precio: 320,
        emoji: "💜",
        descripcion: "Un detalle aromático y relajante."
    },
    {
        id: 11,
        nombre: "Ramo de flores blancas",
        precio: 420,
        emoji: "🤍",
        descripcion: "Pureza y elegancia en cada flor."
    },
    {
        id: 12,
        nombre: "Ramo de flores rosas",
        precio: 390,
        emoji: "🩷",
        descripcion: "Un detalle dulce y romántico."
    },
    {
        id: 13,
        nombre: "Caja de rosas",
        precio: 650,
        emoji: "🌹",
        descripcion: "Rosas presentadas en una caja elegante."
    },
    {
        id: 14,
        nombre: "Canasta floral",
        precio: 550,
        emoji: "🧺",
        descripcion: "Una hermosa combinación de flores."
    },
    {
        id: 15,
        nombre: "Ramo de gerberas",
        precio: 340,
        emoji: "🌺",
        descripcion: "Flores coloridas para alegrar el día."
    },
    {
        id: 16,
        nombre: "Ramo premium",
        precio: 750,
        emoji: "💐",
        descripcion: "Una selección floral para sorprender."
    }
];

/* ==========================================
   2. ESTADO DEL CARRITO
========================================== */

let carrito = [];

/* ==========================================
   3. UTILIDADES
========================================== */

const obtenerElemento = id =>
    document.getElementById(id);

const formatoMoneda = cantidad =>
    new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(cantidad);

/* REGISTRAR EVENTOS DE FORMA SEGURA */

function agregarEvento(id, evento, funcion) {
    const elemento = obtenerElemento(id);

    if (elemento) {
        elemento.addEventListener(evento, funcion);
    }
}

/* OBTENER VALORES SIN PROVOCAR ERRORES */

function obtenerValor(id) {
    const elemento = obtenerElemento(id);

    return elemento && "value" in elemento
        ? elemento.value.trim()
        : "";
}
/* ==========================================
   4. MOSTRAR PRODUCTOS EN EL CATÁLOGO
========================================== */

function mostrarProductos() {
    const contenedor = obtenerElemento("contenedor-productos");

    // Evitar errores si el contenedor no existe
    if (!contenedor) return;

    // Limpiar el catálogo antes de volver a generarlo
    contenedor.replaceChildren();

    productos.forEach(producto => {

        // Crear tarjeta del producto
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto";

        // Emoji de las flores
        const emoji = document.createElement("div");
        emoji.className = "producto-emoji";
        emoji.setAttribute("aria-hidden", "true");
        emoji.textContent = producto.emoji;

        // Nombre
        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        // Descripción
        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        // Precio
        const precio = document.createElement("p");
        precio.className = "precio";
        precio.textContent = formatoMoneda(producto.precio);

        // Botón para agregar al carrito
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "boton-agregar";
        boton.textContent = "🛒 Agregar al carrito";

        boton.addEventListener("click", () => {
            agregar(producto.id);
        });

        // Agregar los elementos a la tarjeta
        tarjeta.append(
            emoji,
            nombre,
            descripcion,
            precio,
            boton
        );

        // Agregar tarjeta al catálogo
        contenedor.appendChild(tarjeta);
    });
}

/* ==========================================
   5. AGREGAR PRODUCTOS AL CARRITO
========================================== */

function agregar(id) {

    // Buscar el producto en el catálogo
    const producto = productos.find(item => item.id === id);

    // Protección por si el producto no existe
    if (!producto) return;

    // Comprobar si ya está en el carrito
    const existente = carrito.find(item => item.id === id);

    if (existente) {

        // Aumentar la cantidad si ya existe
        existente.cantidad++;

    } else {

        // Agregarlo por primera vez
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    // Actualizar el carrito visualmente
    actualizarCarrito();
}
/* ==========================================
   6. ACTUALIZAR EL CARRITO
========================================== */

function actualizarCarrito() {
    const lista = obtenerElemento("lista-carrito");
    const totalElemento = obtenerElemento("total");
    const botonComprar = obtenerElemento("boton-comprar");

    // Evitar errores si faltan elementos HTML
    if (!lista || !totalElemento) {
        if (botonComprar) {
            botonComprar.disabled = true;
        }
        return;
    }

    // Limpiar el contenido anterior
    lista.replaceChildren();

    // Mostrar mensaje cuando el carrito está vacío
    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Tu carrito está vacío.";
        lista.appendChild(mensaje);
    }

    // Recorrer los productos del carrito
    carrito.forEach(producto => {
        const item = document.createElement("div");
        item.className = "item-carrito";

        /* INFORMACIÓN DEL PRODUCTO */

        const informacion = document.createElement("div");

        const nombre = document.createElement("strong");
        nombre.textContent = producto.nombre;

        const detalle = document.createElement("p");
        detalle.textContent =
            `${formatoMoneda(producto.precio)} × ${producto.cantidad}`;

        /* CONTROLES DE CANTIDAD */

        const controles = document.createElement("div");
        controles.className = "controles-cantidad";

        // Botón disminuir
        const disminuir = document.createElement("button");
        disminuir.type = "button";
        disminuir.className = "btn-cantidad";
        disminuir.textContent = "−";
        disminuir.setAttribute(
            "aria-label",
            `Disminuir ${producto.nombre}`
        );

        disminuir.addEventListener("click", () => {
            cambiarCantidad(producto.id, -1);
        });

        // Cantidad actual
        const cantidad = document.createElement("span");
        cantidad.className = "cantidad";
        cantidad.textContent = producto.cantidad;

        // Botón aumentar
        const aumentar = document.createElement("button");
        aumentar.type = "button";
        aumentar.className = "btn-cantidad";
        aumentar.textContent = "+";
        aumentar.setAttribute(
            "aria-label",
            `Aumentar ${producto.nombre}`
        );

        aumentar.addEventListener("click", () => {
            cambiarCantidad(producto.id, 1);
        });

        controles.append(disminuir, cantidad, aumentar);
        informacion.append(nombre, detalle, controles);

        /* SUBTOTAL Y ELIMINACIÓN */

        const acciones = document.createElement("div");

        const subtotal = document.createElement("strong");
        subtotal.textContent = formatoMoneda(
            producto.precio * producto.cantidad
        );

        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.className = "eliminar";
        eliminar.textContent = "🗑️ Eliminar";

        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });

        acciones.append(subtotal, eliminar);

        // Agregar producto al listado
        item.append(informacion, acciones);
        lista.appendChild(item);
    });

    // Actualizar el total general
    totalElemento.textContent = formatoMoneda(obtenerTotal());

    // Desactivar comprar si no hay productos
    if (botonComprar) {
        botonComprar.disabled = carrito.length === 0;
    }
}

/* ==========================================
   7. AUMENTAR Y DISMINUIR CANTIDADES
========================================== */

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    // Eliminar el producto si llega a cero
    if (producto.cantidad <= 0) {
        eliminarProducto(id);
        return;
    }

    actualizarCarrito();
}

/* ==========================================
   8. ELIMINAR PRODUCTOS DEL CARRITO
========================================== */

function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);

    actualizarCarrito();
}

/* ==========================================
   9. CALCULAR TOTAL DE LA COMPRA
========================================== */

function obtenerTotal() {
    return carrito.reduce(
        (total, producto) =>
            total + producto.precio * producto.cantidad,
        0
    );
}
/* ==========================================
   10. ABRIR VENTANAS MODALES
========================================== */

function abrirModal(id) {
    const modal = obtenerElemento(id);

    // Comprobar que el modal exista
    if (!modal) return;

    // Mostrar la ventana
    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");

    // Bloquear desplazamiento de la página
    document.body.style.overflow = "hidden";

    // Buscar el primer campo o botón disponible
    const dialogo = modal.querySelector('[role="dialog"]');

    const primerCampo = dialogo?.querySelector(
        'input:not([type="hidden"]):not([disabled]), ' +
        'textarea:not([disabled]), ' +
        'select:not([disabled]), ' +
        'button:not([disabled])'
    );

    // Colocar el foco en el primer campo
    if (primerCampo) {
        primerCampo.focus();
    }
}

/* ==========================================
   11. CERRAR VENTANAS MODALES
========================================== */

function cerrarModal(id) {
    const modal = obtenerElemento(id);

    // Comprobar que el modal exista
    if (!modal) return;

    // Ocultar la ventana
    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");

    // Comprobar si hay otra ventana abierta
    const otroAbierto = document.querySelector(".modal.visible");

    // Restaurar el desplazamiento si no hay otra abierta
    document.body.style.overflow =
        otroAbierto ? "hidden" : "";

    // Devolver el foco al botón de compra
    if (id === "ventana-pago") {
        obtenerElemento("boton-comprar")?.focus();
    }

    // Quitar el foco del botón de finalizar
    if (id === "ventana-confirmacion") {
        obtenerElemento("boton-finalizar")?.blur();
    }
}

/* ==========================================
   12. ABRIR EL FORMULARIO DE PEDIDO
========================================== */

function realizarPedido() {
    // No permitir pedidos con el carrito vacío
    if (carrito.length === 0) {
        alert("🛒 Tu carrito está vacío.");
        return;
    }

    // Mostrar el total dentro del formulario
    const totalPago = obtenerElemento("total-pago");

    if (totalPago) {
        totalPago.textContent = formatoMoneda(obtenerTotal());
    }

    // Abrir la ventana del formulario
    abrirModal("ventana-pago");
}

/* ==========================================
   13. CERRAR AL HACER CLIC FUERA
========================================== */

function configurarCierreExterior(id) {
    const modal = obtenerElemento(id);

    // Evitar errores si no existe
    if (!modal) return;

    modal.addEventListener("click", evento => {
        // Cerrar solamente si se pulsa el fondo
        if (evento.target === modal) {
            cerrarModal(id);
        }
    });
}

/* ==========================================
   14. CERRAR CON LA TECLA ESCAPE
========================================== */

function configurarEscape() {
    document.addEventListener("keydown", evento => {
        if (evento.key !== "Escape") return;

        const confirmacion =
            obtenerElemento("ventana-confirmacion");

        const pago =
            obtenerElemento("ventana-pago");

        // Cerrar primero la confirmación si está abierta
        if (confirmacion?.classList.contains("visible")) {
            cerrarModal("ventana-confirmacion");
        } else if (pago?.classList.contains("visible")) {
            cerrarModal("ventana-pago");
        }
    });
}
/* ==========================================
   15. CONFIGURAR CAMPOS DE PAGO
========================================== */

function configurarCamposPago(contenedorId, ids, visible) {
    const contenedor = obtenerElemento(contenedorId);

    // Mostrar u ocultar el grupo de campos
    if (contenedor) {
        contenedor.hidden = !visible;
    }

    // Configurar los campos obligatorios
    ids.forEach(id => {
        const campo = obtenerElemento(id);

        if (!campo) return;

        campo.required = visible;

        // Limpiar errores de validación al ocultar
        if (!visible) {
            campo.setCustomValidity("");
        }
    });
}

/* ==========================================
   16. MOSTRAR DATOS SEGÚN EL MÉTODO DE PAGO
========================================== */

function mostrarDatosPago() {
    const campoPago = obtenerElemento("pago");

    if (!campoPago) return;

    const metodo = campoPago.value;

    // Campos para transferencia
    configurarCamposPago(
        "datos-transferencia",
        [
            "banco-transferencia",
            "referencia-transferencia",
            "monto-transferencia"
        ],
        metodo === "Transferencia"
    );

    // Campos para tarjeta ficticia
    configurarCamposPago(
        "datos-tarjeta",
        [
            "titular",
            "numero-tarjeta",
            "vencimiento",
            "cvv"
        ],
        metodo === "Tarjeta"
    );
}

/* ==========================================
   17. FORMATEAR EL NÚMERO DE TARJETA
========================================== */

agregarEvento("numero-tarjeta", "input", function () {
    const numero = this.value
        .replace(/\D/g, "")
        .slice(0, 16);

    this.value = numero.replace(/(\d{4})(?=\d)/g, "$1 ");
});

/* ==========================================
   18. FORMATEAR FECHA DE VENCIMIENTO
========================================== */

agregarEvento("vencimiento", "input", function () {
    const digitos = this.value
        .replace(/\D/g, "")
        .slice(0, 4);

    this.value = digitos.length > 2
        ? digitos.slice(0, 2) + "/" + digitos.slice(2)
        : digitos;
});

/* ==========================================
   19. FORMATEAR CVV
========================================== */

agregarEvento("cvv", "input", function () {
    this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 4);
});

/* ==========================================
   20. FORMATEAR TELÉFONO
========================================== */

agregarEvento("telefono", "input", function () {
    this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 10);
});
}/* ==========================================
   21. VALIDAR DATOS DEL CLIENTE
========================================== */

function validarCamposPrincipales() {
    const nombre = obtenerValor("nombre");
    const telefono = obtenerValor("telefono");
    const direccion = obtenerValor("direccion");
    const pago = obtenerValor("pago");

    if (!nombre) {
        alert("⚠️ Escribe tu nombre completo.");
        return false;
    }

    if (!/^\d{10}$/.test(telefono)) {
        alert("⚠️ El teléfono debe contener exactamente 10 dígitos.");
        return false;
    }

    if (!direccion) {
        alert("⚠️ Escribe la dirección de entrega.");
        return false;
    }

    if (!pago) {
        alert("⚠️ Selecciona un método de pago.");
        return false;
    }

    return true;
}

/* ==========================================
   22. VALIDAR TRANSFERENCIA DE DEMOSTRACIÓN
========================================== */

function validarTransferencia() {
    const banco = obtenerValor("banco-transferencia");
    const referencia = obtenerValor("referencia-transferencia");
    const montoTexto = obtenerValor("monto-transferencia");
    const monto = Number(montoTexto);
    const total = obtenerTotal();

    // Comprobar que los datos estén completos
    if (
        !banco ||
        !referencia ||
        !montoTexto ||
        !Number.isFinite(monto) ||
        monto <= 0
    ) {
        alert("⚠️ Completa todos los datos de la transferencia.");
        return false;
    }

    // Comparar el monto con el total del carrito
    if (Math.abs(monto - total) > 0.009) {
        alert(
            "⚠️ El monto debe coincidir con el total: " +
            formatoMoneda(total)
        );
        return false;
    }

    // La transferencia no se verifica realmente
    return true;
}

/* ==========================================
   23. VALIDAR TARJETA FICTICIA
========================================== */

function validarTarjeta() {
    const numero = obtenerValor("numero-tarjeta")
        .replace(/\D/g, "");

    const vencimiento = obtenerValor("vencimiento");
    const cvv = obtenerValor("cvv");
    const titular = obtenerValor("titular");

    // Verificar los formatos de los datos
    if (
        !titular ||
        numero.length !== 16 ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento) ||
        !/^\d{3,4}$/.test(cvv)
    ) {
        alert(
            "⚠️ Revisa los datos ficticios de la tarjeta."
        );
        return false;
    }

    // Comprobar que la fecha no haya vencido
    const [mes, anioCorto] = vencimiento
        .split("/")
        .map(Number);

    const anio = 2000 + anioCorto;
    const ahora = new Date();

    const anioActual = ahora.getFullYear();
    const mesActual = ahora.getMonth() + 1;

    if (
        anio < anioActual ||
        (anio === anioActual && mes < mesActual)
    ) {
        alert(
            "⚠️ La fecha ficticia de vencimiento ya pasó."
        );
        return false;
    }

    return true;
}

/* ==========================================
   24. VALIDAR FORMULARIO COMPLETO
========================================== */

function validarFormularioPedido() {
    const formulario = obtenerElemento("formulario-pedido");

    // Comprobar que exista el formulario
    if (!formulario) {
        alert("⚠️ No se encontró el formulario del pedido.");
        return false;
    }

    // Validar los campos HTML obligatorios
    if (!formulario.reportValidity()) {
        return false;
    }

    // Validar los datos del cliente
    if (!validarCamposPrincipales()) {
        return false;
    }

    const pago = obtenerValor("pago");

    // Validar transferencia si fue seleccionada
    if (pago === "Transferencia") {
        if (!validarTransferencia()) {
            return false;
        }
    }

    // Validar tarjeta si fue seleccionada
    if (pago === "Tarjeta") {
        if (!validarTarjeta()) {
            return false;
        }
    }

    return true;
}
/* ==========================================
   25. MOSTRAR LA CONFIRMACIÓN DEL PEDIDO
========================================== */

function mostrarConfirmacion(nombre, telefono, direccion, pago) {

    // Mostrar los datos del cliente y el total
    const asignaciones = [
        ["confirmacion-nombre", nombre],
        ["confirmacion-telefono", telefono],
        ["confirmacion-direccion", direccion],
        ["confirmacion-pago", pago],
        ["confirmacion-total", formatoMoneda(obtenerTotal())]
    ];

    asignaciones.forEach(([id, valor]) => {
        const elemento = obtenerElemento(id);

        // Comprobar que el elemento exista
        if (elemento) {
            elemento.textContent = valor;
        }
    });

    /* ======================================
       MOSTRAR LOS PRODUCTOS DEL PEDIDO
    ====================================== */

    const listaProductos =
        obtenerElemento("confirmacion-productos");

    if (listaProductos) {
        listaProductos.replaceChildren();

        carrito.forEach(producto => {
            const elemento = document.createElement("p");

            const subtotal =
                producto.precio * producto.cantidad;

            elemento.textContent =
                `${producto.nombre} — ${producto.cantidad} × ` +
                `${formatoMoneda(producto.precio)} = ` +
                `${formatoMoneda(subtotal)}`;

            listaProductos.appendChild(elemento);
        });
    }

    /* ======================================
       MOSTRAR INFORMACIÓN DEL PAGO
    ====================================== */

    const datosPago =
        obtenerElemento("confirmacion-datos-pago");

    if (!datosPago) return;

    datosPago.replaceChildren();

    function agregarDato(texto) {
        const parrafo = document.createElement("p");
        parrafo.textContent = texto;
        datosPago.appendChild(parrafo);
    }

    // Transferencia de demostración
    if (pago === "Transferencia") {
        agregarDato(
            "Banco: " + obtenerValor("banco-transferencia")
        );

        agregarDato(
            "Referencia: " + obtenerValor("referencia-transferencia")
        );

        agregarDato(
            "Monto declarado: " +
            formatoMoneda(
                Number(obtenerValor("monto-transferencia"))
            )
        );

        agregarDato(
            "Demostración: transferencia no verificada."
        );
    }

    // Tarjeta ficticia
    else if (pago === "Tarjeta") {
        const numero = obtenerValor("numero-tarjeta")
            .replace(/\D/g, "");

        agregarDato(
            "Tarjeta ficticia terminada en **** " +
            numero.slice(-4)
        );

        agregarDato(
            "No se realizó ningún cargo."
        );
    }

    // Efectivo
    else if (pago === "Efectivo") {
        agregarDato("Forma de pago seleccionada: efectivo.");
    }

    // Pago al entregar
    else if (pago === "Pago al entregar") {
        agregarDato(
            "Forma de pago seleccionada: pago al entregar."
        );
    }
}

/* ==========================================
   26. CONFIRMAR EL PEDIDO
========================================== */

function confirmarPedido(evento) {

    // Evitar que la página se recargue
    if (evento) {
        evento.preventDefault();
    }

    // Comprobar que el carrito tenga productos
    if (carrito.length === 0) {
        alert("🛒 Tu carrito está vacío.");
        cerrarModal("ventana-pago");
        return;
    }

    // Validar todos los campos y el método de pago
    if (!validarFormularioPedido()) {
        return;
    }

    // Obtener los datos del cliente
    const nombre = obtenerValor("nombre");
    const telefono = obtenerValor("telefono");
    const direccion = obtenerValor("direccion");
    const pago = obtenerValor("pago");

    // Crear el resumen del pedido
    mostrarConfirmacion(
        nombre,
        telefono,
        direccion,
        pago
    );

    // Cerrar formulario y mostrar confirmación
    cerrarModal("ventana-pago");
    abrirModal("ventana-confirmacion");

    // Vaciar el carrito después de confirmar
    carrito = [];
    actualizarCarrito();

    // Limpiar el formulario
    const formulario =
        obtenerElemento("formulario-pedido");

    if (formulario) {
        formulario.reset();
    }

    // Restablecer los campos de pago
    mostrarDatosPago();
}
/* ==========================================
   27. REGISTRAR EVENTOS DE LOS BOTONES
========================================== */

function iniciarEventos() {

    // Abrir el formulario de pedido
    agregarEvento(
        "boton-comprar",
        "click",
        realizarPedido
    );

    // Cerrar el formulario
    agregarEvento(
        "cerrar-formulario",
        "click",
        () => cerrarModal("ventana-pago")
    );

    // Cerrar la ventana de confirmación
    agregarEvento(
        "cerrar-confirmacion",
        "click",
        () => cerrarModal("ventana-confirmacion")
    );

    // Finalizar y cerrar la confirmación
    agregarEvento(
        "boton-finalizar",
        "click",
        () => cerrarModal("ventana-confirmacion")
    );

    // Actualizar los campos al cambiar el método de pago
    agregarEvento(
        "pago",
        "change",
        mostrarDatosPago
    );

    // Procesar el formulario
    agregarEvento(
        "formulario-pedido",
        "submit",
        confirmarPedido
    );

    // Cerrar las ventanas al pulsar fuera de su contenido
    configurarCierreExterior("ventana-pago");
    configurarCierreExterior("ventana-confirmacion");

    // Configurar el cierre con la tecla Escape
    configurarEscape();
}

/* ==========================================
   28. INICIAR LA TIENDA
========================================== */

function iniciarPagina() {

    // Mostrar los 16 productos
    mostrarProductos();

    // Mostrar el estado inicial del carrito
    actualizarCarrito();

    // Configurar los campos del método de pago
    mostrarDatosPago();

    // Activar botones y eventos
    iniciarEventos();

    console.log("🌸 El Jardín de Snoopy está listo.");
}

/* ==========================================
   29. EJECUTAR CUANDO CARGUE EL HTML
========================================== */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarPagina,
        { once: true }
    );

} else {

    iniciarPagina();

}
