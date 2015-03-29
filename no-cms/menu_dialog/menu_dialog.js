
//modal dialog

function dialogHTML(){
 
    $("head").append($("<link rel='stylesheet' href='menu_dialog/menu_dialog.css' type='text/css' media='screen' />"));

    $("body").append(
      '<div style="display:none; "   id="contextMenu">' +
        
            '<div class="ContextTitle">Ajouter :</div>' +
            '<div class="ContextItem"><a href="#openImage" class="ContextLink">Image</a></div>' +
            '<div class="ContextItem"><a href="#openVideo" class="ContextLink">Video</a></div>' +
            '<div class="ContextItem"><a href="#openBarChartH" class="ContextLink">Diagramme horizontal</a></div>' +
        '</div>' +
        
        '<div id="openImage" class="modalDialog">' +
	       '<div>' +
		      '<a href="#close" title="Close" class="close">X</a>' +
		      '<h2>Nouvelle image</h2>' +
		      '<p>Entrer le chemin de l\'image :</p>' +
		      '<input type="text" class="dialogInput" id="imageInput" placeholder="chemin/de/l\'image">' +
		      '<div id="previewImage" class="preview"></div>' +
	       '</div>' +
        '</div>' +

        '<div id="openVideo" class="modalDialog">' +
	       '<div>' +
		      '<a href="#close" title="Close" class="close">X</a>' +
		      '<h2>Nouvelle vidéo</h2>' +
		      '<p>Entrer le chemin de la vidéo :</p>' +
		      '<input type="text" class="dialogInput" id="videoInput" placeholder="chemin/de/la/video">' +
		      '<div id="previewVideo" class="preview"></div>' +
	       '</div>' +
        '</div>' +

        
        '<div id="openBarChartH" class="modalDialog">' +
            '<div>' +
              '<a href="#close" title="Close" class="close">X</a>' +
              '<h2>Ajout d\'un diagramme horizontal</h2>' +
              '<p>Entrer les données :</p>' +
              '<div id="chartH"></div>' +
              '<div id="previewChartH" class="preview"></div>' +
           '</div>' +
        '</div>' +
    
        '<script id="barChartHTemplate" type="text/x-jsrender">' +
                    '<span class ="chartHName"> donnée: </span><input type="text" class="chartHNameInput" value="{{>name}}">' +
                    '<span class ="chartHValue"> valeur : </span><input type="text" class="chartHValueInput" value="{{>value}}">' +
                    '<span class ="chartHLabel"> étiquette : </span><input type="text" class="chartHLabelInput" value="{{>label}}"><br/>' +
  
            
        '</script>'


    );
    renderChartHTemplate();
         


}

function dialogEvents(){
    
    $( ".modalDialog" ).on("mousedown", function() {
      HideMenu('contextMenu');
    });

    $( ".close" ).on("mousedown", function() {
      $(".dialogInput").val("");
      $(".preview").html("");
      $(".button").html("Prévisualiser");
    });
    
    $("body *").focus(function() {
        $( "body").on( "click", function() {
            HideMenu('contextMenu');
        });
        
        $( "#src-content").on( "contextmenu", function() {
            ShowMenu('contextMenu',event);
            $( "#imageInput" ).off();
            $( "#videoInput" ).off();
            selectImage(event.toElement);
            selectVideo(event.toElement);
            selectChartH(event.toElement);
        });
    });
}



function selectImage(el){
     
   $( "#imageInput" ).keyup( function(event) {
      if ($("#previewImage").children()[0]){ //s'il y a un bouton
        $("#imagebtn").text("Prévisualiser");
        if($("#previewImage").children()[1]){
            $("#previewImage").children()[1].remove();
        }
          
      }else{
        $("#previewImage").append("<div class='button' id='imagebtn'>Prévisualiser</div>");
          $( "#imagebtn" ).on( "click", function() {
            var path= $("#imageInput").val();
            if($(this).text()==="Ajouter"){             
              $(el).append("<img src='" + path + "'width='100%'>");
              $(".close")[0].click();
              $(".close").mousedown();
            }else{
              if (path){
                 $("#previewImage").append("<img src='" + path + "' width='180'>");
                 $(this).text("Ajouter");
              }
            }
          });
       }
  });
}

