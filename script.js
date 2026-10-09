/* ==========================================
   EL JARDÍN DE SNOOPY
   CATÁLOGO, CARRITO Y PEDIDOS
========================================== */


/* ==========================================
   CATÁLOGO DE PRODUCTOS
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
    }
];


/* ==========================================
   VARIABLES
========================================== */

let carrito = [];


/* ==========================================
   MOSTRAR CATÁLOGO
========================================== */

function mostrarProductos() {
    const contenedor = document.getElementById(
        "contenedor-productos"
    );

    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto";

        const emoji = document.createElement("div");
        emoji.className = "producto-emoji";
        emoji.textContent = producto.emoji;

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.className = "precio";
        precio.textContent = `$${producto.precio.toFixed(2)}`;

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "boton-agregar";
        boton.textContent = "🛒 Agregar al carrito";

        boton.addEventListener("click", () => {
            agregar(producto.id);
        });

        tarjeta.append(
            emoji,
            nombre,
            descripcion,
            precio,
            boton
        );

        contenedor.appendChild(tarjeta);
    });
}


/* ==========================================
   AGREGAR PRODUCTO AL CARRITO
========================================== */

function agregar(id) {
    const producto = productos.find(
        item => item.id === id
    );

    if (!producto) return;

    const existente = carrito.find(
        item => item.id === id
    );

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


/* ==========================================
   ACTUALIZAR CARRITO
========================================== */

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

    if (!lista || !totalElemento) return;

    lista.innerHTML = "";

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Tu carrito está vacío.";
        lista.appendChild(mensaje);

        totalElemento.textContent = "$0.00";
        return;
    }

    carrito.forEach((producto, indice) => {
        const item = document.createElement("div");
        item.className = "item-carrito";

        const informacion = document.createElement("div");

        const nombre = document.createElement("strong");
        nombre.textContent = producto.nombre;

        const detalle = document.createElement("p");
        detalle.textContent =
            `$${producto.precio.toFixed(2)} × ${producto.cantidad}`;

        const controles = document.createElement("div");
        controles.className = "controles-cantidad";

        const disminuir = document.createElement("button");
        disminuir.type = "button";
        disminuir.className = "btn-cantidad";
        disminuir.textContent = "−";
        disminuir.setAttribute("aria-label", "Disminuir cantidad");
        disminuir.addEventListener("click", () => {
            disminuirCantidad(indice);
        });

        const cantidad = document.createElement("span");
        cantidad.className = "cantidad";
        cantidad.textContent = producto.cantidad;

        const aumentar = document.createElement("button");
        aumentar.type = "button";
        aumentar.className = "btn-cantidad";
        aumentar.textContent = "+";
        aumentar.setAttribute("aria-label", "Aumentar cantidad");
        aumentar.addEventListener("click", () => {
            aumentarCantidad(indice);
        });

        controles.append(disminuir, cantidad, aumentar);
        informacion.append(nombre, detalle, controles);

        const acciones = document.createElement("div");

        const subtotal = document.createElement("strong");
        subtotal.textContent =
            `$${(producto.precio * producto.cantidad).toFixed(2)}`;

        const salto = document.createElement("br");

        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.className = "eliminar";
        eliminar.textContent = "🗑️ Eliminar";
        eliminar.addEventListener("click", () => {
            eliminarProducto(indice);
        });

        acciones.append(subtotal, salto, eliminar);
        item.append(informacion, acciones);
        lista.appendChild(item);
    });

    totalElemento.textContent = `$${obtenerTotal().toFixed(2)}`;
}


/* ==========================================
   AUMENTAR CANTIDAD
========================================== */

function aumentarCantidad(indice) {
    if (!carrito[indice]) return;

    carrito[indice].cantidad++;
    actualizarCarrito();
}


/* ==========================================
   DISMINUIR CANTIDAD
========================================== */

function disminuirCantidad(indice) {
    if (!carrito[indice]) return;

    carrito[indice].cantidad--;

    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }

    actualizarCarrito();
}


/* ==========================================
   ELIMINAR PRODUCTO
========================================== */

function eliminarProducto(indice) {
    if (!carrito[indice]) return;

    carrito.splice(indice, 1);
    actualizarCarrito();
}


/* ==========================================
   CALCULAR TOTAL
========================================== */

function obtenerTotal() {
    return carrito.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
    }, 0);
}


/* ==========================================
   ABRIR FORMULARIO DEL PEDIDO
========================================== */

