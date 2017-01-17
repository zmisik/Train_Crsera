(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
// .controller('AlreadyBoughtController', AlreadyBoughtController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems',FoundItems)
.directive('myTag',MyTag);

function MyTag () {
  var ddo = {
      templateURL: 'foundItems.html'
  };
  console.log("mytag ddo...init")
  return ddo;
};
function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      myTitle: '@title',
      //badRemove: '=',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}
function FoundItemsDirectiveController() {
  var list = this;
  console.log (this);

  list.Error = function () {
    // for (var i = 0; i < list.items.length; i++) {
    //   var name = list.items[i].name;
    //   if (name.toLowerCase().indexOf("cookie") !== -1) {
    //     return true;
    //   }
    // }
  //   if (list.items.length == 0) {
  //   return true;
  // } else {
  //   return false;
  // }
  };
}



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var NarrowItDown = this;
NarrowItDown.DGetList = function (searchTerm) {
  var founditems1 = [];

  var promise = MenuSearchService.dgetMatchedMenuItems(searchTerm)

  //console.log ("Not wait:",  promise)

//   promise.then(function (response){
//     console.log (response);
//   }
// )
promise.then(function (response) {
  console.log(response.data);
})
  // promise.then(function (response) {
  //     //console.log (response)
  // })
  // .catch(function (error) {
  //   console.log("Something went terribly wrong.");
  // });

};
NarrowItDown.Error = function () {

  return True
};

NarrowItDown.removeitem = function (itemIndex) {
  NarrowItDown.items.splice(itemIndex, 1);
  console.log("'this' is: ", itemIndex);

};

NarrowItDown.GetList = function (searchTerm) {
//console.log(searchTerm)
var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
promise.then(function (response) {
  var found= [];
  var filtereditems = [];
  var k = 0;
  //console.log (response);
  //NarrowItDown.items = response.data;
  found = response.data.menu_items;
//
  for (var i = 0; i < found.length; i++) {
  //    //totalStringValue += string.charCodeAt(i);
  if (found[i].name.indexOf(searchTerm) !== -1) {
    //console.log(string.indexOf(substring) !== -1);
    filtereditems[k] = found[i]
    //console.log ("found:",found[i].name)
      k++
  //console.log (found[i].name)
  };
  //    //found(i) = response(i)

  };
  if (searchTerm!=0) {
  NarrowItDown.items = filtereditems}
  else {
      NarrowItDown.items = [];
  }

  //console.log (filtereditems);
  console.log ("From " + found.length + " pcs Found: " +k +" items out of filter")
    return filtereditems;
})
.catch(function (error) {
  console.log("Something went terribly wrong.");
});


}


  };

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService ($http, ApiBasePath) {
 var service=this;

 service.getMenuCategories = function () {
   var response = $http({
     method: "GET",
     url: (ApiBasePath + "/categories.json")
   });

   return response;
 };

 service.getMatchedMenuItems = function (searchTerm) {
   //menu_items.json
   var found = [];
    console.log("Service search term:" + searchTerm)
     var response = $http({
       method: "GET",
       url: (ApiBasePath + "/menu_items.json")

     });

    //  response.then(function (result) {
    //    CONSOLE.log (result)
    //     return result;
    //  });
    //console.log (response)
    return response


};

service.dgetMatchedMenuItems = function (searchTerm) {

    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")

    });

    promise.then(function (response) {
        var founditems = [];
        var found = [];
        var k = 0;
        //console.log ("dummy:" ,response.data)
        found = response.data.menu_items;
      //
        for (var i = 0; i < found.length; i++) {
        //    //totalStringValue += string.charCodeAt(i);
        if (found[i].name.indexOf(searchTerm) !== -1) {
          //console.log(string.indexOf(substring) !== -1);
          founditems[k] = found[i]
          //console.log ("found:",found[i].name)
            k++
        //console.log (found[i].name)
        };
        //    //found(i) = response(i)

        };
        //NarrowItDown.items = filtereditems;
        console.log (founditems);
        return founditems;

      }, function (errorResponse) {
      console.log(errorResponse.message);
    });
  };



};



})();