function selectVideo(el){

   $( "#videoInput" ).keyup( function(event) {
    
      if ($("#previewVideo").children()[0]){ //s'il y a un bouton  
        $("#videobtn").text("Prévisualiser");
        if($("#previewVideo").children()[1]){
            $("#previewVideo").children()[1].remove();
        }
      }else{
        $("#previewVideo").append("<div class='button' id='videobtn'>Prévisualiser</div>");
          $( "#videobtn" ).on( "click", function() {
            var path= $("#videoInput").val();
            if($(this).text()==="Ajouter"){

              $(el).append("<div class='videoWrapper'>" + path + "</div");
              $(".close")[0].click();
              $(".close").mousedown();
            }else{
              if (path){
                 $("#previewVideo").append("<div class='videoWrapper'>" + path + "</div");
                
                 $(this).text("Ajouter");
              }
            }
          });
       }
  });
}

function selectChartH(el){
    
    $("#previewChartH").children().remove();

    $("#previewChartH").append("<div class='button' id='chartHbtn'>Ajouter</div>");
    
          
          $( "#chartHbtn" ).on( "click", function() {
              
              var data = [];
              var names = $(".chartHNameInput");
              var values = $(".chartHValueInput");
              var label = $(".chartHLabelInput");
              for (i=0; i<names.length; i++){
                  var line = {};
                  line = {name : names.eq(i).val() , value : parseInt(values.eq(i).val()) , label : label.eq(i).val() };
                  data[i]= line;      
              }
              renderChartH(el, data);
              $(".close")[0].click();
              $(".close").mousedown();

          });
}





//render templates

function renderChartHTemplate(){
     
        	var chartHData = [
						{name: '#HabsDC', value: 525, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas diam'},
						{name: '#polmtl', value: 213, label: 'Arcu, dictum tincidunt interdum quis'},
						{name: '#CMJ2015', value: 110, label: 'Lobortis at lacus.'},
						{name: '#Montreal', value: 74, label: 'Aliquam sit amet velit ac urna auctor'},
						{name: '#Sotchi2014', value: 53, label: 'Sagittis sit amet ut nisl.'},
						{name: '#Montréal', value: 53, label: 'Nullam aliquet turpis eget arcu molestie viverra.'},
						{name: '#montreal', value: 46, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
						{name: '#RIP', value: 32, label: 'Maecenas diam arcu, dictum tincidunt'},
						{name: '#cmmtl', value: 23, label: 'Interdum quis, lobortis at lacus'},
						{name: '#polqc', value: 23, label: 'Aliquam sit amet'}
        	];

    var html = $("#barChartHTemplate").render(chartHData);
//    console.log($("#chartH"));
    $("#chartH").html(html);

}

function renderChartH(el, data){
     
        	var dataHashtags = [
						{name: '#HabsDC', value: 525, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas diam'},
						{name: '#polmtl', value: 213, label: 'Arcu, dictum tincidunt interdum quis'},
						{name: '#CMJ2015', value: 110, label: 'Lobortis at lacus.'},
						{name: '#Montreal', value: 74, label: 'Aliquam sit amet velit ac urna auctor'},
						{name: '#Sotchi2014', value: 53, label: 'Sagittis sit amet ut nisl.'},
						{name: '#Montréal', value: 53, label: 'Nullam aliquet turpis eget arcu molestie viverra.'},
						{name: '#montreal', value: 46, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
						{name: '#RIP', value: 32, label: 'Maecenas diam arcu, dictum tincidunt'},
						{name: '#cmmtl', value: 23, label: 'Interdum quis, lobortis at lacus'},
						{name: '#polqc', value: 23, label: 'Aliquam sit amet'}
        	];
            
            console.log(dataHashtags);
            console.log(data);
           

					var bars = listVis()
						.setConfig({
							containerSelector: el,
							height: 30,
							type: 'bar'
						})
						.render(data.map(function(){ return {}; }));
            
         

					var renderDebounced = listVis.debounce(function(){ bars.render(data); }, 300);
					var containerPosY = $(el).position().top;
					$(window).on('scroll', function() {
						var scrollY = window.pageYOffset + $(window).height();
						if(scrollY > containerPosY) {
							renderDebounced();
						}
					});

}

//context menu 
function ShowMenu(control, e) {

    var posx = e.clientX + window.pageXOffset +'px'; //Left Position of Mouse Pointer
    var posy = e.clientY + window.pageYOffset + 'px'; //Top Position of Mouse Pointer
    document.getElementById(control).style.position = 'absolute';
    document.getElementById(control).style.display = 'inline';
    document.getElementById(control).style.left = posx;
    document.getElementById(control).style.top = posy;  
    return false;
}
function HideMenu(control) {

    document.getElementById(control).style.display = 'none';
    return false;
}


        