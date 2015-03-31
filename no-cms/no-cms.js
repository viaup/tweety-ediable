      


window.onload = function(event){

    
    
    $("body").prepend($("<div id='menu'></div>"));
    $("body").prepend($("<div id='editable'>Modifier</div>"));
    $("#editable").on( "click", function() {
        if($("#editable").css("color")=="rgb(255, 0, 0)"){
              $("body").children().attr("contenteditable", "false");
            $( ".modalDialog" ).removeAttr("contenteditable");
            $( "#contextMenu" ).removeAttr("contenteditable");
            $("#editable").css("color", "grey").html("Modifier");
           saveToGitHub();
        }
        else{

            $("#editable").css("color", "red").html("Enregistrer");
              $("body").children().attr("contenteditable", "true");
            $( ".modalDialog" ).removeAttr("contenteditable");
            $( "#contextMenu" ).removeAttr("contenteditable");
             
        }

    });  
    
   
    dialogHTML();
     
  };





function saveToGitHub(){
    
    var username="viaup";
    var reponame= "tweety-ediable";
    var content = document.documentElement.outerHTML;
    var contentEncoded = unescape( encodeURIComponent(content)) ;

    
    var github = new Github({
      username: "viaup",
      password: "***",
      auth: "basic"
    });
    
    var repo = github.getRepo(username, reponame);
    
    var commitMsg = prompt("Sauvegarder sous :");
//    repo.remove('gh-pages', 'test.html', function(err) {  
//    repo.write('gh-pages', 'test.html', contentEncoded, commitMsg, function(err) {console.log("write avec succès si pas d'erreur : " + err)});    
    
    
    

}

