"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [611],
  {
    7611: function (e, t, i) {
      i.r(t),
        i.d(t, {
          amplify_federated_sign_in: function () {
            return r;
          },
        });
      var a = i(2508),
        n = i(3769),
        d = i(5573),
        s = i(531),
        o = i(4636),
        f = new n.k("amplify-federated-sign-in"),
        r = (function () {
          function e(e) {
            (0, a.r)(this, e),
              (this.authState = d.A.SignIn),
              (this.federated = {});
          }
          return (
            (e.prototype.componentWillLoad = function () {
              if (!s.g || "function" !== typeof s.g.configure)
                throw new Error(o.N);
              var e = s.g.configure().oauth,
                t = void 0 === e ? {} : e;
              t.domain
                ? (this.federated.oauth_config = Object.assign(
                    Object.assign({}, this.federated.oauth_config),
                    t
                  ))
                : t.awsCognito &&
                  (this.federated.oauth_config = Object.assign(
                    Object.assign({}, this.federated.oauth_config),
                    t.awsCognito
                  )),
                t.auth0 &&
                  (this.federated.auth0 = Object.assign(
                    Object.assign({}, this.federated.auth0),
                    t.auth0
                  ));
            }),
            (e.prototype.render = function () {
              return this.federated
                ? Object.values(d.A).includes(this.authState)
                  ? (f.debug("federated Config is", this.federated),
                    (0, a.h)(
                      "amplify-form-section",
                      { "data-test": "federated-sign-in-section" },
                      (0, a.h)(
                        "amplify-section",
                        { "data-test": "federated-sign-in-body-section" },
                        (0, a.h)("amplify-federated-buttons", {
                          authState: this.authState,
                          "data-test": "federated-sign-in-buttons",
                          federated: this.federated,
                        })
                      )
                    ))
                  : null
                : (f.debug("federated prop is empty. show nothing"),
                  f.debug(
                    "federated={google_client_id: , facebook_app_id: , amazon_client_id}"
                  ),
                  null);
            }),
            e
          );
        })();
    },
  },
]);
