// Generated by Haxe 3.4.0
(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
};
var Lambda = function() { };
Lambda.exists = function(it,f) {
	var x = it.iterator();
	while(x.hasNext()) if(f(x.next())) {
		return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.prototype = {
	iterator: function() {
		return new _$List_ListIterator(this.h);
	}
};
var _$List_ListNode = function() { };
var _$List_ListIterator = function(head) {
	this.head = head;
};
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
};
var Main = function() {
	console.log("[Haxe] crossplatform loading data example");
	var req = new haxe_Http("http://ip.jsontest.com/");
	req.onData = function(data) {
		console.log("[Haxe] Your IP-address: " + JSON.parse(data).ip);
	};
	req.onError = function(error) {
		window.console.error("[Haxe] error: " + error);
	};
	req.request();
};
Main.main = function() {
	new Main();
};
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
	this.withCredentials = false;
};
haxe_Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) {
				return;
			}
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s != null && "undefined" !== typeof window) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) {
					if(r.responseText != null) {
						s = 200;
					} else {
						s = 404;
					}
				}
			}
			if(s == undefined) {
				s = null;
			}
			if(s != null) {
				me.onStatus(s);
			}
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				$bind(me,me.onData)(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else {
				switch(s) {
				case 12007:
					me.req = null;
					me.onError("Unknown host");
					break;
				case 12029:
					me.req = null;
					me.onError("Failed to connect to host");
					break;
				default:
					me.req = null;
					me.responseData = r.responseText;
					$bind(me,me.onError)("Http Error #" + r.status);
				}
			}
		};
		if(this.async) {
			r.onreadystatechange = onreadystatechange;
		}
		var uri = this.postData;
		if(uri != null) {
			post = true;
		} else {
			var _g_head = this.params.h;
			while(_g_head != null) {
				var val = _g_head.item;
				_g_head = _g_head.next;
				var p = val;
				if(uri == null) {
					uri = "";
				} else {
					uri += "&";
				}
				var s1 = p.param;
				var uri1 = encodeURIComponent(s1) + "=";
				var s2 = p.value;
				uri += uri1 + encodeURIComponent(s2);
			}
		}
		try {
			if(post) {
				r.open("POST",this.url,this.async);
			} else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else {
				r.open("GET",this.url,this.async);
			}
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			$bind(this,this.onError)(e1.toString());
			return;
		}
		r.withCredentials = this.withCredentials;
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) {
			r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		var _g_head1 = this.headers.h;
		while(_g_head1 != null) {
			var val1 = _g_head1.item;
			_g_head1 = _g_head1.next;
			var h1 = val1;
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) {
			onreadystatechange(null);
		}
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Browser = function() { };
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Main.main();
})();