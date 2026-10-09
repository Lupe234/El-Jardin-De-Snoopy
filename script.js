/* ==========================================
   EL JARDÍN DE SNOOPY
   CATÁLOGO, CARRITO Y PEDIDOS
========================================== */

"use strict";

/* CATÁLOGO */

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
    }
];

let carrito = [];

/* UTILIDADES */

const obtenerElemento = id => document.getElementById(id);

const formatoMoneda = cantidad =>
    "$" + cantidad.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

/* CATÁLOGO */

function mostrarProductos() {
    const contenedor = obtenerElemento("contenedor-productos");
    if (!contenedor) return;

    contenedor.replaceChildren();

    productos.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto";

        const emoji = document.createElement("div");
        emoji.className = "producto-emoji";
        emoji.setAttribute("aria-hidden", "true");
        emoji.textContent = producto.emoji;

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.className = "precio";
        precio.textContent = formatoMoneda(producto.precio);

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "boton-agregar";
        boton.textContent = "🛒 Agregar al carrito";
        boton.addEventListener("click", () => agregar(producto.id));

        tarjeta.append(emoji, nombre, descripcion, precio, boton);
        contenedor.appendChild(tarjeta);
    });
}

/* AGREGAR PRODUCTOS */

function agregar(id) {
    const producto = productos.find(item => item.id === id);
    if (!producto) return;

    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

/* ACTUALIZAR CARRITO */

function actualizarCarrito() {
    const lista = obtenerElemento("lista-carrito");
    const totalElemento = obtenerElemento("total");
    const botonComprar = obtenerElemento("boton-comprar");

    if (!lista || !totalElemento) return;

    lista.replaceChildren();

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Tu carrito está vacío.";
        lista.appendChild(mensaje);
    }

    carrito.forEach(producto => {
        const item = document.createElement("div");
        item.className = "item-carrito";

        const informacion = document.createElement("div");

        const nombre = document.createElement("strong");
        nombre.textContent = producto.nombre;

        const detalle = document.createElement("p");
        detalle.textContent =
            `${formatoMoneda(producto.precio)} × ${producto.cantidad}`;

        const controles = document.createElement("div");
        controles.className = "controles-cantidad";

        const disminuir = document.createElement("button");
        disminuir.type = "button";
        disminuir.className = "btn-cantidad";
        disminuir.textContent = "−";
        disminuir.setAttribute("aria-label", `Disminuir ${producto.nombre}`);
        disminuir.addEventListener("click", () => cambiarCantidad(producto.id, -1));

        const cantidad = document.createElement("span");
        cantidad.className = "cantidad";
        cantidad.textContent = producto.cantidad;
        cantidad.setAttribute("aria-label", "Cantidad");

        const aumentar = document.createElement("button");
        aumentar.type = "button";
        aumentar.className = "btn-cantidad";
        aumentar.textContent = "+";
        aumentar.setAttribute("aria-label", `Aumentar ${producto.nombre}`);
        aumentar.addEventListener("click", () => cambiarCantidad(producto.id, 1));

        controles.append(disminuir, cantidad, aumentar);
        informacion.append(nombre, detalle, controles);

        const acciones = document.createElement("div");

        const subtotal = document.createElement("strong");
        subtotal.textContent = formatoMoneda(producto.precio * producto.cantidad);

        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.className = "eliminar";
        eliminar.textContent = "🗑️ Eliminar";
        eliminar.addEventListener("click", () => eliminarProducto(producto.id));

        acciones.append(subtotal, document.createElement("br"), eliminar);
        item.append(informacion, acciones);
        lista.appendChild(item);
    });

    totalElemento.textContent = formatoMoneda(obtenerTotal());

    if (botonComprar) {
        botonComprar.disabled = carrito.length === 0;
    }
}

/* CANTIDADES Y ELIMINACIÓN */

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(item => item.id !== id);
    }

    actualizarCarrito();
}

function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

/* TOTAL */

function obtenerTotal() {
    return carrito.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
    );
}

/* VENTANAS EMERGENTES */

function abrirModal(id) {
    const modal = obtenerElemento(id);
    if (!modal) return;

    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const dialogo = modal.querySelector('[role="dialog"]');
    const primerCampo = dialogo?.querySelector(
        'input:not([type="hidden"]):not([disabled]), textarea, select, button'
    );

    primerCampo?.focus();
}

