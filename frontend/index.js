$(document).on('DOMContentLoaded',function(){
   $.ajax({
     url:"http://127.0.0.1:8081/getdata",
     method:'GET',
     dataType: "jsonp"
     jsonpCallback:"callback"
   }).done(function(data){
     console.log(data);
   }).fail(function(xhr) {
    alert("failed");
  })
});
