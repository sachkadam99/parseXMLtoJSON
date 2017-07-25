angular.module('productService', [])
    .service('productService', function(productFactory) {

        this.products = {};

        this.getAllProducts = function() {
        	return this.products;
        }       

        this.xmlTransform = function(data,status) {
            var x2js = new X2JS();
            var json = x2js.xml_str2json(data);
            return (json != null && json != undefined) ? json.products : false;
        };

        this.setData = function(data) {
            if(data == 'error') {
                this.products = [];
            }
            else {
                this.products = data.data;
                store.set('Products', this.products);
            }
        }

        this.getStroredData = function() {
            this.products = store.get('Products');
            return this.products.product;
        }

        this.getProductsFromURL = function( url) {
            this.products = {};
            this.getProducts(url);
            return this.getStroredData(); 
        }

        this.getProductByID = function ( productID ) {
            var items = this.products.product;
            var build = false;

            angular.forEach(items, function (item) {
                if  (item.productID === productID) {
                    build = item;
                }
            });
            return build;
        }

        this.getProducts = function(SOURCE_FILE) {
            productFactory.get(SOURCE_FILE,this.setData,this.xmlTransform);
        }        

        this.init = function() {
            var SOURCE_FILE = "data/productfeed.xml";
            this.getProducts(SOURCE_FILE);
        }

        this.init();
});