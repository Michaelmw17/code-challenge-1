"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [401],
  {
    5401: function (e, t, i) {
      i.r(t),
        i.d(t, {
          amplify_picker: function () {
            return p;
          },
        });
      var n = i(2508),
        c = i(1953),
        r = i(8063),
        p = (function () {
          function e(e) {
            (0, n.r)(this, e),
              (this.pickerText = r.T.PICKER_TEXT),
              (this.acceptValue = "*/*");
          }
          return (
            (e.prototype.render = function () {
              var e = this;
              return (0, n.h)(
                "div",
                { class: "picker" },
                (0, n.h)(
                  "slot",
                  { name: "picker" },
                  (0, n.h)("amplify-button", null, c.o.get(this.pickerText))
                ),
                (0, n.h)("input", {
                  title: c.o.get(this.pickerText),
                  type: "file",
                  accept: this.acceptValue,
                  onChange: function (t) {
                    return e.inputHandler(t);
                  },
                })
              );
            }),
            e
          );
        })();
      p.style =
        ".picker{position:relative;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}input[type=file]{width:100%;height:100%;display:inline-block;position:absolute;left:0;top:0;opacity:0;cursor:pointer}";
    },
  },
]);
