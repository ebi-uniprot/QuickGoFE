function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator2(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf3(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf2(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf2(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _possibleConstructorReturn2(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized2(self); }

function _assertThisInitialized2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get2(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get2 = Reflect.get; } else { _get2 = function _get(target, property, receiver) { var base = _superPropBase2(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get2(target, property, receiver || target); }

function _superPropBase2(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf3(object); if (object === null) break; } return object; }

function _getPrototypeOf3(o) { _getPrototypeOf3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf3(o); }

function _inherits2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2(subClass, superClass); }

function _setPrototypeOf2(o, p) { _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf2(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */


  var runtime = function (exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;
              return next;
            };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" ? module.exports : {});

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */


  var directives = new WeakMap();

  var isDirective = function isDirective(o) {
    return typeof o === 'function' && directives.has(o);
  };
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * True if the custom elements polyfill is in use.
   */


  var isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
  /**
   * Removes nodes, starting from `startNode` (inclusive) to `endNode`
   * (exclusive), from `container`.
   */

  var removeNodes = function removeNodes(container, startNode) {
    var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var node = startNode;

    while (node !== endNode) {
      var n = node.nextSibling;
      container.removeChild(node);
      node = n;
    }
  };
  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * A sentinel value that signals that a value was handled by a directive and
   * should not be written to the DOM.
   */


  var noChange = {};
  /**
   * A sentinel value that signals a NodePart to fully clear its content.
   */

  var nothing = {};
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * An expression marker with embedded unique key to avoid collision with
   * possible text in templates.
   */

  var marker = "{{lit-".concat(String(Math.random()).slice(2), "}}");
  /**
   * An expression marker used text-positions, multi-binding attributes, and
   * attributes with markup-like text values.
   */

  var nodeMarker = "<!--".concat(marker, "-->");
  var markerRegex = new RegExp("".concat(marker, "|").concat(nodeMarker));
  /**
   * Suffix appended to all bound attribute names.
   */

  var boundAttributeSuffix = '$lit$';
  /**
   * An updateable Template that tracks the location of dynamic parts.
   */

  var Template = function Template(result, element) {
    var _this4 = this;

    _classCallCheck2(this, Template);

    this.parts = [];
    this.element = element;
    var index = -1;
    var partIndex = 0;
    var nodesToRemove = [];

    var _prepareTemplate = function _prepareTemplate(template) {
      var content = template.content; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
      // null

      var walker = document.createTreeWalker(content, 133
        /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
        , null, false); // Keeps track of the last index associated with a part. We try to delete
      // unnecessary nodes, but we never want to associate two different parts
      // to the same index. They must have a constant node between.

      var lastPartIndex = 0;

      while (walker.nextNode()) {
        index++;
        var node = walker.currentNode;

        if (node.nodeType === 1
        /* Node.ELEMENT_NODE */
        ) {
          if (node.hasAttributes()) {
            var attributes = node.attributes; // Per
            // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
            // attributes are not guaranteed to be returned in document order.
            // In particular, Edge/IE can return them out of order, so we cannot
            // assume a correspondance between part index and attribute index.

            var count = 0;

            for (var i = 0; i < attributes.length; i++) {
              if (attributes[i].value.indexOf(marker) >= 0) {
                count++;
              }
            }

            while (count-- > 0) {
              // Get the template literal section leading up to the first
              // expression in this attribute
              var stringForPart = result.strings[partIndex]; // Find the attribute name

              var name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
              // All bound attributes have had a suffix added in
              // TemplateResult#getHTML to opt out of special attribute
              // handling. To look up the attribute value we also need to add
              // the suffix.

              var attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
              var attributeValue = node.getAttribute(attributeLookupName);
              var strings = attributeValue.split(markerRegex);

              _this4.parts.push({
                type: 'attribute',
                index: index,
                name: name,
                strings: strings
              });

              node.removeAttribute(attributeLookupName);
              partIndex += strings.length - 1;
            }
          }

          if (node.tagName === 'TEMPLATE') {
            _prepareTemplate(node);
          }
        } else if (node.nodeType === 3
        /* Node.TEXT_NODE */
        ) {
          var data = node.data;

          if (data.indexOf(marker) >= 0) {
            var parent = node.parentNode;

            var _strings = data.split(markerRegex);

            var lastIndex = _strings.length - 1; // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts

            for (var _i = 0; _i < lastIndex; _i++) {
              parent.insertBefore(_strings[_i] === '' ? createMarker() : document.createTextNode(_strings[_i]), node);

              _this4.parts.push({
                type: 'node',
                index: ++index
              });
            } // If there's no text, we must insert a comment to mark our place.
            // Else, we can trust it will stick around after cloning.


            if (_strings[lastIndex] === '') {
              parent.insertBefore(createMarker(), node);
              nodesToRemove.push(node);
            } else {
              node.data = _strings[lastIndex];
            } // We have a part for each match found


            partIndex += lastIndex;
          }
        } else if (node.nodeType === 8
        /* Node.COMMENT_NODE */
        ) {
          if (node.data === marker) {
            var _parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
            // the following are true:
            //  * We don't have a previousSibling
            //  * The previousSibling is already the start of a previous part

            if (node.previousSibling === null || index === lastPartIndex) {
              index++;

              _parent.insertBefore(createMarker(), node);
            }

            lastPartIndex = index;

            _this4.parts.push({
              type: 'node',
              index: index
            }); // If we don't have a nextSibling, keep this node so we have an end.
            // Else, we can remove it to save future costs.


            if (node.nextSibling === null) {
              node.data = '';
            } else {
              nodesToRemove.push(node);
              index--;
            }

            partIndex++;
          } else {
            var _i2 = -1;

            while ((_i2 = node.data.indexOf(marker, _i2 + 1)) !== -1) {
              // Comment node has a binding marker inside, make an inactive part
              // The binding won't work, but subsequent bindings will
              // TODO (justinfagnani): consider whether it's even worth it to
              // make bindings in comments work
              _this4.parts.push({
                type: 'node',
                index: -1
              });
            }
          }
        }
      }
    };

    _prepareTemplate(element); // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (var _i3 = 0; _i3 < nodesToRemove.length; _i3++) {
      var n = nodesToRemove[_i3];
      n.parentNode.removeChild(n);
    }
  };

  var isTemplatePartActive = function isTemplatePartActive(part) {
    return part.index !== -1;
  }; // Allows `document.createComment('')` to be renamed for a
  // small manual size-savings.


  var createMarker = function createMarker() {
    return document.createComment('');
  };
  /**
   * This regex extracts the attribute name preceding an attribute-position
   * expression. It does this by matching the syntax allowed for attributes
   * against the string literal directly preceding the expression, assuming that
   * the expression is in an attribute-value position.
   *
   * See attributes in the HTML spec:
   * https://www.w3.org/TR/html5/syntax.html#attributes-0
   *
   * "\0-\x1F\x7F-\x9F" are Unicode control characters
   *
   * " \x09\x0a\x0c\x0d" are HTML space characters:
   * https://www.w3.org/TR/html5/infrastructure.html#space-character
   *
   * So an attribute is:
   *  * The name: any character except a control character, space character, ('),
   *    ("), ">", "=", or "/"
   *  * Followed by zero or more space characters
   *  * Followed by "="
   *  * Followed by zero or more space characters
   *  * Followed by:
   *    * Any character except space, ('), ("), "<", ">", "=", (`), or
   *    * (") then any non-("), or
   *    * (') then any non-(')
   */


  var lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * An instance of a `Template` that can be attached to the DOM and updated
   * with new values.
   */

  var TemplateInstance =
    /*#__PURE__*/
    function () {
      function TemplateInstance(template, processor, options) {
        _classCallCheck2(this, TemplateInstance);

        this._parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
      }

      _createClass2(TemplateInstance, [{
        key: "update",
        value: function update(values) {
          var i = 0;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this._parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var part = _step.value;

              if (part !== undefined) {
                part.setValue(values[i]);
              }

              i++;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this._parts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _part = _step2.value;

              if (_part !== undefined) {
                _part.commit();
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }, {
        key: "_clone",
        value: function _clone() {
          var _this5 = this;

          // When using the Custom Elements polyfill, clone the node, rather than
          // importing it, to keep the fragment in the template's document. This
          // leaves the fragment inert so custom elements won't upgrade and
          // potentially modify their contents by creating a polyfilled ShadowRoot
          // while we traverse the tree.
          var fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
          var parts = this.template.parts;
          var partIndex = 0;
          var nodeIndex = 0;

          var _prepareInstance = function _prepareInstance(fragment) {
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
            // null
            var walker = document.createTreeWalker(fragment, 133
              /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
              , null, false);
            var node = walker.nextNode(); // Loop through all the nodes and parts of a template

            while (partIndex < parts.length && node !== null) {
              var part = parts[partIndex]; // Consecutive Parts may have the same node index, in the case of
              // multiple bound attributes on an element. So each iteration we either
              // increment the nodeIndex, if we aren't on a node with a part, or the
              // partIndex if we are. By not incrementing the nodeIndex when we find a
              // part, we allow for the next part to be associated with the current
              // node if neccessasry.

              if (!isTemplatePartActive(part)) {
                _this5._parts.push(undefined);

                partIndex++;
              } else if (nodeIndex === part.index) {
                if (part.type === 'node') {
                  var _part2 = _this5.processor.handleTextExpression(_this5.options);

                  _part2.insertAfterNode(node.previousSibling);

                  _this5._parts.push(_part2);
                } else {
                  var _this5$_parts;

                  (_this5$_parts = _this5._parts).push.apply(_this5$_parts, _toConsumableArray(_this5.processor.handleAttributeExpressions(node, part.name, part.strings, _this5.options)));
                }

                partIndex++;
              } else {
                nodeIndex++;

                if (node.nodeName === 'TEMPLATE') {
                  _prepareInstance(node.content);
                }

                node = walker.nextNode();
              }
            }
          };

          _prepareInstance(fragment);

          if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
          }

          return fragment;
        }
      }]);

      return TemplateInstance;
    }();
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * The return type of `html`, which holds a Template and the values from
   * interpolated expressions.
   */


  var TemplateResult =
    /*#__PURE__*/
    function () {
      function TemplateResult(strings, values, type, processor) {
        _classCallCheck2(this, TemplateResult);

        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
      }
      /**
       * Returns a string of HTML used to create a `<template>` element.
       */


      _createClass2(TemplateResult, [{
        key: "getHTML",
        value: function getHTML() {
          var endIndex = this.strings.length - 1;
          var html = '';

          for (var i = 0; i < endIndex; i++) {
            var s = this.strings[i]; // This exec() call does two things:
            // 1) Appends a suffix to the bound attribute name to opt out of special
            // attribute value parsing that IE11 and Edge do, like for style and
            // many SVG attributes. The Template class also appends the same suffix
            // when looking up attributes to create Parts.
            // 2) Adds an unquoted-attribute-safe marker for the first expression in
            // an attribute. Subsequent attribute expressions will use node markers,
            // and this is safe since attributes with multiple expressions are
            // guaranteed to be quoted.

            var match = lastAttributeNameRegex.exec(s);

            if (match) {
              // We're starting a new bound attribute.
              // Add the safe attribute suffix, and use unquoted-attribute-safe
              // marker.
              html += s.substr(0, match.index) + match[1] + match[2] + boundAttributeSuffix + match[3] + marker;
            } else {
              // We're either in a bound node, or trailing bound attribute.
              // Either way, nodeMarker is safe to use.
              html += s + nodeMarker;
            }
          }

          return html + this.strings[endIndex];
        }
      }, {
        key: "getTemplateElement",
        value: function getTemplateElement() {
          var template = document.createElement('template');
          template.innerHTML = this.getHTML();
          return template;
        }
      }]);

      return TemplateResult;
    }();
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */


  var isPrimitive = function isPrimitive(value) {
    return value === null || !(_typeof(value) === 'object' || typeof value === 'function');
  };
  /**
   * Sets attribute values for AttributeParts, so that the value is only set once
   * even if there are multiple parts for an attribute.
   */


  var AttributeCommitter =
    /*#__PURE__*/
    function () {
      function AttributeCommitter(element, name, strings) {
        _classCallCheck2(this, AttributeCommitter);

        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];

        for (var i = 0; i < strings.length - 1; i++) {
          this.parts[i] = this._createPart();
        }
      }
      /**
       * Creates a single part. Override this to create a differnt type of part.
       */


      _createClass2(AttributeCommitter, [{
        key: "_createPart",
        value: function _createPart() {
          return new AttributePart(this);
        }
      }, {
        key: "_getValue",
        value: function _getValue() {
          var strings = this.strings;
          var l = strings.length - 1;
          var text = '';

          for (var i = 0; i < l; i++) {
            text += strings[i];
            var part = this.parts[i];

            if (part !== undefined) {
              var v = part.value;

              if (v != null && (Array.isArray(v) || // tslint:disable-next-line:no-any
                typeof v !== 'string' && v[Symbol.iterator])) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                  for (var _iterator3 = v[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var t = _step3.value;
                    text += typeof t === 'string' ? t : String(t);
                  }
                } catch (err) {
                  _didIteratorError3 = true;
                  _iteratorError3 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                      _iterator3.return();
                    }
                  } finally {
                    if (_didIteratorError3) {
                      throw _iteratorError3;
                    }
                  }
                }
              } else {
                text += typeof v === 'string' ? v : String(v);
              }
            }
          }

          text += strings[l];
          return text;
        }
      }, {
        key: "commit",
        value: function commit() {
          if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
          }
        }
      }]);

      return AttributeCommitter;
    }();

  var AttributePart =
    /*#__PURE__*/
    function () {
      function AttributePart(comitter) {
        _classCallCheck2(this, AttributePart);

        this.value = undefined;
        this.committer = comitter;
      }

      _createClass2(AttributePart, [{
        key: "setValue",
        value: function setValue(value) {
          if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value; // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().

            if (!isDirective(value)) {
              this.committer.dirty = true;
            }
          }
        }
      }, {
        key: "commit",
        value: function commit() {
          while (isDirective(this.value)) {
            var directive = this.value;
            this.value = noChange;
            directive(this);
          }

          if (this.value === noChange) {
            return;
          }

          this.committer.commit();
        }
      }]);

      return AttributePart;
    }();

  var NodePart =
    /*#__PURE__*/
    function () {
      function NodePart(options) {
        _classCallCheck2(this, NodePart);

        this.value = undefined;
        this._pendingValue = undefined;
        this.options = options;
      }
      /**
       * Inserts this part into a container.
       *
       * This part must be empty, as its contents are not automatically moved.
       */


      _createClass2(NodePart, [{
        key: "appendInto",
        value: function appendInto(container) {
          this.startNode = container.appendChild(createMarker());
          this.endNode = container.appendChild(createMarker());
        }
        /**
         * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
         * its next sibling must be static, unchanging nodes such as those that appear
         * in a literal section of a template.
         *
         * This part must be empty, as its contents are not automatically moved.
         */

      }, {
        key: "insertAfterNode",
        value: function insertAfterNode(ref) {
          this.startNode = ref;
          this.endNode = ref.nextSibling;
        }
        /**
         * Appends this part into a parent part.
         *
         * This part must be empty, as its contents are not automatically moved.
         */

      }, {
        key: "appendIntoPart",
        value: function appendIntoPart(part) {
          part._insert(this.startNode = createMarker());

          part._insert(this.endNode = createMarker());
        }
        /**
         * Appends this part after `ref`
         *
         * This part must be empty, as its contents are not automatically moved.
         */

      }, {
        key: "insertAfterPart",
        value: function insertAfterPart(ref) {
          ref._insert(this.startNode = createMarker());

          this.endNode = ref.endNode;
          ref.endNode = this.startNode;
        }
      }, {
        key: "setValue",
        value: function setValue(value) {
          this._pendingValue = value;
        }
      }, {
        key: "commit",
        value: function commit() {
          while (isDirective(this._pendingValue)) {
            var directive = this._pendingValue;
            this._pendingValue = noChange;
            directive(this);
          }

          var value = this._pendingValue;

          if (value === noChange) {
            return;
          }

          if (isPrimitive(value)) {
            if (value !== this.value) {
              this._commitText(value);
            }
          } else if (value instanceof TemplateResult) {
            this._commitTemplateResult(value);
          } else if (value instanceof Node) {
            this._commitNode(value);
          } else if (Array.isArray(value) || // tslint:disable-next-line:no-any
            value[Symbol.iterator]) {
            this._commitIterable(value);
          } else if (value === nothing) {
            this.value = nothing;
            this.clear();
          } else {
            // Fallback, will render the string representation
            this._commitText(value);
          }
        }
      }, {
        key: "_insert",
        value: function _insert(node) {
          this.endNode.parentNode.insertBefore(node, this.endNode);
        }
      }, {
        key: "_commitNode",
        value: function _commitNode(value) {
          if (this.value === value) {
            return;
          }

          this.clear();

          this._insert(value);

          this.value = value;
        }
      }, {
        key: "_commitText",
        value: function _commitText(value) {
          var node = this.startNode.nextSibling;
          value = value == null ? '' : value;

          if (node === this.endNode.previousSibling && node.nodeType === 3
          /* Node.TEXT_NODE */
          ) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = value;
          } else {
            this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
          }

          this.value = value;
        }
      }, {
        key: "_commitTemplateResult",
        value: function _commitTemplateResult(value) {
          var template = this.options.templateFactory(value);

          if (this.value instanceof TemplateInstance && this.value.template === template) {
            this.value.update(value.values);
          } else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            var instance = new TemplateInstance(template, value.processor, this.options);

            var fragment = instance._clone();

            instance.update(value.values);

            this._commitNode(fragment);

            this.value = instance;
          }
        }
      }, {
        key: "_commitIterable",
        value: function _commitIterable(value) {
          // For an Iterable, we create a new InstancePart per item, then set its
          // value to the item. This is a little bit of overhead for every item in
          // an Iterable, but it lets us recurse easily and efficiently update Arrays
          // of TemplateResults that will be commonly returned from expressions like:
          // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
          // If _value is an array, then the previous render was of an
          // iterable and _value will contain the NodeParts from the previous
          // render. If _value is not an array, clear this part and make a new
          // array for NodeParts.
          if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
          } // Lets us keep track of how many items we stamped so we can clear leftover
          // items from a previous render


          var itemParts = this.value;
          var partIndex = 0;
          var itemPart;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = value[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var item = _step4.value;
              // Try to reuse an existing part
              itemPart = itemParts[partIndex]; // If no existing part, create a new one

              if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);

                if (partIndex === 0) {
                  itemPart.appendIntoPart(this);
                } else {
                  itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
              }

              itemPart.setValue(item);
              itemPart.commit();
              partIndex++;
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
          }
        }
      }, {
        key: "clear",
        value: function clear() {
          var startNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.startNode;
          removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
        }
      }]);

      return NodePart;
    }();
  /**
   * Implements a boolean attribute, roughly as defined in the HTML
   * specification.
   *
   * If the value is truthy, then the attribute is present with a value of
   * ''. If the value is falsey, the attribute is removed.
   */


  var BooleanAttributePart =
    /*#__PURE__*/
    function () {
      function BooleanAttributePart(element, name, strings) {
        _classCallCheck2(this, BooleanAttributePart);

        this.value = undefined;
        this._pendingValue = undefined;

        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
          throw new Error('Boolean attributes can only contain a single expression');
        }

        this.element = element;
        this.name = name;
        this.strings = strings;
      }

      _createClass2(BooleanAttributePart, [{
        key: "setValue",
        value: function setValue(value) {
          this._pendingValue = value;
        }
      }, {
        key: "commit",
        value: function commit() {
          while (isDirective(this._pendingValue)) {
            var directive = this._pendingValue;
            this._pendingValue = noChange;
            directive(this);
          }

          if (this._pendingValue === noChange) {
            return;
          }

          var value = !!this._pendingValue;

          if (this.value !== value) {
            if (value) {
              this.element.setAttribute(this.name, '');
            } else {
              this.element.removeAttribute(this.name);
            }
          }

          this.value = value;
          this._pendingValue = noChange;
        }
      }]);

      return BooleanAttributePart;
    }();
  /**
   * Sets attribute values for PropertyParts, so that the value is only set once
   * even if there are multiple parts for a property.
   *
   * If an expression controls the whole property value, then the value is simply
   * assigned to the property under control. If there are string literals or
   * multiple expressions, then the strings are expressions are interpolated into
   * a string first.
   */


  var PropertyCommitter =
    /*#__PURE__*/
    function (_AttributeCommitter) {
      _inherits2(PropertyCommitter, _AttributeCommitter);

      function PropertyCommitter(element, name, strings) {
        var _this6;

        _classCallCheck2(this, PropertyCommitter);

        _this6 = _possibleConstructorReturn2(this, _getPrototypeOf3(PropertyCommitter).call(this, element, name, strings));
        _this6.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
        return _this6;
      }

      _createClass2(PropertyCommitter, [{
        key: "_createPart",
        value: function _createPart() {
          return new PropertyPart(this);
        }
      }, {
        key: "_getValue",
        value: function _getValue() {
          if (this.single) {
            return this.parts[0].value;
          }

          return _get2(_getPrototypeOf3(PropertyCommitter.prototype), "_getValue", this).call(this);
        }
      }, {
        key: "commit",
        value: function commit() {
          if (this.dirty) {
            this.dirty = false; // tslint:disable-next-line:no-any

            this.element[this.name] = this._getValue();
          }
        }
      }]);

      return PropertyCommitter;
    }(AttributeCommitter);

  var PropertyPart =
    /*#__PURE__*/
    function (_AttributePart) {
      _inherits2(PropertyPart, _AttributePart);

      function PropertyPart() {
        _classCallCheck2(this, PropertyPart);

        return _possibleConstructorReturn2(this, _getPrototypeOf3(PropertyPart).apply(this, arguments));
      }

      return PropertyPart;
    }(AttributePart); // Detect event listener options support. If the `capture` property is read
  // from the options object, then options are supported. If not, then the thrid
  // argument to add/removeEventListener is interpreted as the boolean capture
  // value so we should only pass the `capture` property.


  var eventOptionsSupported = false;

  try {
    var options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }

    }; // tslint:disable-next-line:no-any

    window.addEventListener('test', options, options); // tslint:disable-next-line:no-any

    window.removeEventListener('test', options, options);
  } catch (_e) {}

  var EventPart =
    /*#__PURE__*/
    function () {
      function EventPart(element, eventName, eventContext) {
        var _this7 = this;

        _classCallCheck2(this, EventPart);

        this.value = undefined;
        this._pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;

        this._boundHandleEvent = function (e) {
          return _this7.handleEvent(e);
        };
      }

      _createClass2(EventPart, [{
        key: "setValue",
        value: function setValue(value) {
          this._pendingValue = value;
        }
      }, {
        key: "commit",
        value: function commit() {
          while (isDirective(this._pendingValue)) {
            var directive = this._pendingValue;
            this._pendingValue = noChange;
            directive(this);
          }

          if (this._pendingValue === noChange) {
            return;
          }

          var newListener = this._pendingValue;
          var oldListener = this.value;
          var shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
          var shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

          if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
          }

          if (shouldAddListener) {
            this._options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
          }

          this.value = newListener;
          this._pendingValue = noChange;
        }
      }, {
        key: "handleEvent",
        value: function handleEvent(event) {
          if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
          } else {
            this.value.handleEvent(event);
          }
        }
      }]);

      return EventPart;
    }(); // We copy options because of the inconsistent behavior of browsers when reading
  // the third argument of add/removeEventListener. IE11 doesn't support options
  // at all. Chrome 41 only reads `capture` if the argument is an object.


  var getOptions = function getOptions(o) {
    return o && (eventOptionsSupported ? {
      capture: o.capture,
      passive: o.passive,
      once: o.once
    } : o.capture);
  };
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * Creates Parts when a template is instantiated.
   */


  var DefaultTemplateProcessor =
    /*#__PURE__*/
    function () {
      function DefaultTemplateProcessor() {
        _classCallCheck2(this, DefaultTemplateProcessor);
      }

      _createClass2(DefaultTemplateProcessor, [{
        key: "handleAttributeExpressions",

        /**
         * Create parts for an attribute-position binding, given the event, attribute
         * name, and string literals.
         *
         * @param element The element containing the binding
         * @param name  The attribute name
         * @param strings The string literals. There are always at least two strings,
         *   event for fully-controlled bindings with a single expression.
         */
        value: function handleAttributeExpressions(element, name, strings, options) {
          var prefix = name[0];

          if (prefix === '.') {
            var _comitter = new PropertyCommitter(element, name.slice(1), strings);

            return _comitter.parts;
          }

          if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
          }

          if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
          }

          var comitter = new AttributeCommitter(element, name, strings);
          return comitter.parts;
        }
        /**
         * Create parts for a text-position binding.
         * @param templateFactory
         */

      }, {
        key: "handleTextExpression",
        value: function handleTextExpression(options) {
          return new NodePart(options);
        }
      }]);

      return DefaultTemplateProcessor;
    }();

  var defaultTemplateProcessor = new DefaultTemplateProcessor();
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * The default TemplateFactory which caches Templates keyed on
   * result.type and result.strings.
   */

  function templateFactory(result) {
    var templateCache = templateCaches.get(result.type);

    if (templateCache === undefined) {
      templateCache = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      };
      templateCaches.set(result.type, templateCache);
    }

    var template = templateCache.stringsArray.get(result.strings);

    if (template !== undefined) {
      return template;
    } // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content


    var key = result.strings.join(marker); // Check if we already have a Template for this key

    template = templateCache.keyString.get(key);

    if (template === undefined) {
      // If we have not seen this key before, create a new Template
      template = new Template(result, result.getTemplateElement()); // Cache the Template for this key

      templateCache.keyString.set(key, template);
    } // Cache all future queries for this TemplateStringsArray


    templateCache.stringsArray.set(result.strings, template);
    return template;
  }

  var templateCaches = new Map();
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  var parts = new WeakMap();
  /**
   * Renders a template to a container.
   *
   * To update a container with new values, reevaluate the template literal and
   * call `render` with the new result.
   *
   * @param result a TemplateResult created by evaluating a template tag like
   *     `html` or `svg`.
   * @param container A DOM parent to render to. The entire contents are either
   *     replaced, or efficiently updated if the same result type was previous
   *     rendered there.
   * @param options RenderOptions for the entire render tree rendered to this
   *     container. Render options must *not* change between renders to the same
   *     container, as those changes will not effect previously rendered DOM.
   */

  var render = function render(result, container, options) {
    var part = parts.get(container);

    if (part === undefined) {
      removeNodes(container, container.firstChild);
      parts.set(container, part = new NodePart(Object.assign({
        templateFactory: templateFactory
      }, options)));
      part.appendInto(container);
    }

    part.setValue(result);
    part.commit();
  };
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for lit-html usage.
  // TODO(justinfagnani): inject version number at build time


  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.0.0');
  /**
   * Interprets a template literal as an HTML template that can efficiently
   * render to and update a container.
   */

  var html = function html(strings) {
    for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      values[_key2 - 1] = arguments[_key2];
    }

    return new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
  };
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */


  var walkerNodeFilter = 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
  ;
  /**
   * Removes the list of nodes from a Template safely. In addition to removing
   * nodes from the Template, the Template part indices are updated to match
   * the mutated Template DOM.
   *
   * As the template is walked the removal state is tracked and
   * part indices are adjusted as needed.
   *
   * div
   *   div#1 (remove) <-- start removing (removing node is div#1)
   *     div
   *       div#2 (remove)  <-- continue removing (removing node is still div#1)
   *         div
   * div <-- stop removing since previous sibling is the removing node (div#1,
   * removed 4 nodes)
   */

  function removeNodesFromTemplate(template, nodesToRemove) {
    var content = template.element.content,
      parts = template.parts;
    var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    var partIndex = nextActiveIndexInTemplateParts(parts);
    var part = parts[partIndex];
    var nodeIndex = -1;
    var removeCount = 0;
    var nodesToRemoveInTemplate = [];
    var currentRemovingNode = null;

    while (walker.nextNode()) {
      nodeIndex++;
      var node = walker.currentNode; // End removal if stepped past the removing node

      if (node.previousSibling === currentRemovingNode) {
        currentRemovingNode = null;
      } // A node to remove was found in the template


      if (nodesToRemove.has(node)) {
        nodesToRemoveInTemplate.push(node); // Track node we're removing

        if (currentRemovingNode === null) {
          currentRemovingNode = node;
        }
      } // When removing, increment count by which to adjust subsequent part indices


      if (currentRemovingNode !== null) {
        removeCount++;
      }

      while (part !== undefined && part.index === nodeIndex) {
        // If part is in a removed node deactivate it by setting index to -1 or
        // adjust the index as needed.
        part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        part = parts[partIndex];
      }
    }

    nodesToRemoveInTemplate.forEach(function (n) {
      return n.parentNode.removeChild(n);
    });
  }

  var countNodes = function countNodes(node) {
    var count = node.nodeType === 11
      /* Node.DOCUMENT_FRAGMENT_NODE */
      ? 0 : 1;
    var walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

    while (walker.nextNode()) {
      count++;
    }

    return count;
  };

  var nextActiveIndexInTemplateParts = function nextActiveIndexInTemplateParts(parts) {
    var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    for (var i = startIndex + 1; i < parts.length; i++) {
      var part = parts[i];

      if (isTemplatePartActive(part)) {
        return i;
      }
    }

    return -1;
  };
  /**
   * Inserts the given node into the Template, optionally before the given
   * refNode. In addition to inserting the node into the Template, the Template
   * part indices are updated to match the mutated Template DOM.
   */


  function insertNodeIntoTemplate(template, node) {
    var refNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var content = template.element.content,
      parts = template.parts; // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.

    if (refNode === null || refNode === undefined) {
      content.appendChild(node);
      return;
    }

    var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    var partIndex = nextActiveIndexInTemplateParts(parts);
    var insertCount = 0;
    var walkerIndex = -1;

    while (walker.nextNode()) {
      walkerIndex++;
      var walkerNode = walker.currentNode;

      if (walkerNode === refNode) {
        insertCount = countNodes(node);
        refNode.parentNode.insertBefore(node, refNode);
      }

      while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
        // If we've inserted the node, simply adjust all subsequent parts
        if (insertCount > 0) {
          while (partIndex !== -1) {
            parts[partIndex].index += insertCount;
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
          }

          return;
        }

        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      }
    }
  }
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
    // Get a key to lookup in `templateCaches`.


  var getTemplateCacheKey = function getTemplateCacheKey(type, scopeName) {
      return "".concat(type, "--").concat(scopeName);
    };

  var compatibleShadyCSSVersion = true;

  if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
  } else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn("Incompatible ShadyCSS version detected." + "Please update to at least @webcomponents/webcomponentsjs@2.0.2 and" + "@webcomponents/shadycss@1.3.1.");
    compatibleShadyCSSVersion = false;
  }
  /**
   * Template factory which scopes template DOM using ShadyCSS.
   * @param scopeName {string}
   */


  var shadyTemplateFactory = function shadyTemplateFactory(scopeName) {
    return function (result) {
      var cacheKey = getTemplateCacheKey(result.type, scopeName);
      var templateCache = templateCaches.get(cacheKey);

      if (templateCache === undefined) {
        templateCache = {
          stringsArray: new WeakMap(),
          keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
      }

      var template = templateCache.stringsArray.get(result.strings);

      if (template !== undefined) {
        return template;
      }

      var key = result.strings.join(marker);
      template = templateCache.keyString.get(key);

      if (template === undefined) {
        var _element = result.getTemplateElement();

        if (compatibleShadyCSSVersion) {
          window.ShadyCSS.prepareTemplateDom(_element, scopeName);
        }

        template = new Template(result, _element);
        templateCache.keyString.set(key, template);
      }

      templateCache.stringsArray.set(result.strings, template);
      return template;
    };
  };

  var TEMPLATE_TYPES = ['html', 'svg'];
  /**
   * Removes all style elements from Templates for the given scopeName.
   */

  var removeStylesFromLitTemplates = function removeStylesFromLitTemplates(scopeName) {
    TEMPLATE_TYPES.forEach(function (type) {
      var templates = templateCaches.get(getTemplateCacheKey(type, scopeName));

      if (templates !== undefined) {
        templates.keyString.forEach(function (template) {
          var content = template.element.content; // IE 11 doesn't support the iterable param Set constructor

          var styles = new Set();
          Array.from(content.querySelectorAll('style')).forEach(function (s) {
            styles.add(s);
          });
          removeNodesFromTemplate(template, styles);
        });
      }
    });
  };

  var shadyRenderSet = new Set();
  /**
   * For the given scope name, ensures that ShadyCSS style scoping is performed.
   * This is done just once per scope name so the fragment and template cannot
   * be modified.
   * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
   * to be scoped and appended to the document
   * (2) removes style elements from all lit-html Templates for this scope name.
   *
   * Note, <style> elements can only be placed into templates for the
   * initial rendering of the scope. If <style> elements are included in templates
   * dynamically rendered to the scope (after the first scope render), they will
   * not be scoped and the <style> will be left in the template and rendered
   * output.
   */

  var prepareTemplateStyles = function prepareTemplateStyles(renderedDOM, template, scopeName) {
    shadyRenderSet.add(scopeName); // Move styles out of rendered DOM and store.

    var styles = renderedDOM.querySelectorAll('style'); // If there are no styles, skip unnecessary work

    if (styles.length === 0) {
      // Ensure prepareTemplateStyles is called to support adding
      // styles via `prepareAdoptedCssText` since that requires that
      // `prepareTemplateStyles` is called.
      window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);
      return;
    }

    var condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.

    for (var i = 0; i < styles.length; i++) {
      var style = styles[i];
      style.parentNode.removeChild(style);
      condensedStyle.textContent += style.textContent;
    } // Remove styles from nested templates in this scope.


    removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
    // `template`.

    insertNodeIntoTemplate(template, condensedStyle, template.element.content.firstChild); // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).

    window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);

    if (window.ShadyCSS.nativeShadow) {
      // When in native Shadow DOM, re-add styling to rendered content using
      // the style ShadyCSS produced.
      var _style = template.element.content.querySelector('style');

      renderedDOM.insertBefore(_style.cloneNode(true), renderedDOM.firstChild);
    } else {
      // When not in native Shadow DOM, at this point ShadyCSS will have
      // removed the style from the lit template and parts will be broken as a
      // result. To fix this, we put back the style node ShadyCSS removed
      // and then tell lit to remove that node from the template.
      // NOTE, ShadyCSS creates its own style so we can safely add/remove
      // `condensedStyle` here.
      template.element.content.insertBefore(condensedStyle, template.element.content.firstChild);
      var removes = new Set();
      removes.add(condensedStyle);
      removeNodesFromTemplate(template, removes);
    }
  };
  /**
   * Extension to the standard `render` method which supports rendering
   * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
   * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
   * or when the webcomponentsjs
   * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
   *
   * Adds a `scopeName` option which is used to scope element DOM and stylesheets
   * when native ShadowDOM is unavailable. The `scopeName` will be added to
   * the class attribute of all rendered DOM. In addition, any style elements will
   * be automatically re-written with this `scopeName` selector and moved out
   * of the rendered DOM and into the document `<head>`.
   *
   * It is common to use this render method in conjunction with a custom element
   * which renders a shadowRoot. When this is done, typically the element's
   * `localName` should be used as the `scopeName`.
   *
   * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
   * custom properties (needed only on older browsers like IE11) and a shim for
   * a deprecated feature called `@apply` that supports applying a set of css
   * custom properties to a given location.
   *
   * Usage considerations:
   *
   * * Part values in `<style>` elements are only applied the first time a given
   * `scopeName` renders. Subsequent changes to parts in style elements will have
   * no effect. Because of this, parts in style elements should only be used for
   * values that will never change, for example parts that set scope-wide theme
   * values or parts which render shared style elements.
   *
   * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
   * custom element's `constructor` is not supported. Instead rendering should
   * either done asynchronously, for example at microtask timing (for example
   * `Promise.resolve()`), or be deferred until the first time the element's
   * `connectedCallback` runs.
   *
   * Usage considerations when using shimmed custom properties or `@apply`:
   *
   * * Whenever any dynamic changes are made which affect
   * css custom properties, `ShadyCSS.styleElement(element)` must be called
   * to update the element. There are two cases when this is needed:
   * (1) the element is connected to a new parent, (2) a class is added to the
   * element that causes it to match different custom properties.
   * To address the first case when rendering a custom element, `styleElement`
   * should be called in the element's `connectedCallback`.
   *
   * * Shimmed custom properties may only be defined either for an entire
   * shadowRoot (for example, in a `:host` rule) or via a rule that directly
   * matches an element with a shadowRoot. In other words, instead of flowing from
   * parent to child as do native css custom properties, shimmed custom properties
   * flow only from shadowRoots to nested shadowRoots.
   *
   * * When using `@apply` mixing css shorthand property names with
   * non-shorthand names (for example `border` and `border-width`) is not
   * supported.
   */


  var render$1 = function render$1(result, container, options) {
    var scopeName = options.scopeName;
    var hasRendered = parts.has(container);
    var needsScoping = container instanceof ShadowRoot && compatibleShadyCSSVersion && result instanceof TemplateResult; // Handle first render to a scope specially...

    var firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.

    var renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render(result, renderContainer, Object.assign({
      templateFactory: shadyTemplateFactory(scopeName)
    }, options)); // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.

    if (firstScopeRender) {
      var part = parts.get(renderContainer);
      parts.delete(renderContainer);

      if (part.value instanceof TemplateInstance) {
        prepareTemplateStyles(renderContainer, part.value.template, scopeName);
      }

      removeNodes(container, container.firstChild);
      container.appendChild(renderContainer);
      parts.set(container, part);
    } // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSSS.styleElement`
    // for dynamic changes.


    if (!hasRendered && needsScoping) {
      window.ShadyCSS.styleElement(container.host);
    }
  };
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
   * replaced at compile time by the munged name for object[property]. We cannot
   * alias this function, so we have to use a small shim that has the same
   * behavior when not compiling.
   */


  window.JSCompiler_renameProperty = function (prop, _obj) {
    return prop;
  };

  var defaultConverter = {
    toAttribute: function toAttribute(value, type) {
      switch (type) {
        case Boolean:
          return value ? '' : null;

        case Object:
        case Array:
          // if the value is `null` or `undefined` pass this through
          // to allow removing/no change behavior.
          return value == null ? value : JSON.stringify(value);
      }

      return value;
    },
    fromAttribute: function fromAttribute(value, type) {
      switch (type) {
        case Boolean:
          return value !== null;

        case Number:
          return value === null ? null : Number(value);

        case Object:
        case Array:
          return JSON.parse(value);
      }

      return value;
    }
  };
  /**
   * Change function that returns true if `value` is different from `oldValue`.
   * This method is used as the default for a property's `hasChanged` function.
   */

  var notEqual = function notEqual(value, old) {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
  };

  var defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
  };
  var microtaskPromise = Promise.resolve(true);
  var STATE_HAS_UPDATED = 1;
  var STATE_UPDATE_REQUESTED = 1 << 2;
  var STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
  var STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
  var STATE_HAS_CONNECTED = 1 << 5;
  /**
   * Base element class which manages element properties and attributes. When
   * properties change, the `update` method is asynchronously called. This method
   * should be supplied by subclassers to render updates as desired.
   */

  var UpdatingElement =
    /*#__PURE__*/
    function (_HTMLElement) {
      _inherits2(UpdatingElement, _HTMLElement);

      function UpdatingElement() {
        var _this8;

        _classCallCheck2(this, UpdatingElement);

        _this8 = _possibleConstructorReturn2(this, _getPrototypeOf3(UpdatingElement).call(this));
        _this8._updateState = 0;
        _this8._instanceProperties = undefined;
        _this8._updatePromise = microtaskPromise;
        _this8._hasConnectedResolver = undefined;
        /**
         * Map with keys for any properties that have changed since the last
         * update cycle with previous values.
         */

        _this8._changedProperties = new Map();
        /**
         * Map with keys of properties that should be reflected when updated.
         */

        _this8._reflectingProperties = undefined;

        _this8.initialize();

        return _this8;
      }
      /**
       * Returns a list of attributes corresponding to the registered properties.
       * @nocollapse
       */


      _createClass2(UpdatingElement, [{
        key: "initialize",

        /**
         * Performs element initialization. By default captures any pre-set values for
         * registered properties.
         */
        value: function initialize() {
          this._saveInstanceProperties();
        }
        /**
         * Fixes any properties set on the instance before upgrade time.
         * Otherwise these would shadow the accessor and break these properties.
         * The properties are stored in a Map which is played back after the
         * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
         * (<=41), properties created for native platform properties like (`id` or
         * `name`) may not have default values set in the element constructor. On
         * these browsers native properties appear on instances and therefore their
         * default value will overwrite any element default (e.g. if the element sets
         * this.id = 'id' in the constructor, the 'id' will become '' since this is
         * the native platform default).
         */

      }, {
        key: "_saveInstanceProperties",
        value: function _saveInstanceProperties() {
          var _this9 = this;

          // Use forEach so this works even if for/of loops are compiled to for loops
          // expecting arrays
          this.constructor._classProperties.forEach(function (_v, p) {
            if (_this9.hasOwnProperty(p)) {
              var value = _this9[p];
              delete _this9[p];

              if (!_this9._instanceProperties) {
                _this9._instanceProperties = new Map();
              }

              _this9._instanceProperties.set(p, value);
            }
          });
        }
        /**
         * Applies previously saved instance properties.
         */

      }, {
        key: "_applyInstanceProperties",
        value: function _applyInstanceProperties() {
          var _this10 = this;

          // Use forEach so this works even if for/of loops are compiled to for loops
          // expecting arrays
          // tslint:disable-next-line:no-any
          this._instanceProperties.forEach(function (v, p) {
            return _this10[p] = v;
          });

          this._instanceProperties = undefined;
        }
      }, {
        key: "connectedCallback",
        value: function connectedCallback() {
          this._updateState = this._updateState | STATE_HAS_CONNECTED; // Ensure connection triggers an update. Updates cannot complete before
          // connection and if one is pending connection the `_hasConnectionResolver`
          // will exist. If so, resolve it to complete the update, otherwise
          // requestUpdate.

          if (this._hasConnectedResolver) {
            this._hasConnectedResolver();

            this._hasConnectedResolver = undefined;
          } else {
            this.requestUpdate();
          }
        }
        /**
         * Allows for `super.disconnectedCallback()` in extensions while
         * reserving the possibility of making non-breaking feature additions
         * when disconnecting at some point in the future.
         */

      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {}
        /**
         * Synchronizes property values when attributes change.
         */

      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(name, old, value) {
          if (old !== value) {
            this._attributeToProperty(name, value);
          }
        }
      }, {
        key: "_propertyToAttribute",
        value: function _propertyToAttribute(name, value) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultPropertyDeclaration;
          var ctor = this.constructor;

          var attr = ctor._attributeNameForProperty(name, options);

          if (attr !== undefined) {
            var attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


            if (attrValue === undefined) {
              return;
            } // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting


            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

            if (attrValue == null) {
              this.removeAttribute(attr);
            } else {
              this.setAttribute(attr, attrValue);
            } // mark state not reflecting


            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
          }
        }
      }, {
        key: "_attributeToProperty",
        value: function _attributeToProperty(name, value) {
          // Use tracking info to avoid deserializing attribute value if it was
          // just set from a property setter.
          if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
          }

          var ctor = this.constructor;

          var propName = ctor._attributeToPropertyMap.get(name);

          if (propName !== undefined) {
            var _options = ctor._classProperties.get(propName) || defaultPropertyDeclaration; // mark state reflecting


            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] = // tslint:disable-next-line:no-any
              ctor._propertyValueFromAttribute(value, _options); // mark state not reflecting

            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
          }
        }
        /**
         * Requests an update which is processed asynchronously. This should
         * be called when an element should update based on some state not triggered
         * by setting a property. In this case, pass no arguments. It should also be
         * called when manually implementing a property setter. In this case, pass the
         * property `name` and `oldValue` to ensure that any configured property
         * options are honored. Returns the `updateComplete` Promise which is resolved
         * when the update completes.
         *
         * @param name {PropertyKey} (optional) name of requesting property
         * @param oldValue {any} (optional) old value of requesting property
         * @returns {Promise} A Promise that is resolved when the update completes.
         */

      }, {
        key: "requestUpdate",
        value: function requestUpdate(name, oldValue) {
          var shouldRequestUpdate = true; // if we have a property key, perform property update steps.

          if (name !== undefined && !this._changedProperties.has(name)) {
            var ctor = this.constructor;

            var _options2 = ctor._classProperties.get(name) || defaultPropertyDeclaration;

            if (ctor._valueHasChanged(this[name], oldValue, _options2.hasChanged)) {
              // track old value when changing.
              this._changedProperties.set(name, oldValue); // add to reflecting properties set


              if (_options2.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                if (this._reflectingProperties === undefined) {
                  this._reflectingProperties = new Map();
                }

                this._reflectingProperties.set(name, _options2);
              } // abort the request if the property should not be considered changed.

            } else {
              shouldRequestUpdate = false;
            }
          }

          if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._enqueueUpdate();
          }

          return this.updateComplete;
        }
        /**
         * Sets up the element to asynchronously update.
         */

      }, {
        key: "_enqueueUpdate",
        value: function () {
          var _enqueueUpdate2 = _asyncToGenerator2(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee2() {
              var _this11 = this;

              var resolve, previousUpdatePromise, result;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      // Mark state updating...
                      this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
                      previousUpdatePromise = this._updatePromise;
                      this._updatePromise = new Promise(function (res) {
                        return resolve = res;
                      }); // Ensure any previous update has resolved before updating.
                      // This `await` also ensures that property changes are batched.

                      _context2.next = 5;
                      return previousUpdatePromise;

                    case 5:
                      if (this._hasConnected) {
                        _context2.next = 8;
                        break;
                      }

                      _context2.next = 8;
                      return new Promise(function (res) {
                        return _this11._hasConnectedResolver = res;
                      });

                    case 8:
                      // Allow `performUpdate` to be asynchronous to enable scheduling of updates.
                      result = this.performUpdate(); // Note, this is to avoid delaying an additional microtask unless we need
                      // to.

                      if (!(result != null && typeof result.then === 'function')) {
                        _context2.next = 12;
                        break;
                      }

                      _context2.next = 12;
                      return result;

                    case 12:
                      resolve(!this._hasRequestedUpdate);

                    case 13:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));

          function _enqueueUpdate() {
            return _enqueueUpdate2.apply(this, arguments);
          }

          return _enqueueUpdate;
        }()
      }, {
        key: "performUpdate",

        /**
         * Performs an element update.
         *
         * You can override this method to change the timing of updates. For instance,
         * to schedule updates to occur just before the next frame:
         *
         * ```
         * protected async performUpdate(): Promise<unknown> {
         *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
         *   super.performUpdate();
         * }
         * ```
         */
        value: function performUpdate() {
          // Mixin instance properties once, if they exist.
          if (this._instanceProperties) {
            this._applyInstanceProperties();
          }

          if (this.shouldUpdate(this._changedProperties)) {
            var changedProperties = this._changedProperties;
            this.update(changedProperties);

            this._markUpdated();

            if (!(this._updateState & STATE_HAS_UPDATED)) {
              this._updateState = this._updateState | STATE_HAS_UPDATED;
              this.firstUpdated(changedProperties);
            }

            this.updated(changedProperties);
          } else {
            this._markUpdated();
          }
        }
      }, {
        key: "_markUpdated",
        value: function _markUpdated() {
          this._changedProperties = new Map();
          this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
        }
        /**
         * Returns a Promise that resolves when the element has completed updating.
         * The Promise value is a boolean that is `true` if the element completed the
         * update without triggering another update. The Promise result is `false` if
         * a property was set inside `updated()`. This getter can be implemented to
         * await additional state. For example, it is sometimes useful to await a
         * rendered element before fulfilling this Promise. To do this, first await
         * `super.updateComplete` then any subsequent state.
         *
         * @returns {Promise} The Promise returns a boolean that indicates if the
         * update resolved without triggering another update.
         */

      }, {
        key: "shouldUpdate",

        /**
         * Controls whether or not `update` should be called when the element requests
         * an update. By default, this method always returns `true`, but this can be
         * customized to control when to update.
         *
         * * @param _changedProperties Map of changed properties with old values
         */
        value: function shouldUpdate(_changedProperties) {
          return true;
        }
        /**
         * Updates the element. This method reflects property values to attributes.
         * It can be overridden to render and keep updated element DOM.
         * Setting properties inside this method will *not* trigger
         * another update.
         *
         * * @param _changedProperties Map of changed properties with old values
         */

      }, {
        key: "update",
        value: function update(_changedProperties) {
          var _this12 = this;

          if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach(function (v, k) {
              return _this12._propertyToAttribute(k, _this12[k], v);
            });

            this._reflectingProperties = undefined;
          }
        }
        /**
         * Invoked whenever the element is updated. Implement to perform
         * post-updating tasks via DOM APIs, for example, focusing an element.
         *
         * Setting properties inside this method will trigger the element to update
         * again after this update cycle completes.
         *
         * * @param _changedProperties Map of changed properties with old values
         */

      }, {
        key: "updated",
        value: function updated(_changedProperties) {}
        /**
         * Invoked when the element is first updated. Implement to perform one time
         * work on the element after update.
         *
         * Setting properties inside this method will trigger the element to update
         * again after this update cycle completes.
         *
         * * @param _changedProperties Map of changed properties with old values
         */

      }, {
        key: "firstUpdated",
        value: function firstUpdated(_changedProperties) {}
      }, {
        key: "_hasConnected",
        get: function get() {
          return this._updateState & STATE_HAS_CONNECTED;
        }
      }, {
        key: "_hasRequestedUpdate",
        get: function get() {
          return this._updateState & STATE_UPDATE_REQUESTED;
        }
      }, {
        key: "hasUpdated",
        get: function get() {
          return this._updateState & STATE_HAS_UPDATED;
        }
      }, {
        key: "updateComplete",
        get: function get() {
          return this._updatePromise;
        }
      }], [{
        key: "_ensureClassProperties",

        /**
         * Ensures the private `_classProperties` property metadata is created.
         * In addition to `finalize` this is also called in `createProperty` to
         * ensure the `@property` decorator can add property metadata.
         */

        /** @nocollapse */
        value: function _ensureClassProperties() {
          var _this13 = this;

          // ensure private storage for property declarations.
          if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

            var superProperties = Object.getPrototypeOf(this)._classProperties;

            if (superProperties !== undefined) {
              superProperties.forEach(function (v, k) {
                return _this13._classProperties.set(k, v);
              });
            }
          }
        }
        /**
         * Creates a property accessor on the element prototype if one does not exist.
         * The property setter calls the property's `hasChanged` property option
         * or uses a strict identity check to determine whether or not to request
         * an update.
         * @nocollapse
         */

      }, {
        key: "createProperty",
        value: function createProperty(name) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultPropertyDeclaration;

          // Note, since this can be called by the `@property` decorator which
          // is called before `finalize`, we ensure storage exists for property
          // metadata.
          this._ensureClassProperties();

          this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
          // it would be lost otherwise and that would never be the user's intention;
          // Instead, we expect users to call `requestUpdate` themselves from
          // user-defined accessors. Note that if the super has an accessor we will
          // still overwrite it


          if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
          }

          var key = _typeof(name) === 'symbol' ? Symbol() : "__".concat(name);
          Object.defineProperty(this.prototype, name, {
            // tslint:disable-next-line:no-any no symbol in index
            get: function get() {
              // tslint:disable-next-line:no-any no symbol in index
              return this[key];
            },
            set: function set(value) {
              // tslint:disable-next-line:no-any no symbol in index
              var oldValue = this[name]; // tslint:disable-next-line:no-any no symbol in index

              this[key] = value;
              this.requestUpdate(name, oldValue);
            },
            configurable: true,
            enumerable: true
          });
        }
        /**
         * Creates property accessors for registered properties and ensures
         * any superclasses are also finalized.
         * @nocollapse
         */

      }, {
        key: "finalize",
        value: function finalize() {
          if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this)) && this.finalized) {
            return;
          } // finalize any superclasses


          var superCtor = Object.getPrototypeOf(this);

          if (typeof superCtor.finalize === 'function') {
            superCtor.finalize();
          }

          this.finalized = true;

          this._ensureClassProperties(); // initialize Map populated in observedAttributes


          this._attributeToPropertyMap = new Map(); // make any properties
          // Note, only process "own" properties since this element will inherit
          // any properties defined on the superClass, and finalization ensures
          // the entire prototype chain is finalized.

          if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            var props = this.properties; // support symbols in properties (IE11 does not support this)

            var propKeys = [].concat(_toConsumableArray(Object.getOwnPropertyNames(props)), _toConsumableArray(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])); // This for/of is ok because propKeys is an array

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = propKeys[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var p = _step5.value;
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                  _iterator5.return();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }
          }
        }
        /**
         * Returns the property name for the given attribute `name`.
         * @nocollapse
         */

      }, {
        key: "_attributeNameForProperty",
        value: function _attributeNameForProperty(name, options) {
          var attribute = options.attribute;
          return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
        }
        /**
         * Returns true if a property should request an update.
         * Called when a property value is set and uses the `hasChanged`
         * option for the property if present or a strict identity check.
         * @nocollapse
         */

      }, {
        key: "_valueHasChanged",
        value: function _valueHasChanged(value, old) {
          var hasChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : notEqual;
          return hasChanged(value, old);
        }
        /**
         * Returns the property value for the given attribute value.
         * Called via the `attributeChangedCallback` and uses the property's
         * `converter` or `converter.fromAttribute` property option.
         * @nocollapse
         */

      }, {
        key: "_propertyValueFromAttribute",
        value: function _propertyValueFromAttribute(value, options) {
          var type = options.type;
          var converter = options.converter || defaultConverter;
          var fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
          return fromAttribute ? fromAttribute(value, type) : value;
        }
        /**
         * Returns the attribute value for the given property value. If this
         * returns undefined, the property will *not* be reflected to an attribute.
         * If this returns null, the attribute will be removed, otherwise the
         * attribute will be set to the value.
         * This uses the property's `reflect` and `type.toAttribute` property options.
         * @nocollapse
         */

      }, {
        key: "_propertyValueToAttribute",
        value: function _propertyValueToAttribute(value, options) {
          if (options.reflect === undefined) {
            return;
          }

          var type = options.type;
          var converter = options.converter;
          var toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
          return toAttribute(value, type);
        }
      }, {
        key: "observedAttributes",
        get: function get() {
          var _this14 = this;

          // note: piggy backing on this to ensure we're finalized.
          this.finalize();
          var attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
          // expecting arrays

          this._classProperties.forEach(function (v, p) {
            var attr = _this14._attributeNameForProperty(p, v);

            if (attr !== undefined) {
              _this14._attributeToPropertyMap.set(attr, p);

              attributes.push(attr);
            }
          });

          return attributes;
        }
      }]);

      return UpdatingElement;
    }(_wrapNativeSuper(HTMLElement));
  /**
   * Marks class as having finished creating properties.
   */


  UpdatingElement.finalized = true;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   @license
   Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at
   http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
   http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
   found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
   part of the polymer project is also subject to an additional IP rights grant
   found at http://polymer.github.io/PATENTS.txt
   */

  var supportsAdoptingStyleSheets = 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for LitElement usage.
  // TODO(justinfagnani): inject version number at build time

  (window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.0.1');
  /**
   * Minimal implementation of Array.prototype.flat
   * @param arr the array to flatten
   * @param result the accumlated result
   */

  function arrayFlat(styles) {
    var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    for (var i = 0, length = styles.length; i < length; i++) {
      var value = styles[i];

      if (Array.isArray(value)) {
        arrayFlat(value, result);
      } else {
        result.push(value);
      }
    }

    return result;
  }
  /** Deeply flattens styles array. Uses native flat if available. */


  var flattenStyles = function flattenStyles(styles) {
    return styles.flat ? styles.flat(Infinity) : arrayFlat(styles);
  };

  var LitElement =
    /*#__PURE__*/
    function (_UpdatingElement) {
      _inherits2(LitElement, _UpdatingElement);

      function LitElement() {
        _classCallCheck2(this, LitElement);

        return _possibleConstructorReturn2(this, _getPrototypeOf3(LitElement).apply(this, arguments));
      }

      _createClass2(LitElement, [{
        key: "initialize",

        /**
         * Performs element initialization. By default this calls `createRenderRoot`
         * to create the element `renderRoot` node and captures any pre-set values for
         * registered properties.
         */
        value: function initialize() {
          _get2(_getPrototypeOf3(LitElement.prototype), "initialize", this).call(this);

          this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
          // element's getRootNode(). While this could be done, we're choosing not to
          // support this now since it would require different logic around de-duping.

          if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
          }
        }
        /**
         * Returns the node into which the element should render and by default
         * creates and returns an open shadowRoot. Implement to customize where the
         * element's DOM is rendered. For example, to render into the element's
         * childNodes, return `this`.
         * @returns {Element|DocumentFragment} Returns a node into which to render.
         */

      }, {
        key: "createRenderRoot",
        value: function createRenderRoot() {
          return this.attachShadow({
            mode: 'open'
          });
        }
        /**
         * Applies styling to the element shadowRoot using the `static get styles`
         * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
         * available and will fallback otherwise. When Shadow DOM is polyfilled,
         * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
         * is available but `adoptedStyleSheets` is not, styles are appended to the
         * end of the `shadowRoot` to [mimic spec
         * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
         */

      }, {
        key: "adoptStyles",
        value: function adoptStyles() {
          var styles = this.constructor._styles;

          if (styles.length === 0) {
            return;
          } // There are three separate cases here based on Shadow DOM support.
          // (1) shadowRoot polyfilled: use ShadyCSS
          // (2) shadowRoot.adoptedStyleSheets available: use it.
          // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
          // rendering


          if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(function (s) {
              return s.cssText;
            }), this.localName);
          } else if (supportsAdoptingStyleSheets) {
            this.renderRoot.adoptedStyleSheets = styles.map(function (s) {
              return s.styleSheet;
            });
          } else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
          }
        }
      }, {
        key: "connectedCallback",
        value: function connectedCallback() {
          _get2(_getPrototypeOf3(LitElement.prototype), "connectedCallback", this).call(this); // Note, first update/render handles styleElement so we only call this if
          // connected after first update.


          if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
          }
        }
        /**
         * Updates the element. This method reflects property values to attributes
         * and calls `render` to render DOM via lit-html. Setting properties inside
         * this method will *not* trigger another update.
         * * @param _changedProperties Map of changed properties with old values
         */

      }, {
        key: "update",
        value: function update(changedProperties) {
          var _this15 = this;

          _get2(_getPrototypeOf3(LitElement.prototype), "update", this).call(this, changedProperties);

          var templateResult = this.render();

          if (templateResult instanceof TemplateResult) {
            this.constructor.render(templateResult, this.renderRoot, {
              scopeName: this.localName,
              eventContext: this
            });
          } // When native Shadow DOM is used but adoptedStyles are not supported,
          // insert styling after rendering to ensure adoptedStyles have highest
          // priority.


          if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;

            this.constructor._styles.forEach(function (s) {
              var style = document.createElement('style');
              style.textContent = s.cssText;

              _this15.renderRoot.appendChild(style);
            });
          }
        }
        /**
         * Invoked on each update to perform rendering tasks. This method must return
         * a lit-html TemplateResult. Setting properties inside this method will *not*
         * trigger the element to update.
         */

      }, {
        key: "render",
        value: function render() {}
      }], [{
        key: "finalize",

        /** @nocollapse */
        value: function finalize() {
          _get2(_getPrototypeOf3(LitElement), "finalize", this).call(this); // Prepare styling that is stamped at first render time. Styling
          // is built from user provided `styles` or is inherited from the superclass.


          this._styles = this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ? this._getUniqueStyles() : this._styles || [];
        }
        /** @nocollapse */

      }, {
        key: "_getUniqueStyles",
        value: function _getUniqueStyles() {
          // Take care not to call `this.styles` multiple times since this generates
          // new CSSResults each time.
          // TODO(sorvell): Since we do not cache CSSResults by input, any
          // shared styles will generate new stylesheet objects, which is wasteful.
          // This should be addressed when a browser ships constructable
          // stylesheets.
          var userStyles = this.styles;
          var styles = [];

          if (Array.isArray(userStyles)) {
            var flatStyles = flattenStyles(userStyles); // As a performance optimization to avoid duplicated styling that can
            // occur especially when composing via subclassing, de-duplicate styles
            // preserving the last item in the list. The last item is kept to
            // try to preserve cascade order with the assumption that it's most
            // important that last added styles override previous styles.

            var styleSet = flatStyles.reduceRight(function (set, s) {
              set.add(s); // on IE set.add does not return the set.

              return set;
            }, new Set()); // Array.from does not work on Set in IE

            styleSet.forEach(function (v) {
              return styles.unshift(v);
            });
          } else if (userStyles) {
            styles.push(userStyles);
          }

          return styles;
        }
      }]);

      return LitElement;
    }(UpdatingElement);
  /**
   * Ensure this class is marked as `finalized` as an optimization ensuring
   * it will not needlessly try to `finalize`.
   */


  LitElement.finalized = true;
  /**
   * Render method used to render the lit-html TemplateResult to the element's
   * DOM.
   * @param {TemplateResult} Template to render.
   * @param {Element|DocumentFragment} Node into which to render.
   * @param {String} Element name.
   * @nocollapse
   */

  LitElement.render = render$1;
  var xhtml = "http://www.w3.org/1999/xhtml";
  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "",
      i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {
      space: namespaces[prefix],
      local: name
    } : name;
  }

  function creatorInherit(name) {
    return function () {
      var document = this.ownerDocument,
        uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml ? document.createElement(name) : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function () {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }

  function none() {}

  function selector(selector) {
    return selector == null ? none : function () {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function () {
      return this.querySelectorAll(selector);
    };
  }

  function selection_selectAll(select) {
    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection(subgroups, parents);
  }

  function matcher(selector) {
    return function () {
      return this.matches(selector);
    };
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function appendChild(child) {
      return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function insertBefore(child, next) {
      return this._parent.insertBefore(child, next);
    },
    querySelector: function querySelector(selector) {
      return this._parent.querySelector(selector);
    },
    querySelectorAll: function querySelectorAll(selector) {
      return this._parent.querySelectorAll(selector);
    }
  };

  function constant(x) {
    return function () {
      return x;
    };
  }

  var keyPrefix = "$"; // Protect against keys like “__proto__”.

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length; // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.

    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    } // Put any non-null nodes that don’t fit into exit.


    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue; // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.

    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);

        if (keyValue in nodeByKeyValue) {
          exit[i] = node;
        } else {
          nodeByKeyValue[keyValue] = node;
        }
      }
    } // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.


    for (i = 0; i < dataLength; ++i) {
      keyValue = keyPrefix + key.call(parent, data[i], i, data);

      if (node = nodeByKeyValue[keyValue]) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue[keyValue] = null;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    } // Add any remaining nodes that were not bound to data to exit.


    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
        exit[i] = node;
      }
    }
  }

  function selection_data(value, key) {
    if (!value) {
      data = new Array(this.size()), j = -1;
      this.each(function (d) {
        data[++j] = d;
      });
      return data;
    }

    var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;
    if (typeof value !== "function") value = constant(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);
      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key); // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.

      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;

          while (!(next = updateGroup[i1]) && ++i1 < dataLength) {
            ;
          }

          previous._next = next || null;
        }
      }
    }

    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  function selection_exit() {
    return new Selection(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(),
      update = this,
      exit = this.exit();
    enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
    if (onupdate != null) update = onupdate(update);
    if (onexit == null) exit.remove();else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(selection) {
    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection(merges, this._parents);
  }

  function selection_order() {
    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }

      sortgroup.sort(compareNode);
    }

    return new Selection(sortgroups, this._parents).order();
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    var nodes = new Array(this.size()),
      i = -1;
    this.each(function () {
      nodes[++i] = this;
    });
    return nodes;
  }

  function selection_node() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    var size = 0;
    this.each(function () {
      ++size;
    });
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove(name) {
    return function () {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function () {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, value) {
    return function () {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS(fullname, value) {
    return function () {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction(name, value) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS(fullname, value) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }

    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
  }

  function defaultView(node) {
    return node.ownerDocument && node.ownerDocument.defaultView || // node is a Node
      node.document && node // node is a Window
      || node.defaultView; // node is a Document
  }

  function styleRemove(name) {
    return function () {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, value, priority) {
    return function () {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction(name, value, priority) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function () {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function () {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function add(name) {
      var i = this._names.indexOf(name);

      if (i < 0) {
        this._names.push(name);

        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function remove(name) {
      var i = this._names.indexOf(name);

      if (i >= 0) {
        this._names.splice(i, 1);

        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function contains(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node),
      i = -1,
      n = names.length;

    while (++i < n) {
      list.add(names[i]);
    }
  }

  function classedRemove(node, names) {
    var list = classList(node),
      i = -1,
      n = names.length;

    while (++i < n) {
      list.remove(names[i]);
    }
  }

  function classedTrue(names) {
    return function () {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function () {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function () {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()),
        i = -1,
        n = names.length;

      while (++i < n) {
        if (!list.contains(names[i])) return false;
      }

      return true;
    }

    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant(value) {
    return function () {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function () {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function () {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function () {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function () {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function () {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    return this.parentNode.insertBefore(this.cloneNode(false), this.nextSibling);
  }

  function selection_cloneDeep() {
    return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }

  var filterEvents = {};
  var event = null;

  if (typeof document !== "undefined") {
    var element = document.documentElement;

    if (!("onmouseenter" in element)) {
      filterEvents = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
      };
    }
  }

  function filterContextListener(listener, index, group) {
    listener = contextListener(listener, index, group);
    return function (event) {
      var related = event.relatedTarget;

      if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
        listener.call(this, event);
      }
    };
  }

  function contextListener(listener, index, group) {
    return function (event1) {
      var event0 = event; // Events can be reentrant (e.g., focus).

      event = event1;

      try {
        listener.call(this, this.__data__, index, group);
      } finally {
        event = event0;
      }
    };
  }

  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function (t) {
      var name = "",
        i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {
        type: t,
        name: name
      };
    });
  }

  function onRemove(typename) {
    return function () {
      var on = this.__on;
      if (!on) return;

      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.capture);
        } else {
          on[++i] = o;
        }
      }

      if (++i) on.length = i;else delete this.__on;
    };
  }

  function onAdd(typename, value, capture) {
    var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
    return function (d, i, group) {
      var on = this.__on,
        o,
        listener = wrap(value, i, group);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.capture);
          this.addEventListener(o.type, o.listener = listener, o.capture = capture);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, capture);
      o = {
        type: typename.type,
        name: typename.name,
        value: value,
        listener: listener,
        capture: capture
      };
      if (!on) this.__on = [o];else on.push(o);
    };
  }

  function selection_on(typename, value, capture) {
    var typenames = parseTypenames(typename + ""),
      i,
      n = typenames.length,
      t;

    if (arguments.length < 2) {
      var on = this.node().__on;

      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    if (capture == null) capture = false;

    for (i = 0; i < n; ++i) {
      this.each(on(typenames[i], value, capture));
    }

    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
      event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function () {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function () {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
  }

  var root = [null];

  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection([[document.documentElement]], root);
  }

  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: selection_select,
    selectAll: selection_selectAll,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch
  };

  function select(selector) {
    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
  }

  function center(x, y) {
    var nodes;
    if (x == null) x = 0;
    if (y == null) y = 0;

    function force() {
      var i,
        n = nodes.length,
        node,
        sx = 0,
        sy = 0;

      for (i = 0; i < n; ++i) {
        node = nodes[i], sx += node.x, sy += node.y;
      }

      for (sx = sx / n - x, sy = sy / n - y, i = 0; i < n; ++i) {
        node = nodes[i], node.x -= sx, node.y -= sy;
      }
    }

    force.initialize = function (_) {
      nodes = _;
    };

    force.x = function (_) {
      return arguments.length ? (x = +_, force) : x;
    };

    force.y = function (_) {
      return arguments.length ? (y = +_, force) : y;
    };

    return force;
  }

  function constant$1(x) {
    return function () {
      return x;
    };
  }

  function jiggle() {
    return (Math.random() - 0.5) * 1e-6;
  }

  function tree_add(d) {
    var x = +this._x.call(null, d),
      y = +this._y.call(null, d);
    return add(this.cover(x, y), x, y, d);
  }

  function add(tree, x, y, d) {
    if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

    var parent,
      node = tree._root,
      leaf = {
        data: d
      },
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j; // If the tree is empty, initialize the root as a leaf.

    if (!node) return tree._root = leaf, tree; // Find the existing leaf for the new point, or add it.

    while (node.length) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
      if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
    } // Is the new point is exactly coincident with the existing point?


    xp = +tree._x.call(null, node.data);
    yp = +tree._y.call(null, node.data);
    if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree; // Otherwise, split the leaf node until the old and new point are separated.

    do {
      parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
    } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));

    return parent[j] = node, parent[i] = leaf, tree;
  }

  function addAll(data) {
    var d,
      i,
      n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity; // Compute the points and their extent.

    for (i = 0; i < n; ++i) {
      if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
      xz[i] = x;
      yz[i] = y;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    } // If there were no (valid) points, abort.


    if (x0 > x1 || y0 > y1) return this; // Expand the tree to cover the new points.

    this.cover(x0, y0).cover(x1, y1); // Add the new points.

    for (i = 0; i < n; ++i) {
      add(this, xz[i], yz[i], data[i]);
    }

    return this;
  }

  function tree_cover(x, y) {
    if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

    var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1; // If the quadtree has no extent, initialize them.
    // Integer extent are necessary so that if we later double the extent,
    // the existing quadrant boundaries don’t change due to floating point error!

    if (isNaN(x0)) {
      x1 = (x0 = Math.floor(x)) + 1;
      y1 = (y0 = Math.floor(y)) + 1;
    } // Otherwise, double repeatedly to cover.
    else {
      var z = x1 - x0,
        node = this._root,
        parent,
        i;

      while (x0 > x || x >= x1 || y0 > y || y >= y1) {
        i = (y < y0) << 1 | x < x0;
        parent = new Array(4), parent[i] = node, node = parent, z *= 2;

        switch (i) {
          case 0:
            x1 = x0 + z, y1 = y0 + z;
            break;

          case 1:
            x0 = x1 - z, y1 = y0 + z;
            break;

          case 2:
            x1 = x0 + z, y0 = y1 - z;
            break;

          case 3:
            x0 = x1 - z, y0 = y1 - z;
            break;
        }
      }

      if (this._root && this._root.length) this._root = node;
    }

    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    return this;
  }

  function tree_data() {
    var data = [];
    this.visit(function (node) {
      if (!node.length) do {
        data.push(node.data);
      } while (node = node.next);
    });
    return data;
  }

  function tree_extent(_) {
    return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
  }

  function Quad(node, x0, y0, x1, y1) {
    this.node = node;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  function tree_find(x, y, radius) {
    var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;
    if (node) quads.push(new Quad(node, x0, y0, x3, y3));
    if (radius == null) radius = Infinity;else {
      x0 = x - radius, y0 = y - radius;
      x3 = x + radius, y3 = y + radius;
      radius *= radius;
    }

    while (q = quads.pop()) {
      // Stop searching if this quadrant can’t contain a closer node.
      if (!(node = q.node) || (x1 = q.x0) > x3 || (y1 = q.y0) > y3 || (x2 = q.x1) < x0 || (y2 = q.y1) < y0) continue; // Bisect the current quadrant.

      if (node.length) {
        var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;
        quads.push(new Quad(node[3], xm, ym, x2, y2), new Quad(node[2], x1, ym, xm, y2), new Quad(node[1], xm, y1, x2, ym), new Quad(node[0], x1, y1, xm, ym)); // Visit the closest quadrant first.

        if (i = (y >= ym) << 1 | x >= xm) {
          q = quads[quads.length - 1];
          quads[quads.length - 1] = quads[quads.length - 1 - i];
          quads[quads.length - 1 - i] = q;
        }
      } // Visit this point. (Visiting coincident points isn’t necessary!)
      else {
        var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;

        if (d2 < radius) {
          var d = Math.sqrt(radius = d2);
          x0 = x - d, y0 = y - d;
          x3 = x + d, y3 = y + d;
          data = node.data;
        }
      }
    }

    return data;
  }

  function tree_remove(d) {
    if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

    var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j; // If the tree is empty, initialize the root as a leaf.

    if (!node) return this; // Find the leaf node for the point.
    // While descending, also retain the deepest parent with a non-removed sibling.

    if (node.length) while (true) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
      if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
      if (!node.length) break;
      if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) retainer = parent, j = i;
    } // Find the point to remove.

    while (node.data !== d) {
      if (!(previous = node, node = node.next)) return this;
    }

    if (next = node.next) delete node.next; // If there are multiple coincident points, remove just the point.

    if (previous) return next ? previous.next = next : delete previous.next, this; // If this is the root point, remove it.

    if (!parent) return this._root = next, this; // Remove this leaf.

    next ? parent[i] = next : delete parent[i]; // If the parent now contains exactly one leaf, collapse superfluous parents.

    if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
      if (retainer) retainer[j] = node;else this._root = node;
    }

    return this;
  }

  function removeAll(data) {
    for (var i = 0, n = data.length; i < n; ++i) {
      this.remove(data[i]);
    }

    return this;
  }

  function tree_root() {
    return this._root;
  }

  function tree_size() {
    var size = 0;
    this.visit(function (node) {
      if (!node.length) do {
        ++size;
      } while (node = node.next);
    });
    return size;
  }

  function tree_visit(callback) {
    var quads = [],
      q,
      node = this._root,
      child,
      x0,
      y0,
      x1,
      y1;
    if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));

    while (q = quads.pop()) {
      if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
        var xm = (x0 + x1) / 2,
          ym = (y0 + y1) / 2;
        if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
        if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
        if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
        if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      }
    }

    return this;
  }

  function tree_visitAfter(callback) {
    var quads = [],
      next = [],
      q;
    if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));

    while (q = quads.pop()) {
      var node = q.node;

      if (node.length) {
        var child,
          x0 = q.x0,
          y0 = q.y0,
          x1 = q.x1,
          y1 = q.y1,
          xm = (x0 + x1) / 2,
          ym = (y0 + y1) / 2;
        if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
        if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
        if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
        if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      }

      next.push(q);
    }

    while (q = next.pop()) {
      callback(q.node, q.x0, q.y0, q.x1, q.y1);
    }

    return this;
  }

  function defaultX(d) {
    return d[0];
  }

  function tree_x(_) {
    return arguments.length ? (this._x = _, this) : this._x;
  }

  function defaultY(d) {
    return d[1];
  }

  function tree_y(_) {
    return arguments.length ? (this._y = _, this) : this._y;
  }

  function quadtree(nodes, x, y) {
    var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
    return nodes == null ? tree : tree.addAll(nodes);
  }

  function Quadtree(x, y, x0, y0, x1, y1) {
    this._x = x;
    this._y = y;
    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    this._root = undefined;
  }

  function leaf_copy(leaf) {
    var copy = {
        data: leaf.data
      },
      next = copy;

    while (leaf = leaf.next) {
      next = next.next = {
        data: leaf.data
      };
    }

    return copy;
  }

  var treeProto = quadtree.prototype = Quadtree.prototype;

  treeProto.copy = function () {
    var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;
    if (!node) return copy;
    if (!node.length) return copy._root = leaf_copy(node), copy;
    nodes = [{
      source: node,
      target: copy._root = new Array(4)
    }];

    while (node = nodes.pop()) {
      for (var i = 0; i < 4; ++i) {
        if (child = node.source[i]) {
          if (child.length) nodes.push({
            source: child,
            target: node.target[i] = new Array(4)
          });else node.target[i] = leaf_copy(child);
        }
      }
    }

    return copy;
  };

  treeProto.add = tree_add;
  treeProto.addAll = addAll;
  treeProto.cover = tree_cover;
  treeProto.data = tree_data;
  treeProto.extent = tree_extent;
  treeProto.find = tree_find;
  treeProto.remove = tree_remove;
  treeProto.removeAll = removeAll;
  treeProto.root = tree_root;
  treeProto.size = tree_size;
  treeProto.visit = tree_visit;
  treeProto.visitAfter = tree_visitAfter;
  treeProto.x = tree_x;
  treeProto.y = tree_y;
  var prefix = "$";

  function Map$1() {}

  Map$1.prototype = map.prototype = {
    constructor: Map$1,
    has: function has(key) {
      return prefix + key in this;
    },
    get: function get(key) {
      return this[prefix + key];
    },
    set: function set(key, value) {
      this[prefix + key] = value;
      return this;
    },
    remove: function remove(key) {
      var property = prefix + key;
      return property in this && delete this[property];
    },
    clear: function clear() {
      for (var property in this) {
        if (property[0] === prefix) delete this[property];
      }
    },
    keys: function keys() {
      var keys = [];

      for (var property in this) {
        if (property[0] === prefix) keys.push(property.slice(1));
      }

      return keys;
    },
    values: function values() {
      var values = [];

      for (var property in this) {
        if (property[0] === prefix) values.push(this[property]);
      }

      return values;
    },
    entries: function entries() {
      var entries = [];

      for (var property in this) {
        if (property[0] === prefix) entries.push({
          key: property.slice(1),
          value: this[property]
        });
      }

      return entries;
    },
    size: function size() {
      var size = 0;

      for (var property in this) {
        if (property[0] === prefix) ++size;
      }

      return size;
    },
    empty: function empty() {
      for (var property in this) {
        if (property[0] === prefix) return false;
      }

      return true;
    },
    each: function each(f) {
      for (var property in this) {
        if (property[0] === prefix) f(this[property], property.slice(1), this);
      }
    }
  };

  function map(object, f) {
    var map = new Map$1(); // Copy constructor.

    if (object instanceof Map$1) object.each(function (value, key) {
      map.set(key, value);
    }); // Index array by numeric index or specified key function.
    else if (Array.isArray(object)) {
      var i = -1,
        n = object.length,
        o;
      if (f == null) while (++i < n) {
        map.set(i, object[i]);
      } else while (++i < n) {
        map.set(f(o = object[i], i, object), o);
      }
    } // Convert object to map.
    else if (object) for (var key in object) {
      map.set(key, object[key]);
    }
    return map;
  }

  function Set$1() {}

  var proto = map.prototype;
  Set$1.prototype = set.prototype = {
    constructor: Set$1,
    has: proto.has,
    add: function add(value) {
      value += "";
      this[prefix + value] = value;
      return this;
    },
    remove: proto.remove,
    clear: proto.clear,
    values: proto.keys,
    size: proto.size,
    empty: proto.empty,
    each: proto.each
  };

  function set(object, f) {
    var set = new Set$1(); // Copy constructor.

    if (object instanceof Set$1) object.each(function (value) {
      set.add(value);
    }); // Otherwise, assume it’s an array.
    else if (object) {
      var i = -1,
        n = object.length;
      if (f == null) while (++i < n) {
        set.add(object[i]);
      } else while (++i < n) {
        set.add(f(object[i], i, object));
      }
    }
    return set;
  }

  function index(d) {
    return d.index;
  }

  function find(nodeById, nodeId) {
    var node = nodeById.get(nodeId);
    if (!node) throw new Error("missing: " + nodeId);
    return node;
  }

  function link(links) {
    var id = index,
      strength = defaultStrength,
      strengths,
      distance = constant$1(30),
      distances,
      nodes,
      count,
      bias,
      iterations = 1;
    if (links == null) links = [];

    function defaultStrength(link) {
      return 1 / Math.min(count[link.source.index], count[link.target.index]);
    }

    function force(alpha) {
      for (var k = 0, n = links.length; k < iterations; ++k) {
        for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
          link = links[i], source = link.source, target = link.target;
          x = target.x + target.vx - source.x - source.vx || jiggle();
          y = target.y + target.vy - source.y - source.vy || jiggle();
          l = Math.sqrt(x * x + y * y);
          l = (l - distances[i]) / l * alpha * strengths[i];
          x *= l, y *= l;
          target.vx -= x * (b = bias[i]);
          target.vy -= y * b;
          source.vx += x * (b = 1 - b);
          source.vy += y * b;
        }
      }
    }

    function initialize() {
      if (!nodes) return;
      var i,
        n = nodes.length,
        m = links.length,
        nodeById = map(nodes, id),
        link;

      for (i = 0, count = new Array(n); i < m; ++i) {
        link = links[i], link.index = i;
        if (_typeof(link.source) !== "object") link.source = find(nodeById, link.source);
        if (_typeof(link.target) !== "object") link.target = find(nodeById, link.target);
        count[link.source.index] = (count[link.source.index] || 0) + 1;
        count[link.target.index] = (count[link.target.index] || 0) + 1;
      }

      for (i = 0, bias = new Array(m); i < m; ++i) {
        link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
      }

      strengths = new Array(m), initializeStrength();
      distances = new Array(m), initializeDistance();
    }

    function initializeStrength() {
      if (!nodes) return;

      for (var i = 0, n = links.length; i < n; ++i) {
        strengths[i] = +strength(links[i], i, links);
      }
    }

    function initializeDistance() {
      if (!nodes) return;

      for (var i = 0, n = links.length; i < n; ++i) {
        distances[i] = +distance(links[i], i, links);
      }
    }

    force.initialize = function (_) {
      nodes = _;
      initialize();
    };

    force.links = function (_) {
      return arguments.length ? (links = _, initialize(), force) : links;
    };

    force.id = function (_) {
      return arguments.length ? (id = _, force) : id;
    };

    force.iterations = function (_) {
      return arguments.length ? (iterations = +_, force) : iterations;
    };

    force.strength = function (_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$1(+_), initializeStrength(), force) : strength;
    };

    force.distance = function (_) {
      return arguments.length ? (distance = typeof _ === "function" ? _ : constant$1(+_), initializeDistance(), force) : distance;
    };

    return force;
  }

  var noop = {
    value: function value() {}
  };

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || t in _) throw new Error("illegal type: " + t);
      _[t] = [];
    }

    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames$1(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function (t) {
      var name = "",
        i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {
        type: t,
        name: name
      };
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function on(typename, callback) {
      var _ = this._,
        T = parseTypenames$1(typename + "", _),
        t,
        i = -1,
        n = T.length; // If no callback was specified, return the callback of the given type and name.

      if (arguments.length < 2) {
        while (++i < n) {
          if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
        }

        return;
      } // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.


      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);

      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);else if (callback == null) for (t in _) {
          _[t] = set$1(_[t], typename.name, null);
        }
      }

      return this;
    },
    copy: function copy() {
      var copy = {},
        _ = this._;

      for (var t in _) {
        copy[t] = _[t].slice();
      }

      return new Dispatch(copy);
    },
    call: function call(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) {
        args[i] = arguments[i + 2];
      }
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);

      for (t = this._[type], i = 0, n = t.length; i < n; ++i) {
        t[i].value.apply(that, args);
      }
    },
    apply: function apply(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);

      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) {
        t[i].value.apply(that, args);
      }
    }
  };

  function get(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set$1(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }

    if (callback != null) type.push({
      name: name,
      value: callback
    });
    return type;
  }

  var frame = 0,
    // is an animation frame pending?
    timeout = 0,
    // is a timeout pending?
    interval = 0,
    // are any timers active?
    pokeDelay = 1000,
    // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = (typeof performance === "undefined" ? "undefined" : _typeof(performance)) === "object" && performance.now ? performance : Date,
    setFrame = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (f) {
      setTimeout(f, 17);
    };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call = this._time = this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function restart(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);

      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;else taskHead = this;
        taskTail = this;
      }

      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function stop() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer();
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.

    ++frame; // Pretend we’ve set an alarm, if we haven’t already.

    var t = taskHead,
      e;

    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
      t = t._next;
    }

    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;

    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(),
      delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0,
      t1 = taskHead,
      t2,
      time = Infinity;

    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }

    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.

    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.

    if (delay > 24) {
      if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  var initialRadius = 10,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

  function simulation(_nodes) {
    var simulation,
      _alpha = 1,
      _alphaMin = 0.001,
      _alphaDecay = 1 - Math.pow(_alphaMin, 1 / 300),
      _alphaTarget = 0,
      _velocityDecay = 0.6,
      forces = map(),
      stepper = timer(step),
      event = dispatch("tick", "end");

    if (_nodes == null) _nodes = [];

    function step() {
      tick();
      event.call("tick", simulation);

      if (_alpha < _alphaMin) {
        stepper.stop();
        event.call("end", simulation);
      }
    }

    function tick(iterations) {
      var i,
        n = _nodes.length,
        node;
      if (iterations === undefined) iterations = 1;

      for (var k = 0; k < iterations; ++k) {
        _alpha += (_alphaTarget - _alpha) * _alphaDecay;
        forces.each(function (force) {
          force(_alpha);
        });

        for (i = 0; i < n; ++i) {
          node = _nodes[i];
          if (node.fx == null) node.x += node.vx *= _velocityDecay;else node.x = node.fx, node.vx = 0;
          if (node.fy == null) node.y += node.vy *= _velocityDecay;else node.y = node.fy, node.vy = 0;
        }
      }

      return simulation;
    }

    function initializeNodes() {
      for (var i = 0, n = _nodes.length, node; i < n; ++i) {
        node = _nodes[i], node.index = i;
        if (!isNaN(node.fx)) node.x = node.fx;
        if (!isNaN(node.fy)) node.y = node.fy;

        if (isNaN(node.x) || isNaN(node.y)) {
          var radius = initialRadius * Math.sqrt(i),
            angle = i * initialAngle;
          node.x = radius * Math.cos(angle);
          node.y = radius * Math.sin(angle);
        }

        if (isNaN(node.vx) || isNaN(node.vy)) {
          node.vx = node.vy = 0;
        }
      }
    }

    function initializeForce(force) {
      if (force.initialize) force.initialize(_nodes);
      return force;
    }

    initializeNodes();
    return simulation = {
      tick: tick,
      restart: function restart() {
        return stepper.restart(step), simulation;
      },
      stop: function stop() {
        return stepper.stop(), simulation;
      },
      nodes: function nodes(_) {
        return arguments.length ? (_nodes = _, initializeNodes(), forces.each(initializeForce), simulation) : _nodes;
      },
      alpha: function alpha(_) {
        return arguments.length ? (_alpha = +_, simulation) : _alpha;
      },
      alphaMin: function alphaMin(_) {
        return arguments.length ? (_alphaMin = +_, simulation) : _alphaMin;
      },
      alphaDecay: function alphaDecay(_) {
        return arguments.length ? (_alphaDecay = +_, simulation) : +_alphaDecay;
      },
      alphaTarget: function alphaTarget(_) {
        return arguments.length ? (_alphaTarget = +_, simulation) : _alphaTarget;
      },
      velocityDecay: function velocityDecay(_) {
        return arguments.length ? (_velocityDecay = 1 - _, simulation) : 1 - _velocityDecay;
      },
      force: function force(name, _) {
        return arguments.length > 1 ? (_ == null ? forces.remove(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
      },
      find: function find(x, y, radius) {
        var i = 0,
          n = _nodes.length,
          dx,
          dy,
          d2,
          node,
          closest;
        if (radius == null) radius = Infinity;else radius *= radius;

        for (i = 0; i < n; ++i) {
          node = _nodes[i];
          dx = x - node.x;
          dy = y - node.y;
          d2 = dx * dx + dy * dy;
          if (d2 < radius) closest = node, radius = d2;
        }

        return closest;
      },
      on: function on(name, _) {
        return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
      }
    };
  }

  function constant$2(x) {
    return function () {
      return x;
    };
  }

  function ellipseForce(padding, innerRepulsion, outerRepulsion) {
    var nodes;
    if (typeof padding !== "function") padding = constant$2(padding == null ? 4 : +padding);
    innerRepulsion = innerRepulsion == null ? 0.5 : +innerRepulsion;
    outerRepulsion = outerRepulsion == null ? 0.5 : +outerRepulsion;

    function force(alpha) {
      var i,
        j,
        n = nodes.length,
        // dimensions of this node
        node,
        my_padding,
        my_w,
        my_h,
        my_x,
        my_y,
        // often used multiples
        my_w2,
        my_h2,
        my_wh,
        // dimensions of the other node
        other,
        other_padding,
        other_w,
        other_h,
        other_x,
        other_y,
        // distance between nodes
        dist_x,
        dist_y,
        // components for the overall result
        force_ratio,
        dist,
        gap,
        repulsion,
        x_component,
        y_component,
        // computing elliptical force
        g,
        g2,
        x1,
        y1,
        x2,
        y2,
        d1,
        d2,
        force_ratio1,
        force_ratio2,
        // parameters
        myOuterRepulsion = outerRepulsion * 16;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        my_padding = +padding(node, i, nodes);
        my_w = node.rx + my_padding;
        my_h = node.ry + my_padding;
        my_w2 = my_w * my_w;
        my_h2 = my_h * my_h;
        my_wh = my_w * my_h;
        my_x = node.x + node.vx;
        my_y = node.y + node.vy;

        for (j = 0; j < n; ++j) {
          if (j == i) {
            continue;
          }

          other = nodes[j];
          other_padding = +padding(other, j, nodes);
          other_w = other.rx + other_padding;
          other_h = other.ry + other_padding;
          other_x = other.x + other.vx;
          other_y = other.y + other.vy;
          dist_x = my_x - other_x;
          dist_y = my_y - other_y;

          if (dist_x == 0 && dist_y == 0) {
            node.vx += Math.random() * 4 - 2;
            node.vy += Math.random() * 4 - 2;
            continue;
          } else if (dist_x == 0) {
            force_ratio = (my_h / my_w + other_h / other_w) / 2;
            dist = Math.abs(dist_y);
            gap = dist - my_h - other_h;
          } else if (dist_y == 0) {
            force_ratio = 1;
            dist = abs(dist_x);
            gap = dist - my_w - other_w;
          } else {
            // ellipse is defined as  x^2   y^2
            //                        --- + --- = 1
            //                        w^2   h^2
            // here x,y are points on ellipse's arc.
            // we have a line going between center points of two ellipses and we want to know
            // the point where it crosses the ellipse's arc. Because we know the line, we
            // know that y = g * x, where
            g = dist_y / dist_x; // now the only unknown in ellipse above is x, and thus we can find it by
            // moving pieces around (pen and paper work). equation becomes:
            //             w * h
            // x = ---------------------
            //     sqrt(h^2 + g^2 * w^2)

            g2 = g * g;
            x1 = my_wh / Math.sqrt(my_h2 + g2 * my_w2);
            y1 = g * x1; // the length of the little bit from the center of ellipse to its margin.
            // For circle it would be 'r', but for ellipse it varies.

            d1 = Math.sqrt(x1 * x1 + y1 * y1); // Strength of force that this ellipse eminates is modified by ratio of this bit
            // to the ellipse's width. (It doesn't matter if we use width or height as reference
            // point)

            force_ratio1 = d1 / my_w; // And same for the other ellipse:

            x2 = other_w * other_h / Math.sqrt(other_h * other_h + g2 * other_w * other_w);
            y2 = g * x2;
            d2 = Math.sqrt(x2 * x2 + y2 * y2);
            force_ratio2 = d2 / other_w; // now we can calculate the gap or overlap between two ellipses, and force ratio on
            // how strongly they should push as average of their force_ratios

            dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y);
            gap = dist - d2 - d1;
            force_ratio = (force_ratio1 + force_ratio2) / 2;
          }

          x_component = dist_x / dist;
          y_component = dist_y / dist;

          if (gap < 0) {
            // force GROWS as gap goes further into negative
            repulsion = Math.min(Math.max(1.0, innerRepulsion * force_ratio * -gap), 5.0);
            node.vx += repulsion * x_component;
            node.vy += repulsion * y_component;
          } else {
            // force DIMINISHES as gap becomes larger
            repulsion = Math.min(20.0, force_ratio * myOuterRepulsion * alpha / gap);
            node.vx += repulsion * x_component;
            node.vy += repulsion * y_component;
          }
        }
      }
    }

    force.initialize = function (my_nodes) {
      nodes = my_nodes;
    };

    force.outerRepulsion = function (my_outerRepulsion) {
      if (arguments.length) {
        outerRepulsion = +my_outerRepulsion;
        return force;
      } else {
        return outerRepulsion;
      }
    };

    force.innerRepulsion = function (my_innerRepulsion) {
      if (arguments.length) {
        innerRepulsion = +my_innerRepulsion;
        return force;
      } else {
        return innerRepulsion;
      }
    };

    force.padding = function (my_padding) {
      if (arguments.length) {
        if (typeof my_padding === "function") {
          padding = my_padding;
        } else {
          padding = constant$2(+my_padding);
        }

        return force;
      } else {
        return padding;
      }
    };

    return force;
  }

  function colors(specifier) {
    var n = specifier.length / 6 | 0,
      colors = new Array(n),
      i = 0;

    while (i < n) {
      colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
    }

    return colors;
  }

  colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
  var Accent = colors("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
  colors("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
  colors("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
  colors("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
  colors("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
  colors("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
  colors("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
  colors("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);

    for (var key in definition) {
      prototype[key] = definition[key];
    }

    return prototype;
  }

  function Color() {}

  var _darker = 0.7;

  var _brighter = 1 / _darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };
  define(Color, color, {
    displayable: function displayable() {
      return this.rgb().displayable();
    },
    hex: function hex() {
      return this.rgb().hex();
    },
    toString: function toString() {
      return this.rgb() + "";
    }
  });

  function color(format) {
    var m;
    format = (format + "").trim().toLowerCase();
    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb(m >> 8 & 0xf | m >> 4 & 0x0f0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
    ) : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
            : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
              : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
                : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
                  : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Rgb, rgb, extend(Color, {
    brighter: function brighter(k) {
      k = k == null ? _brighter : Math.pow(_brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker : Math.pow(_darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function rgb() {
      return this;
    },
    displayable: function displayable() {
      return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: function hex() {
      return "#" + _hex(this.r) + _hex(this.g) + _hex(this.b);
    },
    toString: function toString() {
      var a = this.opacity;
      a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
    }
  }));

  function _hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl();
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;

    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }

    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter: function brighter(k) {
      k = k == null ? _brighter : Math.pow(_brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker : Math.pow(_darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
      return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    }
  }));
  /* From FvD 13.37, CSS Color Module Level 3 */

  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  var deg2rad = Math.PI / 180;
  var rad2deg = 180 / Math.PI; // https://beta.observablehq.com/@mbostock/lab-and-rgb

  var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

  function labConvert(o) {
    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);

    if (o instanceof Hcl) {
      if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
      var h = o.h * deg2rad;
      return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
    }

    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
      x,
      z;
    if (r === g && g === b) x = z = y;else {
      x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
      z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
    }
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
  }

  function lab(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
  }

  function Lab(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Lab, lab, extend(Color, {
    brighter: function brighter(k) {
      return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker: function darker(k) {
      return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb: function rgb() {
      var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
      x = Xn * lab2xyz(x);
      y = Yn * lab2xyz(y);
      z = Zn * lab2xyz(z);
      return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
    }
  }));

  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }

  function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
  }

  function lrgb2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }

  function rgb2lrgb(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }

  function hclConvert(o) {
    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab)) o = labConvert(o);
    if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * rad2deg;
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }

  function hcl(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
  }

  function Hcl(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hcl, hcl, extend(Color, {
    brighter: function brighter(k) {
      return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
    },
    darker: function darker(k) {
      return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
    },
    rgb: function rgb() {
      return labConvert(this).rgb();
    }
  }));
  var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

  function cubehelixConvert(o) {
    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
      // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
  }

  function cubehelix(h, s, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
  }

  function Cubehelix(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Cubehelix, cubehelix, extend(Color, {
    brighter: function brighter(k) {
      k = k == null ? _brighter : Math.pow(_brighter, k);
      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker : Math.pow(_darker, k);
      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function rgb() {
      var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
      return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
    }
  }));

  function basis(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1,
      t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
  }

  function basis$1(values) {
    var n = values.length - 1;
    return function (t) {
      var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  function constant$3(x) {
    return function () {
      return x;
    };
  }

  function linear(a, d) {
    return function (t) {
      return a + t * d;
    };
  }

  function hue(a, b) {
    var d = b - a;
    return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$3(isNaN(a) ? b : a);
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant$3(isNaN(a) ? b : a);
  }

  function rgbSpline(spline) {
    return function (colors) {
      var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i,
        color;

      for (i = 0; i < n; ++i) {
        color = rgb(colors[i]);
        r[i] = color.r || 0;
        g[i] = color.g || 0;
        b[i] = color.b || 0;
      }

      r = spline(r);
      g = spline(g);
      b = spline(b);
      color.opacity = 1;
      return function (t) {
        color.r = r(t);
        color.g = g(t);
        color.b = b(t);
        return color + "";
      };
    };
  }

  var rgbBasis = rgbSpline(basis$1);
  var degrees = 180 / Math.PI;
  var rho = Math.SQRT2;

  function cubehelix$1(hue) {
    return function cubehelixGamma(y) {
      y = +y;

      function cubehelix$1(start, end) {
        var h = hue((start = cubehelix(start)).h, (end = cubehelix(end)).h),
          s = nogamma(start.s, end.s),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
        return function (t) {
          start.h = h(t);
          start.s = s(t);
          start.l = l(Math.pow(t, y));
          start.opacity = opacity(t);
          return start + "";
        };
      }

      cubehelix$1.gamma = cubehelixGamma;
      return cubehelix$1;
    }(1);
  }

  cubehelix$1(hue);
  var cubehelixLong = cubehelix$1(nogamma);

  function ramp(scheme) {
    return rgbBasis(scheme[scheme.length - 1]);
  }

  var scheme = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(colors);
  ramp(scheme);
  var scheme$1 = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(colors);
  ramp(scheme$1);
  var scheme$2 = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(colors);
  ramp(scheme$2);
  var scheme$3 = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(colors);
  ramp(scheme$3);
  var scheme$4 = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(colors);
  ramp(scheme$4);
  var scheme$5 = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(colors);
  ramp(scheme$5);
  var scheme$6 = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(colors);
  ramp(scheme$6);
  var scheme$7 = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(colors);
  ramp(scheme$7);
  var scheme$8 = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(colors);
  ramp(scheme$8);
  var scheme$9 = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(colors);
  ramp(scheme$9);
  var scheme$a = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(colors);
  ramp(scheme$a);
  var scheme$b = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(colors);
  ramp(scheme$b);
  var scheme$c = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(colors);
  ramp(scheme$c);
  var scheme$d = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(colors);
  ramp(scheme$d);
  var scheme$e = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(colors);
  ramp(scheme$e);
  var scheme$f = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(colors);
  ramp(scheme$f);
  var scheme$g = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(colors);
  ramp(scheme$g);
  var scheme$h = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(colors);
  ramp(scheme$h);
  var scheme$i = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(colors);
  ramp(scheme$i);
  var scheme$j = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(colors);
  ramp(scheme$j);
  var scheme$k = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(colors);
  ramp(scheme$k);
  var scheme$l = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(colors);
  ramp(scheme$l);
  var scheme$m = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(colors);
  ramp(scheme$m);
  var scheme$n = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(colors);
  ramp(scheme$n);
  var scheme$o = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(colors);
  ramp(scheme$o);
  var scheme$p = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(colors);
  ramp(scheme$p);
  var scheme$q = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(colors);
  ramp(scheme$q);
  cubehelixLong(cubehelix(300, 0.5, 0.0), cubehelix(-240, 0.5, 1.0));
  var warm = cubehelixLong(cubehelix(-100, 0.75, 0.35), cubehelix(80, 1.50, 0.8));
  var cool = cubehelixLong(cubehelix(260, 0.75, 0.35), cubehelix(80, 1.50, 0.8));
  var c = cubehelix();
  var c$1 = rgb(),
    pi_1_3 = Math.PI / 3,
    pi_2_3 = Math.PI * 2 / 3;

  function ramp$1(range) {
    var n = range.length;
    return function (t) {
      return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
    };
  }

  ramp$1(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
  var magma = ramp$1(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
  var inferno = ramp$1(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
  var plasma = ramp$1(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

  function _templateObject() {
    var data = _taggedTemplateLiteral(["\n      <style>\n        :host {\n          font-family: Helvetica, Arial, sans-serif;\n          font-size: 10px;\n        }\n        .gag-opened-tooltip {\n          visibility: visible;\n          float: left;\n          padding: 4px 10px 4px 4px;\n          margin: 2px;\n          width: 300px;\n          border: 1px solid black;\n          position: absolute;\n          background-color: whitesmoke;\n        }\n        .gag-closed-tooltip {\n          visibility: hidden;\n          position: absolute;\n        }\n        .gag-tooltip-close {\n          color: #fff;\n          background-color: #333333;\n          position: absolute;\n          top: -10px;\n          right: -10px;\n          cursor: pointer;\n          border-radius: 20px;\n          width: 20px;\n          height: 20px;\n          font-size: 14px !important;\n          text-align: center;\n          border: 1px solid #fff;\n        }\n      </style>\n      <div id=\"gag-tooltip\" class=\"gag-closed-tooltip\"></div>\n      <svg\n        id=\"annotext-graph\"\n        width=\"", "\"\n        height=\"", "\"\n      ></svg>\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var url = "https://www.ebi.ac.uk/QuickGO/services/ontology/ae/relations";

  var GoAnnotextGraph =
    /*#__PURE__*/
    function (_LitElement) {
      _inherits(GoAnnotextGraph, _LitElement);

      function GoAnnotextGraph() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, GoAnnotextGraph);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GoAnnotextGraph)).call.apply(_getPrototypeOf2, [this].concat(args)));
        _this.width = 1500;
        _this.height = 900;
        _this.rx = 38;
        _this.ry = 38;
        _this.data = undefined;
        _this.colorScale = Accent;
        _this.simulation = undefined;
        _this.link = void 0;
        _this.node = void 0;
        _this.text = void 0;
        _this.svg = void 0;
        _this.tooltip = void 0;

        _this.ticked = function () {
          _this.link.attr("x1", function (d) {
            return d.source.x;
          }).attr("y1", function (d) {
            return d.source.y;
          }).attr("x2", function (d) {
            return d.target.x;
          }).attr("y2", function (d) {
            return d.target.y;
          }).attr("stroke", _this.colorScale[0]).attr("stroke-width", 1);

          _this.node.selectAll("ellipse").attr("cx", function (d) {
            return d.x;
          }).attr("cy", function (d) {
            return d.y;
          });

          _this.text.attr("x", function (d) {
            return d.x;
          }).attr("y", function (d) {
            return d.y;
          });
          /* We might need this if still problems with fitting inside the svg box
              const radiusX = this.rx;
              const radiusY = this.ry;
              this.node
                .attr("cx", d => Math.max(radiusX, Math.min(this.width - radiusX, d.x)))
                .attr("cy", d => Math.max(radiusY, Math.min(this.height - radiusY, d.y)));
              this.text
                .attr("x", d => Math.max(radiusX, Math.min(this.width - radiusX, d.x)))
                .attr("y", d => Math.max(radiusY, Math.min(this.height - radiusY, d.y)));
          */


          _this.wrap();
        };

        _this.initForceDisplay = function () {
          if (_this.shadowRoot === null || typeof _this.data === "undefined") {
            return;
          }

          var dataWithSizes = _this.data.nodes.map(function (d) {
            return _objectSpread({}, d, {
              rx: _this.rx,
              ry: _this.ry
            });
          });

          _this.simulation = simulation().force("link", link().id(function (d) {
            return d.id;
          })).force("charge", ellipseForce(6, 0.5, 5.8)).force("center", center(_this.width / 2, _this.height / 2));
          _this.svg = select(_this.shadowRoot.getElementById("annotext-graph"));
          _this.tooltip = select(_this.shadowRoot.getElementById("gag-tooltip"));

          _this.svg.append("svg:defs").selectAll("marker").data(["end"]) // Different link/path types can be defined here
            .enter().append("svg:marker") // This section adds in the arrows
            .attr("id", String).attr("viewBox", "0 -10 15 15").attr("refX", 70).attr("refY", -1.5).attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto").append("svg:path").attr("d", "M0,-6L11,0L0,6"); // link lines


          _this.link = _this.svg.append("g").selectAll("line").data(_this.data.edges).enter().append("line").attr("marker-end", "url(#end)"); // node groups

          _this.node = _this.svg.append("g").selectAll(".nodeGroup").data(dataWithSizes).enter().append("g").attr("class", "nodeGroup").on("click", function (d) {
            _this.showTooltip(d, event.pageX, event.pageY);
          });

          _this.node.append("ellipse").attr("rx", function (d) {
            return d.rx;
          }).attr("ry", function (d) {
            return d.ry;
          }).attr("stroke", _this.colorScale[4]).attr("fill", _this.colorScale[1]).attr("id", function (d) {
            return "node_" + d.id;
          }); // node text


          _this.text = _this.node.append("text").attr("id", function (d) {
            return d.id;
          }).attr("dy", 2).attr("text-anchor", "middle").attr("fill", "black").text(function (d) {
            return d.id.replace(/_/gi, " ").trim();
          }).style("pointer-events", "none");

          _this.simulation.nodes(dataWithSizes).on("tick", _this.ticked);

          _this.simulation.force("link").links(_this.data.edges);
        };

        return _this;
      }

      _createClass(GoAnnotextGraph, [{
        key: "connectedCallback",
        value: function () {
          var _connectedCallback = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              var response;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _get(_getPrototypeOf(GoAnnotextGraph.prototype), "connectedCallback", this).call(this);

                      _context.next = 3;
                      return fetch(url);

                    case 3:
                      response = _context.sent;
                      _context.next = 6;
                      return response.json();

                    case 6:
                      this.data = _context.sent;

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

          function connectedCallback() {
            return _connectedCallback.apply(this, arguments);
          }

          return connectedCallback;
        }()
      }, {
        key: "updated",
        value: function updated() {
          if (typeof this.data === "undefined") {
            return;
          }

          this.initForceDisplay();
        }
      }, {
        key: "wrap",
        value: function wrap() {
          var _this2 = this;

          var width = 80;
          this.svg.selectAll("tspan").remove();

          this.svg.selectAll("text")._groups[0].forEach(function (elem) {
            var textNode = _this2.svg.select("#" + elem.id),
              words = elem.id.replace(/_/gi, " ").trim().split(/\s+/).reverse(),
              word,
              line = [],
              lineHeight = 1.1,
              //em
              x = textNode.datum().x,
              lineNumber = 1,
              tspan = textNode.text(null).append("tspan"),
              firstTspan = textNode.select("tspan");

            while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));

              if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = textNode.append("tspan").attr("x", x).attr("dx", "0em").attr("dy", lineHeight + "em").text(word);
                lineNumber++;
              }
            }

            firstTspan.attr("dy", -0.3 * lineNumber + "em");
          });
        }
      }, {
        key: "showTooltip",
        value: function showTooltip(datum, pageX, pageY) {
          var _this3 = this;

          this.tooltip.attr("class", "gag-closed-tooltip").html("");
          this.svg.selectAll("ellipse").attr("stroke-width", 1);
          var aNode = this.svg.select("#node_" + datum.id);
          aNode.attr("stroke-width", 5);
          this.tooltip.attr("class", "gag-opened-tooltip").style("left", pageX + "px").style("top", pageY - 28 + "px");
          this.tooltip.append("span").attr("class", "gag-tooltip-close").text("X").on("click", function () {
            aNode.attr("stroke-width", 1);

            _this3.tooltip.attr("class", "gag-closed-tooltip").html("");
          });
          var subsets = "";
          datum.subsets.forEach(function (set) {
            subsets += "<br>" + set;
          });
          this.tooltip.append("span").html(function () {
            return datum.id + "<hr>" + "<bold>GOC documentation:</bold> <a href='https://github.com/geneontology/annotation_extensions/blob/master/doc/" + datum.id + ".md' target='_blank'>" + datum.id + "</a> " + "<br>" + "<bold>GO Annotation Domain: </bold>" + datum.domain + "<br>" + "<bold>GO Annotation Range: </bold>" + datum.range + "<br>" + "<bold>Usage: </bold>" + datum.usage + "<br>" + "<bold>Subsets: </bold>" + subsets;
          });
        }
      }, {
        key: "render",
        value: function render() {
          return html(_templateObject(), this.width, this.height);
        }
      }], [{
        key: "properties",
        get: function get() {
          return {
            data: {}
          };
        }
      }]);

      return GoAnnotextGraph;
    }(LitElement);

  customElements.define("go-annotext-graph", GoAnnotextGraph);
})();
