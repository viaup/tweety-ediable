
//modal dialog

function dialogHTML(){
 
    $("head").prepend($("<link rel='stylesheet' href='no-cms/menu_dialog/menu_dialog.css' type='text/css' media='screen' />"));
    $("body").attr("oncontextmenu", "return false");
    
    $.get( "no-cms/menu_dialog/menu_dialog.html", function( data ) {
      $( "body" ).append( data );
            renderChartHForm();   
    dialogEvents();
    });
    


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
              renderChartH(el);

              $(".close")[0].click();
              $(".close").mousedown();

          });
}





//render templates



function renderChartH(el){
 
        $(el).append("<div class='chart-container' id='visu-horaire2'></div>");
    
var dataTweetsHour = [
    {
        name: 'Tweets par heure du jour',
        values: [218, 87, 14, 13, 254, 45, 23, 12],
        labels: [218, 87, 14, 13, 254, 45, 23, 12]
    }
];

var hours = moby.init({
    containerSelector: '#visu-horaire2'
})
    .setConfig({
        type: 'bar2D',
        tooltipFormatter: function(d, i) {
            return d.values + ' tweets';
        },
        labelFormatter: function(d, i) {
            return '<span class="label-title"> ' + d.labels[i] + '</span>';
        }
    })
    .render(dataTweetsHour);
     


}

function renderChartHForm(){
    var dataTweetsHour = 
    {
        name: 'Tweets par heure du jour',
        values: [218, 87, 14, 13, 2, 45, 23, 12],
        labels: [0, 1, 2, 3, 4, 5, 45, 12]
    };

    var dataValues = dataTweetsHour.values;
    var dataLabels = dataTweetsHour.labels;
    
    for (i=0; i< dataValues.length; i++){
        
        $("#chartH").append('<span class ="chartHName"> donnée: </span><input type="text" class="chartHNameInput" value="' + dataValues[i] + '">')
                    .append('<span class ="chartHLabel"> étiquette : </span><input type="text" class="chartHLabelInput" value="' + dataLabels[i] + '"><br/>')
    
    }


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


        