function cerrarModal(id) {
    const modal = obtenerElemento(id);
    if (!modal) return;

    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");

    const otroAbierto = document.querySelector('.modal.visible');
    document.body.style.overflow = otroAbierto ? "hidden" : "";

    if (id === "ventana-pago") {
        obtenerElemento("boton-comprar")?.focus();
    }

    if (id === "ventana-confirmacion") {
        obtenerElemento("boton-finalizar")?.blur();
    }
}

/* ABRIR PEDIDO */

function realizarPedido() {
    if (carrito.length === 0) {
        alert("🛒 Tu carrito está vacío.");
        return;
    }

    obtenerElemento("total-pago").textContent = formatoMoneda(obtenerTotal());
    abrirModal("ventana-pago");
}

/* CAMPOS DE PAGO */

function configurarCamposPago(contenedorId, ids, visible) {
    const contenedor = obtenerElemento(contenedorId);
    if (!contenedor) return;

    contenedor.hidden = !visible;

    ids.forEach(id => {
        const campo = obtenerElemento(id);
        if (!campo) return;

        campo.required = visible;

        if (!visible) {
            campo.setCustomValidity("");
        }
    });
}

function mostrarDatosPago() {
    const metodo = obtenerElemento("pago").value;

    configurarCamposPago(
        "datos-transferencia",
        [
            "banco-transferencia",
            "referencia-transferencia",
            "monto-transferencia"
        ],
        metodo === "Transferencia"
    );

    configurarCamposPago(
        "datos-tarjeta",
        ["titular", "numero-tarjeta", "vencimiento", "cvv"],
        metodo === "Tarjeta"
    );
}

/* FORMATEAR DATOS FICTICIOS */

obtenerElemento("numero-tarjeta").addEventListener("input", function () {
    const numero = this.value.replace(/\D/g, "").slice(0, 16);
    this.value = numero.replace(/(\d{4})(?=\d)/g, "$1 ");
});

obtenerElemento("vencimiento").addEventListener("input", function () {
    const digitos = this.value.replace(/\D/g, "").slice(0, 4);
    this.value = digitos.length > 2
        ? digitos.slice(0, 2) + "/" + digitos.slice(2)
        : digitos;
});

obtenerElemento("cvv").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 4);
});

obtenerElemento("telefono").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
});

/* VALIDAR TRANSFERENCIA DE DEMOSTRACIÓN */

function validarTransferencia() {
    const banco = obtenerElemento("banco-transferencia").value.trim();
    const referencia = obtenerElemento("referencia-transferencia").value.trim();
    const montoTexto = obtenerElemento("monto-transferencia").value;
    const monto = Number(montoTexto);
    const total = obtenerTotal();

    if (!banco || !referencia || !montoTexto ||
        !Number.isFinite(monto) || monto <= 0) {
        alert("⚠️ Completa todos los datos de la transferencia.");
        return false;
    }

    if (Math.abs(monto - total) > 0.009) {
        alert(`⚠️ El monto debe coincidir con el total: ${formatoMoneda(total)}`);
        return false;
    }

    return true;
}

/* VALIDAR TARJETA FICTICIA */

function validarTarjeta() {
    const numero = obtenerElemento("numero-tarjeta").value.replace(/\D/g, "");
    const vencimiento = obtenerElemento("vencimiento").value;
    const cvv = obtenerElemento("cvv").value;
    const titular = obtenerElemento("titular").value.trim();

    if (!titular || numero.length !== 16 ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento) ||
        !/^\d{3,4}$/.test(cvv)) {
        alert("⚠️ Revisa los datos ficticios de la tarjeta.");
        return false;
    }

    const [mes, anioCorto] = vencimiento.split("/").map(Number);
    const anio = 2000 + anioCorto;
    const ahora = new Date();
    const anioActual = ahora.getFullYear();
    const mesActual = ahora.getMonth() + 1;

    if (anio < anioActual ||
        (anio === anioActual && mes < mesActual)) {
        alert("⚠️ La fecha ficticia de vencimiento ya pasó.");
        return false;
    }

    return true;
}

/* CONFIRMAR PEDIDO */

