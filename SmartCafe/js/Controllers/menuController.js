'use strict';
angular.module("MoboCafe")
	.controller("menuController",menuController);

function menuController($scope, $rootScope,$http, SessionKeeper, $location) {
	console.log("InsideMenu Controller...");
	$scope.menuData = null;
	$scope.items = [];
	$rootScope.current = {}
	//$scope.checkout.quan = [];
	$scope.quantity = [1,2,3,4,5];
	$scope.quan = $scope.quantity[0];
	//$scope.checkout.quantity = $scope.items.value;
	$scope.checkbox = false;
	$scope.checkState = false;
	$scope.total = 0; //Grand Total Price
	$scope.isDisabled = true; //To disable the checkout button until total is greater than zero.
	$scope.isPayDisabled = true;
	$scope.abc = function(item){
		console.log(item);
		if(item.checkState){
			//alert("checked");

			$scope.items.push(item);
			console.log($scope.items);
			if($scope.items.length>0){
				$scope.isDisabled = false;
			}
		}else{
			//alert("unchecked");

			var del = $scope.items.indexOf(item);
			//var index = $scope.items.$index;
			$scope.items.splice(del,1);
			//alert(del);
			//$scope.items.splice
			if($scope.items.length==0){
				$scope.isDisabled = true;
			}
		}
		countTotal();
	};

	/*if(!($rootScope.current))
			$rootScope.current = SessionKeeper.read();
	console.log("Previous Controller::"+$rootScope.current.userData.results[0].empid);*/

	function getMenuDetails() {
		$http.get('json/menuList.json')
			.then(function(response) {
				console.log(response);
				$scope.menuData = response.data;
				console.log("menuData::"+$scope.menuData);
			})
			.catch(function(response){
				$scope.errorStatus= true;
				$scope.errorMessage = 'Menu Details not getting';
				console.log($scope.errorMessage);
			});
	}
	/*$scope.checkboxSelectionEvent = function(item)
	{
		console.log($scope.checkbox);
		if(item.checkbox) {
			console.log("Value selected...");
			$scope.items.push(item);
		}
		else {
			console.log("Value must be deleted"+item.itemId);
			var itr = 0;
			var loc = 0;
			//Finding the location of item which should be deleted.
			for(itr=0; itr<$scope.items.length; itr++){
				if(item.itemId == $scope.items[itr].itemId) {
					loc = itr;
				}
			}
			console.log("Loc::"+loc+"Length::"+$scope.items.length);
			//Deleting the unchecked item from list.
			for(itr=loc; itr<$scope.items.length-1; itr++){
				$scope.items[itr] = $scope.items[itr+1];
			}
			$scope.items.length = $scope.items.length-1;

		}
		countTotal();
		//printItems();
	};

	}
	function countTotal() {
		var itr = 0;
		var total = 0;
		for(itr=0; itr< $scope.items.length; itr++){
			console.log("Q::"+$scope.items[itr].quantity+" P::"+$scope.items[itr].price);
			total = total + ($scope.items[itr].quantity * $scope.items[itr].price);
		};
		$scope.total = total;
		console.log("+++Total::"+$scope.total);
		if($scope.total > 0){
			$scope.isDisabled = false;
			console.log("Button Enabled");
		}
		else {
			$scope.isDisabled = true;
		}
	};
	$scope.updateQuantity = function(param){
		//Finding the location of item whose quantity should be updated.
		var itr = 0;
		var loc = 0;
		for(itr=0; itr<$scope.items.length; itr++){
			if(param.itemId == $scope.items[itr].itemId) {
				loc = itr;
			}
			if($scope.total > 0){
				$scope.isDisabled = false;
			}
			else {
				$scope.isDisabled = true;
			}
		}
		console.log("Quality updated::"+ param.quantity);
		$scope.items[loc].quantity = param.quantity;
		countTotal();
	};

	$scope.paymentEvent = function() {
		console.log("Payment Done!!!!"+$rootScope.current.userData.results[0].empid);
		var info = {};
		var itr = 0;
		for(itr=0; itr<$scope.items.length; itr++) {
			info.empId = $rootScope.current.userData.results[0].empid;
			info.vendorId = $scope.items[itr].vendorId;
			info.itemId = $scope.items[itr].itemId;
			info.quantity = $scope.items[itr].quantity;
			$http.post('json/menu11.json',info)
			.then(function(response) {
				console.log(response);
				$scope.menuData = response.data;
				console.log("menuData::"+$scope.menuData);
			})
			.catch(function(response){
				$scope.errorStatus= true;
				$scope.errorMessage = 'Menu Details not getting';
				console.log($scope.errorMessage);
			});
		}

	}*/
	function countTotal() {
		var itr = 0;
		var total = 0;
		for(itr=0; itr< $scope.items.length; itr++){
			console.log("Q::"+$scope.items[itr].quantity+" P::"+$scope.items[itr].price);
			total = total + ($scope.items[itr].quantity * $scope.items[itr].price);
		};
		$scope.total = total;
		console.log("+++Total::"+$scope.total);
		if($scope.total > 0){
			//$scope.isDisabled = false;
			console.log("Button Enabled");
		}
		else {
			//$scope.isDisabled = true;
		}
	};
	function printItems() {
		var itr = 0;
		console.log("=====PRINTING========");
		console.log($scope.items.length);
		for(itr=0; itr<$scope.items.length; itr++) {
			console.log($scope.items[itr]);
		}
};
	$scope.updateQuantity = function(param){
		//Finding the location of item whose quantity should be updated.
		var itr = 0;
		var loc = 0;
		console.log(param);
		for(itr=0; itr<$scope.items.length; itr++){
			if(param.itemId == $scope.items[itr].itemId) {
				loc = itr;
			}
			console.log("Location:::::"+loc);
			if($scope.total > 0){
				//$scope.isDisabled = false;
			}
			else {
				//$scope.isDisabled = true;
			}
		}
		console.log("Quantity updated::"+ param.quantity);
		$scope.items[loc].quantity = param.quantity;
		printItems();
		countTotal();
	};
	$scope.checkoutOrder = function() {
		console.log("Checking out the order...");
		printItems();
		$rootScope.current.items = $scope.items;
		SessionKeeper.save();
		$location.path('/paymentSuccess');
	}

	function startApplication() {
		console.log("Starting application...");
		//var current = $rootScope.current;
		getMenuDetails();
	}

	startApplication();
}
