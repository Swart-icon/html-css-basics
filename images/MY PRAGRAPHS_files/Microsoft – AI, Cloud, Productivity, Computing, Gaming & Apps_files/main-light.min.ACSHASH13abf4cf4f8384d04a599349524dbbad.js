
/*!
 * MWF (Moray) Extensions v2.15.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Copyright 2011-2022 The Bootstrap Authors and Twitter, Inc.
 * Copyright ©2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mwf = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$a =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$9 = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$8 = fails$9;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$8(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$7 = fails$9;

	var functionBindNative = !fails$7(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$1 = functionBindNative;

	var call$4 = Function.prototype.call;

	var functionCall = NATIVE_BIND$1 ? call$4.bind(call$4) : function () {
	  return call$4.apply(call$4, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$2 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var call$3 = FunctionPrototype$1.call;
	var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype$1.bind.bind(call$3, call$3);

	var functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$3.apply(fn, arguments);
	  };
	};

	var uncurryThis$8 = functionUncurryThis;

	var toString$1 = uncurryThis$8({}.toString);
	var stringSlice$1 = uncurryThis$8(''.slice);

	var classofRaw = function (it) {
	  return stringSlice$1(toString$1(it), 8, -1);
	};

	var uncurryThis$7 = functionUncurryThis;
	var fails$6 = fails$9;
	var classof$1 = classofRaw;

	var $Object$2 = Object;
	var split = uncurryThis$7(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$6(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$2('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$1(it) == 'String' ? split(it, '') : $Object$2(it);
	} : $Object$2;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$2 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$1 = isNullOrUndefined$2;

	var $TypeError$7 = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$2 = function (it) {
	  if (isNullOrUndefined$1(it)) throw $TypeError$7("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject = indexedObject;
	var requireObjectCoercible$1 = requireObjectCoercible$2;

	var toIndexedObject$3 = function (it) {
	  return IndexedObject(requireObjectCoercible$1(it));
	};

	var documentAll$2 = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

	var documentAll_1 = {
	  all: documentAll$2,
	  IS_HTMLDDA: IS_HTMLDDA
	};

	var $documentAll$1 = documentAll_1;

	var documentAll$1 = $documentAll$1.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$a = $documentAll$1.IS_HTMLDDA ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$9 = isCallable$a;
	var $documentAll = documentAll_1;

	var documentAll = $documentAll.all;

	var isObject$5 = $documentAll.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$9(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$9(it);
	};

	var global$9 = global$a;
	var isCallable$8 = isCallable$a;

	var aFunction = function (argument) {
	  return isCallable$8(argument) ? argument : undefined;
	};

	var getBuiltIn$2 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$9[namespace]) : global$9[namespace] && global$9[namespace][method];
	};

	var uncurryThis$6 = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$6({}.isPrototypeOf);

	var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

	var global$8 = global$a;
	var userAgent = engineUserAgent;

	var process = global$8.process;
	var Deno = global$8.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version$1;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version$1 = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version$1 && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version$1 = +match[1];
	  }
	}

	var engineV8Version = version$1;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION = engineV8Version;
	var fails$5 = fails$9;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$5(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn$1 = getBuiltIn$2;
	var isCallable$7 = isCallable$a;
	var isPrototypeOf = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$1 = Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$1('Symbol');
	  return isCallable$7($Symbol) && isPrototypeOf($Symbol.prototype, $Object$1(it));
	};

	var $String$2 = String;

	var tryToString$1 = function (argument) {
	  try {
	    return $String$2(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$6 = isCallable$a;
	var tryToString = tryToString$1;

	var $TypeError$6 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$1 = function (argument) {
	  if (isCallable$6(argument)) return argument;
	  throw $TypeError$6(tryToString(argument) + ' is not a function');
	};

	var aCallable = aCallable$1;
	var isNullOrUndefined = isNullOrUndefined$2;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable(func);
	};

	var call$2 = functionCall;
	var isCallable$5 = isCallable$a;
	var isObject$4 = isObject$5;

	var $TypeError$5 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$5(fn = input.toString) && !isObject$4(val = call$2(fn, input))) return val;
	  if (isCallable$5(fn = input.valueOf) && !isObject$4(val = call$2(fn, input))) return val;
	  if (pref !== 'string' && isCallable$5(fn = input.toString) && !isObject$4(val = call$2(fn, input))) return val;
	  throw $TypeError$5("Can't convert object to primitive value");
	};

	var sharedExports = {};
	var shared$3 = {
	  get exports(){ return sharedExports; },
	  set exports(v){ sharedExports = v; },
	};

	var global$7 = global$a;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$1 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$1(global$7, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$7[key] = value;
	  } return value;
	};

	var global$6 = global$a;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$6[SHARED] || defineGlobalProperty$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$3.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.27.2',
	  mode: 'global',
	  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.27.2/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var requireObjectCoercible = requireObjectCoercible$2;

	var $Object = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$2 = function (argument) {
	  return $Object(requireObjectCoercible(argument));
	};

	var uncurryThis$5 = functionUncurryThis;
	var toObject$1 = toObject$2;

	var hasOwnProperty = uncurryThis$5({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$1(it), key);
	};

	var uncurryThis$4 = functionUncurryThis;

	var id$1 = 0;
	var postfix = Math.random();
	var toString = uncurryThis$4(1.0.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id$1 + postfix, 36);
	};

	var global$5 = global$a;
	var shared$2 = sharedExports;
	var hasOwn$6 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var Symbol$1 = global$5.Symbol;
	var WellKnownSymbolsStore = shared$2('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$1 = function (name) {
	  if (!hasOwn$6(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)
	      ? Symbol$1[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var call$1 = functionCall;
	var isObject$3 = isObject$5;
	var isSymbol$1 = isSymbol$2;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol = wellKnownSymbol$1;

	var $TypeError$4 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$3(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$1(exoticToPrim, input, pref);
	    if (!isObject$3(result) || isSymbol$1(result)) return result;
	    throw $TypeError$4("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$2 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var global$4 = global$a;
	var isObject$2 = isObject$5;

	var document$1 = global$4.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$2(document$1) && isObject$2(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$7 = descriptors;
	var fails$4 = fails$9;
	var createElement = documentCreateElement;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$7 && !fails$4(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$6 = descriptors;
	var call = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$1 = createPropertyDescriptor$2;
	var toIndexedObject$2 = toIndexedObject$3;
	var toPropertyKey$1 = toPropertyKey$2;
	var hasOwn$5 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$2(O);
	  P = toPropertyKey$1(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$5(O, P)) return createPropertyDescriptor$1(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$5 = descriptors;
	var fails$3 = fails$9;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$3(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var isObject$1 = isObject$5;

	var $String$1 = String;
	var $TypeError$3 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$2 = function (argument) {
	  if (isObject$1(argument)) return argument;
	  throw $TypeError$3($String$1(argument) + ' is not an object');
	};

	var DESCRIPTORS$4 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var anObject$1 = anObject$2;
	var toPropertyKey = toPropertyKey$2;

	var $TypeError$2 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
	  anObject$1(O);
	  P = toPropertyKey(P);
	  anObject$1(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$1(O);
	  P = toPropertyKey(P);
	  anObject$1(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$2('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$3 = descriptors;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$2;

	var createNonEnumerableProperty$2 = DESCRIPTORS$3 ? function (object, key, value) {
	  return definePropertyModule$2.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltInExports = {};
	var makeBuiltIn$2 = {
	  get exports(){ return makeBuiltInExports; },
	  set exports(v){ makeBuiltInExports = v; },
	};

	var DESCRIPTORS$2 = descriptors;
	var hasOwn$4 = hasOwnProperty_1;

	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$4(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || (DESCRIPTORS$2 && getDescriptor(FunctionPrototype, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$3 = functionUncurryThis;
	var isCallable$4 = isCallable$a;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$3(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$4(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$1 = store$1.inspectSource;

	var global$3 = global$a;
	var isCallable$3 = isCallable$a;

	var WeakMap$2 = global$3.WeakMap;

	var weakMapBasicDetection = isCallable$3(WeakMap$2) && /native code/.test(String(WeakMap$2));

	var shared$1 = sharedExports;
	var uid = uid$2;

	var keys = shared$1('keys');

	var sharedKey$1 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys$3 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var global$2 = global$a;
	var isObject = isObject$5;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$2;
	var hasOwn$3 = hasOwnProperty_1;
	var shared = sharedStore;
	var sharedKey = sharedKey$1;
	var hiddenKeys$2 = hiddenKeys$3;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$1 = global$2.TypeError;
	var WeakMap$1 = global$2.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared.state) {
	  var store = shared.state || (shared.state = new WeakMap$1());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function (it, metadata) {
	    if (store.has(it)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys$2[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$3(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$1(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$3(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$3(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var uncurryThis$2 = functionUncurryThis;
	var fails$2 = fails$9;
	var isCallable$2 = isCallable$a;
	var hasOwn$2 = hasOwnProperty_1;
	var DESCRIPTORS$1 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
	var inspectSource = inspectSource$1;
	var InternalStateModule = internalState;

	var enforceInternalState = InternalStateModule.enforce;
	var getInternalState = InternalStateModule.get;
	var $String = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;
	var stringSlice = uncurryThis$2(''.slice);
	var replace = uncurryThis$2(''.replace);
	var join = uncurryThis$2([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$1 && !fails$2(function () {
	  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
	  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$2(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS$1) defineProperty(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, 'arity') && value.length !== options.arity) {
	    defineProperty(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$2(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$1) defineProperty(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwn$2(state, 'source')) {
	    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$1(function toString() {
	  return isCallable$2(this) && getInternalState(this).source || inspectSource(this);
	}, 'toString');

	var isCallable$1 = isCallable$a;
	var definePropertyModule$1 = objectDefineProperty;
	var makeBuiltIn = makeBuiltInExports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$1 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$1(value)) makeBuiltIn(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$1.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$2 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toIntegerOrInfinity$1(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var toIntegerOrInfinity = toIntegerOrInfinity$2;

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$2 = function (obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$1 = toIndexedObject$3;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike$1 = lengthOfArrayLike$2;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$1($this);
	    var length = lengthOfArrayLike$1(O);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var uncurryThis$1 = functionUncurryThis;
	var hasOwn$1 = hasOwnProperty_1;
	var toIndexedObject = toIndexedObject$3;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$1 = hiddenKeys$3;

	var push = uncurryThis$1([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$1(hiddenKeys$1, key) && hasOwn$1(O, key) && push(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
	    ~indexOf(result, key) || push(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$1 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$1;

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn = getBuiltIn$2;
	var uncurryThis = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject = anObject$2;

	var concat = uncurryThis([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$1 = fails$9;
	var isCallable = isCallable$a;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable(detection) ? fails$1(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var global$1 = global$a;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty = createNonEnumerableProperty$2;
	var defineBuiltIn = defineBuiltIn$1;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$1;
	  } else if (STATIC) {
	    target = global$1[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = (global$1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn(target, key, sourceProperty, options);
	  }
	};

	var classof = classofRaw;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$1 = Array.isArray || function isArray(argument) {
	  return classof(argument) == 'Array';
	};

	var DESCRIPTORS = descriptors;
	var isArray = isArray$1;

	var $TypeError$1 = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
	    throw $TypeError$1('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var $TypeError = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$1 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
	  return it;
	};

	var $ = _export;
	var toObject = toObject$2;
	var lengthOfArrayLike = lengthOfArrayLike$2;
	var setArrayLength = arraySetLength;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var fails = fails$9;

	var INCORRECT_TO_LENGTH = fails(function () {
	  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
	});

	// V8 and Safari <= 15.4, FF < 23 throws InternalError
	// https://bugs.chromium.org/p/v8/issues/detail?id=12681
	var properErrorOnNonWritableLength = function () {
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).push();
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	};

	var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

	// `Array.prototype.push` method
	// https://tc39.es/ecma262/#sec-array.prototype.push
	$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  push: function push(item) {
	    var O = toObject(this);
	    var len = lengthOfArrayLike(O);
	    var argCount = arguments.length;
	    doesNotExceedSafeInteger(len + argCount);
	    for (var i = 0; i < argCount; i++) {
	      O[len] = arguments[i];
	      len++;
	    }
	    setArrayLength(O, len);
	    return len;
	  }
	});

	const ViewPort = {
	  XS: 0,
	  SM: 540,
	  MD: 860,
	  LG: 1084,
	  XL: 1400
	};
	const DetectionUtil = {
	  /* eslint-disable no-useless-escape, unicorn/better-regex */
	  detectMobile(includeTabletCheck) {
	    if (includeTabletCheck === void 0) {
	      includeTabletCheck = false;
	    }
	    /**
	     * detect if mobile and/or tablet device
	     * returns bool
	     */

	    let check = false;
	    if (includeTabletCheck) {
	      (function (a) {
	        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.slice(0, 4))) {
	          check = true;
	        }
	      })(navigator.userAgent || navigator.vendor || window.opera);
	    } else {
	      (function (a) {
	        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.slice(0, 4))) {
	          check = true;
	        }
	      })(navigator.userAgent || navigator.vendor || window.opera);
	    }
	    return check;
	  },
	  /**
	   * Gets viewport based on brower's window width.
	   * @returns {string} viewport
	   */
	  detectViewport() {
	    const windowWidth = window.innerWidth;
	    if (windowWidth >= ViewPort.XS && windowWidth < ViewPort.SM) {
	      return 'xs';
	    }
	    if (windowWidth < ViewPort.MD && windowWidth >= ViewPort.SM) {
	      return 'sm';
	    }
	    if (windowWidth < ViewPort.LG && windowWidth >= ViewPort.MD) {
	      return 'md';
	    }
	    if (windowWidth < ViewPort.XL && windowWidth >= ViewPort.LG) {
	      return 'lg';
	    }
	    if (windowWidth >= ViewPort.XL) {
	      return 'xl';
	    }
	  },
	  /* eslint-enable no-useless-escape */

	  isBiDirectional(el) {
	    if (!el) {
	      el = document.querySelector('html');
	    }
	    return el.getAttribute('dir') === 'rtl';
	  },
	  /**
	   * Detects whether a user has enabled the prefers reduced motion setting
	   * @returns {boolean}
	   */
	  prefersReducedMotion() {
	    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
	    return preference.matches;
	  }
	};

	const InitializationUtil = {
	  /**
	   * Initialize a component after DOM is loaded
	   * @param {string} selector - DOM selector for component
	   * @param {Function} init - Callback function to initialize the component
	   */
	  initializeComponent(selector, init) {
	    document.querySelectorAll(selector).forEach(node => init(node));
	  },
	  /**
	   * Iterate over list to add event listeners
	   * @param {Array.<{
	   *  el: Element | Document | Window,
	   *  handler: Function,
	   *  type: String,
	   *  options?: Object
	   * }>} eventList - List of event maps
	   */
	  addEvents(eventList) {
	    for (const obj of eventList) {
	      if (obj.options === undefined) {
	        obj.options = {};
	      }
	      if (typeof obj.el.addEventListener === 'function') {
	        obj.el.addEventListener(obj.type, obj.handler, obj.options);
	      } else if (obj.el.toString() === '[object MediaQueryList]' && typeof obj.el.addListener === 'function') {
	        obj.el.addListener(obj.handler); // for Safari <14
	      }
	    }
	  },

	  /**
	   * Iterate over list to remove event listeners
	   * @param {array} eventList - List of event maps
	   */
	  removeEvents(eventList) {
	    for (const obj of eventList) {
	      if (typeof obj.el.removeEventListener === 'function') {
	        obj.el.removeEventListener(obj.type, obj.handler);
	      } else if (obj.el.toString() === '[object MediaQueryList]' && typeof obj.el.removeListener === 'function') {
	        obj.el.removeListener(obj.handler); // for Safari <14
	      }
	    }
	  },

	  /**
	   * Tears down each in a list of mwf component instances
	   * @param {Array} componentList an array of mwf component instance
	   */
	  tearDownComponentList(componentList) {
	    if (Array.isArray(componentList)) {
	      let component;
	      while (componentList.length > 0) {
	        component = componentList.pop();
	        if (typeof component.remove === 'function') {
	          component.remove();
	        }
	      }
	    }
	  }
	};

	const selectors = ['input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'a[href]', 'button:not([disabled])', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];
	const tabSelectors = [...selectors, '[tabindex]:not([tabindex^="-"]):not([disabled])'];
	const focusSelectors = [...selectors, '[tabindex]:not([disabled])'];
	const HelpersUtil = {
	  /**
	   * Returns array of tabbable elements
	   * @param {HTMLElement} node container to search, default is document
	   * @returns {Array} returns elements that can be tabbed to using the keyboard
	   */
	  getTabbableElements(node) {
	    if (node === void 0) {
	      node = document;
	    }
	    return Array.from(node.querySelectorAll(tabSelectors.join(', ')));
	  },
	  /**
	   * Checks if a node is a tabbable element
	   * @param {HTMLElement} node the node to compare
	   * @returns {boolean} returns true or false depending on whether the node is considered tabbable or not
	   */
	  isElementTabbable(node) {
	    return node.matches(tabSelectors.join(', '));
	  },
	  getUid() {
	    // Convert random number to base 36 (numbers + letters),
	    // and grab the first 9 characters after the decimal.
	    return Math.random().toString(36).slice(2, 9);
	  },
	  /**
	   * Returns array of focusable elements
	   * @param {HTMLElement} node container to search, default is document
	   * @returns {Array} returns elements that can receive focus
	   */
	  getFocusableElements(node) {
	    if (node === void 0) {
	      node = document;
	    }
	    return Array.from(node.querySelectorAll(focusSelectors.join(', ')));
	  },
	  /**
	   * Returns outer height of element, includes element offsetHeight
	   * @param {HTMLElement}       node container to search
	   * @param {object}     options
	   * @param {string[]}   options.cssSelectors array of css properties
	   * @example
	   *   const options = { cssSelectors: ['margin', 'padding'] };
	   *   const options = { cssSelectors: ['marginTop'] };
	   * @returns {number}   returns height value
	   */
	  getElementOuterHeight(node, options) {
	    if (options === void 0) {
	      options = null;
	    }
	    const computedNodeStyles = getComputedStyle(node);
	    if (!options) {
	      return computedNodeStyles.offsetHeight;
	    }
	    let outerHeight = node.offsetHeight;
	    options.cssSelectors.forEach(selector => {
	      // if no values are specified, calculate spacing for the top and bottom
	      if (!selector.toLowerCase().includes('top') && !selector.toLowerCase().includes('bottom')) {
	        outerHeight += parseInt(computedNodeStyles[selector + 'Top'], 10) + parseInt(computedNodeStyles[selector + 'Bottom'], 10);
	      } else if (selector.values.length > 0) {
	        outerHeight += parseInt(computedNodeStyles[selector], 10);
	      }
	    });
	    return outerHeight;
	  },
	  /**
	   * Returns outer width of element, includes element offsetWidth
	   * @param {HTMLElement}       node container to search
	   * @param {object}     options
	   * @param {string[]}   options.cssSelectors array of css properties
	   * @example
	   *   const options = { cssSelectors: ['margin', 'padding'] };
	   *   const options = { cssSelectors: ['marginLeft'] };
	   * @returns {number}   returns width value
	   */
	  getElementOuterWidth(node, options) {
	    if (options === void 0) {
	      options = null;
	    }
	    const computedNodeStyles = getComputedStyle(node);
	    if (!options) {
	      return computedNodeStyles.offsetWidth;
	    }
	    let outerWidth = node.offsetWidth;
	    options.cssSelectors.forEach(selector => {
	      // if no values are specifed, calculate spacing for the left and right
	      if (!selector.toLowerCase().includes('left') && !selector.toLowerCase().includes('right')) {
	        outerWidth += parseInt(computedNodeStyles[selector + 'Left'], 10) + parseInt(computedNodeStyles[selector + 'Right'], 10);
	      } else if (selector.values.length > 0) {
	        outerWidth += parseInt(computedNodeStyles[selector], 10);
	      }
	    });
	    return outerWidth;
	  },
	  /**
	   * Returns the value of the data-target attribute or null
	   * @param {HTMLElement} element element with the data-target attribute
	   * @returns {HTMLElement} returns the value of the data-target attribute or null
	   */
	  getSelectorFromElement(element) {
	    try {
	      let selector = element.getAttribute('data-target');
	      if (!selector || selector === '#') {
	        const hrefAttr = element.getAttribute('href');
	        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
	      }
	      return selector;
	    } catch {
	      return null;
	    }
	  },
	  /**
	   * Gets the offset height of the element
	   * @param {HTMLElement} element the element
	   * @returns {number} returns the offset height
	   */
	  reflow(element) {
	    return element.offsetHeight;
	  },
	  /**
	   * Gets the full height of the document
	   * May be a little dated but this seems to be an established approach
	   * https://javascript.info/size-and-scroll-window#width-height-of-the-document
	   * @returns {number} the full height of the document
	   */
	  getDocumentHeight() {
	    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
	  }
	};

	const ColorUtil = {
	  /**
	   * Calculates the YIQ of the color
	   * @param {object} rgb The RGB notation of the color
	   * @returns {number}
	   */
	  getYiq(_ref) {
	    let {
	      r,
	      g,
	      b
	    } = _ref;
	    return (r * 299 + g * 587 + b * 114) / 1000;
	  },
	  /**
	   * Gets the RGB object notation for a string
	   * @param {string} str a string representing a css rgb value
	   * @returns {object} an object for rgb notation
	   */
	  getRGB(str) {
	    const match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d\.\d?)\))?/);
	    return match ? {
	      r: match[1],
	      g: match[2],
	      b: match[3]
	    } : {};
	  }
	};

	// https://keycode.info/table-of-all-keycodes

	const KeyboardUtil = {
	  keyCodes: {
	    ARROW_DOWN: 40,
	    ARROW_LEFT: 37,
	    ARROW_RIGHT: 39,
	    ARROW_UP: 38,
	    BACKSPACE: 8,
	    CLEAR: 12,
	    END: 35,
	    ENTER: 13,
	    ESC: 27,
	    HOME: 36,
	    PAGE_DOWN: 34,
	    PAGE_UP: 33,
	    SPACE: 32,
	    TAB: 9
	  },
	  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
	  keys: {
	    ARROW_DOWN: 'ArrowDown',
	    ARROW_LEFT: 'ArrowLeft',
	    ARROW_RIGHT: 'ArrowRight',
	    ARROW_UP: 'ArrowUp',
	    BACKSPACE: 'Backspace',
	    CLEAR: 'Clear',
	    END: 'End',
	    ENTER: 'Enter',
	    ESC: 'Escape',
	    HOME: 'Home',
	    PAGE_DOWN: 'PageDown',
	    PAGE_UP: 'PageUp',
	    SPACE: ' ',
	    TAB: 'Tab'
	  },
	  getKeyCode(e) {
	    return e.which || e.keyCode || 0;
	  }
	};

	const StringUtil = {
	  /**
	   * Interpolate a string.
	   * @param {string} template - The template string to interpolate, with keys in the format %{key}.
	   * @param {object} data - An object containing the keys and values to replace in the template.
	   * @returns {string} - The interpolated string.
	   */
	  interpolateString(template, data) {
	    return template.replace(/%{(\w+)}/g, (match, key) => {
	      if (Object.prototype.hasOwnProperty.call(data, key)) {
	        return data[key];
	      }

	      // %{key} not found, show a warning in the console and return an empty string
	      // eslint-disable-next-line no-console
	      console.warn(`Template error, %{${key}} not found:`, template);
	      return '';
	    });
	  }
	};

	const EventName$t = {
	  ON_REMOVE: 'onRemove'
	};
	const focusControls = [];

	/**
	 * Class representing Focus Controls.
	 * Solve for Firefox bug where following on-page anchor links loses focus:
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=308064
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=277178
	 */
	class FocusControls {
	  /**
	   * Create a FocusControls instance
	   * @param {Object} opts - The focus control options.
	   * @param {HTMLElement} opts.el - The anchor element node, must have href attribute with fragment identifier.
	   */
	  constructor(opts) {
	    this.el = opts.el;
	    this.target = document.querySelector(this.el.getAttribute('href'));
	    this.events = [{
	      el: this.el,
	      type: 'click',
	      handler: e => {
	        this.onClick(e);
	      }
	    }];

	    // Add event handlers.
	    InitializationUtil.addEvents(this.events);
	    focusControls.push(this);
	  }

	  /**
	   * Click event.
	   * @param {Event} e - The event object.
	   */
	  onClick(e) {
	    e.preventDefault();
	    // removes focus if target element is already focused (for voiceover on mobile)
	    if (document.activeElement === this.target) {
	      document.activeElement.blur();
	    }
	    this.target.focus();
	    this.target.scrollIntoView();
	  }

	  /**
	   * Remove the focus controls and events.
	   */
	  remove() {
	    // Remove event handlers
	    InitializationUtil.removeEvents(this.events);

	    // Remove this focus controls reference from array of instances
	    const index = focusControls.indexOf(this);
	    focusControls.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$t.ON_REMOVE] = new CustomEvent(EventName$t.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$t.ON_REMOVE]);
	  }

	  /**
	   * Get an array of focus controls instances.
	   * @returns {Object[]} Array of focus controls instances.
	   */
	  static getInstances() {
	    return focusControls;
	  }
	}

	const TRANSITION_END = 'transitionend';

	/**
	 * Gets the transition duration from an element's styles
	 * @param {HTMLElement} element - element
	 * @returns {number} - transition duration in milliseconds
	 */
	const getTransitionDurationFromElement = element => {
	  const MILLISECONDS_MULTIPLIER = 1000;
	  if (!element) {
	    return 0;
	  }

	  // Get transition-duration of the element
	  let transitionDuration = getComputedStyle(element)['transition-duration'];
	  let transitionDelay = getComputedStyle(element)['transition-delay'];
	  const floatTransitionDuration = parseFloat(transitionDuration);
	  const floatTransitionDelay = parseFloat(transitionDelay);

	  // Return 0 if element or transition duration is not found
	  if (!floatTransitionDuration && !floatTransitionDelay) {
	    return 0;
	  }

	  // If multiple durations are defined, take the first
	  transitionDuration = transitionDuration.split(',')[0];
	  transitionDelay = transitionDelay.split(',')[0];
	  return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	};

	/**
	 * Dispatches a transition-end event.
	 * @param {HTMLElement} element - element on which to dispatch event
	 */
	const triggerTransitionEnd = element => {
	  element.dispatchEvent(new Event(TRANSITION_END));
	};

	/**
	 * Ensures transition-end is triggered on an element.
	 * @param {HTMLElement} element - element on which transition occurs
	 * @param {number} duration - transition duration in milliseconds
	 */
	const emulateTransitionEnd = function (element, duration) {
	  if (duration === void 0) {
	    duration = 0;
	  }
	  let called = false;
	  const durationPadding = 5;
	  const emulatedDuration = duration + durationPadding;
	  function listener() {
	    called = true;
	    element.removeEventListener(TRANSITION_END, listener);
	  }
	  element.addEventListener(TRANSITION_END, listener);
	  setTimeout(() => {
	    if (!called) {
	      triggerTransitionEnd(element);
	    }
	  }, emulatedDuration);
	};
	var TransitionUtil = {
	  TRANSITION_END,
	  getTransitionDurationFromElement,
	  triggerTransitionEnd,
	  emulateTransitionEnd
	};

	const Util = {
	  ...DetectionUtil,
	  ...HelpersUtil,
	  ...InitializationUtil,
	  ...ColorUtil,
	  ...KeyboardUtil,
	  ...StringUtil,
	  FocusControls,
	  ...TransitionUtil
	};

	const instances$9 = [];
	const Selector$t = {
	  DATA_MOUNT: '.alert-dismissible, [data-mount="alert-dismissible"]',
	  DISMISS: '[data-dismiss="alert"]'
	};
	const EventName$s = {
	  CLOSE: 'onClose',
	  CLOSED: 'onClosed',
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate'
	};
	const ClassName$l = {
	  FADE: 'fade',
	  SHOW: 'show'
	};
	function _removeElement(element) {
	  element.classList.remove(ClassName$l.SHOW);
	  if (!element.classList.contains(ClassName$l.FADE)) {
	    _destroyElement.call(this, element);
	    return;
	  }
	  const transitionDuration = Util.getTransitionDurationFromElement(element);
	  element.addEventListener(Util.TRANSITION_END, event => _destroyElement.call(this, element, event), {
	    once: true
	  });
	  Util.emulateTransitionEnd(element, transitionDuration);
	}
	function _destroyElement(element) {
	  // Create and dispatch custom event
	  this[EventName$s.CLOSED] = new CustomEvent(EventName$s.CLOSED);
	  element.dispatchEvent(this[EventName$s.CLOSED]);
	  element.remove();
	}
	class Alert {
	  /**
	   * Create an Alert instance
	   * @param {Object} opts - the Alert options
	   * @param {HTMLElement} opts.el - the Alert container element
	   */
	  constructor(opts) {
	    this.el = opts.el;
	    this.dismiss = this.el.querySelector(Selector$t.DISMISS);

	    // Add event handlers
	    if (this.dismiss) {
	      this.events = [{
	        el: this.dismiss,
	        type: 'click',
	        handler: () => {
	          this.close();
	        }
	      }];
	      Util.addEvents(this.events);
	    }
	    instances$9.push(this);
	  }

	  /**
	   * Perform a close action
	   */
	  close() {
	    const rootElement = this.el;

	    // Create and dispatch custom event
	    this[EventName$s.CLOSE] = new CustomEvent(EventName$s.CLOSE, {
	      cancelable: true
	    });
	    rootElement.dispatchEvent(this[EventName$s.CLOSE]);
	    if (this[EventName$s.CLOSE].defaultPrevented) {
	      return;
	    }
	    _removeElement.call(this, rootElement);
	  }

	  /**
	   * Update instance. Added for API consistency
	   */
	  update() {
	    // Create and dispatch custom event
	    this[EventName$s.ON_UPDATE] = new CustomEvent(EventName$s.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$s.ON_UPDATE]);
	  }

	  /**
	   * Remove the instance
	   */
	  remove() {
	    Util.removeEvents(this.events);
	    const index = instances$9.indexOf(this);
	    instances$9.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$s.ON_REMOVE] = new CustomEvent(EventName$s.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$s.ON_REMOVE]);
	  }

	  /**
	   * Get alert instances.
	   * @returns {Object[]} An array of alert instances
	   */
	  static getInstances() {
	    return instances$9;
	  }
	}

	const Config = {
	  DEFAULT_SEARCH_RESULT: 10
	};
	const autocompleteInstances = [];
	const Selector$s = {
	  RESULT_LIST: '.result-list',
	  RESULTS_CONTAINER: '.search-results-container',
	  SEARCH_INPUT: '.search-input',
	  RESULT_STATUS: '.result-status',
	  LIST_FIRST_CHILD: 'li:first-child',
	  LIST_SELECTED: 'li.selected'
	};
	const Messages = {
	  // default message is set, if custom message not set.
	  RESULTS_TEMPLATE_MANY: '%{numResults} results are available, use up and down arrow keys to navigate',
	  RESULTS_TEMPLATE_ONE: '%{numResults} result is available, use up and down arrow keys to navigate',
	  NO_RESULTS: 'No results are available'
	};
	const Errors = {
	  DATA_TYPE_ERROR: 'Data must be of type Array[<string>] or Array[{value: <string>}]'
	};
	const ClassName$k = {
	  ACTIVE: 'active',
	  SELECTED: 'selected'
	};
	const EventName$r = {
	  ON_CLOSE: 'onClose',
	  ON_OPEN: 'onOpen',
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove'
	};

	/*
	 * filter the data.
	 */
	function _filterData(data) {
	  const re = _getSearchPattern.bind(this)();
	  return data.filter(item => {
	    if (typeof item === 'object' && re.test(item.value) || typeof item === 'string' && re.test(item)) {
	      return item;
	    }
	    return false;
	  });
	}

	/*
	 * fetch the data to li tag.
	 */
	function _fetchData(data) {
	  // data is an array of results
	  const searchData = data.slice(0, Config.DEFAULT_SEARCH_RESULT);
	  let targetHtmlContainer = '';
	  let str = null;
	  let resultsMessage;

	  // if the length of searchData is 0, there are no results
	  if (searchData.length > 0 && this.searchInput.value !== '') {
	    searchData.forEach(item => {
	      if (typeof item === 'string') {
	        str = item;
	      } else if (typeof item === 'object') {
	        str = item.value;
	      }
	      targetHtmlContainer += '<li class="result"  role="option" tabindex="-1">' + _highlightMatch.bind(this)(str) + '</li>';
	    });
	    resultsMessage = Util.interpolateString(searchData.length > 1 ? this.resultsAvailableTemplateMany : this.resultsAvailableTemplateOne, {
	      numResults: searchData.length
	    });
	    if (!this.shown) {
	      this.open();
	    }
	  } else {
	    this.close();
	    resultsMessage = this.noResultsMsg;
	  }
	  this.target.innerHTML = targetHtmlContainer;

	  /* Sets sr_only message for a11y */
	  this.container.querySelector(Selector$s.RESULT_STATUS).textContent = resultsMessage;
	}

	/*
	 * populates the selected matching values
	 */
	function _populateSelect() {
	  let filteredSearchData = this.suggestedData;
	  if (typeof this.suggestedData === 'object') {
	    if (this.filter === 'true') {
	      filteredSearchData = _filterData.bind(this)(filteredSearchData);
	    }
	    _fetchData.bind(this)(filteredSearchData);
	  }
	}

	/**
	  @func _clearSuggestionsMenu
	  @desc Clears the results from the suggestions menu.
	  @this AutoComplete
	*/
	function _clearSuggestionsMenu() {
	  this.target.innerHTML = '';
	  this.container.querySelector(Selector$s.RESULT_STATUS).textContent = '';
	}

	/**
	  @func _getSearchPattern
	  @desc Returns a new regular expression object from the internal searchInput property.
	  @returns {RegExp} Regular expression object with the autocomplete's searchInput value as the source.
	  @this AutoComplete
	*/
	function _getSearchPattern() {
	  /* replacing instances of regex characters with string literals to disable use of regular expressions in search input */
	  const re = /([()*+.?\\])/gi;
	  const sanitizedInput = this.searchInput.value.replace(re, '\\$&');
	  /* Second parameter flags - 'g': global (matches multiple instances in string), 'i': case insensitive */
	  /* \\b used to only begin match at start of a word (rather than matching a character in the middle of a word) */
	  /* \\s used to allow matching of accepted special characters (e.g. &) when in between words */
	  return new RegExp('\\b\\s?' + sanitizedInput, 'gi');
	}

	/**
	  @func _setSuggestionItemSelectedStatus
	  @desc Given a string, returns the same string with a <strong> tag encapsulating the matching substring.
	  @param {string} str - String used to create the regex for matching.
	  @returns {string} String with a <strong> tag encapsulating matched sub string.
	  @this AutoComplete
	*/
	function _highlightMatch(str) {
	  const re = _getSearchPattern.bind(this)();
	  return str.replace(re, '<strong>$&</strong>');
	}

	/**
	  @func _removeSuggestionItemSelectedStatus
	  @desc Removes the HTML classes and attributes used to markup the "selected" status for suggestions (li elements) displayed in the auto suggestion menu (ul element, this.target).
	  @param {HTMLElement} element - HTML element that should remove classes/attributes for showing "selected" status
	*/
	function _removeSuggestionItemSelectedStatus(element) {
	  element.classList.remove(ClassName$k.SELECTED);
	  element.removeAttribute('aria-selected');
	}

	/**
	  @func _setSuggestionItemSelectedStatus
	  @desc Sets the HTML classes and attributes used to markup the "selected" status for suggestions (li elements) displayed in the auto suggestion menu (ul element, this.target).
	  @param {HTMLElement} element - HTML element that should receive classes/attributes for showing "selected" status
	*/
	function _setSuggestionItemSelectedStatus(element) {
	  element.classList.add(ClassName$k.SELECTED);
	  element.setAttribute('aria-selected', true);
	  element.focus();
	}

	/**
	  @func _verifyData
	  @desc Verifies that the passed in parameter is either Array[<string>] or Array[{value: <string>}]
	  @param {Array} data - Data to verify.
	  @returns {boolean} Whether the data has the correct structure.
	*/
	function _verifyData(data) {
	  if (Array.isArray(data) && data.every(entry => typeof entry === 'string' || typeof entry === 'object' && Object.keys(entry).includes('value') && typeof entry.value === 'string')) {
	    return true;
	  }
	  return false;
	}

	/***********/
	/* EVENTS */
	/***********/

	/*
	 * close suggested list.
	 */
	function _onDocumentClick(e) {
	  if (e.target !== this.searchInput && e.target !== this.searchResultsContainer) {
	    const _target = this.target;
	    _target.classList.remove(ClassName$k.ACTIVE);
	    this.searchInput.setAttribute('aria-expanded', false);
	  }
	}

	/*
	 * after entering the data,populating the value through populateSelect function
	 * @param {object} e - present event
	 */
	function _onSearchInputInput(e) {
	  if (this.searchInput.value === '') {
	    _clearSuggestionsMenu.bind(this)(e);
	    if (this.shown) {
	      this.close();
	    }
	  } else {
	    _populateSelect.bind(this)(e);
	  }
	}

	/**
	  @func _onSearchInputKeyDown
	  @desc Handles keydown event for arrow down.
	  @param {Event} e - Keydown event attached to this.searchInput
	  @this AutoComplete
	*/
	function _onSearchInputKeyDown(e) {
	  const suggestionMenu = this.target;
	  if (e.keyCode === Util.keyCodes.ARROW_DOWN && suggestionMenu.children.length > 0) {
	    this.open();
	    _setSuggestionItemSelectedStatus(suggestionMenu.querySelector(Selector$s.LIST_FIRST_CHILD));
	  }
	  if (e.keyCode === Util.keyCodes.TAB && this.shown) {
	    this.close();
	  }
	}

	/**
	  @func _onSearchInputFocus
	  @desc Sets the cursor position to the end of the text when focus is set to the input element
	  @this AutoComplete
	*/
	function _onSearchInputFocus() {
	  /* Requires 2 parameters */
	  this.searchInput.setSelectionRange(this.searchInput.value.length, this.searchInput.value.length);
	}

	/**
	  @func _onSuggestionMenuKeyDown
	  @desc Handles keydown events for backspace, arrow right, and character input.
	Is attached to this.target (ul with suggestions that appears underneath input) during initializaiton.
	  @param {Event} e
	  @this AutoComplete
	*/
	function _onSuggestionMenuKeyDown(e) {
	  if (this.target.classList.contains(ClassName$k.ACTIVE)) {
	    const _target = this.target;
	    const selected = _target.querySelector(Selector$s.LIST_SELECTED);
	    let prevSibling;
	    switch (e.keyCode) {
	      case Util.keyCodes.ARROW_UP:
	        {
	          if (selected) {
	            prevSibling = selected.previousElementSibling;
	            _removeSuggestionItemSelectedStatus(selected);
	            if (prevSibling) {
	              _setSuggestionItemSelectedStatus(prevSibling);
	            } else {
	              this.searchInput.focus();
	            }
	          }
	          break;
	        }
	      case Util.keyCodes.ARROW_DOWN:
	        {
	          if (_target.querySelector('li') && !_target.querySelector(Selector$s.LIST_SELECTED)) {
	            const firstLiElement = _target.querySelector(Selector$s.LIST_FIRST_CHILD);
	            _setSuggestionItemSelectedStatus(firstLiElement);
	          } else {
	            let nextSibling = null;
	            nextSibling = selected.nextElementSibling;
	            if (nextSibling) {
	              _removeSuggestionItemSelectedStatus(selected);
	              _setSuggestionItemSelectedStatus(nextSibling);
	            }
	          }
	          break;
	        }
	      case Util.keyCodes.ARROW_RIGHT:
	      case Util.keyCodes.BACKSPACE:
	        {
	          this.searchInput.focus();
	          break;
	        }
	      case Util.keyCodes.ENTER:
	        {
	          if (selected) {
	            this.searchInput.value = selected.textContent;
	            _clearSuggestionsMenu.bind(this)();
	            this.searchInput.focus();
	            this.close();
	            e.preventDefault();
	          }
	          break;
	        }
	      case Util.keyCodes.ESC:
	        {
	          this.searchInput.value = '';
	          this.searchInput.focus();
	          _clearSuggestionsMenu.bind(this)();
	          break;
	        }
	      case Util.keyCodes.TAB:
	        {
	          this.close();
	          this.searchInput.focus();
	          _removeSuggestionItemSelectedStatus(selected);
	          break;
	        }
	      default:
	        {
	          if (e.key.length === 1) {
	            this.searchInput.focus();
	          }
	          break;
	        }
	    }
	  }
	}

	/*
	 * fetch the suggested data from drop down to the autocomplete
	 * @param {object} e - present event
	 */
	function _onSuggestionMenuMouseUp(e) {
	  this.searchInput.value = e.target.textContent;
	  _clearSuggestionsMenu.bind(this)();
	  this.searchInput.focus();
	  this.close();
	  e.stopPropagation();
	}

	/*
	 * Class representing a Autocomplete.
	 */
	class AutoComplete {
	  /**
	   * Create an Autocomplete instance
	   @param {Object} opts - The autocomplete options
	   @param {Array<string | {value: string}>} opts.data - Array of strings that will be matched based on user input
	   @param {HTMLElement} opts.target - The autocomplete DOM node
	   @param {boolean} [opts.filter] - whether to dynamically filter options
	   @param {string} [opts.multipleResultsMsg] - The message for screen readers when multiple results are available
	   @param {string} [opts.noResultsMsg] - The message for screen readers when no results are available
	   @param {string} [opts.oneResultMsg] - The message for screen readers when one result is available
	   @throws {TypeError} Will throw a TypeError when opts.data is not of type Array[<string>] or Array[{value: <string>}]
	   */
	  constructor(opts) {
	    this.container = opts.target;
	    // defaults to a sr message for en locales if none is provided
	    this.resultsAvailableTemplateMany = opts.multipleResultsMsg || Messages.RESULTS_TEMPLATE_MANY;
	    this.resultsAvailableTemplateOne = opts.oneResultMsg || Messages.RESULTS_TEMPLATE_ONE;
	    this.noResultsMsg = opts.noResultsMsg || Messages.NO_RESULTS;
	    this.filter = opts.filter || opts.target.getAttribute('data-filter') || true;
	    if (_verifyData(opts.data)) {
	      this.suggestedData = opts.data;
	    } else {
	      throw new TypeError(Errors.DATA_TYPE_ERROR);
	    }
	    this.target = opts.target.querySelector(Selector$s.RESULT_LIST);
	    this.searchResultsContainer = this.container.querySelector(Selector$s.RESULTS_CONTAINER);
	    this.searchInput = this.container.querySelector(Selector$s.SEARCH_INPUT);
	    this.shown = false;
	    autocompleteInstances.push(this);

	    // Add event handlers.
	    this.events = [{
	      el: document,
	      type: 'click',
	      handler: _onDocumentClick.bind(this)
	    }, {
	      el: this.searchInput,
	      type: 'input',
	      handler: _onSearchInputInput.bind(this)
	    }, {
	      el: this.searchInput,
	      type: 'keydown',
	      handler: _onSearchInputKeyDown.bind(this)
	    }, {
	      el: this.searchInput,
	      type: 'focus',
	      handler: _onSearchInputFocus.bind(this)
	    }, {
	      el: this.target,
	      type: 'mouseup',
	      handler: _onSuggestionMenuMouseUp.bind(this)
	    }, {
	      el: this.target,
	      type: 'keydown',
	      handler: _onSuggestionMenuKeyDown.bind(this)
	    }];
	    Util.addEvents(this.events);
	  }

	  /*
	   * Get an array of autocomplete instances.
	   * @returns {Object[]} Array of search instances.
	   */
	  static getInstances() {
	    return autocompleteInstances;
	  }

	  /**
	  @func open
	  @desc Opens the suggestions menu.
	  @this AutoComplete
	  */
	  open() {
	    // Create and dispatch custom event
	    this[EventName$r.ON_OPEN] = new CustomEvent(EventName$r.ON_OPEN, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.container.dispatchEvent(this[EventName$r.ON_OPEN]);
	    if (this[EventName$r.ON_OPEN].defaultPrevented) {
	      return;
	    }
	    this.shown = true;
	    this.target.classList.add(ClassName$k.ACTIVE);
	    this.searchInput.setAttribute('aria-expanded', true);
	  }

	  /**
	  @func close
	  @desc Closes the suggestions menu.
	  @this AutoComplete
	  */
	  close() {
	    // Create and dispatch custom event
	    this[EventName$r.ON_CLOSE] = new CustomEvent(EventName$r.ON_CLOSE, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.container.dispatchEvent(this[EventName$r.ON_CLOSE]);
	    if (this[EventName$r.ON_CLOSE].defaultPrevented) {
	      return;
	    }
	    this.shown = false;
	    this.target.classList.remove(ClassName$k.ACTIVE);
	    this.searchInput.setAttribute('aria-expanded', false);
	  }

	  /**
	  @func update
	  @desc Updates the value of this.searchInput with given string.
	  @param {string} value - String to set this.searchInput
	  @this AutoComplete
	  */
	  update(value) {
	    // Changed if(value) to if(typeof value === 'string') to allow empty string values.
	    if (typeof value === 'string') {
	      this.searchInput.value = value;
	      if (value) {
	        _populateSelect.bind(this)();

	        // Create and dispatch custom event
	        this[EventName$r.ON_UPDATE] = new CustomEvent(EventName$r.ON_UPDATE, {
	          bubbles: true
	        });
	        this.container.dispatchEvent(this[EventName$r.ON_UPDATE]);

	        // Is empty string. Menu should be closed.
	      } else {
	        this.close();
	      }
	    }
	  }

	  /**
	  @func updateDataSource
	  @desc Closes the suggestions menu.
	  @param {Array} data - Data to set this.suggestedData
	  @this AutoComplete
	  @throws {TypeError} Will throw a TypeError when opts.data is not of type Array[<string>] or Array[{value: <string>}]
	  */
	  updateDataSource(data) {
	    if (_verifyData(data)) {
	      this.suggestedData = data;
	      _populateSelect.bind(this)();
	    } else {
	      throw new TypeError(Errors.DATA_TYPE_ERROR);
	    }
	  }

	  /**
	   * Remove all event listeners.
	   */
	  remove() {
	    Util.removeEvents(this.events);

	    // Remove this autocomplete reference from array of instances
	    const index = autocompleteInstances.indexOf(this);
	    autocompleteInstances.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$r.ON_REMOVE] = new CustomEvent(EventName$r.ON_REMOVE, {
	      bubbles: true
	    });
	    this.container.dispatchEvent(this[EventName$r.ON_REMOVE]);
	  }
	}

	/* eslint-disable no-undefined,no-param-reassign,no-shadow */

	/**
	 * Throttle execution of a function. Especially useful for rate limiting
	 * execution of handlers on events like resize and scroll.
	 *
	 * @param {number} delay -                  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher)
	 *                                            are most useful.
	 * @param {Function} callback -               A function to be executed after delay milliseconds. The `this` context and all arguments are passed through,
	 *                                            as-is, to `callback` when the throttled-function is executed.
	 * @param {object} [options] -              An object to configure options.
	 * @param {boolean} [options.noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds
	 *                                            while the throttled-function is being called. If noTrailing is false or unspecified, callback will be executed
	 *                                            one final time after the last throttled-function call. (After the throttled-function has not been called for
	 *                                            `delay` milliseconds, the internal counter is reset).
	 * @param {boolean} [options.noLeading] -   Optional, defaults to false. If noLeading is false, the first throttled-function call will execute callback
	 *                                            immediately. If noLeading is true, the first the callback execution will be skipped. It should be noted that
	 *                                            callback will never executed if both noLeading = true and noTrailing = true.
	 * @param {boolean} [options.debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is
	 *                                            false (at end), schedule `callback` to execute after `delay` ms.
	 *
	 * @returns {Function} A new, throttled, function.
	 */
	function throttle(delay, callback, options) {
	  var _ref = options || {},
	    _ref$noTrailing = _ref.noTrailing,
	    noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing,
	    _ref$noLeading = _ref.noLeading,
	    noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading,
	    _ref$debounceMode = _ref.debounceMode,
	    debounceMode = _ref$debounceMode === void 0 ? undefined : _ref$debounceMode;
	  /*
	   * After wrapper has stopped being called, this timeout ensures that
	   * `callback` is executed at the proper times in `throttle` and `end`
	   * debounce modes.
	   */

	  var timeoutID;
	  var cancelled = false; // Keep track of the last time `callback` was executed.

	  var lastExec = 0; // Function to clear existing timeout

	  function clearExistingTimeout() {
	    if (timeoutID) {
	      clearTimeout(timeoutID);
	    }
	  } // Function to cancel next exec

	  function cancel(options) {
	    var _ref2 = options || {},
	      _ref2$upcomingOnly = _ref2.upcomingOnly,
	      upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;
	    clearExistingTimeout();
	    cancelled = !upcomingOnly;
	  }
	  /*
	   * The `wrapper` function encapsulates all of the throttling / debouncing
	   * functionality and when executed will limit the rate at which `callback`
	   * is executed.
	   */

	  function wrapper() {
	    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
	      arguments_[_key] = arguments[_key];
	    }
	    var self = this;
	    var elapsed = Date.now() - lastExec;
	    if (cancelled) {
	      return;
	    } // Execute `callback` and update the `lastExec` timestamp.

	    function exec() {
	      lastExec = Date.now();
	      callback.apply(self, arguments_);
	    }
	    /*
	     * If `debounceMode` is true (at begin) this is used to clear the flag
	     * to allow future `callback` executions.
	     */

	    function clear() {
	      timeoutID = undefined;
	    }
	    if (!noLeading && debounceMode && !timeoutID) {
	      /*
	       * Since `wrapper` is being called for the first time and
	       * `debounceMode` is true (at begin), execute `callback`
	       * and noLeading != true.
	       */
	      exec();
	    }
	    clearExistingTimeout();
	    if (debounceMode === undefined && elapsed > delay) {
	      if (noLeading) {
	        /*
	         * In throttle mode with noLeading, if `delay` time has
	         * been exceeded, update `lastExec` and schedule `callback`
	         * to execute after `delay` ms.
	         */
	        lastExec = Date.now();
	        if (!noTrailing) {
	          timeoutID = setTimeout(debounceMode ? clear : exec, delay);
	        }
	      } else {
	        /*
	         * In throttle mode without noLeading, if `delay` time has been exceeded, execute
	         * `callback`.
	         */
	        exec();
	      }
	    } else if (noTrailing !== true) {
	      /*
	       * In trailing throttle mode, since `delay` time has not been
	       * exceeded, schedule `callback` to execute `delay` ms after most
	       * recent execution.
	       *
	       * If `debounceMode` is true (at begin), schedule `clear` to execute
	       * after `delay` ms.
	       *
	       * If `debounceMode` is false (at end), schedule `callback` to
	       * execute after `delay` ms.
	       */
	      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
	    }
	  }
	  wrapper.cancel = cancel; // Return the wrapper function.

	  return wrapper;
	}

	/* eslint-disable no-undefined */
	/**
	 * Debounce execution of a function. Debouncing, unlike throttling,
	 * guarantees that a function is only executed a single time, either at the
	 * very beginning of a series of calls, or at the very end.
	 *
	 * @param {number} delay -               A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
	 * @param {Function} callback -          A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
	 *                                        to `callback` when the debounced-function is executed.
	 * @param {object} [options] -           An object to configure options.
	 * @param {boolean} [options.atBegin] -  Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
	 *                                        after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
	 *                                        (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
	 *
	 * @returns {Function} A new, debounced function.
	 */

	function debounce(delay, callback, options) {
	  var _ref = options || {},
	    _ref$atBegin = _ref.atBegin,
	    atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;
	  return throttle(delay, callback, {
	    debounceMode: atBegin !== false
	  });
	}

	var id = 0;
	function _classPrivateFieldLooseKey(name) {
	  return "__private_" + id++ + "_" + name;
	}
	function _classPrivateFieldLooseBase(receiver, privateKey) {
	  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
	    throw new TypeError("attempted to use private field on non-instance");
	  }
	  return receiver;
	}

	const Selector$r = {
	  DATA_MOUNT: '[data-mount="sticky"]',
	  SHOW_STUCK: '.sticky-show-stuck',
	  HIDE_STUCK: '.sticky-hide-stuck'
	};
	const ClassName$j = {
	  STICKY: 'sticky',
	  STUCK: 'stuck',
	  GET_HEIGHT: 'get-height',
	  STICKY_TOP: 'sticky-direction-top',
	  STICKY_BOTTOM: 'sticky-direction-bottom'
	};
	const Direction$2 = {
	  TOP: 'top',
	  BOTTOM: 'bottom'
	};
	const EventName$q = {
	  ON_STUCK: 'onSticky',
	  ON_UNSTUCK: 'onStatic',
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove',
	  RESIZE: 'resize'
	};
	const Default$5 = {
	  DIRECTION: 'top',
	  EXTRA_SCROLL_PADDING: 12
	};

	/**
	 * @enum {string}
	 */
	const ObserverBehavior = {
	  ALWAYS: 'always',
	  OFF: 'off',
	  SIZE_AWARE: 'size-aware'
	};
	const stickies = [];

	/**
	 * Private functions.
	 */

	/**
	 * Get the direction of the sticky.
	 * @param {string} str - The string to parse.
	 * @param {string} [defaultValue="top"] - The default value to fallback to.
	 * @returns {string} The direction of the sticky.
	 */
	function _getDirection(str, defaultValue) {
	  if (defaultValue === void 0) {
	    defaultValue = Default$5.DIRECTION;
	  }
	  switch (str) {
	    case 'top':
	    case 'bottom':
	      {
	        return str;
	      }
	    default:
	      {
	        return defaultValue;
	      }
	  }
	}

	/**
	 * Class representing a Sticky element.
	 */
	var _init$3 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
	var _setUp = /*#__PURE__*/_classPrivateFieldLooseKey("setUp");
	var _getObserverBehavior = /*#__PURE__*/_classPrivateFieldLooseKey("getObserverBehavior");
	var _setDirectionalProps = /*#__PURE__*/_classPrivateFieldLooseKey("setDirectionalProps");
	var _calculateHeights = /*#__PURE__*/_classPrivateFieldLooseKey("calculateHeights");
	var _calculateLooseWidth = /*#__PURE__*/_classPrivateFieldLooseKey("calculateLooseWidth");
	var _onStickyChange = /*#__PURE__*/_classPrivateFieldLooseKey("onStickyChange");
	var _createObserver = /*#__PURE__*/_classPrivateFieldLooseKey("createObserver");
	var _setStickyHeight = /*#__PURE__*/_classPrivateFieldLooseKey("setStickyHeight");
	var _setVw = /*#__PURE__*/_classPrivateFieldLooseKey("setVw");
	var _setIsStuck = /*#__PURE__*/_classPrivateFieldLooseKey("setIsStuck");
	var _onResize$1 = /*#__PURE__*/_classPrivateFieldLooseKey("onResize");
	var _updateScrollPadding = /*#__PURE__*/_classPrivateFieldLooseKey("updateScrollPadding");
	var _stickyExceedsAcceptedHeight = /*#__PURE__*/_classPrivateFieldLooseKey("stickyExceedsAcceptedHeight");
	var _setObserverStatus = /*#__PURE__*/_classPrivateFieldLooseKey("setObserverStatus");
	class Sticky {
	  /**
	   * Create a Sticky instance
	   * @param {Object} opts - The Sticky element options.
	   * @param {HTMLElement} opts.el - The Sticky element DOM node.
	   * @param {string} [opts.direction] - Whether the Sticky element sticks to the top when scrolled below a certain point (TOP) or sticks to the bottom when scrolled above a certain point (BOTTOM). If not defined, will attempt to read `data-direction` attribute, then defaults TOP
	   * @param {ObserverBehavior} opts.observerBehavior - the behavior of the intersection observer to toggle stuck/unstuck states
	   * @param {number} [opts.extraScrollPaddingPx] - Extra scroll padding to reduce crowding into sticky bars, defaults to 12px, same as minimal gutters
	   */
	  constructor(opts) {
	    Object.defineProperty(this, _setObserverStatus, {
	      value: _setObserverStatus2
	    });
	    Object.defineProperty(this, _stickyExceedsAcceptedHeight, {
	      value: _stickyExceedsAcceptedHeight2
	    });
	    Object.defineProperty(this, _updateScrollPadding, {
	      value: _updateScrollPadding2
	    });
	    Object.defineProperty(this, _onResize$1, {
	      value: _onResize2
	    });
	    Object.defineProperty(this, _setIsStuck, {
	      value: _setIsStuck2
	    });
	    Object.defineProperty(this, _setVw, {
	      value: _setVw2
	    });
	    Object.defineProperty(this, _setStickyHeight, {
	      value: _setStickyHeight2
	    });
	    Object.defineProperty(this, _createObserver, {
	      value: _createObserver2
	    });
	    Object.defineProperty(this, _onStickyChange, {
	      value: _onStickyChange2
	    });
	    Object.defineProperty(this, _calculateLooseWidth, {
	      value: _calculateLooseWidth2
	    });
	    Object.defineProperty(this, _calculateHeights, {
	      value: _calculateHeights2
	    });
	    Object.defineProperty(this, _setDirectionalProps, {
	      value: _setDirectionalProps2
	    });
	    Object.defineProperty(this, _getObserverBehavior, {
	      value: _getObserverBehavior2
	    });
	    Object.defineProperty(this, _setUp, {
	      value: _setUp2
	    });
	    Object.defineProperty(this, _init$3, {
	      value: _init2$3
	    });
	    this.el = opts.el;
	    this.direction = _getDirection(opts.direction || this.el.dataset.direction);
	    this.extraScrollPaddingPx = typeof opts.extraScrollPaddingPx === 'number' ? opts.extraScrollPaddingPx : Default$5.EXTRA_SCROLL_PADDING;
	    this.enableObserver = true;
	    this.observerBehavior = _classPrivateFieldLooseBase(this, _getObserverBehavior)[_getObserverBehavior](opts.observerBehavior);
	    this.isStuck = false;
	    this.observer = null;
	    this.windowScrollY = window.scrollY; // remove in v3 - deprecated as of v2.1.0
	    this.observedWindowDimensions = {
	      width: window.innerWidth,
	      height: window.innerHeight
	    };
	    this.looseWidth = _classPrivateFieldLooseBase(this, _calculateLooseWidth)[_calculateLooseWidth]();

	    // Add "sticky" class only while initialized to attach style and functionality provided by CSS
	    // Set prior to all height calculations so that styles are applied first
	    this.el.classList.add(ClassName$j.STICKY);
	    _classPrivateFieldLooseBase(this, _setVw)[_setVw]();
	    this.resizeObserver = new ResizeObserver(() => {
	      requestAnimationFrame(() => {
	        const windowDimensions = {
	          width: window.innerWidth,
	          height: window.innerHeight
	        };
	        this.looseWidth = _classPrivateFieldLooseBase(this, _calculateLooseWidth)[_calculateLooseWidth]();

	        // Sticky should maintain "sticky-ness" (observer status) if resize change is not from the window changing size
	        _classPrivateFieldLooseBase(this, _setUp)[_setUp](JSON.stringify(windowDimensions) === JSON.stringify(this.observedWindowDimensions));
	        this.observedWindowDimensions = windowDimensions;
	      });
	    });
	    Array.from(this.el.children).forEach(child => {
	      this.resizeObserver.observe(child);
	    });
	    _classPrivateFieldLooseBase(this, _init$3)[_init$3]();
	    stickies.push(this);
	  }
	  /**
	   * Set the status of the sticky observer,
	   * dependent on configuration and/or height condition
	   */
	  setObserver() {
	    switch (this.observerBehavior) {
	      case ObserverBehavior.OFF:
	        {
	          _classPrivateFieldLooseBase(this, _setObserverStatus)[_setObserverStatus](false);
	          break;
	        }
	      case ObserverBehavior.ALWAYS:
	        {
	          _classPrivateFieldLooseBase(this, _setObserverStatus)[_setObserverStatus](true);
	          break;
	        }
	      default:
	        {
	          if (_classPrivateFieldLooseBase(this, _stickyExceedsAcceptedHeight)[_stickyExceedsAcceptedHeight]()) {
	            _classPrivateFieldLooseBase(this, _setObserverStatus)[_setObserverStatus](false);
	          } else {
	            _classPrivateFieldLooseBase(this, _setObserverStatus)[_setObserverStatus](true);
	          }
	        }
	    }
	  }

	  /**
	   * Set the status (enabled/disabled) of the intersection observer and update the isStuck property
	   * @param {boolean} status The status to set
	   */

	  /**
	   * Get the height of the sticky element when stuck
	   * @returns {number} Stuck height in pixels
	   */
	  getStuckHeight() {
	    return this.stuckHeight;
	  }

	  /**
	   * Updates key aspects the instance
	   * @param {Object} opts - The Sticky options.
	   * @param {string} [opts.direction] - Whether the Sticky element sticks to the top when scrolled below a certain point (TOP) or sticks to the bottom when scrolled above a certain point (BOTTOM). If not defined, will maintain current setting
	   * @param {number} [opts.extraScrollPaddingPx] - Extra scroll padding to reduce crowding into sticky bars. If not define, will maintain current setting
	   * @param {ObserverBehavior} [opts.observerBehavior] - the behavior of the intersection observer to toggle stuck/unstuck states
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    Util.removeEvents(this.events);
	    if (opts.direction) {
	      this.direction = _getDirection(opts.direction);
	    }
	    if (opts.extraScrollPaddingPx && typeof opts.extraScrollPaddingPx === 'number') {
	      this.extraScrollPaddingPx = opts.extraScrollPaddingPx;
	    }
	    if (opts.observerBehavior) {
	      this.observerBehavior = _classPrivateFieldLooseBase(this, _getObserverBehavior)[_getObserverBehavior](opts.observerBehavior);
	    }
	    _classPrivateFieldLooseBase(this, _init$3)[_init$3]();

	    // Create and dispatch custom event
	    this[EventName$q.ON_UPDATE] = new CustomEvent(EventName$q.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$q.ON_UPDATE]);
	  }

	  /**
	   * Remove the sticky.
	   */
	  remove() {
	    Util.removeEvents(this.events);
	    this.resizeObserver.disconnect();

	    // remove the attribute from the element
	    this.el.classList.remove(ClassName$j.STICKY);
	    _classPrivateFieldLooseBase(this, _updateScrollPadding)[_updateScrollPadding](true);
	    _classPrivateFieldLooseBase(this, _setStickyHeight)[_setStickyHeight](true);

	    // disconnect observer
	    this.observer.disconnect();

	    // remove this sticky reference from array of instances
	    const index = stickies.indexOf(this);
	    stickies.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$q.ON_REMOVE] = new CustomEvent(EventName$q.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$q.ON_REMOVE]);
	  }

	  /**
	   * Get an array of sticky instances.
	   * @returns {Object[]} Array of sticky instances.
	   */
	  static getInstances() {
	    return stickies;
	  }
	}
	function _init2$3() {
	  _classPrivateFieldLooseBase(this, _setDirectionalProps)[_setDirectionalProps]();
	  _classPrivateFieldLooseBase(this, _setUp)[_setUp]();

	  // Add event handlers
	  this.events = [{
	    el: window,
	    type: EventName$q.RESIZE,
	    handler: throttle(200, _classPrivateFieldLooseBase(this, _onResize$1)[_onResize$1].bind(this))
	  }];
	  Util.addEvents(this.events);
	}
	function _setUp2(keepObserverStatus) {
	  const hasHeightChange = _classPrivateFieldLooseBase(this, _calculateHeights)[_calculateHeights]();

	  // A change in Sticky height requires a new IntersectionObserver
	  // Otherwise, only check IntersectionObserver status and update if needed
	  if (hasHeightChange) {
	    _classPrivateFieldLooseBase(this, _createObserver)[_createObserver]();
	    if (keepObserverStatus) {
	      _classPrivateFieldLooseBase(this, _setObserverStatus)[_setObserverStatus](this.enableObserver);
	    } else {
	      this.setObserver();
	    }
	  } else if (keepObserverStatus) {
	    _classPrivateFieldLooseBase(this, _setObserverStatus)[_setObserverStatus](this.enableObserver);
	  } else {
	    this.setObserver();
	  }
	}
	function _getObserverBehavior2(option) {
	  const isValid = behavior => Object.values(ObserverBehavior).includes(behavior);
	  if (option && isValid(option)) {
	    return option;
	  }
	  if (isValid(this.el.dataset.observerBehavior)) {
	    return this.el.dataset.observerBehavior;
	  }
	  return ObserverBehavior.SIZE_AWARE;
	}
	function _setDirectionalProps2() {
	  if (this.direction === Direction$2.BOTTOM) {
	    this.el.classList.add(ClassName$j.STICKY_BOTTOM);
	    this.el.classList.remove(ClassName$j.STICKY_TOP);
	  } else {
	    // Assume direction is Direction.TOP
	    this.el.classList.add(ClassName$j.STICKY_TOP);
	    this.el.classList.remove(ClassName$j.STICKY_BOTTOM);
	  }
	}
	function _calculateHeights2() {
	  const currentStuckHeight = this.stuckHeight;
	  const currentLooseHeight = this.looseHeight;
	  const heightOps = {
	    cssSelectors: ['margin']
	  };
	  _classPrivateFieldLooseBase(this, _setStickyHeight)[_setStickyHeight](true);
	  if (this.el.classList.contains(ClassName$j.STUCK)) {
	    this.stuckHeight = Util.getElementOuterHeight(this.el, heightOps);
	    this.el.classList.remove(ClassName$j.STUCK);
	    this.looseHeight = Util.getElementOuterHeight(this.el, heightOps);
	    this.el.classList.add(ClassName$j.STUCK);
	  } else {
	    this.looseHeight = Util.getElementOuterHeight(this.el, heightOps);
	    this.el.classList.add(ClassName$j.GET_HEIGHT);
	    this.el.classList.add(ClassName$j.STUCK);
	    this.stuckHeight = Util.getElementOuterHeight(this.el, heightOps);
	    this.el.classList.remove(ClassName$j.STUCK);
	    this.el.classList.remove(ClassName$j.GET_HEIGHT);
	  }
	  this.heightDif = this.looseHeight - this.stuckHeight;
	  _classPrivateFieldLooseBase(this, _setStickyHeight)[_setStickyHeight]();
	  return currentStuckHeight !== this.stuckHeight || currentLooseHeight !== this.looseHeight;
	}
	function _calculateLooseWidth2() {
	  let elWidth = this.el.getBoundingClientRect().width;
	  if (this.el.classList.contains(ClassName$j.STUCK)) {
	    this.el.classList.remove(ClassName$j.STUCK);
	    elWidth = this.el.getBoundingClientRect().width;
	    this.el.classList.add(ClassName$j.STUCK);
	  }
	  return elWidth;
	}
	function _onStickyChange2() {
	  this.el.classList.toggle(ClassName$j.STUCK, this.isStuck);
	  _classPrivateFieldLooseBase(this, _updateScrollPadding)[_updateScrollPadding]();
	}
	function _createObserver2() {
	  if (this.observer) {
	    this.observer.disconnect();
	  }

	  /*
	   We need to check for the presence of a sibling because of how position: sticky works in the
	   browser. Position: sticky automatically defines the element's immediate parent as its sticky
	   container. The item can't get out of its sticky container.
	   https://elad.medium.com/css-position-sticky-how-it-really-works-54cd01dc2d46
	    When the sticky element has a previous sibling (or next sibling if it is at the bottom),
	   we use a common trick to detect when it becomes sticky by setting the top and bottom root
	   margin to -1 pixel and waiting for that 1 pixel of the sticky element to leave the viewport.
	   Because there is an element before (or after) it, the sticky element can move within its
	   sticky container to meet this criteria.
	    However, if the sticky element doesn't have a sibling, the browser may cause it to become
	   sticky without it moving 1 pixel outside of the viewport (for example, when moving around
	   the page by tabbing). The top (or bottom) of the sticky element is the exact same as the top
	   (or bottom) of the sticky container. Because of this, we can modify the trick we used before
	   by instead checking for when the 1 pixel of the sticky moves to the edge of its sticky container.
	   */
	  const hasSibling = this.direction === Direction$2.BOTTOM ? this.el.nextElementSibling : this.el.previousElementSibling;
	  const rootMarginX = (document.documentElement.clientWidth - this.looseWidth) / 2;
	  const rootMarginY = hasSibling ? -1 : -2;
	  const root = hasSibling ? document : this.el.parentElement;
	  const observerOptions = {
	    root,
	    rootMargin: `${rootMarginY}px ${rootMarginX}px ${rootMarginY}px ${rootMarginX}px`,
	    threshold: [0.99, 0.995, 0.999, 1] // (Bugfix #9432) Updated this value to have the Intersection Observer callback function to be called based on the value in the array. This value represents a percentage of the Sticky element visibility so 0.99 is 99 percent visible. These values were updated to solve the bug found in Windows/Edge.
	  };

	  this.observer = new IntersectionObserver(_ref => {
	    let [entry] = _ref;
	    if (this.enableObserver) {
	      const prevState = this.isStuck;
	      if (root === document) {
	        // (Bugfix #9432) entry.intersectionRect.top was returning a fractional number which was causing issues with Windows/Edge.  Wrapping it with Math.ceil solved the issue by rounding the fractional number to the nearest integer value.
	        let isIntersecting = Math.ceil(entry.intersectionRect.top) === -rootMarginY;
	        if (this.direction === Direction$2.BOTTOM) {
	          isIntersecting = Math.floor(entry.intersectionRect.bottom) === document.documentElement.clientHeight + rootMarginY;
	        }
	        this.isStuck = entry.intersectionRatio < 1 && isIntersecting;
	      } else {
	        this.isStuck = entry.isIntersecting;
	      }
	      if (prevState !== undefined && prevState !== this.isStuck) {
	        _classPrivateFieldLooseBase(this, _onStickyChange)[_onStickyChange]();
	        if (this.isStuck) {
	          this[EventName$q.ON_STUCK] = new CustomEvent(EventName$q.ON_STUCK, {
	            bubbles: true
	          });
	          this.el.dispatchEvent(this[EventName$q.ON_STUCK]);
	        } else {
	          this[EventName$q.ON_UNSTUCK] = new CustomEvent(EventName$q.ON_UNSTUCK, {
	            bubbles: true
	          });
	          this.el.dispatchEvent(this[EventName$q.ON_UNSTUCK]);
	        }
	      }
	    }
	  }, observerOptions);
	  this.observer.observe(this.el);
	}
	function _setStickyHeight2(removeStyles) {
	  if (removeStyles === void 0) {
	    removeStyles = false;
	  }
	  let height = null;
	  let marginTop = null;
	  this.el.style.setProperty('margin-top', marginTop); // clear any margin-top styles previously set

	  if (!removeStyles) {
	    height = `${this.stuckHeight}px`;
	    const {
	      marginTop: defaultMarginTop
	    } = getComputedStyle(this.el);
	    marginTop = `${this.heightDif + parseInt(defaultMarginTop, 10)}px`;
	  }
	  this.el.style.setProperty('height', height);
	  if (marginTop) {
	    this.el.style.setProperty('margin-top', marginTop);
	  }
	}
	function _setVw2() {
	  const vw = document.documentElement.clientWidth;
	  this.el.style.setProperty('--vw', `${vw}px`);
	}
	function _setIsStuck2() {
	  if (this.enableObserver) {
	    const stuckBottom = this.direction === Direction$2.BOTTOM && this.el.getBoundingClientRect().bottom === window.innerHeight;
	    const stuckTop = this.direction === Direction$2.TOP && this.el.getBoundingClientRect().top === 0;
	    if (stuckBottom || stuckTop) {
	      this.isStuck = true;
	    }
	  }
	}
	function _onResize2() {
	  _classPrivateFieldLooseBase(this, _setVw)[_setVw]();
	  // Only update Sticky if window height changes, resize observer handles width change
	  if (window.innerHeight !== this.observedWindowDimensions.height) {
	    _classPrivateFieldLooseBase(this, _setUp)[_setUp]();
	  }
	}
	function _updateScrollPadding2(removeScrollPadding) {
	  const htmlElement = document.querySelector('html');
	  this.currentHeight = this.el.getBoundingClientRect().height;
	  if (removeScrollPadding) {
	    htmlElement.style.scrollPaddingTop = 0;
	    htmlElement.style.scrollPaddingBottom = 0;
	  }
	  if (this.direction === Direction$2.TOP) {
	    htmlElement.style.scrollPaddingTop = this.currentHeight + this.extraScrollPaddingPx + 'px';
	  } else if (this.direction === Direction$2.BOTTOM) {
	    htmlElement.style.scrollPaddingBottom = this.currentHeight + this.extraScrollPaddingPx + 'px';
	  }
	}
	function _stickyExceedsAcceptedHeight2() {
	  return this.stuckHeight > window.innerHeight / 3;
	}
	function _setObserverStatus2(status) {
	  this.enableObserver = status;
	  let position = null;
	  if (!status) {
	    position = 'initial';
	    this.isStuck = false;
	  }
	  this.el.style.setProperty('position', position);
	  _classPrivateFieldLooseBase(this, _setIsStuck)[_setIsStuck]();
	  _classPrivateFieldLooseBase(this, _onStickyChange)[_onStickyChange]();
	}

	const backToTopInstances = [];
	const Selector$q = {
	  DATA_MOUNT: '[data-mount="back-to-top"]'
	};
	const ClassName$i = {
	  BACK_TO_TOP: 'back-to-top',
	  HIDE: 'hide'
	};
	const EventName$p = {
	  SCROLL: 'scroll',
	  ON_REMOVE: 'onRemove',
	  ON_RESIZE: 'resize',
	  ON_UPDATE: 'onUpdate'
	};
	const Attributes$2 = {
	  TABINDEX: 'tabindex'
	};
	const DISPLAY_BUTTON_THRESHOLD = 0.7; // percentage of the page where button will display

	/**
	 * Switch the back to top element between static and sticky
	 */
	function _scrollListener() {
	  const stickyPrevSibling = this.el.previousElementSibling;
	  if (!stickyPrevSibling) {
	    return;
	  }

	  // use offset margin and subtract the bottom position of the Sticky el's previous element sibling
	  const offsetWithSentinel = stickyPrevSibling.getBoundingClientRect().bottom - this.offsetMarginTop;
	  const scrollY = window.scrollY || window.pageYOffset;
	  if (scrollY > offsetWithSentinel) {
	    this.stickyElement.setObserver();
	    _hide.call(this, false);
	  } else {
	    _hide.call(this, true);
	    this.el.classList.remove(ClassName$j.STUCK);
	    this.stickyElement.enableObserver = false;
	  }
	}

	/**
	 * Set CSS class to hide or show Back to top
	 * @param {boolean} hide - Whether apply CSS class that hides Back to top
	 */
	function _hide(hide) {
	  this.el.classList.toggle(ClassName$i.HIDE, hide);
	}

	/**
	 * Update sticky offset margin top value when browser height changes
	 * and remove/create new sticky element
	 * @this BackToTop
	 */
	function _onWindowResize$2() {
	  // extra conditional check to prevent code from constantly running on resize
	  if (this.offsetMarginTop !== Util.getDocumentHeight() * DISPLAY_BUTTON_THRESHOLD) {
	    this.offsetMarginTop = Util.getDocumentHeight() * DISPLAY_BUTTON_THRESHOLD;
	    this.stickyElement.remove();
	    this.stickyElement = new Sticky({
	      el: this.el,
	      direction: Direction$2.BOTTOM,
	      observerBehavior: ObserverBehavior.SIZE_AWARE
	    });
	  }
	}

	/**
	 * Class representing Back to Top.
	 */
	class BackToTop {
	  /**
	   * Create a BackToTop instance
	   * @param {Object} opts - The Back to Top options.
	   * @param {HTMLElement} opts.el - The Back to Top DOM node.
	   * @param {number} [opts.offsetMarginTop] - Offset in pixels from top of page where Back to Top should begin to be sticky.
	   * @param {Function} [opts.onScroll] - Function to override the scroll event handler.
	   * @param {Function} [opts.onWindowResize] - Function to override the window resize event handler.
	   */
	  constructor(_ref) {
	    let {
	      el,
	      offsetMarginTop = Util.getDocumentHeight() * DISPLAY_BUTTON_THRESHOLD,
	      onScroll,
	      onWindowResize
	    } = _ref;
	    this.el = el;
	    this.offsetMarginTop = offsetMarginTop;
	    this.onScroll = onScroll || _scrollListener.bind(this);
	    this.onWindowResize = onWindowResize || _onWindowResize$2.bind(this);
	    this.setTabindex();

	    // Create custom events
	    backToTopInstances.push(this);
	    _hide.call(this, true);
	    this.stickyElement = new Sticky({
	      el: this.el,
	      direction: Direction$2.BOTTOM,
	      observerBehavior: ObserverBehavior.SIZE_AWARE
	    });

	    // Do the initial firing of the listener to set the state
	    this.onScroll();

	    // attach event listeners
	    this.events = {
	      scrollEvent: {
	        el: document,
	        type: EventName$p.SCROLL,
	        handler: throttle(200, this.onScroll),
	        options: {
	          passive: true
	        }
	      },
	      resizeEvent: {
	        el: window,
	        type: EventName$p.ON_RESIZE,
	        handler: throttle(200, this.onWindowResize)
	      }
	    };
	    Util.addEvents(Object.values(this.events));
	  }

	  /**
	   * Check if the element needs a tabindex and set it
	   */
	  setTabindex() {
	    const link = this.el.querySelector('a');
	    const href = link.getAttribute('href');
	    const targetElement = document.querySelector(href);
	    const isElementFound = document.querySelector(href) !== null;
	    if (isElementFound &&
	    // Only do something if the element is not tabbable
	    !Util.isElementTabbable(targetElement)) {
	      const tabindex = targetElement.getAttribute(Attributes$2.TABINDEX);
	      // If we don't have a tabindex
	      if (tabindex === null) {
	        // Set the tabindex of the element to -1
	        targetElement.setAttribute(Attributes$2.TABINDEX, '-1');
	      }
	    }
	  }

	  /**
	   * Update the Back to Top.
	   * @param {Object} [opts] - The Back to Top options.
	   * @param {number} [opts.offsetMarginTop] - Offset in pixels from top of page where Back to Top should begin to be sticky.
	   * @param {Function} [opts.onScroll] - Function to override the scroll event handler.
	   * @param {Function} [opts.onWindowResize] - Function to override the window resize event handler.
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    if (opts.offsetMarginTop) {
	      this.offsetMarginTop = opts.offsetMarginTop;
	    }
	    if (opts.onScroll) {
	      Util.removeEvents([this.events.scrollEvent]);
	      this.onScroll = opts.onScroll;
	      Util.addEvents([this.events.scrollEvent]);
	    }
	    if (opts.onWindowResize) {
	      Util.removeEvents([this.events.resizeEvent]);
	      this.onWindowResize = opts.onWindowResize;
	      Util.addEvents([this.events.resizeEvent]);
	    }

	    // Do the initial firing of the listener to set the state
	    this.onScroll();

	    // Create and dispatch custom event
	    this[EventName$p.ON_UPDATE] = new CustomEvent(EventName$p.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$p.ON_UPDATE]);
	  }

	  /**
	   * Remove the event listener from the back to top element
	   */
	  remove() {
	    Util.removeEvents(Object.values(this.events));
	    this.el.classList.remove(ClassName$i.BACK_TO_TOP);
	    this.stickyElement.remove();

	    // remove this back to top reference from array of instances
	    const index = backToTopInstances.indexOf(this);
	    backToTopInstances.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$p.ON_REMOVE] = new CustomEvent(EventName$p.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$p.ON_REMOVE]);
	  }

	  /**
	   * Get back to top instances.
	   * @returns {Object[]} Array of back to top instances
	   */
	  static getInstances() {
	    return backToTopInstances;
	  }
	}

	var imagesloadedExports = {};
	var imagesloaded = {
	  get exports(){ return imagesloadedExports; },
	  set exports(v){ imagesloadedExports = v; },
	};

	var evEmitterExports = {};
	var evEmitter = {
	  get exports(){ return evEmitterExports; },
	  set exports(v){ evEmitterExports = v; },
	};

	var hasRequiredEvEmitter;
	function requireEvEmitter() {
	  if (hasRequiredEvEmitter) return evEmitterExports;
	  hasRequiredEvEmitter = 1;
	  (function (module) {
	    (function (global, factory) {
	      // universal module definition
	      if (module.exports) {
	        // CommonJS - Browserify, Webpack
	        module.exports = factory();
	      } else {
	        // Browser globals
	        global.EvEmitter = factory();
	      }
	    })(typeof window != 'undefined' ? window : commonjsGlobal, function () {
	      function EvEmitter() {}
	      let proto = EvEmitter.prototype;
	      proto.on = function (eventName, listener) {
	        if (!eventName || !listener) return this;

	        // set events hash
	        let events = this._events = this._events || {};
	        // set listeners array
	        let listeners = events[eventName] = events[eventName] || [];
	        // only add once
	        if (!listeners.includes(listener)) {
	          listeners.push(listener);
	        }
	        return this;
	      };
	      proto.once = function (eventName, listener) {
	        if (!eventName || !listener) return this;

	        // add event
	        this.on(eventName, listener);
	        // set once flag
	        // set onceEvents hash
	        let onceEvents = this._onceEvents = this._onceEvents || {};
	        // set onceListeners object
	        let onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
	        // set flag
	        onceListeners[listener] = true;
	        return this;
	      };
	      proto.off = function (eventName, listener) {
	        let listeners = this._events && this._events[eventName];
	        if (!listeners || !listeners.length) return this;
	        let index = listeners.indexOf(listener);
	        if (index != -1) {
	          listeners.splice(index, 1);
	        }
	        return this;
	      };
	      proto.emitEvent = function (eventName, args) {
	        let listeners = this._events && this._events[eventName];
	        if (!listeners || !listeners.length) return this;

	        // copy over to avoid interference if .off() in listener
	        listeners = listeners.slice(0);
	        args = args || [];
	        // once stuff
	        let onceListeners = this._onceEvents && this._onceEvents[eventName];
	        for (let listener of listeners) {
	          let isOnce = onceListeners && onceListeners[listener];
	          if (isOnce) {
	            // remove listener
	            // remove before trigger to prevent recursion
	            this.off(eventName, listener);
	            // unset once flag
	            delete onceListeners[listener];
	          }
	          // trigger listener
	          listener.apply(this, args);
	        }
	        return this;
	      };
	      proto.allOff = function () {
	        delete this._events;
	        delete this._onceEvents;
	        return this;
	      };
	      return EvEmitter;
	    });
	  })(evEmitter);
	  return evEmitterExports;
	}

	(function (module) {
	  (function (window, factory) {
	    // universal module definition
	    if (module.exports) {
	      // CommonJS
	      module.exports = factory(window, requireEvEmitter());
	    } else {
	      // browser global
	      window.imagesLoaded = factory(window, window.EvEmitter);
	    }
	  })(typeof window !== 'undefined' ? window : commonjsGlobal, function factory(window, EvEmitter) {
	    let $ = window.jQuery;
	    let console = window.console;

	    // -------------------------- helpers -------------------------- //

	    // turn element or nodeList into an array
	    function makeArray(obj) {
	      // use object if already an array
	      if (Array.isArray(obj)) return obj;
	      let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
	      // convert nodeList to array
	      if (isArrayLike) return [...obj];

	      // array of single index
	      return [obj];
	    }

	    // -------------------------- imagesLoaded -------------------------- //

	    /**
	     * @param {[Array, Element, NodeList, String]} elem
	     * @param {[Object, Function]} options - if function, use as callback
	     * @param {Function} onAlways - callback function
	     * @returns {ImagesLoaded}
	     */
	    function ImagesLoaded(elem, options, onAlways) {
	      // coerce ImagesLoaded() without new, to be new ImagesLoaded()
	      if (!(this instanceof ImagesLoaded)) {
	        return new ImagesLoaded(elem, options, onAlways);
	      }
	      // use elem as selector string
	      let queryElem = elem;
	      if (typeof elem == 'string') {
	        queryElem = document.querySelectorAll(elem);
	      }
	      // bail if bad element
	      if (!queryElem) {
	        console.error(`Bad element for imagesLoaded ${queryElem || elem}`);
	        return;
	      }
	      this.elements = makeArray(queryElem);
	      this.options = {};
	      // shift arguments if no options set
	      if (typeof options == 'function') {
	        onAlways = options;
	      } else {
	        Object.assign(this.options, options);
	      }
	      if (onAlways) this.on('always', onAlways);
	      this.getImages();
	      // add jQuery Deferred object
	      if ($) this.jqDeferred = new $.Deferred();

	      // HACK check async to allow time to bind listeners
	      setTimeout(this.check.bind(this));
	    }
	    ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
	    ImagesLoaded.prototype.getImages = function () {
	      this.images = [];

	      // filter & find items if we have an item selector
	      this.elements.forEach(this.addElementImages, this);
	    };
	    const elementNodeTypes = [1, 9, 11];

	    /**
	     * @param {Node} elem
	     */
	    ImagesLoaded.prototype.addElementImages = function (elem) {
	      // filter siblings
	      if (elem.nodeName === 'IMG') {
	        this.addImage(elem);
	      }
	      // get background image on element
	      if (this.options.background === true) {
	        this.addElementBackgroundImages(elem);
	      }

	      // find children
	      // no non-element nodes, #143
	      let {
	        nodeType
	      } = elem;
	      if (!nodeType || !elementNodeTypes.includes(nodeType)) return;
	      let childImgs = elem.querySelectorAll('img');
	      // concat childElems to filterFound array
	      for (let img of childImgs) {
	        this.addImage(img);
	      }

	      // get child background images
	      if (typeof this.options.background == 'string') {
	        let children = elem.querySelectorAll(this.options.background);
	        for (let child of children) {
	          this.addElementBackgroundImages(child);
	        }
	      }
	    };
	    const reURL = /url\((['"])?(.*?)\1\)/gi;
	    ImagesLoaded.prototype.addElementBackgroundImages = function (elem) {
	      let style = getComputedStyle(elem);
	      // Firefox returns null if in a hidden iframe https://bugzil.la/548397
	      if (!style) return;

	      // get url inside url("...")
	      let matches = reURL.exec(style.backgroundImage);
	      while (matches !== null) {
	        let url = matches && matches[2];
	        if (url) {
	          this.addBackground(url, elem);
	        }
	        matches = reURL.exec(style.backgroundImage);
	      }
	    };

	    /**
	     * @param {Image} img
	     */
	    ImagesLoaded.prototype.addImage = function (img) {
	      let loadingImage = new LoadingImage(img);
	      this.images.push(loadingImage);
	    };
	    ImagesLoaded.prototype.addBackground = function (url, elem) {
	      let background = new Background(url, elem);
	      this.images.push(background);
	    };
	    ImagesLoaded.prototype.check = function () {
	      this.progressedCount = 0;
	      this.hasAnyBroken = false;
	      // complete if no images
	      if (!this.images.length) {
	        this.complete();
	        return;
	      }

	      /* eslint-disable-next-line func-style */
	      let onProgress = (image, elem, message) => {
	        // HACK - Chrome triggers event before object properties have changed. #83
	        setTimeout(() => {
	          this.progress(image, elem, message);
	        });
	      };
	      this.images.forEach(function (loadingImage) {
	        loadingImage.once('progress', onProgress);
	        loadingImage.check();
	      });
	    };
	    ImagesLoaded.prototype.progress = function (image, elem, message) {
	      this.progressedCount++;
	      this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
	      // progress event
	      this.emitEvent('progress', [this, image, elem]);
	      if (this.jqDeferred && this.jqDeferred.notify) {
	        this.jqDeferred.notify(this, image);
	      }
	      // check if completed
	      if (this.progressedCount === this.images.length) {
	        this.complete();
	      }
	      if (this.options.debug && console) {
	        console.log(`progress: ${message}`, image, elem);
	      }
	    };
	    ImagesLoaded.prototype.complete = function () {
	      let eventName = this.hasAnyBroken ? 'fail' : 'done';
	      this.isComplete = true;
	      this.emitEvent(eventName, [this]);
	      this.emitEvent('always', [this]);
	      if (this.jqDeferred) {
	        let jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
	        this.jqDeferred[jqMethod](this);
	      }
	    };

	    // --------------------------  -------------------------- //

	    function LoadingImage(img) {
	      this.img = img;
	    }
	    LoadingImage.prototype = Object.create(EvEmitter.prototype);
	    LoadingImage.prototype.check = function () {
	      // If complete is true and browser supports natural sizes,
	      // try to check for image status manually.
	      let isComplete = this.getIsImageComplete();
	      if (isComplete) {
	        // report based on naturalWidth
	        this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
	        return;
	      }

	      // If none of the checks above matched, simulate loading on detached element.
	      this.proxyImage = new Image();
	      // add crossOrigin attribute. #204
	      if (this.img.crossOrigin) {
	        this.proxyImage.crossOrigin = this.img.crossOrigin;
	      }
	      this.proxyImage.addEventListener('load', this);
	      this.proxyImage.addEventListener('error', this);
	      // bind to image as well for Firefox. #191
	      this.img.addEventListener('load', this);
	      this.img.addEventListener('error', this);
	      this.proxyImage.src = this.img.currentSrc || this.img.src;
	    };
	    LoadingImage.prototype.getIsImageComplete = function () {
	      // check for non-zero, non-undefined naturalWidth
	      // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
	      return this.img.complete && this.img.naturalWidth;
	    };
	    LoadingImage.prototype.confirm = function (isLoaded, message) {
	      this.isLoaded = isLoaded;
	      let {
	        parentNode
	      } = this.img;
	      // emit progress with parent <picture> or self <img>
	      let elem = parentNode.nodeName === 'PICTURE' ? parentNode : this.img;
	      this.emitEvent('progress', [this, elem, message]);
	    };

	    // ----- events ----- //

	    // trigger specified handler for event type
	    LoadingImage.prototype.handleEvent = function (event) {
	      let method = 'on' + event.type;
	      if (this[method]) {
	        this[method](event);
	      }
	    };
	    LoadingImage.prototype.onload = function () {
	      this.confirm(true, 'onload');
	      this.unbindEvents();
	    };
	    LoadingImage.prototype.onerror = function () {
	      this.confirm(false, 'onerror');
	      this.unbindEvents();
	    };
	    LoadingImage.prototype.unbindEvents = function () {
	      this.proxyImage.removeEventListener('load', this);
	      this.proxyImage.removeEventListener('error', this);
	      this.img.removeEventListener('load', this);
	      this.img.removeEventListener('error', this);
	    };

	    // -------------------------- Background -------------------------- //

	    function Background(url, element) {
	      this.url = url;
	      this.element = element;
	      this.img = new Image();
	    }

	    // inherit LoadingImage prototype
	    Background.prototype = Object.create(LoadingImage.prototype);
	    Background.prototype.check = function () {
	      this.img.addEventListener('load', this);
	      this.img.addEventListener('error', this);
	      this.img.src = this.url;
	      // check if image is already complete
	      let isComplete = this.getIsImageComplete();
	      if (isComplete) {
	        this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
	        this.unbindEvents();
	      }
	    };
	    Background.prototype.unbindEvents = function () {
	      this.img.removeEventListener('load', this);
	      this.img.removeEventListener('error', this);
	    };
	    Background.prototype.confirm = function (isLoaded, message) {
	      this.isLoaded = isLoaded;
	      this.emitEvent('progress', [this, this.element, message]);
	    };

	    // -------------------------- jQuery -------------------------- //

	    ImagesLoaded.makeJQueryPlugin = function (jQuery) {
	      jQuery = jQuery || window.jQuery;
	      if (!jQuery) return;

	      // set local variable
	      $ = jQuery;
	      // $().imagesLoaded()
	      $.fn.imagesLoaded = function (options, onAlways) {
	        let instance = new ImagesLoaded(this, options, onAlways);
	        return instance.jqDeferred.promise($(this));
	      };
	    };
	    // try making plugin
	    ImagesLoaded.makeJQueryPlugin();

	    // --------------------------  -------------------------- //

	    return ImagesLoaded;
	  });
	})(imagesloaded);

	const PointerType = {
	  TOUCH: 'touch',
	  PEN: 'pen'
	};
	const EventName$o = {
	  POINTER_DOWN: 'pointerdown',
	  POINTER_UP: 'pointerup',
	  TOUCH_START: 'touchstart',
	  TOUCH_MOVE: 'touchmove',
	  TOUCH_END: 'touchend'
	};
	const ClassName$h = {
	  POINTER_EVENT: 'pointer-event'
	};
	function _handleSwipe() {
	  const absDeltax = Math.abs(this.touchDeltaX);
	  if (absDeltax <= this.swipeThreshold) {
	    return;
	  }
	  const direction = absDeltax / this.touchDeltaX;

	  // swipe left
	  if (direction > 0) {
	    this.negativeCallback();
	  }

	  // swipe right
	  if (direction < 0) {
	    this.positiveCallback();
	  }
	}
	function _onSwipeStart(event) {
	  if (this.pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
	    this.touchStartX = event.clientX;
	  } else if (!this.pointerEvent) {
	    this.touchStartX = event.touches[0].clientX;
	  }
	}
	function _onSwipeMove(event) {
	  // ensure swiping with one touch and not pinching
	  if (event.touches && event.touches.length > 1) {
	    this.touchDeltaX = 0;
	  } else {
	    this.touchDeltaX = event.touches[0].clientX - this.touchStartX;
	  }
	}
	function _onSwipeEnd(event) {
	  if (this.pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
	    this.touchDeltaX = event.clientX - this.touchStartX;
	  }
	  _handleSwipe.call(this);
	}

	/**
	 * Class for handling touch events.
	 */
	class TouchUtil {
	  /**
	   * Create a TouchUtil instance
	   * @param {Object} opts - The touch events options.
	   * @param {HTMLElement} opts.el - The swipeable DOM node.
	   * @param {Function} opts.positiveCallback - Callback function to be called after swiping in a positive direction.
	   * @param {Function} opts.negativeCallback - Callback function to be called after swiping in a negative direction.
	   * @param {number} [opts.swipeThreshold=40] - The minimum swipe size
	   * @param {string} [opts.pointerEventClassName="pointer-event"] - The classname to add for pointer events
	   */
	  constructor(opts) {
	    this.el = opts.el;
	    this.positiveCallback = opts.positiveCallback;
	    this.negativeCallback = opts.negativeCallback;
	    this.swipeThreshold = opts.swipeThreshold || 40;
	    this.pointerEventClassName = opts.pointerEventClassName || ClassName$h.POINTER_EVENT;
	    this.touchStartX = 0;
	    this.touchDeltaX = 0;
	    this.touchSupported = 'ontouchstart' in document.documentElement || Boolean(navigator.maxTouchPoints > 0);
	    this.pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);
	    this.onSwipeStart = _onSwipeStart.bind(this);
	    this.onSwipeMove = _onSwipeMove.bind(this);
	    this.onSwipeEnd = _onSwipeEnd.bind(this);
	  }

	  /**
	   * Add the touch event listeners.
	   */
	  addEventListeners() {
	    if (this.touchSupported) {
	      if (this.pointerEvent) {
	        this.el.addEventListener(EventName$o.POINTER_DOWN, this.onSwipeStart);
	        this.el.addEventListener(EventName$o.POINTER_UP, this.onSwipeEnd);
	        this.el.classList.add(this.pointerEventClassName);
	      } else {
	        this.el.addEventListener(EventName$o.TOUCH_START, this.onSwipeStart);
	        this.el.addEventListener(EventName$o.TOUCH_MOVE, this.onSwipeMove);
	        this.el.addEventListener(EventName$o.TOUCH_END, this.onSwipeEnd);
	      }
	    }
	  }

	  /**
	   * Remove the touch event listeners.
	   */
	  removeEventListeners() {
	    if (this.touchSupported) {
	      if (this.pointerEvent) {
	        this.el.removeEventListener(EventName$o.POINTER_DOWN, this.onSwipeStart);
	        this.el.removeEventListener(EventName$o.POINTER_UP, this.onSwipeEnd);
	        this.el.classList.remove(this.pointerEventClassName);
	      } else {
	        this.el.removeEventListener(EventName$o.TOUCH_START, this.onSwipeStart);
	        this.el.removeEventListener(EventName$o.TOUCH_MOVE, this.onSwipeMove);
	        this.el.removeEventListener(EventName$o.TOUCH_END, this.onSwipeEnd);
	      }
	    }
	  }
	}

	const ClassName$g = {
	  ACTIVE: 'active',
	  SLIDE: 'slide',
	  SLIDE_IN: 'sliding-in',
	  SNEAK_PEAK: 'carousel-sneak-peek',
	  PRODUCT_CARD: 'carousel-product-card',
	  VARIABLE_HEIGHT: 'carousel-variable-height',
	  RIGHT: 'carousel-item-right',
	  LEFT: 'carousel-item-left',
	  NEXT: 'carousel-item-next',
	  PREV: 'carousel-item-prev',
	  GET_HEIGHT: 'get-height',
	  MARGIN_X_0: 'mx-0',
	  PADDING_X_0: 'px-0'
	};

	/**
	 * @enum {string}
	 */
	const Direction$1 = {
	  NEXT: 'next',
	  PREV: 'prev',
	  LEFT: 'left',
	  RIGHT: 'right'
	};
	const Selector$p = {
	  ACTIVE: '.active',
	  ACTIVE_ITEM: '.active.carousel-item',
	  ITEM: '.carousel-item',
	  ITEM_IMG: '.carousel-item img',
	  INDICATORS: '.carousel-indicators',
	  DATA_SLIDE_PREV: '[data-slide="prev"]',
	  DATA_SLIDE_NEXT: '[data-slide="next"]',
	  DATA_MOUNT: '[data-mount="carousel"]',
	  DATA_LOOP: 'data-loop',
	  DATA_STATUS: 'data-status',
	  CAROUSEL_INNER: '.carousel-inner',
	  ROW: '.row',
	  SLIDE_ITEM: '.slide-item',
	  VISIBLE_STATUS: '[aria-hidden="true"]',
	  SR_STATUS: '[aria-live]',
	  BACK_TO_CONTROLS: '.back-to-controls',
	  DATA_ACTIVE_SLIDE_FOCUS: 'data-active-slide-focus'
	};
	const EventName$n = {
	  ON_CHANGE: 'onChange',
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove'
	};

	/**
	 * Private functions.
	 */

	function _getItemIndex(element) {
	  const items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$p.ITEM)) : [];
	  return items.indexOf(element);
	}
	function _getInitialSlideIndex() {
	  const activeItem = this.el.querySelector(Selector$p.ACTIVE_ITEM);
	  return _getItemIndex.bind(this)(activeItem);
	}
	function _getNextSlide() {
	  const index = this.currentSlideIndex + 1;
	  // If index exceeds slide length, return to index 0
	  return index > this.slides.length - 1 ? 0 : index;
	}
	function _getPrevSlide() {
	  const index = this.currentSlideIndex - 1;
	  // If index is less than 0, move to last slide index
	  return index < 0 ? this.slides.length - 1 : index;
	}
	function _getSlide(num) {
	  // Record highest number, 0 or passed-in value
	  const max = Math.max(num, 0);
	  // Return lowest number, either previous number or the maximum slide index
	  return Math.min(max, this.slides.length - 1);
	}
	function _getStatusContainer() {
	  // Check if we are maintaining a status message for this carousel
	  // and that the element exists on the page
	  const statusContainer = this.el.getAttribute(Selector$p.DATA_STATUS);
	  return statusContainer ? document.getElementById(statusContainer) : null;
	}
	function _shouldLoopSlides() {
	  // Loop by default unless data-loop is set to false
	  return !(this.el.getAttribute(Selector$p.DATA_LOOP) === 'false');
	}
	function _shouldShowTabindex() {
	  // Show tabindex on container element unless data-active-slide-focus is set to false
	  return !(this.el.getAttribute(Selector$p.DATA_ACTIVE_SLIDE_FOCUS) === 'false');
	}
	function _onFirstSlide() {
	  return this.currentSlideIndex === 0;
	}
	function _onLastSlide() {
	  return this.currentSlideIndex === this.slides.length - 1;
	}
	function _shouldGoForward() {
	  return _onLastSlide.bind(this)() ? this.loopSlides : true;
	}
	function _shouldGoBack() {
	  return _onFirstSlide.bind(this)() ? this.loopSlides : true;
	}
	function _prevBtnOnClick() {
	  this.goToPrevSlide();
	}
	function _nextBtnOnClick() {
	  // Add events to manage focus order for accessibility
	  Util.addEvents(this.nextBtnEvents);
	  this.goToNextSlide();
	}
	function _backToControlsBtnOnClick() {
	  if (!this.backToControlsBtn) {
	    return;
	  }

	  // focus logic: prefer "previous" button, then "next", otherwise carousel container
	  if (!this.prevBtn.disabled) {
	    this.prevBtn.focus();
	    return;
	  }
	  if (!this.nextBtn.disabled) {
	    this.nextBtn.focus();
	    return;
	  }
	  this.el.setAttribute('tabindex', -1);
	  this.el.focus();
	}
	function _imgOnDrag(event) {
	  // Prevent images inside slides from being dragged and interfering with touch interaction
	  event.preventDefault();
	}

	/**
	 *
	 * @param {Direction} direction - the direction to slide
	 * @param {number} nextElementIndex - the next slide's index
	 * @this CarouselControls
	 */
	function _slide(direction, nextElementIndex) {
	  const activeElement = this.slides[this.currentSlideIndex];
	  const nextElement = this.slides[nextElementIndex];
	  let directionalClassName;
	  let orderClassName;
	  if (direction === Direction$1.NEXT) {
	    directionalClassName = ClassName$g.LEFT;
	    orderClassName = ClassName$g.NEXT;
	  } else {
	    directionalClassName = ClassName$g.RIGHT;
	    orderClassName = ClassName$g.PREV;
	  }
	  if (nextElement && nextElement.classList.contains(ClassName$g.ACTIVE)) {
	    this.isSliding = false;
	    return;
	  }
	  if (!activeElement || !nextElement) {
	    // Some weirdness is happening, so we bail
	    return;
	  }
	  this.isSliding = true;
	  _setActiveIndicatorElement.bind(this)(nextElementIndex);
	  if (this.el.classList.contains(ClassName$g.SNEAK_PEAK)) {
	    _removeNextPrevClasses.bind(this)();
	  }
	  if (this.el.classList.contains(ClassName$g.SLIDE)) {
	    if (this.el.classList.contains(ClassName$g.VARIABLE_HEIGHT)) {
	      this.el.classList.add(ClassName$g.MARGIN_X_0, ClassName$g.PADDING_X_0);
	    }
	    nextElement.classList.add(orderClassName, ClassName$g.SLIDE_IN);
	    Util.reflow(nextElement);
	    activeElement.classList.add(directionalClassName);
	    nextElement.classList.add(directionalClassName);
	    const transitionDuration = Util.getTransitionDurationFromElement(activeElement);
	    setTimeout(() => {
	      nextElement.classList.remove(directionalClassName, orderClassName, ClassName$g.SLIDE_IN);
	      nextElement.classList.add(ClassName$g.ACTIVE);
	      activeElement.classList.remove(ClassName$g.ACTIVE, orderClassName, directionalClassName);
	      if (this.el.classList.contains(ClassName$g.VARIABLE_HEIGHT)) {
	        this.el.classList.remove(ClassName$g.MARGIN_X_0, ClassName$g.PADDING_X_0);
	      }
	      this.isSliding = false;
	    }, transitionDuration);
	  } else {
	    activeElement.classList.remove(ClassName$g.ACTIVE);
	    nextElement.classList.add(ClassName$g.ACTIVE);
	    this.isSliding = false;
	  }
	  _setSlideAttributes.bind(this)(nextElementIndex);
	  this.didSlide = true;
	  this.currentSlideIndex = nextElementIndex;
	  if (this.el.classList.contains(ClassName$g.SNEAK_PEAK)) {
	    _addNextPrevClasses.bind(this)();
	  }
	  _setButtonAttributes.bind(this)();

	  // Update the status message
	  if (this.statusContainer) {
	    _setStatusMessage.bind(this)(nextElementIndex);
	  }
	}
	function _setActiveIndicatorElement(index) {
	  if (this.indicators) {
	    const indicators = [].slice.call(this.indicators.querySelectorAll(Selector$p.ACTIVE));
	    indicators.forEach(indicator => {
	      indicator.classList.remove(ClassName$g.ACTIVE);
	    });
	    const nextIndicator = this.indicators.children[index];
	    if (nextIndicator) {
	      nextIndicator.classList.add(ClassName$g.ACTIVE);
	    }
	  }
	}
	function _removeNextPrevClasses() {
	  const nextElementIndex = _getNextSlide.bind(this)();
	  const prevElementIndex = _getPrevSlide.bind(this)();
	  this.slides[prevElementIndex].classList.remove(ClassName$g.PREV);
	  this.slides[nextElementIndex].classList.remove(ClassName$g.NEXT);
	}
	function _addNextPrevClasses() {
	  const nextElementIndex = _getNextSlide.bind(this)();
	  const prevElementIndex = _getPrevSlide.bind(this)();
	  this.slides[nextElementIndex].classList.add(ClassName$g.NEXT);
	  this.slides[prevElementIndex].classList.add(ClassName$g.PREV);
	}
	function _setSlideAttributes(index) {
	  for (let i = 0; i < this.slides.length; i++) {
	    if (i === index) {
	      this.slides[i].removeAttribute('aria-hidden');
	      if (this.activeSlideFocus) {
	        if (this.el.classList.contains(ClassName$g.PRODUCT_CARD)) {
	          // Product card carousel needs the first product card focusable, not the whole slide
	          const slideItems = [].slice.call(this.slides[i].querySelectorAll(Selector$p.SLIDE_ITEM));
	          this.slides[i].removeAttribute('tabindex');
	          slideItems[0].firstElementChild.setAttribute('tabindex', 0);
	        } else {
	          this.slides[i].setAttribute('tabindex', 0);
	        }
	      }
	    } else {
	      this.slides[i].removeAttribute('tabindex');
	      this.slides[i].setAttribute('aria-hidden', 'true');
	    }
	  }
	}
	function _setActiveClass(index) {
	  for (let i = 0; i < this.slides.length; i++) {
	    if (i === index) {
	      this.slides[i].classList.add(ClassName$g.ACTIVE);
	    } else {
	      this.slides[i].classList.remove(ClassName$g.ACTIVE);
	    }
	  }
	}
	function _setButtonAttributes() {
	  if (!this.loopSlides) {
	    if (_onFirstSlide.bind(this)()) {
	      this.prevBtn.setAttribute('disabled', '');
	      this.prevBtn.setAttribute('tabindex', -1);
	      this.nextBtn.removeAttribute('disabled');
	    } else if (_onLastSlide.bind(this)()) {
	      this.prevBtn.removeAttribute('disabled');
	      this.prevBtn.removeAttribute('tabindex');
	      this.nextBtn.setAttribute('disabled', '');
	    } else {
	      this.prevBtn.removeAttribute('disabled');
	      this.prevBtn.removeAttribute('tabindex');
	      this.nextBtn.removeAttribute('disabled');
	    }
	  } else if (this.loopSlides) {
	    this.prevBtn.removeAttribute('disabled');
	    this.prevBtn.removeAttribute('tabindex');
	    this.nextBtn.removeAttribute('disabled');
	  }
	}

	/**
	 * @desc finds appropriate title text for a carousel slide
	 * @param {HTMLElement} searchNode - the Node to search
	 * @returns {String?} Appropriate text, or empty string if none is found
	 */
	function _getSlideTitleText(searchNode) {
	  const headerSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
	  let i;
	  let headerNode = null;
	  for (i = 0; i < headerSelectors.length; i++) {
	    headerNode = searchNode.querySelector(headerSelectors[i]);
	    if (headerNode) {
	      return headerNode.textContent;
	    }
	  }
	  const imageNodeList = searchNode.querySelectorAll('img');
	  if (imageNodeList.length === 1 && imageNodeList[0].hasAttribute('alt')) {
	    return imageNodeList[0].getAttribute('alt');
	  }
	  return '';
	}
	function _setStatusMessage(index) {
	  // Sets status message if a status container (visible, screen reader, or both) was registered at initialization
	  if (this.visibleStatusContainer || this.srStatusContainer) {
	    // for carousels that display multiple items at once, like product cards, each item is a slideItem
	    // one or more slideItems are grouped together in a slide.
	    const slideItems = [].slice.call(this.el.querySelectorAll(Selector$p.SLIDE_ITEM)); // all slideItems
	    const activeSlide = this.slides[index]; // The currently shown slide
	    const activeSlideItems = activeSlide.querySelectorAll(Selector$p.SLIDE_ITEM); // the slideItems in the currently shown slide

	    const start = slideItems.indexOf(activeSlideItems[0]) + 1;
	    const separator = '–';
	    const end = slideItems.indexOf(activeSlideItems[activeSlideItems.length - 1]) + 1;
	    const data = {
	      start,
	      separator,
	      end,
	      total: slideItems.length,
	      slideNumber: index + 1
	    };

	    // Check if there are no slideItems and we're instead just dealing with regular slides
	    if (!slideItems || slideItems.length < 1) {
	      data.start = index + 1;
	      data.end = index + 1;
	      data.total = this.slides.length;
	    }

	    // Check if we're showing exactly one thing
	    if (activeSlide && start === end) {
	      // Make title of shown slide available to template if there's only one
	      data.slideTitle = _getSlideTitleText(activeSlide);
	    }
	    if (this.srStatusContainer && this.srStatusTemplate) {
	      this.srStatusContainer.textContent = Util.interpolateString(this.srStatusTemplate, data);
	    }

	    // If we are only showing one item, set separator and end to an empty string for the visible template only
	    if (start === end) {
	      data.separator = '';
	      data.end = '';
	    }
	    if (this.visibleStatusContainer && this.visibleStatusTemplate) {
	      this.visibleStatusContainer.textContent = Util.interpolateString(this.visibleStatusTemplate, data);
	    }
	  }
	}
	function _setSlideHeights() {
	  // Enforce consistent height (flexbox messes with animation)
	  const slideArray = [].slice.call(this.slides);
	  let maxHeight = slideArray[0].clientHeight;
	  slideArray.forEach(slide => {
	    if (!slide.classList.contains(ClassName$g.ACTIVE)) {
	      slide.classList.add(ClassName$g.GET_HEIGHT);
	    }
	    if (slide.clientHeight > maxHeight) {
	      maxHeight = slide.clientHeight;
	    }
	    slide.classList.remove(ClassName$g.GET_HEIGHT);
	  });
	  slideArray.forEach(slide => {
	    slide.style.height = `${maxHeight}px`;
	  });
	}
	function _removeSlideHeights() {
	  const slideArray = [].slice.call(this.slides);
	  slideArray.forEach(slide => {
	    slide.style.height = '';
	  });
	}
	function _recalculateSlideHeights() {
	  _removeSlideHeights.bind(this)();
	  imagesloadedExports(this.el, () => {
	    _setSlideHeights.bind(this)();
	  });
	}

	/**
	 * @this CarouselControls
	 */
	function _handleKeyDown(event) {
	  const keycode = event.keycode || event.which;
	  if (keycode === Util.keyCodes.TAB && this.didSlide) {
	    _focusOnSlide.bind(this)(this.currentSlideIndex);
	    this.didSlide = false;
	    event.preventDefault();
	  }
	  _removeControlEventListeners.call(this);
	}
	function _focusOnSlide(index) {
	  this.slides[index].focus();
	}

	/**
	 * @this CarouselControls
	 */
	function _removeControlEventListeners() {
	  this.didSlide = false;
	  Util.removeEvents(this.nextBtnEvents);
	}

	/**
	 * @this CarouselControls
	 */
	function _reallocateSlideItems() {
	  const inner = this.el.querySelector(Selector$p.CAROUSEL_INNER);
	  const activeSlide = this.el.querySelector(Selector$p.ACTIVE_ITEM);
	  const slideItemsContainer = activeSlide.querySelector(Selector$p.ROW);
	  const slideItems = [].slice.call(this.el.querySelectorAll(Selector$p.SLIDE_ITEM));
	  const activeSlideItems = activeSlide.querySelectorAll(Selector$p.SLIDE_ITEM);
	  const maxItems = Math.round(slideItemsContainer.clientWidth / activeSlideItems[0].clientWidth);
	  const slidesNeeded = Math.ceil(slideItems.length / maxItems);
	  const slidesToAdd = slidesNeeded - this.slides.length;

	  // Reset CSS properties
	  _removeSlideHeights.bind(this)();
	  this.prevBtn.style.display = '';
	  this.nextBtn.style.display = '';
	  if (this.statusContainer) {
	    this.statusContainer.style.display = '';
	    this.statusContainer.nextElementSibling.style.display = '';
	  }
	  if (slidesToAdd > 0) {
	    // We need to add more slides
	    for (let i = 0; i < slidesToAdd; i++) {
	      const newNode = this.slides[this.slides.length - 1].cloneNode(true);
	      inner.append(newNode);
	      const newParent = newNode.querySelector(Selector$p.ROW);
	      // Clear out duplicated slide items
	      while (newParent.firstChild) {
	        newParent.lastChild.remove();
	      }
	    }
	  } else if (slidesToAdd < 0) {
	    // We need to remove some slides
	    for (let i = 0; i > slidesToAdd; i--) {
	      inner.lastChild.remove();
	    }
	  }

	  // Reallocate the slide items among the slides
	  const slideItemsContainers = this.el.querySelectorAll(Selector$p.ROW);
	  let itemsToAppend;
	  for (let i = slideItemsContainers.length - 1; i >= 0; i--) {
	    const remainder = slideItems.length % maxItems;
	    if (remainder > 0) {
	      itemsToAppend = slideItems.splice(slideItems.length - remainder, remainder);
	    } else {
	      itemsToAppend = slideItems.splice(slideItems.length - maxItems, maxItems);
	    }
	    itemsToAppend.forEach(item => {
	      slideItemsContainers[i].append(item);
	    });
	  }

	  // Update the slides property
	  this.slides = this.el.querySelectorAll(Selector$p.ITEM);

	  // Reset current slide index if it's on a slide that's been removed
	  if (this.currentSlideIndex > this.slides.length - 1) {
	    this.currentSlideIndex = this.slides.length - 1;
	  }

	  // If there is only one slide, hide the controls, status msg, and cta
	  if (this.slides.length === 1) {
	    this.prevBtn.style.display = 'none';
	    this.nextBtn.style.display = 'none';
	    if (this.statusContainer) {
	      this.statusContainer.style.display = 'none';
	      this.statusContainer.nextElementSibling.style.display = 'none';
	    }
	  }
	  _recalculateSlideHeights.bind(this)();
	}
	function _setupDom() {
	  // Reallocate slide items for product card carousel
	  if (this.el.classList.contains(ClassName$g.PRODUCT_CARD)) {
	    _reallocateSlideItems.bind(this)();
	  }

	  // Carousels that aren't layered can't use flexbox to ensure consistent height
	  // so we need an option to set slide height via JS
	  if (this.el.classList.contains(ClassName$g.VARIABLE_HEIGHT)) {
	    _recalculateSlideHeights.bind(this)();
	  }

	  // Make sure slide attributes and indicators are up to date
	  _setSlideAttributes.bind(this)(this.currentSlideIndex);
	  _setActiveClass.bind(this)(this.currentSlideIndex);
	  _setActiveIndicatorElement.bind(this)(this.currentSlideIndex);

	  // For layered carousel layouts, add prev and next classes to slides
	  if (this.el.classList.contains(ClassName$g.SNEAK_PEAK)) {
	    _addNextPrevClasses.bind(this)();
	  }

	  // Update button attributes, for non-looping carousels
	  _setButtonAttributes.bind(this)();

	  // Update the status message
	  if (this.statusContainer) {
	    _setStatusMessage.bind(this)(this.currentSlideIndex);
	    this.statusContainer.parentNode.classList.remove('d-none');
	  }
	}
	function _generateEvents$4() {
	  const events = [{
	    el: this.prevBtn,
	    type: 'click',
	    handler: this.prevOnClick
	  }, {
	    el: this.nextBtn,
	    type: 'click',
	    handler: this.nextOnClick
	  }];
	  if (this.itemImg) {
	    this.itemImg.forEach(img => {
	      events.push({
	        el: img,
	        type: 'dragstart',
	        handler: _imgOnDrag
	      });
	    });
	  }

	  // Product card and variable height carousels need an event listener for window resize
	  if (this.el.classList.contains(ClassName$g.PRODUCT_CARD) || this.el.classList.contains(ClassName$g.VARIABLE_HEIGHT)) {
	    events.push({
	      el: window,
	      type: 'resize',
	      handler: debounce(300, _setupDom.bind(this)),
	      options: {
	        passive: true
	      }
	    });
	  }

	  // Can be null
	  if (this.backToControlsBtn) {
	    events.push({
	      el: this.backToControlsBtn,
	      type: 'click',
	      handler: this.backToControlsBtnOnClick
	    });
	  }
	  return events;
	}

	/**
	 * Class representing carousel controls.
	 */
	class CarouselControls {
	  /**
	   * Create a CarouselControls instance.
	   * @param {Object} opts - The carousel controls options.
	   * @param {HTMLElement} opts.el - The carousel DOM node.
	   * @param {NodeListOf<HTMLElement> | HTMLElement[]} [opts.slides] - List of carousel slides.
	   * @param {number} [opts.initialSlideIndex] - Index of the first carousel slide.
	   * @param {boolean} [opts.loopSlides] - Whether the carousel should loop. Defaults to true.
	   * @param {HTMLElement} [opts.statusContainer] - Element that contains the status message templates.
	   * @param {Function} [opts.prevOnClick] - Function to override the previous button click handler.
	   * @param {Function} [opts.nextOnClick] - Function to override the next button click handler.
	   * @param {boolean} [opts.activeSlideFocus=true] - Whether element should have tabindex
	   */
	  constructor(opts) {
	    this.el = opts.el;
	    this.slides = opts.slides || this.el.querySelectorAll(Selector$p.ITEM);
	    this.currentSlideIndex = opts.initialSlideIndex || _getInitialSlideIndex.bind(this)();
	    this.loopSlides = typeof opts.loopSlides === 'boolean' ? opts.loopSlides : _shouldLoopSlides.bind(this)();
	    this.statusContainer = opts.statusContainer || _getStatusContainer.bind(this)();
	    this.prevOnClick = opts.prevOnClick || _prevBtnOnClick.bind(this);
	    this.nextOnClick = opts.nextOnClick || _nextBtnOnClick.bind(this);
	    this.backToControlsBtnOnClick = _backToControlsBtnOnClick.bind(this);
	    this.activeSlideFocus = typeof opts.activeSlideFocus === 'boolean' ? opts.activeSlideFocus : _shouldShowTabindex.bind(this)();

	    // Internal variables
	    this.isSliding = false;
	    this.didSlide = false;
	    this.touchUtil = new TouchUtil({
	      el: this.el,
	      positiveCallback: this.goToNextSlide.bind(this),
	      negativeCallback: this.goToPrevSlide.bind(this)
	    });

	    // Select control nodes
	    this.prevBtn = this.el.querySelector(Selector$p.DATA_SLIDE_PREV);
	    this.nextBtn = this.el.querySelector(Selector$p.DATA_SLIDE_NEXT);
	    this.backToControlsBtn = this.el.querySelector(Selector$p.BACK_TO_CONTROLS);
	    this.indicators = this.el.querySelector(Selector$p.INDICATORS);
	    this.itemImg = this.el.querySelectorAll(Selector$p.ITEM_IMG);
	    if (this.statusContainer) {
	      this.visibleStatusContainer = this.statusContainer.querySelector(Selector$p.VISIBLE_STATUS);
	      this.srStatusContainer = this.statusContainer.querySelector(Selector$p.SR_STATUS);
	      if (this.visibleStatusContainer) {
	        this.visibleStatusTemplate = this.visibleStatusContainer.textContent;
	      }
	      if (this.srStatusContainer) {
	        this.srStatusTemplate = this.srStatusContainer.textContent;
	      }
	    }

	    // Attach event listeners
	    this.events = _generateEvents$4.call(this);
	    Util.addEvents(this.events);
	    this.touchUtil.addEventListeners();

	    // Event listeners that need to be added/removed based on user interaction for accessibility
	    // After someone activates the next button, but before the slide animation is over, the next tab keypress
	    // needs to direct focus to the next slide
	    this.nextBtnEvents = [{
	      el: this.nextBtn,
	      type: 'keydown',
	      handler: _handleKeyDown.bind(this)
	    }, {
	      el: this.nextBtn,
	      type: 'blur',
	      handler: _removeControlEventListeners.bind(this)
	    }];

	    // Fix for product card and variable height carousels placed inside other interactive elements like tabs or modals
	    if (this.el.classList.contains(ClassName$g.PRODUCT_CARD) || this.el.classList.contains(ClassName$g.VARIABLE_HEIGHT)) {
	      this.observer = new IntersectionObserver(entries => {
	        if (entries[0].isIntersecting) {
	          _setupDom.call(this);
	        }
	      });
	      this.observer.observe(this.el);
	    }

	    // Setup DOM
	    _setupDom.bind(this)();
	  }

	  /**
	   * Remove the carousel controls event handlers.
	   */
	  remove() {
	    // Remove event listeners
	    Util.removeEvents(this.events);
	    this.touchUtil.removeEventListeners();
	    _removeControlEventListeners.call(this);

	    // Disconnect intersection observer
	    if (this.el.classList.contains(ClassName$g.PRODUCT_CARD) || this.el.classList.contains(ClassName$g.VARIABLE_HEIGHT)) {
	      this.observer.disconnect();
	    }

	    // Create and dispatch custom event
	    this[EventName$n.ON_REMOVE] = new CustomEvent(EventName$n.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$n.ON_REMOVE]);
	  }

	  /**
	   * Update the carousel controls instance.
	   * @param {Object} opts - The carousel controls options.
	   * @param {NodeListOf<HTMLElement> | HTMLElement[]} [opts.slides] - List of carousel slides.
	   * @param {number} [opts.initialSlideIndex] - Index of the first carousel slide.
	   * @param {boolean} [opts.loopSlides] - Whether the carousel should loop.
	   * @param {Function} [opts.prevOnClick] - Function to override the previous button click handler.
	   * @param {Function} [opts.nextOnClick] - Function to override the next button click handler.
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    // Remove event handlers
	    Util.removeEvents(this.events);

	    // For layered carousel layouts, remove prev and next classes from existing slides
	    if (this.el.classList.contains(ClassName$g.SNEAK_PEAK)) {
	      _removeNextPrevClasses.bind(this)();
	    }

	    // Update opts
	    if (opts.slides) {
	      this.slides = opts.slides;
	    } else {
	      this.slides = this.el.querySelectorAll(Selector$p.ITEM);
	    }
	    if (opts.initialSlideIndex) {
	      this.initialSlideIndex = opts.initialSlideIndex;
	    }
	    if (typeof opts.loopSlides === 'boolean') {
	      this.loopSlides = opts.loopSlides;
	    }
	    if (typeof opts.activeSlideFocus === 'boolean') {
	      this.activeSlideFocus = opts.activeSlideFocus;
	    }
	    if (opts.prevOnClick) {
	      this.prevOnClick = opts.prevOnClick;
	    }
	    if (opts.nextOnClick) {
	      this.nextOnClick = opts.nextOnClick;
	    }

	    // Rebuild events array
	    this.events = _generateEvents$4.call(this);

	    // Add event handlers
	    Util.addEvents(this.events);

	    // Setup DOM
	    _setupDom.bind(this)();

	    // Create and dispatch custom event
	    this[EventName$n.ON_UPDATE] = new CustomEvent(EventName$n.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$n.ON_UPDATE]);
	  }

	  /**
	   * Go forward to the next slide.
	   */
	  goToNextSlide() {
	    if (!this.isSliding && _shouldGoForward.bind(this)()) {
	      // Create and dispatch custom event
	      this[EventName$n.ON_CHANGE] = new CustomEvent(EventName$n.ON_CHANGE, {
	        bubbles: true,
	        cancelable: true
	      });
	      this.el.dispatchEvent(this[EventName$n.ON_CHANGE]);
	      if (this[EventName$n.ON_CHANGE].defaultPrevented) {
	        return;
	      }
	      _slide.bind(this)(Direction$1.NEXT, _getNextSlide.bind(this)());
	    }
	  }

	  /**
	   * Go back to the previous slide.
	   */
	  goToPrevSlide() {
	    if (!this.isSliding && _shouldGoBack.bind(this)()) {
	      // Create and dispatch custom event
	      this[EventName$n.ON_CHANGE] = new CustomEvent(EventName$n.ON_CHANGE, {
	        bubbles: true,
	        cancelable: true
	      });
	      this.el.dispatchEvent(this[EventName$n.ON_CHANGE]);
	      if (this[EventName$n.ON_CHANGE].defaultPrevented) {
	        return;
	      }
	      _slide.bind(this)(Direction$1.PREV, _getPrevSlide.bind(this)());
	    }
	  }

	  /**
	   * Go to a specific slide.
	   * @param {number} num - 0-based index of the slide to change to.
	   */
	  goToSlide(num) {
	    if (!this.isSliding) {
	      // Create and dispatch custom event
	      this[EventName$n.ON_CHANGE] = new CustomEvent(EventName$n.ON_CHANGE, {
	        bubbles: true,
	        cancelable: true
	      });
	      this.el.dispatchEvent(this[EventName$n.ON_CHANGE]);
	      if (this[EventName$n.ON_CHANGE].defaultPrevented) {
	        return;
	      }
	      _slide.bind(this)(Direction$1.PREV, _getSlide.bind(this)(num));
	    }
	  }
	}

	const carousels = [];

	/**
	 * Class representing a carousel.
	 */
	class Carousel {
	  /**
	   * Create a Carousel instance
	   * @param {Object} opts - The carousel options.
	   * @param {HTMLElement} opts.el - The carousel DOM node.
	   * @param {CarouselControls} [opts.controls] - The carousel controls instance.
	   */
	  constructor(opts) {
	    this.el = opts.el;
	    this.controls = opts.controls || new CarouselControls(opts);
	    carousels.push(this);
	  }

	  /**
	   * Remove the carousel.
	   */
	  remove() {
	    // remove any references from controls
	    this.controls.remove();
	    delete this.controls;

	    // remove this carousel reference from array of instances
	    const index = carousels.indexOf(this);
	    carousels.splice(index, 1);
	  }

	  /**
	   * Update the carousel.
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    this.controls.update(opts);
	  }

	  /**
	   * Get an array of carousel instances.
	   * @returns {Object[]} Array of carousel instances.
	   */
	  static getInstances() {
	    return carousels;
	  }
	}

	const Selector$o = {
	  DATA_MOUNT: '[data-mount="character-count"]'
	};
	const EventName$m = {
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove'
	};
	const characterCountInstances = [];
	const UPDATE_RATE_LIMIT = 400; // rate limit in ms for screen reader announcement

	/**
	 * Gets the target form element to monitor
	 * @returns {HTMLElement?} The target element
	 */
	function _getTarget$3() {
	  // Reads selector from data-target attribute
	  const selector = Util.getSelectorFromElement(this.statusMessage);

	  // There should only be one element targeted, gets the first match
	  return document.querySelector(selector);
	}

	/**
	 * Updates the textContent of a node with the most up to date character count status message
	 * @param {HTMLElement} node The node to update the textContent of
	 */
	function _updateStatusMessageText(node) {
	  const msgTemplate = this.isMaxInputReached() ? this.maxMessageTemplate : this.statusMessageTemplate;
	  const inputLength = this.getUserInputLength();
	  node.textContent = Util.interpolateString(msgTemplate, {
	    remaining: this.inputMaxLength - inputLength,
	    entered: inputLength,
	    max: this.inputMaxLength
	  });
	}

	/**
	 * Updates the visual status message only, immediately
	 */
	function _updateVisualStatusMessage() {
	  _updateStatusMessageText.call(this, this.statusMessageVisual);
	}

	/**
	 * Updates the screen reader status message only, immediately
	 */
	function _updateScreenReaderStatusMessage() {
	  _updateStatusMessageText.call(this, this.statusMessageSR);
	}

	/**
	 * Computes whether key typed is printable
	 * @param {string} keyboardEventKey
	 * @returns {Boolean} Whether the key entered is printable
	 */
	function _isPrintable(keyboardEventKey) {
	  return /^.$/.test(keyboardEventKey);
	}

	/**
	 * Causes the screen reader status message to narrate
	 */
	function _narrateStatusMessage() {
	  this.statusMessageSR.textContent = '';
	  setTimeout(() => {
	    _updateScreenReaderStatusMessage.call(this);
	  }, 200);
	}

	/**
	 * Narrates the screen reader status message if the given KeyboardEvent represents a printable character
	 * @param {KeyboardEvent} keyboardEvent
	 */
	function _narrateIfMaxInputAndPrintableKey(keyboardEvent) {
	  if (this.isMaxInputReached() && _isPrintable(keyboardEvent.key)) {
	    _narrateStatusMessage.call(this);
	  }
	}
	class CharacterCount {
	  /**
	   * Create a CharacterCount instance
	   * @param {Object} opts The CharacterCount options
	   * @param {HTMLElement} opts.el The node that wraps the status message elements and stores configuration information
	   */
	  constructor(opts) {
	    this.statusMessage = opts.el;
	    this.statusMessageSR = this.statusMessage.querySelector('.sr-only');
	    this.statusMessageVisual = this.statusMessage.querySelector(':not(.sr-only)');
	    this.target = _getTarget$3.call(this);
	    this.inputMaxLength = Number(this.target.getAttribute('maxLength'));
	    this.statusMessageTemplate = this.statusMessage.getAttribute('data-status-msg-template');
	    this.maxMessageTemplate = this.statusMessage.getAttribute('data-max-msg-template');
	    this.debouncedSRUpdate = debounce(UPDATE_RATE_LIMIT, () => {
	      _updateScreenReaderStatusMessage.call(this);
	    });
	    this.srLowCharWarnLvl = Number(this.statusMessage.getAttribute('data-sr-low-char-warning-lvl'));
	    this.userHasBeenWarned = false;
	    this.ariaLiveWasReset = false;

	    // Add event handlers
	    this.events = [{
	      el: this.target,
	      type: 'input',
	      handler: this.updateStatusMessage.bind(this)
	    }, {
	      el: this.target,
	      type: 'keydown',
	      handler: _narrateIfMaxInputAndPrintableKey.bind(this)
	    }, {
	      el: this.target,
	      type: 'focus',
	      handler: _narrateStatusMessage.bind(this)
	    }];
	    Util.addEvents(this.events);

	    // Initialize visual message
	    _updateVisualStatusMessage.call(this);

	    // push to instances list
	    characterCountInstances.push(this);
	  }

	  /**
	   * Get the length of the current value of the monitored form element
	   * @returns {Number} The length of the value
	   */
	  getUserInputLength() {
	    return this.target.value.length;
	  }

	  /**
	   * Determine whether the max input length has been reached
	   * @returns {Boolean} Whether the max input length has been reached
	   */
	  isMaxInputReached() {
	    return this.getUserInputLength() === this.inputMaxLength;
	  }

	  /**
	   * Determine whether the low character warning level has been met
	   * @returns {Boolean} Whether the low character warning level has been met
	   */
	  isInputAtOrBelowLowCharWarnLvl() {
	    return this.inputMaxLength - this.getUserInputLength() <= this.srLowCharWarnLvl;
	  }

	  /**
	   * Updates both status messages. The visual one immediately, the screen reader in a debounced manner.
	   */
	  updateStatusMessage() {
	    if (this.isInputAtOrBelowLowCharWarnLvl()) {
	      this.userHasBeenWarned = true;
	    } else {
	      this.userHasBeenWarned = false;
	    }
	    this.debouncedSRUpdate();
	    _updateVisualStatusMessage.call(this);
	    // maxInput not reached && user has been warned && aria live was not reset
	    if (!this.isMaxInputReached() && this.userHasBeenWarned && !this.ariaLiveWasReset) {
	      this.statusMessageSR?.setAttribute('aria-live', 'polite');
	    }
	    if (this.isMaxInputReached() || !this.userHasBeenWarned && this.isInputAtOrBelowLowCharWarnLvl()) {
	      this.debouncedSRUpdate.cancel();
	      this.statusMessageSR?.setAttribute('aria-live', 'assertive');
	      _updateScreenReaderStatusMessage.call(this);
	    }
	  }

	  /**
	   * Updates the object by re-reading all configuration options stored in the DOM
	   */
	  update() {
	    this.target = _getTarget$3.call(this);
	    this.inputMaxLength = Number(this.target.getAttribute('maxLength'));
	    this.statusMessageTemplate = this.statusMessage.getAttribute('data-status-msg-template');
	    this.maxMessageTemplate = this.statusMessage.getAttribute('data-max-msg-template');
	    this.debouncedSRUpdate = debounce(UPDATE_RATE_LIMIT, () => {
	      _updateScreenReaderStatusMessage.call(this);
	    });
	    this.srLowCharWarnLvl = Number(this.statusMessage.getAttribute('data-sr-low-char-warning-lvl'));
	    this.userHasBeenWarned = false;
	    this.ariaLiveWasReset = false;

	    // Create and dispatch custom event
	    this[EventName$m.ON_UPDATE] = new CustomEvent(EventName$m.ON_UPDATE, {
	      bubbles: true
	    });
	    this.statusMessage.dispatchEvent(this[EventName$m.ON_UPDATE]);
	  }

	  /**
	   * Removes the CharacterCount instance
	   */
	  remove() {
	    Util.removeEvents(this.events);
	    const index = characterCountInstances.indexOf(this);
	    characterCountInstances.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$m.ON_REMOVE] = new CustomEvent(EventName$m.ON_REMOVE, {
	      bubbles: true
	    });
	    this.statusMessage.dispatchEvent(this[EventName$m.ON_REMOVE]);
	  }

	  /**
	   * Gets the array of CharacterCount instances
	   * @returns {Object[]} Array of CharacterCount instances
	   */
	  static getInstances() {
	    return characterCountInstances;
	  }
	}

	const Selector$n = {
	  DATA_MOUNT: '[data-mount="click-group"]'
	};
	const EventName$l = {
	  ON_CLICK: 'onClick',
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate'
	};
	const clickGroups = [];

	/**
	 * Private functions.
	 */

	function _getTarget$2() {
	  const selector = this.el.dataset.target;
	  if (selector) {
	    return document.querySelector(`#${selector}`);
	  }
	  const firstLink = this.el.getElementsByTagName('a')[0];
	  return firstLink ?? null;
	}

	/**
	 * @this {ClickGroup}
	 */
	function _onElClick(e) {
	  if (e.target !== this.target) {
	    // Create and dispatch custom event
	    this[EventName$l.ON_CLICK] = new CustomEvent(EventName$l.ON_CLICK, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.el.dispatchEvent(this[EventName$l.ON_CLICK]);
	    if (this[EventName$l.ON_CLICK].defaultPrevented) {
	      return;
	    }
	    this.target.click();
	  }
	}

	/**
	 * Class representing a click group.
	 */
	class ClickGroup {
	  /**
	   * Create a ClickGroup instance
	   * @param {Object} opts - The click group options.
	   * @param {HTMLElement} opts.el - The click group DOM node.
	   * @param {HTMLElement} [opts.target] - Element that contains the target of the click group.
	   * @param {Function} [opts.onClick] - Function to override the click group click handler.
	   */
	  constructor(opts) {
	    this.el = opts.el;
	    this.target = opts.target || _getTarget$2.call(this);
	    this.onClick = opts.onClick || _onElClick.bind(this);
	    this.events = [];

	    // Check for multiple links and/or buttons, which would present an a11y problem
	    if (this.el.querySelectorAll('a, button').length > 1) {
	      this.target = null;
	      // TODO: add error message notifying multiple clickable descendants found
	      // Related ticket: https://dev.azure.com/mscomdev/Moray/_workitems/edit/4494
	    }

	    if (this.target) {
	      this.el.style.cursor = 'pointer';
	      this.events = [{
	        el: this.el,
	        type: 'click',
	        handler: this.onClick
	      }];
	      Util.addEvents(this.events);
	    }
	    // TODO: add error message in an else block, notifying clickable target not found
	    // Related ticket: https://dev.azure.com/mscomdev/Moray/_workitems/edit/4494

	    clickGroups.push(this);
	  }

	  /**
	   * Update the click group.
	   * @param {Object} opts - The click group options.
	   * @param {Function} [opts.onClick] - Function to override the click group click handler.
	   * @param {HTMLElement} [opts.target] - Node that contains the target of the click group.
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    if (opts) {
	      if (opts.onClick) {
	        this.onClick = opts.onClick;
	      }
	      if (opts.target) {
	        this.target = opts.target;
	      }
	      if ((opts.onClick || opts.target) && this.target && this.onClick) {
	        Util.removeEvents(this.events);
	        this.events = [{
	          el: this.el,
	          type: 'click',
	          handler: this.onClick
	        }];
	        Util.addEvents(this.events);
	      }
	    }

	    // Create and dispatch custom event
	    this[EventName$l.ON_UPDATE] = new CustomEvent(EventName$l.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$l.ON_UPDATE]);
	  }

	  /**
	   * Remove the click group.
	   */
	  remove() {
	    if (this.target) {
	      this.el.style.cursor = '';
	      Util.removeEvents(this.events);
	    }
	    const index = clickGroups.indexOf(this);
	    clickGroups.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$l.ON_REMOVE] = new CustomEvent(EventName$l.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$l.ON_REMOVE]);
	  }

	  /**
	   * Get an array of click group instances.
	   * @returns {Object[]} Array of click group instances.
	   */
	  static getInstances() {
	    return clickGroups;
	  }
	}

	const instances$8 = [];
	const EventName$k = {
	  SHOW: 'onShow',
	  SHOWN: 'onShown',
	  HIDE: 'onHide',
	  HIDDEN: 'onHidden',
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate'
	};
	const ClassName$f = {
	  SHOW: 'show',
	  COLLAPSE: 'collapse',
	  COLLAPSING: 'collapsing',
	  COLLAPSED: 'collapsed'
	};
	const Dimension = {
	  WIDTH: 'width',
	  HEIGHT: 'height'
	};
	const Selector$m = {
	  ACTIVES: '.show, .collapsing',
	  DATA_MOUNT: '[data-mount="collapse"]'
	};
	function _getDimension() {
	  const hasWidth = this.el.classList.contains(Dimension.WIDTH);
	  return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
	}
	function _addAriaAndCollapsedClass(element, triggerArray) {
	  const isOpen = element.classList.contains(ClassName$f.SHOW);
	  if (triggerArray.length) {
	    triggerArray.forEach(triggerItem => {
	      triggerItem.classList.toggle(ClassName$f.COLLAPSED, !isOpen);
	      triggerItem.setAttribute('aria-expanded', isOpen);
	    });
	  }
	}
	var _getCollapses = /*#__PURE__*/_classPrivateFieldLooseKey("getCollapses");
	var _areSiblingsTransitioning = /*#__PURE__*/_classPrivateFieldLooseKey("areSiblingsTransitioning");
	class Collapse {
	  /**
	   * Create a Collapse instance
	   * @param {Object} opts - the Collapse options
	   * @param {HTMLElement} opts.el - the Collapse trigger element
	   * @param {boolean} [opts.toggle=false] - whether to toggle the Collapse on initialization
	   * @param {HTMLElement} [opts.parent] - the parent (accordion) element for group management
	   * @param {boolean} [opts.addEventListener=true] - whether to add event listeners on Collapse trigger *Possible carryover from Bootstrap
	   */
	  constructor(_ref) {
	    let {
	      el,
	      toggle = false,
	      parent,
	      addEventListener = true
	    } = _ref;
	    Object.defineProperty(this, _areSiblingsTransitioning, {
	      value: _areSiblingsTransitioning2
	    });
	    Object.defineProperty(this, _getCollapses, {
	      value: _getCollapses2
	    });
	    this.isTransitioning = false;
	    this.isCollapsed = true;
	    this.triggerElement = el;
	    if (this.triggerElement.getAttribute('aria-expanded').toString() === 'true') {
	      this.isCollapsed = false;
	    }

	    // Get the affected selectors
	    const selector = Util.getSelectorFromElement(this.triggerElement);
	    this.el = document.querySelector(selector);

	    // The toggleArray is all of the buttons that control this Collapse's content
	    this.toggleArray = Array.from(document.querySelectorAll(`[href="#${this.el.id}"],[data-target="#${this.el.id}"]`));
	    this.events = [];

	    // Create custom events.
	    this[EventName$k.SHOWN] = new CustomEvent(EventName$k.SHOWN);
	    this[EventName$k.HIDDEN] = new CustomEvent(EventName$k.HIDDEN);

	    // Find all auto-initialized Collapse buttons
	    const toggleList = Array.from(document.querySelectorAll(Selector$m.DATA_MOUNT));
	    toggleList.forEach(elem => {
	      // Find buttons with same the data-target as the triggerElement
	      const selector = Util.getSelectorFromElement(elem);
	      const filterElement = Array.from(document.querySelectorAll(selector)).filter(foundElem => foundElem === this.triggerElement);

	      // If any buttons have the same data-target as the triggerElement, add them to the toggleArray
	      if (selector !== null && filterElement.length) {
	        this.toggleArray.push(elem);
	      }
	    });
	    this.parent = this.el.getAttribute('data-parent');
	    if (!parent) {
	      _addAriaAndCollapsedClass.bind(this)(this.el, this.toggleArray);
	    }
	    if (toggle) {
	      this.toggle();
	    }

	    // Add event handlers
	    if (addEventListener) {
	      this.events = [{
	        el,
	        type: 'click',
	        handler: event => {
	          // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
	          if (event.currentTarget.tagName === 'A') {
	            event.preventDefault();
	          }

	          // If other collapses are transitioning, prevent interaction with this one
	          if (_classPrivateFieldLooseBase(this, _areSiblingsTransitioning)[_areSiblingsTransitioning]()) {
	            return;
	          }
	          this.toggle();
	        }
	      }];
	      Util.addEvents(this.events);
	    }
	    instances$8.push(this);
	  }
	  /**
	   * Toggles the collapse from show to hide and vice versa
	   */
	  toggle() {
	    if (this.el.classList.contains(ClassName$f.SHOW)) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  }

	  /**
	   * Shows the collapse
	   */
	  show() {
	    if (this.isTransitioning || this.el.classList.contains(ClassName$f.SHOW)) {
	      return;
	    }

	    // Create and dispatch custom event
	    this[EventName$k.SHOW] = new CustomEvent(EventName$k.SHOW, {
	      cancelable: true
	    });
	    this.el.dispatchEvent(this[EventName$k.SHOW]);
	    if (this[EventName$k.SHOW].defaultPrevented) {
	      return;
	    }
	    const dimension = _getDimension.bind(this)();
	    this.el.classList.remove(ClassName$f.COLLAPSE);
	    this.el.classList.add(ClassName$f.COLLAPSING);
	    this.el.style[dimension] = 0;
	    if (this.toggleArray.length) {
	      this.toggleArray.forEach(elem => {
	        elem.classList.remove(ClassName$f.COLLAPSED);
	        elem.setAttribute('aria-expanded', 'true');
	      });
	    }
	    this.isTransitioning = true;

	    // If we have a parent (group management), hide the other elements when other is shown
	    if (this.parent) {
	      const collapseInstances = _classPrivateFieldLooseBase(this, _getCollapses)[_getCollapses]();
	      collapseInstances.forEach(collapse => {
	        if (collapse !== this && collapse.parent === this.parent && !collapse.isCollapsed) {
	          // Hide the collapse
	          collapse.toggle();
	        }
	      });
	    }
	    const complete = () => {
	      this.el.classList.remove(ClassName$f.COLLAPSING);
	      this.el.classList.add(ClassName$f.COLLAPSE);
	      this.el.classList.add(ClassName$f.SHOW);
	      this.el.style[dimension] = '';
	      this.isTransitioning = false;
	      this.isCollapsed = false;
	      this.el.dispatchEvent(this[EventName$k.SHOWN]);
	    };
	    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	    const scrollSize = `scroll${capitalizedDimension}`;
	    const transitionDuration = Util.getTransitionDurationFromElement(this.el);
	    this.el.addEventListener(Util.TRANSITION_END, complete.bind(this), {
	      once: true
	    });
	    Util.emulateTransitionEnd(this.el, transitionDuration);
	    this.el.style[dimension] = `${this.el[scrollSize]}px`;
	  }

	  /**
	   * Hides the collapse
	   */
	  hide() {
	    if (this.isTransitioning || !this.el.classList.contains(ClassName$f.SHOW)) {
	      return;
	    }

	    // Create and dispatch custom event
	    this[EventName$k.HIDE] = new CustomEvent(EventName$k.HIDE, {
	      cancelable: true
	    });
	    this.el.dispatchEvent(this[EventName$k.HIDE]);
	    if (this[EventName$k.HIDE].defaultPrevented) {
	      return;
	    }
	    const dimension = _getDimension.bind(this)();
	    this.el.style[dimension] = `${this.el.getBoundingClientRect()[dimension]}px`;
	    Util.reflow(this.el);
	    this.el.classList.add(ClassName$f.COLLAPSING);
	    this.el.classList.remove(ClassName$f.COLLAPSE);
	    this.el.classList.remove(ClassName$f.SHOW);
	    this.toggleArray.forEach(toggle => {
	      const toggleSelector = Util.getSelectorFromElement(toggle);
	      if (toggleSelector !== null) {
	        const toggleArray = Array.from(document.querySelectorAll(toggleSelector));
	        toggleArray.forEach(el => {
	          if (!el.classList.contains(ClassName$f.SHOW)) {
	            toggle.classList.add(ClassName$f.COLLAPSED);
	            toggle.setAttribute('aria-expanded', 'false');
	          }
	        });
	      }
	    });
	    this.isTransitioning = true;
	    const complete = () => {
	      this.isTransitioning = false;
	      this.el.classList.remove(ClassName$f.COLLAPSING);
	      this.el.classList.add(ClassName$f.COLLAPSE);
	      this.isCollapsed = true;
	      this.el.dispatchEvent(this[EventName$k.HIDDEN]);
	    };
	    this.el.style[dimension] = '';
	    const transitionDuration = Util.getTransitionDurationFromElement(this.el);
	    this.el.addEventListener(Util.TRANSITION_END, complete.bind(this), {
	      once: true
	    });
	    Util.emulateTransitionEnd(this.el, transitionDuration);
	  }

	  /**
	   * Update instance
	   */
	  update() {
	    // Create and dispatch custom event
	    this[EventName$k.ON_UPDATE] = new CustomEvent(EventName$k.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$k.ON_UPDATE]);
	  }

	  /**
	   * Remove the event listener and the instance
	   */
	  remove() {
	    Util.removeEvents(this.events);

	    // remove this collapse reference from array of instances
	    const index = instances$8.indexOf(this);
	    instances$8.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$k.ON_REMOVE] = new CustomEvent(EventName$k.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$k.ON_REMOVE]);
	  }

	  /**
	   * Get instances.
	   * @returns {Object[]} An array of instances
	   */
	  static getInstances() {
	    return instances$8;
	  }
	}
	function _getCollapses2() {
	  let collapses = [];
	  if (this.parent) {
	    collapses = Collapse.getInstances();
	  }
	  return collapses;
	}
	function _areSiblingsTransitioning2() {
	  const collapses = _classPrivateFieldLooseBase(this, _getCollapses)[_getCollapses]();
	  let isTransitioning = false;
	  collapses.forEach(collapse => {
	    if (collapse !== this && collapse.parent === this.parent && collapse.isTransitioning) {
	      isTransitioning = true;
	    }
	  });
	  return isTransitioning;
	}

	const instances$7 = [];
	const Selector$l = {
	  DATA_MOUNT: '[data-mount="collapse-controls"]',
	  DATA_ACTION_COLLAPSE: '[data-action="collapse"]',
	  DATA_ACTION_EXPAND: '[data-action="expand"]'
	};
	function _getTarget$1(el) {
	  const selector = Util.getSelectorFromElement(el);
	  return [].slice.call(document.querySelectorAll(selector));
	}
	function _syncDisabledStyle() {
	  let openCount = 0;
	  this.collapseList.forEach(collapse => {
	    if (!collapse.isCollapsed) {
	      openCount++;
	    }
	  });
	  if (openCount === this.collapseListCount) {
	    _enableButton(this.collapse);
	    _disableButton(this.expand);
	  } else if (openCount === 0) {
	    _enableButton(this.expand);
	    _disableButton(this.collapse);
	  } else {
	    _enableButton(this.expand);
	    _enableButton(this.collapse);
	  }
	}
	function _disableButton(elem) {
	  elem.setAttribute('aria-pressed', true);
	  elem.setAttribute('aria-disabled', true);
	  elem.setAttribute('tabindex', '-1');
	  elem.classList.add('inactive');
	}
	function _enableButton(elem) {
	  elem.setAttribute('aria-pressed', false);
	  elem.setAttribute('aria-disabled', false);
	  elem.removeAttribute('tabindex');
	  elem.classList.remove('inactive');
	}
	class CollapseControls {
	  /**
	   * Create a CollapseControls instance
	   * @param {Object} opts - The CollapseControls options
	   * @param {HTMLElement} opts.el - The CollapseControls DOM node.
	   * @param {Collapse[]} [opts.collapses] - The list of Collapse instances.
	   *
	   */
	  constructor(opts) {
	    this.el = opts.el;
	    this.accordion = _getTarget$1(this.el)[0];
	    this.collapse = this.el.querySelector(Selector$l.DATA_ACTION_COLLAPSE);
	    this.expand = this.el.querySelector(Selector$l.DATA_ACTION_EXPAND);
	    this.collapseList = opts.collapses || [];

	    // Auto initialization OR manual initialization without collapses option
	    if (!this.collapseList.length) {
	      const collapseTriggers = this.accordion.querySelectorAll(Selector$m.DATA_MOUNT);

	      // Find Collapse instances and push Collapses with matching triggers into Collapse array
	      const collapseInstances = Collapse.getInstances();
	      collapseTriggers.forEach(el => {
	        this.collapseList.push(collapseInstances.find(collapse => collapse.triggerElement === el));
	      });

	      // If no Collapses are found, do not initialize CollapseControls
	      if (!this.collapseList.length) {
	        throw new Error('Collapses must be auto-initialized or passed in as an option.');
	      }
	    }
	    this.collapseListCount = this.collapseList.length;
	    this.openCount = 0;
	    this.events = [{
	      el: this.collapse,
	      type: 'click',
	      handler: this.collapseAll.bind(this)
	    }, {
	      el: this.expand,
	      type: 'click',
	      handler: this.expandAll.bind(this)
	    }];
	    this.collapseList.forEach(collapse => {
	      // Add shown/hidden handlers to each Collapse
	      this.events.push({
	        el: collapse.el,
	        type: EventName$k.SHOWN,
	        handler: _syncDisabledStyle.bind(this)
	      }, {
	        el: collapse.el,
	        type: EventName$k.HIDDEN,
	        handler: _syncDisabledStyle.bind(this)
	      });
	    });
	    Util.addEvents(this.events);
	    _syncDisabledStyle.call(this);
	    instances$7.push(this);
	  }

	  /**
	   * Collapse all the elements
	   */
	  collapseAll() {
	    this.collapseList.forEach(element => {
	      element.hide();
	    });
	    this.openCount = 0;
	    _syncDisabledStyle.call(this);
	  }

	  /**
	   * Update instance (added for API consistency)
	   */
	  update() {
	    // Create and dispatch custom event
	    this[EventName$k.ON_UPDATE] = new CustomEvent(EventName$k.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$k.ON_UPDATE]);
	  }

	  /**
	   * Expand all the elements
	   */
	  expandAll() {
	    this.collapseList.forEach(element => {
	      element.show();
	      this.openCount = this.collapseListCount;
	    });
	    _syncDisabledStyle.call(this);
	  }

	  /**
	   * Remove the event listeners and the instance
	   */
	  remove() {
	    Util.removeEvents(this.events);

	    // Remove this collapse reference from array of instances
	    const index = instances$7.indexOf(this);
	    instances$7.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$k.ON_REMOVE] = new CustomEvent(EventName$k.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$k.ON_REMOVE]);
	  }

	  /**
	   * Get instances.
	   * @returns {CollapseControls[]} An array of instances
	   */
	  static getInstances() {
	    return instances$7;
	  }
	}

	const controlElements = [];
	// YIQ Threshold for color changes
	const yiqContrastedThreshold = 128;
	const EventName$j = {
	  ON_CHANGE: 'onChange',
	  ON_REMOVE: 'onRemove',
	  CHANGE: 'change'
	};
	const Selector$k = {
	  COLOR_PICKER_DOT: '.color-picker-dot'
	};
	const Attributes$1 = {
	  DATA_CONTROLS: 'data-controls',
	  IMAGE: 'data-color-picker-image',
	  ID: 'id',
	  SRC: 'src'
	};
	const ClassName$e = {
	  COLOR_LIGHT: 'color-picker-dot-light'
	};

	/**
	 * Perform the calculations to figure out color of elements
	 */
	function _initializeColor() {
	  const id = this.el.getAttribute(Attributes$1.ID);
	  const label = this.el.parentNode.querySelector(`label[for="${id}"]`);
	  const {
	    backgroundColor
	  } = label.querySelector(Selector$k.COLOR_PICKER_DOT).style;
	  const rgbObject = Util.getRGB(backgroundColor);
	  const darkColor = {
	    r: 0,
	    g: 0,
	    b: 0
	  };
	  const darkYiq = Util.getYiq(darkColor);
	  const bgYiq = Util.getYiq(rgbObject);
	  if (Math.floor(Math.abs(bgYiq - darkYiq)) > yiqContrastedThreshold) {
	    label.classList.add(ClassName$e.COLOR_LIGHT);
	  }
	}
	function _resetBorderColor(el) {
	  el.style.borderColor = '';
	}
	function _setBorderColor(el) {
	  const id = el.getAttribute(Attributes$1.ID);
	  const theLabel = this.colorPickerEl.querySelector(`label[for="${id}"]`);
	  const selectedDot = theLabel.querySelector(Selector$k.COLOR_PICKER_DOT);
	  let {
	    backgroundColor
	  } = selectedDot.style;
	  if (selectedDot.getAttribute('data-color')) {
	    backgroundColor = selectedDot.getAttribute('data-color');
	  }
	  selectedDot.style.borderColor = `${backgroundColor}`;
	}
	class ColorPickerControl {
	  /**
	   * Create a ColorPickerControl instance
	   * @param {object} opts - the ColorPickerControl options
	   * @param {HTMLElement} opts.el - the ColorPickerControl element
	   * @param {HTMLElement} opts.containerTarget - the image container target
	   * @param {HTMLElement} opts.colorNameEl - the color name container target
	   * @param {HTMLElement} opts.colorPickerEl -
	   */
	  constructor(opts) {
	    this.el = opts.el;
	    this.containerTarget = opts.containerTarget;
	    this.colorNameEl = opts.colorNameTarget;
	    this.colorPickerEl = opts.colorPickerEl || this.el.parentNode;
	    _initializeColor.bind(this)();
	    if (this.el.checked) {
	      _setBorderColor.call(this, this.el);
	    }
	    this.events = [{
	      el: this.el,
	      type: EventName$j.CHANGE,
	      handler: e => this._controlListener(e, this.containerTarget)
	    }];
	    Util.addEvents(this.events);
	    controlElements.push(this);
	  }

	  /**
	   * Event handler for change events
	   * @param {event} e Event
	   * @param {HTMLElement} imageContainer a reference to the image container
	   */
	  _controlListener(e, imageContainer) {
	    const nodes = Array.from(this.colorPickerEl.querySelectorAll(Selector$k.COLOR_PICKER_DOT));
	    nodes.forEach(i => _resetBorderColor(i));
	    const colorName = e.target.getAttribute('data-color-name');
	    _setBorderColor.call(this, e.target);
	    this.colorNameEl.textContent = colorName;
	    if (imageContainer) {
	      const nodeName = imageContainer.nodeName.toLowerCase();
	      const imageUrl = e.target.getAttribute(Attributes$1.IMAGE);
	      const event = new CustomEvent(EventName$j.ON_CHANGE, {
	        element: imageContainer.getAttribute(Attributes$1.ID),
	        imageUrl
	      });
	      if (imageUrl) {
	        // Figure out whether it's an image element or not
	        if (nodeName === 'img') {
	          imageContainer.setAttribute(Attributes$1.SRC, imageUrl);
	        } else {
	          imageContainer.style.backgroundImage = `url(${imageUrl})`;
	        }
	        imageContainer.dispatchEvent(event);
	      }
	    }
	  }

	  /**
	   * Get an array of color picker control instances
	   * @returns {ColorPickerControl[]} color picker control instances
	   */
	  static getInstances() {
	    return controlElements;
	  }

	  /**
	   * Remove the color picker control instance
	   */
	  remove() {
	    Util.removeEvents(this.events);
	    const index = controlElements.indexOf(this);
	    controlElements.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$j.ON_REMOVE] = new CustomEvent(EventName$j.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$j.ON_REMOVE]);
	  }
	}

	const Selector$j = {
	  CONTROL: 'input',
	  DATA_MOUNT: '[data-mount="color-picker"]',
	  CHECKED: ':checked',
	  COLOR_NAME: 'data-color-picker-color-name'
	};
	const Attributes = {
	  DATA_CONTROLS: 'data-controls',
	  IMAGE: 'data-color-picker-image'
	};
	const colorPickers = [];
	function _initializeImageSrc() {
	  // Find all the fieldsets that have a target
	  const currentFieldSet = this.el;
	  const nodeName = this.containerTarget ? this.containerTarget.nodeName.toLowerCase() : null;
	  const defaultElement = currentFieldSet.querySelector(Selector$j.CHECKED);
	  // Set the default selected image
	  if (defaultElement) {
	    const imageUrl = defaultElement.getAttribute(Attributes.IMAGE);
	    if (imageUrl && nodeName) {
	      if (nodeName !== 'img') {
	        console.warn(`ColorPicker’s \`data-controls\` attribute must resolve to a valid ID of an <img> element. <${nodeName}> element found.`);
	      }
	      this.containerTarget.setAttribute('src', imageUrl);
	    }
	  }
	}

	/**
	 * Initializes an instance, helper for constructor and update function
	 * @param {Object} opts the ColorPicker init options
	 * @returns {Object} the initialized or update instance of ColorPicker
	 */
	function _initInstance(opts) {
	  this.el = opts && opts.el || this.el;
	  const spanId = this.el.getAttribute(Selector$j.COLOR_NAME);
	  const colorNameEl = this.el.querySelector(`#${spanId}`);
	  this.colorNameContainer = colorNameEl;
	  if (!this.el) {
	    // abort init if no valid base element
	    return this;
	  }
	  const controlElement = this.el.getAttribute(Attributes.DATA_CONTROLS);
	  if (controlElement) {
	    this.containerTarget = document.querySelector(`#${controlElement}`);
	    _initializeImageSrc.call(this);
	  }
	  this.controls = [];
	  const controls = this.el.querySelectorAll(Selector$j.CONTROL);
	  // Iterate through our controls, adding an event listener to change the image
	  controls.forEach(control => {
	    this.controls.push(new ColorPickerControl({
	      el: control,
	      containerTarget: this.containerTarget,
	      colorNameTarget: this.colorNameContainer,
	      colorPickerEl: this.el
	    }));
	  });
	  return this;
	}

	/**
	 * Class for ColorPicker overall. Spawns instances of ColorPickerControl for each color
	 */
	class ColorPicker {
	  /**
	   * Create a ColorPicker instance
	   * @param {Object} opts - The ColorPicker options.
	   * @param {HTMLElement} opts.el - The ColorPicker DOM node.
	   */
	  constructor(opts) {
	    // initialize the instance and push it to the master list
	    colorPickers.push(_initInstance.call(this, opts));
	  }

	  /**
	   * Get an array of color picker instances
	   * @returns {ColorPicker[]} color picker instances
	   */
	  static getInstances() {
	    return colorPickers;
	  }

	  /**
	   * Re-initializes the instance
	   * @param {Object} opts - The ColorPicker options.
	   * @param {HTMLElement} [opts.el] - The ColorPicker DOM node.
	   */
	  update(opts) {
	    Util.tearDownComponentList(this.controls);
	    _initInstance.call(this, opts);
	  }

	  /**
	   * Remove the color picker instance
	   */
	  remove() {
	    // Call remove on each of the ColorPickerControls
	    Util.tearDownComponentList(this.controls);
	    const index = colorPickers.indexOf(this);
	    colorPickers.splice(index, 1);
	  }
	}

	const Selector$i = {
	  DATA_MOUNT: '[data-mount="combobox-select"]',
	  DATA_TEXT: '[data-combobox-text]',
	  ROLE_COMBOBOX: '[role=combobox]',
	  ROLE_LISTBOX: '[role=listbox]',
	  ROLE_OPTION: '[role=option]'
	};
	const EventName$i = {
	  BLUR: 'blur',
	  CLICK: 'click',
	  KEYDOWN: 'keydown',
	  MOUSEDOWN: 'mousedown',
	  ON_CHANGE: 'onChange',
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate'
	};
	const ClassName$d = {
	  ITEM: 'combobox-item',
	  CURRENT_ITEM: 'current-item'
	};

	// option count for PageUp/PageDown keys
	const PAGE_SIZE = 10;
	// duration to reset type search timeout
	const TIMEOUT_MS = 500;

	/**
	 * Save a list of named combobox actions for readability
	 * @enum {number}
	 */
	const SelectAction = {
	  Close: 0,
	  CloseSelect: 1,
	  First: 2,
	  Last: 3,
	  Next: 4,
	  Open: 5,
	  PageDown: 6,
	  PageUp: 7,
	  Previous: 8,
	  // Select: 9,
	  Type: 10
	};
	const {
	  ARROW_DOWN: ARROW_DOWN$1,
	  ARROW_UP: ARROW_UP$1,
	  BACKSPACE,
	  CLEAR,
	  ENTER: ENTER$1,
	  END,
	  ESC: ESC$1,
	  HOME,
	  PAGE_DOWN,
	  PAGE_UP,
	  SPACE: SPACE$1
	} = Util.keys;
	const instances$6 = [];

	/**
	 * Get filtered array of options given an input string
	 * @param {string} filter - string against which to compare options
	 * @param {string[]} options - array of options to filter
	 * @param {string[]} exclude - array of options to exclude from filter/search
	 * @returns {string[]} - array of options that begin with the filter string, case-independent
	 */
	function getFilteredOptions(filter, options, exclude) {
	  if (options === void 0) {
	    options = [];
	  }
	  if (exclude === void 0) {
	    exclude = [];
	  }
	  return options.filter(option => {
	    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
	    return matches && exclude.indexOf(option) < 0;
	  });
	}

	/**
	 * Map a key press to an action
	 * @param {KeyboardEvent} event - the key press event
	 * @param {boolean} menuOpen – whether the listbox menu is open
	 * @returns {SelectAction}
	 */
	// eslint-disable-next-line complexity
	function getActionFromKey(event, menuOpen) {
	  const {
	    key,
	    altKey,
	    ctrlKey,
	    metaKey
	  } = event;
	  const openKeys = [ARROW_DOWN$1, ARROW_UP$1, ENTER$1, SPACE$1]; // keys that perform "Open" action

	  switch (true) {
	    // handle opening when closed
	    case !menuOpen && openKeys.includes(key):
	      {
	        return SelectAction.Open;
	      }

	    // home and end move the selected option when open or closed
	    case key === HOME:
	      {
	        return SelectAction.First;
	      }
	    case key === END:
	      {
	        return SelectAction.Last;
	      }

	    // handle typing characters when open or closed
	    case key === BACKSPACE:
	    case key === CLEAR:
	    case key.length === 1 && key !== SPACE$1 && !altKey && !ctrlKey && !metaKey:
	      {
	        return SelectAction.Type;
	      }
	    default:
	      {
	        // handle keys when open
	        if (menuOpen) {
	          switch (true) {
	            case key === ARROW_UP$1 && altKey:
	              {
	                return SelectAction.CloseSelect;
	              }
	            case key === ARROW_DOWN$1 && !altKey:
	              {
	                return SelectAction.Next;
	              }
	            case key === ARROW_UP$1:
	              {
	                return SelectAction.Previous;
	              }
	            case key === PAGE_UP:
	              {
	                return SelectAction.PageUp;
	              }
	            case key === PAGE_DOWN:
	              {
	                return SelectAction.PageDown;
	              }
	            case key === ESC$1:
	              {
	                return SelectAction.Close;
	              }
	            case key === ENTER$1:
	            case key === SPACE$1:
	              {
	                return SelectAction.CloseSelect;
	              }
	          }
	        }
	      }
	  }
	}

	/**
	 * Get the index of an option from an array of options, based on a search string.
	 * If the filter is multiple iterations of the same letter (e.g "aaa"), cycle through first-letter matches
	 * @param {string[]} options - list of menu options (text content)
	 * @param {string} filter - typed key input
	 * @param {number} [startIndex=0]
	 * @returns {number} option index
	 */
	function getIndexByLetter(options, filter, startIndex) {
	  if (startIndex === void 0) {
	    startIndex = 0;
	  }
	  const orderedOptions = [...options.slice(startIndex), ...options.slice(0, startIndex)];
	  const firstMatch = getFilteredOptions(filter, orderedOptions)[0];
	  const allSameLetter = array => array.every(letter => letter === array[0]); // eslint-disable-line unicorn/consistent-function-scoping

	  // first check if there is an exact match for the typed string
	  if (firstMatch) {
	    return options.indexOf(firstMatch);
	  }

	  // if the same letter is being repeated, cycle through first-letter matches
	  if (allSameLetter(filter.split(''))) {
	    const matches = getFilteredOptions(filter[0], orderedOptions);
	    return options.indexOf(matches[0]);
	  }

	  // if no matches, return -1
	  return -1;
	}

	/**
	 * Get an updated option index after performing an action
	 * @param {number} currentIndex
	 * @param {number} maxIndex - index to set max range to change key input
	 * @param {SelectAction} action - a SelectAction
	 * @returns {number} new option index
	 */
	function getUpdatedIndex(currentIndex, maxIndex, action) {
	  switch (action) {
	    case SelectAction.First:
	      {
	        return 0;
	      }
	    case SelectAction.Last:
	      {
	        return maxIndex;
	      }
	    case SelectAction.Previous:
	      {
	        return Math.max(0, currentIndex - 1);
	      }
	    case SelectAction.Next:
	      {
	        return Math.min(maxIndex, currentIndex + 1);
	      }
	    case SelectAction.PageUp:
	      {
	        return Math.max(0, currentIndex - PAGE_SIZE);
	      }
	    case SelectAction.PageDown:
	      {
	        return Math.min(maxIndex, currentIndex + PAGE_SIZE);
	      }
	    default:
	      {
	        return currentIndex;
	      }
	  }
	}

	/**
	 * Check if element is visible in browser view port
	 * @param {HTMLElement} element - given element
	 * @returns {boolean}
	 */
	function isElementInView(element) {
	  const bounding = element.getBoundingClientRect();
	  return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
	}

	/**
	 * Check if an element is currently scrollable (vertically overflowing)
	 * @param {HTMLElement} element - given element
	 * @returns {boolean}
	 */
	function isScrollable(element) {
	  return element && element.clientHeight < element.scrollHeight;
	}

	/**
	 * Ensure a given child element is within the parent's visible scroll area
	 * If the child is not visible, scroll the parent
	 * @param {HTMLElement} activeElement - current element
	 * @param {HTMLElement} scrollParent - element's parent
	 */
	function maintainScrollVisibility(activeElement, scrollParent) {
	  const {
	    offsetHeight,
	    offsetTop
	  } = activeElement;
	  const {
	    offsetHeight: parentOffsetHeight,
	    scrollTop
	  } = scrollParent;
	  const isAbove = offsetTop < scrollTop;
	  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;
	  if (isAbove) {
	    scrollParent.scrollTo(0, offsetTop);
	  } else if (isBelow) {
	    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
	  }
	}
	var _init$2 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
	var _setupOption = /*#__PURE__*/_classPrivateFieldLooseKey("setupOption");
	var _getSearchString = /*#__PURE__*/_classPrivateFieldLooseKey("getSearchString");
	var _onComboBlur = /*#__PURE__*/_classPrivateFieldLooseKey("onComboBlur");
	var _onComboClick = /*#__PURE__*/_classPrivateFieldLooseKey("onComboClick");
	var _onComboKeyDown = /*#__PURE__*/_classPrivateFieldLooseKey("onComboKeyDown");
	var _onComboType = /*#__PURE__*/_classPrivateFieldLooseKey("onComboType");
	var _onOptionChange = /*#__PURE__*/_classPrivateFieldLooseKey("onOptionChange");
	var _onOptionClick = /*#__PURE__*/_classPrivateFieldLooseKey("onOptionClick");
	var _onOptionMouseDown = /*#__PURE__*/_classPrivateFieldLooseKey("onOptionMouseDown");
	var _updateMenuState = /*#__PURE__*/_classPrivateFieldLooseKey("updateMenuState");
	class ComboboxSelect {
	  /**
	   * Create a ComboboxSelect instance
	   * @param {Object} opts - the ComboboxSelect options
	   * @param {HTMLElement} opts.el - the ComboboxSelect container element
	   * @param {Boolean} [opts.manageFocusOnClick=true] - whether to send focus back to the Combobox on click
	   */
	  constructor(_ref) {
	    let {
	      el,
	      manageFocusOnClick = true
	    } = _ref;
	    Object.defineProperty(this, _updateMenuState, {
	      value: _updateMenuState2
	    });
	    Object.defineProperty(this, _onOptionMouseDown, {
	      value: _onOptionMouseDown2
	    });
	    Object.defineProperty(this, _onOptionClick, {
	      value: _onOptionClick2
	    });
	    Object.defineProperty(this, _onOptionChange, {
	      value: _onOptionChange2
	    });
	    Object.defineProperty(this, _onComboType, {
	      value: _onComboType2
	    });
	    Object.defineProperty(this, _onComboKeyDown, {
	      value: _onComboKeyDown2
	    });
	    Object.defineProperty(this, _onComboClick, {
	      value: _onComboClick2
	    });
	    Object.defineProperty(this, _onComboBlur, {
	      value: _onComboBlur2
	    });
	    Object.defineProperty(this, _getSearchString, {
	      value: _getSearchString2
	    });
	    Object.defineProperty(this, _setupOption, {
	      value: _setupOption2
	    });
	    Object.defineProperty(this, _init$2, {
	      value: _init2$2
	    });
	    // element refs
	    this.el = el;
	    this.manageFocusOnClick = manageFocusOnClick;
	    this.comboEl = el.querySelector(Selector$i.ROLE_COMBOBOX);
	    this.listboxEl = el.querySelector(Selector$i.ROLE_LISTBOX);
	    this.optionEls = el.querySelectorAll(Selector$i.ROLE_OPTION);
	    this.comboboxText = el.querySelector(Selector$i.DATA_TEXT);

	    // data
	    this.idBase = this.comboEl?.id || `combobox_${Util.getUid()}`;

	    // state
	    this.activeIndex = 0;
	    this.open = false;
	    this.searchString = '';
	    this.searchTimeout = null;
	    this.events = [];

	    // init
	    if (el && this.comboEl && this.listboxEl && Boolean(this.optionEls.length)) {
	      _classPrivateFieldLooseBase(this, _init$2)[_init$2]();
	    }
	    instances$6.push(this);
	  }

	  /**
	   * Initialize JS for combobox event handlers and listbox options
	   */

	  static getInstances() {
	    return instances$6;
	  }

	  /**
	   * Perform an option selection
	   * @param {number} index – the index of the option to select
	   */
	  selectOption(index, event) {
	    // update state
	    this.activeIndex = index;
	    // update displayed value
	    const selected = this.optionEls[index];
	    this.comboboxText.textContent = selected.textContent;

	    // update aria-selected
	    Array.from(this.optionEls).forEach((optionEl, i) => {
	      optionEl.setAttribute('aria-selected', `${i === index}`);
	    });

	    // create and dispatch custom event on selection/change
	    this[EventName$i.ON_CHANGE] = new CustomEvent(EventName$i.ON_CHANGE, {
	      bubbles: true,
	      detail: {
	        value: selected.textContent,
	        event
	      }
	    });
	    this.comboEl.dispatchEvent(this[EventName$i.ON_CHANGE]);
	  }

	  /**
	   * Re-initialize the instance to update DOM elements and handlers
	   * @param {Object} [opts] - The Combobox options
	   * @param {Boolean} [opts.manageFocusOnClick] - whether to send focus back to the Combobox on click
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    this.comboEl = this.el.querySelector(Selector$i.ROLE_COMBOBOX);
	    this.listboxEl = this.el.querySelector(Selector$i.ROLE_LISTBOX);
	    this.optionEls = this.el.querySelectorAll(Selector$i.ROLE_OPTION);
	    if (typeof opts.manageFocusOnClick === 'boolean') {
	      this.manageFocusOnClick = opts.manageFocusOnClick;
	    }
	    if (this.el && this.comboEl && this.listboxEl && Boolean(this.optionEls.length)) {
	      // reset event handlers in case element refs have changed
	      Util.removeEvents(this.events);
	      _classPrivateFieldLooseBase(this, _init$2)[_init$2]();
	    }
	    this[EventName$i.ON_UPDATE] = new CustomEvent(EventName$i.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$i.ON_UPDATE]);
	  }

	  /**
	   * Remove the ComboboxSelect instance
	   */
	  remove() {
	    Util.removeEvents(this.events);
	    const index = instances$6.indexOf(this);
	    instances$6.splice(index, 1);
	    this[EventName$i.ON_REMOVE] = new CustomEvent(EventName$i.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$i.ON_REMOVE]);
	  }
	}
	function _init2$2() {
	  // display first option by default
	  this.comboboxText.textContent = this.optionEls[0].textContent;

	  // add combobox event listeners
	  const comboboxEventHandlers = [{
	    el: this.comboEl,
	    type: EventName$i.BLUR,
	    handler: _classPrivateFieldLooseBase(this, _onComboBlur)[_onComboBlur].bind(this)
	  }, {
	    el: this.comboEl,
	    type: EventName$i.CLICK,
	    handler: _classPrivateFieldLooseBase(this, _onComboClick)[_onComboClick].bind(this)
	  }, {
	    el: this.comboEl,
	    type: EventName$i.KEYDOWN,
	    handler: _classPrivateFieldLooseBase(this, _onComboKeyDown)[_onComboKeyDown].bind(this)
	  }];
	  this.events.push(...comboboxEventHandlers);
	  Util.addEvents(comboboxEventHandlers);
	  Array.from(this.optionEls).forEach(_classPrivateFieldLooseBase(this, _setupOption)[_setupOption].bind(this));
	}
	function _setupOption2(option, index) {
	  // ensuring proper HTML attributes
	  option.setAttribute('aria-selected', `${index === 0}`);
	  if (index === 0) {
	    option.classList.add(ClassName$d.CURRENT_ITEM);
	  } else {
	    option.classList.remove(ClassName$d.CURRENT_ITEM);
	  }
	  option.id = `${this.idBase}-${index}`;

	  // add option event listeners
	  const optionEventHandlers = [{
	    el: option,
	    type: EventName$i.CLICK,
	    handler: event => {
	      event.stopPropagation();
	      _classPrivateFieldLooseBase(this, _onOptionClick)[_onOptionClick](index);
	    }
	  }, {
	    el: option,
	    type: EventName$i.MOUSEDOWN,
	    handler: _classPrivateFieldLooseBase(this, _onOptionMouseDown)[_onOptionMouseDown].bind(this)
	  }];
	  this.events.push(...optionEventHandlers);
	  Util.addEvents(optionEventHandlers);
	}
	function _getSearchString2(character) {
	  // reset typing timeout and start new timeout
	  // this allows multiple-letter matches, like a native <select>
	  if (typeof this.searchTimeout === 'number') {
	    window.clearTimeout(this.searchTimeout);
	  }
	  this.searchTimeout = window.setTimeout(() => {
	    this.searchString = '';
	  }, TIMEOUT_MS);

	  // add most recent letter to saved search string
	  this.searchString += character;
	  return this.searchString;
	}
	function _onComboBlur2() {
	  // do not do blur action if ignoreBlur flag has been set
	  if (this.ignoreBlur) {
	    this.ignoreBlur = false;
	    return;
	  }

	  // select current option and close
	  if (this.open) {
	    this.selectOption(this.activeIndex, 'blur');
	    _classPrivateFieldLooseBase(this, _updateMenuState)[_updateMenuState](false, false);
	  }
	}
	function _onComboClick2() {
	  _classPrivateFieldLooseBase(this, _updateMenuState)[_updateMenuState](!this.open, false);
	}
	function _onComboKeyDown2(event) {
	  const {
	    key
	  } = event;
	  const max = this.optionEls.length - 1;
	  const action = getActionFromKey(event, this.open);
	  switch (action) {
	    case SelectAction.Last:
	    case SelectAction.First:
	      {
	        _classPrivateFieldLooseBase(this, _updateMenuState)[_updateMenuState](true);
	      }

	    // intentional fallthrough
	    case SelectAction.Next:
	    case SelectAction.Previous:
	    case SelectAction.PageUp:
	    case SelectAction.PageDown:
	      {
	        event.preventDefault();
	        return _classPrivateFieldLooseBase(this, _onOptionChange)[_onOptionChange](getUpdatedIndex(this.activeIndex, max, action));
	      }
	    case SelectAction.CloseSelect:
	      {
	        event.preventDefault();
	        this.selectOption(this.activeIndex, 'keydown');
	      }

	    // intentional fallthrough
	    case SelectAction.Close:
	      {
	        event.preventDefault();
	        return _classPrivateFieldLooseBase(this, _updateMenuState)[_updateMenuState](false);
	      }
	    case SelectAction.Type:
	      {
	        return _classPrivateFieldLooseBase(this, _onComboType)[_onComboType](key);
	      }
	    case SelectAction.Open:
	      {
	        event.preventDefault();
	        return _classPrivateFieldLooseBase(this, _updateMenuState)[_updateMenuState](true);
	      }
	  }
	}
	function _onComboType2(letter) {
	  // open the listbox if it is closed
	  _classPrivateFieldLooseBase(this, _updateMenuState)[_updateMenuState](true);

	  // find the index of the first matching option
	  const searchString = _classPrivateFieldLooseBase(this, _getSearchString)[_getSearchString](letter);
	  const optionValues = Array.from(this.optionEls).map(optionEl => optionEl.textContent);
	  const searchIndex = getIndexByLetter(optionValues, searchString, this.activeIndex + 1);

	  // if a match was found, go to it
	  if (searchIndex >= 0) {
	    _classPrivateFieldLooseBase(this, _onOptionChange)[_onOptionChange](searchIndex);
	  } else {
	    // if no matches, clear the timeout and search string
	    window.clearTimeout(this.searchTimeout);
	    this.searchString = '';
	  }
	}
	function _onOptionChange2(index) {
	  // update state
	  this.activeIndex = index;

	  // update aria-activedescendant
	  this.comboEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

	  // update current option styles
	  Array.from(this.optionEls).forEach(optionEl => {
	    optionEl.classList.remove(ClassName$d.CURRENT_ITEM);
	  });
	  this.optionEls[index].classList.add(ClassName$d.CURRENT_ITEM);

	  // ensure the new option is in view
	  if (isScrollable(this.listboxEl)) {
	    maintainScrollVisibility(this.optionEls[index], this.listboxEl);
	  }

	  // ensure the new option is in view
	  if (!isElementInView(this.optionEls[index])) {
	    this.optionEls[index].scrollIntoView({
	      behavior: Util.prefersReducedMotion() ? 'auto' : 'smooth',
	      block: 'nearest'
	    });
	  }
	}
	function _onOptionClick2(index) {
	  _classPrivateFieldLooseBase(this, _onOptionChange)[_onOptionChange](index);
	  this.selectOption(index, 'click');
	  _classPrivateFieldLooseBase(this, _updateMenuState)[_updateMenuState](false, this.manageFocusOnClick);
	}
	function _onOptionMouseDown2() {
	  // Clicking an option will cause a blur event,
	  // but we don't want to perform the default keyboard blur action
	  this.ignoreBlur = true;
	}
	function _updateMenuState2(open, callFocus) {
	  if (callFocus === void 0) {
	    callFocus = true;
	  }
	  if (this.open === open) {
	    return;
	  }

	  // update state
	  this.open = open;

	  // update aria-expanded and styles
	  this.comboEl.setAttribute('aria-expanded', `${this.open}`);
	  if (this.open) {
	    this.listboxEl.classList.add('show');
	    this.comboEl.classList.add('active');
	  } else {
	    this.listboxEl.classList.remove('show');
	    this.comboEl.classList.remove('active');
	  }

	  // update activedescendant
	  const activeID = this.open ? `${this.idBase}-${this.activeIndex}` : '';
	  if (activeID) {
	    this.comboEl.setAttribute('aria-activedescendant', activeID);
	  } else {
	    this.comboEl.removeAttribute('aria-activedescendant');
	  }
	  if (activeID === '' && !isElementInView(this.comboEl)) {
	    this.comboEl.scrollIntoView({
	      behavior: Util.prefersReducedMotion() ? 'auto' : 'smooth',
	      block: 'nearest'
	    });
	  }

	  // move focus back to the combobox, if needed
	  if (callFocus) {
	    this.comboEl.focus();
	  }
	}

	const Selector$h = {
	  DATA_MOUNT: '[data-mount="content-swap"]'
	};
	const EventName$h = {
	  ON_SWAP: 'onSwap',
	  ON_HIDE: 'onHide',
	  ON_SHOW: 'onShow',
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove'
	};
	const contentSwapInstances = [];
	function _getTargetList$1() {
	  // Reads selector from data-target attribute
	  const selector = Util.getSelectorFromElement(this.swapTrigger);
	  return [].slice.call(document.querySelectorAll(selector));
	}
	class ContentSwap {
	  /**
	   * Create a ContentSwap instance
	   * @param {Object} opts - the ContentSwap options
	   * @param {HTMLElement} opts.el - the element that triggers visibility changes
	   */
	  constructor(opts) {
	    this.swapTrigger = opts.el;
	    this.targetList = _getTargetList$1.call(this);

	    // Add event handlers
	    this.events = [{
	      el: this.swapTrigger,
	      type: 'click',
	      handler: this.swapContent.bind(this)
	    }];
	    Util.addEvents(this.events);

	    // push to instances list
	    contentSwapInstances.push(this);
	  }
	  remove() {
	    Util.removeEvents(this.events);
	    const index = contentSwapInstances.indexOf(this);
	    contentSwapInstances.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$h.ON_REMOVE] = new CustomEvent(EventName$h.ON_REMOVE, {
	      bubbles: true
	    });
	    this.swapTrigger.dispatchEvent(this[EventName$h.ON_REMOVE]);
	  }
	  hide(element) {
	    element.setAttribute('hidden', '');

	    // Create and dispatch custom event
	    this[EventName$h.ON_HIDE] = new CustomEvent(EventName$h.ON_HIDE, {
	      bubbles: true
	    });
	    element.dispatchEvent(this[EventName$h.ON_HIDE]);
	  }
	  show(element) {
	    element.removeAttribute('hidden');

	    // Create and dispatch custom event
	    this[EventName$h.ON_SHOW] = new CustomEvent(EventName$h.ON_SHOW, {
	      bubbles: true
	    });
	    element.dispatchEvent(this[EventName$h.ON_SHOW]);
	  }
	  swapContent() {
	    // Create and dispatch custom event
	    this[EventName$h.ON_SWAP] = new CustomEvent(EventName$h.ON_SWAP, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.swapTrigger.dispatchEvent(this[EventName$h.ON_SWAP]);
	    if (this[EventName$h.ON_SWAP].defaultPrevented) {
	      return;
	    }
	    this.targetList.forEach(element => {
	      if (element.hasAttribute('hidden')) {
	        // unhides the hidden
	        this.show(element);
	      } else {
	        // hides the unhidden
	        this.hide(element);
	      }
	    });
	  }
	  update() {
	    this.targetList = _getTargetList$1.call(this);

	    // Create and dispatch custom event
	    this[EventName$h.ON_UPDATE] = new CustomEvent(EventName$h.ON_UPDATE, {
	      bubbles: true
	    });
	    this.swapTrigger.dispatchEvent(this[EventName$h.ON_UPDATE]);
	  }
	  static getInstances() {
	    return contentSwapInstances;
	  }
	}

	const biDirectional = Util.isBiDirectional();
	const ClassName$c = {
	  SHOW: 'show',
	  FADE: 'fade',
	  FADING_OUT: 'fading-out',
	  ACTIVE: 'active',
	  FLYOUT: 'flyout'
	};
	const Default$4 = {
	  START: biDirectional ? 'right' : 'left',
	  END: biDirectional ? 'left' : 'right',
	  ALIGNMENT: 'start'
	};
	const DefaultReflow = {
	  left: ['left', 'bottom', 'top', 'right'],
	  right: ['right', 'bottom', 'top', 'left'],
	  top: ['top', 'right', 'bottom', 'left'],
	  bottom: ['bottom', 'right', 'top', 'left']
	};

	/**
	 * Private functions
	 */

	function _hasReflow(node) {
	  if (node.hasAttribute('data-disable-reflow') && node.getAttribute('data-disable-reflow') !== 'false') {
	    return false;
	  }
	  return true;
	}

	/**
	 * Get the placement of a flyout.
	 * @param {string?} str - The string to parse.
	 * @param {string} [defaultValue=start] - The default value to fallback to.
	 * @returns {string} The placement of the flyout.
	 */
	function _getPlacement(str, defaultValue) {
	  if (defaultValue === void 0) {
	    defaultValue = Default$4.END;
	  }
	  switch (str) {
	    case 'top':
	    case 'bottom':
	      {
	        return str;
	      }
	    case 'left':
	    case 'start':
	      {
	        return Default$4.START;
	      }
	    case 'right':
	    case 'end':
	      {
	        return Default$4.END;
	      }
	    default:
	      {
	        return defaultValue;
	      }
	  }
	}

	/**
	 * Get the alignment of a flyout.
	 * @param {string?} str - The string to parse.
	 * @param {string} [defaultValue=start] - The default value to fallback to.
	 * @returns {string} The alignment enum of the flyout.
	 */
	function _getAlignment(str, defaultValue) {
	  if (defaultValue === void 0) {
	    defaultValue = Default$4.ALIGNMENT;
	  }
	  switch (str) {
	    case 'center':
	    case 'start':
	    case 'end':
	      {
	        return str;
	      }
	    default:
	      {
	        return defaultValue;
	      }
	  }
	}

	/**
	 * Get the related menu for an element.
	 * @param {HTMLElement} node - The element to find a related menu for, typically the flyout instance target.
	 * @returns {HTMLElement?} The menu element.
	 */
	function _getRelatedMenu(node) {
	  if (node.attributes['aria-controls']) {
	    return document.querySelector(`#${node.attributes['aria-controls'].value}`);
	  }
	}

	/**
	 * Get the X distance for menu positioning.
	 * @param {string} textAlignment - The text alignment of the flyout's parent. Affects the left/right CSS positioning, therefore changes the translate coordinates.
	 * @param {string} placement - Menu's placement in relation to the flyout trigger: 'left', 'right', 'top', or 'bottom'.
	 * @param {string} alignment - Menu's alignment with the flyout trigger, correlates to read order: 'center', 'start', 'end'.
	 * @returns {number} The X distance to translate the menu.
	 * @this Flyout
	 */
	function _getTranslateX(textAlignment, placement, alignment) {
	  let translateX = 0;
	  let overflowOffset = 0;

	  /* eslint-disable no-lonely-if */
	  // If text is aligned left
	  if (textAlignment === 'left') {
	    if (placement === 'right') {
	      // Place menu right of trigger
	      translateX += this.boundingRect.el.width + this.offset;
	    } else if (placement === 'left') {
	      // Place menu left of trigger
	      translateX -= this.boundingRect.menu.width + this.offset;
	    } else {
	      // Adjust alignment for top and bottom menus

	      if (alignment === 'center') {
	        translateX -= (this.boundingRect.menu.width - this.boundingRect.el.width) / 2;
	      } else if (alignment === 'end' && !biDirectional || alignment === 'start' && biDirectional) {
	        translateX -= this.boundingRect.menu.width - this.boundingRect.el.width;
	        // Shift menu left if needed to fit menu in tiny window sizes, record offset for future use
	        overflowOffset = _shiftLeftToFitWindow.call(this, translateX);
	        translateX += overflowOffset;
	      } else {
	        // Shift menu right if needed to fit menu in tiny window sizes, record offset for future use
	        overflowOffset = _shiftRightToFitWindow.call(this, translateX);
	        translateX += overflowOffset;
	      }
	    }
	    // If text is aligned right
	  } else {
	    if (placement === 'right') {
	      translateX += this.boundingRect.menu.width + this.offset;
	    } else if (placement === 'left') {
	      translateX -= this.boundingRect.el.width + this.offset;
	    } else {
	      if (alignment === 'center') {
	        translateX += (this.boundingRect.menu.width - this.boundingRect.el.width) / 2;
	      } else if (alignment === 'start' && !biDirectional || alignment === 'end' && biDirectional) {
	        translateX += this.boundingRect.menu.width - this.boundingRect.el.width;
	        // Shift menu right if needed to fit menu in tiny window sizes, record offset for future use
	        overflowOffset = _shiftRightToFitWindow.call(this, translateX);
	        translateX += overflowOffset;
	      } else {
	        // Shift menu left if needed to fit menu in tiny window sizes, record offset for future use
	        overflowOffset = _shiftLeftToFitWindow.call(this, translateX);
	        translateX += overflowOffset;
	      }
	    }
	  }
	  /* eslint-enable no-lonely-if */

	  // Save any overflowOffset (rounded) to the instance for later use
	  this.overflowOffset = Math.round(overflowOffset);
	  return translateX;
	}

	/**
	 * Returns distance in pixels needed to prevent overflow on the right side of the window.
	 * @returns {number} The distance in pixels to shift the menu left.
	 */
	function _shiftLeftToFitWindow() {
	  const xOverflow = this.boundingRect.window.width - (this.boundingRect.el.x + this.boundingRect.el.width) + this.boundingRect.menu.width;
	  return xOverflow > this.boundingRect.window.width ? xOverflow - this.boundingRect.window.width : 0;
	}

	/**
	 * Returns distance in pixels needed to prevent overflow on the left side of the window.
	 * @returns {number} The distance in pixels to shift the menu right.
	 */
	function _shiftRightToFitWindow() {
	  const xOverflow = this.boundingRect.el.x + this.boundingRect.menu.width;
	  return xOverflow > this.boundingRect.window.width ? -(xOverflow - this.boundingRect.window.width) : 0;
	}

	/**
	 * Get the Y distance for menu positioning.
	 * @param {string} placement - Menu's placement in relation to the flyout trigger: 'left', 'right', 'top', or 'bottom'.
	 * @param {string} alignment - Menu's alignment with the flyout trigger, correlates to read order: 'center', 'start', 'end'.
	 * @returns {number} The Y distance to translate the menu.
	 * @this Flyout
	 */
	function _getTranslateY(placement, alignment) {
	  let translateY = 0;

	  // Place menu above trigger
	  if (placement === 'top') {
	    translateY -= this.boundingRect.menu.height + this.offset;
	    // Place menu below trigger
	  } else if (placement === 'bottom') {
	    translateY += this.boundingRect.el.height + this.offset;
	  } else {
	    // Adjust alignment for left and right menus
	    /* eslint-disable no-lonely-if */
	    if (alignment === 'center') {
	      translateY -= (this.boundingRect.menu.height - this.boundingRect.el.height) / 2;
	    } else if (alignment === 'end') {
	      translateY -= this.boundingRect.menu.height - this.boundingRect.el.height;
	    }
	    /* eslint-enable no-lonely-if */
	  }

	  return translateY;
	}
	class Flyout {
	  /**
	   * Create a Flyout instance
	   * @param {Object} opts - The flyout options
	   * @param {HTMLElement} opts.el - The element that toggles the flyout
	   * @param {HTMLElement} [opts.menu] - The element that defines the flyout menu
	   * @param {string} [opts.placement=right] - A string that defines the placement of the menu
	   * @param {string} [opts.alignment=start] - A string that defines the alignment of the menu
	   * @param {number} [opts.offset=0] - The number of pixels the menu should be offset from the trigger
	   * @param {boolean} [opts.enableReflow=true] - Whether the menu should reflow to fit within the window as best as possible
	   * @param {boolean} [opts.enableFade=true] - Whether the menu should fade in and out
	   */
	  constructor(opts) {
	    this.el = opts.el; // the toggle
	    this.menu = opts.menu || _getRelatedMenu(this.el); // the flyout menu
	    this.parent = this.el.offsetParent || this.el.parentElement;
	    this.placement = _getPlacement(opts.placement || this.el.getAttribute('data-placement'));
	    this.alignment = _getAlignment(opts.alignment || this.el.getAttribute('data-alignment'));
	    this.offset = opts.offset ? parseInt(opts.offset, 10) : 0;
	    this.translateX = 0;
	    this.translateY = 0;
	    this.overflowOffset = 0;
	    this.enableReflow = typeof opts.enableReflow === 'boolean' ? opts.enableReflow : _hasReflow(this.el);
	    this.enableFade = typeof opts.enableFade === 'boolean' ? opts.enableFade : this.menu.classList.contains(ClassName$c.FADE);
	    this.shown = false;

	    // Ensure position is set on parent element, needed for absolute positioning of menu
	    const parentPositionProperty = window.getComputedStyle(this.parent).position;
	    if (parentPositionProperty !== 'relative' && parentPositionProperty !== 'absolute') {
	      this.parent.style.position = 'relative';
	    }

	    // Setup fade animation based on options supplied
	    if (opts.enableFade === true) {
	      this.menu.classList.add(ClassName$c.FADE);
	    } else if (opts.enableFade === false) {
	      this.menu.classList.remove(ClassName$c.FADE);
	    }
	    if (!this.menu.hasAttribute('tabindex')) {
	      this.menu.setAttribute('tabindex', '-1');
	    }
	  }

	  /**
	   * Get the current position of the menu based on enableReflow setting
	   * @returns {object} The instance's position object
	   */
	  get currentPosition() {
	    const position = {
	      placement: this.placement,
	      alignment: this.alignment
	    };
	    if (this.enableReflow) {
	      return this.reflowPosition || position; // fallback to original position, if undefined
	    }

	    return position;
	  }

	  /**
	   * Calculates and sets the reflow position value (placement and alignment)
	   */
	  calcReflowPosition() {
	    // Calculate the distance of the trigger from each side of the window
	    const distFrom = {
	      top: this.boundingRect.el.top,
	      bottom: window.innerHeight - this.boundingRect.el.bottom,
	      left: this.boundingRect.el.left,
	      right: document.body.clientWidth - this.boundingRect.el.right
	    };
	    // Add the menu offset spacing to the width and height of the menu
	    const menuWidth = this.boundingRect.menu.width + this.offset;
	    const menuHeight = this.boundingRect.menu.height + this.offset;
	    const placements = DefaultReflow[this.placement].slice();
	    // Calculate the distance needed for the menu to fit inside the window
	    let distX = menuWidth - this.boundingRect.el.width;
	    let distY = menuHeight - this.boundingRect.el.height;
	    if (this.alignment === 'center') {
	      distX /= 2;
	      distY /= 2;
	    }

	    // Copy values so we don't override original instance property
	    let {
	      placement,
	      alignment
	    } = this;

	    // Eliminate the placements that won't fit
	    if (distFrom.left < menuWidth) {
	      placements.splice(placements.indexOf('left'), 1);
	    }
	    if (distFrom.right < menuWidth) {
	      placements.splice(placements.indexOf('right'), 1);
	    }
	    if (distFrom.top < menuHeight) {
	      placements.splice(placements.indexOf('top'), 1);
	    }
	    if (distFrom.bottom < menuHeight) {
	      placements.splice(placements.indexOf('bottom'), 1);
	    }
	    placement = placements.length ? placements.shift() : 'bottom'; // fallback placement is always bottom

	    // Adjust the alignment of the chosen placement
	    // NOTE: Keep this logic as is for readability and sanity
	    if (placement === 'bottom' || placement === 'top') {
	      // If neither side is ideal
	      if (distFrom.left < distX && distFrom.right < distX) {
	        // Align to the Read order
	        alignment = 'start';
	        // LTR: If distFrom.left < distX
	      } else if (distFrom[Default$4.START] < distX) {
	        alignment = 'start';
	      } else if (distFrom[Default$4.END] <= distX) {
	        alignment = 'end';
	      }
	    } else {
	      // If placement is 'left' or 'right'
	      // If neither above nor below is ideal
	      /* eslint-disable no-lonely-if */
	      if (distFrom.top < distY && distFrom.bottom < distY) {
	        // Force the beginning of the menu content to be in view,
	        // which should force window to grow, enabling user to scroll to view entire menu
	        alignment = 'start';
	      } else if (distFrom.top < distY) {
	        alignment = 'start';
	      } else if (distFrom.bottom <= distY) {
	        alignment = 'end';
	      }
	      /* eslint-enable no-lonely-if */
	    }

	    this.reflowPosition = {
	      placement,
	      alignment
	    };
	  }

	  /**
	   * Position the flyout menu
	   */
	  positionMenu() {
	    if (this.enableReflow) {
	      this.calcReflowPosition();
	    }
	    const position = this.currentPosition;

	    // Get the direction of text flow (affected by cascade of text-align css property and/or RTL)
	    const textAlignProperty = window.getComputedStyle(this.parent).textAlign;
	    let textAlignment = Default$4.START;
	    if (textAlignProperty === 'left' || textAlignProperty === 'right') {
	      textAlignment = textAlignProperty;
	    } else if (textAlignProperty === 'end') {
	      textAlignment = Default$4.END;
	    }

	    // Set the transformation's "origin" based on text alignment
	    this.menu.style.top = Math.round(this.boundingRect.el.top - this.boundingRect.parent.top) + 'px';
	    if (textAlignment === 'left') {
	      this.menu.style.left = Math.round(this.boundingRect.el.left - this.boundingRect.parent.left) + 'px';
	      this.menu.style.right = 'auto';
	    } else {
	      this.menu.style.left = 'auto';
	      this.menu.style.right = -Math.round(this.boundingRect.el.right - this.boundingRect.parent.right) + 'px';
	    }

	    // Allow the menu to define its own width according to the needed width of its contents
	    this.menu.style.minWidth = Math.round(this.boundingRect.menu.width) + 'px';

	    // Calculate the x and y distances needed to push the menu to the correct position.
	    this.translateX = Math.round(_getTranslateX.call(this, textAlignment, position.placement, position.alignment));
	    this.translateY = Math.round(_getTranslateY.call(this, position.placement, position.alignment));

	    // Set the transform style
	    this.menu.style.transform = `translate(${this.translateX}px, ${this.translateY}px)`;

	    // Reset menu classes associated with position
	    this.menu.classList.remove(`${ClassName$c.FLYOUT}-left`, `${ClassName$c.FLYOUT}-right`, `${ClassName$c.FLYOUT}-top`, `${ClassName$c.FLYOUT}-bottom`, `${ClassName$c.FLYOUT}-align-start`, `${ClassName$c.FLYOUT}-align-end`, `${ClassName$c.FLYOUT}-align-center`);
	    // Set the menu classes associated with position
	    this.menu.classList.add(`${ClassName$c.FLYOUT}-${position.placement}`, `${ClassName$c.FLYOUT}-align-${position.alignment}`);
	  }

	  /**
	   * Show the menu
	   */
	  show() {
	    // Record window width prior to showing the menu,
	    // otherwise the menu will effect the window width
	    const windowWidth = window.innerWidth;
	    this.shown = true;
	    this.el.classList.add(ClassName$c.ACTIVE);
	    this.menu.classList.add(ClassName$c.SHOW);

	    // Store the coordinates of the associated elements for ease of reuse now that the menu has layout
	    this.boundingRect = {
	      el: this.el.getBoundingClientRect(),
	      menu: this.menu.getBoundingClientRect(),
	      parent: this.parent.getBoundingClientRect(),
	      window: {
	        width: windowWidth
	      }
	    };
	    this.positionMenu();
	  }

	  /**
	   * Hide the menu
	   * @param {Object} [opts={}] - Options for hiding the menu
	   * @param {boolean} [opts.setFocus=true] - Whether or not the focus should be set on the toggling element; defaults to true
	   */
	  hide(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    // Default behavior should be to set focus on toggling element
	    const setFocus = typeof opts.setFocus === 'boolean' ? opts.setFocus : true;
	    this.shown = false;
	    this.el.classList.remove(ClassName$c.ACTIVE);
	    this.menu.classList.remove(ClassName$c.SHOW);

	    // 1. Add a class that triggers a CSS animation
	    // 2. Create an event listener that removes the class once it's animation is complete
	    if (this.enableFade) {
	      this.menu.addEventListener('animationend', () => {
	        this.menu.classList.remove(ClassName$c.FADING_OUT);
	      }, {
	        once: true
	      }); // 2.
	      this.menu.classList.add(ClassName$c.FADING_OUT); // 1.
	    }

	    if (setFocus) {
	      // Set focus on the toggle
	      this.el.focus();
	    }
	  }

	  /**
	   * Toggle the menu state
	   */
	  toggle() {
	    if (this.shown) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  }

	  /**
	   * Update the flyout instance
	   * @param {Object} [opts={}] - Options for updating the flyout instance
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    // Change the placement of the menu
	    if (opts.placement) {
	      this.placement = _getPlacement(opts.placement);
	    }

	    // Change the alignment of the menu
	    if (opts.alignment) {
	      this.alignment = _getAlignment(opts.alignment);
	    }

	    // Change the offset of the menu
	    if (opts.offset !== undefined) {
	      const offset = parseInt(opts.offset, 10);
	      if (!isNaN(offset)) {
	        this.offset = offset;
	      }
	    }

	    // Change whether the menu should reflow
	    if (typeof opts.enableReflow === 'boolean') {
	      this.enableReflow = opts.enableReflow;
	    }

	    // Change whether the menu should enable a fade animation
	    if (typeof opts.enableFade === 'boolean' && opts.enableFade !== this.enableFade) {
	      this.enableFade = opts.enableFade;
	      this.menu.classList.toggle(ClassName$c.FADE);
	    }

	    // Update the menu position if its open
	    if (this.shown) {
	      this.positionMenu();
	    }
	  }
	}

	const Selector$g = {
	  DATA_MOUNT: '[data-mount="dropdown"]',
	  MENU: '.dropdown-menu'
	};
	const EventName$g = {
	  ON_HIDE: 'onHide',
	  ON_SHOW: 'onShow',
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove'
	};
	const ClassName$b = {
	  SHOW: 'show',
	  ACTIVE: 'active',
	  BOTTOM: 'dropdown',
	  TOP: 'dropup',
	  RIGHT: 'dropright',
	  LEFT: 'dropleft'
	};
	const Default$3 = {
	  ...Default$4,
	  PLACEMENT: 'bottom'
	};
	const {
	  ARROW_DOWN,
	  ARROW_LEFT,
	  ARROW_RIGHT,
	  ARROW_UP,
	  ENTER,
	  ESC,
	  SPACE,
	  TAB: TAB$1
	} = Util.keys;
	const dropdowns = [];

	/**
	 * The event handler for when the target element is clicked.
	 * @param {MouseEvent} event - The event object.
	 */
	function _elOnClick$2(event) {
	  // Prevent page from trying to scroll to a page anchor.
	  event.preventDefault();
	  this.toggle();
	}

	/**
	 * The event handler for when a key is pressed on the target element.
	 * @param {KeyboardEvent} event - The event object.
	 */
	function _elOnKeydown$1(event) {
	  const {
	    key
	  } = event;

	  // Override keyboard functionality if element is an anchor.
	  if (key === SPACE || key === ENTER) {
	    // Trigger the same event as a click for consistency.
	    event.preventDefault();
	    _elOnClick$2.bind(this)(event);

	    // Applies focus on the multi-level first list item
	    if (this.isSubDropdown) {
	      this.arrowableItems[0].focus();
	    }
	  }

	  // Events for when the menu is open.
	  if (this.shown && this.arrowableItems && key === ARROW_DOWN) {
	    // Prevent scrolling page on down arrow.
	    event.preventDefault();
	    // Set focus to first focusable element in menu.
	    this.arrowableItems[0].focus();
	  }
	}

	/**
	 * The event handler for when a key is pressed on the menu
	 * @param {KeyboardEvent} event - The event object
	 */
	function _menuOnKeydown$1(event) {
	  if (this.arrowableItems?.includes(event.target)) {
	    const {
	      key
	    } = event;
	    switch (key) {
	      case ARROW_RIGHT:
	      case ARROW_LEFT:
	        {
	          _handleRightLeftKeydown.call(this, event);
	          break;
	        }
	      case ARROW_DOWN:
	        {
	          _handleDownKeydown.call(this, event);
	          break;
	        }
	      case ARROW_UP:
	        {
	          _handleUpKeydown.call(this, event);
	          break;
	        }
	      case TAB$1:
	        {
	          _handleTabKeydown.call(this, event);
	          break;
	        }
	    }
	  }
	}

	/**
	 * The event handler for Right and Left keydown events
	 * @param {Event} event - The event object
	 */
	function _handleRightLeftKeydown(event) {
	  const {
	    key,
	    target
	  } = event;
	  const parentElement = this.isSubDropdown ? this.menu.parentElement : target.parentElement;
	  if (parentElement.classList.contains(ClassName$b.RIGHT) || parentElement.classList.contains(ClassName$b.LEFT)) {
	    const dropDir = parentElement.classList.contains(ClassName$b.RIGHT) ? ClassName$b.RIGHT : ClassName$b.LEFT;
	    const keyDir = key === ARROW_RIGHT ? ClassName$b.RIGHT : ClassName$b.LEFT;
	    const dirMatches = this.isRTL ? keyDir !== dropDir : keyDir === dropDir;
	    const targetDropdown = this.subDropdowns?.find(dropdown => target === dropdown.el || dropdown.el.contains(target));
	    if (dirMatches && targetDropdown) {
	      target.click();
	      targetDropdown.arrowableItems[0].focus();
	    } else if (!dirMatches && this.isSubDropdown) {
	      this.hide();
	    }
	  }
	}
	function _handleDownKeydown(event) {
	  // Prevent scrolling page on down arrow.
	  event.preventDefault();
	  if (document.activeElement !== this.arrowableItems[this.arrowableItems.length - 1]) {
	    // If the down key is pressed and its NOT on the last item in the list
	    this.arrowableItems[this.arrowableItems.indexOf(document.activeElement) + 1].focus();
	  }
	}
	function _handleUpKeydown(event) {
	  // Prevent scrolling page on up arrow.
	  event.preventDefault();
	  if (document.activeElement !== this.arrowableItems[0]) {
	    // If the up key is pressed and its NOT on the first item in the list
	    this.arrowableItems[this.arrowableItems.indexOf(document.activeElement) - 1].focus();
	  }
	}
	function _handleTabKeydown(event) {
	  if (document.activeElement === this.arrowableItems[this.arrowableItems.length - 1] && this.isSubDropdown) {
	    event.preventDefault();
	    this.hide();
	  }
	}

	/**
	 * The event handler for when mousedown is triggered on the document.
	 * Happens before mouseup, click, and focusin to control closing of the menu without conflicting with other events.
	 * @param {Event} event - The event object
	 */
	function _documentOnMousedown$1(event) {
	  if (this.shown && !this.menu.contains(event.target) && !this.el.contains(event.target)) {
	    this.hide({
	      setFocus: false
	    });
	  }
	}

	/**
	 * The event handler for when the document receives focus
	 * @param {Event} event - The event object
	 */
	function _documentOnFocusin$1(event) {
	  if (this.shown && !this.menu.contains(event.target)) {
	    this.hide();
	  }
	}

	/**
	 * The event handler for keydown on the document
	 * @param {Event} event - The event object
	 */
	function _documentOnKeydown(event) {
	  const {
	    key
	  } = event;
	  if (key === ESC && this.shown) {
	    // Prevent bubbling effect and will only close the active menu.
	    event.stopPropagation();

	    // Check whether one of the sub dropdowns is shown
	    const openSubDropdown = this.subDropdowns?.find(dropdown => dropdown.shown);
	    if (openSubDropdown) {
	      openSubDropdown.hide();
	      return;
	    }
	    this.hide();
	  }
	}

	/**
	 * The event handler for when the mouse enter the subDropdown
	 * @param {Event} event - The event object
	 */
	function _subDropdownMouseEnter(event) {
	  const targetDropdown = this.subDropdowns?.find(dropdown => event.target === dropdown.el || dropdown.el.contains(event.target));
	  if (targetDropdown && !targetDropdown.shown) {
	    targetDropdown.show();
	  }
	}

	/**
	 * The event handler for when the mouse leave the subDropdown
	 * @param {Event} event - The event object
	 */
	function _subDropdownMouseLeave(event) {
	  const targetDropdown = this.subDropdowns?.find(dropdown => event.target === dropdown.el || dropdown.el.contains(event.target));
	  if (targetDropdown && targetDropdown.shown) {
	    targetDropdown.hide({
	      setFocus: false
	    });
	  }
	}

	/**
	 * The event handler for when the mouse enter the subMenu
	 * @param {Event} event - The event object
	 */
	function _subMenuMouseEnter(event) {
	  const targetDropdown = this.subDropdowns?.find(dropdown => event.target === dropdown.menu || dropdown.menu.contains(event.target));
	  if (targetDropdown && !targetDropdown.shown) {
	    targetDropdown.show();
	  }
	}

	/**
	 * The event handler for when the mouse leave the subMenu
	 * @param {Event} event - The event object
	 */
	function _subMenuMouseLeave(event) {
	  const targetDropdown = this.subDropdowns?.find(dropdown => event.target === dropdown.menu || dropdown.menu.contains(event.target));
	  if (targetDropdown && targetDropdown.shown) {
	    targetDropdown.hide({
	      setFocus: false
	    });
	  }
	}

	/**
	 * Get the placement of a dropdown from the parent node class
	 * @param {HTMLElement} node - The element to check for a placement class
	 * @returns {string?} The placement of the dropdown
	 */
	function _getPlacementFromClass(node) {
	  for (let i = 0; i < node.classList.length; i++) {
	    switch (node.classList[i]) {
	      case ClassName$b.BOTTOM:
	        {
	          return 'bottom';
	        }
	      case ClassName$b.TOP:
	        {
	          return 'top';
	        }
	      case ClassName$b.LEFT:
	        {
	          return 'start';
	        }
	      case ClassName$b.RIGHT:
	        {
	          return 'end';
	        }
	    }
	  }
	}

	/**
	 * Apply the correct `drop{direction}` class according to the placement
	 * @param {HTMLElement} node - The element to apply the class to
	 */
	function _updatePlacementClass(node, placement) {
	  const className = ClassName$b[placement.toUpperCase()];
	  node.classList.remove(ClassName$b.BOTTOM, ClassName$b.TOP, ClassName$b.RIGHT, ClassName$b.LEFT);
	  node.classList.add(className);
	}
	var _createSubDropdowns = /*#__PURE__*/_classPrivateFieldLooseKey("createSubDropdowns");
	var _getArrowableItems = /*#__PURE__*/_classPrivateFieldLooseKey("getArrowableItems");
	var _generateEvents$3 = /*#__PURE__*/_classPrivateFieldLooseKey("generateEvents");
	class Dropdown extends Flyout {
	  /**
	   * Create a Dropdown instance (inheriting Flyout)
	   * @param {Object} opts - The flyout options
	   * @param {HTMLElement} opts.el - The element that toggles the flyout
	   * @param {HTMLElement} [opts.menu] - The element that defines the flyout menu
	   * @param {string} [opts.placement=bottom] - A string that defines the placement of the menu
	   * @param {string} [opts.alignment=start] - A string that defines the alignment of the menu
	   * @param {number} [opts.offset=0] - The number of pixels the menu should be offset from the trigger
	   * @param {boolean} [opts.enableReflow=true] - Whether the menu should reflow to fit within the window as best as possible
	   */
	  constructor(opts) {
	    // Set super options
	    const flyoutOpts = {
	      ...opts
	    };
	    const parent = flyoutOpts.el.offsetParent || flyoutOpts.el.parentElement;
	    const placementFromClass = _getPlacementFromClass(parent);
	    flyoutOpts.placement = opts.placement || placementFromClass || flyoutOpts.el.getAttribute('data-placement') || Default$3.PLACEMENT;
	    flyoutOpts.enableFade = false;
	    super(flyoutOpts);

	    // Dropdown-specific setup

	    // Ensure `drop` class matches the placement of the menu
	    // Invert
	    Object.defineProperty(this, _generateEvents$3, {
	      value: _generateEvents2$1
	    });
	    Object.defineProperty(this, _getArrowableItems, {
	      value: _getArrowableItems2
	    });
	    Object.defineProperty(this, _createSubDropdowns, {
	      value: _createSubDropdowns2
	    });
	    const invertedPlacement = _getPlacement(this.placement, Default$3.PLACEMENT);
	    _updatePlacementClass(this.parent, invertedPlacement);

	    // Multi-level
	    this.isRTL = document.dir === 'rtl';
	    this.subMenus = Array.from(this.menu.querySelectorAll(Selector$g.MENU));
	    if (this.subMenus.length > 0) {
	      this.subDropdowns = _classPrivateFieldLooseBase(this, _createSubDropdowns)[_createSubDropdowns]();
	    }
	    this.isSubDropdown = Boolean(this.menu.parentElement.closest(Selector$g.MENU));
	    if (this.menu.nodeName.toLowerCase() === 'ul' || this.menu.nodeName.toLowerCase() === 'ol') {
	      this.arrowableItems = _classPrivateFieldLooseBase(this, _getArrowableItems)[_getArrowableItems]();
	    }

	    // Add event handlers.
	    this.events = _classPrivateFieldLooseBase(this, _generateEvents$3)[_generateEvents$3]();
	    Util.addEvents(this.events);

	    // Add mutation observers.
	    this.menuObserver = new MutationObserver(this.update.bind(this));
	    this.menuObserver.observe(this.menu, {
	      childList: true,
	      subtree: true
	    });

	    // Sub dropdowns are accessed through their parent Dropdown instances
	    // and not added to the global array of Dropdowns
	    if (!this.isSubDropdown) {
	      dropdowns.push(this);
	    }
	  }

	  /**
	   * Create sub dropdown instances
	   * @returns {Dropdown[]} array of dropdown instances
	   */

	  /**
	   * Show the menu
	   */
	  show() {
	    // Create and dispatch custom event
	    this[EventName$g.ON_SHOW] = new CustomEvent(EventName$g.ON_SHOW, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.el.dispatchEvent(this[EventName$g.ON_SHOW]);
	    if (this[EventName$g.ON_SHOW].defaultPrevented) {
	      return;
	    }
	    super.show();
	    this.el.setAttribute('aria-expanded', this.shown);
	  }

	  /**
	   * Hide the menu
	   * @param {Object} [opts={}] - Options for hiding the menu
	   * @param {boolean} [opts.setFocus=true] - Whether or not the focus should be set on the toggling element; defaults to true
	   */
	  hide(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    // Create and dispatch custom event
	    this[EventName$g.ON_HIDE] = new CustomEvent(EventName$g.ON_HIDE, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.el.dispatchEvent(this[EventName$g.ON_HIDE]);
	    if (this[EventName$g.ON_HIDE].defaultPrevented) {
	      return;
	    }
	    super.hide(opts);
	    this.el.setAttribute('aria-expanded', this.shown);
	  }

	  /**
	   * Update the dropdown instance
	   * @param {Object} [opts={}] - Options for updating the instance
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    // Remove event handlers
	    Util.removeEvents(this.events);
	    const flyoutOpts = {
	      ...opts
	    };
	    flyoutOpts.enableFade = false; // disable flyout fade feature

	    // Multi-level
	    this.subMenus = Array.from(this.menu.querySelectorAll(Selector$g.MENU));
	    if (this.subMenus) {
	      if (this.subDropdowns) {
	        this.subDropdowns.forEach(subDropdown => subDropdown.remove());
	      }
	      this.subDropdowns = _classPrivateFieldLooseBase(this, _createSubDropdowns)[_createSubDropdowns]();
	    }
	    if (this.arrowableItems !== undefined) {
	      // Update the list of known focusable items within the menu.
	      this.arrowableItems = _classPrivateFieldLooseBase(this, _getArrowableItems)[_getArrowableItems]();
	    }
	    if (opts.placement) {
	      flyoutOpts.placement = _getPlacement(opts.placement, Default$3.PLACEMENT);
	    }
	    super.update(flyoutOpts);

	    // Invert dropleft/dropright classes that switch orientation in RTL
	    const invertedPlacement = _getPlacement(this.placement, Default$3.PLACEMENT);
	    _updatePlacementClass(this.parent, invertedPlacement);

	    // Add event handlers
	    this.events = _classPrivateFieldLooseBase(this, _generateEvents$3)[_generateEvents$3]();
	    Util.addEvents(this.events);

	    // Create and dispatch custom event
	    this[EventName$g.ON_UPDATE] = new CustomEvent(EventName$g.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$g.ON_UPDATE]);
	  }

	  /**
	   * Remove the dropdown instance
	   */
	  remove() {
	    // Remove event handlers, observers, etc.
	    Util.removeEvents(this.events);

	    // Disconnect mutation observer
	    this.menuObserver.disconnect();

	    // Remove all subDropdown instances
	    if (this.subDropdowns) {
	      this.subDropdowns.forEach(subDropdown => subDropdown.remove());
	    }

	    // Remove this reference from the array of instances
	    const index = dropdowns.indexOf(this);
	    dropdowns.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$g.ON_REMOVE] = new CustomEvent(EventName$g.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$g.ON_REMOVE]);
	  }

	  /**
	   * Get an array of dropdown instances
	   * @returns {Object[]} Array of dropdown instances
	   */
	  static getInstances() {
	    return dropdowns;
	  }
	}
	function _createSubDropdowns2() {
	  const subDropdowns = [];
	  this.subMenus.forEach(subMenu => {
	    subDropdowns.push(new Dropdown({
	      el: this.menu.querySelector(`[aria-controls=${subMenu.id}]`)
	    }));
	  });
	  return subDropdowns;
	}
	function _getArrowableItems2() {
	  // Get arrowable items within immediate children of the menu, excluding submenus
	  const childrenSet = new Set(this.menu.children);
	  return Util.getTabbableElements(this.menu).filter(el => childrenSet.has(el.parentElement));
	}
	function _generateEvents2$1() {
	  const events = [{
	    el: this.el,
	    type: 'click',
	    handler: _elOnClick$2.bind(this)
	  }, {
	    el: this.el,
	    type: 'keydown',
	    handler: _elOnKeydown$1.bind(this)
	  }, {
	    el: this.menu,
	    type: 'keydown',
	    handler: _menuOnKeydown$1.bind(this)
	  }];

	  // Don't add document event handlers to sub dropdowns
	  if (!this.isSubDropdown) {
	    events.push({
	      el: document,
	      type: 'mousedown',
	      handler: _documentOnMousedown$1.bind(this)
	    }, {
	      el: document,
	      type: 'focusin',
	      handler: _documentOnFocusin$1.bind(this)
	    }, {
	      el: document,
	      type: 'keydown',
	      handler: _documentOnKeydown.bind(this)
	    });
	  }
	  if (this.subMenus.length > 0) {
	    this.subMenus.forEach(subMenu => {
	      events.push({
	        el: subMenu,
	        type: 'mouseenter',
	        handler: _subMenuMouseEnter.bind(this)
	      }, {
	        el: subMenu,
	        type: 'mouseleave',
	        handler: _subMenuMouseLeave.bind(this)
	      });
	    });
	    if (this.subDropdowns) {
	      this.subDropdowns.forEach(subDropdown => {
	        events.push({
	          el: subDropdown.el,
	          type: 'mouseenter',
	          handler: _subDropdownMouseEnter.bind(this)
	        }, {
	          el: subDropdown.el,
	          type: 'mouseleave',
	          handler: _subDropdownMouseLeave.bind(this)
	        });
	      });
	    }
	  }
	  return events;
	}

	const formStars = [];
	const Selector$f = {
	  DATA_MOUNT: '[data-mount="form-star"]',
	  INPUTS: '.form-star-input',
	  LABEL: 'data-checked-label',
	  TEXT: '.form-star-text'
	};
	const ClassName$a = {
	  EMPTY: 'form-star-empty'
	};
	const EventName$f = {
	  ON_REMOVE: 'onRemove'
	};

	/**
	 * Remove empty class
	 */
	function _removeEmptyStyles() {
	  this.el.classList.remove(ClassName$a.EMPTY);
	}

	/**
	 * Mouse leave event
	 */
	function _onMouseLeave$1() {
	  if (!this.getCheckedInputs().length) {
	    this.el.classList.add(ClassName$a.EMPTY);
	  }
	}

	/**
	 * Change event
	 */
	function _onChange(e) {
	  this.checkedLabel.textContent = e.target.labels[0].querySelector(Selector$f.TEXT).textContent;
	  _removeEmptyStyles.bind(this)();
	}

	/**
	 * Check for disabled form elements
	 * @returns {boolean} true if fieldset or all radios are disabled
	 */
	function _isDisabled() {
	  const disabled = [].slice.call(this.inputs).filter(input => input.disabled === true);
	  return disabled.length === this.inputs.length || this.el.closest('fieldset').disabled;
	}

	/**
	 * HTMLInputElement.labels for unsupported browsers
	 */
	function _setLabels() {
	  if (!this.inputs[0].labels) {
	    const labels = this.el.querySelectorAll('label');
	    [].slice.call(labels).forEach(label => {
	      if (label.htmlFor) {
	        const input = document.getElementById(label.htmlFor);
	        if (input) {
	          input.labels = [label];
	        }
	      }
	    });
	  }
	}

	/**
	 * Class representing form star.
	 */
	class FormStar {
	  /**
	   * Create a FormStar instance
	   * @param {Object} opts - The form star options.
	   * @param {HTMLElement} opts.el - The form star wrapping element.
	   * @param {HTMLElement} opts.checkedLabel - The visible container for the checked input label text.
	   */
	  constructor(opts) {
	    this.el = opts.el;
	    this.inputs = this.el.querySelectorAll(Selector$f.INPUTS);
	    this.checkedLabel = opts.checkedLabel || document.getElementById(this.el.getAttribute(Selector$f.LABEL));
	    this.isDisabled = _isDisabled.bind(this)();
	    this.events = [{
	      el: this.el,
	      type: 'mouseenter',
	      handler: _removeEmptyStyles.bind(this)
	    }, {
	      el: this.el,
	      type: 'mouseleave',
	      handler: _onMouseLeave$1.bind(this)
	    }, {
	      el: this.el,
	      type: 'change',
	      handler: e => {
	        _onChange.bind(this)(e);
	      }
	    }];
	    if (this.isDisabled) {
	      this.events = [];
	    }
	    formStars.push(this);
	    _setLabels.bind(this)();
	    const checked = this.getCheckedInputs();
	    if (checked.length) {
	      this.checkedLabel.textContent = checked[0].labels[0].querySelector(Selector$f.TEXT).textContent;
	    } else {
	      this.el.classList.add(ClassName$a.EMPTY);
	    }

	    // Add event handlers.
	    Util.addEvents(this.events);
	  }

	  /**
	   * Filters for checked inputs
	   * @returns {array} checked inputs
	   */
	  getCheckedInputs() {
	    return [].slice.call(this.inputs).filter(input => input.checked === true);
	  }

	  /**
	   * Remove the form star.
	   */
	  remove() {
	    // Remove event handlers.
	    Util.removeEvents(this.events);

	    // Remove this form star reference from array of instances
	    const index = formStars.indexOf(this);
	    formStars.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$f.ON_REMOVE] = new CustomEvent(EventName$f.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$f.ON_REMOVE]);
	  }

	  /**
	   * Get an array of form star instances.
	   * @returns {Object[]} Array of form star instances.
	   */
	  static getInstances() {
	    return formStars;
	  }
	}

	const Selector$e = {
	  DATA_MOUNT: '.needs-validation, [data-mount="validation"]',
	  INPUTS: 'input, select, textarea',
	  SUBMIT: '[type="submit"]',
	  FEEDBACK_LIST: '[data-mount="feedback-list"]',
	  FEEDBACK_EL: 'data-feedback',
	  FEEDBACK_CONTENT: 'data-feedback-content',
	  CHECKBOX_REQUIRED: 'data-form-check-required',
	  CHECKBOX_MAX: 'data-form-check-max'
	};
	const EventName$e = {
	  ON_VALID: 'onValid',
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate'
	};
	const ClassName$9 = {
	  DISPLAY: {
	    NONE: 'd-none'
	  },
	  IS_INVALID: 'is-invalid'
	};
	const formValidations = [];

	/**
	 * Private functions.
	 */

	/**
	 * Create link to input field with feedback at bottom of form
	 * @param {HTMLInputElement} input - The form input field.
	 */
	function _createFeedbackLink(input) {
	  if (!input.feedback.link) {
	    const feedbackItem = document.createElement('li');
	    const feedbackLink = document.createElement('a');
	    const feedbackTextNode = document.createTextNode(input.feedback.content);
	    feedbackLink.setAttribute('href', `#${input.id}`);
	    input.feedback.focusControls = new Util.FocusControls({
	      el: feedbackLink
	    });
	    feedbackLink.append(feedbackTextNode);
	    feedbackItem.append(feedbackLink);
	    input.feedback.link = feedbackItem;
	    if (input.group) {
	      input.group.siblings.forEach(sibling => {
	        sibling.feedback.link = feedbackItem;
	        sibling.feedback.focusControls = input.feedback.focusControls;
	      });
	    }
	  }
	  this.feedbackList.append(input.feedback.link);
	  if (!input.feedback.focusControls) {
	    input.feedback.focusControls = new Util.FocusControls({
	      el: input.feedback.link.querySelector('a')
	    });
	  }
	  input.feedback.linkRemoved = false;
	  if (input.group) {
	    input.group.siblings.forEach(sibling => {
	      sibling.feedback.linkRemoved = false;
	    });
	  }
	  this.feedbackListContainer.classList.remove(ClassName$9.DISPLAY.NONE);
	}

	/**
	 * Remove link to input field with feedback at bottom of form
	 * @param {HTMLElement} input - The form input field.
	 */
	function _removeFeedbackLink(input) {
	  if (input.group) {
	    input.group.siblings.forEach(sibling => {
	      sibling.feedback.linkRemoved = true;
	      sibling.feedback.focusControls.remove();
	    });
	  } else {
	    input.feedback.linkRemoved = true;
	    input.feedback.focusControls.remove();
	  }
	  input.feedback.link.remove();
	  if (this.feedbackList.children.length === 0) {
	    this.feedbackListContainer.classList.add(ClassName$9.DISPLAY.NONE);
	  }
	}

	/**
	 * Generate feedback data object from data attributes
	 * @param {HTMLInputElement} input - The form input field.
	 * @returns {Object} Object with feedback data.
	 */
	function _getFeedbackData(input) {
	  const feedback = {
	    id: input.getAttribute(Selector$e.FEEDBACK_EL)
	  };
	  if (feedback.id) {
	    feedback.content = input.getAttribute(Selector$e.FEEDBACK_CONTENT);
	    feedback.el = this.el.querySelector(`#${feedback.id}`);
	    feedback.linkRemoved = true;
	  }
	  return feedback;
	}

	/**
	 * Events for when input is valid
	 * @param {HTMLInputElement} input - The form input field.
	 */
	function _onValid(input) {
	  input.classList.remove(ClassName$9.IS_INVALID);
	  input.setAttribute('aria-invalid', 'false');
	  if (input.group) {
	    input.group.siblings.forEach(sibling => {
	      sibling.classList.remove(ClassName$9.IS_INVALID);
	      sibling.setAttribute('aria-invalid', false);
	    });
	  }
	  if (input.feedback.el) {
	    input.feedback.el.classList.remove(ClassName$9.IS_INVALID);
	    input.feedback.el.textContent = '';
	    if (this.feedbackList && input.feedback.link && !input.feedback.linkRemoved) {
	      _removeFeedbackLink.bind(this)(input);
	    }
	  }
	}

	/**
	 * Events for when input is invalid
	 * @param {HTMLElement | Object} input - The form input field.
	 * @param {Object} input.feedback - The feedback options.
	 * @param {HTMLElement} input.feedback.el - The input feedback element.
	 * @param {string} input.feedback.content - The feedback content.
	 */
	function _onInvalid(input) {
	  input.classList.add(ClassName$9.IS_INVALID);
	  input.setAttribute('aria-invalid', true);
	  if (input.group) {
	    input.group.siblings.forEach(sibling => {
	      sibling.classList.add(ClassName$9.IS_INVALID);
	      sibling.setAttribute('aria-invalid', true);
	    });
	  }
	  if (input.feedback.el && input.feedback.content) {
	    input.feedback.el.classList.add(ClassName$9.IS_INVALID);
	    input.feedback.el.textContent = input.feedback.content;
	    if (this.feedbackList && input.feedback.linkRemoved) {
	      _createFeedbackLink.bind(this)(input);
	    }
	  }
	}

	/**
	 * Generate group data object from input
	 * @param {HTMLInputElement} input - The form input field.
	 * @returns {Object} Object with group data.
	 */
	function _inputCheckReducer(input) {
	  const {
	    name,
	    type
	  } = input;
	  // eslint-disable-next-line unicorn/no-array-reduce
	  return [].slice.call(this.inputs).reduce((obj, _input) => {
	    if (_input.type === type && _input.name === name) {
	      if (obj.siblings) {
	        obj.siblings.push(_input);
	      } else {
	        obj.siblings = [_input];
	      }
	      const requiredMin = _input.getAttribute(Selector$e.CHECKBOX_REQUIRED);
	      const maxValid = _input.getAttribute(Selector$e.CHECKBOX_MAX);
	      // Selector.CHECKBOX_REQUIRED attribute accepts either a boolean or integer
	      // If it's a boolean convert to an integer
	      if (requiredMin) {
	        let requiredMinInt = Number(requiredMin);
	        if (isNaN(requiredMinInt)) {
	          requiredMinInt = requiredMin === 'true' ? 1 : 0;
	        }
	        obj.requiredMin = requiredMinInt;
	      }
	      if (maxValid) {
	        const maxValidInt = Number(maxValid);
	        const maxValidIntIsNaN = isNaN(maxValidInt);
	        if (!maxValidIntIsNaN) {
	          obj.maxValid = maxValidInt;
	        }
	      }
	      if (_input.getAttribute(Selector$e.FEEDBACK_EL)) {
	        if (obj.feedback) {
	          obj.feedback.push(_input);
	        } else {
	          obj.feedback = [_input];
	        }
	      }
	    }
	    return obj;
	  }, {});
	}

	/**
	 * Setup inputs with required data.
	 * @param {HTMLInputElement} input - The form input field.
	 */
	function _inputInit(input) {
	  const {
	    type,
	    required
	  } = input;
	  let feedbackEl = input;
	  if (required) {
	    // the default aria-invalid attribute is false but some screen readers do not respect this
	    input.setAttribute('aria-invalid', 'false');
	  }
	  if (type === 'radio' || type === 'checkbox') {
	    const group = _inputCheckReducer.bind(this)(input);
	    const {
	      feedback,
	      ..._group
	    } = group;
	    if (_group.siblings.length > 1) {
	      input.group = _group;
	    }
	    if (feedback) {
	      feedbackEl = feedback[0];
	    }
	  }
	  input.feedback = _getFeedbackData.bind(this)(feedbackEl);
	}

	/**
	 * Set first element to receive focus in the feedback list
	 */
	function _setFeedbackListFocusEl() {
	  const tagNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P'];
	  const prevEl = this.feedbackList.previousElementSibling;
	  this.feedbackListFocusEl = this.feedbackListContainer;
	  if (prevEl && tagNames.indexOf(prevEl.tagName) > -1) {
	    this.feedbackListFocusEl = prevEl;
	  }
	  this.feedbackListFocusEl.tabIndex = -1;
	}

	/**
	 * Unset current element to receive focus in the feedbacklist
	 */
	function _unsetFeedbackListFocusEl() {
	  this.feedbackListFocusEl.removeAttribute('tabIndex');
	}

	// Moved event declarations outside of constructor for calling in update.
	/**
	 * Adds submit event to events array
	 */
	function _setupSubmitEvent() {
	  this.events.push({
	    el: this.el,
	    type: 'submit',
	    handler: e => {
	      this.onSubmit(e);
	    }
	  });
	}

	/**
	 * Adds blur and change events for all input, select, and textarea elements to events array
	 */
	function _setupInputEvents() {
	  // Set up inputs
	  this.inputs.forEach(input => {
	    _inputInit.bind(this)(input);
	    this.events.push({
	      el: input,
	      type: 'blur',
	      handler: () => {
	        setTimeout(() => {
	          this.validate(input, true);
	        }, 0);
	      }
	    }, {
	      el: input,
	      type: 'change',
	      handler: () => {
	        this.validate(input, true);
	      }
	    });
	  });
	}

	/**
	 * Class representing form validation.
	 */
	class FormValidation {
	  /**
	   * Create a FormValidation instance
	   * @param {Object} opts - The form validation options
	   * @param {HTMLElement} opts.el - The form DOM node
	   * @param {Boolean} [opts.preventFormSubmission=false] - Flag to prevent form submission
	   * @param {Boolean} [opts.allowEmptySubmit=false] - Flag that determines whether to allow empty forms to submit
	   * @param {HTMLElement} [opts.feedbackListContainer] - The feedback list container DOM node
	   */
	  constructor(_ref) {
	    let {
	      el,
	      preventFormSubmission = false,
	      allowEmptySubmit = false,
	      feedbackListContainer
	    } = _ref;
	    this.el = el;
	    // Property `preventFormSubmission` takes precedence over `allowEmptySubmit`
	    this.preventFormSubmission = preventFormSubmission || this.el.dataset.preventFormSubmission !== undefined;
	    this.allowEmptySubmit = allowEmptySubmit || this.el.dataset.allowEmptySubmit !== undefined;
	    this.inputs = this.el.querySelectorAll(Selector$e.INPUTS);
	    this.submit = this.el.querySelector(Selector$e.SUBMIT);
	    this.feedbackListContainer = feedbackListContainer || this.el.querySelector(Selector$e.FEEDBACK_LIST);
	    if (this.feedbackListContainer) {
	      this.feedbackList = this.feedbackListContainer.querySelector('ol');
	      _setFeedbackListFocusEl.call(this);
	    }
	    this.events = [];
	    _setupSubmitEvent.call(this);
	    formValidations.push(this);

	    // Hide empty feedback list
	    if (this.feedbackList && this.feedbackList.children.length === 0) {
	      this.feedbackListContainer.classList.add(ClassName$9.DISPLAY.NONE);
	    }
	    _setupInputEvents.call(this);

	    // Add event handlers.
	    Util.addEvents(this.events);
	  }

	  /**
	   * Validate form input
	   * @param {HTMLInputElement} input - The form input field.
	   * @param {boolean} [onlyOnValid] - Only runs if valid.
	   */
	  validate(input, onlyOnValid) {
	    if (onlyOnValid === void 0) {
	      onlyOnValid = false;
	    }
	    const activeEl = document.activeElement;
	    // Don't validate input groups until focus has left the group
	    if (input.group && input.name === activeEl.name) {
	      return;
	    }
	    if (this.isInputValid(input)) {
	      _onValid.bind(this)(input);
	    } else if (!onlyOnValid) {
	      _onInvalid.bind(this)(input);
	    }
	  }

	  /**
	   * Check if input is valid
	   * @param {HTMLInputElement} input - The form input field.
	   * @returns {Boolean} - true if input is valid.
	   */
	  isInputValid(input) {
	    // Radio and check groups
	    if (input.group && (input.group.requiredMin || input.group.maxValid)) {
	      // get number of checked inputs in the group
	      const checked = input.group.siblings.filter(sibling => sibling.checked === true);
	      // compare against required min or max
	      if (input.group.requiredMin && checked.length < input.group.requiredMin || input.group.maxValid && checked.length > input.group.maxValid) {
	        return false;
	      }
	      return true;
	    }
	    return input.checkValidity();
	  }

	  /**
	   * Check if form is valid
	   * @returns {Boolean} - true if all form inputs are valid.
	   */
	  isFormValid() {
	    const checkValidity = [].slice.call(this.inputs).some(input => this.isInputValid(input) === false);
	    return !checkValidity;
	  }

	  /**
	   * Check if form is empty
	   * @returns {Boolean} - false if any form inputs are checked or have a value.
	   */
	  isFormEmpty() {
	    const notEmpty = [].slice.call(this.inputs).some(input => {
	      const {
	        type,
	        value,
	        checked
	      } = input;
	      if (type === 'radio' || type === 'checkbox') {
	        if (checked) {
	          return true;
	        }
	      } else if (value !== null && value !== undefined && value.trim().length) {
	        return true;
	      }
	      return false;
	    });
	    return !notEmpty;
	  }

	  /**
	   * Submit form
	   * @param {Event} e - The event object.
	   */
	  onSubmit(e) {
	    e.preventDefault();
	    this.inputs.forEach(input => {
	      this.validate(input);
	    });
	    if (this.isFormValid()) {
	      // Create and dispatch custom event
	      this[EventName$e.ON_VALID] = new CustomEvent(EventName$e.ON_VALID, {
	        bubbles: true
	      });
	      this.el.dispatchEvent(this[EventName$e.ON_VALID]);
	      if (!this.preventFormSubmission && (!this.isFormEmpty() || this.allowEmptySubmit)) {
	        this.el.submit();
	      }
	    } else if (this.feedbackListFocusEl) {
	      this.feedbackListFocusEl.focus();
	    }
	  }

	  /**
	   * Update form validation.
	   * @param {Object} opts - The form validation options
	   * @param {Boolean} [opts.preventFormSubmission] - Flag to prevent form submission
	   * @param {HTMLElement} [opts.feedbackListContainer] - The feedback list container DOM node
	   * @param {Boolean} [opts.allowEmptySubmit] - Flag that determines whether to allow empty forms to submit
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    if (opts) {
	      this.inputs = this.el.querySelectorAll(Selector$e.INPUTS);
	      this.submit = this.el.querySelector(Selector$e.SUBMIT);

	      // Remove event handlers
	      Util.removeEvents(this.events);

	      // Rebuild events array
	      this.events = [];
	      _setupSubmitEvent.call(this);
	      _setupInputEvents.call(this);
	      Util.addEvents(this.events);

	      // Property `preventFormSubmission` takes precedence over `allowEmptySubmit`
	      if (opts.preventFormSubmission) {
	        this.preventFormSubmission = opts.preventFormSubmission;
	      }
	      if (opts.feedbackListContainer) {
	        _unsetFeedbackListFocusEl.call(this);
	        this.feedbackListContainer = opts.feedbackListContainer;
	        this.feedbackList = this.feedbackListContainer.querySelector('ol');
	        _setFeedbackListFocusEl.call(this);
	        if (this.feedbackList.children.length === 0) {
	          this.feedbackListContainer.classList.add(ClassName$9.DISPLAY.NONE);
	        } else {
	          this.feedbackListContainer.classList.remove(ClassName$9.DISPLAY.NONE);
	        }
	      }
	      if (opts.allowEmptySubmit) {
	        this.allowEmptySubmit = opts.allowEmptySubmit;
	      }
	    }

	    // Create and dispatch custom event
	    this[EventName$e.ON_UPDATE] = new CustomEvent(EventName$e.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$e.ON_UPDATE]);
	  }

	  /**
	   * Remove the form validation.
	   */
	  remove() {
	    // Remove event handlers
	    Util.removeEvents(this.events);

	    // Remove this form validation reference from array of instances
	    const index = formValidations.indexOf(this);
	    formValidations.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$e.ON_REMOVE] = new CustomEvent(EventName$e.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$e.ON_REMOVE]);
	  }

	  /**
	   * Get an array of form validation instances.
	   * @returns {Object[]} Array of form validation instances.
	   */
	  static getInstances() {
	    return formValidations;
	  }
	}

	const instances$5 = [];
	const EventName$d = {
	  CLICK: 'click',
	  HIDE: 'onHide',
	  HIDDEN: 'onHidden',
	  SHOW: 'onShow',
	  SHOWN: 'onShown',
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate',
	  FOCUSIN: 'focusin',
	  RESIZE: 'resize',
	  CLICK_DISMISS: 'click.dismiss',
	  KEYDOWN: 'keydown'
	};
	const ClassName$8 = {
	  SCROLLABLE: 'modal-dialog-scrollable',
	  SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
	  BACKDROP: 'modal-backdrop',
	  OPEN: 'modal-open',
	  FADE: 'fade',
	  SHOW: 'show'
	};
	const Selector$d = {
	  DIALOG: '.modal-dialog',
	  MODAL_BODY: '.modal-body',
	  DATA_MOUNT: '[data-mount="modal"]',
	  DATA_DISMISS: '[data-dismiss="modal"]',
	  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
	  STICKY_CONTENT: '.sticky-top'
	};

	// Event Handlers

	/**
	 * Handler for keydown event
	 * @param {Event} event - the event captured by the listener
	 * @this Modal
	 */
	function onKeydown(event) {
	  switch (Util.getKeyCode(event)) {
	    case Util.keyCodes.ESC:
	      {
	        event.preventDefault();
	        this.hide();
	        break;
	      }
	    case Util.keyCodes.TAB:
	      {
	        if ((document.activeElement === this.firstTabbableElement || document.activeElement === this.el) && event.shiftKey) {
	          event.preventDefault();
	          this.lastTabbableElement.focus();
	        }
	        if (document.activeElement === this.lastTabbableElement && !event.shiftKey) {
	          event.preventDefault();
	          this.firstTabbableElement.focus();
	        }
	        break;
	      }
	  }
	}

	/**
	 * Handler for document focusin event
	 * @param {Event} event - the event captured by the listener
	 * @this Modal
	 */
	function onDocumentFocusin(event) {
	  if (document !== event.target && this.el !== event.target && !this.el.contains(event.target)) {
	    this.el.focus();
	  }
	}

	/**
	 * Handler for backdrop event
	 * @param {Event} event - the event captured by the listener
	 * @this Modal
	 */
	function onBackdropClick(event) {
	  if (!this.dialog.contains(event.target)) {
	    // create and dispatch the event
	    this.el.dispatchEvent(this[EventName$d.CLICK_DISMISS]);
	  }
	}

	/**
	 * Handler for dismiss click event
	 * @param {Event} event - the event captured by the listener
	 * @this Modal
	 */
	function onClickDismiss(event) {
	  if (event.target !== event.currentTarget) {
	    return;
	  }
	  this.hide();
	}

	/**
	 * Handles the internal logic for showing an element
	 * @this Modal
	 */
	function _showElement() {
	  const transition = this.el.classList.contains(ClassName$8.FADE);
	  if (!this.el.parentNode || this.el.parentNode.nodeType !== Node.ELEMENT_NODE) {
	    // Don't move modal's DOM position
	    document.body.append(this.el);
	  }
	  this.el.style.display = 'block';
	  this.el.removeAttribute('aria-hidden');
	  this.el.setAttribute('aria-modal', 'true');
	  if (this.dialog.classList.contains(ClassName$8.SCROLLABLE)) {
	    this.dialog.querySelector(Selector$d.MODAL_BODY).scrollTop = 0;
	  } else {
	    this.el.scrollTop = 0;
	  }
	  if (transition) {
	    Util.reflow(this.el);
	  }
	  this.el.classList.add(ClassName$8.SHOW);
	  _enforceFocus.call(this);
	  const transitionComplete = () => {
	    // Place initial focus on the Close button to match Popover behavior
	    const closeBtn = this.dialog.querySelector(Selector$d.DATA_DISMISS);
	    if (closeBtn) {
	      closeBtn.focus();
	    }
	    this.isTransitioning = false;
	    this.el.dispatchEvent(this[EventName$d.SHOWN]);
	  };
	  if (transition) {
	    const transitionDuration = Util.getTransitionDurationFromElement(this.dialog);
	    this.dialog.addEventListener(Util.TRANSITION_END, transitionComplete.bind(this), {
	      once: true
	    });
	    Util.emulateTransitionEnd(this.dialog, transitionDuration);
	  } else {
	    transitionComplete.call(this);
	  }
	}

	/**
	 * Ensures the the focus is enforced on an element
	 * @this Modal
	 */
	function _enforceFocus() {
	  // Guard against infinite focus loop
	  document.removeEventListener(EventName$d.FOCUSIN, this.onDocumentFocusin);
	  document.addEventListener(EventName$d.FOCUSIN, this.onDocumentFocusin);
	}

	/**
	 * Add or remove the event listeners for the keydown event
	 * @this Modal
	 */
	function _setKeydownEvents() {
	  if (this.isShown) {
	    this.el.addEventListener(EventName$d.KEYDOWN, this.onKeydown);
	  } else {
	    this.el.removeEventListener(EventName$d.KEYDOWN, this.onKeydown);
	  }
	}

	/**
	 * Add or remove the resize event
	 * @this Modal
	 */
	function _setResizeEvent() {
	  if (this.isShown) {
	    window.addEventListener(EventName$d.RESIZE, this.handleUpdate);
	  } else {
	    window.removeEventListener(EventName$d.RESIZE, this.handleUpdate);
	  }
	}

	/**
	 * Hide a modal
	 * @this Modal
	 */
	function _hideModal() {
	  this.el.style.display = 'none';
	  this.el.setAttribute('aria-hidden', true);
	  this.el.removeAttribute('aria-modal');
	  this.isTransitioning = false;
	  _showBackdrop.call(this, () => {
	    document.body.classList.remove(ClassName$8.OPEN);
	    _resetAdjustments.call(this);
	    _resetScrollbar.call(this);
	    this.el.dispatchEvent(this[EventName$d.HIDDEN]);
	    document.body.removeEventListener(EventName$d.CLICK, this.onBackdropClick);
	  });
	}

	/**
	 * Remove backdrop from DOM
	 * @this Modal
	 */
	function _removeBackdrop() {
	  if (this.backdrop) {
	    this.backdrop.remove();
	    this.backdrop = null;
	  }

	  // Return the focus to the trigger
	  if (this.trigger) {
	    this.trigger.focus();
	  }
	}

	/**
	 * Show Backdrop
	 * @param {Function} callback Function to callback once backdrop is shown
	 * @this Modal
	 */
	function _showBackdrop(callback) {
	  const animate = this.el.classList.contains(ClassName$8.FADE) ? ClassName$8.FADE : '';
	  if (this.isShown) {
	    this.backdrop = document.createElement('div');
	    this.backdrop.className = ClassName$8.BACKDROP;
	    if (animate) {
	      this.backdrop.classList.add(animate);
	    }
	    document.body.append(this.backdrop);
	    document.body.addEventListener(EventName$d.CLICK, this.onBackdropClick);
	    this.el.addEventListener(EventName$d.CLICK_DISMISS, this.onClickDismiss);
	    if (animate) {
	      Util.reflow(this.backdrop);
	    }
	    this.backdrop.classList.add(ClassName$8.SHOW);
	    if (!callback) {
	      return;
	    }
	    if (!animate) {
	      callback();
	      return;
	    }
	    const backdropTransitionDuration = Util.getTransitionDurationFromElement(this.backdrop);
	    this.backdrop.addEventListener(Util.TRANSITION_END, callback, {
	      once: true
	    });
	    Util.emulateTransitionEnd(this.backdrop, backdropTransitionDuration);
	  } else if (!this.isShown && this.backdrop) {
	    this.backdrop.classList.remove(ClassName$8.SHOW);
	    const callbackRemove = () => {
	      _removeBackdrop.call(this);
	      if (callback) {
	        callback();
	      }
	    };
	    if (this.el.classList.contains(ClassName$8.FADE)) {
	      const backdropTransitionDuration = Util.getTransitionDurationFromElement(this.backdrop);
	      this.backdrop.addEventListener(Util.TRANSITION_END, callbackRemove, {
	        once: true
	      });
	      Util.emulateTransitionEnd(this.backdrop, backdropTransitionDuration);
	    } else {
	      callbackRemove();
	    }
	  } else if (callback) {
	    callback();
	  }
	}

	// ----------------------------------------------------------------------
	// the following methods are used to handle overflowing modals
	// ----------------------------------------------------------------------

	function _adjustDialog() {
	  const isModalOverflowing = this.el.scrollHeight > document.documentElement.clientHeight;
	  if (!this.isBodyOverflowing && isModalOverflowing) {
	    this.el.style.paddingLeft = `${this.scrollbarWidth}px`;
	  }
	  if (this.isBodyOverflowing && !isModalOverflowing) {
	    this.el.style.paddingRight = `${this.scrollbarWidth}px`;
	  }
	}
	function _resetAdjustments() {
	  this.el.style.paddingLeft = '';
	  this.el.style.paddingRight = '';
	}
	function _checkScrollbar() {
	  const rect = document.body.getBoundingClientRect();
	  this.isBodyOverflowing = rect.left + rect.right < window.innerWidth;
	  this.scrollbarWidth = _getScrollbarWidth();
	}
	function _setScrollbar() {
	  if (this.isBodyOverflowing) {
	    // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
	    const fixedContent = [].slice.call(document.querySelectorAll(Selector$d.FIXED_CONTENT));
	    const stickyContent = [].slice.call(document.querySelectorAll(Selector$d.STICKY_CONTENT));

	    // Adjust fixed content padding
	    fixedContent.forEach(element => {
	      const actualPadding = element.style.paddingRight ?? 0;
	      const calculatedPadding = getComputedStyle(element)['padding-right'];
	      this.data.set({
	        element,
	        attribute: 'padding-right'
	      }, actualPadding);
	      element.style.paddingRight = `${parseFloat(calculatedPadding) + this.scrollbarWidth}px`;
	    });

	    // Adjust sticky content margin
	    stickyContent.forEach(element => {
	      const actualMargin = element.style.marginRight ?? 0;
	      const calculatedMargin = getComputedStyle(element)['margin-right'];
	      this.data.set({
	        element,
	        attribute: 'margin-right'
	      }, actualMargin);
	      element.style.marginRight = `${parseFloat(calculatedMargin) - this.scrollbarWidth}px`;
	    });

	    // Adjust body padding
	    const actualPadding = document.body.style.paddingRight ?? 0;
	    const calculatedPadding = getComputedStyle(document.body)['padding-right'];
	    this.data.set({
	      element: document.body,
	      attribute: 'padding-right'
	    }, actualPadding);
	    document.body.style.paddingRight = `${parseFloat(calculatedPadding) + this.scrollbarWidth}px`;
	  }
	  document.body.classList.add(ClassName$8.OPEN);
	}
	function _resetScrollbar() {
	  // Restore fixed content padding
	  const fixedContent = [].slice.call(document.querySelectorAll(Selector$d.FIXED_CONTENT));
	  fixedContent.forEach(element => {
	    const key = {
	      element,
	      attribute: 'padding-right'
	    };
	    // Retrieve the element from the Map
	    const padding = this.data.get(key);
	    element.style.paddingRight = padding ?? '';
	    // Remove the item from the map
	    this.data.delete(key);
	  });

	  // Restore sticky content
	  const elements = [].slice.call(document.querySelectorAll(`${Selector$d.STICKY_CONTENT}`));
	  elements.forEach(element => {
	    const key = {
	      element,
	      attribute: 'margin-right'
	    };
	    // Retrieve the element from the Map
	    const margin = this.data.get(key);
	    if (margin !== undefined) {
	      element.style.marginRight = margin;
	      this.data.delete(key);
	    }
	  });

	  // Restore body padding
	  const key = {
	    element: document.body,
	    attribute: 'padding-right'
	  };
	  const padding = this.data.get(key);
	  this.data.delete(key);
	  document.body.style.paddingRight = padding ?? '';
	}
	function _getScrollbarWidth() {
	  // thx d.walsh
	  const scrollDiv = document.createElement('div');
	  scrollDiv.className = ClassName$8.SCROLLBAR_MEASURER;
	  document.body.append(scrollDiv);
	  const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
	  scrollDiv.remove();
	  return scrollbarWidth;
	}

	/**
	 * @this Modal
	 */
	function _setTabbableElements$1() {
	  this.tabbableElements = Util.getTabbableElements(this.dialog).filter(el => el.offsetHeight > 0);
	  this.firstTabbableElement = this.tabbableElements[0];
	  this.lastTabbableElement = this.tabbableElements[this.tabbableElements.length - 1];
	}
	class Modal {
	  /**
	   * Create a Modal instance
	   * @param {Object} opts - The modal options.
	   * @param {HTMLElement} opts.el - The modal.
	   * @param {Boolean} [opts.displayOnInit=false] - whether to display modal after init
	   */
	  constructor(_ref) {
	    let {
	      el,
	      displayOnInit = false
	    } = _ref;
	    // Modal element
	    this.el = el;

	    // Toggle button for modal
	    this.button = document.querySelector(`[data-target="#${this.el.id}"]`); // Deprecated - Keeping this so there won't be any breaking changes in case consumers has already writing code on an element and not a NodeList.
	    this.buttons = document.querySelectorAll(`[data-target="#${this.el.id}"]`);
	    this.dialog = this.el.querySelector(Selector$d.DIALOG);
	    this.backdrop = null;
	    this.isShown = false;
	    this.isBodyOverflowing = false;
	    this.isTransitioning = false;
	    this.scrollbarWidth = 0;
	    this.data = new WeakMap();
	    this.dialogObserver = new MutationObserver(_setTabbableElements$1.bind(this));
	    this[EventName$d.SHOWN] = new CustomEvent(EventName$d.SHOWN, {
	      detail: this.el
	    });
	    this[EventName$d.SHOW] = new CustomEvent(EventName$d.SHOW, {
	      detail: this.el
	    });
	    this[EventName$d.HIDE] = new CustomEvent(EventName$d.HIDE);
	    this[EventName$d.HIDDEN] = new CustomEvent(EventName$d.HIDDEN);
	    this[EventName$d.CLICK_DISMISS] = new CustomEvent(EventName$d.CLICK_DISMISS);

	    // Add event handlers
	    this.events = [];
	    if (this.buttons) {
	      this.buttons.forEach(el => {
	        this.events.push({
	          el,
	          type: EventName$d.CLICK,
	          handler: event => {
	            this.toggle(event);
	          }
	        });
	      });
	      Util.addEvents(this.events);
	    }

	    // create method bindings for functions called outside constructor
	    this.onDocumentFocusin = onDocumentFocusin.bind(this);
	    this.onKeydown = onKeydown.bind(this);
	    this.onBackdropClick = onBackdropClick.bind(this);
	    this.onClickDismiss = onClickDismiss.bind(this);
	    this.handleUpdate = this.handleUpdate.bind(this);
	    this.hide = this.hide.bind(this);
	    if (displayOnInit || this.el.dataset.displayOnInit === 'true') {
	      this.show();
	    }
	    instances$5.push(this);
	  }

	  /**
	   * Toggle hide and show states of the modal
	   * @param {Event} event - The event that fired the toggle
	   */
	  toggle(event) {
	    if (event) {
	      this.trigger = event.target;
	    }
	    return this.isShown ? this.hide() : this.show();
	  }

	  /**
	   * Show the modal
	   */
	  show() {
	    if (this.isShown || this.isTransitioning) {
	      return;
	    }
	    if (this.el.classList.contains(ClassName$8.FADE)) {
	      this.isTransitioning = true;
	    }
	    this.el.dispatchEvent(this[EventName$d.SHOW]);
	    if (this.isShown || this[EventName$d.SHOW].defaultPrevented) {
	      return;
	    }
	    this.isShown = true;
	    _checkScrollbar.call(this);
	    _setScrollbar.call(this);
	    _adjustDialog.call(this);
	    _setResizeEvent.call(this);

	    // Add event listeners to the dismiss action
	    this.el.addEventListener(EventName$d.CLICK_DISMISS, this.hide);

	    // Find all the dismiss attribute elements and cause the modal to hide
	    this.el.querySelectorAll(Selector$d.DATA_DISMISS).forEach(_element => _element.addEventListener(EventName$d.CLICK, this.hide));
	    _showBackdrop.call(this, () => {
	      _showElement.call(this);
	      _setTabbableElements$1.call(this);
	      _setKeydownEvents.call(this);
	      this.dialogObserver.observe(this.dialog, {
	        attributes: true,
	        childList: true,
	        subtree: true
	      });
	    });
	  }

	  /**
	   * Hide the modal
	   * @param {Event} [event] - the event that triggered the hide
	   */
	  hide(event) {
	    if (event) {
	      event.preventDefault();
	    }
	    if (!this.isShown || this.isTransitioning) {
	      return;
	    }
	    this.el.dispatchEvent(this[EventName$d.HIDE]);
	    if (!this.isShown || this[EventName$d.HIDE].defaultPrevented) {
	      return;
	    }
	    this.isShown = false;
	    const transition = this.el.classList.contains(ClassName$8.FADE);
	    if (transition) {
	      this.isTransitioning = true;
	    }
	    _setKeydownEvents.call(this);
	    _setResizeEvent.call(this);
	    const mainContent = document.querySelector('body > main');
	    if (mainContent && mainContent.getAttribute('aria-hidden') === 'true') {
	      mainContent.removeAttribute('aria-hidden');
	    }
	    document.removeEventListener(EventName$d.FOCUSIN, this.onDocumentFocusin);
	    this.el.classList.remove(ClassName$8.SHOW);
	    this.el.removeEventListener(EventName$d.CLICK_DISMISS, this.onClickDismiss);
	    this.dialogObserver.disconnect();
	    if (transition) {
	      const transitionDuration = Util.getTransitionDurationFromElement(this.el);
	      this.el.addEventListener(Util.TRANSITION_END, _hideModal.bind(this), {
	        once: true
	      });
	      Util.emulateTransitionEnd(this.el, transitionDuration);
	    } else {
	      _hideModal.call(this);
	    }
	  }

	  /**
	   * Handle update that happens with the modal
	   */
	  handleUpdate() {
	    _adjustDialog.call(this);
	  }

	  /**
	   * Remove the event handlers
	   */
	  remove() {
	    // Remove event handlers, observers, etc.
	    Util.removeEvents(this.events);
	    document.removeEventListener(EventName$d.FOCUSIN, this.onDocumentFocusin);

	    // Remove this reference from the array of instances.
	    const index = instances$5.indexOf(this);
	    instances$5.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$d.ON_REMOVE] = new CustomEvent(EventName$d.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$d.ON_REMOVE]);
	  }

	  /**
	   * Update instance. Added for API consistency
	   */
	  update() {
	    // Create and dispatch custom event
	    this[EventName$d.ON_UPDATE] = new CustomEvent(EventName$d.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$d.ON_UPDATE]);
	  }

	  /**
	   * Get the modal instances.
	   * @returns {Object[]} An array of modal instances
	   */
	  static getInstances() {
	    return instances$5;
	  }
	}

	const Selector$c = {
	  DATA_MOUNT: '[data-mount="multi-feature"]',
	  FEATURE: '.multi-feature-feature',
	  ACCORDION: '.accordion'
	};
	const EventName$c = {
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate'
	};
	const ClassName$7 = {
	  DISPLAY: {
	    BLOCK: 'block',
	    NONE: 'd-none'
	  }
	};
	const instances$4 = [];

	// Set accordion height so it is never taller than the shortest feature
	function _setAccordionHeight() {
	  if (this.inCustomViewport()) {
	    // Wait for any images to load before calculating height
	    imagesloadedExports(this.el, () => {
	      let maxAccordionHeight;
	      let firstCollapseHeight;
	      this.collapses.forEach((collapse, index) => {
	        const calcHeight = () => {
	          // Save current styles
	          const showing = collapse.el.classList.contains(ClassName$f.SHOW);

	          // Set visible styles
	          collapse.el.classList.add(ClassName$f.SHOW);
	          collapse.feature.classList.remove(ClassName$7.DISPLAY.NONE);

	          // Calculate heights
	          const featureHeight = collapse.feature.offsetHeight;
	          if (!maxAccordionHeight || featureHeight < maxAccordionHeight) {
	            maxAccordionHeight = featureHeight;
	          }
	          if (index === 0) {
	            firstCollapseHeight = collapse.el.offsetHeight + collapse.triggerElement.offsetHeight;
	          }

	          // Reset styles to original state
	          if (!showing) {
	            collapse.el.classList.remove(ClassName$f.SHOW);
	            collapse.feature.classList.add(ClassName$7.DISPLAY.NONE);
	          }

	          // set a min height equal to the height of the first collapse while open, plus a peek of the second collapse button
	          this.accordionElement.style.minHeight = `${firstCollapseHeight + 32}px`;
	          if (maxAccordionHeight) {
	            this.accordionElement.style.height = `${maxAccordionHeight}px`;
	            this.accordionElement.style.overflowY = 'auto';
	          }
	        };
	        collapse.el.addEventListener(Util.TRANSITION_END, calcHeight, {
	          once: true
	        });
	        const transitionDuration = Util.getTransitionDurationFromElement(collapse.el);
	        Util.emulateTransitionEnd(collapse.el, transitionDuration);
	      });
	    });
	  } else {
	    this.accordionElement.style.minHeight = '';
	    this.accordionElement.style.height = '';
	    this.accordionElement.style.overflowY = '';
	  }
	}

	// Calculate height of absolute positioned content
	function _setMultiFeatureHeight() {
	  const featureHeight = this.open?.feature?.offsetHeight;
	  if (this.inCustomViewport() && featureHeight) {
	    this.el.style.height = `${featureHeight}px`;
	  } else {
	    this.el.style.height = '';
	  }
	}

	/**
	 * @this {MultiFeature}
	 */
	function _onShown(collapse) {
	  this.open = collapse;
	  if (this.inCustomViewport()) {
	    this.open.feature?.classList.remove(ClassName$7.DISPLAY.NONE);
	    _setMultiFeatureHeight.call(this);
	  }
	}

	/**
	 * @this {MultiFeature}
	 */
	function _onHide(e) {
	  const otherOpen = this.collapses.some(collapse => {
	    const notTarget = collapse.el !== e.target;
	    const open = !collapse.isCollapsed && !collapse.isTransitioning && notTarget;
	    const transitioningOpen = collapse.isCollapsed && collapse.isTransitioning && notTarget;
	    return open || transitioningOpen;
	  });
	  if (this.inCustomViewport()) {
	    if (otherOpen) {
	      this.open.feature?.classList.add(ClassName$7.DISPLAY.NONE);
	    } else {
	      e.preventDefault();
	    }
	  } else if (!otherOpen) {
	    this.open = undefined;
	  }
	}

	/**
	 * @this {MultiFeature}
	 */
	function _onResize() {
	  _setAccordionHeight.call(this);
	  _setMultiFeatureHeight.call(this);
	  if (this.inCustomViewport()) {
	    if (!this.open && this.collapses.length) {
	      this.collapses[0].toggle();
	      this.open = this.collapses[0];
	    }
	  } else {
	    this.collapses.forEach(collapse => {
	      collapse.feature.classList.remove(ClassName$7.DISPLAY.NONE);
	    });
	  }
	}
	function _generateEvents$2() {
	  const events = [{
	    el: window,
	    type: 'resize',
	    handler: debounce(300, _onResize.bind(this)),
	    options: {
	      passive: true
	    }
	  }];
	  this.collapses.forEach(collapse => {
	    events.push({
	      el: collapse.el,
	      type: EventName$k.SHOWN,
	      handler: () => {
	        _onShown.call(this, collapse);
	      }
	    }, {
	      el: collapse.el,
	      type: EventName$k.HIDE,
	      handler: e => {
	        _onHide.call(this, e);
	      }
	    });
	  });
	  return events;
	}

	/**
	 * @this {MultiFeature}
	 */
	function _setupCollapse(collapse) {
	  collapse.feature = collapse.el.querySelector(Selector$c.FEATURE);
	  collapse.parent = `#${this.accordionElement.id}`;
	  if (collapse.isCollapsed === false) {
	    this.open = collapse;
	  }
	}

	/**
	 * Class representing a multi feature.
	 */
	class MultiFeature {
	  /**
	   * Create a MultiFeature instance
	   * @param {Object} opts - The multi feature options.
	   * @param {HTMLElement} opts.el - The multi feature DOM node.
	   * @param {HTMLElement} [opts.accordion] - The accordion DOM node.
	   * @param {Collapse[]} [opts.collapses=[]] - The list of Collapse instances.
	   * @param {Array} [opts.customViewports] - The list of viewports with custom accordion logic.
	   */
	  constructor(_ref) {
	    let {
	      el,
	      accordion,
	      collapses = [],
	      customViewports
	    } = _ref;
	    this.el = el;
	    this.accordionElement = accordion || this.el.querySelector(Selector$c.ACCORDION);
	    this.collapses = collapses;
	    this.customViewports = customViewports || ['lg', 'xl'];

	    // Manual initialization with collapses option
	    if (this.collapses.length) {
	      // Set up each Collapse passed in as opts
	      this.collapses.forEach(collapse => {
	        _setupCollapse.call(this, collapse);
	      });
	      // Auto initialization OR manual initialization without collapses
	    } else {
	      // Find all Collapse triggers and instances
	      const collapseTriggers = this.el.querySelectorAll(Selector$m.DATA_MOUNT);
	      const collapseInstances = Collapse.getInstances();
	      // Get matching Collapses, set them up, and put them in the Collapse array
	      collapseTriggers.forEach(el => {
	        const collapseInstance = collapseInstances.find(collapse => collapse.triggerElement === el);
	        _setupCollapse.call(this, collapseInstance);
	        this.collapses.push(collapseInstance);
	      });
	    }
	    _setAccordionHeight.call(this);
	    if (!this.open && this.collapses.length) {
	      this.collapses[0].toggle();
	      this.open = this.collapses[0];
	    }
	    this.events = _generateEvents$2.call(this);
	    Util.addEvents(this.events);
	    instances$4.push(this);
	  }

	  /**
	   * Check if current viewport is in custom viewport list
	   * @returns {Boolean}
	   */
	  inCustomViewport() {
	    const viewport = Util.detectViewport();
	    return this.customViewports.indexOf(viewport) > -1;
	  }

	  /**
	   * Update instance.
	   * @param {Object} opts - The multi feature options
	   * @param {HTMLElement} [opts.accordionElement] - The accordion DOM node.
	   * @param {Array} [opts.collapses] - The list of Collapse instances.
	   * @param {Array} [opts.customViewports] - The list of viewports with custom accordion logic.
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    // Remove event handlers
	    Util.removeEvents(this.events);
	    if (opts.accordionElement) {
	      this.accordionElement = opts.accordionElement;
	    }
	    if (opts.customViewports) {
	      this.customViewports = opts.customViewports;
	    }
	    if (opts.collapses) {
	      this.open = null;
	      this.collapses = opts.collapses;
	      this.collapses.forEach(collapse => {
	        _setupCollapse.call(this, collapse);
	      });
	    }
	    _setAccordionHeight.call(this);
	    if (!this.open && this.collapses.length) {
	      this.collapses[0].toggle();
	      this.open = this.collapses[0];
	    }

	    // Add event handlers
	    this.events = _generateEvents$2.call(this);
	    Util.addEvents(this.events);

	    // Trigger event
	    this[EventName$c.ON_UPDATE] = new CustomEvent(EventName$c.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$c.ON_UPDATE]);
	  }

	  /**
	   * Remove the multi feature.
	   */
	  remove() {
	    // Remove event handlers
	    Util.removeEvents(this.events);

	    // remove this multi feature reference from array of instances
	    const index = instances$4.indexOf(this);
	    instances$4.splice(index, 1);

	    // Trigger event
	    this[EventName$c.ON_REMOVE] = new CustomEvent(EventName$c.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$c.ON_REMOVE]);
	  }

	  /**
	   * Get an array of multi feature instances.
	   * @returns {Object[]} Array of multi feature instances.
	   */
	  static getInstances() {
	    return instances$4;
	  }
	}

	const Selector$b = {
	  DATA_MOUNT: '[data-mount="nav-in-page"]',
	  NAV: '.nav-in-page',
	  NAV_CONTAINER: '.nav-in-page-container',
	  ITEMS: '.nav-in-page-item',
	  LABEL: '.nav-in-page-label'
	};
	const EventName$b = {
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate'
	};
	const ClassName$6 = {
	  VERTICAL: 'nav-in-page-vertical',
	  HORIZONTAL: 'nav-in-page-horizontal',
	  ITEM: 'nav-in-page-item',
	  COMBOBOX: {
	    EL: 'combobox',
	    MENU: 'combobox-menu',
	    ITEM: 'combobox-item',
	    TOGGLE: 'combobox-toggle',
	    DIVIDER: 'combobox-divider'
	  },
	  DISPLAY_NONE: 'd-none',
	  ACTIVE: 'active'
	};
	const Alignment = {
	  VERTICAL: 'vertical',
	  HORIZONTAL: 'horizontal'
	};
	const instances$3 = [];

	/**
	 * Class representing a in-page nav.
	 */
	var _elChildren = /*#__PURE__*/_classPrivateFieldLooseKey("elChildren");
	var _setup$1 = /*#__PURE__*/_classPrivateFieldLooseKey("setup");
	var _scrollSpyObserverCallback = /*#__PURE__*/_classPrivateFieldLooseKey("scrollSpyObserverCallback");
	var _onSticky = /*#__PURE__*/_classPrivateFieldLooseKey("onSticky");
	var _onStatic = /*#__PURE__*/_classPrivateFieldLooseKey("onStatic");
	var _setAlignmentProperties = /*#__PURE__*/_classPrivateFieldLooseKey("setAlignmentProperties");
	var _onViewChange = /*#__PURE__*/_classPrivateFieldLooseKey("onViewChange");
	var _generateEvents$1 = /*#__PURE__*/_classPrivateFieldLooseKey("generateEvents");
	var _shouldBeCombobox = /*#__PURE__*/_classPrivateFieldLooseKey("shouldBeCombobox");
	var _createElements = /*#__PURE__*/_classPrivateFieldLooseKey("createElements");
	var _onComboboxChange = /*#__PURE__*/_classPrivateFieldLooseKey("onComboboxChange");
	var _createCombobox = /*#__PURE__*/_classPrivateFieldLooseKey("createCombobox");
	var _removeCombobox = /*#__PURE__*/_classPrivateFieldLooseKey("removeCombobox");
	var _setView = /*#__PURE__*/_classPrivateFieldLooseKey("setView");
	class NavInPage {
	  /**
	   * Create a NavInPage instance
	   * @param {Object} opts - The in-page nav options.
	   * @param {HTMLElement} opts.el - The in-page nav bar DOM node.
	   * @param {HTMLElement} [opts.navContainer] - The in-page nav container DOM node.
	   * @param {HTMLElement} [opts.navEl] - The in-page nav DOM node.
	   * @param {HTMLElement[]} [opts.navItems] - The in-page nav item DOM nodes.
	   * @param {HTMLElement} [opts.navLabel] - The in-page nav label DOM node.
	   * @param {String} [opts.desktopVp] - The viewport (t-shirt sized) that the in-page nav styles change.
	   * @param {String} [opts.alignment] - The alignment of in-page nav, either 'horizontal' or 'vertical', defaults to 'horizontal'.
	   * @param {String} [opts.stickyEl] - The parent Sticky element DOM node.
	   */
	  constructor(opts) {
	    Object.defineProperty(this, _setView, {
	      value: _setView2
	    });
	    Object.defineProperty(this, _removeCombobox, {
	      value: _removeCombobox2
	    });
	    Object.defineProperty(this, _createCombobox, {
	      value: _createCombobox2
	    });
	    Object.defineProperty(this, _onComboboxChange, {
	      value: _onComboboxChange2
	    });
	    Object.defineProperty(this, _createElements, {
	      value: _createElements2
	    });
	    Object.defineProperty(this, _shouldBeCombobox, {
	      value: _shouldBeCombobox2
	    });
	    Object.defineProperty(this, _generateEvents$1, {
	      value: _generateEvents2
	    });
	    Object.defineProperty(this, _onViewChange, {
	      value: _onViewChange2
	    });
	    Object.defineProperty(this, _setAlignmentProperties, {
	      value: _setAlignmentProperties2
	    });
	    Object.defineProperty(this, _onStatic, {
	      value: _onStatic2
	    });
	    Object.defineProperty(this, _onSticky, {
	      value: _onSticky2
	    });
	    Object.defineProperty(this, _scrollSpyObserverCallback, {
	      value: _scrollSpyObserverCallback2
	    });
	    Object.defineProperty(this, _setup$1, {
	      value: _setup2$1
	    });
	    Object.defineProperty(this, _elChildren, {
	      writable: true,
	      value: void 0
	    });
	    this.el = opts.el;
	    this.navContainer = opts.navContainer || this.el.querySelector(Selector$b.NAV_CONTAINER);
	    this.navEl = opts.navEl || this.el.querySelector(Selector$b.NAV);
	    this.navItems = opts.navItems || this.el.querySelectorAll(Selector$b.ITEMS);
	    this.navLabel = opts.navLabel || this.el.querySelector(Selector$b.LABEL);
	    this.desktopVp = opts.desktopVp || this.el.dataset.desktopVp || 'lg';
	    this.alignment = opts.alignment || this.el.dataset.alignment || Alignment.HORIZONTAL;
	    this.stickyEl = opts.stickyEl || document.querySelector(this.el.dataset.stickyEl);
	    this.isSticky = false;
	    this.el.style.display = 'inline-flex'; // "functional" styles required for width calculations
	    this.comboboxEvents = [];
	    this.scrollSpyObserver = new MutationObserver(mutationList => _classPrivateFieldLooseBase(this, _scrollSpyObserverCallback)[_scrollSpyObserverCallback](mutationList));
	    _classPrivateFieldLooseBase(this, _setup$1)[_setup$1]();
	    instances$3.push(this);
	  }

	  /**
	   * Setup In-page nav.
	   */

	  /**
	   * Update instance.
	   * @param {Object} [opts] - The in-page nav options.
	   * @param {HTMLElement} [opts.navContainer] - The in-page nav container DOM node.
	   * @param {HTMLElement} [opts.navEl] - The in-page nav DOM node.
	   * @param {HTMLElement[]} [opts.navItems] - The in-page nav item DOM nodes.
	   * @param {HTMLElement} [opts.navLabel] - The in-page nav label DOM node.
	   * @param {String} [opts.desktopVp] - The viewport (t-shirt sized) that the in-page nav styles change.
	   * @param {String} [opts.alignment] - The alignment of in-page nav, either 'horizontal' or 'vertical', defaults to 'horizontal'.
	   * @param {HTMLElement} [opts.stickyEl] - The parent Sticky element DOM node.
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    // Resets
	    Util.removeEvents(this.events);
	    _classPrivateFieldLooseBase(this, _removeCombobox)[_removeCombobox]();
	    this.scrollSpyObserver.disconnect();
	    if (opts.navContainer) {
	      this.navContainer = opts.navContainer;
	    }
	    if (opts.navEl) {
	      this.navEl = opts.navEl;
	    }
	    if (opts.navItems) {
	      this.navItems = opts.navItems;
	    }
	    if (opts.navLabel) {
	      this.navLabel = opts.navLabel;
	    }
	    if (opts.desktopVp) {
	      this.desktopVp = opts.desktopVp;
	    }
	    if (opts.alignment) {
	      this.alignment = opts.alignment;
	    }
	    if (opts.stickyEl) {
	      this.stickyEl = opts.stickyEl;
	    }

	    // Setup
	    _classPrivateFieldLooseBase(this, _setup$1)[_setup$1]();

	    // Trigger event
	    this[EventName$b.ON_UPDATE] = new CustomEvent(EventName$b.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$b.ON_UPDATE]);
	  }

	  /**
	   * Remove the in-page nav.
	   */
	  remove() {
	    // Resets
	    Util.removeEvents(this.events);
	    _classPrivateFieldLooseBase(this, _removeCombobox)[_removeCombobox]();
	    this.el.style.display = null;
	    this.el.style.whiteSpace = null;
	    this.scrollSpyObserver.disconnect();

	    // remove this in-page nav reference from array of instances
	    const index = instances$3.indexOf(this);
	    instances$3.splice(index, 1);

	    // Trigger event
	    this[EventName$b.ON_REMOVE] = new CustomEvent(EventName$b.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$b.ON_REMOVE]);
	  }

	  /**
	   * Get an array of in-page nav instances.
	   * @returns {Object[]} Array of in-page nav instances.
	   */
	  static getInstances() {
	    return instances$3;
	  }
	}
	function _setup2$1() {
	  _classPrivateFieldLooseBase(this, _setAlignmentProperties)[_setAlignmentProperties]();
	  _classPrivateFieldLooseBase(this, _createElements)[_createElements]();
	  _classPrivateFieldLooseBase(this, _elChildren)[_elChildren] = Array.from(this.el.children);
	  this.width = this.el.scrollWidth;
	  _classPrivateFieldLooseBase(this, _setView)[_setView]();
	  this.events = _classPrivateFieldLooseBase(this, _generateEvents$1)[_generateEvents$1]();
	  Util.addEvents(this.events);
	  this.scrollSpyObserver.observe(this.navEl, {
	    subtree: true,
	    attributeFilter: ['class']
	  });
	}
	function _scrollSpyObserverCallback2(mutationList) {
	  mutationList.forEach(mutation => {
	    const isActive = mutation.target.classList.contains(ClassName$6.ACTIVE);
	    if (isActive && this.combobox) {
	      const activeIndex = Array.from(this.combobox.optionEls).indexOf(mutation.target.parentNode);
	      this.combobox.selectOption(activeIndex, 'scrollspy');
	    }
	  });
	}
	function _onSticky2() {
	  this.isSticky = true;
	  if (!this.combobox) {
	    _classPrivateFieldLooseBase(this, _onViewChange)[_onViewChange]();
	  }
	}
	function _onStatic2() {
	  this.isSticky = false;
	  if (!this.combobox) {
	    _classPrivateFieldLooseBase(this, _onViewChange)[_onViewChange]();
	  }
	}
	function _setAlignmentProperties2() {
	  switch (this.alignment) {
	    case Alignment.HORIZONTAL:
	      {
	        this.el.classList.add(ClassName$6.HORIZONTAL);
	        this.el.style.whiteSpace = 'nowrap'; // "functional" styles required for width calculations
	        break;
	      }
	    case Alignment.VERTICAL:
	      {
	        this.el.classList.add(ClassName$6.VERTICAL);
	        break;
	      }
	  }
	}
	function _onViewChange2() {
	  if (!this.combobox) {
	    let width = 0;
	    _classPrivateFieldLooseBase(this, _elChildren)[_elChildren].forEach(child => {
	      width += child.scrollWidth;
	    });
	    this.width = width;
	  }
	  _classPrivateFieldLooseBase(this, _setView)[_setView]();
	}
	function _generateEvents2() {
	  const events = [{
	    el: window,
	    type: 'resize',
	    handler: throttle(100, _classPrivateFieldLooseBase(this, _onViewChange)[_onViewChange].bind(this)),
	    options: {
	      passive: true
	    }
	  }];
	  if (this.stickyEl) {
	    events.push({
	      el: this.stickyEl,
	      type: 'onSticky',
	      handler: _classPrivateFieldLooseBase(this, _onSticky)[_onSticky].bind(this)
	    }, {
	      el: this.stickyEl,
	      type: 'onStatic',
	      handler: _classPrivateFieldLooseBase(this, _onStatic)[_onStatic].bind(this)
	    });
	  }
	  return events;
	}
	function _shouldBeCombobox2() {
	  const {
	    paddingRight,
	    paddingLeft
	  } = getComputedStyle(this.el);
	  const elIsWiderThanWindow = this.width + parseInt(paddingRight, 10) + parseInt(paddingLeft, 10) > document.body.clientWidth; // width without the scrollbar
	  const verticalElIsWiderThanDesktopVp = ViewPort[this.desktopVp.toUpperCase()] > window.innerWidth; // width to match media queries

	  return this.alignment === Alignment.VERTICAL ? verticalElIsWiderThanDesktopVp : elIsWiderThanWindow;
	}
	function _createElements2() {
	  const comboboxLabelId = `in-page-nav-${Util.getUid()}`;
	  if (this.stickyEl) {
	    this.labelOption = document.createElement('li');
	    this.labelOption.setAttribute('id', comboboxLabelId);
	    this.labelOption.classList.add(ClassName$6.COMBOBOX.ITEM);
	    this.labelOption.textContent = this.navLabel?.textContent;
	    this.comboboxDivider = document.createElement('li');
	    this.comboboxDivider.classList.add(ClassName$6.COMBOBOX.DIVIDER);
	  }
	  this.comboboxLabel = document.createElement('label');
	  this.comboboxLabel.setAttribute('id', comboboxLabelId);
	  this.comboboxLabel.textContent = this.navLabel?.textContent;
	  this.comboboxToggle = document.createElement('div');
	  this.comboboxToggle.setAttribute('aria-controls', this.navEl.id);
	  this.comboboxToggle.setAttribute('aria-expanded', 'false');
	  this.comboboxToggle.setAttribute('aria-haspopup', 'listbox');
	  this.comboboxToggle.setAttribute('aria-labelledby', comboboxLabelId);
	  this.comboboxToggle.setAttribute('role', 'combobox');
	  this.comboboxToggle.setAttribute('tabindex', '0');
	  this.comboboxToggle.classList.add(ClassName$6.COMBOBOX.TOGGLE, 'btn', 'btn-faint-secondary');
	  this.comboboxSpanText = document.createElement('span');
	  this.comboboxSpanText.setAttribute('data-combobox-text', '');
	  this.comboboxSpanGlyph = document.createElement('span');
	  this.comboboxSpanGlyph.classList.add('glyph');
	  this.comboboxSpanGlyph.setAttribute('aria-hidden', 'true');

	  // Holds all glyph elements for each combobox list item
	  this.comboboxItemGlyphArray = [];
	  this.navItems.forEach((item, index) => {
	    const comboboxItemGlyph = document.createElement('span');
	    comboboxItemGlyph.classList.add('glyph');
	    comboboxItemGlyph.setAttribute('aria-hidden', 'true');
	    this.comboboxItemGlyphArray[index] = comboboxItemGlyph;
	  });
	}
	function _onComboboxChange2(e) {
	  const {
	    detail
	  } = e;
	  if (detail.event === 'click' || detail.event === 'keydown') {
	    this.combobox.optionEls[this.combobox.activeIndex].querySelector('a').click();
	  }
	}
	function _createCombobox2() {
	  if (!this.combobox) {
	    this.el.style.display = null;
	    this.el.style.whiteSpace = null;
	    this.navEl.setAttribute('role', 'listbox');
	    this.navEl.classList.add(ClassName$6.COMBOBOX.MENU);
	    this.navEl.setAttribute('aria-labelledby', this.comboboxLabel.id);
	    this.navLabel.classList.add(ClassName$6.DISPLAY_NONE);
	    if (this.stickyEl) {
	      this.navEl.insertBefore(this.labelOption, this.navItems[0]);
	      this.navEl.insertBefore(this.comboboxDivider, this.navItems[0]);
	    }
	    this.navContainer.insertBefore(this.comboboxLabel, this.navEl);
	    this.navContainer.insertBefore(this.comboboxToggle, this.navEl);
	    this.comboboxEvents.push({
	      el: this.navContainer,
	      type: 'onChange',
	      handler: e => _classPrivateFieldLooseBase(this, _onComboboxChange)[_onComboboxChange](e)
	    });
	    this.navItems.forEach((item, index) => {
	      item.append(this.comboboxItemGlyphArray[index]);
	      item.setAttribute('role', 'option');
	      item.classList.add(ClassName$6.COMBOBOX.ITEM);
	    });
	    this.comboboxToggle.append(this.comboboxSpanText);
	    this.comboboxToggle.append(this.comboboxSpanGlyph);
	    this.el.classList.remove(ClassName$6.VERTICAL, ClassName$6.HORIZONTAL);
	    this.navContainer.classList.add(ClassName$6.COMBOBOX.EL);
	    this.combobox = new ComboboxSelect({
	      el: this.navContainer,
	      manageFocusOnClick: false
	    });
	    Util.addEvents(this.comboboxEvents);
	  }
	}
	function _removeCombobox2() {
	  if (this.combobox) {
	    this.combobox.remove();
	    this.combobox = null;
	    this.el.style.display = 'inline-flex'; // "functional" styles required for width calculations

	    this.navEl.removeAttribute('role');
	    this.navEl.classList.remove(ClassName$6.COMBOBOX.MENU);
	    this.navEl.removeAttribute('aria-labelledby');
	    this.navLabel.classList.remove(ClassName$6.DISPLAY_NONE);
	    this.comboboxLabel.remove();
	    this.comboboxToggle.remove();
	    this.labelOption?.remove();
	    this.comboboxDivider?.remove();
	    this.navItems.forEach((item, index) => {
	      item.removeAttribute('role');
	      item.removeAttribute('aria-selected');
	      item.classList.remove(ClassName$6.COMBOBOX.ITEM);
	      this.comboboxItemGlyphArray[index].remove();
	    });
	    this.navContainer.classList.remove(ClassName$6.COMBOBOX.EL);
	    _classPrivateFieldLooseBase(this, _setAlignmentProperties)[_setAlignmentProperties]();
	    Util.removeEvents(this.comboboxEvents);
	    this.comboboxEvents = [];
	  }
	}
	function _setView2() {
	  if (_classPrivateFieldLooseBase(this, _shouldBeCombobox)[_shouldBeCombobox]()) {
	    _classPrivateFieldLooseBase(this, _createCombobox)[_createCombobox]();
	  } else {
	    _classPrivateFieldLooseBase(this, _removeCombobox)[_removeCombobox]();
	  }
	}

	const Selector$a = {
	  DATA_MOUNT: '[data-mount="popover"]'
	};
	const EventName$a = {
	  ON_HIDE: 'onHide',
	  ON_SHOW: 'onShow',
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove'
	};
	const ClassName$5 = {
	  ...ClassName$c,
	  POPOVER: 'popover',
	  CLOSE: 'close',
	  ARROW: 'arrow'
	};
	const Default$2 = {
	  ...Default$4,
	  CLOSE_LABEL: 'Close dialog',
	  ALIGNMENT: 'center'
	};
	const popovers = [];

	/**
	 * The event handler for when the target element is clicked
	 * @param {MouseEvent} event - The event object
	 */
	function _elOnClick$1(event) {
	  // Prevent page from trying to scroll to a page anchor
	  event.preventDefault();
	  this.toggle();
	}

	/**
	 * The event handler for when a key is pressed on the target element
	 * @param {KeyboardEvent} event - The event object
	 */
	function _elOnKeydown(event) {
	  if (event.keyCode === Util.keyCodes.SPACE || event.keyCode === Util.keyCodes.ENTER) {
	    // Trigger the same event as a click for consistency.
	    // Note: Since focus should be trapped within the menu while open, these events should only ever apply when the menu is closed.
	    // If somehow a keyboard event is triggered on the target element, go a head and close the menu as if it was clicked.
	    event.preventDefault();
	    _elOnClick$1.call(this, event);
	  }
	}

	/**
	 * The event handler for when a key is pressed on the menu
	 * @param {KeyboardEvent} event - The event object
	 */
	function _menuOnKeydown(event) {
	  if (event.keyCode === Util.keyCodes.ESC) {
	    event.stopPropagation();
	    this.hide();
	  }

	  // Add focus trap to prevent keyboard tabbing outside the Popover
	  if (event.keyCode === Util.keyCodes.TAB) {
	    const lastTabbableElement = this.tabbableElements[this.tabbableElements.length - 1];
	    if (document.activeElement === lastTabbableElement && !this.removeFocusTrap) {
	      this.closeBtn.focus();
	      event.preventDefault();
	    }
	  }
	}

	/**
	 * The event handler for when the close button is clicked.
	 * Note: browser also triggers this when space or enter is pressed on a button.
	 * @param {MouseEvent} event - The event object
	 */
	function _closeOnClick(event) {
	  // Prevent page from trying to scroll to a page anchor
	  event.preventDefault();
	  this.hide();
	}

	/**
	 * Check if element is not a modal or child of a modal to enable focusing between keyboard traps.
	 * Assumes elements with aria-modal="true" will be keyboard traps.
	 */
	function _elIsNotNewModal(el) {
	  const elIsModal = el.getAttribute('aria-modal') === 'true';
	  const elParentModal = el.closest('[aria-modal="true"]');
	  return !elIsModal && !elParentModal || elParentModal.contains(this.menu);
	}

	/**
	 * The event handler for when mousedown is triggered on the document.
	 * Happens before mouseup, click, and focusin to control closing of the menu without conflicting with other events.
	 * @param {Event} event - The event object
	 */
	function _documentOnMousedown(event) {
	  const targetIsNotNewModal = _elIsNotNewModal.call(this, event.target);
	  if (this.shown && !this.menu.contains(event.target) && !this.el.contains(event.target) && targetIsNotNewModal) {
	    this.hide({
	      setFocus: false
	    });
	  }
	  if (this.shown && !this.menu.contains(event.target) && this.removeFocusTrap) {
	    event.preventDefault();
	  }
	}

	/**
	 * The event handler for when the document receives focus
	 * @param {FocusEvent} event - The event object
	 */
	function _documentOnFocusin(event) {
	  const targetIsNotNewModal = _elIsNotNewModal.call(this, event.target);
	  if (this.shown && !this.menu.contains(event.target) && targetIsNotNewModal) {
	    // Create a keyboard trap within the menu until the popover is closed by the user.
	    if (event.relatedTarget === this.closeBtn) {
	      if (this.removeFocusTrap) {
	        // Allows tabbing out of the menu to the proceeding tabbable element with "shift+tab"
	        this.hide({
	          setFocus: false
	        });
	      } else {
	        // Applies focus on last tabbable element within the Popover
	        this.tabbableElements[this.tabbableElements.length - 1].focus();
	      }
	    } else if (this.removeFocusTrap) {
	      // Allows tabbing out of the menu onto the next tabbable element
	      this.hide({
	        setFocus: false
	      });
	    } else {
	      // Applies focus on close button
	      this.closeBtn.focus();
	    }
	  }
	}

	/**
	 * Gets the related menu or creates one if none is associated
	 * @param {HTMLElement} node - The element associated with the menu, typically the popover trigger
	 * @returns {HTMLElement?} The menu element
	 */
	function _getOrCreateMenu(node) {
	  if (node.attributes['aria-controls']) {
	    return document.querySelector(`#${node.attributes['aria-controls'].value}`);
	  }
	  if (node.attributes['data-content']) {
	    const menu = document.createElement('div');
	    const menuId = `${ClassName$5.POPOVER}_${Util.getUid()}`;
	    const menuContent = document.createElement('div');
	    const menuContentBody = document.createElement('div');
	    menu.setAttribute('id', menuId);
	    menu.classList.add(ClassName$5.POPOVER);
	    menu.setAttribute('role', 'dialog');
	    menu.setAttribute('aria-labelledby', node.id);
	    menuContent.classList.add('popover-content');
	    menu.append(menuContent);
	    menuContentBody.classList.add('popover-body');
	    menuContentBody.textContent = node.getAttribute('data-content');
	    menuContent.append(menuContentBody);
	    menu.prepend(_createCloseBtn({
	      label: node.getAttribute('data-close-label')
	    }));
	    node.setAttribute('aria-expanded', 'false');
	    node.setAttribute('aria-controls', menuId);
	    node.after(menu);
	    return menu;
	  }
	}

	/**
	 * Create a close button element
	 * @param {Object} [opts={}] - Options for the button element
	 * @param {string?} [opts.label=Default.CLOSE_LABEL] - The aria-label value for the button
	 * @returns {HTMLElement} The a close button element
	 */
	function _createCloseBtn(opts) {
	  if (opts === void 0) {
	    opts = {};
	  }
	  const btn = document.createElement('button');
	  btn.classList.add(ClassName$5.CLOSE);
	  btn.setAttribute('aria-label', opts.label || Default$2.CLOSE_LABEL);
	  return btn;
	}

	/**
	 * Creates a decorative arrow element for the menu
	 * @param {HTMLElement} node - The element to add the arrow to, typically the menu
	 * @returns {HTMLElement} The arrow element
	 */
	function _createPopoverArrow(node) {
	  const arrow = document.createElement('div');
	  arrow.classList.add(ClassName$5.ARROW);
	  node.append(arrow);
	  return arrow;
	}

	/**
	 * Get a list of tabbable elements within the menu
	 * @this Popover
	 */
	function _setTabbableElements() {
	  this.tabbableElements = Util.getTabbableElements(this.menu).filter(el => el.offsetHeight > 0);
	}
	class Popover extends Flyout {
	  /**
	   * Create a Popover instance (inheriting Flyout)
	   * @param {Object} opts - The flyout options
	   * @param {HTMLElement} opts.el - The element that toggles the flyout
	   * @param {HTMLElement} [opts.menu] - The element that defines the flyout menu
	   * @param {string} [opts.placement=right] - A string that defines the placement of the menu
	   * @param {string} [opts.alignment=center] - A string that defines the alignment of the menu
	   * @param {number} [opts.offset=16] - The number of pixels the menu should be offset from the trigger
	   * @param {boolean} [opts.enableReflow=true] - Whether the menu should reflow to fit within the window as best as possible
	   * @param {boolean} [opts.enableFade=true] - Whether the menu should fade in and out
	   */
	  constructor(opts) {
	    // Set super options
	    const flyoutOpts = {
	      ...opts
	    };
	    flyoutOpts.menu = opts.menu || _getOrCreateMenu(flyoutOpts.el);
	    flyoutOpts.alignment = _getAlignment(opts.alignment || flyoutOpts.el.getAttribute('data-alignment'), Default$2.ALIGNMENT);
	    flyoutOpts.offset = opts.offset ? parseInt(opts.offset, 10) : 16;
	    flyoutOpts.enableFade = typeof opts.enableFade === 'boolean' ? opts.enableFade : true;
	    super(flyoutOpts);

	    // Popover-specific setup
	    this.arrow = _createPopoverArrow(this.menu);

	    // Get the "close" button within the menu
	    this.closeBtn = this.menu.querySelector('button.close');
	    if (!this.closeBtn) {
	      this.closeBtn = _createCloseBtn({
	        label: this.el.getAttribute('data-close-label')
	      });
	      this.menu.prepend(this.closeBtn);
	    }
	    this.menuObserver = new MutationObserver(_setTabbableElements.bind(this));
	    this.removeFocusTrap = this.el.hasAttribute('data-remove-trap');
	    if (this.removeFocusTrap) {
	      this.menu.removeAttribute('role');
	      this.menu.removeAttribute('aria-labelledby');
	    }

	    // Add event handlers
	    this.events = [{
	      el: this.el,
	      type: 'click',
	      handler: _elOnClick$1.bind(this)
	    }, {
	      el: this.el,
	      type: 'keydown',
	      handler: _elOnKeydown.bind(this)
	    }, {
	      el: this.menu,
	      type: 'keydown',
	      handler: _menuOnKeydown.bind(this)
	    }, {
	      el: this.closeBtn,
	      type: 'click',
	      handler: _closeOnClick.bind(this)
	    }, {
	      el: document,
	      type: 'mousedown',
	      handler: _documentOnMousedown.bind(this)
	    }, {
	      el: document,
	      type: 'focusin',
	      handler: _documentOnFocusin.bind(this)
	    }];
	    Util.addEvents(this.events);
	    popovers.push(this);
	  }

	  /**
	   * Position the flyout menu
	   */
	  positionMenu() {
	    super.positionMenu();
	    this.positionMenuArrow();
	  }

	  /**
	   * Position the menu's arrow
	   */
	  positionMenuArrow() {
	    const position = this.currentPosition;

	    // Reset positioning
	    this.arrow.style.top = null;
	    this.arrow.style.bottom = null;
	    this.arrow.style.left = null;
	    this.arrow.style.right = null;

	    // Top and bottom menus
	    if (position.placement === 'top' || position.placement === 'bottom') {
	      if (position.alignment === 'start') {
	        this.arrow.style[Default$2.START] = Math.round(this.boundingRect.el.width / 2) - this.arrow.offsetWidth / 2 + Math.abs(this.overflowOffset) + 'px';
	      } else if (position.alignment === 'end') {
	        this.arrow.style[Default$2.END] = Math.round(this.boundingRect.el.width / 2) - this.arrow.offsetWidth / 2 + Math.abs(this.overflowOffset) + 'px';
	      } else {
	        this.arrow.style.left = Math.round(this.boundingRect.menu.width / 2) - this.arrow.offsetWidth / 2 + Math.abs(this.overflowOffset) + 'px';
	      }
	      // Left and right menus
	    } else if (position.alignment === 'start') {
	      this.arrow.style.top = Math.round(this.boundingRect.el.height / 2) - this.arrow.offsetWidth / 2 + 'px';
	    } else if (position.alignment === 'end') {
	      this.arrow.style.bottom = Math.round(this.boundingRect.el.height / 2) - this.arrow.offsetWidth / 2 + 'px';
	    } else {
	      this.arrow.style.top = Math.round(this.boundingRect.menu.height / 2) - this.arrow.offsetWidth / 2 + 'px';
	    }
	  }

	  /**
	   * Show the menu
	   */
	  show() {
	    // Create and dispatch custom event
	    this[EventName$a.ON_SHOW] = new CustomEvent(EventName$a.ON_SHOW, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.el.dispatchEvent(this[EventName$a.ON_SHOW]);
	    if (this[EventName$a.ON_SHOW].defaultPrevented) {
	      return;
	    }
	    super.show();
	    this.el.setAttribute('aria-expanded', this.shown);
	    _setTabbableElements.call(this);
	    this.menuObserver.observe(this.menu, {
	      attributes: true,
	      childList: true,
	      subtree: true
	    });
	    this.closeBtn.focus();
	  }

	  /**
	   * Hide the menu
	   * @param {Object} [opts={}] - Options for hiding the menu
	   * @param {boolean} [opts.setFocus=true] - Whether or not the focus should be set on the toggling element; defaults to true
	   */
	  hide(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    // Create and dispatch custom event
	    this[EventName$a.ON_HIDE] = new CustomEvent(EventName$a.ON_HIDE, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.el.dispatchEvent(this[EventName$a.ON_HIDE]);
	    if (this[EventName$a.ON_HIDE].defaultPrevented) {
	      return;
	    }
	    super.hide(opts);
	    this.el.setAttribute('aria-expanded', this.shown);
	    this.menuObserver.disconnect();
	  }

	  /**
	   * Update the popover instance
	   * @param {Object} [opts={}] - Options for updating the instance
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    const flyoutOpts = {
	      ...opts
	    };

	    // Refresh the list of tabbable elements within the menu
	    this.tabbableElements = Util.getTabbableElements(this.menu);

	    // Enforce popover's default alignment as fallback
	    if (opts.alignment) {
	      flyoutOpts.alignment = _getAlignment(opts.alignment, Default$2.ALIGNMENT);
	    }
	    super.update(flyoutOpts);

	    // Create and dispatch custom event
	    this[EventName$a.ON_UPDATE] = new CustomEvent(EventName$a.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$a.ON_UPDATE]);
	  }

	  /**
	   * Remove the popover instance
	   */
	  remove() {
	    // Remove event handlers, observers, etc.
	    Util.removeEvents(this.events);

	    // Remove this reference from the array of instances
	    const index = popovers.indexOf(this);
	    popovers.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$a.ON_REMOVE] = new CustomEvent(EventName$a.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$a.ON_REMOVE]);
	  }

	  /**
	   * Get an array of popover instances
	   * @returns {Object[]} Array of popover instances
	   */
	  static getInstances() {
	    return popovers;
	  }
	}

	const Selector$9 = {
	  DATA_MOUNT: '[data-position="positioner"]'
	};
	const EventName$9 = {
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove'
	};
	const BreakpointRank = {
	  default: 0,
	  xs: 0,
	  sm: 1,
	  md: 2,
	  lg: 3,
	  xl: 4
	};
	const RankedBreakpoints = ['default', 'sm', 'md', 'lg', 'xl'];
	const breakpointWatchers = {};
	const positionerInstances = [];
	function _readBreakpointFromDataAttr(breakpointName) {
	  if (this.el.getAttribute('data-position-top-' + breakpointName) && this.el.getAttribute('data-position-left-' + breakpointName)) {
	    this.positionMap[breakpointName] = {};
	    this.positionMap[breakpointName].top = parseFloat(this.el.getAttribute('data-position-top-' + breakpointName));
	    this.positionMap[breakpointName].left = parseFloat(this.el.getAttribute('data-position-left-' + breakpointName));
	  }
	}
	function _onBreakpointChange() {
	  const detectedViewportName = Util.detectViewport();
	  let i;
	  let viewportName;
	  for (i = BreakpointRank[detectedViewportName]; i >= 0; i--) {
	    viewportName = RankedBreakpoints[i]; // prevent out of bounds if doing on tail end, translate 'xs' to 'default'

	    if (this.positionMap[viewportName] && Number.isFinite(this.positionMap[viewportName].top) && Number.isFinite(this.positionMap[viewportName].left)) {
	      this.el.style.top = this.positionMap[viewportName].top + '%';
	      this.el.style.left = this.positionMap[viewportName].left + '%';
	      return; // done setting position
	    }
	  }

	  // No default/xs case, remove inline styles
	  Positioner.clearInlinePosition(this.el);
	}

	/**
	 * The Positioner positions an absolutely or relatively positioned element by percentages
	 */
	class Positioner {
	  /**
	   * Create a Positioner instance
	   * @param {Object} opts - The Positioner options
	   * @param {HTMLElement} opts.el - The element that is positioned
	   * @param {Object} [opts.positionMap] - A map of positions and breakpoints, see README for details
	   */
	  constructor(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    this.el = opts.el;
	    this.positionMap = {};

	    // see if there are any positions to read from data- attributes
	    let i;
	    for (i = 0; i < RankedBreakpoints.length; i++) {
	      _readBreakpointFromDataAttr.call(this, RankedBreakpoints[i]);
	    }

	    // object passed by JS takes precedence
	    if (opts.positionMap) {
	      Object.assign(this.positionMap, opts.positionMap); // position info passed in here takes precedence
	    }

	    // If this is the first Positioner instance on the page, set up the breakpoint watchers
	    if (!breakpointWatchers.sm) {
	      breakpointWatchers.sm = window.matchMedia('screen and (min-width: ' + ViewPort.SM + 'px)');
	      breakpointWatchers.md = window.matchMedia('screen and (min-width: ' + ViewPort.MD + 'px)');
	      breakpointWatchers.lg = window.matchMedia('screen and (min-width: ' + ViewPort.LG + 'px)');
	      breakpointWatchers.xl = window.matchMedia('screen and (min-width: ' + ViewPort.XL + 'px)');
	    }

	    // Add event handlers
	    this.events = [{
	      el: breakpointWatchers.sm,
	      type: 'change',
	      handler: _onBreakpointChange.bind(this)
	    }, {
	      el: breakpointWatchers.md,
	      type: 'change',
	      handler: _onBreakpointChange.bind(this)
	    }, {
	      el: breakpointWatchers.lg,
	      type: 'change',
	      handler: _onBreakpointChange.bind(this)
	    }, {
	      el: breakpointWatchers.xl,
	      type: 'change',
	      handler: _onBreakpointChange.bind(this)
	    }];
	    Util.addEvents(this.events);

	    // push to instances list
	    positionerInstances.push(this);

	    // check poisition initially
	    _onBreakpointChange.call(this);
	  }
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    if (opts.positionMap) {
	      Object.assign(this.positionMap, opts.positionMap);
	    }
	    _onBreakpointChange.call(this);

	    // Create and dispatch custom event
	    this[EventName$9.ON_UPDATE] = new CustomEvent(EventName$9.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$9.ON_UPDATE]);
	  }
	  remove() {
	    Util.removeEvents(this.events);
	    const index = positionerInstances.indexOf(this);
	    positionerInstances.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$9.ON_REMOVE] = new CustomEvent(EventName$9.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$9.ON_REMOVE]);
	  }
	  static getInstances() {
	    return positionerInstances;
	  }
	  static setPosition(node, xPos, yPos, unit) {
	    if (xPos === void 0) {
	      xPos = 0;
	    }
	    if (yPos === void 0) {
	      yPos = 0;
	    }
	    if (unit === void 0) {
	      unit = '';
	    }
	    if (node && node.style) {
	      node.style.left = xPos + unit;
	      node.style.top = yPos + unit;
	      return node;
	    }
	  }
	  static clearInlinePosition(node) {
	    if (node && node.style) {
	      node.style.left = null;
	      node.style.top = null;
	      node.style.bottom = null;
	      node.style.top = null;
	      return node;
	    }
	  }
	}

	const Selector$8 = {
	  DATA_MOUNT: '[data-mount="range"]',
	  MAXTEXT: 'maxtext',
	  MINTEXT: 'mintext',
	  VALUETEXT: 'valuetext'
	};
	const ClassName$4 = {
	  TOOLTIP: 'custom-range-tooltip',
	  DISABLED: 'disabled'
	};
	const EventName$8 = {
	  ON_CHANGE: 'onChange',
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove',
	  CHANGE: 'change',
	  INPUT: 'input',
	  POINTERMOVE: 'pointermove',
	  RESIZE: 'resize'
	};
	const ranges = [];

	/**
	 * Private functions.
	 */
	function _getValuetext(value) {
	  if (value === this.min && this.valueTextTemplates[Selector$8.MINTEXT]) {
	    return Util.interpolateString(this.valueTextTemplates[Selector$8.MINTEXT], {
	      value
	    });
	  }
	  if (value === this.max && this.valueTextTemplates[Selector$8.MAXTEXT]) {
	    return Util.interpolateString(this.valueTextTemplates[Selector$8.MAXTEXT], {
	      value
	    });
	  }
	  if (this.valueTextTemplates[Selector$8.VALUETEXT]) {
	    return Util.interpolateString(this.valueTextTemplates[Selector$8.VALUETEXT], {
	      value
	    });
	  }
	  return value;
	}

	/**
	 * @this Range
	 */
	function _valueChanged() {
	  if (!this.value || this.el.value !== this.value) {
	    this.el.setAttribute('aria-valuetext', this.getValuetext(this.el.value));

	    // Create and dispatch custom event to signal value change
	    this[EventName$8.ON_CHANGE] = new CustomEvent(EventName$8.ON_CHANGE, {
	      bubbles: true,
	      detail: {
	        value: this.el.value
	      }
	    });
	    this.el.dispatchEvent(this[EventName$8.ON_CHANGE]);

	    // Update the stored value
	    this.value = this.el.value;
	  }
	}
	function _getValueTextTemplates() {
	  const templates = {};
	  templates[Selector$8.VALUETEXT] = this.el.dataset[Selector$8.VALUETEXT] || null;
	  templates[Selector$8.MINTEXT] = this.el.dataset[Selector$8.MINTEXT] || null;
	  templates[Selector$8.MAXTEXT] = this.el.dataset[Selector$8.MAXTEXT] || null;
	  return templates;
	}
	function _createTooltip() {
	  const wrapper = document.createElement('div');
	  const span = document.createElement('span');
	  wrapper.classList.add(ClassName$4.TOOLTIP);
	  wrapper.setAttribute('aria-hidden', 'true');
	  wrapper.append(span);
	  this.el.before(wrapper);
	  return {
	    wrapper,
	    span
	  };
	}
	function _updateTooltip() {
	  const ratio = (this.el.value - this.min) / (this.max - this.min);
	  const thumbWidth = 24; // Shadow DOM
	  const inputWidth = this.el.offsetWidth;
	  this.tooltip.span.textContent = this.el.value;
	  const spanWidth = this.tooltip.span.offsetWidth;
	  const offset = ratio * (inputWidth - thumbWidth) - spanWidth / 2 + thumbWidth / 2;
	  const direction = Util.isBiDirectional() ? 'right' : 'left';
	  this.tooltip.span.style[direction] = `${offset}px`;
	  if (this.el.hasAttribute('disabled')) {
	    this.el.parentElement.classList.add(ClassName$4.DISABLED);
	  } else {
	    this.el.parentElement.classList.remove(ClassName$4.DISABLED);
	  }
	}

	/**
	 * Class representing a range slider.
	 */
	class Range {
	  /**
	   * Create a Range slider instance
	   * @param {Object} opts - The range options.
	   * @param {HTMLInputElement} opts.el - The range DOM node.
	   * @param {Function} [opts.onInput] - Function to override the range input handler.
	   * @param {Function} [opts.getValuetext] - Function that returns the aria-valuetext value for a particular range value.
	   * @param {Object} [opts.valueTextTemplates] - Object containing string templates for maxtext, mintext, and valuetext.
	   * @param {Object} [opts.tooltip] - Object containing references to two Nodes: the tooltip wrapper and span (text container).
	   */
	  constructor(opts) {
	    this.el = opts.el;
	    this.min = this.el.min || 0; // HTML default
	    this.max = this.el.max || 100; // HTML default
	    this.onInput = opts.onInput || _updateTooltip.bind(this);
	    this.getValuetext = opts.getValuetext || _getValuetext.bind(this);
	    this.valueTextTemplates = opts.valueTextTemplates || _getValueTextTemplates.call(this);
	    this.value = '';
	    this.tooltip = opts.tooltip || _createTooltip.call(this);
	    if (this.tooltip) {
	      // Perform initial tooltip setup
	      this.onInput();

	      // Add tooltip event handlers
	      this.tooltipEvents = {
	        inputEvent: {
	          el: this.el,
	          type: EventName$8.INPUT,
	          handler: this.onInput
	        },
	        changeEvent: {
	          el: this.el,
	          type: EventName$8.CHANGE,
	          handler: this.onInput
	        },
	        // Required for iOS/VoiceOver
	        windowEvent: {
	          el: window,
	          type: EventName$8.RESIZE,
	          handler: throttle(100, this.onInput)
	        }
	      };
	      Util.addEvents(Object.values(this.tooltipEvents));
	    }

	    // Set the initial aria-valuetext
	    _valueChanged.call(this);

	    // Both change and pointermove are required to update aria-valuetext properly in various SR/device combos
	    // See https://github.com/w3c/aria-practices/pull/1757
	    this.valueTextEvents = {
	      changeEvent: {
	        el: this.el,
	        type: EventName$8.CHANGE,
	        handler: _valueChanged.bind(this)
	      },
	      pointerEvent: {
	        el: this.el,
	        type: EventName$8.POINTERMOVE,
	        handler: throttle(250, _valueChanged.bind(this))
	      }
	    };
	    Util.addEvents(Object.values(this.valueTextEvents));
	    ranges.push(this);
	  }

	  /**
	   * Update the range.
	   * @param {Object} [opts] - The range options.
	   * @param {Function} [opts.onInput] - Function to override the range input handler.
	   * @param {Function} [opts.getValuetext] - Function that returns the aria-valuetext value for a particular range value.
	   * @param {Object} [opts.valueTextTemplates] - Object containing string templates for maxtext, mintext, and valuetext.
	   * @param {Object} [opts.tooltip] - Object containing references to two Nodes: the tooltip wrapper and span (text container).
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    // Only update the input event handler if the tooltip exists
	    if (opts.onInput && this.tooltip) {
	      Util.removeEvents(Object.values(this.tooltipEvents));
	      this.onInput = opts.onInput;
	      this.tooltipEvents = {
	        inputEvent: {
	          el: this.el,
	          type: EventName$8.INPUT,
	          handler: this.onInput
	        },
	        changeEvent: {
	          el: this.el,
	          type: EventName$8.CHANGE,
	          handler: this.onInput
	        },
	        // Required for iOS/VoiceOver
	        windowEvent: {
	          el: window,
	          type: EventName$8.RESIZE,
	          handler: throttle(100, this.onInput)
	        }
	      };
	      Util.addEvents(Object.values(this.tooltipEvents));
	    }
	    if (opts.getValuetext) {
	      this.getValuetext = opts.getValuetext;
	    }
	    if (opts.valueTextTemplates) {
	      this.valueTextTemplates = opts.valueTextTemplates;
	    }
	    if (opts.tooltip === null || opts.tooltip) {
	      if (opts.tooltip === null) {
	        // Remove the tooltip DOM node and event listeners
	        this.tooltip.wrapper.remove();
	        Util.removeEvents(Object.values(this.tooltipEvents));
	      }
	      this.tooltip = opts.tooltip;
	    }
	    if (this.tooltip) {
	      // Min and max may have changed, perform tooltip setup again
	      this.onInput();
	    }

	    // Set the initial aria-valuetext
	    _valueChanged.call(this);

	    // Create and dispatch custom event
	    this[EventName$8.ON_UPDATE] = new CustomEvent(EventName$8.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$8.ON_UPDATE]);
	  }

	  /**
	   * Remove the range.
	   */
	  remove() {
	    Util.removeEvents(Object.values(this.valueTextEvents));
	    if (this.tooltip) {
	      Util.removeEvents(Object.values(this.tooltipEvents));
	    }
	    const index = ranges.indexOf(this);
	    ranges.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$8.ON_REMOVE] = new CustomEvent(EventName$8.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$8.ON_REMOVE]);
	  }

	  /**
	   * Get an array of range instances.
	   * @returns {Object[]} Array of range instances.
	   */
	  static getInstances() {
	    return ranges;
	  }
	}

	const Selector$7 = {
	  DATA_MOUNT: '[data-mount="scrollspy"]',
	  ACTIVE_CLASS: 'activeClass',
	  OFFSET: 'offset',
	  TARGET_LINKS: '[href]',
	  SCROLLSPY_CONTAINER: '.scrollspy-container'
	};
	const EventName$7 = {
	  CLICK: 'click',
	  SCROLL: 'scroll',
	  KEYUP: 'keyup',
	  RESIZE: 'resize',
	  ON_CHANGE: 'onChange',
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove'
	};
	const Method = {
	  OFFSET: 'offset',
	  POSITION: 'position'
	};
	const Default$1 = {
	  OFFSET: 10
	};
	const {
	  TAB
	} = Util.keys;
	const instances$2 = [];

	/**
	 * Check for the `data-smooth-scroll` attribute.
	 * Its presence makes this option "true" unless the value is specifically set to "false"
	 * @param {HTMLElement} node - The element to check for the attribute `data-smooth-scroll`
	 * @returns {Boolean} return false if the attribute is not set or equal to false
	 */
	function _hasSmoothScroll(node) {
	  if (node.hasAttribute('data-smooth-scroll') && node.dataset.smoothScroll !== 'false') {
	    return true;
	  }
	  return false;
	}

	/**
	 * Gets the target element containing anchor links
	 * @returns {HTMLElement?} The target element
	 */
	function _getTarget() {
	  // Reads selector from data-target attribute
	  const selector = Util.getSelectorFromElement(this.el);

	  // There should only be one element targeted, gets the first match
	  return document.querySelector(selector);
	}

	/**
	 * Class representing a Scrollspy.
	 */
	var _scrollElement = /*#__PURE__*/_classPrivateFieldLooseKey("scrollElement");
	var _targetLinks = /*#__PURE__*/_classPrivateFieldLooseKey("targetLinks");
	var _observableSections = /*#__PURE__*/_classPrivateFieldLooseKey("observableSections");
	var _offsets = /*#__PURE__*/_classPrivateFieldLooseKey("offsets");
	var _targets = /*#__PURE__*/_classPrivateFieldLooseKey("targets");
	var _activeTarget = /*#__PURE__*/_classPrivateFieldLooseKey("activeTarget");
	var _scrollHeight = /*#__PURE__*/_classPrivateFieldLooseKey("scrollHeight");
	var _stickyInstance = /*#__PURE__*/_classPrivateFieldLooseKey("stickyInstance");
	var _stickyHeight = /*#__PURE__*/_classPrivateFieldLooseKey("stickyHeight");
	var _navInPageInstance = /*#__PURE__*/_classPrivateFieldLooseKey("navInPageInstance");
	var _setup = /*#__PURE__*/_classPrivateFieldLooseKey("setup");
	var _setTargetsAndOffsets = /*#__PURE__*/_classPrivateFieldLooseKey("setTargetsAndOffsets");
	var _getOffset = /*#__PURE__*/_classPrivateFieldLooseKey("getOffset");
	var _getPosition = /*#__PURE__*/_classPrivateFieldLooseKey("getPosition");
	var _getScrollTop = /*#__PURE__*/_classPrivateFieldLooseKey("getScrollTop");
	var _getScrollHeight = /*#__PURE__*/_classPrivateFieldLooseKey("getScrollHeight");
	var _getOffsetHeight = /*#__PURE__*/_classPrivateFieldLooseKey("getOffsetHeight");
	var _updateStickyValues = /*#__PURE__*/_classPrivateFieldLooseKey("updateStickyValues");
	var _getStickyInstance = /*#__PURE__*/_classPrivateFieldLooseKey("getStickyInstance");
	var _getNavInPageInstance = /*#__PURE__*/_classPrivateFieldLooseKey("getNavInPageInstance");
	var _getStickyHeight = /*#__PURE__*/_classPrivateFieldLooseKey("getStickyHeight");
	var _onWindowResize$1 = /*#__PURE__*/_classPrivateFieldLooseKey("onWindowResize");
	var _onAnchorClick = /*#__PURE__*/_classPrivateFieldLooseKey("onAnchorClick");
	var _onKeyUp = /*#__PURE__*/_classPrivateFieldLooseKey("onKeyUp");
	var _onScroll$1 = /*#__PURE__*/_classPrivateFieldLooseKey("onScroll");
	var _activate$1 = /*#__PURE__*/_classPrivateFieldLooseKey("activate");
	class Scrollspy {
	  // Instantiate private properties

	  /**
	   * Create a Scrollspy instance
	   * @param {Object} opts - The Scrollspy options.
	   * @param {HTMLElement} opts.el - The Scrollspy DOM node.
	   * @param {HTMLElement} [opts.target] - The DOM node containing anchor links
	   * @param {boolean} [opts.smoothScroll] - Whether to apply smooth scrolling when clicking on links in the target element
	   * @param {string} [opts.activeClass] - The CSS class to apply to active links
	   * @param {number} [opts.offset] - Offset in pixels
	   */
	  constructor(opts) {
	    Object.defineProperty(this, _activate$1, {
	      value: _activate2
	    });
	    Object.defineProperty(this, _onScroll$1, {
	      value: _onScroll2
	    });
	    Object.defineProperty(this, _onKeyUp, {
	      value: _onKeyUp2
	    });
	    Object.defineProperty(this, _onAnchorClick, {
	      value: _onAnchorClick2
	    });
	    Object.defineProperty(this, _onWindowResize$1, {
	      value: _onWindowResize2
	    });
	    Object.defineProperty(this, _getStickyHeight, {
	      value: _getStickyHeight2
	    });
	    Object.defineProperty(this, _getNavInPageInstance, {
	      value: _getNavInPageInstance2
	    });
	    Object.defineProperty(this, _getStickyInstance, {
	      value: _getStickyInstance2
	    });
	    Object.defineProperty(this, _updateStickyValues, {
	      value: _updateStickyValues2
	    });
	    Object.defineProperty(this, _getOffsetHeight, {
	      value: _getOffsetHeight2
	    });
	    Object.defineProperty(this, _getScrollHeight, {
	      value: _getScrollHeight2
	    });
	    Object.defineProperty(this, _getScrollTop, {
	      value: _getScrollTop2
	    });
	    Object.defineProperty(this, _getPosition, {
	      value: _getPosition2
	    });
	    Object.defineProperty(this, _getOffset, {
	      value: _getOffset2
	    });
	    Object.defineProperty(this, _setTargetsAndOffsets, {
	      value: _setTargetsAndOffsets2
	    });
	    Object.defineProperty(this, _setup, {
	      value: _setup2
	    });
	    Object.defineProperty(this, _scrollElement, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _targetLinks, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _observableSections, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _offsets, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _targets, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _activeTarget, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _scrollHeight, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _stickyInstance, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _stickyHeight, {
	      writable: true,
	      value: void 0
	    });
	    Object.defineProperty(this, _navInPageInstance, {
	      writable: true,
	      value: void 0
	    });
	    this.el = opts.el;
	    this.target = opts.target || _getTarget.call(this);
	    this.smoothScroll = typeof opts.smoothScroll === 'boolean' ? opts.smoothScroll : _hasSmoothScroll(this.el);
	    this.activeClass = opts.activeClass || this.el.dataset[Selector$7.ACTIVE_CLASS] || null;
	    this.offset = opts.offset || parseInt(this.el.dataset[Selector$7.OFFSET], 10) || Default$1.OFFSET;

	    // Set up private properties
	    _classPrivateFieldLooseBase(this, _scrollElement)[_scrollElement] = this.el.tagName === 'BODY' ? window : this.el;
	    _classPrivateFieldLooseBase(this, _targetLinks)[_targetLinks] = new Map();
	    _classPrivateFieldLooseBase(this, _observableSections)[_observableSections] = new Map();
	    _classPrivateFieldLooseBase(this, _offsets)[_offsets] = [];
	    _classPrivateFieldLooseBase(this, _targets)[_targets] = [];
	    _classPrivateFieldLooseBase(this, _activeTarget)[_activeTarget] = null;
	    _classPrivateFieldLooseBase(this, _scrollHeight)[_scrollHeight] = 0;
	    _classPrivateFieldLooseBase(this, _stickyInstance)[_stickyInstance] = null; // Don't try to get it yet, it's likely not available
	    _classPrivateFieldLooseBase(this, _stickyHeight)[_stickyHeight] = 0;
	    _classPrivateFieldLooseBase(this, _navInPageInstance)[_navInPageInstance] = null;
	    this.events = [];
	    imagesloadedExports(this.el, () => {
	      _classPrivateFieldLooseBase(this, _setup)[_setup]();
	    });
	    instances$2.push(this);
	  }

	  /**
	   * Initialize the target links and observable sections of the page
	   */

	  /**
	   * Get an array of Scrollspy instances.
	   * @returns {Scrollspy[]} Array of Scrollspy instances.
	   */
	  static getInstances() {
	    return instances$2;
	  }

	  /**
	   * Update the Scrollspy instance
	   * @param {Object} [opts] - The Scrollspy options
	   * @param {HTMLElement} [opts.target] - The DOM node containing anchor links
	   * @param {boolean} [opts.smoothScroll] - Whether to apply smooth scrolling when clicking on links in the target element
	   * @param {string} [opts.activeClass] - The CSS class to apply to active links
	   * @param {number} [opts.offset] - Offset in pixels
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    if (opts.target) {
	      this.target = opts.target;
	    }
	    if (typeof opts.smoothScroll === 'boolean') {
	      this.smoothScroll = opts.smoothScroll;
	    }
	    if (opts.activeClass) {
	      this.activeClass = opts.activeClass;
	    }
	    if (opts.offset) {
	      this.offset = opts.offset;
	    }

	    // Reset click events
	    Util.removeEvents(this.events);
	    this.events = [];
	    _classPrivateFieldLooseBase(this, _setup)[_setup]();
	    this[EventName$7.ON_UPDATE] = new CustomEvent(EventName$7.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$7.ON_UPDATE]);
	  }

	  /**
	   * Remove the Scrollspy instance
	   */
	  remove() {
	    Util.removeEvents(this.events);
	    const index = instances$2.indexOf(this);
	    instances$2.splice(index, 1);
	    this[EventName$7.ON_REMOVE] = new CustomEvent(EventName$7.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$7.ON_REMOVE]);
	  }
	}
	function _setup2() {
	  _classPrivateFieldLooseBase(this, _targetLinks)[_targetLinks].clear();
	  _classPrivateFieldLooseBase(this, _observableSections)[_observableSections].clear();
	  const targetLinks = Array.from(this.target.querySelectorAll(Selector$7.TARGET_LINKS));
	  targetLinks.forEach(anchor => {
	    // Ensure that the anchor has an id and is not disabled
	    if (!anchor.hash || anchor.hasAttribute('disabled')) {
	      return;
	    }
	    const observableSection = this.el.querySelector(anchor.hash);

	    // Ensure that the observableSection exists & is visible
	    if (getComputedStyle(observableSection).getPropertyValue('visibility') === 'visible') {
	      _classPrivateFieldLooseBase(this, _targetLinks)[_targetLinks].set(anchor.hash, anchor);
	      _classPrivateFieldLooseBase(this, _observableSections)[_observableSections].set(anchor.hash, observableSection);

	      // Add anchor event listeners
	      this.events.push({
	        el: anchor,
	        type: EventName$7.CLICK,
	        handler: _classPrivateFieldLooseBase(this, _onAnchorClick)[_onAnchorClick].bind(this)
	      });
	    }
	  });
	  _classPrivateFieldLooseBase(this, _setTargetsAndOffsets)[_setTargetsAndOffsets](targetLinks);

	  // Activate the first target on setup
	  if (_classPrivateFieldLooseBase(this, _targets)[_targets].length > 0 && _classPrivateFieldLooseBase(this, _activeTarget)[_activeTarget] !== _classPrivateFieldLooseBase(this, _targets)[_targets][0]) {
	    _classPrivateFieldLooseBase(this, _activate$1)[_activate$1](_classPrivateFieldLooseBase(this, _targets)[_targets][0]);
	  }
	  this.events.push({
	    el: _classPrivateFieldLooseBase(this, _scrollElement)[_scrollElement],
	    handler: throttle(200, () => _classPrivateFieldLooseBase(this, _onScroll$1)[_onScroll$1]()),
	    type: EventName$7.SCROLL
	  }, {
	    el: _classPrivateFieldLooseBase(this, _scrollElement)[_scrollElement],
	    handler: _classPrivateFieldLooseBase(this, _onKeyUp)[_onKeyUp].bind(this),
	    type: EventName$7.KEYUP
	  }, {
	    el: window,
	    handler: throttle(500, () => _classPrivateFieldLooseBase(this, _onWindowResize$1)[_onWindowResize$1](), {
	      noLeading: true
	    }),
	    type: EventName$7.RESIZE
	  });
	  Util.addEvents(this.events);
	}
	function _setTargetsAndOffsets2(targets) {
	  _classPrivateFieldLooseBase(this, _scrollHeight)[_scrollHeight] = _classPrivateFieldLooseBase(this, _getScrollHeight)[_getScrollHeight]();
	  if (targets.length > 0) {
	    _classPrivateFieldLooseBase(this, _offsets)[_offsets] = [];
	    _classPrivateFieldLooseBase(this, _targets)[_targets] = [];
	    const offsetMethod = _classPrivateFieldLooseBase(this, _scrollElement)[_scrollElement] === window ? Method.OFFSET : Method.POSITION;
	    targets.map(anchor => {
	      const observableSection = _classPrivateFieldLooseBase(this, _observableSections)[_observableSections].get(anchor.hash);
	      const offsetPosition = offsetMethod === Method.OFFSET ? _classPrivateFieldLooseBase(this, _getOffset)[_getOffset](observableSection) : _classPrivateFieldLooseBase(this, _getPosition)[_getPosition](observableSection);
	      return [offsetPosition, anchor.hash];
	    }).filter(Boolean) // remove any null values
	    .sort((a, b) => a[0] - b[0]) // sort by offset
	    .forEach(item => {
	      _classPrivateFieldLooseBase(this, _offsets)[_offsets].push(item[0]);
	      _classPrivateFieldLooseBase(this, _targets)[_targets].push(item[1]);
	    });
	  }
	}
	function _getOffset2(element) {
	  return element.getBoundingClientRect().top + window.scrollY;
	}
	function _getPosition2(element) {
	  return element.offsetTop;
	}
	function _getScrollTop2() {
	  return _classPrivateFieldLooseBase(this, _scrollElement)[_scrollElement] === window ? window.scrollY : _classPrivateFieldLooseBase(this, _scrollElement)[_scrollElement].scrollTop;
	}
	function _getScrollHeight2() {
	  return _classPrivateFieldLooseBase(this, _scrollElement)[_scrollElement].scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	}
	function _getOffsetHeight2() {
	  return _classPrivateFieldLooseBase(this, _scrollElement)[_scrollElement] === window ? window.innerHeight : _classPrivateFieldLooseBase(this, _scrollElement)[_scrollElement].getBoundingClientRect().height;
	}
	function _updateStickyValues2() {
	  if (!_classPrivateFieldLooseBase(this, _stickyInstance)[_stickyInstance]) {
	    _classPrivateFieldLooseBase(this, _stickyInstance)[_stickyInstance] = _classPrivateFieldLooseBase(this, _getStickyInstance)[_getStickyInstance]();
	  }
	  _classPrivateFieldLooseBase(this, _stickyHeight)[_stickyHeight] = _classPrivateFieldLooseBase(this, _getStickyHeight)[_getStickyHeight]();
	}
	function _getStickyInstance2() {
	  const closestSticky = this.target.closest(Selector$r.DATA_MOUNT);
	  if (closestSticky) {
	    const stickyInstances = Sticky.getInstances();
	    return stickyInstances.find(sticky => sticky.el === closestSticky);
	  }
	  return null;
	}
	function _getNavInPageInstance2() {
	  const closestNavInPage = this.target.closest(Selector$b.DATA_MOUNT);
	  if (closestNavInPage) {
	    const navInPageInstances = NavInPage.getInstances();
	    return navInPageInstances.find(navInPage => navInPage.el === closestNavInPage);
	  }
	  return null;
	}
	function _getStickyHeight2() {
	  if (_classPrivateFieldLooseBase(this, _stickyInstance)[_stickyInstance]) {
	    const stickyWidth = parseFloat(window.getComputedStyle(_classPrivateFieldLooseBase(this, _stickyInstance)[_stickyInstance].el).width);
	    const viewportWidth = Math.min(document.documentElement.clientWidth, window.innerWidth);
	    if (!_classPrivateFieldLooseBase(this, _navInPageInstance)[_navInPageInstance]) {
	      _classPrivateFieldLooseBase(this, _navInPageInstance)[_navInPageInstance] = _classPrivateFieldLooseBase(this, _getNavInPageInstance)[_getNavInPageInstance]();
	    }

	    // Only return the stuck height if the sticky is full width
	    // or it is inside a horizontal in-page nav
	    return stickyWidth >= viewportWidth || _classPrivateFieldLooseBase(this, _navInPageInstance)[_navInPageInstance].alignment === Alignment.HORIZONTAL ? _classPrivateFieldLooseBase(this, _stickyInstance)[_stickyInstance].getStuckHeight() : 0;
	  }
	  return 0;
	}
	function _onWindowResize2() {
	  // Give the browser a little time to recalculate layouts
	  setTimeout(() => {
	    imagesloadedExports(this.el, () => {
	      _classPrivateFieldLooseBase(this, _setTargetsAndOffsets)[_setTargetsAndOffsets](Array.from(_classPrivateFieldLooseBase(this, _targetLinks)[_targetLinks].values()));
	      _classPrivateFieldLooseBase(this, _updateStickyValues)[_updateStickyValues]();
	      _classPrivateFieldLooseBase(this, _onScroll$1)[_onScroll$1](); // Call the scroll handler again at the end to update the active target
	    });
	  }, 1000);
	}
	function _onAnchorClick2(event) {
	  const observableSection = _classPrivateFieldLooseBase(this, _observableSections)[_observableSections].get(event.target.hash);
	  if (observableSection) {
	    event.preventDefault();
	    _classPrivateFieldLooseBase(this, _updateStickyValues)[_updateStickyValues]();

	    // Update the URL
	    if (event.target.hash !== window.location.hash) {
	      window.history.pushState({}, '', event.target.hash);
	    }
	    const root = _classPrivateFieldLooseBase(this, _scrollElement)[_scrollElement];
	    const targetIndex = _classPrivateFieldLooseBase(this, _targets)[_targets].indexOf(event.target.hash);
	    const sectionOffset = _classPrivateFieldLooseBase(this, _offsets)[_offsets][targetIndex] - _classPrivateFieldLooseBase(this, _stickyHeight)[_stickyHeight];
	    const behavior = this.smoothScroll && !Util.prefersReducedMotion() ? 'smooth' : 'auto';

	    // preventScroll is not supported in Android
	    _classPrivateFieldLooseBase(this, _observableSections)[_observableSections].get(event.target.hash).focus({
	      preventScroll: true
	    });

	    // Give the browser a few milliseconds to catch up...
	    setTimeout(() => {
	      root.scrollTo({
	        top: sectionOffset,
	        behavior
	      });
	    }, 100);
	  }
	}
	function _onKeyUp2(event) {
	  const {
	    key
	  } = event;
	  if (key === TAB && document.querySelector(Selector$7.SCROLLSPY_CONTAINER).contains(document.activeElement)) {
	    const targetSelector = _classPrivateFieldLooseBase(this, _targets)[_targets].join(',');
	    const closestParentTarget = document.activeElement.closest(targetSelector);
	    if (closestParentTarget) {
	      // The targets are containers
	      _classPrivateFieldLooseBase(this, _activate$1)[_activate$1](`#${closestParentTarget.id}`);
	    } else {
	      // The targets are heading elements, attempt to find one
	      const siblingTargetSelector = _classPrivateFieldLooseBase(this, _targets)[_targets].map(t => t + ' ~ *').join(',');
	      const nearestParent = document.activeElement.closest(siblingTargetSelector);
	      const nearestTarget = nearestParent?.previousElementSibling;
	      if (nearestTarget && nearestTarget.matches(targetSelector)) {
	        _classPrivateFieldLooseBase(this, _activate$1)[_activate$1](`#${nearestTarget.id}`);
	      }
	    }
	  }
	}
	function _onScroll2() {
	  _classPrivateFieldLooseBase(this, _updateStickyValues)[_updateStickyValues]();
	  const scrollTop = _classPrivateFieldLooseBase(this, _getScrollTop)[_getScrollTop]() + _classPrivateFieldLooseBase(this, _stickyHeight)[_stickyHeight] + this.offset;
	  const scrollHeight = _classPrivateFieldLooseBase(this, _getScrollHeight)[_getScrollHeight]();
	  const maxScroll = _classPrivateFieldLooseBase(this, _stickyHeight)[_stickyHeight] + this.offset + scrollHeight - _classPrivateFieldLooseBase(this, _getOffsetHeight)[_getOffsetHeight]();

	  // Check if the scrollHeight has changed
	  if (_classPrivateFieldLooseBase(this, _scrollHeight)[_scrollHeight] !== scrollHeight) {
	    _classPrivateFieldLooseBase(this, _setup)[_setup]();
	  }

	  // Activate the last target if we've scrolled past the end of the scrollable area
	  if (scrollTop >= maxScroll) {
	    const target = _classPrivateFieldLooseBase(this, _targets)[_targets][_classPrivateFieldLooseBase(this, _targets)[_targets].length - 1];
	    if (_classPrivateFieldLooseBase(this, _activeTarget)[_activeTarget] !== target) {
	      _classPrivateFieldLooseBase(this, _activate$1)[_activate$1](target);
	    }
	    return;
	  }

	  // Activate the first target if we've scrolled before the top of the scrollable area
	  if (_classPrivateFieldLooseBase(this, _activeTarget)[_activeTarget] && scrollTop < _classPrivateFieldLooseBase(this, _offsets)[_offsets][0] && _classPrivateFieldLooseBase(this, _offsets)[_offsets][0] > 0) {
	    const target = _classPrivateFieldLooseBase(this, _targets)[_targets][0];
	    if (_classPrivateFieldLooseBase(this, _activeTarget)[_activeTarget] !== target) {
	      _classPrivateFieldLooseBase(this, _activate$1)[_activate$1](target);
	    }
	    return;
	  }
	  for (let i = _classPrivateFieldLooseBase(this, _offsets)[_offsets].length; i--;) {
	    const isActiveTarget = _classPrivateFieldLooseBase(this, _activeTarget)[_activeTarget] !== _classPrivateFieldLooseBase(this, _targets)[_targets][i] && scrollTop >= _classPrivateFieldLooseBase(this, _offsets)[_offsets][i] && (_classPrivateFieldLooseBase(this, _offsets)[_offsets][i + 1] === undefined || scrollTop < _classPrivateFieldLooseBase(this, _offsets)[_offsets][i + 1]);
	    if (isActiveTarget) {
	      _classPrivateFieldLooseBase(this, _activate$1)[_activate$1](_classPrivateFieldLooseBase(this, _targets)[_targets][i]);
	    }
	  }
	}
	function _activate2(target) {
	  if (_classPrivateFieldLooseBase(this, _activeTarget)[_activeTarget] !== target) {
	    _classPrivateFieldLooseBase(this, _activeTarget)[_activeTarget] = target;
	    _classPrivateFieldLooseBase(this, _targetLinks)[_targetLinks].forEach((anchor, hash) => {
	      if (target === hash) {
	        anchor.setAttribute('aria-current', 'true');
	        anchor.classList.add(this.activeClass);
	      } else {
	        anchor.removeAttribute('aria-current');
	        anchor.classList.remove(this.activeClass);
	      }
	    });
	    this[EventName$7.ON_CHANGE] = new CustomEvent(EventName$7.ON_CHANGE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$7.ON_CHANGE]);
	  }
	}

	const Selector$6 = {
	  TOGGLE: '.show-more-show-less-toggle',
	  ELLIPSIS: '.show-more-show-less-ellipsis',
	  TOGGLEABLE_CONTENT: '.show-more-show-less-toggleable-content',
	  DATA_MOUNT: '[data-mount="show-more-show-less"]'
	};
	const Attribute$2 = {
	  DISABLE_HIDE: 'data-disable-hide'
	};
	const ClassName$3 = {
	  DISPLAY_NONE: 'd-none'
	};
	const EventName$6 = {
	  ON_HIDE: 'onHide',
	  ON_SHOW: 'onShow',
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate'
	};
	const instances$1 = [];
	function _elOnClick() {
	  this.toggle();
	}
	function _toggleableContentOnFocusOut(element) {
	  // remove aria-live after hidden content has been read/focused once
	  element.removeAttribute('aria-live');
	  element.removeAttribute('aria-atomic');
	}
	class ShowMoreShowLess {
	  /**
	   * Create a ShowMoreShowLess instance
	   * @param {Object} opts - The show-more-show-less options.
	   * @param {HTMLElement} opts.el - The container element for content that will be hidden/shown.
	   * @param {boolean} [opts.disableHide=false] - Whether to prevent "show less" and hide toggle button after click (applies only to ShowMoreShowLessSingleElement)
	   * @param {number} [opts.hideAfter] - Optional amount of items to show.
	   * @param {string} [opts.showMoreText] - Optional text for showMoreText
	   * @param {string} [opts.showLessText] - Optional text for showLessText
	   * @param {string} [opts.showLessAriaLabel] - Optional text for showLessAriaLabel
	   */
	  constructor(_ref) {
	    let {
	      el,
	      disableHide = false,
	      hideAfter,
	      showMoreText,
	      showLessText,
	      showLessAriaLabel
	    } = _ref;
	    /**
	     * Defines which variant should be instantiated.
	     */
	    if (hideAfter ?? el.hasAttribute('data-count')) {
	      // eslint-disable-next-line no-constructor-return
	      return new ShowMoreShowLessMultiElement({
	        el,
	        hideAfter: hideAfter || Number(el.getAttribute('data-count')),
	        showMoreText,
	        showLessText,
	        showLessAriaLabel
	      });
	    }

	    // eslint-disable-next-line no-constructor-return
	    return new ShowMoreShowLessSingleElement({
	      el,
	      disableHide,
	      showMoreText,
	      showLessText,
	      showLessAriaLabel
	    });
	  }

	  /**
	   * Return the number of instances.
	   * @returns {Object[]} an array of active instances.
	   */
	  static getInstances() {
	    return instances$1;
	  }
	}
	class ShowMoreShowLessBase {
	  /**
	   * Defines a show-more-show-less base component.
	   * @param {Object} opts - The show-more-show-less options.
	   */
	  constructor(opts) {
	    /**
	     * The container element for content that will be hidden/shown.
	     */
	    this.el = opts.el;

	    /**
	     * The element bound with the toggle event handler.
	     */
	    this.control = this.el.querySelector(Selector$6.TOGGLE);

	    /**
	     * Create a span element to be appended within the action trigger when show/hide method is called
	     */
	    this.spanEl = document.createElement('span');
	    this.spanEl.setAttribute('aria-hidden', 'true');
	    this.spanEl.setAttribute('class', 'glyph');
	    this.disableHide = opts.disableHide || this.el.hasAttribute(Attribute$2.DISABLE_HIDE);

	    /**
	     * The control text values.
	     */
	    this.showMoreText = opts.showMoreText || this.control.textContent;
	    this.showLessText = opts.showLessText || this.control.getAttribute('data-show-less-text');
	    this.showLessLabelText = opts.showLessAriaLabel;

	    /**
	     * The optional control aria-label values.
	     */
	    if (this.control.hasAttribute('aria-label')) {
	      this.showMoreLabelText = this.control.getAttribute('aria-label');
	      this.showLessLabelText = opts.showLessAriaLabel || this.control.getAttribute('data-alternate-aria-label') || this.showLessText;
	    }

	    /**
	     * The element demarking shown and hidden content.
	     */
	    this.ellipsis = this.el.querySelector(Selector$6.ELLIPSIS);
	    this.shown = false;

	    /**
	     * Event binders.
	     */
	    this.events = [{
	      el: this.control,
	      type: 'click',
	      handler: _elOnClick.bind(this)
	    }];
	    instances$1.push(this);
	  }

	  /**
	   * Focus new element when show and hide.
	   * @param {HTMLElement} element - The element to focus.
	   */
	  setFocusToElement(element) {
	    document.activeElement.blur();
	    const nestedFocusableElement = Util.getFocusableElements(element)[0];
	    // Apply focus to the first focusable element in the "show more content".
	    if (nestedFocusableElement) {
	      nestedFocusableElement.focus();
	    } else {
	      element.focus();
	    }
	  }

	  /**
	   * Show toggleable content.
	   */
	  show() {
	    // Create and dispatch custom event
	    this[EventName$6.ON_SHOW] = new CustomEvent(EventName$6.ON_SHOW, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.control.dispatchEvent(this[EventName$6.ON_SHOW]);
	    if (this[EventName$6.ON_SHOW].defaultPrevented) {
	      return;
	    }
	    this.shown = true;
	    if (this.ellipsis) {
	      this.ellipsis.classList.add(ClassName$3.DISPLAY_NONE);
	    }
	    this.control.setAttribute('aria-expanded', true);
	    this.control.textContent = this.showLessText;
	    if (this.control.hasAttribute('aria-label')) {
	      this.control.setAttribute('aria-label', this.showLessLabelText);
	    }

	    // Updating the textContent with showMoreText will removes the span element that is now required within the action trigger component
	    // so this prepend a span element with the remove-from glyph
	    this.control.prepend(this.spanEl);
	    this.spanEl.classList.add('glyph-remove-from');
	  }

	  /**
	   * Hide toggleable content.
	   */
	  hide() {
	    // match UI behavior to prevent hiding content when "show more only"
	    if (this.disableHide) {
	      return;
	    }

	    // Create and dispatch custom event
	    this[EventName$6.ON_HIDE] = new CustomEvent(EventName$6.ON_HIDE, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.control.dispatchEvent(this[EventName$6.ON_HIDE]);
	    if (this[EventName$6.ON_HIDE].defaultPrevented) {
	      return;
	    }
	    this.shown = false;
	    if (this.ellipsis) {
	      this.ellipsis.classList.remove(ClassName$3.DISPLAY_NONE);
	    }
	    this.control.setAttribute('aria-expanded', false);
	    if (this.control.hasAttribute('aria-label')) {
	      this.control.setAttribute('aria-label', this.showMoreLabelText);
	    }
	    this.control.textContent = this.showMoreText;

	    // Updating the textContent with showMoreText will removes the span element that is now required within the action trigger component
	    // so this prepend a span element with the circle-plus glyph
	    this.control.prepend(this.spanEl);
	    this.spanEl.classList.remove('glyph-remove-from');
	    this.spanEl.classList.add('glyph-circle-plus');
	  }

	  /**
	   * Show/hide toggleable content, depending if currently shown.
	   */
	  toggle() {
	    if (this.shown) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  }

	  /**
	   * Removes active instance of component.
	   */
	  remove() {
	    Util.removeEvents(this.events);

	    // Remove this reference from the array of instances.
	    const index = instances$1.indexOf(this);
	    instances$1.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$6.ON_REMOVE] = new CustomEvent(EventName$6.ON_REMOVE, {
	      bubbles: true
	    });
	    this.control.dispatchEvent(this[EventName$6.ON_REMOVE]);
	  }
	}
	class ShowMoreShowLessSingleElement extends ShowMoreShowLessBase {
	  /**
	   * Create a single-element variant, inherits from ShowMoreShowLessBase.
	   *  @param {Object} opts - The show-more-show-less options.
	   */
	  constructor(opts) {
	    super(opts);

	    /**
	     * The content that will be shown/hidden.
	     */
	    this.toggleableContent = this.el.querySelector(Selector$6.TOGGLEABLE_CONTENT);
	    this.events.push({
	      el: this.toggleableContent,
	      type: 'focusout',
	      handler: _toggleableContentOnFocusOut.bind(null, this.toggleableContent)
	    });
	    Util.addEvents(this.events);
	    this.toggleableContent.setAttribute('tabindex', -1);
	    this.toggleableContent.classList.add(ClassName$3.DISPLAY_NONE);
	    if (this.disableHide) {
	      // NVDA does not properly focus when "show more" button is hidden,
	      // so aria-live ensures the shown content is discovered
	      this.toggleableContent.setAttribute('aria-live', 'polite');
	      // explicitly for Firefox to properly acknowledge aria-live
	      this.toggleableContent.setAttribute('aria-atomic', 'false');
	    }
	  }

	  /**
	   * Show toggleable content.
	   */
	  show() {
	    super.show();
	    this.toggleableContent.classList.remove(ClassName$3.DISPLAY_NONE);
	    super.setFocusToElement(this.toggleableContent);

	    // this should happen *after* focus is set to the hidden content
	    // so focus is not lost when the button is hidden
	    if (this.disableHide) {
	      this.control.classList.add(ClassName$3.DISPLAY_NONE);
	    }
	  }

	  /**
	   * Hide toggleable content.
	   */
	  hide() {
	    // match UI behavior to prevent hiding content when "show more only"
	    if (this.disableHide) {
	      return;
	    }
	    super.hide();
	    this.toggleableContent.classList.add(ClassName$3.DISPLAY_NONE);
	  }

	  /**
	   * Updates component element if content changes dynamically.
	   * @param {Object} opts The options defined for the updated component.
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    const _self = opts._self || this;
	    if (_self.toggleableContent.innerHTML) {
	      _self.control.classList.remove(ClassName$3.DISPLAY_NONE);
	      _self.hide();
	    } else {
	      _self.control.classList.add(ClassName$3.DISPLAY_NONE);
	      _self.ellipsis.classList.add(ClassName$3.DISPLAY_NONE);
	    }

	    // Create and dispatch custom event
	    _self[EventName$6.ON_UPDATE] = new CustomEvent(EventName$6.ON_UPDATE, {
	      bubbles: true
	    });
	    _self.el.dispatchEvent(_self[EventName$6.ON_UPDATE]);
	  }
	}
	class ShowMoreShowLessMultiElement extends ShowMoreShowLessBase {
	  /**
	   * Create a multi-element variant, inherits from ShowMoreShowLessBase.
	   * @param {Object} opts - The show-more-show-less options.
	   * @param {HTMLElement} opts.el - The container element for content that will be hidden/shown.
	   * @param {Number} [opts.hideAfter] - The index of the element in the multi-element variant after which elements will be toggleable.
	   * @param {string} [opts.showMoreText] - Optional text to display for showMoreText value.
	   * @param {string} [opts.showLessText] - Optional text to display for showLessText value.
	   * @param {string} [opts.showLessAriaLabel] - Optional text to display for showLessAriaLabel value.
	   */
	  constructor(opts) {
	    super(opts);
	    this.hideAfter = opts.hideAfter || null;
	    this.setChildren();
	    const focusOuttarget = this.toggleableContent[0];
	    this.events.push({
	      el: this.toggleableContent[0],
	      type: 'focusout',
	      handler: _toggleableContentOnFocusOut.bind(null, focusOuttarget)
	    });
	    Util.addEvents(this.events);

	    // Set attributes on html elements
	    // Tabindex set to -1 so content can be focused when shown.
	    this.toggleableContent[0].setAttribute('tabindex', -1);

	    // Set default state to hidden.
	    this.toggleableContent.forEach(node => {
	      node.classList.add(ClassName$3.DISPLAY_NONE);
	    });

	    // Add mutation observers.
	    this.childObserver = new MutationObserver(() => {
	      this.update({
	        _self: this
	      });
	    });
	    this.childObserver.observe(this.el.querySelector(Selector$6.TOGGLEABLE_CONTENT), {
	      childList: true,
	      subtree: true
	    });
	  }

	  /**
	   * Define visible and non-visible children in toggleable content based on data-count attribute passed to constructor.
	   */
	  setChildren() {
	    this.visibleContent = this.el.querySelectorAll(Selector$6.TOGGLEABLE_CONTENT + ' > :nth-child(-n+' + (this.hideAfter - 1) + ')');
	    this.toggleableContent = this.el.querySelectorAll(Selector$6.TOGGLEABLE_CONTENT + ' > :nth-child(n+' + this.hideAfter + ')');
	  }

	  /**
	   * Show toggleable child elements.
	   */
	  show() {
	    super.show();
	    this.toggleableContent.forEach(node => {
	      node.classList.remove(ClassName$3.DISPLAY_NONE);
	    });
	    if (this.toggleableContent) {
	      super.setFocusToElement(this.toggleableContent[0]);
	    }
	  }

	  /**
	   * Hide toggleable child elements.
	   */
	  hide() {
	    super.hide();
	    if (this.toggleableContent.length > 0) {
	      this.toggleableContent.forEach(node => {
	        node.classList.add(ClassName$3.DISPLAY_NONE);
	      });
	      this.toggleableContent[0].setAttribute('tabindex', -1);
	    }
	  }

	  /**
	   * Updates the visible and nonvisible children if elements are added/removed dynamically.
	   * @param {Object} opts the options for the updated component.
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    const _self = opts._self || this;
	    _self.setChildren();
	    _self.visibleContent.forEach(node => {
	      if (node.classList.contains(ClassName$3.DISPLAY_NONE)) {
	        node.classList.remove(ClassName$3.DISPLAY_NONE);
	      }
	      if (node.hasAttribute('tabindex')) {
	        node.removeAttribute('tabindex');
	      }
	    });
	    if (_self.toggleableContent.length > 0) {
	      _self.hide();
	    }
	    if (_self.toggleableContent.length > 1) {
	      let hasTabIndex = false;
	      _self.toggleableContent.forEach(node => {
	        if (hasTabIndex) {
	          node.removeAttribute('tabindex');
	        }
	        if (node.hasAttribute('tabindex')) {
	          hasTabIndex = true;
	        }
	      });
	    }
	    if (_self.toggleableContent.length === 0 && !_self.el.classList.contains(ClassName$3.DISPLAY_NONE)) {
	      _self.el.classList.add(ClassName$3.DISPLAY_NONE);
	    }
	    if (_self.toggleableContent.length > 0 && _self.el.classList.contains(ClassName$3.DISPLAY_NONE)) {
	      _self.el.classList.remove(ClassName$3.DISPLAY_NONE);
	    }

	    // Create and dispatch custom event
	    _self[EventName$6.ON_UPDATE] = new CustomEvent(EventName$6.ON_UPDATE, {
	      bubbles: true
	    });
	    _self.el.dispatchEvent(_self[EventName$6.ON_UPDATE]);
	  }

	  /**
	   * Remove instance of ShowMoreShowLess.
	   */

	  remove() {
	    super.remove();
	    this.childObserver.disconnect();
	  }
	}

	const EventName$5 = {
	  CHANGE: 'change',
	  KEYUP: 'keyup',
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate'
	};
	const Selector$5 = {
	  DATA_MOUNT: '[data-mount="switch"]',
	  SWITCH_INPUT: '.custom-switch-input'
	};
	const instances = [];
	var _init$1 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
	var _handleKeyPress = /*#__PURE__*/_classPrivateFieldLooseKey("handleKeyPress");
	class Switch {
	  /**
	   * Create a Switch instance
	   * @param {Object} opts - the Switch options
	   * @param {HTMLElement} opts.el - the Switch container element
	   */
	  constructor(_ref) {
	    let {
	      el
	    } = _ref;
	    Object.defineProperty(this, _handleKeyPress, {
	      value: _handleKeyPress2
	    });
	    Object.defineProperty(this, _init$1, {
	      value: _init2$1
	    });
	    this.el = el;
	    this.switchEl = this.el ? this.el.querySelector(Selector$5.SWITCH_INPUT) : null;
	    this.events = [];
	    if (this.el && this.switchEl) {
	      _classPrivateFieldLooseBase(this, _init$1)[_init$1]();
	    }
	    instances.push(this);
	  }
	  /**
	   * Update instance. Added for API consistency
	   */
	  update() {
	    // Create and dispatch custom event
	    this[EventName$5.ON_UPDATE] = new CustomEvent(EventName$5.ON_UPDATE, {
	      bubbles: true
	    });
	    if (this.el) this.el.dispatchEvent(this[EventName$5.ON_UPDATE]);
	  }

	  /**
	   * Remove the instance
	   */
	  remove() {
	    Util.removeEvents(this.events);
	    const index = instances.indexOf(this);
	    instances.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$5.ON_REMOVE] = new CustomEvent(EventName$5.ON_REMOVE, {
	      bubbles: true
	    });
	    if (this.el) this.el.dispatchEvent(this[EventName$5.ON_REMOVE]);
	  }

	  /**
	   * Get Switch instances.
	   * @returns {Object[]} An array of Switch instances
	   */
	  static getInstances() {
	    return instances;
	  }
	}
	function _init2$1() {
	  const switchEventHandlers = [{
	    el: this.switchEl,
	    type: EventName$5.KEYUP,
	    handler: _classPrivateFieldLooseBase(this, _handleKeyPress)[_handleKeyPress].bind(this)
	  }];
	  this.events.push(...switchEventHandlers);
	  Util.addEvents(switchEventHandlers);
	}
	function _handleKeyPress2(event) {
	  if (event.keyCode === Util.keyCodes.ENTER) {
	    event.preventDefault();
	    this.switchEl?.click();
	  }
	}

	const tabs = [];
	const EventName$4 = {
	  HIDE: 'onHide',
	  HIDDEN: 'onHidden',
	  SHOW: 'onShow',
	  SHOWN: 'onShown',
	  CLICK_DATA_API: 'click',
	  KEYDOWN_DATA_API: 'keydown',
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate',
	  POP_STATE: 'popstate'
	};
	const Attribute$1 = {
	  HIDDEN: 'hidden'
	};
	const ClassName$2 = {
	  DROPDOWN_MENU: 'dropdown-menu',
	  ACTIVE: 'active',
	  DISABLED: 'disabled',
	  FADE: 'fade',
	  SHOW: 'show'
	};
	const Selector$4 = {
	  NAV_LIST_GROUP: '.nav, .list-group, .tab-group',
	  ACTIVE: '.active',
	  ACTIVE_UL: 'li .active',
	  DATA_MOUNT: '[data-mount="tab"]',
	  BACK_TO_TABS: '[data-focus="back-to-tabs"]',
	  ROLE_TAB: '[role="tab"]',
	  TAB_CONTENT: '.tab-content, .tab-panel-group'
	};

	// Private

	/**
	 * Activate tab.
	 * @param {HTMLElement} element - Tab element.
	 * @param {HTMLElement} container - Tab container element.
	 * @param {Function} callback - Function to run after transition ends.
	 * @this Tab
	 */
	function _activate(element, container, callback) {
	  let activeElements;
	  if (container && (container.nodeName === 'UL' || container.nodeName === 'OL')) {
	    activeElements = container.querySelector(Selector$4.ACTIVE_UL);
	  } else {
	    // make sure that any selected tab panel .active element is a direct descendant of the tab panel container
	    activeElements = [].slice.call(container.children).filter(e => e.classList.contains(ClassName$2.ACTIVE));
	  }
	  const active = activeElements[0];
	  const isTransitioning = callback && active && active.classList.contains(ClassName$2.FADE);
	  const complete = () => _transitionComplete.call(this, element, active, callback);
	  if (active && isTransitioning) {
	    const transitionDuration = Util.getTransitionDurationFromElement(active);
	    active.classList.remove(ClassName$2.SHOW);
	    active.addEventListener(Util.TRANSITION_END, complete, {
	      once: true
	    });
	    Util.emulateTransitionEnd(active, transitionDuration);
	  } else {
	    complete();
	  }
	}

	/**
	 * Callback for completed tab transitions.
	 * @param {HTMLElement} element - Newly selected tab element.
	 * @param {HTMLElement} active - Previously active tab element.
	 * @param {Function} callback - Function to run after transition ends.
	 * @this Tab
	 */
	function _transitionComplete(element, active, callback) {
	  if (active) {
	    active.classList.remove(ClassName$2.ACTIVE);
	    if (active.getAttribute('role') === 'tab') {
	      active.setAttribute('aria-selected', 'false');
	      active.setAttribute('tabindex', '-1');
	    } else if (active.getAttribute('role') === 'tabpanel') {
	      active.hidden = true;
	    }
	  }
	  element.classList.add(ClassName$2.ACTIVE);
	  if (element.getAttribute('role') === 'tab') {
	    element.setAttribute('aria-selected', 'true');
	    element.setAttribute('tabindex', '0');
	  } else if (element.getAttribute('role') === 'tabpanel') {
	    element.removeAttribute(Attribute$1.HIDDEN);

	    // Scroll back to top of panel if necessary
	    const activePanelTop = element.getBoundingClientRect().top;
	    const documentElementNode = document.documentElement;
	    let documentScrollPaddingTop = 0;
	    if (documentElementNode.style.scrollPaddingTop) {
	      documentScrollPaddingTop = parseInt(documentElementNode.style.scrollPaddingTop, 10);
	    }
	    if (activePanelTop < 0) {
	      const scrollOffset = activePanelTop - documentElementNode.getBoundingClientRect().top - documentScrollPaddingTop;
	      window.scrollTo(0, scrollOffset);
	    }
	    if (this.backToTabs && this.backToTabs instanceof HTMLAnchorElement) {
	      this.backToTabs.focusControls?.remove();
	      this.backToTabs.href = `#${element.id}-tab`;
	      this.backToTabs.focusControls = new Util.FocusControls({
	        el: this.backToTabs
	      });
	    }
	  }
	  Util.reflow(element);
	  if (element.classList.contains(ClassName$2.FADE)) {
	    element.classList.add(ClassName$2.SHOW);
	  }
	  if (callback) {
	    callback();
	  }
	}

	/**
	 * Callback function for all key events on tabs.
	 * Facilitates left <-> right focus movement between tabs recommended by W3C: https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html
	 * @param {KeyboardEvent} event - Keyboard event.
	 * @this Tab
	 */
	function _onKeycodeEvent(event) {
	  const keycode = Util.getKeyCode(event);
	  switch (keycode) {
	    case Util.keyCodes.SPACE:
	    case Util.keyCodes.ENTER:
	      {
	        event.preventDefault();
	        this.show(event);
	        break;
	      }
	    case Util.keyCodes.HOME:
	      {
	        event.preventDefault();
	        this.listNodeList[0].focus();
	        break;
	      }
	    case Util.keyCodes.END:
	      {
	        event.preventDefault();
	        this.listNodeList[this.listNodeList.length - 1].focus();
	        break;
	      }
	    case Util.keyCodes.ARROW_LEFT:
	      {
	        // stop default "scroll" behavior in overflowed containers
	        event.preventDefault();
	        if (this.isRTL) {
	          _onKeycodeRight.call(this);
	        } else {
	          _onKeycodeLeft.call(this);
	        }
	        break;
	      }
	    case Util.keyCodes.ARROW_RIGHT:
	      {
	        // stop default "scroll" behavior in overflowed containers
	        event.preventDefault();
	        if (this.isRTL) {
	          _onKeycodeLeft.call(this);
	        } else {
	          _onKeycodeRight.call(this);
	        }
	        break;
	      }
	  }
	}

	/**
	 * Callback function for arrow-left key.
	 * @this Tab
	 */
	function _onKeycodeLeft() {
	  const lastTab = this.listNodeList[this.listNodeList.length - 1];
	  const previousTab = this.listNodeList[this.tabIndex - 1];
	  if (this.tabIndex === 0) {
	    return lastTab.focus();
	  }
	  return previousTab.focus();
	}

	/**
	 * Callback function for arrow-right key.
	 * @this Tab
	 */
	function _onKeycodeRight() {
	  const firstTab = this.listNodeList[0];
	  const nextTab = this.listNodeList[this.tabIndex + 1];
	  if (this.tabIndex === this.listNodeList.length - 1) {
	    return firstTab.focus();
	  }
	  return nextTab.focus();
	}
	function _onPopState() {
	  const {
	    hash
	  } = window.location;

	  // Check if hash matches the id of the tab panel or a tab panel child and show.
	  // If no hash assume the default Tab panel should be shown.
	  if (hash) {
	    if (hash === `#${this.tabPanel.id}`) {
	      this.show();
	      this.el.scrollIntoView(true);
	    } else {
	      const tabPanelChild = this.tabPanel.querySelector(`[id="${hash.slice(1)}"]`);
	      if (tabPanelChild) {
	        this.show();
	        this.tabContent.addEventListener(Util.TRANSITION_END, () => {
	          tabPanelChild.scrollIntoView(true);
	        }, {
	          once: true
	        });
	      }
	    }
	  } else if (this.tabIndex === this.defaultTabIndex) {
	    this.show();
	  }
	}
	class Tab {
	  /**
	   * Create a Tab instance
	   * @param {Object} opts - Tab options.
	   * @param {HTMLElement} opts.el - Tab element.
	   * @param {Boolean} [opts.addUrlToHistory=false] - Use pushState instead of replaceState, defaults to false.
	   * @param {Number} [opts.defaultTabIndex=0] - Index of default tab in list group. Defaults to first tab with class active or 0.
	   */
	  constructor(_ref) {
	    let {
	      el,
	      addUrlToHistory = false,
	      defaultTabIndex = 0
	    } = _ref;
	    this.el = el;
	    this.listGroup = this.el.closest(Selector$4.NAV_LIST_GROUP);
	    this.targetSelector = Util.getSelectorFromElement(this.el);
	    this.tabPanel = document.querySelector(this.targetSelector);
	    this.tabContent = this.tabPanel.closest(Selector$4.TAB_CONTENT);
	    this.isRTL = document.dir === 'rtl';
	    this.backToTabs = [...Array.from(this.tabContent.children),
	    // tab-panel-group children OR
	    ...Array.from(this.tabContent.parentNode.children) // tab-panel-group siblings (backwards-compatible w/ old markup)
	    ].find(el => el.dataset.focus === 'back-to-tabs');

	    // set back to tab href to active tab's id
	    if (this.el.classList.contains(ClassName$2.ACTIVE) && this.backToTabs && this.backToTabs instanceof HTMLAnchorElement) {
	      this.backToTabs.href = `#${this.el.id}`;
	      this.backToTabs.focusControls = new Util.FocusControls({
	        el: this.backToTabs
	      });
	    }

	    // prevents error if tab is not within a list group
	    if (this.listGroup) {
	      this.listNodeList = this.listGroup.querySelectorAll(Selector$4.ROLE_TAB) || [];
	      this.nodeListArray = [].slice.call(this.listNodeList);
	      this.tabIndex = this.nodeListArray.indexOf(this.el);
	      this.addUrlToHistory = addUrlToHistory || this.listGroup.dataset.addUrlToHistory !== undefined;
	      const activeTab = this.listGroup.querySelector(Selector$4.ACTIVE);
	      const activeIndex = this.nodeListArray.indexOf(activeTab) > -1 ? this.nodeListArray.indexOf(activeTab) : null;
	      this.defaultTabIndex = defaultTabIndex || activeIndex || 0;
	    }

	    // enable deep linking
	    _onPopState.call(this);

	    // attach event listeners
	    this.events = [{
	      el: this.el,
	      type: EventName$4.CLICK_DATA_API,
	      handler: this.show.bind(this)
	    }, {
	      el: this.el,
	      type: EventName$4.KEYDOWN_DATA_API,
	      handler: _onKeycodeEvent.bind(this)
	    }, {
	      el: window,
	      type: EventName$4.POP_STATE,
	      handler: _onPopState.bind(this)
	    }];

	    // add event listeners
	    Util.addEvents(this.events);
	    tabs.push(this);
	  }

	  // Public

	  /**
	   * Shows a tab panel based on the tab clicked and hides other panels.
	   * @param {Event} [event] - Event trigger.
	   * @this Tab
	   */
	  show(event) {
	    if (event) {
	      event.preventDefault();
	    }
	    const hasParentEl = this.el.parentNode && this.el.parentNode.nodeType === Node.ELEMENT_NODE;
	    const isActive = this.el.classList.contains(ClassName$2.ACTIVE);
	    const isDisabled = this.el.classList.contains(ClassName$2.DISABLED);
	    if (hasParentEl && isActive || isDisabled) {
	      return;
	    }
	    const target = this.tabPanel;
	    let previous;
	    const listElement = this.listGroup || this.el.closest(Selector$4.NAV_LIST_GROUP);
	    if (listElement) {
	      const isList = listElement.nodeName === 'UL' || listElement.nodeName === 'OL';
	      const itemSelector = isList ? Selector$4.ACTIVE_UL : Selector$4.ACTIVE;
	      previous = this.el.parentNode.querySelector(itemSelector);
	    }
	    const hideEvent = new CustomEvent(EventName$4.HIDE, {
	      detail: {
	        relatedTarget: this.el
	      }
	    });
	    const showEvent = new CustomEvent(EventName$4.SHOW, {
	      detail: {
	        relatedTarget: previous
	      }
	    });
	    if (previous) {
	      previous.dispatchEvent(hideEvent);
	    }
	    this.el.dispatchEvent(showEvent);
	    if (showEvent.defaultPrevented || hideEvent.defaultPrevented) {
	      return;
	    }
	    _activate.call(this, this.el, listElement);
	    const complete = () => {
	      const hiddenEvent = new CustomEvent(EventName$4.HIDDEN, {
	        detail: {
	          relatedTarget: this.el
	        }
	      });
	      const shownEvent = new CustomEvent(EventName$4.SHOWN, {
	        detail: {
	          relatedTarget: previous
	        }
	      });
	      if (previous) {
	        previous.dispatchEvent(hiddenEvent);
	      }
	      this.el.dispatchEvent(shownEvent);
	      const {
	        hash
	      } = window.location;
	      const url = `#${this.tabPanel.id}`;
	      const {
	        title
	      } = document;
	      const {
	        state
	      } = window.history;
	      const noHashAndNotOnDefaultTab = !hash && this.tabIndex !== this.defaultTabIndex;
	      const notChild = hash && !this.tabPanel.querySelector(hash);
	      const notSelf = hash !== url;
	      if (noHashAndNotOnDefaultTab || notChild && notSelf) {
	        if (this.addUrlToHistory) {
	          window.history.pushState(state, title, url);
	        } else {
	          window.history.replaceState(state, title, url);
	        }
	      }
	    };
	    if (target) {
	      _activate.call(this, target, target.parentNode, complete);
	    } else {
	      complete();
	    }
	  }

	  /**
	   * Remove event handlers.
	   * @this Tab
	   */
	  remove() {
	    Util.removeEvents(this.events);

	    // remove this reference from array of instances
	    const index = tabs.indexOf(this);
	    tabs.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$4.ON_REMOVE] = new CustomEvent(EventName$4.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$4.ON_REMOVE]);
	  }

	  /**
	   * Update Tab
	   * @param {Object} [opts] - Tab options.
	   * @param {Boolean} [opts.addUrlToHistory] Use pushState instead of replaceState.
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    if (typeof opts.addUrlToHistory === 'boolean') {
	      this.addUrlToHistory = opts.addUrlToHistory;
	    }

	    // Create and dispatch custom event
	    this[EventName$4.ON_UPDATE] = new CustomEvent(EventName$4.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$4.ON_UPDATE]);
	  }

	  /**
	   * Get instances.
	   * @returns {Tab[]} Array of tab instances.
	   */
	  static getInstances() {
	    return tabs;
	  }
	}

	const tabSliders = [];
	const EventName$3 = {
	  CLICK_DATA_API: 'click',
	  RESIZE_DATA_API: 'resize',
	  FOCUS_DATA_API: 'focus',
	  SCROLL_DATA_API: 'scroll',
	  ON_SCROLL: 'onScroll',
	  ON_REMOVE: 'onRemove',
	  ON_UPDATE: 'onUpdate'
	};
	const Direction = {
	  LEFT: 'left',
	  RIGHT: 'right'
	};
	const ClassName$1 = {
	  ACTIVE: 'active',
	  ARROWS: 'tab-arrows',
	  ARROW_PREV: 'arrow-prev',
	  ARROW_NEXT: 'arrow-next',
	  TAB_OVERFLOW: 'tab-overflow',
	  TAB_WINDOW: 'tab-window',
	  TAB_GROUP: 'tab-group',
	  JUSTIFY_CENTER: 'justify-content-center',
	  MOBILE_ARROWS: 'mobile-arrows',
	  IMAGE_TAB: 'tab-image',
	  IMAGE_TAB_LABEL: 'tab-image-label'
	};
	const Selector$3 = {
	  ACTIVE: `.${ClassName$1.ACTIVE}`,
	  ARROWS: `.${ClassName$1.ARROWS}`,
	  ARROW_PREV: `.${ClassName$1.ARROW_PREV}`,
	  ARROW_NEXT: `.${ClassName$1.ARROW_NEXT}`,
	  TAB_OVERFLOW: `.${ClassName$1.TAB_OVERFLOW}`,
	  TAB_WINDOW: `.${ClassName$1.TAB_WINDOW}`,
	  TAB_GROUP: `.${ClassName$1.TAB_GROUP}`,
	  DATA_MOUNT: '[data-mount="tab-slider"]',
	  IMAGE_TAB: `.${ClassName$1.IMAGE_TAB}`,
	  IMAGE_TAB_LABEL: `.${ClassName$1.IMAGE_TAB_LABEL}`
	};
	const Attribute = {
	  DATA_DISABLE_SCROLL_INTO_VIEW: 'data-disable-scroll-into-view'
	};
	const SCROLL_INTO_VIEW_OPTIONS = {
	  inline: 'center',
	  block: 'nearest',
	  behavior: Util.prefersReducedMotion() ? 'auto' : 'smooth'
	};
	const DELAY_MS = 100;

	/**
	 * Private functions.
	 */

	/**
	 * Helper function to check if single tab element is within tab window.
	 * @param {HTMLElement} tab - Single tab element.
	 * @param {HTMLElement} tabListWindow - Tab window.
	 * @return {boolean} Returns true if the tab element is visible within the tab window.
	 */
	function _inTabWindow(tab, tabListWindow) {
	  const tabBounds = tab.getBoundingClientRect();
	  const tabListWindowBounds = tabListWindow.getBoundingClientRect();
	  return Math.ceil(tabBounds.left) >= Math.ceil(tabListWindowBounds.left) && Math.ceil(tabBounds.right) < Math.ceil(tabListWindowBounds.right);
	}

	/**
	 * Hide and/or show arrows dependent on visible tabs.
	 * @this TabSlider
	 */
	function _showHideArrow() {
	  const tabListWindow = this.el;
	  const scrollLeftVal = this.scrollElement.scrollLeft;
	  const arrowTarget1 = this.isRTL ? this.arrowNext : this.arrowPrev;
	  const arrowTarget2 = this.isRTL ? this.arrowPrev : this.arrowNext;

	  // for image tabs, match arrows height to image height
	  const imageTab = tabListWindow.querySelector(Selector$3.IMAGE_TAB); // only need one; all are same height w/ flex styles
	  if (imageTab) {
	    imagesloadedExports(tabListWindow, () => {
	      const arrowTargetHeight = imageTab.offsetHeight - (imageTab.querySelector(Selector$3.IMAGE_TAB_LABEL).offsetHeight - 1 || 0); // Added (- 1) to the calculation to count for the Image Underline variant height
	      arrowTarget1.style.height = `${arrowTargetHeight}px`;
	      arrowTarget2.style.height = `${arrowTargetHeight}px`;
	    });
	  }
	  if (_inTabWindow(this.tabListItems[0], tabListWindow) || !this.isRTL && scrollLeftVal === 0) {
	    arrowTarget1.style.display = 'none';
	    arrowTarget2.style.display = 'block';
	  } else if (_inTabWindow(this.tabListItems[this.tabListItems.length - 1], tabListWindow)) {
	    arrowTarget1.style.display = 'block';
	    arrowTarget2.style.display = 'none';
	  } else {
	    this.arrowNext.style.display = 'block';
	    this.arrowPrev.style.display = 'block';
	  }
	}

	/**
	 * Keep focus on clicked arrow when slider moves.
	 * @this TabSlider
	 */
	function _onArrowFocus() {
	  const arrowTarget1 = this.isRTL ? this.arrowNext : this.arrowPrev;
	  const arrowTarget2 = this.isRTL ? this.arrowPrev : this.arrowNext;
	  if (this.arrowDirection === Direction.LEFT) {
	    if (arrowTarget1.style.display === 'block') {
	      arrowTarget1.focus();
	    } else {
	      arrowTarget2.focus();
	    }
	  } else if (this.arrowDirection === Direction.RIGHT) {
	    if (arrowTarget2.style.display === 'block') {
	      arrowTarget2.focus();
	    } else {
	      arrowTarget1.focus();
	    }
	  }
	}

	/**
	 * Event trigger on click to move the slide left or right depending on which arrow has been clicked.
	 * @param {Event} event - DOM event.
	 * @this TabSlider
	 */
	function _onArrowClick(event) {
	  event.preventDefault();
	  this.isArrowClicked = true;
	  _updateTabWindowWidth.call(this);

	  // check for which arrow has been clicked
	  if (event.target.matches(Selector$3.ARROW_NEXT)) {
	    this.arrowDirection = this.isRTL ? Direction.LEFT : Direction.RIGHT;
	  } else {
	    this.arrowDirection = this.isRTL ? Direction.RIGHT : Direction.LEFT;
	  }
	  const slideToTarget = _getSlideToTarget.call(this);
	  if (!slideToTarget) {
	    return;
	  }
	  _setScrollLeft.call(this, slideToTarget);
	}

	/**
	 * Set left position of tab window to left position of target element.
	 * @param {HTMLElement} slideToTarget - Target element for position alignment.
	 * @this TabSlider
	 */
	function _setScrollLeft(slideToTarget) {
	  const arrowPadding = parseInt(getComputedStyle(this.arrowPrev).paddingLeft, 10) || parseInt(getComputedStyle(this.arrowNext).paddingLeft, 10);
	  const scrollElementLeft = Math.floor(this.scrollElement.scrollLeft);
	  const slideToTargetVal = Math.floor(_getBoundingRectValue.call(this, slideToTarget, 'left'));
	  const scrollElementVal = Math.floor(_getBoundingRectValue.call(this, this.scrollElement, 'left'));
	  let scrollAmount;
	  if (this.isRTL) {
	    if (this.arrowDirection === Direction.LEFT) {
	      scrollAmount = scrollElementLeft + slideToTargetVal + scrollElementVal + arrowPadding;
	    } else {
	      scrollAmount = scrollElementLeft - slideToTargetVal - scrollElementVal + arrowPadding;
	    }
	  } else {
	    scrollAmount = scrollElementLeft + slideToTargetVal - scrollElementVal - arrowPadding;
	  }
	  try {
	    this.scrollElement.scrollTo({
	      left: scrollAmount,
	      behavior: Util.prefersReducedMotion() ? 'auto' : 'smooth'
	    });
	  } catch {
	    this.scrollElement.scrollLeft = scrollAmount;
	  }
	}

	/**
	 * Get tab element for scroll target positioning.
	 * @return {Element|undefined} - element for which to set left position
	 * @this TabSlider
	 */
	function _getSlideToTarget() {
	  let tabTarget;
	  let i;
	  let widthRemaining;
	  let tabBounds;
	  const tabListWindowBounds = this.el.getBoundingClientRect();
	  if (this.arrowDirection === Direction.RIGHT) {
	    i = this.tabListItems.length;

	    /**
	     * Start at right most tab and decrement until
	     * the first tab not in the tab window is found
	     * */
	    while (i--) {
	      tabBounds = this.tabListItems[i].getBoundingClientRect();

	      // break if last tab is within tab window
	      if (i === this.tabListItems.length - 1 && _inTabWindow(this.tabListItems[i], this.el)) {
	        break;
	      }

	      // update to track the left most tab within the tab window
	      if (_getBoundingRectValue.call(this, this.tabListItems[i], 'right') >= _getBoundingRectValue.call(this, this.el, 'right')) {
	        tabTarget = this.tabListItems[i];

	        // update left most tab shown in tab window
	        this.tabSlideTarget.el = tabTarget;
	        this.tabSlideTarget.index = i;
	      } else {
	        break;
	      }
	    }
	  } else {
	    /**
	     * Start at left most tab in tab window, decrement and find
	     * out how many tabs can fit within the tab window.
	     * */
	    i = this.tabSlideTarget.index;
	    widthRemaining = tabListWindowBounds.width;
	    if (i === -1) {
	      return;
	    }
	    while (i-- && widthRemaining >= 0) {
	      tabBounds = this.tabListItems[i].getBoundingClientRect();
	      // break if first tab is within tab window
	      if (i === 0 && _inTabWindow(this.tabListItems[i], this.el)) {
	        break;
	      }
	      widthRemaining -= tabBounds.width; // subtract tab width from tab window
	      tabTarget = this.tabListItems[i];

	      // update left most tab shown in tab window
	      this.tabSlideTarget.el = tabTarget;
	      this.tabSlideTarget.index = i;

	      // break if the tab before this tab element creates a negative value
	      if (this.tabListItems[i - 1] && widthRemaining - this.tabListItems[i - 1].getBoundingClientRect().width < 0) {
	        break;
	      }
	    }
	  }
	  return tabTarget;
	}

	/**
	 * Window resize handler (also runs on instantiation).
	 * Sets container width, shows/hides arrows depending on visible tabs, and resets
	 * styles when slider is not needed.
	 * @this TabSlider
	 */
	function _onWindowResize() {
	  // width of tab container - left/right padding
	  const tabContainerWidth = this.el.offsetWidth - parseInt(getComputedStyle(this.el).paddingLeft, 10) * 2;
	  const arrowsStyleDisplay = getComputedStyle(this.arrows).display;

	  // recalculate if tabs have changed widths from media queries, etc
	  _updateTabWindowWidth.call(this);

	  // don't do anything if container is large enough to hold tabs
	  if (tabContainerWidth >= this.tabListWidth) {
	    if (arrowsStyleDisplay === 'block' || this.tabWindow.style.width) {
	      this.arrows.style.display = 'none';
	      this.tabWindow.style.width = '';
	    }

	    // add justify center class if it existed
	    if (this.tabContentCentered) {
	      this.tabGroup.classList.add(ClassName$1.JUSTIFY_CENTER);
	    }
	    return;
	  }

	  // else: set container overflow for tabs
	  this.tabWindow.style.width = this.tabListWidth + 'px';

	  // align tabs to the left when arrows appear
	  if (this.tabContentCentered) {
	    this.tabGroup.classList.remove(ClassName$1.JUSTIFY_CENTER);
	  }

	  // update tab list and last tab bounds
	  this.tabListItems = this.el.querySelectorAll(Selector$4.ROLE_TAB);
	  this.lastTabBounds = this.tabListItems[this.tabListItems.length - 1].getBoundingClientRect();

	  // show arrows when the right most tab is out of bounds of the container by 40px (arrow width)
	  const lastTabBoundsRightVal = _getBoundingRectValue.call(this, this.tabListItems[this.tabListItems.length - 1], 'right');
	  const tabMountBoundsRightVal = _getBoundingRectValue.call(this, this.el, 'right');
	  if (arrowsStyleDisplay === 'none' && tabMountBoundsRightVal - this.arrowOffsetWidth <= lastTabBoundsRightVal - this.arrowOffsetWidth) {
	    this.arrows.style.display = 'block';
	  }

	  // hide arrows before shifting left position
	  _showHideArrow.call(this);
	}

	/**
	 * Focus event handler to capture selected tab and its index for positioning.
	 * @param {Event} event - DOM focus event.
	 * @this TabSlider
	 */
	function _onFocus$1(_ref) {
	  let {
	    target
	  } = _ref;
	  const focusedTab = target;
	  if (focusedTab.matches(Selector$4.ROLE_TAB)) {
	    focusedTab.scrollIntoView(SCROLL_INTO_VIEW_OPTIONS);

	    // store left-most tab shown in tab window
	    this.tabSlideTarget.el = focusedTab;
	    this.tabSlideTarget.index = [].slice.call(this.tabListItems).indexOf(focusedTab);
	  }
	}

	/**
	 * Event handler to scroll tab into view (can be prevented with option).
	 * @param {HTMLElement} tab - The selected tab element.
	 * @param {boolean} scrollIntoView - Whether to scroll element into view.
	 */
	function _onShow(tab, scrollIntoView) {
	  if (scrollIntoView) {
	    tab.scrollIntoView(SCROLL_INTO_VIEW_OPTIONS);
	  }
	}

	/**
	 * Scroll callback to move slider if triggered by keyboard events: left/right, tab/shift+tab.
	 * @this TabSlider
	 */
	function _onScroll() {
	  _showHideArrow.call(this);

	  // focus on the arrow only if an arrow was clicked (prevents keyboard presses from activating arrow focus)
	  if (this.arrowDirection && (document.activeElement === this.arrowNext || document.activeElement === this.arrowPrev)) {
	    _onArrowFocus.call(this);
	  }

	  // prevent scroll event from doing additional variable updates
	  if (this.isArrowClicked) {
	    this.isArrowClicked = false;
	    return;
	  }

	  // store left-most tab shown in tab window
	  for (let i = this.tabSlideTarget.index; i < this.tabListItems.length; i++) {
	    if (this.tabListItems[i].getBoundingClientRect().left > 0) {
	      this.tabSlideTarget.el = this.tabListItems[i];
	      this.tabSlideTarget.index = i;
	      break;
	    }
	  }
	}

	/**
	 * Accurately calculate all elements that make up the tab width.
	 * @param {HTMLElement} tab - tab element
	 * @return {number} tab width value
	 */
	function _getTabWidth(tab) {
	  let {
	    marginLeft,
	    marginRight
	  } = getComputedStyle(tab);
	  marginLeft = Math.abs(parseInt(marginLeft, 10)) || 0;
	  marginRight = Math.abs(parseInt(marginRight, 10)) || 0;
	  return tab.offsetWidth +
	  // includes borders
	  marginLeft + marginRight;
	}

	/**
	 * Update tab window width.
	 * On page load, whitespace buffer is created to account for tab widths when letter-spacing increases,
	 * but tab window should be readjusted to remove whitespace.
	 * @this TabSlider
	 */
	function _updateTabWindowWidth() {
	  this.tabListWidth = 0;
	  this.tabListItems.forEach(tab => {
	    this.tabListWidth += _getTabWidth(tab);
	  });
	  this.tabListWidth += 2 * 3; // account for outer VFIs

	  // do not reset style on first load
	  if (!this.isTabWindowWidthAdjusted && this.tabWindow.style.width) {
	    this.tabWindow.style.width = this.tabListWidth + 'px';
	    this.isTabWindowWidthAdjusted = true;
	  }
	}

	/**
	 * Get left (LTR) or right (RTL) rectangle bounding value.
	 * @param {HTMLElement} tab - tab element
	 * @param {('left'|'right')} side - side on which to calculate position.
	 * @return {number} - left or right bounding value of element.
	 */
	function _getBoundingRectValue(tab, side) {
	  if (side === void 0) {
	    side = 'left';
	  }
	  const tabBounds = tab.getBoundingClientRect();
	  if (side === 'left') {
	    if (this.isRTL) {
	      const elementStyles = getComputedStyle(tab);
	      const borderRight = parseInt(elementStyles.borderRightWidth, 10);
	      const marginRight = parseInt(elementStyles.marginRight, 10);
	      return Math.abs(tabBounds.right + borderRight + marginRight - window.innerWidth);
	    }
	    return tabBounds.left;
	  }
	  if (this.isRTL) {
	    return Math.abs(tabBounds.left - window.innerWidth);
	  }
	  return tabBounds.right;
	}
	function _generateEvents() {
	  const events = [{
	    el: this.arrowPrev,
	    type: EventName$3.CLICK_DATA_API,
	    handler: this.onPrevArrowClick
	  }, {
	    el: this.arrowNext,
	    type: EventName$3.CLICK_DATA_API,
	    handler: this.onNextArrowClick
	  }, {
	    el: window,
	    type: EventName$3.RESIZE_DATA_API,
	    handler: throttle(DELAY_MS, this.onWindowResize)
	  }, {
	    el: this.scrollElement,
	    type: EventName$3.SCROLL_DATA_API,
	    handler: throttle(DELAY_MS, this.onScrollEvent)
	  }];
	  this.tabListItems.forEach(tab => {
	    events.push({
	      el: tab,
	      type: EventName$3.FOCUS_DATA_API,
	      handler: this.onFocusEvent
	    }, {
	      el: tab,
	      type: EventName$4.SHOW,
	      handler: _event => _onShow(tab, this.scrollIntoView)
	    });
	  });
	  return events;
	}

	/**
	 * Tab slider controls
	 */
	class TabSlider {
	  /**
	   * Create a TabSlider instance
	   * @param {Object} opts - The tab slider control options.
	   * @param {HTMLElement} opts.el - The tab slider DOM node.
	   * @param {Function} [opts.onPrevArrowClick] - Function to override the previous button click handler.
	   * @param {Function} [opts.onNextArrowClick] - Function to override the next button click handler.
	   * @param {Function} [opts.onWindowResize] - Function to override the resize handler.
	   * @param {Function} [opts.onScrollEvent] - Function to override the scroll event handler.
	   * @param {Function} [opts.onFocusEvent] - Function to override the focus event handler.
	   * @param {boolean} [opts.scrollIntoView=true] - Whether to scroll the selected tab into view (if overflowing container).
	   */
	  constructor(_ref2) {
	    let {
	      el,
	      scrollIntoView = true,
	      onPrevArrowClick,
	      onNextArrowClick,
	      onFocusEvent,
	      onScrollEvent,
	      onWindowResize
	    } = _ref2;
	    // select control nodes
	    this.el = el;
	    this.tabListItems = this.el.querySelectorAll(Selector$4.ROLE_TAB);
	    this.scrollElement = this.el.querySelector(Selector$3.TAB_OVERFLOW);
	    this.tabWindow = this.el.querySelector(Selector$3.TAB_WINDOW);
	    this.tabGroup = this.el.querySelector(Selector$3.TAB_GROUP);
	    this.tabContentCentered = this.tabGroup.classList.contains(ClassName$1.JUSTIFY_CENTER);
	    this.arrows = this.el.querySelector(Selector$3.ARROWS);
	    this.arrowPrev = this.el.querySelector(Selector$3.ARROW_PREV);
	    this.arrowNext = this.el.querySelector(Selector$3.ARROW_NEXT);
	    this.arrowOffsetWidth = parseInt(this.arrowNext.dataset.width, 10) || 40;

	    // event controls
	    this.onPrevArrowClick = onPrevArrowClick || _onArrowClick.bind(this);
	    this.onNextArrowClick = onNextArrowClick || _onArrowClick.bind(this);
	    this.onFocusEvent = onFocusEvent || _onFocus$1.bind(this);
	    this.onScrollEvent = onScrollEvent || _onScroll.bind(this);
	    this.onWindowResize = onWindowResize || _onWindowResize.bind(this);

	    // internal variables
	    this.isRTL = document.dir === 'rtl';
	    this.isTabWindowWidthAdjusted = false;
	    this.isArrowClicked = false;
	    this.arrowDirection = Direction.LEFT;
	    this.tabListWidth = 0;
	    this.tabListWidthBuffer = 0; // a11y fix to increase tab list window width to allow for increased letter spacing
	    this.lastTabBounds = this.tabListItems[this.tabListItems.length - 1].getBoundingClientRect();
	    // keep track of tab that is on the far left of the tab window
	    this.tabSlideTarget = {
	      el: this.isRTL ? this.tabListItems[this.tabListItems.length - 1] : this.tabListItems[0],
	      index: this.isRTL ? this.tabListItems.length - 1 : 0
	    };
	    this.scrollIntoView = scrollIntoView !== false && !this.el.hasAttribute(Attribute.DATA_DISABLE_SCROLL_INTO_VIEW);

	    // get width of all tabs; include borders and margins
	    this.tabListItems.forEach(tab => {
	      this.tabListWidth += _getTabWidth(tab);
	    });
	    // create a buffer of the tab window width on page load
	    this.tabListWidth *= 1.5;

	    // add class name to arrows for mobile only
	    if (Util.detectMobile(true)) {
	      this.arrows.classList.add(ClassName$1.MOBILE_ARROWS);
	    }
	    this.events = _generateEvents.call(this);
	    Util.addEvents(this.events);
	    tabSliders.push(this);
	    this.observer = new IntersectionObserver(entries => {
	      if (entries[0].isIntersecting) {
	        this.onWindowResize();
	      }
	    });
	    this.observer.observe(this.el);
	  }

	  /**
	   * Remove event handlers.
	   * @this TabSlider
	   */
	  remove() {
	    Util.removeEvents(this.events);

	    // Disconnect intersection observer
	    this.observer.disconnect();

	    // remove this reference from array of instances
	    const index = tabSliders.indexOf(this);
	    tabSliders.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$3.ON_REMOVE] = new CustomEvent(EventName$3.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$3.ON_REMOVE]);
	  }

	  /**
	   * Update Tab Slider
	   * @param {Object} [opts] - Tab Slider options.
	   * @param {Function} [opts.onPrevArrowClick] - Function to override the previous button click handler.
	   * @param {Function} [opts.onNextArrowClick] - Function to override the next button click handler.
	   * @param {Function} [opts.onWindowResize] - Function to override the resize handler.
	   * @param {Function} [opts.onScrollEvent] - Function to override the scroll event handler.
	   * @param {Function} [opts.onFocusEvent] - Function to override the focus event handler.
	   * @param {boolean} [opts.scrollIntoView] - Whether to scroll the selected tab into view (if overflowing container).
	   */
	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    // Remove event handlers
	    Util.removeEvents(this.events);

	    // Update opts
	    if (opts.onPrevArrowClick) {
	      this.onPrevArrowClick = opts.onPrevArrowClick;
	    }
	    if (opts.onNextArrowClick) {
	      this.onNextArrowClick = opts.onNextArrowClick;
	    }
	    if (opts.onWindowResize) {
	      this.onWindowResize = opts.onWindowResize;
	    }
	    if (opts.onScrollEvent) {
	      this.onScrollEvent = opts.onScrollEvent;
	    }
	    if (opts.onFocusEvent) {
	      this.onFocusEvent = opts.onFocusEvent;
	    }
	    if (typeof opts.scrollIntoView === 'boolean') {
	      this.scrollIntoView = opts.scrollIntoView;
	    }

	    // Rebuild events array
	    this.events = _generateEvents.call(this);

	    // Add event handlers
	    Util.addEvents(this.events);

	    // Create and dispatch custom event
	    this[EventName$3.ON_UPDATE] = new CustomEvent(EventName$3.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$3.ON_UPDATE]);
	  }

	  /**
	   * Go to next tabs
	   * @this TabSlider
	   */
	  onClickNextArrow() {
	    // Create and dispatch custom event
	    this[EventName$3.ON_SCROLL] = new CustomEvent(EventName$3.ON_SCROLL, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.el.dispatchEvent(this[EventName$3.ON_SCROLL]);
	    if (this[EventName$3.ON_SCROLL].defaultPrevented) {
	      return;
	    }
	    this.arrowNext.click();
	  }

	  /**
	   * Go to previous tabs
	   * @this TabSlider
	   */
	  onClickPrevArrow() {
	    // Create and dispatch custom event
	    this[EventName$3.ON_SCROLL] = new CustomEvent(EventName$3.ON_SCROLL, {
	      bubbles: true,
	      cancelable: true
	    });
	    this.el.dispatchEvent(this[EventName$3.ON_SCROLL]);
	    if (this[EventName$3.ON_SCROLL].defaultPrevented) {
	      return;
	    }
	    this.arrowPrev.click();
	  }

	  /**
	   * Get instances.
	   * @returns {Object} A object instance
	   */
	  static getInstances() {
	    return tabSliders;
	  }
	}

	const Debug = {
	  focusedElement() {
	    document.addEventListener('focus', () => {
	      /* eslint-disable-next-line no-console */
	      console.log('focused', document.activeElement);
	    }, true);
	  }
	};

	var version = "2.15.1";

	const MWF_INITIALIZED = 'mwfInitialized';
	const componentTuples$1 = [[Alert, Selector$t], [BackToTop, Selector$q], [Carousel, Selector$p], [CharacterCount, Selector$o], [ClickGroup, Selector$n], [Collapse, Selector$m], [CollapseControls, Selector$l], [ColorPicker, Selector$j], [ComboboxSelect, Selector$i], [ContentSwap, Selector$h], [Dropdown, Selector$g], [FormStar, Selector$f], [FormValidation, Selector$e], [Modal, Selector$d], [MultiFeature, Selector$c], [NavInPage, Selector$b], [Popover, Selector$a], [Positioner, Selector$9], [Range, Selector$8], [Scrollspy, Selector$7], [ShowMoreShowLess, Selector$6], [Sticky, Selector$r], [Switch, Selector$5], [Tab, Selector$4], [TabSlider, Selector$3]];
	function initializeComponents() {
	  componentTuples$1.forEach(_ref => {
	    let [Component, selector] = _ref;
	    Util.initializeComponent(selector.DATA_MOUNT, el => new Component({
	      el
	    }));
	  });
	}

	document.addEventListener('DOMContentLoaded', () => {
	  initializeComponents();
	  document.dispatchEvent(new CustomEvent(MWF_INITIALIZED));
	});

	const ClassName = {
	  PLAYING: 'playing',
	  WITH_TIMER: 'carousel-control-autoplay-button'
	};
	const Selector$2 = {
	  DATA_MOUNT: '[data-mount="autoplay-carousel"]',
	  DATA_PLAY_ON_INIT: 'data-play-on-init',
	  DATA_SLIDE_PLAY: '[data-slide="play"]',
	  DATA_INTERVAL_TIME: 'data-interval-time',
	  AUTO_PLAY_PROGRESS: '.carousel-control-progress',
	  BACK_PLATE: '.carousel-highlight-backplate',
	  INDICATOR: '.carousel-indicators li'
	};
	const EventName$2 = {
	  BLUR: 'blur',
	  CLICK: 'click',
	  FOCUS: 'focus',
	  MOUSEENTER: 'mouseenter',
	  MOUSELEAVE: 'mouseleave'
	};
	const Default = {
	  INTERVAL_TIME: 5000,
	  HOVER_DELAY_TIME: 500,
	  PLAY_ON_INIT: true,
	  STRING_BEFORE_TARGET: /\S+(?=deg)/ // Regex: Prefix a value to the target string. (This finds "deg" and will prefix the degree value. Example: 360deg)
	};
	var _init = /*#__PURE__*/_classPrivateFieldLooseKey("init");
	var _startSlideshow = /*#__PURE__*/_classPrivateFieldLooseKey("startSlideshow");
	var _stopSlideshow = /*#__PURE__*/_classPrivateFieldLooseKey("stopSlideshow");
	var _onPlayBtnClick = /*#__PURE__*/_classPrivateFieldLooseKey("onPlayBtnClick");
	var _resetProgress = /*#__PURE__*/_classPrivateFieldLooseKey("resetProgress");
	var _shouldPlayOnInit = /*#__PURE__*/_classPrivateFieldLooseKey("shouldPlayOnInit");
	var _setAriaLive = /*#__PURE__*/_classPrivateFieldLooseKey("setAriaLive");
	var _setProgressBarAriaLabel = /*#__PURE__*/_classPrivateFieldLooseKey("setProgressBarAriaLabel");
	var _onMouseEnter = /*#__PURE__*/_classPrivateFieldLooseKey("onMouseEnter");
	var _onMouseLeave = /*#__PURE__*/_classPrivateFieldLooseKey("onMouseLeave");
	var _onFocus = /*#__PURE__*/_classPrivateFieldLooseKey("onFocus");
	var _onBlur = /*#__PURE__*/_classPrivateFieldLooseKey("onBlur");
	var _setAutoplayInterval = /*#__PURE__*/_classPrivateFieldLooseKey("setAutoplayInterval");
	var _setBackplateSpacing = /*#__PURE__*/_classPrivateFieldLooseKey("setBackplateSpacing");
	class AutoplayCarouselControls extends CarouselControls {
	  /**
	   * Create the carousel controls.
	   * @param {boolean} [opts.playOnInit=true] - Whether the carousel should autoplay on page load. Defaults to true.
	   * @param {number} [opts.intervalTime=5000] - Time in milliseconds between slide changes. Defaults to 5000.
	   * @param {Function} [opts.onPlayClick] - Function to override the play button click handler.
	   */
	  constructor(opts) {
	    super(opts);
	    Object.defineProperty(this, _setBackplateSpacing, {
	      value: _setBackplateSpacing2
	    });
	    Object.defineProperty(this, _setAutoplayInterval, {
	      value: _setAutoplayInterval2
	    });
	    Object.defineProperty(this, _onBlur, {
	      value: _onBlur2
	    });
	    Object.defineProperty(this, _onFocus, {
	      value: _onFocus2
	    });
	    Object.defineProperty(this, _onMouseLeave, {
	      value: _onMouseLeave2
	    });
	    Object.defineProperty(this, _onMouseEnter, {
	      value: _onMouseEnter2
	    });
	    Object.defineProperty(this, _setProgressBarAriaLabel, {
	      value: _setProgressBarAriaLabel2
	    });
	    Object.defineProperty(this, _setAriaLive, {
	      value: _setAriaLive2
	    });
	    Object.defineProperty(this, _shouldPlayOnInit, {
	      value: _shouldPlayOnInit2
	    });
	    Object.defineProperty(this, _resetProgress, {
	      value: _resetProgress2
	    });
	    Object.defineProperty(this, _onPlayBtnClick, {
	      value: _onPlayBtnClick2
	    });
	    Object.defineProperty(this, _stopSlideshow, {
	      value: _stopSlideshow2
	    });
	    Object.defineProperty(this, _startSlideshow, {
	      value: _startSlideshow2
	    });
	    Object.defineProperty(this, _init, {
	      value: _init2
	    });
	    this.slideProgress = 0; // Amount of time elapsed on each slide ({num}/360)
	    this.intervalTime = Number(opts.intervalTime) || Number(this.el.getAttribute(Selector$2.DATA_INTERVAL_TIME)) || Default.INTERVAL_TIME;
	    this.interval = null;
	    this.isPlaying = false;
	    this.isHovered = false; // Mouse is hovering over slide/flippers preventing play
	    this.isFocused = false; // Flippers or slides are in focus preventing play
	    this.isManuallyPaused = true; // initial state or when the user clicked the pause button
	    this.reduceMotion = Util.prefersReducedMotion();
	    this.playOnInit = _classPrivateFieldLooseBase(this, _shouldPlayOnInit)[_shouldPlayOnInit](opts.playOnInit);
	    this.onPlayClick = opts.onPlayClick || _classPrivateFieldLooseBase(this, _onPlayBtnClick)[_onPlayBtnClick].bind(this);
	    this.slideArea = this.el.querySelector(Selector$p.CAROUSEL_INNER);
	    this.hoverElements = [this.prevBtn, this.nextBtn, this.slideArea];
	    this.focusElements = [this.prevBtn, this.nextBtn, ...this.slides];
	    this.prevNextButtons = [this.prevBtn, this.nextBtn];
	    this.playBtn = this.el.querySelector(Selector$2.DATA_SLIDE_PLAY);
	    this.hasProgressIndicator = this.playBtn.classList.contains(ClassName.WITH_TIMER);
	    if (opts) {
	      _classPrivateFieldLooseBase(this, _init)[_init]();
	    }
	  }
	  /**
	   *
	   * @param {number} [opts.intervalTime] - Time in milliseconds between slide changes.
	   * @param {Function} [opts.onPlayClick] - Function to override the play/pause button click/keypress handler.
	   */

	  update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    Util.removeEvents(this.events);
	    // resets this.events in base class
	    super.update(opts);
	    if (opts.intervalTime) {
	      this.intervalTime = opts.intervalTime;
	    }
	    if (opts.onPlayClick) {
	      this.onPlayClick = opts.onPlayClick;
	    }
	    _classPrivateFieldLooseBase(this, _init)[_init]();
	  }

	  // User initiated by click/keypress
	  play() {
	    if (this.isPlaying) return;
	    this.playBtn.setAttribute('aria-pressed', 'false');
	    this.playBtn.classList.add(ClassName.PLAYING);
	    this.isManuallyPaused = false;
	    _classPrivateFieldLooseBase(this, _startSlideshow)[_startSlideshow]();
	  }

	  // User initiated by click/keypress
	  pause() {
	    if (!this.isPlaying) return;
	    this.playBtn.setAttribute('aria-pressed', 'true');
	    this.playBtn.classList.remove(ClassName.PLAYING);
	    this.isManuallyPaused = true;
	    _classPrivateFieldLooseBase(this, _stopSlideshow)[_stopSlideshow]();
	  }

	  // Handle with events (hover/focus/click)
	}
	function _init2() {
	  const backPlateEnabled = document.querySelector(Selector$2.BACK_PLATE);
	  const autoplayEventHandlers = [{
	    el: this.playBtn,
	    type: EventName$2.CLICK,
	    handler: this.onPlayClick
	  }];
	  if (this.hasProgressIndicator) {
	    this.autoplayProgress = this.el.querySelector(Selector$2.AUTO_PLAY_PROGRESS);
	    this.progressIndicatorBackgroundImage = window.getComputedStyle(this.autoplayProgress).getPropertyValue('background-image');
	    this.prevNextButtons.forEach(element => {
	      autoplayEventHandlers.push({
	        el: element,
	        type: EventName$2.CLICK,
	        handler: () => {
	          _classPrivateFieldLooseBase(this, _resetProgress)[_resetProgress]();
	          _classPrivateFieldLooseBase(this, _setProgressBarAriaLabel)[_setProgressBarAriaLabel]();
	        }
	      });
	    });
	  }
	  this.hoverElements.forEach(element => {
	    autoplayEventHandlers.push({
	      el: element,
	      type: EventName$2.MOUSEENTER,
	      handler: debounce(Default.HOVER_DELAY_TIME, _classPrivateFieldLooseBase(this, _onMouseEnter)[_onMouseEnter].bind(this), {
	        atBegin: true
	      })
	    }, {
	      el: element,
	      type: EventName$2.MOUSELEAVE,
	      handler: debounce(Default.HOVER_DELAY_TIME, _classPrivateFieldLooseBase(this, _onMouseLeave)[_onMouseLeave].bind(this), {
	        atBegin: true
	      })
	    });
	  });
	  this.focusElements.forEach(element => {
	    autoplayEventHandlers.push({
	      el: element,
	      type: EventName$2.FOCUS,
	      handler: _classPrivateFieldLooseBase(this, _onFocus)[_onFocus].bind(this)
	    }, {
	      el: element,
	      type: EventName$2.BLUR,
	      handler: _classPrivateFieldLooseBase(this, _onBlur)[_onBlur].bind(this)
	    });
	  });
	  this.events.push(...autoplayEventHandlers);
	  Util.addEvents(autoplayEventHandlers);
	  if (backPlateEnabled) {
	    _classPrivateFieldLooseBase(this, _setBackplateSpacing)[_setBackplateSpacing]();
	  }
	  if (this.playOnInit) {
	    this.play();
	  }
	  _classPrivateFieldLooseBase(this, _setProgressBarAriaLabel)[_setProgressBarAriaLabel]();
	}
	function _startSlideshow2() {
	  this.isPlaying = true;
	  _classPrivateFieldLooseBase(this, _setAriaLive)[_setAriaLive]('off');
	  _classPrivateFieldLooseBase(this, _setAutoplayInterval)[_setAutoplayInterval]();
	}
	function _stopSlideshow2() {
	  this.isPlaying = false;
	  _classPrivateFieldLooseBase(this, _setAriaLive)[_setAriaLive]('polite');
	  clearInterval(this.interval);
	}
	function _onPlayBtnClick2() {
	  // Show the next slide when clicking the Play button so there is no delay when Reduce Motion is enabled.
	  if (this.reduceMotion && !this.isPlaying) {
	    CarouselControls.prototype.goToNextSlide.call(this);
	    this.slideProgress = 0;
	  }
	  if (this.isPlaying) {
	    this.pause();
	  } else {
	    this.play();
	  }
	}
	function _resetProgress2() {
	  _classPrivateFieldLooseBase(this, _setAriaLive)[_setAriaLive]('polite');
	  this.slideProgress = 0;
	  this.autoplayProgress.style.backgroundImage = this.progressIndicatorBackgroundImage.replace(Default.STRING_BEFORE_TARGET, `${this.slideProgress}`);
	}
	function _shouldPlayOnInit2(playOption) {
	  // Prevent autoplay on init when prefers-reduced-motion is enabled
	  if (this.reduceMotion) {
	    return false;
	  }
	  if (typeof playOption === 'boolean') {
	    return playOption;
	  }
	  return this.el.getAttribute(Selector$2.DATA_PLAY_ON_INIT) === 'false' ? false : Default.PLAY_ON_INIT;
	}
	function _setAriaLive2(attribute) {
	  if (this.srStatusContainer) {
	    this.srStatusContainer.setAttribute('aria-live', attribute);
	  }
	}
	function _setProgressBarAriaLabel2() {
	  if (this.srStatusContainer && this.hasProgressIndicator) {
	    this.autoplayProgress.setAttribute('aria-label', this.srStatusContainer.textContent);
	  }
	}
	function _onMouseEnter2() {
	  if (this.isPlaying && !this.isManuallyPaused) {
	    _classPrivateFieldLooseBase(this, _stopSlideshow)[_stopSlideshow]();
	  }
	  this.isHovered = true;
	}
	function _onMouseLeave2() {
	  if (!this.isPlaying && !this.isManuallyPaused && !this.isFocused) {
	    _classPrivateFieldLooseBase(this, _startSlideshow)[_startSlideshow]();
	  }
	  this.isHovered = false;
	}
	function _onFocus2() {
	  if (this.isPlaying && !this.isManuallyPaused) {
	    _classPrivateFieldLooseBase(this, _stopSlideshow)[_stopSlideshow]();
	  }
	  this.isFocused = true;
	}
	function _onBlur2() {
	  if (!this.isPlaying && !this.isManuallyPaused && !this.isHovered) {
	    _classPrivateFieldLooseBase(this, _startSlideshow)[_startSlideshow]();
	  }
	  this.isFocused = false;
	}
	function _setAutoplayInterval2() {
	  const progressSpeed = Math.round(this.intervalTime / 360); // Number of milliseconds to increment

	  this.interval = setInterval(() => {
	    this.slideProgress++;
	    const valuenow = Math.round(100 / 360 * this.slideProgress); // Percentage of time elapsed on slide

	    if (this.hasProgressIndicator) {
	      this.autoplayProgress.setAttribute('aria-valuenow', valuenow);
	      this.autoplayProgress.style.backgroundImage = this.progressIndicatorBackgroundImage.replace(Default.STRING_BEFORE_TARGET, `${this.slideProgress}`);
	    }

	    // Update the aria label once the slide has been updated
	    if (this.slideProgress >= 360) {
	      this.slideProgress = 0;
	      CarouselControls.prototype.goToNextSlide.call(this);
	      _classPrivateFieldLooseBase(this, _setProgressBarAriaLabel)[_setProgressBarAriaLabel]();
	    }

	    // Reduce motion - This will change the round progress indicator to a round solid border for the autoplay button.
	    if (this.reduceMotion && this.hasProgressIndicator) this.autoplayProgress.style.backgroundImage = `conic-gradient(transparent 0deg, currentColor 0)`;
	  }, progressSpeed);
	}
	function _setBackplateSpacing2() {
	  const playBtnWidth = Number(this.playBtn.clientWidth);
	  const indicatorsWidth = this.el.querySelector(Selector$p.INDICATORS).clientWidth;
	  const carouselBtnWidth = this.el.querySelector(Selector$p.DATA_SLIDE_PREV).clientWidth; // carousel button width = 44px
	  const indicator = this.el.querySelector(Selector$2.INDICATOR);
	  const biDirectional = Util.isBiDirectional();
	  const indicatorXMargin = biDirectional ? window.getComputedStyle(indicator).marginRight : window.getComputedStyle(indicator).marginLeft;
	  const calculatedSpacing = parseInt(indicatorXMargin, 10) + carouselBtnWidth; // carousel button width + indicator left/right margin
	  const withoutTimerSpacing = Math.ceil(indicatorsWidth / 2 + playBtnWidth);
	  const withTimerSpacing = indicatorsWidth + calculatedSpacing;
	  this.el.style.setProperty('--progress-indicator-spacing', `${withTimerSpacing}px`);
	  this.el.style.setProperty('--default-play-button-spacing', `${withoutTimerSpacing}px`);
	}

	class AutoplayCarousel extends Carousel {
	  /**
	   * Create the carousel.
	   * @param {Object} opts - The carousel options.
	   * @param {Node} opts.el - The carousel DOM node.
	   */
	  constructor(opts) {
	    super({
	      el: opts.el,
	      controls: new AutoplayCarouselControls(opts)
	    });
	  }
	}

	const Selector$1 = {
	  DATA_MOUNT: '[data-mount="compare-chart"]'
	};
	const EventName$1 = {
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove'
	};
	const compareChartInstances = [];

	/**
	 * Gets the target scrollbar to show only when compare chart is in view
	 * @returns {Array<Node>} The target scrollbar
	 */
	function _getScrollbar() {
	  // Reads selector from data-scrollbar attribute
	  const selector = this.compareChart.getAttribute('data-scrollbar');
	  return document.querySelector(selector); // there should only be one
	}

	class CompareChart {
	  /**
	   * Creates a CompareChart object
	   * @param {Object} opts The CompareChart options
	   * @param {Node} opts.el The node that is the Compare Chart
	   */
	  constructor(opts) {
	    this.compareChart = opts.el;
	    this.scrollbar = _getScrollbar.bind(this)();

	    // set up IntersectionObserver
	    const observerOpts = {
	      // sets a buffer before which the scrollbar wont show. By default, scrollbar does not show until
	      // 24px of the Compare Chart has been scrolled into view
	      rootMargin: opts.rootMargin || '24px'
	    };
	    const observerCallback = entryList => {
	      // there should only be one observed element, so one entry
	      if (entryList[0].isIntersecting) {
	        this.scrollbar.removeAttribute('data-off-page');
	      } else {
	        this.scrollbar.dataset.offPage = 'true';
	      }
	    };
	    this.compareChartObserver = new IntersectionObserver(observerCallback.bind(this), observerOpts);
	    this.compareChartObserver.observe(this.compareChart);
	    document.documentElement.style.overflowX = 'hidden';

	    // Create custom events
	    this[EventName$1.ON_UPDATE] = new CustomEvent(EventName$1.ON_UPDATE, {
	      bubbles: true,
	      cancelable: true
	    });
	    this[EventName$1.ON_REMOVE] = new CustomEvent(EventName$1.ON_REMOVE, {
	      bubbles: true,
	      cancelable: true
	    });

	    // push to instances list
	    compareChartInstances.push(this);
	    console.warn('Warning: CompareChart has been deprecated as of 2.2.0. It will be removed entirely in 3.0.0.');
	  }

	  /**
	   * Updates the object by re-reading all configuration options stored in the DOM
	   */
	  update() {
	    this.scrollbar = _getScrollbar.bind(this)();
	    this.compareChart.dispatchEvent(this[EventName$1.ON_UPDATE]);
	  }

	  /**
	   * Removes the CompareChart instance
	   */
	  remove() {
	    Util.removeEvents(this.events);
	    document.documentElement.style.overflowX = null;
	    this.compareChartObserver.disconnect();
	    const index = compareChartInstances.indexOf(this);
	    compareChartInstances.splice(index, 1);
	    this.compareChart.dispatchEvent(this[EventName$1.ON_REMOVE]);
	  }

	  /**
	   * Gets the array of CompareChart instances
	   * @returns {Object[]} Array of CompareChart instances
	   */
	  static getInstances() {
	    return compareChartInstances;
	  }
	}

	const Selector = {
	  DATA_MOUNT: '[data-mount="synchronized-scroll"]'
	};
	const EventName = {
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove'
	};
	const SYNC_DELAY_MS = 25;
	const syncScrollInstances = [];

	/**
	 * Gets the target scrollable elements to synchronize
	 * @returns {Array<Node>} The target scrollable elements
	 */
	function _getTargetList() {
	  // Reads selector from data-target attribute
	  const selector = Util.getSelectorFromElement(this.commonAncestor);

	  // Gets list of all matching elements that are descendants of the common ancestor node
	  return [].slice.call(document.querySelectorAll(selector));
	}

	/**
	 * Synchronizes the scroll positions of the target elements
	 */
	function _getScrollHandler(triggeringElement, triggeringElementIndex) {
	  return function () {
	    if (!this.isSynchronizing) {
	      // check that this scroll event isn't due to a sync
	      this.isSynchronizing = true; // block further updates to prevent infinite loop

	      // update all other elements
	      const targetScrollTop = triggeringElement.scrollTop;
	      const targetScrollLeft = triggeringElement.scrollLeft;
	      const hasVerticalSync = this.scrollDirection !== 'horizontal';
	      let i;
	      let elementToSync;
	      for (i = 0; i < this.targetList.length; i++) {
	        if (i !== triggeringElementIndex) {
	          elementToSync = this.targetList[i];
	          elementToSync.scrollTop = targetScrollTop;
	          elementToSync.scrollLeft = targetScrollLeft;
	        }
	      }

	      // update complete, allow further syncs to trigger
	      if (hasVerticalSync) {
	        // special hack for mousewheels: based on testing, a timeout is needed in order for mousewheel events
	        // not to enter a race condition, causing mousehweels to scroll one pixel per click. 25ms is safe without
	        // being too choppy based on testing
	        setTimeout(() => {
	          this.isSynchronizing = false;
	        }, SYNC_DELAY_MS);
	      } else {
	        this.isSynchronizing = false;
	      }
	    }
	  }.bind(this);
	}
	class SynchronizedScroll {
	  /**
	   * Creates a SynchronizedScroll object
	   * @param {Object} opts The SynchronizedScroll options
	   * @param {Node} opts.el The node that is a common ancestor of all the synchronized scrollable elements
	   */
	  constructor(opts) {
	    this.commonAncestor = opts.el;
	    this.targetList = _getTargetList.call(this);
	    this.isSynchronizing = false;
	    this.scrollDirection = (this.commonAncestor.getAttribute('data-scroll-direction') || 'both').toLowerCase();

	    // Attach scroll handlers
	    this.events = [];
	    let i;
	    for (i = 0; i < this.targetList.length; i++) {
	      this.events.push({
	        el: this.targetList[i],
	        type: 'scroll',
	        handler: _getScrollHandler.call(this, this.targetList[i], i)
	      });
	    }
	    Util.addEvents(this.events);

	    // Create custom events.
	    this[EventName.ON_UPDATE] = new CustomEvent(EventName.ON_UPDATE, {
	      bubbles: true,
	      cancelable: true
	    });
	    this[EventName.ON_REMOVE] = new CustomEvent(EventName.ON_REMOVE, {
	      bubbles: true,
	      cancelable: true
	    });

	    // push to instances list
	    syncScrollInstances.push(this);
	    console.warn('Warning: SynchronizedScroll has been deprecated as of 2.2.0. It will be removed entirely in 3.0.0.');
	  }

	  /**
	   * Updates the object by re-reading all configuration options stored in the DOM
	   */
	  update() {
	    this.targetList = _getTargetList.call(this);
	    this.scrollDirection = (this.commonAncestor.getAttribute('data-scroll-direction') || 'both').toLowerCase();
	    this.commonAncestor.dispatchEvent(this[EventName.ON_UPDATE]);
	  }

	  /**
	   * Removes the SynchronizedScroll instance
	   */
	  remove() {
	    Util.removeEvents(this.events);
	    const index = syncScrollInstances.indexOf(this);
	    syncScrollInstances.splice(index, 1);
	    this.commonAncestor.dispatchEvent(this[EventName.ON_REMOVE]);
	  }

	  /**
	   * Gets the array of SynchronizedScroll instances
	   * @returns {Object[]} Array of SynchronizedScroll instances
	   */
	  static getInstances() {
	    return syncScrollInstances;
	  }
	}

	const MWF_EXT_INITIALIZED = 'mwfExtensionsInitialized';
	const componentTuples = [[AutoplayCarousel, Selector$2], [CompareChart, Selector$1], [SynchronizedScroll, Selector]];
	function initializeExtensions() {
	  componentTuples.forEach(_ref => {
	    let [Component, selector] = _ref;
	    Util.initializeComponent(selector.DATA_MOUNT, el => new Component({
	      el
	    }));
	  });
	}

	document.addEventListener(MWF_INITIALIZED, () => {
	  initializeExtensions();
	  document.dispatchEvent(new CustomEvent(MWF_EXT_INITIALIZED));
	});

	exports.Alert = Alert;
	exports.AutoComplete = AutoComplete;
	exports.AutoplayCarousel = AutoplayCarousel;
	exports.BackToTop = BackToTop;
	exports.Carousel = Carousel;
	exports.CharacterCount = CharacterCount;
	exports.ClickGroup = ClickGroup;
	exports.Collapse = Collapse;
	exports.CollapseControls = CollapseControls;
	exports.ColorPicker = ColorPicker;
	exports.ComboboxSelect = ComboboxSelect;
	exports.CompareChart = CompareChart;
	exports.ContentSwap = ContentSwap;
	exports.Debug = Debug;
	exports.Dropdown = Dropdown;
	exports.FormStar = FormStar;
	exports.FormValidation = FormValidation;
	exports.Modal = Modal;
	exports.MultiFeature = MultiFeature;
	exports.NavInPage = NavInPage;
	exports.Popover = Popover;
	exports.Positioner = Positioner;
	exports.Range = Range;
	exports.Scrollspy = Scrollspy;
	exports.ShowMoreShowLess = ShowMoreShowLess;
	exports.Sticky = Sticky;
	exports.Switch = Switch;
	exports.SynchronizedScroll = SynchronizedScroll;
	exports.Tab = Tab;
	exports.TabSlider = TabSlider;
	exports.Util = Util;
	exports.version = version;

}));

if (window.mwf) {
     document.addEventListener('mwfInitialized', function () {
         if (console && console.log && mwf.version) {
              console.log('MWF v' + mwf.version);
         }
    });
}

/*!
 * MWF (Moray) plugins for Fixed sticky v1.2.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mwfFixedStickyPlugin = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$c =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$d = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$c = fails$d;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$c(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$b = fails$d;

	var functionBindNative = !fails$b(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$2 = functionBindNative;

	var call$4 = Function.prototype.call;

	var functionCall = NATIVE_BIND$2 ? call$4.bind(call$4) : function () {
	  return call$4.apply(call$4, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	var createPropertyDescriptor$3 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$1 = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var call$3 = FunctionPrototype$1.call;
	var uncurryThisWithBind = NATIVE_BIND$1 && FunctionPrototype$1.bind.bind(call$3, call$3);

	var functionUncurryThisRaw = NATIVE_BIND$1 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$3.apply(fn, arguments);
	  };
	};

	var uncurryThisRaw$1 = functionUncurryThisRaw;

	var toString$6 = uncurryThisRaw$1({}.toString);
	var stringSlice = uncurryThisRaw$1(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice(toString$6(it), 8, -1);
	};

	var classofRaw$1 = classofRaw$2;
	var uncurryThisRaw = functionUncurryThisRaw;

	var functionUncurryThis = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThisRaw(fn);
	};

	var uncurryThis$d = functionUncurryThis;
	var fails$a = fails$d;
	var classof$6 = classofRaw$2;

	var $Object$3 = Object;
	var split = uncurryThis$d(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$a(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$6(it) == 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$2 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$1 = isNullOrUndefined$2;

	var $TypeError$9 = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$4 = function (it) {
	  if (isNullOrUndefined$1(it)) throw $TypeError$9("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$1 = indexedObject;
	var requireObjectCoercible$3 = requireObjectCoercible$4;

	var toIndexedObject$5 = function (it) {
	  return IndexedObject$1(requireObjectCoercible$3(it));
	};

	var documentAll$2 = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

	var documentAll_1 = {
	  all: documentAll$2,
	  IS_HTMLDDA: IS_HTMLDDA
	};

	var $documentAll$1 = documentAll_1;

	var documentAll$1 = $documentAll$1.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$c = $documentAll$1.IS_HTMLDDA ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$b = isCallable$c;
	var $documentAll = documentAll_1;

	var documentAll = $documentAll.all;

	var isObject$7 = $documentAll.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$b(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$b(it);
	};

	var global$b = global$c;
	var isCallable$a = isCallable$c;

	var aFunction = function (argument) {
	  return isCallable$a(argument) ? argument : undefined;
	};

	var getBuiltIn$5 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$b[namespace]) : global$b[namespace] && global$b[namespace][method];
	};

	var uncurryThis$c = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$c({}.isPrototypeOf);

	var getBuiltIn$4 = getBuiltIn$5;

	var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';

	var global$a = global$c;
	var userAgent = engineUserAgent;

	var process = global$a.process;
	var Deno = global$a.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$1 = engineV8Version;
	var fails$9 = fails$d;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$9(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn$3 = getBuiltIn$5;
	var isCallable$9 = isCallable$c;
	var isPrototypeOf = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$2 = Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$3('Symbol');
	  return isCallable$9($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
	};

	var $String$2 = String;

	var tryToString$2 = function (argument) {
	  try {
	    return $String$2(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$8 = isCallable$c;
	var tryToString$1 = tryToString$2;

	var $TypeError$8 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$2 = function (argument) {
	  if (isCallable$8(argument)) return argument;
	  throw $TypeError$8(tryToString$1(argument) + ' is not a function');
	};

	var aCallable$1 = aCallable$2;
	var isNullOrUndefined = isNullOrUndefined$2;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable$1(func);
	};

	var call$2 = functionCall;
	var isCallable$7 = isCallable$c;
	var isObject$6 = isObject$7;

	var $TypeError$7 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$7(fn = input.toString) && !isObject$6(val = call$2(fn, input))) return val;
	  if (isCallable$7(fn = input.valueOf) && !isObject$6(val = call$2(fn, input))) return val;
	  if (pref !== 'string' && isCallable$7(fn = input.toString) && !isObject$6(val = call$2(fn, input))) return val;
	  throw $TypeError$7("Can't convert object to primitive value");
	};

	var shared$3 = {exports: {}};

	var global$9 = global$c;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$2 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$2(global$9, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$9[key] = value;
	  } return value;
	};

	var global$8 = global$c;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$8[SHARED] || defineGlobalProperty$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$3.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.26.0',
	  mode: 'global',
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.26.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var requireObjectCoercible$2 = requireObjectCoercible$4;

	var $Object$1 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$3 = function (argument) {
	  return $Object$1(requireObjectCoercible$2(argument));
	};

	var uncurryThis$b = functionUncurryThis;
	var toObject$2 = toObject$3;

	var hasOwnProperty = uncurryThis$b({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$2(it), key);
	};

	var uncurryThis$a = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$5 = uncurryThis$a(1.0.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$5(++id + postfix, 36);
	};

	var global$7 = global$c;
	var shared$2 = shared$3.exports;
	var hasOwn$6 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore = shared$2('wks');
	var Symbol$2 = global$7.Symbol;
	var symbolFor = Symbol$2 && Symbol$2['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$1;

	var wellKnownSymbol$8 = function (name) {
	  if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL && hasOwn$6(Symbol$2, name)) {
	      WellKnownSymbolsStore[name] = Symbol$2[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var call$1 = functionCall;
	var isObject$5 = isObject$7;
	var isSymbol$1 = isSymbol$2;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$7 = wellKnownSymbol$8;

	var $TypeError$6 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$7('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$5(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$1(exoticToPrim, input, pref);
	    if (!isObject$5(result) || isSymbol$1(result)) return result;
	    throw $TypeError$6("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$3 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var global$6 = global$c;
	var isObject$4 = isObject$7;

	var document$1 = global$6.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$4(document$1) && isObject$4(document$1.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$9 = descriptors;
	var fails$8 = fails$d;
	var createElement = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$9 && !fails$8(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$8 = descriptors;
	var call = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;
	var toIndexedObject$4 = toIndexedObject$5;
	var toPropertyKey$2 = toPropertyKey$3;
	var hasOwn$5 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$8 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$4(O);
	  P = toPropertyKey$2(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$5(O, P)) return createPropertyDescriptor$2(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$7 = descriptors;
	var fails$7 = fails$d;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$7 && fails$7(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var isObject$3 = isObject$7;

	var $String$1 = String;
	var $TypeError$5 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$4 = function (argument) {
	  if (isObject$3(argument)) return argument;
	  throw $TypeError$5($String$1(argument) + ' is not an object');
	};

	var DESCRIPTORS$6 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$3 = anObject$4;
	var toPropertyKey$1 = toPropertyKey$3;

	var $TypeError$4 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$6 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$3(O);
	  P = toPropertyKey$1(P);
	  anObject$3(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$3(O);
	  P = toPropertyKey$1(P);
	  anObject$3(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$4('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$5 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;

	var createNonEnumerableProperty$3 = DESCRIPTORS$5 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$2 = {exports: {}};

	var DESCRIPTORS$4 = descriptors;
	var hasOwn$4 = hasOwnProperty_1;

	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$4(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$4 || (DESCRIPTORS$4 && getDescriptor(FunctionPrototype, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$9 = functionUncurryThis;
	var isCallable$6 = isCallable$c;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$9(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$6(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$2 = store$1.inspectSource;

	var global$5 = global$c;
	var isCallable$5 = isCallable$c;

	var WeakMap$1 = global$5.WeakMap;

	var weakMapBasicDetection = isCallable$5(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var shared$1 = shared$3.exports;
	var uid = uid$2;

	var keys = shared$1('keys');

	var sharedKey$2 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var global$4 = global$c;
	var isObject$2 = isObject$7;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
	var hasOwn$3 = hasOwnProperty_1;
	var shared = sharedStore;
	var sharedKey$1 = sharedKey$2;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$1 = global$4.TypeError;
	var WeakMap = global$4.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared.state) {
	  var store = shared.state || (shared.state = new WeakMap());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function (it, metadata) {
	    if (store.has(it)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey$1('state');
	  hiddenKeys$3[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$3(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$2(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$3(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$3(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var fails$6 = fails$d;
	var isCallable$4 = isCallable$c;
	var hasOwn$2 = hasOwnProperty_1;
	var DESCRIPTORS$3 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
	var inspectSource$1 = inspectSource$2;
	var InternalStateModule = internalState;

	var enforceInternalState = InternalStateModule.enforce;
	var getInternalState = InternalStateModule.get;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$1 = Object.defineProperty;

	var CONFIGURABLE_LENGTH = DESCRIPTORS$3 && !fails$6(function () {
	  return defineProperty$1(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
	  if (String(name).slice(0, 7) === 'Symbol(') {
	    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$2(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS$3) defineProperty$1(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, 'arity') && value.length !== options.arity) {
	    defineProperty$1(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$2(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$3) defineProperty$1(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwn$2(state, 'source')) {
	    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$1(function toString() {
	  return isCallable$4(this) && getInternalState(this).source || inspectSource$1(this);
	}, 'toString');

	var isCallable$3 = isCallable$c;
	var definePropertyModule$3 = objectDefineProperty;
	var makeBuiltIn = makeBuiltIn$2.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$2 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$3(value)) makeBuiltIn(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$3.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$3 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

	var max$1 = Math.max;
	var min$2 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$2 = function (index, length) {
	  var integer = toIntegerOrInfinity$2(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

	var min$1 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min$1(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$3 = function (obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$3 = toIndexedObject$5;
	var toAbsoluteIndex$1 = toAbsoluteIndex$2;
	var lengthOfArrayLike$2 = lengthOfArrayLike$3;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$3 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$3($this);
	    var length = lengthOfArrayLike$2(O);
	    var index = toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$3(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$3(false)
	};

	var uncurryThis$8 = functionUncurryThis;
	var hasOwn$1 = hasOwnProperty_1;
	var toIndexedObject$2 = toIndexedObject$5;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push$2 = uncurryThis$8([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$2(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push$2(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
	    ~indexOf(result, key) || push$2(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$2 = getBuiltIn$5;
	var uncurryThis$7 = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$2 = anObject$4;

	var concat = uncurryThis$7([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$2(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$2 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$2.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$5 = fails$d;
	var isCallable$2 = isCallable$c;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$2(detection) ? fails$5(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var global$3 = global$c;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
	var defineBuiltIn$1 = defineBuiltIn$2;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$3;
	  } else if (STATIC) {
	    target = global$3[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = (global$3[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$1(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$1(target, key, sourceProperty, options);
	  }
	};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$2 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$2 = descriptors;
	var uncurryThis$6 = functionUncurryThis;
	var objectKeys$1 = objectKeys$2;
	var toIndexedObject$1 = toIndexedObject$5;
	var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

	var propertyIsEnumerable = uncurryThis$6($propertyIsEnumerable);
	var push$1 = uncurryThis$6([].push);

	// `Object.{ entries, values }` methods implementation
	var createMethod$2 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject$1(it);
	    var keys = objectKeys$1(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS$2 || propertyIsEnumerable(O, key)) {
	        push$1(result, TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod$2(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod$2(false)
	};

	var $$4 = _export;
	var $values = objectToArray.values;

	// `Object.values` method
	// https://tc39.es/ecma262/#sec-object.values
	$$4({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var classof$5 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$2 = Array.isArray || function isArray(argument) {
	  return classof$5(argument) == 'Array';
	};

	var DESCRIPTORS$1 = descriptors;
	var isArray$1 = isArray$2;

	var $TypeError$3 = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$1 && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray$1(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
	    throw $TypeError$3('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var $TypeError$2 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$1 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$2('Maximum allowed index exceeded');
	  return it;
	};

	var wellKnownSymbol$6 = wellKnownSymbol$8;

	var TO_STRING_TAG$1 = wellKnownSymbol$6('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$1 = isCallable$c;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol$5 = wellKnownSymbol$8;

	var TO_STRING_TAG = wellKnownSymbol$5('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$4 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$1(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis$5 = functionUncurryThis;
	var fails$4 = fails$d;
	var isCallable = isCallable$c;
	var classof$3 = classof$4;
	var getBuiltIn$1 = getBuiltIn$5;
	var inspectSource = inspectSource$2;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct = getBuiltIn$1('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$1 = uncurryThis$5(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  try {
	    construct(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  switch (classof$3(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$1 = !construct || fails$4(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray = isArray$2;
	var isConstructor = isConstructor$1;
	var isObject$1 = isObject$7;
	var wellKnownSymbol$4 = wellKnownSymbol$8;

	var SPECIES$1 = wellKnownSymbol$4('species');
	var $Array = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
	    else if (isObject$1(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var toPropertyKey = toPropertyKey$3;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$3;

	var createProperty$1 = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var tryToString = tryToString$2;

	var $TypeError$1 = TypeError;

	var deletePropertyOrThrow$1 = function (O, P) {
	  if (!delete O[P]) throw $TypeError$1('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
	};

	var fails$3 = fails$d;
	var wellKnownSymbol$3 = wellKnownSymbol$8;
	var V8_VERSION = engineV8Version;

	var SPECIES = wellKnownSymbol$3('species');

	var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION >= 51 || !fails$3(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$3 = _export;
	var toObject$1 = toObject$3;
	var toAbsoluteIndex = toAbsoluteIndex$2;
	var toIntegerOrInfinity = toIntegerOrInfinity$3;
	var lengthOfArrayLike$1 = lengthOfArrayLike$3;
	var setArrayLength = arraySetLength;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var createProperty = createProperty$1;
	var deletePropertyOrThrow = deletePropertyOrThrow$1;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

	var max = Math.max;
	var min = Math.min;

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$$3({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$1(this);
	    var len = lengthOfArrayLike$1(O);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
	    }
	    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
	    A = arraySpeciesCreate$1(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow(O, to);
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow(O, to);
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    setArrayLength(O, len - actualDeleteCount + insertCount);
	    return A;
	  }
	});

	/* eslint-disable no-undefined,no-param-reassign,no-shadow */

	/**
	 * Throttle execution of a function. Especially useful for rate limiting
	 * execution of handlers on events like resize and scroll.
	 *
	 * @param  {number}    delay -          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
	 * @param  {boolean}   [noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
	 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
	 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
	 *                                    the internal counter is reset).
	 * @param  {Function}  callback -       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
	 *                                    to `callback` when the throttled-function is executed.
	 * @param  {boolean}   [debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
	 *                                    schedule `callback` to execute after `delay` ms.
	 *
	 * @returns {Function}  A new, throttled, function.
	 */
	function throttle (delay, noTrailing, callback, debounceMode) {
	  /*
	   * After wrapper has stopped being called, this timeout ensures that
	   * `callback` is executed at the proper times in `throttle` and `end`
	   * debounce modes.
	   */
	  var timeoutID;
	  var cancelled = false; // Keep track of the last time `callback` was executed.

	  var lastExec = 0; // Function to clear existing timeout

	  function clearExistingTimeout() {
	    if (timeoutID) {
	      clearTimeout(timeoutID);
	    }
	  } // Function to cancel next exec


	  function cancel() {
	    clearExistingTimeout();
	    cancelled = true;
	  } // `noTrailing` defaults to falsy.


	  if (typeof noTrailing !== 'boolean') {
	    debounceMode = callback;
	    callback = noTrailing;
	    noTrailing = undefined;
	  }
	  /*
	   * The `wrapper` function encapsulates all of the throttling / debouncing
	   * functionality and when executed will limit the rate at which `callback`
	   * is executed.
	   */


	  function wrapper() {
	    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
	      arguments_[_key] = arguments[_key];
	    }

	    var self = this;
	    var elapsed = Date.now() - lastExec;

	    if (cancelled) {
	      return;
	    } // Execute `callback` and update the `lastExec` timestamp.


	    function exec() {
	      lastExec = Date.now();
	      callback.apply(self, arguments_);
	    }
	    /*
	     * If `debounceMode` is true (at begin) this is used to clear the flag
	     * to allow future `callback` executions.
	     */


	    function clear() {
	      timeoutID = undefined;
	    }

	    if (debounceMode && !timeoutID) {
	      /*
	       * Since `wrapper` is being called for the first time and
	       * `debounceMode` is true (at begin), execute `callback`.
	       */
	      exec();
	    }

	    clearExistingTimeout();

	    if (debounceMode === undefined && elapsed > delay) {
	      /*
	       * In throttle mode, if `delay` time has been exceeded, execute
	       * `callback`.
	       */
	      exec();
	    } else if (noTrailing !== true) {
	      /*
	       * In trailing throttle mode, since `delay` time has not been
	       * exceeded, schedule `callback` to execute `delay` ms after most
	       * recent execution.
	       *
	       * If `debounceMode` is true (at begin), schedule `clear` to execute
	       * after `delay` ms.
	       *
	       * If `debounceMode` is false (at end), schedule `callback` to
	       * execute after `delay` ms.
	       */
	      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
	    }
	  }

	  wrapper.cancel = cancel; // Return the wrapper function.

	  return wrapper;
	}

	/* eslint-disable no-undefined */
	/**
	 * Debounce execution of a function. Debouncing, unlike throttling,
	 * guarantees that a function is only executed a single time, either at the
	 * very beginning of a series of calls, or at the very end.
	 *
	 * @param  {number}   delay -         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
	 * @param  {boolean}  [atBegin] -     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
	 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
	 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
	 * @param  {Function} callback -      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
	 *                                  to `callback` when the debounced-function is executed.
	 *
	 * @returns {Function} A new, debounced function.
	 */

	function debounce (delay, atBegin, callback) {
	  return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
	}

	var objectDefineProperties = {};

	var DESCRIPTORS = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule = objectDefineProperty;
	var anObject$1 = anObject$4;
	var toIndexedObject = toIndexedObject$5;
	var objectKeys = objectKeys$2;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$1(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn = getBuiltIn$5;

	var html$1 = getBuiltIn('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject = anObject$4;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html = html$1;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey = sharedKey$2;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement$1('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var wellKnownSymbol$2 = wellKnownSymbol$8;
	var create = objectCreate;
	var defineProperty = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol$2('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  defineProperty(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: create(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$1 = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $$2 = _export;
	var $includes = arrayIncludes.includes;
	var fails$2 = fails$d;
	var addToUnscopables = addToUnscopables$1;

	// FF99+ bug
	var BROKEN_ON_SPARSE = fails$2(function () {
	  return !Array(1).includes();
	});

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	$$2({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var isObject = isObject$7;
	var classof$2 = classofRaw$2;
	var wellKnownSymbol$1 = wellKnownSymbol$8;

	var MATCH$1 = wellKnownSymbol$1('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$2(it) == 'RegExp');
	};

	var isRegExp = isRegexp;

	var $TypeError = TypeError;

	var notARegexp = function (it) {
	  if (isRegExp(it)) {
	    throw $TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var classof$1 = classof$4;

	var $String = String;

	var toString$4 = function (argument) {
	  if (classof$1(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String(argument);
	};

	var wellKnownSymbol = wellKnownSymbol$8;

	var MATCH = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$1 = _export;
	var uncurryThis$4 = functionUncurryThis;
	var notARegExp = notARegexp;
	var requireObjectCoercible$1 = requireObjectCoercible$4;
	var toString$3 = toString$4;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	var stringIndexOf = uncurryThis$4(''.indexOf);

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	$$1({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~stringIndexOf(
	      toString$3(requireObjectCoercible$1(this)),
	      toString$3(notARegExp(searchString)),
	      arguments.length > 1 ? arguments[1] : undefined
	    );
	  }
	});

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof = classof$4;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn = defineBuiltIn$2;
	var toString$2 = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn(Object.prototype, 'toString', toString$2, { unsafe: true });
	}

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement = documentCreateElement$2;

	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

	var uncurryThis$3 = functionUncurryThis;
	var aCallable = aCallable$2;
	var NATIVE_BIND = functionBindNative;

	var bind$1 = uncurryThis$3(uncurryThis$3.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind$1(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var bind = functionBindContext;
	var uncurryThis$2 = functionUncurryThis;
	var IndexedObject = indexedObject;
	var toObject = toObject$3;
	var lengthOfArrayLike = lengthOfArrayLike$3;
	var arraySpeciesCreate = arraySpeciesCreate$2;

	var push = uncurryThis$2([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = IndexedObject(O);
	    var boundFunction = bind(callbackfn, that);
	    var length = lengthOfArrayLike(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$1(7)
	};

	var fails$1 = fails$d;

	var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$1(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict = arrayMethodIsStrict$1;

	var STRICT_METHOD = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var global$2 = global$c;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty = createNonEnumerableProperty$3;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  if (DOMIterables[COLLECTION_NAME]) {
	    handlePrototype(global$2[COLLECTION_NAME] && global$2[COLLECTION_NAME].prototype);
	  }
	}

	handlePrototype(DOMTokenListPrototype);

	// a string of all valid unicode whitespaces
	var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$1 = functionUncurryThis;
	var requireObjectCoercible = requireObjectCoercible$4;
	var toString$1 = toString$4;
	var whitespaces$1 = whitespaces$2;

	var replace = uncurryThis$1(''.replace);
	var whitespace = '[' + whitespaces$1 + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod = function (TYPE) {
	  return function ($this) {
	    var string = toString$1(requireObjectCoercible($this));
	    if (TYPE & 1) string = replace(string, ltrim, '');
	    if (TYPE & 2) string = replace(string, rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod(3)
	};

	var global$1 = global$c;
	var fails = fails$d;
	var uncurryThis = functionUncurryThis;
	var toString = toString$4;
	var trim = stringTrim.trim;
	var whitespaces = whitespaces$2;

	var $parseInt$1 = global$1.parseInt;
	var Symbol$1 = global$1.Symbol;
	var ITERATOR = Symbol$1 && Symbol$1.iterator;
	var hex = /^[+-]?0x/i;
	var exec = uncurryThis(hex.exec);
	var FORCED = $parseInt$1(whitespaces + '08') !== 8 || $parseInt$1(whitespaces + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR && !fails(function () { $parseInt$1(Object(ITERATOR)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED ? function parseInt(string, radix) {
	  var S = trim(toString(string));
	  return $parseInt$1(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10));
	} : $parseInt$1;

	var $ = _export;
	var $parseInt = numberParseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	$({ global: true, forced: parseInt != $parseInt }, {
	  parseInt: $parseInt
	});

	var Selector$1 = {
	  DATA_MOUNT: '[data-mount="fixed-sticky"]',
	  SHOW_STUCK: '.sticky-show-stuck',
	  HIDE_STUCK: '.sticky-hide-stuck'
	};
	var ClassName = {
	  STICKY: 'fixed-sticky',
	  SENTINEL: 'sticky-sentinel',
	  STUCK: 'stuck',
	  GET_HEIGHT: 'get-height',
	  STICKY_TOP: 'sticky-direction-top',
	  STICKY_BOTTOM: 'sticky-direction-bottom'
	};
	var Attribute = {
	  DATA_DIRECTION: 'data-direction',
	  DATA_OBSERVER_BEHAVIOR: 'data-observer-behavior',
	  DATA_SMOOTH_TRANSITION: 'data-smooth-transition'
	};
	var Direction = {
	  TOP: 'top',
	  BOTTOM: 'bottom'
	};
	var EventName$1 = {
	  ON_STUCK: 'onSticky',
	  ON_UNSTUCK: 'onStatic',
	  ON_UPDATE: 'onUpdate',
	  ON_REMOVE: 'onRemove',
	  FOCUS_IN: 'focusin',
	  RESIZE: 'resize'
	};
	var Default = {
	  DIRECTION: 'top'
	};

	/**
	 * @enum {string}
	 */
	var ObserverBehavior = {
	  ALWAYS: 'always',
	  OFF: 'off',
	  SIZE_AWARE: 'size-aware'
	};
	var stickies = [];

	/**
	 * Private functions.
	 */

	/**
	 * Check for the `data-smooth-transition` attribute.
	 * Its presence makes this option `true` unless the value is specifically set to `false`
	 * @param {HTMLElement} node - The element to check for the attribute `data-smooth-transition`
	 * @returns {Boolean} return false if contentDivTarget is null
	 */
	function _hasSmoothTransition(node) {
	  if (node.hasAttribute(Attribute.DATA_SMOOTH_TRANSITION) && node.dataset.smoothTransition !== 'false') {
	    return true;
	  }
	  return false;
	}

	/**
	 * Get the direction of the sticky.
	 * @param {string} str - The string to parse.
	 * @param {string} [defaultValue=top] - The default value to fallback to.
	 * @returns {string} The direction of the sticky.
	 */
	function _getDirection(str, defaultValue) {
	  if (defaultValue === void 0) {
	    defaultValue = Default.DIRECTION;
	  }
	  switch (str) {
	    case 'top':
	    case 'bottom':
	      return str;
	    default:
	      return defaultValue;
	  }
	}

	/**
	 * Handle intersection observer
	 * @this FixedSticky
	 */
	function _onStickyChange() {
	  this.el.classList.toggle(ClassName.STUCK, this.isStuck);
	  _updateContentDivSpacing.bind(this)();
	  _updateScrollPadding.bind(this)();
	}

	/**
	 * Update margin spacing on the element before/after the sticky bar so that overlapping
	 * does not occur when the page bar is fixed. Remove property if it is not stuck
	 * @this FixedSticky
	 */
	function _updateContentDivSpacing() {
	  if (this.contentDivTarget === null) {
	    return;
	  }
	  var adjustNextElementSpacing = this.stickyElementHeight + this.contentDivTargetSpacing;
	  if (this.rootMarginOffset !== 0) {
	    adjustNextElementSpacing -= this.rootMarginOffset;
	  }
	  if (this.isStuck) {
	    this.contentDivTarget.style.setProperty(this.styleProp, adjustNextElementSpacing + 'px', 'important');
	  } else {
	    this.contentDivTarget.style.setProperty(this.styleProp, '');
	  }
	}

	/**
	 * Updates scroll padding so that elements scrolled into view don't stay behind
	 * @this FixedSticky
	 */
	function _updateScrollPadding(removeScrollPadding) {
	  var htmlElement = document.querySelector('html');
	  this.stickyElementHeight = this.el.getBoundingClientRect().height;
	  if (removeScrollPadding) {
	    htmlElement.style.scrollPaddingTop = '0';
	    htmlElement.style.scrollPaddingBottom = '0';
	  }
	  if (this.direction === Direction.TOP) {
	    if (this.isStuck) {
	      htmlElement.style.scrollPaddingTop = this.stickyElementHeight + this.extraScrollPaddingPx + 'px';
	    } else {
	      htmlElement.style.scrollPaddingTop = this.stickyElementHeight + this.rootMarginOffset + this.extraScrollPaddingPx + 'px';
	    }
	  } else if (this.direction === Direction.BOTTOM) {
	    if (this.isStuck) {
	      htmlElement.style.scrollPaddingBottom = this.stickyElementHeight + this.extraScrollPaddingPx + 'px';
	    } else {
	      htmlElement.style.scrollPaddingBottom = this.stickyElementHeight + this.rootMarginOffset + this.extraScrollPaddingPx + 'px';
	    }
	  }
	}

	/**
	 * Triggers a boundary check when focus changes to handle edge cases where Intersection Observer does not fire
	 * Uses focusin because focus does not bubble
	 * @this FixedSticky
	 */
	function _onFocusin() {
	  if (this.enableObserver) {
	    this.isStuck = this.doesSentinelExceedBoundary();
	    this.el.classList.toggle(ClassName.STUCK, this.isStuck);
	    _updateScrollPadding.bind(this)();
	  }
	}

	/**
	  Calculate whether the height of the sticky has exceeded 33% of the viewport height based on height of the sticky's hidden elements and the height of the sticky's visible elements.
	  @returns {boolean} Whether the height of the sticky has exceeded 33% of the viewport height.
	  @this FixedSticky
	*/
	function _stickyExceedsAcceptedHeight() {
	  // Subtracting two additional pixels based on a border that is toggled based on visibility.
	  return (this.hiddenElementsHeight + this.visibleElementsHeight - 2) / window.innerHeight > 0.33;
	}

	/**
	  Set the status of the sticky observer,
	  dependent on configuration and/or height condition
	  @this FixedSticky
	*/
	function _setObserver() {
	  switch (this.observerBehavior) {
	    case ObserverBehavior.OFF:
	      this.setObserverStatus(false);
	      break;
	    case ObserverBehavior.ALWAYS:
	      this.setObserverStatus(true);
	      break;
	    default:
	      if (_stickyExceedsAcceptedHeight.call(this)) {
	        this.setObserverStatus(false);
	      } else {
	        this.setObserverStatus(true);
	      }
	  }
	}

	/**
	 * Validate observer behavior or fall back to default
	 * @param {string} [option] - configuration for observerBehavior
	 * @returns {ObserverBehavior}
	 * @this FixedSticky
	 */
	function _getObserverBehavior(option) {
	  // TODO: remove in v2 - deprecated as of v1.14.0
	  // handle previous `enableObserver: false` and override
	  if (this.enableObserverInitial === false) {
	    return ObserverBehavior.OFF;
	  }
	  var isValid = function isValid(behavior) {
	    return Object.values(ObserverBehavior).includes(behavior);
	  };
	  if (option && isValid(option)) {
	    return option;
	  }
	  if (isValid(this.el.dataset.observerBehavior)) {
	    return this.el.dataset.observerBehavior;
	  }
	  return ObserverBehavior.SIZE_AWARE;
	}

	/**
	  Calculate the combined height of all ".sticky-show-stuck" elements.
	  @returns {number} Combined height of all ".sticky-show-stuck" elements.
	  @this FixedSticky
	*/
	function _getShowStuckHeight() {
	  var _this = this;
	  var hiddenHeight = 0;
	  // Calculate the height of hidden elements when not stuck
	  var showStuck = this.el.querySelectorAll(Selector$1.SHOW_STUCK);
	  if (showStuck && showStuck instanceof NodeList) {
	    // Get the height of all hidden elements
	    showStuck.forEach(function (el, index, list) {
	      hiddenHeight += window.mwf.Util.getElementOuterHeight(el, {
	        cssSelectors: ['margin', 'padding']
	      });
	      // If this is the last item in the node list, remove the CSS hack that displays hidden elements
	      if (index === list.length - 1) {
	        _this.el.classList.remove(ClassName.GET_HEIGHT);
	      }
	    });
	  }
	  return hiddenHeight;
	}

	/**
	  Calculate the height of hidden and visible elements.
	  @returns {Object} Object containing height of hidden and visible elements.
	  @this FixedSticky
	*/
	function _calculateHeights() {
	  this.el.classList.add(ClassName.GET_HEIGHT);
	  var hiddenHeight = _getShowStuckHeight.call(this);
	  var visibleHeight = this.el.offsetHeight;
	  this.el.classList.remove(ClassName.GET_HEIGHT);
	  return {
	    hidden: hiddenHeight,
	    visible: visibleHeight
	  };
	}

	/**
	 * Set value of instances members and DOM node properties depending on the direction instance member
	 * @this FixedSticky
	 */
	function _setDirectionalProps() {
	  if (this.direction === Direction.BOTTOM) {
	    this.el.style.top = null; // prevent interference
	    this.el.style.bottom = '0';
	    this.contentDivTarget = this.el.previousElementSibling;
	    this.contentDivTargetSpacing = this.contentDivTarget ? parseInt(getComputedStyle(this.contentDivTarget).paddingBottom, 10) + parseInt(getComputedStyle(this.contentDivTarget).marginBottom, 10) : 0;
	    this.styleProp = 'margin-bottom';
	    this.el.classList.add(ClassName.STICKY_BOTTOM);
	    this.el.classList.remove(ClassName.STICKY_TOP);
	  } else {
	    // Assume direction is Direction.TOP
	    this.el.style.bottom = null;
	    this.el.style.top = '0';
	    this.contentDivTarget = this.el.nextElementSibling;
	    this.contentDivTargetSpacing = this.contentDivTarget ? parseInt(getComputedStyle(this.contentDivTarget).paddingTop, 10) + parseInt(getComputedStyle(this.contentDivTarget).marginTop, 10) : 0;
	    this.styleProp = 'margin-top';
	    this.el.classList.add(ClassName.STICKY_TOP);
	    this.el.classList.remove(ClassName.STICKY_BOTTOM);
	  }
	}

	/**
	 * Create a new observer instance member, disconnecting the old one if present. Instance member sentinel must already exist
	 * @this FixedSticky
	 */
	function _createObserver() {
	  var _this2 = this;
	  if (this.observer) {
	    this.observer.disconnect();
	  }

	  // If smooth transition is enabled, the`rootMarginOffset` value should reflect the combined height
	  // of all elements hidden prior to the sticky becoming stuck. Adding this value to the rootMargin option
	  // of the intersection observer will allow for the sticky to activate sooner, resulting in a more
	  // seamless transition
	  var observerOptions = {
	    rootMargin: "-" + this.rootMarginOffset + "px 0px 0px 0px"
	  };
	  var onStickyChange = _onStickyChange.bind(this);
	  this.observer = new IntersectionObserver(function (entries) {
	    // fire onStickyChange if not in viewport
	    if (_this2.enableObserver) {
	      var prevState = _this2.isStuck;
	      _this2.isStuck = _this2.doesSentinelExceedBoundary() && !entries[0].isIntersecting;

	      // Check if sticky has changed state from unstuck to stuck and vice versa
	      // in order to trigger custom events
	      if (typeof prevState !== 'undefined' && prevState !== _this2.isStuck) {
	        if (_this2.isStuck) {
	          // Create and dispatch custom event
	          _this2[EventName$1.ON_STUCK] = new CustomEvent(EventName$1.ON_STUCK, {
	            bubbles: true
	          });
	          _this2.el.dispatchEvent(_this2[EventName$1.ON_STUCK]);
	        } else {
	          // Create and dispatch custom event
	          _this2[EventName$1.ON_UNSTUCK] = new CustomEvent(EventName$1.ON_UNSTUCK, {
	            bubbles: true
	          });
	          _this2.el.dispatchEvent(_this2[EventName$1.ON_UNSTUCK]);
	        }
	      }
	      onStickyChange();
	    }
	  }, observerOptions);
	  if (this.sentinel) {
	    this.observer.observe(this.sentinel);
	  }
	}

	/**
	 * Helper function to clear key properties of an instance
	 * @this FixedSticky
	 */
	function _teardownInstance() {
	  window.mwf.Util.removeEvents(this.events);

	  // remove the attribute from the element
	  this.el.classList.remove(ClassName.STICKY);
	  _updateScrollPadding.call(this, [true]);
	  // remove sticky-sentinel element
	  this.sentinel.remove();
	  // disconnect observer
	  this.observer.disconnect();
	}

	/**
	 * Class representing a Sticky Element.
	 */
	var FixedSticky = /*#__PURE__*/function () {
	  /**
	   * Create the Sticky Element
	   * @param {Object} opts - The Sticky Element options.
	   * @param {HTMLElement} opts.el - The Sticky Element DOM node.
	   * @param {string} opts.direction - Whether the Sticky element sticks to the top when scrolled below a certain point (TOP) or sticks to the bottom when scrolled above a certain point (BOTTOM). If not defined, will attempt to read `data-direction` attribute, then defaults TOP
	   * @param {boolean} opts.enableSmoothTransition - Whether to enable a smoother transition to hiding/showing elements as the sticky become stuck. If not defined, will attempt to read `data-smooth-transition` attribute, defaults to false
	   * @param {boolean} opts.enableObserver - deprecated: enable the observer on initialization (defaults to true)
	   * @param {ObserverBehavior} opts.observerBehavior - the behavior of the intersection observer to toggle stuck/unstuck states
	   * @param {number} opts.extraScrollPaddingPx - Extra scroll padding to reduce crowding into sticky bars, defaults to 12px, same as minimal gutters
	   */
	  function FixedSticky(opts) {
	    this.el = opts.el;
	    this.direction = _getDirection(opts.direction || this.el.dataset.direction);
	    this.enableSmoothTransition = typeof opts.enableSmoothTransition === 'boolean' ? opts.enableSmoothTransition : _hasSmoothTransition(this.el);
	    this.extraScrollPaddingPx = typeof opts.extraScrollPaddingPx === 'number' ? opts.extraScrollPaddingPx : 12;
	    this.enableObserver = opts.enableObserver !== false;
	    // Saves the initial value of enable observer status from construction. Is used to flag whether the sticky should be automatically disabled when the height of the sticky exceeds 33% of the viewport
	    // TODO: remove in v2 - deprecated as of v1.14.0
	    this.enableObserverInitial = this.enableObserver;
	    this.observerBehavior = _getObserverBehavior.call(this, opts.observerBehavior);

	    // Add "sticky" class only while initialized to attach style and functionality provided by CSS
	    // Set prior to all height calculations so that styles are applied first
	    this.el.classList.add(ClassName.STICKY);

	    // HTML element with the property data-mount="sticky"
	    // Create a property to hold the value for the sticky element height to be reused in both the _updateContentDivSpacing and _updateScrollPadding functions.
	    this.stickyElementHeight = 0;

	    // Set properties based on the anchor direction
	    this.contentDivTarget = null;
	    this.contentDivTargetSpacing = 0;
	    this.styleProp = '';
	    _setDirectionalProps.call(this);

	    // Add event handlers
	    this.events = [{
	      el: document.body,
	      type: EventName$1.FOCUS_IN,
	      handler: _onFocusin.bind(this)
	    }, {
	      el: window,
	      type: EventName$1.RESIZE,
	      handler: throttle(200, _updateScrollPadding.bind(this))
	    }, {
	      el: window,
	      type: EventName$1.RESIZE,
	      handler: debounce(300, _setObserver.bind(this)),
	      options: {
	        passive: true
	      }
	    }];
	    window.mwf.Util.addEvents(this.events);
	    var _calculateHeights$cal = _calculateHeights.call(this),
	      hiddenElementsHeight = _calculateHeights$cal.hidden,
	      visibleElementsHeight = _calculateHeights$cal.visible;
	    // Adjusts where the sentinel to the intersection observer triggers. Expected to be 0 if smooth transition is disabled.
	    this.rootMarginOffset = this.enableSmoothTransition ? hiddenElementsHeight : 0;
	    this.hiddenElementsHeight = hiddenElementsHeight;
	    this.visibleElementsHeight = visibleElementsHeight;
	    this.sentinel = document.createElement('div');
	    this.sentinel.classList.add(ClassName.SENTINEL);
	    this.el.insertAdjacentElement('beforebegin', this.sentinel);
	    this.isStuck = false;
	    this.observer = null;
	    _createObserver.call(this);
	    _setObserver.call(this);
	    stickies.push(this);
	  }

	  /**
	   * Check if the sentinel Exceeds the boundary
	   * @returns {boolean} State of sentinel boundary
	   */
	  var _proto = FixedSticky.prototype;
	  _proto.doesSentinelExceedBoundary = function doesSentinelExceedBoundary() {
	    var sentinelRect = this.sentinel.getBoundingClientRect();
	    var sentinelTop = sentinelRect.top - this.rootMarginOffset;
	    var sentinelBottom = sentinelRect.bottom;
	    if (this.direction === Direction.TOP && sentinelTop < 0) {
	      return true;
	    }
	    if (this.direction === Direction.BOTTOM && sentinelBottom > window.innerHeight) {
	      return true;
	    }
	    return false;
	  }

	  /**
	   * Set the status (enabled/disabled) of the intersection observer
	   * @param {boolean} status The status to set
	   */;
	  _proto.setObserverStatus = function setObserverStatus(status) {
	    if (this.doesSentinelExceedBoundary()) {
	      _updateScrollPadding.call(this);
	      if (status) {
	        this.el.classList.add(ClassName.STUCK);
	      } else {
	        this.el.classList.remove(ClassName.STUCK);
	      }
	    }
	    this.enableObserver = status;
	  }

	  /**
	   * Updates key aspects the instance
	   * @param {Object} opts - The Sticky options.
	   * @param {string} [opts.direction] - Whether the Sticky element sticks to the top when scrolled below a certain point (TOP) or sticks to the bottom when scrolled above a certain point (BOTTOM). If not defined, will maintain current setting
	   * @param {boolean} [opts.enableSmoothTransition] - Whether to enable a smoother transition to hiding/showing elements as the sticky become stuck. If not defined, will maintain current setting
	   * @param {number} [opts.extraScrollPaddingPx] - Extra scroll padding to reduce crowding into sticky bars. If not define, will maintain current setting
	   * @param {ObserverBehavior} [opts.observerBehavior] - the behavior of the intersection observer to toggle stuck/unstuck states
	   */;
	  _proto.update = function update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    var updateDirection = typeof opts.direction === 'string' ? _getDirection(opts.direction) : this.direction;
	    var updateEnableSmoothTransition = typeof opts.enableSmoothTransition === 'boolean' ? opts.enableSmoothTransition : this.enableSmoothTransition;
	    var updateExtraScrollPaddingPx = typeof opts.extraScrollPaddingPx === 'number' ? opts.extraScrollPaddingPx : this.extraScrollPaddingPx;
	    var _calculateHeights$cal2 = _calculateHeights.call(this),
	      updateHiddenElementsHeight = _calculateHeights$cal2.hidden,
	      updateVisibleElementsHeight = _calculateHeights$cal2.visible;

	    // update visibleElementsHeight for future calculations
	    this.visibleElementsHeight = updateVisibleElementsHeight;

	    // Set properties based on the anchor direction if changed
	    if (this.direction !== updateDirection) {
	      this.direction = updateDirection;
	      _setDirectionalProps.call(this);

	      // need to update scroll padding if direction changes
	      this.extraScrollPaddingPx = updateExtraScrollPaddingPx;
	      _updateScrollPadding.call(this, [true]);
	    }

	    // update scroll padding if extraScrollPaddingPx updated but direction not updated
	    if (this.extraScrollPaddingPx !== updateExtraScrollPaddingPx) {
	      this.extraScrollPaddingPx = updateExtraScrollPaddingPx;
	      _updateScrollPadding.call(this, [true]);
	    }

	    // update observer if smooth transition has changed, or hiddenElementsHeight has changed
	    if (this.enableSmoothTransition !== updateEnableSmoothTransition || this.hiddenElementsHeight !== updateHiddenElementsHeight) {
	      this.enableSmoothTransition = updateEnableSmoothTransition;
	      this.hiddenElementsHeight = updateHiddenElementsHeight;
	      this.rootMarginOffset = this.enableSmoothTransition ? updateHiddenElementsHeight : 0;
	      _createObserver.call(this);
	    }
	    if (opts.observerBehavior) {
	      this.observerBehavior = _getObserverBehavior.call(this, opts.observerBehavior);
	    }
	    _setObserver.call(this);

	    // Create and dispatch custom event
	    this[EventName$1.ON_UPDATE] = new CustomEvent(EventName$1.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$1.ON_UPDATE]);
	    return this;
	  }

	  /**
	   * Remove the sticky.
	   */;
	  _proto.remove = function remove() {
	    _teardownInstance.call(this);
	    // remove this sticky reference from array of instances
	    var index = stickies.indexOf(this);
	    stickies.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName$1.ON_REMOVE] = new CustomEvent(EventName$1.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName$1.ON_REMOVE]);
	  }

	  /**
	   * Get an array of sticky instances.
	   * @returns {Object[]} Array of sticky instances.
	   */;
	  FixedSticky.getInstances = function getInstances() {
	    return stickies;
	  };
	  return FixedSticky;
	}();

	var backToTopInstances = [];
	var Selector = {
	  DATA_MOUNT: '[data-mount="fixed-back-to-top"]'
	};
	var EventName = {
	  SCROLL: 'scroll',
	  ON_REMOVE: 'onRemove',
	  ON_RESIZE: 'resize',
	  ON_UPDATE: 'onUpdate'
	};
	var Attributes = {
	  TABINDEX: 'tabindex'
	};
	var DISPLAY_BUTTON_THRESHOLD = 0.7; // percentage of the page where button will display
	var initialPageLoad = true;

	/**
	 * Switch the back to top element between static and sticky
	 */
	function _scrollListener() {
	  var _this = this;
	  // use offset margin and subtract the top position of the sentinel
	  var offsetWithSentinel = this.stickyElement.sentinel.offsetTop - this.offsetMarginTop;
	  var scrollY = window.scrollY || window.pageYOffset;
	  if (scrollY > offsetWithSentinel) {
	    this.stickyElement.setObserverStatus(true);
	    this.el.style.opacity = 1;
	  } else {
	    var timeout = initialPageLoad ? 0 : 175; // prevent button flashing on page load
	    this.el.style.opacity = 0;
	    setTimeout(function () {
	      _this.el.classList.remove(ClassName.STUCK);
	      _this.stickyElement.enableObserver = false;
	    }, timeout);
	    initialPageLoad = false;
	  }
	}

	/**
	 * Update sticky offset margin top value when browser height changes
	 * and remove/create new sticky element
	 */
	function _onWindowResize() {
	  // extra conditional check to prevent code from constantly running on resize
	  if (this.offsetMarginTop !== window.mwf.Util.getDocumentHeight() * DISPLAY_BUTTON_THRESHOLD) {
	    this.offsetMarginTop = window.mwf.Util.getDocumentHeight() * DISPLAY_BUTTON_THRESHOLD;
	    this.stickyElement.remove();
	    this.stickyElement = new FixedSticky({
	      el: this.el,
	      direction: Direction.BOTTOM
	    });
	  }
	}

	/**
	 * Class representing Back to Top.
	 */
	var FixedBackToTop = /*#__PURE__*/function () {
	  /**
	   * Create the Back to Top.
	   * @param {Object} opts - The Back to Top options.
	   * @param {Node} opts.el - The Back to Top DOM node.
	   * @param {number} [opts.offsetMarginTop] - Offset in pixels from top of page where Back to Top should begin to be sticky.
	   * @param {Function} [opts.onScroll] - Function to override the scroll event handler.
	   * @param {Function} [opts.onWindowResize] - Function to override the window resize event handler.
	   */
	  function FixedBackToTop(opts) {
	    this.el = opts.el;
	    this.offsetMarginTop = opts.offsetMarginTop || window.mwf.Util.getDocumentHeight() * DISPLAY_BUTTON_THRESHOLD;
	    this.onScroll = opts.onScroll || _scrollListener.bind(this);
	    this.onWindowResize = opts.onWindowResize || _onWindowResize.bind(this);
	    this.setTabindex();

	    // Create custom events
	    backToTopInstances.push(this);
	    this.stickyElement = new FixedSticky({
	      el: this.el,
	      direction: Direction.BOTTOM
	    });

	    // Do the initial firing of the listener to set the state
	    this.onScroll();

	    // attach event listeners
	    this.events = {
	      scrollEvent: {
	        el: document,
	        type: EventName.SCROLL,
	        handler: throttle(200, this.onScroll),
	        options: {
	          passive: true
	        }
	      },
	      resizeEvent: {
	        el: window,
	        type: EventName.ON_RESIZE,
	        handler: throttle(200, this.onWindowResize)
	      }
	    };
	    window.mwf.Util.addEvents(Object.values(this.events));
	  }

	  /**
	   * Check if the element needs a tabindex and set it
	   */
	  var _proto = FixedBackToTop.prototype;
	  _proto.setTabindex = function setTabindex() {
	    var link = this.el.querySelector('a');
	    var href = link.getAttribute('href');
	    var targetElement = document.querySelector(href);
	    var isElementFound = document.querySelector(href) !== null;
	    if (isElementFound &&
	    // Only do something if the element is not tabbable
	    !window.mwf.Util.isElementTabbable(targetElement)) {
	      var tabindex = targetElement.getAttribute(Attributes.TABINDEX);
	      // If we don't have a tabindex
	      if (tabindex === null) {
	        // Set the tabindex of the element to -1
	        targetElement.setAttribute(Attributes.TABINDEX, '-1');
	      }
	    }
	  }

	  /**
	   * Update the Back to Top.
	   * @param {Object} [opts] - The Back to Top options.
	   * @param {number} [opts.offsetMarginTop] - Offset in pixels from top of page where Back to Top should begin to be sticky.
	   * @param {Function} [opts.onScroll] - Function to override the scroll event handler.
	   * @param {Function} [opts.onWindowResize] - Function to override the window resize event handler.
	   */;
	  _proto.update = function update(opts) {
	    if (opts === void 0) {
	      opts = {};
	    }
	    if (opts.offsetMarginTop) {
	      this.offsetMarginTop = opts.offsetMarginTop;
	    }
	    if (opts.onScroll) {
	      window.mwf.Util.removeEvents([this.events.scrollEvent]);
	      this.onScroll = opts.onScroll;
	      window.mwf.Util.addEvents([this.events.scrollEvent]);
	    }
	    if (opts.onWindowResize) {
	      window.mwf.Util.removeEvents([this.events.resizeEvent]);
	      this.onWindowResize = opts.onWindowResize;
	      window.mwf.Util.addEvents([this.events.resizeEvent]);
	    }

	    // Do the initial firing of the listener to set the state
	    this.onScroll();

	    // Create and dispatch custom event
	    this[EventName.ON_UPDATE] = new CustomEvent(EventName.ON_UPDATE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName.ON_UPDATE]);
	  }

	  /**
	   * Remove the event listener from the back to top element
	   */;
	  _proto.remove = function remove() {
	    window.mwf.Util.removeEvents(Object.values(this.events));
	    this.stickyElement.remove();

	    // remove this back to top reference from array of instances
	    var index = backToTopInstances.indexOf(this);
	    backToTopInstances.splice(index, 1);

	    // Create and dispatch custom event
	    this[EventName.ON_REMOVE] = new CustomEvent(EventName.ON_REMOVE, {
	      bubbles: true
	    });
	    this.el.dispatchEvent(this[EventName.ON_REMOVE]);
	  }

	  /**
	   * Get back to top instances.
	   * @returns {Object[]} Array of back to top instances
	   */;
	  FixedBackToTop.getInstances = function getInstances() {
	    return backToTopInstances;
	  };
	  return FixedBackToTop;
	}();

	var PLUGIN_INITIALIZED = 'mwfFixedStickyInitialized';
	document.addEventListener('mwfInitialized', function () {
	  window.mwf.Util.initializeComponent(Selector.DATA_MOUNT, function (el) {
	    return new FixedBackToTop({
	      el: el
	    });
	  });
	  window.mwf.Util.initializeComponent(Selector$1.DATA_MOUNT, function (el) {
	    return new FixedSticky({
	      el: el
	    });
	  });
	  document.dispatchEvent(new CustomEvent(PLUGIN_INITIALIZED));
	});

	exports.FixedBackToTop = FixedBackToTop;
	exports.FixedSticky = FixedSticky;

	Object.defineProperty(exports, '__esModule', { value: true });

}));

