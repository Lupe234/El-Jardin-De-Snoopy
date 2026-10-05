/* ==========================================
   CARRITO
========================================== */

let carrito = [];


/* ==========================================
   AGREGAR PRODUCTO
========================================== */

function agregar(nombre, precio) {

    const productoExistente =
        carrito.find(
            producto =>
                producto.nombre === nombre
        );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            nombre: nombre,

            precio: precio,

            cantidad: 1

        });

    }


    actualizarCarrito();
}


/* ==========================================
   ACTUALIZAR CARRITO
========================================== */

function actualizarCarrito() {

    const lista =
        document.getElementById(
            "lista-carrito"
        );


    const totalElemento =
        document.getElementById(
            "total"
        );


    if (carrito.length === 0) {

        lista.innerHTML = `
            <p>Tu carrito está vacío.</p>
        `;

        totalElemento.textContent = "0";

        return;
    }


    lista.innerHTML = "";

    let total = 0;


    carrito.forEach(
        (producto, indice) => {

            const subtotal =
                producto.precio *
                producto.cantidad;


            total += subtotal;


            const item =
                document.createElement("div");


            item.className =
                "item-carrito";


            item.innerHTML = `

                <div>

                    <strong>
                        ${producto.nombre}
                    </strong>

                    <p>
                        $${producto.precio}
                        ×
                        ${producto.cantidad}
                    </p>


                    <div
                        class="controles-cantidad">

                        <button
                            type="button"
                            class="btn-cantidad"
                            onclick="disminuirCantidad(${indice})">

                            −

                        </button>


                        <span class="cantidad">
                            ${producto.cantidad}
                        </span>


                        <button
                            type="button"
                            class="btn-cantidad"
                            onclick="aumentarCantidad(${indice})">

                            +

                        </button>

                    </div>

                </div>


                <div>

                    <strong>
                        $${subtotal}
                    </strong>

                    <br>


                    <button
                        type="button"
                        class="eliminar"
                        onclick="eliminarProducto(${indice})">

                        🗑️ Eliminar

                    </button>

                </div>

            `;


            lista.appendChild(item);

        }
    );


    totalElemento.textContent =
        total;
}


/* ==========================================
   AUMENTAR CANTIDAD
========================================== */

function aumentarCantidad(indice) {

    if (
        carrito[indice]
    ) {

        carrito[indice].cantidad++;

        actualizarCarrito();
    }
}


/* ==========================================
   DISMINUIR CANTIDAD
========================================== */

function disminuirCantidad(indice) {

    if (
        !carrito[indice]
    ) {

        return;
    }


    carrito[indice].cantidad--;


    if (
        carrito[indice].cantidad <= 0
    ) {

        carrito.splice(indice, 1);
    }


    actualizarCarrito();
}


/* ==========================================
   ELIMINAR PRODUCTO
========================================== */

function eliminarProducto(indice) {

    if (
        !carrito[indice]
    ) {

        return;
    }


    carrito.splice(indice, 1);


    actualizarCarrito();
}


/* ==========================================
   OBTENER TOTAL
========================================== */

function obtenerTotal() {

    return carrito.reduce(
        (
            total,
            producto
        ) => {

            return total +
                (
                    producto.precio *
                    producto.cantidad
                );

        },
        0
    );
}


/* ==========================================
   REALIZAR PEDIDO
========================================== */

function realizarPedido() {

    if (
        carrito.length === 0
    ) {

        alert(
            "🛒 Tu carrito está vacío."
        );

        return;
    }


    const ventana =
        document.getElementById(
            "ventana-pago"
        );


    const total =
        obtenerTotal();


    document.getElementById(
        "total-pago"
    ).textContent = total;


    ventana.style.display =
        "flex";
}


/* ==========================================
   CERRAR FORMULARIO
========================================== */

function cerrarFormulario() {

    document.getElementById(
        "ventana-pago"
    ).style.display =
        "none";
}


/* ==========================================
   MOSTRAR DATOS DE PAGO
========================================== */

function mostrarDatosPago() {

    const metodo =
        document.getElementById(
            "pago"
        ).value;


    const transferencia =
        document.getElementById(
            "datos-transferencia"
        );


    const tarjeta =
        document.getElementById(
            "datos-tarjeta"
        );


    // Ocultar ambos

    transferencia.style.display =
        "none";

    tarjeta.style.display =
        "none";


    quitarRequiredTransferencia();

    quitarRequiredTarjeta();


    /* TRANSFERENCIA */

    if (
        metodo === "Transferencia"
    ) {

        transferencia.style.display =
            "block";


        document.getElementById(
            "banco-transferencia"
        ).required = true;


        document.getElementById(
            "referencia-transferencia"
        ).required = true;


        document.getElementById(
            "monto-transferencia"
        ).required = true;
    }


    /* TARJETA */

    if (
        metodo === "Tarjeta"
    ) {

        tarjeta.style.display =
            "block";


        document.getElementById(
            "titular"
        ).required = true;


        document.getElementById(
            "numero-tarjeta"
        ).required = true;


        document.getElementById(
            "vencimiento"
        ).required = true;


        document.getElementById(
            "cvv"
        ).required = true;
    }
}


