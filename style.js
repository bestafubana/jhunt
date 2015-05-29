$(document).ready(function(){

	$("#starsSelect").change(function(){
		alert("");
		if($(this).val()=="-1"){
			$(this).removeClass("star");
		}else{
			$(this).addClass("star");
		}
		alert($("#starsSelect").val());
		alert();
	});


});