/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement("a");
      originAnchor.href = location.href;
      var urlAnchor = document.createElement("a");

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // Make sure that the browser parses the URL and that the protocols and hosts match.
        return !urlAnchor.protocol || !urlAnchor.host ||
          (originAnchor.protocol + "//" + originAnchor.host !==
            urlAnchor.protocol + "//" + urlAnchor.host);
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on("pageshow.rails", function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function() {


}).call(this);
/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */

jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){var r=t.console;i[n]||(i[n]=!0,e.migrateWarnings.push(n),r&&r.warn&&!e.migrateMute&&(r.warn("JQMIGRATE: "+n),e.migrateTrace&&r.trace&&r.trace()))}function a(t,a,i,o){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(o),i},set:function(e){r(o),i=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=i}var i={};e.migrateWarnings=[],!e.migrateMute&&t.console&&t.console.log&&t.console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){i={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var o=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",o||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,i,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(o?a in o:e.isFunction(e.fn[a])))?e(t)[a](i):("type"===a&&i!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,i=e.prop(t,r);return i===!0||"boolean"!=typeof i&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,i))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init=function(t,n,a){var i;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(i=y.exec(e.trim(t)))&&i[0]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),i[3]&&r("$(html) HTML text after last tag is ignored"),"#"===i[0].charAt(0)&&(r("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(i[2],n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,i,o=this[0];return!o||"events"!==t||1!==arguments.length||(a=e.data(o,t),i=e._data(o,t),a!==n&&a!==i||i===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),i)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,i,o){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),i)for(c=function(e){return!e.type||j.test(e.type)?o?o.push(e.parentNode?e.parentNode.removeChild(e):e):i.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(i.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,T=e.fn.live,M=e.fn.die,S="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",C=RegExp("\\b(?:"+S+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,i){e!==document&&C.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,i)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,i=t.guid||e.guid++,o=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%o;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=i;a.length>o;)a[o++].guid=i;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),T?T.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),M?M.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||C.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(S.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);

/*
	* 2D & 3D Transitions for LayerSlider
	*
	* (c) 2011-2014 George Krupa, John Gera & Kreatura Media
	*
	* Plugin web:			http://kreaturamedia.com/
	* Licenses: 			http://codecanyon.net/licenses/
*/




eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('20 1Z={27:[{j:"13 N E",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"1e",a:G,h:"r"}},{j:"13 N r",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"1e",a:G,h:"E"}},{j:"13 N L",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"1e",a:G,h:"J"}},{j:"13 N J",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"1e",a:G,h:"L"}},{j:"26",d:1,g:1,f:{e:0,i:"o"},c:{n:"14",b:"1e",a:G,h:"r"}},{j:"Z R o",d:[2,4],g:[4,7],f:{e:1k,i:"o"},c:{n:"14",b:"z",a:G,h:"r"}},{j:"Z R D",d:[2,4],g:[4,7],f:{e:1k,i:"D"},c:{n:"14",b:"z",a:G,h:"r"}},{j:"Z R 1j-o",d:[2,4],g:[4,7],f:{e:1k,i:"1j-o"},c:{n:"14",b:"z",a:G,h:"r"}},{j:"Z R 1j-D",d:[2,4],g:[4,7],f:{e:1k,i:"1j-D"},c:{n:"14",b:"z",a:G,h:"r"}},{j:"Z R (k)",d:[2,4],g:[4,7],f:{e:1k,i:"k"},c:{n:"14",b:"z",a:G,h:"r"}},{j:"1y 1H N E",d:1,g:1s,f:{e:25,i:"D"},c:{n:"14",b:"1X",a:V,h:"r"}},{j:"1y 1H N r",d:1,g:1s,f:{e:25,i:"o"},c:{n:"14",b:"w",a:V,h:"r"}},{j:"1y 1H N L",d:1s,g:1,f:{e:25,i:"1j-D"},c:{n:"14",b:"w",a:V,h:"r"}},{j:"1y 1H N J",d:1s,g:1,f:{e:25,i:"1j-o"},c:{n:"14",b:"w",a:V,h:"r"}},{j:"1y Y N E",d:1,g:25,f:{e:1k,i:"D"},c:{n:"W",b:"w",a:1g,h:"r"}},{j:"1y Y N r",d:1,g:25,f:{e:1k,i:"o"},c:{n:"W",b:"w",a:1g,h:"E"}},{j:"1y 1W N L",d:25,g:1,f:{e:1k,i:"1j-D"},c:{n:"W",b:"w",a:1g,h:"J"}},{j:"1y Y N J",d:25,g:1,f:{e:1k,i:"1j-o"},c:{n:"W",b:"w",a:1g,h:"L"}},{j:"13 R m E (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"W",b:"z",a:1m,h:"E"}},{j:"13 R m r (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"W",b:"z",a:1m,h:"r"}},{j:"13 R m L (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"W",b:"z",a:1m,h:"L"}},{j:"13 R m J (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"W",b:"z",a:1m,h:"J"}},{j:"13 k R m k 1S",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"W",b:"z",a:1m,h:"k"}},{j:"13 d m E (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"W",b:"w",a:p,h:"E"}},{j:"13 d m E (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"W",b:"w",a:p,h:"E"}},{j:"13 d m E (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"W",b:"w",a:p,h:"E"}},{j:"13 d m r (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"W",b:"w",a:p,h:"r"}},{j:"13 d m r (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"W",b:"w",a:p,h:"r"}},{j:"13 d m r (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"W",b:"w",a:p,h:"r"}},{j:"13 d N J m L (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"W",b:"w",a:p,h:"L"}},{j:"13 d N J m L (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"W",b:"w",a:p,h:"L"}},{j:"13 d N L m J (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"W",b:"w",a:p,h:"J"}},{j:"13 d N L m J (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"W",b:"w",a:p,h:"J"}},{j:"13 P m L (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"W",b:"w",a:p,h:"L"}},{j:"13 P m L (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"W",b:"w",a:p,h:"L"}},{j:"13 P m L (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"W",b:"w",a:p,h:"L"}},{j:"13 P m J (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"W",b:"w",a:p,h:"J"}},{j:"13 P m J (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"W",b:"w",a:p,h:"J"}},{j:"13 P m J (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"W",b:"w",a:p,h:"J"}},{j:"13 P N r m E (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"W",b:"w",a:p,h:"E"}},{j:"13 P N r m E (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"W",b:"w",a:p,h:"E"}},{j:"13 P N E m r (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"W",b:"w",a:p,h:"r"}},{j:"13 P N E m r (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"W",b:"w",a:p,h:"r"}},{j:"Z v Y R m E (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"E"}},{j:"Z v Y R m r (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"r"}},{j:"Z v Y R m L (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"L"}},{j:"Z v Y R m J (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"J"}},{j:"Z v Y k R m k 1S",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"k"}},{j:"Z v Y R N J-r (o)",d:[2,4],g:[4,7],f:{e:1f,i:"o"},c:{n:"Q",b:"z",a:1m,h:"1V"}},{j:"Z v Y R N L-E (D)",d:[2,4],g:[4,7],f:{e:1f,i:"D"},c:{n:"Q",b:"z",a:1m,h:"21"}},{j:"Z v Y R N J-E (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"1T"}},{j:"Z v Y R N L-r (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"1U"}},{j:"Z v Y d m E (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"Q",b:"w",a:p,h:"E"}},{j:"Z v Y d m E (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"Q",b:"w",a:p,h:"E"}},{j:"Z v Y d m E (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"Q",b:"w",a:p,h:"E"}},{j:"Z v Y d m r (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"Q",b:"w",a:p,h:"r"}},{j:"Z v Y d m r (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"Q",b:"w",a:p,h:"r"}},{j:"Z v Y d m r (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"Q",b:"w",a:p,h:"r"}},{j:"Z v Y d N J m L (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"Q",b:"w",a:p,h:"L"}},{j:"Z v Y d N J m L (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"Q",b:"w",a:p,h:"L"}},{j:"Z v Y d N L m J (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"Q",b:"w",a:p,h:"J"}},{j:"Z v Y d N L m J (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"Q",b:"w",a:p,h:"J"}},{j:"Z v Y P m L (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"Q",b:"w",a:p,h:"L"}},{j:"Z v Y P m L (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"Q",b:"w",a:p,h:"L"}},{j:"Z v Y P m L (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"Q",b:"w",a:p,h:"L"}},{j:"Z v Y P m J (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"Q",b:"w",a:p,h:"J"}},{j:"Z v Y P m J (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"Q",b:"w",a:p,h:"J"}},{j:"Z v Y P m J (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"Q",b:"w",a:p,h:"J"}},{j:"Z v Y P N r m E (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"Q",b:"w",a:p,h:"E"}},{j:"Z v Y P N r m E (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"Q",b:"w",a:p,h:"E"}},{j:"Z v Y P N E m r (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"Q",b:"w",a:p,h:"r"}},{j:"Z v Y P N E m r (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"Q",b:"w",a:p,h:"r"}},{j:"1u",d:1,g:1,f:{e:0,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5}},{j:"1u d",d:4,g:1,f:{e:1f,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5}},{j:"1u g",d:1,g:4,f:{e:1f,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5}},{j:"1u R A",d:3,g:4,f:{e:1s,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5,y:x}},{j:"1u R F",d:3,g:4,f:{e:1s,i:"o"},c:{n:"Q",b:"1e",a:V,h:"J",1h:.5,u:-x}},{j:"1u-1I R A",d:3,g:4,f:{e:15,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5,y:x}},{j:"1u-1I R F",d:3,g:4,f:{e:15,i:"o"},c:{n:"Q",b:"1e",a:V,h:"J",1h:.5,u:-x}},{j:"1u 1I d",d:4,g:1,f:{e:1f,i:"o"},c:{n:"Q",b:"1e",a:V,h:"E",1h:.5}},{j:"1u 1I g",d:1,g:4,f:{e:1f,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5}},{j:"1c f N r",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"z",a:V,h:"E",y:x}},{j:"1c f N E",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"z",a:V,h:"r",y:-x}},{j:"1c f N J",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"z",a:V,h:"L",u:-x}},{j:"1c f N L",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"z",a:V,h:"J",u:x}},{j:"1c R N r",d:[3,4],g:[3,4],f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",y:x}},{j:"1c R N E",d:[3,4],g:[3,4],f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",y:-x}},{j:"1c R N J",d:[3,4],g:[3,4],f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",u:-x}},{j:"1c R N L",d:[3,4],g:[3,4],f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",u:x}},{j:"1c d N J",d:[6,12],g:1,f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",u:x}},{j:"1c d N L",d:[6,12],g:1,f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",u:-x}},{j:"1c g N r",d:1,g:[6,12],f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",y:-x}},{j:"1c g N E",d:1,g:[6,12],f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",y:x}},{j:"1v d N r",d:[3,10],g:1,f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",y:x}},{j:"1v d N E",d:[3,10],g:1,f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",y:-x}},{j:"1v g N J",d:1,g:[3,10],f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",u:-x}},{j:"1v g N L",d:1,g:[3,10],f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",u:x}},{j:"1v v 1z f N r",d:1,g:1,f:{e:q,i:"o"},c:{n:"Q",b:"z",a:V,h:"E",1h:.1,1r:-x,y:x}},{j:"1v v 1z f N E",d:1,g:1,f:{e:q,i:"o"},c:{n:"Q",b:"z",a:V,h:"r",1h:.1,1r:x,y:-x}},{j:"1v v 1z R N r",d:[3,4],g:[3,4],f:{e:19,i:"o"},c:{n:"Q",b:"z",a:V,h:"E",1r:-1w}},{j:"1v v 1z R N E",d:[3,4],g:[3,4],f:{e:19,i:"o"},c:{n:"Q",b:"z",a:V,h:"r",1r:-1w}},{j:"1v v 1z R N k",d:[3,4],g:[3,4],f:{e:19,i:"k"},c:{n:"Q",b:"z",a:V,h:"k",1r:-1w}},{j:"B f 1O",d:1,g:1,f:{e:0,i:"o"},c:{n:"14",b:"z",a:1a,h:"r",1h:.8}},{j:"B f N 1L",d:1,g:1,f:{e:0,i:"o"},c:{n:"14",b:"w",a:1a,h:"r",1h:1.2}},{j:"B R k",d:[3,4],g:[3,4],f:{e:1s,i:"k"},c:{n:"14",b:"z",a:V,h:"r",1h:.1}},{j:"B R N 1L k",d:[3,4],g:[3,4],f:{e:1s,i:"k"},c:{n:"14",b:"z",a:V,h:"r",1h:2}},{j:"B 1O v 1z R k",d:[3,4],g:[3,4],f:{e:1s,i:"k"},c:{n:"14",b:"z",a:V,h:"r",1h:.1,1r:x}},{j:"B v 1z R N 1L k",d:[3,4],g:[3,4],f:{e:1s,i:"k"},c:{n:"14",b:"z",a:V,h:"r",1h:2,1r:-x}},{j:"1D-Y R 24",d:3,g:4,f:{e:15,i:"o"},c:{n:"W",b:"w",a:1Y,h:"1T"}},{j:"1D-Y d A",d:6,g:1,f:{e:0,i:"o"},c:{n:"Q",b:"z",a:V,h:"r"}},{j:"1D-Y d F",d:6,g:1,f:{e:0,i:"o"},c:{n:"Q",b:"z",a:V,h:"J"}},{j:"1D-Y g A",d:1,g:8,f:{e:0,i:"o"},c:{n:"Q",b:"z",a:V,h:"r"}},{j:"1D-Y g F",d:1,g:8,f:{e:0,i:"o"},c:{n:"Q",b:"z",a:V,h:"J"}}],23:[{j:"1b f m E (l&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{y:1E},b:"1F",a:G,h:"A"},C:{c:{y:l},b:"z",a:G,h:"A"}},{j:"1b f m r (l&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{y:-1E},b:"1F",a:G,h:"A"},C:{c:{y:-l},b:"z",a:G,h:"A"}},{j:"1b f m L (l&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{u:-1E},b:"1F",a:1x,h:"F"},C:{c:{u:-l},b:"z",a:1x,h:"F"}},{j:"1b f m J (l&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{u:1E},b:"1F",a:1x,h:"F"},C:{c:{u:l},b:"z",a:1x,h:"F"}},{j:"1b R m E (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"o"},s:{c:{y:l},b:"w",a:G,h:"A"}},{j:"1b R m r (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"D"},s:{c:{y:-l},b:"w",a:G,h:"A"}},{j:"1b R m L (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-o"},s:{c:{u:-l},b:"w",a:G,h:"F"}},{j:"1b R m J (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-D"},s:{c:{u:l},b:"w",a:G,h:"F"}},{j:"1B S R k (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},s:{c:{y:l},b:"w",a:1G,h:"A"}},{j:"1C S R k (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},s:{c:{u:l},b:"w",a:1G,h:"F"}},{j:"B v S R m E (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"o"},M:{c:{I:.1A},a:1l,b:"18"},s:{c:{y:l},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v S R m r (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"D"},M:{c:{I:.1A},a:1l,b:"18"},s:{c:{y:-l},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v S R m L (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-o"},M:{c:{I:.1A},a:1l,b:"18"},s:{c:{u:-l},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v S R m J (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-D"},M:{c:{I:.1A},a:1l,b:"18"},s:{c:{u:l},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v A S R k (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},M:{c:{I:.1A,u:1k},a:1l,b:"18"},s:{c:{y:l,u:-1k},b:"H",a:1G,h:"A"},C:{c:{u:0},a:1g,b:"H"}},{j:"B v F S R k (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},M:{c:{I:.1A,y:-15},a:1l,b:"18"},s:{c:{u:l,y:15},b:"H",a:1G,h:"F"},C:{c:{y:0},a:1g,b:"H"}},{j:"1b d m E (l&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},s:{c:{y:l},b:"w",a:1a,h:"A"}},{j:"1b d m r (l&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},s:{c:{y:-l},b:"w",a:1a,h:"A"}},{j:"1b d m L (l&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},s:{c:{u:-l},b:"w",a:G,h:"F"}},{j:"1b d m J (l&#t;)",d:[5,9],g:1,f:{e:q,i:"D"},s:{c:{u:l},b:"w",a:G,h:"F"}},{j:"1B S d k (l&#t;)",d:[5,9],g:1,f:{e:q,i:"k"},s:{c:{y:l},b:"w",a:1a,h:"A"}},{j:"1C S d k (l&#t;)",d:[5,9],g:1,f:{e:q,i:"k"},s:{c:{u:-l},b:"w",a:1a,h:"F"}},{j:"1C S d k (1J&#t;)",d:[3,7],g:1,f:{e:1Q,i:"k"},s:{c:{u:-1J},b:"w",a:1R,h:"F"}},{j:"B v S d m E (l&#t;)",d:[5,9],g:1,f:{e:19,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"H",a:1p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v S d m r (l&#t;)",d:[5,9],g:1,f:{e:19,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:-l},b:"H",a:1p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v S d m L (l&#t;)",d:[5,9],g:1,f:{e:19,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"w",a:p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v S d m J (l&#t;)",d:[5,9],g:1,f:{e:19,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:l},b:"w",a:p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v A S d k (l&#t;)",d:[5,9],g:1,f:{e:19,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"H",a:1p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v F S d k (l&#t;)",d:[5,9],g:1,f:{e:19,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"H",a:p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"1b P m E (l&#t;)",d:1,g:[5,9],f:{e:q,i:"o"},s:{c:{y:l},b:"w",a:1a,h:"A"}},{j:"1b P m r (l&#t;)",d:1,g:[5,9],f:{e:q,i:"o"},s:{c:{y:-l},b:"w",a:1a,h:"A"}},{j:"1b P m L (l&#t;)",d:1,g:[5,9],f:{e:q,i:"o"},s:{c:{u:-l},b:"w",a:G,h:"F"}},{j:"1b P m J (l&#t;)",d:1,g:[5,9],f:{e:q,i:"D"},s:{c:{u:l},b:"w",a:G,h:"F"}},{j:"1B S P k (l&#t;)",d:1,g:[5,9],f:{e:q,i:"k"},s:{c:{y:l},b:"w",a:1a,h:"A"}},{j:"1C S P k (l&#t;)",d:1,g:[5,9],f:{e:q,i:"k"},s:{c:{u:-l},b:"w",a:1a,h:"F"}},{j:"1B S P k (1J&#t;)",d:1,g:[4,9],f:{e:1Q,i:"k"},s:{c:{y:1J},b:"w",a:1R,h:"A"}},{j:"B v S P m E (l&#t;)",d:1,g:[7,11],f:{e:19,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"w",a:p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v S P m r (l&#t;)",d:1,g:[7,11],f:{e:19,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:-l},b:"w",a:p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v S P m L (l&#t;)",d:1,g:[7,11],f:{e:19,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"H",a:1p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v S P m J (l&#t;)",d:1,g:[7,11],f:{e:q,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:l},b:"H",a:1p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v A S P k (l&#t;)",d:1,g:[7,11],f:{e:q,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"H",a:p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v F S P k (l&#t;)",d:1,g:[7,11],f:{e:q,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"H",a:1p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"1N 1P 1M v S m E (l&#t;)",d:1,g:[7,11],f:{e:q,i:"o"},M:{c:{I:.O,u:-1k},a:p,b:"z"},s:{c:{u:-1k,y:l},b:"w",a:G,h:"A"},C:{c:{u:0,e:X},b:"z",a:p}},{j:"1N 1P 1M v S m r (l&#t;)",d:1,g:[7,11],f:{e:q,i:"D"},M:{c:{I:.O,u:-1k},a:p,b:"z"},s:{c:{u:1k,y:-l},b:"w",a:G,h:"A"},C:{c:{u:0,e:X},b:"z",a:p}},{j:"1c 1t m E (x&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{y:x},b:"w",a:1a,h:"A"}},{j:"1c 1t m r (x&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{y:-x},b:"w",a:1a,h:"A"}},{j:"1c 1t m L (x&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{u:-x},b:"w",a:1a,h:"F"}},{j:"1c 1t m J (x&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{u:x},b:"w",a:1a,h:"F"}},{j:"B v 17 1t m E (x&#t;)",d:1,g:1,f:{e:q,i:"k"},s:{c:{I:.8,1r:7,u:10,y:1w},b:"1e",a:1x,h:"A"},C:{c:{1r:0,u:0,y:x},a:1x,b:"1e"}},{j:"B v 17 1t m r (x&#t;)",d:1,g:1,f:{e:q,i:"k"},s:{c:{I:.8,1r:-7,u:10,y:-1w},b:"1e",a:1x,h:"A"},C:{c:{1r:0,u:0,y:-x},a:1x,b:"1e"}},{j:"B v 17 1n m E (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"o"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{y:x},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v 17 1n m r (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"D"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{y:-x},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v 17 1n m L (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-o"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{u:-x},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v 17 1n m J (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-D"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{u:x},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v A 17 1n k (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},M:{c:{I:.1i,u:-15},a:1o,b:"18"},s:{c:{y:q,u:15},b:"H",a:1o,h:"A"},C:{c:{y:x,u:0},a:1o,b:"H"}},{j:"B v F 17 1n k (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},M:{c:{I:.1i,y:15},a:1o,b:"18"},s:{c:{u:q,y:-15},b:"H",a:1o,h:"F"},C:{c:{u:x,y:0},a:1o,b:"H"}},{j:"1c d m E (x&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},s:{c:{y:x},b:"w",a:1a,h:"A"}},{j:"1c d m r (x&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},s:{c:{y:-x},b:"w",a:1a,h:"A"}},{j:"1B 17 d k (x&#t;)",d:[5,9],g:1,f:{e:q,i:"k"},s:{c:{y:x},b:"w",a:1a,h:"A"}},{j:"B v 17 d m E (x&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:22,u:0},b:"H",a:G,h:"A"},C:{c:{e:X,y:x},b:"K",a:p}},{j:"B v 17 d m r (x&#t;)",d:[5,9],g:1,f:{e:q,i:"D"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:-x,u:0},b:"H",a:G,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v 17 d m L (x&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v 17 d m J (x&#t;)",d:[5,9],g:1,f:{e:q,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v A 17 d k (x&#t;)",d:[5,9],g:1,f:{e:q,i:"k"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:x,u:0},b:"H",a:G,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v F 17 d k (x&#t;)",d:[5,9],g:1,f:{e:q,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v A 17 1K d m E (x&#t;)",d:[7,11],g:1,f:{e:q,i:"o"},s:{c:{I:.O,u:5,y:1w},b:"18",a:G,h:"A"},C:{c:{u:0,y:x},b:"18",a:G}},{j:"B v A 17 1K d m r (x&#t;)",d:[7,11],g:1,f:{e:q,i:"D"},s:{c:{I:.O,u:5,y:-1w},b:"18",a:G,h:"A"},C:{c:{u:0,y:-x},b:"18",a:G}},{j:"1c P m L (x&#t;)",d:1,g:[5,9],f:{e:q,i:"o"},s:{c:{u:-x},b:"w",a:G,h:"F"}},{j:"1c P m J (x&#t;)",d:1,g:[5,9],f:{e:q,i:"D"},s:{c:{u:x},b:"w",a:G,h:"F"}},{j:"1C 17 P k (x&#t;)",d:1,g:[5,9],f:{e:q,i:"k"},s:{c:{u:-x},b:"w",a:G,h:"F"}},{j:"B v 17 P m L (x&#t;)",d:1,g:[7,11],f:{e:q,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v 17 P m J (x&#t;)",d:1,g:[7,11],f:{e:q,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v 17 P m E (x&#t;)",d:1,g:[7,11],f:{e:q,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:x},b:"H",a:G,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v 17 P m r (x&#t;)",d:1,g:[7,11],f:{e:q,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:-x},b:"H",a:G,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v A 17 P k (x&#t;)",d:1,g:[7,11],f:{e:q,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:x},b:"H",a:G,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v F 17 P k (x&#t;)",d:1,g:[7,11],f:{e:q,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v F 17 1K P m E (x&#t;)",d:1,g:[7,11],f:{e:q,i:"o"},s:{c:{I:.O,u:1w,y:-5},b:"18",a:G,h:"F"},C:{c:{u:x,y:0},b:"18",a:G}},{j:"B v F 17 1K P m r (x&#t;)",d:1,g:[7,11],f:{e:q,i:"D"},s:{c:{I:.O,u:-1w,y:-5},b:"18",a:G,h:"F"},C:{c:{u:-x,y:0},b:"18",a:G}},{j:"1b 1t m E (l&#t;, T U)",d:1,g:1,f:{e:q,i:"o",U:"T"},s:{c:{y:l},b:"w",a:1a,h:"A"}},{j:"1b 1t m r (l&#t;, T U)",d:1,g:1,f:{e:q,i:"o",U:"T"},s:{c:{y:-l},b:"w",a:1a,h:"A"}},{j:"1b 1t m L (l&#t;, T U)",d:1,g:1,f:{e:q,i:"o",U:"T"},s:{c:{u:-l},b:"w",a:1a,h:"F"}},{j:"1b 1t m J (l&#t;, T U)",d:1,g:1,f:{e:q,i:"o",U:"T"},s:{c:{u:l},b:"w",a:1a,h:"F"}},{j:"B v S 1n m E (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"o",U:"T"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{y:l},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v S 1n m r (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"D",U:"T"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{y:-l},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v S 1n m L (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"1j-o",U:"T"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{u:-l},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v S 1n m J (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"1j-D",U:"T"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{u:l},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v A S 1n k (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"k",U:"T"},M:{c:{I:.1i},a:1o,b:"18"},s:{c:{y:l},b:"H",a:1o,h:"A"},C:{a:1o,b:"H"}},{j:"B v F S 1n k (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"k",U:"T"},M:{c:{I:.1i},a:1o,b:"18"},s:{c:{u:l},b:"H",a:1o,h:"F"},C:{a:1o,b:"H"}},{j:"B v S d m E (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"o",U:"T"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:l,u:-3},b:"w",a:1p,h:"A"},C:{c:{e:X,u:0},b:"z",a:1q}},{j:"B v S d m r (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"D",U:"T"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:-l,u:-3},b:"w",a:1p,h:"A"},C:{c:{e:X,u:0},b:"z",a:1q}},{j:"B v S d m L (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"o",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"H",a:G,h:"F"},C:{c:{e:X},b:"z",a:1q}},{j:"B v S d m J (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"D",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:l},b:"H",a:G,h:"F"},C:{c:{e:X},b:"z",a:1q}},{j:"B v A S d k (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"k",U:"T"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:l,u:-3},b:"w",a:1p,h:"A"},C:{c:{e:X,u:0},b:"z",a:1q}},{j:"B v F S d k (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"k",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"H",a:G,h:"F"},C:{c:{e:X},b:"z",a:1q}},{j:"B v S P m L (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"o",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"w",a:1p,h:"F"},C:{c:{e:X},b:"z",a:1q}},{j:"B v S P m J (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"D",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:l},b:"w",a:1p,h:"F"},C:{c:{e:X},b:"z",a:1q}},{j:"B v S P m E (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"o",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"H",a:G,h:"A"},C:{c:{e:X},b:"z",a:1q}},{j:"B v S P m r (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"D",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:-l},b:"H",a:G,h:"A"},C:{c:{e:X},b:"z",a:1q}},{j:"B v A S P k (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"k",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"H",a:G,h:"A"},C:{c:{e:X},b:"z",a:1q}},{j:"B v F S P k (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"k",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"w",a:1p,h:"F"},C:{c:{e:X},b:"z",a:1q}}]}',62,132,'||||||||||duration|easing|transition|rows|delay|tile|cols|direction|sequence|name|random|180|to|type|forward|600|75|left|animation|176|rotateX|and|easeInOutQuart|90|rotateY|easeOutQuart|horizontal|Scaling|after|reverse|right|vertical|1e3|easeInOutBack|scale3d|top|easeOutBack|bottom|before|from|85|columns|mixed|tiles|spinning|large|depth|750|slide|200|sliding|Fading||||Sliding|fade|||turning|easeInOutQuint|55|1500|Spinning|Turning|100|easeInOutQuad|50|350|scale|65|col|30|450|500|cuboids|700|1200|400|rotate|35|cuboid|Carousel|Flying|45|800|Smooth|rotating|95|Horizontal|Vertical|Mirror|91|easeInQuart|1300|fading|mirror|540|drunk|out|scaling|Drunk|in|colums|150|2e3|directions|topright|bottomleft|topleft|sliging|linear|850|layerSliderTransitions|var|bottomright|87|t3d|diagonal||Crossfading|t2d'.split('|')))
;

/*
	* LayerSlider
	*
	* (c) 2011-2014 George Krupa, John Gera & Kreatura Media
	*
	* Plugin web:			http://kreaturamedia.com/
	* licenses:				http://codecanyon.net/licenses/
*/




;eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('18 av(e,t,n){16 r;6(1Q e=="5J"){r=3I("#"+e)}19 6(1Q e=="ap"){r=e}16 i,s;2v(t){1l"ay":i="e6 3I bw";s=\'bi aa 4y dY e4 aB 4M 4J cZ cX an dL dm 3k 24 3I b0 ds dp 2a 2Q 2q aM 4J dn. <bA>4K dr 3Y 4J 63 du dt 2q 24 df dH 3k 2Q 5o dG 24 "dJ dK dM 2q 5m" dF dx 24 dA & cN cQ 3H.</bA>\';1j;1l"au":i="5H 3I bw";s="bi aa 4y cV d7 d6 an 5H 3X ("+n+\') 3k 24 3I b0. 2Q d5 at d8 3X 1.7.0 4M d9. 4K aK 3I 2q 1.10.x 4M db. da: 4K do 2F d4 24 3I d3 aB 3Y 63 5o do 2F aK 2q 2.x 3X 3k 3I cW 4o 3v 2F a6 d0 d2 d1 4y eC 7 & 8. <a 2R="7m://eF.eG.3U/eB/4/5P-2a-eA/#9R-13&9O-60">ev ew ex ey eT eS 3I by eR eQ.</a>\';1j}r.1o("12-43");r.4e(\'<p 1u="12-eL">!</p>\');r.4e(\'<p 1u="12-43-eM">2Q: \'+i+"</p>");r.4e(\'<p 1u="12-43-9K">\'+s+"</p>")}(18(e){e.ax.3h=18(n){16 r="1.7.0";16 i=e.ax.ay;16 s=e(14);16 o=18(e,t){16 n=e.1J(".");16 r=t.1J(".");2a(16 i=0;i<n.1k;++i){6(r.1k==i){1S 1f}6(1d(n[i])==1d(r[i])){eP}19 6(1d(n[i])>1d(r[i])){1S 1f}19{1S 1b}}6(n.1k!=r.1k){1S 1b}1S 1b};6(!o("1.8.0",i)){s.1o("12-9A")}6(!o(r,i)){av(s,"au",i)}19{6((1Q n).3F("ap|2L")){1S 14.1O(18(e){1H t(14,n)})}19{6(n==="11"){16 u=e(14).11("2Q").g;6(u){1S u}}19 6(n==="eO"){16 a=e(14).11("2Q").o;6(a){1S a}}19 6(n==="cD"){16 a=e(14).11("2Q").8l;6(a){1S a}}19{1S 14.1O(18(t){16 r=e(14).11("2Q");6(r){6(!r.g.2S&&!r.g.4f){6(1Q n=="3W"){6(n>0&&n<r.g.2E+1&&n!=r.g.22){r.4V(n)}}19{2v(n){1l"1U":r.o.6J(r.g);r.1U("6K");1j;1l"1X":r.o.6F(r.g);r.1X("6K");1j;1l"28":6(!r.g.2z){r.o.ab(r.g);r.g.2A=1b;r.28()}1j}}}6(n==="eN"){r.2g()}6((r.g.2z||!r.g.2z&&r.g.2A)&&n=="1x"){r.o.ae(r.g);r.g.2A=1f;r.g.1K.17(\'1Y[1h*="4U.3U"], 1Y[1h*="5x.be"], 1Y[1h*="5v.5j"]\').1O(18(){2o(e(14).11("6w"))});r.1x()}6(n=="e1"){r.9G()}}})}}}};16 t=18(u,a){16 f=14;f.$el=e(u).1o("12-2b");f.$el.11("2Q",f);f.3P=18(){f.8l=t.9c;f.o=e.4F({},f.8l,a);f.g=e.4F({},t.78);f.1w=e.4F({},t.ar);f.53=e.4F({},t.9b);f.g.dV=e(u).2n("12-9A")?1f:1b;f.g.cg=e(u).4n();6(f.g.2t){f.o.4C=1f}6(f.o.2C==="cd"){f.o.2C=1b}6(f.o.2C==="9z"){f.o.2C=1f}6(1Q aQ!=="2L"){f.t=e.4F({},aQ)}6(1Q 9o!=="2L"){f.ct=e.4F({},9o)}6(!f.g.9Y){f.g.9Y=1b;6(e("4n").17(\'aX[8N*="63"]\').1k){f.g.cu=e("4n").17(\'aX[8N*="63"]\').1g("8N").1J("63")[1]}6(e("4n").17(\'8J[1h*="5P"]\').1k){6(e("4n").17(\'8J[1h*="5P"]\').1g("1h").1i("?")!=-1){f.g.cC=e("4n").17(\'8J[1h*="5P"]\').1g("1h").1J("?")[1].1J("=")[1]}}6(!f.o.3p||f.o.3p==""||!f.o.3K||f.o.3K==""){f.5d()}19{e(u).1o("12-"+f.o.3p);16 n=f.o.3K+f.o.3p+"/3p.1a";8z=e("9a");6(!e("9a").1k){8z=e("5m")}6(e(\'7n[2R="\'+n+\'"]\').1k){r=e(\'7n[2R="\'+n+\'"]\');6(!f.g.3f){f.g.3f=1b;f.g.9F=2f(18(){f.5d()},8E)}}19{6(61.aj){61.aj(n);16 r=e(\'7n[2R="\'+n+\'"]\')}19{16 r=e(\'<7n 4Y="bJ" 2R="\'+n+\'" 4W="9K/1a" />\').1C(8z)}}r.3P(18(){6(!f.g.3f){f.g.3f=1b;f.g.9B=2f(18(){f.5d()},8E)}});e(1Z).3P(18(){6(!f.g.3f){f.g.3f=1b;f.g.9C=2f(18(){f.5d()},8E)}});f.g.9D=2f(18(){6(!f.g.3f){f.g.3f=1b;f.5d()}},1P)}}};f.5d=18(){e(u).5w(e(f.o.1C));6(!e("4n").1g("69")){e("4n").1g("69","12-78")}19 6(!e("5m").1g("69")){e("5m").1g("69","12-78")}6(f.g.73()===1b&&f.o.8W===1b){e(u).1o("12-4p");e(u).3t(".12-3g-3i-2b").1o("12-4p")}16 t=18(){6(f.o.8W===1b&&f.g.73()===1b){e(u).1o("12-4p");e(u).3t(".12-3g-3i-2b").1o("12-4p");f.o.4r=1f}19{6(e(1Z).1c()<f.o.aT||e(1Z).1c()>f.o.aP){e(u).1o("12-4p");e(u).3t(".12-3g-3i-2b").1o("12-4p")}19{e(u).2m("12-4p");e(u).3t(".12-3g-3i-2b").2m("12-4p")}}};e(1Z).2g(18(){t()});t();f.g.1y=18(){1S e(u).1c()};f.g.1F=18(){1S e(u).1e()};e(u).17(".12-3B").2m("12-3B").1o("12-1s");e(u).17(\'.12-1s > *[1u*="12-s"]\').1O(18(){16 t=e(14).1g("1u").1J("12-s")[1].1J(" ")[0];e(14).2m("12-s"+t).1o("12-l"+t)});6(f.o.9H){f.o.2U=f.o.9H}6(f.o.bU===1f){f.o.4X=1f}6(e(u).17(".12-1s").1k==1){f.o.4r=1f;f.o.8b=1f;f.o.72=1f;f.o.79=1f;f.o.4b=0;f.o.75=1f;f.o.2C=1b;f.o.2U=1;f.o.38="9z"}6(e(u).23().2n("12-3g-3i-6A")&&f.o.3N!==0){e(u)[0].1M.1c="1E%"}6(f.o.1c){f.g.7E=f.g.2j=""+f.o.1c}19{f.g.7E=f.g.2j=e(u)[0].1M.1c}6(f.o.1e){f.g.3o=""+f.o.1e}19{f.g.3o=e(u)[0].1M.1e}6(f.g.2j.1i("%")==-1&&f.g.2j.1i("1D")==-1){f.g.2j+="1D"}6(f.g.3o.1i("%")==-1&&f.g.3o.1i("1D")==-1){f.g.3o+="1D"}6(f.o.9n&&f.g.2j.1i("1D")!=-1&&f.g.3o.1i("1D")!=-1){f.g.3V=1b}19{f.g.3V=1f}6(f.o.8w===1b){f.o.3N=0;f.g.3V=1b;6(f.g.2j.1i("%")!=-1){f.g.2j=1d(f.g.2j)+"1D"}6(f.g.3o.1i("%")!=-1){f.g.3o=1d(f.g.3o)+"1D"}}e(u).17(\'*[1u*="12-l"], *[1u*="12-bg"]\').1O(18(){6(!e(14).23().2n("12-1s")){e(14).bH(e(14).23())}});e(u).17(".12-1s").1O(18(){e(14).2Z(\':2F([1u*="12-"])\').1O(18(){e(14).9Q()});16 t=e("<1n>").1o("12-bG");6(e(14).17(".12-bg").1k){t.bF(e(14).17(".12-bg").eq("0"))}19{t.5w(e(14))}});e(u).17(\'.12-1s, *[1u*="12-l"]\').1O(18(){6(e(14).11("12")||e(14).1g("4Y")||e(14).1g("1M")){6(e(14).11("12")){16 t=e(14).11("12").21().1J(";")}19 6(e(14).1g("4Y")&&e(14).1g("4Y").1i(":")!=-1&&e(14).1g("4Y").1i(";")!=-1){16 t=e(14).1g("4Y").21().1J(";")}19{16 t=e(14).1g("1M").21().1J(";")}2a(x=0;x<t.1k;x++){3C=t[x].1J(":");6(3C[0].1i("4I")!=-1){3C[1]=f.9E(3C[1])}16 n="";6(3C[2]){n=":"+e.5F(3C[2])}6(3C[0]!=" "&&3C[0]!=""){e(14).11(e.5F(3C[0]),e.5F(3C[1])+n)}}}6(f.o.8n===1b&&f.o.4r===1b){f.o.4r=1f;f.g.7P=1b}16 r=e(14);r.11("4g",r[0].1M.1m);r.11("4a",r[0].1M.1q);6(e(14).3v("a")&&e(14).2Z().1k>0){r=e(14).2Z()}16 i=r.1c();16 s=r.1e();6(r[0].1M.1c&&r[0].1M.1c.1i("%")!=-1){i=r[0].1M.1c}6(r[0].1M.1e&&r[0].1M.1e.1i("%")!=-1){s=r[0].1M.1e}r.11("2Y",i);r.11("2W",s);r.11("8X",r.1a("2e-1m"));r.11("8Y",r.1a("2e-1G"));r.11("93",r.1a("2e-1q"));r.11("92",r.1a("2e-1p"));16 o=1Q 3c(r.1a("3e"))=="3W"?1B.co(3c(r.1a("3e"))*1E)/1E:1;e(14).11("7o",o);6(r.1a("4i-1m-1c").1i("1D")==-1){r.11("6y",r[0].1M.9Z)}19{r.11("6y",r.1a("4i-1m-1c"))}6(r.1a("4i-1G-1c").1i("1D")==-1){r.11("6z",r[0].1M.a3)}19{r.11("6z",r.1a("4i-1G-1c"))}6(r.1a("4i-1q-1c").1i("1D")==-1){r.11("6C",r[0].1M.a4)}19{r.11("6C",r.1a("4i-1q-1c"))}6(r.1a("4i-1p-1c").1i("1D")==-1){r.11("6B",r[0].1M.a8)}19{r.11("6B",r.1a("4i-1p-1c"))}r.11("9v",r.1a("9M-a2"));r.11("9L",r.1a("a1-1e"))});6(61.4O.a0){2a(16 n=0;n<e(u).17(".12-1s").1k;n++){6(e(u).17(".12-1s").eq(n).11("c0")==61.4O.a0.1J("#")[1]){f.o.2U=n+1}}}e(u).17(\'*[1u*="12-8O-"]\').1O(18(){16 t=e(14).1g("1u").1J(" ");2a(16 n=0;n<t.1k;n++){6(t[n].1i("12-8O-")!=-1){16 r=1d(t[n].1J("12-8O-")[1]);e(14).1a({cw:"cx"}).2u(18(t){t.3w();e(u).3h(r)})}}});f.g.2E=e(u).17(".12-1s").1k;6(f.o.7p&&f.g.2E>2){f.o.2U=="2i";f.o.7W=1f}19{f.o.7p=1f}6(f.o.2U=="2i"){f.o.2U=1B.27(1B.2i()*f.g.2E+1)}f.o.5f=f.o.5f<f.g.2E+1?f.o.5f:1;f.o.5f=f.o.5f<1?1:f.o.5f;f.g.4q=1;6(f.o.4X){f.g.4q=0}16 r=61.4O.2R.1i("c2:")===-1?"":"7m:";e(u).17(\'1Y[1h*="4U.3U"], 1Y[1h*="5x.be"]\').1O(18(){e(14).23().1o("12-2s-3B");6(e(14).23(\'[1u*="12-l"]\')){16 t=e(14);16 n=r;e.9T(n+"//c3.4U.3U/c9/a9/ca/"+e(14).1g("1h").1J("9V/")[1].1J("?")[0]+"?v=2&7s=99&9k=?",18(e){t.11("7q",1d(e["9O"]["cb$9R"]["cl$2r"]["cc"])*1P)});16 i=e("<1n>").1o("12-5A").1C(e(14).23());e("<29>").1C(i).1o("12-3m").1g("7s","bf 2s").1g("1h",n+"//29.4U.3U/ch/"+e(14).1g("1h").1J("9V/")[1].1J("?")[0]+"/"+f.o.aH);e("<1n>").1C(i).1o("12-b1");e(14).23().1a({1c:e(14).1c(),1e:e(14).1e()}).2u(18(){6(e(14).11("4z")>0&&e(14).11("4s")){2o(e(14).11("4s"))}f.g.2S=1b;6(f.g.2T){6(f.o.2C!=1f){f.g.2T=1f}f.g.2A=1b}19{f.g.2A=f.g.2z}6(f.o.2C!=1f){f.1x()}f.g.4E=1b;n=e(14).17("1Y").11("3S").1i("7m")===-1?r:"";e(14).17("1Y").1g("1h",n+e(14).17("1Y").11("3S"));e(14).17(".12-5A").1N(f.g.v.d).3M(f.g.v.7u,18(){6(f.o.2C=="1W"&&f.g.2A==1b){16 e=2f(18(){f.28()},t.11("7q")-f.g.v.d);t.11("6w",e)}f.g.2S=1f;6(f.g.2g==1b){f.3z(f.g.1K,18(){f.g.2g=1f})}})});16 s="&";6(e(14).1g("1h").1i("?")==-1){s="?"}16 o="&bz=aq&c4=1";6(e(14).1g("1h").1i("4j")==-1){e(14).11("3S",e(14).1g("1h")+s+"4j=1"+o)}19{e(14).11("3S",e(14).1g("1h").2l("4j=0","4j=1")+o)}e(14).11("2Y",e(14).1g("1c"));e(14).11("2W",e(14).1g("1e"));e(14).1g("1h","")}});e(u).17(\'1Y[1h*="5v.5j"]\').1O(18(){e(14).23().1o("12-2s-3B");6(e(14).23(\'[1u*="12-l"]\')){16 t=e(14);16 n=r;16 i=e("<1n>").1o("12-5A").1C(e(14).23());e.9T(n+"//5j.3U/a9/ci/2s/"+e(14).1g("1h").1J("2s/")[1].1J("?")[0]+".99?9k=?",18(n){e("<29>").1C(i).1o("12-3m").1g("7s","bf 2s").1g("1h",n[0]["cv"]);t.11("7q",1d(n[0]["2r"])*1P);e("<1n>").1C(i).1o("12-b1")});e(14).23().1a({1c:e(14).1c(),1e:e(14).1e()}).2u(18(){6(e(14).11("4z")>0&&e(14).11("4s")){2o(e(14).11("4s"))}f.g.2S=1b;6(f.g.2T){6(f.o.2C!=1f){f.g.2T=1f}f.g.2A=1b}19{f.g.2A=f.g.2z}6(f.o.2C!=1f){f.1x()}f.g.4E=1b;n=e(14).17("1Y").11("3S").1i("7m")===-1?r:"";e(14).17("1Y").1g("1h",n+e(14).17("1Y").11("3S"));e(14).17(".12-5A").1N(f.g.v.d).3M(f.g.v.7u,18(){6(f.o.2C=="1W"&&f.g.2A==1b){16 e=2f(18(){f.28()},t.11("7q")-f.g.v.d);t.11("6w",e)}f.g.2S=1f;6(f.g.2g==1b){f.3z(f.g.1K,18(){f.g.2g=1f})}})});16 s="&";6(e(14).1g("1h").1i("?")==-1){s="?"}16 o="&bz=aq";6(e(14).1g("1h").1i("4j")==-1){e(14).11("3S",e(14).1g("1h")+s+"4j=1"+o)}19{e(14).11("3S",e(14).1g("1h").2l("4j=0","4j=1")+o)}e(14).11("2Y",e(14).1g("1c"));e(14).11("2W",e(14).1g("1e"));e(14).1g("1h","")}});e(u).17("2s, 6I").1O(18(){16 t=1Q e(14).1g("1c")!=="2L"?e(14).1g("1c"):"c7";16 n=1Q e(14).1g("1e")!=="2L"?e(14).1g("1e"):""+e(14).1e();6(t.1i("%")===-1){t=1d(t)}6(n.1i("%")===-1){n=1d(n)}6(t==="1E%"&&(n===0||n==="0"||n==="1E%")){e(14).1g("1e","1E%");n="1W"}e(14).23().1o("12-2s-3B").1a({1c:t,1e:n}).11({2Y:t,2W:n});16 r=e(14);e(14).3Y("cz",18(){6(f.o.2C==="1W"&&f.g.2A===1b){f.28()}});e(14).5X("1c").5X("1e").1a({1c:"1E%",1e:"1E%"}).2u(18(e){6(!f.g.4E){6(14.2T){e.3w()}14.cs();f.g.2S=1b;6(f.g.2T){6(f.o.2C!==1f){f.g.2T=1f}f.g.2A=1b}19{f.g.2A=f.g.2z}6(f.o.2C!==1f){f.1x()}f.g.4E=1b;f.g.2S=1f;6(f.g.2g===1b){f.3z(f.g.1K,18(){f.g.2g=1f})}}})});6(f.o.4X){f.o.2U=f.o.2U-1===0?f.g.2E:f.o.2U-1}f.g.22=f.o.2U;f.g.1K=e(u).17(".12-1s:eq("+(f.g.22-1)+")");e(u).17(".12-1s").ck(\'<1n 1u="12-2h"></1n>\');6(f.o.aV){f.g.3q=e("<1n>").1o("12-bL-5V").1C(e(u).17(".12-2h"))}6(f.o.aN&&!f.g.2t){f.g.30=e("<1n>").1o("12-cn-5V").1C(e(u).17(".12-2h"));f.g.30.4e(e(\'<1n 1u="12-ct-1m"><1n 1u="12-ct-3s"><1n 1u="12-ct-aI"><1n 1u="12-ct-aJ"></1n></1n></1n></1n><1n 1u="12-ct-1G"><1n 1u="12-ct-3s"><1n 1u="12-ct-aI"><1n 1u="12-ct-aJ"></1n></1n></1n></1n><1n 1u="12-ct-bN"></1n>\'))}f.g.6d=e("<1n>").1a({bM:-1,1L:"1R"}).1o("12-aC-2b").1C(e(u));e("<1n>").1o("12-aC-bX").1C(f.g.6d);6(e(u).1a("3L")=="bY"){e(u).1a("3L","ak")}6(f.o.7i){e(u).17(".12-2h").1a({bW:"67("+f.o.7i+")"})}19{e(u).17(".12-2h").1a({bV:f.o.7r})}6(f.o.7r=="87"&&f.o.7i==1f){e(u).17(".12-2h").1a({3u:"1R 87 !bI"})}e(u).17(".12-1s 29").1O(18(){e(14).5X("1c").5X("1e");6(f.o.3O===1b&&f.o.4C===1b){6(1Q e(14).11("1h")!=="5J"){e(14).11("1h",e(14).1g("1h"));16 t=f.o.3K+"../1a/bZ.bE";e(14).1g("1h",t)}}19{6(1Q e(14).11("1h")==="5J"){e(14).1g("1h",e(14).11("1h"));e(14).5X("11-1h")}}});e(u).17(".12-1s").3Y("bS",18(t){f.g.aS=t.7t-e(14).23().4d().1m;f.g.aO=t.aR-e(14).23().4d().1q});e(u).17(".12-1s").3Y("ag",18(t){16 n=e(14).23().4d().1m+f.g.aS;16 r=e(14).23().4d().1q+f.g.aO;16 i=t.7t-n;16 s=t.aR-r;e(14).17("> *:2F(.12-bg)").1O(18(){6(1Q e(14).11("5b")!=="2L"&&1d(e(14).11("5b"))!==0){e(14).1a({3G:-i/1E*1d(e(14).11("5b")),47:-s/1E*1d(e(14).11("5b"))})}})});e(u).17(".12-1s").3Y("cm",18(){e(14).17("> *:2F(.12-bg)").1O(18(){6(1Q e(14).11("5b")!=="2L"&&1d(e(14).11("5b"))!==0){3b.2q(14,.4,{1a:{3G:0,47:0}})}})});6(f.o.8b){e(\'<a 1u="12-1r-1U" 2R="#" />\').2u(18(t){t.3w();e(u).3h("1U")}).1C(e(u));e(\'<a 1u="12-1r-1X" 2R="#" />\').2u(18(t){t.3w();e(u).3h("1X")}).1C(e(u));6(f.o.ai){e(u).17(".12-1r-1U, .12-1r-1X").1a({1L:"1R"});e(u).1V(18(){6(!f.g.8a){6(f.g.2t){e(u).17(".12-1r-1U, .12-1r-1X").1a("1L","2p")}19{e(u).17(".12-1r-1U, .12-1r-1X").1x(1b,1b).2I(2D)}}},18(){6(f.g.2t){e(u).17(".12-1r-1U, .12-1r-1X").1a("1L","1R")}19{e(u).17(".12-1r-1U, .12-1r-1X").1x(1b,1b).3M(2D)}})}}6(f.o.72||f.o.79){16 i=e(\'<1n 1u="12-1p-1r-2J" />\').1C(e(u));f.g.32=i;6(f.o.38=="4N"){i.1o("12-az-5e")}6(f.o.79&&f.o.38!="4N"){e(\'<5C 1u="12-1p-4G" />\').1C(e(u).17(".12-1p-1r-2J"));6(f.o.38=="1V"){16 s=e(\'<1n 1u="12-1I-1V"><1n 1u="12-1I-1V-2h"><1n 1u="12-1I-1V-bg"></1n><1n 1u="12-1I-1V-29"><29></1n><5C></5C></1n></1n>\').1C(e(u).17(".12-1p-4G"))}2a(x=1;x<f.g.2E+1;x++){16 o=e(\'<a 2R="#" />\').1C(e(u).17(".12-1p-4G")).2u(18(t){t.3w();e(u).3h(e(14).7L()+1)});6(f.o.38=="1V"){e(u).17(".12-1I-1V, .12-1I-1V-29").1a({1c:f.o.8y,1e:f.o.6c});16 a=e(u).17(".12-1I-1V");16 l=a.17("29").1a({1e:f.o.6c});16 c=e(u).17(".12-1I-1V-2h").1a({26:"2x",1L:"2p"});o.1V(18(){16 t=e(u).17(".12-1s").eq(e(14).7L());16 n;6(f.o.3O===1b&&f.o.4C===1b){6(t.17(".12-4l").1k){n=t.17(".12-4l").11("1h")}19 6(t.17(".12-3m").1k){n=t.17(".12-3m").1g("1h")}19 6(t.17(".12-bg").1k){n=t.17(".12-bg").11("1h")}19{n=f.o.3K+f.o.3p+"/6M.4P"}}19{6(t.17(".12-4l").1k){n=t.17(".12-4l").1g("1h")}19 6(t.17(".12-3m").1k){n=t.17(".12-3m").1g("1h")}19 6(t.17(".12-bg").1k){n=t.17(".12-bg").1g("1h")}19{n=f.o.3K+f.o.3p+"/6M.4P"}}e(u).17(".12-1I-1V-29").1a({1m:1d(a.1a("2e-1m")),1q:1d(a.1a("2e-1q"))});l.3P(18(){6(e(14).1c()==0){l.1a({3L:"ak",4h:"0 1W",1m:"1W"})}19{l.1a({3L:"cA",3G:-e(14).1c()/2,1m:"50%"})}}).1g("1h",n);a.1a({1L:"2p"}).1x().49({1m:e(14).3L().1m+(e(14).1c()-a.3x())/2},83);c.1a({1L:"1R",26:"2P"}).1x().2I(83)},18(){c.1x().3M(83,18(){a.1a({26:"2x",1L:"2p"})})})}}6(f.o.38=="1V"){s.1C(e(u).17(".12-1p-4G"))}e(u).17(".12-1p-4G a:eq("+(f.o.2U-1)+")").1o("12-1r-1T")}6(f.o.72){16 h=e(\'<a 1u="12-1r-28" 2R="#" />\').2u(18(t){t.3w();e(u).3h("28")}).5w(e(u).17(".12-1p-1r-2J"));16 p=e(\'<a 1u="12-1r-1x" 2R="#" />\').2u(18(t){t.3w();e(u).3h("1x")}).1C(e(u).17(".12-1p-1r-2J"))}19 6(f.o.38!="4N"){e(\'<5C 1u="12-1r-al 12-1r-cB" />\').5w(e(u).17(".12-1p-1r-2J"));e(\'<5C 1u="12-1r-al 12-1r-cy" />\').1C(e(u).17(".12-1p-1r-2J"))}6(f.o.76&&f.o.38!="4N"){i.1a({1L:"1R"});e(u).1V(18(){6(!f.g.8a){6(f.g.2t){i.1a("1L","2p")}19{i.1x(1b,1b).2I(2D)}}},18(){6(f.g.2t){i.1a("1L","1R")}19{i.1x(1b,1b).3M(2D)}})}}6(f.o.38=="4N"){f.g.40=e(\'<1n 1u="12-1I-2J"></1n>\').1C(e(u));16 s=e(\'<1n 1u="12-1I"><1n 1u="12-1I-2h"><1n 1u="12-1I-1s-2b"><1n 1u="12-1I-1s"></1n></1n></1n></1n>\').1C(f.g.40);f.g.5e=e(u).17(".12-1I-1s-2b");6(!("6k"3R 1Z)){f.g.5e.1V(18(){e(14).1o("12-1I-1s-1V")},18(){e(14).2m("12-1I-1s-1V");f.7Q()}).ag(18(t){16 n=1d(t.7t-e(14).4d().1m)/e(14).1c()*(e(14).1c()-e(14).17(".12-1I-1s").1c());e(14).17(".12-1I-1s").1x().1a({3G:n})})}19{f.g.5e.1o("12-cj")}e(u).17(".12-1s").1O(18(){16 t=e(14).7L()+1;16 n;6(f.o.3O===1b&&f.o.4C===1b){6(e(14).17(".12-4l").1k){n=e(14).17(".12-4l").11("1h")}19 6(e(14).17(".12-3m").1k){n=e(14).17(".12-3m").1g("1h")}19 6(e(14).17(".12-bg").1k){n=e(14).17(".12-bg").11("1h")}19{n=f.o.3K+f.o.3p+"/6M.4P"}}19{6(e(14).17(".12-4l").1k){n=e(14).17(".12-4l").1g("1h")}19 6(e(14).17(".12-3m").1k){n=e(14).17(".12-3m").1g("1h")}19 6(e(14).17(".12-bg").1k){n=e(14).17(".12-bg").1g("1h")}19{n=f.o.3K+f.o.3p+"/6M.4P"}}16 r=e(\'<a 2R="#" 1u="12-4c-\'+t+\'"><29 1h="\'+n+\'"></a>\');r.1C(e(u).17(".12-1I-1s"));6(!("6k"3R 1Z)){r.1V(18(){e(14).2Z().1x().6l(2D,f.o.8P/1E)},18(){6(!e(14).2Z().2n("12-4c-1T")){e(14).2Z().1x().6l(2D,f.o.8I/1E)}})}r.2u(18(n){n.3w();e(u).3h(t)})});6(h&&p){16 d=f.g.32=e(\'<1n 1u="12-1p-1r-2J 12-c5-5e"></1n>\').1C(e(u));h.7v().2u(18(t){t.3w();e(u).3h("28")}).1C(d);p.7v().2u(18(t){t.3w();e(u).3h("1x")}).1C(d)}6(f.o.76){f.g.40.1a("1L","1R");6(d){f.g.32=d.1a("1L")=="2p"?d:e(u).17(".12-az-5e");f.g.32.1a("1L","1R")}e(u).1V(18(){e(u).1o("12-1V");6(!f.g.8a){6(f.g.2t){f.g.40.1a("1L","2p");6(f.g.32){f.g.32.1a("1L","2p")}}19{f.g.40.1x(1b,1b).2I(2D);6(f.g.32){f.g.32.1x(1b,1b).2I(2D)}}}},18(){e(u).2m("12-1V");6(f.g.2t){f.g.40.1a("1L","1R");6(f.g.32){f.g.32.1a("1L","1R")}}19{f.g.40.1x(1b,1b).3M(2D);6(f.g.32){f.g.32.1x(1b,1b).3M(2D)}}})}}f.g.3T=e(\'<1n 1u="12-3T"></1n>\').1C(e(u));6(f.g.3T.1a("1L")=="2p"&&!f.g.3T.17("29").1k){f.g.6u=18(){f.g.3T.1a({1L:"1R",26:"2P"}).2I(4w,18(){f.g.6u=1f})};f.g.56=e("<29>").1g("1h",f.o.3K+f.o.3p+"/3T.4P").1C(f.g.3T);f.g.a7=1Q 1d(e(u).1a("2e-1p"))=="3W"?1d(e(u).1a("2e-1p")):0}f.7w();6(f.o.ad&&e(u).17(".12-1s").1k>1){e("5m").6G("ce",18(e){6(!f.g.2S&&!f.g.4f){6(e.bq==37){f.o.6J(f.g);f.1U("6K")}19 6(e.bq==39){f.o.6F(f.g);f.1X("6K")}}})}6("6k"3R 1Z&&e(u).17(".12-1s").1k>1&&f.o.ah){e(u).17(".12-2h").6G("c8",18(e){16 t=e.54?e.54:e.bd.54;6(t.1k==1){f.g.6p=f.g.5K=t[0].bb}});e(u).17(".12-2h").6G("c6",18(e){16 t=e.54?e.54:e.bd.54;6(t.1k==1){f.g.5K=t[0].bb}6(1B.4m(f.g.6p-f.g.5K)>45){e.3w()}});e(u).17(".12-2h").6G("bC",18(t){6(1B.4m(f.g.6p-f.g.5K)>45){6(f.g.6p-f.g.5K>0){f.o.6F(f.g);e(u).3h("1X")}19{f.o.6J(f.g);e(u).3h("1U")}}})}6(f.o.9r==1b&&e(u).17(".12-1s").1k>1){e(u).17(".12-2h").1V(18(){f.o.am(f.g);6(f.g.2z){f.g.2T=1b;f.1x();6(f.g.3q){f.g.3q.1x()}6(f.g.30){6(f.g.2M){f.g.2M.5N()}}f.g.3Q=(1H 5a).5c()}},18(){6(f.g.2T==1b){f.28();f.g.2T=1f}})}f.7A();6(f.o.1v){f.g.1v=e("<29>").1o("12-c1").1C(e(u)).1g("1M",f.o.aD).1a({26:"2x",1L:"cf"}).3P(18(){16 t=0;6(!f.g.1v){t=1P}2f(18(){f.g.1v.11("2Y",f.g.1v.1c());f.g.1v.11("2W",f.g.1v.1e());6(f.g.1v.1a("1m")!="1W"){f.g.1v.11("4g",f.g.1v[0].1M.1m)}6(f.g.1v.1a("1G")!="1W"){f.g.1v.11("5S",f.g.1v[0].1M.1G)}6(f.g.1v.1a("1q")!="1W"){f.g.1v.11("4a",f.g.1v[0].1M.1q)}6(f.g.1v.1a("1p")!="1W"){f.g.1v.11("68",f.g.1v[0].1M.1p)}6(f.o.8k!=1f){e("<a>").1C(e(u)).1g("2R",f.o.8k).1g("cr",f.o.aF).1a({cq:"1R",cp:"1R"}).4e(f.g.1v)}f.g.1v.1a({1L:"1R",26:"2P"});f.86()},t)}).1g("1h",f.o.1v)}e(1Z).2g(18(){f.2g()});e(1Z).3Y("bT",18(){e(1Z).2g()});f.g.9q=1b;6(f.o.4X==1b){6(f.o.4r){f.g.2z=1b;e(u).17(".12-1r-28").1o("12-1r-28-1T")}19{e(u).17(".12-1r-1x").1o("12-1r-1x-1T")}f.1X()}19 6(1Q f.g.1K[0]!=="2L"){f.3O(f.g.1K,18(){f.g.1K.2I(f.o.7B,18(){f.g.4f=1f;e(14).1o("12-1T");6(f.o.5Q){e(14).1N(e(14).11("5l")+25).bR(18(){e(14).17(".12-3m").2u();e(14).17("2s, 6I").1O(18(){6(1Q e(14)[0].6H!==0){e(14)[0].6H=0}e(14).2u()});e(14).7x()})}f.g.1K.17(\' > *[1u*="12-l"]\').1O(18(){16 t=e(14);6((!t.2n("12-2s-3B")||t.2n("12-2s-3B")&&f.o.5Q===1f)&&t.11("4z")>0){t.11("4s",2f(18(){f.8F(t)},t.11("4z")))}})});f.7S(f.g.22);6(f.o.4r){f.g.4f=1f;f.28()}19{e(u).17(".12-1r-1x").1o("12-1r-1x-1T")}})}f.o.ac(e(u))};f.2g=18(){f.g.2g=1b;6(!f.g.2S){f.3z(f.g.1K,18(){6(f.g.2w){f.g.2w.6a()}f.g.2g=1f});6(f.g.1v){f.86()}}};f.28=18(){6(f.g.2z){6(f.g.2k=="1U"&&f.o.7W){f.1U()}19{f.1X()}}19{f.g.2z=1b;6(!f.g.2S&&!f.g.4f){f.5V()}}e(u).17(".12-1r-28").1o("12-1r-28-1T");e(u).17(".12-1r-1x").2m("12-1r-1x-1T")};f.5V=18(){6(e(u).17(".12-1T").11("12")){16 t=f.53.6P}19{16 t=f.o.6P}16 n=e(u).17(".12-1T").11("6b")?1d(e(u).17(".12-1T").11("6b")):t;6(!f.o.4X&&!e(u).17(".12-1T").11("6b")){16 r=e(u).17(".12-1s:eq("+(f.o.2U-1)+")").11("6b");n=r?r:t}2o(f.g.4u);6(f.g.3Q){6(!f.g.4k){f.g.4k=(1H 5a).5c()}6(f.g.4k>f.g.3Q){f.g.3Q=(1H 5a).5c()}6(!f.g.3D){f.g.3D=n}f.g.3D-=f.g.3Q-f.g.4k;f.g.3Q=1f;f.g.4k=(1H 5a).5c()}19{f.g.3D=n;f.g.4k=(1H 5a).5c()}f.g.3D=1d(f.g.3D);f.g.4u=2f(18(){f.g.4k=f.g.3Q=f.g.3D=1f;f.28()},f.g.3D);6(f.g.3q){f.g.3q.49({1c:f.g.1y()},f.g.3D,"8T",18(){e(14).1a({1c:0})})}6(f.g.30){16 i=f.g.30.17(".12-ct-1G .12-ct-3s");16 s=f.g.30.17(".12-ct-1m .12-ct-3s");6(f.g.30.1a("1L")=="1R"){i.1a({3s:0});s.1a({3s:0});f.g.30.2I(89)}6(!f.g.2M){f.g.2M=1H aZ;f.g.2M.9I(3b.6L(i[0],n/9J,{3l:0},{41:8K.8Q,3l:6N,bQ:18(){f.g.2M=1f}}));f.g.2M.9I(3b.6L(s[0],n/9J,{3l:0},{41:8K.8Q,3l:6N}))}19{f.g.2M.bK()}}};f.1x=18(){f.g.3Q=(1H 5a).5c();6(f.g.3q){f.g.3q.1x()}6(f.g.30){6(f.g.2M){f.g.2M.5N()}}6(!f.g.2T&&!f.g.2A){e(u).17(".12-1r-1x").1o("12-1r-1x-1T");e(u).17(".12-1r-28").2m("12-1r-28-1T")}2o(f.g.4u);f.g.2z=1f};f.9G=18(){2o(f.g.4u);f.g.2z=1f;2o(f.g.9F);2o(f.g.9B);2o(f.g.9C);2o(f.g.9D);2o(f.g.aG);6(f.g.3q){f.g.3q.1x()}6(f.g.30){6(f.g.2M){f.g.2M.5N()}}e(u).17("*").1x(1b,1f).7x();e(u).17(".12-1s >").1O(18(){6(e(14).11("3E")){e(14).11("3E").5N()}});6(!f.g.2T&&!f.g.2A){e(u).17(".12-1r-1x").1o("12-1r-1x-1T");e(u).17(".12-1r-28").2m("12-1r-28-1T")}};f.bP=18(){e(u).17("*").1x();2o(f.g.4u);f.4V(f.g.22,f.g.2k)};f.9E=18(t){6(e.5F(t.21())=="bl"||e.5F(t.21())=="8T"){1S t.21()}19{1S t.2l("7J","94").2l("8o","9f").2l("8s","97").2l("bO","bD").2l("dN","ed").2l("ee","ec").2l("eb","e8").2l("e9","ea").2l("ef","eg").2l("en","eo").2l("em","ek").2l("5L","eh").2l("ei","ej")}};f.1U=18(e){6(f.g.22<2){f.g.4q+=1}6(f.g.4q>f.o.4b&&f.o.4b>0&&!e){f.g.4q=0;f.1x();6(f.o.75==1f){f.o.4b=0}}19{16 t=f.g.22<2?f.g.2E:f.g.22-1;f.g.2k="1U";f.4V(t,f.g.2k)}};f.1X=18(e){6(!f.o.7p){6(!(f.g.22<f.g.2E)){f.g.4q+=1}6(f.g.4q>f.o.4b&&f.o.4b>0&&!e){f.g.4q=0;f.1x();6(f.o.75==1f){f.o.4b=0}}19{16 t=f.g.22<f.g.2E?f.g.22+1:1;f.g.2k="1X";f.4V(t,f.g.2k)}}19 6(!e){16 t=f.g.22;16 n=18(){t=1B.27(1B.2i()*f.g.2E)+1;6(t==f.g.22){n()}19{f.g.2k="1X";f.4V(t,f.g.2k)}};n()}19 6(e){16 t=f.g.22<f.g.2E?f.g.22+1:1;f.g.2k="1X";f.4V(t,f.g.2k)}};f.4V=18(t,n){f.g.4k=f.g.3Q=f.g.3D=1f;6(f.g.3q){f.g.3q.1x().1N(2D).49({1c:0},e7)}6(f.g.30){f.g.30.3M(4w);6(f.g.2M){f.g.2M.5z().2r(.35)}}6(f.g.4E==1b){f.g.4E=1f;f.g.2z=f.g.2A;f.g.1K.17(\'1Y[1h*="4U.3U"], 1Y[1h*="5x.be"], 1Y[1h*="5v.5j"]\').1O(18(){e(14).23().17(".12-5A").2I(f.g.v.8e,18(){e(14).23().17("1Y").1g("1h","")})});f.g.1K.17("2s, 6I").1O(18(){14.5N()})}e(u).17(\'1Y[1h*="4U.3U"], 1Y[1h*="5x.be"], 1Y[1h*="5v.5j"]\').1O(18(){2o(e(14).11("6w"))});2o(f.g.4u);f.g.5r=t;f.g.1t=e(u).17(".12-1s:eq("+(f.g.5r-1)+")");6(!n){6(f.g.22<f.g.5r){f.g.2k="1X"}19{f.g.2k="1U"}}16 r=0;6(e(u).17(\'1Y[1h*="4U.3U"], 1Y[1h*="5x.be"], 1Y[1h*="5v.5j"]\').1k>0){r=f.g.v.8e}6(1Q f.g.1t[0]!=="2L"){f.3O(f.g.1t,18(){f.49()})}};f.3O=18(t,n){f.g.4f=1b;6(f.g.9q){e(u).1a({26:"2P"})}6(f.o.3O){16 r=[];16 i=0;6(t.1a("3u-2G")!="1R"&&t.1a("3u-2G").1i("67")!=-1&&!t.2n("12-3A")&&!t.2n("12-2F-3A")){16 s=t.1a("3u-2G");s=s.3F(/67\\((.*)\\)/)[1].2l(/"/9t,"");r[r.1k]=[s,t]}t.17("29:2F(.12-3A, .12-2F-3A)").1O(18(){6(f.o.4C===1b){e(14).1g("1h",e(14).11("1h"))}r[r.1k]=[e(14).1g("1h"),e(14)]});t.17("*").1O(18(){6(e(14).1a("3u-2G")!="1R"&&e(14).1a("3u-2G").1i("67")!=-1&&!e(14).2n("12-3A")&&!e(14).2n("12-2F-3A")){16 t=e(14).1a("3u-2G");t=t.3F(/67\\((.*)\\)/)[1].2l(/"/9t,"");r[r.1k]=[t,e(14)]}});6(r.1k==0){e(".12-1I-2J, .12-1r-1X, .12-1r-1U, .12-1p-1r-2J").1a({26:"2P"});f.3z(t,n)}19{6(f.g.2t){f.g.6d.1a("1L","2p")}19{f.g.6d.1N(a5).2I(2D)}16 o=18(){f.g.6d.1x(1b,1b).1a({1L:"1R"});e(".12-1I-2J, .12-1r-1X, .12-1r-1U, .12-1p-1r-2J").1a({26:"2P"});6(46.42.1i("dU/7")!==-1||f.g.2t){2f(18(){f.3z(t,n)},50)}19{f.3z(t,n)}};2a(x=0;x<r.1k;x++){e("<29>").11("el",r[x]).3P(18(){e(14).11("el")[1].1o("12-3A");6(++i==r.1k){o()}}).43(18(){16 t=e(14).11("el")[0].9h(e(14).11("el")[0].9m("/")+1,e(14).11("el")[0].1k);6(1Z.6D){6D.dW(\'2Q 43:\\r\\n\\r\\6E 6T 4y 24 6S 3k 24 2G 4M 3u 2G "\'+t+\'" 3v 6R 2q a 6Q 4O 5o 4o 6U be 3f. 4K 6V 24 6Y 3k 4H 4J 6i 6X 3R 24 6W.\')}19{9d(\'2Q 43:\\r\\n\\r\\6E 6T 4y 24 6S 3k 24 2G 4M 3u 2G "\'+t+\'" 3v 6R 2q a 6Q 4O 5o 4o 6U be 3f. 4K 6V 24 6Y 3k 4H 4J 6i 6X 3R 24 6W.\')}e(14).1o("12-2F-3A");6(++i==r.1k){o()}}).1g("1h",r[x][0])}}}19{e(".12-1I-2J, .12-1r-1X, .12-1r-1U, .12-1p-1r-2J").1a({26:"2P"});f.3z(t,n)}};f.3z=18(t,n){t.1a({26:"2x",1L:"2p"});6(f.g.6u){f.g.6u()}f.7A();6(f.o.38=="4N"){f.9P()}t.2Z().1O(18(){16 t=e(14);16 n=t.11("4g")?t.11("4g"):"0";16 r=t.11("4a")?t.11("4a"):"0";6(t.3v("a")&&t.2Z().1k>0){t.1a({1L:"2p"});t=t.2Z()}16 i="1W";16 s="1W";6(t.11("2Y")){6(1Q t.11("2Y")=="3W"){i=1d(t.11("2Y"))*f.g.1z}19 6(t.11("2Y").1i("%")!=-1){i=t.11("2Y")}}6(t.11("2W")){6(1Q t.11("2W")=="3W"){s=1d(t.11("2W"))*f.g.1z}19 6(t.11("2W").1i("%")!=-1){s=t.11("2W")}}16 o=t.11("8X")?1d(t.11("8X"))*f.g.1z:0;16 a=t.11("8Y")?1d(t.11("8Y"))*f.g.1z:0;16 l=t.11("93")?1d(t.11("93"))*f.g.1z:0;16 c=t.11("92")?1d(t.11("92"))*f.g.1z:0;16 h=t.11("6y")?1d(t.11("6y"))*f.g.1z:0;16 p=t.11("6z")?1d(t.11("6z"))*f.g.1z:0;16 d=t.11("6C")?1d(t.11("6C"))*f.g.1z:0;16 v=t.11("6B")?1d(t.11("6B"))*f.g.1z:0;16 m=t.11("9v");16 g=t.11("9L");6(f.g.3V||f.o.3N>0){6(t.3v("29")&&!t.2n("12-bg")&&t.1g("1h")){t.1a({1c:"1W",1e:"1W"});6((i==0||i=="1W")&&1Q s=="3W"&&s!=0){i=s/t.1e()*t.1c()}6((s==0||s=="1W")&&1Q i=="3W"&&i!=0){s=i/t.1c()*t.1e()}6(i=="1W"){i=t.1c()*f.g.1z}6(s=="1W"){s=t.1e()*f.g.1z}t.1a({1c:i,1e:s})}6(!t.3v("29")){t.1a({1c:i,1e:s,"9M-a2":1d(m)*f.g.1z+"1D","a1-1e":1d(g)*f.g.1z+"1D"})}6(t.3v("1n")&&t.17("1Y").11("3S")){16 y=t.17("1Y");y.1g("1c",1d(y.11("2Y"))*f.g.1z).1g("1e",1d(y.11("2W"))*f.g.1z);t.1a({1c:1d(y.11("2Y"))*f.g.1z,1e:1d(y.11("2W"))*f.g.1z})}t.1a({2e:l+"1D "+a+"1D "+c+"1D "+o+"1D ",9Z:h+"1D",a3:p+"1D",a4:d+"1D",a8:v+"1D"})}6(!t.2n("12-bg")){16 b=t;6(t.23().3v("a")){t=t.23()}16 w=0;6(f.o.7d){w=f.o.7d>0?(f.g.1y()-f.o.7d)/2:0}19 6(f.o.7H){w=f.o.7H>0?(f.g.1y()-f.o.7H)/2:0}w=w<0?0:w;6(n.1i("%")!=-1){t.1a({1m:f.g.1y()/1E*1d(n)-b.1c()/2-o-h})}19 6(w>0||f.g.3V||f.o.3N>0){t.1a({1m:w+1d(n)*f.g.1z})}6(r.1i("%")!=-1){t.1a({1q:f.g.1F()/1E*1d(r)-b.1e()/2-l-d})}19 6(f.g.3V||f.o.3N>0){t.1a({1q:1d(r)*f.g.1z})}}19{16 E=e(u).17(".12-2h");t.1a({1c:"1W",1e:"1W"});i=t.1c();s=t.1e();16 S=f.g.1z;6(f.g.2j.1i("%")!=-1){6(f.g.1y()>i){S=f.g.1y()/i;6(f.g.1F()>s*S){S=f.g.1F()/s}}19 6(f.g.1F()>s){S=f.g.1F()/s;6(f.g.1y()>i*S){S=f.g.1y()/i}}}t.1a({1c:i*S,1e:s*S,3G:E.1c()/2-i*S/2,47:E.1e()/2-s*S/2})}});t.1a({1L:"1R",26:"2P"});f.7w();n();e(14).7x()};f.7w=18(){6(f.g.56){16 e=18(){6(f.g.56.1e()>0){6(f.g.a7>0){f.g.3T.1a({1e:f.g.56.1e()/2})}19{f.g.3T.1a({1e:f.g.56.1e(),47:-f.g.56.1e()/2})}}19{2f(18(){e()},50)}};e()}};f.7A=18(){6(f.o.3N>0){6(e(1Z).1c()<f.o.3N){f.g.3V=1b;f.g.2j=f.o.3N+"1D"}19{f.g.3V=1f;f.g.2j=f.g.7E;f.g.1z=1}}6(e(u).3t(".12-3g-3i-2b").1k){e(u).3t(".12-3g-3i-6A").1a({1c:e(1Z).1c()})}6(f.g.3V){16 t=e(u).23();6(f.o.8w===1b){e(u).1a({1c:"1E%",1e:e(1Z).1e()})}19{e(u).1a({1c:t.1c()-1d(e(u).1a("2e-1m"))-1d(e(u).1a("2e-1G"))});f.g.1z=e(u).1c()/1d(f.g.2j);e(u).1a({1e:f.g.1z*1d(f.g.3o)})}}19{f.g.1z=1;e(u).1a({1c:f.g.2j,1e:f.g.3o})}6(e(u).3t(".12-3g-3i-2b").1k){e(u).3t(".12-3g-3i-6A").1a({1e:e(u).3r(1b)});e(u).3t(".12-3g-3i-2b").1a({1e:e(u).3r(1b)});e(u).3t(".12-3g-3i-6A").1a({1c:e(1Z).1c(),1m:-e(u).3t(".12-3g-3i-2b").4d().1m});6(f.g.2j.1i("%")!=-1){16 n=1d(f.g.2j);16 r=e("5m").1c()/1E*n-(e(u).3x()-e(u).1c());e(u).1c(r)}}e(u).17(".12-2h, .12-1w-2b").1a({1c:f.g.1y(),1e:f.g.1F()});6(f.g.1K&&f.g.1t){f.g.1K.1a({1c:f.g.1y(),1e:f.g.1F()});f.g.1t.1a({1c:f.g.1y(),1e:f.g.1F()})}19{e(u).17(".12-1s").1a({1c:f.g.1y(),1e:f.g.1F()})}};f.86=18(){f.g.1v.1a({1c:f.g.1v.11("2Y")*f.g.1z,1e:f.g.1v.11("2W")*f.g.1z});6(f.g.2t){f.g.1v.1a("1L","2p")}19{f.g.1v.2I(2D)}16 t=6t=6s=6m="1W";6(f.g.1v.11("4g")&&f.g.1v.11("4g").1i("%")!=-1){t=f.g.1y()/1E*1d(f.g.1v.11("4g"))-f.g.1v.1c()/2+1d(e(u).1a("2e-1m"))}19{t=1d(f.g.1v.11("4g"))*f.g.1z}6(f.g.1v.11("5S")&&f.g.1v.11("5S").1i("%")!=-1){6t=f.g.1y()/1E*1d(f.g.1v.11("5S"))-f.g.1v.1c()/2+1d(e(u).1a("2e-1G"))}19{6t=1d(f.g.1v.11("5S"))*f.g.1z}6(f.g.1v.11("4a")&&f.g.1v.11("4a").1i("%")!=-1){6s=f.g.1F()/1E*1d(f.g.1v.11("4a"))-f.g.1v.1e()/2+1d(e(u).1a("2e-1q"))}19{6s=1d(f.g.1v.11("4a"))*f.g.1z}6(f.g.1v.11("68")&&f.g.1v.11("68").1i("%")!=-1){6m=f.g.1F()/1E*1d(f.g.1v.11("68"))-f.g.1v.1e()/2+1d(e(u).1a("2e-1p"))}19{6m=1d(f.g.1v.11("68"))*f.g.1z}f.g.1v.1a({1m:t,1G:6t,1q:6s,1p:6m})};f.9P=18(){f.7R("3Y");16 t=f.g.2j.1i("%")==-1?1d(f.g.2j):f.g.1y();e(u).17(".12-1I-1s a").1a({1c:1d(f.o.8y*f.g.1z),1e:1d(f.o.6c*f.g.1z)});e(u).17(".12-1I-1s a:7T").1a({4h:0});e(u).17(".12-1I-1s").1a({1e:1d(f.o.6c*f.g.1z)});16 n=e(u).17(".12-1I");16 r=f.o.77.1i("%")==-1?1d(f.o.77):1d(t/1E*1d(f.o.77));n.1a({1c:r*1B.27(f.g.1z*1E)/1E});6(n.1c()>e(u).17(".12-1I-1s").1c()){n.1a({1c:e(u).17(".12-1I-1s").1c()})}f.7R("9W")};f.7S=18(t){16 n=t?t:f.g.5r;e(u).17(".12-1I-1s a:2F(.12-4c-"+n+")").2Z().1O(18(){e(14).2m("12-4c-1T").1x().6l(8g,f.o.8I/1E)});e(u).17(".12-1I-1s a.12-4c-"+n).2Z().1o("12-4c-1T").1x().6l(8g,f.o.8P/1E)};f.7Q=18(){6(!e(u).17(".12-1I-1s-2b").2n("12-1I-1s-1V")){16 t=e(u).17(".12-4c-1T").1k?e(u).17(".12-4c-1T").23():1f;6(t){16 n=t.3L().1m+t.1c()/2;16 r=e(u).17(".12-1I-1s-2b").1c()/2-n;r=r<e(u).17(".12-1I-1s-2b").1c()-e(u).17(".12-1I-1s").1c()?e(u).17(".12-1I-1s-2b").1c()-e(u).17(".12-1I-1s").1c():r;r=r>0?0:r;e(u).17(".12-1I-1s").49({3G:r},dT)}}};f.7R=18(t){6(f.o.76&&!e(u).2n("12-1V")){2v(t){1l"3Y":f.g.40.1a({26:"2x",1L:"2p"});1j;1l"9W":f.g.40.1a({26:"2P",1L:"1R"});1j}}};f.49=18(){6(e(u).17(".12-1s").1k>1){f.g.2S=1b}f.g.4f=1f;2o(f.g.4u);2o(f.g.dS);f.g.95=f.g.1K;f.o.b5(f.g);6(f.o.38=="4N"){f.7S();6(!("6k"3R 1Z)){f.7Q()}}f.g.1t.1o("12-bn");16 t=7O=6o=7U=6r=7X=6q=8R=6j=dP=6n=dQ="1W";16 a=7Z=f.g.1y();16 l=7Y=f.g.1F();16 c=f.g.2k=="1U"?f.g.1K:f.g.1t;16 h=c.11("3y")?c.11("3y"):f.o.8D;16 p=f.g.8m[f.g.2k][h];6(p=="1m"||p=="1G"){a=6o=7Z=6q=0;6n=0}6(p=="1q"||p=="1p"){l=t=7Y=6r=0;6j=0}2v(p){1l"1m":7O=6r=0;6j=-f.g.1y();1j;1l"1G":t=7X=0;6j=f.g.1y();1j;1l"1q":7U=6q=0;6n=-f.g.1F();1j;1l"1p":6o=8R=0;6n=f.g.1F();1j}f.g.1K.1a({1m:t,1G:7O,1q:6o,1p:7U});f.g.1t.1a({1c:7Z,1e:7Y,1m:6r,1G:7X,1q:6q,1p:8R});16 d=f.g.1K.11("64")?1d(f.g.1K.11("64")):f.o.6x;16 v=f.g.1K.11("4Q")?1d(f.g.1K.11("4Q")):f.o.4T;16 m=f.g.1K.11("4L")?f.g.1K.11("4L"):f.o.4S;16 g=f.g.1t.11("5l")?1d(f.g.1t.11("5l")):f.o.65;16 y=f.g.1t.11("5O")?1d(f.g.1t.11("5O")):f.o.5T;6(y===0){y=1}16 b=f.g.1t.11("5E")?f.g.1t.11("5E"):f.o.66;16 w=18(){f.g.1K.1N(d+v/15).49({1c:a,1e:l},v,m,18(){E()})};16 E=18(){f.g.95.17(\' > *[1u*="12-l"]\').1O(18(){6(e(14).11("3E")){e(14).11("3E").81()}e(14).1a({dR:"1R"})});f.g.1K=f.g.1t;f.g.dX=f.g.22;f.g.22=f.g.5r;f.o.7N(f.g);6(f.o.3O&&f.o.4C){16 t=f.g.22==f.g.2E?1:f.g.22+1;e(u).17(".12-1s").eq(t-1).17("29:2F(.12-3A)").1O(18(){e(14).3P(18(){e(14).1o("12-3A")}).43(18(){16 t=e(14).11("1h").9h(e(14).11("1h").9m("/")+1,e(14).11("1h").1k);6(1Z.6D){6D(\'2Q 43:\\r\\n\\r\\6E 6T 4y 24 6S 3k 24 2G 4M 3u 2G "\'+t+\'" 3v 6R 2q a 6Q 4O 5o 4o 6U be 3f. 4K 6V 24 6Y 3k 4H 4J 6i 6X 3R 24 6W.\')}19{9d(\'2Q 43:\\r\\n\\r\\6E 6T 4y 24 6S 3k 24 2G 4M 3u 2G "\'+t+\'" 3v 6R 2q a 6Q 4O 5o 4o 6U be 3f. 4K 6V 24 6Y 3k 4H 4J 6i 6X 3R 24 6W.\')}e(14).1o("12-2F-3A")}).1g("1h",e(14).11("1h"))})}e(u).17(".12-1s").2m("12-1T");e(u).17(".12-1s:eq("+(f.g.22-1)+")").1o("12-1T").2m("12-bn");e(u).17(".12-1p-4G a").2m("12-1r-1T");e(u).17(".12-1p-4G a:eq("+(f.g.22-1)+")").1o("12-1r-1T");6(f.g.2z){f.5V()}f.g.2S=1f;6(f.g.2g==1b){f.3z(f.g.1K,18(){f.g.2g=1f})}};16 S=18(t){f.g.1K.17(\' > *[1u*="12-l"]\').1O(18(){6(!e(14).11("2y")){f.5I(e(14))}e(14).2m("12-8C");16 r=e(14).11("3y")?e(14).11("3y"):p;16 i,s;2v(r){1l"1m":i=-f.g.1y();s=0;1j;1l"1G":i=f.g.1y();s=0;1j;1l"1q":s=-f.g.1F();i=0;1j;1l"1p":s=f.g.1F();i=0;1j;1l"3n":s=0;i=0;1j}6(e(14).11("2y")==="1H"){16 o="1H"}19{16 o=e(14).11("5Z")?e(14).11("5Z"):1f}2v(o){1l"1m":i=f.g.1y();s=0;1j;1l"1G":i=-f.g.1y();s=0;1j;1l"1q":s=f.g.1F();i=0;1j;1l"1p":s=-f.g.1F();i=0;1j;1l"3n":s=0;i=0;1j;1l"1H":6(e(14).11("36")){6(e(14).11("36")==="1m"){i=f.g.1y()}19 6(e(14).11("36")==="1G"){i=-f.g.1y()}19{i=-1d(e(14).11("36"))}}19{i=-f.1w.85}6(e(14).11("34")){6(e(14).11("34")==="1q"){s=f.g.1F()}19 6(e(14).11("34")==="1p"){s=-f.g.1F()}19{s=-1d(e(14).11("34"))}}19{s=-f.1w.7D}1j}16 u=5i=5h=4t=5g=58=33=31="1R";u=e(14).11("5W")?e(14).11("5W"):f.1w.8t;5i=e(14).11("7e")?e(14).11("7e"):f.1w.8B;5h=e(14).11("7b")?e(14).11("7b"):f.1w.8d;4t=e(14).11("5U")?e(14).11("5U"):f.1w.7C;5g=e(14).11("7c")?e(14).11("7c"):f.1w.8r;58=e(14).11("7a")?e(14).11("7a"):f.1w.8u;6(4t===1){33=e(14).11("7g")?e(14).11("7g"):f.1w.8U;31=e(14).11("71")?e(14).11("71"):f.1w.8G}19{33=31=4t}16 a=e(14).11("74")?e(14).11("74").1J(" "):f.1w.8i;2a(16 l=0;l<a.1k;l++){6(a[l].1i("%")===-1&&a[l].1i("1m")!==-1&&a[l].1i("1G")!==-1&&a[l].1i("1q")!==-1&&a[l].1i("1p")!==-1){a[l]=""+1d(a[l])*f.g.1z+"1D"}}16 c=a.8H(" ");16 h=e(14).11("7j")?e(14).11("7j"):f.1w.8h;16 d=1d(e(14).1a("1m"));16 v=1d(e(14).1a("1q"));16 m=1d(e(14).1g("1u").1J("12-l")[1]);16 g=e(14).3x()>e(14).3r()?e(14).3x():e(14).3r();16 y=1d(u)===0?e(14).3x():g;16 b=1d(u)===0?e(14).3r():g;6(m===-1&&o!=="1H"||e(14).11("36")==="1m"||e(14).11("36")==="1G"){6(i<0){i=-(f.g.1y()-d+(33/2-.5)*y+1E)}19 6(i>0){i=d+(33/2+.5)*y+1E}}19{i=i*f.g.1z}6(m===-1&&o!=="1H"||e(14).11("34")==="1q"||e(14).11("34")==="1p"){6(s<0){s=-(f.g.1F()-v+(31/2-.5)*b+1E)}19 6(s>0){s=v+(31/2+.5)*b+1E}}19{s=s*f.g.1z}6(m===-1||o==="1H"){16 w=1}19{16 E=f.g.1K.11("7f")?1d(f.g.1K.11("7f")):f.o.8L;16 w=m*E}6(e(14).11("2y")==="1H"){16 S=f.1w.6x;16 x=f.1w.4T;16 T=f.1w.4S}19{16 S=f.o.6x;16 x=f.o.4T;16 T=f.o.4S}16 N=e(14).11("64")?1d(e(14).11("64")):S;16 C=e(14).11("4Q")?1d(e(14).11("4Q")):x;6(C===0){C=1}16 k=e(14).11("4L")?e(14).11("4L"):T;6(t){N=0;C=t}6(e(14).11("4s")){2o(e(14).11("4s"))}16 L={26:"2x"};16 A=e(14);16 O={3l:u,4A:5i,4B:5h,7h:5g,7k:58,5p:33,5n:31,x:-i*w,y:-s*w,1N:N/1P,41:n(k),7V:18(){A.1a(L)}};6(o=="3n"||!o&&r==="3n"||e(14).11("bh")!=="1f"&&e(14).11("2y")==="1H"){O["3e"]=0;L["3e"]=e(14).11("7o")}6(e(14).11("3E")){e(14).11("3E").81()}3b.7z(e(14)[0],{8M:c,8j:h});e(14).11("3E",3b.2q(e(14)[0],C/1P,O))})};16 x=18(){f.g.1t.1N(d+g).49({1c:f.g.1y(),1e:f.g.1F()},y,b)};16 T=18(){6(f.g.3a){d=0}6(1Q f.o.b9==="18"){f.o.b9(f.g,d+g)}f.g.1t.17(\' > *[1u*="12-l"]\').1O(18(){6(!e(14).11("2y")){f.5I(e(14))}6(e(14).11("2y")==="1H"){16 t="1H"}19{16 t=e(14).11("3y")?e(14).11("3y"):p}16 r,i;2v(t){1l"1m":r=-f.g.1y();i=0;1j;1l"1G":r=f.g.1y();i=0;1j;1l"1q":i=-f.g.1F();r=0;1j;1l"1p":i=f.g.1F();r=0;1j;1l"3n":i=0;r=0;1j;1l"1H":6(e(14).11("55")){6(e(14).11("55")==="1m"){r=-f.g.1y()}19 6(e(14).11("55")==="1G"){r=f.g.1y()}19{r=1d(e(14).11("55"))}}19{r=f.1w.bu}6(e(14).11("5k")){6(e(14).11("5k")==="1q"){i=-f.g.1F()}19 6(e(14).11("5k")==="1p"){i=f.g.1F()}19{i=1d(e(14).11("5k"))}}19{i=f.1w.b7}1j}16 s=8c=82=6O=84=8f=4Z=51="1R";s=e(14).11("8x")?e(14).11("8x"):f.1w.b8;8c=e(14).11("ba")?e(14).11("ba"):f.1w.bo;82=e(14).11("bB")?e(14).11("bB"):f.1w.96;6O=e(14).11("8v")?e(14).11("8v"):f.1w.9j;84=e(14).11("bk")?e(14).11("bk"):f.1w.9e;8f=e(14).11("br")?e(14).11("br"):f.1w.9U;6(6O===1){4Z=e(14).11("bm")?e(14).11("bm"):f.1w.9l;51=e(14).11("bp")?e(14).11("bp"):f.1w.9g}19{4Z=51=6O}16 o=e(14).11("bx")?e(14).11("bx").1J(" "):f.1w.9S;2a(16 u=0;u<o.1k;u++){6(o[u].1i("%")===-1&&o[u].1i("1m")!==-1&&o[u].1i("1G")!==-1&&o[u].1i("1q")!==-1&&o[u].1i("1p")!==-1){o[u]=""+1d(o[u])*f.g.1z+"1D"}}16 a=o.8H(" ");16 l=e(14).11("bj")?e(14).11("bj"):f.1w.9X;16 c=1d(e(14).1a("1m"));16 h=1d(e(14).1a("1q"));16 d=1d(e(14).1g("1u").1J("12-l")[1]);6(e(14)[0].1M.1c.1i("%")!==-1){e(14).1a({1c:f.g.1y()/1E*1d(e(14)[0].1M.1c)})}16 v=e(14).3x()>e(14).3r()?e(14).3x():e(14).3r();16 m=1d(s)===0?e(14).3x():v;16 g=1d(s)===0?e(14).3r():v;6(d===-1&&t!=="1H"||e(14).11("55")==="1m"||e(14).11("55")==="1G"){6(r<0){r=-(c+(4Z/2+.5)*m+1E)}19 6(r>0){r=f.g.1y()-c+(4Z/2-.5)*m+1E}}19{r=r*f.g.1z}6(d===-1&&t!=="1H"||e(14).11("5k")==="1q"||e(14).11("5k")==="1p"){6(i<0){i=-(h+(51/2+.5)*g+1E)}19 6(i>0){i=f.g.1F()-h+(51/2-.5)*g+1E}}19{i=i*f.g.1z}6(d===-1||t==="1H"){16 y=1}19{16 b=f.g.1t.11("b2")?1d(f.g.1t.11("b2")):f.o.af;16 y=d*b}6(e(14).11("2y")==="1H"){16 w=f.1w.65;16 E=f.1w.5T;16 S=f.1w.66}19{16 w=f.o.65;16 E=f.o.5T;16 S=f.o.66}16 x=e(14).11("5l")?1d(e(14).11("5l")):w;16 T=e(14).11("5O")?1d(e(14).11("5O")):E;16 N=e(14).11("5E")?e(14).11("5E"):S;16 C=e(14);16 k=18(){6(C.2n("12-2s-3B")){C.1o("12-8C")}6(f.o.5Q==1b){C.17(".12-3m").2u();C.17("2s, 6I").1O(18(){6(1Q e(14)[0].6H!==0){e(14)[0].6H=0}e(14).2u()})}6((!C.2n("12-2s-3B")||C.2n("12-2s-3B")&&f.o.5Q===1f)&&C.11("4z")>0){C.11("4s",2f(18(){f.8F(C)},C.11("4z")))}};e(14).1a({3G:0,47:0});16 L={5p:4Z,5n:51,7h:84,7k:8f,3l:s,4A:8c,4B:82,26:"2P",x:r*y,y:i*y};16 A={3l:0,4A:0,4B:0,7h:0,7k:0,5p:1,5n:1,41:n(N),1N:x/1P,x:0,y:0,7V:18(){k()}};6(t.1i("3n")!=-1||e(14).11("e5")!=="1f"&&e(14).11("2y")==="1H"){L["3e"]=0;A["3e"]=e(14).11("7o")}6(e(14).11("3E")){e(14).11("3E").81()}3b.7z(e(14)[0],{8j:l,8M:a});e(14).11("3E",3b.6L(e(14)[0],T/1P,L,A))})};16 N=18(){6(i(e(u))&&(f.g.1t.11("5q")||f.g.1t.11("5B"))){6(f.g.1t.11("5q")&&f.g.1t.11("5B")){16 t=1B.27(1B.2i()*2);16 n=[["3d",f.g.1t.11("5q")],["b6",f.g.1t.11("5B")]];k(n[t][0],n[t][1])}19 6(f.g.1t.11("5q")){k("3d",f.g.1t.11("5q"))}19{k("b6",f.g.1t.11("5B"))}}19{6(f.g.1t.11("5M")&&f.g.1t.11("5D")){16 t=1B.27(1B.2i()*2);16 n=[["2d",f.g.1t.11("5M")],["b4",f.g.1t.11("5D")]];k(n[t][0],n[t][1])}19 6(f.g.1t.11("5M")){k("2d",f.g.1t.11("5M"))}19 6(f.g.1t.11("5D")){k("b4",f.g.1t.11("5D"))}19{k("2d","1")}}};16 C=18(){6(i(e(u))&&5R.1i("3d")!=-1){k("3d",5R.1J(":")[1])}19{6(5R.1i("3d")!=-1){k("2d","4H")}19{k("2d",5R.1J(":")[1])}}};16 k=18(e,t){16 n=e.1i("e3")==-1?f.t:f.ct;16 r="3d",i,s;6(e.1i("2d")!=-1){r="2d"}6(t.1i("7T")!=-1){s=n["t"+r].1k-1;i="7T"}19 6(t.1i("4H")!=-1){s=1B.27(1B.2i()*o(n["t"+r]));i="2i bc 4H"}19{16 u=t.1J(",");16 a=u.1k;s=1d(u[1B.27(1B.2i()*a)])-1;i="2i bc e2"}L(r,n["t"+r][s])};16 L=18(t,i){16 o=e(u).17(".12-2h");16 a=f.g.1K.17(\'*[1u*="12-l"]\').1k>0?1P:0;16 l=i.6e.21().1i("dZ")==-1?1f:1b;16 c=i.6e.21().1i("e0")==-1?1f:1b;16 h=1Q i.4v;16 p=1Q i.4x;2v(h){1l"3W":h=i.4v;1j;1l"5J":h=1B.27(1B.2i()*(1d(i.4v.1J(",")[1])-1d(i.4v.1J(",")[0])+1))+1d(i.4v.1J(",")[0]);1j;b3:h=1B.27(1B.2i()*(i.4v[1]-i.4v[0]+1))+i.4v[0];1j}2v(p){1l"3W":p=i.4x;1j;1l"5J":p=1B.27(1B.2i()*(1d(i.4x.1J(",")[1])-1d(i.4x.1J(",")[0])+1))+1d(i.4x.1J(",")[0]);1j;b3:p=1B.27(1B.2i()*(i.4x[1]-i.4x[0]+1))+i.4x[0];1j}6(f.g.73()==1b&&f.o.aU==1b||f.g.2t&&f.o.aW==1b){6(h>=15){h=7}19 6(h>=5){h=4}19 6(h>=4){h=3}19 6(h>2){h=2}6(p>=15){p=7}19 6(p>=5){p=4}19 6(p>=4){p=3}19 6(p>2){p=2}6(p>2&&h>2){p=2;6(h>4){h=4}}}16 d=e(u).17(".12-2h").1c()/h;16 v=e(u).17(".12-2h").1e()/p;6(!f.g.2w){f.g.2w=e("<1n>").1o("12-1w-2b").1o("12-4D-2x").1a({1c:o.1c(),1e:o.1e()}).5w(o)}19{f.g.2w.1x(1b,1b).6a().1a({1L:"2p",1c:o.1c(),1e:o.1e()})}16 m=o.1c()-1B.27(d)*h;16 g=o.1e()-1B.27(v)*p;16 y=[];y.bt=18(){16 e=14.1k,t,n,r;6(e==0)1S 1f;9p(--e){t=1B.27(1B.2i()*(e+1));n=14[e];r=14[t];14[e]=r;14[t]=n}1S 14};2a(16 b=0;b<h*p;b++){y.88(b)}2v(i.3Z.ep){1l"5z":y.5z();1j;1l"bv-7M":y=s(p,h,"7M");1j;1l"bv-5z":y=s(p,h,"5z");1j;1l"2i":y.bt();1j}16 w=f.g.1K.17(".12-bg");16 x=f.g.1t.17(".12-bg");6(w.1k==0&&x.1k==0){t="2d";i=e.4F(1b,{},f.t["er"][0]);i.1A.2r=1;i.3Z.1N=0}6(t=="3d"){f.g.3a=(h*p-1)*i.3Z.1N;16 N=0;6(i.2N&&i.2N.2r){N+=i.2N.2r}6(i.2c&&i.2c.2r){N+=i.2c.2r}6(i.2B&&i.2B.2r){N+=i.2B.2r}f.g.3a+=N;16 C=0;6(i.2N&&i.2N.1N){C+=i.2N.1N}6(i.2c&&i.2c.1N){C+=i.2c.1N}6(i.2B&&i.2B.1N){C+=i.2B.1N}f.g.3a+=C}19{f.g.3a=(h*p-1)*i.3Z.1N+i.1A.2r;f.g.57=e("<1n>").1o("12-eU").1C(f.g.2w);f.g.7y=e("<1n>").1o("12-eW").1C(f.g.2w)}16 k=f.g.2k;2a(16 L=0;L<h*p;L++){16 A=L%h==0?m:0;16 O=L>(p-1)*h-1?g:0;16 M=e("<1n>").1o("12-1w-3Z").1a({1c:1B.27(d)+A,1e:1B.27(v)+O}).1C(f.g.2w);16 48,D;6(t=="3d"){M.1o("12-3d-2b");16 P=1B.27(d)+A;16 H=1B.27(v)+O;16 B;6(i.2c.5G=="ao"){6(1B.4m(i.2c.1A.3j)>90&&i.3Z.aY!="as"){B=1B.27(P/7)+A}19{B=P}}19{6(1B.4m(i.2c.1A.2V)>90&&i.3Z.aY!="as"){B=1B.27(H/7)+O}19{B=H}}16 j=P/2;16 F=H/2;16 I=B/2;16 q=18(t,n,r,i,s,o,u,a,f){e("<1n>").1o(t).1a({1c:r,1e:i,"-o-44":"5t("+s+"1D, "+o+"1D, "+u+"1D) 2V("+a+"3J) 3j("+f+"3J) 5s(5y) 4R(1, 1, 1)","-9u-44":"5t("+s+"1D, "+o+"1D, "+u+"1D) 2V("+a+"3J) 3j("+f+"3J) 5s(5y) 4R(1, 1, 1)","-9y-44":"5t("+s+"1D, "+o+"1D, "+u+"1D) 2V("+a+"3J) 3j("+f+"3J) 5s(5y) 4R(1, 1, 1)","-62-44":"5t("+s+"1D, "+o+"1D, "+u+"1D) 2V("+a+"3J) 3j("+f+"3J) 5s(5y) 4R(1, 1, 1)",44:"5t("+s+"1D, "+o+"1D, "+u+"1D) 2V("+a+"3J) 3j("+f+"3J) 5s(5y) 4R(1, 1, 1)"}).1C(n)};q("12-3d-3H",M,0,0,0,0,-I,0,0);16 R=0;16 U=0;16 z=0;6(i.2c.5G=="eX"&&1B.4m(i.2c.1A.2V)>90){q("12-3d-5L",M.17(".12-3d-3H"),P,H,-j,-F,-I,6N,0)}19{q("12-3d-5L",M.17(".12-3d-3H"),P,H,-j,-F,-I,0,6N)}q("12-3d-1p",M.17(".12-3d-3H"),P,B,-j,F-I,0,-90,0);q("12-3d-1q",M.17(".12-3d-3H"),P,B,-j,-F-I,0,90,0);q("12-3d-aw",M.17(".12-3d-3H"),P,H,-j,-F,I,0,0);q("12-3d-1m",M.17(".12-3d-3H"),B,H,-j-I,-F,0,0,-90);q("12-3d-1G",M.17(".12-3d-3H"),B,H,j-I,-F,0,0,90);48=M.17(".12-3d-aw");6(i.2c.5G=="ao"){6(1B.4m(i.2c.1A.3j)>90){D=M.17(".12-3d-5L")}19{D=M.17(".12-3d-1m, .12-3d-1G")}}19{6(1B.4m(i.2c.1A.2V)>90){D=M.17(".12-3d-5L")}19{D=M.17(".12-3d-1q, .12-3d-1p")}}16 W=y[L]*i.3Z.1N;16 X=f.g.2w.17(".12-3d-2b:eq("+L+") .12-3d-3H");16 V=1H aZ;6(i.2N&&i.2N.1A){i.2N.1A.1N=i.2N.1A.1N?(i.2N.1A.1N+W)/1P:W/1P;V.2q(X[0],i.2N.2r/1P,r(i.2N.1A,i.2N.4I))}19{i.2c.1A.1N=i.2c.1A.1N?(i.2c.1A.1N+W)/1P:W/1P}V.2q(X[0],i.2c.2r/1P,r(i.2c.1A,i.2c.4I));6(i.2B){6(!i.2B.1A){i.2B.1A={}}V.2q(X[0],i.2B.2r/1P,r(i.2B.1A,i.2B.4I,"2B"))}}19{16 J=2X=2O=2H="1W";16 K=6h=1;6(i.1A.5G=="2i"){16 Q=["1q","1p","1G","1m"];16 G=Q[1B.27(1B.2i()*Q.1k)]}19{16 G=i.1A.5G}6(i.6e.21().1i("aA")!=-1&&L%2==0){6(k=="1U"){k="1X"}19{k="1U"}}6(k=="1U"){2v(G){1l"1q":G="1p";1j;1l"1p":G="1q";1j;1l"1m":G="1G";1j;1l"1G":G="1m";1j;1l"7F":G="7I";1j;1l"7G":G="7K";1j;1l"7K":G="7G";1j;1l"7I":G="7F";1j}}2v(G){1l"1q":J=2O=-M.1e();2X=2H=0;1j;1l"1p":J=2O=M.1e();2X=2H=0;1j;1l"1m":J=2O=0;2X=2H=-M.1c();1j;1l"1G":J=2O=0;2X=2H=M.1c();1j;1l"7F":J=M.1e();2O=0;2X=M.1c();2H=0;1j;1l"7G":J=M.1e();2O=0;2X=-M.1c();2H=0;1j;1l"7K":J=-M.1e();2O=0;2X=M.1c();2H=0;1j;1l"7I":J=-M.1e();2O=0;2X=-M.1c();2H=0;1j}f.g.52=i.1A.5u?i.1A.5u:1;6(l==1b&&f.g.52!=1){J=J/2;2O=2O/2;2X=2X/2;2H=2H/2}2v(i.1A.4W){1l"3n":J=2O=2X=2H=0;K=0;6h=1;1j;1l"eK":K=0;6h=1;6(f.g.52==1){2O=2H=0}1j}6((i.1A.3s||i.1A.2V||i.1A.3j||f.g.52!=1)&&!f.g.2t&&i.1A.4W!="1s"){M.1a({4D:"2P"})}19{M.1a({4D:"2x"})}6(l==1b){f.g.57.1a({4D:"2P"})}19{f.g.57.1a({4D:"2x"})}6(c==1b||i.1A.4W=="1s"||l==1b){16 Y=M.1C(f.g.57);16 Z=M.7v().1C(f.g.7y);48=e("<1n>").1o("12-eJ").1C(Y)}19{16 Z=M.1C(f.g.7y)}D=e("<1n>").1o("12-ez").1C(Z).1a({1q:-J,1m:-2X,es:"2p",3e:K});16 et=y[L]*i.3Z.1N;16 59=i.1A.3s?i.1A.3s:0;16 70=i.1A.2V?i.1A.2V:0;16 6Z=i.1A.3j?i.1A.3j:0;6(k=="1U"){59=-59;70=-70;6Z=-6Z}3b.6L(D[0],i.1A.2r/1P,{3l:59,4A:70,4B:6Z,5u:f.g.52},{1N:et/1P,1q:0,1m:0,3e:6h,3l:0,4A:0,4B:0,5u:1,41:n(i.1A.4I)});6(c==1b&&(x.1k<1||x.1k>0&&(x.1g("1h").21().1i("4P")!=-1||x.1c()<f.g.1y()||x.1e()<f.g.1F()))){3b.2q(48[0],i.1A.2r/1P,{1N:et/1P,3e:0,41:n(i.1A.4I)})}6((i.1A.4W=="1s"||l==1b)&&i.6e.21().1i("aA")==-1){16 4o=0;6(59!=0){4o=-59}3b.2q(48[0],i.1A.2r/1P,{1N:et/1P,1q:2O,1m:2H,3l:4o,5u:f.g.52,3e:K,41:n(i.1A.4I)})}}6(w.1k){6(t=="3d"||t=="2d"&&(c==1b||i.1A.4W=="1s"||l==1b)){48.4e(e("<29>").1g("1h",w.1g("1h")).1a({1c:w[0].1M.1c,1e:w[0].1M.1e,3G:3c(w.1a("4h-1m"))-3c(M.3L().1m),47:3c(w.1a("4h-1q"))-3c(M.3L().1q)}))}19 6(f.g.57.2Z().1k==0){f.g.57.4e(e("<29>").1g("1h",w.1g("1h")).1a({1c:w[0].1M.1c,1e:w[0].1M.1e,3G:3c(w.1a("4h-1m")),47:3c(w.1a("4h-1q"))}))}}6(x.1k){D.4e(e("<29>").1g("1h",x.1g("1h")).1a({1c:x[0].1M.1c,1e:x[0].1M.1e,3G:3c(x.1a("4h-1m"))-3c(M.3L().1m),47:3c(x.1a("4h-1q"))-3c(M.3L().1q)}))}}16 53=f.g.1K;16 2K=f.g.1t;2f(18(){53.17(".12-bg").1a({26:"2x"})},50);2K.17(".12-bg").1a({26:"2x"});f.g.2w.2m("12-4D-2x");S(a);6(a===0){a=10}2f(18(){53.1a({1c:0})},a);16 8p=1d(2K.11("6f"))?1d(2K.11("6f")):0;16 at=f.g.3a+8p>0?f.g.3a+8p:0;2f(18(){6(f.g.2g==1b){f.g.2w.6a();53.2m("12-1T");f.3z(2K,18(){f.g.2g=1f})}T();6(2K.17(".12-bg").1k<1||2K.17(".12-bg").1k>0&&2K.17(".12-bg").1g("1h").21().1i("4P")!=-1){f.g.2w.1N(89).3M(2D,18(){e(14).6a().aM()})}2K.1a({1c:f.g.1y(),1e:f.g.1F()})},at);6(f.g.3a<2D){f.g.3a=1P}2f(18(){f.g.2w.1o("12-4D-2x");2K.1o("12-1T");6(2K.17(".12-bg").1k){2K.17(".12-bg").1a({1L:"1R",26:"2P"});6(f.g.2t){2K.17(".12-bg").1a("1L","2p");2f(18(){E()},4w)}19{2K.17(".12-bg").2I(4w,18(){E()})}}19{E()}},f.g.3a)};16 A=18(){f.g.1t.17(\' > *[1u*="12-l"]\').1O(18(){e(14).1a({26:"2x"})});f.g.8A=e(u).4d().1q;e(1Z).3P(18(){2f(18(){f.g.8A=e(u).4d().1q},20)});16 t=18(){6(e(1Z).eD()+e(1Z).1e()-f.g.1F()/2>f.g.8A){f.g.6g=1b;6(f.g.7P===1b){f.o.4r=1b;f.28()}T()}};e(1Z).dO(18(){6(!f.g.6g){t()}});t()};16 O=(f.g.1t.11("5q")||f.g.1t.11("5M"))&&f.t||(f.g.1t.11("5B")||f.g.1t.11("5D"))&&f.ct?"1H":"5H";6(!f.g.1t.11("2y")){f.5I(f.g.1t)}6(f.g.1t.11("2y")==="1H"){O="1H"}6(f.o.91){O="aL"}6(f.o.4X&&!f.g.6g){6(f.g.2E==1){16 d=0;f.o.7N(f.g)}19{16 M=1d(f.g.1t.11("6f"))?1d(f.g.1t.11("6f")):0;16 48=O=="1H"?0:v;f.g.aG=2f(18(){E()},48+1B.4m(M))}f.g.3a=1b;6(f.o.8n===1b){A()}19{f.g.6g=1b;T()}f.g.1t.1a({1c:f.g.1y(),1e:f.g.1F()});6(!f.g.2t){f.g.1t.17(".12-bg").1a({1L:"1R"}).2I(f.o.7B)}f.g.4f=1f}19{2v(O){1l"5H":f.g.3a=1f;6(f.g.2w){f.g.2w.6a()}w();S();x();T();1j;1l"1H":6(1Q 5R!="2L"){C()}19{N()}1j;1l"aL":L(f.o.91.4W,f.o.91.cY);1j}}};f.5I=18(e){16 t=e.11("12")||!e.11("12")&&!e.11("6b")&&!e.11("3y")&&!e.11("5Z")&&!e.11("5l")&&!e.11("64")&&!e.11("5O")&&!e.11("4Q")&&!e.11("4z")&&!e.11("5E")&&!e.11("4L")&&!e.11("8v")&&!e.11("5U")&&!e.11("8x")&&!e.11("5W")?"1H":"5H";e.11("2y",t)};f.8F=18(e){6(!e.11("2y")){f.5I(e)}e.2m("12-8C");16 t=f.g.1K;6(f.g.2k!="1U"&&f.g.1t){t=f.g.1t}16 r=t.11("3y")?t.11("3y"):f.o.8D;16 i=f.g.8m[f.g.2k][r];16 s=e.11("3y")?e.11("3y"):i;16 o,u;2v(s){1l"1m":o=-f.g.1y();u=0;1j;1l"1G":o=f.g.1y();u=0;1j;1l"1q":u=-f.g.1F();o=0;1j;1l"1p":u=f.g.1F();o=0;1j;1l"3n":u=0;o=0;1j}6(e.11("2y")==="1H"){16 a="1H"}19{16 a=e.11("5Z")?e.11("5Z"):1f}2v(a){1l"1m":o=f.g.1y();u=0;1j;1l"1G":o=-f.g.1y();u=0;1j;1l"1q":u=f.g.1F();o=0;1j;1l"1p":u=-f.g.1F();o=0;1j;1l"3n":u=0;o=0;1j;1l"1H":6(e.11("36")){6(e.11("36")==="1m"){o=f.g.1y()}19 6(e.11("36")==="1G"){o=-f.g.1y()}19{o=-1d(e.11("36"))}}19{o=-f.1w.85}6(e.11("34")){6(e.11("34")==="1q"){u=f.g.1F()}19 6(e.11("34")==="1p"){u=-f.g.1F()}19{u=-1d(e.11("34"))}}19{u=-f.1w.7D}1j}16 l=5i=5h=4t=5g=58=33=31="1R";l=e.11("5W")?e.11("5W"):f.1w.8t;5i=e.11("7e")?e.11("7e"):f.1w.8B;5h=e.11("7b")?e.11("7b"):f.1w.8d;4t=e.11("5U")?e.11("5U"):f.1w.7C;5g=e.11("7c")?e.11("7c"):f.1w.8r;58=e.11("7a")?e.11("7a"):f.1w.8u;6(4t===1){33=e.11("7g")?e.11("7g"):f.1w.8U;31=e.11("71")?e.11("71"):f.1w.8G}19{33=31=4t}16 c=e.11("74")?e.11("74").1J(" "):f.1w.8i;2a(16 h=0;h<c.1k;h++){6(c[h].1i("%")===-1&&c[h].1i("1m")!==-1&&c[h].1i("1G")!==-1&&c[h].1i("1q")!==-1&&c[h].1i("1p")!==-1){c[h]=""+1d(c[h])*f.g.1z+"1D"}}16 p=c.8H(" ");16 d=e.11("7j")?e.11("7j"):f.1w.8h;16 v=1d(e.1a("1m"));16 m=1d(e.1a("1q"));16 g=1d(e.1g("1u").1J("12-l")[1]);16 y=e.3x()>e.3r()?e.3x():e.3r();16 b=1d(l)===0?e.3x():y;16 w=1d(l)===0?e.3r():y;6(g===-1&&a!=="1H"||e.11("36")==="1m"||e.11("36")==="1G"){6(o<0){o=-(f.g.1y()-v+(33/2-.5)*b+1E)}19 6(o>0){o=v+(33/2+.5)*b+1E}}19{o=o*f.g.1z}6(g===-1&&a!=="1H"||e.11("34")==="1q"||e.11("34")==="1p"){6(u<0){u=-(f.g.1F()-m+(31/2-.5)*w+1E)}19 6(u>0){u=m+(31/2+.5)*w+1E}}19{u=u*f.g.1z}6(g===-1||a==="1H"){16 E=1}19{16 S=f.g.1K.11("7f")?1d(f.g.1K.11("7f")):f.o.8L;16 E=g*S}6(e.11("2y")==="1H"){16 x=f.1w.4T;16 T=f.1w.4S}19{16 x=f.o.4T;16 T=f.o.4S}16 N=e.11("4Q")?1d(e.11("4Q")):x;6(N===0){N=1}16 C=e.11("4L")?e.11("4L"):T;16 k={26:"2x"};16 L={3l:l,4A:5i,4B:5h,7h:5g,7k:58,5p:33,5n:31,x:-o*E,y:-u*E,41:n(C),7V:18(){e.1a(k)}};6(a=="3n"||!a&&s=="3n"||e.11("bh")!=="1f"&&e.11("2y")==="1H"){L["3e"]=0;k["3e"]=e.11("7o")}3b.7z(e[0],{8j:d,8M:p});3b.2q(e[0],N/1P,L)};f.3P()};16 n=18(e){16 t;6(e.21().1i("bl")!==-1||e.21().1i("8T")!==-1){t=8K.8Q}19 6(e.21().1i("7J")!==-1){16 n=e.21().1J("7J")[1];t=1Z[n.8q(0).8Z()+n.8V(1)].94}19 6(e.21().1i("8s")!==-1){16 n=e.21().1J("8s")[1];t=1Z[n.8q(0).8Z()+n.8V(1)].97}19 6(e.21().1i("8o")!==-1){16 n=e.21().1J("8o")[1];t=1Z[n.8q(0).8Z()+n.8V(1)].9f}1S t};16 r=18(e,t,r,i){6(1Q t==="2L"){16 t="cK"}16 s={};6(e.3s!==i){s.3l=e.3s}6(e.3j!==i){s.4B=e.3j}6(e.2V!==i){s.4A=e.2V}6(r==="2B"){s.5p=s.5n=s.9i=1}19 6(e.4R!==i){s.5p=s.5n=s.9i=e.4R}6(e.1N){s.1N=r==="2B"?e.1N/1P:e.1N}s.41=n(t);1S s};16 i=18(t){16 n=e("<1n>"),r=1f,i=1f,s=["cI","cH","cE","cF","cG"];44=["cL","cM","cS","cT","cR"];2a(16 o=s.1k-1;o>=0;o--){r=r?r:n[0].1M[s[o]]!=2L}2a(16 o=44.1k-1;o>=0;o--){n.1a("44-1M","9N-3d");i=i?i:n[0].1M[44[o]]=="9N-3d"}6(r&&n[0].1M[s[4]]!=2L){n.1g("69","12-cO").1C(t);r=n[0].cP===3&&n[0].dc===9;n.9Q()}1S r&&i};16 s=18(e,t,n){16 r=[];6(n=="7M"){2a(16 i=0;i<e;i++){2a(16 s=0;s<t;s++){r.88(i+s*e)}}}19{2a(16 i=e-1;i>-1;i--){2a(16 s=t-1;s>-1;s--){r.88(i+s*e)}}}1S r};16 o=18(e){16 t=0;2a(16 n 3R e){6(e.dd(n)){++t}}1S t};16 u=18(){9w=18(e){e=e.21();16 t=/(9x)[ \\/]([\\w.]+)/.5Y(e)||/(62)[ \\/]([\\w.]+)/.5Y(e)||/(dC)(?:.*3X|)[ \\/]([\\w.]+)/.5Y(e)||/(98) ([\\w.]+)/.5Y(e)||e.1i("a6")<0&&/(dD)(?:.*? dB:([\\w.]+)|)/.5Y(e)||[];1S{8S:t[1]||"",3X:t[2]||"0"}};16 e=9w(46.42),t={};6(e.8S){t[e.8S]=1b;t.3X=e.3X}6(t.9x){t.62=1b}19 6(t.62){t.dy=1b}1S t};dz=18(e,t){16 n=["62","dE","9y","9u","o",""];16 r=0,i,s;9p(r<n.1k&&!e[i]){i=t;6(n[r]==""){i=i.9s(0,1).21()+i.9s(1)}i=n[r]+i;s=1Q e[i];6(s!="2L"){n=[n[r]];1S s=="18"?e[i]():e[i]}r++}};t.78={3X:"5.3.0",73:18(){6(46.42.3F(/dI/i)||46.42.3F(/dw/i)||46.42.3F(/dv/i)||46.42.3F(/dj/i)||46.42.3F(/dk/i)||46.42.3F(/di/i)||46.42.3F(/dh de/i)){1S 1b}19{1S 1f}},dg:18(e){6(e.1a("2e-1p")=="1W"||e.1a("2e-1p")=="1R"||e.1a("2e-1p")==0||e.1a("2e-1p")=="dl"){1S 1b}19{1S 1f}},2t:u().98&&u().3X<9?1b:1f,7P:1f,2T:1f,4E:1f,2z:1f,2S:1f,2E:7l,2k:"1X",4u:7l,1y:7l,1F:7l,8m:{1U:{1m:"1G",1G:"1m",1q:"1p",1p:"1q"},1X:{1m:"1m",1G:"1G",1q:"1q",1p:"1p"}},v:{d:4w,7u:8g,8e:4w}};t.ar={bu:80,b7:0,5T:1P,65:0,66:"6v",2I:1b,b8:0,bo:0,96:0,9j:1,9l:1,9g:1,9e:0,9U:0,9S:["50%","50%","0"],9X:4w,85:-80,7D:0,4T:a5,dq:0,4S:"6v",3M:1b,8t:0,8B:0,8d:0,7C:1,8U:1,8G:1,8r:0,8u:0,8i:["50%","50%","0"],8h:4w};t.9b={6P:bs};t.9c={9n:1b,3N:0,7d:0,8w:1f,1C:"",4r:1b,8n:1b,9r:1b,2U:1,4X:1b,7B:89,4b:0,75:1b,7W:1f,7p:1f,3p:"cJ",3K:"/5P/cU/",7r:"87",7i:1f,8b:1b,72:1b,79:1b,ad:1b,ah:1b,ai:1b,76:1f,aV:1f,aN:1b,38:"1V",77:"60%",8y:1E,6c:60,8P:35,8I:1E,5Q:1b,2C:"1W",aH:"eI.eE",3O:1b,4C:1b,1v:1f,aD:"1m: -aE; 1q: -aE;",8k:1f,aF:"eH",aU:1b,aW:1b,8W:1f,aT:0,aP:eu,eV:"",ac:18(e){},ab:18(e){},ae:18(e){},am:18(e){},b5:18(e){},7N:18(e){},6J:18(e){},6F:18(e){},6P:bs,8D:"1G",af:.45,8L:.45,5T:1P,4T:1P,66:"6v",4S:"6v",65:0,6x:0}})(3I)',62,928,'||||||if|||||||||||||||||||||||||||||||||||||||||||||||||||||||||data|ls||this||var|find|function|else|css|true|width|parseInt|height|false|attr|src|indexOf|break|length|case|left|div|addClass|bottom|top|nav|slide|nextLayer|class|yourLogo|lt|stop|sliderWidth|ratio|transition|Math|appendTo|px|100|sliderHeight|right|new|thumbnail|split|curLayer|display|style|delay|each|1e3|typeof|none|return|active|prev|hover|auto|next|iframe|window||toLowerCase|curLayerIndex|parent|the||visibility|floor|start|img|for|container|animation||padding|setTimeout|resize|inner|random|sliderOriginalWidth|prevNext|replace|removeClass|hasClass|clearTimeout|block|to|duration|video|ie78|click|switch|ltContainer|hidden|transitiontype|autoSlideshow|originalAutoSlideshow|after|autoPauseSlideshow|300|layersNum|not|image|L2|fadeIn|wrapper|ot|undefined|cttl|before|T2|visible|LayerSlider|href|isAnimating|paused|firstSlide|rotateX|originalHeight|L1|originalWidth|children|circleTimer|curSubScaleY|bottomWrapper|curSubScaleX|offsetyout||offsetxout||thumbnailNavigation||totalDuration|TweenLite|parseFloat||opacity|loaded|wp|layerSlider|fullwidth|rotateY|of|rotation|videopreview|fade|sliderOriginalHeight|skin|barTimer|outerHeight|rotate|closest|background|is|preventDefault|outerWidth|slidedirection|makeResponsive|preloaded|layer|param|curSlideTime|tr|match|marginLeft|box|jQuery|deg|skinsPath|position|fadeOut|responsiveUnder|imgPreload|load|pausedSlideTime|in|videoSrc|shadow|com|responsiveMode|number|version|on|tile|thumbsWrapper|ease|userAgent|error|transform||navigator|marginTop|_|animate|originalTop|loops|thumb|offset|append|isLoading|originalLeft|margin|border|autoplay|startSlideTime|tn|abs|html|it|forcehide|nextLoop|autoStart|showUntilTimer|curSubScale|slideTimer|cols|500|rows|like|showuntil|rotationX|rotationY|lazyLoad|overflow|pausedByVideo|extend|slidebuttons|all|easing|your|Please|easingout|or|always|location|png|durationout|scale3d|easingOut|durationOut|youtube|change|type|animateFirstSlide|rel|nextSubScaleX||nextSubScaleY|scale2D|st|touches|offsetxin|shadowImg|curTiles|curSubSkewY|tt|Date|parallaxlevel|getTime|init|thumbnails|fisrtSlide|curSubSkewX|curSubRotateY|curSubRotateX|vimeo|offsetyin|delayin|body|scaleY|and|scaleX|transition3d|nextLayerIndex|rotateZ|translate3d|scale|player|prependTo|youtu|0deg|reverse|vpcontainer|customtransition3d|span|customtransition2d|easingin|trim|direction|old|transitionType|string|touchEndX|back|transition2d|pause|durationin|layerslider|autoPlayVideos|LSCustomTransition|originalRight|durationIn|scaleout|timer|rotateout|removeAttr|exec|slideoutdirection||document|webkit|WordPress|delayout|delayIn|easingIn|url|originalBottom|id|empty|slidedelay|tnHeight|li|name|timeshift|firstSlideAnimated|O2|images|layerMarginLeft|ontouchstart|fadeTo|oB|layerMarginTop|curLayerTop|touchStartX|nextLayerTop|nextLayerLeft|oT|oR|showShadow|easeInOutQuint|videoTimer|delayOut|originalBorderLeft|originalBorderRight|helper|originalBorderBottom|originalBorderTop|console|nIt|cbNext|bind|currentTime|audio|cbPrev|clicked|fromTo|nothumb|180|nextSubScale|slideDelay|wrong|pointing|URL|seems|cannot|check|slider|used|URLs|rt|nt|scaleyout|navStartStop|isMobile|transformoriginout|forceLoopNum|hoverBottomNav|tnContainerWidth|global|navButtons|skewyout|rotateyout|skewxout|layersContainer|rotatexout|parallaxout|scalexout|skewX|globalBGImage|perspectiveout|skewY|null|http|link|originalOpacity|randomSlideshow|videoDuration|globalBGColor|alt|pageX|fo|clone|resizeShadow|dequeue|nextTiles|set|resizeSlider|sliderFadeInDuration|scaleOut|offsetYOut|sliderOriginalWidthRU|topleft|topright|sublayerContainer|bottomright|easeinout|bottomleft|index|forward|cbAnimStop|curLayerRight|originalAutoStart|scrollThumb|bottomNavSizeHelper|changeThumb|last|curLayerBottom|onComplete|twoWaySlideshow|nextLayerRight|nextLayerHeight|nextLayerWidth||kill|nextSubRotateY|250|nextSubSkewX|offsetXOut|resizeYourLogo|transparent|push|350|forceHideControls|navPrevNext|nextSubRotateX|rotateYOut|fi|nextSubSkewY|750|perspectiveOut|transformOriginOut|transformPerspective|yourLogoLink|defaults|slideDirections|startInViewport|easein|ut|charAt|skewXOut|easeout|rotateOut|skewYOut|scalein|fullScreen|rotatein|tnWidth|cssContainer|sliderTop|rotateXOut|videohack|slideDirection|150|sublayerShowUntil|scaleYOut|join|tnInactiveOpacity|script|Linear|parallaxOut|transformOrigin|content|linkto|tnActiveOpacity|easeNone|nextLayerBottom|browser|linear|scaleXOut|slice|hideOnMobile|originalPaddingLeft|originalPaddingRight|toUpperCase||slideTransition|originalPaddingBottom|originalPaddingTop|easeInOut|stopLayer|rotateYIn|easeOut|msie|json|head|slideTransitions|options|alert|skewXIn|easeIn|scaleYIn|substring|scaleZ|scaleIn|callback|scaleXIn|lastIndexOf|responsive|layerSliderCustomTransitions|while|showSlider|pauseOnHover|substr|gi|ms|originalFontSize|uaMatch|chrome|moz|disabled|norotate|t2|t3|t4|ieEasing|t1|forcestop|firstLayer|add|2e3|text|originalLineHeight|font|preserve|entry|resizeThumb|remove|group|transformOriginIn|getJSON|skewYIn|embed|off|perspectiveIn|initialized|borderLeftWidth|hash|line|size|borderRightWidth|borderTopWidth|400|compatible|shadowBtmMod|borderBottomWidth|api|looks|cbStart|cbInit|keybNav|cbStop|parallaxIn|mousemove|touchNav|hoverPrevNext|createStyleSheet|relative|sides|cbPause||horizontal|object|opaque|layerTransitions|large||oldjquery|lsShowNotice|front|fn|jquery|above|mirror|plugin|loading|yourLogoStyle|10px|yourLogoTarget|t5|youtubePreview|hider|half|update|forced|show|showCircleTimer|parallaxStartY|hideOver|layerSliderTransitions|pageY|parallaxStartX|hideUnder|optimizeForMobile|showBarTimer|optimizeForIE78|meta|depth|TimelineLite|library|playvideo|parallaxin|default|custom2d|cbAnimStart|custom3d|offsetYIn|rotateIn|cbTimeLineStart|rotatexin|clientX|from|originalEvent||Play||fadeout|It|perspectivein|skewxin|swing|scalexin|animating|rotateXIn|scaleyin|which|skewyin|4e3|randomize|offsetXIn|col|issue|transformoriginin||wmode|strong|rotateyin|touchend|Quad|gif|insertAfter|gpuhack|insertBefore|important|stylesheet|resume|bar|zIndex|center|quad|restart|onReverseComplete|queue|mouseenter|orientationchange|animateFirstLayer|backgroundColor|backgroundImage|indicator|static|blank|deeplink|yourlogo|file|gdata|html5|below|touchmove|640|touchstart|feeds|videos|media|seconds|enabled|keydown|bock|originalMarkup|vi|v2|touchscroll|wrapAll|yt|mouseleave|circle|round|outline|textDecoration|target|play||wpVersion|thumbnail_large|cursor|pointer|sideright|ended|absolute|sideleft|lswpVersion|defaultInitData|msPerspective|MozPerspective|WebkitPerspective|OPerspective|perspective|v5|easeInOutQuart|transformStyle|OTransformStyle|Advanced|test3d|offsetHeight|Settings|WebkitTransformStyle|msTransformStyle|MozTransformStyle|skins|you|because|loads|obj|theme|with|browsers|older|Updater|use|requires|using|are|least|newer|Important|higher|offsetLeft|hasOwnProperty|Phone|main|isHideOn3D|Windows|BlackBerry|iPad|iPod|0px|copy|sliders||problems|showUntil|navigate|causing|area|admin|iPhone|webOS|within|safari|lsPrefixes|Troubleshooting|rv|opera|mozilla|khtml|option|enable|page|Android|Put|JS|extra|includes|quart|scroll|layerMarginRight|layerMarginBottom|filter|changeTimer|600|Trident|enableCSS3|log|prevLayerIndex|that|carousel|crossfad|forceStop|specified|custom|another|fadein|multiple|450|Quint|sine|Sine|quint|Cubic|Quart|cubic|expo|Expo|Back|bounce|Bounce|Elastic||elastic|circ|Circ|sequence||t2d|dispay||1e6|You|can|read|more|nexttile|wordpress|faq|IE|scrollTop|jpg|support|kreaturamedia|_self|maxresdefault|curtile|mixed|exclam|title|redraw|userInitData|continue|here|clicking|updating|about|curtiles|staticImage|nexttiles|vertical'.split('|'),0,{}));
/*!
* VERSION: 1.11.8
* DATE: 2014-05-13
* UPDATES AND DOCS AT: http://www.greensock.com
*
* @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
* This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
* Club GreenSock members, the software agreement that was issued with your membership.
*
* @author: Jack Doyle, jack@greensock.com
*/