/* ==========================================
   QUITAR REQUIRED TRANSFERENCIA
========================================== */

function quitarRequiredTransferencia() {

    document.getElementById(
        "banco-transferencia"
    ).required = false;


    document.getElementById(
        "referencia-transferencia"
    ).required = false;


    document.getElementById(
        "monto-transferencia"
    ).required = false;
}


/* ==========================================
   QUITAR REQUIRED TARJETA
========================================== */

function quitarRequiredTarjeta() {

    document.getElementById(
        "titular"
    ).required = false;


    document.getElementById(
        "numero-tarjeta"
    ).required = false;


    document.getElementById(
        "vencimiento"
    ).required = false;


    document.getElementById(
        "cvv"
    ).required = false;
}


/* ==========================================
   FORMATO NÚMERO DE TARJETA
========================================== */

document
    .getElementById("numero-tarjeta")
    .addEventListener(
        "input",
        function () {

            let numero =
                this.value.replace(
                    /\D/g,
                    ""
                );


            numero =
                numero.substring(
                    0,
                    16
                );


            let resultado = "";


            for (
                let i = 0;
                i < numero.length;
                i++
            ) {

                if (
                    i > 0 &&
                    i % 4 === 0
                ) {

                    resultado += " ";
                }


                resultado +=
                    numero[i];
            }


            this.value =
                resultado;
        }
    );


/* ==========================================
   FORMATO VENCIMIENTO
========================================== */

document
    .getElementById("vencimiento")
    .addEventListener(
        "input",
        function () {

            let fecha =
                this.value.replace(
                    /\D/g,
                    ""
                );


            fecha =
                fecha.substring(
                    0,
                    4
                );


            if (
                fecha.length >= 3
            ) {

                fecha =
                    fecha.substring(
                        0,
                        2
                    )
                    + "/"
                    +
                    fecha.substring(
                        2
                    );
            }


            this.value =
                fecha;
        }
    );


/* ==========================================
   SOLO NÚMEROS CVV
========================================== */

document
    .getElementById("cvv")
    .addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /\D/g,
                    ""
                );
        }
    );


/* ==========================================
   SOLO NÚMEROS TELÉFONO
========================================== */

document
    .getElementById("telefono")
    .addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /\D/g,
                    ""
                );

        }
    );


/* ==========================================
   VALIDAR TRANSFERENCIA
========================================== */