function realizarPedido() {
    if (carrito.length === 0) {
        alert("🛒 Tu carrito está vacío.");
        return;
    }

    const ventana = document.getElementById("ventana-pago");
    const totalPago = document.getElementById("total-pago");

    if (!ventana || !totalPago) return;

    totalPago.textContent = `$${obtenerTotal().toFixed(2)}`;
    ventana.style.display = "flex";
    ventana.setAttribute("aria-hidden", "false");
}


/* ==========================================
   CERRAR FORMULARIO DEL PEDIDO
========================================== */

function cerrarFormulario() {
    const ventana = document.getElementById("ventana-pago");

    if (!ventana) return;

    ventana.style.display = "none";
    ventana.setAttribute("aria-hidden", "true");
}


/* ==========================================
   MOSTRAR MÉTODO DE PAGO
========================================== */

function mostrarDatosPago() {
    const metodo = document.getElementById("pago").value;
    const transferencia = document.getElementById("datos-transferencia");
    const tarjeta = document.getElementById("datos-tarjeta");

    transferencia.style.display = "none";
    tarjeta.style.display = "none";

    quitarRequiredTransferencia();
    quitarRequiredTarjeta();

    if (metodo === "Transferencia") {
        transferencia.style.display = "block";

        document.getElementById("banco-transferencia").required = true;
        document.getElementById("referencia-transferencia").required = true;
        document.getElementById("monto-transferencia").required = true;
    }

    if (metodo === "Tarjeta") {
        tarjeta.style.display = "block";

        document.getElementById("titular").required = true;
        document.getElementById("numero-tarjeta").required = true;
        document.getElementById("vencimiento").required = true;
        document.getElementById("cvv").required = true;
    }
}


/* ==========================================
   QUITAR VALIDACIÓN DE TRANSFERENCIA
========================================== */

function quitarRequiredTransferencia() {
    [
        "banco-transferencia",
        "referencia-transferencia",
        "monto-transferencia"
    ].forEach(id => {
        document.getElementById(id).required = false;
    });
}


/* ==========================================
   QUITAR VALIDACIÓN DE TARJETA
========================================== */

function quitarRequiredTarjeta() {
    [
        "titular",
        "numero-tarjeta",
        "vencimiento",
        "cvv"
    ].forEach(id => {
        document.getElementById(id).required = false;
    });
}


/* ==========================================
   FORMATO DE TARJETA
========================================== */

document.getElementById("numero-tarjeta").addEventListener(
    "input",
    function () {
        let numero = this.value.replace(/\D/g, "").slice(0, 16);

        this.value = numero.replace(/(.{4})/g, "$1 ").trim();
    }
);


/* ==========================================
   FORMATO DE VENCIMIENTO
========================================== */

document.getElementById("vencimiento").addEventListener(
    "input",
    function () {
        let fecha = this.value.replace(/\D/g, "").slice(0, 4);

        if (fecha.length > 2) {
            fecha = fecha.slice(0, 2) + "/" + fecha.slice(2);
        }

        this.value = fecha;
    }
);


/* ==========================================
   SOLO NÚMEROS EN CVV Y TELÉFONO
========================================== */

document.getElementById("cvv").addEventListener(
    "input",
    function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 4);
    }
);

document.getElementById("telefono").addEventListener(
    "input",
    function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
    }
);


/* ==========================================
   VALIDAR TRANSFERENCIA
========================================== */

function validarTransferencia() {
    const banco = document.getElementById("banco-transferencia").value.trim();
    const referencia = document.getElementById("referencia-transferencia").value.trim();
    const monto = Number(document.getElementById("monto-transferencia").value);
    const total = obtenerTotal();

    if (!banco || !referencia || !Number.isFinite(monto) || monto <= 0) {
        alert("⚠️ Completa todos los datos de la transferencia.");
        return false;
    }

    if (Math.abs(monto - total) > 0.009) {
        alert(
            `⚠️ El monto debe coincidir con el total del pedido: $${total.toFixed(2)}`
        );
        return false;
    }

    return true;
}


/* ==========================================
   CONFIRMAR PEDIDO
========================================== */