/*!
* LayerSlider is using TweenLite, TimeLineLite, EasePack & CSSPlugin
*/


;eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(17(e){"4V 4U";19 t=e.5Z||e;1a(!t.5f){19 n,r,i,s,o,u=17(e){19 n,r=e.1t("."),i=t;1b(n=0;r.1c>n;n++)i[r[n]]=i=i[r[n]]||{};18 i},a=u("4Q.4R"),f=1e-10,l=[].6K,c=17(){},h=17(){19 e=9V.1y.9W,t=e.1W([]);18 17(n){18 1d!=n&&(n 2b 3N||"3U"==1j n&&!!n.2d&&e.1W(n)===t)}}(),p={},d=17(n,r,i,s){15.4C=p[n]?p[n].4C:[],p[n]=15,15.54=1d,15.7A=i;19 o=[];15.64=17(a){1b(19 f,l,c,h,v=r.1c,m=v;--v>-1;)(f=p[r[v]]||1h d(r[v],[])).54?(o[v]=f.54,m--):a&&f.4C.2d(15);1a(0===m&&i)1b(l=("4Q.4R."+n).1t("."),c=l.4q(),h=u(l.1J("."))[c]=15.54=i.35(i,o),s&&(t[c]=h,"17"==1j 63&&63.9X?63((e.8j?e.8j+"/":"")+n.1t(".").1J("/"),[],17(){18 h}):"9U"!=1j 62&&62.8f&&(62.8f=h)),v=0;15.4C.1c>v;v++)15.4C[v].64()},15.64(!0)},v=e.3u=17(e,t,n,r){18 1h d(e,t,n,r)},m=a.8k=17(e,t,n){18 t=t||17(){},v(e,[],17(){18 t},n),t};v.77=t;19 g=[0,0,1,1],y=[],b=m("2o.8h",17(e,t,n,r){15.5L=e,15.6v=n||0,15.6t=r||0,15.5H=t?g.43(t):g},!0),w=b.7C={},E=b.8l=17(e,t,n,r){1b(19 i,s,o,u,f=t.1t(","),l=f.1c,c=(n||"5k,6c,5m").1t(",");--l>-1;)1b(s=f[l],i=r?m("2o."+s,1d,!0):a.2o[s]||{},o=c.1c;--o>-1;)u=c[o],w[s+"."+u]=w[u+s]=i[u]=e.2w?e:e[u]||1h e};1b(i=b.1y,i.3s=!1,i.2w=17(e){1a(15.5L)18 15.5H[0]=e,15.5L.35(1d,15.5H);19 t=15.6v,n=15.6t,r=1===t?1-e:2===t?e:.5>e?2*e:2*(1-e);18 1===n?r*=r:2===n?r*=r*r:3===n?r*=r*r*r:4===n&&(r*=r*r*r*r),1===t?1-r:2===t?r:.5>e?r/2:1-r/2},n=["7X","7Z","9T","9Q","9R,9S"],r=n.1c;--r>-1;)i=n[r]+",9Y"+r,E(1h b(1d,1d,1,r),i,"6c",!0),E(1h b(1d,1d,2,r),i,"5k"+(0===r?",9Z":"")),E(1h b(1d,1d,3,r),i,"5m");w.a5=a.2o.7X.5k,w.a6=a.2o.7Z.5m;19 S=m("8V.8W",17(e){15.4d={},15.85=e||15});i=S.1y,i.79=17(e,t,n,r,i){i=i||0;19 u,a,f=15.4d[e],l=0;1b(1d==f&&(15.4d[e]=f=[]),a=f.1c;--a>-1;)u=f[a],u.c===t&&u.s===n?f.2Q(a,1):0===l&&i>u.2s&&(l=a+1);f.2Q(l,0,{c:t,s:n,8a:r,2s:i}),15!==s||o||s.31()},i.a7=17(e,t){19 n,r=15.4d[e];1a(r)1b(n=r.1c;--n>-1;)1a(r[n].c===t)18 r.2Q(n,1),2h 0},i.8Q=17(e){19 t,n,r,i=15.4d[e];1a(i)1b(t=i.1c,n=15.85;--t>-1;)r=i[t],r.8a?r.c.1W(r.s||n,{2p:e,2x:n}):r.c.1W(r.s||n)};19 x=e.a4,T=e.a3,N=88.a0||17(){18(1h 88).a1()},C=N();1b(n=["5t","a2","9P","o"],r=n.1c;--r>-1&&!x;)x=e[n[r]+"9O"],T=e[n[r]+"9B"]||e[n[r]+"9C"];m("4Y",17(e,t){19 n,r,i,u,a,f=15,l=N(),h=t!==!1&&x,p=17(e){C=N(),f.34=(C-l)/8L;19 t,s=f.34-a;(!n||s>0||e===!0)&&(f.3F++,a+=s+(s>=u?.9D:u-s),t=!0),e!==!0&&(i=r(p)),t&&f.8Q("4W")};S.1W(f),f.34=f.3F=0,f.4W=17(){p(!0)},f.5c=17(){1d!=i&&(h&&T?T(i):9A(i),r=c,i=1d,f===s&&(o=!1))},f.31=17(){1d!==i&&f.5c(),r=0===n?c:h&&x?x:17(e){18 5M(e,0|8L*(a-f.34)+1)},f===s&&(o=!0),p(2)},f.5G=17(e){18 2m.1c?(n=e,u=1/(n||60),a=15.34+u,f.31(),2h 0):n},f.8S=17(e){18 2m.1c?(f.5c(),h=e,f.5G(n),2h 0):h},f.5G(e),5M(17(){h&&(!i||5>f.3F)&&f.8S(!1)},9z)}),i=a.4Y.1y=1h a.8V.8W,i.2K=a.4Y;19 k=m("5C.8H",17(e,t){1a(15.1p=t=t||{},15.1C=15.2i=e||0,15.2L=1D(t.4x)||0,15.1x=1,15.2a=t.1Y===!0,15.1A=t.1A,15.2M=t.48===!0,q){o||s.31();19 n=15.1p.5K?I:q;n.1U(15,n.1n),15.1p.3e&&15.3e(!0)}});s=k.6f=1h a.4Y,i=k.1y,i.2r=i.1O=i.2z=i.1B=!1,i.1H=i.1n=0,i.1z=-1,i.1f=i.3l=i.33=i.1o=i.21=1d,i.1B=!1;19 L=17(){o&&N()-C>8J&&s.31(),5M(L,8J)};L(),i.73=17(e,t){18 1d!=e&&15.4b(e,t),15.48(!1).3e(!1)},i.5N=17(e,t){18 1d!=e&&15.4b(e,t),15.3e(!0)},i.9v=17(e,t){18 1d!=e&&15.4b(e,t),15.3e(!1)},i.4b=17(e,t){18 15.2Z(1D(e),t!==!1)},i.9w=17(e,t){18 15.48(!1).3e(!1).2Z(e?-15.2L:0,t!==!1,!0)},i.9x=17(e,t){18 1d!=e&&15.4b(e||15.23(),t),15.48(!0).3e(!1)},i.1E=17(){},i.5u=17(){18 15},i.4n=17(){19 e,t=15.1o,n=15.1i;18!t||!15.1O&&!15.1B&&t.4n()&&(e=t.3H())>=n&&n+15.23()/15.1x>e},i.1N=17(e,t){18 o||s.31(),15.1O=!e,15.2a=15.4n(),t!==!0&&(e&&!15.21?15.1o.1U(15,15.1i-15.2L):!e&&15.21&&15.1o.3K(15,!0)),!1},i.2n=17(){18 15.1N(!1,!1)},i.4f=17(e,t){18 15.2n(e,t),15},i.3c=17(e){1b(19 t=e?15:15.21;t;)t.2r=!0,t=t.21;18 15},i.5l=17(e){1b(19 t=e.1c,n=e.43();--t>-1;)"{4B}"===e[t]&&(n[t]=15);18 n},i.9y=17(e,t,n,r){1a("9E"===(e||"").1q(0,2)){19 i=15.1p;1a(1===2m.1c)18 i[e];1d==t?3E i[e]:(i[e]=t,i[e+"5Y"]=h(n)&&-1!==n.1J("").1k("{4B}")?15.5l(n):n,i[e+"5J"]=r),"5A"===e&&(15.33=t)}18 15},i.4x=17(e){18 2m.1c?(15.1o.2j&&15.8C(15.1i+e-15.2L),15.2L=e,15):15.2L},i.2C=17(e){18 2m.1c?(15.1C=15.2i=e,15.3c(!0),15.1o.2j&&15.1n>0&&15.1n<15.1C&&0!==e&&15.2Z(15.1H*(e/15.1C),!0),15):(15.2r=!1,15.1C)},i.23=17(e){18 15.2r=!1,2m.1c?15.2C(e):15.2i},i.34=17(e,t){18 2m.1c?(15.2r&&15.23(),15.2Z(e>15.1C?15.1C:e,t)):15.1n},i.2Z=17(e,t,n){1a(o||s.31(),!2m.1c)18 15.1H;1a(15.1o){1a(0>e&&!n&&(e+=15.23()),15.1o.2j){15.2r&&15.23();19 r=15.2i,i=15.1o;1a(e>r&&!n&&(e=r),15.1i=(15.1B?15.4O:i.1n)-(15.2M?r-e:e)/15.1x,i.2r||15.3c(!1),i.1o)1b(;i.1o;)i.1o.1n!==(i.1i+i.1H)/i.1x&&i.2Z(i.1H,!0),i=i.1o}15.1O&&15.1N(!0,!1),(15.1H!==e||0===15.1C)&&15.1E(e,t,!1)}18 15},i.9F=i.9L=17(e,t){18 2m.1c?15.2Z(15.2C()*e,t):15.1n/15.2C()},i.8C=17(e){18 2m.1c?(e!==15.1i&&(15.1i=e,15.21&&15.21.4K&&15.21.1U(15,e-15.2L)),15):15.1i},i.6q=17(e){1a(!2m.1c)18 15.1x;1a(e=e||f,15.1o&&15.1o.2j){19 t=15.4O,n=t||0===t?t:15.1o.2Z();15.1i=n-(n-15.1i)*15.1x/e}18 15.1x=e,15.3c(!1)},i.48=17(e){18 2m.1c?(e!=15.2M&&(15.2M=e,15.2Z(15.1o&&!15.1o.2j?15.23()-15.1H:15.1H,!0)),15):15.2M},i.3e=17(e){1a(!2m.1c)18 15.1B;1a(e!=15.1B&&15.1o){o||e||s.31();19 t=15.1o,n=t.3H(),r=n-15.4O;!e&&t.2j&&(15.1i+=r,15.3c(!1)),15.4O=e?n:1d,15.1B=e,15.2a=15.4n(),!e&&0!==r&&15.2z&&15.2C()&&15.1E(t.2j?15.1H:(n-15.1i)/15.1x,!0,!0)}18 15.1O&&!e&&15.1N(!0,!1),15};19 A=m("5C.7y",17(e){k.1W(15,0,e),15.4H=15.2j=!0});i=A.1y=1h k,i.2K=A,i.4f().1O=!1,i.26=i.3l=1d,i.4K=!1,i.1U=i.7w=17(e,t){19 n,r;1a(e.1i=1D(t||0)+e.2L,e.1B&&15!==e.1o&&(e.4O=e.1i+(15.3H()-e.1i)/e.1x),e.21&&e.21.3K(e,!0),e.21=e.1o=15,e.1O&&e.1N(!0,!0),n=15.3l,15.4K)1b(r=e.1i;n&&n.1i>r;)n=n.1l;18 n?(e.1f=n.1f,n.1f=e):(e.1f=15.26,15.26=e),e.1f?e.1f.1l=e:15.3l=e,e.1l=n,15.1o&&15.3c(!0),15},i.3K=17(e,t){18 e.21===15&&(t||e.1N(!1,!0),e.21=1d,e.1l?e.1l.1f=e.1f:15.26===e&&(15.26=e.1f),e.1f?e.1f.1l=e.1l:15.3l===e&&(15.3l=e.1l),15.1o&&15.3c(!0)),15},i.1E=17(e,t,n){19 r,i=15.26;1b(15.1H=15.1n=15.1z=e;i;)r=i.1f,(i.2a||e>=i.1i&&!i.1B)&&(i.2M?i.1E((i.2r?i.23():i.2i)-(e-i.1i)*i.1x,t,n):i.1E((e-i.1i)*i.1x,t,n)),i=r},i.3H=17(){18 o||s.31(),15.1H};19 O=m("5f",17(t,n,r){1a(k.1W(15,n,r),15.1E=O.1y.1E,1d==t)6l"7e 6R a 1d 2x.";15.2x=t="1L"!=1j t?t:O.3I(t)||t;19 i,s,o,u=t.9M||t.1c&&t!==e&&t[0]&&(t[0]===e||t[0].3n&&t[0].1w&&!t.3n),a=15.1p.4I;1a(15.6j=a=1d==a?F[O.8G]:"2y"==1j a?a>>0:F[a],(u||t 2b 3N||t.2d&&h(t))&&"2y"!=1j t[0])1b(15.2F=o=l.1W(t,0),15.3A=[],15.2T=[],i=0;o.1c>i;i++)s=o[i],s?"1L"!=1j s?s.1c&&s!==e&&s[0]&&(s[0]===e||s[0].3n&&s[0].1w&&!s.3n)?(o.2Q(i--,1),15.2F=o=o.43(l.1W(s,0))):(15.2T[i]=R(s,15,!1),1===a&&15.2T[i].1c>1&&U(s,15,1d,1,15.2T[i])):(s=o[i--]=O.3I(s),"1L"==1j s&&o.2Q(i+1,1)):o.2Q(i--,1);1m 15.3A={},15.2T=R(t,15,!1),1===a&&15.2T.1c>1&&U(t,15,1d,1,15.2T);(15.1p.1Y||0===n&&0===15.2L&&15.1p.1Y!==!1)&&15.1E(-15.2L,!1,!0)},!0),M=17(t){18 t.1c&&t!==e&&t[0]&&(t[0]===e||t[0].3n&&t[0].1w&&!t.3n)},2f=17(e,t){19 n,r={};1b(n 1u e)j[n]||n 1u t&&"x"!==n&&"y"!==n&&"3k"!==n&&"3y"!==n&&"3a"!==n&&"3X"!==n||!(!P[n]||P[n]&&P[n].9N)||(r[n]=e[n],3E e[n]);e.4P=r};i=O.1y=1h k,i.2K=O,i.4f().1O=!1,i.3j=0,i.1s=i.2F=i.3m=i.29=1d,i.4u=!1,O.3V="1.11.8",O.6r=i.2H=1h b(1d,1d,1,1),O.8G="2t",O.6f=s,O.7j=!0,O.3I=e.$||e.9K||17(t){18 e.$?(O.3I=e.$,e.$(t)):e.6h?e.6h.9J("#"===t.1v(0)?t.1q(1):t):t};19 D=O.4s={7E:h,7p:M},P=O.9G={},H=O.9H={},B=0,j=D.7k={3z:1,4x:1,4I:1,49:1,6a:1,6s:1,5K:1,4w:1,30:1,5A:1,5U:1,5T:1,4E:1,61:1,5P:1,4i:1,7J:1,7M:1,9I:1,a8:1,a9:1,5d:1,aA:1,1Y:1,5j:1,aB:1,1A:1,3e:1,48:1,6k:1},F={3t:0,41:1,2t:2,aC:3,az:4,ay:5,"av":1,"5X":0},I=k.7P=1h A,q=k.aw=1h A;q.1i=s.34,I.1i=s.3F,q.2a=I.2a=!0,k.7h=17(){1a(q.1E((s.34-q.1i)*q.1x,!1,!1),I.1E((s.3F-I.1i)*I.1x,!1,!1),!(s.3F%ax)){19 e,t,n;1b(n 1u H){1b(t=H[n].3J,e=t.1c;--e>-1;)t[e].1O&&t.2Q(e,1);0===t.1c&&3E H[n]}1a(n=q.26,(!n||n.1B)&&O.7j&&!I.26&&1===s.4d.4W.1c){1b(;n&&n.1B;)n=n.1f;n||s.5c()}}},s.79("4W",k.7h);19 R=17(e,t,n){19 r,i,s=e.7g;1a(H[s||(e.7g=s="t"+B++)]||(H[s]={2x:e,3J:[]}),t&&(r=H[s].3J,r[i=r.1c]=t,n))1b(;--i>-1;)r[i]===t&&r.2Q(i,1);18 H[s].3J},U=17(e,t,n,r,i){19 s,o,u,a;1a(1===r||r>=4){1b(a=i.1c,s=0;a>s;s++)1a((u=i[s])!==t)u.1O||u.1N(!1,!1)&&(o=!0);1m 1a(5===r)76;18 o}19 l,c=t.1i+f,h=[],p=0,d=0===t.1C;1b(s=i.1c;--s>-1;)(u=i[s])===t||u.1O||u.1B||(u.1o!==t.1o?(l=l||z(t,0,d),0===z(u,l,d)&&(h[p++]=u)):c>=u.1i&&u.1i+u.23()/u.1x>c&&((d||!u.2z)&&2e-10>=c-u.1i||(h[p++]=u)));1b(s=p;--s>-1;)u=h[s],2===r&&u.2n(n,e)&&(o=!0),(2!==r||!u.1s&&u.2z)&&u.1N(!1,!1)&&(o=!0);18 o},z=17(e,t,n){1b(19 r=e.1o,i=r.1x,s=e.1i;r.1o;){1a(s+=r.1i,i*=r.1x,r.1B)18-22;r=r.1o}18 s/=i,s>t?s-t:n&&s===t||!e.2z&&2*f>s-t?f:(s+=e.23()/e.1x/i)>t+f?0:s-t-f};i.78=17(){19 e,t,n,r,i=15.1p,s=15.3m,o=15.1C,u=i.1Y,a=i.3z;1a(i.30){1a(15.29&&15.29.1E(-1,!0),i.30.4I=0,i.30.1Y=!0,15.29=O.3Q(15.2x,0,i.30),u)1a(15.1n>0)15.29=1d;1m 1a(0!==o)18}1m 1a(i.4w&&0!==o)1a(15.29)15.29.1E(-1,!0),15.29=1d;1m{n={};1b(r 1u i)j[r]&&"6k"!==r||(n[r]=i[r]);1a(n.4I=0,n.1A="8D",15.29=O.3Q(15.2x,0,n),i.1Y){1a(0===15.1n)18}1m 15.29.1E(-1,!0)}1a(15.2H=a?a 2b b?i.5d 2b 3N?a.3o.35(a,i.5d):a:"17"==1j a?1h b(a,i.5d):w[a]||O.6r:O.6r,15.67=15.2H.6v,15.72=15.2H.6t,15.1s=1d,15.2F)1b(e=15.2F.1c;--e>-1;)15.4p(15.2F[e],15.3A[e]={},15.2T[e],s?s[e]:1d)&&(t=!0);1m t=15.4p(15.2x,15.3A,15.2T,s);1a(t&&O.5z("5D",15),s&&(15.1s||"17"!=1j 15.2x&&15.1N(!1,!1)),i.4w)1b(n=15.1s;n;)n.s+=n.c,n.c=-n.c,n=n.1f;15.33=i.5A,15.2z=!0},i.4p=17(t,n,r,i){19 s,o,u,a,f,l;1a(1d==t)18!1;15.1p.4P||t.1w&&t!==e&&t.3n&&P.4P&&15.1p.6k!==!1&&2f(15.1p,t);1b(s 1u 15.1p){1a(l=15.1p[s],j[s])l&&(l 2b 3N||l.2d&&h(l))&&-1!==l.1J("").1k("{4B}")&&(15.1p[s]=l=15.5l(l,15));1m 1a(P[s]&&(a=1h P[s]).6V(t,15.1p[s],15)){1b(15.1s=f={1f:15.1s,t:a,p:"1S",s:0,c:1,f:!0,n:s,4J:!0,2s:a.5W},o=a.2B.1c;--o>-1;)n[a.2B[o]]=15.1s;(a.5W||a.5D)&&(u=!0),(a.65||a.7L)&&(15.4u=!0)}1m 15.1s=n[s]=f={1f:15.1s,t:t,p:s,f:"17"==1j t[s],n:s,4J:!1,2s:0},f.s=f.f?t[s.1k("4h")||"17"!=1j t["71"+s.1q(3)]?s:"71"+s.1q(3)]():1r(t[s]),f.c="1L"==1j l&&"="===l.1v(1)?3v(l.1v(0)+"1",10)*1D(l.1q(2)):1D(l)-f.s||0;f&&f.1f&&(f.1f.1l=f)}18 i&&15.2n(i,t)?15.4p(t,n,r,i):15.6j>1&&15.1s&&r.1c>1&&U(t,15,n,15.6j,r)?(15.2n(n,t),15.4p(t,n,r,i)):u},i.1E=17(e,t,n){19 r,i,s,o,u=15.1n,a=15.1C;1a(e>=a)15.1H=15.1n=a,15.3j=15.2H.3s?15.2H.2w(1):1,15.2M||(r=!0,i="49"),0===a&&(o=15.1z,15.1i===15.1o.1C&&(e=0),(0===e||0>o||o===f)&&o!==e&&(n=!0,o>f&&(i="4i")),15.1z=o=!t||e||15.1z===e?e:f);1m 1a(1e-7>e)15.1H=15.1n=0,15.3j=15.2H.3s?15.2H.2w(0):0,(0!==u||0===a&&15.1z>0&&15.1z!==f)&&(i="4i",r=15.2M),0>e?(15.2a=!1,0===a&&(15.1z>=0&&(n=!0),15.1z=o=!t||e||15.1z===e?e:f)):15.2z||(n=!0);1m 1a(15.1H=15.1n=e,15.67){19 l=e/a,c=15.67,h=15.72;(1===c||3===c&&l>=.5)&&(l=1-l),3===c&&(l*=2),1===h?l*=l:2===h?l*=l*l:3===h?l*=l*l*l:4===h&&(l*=l*l*l*l),15.3j=1===c?1-l:2===c?l:.5>e/a?l/2:1-l/2}1m 15.3j=15.2H.2w(e/a);1a(15.1n!==u||n){1a(!15.2z){1a(15.78(),!15.2z||15.1O)18;15.1n&&!r?15.3j=15.2H.2w(15.1n/a):r&&15.2H.3s&&(15.3j=15.2H.2w(0===15.1n?0:1))}1b(15.2a||!15.1B&&15.1n!==u&&e>=0&&(15.2a=!0),0===u&&(15.29&&(e>=0?15.29.1E(e,t,n):i||(i="aE")),15.1p.4E&&(0!==15.1n||0===a)&&(t||15.1p.4E.35(15.1p.5P||15,15.1p.61||y))),s=15.1s;s;)s.f?s.t[s.p](s.c*15.3j+s.s):s.t[s.p]=s.c*15.3j+s.s,s=s.1f;15.33&&(0>e&&15.29&&15.1i&&15.29.1E(e,t,n),t||(15.1n!==u||r)&&15.33.35(15.1p.5T||15,15.1p.5U||y)),i&&(15.1O||(0>e&&15.29&&!15.33&&15.1i&&15.29.1E(e,t,n),r&&(15.1o.4H&&15.1N(!1,!1),15.2a=!1),!t&&15.1p[i]&&15.1p[i].35(15.1p[i+"5J"]||15,15.1p[i+"5Y"]||y),0===a&&15.1z===f&&o!==f&&(15.1z=0)))}},i.2n=17(e,t){1a("41"===e&&(e=1d),1d==e&&(1d==t||t===15.2x))18 15.1N(!1,!1);t="1L"!=1j t?t||15.2F||15.2x:O.3I(t)||t;19 n,r,i,s,o,u,a,f;1a((h(t)||M(t))&&"2y"!=1j t[0])1b(n=t.1c;--n>-1;)15.2n(e,t[n])&&(u=!0);1m{1a(15.2F){1b(n=15.2F.1c;--n>-1;)1a(t===15.2F[n]){o=15.3A[n]||{},15.3m=15.3m||[],r=15.3m[n]=e?15.3m[n]||{}:"41";76}}1m{1a(t!==15.2x)18!1;o=15.3A,r=15.3m=e?15.3m||{}:"41"}1a(o){a=e||o,f=e!==r&&"41"!==r&&e!==o&&("3U"!=1j e||!e.aK);1b(i 1u a)(s=o[i])&&(s.4J&&s.t.2n(a)&&(u=!0),s.4J&&0!==s.t.2B.1c||(s.1l?s.1l.1f=s.1f:s===15.1s&&(15.1s=s.1f),s.1f&&(s.1f.1l=s.1l),s.1f=s.1l=1d),3E o[i]),f&&(r[i]=1);!15.1s&&15.2z&&15.1N(!1,!1)}}18 u},i.5u=17(){18 15.4u&&O.5z("65",15),15.1s=1d,15.3m=1d,15.33=1d,15.29=1d,15.2z=15.2a=15.4u=!1,15.3A=15.2F?{}:[],15},i.1N=17(e,t){1a(o||s.31(),e&&15.1O){19 n,r=15.2F;1a(r)1b(n=r.1c;--n>-1;)15.2T[n]=R(r[n],15,!0);1m 15.2T=R(15.2x,15,!0)}18 k.1y.1N.1W(15,e,t),15.4u&&15.1s?O.5z(e?"7L":"65",15):!1},O.3Q=17(e,t,n){18 1h O(e,t,n)},O.66=17(e,t,n){18 n.4w=!0,n.1Y=0!=n.1Y,1h O(e,t,n)},O.6b=17(e,t,n,r){18 r.30=n,r.1Y=0!=r.1Y&&0!=n.1Y,1h O(e,t,r)},O.6o=17(e,t,n,r,i){18 1h O(t,0,{4x:e,49:t,6a:n,6s:r,4i:t,7J:n,7M:r,1Y:!1,5K:i,4I:0})},O.4h=17(e,t){18 1h O(e,0,t)},O.40=17(e,t){1a(1d==e)18[];e="1L"!=1j e?e:O.3I(e)||e;19 n,r,i,s;1a((h(e)||M(e))&&"2y"!=1j e[0]){1b(n=e.1c,r=[];--n>-1;)r=r.43(O.40(e[n],t));1b(n=r.1c;--n>-1;)1b(s=r[n],i=n;--i>-1;)s===r[i]&&r.2Q(n,1)}1m 1b(r=R(e).43(),n=r.1c;--n>-1;)(r[n].1O||t&&!r[n].4n())&&r.2Q(n,1);18 r},O.9u=O.aI=17(e,t,n){"3U"==1j t&&(n=t,t=!1);1b(19 r=O.40(e,t),i=r.1c;--i>-1;)r[i].2n(n,e)};19 W=m("4S.80",17(e,t){15.2B=(e||"").1t(","),15.4D=15.2B[0],15.5W=t||0,15.aF=W.1y},!0);1a(i=W.1y,W.3V="1.10.1",W.3w=2,i.1s=1d,i.aG=17(e,t,n,r,i,s){19 o,u;18 1d!=r&&(o="2y"==1j r||"="!==r.1v(1)?1D(r)-n:3v(r.1v(0)+"1",10)*1D(r.1q(2)))?(15.1s=u={1f:15.1s,t:e,p:t,s:n,c:o,f:"17"==1j e[t],n:i||t,r:s},u.1f&&(u.1f.1l=u),u):2h 0},i.1S=17(e){1b(19 t,n=15.1s,r=1e-6;n;)t=n.c*e+n.s,n.r?t=1g.3G(t):r>t&&t>-r&&(t=0),n.f?n.t[n.p](t):n.t[n.p]=t,n=n.1f},i.2n=17(e){19 t,n=15.2B,r=15.1s;1a(1d!=e[15.4D])15.2B=[];1m 1b(t=n.1c;--t>-1;)1d!=e[n[t]]&&n.2Q(t,1);1b(;r;)1d!=e[r.n]&&(r.1f&&(r.1f.1l=r.1l),r.1l?(r.1l.1f=r.1f,r.1l=1d):15.1s===r&&(15.1s=r.1f)),r=r.1f;18!1},i.7u=17(e,t){1b(19 n=15.1s;n;)(e[15.4D]||1d!=n.n&&e[n.n.1t(15.4D+"2f").1J("")])&&(n.r=t),n=n.1f},O.5z=17(e,t){19 n,r,i,s,o,u=t.1s;1a("5D"===e){1b(;u;){1b(o=u.1f,r=i;r&&r.2s>u.2s;)r=r.1f;(u.1l=r?r.1l:s)?u.1l.1f=u:i=u,(u.1f=r)?r.1l=u:s=u,u=o}u=t.1s=i}1b(;u;)u.4J&&"17"==1j u.t[e]&&u.t[e]()&&(n=!0),u=u.1f;18 n},W.6Q=17(e){1b(19 t=e.1c;--t>-1;)e[t].3w===W.3w&&(P[(1h e[t]).4D]=e[t]);18!0},v.2D=17(e){1a(!(e&&e.7m&&e.7o&&e.3w))6l"aH 2D au.";19 t,n=e.7m,r=e.5E||0,i=e.as,s={7o:"6V",4h:"1S",4f:"2n",3G:"7u",af:"5D"},o=m("4S."+n.1v(0).4Z()+n.1q(1)+"8u",17(){W.1W(15,n,r),15.2B=i||[]},e.ag===!0),u=o.1y=1h W(n);u.2K=o,o.3w=e.3w;1b(t 1u s)"17"==1j e[t]&&(u[s[t]]=e[t]);18 o.3V=e.3V,W.6Q([o]),o},n=e.37){1b(r=0;n.1c>r;r++)n[r]();1b(i 1u p)p[i].7A||e.6x.7z("ah ae ad aa: 4Q.4R."+i)}o=!1}})(1Q);(1Q.37||(1Q.37=[])).2d(17(){"4V 4U";1Q.3u("ab",["5C.8H","5C.7y","5f"],17(e,t,n){19 r=17(e){t.1W(15,e),15.2J={},15.4H=15.1p.4H===!0,15.2j=15.1p.2j===!0,15.4K=!0,15.33=15.1p.5A;19 n,r,i=15.1p;1b(r 1u i)n=i[r],o(n)&&-1!==n.1J("").1k("{4B}")&&(i[r]=15.5l(n));o(i.3J)&&15.1U(i.3J,0,i.ac,i.ai)},i=1e-10,s=n.4s.7p,o=n.4s.7E,u=[],a=1Q.3u.77,f=17(e){19 t,n={};1b(t 1u e)n[t]=e[t];18 n},l=17(e,t,n,r){e.1o.5N(e.1i),t&&t.35(r||e.1o,n||u)},c=u.6K,h=r.1y=1h t;18 r.3V="1.11.8",h.2K=r,h.4f().1O=!1,h.3Q=17(e,t,r,i){19 s=r.5j&&a.69||n;18 t?15.1U(1h s(e,t,r),i):15.4h(e,r,i)},h.66=17(e,t,r,i){18 15.1U((r.5j&&a.69||n).66(e,t,r),i)},h.6b=17(e,t,r,i,s){19 o=i.5j&&a.69||n;18 t?15.1U(o.6b(e,t,r,i),s):15.4h(e,i,s)},h.6u=17(e,t,i,o,u,a,l,h){19 p,d=1h r({49:a,6a:l,6s:h,2j:15.2j});1b("1L"==1j e&&(e=n.3I(e)||e),s(e)&&(e=c.1W(e,0)),o=o||0,p=0;e.1c>p;p++)i.30&&(i.30=f(i.30)),d.3Q(e[p],t,f(i),p*o);18 15.1U(d,u)},h.ao=17(e,t,n,r,i,s,o,u){18 n.1Y=0!=n.1Y,n.4w=!0,15.6u(e,t,n,r,i,s,o,u)},h.an=17(e,t,n,r,i,s,o,u,a){18 r.30=n,r.1Y=0!=r.1Y&&0!=n.1Y,15.6u(e,t,r,i,s,o,u,a)},h.1W=17(e,t,r,i){18 15.1U(n.6o(0,e,t,r),i)},h.4h=17(e,t,r){18 r=15.3h(r,0,!0),1d==t.1Y&&(t.1Y=r===15.1n&&!15.1B),15.1U(1h n(e,0,t),r)},r.ak=17(e,t){e=e||{},1d==e.2j&&(e.2j=!0);19 i,s,o=1h r(e),u=o.1o;1b(1d==t&&(t=!0),u.3K(o,!0),o.1i=0,o.1z=o.1n=o.1H=u.1n,i=u.26;i;)s=i.1f,t&&i 2b n&&i.2x===i.1p.49||o.1U(i,i.1i-i.2L),i=s;18 u.1U(o,0),o},h.1U=17(i,s,u,a){19 f,l,c,h,p,d;1a("2y"!=1j s&&(s=15.3h(s,0,!0,i)),!(i 2b e)){1a(i 2b 3N||i&&i.2d&&o(i)){1b(u=u||"al",a=a||0,f=s,l=i.1c,c=0;l>c;c++)o(h=i[c])&&(h=1h r({3J:h})),15.1U(h,f),"1L"!=1j h&&"17"!=1j h&&("am"===u?f=h.1i+h.23()/h.1x:"aN"===u&&(h.1i-=h.4x())),f+=a;18 15.3c(!0)}1a("1L"==1j i)18 15.7x(i,s);1a("17"!=1j i)6l"7e 1U "+i+" 93 8Y 21; 3D 94 8K a 6R, 21, 17, 8X 1L.";i=n.6o(0,i)}1a(t.1y.1U.1W(15,i,s),(15.1O||15.1n===15.1C)&&!15.1B&&15.1C<15.2C())1b(p=15,d=p.3H()>i.1i;p.1o;)d&&p.1o.2j?p.2Z(p.1H,!0):p.1O&&p.1N(!0,!1),p=p.1o;18 15},h.5n=17(t){1a(t 2b e)18 15.3K(t,!1);1a(t 2b 3N||t&&t.2d&&o(t)){1b(19 n=t.1c;--n>-1;)15.5n(t[n]);18 15}18"1L"==1j t?15.7n(t):15.4f(1d,t)},h.3K=17(e,n){t.1y.3K.1W(15,e,n);19 r=15.3l;18 r?15.1n>r.1i+r.2i/r.1x&&(15.1n=15.2C(),15.1H=15.2i):15.1n=15.1H=15.1C=15.2i=0,15},h.92=17(e,t){18 15.1U(e,15.3h(1d,t,!0,e))},h.7w=h.9t=17(e,t,n,r){18 15.1U(e,t||0,n,r)},h.9m=17(e,t,n,r){18 15.1U(e,15.3h(1d,t,!0,e),n,r)},h.7x=17(e,t){18 15.2J[e]=15.3h(t),15},h.9l=17(e,t,n,r){18 15.1W(l,["{4B}",t,n,r],15,e)},h.7n=17(e){18 3E 15.2J[e],15},h.9j=17(e){18 1d!=15.2J[e]?15.2J[e]:-1},h.3h=17(t,n,r,i){19 s;1a(i 2b e&&i.21===15)15.5n(i);1m 1a(i&&(i 2b 3N||i.2d&&o(i)))1b(s=i.1c;--s>-1;)i[s]2b e&&i[s].21===15&&15.5n(i[s]);1a("1L"==1j n)18 15.3h(n,r&&"2y"==1j t&&1d==15.2J[n]?t-15.2C():0,r);1a(n=n||0,"1L"!=1j t||!6d(t)&&1d==15.2J[t])1d==t&&(t=15.2C());1m{1a(s=t.1k("="),-1===s)18 1d==15.2J[t]?r?15.2J[t]=15.2C()+n:n:15.2J[t]+n;n=3v(t.1v(s-1)+"1",10)*1D(t.1q(s+1)),t=s>1?15.3h(t.1q(0,s-1),0,r):15.2C()}18 1D(t)+n},h.4b=17(e,t){18 15.2Z("2y"==1j e?e:15.3h(e),t!==!1)},h.9n=17(){18 15.3e(!0)},h.9o=17(e,t){18 15.73(e,t)},h.9s=17(e,t){18 15.5N(e,t)},h.1E=17(e,t,n){15.1O&&15.1N(!0,!1);19 r,s,o,a,f,l=15.2r?15.23():15.2i,c=15.1n,h=15.1i,p=15.1x,d=15.1B;1a(e>=l?(15.1H=15.1n=l,15.2M||15.5I()||(s=!0,a="49",0===15.1C&&(0===e||0>15.1z||15.1z===i)&&15.1z!==e&&15.26&&(f=!0,15.1z>i&&(a="4i"))),15.1z=15.1C||!t||e||15.1z===e?e:i,e=l+1e-4):1e-7>e?(15.1H=15.1n=0,(0!==c||0===15.1C&&15.1z!==i&&(15.1z>0||0>e&&15.1z>=0))&&(a="4i",s=15.2M),0>e?(15.2a=!1,0===15.1C&&15.1z>=0&&15.26&&(f=!0),15.1z=e):(15.1z=15.1C||!t||e||15.1z===e?e:i,e=0,15.2z||(f=!0))):15.1H=15.1n=15.1z=e,15.1n!==c&&15.26||n||f){1a(15.2z||(15.2z=!0),15.2a||!15.1B&&15.1n!==c&&e>0&&(15.2a=!0),0===c&&15.1p.4E&&0!==15.1n&&(t||15.1p.4E.35(15.1p.5P||15,15.1p.61||u)),15.1n>=c)1b(r=15.26;r&&(o=r.1f,!15.1B||d);)(r.2a||r.1i<=15.1n&&!r.1B&&!r.1O)&&(r.2M?r.1E((r.2r?r.23():r.2i)-(e-r.1i)*r.1x,t,n):r.1E((e-r.1i)*r.1x,t,n)),r=o;1m 1b(r=15.3l;r&&(o=r.1l,!15.1B||d);)(r.2a||c>=r.1i&&!r.1B&&!r.1O)&&(r.2M?r.1E((r.2r?r.23():r.2i)-(e-r.1i)*r.1x,t,n):r.1E((e-r.1i)*r.1x,t,n)),r=o;15.33&&(t||15.33.35(15.1p.5T||15,15.1p.5U||u)),a&&(15.1O||(h===15.1i||p!==15.1x)&&(0===15.1n||l>=15.23())&&(s&&(15.1o.4H&&15.1N(!1,!1),15.2a=!1),!t&&15.1p[a]&&15.1p[a].35(15.1p[a+"5J"]||15,15.1p[a+"5Y"]||u)))}},h.5I=17(){1b(19 e=15.26;e;){1a(e.1B||e 2b r&&e.5I())18!0;e=e.1f}18!1},h.5s=17(e,t,r,i){i=i||-59;1b(19 s=[],o=15.26,u=0;o;)i>o.1i||(o 2b n?t!==!1&&(s[u++]=o):(r!==!1&&(s[u++]=o),e!==!1&&(s=s.43(o.5s(!0,t,r)),u=s.1c))),o=o.1f;18 s},h.40=17(e,t){1b(19 r=n.40(e),i=r.1c,s=[],o=0;--i>-1;)(r[i].21===15||t&&15.8B(r[i]))&&(s[o++]=r[i]);18 s},h.8B=17(e){1b(19 t=e.21;t;){1a(t===15)18!0;t=t.21}18!1},h.8p=17(e,t,n){n=n||0;1b(19 r,i=15.26,s=15.2J;i;)i.1i>=n&&(i.1i+=e),i=i.1f;1a(t)1b(r 1u s)s[r]>=n&&(s[r]+=e);18 15.3c(!0)},h.2n=17(e,t){1a(!e&&!t)18 15.1N(!1,!1);1b(19 n=t?15.40(t):15.5s(!0,!0,!1),r=n.1c,i=!1;--r>-1;)n[r].2n(e,t)&&(i=!0);18 i},h.9a=17(e){19 t=15.5s(!1,!0,!0),n=t.1c;1b(15.1n=15.1H=0;--n>-1;)t[n].1N(!1,!1);18 e!==!1&&(15.2J={}),15.3c(!0)},h.5u=17(){1b(19 e=15.26;e;)e.5u(),e=e.1f;18 15},h.1N=17(e,n){1a(e===15.1O)1b(19 r=15.26;r;)r.1N(e,!0),r=r.1f;18 t.1y.1N.1W(15,e,n)},h.2C=17(e){18 2m.1c?(0!==15.2C()&&0!==e&&15.6q(15.1C/e),15):(15.2r&&15.23(),15.1C)},h.23=17(e){1a(!2m.1c){1a(15.2r){1b(19 t,n,r=0,i=15.3l,s=9b;i;)t=i.1l,i.2r&&i.23(),i.1i>s&&15.4K&&!i.1B?15.1U(i,i.1i-i.2L):s=i.1i,0>i.1i&&!i.1B&&(r-=i.1i,15.1o.2j&&(15.1i+=i.1i/15.1x),15.8p(-i.1i,!1,-59),s=0),n=i.1i+i.2i/i.1x,n>r&&(r=n),i=t;15.1C=15.2i=r,15.2r=!1}18 15.2i}18 0!==15.23()&&0!==e&&15.6q(15.2i/e),15},h.9d=17(){1b(19 t=15.1o;t.1o;)t=t.1o;18 t===e.7P},h.3H=17(){18 15.1B?15.1H:(15.1o.3H()-15.1i)*15.1x},r},!0)}),1Q.3u&&1Q.37.4q()();(1Q.37||(1Q.37=[])).2d(17(){"4V 4U";1Q.3u("2o.7Y",["2o.8h"],17(e){19 t,n,r,i=1Q.5Z||1Q,s=i.4Q.4R,o=2*1g.4o,u=1g.4o/2,a=s.8k,f=17(t,n){19 r=a("2o."+t,17(){},!0),i=r.1y=1h e;18 i.2K=r,i.2w=n,r},l=e.8l||17(){},c=17(e,t,n,r){19 i=a("2o."+e,{6c:1h t,5k:1h n,5m:1h r},!0);18 l(i,e),i},h=17(e,t,n){15.t=e,15.v=t,n&&(15.5w=n,n.5y=15,15.c=n.v-t,15.8v=n.t-e)},p=17(t,n){19 r=a("2o."+t,17(e){15.1T=e||0===e?e:1.aO,15.2q=1.cW*15.1T},!0),i=r.1y=1h e;18 i.2K=r,i.2w=n,i.3o=17(e){18 1h r(e)},r},d=c("7Y",p("cv",17(e){18(e-=1)*e*((15.1T+1)*e+15.1T)+1}),p("cr",17(e){18 e*e*((15.1T+1)*e-15.1T)}),p("co",17(e){18 1>(e*=2)?.5*e*e*((15.2q+1)*e-15.2q):.5*((e-=2)*e*((15.2q+1)*e+15.2q)+2)})),v=a("2o.6w",17(e,t,n){t=t||0===t?t:.7,1d==e?e=.7:e>1&&(e=1),15.89=1!==e?t:0,15.1T=(1-e)/2,15.2q=e,15.3f=15.1T+15.2q,15.3s=n===!0},!0),m=v.1y=1h e;18 m.2K=v,m.2w=17(e){19 t=e+(.5-e)*15.89;18 15.1T>e?15.3s?1-(e=1-e/15.1T)*e:t-(e=1-e/15.1T)*e*e*e*t:e>15.3f?15.3s?1-(e=(e-15.3f)/15.1T)*e:t+(e-t)*(e=(e-15.3f)/15.1T)*e*e*e:15.3s?1:t},v.3z=1h v(.7,.7),m.3o=v.3o=17(e,t,n){18 1h v(e,t,n)},t=a("2o.87",17(e){e=e||1,15.1T=1/e,15.2q=e+1},!0),m=t.1y=1h e,m.2K=t,m.2w=17(e){18 0>e?e=0:e>=1&&(e=.cG),(15.2q*e>>0)*15.1T},m.3o=t.3o=17(e){18 1h t(e)},n=a("2o.7f",17(t){t=t||{};1b(19 n,r,i,s,o,u,a=t.cE||"3t",f=[],l=0,c=0|(t.cI||20),p=c,d=t.cA!==!1,v=t.cJ===!0,m=t.8N 2b e?t.8N:1d,g="2y"==1j t.8R?.4*t.8R:.4;--p>-1;)n=d?1g.8A():1/c*p,r=m?m.2w(n):n,"3t"===a?i=g:"cK"===a?(s=1-n,i=s*s*g):"1u"===a?i=n*n*g:.5>n?(s=2*n,i=.5*s*s*g):(s=2*(1-n),i=.5*s*s*g),d?r+=1g.8A()*i-.5*i:p%2?r+=.5*i:r-=.5*i,v&&(r>1?r=1:0>r&&(r=0)),f[l++]={x:n,y:r};1b(f.cL(17(e,t){18 e.x-t.x}),u=1h h(1,1,1d),p=c;--p>-1;)o=f[p],u=1h h(o.x,o.y,u);15.1l=1h h(0,0,0!==u.t?u:u.5w)},!0),m=n.1y=1h e,m.2K=n,m.2w=17(e){19 t=15.1l;1a(e>t.t){1b(;t.5w&&e>=t.t;)t=t.5w;t=t.5y}1m 1b(;t.5y&&t.t>=e;)t=t.5y;18 15.1l=t,t.v+(e-t.t)/t.8v*t.c},m.3o=17(e){18 1h n(e)},n.3z=1h n,c("cH",f("cF",17(e){18 1/2.75>e?7.2I*e*e:2/2.75>e?7.2I*(e-=1.5/2.75)*e+.75:2.5/2.75>e?7.2I*(e-=2.25/2.75)*e+.6m:7.2I*(e-=2.6n/2.75)*e+.6p}),f("cM",17(e){18 1/2.75>(e=1-e)?1-7.2I*e*e:2/2.75>e?1-(7.2I*(e-=1.5/2.75)*e+.75):2.5/2.75>e?1-(7.2I*(e-=2.25/2.75)*e+.6m):1-(7.2I*(e-=2.6n/2.75)*e+.6p)}),f("cN",17(e){19 t=.5>e;18 e=t?1-2*e:2*e-1,e=1/2.75>e?7.2I*e*e:2/2.75>e?7.2I*(e-=1.5/2.75)*e+.75:2.5/2.75>e?7.2I*(e-=2.25/2.75)*e+.6m:7.2I*(e-=2.6n/2.75)*e+.6p,t?.5*(1-e):.5*e+.5})),c("cO",f("cP",17(e){18 1g.38(1-(e-=1)*e)}),f("cQ",17(e){18-(1g.38(1-e*e)-1)}),f("cD",17(e){18 1>(e*=2)?-.5*(1g.38(1-e*e)-1):.5*(1g.38(1-(e-=2)*e)+1)})),r=17(t,n,r){19 i=a("2o."+t,17(e,t){15.1T=e||1,15.2q=t||r,15.3f=15.2q/o*(1g.cp(1/15.1T)||0)},!0),s=i.1y=1h e;18 s.2K=i,s.2w=n,s.3o=17(e,t){18 1h i(e,t)},i},c("cn",r("cm",17(e){18 15.1T*1g.3p(2,-10*e)*1g.2k((e-15.3f)*o/15.2q)+1},.3),r("cj",17(e){18-(15.1T*1g.3p(2,10*(e-=1))*1g.2k((e-15.3f)*o/15.2q))},.3),r("ck",17(e){18 1>(e*=2)?-.5*15.1T*1g.3p(2,10*(e-=1))*1g.2k((e-15.3f)*o/15.2q):.5*15.1T*1g.3p(2,-10*(e-=1))*1g.2k((e-15.3f)*o/15.2q)+1},.45)),c("cl",f("cs",17(e){18 1-1g.3p(2,-10*e)}),f("cz",17(e){18 1g.3p(2,10*(e-1))-.cX}),f("cB",17(e){18 1>(e*=2)?.5*1g.3p(2,10*(e-1)):.5*(2-1g.3p(2,-10*(e-1)))})),c("cy",f("cx",17(e){18 1g.2k(e*u)}),f("cu",17(e){18-1g.2E(e*u)+1}),f("cw",17(e){18-.5*(1g.2E(1g.4o*e)-1)})),a("2o.dg",{df:17(t){18 e.7C[t]}},!0),l(i.6w,"6w","3z,"),l(n,"7f","3z,"),l(t,"87","3z,"),d},!0)}),1Q.3u&&1Q.37.4q()();(1Q.37||(1Q.37=[])).2d(17(){"4V 4U";1Q.3u("4S.dl",["4S.80","5f"],17(e,t){19 n,r,i,s,o=17(){e.1W(15,"4P"),15.2B.1c=0,15.1S=o.1y.1S},u={},a=o.1y=1h e("4P");a.2K=o,o.3V="1.11.8",o.3w=2,o.81=0,o.8w="cY",a="2c",o.6E={4z:a,7G:a,7F:a,4A:a,3k:a,3y:a,dk:a,6B:a,6U:a,3b:a,dd:""};19 f,l,c,h,p,d,v=/(?:\\d|\\-\\d|\\.\\d|\\-\\.\\d)+/g,m=/(?:\\d|\\-\\d|\\.\\d|\\-\\.\\d|\\+=\\d|\\-=\\d|\\+=.\\d|\\-=\\.\\d)+/g,g=/(?:\\+=|\\-=|\\-|\\b)[\\d\\-\\.]+[a-d7-dn-9]*(?:%|\\b)/3M,y=/[^\\d\\-\\.]/g,b=/(?:\\d|\\-|\\+|=|#|\\.)*/g,w=/1Z *= *([^)]*)/,E=/1Z:([^;]*)/,S=/3B\\(1Z *=.+?\\)/i,x=/^(5h|6y)/,T=/([A-Z])/g,N=/-([a-z])/3M,C=/(^(?:8t\\(\\"|8t\\())|(?:(\\"\\))$|\\)$)/3M,k=17(e,t){18 t.4Z()},L=/(?:6i|7T|7H)/i,A=/(8c|8d|8n|8m)=[\\d\\-\\.e]+/3M,O=/82\\:5Q\\.5S\\.5V\\(.+?\\)/i,M=/,(?=[^\\)]*(?:\\(|$))/3M,2f=1g.4o/36,D=36/1g.4o,P={},H=6h,B=H.6e("74"),j=H.6e("d2"),F=o.4s={dm:u},I=dc.cC,q=17(){19 e,t=I.1k("ch"),n=H.6e("74");18 c=-1!==I.1k("bj")&&-1===I.1k("bk")&&(-1===t||1D(I.1q(t+8,1))>3),p=c&&6>1D(I.1q(I.1k("bl/")+8,1)),h=-1!==I.1k("bh"),/bg ([0-9]{1,}[\\.0-9]{0,})/.bc(I)&&(d=1r(46.$1)),n.bd="<a 1w=\'4z:be;1Z:.55;\'>a</a>",e=n.bf("a")[0],e?/^0.55/.2P(e.1w.1Z):!1}(),R=17(e){18 w.2P("1L"==1j e?e:(e.2X?e.2X.2l:e.1w.2l)||"")?1r(46.$1)/22:1},U=17(e){1Q.6x&&6x.7z(e)},z="",W="",X=17(e,t){t=t||B;19 n,r,i=t.1w;1a(2h 0!==i[e])18 e;1b(e=e.1v(0).4Z()+e.1q(1),n=["O","bn","5t","bv","bw"],r=5;--r>-1&&2h 0===i[n[r]+e];);18 r>=0?(W=3===r?"5t":n[r],z="-"+W.6P()+"-",W+e):1d},V=H.7v?H.7v.bx:17(){},$=o.bu=17(e,t,n,r,i){19 s;18 q||"1Z"!==t?(!r&&e.1w[t]?s=e.1w[t]:(n=n||V(e,1d))?s=n[t]||n.42(t)||n.42(t.1I(T,"-$1").6P()):e.2X&&(s=e.2X[t]),1d==i||s&&"3t"!==s&&"2t"!==s&&"2t 2t"!==s?s:i):R(e)},J=F.bs=17(e,n,r,i,s){1a("2c"===i||!i)18 r;1a("2t"===i||!r)18 0;19 u,a,f,l=L.2P(n),c=e,h=B.1w,p=0>r;1a(p&&(r=-r),"%"===i&&-1!==n.1k("3X"))u=r/22*(l?e.bo:e.bp);1m{1a(h.3d="3X:0 5x 7i;4m:"+$(e,"4m")+";bq-3y:0;","%"!==i&&c.7r)h[l?"84":"6X"]=r+i;1m{1a(c=e.ci||H.br,a=c.6g,f=t.6f.3F,a&&l&&a.34===f)18 a.3k*r/22;h[l?"3k":"3y"]=r+i}c.7r(B),u=1r(B[l?"4N":"4M"]),c.aV(B),l&&"%"===i&&o.aW!==!1&&(a=c.6g=c.6g||{},a.34=f,a.3k=22*(u/r)),0!==u||s||(u=J(e,n,r,i,!0))}18 p?-u:u},K=F.aX=17(e,t,n){1a("83"!==$(e,"4m",n))18 0;19 r="4A"===t?"6i":"7N",i=$(e,"6U"+r,n);18 e["aY"+r]-(J(e,t,1r(i),i.1I(b,""))||0)},Q=17(e,t){19 n,r,i={};1a(t=t||V(e,1d))1a(n=t.1c)1b(;--n>-1;)i[t[n].1I(N,k)]=t.42(t[n]);1m 1b(n 1u t)i[n]=t[n];1m 1a(t=e.2X||e.1w)1b(n 1u t)"1L"==1j n&&2h 0===i[n]&&(i[n.1I(N,k)]=t[n]);18 q||(i.1Z=R(e)),r=4l(e,t,!1),i.1K=r.1K,i.1R=r.1R,i.28=r.28,i.2g=r.2g,i.x=r.x,i.y=r.y,39&&(i.z=r.z,i.1P=r.1P,i.1V=r.1V,i.2W=r.2W),i.7R&&3E i.7R,i},G=17(e,t,n,r,i){19 s,o,u,a={},f=e.1w;1b(o 1u n)"3d"!==o&&"1c"!==o&&6d(o)&&(t[o]!==(s=n[o])||i&&i[o])&&-1===o.1k("aU")&&("2y"==1j s||"1L"==1j s)&&(a[o]="2t"!==s||"4A"!==o&&"4z"!==o?""!==s&&"2t"!==s&&"3t"!==s||"1L"!=1j t[o]||""===t[o].1I(y,"")?s:0:K(e,o),2h 0!==f[o]&&(u=1h ct(f,o,f[o],u)));1a(r)1b(o 1u r)"3a"!==o&&(a[o]=r[o]);18{57:a,4e:u}},Y={3k:["6i","7T"],3y:["7N","aP"]},Z=["7K","7S","7B","7U"],3L=17(e,t,n){19 r=1r("3k"===t?e.4N:e.4M),i=Y[t],s=i.1c;1b(n=n||V(e,1d);--s>-1;)r-=1r($(e,"6B"+i[s],n,!0))||0,r-=1r($(e,"3X"+i[s]+"7H",n,!0))||0;18 r},3g=17(e,t){(1d==e||""===e||"2t"===e||"2t 2t"===e)&&(e="0 0");19 n=e.1t(" "),r=-1!==e.1k("4A")?"0%":-1!==e.1k("7G")?"22%":n[0],i=-1!==e.1k("4z")?"0%":-1!==e.1k("7F")?"22%":n[1];18 1d==i?i="0":"7l"===i&&(i="50%"),("7l"===r||6d(1r(r))&&-1===(r+"").1k("="))&&(r="50%"),t&&(t.8o=-1!==r.1k("%"),t.8r=-1!==i.1k("%"),t.aQ="="===r.1v(1),t.aR="="===i.1v(1),t.52=1r(r.1I(y,"")),t.5R=1r(i.1I(y,""))),r+" "+i+(n.1c>2?" "+n[2]:"")},3q=17(e,t){18"1L"==1j e&&"="===e.1v(1)?3v(e.1v(0)+"1",10)*1r(e.1q(2)):1r(e)-1r(t)},2A=17(e,t){18 1d==e?t:"1L"==1j e&&"="===e.1v(1)?3v(e.1v(0)+"1",10)*1D(e.1q(2))+t:1r(e)},3D=17(e,t,n,r){19 i,s,o,u,a=1e-6;18 1d==e?u=t:"2y"==1j e?u=e:(i=68,s=e.1t("2f"),o=1D(s[0].1I(y,""))*(-1===e.1k("aS")?1:D)-("="===e.1v(1)?0:t),s.1c&&(r&&(r[n]=t+o),-1!==e.1k("aZ")&&(o%=i,o!==o%(i/2)&&(o=0>o?o+i:o-i)),-1!==e.1k("b0")&&0>o?o=(o+59*i)%i-(0|o/i)*i:-1!==e.1k("b7")&&o>0&&(o=(o-59*i)%i-(0|o/i)*i)),u=t+o),a>u&&u>-a&&(u=0),u},3x={b9:[0,1F,1F],b6:[0,1F,0],b5:[58,58,58],7I:[0,0,0],b1:[2N,0,0],b2:[0,2N,2N],b3:[0,0,1F],b4:[0,0,2N],by:[1F,1F,1F],bz:[1F,0,1F],c3:[2N,2N,0],c4:[1F,1F,0],c5:[1F,c2,0],c1:[2N,2N,2N],bX:[2N,0,2N],bY:[0,2N,0],7i:[1F,0,0],c0:[1F,58,c7],ce:[0,1F,1F],4g:[1F,1F,1F,0]},5a=17(e,t,n){18 e=0>e?e+1:e>1?e-1:e,0|1F*(1>6*e?t+6*(n-t)*e:.5>e?n:2>3*e?t+6*(n-t)*(2/3-e):t)+.5},5i=17(e){19 t,n,r,i,s,o;18 e&&""!==e?"2y"==1j e?[e>>16,1F&e>>8,1F&e]:(","===e.1v(e.1c-1)&&(e=e.1q(0,e.1c-1)),3x[e]?3x[e]:"#"===e.1v(0)?(4===e.1c&&(t=e.1v(1),n=e.1v(2),r=e.1v(3),e="#"+t+t+n+n+r+r),e=3v(e.1q(1),16),[e>>16,1F&e>>8,1F&e]):"6y"===e.1q(0,3)?(e=e.2G(v),i=1D(e[0])%68/68,s=1D(e[1])/22,o=1D(e[2])/22,n=.5>=o?o*(s+1):o+s-o*s,t=2*o-n,e.1c>3&&(e[3]=1D(e[3])),e[0]=5a(i+1/3,t,n),e[1]=5a(i,t,n),e[2]=5a(i-1/3,t,n),e):(e=e.2G(v)||3x.4g,e[0]=1D(e[0]),e[1]=1D(e[1]),e[2]=1D(e[2]),e.1c>3&&(e[3]=1D(e[3])),e)):3x.7I},at="(?:\\\\b(?:(?:5h|6Z|6y|cc)\\\\(.+?\\\\))|\\\\B#.+?\\\\b";1b(a 1u 3x)at+="|"+a+"\\\\b";at=46(at+")","3M");19 6H=17(e,t,n,r){1a(1d==e)18 17(e){18 e};19 i,s=t?(e.2G(at)||[""])[0]:"",o=e.1t(s).1J("").2G(g)||[],u=e.1q(0,e.1k(o[0])),a=")"===e.1v(e.1c-1)?")":"",f=-1!==e.1k(" ")?" ":",",l=o.1c,c=l>0?o[0].1I(v,""):"";18 l?i=t?17(e){19 t,h,p,d;1a("2y"==1j e)e+=c;1m 1a(r&&M.2P(e)){1b(d=e.1I(M,"|").1t("|"),p=0;d.1c>p;p++)d[p]=i(d[p]);18 d.1J(",")}1a(t=(e.2G(at)||[s])[0],h=e.1t(t).1J("").2G(g)||[],p=h.1c,l>p--)1b(;l>++p;)h[p]=n?h[0|(p-1)/2]:o[p];18 u+h.1J(f)+f+t+a+(-1!==e.1k("6Y")?" 6Y":"")}:17(e){19 t,s,h;1a("2y"==1j e)e+=c;1m 1a(r&&M.2P(e)){1b(s=e.1I(M,"|").1t("|"),h=0;s.1c>h;h++)s[h]=i(s[h]);18 s.1J(",")}1a(t=e.2G(g)||[],h=t.1c,l>h--)1b(;l>++h;)t[h]=n?t[0|(h-1)/2]:o[h];18 u+t.1J(f)+a}:17(e){18 e}},5g=17(e){18 e=e.1t(","),17(t,n,r,i,s,o,u){19 a,f=(n+"").1t(" ");1b(u={},a=0;4>a;a++)u[e[a]]=f[a]=f[a]||f[(a-1)/2>>0];18 i.2O(t,u,s,o)}},ct=(F.c8=17(e){15.2D.1S(e);1b(19 t,n,r,i,s=15.1A,o=s.7W,u=s.4e,a=1e-6;u;)t=o[u.v],u.r?t=1g.3G(t):a>t&&t>-a&&(t=0),u.t[u.p]=t,u=u.1f;1a(s.8F&&(s.8F.1K=o.1K),1===e)1b(u=s.4e;u;){1a(n=u.t,n.2p){1a(1===n.2p){1b(i=n.1X+n.s+n.4a,r=1;n.l>r;r++)i+=n["3i"+r]+n["2R"+(r+1)];n.e=i}}1m n.e=n.s+n.1X;u=u.1f}},17(e,t,n,r,i){15.t=e,15.p=t,15.v=n,15.r=i,r&&(r.1l=15,15.1f=r)}),27=(F.c9=17(e,t,n,r,i,s){19 o,u,a,f,l,c=r,h={},p={},d=n.3r,v=P;1b(n.3r=1d,P=t,r=l=n.2O(e,t,r,i),P=v,s&&(n.3r=d,c&&(c.1l=1d,c.1l&&(c.1l.1f=1d)));r&&r!==c;){1a(1>=r.2p&&(u=r.p,p[u]=r.s+r.c,h[u]=r.s,s||(f=1h ct(r,"s",u,f,r.r),r.c=0),1===r.2p))1b(o=r.l;--o>0;)a="3i"+o,u=r.p+"2f"+a,p[u]=r.1A[a],h[u]=r[a],s||(f=1h ct(r,a,u,f,r.56[a]));r=r.1f}18{7W:h,ca:p,4e:f,4j:l}},F.cb=17(e,t,r,i,o,u,a,f,l,c,h){15.t=e,15.p=t,15.s=r,15.c=i,15.n=a||t,e 2b 27||s.2d(15.n),15.r=f,15.2p=u||0,l&&(15.2s=l,n=!0),15.b=2h 0===c?r:c,15.e=2h 0===h?r+i:h,o&&(15.1f=o,o.1l=15)}),4j=o.3Y=17(e,t,n,r,i,s,o,u,a,l){n=n||s||"",o=1h 27(e,t,0,0,o,l?2:1,1d,!1,u,n,r),r+="";19 c,h,p,d,g,y,b,w,E,S,T,N,C=n.1t(", ").1J(",").1t(" "),k=r.1t(", ").1J(",").1t(" "),L=C.1c,A=f!==!1;1b((-1!==r.1k(",")||-1!==n.1k(","))&&(C=C.1J(" ").1I(M,", ").1t(" "),k=k.1J(" ").1I(M,", ").1t(" "),L=C.1c),L!==k.1c&&(C=(s||"").1t(" "),L=C.1c),o.2D=a,o.1S=l,c=0;L>c;c++)1a(d=C[c],g=k[c],w=1r(d),w||0===w)o.3S("",w,3q(g,w),g.1I(m,""),A&&-1!==g.1k("2c"),!0);1m 1a(i&&("#"===d.1v(0)||3x[d]||x.2P(d)))N=","===g.1v(g.1c-1)?"),":")",d=5i(d),g=5i(g),E=d.1c+g.1c>6,E&&!q&&0===g[3]?(o["2R"+o.l]+=o.l?" 4g":"4g",o.e=o.e.1t(k[c]).1J("4g")):(q||(E=!1),o.3S(E?"6Z(":"5h(",d[0],g[0]-d[0],",",!0,!0).3S("",d[1],g[1]-d[1],",",!0).3S("",d[2],g[2]-d[2],E?",":N,!0),E&&(d=4>d.1c?1:d[3],o.3S("",d,(4>g.1c?1:g[3])-d,N,!1)));1m 1a(y=d.2G(v)){1a(b=g.2G(m),!b||b.1c!==y.1c)18 o;1b(p=0,h=0;y.1c>h;h++)T=y[h],S=d.1k(T,p),o.3S(d.1q(p,S-p),1D(T),3q(b[h],T),"",A&&"2c"===d.1q(S+T.1c,2),0===h),p=S+T.1c;o["2R"+o.l]+=d.1q(p)}1m o["2R"+o.l]+=o.l?" "+d:d;1a(-1!==r.1k("=")&&o.1A){1b(N=o.1X+o.1A.s,c=1;o.l>c;c++)N+=o["2R"+c]+o.1A["3i"+c];o.e=N+o["2R"+c]}18 o.l||(o.2p=-1,o.1X=o.e),o.3C||o},2u=9;1b(a=27.1y,a.l=a.2s=0;--2u>0;)a["3i"+2u]=0,a["2R"+2u]="";a.1X="",a.1f=a.1l=a.3C=a.1A=a.2D=a.1S=a.56=1d,a.3S=17(e,t,n,r,i,s){19 o=15,u=o.l;18 o["2R"+u]+=s&&u?" "+e:e||"",n||0===u||o.2D?(o.l++,o.2p=o.1S?2:1,o["2R"+o.l]=r||"",u>0?(o.1A["3i"+u]=t+n,o.56["3i"+u]=i,o["3i"+u]=t,o.2D||(o.3C=1h 27(o,"3i"+u,t,n,o.3C||o,0,o.n,i,o.2s),o.3C.1X=0),o):(o.1A={s:t+n},o.56={},o.s=t,o.c=n,o.r=i,o)):(o["2R"+u]+=t+(r||""),o)};19 5O=17(e,t){t=t||{},15.p=t.2V?X(e)||e:e,u[e]=u[15.p]=15,15.2U=t.4v||6H(t.2v,t.4c,t.bW,t.3W),t.24&&(15.2O=t.24),15.8T=t.4c,15.3W=t.3W,15.5b=t.5b,15.3Z=t.2v,15.2s=t.5E||0},1G=F.bV=17(e,t,n){"3U"!=1j t&&(t={24:n});19 r,i,s=e.1t(","),o=t.2v;1b(n=n||[o],r=0;s.1c>r;r++)t.2V=0===r&&t.2V,t.2v=n[r]||o,i=1h 5O(s[r],t)},7a=17(e){1a(!u[e]){19 t=e.1v(0).4Z()+e.1q(1)+"8u";1G(e,{24:17(e,n,r,i,s,o,a){19 f=(1Q.5Z||1Q).4Q.4R.4S[t];18 f?(f.bG(),u[r].2O(e,n,r,i,s,o,a)):(U("bH: "+t+" bI bJ 8K bF."),s)}})}};a=5O.1y,a.3Y=17(e,t,n,r,i,s){19 o,u,a,f,l,c,h=15.5b;1a(15.3W&&(M.2P(n)||M.2P(t)?(u=t.1I(M,"|").1t("|"),a=n.1I(M,"|").1t("|")):h&&(u=[t],a=[n])),a){1b(f=a.1c>u.1c?a.1c:u.1c,o=0;f>o;o++)t=u[o]=u[o]||15.3Z,n=a[o]=a[o]||15.3Z,h&&(l=t.1k(h),c=n.1k(h),l!==c&&(n=-1===c?a:u,n[o]+=" "+h));t=u.1J(", "),n=a.1J(", ")}18 4j(e,15.p,t,n,15.8T,15.3Z,r,15.2s,i,s)},a.2O=17(e,t,n,r,s,o){18 15.3Y(e.1w,15.2U($(e,15.p,i,!1,15.3Z)),15.2U(t),s,o)},o.bE=17(e,t,n){1G(e,{24:17(e,r,i,s,o,u){19 a=1h 27(e,i,0,0,o,2,i,!1,n);18 a.2D=u,a.1S=t(e,r,s.2Y,i),a},5E:n})};19 6O="28,2g,2W,x,y,z,1R,32,1K,1P,1V,3b".1t(","),bt=X("3R"),8O=z+"3R",5q=X("4G"),39=1d!==X("3b"),5F=F.bB=17(){15.32=0},4l=F.bC=17(e,t,n,r){1a(e.3T&&n&&!r)18 e.3T;19 i,s,u,a,f,l,c,h,p,d,v,m,g,y=n?e.3T||1h 5F:1h 5F,b=0>y.28,w=2e-5,E=4X,S=bD.99,x=S*2f,T=39?1r($(e,5q,t,!1,"0 0 0").1t(" ")[2])||y.2S||0:0;1b(bt?i=$(e,8O,t,!0):e.2X&&(i=e.2X.2l.2G(A),i=i&&4===i.1c?[i[0].1q(4),1D(i[2].1q(4)),1D(i[1].1q(4)),i[3].1q(4),y.x||0,y.y||0].1J(","):""),s=(i||"").2G(/(?:\\-|\\b)[\\d\\-\\.e]+\\b/3M)||[],u=s.1c;--u>-1;)a=1D(s[u]),s[u]=(f=a-(a|=0))?(0|f*E+(0>f?-.5:.5))/E+a:a;1a(16===s.1c){19 N=s[8],C=s[9],k=s[10],L=s[12],O=s[13],M=s[14];1a(y.2S&&(M=-y.2S,L=N*M-s[12],O=C*M-s[13],M=k*M+y.2S-s[14]),!n||r||1d==y.1P){19 P,H,B,j,F,I,q,R=s[0],U=s[1],z=s[2],W=s[3],X=s[4],V=s[5],J=s[6],K=s[7],Q=s[11],G=1g.4F(J,k),Y=-x>G||G>x;y.1P=G*D,G&&(j=1g.2E(-G),F=1g.2k(-G),P=X*j+N*F,H=V*j+C*F,B=J*j+k*F,N=X*-F+N*j,C=V*-F+C*j,k=J*-F+k*j,Q=K*-F+Q*j,X=P,V=H,J=B),G=1g.4F(N,R),y.1V=G*D,G&&(I=-x>G||G>x,j=1g.2E(-G),F=1g.2k(-G),P=R*j-N*F,H=U*j-C*F,B=z*j-k*F,C=U*F+C*j,k=z*F+k*j,Q=W*F+Q*j,R=P,U=H,z=B),G=1g.4F(U,V),y.1K=G*D,G&&(q=-x>G||G>x,j=1g.2E(-G),F=1g.2k(-G),R=R*j+X*F,H=U*j+V*F,V=U*-F+V*j,J=z*-F+J*j,U=H),q&&Y?y.1K=y.1P=0:q&&I?y.1K=y.1V=0:I&&Y&&(y.1V=y.1P=0),y.28=(0|1g.38(R*R+U*U)*E+.5)/E,y.2g=(0|1g.38(V*V+C*C)*E+.5)/E,y.2W=(0|1g.38(J*J+k*k)*E+.5)/E,y.1R=0,y.3b=Q?1/(0>Q?-Q:Q):0,y.x=L,y.y=O,y.z=M}}1m 1a(!(39&&!r&&s.1c&&y.x===s[4]&&y.y===s[5]&&(y.1P||y.1V)||2h 0!==y.x&&"3t"===$(e,"6S",t))){19 Z=s.1c>=6,3L=Z?s[0]:1,3g=s[1]||0,3q=s[2]||0,2A=Z?s[3]:1;y.x=s[4]||0,y.y=s[5]||0,l=1g.38(3L*3L+3g*3g),c=1g.38(2A*2A+3q*3q),h=3L||3g?1g.4F(3g,3L)*D:y.1K||0,p=3q||2A?1g.4F(3q,2A)*D+h:y.1R||0,d=l-1g.51(y.28||0),v=c-1g.51(y.2g||0),1g.51(p)>90&&bS>1g.51(p)&&(b?(l*=-1,p+=0>=h?36:-36,h+=0>=h?36:-36):(c*=-1,p+=0>=p?36:-36)),m=(h-y.1K)%36,g=(p-y.1R)%36,(2h 0===y.1R||d>w||-w>d||v>w||-w>v||m>-S&&S>m&&5X|m*E||g>-S&&S>g&&5X|g*E)&&(y.28=l,y.2g=c,y.1K=h,y.1R=p),39&&(y.1P=y.1V=y.z=0,y.3b=1r(o.81)||0,y.2W=1)}y.2S=T;1b(u 1u y)w>y[u]&&y[u]>-w&&(y[u]=0);18 n&&(e.3T=y),y},7q=17(e){19 t,n,r=15.1A,i=-r.1K*2f,s=i+r.1R*2f,o=4X,u=(0|1g.2E(i)*r.28*o)/o,a=(0|1g.2k(i)*r.28*o)/o,f=(0|1g.2k(s)*-r.2g*o)/o,l=(0|1g.2E(s)*r.2g*o)/o,c=15.t.1w,h=15.t.2X;1a(h){n=a,a=-f,f=-n,t=h.2l,c.2l="";19 p,v,m=15.t.4N,g=15.t.4M,y="83"!==h.4m,E="82:5Q.5S.5V(8c="+u+", 8d="+a+", 8n="+f+", 8m="+l,S=r.x,x=r.y;1a(1d!=r.52&&(p=(r.8o?.8q*m*r.52:r.52)-m/2,v=(r.8r?.8q*g*r.5R:r.5R)-g/2,S+=p-(p*u+v*a),x+=v-(p*f+v*l)),y?(p=m/2,v=g/2,E+=", 8e="+(p-(p*u+v*a)+S)+", 8g="+(v-(p*f+v*l)+x)+")"):E+=", bU=\'2t bR\')",c.2l=-1!==t.1k("5Q.5S.5V(")?t.1I(O,E):E+" "+t,(0===e||1===e)&&1===u&&0===a&&0===f&&1===l&&(y&&-1===E.1k("8e=0, 8g=0")||w.2P(t)&&22!==1r(46.$1)||-1===t.1k("bN("&&t.1k("bO"))&&c.6W("2l")),!y){19 T,N,C,k=8>d?1:-1;1b(p=r.53||0,v=r.5p||0,r.53=1g.3G((m-((0>u?-u:u)*m+(0>a?-a:a)*g))/2+S),r.5p=1g.3G((g-((0>l?-l:l)*g+(0>f?-f:f)*m))/2+x),2u=0;4>2u;2u++)N=Z[2u],T=h[N],n=-1!==T.1k("2c")?1r(T):J(15.t,N,1r(T),T.1I(b,""))||0,C=n!==r[N]?2>2u?-r.53:-r.5p:2>2u?p-r.53:v-r.5p,c[N]=(r[N]=1g.3G(n-C*(0===2u||2===2u?1:k)))+"2c"}}},5o=F.d3=17(){19 e,t,n,r,i,s,o,u,a,f,l,c,p,d,v,m,g,y,b,w,E,S,x,T=15.1A,N=15.t.1w,C=T.1K*2f,k=T.28,L=T.2g,A=T.2W,O=T.3b;1a(h){19 M=1e-4;M>k&&k>-M&&(k=A=2e-5),M>L&&L>-M&&(L=A=2e-5),!O||T.z||T.1P||T.1V||(O=0)}1a(C||T.1R)y=1g.2E(C),b=1g.2k(C),e=y,i=b,T.1R&&(C-=T.1R*2f,y=1g.2E(C),b=1g.2k(C),"bP"===T.4r&&(w=1g.bM(T.1R*2f),w=1g.38(1+w*w),y*=w,b*=w)),t=-b,s=y;1m{1a(!(T.1V||T.1P||1!==A||O))18 N[bt]="bQ("+T.x+"2c,"+T.y+"2c,"+T.z+"2c)"+(1!==k||1!==L?" 4y("+k+","+L+")":""),2h 0;e=s=1,t=i=0}l=1,n=r=o=u=a=f=c=p=d=0,v=O?-1/O:0,m=T.2S,g=4X,C=T.1V*2f,C&&(y=1g.2E(C),b=1g.2k(C),a=l*-b,p=v*-b,n=e*b,o=i*b,l*=y,v*=y,e*=y,i*=y),C=T.1P*2f,C&&(y=1g.2E(C),b=1g.2k(C),w=t*y+n*b,E=s*y+o*b,S=f*y+l*b,x=d*y+v*b,n=t*-b+n*y,o=s*-b+o*y,l=f*-b+l*y,v=d*-b+v*y,t=w,s=E,f=S,d=x),1!==A&&(n*=A,o*=A,l*=A,v*=A),1!==L&&(t*=L,s*=L,f*=L,d*=L),1!==k&&(e*=k,i*=k,a*=k,p*=k),m&&(c-=m,r=n*c,u=o*c,c=l*c+m),r=(w=(r+=T.x)-(r|=0))?(0|w*g+(0>w?-.5:.5))/g+r:r,u=(w=(u+=T.y)-(u|=0))?(0|w*g+(0>w?-.5:.5))/g+u:u,c=(w=(c+=T.z)-(c|=0))?(0|w*g+(0>w?-.5:.5))/g+c:c,N[bt]="bT("+[(0|e*g)/g,(0|i*g)/g,(0|a*g)/g,(0|p*g)/g,(0|t*g)/g,(0|s*g)/g,(0|f*g)/g,(0|d*g)/g,(0|n*g)/g,(0|o*g)/g,(0|l*g)/g,(0|v*g)/g,r,u,c,O?1+ -c/O:1].1J(",")+")"},7t=F.bL=17(e){19 t,n,r,i,s,o=15.1A,u=15.t,a=u.1w;18 o.1P||o.1V||o.z||o.44?(15.1S=5o,5o.1W(15,e),2h 0):(o.1K||o.1R?(t=o.1K*2f,n=t-o.1R*2f,r=4X,i=o.28*r,s=o.2g*r,a[bt]="8P("+(0|1g.2E(t)*i)/r+","+(0|1g.2k(t)*i)/r+","+(0|1g.2k(n)*-s)/r+","+(0|1g.2E(n)*s)/r+","+o.x+","+o.y+")"):a[bt]="8P("+o.28+",0,0,"+o.2g+","+o.x+","+o.y+")",2h 0)};1G("3R,4y,28,2g,2W,x,y,z,1K,1P,1V,6M,1R,32,6N,6G,6A,bK,4G,8U,8x,8M,44,4r",{24:17(e,t,n,r,s,u,a){1a(r.3r)18 s;19 f,l,c,h,p,d,v,m=r.3r=4l(e,i,!0,a.8M),g=e.1w,y=1e-6,b=6O.1c,w=a,E={};1a("1L"==1j w.3R&&bt)c=g.3d,g[bt]=w.3R,g.6S="bA",f=4l(e,1d,!1),g.3d=c;1m 1a("3U"==1j w){1a(f={28:2A(1d!=w.28?w.28:w.4y,m.28),2g:2A(1d!=w.2g?w.2g:w.4y,m.2g),2W:2A(w.2W,m.2W),x:2A(w.x,m.x),y:2A(w.y,m.y),z:2A(w.z,m.z),3b:2A(w.8U,m.3b)},v=w.8x,1d!=v)1a("3U"==1j v)1b(c 1u v)w[c]=v[c];1m w.1K=v;f.1K=3D("1K"1u w?w.1K:"6N"1u w?w.6N+"6F":"6M"1u w?w.6M:m.1K,m.1K,"1K",E),39&&(f.1P=3D("1P"1u w?w.1P:"6G"1u w?w.6G+"6F":m.1P||0,m.1P,"1P",E),f.1V=3D("1V"1u w?w.1V:"6A"1u w?w.6A+"6F":m.1V||0,m.1V,"1V",E)),f.1R=1d==w.1R?m.1R:3D(w.1R,m.1R),f.32=1d==w.32?m.32:3D(w.32,m.32),(l=f.32-m.32)&&(f.1R+=l,f.1K+=l)}1b(39&&1d!=w.44&&(m.44=w.44,d=!0),m.4r=w.4r||m.4r||o.8w,p=m.44||m.z||m.1P||m.1V||f.z||f.1P||f.1V||f.3b,p||1d==w.4y||(f.2W=1);--b>-1;)n=6O[b],h=f[n]-m[n],(h>y||-y>h||1d!=P[n])&&(d=!0,s=1h 27(m,n,m[n],h,s),n 1u E&&(s.e=E[n]),s.1X=0,s.2D=u,r.2B.2d(s.n));18 h=w.4G,(h||39&&p&&m.2S)&&(bt?(d=!0,n=5q,h=(h||$(e,n,i,!1,"50% 50%"))+"",s=1h 27(g,n,0,0,s,-1,"4G"),s.b=g[n],s.2D=u,39?(c=m.2S,h=h.1t(" "),m.2S=(h.1c>2&&(0===c||"1M"!==h[2])?1r(h[2]):c)||0,s.1X=s.e=g[n]=h[0]+" "+(h[1]||"50%")+" 1M",s=1h 27(m,"2S",0,0,s,-1,s.n),s.b=c,s.1X=s.e=m.2S):s.1X=s.e=g[n]=h):3g(h+"",m)),d&&(r.47=p||3===15.47?3:2),s},2V:!0}),1G("cd",{2v:"1M 1M 1M 1M #8i",2V:!0,4c:!0,3W:!0,5b:"6Y"}),1G("cg",{2v:"1M",24:17(e,t,n,s,o){t=15.2U(t);19 u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x=["cf","c6","bZ","b8"],T=e.1w;1b(v=1r(e.4N),m=1r(e.4M),u=t.1t(" "),a=0;x.1c>a;a++)15.p.1k("3X")&&(x[a]=X(x[a])),c=l=$(e,x[a],i,!1,"1M"),-1!==c.1k(" ")&&(l=c.1t(" "),c=l[0],l=l[1]),h=f=u[a],p=1r(c),y=c.1q((p+"").1c),b="="===h.1v(1),b?(d=3v(h.1v(0)+"1",10),h=h.1q(2),d*=1r(h),g=h.1q((d+"").1c-(0>d?1:0))||""):(d=1r(h),g=h.1q((d+"").1c)),""===g&&(g=r[n]||y),g!==y&&(w=J(e,"7Q",p,y),E=J(e,"aT",p,y),"%"===g?(c=22*(w/v)+"%",l=22*(E/m)+"%"):"4k"===g?(S=J(e,"7Q",1,"4k"),c=w/S+"4k",l=E/S+"4k"):(c=w+"2c",l=E+"2c"),b&&(h=1r(c)+d+g,f=1r(l)+d+g)),o=4j(T,x[a],c+" "+l,h+" "+f,!1,"1M",o);18 o},2V:!0,4v:6H("1M 1M 1M 1M",!1,!0)}),1G("ba",{2v:"0 0",24:17(e,t,n,r,s,o){19 u,a,f,l,c,h,p="bb-4m",v=i||V(e,1d),m=15.2U((v?d?v.42(p+"-x")+" "+v.42(p+"-y"):v.42(p):e.2X.bm+" "+e.2X.bi)||"0 0"),g=15.2U(t);1a(-1!==m.1k("%")!=(-1!==g.1k("%"))&&(h=$(e,"d1").1I(C,""),h&&"3t"!==h)){1b(u=m.1t(" "),a=g.1t(" "),j.d9("d5",h),f=2;--f>-1;)m=u[f],l=-1!==m.1k("%"),l!==(-1!==a[f].1k("%"))&&(c=0===f?e.4N-j.3k:e.4M-j.3y,u[f]=l?1r(m)/22*c+"2c":22*(1r(m)/c)+"%");m=u.1J(" ")}18 15.3Y(e.1w,m,g,s,o)},4v:3g}),1G("db",{2v:"0 0",4v:3g}),1G("3b",{2v:"1M",2V:!0}),1G("dj",{2v:"50% 50%",2V:!0}),1G("di",{2V:!0}),1G("dh",{2V:!0}),1G("de",{2V:!0}),1G("6U",{24:5g("7B,7S,7U,7K")}),1G("6B",{24:5g("cq,cR,cV,cU")}),1G("cT",{2v:"8y(1M,1M,1M,1M)",24:17(e,t,n,r,s,o){19 u,a,f;18 9>d?(a=e.2X,f=8>d?" ":",",u="8y("+a.cS+f+a.d4+f+a.da+f+a.cZ+")",t=15.2U(t).1t(",").1J(f)):(u=15.2U($(e,15.p,i,!1,15.3Z)),t=15.2U(t)),15.3Y(e.1w,u,t,s,o)}}),1G("d6",{2v:"1M 1M 1M #8i",4c:!0,3W:!0}),1G("7c,8b",{24:17(e,t,n,r,i){18 i}}),1G("3X",{2v:"1M 5x #6T",24:17(e,t,n,r,s,o){18 15.3Y(e.1w,15.2U($(e,"6X",i,!1,"1M")+" "+$(e,"d8",i,!1,"5x")+" "+$(e,"d0",i,!1,"#6T")),15.2U(t),s,o)},4c:!0,4v:17(e){19 t=e.1t(" ");18 t[0]+" "+(t[1]||"5x")+" "+(e.2G(at)||["#6T"])[0]}}),1G("9e",{24:5g("6X,9f,9g,84")}),1G("9c,6L,86",{24:17(e,t,n,r,i){19 s=e.1w,o="6L"1u s?"6L":"86";18 1h 27(s,o,0,0,i,-1,n,!1,0,s[o],t)}});19 8s=17(e){19 t,n=15.t,r=n.2l||$(15.1A,"2l"),i=0|15.s+15.c*e;22===i&&(-1===r.1k("96(")&&-1===r.1k("97(")&&-1===r.1k("98(")?(n.6W("2l"),t=!$(15.1A,"2l")):(n.2l=r.1I(S,""),t=!0)),t||(15.3P&&(n.2l=r=r||"3B(1Z="+i+")"),-1===r.1k("1Z")?0===i&&15.3P||(n.2l=r+" 3B(1Z="+i+")"):n.2l=r.1I(w,"1Z="+i))};1G("1Z,3B,4T",{2v:"1",24:17(e,t,n,r,s,o){19 u=1r($(e,"1Z",i,!1,"1")),a=e.1w,f="4T"===n;18"1L"==1j t&&"="===t.1v(1)&&(t=("-"===t.1v(0)?-1:1)*1r(t.1q(2))+u),f&&1===u&&"5v"===$(e,"6z",i)&&0!==t&&(u=0),q?s=1h 27(a,"1Z",u,t-u,s):(s=1h 27(a,"1Z",22*u,22*(t-u),s),s.3P=f?1:0,a.7s=1,s.2p=2,s.b="3B(1Z="+s.s+")",s.e="3B(1Z="+(s.s+s.c)+")",s.1A=e,s.2D=o,s.1S=8s),f&&(s=1h 27(a,"6z",0,0,s,-1,1d,!1,0,0!==u?"6I":"5v",0===t?"5v":"6I"),s.1X="6I",r.2B.2d(s.n),r.2B.2d(n)),s}});19 5r=17(e,t){t&&(e.8z?("5t"===t.1q(0,2)&&(t="M"+t.1q(1)),e.8z(t.1I(T,"-$1").6P())):e.6W(t))},8I=17(e){1a(15.t.4L=15,1===e||0===e){15.t.3a=0===e?15.b:15.e;1b(19 t=15.1A,n=15.t.1w;t;)t.v?n[t.p]=t.v:5r(n,t.p),t=t.1f;1===e&&15.t.4L===15&&(15.t.4L=1d)}1m 15.t.3a!==15.e&&(15.t.3a=15.e)};1G("3a",{24:17(e,t,r,s,o,u,a){19 f,l,c,h,p,d=e.3a,v=e.1w.3d;1a(o=s.6J=1h 27(e,r,0,0,o,2),o.1S=8I,o.2s=-11,n=!0,o.b=d,l=Q(e,i),c=e.4L){1b(h={},p=c.1A;p;)h[p.p]=1,p=p.1f;c.1S(1)}18 e.4L=o,o.e="="!==t.1v(1)?t:d.1I(46("\\\\s*\\\\b"+t.1q(2)+"\\\\b"),"")+("+"===t.1v(0)?" "+t.1q(2):""),s.2Y.1C&&(e.3a=o.e,f=G(e,l,Q(e),a,h),e.3a=d,o.1A=f.4e,e.1w.3d=v,o=o.3C=s.2O(e,f.57,o,u)),o}});19 8E=17(e){1a((1===e||0===e)&&15.1A.1H===15.1A.2i&&"8D"!==15.1A.1A){19 t,n,r,i,s=15.t.1w,o=u.3R.2O;1a("41"===15.e)s.3d="",i=!0;1m 1b(t=15.e.1t(","),r=t.1c;--r>-1;)n=t[r],u[n]&&(u[n].2O===o?i=!0:n="4G"===n?5q:u[n].p),5r(s,n);i&&(5r(s,bt),15.t.3T&&3E 15.t.3T)}};1b(1G("9h",{24:17(e,t,r,i,s){18 s=1h 27(e,r,0,0,s,2),s.1S=8E,s.e=t,s.2s=-10,s.1A=i.2Y,n=!0,s}}),a="9i,9p,9q,95".1t(","),2u=a.1c;2u--;)7a(a[2u]);a=o.1y,a.1s=1d,a.6V=17(e,t,u){1a(!e.3n)18!1;15.7V=e,15.2Y=u,15.7d=t,f=t.7c,n=!1,r=t.6E||o.6E,i=V(e,""),s=15.2B;19 a,h,d,v,m,g,y,b,w,S=e.1w;1a(l&&""===S.3O&&(a=$(e,"3O",i),("2t"===a||""===a)&&(S.3O=0)),"1L"==1j t&&(v=S.3d,a=Q(e,i),S.3d=v+";"+t,a=G(e,a,Q(e)).57,!q&&E.2P(t)&&(a.1Z=1r(46.$1)),t=a,S.3d=v),15.1s=h=15.2O(e,t,1d),15.47){1b(w=3===15.47,bt?c&&(l=!0,""===S.3O&&(y=$(e,"3O",i),("2t"===y||""===y)&&(S.3O=0)),p&&(S.7b=15.7d.7b||(w?"9r":"5v"))):S.7s=1,d=h;d&&d.1f;)d=d.1f;b=1h 27(e,"3R",0,0,1d,2),15.5e(b,1d,d),b.1S=w&&39?5o:bt?7t:7q,b.1A=15.3r||4l(e,i,!0),s.4q()}1a(n){1b(;h;){1b(g=h.1f,d=v;d&&d.2s>h.2s;)d=d.1f;(h.1l=d?d.1l:m)?h.1l.1f=h:v=h,(h.1f=d)?d.1l=h:m=h,h=g}15.1s=v}18!0},a.2O=17(e,t,n,s){19 o,a,l,c,h,p,d,v,m,g,y=e.1w;1b(o 1u t)p=t[o],a=u[o],a?n=a.2O(e,p,o,15,n,s,t):(h=$(e,o,i)+"",m="1L"==1j p,"4c"===o||"9k"===o||"91"===o||-1!==o.1k("8Z")||m&&x.2P(p)?(m||(p=5i(p),p=(p.1c>3?"6Z(":"5h(")+p.1J(",")+")"),n=4j(y,o,h,p,!0,"4g",n,0,s)):!m||-1===p.1k(" ")&&-1===p.1k(",")?(l=1r(h),d=l||0===l?h.1q((l+"").1c):"",(""===h||"2t"===h)&&("3k"===o||"3y"===o?(l=3L(e,o,i),d="2c"):"4A"===o||"4z"===o?(l=K(e,o,i),d="2c"):(l="1Z"!==o?0:1,d="")),g=m&&"="===p.1v(1),g?(c=3v(p.1v(0)+"1",10),p=p.1q(2),c*=1r(p),v=p.1I(b,"")):(c=1r(p),v=m?p.1q((c+"").1c)||"":""),""===v&&(v=o 1u r?r[o]:d),p=c||0===c?(g?c+l:c)+v:t[o],d!==v&&""!==v&&(c||0===c)&&l&&(l=J(e,o,l,d),"%"===v?(l/=J(e,o,22,"%")/22,t.8b!==!0&&(h=l+"%")):"4k"===v?l/=J(e,o,1,"4k"):"2c"!==v&&(c=J(e,o,c,v),v="2c"),g&&(c||0===c)&&(p=c+l+v)),g&&(c+=l),!l&&0!==l||!c&&0!==c?2h 0!==y[o]&&(p||"ar"!=p+""&&1d!=p)?(n=1h 27(y,o,c||l||0,0,n,-1,o,!1,0,h,p),n.1X="3t"!==p||"6S"!==o&&-1===o.1k("aq")?p:h):U("ap "+o+" 6R aj: "+t[o]):(n=1h 27(y,o,l,c-l,n,0,o,f!==!1&&("2c"===v||"3O"===o),0,h,p),n.1X=v)):n=4j(y,o,h,p,!0,1d,n,0,s)),s&&n&&!n.2D&&(n.2D=s);18 n},a.1S=17(e){19 t,n,r,i=15.1s,s=1e-6;1a(1!==e||15.2Y.1n!==15.2Y.1C&&0!==15.2Y.1n)1a(e||15.2Y.1n!==15.2Y.1C&&0!==15.2Y.1n||15.2Y.1z===-1e-6)1b(;i;){1a(t=i.c*e+i.s,i.r?t=1g.3G(t):s>t&&t>-s&&(t=0),i.2p)1a(1===i.2p)1a(r=i.l,2===r)i.t[i.p]=i.1X+t+i.4a+i.3P+i.5B;1m 1a(3===r)i.t[i.p]=i.1X+t+i.4a+i.3P+i.5B+i.6D+i.6C;1m 1a(4===r)i.t[i.p]=i.1X+t+i.4a+i.3P+i.5B+i.6D+i.6C+i.7D+i.7O;1m 1a(5===r)i.t[i.p]=i.1X+t+i.4a+i.3P+i.5B+i.6D+i.6C+i.7D+i.7O+i.aJ+i.aM;1m{1b(n=i.1X+t+i.4a,r=1;i.l>r;r++)n+=i["3i"+r]+i["2R"+(r+1)];i.t[i.p]=n}1m-1===i.2p?i.t[i.p]=i.1X:i.1S&&i.1S(e);1m i.t[i.p]=t+i.1X;i=i.1f}1m 1b(;i;)2!==i.2p?i.t[i.p]=i.b:i.1S(e),i=i.1f;1m 1b(;i;)2!==i.2p?i.t[i.p]=i.e:i.1S(e),i=i.1f},a.aL=17(e){15.47=e||3===15.47?3:2,15.3r=15.3r||4l(15.7V,i,!0)},a.5e=17(e,t,n,r){18 e&&(t&&(t.1l=e),e.1f&&(e.1f.1l=e.1l),e.1l?e.1l.1f=e.1f:15.1s===e&&(15.1s=e.1f,r=!0),n?n.1f=e:r||1d!==15.1s||(15.1s=e),e.1f=t,e.1l=n),e},a.2n=17(t){19 n,r,i,s=t;1a(t.4T||t.3B){s={};1b(r 1u t)s[r]=t[r];s.1Z=1,s.4T&&(s.6z=1)}18 t.3a&&(n=15.6J)&&(i=n.3C,i&&i.1l?15.5e(i.1l,n.1f,i.1l.1l):i===15.1s&&(15.1s=n.1f),n.1f&&15.5e(n.1f,n.1f.1f,i.1l),15.6J=1d),e.1y.2n.1W(15,s)};19 4t=17(e,t,n){19 r,i,s,o;1a(e.6K)1b(i=e.1c;--i>-1;)4t(e[i],t,n);1m 1b(r=e.70,i=r.1c;--i>-1;)s=r[i],o=s.2p,s.1w&&(t.2d(Q(s)),n&&n.2d(s)),1!==o&&9!==o&&11!==o||!s.70.1c||4t(s,t,n)};18 o.aD=17(e,n,r){19 i,s,o,u=t.3Q(e,n,r),a=[u],f=[],l=[],c=[],h=t.4s.7k;1b(e=u.2F||u.2x,4t(e,f,c),u.1E(n,!0),4t(e,l),u.1E(0,!0),u.1N(!0),i=c.1c;--i>-1;)1a(s=G(c[i],f[i],l[i]),s.4e){s=s.57;1b(o 1u r)h[o]&&(s[o]=r[o]);a.2d(t.3Q(c[i],n,s))}18 a},e.6Q([o]),o},!0)}),1Q.3u&&1Q.37.4q()()',62,830,'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||this||function|return|var|if|for|length|null||_next|Math|new|_startTime|typeof|indexOf|_prev|else|_time|_timeline|vars|substr|parseFloat|_firstPT|split|in|charAt|style|_timeScale|prototype|_rawPrevTime|data|_paused|_duration|Number|render|255|mt|_totalTime|replace|join|rotation|string|0px|_enabled|_gc|rotationX|window|skewX|setRatio|_p1|add|rotationY|call|xs0|immediateRender|opacity||timeline|100|totalDuration|parser||_first|ht|scaleX|_startAt|_active|instanceof|px|push||_|scaleY|void|_totalDuration|smoothChildTiming|sin|filter|arguments|_kill|easing|type|_p2|_dirty|pr|auto|dt|defaultValue|getRatio|target|number|_initted|rt|_overwriteProps|duration|plugin|cos|_targets|match|_ease|5625|_labels|constructor|_delay|_reversed|128|parse|test|splice|xs|zOrigin|_siblings|format|prefix|scaleZ|currentStyle|_tween|totalTime|startAt|wake|skewY|_onUpdate|time|apply|180|_gsQueue|sqrt|St|className|perspective|_uncache|cssText|paused|_p3|tt|_parseTimeOrLabel|xn|ratio|width|_last|_overwrittenProps|nodeType|config|pow|nt|_transform|_calcEnd|none|_gsDefine|parseInt|API|st|height|ease|_propLookup|alpha|xfirst|it|delete|frame|round|rawTime|selector|tweens|_remove|et|gi|Array|zIndex|xn1|to|transform|appendXtra|_gsTransform|object|version|multi|border|parseComplex|dflt|getTweensOf|all|getPropertyValue|concat|force3D||RegExp|_transformType|reversed|onComplete|xs1|seek|color|_listeners|firstMPT|kill|transparent|set|onReverseComplete|pt|em|Tt|position|isActive|PI|_initProps|pop|skewType|_internals|_t|_notifyPluginsOfEnabled|formatter|runBackwards|delay|scale|top|left|self|sc|_propName|onStart|atan2|transformOrigin|autoRemoveChildren|overwrite|pg|_sortChildren|_gsClassPT|offsetHeight|offsetWidth|_pauseTime|css|com|greensock|plugins|autoAlpha|strict|use|tick|1e5|Ticker|toUpperCase||abs|ox|ieOffsetX|gsClass||rxp|difs|192|9999999999|ot|keyword|sleep|easeParams|_linkCSSP|TweenLite|lt|rgb|ut|repeat|easeIn|_swapSelfInParams|easeInOut|remove|Ct|ieOffsetY|Et|At|getChildren|ms|invalidate|hidden|next|solid|prev|_onPluginEvent|onUpdate|xs2|core|_onInitAllProps|priority|xt|fps|_params|_hasPausedChild|Scope|useFrames|_func|setTimeout|pause|vt|onStartScope|DXImageTransform|oy|Microsoft|onUpdateScope|onUpdateParams|Matrix|_priority|false|Params|GreenSockGlobals||onStartParams|module|define|check|_onDisable|from|_easeType|360|TweenMax|onCompleteParams|fromTo|easeOut|isNaN|createElement|ticker|_gsCache|document|Left|_overwrite|autoCSS|throw|9375|625|delayedCall|984375|timeScale|defaultEase|onCompleteScope|_power|staggerTo|_type|SlowMo|console|hsl|visibility|shortRotationY|padding|xs3|xn2|suffixMap|_short|shortRotationX|ft|inherit|_classNamePT|slice|cssFloat|rotationZ|shortRotation|yt|toLowerCase|activate|tween|display|000|margin|_onInitTween|removeAttribute|borderTopWidth|inset|rgba|childNodes|get|_easePower|play|div||break|globals|_init|addEventListener|gt|WebkitBackfaceVisibility|autoRound|_vars|Cannot|RoughEase|_gsTweenID|_updateRoot|red|autoSleep|reservedProps|center|propName|removeLabel|init|isSelector|Nt|appendChild|zoom|kt|_roundProps|defaultView|insert|addLabel|SimpleTimeline|log|func|marginTop|map|xn3|isArray|bottom|right|Width|black|onReverseCompleteParams|marginLeft|_onEnable|onReverseCompleteScope|Top|xs4|_rootFramesTimeline|borderLeft|filters|marginRight|Right|marginBottom|_target|proxy|Linear|Back|Quad|TweenPlugin|defaultTransformPerspective|progid|absolute|borderLeftWidth|_eventTarget|styleFloat|SteppedEase|Date|_p|up|strictUnits|M11|M12|Dx|exports|Dy|Ease|999|GreenSockAMDPath|_class|register|M22|M21|oxp|shiftChildren|01|oyp|Lt|url|Plugin|gap|defaultSkewType|directionalRotation|rect|removeProperty|random|_contains|startTime|isFromStart|Mt|autoRotate|defaultOverwrite|Animation|Ot|2e3|not|1e3|parseTransform|template|wt|matrix|dispatchEvent|strength|useRAF|clrs|transformPerspective|events|EventDispatcher|or|the|Color||stroke|append|into|is|physics2D|atrix|radient|oader||clear|999999999999|float|usesFrames|borderWidth|borderRightWidth|borderBottomWidth|clearProps|bezier|getLabelTime|fill|addPause|appendMultiple|stop|gotoAndPlay|throwProps|physicsProps|visible|gotoAndStop|insertMultiple|killTweensOf|resume|restart|reverse|eventCallback|1500|clearTimeout|CancelAnimationFrame|CancelRequestAnimationFrame|004|on|progress|_plugins|_tweenLookup|onRepeat|getElementById|jQuery|totalProgress|jquery|_autoCSS|RequestAnimationFrame|webkit|Quart|Quint|Strong|Cubic|undefined|Object|toString|amd|Power|easeNone|now|getTime|moz|cancelAnimationFrame|requestAnimationFrame|linear|swing|removeEventListener|onRepeatParams|onRepeatScope|dependency|TimelineLite|align|missing|encountered|initAll|global|GSAP|stagger|value|exportRoot|normal|sequence|staggerFromTo|staggerFrom|invalid|Style|NaN|overwriteProps||definition|true|_rootTimeline|120|preexisting|allOnStart|yoyo|repeatDelay|concurrent|cascadeTo|_dummyGS|_super|_addTween|illegal|killDelayedCallsTo|xn4|_tempKill|_enableTransforms|xs5|start|70158|Bottom|oxr|oyr|rad|borderTop|Origin|removeChild|cacheWidths|calculateOffset|offset|short|_cw|maroon|teal|blue|navy|silver|lime|ccw|borderBottomLeftRadius|aqua|backgroundPosition|background|exec|innerHTML|1px|getElementsByTagName|MSIE|Firefox|backgroundPositionY|Safari|Chrome|Version|backgroundPositionX|Moz|clientWidth|clientHeight|line|body|convertToPixels||getStyle|Ms|Webkit|getComputedStyle|white|fuchsia|block|Transform|getTransform|179|registerSpecialProp|loaded|_cssRegister|Error|js|file|shortRotationZ|set2DTransformRatio|tan|gradient|Alpha|simple|translate3d|expand|270|matrix3d|sizingMethod|_registerComplexSpecialProp|collapsible|purple|green|borderBottomRightRadius|pink|gray|165|olive|yellow|orange|borderTopRightRadius|203|_setPluginRatio|_parseToProxy|end|CSSPropTween|hsla|boxShadow|cyan|borderTopLeftRadius|borderRadius|Android|parentNode|ElasticIn|ElasticInOut|Expo|ElasticOut|Elastic|BackInOut|asin|paddingTop|BackIn|ExpoOut||SineIn|BackOut|SineInOut|SineOut|Sine|ExpoIn|randomize|ExpoInOut|userAgent|CircInOut|taper|BounceOut|999999999|Bounce|points|clamp|out|sort|BounceIn|BounceInOut|Circ|CircOut|CircIn|paddingRight|clipTop|clip|paddingLeft|paddingBottom|525|001|compensated|clipLeft|borderTopColor|backgroundImage|img|set3DTransformRatio|clipRight|src|textShadow|zA|borderTopStyle|setAttribute|clipBottom|backgroundSize|navigator|lineHeight|userSelect|find|EaseLookup|backfaceVisibility|transformStyle|perspectiveOrigin|fontSize|CSSPlugin|_specialProps|Z0'.split('|'),0,{}));
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






// application js


//
			window._wpemojiSettings = {"baseUrl":"http:\/\/s.w.org\/images\/core\/emoji\/72x72\/","ext":".png","source":{"concatemoji":"http:\/\/garage.cmsmasters.net\/wp-includes\/js\/wp-emoji-release.min.js?ver=4.2.2"}};
			!function(a,b,c){function d(a){var c=b.createElement("canvas"),d=c.getContext&&c.getContext("2d");return d&&d.fillText?(d.textBaseline="top",d.font="600 32px Arial","flag"===a?(d.fillText(String.fromCharCode(55356,56812,55356,56807),0,0),c.toDataURL().length>3e3):(d.fillText(String.fromCharCode(55357,56835),0,0),0!==d.getImageData(16,16,1,1).data[0])):!1}function e(a){var c=b.createElement("script");c.src=a,c.type="text/javascript",b.getElementsByTagName("head")[0].appendChild(c)}var f,g;c.supports={simple:d("simple"),flag:d("flag")},c.DOMReady=!1,c.readyCallback=function(){c.DOMReady=!0},c.supports.simple&&c.supports.flag||(g=function(){c.readyCallback()},b.addEventListener?(b.addEventListener("DOMContentLoaded",g,!1),a.addEventListener("load",g,!1)):(a.attachEvent("onload",g),b.attachEvent("onreadystatechange",function(){"complete"===b.readyState&&c.readyCallback()})),f=c.source||{},f.concatemoji?e(f.concatemoji):f.wpemoji&&f.twemoji&&(e(f.twemoji),e(f.wpemoji)))}(window,document,window._wpemojiSettings);
		


// second

jQuery(document).ready(function() {
				// CUSTOM AJAX CONTENT LOADING FUNCTION
				var ajaxRevslider = function(obj) {
				
					// obj.type : Post Type
					// obj.id : ID of Content to Load
					// obj.aspectratio : The Aspect Ratio of the Container / Media
					// obj.selector : The Container Selector where the Content of Ajax will be injected. It is done via the Essential Grid on Return of Content
					
					var content = "";

					data = {};
					
					data.action = 'revslider_ajax_call_front';
					data.client_action = 'get_slider_html';
					data.token = 'bd0ead0520';
					data.type = obj.type;
					data.id = obj.id;
					data.aspectratio = obj.aspectratio;
					
					// SYNC AJAX REQUEST
					jQuery.ajax({
						type:"post",
						url:"#",
						dataType: 'json',
						data:data,
						async:false,
						success: function(ret, textStatus, XMLHttpRequest) {
							if(ret.success == true)
								content = ret.data;								
						},
						error: function(e) {
							console.log(e);
						}
					});
					
					 // FIRST RETURN THE CONTENT WHEN IT IS LOADED !!
					 return content;						 
				};
				
				// CUSTOM AJAX FUNCTION TO REMOVE THE SLIDER
				var ajaxRemoveRevslider = function(obj) {
					return jQuery(obj.selector+" .rev_slider").revkill();
				};

				// EXTEND THE AJAX CONTENT LOADING TYPES WITH TYPE AND FUNCTION
				var extendessential = setInterval(function() {
					if (jQuery.fn.tpessential != undefined) {
						clearInterval(extendessential);
						if(typeof(jQuery.fn.tpessential.defaults) !== 'undefined') {
							jQuery.fn.tpessential.defaults.ajaxTypes.push({type:"revslider",func:ajaxRevslider,killfunc:ajaxRemoveRevslider,openAnimationSpeed:0.3});   
							// type:  Name of the Post to load via Ajax into the Essential Grid Ajax Container
							// func: the Function Name which is Called once the Item with the Post Type has been clicked
							// killfunc: function to kill in case the Ajax Window going to be removed (before Remove function !
							// openAnimationSpeed: how quick the Ajax Content window should be animated (default is 0.3)
						}
					}
				},30);
			});


//  second task

	jQuery(document).ready(function () { 
		var container = jQuery('.cmsms_slider_55ceec8c42e6c');
			containerWidth = container.width(), 
			firstPost = container.find('article'), 
			postMinWidth = Number(firstPost.css('minWidth').replace('px', '')), 
			postThreeColumns = (postMinWidth * 4) - 1;
			postTwoColumns = (postMinWidth * 3) - 1;
			postOneColumns = (postMinWidth * 2) - 1; 
		
		
		jQuery('.cmsms_slider_55ceec8c42e6c').owlCarousel( {
			items : 3, 
			itemsDesktop : false,
			itemsDesktopSmall : [postThreeColumns,3], 
			itemsTablet : [postTwoColumns,2], 
			itemsMobile : [postOneColumns,1], 
			transitionStyle : false, 
			rewindNav : true, 
			slideSpeed : 200, 
			paginationSpeed : 800, 
			rewindSpeed : 1000, autoPlay : 5000, stopOnHover : true, 
			autoHeight : true, 
			addClassActive : true, 
			responsiveBaseWidth : '.cmsms_slider_55ceec8c42e6c', 
			pagination : false, 
			navigation : true, 
			navigationText : [ "<span class=\"cmsms_prev_arrow\"></span>", "<span class=\"cmsms_next_arrow\"></span>" ] 
		} );
	} );


//

jQuery(document).ready(function () { 
	jQuery("#cmsms_quotes_slider_55ceec8c5b8d5").owlCarousel( {
	 singleItem : true,
	  autoPlay : 10000,
	  stopOnHover: true,
	   pagination: false,
	    navigation : true, 
	    navigationText : [ "<span class=\"cmsms_prev_arrow\"><span></span></span>", "<span class=\"cmsms_next_arrow\"><span></span></span>" ] 
	});
  });



