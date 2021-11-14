exports.id = 467;
exports.ids = [467];
exports.modules = {
  /***/ 516: /***/ (__unused_webpack_module, exports) => {
    "use strict";
    /**
     * @popperjs/core v2.10.2 - MIT License
     */

    Object.defineProperty(exports, "__esModule", { value: true });

    // import { isHTMLElement } from './instanceOf';
    function getBoundingClientRect(
      element, // eslint-disable-next-line unused-imports/no-unused-vars
      includeScale
    ) {
      var rect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1; // FIXME:
      // `offsetWidth` returns an integer while `getBoundingClientRect`
      // returns a float. This results in `scaleX` or `scaleY` being
      // non-1 when it should be for elements that aren't a full pixel in
      // width or height.
      // if (isHTMLElement(element) && includeScale) {
      //   const offsetHeight = element.offsetHeight;
      //   const offsetWidth = element.offsetWidth;
      //   // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
      //   // Fallback to 1 in case both values are `0`
      //   if (offsetWidth > 0) {
      //     scaleX = rect.width / offsetWidth || 1;
      //   }
      //   if (offsetHeight > 0) {
      //     scaleY = rect.height / offsetHeight || 1;
      //   }
      // }

      return {
        width: rect.width / scaleX,
        height: rect.height / scaleY,
        top: rect.top / scaleY,
        right: rect.right / scaleX,
        bottom: rect.bottom / scaleY,
        left: rect.left / scaleX,
        x: rect.left / scaleX,
        y: rect.top / scaleY,
      };
    }

    function getWindow(node) {
      if (node == null) {
        return window;
      }

      if (node.toString() !== "[object Window]") {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }

      return node;
    }

    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
      };
    }

    function isElement(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }

    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }

    function isShadowRoot(node) {
      // IE 11 has no ShadowRoot
      if (typeof ShadowRoot === "undefined") {
        return false;
      }

      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }

    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop,
      };
    }

    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }

    function getNodeName(element) {
      return element ? (element.nodeName || "").toLowerCase() : null;
    }

    function getDocumentElement(element) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return (
        (isElement(element)
          ? element.ownerDocument // $FlowFixMe[prop-missing]
          : element.document) || window.document
      ).documentElement;
    }

    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return (
        getBoundingClientRect(getDocumentElement(element)).left +
        getWindowScroll(element).scrollLeft
      );
    }

    function getComputedStyle(element) {
      return getWindow(element).getComputedStyle(element);
    }

    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

      return /auto|scroll|overlay|hidden/.test(
        overflow + overflowY + overflowX
      );
    }

    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = rect.width / element.offsetWidth || 1;
      var scaleY = rect.height / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.

    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }

      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0,
      };
      var offsets = {
        x: 0,
        y: 0,
      };

      if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
        if (
          getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
          isScrollParent(documentElement)
        ) {
          scroll = getNodeScroll(offsetParent);
        }

        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }

      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height,
      };
    }

    // means it doesn't take into account transforms.

    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
      // Fixes https://github.com/popperjs/popper-core/issues/1223

      var width = element.offsetWidth;
      var height = element.offsetHeight;

      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }

      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }

      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height,
      };
    }

    function getParentNode(element) {
      if (getNodeName(element) === "html") {
        return element;
      }

      return (
        // this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || // DOM Element detected
        (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element) // fallback
      );
    }

    function getScrollParent(node) {
      if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return node.ownerDocument.body;
      }

      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }

      return getScrollParent(getParentNode(node));
    }

    /*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

    function listScrollParents(element, list) {
      var _element$ownerDocumen;

      if (list === void 0) {
        list = [];
      }

      var scrollParent = getScrollParent(element);
      var isBody =
        scrollParent ===
        ((_element$ownerDocumen = element.ownerDocument) == null
          ? void 0
          : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody
        ? [win].concat(
            win.visualViewport || [],
            isScrollParent(scrollParent) ? scrollParent : []
          )
        : scrollParent;
      var updatedList = list.concat(target);
      return isBody
        ? updatedList // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
        : updatedList.concat(listScrollParents(getParentNode(target)));
    }

    function isTableElement(element) {
      return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
    }

    function getTrueOffsetParent(element) {
      if (
        !isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
        getComputedStyle(element).position === "fixed"
      ) {
        return null;
      }

      return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block

    function getContainingBlock(element) {
      var isFirefox =
        navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
      var isIE = navigator.userAgent.indexOf("Trident") !== -1;

      if (isIE && isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = getComputedStyle(element);

        if (elementCss.position === "fixed") {
          return null;
        }
      }

      var currentNode = getParentNode(element);

      while (
        isHTMLElement(currentNode) &&
        ["html", "body"].indexOf(getNodeName(currentNode)) < 0
      ) {
        var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

        if (
          css.transform !== "none" ||
          css.perspective !== "none" ||
          css.contain === "paint" ||
          ["transform", "perspective"].indexOf(css.willChange) !== -1 ||
          (isFirefox && css.willChange === "filter") ||
          (isFirefox && css.filter && css.filter !== "none")
        ) {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }

      return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.

    function getOffsetParent(element) {
      var window = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);

      while (
        offsetParent &&
        isTableElement(offsetParent) &&
        getComputedStyle(offsetParent).position === "static"
      ) {
        offsetParent = getTrueOffsetParent(offsetParent);
      }

      if (
        offsetParent &&
        (getNodeName(offsetParent) === "html" ||
          (getNodeName(offsetParent) === "body" &&
            getComputedStyle(offsetParent).position === "static"))
      ) {
        return window;
      }

      return offsetParent || getContainingBlock(element) || window;
    }

    var top = "top";
    var bottom = "bottom";
    var right = "right";
    var left = "left";
    var auto = "auto";
    var basePlacements = [top, bottom, right, left];
    var start = "start";
    var end = "end";
    var clippingParents = "clippingParents";
    var viewport = "viewport";
    var popper = "popper";
    var reference = "reference";
    var variationPlacements = /*#__PURE__*/ basePlacements.reduce(function (
      acc,
      placement
    ) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    },
    []);
    var placements = /*#__PURE__*/ []
      .concat(basePlacements, [auto])
      .reduce(function (acc, placement) {
        return acc.concat([
          placement,
          placement + "-" + start,
          placement + "-" + end,
        ]);
      }, []); // modifiers that need to read the DOM

    var beforeRead = "beforeRead";
    var read = "read";
    var afterRead = "afterRead"; // pure-logic modifiers

    var beforeMain = "beforeMain";
    var main = "main";
    var afterMain = "afterMain"; // modifier with the purpose to write to the DOM (or write into a framework state)

    var beforeWrite = "beforeWrite";
    var write = "write";
    var afterWrite = "afterWrite";
    var modifierPhases = [
      beforeRead,
      read,
      afterRead,
      beforeMain,
      main,
      afterMain,
      beforeWrite,
      write,
      afterWrite,
    ];

    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively

      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(
          modifier.requires || [],
          modifier.requiresIfExists || []
        );
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);

            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }

      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }

    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase

      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(
          orderedModifiers.filter(function (modifier) {
            return modifier.phase === phase;
          })
        );
      }, []);
    }

    function debounce(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }

        return pending;
      };
    }

    function format(str) {
      for (
        var _len = arguments.length,
          args = new Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        args[_key - 1] = arguments[_key];
      }

      return [].concat(args).reduce(function (p, c) {
        return p.replace(/%s/, c);
      }, str);
    }

    var INVALID_MODIFIER_ERROR =
      'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
    var MISSING_DEPENDENCY_ERROR =
      'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
    var VALID_PROPERTIES = /* unused pure expression or super */ null && [
      "name",
      "enabled",
      "phase",
      "fn",
      "effect",
      "requires",
      "options",
    ];
    function validateModifiers(modifiers) {
      modifiers.forEach(function (modifier) {
        []
          .concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
          .filter(function (value, index, self) {
            return self.indexOf(value) === index;
          })
          .forEach(function (key) {
            switch (key) {
              case "name":
                if (typeof modifier.name !== "string") {
                  console.error(
                    format(
                      INVALID_MODIFIER_ERROR,
                      String(modifier.name),
                      '"name"',
                      '"string"',
                      '"' + String(modifier.name) + '"'
                    )
                  );
                }

                break;

              case "enabled":
                if (typeof modifier.enabled !== "boolean") {
                  console.error(
                    format(
                      INVALID_MODIFIER_ERROR,
                      modifier.name,
                      '"enabled"',
                      '"boolean"',
                      '"' + String(modifier.enabled) + '"'
                    )
                  );
                }

                break;

              case "phase":
                if (modifierPhases.indexOf(modifier.phase) < 0) {
                  console.error(
                    format(
                      INVALID_MODIFIER_ERROR,
                      modifier.name,
                      '"phase"',
                      "either " + modifierPhases.join(", "),
                      '"' + String(modifier.phase) + '"'
                    )
                  );
                }

                break;

              case "fn":
                if (typeof modifier.fn !== "function") {
                  console.error(
                    format(
                      INVALID_MODIFIER_ERROR,
                      modifier.name,
                      '"fn"',
                      '"function"',
                      '"' + String(modifier.fn) + '"'
                    )
                  );
                }

                break;

              case "effect":
                if (
                  modifier.effect != null &&
                  typeof modifier.effect !== "function"
                ) {
                  console.error(
                    format(
                      INVALID_MODIFIER_ERROR,
                      modifier.name,
                      '"effect"',
                      '"function"',
                      '"' + String(modifier.fn) + '"'
                    )
                  );
                }

                break;

              case "requires":
                if (
                  modifier.requires != null &&
                  !Array.isArray(modifier.requires)
                ) {
                  console.error(
                    format(
                      INVALID_MODIFIER_ERROR,
                      modifier.name,
                      '"requires"',
                      '"array"',
                      '"' + String(modifier.requires) + '"'
                    )
                  );
                }

                break;

              case "requiresIfExists":
                if (!Array.isArray(modifier.requiresIfExists)) {
                  console.error(
                    format(
                      INVALID_MODIFIER_ERROR,
                      modifier.name,
                      '"requiresIfExists"',
                      '"array"',
                      '"' + String(modifier.requiresIfExists) + '"'
                    )
                  );
                }

                break;

              case "options":
              case "data":
                break;

              default:
                console.error(
                  'PopperJS: an invalid property has been provided to the "' +
                    modifier.name +
                    '" modifier, valid properties are ' +
                    VALID_PROPERTIES.map(function (s) {
                      return '"' + s + '"';
                    }).join(", ") +
                    '; but "' +
                    key +
                    '" was provided.'
                );
            }

            modifier.requires &&
              modifier.requires.forEach(function (requirement) {
                if (
                  modifiers.find(function (mod) {
                    return mod.name === requirement;
                  }) == null
                ) {
                  console.error(
                    format(
                      MISSING_DEPENDENCY_ERROR,
                      String(modifier.name),
                      requirement,
                      requirement
                    )
                  );
                }
              });
          });
      });
    }

    function uniqueBy(arr, fn) {
      var identifiers = new Set();
      return arr.filter(function (item) {
        var identifier = fn(item);

        if (!identifiers.has(identifier)) {
          identifiers.add(identifier);
          return true;
        }
      });
    }

    function getBasePlacement(placement) {
      return placement.split("-")[0];
    }

    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing
          ? Object.assign({}, existing, current, {
              options: Object.assign({}, existing.options, current.options),
              data: Object.assign({}, existing.data, current.data),
            })
          : current;
        return merged;
      }, {}); // IE11 does not support Object.values

      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }

    function getViewportRect(element) {
      var win = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
      // can be obscured underneath it.
      // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
      // if it isn't open, so if this isn't available, the popper will be detected
      // to overflow the bottom of the screen too early.

      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
        // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
        // errors due to floating point numbers, so we need to check precision.
        // Safari returns a number <= 0, usually < -1 when pinch-zoomed
        // Feature detection fails in mobile emulation mode in Chrome.
        // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
        // 0.001
        // Fallback here: "Not Safari" userAgent

        if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }

      return {
        width: width,
        height: height,
        x: x + getWindowScrollBarX(element),
        y: y,
      };
    }

    var max = Math.max;
    var min = Math.min;
    var round = Math.round;

    // of the `<html>` and `<body>` rect bounds if horizontally scrollable

    function getDocumentRect(element) {
      var _element$ownerDocumen;

      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body =
        (_element$ownerDocumen = element.ownerDocument) == null
          ? void 0
          : _element$ownerDocumen.body;
      var width = max(
        html.scrollWidth,
        html.clientWidth,
        body ? body.scrollWidth : 0,
        body ? body.clientWidth : 0
      );
      var height = max(
        html.scrollHeight,
        html.clientHeight,
        body ? body.scrollHeight : 0,
        body ? body.clientHeight : 0
      );
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;

      if (getComputedStyle(body || html).direction === "rtl") {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }

      return {
        width: width,
        height: height,
        x: x,
        y: y,
      };
    }

    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...

          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false

      return false;
    }

    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height,
      });
    }

    function getInnerBoundingClientRect(element) {
      var rect = getBoundingClientRect(element);
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }

    function getClientRectFromMixedType(element, clippingParent) {
      return clippingParent === viewport
        ? rectToClientRect(getViewportRect(element))
        : isHTMLElement(clippingParent)
        ? getInnerBoundingClientRect(clippingParent)
        : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`

    function getClippingParents(element) {
      var clippingParents = listScrollParents(getParentNode(element));
      var canEscapeClipping =
        ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
      var clipperElement =
        canEscapeClipping && isHTMLElement(element)
          ? getOffsetParent(element)
          : element;

      if (!isElement(clipperElement)) {
        return [];
      } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

      return clippingParents.filter(function (clippingParent) {
        return (
          isElement(clippingParent) &&
          contains(clippingParent, clipperElement) &&
          getNodeName(clippingParent) !== "body"
        );
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents

    function getClippingRect(element, boundary, rootBoundary) {
      var mainClippingParents =
        boundary === "clippingParents"
          ? getClippingParents(element)
          : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (
        accRect,
        clippingParent
      ) {
        var rect = getClientRectFromMixedType(element, clippingParent);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      },
      getClientRectFromMixedType(element, firstClippingParent));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }

    function getVariation(placement) {
      return placement.split("-")[1];
    }

    function getMainAxisFromPlacement(placement) {
      return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
    }

    function computeOffsets(_ref) {
      var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;

      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height,
          };
          break;

        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height,
          };
          break;

        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY,
          };
          break;

        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY,
          };
          break;

        default:
          offsets = {
            x: reference.x,
            y: reference.y,
          };
      }

      var mainAxis = basePlacement
        ? getMainAxisFromPlacement(basePlacement)
        : null;

      if (mainAxis != null) {
        var len = mainAxis === "y" ? "height" : "width";

        switch (variation) {
          case start:
            offsets[mainAxis] =
              offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
            break;

          case end:
            offsets[mainAxis] =
              offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
            break;
        }
      }

      return offsets;
    }

    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };
    }

    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }

    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }

    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
        _options$placement = _options.placement,
        placement =
          _options$placement === void 0 ? state.placement : _options$placement,
        _options$boundary = _options.boundary,
        boundary =
          _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary =
          _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext =
          _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary =
          _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(
        typeof padding !== "number"
          ? padding
          : expandToHashMap(padding, basePlacements)
      );
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(
        isElement(element)
          ? element
          : element.contextElement || getDocumentElement(state.elements.popper),
        boundary,
        rootBoundary
      );
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: "absolute",
        placement: placement,
      });
      var popperClientRect = rectToClientRect(
        Object.assign({}, popperRect, popperOffsets)
      );
      var elementClientRect =
        elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect

      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom:
          elementClientRect.bottom -
          clippingClientRect.bottom +
          paddingObject.bottom,
        left:
          clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right:
          elementClientRect.right -
          clippingClientRect.right +
          paddingObject.right,
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }

      return overflowOffsets;
    }

    var INVALID_ELEMENT_ERROR =
      "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
    var INFINITE_LOOP_ERROR =
      "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
    var DEFAULT_OPTIONS = {
      placement: "bottom",
      modifiers: [],
      strategy: "absolute",
    };

    function areValidElements() {
      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      return !args.some(function (element) {
        return !(
          element && typeof element.getBoundingClientRect === "function"
        );
      });
    }

    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }

      var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers =
          _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions =
          _generatorOptions$def2 === void 0
            ? DEFAULT_OPTIONS
            : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }

        var state = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper,
          },
          attributes: {},
          styles: {},
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(setOptionsAction) {
            var options =
              typeof setOptionsAction === "function"
                ? setOptionsAction(state.options)
                : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign(
              {},
              defaultOptions,
              state.options,
              options
            );
            state.scrollParents = {
              reference: isElement(reference)
                ? listScrollParents(reference)
                : reference.contextElement
                ? listScrollParents(reference.contextElement)
                : [],
              popper: listScrollParents(popper),
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties

            var orderedModifiers = orderModifiers(
              mergeByName([].concat(defaultModifiers, state.options.modifiers))
            ); // Strip out disabled modifiers

            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            }); // Validate the provided modifiers so that the consumer will get warned
            // if one of the modifiers is invalid for any reason

            if (false) {
              var _getComputedStyle,
                marginTop,
                marginRight,
                marginBottom,
                marginLeft,
                flipModifier,
                modifiers;
            }

            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }

            var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore

            if (!areValidElements(reference, popper)) {
              if (false) {
              }

              return;
            } // Store the reference and popper rects to be read by modifiers

            state.rects = {
              reference: getCompositeRect(
                reference,
                getOffsetParent(popper),
                state.options.strategy === "fixed"
              ),
              popper: getLayoutRect(popper),
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect

            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`

            state.orderedModifiers.forEach(function (modifier) {
              return (state.modifiersData[modifier.name] = Object.assign(
                {},
                modifier.data
              ));
            });
            var __debug_loops__ = 0;

            for (
              var index = 0;
              index < state.orderedModifiers.length;
              index++
            ) {
              if (false) {
              }

              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }

              var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options =
                  _state$orderedModifie2 === void 0
                    ? {}
                    : _state$orderedModifie2,
                name = _state$orderedModifie.name;

              if (typeof fn === "function") {
                state =
                  fn({
                    state: state,
                    options: _options,
                    name: name,
                    instance: instance,
                  }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          },
        };

        if (!areValidElements(reference, popper)) {
          if (false) {
          }

          return instance;
        }

        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.

        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref3) {
            var name = _ref3.name,
              _ref3$options = _ref3.options,
              options = _ref3$options === void 0 ? {} : _ref3$options,
              effect = _ref3.effect;

            if (typeof effect === "function") {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options,
              });

              var noopFn = function noopFn() {};

              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }

        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }

        return instance;
      };
    }

    var passive = {
      passive: true,
    };

    function effect$2(_ref) {
      var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
      var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow(state.elements.popper);
      var scrollParents = [].concat(
        state.scrollParents.reference,
        state.scrollParents.popper
      );

      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener("scroll", instance.update, passive);
        });
      }

      if (resize) {
        window.addEventListener("resize", instance.update, passive);
      }

      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener(
              "scroll",
              instance.update,
              passive
            );
          });
        }

        if (resize) {
          window.removeEventListener("resize", instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules

    var eventListeners = {
      name: "eventListeners",
      enabled: true,
      phase: "write",
      fn: function fn() {},
      effect: effect$2,
      data: {},
    };

    function popperOffsets(_ref) {
      var state = _ref.state,
        name = _ref.name;
      // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: "absolute",
        placement: state.placement,
      });
    } // eslint-disable-next-line import/no-unused-modules

    var popperOffsets$1 = {
      name: "popperOffsets",
      enabled: true,
      phase: "read",
      fn: popperOffsets,
      data: {},
    };

    var unsetSides = {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto",
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.

    function roundOffsetsByDPR(_ref) {
      var x = _ref.x,
        y = _ref.y;
      var win = window;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(round(x * dpr) / dpr) || 0,
        y: round(round(y * dpr) / dpr) || 0,
      };
    }

    function mapToStyles(_ref2) {
      var _Object$assign2;

      var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets;

      var _ref3 =
          roundOffsets === true
            ? roundOffsetsByDPR(offsets)
            : typeof roundOffsets === "function"
            ? roundOffsets(offsets)
            : offsets,
        _ref3$x = _ref3.x,
        x = _ref3$x === void 0 ? 0 : _ref3$x,
        _ref3$y = _ref3.y,
        y = _ref3$y === void 0 ? 0 : _ref3$y;

      var hasX = offsets.hasOwnProperty("x");
      var hasY = offsets.hasOwnProperty("y");
      var sideX = left;
      var sideY = top;
      var win = window;

      if (adaptive) {
        var offsetParent = getOffsetParent(popper);
        var heightProp = "clientHeight";
        var widthProp = "clientWidth";

        if (offsetParent === getWindow(popper)) {
          offsetParent = getDocumentElement(popper);

          if (
            getComputedStyle(offsetParent).position !== "static" &&
            position === "absolute"
          ) {
            heightProp = "scrollHeight";
            widthProp = "scrollWidth";
          }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

        offsetParent = offsetParent;

        if (
          placement === top ||
          ((placement === left || placement === right) && variation === end)
        ) {
          sideY = bottom; // $FlowFixMe[prop-missing]

          y -= offsetParent[heightProp] - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }

        if (
          placement === left ||
          ((placement === top || placement === bottom) && variation === end)
        ) {
          sideX = right; // $FlowFixMe[prop-missing]

          x -= offsetParent[widthProp] - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }

      var commonStyles = Object.assign(
        {
          position: position,
        },
        adaptive && unsetSides
      );

      if (gpuAcceleration) {
        var _Object$assign;

        return Object.assign(
          {},
          commonStyles,
          ((_Object$assign = {}),
          (_Object$assign[sideY] = hasY ? "0" : ""),
          (_Object$assign[sideX] = hasX ? "0" : ""),
          (_Object$assign.transform =
            (win.devicePixelRatio || 1) <= 1
              ? "translate(" + x + "px, " + y + "px)"
              : "translate3d(" + x + "px, " + y + "px, 0)"),
          _Object$assign)
        );
      }

      return Object.assign(
        {},
        commonStyles,
        ((_Object$assign2 = {}),
        (_Object$assign2[sideY] = hasY ? y + "px" : ""),
        (_Object$assign2[sideX] = hasX ? x + "px" : ""),
        (_Object$assign2.transform = ""),
        _Object$assign2)
      );
    }

    function computeStyles(_ref4) {
      var state = _ref4.state,
        options = _ref4.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration =
          _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets =
          _options$roundOffsets === void 0 ? true : _options$roundOffsets;

      if (false) {
        var transitionProperty;
      }

      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration,
      };

      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign(
          {},
          state.styles.popper,
          mapToStyles(
            Object.assign({}, commonStyles, {
              offsets: state.modifiersData.popperOffsets,
              position: state.options.strategy,
              adaptive: adaptive,
              roundOffsets: roundOffsets,
            })
          )
        );
      }

      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign(
          {},
          state.styles.arrow,
          mapToStyles(
            Object.assign({}, commonStyles, {
              offsets: state.modifiersData.arrow,
              position: "absolute",
              adaptive: false,
              roundOffsets: roundOffsets,
            })
          )
        );
      }

      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        "data-popper-placement": state.placement,
      });
    } // eslint-disable-next-line import/no-unused-modules

    var computeStyles$1 = {
      name: "computeStyles",
      enabled: true,
      phase: "beforeWrite",
      fn: computeStyles,
      data: {},
    };

    // and applies them to the HTMLElements such as popper and arrow

    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];

          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? "" : value);
          }
        });
      });
    }

    function effect$1(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: "0",
          top: "0",
          margin: "0",
        },
        arrow: {
          position: "absolute",
        },
        reference: {},
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }

      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(
            state.styles.hasOwnProperty(name)
              ? state.styles[name]
              : initialStyles[name]
          ); // Set all values to an empty string to unset them

          var style = styleProperties.reduce(function (style, property) {
            style[property] = "";
            return style;
          }, {}); // arrow is optional + virtual elements

          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }

          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules

    var applyStyles$1 = {
      name: "applyStyles",
      enabled: true,
      phase: "write",
      fn: applyStyles,
      effect: effect$1,
      requires: ["computeStyles"],
    };

    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

      var _ref =
          typeof offset === "function"
            ? offset(
                Object.assign({}, rects, {
                  placement: placement,
                })
              )
            : offset,
        skidding = _ref[0],
        distance = _ref[1];

      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0
        ? {
            x: distance,
            y: skidding,
          }
        : {
            x: skidding,
            y: distance,
          };
    }

    function offset(_ref2) {
      var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
      var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(
          placement,
          state.rects,
          offset
        );
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules

    var offset$1 = {
      name: "offset",
      enabled: true,
      phase: "main",
      requires: ["popperOffsets"],
      fn: offset,
    };

    var hash$1 = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom",
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash$1[matched];
      });
    }

    var hash = {
      start: "end",
      end: "start",
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash[matched];
      });
    }

    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements =
          _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation
        ? flipVariations
          ? variationPlacements
          : variationPlacements.filter(function (placement) {
              return getVariation(placement) === variation;
            })
        : basePlacements;
      var allowedPlacements = placements$1.filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      });

      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;

        if (false) {
        }
      } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

      var overflows = allowedPlacements.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
        })[getBasePlacement(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }

    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }

      var oppositePlacement = getOppositePlacement(placement);
      return [
        getOppositeVariationPlacement(placement),
        oppositePlacement,
        getOppositeVariationPlacement(oppositePlacement),
      ];
    }

    function flip(_ref) {
      var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

      if (state.modifiersData[name]._skip) {
        return;
      }

      var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations =
          _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements =
        specifiedFallbackPlacements ||
        (isBasePlacement || !flipVariations
          ? [getOppositePlacement(preferredPlacement)]
          : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement]
        .concat(fallbackPlacements)
        .reduce(function (acc, placement) {
          return acc.concat(
            getBasePlacement(placement) === auto
              ? computeAutoPlacement(state, {
                  placement: placement,
                  boundary: boundary,
                  rootBoundary: rootBoundary,
                  padding: padding,
                  flipVariations: flipVariations,
                  allowedAutoPlacements: allowedAutoPlacements,
                })
              : placement
          );
        }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];

      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];

        var _basePlacement = getBasePlacement(placement);

        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? "width" : "height";
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding,
        });
        var mainVariationSide = isVertical
          ? isStartVariation
            ? right
            : left
          : isStartVariation
          ? bottom
          : top;

        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }

        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];

        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }

        if (checkAltAxis) {
          checks.push(
            overflow[mainVariationSide] <= 0,
            overflow[altVariationSide] <= 0
          );
        }

        if (
          checks.every(function (check) {
            return check;
          })
        ) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }

        checksMap.set(placement, checks);
      }

      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;

        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);

            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });

          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };

        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);

          if (_ret === "break") break;
        }
      }

      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules

    var flip$1 = {
      name: "flip",
      enabled: true,
      phase: "main",
      fn: flip,
      requiresIfExists: ["offset"],
      data: {
        _skip: false,
      },
    };

    function getAltAxis(axis) {
      return axis === "x" ? "y" : "x";
    }

    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }

    function preventOverflow(_ref) {
      var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
      var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset =
          _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary,
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue =
        typeof tetherOffset === "function"
          ? tetherOffset(
              Object.assign({}, state.rects, {
                placement: state.placement,
              })
            )
          : tetherOffset;
      var data = {
        x: 0,
        y: 0,
      };

      if (!popperOffsets) {
        return;
      }

      if (checkMainAxis || checkAltAxis) {
        var mainSide = mainAxis === "y" ? top : left;
        var altSide = mainAxis === "y" ? bottom : right;
        var len = mainAxis === "y" ? "height" : "width";
        var offset = popperOffsets[mainAxis];
        var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
        var max$1 = popperOffsets[mainAxis] - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen =
          variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds

        var arrowElement = state.elements.arrow;
        var arrowRect =
          tether && arrowElement
            ? getLayoutRect(arrowElement)
            : {
                width: 0,
                height: 0,
              };
        var arrowPaddingObject = state.modifiersData["arrow#persistent"]
          ? state.modifiersData["arrow#persistent"].padding
          : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)

        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement
          ? referenceRect[len] / 2 -
            additive -
            arrowLen -
            arrowPaddingMin -
            tetherOffsetValue
          : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
        var maxOffset = isBasePlacement
          ? -referenceRect[len] / 2 +
            additive +
            arrowLen +
            arrowPaddingMax +
            tetherOffsetValue
          : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
        var arrowOffsetParent =
          state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent
          ? mainAxis === "y"
            ? arrowOffsetParent.clientTop || 0
            : arrowOffsetParent.clientLeft || 0
          : 0;
        var offsetModifierValue = state.modifiersData.offset
          ? state.modifiersData.offset[state.placement][mainAxis]
          : 0;
        var tetherMin =
          popperOffsets[mainAxis] +
          minOffset -
          offsetModifierValue -
          clientOffset;
        var tetherMax =
          popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

        if (checkMainAxis) {
          var preventedOffset = within(
            tether ? min(min$1, tetherMin) : min$1,
            offset,
            tether ? max(max$1, tetherMax) : max$1
          );
          popperOffsets[mainAxis] = preventedOffset;
          data[mainAxis] = preventedOffset - offset;
        }

        if (checkAltAxis) {
          var _mainSide = mainAxis === "x" ? top : left;

          var _altSide = mainAxis === "x" ? bottom : right;

          var _offset = popperOffsets[altAxis];

          var _min = _offset + overflow[_mainSide];

          var _max = _offset - overflow[_altSide];

          var _preventedOffset = within(
            tether ? min(_min, tetherMin) : _min,
            _offset,
            tether ? max(_max, tetherMax) : _max
          );

          popperOffsets[altAxis] = _preventedOffset;
          data[altAxis] = _preventedOffset - _offset;
        }
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules

    var preventOverflow$1 = {
      name: "preventOverflow",
      enabled: true,
      phase: "main",
      fn: preventOverflow,
      requiresIfExists: ["offset"],
    };

    var toPaddingObject = function toPaddingObject(padding, state) {
      padding =
        typeof padding === "function"
          ? padding(
              Object.assign({}, state.rects, {
                placement: state.placement,
              })
            )
          : padding;
      return mergePaddingObject(
        typeof padding !== "number"
          ? padding
          : expandToHashMap(padding, basePlacements)
      );
    };

    function arrow(_ref) {
      var _state$modifiersData$;

      var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? "height" : "width";

      if (!arrowElement || !popperOffsets) {
        return;
      }

      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === "y" ? top : left;
      var maxProp = axis === "y" ? bottom : right;
      var endDiff =
        state.rects.reference[len] +
        state.rects.reference[axis] -
        popperOffsets[axis] -
        state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent
        ? axis === "y"
          ? arrowOffsetParent.clientHeight || 0
          : arrowOffsetParent.clientWidth || 0
        : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds

      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...

      var axisProp = axis;
      state.modifiersData[name] =
        ((_state$modifiersData$ = {}),
        (_state$modifiersData$[axisProp] = offset),
        (_state$modifiersData$.centerOffset = offset - center),
        _state$modifiersData$);
    }

    function effect(_ref2) {
      var state = _ref2.state,
        options = _ref2.options;
      var _options$element = options.element,
        arrowElement =
          _options$element === void 0
            ? "[data-popper-arrow]"
            : _options$element;

      if (arrowElement == null) {
        return;
      } // CSS selector

      if (typeof arrowElement === "string") {
        arrowElement = state.elements.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return;
        }
      }

      if (false) {
      }

      if (!contains(state.elements.popper, arrowElement)) {
        if (false) {
        }

        return;
      }

      state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules

    var arrow$1 = {
      name: "arrow",
      enabled: true,
      phase: "main",
      fn: arrow,
      effect: effect,
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"],
    };

    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0,
        };
      }

      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x,
      };
    }

    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }

    function hide(_ref) {
      var state = _ref.state,
        name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: "reference",
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true,
      });
      var referenceClippingOffsets = getSideOffsets(
        referenceOverflow,
        referenceRect
      );
      var popperEscapeOffsets = getSideOffsets(
        popperAltOverflow,
        popperRect,
        preventedOffsets
      );
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped,
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        "data-popper-reference-hidden": isReferenceHidden,
        "data-popper-escaped": hasPopperEscaped,
      });
    } // eslint-disable-next-line import/no-unused-modules

    var hide$1 = {
      name: "hide",
      enabled: true,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: hide,
    };

    var defaultModifiers$1 = [
      eventListeners,
      popperOffsets$1,
      computeStyles$1,
      applyStyles$1,
    ];
    var createPopper$1 = /*#__PURE__*/ popperGenerator({
      defaultModifiers: defaultModifiers$1,
    }); // eslint-disable-next-line import/no-unused-modules

    var defaultModifiers = [
      eventListeners,
      popperOffsets$1,
      computeStyles$1,
      applyStyles$1,
      offset$1,
      flip$1,
      preventOverflow$1,
      arrow$1,
      hide$1,
    ];
    var createPopper = /*#__PURE__*/ popperGenerator({
      defaultModifiers: defaultModifiers,
    }); // eslint-disable-next-line import/no-unused-modules

    exports.applyStyles = applyStyles$1;
    exports.arrow = arrow$1;
    exports.computeStyles = computeStyles$1;
    exports.createPopper = createPopper;
    exports.createPopperLite = createPopper$1;
    exports.defaultModifiers = defaultModifiers;
    exports.detectOverflow = detectOverflow;
    exports.eventListeners = eventListeners;
    exports.flip = flip$1;
    exports.hide = hide$1;
    exports.offset = offset$1;
    exports.popperGenerator = popperGenerator;
    exports.popperOffsets = popperOffsets$1;
    exports.preventOverflow = preventOverflow$1;
    //# sourceMappingURL=popper.js.map

    /***/
  },

  /***/ 97621: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Z: () => __WEBPACK_DEFAULT_EXPORT__,
      /* harmony export */
    });
    function dateLongFormatter(pattern, formatLong) {
      switch (pattern) {
        case "P":
          return formatLong.date({
            width: "short",
          });

        case "PP":
          return formatLong.date({
            width: "medium",
          });

        case "PPP":
          return formatLong.date({
            width: "long",
          });

        case "PPPP":
        default:
          return formatLong.date({
            width: "full",
          });
      }
    }

    function timeLongFormatter(pattern, formatLong) {
      switch (pattern) {
        case "p":
          return formatLong.time({
            width: "short",
          });

        case "pp":
          return formatLong.time({
            width: "medium",
          });

        case "ppp":
          return formatLong.time({
            width: "long",
          });

        case "pppp":
        default:
          return formatLong.time({
            width: "full",
          });
      }
    }

    function dateTimeLongFormatter(pattern, formatLong) {
      var matchResult = pattern.match(/(P+)(p+)?/);
      var datePattern = matchResult[1];
      var timePattern = matchResult[2];

      if (!timePattern) {
        return dateLongFormatter(pattern, formatLong);
      }

      var dateTimeFormat;

      switch (datePattern) {
        case "P":
          dateTimeFormat = formatLong.dateTime({
            width: "short",
          });
          break;

        case "PP":
          dateTimeFormat = formatLong.dateTime({
            width: "medium",
          });
          break;

        case "PPP":
          dateTimeFormat = formatLong.dateTime({
            width: "long",
          });
          break;

        case "PPPP":
        default:
          dateTimeFormat = formatLong.dateTime({
            width: "full",
          });
          break;
      }

      return dateTimeFormat
        .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
        .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
    }

    var longFormatters = {
      p: timeLongFormatter,
      P: dateTimeLongFormatter,
    };
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
      longFormatters;

    /***/
  },

  /***/ 24262: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Z: () =>
        /* binding */ getTimezoneOffsetInMilliseconds,
      /* harmony export */
    });
    /**
     * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
     * They usually appear for dates that denote time before the timezones were introduced
     * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
     * and GMT+01:00:00 after that date)
     *
     * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
     * which would lead to incorrect calculations.
     *
     * This function returns the timezone offset in milliseconds that takes seconds in account.
     */
    function getTimezoneOffsetInMilliseconds(date) {
      var utcDate = new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds()
        )
      );
      utcDate.setUTCFullYear(date.getFullYear());
      return date.getTime() - utcDate.getTime();
    }

    /***/
  },

  /***/ 33276: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";

    // EXPORTS
    __webpack_require__.d(__webpack_exports__, {
      Z: () => /* binding */ getUTCISOWeek,
    });

    // EXTERNAL MODULE: ./node_modules/date-fns/esm/toDate/index.js
    var toDate = __webpack_require__(19013);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js
    var startOfUTCISOWeek = __webpack_require__(66979);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js
    var getUTCISOWeekYear = __webpack_require__(7032);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/requiredArgs/index.js
    var requiredArgs = __webpack_require__(13882); // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js
    // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function startOfUTCISOWeekYear(dirtyDate) {
      (0, requiredArgs /* default */.Z)(1, arguments);
      var year = (0, getUTCISOWeekYear /* default */.Z)(dirtyDate);
      var fourthOfJanuary = new Date(0);
      fourthOfJanuary.setUTCFullYear(year, 0, 4);
      fourthOfJanuary.setUTCHours(0, 0, 0, 0);
      var date = (0, startOfUTCISOWeek /* default */.Z)(fourthOfJanuary);
      return date;
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js
    var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function getUTCISOWeek(dirtyDate) {
      (0, requiredArgs /* default */.Z)(1, arguments);
      var date = (0, toDate["default"])(dirtyDate);
      var diff =
        (0, startOfUTCISOWeek /* default */.Z)(date).getTime() -
        startOfUTCISOWeekYear(date).getTime(); // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)

      return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
    }

    /***/
  },

  /***/ 7032: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Z: () => /* binding */ getUTCISOWeekYear,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(66979);
    /* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function getUTCISOWeekYear(dirtyDate) {
      (0,
      _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var year = date.getUTCFullYear();
      var fourthOfJanuaryOfNextYear = new Date(0);
      fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
      fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
      var startOfNextYear = (0,
      _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        fourthOfJanuaryOfNextYear
      );
      var fourthOfJanuaryOfThisYear = new Date(0);
      fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
      fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
      var startOfThisYear = (0,
      _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        fourthOfJanuaryOfThisYear
      );

      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    /***/
  },

  /***/ 5230: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";

    // EXPORTS
    __webpack_require__.d(__webpack_exports__, {
      Z: () => /* binding */ getUTCWeek,
    });

    // EXTERNAL MODULE: ./node_modules/date-fns/esm/toDate/index.js
    var toDate = __webpack_require__(19013);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js
    var startOfUTCWeek = __webpack_require__(59025);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/toInteger/index.js
    var toInteger = __webpack_require__(83946);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js
    var getUTCWeekYear = __webpack_require__(7651);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/requiredArgs/index.js
    var requiredArgs = __webpack_require__(13882); // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js
    // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
      (0, requiredArgs /* default */.Z)(1, arguments);
      var options = dirtyOptions || {};
      var locale = options.locale;
      var localeFirstWeekContainsDate =
        locale && locale.options && locale.options.firstWeekContainsDate;
      var defaultFirstWeekContainsDate =
        localeFirstWeekContainsDate == null
          ? 1
          : (0, toInteger /* default */.Z)(localeFirstWeekContainsDate);
      var firstWeekContainsDate =
        options.firstWeekContainsDate == null
          ? defaultFirstWeekContainsDate
          : (0, toInteger /* default */.Z)(options.firstWeekContainsDate);
      var year = (0, getUTCWeekYear /* default */.Z)(dirtyDate, dirtyOptions);
      var firstWeek = new Date(0);
      firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
      firstWeek.setUTCHours(0, 0, 0, 0);
      var date = (0, startOfUTCWeek /* default */.Z)(firstWeek, dirtyOptions);
      return date;
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/getUTCWeek/index.js
    var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function getUTCWeek(dirtyDate, options) {
      (0, requiredArgs /* default */.Z)(1, arguments);
      var date = (0, toDate["default"])(dirtyDate);
      var diff =
        (0, startOfUTCWeek /* default */.Z)(date, options).getTime() -
        startOfUTCWeekYear(date, options).getTime(); // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)

      return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
    }

    /***/
  },

  /***/ 7651: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Z: () => /* binding */ getUTCWeekYear,
      /* harmony export */
    });
    /* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(83946);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ =
      __webpack_require__(59025);
    /* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function getUTCWeekYear(dirtyDate, dirtyOptions) {
      (0,
      _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate,
        dirtyOptions
      );
      var year = date.getUTCFullYear();
      var options = dirtyOptions || {};
      var locale = options.locale;
      var localeFirstWeekContainsDate =
        locale && locale.options && locale.options.firstWeekContainsDate;
      var defaultFirstWeekContainsDate =
        localeFirstWeekContainsDate == null
          ? 1
          : (0,
            _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
              localeFirstWeekContainsDate
            );
      var firstWeekContainsDate =
        options.firstWeekContainsDate == null
          ? defaultFirstWeekContainsDate
          : (0,
            _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
              options.firstWeekContainsDate
            ); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError(
          "firstWeekContainsDate must be between 1 and 7 inclusively"
        );
      }

      var firstWeekOfNextYear = new Date(0);
      firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
      firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
      var startOfNextYear = (0,
      _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ /* ["default"] */.Z)(
        firstWeekOfNextYear,
        dirtyOptions
      );
      var firstWeekOfThisYear = new Date(0);
      firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
      firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
      var startOfThisYear = (0,
      _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ /* ["default"] */.Z)(
        firstWeekOfThisYear,
        dirtyOptions
      );

      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    /***/
  },

  /***/ 5267: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Iu: () => /* binding */ isProtectedDayOfYearToken,
      /* harmony export */ Do: () => /* binding */ isProtectedWeekYearToken,
      /* harmony export */ qp: () => /* binding */ throwProtectedError,
      /* harmony export */
    });
    var protectedDayOfYearTokens = ["D", "DD"];
    var protectedWeekYearTokens = ["YY", "YYYY"];
    function isProtectedDayOfYearToken(token) {
      return protectedDayOfYearTokens.indexOf(token) !== -1;
    }
    function isProtectedWeekYearToken(token) {
      return protectedWeekYearTokens.indexOf(token) !== -1;
    }
    function throwProtectedError(token, format, input) {
      if (token === "YYYY") {
        throw new RangeError(
          "Use `yyyy` instead of `YYYY` (in `"
            .concat(format, "`) for formatting years to the input `")
            .concat(input, "`; see: https://git.io/fxCyr")
        );
      } else if (token === "YY") {
        throw new RangeError(
          "Use `yy` instead of `YY` (in `"
            .concat(format, "`) for formatting years to the input `")
            .concat(input, "`; see: https://git.io/fxCyr")
        );
      } else if (token === "D") {
        throw new RangeError(
          "Use `d` instead of `D` (in `"
            .concat(
              format,
              "`) for formatting days of the month to the input `"
            )
            .concat(input, "`; see: https://git.io/fxCyr")
        );
      } else if (token === "DD") {
        throw new RangeError(
          "Use `dd` instead of `DD` (in `"
            .concat(
              format,
              "`) for formatting days of the month to the input `"
            )
            .concat(input, "`; see: https://git.io/fxCyr")
        );
      }
    }

    /***/
  },

  /***/ 13882: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Z: () => /* binding */ requiredArgs,
      /* harmony export */
    });
    function requiredArgs(required, args) {
      if (args.length < required) {
        throw new TypeError(
          required +
            " argument" +
            (required > 1 ? "s" : "") +
            " required, but only " +
            args.length +
            " present"
        );
      }
    }

    /***/
  },

  /***/ 66979: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Z: () => /* binding */ startOfUTCISOWeek,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function startOfUTCISOWeek(dirtyDate) {
      (0,
      _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var weekStartsOn = 1;
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var day = date.getUTCDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setUTCDate(date.getUTCDate() - diff);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }

    /***/
  },

  /***/ 59025: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Z: () => /* binding */ startOfUTCWeek,
      /* harmony export */
    });
    /* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(19013);
    /* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function startOfUTCWeek(dirtyDate, dirtyOptions) {
      (0,
      _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var options = dirtyOptions || {};
      var locale = options.locale;
      var localeWeekStartsOn =
        locale && locale.options && locale.options.weekStartsOn;
      var defaultWeekStartsOn =
        localeWeekStartsOn == null
          ? 0
          : (0,
            _toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
              localeWeekStartsOn
            );
      var weekStartsOn =
        options.weekStartsOn == null
          ? defaultWeekStartsOn
          : (0,
            _toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
              options.weekStartsOn
            ); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError(
          "weekStartsOn must be between 0 and 6 inclusively"
        );
      }

      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate
      );
      var day = date.getUTCDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setUTCDate(date.getUTCDate() - diff);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }

    /***/
  },

  /***/ 83946: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Z: () => /* binding */ toInteger,
      /* harmony export */
    });
    function toInteger(dirtyNumber) {
      if (
        dirtyNumber === null ||
        dirtyNumber === true ||
        dirtyNumber === false
      ) {
        return NaN;
      }

      var number = Number(dirtyNumber);

      if (isNaN(number)) {
        return number;
      }

      return number < 0 ? Math.ceil(number) : Math.floor(number);
    }

    /***/
  },

  /***/ 77349: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ addDays,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(83946);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name addDays
     * @category Day Helpers
     * @summary Add the specified number of days to the given date.
     *
     * @description
     * Add the specified number of days to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} - the new date with the days added
     * @throws {TypeError} - 2 arguments required
     *
     * @example
     * // Add 10 days to 1 September 2014:
     * const result = addDays(new Date(2014, 8, 1), 10)
     * //=> Thu Sep 11 2014 00:00:00
     */

    function addDays(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtyAmount
      );

      if (isNaN(amount)) {
        return new Date(NaN);
      }

      if (!amount) {
        // If 0 days, no-op to avoid changing times in the hour before end of DST
        return date;
      }

      date.setDate(date.getDate() + amount);
      return date;
    }

    /***/
  },

  /***/ 78343: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ addHours,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(51820);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    var MILLISECONDS_IN_HOUR = 3600000;
    /**
     * @name addHours
     * @category Hour Helpers
     * @summary Add the specified number of hours to the given date.
     *
     * @description
     * Add the specified number of hours to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of hours to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the hours added
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Add 2 hours to 10 July 2014 23:00:00:
     * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
     * //=> Fri Jul 11 2014 01:00:00
     */

    function addHours(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return (0,
      _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtyDate,
        amount * MILLISECONDS_IN_HOUR
      );
    }

    /***/
  },

  /***/ 51820: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Z: () => /* binding */ addMilliseconds,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(83946);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name addMilliseconds
     * @category Millisecond Helpers
     * @summary Add the specified number of milliseconds to the given date.
     *
     * @description
     * Add the specified number of milliseconds to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the milliseconds added
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
     * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
     * //=> Thu Jul 10 2014 12:45:30.750
     */

    function addMilliseconds(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var timestamp = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      ).getTime();
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return new Date(timestamp + amount);
    }

    /***/
  },

  /***/ 58545: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ addMinutes,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(51820);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    var MILLISECONDS_IN_MINUTE = 60000;
    /**
     * @name addMinutes
     * @category Minute Helpers
     * @summary Add the specified number of minutes to the given date.
     *
     * @description
     * Add the specified number of minutes to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of minutes to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the minutes added
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Add 30 minutes to 10 July 2014 12:00:00:
     * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
     * //=> Thu Jul 10 2014 12:30:00
     */

    function addMinutes(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return (0,
      _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtyDate,
        amount * MILLISECONDS_IN_MINUTE
      );
    }

    /***/
  },

  /***/ 11640: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ addMonths,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(83946);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name addMonths
     * @category Month Helpers
     * @summary Add the specified number of months to the given date.
     *
     * @description
     * Add the specified number of months to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the months added
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Add 5 months to 1 September 2014:
     * const result = addMonths(new Date(2014, 8, 1), 5)
     * //=> Sun Feb 01 2015 00:00:00
     */

    function addMonths(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtyAmount
      );

      if (isNaN(amount)) {
        return new Date(NaN);
      }

      if (!amount) {
        // If 0 months, no-op to avoid changing times in the hour before end of DST
        return date;
      }

      var dayOfMonth = date.getDate(); // The JS Date object supports date math by accepting out-of-bounds values for
      // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
      // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
      // want except that dates will wrap around the end of a month, meaning that
      // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
      // we'll default to the end of the desired month by adding 1 to the desired
      // month and using a date of 0 to back up one day to the end of the desired
      // month.

      var endOfDesiredMonth = new Date(date.getTime());
      endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
      var daysInMonth = endOfDesiredMonth.getDate();

      if (dayOfMonth >= daysInMonth) {
        // If we're already at the end of the month, then this is the correct date
        // and we're done.
        return endOfDesiredMonth;
      } else {
        // Otherwise, we now know that setting the original day-of-month value won't
        // cause an overflow, so set the desired day-of-month. Note that we can't
        // just set the date of `endOfDesiredMonth` because that object may have had
        // its time changed in the unusual case where where a DST transition was on
        // the last day of the month and its local time was in the hour skipped or
        // repeated next to a DST transition.  So we use `date` instead which is
        // guaranteed to still have the original time.
        date.setFullYear(
          endOfDesiredMonth.getFullYear(),
          endOfDesiredMonth.getMonth(),
          dayOfMonth
        );
        return date;
      }
    }

    /***/
  },

  /***/ 63500: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ addWeeks,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addDays_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(77349);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name addWeeks
     * @category Week Helpers
     * @summary Add the specified number of weeks to the given date.
     *
     * @description
     * Add the specified number of week to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of weeks to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the weeks added
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Add 4 weeks to 1 September 2014:
     * const result = addWeeks(new Date(2014, 8, 1), 4)
     * //=> Mon Sep 29 2014 00:00:00
     */

    function addWeeks(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      var days = amount * 7;
      return (0, _addDays_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate,
        days
      );
    }

    /***/
  },

  /***/ 21593: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ addYears,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addMonths_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(11640);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name addYears
     * @category Year Helpers
     * @summary Add the specified number of years to the given date.
     *
     * @description
     * Add the specified number of years to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of years to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the years added
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Add 5 years to 1 September 2014:
     * const result = addYears(new Date(2014, 8, 1), 5)
     * //=> Sun Sep 01 2019 00:00:00
     */

    function addYears(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return (0, _addMonths_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate,
        amount * 12
      );
    }

    /***/
  },

  /***/ 92300: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () =>
        /* binding */ differenceInCalendarDays,
      /* harmony export */
    });
    /* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(24262);
    /* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(69119);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    var MILLISECONDS_IN_DAY = 86400000;
    /**
     * @name differenceInCalendarDays
     * @category Day Helpers
     * @summary Get the number of calendar days between the given dates.
     *
     * @description
     * Get the number of calendar days between the given dates. This means that the times are removed
     * from the dates and then the difference in days is calculated.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the later date
     * @param {Date|Number} dateRight - the earlier date
     * @returns {Number} the number of calendar days
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // How many calendar days are between
     * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
     * const result = differenceInCalendarDays(
     *   new Date(2012, 6, 2, 0, 0),
     *   new Date(2011, 6, 2, 23, 0)
     * )
     * //=> 366
     * // How many calendar days are between
     * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
     * const result = differenceInCalendarDays(
     *   new Date(2011, 6, 3, 0, 1),
     *   new Date(2011, 6, 2, 23, 59)
     * )
     * //=> 1
     */

    function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var startOfDayLeft = (0,
      _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDateLeft
      );
      var startOfDayRight = (0,
      _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDateRight
      );
      var timestampLeft =
        startOfDayLeft.getTime() -
        (0,
        _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
          startOfDayLeft
        );
      var timestampRight =
        startOfDayRight.getTime() -
        (0,
        _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
          startOfDayRight
        ); // Round the number of days to the nearest integer
      // because the number of milliseconds in a day is not constant
      // (e.g. it's different in the day of the daylight saving time clock shift)

      return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
    }

    /***/
  },

  /***/ 1140: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () =>
        /* binding */ differenceInCalendarMonths,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name differenceInCalendarMonths
     * @category Month Helpers
     * @summary Get the number of calendar months between the given dates.
     *
     * @description
     * Get the number of calendar months between the given dates.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the later date
     * @param {Date|Number} dateRight - the earlier date
     * @returns {Number} the number of calendar months
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // How many calendar months are between 31 January 2014 and 1 September 2014?
     * var result = differenceInCalendarMonths(
     *   new Date(2014, 8, 1),
     *   new Date(2014, 0, 31)
     * )
     * //=> 8
     */

    function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var dateLeft = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
      var dateRight = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
      var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
      var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
      return yearDiff * 12 + monthDiff;
    }

    /***/
  },

  /***/ 52724: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () =>
        /* binding */ differenceInCalendarWeeks,
      /* harmony export */
    });
    /* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(584);
    /* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(24262);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    var MILLISECONDS_IN_WEEK = 604800000;
    /**
     * @name differenceInCalendarWeeks
     * @category Week Helpers
     * @summary Get the number of calendar weeks between the given dates.
     *
     * @description
     * Get the number of calendar weeks between the given dates.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the later date
     * @param {Date|Number} dateRight - the earlier date
     * @param {Object} [options] - an object with options.
     * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
     * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
     * @returns {Number} the number of calendar weeks
     * @throws {TypeError} 2 arguments required
     * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
     *
     * @example
     * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
     * const result = differenceInCalendarWeeks(
     *   new Date(2014, 6, 20),
     *   new Date(2014, 6, 5)
     * )
     * //=> 3
     *
     * @example
     * // If the week starts on Monday,
     * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
     * const result = differenceInCalendarWeeks(
     *   new Date(2014, 6, 20),
     *   new Date(2014, 6, 5),
     *   { weekStartsOn: 1 }
     * )
     * //=> 2
     */

    function differenceInCalendarWeeks(
      dirtyDateLeft,
      dirtyDateRight,
      dirtyOptions
    ) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var startOfWeekLeft = (0,
      _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDateLeft,
        dirtyOptions
      );
      var startOfWeekRight = (0,
      _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDateRight,
        dirtyOptions
      );
      var timestampLeft =
        startOfWeekLeft.getTime() -
        (0,
        _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
          startOfWeekLeft
        );
      var timestampRight =
        startOfWeekRight.getTime() -
        (0,
        _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
          startOfWeekRight
        ); // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)

      return Math.round(
        (timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK
      );
    }

    /***/
  },

  /***/ 91857: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () =>
        /* binding */ differenceInCalendarYears,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name differenceInCalendarYears
     * @category Year Helpers
     * @summary Get the number of calendar years between the given dates.
     *
     * @description
     * Get the number of calendar years between the given dates.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the later date
     * @param {Date|Number} dateRight - the earlier date
     * @returns {Number} the number of calendar years
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // How many calendar years are between 31 December 2013 and 11 February 2015?
     * const result = differenceInCalendarYears(
     *   new Date(2015, 1, 11),
     *   new Date(2013, 11, 31)
     * )
     * //=> 2
     */

    function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var dateLeft = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
      var dateRight = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
      return dateLeft.getFullYear() - dateRight.getFullYear();
    }

    /***/
  },

  /***/ 57870: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ endOfDay,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name endOfDay
     * @category Day Helpers
     * @summary Return the end of a day for the given date.
     *
     * @description
     * Return the end of a day for the given date.
     * The result will be in the local timezone.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @returns {Date} the end of a day
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // The end of a day for 2 September 2014 11:55:00:
     * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Tue Sep 02 2014 23:59:59.999
     */

    function endOfDay(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      date.setHours(23, 59, 59, 999);
      return date;
    }

    /***/
  },

  /***/ 4135: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ endOfMonth,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name endOfMonth
     * @category Month Helpers
     * @summary Return the end of a month for the given date.
     *
     * @description
     * Return the end of a month for the given date.
     * The result will be in the local timezone.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @returns {Date} the end of a month
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // The end of a month for 2 September 2014 11:55:00:
     * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Tue Sep 30 2014 23:59:59.999
     */

    function endOfMonth(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var month = date.getMonth();
      date.setFullYear(date.getFullYear(), month + 1, 0);
      date.setHours(23, 59, 59, 999);
      return date;
    }

    /***/
  },

  /***/ 67090: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ endOfWeek,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name endOfWeek
     * @category Week Helpers
     * @summary Return the end of a week for the given date.
     *
     * @description
     * Return the end of a week for the given date.
     * The result will be in the local timezone.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @param {Object} [options] - an object with options.
     * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
     * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
     * @returns {Date} the end of a week
     * @throws {TypeError} 1 argument required
     * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
     *
     * @example
     * // The end of a week for 2 September 2014 11:55:00:
     * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Sat Sep 06 2014 23:59:59.999
     *
     * @example
     * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
     * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
     * //=> Sun Sep 07 2014 23:59:59.999
     */
    function endOfWeek(dirtyDate, dirtyOptions) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var options = dirtyOptions || {};
      var locale = options.locale;
      var localeWeekStartsOn =
        locale && locale.options && locale.options.weekStartsOn;
      var defaultWeekStartsOn =
        localeWeekStartsOn == null
          ? 0
          : (0,
            _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
              localeWeekStartsOn
            );
      var weekStartsOn =
        options.weekStartsOn == null
          ? defaultWeekStartsOn
          : (0,
            _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
              options.weekStartsOn
            ); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError(
          "weekStartsOn must be between 0 and 6 inclusively"
        );
      }

      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate
      );
      var day = date.getDay();
      var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
      date.setDate(date.getDate() + diff);
      date.setHours(23, 59, 59, 999);
      return date;
    }

    /***/
  },

  /***/ 42298: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    // ESM COMPAT FLAG
    __webpack_require__.r(__webpack_exports__);

    // EXPORTS
    __webpack_require__.d(__webpack_exports__, {
      default: () => /* binding */ format,
    });

    // EXTERNAL MODULE: ./node_modules/date-fns/esm/isValid/index.js
    var isValid = __webpack_require__(12274);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/locale/en-US/index.js + 9 modules
    var en_US = __webpack_require__(35077);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/subMilliseconds/index.js
    var subMilliseconds = __webpack_require__(91218);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/toDate/index.js
    var toDate = __webpack_require__(19013); // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js
    function addLeadingZeros(number, targetLength) {
      var sign = number < 0 ? "-" : "";
      var output = Math.abs(number).toString();

      while (output.length < targetLength) {
        output = "0" + output;
      }

      return sign + output;
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js
    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* |                                |
     * |  d  | Day of month                   |  D  |                                |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  m  | Minute                         |  M  | Month                          |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  y  | Year (abs)                     |  Y  |                                |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     */

    var formatters = {
      // Year
      y: function (date, token) {
        // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
        // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
        // |----------|-------|----|-------|-------|-------|
        // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
        // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
        // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
        // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
        // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
        var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return addLeadingZeros(
          token === "yy" ? year % 100 : year,
          token.length
        );
      },
      // Month
      M: function (date, token) {
        var month = date.getUTCMonth();
        return token === "M"
          ? String(month + 1)
          : addLeadingZeros(month + 1, 2);
      },
      // Day of the month
      d: function (date, token) {
        return addLeadingZeros(date.getUTCDate(), token.length);
      },
      // AM or PM
      a: function (date, token) {
        var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";

        switch (token) {
          case "a":
          case "aa":
            return dayPeriodEnumValue.toUpperCase();

          case "aaa":
            return dayPeriodEnumValue;

          case "aaaaa":
            return dayPeriodEnumValue[0];

          case "aaaa":
          default:
            return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
        }
      },
      // Hour [1-12]
      h: function (date, token) {
        return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
      },
      // Hour [0-23]
      H: function (date, token) {
        return addLeadingZeros(date.getUTCHours(), token.length);
      },
      // Minute
      m: function (date, token) {
        return addLeadingZeros(date.getUTCMinutes(), token.length);
      },
      // Second
      s: function (date, token) {
        return addLeadingZeros(date.getUTCSeconds(), token.length);
      },
      // Fraction of second
      S: function (date, token) {
        var numberOfDigits = token.length;
        var milliseconds = date.getUTCMilliseconds();
        var fractionalSeconds = Math.floor(
          milliseconds * Math.pow(10, numberOfDigits - 3)
        );
        return addLeadingZeros(fractionalSeconds, token.length);
      },
    };
    /* harmony default export */ const lightFormatters = formatters;
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/requiredArgs/index.js
    var requiredArgs = __webpack_require__(13882); // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js
    var MILLISECONDS_IN_DAY = 86400000; // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function getUTCDayOfYear(dirtyDate) {
      (0, requiredArgs /* default */.Z)(1, arguments);
      var date = (0, toDate["default"])(dirtyDate);
      var timestamp = date.getTime();
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
      var startOfYearTimestamp = date.getTime();
      var difference = timestamp - startOfYearTimestamp;
      return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
    }
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js + 1 modules
    var getUTCISOWeek = __webpack_require__(33276);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js
    var getUTCISOWeekYear = __webpack_require__(7032);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getUTCWeek/index.js + 1 modules
    var getUTCWeek = __webpack_require__(5230);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js
    var getUTCWeekYear = __webpack_require__(7651); // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/format/formatters/index.js
    var dayPeriodEnum = {
      am: "am",
      pm: "pm",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    };
    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* | Milliseconds in day            |
     * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
     * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
     * |  d  | Day of month                   |  D  | Day of year                    |
     * |  e  | Local day of week              |  E  | Day of week                    |
     * |  f  |                                |  F* | Day of week in month           |
     * |  g* | Modified Julian day            |  G  | Era                            |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  i! | ISO day of week                |  I! | ISO week of year               |
     * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
     * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
     * |  l* | (deprecated)                   |  L  | Stand-alone month              |
     * |  m  | Minute                         |  M  | Month                          |
     * |  n  |                                |  N  |                                |
     * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
     * |  p! | Long localized time            |  P! | Long localized date            |
     * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
     * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
     * |  u  | Extended year                  |  U* | Cyclic year                    |
     * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
     * |  w  | Local week of year             |  W* | Week of month                  |
     * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
     * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
     * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     *
     * Letters marked by ! are non-standard, but implemented by date-fns:
     * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
     * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
     *   i.e. 7 for Sunday, 1 for Monday, etc.
     * - `I` is ISO week of year, as opposed to `w` which is local week of year.
     * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
     *   `R` is supposed to be used in conjunction with `I` and `i`
     *   for universal ISO week-numbering date, whereas
     *   `Y` is supposed to be used in conjunction with `w` and `e`
     *   for week-numbering date specific to the locale.
     * - `P` is long localized date format
     * - `p` is long localized time format
     */

    var formatters_formatters = {
      // Era
      G: function (date, token, localize) {
        var era = date.getUTCFullYear() > 0 ? 1 : 0;

        switch (token) {
          // AD, BC
          case "G":
          case "GG":
          case "GGG":
            return localize.era(era, {
              width: "abbreviated",
            });
          // A, B

          case "GGGGG":
            return localize.era(era, {
              width: "narrow",
            });
          // Anno Domini, Before Christ

          case "GGGG":
          default:
            return localize.era(era, {
              width: "wide",
            });
        }
      },
      // Year
      y: function (date, token, localize) {
        // Ordinal number
        if (token === "yo") {
          var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

          var year = signedYear > 0 ? signedYear : 1 - signedYear;
          return localize.ordinalNumber(year, {
            unit: "year",
          });
        }

        return lightFormatters.y(date, token);
      },
      // Local week-numbering year
      Y: function (date, token, localize, options) {
        var signedWeekYear = (0, getUTCWeekYear /* default */.Z)(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

        var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

        if (token === "YY") {
          var twoDigitYear = weekYear % 100;
          return addLeadingZeros(twoDigitYear, 2);
        } // Ordinal number

        if (token === "Yo") {
          return localize.ordinalNumber(weekYear, {
            unit: "year",
          });
        } // Padding

        return addLeadingZeros(weekYear, token.length);
      },
      // ISO week-numbering year
      R: function (date, token) {
        var isoWeekYear = (0, getUTCISOWeekYear /* default */.Z)(date); // Padding

        return addLeadingZeros(isoWeekYear, token.length);
      },
      // Extended year. This is a single number designating the year of this calendar system.
      // The main difference between `y` and `u` localizers are B.C. years:
      // | Year | `y` | `u` |
      // |------|-----|-----|
      // | AC 1 |   1 |   1 |
      // | BC 1 |   1 |   0 |
      // | BC 2 |   2 |  -1 |
      // Also `yy` always returns the last two digits of a year,
      // while `uu` pads single digit years to 2 characters and returns other years unchanged.
      u: function (date, token) {
        var year = date.getUTCFullYear();
        return addLeadingZeros(year, token.length);
      },
      // Quarter
      Q: function (date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

        switch (token) {
          // 1, 2, 3, 4
          case "Q":
            return String(quarter);
          // 01, 02, 03, 04

          case "QQ":
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th

          case "Qo":
            return localize.ordinalNumber(quarter, {
              unit: "quarter",
            });
          // Q1, Q2, Q3, Q4

          case "QQQ":
            return localize.quarter(quarter, {
              width: "abbreviated",
              context: "formatting",
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)

          case "QQQQQ":
            return localize.quarter(quarter, {
              width: "narrow",
              context: "formatting",
            });
          // 1st quarter, 2nd quarter, ...

          case "QQQQ":
          default:
            return localize.quarter(quarter, {
              width: "wide",
              context: "formatting",
            });
        }
      },
      // Stand-alone quarter
      q: function (date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

        switch (token) {
          // 1, 2, 3, 4
          case "q":
            return String(quarter);
          // 01, 02, 03, 04

          case "qq":
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th

          case "qo":
            return localize.ordinalNumber(quarter, {
              unit: "quarter",
            });
          // Q1, Q2, Q3, Q4

          case "qqq":
            return localize.quarter(quarter, {
              width: "abbreviated",
              context: "standalone",
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)

          case "qqqqq":
            return localize.quarter(quarter, {
              width: "narrow",
              context: "standalone",
            });
          // 1st quarter, 2nd quarter, ...

          case "qqqq":
          default:
            return localize.quarter(quarter, {
              width: "wide",
              context: "standalone",
            });
        }
      },
      // Month
      M: function (date, token, localize) {
        var month = date.getUTCMonth();

        switch (token) {
          case "M":
          case "MM":
            return lightFormatters.M(date, token);
          // 1st, 2nd, ..., 12th

          case "Mo":
            return localize.ordinalNumber(month + 1, {
              unit: "month",
            });
          // Jan, Feb, ..., Dec

          case "MMM":
            return localize.month(month, {
              width: "abbreviated",
              context: "formatting",
            });
          // J, F, ..., D

          case "MMMMM":
            return localize.month(month, {
              width: "narrow",
              context: "formatting",
            });
          // January, February, ..., December

          case "MMMM":
          default:
            return localize.month(month, {
              width: "wide",
              context: "formatting",
            });
        }
      },
      // Stand-alone month
      L: function (date, token, localize) {
        var month = date.getUTCMonth();

        switch (token) {
          // 1, 2, ..., 12
          case "L":
            return String(month + 1);
          // 01, 02, ..., 12

          case "LL":
            return addLeadingZeros(month + 1, 2);
          // 1st, 2nd, ..., 12th

          case "Lo":
            return localize.ordinalNumber(month + 1, {
              unit: "month",
            });
          // Jan, Feb, ..., Dec

          case "LLL":
            return localize.month(month, {
              width: "abbreviated",
              context: "standalone",
            });
          // J, F, ..., D

          case "LLLLL":
            return localize.month(month, {
              width: "narrow",
              context: "standalone",
            });
          // January, February, ..., December

          case "LLLL":
          default:
            return localize.month(month, {
              width: "wide",
              context: "standalone",
            });
        }
      },
      // Local week of year
      w: function (date, token, localize, options) {
        var week = (0, getUTCWeek /* default */.Z)(date, options);

        if (token === "wo") {
          return localize.ordinalNumber(week, {
            unit: "week",
          });
        }

        return addLeadingZeros(week, token.length);
      },
      // ISO week of year
      I: function (date, token, localize) {
        var isoWeek = (0, getUTCISOWeek /* default */.Z)(date);

        if (token === "Io") {
          return localize.ordinalNumber(isoWeek, {
            unit: "week",
          });
        }

        return addLeadingZeros(isoWeek, token.length);
      },
      // Day of the month
      d: function (date, token, localize) {
        if (token === "do") {
          return localize.ordinalNumber(date.getUTCDate(), {
            unit: "date",
          });
        }

        return lightFormatters.d(date, token);
      },
      // Day of year
      D: function (date, token, localize) {
        var dayOfYear = getUTCDayOfYear(date);

        if (token === "Do") {
          return localize.ordinalNumber(dayOfYear, {
            unit: "dayOfYear",
          });
        }

        return addLeadingZeros(dayOfYear, token.length);
      },
      // Day of week
      E: function (date, token, localize) {
        var dayOfWeek = date.getUTCDay();

        switch (token) {
          // Tue
          case "E":
          case "EE":
          case "EEE":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting",
            });
          // T

          case "EEEEE":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting",
            });
          // Tu

          case "EEEEEE":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting",
            });
          // Tuesday

          case "EEEE":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting",
            });
        }
      },
      // Local day of week
      e: function (date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

        switch (token) {
          // Numerical value (Nth day of week with current locale or weekStartsOn)
          case "e":
            return String(localDayOfWeek);
          // Padded numerical value

          case "ee":
            return addLeadingZeros(localDayOfWeek, 2);
          // 1st, 2nd, ..., 7th

          case "eo":
            return localize.ordinalNumber(localDayOfWeek, {
              unit: "day",
            });

          case "eee":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting",
            });
          // T

          case "eeeee":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting",
            });
          // Tu

          case "eeeeee":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting",
            });
          // Tuesday

          case "eeee":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting",
            });
        }
      },
      // Stand-alone local day of week
      c: function (date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

        switch (token) {
          // Numerical value (same as in `e`)
          case "c":
            return String(localDayOfWeek);
          // Padded numerical value

          case "cc":
            return addLeadingZeros(localDayOfWeek, token.length);
          // 1st, 2nd, ..., 7th

          case "co":
            return localize.ordinalNumber(localDayOfWeek, {
              unit: "day",
            });

          case "ccc":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "standalone",
            });
          // T

          case "ccccc":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "standalone",
            });
          // Tu

          case "cccccc":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "standalone",
            });
          // Tuesday

          case "cccc":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "standalone",
            });
        }
      },
      // ISO day of week
      i: function (date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

        switch (token) {
          // 2
          case "i":
            return String(isoDayOfWeek);
          // 02

          case "ii":
            return addLeadingZeros(isoDayOfWeek, token.length);
          // 2nd

          case "io":
            return localize.ordinalNumber(isoDayOfWeek, {
              unit: "day",
            });
          // Tue

          case "iii":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting",
            });
          // T

          case "iiiii":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting",
            });
          // Tu

          case "iiiiii":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting",
            });
          // Tuesday

          case "iiii":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting",
            });
        }
      },
      // AM or PM
      a: function (date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

        switch (token) {
          case "a":
          case "aa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting",
            });

          case "aaa":
            return localize
              .dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting",
              })
              .toLowerCase();

          case "aaaaa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting",
            });

          case "aaaa":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting",
            });
        }
      },
      // AM, PM, midnight, noon
      b: function (date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;

        if (hours === 12) {
          dayPeriodEnumValue = dayPeriodEnum.noon;
        } else if (hours === 0) {
          dayPeriodEnumValue = dayPeriodEnum.midnight;
        } else {
          dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
        }

        switch (token) {
          case "b":
          case "bb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting",
            });

          case "bbb":
            return localize
              .dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting",
              })
              .toLowerCase();

          case "bbbbb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting",
            });

          case "bbbb":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting",
            });
        }
      },
      // in the morning, in the afternoon, in the evening, at night
      B: function (date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;

        if (hours >= 17) {
          dayPeriodEnumValue = dayPeriodEnum.evening;
        } else if (hours >= 12) {
          dayPeriodEnumValue = dayPeriodEnum.afternoon;
        } else if (hours >= 4) {
          dayPeriodEnumValue = dayPeriodEnum.morning;
        } else {
          dayPeriodEnumValue = dayPeriodEnum.night;
        }

        switch (token) {
          case "B":
          case "BB":
          case "BBB":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting",
            });

          case "BBBBB":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting",
            });

          case "BBBB":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting",
            });
        }
      },
      // Hour [1-12]
      h: function (date, token, localize) {
        if (token === "ho") {
          var hours = date.getUTCHours() % 12;
          if (hours === 0) hours = 12;
          return localize.ordinalNumber(hours, {
            unit: "hour",
          });
        }

        return lightFormatters.h(date, token);
      },
      // Hour [0-23]
      H: function (date, token, localize) {
        if (token === "Ho") {
          return localize.ordinalNumber(date.getUTCHours(), {
            unit: "hour",
          });
        }

        return lightFormatters.H(date, token);
      },
      // Hour [0-11]
      K: function (date, token, localize) {
        var hours = date.getUTCHours() % 12;

        if (token === "Ko") {
          return localize.ordinalNumber(hours, {
            unit: "hour",
          });
        }

        return addLeadingZeros(hours, token.length);
      },
      // Hour [1-24]
      k: function (date, token, localize) {
        var hours = date.getUTCHours();
        if (hours === 0) hours = 24;

        if (token === "ko") {
          return localize.ordinalNumber(hours, {
            unit: "hour",
          });
        }

        return addLeadingZeros(hours, token.length);
      },
      // Minute
      m: function (date, token, localize) {
        if (token === "mo") {
          return localize.ordinalNumber(date.getUTCMinutes(), {
            unit: "minute",
          });
        }

        return lightFormatters.m(date, token);
      },
      // Second
      s: function (date, token, localize) {
        if (token === "so") {
          return localize.ordinalNumber(date.getUTCSeconds(), {
            unit: "second",
          });
        }

        return lightFormatters.s(date, token);
      },
      // Fraction of second
      S: function (date, token) {
        return lightFormatters.S(date, token);
      },
      // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
      X: function (date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();

        if (timezoneOffset === 0) {
          return "Z";
        }

        switch (token) {
          // Hours and optional minutes
          case "X":
            return formatTimezoneWithOptionalMinutes(timezoneOffset);
          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XX`

          case "XXXX":
          case "XX":
            // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);
          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XXX`

          case "XXXXX":
          case "XXX": // Hours and minutes with `:` delimiter

          default:
            return formatTimezone(timezoneOffset, ":");
        }
      },
      // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
      x: function (date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();

        switch (token) {
          // Hours and optional minutes
          case "x":
            return formatTimezoneWithOptionalMinutes(timezoneOffset);
          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xx`

          case "xxxx":
          case "xx":
            // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);
          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xxx`

          case "xxxxx":
          case "xxx": // Hours and minutes with `:` delimiter

          default:
            return formatTimezone(timezoneOffset, ":");
        }
      },
      // Timezone (GMT)
      O: function (date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();

        switch (token) {
          // Short
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + formatTimezoneShort(timezoneOffset, ":");
          // Long

          case "OOOO":
          default:
            return "GMT" + formatTimezone(timezoneOffset, ":");
        }
      },
      // Timezone (specific non-location)
      z: function (date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();

        switch (token) {
          // Short
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + formatTimezoneShort(timezoneOffset, ":");
          // Long

          case "zzzz":
          default:
            return "GMT" + formatTimezone(timezoneOffset, ":");
        }
      },
      // Seconds timestamp
      t: function (date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = Math.floor(originalDate.getTime() / 1000);
        return addLeadingZeros(timestamp, token.length);
      },
      // Milliseconds timestamp
      T: function (date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = originalDate.getTime();
        return addLeadingZeros(timestamp, token.length);
      },
    };

    function formatTimezoneShort(offset, dirtyDelimiter) {
      var sign = offset > 0 ? "-" : "+";
      var absOffset = Math.abs(offset);
      var hours = Math.floor(absOffset / 60);
      var minutes = absOffset % 60;

      if (minutes === 0) {
        return sign + String(hours);
      }

      var delimiter = dirtyDelimiter || "";
      return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
    }

    function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
      if (offset % 60 === 0) {
        var sign = offset > 0 ? "-" : "+";
        return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
      }

      return formatTimezone(offset, dirtyDelimiter);
    }

    function formatTimezone(offset, dirtyDelimiter) {
      var delimiter = dirtyDelimiter || "";
      var sign = offset > 0 ? "-" : "+";
      var absOffset = Math.abs(offset);
      var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
      var minutes = addLeadingZeros(absOffset % 60, 2);
      return sign + hours + delimiter + minutes;
    }

    /* harmony default export */ const format_formatters =
      formatters_formatters;
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/format/longFormatters/index.js
    var longFormatters = __webpack_require__(97621);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
    var getTimezoneOffsetInMilliseconds = __webpack_require__(24262);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/protectedTokens/index.js
    var protectedTokens = __webpack_require__(5267);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/toInteger/index.js
    var toInteger = __webpack_require__(83946); // CONCATENATED MODULE: ./node_modules/date-fns/esm/format/index.js
    // This RegExp consists of three parts separated by `|`:
    // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
    //   (one of the certain letters followed by `o`)
    // - (\w)\1* matches any sequences of the same letter
    // - '' matches two quote characters in a row
    // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
    //   except a single quote symbol, which ends the sequence.
    //   Two quote characters do not end the sequence.
    //   If there is no matching single quote
    //   then the sequence will continue until the end of the string.
    // - . matches any single character unmatched by previous parts of the RegExps

    var formattingTokensRegExp =
      /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
    // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

    var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    var escapedStringRegExp = /^'([^]*?)'?$/;
    var doubleQuoteRegExp = /''/g;
    var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
    /**
     * @name format
     * @category Common Helpers
     * @summary Format the date.
     *
     * @description
     * Return the formatted date string in the given format. The result may vary by locale.
     *
     * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
     * > See: https://git.io/fxCyr
     *
     * The characters wrapped between two single quotes characters (') are escaped.
     * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
     * (see the last example)
     *
     * Format of the string is based on Unicode Technical Standard #35:
     * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * with a few additions (see note 7 below the table).
     *
     * Accepted patterns:
     * | Unit                            | Pattern | Result examples                   | Notes |
     * |---------------------------------|---------|-----------------------------------|-------|
     * | Era                             | G..GGG  | AD, BC                            |       |
     * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
     * |                                 | GGGGG   | A, B                              |       |
     * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
     * |                                 | yy      | 44, 01, 00, 17                    | 5     |
     * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
     * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
     * |                                 | yyyyy   | ...                               | 3,5   |
     * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
     * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
     * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
     * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
     * |                                 | YYYYY   | ...                               | 3,5   |
     * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
     * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
     * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
     * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
     * |                                 | RRRRR   | ...                               | 3,5,7 |
     * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
     * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
     * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
     * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
     * |                                 | uuuuu   | ...                               | 3,5   |
     * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
     * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | QQ      | 01, 02, 03, 04                    |       |
     * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
     * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
     * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | qq      | 01, 02, 03, 04                    |       |
     * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
     * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
     * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | MM      | 01, 02, ..., 12                   |       |
     * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
     * |                                 | MMMM    | January, February, ..., December  | 2     |
     * |                                 | MMMMM   | J, F, ..., D                      |       |
     * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
     * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | LL      | 01, 02, ..., 12                   |       |
     * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
     * |                                 | LLLL    | January, February, ..., December  | 2     |
     * |                                 | LLLLL   | J, F, ..., D                      |       |
     * | Local week of year              | w       | 1, 2, ..., 53                     |       |
     * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | ww      | 01, 02, ..., 53                   |       |
     * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
     * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | II      | 01, 02, ..., 53                   | 7     |
     * | Day of month                    | d       | 1, 2, ..., 31                     |       |
     * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
     * |                                 | dd      | 01, 02, ..., 31                   |       |
     * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
     * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
     * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
     * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
     * |                                 | DDDD    | ...                               | 3     |
     * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
     * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
     * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
     * |                                 | ii      | 01, 02, ..., 07                   | 7     |
     * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
     * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
     * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
     * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
     * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
     * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | ee      | 02, 03, ..., 01                   |       |
     * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
     * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
     * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | cc      | 02, 03, ..., 01                   |       |
     * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
     * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | AM, PM                          | a..aa   | AM, PM                            |       |
     * |                                 | aaa     | am, pm                            |       |
     * |                                 | aaaa    | a.m., p.m.                        | 2     |
     * |                                 | aaaaa   | a, p                              |       |
     * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
     * |                                 | bbb     | am, pm, noon, midnight            |       |
     * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
     * |                                 | bbbbb   | a, p, n, mi                       |       |
     * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
     * |                                 | BBBB    | at night, in the morning, ...     | 2     |
     * |                                 | BBBBB   | at night, in the morning, ...     |       |
     * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
     * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
     * |                                 | hh      | 01, 02, ..., 11, 12               |       |
     * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
     * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
     * |                                 | HH      | 00, 01, 02, ..., 23               |       |
     * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
     * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
     * |                                 | KK      | 01, 02, ..., 11, 00               |       |
     * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
     * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
     * |                                 | kk      | 24, 01, 02, ..., 23               |       |
     * | Minute                          | m       | 0, 1, ..., 59                     |       |
     * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | mm      | 00, 01, ..., 59                   |       |
     * | Second                          | s       | 0, 1, ..., 59                     |       |
     * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | ss      | 00, 01, ..., 59                   |       |
     * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
     * |                                 | SS      | 00, 01, ..., 99                   |       |
     * |                                 | SSS     | 000, 001, ..., 999                |       |
     * |                                 | SSSS    | ...                               | 3     |
     * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
     * |                                 | XX      | -0800, +0530, Z                   |       |
     * |                                 | XXX     | -08:00, +05:30, Z                 |       |
     * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
     * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
     * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
     * |                                 | xx      | -0800, +0530, +0000               |       |
     * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
     * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
     * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
     * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
     * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
     * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
     * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
     * | Seconds timestamp               | t       | 512969520                         | 7     |
     * |                                 | tt      | ...                               | 3,7   |
     * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
     * |                                 | TT      | ...                               | 3,7   |
     * | Long localized date             | P       | 04/29/1453                        | 7     |
     * |                                 | PP      | Apr 29, 1453                      | 7     |
     * |                                 | PPP     | April 29th, 1453                  | 7     |
     * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
     * | Long localized time             | p       | 12:00 AM                          | 7     |
     * |                                 | pp      | 12:00:00 AM                       | 7     |
     * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
     * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
     * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
     * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
     * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
     * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
     * Notes:
     * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
     *    are the same as "stand-alone" units, but are different in some languages.
     *    "Formatting" units are declined according to the rules of the language
     *    in the context of a date. "Stand-alone" units are always nominative singular:
     *
     *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
     *
     *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
     *
     * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
     *    the single quote characters (see below).
     *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
     *    the output will be the same as default pattern for this unit, usually
     *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
     *    are marked with "2" in the last column of the table.
     *
     *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
     *
     * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
     *    The output will be padded with zeros to match the length of the pattern.
     *
     *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
     *
     * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
     *    These tokens represent the shortest form of the quarter.
     *
     * 5. The main difference between `y` and `u` patterns are B.C. years:
     *
     *    | Year | `y` | `u` |
     *    |------|-----|-----|
     *    | AC 1 |   1 |   1 |
     *    | BC 1 |   1 |   0 |
     *    | BC 2 |   2 |  -1 |
     *
     *    Also `yy` always returns the last two digits of a year,
     *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
     *
     *    | Year | `yy` | `uu` |
     *    |------|------|------|
     *    | 1    |   01 |   01 |
     *    | 14   |   14 |   14 |
     *    | 376  |   76 |  376 |
     *    | 1453 |   53 | 1453 |
     *
     *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
     *    except local week-numbering years are dependent on `options.weekStartsOn`
     *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
     *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
     *
     * 6. Specific non-location timezones are currently unavailable in `date-fns`,
     *    so right now these tokens fall back to GMT timezones.
     *
     * 7. These patterns are not in the Unicode Technical Standard #35:
     *    - `i`: ISO day of week
     *    - `I`: ISO week of year
     *    - `R`: ISO week-numbering year
     *    - `t`: seconds timestamp
     *    - `T`: milliseconds timestamp
     *    - `o`: ordinal number modifier
     *    - `P`: long localized date
     *    - `p`: long localized time
     *
     * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
     *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
     *
     * 9. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
     *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * - The second argument is now required for the sake of explicitness.
     *
     *   ```javascript
     *   // Before v2.0.0
     *   format(new Date(2016, 0, 1))
     *
     *   // v2.0.0 onward
     *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
     *   ```
     *
     * - New format string API for `format` function
     *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
     *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
     *
     * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
     *
     * @param {Date|Number} date - the original date
     * @param {String} format - the string of tokens
     * @param {Object} [options] - an object with options.
     * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
     * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
     * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
     * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
     *   see: https://git.io/fxCyr
     * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
     *   see: https://git.io/fxCyr
     * @returns {String} the formatted date string
     * @throws {TypeError} 2 arguments required
     * @throws {RangeError} `date` must not be Invalid Date
     * @throws {RangeError} `options.locale` must contain `localize` property
     * @throws {RangeError} `options.locale` must contain `formatLong` property
     * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
     * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
     * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
     * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
     * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
     * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
     * @throws {RangeError} format string contains an unescaped latin alphabet character
     *
     * @example
     * // Represent 11 February 2014 in middle-endian format:
     * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
     * //=> '02/11/2014'
     *
     * @example
     * // Represent 2 July 2014 in Esperanto:
     * import { eoLocale } from 'date-fns/locale/eo'
     * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
     *   locale: eoLocale
     * })
     * //=> '2-a de julio 2014'
     *
     * @example
     * // Escape string by single quote characters:
     * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
     * //=> "3 o'clock"
     */

    function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
      (0, requiredArgs /* default */.Z)(2, arguments);
      var formatStr = String(dirtyFormatStr);
      var options = dirtyOptions || {};
      var locale = options.locale || en_US /* default */.Z;
      var localeFirstWeekContainsDate =
        locale.options && locale.options.firstWeekContainsDate;
      var defaultFirstWeekContainsDate =
        localeFirstWeekContainsDate == null
          ? 1
          : (0, toInteger /* default */.Z)(localeFirstWeekContainsDate);
      var firstWeekContainsDate =
        options.firstWeekContainsDate == null
          ? defaultFirstWeekContainsDate
          : (0, toInteger /* default */.Z)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError(
          "firstWeekContainsDate must be between 1 and 7 inclusively"
        );
      }

      var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;
      var defaultWeekStartsOn =
        localeWeekStartsOn == null
          ? 0
          : (0, toInteger /* default */.Z)(localeWeekStartsOn);
      var weekStartsOn =
        options.weekStartsOn == null
          ? defaultWeekStartsOn
          : (0, toInteger /* default */.Z)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError(
          "weekStartsOn must be between 0 and 6 inclusively"
        );
      }

      if (!locale.localize) {
        throw new RangeError("locale must contain localize property");
      }

      if (!locale.formatLong) {
        throw new RangeError("locale must contain formatLong property");
      }

      var originalDate = (0, toDate["default"])(dirtyDate);

      if (!(0, isValid["default"])(originalDate)) {
        throw new RangeError("Invalid time value");
      } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
      // This ensures that when UTC functions will be implemented, locales will be compatible with them.
      // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376

      var timezoneOffset = (0, getTimezoneOffsetInMilliseconds /* default */.Z)(
        originalDate
      );
      var utcDate = (0, subMilliseconds /* default */.Z)(
        originalDate,
        timezoneOffset
      );
      var formatterOptions = {
        firstWeekContainsDate: firstWeekContainsDate,
        weekStartsOn: weekStartsOn,
        locale: locale,
        _originalDate: originalDate,
      };
      var result = formatStr
        .match(longFormattingTokensRegExp)
        .map(function (substring) {
          var firstCharacter = substring[0];

          if (firstCharacter === "p" || firstCharacter === "P") {
            var longFormatter = longFormatters /* default */.Z[firstCharacter];
            return longFormatter(
              substring,
              locale.formatLong,
              formatterOptions
            );
          }

          return substring;
        })
        .join("")
        .match(formattingTokensRegExp)
        .map(function (substring) {
          // Replace two single quote characters with one single quote character
          if (substring === "''") {
            return "'";
          }

          var firstCharacter = substring[0];

          if (firstCharacter === "'") {
            return cleanEscapedString(substring);
          }

          var formatter = format_formatters[firstCharacter];

          if (formatter) {
            if (
              !options.useAdditionalWeekYearTokens &&
              (0, protectedTokens /* isProtectedWeekYearToken */.Do)(substring)
            ) {
              (0, protectedTokens /* throwProtectedError */.qp)(
                substring,
                dirtyFormatStr,
                dirtyDate
              );
            }

            if (
              !options.useAdditionalDayOfYearTokens &&
              (0, protectedTokens /* isProtectedDayOfYearToken */.Iu)(substring)
            ) {
              (0, protectedTokens /* throwProtectedError */.qp)(
                substring,
                dirtyFormatStr,
                dirtyDate
              );
            }

            return formatter(
              utcDate,
              substring,
              locale.localize,
              formatterOptions
            );
          }

          if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
            throw new RangeError(
              "Format string contains an unescaped latin alphabet character `" +
                firstCharacter +
                "`"
            );
          }

          return substring;
        })
        .join("");
      return result;
    }

    function cleanEscapedString(input) {
      return input
        .match(escapedStringRegExp)[1]
        .replace(doubleQuoteRegExp, "'");
    }

    /***/
  },

  /***/ 55855: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ getDate,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name getDate
     * @category Day Helpers
     * @summary Get the day of the month of the given date.
     *
     * @description
     * Get the day of the month of the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the day of month
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Which day of the month is 29 February 2012?
     * const result = getDate(new Date(2012, 1, 29))
     * //=> 29
     */

    function getDate(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var dayOfMonth = date.getDate();
      return dayOfMonth;
    }

    /***/
  },

  /***/ 20466: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ getDay,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name getDay
     * @category Weekday Helpers
     * @summary Get the day of the week of the given date.
     *
     * @description
     * Get the day of the week of the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {0|1|2|3|4|5|6} the day of week, 0 represents Sunday
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Which day of the week is 29 February 2012?
     * const result = getDay(new Date(2012, 1, 29))
     * //=> 3
     */

    function getDay(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var day = date.getDay();
      return day;
    }

    /***/
  },

  /***/ 85817: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ getHours,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name getHours
     * @category Hour Helpers
     * @summary Get the hours of the given date.
     *
     * @description
     * Get the hours of the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the hours
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Get the hours of 29 February 2012 11:45:00:
     * const result = getHours(new Date(2012, 1, 29, 11, 45))
     * //=> 11
     */

    function getHours(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var hours = date.getHours();
      return hours;
    }

    /***/
  },

  /***/ 90259: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    // ESM COMPAT FLAG
    __webpack_require__.r(__webpack_exports__);

    // EXPORTS
    __webpack_require__.d(__webpack_exports__, {
      default: () => /* binding */ getISOWeek,
    });

    // EXTERNAL MODULE: ./node_modules/date-fns/esm/toDate/index.js
    var toDate = __webpack_require__(19013);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/startOfWeek/index.js
    var startOfWeek = __webpack_require__(584);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/requiredArgs/index.js
    var requiredArgs = __webpack_require__(13882); // CONCATENATED MODULE: ./node_modules/date-fns/esm/startOfISOWeek/index.js
    /**
     * @name startOfISOWeek
     * @category ISO Week Helpers
     * @summary Return the start of an ISO week for the given date.
     *
     * @description
     * Return the start of an ISO week for the given date.
     * The result will be in the local timezone.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @returns {Date} the start of an ISO week
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // The start of an ISO week for 2 September 2014 11:55:00:
     * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Mon Sep 01 2014 00:00:00
     */

    function startOfISOWeek(dirtyDate) {
      (0, requiredArgs /* default */.Z)(1, arguments);
      return (0, startOfWeek["default"])(dirtyDate, {
        weekStartsOn: 1,
      });
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/getISOWeekYear/index.js
    /**
     * @name getISOWeekYear
     * @category ISO Week-Numbering Year Helpers
     * @summary Get the ISO week-numbering year of the given date.
     *
     * @description
     * Get the ISO week-numbering year of the given date,
     * which always starts 3 days before the year's first Thursday.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * - The function was renamed from `getISOYear` to `getISOWeekYear`.
     *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
     *   This change makes the name consistent with
     *   locale-dependent week-numbering year helpers, e.g., `getWeekYear`.
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the ISO week-numbering year
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Which ISO-week numbering year is 2 January 2005?
     * const result = getISOWeekYear(new Date(2005, 0, 2))
     * //=> 2004
     */

    function getISOWeekYear(dirtyDate) {
      (0, requiredArgs /* default */.Z)(1, arguments);
      var date = (0, toDate["default"])(dirtyDate);
      var year = date.getFullYear();
      var fourthOfJanuaryOfNextYear = new Date(0);
      fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
      fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
      var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
      var fourthOfJanuaryOfThisYear = new Date(0);
      fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
      fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
      var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);

      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/startOfISOWeekYear/index.js
    /**
     * @name startOfISOWeekYear
     * @category ISO Week-Numbering Year Helpers
     * @summary Return the start of an ISO week-numbering year for the given date.
     *
     * @description
     * Return the start of an ISO week-numbering year,
     * which always starts 3 days before the year's first Thursday.
     * The result will be in the local timezone.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @returns {Date} the start of an ISO week-numbering year
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // The start of an ISO week-numbering year for 2 July 2005:
     * const result = startOfISOWeekYear(new Date(2005, 6, 2))
     * //=> Mon Jan 03 2005 00:00:00
     */

    function startOfISOWeekYear(dirtyDate) {
      (0, requiredArgs /* default */.Z)(1, arguments);
      var year = getISOWeekYear(dirtyDate);
      var fourthOfJanuary = new Date(0);
      fourthOfJanuary.setFullYear(year, 0, 4);
      fourthOfJanuary.setHours(0, 0, 0, 0);
      var date = startOfISOWeek(fourthOfJanuary);
      return date;
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/getISOWeek/index.js
    var MILLISECONDS_IN_WEEK = 604800000;
    /**
     * @name getISOWeek
     * @category ISO Week Helpers
     * @summary Get the ISO week of the given date.
     *
     * @description
     * Get the ISO week of the given date.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the ISO week
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Which week of the ISO-week numbering year is 2 January 2005?
     * const result = getISOWeek(new Date(2005, 0, 2))
     * //=> 53
     */

    function getISOWeek(dirtyDate) {
      (0, requiredArgs /* default */.Z)(1, arguments);
      var date = (0, toDate["default"])(dirtyDate);
      var diff =
        startOfISOWeek(date).getTime() - startOfISOWeekYear(date).getTime(); // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)

      return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
    }

    /***/
  },

  /***/ 39159: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ getMinutes,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name getMinutes
     * @category Minute Helpers
     * @summary Get the minutes of the given date.
     *
     * @description
     * Get the minutes of the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the minutes
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Get the minutes of 29 February 2012 11:45:05:
     * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
     * //=> 45
     */

    function getMinutes(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var minutes = date.getMinutes();
      return minutes;
    }

    /***/
  },

  /***/ 78966: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ getMonth,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name getMonth
     * @category Month Helpers
     * @summary Get the month of the given date.
     *
     * @description
     * Get the month of the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the month
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Which month is 29 February 2012?
     * const result = getMonth(new Date(2012, 1, 29))
     * //=> 1
     */

    function getMonth(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var month = date.getMonth();
      return month;
    }

    /***/
  },

  /***/ 56605: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ getQuarter,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name getQuarter
     * @category Quarter Helpers
     * @summary Get the year quarter of the given date.
     *
     * @description
     * Get the year quarter of the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the quarter
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Which quarter is 2 July 2014?
     * const result = getQuarter(new Date(2014, 6, 2))
     * //=> 3
     */

    function getQuarter(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var quarter = Math.floor(date.getMonth() / 3) + 1;
      return quarter;
    }

    /***/
  },

  /***/ 77881: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ getSeconds,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name getSeconds
     * @category Second Helpers
     * @summary Get the seconds of the given date.
     *
     * @description
     * Get the seconds of the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the seconds
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Get the seconds of 29 February 2012 11:45:05.123:
     * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
     * //=> 5
     */

    function getSeconds(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var seconds = date.getSeconds();
      return seconds;
    }

    /***/
  },

  /***/ 28789: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ getTime,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name getTime
     * @category Timestamp Helpers
     * @summary Get the milliseconds timestamp of the given date.
     *
     * @description
     * Get the milliseconds timestamp of the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the timestamp
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Get the timestamp of 29 February 2012 11:45:05.123:
     * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
     * //=> 1330515905123
     */

    function getTime(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var timestamp = date.getTime();
      return timestamp;
    }

    /***/
  },

  /***/ 95570: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ getYear,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name getYear
     * @category Year Helpers
     * @summary Get the year of the given date.
     *
     * @description
     * Get the year of the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the year
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Which year is 2 July 2014?
     * const result = getYear(new Date(2014, 6, 2))
     * //=> 2014
     */

    function getYear(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var year = date.getFullYear();
      return year;
    }

    /***/
  },

  /***/ 42699: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ isAfter,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name isAfter
     * @category Common Helpers
     * @summary Is the first date after the second one?
     *
     * @description
     * Is the first date after the second one?
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date that should be after the other one to return true
     * @param {Date|Number} dateToCompare - the date to compare with
     * @returns {Boolean} the first date is after the second date
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Is 10 July 1989 after 11 February 1987?
     * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
     * //=> true
     */

    function isAfter(dirtyDate, dirtyDateToCompare) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var dateToCompare = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDateToCompare
      );
      return date.getTime() > dateToCompare.getTime();
    }

    /***/
  },

  /***/ 313: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ isBefore,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name isBefore
     * @category Common Helpers
     * @summary Is the first date before the second one?
     *
     * @description
     * Is the first date before the second one?
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date that should be before the other one to return true
     * @param {Date|Number} dateToCompare - the date to compare with
     * @returns {Boolean} the first date is before the second date
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Is 10 July 1989 before 11 February 1987?
     * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
     * //=> false
     */

    function isBefore(dirtyDate, dirtyDateToCompare) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var dateToCompare = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDateToCompare
      );
      return date.getTime() < dateToCompare.getTime();
    }

    /***/
  },

  /***/ 71381: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ isDate,
      /* harmony export */
    });
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name isDate
     * @category Common Helpers
     * @summary Is the given value a date?
     *
     * @description
     * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {*} value - the value to check
     * @returns {boolean} true if the given value is a date
     * @throws {TypeError} 1 arguments required
     *
     * @example
     * // For a valid date:
     * const result = isDate(new Date())
     * //=> true
     *
     * @example
     * // For an invalid date:
     * const result = isDate(new Date(NaN))
     * //=> true
     *
     * @example
     * // For some value:
     * const result = isDate('2014-02-31')
     * //=> false
     *
     * @example
     * // For an object:
     * const result = isDate({})
     * //=> false
     */

    function isDate(value) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      return (
        value instanceof Date ||
        (typeof value === "object" &&
          Object.prototype.toString.call(value) === "[object Date]")
      );
    }

    /***/
  },

  /***/ 96843: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ isEqual,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name isEqual
     * @category Common Helpers
     * @summary Are the given dates equal?
     *
     * @description
     * Are the given dates equal?
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the first date to compare
     * @param {Date|Number} dateRight - the second date to compare
     * @returns {Boolean} the dates are equal
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
     * var result = isEqual(
     *   new Date(2014, 6, 2, 6, 30, 45, 0),
     *   new Date(2014, 6, 2, 6, 30, 45, 500)
     * )
     * //=> false
     */

    function isEqual(dirtyLeftDate, dirtyRightDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var dateLeft = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyLeftDate);
      var dateRight = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyRightDate);
      return dateLeft.getTime() === dateRight.getTime();
    }

    /***/
  },

  /***/ 3151: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ isSameDay,
      /* harmony export */
    });
    /* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(69119);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name isSameDay
     * @category Day Helpers
     * @summary Are the given dates in the same day?
     *
     * @description
     * Are the given dates in the same day?
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the first date to check
     * @param {Date|Number} dateRight - the second date to check
     * @returns {Boolean} the dates are in the same day
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
     * var result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
     * //=> true
     */

    function isSameDay(dirtyDateLeft, dirtyDateRight) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var dateLeftStartOfDay = (0,
      _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDateLeft
      );
      var dateRightStartOfDay = (0,
      _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDateRight
      );
      return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
    }

    /***/
  },

  /***/ 49160: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ isSameMonth,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name isSameMonth
     * @category Month Helpers
     * @summary Are the given dates in the same month?
     *
     * @description
     * Are the given dates in the same month?
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the first date to check
     * @param {Date|Number} dateRight - the second date to check
     * @returns {Boolean} the dates are in the same month
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Are 2 September 2014 and 25 September 2014 in the same month?
     * var result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
     * //=> true
     */

    function isSameMonth(dirtyDateLeft, dirtyDateRight) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var dateLeft = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
      var dateRight = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
      return (
        dateLeft.getFullYear() === dateRight.getFullYear() &&
        dateLeft.getMonth() === dateRight.getMonth()
      );
    }

    /***/
  },

  /***/ 86117: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ isSameQuarter,
      /* harmony export */
    });
    /* harmony import */ var _startOfQuarter_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(94431);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name isSameQuarter
     * @category Quarter Helpers
     * @summary Are the given dates in the same year quarter?
     *
     * @description
     * Are the given dates in the same year quarter?
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the first date to check
     * @param {Date|Number} dateRight - the second date to check
     * @returns {Boolean} the dates are in the same quarter
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Are 1 January 2014 and 8 March 2014 in the same quarter?
     * var result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
     * //=> true
     */

    function isSameQuarter(dirtyDateLeft, dirtyDateRight) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var dateLeftStartOfQuarter = (0,
      _startOfQuarter_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDateLeft
      );
      var dateRightStartOfQuarter = (0,
      _startOfQuarter_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDateRight
      );
      return (
        dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime()
      );
    }

    /***/
  },

  /***/ 60792: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ isSameYear,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name isSameYear
     * @category Year Helpers
     * @summary Are the given dates in the same year?
     *
     * @description
     * Are the given dates in the same year?
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the first date to check
     * @param {Date|Number} dateRight - the second date to check
     * @returns {Boolean} the dates are in the same year
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Are 2 September 2014 and 25 September 2014 in the same year?
     * var result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
     * //=> true
     */

    function isSameYear(dirtyDateLeft, dirtyDateRight) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var dateLeft = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
      var dateRight = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
      return dateLeft.getFullYear() === dateRight.getFullYear();
    }

    /***/
  },

  /***/ 12274: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ isValid,
      /* harmony export */
    });
    /* harmony import */ var _isDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(71381);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name isValid
     * @category Common Helpers
     * @summary Is the given date valid?
     *
     * @description
     * Returns false if argument is Invalid Date and true otherwise.
     * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
     * Invalid Date is a Date, whose time value is NaN.
     *
     * Time value of Date: http://es5.github.io/#x15.9.1.1
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * - Now `isValid` doesn't throw an exception
     *   if the first argument is not an instance of Date.
     *   Instead, argument is converted beforehand using `toDate`.
     *
     *   Examples:
     *
     *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
     *   |---------------------------|---------------|---------------|
     *   | `new Date()`              | `true`        | `true`        |
     *   | `new Date('2016-01-01')`  | `true`        | `true`        |
     *   | `new Date('')`            | `false`       | `false`       |
     *   | `new Date(1488370835081)` | `true`        | `true`        |
     *   | `new Date(NaN)`           | `false`       | `false`       |
     *   | `'2016-01-01'`            | `TypeError`   | `false`       |
     *   | `''`                      | `TypeError`   | `false`       |
     *   | `1488370835081`           | `TypeError`   | `true`        |
     *   | `NaN`                     | `TypeError`   | `false`       |
     *
     *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
     *   that try to coerce arguments to the expected type
     *   (which is also the case with other *date-fns* functions).
     *
     * @param {*} date - the date to check
     * @returns {Boolean} the date is valid
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // For the valid date:
     * const result = isValid(new Date(2014, 1, 31))
     * //=> true
     *
     * @example
     * // For the value, convertable into a date:
     * const result = isValid(1393804800000)
     * //=> true
     *
     * @example
     * // For the invalid date:
     * const result = isValid(new Date(''))
     * //=> false
     */

    function isValid(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );

      if (
        !(0, _isDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
          dirtyDate
        ) &&
        typeof dirtyDate !== "number"
      ) {
        return false;
      }

      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate
      );
      return !isNaN(Number(date));
    }

    /***/
  },

  /***/ 24257: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ isWithinInterval,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name isWithinInterval
     * @category Interval Helpers
     * @summary Is the given date within the interval?
     *
     * @description
     * Is the given date within the interval? (Including start and end.)
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * - The function was renamed from `isWithinRange` to `isWithinInterval`.
     *   This change was made to mirror the use of the word "interval" in standard ISO 8601:2004 terminology:
     *
     *   ```
     *   2.1.3
     *   time interval
     *   part of the time axis limited by two instants
     *   ```
     *
     *   Also, this function now accepts an object with `start` and `end` properties
     *   instead of two arguments as an interval.
     *   This function now throws `RangeError` if the start of the interval is after its end
     *   or if any date in the interval is `Invalid Date`.
     *
     *   ```javascript
     *   // Before v2.0.0
     *
     *   isWithinRange(
     *     new Date(2014, 0, 3),
     *     new Date(2014, 0, 1), new Date(2014, 0, 7)
     *   )
     *
     *   // v2.0.0 onward
     *
     *   isWithinInterval(
     *     new Date(2014, 0, 3),
     *     { start: new Date(2014, 0, 1), end: new Date(2014, 0, 7) }
     *   )
     *   ```
     *
     * @param {Date|Number} date - the date to check
     * @param {Interval} interval - the interval to check
     * @returns {Boolean} the date is within the interval
     * @throws {TypeError} 2 arguments required
     * @throws {RangeError} The start of an interval cannot be after its end
     * @throws {RangeError} Date in interval cannot be `Invalid Date`
     *
     * @example
     * // For the date within the interval:
     * isWithinInterval(new Date(2014, 0, 3), {
     *   start: new Date(2014, 0, 1),
     *   end: new Date(2014, 0, 7)
     * })
     * //=> true
     *
     * @example
     * // For the date outside of the interval:
     * isWithinInterval(new Date(2014, 0, 10), {
     *   start: new Date(2014, 0, 1),
     *   end: new Date(2014, 0, 7)
     * })
     * //=> false
     *
     * @example
     * // For date equal to interval start:
     * isWithinInterval(date, { start, end: date }) // => true
     *
     * @example
     * // For date equal to interval end:
     * isWithinInterval(date, { start: date, end }) // => true
     */
    function isWithinInterval(dirtyDate, interval) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var time = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      ).getTime();
      var startTime = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        interval.start
      ).getTime();
      var endTime = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        interval.end
      ).getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

      if (!(startTime <= endTime)) {
        throw new RangeError("Invalid interval");
      }

      return time >= startTime && time <= endTime;
    }

    /***/
  },

  /***/ 35077: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";

    // EXPORTS
    __webpack_require__.d(__webpack_exports__, {
      Z: () => /* binding */ en_US,
    }); // CONCATENATED MODULE: ./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js

    var formatDistanceLocale = {
      lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds",
      },
      xSeconds: {
        one: "1 second",
        other: "{{count}} seconds",
      },
      halfAMinute: "half a minute",
      lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes",
      },
      xMinutes: {
        one: "1 minute",
        other: "{{count}} minutes",
      },
      aboutXHours: {
        one: "about 1 hour",
        other: "about {{count}} hours",
      },
      xHours: {
        one: "1 hour",
        other: "{{count}} hours",
      },
      xDays: {
        one: "1 day",
        other: "{{count}} days",
      },
      aboutXWeeks: {
        one: "about 1 week",
        other: "about {{count}} weeks",
      },
      xWeeks: {
        one: "1 week",
        other: "{{count}} weeks",
      },
      aboutXMonths: {
        one: "about 1 month",
        other: "about {{count}} months",
      },
      xMonths: {
        one: "1 month",
        other: "{{count}} months",
      },
      aboutXYears: {
        one: "about 1 year",
        other: "about {{count}} years",
      },
      xYears: {
        one: "1 year",
        other: "{{count}} years",
      },
      overXYears: {
        one: "over 1 year",
        other: "over {{count}} years",
      },
      almostXYears: {
        one: "almost 1 year",
        other: "almost {{count}} years",
      },
    };

    var formatDistance = function (token, count, options) {
      var result;
      var tokenValue = formatDistanceLocale[token];

      if (typeof tokenValue === "string") {
        result = tokenValue;
      } else if (count === 1) {
        result = tokenValue.one;
      } else {
        result = tokenValue.other.replace("{{count}}", count.toString());
      }

      if (options !== null && options !== void 0 && options.addSuffix) {
        if (options.comparison && options.comparison > 0) {
          return "in " + result;
        } else {
          return result + " ago";
        }
      }

      return result;
    };

    /* harmony default export */ const _lib_formatDistance = formatDistance; // CONCATENATED MODULE: ./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js
    function buildFormatLongFn(args) {
      return function () {
        var options =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : {};
        // TODO: Remove String()
        var width = options.width ? String(options.width) : args.defaultWidth;
        var format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
      };
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js
    var dateFormats = {
      full: "EEEE, MMMM do, y",
      long: "MMMM do, y",
      medium: "MMM d, y",
      short: "MM/dd/yyyy",
    };
    var timeFormats = {
      full: "h:mm:ss a zzzz",
      long: "h:mm:ss a z",
      medium: "h:mm:ss a",
      short: "h:mm a",
    };
    var dateTimeFormats = {
      full: "{{date}} 'at' {{time}}",
      long: "{{date}} 'at' {{time}}",
      medium: "{{date}}, {{time}}",
      short: "{{date}}, {{time}}",
    };
    var formatLong = {
      date: buildFormatLongFn({
        formats: dateFormats,
        defaultWidth: "full",
      }),
      time: buildFormatLongFn({
        formats: timeFormats,
        defaultWidth: "full",
      }),
      dateTime: buildFormatLongFn({
        formats: dateTimeFormats,
        defaultWidth: "full",
      }),
    };
    /* harmony default export */ const _lib_formatLong = formatLong; // CONCATENATED MODULE: ./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js
    var formatRelativeLocale = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P",
    };

    var formatRelative = function (token, _date, _baseDate, _options) {
      return formatRelativeLocale[token];
    };

    /* harmony default export */ const _lib_formatRelative = formatRelative; // CONCATENATED MODULE: ./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js
    function buildLocalizeFn(args) {
      return function (dirtyIndex, dirtyOptions) {
        var options = dirtyOptions || {};
        var context = options.context ? String(options.context) : "standalone";
        var valuesArray;

        if (context === "formatting" && args.formattingValues) {
          var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
          var width = options.width ? String(options.width) : defaultWidth;
          valuesArray =
            args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
          var _defaultWidth = args.defaultWidth;

          var _width = options.width
            ? String(options.width)
            : args.defaultWidth;

          valuesArray = args.values[_width] || args.values[_defaultWidth];
        }

        var index = args.argumentCallback
          ? args.argumentCallback(dirtyIndex)
          : dirtyIndex; // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challange you to try to remove it!

        return valuesArray[index];
      };
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js
    var eraValues = {
      narrow: ["B", "A"],
      abbreviated: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"],
    };
    var quarterValues = {
      narrow: ["1", "2", "3", "4"],
      abbreviated: ["Q1", "Q2", "Q3", "Q4"],
      wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
    }; // Note: in English, the names of days of the week and months are capitalized.
    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
    // Generally, formatted dates should look like they are in the middle of a sentence,
    // e.g. in Spanish language the weekdays and months should be in the lowercase.

    var monthValues = {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbreviated: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      wide: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
    var dayValues = {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
    var dayPeriodValues = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      },
    };
    var formattingDayPeriodValues = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night",
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night",
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night",
      },
    };

    var ordinalNumber = function (dirtyNumber, _options) {
      var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
      // if they are different for different grammatical genders,
      // use `options.unit`.
      //
      // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
      // 'day', 'hour', 'minute', 'second'.

      var rem100 = number % 100;

      if (rem100 > 20 || rem100 < 10) {
        switch (rem100 % 10) {
          case 1:
            return number + "st";

          case 2:
            return number + "nd";

          case 3:
            return number + "rd";
        }
      }

      return number + "th";
    };

    var localize = {
      ordinalNumber: ordinalNumber,
      era: buildLocalizeFn({
        values: eraValues,
        defaultWidth: "wide",
      }),
      quarter: buildLocalizeFn({
        values: quarterValues,
        defaultWidth: "wide",
        argumentCallback: function (quarter) {
          return quarter - 1;
        },
      }),
      month: buildLocalizeFn({
        values: monthValues,
        defaultWidth: "wide",
      }),
      day: buildLocalizeFn({
        values: dayValues,
        defaultWidth: "wide",
      }),
      dayPeriod: buildLocalizeFn({
        values: dayPeriodValues,
        defaultWidth: "wide",
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: "wide",
      }),
    };
    /* harmony default export */ const _lib_localize = localize; // CONCATENATED MODULE: ./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js
    function buildMatchFn(args) {
      return function (string) {
        var options =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        var width = options.width;
        var matchPattern =
          (width && args.matchPatterns[width]) ||
          args.matchPatterns[args.defaultMatchWidth];
        var matchResult = string.match(matchPattern);

        if (!matchResult) {
          return null;
        }

        var matchedString = matchResult[0];
        var parsePatterns =
          (width && args.parsePatterns[width]) ||
          args.parsePatterns[args.defaultParseWidth];
        var key = Array.isArray(parsePatterns)
          ? findIndex(parsePatterns, function (pattern) {
              return pattern.test(matchedString);
            })
          : findKey(parsePatterns, function (pattern) {
              return pattern.test(matchedString);
            });
        var value;
        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value: value,
          rest: rest,
        };
      };
    }

    function findKey(object, predicate) {
      for (var key in object) {
        if (object.hasOwnProperty(key) && predicate(object[key])) {
          return key;
        }
      }

      return undefined;
    }

    function findIndex(array, predicate) {
      for (var key = 0; key < array.length; key++) {
        if (predicate(array[key])) {
          return key;
        }
      }

      return undefined;
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js
    function buildMatchPatternFn(args) {
      return function (string) {
        var options =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        var matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        var matchedString = matchResult[0];
        var parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        var value = args.valueCallback
          ? args.valueCallback(parseResult[0])
          : parseResult[0];
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value: value,
          rest: rest,
        };
      };
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js
    var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
    var parseOrdinalNumberPattern = /\d+/i;
    var matchEraPatterns = {
      narrow: /^(b|a)/i,
      abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
      wide: /^(before christ|before common era|anno domini|common era)/i,
    };
    var parseEraPatterns = {
      any: [/^b/i, /^(a|c)/i],
    };
    var matchQuarterPatterns = {
      narrow: /^[1234]/i,
      abbreviated: /^q[1234]/i,
      wide: /^[1234](th|st|nd|rd)? quarter/i,
    };
    var parseQuarterPatterns = {
      any: [/1/i, /2/i, /3/i, /4/i],
    };
    var matchMonthPatterns = {
      narrow: /^[jfmasond]/i,
      abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
    };
    var parseMonthPatterns = {
      narrow: [
        /^j/i,
        /^f/i,
        /^m/i,
        /^a/i,
        /^m/i,
        /^j/i,
        /^j/i,
        /^a/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i,
      ],
      any: [
        /^ja/i,
        /^f/i,
        /^mar/i,
        /^ap/i,
        /^may/i,
        /^jun/i,
        /^jul/i,
        /^au/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i,
      ],
    };
    var matchDayPatterns = {
      narrow: /^[smtwf]/i,
      short: /^(su|mo|tu|we|th|fr|sa)/i,
      abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
      wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
    };
    var parseDayPatterns = {
      narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
      any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
    };
    var matchDayPeriodPatterns = {
      narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
      any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
    };
    var parseDayPeriodPatterns = {
      any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i,
      },
    };
    var match = {
      ordinalNumber: buildMatchPatternFn({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: function (value) {
          return parseInt(value, 10);
        },
      }),
      era: buildMatchFn({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseEraPatterns,
        defaultParseWidth: "any",
      }),
      quarter: buildMatchFn({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: "any",
        valueCallback: function (index) {
          return index + 1;
        },
      }),
      month: buildMatchFn({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: "any",
      }),
      day: buildMatchFn({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseDayPatterns,
        defaultParseWidth: "any",
      }),
      dayPeriod: buildMatchFn({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: "any",
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: "any",
      }),
    };
    /* harmony default export */ const _lib_match = match; // CONCATENATED MODULE: ./node_modules/date-fns/esm/locale/en-US/index.js
    /**
     * @type {Locale}
     * @category Locales
     * @summary English locale (United States).
     * @language English
     * @iso-639-2 eng
     * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
     * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
     */
    var locale = {
      code: "en-US",
      formatDistance: _lib_formatDistance,
      formatLong: _lib_formatLong,
      formatRelative: _lib_formatRelative,
      localize: _lib_localize,
      match: _lib_match,
      options: {
        weekStartsOn: 0,
        /* Sunday */
        firstWeekContainsDate: 1,
      },
    };
    /* harmony default export */ const en_US = locale;

    /***/
  },

  /***/ 99890: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ max,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name max
     * @category Common Helpers
     * @summary Return the latest of the given dates.
     *
     * @description
     * Return the latest of the given dates.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * - `max` function now accepts an array of dates rather than spread arguments.
     *
     *   ```javascript
     *   // Before v2.0.0
     *   var date1 = new Date(1989, 6, 10)
     *   var date2 = new Date(1987, 1, 11)
     *   var maxDate = max(date1, date2)
     *
     *   // v2.0.0 onward:
     *   var dates = [new Date(1989, 6, 10), new Date(1987, 1, 11)]
     *   var maxDate = max(dates)
     *   ```
     *
     * @param {Date[]|Number[]} datesArray - the dates to compare
     * @returns {Date} the latest of the dates
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Which of these dates is the latest?
     * var result = max([
     *   new Date(1989, 6, 10),
     *   new Date(1987, 1, 11),
     *   new Date(1995, 6, 2),
     *   new Date(1990, 0, 1)
     * ])
     * //=> Sun Jul 02 1995 00:00:00
     */

    function max(dirtyDatesArray) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var datesArray; // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method

      if (dirtyDatesArray && typeof dirtyDatesArray.forEach === "function") {
        datesArray = dirtyDatesArray; // If `dirtyDatesArray` is Array-like Object, convert to Array.
      } else if (
        typeof dirtyDatesArray === "object" &&
        dirtyDatesArray !== null
      ) {
        datesArray = Array.prototype.slice.call(dirtyDatesArray);
      } else {
        // `dirtyDatesArray` is non-iterable, return Invalid Date
        return new Date(NaN);
      }

      var result;
      datesArray.forEach(function (dirtyDate) {
        var currentDate = (0,
        _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);

        if (
          result === undefined ||
          result < currentDate ||
          isNaN(Number(currentDate))
        ) {
          result = currentDate;
        }
      });
      return result || new Date(NaN);
    }

    /***/
  },

  /***/ 37950: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ min,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name min
     * @category Common Helpers
     * @summary Returns the earliest of the given dates.
     *
     * @description
     * Returns the earliest of the given dates.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * - `min` function now accepts an array of dates rather than spread arguments.
     *
     *   ```javascript
     *   // Before v2.0.0
     *   const date1 = new Date(1989, 6, 10)
     *   const date2 = new Date(1987, 1, 11)
     *   const minDate = min(date1, date2)
     *
     *   // v2.0.0 onward:
     *   const dates = [new Date(1989, 6, 10), new Date(1987, 1, 11)]
     *   const minDate = min(dates)
     *   ```
     *
     * @param {Date[]|Number[]} datesArray - the dates to compare
     * @returns {Date} - the earliest of the dates
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Which of these dates is the earliest?
     * const result = min([
     *   new Date(1989, 6, 10),
     *   new Date(1987, 1, 11),
     *   new Date(1995, 6, 2),
     *   new Date(1990, 0, 1)
     * ])
     * //=> Wed Feb 11 1987 00:00:00
     */

    function min(dirtyDatesArray) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var datesArray; // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method

      if (dirtyDatesArray && typeof dirtyDatesArray.forEach === "function") {
        datesArray = dirtyDatesArray; // If `dirtyDatesArray` is Array-like Object, convert to Array.
      } else if (
        typeof dirtyDatesArray === "object" &&
        dirtyDatesArray !== null
      ) {
        datesArray = Array.prototype.slice.call(dirtyDatesArray);
      } else {
        // `dirtyDatesArray` is non-iterable, return Invalid Date
        return new Date(NaN);
      }

      var result;
      datesArray.forEach(function (dirtyDate) {
        var currentDate = (0,
        _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);

        if (
          result === undefined ||
          result > currentDate ||
          isNaN(currentDate.getDate())
        ) {
          result = currentDate;
        }
      });
      return result || new Date(NaN);
    }

    /***/
  },

  /***/ 24002: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    // ESM COMPAT FLAG
    __webpack_require__.r(__webpack_exports__);

    // EXPORTS
    __webpack_require__.d(__webpack_exports__, {
      default: () => /* binding */ parse,
    });

    // EXTERNAL MODULE: ./node_modules/date-fns/esm/locale/en-US/index.js + 9 modules
    var en_US = __webpack_require__(35077);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/subMilliseconds/index.js
    var subMilliseconds = __webpack_require__(91218);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/toDate/index.js
    var toDate = __webpack_require__(19013); // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/assign/index.js
    function assign_assign(target, dirtyObject) {
      if (target == null) {
        throw new TypeError(
          "assign requires that input parameter not be null or undefined"
        );
      }

      dirtyObject = dirtyObject || {};

      for (var property in dirtyObject) {
        if (Object.prototype.hasOwnProperty.call(dirtyObject, property)) {
          target[property] = dirtyObject[property];
        }
      }

      return target;
    }
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/format/longFormatters/index.js
    var longFormatters = __webpack_require__(97621);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
    var getTimezoneOffsetInMilliseconds = __webpack_require__(24262);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/protectedTokens/index.js
    var protectedTokens = __webpack_require__(5267);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/toInteger/index.js
    var toInteger = __webpack_require__(83946);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js
    var getUTCWeekYear = __webpack_require__(7651);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/requiredArgs/index.js
    var requiredArgs = __webpack_require__(13882); // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/setUTCDay/index.js
    // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
      (0, requiredArgs /* default */.Z)(2, arguments);
      var options = dirtyOptions || {};
      var locale = options.locale;
      var localeWeekStartsOn =
        locale && locale.options && locale.options.weekStartsOn;
      var defaultWeekStartsOn =
        localeWeekStartsOn == null
          ? 0
          : (0, toInteger /* default */.Z)(localeWeekStartsOn);
      var weekStartsOn =
        options.weekStartsOn == null
          ? defaultWeekStartsOn
          : (0, toInteger /* default */.Z)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError(
          "weekStartsOn must be between 0 and 6 inclusively"
        );
      }

      var date = (0, toDate["default"])(dirtyDate);
      var day = (0, toInteger /* default */.Z)(dirtyDay);
      var currentDay = date.getUTCDay();
      var remainder = day % 7;
      var dayIndex = (remainder + 7) % 7;
      var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
      date.setUTCDate(date.getUTCDate() + diff);
      return date;
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/setUTCISODay/index.js
    // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function setUTCISODay(dirtyDate, dirtyDay) {
      (0, requiredArgs /* default */.Z)(2, arguments);
      var day = (0, toInteger /* default */.Z)(dirtyDay);

      if (day % 7 === 0) {
        day = day - 7;
      }

      var weekStartsOn = 1;
      var date = (0, toDate["default"])(dirtyDate);
      var currentDay = date.getUTCDay();
      var remainder = day % 7;
      var dayIndex = (remainder + 7) % 7;
      var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
      date.setUTCDate(date.getUTCDate() + diff);
      return date;
    }
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js + 1 modules
    var getUTCISOWeek = __webpack_require__(33276); // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/setUTCISOWeek/index.js
    // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
      (0, requiredArgs /* default */.Z)(2, arguments);
      var date = (0, toDate["default"])(dirtyDate);
      var isoWeek = (0, toInteger /* default */.Z)(dirtyISOWeek);
      var diff = (0, getUTCISOWeek /* default */.Z)(date) - isoWeek;
      date.setUTCDate(date.getUTCDate() - diff * 7);
      return date;
    }
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getUTCWeek/index.js + 1 modules
    var getUTCWeek = __webpack_require__(5230); // CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/setUTCWeek/index.js
    // This function will be a part of public API when UTC function will be implemented.
    // See issue: https://github.com/date-fns/date-fns/issues/376

    function setUTCWeek(dirtyDate, dirtyWeek, options) {
      (0, requiredArgs /* default */.Z)(2, arguments);
      var date = (0, toDate["default"])(dirtyDate);
      var week = (0, toInteger /* default */.Z)(dirtyWeek);
      var diff = (0, getUTCWeek /* default */.Z)(date, options) - week;
      date.setUTCDate(date.getUTCDate() - diff * 7);
      return date;
    }
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js
    var startOfUTCISOWeek = __webpack_require__(66979);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js
    var startOfUTCWeek = __webpack_require__(59025); // CONCATENATED MODULE: ./node_modules/date-fns/esm/parse/_lib/parsers/index.js
    var MILLISECONDS_IN_HOUR = 3600000;
    var MILLISECONDS_IN_MINUTE = 60000;
    var MILLISECONDS_IN_SECOND = 1000;
    var numericPatterns = {
      month: /^(1[0-2]|0?\d)/,
      // 0 to 12
      date: /^(3[0-1]|[0-2]?\d)/,
      // 0 to 31
      dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
      // 0 to 366
      week: /^(5[0-3]|[0-4]?\d)/,
      // 0 to 53
      hour23h: /^(2[0-3]|[0-1]?\d)/,
      // 0 to 23
      hour24h: /^(2[0-4]|[0-1]?\d)/,
      // 0 to 24
      hour11h: /^(1[0-1]|0?\d)/,
      // 0 to 11
      hour12h: /^(1[0-2]|0?\d)/,
      // 0 to 12
      minute: /^[0-5]?\d/,
      // 0 to 59
      second: /^[0-5]?\d/,
      // 0 to 59
      singleDigit: /^\d/,
      // 0 to 9
      twoDigits: /^\d{1,2}/,
      // 0 to 99
      threeDigits: /^\d{1,3}/,
      // 0 to 999
      fourDigits: /^\d{1,4}/,
      // 0 to 9999
      anyDigitsSigned: /^-?\d+/,
      singleDigitSigned: /^-?\d/,
      // 0 to 9, -0 to -9
      twoDigitsSigned: /^-?\d{1,2}/,
      // 0 to 99, -0 to -99
      threeDigitsSigned: /^-?\d{1,3}/,
      // 0 to 999, -0 to -999
      fourDigitsSigned: /^-?\d{1,4}/, // 0 to 9999, -0 to -9999
    };
    var timezonePatterns = {
      basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
      basic: /^([+-])(\d{2})(\d{2})|Z/,
      basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
      extended: /^([+-])(\d{2}):(\d{2})|Z/,
      extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/,
    };

    function parseNumericPattern(pattern, string, valueCallback) {
      var matchResult = string.match(pattern);

      if (!matchResult) {
        return null;
      }

      var value = parseInt(matchResult[0], 10);
      return {
        value: valueCallback ? valueCallback(value) : value,
        rest: string.slice(matchResult[0].length),
      };
    }

    function parseTimezonePattern(pattern, string) {
      var matchResult = string.match(pattern);

      if (!matchResult) {
        return null;
      } // Input is 'Z'

      if (matchResult[0] === "Z") {
        return {
          value: 0,
          rest: string.slice(1),
        };
      }

      var sign = matchResult[1] === "+" ? 1 : -1;
      var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
      var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
      var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
      return {
        value:
          sign *
          (hours * MILLISECONDS_IN_HOUR +
            minutes * MILLISECONDS_IN_MINUTE +
            seconds * MILLISECONDS_IN_SECOND),
        rest: string.slice(matchResult[0].length),
      };
    }

    function parseAnyDigitsSigned(string, valueCallback) {
      return parseNumericPattern(
        numericPatterns.anyDigitsSigned,
        string,
        valueCallback
      );
    }

    function parseNDigits(n, string, valueCallback) {
      switch (n) {
        case 1:
          return parseNumericPattern(
            numericPatterns.singleDigit,
            string,
            valueCallback
          );

        case 2:
          return parseNumericPattern(
            numericPatterns.twoDigits,
            string,
            valueCallback
          );

        case 3:
          return parseNumericPattern(
            numericPatterns.threeDigits,
            string,
            valueCallback
          );

        case 4:
          return parseNumericPattern(
            numericPatterns.fourDigits,
            string,
            valueCallback
          );

        default:
          return parseNumericPattern(
            new RegExp("^\\d{1," + n + "}"),
            string,
            valueCallback
          );
      }
    }

    function parseNDigitsSigned(n, string, valueCallback) {
      switch (n) {
        case 1:
          return parseNumericPattern(
            numericPatterns.singleDigitSigned,
            string,
            valueCallback
          );

        case 2:
          return parseNumericPattern(
            numericPatterns.twoDigitsSigned,
            string,
            valueCallback
          );

        case 3:
          return parseNumericPattern(
            numericPatterns.threeDigitsSigned,
            string,
            valueCallback
          );

        case 4:
          return parseNumericPattern(
            numericPatterns.fourDigitsSigned,
            string,
            valueCallback
          );

        default:
          return parseNumericPattern(
            new RegExp("^-?\\d{1," + n + "}"),
            string,
            valueCallback
          );
      }
    }

    function dayPeriodEnumToHours(enumValue) {
      switch (enumValue) {
        case "morning":
          return 4;

        case "evening":
          return 17;

        case "pm":
        case "noon":
        case "afternoon":
          return 12;

        case "am":
        case "midnight":
        case "night":
        default:
          return 0;
      }
    }

    function normalizeTwoDigitYear(twoDigitYear, currentYear) {
      var isCommonEra = currentYear > 0; // Absolute number of the current year:
      // 1 -> 1 AC
      // 0 -> 1 BC
      // -1 -> 2 BC

      var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
      var result;

      if (absCurrentYear <= 50) {
        result = twoDigitYear || 100;
      } else {
        var rangeEnd = absCurrentYear + 50;
        var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
        var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
        result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
      }

      return isCommonEra ? result : 1 - result;
    }

    var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var DAYS_IN_MONTH_LEAP_YEAR = [
      31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
    ]; // User for validation

    function isLeapYearIndex(year) {
      return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    }
    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* | Milliseconds in day            |
     * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
     * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
     * |  d  | Day of month                   |  D  | Day of year                    |
     * |  e  | Local day of week              |  E  | Day of week                    |
     * |  f  |                                |  F* | Day of week in month           |
     * |  g* | Modified Julian day            |  G  | Era                            |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  i! | ISO day of week                |  I! | ISO week of year               |
     * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
     * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
     * |  l* | (deprecated)                   |  L  | Stand-alone month              |
     * |  m  | Minute                         |  M  | Month                          |
     * |  n  |                                |  N  |                                |
     * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
     * |  p  |                                |  P  |                                |
     * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
     * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
     * |  u  | Extended year                  |  U* | Cyclic year                    |
     * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
     * |  w  | Local week of year             |  W* | Week of month                  |
     * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
     * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
     * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     *
     * Letters marked by ! are non-standard, but implemented by date-fns:
     * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
     * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
     *   i.e. 7 for Sunday, 1 for Monday, etc.
     * - `I` is ISO week of year, as opposed to `w` which is local week of year.
     * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
     *   `R` is supposed to be used in conjunction with `I` and `i`
     *   for universal ISO week-numbering date, whereas
     *   `Y` is supposed to be used in conjunction with `w` and `e`
     *   for week-numbering date specific to the locale.
     */

    var parsers = {
      // Era
      G: {
        priority: 140,
        parse: function (string, token, match, _options) {
          switch (token) {
            // AD, BC
            case "G":
            case "GG":
            case "GGG":
              return (
                match.era(string, {
                  width: "abbreviated",
                }) ||
                match.era(string, {
                  width: "narrow",
                })
              );
            // A, B

            case "GGGGG":
              return match.era(string, {
                width: "narrow",
              });
            // Anno Domini, Before Christ

            case "GGGG":
            default:
              return (
                match.era(string, {
                  width: "wide",
                }) ||
                match.era(string, {
                  width: "abbreviated",
                }) ||
                match.era(string, {
                  width: "narrow",
                })
              );
          }
        },
        set: function (date, flags, value, _options) {
          flags.era = value;
          date.setUTCFullYear(value, 0, 1);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: ["R", "u", "t", "T"],
      },
      // Year
      y: {
        // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
        // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
        // |----------|-------|----|-------|-------|-------|
        // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
        // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
        // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
        // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
        // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
        priority: 130,
        parse: function (string, token, match, _options) {
          var valueCallback = function (year) {
            return {
              year: year,
              isTwoDigitYear: token === "yy",
            };
          };

          switch (token) {
            case "y":
              return parseNDigits(4, string, valueCallback);

            case "yo":
              return match.ordinalNumber(string, {
                unit: "year",
                valueCallback: valueCallback,
              });

            default:
              return parseNDigits(token.length, string, valueCallback);
          }
        },
        validate: function (_date, value, _options) {
          return value.isTwoDigitYear || value.year > 0;
        },
        set: function (date, flags, value, _options) {
          var currentYear = date.getUTCFullYear();

          if (value.isTwoDigitYear) {
            var normalizedTwoDigitYear = normalizeTwoDigitYear(
              value.year,
              currentYear
            );
            date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
            date.setUTCHours(0, 0, 0, 0);
            return date;
          }

          var year =
            !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
          date.setUTCFullYear(year, 0, 1);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"],
      },
      // Local week-numbering year
      Y: {
        priority: 130,
        parse: function (string, token, match, _options) {
          var valueCallback = function (year) {
            return {
              year: year,
              isTwoDigitYear: token === "YY",
            };
          };

          switch (token) {
            case "Y":
              return parseNDigits(4, string, valueCallback);

            case "Yo":
              return match.ordinalNumber(string, {
                unit: "year",
                valueCallback: valueCallback,
              });

            default:
              return parseNDigits(token.length, string, valueCallback);
          }
        },
        validate: function (_date, value, _options) {
          return value.isTwoDigitYear || value.year > 0;
        },
        set: function (date, flags, value, options) {
          var currentYear = (0, getUTCWeekYear /* default */.Z)(date, options);

          if (value.isTwoDigitYear) {
            var normalizedTwoDigitYear = normalizeTwoDigitYear(
              value.year,
              currentYear
            );
            date.setUTCFullYear(
              normalizedTwoDigitYear,
              0,
              options.firstWeekContainsDate
            );
            date.setUTCHours(0, 0, 0, 0);
            return (0, startOfUTCWeek /* default */.Z)(date, options);
          }

          var year =
            !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
          date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
          date.setUTCHours(0, 0, 0, 0);
          return (0, startOfUTCWeek /* default */.Z)(date, options);
        },
        incompatibleTokens: [
          "y",
          "R",
          "u",
          "Q",
          "q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "i",
          "t",
          "T",
        ],
      },
      // ISO week-numbering year
      R: {
        priority: 130,
        parse: function (string, token, _match, _options) {
          if (token === "R") {
            return parseNDigitsSigned(4, string);
          }

          return parseNDigitsSigned(token.length, string);
        },
        set: function (_date, _flags, value, _options) {
          var firstWeekOfYear = new Date(0);
          firstWeekOfYear.setUTCFullYear(value, 0, 4);
          firstWeekOfYear.setUTCHours(0, 0, 0, 0);
          return (0, startOfUTCISOWeek /* default */.Z)(firstWeekOfYear);
        },
        incompatibleTokens: [
          "G",
          "y",
          "Y",
          "u",
          "Q",
          "q",
          "M",
          "L",
          "w",
          "d",
          "D",
          "e",
          "c",
          "t",
          "T",
        ],
      },
      // Extended year
      u: {
        priority: 130,
        parse: function (string, token, _match, _options) {
          if (token === "u") {
            return parseNDigitsSigned(4, string);
          }

          return parseNDigitsSigned(token.length, string);
        },
        set: function (date, _flags, value, _options) {
          date.setUTCFullYear(value, 0, 1);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: [
          "G",
          "y",
          "Y",
          "R",
          "w",
          "I",
          "i",
          "e",
          "c",
          "t",
          "T",
        ],
      },
      // Quarter
      Q: {
        priority: 120,
        parse: function (string, token, match, _options) {
          switch (token) {
            // 1, 2, 3, 4
            case "Q":
            case "QQ":
              // 01, 02, 03, 04
              return parseNDigits(token.length, string);
            // 1st, 2nd, 3rd, 4th

            case "Qo":
              return match.ordinalNumber(string, {
                unit: "quarter",
              });
            // Q1, Q2, Q3, Q4

            case "QQQ":
              return (
                match.quarter(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.quarter(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
            // 1, 2, 3, 4 (narrow quarter; could be not numerical)

            case "QQQQQ":
              return match.quarter(string, {
                width: "narrow",
                context: "formatting",
              });
            // 1st quarter, 2nd quarter, ...

            case "QQQQ":
            default:
              return (
                match.quarter(string, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.quarter(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.quarter(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        },
        validate: function (_date, value, _options) {
          return value >= 1 && value <= 4;
        },
        set: function (date, _flags, value, _options) {
          date.setUTCMonth((value - 1) * 3, 1);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: [
          "Y",
          "R",
          "q",
          "M",
          "L",
          "w",
          "I",
          "d",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ],
      },
      // Stand-alone quarter
      q: {
        priority: 120,
        parse: function (string, token, match, _options) {
          switch (token) {
            // 1, 2, 3, 4
            case "q":
            case "qq":
              // 01, 02, 03, 04
              return parseNDigits(token.length, string);
            // 1st, 2nd, 3rd, 4th

            case "qo":
              return match.ordinalNumber(string, {
                unit: "quarter",
              });
            // Q1, Q2, Q3, Q4

            case "qqq":
              return (
                match.quarter(string, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.quarter(string, {
                  width: "narrow",
                  context: "standalone",
                })
              );
            // 1, 2, 3, 4 (narrow quarter; could be not numerical)

            case "qqqqq":
              return match.quarter(string, {
                width: "narrow",
                context: "standalone",
              });
            // 1st quarter, 2nd quarter, ...

            case "qqqq":
            default:
              return (
                match.quarter(string, {
                  width: "wide",
                  context: "standalone",
                }) ||
                match.quarter(string, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.quarter(string, {
                  width: "narrow",
                  context: "standalone",
                })
              );
          }
        },
        validate: function (_date, value, _options) {
          return value >= 1 && value <= 4;
        },
        set: function (date, _flags, value, _options) {
          date.setUTCMonth((value - 1) * 3, 1);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: [
          "Y",
          "R",
          "Q",
          "M",
          "L",
          "w",
          "I",
          "d",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ],
      },
      // Month
      M: {
        priority: 110,
        parse: function (string, token, match, _options) {
          var valueCallback = function (value) {
            return value - 1;
          };

          switch (token) {
            // 1, 2, ..., 12
            case "M":
              return parseNumericPattern(
                numericPatterns.month,
                string,
                valueCallback
              );
            // 01, 02, ..., 12

            case "MM":
              return parseNDigits(2, string, valueCallback);
            // 1st, 2nd, ..., 12th

            case "Mo":
              return match.ordinalNumber(string, {
                unit: "month",
                valueCallback: valueCallback,
              });
            // Jan, Feb, ..., Dec

            case "MMM":
              return (
                match.month(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.month(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
            // J, F, ..., D

            case "MMMMM":
              return match.month(string, {
                width: "narrow",
                context: "formatting",
              });
            // January, February, ..., December

            case "MMMM":
            default:
              return (
                match.month(string, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.month(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.month(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        },
        validate: function (_date, value, _options) {
          return value >= 0 && value <= 11;
        },
        set: function (date, _flags, value, _options) {
          date.setUTCMonth(value, 1);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: [
          "Y",
          "R",
          "q",
          "Q",
          "L",
          "w",
          "I",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ],
      },
      // Stand-alone month
      L: {
        priority: 110,
        parse: function (string, token, match, _options) {
          var valueCallback = function (value) {
            return value - 1;
          };

          switch (token) {
            // 1, 2, ..., 12
            case "L":
              return parseNumericPattern(
                numericPatterns.month,
                string,
                valueCallback
              );
            // 01, 02, ..., 12

            case "LL":
              return parseNDigits(2, string, valueCallback);
            // 1st, 2nd, ..., 12th

            case "Lo":
              return match.ordinalNumber(string, {
                unit: "month",
                valueCallback: valueCallback,
              });
            // Jan, Feb, ..., Dec

            case "LLL":
              return (
                match.month(string, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.month(string, {
                  width: "narrow",
                  context: "standalone",
                })
              );
            // J, F, ..., D

            case "LLLLL":
              return match.month(string, {
                width: "narrow",
                context: "standalone",
              });
            // January, February, ..., December

            case "LLLL":
            default:
              return (
                match.month(string, {
                  width: "wide",
                  context: "standalone",
                }) ||
                match.month(string, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.month(string, {
                  width: "narrow",
                  context: "standalone",
                })
              );
          }
        },
        validate: function (_date, value, _options) {
          return value >= 0 && value <= 11;
        },
        set: function (date, _flags, value, _options) {
          date.setUTCMonth(value, 1);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: [
          "Y",
          "R",
          "q",
          "Q",
          "M",
          "w",
          "I",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ],
      },
      // Local week of year
      w: {
        priority: 100,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "w":
              return parseNumericPattern(numericPatterns.week, string);

            case "wo":
              return match.ordinalNumber(string, {
                unit: "week",
              });

            default:
              return parseNDigits(token.length, string);
          }
        },
        validate: function (_date, value, _options) {
          return value >= 1 && value <= 53;
        },
        set: function (date, _flags, value, options) {
          return (0, startOfUTCWeek /* default */.Z)(
            setUTCWeek(date, value, options),
            options
          );
        },
        incompatibleTokens: [
          "y",
          "R",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "i",
          "t",
          "T",
        ],
      },
      // ISO week of year
      I: {
        priority: 100,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "I":
              return parseNumericPattern(numericPatterns.week, string);

            case "Io":
              return match.ordinalNumber(string, {
                unit: "week",
              });

            default:
              return parseNDigits(token.length, string);
          }
        },
        validate: function (_date, value, _options) {
          return value >= 1 && value <= 53;
        },
        set: function (date, _flags, value, options) {
          return (0, startOfUTCISOWeek /* default */.Z)(
            setUTCISOWeek(date, value, options),
            options
          );
        },
        incompatibleTokens: [
          "y",
          "Y",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "w",
          "d",
          "D",
          "e",
          "c",
          "t",
          "T",
        ],
      },
      // Day of the month
      d: {
        priority: 90,
        subPriority: 1,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "d":
              return parseNumericPattern(numericPatterns.date, string);

            case "do":
              return match.ordinalNumber(string, {
                unit: "date",
              });

            default:
              return parseNDigits(token.length, string);
          }
        },
        validate: function (date, value, _options) {
          var year = date.getUTCFullYear();
          var isLeapYear = isLeapYearIndex(year);
          var month = date.getUTCMonth();

          if (isLeapYear) {
            return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
          } else {
            return value >= 1 && value <= DAYS_IN_MONTH[month];
          }
        },
        set: function (date, _flags, value, _options) {
          date.setUTCDate(value);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: [
          "Y",
          "R",
          "q",
          "Q",
          "w",
          "I",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ],
      },
      // Day of year
      D: {
        priority: 90,
        subPriority: 1,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "D":
            case "DD":
              return parseNumericPattern(numericPatterns.dayOfYear, string);

            case "Do":
              return match.ordinalNumber(string, {
                unit: "date",
              });

            default:
              return parseNDigits(token.length, string);
          }
        },
        validate: function (date, value, _options) {
          var year = date.getUTCFullYear();
          var isLeapYear = isLeapYearIndex(year);

          if (isLeapYear) {
            return value >= 1 && value <= 366;
          } else {
            return value >= 1 && value <= 365;
          }
        },
        set: function (date, _flags, value, _options) {
          date.setUTCMonth(0, value);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: [
          "Y",
          "R",
          "q",
          "Q",
          "M",
          "L",
          "w",
          "I",
          "d",
          "E",
          "i",
          "e",
          "c",
          "t",
          "T",
        ],
      },
      // Day of week
      E: {
        priority: 90,
        parse: function (string, token, match, _options) {
          switch (token) {
            // Tue
            case "E":
            case "EE":
            case "EEE":
              return (
                match.day(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
            // T

            case "EEEEE":
              return match.day(string, {
                width: "narrow",
                context: "formatting",
              });
            // Tu

            case "EEEEEE":
              return (
                match.day(string, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
            // Tuesday

            case "EEEE":
            default:
              return (
                match.day(string, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        },
        validate: function (_date, value, _options) {
          return value >= 0 && value <= 6;
        },
        set: function (date, _flags, value, options) {
          date = setUTCDay(date, value, options);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: ["D", "i", "e", "c", "t", "T"],
      },
      // Local day of week
      e: {
        priority: 90,
        parse: function (string, token, match, options) {
          var valueCallback = function (value) {
            var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
            return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
          };

          switch (token) {
            // 3
            case "e":
            case "ee":
              // 03
              return parseNDigits(token.length, string, valueCallback);
            // 3rd

            case "eo":
              return match.ordinalNumber(string, {
                unit: "day",
                valueCallback: valueCallback,
              });
            // Tue

            case "eee":
              return (
                match.day(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
            // T

            case "eeeee":
              return match.day(string, {
                width: "narrow",
                context: "formatting",
              });
            // Tu

            case "eeeeee":
              return (
                match.day(string, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
            // Tuesday

            case "eeee":
            default:
              return (
                match.day(string, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        },
        validate: function (_date, value, _options) {
          return value >= 0 && value <= 6;
        },
        set: function (date, _flags, value, options) {
          date = setUTCDay(date, value, options);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: [
          "y",
          "R",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "E",
          "i",
          "c",
          "t",
          "T",
        ],
      },
      // Stand-alone local day of week
      c: {
        priority: 90,
        parse: function (string, token, match, options) {
          var valueCallback = function (value) {
            var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
            return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
          };

          switch (token) {
            // 3
            case "c":
            case "cc":
              // 03
              return parseNDigits(token.length, string, valueCallback);
            // 3rd

            case "co":
              return match.ordinalNumber(string, {
                unit: "day",
                valueCallback: valueCallback,
              });
            // Tue

            case "ccc":
              return (
                match.day(string, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.day(string, {
                  width: "short",
                  context: "standalone",
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "standalone",
                })
              );
            // T

            case "ccccc":
              return match.day(string, {
                width: "narrow",
                context: "standalone",
              });
            // Tu

            case "cccccc":
              return (
                match.day(string, {
                  width: "short",
                  context: "standalone",
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "standalone",
                })
              );
            // Tuesday

            case "cccc":
            default:
              return (
                match.day(string, {
                  width: "wide",
                  context: "standalone",
                }) ||
                match.day(string, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.day(string, {
                  width: "short",
                  context: "standalone",
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "standalone",
                })
              );
          }
        },
        validate: function (_date, value, _options) {
          return value >= 0 && value <= 6;
        },
        set: function (date, _flags, value, options) {
          date = setUTCDay(date, value, options);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: [
          "y",
          "R",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "E",
          "i",
          "e",
          "t",
          "T",
        ],
      },
      // ISO day of week
      i: {
        priority: 90,
        parse: function (string, token, match, _options) {
          var valueCallback = function (value) {
            if (value === 0) {
              return 7;
            }

            return value;
          };

          switch (token) {
            // 2
            case "i":
            case "ii":
              // 02
              return parseNDigits(token.length, string);
            // 2nd

            case "io":
              return match.ordinalNumber(string, {
                unit: "day",
              });
            // Tue

            case "iii":
              return (
                match.day(string, {
                  width: "abbreviated",
                  context: "formatting",
                  valueCallback: valueCallback,
                }) ||
                match.day(string, {
                  width: "short",
                  context: "formatting",
                  valueCallback: valueCallback,
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: valueCallback,
                })
              );
            // T

            case "iiiii":
              return match.day(string, {
                width: "narrow",
                context: "formatting",
                valueCallback: valueCallback,
              });
            // Tu

            case "iiiiii":
              return (
                match.day(string, {
                  width: "short",
                  context: "formatting",
                  valueCallback: valueCallback,
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: valueCallback,
                })
              );
            // Tuesday

            case "iiii":
            default:
              return (
                match.day(string, {
                  width: "wide",
                  context: "formatting",
                  valueCallback: valueCallback,
                }) ||
                match.day(string, {
                  width: "abbreviated",
                  context: "formatting",
                  valueCallback: valueCallback,
                }) ||
                match.day(string, {
                  width: "short",
                  context: "formatting",
                  valueCallback: valueCallback,
                }) ||
                match.day(string, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: valueCallback,
                })
              );
          }
        },
        validate: function (_date, value, _options) {
          return value >= 1 && value <= 7;
        },
        set: function (date, _flags, value, options) {
          date = setUTCISODay(date, value, options);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        },
        incompatibleTokens: [
          "y",
          "Y",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "w",
          "d",
          "D",
          "E",
          "e",
          "c",
          "t",
          "T",
        ],
      },
      // AM or PM
      a: {
        priority: 80,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "a":
            case "aa":
            case "aaa":
              return (
                match.dayPeriod(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            case "aaaaa":
              return match.dayPeriod(string, {
                width: "narrow",
                context: "formatting",
              });

            case "aaaa":
            default:
              return (
                match.dayPeriod(string, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.dayPeriod(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        },
        set: function (date, _flags, value, _options) {
          date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
          return date;
        },
        incompatibleTokens: ["b", "B", "H", "K", "k", "t", "T"],
      },
      // AM, PM, midnight
      b: {
        priority: 80,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "b":
            case "bb":
            case "bbb":
              return (
                match.dayPeriod(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            case "bbbbb":
              return match.dayPeriod(string, {
                width: "narrow",
                context: "formatting",
              });

            case "bbbb":
            default:
              return (
                match.dayPeriod(string, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.dayPeriod(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        },
        set: function (date, _flags, value, _options) {
          date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
          return date;
        },
        incompatibleTokens: ["a", "B", "H", "K", "k", "t", "T"],
      },
      // in the morning, in the afternoon, in the evening, at night
      B: {
        priority: 80,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "B":
            case "BB":
            case "BBB":
              return (
                match.dayPeriod(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            case "BBBBB":
              return match.dayPeriod(string, {
                width: "narrow",
                context: "formatting",
              });

            case "BBBB":
            default:
              return (
                match.dayPeriod(string, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.dayPeriod(string, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(string, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        },
        set: function (date, _flags, value, _options) {
          date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
          return date;
        },
        incompatibleTokens: ["a", "b", "t", "T"],
      },
      // Hour [1-12]
      h: {
        priority: 70,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "h":
              return parseNumericPattern(numericPatterns.hour12h, string);

            case "ho":
              return match.ordinalNumber(string, {
                unit: "hour",
              });

            default:
              return parseNDigits(token.length, string);
          }
        },
        validate: function (_date, value, _options) {
          return value >= 1 && value <= 12;
        },
        set: function (date, _flags, value, _options) {
          var isPM = date.getUTCHours() >= 12;

          if (isPM && value < 12) {
            date.setUTCHours(value + 12, 0, 0, 0);
          } else if (!isPM && value === 12) {
            date.setUTCHours(0, 0, 0, 0);
          } else {
            date.setUTCHours(value, 0, 0, 0);
          }

          return date;
        },
        incompatibleTokens: ["H", "K", "k", "t", "T"],
      },
      // Hour [0-23]
      H: {
        priority: 70,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "H":
              return parseNumericPattern(numericPatterns.hour23h, string);

            case "Ho":
              return match.ordinalNumber(string, {
                unit: "hour",
              });

            default:
              return parseNDigits(token.length, string);
          }
        },
        validate: function (_date, value, _options) {
          return value >= 0 && value <= 23;
        },
        set: function (date, _flags, value, _options) {
          date.setUTCHours(value, 0, 0, 0);
          return date;
        },
        incompatibleTokens: ["a", "b", "h", "K", "k", "t", "T"],
      },
      // Hour [0-11]
      K: {
        priority: 70,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "K":
              return parseNumericPattern(numericPatterns.hour11h, string);

            case "Ko":
              return match.ordinalNumber(string, {
                unit: "hour",
              });

            default:
              return parseNDigits(token.length, string);
          }
        },
        validate: function (_date, value, _options) {
          return value >= 0 && value <= 11;
        },
        set: function (date, _flags, value, _options) {
          var isPM = date.getUTCHours() >= 12;

          if (isPM && value < 12) {
            date.setUTCHours(value + 12, 0, 0, 0);
          } else {
            date.setUTCHours(value, 0, 0, 0);
          }

          return date;
        },
        incompatibleTokens: ["a", "b", "h", "H", "k", "t", "T"],
      },
      // Hour [1-24]
      k: {
        priority: 70,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "k":
              return parseNumericPattern(numericPatterns.hour24h, string);

            case "ko":
              return match.ordinalNumber(string, {
                unit: "hour",
              });

            default:
              return parseNDigits(token.length, string);
          }
        },
        validate: function (_date, value, _options) {
          return value >= 1 && value <= 24;
        },
        set: function (date, _flags, value, _options) {
          var hours = value <= 24 ? value % 24 : value;
          date.setUTCHours(hours, 0, 0, 0);
          return date;
        },
        incompatibleTokens: ["a", "b", "h", "H", "K", "t", "T"],
      },
      // Minute
      m: {
        priority: 60,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "m":
              return parseNumericPattern(numericPatterns.minute, string);

            case "mo":
              return match.ordinalNumber(string, {
                unit: "minute",
              });

            default:
              return parseNDigits(token.length, string);
          }
        },
        validate: function (_date, value, _options) {
          return value >= 0 && value <= 59;
        },
        set: function (date, _flags, value, _options) {
          date.setUTCMinutes(value, 0, 0);
          return date;
        },
        incompatibleTokens: ["t", "T"],
      },
      // Second
      s: {
        priority: 50,
        parse: function (string, token, match, _options) {
          switch (token) {
            case "s":
              return parseNumericPattern(numericPatterns.second, string);

            case "so":
              return match.ordinalNumber(string, {
                unit: "second",
              });

            default:
              return parseNDigits(token.length, string);
          }
        },
        validate: function (_date, value, _options) {
          return value >= 0 && value <= 59;
        },
        set: function (date, _flags, value, _options) {
          date.setUTCSeconds(value, 0);
          return date;
        },
        incompatibleTokens: ["t", "T"],
      },
      // Fraction of second
      S: {
        priority: 30,
        parse: function (string, token, _match, _options) {
          var valueCallback = function (value) {
            return Math.floor(value * Math.pow(10, -token.length + 3));
          };

          return parseNDigits(token.length, string, valueCallback);
        },
        set: function (date, _flags, value, _options) {
          date.setUTCMilliseconds(value);
          return date;
        },
        incompatibleTokens: ["t", "T"],
      },
      // Timezone (ISO-8601. +00:00 is `'Z'`)
      X: {
        priority: 10,
        parse: function (string, token, _match, _options) {
          switch (token) {
            case "X":
              return parseTimezonePattern(
                timezonePatterns.basicOptionalMinutes,
                string
              );

            case "XX":
              return parseTimezonePattern(timezonePatterns.basic, string);

            case "XXXX":
              return parseTimezonePattern(
                timezonePatterns.basicOptionalSeconds,
                string
              );

            case "XXXXX":
              return parseTimezonePattern(
                timezonePatterns.extendedOptionalSeconds,
                string
              );

            case "XXX":
            default:
              return parseTimezonePattern(timezonePatterns.extended, string);
          }
        },
        set: function (date, flags, value, _options) {
          if (flags.timestampIsSet) {
            return date;
          }

          return new Date(date.getTime() - value);
        },
        incompatibleTokens: ["t", "T", "x"],
      },
      // Timezone (ISO-8601)
      x: {
        priority: 10,
        parse: function (string, token, _match, _options) {
          switch (token) {
            case "x":
              return parseTimezonePattern(
                timezonePatterns.basicOptionalMinutes,
                string
              );

            case "xx":
              return parseTimezonePattern(timezonePatterns.basic, string);

            case "xxxx":
              return parseTimezonePattern(
                timezonePatterns.basicOptionalSeconds,
                string
              );

            case "xxxxx":
              return parseTimezonePattern(
                timezonePatterns.extendedOptionalSeconds,
                string
              );

            case "xxx":
            default:
              return parseTimezonePattern(timezonePatterns.extended, string);
          }
        },
        set: function (date, flags, value, _options) {
          if (flags.timestampIsSet) {
            return date;
          }

          return new Date(date.getTime() - value);
        },
        incompatibleTokens: ["t", "T", "X"],
      },
      // Seconds timestamp
      t: {
        priority: 40,
        parse: function (string, _token, _match, _options) {
          return parseAnyDigitsSigned(string);
        },
        set: function (_date, _flags, value, _options) {
          return [
            new Date(value * 1000),
            {
              timestampIsSet: true,
            },
          ];
        },
        incompatibleTokens: "*",
      },
      // Milliseconds timestamp
      T: {
        priority: 20,
        parse: function (string, _token, _match, _options) {
          return parseAnyDigitsSigned(string);
        },
        set: function (_date, _flags, value, _options) {
          return [
            new Date(value),
            {
              timestampIsSet: true,
            },
          ];
        },
        incompatibleTokens: "*",
      },
    };
    /* harmony default export */ const _lib_parsers = parsers; // CONCATENATED MODULE: ./node_modules/date-fns/esm/parse/index.js
    var TIMEZONE_UNIT_PRIORITY = 10; // This RegExp consists of three parts separated by `|`:
    // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
    //   (one of the certain letters followed by `o`)
    // - (\w)\1* matches any sequences of the same letter
    // - '' matches two quote characters in a row
    // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
    //   except a single quote symbol, which ends the sequence.
    //   Two quote characters do not end the sequence.
    //   If there is no matching single quote
    //   then the sequence will continue until the end of the string.
    // - . matches any single character unmatched by previous parts of the RegExps

    var formattingTokensRegExp =
      /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
    // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

    var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    var escapedStringRegExp = /^'([^]*?)'?$/;
    var doubleQuoteRegExp = /''/g;
    var notWhitespaceRegExp = /\S/;
    var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
    /**
     * @name parse
     * @category Common Helpers
     * @summary Parse the date.
     *
     * @description
     * Return the date parsed from string using the given format string.
     *
     * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
     * > See: https://git.io/fxCyr
     *
     * The characters in the format string wrapped between two single quotes characters (') are escaped.
     * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
     *
     * Format of the format string is based on Unicode Technical Standard #35:
     * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * with a few additions (see note 5 below the table).
     *
     * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
     * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
     *
     * ```javascript
     * parse('23 AM', 'HH a', new Date())
     * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
     * ```
     *
     * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
     *
     * Accepted format string patterns:
     * | Unit                            |Prior| Pattern | Result examples                   | Notes |
     * |---------------------------------|-----|---------|-----------------------------------|-------|
     * | Era                             | 140 | G..GGG  | AD, BC                            |       |
     * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
     * |                                 |     | GGGGG   | A, B                              |       |
     * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
     * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
     * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
     * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
     * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
     * |                                 |     | yyyyy   | ...                               | 2,4   |
     * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
     * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
     * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
     * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
     * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
     * |                                 |     | YYYYY   | ...                               | 2,4   |
     * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
     * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
     * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
     * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
     * |                                 |     | RRRRR   | ...                               | 2,4,5 |
     * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
     * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
     * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
     * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
     * |                                 |     | uuuuu   | ...                               | 2,4   |
     * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
     * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
     * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
     * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
     * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
     * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
     * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
     * |                                 |     | qq      | 01, 02, 03, 04                    |       |
     * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
     * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
     * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
     * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
     * |                                 |     | MM      | 01, 02, ..., 12                   |       |
     * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
     * |                                 |     | MMMM    | January, February, ..., December  | 2     |
     * |                                 |     | MMMMM   | J, F, ..., D                      |       |
     * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
     * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
     * |                                 |     | LL      | 01, 02, ..., 12                   |       |
     * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
     * |                                 |     | LLLL    | January, February, ..., December  | 2     |
     * |                                 |     | LLLLL   | J, F, ..., D                      |       |
     * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
     * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
     * |                                 |     | ww      | 01, 02, ..., 53                   |       |
     * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
     * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
     * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
     * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
     * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
     * |                                 |     | dd      | 01, 02, ..., 31                   |       |
     * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
     * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
     * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
     * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
     * |                                 |     | DDDD    | ...                               | 2     |
     * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
     * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
     * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
     * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
     * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
     * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
     * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
     * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
     * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
     * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
     * |                                 |     | ee      | 02, 03, ..., 01                   |       |
     * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
     * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
     * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
     * |                                 |     | cc      | 02, 03, ..., 01                   |       |
     * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
     * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
     * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
     * |                                 |     | aaaaa   | a, p                              |       |
     * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
     * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
     * |                                 |     | bbbbb   | a, p, n, mi                       |       |
     * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
     * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
     * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
     * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
     * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
     * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
     * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
     * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
     * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
     * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
     * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
     * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
     * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
     * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
     * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
     * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
     * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
     * |                                 |     | mm      | 00, 01, ..., 59                   |       |
     * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
     * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
     * |                                 |     | ss      | 00, 01, ..., 59                   |       |
     * | Seconds timestamp               |  40 | t       | 512969520                         |       |
     * |                                 |     | tt      | ...                               | 2     |
     * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
     * |                                 |     | SS      | 00, 01, ..., 99                   |       |
     * |                                 |     | SSS     | 000, 0001, ..., 999               |       |
     * |                                 |     | SSSS    | ...                               | 2     |
     * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
     * |                                 |     | TT      | ...                               | 2     |
     * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
     * |                                 |     | XX      | -0800, +0530, Z                   |       |
     * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
     * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
     * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
     * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
     * |                                 |     | xx      | -0800, +0530, +0000               |       |
     * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
     * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
     * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
     * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
     * |                                 |     | PP      | May 29, 1453                      |       |
     * |                                 |     | PPP     | May 29th, 1453                    |       |
     * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
     * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
     * |                                 |     | pp      | 12:00:00 AM                       |       |
     * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
     * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
     * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
     * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
     * Notes:
     * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
     *    are the same as "stand-alone" units, but are different in some languages.
     *    "Formatting" units are declined according to the rules of the language
     *    in the context of a date. "Stand-alone" units are always nominative singular.
     *    In `format` function, they will produce different result:
     *
     *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
     *
     *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
     *
     *    `parse` will try to match both formatting and stand-alone units interchangably.
     *
     * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
     *    the single quote characters (see below).
     *    If the sequence is longer than listed in table:
     *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
     *      as wide as the sequence
     *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
     *      These variations are marked with "2" in the last column of the table.
     *
     * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
     *    These tokens represent the shortest form of the quarter.
     *
     * 4. The main difference between `y` and `u` patterns are B.C. years:
     *
     *    | Year | `y` | `u` |
     *    |------|-----|-----|
     *    | AC 1 |   1 |   1 |
     *    | BC 1 |   1 |   0 |
     *    | BC 2 |   2 |  -1 |
     *
     *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
     *
     *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
     *
     *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
     *
     *    while `uu` will just assign the year as is:
     *
     *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
     *
     *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
     *
     *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
     *    except local week-numbering years are dependent on `options.weekStartsOn`
     *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
     *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
     *
     * 5. These patterns are not in the Unicode Technical Standard #35:
     *    - `i`: ISO day of week
     *    - `I`: ISO week of year
     *    - `R`: ISO week-numbering year
     *    - `o`: ordinal number modifier
     *    - `P`: long localized date
     *    - `p`: long localized time
     *
     * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
     *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
     *
     * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
     *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
     *
     * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
     *    on the given locale.
     *
     *    using `en-US` locale: `P` => `MM/dd/yyyy`
     *    using `en-US` locale: `p` => `hh:mm a`
     *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
     *    using `pt-BR` locale: `p` => `HH:mm`
     *
     * Values will be assigned to the date in the descending order of its unit's priority.
     * Units of an equal priority overwrite each other in the order of appearance.
     *
     * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
     * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
     *
     * `referenceDate` must be passed for correct work of the function.
     * If you're not sure which `referenceDate` to supply, create a new instance of Date:
     * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
     * In this case parsing will be done in the context of the current date.
     * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
     * then `Invalid Date` will be returned.
     *
     * The result may vary by locale.
     *
     * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
     *
     * If parsing failed, `Invalid Date` will be returned.
     * Invalid Date is a Date, whose time value is NaN.
     * Time value of Date: http://es5.github.io/#x15.9.1.1
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * - Old `parse` was renamed to `toDate`.
     *   Now `parse` is a new function which parses a string using a provided format.
     *
     *   ```javascript
     *   // Before v2.0.0
     *   parse('2016-01-01')
     *
     *   // v2.0.0 onward (toDate no longer accepts a string)
     *   toDate(1392098430000) // Unix to timestamp
     *   toDate(new Date(2014, 1, 11, 11, 30, 30)) // Cloning the date
     *   parse('2016-01-01', 'yyyy-MM-dd', new Date())
     *   ```
     *
     * @param {String} dateString - the string to parse
     * @param {String} formatString - the string of tokens
     * @param {Date|Number} referenceDate - defines values missing from the parsed dateString
     * @param {Object} [options] - an object with options.
     * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
     * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
     * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
     * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
     *   see: https://git.io/fxCyr
     * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
     *   see: https://git.io/fxCyr
     * @returns {Date} the parsed date
     * @throws {TypeError} 3 arguments required
     * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
     * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
     * @throws {RangeError} `options.locale` must contain `match` property
     * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
     * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
     * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
     * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
     * @throws {RangeError} format string contains an unescaped latin alphabet character
     *
     * @example
     * // Parse 11 February 2014 from middle-endian format:
     * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
     * //=> Tue Feb 11 2014 00:00:00
     *
     * @example
     * // Parse 28th of February in Esperanto locale in the context of 2010 year:
     * import eo from 'date-fns/locale/eo'
     * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
     *   locale: eo
     * })
     * //=> Sun Feb 28 2010 00:00:00
     */

    function parse(
      dirtyDateString,
      dirtyFormatString,
      dirtyReferenceDate,
      dirtyOptions
    ) {
      (0, requiredArgs /* default */.Z)(3, arguments);
      var dateString = String(dirtyDateString);
      var formatString = String(dirtyFormatString);
      var options = dirtyOptions || {};
      var locale = options.locale || en_US /* default */.Z;

      if (!locale.match) {
        throw new RangeError("locale must contain match property");
      }

      var localeFirstWeekContainsDate =
        locale.options && locale.options.firstWeekContainsDate;
      var defaultFirstWeekContainsDate =
        localeFirstWeekContainsDate == null
          ? 1
          : (0, toInteger /* default */.Z)(localeFirstWeekContainsDate);
      var firstWeekContainsDate =
        options.firstWeekContainsDate == null
          ? defaultFirstWeekContainsDate
          : (0, toInteger /* default */.Z)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError(
          "firstWeekContainsDate must be between 1 and 7 inclusively"
        );
      }

      var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;
      var defaultWeekStartsOn =
        localeWeekStartsOn == null
          ? 0
          : (0, toInteger /* default */.Z)(localeWeekStartsOn);
      var weekStartsOn =
        options.weekStartsOn == null
          ? defaultWeekStartsOn
          : (0, toInteger /* default */.Z)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError(
          "weekStartsOn must be between 0 and 6 inclusively"
        );
      }

      if (formatString === "") {
        if (dateString === "") {
          return (0, toDate["default"])(dirtyReferenceDate);
        } else {
          return new Date(NaN);
        }
      }

      var subFnOptions = {
        firstWeekContainsDate: firstWeekContainsDate,
        weekStartsOn: weekStartsOn,
        locale: locale,
      }; // If timezone isn't specified, it will be set to the system timezone

      var setters = [
        {
          priority: TIMEZONE_UNIT_PRIORITY,
          subPriority: -1,
          set: dateToSystemTimezone,
          index: 0,
        },
      ];
      var i;
      var tokens = formatString
        .match(longFormattingTokensRegExp)
        .map(function (substring) {
          var firstCharacter = substring[0];

          if (firstCharacter === "p" || firstCharacter === "P") {
            var longFormatter = longFormatters /* default */.Z[firstCharacter];
            return longFormatter(substring, locale.formatLong, subFnOptions);
          }

          return substring;
        })
        .join("")
        .match(formattingTokensRegExp);
      var usedTokens = [];

      for (i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (
          !options.useAdditionalWeekYearTokens &&
          (0, protectedTokens /* isProtectedWeekYearToken */.Do)(token)
        ) {
          (0, protectedTokens /* throwProtectedError */.qp)(
            token,
            formatString,
            dirtyDateString
          );
        }

        if (
          !options.useAdditionalDayOfYearTokens &&
          (0, protectedTokens /* isProtectedDayOfYearToken */.Iu)(token)
        ) {
          (0, protectedTokens /* throwProtectedError */.qp)(
            token,
            formatString,
            dirtyDateString
          );
        }

        var firstCharacter = token[0];
        var parser = _lib_parsers[firstCharacter];

        if (parser) {
          var incompatibleTokens = parser.incompatibleTokens;

          if (Array.isArray(incompatibleTokens)) {
            var incompatibleToken = void 0;

            for (var _i = 0; _i < usedTokens.length; _i++) {
              var usedToken = usedTokens[_i].token;

              if (
                incompatibleTokens.indexOf(usedToken) !== -1 ||
                usedToken === firstCharacter
              ) {
                incompatibleToken = usedTokens[_i];
                break;
              }
            }

            if (incompatibleToken) {
              throw new RangeError(
                "The format string mustn't contain `"
                  .concat(incompatibleToken.fullToken, "` and `")
                  .concat(token, "` at the same time")
              );
            }
          } else if (parser.incompatibleTokens === "*" && usedTokens.length) {
            throw new RangeError(
              "The format string mustn't contain `".concat(
                token,
                "` and any other token at the same time"
              )
            );
          }

          usedTokens.push({
            token: firstCharacter,
            fullToken: token,
          });
          var parseResult = parser.parse(
            dateString,
            token,
            locale.match,
            subFnOptions
          );

          if (!parseResult) {
            return new Date(NaN);
          }

          setters.push({
            priority: parser.priority,
            subPriority: parser.subPriority || 0,
            set: parser.set,
            validate: parser.validate,
            value: parseResult.value,
            index: setters.length,
          });
          dateString = parseResult.rest;
        } else {
          if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
            throw new RangeError(
              "Format string contains an unescaped latin alphabet character `" +
                firstCharacter +
                "`"
            );
          } // Replace two single quote characters with one single quote character

          if (token === "''") {
            token = "'";
          } else if (firstCharacter === "'") {
            token = cleanEscapedString(token);
          } // Cut token from string, or, if string doesn't match the token, return Invalid Date

          if (dateString.indexOf(token) === 0) {
            dateString = dateString.slice(token.length);
          } else {
            return new Date(NaN);
          }
        }
      } // Check if the remaining input contains something other than whitespace

      if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
        return new Date(NaN);
      }

      var uniquePrioritySetters = setters
        .map(function (setter) {
          return setter.priority;
        })
        .sort(function (a, b) {
          return b - a;
        })
        .filter(function (priority, index, array) {
          return array.indexOf(priority) === index;
        })
        .map(function (priority) {
          return setters
            .filter(function (setter) {
              return setter.priority === priority;
            })
            .sort(function (a, b) {
              return b.subPriority - a.subPriority;
            });
        })
        .map(function (setterArray) {
          return setterArray[0];
        });
      var date = (0, toDate["default"])(dirtyReferenceDate);

      if (isNaN(date)) {
        return new Date(NaN);
      } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
      // This ensures that when UTC functions will be implemented, locales will be compatible with them.
      // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37

      var utcDate = (0, subMilliseconds /* default */.Z)(
        date,
        (0, getTimezoneOffsetInMilliseconds /* default */.Z)(date)
      );
      var flags = {};

      for (i = 0; i < uniquePrioritySetters.length; i++) {
        var setter = uniquePrioritySetters[i];

        if (
          setter.validate &&
          !setter.validate(utcDate, setter.value, subFnOptions)
        ) {
          return new Date(NaN);
        }

        var result = setter.set(utcDate, flags, setter.value, subFnOptions); // Result is tuple (date, flags)

        if (result[0]) {
          utcDate = result[0];
          assign_assign(flags, result[1]); // Result is date
        } else {
          utcDate = result;
        }
      }

      return utcDate;
    }

    function dateToSystemTimezone(date, flags) {
      if (flags.timestampIsSet) {
        return date;
      }

      var convertedDate = new Date(0);
      convertedDate.setFullYear(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      );
      convertedDate.setHours(
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
      );
      return convertedDate;
    }

    function cleanEscapedString(input) {
      return input
        .match(escapedStringRegExp)[1]
        .replace(doubleQuoteRegExp, "'");
    }

    /***/
  },

  /***/ 23855: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ parseISO,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    var MILLISECONDS_IN_HOUR = 3600000;
    var MILLISECONDS_IN_MINUTE = 60000;
    var DEFAULT_ADDITIONAL_DIGITS = 2;
    var patterns = {
      dateTimeDelimiter: /[T ]/,
      timeZoneDelimiter: /[Z ]/i,
      timezone: /([Z+-].*)$/,
    };
    var dateRegex =
      /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
    var timeRegex =
      /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
    var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
    /**
     * @name parseISO
     * @category Common Helpers
     * @summary Parse ISO string
     *
     * @description
     * Parse the given string in ISO 8601 format and return an instance of Date.
     *
     * Function accepts complete ISO 8601 formats as well as partial implementations.
     * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
     *
     * If the argument isn't a string, the function cannot parse the string or
     * the values are invalid, it returns Invalid Date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * - The previous `parse` implementation was renamed to `parseISO`.
     *
     *   ```javascript
     *   // Before v2.0.0
     *   parse('2016-01-01')
     *
     *   // v2.0.0 onward
     *   parseISO('2016-01-01')
     *   ```
     *
     * - `parseISO` now validates separate date and time values in ISO-8601 strings
     *   and returns `Invalid Date` if the date is invalid.
     *
     *   ```javascript
     *   parseISO('2018-13-32')
     *   //=> Invalid Date
     *   ```
     *
     * - `parseISO` now doesn't fall back to `new Date` constructor
     *   if it fails to parse a string argument. Instead, it returns `Invalid Date`.
     *
     * @param {String} argument - the value to convert
     * @param {Object} [options] - an object with options.
     * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
     * @returns {Date} the parsed date in the local time zone
     * @throws {TypeError} 1 argument required
     * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
     *
     * @example
     * // Convert string '2014-02-11T11:30:30' to date:
     * var result = parseISO('2014-02-11T11:30:30')
     * //=> Tue Feb 11 2014 11:30:30
     *
     * @example
     * // Convert string '+02014101' to date,
     * // if the additional number of digits in the extended year format is 1:
     * var result = parseISO('+02014101', { additionalDigits: 1 })
     * //=> Fri Apr 11 2014 00:00:00
     */

    function parseISO(argument, dirtyOptions) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var options = dirtyOptions || {};
      var additionalDigits =
        options.additionalDigits == null
          ? DEFAULT_ADDITIONAL_DIGITS
          : (0,
            _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
              options.additionalDigits
            );

      if (
        additionalDigits !== 2 &&
        additionalDigits !== 1 &&
        additionalDigits !== 0
      ) {
        throw new RangeError("additionalDigits must be 0, 1 or 2");
      }

      if (
        !(
          typeof argument === "string" ||
          Object.prototype.toString.call(argument) === "[object String]"
        )
      ) {
        return new Date(NaN);
      }

      var dateStrings = splitDateString(argument);
      var date;

      if (dateStrings.date) {
        var parseYearResult = parseYear(dateStrings.date, additionalDigits);
        date = parseDate(parseYearResult.restDateString, parseYearResult.year);
      }

      if (isNaN(date) || !date) {
        return new Date(NaN);
      }

      var timestamp = date.getTime();
      var time = 0;
      var offset;

      if (dateStrings.time) {
        time = parseTime(dateStrings.time);

        if (isNaN(time) || time === null) {
          return new Date(NaN);
        }
      }

      if (dateStrings.timezone) {
        offset = parseTimezone(dateStrings.timezone);

        if (isNaN(offset)) {
          return new Date(NaN);
        }
      } else {
        var dirtyDate = new Date(timestamp + time); // js parsed string assuming it's in UTC timezone
        // but we need it to be parsed in our timezone
        // so we use utc values to build date in our timezone.
        // Year values from 0 to 99 map to the years 1900 to 1999
        // so set year explicitly with setFullYear.

        var result = new Date(0);
        result.setFullYear(
          dirtyDate.getUTCFullYear(),
          dirtyDate.getUTCMonth(),
          dirtyDate.getUTCDate()
        );
        result.setHours(
          dirtyDate.getUTCHours(),
          dirtyDate.getUTCMinutes(),
          dirtyDate.getUTCSeconds(),
          dirtyDate.getUTCMilliseconds()
        );
        return result;
      }

      return new Date(timestamp + time + offset);
    }

    function splitDateString(dateString) {
      var dateStrings = {};
      var array = dateString.split(patterns.dateTimeDelimiter);
      var timeString; // The regex match should only return at maximum two array elements.
      // [date], [time], or [date, time].

      if (array.length > 2) {
        return dateStrings;
      }

      if (/:/.test(array[0])) {
        dateStrings.date = null;
        timeString = array[0];
      } else {
        dateStrings.date = array[0];
        timeString = array[1];

        if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
          dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
          timeString = dateString.substr(
            dateStrings.date.length,
            dateString.length
          );
        }
      }

      if (timeString) {
        var token = patterns.timezone.exec(timeString);

        if (token) {
          dateStrings.time = timeString.replace(token[1], "");
          dateStrings.timezone = token[1];
        } else {
          dateStrings.time = timeString;
        }
      }

      return dateStrings;
    }

    function parseYear(dateString, additionalDigits) {
      var regex = new RegExp(
        "^(?:(\\d{4}|[+-]\\d{" +
          (4 + additionalDigits) +
          "})|(\\d{2}|[+-]\\d{" +
          (2 + additionalDigits) +
          "})$)"
      );
      var captures = dateString.match(regex); // Invalid ISO-formatted year

      if (!captures)
        return {
          year: null,
        };
      var year = captures[1] && parseInt(captures[1]);
      var century = captures[2] && parseInt(captures[2]);
      return {
        year: century == null ? year : century * 100,
        restDateString: dateString.slice((captures[1] || captures[2]).length),
      };
    }

    function parseDate(dateString, year) {
      // Invalid ISO-formatted year
      if (year === null) return null;
      var captures = dateString.match(dateRegex); // Invalid ISO-formatted string

      if (!captures) return null;
      var isWeekDate = !!captures[4];
      var dayOfYear = parseDateUnit(captures[1]);
      var month = parseDateUnit(captures[2]) - 1;
      var day = parseDateUnit(captures[3]);
      var week = parseDateUnit(captures[4]);
      var dayOfWeek = parseDateUnit(captures[5]) - 1;

      if (isWeekDate) {
        if (!validateWeekDate(year, week, dayOfWeek)) {
          return new Date(NaN);
        }

        return dayOfISOWeekYear(year, week, dayOfWeek);
      } else {
        var date = new Date(0);

        if (
          !validateDate(year, month, day) ||
          !validateDayOfYearDate(year, dayOfYear)
        ) {
          return new Date(NaN);
        }

        date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
        return date;
      }
    }

    function parseDateUnit(value) {
      return value ? parseInt(value) : 1;
    }

    function parseTime(timeString) {
      var captures = timeString.match(timeRegex);
      if (!captures) return null; // Invalid ISO-formatted time

      var hours = parseTimeUnit(captures[1]);
      var minutes = parseTimeUnit(captures[2]);
      var seconds = parseTimeUnit(captures[3]);

      if (!validateTime(hours, minutes, seconds)) {
        return NaN;
      }

      return (
        hours * MILLISECONDS_IN_HOUR +
        minutes * MILLISECONDS_IN_MINUTE +
        seconds * 1000
      );
    }

    function parseTimeUnit(value) {
      return (value && parseFloat(value.replace(",", "."))) || 0;
    }

    function parseTimezone(timezoneString) {
      if (timezoneString === "Z") return 0;
      var captures = timezoneString.match(timezoneRegex);
      if (!captures) return 0;
      var sign = captures[1] === "+" ? -1 : 1;
      var hours = parseInt(captures[2]);
      var minutes = (captures[3] && parseInt(captures[3])) || 0;

      if (!validateTimezone(hours, minutes)) {
        return NaN;
      }

      return (
        sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE)
      );
    }

    function dayOfISOWeekYear(isoWeekYear, week, day) {
      var date = new Date(0);
      date.setUTCFullYear(isoWeekYear, 0, 4);
      var fourthOfJanuaryDay = date.getUTCDay() || 7;
      var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
      date.setUTCDate(date.getUTCDate() + diff);
      return date;
    } // Validation functions
    // February is null to handle the leap year (using ||)

    var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function isLeapYearIndex(year) {
      return year % 400 === 0 || (year % 4 === 0 && year % 100);
    }

    function validateDate(year, month, date) {
      return (
        month >= 0 &&
        month <= 11 &&
        date >= 1 &&
        date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28))
      );
    }

    function validateDayOfYearDate(year, dayOfYear) {
      return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
    }

    function validateWeekDate(_year, week, day) {
      return week >= 1 && week <= 53 && day >= 0 && day <= 6;
    }

    function validateTime(hours, minutes, seconds) {
      if (hours === 24) {
        return minutes === 0 && seconds === 0;
      }

      return (
        seconds >= 0 &&
        seconds < 60 &&
        minutes >= 0 &&
        minutes < 60 &&
        hours >= 0 &&
        hours < 25
      );
    }

    function validateTimezone(_hours, minutes) {
      return minutes >= 0 && minutes <= 59;
    }

    /***/
  },

  /***/ 37042: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ setHours,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(83946);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name setHours
     * @category Hour Helpers
     * @summary Set the hours to the given date.
     *
     * @description
     * Set the hours to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} hours - the hours of the new date
     * @returns {Date} the new date with the hours set
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Set 4 hours to 1 September 2014 11:30:00:
     * var result = setHours(new Date(2014, 8, 1, 11, 30), 4)
     * //=> Mon Sep 01 2014 04:30:00
     */

    function setHours(dirtyDate, dirtyHours) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var hours = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtyHours
      );
      date.setHours(hours);
      return date;
    }

    /***/
  },

  /***/ 4543: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ setMinutes,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(83946);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name setMinutes
     * @category Minute Helpers
     * @summary Set the minutes to the given date.
     *
     * @description
     * Set the minutes to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} minutes - the minutes of the new date
     * @returns {Date} the new date with the minutes set
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Set 45 minutes to 1 September 2014 11:30:40:
     * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
     * //=> Mon Sep 01 2014 11:45:40
     */

    function setMinutes(dirtyDate, dirtyMinutes) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var minutes = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtyMinutes
      );
      date.setMinutes(minutes);
      return date;
    }

    /***/
  },

  /***/ 16218: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    // ESM COMPAT FLAG
    __webpack_require__.r(__webpack_exports__);

    // EXPORTS
    __webpack_require__.d(__webpack_exports__, {
      default: () => /* binding */ setMonth,
    });

    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/toInteger/index.js
    var toInteger = __webpack_require__(83946);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/toDate/index.js
    var toDate = __webpack_require__(19013);
    // EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/requiredArgs/index.js
    var requiredArgs = __webpack_require__(13882); // CONCATENATED MODULE: ./node_modules/date-fns/esm/getDaysInMonth/index.js
    /**
     * @name getDaysInMonth
     * @category Month Helpers
     * @summary Get the number of days in a month of the given date.
     *
     * @description
     * Get the number of days in a month of the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the given date
     * @returns {Number} the number of days in a month
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // How many days are in February 2000?
     * const result = getDaysInMonth(new Date(2000, 1))
     * //=> 29
     */

    function getDaysInMonth(dirtyDate) {
      (0, requiredArgs /* default */.Z)(1, arguments);
      var date = (0, toDate["default"])(dirtyDate);
      var year = date.getFullYear();
      var monthIndex = date.getMonth();
      var lastDayOfMonth = new Date(0);
      lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
      lastDayOfMonth.setHours(0, 0, 0, 0);
      return lastDayOfMonth.getDate();
    } // CONCATENATED MODULE: ./node_modules/date-fns/esm/setMonth/index.js
    /**
     * @name setMonth
     * @category Month Helpers
     * @summary Set the month to the given date.
     *
     * @description
     * Set the month to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} month - the month of the new date
     * @returns {Date} the new date with the month set
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Set February to 1 September 2014:
     * const result = setMonth(new Date(2014, 8, 1), 1)
     * //=> Sat Feb 01 2014 00:00:00
     */

    function setMonth(dirtyDate, dirtyMonth) {
      (0, requiredArgs /* default */.Z)(2, arguments);
      var date = (0, toDate["default"])(dirtyDate);
      var month = (0, toInteger /* default */.Z)(dirtyMonth);
      var year = date.getFullYear();
      var day = date.getDate();
      var dateWithDesiredMonth = new Date(0);
      dateWithDesiredMonth.setFullYear(year, month, 15);
      dateWithDesiredMonth.setHours(0, 0, 0, 0);
      var daysInMonth = getDaysInMonth(dateWithDesiredMonth); // Set the last day of the new month
      // if the original date was the last day of the longer month

      date.setMonth(month, Math.min(day, daysInMonth));
      return date;
    }

    /***/
  },

  /***/ 11503: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ setQuarter,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(83946);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _setMonth_index_js__WEBPACK_IMPORTED_MODULE_3__ =
      __webpack_require__(16218);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name setQuarter
     * @category Quarter Helpers
     * @summary Set the year quarter to the given date.
     *
     * @description
     * Set the year quarter to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} quarter - the quarter of the new date
     * @returns {Date} the new date with the quarter set
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Set the 2nd quarter to 2 July 2014:
     * const result = setQuarter(new Date(2014, 6, 2), 2)
     * //=> Wed Apr 02 2014 00:00:00
     */

    function setQuarter(dirtyDate, dirtyQuarter) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var quarter = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtyQuarter
      );
      var oldQuarter = Math.floor(date.getMonth() / 3) + 1;
      var diff = quarter - oldQuarter;
      return (0, _setMonth_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
        date,
        date.getMonth() + diff * 3
      );
    }

    /***/
  },

  /***/ 39880: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ setSeconds,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(83946);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name setSeconds
     * @category Second Helpers
     * @summary Set the seconds to the given date.
     *
     * @description
     * Set the seconds to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} seconds - the seconds of the new date
     * @returns {Date} the new date with the seconds set
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Set 45 seconds to 1 September 2014 11:30:40:
     * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
     * //=> Mon Sep 01 2014 11:30:45
     */

    function setSeconds(dirtyDate, dirtySeconds) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var seconds = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtySeconds
      );
      date.setSeconds(seconds);
      return date;
    }

    /***/
  },

  /***/ 44749: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ setYear,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(83946);
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name setYear
     * @category Year Helpers
     * @summary Set the year to the given date.
     *
     * @description
     * Set the year to the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} year - the year of the new date
     * @returns {Date} the new date with the year set
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Set year 2013 to 1 September 2014:
     * const result = setYear(new Date(2014, 8, 1), 2013)
     * //=> Sun Sep 01 2013 00:00:00
     */

    function setYear(dirtyDate, dirtyYear) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var year = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtyYear
      ); // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date

      if (isNaN(date.getTime())) {
        return new Date(NaN);
      }

      date.setFullYear(year);
      return date;
    }

    /***/
  },

  /***/ 69119: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ startOfDay,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name startOfDay
     * @category Day Helpers
     * @summary Return the start of a day for the given date.
     *
     * @description
     * Return the start of a day for the given date.
     * The result will be in the local timezone.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @returns {Date} the start of a day
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // The start of a day for 2 September 2014 11:55:00:
     * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Tue Sep 02 2014 00:00:00
     */

    function startOfDay(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      date.setHours(0, 0, 0, 0);
      return date;
    }

    /***/
  },

  /***/ 43703: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ startOfMonth,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name startOfMonth
     * @category Month Helpers
     * @summary Return the start of a month for the given date.
     *
     * @description
     * Return the start of a month for the given date.
     * The result will be in the local timezone.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @returns {Date} the start of a month
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // The start of a month for 2 September 2014 11:55:00:
     * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Mon Sep 01 2014 00:00:00
     */

    function startOfMonth(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    /***/
  },

  /***/ 94431: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ startOfQuarter,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name startOfQuarter
     * @category Quarter Helpers
     * @summary Return the start of a year quarter for the given date.
     *
     * @description
     * Return the start of a year quarter for the given date.
     * The result will be in the local timezone.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @returns {Date} the start of a quarter
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // The start of a quarter for 2 September 2014 11:55:00:
     * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Tue Jul 01 2014 00:00:00
     */

    function startOfQuarter(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
        dirtyDate
      );
      var currentMonth = date.getMonth();
      var month = currentMonth - (currentMonth % 3);
      date.setMonth(month, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    /***/
  },

  /***/ 584: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ startOfWeek,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name startOfWeek
     * @category Week Helpers
     * @summary Return the start of a week for the given date.
     *
     * @description
     * Return the start of a week for the given date.
     * The result will be in the local timezone.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @param {Object} [options] - an object with options.
     * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
     * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
     * @returns {Date} the start of a week
     * @throws {TypeError} 1 argument required
     * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
     *
     * @example
     * // The start of a week for 2 September 2014 11:55:00:
     * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Sun Aug 31 2014 00:00:00
     *
     * @example
     * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
     * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
     * //=> Mon Sep 01 2014 00:00:00
     */

    function startOfWeek(dirtyDate, dirtyOptions) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var options = dirtyOptions || {};
      var locale = options.locale;
      var localeWeekStartsOn =
        locale && locale.options && locale.options.weekStartsOn;
      var defaultWeekStartsOn =
        localeWeekStartsOn == null
          ? 0
          : (0,
            _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
              localeWeekStartsOn
            );
      var weekStartsOn =
        options.weekStartsOn == null
          ? defaultWeekStartsOn
          : (0,
            _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
              options.weekStartsOn
            ); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError(
          "weekStartsOn must be between 0 and 6 inclusively"
        );
      }

      var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate
      );
      var day = date.getDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setDate(date.getDate() - diff);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    /***/
  },

  /***/ 38148: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ startOfYear,
      /* harmony export */
    });
    /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(19013);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name startOfYear
     * @category Year Helpers
     * @summary Return the start of a year for the given date.
     *
     * @description
     * Return the start of a year for the given date.
     * The result will be in the local timezone.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @returns {Date} the start of a year
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // The start of a year for 2 September 2014 11:55:00:
     * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
     * //=> Wed Jan 01 2014 00:00:00
     */

    function startOfYear(dirtyDate) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var cleanDate = (0,
      _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
      var date = new Date(0);
      date.setFullYear(cleanDate.getFullYear(), 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    /***/
  },

  /***/ 7069: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ subDays,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addDays_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(77349);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name subDays
     * @category Day Helpers
     * @summary Subtract the specified number of days from the given date.
     *
     * @description
     * Subtract the specified number of days from the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the days subtracted
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Subtract 10 days from 1 September 2014:
     * const result = subDays(new Date(2014, 8, 1), 10)
     * //=> Fri Aug 22 2014 00:00:00
     */

    function subDays(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return (0, _addDays_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate,
        -amount
      );
    }

    /***/
  },

  /***/ 88330: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ subHours,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addHours_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(78343);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name subHours
     * @category Hour Helpers
     * @summary Subtract the specified number of hours from the given date.
     *
     * @description
     * Subtract the specified number of hours from the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of hours to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the hours subtracted
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Subtract 2 hours from 11 July 2014 01:00:00:
     * const result = subHours(new Date(2014, 6, 11, 1, 0), 2)
     * //=> Thu Jul 10 2014 23:00:00
     */

    function subHours(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return (0, _addHours_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate,
        -amount
      );
    }

    /***/
  },

  /***/ 91218: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ Z: () => /* binding */ subMilliseconds,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(51820);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name subMilliseconds
     * @category Millisecond Helpers
     * @summary Subtract the specified number of milliseconds from the given date.
     *
     * @description
     * Subtract the specified number of milliseconds from the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the milliseconds subtracted
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
     * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
     * //=> Thu Jul 10 2014 12:45:29.250
     */

    function subMilliseconds(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return (0,
      _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)(
        dirtyDate,
        -amount
      );
    }

    /***/
  },

  /***/ 1784: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ subMinutes,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addMinutes_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(58545);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name subMinutes
     * @category Minute Helpers
     * @summary Subtract the specified number of minutes from the given date.
     *
     * @description
     * Subtract the specified number of minutes from the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of minutes to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the minutes subtracted
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Subtract 30 minutes from 10 July 2014 12:00:00:
     * const result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
     * //=> Thu Jul 10 2014 11:30:00
     */

    function subMinutes(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return (0, _addMinutes_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate,
        -amount
      );
    }

    /***/
  },

  /***/ 54559: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ subMonths,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addMonths_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(11640);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name subMonths
     * @category Month Helpers
     * @summary Subtract the specified number of months from the given date.
     *
     * @description
     * Subtract the specified number of months from the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of months to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the months subtracted
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Subtract 5 months from 1 February 2015:
     * const result = subMonths(new Date(2015, 1, 1), 5)
     * //=> Mon Sep 01 2014 00:00:00
     */

    function subMonths(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return (0, _addMonths_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate,
        -amount
      );
    }

    /***/
  },

  /***/ 77982: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ subWeeks,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addWeeks_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(63500);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name subWeeks
     * @category Week Helpers
     * @summary Subtract the specified number of weeks from the given date.
     *
     * @description
     * Subtract the specified number of weeks from the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of weeks to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the weeks subtracted
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Subtract 4 weeks from 1 September 2014:
     * const result = subWeeks(new Date(2014, 8, 1), 4)
     * //=> Mon Aug 04 2014 00:00:00
     */

    function subWeeks(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return (0, _addWeeks_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate,
        -amount
      );
    }

    /***/
  },

  /***/ 59319: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ subYears,
      /* harmony export */
    });
    /* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(83946);
    /* harmony import */ var _addYears_index_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(21593);
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name subYears
     * @category Year Helpers
     * @summary Subtract the specified number of years from the given date.
     *
     * @description
     * Subtract the specified number of years from the given date.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of years to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the years subtracted
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Subtract 5 years from 1 September 2014:
     * const result = subYears(new Date(2014, 8, 1), 5)
     * //=> Tue Sep 01 2009 00:00:00
     */

    function subYears(dirtyDate, dirtyAmount) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        2,
        arguments
      );
      var amount = (0,
      _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */.Z)(
        dirtyAmount
      );
      return (0, _addYears_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
        dirtyDate,
        -amount
      );
    }

    /***/
  },

  /***/ 19013: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ default: () => /* binding */ toDate,
      /* harmony export */
    });
    /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(13882);

    /**
     * @name toDate
     * @category Common Helpers
     * @summary Convert the given argument to an instance of Date.
     *
     * @description
     * Convert the given argument to an instance of Date.
     *
     * If the argument is an instance of Date, the function returns its clone.
     *
     * If the argument is a number, it is treated as a timestamp.
     *
     * If the argument is none of the above, the function returns Invalid Date.
     *
     * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
     *
     * @param {Date|Number} argument - the value to convert
     * @returns {Date} the parsed date in the local time zone
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Clone the date:
     * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
     * //=> Tue Feb 11 2014 11:30:30
     *
     * @example
     * // Convert the timestamp to date:
     * const result = toDate(1392098430000)
     * //=> Tue Feb 11 2014 11:30:30
     */

    function toDate(argument) {
      (0,
      _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ /* ["default"] */.Z)(
        1,
        arguments
      );
      var argStr = Object.prototype.toString.call(argument); // Clone the date

      if (
        argument instanceof Date ||
        (typeof argument === "object" && argStr === "[object Date]")
      ) {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new Date(argument.getTime());
      } else if (typeof argument === "number" || argStr === "[object Number]") {
        return new Date(argument);
      } else {
        if (
          (typeof argument === "string" || argStr === "[object String]") &&
          typeof console !== "undefined"
        ) {
          // eslint-disable-next-line no-console
          console.warn(
            "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"
          ); // eslint-disable-next-line no-console

          console.warn(new Error().stack);
        }

        return new Date(NaN);
      }
    }

    /***/
  },

  /***/ 65994: /***/ () => {
    /***/
  },

  /***/ 42504: /***/ (
    __unused_webpack_module,
    exports,
    __webpack_require__
  ) => {
    "use strict";
    var __webpack_unused_export__;
    __webpack_unused_export__ = { value: !0 };
    var e = __webpack_require__(67294);
    __webpack_require__(45697);
    var t = __webpack_require__(94184),
      r = __webpack_require__(71381),
      a = __webpack_require__(12274),
      n = __webpack_require__(42298),
      o = __webpack_require__(58545),
      s = __webpack_require__(78343),
      i = __webpack_require__(77349),
      p = __webpack_require__(63500),
      l = __webpack_require__(11640),
      c = __webpack_require__(21593);
    __webpack_require__(1784), __webpack_require__(88330);
    var u = __webpack_require__(7069),
      d = __webpack_require__(77982),
      f = __webpack_require__(54559),
      h = __webpack_require__(59319),
      m = __webpack_require__(77881),
      y = __webpack_require__(39159),
      v = __webpack_require__(85817),
      D = __webpack_require__(20466),
      w = __webpack_require__(55855),
      k = __webpack_require__(90259),
      g = __webpack_require__(78966),
      b = __webpack_require__(56605),
      C = __webpack_require__(95570),
      S = __webpack_require__(28789),
      _ = __webpack_require__(39880),
      M = __webpack_require__(4543),
      P = __webpack_require__(37042),
      E = __webpack_require__(16218),
      N = __webpack_require__(11503),
      x = __webpack_require__(44749),
      O = __webpack_require__(37950),
      Y = __webpack_require__(99890),
      T = __webpack_require__(92300),
      I = __webpack_require__(1140);
    __webpack_require__(52724);
    var L = __webpack_require__(91857),
      F = __webpack_require__(69119),
      R = __webpack_require__(584),
      A = __webpack_require__(43703),
      q = __webpack_require__(94431),
      K = __webpack_require__(38148),
      B = __webpack_require__(57870);
    __webpack_require__(67090), __webpack_require__(4135);
    var W = __webpack_require__(96843),
      j = __webpack_require__(3151),
      H = __webpack_require__(49160),
      Q = __webpack_require__(60792),
      V = __webpack_require__(86117),
      U = __webpack_require__(42699),
      $ = __webpack_require__(313),
      z = __webpack_require__(24257),
      G = __webpack_require__(19013),
      J = __webpack_require__(24002),
      X = __webpack_require__(23855),
      Z = __webpack_require__(26972),
      ee = __webpack_require__(73935),
      te = __webpack_require__(7795);
    function re(e) {
      return e && "object" == typeof e && "default" in e ? e : { default: e };
    }
    var ae = re(e),
      ne = re(t),
      oe = re(r),
      se = re(a),
      ie = re(n),
      pe = re(o),
      le = re(s),
      ce = re(i),
      ue = re(p),
      de = re(l),
      fe = re(c),
      he = re(u),
      me = re(d),
      ye = re(f),
      ve = re(h),
      De = re(m),
      we = re(y),
      ke = re(v),
      ge = re(D),
      be = re(w),
      Ce = re(k),
      Se = re(g),
      _e = re(b),
      Me = re(C),
      Pe = re(S),
      Ee = re(_),
      Ne = re(M),
      xe = re(P),
      Oe = re(E),
      Ye = re(N),
      Te = re(x),
      Ie = re(O),
      Le = re(Y),
      Fe = re(T),
      Re = re(I),
      Ae = re(L),
      qe = re(F),
      Ke = re(R),
      Be = re(A),
      We = re(q),
      je = re(K),
      He = re(B),
      Qe = re(W),
      Ve = re(j),
      Ue = re(H),
      $e = re(Q),
      ze = re(V),
      Ge = re(U),
      Je = re($),
      Xe = re(z),
      Ze = re(G),
      et = re(J),
      tt = re(X),
      rt = re(Z),
      at = re(ee);
    function nt(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        t &&
          (a = a.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, a);
      }
      return r;
    }
    function ot(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? nt(Object(r), !0).forEach(function (t) {
              ct(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : nt(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function st(e) {
      return (st =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function it(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function pt(e, t) {
      for (var r = 0; r < t.length; r++) {
        var a = t[r];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(e, a.key, a);
      }
    }
    function lt(e, t, r) {
      return t && pt(e.prototype, t), r && pt(e, r), e;
    }
    function ct(e, t, r) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function ut() {
      return (ut =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var a in r)
              Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
          }
          return e;
        }).apply(this, arguments);
    }
    function dt(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        t && ht(e, t);
    }
    function ft(e) {
      return (ft = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function ht(e, t) {
      return (ht =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function mt(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    }
    function yt(e, t) {
      if (t && ("object" == typeof t || "function" == typeof t)) return t;
      if (void 0 !== t)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return mt(e);
    }
    function vt(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var r,
          a = ft(e);
        if (t) {
          var n = ft(this).constructor;
          r = Reflect.construct(a, arguments, n);
        } else r = a.apply(this, arguments);
        return yt(this, r);
      };
    }
    function Dt(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return wt(e);
        })(e) ||
        (function (e) {
          if (
            ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
            null != e["@@iterator"]
          )
            return Array.from(e);
        })(e) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return wt(e, t);
          var r = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === r && e.constructor && (r = e.constructor.name);
          if ("Map" === r || "Set" === r) return Array.from(e);
          if (
            "Arguments" === r ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          )
            return wt(e, t);
        })(e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function wt(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, a = new Array(t); r < t; r++) a[r] = e[r];
      return a;
    }
    function kt(e, t) {
      switch (e) {
        case "P":
          return t.date({ width: "short" });
        case "PP":
          return t.date({ width: "medium" });
        case "PPP":
          return t.date({ width: "long" });
        case "PPPP":
        default:
          return t.date({ width: "full" });
      }
    }
    function gt(e, t) {
      switch (e) {
        case "p":
          return t.time({ width: "short" });
        case "pp":
          return t.time({ width: "medium" });
        case "ppp":
          return t.time({ width: "long" });
        case "pppp":
        default:
          return t.time({ width: "full" });
      }
    }
    var bt = {
        p: gt,
        P: function (e, t) {
          var r,
            a = e.match(/(P+)(p+)?/),
            n = a[1],
            o = a[2];
          if (!o) return kt(e, t);
          switch (n) {
            case "P":
              r = t.dateTime({ width: "short" });
              break;
            case "PP":
              r = t.dateTime({ width: "medium" });
              break;
            case "PPP":
              r = t.dateTime({ width: "long" });
              break;
            case "PPPP":
            default:
              r = t.dateTime({ width: "full" });
          }
          return r.replace("{{date}}", kt(n, t)).replace("{{time}}", gt(o, t));
        },
      },
      Ct = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    function St(e) {
      var t = e
        ? "string" == typeof e || e instanceof String
          ? tt.default(e)
          : Ze.default(e)
        : new Date();
      return Mt(t) ? t : null;
    }
    function _t(e, t, r, a, n) {
      var o = null,
        s = Ht(r) || Ht(jt()),
        i = !0;
      return Array.isArray(t)
        ? (t.forEach(function (t) {
            var r = et.default(e, t, new Date(), { locale: s });
            a &&
              (i =
                Mt(r, n) &&
                e === ie.default(r, t, { awareOfUnicodeTokens: !0 })),
              Mt(r, n) && i && (o = r);
          }),
          o)
        : ((o = et.default(e, t, new Date(), { locale: s })),
          a
            ? (i =
                Mt(o) && e === ie.default(o, t, { awareOfUnicodeTokens: !0 }))
            : Mt(o) ||
              ((t = t
                .match(Ct)
                .map(function (e) {
                  var t = e[0];
                  return "p" === t || "P" === t
                    ? s
                      ? (0, bt[t])(e, s.formatLong)
                      : t
                    : e;
                })
                .join("")),
              e.length > 0 &&
                (o = et.default(e, t.slice(0, e.length), new Date())),
              Mt(o) || (o = new Date(e))),
          Mt(o) && i ? o : null);
    }
    function Mt(e, t) {
      return (t = t || new Date("1/1/1000")), se.default(e) && Ge.default(e, t);
    }
    function Pt(e, t, r) {
      if ("en" === r) return ie.default(e, t, { awareOfUnicodeTokens: !0 });
      var a = Ht(r);
      return (
        r &&
          !a &&
          console.warn(
            'A locale object was not found for the provided string ["'.concat(
              r,
              '"].'
            )
          ),
        !a && jt() && Ht(jt()) && (a = Ht(jt())),
        ie.default(e, t, { locale: a || null, awareOfUnicodeTokens: !0 })
      );
    }
    function Et(e, t) {
      var r = t.dateFormat,
        a = t.locale;
      return (e && Pt(e, Array.isArray(r) ? r[0] : r, a)) || "";
    }
    function Nt(e, t) {
      var r = t.hour,
        a = void 0 === r ? 0 : r,
        n = t.minute,
        o = void 0 === n ? 0 : n,
        s = t.second,
        i = void 0 === s ? 0 : s;
      return xe.default(Ne.default(Ee.default(e, i), o), a);
    }
    function xt(e, t) {
      var r = (t && Ht(t)) || (jt() && Ht(jt()));
      return Ce.default(e, r ? { locale: r } : null);
    }
    function Ot(e, t) {
      return Pt(e, "ddd", t);
    }
    function Yt(e) {
      return qe.default(e);
    }
    function Tt(e, t, r) {
      var a = Ht(t || jt());
      return Ke.default(e, { locale: a, weekStartsOn: r });
    }
    function It(e) {
      return Be.default(e);
    }
    function Lt(e) {
      return je.default(e);
    }
    function Ft(e) {
      return We.default(e);
    }
    function Rt(e, t) {
      return e && t ? $e.default(e, t) : !e && !t;
    }
    function At(e, t) {
      return e && t ? Ue.default(e, t) : !e && !t;
    }
    function qt(e, t) {
      return e && t ? ze.default(e, t) : !e && !t;
    }
    function Kt(e, t) {
      return e && t ? Ve.default(e, t) : !e && !t;
    }
    function Bt(e, t) {
      return e && t ? Qe.default(e, t) : !e && !t;
    }
    function Wt(e, t, r) {
      var a,
        n = qe.default(t),
        o = He.default(r);
      try {
        a = Xe.default(e, { start: n, end: o });
      } catch (e) {
        a = !1;
      }
      return a;
    }
    function jt() {
      return ("undefined" != typeof window ? window : global).__localeId__;
    }
    function Ht(e) {
      if ("string" == typeof e) {
        var t = "undefined" != typeof window ? window : global;
        return t.__localeData__ ? t.__localeData__[e] : null;
      }
      return e;
    }
    function Qt(e, t) {
      return Pt(Oe.default(St(), e), "LLLL", t);
    }
    function Vt(e, t) {
      return Pt(Oe.default(St(), e), "LLL", t);
    }
    function Ut(e, t) {
      return Pt(Ye.default(St(), e), "QQQ", t);
    }
    function $t(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.minDate,
        a = t.maxDate,
        n = t.excludeDates,
        o = t.includeDates,
        s = t.filterDate;
      return (
        tr(e, { minDate: r, maxDate: a }) ||
        (n &&
          n.some(function (t) {
            return Kt(e, t);
          })) ||
        (o &&
          !o.some(function (t) {
            return Kt(e, t);
          })) ||
        (s && !s(St(e))) ||
        !1
      );
    }
    function zt(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.excludeDates;
      return (
        (r &&
          r.some(function (t) {
            return Kt(e, t);
          })) ||
        !1
      );
    }
    function Gt(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.minDate,
        a = t.maxDate,
        n = t.excludeDates,
        o = t.includeDates,
        s = t.filterDate;
      return (
        tr(e, { minDate: r, maxDate: a }) ||
        (n &&
          n.some(function (t) {
            return At(e, t);
          })) ||
        (o &&
          !o.some(function (t) {
            return At(e, t);
          })) ||
        (s && !s(St(e))) ||
        !1
      );
    }
    function Jt(e, t, r, a) {
      var n = Me.default(e),
        o = Se.default(e),
        s = Me.default(t),
        i = Se.default(t),
        p = Me.default(a);
      return n === s && n === p
        ? o <= r && r <= i
        : n < s
        ? (p === n && o <= r) || (p === s && i >= r) || (p < s && p > n)
        : void 0;
    }
    function Xt(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.minDate,
        a = t.maxDate,
        n = t.excludeDates,
        o = t.includeDates,
        s = t.filterDate;
      return (
        tr(e, { minDate: r, maxDate: a }) ||
        (n &&
          n.some(function (t) {
            return qt(e, t);
          })) ||
        (o &&
          !o.some(function (t) {
            return qt(e, t);
          })) ||
        (s && !s(St(e))) ||
        !1
      );
    }
    function Zt(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.minDate,
        a = t.maxDate,
        n = new Date(e, 0, 1);
      return tr(n, { minDate: r, maxDate: a }) || !1;
    }
    function er(e, t, r, a) {
      var n = Me.default(e),
        o = _e.default(e),
        s = Me.default(t),
        i = _e.default(t),
        p = Me.default(a);
      return n === s && n === p
        ? o <= r && r <= i
        : n < s
        ? (p === n && o <= r) || (p === s && i >= r) || (p < s && p > n)
        : void 0;
    }
    function tr(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.minDate,
        a = t.maxDate;
      return (r && Fe.default(e, r) < 0) || (a && Fe.default(e, a) > 0);
    }
    function rr(e, t) {
      return t.some(function (t) {
        return (
          ke.default(t) === ke.default(e) && we.default(t) === we.default(e)
        );
      });
    }
    function ar(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.excludeTimes,
        a = t.includeTimes,
        n = t.filterTime;
      return (r && rr(e, r)) || (a && !rr(e, a)) || (n && !n(e)) || !1;
    }
    function nr(e, t) {
      var r = t.minTime,
        a = t.maxTime;
      if (!r || !a) throw new Error("Both minTime and maxTime props required");
      var n,
        o = St(),
        s = xe.default(Ne.default(o, we.default(e)), ke.default(e)),
        i = xe.default(Ne.default(o, we.default(r)), ke.default(r)),
        p = xe.default(Ne.default(o, we.default(a)), ke.default(a));
      try {
        n = !Xe.default(s, { start: i, end: p });
      } catch (e) {
        n = !1;
      }
      return n;
    }
    function or(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.minDate,
        a = t.includeDates,
        n = ye.default(e, 1);
      return (
        (r && Re.default(r, n) > 0) ||
        (a &&
          a.every(function (e) {
            return Re.default(e, n) > 0;
          })) ||
        !1
      );
    }
    function sr(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.maxDate,
        a = t.includeDates,
        n = de.default(e, 1);
      return (
        (r && Re.default(n, r) > 0) ||
        (a &&
          a.every(function (e) {
            return Re.default(n, e) > 0;
          })) ||
        !1
      );
    }
    function ir(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.minDate,
        a = t.includeDates,
        n = ve.default(e, 1);
      return (
        (r && Ae.default(r, n) > 0) ||
        (a &&
          a.every(function (e) {
            return Ae.default(e, n) > 0;
          })) ||
        !1
      );
    }
    function pr(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.maxDate,
        a = t.includeDates,
        n = fe.default(e, 1);
      return (
        (r && Ae.default(n, r) > 0) ||
        (a &&
          a.every(function (e) {
            return Ae.default(n, e) > 0;
          })) ||
        !1
      );
    }
    function lr(e) {
      var t = e.minDate,
        r = e.includeDates;
      if (r && t) {
        var a = r.filter(function (e) {
          return Fe.default(e, t) >= 0;
        });
        return Ie.default(a);
      }
      return r ? Ie.default(r) : t;
    }
    function cr(e) {
      var t = e.maxDate,
        r = e.includeDates;
      if (r && t) {
        var a = r.filter(function (e) {
          return Fe.default(e, t) <= 0;
        });
        return Le.default(a);
      }
      return r ? Le.default(r) : t;
    }
    function ur() {
      for (
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : "react-datepicker__day--highlighted",
          r = new Map(),
          a = 0,
          n = e.length;
        a < n;
        a++
      ) {
        var o = e[a];
        if (oe.default(o)) {
          var s = Pt(o, "MM.dd.yyyy"),
            i = r.get(s) || [];
          i.includes(t) || (i.push(t), r.set(s, i));
        } else if ("object" === st(o)) {
          var p = Object.keys(o),
            l = p[0],
            c = o[p[0]];
          if ("string" == typeof l && c.constructor === Array)
            for (var u = 0, d = c.length; u < d; u++) {
              var f = Pt(c[u], "MM.dd.yyyy"),
                h = r.get(f) || [];
              h.includes(l) || (h.push(l), r.set(f, h));
            }
        }
      }
      return r;
    }
    function dr(e, t, r, a, n) {
      for (var o = n.length, s = [], i = 0; i < o; i++) {
        var p = pe.default(le.default(e, ke.default(n[i])), we.default(n[i])),
          l = pe.default(e, (r + 1) * a);
        Ge.default(p, t) && Je.default(p, l) && s.push(n[i]);
      }
      return s;
    }
    function fr(e) {
      return e < 10 ? "0".concat(e) : "".concat(e);
    }
    function hr(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 12,
        r = Math.ceil(Me.default(e) / t) * t,
        a = r - (t - 1);
      return { startPeriod: a, endPeriod: r };
    }
    function mr(e, t, r, a) {
      for (var n = [], o = 0; o < 2 * t + 1; o++) {
        var s = e + t - o,
          i = !0;
        r && (i = Me.default(r) <= s),
          a && i && (i = Me.default(a) >= s),
          i && n.push(s);
      }
      return n;
    }
    var yr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r(e) {
          var a;
          it(this, r),
            ct(mt((a = t.call(this, e))), "renderOptions", function () {
              var e = a.props.year,
                t = a.state.yearsList.map(function (t) {
                  return ae.default.createElement(
                    "div",
                    {
                      className:
                        e === t
                          ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                          : "react-datepicker__year-option",
                      key: t,
                      onClick: a.onChange.bind(mt(a), t),
                    },
                    e === t
                      ? ae.default.createElement(
                          "span",
                          {
                            className:
                              "react-datepicker__year-option--selected",
                          },
                          "✓"
                        )
                      : "",
                    t
                  );
                }),
                r = a.props.minDate ? Me.default(a.props.minDate) : null,
                n = a.props.maxDate ? Me.default(a.props.maxDate) : null;
              return (
                (n &&
                  a.state.yearsList.find(function (e) {
                    return e === n;
                  })) ||
                  t.unshift(
                    ae.default.createElement(
                      "div",
                      {
                        className: "react-datepicker__year-option",
                        key: "upcoming",
                        onClick: a.incrementYears,
                      },
                      ae.default.createElement("a", {
                        className:
                          "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming",
                      })
                    )
                  ),
                (r &&
                  a.state.yearsList.find(function (e) {
                    return e === r;
                  })) ||
                  t.push(
                    ae.default.createElement(
                      "div",
                      {
                        className: "react-datepicker__year-option",
                        key: "previous",
                        onClick: a.decrementYears,
                      },
                      ae.default.createElement("a", {
                        className:
                          "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous",
                      })
                    )
                  ),
                t
              );
            }),
            ct(mt(a), "onChange", function (e) {
              a.props.onChange(e);
            }),
            ct(mt(a), "handleClickOutside", function () {
              a.props.onCancel();
            }),
            ct(mt(a), "shiftYears", function (e) {
              var t = a.state.yearsList.map(function (t) {
                return t + e;
              });
              a.setState({ yearsList: t });
            }),
            ct(mt(a), "incrementYears", function () {
              return a.shiftYears(1);
            }),
            ct(mt(a), "decrementYears", function () {
              return a.shiftYears(-1);
            });
          var n = e.yearDropdownItemNumber,
            o = e.scrollableYearDropdown,
            s = n || (o ? 10 : 5);
          return (
            (a.state = {
              yearsList: mr(a.props.year, s, a.props.minDate, a.props.maxDate),
            }),
            a
          );
        }
        return (
          lt(r, [
            {
              key: "render",
              value: function () {
                var e = ne.default({
                  "react-datepicker__year-dropdown": !0,
                  "react-datepicker__year-dropdown--scrollable":
                    this.props.scrollableYearDropdown,
                });
                return ae.default.createElement(
                  "div",
                  { className: e },
                  this.renderOptions()
                );
              },
            },
          ]),
          r
        );
      })(),
      vr = rt.default(yr),
      Dr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r() {
          var e;
          it(this, r);
          for (var a = arguments.length, n = new Array(a), o = 0; o < a; o++)
            n[o] = arguments[o];
          return (
            ct(mt((e = t.call.apply(t, [this].concat(n)))), "state", {
              dropdownVisible: !1,
            }),
            ct(mt(e), "renderSelectOptions", function () {
              for (
                var t = e.props.minDate ? Me.default(e.props.minDate) : 1900,
                  r = e.props.maxDate ? Me.default(e.props.maxDate) : 2100,
                  a = [],
                  n = t;
                n <= r;
                n++
              )
                a.push(
                  ae.default.createElement("option", { key: n, value: n }, n)
                );
              return a;
            }),
            ct(mt(e), "onSelectChange", function (t) {
              e.onChange(t.target.value);
            }),
            ct(mt(e), "renderSelectMode", function () {
              return ae.default.createElement(
                "select",
                {
                  value: e.props.year,
                  className: "react-datepicker__year-select",
                  onChange: e.onSelectChange,
                },
                e.renderSelectOptions()
              );
            }),
            ct(mt(e), "renderReadView", function (t) {
              return ae.default.createElement(
                "div",
                {
                  key: "read",
                  style: { visibility: t ? "visible" : "hidden" },
                  className: "react-datepicker__year-read-view",
                  onClick: function (t) {
                    return e.toggleDropdown(t);
                  },
                },
                ae.default.createElement("span", {
                  className: "react-datepicker__year-read-view--down-arrow",
                }),
                ae.default.createElement(
                  "span",
                  {
                    className:
                      "react-datepicker__year-read-view--selected-year",
                  },
                  e.props.year
                )
              );
            }),
            ct(mt(e), "renderDropdown", function () {
              return ae.default.createElement(vr, {
                key: "dropdown",
                year: e.props.year,
                onChange: e.onChange,
                onCancel: e.toggleDropdown,
                minDate: e.props.minDate,
                maxDate: e.props.maxDate,
                scrollableYearDropdown: e.props.scrollableYearDropdown,
                yearDropdownItemNumber: e.props.yearDropdownItemNumber,
              });
            }),
            ct(mt(e), "renderScrollMode", function () {
              var t = e.state.dropdownVisible,
                r = [e.renderReadView(!t)];
              return t && r.unshift(e.renderDropdown()), r;
            }),
            ct(mt(e), "onChange", function (t) {
              e.toggleDropdown(), t !== e.props.year && e.props.onChange(t);
            }),
            ct(mt(e), "toggleDropdown", function (t) {
              e.setState(
                { dropdownVisible: !e.state.dropdownVisible },
                function () {
                  e.props.adjustDateOnChange &&
                    e.handleYearChange(e.props.date, t);
                }
              );
            }),
            ct(mt(e), "handleYearChange", function (t, r) {
              e.onSelect(t, r), e.setOpen();
            }),
            ct(mt(e), "onSelect", function (t, r) {
              e.props.onSelect && e.props.onSelect(t, r);
            }),
            ct(mt(e), "setOpen", function () {
              e.props.setOpen && e.props.setOpen(!0);
            }),
            e
          );
        }
        return (
          lt(r, [
            {
              key: "render",
              value: function () {
                var e;
                switch (this.props.dropdownMode) {
                  case "scroll":
                    e = this.renderScrollMode();
                    break;
                  case "select":
                    e = this.renderSelectMode();
                }
                return ae.default.createElement(
                  "div",
                  {
                    className:
                      "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(
                        this.props.dropdownMode
                      ),
                  },
                  e
                );
              },
            },
          ]),
          r
        );
      })(),
      wr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r() {
          var e;
          it(this, r);
          for (var a = arguments.length, n = new Array(a), o = 0; o < a; o++)
            n[o] = arguments[o];
          return (
            ct(
              mt((e = t.call.apply(t, [this].concat(n)))),
              "renderOptions",
              function () {
                return e.props.monthNames.map(function (t, r) {
                  return ae.default.createElement(
                    "div",
                    {
                      className:
                        e.props.month === r
                          ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
                          : "react-datepicker__month-option",
                      key: t,
                      onClick: e.onChange.bind(mt(e), r),
                    },
                    e.props.month === r
                      ? ae.default.createElement(
                          "span",
                          {
                            className:
                              "react-datepicker__month-option--selected",
                          },
                          "✓"
                        )
                      : "",
                    t
                  );
                });
              }
            ),
            ct(mt(e), "onChange", function (t) {
              return e.props.onChange(t);
            }),
            ct(mt(e), "handleClickOutside", function () {
              return e.props.onCancel();
            }),
            e
          );
        }
        return (
          lt(r, [
            {
              key: "render",
              value: function () {
                return ae.default.createElement(
                  "div",
                  { className: "react-datepicker__month-dropdown" },
                  this.renderOptions()
                );
              },
            },
          ]),
          r
        );
      })(),
      kr = rt.default(wr),
      gr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r() {
          var e;
          it(this, r);
          for (var a = arguments.length, n = new Array(a), o = 0; o < a; o++)
            n[o] = arguments[o];
          return (
            ct(mt((e = t.call.apply(t, [this].concat(n)))), "state", {
              dropdownVisible: !1,
            }),
            ct(mt(e), "renderSelectOptions", function (e) {
              return e.map(function (e, t) {
                return ae.default.createElement(
                  "option",
                  { key: t, value: t },
                  e
                );
              });
            }),
            ct(mt(e), "renderSelectMode", function (t) {
              return ae.default.createElement(
                "select",
                {
                  value: e.props.month,
                  className: "react-datepicker__month-select",
                  onChange: function (t) {
                    return e.onChange(t.target.value);
                  },
                },
                e.renderSelectOptions(t)
              );
            }),
            ct(mt(e), "renderReadView", function (t, r) {
              return ae.default.createElement(
                "div",
                {
                  key: "read",
                  style: { visibility: t ? "visible" : "hidden" },
                  className: "react-datepicker__month-read-view",
                  onClick: e.toggleDropdown,
                },
                ae.default.createElement("span", {
                  className: "react-datepicker__month-read-view--down-arrow",
                }),
                ae.default.createElement(
                  "span",
                  {
                    className:
                      "react-datepicker__month-read-view--selected-month",
                  },
                  r[e.props.month]
                )
              );
            }),
            ct(mt(e), "renderDropdown", function (t) {
              return ae.default.createElement(kr, {
                key: "dropdown",
                month: e.props.month,
                monthNames: t,
                onChange: e.onChange,
                onCancel: e.toggleDropdown,
              });
            }),
            ct(mt(e), "renderScrollMode", function (t) {
              var r = e.state.dropdownVisible,
                a = [e.renderReadView(!r, t)];
              return r && a.unshift(e.renderDropdown(t)), a;
            }),
            ct(mt(e), "onChange", function (t) {
              e.toggleDropdown(), t !== e.props.month && e.props.onChange(t);
            }),
            ct(mt(e), "toggleDropdown", function () {
              return e.setState({ dropdownVisible: !e.state.dropdownVisible });
            }),
            e
          );
        }
        return (
          lt(r, [
            {
              key: "render",
              value: function () {
                var e,
                  t = this,
                  r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                    this.props.useShortMonthInDropdown
                      ? function (e) {
                          return Vt(e, t.props.locale);
                        }
                      : function (e) {
                          return Qt(e, t.props.locale);
                        }
                  );
                switch (this.props.dropdownMode) {
                  case "scroll":
                    e = this.renderScrollMode(r);
                    break;
                  case "select":
                    e = this.renderSelectMode(r);
                }
                return ae.default.createElement(
                  "div",
                  {
                    className:
                      "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(
                        this.props.dropdownMode
                      ),
                  },
                  e
                );
              },
            },
          ]),
          r
        );
      })();
    function br(e, t) {
      for (var r = [], a = It(e), n = It(t); !Ge.default(a, n); )
        r.push(St(a)), (a = de.default(a, 1));
      return r;
    }
    var Cr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r(e) {
          var a;
          return (
            it(this, r),
            ct(mt((a = t.call(this, e))), "renderOptions", function () {
              return a.state.monthYearsList.map(function (e) {
                var t = Pe.default(e),
                  r = Rt(a.props.date, e) && At(a.props.date, e);
                return ae.default.createElement(
                  "div",
                  {
                    className: r
                      ? "react-datepicker__month-year-option --selected_month-year"
                      : "react-datepicker__month-year-option",
                    key: t,
                    onClick: a.onChange.bind(mt(a), t),
                  },
                  r
                    ? ae.default.createElement(
                        "span",
                        {
                          className:
                            "react-datepicker__month-year-option--selected",
                        },
                        "✓"
                      )
                    : "",
                  Pt(e, a.props.dateFormat, a.props.locale)
                );
              });
            }),
            ct(mt(a), "onChange", function (e) {
              return a.props.onChange(e);
            }),
            ct(mt(a), "handleClickOutside", function () {
              a.props.onCancel();
            }),
            (a.state = {
              monthYearsList: br(a.props.minDate, a.props.maxDate),
            }),
            a
          );
        }
        return (
          lt(r, [
            {
              key: "render",
              value: function () {
                var e = ne.default({
                  "react-datepicker__month-year-dropdown": !0,
                  "react-datepicker__month-year-dropdown--scrollable":
                    this.props.scrollableMonthYearDropdown,
                });
                return ae.default.createElement(
                  "div",
                  { className: e },
                  this.renderOptions()
                );
              },
            },
          ]),
          r
        );
      })(),
      Sr = rt.default(Cr),
      _r = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r() {
          var e;
          it(this, r);
          for (var a = arguments.length, n = new Array(a), o = 0; o < a; o++)
            n[o] = arguments[o];
          return (
            ct(mt((e = t.call.apply(t, [this].concat(n)))), "state", {
              dropdownVisible: !1,
            }),
            ct(mt(e), "renderSelectOptions", function () {
              for (
                var t = It(e.props.minDate), r = It(e.props.maxDate), a = [];
                !Ge.default(t, r);

              ) {
                var n = Pe.default(t);
                a.push(
                  ae.default.createElement(
                    "option",
                    { key: n, value: n },
                    Pt(t, e.props.dateFormat, e.props.locale)
                  )
                ),
                  (t = de.default(t, 1));
              }
              return a;
            }),
            ct(mt(e), "onSelectChange", function (t) {
              e.onChange(t.target.value);
            }),
            ct(mt(e), "renderSelectMode", function () {
              return ae.default.createElement(
                "select",
                {
                  value: Pe.default(It(e.props.date)),
                  className: "react-datepicker__month-year-select",
                  onChange: e.onSelectChange,
                },
                e.renderSelectOptions()
              );
            }),
            ct(mt(e), "renderReadView", function (t) {
              var r = Pt(e.props.date, e.props.dateFormat, e.props.locale);
              return ae.default.createElement(
                "div",
                {
                  key: "read",
                  style: { visibility: t ? "visible" : "hidden" },
                  className: "react-datepicker__month-year-read-view",
                  onClick: function (t) {
                    return e.toggleDropdown(t);
                  },
                },
                ae.default.createElement("span", {
                  className:
                    "react-datepicker__month-year-read-view--down-arrow",
                }),
                ae.default.createElement(
                  "span",
                  {
                    className:
                      "react-datepicker__month-year-read-view--selected-month-year",
                  },
                  r
                )
              );
            }),
            ct(mt(e), "renderDropdown", function () {
              return ae.default.createElement(Sr, {
                key: "dropdown",
                date: e.props.date,
                dateFormat: e.props.dateFormat,
                onChange: e.onChange,
                onCancel: e.toggleDropdown,
                minDate: e.props.minDate,
                maxDate: e.props.maxDate,
                scrollableMonthYearDropdown:
                  e.props.scrollableMonthYearDropdown,
                locale: e.props.locale,
              });
            }),
            ct(mt(e), "renderScrollMode", function () {
              var t = e.state.dropdownVisible,
                r = [e.renderReadView(!t)];
              return t && r.unshift(e.renderDropdown()), r;
            }),
            ct(mt(e), "onChange", function (t) {
              e.toggleDropdown();
              var r = St(parseInt(t));
              (Rt(e.props.date, r) && At(e.props.date, r)) ||
                e.props.onChange(r);
            }),
            ct(mt(e), "toggleDropdown", function () {
              return e.setState({ dropdownVisible: !e.state.dropdownVisible });
            }),
            e
          );
        }
        return (
          lt(r, [
            {
              key: "render",
              value: function () {
                var e;
                switch (this.props.dropdownMode) {
                  case "scroll":
                    e = this.renderScrollMode();
                    break;
                  case "select":
                    e = this.renderSelectMode();
                }
                return ae.default.createElement(
                  "div",
                  {
                    className:
                      "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(
                        this.props.dropdownMode
                      ),
                  },
                  e
                );
              },
            },
          ]),
          r
        );
      })(),
      Mr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r() {
          var e;
          it(this, r);
          for (var a = arguments.length, n = new Array(a), o = 0; o < a; o++)
            n[o] = arguments[o];
          return (
            ct(
              mt((e = t.call.apply(t, [this].concat(n)))),
              "dayEl",
              ae.default.createRef()
            ),
            ct(mt(e), "handleClick", function (t) {
              !e.isDisabled() && e.props.onClick && e.props.onClick(t);
            }),
            ct(mt(e), "handleMouseEnter", function (t) {
              !e.isDisabled() &&
                e.props.onMouseEnter &&
                e.props.onMouseEnter(t);
            }),
            ct(mt(e), "handleOnKeyDown", function (t) {
              " " === t.key && (t.preventDefault(), (t.key = "Enter")),
                e.props.handleOnKeyDown(t);
            }),
            ct(mt(e), "isSameDay", function (t) {
              return Kt(e.props.day, t);
            }),
            ct(mt(e), "isKeyboardSelected", function () {
              return (
                !e.props.disabledKeyboardNavigation &&
                !e.isSameDay(e.props.selected) &&
                e.isSameDay(e.props.preSelection)
              );
            }),
            ct(mt(e), "isDisabled", function () {
              return $t(e.props.day, e.props);
            }),
            ct(mt(e), "isExcluded", function () {
              return zt(e.props.day, e.props);
            }),
            ct(mt(e), "getHighLightedClass", function (t) {
              var r = e.props,
                a = r.day,
                n = r.highlightDates;
              if (!n) return !1;
              var o = Pt(a, "MM.dd.yyyy");
              return n.get(o);
            }),
            ct(mt(e), "isInRange", function () {
              var t = e.props,
                r = t.day,
                a = t.startDate,
                n = t.endDate;
              return !(!a || !n) && Wt(r, a, n);
            }),
            ct(mt(e), "isInSelectingRange", function () {
              var t,
                r = e.props,
                a = r.day,
                n = r.selectsStart,
                o = r.selectsEnd,
                s = r.selectsRange,
                i = r.startDate,
                p = r.endDate,
                l =
                  null !== (t = e.props.selectingDate) && void 0 !== t
                    ? t
                    : e.props.preSelection;
              return (
                !(!(n || o || s) || !l || e.isDisabled()) &&
                (n && p && (Je.default(l, p) || Bt(l, p))
                  ? Wt(a, l, p)
                  : ((o && i && (Ge.default(l, i) || Bt(l, i))) ||
                      !(!s || !i || p || (!Ge.default(l, i) && !Bt(l, i)))) &&
                    Wt(a, i, l))
              );
            }),
            ct(mt(e), "isSelectingRangeStart", function () {
              var t;
              if (!e.isInSelectingRange()) return !1;
              var r = e.props,
                a = r.day,
                n = r.startDate,
                o = r.selectsStart,
                s =
                  null !== (t = e.props.selectingDate) && void 0 !== t
                    ? t
                    : e.props.preSelection;
              return Kt(a, o ? s : n);
            }),
            ct(mt(e), "isSelectingRangeEnd", function () {
              var t;
              if (!e.isInSelectingRange()) return !1;
              var r = e.props,
                a = r.day,
                n = r.endDate,
                o = r.selectsEnd,
                s =
                  null !== (t = e.props.selectingDate) && void 0 !== t
                    ? t
                    : e.props.preSelection;
              return Kt(a, o ? s : n);
            }),
            ct(mt(e), "isRangeStart", function () {
              var t = e.props,
                r = t.day,
                a = t.startDate,
                n = t.endDate;
              return !(!a || !n) && Kt(a, r);
            }),
            ct(mt(e), "isRangeEnd", function () {
              var t = e.props,
                r = t.day,
                a = t.startDate,
                n = t.endDate;
              return !(!a || !n) && Kt(n, r);
            }),
            ct(mt(e), "isWeekend", function () {
              var t = ge.default(e.props.day);
              return 0 === t || 6 === t;
            }),
            ct(mt(e), "isOutsideMonth", function () {
              return (
                void 0 !== e.props.month &&
                e.props.month !== Se.default(e.props.day)
              );
            }),
            ct(mt(e), "getClassNames", function (t) {
              var r = e.props.dayClassName ? e.props.dayClassName(t) : void 0;
              return ne.default(
                "react-datepicker__day",
                r,
                "react-datepicker__day--" + Ot(e.props.day),
                {
                  "react-datepicker__day--disabled": e.isDisabled(),
                  "react-datepicker__day--excluded": e.isExcluded(),
                  "react-datepicker__day--selected": e.isSameDay(
                    e.props.selected
                  ),
                  "react-datepicker__day--keyboard-selected":
                    e.isKeyboardSelected(),
                  "react-datepicker__day--range-start": e.isRangeStart(),
                  "react-datepicker__day--range-end": e.isRangeEnd(),
                  "react-datepicker__day--in-range": e.isInRange(),
                  "react-datepicker__day--in-selecting-range":
                    e.isInSelectingRange(),
                  "react-datepicker__day--selecting-range-start":
                    e.isSelectingRangeStart(),
                  "react-datepicker__day--selecting-range-end":
                    e.isSelectingRangeEnd(),
                  "react-datepicker__day--today": e.isSameDay(St()),
                  "react-datepicker__day--weekend": e.isWeekend(),
                  "react-datepicker__day--outside-month": e.isOutsideMonth(),
                },
                e.getHighLightedClass("react-datepicker__day--highlighted")
              );
            }),
            ct(mt(e), "getAriaLabel", function () {
              var t = e.props,
                r = t.day,
                a = t.ariaLabelPrefixWhenEnabled,
                n = void 0 === a ? "Choose" : a,
                o = t.ariaLabelPrefixWhenDisabled,
                s = void 0 === o ? "Not available" : o,
                i = e.isDisabled() || e.isExcluded() ? s : n;
              return "".concat(i, " ").concat(Pt(r, "PPPP", e.props.locale));
            }),
            ct(mt(e), "getTabIndex", function (t, r) {
              var a = t || e.props.selected,
                n = r || e.props.preSelection;
              return e.isKeyboardSelected() || (e.isSameDay(a) && Kt(n, a))
                ? 0
                : -1;
            }),
            ct(mt(e), "handleFocusDay", function () {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                r = !1;
              0 === e.getTabIndex() &&
                !t.isInputFocused &&
                e.isSameDay(e.props.preSelection) &&
                ((document.activeElement &&
                  document.activeElement !== document.body) ||
                  (r = !0),
                e.props.inline && !e.props.shouldFocusDayInline && (r = !1),
                e.props.containerRef &&
                  e.props.containerRef.current &&
                  e.props.containerRef.current.contains(
                    document.activeElement
                  ) &&
                  document.activeElement.classList.contains(
                    "react-datepicker__day"
                  ) &&
                  (r = !0)),
                r && e.dayEl.current.focus({ preventScroll: !0 });
            }),
            ct(mt(e), "renderDayContents", function () {
              if (e.isOutsideMonth()) {
                if (
                  e.props.monthShowsDuplicateDaysEnd &&
                  be.default(e.props.day) < 10
                )
                  return null;
                if (
                  e.props.monthShowsDuplicateDaysStart &&
                  be.default(e.props.day) > 20
                )
                  return null;
              }
              return e.props.renderDayContents
                ? e.props.renderDayContents(
                    be.default(e.props.day),
                    e.props.day
                  )
                : be.default(e.props.day);
            }),
            ct(mt(e), "render", function () {
              return ae.default.createElement(
                "div",
                {
                  ref: e.dayEl,
                  className: e.getClassNames(e.props.day),
                  onKeyDown: e.handleOnKeyDown,
                  onClick: e.handleClick,
                  onMouseEnter: e.handleMouseEnter,
                  tabIndex: e.getTabIndex(),
                  "aria-label": e.getAriaLabel(),
                  role: "button",
                  "aria-disabled": e.isDisabled(),
                },
                e.renderDayContents()
              );
            }),
            e
          );
        }
        return (
          lt(r, [
            {
              key: "componentDidMount",
              value: function () {
                this.handleFocusDay();
              },
            },
            {
              key: "componentDidUpdate",
              value: function (e) {
                this.handleFocusDay(e);
              },
            },
          ]),
          r
        );
      })(),
      Pr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r() {
          var e;
          it(this, r);
          for (var a = arguments.length, n = new Array(a), o = 0; o < a; o++)
            n[o] = arguments[o];
          return (
            ct(
              mt((e = t.call.apply(t, [this].concat(n)))),
              "handleClick",
              function (t) {
                e.props.onClick && e.props.onClick(t);
              }
            ),
            e
          );
        }
        return (
          lt(r, [
            {
              key: "render",
              value: function () {
                var e = this.props,
                  t = e.weekNumber,
                  r = e.ariaLabelPrefix,
                  a = void 0 === r ? "week " : r,
                  n = {
                    "react-datepicker__week-number": !0,
                    "react-datepicker__week-number--clickable": !!e.onClick,
                  };
                return ae.default.createElement(
                  "div",
                  {
                    className: ne.default(n),
                    "aria-label": ""
                      .concat(a, " ")
                      .concat(this.props.weekNumber),
                    onClick: this.handleClick,
                  },
                  t
                );
              },
            },
          ]),
          r
        );
      })(),
      Er = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r() {
          var e;
          it(this, r);
          for (var a = arguments.length, n = new Array(a), o = 0; o < a; o++)
            n[o] = arguments[o];
          return (
            ct(
              mt((e = t.call.apply(t, [this].concat(n)))),
              "handleDayClick",
              function (t, r) {
                e.props.onDayClick && e.props.onDayClick(t, r);
              }
            ),
            ct(mt(e), "handleDayMouseEnter", function (t) {
              e.props.onDayMouseEnter && e.props.onDayMouseEnter(t);
            }),
            ct(mt(e), "handleWeekClick", function (t, r, a) {
              "function" == typeof e.props.onWeekSelect &&
                e.props.onWeekSelect(t, r, a),
                e.props.shouldCloseOnSelect && e.props.setOpen(!1);
            }),
            ct(mt(e), "formatWeekNumber", function (t) {
              return e.props.formatWeekNumber
                ? e.props.formatWeekNumber(t)
                : xt(t);
            }),
            ct(mt(e), "renderDays", function () {
              var t = Tt(e.props.day, e.props.locale, e.props.calendarStartDay),
                r = [],
                a = e.formatWeekNumber(t);
              if (e.props.showWeekNumber) {
                var n = e.props.onWeekSelect
                  ? e.handleWeekClick.bind(mt(e), t, a)
                  : void 0;
                r.push(
                  ae.default.createElement(Pr, {
                    key: "W",
                    weekNumber: a,
                    onClick: n,
                    ariaLabelPrefix: e.props.ariaLabelPrefix,
                  })
                );
              }
              return r.concat(
                [0, 1, 2, 3, 4, 5, 6].map(function (r) {
                  var a = ce.default(t, r);
                  return ae.default.createElement(Mr, {
                    ariaLabelPrefixWhenEnabled:
                      e.props.chooseDayAriaLabelPrefix,
                    ariaLabelPrefixWhenDisabled:
                      e.props.disabledDayAriaLabelPrefix,
                    key: a.valueOf(),
                    day: a,
                    month: e.props.month,
                    onClick: e.handleDayClick.bind(mt(e), a),
                    onMouseEnter: e.handleDayMouseEnter.bind(mt(e), a),
                    minDate: e.props.minDate,
                    maxDate: e.props.maxDate,
                    excludeDates: e.props.excludeDates,
                    includeDates: e.props.includeDates,
                    highlightDates: e.props.highlightDates,
                    selectingDate: e.props.selectingDate,
                    filterDate: e.props.filterDate,
                    preSelection: e.props.preSelection,
                    selected: e.props.selected,
                    selectsStart: e.props.selectsStart,
                    selectsEnd: e.props.selectsEnd,
                    selectsRange: e.props.selectsRange,
                    startDate: e.props.startDate,
                    endDate: e.props.endDate,
                    dayClassName: e.props.dayClassName,
                    renderDayContents: e.props.renderDayContents,
                    disabledKeyboardNavigation:
                      e.props.disabledKeyboardNavigation,
                    handleOnKeyDown: e.props.handleOnKeyDown,
                    isInputFocused: e.props.isInputFocused,
                    containerRef: e.props.containerRef,
                    inline: e.props.inline,
                    shouldFocusDayInline: e.props.shouldFocusDayInline,
                    monthShowsDuplicateDaysEnd:
                      e.props.monthShowsDuplicateDaysEnd,
                    monthShowsDuplicateDaysStart:
                      e.props.monthShowsDuplicateDaysStart,
                    locale: e.props.locale,
                  });
                })
              );
            }),
            e
          );
        }
        return (
          lt(
            r,
            [
              {
                key: "render",
                value: function () {
                  return ae.default.createElement(
                    "div",
                    { className: "react-datepicker__week" },
                    this.renderDays()
                  );
                },
              },
            ],
            [
              {
                key: "defaultProps",
                get: function () {
                  return { shouldCloseOnSelect: !0 };
                },
              },
            ]
          ),
          r
        );
      })(),
      Nr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r() {
          var e;
          it(this, r);
          for (var a = arguments.length, n = new Array(a), o = 0; o < a; o++)
            n[o] = arguments[o];
          return (
            ct(
              mt((e = t.call.apply(t, [this].concat(n)))),
              "MONTH_REFS",
              Dt(Array(12)).map(function () {
                return ae.default.createRef();
              })
            ),
            ct(mt(e), "isDisabled", function (t) {
              return $t(t, e.props);
            }),
            ct(mt(e), "isExcluded", function (t) {
              return zt(t, e.props);
            }),
            ct(mt(e), "handleDayClick", function (t, r) {
              e.props.onDayClick &&
                e.props.onDayClick(t, r, e.props.orderInDisplay);
            }),
            ct(mt(e), "handleDayMouseEnter", function (t) {
              e.props.onDayMouseEnter && e.props.onDayMouseEnter(t);
            }),
            ct(mt(e), "handleMouseLeave", function () {
              e.props.onMouseLeave && e.props.onMouseLeave();
            }),
            ct(mt(e), "isRangeStartMonth", function (t) {
              var r = e.props,
                a = r.day,
                n = r.startDate,
                o = r.endDate;
              return !(!n || !o) && At(Oe.default(a, t), n);
            }),
            ct(mt(e), "isRangeStartQuarter", function (t) {
              var r = e.props,
                a = r.day,
                n = r.startDate,
                o = r.endDate;
              return !(!n || !o) && qt(Ye.default(a, t), n);
            }),
            ct(mt(e), "isRangeEndMonth", function (t) {
              var r = e.props,
                a = r.day,
                n = r.startDate,
                o = r.endDate;
              return !(!n || !o) && At(Oe.default(a, t), o);
            }),
            ct(mt(e), "isRangeEndQuarter", function (t) {
              var r = e.props,
                a = r.day,
                n = r.startDate,
                o = r.endDate;
              return !(!n || !o) && qt(Ye.default(a, t), o);
            }),
            ct(mt(e), "isWeekInMonth", function (t) {
              var r = e.props.day,
                a = ce.default(t, 6);
              return At(t, r) || At(a, r);
            }),
            ct(mt(e), "renderWeeks", function () {
              for (
                var t = [],
                  r = e.props.fixedHeight,
                  a = 0,
                  n = !1,
                  o = Tt(
                    It(e.props.day),
                    e.props.locale,
                    e.props.calendarStartDay
                  );
                t.push(
                  ae.default.createElement(Er, {
                    ariaLabelPrefix: e.props.weekAriaLabelPrefix,
                    chooseDayAriaLabelPrefix: e.props.chooseDayAriaLabelPrefix,
                    disabledDayAriaLabelPrefix:
                      e.props.disabledDayAriaLabelPrefix,
                    key: a,
                    day: o,
                    month: Se.default(e.props.day),
                    onDayClick: e.handleDayClick,
                    onDayMouseEnter: e.handleDayMouseEnter,
                    onWeekSelect: e.props.onWeekSelect,
                    formatWeekNumber: e.props.formatWeekNumber,
                    locale: e.props.locale,
                    minDate: e.props.minDate,
                    maxDate: e.props.maxDate,
                    excludeDates: e.props.excludeDates,
                    includeDates: e.props.includeDates,
                    inline: e.props.inline,
                    shouldFocusDayInline: e.props.shouldFocusDayInline,
                    highlightDates: e.props.highlightDates,
                    selectingDate: e.props.selectingDate,
                    filterDate: e.props.filterDate,
                    preSelection: e.props.preSelection,
                    selected: e.props.selected,
                    selectsStart: e.props.selectsStart,
                    selectsEnd: e.props.selectsEnd,
                    selectsRange: e.props.selectsRange,
                    showWeekNumber: e.props.showWeekNumbers,
                    startDate: e.props.startDate,
                    endDate: e.props.endDate,
                    dayClassName: e.props.dayClassName,
                    setOpen: e.props.setOpen,
                    shouldCloseOnSelect: e.props.shouldCloseOnSelect,
                    disabledKeyboardNavigation:
                      e.props.disabledKeyboardNavigation,
                    renderDayContents: e.props.renderDayContents,
                    handleOnKeyDown: e.props.handleOnKeyDown,
                    isInputFocused: e.props.isInputFocused,
                    containerRef: e.props.containerRef,
                    calendarStartDay: e.props.calendarStartDay,
                    monthShowsDuplicateDaysEnd:
                      e.props.monthShowsDuplicateDaysEnd,
                    monthShowsDuplicateDaysStart:
                      e.props.monthShowsDuplicateDaysStart,
                  })
                ),
                  !n;

              ) {
                a++, (o = ue.default(o, 1));
                var s = r && a >= 6,
                  i = !r && !e.isWeekInMonth(o);
                if (s || i) {
                  if (!e.props.peekNextMonth) break;
                  n = !0;
                }
              }
              return t;
            }),
            ct(mt(e), "onMonthClick", function (t, r) {
              e.handleDayClick(It(Oe.default(e.props.day, r)), t);
            }),
            ct(mt(e), "handleMonthNavigation", function (t, r) {
              e.isDisabled(r) ||
                e.isExcluded(r) ||
                (e.props.setPreSelection(r),
                e.MONTH_REFS[t].current && e.MONTH_REFS[t].current.focus());
            }),
            ct(mt(e), "onMonthKeyDown", function (t, r) {
              var a = t.key;
              if (!e.props.disabledKeyboardNavigation)
                switch (a) {
                  case "Enter":
                    e.onMonthClick(t, r),
                      e.props.setPreSelection(e.props.selected);
                    break;
                  case "ArrowRight":
                    e.handleMonthNavigation(
                      11 === r ? 0 : r + 1,
                      de.default(e.props.preSelection, 1)
                    );
                    break;
                  case "ArrowLeft":
                    e.handleMonthNavigation(
                      0 === r ? 11 : r - 1,
                      ye.default(e.props.preSelection, 1)
                    );
                }
            }),
            ct(mt(e), "onQuarterClick", function (t, r) {
              e.handleDayClick(Ft(Ye.default(e.props.day, r)), t);
            }),
            ct(mt(e), "getMonthClassNames", function (t) {
              var r = e.props,
                a = r.day,
                n = r.startDate,
                o = r.endDate,
                s = r.selected,
                i = r.minDate,
                p = r.maxDate,
                l = r.preSelection,
                c = r.monthClassName,
                u = c ? c(a) : void 0;
              return ne.default(
                "react-datepicker__month-text",
                "react-datepicker__month-".concat(t),
                u,
                {
                  "react-datepicker__month--disabled":
                    (i || p) && Gt(Oe.default(a, t), e.props),
                  "react-datepicker__month--selected":
                    Se.default(a) === t && Me.default(a) === Me.default(s),
                  "react-datepicker__month-text--keyboard-selected":
                    Se.default(l) === t,
                  "react-datepicker__month--in-range": Jt(n, o, t, a),
                  "react-datepicker__month--range-start":
                    e.isRangeStartMonth(t),
                  "react-datepicker__month--range-end": e.isRangeEndMonth(t),
                }
              );
            }),
            ct(mt(e), "getTabIndex", function (t) {
              var r = Se.default(e.props.preSelection);
              return e.props.disabledKeyboardNavigation || t !== r ? "-1" : "0";
            }),
            ct(mt(e), "getAriaLabel", function (t) {
              var r = e.props,
                a = r.ariaLabelPrefix,
                n = void 0 === a ? "Choose" : a,
                o = r.disabledDayAriaLabelPrefix,
                s = void 0 === o ? "Not available" : o,
                i = r.day,
                p = Oe.default(i, t),
                l = e.isDisabled(p) || e.isExcluded(p) ? s : n;
              return "".concat(l, " ").concat(Pt(p, "MMMM yyyy"));
            }),
            ct(mt(e), "getQuarterClassNames", function (t) {
              var r = e.props,
                a = r.day,
                n = r.startDate,
                o = r.endDate,
                s = r.selected,
                i = r.minDate,
                p = r.maxDate;
              return ne.default(
                "react-datepicker__quarter-text",
                "react-datepicker__quarter-".concat(t),
                {
                  "react-datepicker__quarter--disabled":
                    (i || p) && Xt(Ye.default(a, t), e.props),
                  "react-datepicker__quarter--selected":
                    _e.default(a) === t && Me.default(a) === Me.default(s),
                  "react-datepicker__quarter--in-range": er(n, o, t, a),
                  "react-datepicker__quarter--range-start":
                    e.isRangeStartQuarter(t),
                  "react-datepicker__quarter--range-end":
                    e.isRangeEndQuarter(t),
                }
              );
            }),
            ct(mt(e), "renderMonths", function () {
              var t = e.props,
                r = t.showFullMonthYearPicker,
                a = t.showTwoColumnMonthYearPicker,
                n = t.showFourColumnMonthYearPicker,
                o = t.locale;
              return (
                n
                  ? [
                      [0, 1, 2, 3],
                      [4, 5, 6, 7],
                      [8, 9, 10, 11],
                    ]
                  : a
                  ? [
                      [0, 1],
                      [2, 3],
                      [4, 5],
                      [6, 7],
                      [8, 9],
                      [10, 11],
                    ]
                  : [
                      [0, 1, 2],
                      [3, 4, 5],
                      [6, 7, 8],
                      [9, 10, 11],
                    ]
              ).map(function (t, a) {
                return ae.default.createElement(
                  "div",
                  { className: "react-datepicker__month-wrapper", key: a },
                  t.map(function (t, a) {
                    return ae.default.createElement(
                      "div",
                      {
                        ref: e.MONTH_REFS[t],
                        key: a,
                        onClick: function (r) {
                          e.onMonthClick(r, t);
                        },
                        onKeyDown: function (r) {
                          e.onMonthKeyDown(r, t);
                        },
                        tabIndex: e.getTabIndex(t),
                        className: e.getMonthClassNames(t),
                        role: "button",
                        "aria-label": e.getAriaLabel(t),
                      },
                      r ? Qt(t, o) : Vt(t, o)
                    );
                  })
                );
              });
            }),
            ct(mt(e), "renderQuarters", function () {
              return ae.default.createElement(
                "div",
                { className: "react-datepicker__quarter-wrapper" },
                [1, 2, 3, 4].map(function (t, r) {
                  return ae.default.createElement(
                    "div",
                    {
                      key: r,
                      onClick: function (r) {
                        e.onQuarterClick(r, t);
                      },
                      className: e.getQuarterClassNames(t),
                    },
                    Ut(t, e.props.locale)
                  );
                })
              );
            }),
            ct(mt(e), "getClassNames", function () {
              var t = e.props;
              t.day;
              var r = t.selectingDate,
                a = t.selectsStart,
                n = t.selectsEnd,
                o = t.showMonthYearPicker,
                s = t.showQuarterYearPicker;
              return ne.default(
                "react-datepicker__month",
                { "react-datepicker__month--selecting-range": r && (a || n) },
                { "react-datepicker__monthPicker": o },
                { "react-datepicker__quarterPicker": s }
              );
            }),
            e
          );
        }
        return (
          lt(r, [
            {
              key: "render",
              value: function () {
                var e = this.props,
                  t = e.showMonthYearPicker,
                  r = e.showQuarterYearPicker,
                  a = e.day,
                  n = e.ariaLabelPrefix,
                  o = void 0 === n ? "month " : n;
                return ae.default.createElement(
                  "div",
                  {
                    className: this.getClassNames(),
                    onMouseLeave: this.handleMouseLeave,
                    "aria-label": "".concat(o, " ").concat(Pt(a, "yyyy-MM")),
                  },
                  t
                    ? this.renderMonths()
                    : r
                    ? this.renderQuarters()
                    : this.renderWeeks()
                );
              },
            },
          ]),
          r
        );
      })(),
      xr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r() {
          var e;
          it(this, r);
          for (var a = arguments.length, n = new Array(a), o = 0; o < a; o++)
            n[o] = arguments[o];
          return (
            ct(mt((e = t.call.apply(t, [this].concat(n)))), "state", {
              height: null,
            }),
            ct(mt(e), "handleClick", function (t) {
              ((e.props.minTime || e.props.maxTime) && nr(t, e.props)) ||
                ((e.props.excludeTimes ||
                  e.props.includeTimes ||
                  e.props.filterTime) &&
                  ar(t, e.props)) ||
                e.props.onChange(t);
            }),
            ct(mt(e), "liClasses", function (t, r, a) {
              var n = [
                "react-datepicker__time-list-item",
                e.props.timeClassName ? e.props.timeClassName(t, r, a) : void 0,
              ];
              return (
                e.props.selected &&
                  r === ke.default(t) &&
                  a === we.default(t) &&
                  n.push("react-datepicker__time-list-item--selected"),
                (((e.props.minTime || e.props.maxTime) && nr(t, e.props)) ||
                  ((e.props.excludeTimes ||
                    e.props.includeTimes ||
                    e.props.filterTime) &&
                    ar(t, e.props))) &&
                  n.push("react-datepicker__time-list-item--disabled"),
                e.props.injectTimes &&
                  (60 * ke.default(t) + we.default(t)) % e.props.intervals !=
                    0 &&
                  n.push("react-datepicker__time-list-item--injected"),
                n.join(" ")
              );
            }),
            ct(mt(e), "handleOnKeyDown", function (t, r) {
              " " === t.key && (t.preventDefault(), (t.key = "Enter")),
                "Enter" === t.key && e.handleClick(r),
                e.props.handleOnKeyDown(t);
            }),
            ct(mt(e), "renderTimes", function () {
              for (
                var t = [],
                  r = e.props.format ? e.props.format : "p",
                  a = e.props.intervals,
                  n = Yt(St(e.props.selected)),
                  o = 1440 / a,
                  s =
                    e.props.injectTimes &&
                    e.props.injectTimes.sort(function (e, t) {
                      return e - t;
                    }),
                  i = e.props.selected || e.props.openToDate || St(),
                  p = ke.default(i),
                  l = we.default(i),
                  c = xe.default(Ne.default(n, l), p),
                  u = 0;
                u < o;
                u++
              ) {
                var d = pe.default(n, u * a);
                if ((t.push(d), s)) {
                  var f = dr(n, d, u, a, s);
                  t = t.concat(f);
                }
              }
              return t.map(function (t, a) {
                return ae.default.createElement(
                  "li",
                  {
                    key: a,
                    onClick: e.handleClick.bind(mt(e), t),
                    className: e.liClasses(t, p, l),
                    ref: function (r) {
                      (Je.default(t, c) || Bt(t, c)) && (e.centerLi = r);
                    },
                    onKeyDown: function (r) {
                      e.handleOnKeyDown(r, t);
                    },
                    tabIndex: "0",
                  },
                  Pt(t, r, e.props.locale)
                );
              });
            }),
            e
          );
        }
        return (
          lt(
            r,
            [
              {
                key: "componentDidMount",
                value: function () {
                  (this.list.scrollTop = r.calcCenterPosition(
                    this.props.monthRef
                      ? this.props.monthRef.clientHeight -
                          this.header.clientHeight
                      : this.list.clientHeight,
                    this.centerLi
                  )),
                    this.props.monthRef &&
                      this.header &&
                      this.setState({
                        height:
                          this.props.monthRef.clientHeight -
                          this.header.clientHeight,
                      });
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this,
                    t = this.state.height;
                  return ae.default.createElement(
                    "div",
                    {
                      className: "react-datepicker__time-container ".concat(
                        this.props.todayButton
                          ? "react-datepicker__time-container--with-today-button"
                          : ""
                      ),
                    },
                    ae.default.createElement(
                      "div",
                      {
                        className:
                          "react-datepicker__header react-datepicker__header--time ".concat(
                            this.props.showTimeSelectOnly
                              ? "react-datepicker__header--time--only"
                              : ""
                          ),
                        ref: function (t) {
                          e.header = t;
                        },
                      },
                      ae.default.createElement(
                        "div",
                        { className: "react-datepicker-time__header" },
                        this.props.timeCaption
                      )
                    ),
                    ae.default.createElement(
                      "div",
                      { className: "react-datepicker__time" },
                      ae.default.createElement(
                        "div",
                        { className: "react-datepicker__time-box" },
                        ae.default.createElement(
                          "ul",
                          {
                            className: "react-datepicker__time-list",
                            ref: function (t) {
                              e.list = t;
                            },
                            style: t ? { height: t } : {},
                            tabIndex: "0",
                          },
                          this.renderTimes()
                        )
                      )
                    )
                  );
                },
              },
            ],
            [
              {
                key: "defaultProps",
                get: function () {
                  return {
                    intervals: 30,
                    onTimeChange: function () {},
                    todayButton: null,
                    timeCaption: "Time",
                  };
                },
              },
            ]
          ),
          r
        );
      })();
    ct(xr, "calcCenterPosition", function (e, t) {
      return t.offsetTop - (e / 2 - t.clientHeight / 2);
    });
    var Or = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r(e) {
          var a;
          return (
            it(this, r),
            ct(
              mt((a = t.call(this, e))),
              "YEAR_REFS",
              Dt(Array(a.props.yearItemNumber)).map(function () {
                return ae.default.createRef();
              })
            ),
            ct(mt(a), "isDisabled", function (e) {
              return $t(e, a.props);
            }),
            ct(mt(a), "isExcluded", function (e) {
              return zt(e, a.props);
            }),
            ct(mt(a), "updateFocusOnPaginate", function (e) {
              var t = function () {
                this.YEAR_REFS[e].current.focus();
              }.bind(mt(a));
              window.requestAnimationFrame(t);
            }),
            ct(mt(a), "handleYearClick", function (e, t) {
              a.props.onDayClick && a.props.onDayClick(e, t);
            }),
            ct(mt(a), "handleYearNavigation", function (e, t) {
              var r = a.props,
                n = r.date,
                o = r.yearItemNumber,
                s = hr(n, o).startPeriod;
              a.isDisabled(t) ||
                a.isExcluded(t) ||
                (a.props.setPreSelection(t),
                e - s == -1
                  ? a.updateFocusOnPaginate(o - 1)
                  : e - s === o
                  ? a.updateFocusOnPaginate(0)
                  : a.YEAR_REFS[e - s].current.focus());
            }),
            ct(mt(a), "isSameDay", function (e, t) {
              return Kt(e, t);
            }),
            ct(mt(a), "isKeyboardSelected", function (e) {
              var t = Lt(Te.default(a.props.date, e));
              return (
                !a.props.disabledKeyboardNavigation &&
                !a.props.inline &&
                !Kt(t, Lt(a.props.selected)) &&
                Kt(t, Lt(a.props.preSelection))
              );
            }),
            ct(mt(a), "onYearClick", function (e, t) {
              var r = a.props.date;
              a.handleYearClick(Lt(Te.default(r, t)), e);
            }),
            ct(mt(a), "onYearKeyDown", function (e, t) {
              var r = e.key;
              if (!a.props.disabledKeyboardNavigation)
                switch (r) {
                  case "Enter":
                    a.onYearClick(e, t),
                      a.props.setPreSelection(a.props.selected);
                    break;
                  case "ArrowRight":
                    a.handleYearNavigation(
                      t + 1,
                      fe.default(a.props.preSelection, 1)
                    );
                    break;
                  case "ArrowLeft":
                    a.handleYearNavigation(
                      t - 1,
                      ve.default(a.props.preSelection, 1)
                    );
                }
            }),
            ct(mt(a), "getYearClassNames", function (e) {
              var t = a.props,
                r = t.minDate,
                n = t.maxDate,
                o = t.selected;
              return ne.default("react-datepicker__year-text", {
                "react-datepicker__year-text--selected": e === Me.default(o),
                "react-datepicker__year-text--disabled":
                  (r || n) && Zt(e, a.props),
                "react-datepicker__year-text--keyboard-selected":
                  a.isKeyboardSelected(e),
                "react-datepicker__year-text--today": e === Me.default(St()),
              });
            }),
            ct(mt(a), "getYearTabIndex", function (e) {
              return a.props.disabledKeyboardNavigation
                ? "-1"
                : e === Me.default(a.props.preSelection)
                ? "0"
                : "-1";
            }),
            a
          );
        }
        return (
          lt(r, [
            {
              key: "render",
              value: function () {
                for (
                  var e = this,
                    t = [],
                    r = this.props,
                    a = hr(r.date, r.yearItemNumber),
                    n = a.startPeriod,
                    o = a.endPeriod,
                    s = function (r) {
                      t.push(
                        ae.default.createElement(
                          "div",
                          {
                            ref: e.YEAR_REFS[r - n],
                            onClick: function (t) {
                              e.onYearClick(t, r);
                            },
                            onKeyDown: function (t) {
                              e.onYearKeyDown(t, r);
                            },
                            tabIndex: e.getYearTabIndex(r),
                            className: e.getYearClassNames(r),
                            key: r,
                          },
                          r
                        )
                      );
                    },
                    i = n;
                  i <= o;
                  i++
                )
                  s(i);
                return ae.default.createElement(
                  "div",
                  { className: "react-datepicker__year" },
                  ae.default.createElement(
                    "div",
                    { className: "react-datepicker__year-wrapper" },
                    t
                  )
                );
              },
            },
          ]),
          r
        );
      })(),
      Yr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r(e) {
          var a;
          return (
            it(this, r),
            ct(mt((a = t.call(this, e))), "onTimeChange", function (e) {
              a.setState({ time: e });
              var t = new Date();
              t.setHours(e.split(":")[0]),
                t.setMinutes(e.split(":")[1]),
                a.props.onChange(t);
            }),
            ct(mt(a), "renderTimeInput", function () {
              var e = a.state.time,
                t = a.props,
                r = t.date,
                n = t.timeString,
                o = t.customTimeInput;
              return o
                ? ae.default.cloneElement(o, {
                    date: r,
                    value: e,
                    onChange: a.onTimeChange,
                  })
                : ae.default.createElement("input", {
                    type: "time",
                    className: "react-datepicker-time__input",
                    placeholder: "Time",
                    name: "time-input",
                    required: !0,
                    value: e,
                    onChange: function (e) {
                      a.onTimeChange(e.target.value || n);
                    },
                  });
            }),
            (a.state = { time: a.props.timeString }),
            a
          );
        }
        return (
          lt(
            r,
            [
              {
                key: "render",
                value: function () {
                  return ae.default.createElement(
                    "div",
                    { className: "react-datepicker__input-time-container" },
                    ae.default.createElement(
                      "div",
                      { className: "react-datepicker-time__caption" },
                      this.props.timeInputLabel
                    ),
                    ae.default.createElement(
                      "div",
                      { className: "react-datepicker-time__input-container" },
                      ae.default.createElement(
                        "div",
                        { className: "react-datepicker-time__input" },
                        this.renderTimeInput()
                      )
                    )
                  );
                },
              },
            ],
            [
              {
                key: "getDerivedStateFromProps",
                value: function (e, t) {
                  return e.timeString !== t.time
                    ? { time: e.timeString }
                    : null;
                },
              },
            ]
          ),
          r
        );
      })();
    function Tr(e) {
      var t = e.className,
        r = e.children,
        a = e.showPopperArrow,
        n = e.arrowProps,
        o = void 0 === n ? {} : n;
      return ae.default.createElement(
        "div",
        { className: t },
        a &&
          ae.default.createElement(
            "div",
            ut({ className: "react-datepicker__triangle" }, o)
          ),
        r
      );
    }
    var Ir = [
        "react-datepicker__year-select",
        "react-datepicker__month-select",
        "react-datepicker__month-year-select",
      ],
      Lr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r(e) {
          var a;
          return (
            it(this, r),
            ct(mt((a = t.call(this, e))), "handleClickOutside", function (e) {
              a.props.onClickOutside(e);
            }),
            ct(mt(a), "setClickOutsideRef", function () {
              return a.containerRef.current;
            }),
            ct(mt(a), "handleDropdownFocus", function (e) {
              (function () {
                var e = (
                  (arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {}
                  ).className || ""
                ).split(/\s+/);
                return Ir.some(function (t) {
                  return e.indexOf(t) >= 0;
                });
              })(e.target) && a.props.onDropdownFocus();
            }),
            ct(mt(a), "getDateInView", function () {
              var e = a.props,
                t = e.preSelection,
                r = e.selected,
                n = e.openToDate,
                o = lr(a.props),
                s = cr(a.props),
                i = St(),
                p = n || r || t;
              return (
                p || (o && Je.default(i, o) ? o : s && Ge.default(i, s) ? s : i)
              );
            }),
            ct(mt(a), "increaseMonth", function () {
              a.setState(
                function (e) {
                  var t = e.date;
                  return { date: de.default(t, 1) };
                },
                function () {
                  return a.handleMonthChange(a.state.date);
                }
              );
            }),
            ct(mt(a), "decreaseMonth", function () {
              a.setState(
                function (e) {
                  var t = e.date;
                  return { date: ye.default(t, 1) };
                },
                function () {
                  return a.handleMonthChange(a.state.date);
                }
              );
            }),
            ct(mt(a), "handleDayClick", function (e, t, r) {
              a.props.onSelect(e, t, r),
                a.props.setPreSelection && a.props.setPreSelection(e);
            }),
            ct(mt(a), "handleDayMouseEnter", function (e) {
              a.setState({ selectingDate: e }),
                a.props.onDayMouseEnter && a.props.onDayMouseEnter(e);
            }),
            ct(mt(a), "handleMonthMouseLeave", function () {
              a.setState({ selectingDate: null }),
                a.props.onMonthMouseLeave && a.props.onMonthMouseLeave();
            }),
            ct(mt(a), "handleYearChange", function (e) {
              a.props.onYearChange && a.props.onYearChange(e),
                a.props.adjustDateOnChange &&
                  (a.props.onSelect && a.props.onSelect(e),
                  a.props.setOpen && a.props.setOpen(!0)),
                a.props.setPreSelection && a.props.setPreSelection(e);
            }),
            ct(mt(a), "handleMonthChange", function (e) {
              a.props.onMonthChange && a.props.onMonthChange(e),
                a.props.adjustDateOnChange &&
                  (a.props.onSelect && a.props.onSelect(e),
                  a.props.setOpen && a.props.setOpen(!0)),
                a.props.setPreSelection && a.props.setPreSelection(e);
            }),
            ct(mt(a), "handleMonthYearChange", function (e) {
              a.handleYearChange(e), a.handleMonthChange(e);
            }),
            ct(mt(a), "changeYear", function (e) {
              a.setState(
                function (t) {
                  var r = t.date;
                  return { date: Te.default(r, e) };
                },
                function () {
                  return a.handleYearChange(a.state.date);
                }
              );
            }),
            ct(mt(a), "changeMonth", function (e) {
              a.setState(
                function (t) {
                  var r = t.date;
                  return { date: Oe.default(r, e) };
                },
                function () {
                  return a.handleMonthChange(a.state.date);
                }
              );
            }),
            ct(mt(a), "changeMonthYear", function (e) {
              a.setState(
                function (t) {
                  var r = t.date;
                  return {
                    date: Te.default(
                      Oe.default(r, Se.default(e)),
                      Me.default(e)
                    ),
                  };
                },
                function () {
                  return a.handleMonthYearChange(a.state.date);
                }
              );
            }),
            ct(mt(a), "header", function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : a.state.date,
                t = Tt(e, a.props.locale, a.props.calendarStartDay),
                r = [];
              return (
                a.props.showWeekNumbers &&
                  r.push(
                    ae.default.createElement(
                      "div",
                      { key: "W", className: "react-datepicker__day-name" },
                      a.props.weekLabel || "#"
                    )
                  ),
                r.concat(
                  [0, 1, 2, 3, 4, 5, 6].map(function (e) {
                    var r = ce.default(t, e),
                      n = a.formatWeekday(r, a.props.locale),
                      o = a.props.weekDayClassName
                        ? a.props.weekDayClassName(r)
                        : void 0;
                    return ae.default.createElement(
                      "div",
                      {
                        key: e,
                        className: ne.default("react-datepicker__day-name", o),
                      },
                      n
                    );
                  })
                )
              );
            }),
            ct(mt(a), "formatWeekday", function (e, t) {
              return a.props.formatWeekDay
                ? (function (e, t, r) {
                    return t(Pt(e, "EEEE", r));
                  })(e, a.props.formatWeekDay, t)
                : a.props.useWeekdaysShort
                ? (function (e, t) {
                    return Pt(e, "EEE", t);
                  })(e, t)
                : (function (e, t) {
                    return Pt(e, "EEEEEE", t);
                  })(e, t);
            }),
            ct(mt(a), "decreaseYear", function () {
              a.setState(
                function (e) {
                  var t = e.date;
                  return {
                    date: ve.default(
                      t,
                      a.props.showYearPicker ? a.props.yearItemNumber : 1
                    ),
                  };
                },
                function () {
                  return a.handleYearChange(a.state.date);
                }
              );
            }),
            ct(mt(a), "renderPreviousButton", function () {
              if (!a.props.renderCustomHeader) {
                var e;
                switch (!0) {
                  case a.props.showMonthYearPicker:
                    e = ir(a.state.date, a.props);
                    break;
                  case a.props.showYearPicker:
                    e = (function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {},
                        r = t.minDate,
                        a = t.yearItemNumber,
                        n = void 0 === a ? 12 : a,
                        o = hr(Lt(ve.default(e, n)), n).endPeriod,
                        s = r && Me.default(r);
                      return (s && s > o) || !1;
                    })(a.state.date, a.props);
                    break;
                  default:
                    e = or(a.state.date, a.props);
                }
                if (
                  (a.props.forceShowMonthNavigation ||
                    a.props.showDisabledMonthNavigation ||
                    !e) &&
                  !a.props.showTimeSelectOnly
                ) {
                  var t = [
                      "react-datepicker__navigation",
                      "react-datepicker__navigation--previous",
                    ],
                    r = a.decreaseMonth;
                  (a.props.showMonthYearPicker ||
                    a.props.showQuarterYearPicker ||
                    a.props.showYearPicker) &&
                    (r = a.decreaseYear),
                    e &&
                      a.props.showDisabledMonthNavigation &&
                      (t.push(
                        "react-datepicker__navigation--previous--disabled"
                      ),
                      (r = null));
                  var n =
                      a.props.showMonthYearPicker ||
                      a.props.showQuarterYearPicker ||
                      a.props.showYearPicker,
                    o = a.props,
                    s = o.previousMonthButtonLabel,
                    i = o.previousYearButtonLabel,
                    p = a.props,
                    l = p.previousMonthAriaLabel,
                    c =
                      void 0 === l
                        ? "string" == typeof s
                          ? s
                          : "Previous Month"
                        : l,
                    u = p.previousYearAriaLabel,
                    d =
                      void 0 === u
                        ? "string" == typeof i
                          ? i
                          : "Previous Year"
                        : u;
                  return ae.default.createElement(
                    "button",
                    {
                      type: "button",
                      className: t.join(" "),
                      onClick: r,
                      onKeyDown: a.props.handleOnKeyDown,
                      "aria-label": n ? d : c,
                    },
                    ae.default.createElement(
                      "span",
                      {
                        className: [
                          "react-datepicker__navigation-icon",
                          "react-datepicker__navigation-icon--previous",
                        ].join(" "),
                      },
                      n
                        ? a.props.previousYearButtonLabel
                        : a.props.previousMonthButtonLabel
                    )
                  );
                }
              }
            }),
            ct(mt(a), "increaseYear", function () {
              a.setState(
                function (e) {
                  var t = e.date;
                  return {
                    date: fe.default(
                      t,
                      a.props.showYearPicker ? a.props.yearItemNumber : 1
                    ),
                  };
                },
                function () {
                  return a.handleYearChange(a.state.date);
                }
              );
            }),
            ct(mt(a), "renderNextButton", function () {
              if (!a.props.renderCustomHeader) {
                var e;
                switch (!0) {
                  case a.props.showMonthYearPicker:
                    e = pr(a.state.date, a.props);
                    break;
                  case a.props.showYearPicker:
                    e = (function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {},
                        r = t.maxDate,
                        a = t.yearItemNumber,
                        n = void 0 === a ? 12 : a,
                        o = hr(fe.default(e, n), n).startPeriod,
                        s = r && Me.default(r);
                      return (s && s < o) || !1;
                    })(a.state.date, a.props);
                    break;
                  default:
                    e = sr(a.state.date, a.props);
                }
                if (
                  (a.props.forceShowMonthNavigation ||
                    a.props.showDisabledMonthNavigation ||
                    !e) &&
                  !a.props.showTimeSelectOnly
                ) {
                  var t = [
                    "react-datepicker__navigation",
                    "react-datepicker__navigation--next",
                  ];
                  a.props.showTimeSelect &&
                    t.push("react-datepicker__navigation--next--with-time"),
                    a.props.todayButton &&
                      t.push(
                        "react-datepicker__navigation--next--with-today-button"
                      );
                  var r = a.increaseMonth;
                  (a.props.showMonthYearPicker ||
                    a.props.showQuarterYearPicker ||
                    a.props.showYearPicker) &&
                    (r = a.increaseYear),
                    e &&
                      a.props.showDisabledMonthNavigation &&
                      (t.push("react-datepicker__navigation--next--disabled"),
                      (r = null));
                  var n =
                      a.props.showMonthYearPicker ||
                      a.props.showQuarterYearPicker ||
                      a.props.showYearPicker,
                    o = a.props,
                    s = o.nextMonthButtonLabel,
                    i = o.nextYearButtonLabel,
                    p = a.props,
                    l = p.nextMonthAriaLabel,
                    c =
                      void 0 === l
                        ? "string" == typeof s
                          ? s
                          : "Next Month"
                        : l,
                    u = p.nextYearAriaLabel,
                    d =
                      void 0 === u
                        ? "string" == typeof i
                          ? i
                          : "Next Year"
                        : u;
                  return ae.default.createElement(
                    "button",
                    {
                      type: "button",
                      className: t.join(" "),
                      onClick: r,
                      onKeyDown: a.props.handleOnKeyDown,
                      "aria-label": n ? d : c,
                    },
                    ae.default.createElement(
                      "span",
                      {
                        className: [
                          "react-datepicker__navigation-icon",
                          "react-datepicker__navigation-icon--next",
                        ].join(" "),
                      },
                      n
                        ? a.props.nextYearButtonLabel
                        : a.props.nextMonthButtonLabel
                    )
                  );
                }
              }
            }),
            ct(mt(a), "renderCurrentMonth", function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : a.state.date,
                t = ["react-datepicker__current-month"];
              return (
                a.props.showYearDropdown &&
                  t.push("react-datepicker__current-month--hasYearDropdown"),
                a.props.showMonthDropdown &&
                  t.push("react-datepicker__current-month--hasMonthDropdown"),
                a.props.showMonthYearDropdown &&
                  t.push(
                    "react-datepicker__current-month--hasMonthYearDropdown"
                  ),
                ae.default.createElement(
                  "div",
                  { className: t.join(" ") },
                  Pt(e, a.props.dateFormat, a.props.locale)
                )
              );
            }),
            ct(mt(a), "renderYearDropdown", function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              if (a.props.showYearDropdown && !e)
                return ae.default.createElement(Dr, {
                  adjustDateOnChange: a.props.adjustDateOnChange,
                  date: a.state.date,
                  onSelect: a.props.onSelect,
                  setOpen: a.props.setOpen,
                  dropdownMode: a.props.dropdownMode,
                  onChange: a.changeYear,
                  minDate: a.props.minDate,
                  maxDate: a.props.maxDate,
                  year: Me.default(a.state.date),
                  scrollableYearDropdown: a.props.scrollableYearDropdown,
                  yearDropdownItemNumber: a.props.yearDropdownItemNumber,
                });
            }),
            ct(mt(a), "renderMonthDropdown", function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              if (a.props.showMonthDropdown && !e)
                return ae.default.createElement(gr, {
                  dropdownMode: a.props.dropdownMode,
                  locale: a.props.locale,
                  onChange: a.changeMonth,
                  month: Se.default(a.state.date),
                  useShortMonthInDropdown: a.props.useShortMonthInDropdown,
                });
            }),
            ct(mt(a), "renderMonthYearDropdown", function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              if (a.props.showMonthYearDropdown && !e)
                return ae.default.createElement(_r, {
                  dropdownMode: a.props.dropdownMode,
                  locale: a.props.locale,
                  dateFormat: a.props.dateFormat,
                  onChange: a.changeMonthYear,
                  minDate: a.props.minDate,
                  maxDate: a.props.maxDate,
                  date: a.state.date,
                  scrollableMonthYearDropdown:
                    a.props.scrollableMonthYearDropdown,
                });
            }),
            ct(mt(a), "renderTodayButton", function () {
              if (a.props.todayButton && !a.props.showTimeSelectOnly)
                return ae.default.createElement(
                  "div",
                  {
                    className: "react-datepicker__today-button",
                    onClick: function (e) {
                      return a.props.onSelect(qe.default(St()), e);
                    },
                  },
                  a.props.todayButton
                );
            }),
            ct(mt(a), "renderDefaultHeader", function (e) {
              var t = e.monthDate,
                r = e.i;
              return ae.default.createElement(
                "div",
                {
                  className: "react-datepicker__header ".concat(
                    a.props.showTimeSelect
                      ? "react-datepicker__header--has-time-select"
                      : ""
                  ),
                },
                a.renderCurrentMonth(t),
                ae.default.createElement(
                  "div",
                  {
                    className:
                      "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(
                        a.props.dropdownMode
                      ),
                    onFocus: a.handleDropdownFocus,
                  },
                  a.renderMonthDropdown(0 !== r),
                  a.renderMonthYearDropdown(0 !== r),
                  a.renderYearDropdown(0 !== r)
                ),
                ae.default.createElement(
                  "div",
                  { className: "react-datepicker__day-names" },
                  a.header(t)
                )
              );
            }),
            ct(mt(a), "renderCustomHeader", function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                t = e.monthDate,
                r = e.i;
              if (
                (a.props.showTimeSelect && !a.state.monthContainer) ||
                a.props.showTimeSelectOnly
              )
                return null;
              var n = or(a.state.date, a.props),
                o = sr(a.state.date, a.props),
                s = ir(a.state.date, a.props),
                i = pr(a.state.date, a.props),
                p =
                  !a.props.showMonthYearPicker &&
                  !a.props.showQuarterYearPicker &&
                  !a.props.showYearPicker;
              return ae.default.createElement(
                "div",
                {
                  className:
                    "react-datepicker__header react-datepicker__header--custom",
                  onFocus: a.props.onDropdownFocus,
                },
                a.props.renderCustomHeader(
                  ot(
                    ot({}, a.state),
                    {},
                    {
                      customHeaderCount: r,
                      monthDate: t,
                      changeMonth: a.changeMonth,
                      changeYear: a.changeYear,
                      decreaseMonth: a.decreaseMonth,
                      increaseMonth: a.increaseMonth,
                      decreaseYear: a.decreaseYear,
                      increaseYear: a.increaseYear,
                      prevMonthButtonDisabled: n,
                      nextMonthButtonDisabled: o,
                      prevYearButtonDisabled: s,
                      nextYearButtonDisabled: i,
                    }
                  )
                ),
                p &&
                  ae.default.createElement(
                    "div",
                    { className: "react-datepicker__day-names" },
                    a.header(t)
                  )
              );
            }),
            ct(mt(a), "renderYearHeader", function () {
              var e = a.state.date,
                t = a.props,
                r = t.showYearPicker,
                n = hr(e, t.yearItemNumber),
                o = n.startPeriod,
                s = n.endPeriod;
              return ae.default.createElement(
                "div",
                {
                  className:
                    "react-datepicker__header react-datepicker-year-header",
                },
                r ? "".concat(o, " - ").concat(s) : Me.default(e)
              );
            }),
            ct(mt(a), "renderHeader", function (e) {
              switch (!0) {
                case void 0 !== a.props.renderCustomHeader:
                  return a.renderCustomHeader(e);
                case a.props.showMonthYearPicker ||
                  a.props.showQuarterYearPicker ||
                  a.props.showYearPicker:
                  return a.renderYearHeader(e);
                default:
                  return a.renderDefaultHeader(e);
              }
            }),
            ct(mt(a), "renderMonths", function () {
              if (!a.props.showTimeSelectOnly && !a.props.showYearPicker) {
                for (
                  var e = [],
                    t = a.props.showPreviousMonths
                      ? a.props.monthsShown - 1
                      : 0,
                    r = ye.default(a.state.date, t),
                    n = 0;
                  n < a.props.monthsShown;
                  ++n
                ) {
                  var o = n - a.props.monthSelectedIn,
                    s = de.default(r, o),
                    i = "month-".concat(n),
                    p = n < a.props.monthsShown - 1,
                    l = n > 0;
                  e.push(
                    ae.default.createElement(
                      "div",
                      {
                        key: i,
                        ref: function (e) {
                          a.monthContainer = e;
                        },
                        className: "react-datepicker__month-container",
                      },
                      a.renderHeader({ monthDate: s, i: n }),
                      ae.default.createElement(Nr, {
                        chooseDayAriaLabelPrefix:
                          a.props.chooseDayAriaLabelPrefix,
                        disabledDayAriaLabelPrefix:
                          a.props.disabledDayAriaLabelPrefix,
                        weekAriaLabelPrefix: a.props.weekAriaLabelPrefix,
                        onChange: a.changeMonthYear,
                        day: s,
                        dayClassName: a.props.dayClassName,
                        calendarStartDay: a.props.calendarStartDay,
                        monthClassName: a.props.monthClassName,
                        onDayClick: a.handleDayClick,
                        handleOnKeyDown: a.props.handleOnDayKeyDown,
                        onDayMouseEnter: a.handleDayMouseEnter,
                        onMouseLeave: a.handleMonthMouseLeave,
                        onWeekSelect: a.props.onWeekSelect,
                        orderInDisplay: n,
                        formatWeekNumber: a.props.formatWeekNumber,
                        locale: a.props.locale,
                        minDate: a.props.minDate,
                        maxDate: a.props.maxDate,
                        excludeDates: a.props.excludeDates,
                        highlightDates: a.props.highlightDates,
                        selectingDate: a.state.selectingDate,
                        includeDates: a.props.includeDates,
                        inline: a.props.inline,
                        shouldFocusDayInline: a.props.shouldFocusDayInline,
                        fixedHeight: a.props.fixedHeight,
                        filterDate: a.props.filterDate,
                        preSelection: a.props.preSelection,
                        setPreSelection: a.props.setPreSelection,
                        selected: a.props.selected,
                        selectsStart: a.props.selectsStart,
                        selectsEnd: a.props.selectsEnd,
                        selectsRange: a.props.selectsRange,
                        showWeekNumbers: a.props.showWeekNumbers,
                        startDate: a.props.startDate,
                        endDate: a.props.endDate,
                        peekNextMonth: a.props.peekNextMonth,
                        setOpen: a.props.setOpen,
                        shouldCloseOnSelect: a.props.shouldCloseOnSelect,
                        renderDayContents: a.props.renderDayContents,
                        disabledKeyboardNavigation:
                          a.props.disabledKeyboardNavigation,
                        showMonthYearPicker: a.props.showMonthYearPicker,
                        showFullMonthYearPicker:
                          a.props.showFullMonthYearPicker,
                        showTwoColumnMonthYearPicker:
                          a.props.showTwoColumnMonthYearPicker,
                        showFourColumnMonthYearPicker:
                          a.props.showFourColumnMonthYearPicker,
                        showYearPicker: a.props.showYearPicker,
                        showQuarterYearPicker: a.props.showQuarterYearPicker,
                        isInputFocused: a.props.isInputFocused,
                        containerRef: a.containerRef,
                        monthShowsDuplicateDaysEnd: p,
                        monthShowsDuplicateDaysStart: l,
                      })
                    )
                  );
                }
                return e;
              }
            }),
            ct(mt(a), "renderYears", function () {
              if (!a.props.showTimeSelectOnly)
                return a.props.showYearPicker
                  ? ae.default.createElement(
                      "div",
                      { className: "react-datepicker__year--container" },
                      a.renderHeader(),
                      ae.default.createElement(
                        Or,
                        ut(
                          { onDayClick: a.handleDayClick, date: a.state.date },
                          a.props
                        )
                      )
                    )
                  : void 0;
            }),
            ct(mt(a), "renderTimeSection", function () {
              if (
                a.props.showTimeSelect &&
                (a.state.monthContainer || a.props.showTimeSelectOnly)
              )
                return ae.default.createElement(xr, {
                  selected: a.props.selected,
                  openToDate: a.props.openToDate,
                  onChange: a.props.onTimeChange,
                  timeClassName: a.props.timeClassName,
                  format: a.props.timeFormat,
                  includeTimes: a.props.includeTimes,
                  intervals: a.props.timeIntervals,
                  minTime: a.props.minTime,
                  maxTime: a.props.maxTime,
                  excludeTimes: a.props.excludeTimes,
                  filterTime: a.props.filterTime,
                  timeCaption: a.props.timeCaption,
                  todayButton: a.props.todayButton,
                  showMonthDropdown: a.props.showMonthDropdown,
                  showMonthYearDropdown: a.props.showMonthYearDropdown,
                  showYearDropdown: a.props.showYearDropdown,
                  withPortal: a.props.withPortal,
                  monthRef: a.state.monthContainer,
                  injectTimes: a.props.injectTimes,
                  locale: a.props.locale,
                  handleOnKeyDown: a.props.handleOnKeyDown,
                  showTimeSelectOnly: a.props.showTimeSelectOnly,
                });
            }),
            ct(mt(a), "renderInputTimeSection", function () {
              var e = new Date(a.props.selected),
                t =
                  Mt(e) && Boolean(a.props.selected)
                    ? ""
                        .concat(fr(e.getHours()), ":")
                        .concat(fr(e.getMinutes()))
                    : "";
              if (a.props.showTimeInput)
                return ae.default.createElement(Yr, {
                  date: e,
                  timeString: t,
                  timeInputLabel: a.props.timeInputLabel,
                  onChange: a.props.onTimeChange,
                  customTimeInput: a.props.customTimeInput,
                });
            }),
            (a.containerRef = ae.default.createRef()),
            (a.state = {
              date: a.getDateInView(),
              selectingDate: null,
              monthContainer: null,
            }),
            a
          );
        }
        return (
          lt(
            r,
            [
              {
                key: "componentDidMount",
                value: function () {
                  var e = this;
                  this.props.showTimeSelect &&
                    (this.assignMonthContainer = void e.setState({
                      monthContainer: e.monthContainer,
                    }));
                },
              },
              {
                key: "componentDidUpdate",
                value: function (e) {
                  this.props.preSelection &&
                  !Kt(this.props.preSelection, e.preSelection)
                    ? this.setState({ date: this.props.preSelection })
                    : this.props.openToDate &&
                      !Kt(this.props.openToDate, e.openToDate) &&
                      this.setState({ date: this.props.openToDate });
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this.props.container || Tr;
                  return ae.default.createElement(
                    "div",
                    { ref: this.containerRef },
                    ae.default.createElement(
                      e,
                      {
                        className: ne.default(
                          "react-datepicker",
                          this.props.className,
                          {
                            "react-datepicker--time-only":
                              this.props.showTimeSelectOnly,
                          }
                        ),
                        showPopperArrow: this.props.showPopperArrow,
                        arrowProps: this.props.arrowProps,
                      },
                      this.renderPreviousButton(),
                      this.renderNextButton(),
                      this.renderMonths(),
                      this.renderYears(),
                      this.renderTodayButton(),
                      this.renderTimeSection(),
                      this.renderInputTimeSection(),
                      this.props.children
                    )
                  );
                },
              },
            ],
            [
              {
                key: "defaultProps",
                get: function () {
                  return {
                    onDropdownFocus: function () {},
                    monthsShown: 1,
                    monthSelectedIn: 0,
                    forceShowMonthNavigation: !1,
                    timeCaption: "Time",
                    previousYearButtonLabel: "Previous Year",
                    nextYearButtonLabel: "Next Year",
                    previousMonthButtonLabel: "Previous Month",
                    nextMonthButtonLabel: "Next Month",
                    customTimeInput: null,
                    yearItemNumber: 12,
                  };
                },
              },
            ]
          ),
          r
        );
      })(),
      Fr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r(e) {
          var a;
          return (
            it(this, r),
            ((a = t.call(this, e)).el = document.createElement("div")),
            a
          );
        }
        return (
          lt(r, [
            {
              key: "componentDidMount",
              value: function () {
                (this.portalRoot = document.getElementById(
                  this.props.portalId
                )),
                  this.portalRoot ||
                    ((this.portalRoot = document.createElement("div")),
                    this.portalRoot.setAttribute("id", this.props.portalId),
                    document.body.appendChild(this.portalRoot)),
                  this.portalRoot.appendChild(this.el);
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                this.portalRoot.removeChild(this.el);
              },
            },
            {
              key: "render",
              value: function () {
                return at.default.createPortal(this.props.children, this.el);
              },
            },
          ]),
          r
        );
      })(),
      Rr = function (e) {
        return !e.disabled && -1 !== e.tabIndex;
      },
      Ar = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r(e) {
          var a;
          return (
            it(this, r),
            ct(mt((a = t.call(this, e))), "getTabChildren", function () {
              return Array.prototype.slice
                .call(
                  a.tabLoopRef.current.querySelectorAll(
                    "[tabindex], a, button, input, select, textarea"
                  ),
                  1,
                  -1
                )
                .filter(Rr);
            }),
            ct(mt(a), "handleFocusStart", function (e) {
              var t = a.getTabChildren();
              t && t.length > 1 && t[t.length - 1].focus();
            }),
            ct(mt(a), "handleFocusEnd", function (e) {
              var t = a.getTabChildren();
              t && t.length > 1 && t[0].focus();
            }),
            (a.tabLoopRef = ae.default.createRef()),
            a
          );
        }
        return (
          lt(
            r,
            [
              {
                key: "render",
                value: function () {
                  return this.props.enableTabLoop
                    ? ae.default.createElement(
                        "div",
                        {
                          className: "react-datepicker__tab-loop",
                          ref: this.tabLoopRef,
                        },
                        ae.default.createElement("div", {
                          className: "react-datepicker__tab-loop__start",
                          tabIndex: "0",
                          onFocus: this.handleFocusStart,
                        }),
                        this.props.children,
                        ae.default.createElement("div", {
                          className: "react-datepicker__tab-loop__end",
                          tabIndex: "0",
                          onFocus: this.handleFocusEnd,
                        })
                      )
                    : this.props.children;
                },
              },
            ],
            [
              {
                key: "defaultProps",
                get: function () {
                  return { enableTabLoop: !0 };
                },
              },
            ]
          ),
          r
        );
      })(),
      qr = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r() {
          return it(this, r), t.apply(this, arguments);
        }
        return (
          lt(
            r,
            [
              {
                key: "render",
                value: function () {
                  var e,
                    t = this.props,
                    r = t.className,
                    a = t.wrapperClassName,
                    n = t.hidePopper,
                    o = t.popperComponent,
                    s = t.popperModifiers,
                    i = t.popperPlacement,
                    p = t.popperProps,
                    l = t.targetComponent,
                    c = t.enableTabLoop,
                    u = t.popperOnKeyDown,
                    d = t.portalId;
                  if (!n) {
                    var f = ne.default("react-datepicker-popper", r);
                    e = ae.default.createElement(
                      te.Popper,
                      ut({ modifiers: s, placement: i }, p),
                      function (e) {
                        var t = e.ref,
                          r = e.style,
                          a = e.placement,
                          n = e.arrowProps;
                        return ae.default.createElement(
                          Ar,
                          { enableTabLoop: c },
                          ae.default.createElement(
                            "div",
                            {
                              ref: t,
                              style: r,
                              className: f,
                              "data-placement": a,
                              onKeyDown: u,
                            },
                            ae.default.cloneElement(o, { arrowProps: n })
                          )
                        );
                      }
                    );
                  }
                  this.props.popperContainer &&
                    (e = ae.default.createElement(
                      this.props.popperContainer,
                      {},
                      e
                    )),
                    d &&
                      !n &&
                      (e = ae.default.createElement(Fr, { portalId: d }, e));
                  var h = ne.default("react-datepicker-wrapper", a);
                  return ae.default.createElement(
                    te.Manager,
                    { className: "react-datepicker-manager" },
                    ae.default.createElement(te.Reference, null, function (e) {
                      var t = e.ref;
                      return ae.default.createElement(
                        "div",
                        { ref: t, className: h },
                        l
                      );
                    }),
                    e
                  );
                },
              },
            ],
            [
              {
                key: "defaultProps",
                get: function () {
                  return {
                    hidePopper: !0,
                    popperModifiers: [],
                    popperProps: {},
                    popperPlacement: "bottom-start",
                  };
                },
              },
            ]
          ),
          r
        );
      })(),
      Kr = rt.default(Lr);
    var Br = (function (e) {
        dt(r, ae["default"].Component);
        var t = vt(r);
        function r(e) {
          var a;
          return (
            it(this, r),
            ct(mt((a = t.call(this, e))), "getPreSelection", function () {
              return a.props.openToDate
                ? a.props.openToDate
                : a.props.selectsEnd && a.props.startDate
                ? a.props.startDate
                : a.props.selectsStart && a.props.endDate
                ? a.props.endDate
                : St();
            }),
            ct(mt(a), "calcInitialState", function () {
              var e,
                t = a.getPreSelection(),
                r = lr(a.props),
                n = cr(a.props),
                o =
                  r && Je.default(t, qe.default(r))
                    ? r
                    : n && Ge.default(t, He.default(n))
                    ? n
                    : t;
              return {
                open: a.props.startOpen || !1,
                preventFocus: !1,
                preSelection:
                  null !==
                    (e = a.props.selectsRange
                      ? a.props.startDate
                      : a.props.selected) && void 0 !== e
                    ? e
                    : o,
                highlightDates: ur(a.props.highlightDates),
                focused: !1,
                shouldFocusDayInline: !1,
              };
            }),
            ct(mt(a), "clearPreventFocusTimeout", function () {
              a.preventFocusTimeout && clearTimeout(a.preventFocusTimeout);
            }),
            ct(mt(a), "setFocus", function () {
              a.input && a.input.focus && a.input.focus({ preventScroll: !0 });
            }),
            ct(mt(a), "setBlur", function () {
              a.input && a.input.blur && a.input.blur(), a.cancelFocusInput();
            }),
            ct(mt(a), "setOpen", function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              a.setState(
                {
                  open: e,
                  preSelection:
                    e && a.state.open
                      ? a.state.preSelection
                      : a.calcInitialState().preSelection,
                  lastPreSelectChange: jr,
                },
                function () {
                  e ||
                    a.setState(
                      function (e) {
                        return { focused: !!t && e.focused };
                      },
                      function () {
                        !t && a.setBlur(), a.setState({ inputValue: null });
                      }
                    );
                }
              );
            }),
            ct(mt(a), "inputOk", function () {
              return oe.default(a.state.preSelection);
            }),
            ct(mt(a), "isCalendarOpen", function () {
              return void 0 === a.props.open
                ? a.state.open && !a.props.disabled && !a.props.readOnly
                : a.props.open;
            }),
            ct(mt(a), "handleFocus", function (e) {
              a.state.preventFocus ||
                (a.props.onFocus(e),
                a.props.preventOpenOnFocus ||
                  a.props.readOnly ||
                  a.setOpen(!0)),
                a.setState({ focused: !0 });
            }),
            ct(mt(a), "cancelFocusInput", function () {
              clearTimeout(a.inputFocusTimeout), (a.inputFocusTimeout = null);
            }),
            ct(mt(a), "deferFocusInput", function () {
              a.cancelFocusInput(),
                (a.inputFocusTimeout = setTimeout(function () {
                  return a.setFocus();
                }, 1));
            }),
            ct(mt(a), "handleDropdownFocus", function () {
              a.cancelFocusInput();
            }),
            ct(mt(a), "handleBlur", function (e) {
              (!a.state.open || a.props.withPortal || a.props.showTimeInput) &&
                a.props.onBlur(e),
                a.setState({ focused: !1 });
            }),
            ct(mt(a), "handleCalendarClickOutside", function (e) {
              a.props.inline || a.setOpen(!1),
                a.props.onClickOutside(e),
                a.props.withPortal && e.preventDefault();
            }),
            ct(mt(a), "handleChange", function () {
              for (
                var e = arguments.length, t = new Array(e), r = 0;
                r < e;
                r++
              )
                t[r] = arguments[r];
              var n = t[0];
              if (
                !a.props.onChangeRaw ||
                (a.props.onChangeRaw.apply(mt(a), t),
                "function" == typeof n.isDefaultPrevented &&
                  !n.isDefaultPrevented())
              ) {
                a.setState({
                  inputValue: n.target.value,
                  lastPreSelectChange: Wr,
                });
                var o = _t(
                  n.target.value,
                  a.props.dateFormat,
                  a.props.locale,
                  a.props.strictParsing,
                  a.props.minDate
                );
                (!o && n.target.value) || a.setSelected(o, n, !0);
              }
            }),
            ct(mt(a), "handleSelect", function (e, t, r) {
              if (
                (a.setState({ preventFocus: !0 }, function () {
                  return (
                    (a.preventFocusTimeout = setTimeout(function () {
                      return a.setState({ preventFocus: !1 });
                    }, 50)),
                    a.preventFocusTimeout
                  );
                }),
                a.props.onChangeRaw && a.props.onChangeRaw(t),
                a.setSelected(e, t, !1, r),
                !a.props.shouldCloseOnSelect || a.props.showTimeSelect)
              )
                a.setPreSelection(e);
              else if (!a.props.inline) {
                a.props.selectsRange || a.setOpen(!1);
                var n = a.props,
                  o = n.startDate,
                  s = n.endDate;
                !o || s || Je.default(e, o) || a.setOpen(!1);
              }
            }),
            ct(mt(a), "setSelected", function (e, t, r, n) {
              var o = e;
              if (null === o || !$t(o, a.props)) {
                var s = a.props,
                  i = s.onChange,
                  p = s.selectsRange,
                  l = s.startDate,
                  c = s.endDate;
                if (!Bt(a.props.selected, o) || a.props.allowSameDay || p)
                  if (
                    (null !== o &&
                      (!a.props.selected ||
                        (r &&
                          (a.props.showTimeSelect ||
                            a.props.showTimeSelectOnly ||
                            a.props.showTimeInput)) ||
                        (o = Nt(o, {
                          hour: ke.default(a.props.selected),
                          minute: we.default(a.props.selected),
                          second: De.default(a.props.selected),
                        })),
                      a.props.inline || a.setState({ preSelection: o }),
                      a.props.focusSelectedMonth ||
                        a.setState({ monthSelectedIn: n })),
                    p)
                  ) {
                    var u = l && !c,
                      d = l && c;
                    !l && !c
                      ? i([o, null], t)
                      : u &&
                        (Je.default(o, l) ? i([o, null], t) : i([l, o], t)),
                      d && i([o, null], t);
                  } else i(o, t);
                r || (a.props.onSelect(o, t), a.setState({ inputValue: null }));
              }
            }),
            ct(mt(a), "setPreSelection", function (e) {
              var t = void 0 !== a.props.minDate,
                r = void 0 !== a.props.maxDate,
                n = !0;
              if (e) {
                var o = qe.default(e);
                if (t && r) n = Wt(e, a.props.minDate, a.props.maxDate);
                else if (t) {
                  var s = qe.default(a.props.minDate);
                  n = Ge.default(e, s) || Bt(o, s);
                } else if (r) {
                  var i = He.default(a.props.maxDate);
                  n = Je.default(e, i) || Bt(o, i);
                }
              }
              n && a.setState({ preSelection: e });
            }),
            ct(mt(a), "handleTimeChange", function (e) {
              var t = Nt(
                a.props.selected ? a.props.selected : a.getPreSelection(),
                { hour: ke.default(e), minute: we.default(e) }
              );
              a.setState({ preSelection: t }),
                a.props.onChange(t),
                a.props.shouldCloseOnSelect && a.setOpen(!1),
                a.props.showTimeInput && a.setOpen(!0),
                a.setState({ inputValue: null });
            }),
            ct(mt(a), "onInputClick", function () {
              a.props.disabled || a.props.readOnly || a.setOpen(!0),
                a.props.onInputClick();
            }),
            ct(mt(a), "onInputKeyDown", function (e) {
              a.props.onKeyDown(e);
              var t = e.key;
              if (
                a.state.open ||
                a.props.inline ||
                a.props.preventOpenOnFocus
              ) {
                if (a.state.open) {
                  if ("ArrowDown" === t || "ArrowUp" === t) {
                    e.preventDefault();
                    var r =
                      a.calendar.componentNode &&
                      a.calendar.componentNode.querySelector(
                        '.react-datepicker__day[tabindex="0"]'
                      );
                    return void (r && r.focus({ preventScroll: !0 }));
                  }
                  var n = St(a.state.preSelection);
                  "Enter" === t
                    ? (e.preventDefault(),
                      a.inputOk() && a.state.lastPreSelectChange === jr
                        ? (a.handleSelect(n, e),
                          !a.props.shouldCloseOnSelect && a.setPreSelection(n))
                        : a.setOpen(!1))
                    : "Escape" === t && (e.preventDefault(), a.setOpen(!1)),
                    a.inputOk() ||
                      a.props.onInputError({
                        code: 1,
                        msg: "Date input not valid.",
                      });
                }
              } else ("ArrowDown" !== t && "ArrowUp" !== t && "Enter" !== t) || a.onInputClick();
            }),
            ct(mt(a), "onDayKeyDown", function (e) {
              a.props.onKeyDown(e);
              var t = e.key,
                r = St(a.state.preSelection);
              if ("Enter" === t)
                e.preventDefault(),
                  a.handleSelect(r, e),
                  !a.props.shouldCloseOnSelect && a.setPreSelection(r);
              else if ("Escape" === t)
                e.preventDefault(),
                  a.setOpen(!1),
                  a.inputOk() ||
                    a.props.onInputError({
                      code: 1,
                      msg: "Date input not valid.",
                    });
              else if (!a.props.disabledKeyboardNavigation) {
                var n;
                switch (t) {
                  case "ArrowLeft":
                    n = he.default(r, 1);
                    break;
                  case "ArrowRight":
                    n = ce.default(r, 1);
                    break;
                  case "ArrowUp":
                    n = me.default(r, 1);
                    break;
                  case "ArrowDown":
                    n = ue.default(r, 1);
                    break;
                  case "PageUp":
                    n = ye.default(r, 1);
                    break;
                  case "PageDown":
                    n = de.default(r, 1);
                    break;
                  case "Home":
                    n = ve.default(r, 1);
                    break;
                  case "End":
                    n = fe.default(r, 1);
                }
                if (!n)
                  return void (
                    a.props.onInputError &&
                    a.props.onInputError({
                      code: 1,
                      msg: "Date input not valid.",
                    })
                  );
                if (
                  (e.preventDefault(),
                  a.setState({ lastPreSelectChange: jr }),
                  a.props.adjustDateOnChange && a.setSelected(n),
                  a.setPreSelection(n),
                  a.props.inline)
                ) {
                  var o = Se.default(r),
                    s = Se.default(n),
                    i = Me.default(r),
                    p = Me.default(n);
                  o !== s || i !== p
                    ? a.setState({ shouldFocusDayInline: !0 })
                    : a.setState({ shouldFocusDayInline: !1 });
                }
              }
            }),
            ct(mt(a), "onPopperKeyDown", function (e) {
              "Escape" === e.key &&
                (e.preventDefault(),
                a.setState({ preventFocus: !0 }, function () {
                  a.setOpen(!1),
                    setTimeout(function () {
                      a.setFocus(), a.setState({ preventFocus: !1 });
                    });
                }));
            }),
            ct(mt(a), "onClearClick", function (e) {
              e && e.preventDefault && e.preventDefault(),
                a.props.selectsRange
                  ? a.props.onChange([null, null], e)
                  : a.props.onChange(null, e),
                a.setState({ inputValue: null });
            }),
            ct(mt(a), "clear", function () {
              a.onClearClick();
            }),
            ct(mt(a), "onScroll", function (e) {
              "boolean" == typeof a.props.closeOnScroll && a.props.closeOnScroll
                ? (e.target !== document &&
                    e.target !== document.documentElement &&
                    e.target !== document.body) ||
                  a.setOpen(!1)
                : "function" == typeof a.props.closeOnScroll &&
                  a.props.closeOnScroll(e) &&
                  a.setOpen(!1);
            }),
            ct(mt(a), "renderCalendar", function () {
              return a.props.inline || a.isCalendarOpen()
                ? ae.default.createElement(
                    Kr,
                    {
                      ref: function (e) {
                        a.calendar = e;
                      },
                      locale: a.props.locale,
                      calendarStartDay: a.props.calendarStartDay,
                      chooseDayAriaLabelPrefix:
                        a.props.chooseDayAriaLabelPrefix,
                      disabledDayAriaLabelPrefix:
                        a.props.disabledDayAriaLabelPrefix,
                      weekAriaLabelPrefix: a.props.weekAriaLabelPrefix,
                      adjustDateOnChange: a.props.adjustDateOnChange,
                      setOpen: a.setOpen,
                      shouldCloseOnSelect: a.props.shouldCloseOnSelect,
                      dateFormat: a.props.dateFormatCalendar,
                      useWeekdaysShort: a.props.useWeekdaysShort,
                      formatWeekDay: a.props.formatWeekDay,
                      dropdownMode: a.props.dropdownMode,
                      selected: a.props.selected,
                      preSelection: a.state.preSelection,
                      onSelect: a.handleSelect,
                      onWeekSelect: a.props.onWeekSelect,
                      openToDate: a.props.openToDate,
                      minDate: a.props.minDate,
                      maxDate: a.props.maxDate,
                      selectsStart: a.props.selectsStart,
                      selectsEnd: a.props.selectsEnd,
                      selectsRange: a.props.selectsRange,
                      startDate: a.props.startDate,
                      endDate: a.props.endDate,
                      excludeDates: a.props.excludeDates,
                      filterDate: a.props.filterDate,
                      onClickOutside: a.handleCalendarClickOutside,
                      formatWeekNumber: a.props.formatWeekNumber,
                      highlightDates: a.state.highlightDates,
                      includeDates: a.props.includeDates,
                      includeTimes: a.props.includeTimes,
                      injectTimes: a.props.injectTimes,
                      inline: a.props.inline,
                      shouldFocusDayInline: a.state.shouldFocusDayInline,
                      peekNextMonth: a.props.peekNextMonth,
                      showMonthDropdown: a.props.showMonthDropdown,
                      showPreviousMonths: a.props.showPreviousMonths,
                      useShortMonthInDropdown: a.props.useShortMonthInDropdown,
                      showMonthYearDropdown: a.props.showMonthYearDropdown,
                      showWeekNumbers: a.props.showWeekNumbers,
                      showYearDropdown: a.props.showYearDropdown,
                      withPortal: a.props.withPortal,
                      forceShowMonthNavigation:
                        a.props.forceShowMonthNavigation,
                      showDisabledMonthNavigation:
                        a.props.showDisabledMonthNavigation,
                      scrollableYearDropdown: a.props.scrollableYearDropdown,
                      scrollableMonthYearDropdown:
                        a.props.scrollableMonthYearDropdown,
                      todayButton: a.props.todayButton,
                      weekLabel: a.props.weekLabel,
                      outsideClickIgnoreClass:
                        "react-datepicker-ignore-onclickoutside",
                      fixedHeight: a.props.fixedHeight,
                      monthsShown: a.props.monthsShown,
                      monthSelectedIn: a.state.monthSelectedIn,
                      onDropdownFocus: a.handleDropdownFocus,
                      onMonthChange: a.props.onMonthChange,
                      onYearChange: a.props.onYearChange,
                      dayClassName: a.props.dayClassName,
                      weekDayClassName: a.props.weekDayClassName,
                      monthClassName: a.props.monthClassName,
                      timeClassName: a.props.timeClassName,
                      showTimeSelect: a.props.showTimeSelect,
                      showTimeSelectOnly: a.props.showTimeSelectOnly,
                      onTimeChange: a.handleTimeChange,
                      timeFormat: a.props.timeFormat,
                      timeIntervals: a.props.timeIntervals,
                      minTime: a.props.minTime,
                      maxTime: a.props.maxTime,
                      excludeTimes: a.props.excludeTimes,
                      filterTime: a.props.filterTime,
                      timeCaption: a.props.timeCaption,
                      className: a.props.calendarClassName,
                      container: a.props.calendarContainer,
                      yearItemNumber: a.props.yearItemNumber,
                      yearDropdownItemNumber: a.props.yearDropdownItemNumber,
                      previousMonthAriaLabel: a.props.previousMonthAriaLabel,
                      previousMonthButtonLabel:
                        a.props.previousMonthButtonLabel,
                      nextMonthAriaLabel: a.props.nextMonthAriaLabel,
                      nextMonthButtonLabel: a.props.nextMonthButtonLabel,
                      previousYearAriaLabel: a.props.previousYearAriaLabel,
                      previousYearButtonLabel: a.props.previousYearButtonLabel,
                      nextYearAriaLabel: a.props.nextYearAriaLabel,
                      nextYearButtonLabel: a.props.nextYearButtonLabel,
                      timeInputLabel: a.props.timeInputLabel,
                      disabledKeyboardNavigation:
                        a.props.disabledKeyboardNavigation,
                      renderCustomHeader: a.props.renderCustomHeader,
                      popperProps: a.props.popperProps,
                      renderDayContents: a.props.renderDayContents,
                      onDayMouseEnter: a.props.onDayMouseEnter,
                      onMonthMouseLeave: a.props.onMonthMouseLeave,
                      showTimeInput: a.props.showTimeInput,
                      showMonthYearPicker: a.props.showMonthYearPicker,
                      showFullMonthYearPicker: a.props.showFullMonthYearPicker,
                      showTwoColumnMonthYearPicker:
                        a.props.showTwoColumnMonthYearPicker,
                      showFourColumnMonthYearPicker:
                        a.props.showFourColumnMonthYearPicker,
                      showYearPicker: a.props.showYearPicker,
                      showQuarterYearPicker: a.props.showQuarterYearPicker,
                      showPopperArrow: a.props.showPopperArrow,
                      excludeScrollbar: a.props.excludeScrollbar,
                      handleOnKeyDown: a.props.onKeyDown,
                      handleOnDayKeyDown: a.onDayKeyDown,
                      isInputFocused: a.state.focused,
                      customTimeInput: a.props.customTimeInput,
                      setPreSelection: a.setPreSelection,
                    },
                    a.props.children
                  )
                : null;
            }),
            ct(mt(a), "renderDateInput", function () {
              var e,
                t = ne.default(
                  a.props.className,
                  ct({}, "react-datepicker-ignore-onclickoutside", a.state.open)
                ),
                r =
                  a.props.customInput ||
                  ae.default.createElement("input", { type: "text" }),
                n = a.props.customInputRef || "ref",
                o =
                  "string" == typeof a.props.value
                    ? a.props.value
                    : "string" == typeof a.state.inputValue
                    ? a.state.inputValue
                    : a.props.selectsRange
                    ? (function (e, t, r) {
                        if (!e) return "";
                        var a = Et(e, r),
                          n = t ? Et(t, r) : "";
                        return "".concat(a, " - ").concat(n);
                      })(a.props.startDate, a.props.endDate, a.props)
                    : Et(a.props.selected, a.props);
              return ae.default.cloneElement(
                r,
                (ct((e = {}), n, function (e) {
                  a.input = e;
                }),
                ct(e, "value", o),
                ct(e, "onBlur", a.handleBlur),
                ct(e, "onChange", a.handleChange),
                ct(e, "onClick", a.onInputClick),
                ct(e, "onFocus", a.handleFocus),
                ct(e, "onKeyDown", a.onInputKeyDown),
                ct(e, "id", a.props.id),
                ct(e, "name", a.props.name),
                ct(e, "autoFocus", a.props.autoFocus),
                ct(e, "placeholder", a.props.placeholderText),
                ct(e, "disabled", a.props.disabled),
                ct(e, "autoComplete", a.props.autoComplete),
                ct(e, "className", ne.default(r.props.className, t)),
                ct(e, "title", a.props.title),
                ct(e, "readOnly", a.props.readOnly),
                ct(e, "required", a.props.required),
                ct(e, "tabIndex", a.props.tabIndex),
                ct(e, "aria-describedby", a.props.ariaDescribedBy),
                ct(e, "aria-invalid", a.props.ariaInvalid),
                ct(e, "aria-labelledby", a.props.ariaLabelledBy),
                ct(e, "aria-required", a.props.ariaRequired),
                e)
              );
            }),
            ct(mt(a), "renderClearButton", function () {
              var e = a.props,
                t = e.isClearable,
                r = e.selected,
                n = e.startDate,
                o = e.endDate,
                s = e.clearButtonTitle,
                i = e.clearButtonClassName,
                p = void 0 === i ? "" : i,
                l = e.ariaLabelClose,
                c = void 0 === l ? "Close" : l;
              return !t || (null == r && null == n && null == o)
                ? null
                : ae.default.createElement("button", {
                    type: "button",
                    className: "react-datepicker__close-icon ".concat(p).trim(),
                    "aria-label": c,
                    onClick: a.onClearClick,
                    title: s,
                    tabIndex: -1,
                  });
            }),
            (a.state = a.calcInitialState()),
            a
          );
        }
        return (
          lt(
            r,
            [
              {
                key: "componentDidMount",
                value: function () {
                  window.addEventListener("scroll", this.onScroll, !0);
                },
              },
              {
                key: "componentDidUpdate",
                value: function (e, t) {
                  var r, a;
                  e.inline &&
                    ((r = e.selected),
                    (a = this.props.selected),
                    r && a
                      ? Se.default(r) !== Se.default(a) ||
                        Me.default(r) !== Me.default(a)
                      : r !== a) &&
                    this.setPreSelection(this.props.selected),
                    void 0 !== this.state.monthSelectedIn &&
                      e.monthsShown !== this.props.monthsShown &&
                      this.setState({ monthSelectedIn: 0 }),
                    e.highlightDates !== this.props.highlightDates &&
                      this.setState({
                        highlightDates: ur(this.props.highlightDates),
                      }),
                    t.focused ||
                      Bt(e.selected, this.props.selected) ||
                      this.setState({ inputValue: null }),
                    t.open !== this.state.open &&
                      (!1 === t.open &&
                        !0 === this.state.open &&
                        this.props.onCalendarOpen(),
                      !0 === t.open &&
                        !1 === this.state.open &&
                        this.props.onCalendarClose());
                },
              },
              {
                key: "componentWillUnmount",
                value: function () {
                  this.clearPreventFocusTimeout(),
                    window.removeEventListener("scroll", this.onScroll, !0);
                },
              },
              {
                key: "renderInputContainer",
                value: function () {
                  return ae.default.createElement(
                    "div",
                    { className: "react-datepicker__input-container" },
                    this.renderDateInput(),
                    this.renderClearButton()
                  );
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this.renderCalendar();
                  if (this.props.inline) return e;
                  if (this.props.withPortal) {
                    var t = this.state.open
                      ? ae.default.createElement(
                          "div",
                          { className: "react-datepicker__portal" },
                          e
                        )
                      : null;
                    return (
                      this.state.open &&
                        this.props.portalId &&
                        (t = ae.default.createElement(
                          Fr,
                          { portalId: this.props.portalId },
                          t
                        )),
                      ae.default.createElement(
                        "div",
                        null,
                        this.renderInputContainer(),
                        t
                      )
                    );
                  }
                  return ae.default.createElement(qr, {
                    className: this.props.popperClassName,
                    wrapperClassName: this.props.wrapperClassName,
                    hidePopper: !this.isCalendarOpen(),
                    portalId: this.props.portalId,
                    popperModifiers: this.props.popperModifiers,
                    targetComponent: this.renderInputContainer(),
                    popperContainer: this.props.popperContainer,
                    popperComponent: e,
                    popperPlacement: this.props.popperPlacement,
                    popperProps: this.props.popperProps,
                    popperOnKeyDown: this.onPopperKeyDown,
                    enableTabLoop: this.props.enableTabLoop,
                  });
                },
              },
            ],
            [
              {
                key: "defaultProps",
                get: function () {
                  return {
                    allowSameDay: !1,
                    dateFormat: "MM/dd/yyyy",
                    dateFormatCalendar: "LLLL yyyy",
                    onChange: function () {},
                    disabled: !1,
                    disabledKeyboardNavigation: !1,
                    dropdownMode: "scroll",
                    onFocus: function () {},
                    onBlur: function () {},
                    onKeyDown: function () {},
                    onInputClick: function () {},
                    onSelect: function () {},
                    onClickOutside: function () {},
                    onMonthChange: function () {},
                    onCalendarOpen: function () {},
                    onCalendarClose: function () {},
                    preventOpenOnFocus: !1,
                    onYearChange: function () {},
                    onInputError: function () {},
                    monthsShown: 1,
                    readOnly: !1,
                    withPortal: !1,
                    shouldCloseOnSelect: !0,
                    showTimeSelect: !1,
                    showTimeInput: !1,
                    showPreviousMonths: !1,
                    showMonthYearPicker: !1,
                    showFullMonthYearPicker: !1,
                    showTwoColumnMonthYearPicker: !1,
                    showFourColumnMonthYearPicker: !1,
                    showYearPicker: !1,
                    showQuarterYearPicker: !1,
                    strictParsing: !1,
                    timeIntervals: 30,
                    timeCaption: "Time",
                    previousMonthAriaLabel: "Previous Month",
                    previousMonthButtonLabel: "Previous Month",
                    nextMonthAriaLabel: "Next Month",
                    nextMonthButtonLabel: "Next Month",
                    previousYearAriaLabel: "Previous Year",
                    previousYearButtonLabel: "Previous Year",
                    nextYearAriaLabel: "Next Year",
                    nextYearButtonLabel: "Next Year",
                    timeInputLabel: "Time",
                    enableTabLoop: !0,
                    yearItemNumber: 12,
                    renderDayContents: function (e) {
                      return e;
                    },
                    focusSelectedMonth: !1,
                    showPopperArrow: !0,
                    excludeScrollbar: !0,
                    customTimeInput: null,
                    calendarStartDay: void 0,
                  };
                },
              },
            ]
          ),
          r
        );
      })(),
      Wr = "input",
      jr = "navigate";
    (__webpack_unused_export__ = Tr),
      (exports.ZP = Br),
      (__webpack_unused_export__ = jt),
      (__webpack_unused_export__ = function (e, t) {
        var r = "undefined" != typeof window ? window : global;
        r.__localeData__ || (r.__localeData__ = {}), (r.__localeData__[e] = t);
      }),
      (__webpack_unused_export__ = function (e) {
        ("undefined" != typeof window ? window : global).__localeId__ = e;
      });

    /***/
  },

  /***/ 69590: /***/ (module) => {
    /* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer =
      typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;

    // Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

    function equal(a, b) {
      // START: fast-deep-equal es6/index.js 3.1.1
      if (a === b) return true;

      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;

        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
          return true;
        }

        // START: Modifications:
        // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
        //    to co-exist with es5.
        // 2. Replace `for of` with es5 compliant iteration using `for`.
        //    Basically, take:
        //
        //    ```js
        //    for (i of a.entries())
        //      if (!b.has(i[0])) return false;
        //    ```
        //
        //    ... and convert to:
        //
        //    ```js
        //    it = a.entries();
        //    while (!(i = it.next()).done)
        //      if (!b.has(i.value[0])) return false;
        //    ```
        //
        //    **Note**: `i` access switches to `i.value`.
        var it;
        if (hasMap && a instanceof Map && b instanceof Map) {
          if (a.size !== b.size) return false;
          it = a.entries();
          while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!equal(i.value[1], b.get(i.value[0]))) return false;
          return true;
        }

        if (hasSet && a instanceof Set && b instanceof Set) {
          if (a.size !== b.size) return false;
          it = a.entries();
          while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
          return true;
        }
        // END: Modifications

        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; ) if (a[i] !== b[i]) return false;
          return true;
        }

        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();

        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;

        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        // END: fast-deep-equal

        // START: react-fast-compare
        // custom handling for DOM elements
        if (hasElementType && a instanceof Element) return false;

        // custom handling for React/Preact
        for (i = length; i-- !== 0; ) {
          if (
            (keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") &&
            a.$$typeof
          ) {
            // React-specific: avoid traversing React elements' _owner
            // Preact-specific: avoid traversing Preact elements' __v and __o
            //    __v = $_original / $_vnode
            //    __o = $_owner
            // These properties contain circular references and are not needed when
            // comparing the actual elements (and not their owners)
            // .$$typeof and ._store on just reasonable markers of elements

            continue;
          }

          // all other properties should be traversed as usual
          if (!equal(a[keys[i]], b[keys[i]])) return false;
        }
        // END: react-fast-compare

        // START: fast-deep-equal
        return true;
      }

      return a !== a && b !== b;
    }
    // end fast-deep-equal

    module.exports = function isEqual(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          // warn on circular references, don't crash
          // browsers give this different errors name and messages:
          // chrome/safari: "RangeError", "Maximum call stack size exceeded"
          // firefox: "InternalError", too much recursion"
          // edge: "Error", "Out of stack space"
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        // some other error. we should definitely know about these
        throw error;
      }
    };

    /***/
  },

  /***/ 42283: /***/ (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) => {
    "use strict";
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ cI: () => /* binding */ useForm,
      /* harmony export */
    });
    /* unused harmony exports Controller, FormProvider, appendErrors, get, set, useController, useFieldArray, useFormContext, useFormState, useWatch */
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(67294);

    var isCheckBoxInput = (element) => element.type === "checkbox";

    var isDateObject = (data) => data instanceof Date;

    var isNullOrUndefined = (value) => value == null;

    const isObjectType = (value) => typeof value === "object";
    var isObject = (value) =>
      !isNullOrUndefined(value) &&
      !Array.isArray(value) &&
      isObjectType(value) &&
      !isDateObject(value);

    var getControllerValue = (event) =>
      isObject(event) && event.target
        ? isCheckBoxInput(event.target)
          ? event.target.checked
          : event.target.value
        : event;

    var getNodeParentName = (name) =>
      name.substring(0, name.search(/.\d/)) || name;

    var isNameInFieldArray = (names, name) =>
      [...names].some((current) => getNodeParentName(name) === current);

    var compact = (value) => value.filter(Boolean);

    var isUndefined = (val) => val === undefined;

    var get = (obj, path, defaultValue) => {
      if (isObject(obj) && path) {
        const result = compact(path.split(/[,[\].]+?/)).reduce(
          (result, key) => (isNullOrUndefined(result) ? result : result[key]),
          obj
        );
        return isUndefined(result) || result === obj
          ? isUndefined(obj[path])
            ? defaultValue
            : obj[path]
          : result;
      }
      return undefined;
    };

    const EVENTS = {
      BLUR: "blur",
      CHANGE: "change",
    };
    const VALIDATION_MODE = {
      onBlur: "onBlur",
      onChange: "onChange",
      onSubmit: "onSubmit",
      onTouched: "onTouched",
      all: "all",
    };
    const INPUT_VALIDATION_RULES = {
      max: "max",
      min: "min",
      maxLength: "maxLength",
      minLength: "minLength",
      pattern: "pattern",
      required: "required",
      validate: "validate",
    };

    var omit = (source, key) => {
      const copy = Object.assign({}, source);
      delete copy[key];
      return copy;
    };

    const HookFormContext =
      react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
    const useFormContext = () => React.useContext(HookFormContext);
    const FormProvider = (props) =>
      React.createElement(
        HookFormContext.Provider,
        { value: omit(props, "children") },
        props.children
      );

    var getProxyFormState = (
      formState,
      _proxyFormState,
      localProxyFormState,
      isRoot = true
    ) => {
      function createGetter(prop) {
        return () => {
          if (prop in formState) {
            if (_proxyFormState[prop] !== VALIDATION_MODE.all) {
              _proxyFormState[prop] = !isRoot || VALIDATION_MODE.all;
            }
            localProxyFormState && (localProxyFormState[prop] = true);
            return formState[prop];
          }
          return undefined;
        };
      }
      const result = {};
      for (const key in formState) {
        Object.defineProperty(result, key, {
          get: createGetter(key),
        });
      }
      return result;
    };

    var isEmptyObject = (value) =>
      isObject(value) && !Object.keys(value).length;

    var shouldRenderFormState = (formStateData, _proxyFormState, isRoot) => {
      const formState = omit(formStateData, "name");
      return (
        isEmptyObject(formState) ||
        Object.keys(formState).length >= Object.keys(_proxyFormState).length ||
        Object.keys(formState).find(
          (key) => _proxyFormState[key] === (!isRoot || VALIDATION_MODE.all)
        )
      );
    };

    var convertToArrayPayload = (value) =>
      Array.isArray(value) ? value : [value];

    var shouldSubscribeByName = (name, signalName) =>
      !name ||
      !signalName ||
      name === signalName ||
      convertToArrayPayload(name).some(
        (currentName) =>
          currentName &&
          (currentName.startsWith(signalName) ||
            signalName.startsWith(currentName))
      );

    const tearDown = (_subscription) => {
      if (_subscription.current) {
        _subscription.current.unsubscribe();
        _subscription.current = undefined;
      }
    };
    const updateSubscriptionProps = ({ _subscription, props }) => {
      if (props.disabled) {
        tearDown(_subscription);
      } else if (!_subscription.current) {
        _subscription.current = props.subject.subscribe({
          next: props.callback,
        });
      }
    };
    function useSubscribe(props) {
      const _subscription = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
      updateSubscriptionProps({
        _subscription,
        props,
      });
      react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        return () => tearDown(_subscription);
      }, []);
    }

    function useFormState(props) {
      const methods = useFormContext();
      const { control = methods.control, disabled, name } = props || {};
      const [formState, updateFormState] = React.useState(control._formState);
      const _localProxyFormState = React.useRef({
        isDirty: false,
        dirtyFields: false,
        touchedFields: false,
        isValidating: false,
        isValid: false,
        errors: false,
      });
      const _name = React.useRef(name);
      _name.current = name;
      useSubscribe({
        disabled,
        callback: (formState) =>
          shouldSubscribeByName(_name.current, formState.name) &&
          shouldRenderFormState(formState, _localProxyFormState.current) &&
          updateFormState(
            Object.assign(Object.assign({}, control._formState), formState)
          ),
        subject: control._subjects.state,
      });
      return getProxyFormState(
        formState,
        control._proxyFormState,
        _localProxyFormState.current,
        false
      );
    }

    var isString = (value) => typeof value === "string";

    function generateWatchOutput(names, _names, formValues, isGlobal) {
      const isArray = Array.isArray(names);
      if (isString(names)) {
        isGlobal && _names.watch.add(names);
        return get(formValues, names);
      }
      if (isArray) {
        return names.map(
          (fieldName) => (
            isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)
          )
        );
      }
      isGlobal && (_names.watchAll = true);
      return formValues;
    }

    var isKey = (value) => /^\w*$/.test(value);

    var stringToPath = (input) =>
      compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));

    function set(object, path, value) {
      let index = -1;
      const tempPath = isKey(path) ? [path] : stringToPath(path);
      const length = tempPath.length;
      const lastIndex = length - 1;
      while (++index < length) {
        const key = tempPath[index];
        let newValue = value;
        if (index !== lastIndex) {
          const objValue = object[key];
          newValue =
            isObject(objValue) || Array.isArray(objValue)
              ? objValue
              : !isNaN(+tempPath[index + 1])
              ? []
              : {};
        }
        object[key] = newValue;
        object = object[key];
      }
      return object;
    }

    function useWatch(props) {
      const methods = useFormContext();
      const {
        control = methods.control,
        name,
        defaultValue,
        disabled,
      } = props || {};
      const _name = React.useRef(name);
      _name.current = name;
      useSubscribe({
        disabled,
        subject: control._subjects.watch,
        callback: (formState) => {
          if (shouldSubscribeByName(_name.current, formState.name)) {
            const fieldValues = generateWatchOutput(
              _name.current,
              control._names,
              control._formValues
            );
            updateValue(
              isObject(fieldValues) &&
                !(
                  isString(_name.current) &&
                  get(control._fields, _name.current, {})._f
                )
                ? Object.assign({}, fieldValues)
                : Array.isArray(fieldValues)
                ? [...fieldValues]
                : fieldValues
            );
          }
        },
      });
      const [value, updateValue] = React.useState(
        isUndefined(defaultValue) ? control._getWatch(name) : defaultValue
      );
      React.useEffect(() => {
        control._removeUnmounted();
      });
      return value;
    }

    function useController(props) {
      const methods = useFormContext();
      const { name, control = methods.control, shouldUnregister } = props;
      const value = useWatch({
        control,
        name,
        defaultValue: get(
          control._formValues,
          name,
          get(control._defaultValues, name, props.defaultValue)
        ),
      });
      const formState = useFormState({
        control,
        name,
      });
      const _name = React.useRef(name);
      _name.current = name;
      const registerProps = control.register(
        name,
        Object.assign(Object.assign({}, props.rules), { value })
      );
      React.useEffect(() => {
        const updateMounted = (name, value) => {
          const field = get(control._fields, name);
          if (field) {
            field._f.mount = value;
          }
        };
        updateMounted(name, true);
        return () => {
          const _shouldUnregisterField =
            control._options.shouldUnregister || shouldUnregister;
          if (
            isNameInFieldArray(control._names.array, name)
              ? _shouldUnregisterField && !control._stateFlags.action
              : _shouldUnregisterField
          ) {
            control.unregister(name);
          } else {
            updateMounted(name, false);
          }
        };
      }, [name, control, shouldUnregister]);
      return {
        field: {
          onChange: (event) => {
            registerProps.onChange({
              target: {
                value: getControllerValue(event),
                name: name,
              },
              type: EVENTS.CHANGE,
            });
          },
          onBlur: () => {
            registerProps.onBlur({
              target: {
                value,
                name: name,
              },
              type: EVENTS.BLUR,
            });
          },
          name,
          value,
          ref: (elm) => {
            const field = get(control._fields, name);
            if (elm && field && elm.focus) {
              field._f.ref = {
                focus: () => elm.focus(),
                setCustomValidity: (message) => elm.setCustomValidity(message),
                reportValidity: () => elm.reportValidity(),
              };
            }
          },
        },
        formState,
        fieldState: {
          invalid: !!get(formState.errors, name),
          isDirty: !!get(formState.dirtyFields, name),
          isTouched: !!get(formState.touchedFields, name),
          error: get(formState.errors, name),
        },
      };
    }

    const Controller = (props) => props.render(useController(props));

    var appendErrors = (
      name,
      validateAllFieldCriteria,
      errors,
      type,
      message
    ) =>
      validateAllFieldCriteria
        ? Object.assign(Object.assign({}, errors[name]), {
            types: Object.assign(
              Object.assign(
                {},
                errors[name] && errors[name].types ? errors[name].types : {}
              ),
              { [type]: message || true }
            ),
          })
        : {};

    const focusFieldBy = (fields, callback, fieldsNames) => {
      for (const key of fieldsNames || Object.keys(fields)) {
        const field = get(fields, key);
        if (field) {
          const _f = field._f;
          const current = omit(field, "_f");
          if (_f && callback(_f.name)) {
            if (_f.ref.focus && isUndefined(_f.ref.focus())) {
              break;
            } else if (_f.refs) {
              _f.refs[0].focus();
              break;
            }
          } else if (isObject(current)) {
            focusFieldBy(current, callback);
          }
        }
      }
    };

    var getFocusFieldName = (name, index, options = {}) =>
      options.shouldFocus || isUndefined(options.shouldFocus)
        ? options.focusName ||
          `${name}.${
            isUndefined(options.focusIndex) ? index : options.focusIndex
          }.`
        : "";

    var mapCurrentIds = (values, _fieldIds, keyName) =>
      values.map((value, index) => {
        const output = _fieldIds.current[index];
        return Object.assign(
          Object.assign({}, value),
          output ? { [keyName]: output[keyName] } : {}
        );
      });

    var generateId = () => {
      const d =
        typeof performance === "undefined"
          ? Date.now()
          : performance.now() * 1000;
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16 + d) % 16 | 0;
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    };

    var mapIds = (values = [], keyName) =>
      values.map((value) =>
        Object.assign(
          Object.assign({}, value[keyName] ? {} : { [keyName]: generateId() }),
          value
        )
      );

    function append(data, value) {
      return [...convertToArrayPayload(data), ...convertToArrayPayload(value)];
    }

    var fillEmptyArray = (value) =>
      Array.isArray(value) ? value.map(() => undefined) : undefined;

    function insert(data, index, value) {
      return [
        ...data.slice(0, index),
        ...convertToArrayPayload(value),
        ...data.slice(index),
      ];
    }

    var moveArrayAt = (data, from, to) => {
      if (Array.isArray(data)) {
        if (isUndefined(data[to])) {
          data[to] = undefined;
        }
        data.splice(to, 0, data.splice(from, 1)[0]);
        return data;
      }
      return [];
    };

    var omitKeys = (fields, keyName) =>
      fields.map((field = {}) => omit(field, keyName));

    function prepend(data, value) {
      return [...convertToArrayPayload(value), ...convertToArrayPayload(data)];
    }

    function removeAtIndexes(data, indexes) {
      let i = 0;
      const temp = [...data];
      for (const index of indexes) {
        temp.splice(index - i, 1);
        i++;
      }
      return compact(temp).length ? temp : [];
    }
    var removeArrayAt = (data, index) =>
      isUndefined(index)
        ? []
        : removeAtIndexes(
            data,
            convertToArrayPayload(index).sort((a, b) => a - b)
          );

    var swapArrayAt = (data, indexA, indexB) => {
      data[indexA] = [data[indexB], (data[indexB] = data[indexA])][0];
    };

    var updateAt = (fieldValues, index, value) => {
      fieldValues[index] = value;
      return fieldValues;
    };

    const useFieldArray = (props) => {
      const methods = useFormContext();
      const {
        control = methods.control,
        name,
        keyName = "id",
        shouldUnregister,
      } = props;
      const [fields, setFields] = React.useState(
        mapIds(control._getFieldArray(name), keyName)
      );
      const _fieldIds = React.useRef(fields);
      const _name = React.useRef(name);
      const _actioned = React.useRef(false);
      _name.current = name;
      _fieldIds.current = fields;
      control._names.array.add(name);
      useSubscribe({
        callback: ({ values, name: fieldArrayName }) => {
          if (fieldArrayName === _name.current || !fieldArrayName) {
            setFields(mapIds(get(values, _name.current), keyName));
          }
        },
        subject: control._subjects.array,
      });
      const updateValues = React.useCallback(
        (updatedFieldArrayValuesWithKey) => {
          const updatedFieldArrayValues = omitKeys(
            updatedFieldArrayValuesWithKey,
            keyName
          );
          _actioned.current = true;
          set(control._formValues, name, updatedFieldArrayValues);
          setFields(updatedFieldArrayValuesWithKey);
          return updatedFieldArrayValues;
        },
        [control, name, keyName]
      );
      const append$1 = (value, options) => {
        const appendValue = convertToArrayPayload(value);
        const updatedFieldArrayValuesWithKey = append(
          mapCurrentIds(control._getFieldArray(name), _fieldIds, keyName),
          mapIds(appendValue, keyName)
        );
        control._updateFieldArray(
          name,
          append,
          {
            argA: fillEmptyArray(value),
          },
          updateValues(updatedFieldArrayValuesWithKey)
        );
        control._names.focus = getFocusFieldName(
          name,
          updatedFieldArrayValuesWithKey.length - appendValue.length,
          options
        );
      };
      const prepend$1 = (value, options) => {
        const updatedFieldArrayValuesWithKey = prepend(
          mapCurrentIds(control._getFieldArray(name), _fieldIds, keyName),
          mapIds(convertToArrayPayload(value), keyName)
        );
        control._updateFieldArray(
          name,
          prepend,
          {
            argA: fillEmptyArray(value),
          },
          updateValues(updatedFieldArrayValuesWithKey)
        );
        control._names.focus = getFocusFieldName(name, 0, options);
      };
      const remove = (index) => {
        const updatedFieldArrayValuesWithKey = removeArrayAt(
          mapCurrentIds(control._getFieldArray(name), _fieldIds, keyName),
          index
        );
        control._updateFieldArray(
          name,
          removeArrayAt,
          {
            argA: index,
          },
          updateValues(updatedFieldArrayValuesWithKey)
        );
      };
      const insert$1 = (index, value, options) => {
        const updatedFieldArrayValuesWithKey = insert(
          mapCurrentIds(control._getFieldArray(name), _fieldIds, keyName),
          index,
          mapIds(convertToArrayPayload(value), keyName)
        );
        control._updateFieldArray(
          name,
          insert,
          {
            argA: index,
            argB: fillEmptyArray(value),
          },
          updateValues(updatedFieldArrayValuesWithKey)
        );
        control._names.focus = getFocusFieldName(name, index, options);
      };
      const swap = (indexA, indexB) => {
        const updatedFieldArrayValuesWithKey = mapCurrentIds(
          control._getFieldArray(name),
          _fieldIds,
          keyName
        );
        swapArrayAt(updatedFieldArrayValuesWithKey, indexA, indexB);
        control._updateFieldArray(
          name,
          swapArrayAt,
          {
            argA: indexA,
            argB: indexB,
          },
          updateValues(updatedFieldArrayValuesWithKey),
          false
        );
      };
      const move = (from, to) => {
        const updatedFieldArrayValuesWithKey = mapCurrentIds(
          control._getFieldArray(name),
          _fieldIds,
          keyName
        );
        moveArrayAt(updatedFieldArrayValuesWithKey, from, to);
        control._updateFieldArray(
          name,
          moveArrayAt,
          {
            argA: from,
            argB: to,
          },
          updateValues(updatedFieldArrayValuesWithKey),
          false
        );
      };
      const update = (index, value) => {
        const updatedFieldArrayValuesWithKey = mapCurrentIds(
          control._getFieldArray(name),
          _fieldIds,
          keyName
        );
        const updatedFieldArrayValues = updateAt(
          updatedFieldArrayValuesWithKey,
          index,
          value
        );
        _fieldIds.current = mapIds(updatedFieldArrayValues, keyName);
        control._updateFieldArray(
          name,
          updateAt,
          {
            argA: index,
            argB: value,
          },
          updateValues(_fieldIds.current),
          true,
          false
        );
      };
      const replace = (value) => {
        const updatedFieldArrayValuesWithKey = mapIds(
          convertToArrayPayload(value),
          keyName
        );
        control._updateFieldArray(
          name,
          () => updatedFieldArrayValuesWithKey,
          {},
          updateValues(updatedFieldArrayValuesWithKey),
          true,
          false
        );
      };
      React.useEffect(() => {
        control._stateFlags.action = false;
        if (control._names.watchAll) {
          control._subjects.state.next({});
        } else {
          for (const watchField of control._names.watch) {
            if (name.startsWith(watchField)) {
              control._subjects.state.next({});
              break;
            }
          }
        }
        if (_actioned.current) {
          control._executeSchema([name]).then((result) => {
            const error = get(result.errors, name);
            if (error && error.type && !get(control._formState.errors, name)) {
              set(control._formState.errors, name, error);
              control._subjects.state.next({
                errors: control._formState.errors,
              });
            }
          });
        }
        control._subjects.watch.next({
          name,
          values: control._formValues,
        });
        control._names.focus &&
          focusFieldBy(control._fields, (key) =>
            key.startsWith(control._names.focus)
          );
        control._names.focus = "";
        control._proxyFormState.isValid && control._updateValid();
      }, [fields, name, control, keyName]);
      React.useEffect(() => {
        !get(control._formValues, name) && set(control._formValues, name, []);
        return () => {
          if (control._options.shouldUnregister || shouldUnregister) {
            control.unregister(name);
          }
        };
      }, [name, control, keyName, shouldUnregister]);
      return {
        swap: React.useCallback(swap, [updateValues, name, control, keyName]),
        move: React.useCallback(move, [updateValues, name, control, keyName]),
        prepend: React.useCallback(prepend$1, [
          updateValues,
          name,
          control,
          keyName,
        ]),
        append: React.useCallback(append$1, [
          updateValues,
          name,
          control,
          keyName,
        ]),
        remove: React.useCallback(remove, [
          updateValues,
          name,
          control,
          keyName,
        ]),
        insert: React.useCallback(insert$1, [
          updateValues,
          name,
          control,
          keyName,
        ]),
        update: React.useCallback(update, [
          updateValues,
          name,
          control,
          keyName,
        ]),
        replace: React.useCallback(replace, [
          updateValues,
          name,
          control,
          keyName,
        ]),
        fields: fields,
      };
    };

    var isFunction = (value) => typeof value === "function";

    function cloneObject(data) {
      let copy;
      const isArray = Array.isArray(data);
      if (data instanceof Date) {
        copy = new Date(data);
      } else if (data instanceof Set) {
        copy = new Set(data);
      } else if (isArray || isObject(data)) {
        copy = isArray ? [] : {};
        for (const key in data) {
          if (isFunction(data[key])) {
            copy = data;
            break;
          }
          copy[key] = cloneObject(data[key]);
        }
      } else {
        return data;
      }
      return copy;
    }

    function createSubject() {
      let _observers = [];
      const next = (value) => {
        for (const observer of _observers) {
          observer.next(value);
        }
      };
      const subscribe = (observer) => {
        _observers.push(observer);
        return {
          unsubscribe: () => {
            _observers = _observers.filter((o) => o !== observer);
          },
        };
      };
      const unsubscribe = () => {
        _observers = [];
      };
      return {
        get observers() {
          return _observers;
        },
        next,
        subscribe,
        unsubscribe,
      };
    }

    var isPrimitive = (value) =>
      isNullOrUndefined(value) || !isObjectType(value);

    function deepEqual(object1, object2) {
      if (isPrimitive(object1) || isPrimitive(object2)) {
        return object1 === object2;
      }
      if (isDateObject(object1) && isDateObject(object2)) {
        return object1.getTime() === object2.getTime();
      }
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (const key of keys1) {
        const val1 = object1[key];
        if (!keys2.includes(key)) {
          return false;
        }
        if (key !== "ref") {
          const val2 = object2[key];
          if (
            (isDateObject(val1) && isDateObject(val2)) ||
            (isObject(val1) && isObject(val2)) ||
            (Array.isArray(val1) && Array.isArray(val2))
              ? !deepEqual(val1, val2)
              : val1 !== val2
          ) {
            return false;
          }
        }
      }
      return true;
    }

    var getValidationModes = (mode) => ({
      isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
      isOnBlur: mode === VALIDATION_MODE.onBlur,
      isOnChange: mode === VALIDATION_MODE.onChange,
      isOnAll: mode === VALIDATION_MODE.all,
      isOnTouch: mode === VALIDATION_MODE.onTouched,
    });

    var isBoolean = (value) => typeof value === "boolean";

    var isFileInput = (element) => element.type === "file";

    var isHTMLElement = (value) => value instanceof HTMLElement;

    var isMultipleSelect = (element) => element.type === `select-multiple`;

    var isRadioInput = (element) => element.type === "radio";

    var isRadioOrCheckboxFunction = (ref) =>
      isRadioInput(ref) || isCheckBoxInput(ref);

    var isWeb =
      typeof window !== "undefined" &&
      typeof window.HTMLElement !== "undefined" &&
      typeof document !== "undefined";

    var live = (ref) => isHTMLElement(ref) && document.contains(ref);

    function baseGet(object, updatePath) {
      const length = updatePath.slice(0, -1).length;
      let index = 0;
      while (index < length) {
        object = isUndefined(object) ? index++ : object[updatePath[index++]];
      }
      return object;
    }
    function unset(object, path) {
      const updatePath = isKey(path) ? [path] : stringToPath(path);
      const childObject =
        updatePath.length == 1 ? object : baseGet(object, updatePath);
      const key = updatePath[updatePath.length - 1];
      let previousObjRef;
      if (childObject) {
        delete childObject[key];
      }
      for (let k = 0; k < updatePath.slice(0, -1).length; k++) {
        let index = -1;
        let objectRef;
        const currentPaths = updatePath.slice(0, -(k + 1));
        const currentPathsLength = currentPaths.length - 1;
        if (k > 0) {
          previousObjRef = object;
        }
        while (++index < currentPaths.length) {
          const item = currentPaths[index];
          objectRef = objectRef ? objectRef[item] : object[item];
          if (
            currentPathsLength === index &&
            ((isObject(objectRef) && isEmptyObject(objectRef)) ||
              (Array.isArray(objectRef) &&
                !objectRef.filter(
                  (data) =>
                    (isObject(data) && !isEmptyObject(data)) || isBoolean(data)
                ).length))
          ) {
            previousObjRef ? delete previousObjRef[item] : delete object[item];
          }
          previousObjRef = objectRef;
        }
      }
      return object;
    }

    const defaultResult = {
      value: false,
      isValid: false,
    };
    const validResult = { value: true, isValid: true };
    var getCheckboxValue = (options) => {
      if (Array.isArray(options)) {
        if (options.length > 1) {
          const values = options
            .filter((option) => option && option.checked && !option.disabled)
            .map((option) => option.value);
          return { value: values, isValid: !!values.length };
        }
        return options[0].checked && !options[0].disabled
          ? // @ts-expect-error expected to work in the browser
            options[0].attributes && !isUndefined(options[0].attributes.value)
            ? isUndefined(options[0].value) || options[0].value === ""
              ? validResult
              : { value: options[0].value, isValid: true }
            : validResult
          : defaultResult;
      }
      return defaultResult;
    };

    var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) =>
      isUndefined(value)
        ? value
        : valueAsNumber
        ? value === ""
          ? NaN
          : +value
        : valueAsDate
        ? new Date(value)
        : setValueAs
        ? setValueAs(value)
        : value;

    const defaultReturn = {
      isValid: false,
      value: null,
    };
    var getRadioValue = (options) =>
      Array.isArray(options)
        ? options.reduce(
            (previous, option) =>
              option && option.checked && !option.disabled
                ? {
                    isValid: true,
                    value: option.value,
                  }
                : previous,
            defaultReturn
          )
        : defaultReturn;

    function getFieldValue(_f) {
      const ref = _f.ref;
      if (_f.refs ? _f.refs.every((ref) => ref.disabled) : ref.disabled) {
        return;
      }
      if (isFileInput(ref)) {
        return ref.files;
      }
      if (isRadioInput(ref)) {
        return getRadioValue(_f.refs).value;
      }
      if (isMultipleSelect(ref)) {
        return [...ref.selectedOptions].map(({ value }) => value);
      }
      if (isCheckBoxInput(ref)) {
        return getCheckboxValue(_f.refs).value;
      }
      return getFieldValueAs(
        isUndefined(ref.value) ? _f.ref.value : ref.value,
        _f
      );
    }

    var getResolverOptions = (
      fieldsNames,
      _fields,
      criteriaMode,
      shouldUseNativeValidation
    ) => {
      const fields = {};
      for (const name of fieldsNames) {
        const field = get(_fields, name);
        field && set(fields, name, field._f);
      }
      return {
        criteriaMode,
        names: [...fieldsNames],
        fields,
        shouldUseNativeValidation,
      };
    };

    var hasValidation = (options) =>
      options.mount &&
      (options.required ||
        options.min ||
        options.max ||
        options.maxLength ||
        options.minLength ||
        options.pattern ||
        options.validate);

    function schemaErrorLookup(errors, _fields, name) {
      const error = get(errors, name);
      if (error || isKey(name)) {
        return {
          error,
          name,
        };
      }
      const names = name.split(".");
      while (names.length) {
        const fieldName = names.join(".");
        const field = get(_fields, fieldName);
        const foundError = get(errors, fieldName);
        if (field && !Array.isArray(field) && name !== fieldName) {
          return { name };
        }
        if (foundError && foundError.type) {
          return {
            name: fieldName,
            error: foundError,
          };
        }
        names.pop();
      }
      return {
        name,
      };
    }

    function deepMerge(target, source) {
      if (isPrimitive(target) || isPrimitive(source)) {
        return source;
      }
      for (const key in source) {
        const targetValue = target[key];
        const sourceValue = source[key];
        try {
          target[key] =
            (isObject(targetValue) && isObject(sourceValue)) ||
            (Array.isArray(targetValue) && Array.isArray(sourceValue))
              ? deepMerge(targetValue, sourceValue)
              : sourceValue;
        } catch (_a) {}
      }
      return target;
    }

    function setDirtyFields(
      values,
      defaultValues,
      dirtyFields,
      parentNode,
      parentName
    ) {
      let index = -1;
      while (++index < values.length) {
        for (const key in values[index]) {
          if (Array.isArray(values[index][key])) {
            !dirtyFields[index] && (dirtyFields[index] = {});
            dirtyFields[index][key] = [];
            setDirtyFields(
              values[index][key],
              get(defaultValues[index] || {}, key, []),
              dirtyFields[index][key],
              dirtyFields[index],
              key
            );
          } else {
            !isNullOrUndefined(defaultValues) &&
            deepEqual(get(defaultValues[index] || {}, key), values[index][key])
              ? set(dirtyFields[index] || {}, key)
              : (dirtyFields[index] = Object.assign(
                  Object.assign({}, dirtyFields[index]),
                  { [key]: true }
                ));
          }
        }
        parentNode && !dirtyFields.length && delete parentNode[parentName];
      }
      return dirtyFields;
    }
    var setFieldArrayDirtyFields = (values, defaultValues, dirtyFields) =>
      deepMerge(
        setDirtyFields(
          values,
          defaultValues,
          dirtyFields.slice(0, values.length)
        ),
        setDirtyFields(
          defaultValues,
          values,
          dirtyFields.slice(0, values.length)
        )
      );

    var skipValidation = (
      isBlurEvent,
      isTouched,
      isSubmitted,
      reValidateMode,
      mode
    ) => {
      if (mode.isOnAll) {
        return false;
      } else if (!isSubmitted && mode.isOnTouch) {
        return !(isTouched || isBlurEvent);
      } else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
        return !isBlurEvent;
      } else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
        return isBlurEvent;
      }
      return true;
    };

    var unsetEmptyArray = (ref, name) =>
      !compact(get(ref, name, [])).length && unset(ref, name);

    var isMessage = (value) =>
      isString(value) ||
      react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(value);

    var isRegex = (value) => value instanceof RegExp;

    function getValidateError(result, ref, type = "validate") {
      if (
        isMessage(result) ||
        (Array.isArray(result) && result.every(isMessage)) ||
        (isBoolean(result) && !result)
      ) {
        return {
          type,
          message: isMessage(result) ? result : "",
          ref,
        };
      }
    }

    var getValueAndMessage = (validationData) =>
      isObject(validationData) && !isRegex(validationData)
        ? validationData
        : {
            value: validationData,
            message: "",
          };

    var validateField = async (
      field,
      inputValue,
      validateAllFieldCriteria,
      shouldUseNativeValidation
    ) => {
      const {
        ref,
        refs,
        required,
        maxLength,
        minLength,
        min,
        max,
        pattern,
        validate,
        name,
        valueAsNumber,
        mount,
        disabled,
      } = field._f;
      if (!mount || disabled) {
        return {};
      }
      const inputRef = refs ? refs[0] : ref;
      const setCustomValidty = (message) => {
        if (shouldUseNativeValidation && inputRef.reportValidity) {
          inputRef.setCustomValidity(isBoolean(message) ? "" : message || " ");
          inputRef.reportValidity();
        }
      };
      const error = {};
      const isRadio = isRadioInput(ref);
      const isCheckBox = isCheckBoxInput(ref);
      const isRadioOrCheckbox = isRadio || isCheckBox;
      const isEmpty =
        ((valueAsNumber || isFileInput(ref)) && !ref.value) ||
        inputValue === "" ||
        (Array.isArray(inputValue) && !inputValue.length);
      const appendErrorsCurry = appendErrors.bind(
        null,
        name,
        validateAllFieldCriteria,
        error
      );
      const getMinMaxMessage = (
        exceedMax,
        maxLengthMessage,
        minLengthMessage,
        maxType = INPUT_VALIDATION_RULES.maxLength,
        minType = INPUT_VALIDATION_RULES.minLength
      ) => {
        const message = exceedMax ? maxLengthMessage : minLengthMessage;
        error[name] = Object.assign(
          { type: exceedMax ? maxType : minType, message, ref },
          appendErrorsCurry(exceedMax ? maxType : minType, message)
        );
      };
      if (
        required &&
        ((!isRadioOrCheckbox && (isEmpty || isNullOrUndefined(inputValue))) ||
          (isBoolean(inputValue) && !inputValue) ||
          (isCheckBox && !getCheckboxValue(refs).isValid) ||
          (isRadio && !getRadioValue(refs).isValid))
      ) {
        const { value, message } = isMessage(required)
          ? { value: !!required, message: required }
          : getValueAndMessage(required);
        if (value) {
          error[name] = Object.assign(
            { type: INPUT_VALIDATION_RULES.required, message, ref: inputRef },
            appendErrorsCurry(INPUT_VALIDATION_RULES.required, message)
          );
          if (!validateAllFieldCriteria) {
            setCustomValidty(message);
            return error;
          }
        }
      }
      if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
        let exceedMax;
        let exceedMin;
        const maxOutput = getValueAndMessage(max);
        const minOutput = getValueAndMessage(min);
        if (!isNaN(inputValue)) {
          const valueNumber = ref.valueAsNumber || parseFloat(inputValue);
          if (!isNullOrUndefined(maxOutput.value)) {
            exceedMax = valueNumber > maxOutput.value;
          }
          if (!isNullOrUndefined(minOutput.value)) {
            exceedMin = valueNumber < minOutput.value;
          }
        } else {
          const valueDate = ref.valueAsDate || new Date(inputValue);
          if (isString(maxOutput.value)) {
            exceedMax = valueDate > new Date(maxOutput.value);
          }
          if (isString(minOutput.value)) {
            exceedMin = valueDate < new Date(minOutput.value);
          }
        }
        if (exceedMax || exceedMin) {
          getMinMaxMessage(
            !!exceedMax,
            maxOutput.message,
            minOutput.message,
            INPUT_VALIDATION_RULES.max,
            INPUT_VALIDATION_RULES.min
          );
          if (!validateAllFieldCriteria) {
            setCustomValidty(error[name].message);
            return error;
          }
        }
      }
      if ((maxLength || minLength) && !isEmpty && isString(inputValue)) {
        const maxLengthOutput = getValueAndMessage(maxLength);
        const minLengthOutput = getValueAndMessage(minLength);
        const exceedMax =
          !isNullOrUndefined(maxLengthOutput.value) &&
          inputValue.length > maxLengthOutput.value;
        const exceedMin =
          !isNullOrUndefined(minLengthOutput.value) &&
          inputValue.length < minLengthOutput.value;
        if (exceedMax || exceedMin) {
          getMinMaxMessage(
            exceedMax,
            maxLengthOutput.message,
            minLengthOutput.message
          );
          if (!validateAllFieldCriteria) {
            setCustomValidty(error[name].message);
            return error;
          }
        }
      }
      if (pattern && !isEmpty && isString(inputValue)) {
        const { value: patternValue, message } = getValueAndMessage(pattern);
        if (isRegex(patternValue) && !inputValue.match(patternValue)) {
          error[name] = Object.assign(
            { type: INPUT_VALIDATION_RULES.pattern, message, ref },
            appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message)
          );
          if (!validateAllFieldCriteria) {
            setCustomValidty(message);
            return error;
          }
        }
      }
      if (validate) {
        if (isFunction(validate)) {
          const result = await validate(inputValue);
          const validateError = getValidateError(result, inputRef);
          if (validateError) {
            error[name] = Object.assign(
              Object.assign({}, validateError),
              appendErrorsCurry(
                INPUT_VALIDATION_RULES.validate,
                validateError.message
              )
            );
            if (!validateAllFieldCriteria) {
              setCustomValidty(validateError.message);
              return error;
            }
          }
        } else if (isObject(validate)) {
          let validationResult = {};
          for (const key in validate) {
            if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
              break;
            }
            const validateError = getValidateError(
              await validate[key](inputValue),
              inputRef,
              key
            );
            if (validateError) {
              validationResult = Object.assign(
                Object.assign({}, validateError),
                appendErrorsCurry(key, validateError.message)
              );
              setCustomValidty(validateError.message);
              if (validateAllFieldCriteria) {
                error[name] = validationResult;
              }
            }
          }
          if (!isEmptyObject(validationResult)) {
            error[name] = Object.assign({ ref: inputRef }, validationResult);
            if (!validateAllFieldCriteria) {
              return error;
            }
          }
        }
      }
      setCustomValidty(true);
      return error;
    };

    const defaultOptions = {
      mode: VALIDATION_MODE.onSubmit,
      reValidateMode: VALIDATION_MODE.onChange,
      shouldFocusError: true,
    };
    const isWindowUndefined = typeof window === "undefined";
    function createFormControl(props = {}) {
      let _options = Object.assign(Object.assign({}, defaultOptions), props);
      let _formState = {
        isDirty: false,
        isValidating: false,
        dirtyFields: {},
        isSubmitted: false,
        submitCount: 0,
        touchedFields: {},
        isSubmitting: false,
        isSubmitSuccessful: false,
        isValid: false,
        errors: {},
      };
      let _fields = {};
      let _defaultValues = _options.defaultValues || {};
      let _formValues = _options.shouldUnregister
        ? {}
        : cloneObject(_defaultValues);
      let _stateFlags = {
        action: false,
        mount: false,
        watch: false,
      };
      let _names = {
        mount: new Set(),
        unMount: new Set(),
        array: new Set(),
        watch: new Set(),
      };
      let delayErrorCallback;
      let timer = 0;
      let validateFields = {};
      const _proxyFormState = {
        isDirty: false,
        dirtyFields: false,
        touchedFields: false,
        isValidating: false,
        isValid: false,
        errors: false,
      };
      const _subjects = {
        watch: createSubject(),
        array: createSubject(),
        state: createSubject(),
      };
      const validationModeBeforeSubmit = getValidationModes(_options.mode);
      const validationModeAfterSubmit = getValidationModes(
        _options.reValidateMode
      );
      const shouldDisplayAllAssociatedErrors =
        _options.criteriaMode === VALIDATION_MODE.all;
      const debounce =
        (callback, wait) =>
        (...args) => {
          clearTimeout(timer);
          timer = window.setTimeout(() => callback(...args), wait);
        };
      const isFieldWatched = (name, isBlurEvent) =>
        !isBlurEvent &&
        (_names.watchAll ||
          _names.watch.has(name) ||
          _names.watch.has((name.match(/\w+/) || [])[0]));
      const _updateValid = async (shouldSkipRender) => {
        let isValid = false;
        if (_proxyFormState.isValid) {
          isValid = _options.resolver
            ? isEmptyObject((await _executeSchema()).errors)
            : await executeBuildInValidation(_fields, true);
          if (!shouldSkipRender && isValid !== _formState.isValid) {
            _formState.isValid = isValid;
            _subjects.state.next({
              isValid,
            });
          }
        }
        return isValid;
      };
      const _updateFieldArray = (
        name,
        method,
        args,
        values = [],
        shouldSetValues = true,
        shouldSetFields = true
      ) => {
        _stateFlags.action = true;
        if (shouldSetFields && get(_fields, name)) {
          const fieldValues = method(get(_fields, name), args.argA, args.argB);
          shouldSetValues && set(_fields, name, fieldValues);
        }
        if (Array.isArray(get(_formState.errors, name))) {
          const errors = method(
            get(_formState.errors, name),
            args.argA,
            args.argB
          );
          shouldSetValues && set(_formState.errors, name, errors);
          unsetEmptyArray(_formState.errors, name);
        }
        if (
          _proxyFormState.touchedFields &&
          get(_formState.touchedFields, name)
        ) {
          const touchedFields = method(
            get(_formState.touchedFields, name),
            args.argA,
            args.argB
          );
          shouldSetValues && set(_formState.touchedFields, name, touchedFields);
          unsetEmptyArray(_formState.touchedFields, name);
        }
        if (_proxyFormState.dirtyFields || _proxyFormState.isDirty) {
          updateFieldArrayDirty(name, values);
        }
        _subjects.state.next({
          isDirty: _getDirty(name, values),
          dirtyFields: _formState.dirtyFields,
          errors: _formState.errors,
          isValid: _formState.isValid,
        });
      };
      const updateErrors = (name, error) => (
        set(_formState.errors, name, error),
        _subjects.state.next({
          errors: _formState.errors,
        })
      );
      const updateValidAndValue = (name, shouldSkipSetValueAs, ref) => {
        const field = get(_fields, name);
        if (field) {
          const defaultValue = get(
            _formValues,
            name,
            get(_defaultValues, name)
          );
          isUndefined(defaultValue) ||
          (ref && ref.defaultChecked) ||
          shouldSkipSetValueAs
            ? set(
                _formValues,
                name,
                shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f)
              )
            : setFieldValue(name, defaultValue);
        }
        _stateFlags.mount && _updateValid();
      };
      const updateTouchAndDirty = (
        name,
        fieldValue,
        isCurrentTouched,
        shouldRender = true
      ) => {
        let isFieldDirty = false;
        const output = {
          name,
        };
        const isPreviousFieldTouched = get(_formState.touchedFields, name);
        if (_proxyFormState.isDirty) {
          const isPreviousFormDirty = _formState.isDirty;
          _formState.isDirty = output.isDirty = _getDirty();
          isFieldDirty = isPreviousFormDirty !== output.isDirty;
        }
        if (_proxyFormState.dirtyFields && !isCurrentTouched) {
          const isPreviousFieldDirty = get(_formState.dirtyFields, name);
          const isCurrentFieldPristine = deepEqual(
            get(_defaultValues, name),
            fieldValue
          );
          isCurrentFieldPristine
            ? unset(_formState.dirtyFields, name)
            : set(_formState.dirtyFields, name, true);
          output.dirtyFields = _formState.dirtyFields;
          isFieldDirty =
            isFieldDirty ||
            isPreviousFieldDirty !== get(_formState.dirtyFields, name);
        }
        if (isCurrentTouched && !isPreviousFieldTouched) {
          set(_formState.touchedFields, name, isCurrentTouched);
          output.touchedFields = _formState.touchedFields;
          isFieldDirty =
            isFieldDirty ||
            (_proxyFormState.touchedFields &&
              isPreviousFieldTouched !== isCurrentTouched);
        }
        isFieldDirty && shouldRender && _subjects.state.next(output);
        return isFieldDirty ? output : {};
      };
      const updateFieldArrayDirty = (name, value) => (
        set(
          _formState.dirtyFields,
          name,
          setFieldArrayDirtyFields(
            value,
            get(_defaultValues, name, []),
            get(_formState.dirtyFields, name, [])
          )
        ),
        unsetEmptyArray(_formState.dirtyFields, name)
      );
      const shouldRenderByError = async (
        shouldSkipRender,
        name,
        isValid,
        error,
        fieldState
      ) => {
        const previousFieldError = get(_formState.errors, name);
        const shouldUpdateValid =
          _proxyFormState.isValid && _formState.isValid !== isValid;
        if (props.delayError && error) {
          delayErrorCallback =
            delayErrorCallback || debounce(updateErrors, props.delayError);
          delayErrorCallback(name, error);
        } else {
          clearTimeout(timer);
          error
            ? set(_formState.errors, name, error)
            : unset(_formState.errors, name);
        }
        if (
          ((error
            ? !deepEqual(previousFieldError, error)
            : previousFieldError) ||
            !isEmptyObject(fieldState) ||
            shouldUpdateValid) &&
          !shouldSkipRender
        ) {
          const updatedFormState = Object.assign(
            Object.assign(
              Object.assign({}, fieldState),
              shouldUpdateValid ? { isValid } : {}
            ),
            { errors: _formState.errors, name }
          );
          _formState = Object.assign(
            Object.assign({}, _formState),
            updatedFormState
          );
          _subjects.state.next(updatedFormState);
        }
        validateFields[name]--;
        if (_proxyFormState.isValidating && !validateFields[name]) {
          _subjects.state.next({
            isValidating: false,
          });
          validateFields = {};
        }
      };
      const _executeSchema = async (name) =>
        _options.resolver
          ? await _options.resolver(
              Object.assign({}, _formValues),
              _options.context,
              getResolverOptions(
                name || _names.mount,
                _fields,
                _options.criteriaMode,
                _options.shouldUseNativeValidation
              )
            )
          : {};
      const executeSchemaAndUpdateState = async (names) => {
        const { errors } = await _executeSchema();
        if (names) {
          for (const name of names) {
            const error = get(errors, name);
            error
              ? set(_formState.errors, name, error)
              : unset(_formState.errors, name);
          }
        } else {
          _formState.errors = errors;
        }
        return errors;
      };
      const executeBuildInValidation = async (
        fields,
        shouldOnlyCheckValid,
        context = {
          valid: true,
        }
      ) => {
        for (const name in fields) {
          const field = fields[name];
          if (field) {
            const fieldReference = field._f;
            const fieldValue = omit(field, "_f");
            if (fieldReference) {
              const fieldError = await validateField(
                field,
                get(_formValues, fieldReference.name),
                shouldDisplayAllAssociatedErrors,
                _options.shouldUseNativeValidation
              );
              if (fieldError[fieldReference.name]) {
                context.valid = false;
                if (shouldOnlyCheckValid) {
                  break;
                }
              }
              if (!shouldOnlyCheckValid) {
                fieldError[fieldReference.name]
                  ? set(
                      _formState.errors,
                      fieldReference.name,
                      fieldError[fieldReference.name]
                    )
                  : unset(_formState.errors, fieldReference.name);
              }
            }
            fieldValue &&
              (await executeBuildInValidation(
                fieldValue,
                shouldOnlyCheckValid,
                context
              ));
          }
        }
        return context.valid;
      };
      const _removeUnmounted = () => {
        for (const name of _names.unMount) {
          const field = get(_fields, name);
          field &&
            (field._f.refs
              ? field._f.refs.every((ref) => !live(ref))
              : !live(field._f.ref)) &&
            unregister(name);
        }
        _names.unMount = new Set();
      };
      const _getDirty = (name, data) => (
        name && data && set(_formValues, name, data),
        !deepEqual(getValues(), _defaultValues)
      );
      const _getWatch = (names, defaultValue, isGlobal) => {
        const fieldValues = Object.assign(
          {},
          _stateFlags.mount
            ? _formValues
            : isUndefined(defaultValue)
            ? _defaultValues
            : isString(names)
            ? { [names]: defaultValue }
            : defaultValue
        );
        return generateWatchOutput(names, _names, fieldValues, isGlobal);
      };
      const _getFieldArray = (name) =>
        get(
          _stateFlags.mount ? _formValues : _defaultValues,
          name,
          props.shouldUnregister ? get(_defaultValues, name, []) : []
        );
      const setFieldValue = (name, value, options = {}) => {
        const field = get(_fields, name);
        let fieldValue = value;
        if (field) {
          const fieldReference = field._f;
          if (fieldReference) {
            set(_formValues, name, getFieldValueAs(value, fieldReference));
            fieldValue =
              isWeb &&
              isHTMLElement(fieldReference.ref) &&
              isNullOrUndefined(value)
                ? ""
                : value;
            if (isFileInput(fieldReference.ref) && !isString(fieldValue)) {
              fieldReference.ref.files = fieldValue;
            } else if (isMultipleSelect(fieldReference.ref)) {
              [...fieldReference.ref.options].forEach(
                (selectRef) =>
                  (selectRef.selected = fieldValue.includes(selectRef.value))
              );
            } else if (fieldReference.refs) {
              if (isCheckBoxInput(fieldReference.ref)) {
                fieldReference.refs.length > 1
                  ? fieldReference.refs.forEach(
                      (checkboxRef) =>
                        (checkboxRef.checked = Array.isArray(fieldValue)
                          ? !!fieldValue.find(
                              (data) => data === checkboxRef.value
                            )
                          : fieldValue === checkboxRef.value)
                    )
                  : (fieldReference.refs[0].checked = !!fieldValue);
              } else {
                fieldReference.refs.forEach(
                  (radioRef) =>
                    (radioRef.checked = radioRef.value === fieldValue)
                );
              }
            } else {
              fieldReference.ref.value = fieldValue;
            }
          }
        }
        (options.shouldDirty || options.shouldTouch) &&
          updateTouchAndDirty(name, fieldValue, options.shouldTouch);
        options.shouldValidate && trigger(name);
      };
      const setValues = (name, value, options) => {
        for (const fieldKey in value) {
          const fieldValue = value[fieldKey];
          const fieldName = `${name}.${fieldKey}`;
          const field = get(_fields, fieldName);
          (_names.array.has(name) ||
            !isPrimitive(fieldValue) ||
            (field && !field._f)) &&
          !isDateObject(fieldValue)
            ? setValues(fieldName, fieldValue, options)
            : setFieldValue(fieldName, fieldValue, options);
        }
      };
      const setValue = (name, value, options = {}) => {
        const field = get(_fields, name);
        const isFieldArray = _names.array.has(name);
        set(_formValues, name, value);
        if (isFieldArray) {
          _subjects.array.next({
            name,
            values: _formValues,
          });
          if (
            (_proxyFormState.isDirty || _proxyFormState.dirtyFields) &&
            options.shouldDirty
          ) {
            updateFieldArrayDirty(name, value);
            _subjects.state.next({
              name,
              dirtyFields: _formState.dirtyFields,
              isDirty: _getDirty(name, value),
            });
          }
        } else {
          field && !field._f && !isNullOrUndefined(value)
            ? setValues(name, value, options)
            : setFieldValue(name, value, options);
        }
        isFieldWatched(name) && _subjects.state.next({});
        _subjects.watch.next({
          name,
        });
      };
      const handleChange = async (event) => {
        const target = event.target;
        let name = target.name;
        const field = get(_fields, name);
        if (field) {
          let error;
          let isValid;
          const fieldValue = target.type
            ? getFieldValue(field._f)
            : target.value;
          const isBlurEvent = event.type === EVENTS.BLUR;
          const shouldSkipValidation =
            (!hasValidation(field._f) &&
              !_options.resolver &&
              !get(_formState.errors, name) &&
              !field._f.deps) ||
            skipValidation(
              isBlurEvent,
              get(_formState.touchedFields, name),
              _formState.isSubmitted,
              validationModeAfterSubmit,
              validationModeBeforeSubmit
            );
          const isWatched = isFieldWatched(name, isBlurEvent);
          if (isBlurEvent) {
            field._f.onBlur && field._f.onBlur(event);
          } else if (field._f.onChange) {
            field._f.onChange(event);
          }
          set(_formValues, name, fieldValue);
          const fieldState = updateTouchAndDirty(
            name,
            fieldValue,
            isBlurEvent,
            false
          );
          const shouldRender = !isEmptyObject(fieldState) || isWatched;
          !isBlurEvent &&
            _subjects.watch.next({
              name,
              type: event.type,
            });
          if (shouldSkipValidation) {
            return (
              shouldRender &&
              _subjects.state.next(
                Object.assign({ name }, isWatched ? {} : fieldState)
              )
            );
          }
          !isBlurEvent && isWatched && _subjects.state.next({});
          validateFields[name] = validateFields[name] ? +1 : 1;
          _proxyFormState.isValidating &&
            _subjects.state.next({
              isValidating: true,
            });
          if (_options.resolver) {
            const { errors } = await _executeSchema([name]);
            const previousErrorLookupResult = schemaErrorLookup(
              _formState.errors,
              _fields,
              name
            );
            const errorLookupResult = schemaErrorLookup(
              errors,
              _fields,
              previousErrorLookupResult.name || name
            );
            error = errorLookupResult.error;
            name = errorLookupResult.name;
            isValid = isEmptyObject(errors);
          } else {
            error = (
              await validateField(
                field,
                get(_formValues, name),
                shouldDisplayAllAssociatedErrors,
                _options.shouldUseNativeValidation
              )
            )[name];
            isValid = await _updateValid(true);
          }
          field._f.deps && trigger(field._f.deps);
          shouldRenderByError(false, name, isValid, error, fieldState);
        }
      };
      const trigger = async (name, options = {}) => {
        let isValid;
        let validationResult;
        const fieldNames = convertToArrayPayload(name);
        _subjects.state.next({
          isValidating: true,
        });
        if (_options.resolver) {
          const errors = await executeSchemaAndUpdateState(
            isUndefined(name) ? name : fieldNames
          );
          isValid = isEmptyObject(errors);
          validationResult = name
            ? !fieldNames.some((name) => get(errors, name))
            : isValid;
        } else if (name) {
          validationResult = (
            await Promise.all(
              fieldNames.map(async (fieldName) => {
                const field = get(_fields, fieldName);
                return await executeBuildInValidation(
                  field && field._f ? { [fieldName]: field } : field
                );
              })
            )
          ).every(Boolean);
          !(!validationResult && !_formState.isValid) && _updateValid();
        } else {
          validationResult = isValid = await executeBuildInValidation(_fields);
        }
        _subjects.state.next(
          Object.assign(
            Object.assign(
              Object.assign(
                {},
                !isString(name) ||
                  (_proxyFormState.isValid && isValid !== _formState.isValid)
                  ? {}
                  : { name }
              ),
              _options.resolver ? { isValid } : {}
            ),
            { errors: _formState.errors, isValidating: false }
          )
        );
        options.shouldFocus &&
          !validationResult &&
          focusFieldBy(
            _fields,
            (key) => get(_formState.errors, key),
            name ? fieldNames : _names.mount
          );
        return validationResult;
      };
      const getValues = (fieldNames) => {
        const values = Object.assign(
          Object.assign({}, _defaultValues),
          _stateFlags.mount ? _formValues : {}
        );
        return isUndefined(fieldNames)
          ? values
          : isString(fieldNames)
          ? get(values, fieldNames)
          : fieldNames.map((name) => get(values, name));
      };
      const clearErrors = (name) => {
        name
          ? convertToArrayPayload(name).forEach((inputName) =>
              unset(_formState.errors, inputName)
            )
          : (_formState.errors = {});
        _subjects.state.next({
          errors: _formState.errors,
          isValid: true,
        });
      };
      const setError = (name, error, options) => {
        const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
        set(
          _formState.errors,
          name,
          Object.assign(Object.assign({}, error), { ref })
        );
        _subjects.state.next({
          name,
          errors: _formState.errors,
          isValid: false,
        });
        options && options.shouldFocus && ref && ref.focus && ref.focus();
      };
      const watch = (name, defaultValue) =>
        isFunction(name)
          ? _subjects.watch.subscribe({
              next: (info) => name(_getWatch(undefined, defaultValue), info),
            })
          : _getWatch(name, defaultValue, true);
      const unregister = (name, options = {}) => {
        for (const fieldName of name
          ? convertToArrayPayload(name)
          : _names.mount) {
          _names.mount.delete(fieldName);
          _names.array.delete(fieldName);
          if (get(_fields, fieldName)) {
            if (!options.keepValue) {
              unset(_fields, fieldName);
              unset(_formValues, fieldName);
            }
            !options.keepError && unset(_formState.errors, fieldName);
            !options.keepDirty && unset(_formState.dirtyFields, fieldName);
            !options.keepTouched && unset(_formState.touchedFields, fieldName);
            !_options.shouldUnregister &&
              !options.keepDefaultValue &&
              unset(_defaultValues, fieldName);
          }
        }
        _subjects.watch.next({});
        _subjects.state.next(
          Object.assign(
            Object.assign({}, _formState),
            !options.keepDirty ? {} : { isDirty: _getDirty() }
          )
        );
        !options.keepIsValid && _updateValid();
      };
      const register = (name, options = {}) => {
        const field = get(_fields, name);
        set(_fields, name, {
          _f: Object.assign(
            Object.assign(
              Object.assign(
                {},
                field && field._f ? field._f : { ref: { name } }
              ),
              { name, mount: true }
            ),
            options
          ),
        });
        _names.mount.add(name);
        !isUndefined(options.value) &&
          !options.disabled &&
          set(_formValues, name, get(_formValues, name, options.value));
        field
          ? isBoolean(options.disabled) &&
            set(
              _formValues,
              name,
              options.disabled
                ? undefined
                : get(_formValues, name, getFieldValue(field._f))
            )
          : updateValidAndValue(name, true);
        return isWindowUndefined
          ? { name: name }
          : Object.assign(
              Object.assign(
                { name },
                isBoolean(options.disabled)
                  ? { disabled: options.disabled }
                  : {}
              ),
              {
                onChange: handleChange,
                onBlur: handleChange,
                ref: (ref) => {
                  if (ref) {
                    register(name, options);
                    let field = get(_fields, name);
                    const fieldRef = isUndefined(ref.value)
                      ? ref.querySelectorAll
                        ? ref.querySelectorAll("input,select,textarea")[0] ||
                          ref
                        : ref
                      : ref;
                    const isRadioOrCheckbox =
                      isRadioOrCheckboxFunction(fieldRef);
                    if (
                      fieldRef === field._f.ref ||
                      (isRadioOrCheckbox &&
                        compact(field._f.refs || []).find(
                          (option) => option === fieldRef
                        ))
                    ) {
                      return;
                    }
                    field = {
                      _f: isRadioOrCheckbox
                        ? Object.assign(Object.assign({}, field._f), {
                            refs: [
                              ...compact(field._f.refs || []).filter(live),
                              fieldRef,
                            ],
                            ref: { type: fieldRef.type, name },
                          })
                        : Object.assign(Object.assign({}, field._f), {
                            ref: fieldRef,
                          }),
                    };
                    set(_fields, name, field);
                    (!options || !options.disabled) &&
                      updateValidAndValue(name, false, fieldRef);
                  } else {
                    const field = get(_fields, name, {});
                    const shouldUnregister =
                      _options.shouldUnregister || options.shouldUnregister;
                    if (field._f) {
                      field._f.mount = false;
                    }
                    shouldUnregister &&
                      !(
                        isNameInFieldArray(_names.array, name) &&
                        _stateFlags.action
                      ) &&
                      _names.unMount.add(name);
                  }
                },
              }
            );
      };
      const handleSubmit = (onValid, onInvalid) => async (e) => {
        if (e) {
          e.preventDefault && e.preventDefault();
          e.persist && e.persist();
        }
        let hasNoPromiseError = true;
        let fieldValues = Object.assign({}, _formValues);
        _subjects.state.next({
          isSubmitting: true,
        });
        try {
          if (_options.resolver) {
            const { errors, values } = await _executeSchema();
            _formState.errors = errors;
            fieldValues = values;
          } else {
            await executeBuildInValidation(_fields);
          }
          if (
            isEmptyObject(_formState.errors) &&
            Object.keys(_formState.errors).every((name) =>
              get(fieldValues, name)
            )
          ) {
            _subjects.state.next({
              errors: {},
              isSubmitting: true,
            });
            await onValid(fieldValues, e);
          } else {
            onInvalid && (await onInvalid(_formState.errors, e));
            _options.shouldFocusError &&
              focusFieldBy(
                _fields,
                (key) => get(_formState.errors, key),
                _names.mount
              );
          }
        } catch (err) {
          hasNoPromiseError = false;
          throw err;
        } finally {
          _formState.isSubmitted = true;
          _subjects.state.next({
            isSubmitted: true,
            isSubmitting: false,
            isSubmitSuccessful:
              isEmptyObject(_formState.errors) && hasNoPromiseError,
            submitCount: _formState.submitCount + 1,
            errors: _formState.errors,
          });
        }
      };
      const resetField = (name, options = {}) => {
        if (isUndefined(options.defaultValue)) {
          setValue(name, get(_defaultValues, name));
        } else {
          setValue(name, options.defaultValue);
          set(_defaultValues, name, options.defaultValue);
        }
        if (!options.keepTouched) {
          unset(_formState.touchedFields, name);
        }
        if (!options.keepDirty) {
          unset(_formState.dirtyFields, name);
          _formState.isDirty = options.defaultValue
            ? _getDirty(name, get(_defaultValues, name))
            : _getDirty();
        }
        if (!options.keepError) {
          unset(_formState.errors, name);
          _proxyFormState.isValid && _updateValid();
        }
        _subjects.state.next(Object.assign({}, _formState));
      };
      const reset = (formValues, keepStateOptions = {}) => {
        const updatedValues = formValues || _defaultValues;
        const cloneUpdatedValues = cloneObject(updatedValues);
        const values = !isEmptyObject(formValues)
          ? cloneUpdatedValues
          : _defaultValues;
        if (!keepStateOptions.keepDefaultValues) {
          _defaultValues = updatedValues;
        }
        if (!keepStateOptions.keepValues) {
          if (isWeb) {
            for (const name of _names.mount) {
              const field = get(_fields, name);
              if (field && field._f) {
                const fieldReference = Array.isArray(field._f.refs)
                  ? field._f.refs[0]
                  : field._f.ref;
                try {
                  isHTMLElement(fieldReference) &&
                    fieldReference.closest("form").reset();
                  break;
                } catch (_a) {}
              }
            }
          }
          _formValues = props.shouldUnregister
            ? keepStateOptions.keepDefaultValues
              ? cloneObject(_defaultValues)
              : {}
            : cloneUpdatedValues;
          _fields = {};
          _subjects.watch.next({
            values,
          });
          _subjects.array.next({
            values,
          });
        }
        _names = {
          mount: new Set(),
          unMount: new Set(),
          array: new Set(),
          watch: new Set(),
          watchAll: false,
          focus: "",
        };
        _subjects.state.next({
          submitCount: keepStateOptions.keepSubmitCount
            ? _formState.submitCount
            : 0,
          isDirty: keepStateOptions.keepDirty
            ? _formState.isDirty
            : keepStateOptions.keepDefaultValues
            ? !deepEqual(formValues, _defaultValues)
            : false,
          isSubmitted: keepStateOptions.keepIsSubmitted
            ? _formState.isSubmitted
            : false,
          dirtyFields: keepStateOptions.keepDirty
            ? _formState.dirtyFields
            : keepStateOptions.keepDefaultValues && formValues
            ? Object.entries(formValues).reduce(
                (previous, [key, value]) =>
                  Object.assign(Object.assign({}, previous), {
                    [key]: value !== get(_defaultValues, key),
                  }),
                {}
              )
            : {},
          touchedFields: keepStateOptions.keepTouched
            ? _formState.touchedFields
            : {},
          errors: keepStateOptions.keepErrors ? _formState.errors : {},
          isSubmitting: false,
          isSubmitSuccessful: false,
        });
        _stateFlags.mount =
          !_proxyFormState.isValid || !!keepStateOptions.keepIsValid;
        _stateFlags.watch = !!props.shouldUnregister;
      };
      const setFocus = (name) => {
        const field = get(_fields, name)._f;
        (field.ref.focus ? field.ref : field.refs[0]).focus();
      };
      return {
        control: {
          register,
          unregister,
          _executeSchema,
          _getWatch,
          _getDirty,
          _updateValid,
          _removeUnmounted,
          _updateFieldArray,
          _getFieldArray,
          _subjects,
          _proxyFormState,
          get _fields() {
            return _fields;
          },
          set _fields(value) {
            _fields = value;
          },
          get _formValues() {
            return _formValues;
          },
          set _formValues(value) {
            _formValues = value;
          },
          get _stateFlags() {
            return _stateFlags;
          },
          set _stateFlags(value) {
            _stateFlags = value;
          },
          get _defaultValues() {
            return _defaultValues;
          },
          set _defaultValues(value) {
            _defaultValues = value;
          },
          get _names() {
            return _names;
          },
          set _names(value) {
            _names = value;
          },
          get _formState() {
            return _formState;
          },
          set _formState(value) {
            _formState = value;
          },
          get _options() {
            return _options;
          },
          set _options(value) {
            _options = Object.assign(Object.assign({}, _options), value);
          },
        },
        trigger,
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        reset,
        resetField,
        clearErrors,
        unregister,
        setError,
        setFocus,
      };
    }

    function useForm(props = {}) {
      const _formControl = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
      const [formState, updateFormState] =
        react__WEBPACK_IMPORTED_MODULE_0__.useState({
          isDirty: false,
          isValidating: false,
          dirtyFields: {},
          isSubmitted: false,
          submitCount: 0,
          touchedFields: {},
          isSubmitting: false,
          isSubmitSuccessful: false,
          isValid: false,
          errors: {},
        });
      if (_formControl.current) {
        _formControl.current.control._options = props;
      } else {
        _formControl.current = Object.assign(
          Object.assign({}, createFormControl(props)),
          { formState }
        );
      }
      const control = _formControl.current.control;
      useSubscribe({
        subject: control._subjects.state,
        callback: (formState) => {
          if (shouldRenderFormState(formState, control._proxyFormState, true)) {
            control._formState = Object.assign(
              Object.assign({}, control._formState),
              formState
            );
            updateFormState(Object.assign({}, control._formState));
          }
        },
      });
      react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (!control._stateFlags.mount) {
          control._proxyFormState.isValid && control._updateValid();
          control._stateFlags.mount = true;
        }
        if (control._stateFlags.watch) {
          control._stateFlags.watch = false;
          control._subjects.state.next({});
        }
        control._removeUnmounted();
      });
      react__WEBPACK_IMPORTED_MODULE_0__.useEffect(
        () => () =>
          Object.values(control._subjects).forEach((subject) =>
            subject.unsubscribe()
          ),
        [control]
      );
      _formControl.current.formState = getProxyFormState(
        formState,
        control._proxyFormState
      );
      return _formControl.current;
    }

    //# sourceMappingURL=index.esm.js.map

    /***/
  },

  /***/ 26972: /***/ (
    __unused_webpack_module,
    exports,
    __webpack_require__
  ) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react = __webpack_require__(67294),
      reactDom = __webpack_require__(73935);
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;

      _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

      return _setPrototypeOf(o, p);
    }

    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;

      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }

      return target;
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }

      return self;
    }
    /**
     * Check whether some DOM node is our Component's node.
     */
    function isNodeFound(current, componentNode, ignoreClass) {
      if (current === componentNode) {
        return true;
      } // SVG <use/> elements do not technically reside in the rendered DOM, so
      // they do not have classList directly, but they offer a link to their
      // corresponding element, which can have classList. This extra check is for
      // that case.
      // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
      // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17

      if (current.correspondingElement) {
        return current.correspondingElement.classList.contains(ignoreClass);
      }

      return current.classList.contains(ignoreClass);
    }
    /**
     * Try to find our node in a hierarchy of nodes, returning the document
     * node as highest node if our node is not found in the path up.
     */

    function findHighest(current, componentNode, ignoreClass) {
      if (current === componentNode) {
        return true;
      } // If source=local then this event came from 'somewhere'
      // inside and should be ignored. We could handle this with
      // a layered approach, too, but that requires going back to
      // thinking in terms of Dom node nesting, running counter
      // to React's 'you shouldn't care about the DOM' philosophy.
      // Also cover shadowRoot node by checking current.host

      while (current.parentNode || current.host) {
        // Only check normal node without shadowRoot
        if (
          current.parentNode &&
          isNodeFound(current, componentNode, ignoreClass)
        ) {
          return true;
        }

        current = current.parentNode || current.host;
      }

      return current;
    }
    /**
     * Check if the browser scrollbar was clicked
     */

    function clickedScrollbar(evt) {
      return (
        document.documentElement.clientWidth <= evt.clientX ||
        document.documentElement.clientHeight <= evt.clientY
      );
    } // ideally will get replaced with external dep
    // when rafrex/detect-passive-events#4 and rafrex/detect-passive-events#5 get merged in
    var testPassiveEventSupport = function testPassiveEventSupport() {
      if (
        typeof window === "undefined" ||
        typeof window.addEventListener !== "function"
      ) {
        return;
      }

      var passive = false;
      var options = Object.defineProperty({}, "passive", {
        get: function get() {
          passive = true;
        },
      });

      var noop = function noop() {};

      window.addEventListener("testPassiveEventSupport", noop, options);
      window.removeEventListener("testPassiveEventSupport", noop, options);
      return passive;
    };
    function autoInc(seed) {
      if (seed === void 0) {
        seed = 0;
      }

      return function () {
        return ++seed;
      };
    }

    var uid = autoInc();
    var passiveEventSupport;
    var handlersMap = {};
    var enabledInstances = {};
    var touchEvents = ["touchstart", "touchmove"];
    var IGNORE_CLASS_NAME = "ignore-react-onclickoutside";
    /**
     * Options for addEventHandler and removeEventHandler
     */

    function getEventHandlerOptions(instance, eventName) {
      var handlerOptions = null;
      var isTouchEvent = touchEvents.indexOf(eventName) !== -1;

      if (isTouchEvent && passiveEventSupport) {
        handlerOptions = {
          passive: !instance.props.preventDefault,
        };
      }

      return handlerOptions;
    }
    /**
     * This function generates the HOC function that you'll use
     * in order to impart onOutsideClick listening to an
     * arbitrary component. It gets called at the end of the
     * bootstrapping code to yield an instance of the
     * onClickOutsideHOC function defined inside setupHOC().
     */

    function onClickOutsideHOC(WrappedComponent, config) {
      var _class, _temp;

      var componentName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";
      return (
        (_temp = _class =
          /*#__PURE__*/ (function (_Component) {
            _inheritsLoose(onClickOutside, _Component);

            function onClickOutside(props) {
              var _this;

              _this = _Component.call(this, props) || this;

              _this.__outsideClickHandler = function (event) {
                if (typeof _this.__clickOutsideHandlerProp === "function") {
                  _this.__clickOutsideHandlerProp(event);

                  return;
                }

                var instance = _this.getInstance();

                if (typeof instance.props.handleClickOutside === "function") {
                  instance.props.handleClickOutside(event);
                  return;
                }

                if (typeof instance.handleClickOutside === "function") {
                  instance.handleClickOutside(event);
                  return;
                }

                throw new Error(
                  "WrappedComponent: " +
                    componentName +
                    " lacks a handleClickOutside(event) function for processing outside click events."
                );
              };

              _this.__getComponentNode = function () {
                var instance = _this.getInstance();

                if (config && typeof config.setClickOutsideRef === "function") {
                  return config.setClickOutsideRef()(instance);
                }

                if (typeof instance.setClickOutsideRef === "function") {
                  return instance.setClickOutsideRef();
                }

                return reactDom.findDOMNode(instance);
              };

              _this.enableOnClickOutside = function () {
                if (
                  typeof document === "undefined" ||
                  enabledInstances[_this._uid]
                ) {
                  return;
                }

                if (typeof passiveEventSupport === "undefined") {
                  passiveEventSupport = testPassiveEventSupport();
                }

                enabledInstances[_this._uid] = true;
                var events = _this.props.eventTypes;

                if (!events.forEach) {
                  events = [events];
                }

                handlersMap[_this._uid] = function (event) {
                  if (_this.componentNode === null) return;

                  if (_this.props.preventDefault) {
                    event.preventDefault();
                  }

                  if (_this.props.stopPropagation) {
                    event.stopPropagation();
                  }

                  if (_this.props.excludeScrollbar && clickedScrollbar(event))
                    return;
                  var current =
                    (event.composed &&
                      event.composedPath &&
                      event.composedPath().shift()) ||
                    event.target;

                  if (
                    findHighest(
                      current,
                      _this.componentNode,
                      _this.props.outsideClickIgnoreClass
                    ) !== document
                  ) {
                    return;
                  }

                  _this.__outsideClickHandler(event);
                };

                events.forEach(function (eventName) {
                  document.addEventListener(
                    eventName,
                    handlersMap[_this._uid],
                    getEventHandlerOptions(
                      _assertThisInitialized(_this),
                      eventName
                    )
                  );
                });
              };

              _this.disableOnClickOutside = function () {
                delete enabledInstances[_this._uid];
                var fn = handlersMap[_this._uid];

                if (fn && typeof document !== "undefined") {
                  var events = _this.props.eventTypes;

                  if (!events.forEach) {
                    events = [events];
                  }

                  events.forEach(function (eventName) {
                    return document.removeEventListener(
                      eventName,
                      fn,
                      getEventHandlerOptions(
                        _assertThisInitialized(_this),
                        eventName
                      )
                    );
                  });
                  delete handlersMap[_this._uid];
                }
              };

              _this.getRef = function (ref) {
                return (_this.instanceRef = ref);
              };

              _this._uid = uid();
              return _this;
            }
            /**
             * Access the WrappedComponent's instance.
             */

            var _proto = onClickOutside.prototype;

            _proto.getInstance = function getInstance() {
              if (
                WrappedComponent.prototype &&
                !WrappedComponent.prototype.isReactComponent
              ) {
                return this;
              }

              var ref = this.instanceRef;
              return ref.getInstance ? ref.getInstance() : ref;
            };

            /**
             * Add click listeners to the current document,
             * linked to this component's state.
             */
            _proto.componentDidMount = function componentDidMount() {
              // If we are in an environment without a DOM such
              // as shallow rendering or snapshots then we exit
              // early to prevent any unhandled errors being thrown.
              if (typeof document === "undefined" || !document.createElement) {
                return;
              }

              var instance = this.getInstance();

              if (config && typeof config.handleClickOutside === "function") {
                this.__clickOutsideHandlerProp =
                  config.handleClickOutside(instance);

                if (typeof this.__clickOutsideHandlerProp !== "function") {
                  throw new Error(
                    "WrappedComponent: " +
                      componentName +
                      " lacks a function for processing outside click events specified by the handleClickOutside config option."
                  );
                }
              }

              this.componentNode = this.__getComponentNode(); // return early so we dont initiate onClickOutside

              if (this.props.disableOnClickOutside) return;
              this.enableOnClickOutside();
            };

            _proto.componentDidUpdate = function componentDidUpdate() {
              this.componentNode = this.__getComponentNode();
            };
            /**
             * Remove all document's event listeners for this component
             */

            _proto.componentWillUnmount = function componentWillUnmount() {
              this.disableOnClickOutside();
            };
            /**
             * Can be called to explicitly enable event listening
             * for clicks and touches outside of this element.
             */

            /**
             * Pass-through render
             */
            _proto.render = function render() {
              // eslint-disable-next-line no-unused-vars
              var _this$props = this.props;
              _this$props.excludeScrollbar;
              var props = _objectWithoutPropertiesLoose(_this$props, [
                "excludeScrollbar",
              ]);

              if (
                WrappedComponent.prototype &&
                WrappedComponent.prototype.isReactComponent
              ) {
                props.ref = this.getRef;
              } else {
                props.wrappedRef = this.getRef;
              }

              props.disableOnClickOutside = this.disableOnClickOutside;
              props.enableOnClickOutside = this.enableOnClickOutside;
              return react.createElement(WrappedComponent, props);
            };

            return onClickOutside;
          })(react.Component)),
        (_class.displayName = "OnClickOutside(" + componentName + ")"),
        (_class.defaultProps = {
          eventTypes: ["mousedown", "touchstart"],
          excludeScrollbar: (config && config.excludeScrollbar) || false,
          outsideClickIgnoreClass: IGNORE_CLASS_NAME,
          preventDefault: false,
          stopPropagation: false,
        }),
        (_class.getClass = function () {
          return WrappedComponent.getClass
            ? WrappedComponent.getClass()
            : WrappedComponent;
        }),
        _temp
      );
    }
    exports.IGNORE_CLASS_NAME = IGNORE_CLASS_NAME;
    exports["default"] = onClickOutsideHOC;

    /***/
  },

  /***/ 69681: /***/ (
    __unused_webpack_module,
    exports,
    __webpack_require__
  ) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    exports.Manager = Manager;
    exports.ManagerReferenceNodeSetterContext =
      exports.ManagerReferenceNodeContext = void 0;

    var React = _interopRequireWildcard(__webpack_require__(67294));

    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
      };
      return cache;
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (typeof obj !== "object" && typeof obj !== "function")
      ) {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }

    var ManagerReferenceNodeContext = React.createContext();
    exports.ManagerReferenceNodeContext = ManagerReferenceNodeContext;
    var ManagerReferenceNodeSetterContext = React.createContext();
    exports.ManagerReferenceNodeSetterContext =
      ManagerReferenceNodeSetterContext;

    function Manager(_ref) {
      var children = _ref.children;

      var _React$useState = React.useState(null),
        referenceNode = _React$useState[0],
        setReferenceNode = _React$useState[1];

      var hasUnmounted = React.useRef(false);
      React.useEffect(function () {
        return function () {
          hasUnmounted.current = true;
        };
      }, []);
      var handleSetReferenceNode = React.useCallback(function (node) {
        if (!hasUnmounted.current) {
          setReferenceNode(node);
        }
      }, []);
      return /*#__PURE__*/ React.createElement(
        ManagerReferenceNodeContext.Provider,
        {
          value: referenceNode,
        },
        /*#__PURE__*/ React.createElement(
          ManagerReferenceNodeSetterContext.Provider,
          {
            value: handleSetReferenceNode,
          },
          children
        )
      );
    }

    /***/
  },

  /***/ 54903: /***/ (
    __unused_webpack_module,
    exports,
    __webpack_require__
  ) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    exports.Popper = Popper;

    var React = _interopRequireWildcard(__webpack_require__(67294));

    var _Manager = __webpack_require__(69681);

    var _utils = __webpack_require__(8526);

    var _usePopper2 = __webpack_require__(29555);

    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
      };
      return cache;
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (typeof obj !== "object" && typeof obj !== "function")
      ) {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }

    var NOOP = function NOOP() {
      return void 0;
    };

    var NOOP_PROMISE = function NOOP_PROMISE() {
      return Promise.resolve(null);
    };

    var EMPTY_MODIFIERS = [];

    function Popper(_ref) {
      var _ref$placement = _ref.placement,
        placement = _ref$placement === void 0 ? "bottom" : _ref$placement,
        _ref$strategy = _ref.strategy,
        strategy = _ref$strategy === void 0 ? "absolute" : _ref$strategy,
        _ref$modifiers = _ref.modifiers,
        modifiers =
          _ref$modifiers === void 0 ? EMPTY_MODIFIERS : _ref$modifiers,
        referenceElement = _ref.referenceElement,
        onFirstUpdate = _ref.onFirstUpdate,
        innerRef = _ref.innerRef,
        children = _ref.children;
      var referenceNode = React.useContext(
        _Manager.ManagerReferenceNodeContext
      );

      var _React$useState = React.useState(null),
        popperElement = _React$useState[0],
        setPopperElement = _React$useState[1];

      var _React$useState2 = React.useState(null),
        arrowElement = _React$useState2[0],
        setArrowElement = _React$useState2[1];

      React.useEffect(
        function () {
          (0, _utils.setRef)(innerRef, popperElement);
        },
        [innerRef, popperElement]
      );
      var options = React.useMemo(
        function () {
          return {
            placement: placement,
            strategy: strategy,
            onFirstUpdate: onFirstUpdate,
            modifiers: [].concat(modifiers, [
              {
                name: "arrow",
                enabled: arrowElement != null,
                options: {
                  element: arrowElement,
                },
              },
            ]),
          };
        },
        [placement, strategy, onFirstUpdate, modifiers, arrowElement]
      );

      var _usePopper = (0, _usePopper2.usePopper)(
          referenceElement || referenceNode,
          popperElement,
          options
        ),
        state = _usePopper.state,
        styles = _usePopper.styles,
        forceUpdate = _usePopper.forceUpdate,
        update = _usePopper.update;

      var childrenProps = React.useMemo(
        function () {
          return {
            ref: setPopperElement,
            style: styles.popper,
            placement: state ? state.placement : placement,
            hasPopperEscaped:
              state && state.modifiersData.hide
                ? state.modifiersData.hide.hasPopperEscaped
                : null,
            isReferenceHidden:
              state && state.modifiersData.hide
                ? state.modifiersData.hide.isReferenceHidden
                : null,
            arrowProps: {
              style: styles.arrow,
              ref: setArrowElement,
            },
            forceUpdate: forceUpdate || NOOP,
            update: update || NOOP_PROMISE,
          };
        },
        [
          setPopperElement,
          setArrowElement,
          placement,
          state,
          styles,
          update,
          forceUpdate,
        ]
      );
      return (0, _utils.unwrapArray)(children)(childrenProps);
    }

    /***/
  },

  /***/ 16301: /***/ (
    __unused_webpack_module,
    exports,
    __webpack_require__
  ) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    exports.Reference = Reference;

    var React = _interopRequireWildcard(__webpack_require__(67294));

    var _warning = _interopRequireDefault(__webpack_require__(42473));

    var _Manager = __webpack_require__(69681);

    var _utils = __webpack_require__(8526);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
      };
      return cache;
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (typeof obj !== "object" && typeof obj !== "function")
      ) {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }

    function Reference(_ref) {
      var children = _ref.children,
        innerRef = _ref.innerRef;
      var setReferenceNode = React.useContext(
        _Manager.ManagerReferenceNodeSetterContext
      );
      var refHandler = React.useCallback(
        function (node) {
          (0, _utils.setRef)(innerRef, node);
          (0, _utils.safeInvoke)(setReferenceNode, node);
        },
        [innerRef, setReferenceNode]
      ); // ran on unmount

      React.useEffect(function () {
        return function () {
          return (0, _utils.setRef)(innerRef, null);
        };
      });
      React.useEffect(
        function () {
          (0, _warning["default"])(
            Boolean(setReferenceNode),
            "`Reference` should not be used outside of a `Manager` component."
          );
        },
        [setReferenceNode]
      );
      return (0, _utils.unwrapArray)(children)({
        ref: refHandler,
      });
    }

    /***/
  },

  /***/ 7795: /***/ (__unused_webpack_module, exports, __webpack_require__) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "Popper", {
      enumerable: true,
      get: function get() {
        return _Popper.Popper;
      },
    });
    Object.defineProperty(exports, "Manager", {
      enumerable: true,
      get: function get() {
        return _Manager.Manager;
      },
    });
    Object.defineProperty(exports, "Reference", {
      enumerable: true,
      get: function get() {
        return _Reference.Reference;
      },
    });
    Object.defineProperty(exports, "usePopper", {
      enumerable: true,
      get: function get() {
        return _usePopper.usePopper;
      },
    });

    var _Popper = __webpack_require__(54903);

    var _Manager = __webpack_require__(69681);

    var _Reference = __webpack_require__(16301);

    var _usePopper = __webpack_require__(29555);

    /***/
  },

  /***/ 29555: /***/ (
    __unused_webpack_module,
    exports,
    __webpack_require__
  ) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    exports.usePopper = void 0;

    var React = _interopRequireWildcard(__webpack_require__(67294));

    var _core = __webpack_require__(516);

    var _reactFastCompare = _interopRequireDefault(__webpack_require__(69590));

    var _utils = __webpack_require__(8526);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
      };
      return cache;
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (typeof obj !== "object" && typeof obj !== "function")
      ) {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }

    var EMPTY_MODIFIERS = [];

    var usePopper = function usePopper(
      referenceElement,
      popperElement,
      options
    ) {
      if (options === void 0) {
        options = {};
      }

      var prevOptions = React.useRef(null);
      var optionsWithDefaults = {
        onFirstUpdate: options.onFirstUpdate,
        placement: options.placement || "bottom",
        strategy: options.strategy || "absolute",
        modifiers: options.modifiers || EMPTY_MODIFIERS,
      };

      var _React$useState = React.useState({
          styles: {
            popper: {
              position: optionsWithDefaults.strategy,
              left: "0",
              top: "0",
            },
            arrow: {
              position: "absolute",
            },
          },
          attributes: {},
        }),
        state = _React$useState[0],
        setState = _React$useState[1];

      var updateStateModifier = React.useMemo(function () {
        return {
          name: "updateState",
          enabled: true,
          phase: "write",
          fn: function fn(_ref) {
            var state = _ref.state;
            var elements = Object.keys(state.elements);
            setState({
              styles: (0, _utils.fromEntries)(
                elements.map(function (element) {
                  return [element, state.styles[element] || {}];
                })
              ),
              attributes: (0, _utils.fromEntries)(
                elements.map(function (element) {
                  return [element, state.attributes[element]];
                })
              ),
            });
          },
          requires: ["computeStyles"],
        };
      }, []);
      var popperOptions = React.useMemo(
        function () {
          var newOptions = {
            onFirstUpdate: optionsWithDefaults.onFirstUpdate,
            placement: optionsWithDefaults.placement,
            strategy: optionsWithDefaults.strategy,
            modifiers: [].concat(optionsWithDefaults.modifiers, [
              updateStateModifier,
              {
                name: "applyStyles",
                enabled: false,
              },
            ]),
          };

          if (
            (0, _reactFastCompare["default"])(prevOptions.current, newOptions)
          ) {
            return prevOptions.current || newOptions;
          } else {
            prevOptions.current = newOptions;
            return newOptions;
          }
        },
        [
          optionsWithDefaults.onFirstUpdate,
          optionsWithDefaults.placement,
          optionsWithDefaults.strategy,
          optionsWithDefaults.modifiers,
          updateStateModifier,
        ]
      );
      var popperInstanceRef = React.useRef();
      (0, _utils.useIsomorphicLayoutEffect)(
        function () {
          if (popperInstanceRef.current) {
            popperInstanceRef.current.setOptions(popperOptions);
          }
        },
        [popperOptions]
      );
      (0, _utils.useIsomorphicLayoutEffect)(
        function () {
          if (referenceElement == null || popperElement == null) {
            return;
          }

          var createPopper = options.createPopper || _core.createPopper;
          var popperInstance = createPopper(
            referenceElement,
            popperElement,
            popperOptions
          );
          popperInstanceRef.current = popperInstance;
          return function () {
            popperInstance.destroy();
            popperInstanceRef.current = null;
          };
        },
        [referenceElement, popperElement, options.createPopper]
      );
      return {
        state: popperInstanceRef.current
          ? popperInstanceRef.current.state
          : null,
        styles: state.styles,
        attributes: state.attributes,
        update: popperInstanceRef.current
          ? popperInstanceRef.current.update
          : null,
        forceUpdate: popperInstanceRef.current
          ? popperInstanceRef.current.forceUpdate
          : null,
      };
    };

    exports.usePopper = usePopper;

    /***/
  },

  /***/ 8526: /***/ (__unused_webpack_module, exports, __webpack_require__) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    exports.useIsomorphicLayoutEffect =
      exports.fromEntries =
      exports.setRef =
      exports.safeInvoke =
      exports.unwrapArray =
        void 0;

    var React = _interopRequireWildcard(__webpack_require__(67294));

    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
      };
      return cache;
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (typeof obj !== "object" && typeof obj !== "function")
      ) {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }

    /**
     * Takes an argument and if it's an array, returns the first item in the array,
     * otherwise returns the argument. Used for Preact compatibility.
     */
    var unwrapArray = function unwrapArray(arg) {
      return Array.isArray(arg) ? arg[0] : arg;
    };
    /**
     * Takes a maybe-undefined function and arbitrary args and invokes the function
     * only if it is defined.
     */

    exports.unwrapArray = unwrapArray;

    var safeInvoke = function safeInvoke(fn) {
      if (typeof fn === "function") {
        for (
          var _len = arguments.length,
            args = new Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        return fn.apply(void 0, args);
      }
    };
    /**
     * Sets a ref using either a ref callback or a ref object
     */

    exports.safeInvoke = safeInvoke;

    var setRef = function setRef(ref, node) {
      // if its a function call it
      if (typeof ref === "function") {
        return safeInvoke(ref, node);
      } // otherwise we should treat it as a ref object
      else if (ref != null) {
        ref.current = node;
      }
    };
    /**
     * Simple ponyfill for Object.fromEntries
     */

    exports.setRef = setRef;

    var fromEntries = function fromEntries(entries) {
      return entries.reduce(function (acc, _ref) {
        var key = _ref[0],
          value = _ref[1];
        acc[key] = value;
        return acc;
      }, {});
    };
    /**
     * Small wrapper around `useLayoutEffect` to get rid of the warning on SSR envs
     */

    exports.fromEntries = fromEntries;
    var useIsomorphicLayoutEffect =
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
        ? React.useLayoutEffect
        : React.useEffect;
    exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;

    /***/
  },

  /***/ 42473: /***/ (module) => {
    "use strict";
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    /**
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var __DEV__ = "production" !== "production";

    var warning = function () {};

    if (__DEV__) {
      var printWarning = function printWarning(format, args) {
        var len = arguments.length;
        args = new Array(len > 1 ? len - 1 : 0);
        for (var key = 1; key < len; key++) {
          args[key - 1] = arguments[key];
        }
        var argIndex = 0;
        var message =
          "Warning: " +
          format.replace(/%s/g, function () {
            return args[argIndex++];
          });
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      warning = function (condition, format, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format === undefined) {
          throw new Error(
            "`warning(condition, format, ...args)` requires a warning " +
              "message argument"
          );
        }
        if (!condition) {
          printWarning.apply(null, [format].concat(args));
        }
      };
    }

    module.exports = warning;

    /***/
  },
};
