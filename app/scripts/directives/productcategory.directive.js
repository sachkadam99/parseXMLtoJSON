angular.module('productCategory',[])
	.directive("productCategory", function() {
	return {
		restrict: "E",
		template: '<div class="product-categories"><span>{{maincategory.__text}}<span> &gt; </span></span><span>{{subcategoriesName}}</span></div>',
		replace : true,
		scope: {
			maincategory: "=",
			subcategory: "="
		},
		link: function(scope) {
			 for (var i = 0; i < scope.subcategory.field.length; i++) {
				if(scope.subcategory.field[i]._name == 'subcategories'){
					scope.subcategoriesName = scope.subcategory.field[i].__text;
				}
			 }
		}
	}
});