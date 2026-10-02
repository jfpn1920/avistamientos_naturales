/*-------------------------------------------*/
/*--|funcionalidad_avistamientos_naturales|--*/
/*-------------------------------------------*/
const formulario = document.getElementById("formulario_avistamiento");
const nombreAnimal = document.getElementById("nombre_animal");
const tipoAnimal = document.getElementById("tipo_animal");
const lugarAvistamiento = document.getElementById("lugar_avistamiento");
const fechaAvistamiento = document.getElementById("fecha_avistamiento");
const descripcionAvistamiento = document.getElementById("descripcion_avistamiento");
const listaAvistamientos = document.getElementById("lista_avistamientos");
const cantidadRegistros = document.getElementById("cantidad_registros");
const sinRegistros = document.getElementById("sin_registros");
const botonLimpiar = document.getElementById("boton_limpiar");
const botonEliminarTodos = document.getElementById("boton_eliminar_todos");
const mensajeFormulario = document.getElementById("mensaje_formulario");
const mensajeGeneral = document.getElementById("mensaje_general");
let avistamientos = [];
/*-------------------------------------------------*/
/*--|cargar_y_guardar_los_datos_con_localstorage|--*/
/*-------------------------------------------------*/
function cargarDatos() {
    const datosGuardados = localStorage.getItem("avistamientos_naturales");
    if (datosGuardados) {
        avistamientos = JSON.parse(datosGuardados);
    }
    mostrarAvistamientos();
}
function guardarDatos() {
    localStorage.setItem("avistamientos_naturales", JSON.stringify(avistamientos));
}
/*---------------------------*/
/*--|limpiar_el_formulario|--*/
/*---------------------------*/
function limpiarFormulario() {
    formulario.reset();
    nombreAnimal.focus();
}
/*---------------------------------------*/
/*--|mostrar_el_mensaje_del_formulario|--*/
/*---------------------------------------*/
function mostrarMensajeFormulario(texto) {
    mensajeFormulario.textContent = texto;
    setTimeout(() => {
        mensajeFormulario.textContent = "";
    }, 2000);
}
/*------------------------------*/
/*--|crear_nuevo_avistamiento|--*/
/*------------------------------*/
function crearAvistamiento(evento) {
    evento.preventDefault();
    const nuevoAvistamiento = {
        id: Date.now(),
        nombre: nombreAnimal.value,
        tipo: tipoAnimal.value,
        lugar: lugarAvistamiento.value,
        fecha: fechaAvistamiento.value,
        descripcion: descripcionAvistamiento.value
    };
    avistamientos.push(nuevoAvistamiento);
    guardarDatos();
    mostrarAvistamientos();
    limpiarFormulario();
    mostrarMensajeFormulario("Avistamiento guardado correctamente.");
}
/*-------------------------------*/
/*--|mostrar_los_avistamientos|--*/
/*-------------------------------*/
function mostrarAvistamientos() {
    listaAvistamientos.innerHTML = "";
    if (avistamientos.length === 0) {
        sinRegistros.style.display = "block";
    } else {
        sinRegistros.style.display = "none";
    }
    avistamientos.forEach((avistamiento) => {
        const registro = document.createElement("article");
        registro.classList.add("registro");
        registro.innerHTML = `
            <div class="icono_registro">
                <i class="fa-solid fa-paw"></i>
            </div>
            <div>
                <h3>${avistamiento.nombre}</h3>
                <p><strong>Tipo:</strong>${avistamiento.tipo}</p>
                <p><strong>Lugar:</strong>${avistamiento.lugar}</p>
                <p><strong>Fecha:</strong>${avistamiento.fecha}</p>
                <p>${avistamiento.descripcion}</p>
            </div>
            <button class="boton_eliminar" data-id="${avistamiento.id}"><i class="fa-solid fa-trash"></i></button>
        `;
        listaAvistamientos.appendChild(registro);
    });
    actualizarContador();
}
/*----------------------------*/
/*--|actualizar_el_contador|--*/
/*----------------------------*/
function actualizarContador() {
    cantidadRegistros.textContent = avistamientos.length;
}
/*--------------------------------------*/
/*--|eliminar_todos_los_avistamientos|--*/
/*--------------------------------------*/
function eliminarAvistamiento(id) {
    avistamientos = avistamientos.filter((avistamiento) => avistamiento.id !== id);
    guardarDatos();
    mostrarAvistamientos();
}
function eliminarTodos() {
    if (avistamientos.length === 0) {
        return;
    }
    const confirmacion = confirm("¿Deseas eliminar todos los avistamientos?");
    if (!confirmacion) {
        return;
    }
    avistamientos = [];
    guardarDatos();
    mostrarAvistamientos();
    mensajeGeneral.textContent = "Todos los avistamientos fueron eliminados.";
    setTimeout(() => {
        mensajeGeneral.textContent = "";
    }, 2000);
}
/*-------------------------------------------------------*/
/*--|evento_de_boton_limpiar_o_eliminar_del_formulario|--*/
/*-------------------------------------------------------*/
formulario.addEventListener("submit", crearAvistamiento);
botonLimpiar.addEventListener("click", limpiarFormulario);
listaAvistamientos.addEventListener(
    "click",
    (evento) => {
        const boton = evento.target.closest(".boton_eliminar");
        if (!boton) {
            return;
        }
        const id = Number(boton.dataset.id);
        eliminarAvistamiento(id);
    }
);
botonEliminarTodos.addEventListener("click", eliminarTodos);
cargarDatos();