"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [870],
  {
    8870: function (r, n, e) {
      e.r(n),
        e.d(n, {
          amplify_link: function () {
            return o;
          },
        });
      var i = e(2508),
        o = (function () {
          function r(r) {
            (0, i.r)(this, r), (this.role = "navigation");
          }
          return (
            (r.prototype.render = function () {
              return (0, i.h)(
                "a",
                { class: "link", role: this.role },
                (0, i.h)("slot", null)
              );
            }),
            Object.defineProperty(r.prototype, "el", {
              get: function () {
                return (0, i.g)(this);
              },
              enumerable: !1,
              configurable: !0,
            }),
            r
          );
        })();
      o.style =
        ":host{--link-color:var(--amplify-primary-color);--link-hover:var(--amplify-primary-tint);--link-active:var(--amplify-primary-shade)}.link{color:var(--link-color);cursor:pointer}.link:link{color:var(--link-color);text-decoration:none}.link:hover{color:var(--link-hover);text-decoration:underline}.link:active{color:var(--link-active);text-decoration:underline}";
    },
  },
]);
