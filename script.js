//import generarDialogoFiltrado from './js/dialog.js';
//let locationIcon = document.querySelector(".location-ceremony");
//let locationIconParty = document.querySelector(".location-party");

const locationCeremonyGmaps = document.querySelector(".gmap-ceremony");
const locationCeremonyWaze = document.querySelector(".waze-ceremony");

const locationPartyGmaps = document.querySelector(".gmap-party");
const locationPartyWaze = document.querySelector(".waze-party");

const parkingCeremony = document.querySelector(".parking-ceremony");

let invitadoEncabezado = document.querySelector(".header--guess");
const imgContainer = document.querySelector('.main-schedule--imgs');
const imgs = document.querySelectorAll(".img-slide");
const prevBtn = document.querySelector('.prevButton');
const nextBtn = document.querySelector('.nextButton');
const sendWhatsApp = document.querySelector('.main-confirmation-whatsapp');
const confirmacionTexto = document.querySelector("#confirmation-invitation");
const linkConfirmacion = document.querySelector(".main-confirmation-whatsapp");

let currentIndex = 2; 
let invitadoSeleccionado;

document.addEventListener('DOMContentLoaded', init);

async function init() {
    
    locationCeremonyGmaps.addEventListener('click', () => window.location.href = "https://maps.app.goo.gl/tdo9c1r4yYE95EcH9");
    locationPartyGmaps.addEventListener('click', () => window.location.href = "https://maps.app.goo.gl/6VmP8dWQTZ9AycQe6");

    locationCeremonyWaze.addEventListener('click', () => { 
        console.log("clic location ceremony waze");
        window.location.href = "https://www.waze.com/ul/h9fwtps3zj"
    });
    locationPartyWaze.addEventListener('click', () => window.location.href = "https://waze.com/ul/h9fwtpkt0j");

    parkingCeremony.addEventListener('click', () => window.location.href = "./assets/img/parking.png")


    await colocarNombreInvitado();
    await colocarTextoConfirmacion();
    //obtenerDatosDB();
    reveal();
    prevBtn.addEventListener('click', () => {
        console.log(currentIndex);
        if (currentIndex > 0) {
            updateImagePosition(currentIndex, currentIndex-1);
            currentIndex--;
            if (nextBtn.style.visibility = 'hidden') {
                nextBtn.style.visibility = 'visible';
            }


        }  
        
        if (currentIndex <= 0) {
            prevBtn.style.visibility = 'hidden';
        }
        
    });
    
    nextBtn.addEventListener('click', () => {
        console.log(currentIndex);
        
        if (currentIndex < imgs.length - 1) {
            updateImagePosition(currentIndex, currentIndex+1);
            currentIndex++;
            
            if (prevBtn.style.visibility = 'hidden') {
                prevBtn.style.visibility = 'visible';
            }


        } 
        if (currentIndex >= imgs.length - 1) {
            nextBtn.style.visibility = 'hidden';
        }
    });

    
};




function updateImagePosition(curPosition, newPosition) {

    imgs[curPosition].classList.add("img-hidden");
    imgs[curPosition].classList.remove("img-show");
    
    imgs[newPosition].classList.remove("img-hidden");
    imgs[newPosition].classList.add("img-show");
    
    
}


function reveal() {
    var reveals = document.querySelectorAll(".location");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("bounce2");
      } else {
        reveals[i].classList.remove("bounce2");
      }
    }
  }



async function obtenerDatosDB() {

    const filename = "./data/invitados.json";

    const ret = await fetch (filename)
        .then((response)=> {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo");
            }

            const data = response.json();
            return data;
        }).then ( data => {
            return data;
        }).catch((error)=> { console.log(error)});

   return ret;

}



function openLocation(latitude, longitude) {
    
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      
      window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    } else {
      
      window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    }
}

async function colocarTextoConfirmacion() {


    if (invitadoSeleccionado == null) {

        const invitados = await obtenerDatosDB();

        await generarDialogoFiltrado(invitados);

        invitadoSeleccionado = {
            Contacto: "Jose",
            Personas: 1,
            Nombres: "[Tu Nombre]"
        }
    }

    confirmacionTexto.textContent = `Agradecemos que puedas confirmar tu asistencia a ${invitadoSeleccionado.Contacto}, enviando un mensaje`;
    const num2Conf = invitadoSeleccionado.Contacto == "Jose" ? "50252386656" : "50244866938";

    const hiPrefix = invitadoSeleccionado.Personas > 1 ? "te+saludan" : "te+saluda";
    const hiConfPrefix = invitadoSeleccionado.Personas > 1 ? "queriamos+confirmar+nuestra" : "queria+confirmar+mi";

    linkConfirmacion.href = `https://wa.me/${num2Conf}?text=Hola+${invitadoSeleccionado.Contacto},+${hiPrefix}+${invitadoSeleccionado.Nombres},+solamente+${hiConfPrefix}+asistencia+a+la+boda.+Un+saludo+#ConfirmacionBoda`;

    //linkConfirmacion.textContent="Enviar Mensaje";

}

async function colocarNombreInvitado()
{

    const codigoInvitado = obtenerParametro('gscd');
    const invitado = await obtenerInvitadoPorCodigo(codigoInvitado);
    let texto;
    if (typeof(invitado) == "undefined"){
        texto = "Hola, ¿Cómo estás?"
    }
    else
    {
        texto = invitado.Nombres;
    }

    invitadoSeleccionado = invitado;

    invitadoEncabezado.textContent = `${texto}`;
    

}




function obtenerParametro(nombreParametro) {
    var url = window.location.href;
    var index = url.indexOf('?');

    if (index !== -1) {
        var parametrosString = url.substring(index + 1);
        var parametrosArray = parametrosString.split('&');

        for (var i = 0; i < parametrosArray.length; i++) {
            var parametro = parametrosArray[i].split('=');
            var nombre = parametro[0];
            var valor = parametro[1];

            if (nombre === nombreParametro) {
                return valor;
            }
        }
    }
    return null;
}

async function obtenerInvitadoPorCodigo(codigo)
{

    console.log(codigo);
    let ret;

    const invitados = await obtenerDatosDB();

    console.log(invitados);
    
    const invitadoSeleccionado = invitados.find((i) => i.Codigo == codigo);

    return invitadoSeleccionado;

    

}

function generarDialogoFiltrado(datos) {
    
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

