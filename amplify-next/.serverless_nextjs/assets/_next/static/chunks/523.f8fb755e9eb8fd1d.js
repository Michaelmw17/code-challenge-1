"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [523],
  {
    1523: function (i, t, e) {
      e.r(t),
        e.d(t, {
          amplify_checkbox: function () {
            return n;
          },
        });
      var c = e(2508),
        n = (function () {
          function i(i) {
            var t = this;
            (0, c.r)(this, i),
              (this.checked = !1),
              (this.disabled = !1),
              (this.onClick = function () {
                t.checked = !t.checked;
              });
          }
          return (
            (i.prototype.render = function () {
              return (0, c.h)(
                "span",
                { class: "checkbox" },
                (0, c.h)("input", {
                  onClick: this.onClick,
                  type: "checkbox",
                  name: this.name,
                  value: this.value,
                  id: this.fieldId,
                  checked: this.checked,
                  disabled: this.disabled,
                }),
                (0, c.h)("amplify-label", { htmlFor: this.fieldId }, this.label)
              );
            }),
            i
          );
        })();
      n.style =
        ":host{--font-family:var(--amplify-font-family)}.checkbox{margin-bottom:22px;display:block;width:100%;padding:16px;font-size:var(--amplify-text-sm);font-family:var(--font-family)}.checkbox input{margin-right:12px}";
    },
  },
]);
