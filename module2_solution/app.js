(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var  ToBuy = this;
  ToBuy.items = ShoppingListCheckOffService.getItems();

  ToBuy.removeItem = function (itemIndex) {
  ShoppingListCheckOffService.removeItem(itemIndex);
  ToBuy.ErrMessage = ShoppingListCheckOffService.GetEmptyMessage();

  };

};
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var AlreadyBought = this;
  AlreadyBought.items= ShoppingListCheckOffService.getBoughtItems();
};


function ShoppingListCheckOffService () {
  var service=this;
  var Items = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    }
  ];
  var boughtlist = [];

  service.removeItem = function (itemIndex) {

     var BoughtItem = {
       name: Items[itemIndex].name,
       quantity:Items[itemIndex].quantity
     };

     boughtlist.push(BoughtItem);
     Items.splice(itemIndex, 1);


   };
  service.getItems = function () {
    return Items;
  };

  service.GetItemCount = function () {
    return Items.length
  };
  service.GetEmptyMessage = function() {
      return Items.length == 0
  };
  service.getBoughtItems = function () {
    return boughtlist;
  };
  service.getBoughtItem_count = function () {
    // if (!boughtlist) {
    //   return 0
    // } else {
    // return boughtlist.length};
    console.log (boughtlist.length);
    return boughtlist.length;
  };
}


})();
