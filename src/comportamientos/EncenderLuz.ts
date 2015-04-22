/// <reference path="ComportamientoAnimado.ts"/>
/// <reference path="../habilidades/HabilidadAnimada.ts"/>

	
class EncenderLuz extends Comportamiento {
	
	actualizar() {
		if (this.tocandoLuz()) {
			var casillaConLuz = this.getCasillaConLuz();
			casillaConLuz.agregar_habilidad(HabilidadAnimada, {nombreAnimacion: 'prendida'});
		} else {
			this.receptor.decir('¡Aquí no hay una luz por prender!');
		}
		return true;
    }
    
    tocandoLuz() {
    	return pilas.obtener_actores_con_etiqueta('CasillaConLuz').some(objeto => objeto.colisiona_con(this.receptor));
    }
    
    getCasillaConLuz() {
    	return pilas.obtener_actores_con_etiqueta('CasillaConLuz').filter(objeto => objeto.colisiona_con(this.receptor))[0];
    }
}