function validarTransferencia() {

    const banco =
        document.getElementById(
            "banco-transferencia"
        ).value.trim();


    const referencia =
        document.getElementById(
            "referencia-transferencia"
        ).value.trim();


    const monto =
        Number(
            document.getElementById(
                "monto-transferencia"
            ).value
        );


    const total =
        obtenerTotal();


    if (
        banco === "" ||
        referencia === "" ||
        !monto ||
        monto <= 0
    ) {

        alert(
            "⚠️ Completa todos los datos de la transferencia."
        );

        return false;
    }


    if (
        monto !== total
    ) {

        alert(
            "⚠️ El monto de la transferencia debe coincidir con el total del pedido: $"
            + total
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


    const nombre =
        document.getElementById(
            "nombre"
        ).value.trim();


    const telefono =
        document.getElementById(
            "telefono"
        ).value.trim();


    const direccion =
        document.getElementById(
            "direccion"
        ).value.trim();


    const pago =
        document.getElementById(
            "pago"
        ).value;


    /* VALIDAR TRANSFERENCIA */

    if (
        pago === "Transferencia"
    ) {

        if (
            !validarTransferencia()
        ) {

            return;
        }
    }


    /* VALIDAR TARJETA */

    if (
        pago === "Tarjeta"
    ) {

        const numero =
            document.getElementById(
                "numero-tarjeta"
            ).value
            .replace(/\s/g, "");


        const vencimiento =
            document.getElementById(
                "vencimiento"
            ).value;


        const cvv =
            document.getElementById(
                "cvv"
            ).value;


        if (
            numero.length !== 16 ||
            vencimiento.length !== 5 ||
            cvv.length < 3
        ) {

            alert(
                "⚠️ Revisa los datos de la tarjeta."
            );

            return;
        }
    }


    /* TOTAL */

    const total =
        obtenerTotal();


    /* DATOS DEL CLIENTE */

    document.getElementById(
        "confirmacion-nombre"
    ).textContent =
        nombre;


    document.getElementById(
        "confirmacion-telefono"
    ).textContent =
        telefono;


    document.getElementById(
        "confirmacion-direccion"
    ).textContent =
        direccion;


    document.getElementById(
        "confirmacion-pago"
    ).textContent =
        pago;


    document.getElementById(
        "confirmacion-total"
    ).textContent =
        total;


    /* ==========================================
       PRODUCTOS
    =========================================== */

    const listaProductos =
        document.getElementById(
            "confirmacion-productos"
        );


    listaProductos.innerHTML =
        "";


    carrito.forEach(
        producto => {

            const subtotal =
                producto.precio *
                producto.cantidad;


            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "producto-confirmado";


            elemento.innerHTML = `

                <div>

                    <div class="nombre">
                        ${producto.nombre}
                    </div>

                    <div class="cantidad">
                        $${producto.precio}
                        ×
                        ${producto.cantidad}
                    </div>

                </div>


                <div class="subtotal">
                    $${subtotal}
                </div>

            `;


            listaProductos.appendChild(
                elemento
            );

        }
    );


    /* ==========================================
       DATOS DEL PAGO
    =========================================== */

    const datosPago =
        document.getElementById(
            "confirmacion-datos-pago"
        );


    datosPago.innerHTML =
        "";


    /* TRANSFERENCIA */

    if (
        pago === "Transferencia"
    ) {

        const banco =
            document.getElementById(
                "banco-transferencia"
            ).value.trim();


        const referencia =
            document.getElementById(
                "referencia-transferencia"
            ).value.trim();


        const monto =
            document.getElementById(
                "monto-transferencia"
            ).value;


        datosPago.innerHTML = `

            <div class="dato-pago">

                <p>
                    <strong>Banco:</strong>
                    ${banco}
                </p>

                <p>
                    <strong>Referencia:</strong>
                    ${referencia}
                </p>

                <p>
                    <strong>Monto:</strong>
                    $${monto}
                </p>

                <p>
                    🏦 Transferencia registrada
                    como simulación.
                </p>

            </div>

        `;
    }


    /* TARJETA */

    else if (
        pago === "Tarjeta"
    ) {

        const numero =
            document.getElementById(
                "numero-tarjeta"
            ).value
            .replace(/\s/g, "");


        const ultimos4 =
            numero.slice(-4);


        datosPago.innerHTML = `

            <div class="dato-pago">

                <p>
                    💳 Pago con tarjeta
                    registrado como simulación.
                </p>

                <p>
                    <strong>
                        Tarjeta terminada en:
                    </strong>

                    **** ${ultimos4}

                </p>

            </div>

        `;
    }


    /* EFECTIVO */

    else if (
        pago === "Efectivo"
    ) {

        datosPago.innerHTML = `

            <div class="dato-pago">

                💵 Pago en efectivo seleccionado.

            </div>

        `;
    }


    /* PAGO AL ENTREGAR */

    else if (
        pago === "Pago al entregar"
    ) {

        datosPago.innerHTML = `

            <div class="dato-pago">

                🚚 El pago se realizará
                al momento de recibir
                el pedido.

            </div>

        `;
    }


    /* ==========================================
       MOSTRAR CONFIRMACIÓN
    =========================================== */

    document.getElementById(
        "ventana-confirmacion"
    ).style.display =
        "flex";


    /* CERRAR FORMULARIO */

    cerrarFormulario();


    /* VACIAR CARRITO */

    carrito = [];

    actualizarCarrito();


    /* LIMPIAR FORMULARIO */

    document
        .getElementById(
            "formulario-pedido"
        )
        .reset();


    /* OCULTAR PAGOS */

    document.getElementById(
        "datos-transferencia"
    ).style.display =
        "none";


    document.getElementById(
        "datos-tarjeta"
    ).style.display =
        "none";


    quitarRequiredTransferencia();

    quitarRequiredTarjeta();
}


/* ==========================================
   CERRAR CONFIRMACIÓN
========================================== */

function cerrarConfirmacion() {

    document.getElementById(
        "ventana-confirmacion"
    ).style.display =
        "none";
}


/* ==========================================
   CERRAR MODAL AL HACER CLIC AFUERA
========================================== */

document
    .getElementById("ventana-pago")
    .addEventListener(
        "click",
        function (evento) {

            if (
                evento.target === this
            ) {

                cerrarFormulario();
            }

        }
    );


document
    .getElementById("ventana-confirmacion")
    .addEventListener(
        "click",
        function (evento) {

            if (
                evento.target === this
            ) {

                cerrarConfirmacion();
            }

        }
    );


/* ==========================================
   ENVIAR FORMULARIO
========================================== */

document
    .getElementById(
        "formulario-pedido"
    )
    .addEventListener(
        "submit",
        confirmarPedido
    );


/* ==========================================
   INICIAR CARRITO
========================================== */

actualizarCarrito();

