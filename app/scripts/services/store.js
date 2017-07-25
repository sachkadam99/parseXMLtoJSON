var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

(function(win){
	var store = {},
		doc = win.document,
		localStorageName = 'localStorage',
		scriptTag = 'script',
		storage;

	store.disabled = false;
	store.set = function(key, value) {};
	store.get = function(key) {};
	store.remove = function(key) {};
	store.clear = function() {};
	store.transact = function(key, defaultVal, transactionFn) {
		var val = store.get(key);
		if (transactionFn == null) {
			transactionFn = defaultVal;
			defaultVal = null;
		}
		if (typeof val == 'undefined') { val = defaultVal || {}; }
		transactionFn(val);
		store.set(key, val);
	}
	store.getAll = function() {};
	store.forEach = function() {};

	store.serialize = function(value) {
		return JSON.stringify(value);
	}
	store.deserialize = function(value) {
		if (typeof value != 'string') { return undefined; }
		try { return JSON.parse(value); }
		catch(e) { return value || undefined; }
	}

	store.sizeof = function(object){
		// initialise the list of objects and size
		var objects = [object];
		var size = 0;
		// loop over the objects
		for (var index = 0; index < objects.length; index++) {
			// determine the type of the object
			switch (typeof objects[index]) {
				// the object is a boolean
				case 'boolean':
					size += 4;
					break;
					// the object is a number
				case 'number':
					size += 8;
					break;
					// the object is a string
				case 'string':
					size += 2 * objects[index].length;
					break;
					// the object is a generic object
				case 'object':
					// if the object is not an array, add the sizes of the keys
					if (Object.prototype.toString.call(objects[index]) != '[object Array]') {
						for (var key in objects[index]) size += 2 * key.length;
					}
					// loop over the keys
					for (var key in objects[index]) {
						// determine whether the value has already been processed
						var processed = false;
						for (var search = 0; search < objects.length; search++) {
							if (objects[search] === objects[index][key]) {
								processed = true;
								break;
							}
						}
						// queue the value to be processed if appropriate
						if (!processed) objects.push(objects[index][key]);
					}
			}

		}
		// return the calculated size
		return size;
	}
	function isLocalStorageNameSupported() {
		try { return (localStorageName in win && win[localStorageName]); }
		catch(err) { return false; }
	}

	if (isLocalStorageNameSupported()) {
		storage = win[localStorageName];
		store.set = function(key, val) {
			if (val === undefined) { return store.remove(key); }
			storage.setItem(key, store.serialize(val));
			if(store.sizeof(val) < 100) {
				docCookies.setItem(key, store.serialize(val));
			}            
			return val;
		}
		store.get = function(key) {
			var res = "";
			res = store.deserialize(docCookies.getItem(key));
			if(res && (key && key == "originCountry")) {
				res = res.replace("http://", "https://");
				res = res.replace(":8080/", ":8443/");
				res = res.replace(":80/", ":443/");
			}
            if(!res) {
            	res = store.deserialize(storage.getItem(key));
				if(res && (key && key == "originCountry")) {
					res = res.replace("http://", "https://");
					res = res.replace(":8080/", ":8443/");
					res = res.replace(":80/", ":443/");
				}
                return res;
            } else
                return res;
        }
		store.remove = function(key) { storage.removeItem(key); docCookies.removeItem(key); }
		store.clear = function() { storage.clear(); document.cookie = ''; }
		store.getAll = function() {
			var ret = {};
			store.forEach(function(key, val) {
				ret[key] = val;
			})
			return ret;
		}
		store.forEach = function(callback) {
			for (var i=0; i<storage.length; i++) {
				var key = storage.key(i);
				callback(key, store.get(key));
			}
		}
	} else if (doc.documentElement.addBehavior) {
		var storageOwner,
			storageContainer;
		try {
			storageContainer = new ActiveXObject('htmlfile');
			storageContainer.open();
			storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>');
			storageContainer.close();
			storageOwner = storageContainer.w.frames[0].document;
			storage = storageOwner.createElement('div');
		} catch(e) {
			storage = doc.createElement('div');
			storageOwner = doc.body;
		}
		function withIEStorage(storeFunction) {
			return function() {
				var args = Array.prototype.slice.call(arguments, 0);
				args.unshift(storage);
				storageOwner.appendChild(storage);
				storage.addBehavior('#default#userData');
				storage.load(localStorageName);
				var result = storeFunction.apply(store, args);
				storageOwner.removeChild(storage);
				return result;
			}
		}

		var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
		function ieKeyFix(key) {
			return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___');
		}
		store.set = withIEStorage(function(storage, key, val) {
			key = ieKeyFix(key);
			if (val === undefined) { return store.remove(key); }
			storage.setAttribute(key, store.serialize(val));
			storage.save(localStorageName);
			return val;
		})
		store.get = withIEStorage(function(storage, key) {
			key = ieKeyFix(key);
			var res = store.deserialize(storage.getAttribute(key));
			if(res && (key && key == "originCountry")) {
				res = res.replace("http://", "https://");
				res = res.replace(":8080/", ":8443/");
				res = res.replace(":80/", ":443/");
			}
			return res;
		})
		store.remove = withIEStorage(function(storage, key) {
			key = ieKeyFix(key);
			storage.removeAttribute(key);
			storage.save(localStorageName);
		})
		store.clear = withIEStorage(function(storage) {
			var attributes = storage.XMLDocument.documentElement.attributes;
			storage.load(localStorageName);
			for (var i=0, attr; attr=attributes[i]; i++) {
				storage.removeAttribute(attr.name);
			}
			storage.save(localStorageName);
		})
		store.getAll = function(storage) {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val;
			})
			return ret;
		}
		store.forEach = withIEStorage(function(storage, callback) {
			var attributes = storage.XMLDocument.documentElement.attributes;
			for (var i=0, attr; attr=attributes[i]; ++i) {
				callback(attr.name, store.deserialize(storage.getAttribute(attr.name)));
			}
		})
	}

	try {
		var testKey = '__storejs__';
		store.set(testKey, testKey);
		if (store.get(testKey) != testKey) { store.disabled = true; }
		store.remove(testKey);
	} catch(e) {
		store.disabled = true;
	}
	store.enabled = !store.disabled;

	// iOS in private mode => use cookies
	// usees Mozilla's docCookies
	// docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
	// docCookies.getItem(name)
	// docCookies.removeItem(name[, path], domain)
	// docCookies.hasItem(name)
	// docCookies.keys()
	if((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/android/i)) && !store.enabled) {

		store.storage = [];
		store.set = function(key, val) {
			if (val === undefined) { 
				return store.remove(key);
			}
			docCookies.setItem(key, store.serialize(val));
			store.storage.push(key);
			return val
		}
		store.get = function(key) { 
			var res = store.deserialize(docCookies.getItem(key));
			if(res && (key && key == "originCountry")) {
				res = res.replace("http://", "https://");
				res = res.replace(":8080/", ":8443/");
				res = res.replace(":80/", ":443/");
			}
			return res; 
		}
		store.remove = function(key) { 
			docCookies.removeItem(key);
		}
		store.clear = function() { 
			document.cookie = '';
		}
		store.getAll = function() {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val;
			})
			return ret
		}
		store.forEach = function(callback) {
			for (var i = 0; i < store.storage; i++) {
				var key = store.storage[i];
				callback(key, store.get(key));
			}
		}
	}

	if (typeof module != 'undefined' && module.exports && this.module !== module) { module.exports = store; }
	else if (typeof define === 'function' && define.amd) { define(store); }
	else { win.store = store; }

})(Function('return this')());