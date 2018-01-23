sap.ui.define(function() {
	"use strict";
 
	var Formatter = {
			 
			formatFullName : function(fName, lName){
				var fullName = fName + " " + lName;
				return fullName;
			},
			
			formatDate : function(fecha){
				if(fecha){
					var anyo = fecha.substring(0, 4);
					var mes = fecha.substring(4, 6);
					var dia = fecha.substring(6, 8);
					
					dia = dia.toString();
					mes = mes.toString();
					
					if(dia.length == 1)
						dia = "0" + dia;
					
					if(mes.length == 1)
						mes = "0" + mes;
					
					return  dia + "/" + mes + "/" + anyo;
				}
				return "";
				
			},
			
			formatHora : function(hora){
				if(hora){
					var horas = hora.substring(0, 2);
					var min = hora.substring(2, 4);
					var seg = hora.substring(4, 6);
					
					horas= horas.toString();
					seg = seg.toString();
					min = min.toString();
						
					
					return  horas + ":" + min + ":" + seg;
				}
				return "";
				
			},
			
	};
 
	return Formatter;
 
}, /* bExport= */ true);