"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [223],
  {
    1223: function (t, o, a) {
      a.r(o),
        a.d(o, {
          amplify_tooltip: function () {
            return n;
          },
        });
      var r = a(2508),
        n = (function () {
          function t(t) {
            (0, r.r)(this, t), (this.shouldAutoShow = !1);
          }
          return (
            (t.prototype.render = function () {
              return (0, r.h)(
                "div",
                {
                  class: {
                    tooltip: !0,
                    "auto-show-tooltip": this.shouldAutoShow,
                  },
                  "data-text": this.text,
                },
                (0, r.h)("slot", null)
              );
            }),
            t
          );
        })();
      n.style =
        ':host{--font-family:var(--amplify-font-family);--background-color:var(--amplify-secondary-color);--color:var(--amplify-secondary-contrast);--border-color:var(--amplify-secondary-color)}.tooltip{display:inline;position:relative;font-size:var(--amplify-text-xxs);font-family:var(--font-family);margin:0 0 0 16px}.tooltip :after{background-color:var(--background-color);border-radius:2px;bottom:46px;color:var(--color);content:attr(data-text);text-decoration:none;padding:10px;left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);position:absolute;white-space:nowrap;opacity:0;-webkit-transition:all 0.3s ease-in-out;transition:all 0.3s ease-in-out}.tooltip :before{border:solid;border-color:var(--border-color) transparent transparent transparent;border-width:5px;bottom:36px;content:"";left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);position:absolute;font-size:var(--amplify-text-sm);opacity:0;-webkit-transition:all 0.3s ease-in-out;transition:all 0.3s ease-in-out}.tooltip :hover:after{opacity:1;-webkit-transition-delay:1s;transition-delay:1s}.tooltip :hover:before{opacity:1;-webkit-transition-delay:1s;transition-delay:1s}.auto-show-tooltip :after{opacity:1;-webkit-transition-delay:1s;transition-delay:1s}.auto-show-tooltip :before{opacity:1;-webkit-transition-delay:1s;transition-delay:1s}';
    },
  },
]);
