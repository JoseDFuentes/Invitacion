export function generarDialogoFiltrado(datos) {
    
    const dialog = document.createElement('div');
    dialog.className = 'dialogo';

    
    const inputBusqueda = document.createElement('input');
    inputBusqueda.type = 'text';
    inputBusqueda.placeholder = 'Buscar...';
    inputBusqueda.className = 'input-busqueda';

    
    const select = document.createElement('select');
    select.className = 'combobox';
    select.size = 5; // Mostrar múltiples opciones

    
    function actualizarOpciones(filtro) {
        select.innerHTML = ''; // Limpiar las opciones
        const filtrados = datos.filter(item => item.nombre.toLowerCase().includes(filtro.toLowerCase()));
        filtrados.forEach(item => {
            const option = document.createElement('option');
            option.value = item.codigo;
            option.textContent = item.nombre;
            select.appendChild(option);
        });
    }

    // Llamada inicial para mostrar todas las opciones
    actualizarOpciones('');

    // Escuchar cambios en el input para actualizar las opciones del combobox
    inputBusqueda.addEventListener('input', (e) => {
        actualizarOpciones(e.target.value);
    });

    // Crear botones de aceptar y cancelar
    const btnAceptar = document.createElement('button');
    btnAceptar.textContent = 'Aceptar';
    btnAceptar.className = 'btn-aceptar';
    
    const btnCancelar = document.createElement('button');
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.className = 'btn-cancelar';

    // Crear contenedor de botones
    const botonera = document.createElement('div');
    botonera.className = 'botonera';
    botonera.appendChild(btnAceptar);
    botonera.appendChild(btnCancelar);

    // Agregar los elementos al diálogo
    dialog.appendChild(inputBusqueda);
    dialog.appendChild(select);
    dialog.appendChild(botonera);

    // Añadir el diálogo al cuerpo del documento
    document.body.appendChild(dialog);

    // Eventos de aceptar y cancelar
    btnAceptar.addEventListener('click', () => {
        const seleccionado = select.value;
        alert(`Código seleccionado: ${seleccionado}`);
        cerrarDialogo();
    });

    btnCancelar.addEventListener('click', cerrarDialogo);

    function cerrarDialogo() {
        document.body.removeChild(dialog);
    }
}

