"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [801],
  {
    801: function (t, e, i) {
      i.r(e),
        i.d(e, {
          amplify_form_field: function () {
            return n;
          },
          amplify_hint: function () {
            return a;
          },
          amplify_input: function () {
            return l;
          },
          amplify_label: function () {
            return s;
          },
        });
      var o = i(2508),
        r = (i(5573), i(8063), i(1186)),
        n = (function () {
          function t(t) {
            (0, o.r)(this, t),
              (this.type = "text"),
              (this.required = !1),
              (this.placeholder = "");
          }
          return (
            (t.prototype.render = function () {
              return (0, o.h)(
                "div",
                { class: "form-field" },
                this.label &&
                  (0, o.h)(
                    "div",
                    { class: "form-field-label" },
                    (0, o.h)(
                      "amplify-label",
                      { htmlFor: this.fieldId },
                      this.label
                    )
                  ),
                this.description &&
                  (0, o.h)(
                    "div",
                    {
                      id: this.fieldId + "-description",
                      class: "form-field-description",
                      "data-test": "form-field-description",
                    },
                    this.description
                  ),
                (0, o.h)(
                  "div",
                  null,
                  (0, o.h)(
                    "slot",
                    { name: "input" },
                    (0, o.h)("amplify-input", {
                      fieldId: this.fieldId,
                      description: this.description,
                      type: this.type,
                      handleInputChange: this.handleInputChange,
                      placeholder: this.placeholder,
                      name: this.name,
                      value: this.value,
                      inputProps: this.inputProps,
                      disabled: this.disabled,
                      required: this.required,
                    })
                  )
                ),
                this.hint &&
                  (0, o.h)(
                    "amplify-hint",
                    { id: this.fieldId + "-hint" },
                    this.hint
                  )
              );
            }),
            t
          );
        })();
      n.style =
        "amplify-form-field{--label-font-size:var(--amplify-text-md);--description-font-size:var(--amplify-text-sm)}.form-field{margin-bottom:15px}.form-field-label{display:block;font-size:var(--label-font-size);padding-bottom:0.5em}.form-field-description{font-size:var(--description-font-size);padding-top:0.5em}";
      var a = (function () {
        function t(t) {
          (0, o.r)(this, t);
        }
        return (
          (t.prototype.render = function () {
            return (0, o.h)("div", { class: "hint" }, (0, o.h)("slot", null));
          }),
          t
        );
      })();
      a.style =
        ":host{--color:var(--amplify-grey);--font-family:var(--amplify-font-family);--font-size:var(--amplify-text-xs);--font-weight:var(--amplify-font-weight)}.hint{color:var(--color);font-family:var(--font-family);font-weight:var(--font-weight);font-size:var(--font-size);margin-bottom:2.625rem}";
      var l = (function () {
        function t(t) {
          (0, o.r)(this, t),
            (this.type = "text"),
            (this.handleInputChange = function () {}),
            (this.placeholder = ""),
            (this.required = !1),
            (this.autoCompleted = !1);
        }
        return (
          (t.prototype.setAutoCompleteValue = function (t) {
            var e = this.el.querySelector("input");
            e &&
              ((e.value = t),
              e.dispatchEvent(new Event("input")),
              (this.autoCompleted = !0));
          }),
          (t.prototype.checkAutoCompletion = function (t) {
            var e = this;
            t &&
              (t.value
                ? this.setAutoCompleteValue(t.value)
                : t.addEventListener("input", function (t) {
                    var i = t.target.value;
                    e.setAutoCompleteValue(i);
                  }));
          }),
          (t.prototype.disconnectedCallback = function () {
            this.removeHubListener && this.removeHubListener();
          }),
          (t.prototype.componentWillLoad = function () {
            var t = this;
            (0, r.e)("amplify-authenticator", this.el) &&
              (this.removeHubListener = (0, r.o)(function () {
                var e = t.el.querySelector("input");
                e && (e.value = ""), (t.autoCompleted = !1);
              }));
          }),
          (t.prototype.componentDidLoad = function () {
            if (
              !this.autoCompleted &&
              !this.value &&
              !/Firefox/.test(navigator.userAgent)
            ) {
              var t = (0, r.e)("amplify-auth-container", this.el),
                e = (0, r.e)("amplify-sign-in", this.el);
              if (t && e) {
                var i = t.querySelector("input[name='username']"),
                  o = t.querySelector("input[name='password']");
                "username" === this.name ||
                "email" === this.name ||
                "phone" === this.name
                  ? this.checkAutoCompletion(i)
                  : "password" === this.name && this.checkAutoCompletion(o);
              }
            }
          }),
          (t.prototype.render = function () {
            var t = this;
            return (0, o.h)(
              o.H,
              { class: "input-host" },
              (0, o.h)(
                "input",
                Object.assign(
                  {
                    id: this.fieldId,
                    "aria-describedby":
                      this.fieldId && this.description
                        ? this.fieldId + "-description"
                        : null,
                    "data-autocompleted": this.autoCompleted,
                    type: this.type,
                    onInput: function (e) {
                      (t.autoCompleted = !1), t.handleInputChange(e);
                    },
                    placeholder: this.placeholder,
                    name: this.name,
                    class: "input",
                    value: this.value,
                    disabled: this.disabled,
                    required: this.required,
                  },
                  this.inputProps
                )
              )
            );
          }),
          Object.defineProperty(t.prototype, "el", {
            get: function () {
              return (0, o.g)(this);
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        );
      })();
      l.style =
        "amplify-input{--color:var(--amplify-secondary-color);--background-color:var(--amplify-secondary-contrast);--border-color:var(--amplify-light-grey);--border-color-focus:var(--amplify-primary-color);--border:1px solid var(--border-color);--margin:0 0 0.625rem 0}[data-autocompleted]{background-color:#e8f0fe !important}.input-host{width:100%}.input{display:block;width:100%;padding:1rem;font-size:var(--amplify-text-sm);color:var(--color);background-color:var(--background-color);background-image:none;border:var(--border);border-radius:3px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:var(--margin);height:3.125rem;line-height:1.1;-webkit-box-shadow:none;box-shadow:none}.input:focus{outline:none;border-color:var(--border-color-focus)}.input:disabled{opacity:0.5}";
      var s = (function () {
        function t(t) {
          (0, o.r)(this, t);
        }
        return (
          (t.prototype.render = function () {
            return (0, o.h)(
              "label",
              { class: "label", htmlFor: this.htmlFor },
              (0, o.h)("slot", null)
            );
          }),
          t
        );
      })();
      s.style =
        ":host{--label-color:var(--amplify-secondary-color)}.label{color:var(--label-color);font-size:var(--amplify-text-sm);margin-bottom:16px}";
    },
  },
]);
