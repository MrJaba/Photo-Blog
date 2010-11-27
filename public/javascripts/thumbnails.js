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
	}
	
}

//add onclick events
$( TDC.Thumbnails.addOnClicks );






