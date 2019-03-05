$(document).ready(function(){
    $('.content').hide();
})

document.addEventListener('keydown', function(){
    if(jugando == true){
        comprobar();
    }
}, false);
//INICIO

var nombre;

function iniciar(){
    nombre = document.getElementById('nombre').value;
    $('.inicio').hide();
    $('.content').show();
}


//CARGANDO LAS VARIABLES
var canvas, ctx, pl, zona, fondo;

var ancho = 600;
var alto = 300;

var fps = 10;
var visual = 5;

var tamaño = 50;
var puntaje = {x: 200, y: 200, tamaño: 150};
var objeto = {x: 0, y: puntaje.y + visual, velocidad: 5, sentido: true, tamaño: 50};

var jugando = false;
var vidas = 4;
var puntos = 0;

function cargar(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    pl = new Image();
    pl.src = "player.png";
    
    zona = new Image();
    zona.src = "zona.png";
    
    fondo = new Image();
    fondo.src = "fondo.png";
    
    
    //LISTENER DEL CLICK DEL CANVAS
    canvas.addEventListener('click', function(){
        if(jugando == true){
            comprobar();
        }
    },false);
}


//BORRA EL JUEGO EN PANTALLA
function borrar(){
    canvas.width = ancho;
    canvas.height = alto;
}

//DIBUJA EL JUEGO EN PANTALLA
function dibujar(){
    ctx.drawImage(fondo,0,0,1,1,0,puntaje.y,ancho,tamaño);
    
    ctx.drawImage(zona,0,0,1,1,puntaje.x,puntaje.y, puntaje.tamaño, tamaño);
    
    ctx.drawImage(pl,0,0,1,1,objeto.x,objeto.y, objeto.tamaño, tamaño-(2*visual));
    
    ctx.font = '22px serif';
    ctx.fillText('Puntos: '+puntos, 10, 25);
    ctx.fillText('Vidas: '+vidas, 500, 25);
}

//MOVIMIENTO DEL JUEGO
function movimiento(){
    if(objeto.sentido == true){
        
        if((objeto.x+objeto.tamaño+objeto.velocidad)>ancho){
            objeto.x = ancho-objeto.tamaño;
            objeto.sentido = false;
        }else{
            objeto.x += objeto.velocidad;
        }
        
    }
    if(objeto.sentido == false){
        
        if((objeto.x-objeto.velocidad)<0){
            objeto.x = 0;
            objeto.sentido = true;
        }else{
            objeto.x -= objeto.velocidad;
        }
        
    }
}

//COMPROBANDO ESTADO DEL JUEGO
function comprobar(){
    if(jugando = true){
        
        if(objeto.x>puntaje.x) {
            
            if(objeto.x<(puntaje.x+puntaje.tamaño)){
                puntos += 1;
            }else{
                vidas -= 1;
            }
            
        }else{
            if((objeto.x+objeto.tamaño)<(puntaje.x+puntaje.tamaño)){
            
                if((objeto.x+objeto.tamaño)>puntaje.x){
                    puntos += 1;
                }else{
                    vidas -= 1;
                }
            
            }else{
                vidas -= 1;
            }
        }
        
        
    }
}

//RESTART
function restart(){
    vidas = 3;
    puntos = 0;
    puntaje = {x: 200, y: 200, tamaño: 150};
    objeto = {x: 0, y: puntaje.y + visual, velocidad: 5, sentido: true, tamaño: 50};
    jugando = true;
}


//DIFICULTAD
function dificultad(){
    if(puntos > 9){
        objeto.velocidad = 10;
    }
    if(puntos > 19){
        objeto.velocidad = 20;
    }
    if(puntos > 29){
        objeto.velocidad = 5;
        puntaje.tamaño = 100;
    }
    if(puntos > 39){
        objeto.velocidad = 10;
        puntaje.tamaño = 100;
    }
    if(puntos > 49){
        objeto.velocidad = 20;
        puntaje.tamaño = 100;
    }
    if(puntos > 79){
        objeto.velocidad = 10;
        puntaje.tamaño = 80;
    }
    if(puntos > 89){
        objeto.velocidad = 20;
        puntaje.tamaño = 80;
    }
    if(puntos > 100){
        objeto.velocidad = 30;
        puntaje.tamaño = 80;
    }
}







setInterval(function(){
    if(jugando == true){
        borrar();
        dibujar();
        movimiento();
        dificultad();
        if(vidas<= 0){
            jugando = false;
        }
    }
}, 1000/fps);