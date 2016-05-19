function F_reloj(segundos){
	 var mins = Math.floor((segundos/60));
	 var seg = segundos-(mins*60);
	 var segs = ((seg < 10) ? "0" : "") + seg;
	 return mins+":"+segs;
}
function F_chrono(tiempo){        
	var hora = F_reloj(tiempo);
	$(".reloj").html(hora);
	var oTiempo = tiempo-1;              
	$timex = setTimeout(function(){
		switch(oTiempo){
		case -1:F_estadistica();break;
		default:F_chrono(oTiempo);break;
		}                       
	},1000);
}
function rrge(min, max) {
	var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
	return randomNum;
}
function F_desort(arreglo){	
	var des = new Array();
	var i;
	for(i=0;i<arreglo;i++){
		des[i] = i;
	}
	for(i=0;i<arreglo-1;i++){
		var m = rrge(i,arreglo-1);
		var aux = des[i];
		des[i] = des[m];
		des[m] = aux;
	}
	return des;
}
function F_start($time, $pregs,$orden){
	F_chrono($time);
	F_vwQuest($p,$pregs,$orden);
}
function F_chkresp(us,son){
	var a = us.toString();
	var b = son.toString();
	if(a==b){
		$('#leresp').val(1);
	}else{
		$('#leresp').val(0);
	}
	//console.log(us+":"+son);
	//$('#leresp').val(arr);
}
function F_vwQuest(iden,quiz,orden){
	$('#image').hide();
	$("#next").removeClass("ui-btn-active"); 
	$('#leresp').val(''); 
	if(iden<$lquiz){
		var pregunta = unescape(quiz[orden[iden]].p);
		var type     = quiz[orden[iden]].s;
		var alterva  = quiz[orden[iden]].a;
		var image    = quiz[orden[iden]].ib;
		if(image!=""){
			$("#image").show();
			$("#image").html('<img src="www/'+unescape(image)+'" border="0" />');
		}
		$('#pfrom').html((iden+1)+" de "+$lquiz);
		$("#pregunta p").text(pregunta);
		$("#alternativas").find("#radio label").removeClass("ui-radio-on").addClass("ui-radio-off");
		$("#alternativas").find("#checkbox label").removeClass("ui-checkbox-on").addClass("ui-checkbox-off");
		if(type == 0){
			$("#alternativas #checkbox").css("display","none");        
			$("#alternativas #radio").css("display","block");
			var a=0;
			$("#alternativas #radio").find("label").each(function(){
				$(this).show();
				if(alterva[a][0]!==""){
				var texto = unescape(alterva[a][0]);
				var rsp = alterva[a][1];
				$(this).find("span").text(texto);
				var rbt = "#r"+a;
				$(rbt).val(rsp);
				$(rbt).attr('checked', false);
				$(rbt).on('click', function(){
					var elec = 0;
					if($(this).val()==1){
						elec = 1;
					}
					$('#leresp').val(elec);
				});
				a++; 
				}else{
					$(this).hide();
				}
			});
		}
		if(type == 1){
			$("#alternativas #radio").css("display","none");
			$("#alternativas #checkbox").css("display","block");
			var a=0;
			var arr = [0,0,0,0];
			var son = [0,0,0,0];
			$("#alternativas #checkbox").find("label").each(function(){
				$(this).show(); 
				if(alterva[a][0]!==""){
				var text = unescape(alterva[a][0]);
				var rsp = alterva[a][1];
				if(rsp){son[a]=1;}                     
				$(this).find("span").text(text);
				var cbt = "#c"+a;
				$(cbt).val(rsp);
				$(cbt).attr('checked', false);
				$(cbt).on('click', function(){
					var dt = parseInt($(this).attr('name').substring(1));
					if($(this).is(':checked')){
						arr[dt] = 1;
					}else{
						arr[dt] = 0;
					}
					F_chkresp(arr,son);
				});
				a++;
				}else{
					$(this).hide();
				}
			});
		}
	}else{
		F_estadistica();
	} 
}
function F_view_respuesta(iden,quiz){
	$('#image').hide();
	$("#next").removeClass("ui-btn-active"); 
	$('#leresp').val(''); 
	if(iden<$lquiz){
		var pregunta = unescape(quiz[iden].pregunta);
		var type     = quiz[iden].type;
		var alterva  = quiz[iden].respuestas; 
		var image    = quiz[iden].imagen;
		if(image!=""){
			$("#image").show();
			$("#image").html('<img src="www/'+unescape(image)+'" border="0" style="max-width:80%;margin:2px auto;" />');
		}
		$("#pregunta p").text("Pregunta "+(iden+1)+" de "+$lquiz+" : "+pregunta);
		//$("#alternativas").find("input[type=radio]").data("cacheval","false");
		$("#alternativas").find("#radio label").removeClass("ui-radio-on").addClass("ui-radio-off");
		$("#alternativas").find("#checkbox label").removeClass("ui-checkbox-on").addClass("ui-checkbox-off");
		if(type == 0){
			$("#alternativas #checkbox").css("display","none");        
			$("#alternativas #radio").css("display","block");
			var a=0;
			$("#alternativas #radio").find("label").each(function(){
				var texto = unescape(alterva[a][0]);
				var rsp = alterva[a][1];
				//console.log("radio "+a+":"+alterva[a].crr);
				$(this).find("span").text(texto);
				var rbt = "#r"+a;
				$(rbt).val(rsp);
			a++;                
			});
		}
		if(type == 1){
			$("#alternativas #radio").css("display","none");
			$("#alternativas #checkbox").css("display","block");
			var a=0;
			var arr = [0,0,0,0];
			var son = [0,0,0,0];
			$("#alternativas #checkbox").find("label").each(function(){ 
				var text = unescape(alterva[a][0]);
				var rsp = alterva[a][1];
				if(rsp){son[a]=1;}
				//console.log("check "+a+":"+alterva[a].vali);                     
				$(this).find("span").text(text);
				var cbt = "#c"+a;
				$(cbt).val(rsp);
				a++;
			});
		}
	} 
}
function F_estadistica(){
	clearTimeout($timex);
	var $datos = usuario;
	var $lgr = $datos.length;
	var sumar = 0;
	var btns = "";
	for(var f=0;f<$lgr;f++){
		if($datos[f]==1){
			sumar++;
			btns += '<div class="est_green view_resp" data-id="'+f+'">';
		}else{
			btns += '<div class="est_red view_resp" data-id="'+f+'">';
		}
		btns += (f+1)+'</div>';
	}
	var porce = Math.round((sumar/$lquiz)*100);
	var salida = '<div class="rs-item"><span class="ri-ttl">Total preguntas:</span><span class="ri-itm">'+$lquiz+'</span></div>';
	salida += '<div class="rs-item"><span class="ri-ttl">Correctas:</span><span class="ri-itm">'+sumar+'</span></div>';
	salida += '<div class="rs-item"><span class="ri-ttl">Incorrectas:</span><span class="ri-itm">'+($lquiz-sumar)+'</span></div>';
	salida += '<div class="rs-item"><span class="ri-ttl">Sin respuesta:</span><span class="ri-itm">'+($lquiz-$lgr)+'</span></div>';
	salida += '<div class="rs-item"><span class="ri-ttl">Porcentaje:</span><span class="ri-itm">'+porce+'%</span></div>';
	$('#pageb').hide();
	$("#pagec").show();
	$('#fresul').html(salida);
	$('#fboxes').html(btns);
	$('.view_resp').on('click', function(){
		var $id = $(this).data('id');
		$("#sw_image").hide();
		$("#show_resul p").text(unescape(preguntas[$orden[$id]][0]));
		var image  = preguntas[$orden[$id]][3];
		if(image!="null"){
			$("#sw_image").show();
			$("#sw_image").html('<img src="www/cuesimg/'+unescape(image)+'" border="0" style="max-width:80%;margin:2px auto;" />');
		}
		var alterva  = preguntas[$orden[$id]][2];
		var a=0;
		$("#sw_alternativas .sw_item").each(function(){
			$(this).removeClass('sw_icorr');
			var texto = unescape(alterva[a][0]);
			if(alterva[a][1]){
				$(this).addClass('sw_icorr');
			}
			//console.log("radio "+a+":"+alterva[a].crr);
			$(this).find("p").text(texto);
			a++;				
		});
		$('#show_resul').show();
	});
	$('#volver').on('click', function(){
		$('#show_resul').hide();
	});
}
//network
function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = false;
    states[Connection.ETHERNET] = true;
    states[Connection.WIFI]     = true;
    states[Connection.CELL_2G]  = true;
    states[Connection.CELL_3G]  = true;
    states[Connection.CELL_4G]  = true;
    states[Connection.CELL]     = true;
    states[Connection.NONE]     = false;
    //alert('Connection type: ' + states[networkState]);
	return states[networkState];
}
