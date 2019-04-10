function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e) {
  var t = {};

  function n(r) {
    if (t[r]) return t[r].exports;
    var a = t[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports;
  }

  n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: r
    });
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == _typeof(e) && e && e.__esModule) return e;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var a in e) {
      n.d(r, a, function (t) {
        return e[t];
      }.bind(null, a));
    }
    return r;
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return n.d(t, "a", t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = "", n(n.s = 17);
}([function (e, t) {
  function n(t) {
    return e.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    }, n(t);
  }

  e.exports = n;
}, function (e, t, n) {
  e.exports = n(11);
}, function (e, t) {
  e.exports = function (e, t) {
    return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
      raw: {
        value: Object.freeze(t)
      }
    }));
  };
}, function (e, t) {
  function n(e, t, n, r, a, i, f) {
    try {
      var o = e[i](f),
        c = o.value;
    } catch (e) {
      return void n(e);
    }

    o.done ? t(c) : Promise.resolve(c).then(r, a);
  }

  e.exports = function (e) {
    return function () {
      var t = this,
        r = arguments;
      return new Promise(function (a, i) {
        var f = e.apply(t, r);

        function o(e) {
          n(f, a, i, o, c, "next", e);
        }

        function c(e) {
          n(f, a, i, o, c, "throw", e);
        }

        o(void 0);
      });
    };
  };
}, function (e, t, n) {
  var r = n(12);

  e.exports = function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {},
        a = Object.keys(n);
      "function" == typeof Object.getOwnPropertySymbols && (a = a.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
        return Object.getOwnPropertyDescriptor(n, e).enumerable;
      }))), a.forEach(function (t) {
        r(e, t, n[t]);
      });
    }

    return e;
  };
}, function (e, t) {
  e.exports = function (e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  };
}, function (e, t) {
  function n(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  e.exports = function (e, t, r) {
    return t && n(e.prototype, t), r && n(e, r), e;
  };
}, function (e, t, n) {
  var r = n(13),
    a = n(14);

  e.exports = function (e, t) {
    return !t || "object" !== r(t) && "function" != typeof t ? a(e) : t;
  };
}, function (e, t, n) {
  n(0);
  var r = n(15);

  function a(t, n, i) {
    return "undefined" != typeof Reflect && Reflect.get ? e.exports = a = Reflect.get : e.exports = a = function a(e, t, n) {
      var a = r(e, t);

      if (a) {
        var i = Object.getOwnPropertyDescriptor(a, t);
        return i.get ? i.get.call(n) : i.value;
      }
    }, a(t, n, i || t);
  }

  e.exports = a;
}, function (e, t, n) {
  var r = n(16);

  e.exports = function (e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        writable: !0,
        configurable: !0
      }
    }), t && r(e, t);
  };
}, function (e, t, n) {
  !function (e) {
    "use strict";

    function t(e) {
      return function () {
        return e;
      };
    }

    e.ellipseForce = function (e, n, r) {
      var a;

      function i(t) {
        var i,
          f,
          o,
          c,
          s,
          d,
          u,
          l,
          h,
          b,
          p,
          y,
          g,
          v,
          m,
          w,
          _,
          x,
          S,
          N,
          A,
          k,
          P,
          E,
          M,
          O,
          C,
          T,
          j,
          L,
          V,
          R,
          q,
          z,
          I,
          $ = a.length,
          U = 16 * r;

        for (i = 0; i < $; ++i) {
          for (o = a[i], c = +e(o, i, a), s = o.rx + c, d = o.ry + c, h = s * s, b = d * d, p = s * d, u = o.x + o.vx, l = o.y + o.vy, f = 0; f < $; ++f) {
            f != i && (y = a[f], g = +e(y, f, a), v = y.rx + g, m = y.ry + g, w = y.x + y.vx, _ = y.y + y.vy, S = l - _, 0 != (x = u - w) || 0 != S ? (0 == x ? (N = (d / s + m / v) / 2, A = Math.abs(S), k = A - d - m) : 0 == S ? (N = 1, A = abs(x), k = A - s - v) : (C = (O = S / x) * O, T = p / Math.sqrt(b + C * h), j = O * T, R = Math.sqrt(T * T + j * j), z = R / s, L = v * m / Math.sqrt(m * m + C * v * v), V = O * L, q = Math.sqrt(L * L + V * V), I = q / v, A = Math.sqrt(x * x + S * S), k = A - q - R, N = (z + I) / 2), E = x / A, M = S / A, k < 0 ? (P = Math.min(Math.max(1, n * N * -k), 5), o.vx += P * E, o.vy += P * M) : (P = Math.min(20, N * U * t / k), o.vx += P * E, o.vy += P * M)) : (o.vx += 4 * Math.random() - 2, o.vy += 4 * Math.random() - 2));
          }
        }
      }

      return "function" != typeof e && (e = t(null == e ? 4 : +e)), n = null == n ? .5 : +n, r = null == r ? .5 : +r, i.initialize = function (e) {
        a = e;
      }, i.outerRepulsion = function (e) {
        return arguments.length ? (r = +e, i) : r;
      }, i.innerRepulsion = function (e) {
        return arguments.length ? (n = +e, i) : n;
      }, i.padding = function (n) {
        return arguments.length ? (e = "function" == typeof n ? n : t(+n), i) : e;
      }, i;
    }, Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }(t);
}, function (e, t, n) {
  var r = function (e) {
    "use strict";

    var t,
      n = Object.prototype,
      r = n.hasOwnProperty,
      a = "function" == typeof Symbol ? Symbol : {},
      i = a.iterator || "@@iterator",
      f = a.asyncIterator || "@@asyncIterator",
      o = a.toStringTag || "@@toStringTag";

    function c(e, t, n, r) {
      var a = t && t.prototype instanceof p ? t : p,
        i = Object.create(a.prototype),
        f = new P(r || []);
      return i._invoke = function (e, t, n) {
        var r = d;
        return function (a, i) {
          if (r === l) throw new Error("Generator is already running");

          if (r === h) {
            if ("throw" === a) throw i;
            return M();
          }

          for (n.method = a, n.arg = i;;) {
            var f = n.delegate;

            if (f) {
              var o = N(f, n);

              if (o) {
                if (o === b) continue;
                return o;
              }
            }

            if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
              if (r === d) throw r = h, n.arg;
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            r = l;
            var c = s(e, t, n);

            if ("normal" === c.type) {
              if (r = n.done ? h : u, c.arg === b) continue;
              return {
                value: c.arg,
                done: n.done
              };
            }

            "throw" === c.type && (r = h, n.method = "throw", n.arg = c.arg);
          }
        };
      }(e, n, f), i;
    }

    function s(e, t, n) {
      try {
        return {
          type: "normal",
          arg: e.call(t, n)
        };
      } catch (e) {
        return {
          type: "throw",
          arg: e
        };
      }
    }

    e.wrap = c;
    var d = "suspendedStart",
      u = "suspendedYield",
      l = "executing",
      h = "completed",
      b = {};

    function p() {}

    function y() {}

    function g() {}

    var v = {};

    v[i] = function () {
      return this;
    };

    var m = Object.getPrototypeOf,
      w = m && m(m(E([])));
    w && w !== n && r.call(w, i) && (v = w);

    var _ = g.prototype = p.prototype = Object.create(v);

    function x(e) {
      ["next", "throw", "return"].forEach(function (t) {
        e[t] = function (e) {
          return this._invoke(t, e);
        };
      });
    }

    function S(e) {
      var t;

      this._invoke = function (n, a) {
        function i() {
          return new Promise(function (t, i) {
            !function t(n, a, i, f) {
              var o = s(e[n], e, a);

              if ("throw" !== o.type) {
                var c = o.arg,
                  d = c.value;
                return d && "object" == _typeof(d) && r.call(d, "__await") ? Promise.resolve(d.__await).then(function (e) {
                  t("next", e, i, f);
                }, function (e) {
                  t("throw", e, i, f);
                }) : Promise.resolve(d).then(function (e) {
                  c.value = e, i(c);
                }, function (e) {
                  return t("throw", e, i, f);
                });
              }

              f(o.arg);
            }(n, a, t, i);
          });
        }

        return t = t ? t.then(i, i) : i();
      };
    }

    function N(e, n) {
      var r = e.iterator[n.method];

      if (r === t) {
        if (n.delegate = null, "throw" === n.method) {
          if (e.iterator.return && (n.method = "return", n.arg = t, N(e, n), "throw" === n.method)) return b;
          n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return b;
      }

      var a = s(r, e.iterator, n.arg);
      if ("throw" === a.type) return n.method = "throw", n.arg = a.arg, n.delegate = null, b;
      var i = a.arg;
      return i ? i.done ? (n[e.resultName] = i.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, b) : i : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, b);
    }

    function A(e) {
      var t = {
        tryLoc: e[0]
      };
      1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
    }

    function k(e) {
      var t = e.completion || {};
      t.type = "normal", delete t.arg, e.completion = t;
    }

    function P(e) {
      this.tryEntries = [{
        tryLoc: "root"
      }], e.forEach(A, this), this.reset(!0);
    }

    function E(e) {
      if (e) {
        var n = e[i];
        if (n) return n.call(e);
        if ("function" == typeof e.next) return e;

        if (!isNaN(e.length)) {
          var a = -1,
            f = function n() {
              for (; ++a < e.length;) {
                if (r.call(e, a)) return n.value = e[a], n.done = !1, n;
              }

              return n.value = t, n.done = !0, n;
            };

          return f.next = f;
        }
      }

      return {
        next: M
      };
    }

    function M() {
      return {
        value: t,
        done: !0
      };
    }

    return y.prototype = _.constructor = g, g.constructor = y, g[o] = y.displayName = "GeneratorFunction", e.isGeneratorFunction = function (e) {
      var t = "function" == typeof e && e.constructor;
      return !!t && (t === y || "GeneratorFunction" === (t.displayName || t.name));
    }, e.mark = function (e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g, o in e || (e[o] = "GeneratorFunction")), e.prototype = Object.create(_), e;
    }, e.awrap = function (e) {
      return {
        __await: e
      };
    }, x(S.prototype), S.prototype[f] = function () {
      return this;
    }, e.AsyncIterator = S, e.async = function (t, n, r, a) {
      var i = new S(c(t, n, r, a));
      return e.isGeneratorFunction(n) ? i : i.next().then(function (e) {
        return e.done ? e.value : i.next();
      });
    }, x(_), _[o] = "Generator", _[i] = function () {
      return this;
    }, _.toString = function () {
      return "[object Generator]";
    }, e.keys = function (e) {
      var t = [];

      for (var n in e) {
        t.push(n);
      }

      return t.reverse(), function n() {
        for (; t.length;) {
          var r = t.pop();
          if (r in e) return n.value = r, n.done = !1, n;
        }

        return n.done = !0, n;
      };
    }, e.values = E, P.prototype = {
      constructor: P,
      reset: function reset(e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(k), !e) for (var n in this) {
          "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t);
        }
      },
      stop: function stop() {
        this.done = !0;
        var e = this.tryEntries[0].completion;
        if ("throw" === e.type) throw e.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(e) {
        if (this.done) throw e;
        var n = this;

        function a(r, a) {
          return o.type = "throw", o.arg = e, n.next = r, a && (n.method = "next", n.arg = t), !!a;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var f = this.tryEntries[i],
            o = f.completion;
          if ("root" === f.tryLoc) return a("end");

          if (f.tryLoc <= this.prev) {
            var c = r.call(f, "catchLoc"),
              s = r.call(f, "finallyLoc");

            if (c && s) {
              if (this.prev < f.catchLoc) return a(f.catchLoc, !0);
              if (this.prev < f.finallyLoc) return a(f.finallyLoc);
            } else if (c) {
              if (this.prev < f.catchLoc) return a(f.catchLoc, !0);
            } else {
              if (!s) throw new Error("try statement without catch or finally");
              if (this.prev < f.finallyLoc) return a(f.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(e, t) {
        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
          var a = this.tryEntries[n];

          if (a.tryLoc <= this.prev && r.call(a, "finallyLoc") && this.prev < a.finallyLoc) {
            var i = a;
            break;
          }
        }

        i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
        var f = i ? i.completion : {};
        return f.type = e, f.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, b) : this.complete(f);
      },
      complete: function complete(e, t) {
        if ("throw" === e.type) throw e.arg;
        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), b;
      },
      finish: function finish(e) {
        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
          var n = this.tryEntries[t];
          if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), k(n), b;
        }
      },
      catch: function _catch(e) {
        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
          var n = this.tryEntries[t];

          if (n.tryLoc === e) {
            var r = n.completion;

            if ("throw" === r.type) {
              var a = r.arg;
              k(n);
            }

            return a;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(e, n, r) {
        return this.delegate = {
          iterator: E(e),
          resultName: n,
          nextLoc: r
        }, "next" === this.method && (this.arg = t), b;
      }
    }, e;
  }(e.exports);

  try {
    regeneratorRuntime = r;
  } catch (e) {
    Function("r", "regeneratorRuntime = r")(r);
  }
}, function (e, t) {
  e.exports = function (e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  };
}, function (e, t) {
  function n(e) {
    return (n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(e);
  }

  function r(t) {
    return "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? e.exports = r = function r(e) {
      return n(e);
    } : e.exports = r = function r(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : n(e);
    }, r(t);
  }

  e.exports = r;
}, function (e, t) {
  e.exports = function (e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  };
}, function (e, t, n) {
  var r = n(0);

  e.exports = function (e, t) {
    for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = r(e));) {
      ;
    }

    return e;
  };
}, function (e, t) {
  function n(t, r) {
    return e.exports = n = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    }, n(t, r);
  }

  e.exports = n;
}, function (e, t, n) {
  "use strict";

  n.r(t);

  var r = n(2),
    a = n.n(r),
    i = n(1),
    f = n.n(i),
    o = n(3),
    c = n.n(o),
    s = n(4),
    d = n.n(s),
    u = n(5),
    l = n.n(u),
    h = n(6),
    b = n.n(h),
    p = n(7),
    y = n.n(p),
    g = n(0),
    v = n.n(g),
    m = n(8),
    w = n.n(m),
    _ = n(9),
    x = n.n(_);
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


  var S = new WeakMap(),
    N = function N(e) {
      return "function" == typeof e && S.has(e);
    },
    A = void 0 !== window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback,
    k = function k(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var r = t;

      for (; r !== n;) {
        var _t2 = r.nextSibling;
        e.removeChild(r), r = _t2;
      }
    },
    P = {},
    E = {},
    M = "{{lit-".concat(String(Math.random()).slice(2), "}}"),
    O = "<!--".concat(M, "-->"),
    C = new RegExp("".concat(M, "|").concat(O)),
    T = "$lit$";

  var j = function j(e, t) {
    var _this = this;

    _classCallCheck(this, j);

    this.parts = [], this.element = t;
    var n = -1,
      r = 0;

    var a = [],
      i = function i(t) {
        var f = t.content,
          o = document.createTreeWalker(f, 133, null, !1);
        var c = 0;

        for (; o.nextNode();) {
          n++;
          var _t3 = o.currentNode;

          if (1 === _t3.nodeType) {
            if (_t3.hasAttributes()) {
              var _a = _t3.attributes;
              var _i = 0;

              for (var _e2 = 0; _e2 < _a.length; _e2++) {
                _a[_e2].value.indexOf(M) >= 0 && _i++;
              }

              for (; _i-- > 0;) {
                var _a2 = e.strings[r],
                  _i2 = R.exec(_a2)[2],
                  _f = _i2.toLowerCase() + T,
                  _o = _t3.getAttribute(_f).split(C);

                _this.parts.push({
                  type: "attribute",
                  index: n,
                  name: _i2,
                  strings: _o
                }), _t3.removeAttribute(_f), r += _o.length - 1;
              }
            }

            "TEMPLATE" === _t3.tagName && i(_t3);
          } else if (3 === _t3.nodeType) {
            var _e3 = _t3.data;

            if (_e3.indexOf(M) >= 0) {
              var _i3 = _t3.parentNode,
                _f2 = _e3.split(C),
                _o2 = _f2.length - 1;

              for (var _e4 = 0; _e4 < _o2; _e4++) {
                _i3.insertBefore("" === _f2[_e4] ? V() : document.createTextNode(_f2[_e4]), _t3), _this.parts.push({
                  type: "node",
                  index: ++n
                });
              }

              "" === _f2[_o2] ? (_i3.insertBefore(V(), _t3), a.push(_t3)) : _t3.data = _f2[_o2], r += _o2;
            }
          } else if (8 === _t3.nodeType) if (_t3.data === M) {
            var _e5 = _t3.parentNode;
            null !== _t3.previousSibling && n !== c || (n++, _e5.insertBefore(V(), _t3)), c = n, _this.parts.push({
              type: "node",
              index: n
            }), null === _t3.nextSibling ? _t3.data = "" : (a.push(_t3), n--), r++;
          } else {
            var _e6 = -1;

            for (; -1 !== (_e6 = _t3.data.indexOf(M, _e6 + 1));) {
              _this.parts.push({
                type: "node",
                index: -1
              });
            }
          }
        }
      };

    i(t);

    for (var _i4 = 0; _i4 < a.length; _i4++) {
      var _e7 = a[_i4];

      _e7.parentNode.removeChild(_e7);
    }
  };

  var L = function L(e) {
      return -1 !== e.index;
    },
    V = function V() {
      return document.createComment("");
    },
    R = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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


  var q =
    /*#__PURE__*/
    function () {
      function q(e, t, n) {
        _classCallCheck(this, q);

        this._parts = [], this.template = e, this.processor = t, this.options = n;
      }

      _createClass(q, [{
        key: "update",
        value: function update(e) {
          var t = 0;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this._parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _n2 = _step.value;
              void 0 !== _n2 && _n2.setValue(e[t]), t++;
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
              var _e8 = _step2.value;
              void 0 !== _e8 && _e8.commit();
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
          var _this2 = this;

          var e = A ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0),
            t = this.template.parts;
          var n = 0,
            r = 0;

          var a = function a(e) {
            var i = document.createTreeWalker(e, 133, null, !1);
            var f = i.nextNode();

            for (; n < t.length && null !== f;) {
              var _e9 = t[n];
              if (L(_e9)) {
                if (r === _e9.index) {
                  var _this2$_parts;

                  if ("node" === _e9.type) {
                    var _e10 = _this2.processor.handleTextExpression(_this2.options);

                    _e10.insertAfterNode(f.previousSibling), _this2._parts.push(_e10);
                  } else (_this2$_parts = _this2._parts).push.apply(_this2$_parts, _toConsumableArray(_this2.processor.handleAttributeExpressions(f, _e9.name, _e9.strings, _this2.options)));

                  n++;
                } else r++, "TEMPLATE" === f.nodeName && a(f.content), f = i.nextNode();
              } else _this2._parts.push(void 0), n++;
            }
          };

          return a(e), A && (document.adoptNode(e), customElements.upgrade(e)), e;
        }
      }]);

      return q;
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


  var z =
    /*#__PURE__*/
    function () {
      function z(e, t, n, r) {
        _classCallCheck(this, z);

        this.strings = e, this.values = t, this.type = n, this.processor = r;
      }

      _createClass(z, [{
        key: "getHTML",
        value: function getHTML() {
          var e = this.strings.length - 1;
          var t = "";

          for (var _n3 = 0; _n3 < e; _n3++) {
            var _e11 = this.strings[_n3],
              _r2 = R.exec(_e11);

            t += _r2 ? _e11.substr(0, _r2.index) + _r2[1] + _r2[2] + T + _r2[3] + M : _e11 + O;
          }

          return t + this.strings[e];
        }
      }, {
        key: "getTemplateElement",
        value: function getTemplateElement() {
          var e = document.createElement("template");
          return e.innerHTML = this.getHTML(), e;
        }
      }]);

      return z;
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


  var I = function I(e) {
    return null === e || !("object" == _typeof(e) || "function" == typeof e);
  };

  var $ =
    /*#__PURE__*/
    function () {
      function $(e, t, n) {
        _classCallCheck(this, $);

        this.dirty = !0, this.element = e, this.name = t, this.strings = n, this.parts = [];

        for (var _e12 = 0; _e12 < n.length - 1; _e12++) {
          this.parts[_e12] = this._createPart();
        }
      }

      _createClass($, [{
        key: "_createPart",
        value: function _createPart() {
          return new U(this);
        }
      }, {
        key: "_getValue",
        value: function _getValue() {
          var e = this.strings,
            t = e.length - 1;
          var n = "";

          for (var _r3 = 0; _r3 < t; _r3++) {
            n += e[_r3];
            var _t4 = this.parts[_r3];

            if (void 0 !== _t4) {
              var _e13 = _t4.value;

              if (null != _e13 && (Array.isArray(_e13) || "string" != typeof _e13 && _e13[Symbol.iterator])) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                  for (var _iterator3 = _e13[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _t5 = _step3.value;
                    n += "string" == typeof _t5 ? _t5 : String(_t5);
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
              } else n += "string" == typeof _e13 ? _e13 : String(_e13);
            }
          }

          return n += e[t];
        }
      }, {
        key: "commit",
        value: function commit() {
          this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()));
        }
      }]);

      return $;
    }();

  var U =
    /*#__PURE__*/
    function () {
      function U(e) {
        _classCallCheck(this, U);

        this.value = void 0, this.committer = e;
      }

      _createClass(U, [{
        key: "setValue",
        value: function setValue(e) {
          e === P || I(e) && e === this.value || (this.value = e, N(e) || (this.committer.dirty = !0));
        }
      }, {
        key: "commit",
        value: function commit() {
          for (; N(this.value);) {
            var _e14 = this.value;
            this.value = P, _e14(this);
          }

          this.value !== P && this.committer.commit();
        }
      }]);

      return U;
    }();

  var F =
    /*#__PURE__*/
    function () {
      function F(e) {
        _classCallCheck(this, F);

        this.value = void 0, this._pendingValue = void 0, this.options = e;
      }

      _createClass(F, [{
        key: "appendInto",
        value: function appendInto(e) {
          this.startNode = e.appendChild(V()), this.endNode = e.appendChild(V());
        }
      }, {
        key: "insertAfterNode",
        value: function insertAfterNode(e) {
          this.startNode = e, this.endNode = e.nextSibling;
        }
      }, {
        key: "appendIntoPart",
        value: function appendIntoPart(e) {
          e._insert(this.startNode = V()), e._insert(this.endNode = V());
        }
      }, {
        key: "insertAfterPart",
        value: function insertAfterPart(e) {
          e._insert(this.startNode = V()), this.endNode = e.endNode, e.endNode = this.startNode;
        }
      }, {
        key: "setValue",
        value: function setValue(e) {
          this._pendingValue = e;
        }
      }, {
        key: "commit",
        value: function commit() {
          for (; N(this._pendingValue);) {
            var _e15 = this._pendingValue;
            this._pendingValue = P, _e15(this);
          }

          var e = this._pendingValue;
          e !== P && (I(e) ? e !== this.value && this._commitText(e) : e instanceof z ? this._commitTemplateResult(e) : e instanceof Node ? this._commitNode(e) : Array.isArray(e) || e[Symbol.iterator] ? this._commitIterable(e) : e === E ? (this.value = E, this.clear()) : this._commitText(e));
        }
      }, {
        key: "_insert",
        value: function _insert(e) {
          this.endNode.parentNode.insertBefore(e, this.endNode);
        }
      }, {
        key: "_commitNode",
        value: function _commitNode(e) {
          this.value !== e && (this.clear(), this._insert(e), this.value = e);
        }
      }, {
        key: "_commitText",
        value: function _commitText(e) {
          var t = this.startNode.nextSibling;
          e = null == e ? "" : e, t === this.endNode.previousSibling && 3 === t.nodeType ? t.data = e : this._commitNode(document.createTextNode("string" == typeof e ? e : String(e))), this.value = e;
        }
      }, {
        key: "_commitTemplateResult",
        value: function _commitTemplateResult(e) {
          var t = this.options.templateFactory(e);
          if (this.value instanceof q && this.value.template === t) this.value.update(e.values);else {
            var _n4 = new q(t, e.processor, this.options),
              _r4 = _n4._clone();

            _n4.update(e.values), this._commitNode(_r4), this.value = _n4;
          }
        }
      }, {
        key: "_commitIterable",
        value: function _commitIterable(e) {
          Array.isArray(this.value) || (this.value = [], this.clear());
          var t = this.value;
          var n,
            r = 0;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = e[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _a3 = _step4.value;
              void 0 === (n = t[r]) && (n = new F(this.options), t.push(n), 0 === r ? n.appendIntoPart(this) : n.insertAfterPart(t[r - 1])), n.setValue(_a3), n.commit(), r++;
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

          r < t.length && (t.length = r, this.clear(n && n.endNode));
        }
      }, {
        key: "clear",
        value: function clear() {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.startNode;
          k(this.startNode.parentNode, e.nextSibling, this.endNode);
        }
      }]);

      return F;
    }();

  var B =
    /*#__PURE__*/
    function () {
      function B(e, t, n) {
        _classCallCheck(this, B);

        if (this.value = void 0, this._pendingValue = void 0, 2 !== n.length || "" !== n[0] || "" !== n[1]) throw new Error("Boolean attributes can only contain a single expression");
        this.element = e, this.name = t, this.strings = n;
      }

      _createClass(B, [{
        key: "setValue",
        value: function setValue(e) {
          this._pendingValue = e;
        }
      }, {
        key: "commit",
        value: function commit() {
          for (; N(this._pendingValue);) {
            var _e16 = this._pendingValue;
            this._pendingValue = P, _e16(this);
          }

          if (this._pendingValue === P) return;
          var e = !!this._pendingValue;
          this.value !== e && (e ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name)), this.value = e, this._pendingValue = P;
        }
      }]);

      return B;
    }();

  var D =
    /*#__PURE__*/
    function (_$) {
      _inherits(D, _$);

      function D(e, t, n) {
        var _this3;

        _classCallCheck(this, D);

        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(D).call(this, e, t, n)), _this3.single = 2 === n.length && "" === n[0] && "" === n[1];
        return _this3;
      }

      _createClass(D, [{
        key: "_createPart",
        value: function _createPart() {
          return new X(this);
        }
      }, {
        key: "_getValue",
        value: function _getValue() {
          return this.single ? this.parts[0].value : _get(_getPrototypeOf(D.prototype), "_getValue", this).call(this);
        }
      }, {
        key: "commit",
        value: function commit() {
          this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue());
        }
      }]);

      return D;
    }($);

  var X =
    /*#__PURE__*/
    function (_U) {
      _inherits(X, _U);

      function X() {
        _classCallCheck(this, X);

        return _possibleConstructorReturn(this, _getPrototypeOf(X).apply(this, arguments));
      }

      return X;
    }(U);

  var H = !1;

  try {
    var _e17 = {
      get capture() {
        return H = !0, !1;
      }

    };
    window.addEventListener("test", _e17, _e17), window.removeEventListener("test", _e17, _e17);
  } catch (e) {}

  var G =
    /*#__PURE__*/
    function () {
      function G(e, t, n) {
        var _this4 = this;

        _classCallCheck(this, G);

        this.value = void 0, this._pendingValue = void 0, this.element = e, this.eventName = t, this.eventContext = n, this._boundHandleEvent = function (e) {
          return _this4.handleEvent(e);
        };
      }

      _createClass(G, [{
        key: "setValue",
        value: function setValue(e) {
          this._pendingValue = e;
        }
      }, {
        key: "commit",
        value: function commit() {
          for (; N(this._pendingValue);) {
            var _e18 = this._pendingValue;
            this._pendingValue = P, _e18(this);
          }

          if (this._pendingValue === P) return;
          var e = this._pendingValue,
            t = this.value,
            n = null == e || null != t && (e.capture !== t.capture || e.once !== t.once || e.passive !== t.passive),
            r = null != e && (null == t || n);
          n && this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options), r && (this._options = Y(e), this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options)), this.value = e, this._pendingValue = P;
        }
      }, {
        key: "handleEvent",
        value: function handleEvent(e) {
          "function" == typeof this.value ? this.value.call(this.eventContext || this.element, e) : this.value.handleEvent(e);
        }
      }]);

      return G;
    }();

  var Y = function Y(e) {
    return e && (H ? {
      capture: e.capture,
      passive: e.passive,
      once: e.once
    } : e.capture);
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


  var W = new (
    /*#__PURE__*/
    function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      _createClass(_class, [{
        key: "handleAttributeExpressions",
        value: function handleAttributeExpressions(e, t, n, r) {
          var a = t[0];
          return "." === a ? new D(e, t.slice(1), n).parts : "@" === a ? [new G(e, t.slice(1), r.eventContext)] : "?" === a ? [new B(e, t.slice(1), n)] : new $(e, t, n).parts;
        }
      }, {
        key: "handleTextExpression",
        value: function handleTextExpression(e) {
          return new F(e);
        }
      }]);

      return _class;
    }())();
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

  function J(e) {
    var t = Q.get(e.type);
    void 0 === t && (t = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    }, Q.set(e.type, t));
    var n = t.stringsArray.get(e.strings);
    if (void 0 !== n) return n;
    var r = e.strings.join(M);
    return void 0 === (n = t.keyString.get(r)) && (n = new j(e, e.getTemplateElement()), t.keyString.set(r, n)), t.stringsArray.set(e.strings, n), n;
  }

  var Q = new Map(),
    K = new WeakMap();
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

  (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.0.0");
  var Z = 133;

  function ee(e, t) {
    var n = e.element.content,
      r = e.parts,
      a = document.createTreeWalker(n, Z, null, !1);
    var i = ne(r),
      f = r[i],
      o = -1,
      c = 0;
    var s = [];
    var d = null;

    for (; a.nextNode();) {
      o++;
      var _e19 = a.currentNode;

      for (_e19.previousSibling === d && (d = null), t.has(_e19) && (s.push(_e19), null === d && (d = _e19)), null !== d && c++; void 0 !== f && f.index === o;) {
        f.index = null !== d ? -1 : f.index - c, f = r[i = ne(r, i)];
      }
    }

    s.forEach(function (e) {
      return e.parentNode.removeChild(e);
    });
  }

  var te = function te(e) {
      var t = 11 === e.nodeType ? 0 : 1;
      var n = document.createTreeWalker(e, Z, null, !1);

      for (; n.nextNode();) {
        t++;
      }

      return t;
    },
    ne = function ne(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      for (var _n5 = t + 1; _n5 < e.length; _n5++) {
        var _t6 = e[_n5];
        if (L(_t6)) return _n5;
      }

      return -1;
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


  var re = function re(e, t) {
    return "".concat(e, "--").concat(t);
  };

  var ae = !0;
  void 0 === window.ShadyCSS ? ae = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."), ae = !1);

  var ie = function ie(e) {
      return function (t) {
        var n = re(t.type, e);
        var r = Q.get(n);
        void 0 === r && (r = {
          stringsArray: new WeakMap(),
          keyString: new Map()
        }, Q.set(n, r));
        var a = r.stringsArray.get(t.strings);
        if (void 0 !== a) return a;
        var i = t.strings.join(M);

        if (void 0 === (a = r.keyString.get(i))) {
          var _n6 = t.getTemplateElement();

          ae && window.ShadyCSS.prepareTemplateDom(_n6, e), a = new j(t, _n6), r.keyString.set(i, a);
        }

        return r.stringsArray.set(t.strings, a), a;
      };
    },
    fe = ["html", "svg"],
    oe = new Set(),
    ce = function ce(e, t, n) {
      oe.add(n);
      var r = e.querySelectorAll("style");
      if (0 === r.length) return void window.ShadyCSS.prepareTemplateStyles(t.element, n);
      var a = document.createElement("style");

      for (var _e20 = 0; _e20 < r.length; _e20++) {
        var _t7 = r[_e20];
        _t7.parentNode.removeChild(_t7), a.textContent += _t7.textContent;
      }

      if (function (e) {
        fe.forEach(function (t) {
          var n = Q.get(re(t, e));
          void 0 !== n && n.keyString.forEach(function (e) {
            var t = e.element.content,
              n = new Set();
            Array.from(t.querySelectorAll("style")).forEach(function (e) {
              n.add(e);
            }), ee(e, n);
          });
        });
      }(n), function (e, t) {
        var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var r = e.element.content,
          a = e.parts;
        if (null == n) return void r.appendChild(t);
        var i = document.createTreeWalker(r, Z, null, !1);
        var f = ne(a),
          o = 0,
          c = -1;

        for (; i.nextNode();) {
          for (c++, i.currentNode === n && (o = te(t), n.parentNode.insertBefore(t, n)); -1 !== f && a[f].index === c;) {
            if (o > 0) {
              for (; -1 !== f;) {
                a[f].index += o, f = ne(a, f);
              }

              return;
            }

            f = ne(a, f);
          }
        }
      }(t, a, t.element.content.firstChild), window.ShadyCSS.prepareTemplateStyles(t.element, n), window.ShadyCSS.nativeShadow) {
        var _n7 = t.element.content.querySelector("style");

        e.insertBefore(_n7.cloneNode(!0), e.firstChild);
      } else {
        t.element.content.insertBefore(a, t.element.content.firstChild);

        var _e21 = new Set();

        _e21.add(a), ee(t, _e21);
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


  window.JSCompiler_renameProperty = function (e, t) {
    return e;
  };

  var se = {
      toAttribute: function toAttribute(e, t) {
        switch (t) {
          case Boolean:
            return e ? "" : null;

          case Object:
          case Array:
            return null == e ? e : JSON.stringify(e);
        }

        return e;
      },
      fromAttribute: function fromAttribute(e, t) {
        switch (t) {
          case Boolean:
            return null !== e;

          case Number:
            return null === e ? null : Number(e);

          case Object:
          case Array:
            return JSON.parse(e);
        }

        return e;
      }
    },
    de = function de(e, t) {
      return t !== e && (t == t || e == e);
    },
    ue = {
      attribute: !0,
      type: String,
      converter: se,
      reflect: !1,
      hasChanged: de
    },
    le = Promise.resolve(!0),
    he = 1,
    be = 4,
    pe = 8,
    ye = 16,
    ge = 32;

  var ve =
    /*#__PURE__*/
    function (_HTMLElement) {
      _inherits(ve, _HTMLElement);

      function ve() {
        var _this5;

        _classCallCheck(this, ve);

        _this5 = _possibleConstructorReturn(this, _getPrototypeOf(ve).call(this)), _this5._updateState = 0, _this5._instanceProperties = void 0, _this5._updatePromise = le, _this5._hasConnectedResolver = void 0, _this5._changedProperties = new Map(), _this5._reflectingProperties = void 0, _this5.initialize();
        return _this5;
      }

      _createClass(ve, [{
        key: "initialize",
        value: function initialize() {
          this._saveInstanceProperties();
        }
      }, {
        key: "_saveInstanceProperties",
        value: function _saveInstanceProperties() {
          var _this6 = this;

          this.constructor._classProperties.forEach(function (e, t) {
            if (_this6.hasOwnProperty(t)) {
              var _e22 = _this6[t];
              delete _this6[t], _this6._instanceProperties || (_this6._instanceProperties = new Map()), _this6._instanceProperties.set(t, _e22);
            }
          });
        }
      }, {
        key: "_applyInstanceProperties",
        value: function _applyInstanceProperties() {
          var _this7 = this;

          this._instanceProperties.forEach(function (e, t) {
            return _this7[t] = e;
          }), this._instanceProperties = void 0;
        }
      }, {
        key: "connectedCallback",
        value: function connectedCallback() {
          this._updateState = this._updateState | ge, this._hasConnectedResolver ? (this._hasConnectedResolver(), this._hasConnectedResolver = void 0) : this.requestUpdate();
        }
      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {}
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(e, t, n) {
          t !== n && this._attributeToProperty(e, n);
        }
      }, {
        key: "_propertyToAttribute",
        value: function _propertyToAttribute(e, t) {
          var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ue;

          var r = this.constructor,
            a = r._attributeNameForProperty(e, n);

          if (void 0 !== a) {
            var _e23 = r._propertyValueToAttribute(t, n);

            if (void 0 === _e23) return;
            this._updateState = this._updateState | pe, null == _e23 ? this.removeAttribute(a) : this.setAttribute(a, _e23), this._updateState = this._updateState & ~pe;
          }
        }
      }, {
        key: "_attributeToProperty",
        value: function _attributeToProperty(e, t) {
          if (this._updateState & pe) return;

          var n = this.constructor,
            r = n._attributeToPropertyMap.get(e);

          if (void 0 !== r) {
            var _e24 = n._classProperties.get(r) || ue;

            this._updateState = this._updateState | ye, this[r] = n._propertyValueFromAttribute(t, _e24), this._updateState = this._updateState & ~ye;
          }
        }
      }, {
        key: "requestUpdate",
        value: function requestUpdate(e, t) {
          var n = !0;

          if (void 0 !== e && !this._changedProperties.has(e)) {
            var _r5 = this.constructor,
              _a4 = _r5._classProperties.get(e) || ue;

            _r5._valueHasChanged(this[e], t, _a4.hasChanged) ? (this._changedProperties.set(e, t), !0 !== _a4.reflect || this._updateState & ye || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()), this._reflectingProperties.set(e, _a4))) : n = !1;
          }

          return !this._hasRequestedUpdate && n && this._enqueueUpdate(), this.updateComplete;
        }
      }, {
        key: "_enqueueUpdate",
        value: function () {
          var _enqueueUpdate2 = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              var _this8 = this;

              var e, t, n;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      this._updateState = this._updateState | be;
                      t = this._updatePromise;
                      this._updatePromise = new Promise(function (t) {
                        return e = t;
                      });
                      _context.next = 5;
                      return t;

                    case 5:
                      _context.t0 = this._hasConnected;

                      if (_context.t0) {
                        _context.next = 9;
                        break;
                      }

                      _context.next = 9;
                      return new Promise(function (e) {
                        return _this8._hasConnectedResolver = e;
                      });

                    case 9:
                      n = this.performUpdate();
                      _context.t1 = null != n && "function" == typeof n.then;

                      if (!_context.t1) {
                        _context.next = 14;
                        break;
                      }

                      _context.next = 14;
                      return n;

                    case 14:
                      e(!this._hasRequestedUpdate);

                    case 15:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

          function _enqueueUpdate() {
            return _enqueueUpdate2.apply(this, arguments);
          }

          return _enqueueUpdate;
        }()
      }, {
        key: "performUpdate",
        value: function performUpdate() {
          if (this._instanceProperties && this._applyInstanceProperties(), this.shouldUpdate(this._changedProperties)) {
            var _e25 = this._changedProperties;
            this.update(_e25), this._markUpdated(), this._updateState & he || (this._updateState = this._updateState | he, this.firstUpdated(_e25)), this.updated(_e25);
          } else this._markUpdated();
        }
      }, {
        key: "_markUpdated",
        value: function _markUpdated() {
          this._changedProperties = new Map(), this._updateState = this._updateState & ~be;
        }
      }, {
        key: "shouldUpdate",
        value: function shouldUpdate(e) {
          return !0;
        }
      }, {
        key: "update",
        value: function update(e) {
          var _this9 = this;

          void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach(function (e, t) {
            return _this9._propertyToAttribute(t, _this9[t], e);
          }), this._reflectingProperties = void 0);
        }
      }, {
        key: "updated",
        value: function updated(e) {}
      }, {
        key: "firstUpdated",
        value: function firstUpdated(e) {}
      }, {
        key: "_hasConnected",
        get: function get() {
          return this._updateState & ge;
        }
      }, {
        key: "_hasRequestedUpdate",
        get: function get() {
          return this._updateState & be;
        }
      }, {
        key: "hasUpdated",
        get: function get() {
          return this._updateState & he;
        }
      }, {
        key: "updateComplete",
        get: function get() {
          return this._updatePromise;
        }
      }], [{
        key: "_ensureClassProperties",
        value: function _ensureClassProperties() {
          var _this10 = this;

          if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
            this._classProperties = new Map();

            var _e26 = Object.getPrototypeOf(this)._classProperties;

            void 0 !== _e26 && _e26.forEach(function (e, t) {
              return _this10._classProperties.set(t, e);
            });
          }
        }
      }, {
        key: "createProperty",
        value: function createProperty(e) {
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ue;
          if (this._ensureClassProperties(), this._classProperties.set(e, t), t.noAccessor || this.prototype.hasOwnProperty(e)) return;
          var n = "symbol" == _typeof(e) ? Symbol() : "__".concat(e);
          Object.defineProperty(this.prototype, e, {
            get: function get() {
              return this[n];
            },
            set: function set(t) {
              var r = this[e];
              this[n] = t, this.requestUpdate(e, r);
            },
            configurable: !0,
            enumerable: !0
          });
        }
      }, {
        key: "finalize",
        value: function finalize() {
          if (this.hasOwnProperty(JSCompiler_renameProperty("finalized", this)) && this.finalized) return;
          var e = Object.getPrototypeOf(this);

          if ("function" == typeof e.finalize && e.finalize(), this.finalized = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map(), this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
            var _e27 = this.properties,
              _t8 = [].concat(_toConsumableArray(Object.getOwnPropertyNames(_e27)), _toConsumableArray("function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(_e27) : []));

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = _t8[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var _n8 = _step5.value;
                this.createProperty(_n8, _e27[_n8]);
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
      }, {
        key: "_attributeNameForProperty",
        value: function _attributeNameForProperty(e, t) {
          var n = t.attribute;
          return !1 === n ? void 0 : "string" == typeof n ? n : "string" == typeof e ? e.toLowerCase() : void 0;
        }
      }, {
        key: "_valueHasChanged",
        value: function _valueHasChanged(e, t) {
          var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : de;
          return n(e, t);
        }
      }, {
        key: "_propertyValueFromAttribute",
        value: function _propertyValueFromAttribute(e, t) {
          var n = t.type,
            r = t.converter || se,
            a = "function" == typeof r ? r : r.fromAttribute;
          return a ? a(e, n) : e;
        }
      }, {
        key: "_propertyValueToAttribute",
        value: function _propertyValueToAttribute(e, t) {
          if (void 0 === t.reflect) return;
          var n = t.type,
            r = t.converter;
          return (r && r.toAttribute || se.toAttribute)(e, n);
        }
      }, {
        key: "observedAttributes",
        get: function get() {
          var _this11 = this;

          this.finalize();
          var e = [];
          return this._classProperties.forEach(function (t, n) {
            var r = _this11._attributeNameForProperty(n, t);

            void 0 !== r && (_this11._attributeToPropertyMap.set(r, n), e.push(r));
          }), e;
        }
      }]);

      return ve;
    }(_wrapNativeSuper(HTMLElement));

  ve.finalized = !0;
  _e(function (e, t) {
    return e.querySelector(t);
  }), _e(function (e, t) {
    return e.querySelectorAll(t);
  });

  var me = function me(e, t, n) {
      Object.defineProperty(t, n, e);
    },
    we = function we(e, t) {
      return {
        kind: "method",
        placement: "prototype",
        key: t.key,
        descriptor: e
      };
    };

  function _e(e) {
    return function (t) {
      return function (n, r) {
        var a = {
          get: function get() {
            return e(this.renderRoot, t);
          },
          enumerable: !0,
          configurable: !0
        };
        return void 0 !== r ? me(a, n, r) : we(a, n);
      };
    };
  }

  var xe = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  Symbol();
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

  (window.litElementVersions || (window.litElementVersions = [])).push("2.0.1");

  var Se = function Se(e) {
    return e.flat ? e.flat(1 / 0) : function e(t) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      for (var _r6 = 0, _a5 = t.length; _r6 < _a5; _r6++) {
        var _a6 = t[_r6];
        Array.isArray(_a6) ? e(_a6, n) : n.push(_a6);
      }

      return n;
    }(e);
  };

  var Ne =
    /*#__PURE__*/
    function (_ve) {
      _inherits(Ne, _ve);

      function Ne() {
        _classCallCheck(this, Ne);

        return _possibleConstructorReturn(this, _getPrototypeOf(Ne).apply(this, arguments));
      }

      _createClass(Ne, [{
        key: "initialize",
        value: function initialize() {
          _get(_getPrototypeOf(Ne.prototype), "initialize", this).call(this), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
        }
      }, {
        key: "createRenderRoot",
        value: function createRenderRoot() {
          return this.attachShadow({
            mode: "open"
          });
        }
      }, {
        key: "adoptStyles",
        value: function adoptStyles() {
          var e = this.constructor._styles;
          0 !== e.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? xe ? this.renderRoot.adoptedStyleSheets = e.map(function (e) {
            return e.styleSheet;
          }) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(function (e) {
            return e.cssText;
          }), this.localName));
        }
      }, {
        key: "connectedCallback",
        value: function connectedCallback() {
          _get(_getPrototypeOf(Ne.prototype), "connectedCallback", this).call(this), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
        }
      }, {
        key: "update",
        value: function update(e) {
          var _this12 = this;

          _get(_getPrototypeOf(Ne.prototype), "update", this).call(this, e);

          var t = this.render();
          t instanceof z && this.constructor.render(t, this.renderRoot, {
            scopeName: this.localName,
            eventContext: this
          }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(function (e) {
            var t = document.createElement("style");
            t.textContent = e.cssText, _this12.renderRoot.appendChild(t);
          }));
        }
      }, {
        key: "render",
        value: function render() {}
      }], [{
        key: "finalize",
        value: function finalize() {
          _get(_getPrototypeOf(Ne), "finalize", this).call(this), this._styles = this.hasOwnProperty(JSCompiler_renameProperty("styles", this)) ? this._getUniqueStyles() : this._styles || [];
        }
      }, {
        key: "_getUniqueStyles",
        value: function _getUniqueStyles() {
          var e = this.styles,
            t = [];

          if (Array.isArray(e)) {
            Se(e).reduceRight(function (e, t) {
              return e.add(t), e;
            }, new Set()).forEach(function (e) {
              return t.unshift(e);
            });
          } else e && t.push(e);

          return t;
        }
      }]);

      return Ne;
    }(ve);

  Ne.finalized = !0, Ne.render = function (e, t, n) {
    var r = n.scopeName,
      a = K.has(t),
      i = t instanceof ShadowRoot && ae && e instanceof z,
      f = i && !oe.has(r),
      o = f ? document.createDocumentFragment() : t;

    if (function (e, t, n) {
      var r = K.get(t);
      void 0 === r && (k(t, t.firstChild), K.set(t, r = new F(Object.assign({
        templateFactory: J
      }, n))), r.appendInto(t)), r.setValue(e), r.commit();
    }(e, o, Object.assign({
      templateFactory: ie(r)
    }, n)), f) {
      var _e28 = K.get(o);

      K.delete(o), _e28.value instanceof q && ce(o, _e28.value.template, r), k(t, t.firstChild), t.appendChild(o), K.set(t, _e28);
    }

    !a && i && window.ShadyCSS.styleElement(t.host);
  };

  var Ae = "http://www.w3.org/1999/xhtml",
    ke = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: Ae,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    },
    Pe = function Pe(e) {
      var t = e += "",
        n = t.indexOf(":");
      return n >= 0 && "xmlns" !== (t = e.slice(0, n)) && (e = e.slice(n + 1)), ke.hasOwnProperty(t) ? {
        space: ke[t],
        local: e
      } : e;
    };

  var Ee = function Ee(e) {
    var t = Pe(e);
    return (t.local ? function (e) {
      return function () {
        return this.ownerDocument.createElementNS(e.space, e.local);
      };
    } : function (e) {
      return function () {
        var t = this.ownerDocument,
          n = this.namespaceURI;
        return n === Ae && t.documentElement.namespaceURI === Ae ? t.createElement(e) : t.createElementNS(n, e);
      };
    })(t);
  };

  function Me() {}

  var Oe = function Oe(e) {
    return null == e ? Me : function () {
      return this.querySelector(e);
    };
  };

  function Ce() {
    return [];
  }

  var Te = function Te(e) {
    return new Array(e.length);
  };

  function je(e, t) {
    this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
  }

  je.prototype = {
    constructor: je,
    appendChild: function appendChild(e) {
      return this._parent.insertBefore(e, this._next);
    },
    insertBefore: function insertBefore(e, t) {
      return this._parent.insertBefore(e, t);
    },
    querySelector: function querySelector(e) {
      return this._parent.querySelector(e);
    },
    querySelectorAll: function querySelectorAll(e) {
      return this._parent.querySelectorAll(e);
    }
  };
  var Le = "$";

  function Ve(e, t, n, r, a, i) {
    for (var f, o = 0, c = t.length, s = i.length; o < s; ++o) {
      (f = t[o]) ? (f.__data__ = i[o], r[o] = f) : n[o] = new je(e, i[o]);
    }

    for (; o < c; ++o) {
      (f = t[o]) && (a[o] = f);
    }
  }

  function Re(e, t, n, r, a, i, f) {
    var o,
      c,
      s,
      d = {},
      u = t.length,
      l = i.length,
      h = new Array(u);

    for (o = 0; o < u; ++o) {
      (c = t[o]) && (h[o] = s = Le + f.call(c, c.__data__, o, t), s in d ? a[o] = c : d[s] = c);
    }

    for (o = 0; o < l; ++o) {
      (c = d[s = Le + f.call(e, i[o], o, i)]) ? (r[o] = c, c.__data__ = i[o], d[s] = null) : n[o] = new je(e, i[o]);
    }

    for (o = 0; o < u; ++o) {
      (c = t[o]) && d[h[o]] === c && (a[o] = c);
    }
  }

  function qe(e, t) {
    return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
  }

  var ze = function ze(e) {
    return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
  };

  function Ie(e) {
    return e.trim().split(/^|\s+/);
  }

  function $e(e) {
    return e.classList || new Ue(e);
  }

  function Ue(e) {
    this._node = e, this._names = Ie(e.getAttribute("class") || "");
  }

  function Fe(e, t) {
    for (var n = $e(e), r = -1, a = t.length; ++r < a;) {
      n.add(t[r]);
    }
  }

  function Be(e, t) {
    for (var n = $e(e), r = -1, a = t.length; ++r < a;) {
      n.remove(t[r]);
    }
  }

  Ue.prototype = {
    add: function add(e) {
      this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function remove(e) {
      var t = this._names.indexOf(e);

      t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function contains(e) {
      return this._names.indexOf(e) >= 0;
    }
  };

  function De() {
    this.textContent = "";
  }

  function Xe() {
    this.innerHTML = "";
  }

  function He() {
    this.nextSibling && this.parentNode.appendChild(this);
  }

  function Ge() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function Ye() {
    return null;
  }

  function We() {
    var e = this.parentNode;
    e && e.removeChild(this);
  }

  function Je() {
    return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling);
  }

  function Qe() {
    return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling);
  }

  var Ke = {},
    Ze = null;
  "undefined" != typeof document && ("onmouseenter" in document.documentElement || (Ke = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }));

  function et(e, t, n) {
    return e = tt(e, t, n), function (t) {
      var n = t.relatedTarget;
      n && (n === this || 8 & n.compareDocumentPosition(this)) || e.call(this, t);
    };
  }

  function tt(e, t, n) {
    return function (r) {
      var a = Ze;
      Ze = r;

      try {
        e.call(this, this.__data__, t, n);
      } finally {
        Ze = a;
      }
    };
  }

  function nt(e) {
    return function () {
      var t = this.__on;

      if (t) {
        for (var n, r = 0, a = -1, i = t.length; r < i; ++r) {
          n = t[r], e.type && n.type !== e.type || n.name !== e.name ? t[++a] = n : this.removeEventListener(n.type, n.listener, n.capture);
        }

        ++a ? t.length = a : delete this.__on;
      }
    };
  }

  function rt(e, t, n) {
    var r = Ke.hasOwnProperty(e.type) ? et : tt;
    return function (a, i, f) {
      var o,
        c = this.__on,
        s = r(t, i, f);
      if (c) for (var d = 0, u = c.length; d < u; ++d) {
        if ((o = c[d]).type === e.type && o.name === e.name) return this.removeEventListener(o.type, o.listener, o.capture), this.addEventListener(o.type, o.listener = s, o.capture = n), void (o.value = t);
      }
      this.addEventListener(e.type, s, n), o = {
        type: e.type,
        name: e.name,
        value: t,
        listener: s,
        capture: n
      }, c ? c.push(o) : this.__on = [o];
    };
  }

  function at(e, t, n) {
    var r = ze(e),
      a = r.CustomEvent;
    "function" == typeof a ? a = new a(t, n) : (a = r.document.createEvent("Event"), n ? (a.initEvent(t, n.bubbles, n.cancelable), a.detail = n.detail) : a.initEvent(t, !1, !1)), e.dispatchEvent(a);
  }

  var it = [null];

  function ft(e, t) {
    this._groups = e, this._parents = t;
  }

  function ot() {
    return new ft([[document.documentElement]], it);
  }

  ft.prototype = ot.prototype = {
    constructor: ft,
    select: function select(e) {
      "function" != typeof e && (e = Oe(e));

      for (var t = this._groups, n = t.length, r = new Array(n), a = 0; a < n; ++a) {
        for (var i, f, o = t[a], c = o.length, s = r[a] = new Array(c), d = 0; d < c; ++d) {
          (i = o[d]) && (f = e.call(i, i.__data__, d, o)) && ("__data__" in i && (f.__data__ = i.__data__), s[d] = f);
        }
      }

      return new ft(r, this._parents);
    },
    selectAll: function selectAll(e) {
      var t;
      "function" != typeof e && (e = null == (t = e) ? Ce : function () {
        return this.querySelectorAll(t);
      });

      for (var n = this._groups, r = n.length, a = [], i = [], f = 0; f < r; ++f) {
        for (var o, c = n[f], s = c.length, d = 0; d < s; ++d) {
          (o = c[d]) && (a.push(e.call(o, o.__data__, d, c)), i.push(o));
        }
      }

      return new ft(a, i);
    },
    filter: function filter(e) {
      var t;
      "function" != typeof e && (t = e, e = function e() {
        return this.matches(t);
      });

      for (var n = this._groups, r = n.length, a = new Array(r), i = 0; i < r; ++i) {
        for (var f, o = n[i], c = o.length, s = a[i] = [], d = 0; d < c; ++d) {
          (f = o[d]) && e.call(f, f.__data__, d, o) && s.push(f);
        }
      }

      return new ft(a, this._parents);
    },
    data: function data(e, t) {
      if (!e) return b = new Array(this.size()), d = -1, this.each(function (e) {
        b[++d] = e;
      }), b;
      var n,
        r = t ? Re : Ve,
        a = this._parents,
        i = this._groups;
      "function" != typeof e && (n = e, e = function e() {
        return n;
      });

      for (var f = i.length, o = new Array(f), c = new Array(f), s = new Array(f), d = 0; d < f; ++d) {
        var u = a[d],
          l = i[d],
          h = l.length,
          b = e.call(u, u && u.__data__, d, a),
          p = b.length,
          y = c[d] = new Array(p),
          g = o[d] = new Array(p);
        r(u, l, y, g, s[d] = new Array(h), b, t);

        for (var v, m, w = 0, _ = 0; w < p; ++w) {
          if (v = y[w]) {
            for (w >= _ && (_ = w + 1); !(m = g[_]) && ++_ < p;) {
              ;
            }

            v._next = m || null;
          }
        }
      }

      return (o = new ft(o, a))._enter = c, o._exit = s, o;
    },
    enter: function enter() {
      return new ft(this._enter || this._groups.map(Te), this._parents);
    },
    exit: function exit() {
      return new ft(this._exit || this._groups.map(Te), this._parents);
    },
    join: function join(e, t, n) {
      var r = this.enter(),
        a = this,
        i = this.exit();
      return r = "function" == typeof e ? e(r) : r.append(e + ""), null != t && (a = t(a)), null == n ? i.remove() : n(i), r && a ? r.merge(a).order() : a;
    },
    merge: function merge(e) {
      for (var t = this._groups, n = e._groups, r = t.length, a = n.length, i = Math.min(r, a), f = new Array(r), o = 0; o < i; ++o) {
        for (var c, s = t[o], d = n[o], u = s.length, l = f[o] = new Array(u), h = 0; h < u; ++h) {
          (c = s[h] || d[h]) && (l[h] = c);
        }
      }

      for (; o < r; ++o) {
        f[o] = t[o];
      }

      return new ft(f, this._parents);
    },
    order: function order() {
      for (var e = this._groups, t = -1, n = e.length; ++t < n;) {
        for (var r, a = e[t], i = a.length - 1, f = a[i]; --i >= 0;) {
          (r = a[i]) && (f && 4 ^ r.compareDocumentPosition(f) && f.parentNode.insertBefore(r, f), f = r);
        }
      }

      return this;
    },
    sort: function sort(e) {
      function t(t, n) {
        return t && n ? e(t.__data__, n.__data__) : !t - !n;
      }

      e || (e = qe);

      for (var n = this._groups, r = n.length, a = new Array(r), i = 0; i < r; ++i) {
        for (var f, o = n[i], c = o.length, s = a[i] = new Array(c), d = 0; d < c; ++d) {
          (f = o[d]) && (s[d] = f);
        }

        s.sort(t);
      }

      return new ft(a, this._parents).order();
    },
    call: function call() {
      var e = arguments[0];
      return arguments[0] = this, e.apply(null, arguments), this;
    },
    nodes: function nodes() {
      var e = new Array(this.size()),
        t = -1;
      return this.each(function () {
        e[++t] = this;
      }), e;
    },
    node: function node() {
      for (var e = this._groups, t = 0, n = e.length; t < n; ++t) {
        for (var r = e[t], a = 0, i = r.length; a < i; ++a) {
          var f = r[a];
          if (f) return f;
        }
      }

      return null;
    },
    size: function size() {
      var e = 0;
      return this.each(function () {
        ++e;
      }), e;
    },
    empty: function empty() {
      return !this.node();
    },
    each: function each(e) {
      for (var t = this._groups, n = 0, r = t.length; n < r; ++n) {
        for (var a, i = t[n], f = 0, o = i.length; f < o; ++f) {
          (a = i[f]) && e.call(a, a.__data__, f, i);
        }
      }

      return this;
    },
    attr: function attr(e, t) {
      var n = Pe(e);

      if (arguments.length < 2) {
        var r = this.node();
        return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
      }

      return this.each((null == t ? n.local ? function (e) {
        return function () {
          this.removeAttributeNS(e.space, e.local);
        };
      } : function (e) {
        return function () {
          this.removeAttribute(e);
        };
      } : "function" == typeof t ? n.local ? function (e, t) {
        return function () {
          var n = t.apply(this, arguments);
          null == n ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
        };
      } : function (e, t) {
        return function () {
          var n = t.apply(this, arguments);
          null == n ? this.removeAttribute(e) : this.setAttribute(e, n);
        };
      } : n.local ? function (e, t) {
        return function () {
          this.setAttributeNS(e.space, e.local, t);
        };
      } : function (e, t) {
        return function () {
          this.setAttribute(e, t);
        };
      })(n, t));
    },
    style: function style(e, t, n) {
      return arguments.length > 1 ? this.each((null == t ? function (e) {
        return function () {
          this.style.removeProperty(e);
        };
      } : "function" == typeof t ? function (e, t, n) {
        return function () {
          var r = t.apply(this, arguments);
          null == r ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
        };
      } : function (e, t, n) {
        return function () {
          this.style.setProperty(e, t, n);
        };
      })(e, t, null == n ? "" : n)) : function (e, t) {
        return e.style.getPropertyValue(t) || ze(e).getComputedStyle(e, null).getPropertyValue(t);
      }(this.node(), e);
    },
    property: function property(e, t) {
      return arguments.length > 1 ? this.each((null == t ? function (e) {
        return function () {
          delete this[e];
        };
      } : "function" == typeof t ? function (e, t) {
        return function () {
          var n = t.apply(this, arguments);
          null == n ? delete this[e] : this[e] = n;
        };
      } : function (e, t) {
        return function () {
          this[e] = t;
        };
      })(e, t)) : this.node()[e];
    },
    classed: function classed(e, t) {
      var n = Ie(e + "");

      if (arguments.length < 2) {
        for (var r = $e(this.node()), a = -1, i = n.length; ++a < i;) {
          if (!r.contains(n[a])) return !1;
        }

        return !0;
      }

      return this.each(("function" == typeof t ? function (e, t) {
        return function () {
          (t.apply(this, arguments) ? Fe : Be)(this, e);
        };
      } : t ? function (e) {
        return function () {
          Fe(this, e);
        };
      } : function (e) {
        return function () {
          Be(this, e);
        };
      })(n, t));
    },
    text: function text(e) {
      return arguments.length ? this.each(null == e ? De : ("function" == typeof e ? function (e) {
        return function () {
          var t = e.apply(this, arguments);
          this.textContent = null == t ? "" : t;
        };
      } : function (e) {
        return function () {
          this.textContent = e;
        };
      })(e)) : this.node().textContent;
    },
    html: function html(e) {
      return arguments.length ? this.each(null == e ? Xe : ("function" == typeof e ? function (e) {
        return function () {
          var t = e.apply(this, arguments);
          this.innerHTML = null == t ? "" : t;
        };
      } : function (e) {
        return function () {
          this.innerHTML = e;
        };
      })(e)) : this.node().innerHTML;
    },
    raise: function raise() {
      return this.each(He);
    },
    lower: function lower() {
      return this.each(Ge);
    },
    append: function append(e) {
      var t = "function" == typeof e ? e : Ee(e);
      return this.select(function () {
        return this.appendChild(t.apply(this, arguments));
      });
    },
    insert: function insert(e, t) {
      var n = "function" == typeof e ? e : Ee(e),
        r = null == t ? Ye : "function" == typeof t ? t : Oe(t);
      return this.select(function () {
        return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
      });
    },
    remove: function remove() {
      return this.each(We);
    },
    clone: function clone(e) {
      return this.select(e ? Qe : Je);
    },
    datum: function datum(e) {
      return arguments.length ? this.property("__data__", e) : this.node().__data__;
    },
    on: function on(e, t, n) {
      var r,
        a,
        i = function (e) {
          return e.trim().split(/^|\s+/).map(function (e) {
            var t = "",
              n = e.indexOf(".");
            return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
              type: e,
              name: t
            };
          });
        }(e + ""),
        f = i.length;

      if (!(arguments.length < 2)) {
        for (o = t ? rt : nt, null == n && (n = !1), r = 0; r < f; ++r) {
          this.each(o(i[r], t, n));
        }

        return this;
      }

      var o = this.node().__on;

      if (o) for (var c, s = 0, d = o.length; s < d; ++s) {
        for (r = 0, c = o[s]; r < f; ++r) {
          if ((a = i[r]).type === c.type && a.name === c.name) return c.value;
        }
      }
    },
    dispatch: function dispatch(e, t) {
      return this.each(("function" == typeof t ? function (e, t) {
        return function () {
          return at(this, e, t.apply(this, arguments));
        };
      } : function (e, t) {
        return function () {
          return at(this, e, t);
        };
      })(e, t));
    }
  };

  var ct = function ct(e) {
      return "string" == typeof e ? new ft([[document.querySelector(e)]], [document.documentElement]) : new ft([[e]], it);
    },
    st = 0;

  function dt() {
    this._ = "@" + (++st).toString(36);
  }

  dt.prototype = function () {
    return new dt();
  }.prototype = {
    constructor: dt,
    get: function get(e) {
      for (var t = this._; !(t in e);) {
        if (!(e = e.parentNode)) return;
      }

      return e[t];
    },
    set: function set(e, t) {
      return e[this._] = t;
    },
    remove: function remove(e) {
      return this._ in e && delete e[this._];
    },
    toString: function toString() {
      return this._;
    }
  };

  var ut = function ut(e, t) {
      var n;

      function r() {
        var r,
          a,
          i = n.length,
          f = 0,
          o = 0;

        for (r = 0; r < i; ++r) {
          f += (a = n[r]).x, o += a.y;
        }

        for (f = f / i - e, o = o / i - t, r = 0; r < i; ++r) {
          (a = n[r]).x -= f, a.y -= o;
        }
      }

      return null == e && (e = 0), null == t && (t = 0), r.initialize = function (e) {
        n = e;
      }, r.x = function (t) {
        return arguments.length ? (e = +t, r) : e;
      }, r.y = function (e) {
        return arguments.length ? (t = +e, r) : t;
      }, r;
    },
    lt = function lt(e) {
      return function () {
        return e;
      };
    },
    ht = function ht() {
      return 1e-6 * (Math.random() - .5);
    };

  function bt(e, t, n, r) {
    if (isNaN(t) || isNaN(n)) return e;
    var a,
      i,
      f,
      o,
      c,
      s,
      d,
      u,
      l,
      h = e._root,
      b = {
        data: r
      },
      p = e._x0,
      y = e._y0,
      g = e._x1,
      v = e._y1;
    if (!h) return e._root = b, e;

    for (; h.length;) {
      if ((s = t >= (i = (p + g) / 2)) ? p = i : g = i, (d = n >= (f = (y + v) / 2)) ? y = f : v = f, a = h, !(h = h[u = d << 1 | s])) return a[u] = b, e;
    }

    if (o = +e._x.call(null, h.data), c = +e._y.call(null, h.data), t === o && n === c) return b.next = h, a ? a[u] = b : e._root = b, e;

    do {
      a = a ? a[u] = new Array(4) : e._root = new Array(4), (s = t >= (i = (p + g) / 2)) ? p = i : g = i, (d = n >= (f = (y + v) / 2)) ? y = f : v = f;
    } while ((u = d << 1 | s) == (l = (c >= f) << 1 | o >= i));

    return a[l] = h, a[u] = b, e;
  }

  var pt = function pt(e, t, n, r, a) {
    this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = a;
  };

  function yt(e) {
    return e[0];
  }

  function gt(e) {
    return e[1];
  }

  function vt(e, t, n) {
    var r = new mt(null == t ? yt : t, null == n ? gt : n, NaN, NaN, NaN, NaN);
    return null == e ? r : r.addAll(e);
  }

  function mt(e, t, n, r, a, i) {
    this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = a, this._y1 = i, this._root = void 0;
  }

  function wt(e) {
    for (var t = {
      data: e.data
    }, n = t; e = e.next;) {
      n = n.next = {
        data: e.data
      };
    }

    return t;
  }

  var _t = vt.prototype = mt.prototype;

  _t.copy = function () {
    var e,
      t,
      n = new mt(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      r = this._root;
    if (!r) return n;
    if (!r.length) return n._root = wt(r), n;

    for (e = [{
      source: r,
      target: n._root = new Array(4)
    }]; r = e.pop();) {
      for (var a = 0; a < 4; ++a) {
        (t = r.source[a]) && (t.length ? e.push({
          source: t,
          target: r.target[a] = new Array(4)
        }) : r.target[a] = wt(t));
      }
    }

    return n;
  }, _t.add = function (e) {
    var t = +this._x.call(null, e),
      n = +this._y.call(null, e);
    return bt(this.cover(t, n), t, n, e);
  }, _t.addAll = function (e) {
    var t,
      n,
      r,
      a,
      i = e.length,
      f = new Array(i),
      o = new Array(i),
      c = 1 / 0,
      s = 1 / 0,
      d = -1 / 0,
      u = -1 / 0;

    for (n = 0; n < i; ++n) {
      isNaN(r = +this._x.call(null, t = e[n])) || isNaN(a = +this._y.call(null, t)) || (f[n] = r, o[n] = a, r < c && (c = r), r > d && (d = r), a < s && (s = a), a > u && (u = a));
    }

    if (c > d || s > u) return this;

    for (this.cover(c, s).cover(d, u), n = 0; n < i; ++n) {
      bt(this, f[n], o[n], e[n]);
    }

    return this;
  }, _t.cover = function (e, t) {
    if (isNaN(e = +e) || isNaN(t = +t)) return this;
    var n = this._x0,
      r = this._y0,
      a = this._x1,
      i = this._y1;
    if (isNaN(n)) a = (n = Math.floor(e)) + 1, i = (r = Math.floor(t)) + 1;else {
      for (var f, o, c = a - n, s = this._root; n > e || e >= a || r > t || t >= i;) {
        switch (o = (t < r) << 1 | e < n, (f = new Array(4))[o] = s, s = f, c *= 2, o) {
          case 0:
            a = n + c, i = r + c;
            break;

          case 1:
            n = a - c, i = r + c;
            break;

          case 2:
            a = n + c, r = i - c;
            break;

          case 3:
            n = a - c, r = i - c;
        }
      }

      this._root && this._root.length && (this._root = s);
    }
    return this._x0 = n, this._y0 = r, this._x1 = a, this._y1 = i, this;
  }, _t.data = function () {
    var e = [];
    return this.visit(function (t) {
      if (!t.length) do {
        e.push(t.data);
      } while (t = t.next);
    }), e;
  }, _t.extent = function (e) {
    return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
  }, _t.find = function (e, t, n) {
    var r,
      a,
      i,
      f,
      o,
      c,
      s,
      d = this._x0,
      u = this._y0,
      l = this._x1,
      h = this._y1,
      b = [],
      p = this._root;

    for (p && b.push(new pt(p, d, u, l, h)), null == n ? n = 1 / 0 : (d = e - n, u = t - n, l = e + n, h = t + n, n *= n); c = b.pop();) {
      if (!(!(p = c.node) || (a = c.x0) > l || (i = c.y0) > h || (f = c.x1) < d || (o = c.y1) < u)) if (p.length) {
        var y = (a + f) / 2,
          g = (i + o) / 2;
        b.push(new pt(p[3], y, g, f, o), new pt(p[2], a, g, y, o), new pt(p[1], y, i, f, g), new pt(p[0], a, i, y, g)), (s = (t >= g) << 1 | e >= y) && (c = b[b.length - 1], b[b.length - 1] = b[b.length - 1 - s], b[b.length - 1 - s] = c);
      } else {
        var v = e - +this._x.call(null, p.data),
          m = t - +this._y.call(null, p.data),
          w = v * v + m * m;

        if (w < n) {
          var _ = Math.sqrt(n = w);

          d = e - _, u = t - _, l = e + _, h = t + _, r = p.data;
        }
      }
    }

    return r;
  }, _t.remove = function (e) {
    if (isNaN(i = +this._x.call(null, e)) || isNaN(f = +this._y.call(null, e))) return this;
    var t,
      n,
      r,
      a,
      i,
      f,
      o,
      c,
      s,
      d,
      u,
      l,
      h = this._root,
      b = this._x0,
      p = this._y0,
      y = this._x1,
      g = this._y1;
    if (!h) return this;
    if (h.length) for (;;) {
      if ((s = i >= (o = (b + y) / 2)) ? b = o : y = o, (d = f >= (c = (p + g) / 2)) ? p = c : g = c, t = h, !(h = h[u = d << 1 | s])) return this;
      if (!h.length) break;
      (t[u + 1 & 3] || t[u + 2 & 3] || t[u + 3 & 3]) && (n = t, l = u);
    }

    for (; h.data !== e;) {
      if (r = h, !(h = h.next)) return this;
    }

    return (a = h.next) && delete h.next, r ? (a ? r.next = a : delete r.next, this) : t ? (a ? t[u] = a : delete t[u], (h = t[0] || t[1] || t[2] || t[3]) && h === (t[3] || t[2] || t[1] || t[0]) && !h.length && (n ? n[l] = h : this._root = h), this) : (this._root = a, this);
  }, _t.removeAll = function (e) {
    for (var t = 0, n = e.length; t < n; ++t) {
      this.remove(e[t]);
    }

    return this;
  }, _t.root = function () {
    return this._root;
  }, _t.size = function () {
    var e = 0;
    return this.visit(function (t) {
      if (!t.length) do {
        ++e;
      } while (t = t.next);
    }), e;
  }, _t.visit = function (e) {
    var t,
      n,
      r,
      a,
      i,
      f,
      o = [],
      c = this._root;

    for (c && o.push(new pt(c, this._x0, this._y0, this._x1, this._y1)); t = o.pop();) {
      if (!e(c = t.node, r = t.x0, a = t.y0, i = t.x1, f = t.y1) && c.length) {
        var s = (r + i) / 2,
          d = (a + f) / 2;
        (n = c[3]) && o.push(new pt(n, s, d, i, f)), (n = c[2]) && o.push(new pt(n, r, d, s, f)), (n = c[1]) && o.push(new pt(n, s, a, i, d)), (n = c[0]) && o.push(new pt(n, r, a, s, d));
      }
    }

    return this;
  }, _t.visitAfter = function (e) {
    var t,
      n = [],
      r = [];

    for (this._root && n.push(new pt(this._root, this._x0, this._y0, this._x1, this._y1)); t = n.pop();) {
      var a = t.node;

      if (a.length) {
        var i,
          f = t.x0,
          o = t.y0,
          c = t.x1,
          s = t.y1,
          d = (f + c) / 2,
          u = (o + s) / 2;
        (i = a[0]) && n.push(new pt(i, f, o, d, u)), (i = a[1]) && n.push(new pt(i, d, o, c, u)), (i = a[2]) && n.push(new pt(i, f, u, d, s)), (i = a[3]) && n.push(new pt(i, d, u, c, s));
      }

      r.push(t);
    }

    for (; t = r.pop();) {
      e(t.node, t.x0, t.y0, t.x1, t.y1);
    }

    return this;
  }, _t.x = function (e) {
    return arguments.length ? (this._x = e, this) : this._x;
  }, _t.y = function (e) {
    return arguments.length ? (this._y = e, this) : this._y;
  };

  function xt() {}

  function St(e, t) {
    var n = new xt();
    if (e instanceof xt) e.each(function (e, t) {
      n.set(t, e);
    });else if (Array.isArray(e)) {
      var r,
        a = -1,
        i = e.length;
      if (null == t) for (; ++a < i;) {
        n.set(a, e[a]);
      } else for (; ++a < i;) {
        n.set(t(r = e[a], a, e), r);
      }
    } else if (e) for (var f in e) {
      n.set(f, e[f]);
    }
    return n;
  }

  xt.prototype = St.prototype = {
    constructor: xt,
    has: function has(e) {
      return "$" + e in this;
    },
    get: function get(e) {
      return this["$" + e];
    },
    set: function set(e, t) {
      return this["$" + e] = t, this;
    },
    remove: function remove(e) {
      var t = "$" + e;
      return t in this && delete this[t];
    },
    clear: function clear() {
      for (var e in this) {
        "$" === e[0] && delete this[e];
      }
    },
    keys: function keys() {
      var e = [];

      for (var t in this) {
        "$" === t[0] && e.push(t.slice(1));
      }

      return e;
    },
    values: function values() {
      var e = [];

      for (var t in this) {
        "$" === t[0] && e.push(this[t]);
      }

      return e;
    },
    entries: function entries() {
      var e = [];

      for (var t in this) {
        "$" === t[0] && e.push({
          key: t.slice(1),
          value: this[t]
        });
      }

      return e;
    },
    size: function size() {
      var e = 0;

      for (var t in this) {
        "$" === t[0] && ++e;
      }

      return e;
    },
    empty: function empty() {
      for (var e in this) {
        if ("$" === e[0]) return !1;
      }

      return !0;
    },
    each: function each(e) {
      for (var t in this) {
        "$" === t[0] && e(this[t], t.slice(1), this);
      }
    }
  };
  var Nt = St;

  function At() {}

  var kt = Nt.prototype;

  function Pt(e, t) {
    var n = new At();
    if (e instanceof At) e.each(function (e) {
      n.add(e);
    });else if (e) {
      var r = -1,
        a = e.length;
      if (null == t) for (; ++r < a;) {
        n.add(e[r]);
      } else for (; ++r < a;) {
        n.add(t(e[r], r, e));
      }
    }
    return n;
  }

  At.prototype = Pt.prototype = {
    constructor: At,
    has: kt.has,
    add: function add(e) {
      return this["$" + (e += "")] = e, this;
    },
    remove: kt.remove,
    clear: kt.clear,
    values: kt.keys,
    size: kt.size,
    empty: kt.empty,
    each: kt.each
  };

  function Et(e) {
    return e.index;
  }

  function Mt(e, t) {
    var n = e.get(t);
    if (!n) throw new Error("missing: " + t);
    return n;
  }

  var Ot = function Ot(e) {
      var t,
        n,
        r,
        a,
        i,
        f = Et,
        o = function o(e) {
          return 1 / Math.min(a[e.source.index], a[e.target.index]);
        },
        c = lt(30),
        s = 1;

      function d(r) {
        for (var a = 0, f = e.length; a < s; ++a) {
          for (var o, c, d, u, l, h, b, p = 0; p < f; ++p) {
            c = (o = e[p]).source, u = (d = o.target).x + d.vx - c.x - c.vx || ht(), l = d.y + d.vy - c.y - c.vy || ht(), u *= h = ((h = Math.sqrt(u * u + l * l)) - n[p]) / h * r * t[p], l *= h, d.vx -= u * (b = i[p]), d.vy -= l * b, c.vx += u * (b = 1 - b), c.vy += l * b;
          }
        }
      }

      function u() {
        if (r) {
          var o,
            c,
            s = r.length,
            d = e.length,
            u = Nt(r, f);

          for (o = 0, a = new Array(s); o < d; ++o) {
            (c = e[o]).index = o, "object" != _typeof(c.source) && (c.source = Mt(u, c.source)), "object" != _typeof(c.target) && (c.target = Mt(u, c.target)), a[c.source.index] = (a[c.source.index] || 0) + 1, a[c.target.index] = (a[c.target.index] || 0) + 1;
          }

          for (o = 0, i = new Array(d); o < d; ++o) {
            c = e[o], i[o] = a[c.source.index] / (a[c.source.index] + a[c.target.index]);
          }

          t = new Array(d), l(), n = new Array(d), h();
        }
      }

      function l() {
        if (r) for (var n = 0, a = e.length; n < a; ++n) {
          t[n] = +o(e[n], n, e);
        }
      }

      function h() {
        if (r) for (var t = 0, a = e.length; t < a; ++t) {
          n[t] = +c(e[t], t, e);
        }
      }

      return null == e && (e = []), d.initialize = function (e) {
        r = e, u();
      }, d.links = function (t) {
        return arguments.length ? (e = t, u(), d) : e;
      }, d.id = function (e) {
        return arguments.length ? (f = e, d) : f;
      }, d.iterations = function (e) {
        return arguments.length ? (s = +e, d) : s;
      }, d.strength = function (e) {
        return arguments.length ? (o = "function" == typeof e ? e : lt(+e), l(), d) : o;
      }, d.distance = function (e) {
        return arguments.length ? (c = "function" == typeof e ? e : lt(+e), h(), d) : c;
      }, d;
    },
    Ct = {
      value: function value() {}
    };

  function Tt() {
    for (var e, t = 0, n = arguments.length, r = {}; t < n; ++t) {
      if (!(e = arguments[t] + "") || e in r) throw new Error("illegal type: " + e);
      r[e] = [];
    }

    return new jt(r);
  }

  function jt(e) {
    this._ = e;
  }

  function Lt(e, t) {
    for (var n, r = 0, a = e.length; r < a; ++r) {
      if ((n = e[r]).name === t) return n.value;
    }
  }

  function Vt(e, t, n) {
    for (var r = 0, a = e.length; r < a; ++r) {
      if (e[r].name === t) {
        e[r] = Ct, e = e.slice(0, r).concat(e.slice(r + 1));
        break;
      }
    }

    return null != n && e.push({
      name: t,
      value: n
    }), e;
  }

  jt.prototype = Tt.prototype = {
    constructor: jt,
    on: function on(e, t) {
      var n,
        r,
        a = this._,
        i = (r = a, (e + "").trim().split(/^|\s+/).map(function (e) {
          var t = "",
            n = e.indexOf(".");
          if (n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), e && !r.hasOwnProperty(e)) throw new Error("unknown type: " + e);
          return {
            type: e,
            name: t
          };
        })),
        f = -1,
        o = i.length;

      if (!(arguments.length < 2)) {
        if (null != t && "function" != typeof t) throw new Error("invalid callback: " + t);

        for (; ++f < o;) {
          if (n = (e = i[f]).type) a[n] = Vt(a[n], e.name, t);else if (null == t) for (n in a) {
            a[n] = Vt(a[n], e.name, null);
          }
        }

        return this;
      }

      for (; ++f < o;) {
        if ((n = (e = i[f]).type) && (n = Lt(a[n], e.name))) return n;
      }
    },
    copy: function copy() {
      var e = {},
        t = this._;

      for (var n in t) {
        e[n] = t[n].slice();
      }

      return new jt(e);
    },
    call: function call(e, t) {
      if ((n = arguments.length - 2) > 0) for (var n, r, a = new Array(n), i = 0; i < n; ++i) {
        a[i] = arguments[i + 2];
      }
      if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);

      for (i = 0, n = (r = this._[e]).length; i < n; ++i) {
        r[i].value.apply(t, a);
      }
    },
    apply: function apply(e, t, n) {
      if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);

      for (var r = this._[e], a = 0, i = r.length; a < i; ++a) {
        r[a].value.apply(t, n);
      }
    }
  };
  var Rt,
    qt,
    zt = Tt,
    It = 0,
    $t = 0,
    Ut = 0,
    Ft = 1e3,
    Bt = 0,
    Dt = 0,
    Xt = 0,
    Ht = "object" == (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && performance.now ? performance : Date,
    Gt = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (e) {
      setTimeout(e, 17);
    };

  function Yt() {
    return Dt || (Gt(Wt), Dt = Ht.now() + Xt);
  }

  function Wt() {
    Dt = 0;
  }

  function Jt() {
    this._call = this._time = this._next = null;
  }

  function Qt(e, t, n) {
    var r = new Jt();
    return r.restart(e, t, n), r;
  }

  function Kt() {
    Dt = (Bt = Ht.now()) + Xt, It = $t = 0;

    try {
      !function () {
        Yt(), ++It;

        for (var e, t = Rt; t;) {
          (e = Dt - t._time) >= 0 && t._call.call(null, e), t = t._next;
        }

        --It;
      }();
    } finally {
      It = 0, function () {
        var e,
          t,
          n = Rt,
          r = 1 / 0;

        for (; n;) {
          n._call ? (r > n._time && (r = n._time), e = n, n = n._next) : (t = n._next, n._next = null, n = e ? e._next = t : Rt = t);
        }

        qt = e, en(r);
      }(), Dt = 0;
    }
  }

  function Zt() {
    var e = Ht.now(),
      t = e - Bt;
    t > Ft && (Xt -= t, Bt = e);
  }

  function en(e) {
    It || ($t && ($t = clearTimeout($t)), e - Dt > 24 ? (e < 1 / 0 && ($t = setTimeout(Kt, e - Ht.now() - Xt)), Ut && (Ut = clearInterval(Ut))) : (Ut || (Bt = Ht.now(), Ut = setInterval(Zt, Ft)), It = 1, Gt(Kt)));
  }

  Jt.prototype = Qt.prototype = {
    constructor: Jt,
    restart: function restart(e, t, n) {
      if ("function" != typeof e) throw new TypeError("callback is not a function");
      n = (null == n ? Yt() : +n) + (null == t ? 0 : +t), this._next || qt === this || (qt ? qt._next = this : Rt = this, qt = this), this._call = e, this._time = n, en();
    },
    stop: function stop() {
      this._call && (this._call = null, this._time = 1 / 0, en());
    }
  };

  var tn = 10,
    nn = Math.PI * (3 - Math.sqrt(5)),
    rn = function rn(e) {
      var t,
        n = 1,
        r = .001,
        a = 1 - Math.pow(r, 1 / 300),
        i = 0,
        f = .6,
        o = Nt(),
        c = Qt(d),
        s = zt("tick", "end");

      function d() {
        u(), s.call("tick", t), n < r && (c.stop(), s.call("end", t));
      }

      function u(r) {
        var c,
          s,
          d = e.length;
        void 0 === r && (r = 1);

        for (var u = 0; u < r; ++u) {
          for (n += (i - n) * a, o.each(function (e) {
            e(n);
          }), c = 0; c < d; ++c) {
            null == (s = e[c]).fx ? s.x += s.vx *= f : (s.x = s.fx, s.vx = 0), null == s.fy ? s.y += s.vy *= f : (s.y = s.fy, s.vy = 0);
          }
        }

        return t;
      }

      function l() {
        for (var t, n = 0, r = e.length; n < r; ++n) {
          if ((t = e[n]).index = n, isNaN(t.fx) || (t.x = t.fx), isNaN(t.fy) || (t.y = t.fy), isNaN(t.x) || isNaN(t.y)) {
            var a = tn * Math.sqrt(n),
              i = n * nn;
            t.x = a * Math.cos(i), t.y = a * Math.sin(i);
          }

          (isNaN(t.vx) || isNaN(t.vy)) && (t.vx = t.vy = 0);
        }
      }

      function h(t) {
        return t.initialize && t.initialize(e), t;
      }

      return null == e && (e = []), l(), t = {
        tick: u,
        restart: function restart() {
          return c.restart(d), t;
        },
        stop: function stop() {
          return c.stop(), t;
        },
        nodes: function nodes(n) {
          return arguments.length ? (e = n, l(), o.each(h), t) : e;
        },
        alpha: function alpha(e) {
          return arguments.length ? (n = +e, t) : n;
        },
        alphaMin: function alphaMin(e) {
          return arguments.length ? (r = +e, t) : r;
        },
        alphaDecay: function alphaDecay(e) {
          return arguments.length ? (a = +e, t) : +a;
        },
        alphaTarget: function alphaTarget(e) {
          return arguments.length ? (i = +e, t) : i;
        },
        velocityDecay: function velocityDecay(e) {
          return arguments.length ? (f = 1 - e, t) : 1 - f;
        },
        force: function force(e, n) {
          return arguments.length > 1 ? (null == n ? o.remove(e) : o.set(e, h(n)), t) : o.get(e);
        },
        find: function find(t, n, r) {
          var a,
            i,
            f,
            o,
            c,
            s = 0,
            d = e.length;

          for (null == r ? r = 1 / 0 : r *= r, s = 0; s < d; ++s) {
            (f = (a = t - (o = e[s]).x) * a + (i = n - o.y) * i) < r && (c = o, r = f);
          }

          return c;
        },
        on: function on(e, n) {
          return arguments.length > 1 ? (s.on(e, n), t) : s.on(e);
        }
      };
    },
    an = n(10),
    fn = function fn(e) {
      for (var t = e.length / 6 | 0, n = new Array(t), r = 0; r < t;) {
        n[r] = "#" + e.slice(6 * r, 6 * ++r);
      }

      return n;
    },
    on = (fn("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), fn("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666")),
    cn = (fn("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"), fn("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"), fn("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"), fn("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"), fn("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"), fn("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"), fn("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"), function (e, t, n) {
      e.prototype = t.prototype = n, n.constructor = e;
    });

  function sn(e, t) {
    var n = Object.create(e.prototype);

    for (var r in t) {
      n[r] = t[r];
    }

    return n;
  }

  function dn() {}

  var un = "\\s*([+-]?\\d+)\\s*",
    ln = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    hn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    bn = /^#([0-9a-f]{3})$/,
    pn = /^#([0-9a-f]{6})$/,
    yn = new RegExp("^rgb\\(" + [un, un, un] + "\\)$"),
    gn = new RegExp("^rgb\\(" + [hn, hn, hn] + "\\)$"),
    vn = new RegExp("^rgba\\(" + [un, un, un, ln] + "\\)$"),
    mn = new RegExp("^rgba\\(" + [hn, hn, hn, ln] + "\\)$"),
    wn = new RegExp("^hsl\\(" + [ln, hn, hn] + "\\)$"),
    _n = new RegExp("^hsla\\(" + [ln, hn, hn, ln] + "\\)$"),
    xn = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    };

  function Sn(e) {
    var t;
    return e = (e + "").trim().toLowerCase(), (t = bn.exec(e)) ? new En((t = parseInt(t[1], 16)) >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, (15 & t) << 4 | 15 & t, 1) : (t = pn.exec(e)) ? Nn(parseInt(t[1], 16)) : (t = yn.exec(e)) ? new En(t[1], t[2], t[3], 1) : (t = gn.exec(e)) ? new En(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, 1) : (t = vn.exec(e)) ? An(t[1], t[2], t[3], t[4]) : (t = mn.exec(e)) ? An(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, t[4]) : (t = wn.exec(e)) ? On(t[1], t[2] / 100, t[3] / 100, 1) : (t = _n.exec(e)) ? On(t[1], t[2] / 100, t[3] / 100, t[4]) : xn.hasOwnProperty(e) ? Nn(xn[e]) : "transparent" === e ? new En(NaN, NaN, NaN, 0) : null;
  }

  function Nn(e) {
    return new En(e >> 16 & 255, e >> 8 & 255, 255 & e, 1);
  }

  function An(e, t, n, r) {
    return r <= 0 && (e = t = n = NaN), new En(e, t, n, r);
  }

  function kn(e) {
    return e instanceof dn || (e = Sn(e)), e ? new En((e = e.rgb()).r, e.g, e.b, e.opacity) : new En();
  }

  function Pn(e, t, n, r) {
    return 1 === arguments.length ? kn(e) : new En(e, t, n, null == r ? 1 : r);
  }

  function En(e, t, n, r) {
    this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
  }

  function Mn(e) {
    return ((e = Math.max(0, Math.min(255, Math.round(e) || 0))) < 16 ? "0" : "") + e.toString(16);
  }

  function On(e, t, n, r) {
    return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Tn(e, t, n, r);
  }

  function Cn(e, t, n, r) {
    return 1 === arguments.length ? function (e) {
      if (e instanceof Tn) return new Tn(e.h, e.s, e.l, e.opacity);
      if (e instanceof dn || (e = Sn(e)), !e) return new Tn();
      if (e instanceof Tn) return e;
      var t = (e = e.rgb()).r / 255,
        n = e.g / 255,
        r = e.b / 255,
        a = Math.min(t, n, r),
        i = Math.max(t, n, r),
        f = NaN,
        o = i - a,
        c = (i + a) / 2;
      return o ? (f = t === i ? (n - r) / o + 6 * (n < r) : n === i ? (r - t) / o + 2 : (t - n) / o + 4, o /= c < .5 ? i + a : 2 - i - a, f *= 60) : o = c > 0 && c < 1 ? 0 : f, new Tn(f, o, c, e.opacity);
    }(e) : new Tn(e, t, n, null == r ? 1 : r);
  }

  function Tn(e, t, n, r) {
    this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
  }

  function jn(e, t, n) {
    return 255 * (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t);
  }

  cn(dn, Sn, {
    displayable: function displayable() {
      return this.rgb().displayable();
    },
    hex: function hex() {
      return this.rgb().hex();
    },
    toString: function toString() {
      return this.rgb() + "";
    }
  }), cn(En, Pn, sn(dn, {
    brighter: function brighter(e) {
      return e = null == e ? 1 / .7 : Math.pow(1 / .7, e), new En(this.r * e, this.g * e, this.b * e, this.opacity);
    },
    darker: function darker(e) {
      return e = null == e ? .7 : Math.pow(.7, e), new En(this.r * e, this.g * e, this.b * e, this.opacity);
    },
    rgb: function rgb() {
      return this;
    },
    displayable: function displayable() {
      return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: function hex() {
      return "#" + Mn(this.r) + Mn(this.g) + Mn(this.b);
    },
    toString: function toString() {
      var e = this.opacity;
      return (1 === (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === e ? ")" : ", " + e + ")");
    }
  })), cn(Tn, Cn, sn(dn, {
    brighter: function brighter(e) {
      return e = null == e ? 1 / .7 : Math.pow(1 / .7, e), new Tn(this.h, this.s, this.l * e, this.opacity);
    },
    darker: function darker(e) {
      return e = null == e ? .7 : Math.pow(.7, e), new Tn(this.h, this.s, this.l * e, this.opacity);
    },
    rgb: function rgb() {
      var e = this.h % 360 + 360 * (this.h < 0),
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < .5 ? n : 1 - n) * t,
        a = 2 * n - r;
      return new En(jn(e >= 240 ? e - 240 : e + 120, a, r), jn(e, a, r), jn(e < 120 ? e + 240 : e - 120, a, r), this.opacity);
    },
    displayable: function displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    }
  }));
  var Ln = Math.PI / 180,
    Vn = 180 / Math.PI,
    Rn = .96422,
    qn = 1,
    zn = .82521,
    In = 4 / 29,
    $n = 6 / 29,
    Un = 3 * $n * $n,
    Fn = $n * $n * $n;

  function Bn(e) {
    if (e instanceof Xn) return new Xn(e.l, e.a, e.b, e.opacity);

    if (e instanceof Kn) {
      if (isNaN(e.h)) return new Xn(e.l, 0, 0, e.opacity);
      var t = e.h * Ln;
      return new Xn(e.l, Math.cos(t) * e.c, Math.sin(t) * e.c, e.opacity);
    }

    e instanceof En || (e = kn(e));
    var n,
      r,
      a = Wn(e.r),
      i = Wn(e.g),
      f = Wn(e.b),
      o = Hn((.2225045 * a + .7168786 * i + .0606169 * f) / qn);
    return a === i && i === f ? n = r = o : (n = Hn((.4360747 * a + .3850649 * i + .1430804 * f) / Rn), r = Hn((.0139322 * a + .0971045 * i + .7141733 * f) / zn)), new Xn(116 * o - 16, 500 * (n - o), 200 * (o - r), e.opacity);
  }

  function Dn(e, t, n, r) {
    return 1 === arguments.length ? Bn(e) : new Xn(e, t, n, null == r ? 1 : r);
  }

  function Xn(e, t, n, r) {
    this.l = +e, this.a = +t, this.b = +n, this.opacity = +r;
  }

  function Hn(e) {
    return e > Fn ? Math.pow(e, 1 / 3) : e / Un + In;
  }

  function Gn(e) {
    return e > $n ? e * e * e : Un * (e - In);
  }

  function Yn(e) {
    return 255 * (e <= .0031308 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - .055);
  }

  function Wn(e) {
    return (e /= 255) <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4);
  }

  function Jn(e) {
    if (e instanceof Kn) return new Kn(e.h, e.c, e.l, e.opacity);
    if (e instanceof Xn || (e = Bn(e)), 0 === e.a && 0 === e.b) return new Kn(NaN, 0, e.l, e.opacity);
    var t = Math.atan2(e.b, e.a) * Vn;
    return new Kn(t < 0 ? t + 360 : t, Math.sqrt(e.a * e.a + e.b * e.b), e.l, e.opacity);
  }

  function Qn(e, t, n, r) {
    return 1 === arguments.length ? Jn(e) : new Kn(e, t, n, null == r ? 1 : r);
  }

  function Kn(e, t, n, r) {
    this.h = +e, this.c = +t, this.l = +n, this.opacity = +r;
  }

  cn(Xn, Dn, sn(dn, {
    brighter: function brighter(e) {
      return new Xn(this.l + 18 * (null == e ? 1 : e), this.a, this.b, this.opacity);
    },
    darker: function darker(e) {
      return new Xn(this.l - 18 * (null == e ? 1 : e), this.a, this.b, this.opacity);
    },
    rgb: function rgb() {
      var e = (this.l + 16) / 116,
        t = isNaN(this.a) ? e : e + this.a / 500,
        n = isNaN(this.b) ? e : e - this.b / 200;
      return new En(Yn(3.1338561 * (t = Rn * Gn(t)) - 1.6168667 * (e = qn * Gn(e)) - .4906146 * (n = zn * Gn(n))), Yn(-.9787684 * t + 1.9161415 * e + .033454 * n), Yn(.0719453 * t - .2289914 * e + 1.4052427 * n), this.opacity);
    }
  })), cn(Kn, Qn, sn(dn, {
    brighter: function brighter(e) {
      return new Kn(this.h, this.c, this.l + 18 * (null == e ? 1 : e), this.opacity);
    },
    darker: function darker(e) {
      return new Kn(this.h, this.c, this.l - 18 * (null == e ? 1 : e), this.opacity);
    },
    rgb: function rgb() {
      return Bn(this).rgb();
    }
  }));
  var Zn = -.14861,
    er = 1.78277,
    tr = -.29227,
    nr = -.90649,
    rr = 1.97294,
    ar = rr * nr,
    ir = rr * er,
    fr = er * tr - nr * Zn;

  function or(e, t, n, r) {
    return 1 === arguments.length ? function (e) {
      if (e instanceof cr) return new cr(e.h, e.s, e.l, e.opacity);
      e instanceof En || (e = kn(e));
      var t = e.r / 255,
        n = e.g / 255,
        r = e.b / 255,
        a = (fr * r + ar * t - ir * n) / (fr + ar - ir),
        i = r - a,
        f = (rr * (n - a) - tr * i) / nr,
        o = Math.sqrt(f * f + i * i) / (rr * a * (1 - a)),
        c = o ? Math.atan2(f, i) * Vn - 120 : NaN;
      return new cr(c < 0 ? c + 360 : c, o, a, e.opacity);
    }(e) : new cr(e, t, n, null == r ? 1 : r);
  }

  function cr(e, t, n, r) {
    this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
  }

  function sr(e, t, n, r, a) {
    var i = e * e,
      f = i * e;
    return ((1 - 3 * e + 3 * i - f) * t + (4 - 6 * i + 3 * f) * n + (1 + 3 * e + 3 * i - 3 * f) * r + f * a) / 6;
  }

  cn(cr, or, sn(dn, {
    brighter: function brighter(e) {
      return e = null == e ? 1 / .7 : Math.pow(1 / .7, e), new cr(this.h, this.s, this.l * e, this.opacity);
    },
    darker: function darker(e) {
      return e = null == e ? .7 : Math.pow(.7, e), new cr(this.h, this.s, this.l * e, this.opacity);
    },
    rgb: function rgb() {
      var e = isNaN(this.h) ? 0 : (this.h + 120) * Ln,
        t = +this.l,
        n = isNaN(this.s) ? 0 : this.s * t * (1 - t),
        r = Math.cos(e),
        a = Math.sin(e);
      return new En(255 * (t + n * (Zn * r + er * a)), 255 * (t + n * (tr * r + nr * a)), 255 * (t + n * (rr * r)), this.opacity);
    }
  }));

  var dr = function dr(e) {
    return function () {
      return e;
    };
  };

  function ur(e, t) {
    return function (n) {
      return e + n * t;
    };
  }

  function lr(e, t) {
    var n = t - e;
    return n ? ur(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : dr(isNaN(e) ? t : e);
  }

  function hr(e) {
    return 1 == (e = +e) ? br : function (t, n) {
      return n - t ? function (e, t, n) {
        return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function (r) {
          return Math.pow(e + r * t, n);
        };
      }(t, n, e) : dr(isNaN(t) ? n : t);
    };
  }

  function br(e, t) {
    var n = t - e;
    return n ? ur(e, n) : dr(isNaN(e) ? t : e);
  }

  (function e(t) {
    var n = hr(t);

    function r(e, t) {
      var r = n((e = Pn(e)).r, (t = Pn(t)).r),
        a = n(e.g, t.g),
        i = n(e.b, t.b),
        f = br(e.opacity, t.opacity);
      return function (t) {
        return e.r = r(t), e.g = a(t), e.b = i(t), e.opacity = f(t), e + "";
      };
    }

    return r.gamma = e, r;
  })(1);

  function pr(e) {
    return function (t) {
      var n,
        r,
        a = t.length,
        i = new Array(a),
        f = new Array(a),
        o = new Array(a);

      for (n = 0; n < a; ++n) {
        r = Pn(t[n]), i[n] = r.r || 0, f[n] = r.g || 0, o[n] = r.b || 0;
      }

      return i = e(i), f = e(f), o = e(o), r.opacity = 1, function (e) {
        return r.r = i(e), r.g = f(e), r.b = o(e), r + "";
      };
    };
  }

  var yr = pr(function (e) {
      var t = e.length - 1;
      return function (n) {
        var r = n <= 0 ? n = 0 : n >= 1 ? (n = 1, t - 1) : Math.floor(n * t),
          a = e[r],
          i = e[r + 1],
          f = r > 0 ? e[r - 1] : 2 * a - i,
          o = r < t - 1 ? e[r + 2] : 2 * i - a;
        return sr((n - r / t) * t, f, a, i, o);
      };
    }),
    gr = (pr(function (e) {
      var t = e.length;
      return function (n) {
        var r = Math.floor(((n %= 1) < 0 ? ++n : n) * t),
          a = e[(r + t - 1) % t],
          i = e[r % t],
          f = e[(r + 1) % t],
          o = e[(r + 2) % t];
        return sr((n - r / t) * t, a, i, f, o);
      };
    }), function (e, t) {
      return t -= e = +e, function (n) {
        return e + t * n;
      };
    }),
    vr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  new RegExp(vr.source, "g");

  var mr,
    wr,
    _r,
    xr,
    Sr = 180 / Math.PI,
    Nr = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    },
    Ar = function Ar(e, t, n, r, a, i) {
      var f, o, c;
      return (f = Math.sqrt(e * e + t * t)) && (e /= f, t /= f), (c = e * n + t * r) && (n -= e * c, r -= t * c), (o = Math.sqrt(n * n + r * r)) && (n /= o, r /= o, c /= o), e * r < t * n && (e = -e, t = -t, c = -c, f = -f), {
        translateX: a,
        translateY: i,
        rotate: Math.atan2(t, e) * Sr,
        skewX: Math.atan(c) * Sr,
        scaleX: f,
        scaleY: o
      };
    };

  function kr(e, t, n, r) {
    function a(e) {
      return e.length ? e.pop() + " " : "";
    }

    return function (i, f) {
      var o = [],
        c = [];
      return i = e(i), f = e(f), function (e, r, a, i, f, o) {
        if (e !== a || r !== i) {
          var c = f.push("translate(", null, t, null, n);
          o.push({
            i: c - 4,
            x: gr(e, a)
          }, {
            i: c - 2,
            x: gr(r, i)
          });
        } else (a || i) && f.push("translate(" + a + t + i + n);
      }(i.translateX, i.translateY, f.translateX, f.translateY, o, c), function (e, t, n, i) {
        e !== t ? (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), i.push({
          i: n.push(a(n) + "rotate(", null, r) - 2,
          x: gr(e, t)
        })) : t && n.push(a(n) + "rotate(" + t + r);
      }(i.rotate, f.rotate, o, c), function (e, t, n, i) {
        e !== t ? i.push({
          i: n.push(a(n) + "skewX(", null, r) - 2,
          x: gr(e, t)
        }) : t && n.push(a(n) + "skewX(" + t + r);
      }(i.skewX, f.skewX, o, c), function (e, t, n, r, i, f) {
        if (e !== n || t !== r) {
          var o = i.push(a(i) + "scale(", null, ",", null, ")");
          f.push({
            i: o - 4,
            x: gr(e, n)
          }, {
            i: o - 2,
            x: gr(t, r)
          });
        } else 1 === n && 1 === r || i.push(a(i) + "scale(" + n + "," + r + ")");
      }(i.scaleX, i.scaleY, f.scaleX, f.scaleY, o, c), i = f = null, function (e) {
        for (var t, n = -1, r = c.length; ++n < r;) {
          o[(t = c[n]).i] = t.x(e);
        }

        return o.join("");
      };
    };
  }

  kr(function (e) {
    return "none" === e ? Nr : (mr || (mr = document.createElement("DIV"), wr = document.documentElement, _r = document.defaultView), mr.style.transform = e, e = _r.getComputedStyle(wr.appendChild(mr), null).getPropertyValue("transform"), wr.removeChild(mr), e = e.slice(7, -1).split(","), Ar(+e[0], +e[1], +e[2], +e[3], +e[4], +e[5]));
  }, "px, ", "px)", "deg)"), kr(function (e) {
    return null == e ? Nr : (xr || (xr = document.createElementNS("http://www.w3.org/2000/svg", "g")), xr.setAttribute("transform", e), (e = xr.transform.baseVal.consolidate()) ? (e = e.matrix, Ar(e.a, e.b, e.c, e.d, e.e, e.f)) : Nr);
  }, ", ", ")", ")"), Math.SQRT2;

  function Pr(e) {
    return function (t, n) {
      var r = e((t = Cn(t)).h, (n = Cn(n)).h),
        a = br(t.s, n.s),
        i = br(t.l, n.l),
        f = br(t.opacity, n.opacity);
      return function (e) {
        return t.h = r(e), t.s = a(e), t.l = i(e), t.opacity = f(e), t + "";
      };
    };
  }

  Pr(lr), Pr(br);

  function Er(e) {
    return function (t, n) {
      var r = e((t = Qn(t)).h, (n = Qn(n)).h),
        a = br(t.c, n.c),
        i = br(t.l, n.l),
        f = br(t.opacity, n.opacity);
      return function (e) {
        return t.h = r(e), t.c = a(e), t.l = i(e), t.opacity = f(e), t + "";
      };
    };
  }

  Er(lr), Er(br);

  function Mr(e) {
    return function t(n) {
      function r(t, r) {
        var a = e((t = or(t)).h, (r = or(r)).h),
          i = br(t.s, r.s),
          f = br(t.l, r.l),
          o = br(t.opacity, r.opacity);
        return function (e) {
          return t.h = a(e), t.s = i(e), t.l = f(Math.pow(e, n)), t.opacity = o(e), t + "";
        };
      }

      return n = +n, r.gamma = t, r;
    }(1);
  }

  Mr(lr);
  var Or = Mr(br);

  var Cr = function Cr(e) {
    return yr(e[e.length - 1]);
  };

  Cr(new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(fn)), Cr(new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(fn)), Cr(new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(fn)), Cr(new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(fn)), Cr(new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(fn)), Cr(new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(fn)), Cr(new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(fn)), Cr(new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(fn)), Cr(new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(fn)), Cr(new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(fn)), Cr(new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(fn)), Cr(new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(fn)), Cr(new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(fn)), Cr(new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(fn)), Cr(new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(fn)), Cr(new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(fn)), Cr(new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(fn)), Cr(new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(fn)), Cr(new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(fn)), Cr(new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(fn)), Cr(new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(fn)), Cr(new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(fn)), Cr(new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(fn)), Cr(new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(fn)), Cr(new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(fn)), Cr(new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(fn)), Cr(new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(fn)), Or(or(300, .5, 0), or(-240, .5, 1)), Or(or(-100, .75, .35), or(80, 1.5, .8)), Or(or(260, .75, .35), or(80, 1.5, .8)), or(), Pn(), Math.PI, Math.PI;

  function Tr(e) {
    var t = e.length;
    return function (n) {
      return e[Math.max(0, Math.min(t - 1, Math.floor(n * t)))];
    };
  }

  Tr(fn("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")), Tr(fn("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")), Tr(fn("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")), Tr(fn("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

  function jr() {
    var e = a()(['\n      <style>\n        :host {\n          font-family: Helvetica, Arial, sans-serif;\n          font-size: 10px;\n        }\n        .gag-opened-tooltip {\n          visibility: visible;\n          float: left;\n          padding: 4px 10px 4px 4px;\n          margin: 2px;\n          width: 300px;\n          border: 1px solid black;\n          position: absolute;\n          background-color: whitesmoke;\n        }\n        .gag-closed-tooltip {\n          visibility: hidden;\n          position: absolute;\n        }\n        .gag-tooltip-close {\n          color: #fff;\n          background-color: #333333;\n          position: absolute;\n          top: -10px;\n          right: -10px;\n          cursor: pointer;\n          border-radius: 20px;\n          width: 20px;\n          height: 20px;\n          font-size: 14px !important;\n          text-align: center;\n          border: 1px solid #fff;\n        }\n      </style>\n      <div id="gag-tooltip" class="gag-closed-tooltip"></div>\n      <svg\n        id="annotext-graph"\n        width="', '"\n        height="', '"\n      ></svg>\n    ']);
    return jr = function jr() {
      return e;
    }, e;
  }

  var Lr = function (e) {
    function t() {
      var e, n;
      l()(this, t);

      for (var r = arguments.length, a = new Array(r), i = 0; i < r; i++) {
        a[i] = arguments[i];
      }

      return (n = y()(this, (e = v()(t)).call.apply(e, [this].concat(a)))).width = 1500, n.height = 900, n.rx = 38, n.ry = 38, n.data = void 0, n.colorScale = on, n.simulation = void 0, n.link = void 0, n.node = void 0, n.text = void 0, n.svg = void 0, n.tooltip = void 0, n.ticked = function () {
        n.link.attr("x1", function (e) {
          return e.source.x;
        }).attr("y1", function (e) {
          return e.source.y;
        }).attr("x2", function (e) {
          return e.target.x;
        }).attr("y2", function (e) {
          return e.target.y;
        }).attr("stroke", n.colorScale[0]).attr("stroke-width", 1), n.node.selectAll("ellipse").attr("cx", function (e) {
          return e.x;
        }).attr("cy", function (e) {
          return e.y;
        }), n.text.attr("x", function (e) {
          return e.x;
        }).attr("y", function (e) {
          return e.y;
        }), n.wrap();
      }, n.initForceDisplay = function () {
        if (null !== n.shadowRoot && void 0 !== n.data) {
          var e = n.data.nodes.map(function (e) {
            return d()({}, e, {
              rx: n.rx,
              ry: n.ry
            });
          });
          n.simulation = rn().force("link", Ot().id(function (e) {
            return e.id;
          })).force("charge", an.ellipseForce(6, .5, 5.8)).force("center", ut(n.width / 2, n.height / 2)), n.svg = ct(n.shadowRoot.getElementById("annotext-graph")), n.tooltip = ct(n.shadowRoot.getElementById("gag-tooltip")), n.svg.append("svg:defs").selectAll("marker").data(["end"]).enter().append("svg:marker").attr("id", String).attr("viewBox", "0 -10 15 15").attr("refX", 70).attr("refY", -1.5).attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto").append("svg:path").attr("d", "M0,-6L11,0L0,6"), n.link = n.svg.append("g").selectAll("line").data(n.data.edges).enter().append("line").attr("marker-end", "url(#end)"), n.node = n.svg.append("g").selectAll(".nodeGroup").data(e).enter().append("g").attr("class", "nodeGroup").on("click", function (e) {
            n.showTooltip(e, Ze.pageX, Ze.pageY);
          }), n.node.append("ellipse").attr("rx", function (e) {
            return e.rx;
          }).attr("ry", function (e) {
            return e.ry;
          }).attr("stroke", n.colorScale[4]).attr("fill", n.colorScale[1]).attr("id", function (e) {
            return "node_" + e.id;
          }), n.text = n.node.append("text").attr("dy", 2).attr("text-anchor", "middle").text(function (e) {
            return e.id.replace(/_/gi, " ").trim();
          }).attr("id", function (e) {
            return e.id;
          }).attr("fill", "black").style("pointer-events", "none"), n.simulation.nodes(e).on("tick", n.ticked), n.simulation.force("link").links(n.data.edges);
        }
      }, n;
    }

    return x()(t, e), b()(t, [{
      key: "connectedCallback",
      value: function () {
        var e = c()(f.a.mark(function e() {
          var n;
          return f.a.wrap(function (e) {
            for (;;) {
              switch (e.prev = e.next) {
                case 0:
                  return w()(v()(t.prototype), "connectedCallback", this).call(this), e.next = 3, fetch("https://www.ebi.ac.uk/QuickGO/services/ontology/ae/relations");

                case 3:
                  return n = e.sent, e.next = 6, n.json();

                case 6:
                  this.data = e.sent;

                case 7:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "updated",
      value: function value() {
        void 0 !== this.data && this.initForceDisplay();
      }
    }, {
      key: "wrap",
      value: function value() {
        var e = this;
        this.svg.selectAll("tspan").remove(), this.svg.selectAll("text")._groups[0].forEach(function (t) {
          for (var n, r = e.svg.select("#" + t.id), a = t.id.replace(/_/gi, " ").trim().split(/\s+/).reverse(), i = [], f = r.datum().x, o = 1, c = r.text(null).append("tspan"), s = r.select("tspan"); n = a.pop();) {
            i.push(n), c.text(i.join(" ")), c.node().getComputedTextLength() > 80 && (i.pop(), c.text(i.join(" ")), i = [n], c = r.append("tspan").attr("x", f).attr("dx", "0em").attr("dy", "1.1em").text(n), o++);
          }

          s.attr("dy", -.3 * o + "em");
        });
      }
    }, {
      key: "showTooltip",
      value: function value(e, t, n) {
        var r = this;
        this.tooltip.attr("class", "gag-closed-tooltip").html(""), this.svg.selectAll("ellipse").attr("stroke-width", 1);
        var a = this.svg.select("#node_" + e.id);
        a.attr("stroke-width", 5), this.tooltip.attr("class", "gag-opened-tooltip").style("left", t + "px").style("top", n - 28 + "px"), this.tooltip.append("span").attr("class", "gag-tooltip-close").text("X").on("click", function () {
          a.attr("stroke-width", 1), r.tooltip.attr("class", "gag-closed-tooltip").html("");
        });
        var i = "";
        e.subsets.forEach(function (e) {
          i += "<br>" + e;
        }), this.tooltip.append("span").html(function () {
          return e.id + "<hr><bold>GOC documentation:</bold> <a href='https://github.com/geneontology/annotation_extensions/blob/master/doc/" + e.id + ".md' target='_blank'>" + e.id + "</a> <br><bold>GO Annotation Domain: </bold>" + e.domain + "<br><bold>GO Annotation Range: </bold>" + e.range + "<br><bold>Usage: </bold>" + e.usage + "<br><bold>Subsets: </bold>" + i;
        });
      }
    }, {
      key: "render",
      value: function value() {
        return function (e) {
          for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            t[_key - 1] = arguments[_key];
          }

          return new z(e, t, "html", W);
        }(jr(), this.width, this.height);
      }
    }], [{
      key: "properties",
      get: function get() {
        return {
          data: {}
        };
      }
    }]), t;
  }(Ne);

  customElements.define("go-annotext-graph", Lr);
}]);
