// $(document).on('DOMContentLoaded',function(){
//    $.ajax({
//      url:"http://127.0.0.1:8081/getdata",
//      method:'GET',
//      dataType: "jsonp"
//    }).done(function(data){
//
//    }).fail(function(xhr) {
//     alert(xhr.responseText);
//   })
// });


(function()
{
  var app = angular.module("tradeBlotter",['angular.filter']);
  app.controller("TradeBlotterCtrl",['$scope','$http','$sce',function(scope, http,sce) {
    var self = this;
    self.onplshow = false;
    self.listItem = [];
    var plValue =[];
    var url = "http://127.0.0.1:3000/getdata"
    var trustedUrl = sce.trustAsResourceUrl(url);
    http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
        .then(function(result){
       self.listItem = result.data.trades;
});
    self.calculatePl = function(){
      self.onplshow = true;
      var addheader = document.querySelector("#table-header");
     $(addheader).addClass("indent-table").append("<th>P/L</th>");
     var itemList = self.listItem;
     var cumpl=0,pl=0,diff;conct=[];
     var result = self.listItem.map(function(a){
       return a.Symbol;
     });
     result= $.unique(result);
    for(var i=0;i<result.length;i++){
       conct = conct.concat(_.filter(self.listItem,['Symbol',result[i]])).sort(function(a,b){
         return a.TxnId - b.TxnId;
       })  ;
     }
    var buyResult = _.filter(conct,['Action','Buy']);
    console.log(buyResult);
    var sellResult = _.filter(conct,['Action','Sell']);
    console.log(sellResult);
     conct.forEach(function(item){
        if(item.Action == 'Sell')
        {
          item.plval = 'str';
        }
     });
     plCalculate(buyResult,sellResult);
     var index =0;
     plValue.forEach(function(item){
      for(var p=index;p<conct.length;p++){
         index++;
         if(conct[p].plval){
            conct[p].plval = item;
            break;
         }
       }
     });
     console.log(conct);
    }
    var plCalculate  = function(arr1,arr2){
      for(var j=0;j<arr2.length;j++){
       diff = arr1[j].Quantity - arr2[j].Quantity;
      if(diff > 0){
        pl = (arr2[j].Price - arr1[j].Price)* arr2[j].Quantity; 
      }
      if(diff < 0){
        pl= (arr2[j].Price - arr1[j].Price)* arr1[j].Quantity;

      }
      if(diff == 0){
        pl= (arr2[j].Price - arr1[j].Price)* arr1[j].Quantity;
      }
      plValue.push(pl);
      }
    }
}]);
})();
