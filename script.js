//import {conectarDB} from "./db.js";

let locationIcon = document.querySelector(".location-ceremony");
let locationIconParty = document.querySelector(".location-party");
let invitadoEncabezado = document.querySelector(".header--guess");
const imgContainer = document.querySelector('.main-schedule--imgs');
const imgs = document.querySelectorAll(".img-slide");
const prevBtn = document.querySelector('#prevButton');
const nextBtn = document.querySelector('#nextButton');
let currentIndex = 3; 

window.onload = () => {
    locationIcon.addEventListener('click', () => openLocation(14.9659009,-91.7768513)); //window.location.href = "https://maps.app.goo.gl/AXUpL6tafX7AVY7e6");
    locationIconParty.addEventListener('click', () => openLocation(14.9663375,-91.7836988));//window.location.href = "https://maps.app.goo.gl/6VmP8dWQTZ9AycQe6");
    colocarNombreInvitado();
    //obtenerDatosDB();

    prevBtn.addEventListener('click', () => {
        console.log(currentIndex);
        if (currentIndex > 0) {
            currentIndex--;
            updateImagePosition();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        console.log(currentIndex);
        console.log(imgs);
        if (currentIndex < imgs.length - 1) {
            currentIndex++;
            updateImagePosition();
        }
    });

    updateImagePosition();
};


function clickImagen() {
    
}

function updateImagePosition() {
    const offset = -currentIndex * 100;
    imgContainer.style.transform = `translateX(${offset}%)`;
}




function obtenerDatosDB(){
    let connection = conectarDB();
    let buery = "Select * from Invitados";
    connection.query(buery, function(error, result, fields) {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
        }
    })
    connection.end();

}



function openLocation(latitude, longitude) {
    
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      
      window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    } else {
      
      window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    }
}

function colocarNombreInvitado()
{

    let codigoInvitado = obtenerParametro('gscd');
    let NombreInvitado = obtenerNombresInvitadosPorCodigo(codigoInvitado);
    invitadoEncabezado.textContent = `Hola ${NombreInvitado}`;


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

function obtenerNombresInvitadosPorCodigo(codigo)
{
    let InvitadosDict = {
        1: "Patri",
        2: "Lady",
        3: "Keily y Ever"
    }

    let ret = InvitadosDict[codigo]

    if (typeof(ret) == "undefined"){
        ret = ", ¿Cómo estás?"
    }
    return ret;
}