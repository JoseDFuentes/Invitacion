//import {db} from './db.js';

let locationIcon = document.querySelector(".location-ceremony");
let locationIconParty = document.querySelector(".location-party");
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
    locationIcon.addEventListener('click', () => openLocation(14.9659009,-91.7768513)); //window.location.href = "https://maps.app.goo.gl/AXUpL6tafX7AVY7e6");
    locationIconParty.addEventListener('click', () => openLocation(14.9663375,-91.7836988));//window.location.href = "https://maps.app.goo.gl/6VmP8dWQTZ9AycQe6");
    await colocarNombreInvitado();
    await colocarTextoConfirmacion();
    //obtenerDatosDB();

    prevBtn.addEventListener('click', () => {
        console.log(currentIndex);
        if (currentIndex > 0) {
            updateImagePosition(currentIndex, currentIndex-1);
            currentIndex--;
        }
    });
    
    nextBtn.addEventListener('click', () => {
        console.log(currentIndex);
        
        if (currentIndex < imgs.length - 1) {
            updateImagePosition(currentIndex, currentIndex+1);
            currentIndex++;
        }
    });

    
    

    
};



function setWhatsappHref()
{

}

function updateImagePosition(curPosition, newPosition) {
    console.log(imgs[curPosition]);
    console.log(imgs[newPosition]);
    imgs[curPosition].classList.add("img-hidden");
    imgs[curPosition].classList.remove("img-show");
    
    imgs[newPosition].classList.remove("img-hidden");
    imgs[newPosition].classList.add("img-show");
    
    
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

    confirmacionTexto.textContent = `Agradecemos que puedas confirmar tu asistencia a ${invitadoSeleccionado.Contacto}, enviando un mensaje`;
    const num2Conf = invitadoSeleccionado.Contacto == "Jose" ? "50252386656" : "50236671884";

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
        texto = ", ¿Cómo estás?"
    }
    else
    {
        texto = invitado.Nombres;
    }

    invitadoSeleccionado = invitado;

    invitadoEncabezado.textContent = `Hola ${texto}`;
    

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