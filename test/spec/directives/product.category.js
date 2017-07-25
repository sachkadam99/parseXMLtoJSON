describe('productCategory', function () {
    //var element; 
    var product = {
      "categories": {
        "category": {
          "_path": "accessoires",
          "__text": "accessoires"
        }
      },
      "additional": {
        "field": [
          {
            "_name": "brand",
            "__text": "HP"
          },
          {
            "_name": "producttype",
            "__text": "3 jaar Accidental Damage Protection met omruilservice op de volgende w"
          },
          {
            "_name": "deliveryCosts",
            "__text": "0.00"
          },
          {
            "_name": "SKU",
            "__text": "UG054E"
          },
          {
            "_name": "brand_and_type",
            "__text": "HP UG054E"
          },
          {
            "_name": "stock",
            "__text": "Op voorraad"
          },
          {
            "_name": "thumbnailURL",
            "__text": "https://www01.cp-static.com/objects/thumb_pic/6/68f/182678_aanvullende-garantie-hp-3-jaar-accidental-damage-protection-met-omruilservice-op-de-volgende-werkdag-ug054e.jpg"
          },
          {
            "_name": "deliveryTime",
            "__text": "1 werkdag"
          },
          {
            "_name": "imageURLlarge",
            "__text": "https://www01.cp-static.com/objects/high_pic/6/68f/182678_aanvullende-garantie-hp-3-jaar-accidental-damage-protection-met-omruilservice-op-de-volgende-werkdag-ug054e.jpg"
          },
          {
            "_name": "categoryURL",
            "__text": "http://www.centralpoint.nl/tracker/index.php?tt=534_251713_1_&r=http%3A%2F%2Fwww.centralpoint.nl%2Faanvullende-garantie%2F"
          },
          {
            "_name": "subcategories",
            "__text": "aanvullende garantie"
          },
          {
            "_name": "subsubcategories"
          },
          {
            "_name": "ean",
            "__text": "4053162118492"
          }
        ]
      }
    };
    
      var scope, compile;

      beforeEach(module('TradeTrackerFeederApp'));

      beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        compile = $compile;
      }));

      function createDirective() {
        var elem, compiledElem;
        elem = '<product-category maincategory="maincategory" subcategory="subcategory"></product-category>';
        compiledElem = compile(elem)(scope);
        scope.$digest();

        return compiledElem;
      }

      it('should set button clean', function() {

        var el = createDirective();

        scope.maincategory = product.categories.category;
        scope.subcategory = product.additional;
        scope.$apply();

        expect(el.hasClass('product-categories')).toBe(true);
      });
});