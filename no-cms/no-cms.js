/*Au chargement :

Si fichier content.html, charger le contenu dans le body --> fait
Sinon, créé content à partir du body et effacer body. --> à faire plus tard

À l’enregistrement :

remove file content.html avec API github
enregistrer le contenu du body avec write file dans content.html avec API github*/        



window.onload = function(event){

    addEditable();
     
  };

function addEditable(){

           
    $("#editable").on( "click", function() {
        if($("#editable").css("color")=="rgb(255, 0, 0)"){
              $("body").children().attr("contenteditable", "false");
    //        $(".bloc").attr("contenteditable", "false");
    //        $(".intro").attr("contenteditable", "false");
    //        $("h1").attr("contenteditable", "false");
    //        $(".author").attr("contenteditable", "false");
            $("#editable").css("color", "grey").html("Modifier");
            saveToGitHub();
            //postDataToGoogle(0);
        }
        else{

            $("#editable").css("color", "red").html("Enregistrer");
              $("body").children().attr("contenteditable", "true");
    //        $(".bloc").attr("contenteditable", "true");
    //        $("h1").attr("contenteditable", "true");
    //        $(".author").attr("contenteditable", "true");
    //        $(".intro").attr("contenteditable", "true");
        }

    });    
    

    
    
}





//});


function saveToGitHub(){



}


/*
function postDataToGoogle(i) {
            

    var titre = $('h1').html();
    var auteur = $('.author').html();
    var intro = $('.intro').html();
    var bloc = $('.bloc').eq(i).html();
    var blocid = $('.bloc').eq(i).attr('id');
    
    
        $.ajax({
            url: "https://docs.google.com/a/radio-canada.ca/forms/d/1_ocbzdeLJh_j2oi4uytdWL70PA8loW6D9DlcDmlgF0g/formResponse",
            data: { "entry.483732107": titre, 
            "entry.144175306": auteur, "entry.650582967": intro, "entry.241530005": bloc, 
            "entry_1432671817": blocid},
            type: "POST",
            dataType: "jsonp",
            jsonpCallback:function () {
                    i++;
                    if(i<$('.bloc').length){
                        postDataToGoogle(i);
                    }
                    else{
                        $("#editable").css("color", "grey").html("Modifier");
                    }

                },
            statusCode: {
                0: function () {
                    alert("statusCode 0");
                },
                200: function () {
                    
                }
            }
        });

         
            
            
};

function renderTemplate(blocs){

    $("#titleView").html(
        $("#titleTemplate").render(blocs[0])

    );
        
    $("#textView").html(
        $("#textTemplate").render(blocs)

    );

};

//to compare time stamp to know the last entries
function timeStampToInt(dataFeed, i){
    
        var horo=dataFeed[i]['gsx$horodatage']['$t'];
        var intHoro= parseInt(horo.split(":")[1] + horo.split(":")[2]);
        return intHoro;


};*/