function confirmarPedido(evento) {
    evento.preventDefault();

    if (carrito.length === 0) {
        alert("🛒 Tu carrito está vacío.");
        cerrarModal("ventana-pago");
        return;
    }

    const formulario = obtenerElemento("formulario-pedido");

    if (!formulario.reportValidity()) return;

    const nombre = obtenerElemento("nombre").value.trim();
    const telefono = obtenerElemento("telefono").value.trim();
    const direccion = obtenerElemento("direccion").value.trim();
    const pago = obtenerElemento("pago").value;

    if (!nombre || !direccion || !/^\d{10}$/.test(telefono)) {
        alert("⚠️ Revisa tu nombre, teléfono y dirección.");
        return;
    }

    if (pago === "Transferencia" && !validarTransferencia()) return;
    if (pago === "Tarjeta" && !validarTarjeta()) return;

    obtenerElemento("confirmacion-nombre").textContent = nombre;
    obtenerElemento("confirmacion-telefono").textContent = telefono;
    obtenerElemento("confirmacion-direccion").textContent = direccion;
    obtenerElemento("confirmacion-pago").textContent = pago;
    obtenerElemento("confirmacion-total").textContent = formatoMoneda(obtenerTotal());

    /* PRODUCTOS DEL PEDIDO */

    const listaProductos = obtenerElemento("confirmacion-productos");
    listaProductos.replaceChildren();

    carrito.forEach(producto => {
        const elemento = document.createElement("p");
        elemento.textContent =
            `${producto.nombre} — ${producto.cantidad} × ` +
            `${formatoMoneda(producto.precio)} = ` +
            `${formatoMoneda(producto.cantidad * producto.precio)}`;

        listaProductos.appendChild(elemento);
    });

    /* INFORMACIÓN DEL PAGO */

    const datosPago = obtenerElemento("confirmacion-datos-pago");
    datosPago.replaceChildren();

    function agregarDato(texto) {
        const parrafo = document.createElement("p");
        parrafo.textContent = texto;
        datosPago.appendChild(parrafo);
    }

    if (pago === "Transferencia") {
        agregarDato("Banco: " +
            obtenerElemento("banco-transferencia").value.trim());

        agregarDato("Referencia: " +
            obtenerElemento("referencia-transferencia").value.trim());

        agregarDato("Monto declarado: " +
            formatoMoneda(Number(obtenerElemento("monto-transferencia").value)));

        agregarDato("Simulación educativa. Transferencia no verificada.");
    } else if (pago === "Tarjeta") {
        const numero = obtenerElemento("numero-tarjeta").value.replace(/\D/g, "");

        agregarDato("Tarjeta ficticia terminada en **** " + numero.slice(-4));
        agregarDato("Pago de demostración. No se realizó ningún cargo.");
    } else if (pago === "Efectivo") {
        agregarDato("Forma de pago seleccionada: efectivo.");
    } else if (pago === "Pago al entregar") {
        agregarDato("Forma de pago seleccionada: pago al entregar.");
    }

    /* MOSTRAR CONFIRMACIÓN */

    cerrarModal("ventana-pago");
    abrirModal("ventana-confirmacion");

    /* VACIAR CARRITO Y RESTABLECER FORMULARIO */

    carrito = [];
    actualizarCarrito();

    formulario.reset();
    mostrarDatosPago();
}

/* EVENTOS */

obtenerElemento("boton-comprar").addEventListener(
    "click", realizarPedido
);

obtenerElemento("cerrar-formulario").addEventListener(
    "click", () => cerrarModal("ventana-pago")
);

obtenerElemento("cerrar-confirmacion").addEventListener(
    "click", () => cerrarModal("ventana-confirmacion")
);

obtenerElemento("boton-finalizar").addEventListener(
    "click", () => cerrarModal("ventana-confirmacion")
);

obtenerElemento("pago").addEventListener("change", mostrarDatosPago);

obtenerElemento("formulario-pedido").addEventListener(
    "submit", confirmarPedido
);

/* CERRAR AL HACER CLIC FUERA */

["ventana-pago", "ventana-confirmacion"].forEach(id => {
    const modal = obtenerElemento(id);

    modal.addEventListener("click", evento => {
        if (evento.target !== modal) return;
        cerrarModal(id);
    });
});

/* CERRAR CON ESCAPE */

document.addEventListener("keydown", evento => {
    if (evento.key !== "Escape") return;

    if (obtenerElemento("ventana-confirmacion").classList.contains("visible")) {
        cerrarModal("ventana-confirmacion");
    } else if (obtenerElemento("ventana-pago").classList.contains("visible")) {
        cerrarModal("ventana-pago");
    }
});

/* INICIAR PÁGINA */

mostrarProductos();
actualizarCarrito();
mostrarDatosPago();
