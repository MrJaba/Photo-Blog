//Setup TDC namespace
var TDC = window.TDC || {};

TDC.Thumbnails = {
		
	addOnClicks: function(){
		$(".thumbnail").each( function( index ){
			$(this).click( function(event){
				//add spinner
				$('#spinner').show();
				$.get('/load_image', "thumbnail="+$(this).attr("src"), function(data){					
					var replacementImage = new Image();
					$(replacementImage).attr("src", $.parseJSON(data)['url']).load(function(){
							$(this).hide();
							//remove spinner
							$('#spinner').hide();
							$("#main_image").fadeOut(400, function(){
								$(this).remove();
								$(replacementImage).attr("id", "main_image");
								$("#image_container").append(replacementImage);								
								$(replacementImage).fadeIn(400);
							});							
						});					
				});
			})			
		})
	},
	
	addHoverScroll:function(){
		var stopAnimation = function(){$("#images img").stop(true)}; 
		var scrollLeft = function(){ 
			if( $("#last").position().left > ($("#arrow_right").position().left -70)){
				$("#images img").animate({left:'-=70'}, null, 'swing', scrollLeft) 
			}else{
				stopAnimation();
			}
		};
		var scrollRight = function(){
			if( $("#first").position().left < 70 ){
				$("#images img").animate({left:'+=70'}, null, 'swing', scrollRight) 
			}else{
				stopAnimation();
			}
		};
		$("#arrow_left").hover(
			function(event){ scrollLeft() }, 
			function(event){ $("#images img").stop(true) } );
		$("#arrow_right").hover(
			function(event){ scrollRight() }, 
			function(event){ $("#images img").stop(true) } );
	}	
}

//add onclick events
$( TDC.Thumbnails.addOnClicks );
$( TDC.Thumbnails.addHoverScroll );






