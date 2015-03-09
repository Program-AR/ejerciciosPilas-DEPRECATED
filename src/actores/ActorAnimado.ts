/// <reference path = "../../dependencias/pilasweb.d.ts" />


/**
 * @class ActorAnimado
 * 
 * Representa un actor que tiene una animación cuando se mueve.
 * Las opciones deben incluir la grilla (imagen) y la cantidad de cuadros que tiene,
 * ó bien la grilla y la lista de cuadros que representan la animación. También puede
 * incluir el cuadroEstatico, que es el cuadro que se muestra al estar parado.
 * 
 * Por ejemplo:
 *      @example
 *      miActor = new ActorAnimado(0,0,{grilla: 'miImagen.png', cuadros: [3,4,5,6]});
 *      miActor.hacer_luego(CaminaDerecha,{pasos: 2});
 */
class ActorAnimado extends Actor {
    opciones;
    _casillaActual;
    cuadricula;
    
    constructor(x, y, opciones) {
        this.sanitizarOpciones(opciones);
        var imagen = pilas.imagenes.cargar_animacion(this.opciones.grilla, this.opciones.cantColumnas, this.opciones.cantFilas);
        super(imagen, x, y);
        
        this._imagen.definir_animacion("correr", this.opciones.cuadrosCorrer, 5);
        this._imagen.definir_animacion("parado", this.opciones.cuadrosParado, 5);
        
        this.detener_animacion();
    }
    
    sanitizarOpciones(ops){
        this.opciones = ops;
        this.opciones.cuadrosCorrer = ops.cuadrosCorrer || this.seguidillaHasta(ops.cantColumnas) || [0, 0];
        this.opciones.cuadrosParado = ops.cuadrosParado || [0, 0];
        this.opciones.cantColumnas = ops.cantColumnas || this.opciones.cuadrosCorrer.length;
        this.opciones.cantFilas = ops.cantFilas || 1;
    }
    
    mover(x,y) {
        this.x += x;
        this.y += y;
        this.pasito_correr();
    }
    
    definirAnimacion(nombre, cuadros, velocidad){
        this._imagen.definir_animacion(nombre, cuadros, velocidad);
    }

    pasito_correr() {
        this._imagen.cargar_animacion("correr");
        this._imagen.avanzar();
    }
    
    detener_animacion() {
        this._imagen.cargar_animacion("parado");
    }
    
    seguidillaHasta(nro){
        var seguidilla = [];
        if(nro !== undefined) {
            for(var i = 0; i < nro; i++){
                seguidilla.push(i);
            }
        }
        return seguidilla;
    }
    
    //TODO poner en otra clase lo q tenga q ver con casillas
    casillaActual(){
        return this._casillaActual;
    }
    setCasillaActual(c, moverseAhi=false){
        this._casillaActual = c;
        if (moverseAhi){
            this.x = c.x;
            this.y = c.y;
        }
    }
    setCuadricula(cuad,nroF,nroC){
        this.cuadricula = cuad;
        this.setCasillaActual(cuad.casilla(nroF,nroC),true);
    }
} 