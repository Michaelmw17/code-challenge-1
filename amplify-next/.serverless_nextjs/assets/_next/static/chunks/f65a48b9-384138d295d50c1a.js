(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [126],
  {
    4631: function (e) {
      e.exports = (function () {
        "use strict";
        var e = navigator.userAgent,
          t = navigator.platform,
          r = /gecko\/\d/i.test(e),
          n = /MSIE \d/.test(e),
          i = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
          o = /Edge\/(\d+)/.exec(e),
          l = n || i || o,
          s = l && (n ? document.documentMode || 6 : +(o || i)[1]),
          a = !o && /WebKit\//.test(e),
          u = a && /Qt\/\d+\.\d+/.test(e),
          c = !o && /Chrome\//.test(e),
          h = /Opera\//.test(e),
          f = /Apple Computer/.test(navigator.vendor),
          d = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
          p = /PhantomJS/.test(e),
          g = f && (/Mobile\/\w+/.test(e) || navigator.maxTouchPoints > 2),
          v = /Android/.test(e),
          m =
            g ||
            v ||
            /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
          y = g || /Mac/.test(t),
          b = /\bCrOS\b/.test(e),
          w = /win/i.test(t),
          x = h && e.match(/Version\/(\d*\.\d*)/);
        x && (x = Number(x[1])), x && x >= 15 && ((h = !1), (a = !0));
        var C = y && (u || (h && (null == x || x < 12.11))),
          S = r || (l && s >= 9);
        function L(e) {
          return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
        }
        var k,
          T = function (e, t) {
            var r = e.className,
              n = L(t).exec(r);
            if (n) {
              var i = r.slice(n.index + n[0].length);
              e.className = r.slice(0, n.index) + (i ? n[1] + i : "");
            }
          };
        function M(e) {
          for (var t = e.childNodes.length; t > 0; --t)
            e.removeChild(e.firstChild);
          return e;
        }
        function N(e, t) {
          return M(e).appendChild(t);
        }
        function O(e, t, r, n) {
          var i = document.createElement(e);
          if (
            (r && (i.className = r),
            n && (i.style.cssText = n),
            "string" == typeof t)
          )
            i.appendChild(document.createTextNode(t));
          else if (t) for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
          return i;
        }
        function A(e, t, r, n) {
          var i = O(e, t, r, n);
          return i.setAttribute("role", "presentation"), i;
        }
        function D(e, t) {
          if ((3 == t.nodeType && (t = t.parentNode), e.contains))
            return e.contains(t);
          do {
            if ((11 == t.nodeType && (t = t.host), t == e)) return !0;
          } while ((t = t.parentNode));
        }
        function W() {
          var e;
          try {
            e = document.activeElement;
          } catch (t) {
            e = document.body || null;
          }
          for (; e && e.shadowRoot && e.shadowRoot.activeElement; )
            e = e.shadowRoot.activeElement;
          return e;
        }
        function H(e, t) {
          var r = e.className;
          L(t).test(r) || (e.className += (r ? " " : "") + t);
        }
        function F(e, t) {
          for (var r = e.split(" "), n = 0; n < r.length; n++)
            r[n] && !L(r[n]).test(t) && (t += " " + r[n]);
          return t;
        }
        k = document.createRange
          ? function (e, t, r, n) {
              var i = document.createRange();
              return i.setEnd(n || e, r), i.setStart(e, t), i;
            }
          : function (e, t, r) {
              var n = document.body.createTextRange();
              try {
                n.moveToElementText(e.parentNode);
              } catch (i) {
                return n;
              }
              return (
                n.collapse(!0),
                n.moveEnd("character", r),
                n.moveStart("character", t),
                n
              );
            };
        var E = function (e) {
          e.select();
        };
        function P(e) {
          var t = Array.prototype.slice.call(arguments, 1);
          return function () {
            return e.apply(null, t);
          };
        }
        function I(e, t, r) {
          for (var n in (t || (t = {}), e))
            !e.hasOwnProperty(n) ||
              (!1 === r && t.hasOwnProperty(n)) ||
              (t[n] = e[n]);
          return t;
        }
        function R(e, t, r, n, i) {
          null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
          for (var o = n || 0, l = i || 0; ; ) {
            var s = e.indexOf("\t", o);
            if (s < 0 || s >= t) return l + (t - o);
            (l += s - o), (l += r - (l % r)), (o = s + 1);
          }
        }
        g
          ? (E = function (e) {
              (e.selectionStart = 0), (e.selectionEnd = e.value.length);
            })
          : l &&
            (E = function (e) {
              try {
                e.select();
              } catch (t) {}
            });
        var z = function () {
          (this.id = null),
            (this.f = null),
            (this.time = 0),
            (this.handler = P(this.onTimeout, this));
        };
        function B(e, t) {
          for (var r = 0; r < e.length; ++r) if (e[r] == t) return r;
          return -1;
        }
        (z.prototype.onTimeout = function (e) {
          (e.id = 0),
            e.time <= +new Date()
              ? e.f()
              : setTimeout(e.handler, e.time - +new Date());
        }),
          (z.prototype.set = function (e, t) {
            this.f = t;
            var r = +new Date() + e;
            (!this.id || r < this.time) &&
              (clearTimeout(this.id),
              (this.id = setTimeout(this.handler, e)),
              (this.time = r));
          });
        var G = 50,
          U = {
            toString: function () {
              return "CodeMirror.Pass";
            },
          },
          V = { scroll: !1 },
          K = { origin: "*mouse" },
          j = { origin: "+move" };
        function X(e, t, r) {
          for (var n = 0, i = 0; ; ) {
            var o = e.indexOf("\t", n);
            -1 == o && (o = e.length);
            var l = o - n;
            if (o == e.length || i + l >= t) return n + Math.min(l, t - i);
            if (((i += o - n), (n = o + 1), (i += r - (i % r)) >= t)) return n;
          }
        }
        var Y = [""];
        function _(e) {
          for (; Y.length <= e; ) Y.push($(Y) + " ");
          return Y[e];
        }
        function $(e) {
          return e[e.length - 1];
        }
        function q(e, t) {
          for (var r = [], n = 0; n < e.length; n++) r[n] = t(e[n], n);
          return r;
        }
        function Z(e, t, r) {
          for (var n = 0, i = r(t); n < e.length && r(e[n]) <= i; ) n++;
          e.splice(n, 0, t);
        }
        function Q() {}
        function J(e, t) {
          var r;
          return (
            Object.create
              ? (r = Object.create(e))
              : ((Q.prototype = e), (r = new Q())),
            t && I(t, r),
            r
          );
        }
        var ee =
          /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
        function te(e) {
          return (
            /\w/.test(e) ||
            (e > "\x80" && (e.toUpperCase() != e.toLowerCase() || ee.test(e)))
          );
        }
        function re(e, t) {
          return t
            ? !!(t.source.indexOf("\\w") > -1 && te(e)) || t.test(e)
            : te(e);
        }
        function ne(e) {
          for (var t in e) if (e.hasOwnProperty(t) && e[t]) return !1;
          return !0;
        }
        var ie =
          /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
        function oe(e) {
          return e.charCodeAt(0) >= 768 && ie.test(e);
        }
        function le(e, t, r) {
          for (; (r < 0 ? t > 0 : t < e.length) && oe(e.charAt(t)); ) t += r;
          return t;
        }
        function se(e, t, r) {
          for (var n = t > r ? -1 : 1; ; ) {
            if (t == r) return t;
            var i = (t + r) / 2,
              o = n < 0 ? Math.ceil(i) : Math.floor(i);
            if (o == t) return e(o) ? t : r;
            e(o) ? (r = o) : (t = o + n);
          }
        }
        function ae(e, t, r, n) {
          if (!e) return n(t, r, "ltr", 0);
          for (var i = !1, o = 0; o < e.length; ++o) {
            var l = e[o];
            ((l.from < r && l.to > t) || (t == r && l.to == t)) &&
              (n(
                Math.max(l.from, t),
                Math.min(l.to, r),
                1 == l.level ? "rtl" : "ltr",
                o
              ),
              (i = !0));
          }
          i || n(t, r, "ltr");
        }
        var ue = null;
        function ce(e, t, r) {
          var n;
          ue = null;
          for (var i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.from < t && o.to > t) return i;
            o.to == t && (o.from != o.to && "before" == r ? (n = i) : (ue = i)),
              o.from == t &&
                (o.from != o.to && "before" != r ? (n = i) : (ue = i));
          }
          return null != n ? n : ue;
        }
        var he = (function () {
          var e =
              "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
            t =
              "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
          function r(r) {
            return r <= 247
              ? e.charAt(r)
              : 1424 <= r && r <= 1524
              ? "R"
              : 1536 <= r && r <= 1785
              ? t.charAt(r - 1536)
              : 1774 <= r && r <= 2220
              ? "r"
              : 8192 <= r && r <= 8203
              ? "w"
              : 8204 == r
              ? "b"
              : "L";
          }
          var n = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
            i = /[stwN]/,
            o = /[LRr]/,
            l = /[Lb1n]/,
            s = /[1n]/;
          function a(e, t, r) {
            (this.level = e), (this.from = t), (this.to = r);
          }
          return function (e, t) {
            var u = "ltr" == t ? "L" : "R";
            if (0 == e.length || ("ltr" == t && !n.test(e))) return !1;
            for (var c = e.length, h = [], f = 0; f < c; ++f)
              h.push(r(e.charCodeAt(f)));
            for (var d = 0, p = u; d < c; ++d) {
              var g = h[d];
              "m" == g ? (h[d] = p) : (p = g);
            }
            for (var v = 0, m = u; v < c; ++v) {
              var y = h[v];
              "1" == y && "r" == m
                ? (h[v] = "n")
                : o.test(y) && ((m = y), "r" == y && (h[v] = "R"));
            }
            for (var b = 1, w = h[0]; b < c - 1; ++b) {
              var x = h[b];
              "+" == x && "1" == w && "1" == h[b + 1]
                ? (h[b] = "1")
                : "," != x ||
                  w != h[b + 1] ||
                  ("1" != w && "n" != w) ||
                  (h[b] = w),
                (w = x);
            }
            for (var C = 0; C < c; ++C) {
              var S = h[C];
              if ("," == S) h[C] = "N";
              else if ("%" == S) {
                var L = void 0;
                for (L = C + 1; L < c && "%" == h[L]; ++L);
                for (
                  var k =
                      (C && "!" == h[C - 1]) || (L < c && "1" == h[L])
                        ? "1"
                        : "N",
                    T = C;
                  T < L;
                  ++T
                )
                  h[T] = k;
                C = L - 1;
              }
            }
            for (var M = 0, N = u; M < c; ++M) {
              var O = h[M];
              "L" == N && "1" == O ? (h[M] = "L") : o.test(O) && (N = O);
            }
            for (var A = 0; A < c; ++A)
              if (i.test(h[A])) {
                var D = void 0;
                for (D = A + 1; D < c && i.test(h[D]); ++D);
                for (
                  var W = "L" == (A ? h[A - 1] : u),
                    H = W == ("L" == (D < c ? h[D] : u)) ? (W ? "L" : "R") : u,
                    F = A;
                  F < D;
                  ++F
                )
                  h[F] = H;
                A = D - 1;
              }
            for (var E, P = [], I = 0; I < c; )
              if (l.test(h[I])) {
                var R = I;
                for (++I; I < c && l.test(h[I]); ++I);
                P.push(new a(0, R, I));
              } else {
                var z = I,
                  B = P.length,
                  G = "rtl" == t ? 1 : 0;
                for (++I; I < c && "L" != h[I]; ++I);
                for (var U = z; U < I; )
                  if (s.test(h[U])) {
                    z < U && (P.splice(B, 0, new a(1, z, U)), (B += G));
                    var V = U;
                    for (++U; U < I && s.test(h[U]); ++U);
                    P.splice(B, 0, new a(2, V, U)), (B += G), (z = U);
                  } else ++U;
                z < I && P.splice(B, 0, new a(1, z, I));
              }
            return (
              "ltr" == t &&
                (1 == P[0].level &&
                  (E = e.match(/^\s+/)) &&
                  ((P[0].from = E[0].length),
                  P.unshift(new a(0, 0, E[0].length))),
                1 == $(P).level &&
                  (E = e.match(/\s+$/)) &&
                  (($(P).to -= E[0].length),
                  P.push(new a(0, c - E[0].length, c)))),
              "rtl" == t ? P.reverse() : P
            );
          };
        })();
        function fe(e, t) {
          var r = e.order;
          return null == r && (r = e.order = he(e.text, t)), r;
        }
        var de = [],
          pe = function (e, t, r) {
            if (e.addEventListener) e.addEventListener(t, r, !1);
            else if (e.attachEvent) e.attachEvent("on" + t, r);
            else {
              var n = e._handlers || (e._handlers = {});
              n[t] = (n[t] || de).concat(r);
            }
          };
        function ge(e, t) {
          return (e._handlers && e._handlers[t]) || de;
        }
        function ve(e, t, r) {
          if (e.removeEventListener) e.removeEventListener(t, r, !1);
          else if (e.detachEvent) e.detachEvent("on" + t, r);
          else {
            var n = e._handlers,
              i = n && n[t];
            if (i) {
              var o = B(i, r);
              o > -1 && (n[t] = i.slice(0, o).concat(i.slice(o + 1)));
            }
          }
        }
        function me(e, t) {
          var r = ge(e, t);
          if (r.length)
            for (
              var n = Array.prototype.slice.call(arguments, 2), i = 0;
              i < r.length;
              ++i
            )
              r[i].apply(null, n);
        }
        function ye(e, t, r) {
          return (
            "string" == typeof t &&
              (t = {
                type: t,
                preventDefault: function () {
                  this.defaultPrevented = !0;
                },
              }),
            me(e, r || t.type, e, t),
            Le(t) || t.codemirrorIgnore
          );
        }
        function be(e) {
          var t = e._handlers && e._handlers.cursorActivity;
          if (t)
            for (
              var r =
                  e.curOp.cursorActivityHandlers ||
                  (e.curOp.cursorActivityHandlers = []),
                n = 0;
              n < t.length;
              ++n
            )
              -1 == B(r, t[n]) && r.push(t[n]);
        }
        function we(e, t) {
          return ge(e, t).length > 0;
        }
        function xe(e) {
          (e.prototype.on = function (e, t) {
            pe(this, e, t);
          }),
            (e.prototype.off = function (e, t) {
              ve(this, e, t);
            });
        }
        function Ce(e) {
          e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
        }
        function Se(e) {
          e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
        }
        function Le(e) {
          return null != e.defaultPrevented
            ? e.defaultPrevented
            : 0 == e.returnValue;
        }
        function ke(e) {
          Ce(e), Se(e);
        }
        function Te(e) {
          return e.target || e.srcElement;
        }
        function Me(e) {
          var t = e.which;
          return (
            null == t &&
              (1 & e.button
                ? (t = 1)
                : 2 & e.button
                ? (t = 3)
                : 4 & e.button && (t = 2)),
            y && e.ctrlKey && 1 == t && (t = 3),
            t
          );
        }
        var Ne,
          Oe,
          Ae = (function () {
            if (l && s < 9) return !1;
            var e = O("div");
            return "draggable" in e || "dragDrop" in e;
          })();
        function De(e) {
          if (null == Ne) {
            var t = O("span", "\u200b");
            N(e, O("span", [t, document.createTextNode("x")])),
              0 != e.firstChild.offsetHeight &&
                (Ne =
                  t.offsetWidth <= 1 && t.offsetHeight > 2 && !(l && s < 8));
          }
          var r = Ne
            ? O("span", "\u200b")
            : O(
                "span",
                "\xa0",
                null,
                "display: inline-block; width: 1px; margin-right: -1px"
              );
          return r.setAttribute("cm-text", ""), r;
        }
        function We(e) {
          if (null != Oe) return Oe;
          var t = N(e, document.createTextNode("A\u062eA")),
            r = k(t, 0, 1).getBoundingClientRect(),
            n = k(t, 1, 2).getBoundingClientRect();
          return (
            M(e), !(!r || r.left == r.right) && (Oe = n.right - r.right < 3)
          );
        }
        var He =
            3 != "\n\nb".split(/\n/).length
              ? function (e) {
                  for (var t = 0, r = [], n = e.length; t <= n; ) {
                    var i = e.indexOf("\n", t);
                    -1 == i && (i = e.length);
                    var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                      l = o.indexOf("\r");
                    -1 != l
                      ? (r.push(o.slice(0, l)), (t += l + 1))
                      : (r.push(o), (t = i + 1));
                  }
                  return r;
                }
              : function (e) {
                  return e.split(/\r\n?|\n/);
                },
          Fe = window.getSelection
            ? function (e) {
                try {
                  return e.selectionStart != e.selectionEnd;
                } catch (t) {
                  return !1;
                }
              }
            : function (e) {
                var t;
                try {
                  t = e.ownerDocument.selection.createRange();
                } catch (r) {}
                return (
                  !(!t || t.parentElement() != e) &&
                  0 != t.compareEndPoints("StartToEnd", t)
                );
              },
          Ee = (function () {
            var e = O("div");
            return (
              "oncopy" in e ||
              (e.setAttribute("oncopy", "return;"),
              "function" == typeof e.oncopy)
            );
          })(),
          Pe = null;
        function Ie(e) {
          if (null != Pe) return Pe;
          var t = N(e, O("span", "x")),
            r = t.getBoundingClientRect(),
            n = k(t, 0, 1).getBoundingClientRect();
          return (Pe = Math.abs(r.left - n.left) > 1);
        }
        var Re = {},
          ze = {};
        function Be(e, t) {
          arguments.length > 2 &&
            (t.dependencies = Array.prototype.slice.call(arguments, 2)),
            (Re[e] = t);
        }
        function Ge(e, t) {
          ze[e] = t;
        }
        function Ue(e) {
          if ("string" == typeof e && ze.hasOwnProperty(e)) e = ze[e];
          else if (
            e &&
            "string" == typeof e.name &&
            ze.hasOwnProperty(e.name)
          ) {
            var t = ze[e.name];
            "string" == typeof t && (t = { name: t }),
              ((e = J(t, e)).name = t.name);
          } else {
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
              return Ue("application/xml");
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
              return Ue("application/json");
          }
          return "string" == typeof e ? { name: e } : e || { name: "null" };
        }
        function Ve(e, t) {
          t = Ue(t);
          var r = Re[t.name];
          if (!r) return Ve(e, "text/plain");
          var n = r(e, t);
          if (Ke.hasOwnProperty(t.name)) {
            var i = Ke[t.name];
            for (var o in i)
              i.hasOwnProperty(o) &&
                (n.hasOwnProperty(o) && (n["_" + o] = n[o]), (n[o] = i[o]));
          }
          if (
            ((n.name = t.name),
            t.helperType && (n.helperType = t.helperType),
            t.modeProps)
          )
            for (var l in t.modeProps) n[l] = t.modeProps[l];
          return n;
        }
        var Ke = {};
        function je(e, t) {
          I(t, Ke.hasOwnProperty(e) ? Ke[e] : (Ke[e] = {}));
        }
        function Xe(e, t) {
          if (!0 === t) return t;
          if (e.copyState) return e.copyState(t);
          var r = {};
          for (var n in t) {
            var i = t[n];
            i instanceof Array && (i = i.concat([])), (r[n] = i);
          }
          return r;
        }
        function Ye(e, t) {
          for (var r; e.innerMode && (r = e.innerMode(t)) && r.mode != e; )
            (t = r.state), (e = r.mode);
          return r || { mode: e, state: t };
        }
        function _e(e, t, r) {
          return !e.startState || e.startState(t, r);
        }
        var $e = function (e, t, r) {
          (this.pos = this.start = 0),
            (this.string = e),
            (this.tabSize = t || 8),
            (this.lastColumnPos = this.lastColumnValue = 0),
            (this.lineStart = 0),
            (this.lineOracle = r);
        };
        function qe(e, t) {
          if ((t -= e.first) < 0 || t >= e.size)
            throw new Error(
              "There is no line " + (t + e.first) + " in the document."
            );
          for (var r = e; !r.lines; )
            for (var n = 0; ; ++n) {
              var i = r.children[n],
                o = i.chunkSize();
              if (t < o) {
                r = i;
                break;
              }
              t -= o;
            }
          return r.lines[t];
        }
        function Ze(e, t, r) {
          var n = [],
            i = t.line;
          return (
            e.iter(t.line, r.line + 1, function (e) {
              var o = e.text;
              i == r.line && (o = o.slice(0, r.ch)),
                i == t.line && (o = o.slice(t.ch)),
                n.push(o),
                ++i;
            }),
            n
          );
        }
        function Qe(e, t, r) {
          var n = [];
          return (
            e.iter(t, r, function (e) {
              n.push(e.text);
            }),
            n
          );
        }
        function Je(e, t) {
          var r = t - e.height;
          if (r) for (var n = e; n; n = n.parent) n.height += r;
        }
        function et(e) {
          if (null == e.parent) return null;
          for (
            var t = e.parent, r = B(t.lines, e), n = t.parent;
            n;
            t = n, n = n.parent
          )
            for (var i = 0; n.children[i] != t; ++i)
              r += n.children[i].chunkSize();
          return r + t.first;
        }
        function tt(e, t) {
          var r = e.first;
          e: do {
            for (var n = 0; n < e.children.length; ++n) {
              var i = e.children[n],
                o = i.height;
              if (t < o) {
                e = i;
                continue e;
              }
              (t -= o), (r += i.chunkSize());
            }
            return r;
          } while (!e.lines);
          for (var l = 0; l < e.lines.length; ++l) {
            var s = e.lines[l].height;
            if (t < s) break;
            t -= s;
          }
          return r + l;
        }
        function rt(e, t) {
          return t >= e.first && t < e.first + e.size;
        }
        function nt(e, t) {
          return String(e.lineNumberFormatter(t + e.firstLineNumber));
        }
        function it(e, t, r) {
          if ((void 0 === r && (r = null), !(this instanceof it)))
            return new it(e, t, r);
          (this.line = e), (this.ch = t), (this.sticky = r);
        }
        function ot(e, t) {
          return e.line - t.line || e.ch - t.ch;
        }
        function lt(e, t) {
          return e.sticky == t.sticky && 0 == ot(e, t);
        }
        function st(e) {
          return it(e.line, e.ch);
        }
        function at(e, t) {
          return ot(e, t) < 0 ? t : e;
        }
        function ut(e, t) {
          return ot(e, t) < 0 ? e : t;
        }
        function ct(e, t) {
          return Math.max(e.first, Math.min(t, e.first + e.size - 1));
        }
        function ht(e, t) {
          if (t.line < e.first) return it(e.first, 0);
          var r = e.first + e.size - 1;
          return t.line > r
            ? it(r, qe(e, r).text.length)
            : ft(t, qe(e, t.line).text.length);
        }
        function ft(e, t) {
          var r = e.ch;
          return null == r || r > t ? it(e.line, t) : r < 0 ? it(e.line, 0) : e;
        }
        function dt(e, t) {
          for (var r = [], n = 0; n < t.length; n++) r[n] = ht(e, t[n]);
          return r;
        }
        ($e.prototype.eol = function () {
          return this.pos >= this.string.length;
        }),
          ($e.prototype.sol = function () {
            return this.pos == this.lineStart;
          }),
          ($e.prototype.peek = function () {
            return this.string.charAt(this.pos) || void 0;
          }),
          ($e.prototype.next = function () {
            if (this.pos < this.string.length)
              return this.string.charAt(this.pos++);
          }),
          ($e.prototype.eat = function (e) {
            var t = this.string.charAt(this.pos);
            if (
              "string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))
            )
              return ++this.pos, t;
          }),
          ($e.prototype.eatWhile = function (e) {
            for (var t = this.pos; this.eat(e); );
            return this.pos > t;
          }),
          ($e.prototype.eatSpace = function () {
            for (
              var e = this.pos;
              /[\s\u00a0]/.test(this.string.charAt(this.pos));

            )
              ++this.pos;
            return this.pos > e;
          }),
          ($e.prototype.skipToEnd = function () {
            this.pos = this.string.length;
          }),
          ($e.prototype.skipTo = function (e) {
            var t = this.string.indexOf(e, this.pos);
            if (t > -1) return (this.pos = t), !0;
          }),
          ($e.prototype.backUp = function (e) {
            this.pos -= e;
          }),
          ($e.prototype.column = function () {
            return (
              this.lastColumnPos < this.start &&
                ((this.lastColumnValue = R(
                  this.string,
                  this.start,
                  this.tabSize,
                  this.lastColumnPos,
                  this.lastColumnValue
                )),
                (this.lastColumnPos = this.start)),
              this.lastColumnValue -
                (this.lineStart
                  ? R(this.string, this.lineStart, this.tabSize)
                  : 0)
            );
          }),
          ($e.prototype.indentation = function () {
            return (
              R(this.string, null, this.tabSize) -
              (this.lineStart
                ? R(this.string, this.lineStart, this.tabSize)
                : 0)
            );
          }),
          ($e.prototype.match = function (e, t, r) {
            if ("string" != typeof e) {
              var n = this.string.slice(this.pos).match(e);
              return n && n.index > 0
                ? null
                : (n && !1 !== t && (this.pos += n[0].length), n);
            }
            var i = function (e) {
              return r ? e.toLowerCase() : e;
            };
            if (i(this.string.substr(this.pos, e.length)) == i(e))
              return !1 !== t && (this.pos += e.length), !0;
          }),
          ($e.prototype.current = function () {
            return this.string.slice(this.start, this.pos);
          }),
          ($e.prototype.hideFirstChars = function (e, t) {
            this.lineStart += e;
            try {
              return t();
            } finally {
              this.lineStart -= e;
            }
          }),
          ($e.prototype.lookAhead = function (e) {
            var t = this.lineOracle;
            return t && t.lookAhead(e);
          }),
          ($e.prototype.baseToken = function () {
            var e = this.lineOracle;
            return e && e.baseToken(this.pos);
          });
        var pt = function (e, t) {
            (this.state = e), (this.lookAhead = t);
          },
          gt = function (e, t, r, n) {
            (this.state = t),
              (this.doc = e),
              (this.line = r),
              (this.maxLookAhead = n || 0),
              (this.baseTokens = null),
              (this.baseTokenPos = 1);
          };
        function vt(e, t, r, n) {
          var i = [e.state.modeGen],
            o = {};
          kt(
            e,
            t.text,
            e.doc.mode,
            r,
            function (e, t) {
              return i.push(e, t);
            },
            o,
            n
          );
          for (
            var l = r.state,
              s = function (n) {
                r.baseTokens = i;
                var s = e.state.overlays[n],
                  a = 1,
                  u = 0;
                (r.state = !0),
                  kt(
                    e,
                    t.text,
                    s.mode,
                    r,
                    function (e, t) {
                      for (var r = a; u < e; ) {
                        var n = i[a];
                        n > e && i.splice(a, 1, e, i[a + 1], n),
                          (a += 2),
                          (u = Math.min(e, n));
                      }
                      if (t)
                        if (s.opaque)
                          i.splice(r, a - r, e, "overlay " + t), (a = r + 2);
                        else
                          for (; r < a; r += 2) {
                            var o = i[r + 1];
                            i[r + 1] = (o ? o + " " : "") + "overlay " + t;
                          }
                    },
                    o
                  ),
                  (r.state = l),
                  (r.baseTokens = null),
                  (r.baseTokenPos = 1);
              },
              a = 0;
            a < e.state.overlays.length;
            ++a
          )
            s(a);
          return { styles: i, classes: o.bgClass || o.textClass ? o : null };
        }
        function mt(e, t, r) {
          if (!t.styles || t.styles[0] != e.state.modeGen) {
            var n = yt(e, et(t)),
              i =
                t.text.length > e.options.maxHighlightLength &&
                Xe(e.doc.mode, n.state),
              o = vt(e, t, n);
            i && (n.state = i),
              (t.stateAfter = n.save(!i)),
              (t.styles = o.styles),
              o.classes
                ? (t.styleClasses = o.classes)
                : t.styleClasses && (t.styleClasses = null),
              r === e.doc.highlightFrontier &&
                (e.doc.modeFrontier = Math.max(
                  e.doc.modeFrontier,
                  ++e.doc.highlightFrontier
                ));
          }
          return t.styles;
        }
        function yt(e, t, r) {
          var n = e.doc,
            i = e.display;
          if (!n.mode.startState) return new gt(n, !0, t);
          var o = Tt(e, t, r),
            l = o > n.first && qe(n, o - 1).stateAfter,
            s = l ? gt.fromSaved(n, l, o) : new gt(n, _e(n.mode), o);
          return (
            n.iter(o, t, function (r) {
              bt(e, r.text, s);
              var n = s.line;
              (r.stateAfter =
                n == t - 1 || n % 5 == 0 || (n >= i.viewFrom && n < i.viewTo)
                  ? s.save()
                  : null),
                s.nextLine();
            }),
            r && (n.modeFrontier = s.line),
            s
          );
        }
        function bt(e, t, r, n) {
          var i = e.doc.mode,
            o = new $e(t, e.options.tabSize, r);
          for (o.start = o.pos = n || 0, "" == t && wt(i, r.state); !o.eol(); )
            xt(i, o, r.state), (o.start = o.pos);
        }
        function wt(e, t) {
          if (e.blankLine) return e.blankLine(t);
          if (e.innerMode) {
            var r = Ye(e, t);
            return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0;
          }
        }
        function xt(e, t, r, n) {
          for (var i = 0; i < 10; i++) {
            n && (n[0] = Ye(e, r).mode);
            var o = e.token(t, r);
            if (t.pos > t.start) return o;
          }
          throw new Error("Mode " + e.name + " failed to advance stream.");
        }
        (gt.prototype.lookAhead = function (e) {
          var t = this.doc.getLine(this.line + e);
          return (
            null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
          );
        }),
          (gt.prototype.baseToken = function (e) {
            if (!this.baseTokens) return null;
            for (; this.baseTokens[this.baseTokenPos] <= e; )
              this.baseTokenPos += 2;
            var t = this.baseTokens[this.baseTokenPos + 1];
            return {
              type: t && t.replace(/( |^)overlay .*/, ""),
              size: this.baseTokens[this.baseTokenPos] - e,
            };
          }),
          (gt.prototype.nextLine = function () {
            this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
          }),
          (gt.fromSaved = function (e, t, r) {
            return t instanceof pt
              ? new gt(e, Xe(e.mode, t.state), r, t.lookAhead)
              : new gt(e, Xe(e.mode, t), r);
          }),
          (gt.prototype.save = function (e) {
            var t = !1 !== e ? Xe(this.doc.mode, this.state) : this.state;
            return this.maxLookAhead > 0 ? new pt(t, this.maxLookAhead) : t;
          });
        var Ct = function (e, t, r) {
          (this.start = e.start),
            (this.end = e.pos),
            (this.string = e.current()),
            (this.type = t || null),
            (this.state = r);
        };
        function St(e, t, r, n) {
          var i,
            o,
            l = e.doc,
            s = l.mode,
            a = qe(l, (t = ht(l, t)).line),
            u = yt(e, t.line, r),
            c = new $e(a.text, e.options.tabSize, u);
          for (n && (o = []); (n || c.pos < t.ch) && !c.eol(); )
            (c.start = c.pos),
              (i = xt(s, c, u.state)),
              n && o.push(new Ct(c, i, Xe(l.mode, u.state)));
          return n ? o : new Ct(c, i, u.state);
        }
        function Lt(e, t) {
          if (e)
            for (;;) {
              var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
              if (!r) break;
              e = e.slice(0, r.index) + e.slice(r.index + r[0].length);
              var n = r[1] ? "bgClass" : "textClass";
              null == t[n]
                ? (t[n] = r[2])
                : new RegExp("(?:^|\\s)" + r[2] + "(?:$|\\s)").test(t[n]) ||
                  (t[n] += " " + r[2]);
            }
          return e;
        }
        function kt(e, t, r, n, i, o, l) {
          var s = r.flattenSpans;
          null == s && (s = e.options.flattenSpans);
          var a,
            u = 0,
            c = null,
            h = new $e(t, e.options.tabSize, n),
            f = e.options.addModeClass && [null];
          for ("" == t && Lt(wt(r, n.state), o); !h.eol(); ) {
            if (
              (h.pos > e.options.maxHighlightLength
                ? ((s = !1),
                  l && bt(e, t, n, h.pos),
                  (h.pos = t.length),
                  (a = null))
                : (a = Lt(xt(r, h, n.state, f), o)),
              f)
            ) {
              var d = f[0].name;
              d && (a = "m-" + (a ? d + " " + a : d));
            }
            if (!s || c != a) {
              for (; u < h.start; ) i((u = Math.min(h.start, u + 5e3)), c);
              c = a;
            }
            h.start = h.pos;
          }
          for (; u < h.pos; ) {
            var p = Math.min(h.pos, u + 5e3);
            i(p, c), (u = p);
          }
        }
        function Tt(e, t, r) {
          for (
            var n,
              i,
              o = e.doc,
              l = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100),
              s = t;
            s > l;
            --s
          ) {
            if (s <= o.first) return o.first;
            var a = qe(o, s - 1),
              u = a.stateAfter;
            if (
              u &&
              (!r || s + (u instanceof pt ? u.lookAhead : 0) <= o.modeFrontier)
            )
              return s;
            var c = R(a.text, null, e.options.tabSize);
            (null == i || n > c) && ((i = s - 1), (n = c));
          }
          return i;
        }
        function Mt(e, t) {
          if (
            ((e.modeFrontier = Math.min(e.modeFrontier, t)),
            !(e.highlightFrontier < t - 10))
          ) {
            for (var r = e.first, n = t - 1; n > r; n--) {
              var i = qe(e, n).stateAfter;
              if (i && (!(i instanceof pt) || n + i.lookAhead < t)) {
                r = n + 1;
                break;
              }
            }
            e.highlightFrontier = Math.min(e.highlightFrontier, r);
          }
        }
        var Nt = !1,
          Ot = !1;
        function At() {
          Nt = !0;
        }
        function Dt() {
          Ot = !0;
        }
        function Wt(e, t, r) {
          (this.marker = e), (this.from = t), (this.to = r);
        }
        function Ht(e, t) {
          if (e)
            for (var r = 0; r < e.length; ++r) {
              var n = e[r];
              if (n.marker == t) return n;
            }
        }
        function Ft(e, t) {
          for (var r, n = 0; n < e.length; ++n)
            e[n] != t && (r || (r = [])).push(e[n]);
          return r;
        }
        function Et(e, t, r) {
          var n =
            r &&
            window.WeakSet &&
            (r.markedSpans || (r.markedSpans = new WeakSet()));
          n && n.has(e.markedSpans)
            ? e.markedSpans.push(t)
            : ((e.markedSpans = e.markedSpans
                ? e.markedSpans.concat([t])
                : [t]),
              n && n.add(e.markedSpans)),
            t.marker.attachLine(e);
        }
        function Pt(e, t, r) {
          var n;
          if (e)
            for (var i = 0; i < e.length; ++i) {
              var o = e[i],
                l = o.marker;
              if (
                null == o.from ||
                (l.inclusiveLeft ? o.from <= t : o.from < t) ||
                (o.from == t &&
                  "bookmark" == l.type &&
                  (!r || !o.marker.insertLeft))
              ) {
                var s =
                  null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                (n || (n = [])).push(new Wt(l, o.from, s ? null : o.to));
              }
            }
          return n;
        }
        function It(e, t, r) {
          var n;
          if (e)
            for (var i = 0; i < e.length; ++i) {
              var o = e[i],
                l = o.marker;
              if (
                null == o.to ||
                (l.inclusiveRight ? o.to >= t : o.to > t) ||
                (o.from == t &&
                  "bookmark" == l.type &&
                  (!r || o.marker.insertLeft))
              ) {
                var s =
                  null == o.from ||
                  (l.inclusiveLeft ? o.from <= t : o.from < t);
                (n || (n = [])).push(
                  new Wt(
                    l,
                    s ? null : o.from - t,
                    null == o.to ? null : o.to - t
                  )
                );
              }
            }
          return n;
        }
        function Rt(e, t) {
          if (t.full) return null;
          var r = rt(e, t.from.line) && qe(e, t.from.line).markedSpans,
            n = rt(e, t.to.line) && qe(e, t.to.line).markedSpans;
          if (!r && !n) return null;
          var i = t.from.ch,
            o = t.to.ch,
            l = 0 == ot(t.from, t.to),
            s = Pt(r, i, l),
            a = It(n, o, l),
            u = 1 == t.text.length,
            c = $(t.text).length + (u ? i : 0);
          if (s)
            for (var h = 0; h < s.length; ++h) {
              var f = s[h];
              if (null == f.to) {
                var d = Ht(a, f.marker);
                d ? u && (f.to = null == d.to ? null : d.to + c) : (f.to = i);
              }
            }
          if (a)
            for (var p = 0; p < a.length; ++p) {
              var g = a[p];
              null != g.to && (g.to += c),
                null == g.from
                  ? Ht(s, g.marker) ||
                    ((g.from = c), u && (s || (s = [])).push(g))
                  : ((g.from += c), u && (s || (s = [])).push(g));
            }
          s && (s = zt(s)), a && a != s && (a = zt(a));
          var v = [s];
          if (!u) {
            var m,
              y = t.text.length - 2;
            if (y > 0 && s)
              for (var b = 0; b < s.length; ++b)
                null == s[b].to &&
                  (m || (m = [])).push(new Wt(s[b].marker, null, null));
            for (var w = 0; w < y; ++w) v.push(m);
            v.push(a);
          }
          return v;
        }
        function zt(e) {
          for (var t = 0; t < e.length; ++t) {
            var r = e[t];
            null != r.from &&
              r.from == r.to &&
              !1 !== r.marker.clearWhenEmpty &&
              e.splice(t--, 1);
          }
          return e.length ? e : null;
        }
        function Bt(e, t, r) {
          var n = null;
          if (
            (e.iter(t.line, r.line + 1, function (e) {
              if (e.markedSpans)
                for (var t = 0; t < e.markedSpans.length; ++t) {
                  var r = e.markedSpans[t].marker;
                  !r.readOnly ||
                    (n && -1 != B(n, r)) ||
                    (n || (n = [])).push(r);
                }
            }),
            !n)
          )
            return null;
          for (var i = [{ from: t, to: r }], o = 0; o < n.length; ++o)
            for (var l = n[o], s = l.find(0), a = 0; a < i.length; ++a) {
              var u = i[a];
              if (!(ot(u.to, s.from) < 0 || ot(u.from, s.to) > 0)) {
                var c = [a, 1],
                  h = ot(u.from, s.from),
                  f = ot(u.to, s.to);
                (h < 0 || (!l.inclusiveLeft && !h)) &&
                  c.push({ from: u.from, to: s.from }),
                  (f > 0 || (!l.inclusiveRight && !f)) &&
                    c.push({ from: s.to, to: u.to }),
                  i.splice.apply(i, c),
                  (a += c.length - 3);
              }
            }
          return i;
        }
        function Gt(e) {
          var t = e.markedSpans;
          if (t) {
            for (var r = 0; r < t.length; ++r) t[r].marker.detachLine(e);
            e.markedSpans = null;
          }
        }
        function Ut(e, t) {
          if (t) {
            for (var r = 0; r < t.length; ++r) t[r].marker.attachLine(e);
            e.markedSpans = t;
          }
        }
        function Vt(e) {
          return e.inclusiveLeft ? -1 : 0;
        }
        function Kt(e) {
          return e.inclusiveRight ? 1 : 0;
        }
        function jt(e, t) {
          var r = e.lines.length - t.lines.length;
          if (0 != r) return r;
          var n = e.find(),
            i = t.find(),
            o = ot(n.from, i.from) || Vt(e) - Vt(t);
          if (o) return -o;
          var l = ot(n.to, i.to) || Kt(e) - Kt(t);
          return l || t.id - e.id;
        }
        function Xt(e, t) {
          var r,
            n = Ot && e.markedSpans;
          if (n)
            for (var i = void 0, o = 0; o < n.length; ++o)
              (i = n[o]).marker.collapsed &&
                null == (t ? i.from : i.to) &&
                (!r || jt(r, i.marker) < 0) &&
                (r = i.marker);
          return r;
        }
        function Yt(e) {
          return Xt(e, !0);
        }
        function _t(e) {
          return Xt(e, !1);
        }
        function $t(e, t) {
          var r,
            n = Ot && e.markedSpans;
          if (n)
            for (var i = 0; i < n.length; ++i) {
              var o = n[i];
              o.marker.collapsed &&
                (null == o.from || o.from < t) &&
                (null == o.to || o.to > t) &&
                (!r || jt(r, o.marker) < 0) &&
                (r = o.marker);
            }
          return r;
        }
        function qt(e, t, r, n, i) {
          var o = qe(e, t),
            l = Ot && o.markedSpans;
          if (l)
            for (var s = 0; s < l.length; ++s) {
              var a = l[s];
              if (a.marker.collapsed) {
                var u = a.marker.find(0),
                  c = ot(u.from, r) || Vt(a.marker) - Vt(i),
                  h = ot(u.to, n) || Kt(a.marker) - Kt(i);
                if (
                  !((c >= 0 && h <= 0) || (c <= 0 && h >= 0)) &&
                  ((c <= 0 &&
                    (a.marker.inclusiveRight && i.inclusiveLeft
                      ? ot(u.to, r) >= 0
                      : ot(u.to, r) > 0)) ||
                    (c >= 0 &&
                      (a.marker.inclusiveRight && i.inclusiveLeft
                        ? ot(u.from, n) <= 0
                        : ot(u.from, n) < 0)))
                )
                  return !0;
              }
            }
        }
        function Zt(e) {
          for (var t; (t = Yt(e)); ) e = t.find(-1, !0).line;
          return e;
        }
        function Qt(e) {
          for (var t; (t = _t(e)); ) e = t.find(1, !0).line;
          return e;
        }
        function Jt(e) {
          for (var t, r; (t = _t(e)); )
            (e = t.find(1, !0).line), (r || (r = [])).push(e);
          return r;
        }
        function er(e, t) {
          var r = qe(e, t),
            n = Zt(r);
          return r == n ? t : et(n);
        }
        function tr(e, t) {
          if (t > e.lastLine()) return t;
          var r,
            n = qe(e, t);
          if (!rr(e, n)) return t;
          for (; (r = _t(n)); ) n = r.find(1, !0).line;
          return et(n) + 1;
        }
        function rr(e, t) {
          var r = Ot && t.markedSpans;
          if (r)
            for (var n = void 0, i = 0; i < r.length; ++i)
              if ((n = r[i]).marker.collapsed) {
                if (null == n.from) return !0;
                if (
                  !n.marker.widgetNode &&
                  0 == n.from &&
                  n.marker.inclusiveLeft &&
                  nr(e, t, n)
                )
                  return !0;
              }
        }
        function nr(e, t, r) {
          if (null == r.to) {
            var n = r.marker.find(1, !0);
            return nr(e, n.line, Ht(n.line.markedSpans, r.marker));
          }
          if (r.marker.inclusiveRight && r.to == t.text.length) return !0;
          for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
            if (
              (i = t.markedSpans[o]).marker.collapsed &&
              !i.marker.widgetNode &&
              i.from == r.to &&
              (null == i.to || i.to != r.from) &&
              (i.marker.inclusiveLeft || r.marker.inclusiveRight) &&
              nr(e, t, i)
            )
              return !0;
        }
        function ir(e) {
          for (
            var t = 0, r = (e = Zt(e)).parent, n = 0;
            n < r.lines.length;
            ++n
          ) {
            var i = r.lines[n];
            if (i == e) break;
            t += i.height;
          }
          for (var o = r.parent; o; o = (r = o).parent)
            for (var l = 0; l < o.children.length; ++l) {
              var s = o.children[l];
              if (s == r) break;
              t += s.height;
            }
          return t;
        }
        function or(e) {
          if (0 == e.height) return 0;
          for (var t, r = e.text.length, n = e; (t = Yt(n)); ) {
            var i = t.find(0, !0);
            (n = i.from.line), (r += i.from.ch - i.to.ch);
          }
          for (n = e; (t = _t(n)); ) {
            var o = t.find(0, !0);
            (r -= n.text.length - o.from.ch),
              (r += (n = o.to.line).text.length - o.to.ch);
          }
          return r;
        }
        function lr(e) {
          var t = e.display,
            r = e.doc;
          (t.maxLine = qe(r, r.first)),
            (t.maxLineLength = or(t.maxLine)),
            (t.maxLineChanged = !0),
            r.iter(function (e) {
              var r = or(e);
              r > t.maxLineLength && ((t.maxLineLength = r), (t.maxLine = e));
            });
        }
        var sr = function (e, t, r) {
          (this.text = e), Ut(this, t), (this.height = r ? r(this) : 1);
        };
        function ar(e, t, r, n) {
          (e.text = t),
            e.stateAfter && (e.stateAfter = null),
            e.styles && (e.styles = null),
            null != e.order && (e.order = null),
            Gt(e),
            Ut(e, r);
          var i = n ? n(e) : 1;
          i != e.height && Je(e, i);
        }
        function ur(e) {
          (e.parent = null), Gt(e);
        }
        (sr.prototype.lineNo = function () {
          return et(this);
        }),
          xe(sr);
        var cr = {},
          hr = {};
        function fr(e, t) {
          if (!e || /^\s*$/.test(e)) return null;
          var r = t.addModeClass ? hr : cr;
          return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"));
        }
        function dr(e, t) {
          var r = A("span", null, null, a ? "padding-right: .1px" : null),
            n = {
              pre: A("pre", [r], "CodeMirror-line"),
              content: r,
              col: 0,
              pos: 0,
              cm: e,
              trailingSpace: !1,
              splitSpaces: e.getOption("lineWrapping"),
            };
          t.measure = {};
          for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
            var o = i ? t.rest[i - 1] : t.line,
              l = void 0;
            (n.pos = 0),
              (n.addToken = gr),
              We(e.display.measure) &&
                (l = fe(o, e.doc.direction)) &&
                (n.addToken = mr(n.addToken, l)),
              (n.map = []),
              br(o, n, mt(e, o, t != e.display.externalMeasured && et(o))),
              o.styleClasses &&
                (o.styleClasses.bgClass &&
                  (n.bgClass = F(o.styleClasses.bgClass, n.bgClass || "")),
                o.styleClasses.textClass &&
                  (n.textClass = F(
                    o.styleClasses.textClass,
                    n.textClass || ""
                  ))),
              0 == n.map.length &&
                n.map.push(0, 0, n.content.appendChild(De(e.display.measure))),
              0 == i
                ? ((t.measure.map = n.map), (t.measure.cache = {}))
                : ((t.measure.maps || (t.measure.maps = [])).push(n.map),
                  (t.measure.caches || (t.measure.caches = [])).push({}));
          }
          if (a) {
            var s = n.content.lastChild;
            (/\bcm-tab\b/.test(s.className) ||
              (s.querySelector && s.querySelector(".cm-tab"))) &&
              (n.content.className = "cm-tab-wrap-hack");
          }
          return (
            me(e, "renderLine", e, t.line, n.pre),
            n.pre.className &&
              (n.textClass = F(n.pre.className, n.textClass || "")),
            n
          );
        }
        function pr(e) {
          var t = O("span", "\u2022", "cm-invalidchar");
          return (
            (t.title = "\\u" + e.charCodeAt(0).toString(16)),
            t.setAttribute("aria-label", t.title),
            t
          );
        }
        function gr(e, t, r, n, i, o, a) {
          if (t) {
            var u,
              c = e.splitSpaces ? vr(t, e.trailingSpace) : t,
              h = e.cm.state.specialChars,
              f = !1;
            if (h.test(t)) {
              u = document.createDocumentFragment();
              for (var d = 0; ; ) {
                h.lastIndex = d;
                var p = h.exec(t),
                  g = p ? p.index - d : t.length - d;
                if (g) {
                  var v = document.createTextNode(c.slice(d, d + g));
                  l && s < 9 ? u.appendChild(O("span", [v])) : u.appendChild(v),
                    e.map.push(e.pos, e.pos + g, v),
                    (e.col += g),
                    (e.pos += g);
                }
                if (!p) break;
                d += g + 1;
                var m = void 0;
                if ("\t" == p[0]) {
                  var y = e.cm.options.tabSize,
                    b = y - (e.col % y);
                  (m = u.appendChild(O("span", _(b), "cm-tab"))).setAttribute(
                    "role",
                    "presentation"
                  ),
                    m.setAttribute("cm-text", "\t"),
                    (e.col += b);
                } else
                  "\r" == p[0] || "\n" == p[0]
                    ? ((m = u.appendChild(
                        O(
                          "span",
                          "\r" == p[0] ? "\u240d" : "\u2424",
                          "cm-invalidchar"
                        )
                      )).setAttribute("cm-text", p[0]),
                      (e.col += 1))
                    : ((m = e.cm.options.specialCharPlaceholder(
                        p[0]
                      )).setAttribute("cm-text", p[0]),
                      l && s < 9
                        ? u.appendChild(O("span", [m]))
                        : u.appendChild(m),
                      (e.col += 1));
                e.map.push(e.pos, e.pos + 1, m), e.pos++;
              }
            } else
              (e.col += t.length),
                (u = document.createTextNode(c)),
                e.map.push(e.pos, e.pos + t.length, u),
                l && s < 9 && (f = !0),
                (e.pos += t.length);
            if (
              ((e.trailingSpace = 32 == c.charCodeAt(t.length - 1)),
              r || n || i || f || o || a)
            ) {
              var w = r || "";
              n && (w += n), i && (w += i);
              var x = O("span", [u], w, o);
              if (a)
                for (var C in a)
                  a.hasOwnProperty(C) &&
                    "style" != C &&
                    "class" != C &&
                    x.setAttribute(C, a[C]);
              return e.content.appendChild(x);
            }
            e.content.appendChild(u);
          }
        }
        function vr(e, t) {
          if (e.length > 1 && !/  /.test(e)) return e;
          for (var r = t, n = "", i = 0; i < e.length; i++) {
            var o = e.charAt(i);
            " " != o ||
              !r ||
              (i != e.length - 1 && 32 != e.charCodeAt(i + 1)) ||
              (o = "\xa0"),
              (n += o),
              (r = " " == o);
          }
          return n;
        }
        function mr(e, t) {
          return function (r, n, i, o, l, s, a) {
            i = i ? i + " cm-force-border" : "cm-force-border";
            for (var u = r.pos, c = u + n.length; ; ) {
              for (
                var h = void 0, f = 0;
                f < t.length && !((h = t[f]).to > u && h.from <= u);
                f++
              );
              if (h.to >= c) return e(r, n, i, o, l, s, a);
              e(r, n.slice(0, h.to - u), i, o, null, s, a),
                (o = null),
                (n = n.slice(h.to - u)),
                (u = h.to);
            }
          };
        }
        function yr(e, t, r, n) {
          var i = !n && r.widgetNode;
          i && e.map.push(e.pos, e.pos + t, i),
            !n &&
              e.cm.display.input.needsContentAttribute &&
              (i || (i = e.content.appendChild(document.createElement("span"))),
              i.setAttribute("cm-marker", r.id)),
            i &&
              (e.cm.display.input.setUneditable(i), e.content.appendChild(i)),
            (e.pos += t),
            (e.trailingSpace = !1);
        }
        function br(e, t, r) {
          var n = e.markedSpans,
            i = e.text,
            o = 0;
          if (n)
            for (
              var l,
                s,
                a,
                u,
                c,
                h,
                f,
                d = i.length,
                p = 0,
                g = 1,
                v = "",
                m = 0;
              ;

            ) {
              if (m == p) {
                (a = u = c = s = ""), (f = null), (h = null), (m = 1 / 0);
                for (var y = [], b = void 0, w = 0; w < n.length; ++w) {
                  var x = n[w],
                    C = x.marker;
                  if ("bookmark" == C.type && x.from == p && C.widgetNode)
                    y.push(C);
                  else if (
                    x.from <= p &&
                    (null == x.to ||
                      x.to > p ||
                      (C.collapsed && x.to == p && x.from == p))
                  ) {
                    if (
                      (null != x.to &&
                        x.to != p &&
                        m > x.to &&
                        ((m = x.to), (u = "")),
                      C.className && (a += " " + C.className),
                      C.css && (s = (s ? s + ";" : "") + C.css),
                      C.startStyle && x.from == p && (c += " " + C.startStyle),
                      C.endStyle &&
                        x.to == m &&
                        (b || (b = [])).push(C.endStyle, x.to),
                      C.title && ((f || (f = {})).title = C.title),
                      C.attributes)
                    )
                      for (var S in C.attributes)
                        (f || (f = {}))[S] = C.attributes[S];
                    C.collapsed && (!h || jt(h.marker, C) < 0) && (h = x);
                  } else x.from > p && m > x.from && (m = x.from);
                }
                if (b)
                  for (var L = 0; L < b.length; L += 2)
                    b[L + 1] == m && (u += " " + b[L]);
                if (!h || h.from == p)
                  for (var k = 0; k < y.length; ++k) yr(t, 0, y[k]);
                if (h && (h.from || 0) == p) {
                  if (
                    (yr(
                      t,
                      (null == h.to ? d + 1 : h.to) - p,
                      h.marker,
                      null == h.from
                    ),
                    null == h.to)
                  )
                    return;
                  h.to == p && (h = !1);
                }
              }
              if (p >= d) break;
              for (var T = Math.min(d, m); ; ) {
                if (v) {
                  var M = p + v.length;
                  if (!h) {
                    var N = M > T ? v.slice(0, T - p) : v;
                    t.addToken(
                      t,
                      N,
                      l ? l + a : a,
                      c,
                      p + N.length == m ? u : "",
                      s,
                      f
                    );
                  }
                  if (M >= T) {
                    (v = v.slice(T - p)), (p = T);
                    break;
                  }
                  (p = M), (c = "");
                }
                (v = i.slice(o, (o = r[g++]))), (l = fr(r[g++], t.cm.options));
              }
            }
          else
            for (var O = 1; O < r.length; O += 2)
              t.addToken(t, i.slice(o, (o = r[O])), fr(r[O + 1], t.cm.options));
        }
        function wr(e, t, r) {
          (this.line = t),
            (this.rest = Jt(t)),
            (this.size = this.rest ? et($(this.rest)) - r + 1 : 1),
            (this.node = this.text = null),
            (this.hidden = rr(e, t));
        }
        function xr(e, t, r) {
          for (var n, i = [], o = t; o < r; o = n) {
            var l = new wr(e.doc, qe(e.doc, o), o);
            (n = o + l.size), i.push(l);
          }
          return i;
        }
        var Cr = null;
        function Sr(e) {
          Cr
            ? Cr.ops.push(e)
            : (e.ownsGroup = Cr = { ops: [e], delayedCallbacks: [] });
        }
        function Lr(e) {
          var t = e.delayedCallbacks,
            r = 0;
          do {
            for (; r < t.length; r++) t[r].call(null);
            for (var n = 0; n < e.ops.length; n++) {
              var i = e.ops[n];
              if (i.cursorActivityHandlers)
                for (
                  ;
                  i.cursorActivityCalled < i.cursorActivityHandlers.length;

                )
                  i.cursorActivityHandlers[i.cursorActivityCalled++].call(
                    null,
                    i.cm
                  );
            }
          } while (r < t.length);
        }
        function kr(e, t) {
          var r = e.ownsGroup;
          if (r)
            try {
              Lr(r);
            } finally {
              (Cr = null), t(r);
            }
        }
        var Tr = null;
        function Mr(e, t) {
          var r = ge(e, t);
          if (r.length) {
            var n,
              i = Array.prototype.slice.call(arguments, 2);
            Cr
              ? (n = Cr.delayedCallbacks)
              : Tr
              ? (n = Tr)
              : ((n = Tr = []), setTimeout(Nr, 0));
            for (
              var o = function (e) {
                  n.push(function () {
                    return r[e].apply(null, i);
                  });
                },
                l = 0;
              l < r.length;
              ++l
            )
              o(l);
          }
        }
        function Nr() {
          var e = Tr;
          Tr = null;
          for (var t = 0; t < e.length; ++t) e[t]();
        }
        function Or(e, t, r, n) {
          for (var i = 0; i < t.changes.length; i++) {
            var o = t.changes[i];
            "text" == o
              ? Hr(e, t)
              : "gutter" == o
              ? Er(e, t, r, n)
              : "class" == o
              ? Fr(e, t)
              : "widget" == o && Pr(e, t, n);
          }
          t.changes = null;
        }
        function Ar(e) {
          return (
            e.node == e.text &&
              ((e.node = O("div", null, null, "position: relative")),
              e.text.parentNode &&
                e.text.parentNode.replaceChild(e.node, e.text),
              e.node.appendChild(e.text),
              l && s < 8 && (e.node.style.zIndex = 2)),
            e.node
          );
        }
        function Dr(e, t) {
          var r = t.bgClass
            ? t.bgClass + " " + (t.line.bgClass || "")
            : t.line.bgClass;
          if ((r && (r += " CodeMirror-linebackground"), t.background))
            r
              ? (t.background.className = r)
              : (t.background.parentNode.removeChild(t.background),
                (t.background = null));
          else if (r) {
            var n = Ar(t);
            (t.background = n.insertBefore(O("div", null, r), n.firstChild)),
              e.display.input.setUneditable(t.background);
          }
        }
        function Wr(e, t) {
          var r = e.display.externalMeasured;
          return r && r.line == t.line
            ? ((e.display.externalMeasured = null),
              (t.measure = r.measure),
              r.built)
            : dr(e, t);
        }
        function Hr(e, t) {
          var r = t.text.className,
            n = Wr(e, t);
          t.text == t.node && (t.node = n.pre),
            t.text.parentNode.replaceChild(n.pre, t.text),
            (t.text = n.pre),
            n.bgClass != t.bgClass || n.textClass != t.textClass
              ? ((t.bgClass = n.bgClass), (t.textClass = n.textClass), Fr(e, t))
              : r && (t.text.className = r);
        }
        function Fr(e, t) {
          Dr(e, t),
            t.line.wrapClass
              ? (Ar(t).className = t.line.wrapClass)
              : t.node != t.text && (t.node.className = "");
          var r = t.textClass
            ? t.textClass + " " + (t.line.textClass || "")
            : t.line.textClass;
          t.text.className = r || "";
        }
        function Er(e, t, r, n) {
          if (
            (t.gutter && (t.node.removeChild(t.gutter), (t.gutter = null)),
            t.gutterBackground &&
              (t.node.removeChild(t.gutterBackground),
              (t.gutterBackground = null)),
            t.line.gutterClass)
          ) {
            var i = Ar(t);
            (t.gutterBackground = O(
              "div",
              null,
              "CodeMirror-gutter-background " + t.line.gutterClass,
              "left: " +
                (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) +
                "px; width: " +
                n.gutterTotalWidth +
                "px"
            )),
              e.display.input.setUneditable(t.gutterBackground),
              i.insertBefore(t.gutterBackground, t.text);
          }
          var o = t.line.gutterMarkers;
          if (e.options.lineNumbers || o) {
            var l = Ar(t),
              s = (t.gutter = O(
                "div",
                null,
                "CodeMirror-gutter-wrapper",
                "left: " +
                  (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) +
                  "px"
              ));
            if (
              (s.setAttribute("aria-hidden", "true"),
              e.display.input.setUneditable(s),
              l.insertBefore(s, t.text),
              t.line.gutterClass && (s.className += " " + t.line.gutterClass),
              !e.options.lineNumbers ||
                (o && o["CodeMirror-linenumbers"]) ||
                (t.lineNumber = s.appendChild(
                  O(
                    "div",
                    nt(e.options, r),
                    "CodeMirror-linenumber CodeMirror-gutter-elt",
                    "left: " +
                      n.gutterLeft["CodeMirror-linenumbers"] +
                      "px; width: " +
                      e.display.lineNumInnerWidth +
                      "px"
                  )
                )),
              o)
            )
              for (var a = 0; a < e.display.gutterSpecs.length; ++a) {
                var u = e.display.gutterSpecs[a].className,
                  c = o.hasOwnProperty(u) && o[u];
                c &&
                  s.appendChild(
                    O(
                      "div",
                      [c],
                      "CodeMirror-gutter-elt",
                      "left: " +
                        n.gutterLeft[u] +
                        "px; width: " +
                        n.gutterWidth[u] +
                        "px"
                    )
                  );
              }
          }
        }
        function Pr(e, t, r) {
          t.alignable && (t.alignable = null);
          for (
            var n = L("CodeMirror-linewidget"),
              i = t.node.firstChild,
              o = void 0;
            i;
            i = o
          )
            (o = i.nextSibling), n.test(i.className) && t.node.removeChild(i);
          Rr(e, t, r);
        }
        function Ir(e, t, r, n) {
          var i = Wr(e, t);
          return (
            (t.text = t.node = i.pre),
            i.bgClass && (t.bgClass = i.bgClass),
            i.textClass && (t.textClass = i.textClass),
            Fr(e, t),
            Er(e, t, r, n),
            Rr(e, t, n),
            t.node
          );
        }
        function Rr(e, t, r) {
          if ((zr(e, t.line, t, r, !0), t.rest))
            for (var n = 0; n < t.rest.length; n++) zr(e, t.rest[n], t, r, !1);
        }
        function zr(e, t, r, n, i) {
          if (t.widgets)
            for (var o = Ar(r), l = 0, s = t.widgets; l < s.length; ++l) {
              var a = s[l],
                u = O(
                  "div",
                  [a.node],
                  "CodeMirror-linewidget" +
                    (a.className ? " " + a.className : "")
                );
              a.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"),
                Br(a, u, r, n),
                e.display.input.setUneditable(u),
                i && a.above
                  ? o.insertBefore(u, r.gutter || r.text)
                  : o.appendChild(u),
                Mr(a, "redraw");
            }
        }
        function Br(e, t, r, n) {
          if (e.noHScroll) {
            (r.alignable || (r.alignable = [])).push(t);
            var i = n.wrapperWidth;
            (t.style.left = n.fixedPos + "px"),
              e.coverGutter ||
                ((i -= n.gutterTotalWidth),
                (t.style.paddingLeft = n.gutterTotalWidth + "px")),
              (t.style.width = i + "px");
          }
          e.coverGutter &&
            ((t.style.zIndex = 5),
            (t.style.position = "relative"),
            e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"));
        }
        function Gr(e) {
          if (null != e.height) return e.height;
          var t = e.doc.cm;
          if (!t) return 0;
          if (!D(document.body, e.node)) {
            var r = "position: relative;";
            e.coverGutter &&
              (r += "margin-left: -" + t.display.gutters.offsetWidth + "px;"),
              e.noHScroll &&
                (r += "width: " + t.display.wrapper.clientWidth + "px;"),
              N(t.display.measure, O("div", [e.node], null, r));
          }
          return (e.height = e.node.parentNode.offsetHeight);
        }
        function Ur(e, t) {
          for (var r = Te(t); r != e.wrapper; r = r.parentNode)
            if (
              !r ||
              (1 == r.nodeType &&
                "true" == r.getAttribute("cm-ignore-events")) ||
              (r.parentNode == e.sizer && r != e.mover)
            )
              return !0;
        }
        function Vr(e) {
          return e.lineSpace.offsetTop;
        }
        function Kr(e) {
          return e.mover.offsetHeight - e.lineSpace.offsetHeight;
        }
        function jr(e) {
          if (e.cachedPaddingH) return e.cachedPaddingH;
          var t = N(e.measure, O("pre", "x", "CodeMirror-line-like")),
            r = window.getComputedStyle
              ? window.getComputedStyle(t)
              : t.currentStyle,
            n = {
              left: parseInt(r.paddingLeft),
              right: parseInt(r.paddingRight),
            };
          return isNaN(n.left) || isNaN(n.right) || (e.cachedPaddingH = n), n;
        }
        function Xr(e) {
          return G - e.display.nativeBarWidth;
        }
        function Yr(e) {
          return e.display.scroller.clientWidth - Xr(e) - e.display.barWidth;
        }
        function _r(e) {
          return e.display.scroller.clientHeight - Xr(e) - e.display.barHeight;
        }
        function $r(e, t, r) {
          var n = e.options.lineWrapping,
            i = n && Yr(e);
          if (!t.measure.heights || (n && t.measure.width != i)) {
            var o = (t.measure.heights = []);
            if (n) {
              t.measure.width = i;
              for (
                var l = t.text.firstChild.getClientRects(), s = 0;
                s < l.length - 1;
                s++
              ) {
                var a = l[s],
                  u = l[s + 1];
                Math.abs(a.bottom - u.bottom) > 2 &&
                  o.push((a.bottom + u.top) / 2 - r.top);
              }
            }
            o.push(r.bottom - r.top);
          }
        }
        function qr(e, t, r) {
          if (e.line == t)
            return { map: e.measure.map, cache: e.measure.cache };
          for (var n = 0; n < e.rest.length; n++)
            if (e.rest[n] == t)
              return { map: e.measure.maps[n], cache: e.measure.caches[n] };
          for (var i = 0; i < e.rest.length; i++)
            if (et(e.rest[i]) > r)
              return {
                map: e.measure.maps[i],
                cache: e.measure.caches[i],
                before: !0,
              };
        }
        function Zr(e, t) {
          var r = et((t = Zt(t))),
            n = (e.display.externalMeasured = new wr(e.doc, t, r));
          n.lineN = r;
          var i = (n.built = dr(e, n));
          return (n.text = i.pre), N(e.display.lineMeasure, i.pre), n;
        }
        function Qr(e, t, r, n) {
          return tn(e, en(e, t), r, n);
        }
        function Jr(e, t) {
          if (t >= e.display.viewFrom && t < e.display.viewTo)
            return e.display.view[En(e, t)];
          var r = e.display.externalMeasured;
          return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0;
        }
        function en(e, t) {
          var r = et(t),
            n = Jr(e, r);
          n && !n.text
            ? (n = null)
            : n &&
              n.changes &&
              (Or(e, n, r, An(e)), (e.curOp.forceUpdate = !0)),
            n || (n = Zr(e, t));
          var i = qr(n, t, r);
          return {
            line: t,
            view: n,
            rect: null,
            map: i.map,
            cache: i.cache,
            before: i.before,
            hasHeights: !1,
          };
        }
        function tn(e, t, r, n, i) {
          t.before && (r = -1);
          var o,
            l = r + (n || "");
          return (
            t.cache.hasOwnProperty(l)
              ? (o = t.cache[l])
              : (t.rect || (t.rect = t.view.text.getBoundingClientRect()),
                t.hasHeights || ($r(e, t.view, t.rect), (t.hasHeights = !0)),
                (o = sn(e, t, r, n)).bogus || (t.cache[l] = o)),
            {
              left: o.left,
              right: o.right,
              top: i ? o.rtop : o.top,
              bottom: i ? o.rbottom : o.bottom,
            }
          );
        }
        var rn,
          nn = { left: 0, right: 0, top: 0, bottom: 0 };
        function on(e, t, r) {
          for (var n, i, o, l, s, a, u = 0; u < e.length; u += 3)
            if (
              ((s = e[u]),
              (a = e[u + 1]),
              t < s
                ? ((i = 0), (o = 1), (l = "left"))
                : t < a
                ? (o = 1 + (i = t - s))
                : (u == e.length - 3 || (t == a && e[u + 3] > t)) &&
                  ((i = (o = a - s) - 1), t >= a && (l = "right")),
              null != i)
            ) {
              if (
                ((n = e[u + 2]),
                s == a && r == (n.insertLeft ? "left" : "right") && (l = r),
                "left" == r && 0 == i)
              )
                for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft; )
                  (n = e[2 + (u -= 3)]), (l = "left");
              if ("right" == r && i == a - s)
                for (
                  ;
                  u < e.length - 3 &&
                  e[u + 3] == e[u + 4] &&
                  !e[u + 5].insertLeft;

                )
                  (n = e[(u += 3) + 2]), (l = "right");
              break;
            }
          return {
            node: n,
            start: i,
            end: o,
            collapse: l,
            coverStart: s,
            coverEnd: a,
          };
        }
        function ln(e, t) {
          var r = nn;
          if ("left" == t)
            for (var n = 0; n < e.length && (r = e[n]).left == r.right; n++);
          else
            for (
              var i = e.length - 1;
              i >= 0 && (r = e[i]).left == r.right;
              i--
            );
          return r;
        }
        function sn(e, t, r, n) {
          var i,
            o = on(t.map, r, n),
            a = o.node,
            u = o.start,
            c = o.end,
            h = o.collapse;
          if (3 == a.nodeType) {
            for (var f = 0; f < 4; f++) {
              for (; u && oe(t.line.text.charAt(o.coverStart + u)); ) --u;
              for (
                ;
                o.coverStart + c < o.coverEnd &&
                oe(t.line.text.charAt(o.coverStart + c));

              )
                ++c;
              if (
                (i =
                  l && s < 9 && 0 == u && c == o.coverEnd - o.coverStart
                    ? a.parentNode.getBoundingClientRect()
                    : ln(k(a, u, c).getClientRects(), n)).left ||
                i.right ||
                0 == u
              )
                break;
              (c = u), (u -= 1), (h = "right");
            }
            l && s < 11 && (i = an(e.display.measure, i));
          } else {
            var d;
            u > 0 && (h = n = "right"),
              (i =
                e.options.lineWrapping && (d = a.getClientRects()).length > 1
                  ? d["right" == n ? d.length - 1 : 0]
                  : a.getBoundingClientRect());
          }
          if (l && s < 9 && !u && (!i || (!i.left && !i.right))) {
            var p = a.parentNode.getClientRects()[0];
            i = p
              ? {
                  left: p.left,
                  right: p.left + On(e.display),
                  top: p.top,
                  bottom: p.bottom,
                }
              : nn;
          }
          for (
            var g = i.top - t.rect.top,
              v = i.bottom - t.rect.top,
              m = (g + v) / 2,
              y = t.view.measure.heights,
              b = 0;
            b < y.length - 1 && !(m < y[b]);
            b++
          );
          var w = b ? y[b - 1] : 0,
            x = y[b],
            C = {
              left: ("right" == h ? i.right : i.left) - t.rect.left,
              right: ("left" == h ? i.left : i.right) - t.rect.left,
              top: w,
              bottom: x,
            };
          return (
            i.left || i.right || (C.bogus = !0),
            e.options.singleCursorHeightPerLine ||
              ((C.rtop = g), (C.rbottom = v)),
            C
          );
        }
        function an(e, t) {
          if (
            !window.screen ||
            null == screen.logicalXDPI ||
            screen.logicalXDPI == screen.deviceXDPI ||
            !Ie(e)
          )
            return t;
          var r = screen.logicalXDPI / screen.deviceXDPI,
            n = screen.logicalYDPI / screen.deviceYDPI;
          return {
            left: t.left * r,
            right: t.right * r,
            top: t.top * n,
            bottom: t.bottom * n,
          };
        }
        function un(e) {
          if (
            e.measure &&
            ((e.measure.cache = {}), (e.measure.heights = null), e.rest)
          )
            for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {};
        }
        function cn(e) {
          (e.display.externalMeasure = null), M(e.display.lineMeasure);
          for (var t = 0; t < e.display.view.length; t++) un(e.display.view[t]);
        }
        function hn(e) {
          cn(e),
            (e.display.cachedCharWidth =
              e.display.cachedTextHeight =
              e.display.cachedPaddingH =
                null),
            e.options.lineWrapping || (e.display.maxLineChanged = !0),
            (e.display.lineNumChars = null);
        }
        function fn() {
          return c && v
            ? -(
                document.body.getBoundingClientRect().left -
                parseInt(getComputedStyle(document.body).marginLeft)
              )
            : window.pageXOffset ||
                (document.documentElement || document.body).scrollLeft;
        }
        function dn() {
          return c && v
            ? -(
                document.body.getBoundingClientRect().top -
                parseInt(getComputedStyle(document.body).marginTop)
              )
            : window.pageYOffset ||
                (document.documentElement || document.body).scrollTop;
        }
        function pn(e) {
          var t = 0;
          if (e.widgets)
            for (var r = 0; r < e.widgets.length; ++r)
              e.widgets[r].above && (t += Gr(e.widgets[r]));
          return t;
        }
        function gn(e, t, r, n, i) {
          if (!i) {
            var o = pn(t);
            (r.top += o), (r.bottom += o);
          }
          if ("line" == n) return r;
          n || (n = "local");
          var l = ir(t);
          if (
            ("local" == n ? (l += Vr(e.display)) : (l -= e.display.viewOffset),
            "page" == n || "window" == n)
          ) {
            var s = e.display.lineSpace.getBoundingClientRect();
            l += s.top + ("window" == n ? 0 : dn());
            var a = s.left + ("window" == n ? 0 : fn());
            (r.left += a), (r.right += a);
          }
          return (r.top += l), (r.bottom += l), r;
        }
        function vn(e, t, r) {
          if ("div" == r) return t;
          var n = t.left,
            i = t.top;
          if ("page" == r) (n -= fn()), (i -= dn());
          else if ("local" == r || !r) {
            var o = e.display.sizer.getBoundingClientRect();
            (n += o.left), (i += o.top);
          }
          var l = e.display.lineSpace.getBoundingClientRect();
          return { left: n - l.left, top: i - l.top };
        }
        function mn(e, t, r, n, i) {
          return n || (n = qe(e.doc, t.line)), gn(e, n, Qr(e, n, t.ch, i), r);
        }
        function yn(e, t, r, n, i, o) {
          function l(t, l) {
            var s = tn(e, i, t, l ? "right" : "left", o);
            return l ? (s.left = s.right) : (s.right = s.left), gn(e, n, s, r);
          }
          (n = n || qe(e.doc, t.line)), i || (i = en(e, n));
          var s = fe(n, e.doc.direction),
            a = t.ch,
            u = t.sticky;
          if (
            (a >= n.text.length
              ? ((a = n.text.length), (u = "before"))
              : a <= 0 && ((a = 0), (u = "after")),
            !s)
          )
            return l("before" == u ? a - 1 : a, "before" == u);
          function c(e, t, r) {
            return l(r ? e - 1 : e, (1 == s[t].level) != r);
          }
          var h = ce(s, a, u),
            f = ue,
            d = c(a, h, "before" == u);
          return null != f && (d.other = c(a, f, "before" != u)), d;
        }
        function bn(e, t) {
          var r = 0;
          (t = ht(e.doc, t)),
            e.options.lineWrapping || (r = On(e.display) * t.ch);
          var n = qe(e.doc, t.line),
            i = ir(n) + Vr(e.display);
          return { left: r, right: r, top: i, bottom: i + n.height };
        }
        function wn(e, t, r, n, i) {
          var o = it(e, t, r);
          return (o.xRel = i), n && (o.outside = n), o;
        }
        function xn(e, t, r) {
          var n = e.doc;
          if ((r += e.display.viewOffset) < 0)
            return wn(n.first, 0, null, -1, -1);
          var i = tt(n, r),
            o = n.first + n.size - 1;
          if (i > o)
            return wn(n.first + n.size - 1, qe(n, o).text.length, null, 1, 1);
          t < 0 && (t = 0);
          for (var l = qe(n, i); ; ) {
            var s = kn(e, l, i, t, r),
              a = $t(l, s.ch + (s.xRel > 0 || s.outside > 0 ? 1 : 0));
            if (!a) return s;
            var u = a.find(1);
            if (u.line == i) return u;
            l = qe(n, (i = u.line));
          }
        }
        function Cn(e, t, r, n) {
          n -= pn(t);
          var i = t.text.length,
            o = se(
              function (t) {
                return tn(e, r, t - 1).bottom <= n;
              },
              i,
              0
            );
          return {
            begin: o,
            end: (i = se(
              function (t) {
                return tn(e, r, t).top > n;
              },
              o,
              i
            )),
          };
        }
        function Sn(e, t, r, n) {
          return (
            r || (r = en(e, t)), Cn(e, t, r, gn(e, t, tn(e, r, n), "line").top)
          );
        }
        function Ln(e, t, r, n) {
          return !(e.bottom <= r) && (e.top > r || (n ? e.left : e.right) > t);
        }
        function kn(e, t, r, n, i) {
          i -= ir(t);
          var o = en(e, t),
            l = pn(t),
            s = 0,
            a = t.text.length,
            u = !0,
            c = fe(t, e.doc.direction);
          if (c) {
            var h = (e.options.lineWrapping ? Mn : Tn)(e, t, r, o, c, n, i);
            (s = (u = 1 != h.level) ? h.from : h.to - 1),
              (a = u ? h.to : h.from - 1);
          }
          var f,
            d,
            p = null,
            g = null,
            v = se(
              function (t) {
                var r = tn(e, o, t);
                return (
                  (r.top += l),
                  (r.bottom += l),
                  !!Ln(r, n, i, !1) &&
                    (r.top <= i && r.left <= n && ((p = t), (g = r)), !0)
                );
              },
              s,
              a
            ),
            m = !1;
          if (g) {
            var y = n - g.left < g.right - n,
              b = y == u;
            (v = p + (b ? 0 : 1)),
              (d = b ? "after" : "before"),
              (f = y ? g.left : g.right);
          } else {
            u || (v != a && v != s) || v++,
              (d =
                0 == v
                  ? "after"
                  : v == t.text.length
                  ? "before"
                  : tn(e, o, v - (u ? 1 : 0)).bottom + l <= i == u
                  ? "after"
                  : "before");
            var w = yn(e, it(r, v, d), "line", t, o);
            (f = w.left), (m = i < w.top ? -1 : i >= w.bottom ? 1 : 0);
          }
          return wn(r, (v = le(t.text, v, 1)), d, m, n - f);
        }
        function Tn(e, t, r, n, i, o, l) {
          var s = se(
              function (s) {
                var a = i[s],
                  u = 1 != a.level;
                return Ln(
                  yn(
                    e,
                    it(r, u ? a.to : a.from, u ? "before" : "after"),
                    "line",
                    t,
                    n
                  ),
                  o,
                  l,
                  !0
                );
              },
              0,
              i.length - 1
            ),
            a = i[s];
          if (s > 0) {
            var u = 1 != a.level,
              c = yn(
                e,
                it(r, u ? a.from : a.to, u ? "after" : "before"),
                "line",
                t,
                n
              );
            Ln(c, o, l, !0) && c.top > l && (a = i[s - 1]);
          }
          return a;
        }
        function Mn(e, t, r, n, i, o, l) {
          var s = Cn(e, t, n, l),
            a = s.begin,
            u = s.end;
          /\s/.test(t.text.charAt(u - 1)) && u--;
          for (var c = null, h = null, f = 0; f < i.length; f++) {
            var d = i[f];
            if (!(d.from >= u || d.to <= a)) {
              var p = tn(
                  e,
                  n,
                  1 != d.level ? Math.min(u, d.to) - 1 : Math.max(a, d.from)
                ).right,
                g = p < o ? o - p + 1e9 : p - o;
              (!c || h > g) && ((c = d), (h = g));
            }
          }
          return (
            c || (c = i[i.length - 1]),
            c.from < a && (c = { from: a, to: c.to, level: c.level }),
            c.to > u && (c = { from: c.from, to: u, level: c.level }),
            c
          );
        }
        function Nn(e) {
          if (null != e.cachedTextHeight) return e.cachedTextHeight;
          if (null == rn) {
            rn = O("pre", null, "CodeMirror-line-like");
            for (var t = 0; t < 49; ++t)
              rn.appendChild(document.createTextNode("x")),
                rn.appendChild(O("br"));
            rn.appendChild(document.createTextNode("x"));
          }
          N(e.measure, rn);
          var r = rn.offsetHeight / 50;
          return r > 3 && (e.cachedTextHeight = r), M(e.measure), r || 1;
        }
        function On(e) {
          if (null != e.cachedCharWidth) return e.cachedCharWidth;
          var t = O("span", "xxxxxxxxxx"),
            r = O("pre", [t], "CodeMirror-line-like");
          N(e.measure, r);
          var n = t.getBoundingClientRect(),
            i = (n.right - n.left) / 10;
          return i > 2 && (e.cachedCharWidth = i), i || 10;
        }
        function An(e) {
          for (
            var t = e.display,
              r = {},
              n = {},
              i = t.gutters.clientLeft,
              o = t.gutters.firstChild,
              l = 0;
            o;
            o = o.nextSibling, ++l
          ) {
            var s = e.display.gutterSpecs[l].className;
            (r[s] = o.offsetLeft + o.clientLeft + i), (n[s] = o.clientWidth);
          }
          return {
            fixedPos: Dn(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: r,
            gutterWidth: n,
            wrapperWidth: t.wrapper.clientWidth,
          };
        }
        function Dn(e) {
          return (
            e.scroller.getBoundingClientRect().left -
            e.sizer.getBoundingClientRect().left
          );
        }
        function Wn(e) {
          var t = Nn(e.display),
            r = e.options.lineWrapping,
            n =
              r &&
              Math.max(5, e.display.scroller.clientWidth / On(e.display) - 3);
          return function (i) {
            if (rr(e.doc, i)) return 0;
            var o = 0;
            if (i.widgets)
              for (var l = 0; l < i.widgets.length; l++)
                i.widgets[l].height && (o += i.widgets[l].height);
            return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t;
          };
        }
        function Hn(e) {
          var t = e.doc,
            r = Wn(e);
          t.iter(function (e) {
            var t = r(e);
            t != e.height && Je(e, t);
          });
        }
        function Fn(e, t, r, n) {
          var i = e.display;
          if (!r && "true" == Te(t).getAttribute("cm-not-content")) return null;
          var o,
            l,
            s = i.lineSpace.getBoundingClientRect();
          try {
            (o = t.clientX - s.left), (l = t.clientY - s.top);
          } catch (h) {
            return null;
          }
          var a,
            u = xn(e, o, l);
          if (n && u.xRel > 0 && (a = qe(e.doc, u.line).text).length == u.ch) {
            var c = R(a, a.length, e.options.tabSize) - a.length;
            u = it(
              u.line,
              Math.max(
                0,
                Math.round((o - jr(e.display).left) / On(e.display)) - c
              )
            );
          }
          return u;
        }
        function En(e, t) {
          if (t >= e.display.viewTo) return null;
          if ((t -= e.display.viewFrom) < 0) return null;
          for (var r = e.display.view, n = 0; n < r.length; n++)
            if ((t -= r[n].size) < 0) return n;
        }
        function Pn(e, t, r, n) {
          null == t && (t = e.doc.first),
            null == r && (r = e.doc.first + e.doc.size),
            n || (n = 0);
          var i = e.display;
          if (
            (n &&
              r < i.viewTo &&
              (null == i.updateLineNumbers || i.updateLineNumbers > t) &&
              (i.updateLineNumbers = t),
            (e.curOp.viewChanged = !0),
            t >= i.viewTo)
          )
            Ot && er(e.doc, t) < i.viewTo && Rn(e);
          else if (r <= i.viewFrom)
            Ot && tr(e.doc, r + n) > i.viewFrom
              ? Rn(e)
              : ((i.viewFrom += n), (i.viewTo += n));
          else if (t <= i.viewFrom && r >= i.viewTo) Rn(e);
          else if (t <= i.viewFrom) {
            var o = zn(e, r, r + n, 1);
            o
              ? ((i.view = i.view.slice(o.index)),
                (i.viewFrom = o.lineN),
                (i.viewTo += n))
              : Rn(e);
          } else if (r >= i.viewTo) {
            var l = zn(e, t, t, -1);
            l
              ? ((i.view = i.view.slice(0, l.index)), (i.viewTo = l.lineN))
              : Rn(e);
          } else {
            var s = zn(e, t, t, -1),
              a = zn(e, r, r + n, 1);
            s && a
              ? ((i.view = i.view
                  .slice(0, s.index)
                  .concat(xr(e, s.lineN, a.lineN))
                  .concat(i.view.slice(a.index))),
                (i.viewTo += n))
              : Rn(e);
          }
          var u = i.externalMeasured;
          u &&
            (r < u.lineN
              ? (u.lineN += n)
              : t < u.lineN + u.size && (i.externalMeasured = null));
        }
        function In(e, t, r) {
          e.curOp.viewChanged = !0;
          var n = e.display,
            i = e.display.externalMeasured;
          if (
            (i &&
              t >= i.lineN &&
              t < i.lineN + i.size &&
              (n.externalMeasured = null),
            !(t < n.viewFrom || t >= n.viewTo))
          ) {
            var o = n.view[En(e, t)];
            if (null != o.node) {
              var l = o.changes || (o.changes = []);
              -1 == B(l, r) && l.push(r);
            }
          }
        }
        function Rn(e) {
          (e.display.viewFrom = e.display.viewTo = e.doc.first),
            (e.display.view = []),
            (e.display.viewOffset = 0);
        }
        function zn(e, t, r, n) {
          var i,
            o = En(e, t),
            l = e.display.view;
          if (!Ot || r == e.doc.first + e.doc.size)
            return { index: o, lineN: r };
          for (var s = e.display.viewFrom, a = 0; a < o; a++) s += l[a].size;
          if (s != t) {
            if (n > 0) {
              if (o == l.length - 1) return null;
              (i = s + l[o].size - t), o++;
            } else i = s - t;
            (t += i), (r += i);
          }
          for (; er(e.doc, r) != r; ) {
            if (o == (n < 0 ? 0 : l.length - 1)) return null;
            (r += n * l[o - (n < 0 ? 1 : 0)].size), (o += n);
          }
          return { index: o, lineN: r };
        }
        function Bn(e, t, r) {
          var n = e.display;
          0 == n.view.length || t >= n.viewTo || r <= n.viewFrom
            ? ((n.view = xr(e, t, r)), (n.viewFrom = t))
            : (n.viewFrom > t
                ? (n.view = xr(e, t, n.viewFrom).concat(n.view))
                : n.viewFrom < t && (n.view = n.view.slice(En(e, t))),
              (n.viewFrom = t),
              n.viewTo < r
                ? (n.view = n.view.concat(xr(e, n.viewTo, r)))
                : n.viewTo > r && (n.view = n.view.slice(0, En(e, r)))),
            (n.viewTo = r);
        }
        function Gn(e) {
          for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
            var i = t[n];
            i.hidden || (i.node && !i.changes) || ++r;
          }
          return r;
        }
        function Un(e) {
          e.display.input.showSelection(e.display.input.prepareSelection());
        }
        function Vn(e, t) {
          void 0 === t && (t = !0);
          for (
            var r = e.doc,
              n = {},
              i = (n.cursors = document.createDocumentFragment()),
              o = (n.selection = document.createDocumentFragment()),
              l = 0;
            l < r.sel.ranges.length;
            l++
          )
            if (t || l != r.sel.primIndex) {
              var s = r.sel.ranges[l];
              if (
                !(
                  s.from().line >= e.display.viewTo ||
                  s.to().line < e.display.viewFrom
                )
              ) {
                var a = s.empty();
                (a || e.options.showCursorWhenSelecting) && Kn(e, s.head, i),
                  a || Xn(e, s, o);
              }
            }
          return n;
        }
        function Kn(e, t, r) {
          var n = yn(
              e,
              t,
              "div",
              null,
              null,
              !e.options.singleCursorHeightPerLine
            ),
            i = r.appendChild(O("div", "\xa0", "CodeMirror-cursor"));
          if (
            ((i.style.left = n.left + "px"),
            (i.style.top = n.top + "px"),
            (i.style.height =
              Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px"),
            /\bcm-fat-cursor\b/.test(e.getWrapperElement().className))
          ) {
            var o = mn(e, t, "div", null, null);
            o.right - o.left > 0 && (i.style.width = o.right - o.left + "px");
          }
          if (n.other) {
            var l = r.appendChild(
              O("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor")
            );
            (l.style.display = ""),
              (l.style.left = n.other.left + "px"),
              (l.style.top = n.other.top + "px"),
              (l.style.height = 0.85 * (n.other.bottom - n.other.top) + "px");
          }
        }
        function jn(e, t) {
          return e.top - t.top || e.left - t.left;
        }
        function Xn(e, t, r) {
          var n = e.display,
            i = e.doc,
            o = document.createDocumentFragment(),
            l = jr(e.display),
            s = l.left,
            a = Math.max(n.sizerWidth, Yr(e) - n.sizer.offsetLeft) - l.right,
            u = "ltr" == i.direction;
          function c(e, t, r, n) {
            t < 0 && (t = 0),
              (t = Math.round(t)),
              (n = Math.round(n)),
              o.appendChild(
                O(
                  "div",
                  null,
                  "CodeMirror-selected",
                  "position: absolute; left: " +
                    e +
                    "px;\n                             top: " +
                    t +
                    "px; width: " +
                    (null == r ? a - e : r) +
                    "px;\n                             height: " +
                    (n - t) +
                    "px"
                )
              );
          }
          function h(t, r, n) {
            var o,
              l,
              h = qe(i, t),
              f = h.text.length;
            function d(r, n) {
              return mn(e, it(t, r), "div", h, n);
            }
            function p(t, r, n) {
              var i = Sn(e, h, null, t),
                o = ("ltr" == r) == ("after" == n) ? "left" : "right";
              return d(
                "after" == n
                  ? i.begin
                  : i.end - (/\s/.test(h.text.charAt(i.end - 1)) ? 2 : 1),
                o
              )[o];
            }
            var g = fe(h, i.direction);
            return (
              ae(g, r || 0, null == n ? f : n, function (e, t, i, h) {
                var v = "ltr" == i,
                  m = d(e, v ? "left" : "right"),
                  y = d(t - 1, v ? "right" : "left"),
                  b = null == r && 0 == e,
                  w = null == n && t == f,
                  x = 0 == h,
                  C = !g || h == g.length - 1;
                if (y.top - m.top <= 3) {
                  var S = (u ? w : b) && C,
                    L = (u ? b : w) && x ? s : (v ? m : y).left,
                    k = S ? a : (v ? y : m).right;
                  c(L, m.top, k - L, m.bottom);
                } else {
                  var T, M, N, O;
                  v
                    ? ((T = u && b && x ? s : m.left),
                      (M = u ? a : p(e, i, "before")),
                      (N = u ? s : p(t, i, "after")),
                      (O = u && w && C ? a : y.right))
                    : ((T = u ? p(e, i, "before") : s),
                      (M = !u && b && x ? a : m.right),
                      (N = !u && w && C ? s : y.left),
                      (O = u ? p(t, i, "after") : a)),
                    c(T, m.top, M - T, m.bottom),
                    m.bottom < y.top && c(s, m.bottom, null, y.top),
                    c(N, y.top, O - N, y.bottom);
                }
                (!o || jn(m, o) < 0) && (o = m),
                  jn(y, o) < 0 && (o = y),
                  (!l || jn(m, l) < 0) && (l = m),
                  jn(y, l) < 0 && (l = y);
              }),
              { start: o, end: l }
            );
          }
          var f = t.from(),
            d = t.to();
          if (f.line == d.line) h(f.line, f.ch, d.ch);
          else {
            var p = qe(i, f.line),
              g = qe(i, d.line),
              v = Zt(p) == Zt(g),
              m = h(f.line, f.ch, v ? p.text.length + 1 : null).end,
              y = h(d.line, v ? 0 : null, d.ch).start;
            v &&
              (m.top < y.top - 2
                ? (c(m.right, m.top, null, m.bottom),
                  c(s, y.top, y.left, y.bottom))
                : c(m.right, m.top, y.left - m.right, m.bottom)),
              m.bottom < y.top && c(s, m.bottom, null, y.top);
          }
          r.appendChild(o);
        }
        function Yn(e) {
          if (e.state.focused) {
            var t = e.display;
            clearInterval(t.blinker);
            var r = !0;
            (t.cursorDiv.style.visibility = ""),
              e.options.cursorBlinkRate > 0
                ? (t.blinker = setInterval(function () {
                    e.hasFocus() || Zn(e),
                      (t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden");
                  }, e.options.cursorBlinkRate))
                : e.options.cursorBlinkRate < 0 &&
                  (t.cursorDiv.style.visibility = "hidden");
          }
        }
        function _n(e) {
          e.hasFocus() || (e.display.input.focus(), e.state.focused || qn(e));
        }
        function $n(e) {
          (e.state.delayingBlurEvent = !0),
            setTimeout(function () {
              e.state.delayingBlurEvent &&
                ((e.state.delayingBlurEvent = !1), e.state.focused && Zn(e));
            }, 100);
        }
        function qn(e, t) {
          e.state.delayingBlurEvent &&
            !e.state.draggingText &&
            (e.state.delayingBlurEvent = !1),
            "nocursor" != e.options.readOnly &&
              (e.state.focused ||
                (me(e, "focus", e, t),
                (e.state.focused = !0),
                H(e.display.wrapper, "CodeMirror-focused"),
                e.curOp ||
                  e.display.selForContextMenu == e.doc.sel ||
                  (e.display.input.reset(),
                  a &&
                    setTimeout(function () {
                      return e.display.input.reset(!0);
                    }, 20)),
                e.display.input.receivedFocus()),
              Yn(e));
        }
        function Zn(e, t) {
          e.state.delayingBlurEvent ||
            (e.state.focused &&
              (me(e, "blur", e, t),
              (e.state.focused = !1),
              T(e.display.wrapper, "CodeMirror-focused")),
            clearInterval(e.display.blinker),
            setTimeout(function () {
              e.state.focused || (e.display.shift = !1);
            }, 150));
        }
        function Qn(e) {
          for (
            var t = e.display,
              r = t.lineDiv.offsetTop,
              n = Math.max(0, t.scroller.getBoundingClientRect().top),
              i = t.lineDiv.getBoundingClientRect().top,
              o = 0,
              a = 0;
            a < t.view.length;
            a++
          ) {
            var u = t.view[a],
              c = e.options.lineWrapping,
              h = void 0,
              f = 0;
            if (!u.hidden) {
              if (((i += u.line.height), l && s < 8)) {
                var d = u.node.offsetTop + u.node.offsetHeight;
                (h = d - r), (r = d);
              } else {
                var p = u.node.getBoundingClientRect();
                (h = p.bottom - p.top),
                  !c &&
                    u.text.firstChild &&
                    (f =
                      u.text.firstChild.getBoundingClientRect().right -
                      p.left -
                      1);
              }
              var g = u.line.height - h;
              if (
                (g > 0.005 || g < -0.005) &&
                (i < n && (o -= g), Je(u.line, h), Jn(u.line), u.rest)
              )
                for (var v = 0; v < u.rest.length; v++) Jn(u.rest[v]);
              if (f > e.display.sizerWidth) {
                var m = Math.ceil(f / On(e.display));
                m > e.display.maxLineLength &&
                  ((e.display.maxLineLength = m),
                  (e.display.maxLine = u.line),
                  (e.display.maxLineChanged = !0));
              }
            }
          }
          Math.abs(o) > 2 && (t.scroller.scrollTop += o);
        }
        function Jn(e) {
          if (e.widgets)
            for (var t = 0; t < e.widgets.length; ++t) {
              var r = e.widgets[t],
                n = r.node.parentNode;
              n && (r.height = n.offsetHeight);
            }
        }
        function ei(e, t, r) {
          var n =
            r && null != r.top ? Math.max(0, r.top) : e.scroller.scrollTop;
          n = Math.floor(n - Vr(e));
          var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight,
            o = tt(t, n),
            l = tt(t, i);
          if (r && r.ensure) {
            var s = r.ensure.from.line,
              a = r.ensure.to.line;
            s < o
              ? ((o = s), (l = tt(t, ir(qe(t, s)) + e.wrapper.clientHeight)))
              : Math.min(a, t.lastLine()) >= l &&
                ((o = tt(t, ir(qe(t, a)) - e.wrapper.clientHeight)), (l = a));
          }
          return { from: o, to: Math.max(l, o + 1) };
        }
        function ti(e, t) {
          if (!ye(e, "scrollCursorIntoView")) {
            var r = e.display,
              n = r.sizer.getBoundingClientRect(),
              i = null;
            if (
              (t.top + n.top < 0
                ? (i = !0)
                : t.bottom + n.top >
                    (window.innerHeight ||
                      document.documentElement.clientHeight) && (i = !1),
              null != i && !p)
            ) {
              var o = O(
                "div",
                "\u200b",
                null,
                "position: absolute;\n                         top: " +
                  (t.top - r.viewOffset - Vr(e.display)) +
                  "px;\n                         height: " +
                  (t.bottom - t.top + Xr(e) + r.barHeight) +
                  "px;\n                         left: " +
                  t.left +
                  "px; width: " +
                  Math.max(2, t.right - t.left) +
                  "px;"
              );
              e.display.lineSpace.appendChild(o),
                o.scrollIntoView(i),
                e.display.lineSpace.removeChild(o);
            }
          }
        }
        function ri(e, t, r, n) {
          var i;
          null == n && (n = 0),
            e.options.lineWrapping ||
              t != r ||
              ((r = "before" == t.sticky ? it(t.line, t.ch + 1, "before") : t),
              (t = t.ch
                ? it(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after")
                : t));
          for (var o = 0; o < 5; o++) {
            var l = !1,
              s = yn(e, t),
              a = r && r != t ? yn(e, r) : s,
              u = ii(
                e,
                (i = {
                  left: Math.min(s.left, a.left),
                  top: Math.min(s.top, a.top) - n,
                  right: Math.max(s.left, a.left),
                  bottom: Math.max(s.bottom, a.bottom) + n,
                })
              ),
              c = e.doc.scrollTop,
              h = e.doc.scrollLeft;
            if (
              (null != u.scrollTop &&
                (hi(e, u.scrollTop),
                Math.abs(e.doc.scrollTop - c) > 1 && (l = !0)),
              null != u.scrollLeft &&
                (di(e, u.scrollLeft),
                Math.abs(e.doc.scrollLeft - h) > 1 && (l = !0)),
              !l)
            )
              break;
          }
          return i;
        }
        function ni(e, t) {
          var r = ii(e, t);
          null != r.scrollTop && hi(e, r.scrollTop),
            null != r.scrollLeft && di(e, r.scrollLeft);
        }
        function ii(e, t) {
          var r = e.display,
            n = Nn(e.display);
          t.top < 0 && (t.top = 0);
          var i =
              e.curOp && null != e.curOp.scrollTop
                ? e.curOp.scrollTop
                : r.scroller.scrollTop,
            o = _r(e),
            l = {};
          t.bottom - t.top > o && (t.bottom = t.top + o);
          var s = e.doc.height + Kr(r),
            a = t.top < n,
            u = t.bottom > s - n;
          if (t.top < i) l.scrollTop = a ? 0 : t.top;
          else if (t.bottom > i + o) {
            var c = Math.min(t.top, (u ? s : t.bottom) - o);
            c != i && (l.scrollTop = c);
          }
          var h = e.options.fixedGutter ? 0 : r.gutters.offsetWidth,
            f =
              e.curOp && null != e.curOp.scrollLeft
                ? e.curOp.scrollLeft
                : r.scroller.scrollLeft - h,
            d = Yr(e) - r.gutters.offsetWidth,
            p = t.right - t.left > d;
          return (
            p && (t.right = t.left + d),
            t.left < 10
              ? (l.scrollLeft = 0)
              : t.left < f
              ? (l.scrollLeft = Math.max(0, t.left + h - (p ? 0 : 10)))
              : t.right > d + f - 3 &&
                (l.scrollLeft = t.right + (p ? 0 : 10) - d),
            l
          );
        }
        function oi(e, t) {
          null != t &&
            (ui(e),
            (e.curOp.scrollTop =
              (null == e.curOp.scrollTop
                ? e.doc.scrollTop
                : e.curOp.scrollTop) + t));
        }
        function li(e) {
          ui(e);
          var t = e.getCursor();
          e.curOp.scrollToPos = {
            from: t,
            to: t,
            margin: e.options.cursorScrollMargin,
          };
        }
        function si(e, t, r) {
          (null == t && null == r) || ui(e),
            null != t && (e.curOp.scrollLeft = t),
            null != r && (e.curOp.scrollTop = r);
        }
        function ai(e, t) {
          ui(e), (e.curOp.scrollToPos = t);
        }
        function ui(e) {
          var t = e.curOp.scrollToPos;
          t &&
            ((e.curOp.scrollToPos = null),
            ci(e, bn(e, t.from), bn(e, t.to), t.margin));
        }
        function ci(e, t, r, n) {
          var i = ii(e, {
            left: Math.min(t.left, r.left),
            top: Math.min(t.top, r.top) - n,
            right: Math.max(t.right, r.right),
            bottom: Math.max(t.bottom, r.bottom) + n,
          });
          si(e, i.scrollLeft, i.scrollTop);
        }
        function hi(e, t) {
          Math.abs(e.doc.scrollTop - t) < 2 ||
            (r || Ui(e, { top: t }), fi(e, t, !0), r && Ui(e), Fi(e, 100));
        }
        function fi(e, t, r) {
          (t = Math.max(
            0,
            Math.min(
              e.display.scroller.scrollHeight - e.display.scroller.clientHeight,
              t
            )
          )),
            (e.display.scroller.scrollTop != t || r) &&
              ((e.doc.scrollTop = t),
              e.display.scrollbars.setScrollTop(t),
              e.display.scroller.scrollTop != t &&
                (e.display.scroller.scrollTop = t));
        }
        function di(e, t, r, n) {
          (t = Math.max(
            0,
            Math.min(
              t,
              e.display.scroller.scrollWidth - e.display.scroller.clientWidth
            )
          )),
            ((r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) &&
              !n) ||
              ((e.doc.scrollLeft = t),
              Xi(e),
              e.display.scroller.scrollLeft != t &&
                (e.display.scroller.scrollLeft = t),
              e.display.scrollbars.setScrollLeft(t));
        }
        function pi(e) {
          var t = e.display,
            r = t.gutters.offsetWidth,
            n = Math.round(e.doc.height + Kr(e.display));
          return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? r : 0,
            docHeight: n,
            scrollHeight: n + Xr(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: r,
          };
        }
        var gi = function (e, t, r) {
          this.cm = r;
          var n = (this.vert = O(
              "div",
              [O("div", null, null, "min-width: 1px")],
              "CodeMirror-vscrollbar"
            )),
            i = (this.horiz = O(
              "div",
              [O("div", null, null, "height: 100%; min-height: 1px")],
              "CodeMirror-hscrollbar"
            ));
          (n.tabIndex = i.tabIndex = -1),
            e(n),
            e(i),
            pe(n, "scroll", function () {
              n.clientHeight && t(n.scrollTop, "vertical");
            }),
            pe(i, "scroll", function () {
              i.clientWidth && t(i.scrollLeft, "horizontal");
            }),
            (this.checkedZeroWidth = !1),
            l &&
              s < 8 &&
              (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
        };
        (gi.prototype.update = function (e) {
          var t = e.scrollWidth > e.clientWidth + 1,
            r = e.scrollHeight > e.clientHeight + 1,
            n = e.nativeBarWidth;
          if (r) {
            (this.vert.style.display = "block"),
              (this.vert.style.bottom = t ? n + "px" : "0");
            var i = e.viewHeight - (t ? n : 0);
            this.vert.firstChild.style.height =
              Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
          } else
            (this.vert.style.display = ""),
              (this.vert.firstChild.style.height = "0");
          if (t) {
            (this.horiz.style.display = "block"),
              (this.horiz.style.right = r ? n + "px" : "0"),
              (this.horiz.style.left = e.barLeft + "px");
            var o = e.viewWidth - e.barLeft - (r ? n : 0);
            this.horiz.firstChild.style.width =
              Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
          } else
            (this.horiz.style.display = ""),
              (this.horiz.firstChild.style.width = "0");
          return (
            !this.checkedZeroWidth &&
              e.clientHeight > 0 &&
              (0 == n && this.zeroWidthHack(), (this.checkedZeroWidth = !0)),
            { right: r ? n : 0, bottom: t ? n : 0 }
          );
        }),
          (gi.prototype.setScrollLeft = function (e) {
            this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e),
              this.disableHoriz &&
                this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
          }),
          (gi.prototype.setScrollTop = function (e) {
            this.vert.scrollTop != e && (this.vert.scrollTop = e),
              this.disableVert &&
                this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
          }),
          (gi.prototype.zeroWidthHack = function () {
            var e = y && !d ? "12px" : "18px";
            (this.horiz.style.height = this.vert.style.width = e),
              (this.horiz.style.pointerEvents = this.vert.style.pointerEvents =
                "none"),
              (this.disableHoriz = new z()),
              (this.disableVert = new z());
          }),
          (gi.prototype.enableZeroWidthBar = function (e, t, r) {
            function n() {
              var i = e.getBoundingClientRect();
              ("vert" == r
                ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2)
                : document.elementFromPoint(
                    (i.right + i.left) / 2,
                    i.bottom - 1
                  )) != e
                ? (e.style.pointerEvents = "none")
                : t.set(1e3, n);
            }
            (e.style.pointerEvents = "auto"), t.set(1e3, n);
          }),
          (gi.prototype.clear = function () {
            var e = this.horiz.parentNode;
            e.removeChild(this.horiz), e.removeChild(this.vert);
          });
        var vi = function () {};
        function mi(e, t) {
          t || (t = pi(e));
          var r = e.display.barWidth,
            n = e.display.barHeight;
          yi(e, t);
          for (
            var i = 0;
            (i < 4 && r != e.display.barWidth) || n != e.display.barHeight;
            i++
          )
            r != e.display.barWidth && e.options.lineWrapping && Qn(e),
              yi(e, pi(e)),
              (r = e.display.barWidth),
              (n = e.display.barHeight);
        }
        function yi(e, t) {
          var r = e.display,
            n = r.scrollbars.update(t);
          (r.sizer.style.paddingRight = (r.barWidth = n.right) + "px"),
            (r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px"),
            (r.heightForcer.style.borderBottom =
              n.bottom + "px solid transparent"),
            n.right && n.bottom
              ? ((r.scrollbarFiller.style.display = "block"),
                (r.scrollbarFiller.style.height = n.bottom + "px"),
                (r.scrollbarFiller.style.width = n.right + "px"))
              : (r.scrollbarFiller.style.display = ""),
            n.bottom &&
            e.options.coverGutterNextToScrollbar &&
            e.options.fixedGutter
              ? ((r.gutterFiller.style.display = "block"),
                (r.gutterFiller.style.height = n.bottom + "px"),
                (r.gutterFiller.style.width = t.gutterWidth + "px"))
              : (r.gutterFiller.style.display = "");
        }
        (vi.prototype.update = function () {
          return { bottom: 0, right: 0 };
        }),
          (vi.prototype.setScrollLeft = function () {}),
          (vi.prototype.setScrollTop = function () {}),
          (vi.prototype.clear = function () {});
        var bi = { native: gi, null: vi };
        function wi(e) {
          e.display.scrollbars &&
            (e.display.scrollbars.clear(),
            e.display.scrollbars.addClass &&
              T(e.display.wrapper, e.display.scrollbars.addClass)),
            (e.display.scrollbars = new bi[e.options.scrollbarStyle](
              function (t) {
                e.display.wrapper.insertBefore(t, e.display.scrollbarFiller),
                  pe(t, "mousedown", function () {
                    e.state.focused &&
                      setTimeout(function () {
                        return e.display.input.focus();
                      }, 0);
                  }),
                  t.setAttribute("cm-not-content", "true");
              },
              function (t, r) {
                "horizontal" == r ? di(e, t) : hi(e, t);
              },
              e
            )),
            e.display.scrollbars.addClass &&
              H(e.display.wrapper, e.display.scrollbars.addClass);
        }
        var xi = 0;
        function Ci(e) {
          (e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: 0,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++xi,
            markArrays: null,
          }),
            Sr(e.curOp);
        }
        function Si(e) {
          var t = e.curOp;
          t &&
            kr(t, function (e) {
              for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
              Li(e);
            });
        }
        function Li(e) {
          for (var t = e.ops, r = 0; r < t.length; r++) ki(t[r]);
          for (var n = 0; n < t.length; n++) Ti(t[n]);
          for (var i = 0; i < t.length; i++) Mi(t[i]);
          for (var o = 0; o < t.length; o++) Ni(t[o]);
          for (var l = 0; l < t.length; l++) Oi(t[l]);
        }
        function ki(e) {
          var t = e.cm,
            r = t.display;
          Ii(t),
            e.updateMaxLine && lr(t),
            (e.mustUpdate =
              e.viewChanged ||
              e.forceUpdate ||
              null != e.scrollTop ||
              (e.scrollToPos &&
                (e.scrollToPos.from.line < r.viewFrom ||
                  e.scrollToPos.to.line >= r.viewTo)) ||
              (r.maxLineChanged && t.options.lineWrapping)),
            (e.update =
              e.mustUpdate &&
              new Pi(
                t,
                e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos },
                e.forceUpdate
              ));
        }
        function Ti(e) {
          e.updatedDisplay = e.mustUpdate && Bi(e.cm, e.update);
        }
        function Mi(e) {
          var t = e.cm,
            r = t.display;
          e.updatedDisplay && Qn(t),
            (e.barMeasure = pi(t)),
            r.maxLineChanged &&
              !t.options.lineWrapping &&
              ((e.adjustWidthTo =
                Qr(t, r.maxLine, r.maxLine.text.length).left + 3),
              (t.display.sizerWidth = e.adjustWidthTo),
              (e.barMeasure.scrollWidth = Math.max(
                r.scroller.clientWidth,
                r.sizer.offsetLeft +
                  e.adjustWidthTo +
                  Xr(t) +
                  t.display.barWidth
              )),
              (e.maxScrollLeft = Math.max(
                0,
                r.sizer.offsetLeft + e.adjustWidthTo - Yr(t)
              ))),
            (e.updatedDisplay || e.selectionChanged) &&
              (e.preparedSelection = r.input.prepareSelection());
        }
        function Ni(e) {
          var t = e.cm;
          null != e.adjustWidthTo &&
            ((t.display.sizer.style.minWidth = e.adjustWidthTo + "px"),
            e.maxScrollLeft < t.doc.scrollLeft &&
              di(
                t,
                Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft),
                !0
              ),
            (t.display.maxLineChanged = !1));
          var r = e.focus && e.focus == W();
          e.preparedSelection &&
            t.display.input.showSelection(e.preparedSelection, r),
            (e.updatedDisplay || e.startHeight != t.doc.height) &&
              mi(t, e.barMeasure),
            e.updatedDisplay && ji(t, e.barMeasure),
            e.selectionChanged && Yn(t),
            t.state.focused && e.updateInput && t.display.input.reset(e.typing),
            r && _n(e.cm);
        }
        function Oi(e) {
          var t = e.cm,
            r = t.display,
            n = t.doc;
          e.updatedDisplay && Gi(t, e.update),
            null == r.wheelStartX ||
              (null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos) ||
              (r.wheelStartX = r.wheelStartY = null),
            null != e.scrollTop && fi(t, e.scrollTop, e.forceScroll),
            null != e.scrollLeft && di(t, e.scrollLeft, !0, !0),
            e.scrollToPos &&
              ti(
                t,
                ri(
                  t,
                  ht(n, e.scrollToPos.from),
                  ht(n, e.scrollToPos.to),
                  e.scrollToPos.margin
                )
              );
          var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers;
          if (i)
            for (var l = 0; l < i.length; ++l)
              i[l].lines.length || me(i[l], "hide");
          if (o)
            for (var s = 0; s < o.length; ++s)
              o[s].lines.length && me(o[s], "unhide");
          r.wrapper.offsetHeight &&
            (n.scrollTop = t.display.scroller.scrollTop),
            e.changeObjs && me(t, "changes", t, e.changeObjs),
            e.update && e.update.finish();
        }
        function Ai(e, t) {
          if (e.curOp) return t();
          Ci(e);
          try {
            return t();
          } finally {
            Si(e);
          }
        }
        function Di(e, t) {
          return function () {
            if (e.curOp) return t.apply(e, arguments);
            Ci(e);
            try {
              return t.apply(e, arguments);
            } finally {
              Si(e);
            }
          };
        }
        function Wi(e) {
          return function () {
            if (this.curOp) return e.apply(this, arguments);
            Ci(this);
            try {
              return e.apply(this, arguments);
            } finally {
              Si(this);
            }
          };
        }
        function Hi(e) {
          return function () {
            var t = this.cm;
            if (!t || t.curOp) return e.apply(this, arguments);
            Ci(t);
            try {
              return e.apply(this, arguments);
            } finally {
              Si(t);
            }
          };
        }
        function Fi(e, t) {
          e.doc.highlightFrontier < e.display.viewTo &&
            e.state.highlight.set(t, P(Ei, e));
        }
        function Ei(e) {
          var t = e.doc;
          if (!(t.highlightFrontier >= e.display.viewTo)) {
            var r = +new Date() + e.options.workTime,
              n = yt(e, t.highlightFrontier),
              i = [];
            t.iter(
              n.line,
              Math.min(t.first + t.size, e.display.viewTo + 500),
              function (o) {
                if (n.line >= e.display.viewFrom) {
                  var l = o.styles,
                    s =
                      o.text.length > e.options.maxHighlightLength
                        ? Xe(t.mode, n.state)
                        : null,
                    a = vt(e, o, n, !0);
                  s && (n.state = s), (o.styles = a.styles);
                  var u = o.styleClasses,
                    c = a.classes;
                  c ? (o.styleClasses = c) : u && (o.styleClasses = null);
                  for (
                    var h =
                        !l ||
                        l.length != o.styles.length ||
                        (u != c &&
                          (!u ||
                            !c ||
                            u.bgClass != c.bgClass ||
                            u.textClass != c.textClass)),
                      f = 0;
                    !h && f < l.length;
                    ++f
                  )
                    h = l[f] != o.styles[f];
                  h && i.push(n.line), (o.stateAfter = n.save()), n.nextLine();
                } else
                  o.text.length <= e.options.maxHighlightLength &&
                    bt(e, o.text, n),
                    (o.stateAfter = n.line % 5 == 0 ? n.save() : null),
                    n.nextLine();
                if (+new Date() > r) return Fi(e, e.options.workDelay), !0;
              }
            ),
              (t.highlightFrontier = n.line),
              (t.modeFrontier = Math.max(t.modeFrontier, n.line)),
              i.length &&
                Ai(e, function () {
                  for (var t = 0; t < i.length; t++) In(e, i[t], "text");
                });
          }
        }
        var Pi = function (e, t, r) {
          var n = e.display;
          (this.viewport = t),
            (this.visible = ei(n, e.doc, t)),
            (this.editorIsHidden = !n.wrapper.offsetWidth),
            (this.wrapperHeight = n.wrapper.clientHeight),
            (this.wrapperWidth = n.wrapper.clientWidth),
            (this.oldDisplayWidth = Yr(e)),
            (this.force = r),
            (this.dims = An(e)),
            (this.events = []);
        };
        function Ii(e) {
          var t = e.display;
          !t.scrollbarsClipped &&
            t.scroller.offsetWidth &&
            ((t.nativeBarWidth =
              t.scroller.offsetWidth - t.scroller.clientWidth),
            (t.heightForcer.style.height = Xr(e) + "px"),
            (t.sizer.style.marginBottom = -t.nativeBarWidth + "px"),
            (t.sizer.style.borderRightWidth = Xr(e) + "px"),
            (t.scrollbarsClipped = !0));
        }
        function Ri(e) {
          if (e.hasFocus()) return null;
          var t = W();
          if (!t || !D(e.display.lineDiv, t)) return null;
          var r = { activeElt: t };
          if (window.getSelection) {
            var n = window.getSelection();
            n.anchorNode &&
              n.extend &&
              D(e.display.lineDiv, n.anchorNode) &&
              ((r.anchorNode = n.anchorNode),
              (r.anchorOffset = n.anchorOffset),
              (r.focusNode = n.focusNode),
              (r.focusOffset = n.focusOffset));
          }
          return r;
        }
        function zi(e) {
          if (
            e &&
            e.activeElt &&
            e.activeElt != W() &&
            (e.activeElt.focus(),
            !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) &&
              e.anchorNode &&
              D(document.body, e.anchorNode) &&
              D(document.body, e.focusNode))
          ) {
            var t = window.getSelection(),
              r = document.createRange();
            r.setEnd(e.anchorNode, e.anchorOffset),
              r.collapse(!1),
              t.removeAllRanges(),
              t.addRange(r),
              t.extend(e.focusNode, e.focusOffset);
          }
        }
        function Bi(e, t) {
          var r = e.display,
            n = e.doc;
          if (t.editorIsHidden) return Rn(e), !1;
          if (
            !t.force &&
            t.visible.from >= r.viewFrom &&
            t.visible.to <= r.viewTo &&
            (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) &&
            r.renderedView == r.view &&
            0 == Gn(e)
          )
            return !1;
          Yi(e) && (Rn(e), (t.dims = An(e)));
          var i = n.first + n.size,
            o = Math.max(t.visible.from - e.options.viewportMargin, n.first),
            l = Math.min(i, t.visible.to + e.options.viewportMargin);
          r.viewFrom < o &&
            o - r.viewFrom < 20 &&
            (o = Math.max(n.first, r.viewFrom)),
            r.viewTo > l && r.viewTo - l < 20 && (l = Math.min(i, r.viewTo)),
            Ot && ((o = er(e.doc, o)), (l = tr(e.doc, l)));
          var s =
            o != r.viewFrom ||
            l != r.viewTo ||
            r.lastWrapHeight != t.wrapperHeight ||
            r.lastWrapWidth != t.wrapperWidth;
          Bn(e, o, l),
            (r.viewOffset = ir(qe(e.doc, r.viewFrom))),
            (e.display.mover.style.top = r.viewOffset + "px");
          var a = Gn(e);
          if (
            !s &&
            0 == a &&
            !t.force &&
            r.renderedView == r.view &&
            (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)
          )
            return !1;
          var u = Ri(e);
          return (
            a > 4 && (r.lineDiv.style.display = "none"),
            Vi(e, r.updateLineNumbers, t.dims),
            a > 4 && (r.lineDiv.style.display = ""),
            (r.renderedView = r.view),
            zi(u),
            M(r.cursorDiv),
            M(r.selectionDiv),
            (r.gutters.style.height = r.sizer.style.minHeight = 0),
            s &&
              ((r.lastWrapHeight = t.wrapperHeight),
              (r.lastWrapWidth = t.wrapperWidth),
              Fi(e, 400)),
            (r.updateLineNumbers = null),
            !0
          );
        }
        function Gi(e, t) {
          for (var r = t.viewport, n = !0; ; n = !1) {
            if (n && e.options.lineWrapping && t.oldDisplayWidth != Yr(e))
              n && (t.visible = ei(e.display, e.doc, r));
            else if (
              (r &&
                null != r.top &&
                (r = {
                  top: Math.min(e.doc.height + Kr(e.display) - _r(e), r.top),
                }),
              (t.visible = ei(e.display, e.doc, r)),
              t.visible.from >= e.display.viewFrom &&
                t.visible.to <= e.display.viewTo)
            )
              break;
            if (!Bi(e, t)) break;
            Qn(e);
            var i = pi(e);
            Un(e), mi(e, i), ji(e, i), (t.force = !1);
          }
          t.signal(e, "update", e),
            (e.display.viewFrom == e.display.reportedViewFrom &&
              e.display.viewTo == e.display.reportedViewTo) ||
              (t.signal(
                e,
                "viewportChange",
                e,
                e.display.viewFrom,
                e.display.viewTo
              ),
              (e.display.reportedViewFrom = e.display.viewFrom),
              (e.display.reportedViewTo = e.display.viewTo));
        }
        function Ui(e, t) {
          var r = new Pi(e, t);
          if (Bi(e, r)) {
            Qn(e), Gi(e, r);
            var n = pi(e);
            Un(e), mi(e, n), ji(e, n), r.finish();
          }
        }
        function Vi(e, t, r) {
          var n = e.display,
            i = e.options.lineNumbers,
            o = n.lineDiv,
            l = o.firstChild;
          function s(t) {
            var r = t.nextSibling;
            return (
              a && y && e.display.currentWheelTarget == t
                ? (t.style.display = "none")
                : t.parentNode.removeChild(t),
              r
            );
          }
          for (var u = n.view, c = n.viewFrom, h = 0; h < u.length; h++) {
            var f = u[h];
            if (f.hidden);
            else if (f.node && f.node.parentNode == o) {
              for (; l != f.node; ) l = s(l);
              var d = i && null != t && t <= c && f.lineNumber;
              f.changes &&
                (B(f.changes, "gutter") > -1 && (d = !1), Or(e, f, c, r)),
                d &&
                  (M(f.lineNumber),
                  f.lineNumber.appendChild(
                    document.createTextNode(nt(e.options, c))
                  )),
                (l = f.node.nextSibling);
            } else {
              var p = Ir(e, f, c, r);
              o.insertBefore(p, l);
            }
            c += f.size;
          }
          for (; l; ) l = s(l);
        }
        function Ki(e) {
          var t = e.gutters.offsetWidth;
          (e.sizer.style.marginLeft = t + "px"), Mr(e, "gutterChanged", e);
        }
        function ji(e, t) {
          (e.display.sizer.style.minHeight = t.docHeight + "px"),
            (e.display.heightForcer.style.top = t.docHeight + "px"),
            (e.display.gutters.style.height =
              t.docHeight + e.display.barHeight + Xr(e) + "px");
        }
        function Xi(e) {
          var t = e.display,
            r = t.view;
          if (
            t.alignWidgets ||
            (t.gutters.firstChild && e.options.fixedGutter)
          ) {
            for (
              var n = Dn(t) - t.scroller.scrollLeft + e.doc.scrollLeft,
                i = t.gutters.offsetWidth,
                o = n + "px",
                l = 0;
              l < r.length;
              l++
            )
              if (!r[l].hidden) {
                e.options.fixedGutter &&
                  (r[l].gutter && (r[l].gutter.style.left = o),
                  r[l].gutterBackground &&
                    (r[l].gutterBackground.style.left = o));
                var s = r[l].alignable;
                if (s) for (var a = 0; a < s.length; a++) s[a].style.left = o;
              }
            e.options.fixedGutter && (t.gutters.style.left = n + i + "px");
          }
        }
        function Yi(e) {
          if (!e.options.lineNumbers) return !1;
          var t = e.doc,
            r = nt(e.options, t.first + t.size - 1),
            n = e.display;
          if (r.length != n.lineNumChars) {
            var i = n.measure.appendChild(
                O(
                  "div",
                  [O("div", r)],
                  "CodeMirror-linenumber CodeMirror-gutter-elt"
                )
              ),
              o = i.firstChild.offsetWidth,
              l = i.offsetWidth - o;
            return (
              (n.lineGutter.style.width = ""),
              (n.lineNumInnerWidth =
                Math.max(o, n.lineGutter.offsetWidth - l) + 1),
              (n.lineNumWidth = n.lineNumInnerWidth + l),
              (n.lineNumChars = n.lineNumInnerWidth ? r.length : -1),
              (n.lineGutter.style.width = n.lineNumWidth + "px"),
              Ki(e.display),
              !0
            );
          }
          return !1;
        }
        function _i(e, t) {
          for (var r = [], n = !1, i = 0; i < e.length; i++) {
            var o = e[i],
              l = null;
            if (
              ("string" != typeof o && ((l = o.style), (o = o.className)),
              "CodeMirror-linenumbers" == o)
            ) {
              if (!t) continue;
              n = !0;
            }
            r.push({ className: o, style: l });
          }
          return (
            t &&
              !n &&
              r.push({ className: "CodeMirror-linenumbers", style: null }),
            r
          );
        }
        function $i(e) {
          var t = e.gutters,
            r = e.gutterSpecs;
          M(t), (e.lineGutter = null);
          for (var n = 0; n < r.length; ++n) {
            var i = r[n],
              o = i.className,
              l = i.style,
              s = t.appendChild(O("div", null, "CodeMirror-gutter " + o));
            l && (s.style.cssText = l),
              "CodeMirror-linenumbers" == o &&
                ((e.lineGutter = s),
                (s.style.width = (e.lineNumWidth || 1) + "px"));
          }
          (t.style.display = r.length ? "" : "none"), Ki(e);
        }
        function qi(e) {
          $i(e.display), Pn(e), Xi(e);
        }
        function Zi(e, t, n, i) {
          var o = this;
          (this.input = n),
            (o.scrollbarFiller = O("div", null, "CodeMirror-scrollbar-filler")),
            o.scrollbarFiller.setAttribute("cm-not-content", "true"),
            (o.gutterFiller = O("div", null, "CodeMirror-gutter-filler")),
            o.gutterFiller.setAttribute("cm-not-content", "true"),
            (o.lineDiv = A("div", null, "CodeMirror-code")),
            (o.selectionDiv = O(
              "div",
              null,
              null,
              "position: relative; z-index: 1"
            )),
            (o.cursorDiv = O("div", null, "CodeMirror-cursors")),
            (o.measure = O("div", null, "CodeMirror-measure")),
            (o.lineMeasure = O("div", null, "CodeMirror-measure")),
            (o.lineSpace = A(
              "div",
              [
                o.measure,
                o.lineMeasure,
                o.selectionDiv,
                o.cursorDiv,
                o.lineDiv,
              ],
              null,
              "position: relative; outline: none"
            ));
          var u = A("div", [o.lineSpace], "CodeMirror-lines");
          (o.mover = O("div", [u], null, "position: relative")),
            (o.sizer = O("div", [o.mover], "CodeMirror-sizer")),
            (o.sizerWidth = null),
            (o.heightForcer = O(
              "div",
              null,
              null,
              "position: absolute; height: " + G + "px; width: 1px;"
            )),
            (o.gutters = O("div", null, "CodeMirror-gutters")),
            (o.lineGutter = null),
            (o.scroller = O(
              "div",
              [o.sizer, o.heightForcer, o.gutters],
              "CodeMirror-scroll"
            )),
            o.scroller.setAttribute("tabIndex", "-1"),
            (o.wrapper = O(
              "div",
              [o.scrollbarFiller, o.gutterFiller, o.scroller],
              "CodeMirror"
            )),
            o.wrapper.setAttribute("translate", "no"),
            l &&
              s < 8 &&
              ((o.gutters.style.zIndex = -1),
              (o.scroller.style.paddingRight = 0)),
            a || (r && m) || (o.scroller.draggable = !0),
            e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)),
            (o.viewFrom = o.viewTo = t.first),
            (o.reportedViewFrom = o.reportedViewTo = t.first),
            (o.view = []),
            (o.renderedView = null),
            (o.externalMeasured = null),
            (o.viewOffset = 0),
            (o.lastWrapHeight = o.lastWrapWidth = 0),
            (o.updateLineNumbers = null),
            (o.nativeBarWidth = o.barHeight = o.barWidth = 0),
            (o.scrollbarsClipped = !1),
            (o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null),
            (o.alignWidgets = !1),
            (o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null),
            (o.maxLine = null),
            (o.maxLineLength = 0),
            (o.maxLineChanged = !1),
            (o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null),
            (o.shift = !1),
            (o.selForContextMenu = null),
            (o.activeTouch = null),
            (o.gutterSpecs = _i(i.gutters, i.lineNumbers)),
            $i(o),
            n.init(o);
        }
        (Pi.prototype.signal = function (e, t) {
          we(e, t) && this.events.push(arguments);
        }),
          (Pi.prototype.finish = function () {
            for (var e = 0; e < this.events.length; e++)
              me.apply(null, this.events[e]);
          });
        var Qi = 0,
          Ji = null;
        function eo(e) {
          var t = e.wheelDeltaX,
            r = e.wheelDeltaY;
          return (
            null == t &&
              e.detail &&
              e.axis == e.HORIZONTAL_AXIS &&
              (t = e.detail),
            null == r && e.detail && e.axis == e.VERTICAL_AXIS
              ? (r = e.detail)
              : null == r && (r = e.wheelDelta),
            { x: t, y: r }
          );
        }
        function to(e) {
          var t = eo(e);
          return (t.x *= Ji), (t.y *= Ji), t;
        }
        function ro(e, t) {
          var n = eo(t),
            i = n.x,
            o = n.y,
            l = Ji;
          0 === t.deltaMode && ((i = t.deltaX), (o = t.deltaY), (l = 1));
          var s = e.display,
            u = s.scroller,
            c = u.scrollWidth > u.clientWidth,
            f = u.scrollHeight > u.clientHeight;
          if ((i && c) || (o && f)) {
            if (o && y && a)
              e: for (var d = t.target, p = s.view; d != u; d = d.parentNode)
                for (var g = 0; g < p.length; g++)
                  if (p[g].node == d) {
                    e.display.currentWheelTarget = d;
                    break e;
                  }
            if (i && !r && !h && null != l)
              return (
                o && f && hi(e, Math.max(0, u.scrollTop + o * l)),
                di(e, Math.max(0, u.scrollLeft + i * l)),
                (!o || (o && f)) && Ce(t),
                void (s.wheelStartX = null)
              );
            if (o && null != l) {
              var v = o * l,
                m = e.doc.scrollTop,
                b = m + s.wrapper.clientHeight;
              v < 0
                ? (m = Math.max(0, m + v - 50))
                : (b = Math.min(e.doc.height, b + v + 50)),
                Ui(e, { top: m, bottom: b });
            }
            Qi < 20 &&
              0 !== t.deltaMode &&
              (null == s.wheelStartX
                ? ((s.wheelStartX = u.scrollLeft),
                  (s.wheelStartY = u.scrollTop),
                  (s.wheelDX = i),
                  (s.wheelDY = o),
                  setTimeout(function () {
                    if (null != s.wheelStartX) {
                      var e = u.scrollLeft - s.wheelStartX,
                        t = u.scrollTop - s.wheelStartY,
                        r =
                          (t && s.wheelDY && t / s.wheelDY) ||
                          (e && s.wheelDX && e / s.wheelDX);
                      (s.wheelStartX = s.wheelStartY = null),
                        r && ((Ji = (Ji * Qi + r) / (Qi + 1)), ++Qi);
                    }
                  }, 200))
                : ((s.wheelDX += i), (s.wheelDY += o)));
          }
        }
        l ? (Ji = -0.53) : r ? (Ji = 15) : c ? (Ji = -0.7) : f && (Ji = -1 / 3);
        var no = function (e, t) {
          (this.ranges = e), (this.primIndex = t);
        };
        (no.prototype.primary = function () {
          return this.ranges[this.primIndex];
        }),
          (no.prototype.equals = function (e) {
            if (e == this) return !0;
            if (
              e.primIndex != this.primIndex ||
              e.ranges.length != this.ranges.length
            )
              return !1;
            for (var t = 0; t < this.ranges.length; t++) {
              var r = this.ranges[t],
                n = e.ranges[t];
              if (!lt(r.anchor, n.anchor) || !lt(r.head, n.head)) return !1;
            }
            return !0;
          }),
          (no.prototype.deepCopy = function () {
            for (var e = [], t = 0; t < this.ranges.length; t++)
              e[t] = new io(st(this.ranges[t].anchor), st(this.ranges[t].head));
            return new no(e, this.primIndex);
          }),
          (no.prototype.somethingSelected = function () {
            for (var e = 0; e < this.ranges.length; e++)
              if (!this.ranges[e].empty()) return !0;
            return !1;
          }),
          (no.prototype.contains = function (e, t) {
            t || (t = e);
            for (var r = 0; r < this.ranges.length; r++) {
              var n = this.ranges[r];
              if (ot(t, n.from()) >= 0 && ot(e, n.to()) <= 0) return r;
            }
            return -1;
          });
        var io = function (e, t) {
          (this.anchor = e), (this.head = t);
        };
        function oo(e, t, r) {
          var n = e && e.options.selectionsMayTouch,
            i = t[r];
          t.sort(function (e, t) {
            return ot(e.from(), t.from());
          }),
            (r = B(t, i));
          for (var o = 1; o < t.length; o++) {
            var l = t[o],
              s = t[o - 1],
              a = ot(s.to(), l.from());
            if (n && !l.empty() ? a > 0 : a >= 0) {
              var u = ut(s.from(), l.from()),
                c = at(s.to(), l.to()),
                h = s.empty() ? l.from() == l.head : s.from() == s.head;
              o <= r && --r, t.splice(--o, 2, new io(h ? c : u, h ? u : c));
            }
          }
          return new no(t, r);
        }
        function lo(e, t) {
          return new no([new io(e, t || e)], 0);
        }
        function so(e) {
          return e.text
            ? it(
                e.from.line + e.text.length - 1,
                $(e.text).length + (1 == e.text.length ? e.from.ch : 0)
              )
            : e.to;
        }
        function ao(e, t) {
          if (ot(e, t.from) < 0) return e;
          if (ot(e, t.to) <= 0) return so(t);
          var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            n = e.ch;
          return e.line == t.to.line && (n += so(t).ch - t.to.ch), it(r, n);
        }
        function uo(e, t) {
          for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
            var i = e.sel.ranges[n];
            r.push(new io(ao(i.anchor, t), ao(i.head, t)));
          }
          return oo(e.cm, r, e.sel.primIndex);
        }
        function co(e, t, r) {
          return e.line == t.line
            ? it(r.line, e.ch - t.ch + r.ch)
            : it(r.line + (e.line - t.line), e.ch);
        }
        function ho(e, t, r) {
          for (
            var n = [], i = it(e.first, 0), o = i, l = 0;
            l < t.length;
            l++
          ) {
            var s = t[l],
              a = co(s.from, i, o),
              u = co(so(s), i, o);
            if (((i = s.to), (o = u), "around" == r)) {
              var c = e.sel.ranges[l],
                h = ot(c.head, c.anchor) < 0;
              n[l] = new io(h ? u : a, h ? a : u);
            } else n[l] = new io(a, a);
          }
          return new no(n, e.sel.primIndex);
        }
        function fo(e) {
          (e.doc.mode = Ve(e.options, e.doc.modeOption)), po(e);
        }
        function po(e) {
          e.doc.iter(function (e) {
            e.stateAfter && (e.stateAfter = null),
              e.styles && (e.styles = null);
          }),
            (e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first),
            Fi(e, 100),
            e.state.modeGen++,
            e.curOp && Pn(e);
        }
        function go(e, t) {
          return (
            0 == t.from.ch &&
            0 == t.to.ch &&
            "" == $(t.text) &&
            (!e.cm || e.cm.options.wholeLineUpdateBefore)
          );
        }
        function vo(e, t, r, n) {
          function i(e) {
            return r ? r[e] : null;
          }
          function o(e, r, i) {
            ar(e, r, i, n), Mr(e, "change", e, t);
          }
          function l(e, t) {
            for (var r = [], o = e; o < t; ++o) r.push(new sr(u[o], i(o), n));
            return r;
          }
          var s = t.from,
            a = t.to,
            u = t.text,
            c = qe(e, s.line),
            h = qe(e, a.line),
            f = $(u),
            d = i(u.length - 1),
            p = a.line - s.line;
          if (t.full)
            e.insert(0, l(0, u.length)), e.remove(u.length, e.size - u.length);
          else if (go(e, t)) {
            var g = l(0, u.length - 1);
            o(h, h.text, d),
              p && e.remove(s.line, p),
              g.length && e.insert(s.line, g);
          } else if (c == h)
            if (1 == u.length)
              o(c, c.text.slice(0, s.ch) + f + c.text.slice(a.ch), d);
            else {
              var v = l(1, u.length - 1);
              v.push(new sr(f + c.text.slice(a.ch), d, n)),
                o(c, c.text.slice(0, s.ch) + u[0], i(0)),
                e.insert(s.line + 1, v);
            }
          else if (1 == u.length)
            o(c, c.text.slice(0, s.ch) + u[0] + h.text.slice(a.ch), i(0)),
              e.remove(s.line + 1, p);
          else {
            o(c, c.text.slice(0, s.ch) + u[0], i(0)),
              o(h, f + h.text.slice(a.ch), d);
            var m = l(1, u.length - 1);
            p > 1 && e.remove(s.line + 1, p - 1), e.insert(s.line + 1, m);
          }
          Mr(e, "change", e, t);
        }
        function mo(e, t, r) {
          function n(e, i, o) {
            if (e.linked)
              for (var l = 0; l < e.linked.length; ++l) {
                var s = e.linked[l];
                if (s.doc != i) {
                  var a = o && s.sharedHist;
                  (r && !a) || (t(s.doc, a), n(s.doc, e, a));
                }
              }
          }
          n(e, null, !0);
        }
        function yo(e, t) {
          if (t.cm) throw new Error("This document is already in use.");
          (e.doc = t),
            (t.cm = e),
            Hn(e),
            fo(e),
            bo(e),
            (e.options.direction = t.direction),
            e.options.lineWrapping || lr(e),
            (e.options.mode = t.modeOption),
            Pn(e);
        }
        function bo(e) {
          ("rtl" == e.doc.direction ? H : T)(
            e.display.lineDiv,
            "CodeMirror-rtl"
          );
        }
        function wo(e) {
          Ai(e, function () {
            bo(e), Pn(e);
          });
        }
        function xo(e) {
          (this.done = []),
            (this.undone = []),
            (this.undoDepth = e ? e.undoDepth : 1 / 0),
            (this.lastModTime = this.lastSelTime = 0),
            (this.lastOp = this.lastSelOp = null),
            (this.lastOrigin = this.lastSelOrigin = null),
            (this.generation = this.maxGeneration = e ? e.maxGeneration : 1);
        }
        function Co(e, t) {
          var r = { from: st(t.from), to: so(t), text: Ze(e, t.from, t.to) };
          return (
            Oo(e, r, t.from.line, t.to.line + 1),
            mo(
              e,
              function (e) {
                return Oo(e, r, t.from.line, t.to.line + 1);
              },
              !0
            ),
            r
          );
        }
        function So(e) {
          for (; e.length && $(e).ranges; ) e.pop();
        }
        function Lo(e, t) {
          return t
            ? (So(e.done), $(e.done))
            : e.done.length && !$(e.done).ranges
            ? $(e.done)
            : e.done.length > 1 && !e.done[e.done.length - 2].ranges
            ? (e.done.pop(), $(e.done))
            : void 0;
        }
        function ko(e, t, r, n) {
          var i = e.history;
          i.undone.length = 0;
          var o,
            l,
            s = +new Date();
          if (
            (i.lastOp == n ||
              (i.lastOrigin == t.origin &&
                t.origin &&
                (("+" == t.origin.charAt(0) &&
                  i.lastModTime >
                    s - (e.cm ? e.cm.options.historyEventDelay : 500)) ||
                  "*" == t.origin.charAt(0)))) &&
            (o = Lo(i, i.lastOp == n))
          )
            (l = $(o.changes)),
              0 == ot(t.from, t.to) && 0 == ot(t.from, l.to)
                ? (l.to = so(t))
                : o.changes.push(Co(e, t));
          else {
            var a = $(i.done);
            for (
              (a && a.ranges) || No(e.sel, i.done),
                o = { changes: [Co(e, t)], generation: i.generation },
                i.done.push(o);
              i.done.length > i.undoDepth;

            )
              i.done.shift(), i.done[0].ranges || i.done.shift();
          }
          i.done.push(r),
            (i.generation = ++i.maxGeneration),
            (i.lastModTime = i.lastSelTime = s),
            (i.lastOp = i.lastSelOp = n),
            (i.lastOrigin = i.lastSelOrigin = t.origin),
            l || me(e, "historyAdded");
        }
        function To(e, t, r, n) {
          var i = t.charAt(0);
          return (
            "*" == i ||
            ("+" == i &&
              r.ranges.length == n.ranges.length &&
              r.somethingSelected() == n.somethingSelected() &&
              new Date() - e.history.lastSelTime <=
                (e.cm ? e.cm.options.historyEventDelay : 500))
          );
        }
        function Mo(e, t, r, n) {
          var i = e.history,
            o = n && n.origin;
          r == i.lastSelOp ||
          (o &&
            i.lastSelOrigin == o &&
            ((i.lastModTime == i.lastSelTime && i.lastOrigin == o) ||
              To(e, o, $(i.done), t)))
            ? (i.done[i.done.length - 1] = t)
            : No(t, i.done),
            (i.lastSelTime = +new Date()),
            (i.lastSelOrigin = o),
            (i.lastSelOp = r),
            n && !1 !== n.clearRedo && So(i.undone);
        }
        function No(e, t) {
          var r = $(t);
          (r && r.ranges && r.equals(e)) || t.push(e);
        }
        function Oo(e, t, r, n) {
          var i = t["spans_" + e.id],
            o = 0;
          e.iter(
            Math.max(e.first, r),
            Math.min(e.first + e.size, n),
            function (r) {
              r.markedSpans &&
                ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans),
                ++o;
            }
          );
        }
        function Ao(e) {
          if (!e) return null;
          for (var t, r = 0; r < e.length; ++r)
            e[r].marker.explicitlyCleared
              ? t || (t = e.slice(0, r))
              : t && t.push(e[r]);
          return t ? (t.length ? t : null) : e;
        }
        function Do(e, t) {
          var r = t["spans_" + e.id];
          if (!r) return null;
          for (var n = [], i = 0; i < t.text.length; ++i) n.push(Ao(r[i]));
          return n;
        }
        function Wo(e, t) {
          var r = Do(e, t),
            n = Rt(e, t);
          if (!r) return n;
          if (!n) return r;
          for (var i = 0; i < r.length; ++i) {
            var o = r[i],
              l = n[i];
            if (o && l)
              e: for (var s = 0; s < l.length; ++s) {
                for (var a = l[s], u = 0; u < o.length; ++u)
                  if (o[u].marker == a.marker) continue e;
                o.push(a);
              }
            else l && (r[i] = l);
          }
          return r;
        }
        function Ho(e, t, r) {
          for (var n = [], i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.ranges) n.push(r ? no.prototype.deepCopy.call(o) : o);
            else {
              var l = o.changes,
                s = [];
              n.push({ changes: s });
              for (var a = 0; a < l.length; ++a) {
                var u = l[a],
                  c = void 0;
                if ((s.push({ from: u.from, to: u.to, text: u.text }), t))
                  for (var h in u)
                    (c = h.match(/^spans_(\d+)$/)) &&
                      B(t, Number(c[1])) > -1 &&
                      (($(s)[h] = u[h]), delete u[h]);
              }
            }
          }
          return n;
        }
        function Fo(e, t, r, n) {
          if (n) {
            var i = e.anchor;
            if (r) {
              var o = ot(t, i) < 0;
              o != ot(r, i) < 0
                ? ((i = t), (t = r))
                : o != ot(t, r) < 0 && (t = r);
            }
            return new io(i, t);
          }
          return new io(r || t, t);
        }
        function Eo(e, t, r, n, i) {
          null == i && (i = e.cm && (e.cm.display.shift || e.extend)),
            Go(e, new no([Fo(e.sel.primary(), t, r, i)], 0), n);
        }
        function Po(e, t, r) {
          for (
            var n = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0;
            o < e.sel.ranges.length;
            o++
          )
            n[o] = Fo(e.sel.ranges[o], t[o], null, i);
          Go(e, oo(e.cm, n, e.sel.primIndex), r);
        }
        function Io(e, t, r, n) {
          var i = e.sel.ranges.slice(0);
          (i[t] = r), Go(e, oo(e.cm, i, e.sel.primIndex), n);
        }
        function Ro(e, t, r, n) {
          Go(e, lo(t, r), n);
        }
        function zo(e, t, r) {
          var n = {
            ranges: t.ranges,
            update: function (t) {
              this.ranges = [];
              for (var r = 0; r < t.length; r++)
                this.ranges[r] = new io(ht(e, t[r].anchor), ht(e, t[r].head));
            },
            origin: r && r.origin,
          };
          return (
            me(e, "beforeSelectionChange", e, n),
            e.cm && me(e.cm, "beforeSelectionChange", e.cm, n),
            n.ranges != t.ranges ? oo(e.cm, n.ranges, n.ranges.length - 1) : t
          );
        }
        function Bo(e, t, r) {
          var n = e.history.done,
            i = $(n);
          i && i.ranges ? ((n[n.length - 1] = t), Uo(e, t, r)) : Go(e, t, r);
        }
        function Go(e, t, r) {
          Uo(e, t, r), Mo(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r);
        }
        function Uo(e, t, r) {
          (we(e, "beforeSelectionChange") ||
            (e.cm && we(e.cm, "beforeSelectionChange"))) &&
            (t = zo(e, t, r));
          var n =
            (r && r.bias) ||
            (ot(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
          Vo(e, jo(e, t, n, !0)),
            (r && !1 === r.scroll) ||
              !e.cm ||
              "nocursor" == e.cm.getOption("readOnly") ||
              li(e.cm);
        }
        function Vo(e, t) {
          t.equals(e.sel) ||
            ((e.sel = t),
            e.cm &&
              ((e.cm.curOp.updateInput = 1),
              (e.cm.curOp.selectionChanged = !0),
              be(e.cm)),
            Mr(e, "cursorActivity", e));
        }
        function Ko(e) {
          Vo(e, jo(e, e.sel, null, !1));
        }
        function jo(e, t, r, n) {
          for (var i, o = 0; o < t.ranges.length; o++) {
            var l = t.ranges[o],
              s = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
              a = Yo(e, l.anchor, s && s.anchor, r, n),
              u = Yo(e, l.head, s && s.head, r, n);
            (i || a != l.anchor || u != l.head) &&
              (i || (i = t.ranges.slice(0, o)), (i[o] = new io(a, u)));
          }
          return i ? oo(e.cm, i, t.primIndex) : t;
        }
        function Xo(e, t, r, n, i) {
          var o = qe(e, t.line);
          if (o.markedSpans)
            for (var l = 0; l < o.markedSpans.length; ++l) {
              var s = o.markedSpans[l],
                a = s.marker,
                u = "selectLeft" in a ? !a.selectLeft : a.inclusiveLeft,
                c = "selectRight" in a ? !a.selectRight : a.inclusiveRight;
              if (
                (null == s.from || (u ? s.from <= t.ch : s.from < t.ch)) &&
                (null == s.to || (c ? s.to >= t.ch : s.to > t.ch))
              ) {
                if (i && (me(a, "beforeCursorEnter"), a.explicitlyCleared)) {
                  if (o.markedSpans) {
                    --l;
                    continue;
                  }
                  break;
                }
                if (!a.atomic) continue;
                if (r) {
                  var h = a.find(n < 0 ? 1 : -1),
                    f = void 0;
                  if (
                    ((n < 0 ? c : u) &&
                      (h = _o(e, h, -n, h && h.line == t.line ? o : null)),
                    h &&
                      h.line == t.line &&
                      (f = ot(h, r)) &&
                      (n < 0 ? f < 0 : f > 0))
                  )
                    return Xo(e, h, t, n, i);
                }
                var d = a.find(n < 0 ? -1 : 1);
                return (
                  (n < 0 ? u : c) &&
                    (d = _o(e, d, n, d.line == t.line ? o : null)),
                  d ? Xo(e, d, t, n, i) : null
                );
              }
            }
          return t;
        }
        function Yo(e, t, r, n, i) {
          var o = n || 1,
            l =
              Xo(e, t, r, o, i) ||
              (!i && Xo(e, t, r, o, !0)) ||
              Xo(e, t, r, -o, i) ||
              (!i && Xo(e, t, r, -o, !0));
          return l || ((e.cantEdit = !0), it(e.first, 0));
        }
        function _o(e, t, r, n) {
          return r < 0 && 0 == t.ch
            ? t.line > e.first
              ? ht(e, it(t.line - 1))
              : null
            : r > 0 && t.ch == (n || qe(e, t.line)).text.length
            ? t.line < e.first + e.size - 1
              ? it(t.line + 1, 0)
              : null
            : new it(t.line, t.ch + r);
        }
        function $o(e) {
          e.setSelection(it(e.firstLine(), 0), it(e.lastLine()), V);
        }
        function qo(e, t, r) {
          var n = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function () {
              return (n.canceled = !0);
            },
          };
          return (
            r &&
              (n.update = function (t, r, i, o) {
                t && (n.from = ht(e, t)),
                  r && (n.to = ht(e, r)),
                  i && (n.text = i),
                  void 0 !== o && (n.origin = o);
              }),
            me(e, "beforeChange", e, n),
            e.cm && me(e.cm, "beforeChange", e.cm, n),
            n.canceled
              ? (e.cm && (e.cm.curOp.updateInput = 2), null)
              : { from: n.from, to: n.to, text: n.text, origin: n.origin }
          );
        }
        function Zo(e, t, r) {
          if (e.cm) {
            if (!e.cm.curOp) return Di(e.cm, Zo)(e, t, r);
            if (e.cm.state.suppressEdits) return;
          }
          if (
            !(we(e, "beforeChange") || (e.cm && we(e.cm, "beforeChange"))) ||
            (t = qo(e, t, !0))
          ) {
            var n = Nt && !r && Bt(e, t.from, t.to);
            if (n)
              for (var i = n.length - 1; i >= 0; --i)
                Qo(e, {
                  from: n[i].from,
                  to: n[i].to,
                  text: i ? [""] : t.text,
                  origin: t.origin,
                });
            else Qo(e, t);
          }
        }
        function Qo(e, t) {
          if (1 != t.text.length || "" != t.text[0] || 0 != ot(t.from, t.to)) {
            var r = uo(e, t);
            ko(e, t, r, e.cm ? e.cm.curOp.id : NaN), tl(e, t, r, Rt(e, t));
            var n = [];
            mo(e, function (e, r) {
              r ||
                -1 != B(n, e.history) ||
                (ll(e.history, t), n.push(e.history)),
                tl(e, t, null, Rt(e, t));
            });
          }
        }
        function Jo(e, t, r) {
          var n = e.cm && e.cm.state.suppressEdits;
          if (!n || r) {
            for (
              var i,
                o = e.history,
                l = e.sel,
                s = "undo" == t ? o.done : o.undone,
                a = "undo" == t ? o.undone : o.done,
                u = 0;
              u < s.length &&
              ((i = s[u]), r ? !i.ranges || i.equals(e.sel) : i.ranges);
              u++
            );
            if (u != s.length) {
              for (o.lastOrigin = o.lastSelOrigin = null; ; ) {
                if (!(i = s.pop()).ranges) {
                  if (n) return void s.push(i);
                  break;
                }
                if ((No(i, a), r && !i.equals(e.sel)))
                  return void Go(e, i, { clearRedo: !1 });
                l = i;
              }
              var c = [];
              No(l, a),
                a.push({ changes: c, generation: o.generation }),
                (o.generation = i.generation || ++o.maxGeneration);
              for (
                var h =
                    we(e, "beforeChange") || (e.cm && we(e.cm, "beforeChange")),
                  f = function (r) {
                    var n = i.changes[r];
                    if (((n.origin = t), h && !qo(e, n, !1)))
                      return (s.length = 0), {};
                    c.push(Co(e, n));
                    var o = r ? uo(e, n) : $(s);
                    tl(e, n, o, Wo(e, n)),
                      !r &&
                        e.cm &&
                        e.cm.scrollIntoView({ from: n.from, to: so(n) });
                    var l = [];
                    mo(e, function (e, t) {
                      t ||
                        -1 != B(l, e.history) ||
                        (ll(e.history, n), l.push(e.history)),
                        tl(e, n, null, Wo(e, n));
                    });
                  },
                  d = i.changes.length - 1;
                d >= 0;
                --d
              ) {
                var p = f(d);
                if (p) return p.v;
              }
            }
          }
        }
        function el(e, t) {
          if (
            0 != t &&
            ((e.first += t),
            (e.sel = new no(
              q(e.sel.ranges, function (e) {
                return new io(
                  it(e.anchor.line + t, e.anchor.ch),
                  it(e.head.line + t, e.head.ch)
                );
              }),
              e.sel.primIndex
            )),
            e.cm)
          ) {
            Pn(e.cm, e.first, e.first - t, t);
            for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++)
              In(e.cm, n, "gutter");
          }
        }
        function tl(e, t, r, n) {
          if (e.cm && !e.cm.curOp) return Di(e.cm, tl)(e, t, r, n);
          if (t.to.line < e.first)
            el(e, t.text.length - 1 - (t.to.line - t.from.line));
          else if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
              var i = t.text.length - 1 - (e.first - t.from.line);
              el(e, i),
                (t = {
                  from: it(e.first, 0),
                  to: it(t.to.line + i, t.to.ch),
                  text: [$(t.text)],
                  origin: t.origin,
                });
            }
            var o = e.lastLine();
            t.to.line > o &&
              (t = {
                from: t.from,
                to: it(o, qe(e, o).text.length),
                text: [t.text[0]],
                origin: t.origin,
              }),
              (t.removed = Ze(e, t.from, t.to)),
              r || (r = uo(e, t)),
              e.cm ? rl(e.cm, t, n) : vo(e, t, n),
              Uo(e, r, V),
              e.cantEdit && Yo(e, it(e.firstLine(), 0)) && (e.cantEdit = !1);
          }
        }
        function rl(e, t, r) {
          var n = e.doc,
            i = e.display,
            o = t.from,
            l = t.to,
            s = !1,
            a = o.line;
          e.options.lineWrapping ||
            ((a = et(Zt(qe(n, o.line)))),
            n.iter(a, l.line + 1, function (e) {
              if (e == i.maxLine) return (s = !0), !0;
            })),
            n.sel.contains(t.from, t.to) > -1 && be(e),
            vo(n, t, r, Wn(e)),
            e.options.lineWrapping ||
              (n.iter(a, o.line + t.text.length, function (e) {
                var t = or(e);
                t > i.maxLineLength &&
                  ((i.maxLine = e),
                  (i.maxLineLength = t),
                  (i.maxLineChanged = !0),
                  (s = !1));
              }),
              s && (e.curOp.updateMaxLine = !0)),
            Mt(n, o.line),
            Fi(e, 400);
          var u = t.text.length - (l.line - o.line) - 1;
          t.full
            ? Pn(e)
            : o.line != l.line || 1 != t.text.length || go(e.doc, t)
            ? Pn(e, o.line, l.line + 1, u)
            : In(e, o.line, "text");
          var c = we(e, "changes"),
            h = we(e, "change");
          if (h || c) {
            var f = {
              from: o,
              to: l,
              text: t.text,
              removed: t.removed,
              origin: t.origin,
            };
            h && Mr(e, "change", e, f),
              c && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(f);
          }
          e.display.selForContextMenu = null;
        }
        function nl(e, t, r, n, i) {
          var o;
          n || (n = r),
            ot(n, r) < 0 && ((r = (o = [n, r])[0]), (n = o[1])),
            "string" == typeof t && (t = e.splitLines(t)),
            Zo(e, { from: r, to: n, text: t, origin: i });
        }
        function il(e, t, r, n) {
          r < e.line ? (e.line += n) : t < e.line && ((e.line = t), (e.ch = 0));
        }
        function ol(e, t, r, n) {
          for (var i = 0; i < e.length; ++i) {
            var o = e[i],
              l = !0;
            if (o.ranges) {
              o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
              for (var s = 0; s < o.ranges.length; s++)
                il(o.ranges[s].anchor, t, r, n), il(o.ranges[s].head, t, r, n);
            } else {
              for (var a = 0; a < o.changes.length; ++a) {
                var u = o.changes[a];
                if (r < u.from.line)
                  (u.from = it(u.from.line + n, u.from.ch)),
                    (u.to = it(u.to.line + n, u.to.ch));
                else if (t <= u.to.line) {
                  l = !1;
                  break;
                }
              }
              l || (e.splice(0, i + 1), (i = 0));
            }
          }
        }
        function ll(e, t) {
          var r = t.from.line,
            n = t.to.line,
            i = t.text.length - (n - r) - 1;
          ol(e.done, r, n, i), ol(e.undone, r, n, i);
        }
        function sl(e, t, r, n) {
          var i = t,
            o = t;
          return (
            "number" == typeof t ? (o = qe(e, ct(e, t))) : (i = et(t)),
            null == i ? null : (n(o, i) && e.cm && In(e.cm, i, r), o)
          );
        }
        function al(e) {
          (this.lines = e), (this.parent = null);
          for (var t = 0, r = 0; r < e.length; ++r)
            (e[r].parent = this), (t += e[r].height);
          this.height = t;
        }
        function ul(e) {
          this.children = e;
          for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
            var i = e[n];
            (t += i.chunkSize()), (r += i.height), (i.parent = this);
          }
          (this.size = t), (this.height = r), (this.parent = null);
        }
        (io.prototype.from = function () {
          return ut(this.anchor, this.head);
        }),
          (io.prototype.to = function () {
            return at(this.anchor, this.head);
          }),
          (io.prototype.empty = function () {
            return (
              this.head.line == this.anchor.line &&
              this.head.ch == this.anchor.ch
            );
          }),
          (al.prototype = {
            chunkSize: function () {
              return this.lines.length;
            },
            removeInner: function (e, t) {
              for (var r = e, n = e + t; r < n; ++r) {
                var i = this.lines[r];
                (this.height -= i.height), ur(i), Mr(i, "delete");
              }
              this.lines.splice(e, t);
            },
            collapse: function (e) {
              e.push.apply(e, this.lines);
            },
            insertInner: function (e, t, r) {
              (this.height += r),
                (this.lines = this.lines
                  .slice(0, e)
                  .concat(t)
                  .concat(this.lines.slice(e)));
              for (var n = 0; n < t.length; ++n) t[n].parent = this;
            },
            iterN: function (e, t, r) {
              for (var n = e + t; e < n; ++e) if (r(this.lines[e])) return !0;
            },
          }),
          (ul.prototype = {
            chunkSize: function () {
              return this.size;
            },
            removeInner: function (e, t) {
              this.size -= t;
              for (var r = 0; r < this.children.length; ++r) {
                var n = this.children[r],
                  i = n.chunkSize();
                if (e < i) {
                  var o = Math.min(t, i - e),
                    l = n.height;
                  if (
                    (n.removeInner(e, o),
                    (this.height -= l - n.height),
                    i == o && (this.children.splice(r--, 1), (n.parent = null)),
                    0 == (t -= o))
                  )
                    break;
                  e = 0;
                } else e -= i;
              }
              if (
                this.size - t < 25 &&
                (this.children.length > 1 || !(this.children[0] instanceof al))
              ) {
                var s = [];
                this.collapse(s),
                  (this.children = [new al(s)]),
                  (this.children[0].parent = this);
              }
            },
            collapse: function (e) {
              for (var t = 0; t < this.children.length; ++t)
                this.children[t].collapse(e);
            },
            insertInner: function (e, t, r) {
              (this.size += t.length), (this.height += r);
              for (var n = 0; n < this.children.length; ++n) {
                var i = this.children[n],
                  o = i.chunkSize();
                if (e <= o) {
                  if (
                    (i.insertInner(e, t, r), i.lines && i.lines.length > 50)
                  ) {
                    for (
                      var l = (i.lines.length % 25) + 25, s = l;
                      s < i.lines.length;

                    ) {
                      var a = new al(i.lines.slice(s, (s += 25)));
                      (i.height -= a.height),
                        this.children.splice(++n, 0, a),
                        (a.parent = this);
                    }
                    (i.lines = i.lines.slice(0, l)), this.maybeSpill();
                  }
                  break;
                }
                e -= o;
              }
            },
            maybeSpill: function () {
              if (!(this.children.length <= 10)) {
                var e = this;
                do {
                  var t = new ul(e.children.splice(e.children.length - 5, 5));
                  if (e.parent) {
                    (e.size -= t.size), (e.height -= t.height);
                    var r = B(e.parent.children, e);
                    e.parent.children.splice(r + 1, 0, t);
                  } else {
                    var n = new ul(e.children);
                    (n.parent = e), (e.children = [n, t]), (e = n);
                  }
                  t.parent = e.parent;
                } while (e.children.length > 10);
                e.parent.maybeSpill();
              }
            },
            iterN: function (e, t, r) {
              for (var n = 0; n < this.children.length; ++n) {
                var i = this.children[n],
                  o = i.chunkSize();
                if (e < o) {
                  var l = Math.min(t, o - e);
                  if (i.iterN(e, l, r)) return !0;
                  if (0 == (t -= l)) break;
                  e = 0;
                } else e -= o;
              }
            },
          });
        var cl = function (e, t, r) {
          if (r) for (var n in r) r.hasOwnProperty(n) && (this[n] = r[n]);
          (this.doc = e), (this.node = t);
        };
        function hl(e, t, r) {
          ir(t) < ((e.curOp && e.curOp.scrollTop) || e.doc.scrollTop) &&
            oi(e, r);
        }
        function fl(e, t, r, n) {
          var i = new cl(e, r, n),
            o = e.cm;
          return (
            o && i.noHScroll && (o.display.alignWidgets = !0),
            sl(e, t, "widget", function (t) {
              var r = t.widgets || (t.widgets = []);
              if (
                (null == i.insertAt
                  ? r.push(i)
                  : r.splice(Math.min(r.length, Math.max(0, i.insertAt)), 0, i),
                (i.line = t),
                o && !rr(e, t))
              ) {
                var n = ir(t) < e.scrollTop;
                Je(t, t.height + Gr(i)),
                  n && oi(o, i.height),
                  (o.curOp.forceUpdate = !0);
              }
              return !0;
            }),
            o &&
              Mr(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : et(t)),
            i
          );
        }
        (cl.prototype.clear = function () {
          var e = this.doc.cm,
            t = this.line.widgets,
            r = this.line,
            n = et(r);
          if (null != n && t) {
            for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
            t.length || (r.widgets = null);
            var o = Gr(this);
            Je(r, Math.max(0, r.height - o)),
              e &&
                (Ai(e, function () {
                  hl(e, r, -o), In(e, n, "widget");
                }),
                Mr(e, "lineWidgetCleared", e, this, n));
          }
        }),
          (cl.prototype.changed = function () {
            var e = this,
              t = this.height,
              r = this.doc.cm,
              n = this.line;
            this.height = null;
            var i = Gr(this) - t;
            i &&
              (rr(this.doc, n) || Je(n, n.height + i),
              r &&
                Ai(r, function () {
                  (r.curOp.forceUpdate = !0),
                    hl(r, n, i),
                    Mr(r, "lineWidgetChanged", r, e, et(n));
                }));
          }),
          xe(cl);
        var dl = 0,
          pl = function (e, t) {
            (this.lines = []),
              (this.type = t),
              (this.doc = e),
              (this.id = ++dl);
          };
        function gl(e, t, r, n, i) {
          if (n && n.shared) return ml(e, t, r, n, i);
          if (e.cm && !e.cm.curOp) return Di(e.cm, gl)(e, t, r, n, i);
          var o = new pl(e, i),
            l = ot(t, r);
          if ((n && I(n, o, !1), l > 0 || (0 == l && !1 !== o.clearWhenEmpty)))
            return o;
          if (
            (o.replacedWith &&
              ((o.collapsed = !0),
              (o.widgetNode = A("span", [o.replacedWith], "CodeMirror-widget")),
              n.handleMouseEvents ||
                o.widgetNode.setAttribute("cm-ignore-events", "true"),
              n.insertLeft && (o.widgetNode.insertLeft = !0)),
            o.collapsed)
          ) {
            if (
              qt(e, t.line, t, r, o) ||
              (t.line != r.line && qt(e, r.line, t, r, o))
            )
              throw new Error(
                "Inserting collapsed marker partially overlapping an existing one"
              );
            Dt();
          }
          o.addToHistory &&
            ko(e, { from: t, to: r, origin: "markText" }, e.sel, NaN);
          var s,
            a = t.line,
            u = e.cm;
          if (
            (e.iter(a, r.line + 1, function (n) {
              u &&
                o.collapsed &&
                !u.options.lineWrapping &&
                Zt(n) == u.display.maxLine &&
                (s = !0),
                o.collapsed && a != t.line && Je(n, 0),
                Et(
                  n,
                  new Wt(
                    o,
                    a == t.line ? t.ch : null,
                    a == r.line ? r.ch : null
                  ),
                  e.cm && e.cm.curOp
                ),
                ++a;
            }),
            o.collapsed &&
              e.iter(t.line, r.line + 1, function (t) {
                rr(e, t) && Je(t, 0);
              }),
            o.clearOnEnter &&
              pe(o, "beforeCursorEnter", function () {
                return o.clear();
              }),
            o.readOnly &&
              (At(),
              (e.history.done.length || e.history.undone.length) &&
                e.clearHistory()),
            o.collapsed && ((o.id = ++dl), (o.atomic = !0)),
            u)
          ) {
            if ((s && (u.curOp.updateMaxLine = !0), o.collapsed))
              Pn(u, t.line, r.line + 1);
            else if (
              o.className ||
              o.startStyle ||
              o.endStyle ||
              o.css ||
              o.attributes ||
              o.title
            )
              for (var c = t.line; c <= r.line; c++) In(u, c, "text");
            o.atomic && Ko(u.doc), Mr(u, "markerAdded", u, o);
          }
          return o;
        }
        (pl.prototype.clear = function () {
          if (!this.explicitlyCleared) {
            var e = this.doc.cm,
              t = e && !e.curOp;
            if ((t && Ci(e), we(this, "clear"))) {
              var r = this.find();
              r && Mr(this, "clear", r.from, r.to);
            }
            for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
              var l = this.lines[o],
                s = Ht(l.markedSpans, this);
              e && !this.collapsed
                ? In(e, et(l), "text")
                : e &&
                  (null != s.to && (i = et(l)), null != s.from && (n = et(l))),
                (l.markedSpans = Ft(l.markedSpans, s)),
                null == s.from &&
                  this.collapsed &&
                  !rr(this.doc, l) &&
                  e &&
                  Je(l, Nn(e.display));
            }
            if (e && this.collapsed && !e.options.lineWrapping)
              for (var a = 0; a < this.lines.length; ++a) {
                var u = Zt(this.lines[a]),
                  c = or(u);
                c > e.display.maxLineLength &&
                  ((e.display.maxLine = u),
                  (e.display.maxLineLength = c),
                  (e.display.maxLineChanged = !0));
              }
            null != n && e && this.collapsed && Pn(e, n, i + 1),
              (this.lines.length = 0),
              (this.explicitlyCleared = !0),
              this.atomic &&
                this.doc.cantEdit &&
                ((this.doc.cantEdit = !1), e && Ko(e.doc)),
              e && Mr(e, "markerCleared", e, this, n, i),
              t && Si(e),
              this.parent && this.parent.clear();
          }
        }),
          (pl.prototype.find = function (e, t) {
            var r, n;
            null == e && "bookmark" == this.type && (e = 1);
            for (var i = 0; i < this.lines.length; ++i) {
              var o = this.lines[i],
                l = Ht(o.markedSpans, this);
              if (null != l.from && ((r = it(t ? o : et(o), l.from)), -1 == e))
                return r;
              if (null != l.to && ((n = it(t ? o : et(o), l.to)), 1 == e))
                return n;
            }
            return r && { from: r, to: n };
          }),
          (pl.prototype.changed = function () {
            var e = this,
              t = this.find(-1, !0),
              r = this,
              n = this.doc.cm;
            t &&
              n &&
              Ai(n, function () {
                var i = t.line,
                  o = et(t.line),
                  l = Jr(n, o);
                if (
                  (l &&
                    (un(l),
                    (n.curOp.selectionChanged = n.curOp.forceUpdate = !0)),
                  (n.curOp.updateMaxLine = !0),
                  !rr(r.doc, i) && null != r.height)
                ) {
                  var s = r.height;
                  r.height = null;
                  var a = Gr(r) - s;
                  a && Je(i, i.height + a);
                }
                Mr(n, "markerChanged", n, e);
              });
          }),
          (pl.prototype.attachLine = function (e) {
            if (!this.lines.length && this.doc.cm) {
              var t = this.doc.cm.curOp;
              (t.maybeHiddenMarkers && -1 != B(t.maybeHiddenMarkers, this)) ||
                (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(
                  this
                );
            }
            this.lines.push(e);
          }),
          (pl.prototype.detachLine = function (e) {
            if (
              (this.lines.splice(B(this.lines, e), 1),
              !this.lines.length && this.doc.cm)
            ) {
              var t = this.doc.cm.curOp;
              (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
            }
          }),
          xe(pl);
        var vl = function (e, t) {
          (this.markers = e), (this.primary = t);
          for (var r = 0; r < e.length; ++r) e[r].parent = this;
        };
        function ml(e, t, r, n, i) {
          (n = I(n)).shared = !1;
          var o = [gl(e, t, r, n, i)],
            l = o[0],
            s = n.widgetNode;
          return (
            mo(e, function (e) {
              s && (n.widgetNode = s.cloneNode(!0)),
                o.push(gl(e, ht(e, t), ht(e, r), n, i));
              for (var a = 0; a < e.linked.length; ++a)
                if (e.linked[a].isParent) return;
              l = $(o);
            }),
            new vl(o, l)
          );
        }
        function yl(e) {
          return e.findMarks(
            it(e.first, 0),
            e.clipPos(it(e.lastLine())),
            function (e) {
              return e.parent;
            }
          );
        }
        function bl(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r],
              i = n.find(),
              o = e.clipPos(i.from),
              l = e.clipPos(i.to);
            if (ot(o, l)) {
              var s = gl(e, o, l, n.primary, n.primary.type);
              n.markers.push(s), (s.parent = n);
            }
          }
        }
        function wl(e) {
          for (
            var t = function (t) {
                var r = e[t],
                  n = [r.primary.doc];
                mo(r.primary.doc, function (e) {
                  return n.push(e);
                });
                for (var i = 0; i < r.markers.length; i++) {
                  var o = r.markers[i];
                  -1 == B(n, o.doc) &&
                    ((o.parent = null), r.markers.splice(i--, 1));
                }
              },
              r = 0;
            r < e.length;
            r++
          )
            t(r);
        }
        (vl.prototype.clear = function () {
          if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var e = 0; e < this.markers.length; ++e)
              this.markers[e].clear();
            Mr(this, "clear");
          }
        }),
          (vl.prototype.find = function (e, t) {
            return this.primary.find(e, t);
          }),
          xe(vl);
        var xl = 0,
          Cl = function (e, t, r, n, i) {
            if (!(this instanceof Cl)) return new Cl(e, t, r, n, i);
            null == r && (r = 0),
              ul.call(this, [new al([new sr("", null)])]),
              (this.first = r),
              (this.scrollTop = this.scrollLeft = 0),
              (this.cantEdit = !1),
              (this.cleanGeneration = 1),
              (this.modeFrontier = this.highlightFrontier = r);
            var o = it(r, 0);
            (this.sel = lo(o)),
              (this.history = new xo(null)),
              (this.id = ++xl),
              (this.modeOption = t),
              (this.lineSep = n),
              (this.direction = "rtl" == i ? "rtl" : "ltr"),
              (this.extend = !1),
              "string" == typeof e && (e = this.splitLines(e)),
              vo(this, { from: o, to: o, text: e }),
              Go(this, lo(o), V);
          };
        (Cl.prototype = J(ul.prototype, {
          constructor: Cl,
          iter: function (e, t, r) {
            r
              ? this.iterN(e - this.first, t - e, r)
              : this.iterN(this.first, this.first + this.size, e);
          },
          insert: function (e, t) {
            for (var r = 0, n = 0; n < t.length; ++n) r += t[n].height;
            this.insertInner(e - this.first, t, r);
          },
          remove: function (e, t) {
            this.removeInner(e - this.first, t);
          },
          getValue: function (e) {
            var t = Qe(this, this.first, this.first + this.size);
            return !1 === e ? t : t.join(e || this.lineSeparator());
          },
          setValue: Hi(function (e) {
            var t = it(this.first, 0),
              r = this.first + this.size - 1;
            Zo(
              this,
              {
                from: t,
                to: it(r, qe(this, r).text.length),
                text: this.splitLines(e),
                origin: "setValue",
                full: !0,
              },
              !0
            ),
              this.cm && si(this.cm, 0, 0),
              Go(this, lo(t), V);
          }),
          replaceRange: function (e, t, r, n) {
            nl(this, e, (t = ht(this, t)), (r = r ? ht(this, r) : t), n);
          },
          getRange: function (e, t, r) {
            var n = Ze(this, ht(this, e), ht(this, t));
            return !1 === r
              ? n
              : "" === r
              ? n.join("")
              : n.join(r || this.lineSeparator());
          },
          getLine: function (e) {
            var t = this.getLineHandle(e);
            return t && t.text;
          },
          getLineHandle: function (e) {
            if (rt(this, e)) return qe(this, e);
          },
          getLineNumber: function (e) {
            return et(e);
          },
          getLineHandleVisualStart: function (e) {
            return "number" == typeof e && (e = qe(this, e)), Zt(e);
          },
          lineCount: function () {
            return this.size;
          },
          firstLine: function () {
            return this.first;
          },
          lastLine: function () {
            return this.first + this.size - 1;
          },
          clipPos: function (e) {
            return ht(this, e);
          },
          getCursor: function (e) {
            var t = this.sel.primary();
            return null == e || "head" == e
              ? t.head
              : "anchor" == e
              ? t.anchor
              : "end" == e || "to" == e || !1 === e
              ? t.to()
              : t.from();
          },
          listSelections: function () {
            return this.sel.ranges;
          },
          somethingSelected: function () {
            return this.sel.somethingSelected();
          },
          setCursor: Hi(function (e, t, r) {
            Ro(
              this,
              ht(this, "number" == typeof e ? it(e, t || 0) : e),
              null,
              r
            );
          }),
          setSelection: Hi(function (e, t, r) {
            Ro(this, ht(this, e), ht(this, t || e), r);
          }),
          extendSelection: Hi(function (e, t, r) {
            Eo(this, ht(this, e), t && ht(this, t), r);
          }),
          extendSelections: Hi(function (e, t) {
            Po(this, dt(this, e), t);
          }),
          extendSelectionsBy: Hi(function (e, t) {
            Po(this, dt(this, q(this.sel.ranges, e)), t);
          }),
          setSelections: Hi(function (e, t, r) {
            if (e.length) {
              for (var n = [], i = 0; i < e.length; i++)
                n[i] = new io(
                  ht(this, e[i].anchor),
                  ht(this, e[i].head || e[i].anchor)
                );
              null == t && (t = Math.min(e.length - 1, this.sel.primIndex)),
                Go(this, oo(this.cm, n, t), r);
            }
          }),
          addSelection: Hi(function (e, t, r) {
            var n = this.sel.ranges.slice(0);
            n.push(new io(ht(this, e), ht(this, t || e))),
              Go(this, oo(this.cm, n, n.length - 1), r);
          }),
          getSelection: function (e) {
            for (var t, r = this.sel.ranges, n = 0; n < r.length; n++) {
              var i = Ze(this, r[n].from(), r[n].to());
              t = t ? t.concat(i) : i;
            }
            return !1 === e ? t : t.join(e || this.lineSeparator());
          },
          getSelections: function (e) {
            for (var t = [], r = this.sel.ranges, n = 0; n < r.length; n++) {
              var i = Ze(this, r[n].from(), r[n].to());
              !1 !== e && (i = i.join(e || this.lineSeparator())), (t[n] = i);
            }
            return t;
          },
          replaceSelection: function (e, t, r) {
            for (var n = [], i = 0; i < this.sel.ranges.length; i++) n[i] = e;
            this.replaceSelections(n, t, r || "+input");
          },
          replaceSelections: Hi(function (e, t, r) {
            for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
              var l = i.ranges[o];
              n[o] = {
                from: l.from(),
                to: l.to(),
                text: this.splitLines(e[o]),
                origin: r,
              };
            }
            for (
              var s = t && "end" != t && ho(this, n, t), a = n.length - 1;
              a >= 0;
              a--
            )
              Zo(this, n[a]);
            s ? Bo(this, s) : this.cm && li(this.cm);
          }),
          undo: Hi(function () {
            Jo(this, "undo");
          }),
          redo: Hi(function () {
            Jo(this, "redo");
          }),
          undoSelection: Hi(function () {
            Jo(this, "undo", !0);
          }),
          redoSelection: Hi(function () {
            Jo(this, "redo", !0);
          }),
          setExtending: function (e) {
            this.extend = e;
          },
          getExtending: function () {
            return this.extend;
          },
          historySize: function () {
            for (
              var e = this.history, t = 0, r = 0, n = 0;
              n < e.done.length;
              n++
            )
              e.done[n].ranges || ++t;
            for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++r;
            return { undo: t, redo: r };
          },
          clearHistory: function () {
            var e = this;
            (this.history = new xo(this.history)),
              mo(
                this,
                function (t) {
                  return (t.history = e.history);
                },
                !0
              );
          },
          markClean: function () {
            this.cleanGeneration = this.changeGeneration(!0);
          },
          changeGeneration: function (e) {
            return (
              e &&
                (this.history.lastOp =
                  this.history.lastSelOp =
                  this.history.lastOrigin =
                    null),
              this.history.generation
            );
          },
          isClean: function (e) {
            return this.history.generation == (e || this.cleanGeneration);
          },
          getHistory: function () {
            return {
              done: Ho(this.history.done),
              undone: Ho(this.history.undone),
            };
          },
          setHistory: function (e) {
            var t = (this.history = new xo(this.history));
            (t.done = Ho(e.done.slice(0), null, !0)),
              (t.undone = Ho(e.undone.slice(0), null, !0));
          },
          setGutterMarker: Hi(function (e, t, r) {
            return sl(this, e, "gutter", function (e) {
              var n = e.gutterMarkers || (e.gutterMarkers = {});
              return (n[t] = r), !r && ne(n) && (e.gutterMarkers = null), !0;
            });
          }),
          clearGutter: Hi(function (e) {
            var t = this;
            this.iter(function (r) {
              r.gutterMarkers &&
                r.gutterMarkers[e] &&
                sl(t, r, "gutter", function () {
                  return (
                    (r.gutterMarkers[e] = null),
                    ne(r.gutterMarkers) && (r.gutterMarkers = null),
                    !0
                  );
                });
            });
          }),
          lineInfo: function (e) {
            var t;
            if ("number" == typeof e) {
              if (!rt(this, e)) return null;
              if (((t = e), !(e = qe(this, e)))) return null;
            } else if (null == (t = et(e))) return null;
            return {
              line: t,
              handle: e,
              text: e.text,
              gutterMarkers: e.gutterMarkers,
              textClass: e.textClass,
              bgClass: e.bgClass,
              wrapClass: e.wrapClass,
              widgets: e.widgets,
            };
          },
          addLineClass: Hi(function (e, t, r) {
            return sl(
              this,
              e,
              "gutter" == t ? "gutter" : "class",
              function (e) {
                var n =
                  "text" == t
                    ? "textClass"
                    : "background" == t
                    ? "bgClass"
                    : "gutter" == t
                    ? "gutterClass"
                    : "wrapClass";
                if (e[n]) {
                  if (L(r).test(e[n])) return !1;
                  e[n] += " " + r;
                } else e[n] = r;
                return !0;
              }
            );
          }),
          removeLineClass: Hi(function (e, t, r) {
            return sl(
              this,
              e,
              "gutter" == t ? "gutter" : "class",
              function (e) {
                var n =
                    "text" == t
                      ? "textClass"
                      : "background" == t
                      ? "bgClass"
                      : "gutter" == t
                      ? "gutterClass"
                      : "wrapClass",
                  i = e[n];
                if (!i) return !1;
                if (null == r) e[n] = null;
                else {
                  var o = i.match(L(r));
                  if (!o) return !1;
                  var l = o.index + o[0].length;
                  e[n] =
                    i.slice(0, o.index) +
                      (o.index && l != i.length ? " " : "") +
                      i.slice(l) || null;
                }
                return !0;
              }
            );
          }),
          addLineWidget: Hi(function (e, t, r) {
            return fl(this, e, t, r);
          }),
          removeLineWidget: function (e) {
            e.clear();
          },
          markText: function (e, t, r) {
            return gl(
              this,
              ht(this, e),
              ht(this, t),
              r,
              (r && r.type) || "range"
            );
          },
          setBookmark: function (e, t) {
            var r = {
              replacedWith: t && (null == t.nodeType ? t.widget : t),
              insertLeft: t && t.insertLeft,
              clearWhenEmpty: !1,
              shared: t && t.shared,
              handleMouseEvents: t && t.handleMouseEvents,
            };
            return gl(this, (e = ht(this, e)), e, r, "bookmark");
          },
          findMarksAt: function (e) {
            var t = [],
              r = qe(this, (e = ht(this, e)).line).markedSpans;
            if (r)
              for (var n = 0; n < r.length; ++n) {
                var i = r[n];
                (null == i.from || i.from <= e.ch) &&
                  (null == i.to || i.to >= e.ch) &&
                  t.push(i.marker.parent || i.marker);
              }
            return t;
          },
          findMarks: function (e, t, r) {
            (e = ht(this, e)), (t = ht(this, t));
            var n = [],
              i = e.line;
            return (
              this.iter(e.line, t.line + 1, function (o) {
                var l = o.markedSpans;
                if (l)
                  for (var s = 0; s < l.length; s++) {
                    var a = l[s];
                    (null != a.to && i == e.line && e.ch >= a.to) ||
                      (null == a.from && i != e.line) ||
                      (null != a.from && i == t.line && a.from >= t.ch) ||
                      (r && !r(a.marker)) ||
                      n.push(a.marker.parent || a.marker);
                  }
                ++i;
              }),
              n
            );
          },
          getAllMarks: function () {
            var e = [];
            return (
              this.iter(function (t) {
                var r = t.markedSpans;
                if (r)
                  for (var n = 0; n < r.length; ++n)
                    null != r[n].from && e.push(r[n].marker);
              }),
              e
            );
          },
          posFromIndex: function (e) {
            var t,
              r = this.first,
              n = this.lineSeparator().length;
            return (
              this.iter(function (i) {
                var o = i.text.length + n;
                if (o > e) return (t = e), !0;
                (e -= o), ++r;
              }),
              ht(this, it(r, t))
            );
          },
          indexFromPos: function (e) {
            var t = (e = ht(this, e)).ch;
            if (e.line < this.first || e.ch < 0) return 0;
            var r = this.lineSeparator().length;
            return (
              this.iter(this.first, e.line, function (e) {
                t += e.text.length + r;
              }),
              t
            );
          },
          copy: function (e) {
            var t = new Cl(
              Qe(this, this.first, this.first + this.size),
              this.modeOption,
              this.first,
              this.lineSep,
              this.direction
            );
            return (
              (t.scrollTop = this.scrollTop),
              (t.scrollLeft = this.scrollLeft),
              (t.sel = this.sel),
              (t.extend = !1),
              e &&
                ((t.history.undoDepth = this.history.undoDepth),
                t.setHistory(this.getHistory())),
              t
            );
          },
          linkedDoc: function (e) {
            e || (e = {});
            var t = this.first,
              r = this.first + this.size;
            null != e.from && e.from > t && (t = e.from),
              null != e.to && e.to < r && (r = e.to);
            var n = new Cl(
              Qe(this, t, r),
              e.mode || this.modeOption,
              t,
              this.lineSep,
              this.direction
            );
            return (
              e.sharedHist && (n.history = this.history),
              (this.linked || (this.linked = [])).push({
                doc: n,
                sharedHist: e.sharedHist,
              }),
              (n.linked = [
                { doc: this, isParent: !0, sharedHist: e.sharedHist },
              ]),
              bl(n, yl(this)),
              n
            );
          },
          unlinkDoc: function (e) {
            if ((e instanceof Ps && (e = e.doc), this.linked))
              for (var t = 0; t < this.linked.length; ++t)
                if (this.linked[t].doc == e) {
                  this.linked.splice(t, 1), e.unlinkDoc(this), wl(yl(this));
                  break;
                }
            if (e.history == this.history) {
              var r = [e.id];
              mo(
                e,
                function (e) {
                  return r.push(e.id);
                },
                !0
              ),
                (e.history = new xo(null)),
                (e.history.done = Ho(this.history.done, r)),
                (e.history.undone = Ho(this.history.undone, r));
            }
          },
          iterLinkedDocs: function (e) {
            mo(this, e);
          },
          getMode: function () {
            return this.mode;
          },
          getEditor: function () {
            return this.cm;
          },
          splitLines: function (e) {
            return this.lineSep ? e.split(this.lineSep) : He(e);
          },
          lineSeparator: function () {
            return this.lineSep || "\n";
          },
          setDirection: Hi(function (e) {
            "rtl" != e && (e = "ltr"),
              e != this.direction &&
                ((this.direction = e),
                this.iter(function (e) {
                  return (e.order = null);
                }),
                this.cm && wo(this.cm));
          }),
        })),
          (Cl.prototype.eachLine = Cl.prototype.iter);
        var Sl = 0;
        function Ll(e) {
          var t = this;
          if ((Ml(t), !ye(t, e) && !Ur(t.display, e))) {
            Ce(e), l && (Sl = +new Date());
            var r = Fn(t, e, !0),
              n = e.dataTransfer.files;
            if (r && !t.isReadOnly())
              if (n && n.length && window.FileReader && window.File)
                for (
                  var i = n.length,
                    o = Array(i),
                    s = 0,
                    a = function () {
                      ++s == i &&
                        Di(t, function () {
                          var e = {
                            from: (r = ht(t.doc, r)),
                            to: r,
                            text: t.doc.splitLines(
                              o
                                .filter(function (e) {
                                  return null != e;
                                })
                                .join(t.doc.lineSeparator())
                            ),
                            origin: "paste",
                          };
                          Zo(t.doc, e),
                            Bo(t.doc, lo(ht(t.doc, r), ht(t.doc, so(e))));
                        })();
                    },
                    u = function (e, r) {
                      if (
                        t.options.allowDropFileTypes &&
                        -1 == B(t.options.allowDropFileTypes, e.type)
                      )
                        a();
                      else {
                        var n = new FileReader();
                        (n.onerror = function () {
                          return a();
                        }),
                          (n.onload = function () {
                            var e = n.result;
                            /[\x00-\x08\x0e-\x1f]{2}/.test(e) || (o[r] = e),
                              a();
                          }),
                          n.readAsText(e);
                      }
                    },
                    c = 0;
                  c < n.length;
                  c++
                )
                  u(n[c], c);
              else {
                if (t.state.draggingText && t.doc.sel.contains(r) > -1)
                  return (
                    t.state.draggingText(e),
                    void setTimeout(function () {
                      return t.display.input.focus();
                    }, 20)
                  );
                try {
                  var h = e.dataTransfer.getData("Text");
                  if (h) {
                    var f;
                    if (
                      (t.state.draggingText &&
                        !t.state.draggingText.copy &&
                        (f = t.listSelections()),
                      Uo(t.doc, lo(r, r)),
                      f)
                    )
                      for (var d = 0; d < f.length; ++d)
                        nl(t.doc, "", f[d].anchor, f[d].head, "drag");
                    t.replaceSelection(h, "around", "paste"),
                      t.display.input.focus();
                  }
                } catch (p) {}
              }
          }
        }
        function kl(e, t) {
          if (l && (!e.state.draggingText || +new Date() - Sl < 100)) ke(t);
          else if (
            !ye(e, t) &&
            !Ur(e.display, t) &&
            (t.dataTransfer.setData("Text", e.getSelection()),
            (t.dataTransfer.effectAllowed = "copyMove"),
            t.dataTransfer.setDragImage && !f)
          ) {
            var r = O("img", null, null, "position: fixed; left: 0; top: 0;");
            (r.src =
              "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
              h &&
                ((r.width = r.height = 1),
                e.display.wrapper.appendChild(r),
                (r._top = r.offsetTop)),
              t.dataTransfer.setDragImage(r, 0, 0),
              h && r.parentNode.removeChild(r);
          }
        }
        function Tl(e, t) {
          var r = Fn(e, t);
          if (r) {
            var n = document.createDocumentFragment();
            Kn(e, r, n),
              e.display.dragCursor ||
                ((e.display.dragCursor = O(
                  "div",
                  null,
                  "CodeMirror-cursors CodeMirror-dragcursors"
                )),
                e.display.lineSpace.insertBefore(
                  e.display.dragCursor,
                  e.display.cursorDiv
                )),
              N(e.display.dragCursor, n);
          }
        }
        function Ml(e) {
          e.display.dragCursor &&
            (e.display.lineSpace.removeChild(e.display.dragCursor),
            (e.display.dragCursor = null));
        }
        function Nl(e) {
          if (document.getElementsByClassName) {
            for (
              var t = document.getElementsByClassName("CodeMirror"),
                r = [],
                n = 0;
              n < t.length;
              n++
            ) {
              var i = t[n].CodeMirror;
              i && r.push(i);
            }
            r.length &&
              r[0].operation(function () {
                for (var t = 0; t < r.length; t++) e(r[t]);
              });
          }
        }
        var Ol = !1;
        function Al() {
          Ol || (Dl(), (Ol = !0));
        }
        function Dl() {
          var e;
          pe(window, "resize", function () {
            null == e &&
              (e = setTimeout(function () {
                (e = null), Nl(Wl);
              }, 100));
          }),
            pe(window, "blur", function () {
              return Nl(Zn);
            });
        }
        function Wl(e) {
          var t = e.display;
          (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null),
            (t.scrollbarsClipped = !1),
            e.setSize();
        }
        for (
          var Hl = {
              3: "Pause",
              8: "Backspace",
              9: "Tab",
              13: "Enter",
              16: "Shift",
              17: "Ctrl",
              18: "Alt",
              19: "Pause",
              20: "CapsLock",
              27: "Esc",
              32: "Space",
              33: "PageUp",
              34: "PageDown",
              35: "End",
              36: "Home",
              37: "Left",
              38: "Up",
              39: "Right",
              40: "Down",
              44: "PrintScrn",
              45: "Insert",
              46: "Delete",
              59: ";",
              61: "=",
              91: "Mod",
              92: "Mod",
              93: "Mod",
              106: "*",
              107: "=",
              109: "-",
              110: ".",
              111: "/",
              145: "ScrollLock",
              173: "-",
              186: ";",
              187: "=",
              188: ",",
              189: "-",
              190: ".",
              191: "/",
              192: "`",
              219: "[",
              220: "\\",
              221: "]",
              222: "'",
              224: "Mod",
              63232: "Up",
              63233: "Down",
              63234: "Left",
              63235: "Right",
              63272: "Delete",
              63273: "Home",
              63275: "End",
              63276: "PageUp",
              63277: "PageDown",
              63302: "Insert",
            },
            Fl = 0;
          Fl < 10;
          Fl++
        )
          Hl[Fl + 48] = Hl[Fl + 96] = String(Fl);
        for (var El = 65; El <= 90; El++) Hl[El] = String.fromCharCode(El);
        for (var Pl = 1; Pl <= 12; Pl++)
          Hl[Pl + 111] = Hl[Pl + 63235] = "F" + Pl;
        var Il = {};
        function Rl(e) {
          var t,
            r,
            n,
            i,
            o = e.split(/-(?!$)/);
          e = o[o.length - 1];
          for (var l = 0; l < o.length - 1; l++) {
            var s = o[l];
            if (/^(cmd|meta|m)$/i.test(s)) i = !0;
            else if (/^a(lt)?$/i.test(s)) t = !0;
            else if (/^(c|ctrl|control)$/i.test(s)) r = !0;
            else {
              if (!/^s(hift)?$/i.test(s))
                throw new Error("Unrecognized modifier name: " + s);
              n = !0;
            }
          }
          return (
            t && (e = "Alt-" + e),
            r && (e = "Ctrl-" + e),
            i && (e = "Cmd-" + e),
            n && (e = "Shift-" + e),
            e
          );
        }
        function zl(e) {
          var t = {};
          for (var r in e)
            if (e.hasOwnProperty(r)) {
              var n = e[r];
              if (/^(name|fallthrough|(de|at)tach)$/.test(r)) continue;
              if ("..." == n) {
                delete e[r];
                continue;
              }
              for (var i = q(r.split(" "), Rl), o = 0; o < i.length; o++) {
                var l = void 0,
                  s = void 0;
                o == i.length - 1
                  ? ((s = i.join(" ")), (l = n))
                  : ((s = i.slice(0, o + 1).join(" ")), (l = "..."));
                var a = t[s];
                if (a) {
                  if (a != l) throw new Error("Inconsistent bindings for " + s);
                } else t[s] = l;
              }
              delete e[r];
            }
          for (var u in t) e[u] = t[u];
          return e;
        }
        function Bl(e, t, r, n) {
          var i = (t = Kl(t)).call ? t.call(e, n) : t[e];
          if (!1 === i) return "nothing";
          if ("..." === i) return "multi";
          if (null != i && r(i)) return "handled";
          if (t.fallthrough) {
            if (
              "[object Array]" != Object.prototype.toString.call(t.fallthrough)
            )
              return Bl(e, t.fallthrough, r, n);
            for (var o = 0; o < t.fallthrough.length; o++) {
              var l = Bl(e, t.fallthrough[o], r, n);
              if (l) return l;
            }
          }
        }
        function Gl(e) {
          var t = "string" == typeof e ? e : Hl[e.keyCode];
          return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
        }
        function Ul(e, t, r) {
          var n = e;
          return (
            t.altKey && "Alt" != n && (e = "Alt-" + e),
            (C ? t.metaKey : t.ctrlKey) && "Ctrl" != n && (e = "Ctrl-" + e),
            (C ? t.ctrlKey : t.metaKey) && "Mod" != n && (e = "Cmd-" + e),
            !r && t.shiftKey && "Shift" != n && (e = "Shift-" + e),
            e
          );
        }
        function Vl(e, t) {
          if (h && 34 == e.keyCode && e.char) return !1;
          var r = Hl[e.keyCode];
          return (
            null != r &&
            !e.altGraphKey &&
            (3 == e.keyCode && e.code && (r = e.code), Ul(r, e, t))
          );
        }
        function Kl(e) {
          return "string" == typeof e ? Il[e] : e;
        }
        function jl(e, t) {
          for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
            for (var o = t(r[i]); n.length && ot(o.from, $(n).to) <= 0; ) {
              var l = n.pop();
              if (ot(l.from, o.from) < 0) {
                o.from = l.from;
                break;
              }
            }
            n.push(o);
          }
          Ai(e, function () {
            for (var t = n.length - 1; t >= 0; t--)
              nl(e.doc, "", n[t].from, n[t].to, "+delete");
            li(e);
          });
        }
        function Xl(e, t, r) {
          var n = le(e.text, t + r, r);
          return n < 0 || n > e.text.length ? null : n;
        }
        function Yl(e, t, r) {
          var n = Xl(e, t.ch, r);
          return null == n
            ? null
            : new it(t.line, n, r < 0 ? "after" : "before");
        }
        function _l(e, t, r, n, i) {
          if (e) {
            "rtl" == t.doc.direction && (i = -i);
            var o = fe(r, t.doc.direction);
            if (o) {
              var l,
                s = i < 0 ? $(o) : o[0],
                a = i < 0 == (1 == s.level) ? "after" : "before";
              if (s.level > 0 || "rtl" == t.doc.direction) {
                var u = en(t, r);
                l = i < 0 ? r.text.length - 1 : 0;
                var c = tn(t, u, l).top;
                (l = se(
                  function (e) {
                    return tn(t, u, e).top == c;
                  },
                  i < 0 == (1 == s.level) ? s.from : s.to - 1,
                  l
                )),
                  "before" == a && (l = Xl(r, l, 1));
              } else l = i < 0 ? s.to : s.from;
              return new it(n, l, a);
            }
          }
          return new it(
            n,
            i < 0 ? r.text.length : 0,
            i < 0 ? "before" : "after"
          );
        }
        function $l(e, t, r, n) {
          var i = fe(t, e.doc.direction);
          if (!i) return Yl(t, r, n);
          r.ch >= t.text.length
            ? ((r.ch = t.text.length), (r.sticky = "before"))
            : r.ch <= 0 && ((r.ch = 0), (r.sticky = "after"));
          var o = ce(i, r.ch, r.sticky),
            l = i[o];
          if (
            "ltr" == e.doc.direction &&
            l.level % 2 == 0 &&
            (n > 0 ? l.to > r.ch : l.from < r.ch)
          )
            return Yl(t, r, n);
          var s,
            a = function (e, r) {
              return Xl(t, e instanceof it ? e.ch : e, r);
            },
            u = function (r) {
              return e.options.lineWrapping
                ? ((s = s || en(e, t)), Sn(e, t, s, r))
                : { begin: 0, end: t.text.length };
            },
            c = u("before" == r.sticky ? a(r, -1) : r.ch);
          if ("rtl" == e.doc.direction || 1 == l.level) {
            var h = (1 == l.level) == n < 0,
              f = a(r, h ? 1 : -1);
            if (
              null != f &&
              (h ? f <= l.to && f <= c.end : f >= l.from && f >= c.begin)
            ) {
              var d = h ? "before" : "after";
              return new it(r.line, f, d);
            }
          }
          var p = function (e, t, n) {
              for (
                var o = function (e, t) {
                  return t
                    ? new it(r.line, a(e, 1), "before")
                    : new it(r.line, e, "after");
                };
                e >= 0 && e < i.length;
                e += t
              ) {
                var l = i[e],
                  s = t > 0 == (1 != l.level),
                  u = s ? n.begin : a(n.end, -1);
                if (l.from <= u && u < l.to) return o(u, s);
                if (((u = s ? l.from : a(l.to, -1)), n.begin <= u && u < n.end))
                  return o(u, s);
              }
            },
            g = p(o + n, n, c);
          if (g) return g;
          var v = n > 0 ? c.end : a(c.begin, -1);
          return null == v ||
            (n > 0 && v == t.text.length) ||
            !(g = p(n > 0 ? 0 : i.length - 1, n, u(v)))
            ? null
            : g;
        }
        (Il.basic = {
          Left: "goCharLeft",
          Right: "goCharRight",
          Up: "goLineUp",
          Down: "goLineDown",
          End: "goLineEnd",
          Home: "goLineStartSmart",
          PageUp: "goPageUp",
          PageDown: "goPageDown",
          Delete: "delCharAfter",
          Backspace: "delCharBefore",
          "Shift-Backspace": "delCharBefore",
          Tab: "defaultTab",
          "Shift-Tab": "indentAuto",
          Enter: "newlineAndIndent",
          Insert: "toggleOverwrite",
          Esc: "singleSelection",
        }),
          (Il.pcDefault = {
            "Ctrl-A": "selectAll",
            "Ctrl-D": "deleteLine",
            "Ctrl-Z": "undo",
            "Shift-Ctrl-Z": "redo",
            "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart",
            "Ctrl-End": "goDocEnd",
            "Ctrl-Up": "goLineUp",
            "Ctrl-Down": "goLineDown",
            "Ctrl-Left": "goGroupLeft",
            "Ctrl-Right": "goGroupRight",
            "Alt-Left": "goLineStart",
            "Alt-Right": "goLineEnd",
            "Ctrl-Backspace": "delGroupBefore",
            "Ctrl-Delete": "delGroupAfter",
            "Ctrl-S": "save",
            "Ctrl-F": "find",
            "Ctrl-G": "findNext",
            "Shift-Ctrl-G": "findPrev",
            "Shift-Ctrl-F": "replace",
            "Shift-Ctrl-R": "replaceAll",
            "Ctrl-[": "indentLess",
            "Ctrl-]": "indentMore",
            "Ctrl-U": "undoSelection",
            "Shift-Ctrl-U": "redoSelection",
            "Alt-U": "redoSelection",
            fallthrough: "basic",
          }),
          (Il.emacsy = {
            "Ctrl-F": "goCharRight",
            "Ctrl-B": "goCharLeft",
            "Ctrl-P": "goLineUp",
            "Ctrl-N": "goLineDown",
            "Ctrl-A": "goLineStart",
            "Ctrl-E": "goLineEnd",
            "Ctrl-V": "goPageDown",
            "Shift-Ctrl-V": "goPageUp",
            "Ctrl-D": "delCharAfter",
            "Ctrl-H": "delCharBefore",
            "Alt-Backspace": "delWordBefore",
            "Ctrl-K": "killLine",
            "Ctrl-T": "transposeChars",
            "Ctrl-O": "openLine",
          }),
          (Il.macDefault = {
            "Cmd-A": "selectAll",
            "Cmd-D": "deleteLine",
            "Cmd-Z": "undo",
            "Shift-Cmd-Z": "redo",
            "Cmd-Y": "redo",
            "Cmd-Home": "goDocStart",
            "Cmd-Up": "goDocStart",
            "Cmd-End": "goDocEnd",
            "Cmd-Down": "goDocEnd",
            "Alt-Left": "goGroupLeft",
            "Alt-Right": "goGroupRight",
            "Cmd-Left": "goLineLeft",
            "Cmd-Right": "goLineRight",
            "Alt-Backspace": "delGroupBefore",
            "Ctrl-Alt-Backspace": "delGroupAfter",
            "Alt-Delete": "delGroupAfter",
            "Cmd-S": "save",
            "Cmd-F": "find",
            "Cmd-G": "findNext",
            "Shift-Cmd-G": "findPrev",
            "Cmd-Alt-F": "replace",
            "Shift-Cmd-Alt-F": "replaceAll",
            "Cmd-[": "indentLess",
            "Cmd-]": "indentMore",
            "Cmd-Backspace": "delWrappedLineLeft",
            "Cmd-Delete": "delWrappedLineRight",
            "Cmd-U": "undoSelection",
            "Shift-Cmd-U": "redoSelection",
            "Ctrl-Up": "goDocStart",
            "Ctrl-Down": "goDocEnd",
            fallthrough: ["basic", "emacsy"],
          }),
          (Il.default = y ? Il.macDefault : Il.pcDefault);
        var ql = {
          selectAll: $o,
          singleSelection: function (e) {
            return e.setSelection(
              e.getCursor("anchor"),
              e.getCursor("head"),
              V
            );
          },
          killLine: function (e) {
            return jl(e, function (t) {
              if (t.empty()) {
                var r = qe(e.doc, t.head.line).text.length;
                return t.head.ch == r && t.head.line < e.lastLine()
                  ? { from: t.head, to: it(t.head.line + 1, 0) }
                  : { from: t.head, to: it(t.head.line, r) };
              }
              return { from: t.from(), to: t.to() };
            });
          },
          deleteLine: function (e) {
            return jl(e, function (t) {
              return {
                from: it(t.from().line, 0),
                to: ht(e.doc, it(t.to().line + 1, 0)),
              };
            });
          },
          delLineLeft: function (e) {
            return jl(e, function (e) {
              return { from: it(e.from().line, 0), to: e.from() };
            });
          },
          delWrappedLineLeft: function (e) {
            return jl(e, function (t) {
              var r = e.charCoords(t.head, "div").top + 5;
              return {
                from: e.coordsChar({ left: 0, top: r }, "div"),
                to: t.from(),
              };
            });
          },
          delWrappedLineRight: function (e) {
            return jl(e, function (t) {
              var r = e.charCoords(t.head, "div").top + 5,
                n = e.coordsChar(
                  { left: e.display.lineDiv.offsetWidth + 100, top: r },
                  "div"
                );
              return { from: t.from(), to: n };
            });
          },
          undo: function (e) {
            return e.undo();
          },
          redo: function (e) {
            return e.redo();
          },
          undoSelection: function (e) {
            return e.undoSelection();
          },
          redoSelection: function (e) {
            return e.redoSelection();
          },
          goDocStart: function (e) {
            return e.extendSelection(it(e.firstLine(), 0));
          },
          goDocEnd: function (e) {
            return e.extendSelection(it(e.lastLine()));
          },
          goLineStart: function (e) {
            return e.extendSelectionsBy(
              function (t) {
                return Zl(e, t.head.line);
              },
              { origin: "+move", bias: 1 }
            );
          },
          goLineStartSmart: function (e) {
            return e.extendSelectionsBy(
              function (t) {
                return Jl(e, t.head);
              },
              { origin: "+move", bias: 1 }
            );
          },
          goLineEnd: function (e) {
            return e.extendSelectionsBy(
              function (t) {
                return Ql(e, t.head.line);
              },
              { origin: "+move", bias: -1 }
            );
          },
          goLineRight: function (e) {
            return e.extendSelectionsBy(function (t) {
              var r = e.cursorCoords(t.head, "div").top + 5;
              return e.coordsChar(
                { left: e.display.lineDiv.offsetWidth + 100, top: r },
                "div"
              );
            }, j);
          },
          goLineLeft: function (e) {
            return e.extendSelectionsBy(function (t) {
              var r = e.cursorCoords(t.head, "div").top + 5;
              return e.coordsChar({ left: 0, top: r }, "div");
            }, j);
          },
          goLineLeftSmart: function (e) {
            return e.extendSelectionsBy(function (t) {
              var r = e.cursorCoords(t.head, "div").top + 5,
                n = e.coordsChar({ left: 0, top: r }, "div");
              return n.ch < e.getLine(n.line).search(/\S/) ? Jl(e, t.head) : n;
            }, j);
          },
          goLineUp: function (e) {
            return e.moveV(-1, "line");
          },
          goLineDown: function (e) {
            return e.moveV(1, "line");
          },
          goPageUp: function (e) {
            return e.moveV(-1, "page");
          },
          goPageDown: function (e) {
            return e.moveV(1, "page");
          },
          goCharLeft: function (e) {
            return e.moveH(-1, "char");
          },
          goCharRight: function (e) {
            return e.moveH(1, "char");
          },
          goColumnLeft: function (e) {
            return e.moveH(-1, "column");
          },
          goColumnRight: function (e) {
            return e.moveH(1, "column");
          },
          goWordLeft: function (e) {
            return e.moveH(-1, "word");
          },
          goGroupRight: function (e) {
            return e.moveH(1, "group");
          },
          goGroupLeft: function (e) {
            return e.moveH(-1, "group");
          },
          goWordRight: function (e) {
            return e.moveH(1, "word");
          },
          delCharBefore: function (e) {
            return e.deleteH(-1, "codepoint");
          },
          delCharAfter: function (e) {
            return e.deleteH(1, "char");
          },
          delWordBefore: function (e) {
            return e.deleteH(-1, "word");
          },
          delWordAfter: function (e) {
            return e.deleteH(1, "word");
          },
          delGroupBefore: function (e) {
            return e.deleteH(-1, "group");
          },
          delGroupAfter: function (e) {
            return e.deleteH(1, "group");
          },
          indentAuto: function (e) {
            return e.indentSelection("smart");
          },
          indentMore: function (e) {
            return e.indentSelection("add");
          },
          indentLess: function (e) {
            return e.indentSelection("subtract");
          },
          insertTab: function (e) {
            return e.replaceSelection("\t");
          },
          insertSoftTab: function (e) {
            for (
              var t = [], r = e.listSelections(), n = e.options.tabSize, i = 0;
              i < r.length;
              i++
            ) {
              var o = r[i].from(),
                l = R(e.getLine(o.line), o.ch, n);
              t.push(_(n - (l % n)));
            }
            e.replaceSelections(t);
          },
          defaultTab: function (e) {
            e.somethingSelected()
              ? e.indentSelection("add")
              : e.execCommand("insertTab");
          },
          transposeChars: function (e) {
            return Ai(e, function () {
              for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++)
                if (t[n].empty()) {
                  var i = t[n].head,
                    o = qe(e.doc, i.line).text;
                  if (o)
                    if (
                      (i.ch == o.length && (i = new it(i.line, i.ch - 1)),
                      i.ch > 0)
                    )
                      (i = new it(i.line, i.ch + 1)),
                        e.replaceRange(
                          o.charAt(i.ch - 1) + o.charAt(i.ch - 2),
                          it(i.line, i.ch - 2),
                          i,
                          "+transpose"
                        );
                    else if (i.line > e.doc.first) {
                      var l = qe(e.doc, i.line - 1).text;
                      l &&
                        ((i = new it(i.line, 1)),
                        e.replaceRange(
                          o.charAt(0) +
                            e.doc.lineSeparator() +
                            l.charAt(l.length - 1),
                          it(i.line - 1, l.length - 1),
                          i,
                          "+transpose"
                        ));
                    }
                  r.push(new io(i, i));
                }
              e.setSelections(r);
            });
          },
          newlineAndIndent: function (e) {
            return Ai(e, function () {
              for (var t = e.listSelections(), r = t.length - 1; r >= 0; r--)
                e.replaceRange(
                  e.doc.lineSeparator(),
                  t[r].anchor,
                  t[r].head,
                  "+input"
                );
              t = e.listSelections();
              for (var n = 0; n < t.length; n++)
                e.indentLine(t[n].from().line, null, !0);
              li(e);
            });
          },
          openLine: function (e) {
            return e.replaceSelection("\n", "start");
          },
          toggleOverwrite: function (e) {
            return e.toggleOverwrite();
          },
        };
        function Zl(e, t) {
          var r = qe(e.doc, t),
            n = Zt(r);
          return n != r && (t = et(n)), _l(!0, e, n, t, 1);
        }
        function Ql(e, t) {
          var r = qe(e.doc, t),
            n = Qt(r);
          return n != r && (t = et(n)), _l(!0, e, r, t, -1);
        }
        function Jl(e, t) {
          var r = Zl(e, t.line),
            n = qe(e.doc, r.line),
            i = fe(n, e.doc.direction);
          if (!i || 0 == i[0].level) {
            var o = Math.max(r.ch, n.text.search(/\S/)),
              l = t.line == r.line && t.ch <= o && t.ch;
            return it(r.line, l ? 0 : o, r.sticky);
          }
          return r;
        }
        function es(e, t, r) {
          if ("string" == typeof t && !(t = ql[t])) return !1;
          e.display.input.ensurePolled();
          var n = e.display.shift,
            i = !1;
          try {
            e.isReadOnly() && (e.state.suppressEdits = !0),
              r && (e.display.shift = !1),
              (i = t(e) != U);
          } finally {
            (e.display.shift = n), (e.state.suppressEdits = !1);
          }
          return i;
        }
        function ts(e, t, r) {
          for (var n = 0; n < e.state.keyMaps.length; n++) {
            var i = Bl(t, e.state.keyMaps[n], r, e);
            if (i) return i;
          }
          return (
            (e.options.extraKeys && Bl(t, e.options.extraKeys, r, e)) ||
            Bl(t, e.options.keyMap, r, e)
          );
        }
        var rs = new z();
        function ns(e, t, r, n) {
          var i = e.state.keySeq;
          if (i) {
            if (Gl(t)) return "handled";
            if (
              (/\'$/.test(t)
                ? (e.state.keySeq = null)
                : rs.set(50, function () {
                    e.state.keySeq == i &&
                      ((e.state.keySeq = null), e.display.input.reset());
                  }),
              is(e, i + " " + t, r, n))
            )
              return !0;
          }
          return is(e, t, r, n);
        }
        function is(e, t, r, n) {
          var i = ts(e, t, n);
          return (
            "multi" == i && (e.state.keySeq = t),
            "handled" == i && Mr(e, "keyHandled", e, t, r),
            ("handled" != i && "multi" != i) || (Ce(r), Yn(e)),
            !!i
          );
        }
        function os(e, t) {
          var r = Vl(t, !0);
          return (
            !!r &&
            (t.shiftKey && !e.state.keySeq
              ? ns(e, "Shift-" + r, t, function (t) {
                  return es(e, t, !0);
                }) ||
                ns(e, r, t, function (t) {
                  if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion)
                    return es(e, t);
                })
              : ns(e, r, t, function (t) {
                  return es(e, t);
                }))
          );
        }
        function ls(e, t, r) {
          return ns(e, "'" + r + "'", t, function (t) {
            return es(e, t, !0);
          });
        }
        var ss = null;
        function as(e) {
          var t = this;
          if (
            (!e.target || e.target == t.display.input.getField()) &&
            ((t.curOp.focus = W()), !ye(t, e))
          ) {
            l && s < 11 && 27 == e.keyCode && (e.returnValue = !1);
            var n = e.keyCode;
            t.display.shift = 16 == n || e.shiftKey;
            var i = os(t, e);
            h &&
              ((ss = i ? n : null),
              i ||
                88 != n ||
                Ee ||
                !(y ? e.metaKey : e.ctrlKey) ||
                t.replaceSelection("", null, "cut")),
              r &&
                !y &&
                !i &&
                46 == n &&
                e.shiftKey &&
                !e.ctrlKey &&
                document.execCommand &&
                document.execCommand("cut"),
              18 != n ||
                /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) ||
                us(t);
          }
        }
        function us(e) {
          var t = e.display.lineDiv;
          function r(e) {
            (18 != e.keyCode && e.altKey) ||
              (T(t, "CodeMirror-crosshair"),
              ve(document, "keyup", r),
              ve(document, "mouseover", r));
          }
          H(t, "CodeMirror-crosshair"),
            pe(document, "keyup", r),
            pe(document, "mouseover", r);
        }
        function cs(e) {
          16 == e.keyCode && (this.doc.sel.shift = !1), ye(this, e);
        }
        function hs(e) {
          var t = this;
          if (
            (!e.target || e.target == t.display.input.getField()) &&
            !(
              Ur(t.display, e) ||
              ye(t, e) ||
              (e.ctrlKey && !e.altKey) ||
              (y && e.metaKey)
            )
          ) {
            var r = e.keyCode,
              n = e.charCode;
            if (h && r == ss) return (ss = null), void Ce(e);
            if (!h || (e.which && !(e.which < 10)) || !os(t, e)) {
              var i = String.fromCharCode(null == n ? r : n);
              "\b" != i && (ls(t, e, i) || t.display.input.onKeyPress(e));
            }
          }
        }
        var fs,
          ds,
          ps = 400,
          gs = function (e, t, r) {
            (this.time = e), (this.pos = t), (this.button = r);
          };
        function vs(e, t) {
          var r = +new Date();
          return ds && ds.compare(r, e, t)
            ? ((fs = ds = null), "triple")
            : fs && fs.compare(r, e, t)
            ? ((ds = new gs(r, e, t)), (fs = null), "double")
            : ((fs = new gs(r, e, t)), (ds = null), "single");
        }
        function ms(e) {
          var t = this,
            r = t.display;
          if (!(ye(t, e) || (r.activeTouch && r.input.supportsTouch())))
            if ((r.input.ensurePolled(), (r.shift = e.shiftKey), Ur(r, e)))
              a ||
                ((r.scroller.draggable = !1),
                setTimeout(function () {
                  return (r.scroller.draggable = !0);
                }, 100));
            else if (!Ts(t, e)) {
              var n = Fn(t, e),
                i = Me(e),
                o = n ? vs(n, i) : "single";
              window.focus(),
                1 == i && t.state.selectingText && t.state.selectingText(e),
                (n && ys(t, i, n, o, e)) ||
                  (1 == i
                    ? n
                      ? ws(t, n, o, e)
                      : Te(e) == r.scroller && Ce(e)
                    : 2 == i
                    ? (n && Eo(t.doc, n),
                      setTimeout(function () {
                        return r.input.focus();
                      }, 20))
                    : 3 == i && (S ? t.display.input.onContextMenu(e) : $n(t)));
            }
        }
        function ys(e, t, r, n, i) {
          var o = "Click";
          return (
            "double" == n
              ? (o = "Double" + o)
              : "triple" == n && (o = "Triple" + o),
            ns(
              e,
              Ul((o = (1 == t ? "Left" : 2 == t ? "Middle" : "Right") + o), i),
              i,
              function (t) {
                if (("string" == typeof t && (t = ql[t]), !t)) return !1;
                var n = !1;
                try {
                  e.isReadOnly() && (e.state.suppressEdits = !0),
                    (n = t(e, r) != U);
                } finally {
                  e.state.suppressEdits = !1;
                }
                return n;
              }
            )
          );
        }
        function bs(e, t, r) {
          var n = e.getOption("configureMouse"),
            i = n ? n(e, t, r) : {};
          if (null == i.unit) {
            var o = b ? r.shiftKey && r.metaKey : r.altKey;
            i.unit = o
              ? "rectangle"
              : "single" == t
              ? "char"
              : "double" == t
              ? "word"
              : "line";
          }
          return (
            (null == i.extend || e.doc.extend) &&
              (i.extend = e.doc.extend || r.shiftKey),
            null == i.addNew && (i.addNew = y ? r.metaKey : r.ctrlKey),
            null == i.moveOnDrag &&
              (i.moveOnDrag = !(y ? r.altKey : r.ctrlKey)),
            i
          );
        }
        function ws(e, t, r, n) {
          l ? setTimeout(P(_n, e), 0) : (e.curOp.focus = W());
          var i,
            o = bs(e, r, n),
            s = e.doc.sel;
          e.options.dragDrop &&
          Ae &&
          !e.isReadOnly() &&
          "single" == r &&
          (i = s.contains(t)) > -1 &&
          (ot((i = s.ranges[i]).from(), t) < 0 || t.xRel > 0) &&
          (ot(i.to(), t) > 0 || t.xRel < 0)
            ? xs(e, n, t, o)
            : Ss(e, n, t, o);
        }
        function xs(e, t, r, n) {
          var i = e.display,
            o = !1,
            u = Di(e, function (t) {
              a && (i.scroller.draggable = !1),
                (e.state.draggingText = !1),
                e.state.delayingBlurEvent &&
                  (e.hasFocus() ? (e.state.delayingBlurEvent = !1) : $n(e)),
                ve(i.wrapper.ownerDocument, "mouseup", u),
                ve(i.wrapper.ownerDocument, "mousemove", c),
                ve(i.scroller, "dragstart", h),
                ve(i.scroller, "drop", u),
                o ||
                  (Ce(t),
                  n.addNew || Eo(e.doc, r, null, null, n.extend),
                  (a && !f) || (l && 9 == s)
                    ? setTimeout(function () {
                        i.wrapper.ownerDocument.body.focus({
                          preventScroll: !0,
                        }),
                          i.input.focus();
                      }, 20)
                    : i.input.focus());
            }),
            c = function (e) {
              o =
                o ||
                Math.abs(t.clientX - e.clientX) +
                  Math.abs(t.clientY - e.clientY) >=
                  10;
            },
            h = function () {
              return (o = !0);
            };
          a && (i.scroller.draggable = !0),
            (e.state.draggingText = u),
            (u.copy = !n.moveOnDrag),
            pe(i.wrapper.ownerDocument, "mouseup", u),
            pe(i.wrapper.ownerDocument, "mousemove", c),
            pe(i.scroller, "dragstart", h),
            pe(i.scroller, "drop", u),
            (e.state.delayingBlurEvent = !0),
            setTimeout(function () {
              return i.input.focus();
            }, 20),
            i.scroller.dragDrop && i.scroller.dragDrop();
        }
        function Cs(e, t, r) {
          if ("char" == r) return new io(t, t);
          if ("word" == r) return e.findWordAt(t);
          if ("line" == r)
            return new io(it(t.line, 0), ht(e.doc, it(t.line + 1, 0)));
          var n = r(e, t);
          return new io(n.from, n.to);
        }
        function Ss(e, t, r, n) {
          l && $n(e);
          var i = e.display,
            o = e.doc;
          Ce(t);
          var s,
            a,
            u = o.sel,
            c = u.ranges;
          if (
            (n.addNew && !n.extend
              ? ((a = o.sel.contains(r)), (s = a > -1 ? c[a] : new io(r, r)))
              : ((s = o.sel.primary()), (a = o.sel.primIndex)),
            "rectangle" == n.unit)
          )
            n.addNew || (s = new io(r, r)), (r = Fn(e, t, !0, !0)), (a = -1);
          else {
            var h = Cs(e, r, n.unit);
            s = n.extend ? Fo(s, h.anchor, h.head, n.extend) : h;
          }
          n.addNew
            ? -1 == a
              ? ((a = c.length),
                Go(o, oo(e, c.concat([s]), a), {
                  scroll: !1,
                  origin: "*mouse",
                }))
              : c.length > 1 && c[a].empty() && "char" == n.unit && !n.extend
              ? (Go(o, oo(e, c.slice(0, a).concat(c.slice(a + 1)), 0), {
                  scroll: !1,
                  origin: "*mouse",
                }),
                (u = o.sel))
              : Io(o, a, s, K)
            : ((a = 0), Go(o, new no([s], 0), K), (u = o.sel));
          var f = r;
          function d(t) {
            if (0 != ot(f, t))
              if (((f = t), "rectangle" == n.unit)) {
                for (
                  var i = [],
                    l = e.options.tabSize,
                    c = R(qe(o, r.line).text, r.ch, l),
                    h = R(qe(o, t.line).text, t.ch, l),
                    d = Math.min(c, h),
                    p = Math.max(c, h),
                    g = Math.min(r.line, t.line),
                    v = Math.min(e.lastLine(), Math.max(r.line, t.line));
                  g <= v;
                  g++
                ) {
                  var m = qe(o, g).text,
                    y = X(m, d, l);
                  d == p
                    ? i.push(new io(it(g, y), it(g, y)))
                    : m.length > y &&
                      i.push(new io(it(g, y), it(g, X(m, p, l))));
                }
                i.length || i.push(new io(r, r)),
                  Go(o, oo(e, u.ranges.slice(0, a).concat(i), a), {
                    origin: "*mouse",
                    scroll: !1,
                  }),
                  e.scrollIntoView(t);
              } else {
                var b,
                  w = s,
                  x = Cs(e, t, n.unit),
                  C = w.anchor;
                ot(x.anchor, C) > 0
                  ? ((b = x.head), (C = ut(w.from(), x.anchor)))
                  : ((b = x.anchor), (C = at(w.to(), x.head)));
                var S = u.ranges.slice(0);
                (S[a] = Ls(e, new io(ht(o, C), b))), Go(o, oo(e, S, a), K);
              }
          }
          var p = i.wrapper.getBoundingClientRect(),
            g = 0;
          function v(t) {
            var r = ++g,
              l = Fn(e, t, !0, "rectangle" == n.unit);
            if (l)
              if (0 != ot(l, f)) {
                (e.curOp.focus = W()), d(l);
                var s = ei(i, o);
                (l.line >= s.to || l.line < s.from) &&
                  setTimeout(
                    Di(e, function () {
                      g == r && v(t);
                    }),
                    150
                  );
              } else {
                var a = t.clientY < p.top ? -20 : t.clientY > p.bottom ? 20 : 0;
                a &&
                  setTimeout(
                    Di(e, function () {
                      g == r && ((i.scroller.scrollTop += a), v(t));
                    }),
                    50
                  );
              }
          }
          function m(t) {
            (e.state.selectingText = !1),
              (g = 1 / 0),
              t && (Ce(t), i.input.focus()),
              ve(i.wrapper.ownerDocument, "mousemove", y),
              ve(i.wrapper.ownerDocument, "mouseup", b),
              (o.history.lastSelOrigin = null);
          }
          var y = Di(e, function (e) {
              0 !== e.buttons && Me(e) ? v(e) : m(e);
            }),
            b = Di(e, m);
          (e.state.selectingText = b),
            pe(i.wrapper.ownerDocument, "mousemove", y),
            pe(i.wrapper.ownerDocument, "mouseup", b);
        }
        function Ls(e, t) {
          var r = t.anchor,
            n = t.head,
            i = qe(e.doc, r.line);
          if (0 == ot(r, n) && r.sticky == n.sticky) return t;
          var o = fe(i);
          if (!o) return t;
          var l = ce(o, r.ch, r.sticky),
            s = o[l];
          if (s.from != r.ch && s.to != r.ch) return t;
          var a,
            u = l + ((s.from == r.ch) == (1 != s.level) ? 0 : 1);
          if (0 == u || u == o.length) return t;
          if (n.line != r.line)
            a = (n.line - r.line) * ("ltr" == e.doc.direction ? 1 : -1) > 0;
          else {
            var c = ce(o, n.ch, n.sticky),
              h = c - l || (n.ch - r.ch) * (1 == s.level ? -1 : 1);
            a = c == u - 1 || c == u ? h < 0 : h > 0;
          }
          var f = o[u + (a ? -1 : 0)],
            d = a == (1 == f.level),
            p = d ? f.from : f.to,
            g = d ? "after" : "before";
          return r.ch == p && r.sticky == g
            ? t
            : new io(new it(r.line, p, g), n);
        }
        function ks(e, t, r, n) {
          var i, o;
          if (t.touches) (i = t.touches[0].clientX), (o = t.touches[0].clientY);
          else
            try {
              (i = t.clientX), (o = t.clientY);
            } catch (c) {
              return !1;
            }
          if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right))
            return !1;
          n && Ce(t);
          var l = e.display,
            s = l.lineDiv.getBoundingClientRect();
          if (o > s.bottom || !we(e, r)) return Le(t);
          o -= s.top - l.viewOffset;
          for (var a = 0; a < e.display.gutterSpecs.length; ++a) {
            var u = l.gutters.childNodes[a];
            if (u && u.getBoundingClientRect().right >= i)
              return (
                me(
                  e,
                  r,
                  e,
                  tt(e.doc, o),
                  e.display.gutterSpecs[a].className,
                  t
                ),
                Le(t)
              );
          }
        }
        function Ts(e, t) {
          return ks(e, t, "gutterClick", !0);
        }
        function Ms(e, t) {
          Ur(e.display, t) ||
            Ns(e, t) ||
            ye(e, t, "contextmenu") ||
            S ||
            e.display.input.onContextMenu(t);
        }
        function Ns(e, t) {
          return (
            !!we(e, "gutterContextMenu") && ks(e, t, "gutterContextMenu", !1)
          );
        }
        function Os(e) {
          (e.display.wrapper.className =
            e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
            e.options.theme.replace(/(^|\s)\s*/g, " cm-s-")),
            hn(e);
        }
        gs.prototype.compare = function (e, t, r) {
          return this.time + ps > e && 0 == ot(t, this.pos) && r == this.button;
        };
        var As = {
            toString: function () {
              return "CodeMirror.Init";
            },
          },
          Ds = {},
          Ws = {};
        function Hs(e) {
          var t = e.optionHandlers;
          function r(r, n, i, o) {
            (e.defaults[r] = n),
              i &&
                (t[r] = o
                  ? function (e, t, r) {
                      r != As && i(e, t, r);
                    }
                  : i);
          }
          (e.defineOption = r),
            (e.Init = As),
            r(
              "value",
              "",
              function (e, t) {
                return e.setValue(t);
              },
              !0
            ),
            r(
              "mode",
              null,
              function (e, t) {
                (e.doc.modeOption = t), fo(e);
              },
              !0
            ),
            r("indentUnit", 2, fo, !0),
            r("indentWithTabs", !1),
            r("smartIndent", !0),
            r(
              "tabSize",
              4,
              function (e) {
                po(e), hn(e), Pn(e);
              },
              !0
            ),
            r("lineSeparator", null, function (e, t) {
              if (((e.doc.lineSep = t), t)) {
                var r = [],
                  n = e.doc.first;
                e.doc.iter(function (e) {
                  for (var i = 0; ; ) {
                    var o = e.text.indexOf(t, i);
                    if (-1 == o) break;
                    (i = o + t.length), r.push(it(n, o));
                  }
                  n++;
                });
                for (var i = r.length - 1; i >= 0; i--)
                  nl(e.doc, t, r[i], it(r[i].line, r[i].ch + t.length));
              }
            }),
            r(
              "specialChars",
              /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g,
              function (e, t, r) {
                (e.state.specialChars = new RegExp(
                  t.source + (t.test("\t") ? "" : "|\t"),
                  "g"
                )),
                  r != As && e.refresh();
              }
            ),
            r(
              "specialCharPlaceholder",
              pr,
              function (e) {
                return e.refresh();
              },
              !0
            ),
            r("electricChars", !0),
            r(
              "inputStyle",
              m ? "contenteditable" : "textarea",
              function () {
                throw new Error(
                  "inputStyle can not (yet) be changed in a running editor"
                );
              },
              !0
            ),
            r(
              "spellcheck",
              !1,
              function (e, t) {
                return (e.getInputField().spellcheck = t);
              },
              !0
            ),
            r(
              "autocorrect",
              !1,
              function (e, t) {
                return (e.getInputField().autocorrect = t);
              },
              !0
            ),
            r(
              "autocapitalize",
              !1,
              function (e, t) {
                return (e.getInputField().autocapitalize = t);
              },
              !0
            ),
            r("rtlMoveVisually", !w),
            r("wholeLineUpdateBefore", !0),
            r(
              "theme",
              "default",
              function (e) {
                Os(e), qi(e);
              },
              !0
            ),
            r("keyMap", "default", function (e, t, r) {
              var n = Kl(t),
                i = r != As && Kl(r);
              i && i.detach && i.detach(e, n),
                n.attach && n.attach(e, i || null);
            }),
            r("extraKeys", null),
            r("configureMouse", null),
            r("lineWrapping", !1, Es, !0),
            r(
              "gutters",
              [],
              function (e, t) {
                (e.display.gutterSpecs = _i(t, e.options.lineNumbers)), qi(e);
              },
              !0
            ),
            r(
              "fixedGutter",
              !0,
              function (e, t) {
                (e.display.gutters.style.left = t ? Dn(e.display) + "px" : "0"),
                  e.refresh();
              },
              !0
            ),
            r(
              "coverGutterNextToScrollbar",
              !1,
              function (e) {
                return mi(e);
              },
              !0
            ),
            r(
              "scrollbarStyle",
              "native",
              function (e) {
                wi(e),
                  mi(e),
                  e.display.scrollbars.setScrollTop(e.doc.scrollTop),
                  e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
              },
              !0
            ),
            r(
              "lineNumbers",
              !1,
              function (e, t) {
                (e.display.gutterSpecs = _i(e.options.gutters, t)), qi(e);
              },
              !0
            ),
            r("firstLineNumber", 1, qi, !0),
            r(
              "lineNumberFormatter",
              function (e) {
                return e;
              },
              qi,
              !0
            ),
            r("showCursorWhenSelecting", !1, Un, !0),
            r("resetSelectionOnContextMenu", !0),
            r("lineWiseCopyCut", !0),
            r("pasteLinesPerSelection", !0),
            r("selectionsMayTouch", !1),
            r("readOnly", !1, function (e, t) {
              "nocursor" == t && (Zn(e), e.display.input.blur()),
                e.display.input.readOnlyChanged(t);
            }),
            r("screenReaderLabel", null, function (e, t) {
              (t = "" === t ? null : t),
                e.display.input.screenReaderLabelChanged(t);
            }),
            r(
              "disableInput",
              !1,
              function (e, t) {
                t || e.display.input.reset();
              },
              !0
            ),
            r("dragDrop", !0, Fs),
            r("allowDropFileTypes", null),
            r("cursorBlinkRate", 530),
            r("cursorScrollMargin", 0),
            r("cursorHeight", 1, Un, !0),
            r("singleCursorHeightPerLine", !0, Un, !0),
            r("workTime", 100),
            r("workDelay", 100),
            r("flattenSpans", !0, po, !0),
            r("addModeClass", !1, po, !0),
            r("pollInterval", 100),
            r("undoDepth", 200, function (e, t) {
              return (e.doc.history.undoDepth = t);
            }),
            r("historyEventDelay", 1250),
            r(
              "viewportMargin",
              10,
              function (e) {
                return e.refresh();
              },
              !0
            ),
            r("maxHighlightLength", 1e4, po, !0),
            r("moveInputWithCursor", !0, function (e, t) {
              t || e.display.input.resetPosition();
            }),
            r("tabindex", null, function (e, t) {
              return (e.display.input.getField().tabIndex = t || "");
            }),
            r("autofocus", null),
            r(
              "direction",
              "ltr",
              function (e, t) {
                return e.doc.setDirection(t);
              },
              !0
            ),
            r("phrases", null);
        }
        function Fs(e, t, r) {
          if (!t != !(r && r != As)) {
            var n = e.display.dragFunctions,
              i = t ? pe : ve;
            i(e.display.scroller, "dragstart", n.start),
              i(e.display.scroller, "dragenter", n.enter),
              i(e.display.scroller, "dragover", n.over),
              i(e.display.scroller, "dragleave", n.leave),
              i(e.display.scroller, "drop", n.drop);
          }
        }
        function Es(e) {
          e.options.lineWrapping
            ? (H(e.display.wrapper, "CodeMirror-wrap"),
              (e.display.sizer.style.minWidth = ""),
              (e.display.sizerWidth = null))
            : (T(e.display.wrapper, "CodeMirror-wrap"), lr(e)),
            Hn(e),
            Pn(e),
            hn(e),
            setTimeout(function () {
              return mi(e);
            }, 100);
        }
        function Ps(e, t) {
          var r = this;
          if (!(this instanceof Ps)) return new Ps(e, t);
          (this.options = t = t ? I(t) : {}), I(Ds, t, !1);
          var n = t.value;
          "string" == typeof n
            ? (n = new Cl(n, t.mode, null, t.lineSeparator, t.direction))
            : t.mode && (n.modeOption = t.mode),
            (this.doc = n);
          var i = new Ps.inputStyles[t.inputStyle](this),
            o = (this.display = new Zi(e, n, i, t));
          for (var u in ((o.wrapper.CodeMirror = this),
          Os(this),
          t.lineWrapping &&
            (this.display.wrapper.className += " CodeMirror-wrap"),
          wi(this),
          (this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            delayingBlurEvent: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: -1,
            cutIncoming: -1,
            selectingText: !1,
            draggingText: !1,
            highlight: new z(),
            keySeq: null,
            specialChars: null,
          }),
          t.autofocus && !m && o.input.focus(),
          l &&
            s < 11 &&
            setTimeout(function () {
              return r.display.input.reset(!0);
            }, 20),
          Is(this),
          Al(),
          Ci(this),
          (this.curOp.forceUpdate = !0),
          yo(this, n),
          (t.autofocus && !m) || this.hasFocus()
            ? setTimeout(function () {
                r.hasFocus() && !r.state.focused && qn(r);
              }, 20)
            : Zn(this),
          Ws))
            Ws.hasOwnProperty(u) && Ws[u](this, t[u], As);
          Yi(this), t.finishInit && t.finishInit(this);
          for (var c = 0; c < Rs.length; ++c) Rs[c](this);
          Si(this),
            a &&
              t.lineWrapping &&
              "optimizelegibility" ==
                getComputedStyle(o.lineDiv).textRendering &&
              (o.lineDiv.style.textRendering = "auto");
        }
        function Is(e) {
          var t = e.display;
          pe(t.scroller, "mousedown", Di(e, ms)),
            pe(
              t.scroller,
              "dblclick",
              l && s < 11
                ? Di(e, function (t) {
                    if (!ye(e, t)) {
                      var r = Fn(e, t);
                      if (r && !Ts(e, t) && !Ur(e.display, t)) {
                        Ce(t);
                        var n = e.findWordAt(r);
                        Eo(e.doc, n.anchor, n.head);
                      }
                    }
                  })
                : function (t) {
                    return ye(e, t) || Ce(t);
                  }
            ),
            pe(t.scroller, "contextmenu", function (t) {
              return Ms(e, t);
            }),
            pe(t.input.getField(), "contextmenu", function (r) {
              t.scroller.contains(r.target) || Ms(e, r);
            });
          var r,
            n = { end: 0 };
          function i() {
            t.activeTouch &&
              ((r = setTimeout(function () {
                return (t.activeTouch = null);
              }, 1e3)),
              ((n = t.activeTouch).end = +new Date()));
          }
          function o(e) {
            if (1 != e.touches.length) return !1;
            var t = e.touches[0];
            return t.radiusX <= 1 && t.radiusY <= 1;
          }
          function a(e, t) {
            if (null == t.left) return !0;
            var r = t.left - e.left,
              n = t.top - e.top;
            return r * r + n * n > 400;
          }
          pe(t.scroller, "touchstart", function (i) {
            if (!ye(e, i) && !o(i) && !Ts(e, i)) {
              t.input.ensurePolled(), clearTimeout(r);
              var l = +new Date();
              (t.activeTouch = {
                start: l,
                moved: !1,
                prev: l - n.end <= 300 ? n : null,
              }),
                1 == i.touches.length &&
                  ((t.activeTouch.left = i.touches[0].pageX),
                  (t.activeTouch.top = i.touches[0].pageY));
            }
          }),
            pe(t.scroller, "touchmove", function () {
              t.activeTouch && (t.activeTouch.moved = !0);
            }),
            pe(t.scroller, "touchend", function (r) {
              var n = t.activeTouch;
              if (
                n &&
                !Ur(t, r) &&
                null != n.left &&
                !n.moved &&
                new Date() - n.start < 300
              ) {
                var o,
                  l = e.coordsChar(t.activeTouch, "page");
                (o =
                  !n.prev || a(n, n.prev)
                    ? new io(l, l)
                    : !n.prev.prev || a(n, n.prev.prev)
                    ? e.findWordAt(l)
                    : new io(it(l.line, 0), ht(e.doc, it(l.line + 1, 0)))),
                  e.setSelection(o.anchor, o.head),
                  e.focus(),
                  Ce(r);
              }
              i();
            }),
            pe(t.scroller, "touchcancel", i),
            pe(t.scroller, "scroll", function () {
              t.scroller.clientHeight &&
                (hi(e, t.scroller.scrollTop),
                di(e, t.scroller.scrollLeft, !0),
                me(e, "scroll", e));
            }),
            pe(t.scroller, "mousewheel", function (t) {
              return ro(e, t);
            }),
            pe(t.scroller, "DOMMouseScroll", function (t) {
              return ro(e, t);
            }),
            pe(t.wrapper, "scroll", function () {
              return (t.wrapper.scrollTop = t.wrapper.scrollLeft = 0);
            }),
            (t.dragFunctions = {
              enter: function (t) {
                ye(e, t) || ke(t);
              },
              over: function (t) {
                ye(e, t) || (Tl(e, t), ke(t));
              },
              start: function (t) {
                return kl(e, t);
              },
              drop: Di(e, Ll),
              leave: function (t) {
                ye(e, t) || Ml(e);
              },
            });
          var u = t.input.getField();
          pe(u, "keyup", function (t) {
            return cs.call(e, t);
          }),
            pe(u, "keydown", Di(e, as)),
            pe(u, "keypress", Di(e, hs)),
            pe(u, "focus", function (t) {
              return qn(e, t);
            }),
            pe(u, "blur", function (t) {
              return Zn(e, t);
            });
        }
        (Ps.defaults = Ds), (Ps.optionHandlers = Ws);
        var Rs = [];
        function zs(e, t, r, n) {
          var i,
            o = e.doc;
          null == r && (r = "add"),
            "smart" == r &&
              (o.mode.indent ? (i = yt(e, t).state) : (r = "prev"));
          var l = e.options.tabSize,
            s = qe(o, t),
            a = R(s.text, null, l);
          s.stateAfter && (s.stateAfter = null);
          var u,
            c = s.text.match(/^\s*/)[0];
          if (n || /\S/.test(s.text)) {
            if (
              "smart" == r &&
              ((u = o.mode.indent(i, s.text.slice(c.length), s.text)) == U ||
                u > 150)
            ) {
              if (!n) return;
              r = "prev";
            }
          } else (u = 0), (r = "not");
          "prev" == r
            ? (u = t > o.first ? R(qe(o, t - 1).text, null, l) : 0)
            : "add" == r
            ? (u = a + e.options.indentUnit)
            : "subtract" == r
            ? (u = a - e.options.indentUnit)
            : "number" == typeof r && (u = a + r),
            (u = Math.max(0, u));
          var h = "",
            f = 0;
          if (e.options.indentWithTabs)
            for (var d = Math.floor(u / l); d; --d) (f += l), (h += "\t");
          if ((f < u && (h += _(u - f)), h != c))
            return (
              nl(o, h, it(t, 0), it(t, c.length), "+input"),
              (s.stateAfter = null),
              !0
            );
          for (var p = 0; p < o.sel.ranges.length; p++) {
            var g = o.sel.ranges[p];
            if (g.head.line == t && g.head.ch < c.length) {
              var v = it(t, c.length);
              Io(o, p, new io(v, v));
              break;
            }
          }
        }
        Ps.defineInitHook = function (e) {
          return Rs.push(e);
        };
        var Bs = null;
        function Gs(e) {
          Bs = e;
        }
        function Us(e, t, r, n, i) {
          var o = e.doc;
          (e.display.shift = !1), n || (n = o.sel);
          var l = +new Date() - 200,
            s = "paste" == i || e.state.pasteIncoming > l,
            a = He(t),
            u = null;
          if (s && n.ranges.length > 1)
            if (Bs && Bs.text.join("\n") == t) {
              if (n.ranges.length % Bs.text.length == 0) {
                u = [];
                for (var c = 0; c < Bs.text.length; c++)
                  u.push(o.splitLines(Bs.text[c]));
              }
            } else
              a.length == n.ranges.length &&
                e.options.pasteLinesPerSelection &&
                (u = q(a, function (e) {
                  return [e];
                }));
          for (
            var h = e.curOp.updateInput, f = n.ranges.length - 1;
            f >= 0;
            f--
          ) {
            var d = n.ranges[f],
              p = d.from(),
              g = d.to();
            d.empty() &&
              (r && r > 0
                ? (p = it(p.line, p.ch - r))
                : e.state.overwrite && !s
                ? (g = it(
                    g.line,
                    Math.min(qe(o, g.line).text.length, g.ch + $(a).length)
                  ))
                : s &&
                  Bs &&
                  Bs.lineWise &&
                  Bs.text.join("\n") == a.join("\n") &&
                  (p = g = it(p.line, 0)));
            var v = {
              from: p,
              to: g,
              text: u ? u[f % u.length] : a,
              origin:
                i || (s ? "paste" : e.state.cutIncoming > l ? "cut" : "+input"),
            };
            Zo(e.doc, v), Mr(e, "inputRead", e, v);
          }
          t && !s && Ks(e, t),
            li(e),
            e.curOp.updateInput < 2 && (e.curOp.updateInput = h),
            (e.curOp.typing = !0),
            (e.state.pasteIncoming = e.state.cutIncoming = -1);
        }
        function Vs(e, t) {
          var r = e.clipboardData && e.clipboardData.getData("Text");
          if (r)
            return (
              e.preventDefault(),
              t.isReadOnly() ||
                t.options.disableInput ||
                Ai(t, function () {
                  return Us(t, r, 0, null, "paste");
                }),
              !0
            );
        }
        function Ks(e, t) {
          if (e.options.electricChars && e.options.smartIndent)
            for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
              var i = r.ranges[n];
              if (
                !(
                  i.head.ch > 100 ||
                  (n && r.ranges[n - 1].head.line == i.head.line)
                )
              ) {
                var o = e.getModeAt(i.head),
                  l = !1;
                if (o.electricChars) {
                  for (var s = 0; s < o.electricChars.length; s++)
                    if (t.indexOf(o.electricChars.charAt(s)) > -1) {
                      l = zs(e, i.head.line, "smart");
                      break;
                    }
                } else
                  o.electricInput &&
                    o.electricInput.test(
                      qe(e.doc, i.head.line).text.slice(0, i.head.ch)
                    ) &&
                    (l = zs(e, i.head.line, "smart"));
                l && Mr(e, "electricInput", e, i.head.line);
              }
            }
        }
        function js(e) {
          for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
            var i = e.doc.sel.ranges[n].head.line,
              o = { anchor: it(i, 0), head: it(i + 1, 0) };
            r.push(o), t.push(e.getRange(o.anchor, o.head));
          }
          return { text: t, ranges: r };
        }
        function Xs(e, t, r, n) {
          e.setAttribute("autocorrect", r ? "" : "off"),
            e.setAttribute("autocapitalize", n ? "" : "off"),
            e.setAttribute("spellcheck", !!t);
        }
        function Ys() {
          var e = O(
              "textarea",
              null,
              null,
              "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"
            ),
            t = O(
              "div",
              [e],
              null,
              "overflow: hidden; position: relative; width: 3px; height: 0px;"
            );
          return (
            a ? (e.style.width = "1000px") : e.setAttribute("wrap", "off"),
            g && (e.style.border = "1px solid black"),
            Xs(e),
            t
          );
        }
        function _s(e) {
          var t = e.optionHandlers,
            r = (e.helpers = {});
          (e.prototype = {
            constructor: e,
            focus: function () {
              window.focus(), this.display.input.focus();
            },
            setOption: function (e, r) {
              var n = this.options,
                i = n[e];
              (n[e] == r && "mode" != e) ||
                ((n[e] = r),
                t.hasOwnProperty(e) && Di(this, t[e])(this, r, i),
                me(this, "optionChange", this, e));
            },
            getOption: function (e) {
              return this.options[e];
            },
            getDoc: function () {
              return this.doc;
            },
            addKeyMap: function (e, t) {
              this.state.keyMaps[t ? "push" : "unshift"](Kl(e));
            },
            removeKeyMap: function (e) {
              for (var t = this.state.keyMaps, r = 0; r < t.length; ++r)
                if (t[r] == e || t[r].name == e) return t.splice(r, 1), !0;
            },
            addOverlay: Wi(function (t, r) {
              var n = t.token ? t : e.getMode(this.options, t);
              if (n.startState)
                throw new Error("Overlays may not be stateful.");
              Z(
                this.state.overlays,
                {
                  mode: n,
                  modeSpec: t,
                  opaque: r && r.opaque,
                  priority: (r && r.priority) || 0,
                },
                function (e) {
                  return e.priority;
                }
              ),
                this.state.modeGen++,
                Pn(this);
            }),
            removeOverlay: Wi(function (e) {
              for (var t = this.state.overlays, r = 0; r < t.length; ++r) {
                var n = t[r].modeSpec;
                if (n == e || ("string" == typeof e && n.name == e))
                  return t.splice(r, 1), this.state.modeGen++, void Pn(this);
              }
            }),
            indentLine: Wi(function (e, t, r) {
              "string" != typeof t &&
                "number" != typeof t &&
                (t =
                  null == t
                    ? this.options.smartIndent
                      ? "smart"
                      : "prev"
                    : t
                    ? "add"
                    : "subtract"),
                rt(this.doc, e) && zs(this, e, t, r);
            }),
            indentSelection: Wi(function (e) {
              for (
                var t = this.doc.sel.ranges, r = -1, n = 0;
                n < t.length;
                n++
              ) {
                var i = t[n];
                if (i.empty())
                  i.head.line > r &&
                    (zs(this, i.head.line, e, !0),
                    (r = i.head.line),
                    n == this.doc.sel.primIndex && li(this));
                else {
                  var o = i.from(),
                    l = i.to(),
                    s = Math.max(r, o.line);
                  r = Math.min(this.lastLine(), l.line - (l.ch ? 0 : 1)) + 1;
                  for (var a = s; a < r; ++a) zs(this, a, e);
                  var u = this.doc.sel.ranges;
                  0 == o.ch &&
                    t.length == u.length &&
                    u[n].from().ch > 0 &&
                    Io(this.doc, n, new io(o, u[n].to()), V);
                }
              }
            }),
            getTokenAt: function (e, t) {
              return St(this, e, t);
            },
            getLineTokens: function (e, t) {
              return St(this, it(e), t, !0);
            },
            getTokenTypeAt: function (e) {
              e = ht(this.doc, e);
              var t,
                r = mt(this, qe(this.doc, e.line)),
                n = 0,
                i = (r.length - 1) / 2,
                o = e.ch;
              if (0 == o) t = r[2];
              else
                for (;;) {
                  var l = (n + i) >> 1;
                  if ((l ? r[2 * l - 1] : 0) >= o) i = l;
                  else {
                    if (!(r[2 * l + 1] < o)) {
                      t = r[2 * l + 2];
                      break;
                    }
                    n = l + 1;
                  }
                }
              var s = t ? t.indexOf("overlay ") : -1;
              return s < 0 ? t : 0 == s ? null : t.slice(0, s - 1);
            },
            getModeAt: function (t) {
              var r = this.doc.mode;
              return r.innerMode
                ? e.innerMode(r, this.getTokenAt(t).state).mode
                : r;
            },
            getHelper: function (e, t) {
              return this.getHelpers(e, t)[0];
            },
            getHelpers: function (e, t) {
              var n = [];
              if (!r.hasOwnProperty(t)) return n;
              var i = r[t],
                o = this.getModeAt(e);
              if ("string" == typeof o[t]) i[o[t]] && n.push(i[o[t]]);
              else if (o[t])
                for (var l = 0; l < o[t].length; l++) {
                  var s = i[o[t][l]];
                  s && n.push(s);
                }
              else
                o.helperType && i[o.helperType]
                  ? n.push(i[o.helperType])
                  : i[o.name] && n.push(i[o.name]);
              for (var a = 0; a < i._global.length; a++) {
                var u = i._global[a];
                u.pred(o, this) && -1 == B(n, u.val) && n.push(u.val);
              }
              return n;
            },
            getStateAfter: function (e, t) {
              var r = this.doc;
              return yt(
                this,
                (e = ct(r, null == e ? r.first + r.size - 1 : e)) + 1,
                t
              ).state;
            },
            cursorCoords: function (e, t) {
              var r = this.doc.sel.primary();
              return yn(
                this,
                null == e
                  ? r.head
                  : "object" == typeof e
                  ? ht(this.doc, e)
                  : e
                  ? r.from()
                  : r.to(),
                t || "page"
              );
            },
            charCoords: function (e, t) {
              return mn(this, ht(this.doc, e), t || "page");
            },
            coordsChar: function (e, t) {
              return xn(this, (e = vn(this, e, t || "page")).left, e.top);
            },
            lineAtHeight: function (e, t) {
              return (
                (e = vn(this, { top: e, left: 0 }, t || "page").top),
                tt(this.doc, e + this.display.viewOffset)
              );
            },
            heightAtLine: function (e, t, r) {
              var n,
                i = !1;
              if ("number" == typeof e) {
                var o = this.doc.first + this.doc.size - 1;
                e < this.doc.first
                  ? (e = this.doc.first)
                  : e > o && ((e = o), (i = !0)),
                  (n = qe(this.doc, e));
              } else n = e;
              return (
                gn(this, n, { top: 0, left: 0 }, t || "page", r || i).top +
                (i ? this.doc.height - ir(n) : 0)
              );
            },
            defaultTextHeight: function () {
              return Nn(this.display);
            },
            defaultCharWidth: function () {
              return On(this.display);
            },
            getViewport: function () {
              return { from: this.display.viewFrom, to: this.display.viewTo };
            },
            addWidget: function (e, t, r, n, i) {
              var o = this.display,
                l = (e = yn(this, ht(this.doc, e))).bottom,
                s = e.left;
              if (
                ((t.style.position = "absolute"),
                t.setAttribute("cm-ignore-events", "true"),
                this.display.input.setUneditable(t),
                o.sizer.appendChild(t),
                "over" == n)
              )
                l = e.top;
              else if ("above" == n || "near" == n) {
                var a = Math.max(o.wrapper.clientHeight, this.doc.height),
                  u = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                ("above" == n || e.bottom + t.offsetHeight > a) &&
                e.top > t.offsetHeight
                  ? (l = e.top - t.offsetHeight)
                  : e.bottom + t.offsetHeight <= a && (l = e.bottom),
                  s + t.offsetWidth > u && (s = u - t.offsetWidth);
              }
              (t.style.top = l + "px"),
                (t.style.left = t.style.right = ""),
                "right" == i
                  ? ((s = o.sizer.clientWidth - t.offsetWidth),
                    (t.style.right = "0px"))
                  : ("left" == i
                      ? (s = 0)
                      : "middle" == i &&
                        (s = (o.sizer.clientWidth - t.offsetWidth) / 2),
                    (t.style.left = s + "px")),
                r &&
                  ni(this, {
                    left: s,
                    top: l,
                    right: s + t.offsetWidth,
                    bottom: l + t.offsetHeight,
                  });
            },
            triggerOnKeyDown: Wi(as),
            triggerOnKeyPress: Wi(hs),
            triggerOnKeyUp: cs,
            triggerOnMouseDown: Wi(ms),
            execCommand: function (e) {
              if (ql.hasOwnProperty(e)) return ql[e].call(null, this);
            },
            triggerElectric: Wi(function (e) {
              Ks(this, e);
            }),
            findPosH: function (e, t, r, n) {
              var i = 1;
              t < 0 && ((i = -1), (t = -t));
              for (
                var o = ht(this.doc, e), l = 0;
                l < t && !(o = $s(this.doc, o, i, r, n)).hitSide;
                ++l
              );
              return o;
            },
            moveH: Wi(function (e, t) {
              var r = this;
              this.extendSelectionsBy(function (n) {
                return r.display.shift || r.doc.extend || n.empty()
                  ? $s(r.doc, n.head, e, t, r.options.rtlMoveVisually)
                  : e < 0
                  ? n.from()
                  : n.to();
              }, j);
            }),
            deleteH: Wi(function (e, t) {
              var r = this.doc.sel,
                n = this.doc;
              r.somethingSelected()
                ? n.replaceSelection("", null, "+delete")
                : jl(this, function (r) {
                    var i = $s(n, r.head, e, t, !1);
                    return e < 0
                      ? { from: i, to: r.head }
                      : { from: r.head, to: i };
                  });
            }),
            findPosV: function (e, t, r, n) {
              var i = 1,
                o = n;
              t < 0 && ((i = -1), (t = -t));
              for (var l = ht(this.doc, e), s = 0; s < t; ++s) {
                var a = yn(this, l, "div");
                if (
                  (null == o ? (o = a.left) : (a.left = o),
                  (l = qs(this, a, i, r)).hitSide)
                )
                  break;
              }
              return l;
            },
            moveV: Wi(function (e, t) {
              var r = this,
                n = this.doc,
                i = [],
                o =
                  !this.display.shift && !n.extend && n.sel.somethingSelected();
              if (
                (n.extendSelectionsBy(function (l) {
                  if (o) return e < 0 ? l.from() : l.to();
                  var s = yn(r, l.head, "div");
                  null != l.goalColumn && (s.left = l.goalColumn),
                    i.push(s.left);
                  var a = qs(r, s, e, t);
                  return (
                    "page" == t &&
                      l == n.sel.primary() &&
                      oi(r, mn(r, a, "div").top - s.top),
                    a
                  );
                }, j),
                i.length)
              )
                for (var l = 0; l < n.sel.ranges.length; l++)
                  n.sel.ranges[l].goalColumn = i[l];
            }),
            findWordAt: function (e) {
              var t = qe(this.doc, e.line).text,
                r = e.ch,
                n = e.ch;
              if (t) {
                var i = this.getHelper(e, "wordChars");
                ("before" != e.sticky && n != t.length) || !r ? ++n : --r;
                for (
                  var o = t.charAt(r),
                    l = re(o, i)
                      ? function (e) {
                          return re(e, i);
                        }
                      : /\s/.test(o)
                      ? function (e) {
                          return /\s/.test(e);
                        }
                      : function (e) {
                          return !/\s/.test(e) && !re(e);
                        };
                  r > 0 && l(t.charAt(r - 1));

                )
                  --r;
                for (; n < t.length && l(t.charAt(n)); ) ++n;
              }
              return new io(it(e.line, r), it(e.line, n));
            },
            toggleOverwrite: function (e) {
              (null != e && e == this.state.overwrite) ||
                ((this.state.overwrite = !this.state.overwrite)
                  ? H(this.display.cursorDiv, "CodeMirror-overwrite")
                  : T(this.display.cursorDiv, "CodeMirror-overwrite"),
                me(this, "overwriteToggle", this, this.state.overwrite));
            },
            hasFocus: function () {
              return this.display.input.getField() == W();
            },
            isReadOnly: function () {
              return !(!this.options.readOnly && !this.doc.cantEdit);
            },
            scrollTo: Wi(function (e, t) {
              si(this, e, t);
            }),
            getScrollInfo: function () {
              var e = this.display.scroller;
              return {
                left: e.scrollLeft,
                top: e.scrollTop,
                height: e.scrollHeight - Xr(this) - this.display.barHeight,
                width: e.scrollWidth - Xr(this) - this.display.barWidth,
                clientHeight: _r(this),
                clientWidth: Yr(this),
              };
            },
            scrollIntoView: Wi(function (e, t) {
              null == e
                ? ((e = { from: this.doc.sel.primary().head, to: null }),
                  null == t && (t = this.options.cursorScrollMargin))
                : "number" == typeof e
                ? (e = { from: it(e, 0), to: null })
                : null == e.from && (e = { from: e, to: null }),
                e.to || (e.to = e.from),
                (e.margin = t || 0),
                null != e.from.line
                  ? ai(this, e)
                  : ci(this, e.from, e.to, e.margin);
            }),
            setSize: Wi(function (e, t) {
              var r = this,
                n = function (e) {
                  return "number" == typeof e || /^\d+$/.test(String(e))
                    ? e + "px"
                    : e;
                };
              null != e && (this.display.wrapper.style.width = n(e)),
                null != t && (this.display.wrapper.style.height = n(t)),
                this.options.lineWrapping && cn(this);
              var i = this.display.viewFrom;
              this.doc.iter(i, this.display.viewTo, function (e) {
                if (e.widgets)
                  for (var t = 0; t < e.widgets.length; t++)
                    if (e.widgets[t].noHScroll) {
                      In(r, i, "widget");
                      break;
                    }
                ++i;
              }),
                (this.curOp.forceUpdate = !0),
                me(this, "refresh", this);
            }),
            operation: function (e) {
              return Ai(this, e);
            },
            startOperation: function () {
              return Ci(this);
            },
            endOperation: function () {
              return Si(this);
            },
            refresh: Wi(function () {
              var e = this.display.cachedTextHeight;
              Pn(this),
                (this.curOp.forceUpdate = !0),
                hn(this),
                si(this, this.doc.scrollLeft, this.doc.scrollTop),
                Ki(this.display),
                (null == e ||
                  Math.abs(e - Nn(this.display)) > 0.5 ||
                  this.options.lineWrapping) &&
                  Hn(this),
                me(this, "refresh", this);
            }),
            swapDoc: Wi(function (e) {
              var t = this.doc;
              return (
                (t.cm = null),
                this.state.selectingText && this.state.selectingText(),
                yo(this, e),
                hn(this),
                this.display.input.reset(),
                si(this, e.scrollLeft, e.scrollTop),
                (this.curOp.forceScroll = !0),
                Mr(this, "swapDoc", this, t),
                t
              );
            }),
            phrase: function (e) {
              var t = this.options.phrases;
              return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e;
            },
            getInputField: function () {
              return this.display.input.getField();
            },
            getWrapperElement: function () {
              return this.display.wrapper;
            },
            getScrollerElement: function () {
              return this.display.scroller;
            },
            getGutterElement: function () {
              return this.display.gutters;
            },
          }),
            xe(e),
            (e.registerHelper = function (t, n, i) {
              r.hasOwnProperty(t) || (r[t] = e[t] = { _global: [] }),
                (r[t][n] = i);
            }),
            (e.registerGlobalHelper = function (t, n, i, o) {
              e.registerHelper(t, n, o), r[t]._global.push({ pred: i, val: o });
            });
        }
        function $s(e, t, r, n, i) {
          var o = t,
            l = r,
            s = qe(e, t.line),
            a = i && "rtl" == e.direction ? -r : r;
          function u() {
            var r = t.line + a;
            return (
              !(r < e.first || r >= e.first + e.size) &&
              ((t = new it(r, t.ch, t.sticky)), (s = qe(e, r)))
            );
          }
          function c(o) {
            var l;
            if ("codepoint" == n) {
              var c = s.text.charCodeAt(t.ch + (r > 0 ? 0 : -1));
              if (isNaN(c)) l = null;
              else {
                var h =
                  r > 0 ? c >= 55296 && c < 56320 : c >= 56320 && c < 57343;
                l = new it(
                  t.line,
                  Math.max(0, Math.min(s.text.length, t.ch + r * (h ? 2 : 1))),
                  -r
                );
              }
            } else l = i ? $l(e.cm, s, t, r) : Yl(s, t, r);
            if (null == l) {
              if (o || !u()) return !1;
              t = _l(i, e.cm, s, t.line, a);
            } else t = l;
            return !0;
          }
          if ("char" == n || "codepoint" == n) c();
          else if ("column" == n) c(!0);
          else if ("word" == n || "group" == n)
            for (
              var h = null,
                f = "group" == n,
                d = e.cm && e.cm.getHelper(t, "wordChars"),
                p = !0;
              !(r < 0) || c(!p);
              p = !1
            ) {
              var g = s.text.charAt(t.ch) || "\n",
                v = re(g, d)
                  ? "w"
                  : f && "\n" == g
                  ? "n"
                  : !f || /\s/.test(g)
                  ? null
                  : "p";
              if ((!f || p || v || (v = "s"), h && h != v)) {
                r < 0 && ((r = 1), c(), (t.sticky = "after"));
                break;
              }
              if ((v && (h = v), r > 0 && !c(!p))) break;
            }
          var m = Yo(e, t, o, l, !0);
          return lt(o, m) && (m.hitSide = !0), m;
        }
        function qs(e, t, r, n) {
          var i,
            o,
            l = e.doc,
            s = t.left;
          if ("page" == n) {
            var a = Math.min(
                e.display.wrapper.clientHeight,
                window.innerHeight || document.documentElement.clientHeight
              ),
              u = Math.max(a - 0.5 * Nn(e.display), 3);
            i = (r > 0 ? t.bottom : t.top) + r * u;
          } else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);
          for (; (o = xn(e, s, i)).outside; ) {
            if (r < 0 ? i <= 0 : i >= l.height) {
              o.hitSide = !0;
              break;
            }
            i += 5 * r;
          }
          return o;
        }
        var Zs = function (e) {
          (this.cm = e),
            (this.lastAnchorNode =
              this.lastAnchorOffset =
              this.lastFocusNode =
              this.lastFocusOffset =
                null),
            (this.polling = new z()),
            (this.composing = null),
            (this.gracePeriod = !1),
            (this.readDOMTimeout = null);
        };
        function Qs(e, t) {
          var r = Jr(e, t.line);
          if (!r || r.hidden) return null;
          var n = qe(e.doc, t.line),
            i = qr(r, n, t.line),
            o = fe(n, e.doc.direction),
            l = "left";
          o && (l = ce(o, t.ch) % 2 ? "right" : "left");
          var s = on(i.map, t.ch, l);
          return (s.offset = "right" == s.collapse ? s.end : s.start), s;
        }
        function Js(e) {
          for (var t = e; t; t = t.parentNode)
            if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
          return !1;
        }
        function ea(e, t) {
          return t && (e.bad = !0), e;
        }
        function ta(e, t, r, n, i) {
          var o = "",
            l = !1,
            s = e.doc.lineSeparator(),
            a = !1;
          function u(e) {
            return function (t) {
              return t.id == e;
            };
          }
          function c() {
            l && ((o += s), a && (o += s), (l = a = !1));
          }
          function h(e) {
            e && (c(), (o += e));
          }
          function f(t) {
            if (1 == t.nodeType) {
              var r = t.getAttribute("cm-text");
              if (r) return void h(r);
              var o,
                d = t.getAttribute("cm-marker");
              if (d) {
                var p = e.findMarks(it(n, 0), it(i + 1, 0), u(+d));
                return void (
                  p.length &&
                  (o = p[0].find(0)) &&
                  h(Ze(e.doc, o.from, o.to).join(s))
                );
              }
              if ("false" == t.getAttribute("contenteditable")) return;
              var g = /^(pre|div|p|li|table|br)$/i.test(t.nodeName);
              if (!/^br$/i.test(t.nodeName) && 0 == t.textContent.length)
                return;
              g && c();
              for (var v = 0; v < t.childNodes.length; v++) f(t.childNodes[v]);
              /^(pre|p)$/i.test(t.nodeName) && (a = !0), g && (l = !0);
            } else
              3 == t.nodeType &&
                h(t.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
          }
          for (; f(t), t != r; ) (t = t.nextSibling), (a = !1);
          return o;
        }
        function ra(e, t, r) {
          var n;
          if (t == e.display.lineDiv) {
            if (!(n = e.display.lineDiv.childNodes[r]))
              return ea(e.clipPos(it(e.display.viewTo - 1)), !0);
            (t = null), (r = 0);
          } else
            for (n = t; ; n = n.parentNode) {
              if (!n || n == e.display.lineDiv) return null;
              if (n.parentNode && n.parentNode == e.display.lineDiv) break;
            }
          for (var i = 0; i < e.display.view.length; i++) {
            var o = e.display.view[i];
            if (o.node == n) return na(o, t, r);
          }
        }
        function na(e, t, r) {
          var n = e.text.firstChild,
            i = !1;
          if (!t || !D(n, t)) return ea(it(et(e.line), 0), !0);
          if (t == n && ((i = !0), (t = n.childNodes[r]), (r = 0), !t)) {
            var o = e.rest ? $(e.rest) : e.line;
            return ea(it(et(o), o.text.length), i);
          }
          var l = 3 == t.nodeType ? t : null,
            s = t;
          for (
            l ||
            1 != t.childNodes.length ||
            3 != t.firstChild.nodeType ||
            ((l = t.firstChild), r && (r = l.nodeValue.length));
            s.parentNode != n;

          )
            s = s.parentNode;
          var a = e.measure,
            u = a.maps;
          function c(t, r, n) {
            for (var i = -1; i < (u ? u.length : 0); i++)
              for (var o = i < 0 ? a.map : u[i], l = 0; l < o.length; l += 3) {
                var s = o[l + 2];
                if (s == t || s == r) {
                  var c = et(i < 0 ? e.line : e.rest[i]),
                    h = o[l] + n;
                  return (
                    (n < 0 || s != t) && (h = o[l + (n ? 1 : 0)]), it(c, h)
                  );
                }
              }
          }
          var h = c(l, s, r);
          if (h) return ea(h, i);
          for (
            var f = s.nextSibling, d = l ? l.nodeValue.length - r : 0;
            f;
            f = f.nextSibling
          ) {
            if ((h = c(f, f.firstChild, 0))) return ea(it(h.line, h.ch - d), i);
            d += f.textContent.length;
          }
          for (var p = s.previousSibling, g = r; p; p = p.previousSibling) {
            if ((h = c(p, p.firstChild, -1)))
              return ea(it(h.line, h.ch + g), i);
            g += p.textContent.length;
          }
        }
        (Zs.prototype.init = function (e) {
          var t = this,
            r = this,
            n = r.cm,
            i = (r.div = e.lineDiv);
          function o(e) {
            for (var t = e.target; t; t = t.parentNode) {
              if (t == i) return !0;
              if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) break;
            }
            return !1;
          }
          function l(e) {
            if (o(e) && !ye(n, e)) {
              if (n.somethingSelected())
                Gs({ lineWise: !1, text: n.getSelections() }),
                  "cut" == e.type && n.replaceSelection("", null, "cut");
              else {
                if (!n.options.lineWiseCopyCut) return;
                var t = js(n);
                Gs({ lineWise: !0, text: t.text }),
                  "cut" == e.type &&
                    n.operation(function () {
                      n.setSelections(t.ranges, 0, V),
                        n.replaceSelection("", null, "cut");
                    });
              }
              if (e.clipboardData) {
                e.clipboardData.clearData();
                var l = Bs.text.join("\n");
                if (
                  (e.clipboardData.setData("Text", l),
                  e.clipboardData.getData("Text") == l)
                )
                  return void e.preventDefault();
              }
              var s = Ys(),
                a = s.firstChild;
              n.display.lineSpace.insertBefore(
                s,
                n.display.lineSpace.firstChild
              ),
                (a.value = Bs.text.join("\n"));
              var u = W();
              E(a),
                setTimeout(function () {
                  n.display.lineSpace.removeChild(s),
                    u.focus(),
                    u == i && r.showPrimarySelection();
                }, 50);
            }
          }
          (i.contentEditable = !0),
            Xs(
              i,
              n.options.spellcheck,
              n.options.autocorrect,
              n.options.autocapitalize
            ),
            pe(i, "paste", function (e) {
              !o(e) ||
                ye(n, e) ||
                Vs(e, n) ||
                (s <= 11 &&
                  setTimeout(
                    Di(n, function () {
                      return t.updateFromDOM();
                    }),
                    20
                  ));
            }),
            pe(i, "compositionstart", function (e) {
              t.composing = { data: e.data, done: !1 };
            }),
            pe(i, "compositionupdate", function (e) {
              t.composing || (t.composing = { data: e.data, done: !1 });
            }),
            pe(i, "compositionend", function (e) {
              t.composing &&
                (e.data != t.composing.data && t.readFromDOMSoon(),
                (t.composing.done = !0));
            }),
            pe(i, "touchstart", function () {
              return r.forceCompositionEnd();
            }),
            pe(i, "input", function () {
              t.composing || t.readFromDOMSoon();
            }),
            pe(i, "copy", l),
            pe(i, "cut", l);
        }),
          (Zs.prototype.screenReaderLabelChanged = function (e) {
            e
              ? this.div.setAttribute("aria-label", e)
              : this.div.removeAttribute("aria-label");
          }),
          (Zs.prototype.prepareSelection = function () {
            var e = Vn(this.cm, !1);
            return (e.focus = W() == this.div), e;
          }),
          (Zs.prototype.showSelection = function (e, t) {
            e &&
              this.cm.display.view.length &&
              ((e.focus || t) && this.showPrimarySelection(),
              this.showMultipleSelections(e));
          }),
          (Zs.prototype.getSelection = function () {
            return this.cm.display.wrapper.ownerDocument.getSelection();
          }),
          (Zs.prototype.showPrimarySelection = function () {
            var e = this.getSelection(),
              t = this.cm,
              n = t.doc.sel.primary(),
              i = n.from(),
              o = n.to();
            if (
              t.display.viewTo == t.display.viewFrom ||
              i.line >= t.display.viewTo ||
              o.line < t.display.viewFrom
            )
              e.removeAllRanges();
            else {
              var l = ra(t, e.anchorNode, e.anchorOffset),
                s = ra(t, e.focusNode, e.focusOffset);
              if (
                !l ||
                l.bad ||
                !s ||
                s.bad ||
                0 != ot(ut(l, s), i) ||
                0 != ot(at(l, s), o)
              ) {
                var a = t.display.view,
                  u = (i.line >= t.display.viewFrom && Qs(t, i)) || {
                    node: a[0].measure.map[2],
                    offset: 0,
                  },
                  c = o.line < t.display.viewTo && Qs(t, o);
                if (!c) {
                  var h = a[a.length - 1].measure,
                    f = h.maps ? h.maps[h.maps.length - 1] : h.map;
                  c = {
                    node: f[f.length - 1],
                    offset: f[f.length - 2] - f[f.length - 3],
                  };
                }
                if (u && c) {
                  var d,
                    p = e.rangeCount && e.getRangeAt(0);
                  try {
                    d = k(u.node, u.offset, c.offset, c.node);
                  } catch (g) {}
                  d &&
                    (!r && t.state.focused
                      ? (e.collapse(u.node, u.offset),
                        d.collapsed || (e.removeAllRanges(), e.addRange(d)))
                      : (e.removeAllRanges(), e.addRange(d)),
                    p && null == e.anchorNode
                      ? e.addRange(p)
                      : r && this.startGracePeriod()),
                    this.rememberSelection();
                } else e.removeAllRanges();
              }
            }
          }),
          (Zs.prototype.startGracePeriod = function () {
            var e = this;
            clearTimeout(this.gracePeriod),
              (this.gracePeriod = setTimeout(function () {
                (e.gracePeriod = !1),
                  e.selectionChanged() &&
                    e.cm.operation(function () {
                      return (e.cm.curOp.selectionChanged = !0);
                    });
              }, 20));
          }),
          (Zs.prototype.showMultipleSelections = function (e) {
            N(this.cm.display.cursorDiv, e.cursors),
              N(this.cm.display.selectionDiv, e.selection);
          }),
          (Zs.prototype.rememberSelection = function () {
            var e = this.getSelection();
            (this.lastAnchorNode = e.anchorNode),
              (this.lastAnchorOffset = e.anchorOffset),
              (this.lastFocusNode = e.focusNode),
              (this.lastFocusOffset = e.focusOffset);
          }),
          (Zs.prototype.selectionInEditor = function () {
            var e = this.getSelection();
            if (!e.rangeCount) return !1;
            var t = e.getRangeAt(0).commonAncestorContainer;
            return D(this.div, t);
          }),
          (Zs.prototype.focus = function () {
            "nocursor" != this.cm.options.readOnly &&
              ((this.selectionInEditor() && W() == this.div) ||
                this.showSelection(this.prepareSelection(), !0),
              this.div.focus());
          }),
          (Zs.prototype.blur = function () {
            this.div.blur();
          }),
          (Zs.prototype.getField = function () {
            return this.div;
          }),
          (Zs.prototype.supportsTouch = function () {
            return !0;
          }),
          (Zs.prototype.receivedFocus = function () {
            var e = this,
              t = this;
            function r() {
              t.cm.state.focused &&
                (t.pollSelection(),
                t.polling.set(t.cm.options.pollInterval, r));
            }
            this.selectionInEditor()
              ? setTimeout(function () {
                  return e.pollSelection();
                }, 20)
              : Ai(this.cm, function () {
                  return (t.cm.curOp.selectionChanged = !0);
                }),
              this.polling.set(this.cm.options.pollInterval, r);
          }),
          (Zs.prototype.selectionChanged = function () {
            var e = this.getSelection();
            return (
              e.anchorNode != this.lastAnchorNode ||
              e.anchorOffset != this.lastAnchorOffset ||
              e.focusNode != this.lastFocusNode ||
              e.focusOffset != this.lastFocusOffset
            );
          }),
          (Zs.prototype.pollSelection = function () {
            if (
              null == this.readDOMTimeout &&
              !this.gracePeriod &&
              this.selectionChanged()
            ) {
              var e = this.getSelection(),
                t = this.cm;
              if (
                v &&
                c &&
                this.cm.display.gutterSpecs.length &&
                Js(e.anchorNode)
              )
                return (
                  this.cm.triggerOnKeyDown({
                    type: "keydown",
                    keyCode: 8,
                    preventDefault: Math.abs,
                  }),
                  this.blur(),
                  void this.focus()
                );
              if (!this.composing) {
                this.rememberSelection();
                var r = ra(t, e.anchorNode, e.anchorOffset),
                  n = ra(t, e.focusNode, e.focusOffset);
                r &&
                  n &&
                  Ai(t, function () {
                    Go(t.doc, lo(r, n), V),
                      (r.bad || n.bad) && (t.curOp.selectionChanged = !0);
                  });
              }
            }
          }),
          (Zs.prototype.pollContent = function () {
            null != this.readDOMTimeout &&
              (clearTimeout(this.readDOMTimeout), (this.readDOMTimeout = null));
            var e,
              t,
              r,
              n = this.cm,
              i = n.display,
              o = n.doc.sel.primary(),
              l = o.from(),
              s = o.to();
            if (
              (0 == l.ch &&
                l.line > n.firstLine() &&
                (l = it(l.line - 1, qe(n.doc, l.line - 1).length)),
              s.ch == qe(n.doc, s.line).text.length &&
                s.line < n.lastLine() &&
                (s = it(s.line + 1, 0)),
              l.line < i.viewFrom || s.line > i.viewTo - 1)
            )
              return !1;
            l.line == i.viewFrom || 0 == (e = En(n, l.line))
              ? ((t = et(i.view[0].line)), (r = i.view[0].node))
              : ((t = et(i.view[e].line)),
                (r = i.view[e - 1].node.nextSibling));
            var a,
              u,
              c = En(n, s.line);
            if (
              (c == i.view.length - 1
                ? ((a = i.viewTo - 1), (u = i.lineDiv.lastChild))
                : ((a = et(i.view[c + 1].line) - 1),
                  (u = i.view[c + 1].node.previousSibling)),
              !r)
            )
              return !1;
            for (
              var h = n.doc.splitLines(ta(n, r, u, t, a)),
                f = Ze(n.doc, it(t, 0), it(a, qe(n.doc, a).text.length));
              h.length > 1 && f.length > 1;

            )
              if ($(h) == $(f)) h.pop(), f.pop(), a--;
              else {
                if (h[0] != f[0]) break;
                h.shift(), f.shift(), t++;
              }
            for (
              var d = 0,
                p = 0,
                g = h[0],
                v = f[0],
                m = Math.min(g.length, v.length);
              d < m && g.charCodeAt(d) == v.charCodeAt(d);

            )
              ++d;
            for (
              var y = $(h),
                b = $(f),
                w = Math.min(
                  y.length - (1 == h.length ? d : 0),
                  b.length - (1 == f.length ? d : 0)
                );
              p < w &&
              y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);

            )
              ++p;
            if (1 == h.length && 1 == f.length && t == l.line)
              for (
                ;
                d &&
                d > l.ch &&
                y.charCodeAt(y.length - p - 1) ==
                  b.charCodeAt(b.length - p - 1);

              )
                d--, p++;
            (h[h.length - 1] = y
              .slice(0, y.length - p)
              .replace(/^\u200b+/, "")),
              (h[0] = h[0].slice(d).replace(/\u200b+$/, ""));
            var x = it(t, d),
              C = it(a, f.length ? $(f).length - p : 0);
            return h.length > 1 || h[0] || ot(x, C)
              ? (nl(n.doc, h, x, C, "+input"), !0)
              : void 0;
          }),
          (Zs.prototype.ensurePolled = function () {
            this.forceCompositionEnd();
          }),
          (Zs.prototype.reset = function () {
            this.forceCompositionEnd();
          }),
          (Zs.prototype.forceCompositionEnd = function () {
            this.composing &&
              (clearTimeout(this.readDOMTimeout),
              (this.composing = null),
              this.updateFromDOM(),
              this.div.blur(),
              this.div.focus());
          }),
          (Zs.prototype.readFromDOMSoon = function () {
            var e = this;
            null == this.readDOMTimeout &&
              (this.readDOMTimeout = setTimeout(function () {
                if (((e.readDOMTimeout = null), e.composing)) {
                  if (!e.composing.done) return;
                  e.composing = null;
                }
                e.updateFromDOM();
              }, 80));
          }),
          (Zs.prototype.updateFromDOM = function () {
            var e = this;
            (!this.cm.isReadOnly() && this.pollContent()) ||
              Ai(this.cm, function () {
                return Pn(e.cm);
              });
          }),
          (Zs.prototype.setUneditable = function (e) {
            e.contentEditable = "false";
          }),
          (Zs.prototype.onKeyPress = function (e) {
            0 == e.charCode ||
              this.composing ||
              (e.preventDefault(),
              this.cm.isReadOnly() ||
                Di(this.cm, Us)(
                  this.cm,
                  String.fromCharCode(
                    null == e.charCode ? e.keyCode : e.charCode
                  ),
                  0
                ));
          }),
          (Zs.prototype.readOnlyChanged = function (e) {
            this.div.contentEditable = String("nocursor" != e);
          }),
          (Zs.prototype.onContextMenu = function () {}),
          (Zs.prototype.resetPosition = function () {}),
          (Zs.prototype.needsContentAttribute = !0);
        var ia = function (e) {
          (this.cm = e),
            (this.prevInput = ""),
            (this.pollingFast = !1),
            (this.polling = new z()),
            (this.hasSelection = !1),
            (this.composing = null);
        };
        function oa(e, t) {
          if (
            (((t = t ? I(t) : {}).value = e.value),
            !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex),
            !t.placeholder && e.placeholder && (t.placeholder = e.placeholder),
            null == t.autofocus)
          ) {
            var r = W();
            t.autofocus =
              r == e ||
              (null != e.getAttribute("autofocus") && r == document.body);
          }
          function n() {
            e.value = s.getValue();
          }
          var i;
          if (e.form && (pe(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
            var o = e.form;
            i = o.submit;
            try {
              var l = (o.submit = function () {
                n(), (o.submit = i), o.submit(), (o.submit = l);
              });
            } catch (a) {}
          }
          (t.finishInit = function (r) {
            (r.save = n),
              (r.getTextArea = function () {
                return e;
              }),
              (r.toTextArea = function () {
                (r.toTextArea = isNaN),
                  n(),
                  e.parentNode.removeChild(r.getWrapperElement()),
                  (e.style.display = ""),
                  e.form &&
                    (ve(e.form, "submit", n),
                    t.leaveSubmitMethodAlone ||
                      "function" != typeof e.form.submit ||
                      (e.form.submit = i));
              });
          }),
            (e.style.display = "none");
          var s = Ps(function (t) {
            return e.parentNode.insertBefore(t, e.nextSibling);
          }, t);
          return s;
        }
        function la(e) {
          (e.off = ve),
            (e.on = pe),
            (e.wheelEventPixels = to),
            (e.Doc = Cl),
            (e.splitLines = He),
            (e.countColumn = R),
            (e.findColumn = X),
            (e.isWordChar = te),
            (e.Pass = U),
            (e.signal = me),
            (e.Line = sr),
            (e.changeEnd = so),
            (e.scrollbarModel = bi),
            (e.Pos = it),
            (e.cmpPos = ot),
            (e.modes = Re),
            (e.mimeModes = ze),
            (e.resolveMode = Ue),
            (e.getMode = Ve),
            (e.modeExtensions = Ke),
            (e.extendMode = je),
            (e.copyState = Xe),
            (e.startState = _e),
            (e.innerMode = Ye),
            (e.commands = ql),
            (e.keyMap = Il),
            (e.keyName = Vl),
            (e.isModifierKey = Gl),
            (e.lookupKey = Bl),
            (e.normalizeKeyMap = zl),
            (e.StringStream = $e),
            (e.SharedTextMarker = vl),
            (e.TextMarker = pl),
            (e.LineWidget = cl),
            (e.e_preventDefault = Ce),
            (e.e_stopPropagation = Se),
            (e.e_stop = ke),
            (e.addClass = H),
            (e.contains = D),
            (e.rmClass = T),
            (e.keyNames = Hl);
        }
        (ia.prototype.init = function (e) {
          var t = this,
            r = this,
            n = this.cm;
          this.createField(e);
          var i = this.textarea;
          function o(e) {
            if (!ye(n, e)) {
              if (n.somethingSelected())
                Gs({ lineWise: !1, text: n.getSelections() });
              else {
                if (!n.options.lineWiseCopyCut) return;
                var t = js(n);
                Gs({ lineWise: !0, text: t.text }),
                  "cut" == e.type
                    ? n.setSelections(t.ranges, null, V)
                    : ((r.prevInput = ""), (i.value = t.text.join("\n")), E(i));
              }
              "cut" == e.type && (n.state.cutIncoming = +new Date());
            }
          }
          e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild),
            g && (i.style.width = "0px"),
            pe(i, "input", function () {
              l && s >= 9 && t.hasSelection && (t.hasSelection = null),
                r.poll();
            }),
            pe(i, "paste", function (e) {
              ye(n, e) ||
                Vs(e, n) ||
                ((n.state.pasteIncoming = +new Date()), r.fastPoll());
            }),
            pe(i, "cut", o),
            pe(i, "copy", o),
            pe(e.scroller, "paste", function (t) {
              if (!Ur(e, t) && !ye(n, t)) {
                if (!i.dispatchEvent)
                  return (n.state.pasteIncoming = +new Date()), void r.focus();
                var o = new Event("paste");
                (o.clipboardData = t.clipboardData), i.dispatchEvent(o);
              }
            }),
            pe(e.lineSpace, "selectstart", function (t) {
              Ur(e, t) || Ce(t);
            }),
            pe(i, "compositionstart", function () {
              var e = n.getCursor("from");
              r.composing && r.composing.range.clear(),
                (r.composing = {
                  start: e,
                  range: n.markText(e, n.getCursor("to"), {
                    className: "CodeMirror-composing",
                  }),
                });
            }),
            pe(i, "compositionend", function () {
              r.composing &&
                (r.poll(), r.composing.range.clear(), (r.composing = null));
            });
        }),
          (ia.prototype.createField = function (e) {
            (this.wrapper = Ys()), (this.textarea = this.wrapper.firstChild);
          }),
          (ia.prototype.screenReaderLabelChanged = function (e) {
            e
              ? this.textarea.setAttribute("aria-label", e)
              : this.textarea.removeAttribute("aria-label");
          }),
          (ia.prototype.prepareSelection = function () {
            var e = this.cm,
              t = e.display,
              r = e.doc,
              n = Vn(e);
            if (e.options.moveInputWithCursor) {
              var i = yn(e, r.sel.primary().head, "div"),
                o = t.wrapper.getBoundingClientRect(),
                l = t.lineDiv.getBoundingClientRect();
              (n.teTop = Math.max(
                0,
                Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top)
              )),
                (n.teLeft = Math.max(
                  0,
                  Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left)
                ));
            }
            return n;
          }),
          (ia.prototype.showSelection = function (e) {
            var t = this.cm.display;
            N(t.cursorDiv, e.cursors),
              N(t.selectionDiv, e.selection),
              null != e.teTop &&
                ((this.wrapper.style.top = e.teTop + "px"),
                (this.wrapper.style.left = e.teLeft + "px"));
          }),
          (ia.prototype.reset = function (e) {
            if (!this.contextMenuPending && !this.composing) {
              var t = this.cm;
              if (t.somethingSelected()) {
                this.prevInput = "";
                var r = t.getSelection();
                (this.textarea.value = r),
                  t.state.focused && E(this.textarea),
                  l && s >= 9 && (this.hasSelection = r);
              } else
                e ||
                  ((this.prevInput = this.textarea.value = ""),
                  l && s >= 9 && (this.hasSelection = null));
            }
          }),
          (ia.prototype.getField = function () {
            return this.textarea;
          }),
          (ia.prototype.supportsTouch = function () {
            return !1;
          }),
          (ia.prototype.focus = function () {
            if (
              "nocursor" != this.cm.options.readOnly &&
              (!m || W() != this.textarea)
            )
              try {
                this.textarea.focus();
              } catch (e) {}
          }),
          (ia.prototype.blur = function () {
            this.textarea.blur();
          }),
          (ia.prototype.resetPosition = function () {
            this.wrapper.style.top = this.wrapper.style.left = 0;
          }),
          (ia.prototype.receivedFocus = function () {
            this.slowPoll();
          }),
          (ia.prototype.slowPoll = function () {
            var e = this;
            this.pollingFast ||
              this.polling.set(this.cm.options.pollInterval, function () {
                e.poll(), e.cm.state.focused && e.slowPoll();
              });
          }),
          (ia.prototype.fastPoll = function () {
            var e = !1,
              t = this;
            function r() {
              t.poll() || e
                ? ((t.pollingFast = !1), t.slowPoll())
                : ((e = !0), t.polling.set(60, r));
            }
            (t.pollingFast = !0), t.polling.set(20, r);
          }),
          (ia.prototype.poll = function () {
            var e = this,
              t = this.cm,
              r = this.textarea,
              n = this.prevInput;
            if (
              this.contextMenuPending ||
              !t.state.focused ||
              (Fe(r) && !n && !this.composing) ||
              t.isReadOnly() ||
              t.options.disableInput ||
              t.state.keySeq
            )
              return !1;
            var i = r.value;
            if (i == n && !t.somethingSelected()) return !1;
            if (
              (l && s >= 9 && this.hasSelection === i) ||
              (y && /[\uf700-\uf7ff]/.test(i))
            )
              return t.display.input.reset(), !1;
            if (t.doc.sel == t.display.selForContextMenu) {
              var o = i.charCodeAt(0);
              if ((8203 != o || n || (n = "\u200b"), 8666 == o))
                return this.reset(), this.cm.execCommand("undo");
            }
            for (
              var a = 0, u = Math.min(n.length, i.length);
              a < u && n.charCodeAt(a) == i.charCodeAt(a);

            )
              ++a;
            return (
              Ai(t, function () {
                Us(
                  t,
                  i.slice(a),
                  n.length - a,
                  null,
                  e.composing ? "*compose" : null
                ),
                  i.length > 1e3 || i.indexOf("\n") > -1
                    ? (r.value = e.prevInput = "")
                    : (e.prevInput = i),
                  e.composing &&
                    (e.composing.range.clear(),
                    (e.composing.range = t.markText(
                      e.composing.start,
                      t.getCursor("to"),
                      { className: "CodeMirror-composing" }
                    )));
              }),
              !0
            );
          }),
          (ia.prototype.ensurePolled = function () {
            this.pollingFast && this.poll() && (this.pollingFast = !1);
          }),
          (ia.prototype.onKeyPress = function () {
            l && s >= 9 && (this.hasSelection = null), this.fastPoll();
          }),
          (ia.prototype.onContextMenu = function (e) {
            var t = this,
              r = t.cm,
              n = r.display,
              i = t.textarea;
            t.contextMenuPending && t.contextMenuPending();
            var o = Fn(r, e),
              u = n.scroller.scrollTop;
            if (o && !h) {
              r.options.resetSelectionOnContextMenu &&
                -1 == r.doc.sel.contains(o) &&
                Di(r, Go)(r.doc, lo(o), V);
              var c,
                f = i.style.cssText,
                d = t.wrapper.style.cssText,
                p = t.wrapper.offsetParent.getBoundingClientRect();
              if (
                ((t.wrapper.style.cssText = "position: static"),
                (i.style.cssText =
                  "position: absolute; width: 30px; height: 30px;\n      top: " +
                  (e.clientY - p.top - 5) +
                  "px; left: " +
                  (e.clientX - p.left - 5) +
                  "px;\n      z-index: 1000; background: " +
                  (l ? "rgba(255, 255, 255, .05)" : "transparent") +
                  ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);"),
                a && (c = window.scrollY),
                n.input.focus(),
                a && window.scrollTo(null, c),
                n.input.reset(),
                r.somethingSelected() || (i.value = t.prevInput = " "),
                (t.contextMenuPending = m),
                (n.selForContextMenu = r.doc.sel),
                clearTimeout(n.detectingSelectAll),
                l && s >= 9 && v(),
                S)
              ) {
                ke(e);
                var g = function () {
                  ve(window, "mouseup", g), setTimeout(m, 20);
                };
                pe(window, "mouseup", g);
              } else setTimeout(m, 50);
            }
            function v() {
              if (null != i.selectionStart) {
                var e = r.somethingSelected(),
                  o = "\u200b" + (e ? i.value : "");
                (i.value = "\u21da"),
                  (i.value = o),
                  (t.prevInput = e ? "" : "\u200b"),
                  (i.selectionStart = 1),
                  (i.selectionEnd = o.length),
                  (n.selForContextMenu = r.doc.sel);
              }
            }
            function m() {
              if (
                t.contextMenuPending == m &&
                ((t.contextMenuPending = !1),
                (t.wrapper.style.cssText = d),
                (i.style.cssText = f),
                l &&
                  s < 9 &&
                  n.scrollbars.setScrollTop((n.scroller.scrollTop = u)),
                null != i.selectionStart)
              ) {
                (!l || (l && s < 9)) && v();
                var e = 0,
                  o = function () {
                    n.selForContextMenu == r.doc.sel &&
                    0 == i.selectionStart &&
                    i.selectionEnd > 0 &&
                    "\u200b" == t.prevInput
                      ? Di(r, $o)(r)
                      : e++ < 10
                      ? (n.detectingSelectAll = setTimeout(o, 500))
                      : ((n.selForContextMenu = null), n.input.reset());
                  };
                n.detectingSelectAll = setTimeout(o, 200);
              }
            }
          }),
          (ia.prototype.readOnlyChanged = function (e) {
            e || this.reset(),
              (this.textarea.disabled = "nocursor" == e),
              (this.textarea.readOnly = !!e);
          }),
          (ia.prototype.setUneditable = function () {}),
          (ia.prototype.needsContentAttribute = !1),
          Hs(Ps),
          _s(Ps);
        var sa = "iter insert remove copy getEditor constructor".split(" ");
        for (var aa in Cl.prototype)
          Cl.prototype.hasOwnProperty(aa) &&
            B(sa, aa) < 0 &&
            (Ps.prototype[aa] = (function (e) {
              return function () {
                return e.apply(this.doc, arguments);
              };
            })(Cl.prototype[aa]));
        return (
          xe(Cl),
          (Ps.inputStyles = { textarea: ia, contenteditable: Zs }),
          (Ps.defineMode = function (e) {
            Ps.defaults.mode || "null" == e || (Ps.defaults.mode = e),
              Be.apply(this, arguments);
          }),
          (Ps.defineMIME = Ge),
          Ps.defineMode("null", function () {
            return {
              token: function (e) {
                return e.skipToEnd();
              },
            };
          }),
          Ps.defineMIME("text/plain", "null"),
          (Ps.defineExtension = function (e, t) {
            Ps.prototype[e] = t;
          }),
          (Ps.defineDocExtension = function (e, t) {
            Cl.prototype[e] = t;
          }),
          (Ps.fromTextArea = oa),
          la(Ps),
          (Ps.version = "5.63.3"),
          Ps
        );
      })();
    },
  },
]);
