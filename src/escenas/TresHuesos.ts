/// <reference path = "../../dependencias/pilasweb.d.ts"/>
/// <reference path = "../actores/Cuadricula.ts"/>
/// <reference path = "../actores/PerroCohete.ts"/>
/// <reference path = "../actores/Hueso.ts"/>
/// <reference path = "../comportamientos/movimientosEnCuadricula.ts"/>


/**
 * @class TresHuesos
 * 
 */
class TresHuesos extends Base {
    fondo;
    personaje;
    cuadricula;
    objetos = [];
        
    iniciar() {
        this.fondo = new Fondo('fondos.nubes.png',0,0);
        //this.robot.izquierda = pilas.izquierda();

        this.cuadricula = new Cuadricula(0,0,1,4,
            {alto: 70},
            {grilla: 'casillaLightbot.png', 
            cantColumnas: 5});
        
/*
        //se cargan los huesos
        var hayAlMenosUno = false;
        for(var i = 0; i < 3; i++) {
            if (Math.random() < .5) {
                hayAlMenosUno = true;
                this.agregarHueso(i+1);
            }
        }
        if (!hayAlMenosUno) {
            var columna = 1;
            var rand = Math.random()
            if (rand> 0.33 && rand<0.66) {
                columna = 2;
            } else if (rand > 0.66) {
                columna = 3
            }
            this.agregarHueso(columna);
        }
*/

        var objeto= new Hueso(0,0);
        objeto.setCuadricula(this.cuadricula,0,0);
        this.objetos.push(objeto);

        var objeto= new Hueso(0,0);
        objeto.setCuadricula(this.cuadricula,0,1);
        this.objetos.push(objeto);

        var objeto= new Hueso(0,0);
        objeto.setCuadricula(this.cuadricula,0,2);
        this.objetos.push(objeto);

        var objeto= new Hueso(0,0);
        objeto.setCuadricula(this.cuadricula,0,3);
        this.objetos.push(objeto);

        // se crea el personaje
        this.personaje = new PerroCohete(0,0);
        this.cuadricula.agregarActor(this.personaje,0,0);
    }
/*
    agregarHueso(columna) {
        var objeto = new Hueso(0,0);
        this.cuadricula.agregarActor(objeto,0,columna);
        //objeto.y -= 30;
        this.objetos.push(objeto);
    }
*/
/*
    intentaronRecoger() {
        if (this.tocandoHueso()) {
            var objeto = this.objetos.filter(objeto => objeto.colisiona_con(this.personaje))[0];
            var index = this.objetos.indexOf(objeto);
            this.objetos.splice(index, 1);
            objeto.eliminar();
        } else {
            this.personaje.decir("¡No hay hueso para comer!");
        }
    }
*/
    comerHueso() {
        this.personaje.hacer_luego(RecogerPorEtiqueta,{'etiqueta' : 'Hueso', 'mensajeError' : 'No hay un hueso aqui' });
    }
/*
    tocandoHueso() {
        return this.objetos.some(objeto => objeto.colisiona_con(this.personaje));
    }
*/
    avanzar() {
        this.personaje.hacer_luego(MoverACasillaDerecha);
    }
}