function confirmarPedido(evento) {
    evento.preventDefault();

    if (carrito.length === 0) {
        alert("🛒 Tu carrito está vacío.");
        cerrarFormulario();
        return;
    }

    const formulario = document.getElementById("formulario-pedido");

    if (!formulario.reportValidity()) return;

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const pago = document.getElementById("pago").value;

    if (!nombre || !direccion || !/^\d{10}$/.test(telefono)) {
        alert("⚠️ Revisa tu nombre, teléfono y dirección.");
        return;
    }

    if (pago === "Transferencia" && !validarTransferencia()) {
        return;
    }

    if (pago === "Tarjeta") {
        const numero = document.getElementById("numero-tarjeta").value.replace(/\D/g, "");
        const vencimiento = document.getElementById("vencimiento").value;
        const cvv = document.getElementById("cvv").value;

        if (
            numero.length !== 16 ||
            !/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento) ||
            !/^\d{3,4}$/.test(cvv)
        ) {
            alert("⚠️ Revisa los datos ficticios de la tarjeta.");
            return;
        }
    }

    document.getElementById("confirmacion-nombre").textContent = nombre;
    document.getElementById("confirmacion-telefono").textContent = telefono;
    document.getElementById("confirmacion-direccion").textContent = direccion;
    document.getElementById("confirmacion-pago").textContent = pago;
    document.getElementById("confirmacion-total").textContent =
        `$${obtenerTotal().toFixed(2)}`;

    /* MOSTRAR PRODUCTOS */

    const listaProductos = document.getElementById("confirmacion-productos");
    listaProductos.replaceChildren();

    carrito.forEach(producto => {
        const elemento = document.createElement("p");

        elemento.textContent =
            `${producto.nombre} — ${producto.cantidad} × ` +
            `$${producto.precio.toFixed(2)} = ` +
            `$${(producto.cantidad * producto.precio).toFixed(2)}`;

        listaProductos.appendChild(elemento);
    });

    /* MOSTRAR INFORMACIÓN DEL PAGO */

    const datosPago = document.getElementById("confirmacion-datos-pago");
    datosPago.replaceChildren();

    const agregarDato = texto => {
        const parrafo = document.createElement("p");
        parrafo.textContent = texto;
        datosPago.appendChild(parrafo);
    };

    if (pago === "Transferencia") {
        agregarDato("Banco: " + document.getElementById("banco-transferencia").value.trim());
        agregarDato("Referencia: " + document.getElementById("referencia-transferencia").value.trim());
        agregarDato("Monto declarado: $" + Number(
            document.getElementById("monto-transferencia").value
        ).toFixed(2));
        agregarDato("Simulación educativa. Transferencia no verificada.");
    } else if (pago === "Tarjeta") {
        const numero = document.getElementById("numero-tarjeta").value.replace(/\D/g, "");
        agregarDato("Tarjeta ficticia terminada en **** " + numero.slice(-4));
        agregarDato("Pago de demostración. No se realizó ningún cargo.");
    } else if (pago === "Efectivo") {
        agregarDato("Forma de pago seleccionada: efectivo.");
    } else if (pago === "Pago al entregar") {
        agregarDato("Forma de pago seleccionada: pago al entregar.");
    }

    /* MOSTRAR CONFIRMACIÓN */

    const confirmacion = document.getElementById("ventana-confirmacion");
    confirmacion.style.display = "flex";
    confirmacion.setAttribute("aria-hidden", "false");

    cerrarFormulario();

    /* VACIAR CARRITO */

    carrito = [];
    actualizarCarrito();

    /* LIMPIAR FORMULARIO */

    formulario.reset();

    document.getElementById("datos-transferencia").style.display = "none";
    document.getElementById("datos-tarjeta").style.display = "none";

    quitarRequiredTransferencia();
    quitarRequiredTarjeta();
}


/* ==========================================
   CERRAR CONFIRMACIÓN
========================================== */

function cerrarConfirmacion() {
    const ventana = document.getElementById("ventana-confirmacion");

    ventana.style.display = "none";
    ventana.setAttribute("aria-hidden", "true");
}


/* ==========================================
   EVENTOS DE LOS BOTONES
========================================== */

document.getElementById("boton-comprar").addEventListener(
    "click",
    realizarPedido
);

document.getElementById("cerrar-formulario").addEventListener(
    "click",
    cerrarFormulario
);

document.getElementById("cerrar-confirmacion").addEventListener(
    "click",
    cerrarConfirmacion
);

document.getElementById("boton-finalizar").addEventListener(
    "click",
    cerrarConfirmacion
);

document.getElementById("pago").addEventListener(
    "change",
    mostrarDatosPago
);

document.getElementById("formulario-pedido").addEventListener(
    "submit",
    confirmarPedido
);


/* ==========================================
   CERRAR MODALES AL HACER CLIC AFUERA
========================================== */

document.getElementById("ventana-pago").addEventListener(
    "click",
    function (evento) {
        if (evento.target === this) {
            cerrarFormulario();
        }
    }
);

document.getElementById("ventana-confirmacion").addEventListener(
    "click",
    function (evento) {
        if (evento.target === this) {
            cerrarConfirmacion();
        }
    }
);


/* ==========================================
   INICIAR PÁGINA
========================================== */

mostrarProductos();
actualizarCarrito();
