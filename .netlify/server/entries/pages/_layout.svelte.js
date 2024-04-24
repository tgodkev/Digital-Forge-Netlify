import { l as setContext, g as getContext, c as create_ssr_component, s as subscribe, f as compute_rest_props, h as spread, k as escape_object, a as add_attribute, v as validate_component, j as escape_attribute_value, y as add_classes, b as each, e as escape } from "../../chunks/ssr.js";
import { w as writable, a as readonly, d as derived } from "../../chunks/index2.js";
import "dequal";
import { n as noop, b as isHTMLElement, h as isFunction, j as isElement, e as executeCallbacks, l as addEventListener, o as omit, w as withGet, m as makeElement, a as addMeltEventListener, k as kbd, s as styleToString, u as useEscapeKeydown, p as effect, q as portalAttr, f as createElHelpers, r as isBrowser, i as is_void, c as cn } from "../../chunks/gsapConfig.js";
import { a as tick, t as toWritableStores, g as generateIds, o as overridable, c as createBitAttrs, r as removeUndefined, d as getOptionUpdater, e as createDispatcher, f as fade, I as Icon, h as fly } from "../../chunks/Icon.js";
import { tv } from "tailwind-variants";
import "clsx";
import { n as navItems, d as siteAuthor, s as siteTitle, c as siteURL } from "../../chunks/config.js";
import "../../chunks/client.js";
const currentPage = writable("");
const isMenuOpen = writable(false);
function last(array) {
  return array[array.length - 1];
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^mac/) && !isTouchDevice();
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();
const LOCK_CLASSNAME = "data-melt-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = _document ?? document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  const setStyle = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn?.());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0)
    return portalProp;
  const portalParent = getPortalParent(node);
  if (portalParent === "body")
    return document.body;
  return null;
}
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep(1), tick]);
  if (prop === void 0) {
    defaultEl?.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement(el))
      return;
    el.focus();
  } else if (isHTMLElement(returned)) {
    returned.focus();
  }
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name2) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name2 + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};
/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
var activeFocusTraps = {
  activateTrap: function activateTrap(trapStack, trap) {
    if (trapStack.length > 0) {
      var activeTrap = trapStack[trapStack.length - 1];
      if (activeTrap !== trap) {
        activeTrap.pause();
      }
    }
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex === -1) {
      trapStack.push(trap);
    } else {
      trapStack.splice(trapIndex, 1);
      trapStack.push(trap);
    }
  },
  deactivateTrap: function deactivateTrap(trapStack, trap) {
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1);
    }
    if (trapStack.length > 0) {
      trapStack[trapStack.length - 1].unpause();
    }
  }
};
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === "Escape" || (e === null || e === void 0 ? void 0 : e.key) === "Esc" || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
};
var isTabEvent = function isTabEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === "Tab" || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
};
var isKeyForward = function isKeyForward2(e) {
  return isTabEvent(e) && !e.shiftKey;
};
var isKeyBackward = function isKeyBackward2(e) {
  return isTabEvent(e) && e.shiftKey;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var findIndex = function findIndex2(arr, fn) {
  var idx = -1;
  arr.every(function(value, i) {
    if (fn(value)) {
      idx = i;
      return false;
    }
    return true;
  });
  return idx;
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var internalTrapStack = [];
var createFocusTrap$1 = function createFocusTrap(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true,
    isKeyForward,
    isKeyBackward
  }, userOptions);
  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  var findContainerIndex = function findContainerIndex2(element, event) {
    var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === "function" ? event.composedPath() : void 0;
    return state.containerGroups.findIndex(function(_ref) {
      var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function(node) {
        return node === element;
      });
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var optionValue = config[optionName];
    if (typeof optionValue === "function") {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      optionValue = optionValue.apply(void 0, params);
    }
    if (optionValue === true) {
      optionValue = void 0;
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue;
      }
      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue;
    if (typeof optionValue === "string") {
      node = doc.querySelector(optionValue);
      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node = getNodeForOption("initialFocus");
    if (node === false) {
      return false;
    }
    if (node === void 0 || !isFocusable(node, config.tabbableOptions)) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
        node = firstTabbableNode || getNodeForOption("fallbackFocus");
      }
    }
    if (!node) {
      throw new Error("Your focus-trap needs to have at least one focusable element");
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map(function(container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions);
      var focusableNodes = focusable(container, config.tabbableOptions);
      var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
      var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
      var firstDomTabbableNode = focusableNodes.find(function(node) {
        return isTabbable(node);
      });
      var lastDomTabbableNode = focusableNodes.slice().reverse().find(function(node) {
        return isTabbable(node);
      });
      var posTabIndexesFound = !!tabbableNodes.find(function(node) {
        return getTabIndex(node) > 0;
      });
      return {
        container,
        tabbableNodes,
        focusableNodes,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var nodeIdx = tabbableNodes.indexOf(node);
          if (nodeIdx < 0) {
            if (forward) {
              return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function(el) {
                return isTabbable(el);
              });
            }
            return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function(el) {
              return isTabbable(el);
            });
          }
          return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function(group) {
      return group.tabbableNodes.length > 0;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    }
    if (state.containerGroups.find(function(g) {
      return g.posTabIndexesFound;
    }) && state.containerGroups.length > 1) {
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
    }
  };
  var getActiveElement = function getActiveElement2(el) {
    var activeElement = el.activeElement;
    if (!activeElement) {
      return;
    }
    if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
      return getActiveElement2(activeElement.shadowRoot);
    }
    return activeElement;
  };
  var tryFocus = function tryFocus2(node) {
    if (node === false) {
      return;
    }
    if (node === getActiveElement(document)) {
      return;
    }
    if (!node || !node.focus) {
      tryFocus2(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption("setReturnFocus", previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  };
  var findNextNavNode = function findNextNavNode2(_ref2) {
    var target = _ref2.target, event = _ref2.event, _ref2$isBackward = _ref2.isBackward, isBackward = _ref2$isBackward === void 0 ? false : _ref2$isBackward;
    target = target || getActualTarget(event);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findContainerIndex(target, event);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
      if (containerIndex < 0) {
        if (isBackward) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (isBackward) {
        var startOfGroupIndex = findIndex(state.tabbableGroups, function(_ref3) {
          var firstTabbableNode = _ref3.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target, false);
        }
      } else {
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function(_ref4) {
          var lastTabbableNode = _ref4.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target);
        }
      }
    } else {
      destinationNode = getNodeForOption("fallbackFocus");
    }
    return destinationNode;
  };
  var checkPointerDown = function checkPointerDown2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      trap.deactivate({
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked (and if not focusable, to "nothing"); by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node), whether the
        //  outside click was on a focusable node or not
        returnFocus: config.returnFocusOnDeactivate
      });
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(event) {
    var target = getActualTarget(event);
    var targetContained = findContainerIndex(target, event) >= 0;
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      event.stopImmediatePropagation();
      var nextNode;
      var navAcrossContainers = true;
      if (state.mostRecentlyFocusedNode) {
        if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
          var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
          var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
          if (tabbableNodes.length > 0) {
            var mruTabIdx = tabbableNodes.findIndex(function(node) {
              return node === state.mostRecentlyFocusedNode;
            });
            if (mruTabIdx >= 0) {
              if (config.isKeyForward(state.recentNavEvent)) {
                if (mruTabIdx + 1 < tabbableNodes.length) {
                  nextNode = tabbableNodes[mruTabIdx + 1];
                  navAcrossContainers = false;
                }
              } else {
                if (mruTabIdx - 1 >= 0) {
                  nextNode = tabbableNodes[mruTabIdx - 1];
                  navAcrossContainers = false;
                }
              }
            }
          }
        } else {
          if (!state.containerGroups.some(function(g) {
            return g.tabbableNodes.some(function(n) {
              return getTabIndex(n) > 0;
            });
          })) {
            navAcrossContainers = false;
          }
        }
      } else {
        navAcrossContainers = false;
      }
      if (navAcrossContainers) {
        nextNode = findNextNavNode({
          // move FROM the MRU node, not event-related node (which will be the node that is
          //  outside the trap causing the focus escape we're trying to fix)
          target: state.mostRecentlyFocusedNode,
          isBackward: config.isKeyBackward(state.recentNavEvent)
        });
      }
      if (nextNode) {
        tryFocus(nextNode);
      } else {
        tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
      }
    }
    state.recentNavEvent = void 0;
  };
  var checkKeyNav = function checkKeyNav2(event) {
    var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    state.recentNavEvent = event;
    var destinationNode = findNextNavNode({
      event,
      isBackward
    });
    if (destinationNode) {
      if (isTabEvent(event)) {
        event.preventDefault();
      }
      tryFocus(destinationNode);
    }
  };
  var checkKey = function checkKey2(event) {
    if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
      event.preventDefault();
      trap.deactivate();
      return;
    }
    if (config.isKeyForward(event) || config.isKeyBackward(event)) {
      checkKeyNav(event, config.isKeyBackward(event));
    }
  };
  var checkClick = function checkClick2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trapStack, trap);
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkKey, true);
    return trap;
  };
  var checkDomRemoval = function checkDomRemoval2(mutations) {
    var isFocusedNodeRemoved = mutations.some(function(mutation) {
      var removedNodes = Array.from(mutation.removedNodes);
      return removedNodes.some(function(node) {
        return node === state.mostRecentlyFocusedNode;
      });
    });
    if (isFocusedNodeRemoved) {
      tryFocus(getInitialFocusNode());
    }
  };
  var mutationObserver = typeof window !== "undefined" && "MutationObserver" in window ? new MutationObserver(checkDomRemoval) : void 0;
  var updateObservedNodes = function updateObservedNodes2() {
    if (!mutationObserver) {
      return;
    }
    mutationObserver.disconnect();
    if (state.active && !state.paused) {
      state.containers.map(function(container) {
        mutationObserver.observe(container, {
          subtree: true,
          childList: true
        });
      });
    }
  };
  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, "onActivate");
      var onPostActivate = getOption(activateOptions, "onPostActivate");
      var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      onActivate === null || onActivate === void 0 || onActivate();
      var finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        updateObservedNodes();
        onPostActivate === null || onPostActivate === void 0 || onPostActivate();
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      removeListeners();
      state.active = false;
      state.paused = false;
      updateObservedNodes();
      activeFocusTraps.deactivateTrap(trapStack, trap);
      var onDeactivate = getOption(options, "onDeactivate");
      var onPostDeactivate = getOption(options, "onPostDeactivate");
      var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
      var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
      onDeactivate === null || onDeactivate === void 0 || onDeactivate();
      var finishDeactivation = function finishDeactivation2() {
        delay(function() {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause(pauseOptions) {
      if (state.paused || !state.active) {
        return this;
      }
      var onPause = getOption(pauseOptions, "onPause");
      var onPostPause = getOption(pauseOptions, "onPostPause");
      state.paused = true;
      onPause === null || onPause === void 0 || onPause();
      removeListeners();
      updateObservedNodes();
      onPostPause === null || onPostPause === void 0 || onPostPause();
      return this;
    },
    unpause: function unpause(unpauseOptions) {
      if (!state.paused || !state.active) {
        return this;
      }
      var onUnpause = getOption(unpauseOptions, "onUnpause");
      var onPostUnpause = getOption(unpauseOptions, "onPostUnpause");
      state.paused = false;
      onUnpause === null || onUnpause === void 0 || onUnpause();
      updateTabbableNodes();
      addListeners();
      updateObservedNodes();
      onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function(element) {
        return typeof element === "string" ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      updateObservedNodes();
      return this;
    }
  };
  trap.updateContainerElements(elements);
  return trap;
};
function createFocusTrap2(config = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = config;
  const hasFocus = writable(false);
  const isPaused = writable(false);
  const activate = (opts) => trap?.activate(opts);
  const deactivate = (opts) => {
    trap?.deactivate(opts);
  };
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.set(true);
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.set(false);
    }
  };
  const useFocusTrap = (node) => {
    trap = createFocusTrap$1(node, {
      ...focusTrapOptions,
      onActivate() {
        hasFocus.set(true);
        config.onActivate?.();
      },
      onDeactivate() {
        hasFocus.set(false);
        config.onDeactivate?.();
      }
    });
    if (immediate) {
      activate();
    }
    return {
      destroy() {
        deactivate();
        trap = void 0;
      }
    };
  };
  return {
    useFocusTrap,
    hasFocus: readonly(hasFocus),
    isPaused: readonly(isPaused),
    activate,
    deactivate,
    pause,
    unpause
  };
}
const visibleModals = [];
const useModal = (node, config) => {
  let unsubInteractOutside = noop;
  function removeNodeFromVisibleModals() {
    const index = visibleModals.indexOf(node);
    if (index >= 0) {
      visibleModals.splice(index, 1);
    }
  }
  function update(config2) {
    unsubInteractOutside();
    const { open, onClose, shouldCloseOnInteractOutside, closeOnInteractOutside } = config2;
    sleep(100).then(() => {
      if (open) {
        visibleModals.push(node);
      } else {
        removeNodeFromVisibleModals();
      }
    });
    function isLastModal() {
      return last(visibleModals) === node;
    }
    function closeModal() {
      if (isLastModal() && onClose) {
        onClose();
        removeNodeFromVisibleModals();
      }
    }
    function onInteractOutsideStart(e) {
      const target = e.target;
      if (!isElement(target))
        return;
      if (target && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
    function onInteractOutside(e) {
      if (shouldCloseOnInteractOutside?.(e) && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        closeModal();
      }
    }
    unsubInteractOutside = useInteractOutside(node, {
      onInteractOutsideStart,
      onInteractOutside: closeOnInteractOutside ? onInteractOutside : void 0,
      enabled: open
    }).destroy;
  }
  update(config);
  return {
    update,
    destroy() {
      removeNodeFromVisibleModals();
      unsubInteractOutside();
    }
  };
};
const usePortal = (el, target = "body") => {
  let targetEl;
  if (!isHTMLElement(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update(newTarget) {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update(target);
  return {
    update,
    destroy
  };
};
const useInteractOutside = (node, config) => {
  let unsub = noop;
  let unsubClick = noop;
  let isPointerDown = false;
  let isPointerDownInside = false;
  let ignoreEmulatedMouseEvents = false;
  function update(config2) {
    unsub();
    unsubClick();
    const { onInteractOutside, onInteractOutsideStart, enabled } = config2;
    if (!enabled)
      return;
    function onPointerDown(e) {
      if (onInteractOutside && isValidEvent(e, node)) {
        onInteractOutsideStart?.(e);
      }
      const target = e.target;
      if (isElement(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }
    function triggerInteractOutside(e) {
      onInteractOutside?.(e);
    }
    const documentObj = getOwnerDocument(node);
    if (typeof PointerEvent !== "undefined") {
      const onPointerUp = (e) => {
        unsubClick();
        const handler = (e2) => {
          if (shouldTriggerInteractOutside(e2)) {
            triggerInteractOutside(e2);
          }
          resetPointerState();
        };
        if (e.pointerType === "touch") {
          unsubClick = addEventListener(documentObj, "click", handler, {
            capture: true,
            once: true
          });
          return;
        }
        handler(e);
      };
      unsub = executeCallbacks(addEventListener(documentObj, "pointerdown", onPointerDown, true), addEventListener(documentObj, "pointerup", onPointerUp, true));
    } else {
      const onMouseUp = (e) => {
        if (ignoreEmulatedMouseEvents) {
          ignoreEmulatedMouseEvents = false;
        } else if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      const onTouchEnd = (e) => {
        ignoreEmulatedMouseEvents = true;
        if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      unsub = executeCallbacks(addEventListener(documentObj, "mousedown", onPointerDown, true), addEventListener(documentObj, "mouseup", onMouseUp, true), addEventListener(documentObj, "touchstart", onPointerDown, true), addEventListener(documentObj, "touchend", onTouchEnd, true));
    }
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update(config);
  return {
    update,
    destroy() {
      unsub();
      unsubClick();
    }
  };
};
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
const { name } = createElHelpers("dialog");
const defaults = {
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  role: "dialog",
  defaultOpen: false,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const dialogIdParts = ["content", "title", "description"];
function createDialog(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "ids"));
  const { preventScroll, closeOnEscape, closeOnOutsideClick, role, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores({
    ...generateIds(dialogIdParts),
    ...withDefaults.ids
  });
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const isVisible = derived([open, forceVisible], ([$open, $forceVisible]) => {
    return $open || $forceVisible;
  });
  let unsubScroll = noop;
  function handleOpen(e) {
    const el = e.currentTarget;
    const triggerEl = e.currentTarget;
    if (!isHTMLElement(el) || !isHTMLElement(triggerEl))
      return;
    open.set(true);
    activeTrigger.set(triggerEl);
  }
  function handleClose() {
    open.set(false);
    handleFocus({
      prop: closeFocus.get(),
      defaultEl: activeTrigger.get()
    });
  }
  const trigger = makeElement(name("trigger"), {
    stores: [open],
    returned: ([$open]) => {
      return {
        "aria-haspopup": "dialog",
        "aria-expanded": $open,
        type: "button"
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        handleOpen(e);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        handleOpen(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const overlay = makeElement(name("overlay"), {
    stores: [isVisible, open],
    returned: ([$isVisible, $open]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": true,
        "data-state": $open ? "open" : "closed"
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            handleClose();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
      return {
        destroy() {
          unsubEscapeKeydown();
        }
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: [isVisible, ids.content, ids.description, ids.title, open],
    returned: ([$isVisible, $contentId, $descriptionId, $titleId, $open]) => {
      return {
        id: $contentId,
        role: role.get(),
        "aria-describedby": $descriptionId,
        "aria-labelledby": $titleId,
        "aria-modal": $isVisible ? "true" : void 0,
        "data-state": $open ? "open" : "closed",
        tabindex: -1,
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        })
      };
    },
    action: (node) => {
      let activate = noop;
      let deactivate = noop;
      const destroy = executeCallbacks(effect([open, closeOnOutsideClick, closeOnEscape], ([$open, $closeOnOutsideClick, $closeOnEscape]) => {
        if (!$open)
          return;
        const focusTrap = createFocusTrap2({
          immediate: false,
          escapeDeactivates: $closeOnEscape,
          clickOutsideDeactivates: $closeOnOutsideClick,
          allowOutsideClick: true,
          returnFocusOnDeactivate: false,
          fallbackFocus: node
        });
        activate = focusTrap.activate;
        deactivate = focusTrap.deactivate;
        const ac = focusTrap.useFocusTrap(node);
        if (ac && ac.destroy) {
          return ac.destroy;
        } else {
          return focusTrap.deactivate;
        }
      }), effect([closeOnOutsideClick, open], ([$closeOnOutsideClick, $open]) => {
        return useModal(node, {
          open: $open,
          closeOnInteractOutside: $closeOnOutsideClick,
          onClose() {
            handleClose();
          },
          shouldCloseOnInteractOutside(e) {
            onOutsideClick.get()?.(e);
            if (e.defaultPrevented)
              return false;
            return true;
          }
        }).destroy;
      }), effect([closeOnEscape], ([$closeOnEscape]) => {
        if (!$closeOnEscape)
          return noop;
        return useEscapeKeydown(node, { handler: handleClose }).destroy;
      }), effect([isVisible], ([$isVisible]) => {
        tick().then(() => {
          if (!$isVisible) {
            deactivate();
          } else {
            activate();
          }
        });
      }));
      return {
        destroy: () => {
          unsubScroll();
          destroy();
        }
      };
    }
  });
  const portalled = makeElement(name("portalled"), {
    stores: portal,
    returned: ($portal) => ({
      "data-portal": portalAttr($portal)
    }),
    action: (node) => {
      const unsubPortal = effect([portal], ([$portal]) => {
        if ($portal === null)
          return noop;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return noop;
        return usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubPortal();
        }
      };
    }
  });
  const title = makeElement(name("title"), {
    stores: [ids.title],
    returned: ([$titleId]) => ({
      id: $titleId
    })
  });
  const description = makeElement(name("description"), {
    stores: [ids.description],
    returned: ([$descriptionId]) => ({
      id: $descriptionId
    })
  });
  const close = makeElement(name("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.SPACE && e.key !== kbd.ENTER)
          return;
        e.preventDefault();
        handleClose();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([open, preventScroll], ([$open, $preventScroll]) => {
    if (!isBrowser)
      return;
    if ($preventScroll && $open)
      unsubScroll = removeScroll();
    if ($open) {
      const contentEl = document.getElementById(ids.content.get());
      handleFocus({ prop: openFocus.get(), defaultEl: contentEl });
    }
    return () => {
      if (!forceVisible.get()) {
        unsubScroll();
      }
    };
  });
  return {
    ids,
    elements: {
      content,
      trigger,
      title,
      description,
      overlay,
      close,
      portalled
    },
    states: {
      open
    },
    options
  };
}
function getDialogData() {
  const NAME = "dialog";
  const PARTS = [
    "close",
    "content",
    "description",
    "overlay",
    "portal",
    "title",
    "trigger"
  ];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getDialogData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const dialog = {
    ...createDialog({ ...removeUndefined(props), role: "dialog", forceVisible: true }),
    getAttrs
  };
  setContext(NAME, dialog);
  return {
    ...dialog,
    updateOption: getOptionUpdater(dialog.options)
  };
}
function getCtx() {
  const { NAME } = getDialogData();
  return getContext(NAME);
}
const Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { preventScroll = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { openFocus = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx({
    closeOnEscape,
    preventScroll,
    closeOnOutsideClick,
    portal,
    forceVisible: true,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.content, ids.description, ids.title], ([$contentId, $descriptionId, $titleId]) => ({
    content: $contentId,
    description: $descriptionId,
    title: $titleId
  }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0)
    $$bindings.preventScroll(preventScroll);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0)
    $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0)
    $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0)
    $$bindings.onOpenChange(onOpenChange);
  if ($$props.openFocus === void 0 && $$bindings.openFocus && openFocus !== void 0)
    $$bindings.openFocus(openFocus);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0)
    $$bindings.closeFocus(closeFocus);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0)
    $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("openFocus", openFocus);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Dialog_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["level", "asChild", "id", "el"]);
  let $title, $$unsubscribe_title;
  let { level = "h2" } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { title }, ids, getAttrs } = getCtx();
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  const attrs = getAttrs("title");
  if ($$props.level === void 0 && $$bindings.level && level !== void 0)
    $$bindings.level(level);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.title.set(id);
    }
  }
  builder = $title;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_title();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `${((tag) => {
    return tag ? `<${level}${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({ builder }) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(level)}`}`;
});
const Dialog_close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $close, $$unsubscribe_close;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { close }, getAttrs } = getCtx();
  $$unsubscribe_close = subscribe(close, (value) => $close = value);
  createDispatcher();
  const attrs = getAttrs("close");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $close;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_close();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Dialog_portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $portalled, $$unsubscribe_portalled;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { portalled }, getAttrs } = getCtx();
  $$unsubscribe_portalled = subscribe(portalled, (value) => $portalled = value);
  const attrs = getAttrs("portal");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $portalled;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_portalled();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Dialog_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "el"
  ]);
  let $content, $$unsubscribe_content;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids, getAttrs } = getCtx();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.content.set(id);
    }
  }
  builder = $content;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_content();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Dialog_overlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "el"
  ]);
  let $overlay, $$unsubscribe_overlay;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { overlay }, states: { open }, getAttrs } = getCtx();
  $$unsubscribe_overlay = subscribe(overlay, (value) => $overlay = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs("overlay");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $overlay;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_overlay();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${inTransition && outTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${inTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${outTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${$open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : ``}`}`}`}`}`}`;
});
const Dialog_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, getAttrs } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $trigger;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Dialog_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $description, $$unsubscribe_description;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { description }, ids, getAttrs } = getCtx();
  $$unsubscribe_description = subscribe(description, (value) => $description = value);
  const attrs = getAttrs("description");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.description.set(id);
    }
  }
  builder = $description;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_description();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Sheet_portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Dialog_portal, "SheetPrimitive.Portal").$$render($$result, Object.assign({}, { class: cn(className) }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Sheet_overlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = fade } = $$props;
  let { transitionConfig = { duration: 150 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Dialog_overlay, "SheetPrimitive.Overlay").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      {
        class: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const X$1 = X;
const Sheet_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "class",
    "side",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig"
  ]);
  let { class: className = void 0 } = $$props;
  let { side = "right" } = $$props;
  let { inTransition = fly } = $$props;
  let { inTransitionConfig = sheetTransitions[side ?? "right"].in } = $$props;
  let { outTransition = fly } = $$props;
  let { outTransitionConfig = sheetTransitions[side ?? "right"].out } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0)
    $$bindings.side(side);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  return `${validate_component(Sheet_portal, "SheetPortal").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Sheet_overlay, "SheetOverlay").$$render($$result, {}, {}, {})} ${validate_component(Dialog_content, "SheetPrimitive.Content").$$render(
        $$result,
        Object.assign(
          {},
          { inTransition },
          { inTransitionConfig },
          { outTransition },
          { outTransitionConfig },
          {
            class: cn(sheetVariants({ side }), className)
          },
          $$restProps
        ),
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``} ${validate_component(Dialog_close, "SheetPrimitive.Close").$$render(
              $$result,
              {
                class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
              },
              {},
              {
                default: () => {
                  return `${validate_component(X$1, "X").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1pewzs3">Close</span>`;
                }
              }
            )}`;
          }
        }
      )}`;
    }
  })}`;
});
const Sheet_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-2 text-center sm:text-left", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Sheet_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Dialog_title, "SheetPrimitive.Title").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-lg font-semibold text-foreground", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Sheet_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Dialog_description, "SheetPrimitive.Description").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-sm text-muted-foreground", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Root = Dialog;
const Trigger = Dialog_trigger;
const sheetVariants = tv({
  base: "fixed z-50 gap-4 bg-background p-6 shadow-lg",
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b",
      bottom: "inset-x-0 bottom-0 border-t",
      left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right: "inset-y-0 right-0 h-full w-3/4  border-l sm:max-w-sm"
    }
  },
  defaultVariants: {
    side: "right"
  }
});
const sheetTransitions = {
  top: {
    in: {
      y: "-100%",
      duration: 500,
      opacity: 1
    },
    out: {
      y: "-100%",
      duration: 300,
      opacity: 1
    }
  },
  bottom: {
    in: {
      y: "100%",
      duration: 500,
      opacity: 1
    },
    out: {
      y: "100%",
      duration: 300,
      opacity: 1
    }
  },
  left: {
    in: {
      x: "-100%",
      duration: 500,
      opacity: 1
    },
    out: {
      x: "-100%",
      duration: 300,
      opacity: 1
    }
  },
  right: {
    in: {
      x: "100%",
      duration: 500,
      opacity: 1
    },
    out: {
      x: "100%",
      duration: 300,
      opacity: 1
    }
  }
};
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "menu" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Menu$1 = Menu;
const NavItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isCurrentPage;
  let $currentPage, $$unsubscribe_currentPage;
  $$unsubscribe_currentPage = subscribe(currentPage, (value) => $currentPage = value);
  let { href } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  isCurrentPage = $currentPage.startsWith(href);
  $$unsubscribe_currentPage();
  return `<div><li class="text-2xl"><a${add_attribute("href", href, 0)}${add_attribute("aria-current", isCurrentPage ? "page" : false, 0)}${add_classes((isCurrentPage ? "active" : "").trim())}>${slots.default ? slots.default({}) : ``}</a></li></div>`;
});
const NavItems = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<ul class="flex flex-col w-fit mx-auto items-start lg:flex-row lg:space-x-5 lg:items-center lg:justify-center">${each(navItems, (page) => {
    return `<div class="nav-item">${validate_component(NavItem, "NavItem").$$render($$result, { href: page.route }, {}, {
      default: () => {
        return `${escape(page.title)} `;
      }
    })} </div>`;
  })}</ul>`;
});
const HamburgerMenuButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_isMenuOpen;
  $$unsubscribe_isMenuOpen = subscribe(isMenuOpen, (value) => value);
  let { closeOnly = false } = $$props;
  let { open = false } = $$props;
  if ($$props.closeOnly === void 0 && $$bindings.closeOnly && closeOnly !== void 0)
    $$bindings.closeOnly(closeOnly);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  $$unsubscribe_isMenuOpen();
  return `<span class="sr-only" data-svelte-h="svelte-1yaclsl">Toggle hamburger menu</span> ${validate_component(Root, "Sheet.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "Sheet.Trigger").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Menu$1, "Menu").$$render($$result, {}, {}, {})}`;
        }
      })} ${validate_component(Sheet_content, "Sheet.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Sheet_header, "Sheet.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Sheet_title, "Sheet.Title").$$render($$result, {}, {}, {
                default: () => {
                  return `Are you sure absolutely sure?`;
                }
              })} ${validate_component(Sheet_description, "Sheet.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(NavItems, "NavItems").$$render($$result, {}, {}, {})}`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
const MainNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isMenuOpen, $$unsubscribe_isMenuOpen;
  $$unsubscribe_isMenuOpen = subscribe(isMenuOpen, (value) => $isMenuOpen = value);
  $$unsubscribe_isMenuOpen();
  return ` <nav class="${["", $isMenuOpen ? "open" : ""].join(" ").trim()}"><div class="hidden lg:flex">${validate_component(NavItems, "NavItems").$$render($$result, {}, {}, {})}</div> <div class="lg:hidden">${validate_component(HamburgerMenuButton, "HamburgerMenuButton").$$render($$result, {}, {}, {})}</div></nav>`;
});
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div data-svelte-h="svelte-162eczb"><svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_112_252)" filter="url(#filter0_d_112_252)"><path d="M438.148 560.945C442.715 561.706 443.979 558.649 444.894 555.581C448.12 544.767 448.745 533.813 446.202 522.345C446.277 521.767 446.342 521.595 446.225 521.216C445.904 520.624 445.766 520.238 445.602 519.545C448.767 515.436 452.738 514.47 456.891 516.902C462.625 520.26 468.403 523.14 475.122 524.299C479.633 525.077 484.117 527.395 487.416 530.471C491.475 534.255 496.039 534.933 501.379 535.221C503.885 534.969 505.489 536.128 507.026 537.322C509.352 539.131 511.923 539.748 515.184 539.269C525.148 538.569 534.732 538.41 544.337 538.388C550.407 538.373 556.452 538.704 562.642 537.815C567.017 537.186 572.519 538.17 577.362 540.839C578.166 544.817 578.508 548.588 579.151 552.307C579.908 556.693 581.617 560.514 586.743 562C588.612 561.714 589.211 562.871 589.73 563.843C593.864 571.587 599.884 577.764 606.105 583.789C607.526 585.165 609.065 586.498 609.587 588.904C608.127 590.396 606.407 590.083 604.769 590.09C600.77 590.109 596.745 589.747 592.778 590.093C578.529 591.336 566.325 587.6 553.387 580.571C522.565 563.827 491.517 566.931 462.347 586.418C458.548 588.956 454.901 590.202 450.353 590.082C438.867 589.778 427.37 589.859 415.42 589.669C414.773 588.411 415.475 587.646 416.296 586.629C416.624 586.272 416.759 586.135 417.098 585.805C417.439 585.488 417.575 585.365 418.108 584.883C418.631 584.407 418.759 584.289 419.254 583.821C419.623 583.47 419.982 583.123 420.334 582.779C420.686 582.434 421.034 582.092 421.379 581.75C421.725 581.408 422.069 581.064 422.416 580.716C422.763 580.368 423.114 580.012 423.47 579.645C423.949 579.152 424.071 579.025 424.577 578.508C425.099 577.989 425.236 577.859 425.594 577.535C425.97 577.208 426.126 577.076 426.531 576.75C428.115 575.324 429.055 573.769 430.382 572.118C430.673 571.675 430.785 571.499 431.067 571.066C431.454 570.472 431.669 570.133 432.023 569.532C432.268 569.104 432.37 568.935 432.639 568.524C432.924 568.125 433.041 567.968 433.507 567.342C434.184 566.39 434.528 565.917 434.821 565.074C435.007 564.608 435.087 564.422 435.308 563.966C435.876 562.994 436.38 562.349 437.1 561.478C437.488 561.138 437.663 561.024 438.148 560.945Z" fill="#2A50A0"></path><path d="M681.265 735.835C675.457 734.953 669.933 733.832 664.475 732.451C662.025 731.831 661.124 732.383 661.132 734.95C661.161 744.446 660.898 753.946 661.124 763.435C661.206 766.858 663.545 769.581 666.105 771.794C668.452 773.822 670.984 775.635 674.376 778.277C657.224 775.71 641.123 773.302 623.775 770.706C632.783 767.795 635.132 762.226 634.577 754.149C633.882 744.028 634.137 733.828 634.309 723.668C634.396 718.533 634.017 713.943 628.222 711.625C630.125 709.225 633.461 708.728 633.888 705.857C634.253 703.405 634.115 700.875 634.156 698.379C634.246 692.882 634.179 687.38 634.407 681.889C634.975 668.209 644.715 657.757 658.287 657.179C670.928 656.641 683.648 656.378 696.261 657.151C716.821 658.411 728.291 675.287 726.993 689.903C726.494 695.524 727.152 701.241 726.82 706.888C726.509 712.193 727.24 716.773 733.304 719.774C727.048 722.145 726.919 726.658 726.977 731.565C727.132 744.727 726.989 757.893 726.893 771.519C725.732 773.028 724.502 773.018 722.836 772.146C721.422 770.221 721.318 768.392 721.321 766.574C721.345 753.525 721.049 740.473 721.53 726.982C721.801 724.909 722.649 723.347 722.023 721.231C721.67 719.453 721.612 718.068 721.763 716.258C721.863 715.566 721.918 715.293 722.098 714.621C722.725 712.994 723.05 711.713 723.205 710.401C723.74 705.872 722.841 704.898 718.264 704.587C711.889 704.154 705.411 705.609 698.806 703.262C696.378 698.361 697.676 693.472 697.348 688.718C697.211 686.733 697.322 684.736 697.187 682.743C697.009 680.127 695.656 678.824 693.062 678.775C684.593 678.612 676.124 678.611 667.655 678.778C664.154 678.847 663.843 681.2 663.692 683.874C663.346 689.989 664.429 696.163 662.712 702.607C660.452 704.898 657.871 704.538 655.42 704.601C651.276 704.707 647.128 704.612 642.982 704.666C640.149 704.702 638.627 705.92 638.613 709.255C640.641 726.254 639.211 742.905 639.467 759.525C639.479 760.355 639.301 761.181 639.086 761.988C637.516 767.886 637.509 767.96 643.465 768.382C648.27 768.722 652.976 769.947 658.331 770.044C653.298 757.832 655.969 745.302 655.514 732.987C655.268 726.332 657.331 724.818 663.717 726.365C669.515 727.77 675.443 728.799 681.224 731.648C682.122 733.141 682.121 734.311 681.265 735.835Z" fill="#F8F9FB"></path><path d="M214.608 703.73C214.082 695.455 213.522 686.931 214.043 678.474C214.552 670.217 210.901 664.848 204.408 660.698C202.949 659.766 201.534 658.763 199.084 657.107C201.877 656.97 203.455 656.826 205.033 656.826C229.693 656.841 254.354 656.832 279.014 656.917C300.293 656.99 314.99 671.74 315.079 693.085C315.143 708.414 315.086 723.743 314.996 739.533C311.802 741.585 311.107 739.482 310.704 737.159C310.337 735.042 310.842 732.826 309.923 730.3C309.089 725.289 309.302 720.699 309.526 715.67C311.032 703.61 311.031 703.671 299.501 703.576C295.225 703.54 290.893 704.189 286.311 702.653C284.441 700.823 284.572 698.77 284.403 696.799C283.562 687.008 278.117 681.837 268.21 681.618C259.74 681.432 251.266 681.706 242.379 681.495C235.006 682.034 227.927 680.854 220.084 682.47C222.651 684.872 224.845 684.229 226.833 684.395C231.893 684.817 237.094 683.405 242.331 685.894C244.325 691.29 244.148 696.377 242.528 701.885C240.742 703.506 238.925 703.728 237.121 703.679C229.764 703.478 222.398 704.405 214.608 703.73Z" fill="#FCFDFD"></path><path d="M502.786 141.428C503.141 140.877 503.303 140.53 503.737 140.068C504.254 139.733 504.493 139.506 504.823 139.045C504.923 138.82 504.938 138.935 504.88 138.931C505.176 138.768 505.482 138.546 505.768 137.964C505.801 137.678 505.829 137.861 505.737 137.847C506.4 137.694 506.482 137.063 506.812 136.234C506.992 135.985 507.001 135.999 506.994 135.997C507.239 135.766 507.483 135.526 507.815 135.041C507.914 134.805 507.929 134.935 507.863 134.93C508.395 134.641 508.495 134.066 508.815 133.29C509.003 133.071 508.983 133.01 509.014 133.002C512.899 130.438 514.256 130.595 515.908 134.428C517.421 137.939 519.474 141.209 520.46 144.966C521.39 148.509 523.903 151.01 526.642 153.233C528.555 154.786 529.453 156.484 528.194 159.252C528.134 159.646 528.249 159.935 528.128 160.032C526.851 161.025 526.974 162.516 526.361 163.994C526.362 164.325 526.463 164.335 526.469 164.385C521.838 167.604 520.596 172.628 519.611 177.621C517.564 188.003 518.049 198.105 523.895 207.4C524.426 208.244 524.694 209.222 524.421 210.626C520.246 212.642 516.881 210.551 513.643 208.78C511.431 207.57 509.287 206.485 506.428 206.059C504.145 205.102 503.687 203.357 503.312 201.297C503.505 207.16 505.526 212.407 506.674 217.834C507.069 219.699 508.215 221.592 506.424 223.714C504.837 224.455 503.511 224.537 502.18 224.595C494.324 224.939 492.483 223.189 492.371 215.239C492.331 212.414 492.247 209.571 492.709 206.781C493.283 203.315 491.412 202.233 488.489 202.278C484.835 202.334 481.202 202.773 477.572 203.221C469.114 204.266 468.498 203.692 468.511 195.157C468.513 193.995 468.489 192.831 468.714 191.258C469.93 181.84 474.063 174.153 479.333 167.026C485.478 158.716 492.967 151.6 500.4 144.047C501.09 143.784 501.427 143.565 501.786 142.974C501.855 142.676 501.855 142.881 501.755 142.858C502.331 142.718 502.482 142.191 502.786 141.428Z" fill="#FBC965"></path><path d="M562.017 735.171C560.627 728.943 561.184 722.447 561.18 715.975C561.178 712.353 560.724 709.319 556.415 707.668C560.88 705.293 561.317 701.658 561.157 697.523C560.92 691.369 561.016 685.197 561.16 679.037C561.215 676.664 560.495 675.847 558.067 675.926C553.242 676.085 548.407 675.987 543.577 675.911C539.221 675.842 536.979 679.089 533.667 682.893C535.384 674.284 534.958 666.866 534.918 659.468C534.906 657.238 535.678 656.69 537.789 656.699C562.109 656.794 586.429 656.83 610.749 656.821C614.858 656.819 616.243 659.116 616.52 662.763C617.023 669.384 616.254 676.095 617.906 683.086C610.14 671.634 598.584 677.235 588.588 675.979C586.063 675.662 586.087 677.363 586.096 679.149C586.135 686.478 587.272 694.069 585.69 701.038C584.745 705.204 592.707 705.933 587.673 710.281C584.206 713.275 586.586 717.859 586.133 721.7C585.745 724.988 586.52 728.353 585.049 731.787C583.166 731.082 582.87 729.743 582.611 727.891C581.856 719.799 583.073 712.12 581.641 704.183C581.147 703.341 581.091 702.549 579.867 702.716C579.06 702.852 578.587 702.872 577.746 702.816C574.214 702.366 571.045 701.85 567.64 703.344C563.941 707.831 566.247 712.839 565.577 717.891C565.92 721.778 565.855 725.223 565.688 728.666C565.564 731.233 564.833 733.52 562.017 735.171Z" fill="#FCFDFD"></path><path d="M395.612 459.231C395.24 451.933 395.176 444.904 395.167 437.406C402.126 434.783 407.247 436.823 411.922 443.554C413.032 445.152 413.871 448.156 416.451 444.335C416.801 443.926 416.944 443.769 417.513 443.167C418.208 442.428 418.464 442.123 418.867 441.559C419.126 441.136 419.227 440.964 419.479 440.529C419.838 439.906 420.061 439.556 420.5 438.952C420.873 438.539 421.042 438.386 421.498 438.033C422.889 437.267 423.783 436.342 425.39 435.829C434.51 435.031 443.235 435.211 452.413 435.672C464.461 437.248 476.071 436.591 487.693 436.105C494.665 435.813 501.673 435.669 508.672 437.913C509.173 440.169 508.197 441.458 506.945 442.628C496.206 452.675 484.28 461.353 473.64 471.515C472.665 472.446 471.406 472.913 469.628 472.921C463.909 469.879 457.701 468.848 452.529 465.497C450.193 463.983 447.595 463.656 444.903 463.498C439.215 463.163 433.73 461.892 428.42 459.803C424.157 458.128 419.874 457.692 415.251 458.722C408.911 460.135 402.387 459.719 395.612 459.231Z" fill="#4076AF"></path><path d="M382.711 703.303C382.184 696.657 381.696 690.349 382.823 684.06C385.556 668.815 398.197 657.35 413.602 656.985C430.084 656.595 446.581 656.855 463.07 656.705C465.847 656.68 467.017 657.577 466.987 660.394C466.91 667.519 466.999 674.644 468.13 681.969C464.511 676.684 459.492 675.729 453.707 675.893C444.388 676.157 435.054 675.914 425.726 675.924C415.203 675.934 410 680.277 408.564 690.628C408.041 694.397 408.225 698.265 408.005 702.542C407.24 703.64 406.46 704.099 405.077 704.344C398.907 704.875 393.182 704.588 387.008 704.523C385.332 704.393 384.104 704.335 382.711 703.303Z" fill="#FCFDFD"></path><path d="M395.48 413.294C394.837 411.759 394.845 410.372 396.512 410.615C405.761 411.967 410.632 405.078 416.904 400.087C420.308 398.898 422.95 400.79 425.802 401.194C434.616 402.443 442.709 406.571 451.966 407.615C452.878 407.665 453.395 407.727 454.288 407.897C455.414 408.16 456.132 408.454 457.285 408.607C458.189 408.752 458.703 408.86 459.599 409.097C464.878 409.903 469.798 409.445 475.108 409.545C476.83 409.384 478.149 409.532 479.851 409.51C480.732 409.516 481.231 409.538 482.093 409.565C483.665 409.591 484.812 409.191 486.356 409.037C486.955 409.027 487.194 409.039 487.79 409.102C488.849 409.271 489.529 409.535 490.622 409.499C494.435 409.542 497.886 409.685 501.696 409.303C502.309 409.243 502.555 409.228 503.168 409.221C504.26 409.295 504.974 409.432 506.054 409.547C507.134 409.623 507.857 409.65 508.951 409.608C510.58 409.573 511.839 409.621 513.492 409.532C514.153 409.515 514.42 409.516 515.093 409.497C516.05 409.509 516.602 409.535 517.582 409.556C527.417 409.98 536.875 410.038 546.247 410.089C556.437 410.144 566.726 409.853 576.964 409.467C580.178 409.346 582.101 407.449 583.155 404.559C583.893 402.537 584.423 400.399 586.754 398.887C588.073 398.41 589.189 398.326 590.625 398.36C593.483 404.062 598.545 403.719 603.781 403.844C610.092 407.775 607.625 413.787 607.878 419.538C607.477 420.315 607.103 420.494 606.35 420.623C605.275 420.739 604.509 420.761 603.371 420.874C601.575 422.392 599.729 422.402 597.906 422.472C587.819 422.861 577.732 422.876 567.207 422.373C565.937 422.095 565.119 421.807 563.816 421.958C562.503 422.134 561.616 422.116 560.27 421.975C557.698 421.31 555.529 421.453 553.373 421.452C528.118 421.447 502.863 421.447 477.133 421.456C475.709 421.558 474.784 421.412 473.435 421.03C469.886 419.158 466.444 418.374 462.994 418.56C450.786 419.216 439.087 415.224 426.953 414.943C418.835 414.755 410.716 414.815 402.602 414.596C400.301 414.534 397.934 414.857 395.48 413.294Z" fill="#C2F9DA"></path><path d="M502.111 535.581C497.224 536.751 492.692 537.233 488.64 533.29C484.205 528.975 478.599 525.864 472.569 525.254C467.123 524.703 462.558 522.23 458.607 519.572C454.061 516.513 450.582 516.498 445.956 519.059C439.582 503.839 429.51 492.725 412.98 488.586C408.659 487.504 404.223 486.347 399.823 486.276C395.522 486.208 394.904 484.35 395.327 480.898C395.487 479.591 395.371 478.251 395.473 476.494C397.097 475.467 396.958 474.096 396.992 472.856C397.038 471.16 397.303 469.662 399.679 469.249C401.965 469.752 403.38 471.814 406.056 471.026C415.234 468.105 423.138 472.008 431.053 474.707C436.688 476.629 442.316 478.697 447.835 481.036C452.752 483.12 456.856 485.95 460.066 490.12C462.038 492.682 464.338 494.762 467.678 496.168C470.272 497.998 469.68 501.303 472.085 503.257C473.245 504.822 473.58 506.363 474.117 508.167C474.416 509.058 474.618 509.646 475.243 510.368C475.6 510.769 475.744 510.933 476.091 511.359C482.417 518.943 490.229 524.341 497.535 530.319C499.291 531.756 501.62 532.69 502.111 535.581Z" fill="#315BA3"></path><path d="M225.672 320.645C225.75 338.65 225.693 356.341 225.503 374.477C222.602 375.358 222.991 372.913 222.332 371.505C221.558 369.849 220.873 367.603 218.827 367.976C216.837 368.339 217.565 370.683 217.51 372.215C217.398 375.338 217.547 378.469 217.441 381.593C217.375 383.527 217.63 385.611 215.425 387.003C214.691 361.832 213.937 336.658 215.206 311.557C216.151 292.866 226.269 278.595 241.786 268.606C259.128 257.442 277.863 248.556 294.894 236.846C297.631 234.965 298.75 237.174 300.272 238.536C306.374 243.999 306.289 243.877 299.461 248.149C284.514 257.501 269.164 266.14 253.862 274.89C237.375 284.315 227.16 298.528 225.931 318.615C225.617 319.435 225.499 319.863 225.672 320.645Z" fill="#4996AF"></path><path d="M607.463 439.9C607.91 448.702 607.938 457.413 607.902 466.594C607.105 470.667 607.448 474.32 607.56 477.933C607.652 480.908 606.177 481.611 603.694 482.591C594.2 486.339 584.123 485.137 574.371 486.546C569.834 487.201 565.434 489.33 560.281 487.876C559.633 487.666 559.388 487.555 558.865 487.164C559.861 477.738 553.519 473.038 547.564 468.177C544.754 465.883 542.033 463.484 539.193 461.225C537.404 459.803 535.497 458.344 535.683 455.279C537.667 451.254 541.205 451.141 544.657 450.452C555.344 448.319 566.061 450.981 576.76 449.963C584.982 449.18 593.186 448.102 601.499 448.229C606.225 448.301 604.922 443.791 606.212 440.764C606.622 440.195 606.833 440.003 607.463 439.9Z" fill="#4076AF"></path><path d="M799.306 336.447C798.984 328.906 799.233 321.715 798.561 314.611C797.031 298.417 788.756 286.01 775.131 277.622C757.71 266.898 739.926 256.752 722.127 246.66C717.99 244.314 718.516 243.286 721.491 240.212C725.48 236.091 728.465 235.996 733.247 239.146C747.699 248.664 763.047 256.708 778.149 265.146C799.676 277.174 810.752 295.191 810.31 320.144C810.033 335.792 810.248 351.449 810.164 367.567C807.38 365.506 804.956 362.742 800.95 361.93C799.121 361.56 799.524 359.219 799.514 357.594C799.472 350.675 799.575 343.756 799.306 336.447Z" fill="#4996AF"></path><path d="M825.027 656.356C824.842 655.824 824.835 655.658 824.821 655.492C824.496 651.555 825.92 646.349 823.231 643.996C818.972 640.269 813.229 638.102 807.172 637.999C789.685 637.702 772.197 637.301 754.708 637.178C731.551 637.015 708.392 637.089 685.234 637.016C683.499 637.01 681.664 637.457 679.458 636.215C689.278 629.098 699.789 624.466 711.175 621.779C730.417 617.24 749.708 616.023 768.856 622.103C774.614 623.932 780.281 626.268 785.656 629.023C791.182 631.855 796.848 633.247 802.944 632.856C811.23 632.324 818.663 634.77 825.884 638.57C828.318 639.851 829.331 641.232 829.138 643.948C828.854 647.932 828.89 651.938 828.741 656.391C827.48 658.169 826.33 657.745 825.027 656.356Z" fill="#416AD1"></path><path d="M475.277 266.364C476.453 259.03 478.52 252.124 477.687 244.492C479.37 242.756 481.593 242.329 482.831 240.304C484.644 237.339 486.591 238.452 488.342 240.542C488.662 240.923 489.018 241.37 489.061 241.834C489.665 248.264 494.892 250.979 499.048 254.689C503.59 258.743 508.39 261.513 514.705 260.631C519.987 259.894 523.095 263.51 525.871 266.886C530.607 272.646 535.986 277.352 542.934 280.162C544.712 280.881 545.853 282.289 547.066 284.144C547.252 290.116 550.223 291.271 555.607 292.243C562.335 293.458 568.933 295.812 576.162 296.728C576.665 297.043 576.852 297.188 577.268 297.597C577.733 298.247 577.94 298.648 578.229 299.363C578.416 299.854 578.484 300.05 578.642 300.535C578.889 301.388 579.008 301.962 579.327 302.771C579.545 303.195 579.64 303.362 579.897 303.773C580.289 304.354 580.51 304.696 580.883 305.328C581.432 306.453 581.692 307.321 581.474 308.615C581.189 309.153 581.02 309.341 580.517 309.717C577.895 310.67 575.5 310.701 573.296 309.984C563.665 306.848 553.773 306.676 543.812 307.048C542.428 307.099 541.061 306.828 540.156 305.773C534.092 298.7 527.325 292.464 519.023 287.502C518.07 286.071 519.474 284.764 518.306 283.456C515.28 280.906 513.754 277.883 513.158 274.373C512.38 277.779 510.755 280.801 507.722 283.375C506.594 284.125 505.687 284.49 504.335 284.718C502.931 284.712 501.995 284.36 500.775 283.708C497.829 281.313 496.42 278.463 495.479 275.174C494.312 271.097 493.424 266.756 489.321 263.891C486.632 265.601 488.423 269.362 485.422 271.21C482.204 268.992 478.136 269.265 475.277 266.364Z" fill="#D14EB2"></path><path d="M782.259 701.628C782.701 702.628 782.833 703.284 782.857 703.943C782.899 705.108 782.867 706.276 782.881 707.442C782.934 712.009 781.807 717.053 787.655 719.285C787.139 723.432 781.518 724.945 782.642 730.334C783.575 734.804 782.827 739.626 782.823 744.292C782.82 748.791 782.812 753.29 782.815 757.79C782.819 762.456 782.967 767.127 782.788 771.785C782.695 774.207 783.478 775.385 785.849 775.989C790.193 777.096 794.457 778.514 798.772 779.74C805.685 781.705 811.473 779.186 817.873 773.997C816.569 783.946 817.995 792.895 815.88 801.616C814.073 809.071 808.074 811.786 799.727 809.275C782.066 803.963 764.54 798.201 746.689 793.521C744.625 792.98 742.356 793.01 740.328 791.469C748.65 788.73 751.881 783.26 751.488 774.429C750.851 760.125 751.234 745.774 751.302 731.443C751.314 728.942 750.971 726.819 748.729 725.408C746.01 723.697 745.732 722.054 748.46 719.937C754.15 715.522 751.137 709.146 752.005 703.219C755.615 700.243 759.668 700.026 763.772 700.274C769.814 700.639 775.954 699.25 782.259 701.628Z" fill="#E3E8EF"></path><path d="M560.658 420.532C561.822 420.554 562.496 420.564 563.505 420.56C564.058 420.571 564.275 420.594 564.818 420.589C577.458 420.621 589.771 420.682 602.542 420.855C602.532 423.714 603.562 426.377 605.687 427.495C609.869 429.697 609.206 432.927 608.386 436.694C606.036 431.928 601.828 431.703 597.104 431.71C533.106 431.798 469.108 431.778 405.11 431.747C401.98 431.745 398.751 432.26 395.406 430.365C398.522 426.141 402.674 425.486 407.715 426.728C419.169 429.553 430.866 427.507 442.45 427.875C443.959 427.923 445.489 426.862 445.449 425.141C445.412 423.524 443.644 424.107 442.646 423.762C441.734 423.448 440.657 423.082 439.78 423.286C435.314 424.324 431.168 423.032 426.792 422.489C417.632 421.353 408.228 422.176 398.925 422.239C398.485 422.242 398.036 422.653 397.611 422.906C394.635 424.679 395.236 422.196 395.007 420.337C396.597 418.467 398.594 418.262 400.601 418.272C423.675 418.383 446.758 417.659 469.819 419.022C470.653 419.071 471.474 419.144 472.655 419.78C473.723 420.153 474.381 420.244 475.374 420.314C495.197 420.786 514.687 420.391 534.175 420.503C542.839 420.552 551.503 420.5 560.658 420.532Z" fill="#0B191F"></path><path d="M521.57 758.362C524.058 760.041 526.27 761.464 529.613 763.614C513.623 763.614 498.782 763.614 483.265 763.614C492.065 760.359 494.903 754.412 494.251 745.603C493.527 735.832 493.937 725.96 494.206 716.142C494.314 712.226 493.518 709.299 488.582 707.447C495.496 705.135 494.079 700.001 494.088 695.411C494.1 689.083 493.563 682.714 494.117 676.438C494.819 668.494 490.851 663.599 484.917 659.526C484.256 659.072 483.598 658.61 482.96 658.125C482.881 658.065 482.93 657.837 482.892 657.253C498.174 657.253 513.433 657.253 528.692 657.253C516.937 663.488 517.755 674.348 518.18 685.123C518.351 689.446 518.301 693.785 518.153 698.11C518.025 701.857 518.657 705.09 524.051 707.185C518.01 708.512 517.916 712.134 517.96 716.081C518.082 727.071 518.044 738.064 517.939 749.054C517.905 752.573 518.748 755.617 521.57 758.362Z" fill="#F8F9FB"></path><path d="M341.298 637.307C301.611 637.145 262.266 637.124 222.452 637.071C220.175 635.626 219.595 634.35 222.697 633.239C227.878 633.024 231.941 630.475 236.082 628.522C264.049 615.333 292.562 615.405 321.435 624.805C326.85 626.568 332.024 629.153 337.159 631.665C339.577 632.847 342.258 633.998 343.28 636.928C342.607 637.37 342.142 637.484 341.298 637.307Z" fill="#416AD1"></path><path d="M702.819 531.033C703.027 530.747 703.282 530.673 703.344 530.79C707.659 530.072 711.956 530.69 716.229 530.533C716.887 530.509 717.704 530.476 718.105 530.983C720.994 534.641 719.224 538.897 719.329 542.855C719.409 545.879 716.622 545.491 714.492 545.407C713.813 545.366 714.179 545.805 714.392 545.712C715.431 545.258 716.593 545.543 718.002 545.906C717.641 546.286 716.968 546.546 716.341 546.462C711.847 545.865 708.745 546.981 706.627 551.637C704.69 555.895 700.8 559.277 696.326 560.589C692.039 561.847 691.647 564.226 691.785 567.816C691.963 572.458 686.903 575.281 682.824 573.01C681.271 572.145 681.697 570.625 681.892 569.463C682.673 564.798 680.805 562.547 676.339 560.819C670.877 558.704 666.277 554.998 664.641 548.765C663.785 545.504 661.013 546.472 658.854 546.425C651.008 546.252 651.006 546.299 651.017 538.582C651.03 529.315 651.039 528.994 660.263 529.242C666.789 529.418 663.606 524.737 664.612 521.691C664.661 521.053 664.635 520.816 664.78 520.264C667.222 512.945 671.424 509.487 678.007 508.863C680.144 508.66 681.101 509.081 680.996 511.388C680.876 514.041 680.831 516.716 681.04 519.359C681.292 522.551 680.514 524.753 677.688 526.869C672.203 530.975 670.964 538.665 674.202 544.154C677.457 549.671 684.632 552.251 690.647 550.01C694.674 548.51 697.214 545.651 698.37 541.157C700.038 538.28 698.728 535.351 699.708 532.268C699.883 531.864 699.995 531.977 699.93 531.931C700.712 531.366 701.721 531.631 702.819 531.033Z" fill="#61D6EC"></path><path d="M395.036 430.297C399.467 428.954 403.967 429.732 408.432 429.728C472.722 429.667 537.011 429.671 601.3 429.659C607.932 429.658 607.932 429.657 608.06 436.545C608.139 436.997 607.954 437.436 607.875 437.661C606.091 439.667 603.851 439.45 601.712 439.428C584.438 439.255 567.159 438.723 549.911 438.116C537.787 437.69 525.649 438.215 513.571 437.37C500.996 436.491 488.448 436.896 475.891 437.053C468.585 437.144 461.285 437.676 453.498 437.33C443.674 437.2 434.323 437.196 424.512 437.257C423.222 437.853 422.297 438.192 421.152 438.75C420.884 438.87 420.998 438.922 420.937 438.909C420.586 439.416 420.499 440.007 420.04 440.708C419.786 440.858 419.96 440.994 419.877 440.926C419.598 441.416 419.5 442.003 419.013 442.675C418.744 442.796 418.749 442.825 418.764 442.824C418.72 443.159 418.568 443.447 418.123 443.835C416.803 445.794 415.685 447.604 414.053 450.249C410.923 441.398 405.401 436.312 395.622 436.953C395.22 436.936 395.096 436.858 395.051 436.915C394.065 435.32 394.664 433.534 394.738 431.405C394.916 431.003 395.048 430.538 395.036 430.297Z" fill="#A5FBD0"></path><path d="M782.702 701.511C772.777 702.521 762.871 701.043 752.587 702.867C752.075 692.855 752.048 682.891 752.088 672.462C752.243 671.827 752.332 671.656 752.265 671.242C750.368 664.214 744.771 661.099 738.824 657.273C758.808 657.273 778.16 657.273 798.294 657.273C796.359 658.331 795.007 659.086 793.641 659.815C786.119 663.826 781.88 669.448 782.673 678.618C783.316 686.043 782.792 693.57 782.702 701.511Z" fill="#FCFDFD"></path><path d="M214.075 704.264C217.345 701.566 221.046 702.015 224.662 702.013C230.114 702.011 235.565 702.012 241.482 702.004C245.167 707.255 243.267 712.965 243.335 718.957C242.452 721.308 242.581 723.824 239.46 724.376C238.056 723.498 237.779 722.388 237.592 720.831C237.824 716.903 236.251 715.612 232.769 716.305C228.582 717.138 224.083 715.343 219.793 718.034C217.808 722.214 219.403 726.137 219.805 729.948C220.603 737.53 220.564 745.098 220.608 753.1C220.339 768.171 220.519 782.825 220.578 797.478C220.599 802.685 222.437 804.096 227.996 803.191C235.248 802.01 242.133 799.361 249.157 797.305C257.944 794.732 266.862 792.558 275.455 789.355C296.387 781.554 308.174 764.745 308.487 742.373C308.501 741.374 308.56 740.376 308.527 738.948C308.494 735.588 307.74 732.516 310.558 730.016C312.746 731.844 311.746 734.125 311.977 736.205C312.153 737.792 311.589 739.729 314.507 739.979C315.846 765.336 299.856 787.987 275.005 795.875C260.139 800.594 245.093 804.747 230.114 809.109C228.534 809.569 226.872 809.899 225.233 809.979C217.64 810.351 214.19 807.023 214.177 799.402C214.14 778.427 214.054 757.452 214.135 736.477C214.158 730.712 214.757 724.923 205.816 722.417C215.228 718.26 214.003 711.212 214.075 704.264Z" fill="#E8EEF2"></path><path d="M404.711 703.378C405.725 703.016 406.457 703.012 407.556 703.002C407.99 711.319 408.064 719.642 408.122 727.965C408.206 739.934 415.41 746.454 427.214 745.297C432.515 744.777 437.821 744.163 443.138 743.995C446.619 743.886 448.573 743.003 447.847 739.122C447.727 738.478 447.764 737.784 447.84 737.127C448.98 727.266 447.275 718.804 436.831 714.112C451.136 714.112 465.441 714.112 480.973 714.112C473.54 717.879 474.747 724.195 474.638 729.981C474.444 740.306 474.472 750.635 474.377 760.961C474.36 762.845 474.957 764.8 471.685 765.051C456.418 766.225 441.195 768.078 425.915 768.941C399.566 770.43 382.3 753.715 382.088 727.307C382.045 721.874 384.017 715.579 376.59 712.707C379.201 709.85 383.605 708.551 382.291 703.371C383.356 702.975 384.316 702.983 385.636 702.991C387.583 704.742 387.576 706.868 387.377 709.471C386.258 718.034 385.881 726.198 387.435 734.261C391.1 753.278 407.016 765.125 426.239 763.213C437.656 762.077 449.035 760.637 460.526 760.249C467.903 760 468.397 759.237 468.405 751.985C468.416 742.998 468.333 734.01 468.442 725.024C468.487 721.306 467.209 719.669 463.275 719.538C452.544 719.178 452.591 719.04 452.567 729.829C452.559 733.671 453.057 737.46 453.329 741.273C453.708 746.57 451.519 749.029 446.265 749.489C439.639 750.069 433.017 750.796 426.375 751.085C415.529 751.558 402.616 746.035 403.374 729.736C403.667 723.424 403.293 717.091 403.502 710.329C403.39 707.774 403.232 705.653 404.711 703.378Z" fill="#E8EEF2"></path><path d="M361.659 668.717C361.598 682.391 361.054 695.791 361.842 709.593C360.385 711.181 358.683 710.752 358.376 709.161C357.402 704.124 353.768 704.429 349.729 704.486C348.348 704.443 347.348 704.544 345.994 704.46C339.929 702.951 339.907 707.186 339.098 711.114C338.794 711.642 338.646 711.843 338.195 712.273C337.14 712.81 336.386 712.808 335.33 712.262C335.111 698.224 335.207 684.44 335.266 670.656C335.284 666.391 332.678 663.621 329.576 661.24C327.891 659.946 326.056 658.849 323.588 657.194C340.359 657.194 356.422 657.194 372.94 657.194C368.98 660.44 364.889 663.191 362.125 667.714C361.817 668.136 361.711 668.289 361.659 668.717Z" fill="#FCFDFD"></path><path d="M558.765 487.216C568.866 487.024 578.326 482.731 588.174 484.119C594.48 485.009 599.279 480.053 605.407 480.738C607.062 480.922 606.935 478.912 606.984 477.607C607.109 474.303 607.217 470.999 607.584 467.378C607.89 473.358 607.903 479.653 608.018 485.947C608.055 487.957 607.621 489.434 605.529 490.243C594.379 494.553 587.847 503.542 582.012 513.707C577.857 516.182 573.466 516.581 569.219 516.05C564.897 515.51 561.289 516.515 557.959 518.958C555.136 521.031 551.988 522.563 549.178 524.685C545.47 527.487 541.563 525.617 537.5 524.135C535.776 521.629 538.167 520.399 538.753 518.333C539.116 517.63 539.373 517.268 539.919 516.739C540.835 516.115 541.597 515.884 542.528 515.38C542.878 515.085 543.011 514.959 543.326 514.628C543.739 514.129 543.965 513.832 544.36 513.298C544.792 512.76 545.072 512.477 545.6 512.003C546.158 511.528 546.486 511.261 547.068 510.783C549.908 508.838 551.23 506.384 551.57 503.314C551.745 501.737 551.685 500.047 553.346 498.697C556.101 498.549 555.881 496.522 556.279 495.022C556.956 492.473 557.047 489.756 558.765 487.216Z" fill="#3765A8"></path><path d="M638.277 865.295C651.239 854.621 666.138 846.904 680.506 838.375C694.898 829.83 709.669 821.925 724.169 813.558C728.655 810.97 732.432 813.584 736.751 814.645C738.61 815.978 739.477 817.417 739.2 819.776C727.977 826.411 716.843 832.73 705.637 838.918C685.386 850.101 665.217 861.422 645.326 873.895C643.091 870.993 643.384 866.298 638.277 865.295Z" fill="#2C428C"></path><path d="M546.362 284.754C544.686 281.746 541.503 281.034 538.657 279.858C531.269 276.806 527.171 269.991 521.797 264.714C519.565 262.522 517.605 261.586 514.918 262C507.771 263.102 502.395 260.042 497.683 255.145C496.996 254.431 496.272 253.663 495.41 253.222C491.362 251.153 488.395 248.408 488.15 243.463C488.067 241.78 487.271 239.929 485.463 239.626C483.489 239.295 484.509 241.797 483.473 242.498C481.935 243.54 480.745 245.729 478.046 244.173C476.833 240.339 475.913 236.565 475.008 232.39C477.646 231.087 480.367 230.595 482.961 229.449C487.029 227.653 493.913 229.325 496.538 232.854C498.693 235.753 501.457 237.646 504.662 239.713C506.101 241.294 507.269 242.022 508.69 239.704C510.103 238.499 511.419 238.001 513.294 238.272C513.848 238.495 514.053 238.62 514.493 239.015C515.123 239.867 515.393 240.523 516.019 241.369C519.157 244.897 520.889 248.81 522.576 252.786C525.237 259.059 530.01 263.183 536.312 265.613C537.082 265.91 537.958 266.283 538.62 265.62C539.326 264.914 538.828 264.046 538.462 263.326C537.418 261.273 536.006 259.378 535.851 256.584C536.463 252.315 539.691 252.773 542.353 252.3C544.333 251.949 546.291 252.121 548.615 252.643C549.492 252.811 549.965 252.981 550.722 253.41C551.204 253.764 551.381 253.923 551.785 254.347C552.149 254.797 552.285 254.981 552.614 255.444C553.2 256.268 553.621 256.791 554.408 257.45C557.982 260.773 560.051 264.772 562.474 268.505C563.365 269.877 564.173 271.422 562.68 273.312C558.49 273.993 554.583 273.375 550.674 274.157C547.805 274.731 546.728 275.856 547.244 278.746C547.586 280.668 547.615 282.661 546.362 284.754Z" fill="#F17187"></path><path d="M452.292 398.403C451.052 397.29 450.12 396.447 449.051 395.316C448.734 394.757 448.524 394.511 448.063 394.19C447.842 394.089 447.927 394.075 447.921 394.118C447.775 393.825 447.564 393.541 447.042 393.205C446.792 393.108 446.913 393.1 446.901 393.159C446.495 392.472 445.642 392.143 444.94 391.325C444.642 391.245 444.801 391.196 444.79 391.279C444.775 390.916 444.609 390.549 443.933 390.281C443.613 390.288 443.698 390.366 443.644 390.385C443.997 384.293 440.952 379.791 436.885 375.693C435.74 374.539 434.807 373.119 434.273 371.113C434.797 358.652 439.926 348.438 447.277 339.162C448.437 337.698 449.28 336.139 449.781 334.357C450.688 331.128 452.603 329.153 456.545 329.451C459.248 332.103 458.048 335.255 458.39 338.136C458.657 340.379 458.072 343.174 460.903 344.077C463.904 345.033 465.042 342.919 466.419 340.519C467.862 338.006 470.117 335.868 472.77 333.819C475.883 334.481 478.137 335.889 479.175 339.156C479.374 342.63 478.079 344.961 475.445 346.601C474.598 347.129 473.941 347.911 473.165 348.529C467.652 352.926 465.739 358.718 466.48 365.557C466.655 367.168 467.478 369.012 465.731 370.14C463.906 371.317 462.736 369.49 461.317 368.729C462.958 370.006 464.159 371.167 462.772 373.559C460.472 377.528 457.837 381.526 459.319 386.556C459.409 386.861 459.384 387.306 459.191 387.525C456.326 390.781 457.578 394.547 457.54 398.434C455.698 399.415 454.149 399.417 452.292 398.403Z" fill="#A546D7"></path><path d="M401.372 470.184C399.113 469.884 397.928 470.555 397.99 472.756C398.026 474.052 398.09 475.455 395.981 475.993C395.414 470.667 395.263 465.271 395.208 459.419C399.51 457.779 403.865 457.594 408.105 458.092C413.555 458.731 418.402 455.345 424.136 456.702C427.428 457.48 429.934 459.667 433.3 460.073C438.195 460.665 442.912 462.407 447.982 462.114C449.53 462.025 451.493 462.558 452.656 463.534C457.741 467.797 464.848 467.793 470.287 472.119C470.251 475.196 466.997 476.297 466.207 479.381C465.694 485.459 468.925 490.684 468.219 496.714C464.629 497.152 461.991 495.383 460.494 492.835C456.108 485.371 448.646 482.414 441.28 479.852C432.753 476.886 424.38 473.418 415.472 471.391C411.998 470.6 409.612 473.361 406.257 472.1C404.728 470.859 403.19 470.622 401.372 470.184Z" fill="#3765A8"></path><path d="M311.175 212.089C309.722 204.846 312.676 200.864 318.845 198.258C323.69 196.21 328.166 191.47 332.857 191.401C337.331 191.334 341.676 196.276 346.43 198.094C353.274 200.71 355.407 205.118 354.543 212.167C353.88 217.577 354.276 223.13 354.384 228.616C354.429 230.893 353.703 232.142 351.584 233.222C345.671 236.235 339.889 239.514 334.145 242.843C332.824 243.609 331.954 243.768 330.603 242.952C324.917 239.52 319.193 236.147 313.387 232.924C311.49 231.871 311.066 230.553 311.118 228.539C311.257 223.221 311.172 217.896 311.175 212.089Z" fill="#6DEFC4"></path><path d="M473.239 923.218C464.299 917.772 455.607 912.552 446.977 907.232C444.412 905.651 441.988 903.87 438.396 903.878C437.843 903.736 437.68 903.656 437.256 903.651C432.547 902.987 428.021 902.67 423.356 901.053C422.849 900.784 422.694 900.683 422.267 900.637C420.801 900.297 419.607 899.903 418.184 899.288C416.648 895.802 419.393 895.175 421.643 893.876C422.19 893.827 422.361 893.883 422.761 894.083C423.188 894.34 423.387 894.451 423.886 894.727C428.291 895.536 432.168 897.333 436.839 897.405C438.231 897.046 439.397 897.015 439.944 897.802C441.793 900.46 443.999 899.675 446.619 898.885C447.786 900.475 448.935 901.597 450.345 902.567C461.803 910.446 473.728 917.622 485.394 925.169C493.395 930.345 501.92 934.905 510.109 939.908C512.097 941.122 513.627 941.103 515.569 939.906C534.921 927.98 554.603 916.588 573.3 903.608C576.663 901.274 578.835 898.493 579.963 894.326C583.107 892.631 584.457 895.314 586.634 896.73C589.478 896.919 592.093 896.825 595.135 896.709C595.927 896.768 596.259 896.702 596.776 896.315C597.361 896.044 597.724 895.925 598.373 895.782C599.017 895.815 599.323 895.713 599.79 895.325C601.007 894.754 602.012 894.313 603.337 893.797C606.778 892.911 608.383 894.956 609.92 897.447C603.202 901.963 595.615 902.939 588.069 903.891C584.028 904.402 580.51 905.684 577.053 907.926C557.031 920.911 536.69 933.387 516.156 945.546C514.182 946.715 512.554 947.465 510.258 946.025C499.723 939.422 489.086 932.981 478.231 926.26C477.779 925.766 477.551 925.522 477.05 925.245C476.807 925.183 476.924 925.115 476.892 925.174C476.042 924.077 474.462 924.317 473.239 923.218Z" fill="#416AD1"></path><path d="M763.009 597.19C763.232 597.081 763.664 597.042 763.843 596.92C764.209 596.68 764.397 596.563 764.847 596.245C765.994 595.599 766.877 595.154 767.919 594.451C769.584 592.506 771.27 591.076 773.765 590.218C785.346 582.444 794.5 572.477 804.35 562.805C804.856 562.721 805.071 562.793 805.486 563.136C808.366 566.149 810.98 564.735 813.4 563.096C815.126 561.927 816.451 560.229 818.157 558.47C823.803 554.385 828.256 549.308 834.552 546.122C838.976 547.043 839.471 548.045 837.119 551.043C833.917 555.126 829.564 558 825.812 561.509C819.96 566.986 821.101 571.831 829.095 575.05C824.265 580.393 818.011 583.568 811.827 586.66C797.908 593.618 783.55 599.572 768.518 603.748C765.646 604.546 762.711 605.119 759.409 605.781C756.429 605.091 755.613 603.504 756.85 600.74C758.546 599.714 759.953 598.958 761.682 598.053C762.257 597.693 762.518 597.491 763.009 597.19Z" fill="#A331A4"></path><path d="M625.999 473.045C625.514 462.468 625.444 452.07 625.536 441.291C627.553 439.473 629.742 439.562 631.909 439.557C639.069 439.543 646.232 439.416 653.389 439.577C675.019 440.062 696.605 437.7 718.692 438.695C719.722 438.885 720.251 439.123 720.971 439.809C721.218 440.97 720.842 441.658 720.203 442.629C719.862 443.127 719.721 443.318 719.357 443.781C717.482 445.874 715.559 447.399 713.461 449.207C713.051 449.545 712.885 449.673 712.465 449.98C712.042 450.271 711.873 450.384 711.452 450.662C710.874 451.052 710.544 451.273 709.683 451.743C703.636 452.35 700.434 457.072 695.454 459.175C677.275 454.997 658.984 455.05 640.848 453.626C639.859 453.548 638.858 453.606 637.863 453.617C629.084 453.72 628.646 454.161 628.611 462.919C628.607 463.914 628.635 464.91 628.512 466.343C628.365 469.113 629.056 471.703 625.999 473.045Z" fill="#4483B7"></path><path d="M609.875 589.434C606.69 584.92 602.218 582.128 598.826 578.258C594.528 573.353 590.487 568.311 587.392 562.202C581.405 545.919 580.489 529.932 588.574 513.971C591.996 513.294 594.845 513.45 596.187 517.184C586.58 536.895 591.054 554.596 602.713 571.238C612.299 584.921 625.014 595.725 637.001 607.633C636.142 609.254 634.635 609.491 633.151 609.504C615.039 609.659 597.104 608.494 579.465 602.016C577.785 600.82 575.924 599.355 576.421 598.016C577.178 595.977 579.643 597.113 581.309 597.097C593.377 596.988 605.447 597.038 618.246 597.038C615.88 593.324 613.4 591.065 609.875 589.434Z" fill="#86EFD8"></path><path d="M365.24 863.886C351.552 856.421 338.245 848.624 324.746 841.173C312.103 834.194 299.257 827.581 286.15 820.648C284.739 819.185 284.708 817.812 285.744 816C293.101 812.077 299.404 812.353 306.837 816.55C327.794 828.384 348.729 840.238 369.28 852.765C371.119 853.886 372.885 855.127 374.86 856.597C376.047 858.602 374.976 859.87 373.595 859.39C369.113 857.833 367.326 860.615 365.24 863.886Z" fill="#2C428C"></path><path d="M730.87 429.307C732.601 426.719 734.196 424.442 735.792 422.164C734.513 420.561 732.9 421.284 731.532 421.28C697.718 421.184 663.904 421.089 630.09 421.168C626.553 421.176 625.149 420.585 625.182 416.624C625.213 412.861 626.201 411.948 629.937 411.958C668.082 412.062 706.227 411.961 744.372 411.918C745.503 411.917 746.635 411.918 748.34 411.918C744.36 419.937 737.628 425.32 733.278 432.732C731.771 432.115 731.118 430.959 730.87 429.307Z" fill="#C2F9DA"></path><path d="M536.664 522.858C544.372 527.108 549.967 522.795 555.503 518.888C559.943 515.755 564.107 513.1 570.117 514.786C573.497 515.734 577.239 513.452 581.37 513.988C581.621 514.513 581.441 515.04 581.096 515.798C580.651 516.311 580.403 516.618 580.129 517.242C579.372 521.434 578.673 525.335 577.895 529.643C577.594 530.438 577.497 530.857 577.629 531.618C577.763 534.673 577.794 537.415 577.759 540.613C573.819 541.643 570 540.784 566.427 539.718C564.121 539.03 562.389 537.596 560.378 540.009C559.566 540.983 558.403 540.848 557.167 540.618C547.357 538.793 537.403 540.572 527.485 539.568C523.95 539.21 519.736 541.529 515.293 540.31C515.046 536.821 518.324 536.521 520.121 534.41C525.965 530.727 530.016 525.144 536.664 522.858Z" fill="#315BA3"></path><path d="M553.607 897.891C540.726 906.254 527.147 913.321 514.55 921.999C512.902 923.134 511.839 922.452 510.533 921.679C494.234 912.029 477.938 902.373 461.606 892.779C459.677 891.645 458.82 890.281 458.873 887.984C459.062 879.842 459.072 871.696 459.429 863.232C466.066 861.955 469.292 863.236 472.235 868.118C474.213 873.278 473.323 878.306 473.293 883.233C473.27 887.195 474.737 889.725 478.06 891.754C488.535 898.147 499.122 904.37 509.3 911.236C512.087 913.116 514.442 912.832 517.042 911.004C524.918 905.465 533.175 900.522 541.464 895.636C543.033 894.711 544.529 893.635 546.758 893.258C549.986 893.576 551.809 895.429 553.607 897.891Z" fill="#4E99D0"></path><path d="M528.413 159.384C528.976 155.831 525.789 154.831 523.681 152.858C518.733 148.226 517.79 141.408 515.106 135.561C513.803 132.722 512.775 131.376 509.407 132.944C515.188 121.89 518.364 110.291 515.091 97.5677C513.876 92.8428 511.707 88.5858 509.013 84.5184C510.654 83.4318 511.496 84.9641 512.456 85.6063C530.81 97.8793 538.396 119.564 533.429 141.505C532.076 147.479 530.456 153.298 528.413 159.384Z" fill="#F8EC9C"></path><path d="M247.069 600.436C228.492 594.671 210.805 587.926 195.239 576.015C197.379 573.72 199.55 571.573 201.734 569.431C204.474 566.744 203.553 565.437 200.921 563.783C196.699 561.13 192.707 558.114 189.293 554.478C186.205 551.19 186.809 549.592 191.697 547.996C195.292 548.715 197.451 551.192 200.382 553.091C204.127 556.1 207.458 559.03 210.707 562.057C215.238 566.279 220.435 569.27 226.853 570.723C227.147 570.931 227.052 570.991 227.024 570.942C227.207 571.201 227.462 571.468 228.002 571.83C235.323 578.252 242.398 584.545 249.778 590.999C251.251 594.81 250.879 598.031 247.069 600.436Z" fill="#A331A4"></path><path d="M434.873 370.624C436.931 373.4 438.603 376.088 440.824 378.199C444.276 381.481 445.675 385.032 443.721 389.994C428.263 376.897 418.693 360.338 417.062 339.708C416.696 335.078 417.06 330.39 417.232 325.268C417.889 324.16 418.531 323.312 419.304 323.476C425.78 324.848 425.312 320.078 425.922 315.832C427.297 311.949 427.773 308.091 430.427 304.74C433.534 302.985 437.104 304.254 440.02 301.825C440.888 301.135 441.504 300.722 442.381 300.023C445.852 297.353 449.279 295.707 453.773 296.529C455.18 298.207 454.59 299.722 454.091 301.596C452.385 305.299 450.777 308.631 449.925 312.647C448.494 315.101 447.738 317.436 446.839 320.115C445.314 323.646 443.113 325.479 439.662 326.8C428.209 331.182 423.59 342.37 428.006 354.338C429.604 358.668 431.067 363.109 433.652 367.027C434.296 368.003 434.77 369.062 434.873 370.624Z" fill="#8658F1"></path><path d="M822.111 601.847C833.582 603.51 842.759 608.774 851.697 616.566C838.8 620.805 827.449 627.676 813.828 625.011C806.91 623.657 801.524 619.278 795.596 615.984C793.326 614.723 789.291 614.093 789.359 611.698C789.444 608.724 793.407 607.782 796.017 606.5C804.111 602.523 812.659 600.805 822.111 601.847Z" fill="#A331A4"></path><path d="M505.623 241.148C501.513 239.142 497.571 237.742 495.388 233.319C493.801 230.104 485.614 229.244 482.186 231.232C480.125 232.426 478.15 233.7 475.36 232.136C469.54 219.041 465.793 205.806 468.625 191.189C468.918 192.171 468.998 193.496 468.997 194.82C468.997 202.491 469.915 203.064 477.71 201.666C482.345 200.835 487.012 200.036 491.847 200.859C494.492 201.309 495.535 202.394 494.807 204.734C493.484 208.986 494.37 213.307 494.009 217.574C493.659 221.704 495.333 223.399 499.46 222.998C501.596 222.791 503.77 222.973 506.377 222.991C510.821 227.382 513.441 232.45 514.291 238.626C512.606 239.283 511.128 239.616 509.274 240.023C508.102 240.97 507.05 241.162 505.623 241.148Z" fill="#F89A60"></path><path d="M541.429 628.529C544.309 629.994 546.472 631.803 548.401 633.891C549.271 634.833 550.856 635.693 550.405 637.072C549.881 638.671 548.096 637.919 546.882 637.931C539.899 638 532.915 637.956 525.931 637.959C510.634 637.965 495.337 637.976 480.04 637.985C478.256 637.986 476.472 637.986 474.477 637.986C481.076 623.91 517.243 612.179 541.429 628.529Z" fill="#2A50A0"></path><path d="M524.089 211.267C520.257 203.625 516.338 196.343 517.038 187.674C517.537 181.5 517.851 175.273 520.384 169.483C521.442 167.066 522.616 164.638 526.098 164.342C521.07 182.787 525.369 198.926 537.704 213.165C545.845 222.562 555.469 230.316 565.336 237.8C571.176 242.229 576.747 246.99 582.016 252.54C580.03 255.309 577.001 255.858 573.742 256.73C570.268 256.452 568.522 253.974 566.459 252.178C554.598 241.855 541.525 232.923 530.865 221.221C528.201 218.297 525.238 215.592 524.089 211.267Z" fill="#F8EC9C"></path><path d="M730.66 429.135C731.735 430.032 733.21 430.607 732.988 432.558C729.34 438.303 724.699 442.82 719.909 447.666C717.233 447.119 718.022 445.374 718.738 443.318C718.936 442.931 718.998 442.99 718.958 442.975C719.279 442.657 719.494 442.27 719.812 441.554C720.257 441.039 720.474 440.78 720.769 440.279C715.824 438.469 710.637 438.859 705.53 439.06C679.263 440.098 652.993 440.858 626.263 440.258C624.731 429.736 624.731 429.731 634.71 429.737C642.179 429.742 649.648 429.764 657.576 429.892C659.578 430.928 661.277 430.482 662.899 430.488C675.166 430.529 687.435 430.388 699.701 430.55C709.149 430.674 718.569 430.014 728.478 429.899C729.405 429.657 729.86 429.466 730.66 429.135Z" fill="#A5FBD0"></path><path d="M214.086 540.235C208.008 533.211 200.76 527.252 198.698 517.389C197.954 509.535 199.417 502.424 202.3 495.599C204.596 490.164 207.514 489.644 210.898 494.306C215.97 501.293 221.214 508.217 224.602 516.703C225.037 517.765 225.28 518.489 225.742 519.533C225.988 520.115 226.08 520.351 226.28 520.952C227.271 523.986 227.618 526.781 228.35 529.89C229.549 535.256 232.096 540.023 230.404 545.715C226.691 547.073 223.198 547.373 219.299 546.24C218.939 546.038 218.999 546.007 218.984 546.038C218.802 545.794 218.593 545.555 218.187 545.173C217.679 544.643 217.327 544.292 216.89 543.704C216.644 542.564 215.707 542.232 215.078 541.306C214.814 541.133 214.92 541.062 214.893 541.12C214.774 540.841 214.59 540.566 214.086 540.235Z" fill="#EC427F"></path><path d="M608.72 334.641C608.752 335.428 608.737 335.871 608.581 336.615C607.086 339.078 606.994 341.625 606.315 343.989C604.42 350.58 601.429 356.598 596.971 361.801C594.875 364.247 594.153 366.883 594.587 370.293C594.513 370.835 594.5 371.052 594.444 371.585C594.149 372.702 593.517 373.281 593.028 374.281C592.788 374.702 592.687 374.866 592.415 375.259C591.901 375.919 591.438 376.249 591.075 376.998C590.919 377.421 590.859 377.59 590.692 378.007C590.443 378.584 590.301 378.914 590.059 379.496C589.779 380.065 589.572 380.36 589.086 380.75C588.842 380.87 588.956 380.999 588.912 380.925C587.691 382.402 586.977 384.308 585.009 385.599C584.701 385.709 584.99 385.995 584.847 385.853C583.452 387.84 581.95 389.689 579.075 390.316C575.507 386.498 575.63 382.078 579.32 378.614C580.783 377.241 582.181 376.003 582.697 373.712C579.965 373.03 577.427 372.367 575.056 371.245C573.428 370.475 571.555 369.882 571.368 367.691C571.19 365.607 572.941 365.007 574.342 364.187C575.055 363.769 575.724 363.294 576.859 362.232C577.563 361.55 577.76 361.395 578.281 361.044C590.202 353.051 593.673 341.319 594.6 328.246C594.93 323.591 592.978 319.058 594.333 314.051C598.44 310.544 602.856 310.181 607.907 311.573C609.22 312.294 609.826 313.112 610.309 314.501C610.552 316.256 610.632 317.664 610.621 319.488C610.096 324.725 609.114 329.476 608.72 334.641Z" fill="#C42CCC"></path><path d="M285.571 815.708C285.938 816.979 285.907 818.339 285.838 820.094C265.675 827.122 245.825 834.693 224.86 838.477C217.655 839.777 210.439 840.876 203.148 838.983C192.425 836.199 181.113 827.748 182.072 810.495C183.056 806.282 182.298 802.449 182.269 798.286C182.537 784.515 181.605 771.085 182.814 757.276C186.748 755.023 187.52 757.019 187.509 760.374C187.451 778.273 187.525 796.171 187.363 814.557C187.318 815.476 187.372 815.908 187.553 816.641C187.631 817.15 187.583 817.357 187.771 817.778C192.808 830.756 204.1 835.808 220.376 833.649C240.024 831.043 258.315 823.838 277.062 818.142C279.755 817.324 282.469 816.578 285.571 815.708Z" fill="#416AD1"></path><path d="M762.848 822.682C763.323 822.809 763.684 822.814 763.844 822.897C764.15 823.121 764.296 823.261 764.723 823.287C765.511 823.273 766.017 823.374 766.86 823.672C767.343 823.784 767.49 823.697 767.764 823.834C767.889 824.057 767.946 824.012 767.959 824.045C768.267 824.324 768.576 824.55 769.184 824.754C778.312 827.042 787.113 829.499 796.004 831.574C803.772 833.388 811.612 834.956 819.679 833.269C830.468 831.013 838.289 822.132 838.415 811.112C838.588 795.971 838.274 780.825 838.353 765.682C838.375 761.447 836.846 757.985 834.244 754.902C834.673 754.486 834.857 754.174 835.121 754.071C843.013 751.011 843.199 751.17 843.24 759.573C843.322 776.38 842.786 793.226 843.754 809.983C844.748 827.206 828.23 842.452 808.8 839.56C792.62 837.151 777.091 832.379 761.296 827.208C760.312 826.269 759.363 826.593 758.292 826.178C758.04 825.969 758.014 826.005 758.018 825.984C756.39 820.892 759.918 822.408 762.848 822.682Z" fill="#416AD1"></path><path d="M825.32 516.994C824.269 524.157 819.847 528.889 815.396 533.948C814.469 534.561 814.148 535.335 813.352 535.986C813.255 536.259 812.993 536.036 813.125 536.144C812.854 536.269 812.523 536.428 812.326 537.037C812.377 537.323 812.174 537.172 812.256 537.268C811.909 537.259 811.561 537.382 811.347 538.037C811.401 538.34 811.221 538.219 811.289 538.303C810.907 538.275 810.537 538.39 810.378 539.073C810.495 539.374 810.429 539.438 810.413 539.481C806.194 544.332 799.141 542.429 794.145 546.147C792.364 544.219 792.951 542.229 793.342 540.309C794.334 535.446 795.422 530.602 796.4 525.346C796.566 524.732 796.621 524.487 796.779 523.884C797.113 522.846 797.402 522.188 797.771 521.193C798.447 519.425 799.18 518.051 799.738 516.245C799.901 515.71 799.973 515.496 800.166 514.963C800.551 514.003 800.844 513.373 801.211 512.381C804.911 504.409 810.744 498.379 815.808 491.812C817.492 489.628 819.364 490.417 820.592 492.531C822.27 495.418 823.387 498.56 824.474 502.131C825.858 507.146 826.507 511.812 825.32 516.994Z" fill="#EC427F"></path><path d="M334.742 712.177C335.764 712.006 336.498 712.004 337.598 711.997C339.822 713.655 339.539 715.923 339.547 718.034C339.604 734.141 339.569 750.247 339.588 766.354C339.591 769.181 338.882 771.904 338.378 775.267C345.767 774.029 352.801 773.204 360.304 771.752C355.943 764.823 356.126 757.446 356.762 749.604C357.869 745.366 357.906 741.519 356.94 737.25C356.011 730.746 356.485 724.615 356.447 718.502C356.426 715.281 355.171 714.029 351.972 713.264C347.605 712.221 343.006 714.29 338.544 711.643C338.398 710.254 338.986 708.999 338.671 708.042C336.744 702.189 340.655 702.866 344.561 702.982C346.044 704.139 347.081 705.402 348.778 703.223C350.159 702.982 351.313 703.045 352.459 702.969C356.3 702.712 359.951 702.564 359.138 708.263C358.972 709.424 360.048 709.871 361.53 709.972C363.334 711.138 364.74 712.279 366.951 714.075C360.075 716.137 361.356 721.5 361.337 726.333C361.297 736.823 361.767 747.337 361.178 757.794C360.728 765.771 364.047 770.379 371.133 772.993C372.196 773.385 373.188 773.969 374.717 774.708C358.471 778.22 342.389 779.694 326.349 783.756C325.822 783.556 325.729 783.251 325.813 782.5C333.097 776.989 335.746 770.308 335.24 761.451C334.558 749.52 335.056 737.519 335.122 725.548C335.137 722.931 334.873 720.613 332.329 719.129C329.208 717.308 328.643 715.539 332.551 713.92C333.278 713.619 333.824 712.882 334.742 712.177Z" fill="#E8EEF2"></path><path d="M583.22 724.882C583.675 726.912 583.854 728.739 584.23 731.251C584.428 731.937 584.336 732.219 584.278 732.248C585.754 737.288 584.863 742.429 584.944 747.506C585.017 752.137 585.259 756.695 586.706 761.58C586.582 762.33 586.48 762.619 586.059 763.238C578.4 765.711 571.267 763.59 564.116 762.401C562.118 762.068 560.846 760.455 561.577 758.292C563.395 752.908 562.055 747.38 562.605 741.521C563.215 739.421 562.71 737.833 562.017 735.911C561.778 735.581 561.68 735.359 561.627 735.379C564.122 733.668 564.223 731.083 564.155 728.357C564.068 724.891 564.15 721.422 564.227 717.494C568.777 715.515 572.004 716.666 575.744 721.172C577.625 723.437 579.153 726.36 583.22 724.882Z" fill="#798CB4"></path><path d="M627.372 467.294C627.022 464.375 627 461.722 627.004 459.069C627.012 452.991 627.496 452.262 633.704 452.063C644.111 451.73 654.451 453.058 664.821 453.683C671.903 454.109 678.914 454.618 685.923 455.851C689.063 456.403 692.119 456.57 694.907 458.95C690.704 462.79 685.612 465.172 680.384 467.961C671.701 470.871 663.651 467.628 655.517 466.725C651.829 466.315 648.497 466.17 644.825 467.421C639.285 469.309 633.432 469.301 627.372 467.294Z" fill="#4076AF"></path><path d="M339.627 601.473C352.282 608.964 361.706 619.046 367.089 632.73C368.757 636.971 367.149 637.631 363.461 637.247C361.77 637.071 360.176 636.816 358.755 635.848C345.261 626.653 330.474 619.695 316.268 611.117C315.83 608.194 317.946 607.443 319.707 606.74C323.87 605.079 328.05 603.301 332.694 603.558C335.125 603.693 337.287 602.983 339.627 601.473Z" fill="#4E48C6"></path><path d="M506.241 410.775C505.415 410.835 504.862 410.692 504.112 410.338C503.775 409.973 503.635 409.82 503.295 409.905C499.147 411.876 494.99 410.575 490.492 410.973C489.597 410.55 489.024 410.499 488.223 410.258C487.976 410.117 487.486 410.078 487.243 410.037C486.487 409.439 485.661 409.54 484.923 408.778C484.792 408.227 484.834 407.992 485.086 407.468C488.572 402.794 493.888 403.586 498.143 403.179C501.993 402.811 505.448 401.31 508.181 399.739C511.084 398.07 513.192 398.442 515.62 399.09C518.018 399.73 519.846 399.194 521.9 397.484C522.946 397.072 523.684 397.023 524.802 397.191C530.214 400.57 536.034 398.195 541.367 399.465C542.786 399.803 544.331 399.538 546.072 400.203C547.14 401.268 548.049 401.746 549.343 401.405C549.922 401.39 549.322 400.705 549.138 401.04C548.598 402.029 547.782 401.292 546.964 400.638C550.607 397.129 554.972 398.801 559.095 398.913C560.862 398.961 562.608 399.841 564.669 398.469C565.282 398.157 565.53 398.031 566.171 397.756C570.481 396.32 574.418 395.885 578.702 397.646C579.006 397.956 579.109 398.18 579.135 398.299C581.846 406.516 579.975 409.086 571.779 409.545C555.727 410.442 539.672 409.923 523.618 410.013C521.644 410.024 519.631 409.701 517.327 410.712C516.523 410.97 516.1 410.973 515.36 410.977C514.863 410.851 514.683 410.724 514.233 410.787C512.596 410.978 511.23 410.98 509.454 410.979C508.287 410.306 507.433 410.233 506.241 410.775Z" fill="#F7CDDE"></path><path d="M233.446 611.761C215.932 628.06 198.662 629.35 172.26 616.362C180.978 608.53 190.493 603.036 202.627 602.062C205.942 602.984 208.452 603.957 209.591 607.389C210.548 610.272 213.394 611.412 216.427 611.482C220.235 611.569 224.051 611.746 227.848 611.22C229.642 610.972 231.45 610.46 233.446 611.761Z" fill="#A331A4"></path><path d="M518.512 784.31C526.257 791.929 524.767 800.873 514.971 806.699C517.871 810.525 520.76 814.336 523.717 818.235C515.172 819.902 514.837 819.891 510.368 812.993C508.1 809.491 506.047 806.533 501.042 807.229C498.504 807.582 497.449 808.126 497.718 810.712C497.872 812.195 497.628 813.72 497.773 815.205C498.025 817.801 497.499 819.238 494.349 819.012C491.818 818.831 489.959 819.072 490.052 815.44C490.308 805.448 490.141 795.446 490.174 785.449C490.179 784.031 489.76 782.028 492.084 782.183C500.792 782.764 509.743 780.112 518.512 784.31Z" fill="#F4F5F7"></path><path d="M398.441 355.63C398.763 356.403 398.856 356.892 398.93 357.384C400.503 367.92 397.502 374.809 386.758 379.82C366.564 389.239 374.968 389.389 355.242 379.29C345.99 374.553 342.097 368.909 343.935 358.935C344.291 357.002 343.985 354.948 344.099 352.496C346.635 352.574 346.528 355.821 349.161 356.65C350.013 357.744 350.418 358.756 350.269 359.717C349.326 365.813 352.59 368.957 357.535 371.793C372.511 380.379 368.515 381.226 385.118 371.981C389.287 369.66 393.431 367.391 392.578 361.486C392.336 359.809 392.389 358.03 390.165 357.704C388.211 357.416 387.009 358.34 386.398 360.18C386.189 360.807 386.512 360.045 386.244 360.655C382.746 368.591 376.519 373.013 369.992 372.195C362.847 371.301 357.084 364.783 355.978 355.91C356.75 353.101 358.382 352.845 360.794 353.869C362.561 355.259 363.533 356.778 364.321 358.45C366.552 363.186 368.891 364.412 374.012 363.862C375.976 363.652 376.934 362.569 377.545 360.882C378.562 358.071 379.462 355.229 380.147 351.933C380.726 350.897 381.338 350.46 382.506 350.205C386.11 351.037 389.35 351.751 393.081 351.804C395.439 352.482 396.821 353.915 398.441 355.63Z" fill="#A546D7"></path><path d="M563.872 634.431C563.22 633.812 563.042 633.331 562.854 632.591C562.66 631.722 562.522 631.1 562.141 630.268C561.903 630.056 561.996 630.005 561.956 630.04C561.597 629.576 561.52 628.997 561.179 628.228C560.984 628.015 560.805 627.77 560.819 627.619C560.824 627.058 560.673 626.706 560.172 626.211C544.36 603.928 523.84 595.056 499.868 601.023C482.073 605.453 468.711 615.751 462.342 633.613C461.488 636.008 460.276 637.17 458.056 636.331C455.651 635.421 457.198 633.506 457.683 632.111C464.939 611.263 486.06 595.558 509.702 594.689C533.303 593.822 552.124 602.861 564.038 624.512C564.634 626.054 565.496 627.116 565.83 628.726C566.503 630.026 566.942 631.094 567.476 632.503C566.914 634.199 565.824 634.747 563.872 634.431Z" fill="#416AD1"></path><path d="M563.767 792.686C563.276 792.624 563.156 792.506 563.018 792.413C558.407 789.325 553.513 788.084 548.576 791.317C544.401 794.051 544.092 798.485 544.784 802.939C545.682 808.722 548.936 812.532 554.668 814.21C556.973 814.885 559.274 814.804 561.599 814.824C564.233 814.846 565.495 813.791 565.401 810.914C565.314 808.229 564.538 806.766 561.623 807.082C559.202 807.345 557.876 806.551 557.996 803.772C558.13 800.638 560.367 801.564 561.967 801.534C572.039 801.344 572.04 801.375 572.064 811.222C572.088 821.026 572.089 821.039 562.395 821.209C557.873 821.288 553.443 820.892 549.223 818.999C538.834 814.337 534.192 804.807 537.399 794.532C540.123 785.803 549.437 781.144 560.229 783.288C563.628 783.963 567.061 784.798 570.181 787.565C568.087 789.322 566.108 790.982 563.767 792.686Z" fill="#F4F5F7"></path><path d="M473.296 809.089C468.296 819.32 459.271 824.075 449.141 822.013C444.045 820.975 440.459 817.959 438.45 813.202C435.296 805.736 437.517 795.939 443.538 790.225C449.216 784.835 459.919 783.129 466.878 786.504C472.513 789.237 475.612 795.565 474.761 802.914C474.533 804.878 473.906 806.796 473.296 809.089Z" fill="#F4F5F7"></path><path d="M366.269 554.96C359.584 567.661 346.557 566.291 335.759 569.638C335.615 569.683 335.433 569.604 335.268 569.582C326.589 568.419 311.98 552.006 312.015 543.214C312.057 532.794 312.585 522.405 315.758 512.502C317.385 514.5 318.35 516.451 318.414 519.154C318.483 527.476 318.396 535.405 318.464 543.333C318.478 544.943 317.976 547.031 319.58 547.91C321.46 548.941 322.923 547.14 324.383 546.144C325.609 545.307 326.756 544.357 327.908 543.416C330.181 541.557 330.867 539.607 328.74 537.107C327.049 535.121 326.232 532.833 327.668 529.92C328.881 528.963 329.952 528.86 331.479 529.074C339.931 533.373 345.019 539.293 343.431 549.485C343.498 551.202 343.464 552.512 343.164 554.176C342.49 556.163 341.385 557.008 339.637 556.559C338.004 556.139 337.349 554.828 336.925 553.306C336.398 551.415 337.153 549.364 336.246 547.519C334.89 547.63 333.994 548.493 333.276 549.293C331.29 551.503 326.344 551.991 328.316 556.607C330.739 562.281 335.048 564.355 340.589 562.947C345.734 561.639 350.751 559.923 355.713 558.041C357.643 557.309 359.057 555.934 360.585 554.173C361.182 553.174 362.949 555.418 362.802 552.88C363.213 552.52 363.419 552.42 363.977 552.271C365.748 552.384 366.652 552.996 366.269 554.96Z" fill="#61B7E6"></path><path d="M479.974 849.207C490.118 841.807 500.498 834.721 510.823 827.556C512.587 826.331 513.878 827.023 515.313 828.004C528.528 837.037 541.752 846.056 555.086 855.39C554.015 858.512 550.593 857.831 548.558 859.977C545.681 861.388 543.794 859.755 541.918 858.486C534.104 853.202 526.188 848.067 518.607 842.437C513.048 838.308 512.989 838.424 507.276 842.046C502.659 844.974 498.517 848.58 493.823 851.392C492.137 852.402 490.616 853.81 488.088 853.537C485.369 851.848 482.788 850.654 479.974 849.207Z" fill="#6DEFC4"></path><path d="M627.027 467.415C631.177 467.021 635.321 467.018 639.465 467.002C640.458 466.999 641.671 467.315 642.412 466.868C651.438 461.436 660.332 466.55 669.15 467.51C672.577 467.883 676.024 466.004 679.656 467.962C664.534 477.108 647.825 482.626 630.039 485.041C626.529 485.517 624.59 484.818 625.108 480.739C625.399 478.448 625.244 476.1 625.437 473.322C628.123 471.763 626.565 469.497 627.027 467.415Z" fill="#3765A8"></path><path d="M613.206 827.505C605.747 826.276 598.705 825.071 591.63 824.12C589.515 823.836 588.847 823.068 588.861 820.999C588.933 810.516 588.952 800.031 588.84 789.549C588.815 787.155 589.828 786.781 591.828 787.04C600.229 788.127 608.634 789.185 617.044 790.201C619.92 790.548 619.066 792.683 619.205 794.376C619.411 796.875 617.834 796.435 616.286 796.217C610.693 795.429 605.102 794.621 599.492 793.977C598.189 793.828 595.539 792.493 596.114 795.56C596.599 798.145 593.573 802.101 598.495 803.208C601.566 803.9 604.692 804.495 607.823 804.727C611.587 805.005 610.212 807.687 610.178 809.488C610.128 812.127 608.034 810.792 606.801 810.725C604.988 810.627 603.159 809.881 601.396 810.044C599.617 810.208 596.827 806.721 596.075 811.03C594.993 817.231 595.805 818.36 600.545 819.039C605.807 819.792 611.027 820.935 616.31 821.415C619.737 821.727 620.241 823.369 620.023 826.235C619.723 830.19 617.035 827.348 615.559 827.894C615.016 828.095 614.266 827.732 613.206 827.505Z" fill="#F4F5F7"></path><path d="M702.061 613.741C690.764 620.784 679.212 627.242 668.096 634.445C665.032 636.43 660.247 638.349 657.991 636.323C655.705 634.27 658.715 629.947 660.238 627.002C665.103 617.595 671.662 609.582 681.06 603.848C688.924 605.542 696.823 606.446 702.061 613.741Z" fill="#4E48C6"></path><path d="M225.562 521.277C225.171 520.932 225.043 520.475 225.002 520.24C224.543 519.571 224.532 518.972 224.11 518.271C219.984 509.448 214.472 501.811 209.03 494.114C206.95 491.173 205.585 491.438 204.218 494.504C201.143 501.402 199.548 508.676 198.719 516.569C196.046 504.584 199.493 493.287 205.242 482.146C207.741 479.706 208.775 476.681 210.54 474.135C212.052 471.954 213.862 471.472 214.821 474.395C216.797 480.414 220.191 485.751 222.974 491.727C223.299 491.925 223.123 491.911 223.149 491.826C223.346 492.373 223.472 493.018 224.058 493.732C224.364 493.847 224.175 493.867 224.194 493.774C224.068 494.056 224.171 494.341 224.678 494.73C228.817 501.484 232.186 508.31 232.99 516.06C233.16 517.698 234.605 518.554 234.689 520.51C231.963 523.289 229.002 523.02 225.562 521.277Z" fill="#FBC965"></path><path d="M294.744 562.966C299.513 572.48 298.623 582.228 296.081 592.031C295.414 594.6 294.206 595.137 291.844 593.543C277.749 584.028 268.617 571.867 270.393 553.393C270.79 553.014 271.021 553.07 271.474 553.404C272.689 556.286 271.748 560.652 276.942 559.429C279.058 558.931 279.301 556.832 280.636 555.204C281.111 554.872 281.329 554.782 281.9 554.735C284.476 556.111 285.627 558.4 287.114 560.366C289.014 562.878 291.215 564.201 294.744 562.966Z" fill="#A331A4"></path><path d="M587.058 896.729C584.121 897.59 583.005 894.776 580.513 894.089C582.381 884.86 584.375 875.601 589.506 867.104C595.501 865.04 600.829 862.082 606.728 860.737C608.483 860.337 610.31 860.442 612.431 861.23C615.136 864 612.868 866.57 612.824 869.549C612.767 870.472 612.672 870.992 612.261 872.148C611.944 872.784 611.97 872.904 611.914 872.929C611.184 873.745 610.755 874.672 610.262 875.912C610.155 876.2 610.05 876.651 609.927 876.848C609.685 877.214 609.564 877.384 609.243 877.791C609.042 878.03 609.002 878.002 609.018 878.021C608.758 878.242 608.516 878.478 608.213 878.988C608.066 879.508 607.936 879.748 607.542 880.046C606.706 880.329 606.507 880.855 606.176 881.641C605.292 883.237 604.114 884.131 602.566 885.055C601.912 885.234 601.609 885.405 601.22 885.884C601.093 886.117 601.01 886.01 601.062 886.054C600.797 886.202 600.543 886.391 600.183 886.837C595.761 890.155 591.508 893.3 587.058 896.729Z" fill="#4E48C6"></path><path d="M809.789 410.703C809.874 423.253 811.586 435.599 808.073 447.666C806.31 453.721 803.361 459.15 799.045 465.208C799.045 440.686 799.045 417.329 799.128 393.513C800.288 392.893 801.026 393.76 801.967 393.974C809.487 395.683 809.482 395.673 809.494 403.477C809.498 405.784 809.416 408.093 809.789 410.703Z" fill="#4076AF"></path><path d="M801.288 514.813C801.177 515.078 801.096 515.553 801.031 515.784C796.345 517.493 794.324 516.177 792.73 510.189C794.134 504.236 796.576 499.127 799.153 494.123C803.563 485.561 808.116 477.084 810.329 466.708C815.89 476.652 822.49 485.102 824.934 496.239C825.089 497.144 825.229 497.521 825.327 498.198C825.268 499.942 826.38 501.782 823.488 502.174C821.724 498.454 820.539 494.861 818.065 491.143C812.827 498.47 806.43 504.56 802.429 512.889C801.557 513.403 801.507 513.992 801.288 514.813Z" fill="#FBC965"></path><path d="M521.596 397.731C521.099 401.063 518.772 401.476 516.468 400.604C511.281 398.642 507.223 400.267 503.568 403.892C501.145 406.295 497.728 404.699 495.192 404.904C491.514 405.2 488.797 406.664 485.366 407.955C485.551 408.514 486.111 409.02 486.835 409.761C485.923 410.275 484.846 410.555 483.436 410.873C482.59 410.551 482.026 410.47 481.167 410.76C479.571 410.91 478.229 410.908 476.484 410.913C470.708 409.424 465.222 409.842 459.379 409.932C458.553 409.905 458.103 409.902 457.315 409.888C456.541 409.518 455.992 409.5 455.262 409.222C454.593 409.012 454.136 408.967 453.335 408.894C450.464 407.565 447.702 407.263 444.945 406.802C442.707 406.427 440.926 404.948 440.599 402.622C440.237 400.044 442.276 399.371 444.719 398.895C447.146 398.59 449.18 398.349 451.599 398.121C453.678 398.056 455.372 397.978 457.831 397.805C463.309 397.316 468.397 398.612 472.712 394.67C479.506 397.323 486.233 396.428 493.323 396.387C501.017 396.212 508.266 396.268 515.514 396.297C517.487 396.305 519.485 396.296 521.596 397.731Z" fill="#F3ACE1"></path><path d="M342.344 432.525C320.411 428.345 299.321 422.231 278.587 415.803C292.289 415.803 306.148 415.695 320.005 415.828C341.124 416.031 362.241 416.402 383.359 416.697C385.292 416.724 387.66 416.124 387.052 419.767C385.769 421.157 384.326 421.464 382.798 421.343C370.595 420.375 358.346 420.25 346.144 419.151C338.269 418.442 330.329 417.903 322.043 419.332C316.618 421.578 312.241 417.2 308.356 418.351C320.183 420.325 333.152 421.968 346.001 424.338C348.009 424.708 351.054 424.196 351.224 426.978C351.402 429.911 348.347 430.633 346.11 431.655C345.029 432.149 343.824 432.003 342.344 432.525Z" fill="#A5FBD0"></path><path d="M425.611 148.671C419.452 150.096 417.009 153.929 416.342 159.644C416.002 162.56 415.868 166.919 411.79 166.808C408.129 166.708 408.001 162.624 407.683 159.75C407.061 154.133 404.965 150.034 398.838 148.97C397.592 148.753 396.46 147.837 395.292 147.211C392.661 145.799 391.902 144.032 395.346 143.082C403.534 140.826 408.447 136.237 408.549 127.234C408.569 125.422 409.644 123.087 412.104 123.052C414.669 123.016 415.459 125.438 415.572 127.261C416.155 136.679 421.606 141.531 430.207 143.714C430.766 143.855 431.246 144.309 432.517 145.069C429.928 146.411 427.932 147.446 425.611 148.671Z" fill="#6DEFC4"></path><path d="M225.087 401.849C226.343 413.464 225.688 424.955 225.827 436.435C225.941 445.908 225.85 455.383 225.85 464.83C223.953 465.275 223.691 463.816 223.17 462.929C218.022 454.172 214.757 444.885 214.834 434.547C214.913 423.901 214.726 413.253 214.822 402.309C217.215 401.813 216.912 403.836 217.543 404.988C218.332 406.429 219.492 407.392 221.076 407.35C223.045 407.298 222.459 405.435 222.82 404.289C223.171 403.174 223.355 401.983 225.087 401.849Z" fill="#3765A8"></path><path d="M413.018 589.862C411.283 592.237 409.404 594.26 406.971 596.878C421.534 596.878 435.384 596.878 450.064 596.878C449.03 598.609 448.397 599.669 447.459 600.877C443.591 604.609 438.823 604.718 434.285 605.434C423.519 607.13 412.696 608.411 401.505 609.817C399.97 609.998 398.762 609.711 397.357 610.479C396.831 610.751 396.613 610.854 396.052 611.086C392.882 611.623 389.514 613.548 388.796 608.355C395.683 601.013 402.349 593.983 409.289 586.768C411.272 586.872 411.655 588.664 413.018 589.862Z" fill="#86EFD8"></path><path d="M762.766 578.934C770.564 567.346 778.142 555.934 783.395 542.789C786.768 543.879 789.399 546.19 792.951 547.552C793.593 554.833 789.474 560.275 786.586 566.127C785.942 567.43 785.014 568.639 784.099 570.227C783.79 570.451 783.614 570.776 783.288 571.063C779.759 574.76 776.557 578.168 773.062 581.743C772.504 582.494 771.86 582.466 771.333 583.017C771.255 583.284 771.022 583.227 771.138 583.265C769.206 584.498 766.943 584.861 764.626 584.92C762.585 584.972 761.108 584.202 760.954 581.509C761.108 580.746 761.256 580.457 761.702 580.081C762.22 579.747 762.488 579.5 762.766 578.934Z" fill="#D14EB2"></path><path d="M420.463 807.726C418.36 811.68 414.585 810.406 411.61 810.868C407.624 811.486 405.123 812.386 405.944 817.163C406.361 819.589 405.768 822.178 406.087 824.633C406.574 828.377 404.732 828.956 401.549 829.155C397.482 829.408 398.882 826.619 398.863 824.864C398.753 814.712 398.856 804.557 398.743 794.404C398.716 792.036 399.147 790.949 401.867 790.687C408.811 790.02 415.707 788.864 422.637 788.029C424.057 787.858 426.153 787.029 426.037 790.018C425.956 792.084 426.275 793.858 423.198 794.079C418.568 794.411 413.984 795.344 409.367 795.903C403.279 796.64 406.564 801.247 406.299 804.002C405.974 807.362 408.727 805.332 410.171 805.216C412.486 805.03 414.813 804.754 417.08 804.264C419.804 803.674 420.799 804.691 420.463 807.726Z" fill="#F8F9FB"></path><path d="M393.13 632.818C386.976 632.775 385.297 630.358 386.852 624.825C387.352 623.042 388.508 623.005 389.863 623.005C404.482 623.002 419.102 623.053 433.721 622.964C436.691 622.945 437.047 624.495 436.635 626.755C436.19 629.193 437.842 632.833 432.984 632.767C425.177 632.66 417.368 632.757 409.56 632.772C404.244 632.783 398.928 632.801 393.13 632.818Z" fill="#3765A8"></path><path d="M748.194 575.85C744.892 584.125 738.401 589.266 731.739 594.286C729.505 595.969 728.955 594.51 728.381 592.828C725.171 583.414 724.987 573.959 728.266 564.197C733.598 565.342 736.16 561.919 738.85 558.594C739.837 557.373 740.876 555.477 742.716 556.109C744.513 556.725 744.282 558.81 744.38 560.426C744.499 562.398 744.572 564.391 744.397 566.35C744.065 570.061 745.065 573.156 748.194 575.85Z" fill="#A331A4"></path><path d="M722.871 772.204C724.161 771.975 725.128 771.985 726.458 771.989C725.979 778.769 729.393 783.785 733.87 788.716C734.367 789.382 734.498 789.819 734.216 790.591C718.8 787.786 703.799 783.762 688.426 781.542C688.508 781.067 688.489 780.539 688.624 780.496C697.241 777.761 700.42 771.893 699.551 763.009C698.987 757.251 699.247 751.386 699.512 745.586C699.66 742.369 698.683 740.803 695.466 740.154C690.76 739.205 686.133 737.86 681.213 736.431C680.963 735.144 680.972 734.108 680.968 732.685C681.888 730.899 683.309 731.151 684.566 731.428C689.603 732.542 694.667 733.544 699.65 734.901C702.78 735.754 704.43 737.734 704.465 741.02C704.568 750.676 704.664 760.332 704.41 769.986C704.333 772.9 703.135 775.461 700.989 778.107C708.816 780.209 716.485 781.318 724.3 783.167C723.011 779.591 720.376 776.347 722.871 772.204Z" fill="#E3E8EF"></path><path d="M192.251 548.589C190.746 549.157 188.926 548.828 188.511 550.735C188.183 552.243 189.631 553.045 190.56 553.9C194.316 557.356 198.219 560.623 202.562 563.357C205.463 565.183 208.314 567.106 202.967 569.783C201.512 570.512 200.515 572.423 199.642 573.979C198.622 575.796 197.335 576.114 195.311 575.584C186.302 569.307 178.925 561.701 174.309 551.349C174.506 550.57 174.716 550.1 175.078 549.773C180.037 545.296 180.041 545.3 176.543 539.236C176.91 535.057 179.203 536.943 180.728 537.735C184.142 539.508 186.823 542.339 190.182 544.85C190.637 545.265 190.813 545.439 191.44 546.206C192.13 547.247 192.278 547.721 192.251 548.589Z" fill="#EC427F"></path><path d="M431.762 272.176C432.093 260.047 428.215 250.184 417.796 243.401C432.3 243.857 443.628 249.547 451.084 262.488C450.367 264.806 449.74 267.311 447.341 267.401C443.893 267.531 443.492 264.03 441.922 261.601C441.394 260.831 442.258 261.258 441.659 261.02C441.486 260.951 441.936 261.369 441.975 261.944C442.923 268.127 442.872 273.956 441.28 280.123C439.94 285.255 438.572 289.957 436.528 294.426C435.648 296.348 434.851 298.373 432.199 298.968C430.268 296.77 431.167 294.676 431.744 292.628C432.602 289.588 433.362 286.533 433.776 283.022C434.82 279.614 434.814 276.461 434.545 273.354C434.289 270.4 433.202 273.694 432.197 273.169C431.751 272.907 431.658 272.689 431.762 272.176Z" fill="#86EFD8"></path><path d="M590.541 623.532C605.562 623.179 620.217 623.205 634.869 622.974C638.458 622.918 638.577 624.697 638.268 627.329C637.992 629.672 639.665 632.765 634.884 632.682C621.063 632.441 607.235 632.493 593.411 632.593C590.479 632.615 589.521 631.486 589.813 628.771C589.99 627.125 590.058 625.468 590.541 623.532Z" fill="#416AD1"></path><path d="M431.582 299.476C436.344 293.934 437.543 287.549 439.738 281.212C442.413 274.106 448.643 273.191 454.842 271.631C455.222 271.624 455.604 271.8 455.786 271.907C456.581 272.628 456.474 273.411 456.434 274.551C456.433 278.103 456.471 281.273 456.589 284.829C456.222 288.973 456.834 292.921 454.347 296.626C450.355 297.633 446.55 298.015 443.252 300.82C442.053 300.786 441.362 301.004 441.002 302.159C438.881 306.359 435.088 304.518 431.545 305.048C430.096 303.862 430.785 302.534 430.877 300.931C431.006 300.391 431.076 300.18 431.582 299.476Z" fill="#61B7E6"></path><path d="M829.265 575.353C826.526 576.285 824.42 575.931 823.32 572.842C822.945 571.788 822.236 570.687 821.369 570.001C817.601 567.021 820.028 564.944 822.297 562.861C826.946 558.591 831.664 554.395 836.29 550.101C837.653 548.837 838.834 547.338 835.183 546.237C834.871 545.312 834.976 545.101 835.289 544.606C838.376 542.021 840.975 539.349 844.674 537.606C845.257 537.565 845.492 537.596 846.018 537.834C846.535 538.465 846.655 538.917 846.606 539.745C843.573 544.799 843.573 544.799 849.577 550.624C848.092 555.916 845.012 559.958 841.396 564.028C840.775 564.27 840.509 564.437 840.302 564.952C840.295 565.192 840.252 565.243 840.228 565.267C839.836 565.286 839.534 565.421 839.328 565.981C839.348 566.244 839.295 566.286 839.274 566.313C838.862 566.281 838.545 566.408 838.334 567C838.363 567.276 838.306 567.3 838.291 567.327C837.881 567.269 837.561 567.387 837.333 567.99C837.349 568.271 837.296 568.29 837.285 568.316C836.881 568.273 836.558 568.386 836.332 568.991C836.349 569.272 836.295 569.289 836.285 569.315C835.883 569.272 835.56 569.384 835.326 569.988C835.335 570.269 835.272 570.269 835.269 570.3C834.895 570.256 834.588 570.356 834.303 570.92C834.251 571.181 834.205 571.201 834.193 571.223C833.804 571.198 833.531 571.346 833.299 571.926C832.658 572.734 832.082 573.303 831.22 573.98C830.495 574.48 829.879 574.466 829.352 575.038C829.305 575.316 829.281 575.344 829.265 575.353Z" fill="#EC427F"></path><path d="M839.242 481.671C835.858 470.738 837.836 461.403 845.454 453.259C855.536 465.041 854.557 481.008 845.16 497.076C843.127 491.811 841.244 486.933 839.242 481.671Z" fill="#6DEFC4"></path><path d="M175.396 458.418C176.403 456.659 177.214 455.227 178.042 453.767C189.403 462.688 189.832 477.059 179.041 497.536C172.786 484.622 168.667 472.289 175.396 458.418Z" fill="#6DEFC4"></path><path d="M255.571 339.261C255.258 333.284 255.172 327.563 255.159 321.373C255.745 319.557 255.43 318.159 255.448 316.439C258.086 311.748 263.102 310.539 266.813 307.587C275.992 300.284 285.759 298.113 296.632 303.704C298.217 304.519 300.116 304.722 302.243 305.211C303.094 305.329 303.591 305.266 304.06 305.327C306.285 305.62 309.693 304.147 310.244 307.278C310.724 310.005 307.96 311.69 305.476 312.79C304.876 313.056 304.21 313.082 303.157 313.1C297.668 312.161 292.913 310.106 287.997 308.608C283.316 307.182 279.269 307.627 275.258 310.412C272.126 312.588 268.743 314.398 265.494 316.41C262.674 318.156 261.456 320.491 261.431 323.828C261.389 329.463 261.936 335.121 260.898 341.09C260.606 341.64 260.458 341.839 259.974 342.183C257.94 341.962 257.213 340.271 255.571 339.261Z" fill="#86EFD8"></path><path d="M324.742 320.622C324.981 327.334 325.019 333.679 324.978 340.484C323.707 341.222 323.219 340.149 322.409 339.674C319.218 337.805 317.075 338.853 316.546 342.52C316.129 345.416 317.077 348.481 315.207 351.473C308.295 353.381 303.081 357.857 297.117 360.869C294.631 362.124 292.233 363.556 289.454 364.988C288.504 365.489 287.812 365.663 286.73 365.669C286.16 365.476 285.948 365.352 285.506 364.942C285.162 364.433 285.05 364.213 284.819 363.64C284.516 362.557 284.46 361.819 284.75 360.735C290.216 355.867 296.715 353.301 302.661 349.834C306.357 347.679 308.859 345.108 309.543 340.46C311.742 336.765 312.631 333.149 312.488 329.236C312.397 326.755 312.588 324.277 313.275 321.865C313.937 319.544 314.882 317.238 317.605 317.058C320.34 316.878 323.377 316.725 324.742 320.622Z" fill="#61B7E6"></path><path d="M702.535 614.056C696.668 608.466 688.586 607.934 681.775 603.97C687.701 598.174 695.719 597.324 703.573 596.082C707.674 595.433 711.854 595.234 715.925 594.449C719.194 593.819 719.249 594.805 718.374 597.498C715.781 605.479 710.542 610.846 702.535 614.056Z" fill="#7048D5"></path><path d="M472.967 419.68C453.33 420.111 433.595 420.167 413.86 420.202C407.886 420.212 401.912 420.164 395.478 420.052C395.018 417.928 395.017 415.896 395.082 413.434C409.009 413.169 422.876 412.728 436.727 413.915C440.574 414.245 444.142 415.505 447.903 416.066C455.379 417.182 463.004 416.349 470.427 417.985C471.411 418.202 472.422 418.168 472.967 419.68Z" fill="#A5FBD0"></path><path d="M225.503 401.535C223.757 402.63 224.205 404.088 223.99 405.343C223.721 406.914 224.844 410.074 222.349 409.509C220.209 409.025 216.436 409.296 215.993 405.436C215.882 404.47 215.688 403.513 215.261 402.281C214.956 397.307 214.922 392.603 214.971 387.437C217.052 381.668 215.398 376.142 216.057 370.766C216.289 368.879 214.564 365.648 217.728 365.419C220.593 365.211 222.865 367.489 223.882 370.417C224.356 371.782 223.446 373.454 225.067 374.791C226.169 383.632 225.54 392.358 225.503 401.535Z" fill="#4483B7"></path><path d="M474.963 266.342C478.123 268.094 482.753 266.361 484.998 270.644C486.062 271.873 486.273 273.075 485.982 274.192C483.779 282.67 481.001 290.923 475.684 298.436C470.44 298.982 465.589 297.553 460.318 298.251C459.621 297.693 459.509 297.194 459.86 296.348C466.486 286.989 471.214 277.114 474.963 266.342Z" fill="#A546D7"></path><path d="M321.259 419.246C321.672 415.839 324.161 417.086 325.889 417.064C346.008 416.81 366.024 418.803 386.511 420.026C387.003 422.763 387.062 425.464 387.027 428.609C386.509 429.418 386.048 429.728 385.15 430.115C383.916 430.426 383.07 430.464 381.797 430.459C373.368 429.262 365.444 427.63 357.496 426.155C346.302 424.077 334.98 422.777 323.829 420.461C323.006 420.29 322.233 420.05 321.259 419.246Z" fill="#F8F9FB"></path><path d="M572.885 256.295C575.818 254.982 578.599 253.982 581.761 252.917C582.143 252.85 582.067 252.894 582.05 252.854C582.191 253.161 582.412 253.46 582.964 253.822C583.22 253.941 583.046 253.961 583.044 253.873C583.197 254.146 583.425 254.45 583.997 254.821C593.015 262.816 599.189 272.562 604.515 282.906C605.159 284.156 605.348 285.64 605.971 287.297C605.882 292.565 605.041 293.142 599.956 291.465C599.459 291.142 599.272 291.002 598.841 290.617C598.463 290.195 598.327 290.016 598.014 289.561C597.727 289.099 597.618 288.914 597.348 288.454C596.852 287.65 596.498 287.132 595.837 286.449C594.299 284.766 593.271 283.102 591.979 281.241C591.584 280.634 591.379 280.28 591.037 279.665C590.786 279.246 590.685 279.081 590.42 278.678C590.137 278.286 590.018 278.134 589.504 277.538C588.975 276.943 588.841 276.791 588.508 276.399C588.182 275.989 588.055 275.819 587.747 275.382C585.839 272.231 583.501 269.81 581.297 266.86C578.58 263.032 574.243 261.001 572.885 256.295Z" fill="#FBC965"></path><path d="M810.093 410.542C807.881 407.512 809.327 403.681 809.046 400.017C808.701 395.534 807.369 394.233 803.267 396.004C800.084 397.379 800.107 395.46 799.433 393.306C799.168 392.585 799.125 392.114 799.145 391.294C799.852 386.91 799.387 382.852 799.324 378.426C799.122 364.355 799.061 350.664 799.077 336.516C800.961 342.214 799.716 348.51 799.945 354.735C800.188 361.329 800.008 361.378 806.67 361.244C808.137 361.214 808.82 361.688 808.958 363.118C809.1 364.582 809.316 366.039 809.793 367.766C810.112 382.047 810.139 396.062 810.093 410.542Z" fill="#4483B7"></path><path d="M696.702 191.352C699.92 190.524 701.409 191.386 701.155 194.699C700.914 197.848 701.237 201.046 700.913 204.181C700.577 207.439 701.933 208.253 704.879 207.99C707.192 207.783 709.575 208.215 711.863 207.9C716.143 207.31 717.128 209.349 716.376 213.467C714.903 217.067 712.006 217.137 709.219 217.44C705.817 217.811 702.339 216.919 698.8 218.375C698.463 219.155 698.312 219.618 698.033 220.42C697.699 221.196 697.479 221.624 697.075 222.364C696.441 223.533 695.984 224.389 695.048 225.346C690.278 226.619 690.227 222.899 688.912 220.036C688.522 219.302 688.388 218.854 688.363 218.046C688.545 217.287 688.812 216.967 688.97 216.599C688.574 216.24 688.44 216.069 688.143 215.612C687.719 212.803 683.361 210.83 687.256 207.608C687.744 207.328 687.946 207.229 688.463 207.007C689.414 206.655 690.071 206.493 691.03 206.152C692.241 205.691 693.613 205.802 693.828 204.739C694.14 203.196 692.618 203.041 691.597 202.708C689.87 202.145 688.001 202.44 685.922 201.819C684.957 201.292 684.566 200.737 684.531 199.641C689.246 197.801 693.971 196.407 696.702 191.352Z" fill="#F89A60"></path><path d="M344.534 348.148C343.684 342.224 343.155 336.468 346.685 330.515C348.954 336.879 352.538 335.32 356.453 332.827C360.093 330.51 363.922 328.492 367.604 326.239C370.122 324.699 372.425 324.693 375.035 326.186C381.813 330.063 388.683 333.78 395.556 337.489C397.545 338.563 399.422 339.561 398.724 342.686C397.516 344.447 396.1 345.259 393.965 345.249C388.202 340.704 382.258 337.106 375.98 334.025C372.597 332.365 369.554 332.289 366.241 334.616C362.591 337.18 358.371 338.865 354.475 341.083C351.968 342.511 350.28 344.229 349.717 347.419C348.13 349.098 346.457 348.442 344.534 348.148Z" fill="#F17187"></path><path d="M364.949 864.05C366.403 857.242 367.227 856.724 373.537 858.558C374.307 858.781 374.689 858.207 374.979 857.218C375.922 857.379 376.808 857.878 377.865 858.637C378.229 859.172 378.444 859.431 378.91 859.774C379.141 859.875 379.033 859.896 379.07 859.855C379.398 860.472 380.038 860.493 380.877 860.782C381.993 861.419 382.842 861.913 383.865 862.644C384.229 863.164 384.441 863.429 384.908 863.78C385.14 863.886 385.036 863.91 385.069 863.868C385.393 864.454 386.009 864.494 386.811 864.804C391.724 867.05 395.096 870.827 399.052 874.311C398.336 878.058 396.441 880.717 392.849 882.291C386.553 879.498 381.916 874.862 376.16 871.369C375.755 870.783 375.497 870.512 374.921 870.214C374.646 870.147 374.302 870.105 374.152 870.019C373.828 869.779 373.655 869.626 373.215 869.251C372.949 869.028 372.996 868.998 372.987 869.024C372.756 868.751 372.493 868.494 371.918 868.216C370.553 867.605 369.459 867.059 368.178 866.269C367.325 865.204 366.389 864.795 365.203 864.211C364.944 864.05 364.956 864.033 364.949 864.05Z" fill="#2A50A0"></path><path d="M707.436 333.081C707.837 333.418 707.94 333.742 707.953 334.07C708.108 337.858 706.967 342.504 708.763 345.19C710.494 347.779 715.781 345.681 719.004 346.939C725.369 349.424 720.769 355.27 721.943 359.457C722.712 362.202 720.934 363.356 718.218 363.055C717.726 363.001 717.223 363.048 716.725 363.052C707.417 363.117 707.33 363.12 707.049 353.935C706.968 351.284 706.304 349.607 703.404 350.125C697.758 351.131 695.984 348.645 696.769 343.354C697.034 341.568 696.818 339.71 696.911 337.424C701.131 337.652 704.981 337.611 707.436 333.081Z" fill="#A546D7"></path><path d="M388.678 608.226C390.102 613.523 393.845 609.169 396.585 609.983C399.942 610.847 402.993 610.552 405.91 610.106C416.35 608.51 426.907 610.143 437.341 608.749C438.51 608.593 439.666 608.842 441.002 609.827C439.934 615.966 436.743 618.134 430.403 617.812C418.271 617.194 406.081 617.687 393.915 617.736C385.908 617.768 384.964 616.201 388.678 608.226Z" fill="#A5FBD0"></path><path d="M347.084 451.265C346.707 451.12 346.351 451.134 346.197 451.047C345.785 450.733 345.527 450.509 345.012 450.318C344.758 450.35 344.693 450.332 344.659 450.327C344.427 449.843 344.315 449.346 344.359 448.452C345.4 446.333 346.317 444.559 347.703 442.648C358.638 443.601 369.277 444.905 379.941 445.954C387.129 446.661 387.148 446.5 387.105 453.56C387.099 454.715 387.059 455.87 386.953 457.474C384.668 459.613 382.361 458.446 380.159 458.04C370.004 456.167 360.113 453.055 349.479 451.493C348.537 451.485 347.998 451.466 347.084 451.265Z" fill="#4E99D0"></path><path d="M246.91 600.669C249.733 598.38 248.553 594.644 250.016 591.533C252.224 591.276 253.237 593.375 255.409 594.071C256.723 594.496 257.697 594.89 258.731 595.806C258.939 596.044 258.973 596.004 258.968 596.029C259.118 596.186 259.272 596.317 259.686 596.604C261.306 597.58 262.666 598.4 264.339 599.362C267.708 600.023 270.546 601.163 273.855 602.772C271.951 601.645 270.565 600.805 270.552 598.568C271.846 596.313 273.355 595.022 276.199 595.83C282.669 600.695 288.756 605.456 294.844 610.217C294.655 610.619 294.465 611.022 294.276 611.425C278.328 609.119 262.435 606.548 246.91 600.669Z" fill="#4E48C6"></path><path d="M249.415 580.185C247.212 578.058 245.33 576.164 243.298 573.97C237.888 568.083 235.226 561.035 232.223 554.186C231.49 552.515 230.826 550.776 231.411 548.543C234.524 547.115 238.289 548.961 240.996 545.653C245.498 555.314 250.509 564.584 257.109 573.329C256.624 577.996 253.492 579.552 249.415 580.185Z" fill="#D14EB2"></path><path d="M377.79 256.807C386.733 265.896 386.886 277.449 378.245 288.84C377.795 289.172 377.641 289.338 377.253 289.75C377.017 289.995 377.007 290.006 377.002 290.012C371.444 292.105 366.853 289.049 362.076 287.144C361.329 286.847 361.313 285.768 361.803 284.558C365.622 281.026 369.736 278.477 372.817 274.718C374.863 272.222 376.232 269.469 376.852 265.863C376.163 264.401 376.623 263.207 376.7 261.761C376.647 260.894 376.445 260.342 376.198 259.352C376.098 257.885 376.433 257.084 377.79 256.807Z" fill="#8658F1"></path><path d="M638.388 610.746C639.159 617.817 639.159 617.829 632.448 617.795C619.633 617.729 606.815 617.484 594.004 617.666C589.7 617.727 586.597 617.017 585.523 612.345C585.31 611.417 584.563 610.612 583.944 609.408C584.969 606.744 587.141 606.846 589.021 607.329C604.708 611.352 620.661 610.464 636.591 610.103C637.097 610.091 637.561 610.303 638.388 610.746Z" fill="#86EFD8"></path><path d="M339.686 601.092C339.591 604.542 337.516 605.201 334.645 605.032C327.978 604.64 321.903 606.481 316.238 610.544C310.244 607.734 307.761 602.161 305.545 596.432C304.618 594.036 305.413 593.15 308.106 593.575C313.48 594.424 318.896 594.999 324.672 595.824C325.457 596.086 325.864 596.214 326.589 596.32C331.42 596.867 335.5 598.615 339.686 601.092Z" fill="#7048D5"></path><path d="M262.428 521.058C265.553 533.553 260.696 545.316 259.507 557.638C254.044 553.831 247.592 540.787 245.097 528.409C247.482 527.193 249.648 528.448 251.911 528.547C257.411 528.787 260.794 526.449 262.428 521.058Z" fill="#4E99D0"></path><path d="M644.099 285.188C641.352 282.81 640.513 279.773 639.85 276.063C639.633 274.945 639.432 274.407 639.27 273.434C642.152 269.457 645.654 267.526 650.658 268.731C655.936 276.315 663.325 280.89 670.658 285.999C670.961 288.221 669.31 288.989 667.736 289.127C660.206 289.784 652.73 289.6 645.217 286.362C644.84 286.101 644.929 286.066 644.936 286.113C644.796 285.838 644.586 285.565 644.099 285.188Z" fill="#D14EB2"></path><path d="M436.905 870.777C439.737 874.306 440.422 878.395 441.727 882.604C437.268 884.059 433.268 882.48 430.91 878.699C426.754 872.033 421.639 871.795 416.41 878.005C410.776 870.385 409.996 861.72 410.124 852.407C412.325 850.699 413.636 852.397 414.993 853.392C419.928 857.012 424.321 861.307 428.007 866.124C430.352 869.189 432.787 870.902 436.905 870.777Z" fill="#7048D5"></path><path d="M205.069 637.575C202.043 638.871 199.054 639.814 196.072 640.781C186.052 644.035 188.108 643.782 187.976 652.141C187.78 664.551 187.71 676.964 187.325 689.696C186.011 690.775 184.788 691.067 183.265 691.162C182.992 674.787 183.008 658.559 183 642.33C182.999 640.057 184.473 639.065 186.299 638.496C191.994 636.723 197.716 635.037 203.802 633.402C204.517 634.728 204.075 636.164 205.069 637.575Z" fill="#1B2859"></path><path d="M677.973 480.686C662.869 490.553 646.024 495.444 628.625 498.792C627.091 499.087 625.326 499.323 625.61 496.952C625.828 495.13 624.123 492.386 627.734 491.85C632.343 491.165 636.949 490.439 641.527 489.576C652.727 487.466 663.245 483.378 673.784 478.311C675.785 478.26 677.126 478.813 677.973 480.686Z" fill="#61B7E6"></path><path d="M416.145 878.296C416 871.941 421.157 873.213 424.467 872.165C427.287 871.272 429.795 872.258 430.66 875.387C432.132 880.707 436.56 881.792 441.365 882.961C442.476 885.106 443.219 887.242 444.002 889.757C444.156 890.306 444.272 890.475 444.324 890.946C444.361 891.404 444.463 891.561 444.607 891.995C439.827 895.487 435.316 893.377 430.435 891.226C430.077 890.991 430.004 891.009 429.994 890.973C429.755 890.707 429.507 890.5 429.01 890.243C423.423 887.595 419.674 883.275 416.145 878.296Z" fill="#4E48C6"></path><path d="M190.153 546.146C186.724 543.564 183.491 541.101 180.147 538.799C179.316 538.227 178.291 536.6 177.027 538.727C178.904 544.691 178.142 545.915 172.575 545.224C169.897 539.298 169.643 533.306 168.848 527.409C168.417 524.217 169.972 525.109 171.65 525.814C180.596 529.572 189.132 534.039 196.855 540.486C198.262 545.957 196.947 547.656 191.475 547.178C191.096 546.912 191.071 546.956 191.06 546.933C190.778 546.745 190.531 546.55 190.153 546.146Z" fill="#F89A60"></path><path d="M320.548 418.943C339.564 421.924 358.295 424.053 376.656 428.367C378.096 428.705 379.585 428.829 381.453 429.136C380.888 432.367 378.158 431.208 376.117 431.436C370.476 432.069 364.602 431.442 359.19 435.012C353.407 435.08 348.076 434.042 342.362 432.85C343.741 429.267 349.089 430.979 350.537 426.424C335.677 424.009 320.789 422.042 306.149 418.389C310.887 416.854 315.46 419.228 320.548 418.943Z" fill="#86EFD8"></path><path d="M580.97 207.181C578.318 205.519 575.934 203.976 573.336 202.294C581.125 198.789 585.825 192.828 587.771 184.188C588.415 183.378 588.982 183.286 589.848 183.644C591.344 187.44 592.268 191.208 594.903 194.584C595.208 195.172 595.427 195.413 595.805 195.841C596.245 196.203 596.532 196.373 596.9 196.789C597.241 197.23 597.479 197.451 597.89 197.842C598.087 197.986 598.017 197.993 598.026 197.959C600.231 203.986 595.03 206.446 591.887 209.466C589.021 212.22 585.46 210.643 582.125 208.347C581.788 208.115 581.926 208.056 581.945 208.128C581.797 207.84 581.559 207.537 580.97 207.181Z" fill="#FBC965"></path><path d="M432.344 554.084C435.572 541.493 436.036 529.252 429.061 517.23C429.283 513 431.514 511.86 435.404 512.742C444.448 527.488 443.743 542.752 438.993 558.644C436.391 558.654 437.184 556.483 436.736 555.123C435.82 552.346 434.402 552.824 432.344 554.084Z" fill="#86EFD8"></path><path d="M586.371 762.868C583.132 758.093 583.775 752.848 583.768 747.731C583.761 742.913 583.849 738.095 584.058 732.777C586.561 731.52 586.106 733.34 586.122 734.476C586.185 738.792 586.147 743.111 586.146 747.428C586.144 759.269 586.26 759.498 596.941 768.004C581.306 766.929 566.395 764.728 551.148 764.691C551.777 762.598 553.229 762.889 554.177 762.411C558.842 760.054 561.871 756.911 561.224 751.121C560.838 747.676 561.15 744.154 561.257 740.265C561.933 739.522 562.544 739.413 563.61 739.772C564.067 746.918 565.354 753.937 561.678 761.14C569.668 761.931 577.215 762.678 585.198 763.412C585.958 763.475 586.21 763.368 586.371 762.868Z" fill="#E3E8EF"></path><path d="M434.882 281.694C435.658 287.724 432.399 292.689 431.973 298.578C432.017 298.983 431.995 299.006 431.985 299.019C431.681 299.379 431.468 299.772 431.223 300.529C429.523 305.597 427.915 310.338 426.769 315.548C426.758 317.343 426.915 318.84 426.621 320.243C425.918 323.591 425.489 327.579 420.336 324.323C419.852 324.018 418.807 324.598 417.699 324.787C418.158 312.652 423.52 301.844 427.563 290.668C428.981 286.748 430.056 282.79 431.047 278.37C433.307 278.123 433.739 280.097 434.882 281.694Z" fill="#61B7E6"></path><path d="M760.595 523.026C761.741 511.272 769.011 502.874 774.834 492.73C775.664 496.45 776.32 499.391 777.039 503.058C777.356 504.589 777.61 505.395 777.87 506.628C777.48 507.909 778.001 508.663 778.239 509.757C778.475 510.494 778.616 510.933 778.748 511.72C778.189 515.073 778.649 518.107 778.389 521.517C775.653 524.423 772.653 523.172 769.883 522.423C766.732 521.572 764.055 521.829 761.299 524.157C760.778 523.904 760.659 523.664 760.595 523.026Z" fill="#61D6EC"></path><path d="M317.448 520.462C316.81 517.996 316.399 515.78 316.003 513.136C319.498 515.22 322.957 517.762 326.473 520.224C327.443 520.904 328.188 522.487 329.94 521.08C331.684 518.688 333.83 517.4 336.642 516.581C342.355 518.606 345.142 523.815 349.961 527.057C351.677 528.372 352.725 529.862 354.186 531.424C354.514 531.877 354.628 532.069 354.874 532.566C355.519 534.805 356.105 536.661 359.05 536.431C359.608 536.55 359.825 536.635 360.286 536.977C361.035 538.114 361.089 539.053 360.757 540.361C360.485 540.89 360.341 541.08 359.892 541.455C358.17 542.146 356.836 541.662 355.165 541.196C354.623 541.02 354.409 540.941 353.882 540.725C353.159 540.388 352.756 540.177 352.056 539.793C345.402 535.833 341.098 529.652 334.975 525.122C334.444 524.707 334.563 524.275 334.315 524.053C334.104 524.306 334.178 524.535 334.687 525.024C335.191 527.374 334.417 528.917 332.315 530.083C330.945 530.118 329.919 530.073 328.508 530.045C323.592 528.118 321.038 523.963 317.448 520.462Z" fill="#8658F1"></path><path d="M658.902 362.379C664.341 362.075 669.494 362.166 674.628 361.888C677.597 361.727 678.105 362.922 678.153 365.594C678.38 378.322 678.459 378.321 666.25 378.312C659.003 378.307 659.004 378.307 659.011 370.944C659.013 368.952 659.013 366.959 658.946 364.507C658.563 363.614 658.473 363.138 658.902 362.379Z" fill="#61D6EC"></path><path d="M760.426 523.001C760.755 522.825 760.86 523.021 761.048 523.542C761.246 523.984 761.405 524.083 761.466 524.225C762.751 527.191 762.654 531.227 767.853 530.687C771.201 530.339 774.805 531.577 777.658 528.121C778.942 532.364 776.707 536.014 775.415 539.856C773.819 544.602 771.149 548.822 768.664 553.12C767.602 554.957 766.245 556.624 764.378 559.288C763.005 546.623 758.542 535.401 760.426 523.001Z" fill="#4E99D0"></path><path d="M845.344 537.813C842.317 540.265 839.472 542.494 836.335 544.887C835.862 545.197 835.683 545.344 835.251 545.731C834.998 545.971 834.988 545.99 834.978 545.989C830.745 548.441 828.298 546.066 826.081 542.365C834.375 534.295 844.341 529.453 855.356 525.356C854.784 531.859 853.976 537.699 852.208 543.73C849.507 543.839 848.235 541.654 846.093 540.332C845.947 539.58 845.979 539.123 845.979 538.323C845.805 537.851 845.665 537.721 845.344 537.813Z" fill="#F89A60"></path><path d="M600.623 135.926C600.963 134.354 601.133 133.198 600.189 132.234C598.84 130.857 598.428 129.529 600.051 127.983C601.562 126.544 602.803 126.781 604.42 127.915C607.047 129.757 609.482 130.458 609.413 125.747C609.384 123.786 610.902 123.741 612.195 123.74C613.387 123.738 614.689 123.338 615.297 125.302C616.145 128.04 617.144 131.386 620.915 127.33C622.027 126.134 623.958 126.55 625.36 127.983C626.753 129.406 627.222 130.539 625.413 132.017C624.521 132.746 625.273 133.887 625.336 135.2C625.029 139.311 622.098 139.043 619.147 139.37C614.537 138.387 610.455 138.399 606.233 140.813C602.962 140.647 601.104 139.233 600.623 135.926Z" fill="#C2F9DA"></path><path d="M638.36 363.428C634.614 364.407 635.13 367.152 635.105 369.616C635.008 378.98 635.005 379.098 625.978 378.905C622.771 378.837 618.321 380.613 616.615 377.827C614.618 374.565 619.266 371.9 620.202 368.648C622.646 360.152 629.227 360.365 636.506 361.051C638.727 360.763 638.55 361.998 638.36 363.428Z" fill="#1B2859"></path><path d="M748.578 575.927C744.401 575.242 742.597 572.954 742.956 568.696C743.283 564.801 743.025 560.858 743.025 555.5C740.278 558.975 738.598 561.548 736.468 563.669C734.38 565.748 731.932 568.871 728.83 564.066C729.408 562.069 730.319 560.211 731.507 558.166C737.994 554.024 744.468 550.935 752.469 551.998C753.564 560.376 753.066 568.343 748.578 575.927Z" fill="#D14EB2"></path><path d="M638.799 610.717C623.192 612.451 607.68 613.391 592.283 609.4C589.865 608.773 587.19 607.858 584.175 608.931C582.284 606.904 580.741 604.74 579.116 602.247C582.696 599.388 585.792 602.654 588.836 603.412C604.45 607.302 620.244 608.277 636.686 607.957C638.222 608.416 638.612 609.36 638.799 610.717Z" fill="#C2F9DA"></path><path d="M638.611 363.764C637.911 363.009 637.668 362.239 637.195 361.276C637.034 356.491 637.288 351.893 637.11 347.311C636.983 344.061 637.936 341.901 641.566 341.035C642.408 341.49 642.852 341.977 643.038 342.621C645.336 350.59 645.334 350.593 653.546 351.581C654.528 351.699 655.476 351.901 656.61 352.748C657.025 355.404 657.128 357.805 657.285 360.654C657.543 361.834 657.747 362.566 657.018 363.486C650.814 363.697 644.941 363.723 638.611 363.764Z" fill="#A331A4"></path><path d="M431.997 553.998C434.195 553.33 433.668 551.005 434.965 549.168C436.403 552.401 439.511 554.567 438.59 558.737C438.768 559.43 438.718 559.877 438.563 560.653C438.458 560.98 438.154 560.92 438.005 560.963C437.105 561.81 436.692 562.805 436.201 564.113C436.123 564.426 436.133 564.75 436.038 564.882C435.177 565.714 434.785 566.647 434.223 567.829C434.081 568.096 434.016 568.032 434.061 568.039C433.815 568.216 433.556 568.425 433.187 568.881C433.046 569.09 433.049 569.014 433.085 569.028C432.557 569.397 432.503 570.01 432.2 570.83C432.054 571.089 432.034 571.009 432.069 571.031C430.008 573.045 428.275 575.346 426.327 577.896C426.156 578.182 426.075 578.137 426.103 578.1C425.823 578.219 425.553 578.425 425.191 578.903C425.061 579.125 425.038 579.048 425.078 579.052C424.816 579.219 424.551 579.43 424.191 579.904C424.063 580.126 424.044 580.046 424.084 580.053C423.819 580.219 423.553 580.428 423.19 580.901C423.059 581.121 423.037 581.044 423.077 581.049C422.816 581.221 422.549 581.431 422.192 581.909C422.067 582.133 422.043 582.055 422.084 582.058C421.818 582.222 421.549 582.43 421.182 582.904C421.048 583.124 421.031 583.046 421.071 583.044C420.815 583.217 420.551 583.43 420.178 583.898C420.039 584.114 420.03 584.034 420.07 584.035C419.816 584.214 419.553 584.428 419.175 584.891C419.03 585.103 419.024 585.026 419.063 585.028C418.815 585.21 418.558 585.425 418.174 585.874C418.023 586.076 418.014 586.007 418.044 586.025C416.287 586.912 414.38 587.628 413.315 589.921C413.153 590.211 413.12 590.187 413.141 590.201C411.383 590.052 409.94 589.491 409.685 586.981C409.561 586.583 409.584 586.605 409.591 586.595C409.934 586.805 410.211 586.746 410.287 586.215C415.293 579.88 421.056 574.232 425.464 567.095C426.365 566.64 426.498 566.058 426.803 565.233C426.974 564.988 426.999 564.998 426.99 564.987C427.31 564.707 427.593 564.396 427.876 563.723C427.931 563.41 427.836 563.16 427.946 563.084C428.336 562.711 428.587 562.392 428.87 561.753C428.927 561.454 428.841 561.172 428.963 561.089C429.467 560.567 429.499 560 429.826 559.268C430.01 559.062 429.981 559.013 430.008 559.002C430.345 558.691 430.614 558.356 430.875 557.667C430.908 557.345 430.799 557.202 430.852 557.13C431.733 556.406 431.419 555.435 431.797 554.338C431.999 554.074 431.972 554.017 431.997 553.998Z" fill="#6DEFC4"></path><path d="M392.667 882.488C395.63 880.857 395.021 876.055 398.993 874.93C404.635 878.164 408.532 883.465 413.623 887.453C416.235 889.499 418.826 891.529 421.846 893.498C422.214 896.599 418.114 895.725 418.013 898.708C408.367 895.527 400.963 888.628 392.667 882.488Z" fill="#315BA3"></path><path d="M687.613 207.412C684.465 210.712 689.707 212.64 688.879 215.748C684.206 217.722 680.215 220.801 674.988 221.953C672.983 221.669 671.378 221.399 669.382 221.231C666.344 217.312 668.008 213.127 667.792 209.149C667.754 208.446 668.465 208.086 669.182 208.035C669.675 208 670.173 208.021 670.667 207.987C679.632 207.365 679.632 207.364 680.659 198.335C681.038 197.847 681.22 197.701 681.74 197.46C683.09 197.377 683.884 197.83 684.65 198.908C684.993 199.745 685.222 200.246 685.674 200.916C686.226 203.162 682.955 206.092 687.613 207.412Z" fill="#F17187"></path><path d="M554.052 898.187C551.004 898.116 550.269 894.914 547.492 894.206C547.138 893.891 546.997 893.641 547.05 893.588C552.819 887.887 551.328 880.598 551.431 873.656C551.46 871.672 551.332 869.665 552.345 867.428C555.539 865.717 555.891 867.935 556.3 869.899C556.705 871.842 556.418 873.86 556.83 875.82C557.197 877.563 558.352 878.301 559.976 878.453C562.143 878.656 562.201 877.004 562.497 875.532C563.309 871.498 562.939 867.274 564.748 863.101C567.078 865.884 565.682 869.285 566.034 872.501C566.214 874.142 565.802 875.872 566.115 877.472C568.131 887.774 564.171 894.587 554.052 898.187Z" fill="#4996AF"></path><path d="M678.38 480.935C676.875 480.231 675.712 479.454 674.343 478.466C686.886 471.27 698.676 462.978 709.069 452.333C709.154 451.997 709.067 451.985 709.063 452.028C709.465 451.402 709.839 450.702 710.836 450.173C711.083 450.013 711.005 450.006 711.003 450.045C711.221 449.801 711.469 449.542 711.961 449.151C714.232 447.066 716.288 445.143 718.64 443.076C719.051 444.41 719.167 445.889 719.501 447.663C708.27 461.689 693.93 471.816 678.38 480.935Z" fill="#86EFD8"></path><path d="M245.488 525.98C244.887 524.829 244.645 523.691 244.476 522.208C244.467 520.505 244.535 519.145 244.513 517.445C244.446 508.909 247.237 501.303 249.26 492.838C253.691 500.657 258.545 507.463 261.226 515.809C260.345 519.219 257.473 519.166 255.171 519.402C250.689 519.861 246.923 520.903 245.488 525.98Z" fill="#61D6EC"></path><path d="M348.67 451.272C350.116 449.652 351.629 449.892 353.063 450.219C364.083 452.73 375.092 455.288 386.487 457.877C387.629 468.654 387.6 468.726 377.876 464.78C368.351 460.915 358.894 456.882 349.164 452.697C348.769 452.206 348.616 451.943 348.67 451.272Z" fill="#3765A8"></path><path d="M342.753 458.342C356.048 463.623 369.031 469.4 382.166 474.806C386.196 476.465 388.305 478.483 386.675 483.521C371.616 477.373 357.471 469.535 343.09 461.473C342.509 460.405 342.215 459.593 342.753 458.342Z" fill="#315BA3"></path><path d="M564.913 862.547C565.501 867.479 564.308 871.986 563.979 876.558C563.866 878.126 564.812 881.112 562.084 880.57C559.553 880.067 555.269 881.487 554.945 876.458C554.75 873.407 555.878 870.227 553.84 867.142C551.103 866.508 550.736 863.841 548.714 862.48C548.393 862.03 548.28 861.84 548.013 861.009C547.674 855.399 552.435 857.727 554.8 855.817C555.199 855.701 555.143 855.778 555.096 855.768C555.336 856.453 556.006 856.489 556.894 856.775C557.189 856.893 557.057 856.959 557.031 856.89C557.349 857.371 557.913 857.501 558.728 857.775C561.41 858.696 563.047 860.542 564.913 862.547Z" fill="#4E99D0"></path><path d="M441.567 609.97C429.989 612.058 418.499 610.034 407.14 611.781C403.974 612.268 400.264 613.289 397.083 610.376C396.978 609.987 396.996 609.993 396.992 609.986C397.404 609.568 397.853 609.206 398.72 609.012C409.94 606.174 421.298 606.337 432.339 604.15C437.042 603.218 441.798 602.62 446.761 601.057C445.381 603.939 443.606 606.851 441.567 609.97Z" fill="#C2F9DA"></path><path d="M680.761 232.436C681.174 232.787 681.343 232.878 681.796 232.991C682.18 233.15 682.279 233.288 682.628 233.47C683.234 233.712 683.59 233.908 684.253 234.132C689.044 235.491 693.576 235.98 698.558 234.895C699.489 234.691 700.059 234.537 700.813 234.141C701.97 232.997 703.155 232.591 704.661 232.192C704.879 231.962 704.957 231.992 704.969 231.951C705.971 230.991 707.18 230.584 708.742 230.212C708.994 230.009 709.002 230.003 709.007 230.002C709.622 229.27 710.432 229.024 711.677 229.05C712.87 229.457 715.434 228.791 713.326 231.078C707.778 237.099 700.707 240.765 693.3 243.881C692.737 244.118 691.903 244.139 691.346 243.904C683.865 240.744 675.955 238.261 670.776 231.345C670.529 231.015 670.574 230.467 670.736 229.808C671.762 229.25 672.544 229.166 673.668 229.764C673.995 230.007 674.232 230.237 674.392 230.194C676.498 230.949 678.895 230.418 680.761 232.436Z" fill="#D14EB2"></path><path d="M644.929 286.426C651.505 286.724 658.169 287.358 664.835 287.961C666.847 288.142 668.776 287.85 670.735 286.361C675.312 286.757 678.687 289.382 682.922 291.164C669.166 299.215 655.022 297.4 644.929 286.426Z" fill="#C42CCC"></path><path d="M429.57 212.322C427.102 209.028 425 205.96 421.951 203.868C418.691 201.631 419.351 200.033 422.673 198.357C429.033 199.765 430.379 199.145 432.305 193.716C434.22 191.65 435.579 192.77 436.471 194.223C438.817 198.05 442.46 199.643 446.927 200.69C447.606 200.85 447.942 200.856 448.239 200.967C449.149 201.304 449.081 201.746 448.279 202.128C443.781 204.273 440.572 207.964 436.989 211.697C434.676 213.825 432.348 213.782 429.57 212.322Z" fill="#E3E8EF"></path><path d="M453.354 437.445C483.391 435.477 513.787 435.49 544.164 436.324C565.07 436.898 585.972 437.59 607.341 437.871C607.857 438.353 607.919 438.82 607.931 439.638C607.882 439.99 607.443 440.016 607.224 440.026C605.946 440.601 604.799 440.721 603.622 440.73C577.85 440.921 552.102 440.044 526.36 438.973C523.992 438.874 521.722 439.179 519.084 439.862C517.55 441.108 516.174 441.711 514.8 440.592C512.772 438.938 510.803 440.009 508.465 440.329C507.999 438.248 507.681 437.35 504.92 437.369C487.843 437.489 470.766 438.641 453.354 437.445Z" fill="#4996AF"></path><path d="M366.444 555.123C365.959 553.663 364.864 553.002 362.991 552.629C363.489 550.376 365.943 550.686 367.676 549.239C366.185 545.924 361.969 545.069 360.532 541.379C360.63 540.098 360.994 539.225 361.278 537.98C363.288 533.487 363.562 529.459 360.118 525.502C359.586 524.944 359.295 524.616 358.802 524.038C358.194 523.301 357.856 522.767 357.412 521.94C357.117 521.296 356.964 520.924 356.684 520.281C356.454 519.836 356.357 519.659 356.104 519.217C355.852 518.767 355.754 518.582 355.552 518.095C355.429 517.578 355.411 517.363 355.464 516.827C356.182 515.202 357.314 515.444 358.665 515.827C365.512 520.285 369.986 525.736 368.235 534.138C367.304 538.607 368.996 541.254 372.627 543.52C374.818 544.887 377.206 546.242 378.719 548.704C374.675 550.81 370.715 552.873 366.444 555.123Z" fill="#61D6EC"></path><path d="M638.023 865.013C644.586 865.136 644.982 865.598 644.994 873.569C644.566 874.324 644.137 874.648 643.434 875.016C642.862 875.208 642.594 875.399 642.17 875.796C641.987 875.962 641.996 876.004 641.979 875.991C641.557 876.443 640.953 876.471 640.236 876.884C640.044 877.097 640.008 877.024 640.046 877.039C639.799 877.205 639.551 877.403 639.165 877.81C638.989 877.972 638.998 878.003 638.985 877.992C638.563 878.433 637.985 878.476 637.222 878.785C633.903 881.325 630.807 883.693 627.371 886.15C626.14 883.131 624.136 880.969 621.118 879.236C624.393 874.581 629.033 871.59 633.697 868.135C634.755 867.302 635.851 867.151 636.751 866.153C636.938 865.913 637.002 865.962 636.962 865.958C637.197 865.791 637.446 865.594 637.841 865.198C638.012 865.031 638.008 865.004 638.023 865.013Z" fill="#2A50A0"></path><path d="M793.277 547.979C789.182 548.029 786.144 546.366 783.752 542.896C785.159 536.501 786.685 530.481 788.414 524.148C791.472 521.215 794.435 521.753 797.765 523.828C796.705 531.141 795.319 538.16 793.918 545.596C794.03 546.658 793.876 547.243 793.277 547.979Z" fill="#F17187"></path><path d="M613.434 862.186C607.995 861.706 603.212 862.284 598.827 865.367C596.507 866.998 593.552 867.301 590.215 866.926C594.658 857.472 603.225 852.396 612.623 849.141C617.837 847.335 613.756 852.645 615 854.596C614.171 856.049 614.585 857.224 614.664 858.662C614.754 859.716 614.714 860.452 614.539 861.533C614.199 862.029 613.994 862.18 613.434 862.186Z" fill="#416AD1"></path><path d="M479.42 848.972C483.104 848.64 485.841 849.781 487.999 852.793C488.307 855.461 486.395 856.179 484.989 857.164C481.234 859.796 477.343 862.233 473.332 865.075C472.962 865.686 471.642 865.405 472.58 866.649C472.809 867.653 472.669 868.295 471.905 868.931C469.395 864.135 464.565 864.373 460.091 863.055C460.475 860.868 462.54 860.255 464.336 858.903C465.027 858.777 465.35 858.63 465.782 858.144C470.323 854.955 474.703 851.989 479.42 848.972Z" fill="#61B7E6"></path><path d="M624.569 153.725C624.355 154.99 624.435 155.866 624.969 156.832C625.69 158.133 626.566 159.803 624.938 160.818C623.533 161.694 621.828 162.734 619.997 161.041C617.627 158.849 615.835 159.452 614.975 162.563C614.386 164.692 612.685 163.849 611.32 164.099C609.387 164.452 609.117 163.444 608.971 161.91C608.783 159.953 607.651 159.554 605.809 160.121C599.295 162.128 598.966 161.787 600.456 155.136C600.562 154.662 600.473 154.145 600.757 153.336C601.354 152.631 601.71 152.267 602.188 152.108C606.303 150.741 620.347 151.586 624.569 153.725Z" fill="#61D6EC"></path><path d="M304.352 302.614C303.401 295.199 303.382 295.305 310.923 296.677C314.991 297.416 319.06 297.992 322.934 300.363C323.233 301.057 323.422 301.424 324.058 301.722C324.377 301.722 324.31 301.965 324.321 301.839C324.664 305.524 324.453 309.342 324.468 313.155C324.474 314.729 324.887 316.822 321.71 315.941C319.715 315.147 320.854 311.324 317.417 312.707C316.707 313.395 316.293 313.913 315.706 314.752C315.305 315.199 315.119 315.359 314.594 315.674C311.946 316.315 310.224 315.626 309.225 312.995C309.132 311.005 310.138 309.883 311.018 308.662C313.406 305.352 312.708 303.905 308.646 303.245C307.197 303.009 305.684 304.104 304.352 302.614Z" fill="#6DEFC4"></path><path d="M736.811 360.823C736.777 357.689 736.97 355.015 736.718 352.384C736.294 347.933 738.394 346.589 742.535 346.536C751.164 346.425 751.162 346.289 751.161 354.714C751.16 363.114 751.158 363.214 742.775 363.026C740.767 362.981 738.046 364.448 736.811 360.823Z" fill="#A546D7"></path><path d="M625.118 153.828C617.155 152.774 609.436 152.976 601.383 153C600.477 152.779 599.55 152.188 599.405 152.34C597.188 154.676 595.728 153.17 594.428 151.377C593.016 149.431 593.608 147.739 595.333 146.261C595.813 145.849 596.139 145.256 596.525 144.383C599.841 141.562 601.937 145.028 604.941 145.856C606.137 146.488 606.784 147.236 607.533 147.861C611.955 151.554 615.123 151.125 618.507 146.356C619.26 145.295 619.836 144.104 621.333 143.211C624.132 142.537 626.579 142.059 628.731 144.671C629.162 145.985 629.419 146.891 630.39 147.421C632.228 148.424 632.139 149.775 631.308 151.511C630.351 153.511 629.03 153.634 627.405 152.639C626.067 151.82 625.724 152.581 625.118 153.828Z" fill="#86EFD8"></path><path d="M719.663 301.065C720.266 305.077 720.472 309.225 720.848 313.358C721.105 316.181 720.017 317.411 717.175 317.102C716.352 317.013 715.511 317.09 714.679 317.093C707.98 317.113 707.98 317.113 707.815 324.363C707.572 324.803 707.277 324.867 707.265 324.834C705.676 320.261 701.964 318.854 697.35 318.181C697.472 314.36 700.361 316.053 702 316.075C705.266 316.118 706.427 314.976 706.274 311.742C706.086 307.781 706.281 303.802 706.599 299.563C710.276 305.483 712.792 305.867 719.663 301.065Z" fill="#F17187"></path><path d="M553.65 167.445C555.273 173.233 557.116 178.504 564.204 180.418C555.767 183.343 554.141 189.975 553.214 198.462C551.325 190.844 551.25 183.579 543.035 180.539C549.345 178.583 550.72 173.571 552.031 168.083C552.48 167.445 552.892 167.316 553.65 167.445Z" fill="#F8EC9C"></path><path d="M517.419 410.99C517.423 408.608 519.301 409.02 520.908 409.018C535.203 408.996 549.498 409.037 563.792 408.971C567.928 408.952 571.961 407.711 576.157 407.884C578.488 407.98 579.394 406.108 578.781 404.066C578.255 402.315 578.602 400.816 579.111 398.824C579.161 398.419 579.456 398.34 579.574 398.438C579.691 398.536 579.776 398.796 579.776 398.796C579.776 398.796 579.997 398.643 579.872 398.598C581.865 397.786 584.036 398.387 586.569 398.401C586.344 400.889 585.354 403.156 584.721 405.567C584.004 408.297 582.322 410.954 578.584 411.049C567.968 411.319 557.314 411.527 546.737 411.587C537.188 411.641 527.505 411.456 517.419 410.99Z" fill="#E3E8EF"></path><path d="M233.939 611.882C228.481 612.538 223.28 613.211 217.991 613.042C212.804 612.876 208.35 612.203 207.612 605.715C207.369 603.57 204.353 604.382 203.217 602.427C213.428 600.822 222.717 604.097 231.579 609.041C232.646 609.636 234.14 610.034 233.939 611.882Z" fill="#A546D7"></path><path d="M792.996 548.525C793.189 547.597 793.345 547.021 793.702 546.229C796.146 542.41 799.458 541.373 803.467 542.053C806.15 542.507 807.169 539.297 810.014 539.404C802.051 550.041 793.644 560.507 784.089 570.353C786.846 563.26 789.902 556.068 792.996 548.525Z" fill="#A331A4"></path><path d="M696.962 318.469C705.883 317.453 706.361 317.742 707.528 324.504C707.807 327.251 707.879 329.718 707.863 332.638C706.005 338.802 702.337 340.356 697.293 337.186C696.954 330.951 696.91 324.939 696.962 318.469Z" fill="#D14EB2"></path><path d="M641.253 819.272C640.618 818.909 640.347 818.726 640.081 818.536C635.956 815.589 636.011 813.085 640.467 810.298C643.375 808.48 645.888 804.02 648.407 804.147C650.984 804.277 653.356 808.554 655.808 811.026C656.853 812.08 657.872 813.159 658.999 814.545C659.788 816.515 658.464 817.013 657.329 818.043C657.047 818.66 656.836 818.857 656.336 819.026C655.873 819.186 655.623 819.297 654.965 819.427C650.245 819.111 645.933 820.628 641.253 819.272Z" fill="#4E99D0"></path><path d="M437.157 870.588C433.083 872.942 430.542 871.766 427.742 867.914C423.195 861.658 417.479 856.307 410.554 852.004C409.357 848.693 410.16 847.538 413.55 849.118C423.547 853.777 432.332 859.751 437.157 870.588Z" fill="#A546D7"></path><path d="M752.856 551.74C750.324 552.987 747.952 554.146 745.177 553.353C744.358 553.119 742.983 553.371 742.422 553.946C739.674 556.766 736.026 556.985 732.164 557.859C736.107 549.298 743.557 543.539 751.304 536.725C751.901 542.117 752.408 546.702 752.856 551.74Z" fill="#F17187"></path><path d="M227.029 570.615C219.632 571.968 214.814 566.963 209.624 562.959C206.352 560.434 203.375 557.527 200.073 554.522C200.747 551.785 203.462 550.974 205.081 548.773C213.343 555.156 219.747 563.106 227.029 570.615Z" fill="#D14EB2"></path><path d="M187.466 814.688C187.136 797.264 187.026 779.484 186.858 761.704C186.838 759.553 187.67 756.652 183.341 756.891C182.913 747.879 182.913 738.893 182.97 729.44C184.049 728.123 185.163 727.931 186.764 728.744C188.17 730.088 187.93 731.462 187.93 732.767C187.93 759.3 187.921 785.833 187.901 812.366C187.901 813.021 187.75 813.676 187.466 814.688Z" fill="#1B2859"></path><path d="M620.956 878.96C624.277 879.921 628.587 879.979 627.049 885.869C621.98 890.694 616.506 894.547 610.234 897.795C608.049 896.537 606.213 895.242 604.018 893.834C607.495 890.559 611.331 887.396 615.456 884.078C616.085 883.791 616.388 883.596 616.799 883.115C616.941 882.882 616.925 882.973 616.902 882.933C618.564 882.251 620.131 881.478 620.781 879.223C620.96 878.944 620.974 878.968 620.956 878.96Z" fill="#315BA3"></path><path d="M271.505 553.371C271.204 553.108 270.898 552.963 270.729 552.96C270.896 547.743 270.99 542.494 272.907 536.847C279.41 541.803 284.815 547.389 289.985 553.659C288.215 557.085 285.608 556.657 282.446 555.274C282.044 555.052 281.999 555.017 281.975 555.003C278.657 553.875 275.026 555.293 271.505 553.371Z" fill="#F17187"></path><path d="M596.232 517.359C594.964 514.274 591.539 515.552 589.212 513.958C592.934 505.896 599.019 500.152 607.304 495.922C608.416 501.365 608.169 505.62 603.525 508.905C600.547 511.01 598.532 514.167 596.232 517.359Z" fill="#61B7E6"></path><path d="M359.192 435.45C357.745 432.86 358.819 432.229 361.089 431.717C367.734 430.219 374.488 430.113 381.537 429.442C382.68 429.275 383.507 429.33 384.735 429.481C385.552 429.518 385.97 429.508 386.663 429.702C386.947 438.519 388.982 438.551 378.662 437.553C372.282 436.935 365.902 436.303 359.192 435.45Z" fill="#61B7E6"></path><path d="M401.401 222.456C404.075 224.907 406.689 227.229 411.462 228.295C404.629 231.164 400.111 234.878 399.133 241.797C398.09 234.827 393.699 230.949 387.207 228.507C389.869 226.95 392.107 225.64 394.658 224.181C396.544 222.66 397.741 220.477 400.761 221.735C401.098 221.96 401.028 221.986 401.019 221.95C401.145 222.011 401.281 222.109 401.401 222.456Z" fill="#EC427F"></path><path d="M245.054 526.306C244.841 519.612 248.585 517.94 254.085 518.131C256.421 518.212 258.628 517.423 261.04 516.32C261.546 516.529 261.776 516.924 262.008 517.672C262.147 518.138 262.284 518.249 262.308 518.601C262.4 519.311 262.607 519.781 262.805 520.642C262.697 521.164 262.587 521.287 262.5 521.424C261.067 523.679 263.633 527.781 259.99 528.665C255.373 529.785 250.459 531.581 245.493 528.185C245.102 527.559 245.04 527.102 245.054 526.306Z" fill="#61B7E6"></path><path d="M320.545 313.926C322.367 315.163 323.988 316.836 324.003 313.067C324.016 309.603 324.09 306.14 324.235 302.195C326.075 307.768 324.673 313.954 325.02 320.526C323.616 318.968 321.312 318.926 319.332 318.322C317.074 317.633 315.515 318.355 315.009 320.919C314.532 323.338 313.806 325.7 314.028 328.219C314.422 332.689 313.984 336.984 310.831 340.848C307.248 338.955 308.847 335.654 308.431 332.893C307.857 329.093 309.735 324.871 306.087 321.314C304.466 320.177 303.926 318.9 303.86 316.961C304.478 313.738 306.4 312.243 309.375 311.356C310.012 313.939 311.415 315.16 314.415 315.002C316.632 314.716 318.424 314.293 320.545 313.926Z" fill="#61D6EC"></path><path d="M720.734 323.637C724.959 321.807 729.1 322.488 733.199 322.696C735.115 322.793 736.723 323.707 737.245 326.19C737.217 329.524 739.022 333.351 735.073 334.834C730.868 336.412 726.301 336.436 722.068 334.456C720.584 333.762 720.485 332.074 720.509 330.532C720.542 328.387 720.468 326.241 720.734 323.637Z" fill="#F17187"></path><path d="M231.781 548.018C233.711 555.543 236.709 562.322 240.974 568.523C241.923 569.902 242.86 571.264 243.131 573.318C234.182 565.531 226.758 556.02 219.035 546.364C222.399 546.173 225.818 543.999 229.898 546.036C230.653 546.521 230.818 546.823 231.163 547.295C231.478 547.566 231.611 547.668 231.781 548.018Z" fill="#A331A4"></path><path d="M756.866 600.361C756.841 602.313 757.315 603.904 758.846 605.486C749.63 609.325 739.724 609.793 729.451 610.182C734.397 606.172 739.343 602.162 744.604 598.028C746.676 598.179 747.609 599.424 748.481 601.167C748.634 602.141 748.496 602.739 747.799 603.397C747.034 603.954 747.811 603.48 747.253 603.844C747.398 603.786 747.492 603.658 747.896 603.446C750.167 602.311 752.193 601.414 754.764 601.225C755.557 600.771 756.075 600.511 756.866 600.361Z" fill="#4E48C6"></path><path d="M359.26 817.272C358.614 817.051 358.409 816.971 358.1 816.729C357.843 816.33 357.71 816.041 357.671 815.286C357.765 814.819 357.789 814.968 357.792 814.893C358.16 814.759 358.451 814.58 358.779 814.038C361.754 811.055 364.787 808.466 367.424 805.523C369.226 803.511 370.425 803.518 372.108 805.478C373.509 807.11 374.948 808.848 376.724 809.99C381.116 812.814 381.259 815.333 376.437 818.204C370.641 818.653 365.078 819.503 359.26 817.272Z" fill="#4E99D0"></path><path d="M778.002 527.713C775.562 532.938 772.518 533.873 764.154 531.947C760.076 531.008 761.152 527.557 761.083 524.308C762.202 520.186 764.425 519.228 768.071 520.476C770.983 521.473 774.015 522.308 777.621 522.079C778.734 523.129 778.429 524.268 778.269 525.753C778.067 526.557 778.038 526.977 778.002 527.713Z" fill="#61B7E6"></path><path d="M720.612 323.439C721.233 334.956 719.531 333.667 730.809 334.09C736.07 334.288 737.579 332.12 737.193 327.012C738.972 331.015 737.786 335.671 738.175 340.222C738.298 341.663 737.531 342.33 736.117 342.315C735.787 342.311 735.456 342.315 735.127 342.338C720.167 343.402 720.161 343.403 720.156 328.643C720.156 326.995 720.257 325.348 720.612 323.439Z" fill="#D14EB2"></path><path d="M825.65 542.074C828.83 543.051 830.144 547.283 834.568 545.991C834.967 545.989 834.952 546.433 834.93 546.653C829.801 550.828 824.695 554.783 819.301 558.918C816.142 560.387 814.495 557.972 812.15 556.632C811.796 556.127 811.694 555.899 811.816 555.371C816.47 550.774 820.9 546.477 825.65 542.074Z" fill="#F17187"></path><path d="M415.412 503.687C409.584 501.32 403.857 499.606 397.855 499.287C394.303 499.098 395.129 496.817 395.019 494.785C394.865 491.927 396.768 492.041 398.673 492.26C405.784 493.075 412.792 494.318 419.472 497.776C419.068 500.422 418.274 502.615 415.412 503.687Z" fill="#4E99D0"></path><path d="M361.72 284.288C362.093 285.335 361.954 286.555 363.492 286.922C367.728 287.932 371.96 288.961 376.595 290C371.172 296.515 360.791 297.47 349.888 292.037C353.949 289.334 357.673 286.857 361.72 284.288Z" fill="#7048D5"></path><path d="M347.66 442.259C348.016 444.563 347.923 446.671 345.334 447.964C344.401 448.976 343.644 449.572 342.114 449.282C333.606 445.662 325.456 442.177 317.098 438.404C316.448 437.383 316.818 436.859 317.658 436.261C327.71 438.392 337.388 440.908 347.66 442.259Z" fill="#416AD1"></path><path d="M480.604 129.967C480.102 131.823 479.783 133.355 479.384 135.27C478.034 129.506 476.068 124.469 468.633 122.837C475.278 120.371 477.692 115.735 479.315 109.379C481.048 115.141 482.363 120.098 487.883 122.489C485.003 124.501 482.023 126.262 480.604 129.967Z" fill="#F8EC9C"></path><path d="M824.006 730.147C824.094 722.414 824.101 722.446 831.452 720.951C833.714 720.491 835.919 719.753 838.175 719.259C838.949 719.089 839.924 719.137 840.331 720.032C840.853 721.179 840.148 722.041 839.206 722.422C836.914 723.351 834.596 724.289 832.203 724.873C829.815 725.456 829.004 726.754 829.072 729.104C829.181 732.91 829.023 736.722 829.098 740.529C829.148 743.053 827.761 744.393 825.538 744.361C822.665 744.319 824.151 741.877 824.067 740.556C823.858 737.257 824.002 733.936 824.006 730.147Z" fill="#4076AF"></path><path d="M444.735 398.653C444.549 400.705 440.763 400.19 441.68 402.742C442.556 405.176 444.918 406.073 447.653 406.085C449.532 406.094 451.529 406.458 452.921 408.517C446.329 409.671 440.75 405.601 434.488 404.746C428.719 403.958 423.405 401.842 417.611 400.006C418.34 398.152 420.176 398.893 421.699 398.855C429.251 398.665 436.805 398.59 444.735 398.653Z" fill="#E3E8EF"></path><path d="M455.195 271.274C452.502 274.149 448.661 274.274 445.592 276.126C443.594 277.332 441.695 278.481 440.264 280.755C441.361 274.325 441.005 267.624 440.991 260.467C442.091 260.961 443.756 261.727 444.168 262.925C446.283 269.066 448.298 266.14 450.773 262.94C451.117 262.838 451.072 262.894 451.076 262.859C451.196 263.16 451.396 263.439 451.894 263.801C452.119 263.935 452.027 263.959 452.055 263.921C452.383 264.402 452.475 264.994 452.894 265.739C454.871 267.156 453.436 269.688 455.195 271.274Z" fill="#61D6EC"></path><path d="M581.908 208.442C590.739 210.027 595.617 207.184 598.011 198.3C600.489 199.496 602.987 200.986 606.809 201.939C600.075 205.156 595.488 209.207 592.81 215.571C591.312 217.873 589.597 218.618 586.925 217.272C585.391 214.108 584.086 211.234 581.908 208.442Z" fill="#F8EC9C"></path><path d="M281.327 365.787C274.843 362.258 268.709 358.633 262.333 354.732C260.229 352.575 258.687 350.567 259.617 347.345C260.686 346.286 261.736 346.24 262.597 346.766C269.743 351.143 277.45 354.622 284.089 360.396C284.379 362.896 283.157 364.36 281.327 365.787Z" fill="#61B7E6"></path><path d="M622.329 227.324C623.181 225.933 622.659 224.268 624.501 223.403C625.183 228.555 626.933 232.978 633.61 234.348C628.064 236.264 625.277 239.698 623.577 245.68C622.585 239.328 619.578 236.209 613.466 235.281C617.331 232.803 621.268 231.771 622.329 227.324Z" fill="#F17187"></path><path d="M276.403 595.62C274.425 595.8 273.161 597.528 271.252 598.638C269.261 599.838 268.508 598.439 267.412 597.109C266.999 596.571 266.769 596.334 266.295 596.034C265.877 595.819 265.702 595.665 265.267 595.278C265.007 595.044 265.01 594.99 264.983 594.992C264.808 594.83 264.66 594.666 264.254 594.295C263.628 593.717 263.26 593.346 262.626 592.922C262.002 592.798 261.686 592.641 261.216 592.216C260.374 591.258 259.729 590.484 259.029 589.405C257.346 587.883 257.015 586.485 258.413 584.877C259.623 583.486 260.317 581.758 261.747 580.096C266.78 585.024 271.502 590.165 276.403 595.62Z" fill="#7048D5"></path><path d="M657.392 339.285C657.271 340.887 657.229 342.122 657.26 344.096C657.334 344.835 657.147 344.953 657.043 344.99C653.559 347.526 649.771 346.763 646.094 346.214C643.113 345.769 642.89 343.399 642.982 340.492C642.559 335.356 644.562 333.289 649.364 333.985C651.811 334.34 654.316 334.291 657.029 334.807C657.649 336.415 657.442 337.673 657.392 339.285Z" fill="#F17187"></path><path d="M746.505 303.02C747.221 306.444 746.662 310.052 750.176 312.434C751.715 313.477 751.295 315.547 750.817 317.066C750.297 318.72 748.57 317.923 747.357 318.041C746.044 318.168 744.711 318.095 743.387 318.105C735.237 318.161 735.237 318.16 735.682 309.341C740.132 308.456 743.744 306.729 746.505 303.02Z" fill="#F17187"></path><path d="M232.164 548.337C231.818 548.267 231.422 548.073 231.222 547.982C230.445 547.571 230.542 546.961 230.268 546.214C230.13 545.975 230.102 545.913 230.104 545.877C229.914 540.616 228.526 535.634 227.062 530.271C229.137 528.859 229.643 530.529 230.38 531.771C233.035 536.244 233.032 536.246 237.001 532.479C238.638 536.545 239.94 540.682 241.28 545.194C240.037 549.491 236.815 550.528 232.164 548.337Z" fill="#F17187"></path><path d="M315.398 351.822C314.963 348.42 315.093 345.118 314.957 341.827C314.842 339.051 315.866 337.342 318.689 337.056C321.345 336.787 324.144 336.472 324.655 340.666C324.984 341.429 325.146 341.916 325.143 342.401C325.069 353.555 326.353 351.946 315.398 351.822Z" fill="#4E99D0"></path><path d="M237.351 532.08C236.922 533.286 236.392 534.13 236.119 535.05C235.639 536.664 234.559 537.651 232.988 537.576C231.37 537.499 230.645 536.114 230.06 534.703C229.402 533.115 229.525 531.125 227.43 529.975C226.444 527.151 225.798 524.431 225.162 521.322C228.023 520.939 230.875 520.946 234.222 520.943C235.601 524.539 236.484 528.146 237.351 532.08Z" fill="#F89A60"></path><path d="M760.737 581.199C761.921 583.037 762.862 584.46 765.527 583.402C766.964 582.832 768.761 583.17 770.825 583.2C768.279 587.367 764.097 590.153 760.232 593.755C759.765 594.224 759.515 594.447 759.044 594.786C758.378 595.201 757.933 595.501 757.23 595.876C754.303 596.502 752.38 595.191 750.505 593.042C753.719 588.884 757.072 585.1 760.737 581.199Z" fill="#A331A4"></path><path d="M650.869 268.63C646.816 268.872 643.508 271.176 639.647 272.937C638.443 265.118 640.734 258.221 646.02 251.903C646.464 251.72 646.68 251.821 646.993 252.266C645.011 258.611 647.871 263.455 650.869 268.63Z" fill="#F17187"></path><path d="M358.691 515.801C357.454 515.98 356.272 516.369 355.603 518.274C353.237 518.925 351.549 517.701 350.026 516.481C346.751 513.856 343.627 513.142 340.282 516.299C339.57 516.971 338.588 517.352 337.201 517.253C334.822 518.365 332.778 519.566 330.401 520.766C329.544 516.59 333.212 515.25 335.528 513.302C343.526 506.577 343.637 506.681 352.649 511.869C354.637 513.014 356.534 514.316 358.691 515.801Z" fill="#86EFD8"></path><path d="M674.838 221.527C679.448 220.051 682.726 215.421 688.443 216.101C688.838 216.116 688.872 216.099 688.883 216.109C689.048 216.253 689.201 216.387 689.159 216.757C688.996 217.417 689.028 217.84 689.082 218.582C690.482 222.755 692.69 226.462 690.919 231.079C690.306 231.372 690.028 231.41 689.376 231.256C689.003 231.063 688.983 230.981 688.942 230.99C688.795 230.853 688.689 230.707 688.33 230.471C687.92 230.271 687.764 230.161 687.324 230.015C686.901 229.844 686.761 229.709 686.344 229.48C685.903 229.28 685.738 229.173 685.283 229.022C684.86 228.838 684.727 228.7 684.333 228.443C684.071 228.325 683.723 227.993 683.487 227.944C682.926 227.776 682.634 227.6 682.207 227.174C682.037 226.98 682.008 226.993 682.012 226.978C681.848 226.81 681.68 226.657 681.271 226.262C680.866 225.717 680.703 225.414 680.286 225.028C679.863 224.802 679.693 224.657 679.276 224.286C679.029 224.059 679.015 223.979 678.974 223.983C677.785 222.871 675.958 223.06 674.838 221.527Z" fill="#D14EB2"></path><path d="M447.076 200.532C441.907 201.841 437.893 200.114 435.451 195.052C435.081 194.287 434.83 192.978 433.22 193.97C431.069 195.335 429.58 194.757 428.349 192.509C429.963 188.387 431.093 184.444 432.013 180.022C432.43 179.438 432.792 179.397 433.38 179.702C435.893 188.069 438.339 196.149 447.076 200.532Z" fill="#F8EC9C"></path><path d="M619.76 538.4C619.466 534.045 621.287 531.212 625.134 530.37C628.321 529.673 630.488 531.691 631.478 534.629C632.61 537.986 631.83 541.123 628.534 542.622C624.533 544.442 621.521 542.786 619.76 538.4Z" fill="#A546D7"></path><path d="M642.683 340.16C644.836 348.068 651.348 344.119 656.479 345.024C657.004 347.395 657.069 349.764 657.028 352.568C654.765 352.997 652.608 352.989 650.451 352.986C642.847 352.974 642.1 352.217 641.999 344.395C641.989 343.566 641.998 342.736 641.969 341.469C642.096 340.763 642.28 340.516 642.683 340.16Z" fill="#EC427F"></path><path d="M685.138 199.195C684.044 198.921 683.323 198.6 682.339 198.132C681.524 197.624 681.535 197.009 681.204 196.243C680.971 195.724 680.928 195.425 680.946 194.495C682.448 191.404 692.739 188.078 695.082 189.368C695.637 189.673 696.039 190.255 696.75 190.939C695.566 197.137 691.348 200.069 685.138 199.195Z" fill="#FBC965"></path><path d="M763.057 822.552C761.566 823.601 758.567 821.615 758.032 825.565C751.728 824.815 745.949 822.015 739.488 820.222C737.506 819.044 738.33 816.933 737.143 815.248C745.845 816.516 754.286 819.518 763.057 822.552Z" fill="#3765A8"></path><path d="M598.836 290.129C601.736 290.925 604.748 293.506 606.096 287.943C608.738 292.569 608.911 298.111 609.923 303.804C611.014 306.081 610.261 308.18 610.449 310.578C610.502 312.008 610.593 313.051 610.579 314.471C609.686 314.745 609.21 314.308 608.998 313.266C606.538 310.211 605.207 306.821 603.545 303.232C603.159 302.307 602.928 301.683 602.473 300.791C602.207 300.3 602.1 300.102 601.838 299.604C600.681 296.32 598.344 293.799 598.836 290.129Z" fill="#F17187"></path><path d="M625.725 440.269C628.311 440.023 630.799 439.902 633.284 439.942C659.316 440.353 685.306 438.994 711.309 438.176C714.464 438.077 717.591 438.247 720.73 439.661C709.374 440.029 697.842 439.284 686.438 440.175C666.507 441.731 646.592 440.505 626.188 440.94C625.697 440.911 625.625 440.469 625.725 440.269Z" fill="#4996AF"></path><path d="M769.262 337.084C769.7 339.87 769.63 342.692 769.932 345.474C770.394 349.73 768.401 350.802 764.471 350.888C760.077 350.984 760.167 348.385 760.208 345.405C760.242 342.92 760.184 340.434 760.291 337.505C763.245 338.295 766.068 340.939 769.262 337.084Z" fill="#A331A4"></path><path d="M203.793 447.385C202.445 449.781 201.744 452.926 198.725 452.368C195.515 451.776 194.657 448.692 194.545 445.807C194.422 442.659 195.782 439.975 198.577 438.384C200.219 437.449 201.346 438.828 202.249 440.003C203.838 442.07 204.278 444.456 203.793 447.385Z" fill="#6DEFC4"></path><path d="M594.477 372.249C590.249 365.613 595.463 361.424 598.739 357.292C602.887 352.058 604.857 346.234 606.031 339.933C606.26 338.704 606.667 337.73 608.11 337.019C607.209 347.488 602.224 356.738 598.023 366.638C597.821 367.12 597.696 367.254 597.46 367.64C597.25 368.067 597.149 368.241 596.989 368.71C596.8 369.147 596.669 369.289 596.434 369.701C595.944 370.462 595.558 370.953 595.127 371.759C595.082 372.073 594.695 372.302 594.477 372.249Z" fill="#A331A4"></path><path d="M822.664 439.62C824.015 438.123 825.197 437.278 826.675 438.801C827.478 439.627 828.404 440.411 828.95 441.394C830.898 444.897 829.965 448.175 827.722 451.148C826.753 452.432 825.207 453.07 823.767 451.993C820.746 449.731 820.266 446.496 820.979 443.044C821.206 441.945 821.929 440.949 822.664 439.62Z" fill="#6DEFC4"></path><path d="M182.995 691.383C183.971 690.074 184.657 688.326 186.786 689.858C187.082 698.371 187.101 706.725 187.062 715.545C186.048 716.795 185.008 717.024 183.522 716.228C183.088 709.302 182.981 702.644 182.865 695.522C182.776 694.87 182.697 694.682 182.755 694.223C182.93 693.217 182.968 692.484 182.995 691.383Z" fill="#4483B7"></path><path d="M261.976 579.559C263.188 583.598 258.07 584.925 258.873 588.788C255.148 586.944 252.348 583.626 249.198 580.268C252.381 579.016 254.251 576.138 257.047 573.963C259.248 575.12 260.464 577.267 261.976 579.559Z" fill="#A331A4"></path><path d="M697.441 219.381C696.642 215.715 699.046 216.14 701.192 215.994C705.993 215.667 711.043 217.249 715.883 214.065C716.907 220.178 716.907 220.178 707.368 222.832C703.894 221.759 700.77 220.779 697.441 219.381Z" fill="#F17187"></path><path d="M746.911 302.646C744.839 307.534 742.296 311.084 736.175 309.115C735.754 308.265 735.686 307.547 735.722 306.482C735.249 304.515 735.588 302.845 735.716 300.814C740.245 297.582 746.113 298.525 746.911 302.646Z" fill="#F89A60"></path><path d="M310.123 373.303C311.645 369.33 314.097 367.337 317.93 369.248C320.682 370.621 321.204 373.328 320.078 376.129C319.208 378.295 317.556 379.693 315.077 379.433C311.697 379.077 310.277 376.86 310.123 373.303Z" fill="#61B7E6"></path><path d="M798.125 523.866C795.156 524.698 792.356 522.429 789.002 523.772C789.273 519.16 790.797 514.721 792.542 510.02C794.497 512.77 795.787 516.246 800.585 516.015C800.425 517.49 799.884 518.963 799.21 520.75C798.518 521.409 798.506 522.002 798.313 522.827C798.201 523.27 798.18 523.44 798.125 523.866Z" fill="#F89A60"></path><path d="M205.431 548.7C205.616 552.106 203.364 553.229 200.227 554.046C197.495 552.599 195.108 550.944 192.444 549.122C191.871 548.457 191.574 547.959 191.187 547.187C195.159 547.44 196.608 545.102 196.987 541.167C199.245 542.701 201.478 544.629 203.854 546.865C204.495 547.537 204.467 548.198 205.109 548.667C205.395 548.692 205.417 548.709 205.431 548.7Z" fill="#F17187"></path><path d="M358.998 817.379C364.441 817.254 370.085 816.282 375.905 818.059C373.989 821.104 371.809 823.792 369.63 826.479C366.023 823.448 362.59 820.563 358.998 817.379Z" fill="#4076AF"></path><path d="M824.62 656.326C825.911 656.29 826.97 656.589 828.361 656.867C829.306 661.664 828.898 666.487 828.65 671.299C828.577 672.706 828.338 674.597 826.294 674.516C824.223 674.433 824.274 672.644 824.279 671.134C824.293 666.31 824.348 661.486 824.62 656.326Z" fill="#2C428C"></path><path d="M435.666 512.619C432.828 512.543 430.933 514.134 429.162 516.578C426.493 514.025 423.997 511.186 421.304 508.076C422.381 505.669 425.528 505.718 426.773 503.025C430.793 505.201 432.966 508.95 435.666 512.619Z" fill="#61D6EC"></path><path d="M282.168 555.363C284.474 554.781 287.013 555.57 289.712 554.142C292.549 556.229 293.798 559.203 295.047 562.558C292.851 566.721 290.088 565.538 287.857 563.234C285.7 561.006 284.124 558.216 282.168 555.363Z" fill="#D14EB2"></path><path d="M430.22 891.289C434.613 891.659 439.082 893.127 444.204 892.21C445.43 894.285 446.211 896.296 446.967 898.659C443.227 903.914 440.539 900.371 437.497 897.698C436.031 894.295 432.581 893.66 430.22 891.289Z" fill="#315BA3"></path><path d="M697.121 219.453C700.836 218.725 703.955 220.045 706.896 222.522C706.716 223.054 706.442 223.23 706.033 223.598C705.627 224.343 705.103 224.465 704.456 224.823C704.334 225.061 704.115 225.038 704.074 225.141C703.259 226.086 702.704 227.167 701.221 227.746C700.919 227.92 701.005 227.983 700.964 227.947C700.603 228.416 700.16 228.761 699.3 228.968C697.566 229.087 696.553 230.029 695.219 231.049C694.713 231.303 694.442 231.312 693.857 231.061C692.565 228.854 692.869 227.11 694.644 225.25C695.127 224.116 695.34 223.288 695.783 222.233C696.222 221.773 696.437 221.543 696.803 221.132C696.991 220.547 697.033 220.148 697.121 219.453Z" fill="#D14EB2"></path><path d="M405.462 535.513C406.192 540.26 404.346 542.927 400.54 543.231C396.562 543.549 394.245 540.968 394.365 535.781C398.107 533.565 401.621 532.703 405.462 535.513Z" fill="#7048D5"></path><path d="M605.554 146.641C602.121 147.294 600.381 143.707 596.868 144.012C595.941 143.239 595.469 142.349 594.772 141.699C593.633 140.637 593.468 139.305 594.031 138.132C594.664 136.813 595.846 135.901 597.533 136.714C598.7 137.277 599.281 136.213 600.411 135.652C601.786 137.538 603.165 139.224 605.764 140.075C607.364 142.265 606.49 144.292 605.554 146.641Z" fill="#A5FBD0"></path><path d="M728.509 429.728C728.288 431.167 727.061 430.992 725.909 430.992C703.96 430.981 682.011 430.969 660.063 430.938C659.585 430.937 659.107 430.705 658.332 430.294C681.379 429.873 704.724 429.74 728.509 429.728Z" fill="#C2F9DA"></path><path d="M629.027 144.651C626.694 143.592 624.177 144.105 621.314 144.05C618.729 142.969 618.253 140.872 617.824 138.458C620.356 137.976 622.916 138.282 625.059 135.896C626.12 136.256 626.774 137.132 628.183 136.771C629.825 136.35 631.513 136.461 632.088 138.531C632.647 140.543 631.852 141.857 629.884 142.631C629.473 142.792 629.359 143.706 629.027 144.651Z" fill="#A5FBD0"></path><path d="M780.322 403.839C775 398.659 780.892 396.437 782.434 392.992C788.596 398.918 788.666 400.151 784.271 404.771C782.307 406.835 781.582 405.432 780.322 403.839Z" fill="#A546D7"></path><path d="M579.204 397.691C575.03 398.047 571.054 398.137 566.735 398.41C565.023 397.763 565.765 396.744 566.538 396.384C570.645 394.475 574.024 391.277 578.703 389.913C581.189 389.226 582.462 387.351 584.404 385.82C583.519 389.879 582.102 393.943 579.204 397.691Z" fill="#0B191F"></path><path d="M562.319 137.401C561.664 134.164 559.54 132.665 557.076 131.628C558.484 130.148 559.686 128.82 560.96 127.567C562.161 126.384 561.533 124.255 563.628 123.036C563.98 126.808 565.768 129.476 570.535 131.038C565.801 132.129 564.787 135.551 562.319 137.401Z" fill="#C2F9DA"></path><path d="M236.5 400.598C235.925 398.514 237.306 397.546 238.269 396.546C239.26 395.519 240.111 392.71 241.841 394.405C243.552 396.081 247.109 397.536 245.292 401.114C244.363 402.946 243.918 405.715 241.487 405.9C238.353 406.138 238.318 402.583 236.5 400.598Z" fill="#A546D7"></path><path d="M205.452 637.909C204.242 636.541 201.838 637.776 201.558 636.014C201.345 634.681 203.438 635.113 204.032 633.752C210.121 632.55 216.119 633.123 222.549 632.941C222.212 634.038 220.467 634.7 221.866 636.756C216.626 637.563 211.194 636.685 205.452 637.909Z" fill="#2C428C"></path><path d="M719.978 300.418C718.661 304.01 710.45 307.367 708.091 305.669C706.141 304.265 707.276 301.997 706.918 299.713C711.269 299.058 715.686 298.028 719.978 300.418Z" fill="#F89A60"></path><path d="M309.948 311.071C308.275 312.7 306.753 314.055 305.038 315.684C304.679 316.078 304.513 316.198 304.067 316.196C303.551 315.742 303.386 315.379 303.274 314.688C303.193 313.817 303.035 313.262 302.946 312.428C306.617 312.293 307.584 309.015 310.243 307.11C307.473 306.541 305.318 306.097 302.89 305.434C303.105 304.514 303.594 303.814 304.233 302.692C307.948 300.187 310.949 302.585 313.989 303.712C315.553 304.293 314.989 305.876 313.922 306.955C312.651 308.239 311.374 309.517 309.948 311.071Z" fill="#0B191F"></path><path d="M426.931 502.533C427.046 506.525 425.093 507.943 421.343 507.669C419.274 506.595 417.442 505.384 415.34 503.978C416.394 501.935 417.716 500.088 419.336 498.155C422.264 499.031 424.796 500.165 426.931 502.533Z" fill="#61B7E6"></path><path d="M604.005 403.573C596.951 406.905 592.238 405.226 590.969 398.846C596.122 397.72 601.006 397.758 604.005 403.573Z" fill="#E3E8EF"></path><path d="M641.041 819.391C645.396 818.76 649.837 817.086 654.735 818.675C655.165 819.149 655.291 819.347 655.233 819.845C652.859 822.521 650.801 826.738 648.081 826.354C645.524 825.994 643.47 822.052 641.041 819.391Z" fill="#3765A8"></path><path d="M845.617 540.191C848.199 540.529 850.643 540.769 851.717 543.796C852.09 546.352 850.905 548.278 849.87 550.629C848.674 550.393 847.675 549.81 846.648 549.281C840.953 546.35 840.814 545.437 845.617 540.191Z" fill="#F17187"></path><path d="M249.064 474.733C245.009 470.208 248.042 466.892 250.417 463.056C252.212 465.839 256.225 467.476 254.62 471.185C253.928 472.784 252.936 476.529 249.064 474.733Z" fill="#61B7E6"></path><path d="M223.212 491.559C218.367 487.414 216.764 481.021 214.124 475.263C212.812 472.401 212.122 473.299 211.032 475.059C209.576 477.412 208.593 480.096 205.828 481.843C208.015 477.32 210.564 472.715 213.472 467.46C215.646 476.438 219.103 483.934 223.212 491.559Z" fill="#F8EC9C"></path><path d="M259.216 486.015C257.708 482.254 260.777 480.779 262.345 478.7C262.997 477.837 263.854 478.713 264.261 479.441C265.329 481.354 268.004 482.802 266.641 485.47C265.777 487.159 265.144 489.626 263.034 489.901C260.94 490.175 260.626 487.541 259.216 486.015Z" fill="#4E99D0"></path><path d="M771.02 467.011C772.04 465.572 772.889 464.435 774.06 462.867C776.18 466.743 779.861 469.693 775.497 473.904C774.375 474.986 773.502 475.761 772.381 474.182C770.924 472.131 767.569 470.439 771.02 467.011Z" fill="#61B7E6"></path><path d="M762.664 479.545C764.34 481.875 766.992 483.762 764.25 486.606C763.164 487.733 762.647 490.744 760.601 489.32C758.75 488.032 755.73 485.98 758.138 482.86C759.233 481.441 758.924 477.884 762.664 479.545Z" fill="#4E99D0"></path><path d="M750.099 592.812C752.73 592.918 754.268 594.81 756.649 595.809C755.701 597.008 754.432 598.064 752.983 599.379C752.123 601.512 750.821 602.566 748.436 602.543C747.13 601.117 746.188 599.816 745.082 598.21C746.555 596.255 748.193 594.606 750.099 592.812Z" fill="#7048D5"></path><path d="M782.541 457.353C782.086 454.769 782.111 452.56 784.85 451.9C786.683 451.458 788.202 452.329 788.7 454.19C789.385 456.743 788.912 459.828 787.004 461.02C784.321 462.697 783.994 459.084 782.541 457.353Z" fill="#61B7E6"></path><path d="M428.015 192.389C429.539 192.941 430.589 194.292 432.71 194.164C432.993 196.471 433.424 199.308 430.336 199.627C427.988 199.869 425.099 202.984 423.032 198.604C424.581 196.386 426.191 194.513 428.015 192.389Z" fill="#F7CDDE"></path><path d="M393.657 345.458C395.329 344.482 396.19 342.887 398.294 343.061C398.691 347.041 398.759 351.027 398.753 355.462C396.332 356.405 395.38 354.628 393.916 353.01C392.132 350.545 392.254 348.187 393.657 345.458Z" fill="#ED4FDE"></path><path d="M391.439 306.536C392.966 304.036 394.779 303.237 397.067 304.665C398.841 305.773 399.349 307.52 398.602 309.451C397.886 311.302 396.543 312.641 394.404 312.163C391.636 311.544 390.711 309.597 391.439 306.536Z" fill="#A546D7"></path><path d="M769.679 336.679C768.329 338.768 768.026 341.229 764.835 341.16C761.996 341.1 762.115 338.804 760.684 337.266C760.361 336.302 760.306 335.541 760.327 334.406C760.571 333.87 760.737 333.708 761.232 333.434C763.852 333.199 766.081 332.55 768.719 332.612C769.202 332.889 769.348 333.071 769.549 333.599C769.654 334.727 769.704 335.509 769.679 336.679Z" fill="#D14EB2"></path><path d="M172.177 545.275C176.454 545.753 177.425 543.482 176.993 539.445C182.729 545.009 182.487 546.403 174.619 550.938C172.636 549.592 172.977 547.389 172.177 545.275Z" fill="#F17187"></path><path d="M236.021 459.806C235.747 458.128 235.439 456.83 235.361 455.519C235.241 453.486 235.813 451.752 238.298 451.955C240.505 452.135 241.344 453.716 241.298 455.773C241.242 458.272 240.026 460.261 238.025 461.588C236.785 462.41 236.433 461.09 236.021 459.806Z" fill="#61B7E6"></path><path d="M706.73 506.139C708.456 509.985 705 511.072 703.283 511.795C701.61 512.499 699.741 509.728 699.317 508.183C698.635 505.703 701.253 504.09 703.036 503.16C704.619 502.335 705.31 504.915 706.73 506.139Z" fill="#86EFD8"></path><path d="M260.339 346.536C259.147 349.551 261.829 351.359 262.053 354.107C261.27 354.289 260.45 354.12 259.324 354.039C258.576 354.571 258.221 355.127 257.238 355.185C254.61 353.074 255.435 350.301 255.301 347.346C256.263 345.557 255.838 343.999 256.123 342.558C256.289 341.724 256.663 340.869 257.663 341.022C258.62 341.169 258.506 342.335 259.159 343.228C259.535 344.06 259.706 344.634 260.02 345.459C260.188 345.899 260.248 346.077 260.339 346.536Z" fill="#4E99D0"></path><path d="M459.765 296.061C460.041 296.462 459.963 296.877 459.831 297.606C459.759 301.231 457.487 303.243 455.083 305.446C453.178 305.14 452.521 304.144 452.732 302.271C453.279 300.489 453.653 299.065 454.026 297.26C455.55 293.406 455.911 289.683 456.506 285.595C457.3 288.3 457.286 291.423 456.661 294.47C455.906 298.152 458.206 296.055 459.765 296.061Z" fill="#030727"></path><path d="M183.092 716.416C184.209 715.975 185.224 715.99 186.621 716.008C187.042 720.029 187.081 724.047 187.132 728.526C186.044 729.006 184.945 729.023 183.436 729.006C183.014 724.939 183.003 720.906 183.092 716.416Z" fill="#315BA3"></path><path d="M429.249 212.382C431.478 212.008 433.735 211.997 436.415 211.996C435.598 215.338 434.356 218.668 432.945 222.457C431.565 218.803 430.421 215.774 429.249 212.382Z" fill="#F3ACE1"></path><path d="M435.241 281.726C433.25 281.379 431.963 280.356 431.384 278.23C431.232 277.185 431.294 276.375 431.531 275.196C431.547 274.34 431.521 273.846 431.956 273.164C433.877 271.914 431.94 268.501 434.292 268.72C436.845 268.958 435.913 271.864 435.929 273.66C435.952 276.247 436.425 278.885 435.241 281.726Z" fill="#61D6EC"></path><path d="M762.586 451.586C762.942 454.653 760.958 456.224 759.524 458.179C754.901 452.814 754.901 452.68 759.591 447.969C760.534 449.082 761.463 450.178 762.586 451.586Z" fill="#61D6EC"></path><path d="M586.625 217.495C588.353 216.894 590.255 217.131 592.282 215.969C591.451 220.346 590.022 224.755 589.552 230.657C588.434 225.627 587.577 221.772 586.625 217.495Z" fill="#F17187"></path><path d="M703.113 275.577C703.176 272.785 704.332 270.887 706.844 271.026C708.429 271.113 709.672 272.736 710.099 274.415C710.631 276.507 708.948 277.442 707.51 278.148C705.279 279.242 704.29 277.368 703.113 275.577Z" fill="#EC427F"></path><path d="M405.68 535.424C402.335 536.253 398.533 532.662 395.499 536.759C395.38 536.653 395.236 536.564 395.149 536.436C395.059 536.304 395.023 536.135 394.788 535.733C394.792 534.946 394.972 534.408 395.281 533.613C395.426 533.09 395.442 532.824 395.85 532.475C396.242 532.391 396.296 532.294 396.344 532.266C396.439 531.985 396.484 531.731 396.894 531.349C401.272 529.887 404.26 530.762 405.68 535.424Z" fill="#F3ACE1"></path><path d="M718.735 546.235C715.66 546.049 713.028 545.913 710.34 545.774C711.021 544.469 712.2 544.942 713.047 545.04C717.563 545.561 719.248 543.825 719.091 539.149C718.817 531.025 719.065 531.021 710.879 530.999C708.724 530.994 706.57 530.958 703.911 530.922C708.325 528.744 713.505 530.351 718.542 529.872C719.464 529.784 720.228 530.217 720.125 531.257C719.63 536.255 721.338 541.393 718.735 546.235Z" fill="#86EFD8"></path><path d="M344.142 348.383C345.567 347.213 346.926 346.786 348.615 347.997C350.413 349.287 350.285 350.982 350.386 353.001C350.344 353.949 350.28 354.487 350.049 355.406C349.78 356.024 349.637 356.254 349.16 356.717C345.09 357.71 345.087 354.961 344.46 352.304C344.164 350.956 344.114 349.87 344.142 348.383Z" fill="#ED4FDE"></path><path d="M278.458 505.367C278.61 503.687 277.97 502.255 279.965 500.796C281.448 505.901 280.878 510.552 280.177 516.622C277.524 512.288 278.881 508.939 278.458 505.367Z" fill="#4E99D0"></path><path d="M823.055 502.381C824.785 501.874 825.03 500.637 825.197 498.886C827.433 504.551 826.748 510.675 825.49 517.107C825.218 512.427 824.433 507.56 823.055 502.381Z" fill="#F89A60"></path><path d="M323.841 488.195C321.18 487.884 319.831 486.634 320.215 484.236C320.46 482.71 321.527 481.535 323.056 481.164C324.844 480.729 325.88 482.117 326.453 483.403C327.445 485.631 326.165 487.106 323.841 488.195Z" fill="#2C428C"></path><path d="M656.702 584.845C653.651 587.734 653.006 584.302 652.105 583.204C650.454 581.191 652.791 579.968 653.927 578.802C655.384 577.307 656.131 579.151 657.124 579.855C659.524 581.556 658.662 583.077 656.702 584.845Z" fill="#86EFD8"></path><path d="M693.849 231.343C694.146 231.293 694.566 231.244 694.775 231.269C694.638 234.004 696.834 233.859 698.681 234.609C694.278 238.264 689.688 237.096 684.835 234.427C685.877 233.013 689.531 236.206 689.031 231.4C689.179 231.052 689.356 231.041 689.798 231.038C691.184 231.581 692.354 231.624 693.849 231.343Z" fill="#030727"></path><path d="M453.099 154.473C453.667 151.969 454.006 149.044 457.432 150.318C458.461 150.7 459.845 152.567 459.624 153.343C459.209 154.798 457.984 156.489 456.65 157.088C455.19 157.744 454.499 155.498 453.099 154.473Z" fill="#D14EB2"></path><path d="M342.775 457.733C342.983 458.793 342.959 459.597 342.906 460.803C338.489 458.677 334.004 456.295 330.1 453.043C330.273 452.666 330.445 452.288 330.618 451.911C334.593 453.767 338.568 455.622 342.775 457.733Z" fill="#2C428C"></path><path d="M401.116 221.55C398.934 221.636 397.534 223.381 395.335 223.991C396.949 220.814 397.306 217.024 399.073 212.083C399.958 215.971 400.546 218.555 401.116 221.55Z" fill="#F17187"></path><path d="M371.275 577.285C373.937 575.55 374.833 577.501 375.68 579.052C376.464 580.489 375.414 581.589 374.41 582.483C373.178 583.581 371.998 583.146 370.871 582.179C368.957 580.538 369.623 579.016 371.275 577.285Z" fill="#4E99D0"></path><path d="M267.13 597.195C268.3 597.429 269.37 598.049 270.734 598.784C272.569 601.323 275.555 602.078 278.068 604.951C272.772 604.045 268.883 601.974 264.783 599.822C265.617 599.075 266.717 598.814 267.13 597.195Z" fill="#1B2859"></path><path d="M437.7 839.852C439.125 838.099 440.362 837.281 441.929 839.12C442.726 840.056 444.331 840.805 442.867 842.31C441.899 843.305 441.206 845.564 439.639 844.722C438.251 843.975 435.871 842.715 437.7 839.852Z" fill="#61D6EC"></path><path d="M582.303 841.402C583.803 839.36 584.942 837.596 587.357 840.166C589.221 842.149 587.887 843.115 586.588 844.03C583.776 846.011 583.363 843.023 582.303 841.402Z" fill="#61D6EC"></path><path d="M285.575 364.987C286.732 365.009 287.526 365.021 288.717 365.051C287.27 366.138 287.054 368.039 286.419 369.837C285.828 371.508 285.167 374.472 282.163 371.277C281.063 367.935 280.727 365.153 285.575 364.987Z" fill="#4E99D0"></path><path d="M250.148 441.91C247.902 439.453 249.525 438.006 250.961 436.608C252.263 435.34 252.976 436.692 253.787 437.408C254.868 438.362 255.683 439.547 254.491 440.799C253.454 441.889 252.688 444.521 250.148 441.91Z" fill="#61B7E6"></path><path d="M743.259 484.532C740.184 485.158 738.715 484.002 739.507 481.189C739.839 480.01 740.572 477.562 742.258 478.604C743.998 479.679 745.962 481.783 743.259 484.532Z" fill="#2C428C"></path><path d="M608.942 334.634C606.684 329.812 609.35 325.004 610.226 319.969C611.209 324.81 610.085 329.538 608.942 334.634Z" fill="#A331A4"></path><path d="M282.204 484.875C279.273 485.599 278.102 484.172 278.405 481.83C278.592 480.384 280.003 478.853 281.587 479.55C284.011 480.615 284.42 482.59 282.204 484.875Z" fill="#4483B7"></path><path d="M383.742 846.578C380.717 846.02 379.226 844.714 381.112 841.855C381.867 840.709 382.746 839.561 384.265 840.819C386.583 842.738 386.578 844.644 383.742 846.578Z" fill="#1B2859"></path><path d="M638.7 565.421C636.3 567.722 634.451 566.996 633.54 564.582C632.842 562.73 634.422 561.262 636.053 561.15C638.587 560.977 639.347 562.756 638.7 565.421Z" fill="#315BA3"></path><path d="M745.067 512.631C744.933 514.272 743.839 515.878 743.462 514.066C742.603 509.928 742.617 505.529 743.961 501.312C745.735 504.848 744.777 508.568 745.067 512.631Z" fill="#4E99D0"></path><path d="M769.735 333.5C769.345 333.849 769.158 333.677 768.954 333.252C766.644 330.347 767.554 327.093 767.56 324.076C767.566 320.599 766.67 318.291 762.396 318.068C761.79 317.802 761.562 317.664 761.093 317.207C762.76 315.324 764.991 316.365 767.064 316.134C769.26 315.889 769.945 317.101 769.914 319.13C769.844 323.771 769.876 328.413 769.735 333.5Z" fill="#A331A4"></path><path d="M259.153 345.039C258.418 344.348 257.981 343.33 257.505 342.223C256.388 343.535 258.045 345.757 255.748 346.827C255.329 344.562 255.242 342.214 255.249 339.435C257.132 339 258.999 338.879 259.02 341.878C259.727 342.986 259.774 343.819 259.153 345.039Z" fill="#61D6EC"></path><path d="M285.886 364.831C285.35 367.319 280.114 366.11 281.943 370.639C280.508 369.818 281.017 368.185 280.98 366.278C281.954 364.503 281.912 362.457 283.853 361.329C284.1 360.927 284.243 360.835 284.623 360.84C285.043 361.372 285.227 361.807 285.579 362.411C285.687 362.97 285.654 363.362 285.731 364.04C285.816 364.324 285.836 364.667 285.886 364.831Z" fill="#1B2859"></path><path d="M590.126 183.463C589.511 183.824 588.929 183.828 588.127 183.812C587.874 181.126 587.965 178.475 589.005 175.179C589.451 178.246 589.804 180.676 590.126 183.463Z" fill="#798CB4"></path><path d="M317.701 435.917C317.696 436.634 317.414 437.121 317.012 437.862C314.005 437.06 311.297 435.693 307.685 432.839C311.871 434.063 314.648 434.875 317.701 435.917Z" fill="#2A50A0"></path><path d="M337.426 274.75C339.287 276.466 338.982 277.838 337.094 278.713C335.86 279.285 334.682 278.512 334.408 277.358C333.916 275.28 335.073 274.394 337.426 274.75Z" fill="#3765A8"></path><path d="M313.629 275.418C311.837 273.709 312.107 272.234 313.827 271.291C315.314 270.476 316.434 271.611 316.683 272.924C317.055 274.888 316.076 275.975 313.629 275.418Z" fill="#798CB4"></path><path d="M641.253 841.55C643.049 842.487 645.027 843.458 643.311 845.66C642.685 846.463 641.405 847.368 640.288 846.216C638.648 844.524 639.064 842.951 641.253 841.55Z" fill="#2C428C"></path><path d="M707.564 380.182C709.541 381.141 710.129 382.289 708.427 383.57C707.434 384.317 706.078 384.288 705.462 383.088C704.613 381.437 705.205 380.268 707.564 380.182Z" fill="#2C428C"></path><path d="M563.472 634.648C564.51 633.91 565.622 633.526 567.152 632.993C568.058 633.931 569.61 635.258 568.084 636.143C566.654 636.972 564.576 637.273 563.472 634.648Z" fill="#4076AF"></path><path d="M761.483 333.682C761.16 334.055 760.781 334.085 760.593 334.058C759.713 328.523 759.97 323.005 760.549 317.188C760.851 316.888 760.961 316.975 761.014 317.021C763.874 322.365 762.905 327.833 761.483 333.682Z" fill="#A331A4"></path><path d="M377.969 256.618C377.615 257.472 377.109 258.021 376.378 258.741C375.161 257.176 374.17 255.438 373.029 253.412C375.487 252.696 376.274 255.092 377.969 256.618Z" fill="#798CB4"></path><path d="M747.962 602.629C749.439 601.575 750.805 600.734 752.488 599.765C753.321 600.065 753.836 600.491 754.695 600.974C753.035 603.097 750.474 603.831 747.361 604.041C747.289 603.607 747.57 603.224 747.962 602.629Z" fill="#030727"></path><path d="M785.046 421.946C784.757 420.267 784.11 418.492 786.182 418.071C787.312 417.842 787.937 419.233 787.919 420.039C787.885 421.51 787.451 423.113 785.046 421.946Z" fill="#8796BE"></path><path d="M237.384 419.022C239.78 418.823 240.36 419.982 239.632 421.678C239.245 422.58 238.229 423.122 237.149 422.456C235.529 421.455 235.997 420.332 237.384 419.022Z" fill="#798CB4"></path><path d="M778.465 525.898C778.084 525.06 778.07 523.983 778.056 522.506C778.139 518.977 778.222 515.849 778.522 512.394C779.456 516.594 779.392 521.125 778.465 525.898Z" fill="#4E99D0"></path><path d="M674.406 221.189C676.107 221.929 677.39 222.665 678.804 223.694C675.798 223.175 672.661 222.364 669.273 221.293C670.677 221.083 672.332 221.134 674.406 221.189Z" fill="#030727"></path><path d="M241.117 374.229C240.983 375.961 240.807 377.53 238.863 376.436C237.095 375.441 238.149 374.148 238.927 373.116C240.259 371.35 240.625 372.789 241.117 374.229Z" fill="#C2F9DA"></path><path d="M613.063 862.438C613.378 862.022 613.672 861.981 614.184 861.898C614.828 864.482 613.965 866.878 613.034 869.622C611.061 867.532 613.893 865.231 613.063 862.438Z" fill="#315BA3"></path><path d="M413.463 590.13C412.623 586.95 414.284 585.831 417.67 586.023C417.11 587.035 416.146 588.027 415.073 589.286C414.566 589.718 414.169 589.884 413.463 590.13Z" fill="#86EFD8"></path><path d="M799.104 378.499C800.778 382.073 799.931 386.202 799.45 390.625C799.146 386.947 799.085 382.949 799.104 378.499Z" fill="#4076AF"></path><path d="M256.747 355.392C257.476 354.811 258.021 354.525 258.792 354.182C259.327 355.572 259.321 357 258.757 358.48C256.996 358.331 256.178 357.497 256.747 355.392Z" fill="#86EFD8"></path><path d="M181.992 798.384C183.218 801.699 182.647 805.529 182.242 809.699C182.002 806.316 181.955 802.58 181.992 798.384Z" fill="#1B2859"></path><path d="M773.651 590.007C772.666 591.879 770.594 592.815 768.41 594.118C768.688 591.408 770.365 589.943 773.651 590.007Z" fill="#030727"></path><path d="M447.78 130.304C446.299 131.165 445.279 131.127 444.889 129.589C444.649 128.642 445.164 127.852 446.007 127.734C447.628 127.509 448.467 128.271 447.78 130.304Z" fill="#61B7E6"></path><path d="M585.07 385.766C585.362 383.762 586.945 382.524 588.564 380.965C588.599 383.111 588.188 385.273 585.07 385.766Z" fill="#0B191F"></path><path d="M680.983 232.31C679.032 232.013 677.057 231.33 674.817 230.399C676.721 230.624 679.645 228.364 680.983 232.31Z" fill="#030727"></path><path d="M620.661 879.06C621.174 881.342 620.928 883.366 617.287 882.927C618.039 881.655 619.2 880.415 620.661 879.06Z" fill="#2A50A0"></path><path d="M783.852 371.564C784.228 370.116 784.793 369.343 785.815 370.617C786.289 371.208 786.824 372.192 785.987 372.808C785 373.536 784.14 373.176 783.852 371.564Z" fill="#C2F9DA"></path><path d="M554.024 167.245C553.545 167.612 553.135 167.649 552.416 167.694C551.895 166.261 552.046 164.908 553.09 163.318C554.233 164.541 553.958 165.795 554.024 167.245Z" fill="#798CB4"></path><path d="M699.635 531.883C699.759 534.743 700.678 537.695 698.926 540.684C698.59 540.521 698.617 540.163 698.787 539.572C698.295 538.067 698.534 536.726 698.775 534.922C698.648 534.445 698.498 534.299 698.562 533.855C698.651 533.438 698.665 533.176 698.828 532.551C698.977 532.187 699.386 531.903 699.635 531.883Z" fill="#86EFD8"></path><path d="M589.204 380.872C588.924 380.537 589.005 380.203 589.155 379.619C589.243 378.98 589.388 378.646 589.916 378.252C590.175 378.139 590.012 378.079 590.094 378.115C590.302 377.709 590.53 377.329 591.481 377.057C591.964 378.837 591.779 380.538 589.204 380.872Z" fill="#0B191F"></path><path d="M433.653 179.574C433.254 179.868 432.919 179.839 432.335 179.721C432.137 178.58 432.189 177.53 432.245 176.388C433.806 176.997 433.421 178.278 433.653 179.574Z" fill="#798CB4"></path><path d="M657.527 818.306C657.725 817.416 658.265 816.447 658.95 815.172C659.667 815.067 660.737 815.282 660.732 815.47C660.688 817.252 659 817.469 657.527 818.306Z" fill="#4076AF"></path><path d="M526.594 164.089C526.177 162.842 525.353 161.22 527.634 160.161C527.613 161.37 527.219 162.611 526.594 164.089Z" fill="#F8EC9C"></path><path d="M610.533 310.582C609.426 309.025 610.083 306.932 609.897 304.533C610.924 306.076 610.711 308.146 610.533 310.582Z" fill="#A331A4"></path><path d="M711.81 228.802C711.223 229.375 710.441 229.691 709.335 230.004C709.229 228.353 709.959 227.622 711.81 228.802Z" fill="#030727"></path><path d="M704.52 231.968C703.799 232.596 702.719 233.229 701.318 233.881C701.216 231.885 702.75 232.031 704.52 231.968Z" fill="#030727"></path><path d="M673.951 229.691C673.234 229.954 672.472 229.902 671.35 229.722C671.816 227.607 672.778 227.378 673.951 229.691Z" fill="#030727"></path><path d="M735.739 300.693C735.895 302.057 735.912 303.682 735.877 305.721C735.75 304.408 735.674 302.681 735.739 300.693Z" fill="#F17187"></path><path d="M708.626 230.002C707.875 230.632 706.756 231.256 705.309 231.895C705.244 229.856 706.808 230.024 708.626 230.002Z" fill="#030727"></path><path d="M594.244 372.202C594.258 372.196 594.673 372.158 594.877 372.116C596.262 373.234 596.263 374.201 594.072 374.704C593.244 373.844 593.263 373.198 593.924 372.401C594.215 372.23 594.23 372.208 594.244 372.202Z" fill="#0B191F"></path><path d="M564.052 739.606C563.434 739.98 562.842 739.951 561.808 739.892C561.317 738.669 561.269 737.476 561.5 735.932C564.477 735.562 563.641 737.787 564.052 739.606Z" fill="#FCFDFD"></path><path d="M394.67 431.27C394.977 432.71 395.037 434.417 395.052 436.549C393.425 435.31 393.932 433.423 394.67 431.27Z" fill="#0B191F"></path><path d="M701.28 227.939C701.763 227.071 702.606 226.221 703.742 225.307C704.053 226.868 703.604 228.08 701.28 227.939Z" fill="#030727"></path><path d="M325.722 782.094C325.975 782.356 325.961 782.657 325.931 783.41C325.194 783.949 323.86 784.175 323.844 784.102C323.559 782.846 324.931 782.832 325.722 782.094Z" fill="#8796BE"></path><path d="M657.519 339.442C657.234 338.408 657.154 337.164 657.169 335.554C658.328 336.433 657.944 337.841 657.519 339.442Z" fill="#1B2859"></path><path d="M610.419 876.018C610.04 875.023 609.793 873.802 611.521 873.042C611.466 873.915 611.074 874.876 610.419 876.018Z" fill="#315BA3"></path><path d="M778.425 509.757C777.142 509.47 777.006 508.555 777.696 507.246C778.089 507.856 778.303 508.658 778.425 509.757Z" fill="#4E99D0"></path><path d="M376.789 261.775C376.919 262.616 376.99 263.786 377.012 265.199C376.885 264.329 376.807 263.217 376.789 261.775Z" fill="#798CB4"></path><path d="M636.629 865.967C636.96 867.418 636.104 867.991 634.363 868.004C634.493 867.011 635.306 866.398 636.629 865.967Z" fill="#2C428C"></path><path d="M365.1 864.325C366.119 864.029 367.376 863.819 367.94 865.677C367.08 865.55 366.168 865.075 365.1 864.325Z" fill="#2C428C"></path><path d="M566.053 628.622C564.796 628.175 564.393 626.888 564.089 625.203C565.226 625.726 565.638 627.004 566.053 628.622Z" fill="#4076AF"></path><path d="M255.243 316.468C256.249 317.496 256.11 318.953 255.443 320.666C255.18 319.55 255.129 318.196 255.243 316.468Z" fill="#6DEFC4"></path><path d="M473.14 923.312C474.4 923.042 475.564 923.669 476.724 924.924C475.464 925.146 474.357 924.436 473.14 923.312Z" fill="#3765A8"></path><path d="M244.387 517.487C245.365 518.456 245.107 519.898 244.712 521.601C244.449 520.532 244.349 519.2 244.387 517.487Z" fill="#61B7E6"></path><path d="M258.895 595.68C257.994 595.584 257.05 595.125 255.918 594.401C256.945 594.073 258.268 593.72 258.895 595.68Z" fill="#030727"></path><path d="M657.042 363.785C656.818 363.017 656.948 362.364 657.209 361.406C657.795 361.375 658.25 361.648 658.95 362.03C659.153 362.568 659.111 362.998 658.974 363.738C658.385 363.998 657.891 363.949 657.042 363.785Z" fill="#1B2859"></path><path d="M328.097 451.673C327.467 451.319 327.113 450.996 326.759 450.673C326.976 450.519 327.242 450.196 327.4 450.242C328.092 450.445 329.189 450.472 328.097 451.673Z" fill="#2C428C"></path><path d="M593.852 374.863C593.916 375.878 593.668 376.643 592.403 377.019C592.101 377.104 592.019 377.024 591.978 376.985C591.618 376.556 591.526 376.112 591.913 375.406C592.198 375.188 592.003 375.001 592.1 375.094C592.268 374.794 592.501 374.545 593.153 374.441C593.431 374.461 593.712 374.728 593.852 374.863Z" fill="#0B191F"></path><path d="M614.906 858.595C613.825 857.883 613.911 856.694 614.714 855.24C614.965 856.082 614.991 857.146 614.906 858.595Z" fill="#315BA3"></path><path d="M699.19 229.221C699.459 228.664 699.906 228.329 700.637 227.953C700.807 228.83 700.932 229.993 699.19 229.221Z" fill="#030727"></path><path d="M647.286 252.447C646.888 252.405 646.706 252.182 646.396 251.782C646.587 250.968 646.927 250.188 647.819 250.733C647.968 250.823 647.607 251.747 647.286 252.447Z" fill="#2C428C"></path><path d="M698.801 534.78C698.973 535.75 699.009 537.053 698.987 538.848C698.841 537.93 698.753 536.522 698.801 534.78Z" fill="#61D6EC"></path><path d="M341.974 449.388C342.619 448.867 343.482 448.587 344.655 448.171C344.938 448.55 344.91 449.066 344.754 449.951C343.814 450.09 343.003 449.859 341.974 449.388Z" fill="#3765A8"></path><path d="M444.754 391.537C445.629 391.233 446.276 391.748 446.801 392.902C446.214 392.756 445.54 392.293 444.754 391.537Z" fill="#8658F1"></path><path d="M214.898 541.438C215.813 541.271 216.42 541.872 216.783 543.126C216.197 542.893 215.59 542.318 214.898 541.438Z" fill="#A331A4"></path><path d="M432.218 272.703C432.172 273.456 432.059 273.929 431.825 274.614C431.71 274.031 431.714 273.236 431.839 272.16C432.024 272.061 432.087 272.242 432.218 272.703Z" fill="#61B7E6"></path><path d="M758.273 826.198C758.889 826.139 759.738 826.309 760.795 826.735C760.172 826.803 759.338 826.615 758.273 826.198Z" fill="#3765A8"></path><path d="M456.571 274.702C456.235 274.208 456.074 273.484 455.94 272.386C456.977 272.595 457.113 273.454 456.571 274.702Z" fill="#030727"></path><path d="M702.682 530.776C702.529 531.784 701.616 531.957 700.231 531.899C700.688 531.525 701.513 531.165 702.682 530.776Z" fill="#86EFD8"></path><path d="M431.805 554.332C431.816 554.935 431.633 555.797 431.177 556.858C431.14 556.235 431.375 555.413 431.805 554.332Z" fill="#86EFD8"></path><path d="M326.751 596.155C326.394 596.885 325.851 596.965 325.161 596.174C325.564 595.978 326.08 595.996 326.751 596.155Z" fill="#4E48C6"></path><path d="M813.535 536.154C813.255 535.332 813.764 534.733 814.816 534.209C814.68 534.766 814.247 535.408 813.535 536.154Z" fill="#A331A4"></path><path d="M734.279 790.992C734.026 790.455 734.056 790.038 734.078 789.305C734.867 789.551 736.659 789.88 734.279 790.992Z" fill="#8796BE"></path><path d="M560.98 628.315C561.301 628.499 561.618 628.982 561.926 629.771C561.603 629.589 561.29 629.102 560.98 628.315Z" fill="#4076AF"></path><path d="M606.23 881.73C606.231 881.325 606.497 880.808 607.062 880.22C607.073 880.639 606.784 881.128 606.23 881.73Z" fill="#315BA3"></path><path d="M561.919 630.375C562.239 630.59 562.574 631.123 562.877 631.995C562.542 631.786 562.238 631.24 561.919 630.375Z" fill="#4076AF"></path><path d="M453.098 265.626C452.784 265.453 452.446 264.979 452.096 264.194C452.414 264.363 452.744 264.845 453.098 265.626Z" fill="#86EFD8"></path><path d="M579.74 398.555C580.129 398.833 581.054 398.472 580.826 399.47C580.56 399.331 580.294 399.191 579.859 398.794C579.691 398.536 579.732 398.557 579.74 398.555Z" fill="#F7CDDE"></path><path d="M577.82 531.624C577.173 531.481 576.976 530.969 577.635 530.194C577.847 530.472 577.878 530.894 577.82 531.624Z" fill="#2A50A0"></path><path d="M386.889 864.725C386.486 864.782 385.92 864.589 385.227 864.111C385.642 864.042 386.184 864.259 386.889 864.725Z" fill="#2C428C"></path><path d="M502.737 141.344C502.722 141.708 502.465 142.193 501.932 142.757C501.935 142.378 502.215 141.921 502.737 141.344Z" fill="#F8EC9C"></path><path d="M224.29 493.542C223.641 493.647 223.203 493.202 223.16 492.085C223.522 492.24 223.87 492.738 224.29 493.542Z" fill="#F8EC9C"></path><path d="M640.338 877.066C640.485 876.74 640.926 876.384 641.665 876.002C641.519 876.329 641.075 876.682 640.338 877.066Z" fill="#2C428C"></path><path d="M348.515 450.899C348.892 451.131 348.908 451.398 348.923 452.068C348.309 452.205 347.697 451.939 346.896 451.397C347.189 451.058 347.671 450.996 348.515 450.899Z" fill="#416AD1"></path><path d="M506.738 136.136C506.742 136.534 506.492 137.084 505.944 137.733C505.925 137.318 506.205 136.802 506.738 136.136Z" fill="#F8EC9C"></path><path d="M704.6 225.006C704.685 224.68 705.037 224.298 705.65 223.863C705.562 224.19 705.214 224.57 704.6 225.006Z" fill="#030727"></path><path d="M401.548 222.701C401.3 222.51 401.208 222.317 401.059 222.02C401.243 222.174 401.478 222.434 401.548 222.701Z" fill="#F17187"></path><path d="M637.298 878.985C637.464 878.645 637.927 878.333 638.682 878.001C638.514 878.326 638.055 878.669 637.298 878.985Z" fill="#2C428C"></path><path d="M811.779 555.156C812.04 555.071 812.1 555.55 812.089 555.791C812.217 556.493 812.089 556.875 811.416 557.292C810.872 557.333 810.652 557.276 810.483 556.882C810.861 556.11 811.189 555.676 811.779 555.156Z" fill="#A331A4"></path><path d="M225.901 320.646C225.226 320.51 225.023 319.988 225.685 319.191C225.912 319.473 225.953 319.903 225.901 320.646Z" fill="#3765A8"></path><path d="M341.132 637.347C341.419 637.096 341.881 637.027 342.69 637.031C342.574 637.711 342.016 637.926 341.132 637.347Z" fill="#1B2859"></path><path d="M508.757 133.221C508.781 133.606 508.56 134.142 508.068 134.801C508.036 134.407 508.274 133.889 508.757 133.221Z" fill="#F8EC9C"></path><path d="M829.571 575.26C829.325 574.632 829.697 574.244 830.636 574.084C830.568 574.46 830.203 574.831 829.571 575.26Z" fill="#A331A4"></path><path d="M380.969 860.673C380.555 860.749 379.965 860.573 379.242 860.105C379.669 860.017 380.231 860.219 380.969 860.673Z" fill="#2C428C"></path><path d="M558.802 857.701C558.425 857.735 557.885 857.521 557.176 857.065C557.55 857.032 558.095 857.243 558.802 857.701Z" fill="#6DEFC4"></path><path d="M205.308 548.435C204.956 548.381 204.516 548.07 204.037 547.465C204.405 547.508 204.812 547.843 205.308 548.435Z" fill="#D14EB2"></path><path d="M426.728 565.154C426.753 565.549 426.532 566.11 426.025 566.793C425.986 566.383 426.234 565.851 426.728 565.154Z" fill="#86EFD8"></path><path d="M680.926 193.815C681.007 193.865 681.066 194.123 681.03 194.174C680.994 194.224 680.756 194.114 680.756 194.114C680.756 194.114 680.846 193.765 680.926 193.815Z" fill="#F17187"></path><path d="M387.014 429.655C386.467 429.84 385.997 429.824 385.332 429.692C385.525 429.429 385.915 429.281 386.619 429.093C386.934 429.054 387.09 429.455 387.014 429.655Z" fill="#86EFD8"></path><path d="M771.529 583.233C771.566 582.849 771.877 582.414 772.477 581.944C772.446 582.333 772.124 582.758 771.529 583.233Z" fill="#A331A4"></path><path d="M357.539 814.901C357.826 815.116 357.886 815.412 357.962 816.163C356.92 816.411 356.746 815.847 357.539 814.901Z" fill="#4076AF"></path><path d="M557.031 856.595C556.579 856.709 555.968 856.524 555.204 856.049C555.657 855.937 556.265 856.117 557.031 856.595Z" fill="#6DEFC4"></path><path d="M606.333 420.843C606.453 420.458 606.865 420.198 607.529 419.964C607.904 420.918 607.266 420.945 606.333 420.843Z" fill="#4996AF"></path><path d="M680.888 196.339C681.343 196.483 681.672 196.943 682.039 197.694C681.874 197.992 681.671 197.999 681.162 198C680.825 197.547 680.793 197.101 680.888 196.339Z" fill="#F89A60"></path><path d="M805.742 561.937C805.871 561.1 806.128 560.592 806.881 560.288C807.459 560.97 807.376 561.42 806.862 562.052C806.34 562.261 806.105 562.263 805.742 561.937Z" fill="#A331A4"></path><path d="M429.813 559.26C429.846 559.591 429.682 560.12 429.301 560.827C429.261 560.49 429.439 559.974 429.813 559.26Z" fill="#86EFD8"></path><path d="M807.017 560.009C807.317 559.542 807.687 559.152 808.298 558.638C808.785 558.486 809.03 558.456 809.338 558.789C809.214 559.945 808.713 560.383 807.567 560.356C807.229 560.239 807.087 560.087 807.017 560.009Z" fill="#A331A4"></path><path d="M465.663 857.959C465.701 858.198 465.459 858.475 464.934 858.78C464.895 858.538 465.139 858.268 465.663 857.959Z" fill="#4E99D0"></path><path d="M608.354 879.105C608.263 878.91 608.411 878.596 608.796 878.161C608.887 878.355 608.74 878.671 608.354 879.105Z" fill="#315BA3"></path><path d="M428.916 890.385C429.089 890.284 429.399 890.397 429.847 890.723C429.675 890.824 429.364 890.711 428.916 890.385Z" fill="#315BA3"></path><path d="M679.139 224.265C679.395 224.032 679.681 224.17 679.96 224.71C679.714 224.882 679.453 224.724 679.139 224.265Z" fill="#030727"></path><path d="M507.67 134.921C507.75 135.106 507.585 135.408 507.203 135.853C507.132 135.676 507.279 135.357 507.67 134.921Z" fill="#F8EC9C"></path><path d="M769.278 824.533C769.099 824.674 768.726 824.597 768.163 824.3C768.343 824.158 768.714 824.236 769.278 824.533Z" fill="#3765A8"></path><path d="M767.809 823.927C767.89 824.057 767.408 823.983 767.302 823.927C767.347 823.658 767.524 823.634 767.809 823.927Z" fill="#3765A8"></path><path d="M609.253 877.94C609.071 877.723 609.2 877.468 609.617 877.154C609.857 877.383 609.743 877.652 609.253 877.94Z" fill="#315BA3"></path><path d="M639.235 877.906C639.105 877.645 639.312 877.392 639.847 877.134C639.882 877.316 639.681 877.579 639.235 877.906Z" fill="#2C428C"></path><path d="M424.057 894.675C423.838 894.951 423.531 894.864 423.128 894.429C423.302 894.306 423.615 894.383 424.057 894.675Z" fill="#315BA3"></path><path d="M444.344 891.101C444.201 891.065 444.143 890.884 444.062 890.419C444.36 890.312 444.489 890.585 444.344 891.101Z" fill="#315BA3"></path><path d="M642.237 875.896C642.211 875.708 642.435 875.454 642.91 875.13C642.936 875.316 642.712 875.573 642.237 875.896Z" fill="#2C428C"></path><path d="M371.813 868.375C371.995 868.287 372.342 868.422 372.833 868.804C372.644 868.9 372.312 868.749 371.813 868.375Z" fill="#2C428C"></path><path d="M580.833 207.331C581.038 207.261 581.374 207.46 581.838 207.93C581.632 208.001 581.299 207.801 580.833 207.331Z" fill="#F8EC9C"></path><path d="M476.92 925.419C477.115 925.315 477.424 925.448 477.854 925.81C477.662 925.911 477.348 925.783 476.92 925.419Z" fill="#3765A8"></path><path d="M385.046 863.637C384.842 863.714 384.543 863.543 384.143 863.126C384.345 863.05 384.649 863.22 385.046 863.637Z" fill="#2C428C"></path><path d="M599.741 895.167C599.731 895.399 599.458 895.603 598.922 895.782C598.932 895.551 599.205 895.344 599.741 895.167Z" fill="#315BA3"></path><path d="M597.988 197.743C597.776 197.858 597.503 197.676 597.123 197.237C597.284 197.189 597.587 197.345 597.988 197.743Z" fill="#F8EC9C"></path><path d="M637.761 865.087C637.891 865.354 637.683 865.606 637.156 865.871C637.118 865.685 637.313 865.414 637.761 865.087Z" fill="#2C428C"></path><path d="M601.35 886.042C601.301 885.829 601.51 885.541 601.991 885.201C602.044 885.422 601.825 885.694 601.35 886.042Z" fill="#315BA3"></path><path d="M595.882 195.784C595.667 195.86 595.43 195.634 595.12 195.138C595.265 195.128 595.536 195.332 595.882 195.784Z" fill="#F8EC9C"></path><path d="M616.679 882.971C616.722 883.175 616.503 883.468 616.014 883.842C615.968 883.635 616.192 883.347 616.679 882.971Z" fill="#2A50A0"></path><path d="M596.728 896.141C596.704 896.368 596.411 896.574 595.84 896.733C595.861 896.498 596.159 896.309 596.728 896.141Z" fill="#315BA3"></path><path d="M358.64 813.889C358.705 814.098 358.521 814.402 358.066 814.762C357.994 814.54 358.193 814.262 358.64 813.889Z" fill="#4076AF"></path><path d="M422.234 900.809C422.282 900.651 422.569 900.611 422.929 900.727C422.827 900.898 422.65 900.912 422.234 900.809Z" fill="#315BA3"></path><path d="M504.687 138.93C504.758 139.108 504.594 139.396 504.219 139.818C504.156 139.648 504.303 139.345 504.687 138.93Z" fill="#F8EC9C"></path><path d="M188.023 817.799C187.735 817.855 187.579 817.637 187.608 817.139C187.882 817.119 188.002 817.34 188.023 817.799Z" fill="#1B2859"></path><path d="M437.24 903.829C437.273 903.659 437.551 903.592 437.918 903.671C437.833 903.855 437.659 903.893 437.24 903.829Z" fill="#315BA3"></path><path d="M373.053 869.253C373.281 869.09 373.553 869.251 373.884 869.722C373.645 869.921 373.363 869.769 373.053 869.253Z" fill="#2C428C"></path><path d="M374.808 870.378C374.995 870.293 375.344 870.439 375.831 870.841C375.636 870.934 375.303 870.771 374.808 870.378Z" fill="#2C428C"></path><path d="M600.267 886.955C600.219 886.75 600.422 886.49 600.87 886.164C600.916 886.365 600.718 886.632 600.267 886.955Z" fill="#315BA3"></path><path d="M505.55 137.803C505.643 138.011 505.486 138.344 505.075 138.802C504.981 138.594 505.139 138.261 505.55 137.803Z" fill="#F8EC9C"></path><path d="M379.043 859.631C378.842 859.71 378.543 859.545 378.139 859.138C378.339 859.06 378.642 859.224 379.043 859.631Z" fill="#2C428C"></path><path d="M655.299 820.045C655.038 819.947 655.028 819.748 655.028 819.25C655.22 818.961 655.401 818.971 655.852 819.028C655.931 819.366 655.74 819.656 655.299 820.045Z" fill="#4076AF"></path><path d="M612.083 872.739C611.944 872.784 612.086 872.383 612.14 872.297C612.195 872.212 612.364 872.444 612.364 872.444C612.364 872.444 612.222 872.693 612.083 872.739Z" fill="#315BA3"></path><path d="M764.766 823.065C764.718 823.219 764.43 823.265 764.074 823.146C764.179 822.973 764.353 822.966 764.766 823.065Z" fill="#3765A8"></path><path d="M501.58 142.794C501.65 143.007 501.446 143.339 500.97 143.795C500.901 143.583 501.104 143.247 501.58 142.794Z" fill="#F8EC9C"></path><path d="M324.26 301.457C324.032 301.548 323.688 301.373 323.25 300.914C323.485 300.817 323.814 301.005 324.26 301.457Z" fill="#61D6EC"></path><path d="M580.318 517.351C580.204 517.158 580.336 516.783 580.699 516.219C580.808 516.409 580.687 516.79 580.318 517.351Z" fill="#3765A8"></path><path d="M262.269 518.697C262.038 518.701 261.958 518.525 261.98 518.171C262.234 518.129 262.346 518.305 262.269 518.697Z" fill="#4E99D0"></path><path d="M664.818 520.085C664.956 520.182 664.963 520.416 664.828 520.969C664.686 520.933 664.687 520.577 664.818 520.085Z" fill="#4996AF"></path><path d="M446.045 521.249C446.427 521.136 446.565 521.375 446.334 521.832C446.212 521.939 446.048 521.489 446.045 521.249Z" fill="#315BA3"></path><path d="M397.027 531.299C397.138 531.528 397.018 531.836 396.645 532.191C396.388 531.887 396.522 531.6 397.027 531.299Z" fill="#7048D5"></path><path d="M396.008 532.449C396.132 532.687 396.024 532.982 395.662 533.317C395.354 532.997 395.476 532.714 396.008 532.449Z" fill="#7048D5"></path><path d="M698.717 532.237C698.939 532.442 698.901 532.698 698.75 533.327C698.577 533.229 698.517 532.758 698.717 532.237Z" fill="#61D6EC"></path><path d="M812.603 537.221C812.49 536.998 812.603 536.674 812.986 536.301C813.239 536.602 813.096 536.892 812.603 537.221Z" fill="#A331A4"></path><path d="M811.626 538.254C811.526 538.019 811.651 537.698 812.058 537.37C812.298 537.706 812.135 537.974 811.626 538.254Z" fill="#A331A4"></path><path d="M810.706 539.278C810.595 539.05 810.694 538.725 811.076 538.394C811.325 538.716 811.178 538.98 810.706 539.278Z" fill="#A331A4"></path><path d="M213.93 540.372C214.153 540.296 214.448 540.475 214.804 540.916C214.577 540.994 214.289 540.81 213.93 540.372Z" fill="#A331A4"></path><path d="M218.079 545.25C218.3 545.186 218.569 545.38 218.904 545.821C218.689 545.881 218.408 545.693 218.079 545.25Z" fill="#A331A4"></path><path d="M377.253 289.922C377.067 289.659 377.231 289.392 377.728 289.1C377.935 289.363 377.783 289.644 377.253 289.922Z" fill="#7048D5"></path><path d="M809.496 557.873C809.629 557.219 809.825 556.963 810.318 556.657C810.534 556.545 810.775 556.774 810.892 556.892C811.199 557.451 811.102 557.832 810.451 558.268C809.915 558.319 809.697 558.264 809.496 557.873Z" fill="#A331A4"></path><path d="M430.625 557.526C430.779 557.754 430.651 558.162 430.278 558.781C430.136 558.563 430.239 558.135 430.625 557.526Z" fill="#86EFD8"></path><path d="M808.657 558.644C808.659 558.215 808.847 557.966 809.308 557.653C809.513 557.536 809.768 557.769 809.89 557.891C810.172 558.469 810.058 558.843 809.345 559.076C809.018 559.02 808.774 558.772 808.657 558.644Z" fill="#A331A4"></path><path d="M443.704 390.561C443.962 390.447 444.31 390.605 444.719 391.062C444.451 391.185 444.123 391.009 443.704 390.561Z" fill="#8658F1"></path><path d="M446.893 393.364C447.095 393.292 447.398 393.476 447.808 393.91C447.608 393.98 447.3 393.8 446.893 393.364Z" fill="#8658F1"></path><path d="M447.933 394.331C448.183 394.155 448.464 394.323 448.8 394.809C448.618 394.876 448.321 394.724 447.933 394.331Z" fill="#8658F1"></path><path d="M596.478 369.842C596.234 369.663 596.304 369.4 596.736 369.094C596.905 369.275 596.804 369.511 596.478 369.842Z" fill="#0B191F"></path><path d="M597.501 367.781C597.271 367.599 597.347 367.352 597.762 367.07C597.926 367.246 597.828 367.474 597.501 367.781Z" fill="#0B191F"></path><path d="M428.666 561.634C428.791 561.837 428.654 562.221 428.287 562.806C428.172 562.61 428.289 562.212 428.666 561.634Z" fill="#86EFD8"></path><path d="M344.897 450.571C345.089 450.404 345.42 450.458 345.896 450.735C345.707 450.903 345.372 450.848 344.897 450.571Z" fill="#3765A8"></path><path d="M657.451 344.796C657.334 344.835 657.163 344.553 657.245 344.413C657.326 344.273 657.616 344.42 657.616 344.42C657.616 344.42 657.568 344.757 657.451 344.796Z" fill="#1B2859"></path><path d="M224.862 494.667C224.521 494.765 224.333 494.513 224.24 493.925C224.439 493.923 224.665 494.166 224.862 494.667Z" fill="#F8EC9C"></path><path d="M825.035 496.757C824.948 496.768 824.881 496.658 824.892 496.597C824.903 496.535 825.132 496.543 825.132 496.543C825.132 496.543 825.121 496.746 825.035 496.757Z" fill="#F89A60"></path><path d="M777.188 503.677C777.103 503.782 776.885 503.372 776.94 503.265C777.2 503.22 777.293 503.359 777.188 503.677Z" fill="#4E99D0"></path><path d="M361.844 668.756C361.612 668.8 361.487 668.615 361.423 668.41C361.403 668.344 361.544 668.228 361.767 668.059C361.941 668.162 361.958 668.341 361.844 668.756Z" fill="#E8EEF2"></path><path d="M265.122 595.259C265.295 595.197 265.583 595.35 265.961 595.737C265.72 595.905 265.448 595.739 265.122 595.259Z" fill="#030727"></path><path d="M259.829 596.586C259.612 596.846 259.337 596.754 259.043 596.269C259.256 596.085 259.505 596.204 259.829 596.586Z" fill="#030727"></path><path d="M764.888 596.103C765.053 596.404 764.855 596.653 764.269 596.794C764.165 596.513 764.38 596.301 764.888 596.103Z" fill="#030727"></path><path d="M762.978 597.135C762.997 597.334 762.763 597.588 762.266 597.872C762.243 597.665 762.484 597.427 762.978 597.135Z" fill="#030727"></path><path d="M639.76 275.542C639.834 275.483 639.849 275.747 639.879 275.803C639.909 275.859 639.686 275.601 639.76 275.542Z" fill="#F17187"></path><path d="M452.055 263.669C451.833 263.734 451.546 263.533 451.17 263.078C451.384 263.017 451.687 263.21 452.055 263.669Z" fill="#86EFD8"></path><path d="M560.002 626.309C560.218 626.3 560.492 626.581 560.8 627.165C560.576 627.178 560.318 626.889 560.002 626.309Z" fill="#4076AF"></path><path d="M584.136 254.681C583.928 254.747 583.6 254.541 583.157 254.06C583.367 253.994 583.692 254.201 584.136 254.681Z" fill="#F8EC9C"></path><path d="M583.123 253.665C582.899 253.743 582.578 253.545 582.146 253.08C582.364 253.005 582.695 253.197 583.123 253.665Z" fill="#F8EC9C"></path><path d="M372.932 253.075C372.878 252.965 372.804 252.867 372.729 252.77C372.799 252.79 372.869 252.81 372.909 252.977C372.878 253.124 372.911 253.088 372.932 253.075Z" fill="#798CB4"></path><path d="M759.08 594.844C759.048 594.641 759.274 594.379 759.757 594.06C759.788 594.263 759.563 594.524 759.08 594.844Z" fill="#1B2859"></path><path d="M752.043 671.252C752.219 671.266 752.329 671.533 752.296 671.899C752.095 671.833 752.035 671.669 752.043 671.252Z" fill="#E3E8EF"></path><path d="M533.5 683.479C533.509 683.458 533.491 683.5 533.5 683.479Z" fill="#FCFDFD"></path><path d="M182.748 694.057C182.932 694.137 182.971 694.323 182.933 694.783C182.725 694.869 182.571 694.691 182.477 694.485C182.444 694.412 182.557 694.272 182.748 694.057Z" fill="#1B2859"></path><path d="M682.775 233.389C682.877 233.516 682.515 233.562 682.515 233.562C682.515 233.562 682.217 233.352 682.149 233.182C682.304 233.037 682.501 233.121 682.775 233.389Z" fill="#030727"></path><path d="M688.179 230.525C688.373 230.276 688.609 230.355 688.842 230.808C688.662 230.95 688.456 230.84 688.179 230.525Z" fill="#030727"></path><path d="M686.194 229.537C686.373 229.295 686.633 229.366 686.945 229.79C686.77 229.957 686.53 229.86 686.194 229.537Z" fill="#030727"></path><path d="M684.185 228.483C684.383 228.239 684.637 228.325 684.912 228.781C684.725 228.94 684.494 228.828 684.185 228.483Z" fill="#030727"></path><path d="M682.17 227.212C682.361 227.123 682.686 227.265 683.131 227.651C682.936 227.745 682.62 227.594 682.17 227.212Z" fill="#030727"></path><path d="M643.965 285.302C644.171 285.243 644.455 285.451 644.841 285.91C644.643 285.963 644.343 285.766 643.965 285.302Z" fill="#C42CCC"></path><path d="M804.749 562.755C804.735 562.323 804.915 562.053 805.398 561.725C805.614 561.608 805.836 561.831 805.947 561.942C806.173 562.49 806.065 562.852 805.385 563.1C805.071 563.072 804.857 562.86 804.749 562.755Z" fill="#A331A4"></path><path d="M427.661 563.59C427.78 563.803 427.629 564.195 427.229 564.782C427.118 564.574 427.254 564.172 427.661 563.59Z" fill="#86EFD8"></path><path d="M840.51 565.107C840.229 564.832 840.345 564.547 840.877 564.274C841.113 564.543 840.986 564.813 840.51 565.107Z" fill="#A331A4"></path><path d="M839.562 566.161C839.466 565.949 839.584 565.654 839.953 565.324C840.181 565.617 840.039 565.88 839.562 566.161Z" fill="#A331A4"></path><path d="M838.58 567.197C838.485 566.976 838.608 566.675 838.992 566.356C839.217 566.666 839.065 566.926 838.58 567.197Z" fill="#A331A4"></path><path d="M837.569 568.195C837.48 567.969 837.611 567.667 838.009 567.359C838.228 567.682 838.066 567.937 837.569 568.195Z" fill="#A331A4"></path><path d="M836.57 569.194C836.479 568.968 836.61 568.664 837.007 568.351C837.233 568.675 837.071 568.933 836.57 569.194Z" fill="#A331A4"></path><path d="M835.559 570.194C835.469 569.966 835.604 569.663 836.007 569.351C836.231 569.677 836.067 569.936 835.559 570.194Z" fill="#A331A4"></path><path d="M834.481 571.123C834.414 570.898 834.578 570.616 835.003 570.332C835.207 570.672 835.022 570.916 834.481 571.123Z" fill="#A331A4"></path><path d="M228.121 571.696C227.939 571.756 227.63 571.552 227.159 571.12C227.328 571.073 227.661 571.253 228.121 571.696Z" fill="#D14EB2"></path><path d="M783.092 571.369C782.961 571.351 783.122 571.028 783.201 570.981C783.28 570.934 783.386 571.177 783.386 571.177C783.386 571.177 783.224 571.387 783.092 571.369Z" fill="#A331A4"></path><path d="M833.464 572.101C833.384 571.883 833.534 571.603 833.933 571.283C834.15 571.589 833.988 571.854 833.464 572.101Z" fill="#A331A4"></path><path d="M681.132 226.235C681.378 226.055 681.652 226.215 681.934 226.733C681.694 226.886 681.433 226.715 681.132 226.235Z" fill="#030727"></path><path d="M762.567 578.791C762.69 579.009 762.558 579.354 762.169 579.825C762.044 579.606 762.177 579.262 762.567 578.791Z" fill="#A331A4"></path><path d="M409.958 586.113C410.212 586.241 410.277 586.459 410.342 586.678C410.217 586.691 410.092 586.705 409.783 586.651C409.598 586.584 409.769 586.203 409.958 586.113Z" fill="#86EFD8"></path><path d="M261.175 592.263C261.368 592.144 261.717 592.255 262.214 592.618C262.018 592.744 261.674 592.619 261.175 592.263Z" fill="#030727"></path><path d="M264.104 594.289C264.361 594.063 264.639 594.207 264.893 594.757C264.652 594.907 264.404 594.74 264.104 594.289Z" fill="#030727"></path><path d="M521.245 534.696C519.663 537.148 517.181 537.892 515.189 539.768C509.396 543.35 506.678 537.763 502.357 535.987C495.917 530.896 489.765 525.944 483.752 520.83C480.515 518.077 476.956 515.558 475.121 511.127C477.413 509.766 478.918 511.402 480.465 512.508C489.229 518.776 497.83 525.273 506.228 532.015C509.936 534.992 513.202 537.141 517.389 533.087C517.968 532.527 518.896 532.436 520.1 532.487C521.176 532.953 521.552 533.529 521.245 534.696Z" fill="#4483B7"></path><path d="M496.683 553.143C495.031 551.532 493.136 550.272 494.253 547.947C494.948 546.499 495.989 544.78 497.904 545.239C499.877 545.713 501.823 547.409 501.739 549.249C501.629 551.639 500.08 553.765 496.683 553.143Z" fill="#4E99D0"></path><path d="M463.427 562.897C464.73 560.293 466.362 561.078 467.955 562.138C468.573 562.55 468.685 563.263 468.081 563.771C466.378 565.201 464.815 564.888 463.427 562.897Z" fill="#4076AF"></path><path d="M426.473 578.087C426.533 574.802 428.868 572.876 431.757 571.078C430.955 573.843 428.855 575.904 426.473 578.087Z" fill="#86EFD8"></path><path d="M436.37 564.204C436.099 563.223 435.637 561.884 437.498 561.082C437.443 561.998 437.03 562.989 436.37 564.204Z" fill="#86EFD8"></path><path d="M434.344 567.932C434.05 566.938 433.751 565.675 435.597 565.066C435.498 565.931 435.053 566.85 434.344 567.932Z" fill="#86EFD8"></path><path d="M432.318 570.923C432.227 570.508 432.401 569.927 432.847 569.194C432.94 569.614 432.761 570.186 432.318 570.923Z" fill="#86EFD8"></path><path d="M433.328 569.065C433.237 568.807 433.429 568.524 433.863 568.143C433.94 568.376 433.776 568.708 433.328 569.065Z" fill="#86EFD8"></path><path d="M425.348 579.083C425.252 578.835 425.443 578.546 425.882 578.16C425.965 578.388 425.801 578.714 425.348 579.083Z" fill="#86EFD8"></path><path d="M424.344 580.073C424.251 579.836 424.44 579.547 424.873 579.156C424.953 579.377 424.789 579.699 424.344 580.073Z" fill="#86EFD8"></path><path d="M423.341 581.077C423.249 580.833 423.44 580.545 423.878 580.158C423.958 580.385 423.791 580.709 423.341 581.077Z" fill="#86EFD8"></path><path d="M422.347 582.076C422.253 581.841 422.44 581.549 422.872 581.156C422.953 581.376 422.79 581.698 422.347 582.076Z" fill="#86EFD8"></path><path d="M421.321 583.057C421.241 582.835 421.435 582.546 421.876 582.159C421.947 582.37 421.77 582.68 421.321 583.057Z" fill="#86EFD8"></path><path d="M420.302 584.034C420.233 583.825 420.427 583.537 420.866 583.146C420.929 583.346 420.747 583.65 420.302 584.034Z" fill="#86EFD8"></path><path d="M419.287 585.014C419.226 584.816 419.423 584.529 419.864 584.139C419.921 584.332 419.733 584.628 419.287 585.014Z" fill="#86EFD8"></path><path d="M418.272 585.984C418.22 585.794 418.417 585.513 418.858 585.13C418.908 585.317 418.715 585.604 418.272 585.984Z" fill="#86EFD8"></path><path d="M723.147 771.5C722.062 776.786 724.874 780.551 727.368 785.466C716.853 783.275 707.257 781.275 696.862 779.109C701.524 776.555 702.884 772.978 702.899 768.678C702.93 759.549 702.871 750.415 703.143 741.292C703.237 738.135 702.067 736.927 699.143 736.331C693.305 735.14 687.528 733.645 681.341 732.286C674.29 730.634 667.609 729.034 660.969 727.278C658.219 726.551 656.996 727.064 657.042 730.218C657.186 740.028 657.069 749.843 657.155 759.654C657.194 764.125 659.472 767.832 662.734 772.486C652.24 771.184 642.919 770.028 632.218 768.701C638.625 764.041 638.222 758.191 638.155 752.334C638.036 742.024 638.084 731.711 638.153 721.4C638.177 717.918 638.124 714.474 637.12 710.712C638.752 708.371 640.865 709.388 642.745 709.41C647.063 709.46 651.382 709.361 655.699 709.506C658.905 709.614 661.168 710.801 661.645 714.673C661.948 715.179 662.118 715.342 662.589 715.668C663.458 716.15 664.01 716.499 664.954 716.732C665.664 716.885 666.066 716.98 666.765 717.161C667.655 717.396 668.239 717.585 669.157 717.707C670.09 717.817 670.707 717.931 671.634 718.126C672.353 718.313 672.758 718.438 673.464 718.663C675.354 719.329 676.994 719.68 678.968 719.98C679.879 720.207 680.451 720.451 681.286 720.85C681.728 721.085 681.899 721.186 682.306 721.459C682.82 722.032 683.08 721.97 683.613 721.485C686.075 721.249 688.078 722.054 690.45 722.635C690.962 722.799 691.164 722.873 691.925 723.23C692.822 723.836 693.157 723.796 693.799 723.405C694.425 723.253 694.745 723.224 695.065 723.244C701.418 723.647 701.418 723.648 701.671 716.907C701.913 715.189 702.381 714.007 704.153 713.34C706.161 713.343 707.754 713.713 709.788 713.528C711.573 713.469 712.94 713.602 714.711 713.86C717.444 714.998 720.088 714.141 722.789 715.342C723.175 717.064 723.193 718.595 723.244 720.582C723.591 722.093 723.479 723.169 723.294 724.614C723.128 740.337 723.114 755.687 723.147 771.5Z" fill="#798CB4"></path><path d="M661.172 703.366C661.452 695.823 661.719 688.699 661.621 681.581C661.574 678.218 662.492 676.854 666.101 676.93C675.387 677.127 684.684 677.088 693.97 676.871C697.907 676.779 699.396 678.473 699.378 682.149C699.345 688.785 699.371 695.421 699.496 702.508C700.076 703.976 700.446 705.016 700.439 706.566C700.426 708.085 700.408 709.189 700.44 710.708C700.587 712.798 700.568 714.472 700.454 716.571C700.507 721.364 698.022 722.414 693.817 721.73C693.128 721.638 692.857 721.588 692.177 721.504C683.904 719.979 676.195 717.785 667.931 716.227C666.998 716.037 666.465 715.913 665.528 715.681C664.284 715.385 663.46 715.151 662.325 714.506C660.301 710.886 659.9 707.405 661.172 703.366Z" fill="#03031B"></path><path d="M699.699 707.339C699.505 705.925 699.419 704.832 699.475 703.348C706.062 702.971 712.538 703.392 718.939 702.873C724.321 702.438 725.618 704.587 725.055 709.352C724.838 711.187 724.701 712.948 723.427 714.817C720.701 714.908 718.223 715.035 715.376 714.993C713.599 714.972 712.193 714.954 710.371 714.866C708.61 714.016 707.135 713.942 705.316 714.004C703.475 714.043 703.019 714.98 702.973 716.669C702.085 717.784 701.159 717.944 699.85 717.268C699.485 715.277 699.397 713.543 699.444 711.393C700.016 709.897 700.067 708.789 699.699 707.339Z" fill="#E8EEF2"></path><path d="M660.909 702.96C662.489 706.204 660.648 709.758 662.646 713.187C663.568 714.358 663.804 715.362 663.078 716.858C661.468 717.212 660.056 716.819 660.19 715.449C660.67 710.546 657.678 710.987 654.31 710.957C648.863 710.908 643.34 711.875 637.563 710.249C636.759 702.992 636.759 702.993 644.073 702.991C649.543 702.989 655.013 702.981 660.909 702.96Z" fill="#E3E8EF"></path><path d="M715.345 715.182C717.438 713.284 720.008 713.874 722.879 714.821C723.174 715.106 723.145 715.321 723.151 715.428C720.667 715.481 718.176 715.427 715.345 715.182Z" fill="#E3E8EF"></path><path d="M723.36 724.762C723.117 723.928 723.092 722.868 723.172 721.424C724.206 722.134 724.151 723.313 723.36 724.762Z" fill="#E3E8EF"></path><path d="M242.323 720.173C242.273 714.187 242.21 708.551 242.047 702.456C242.002 696.964 242.056 691.93 242.054 686.431C240.65 684.38 240.444 682.688 241.836 680.548C252.228 679.113 262.368 678.792 272.357 680.257C282.124 681.689 285.898 688.093 286.037 701.545C288.563 707.722 288.503 713.311 284.757 718.463C283.416 720.308 282.804 721.832 284.349 723.776C286.335 726.273 286.571 729.253 286.561 732.293C286.551 735.454 286.348 738.633 286.601 741.774C287.704 755.434 279.705 763.866 269.599 770.733C263.086 775.158 255.476 777.388 247.738 778.869C242.377 779.894 240.6 778.516 240.552 773.063C240.44 760.419 240.504 747.774 240.534 734.74C240.64 732.188 240.685 729.773 242.218 728.28C245.038 725.534 244.072 723.123 242.323 720.173Z" fill="#03031B"></path><path d="M241.579 732.752C242.017 746.82 242.164 760.644 242.061 774.466C242.037 777.698 242.53 778.844 246.103 777.936C255.647 775.511 265.256 773.261 273.003 766.711C280.928 760.01 286.633 752.133 285.489 740.919C285.186 737.952 285.307 734.916 285.494 731.929C285.715 728.393 285.193 725.375 281.918 723.256C279.882 721.94 279.29 720.504 282.06 718.95C285.091 717.25 286.168 714.389 285.926 710.895C285.742 708.243 285.914 705.566 286.021 702.445C292.438 701.996 298.762 702 305.086 702.008C312.007 702.017 312.064 702.119 312.019 708.929C312.007 710.796 311.718 712.559 311.007 714.704C307.332 717.696 303.201 716.327 299.301 716.648C297.648 716.784 295.972 716.738 294.312 716.682C290.802 716.563 289.686 718.108 290.094 721.595C291.181 730.874 290.68 740.2 290.45 749.946C289.713 757.452 285.579 762.775 280.847 767.421C270.454 777.626 257.17 781.815 243.19 784.067C239.154 784.717 237.669 783.145 237.552 778.503C237.323 769.371 237.458 760.233 237.509 750.67C237.536 749.67 237.517 749.099 237.493 748.098C237.606 745.077 237.594 742.486 237.505 739.455C237.352 737.208 237.453 735.428 238.396 733.342C239.407 732.32 240.267 732.215 241.579 732.752Z" fill="#E8EEF2"></path><path d="M289.372 751.228C288.491 740.432 289.98 729.798 288.129 719.253C287.598 716.233 288.602 714.708 292.097 714.868C298.059 715.142 304.041 714.978 310.474 715.059C310.932 719.77 310.929 724.421 310.967 729.535C309.734 732.604 310.642 735.39 310.284 738.504C304.957 745.701 296.811 747.745 289.372 751.228Z" fill="#8796BE"></path><path d="M241.681 680.221C242.157 681.867 242.156 683.511 242.076 685.561C235.528 685.977 229.059 686.028 222.59 685.978C220.747 685.964 218.349 686.665 218.289 683.425C218.227 680.08 220.689 680.31 222.786 680.279C228.924 680.189 235.065 680.231 241.681 680.221Z" fill="#8796BE"></path><path d="M572.745 255.819C575.921 259.128 578.805 262.275 581.824 265.725C579.968 268.435 576.346 268.741 574.489 271.874C572.728 272.695 571.562 271.877 570.793 270.853C564.197 262.078 555.07 255.957 547.142 248.135C546.595 247.705 546.551 247.197 546.108 247.119C545.999 247.1 545.934 247.226 545.941 247.342C545.984 248.007 545.733 247.256 546.599 247.592C548.348 249.414 549.914 251.001 550.332 253.636C546.838 253.99 543.4 254.044 539.962 254.013C538.208 253.998 537.057 254.573 536.863 256.897C535.46 257.347 534.6 256.55 533.964 255.546C525.333 241.915 514.931 229.387 508.297 214.516C507.029 211.673 505.217 208.947 505.744 205.299C511.49 203.172 514.251 209.279 519.08 209.574C520.525 209.663 521.929 210.427 523.743 210.895C533.733 224.511 546.917 234.349 559.591 244.73C563.943 248.293 568.169 252.01 572.745 255.819Z" fill="#F89A60"></path><path d="M505.688 204.768C510.351 218.46 518.243 229.968 526.126 241.491C529.591 246.554 532.894 251.727 536.531 257.08C537.911 259.517 539.038 261.721 540.148 263.934C540.676 264.986 541.226 266.155 540.403 267.198C539.538 268.292 538.298 267.895 537.197 267.468C530.136 264.736 524.466 260.461 521.48 253.227C519.898 249.393 518.306 245.564 515.178 242.224C514.491 241.521 514.527 240.886 514.294 240.046C514.221 239.759 514.183 239.349 514.134 239.15C511.726 233.872 509.367 228.794 506.917 223.359C504.358 214.514 501.089 206.165 502.221 196.46C504.875 198.899 504.279 202.071 505.688 204.768Z" fill="#F8EC9C"></path><path d="M583.616 724.623C581.131 728.376 578.913 727.669 576.927 724.746C574.037 720.491 570.689 717.015 564.672 717.028C564.219 713.279 564.128 709.526 564.072 705.772C564.047 704.095 564.102 702.423 566.621 701.84C570.376 701.233 573.745 701.606 577.543 701.684C578.429 701.847 578.876 701.873 579.657 701.862C580.163 701.756 580.335 701.687 580.758 701.735C583.564 701.804 583.802 703.451 583.783 705.458C583.725 711.691 583.747 717.926 583.616 724.623Z" fill="#8796BE"></path><path d="M577.667 701.58C574.629 701.858 571.276 701.895 567.475 701.848C570.415 700.325 573.892 701.03 577.667 701.58Z" fill="#E3E8EF"></path><path d="M580.911 701.715C580.839 701.881 580.669 701.91 580.245 701.882C580.265 701.743 580.539 701.66 580.911 701.715Z" fill="#E3E8EF"></path><path d="M507.916 440.496C511.064 437.454 513.846 437.212 516.995 440.918C518.087 441.371 518.588 441.656 519.383 442.02C519.834 442.238 520.014 442.332 520.456 442.589C521.064 442.993 521.405 443.242 522.007 443.69C526.822 447.633 531.871 450.807 535.626 455.815C541.801 461.637 547.602 467.637 554.275 472.42C559.282 476.009 560.016 480.05 558.806 485.63C557.753 486.815 556.889 486.356 555.788 485.5C554.994 480.373 551.958 477.447 548.193 474.637C537.264 466.482 527.16 457.291 516.511 448.771C513.57 446.418 511.346 445.955 508.282 448.58C498.941 456.583 489.35 464.29 479.758 472.519C479.344 472.89 479.175 473.03 478.742 473.359C477.597 474.093 476.67 474.564 475.584 475.352C474.83 475.846 474.306 476.138 473.589 476.68C473.047 477.136 472.734 477.397 472.174 477.85C470.662 478.836 469.479 479.726 468.237 481.078C466.595 481.452 465.731 480.751 464.99 479.31C465.737 476.141 468.199 474.665 470.386 472.496C483.004 461.752 495.35 451.243 507.916 440.496Z" fill="#A5FBD0"></path><path d="M421.223 438.899C421.385 437.787 422.316 437.351 423.738 437.253C423.742 438.663 422.79 439.009 421.223 438.899Z" fill="#4996AF"></path><path d="M419.039 442.69C418.933 442.258 419.123 441.72 419.553 441.02C419.64 441.433 419.487 442.008 419.039 442.69Z" fill="#4996AF"></path><path d="M420.072 440.733C419.983 440.31 420.18 439.763 420.627 439.055C420.703 439.466 420.531 440.038 420.072 440.733Z" fill="#4996AF"></path><path d="M418.148 443.861C418.053 443.673 418.185 443.362 418.548 442.937C418.644 443.128 418.51 443.434 418.148 443.861Z" fill="#4996AF"></path><path d="M386.333 710.283C385.988 707.914 385.99 705.888 385.994 703.427C392.017 702.994 398.037 702.997 404.525 703.01C404.951 705.196 404.91 707.372 404.798 710.013C398.727 712.487 392.709 712.234 386.333 710.283Z" fill="#E3E8EF"></path><path d="M560.777 420.35C553.856 420.664 546.562 420.89 539.268 420.883C518.341 420.862 497.415 420.747 476.099 420.481C476.523 420.156 477.335 419.897 478.148 419.899C505.567 419.969 532.986 420.064 560.777 420.35Z" fill="#4996AF"></path><path d="M459.288 410.219C464.603 407.037 470.074 408.82 475.817 410.642C470.577 410.86 465.055 411.495 459.288 410.219Z" fill="#E3E8EF"></path><path d="M506.352 410.994C506.701 409.644 507.516 408.772 508.915 410.728C508.275 410.988 507.505 411 506.352 410.994Z" fill="#E3E8EF"></path><path d="M488.167 410.338C488.539 410.246 489.102 410.375 489.849 410.738C489.476 410.834 488.917 410.697 488.167 410.338Z" fill="#E3E8EF"></path><path d="M481.278 410.945C481.412 410.268 481.99 409.976 482.928 410.703C482.616 410.935 482.129 410.956 481.278 410.945Z" fill="#E3E8EF"></path><path d="M455.21 409.291C455.581 409.183 456.111 409.31 456.809 409.657C456.442 409.76 455.906 409.643 455.21 409.291Z" fill="#E3E8EF"></path><path d="M503.3 410.129C503.204 409.778 503.267 409.329 503.86 409.941C503.914 410.126 503.504 410.115 503.3 410.129Z" fill="#E3E8EF"></path><path d="M514.232 410.986C514.254 410.87 514.545 410.765 514.939 410.818C514.862 410.984 514.682 410.99 514.232 410.986Z" fill="#E3E8EF"></path><path d="M565.02 420.398C564.927 420.63 564.709 420.701 564.167 420.659C564.193 420.443 564.544 420.339 565.02 420.398Z" fill="#4996AF"></path><path d="M472.812 476.187C473.373 475.655 473.744 475.309 474.373 474.921C475.723 474.549 476.754 474.109 477.604 472.935C477.641 472.597 478.014 472.731 477.823 472.678C479.485 472.429 480.912 471.514 482.301 470.275C485.852 467.107 487.025 467.517 489.066 472.735C488.572 477.319 484.571 478.908 482.091 482.208C486.721 483.148 487.382 479.83 488.663 476.822C489.157 475.716 489.572 474.942 489.936 473.79C490.11 473.267 490.183 473.057 490.376 472.532C490.756 471.571 491.065 470.952 491.68 470.092C494.144 468.443 496.236 469.388 498.639 470.409C500.136 472.924 498.401 474.871 498.099 477.34C497.319 479.575 496.742 481.507 496.003 483.709C495.735 484.341 495.111 484.335 495.175 484.704C495.213 484.923 495.636 484.797 496.106 484.293C497.378 483.96 498.275 484.148 499.306 485.069C500.012 487.151 499.459 488.667 498.136 490.347C493.322 492.415 488.613 491.277 484.008 491.603C481.796 491.759 479.488 491.254 477.405 492.692C484.962 493.65 492.533 493.292 500.51 493.391C502.642 493.695 504.422 493.43 506.472 494.258C507.537 495.062 507.783 495.837 507.709 497.095C506.891 499.057 505.323 499.156 503.913 499.521C497.155 501.265 497.154 501.261 499.697 508.299C501.42 513.137 505.289 513.593 509.578 513.966C511.942 514.591 513.969 514.642 516.335 513.997C521.696 513.758 524.229 510.598 525.962 505.995C526.579 503.569 529.648 501.435 526.378 499.33C523.462 497.453 520.784 498.524 518.786 502.268C518.427 502.791 518.244 502.979 517.665 503.221C516.423 503.06 515.782 502.567 515.132 501.447C514.692 495.291 515.917 493.715 521.41 493.481C528.052 493.198 534.707 493.515 541.353 493.337C544.801 493.244 548.36 493.247 551.364 490.125C552.618 489.383 553.476 489.464 554.544 490.496C555.773 493.321 555.812 495.758 554.413 498.529C552.578 500.084 553.122 501.824 552.946 503.373C552.529 507.04 551.52 510.315 547.272 511.888C546.738 512.305 546.487 512.513 546.008 512.823C545.513 513 545.282 513.141 545.022 513.556C544.789 514.074 544.594 514.373 544.135 514.801C543.92 514.964 543.962 514.854 543.908 514.831C543.36 515.89 542.272 516.169 541.05 516.794C540.493 516.927 540.265 517.019 539.979 517.364C534.434 523.864 527.731 528.594 520.164 532.77C511.849 537.899 511.914 537.813 504.165 531.988C494.756 524.913 485.739 517.305 475.461 510.856C475.122 510.77 475.04 510.847 475.06 510.9C474.568 510.517 473.85 510.51 473.182 509.811C472.693 507.774 472.344 506.034 471.807 503.955C468.032 496.733 468.107 489.217 467.955 481.359C467.659 478.576 469.604 478.021 471.394 477.004C472.062 476.8 472.362 476.619 472.812 476.187Z" fill="#030727"></path><path d="M467.784 480.841C470.16 488.124 469.791 495.676 471.573 503.256C468.34 502.872 469.562 499.543 468.097 497.345C466.765 491.137 465.549 485.274 464.61 479.189C465.755 479.553 466.623 480.139 467.784 480.841Z" fill="#86EFD8"></path><path d="M401.083 470.371C403.077 468.922 405.094 467.757 405.948 471.601C403.975 472.885 402.055 473.651 401.083 470.371Z" fill="#86EFD8"></path><path d="M473.169 509.833C473.639 509.79 474.235 510.067 474.956 510.648C474.486 510.686 473.891 510.42 473.169 509.833Z" fill="#4483B7"></path><path d="M535.958 455.961C530.845 452.367 526.064 448.574 521.101 444.509C520.783 443.903 520.592 443.606 520.109 443.223C519.872 443.099 519.968 443.112 519.928 443.139C519.348 442.204 518.152 442.16 517.241 441.202C517.031 440.981 517.013 440.997 517.016 440.983C517.568 436.243 521.669 437.011 524.253 437.146C550.775 438.539 577.309 439.11 603.863 439.052C604.656 439.05 605.451 439.46 606.625 439.857C607.251 452.329 605.844 449.95 596.881 449.963C591.387 449.971 585.933 451.333 580.623 451.323C573.521 451.309 566.348 451.766 559.146 451.263C551.851 450.753 542.828 449.165 535.958 455.961Z" fill="#4483B7"></path><path d="M554.363 498.972C554.276 496.728 554.455 494.579 554.481 492.054C554.46 489.433 552.678 486.956 555.585 484.99C556.737 485.291 557.44 485.594 558.429 485.932C558.773 486.138 558.832 486.31 558.968 486.743C558.319 490.678 557.629 494.359 556.848 498.021C556.599 499.185 556.496 501.132 554.363 498.972Z" fill="#86EFD8"></path><path d="M518.671 285.832C519.762 286.81 520.385 288.219 521.31 288.458C530.05 290.715 534.547 298.092 540.296 303.942C541.225 304.887 541.903 306.39 543.456 305.857C550.409 303.473 557.254 306.573 564.216 306.188C569.525 305.895 574.407 310.08 580.542 309.048C581.252 308.954 581.519 308.844 582.138 308.986C582.646 309.48 582.802 309.723 583.098 310.374C584.674 318.451 586.079 326.126 586.533 333.933C586.638 335.755 586.605 337.59 586.077 339.762C578.343 341.795 576.72 349.05 572.838 354.195C568.836 359.499 566.957 359.441 562.788 354.016C561.375 352.177 559.833 350.401 557.571 349.505C551.139 346.955 545.764 342.452 539.241 339.953C531.351 336.931 523.6 334.599 515.217 337.633C514.905 337.746 514.517 337.977 514.265 337.856C509.223 335.452 502.617 336.159 499.24 329.988C499.383 327.492 500.926 326.265 502.641 325.921C506.61 325.123 510.387 323.215 514.953 323.711C515.959 323.835 516.581 324.038 517.219 324.136C519.247 324.447 521.878 325.456 522.576 322.679C523.116 320.53 521.599 318.711 518.806 318.107C515.69 315.365 512.606 313.214 508.879 312.229C506.518 311.605 504.729 310.34 503.308 307.962C502.709 306.561 502.314 305.448 501.021 304.473C499.227 300.779 498.415 297.107 497.236 293.57C495.972 289.777 499.328 286.933 500.675 283.313C501.822 283.288 502.678 283.531 503.853 283.881C508.29 284.48 510.845 287.125 512.769 290.673C514.785 288.848 515.558 286.12 518.671 285.832Z" fill="#C42CCC"></path><path d="M500.819 282.729C500.968 283.863 501.319 284.976 500.916 285.455C495.681 291.671 501.245 297.486 501.768 303.739C502.849 304.669 502.945 305.75 503.771 306.729C505.446 309.507 507.727 310.317 510.511 311.311C513.586 312.407 517.664 313.326 518.97 317.777C518.362 320.255 517.268 322.175 516.56 324.568C510.646 325.375 504.832 325.558 500.04 329.825C497.236 331.484 495.611 329.454 493.485 327.795C486.533 321.819 484.028 313.954 481.869 305.457C481.324 298.271 481.884 291.56 483.86 285.059C486.014 277.968 486.723 270.578 489.028 263.246C495.408 264.39 495.047 270.205 496.573 274.24C497.688 277.186 498.93 279.87 500.819 282.729Z" fill="#A546D7"></path><path d="M546.331 285.286C546.073 284.52 545.95 284.001 546.061 283.536C546.862 280.164 543.565 275.035 546.028 273.897C550.352 271.899 555.737 271.058 560.865 272.45C561.341 272.579 561.815 272.708 562.95 273.024C564.008 273.669 564.311 274.196 564.862 274.911C565.187 275.287 565.314 275.441 565.618 275.832C566.135 276.553 566.439 277.059 566.962 277.773C567.257 278.169 567.374 278.33 567.666 278.731C568.205 279.46 568.582 279.936 569.235 280.597C572.443 284.229 573.986 288.457 576.225 292.665C576.657 293.538 576.899 294.138 577.294 295.018C577.494 295.51 577.565 295.71 577.694 296.224C577.764 296.965 577.699 297.381 577.362 298.034C573.274 296.106 568.852 297.734 564.652 296.336C559.452 294.605 554.281 291.814 548.341 292.892C546.341 293.255 545.833 291.587 546.233 289.89C546.573 288.447 547.35 287.076 546.331 285.286Z" fill="#EC427F"></path><path d="M489.317 262.66C488.382 271.519 487.097 279.86 484.407 288.094C482.67 293.413 483.305 299.506 482.845 305.716C482.583 310.072 482.283 313.96 482.149 317.858C482.095 319.462 482.296 321.172 480.373 322.409C479.771 322.486 479.527 322.459 478.967 322.248C474.161 318.937 472.495 314.18 471.141 308.832C471.045 304.7 472.312 301.391 474.986 298.281C479.108 289.541 483.417 281.178 485.056 271.416C486.35 268.149 486.806 265.117 487.004 262.019C487.061 261.122 486.736 259.629 487.968 259.612C489.656 259.589 488.866 261.33 489.317 262.66Z" fill="#F3ACE1"></path><path d="M577.157 298.347C577.125 297.782 577.081 297.278 577.026 296.4C578.491 295.149 579.899 295.789 581.172 296.417C583.289 297.462 584.525 296.389 586.007 294.71C590.796 294.977 590.427 299.192 592.203 302.228C593.357 304.861 594.123 307.195 594.4 310.098C594.396 312.345 594.283 314.196 593.521 315.836C592.573 317.877 590.608 318.371 588.535 318.333C586.663 318.299 584.98 317.894 584.085 315.903C583.337 314.238 583.065 312.446 582.219 310.378C581.98 310.006 581.861 309.615 581.826 309.414C581.692 309.003 581.594 308.793 581.352 308.266C580.885 307.197 580.561 306.445 580.147 305.399C579.816 304.856 579.582 304.6 579.188 304.138C579.022 303.939 579.014 304.004 579.046 303.997C578.271 303.316 578.624 302.333 578.228 301.221C578.041 300.944 578.005 300.996 578.036 300.997C577.493 300.507 577.525 299.748 577.135 298.797C577.03 298.466 577.144 298.41 577.157 298.347Z" fill="#F3ACE1"></path><path d="M519.183 285.715C515.808 287.456 514.668 290.623 512.925 294.53C511.274 289.346 508.64 286.203 504.307 284.287C504.885 283.698 505.597 283.407 506.591 283.043C510.592 280.928 514.382 280.707 518.695 282.736C520.067 283.143 521.284 283.151 521.286 284.373C521.287 284.743 520.043 285.115 519.183 285.715Z" fill="#F3ACE1"></path><path d="M518.957 282.653C515.366 282.972 511.595 282.993 507.349 282.991C510.041 279.842 511.694 275.845 513.201 270.472C514.68 275.556 515.497 279.597 518.957 282.653Z" fill="#F86EDB"></path><path d="M578.031 301.29C579.077 301.409 579.089 302.374 579.135 303.643C578.143 303.467 578.011 302.583 578.031 301.29Z" fill="#EC427F"></path><path d="M577.034 298.833C577.393 299.069 577.756 299.672 578.094 300.636C577.725 300.398 577.381 299.799 577.034 298.833Z" fill="#EC427F"></path><path d="M581.139 308.225C581.501 308.132 581.7 308.386 581.798 308.963C581.79 309.213 581.385 309.153 581.185 309.108C581.013 308.876 581.041 308.688 581.139 308.225Z" fill="#F86EDB"></path><path d="M579.141 304.175C579.317 304.144 579.613 304.349 579.983 304.83C579.791 304.874 579.525 304.643 579.141 304.175Z" fill="#EC427F"></path><path d="M777.545 739.779C777.878 751.675 778.06 763.324 777.953 774.97C777.923 778.249 778.87 779.653 782.231 780.221C787.457 781.103 792.638 782.42 797.718 783.95C802.765 785.471 807.499 784.063 813.077 782.748C811.293 788.683 811.159 794.245 810.904 799.815C810.71 804.076 808.089 805.965 803.787 805.351C797.329 804.429 791.284 801.995 785.067 800.208C774.847 797.271 764.723 794 754.484 791.14C751.178 790.216 750.383 789.185 752.394 786.158C755.04 782.178 755.823 777.602 755.804 772.856C755.765 762.87 755.785 752.885 755.817 742.429C756.768 741.197 757.732 741.346 758.543 742.023C760.416 743.59 761.051 747.585 764.967 744.923C767.095 743.476 769.949 743.303 771.663 740.983C773.06 739.092 774.972 738.317 777.545 739.779Z" fill="#798CB4"></path><path d="M777.867 739.561C775.421 739.839 773.551 740.048 772.03 742.597C769.923 746.127 765.274 745.767 762.038 747.794C760.773 748.586 759.283 747.078 759.071 745.337C758.876 743.734 758.386 742.442 756.233 742.012C755.209 735.096 756.636 728.174 754.257 721.297C752.849 717.226 755.293 715.098 759.777 715.094C764.423 715.089 769.098 715.453 773.707 715.045C778.886 714.586 780.02 717.367 779.026 721.313C777.537 727.226 778.168 733.165 777.867 739.561Z" fill="#8796BE"></path><path d="M597.591 425.373C597.409 423.69 598.285 423.121 599.588 423.203C599.91 423.223 600.512 423.86 600.453 424.054C600.07 425.328 599.014 425.635 597.591 425.373Z" fill="#01011B"></path><path d="M514.668 727.601C514.865 734.278 515.102 740.602 514.944 746.916C514.82 751.902 515.456 756.489 519.908 760.516C510.632 760.516 502.121 760.516 493.471 760.516C498.423 750.715 496.297 740.209 496.572 729.964C496.75 723.323 496.472 716.67 496.526 709.583C499.559 708.733 499.155 711.098 499.328 712.623C499.683 715.747 499.399 718.911 499.491 722.056C499.621 726.495 500.299 726.901 504.536 725.229C505.619 724.801 506.622 724.23 507.622 723.638C513.811 719.976 514.41 720.292 514.668 727.601Z" fill="#798CB4"></path><path d="M514.87 727.498C514.543 727.366 514.045 726.765 514.068 726.184C514.275 720.926 511.769 721.804 509.327 724.323C506.824 726.905 503.288 726.78 500.461 728.482C498.464 729.684 498.038 727.708 498.023 726.111C497.987 722.136 498.064 718.16 497.965 714.187C497.926 712.594 498.555 710.86 496.972 709.284C495.585 702.074 495.585 702.074 502.339 702.064C514.97 702.044 514.973 702.044 514.977 714.595C514.979 718.743 514.954 722.89 514.87 727.498Z" fill="#8796BE"></path><path d="M288.952 751.357C295.456 746.307 303.436 744.323 309.855 738.987C310.891 765.06 297.663 784.056 272.83 791.985C259.072 796.378 245.139 800.222 231.276 804.286C229.847 804.705 228.377 805.057 226.902 805.226C220.842 805.92 218.967 804.325 218.93 798.274C218.843 783.802 218.836 769.329 218.84 754.384C221.949 754.135 220.664 756.878 221.952 758.677C222.854 755.016 224.857 752.31 228.529 751.062C231.768 749.962 234.762 747.593 238.709 749.774C239.012 759.828 239.093 769.65 239.077 779.471C239.073 781.809 239.384 783.512 242.347 782.843C254.707 780.055 267.035 777.26 277.047 768.648C282.466 763.987 286.747 758.635 288.952 751.357Z" fill="#798CB4"></path><path d="M239.023 749.67C229.938 749.726 223.808 753.668 221.446 763.523C219.025 760.011 220.862 756.945 219.184 754.195C218.393 743.167 219.394 732.34 216.967 721.695C216.615 720.149 216.849 718.352 218.682 716.997C225.224 719.627 231.847 719.178 238.686 719.737C239.065 721.057 239.12 722.147 239.262 723.636C240.974 726.643 240.874 729.363 239.637 732.543C239.284 734.685 239.173 736.427 239.001 738.604C238.014 741.768 238.675 744.574 238.754 747.66C239.004 748.43 239.042 748.882 239.023 749.67Z" fill="#8796BE"></path><path d="M239.009 719.543C233.7 721.526 228.395 720.844 223.09 719.933C221.475 719.656 219.836 719.431 219.073 717.244C219.373 714.728 221.032 715.073 222.482 714.989C227.066 714.724 231.631 715.231 236.259 714.294C240.232 713.49 238.556 717.199 239.009 719.543Z" fill="#E3E8EF"></path><path d="M239.714 732.956C239.332 730.269 239.269 727.594 239.278 724.478C241.564 723.653 240.535 721.232 242.042 720.021C243.156 720.63 243.93 721.49 244.802 722.234C246.802 723.942 248.257 725.305 244.626 727.086C242.937 727.915 242.25 730.184 242.055 732.635C241.319 732.987 240.676 732.977 239.714 732.956Z" fill="#FCFDFD"></path><path d="M385.732 710.285C391.942 710.056 397.898 710.173 404.291 710.383C404.768 716.971 405.134 723.482 404.78 729.953C404.147 741.517 412.217 749.741 425.463 749.512C432.764 749.386 440.05 748.357 447.344 747.738C449.404 747.563 451.677 747.381 451.449 744.57C450.756 736.006 452.265 727.291 449.581 717.91C455.699 717.91 461.723 717.926 467.746 717.902C469.965 717.893 469.978 719.402 469.977 720.964C469.967 733.288 469.915 745.612 469.984 757.935C469.997 760.248 469.219 761.125 466.871 761.305C451.788 762.459 436.735 764.326 421.634 764.837C402.219 765.494 385.787 749.502 385.071 730.032C384.833 723.581 384.374 717.075 385.732 710.285Z" fill="#798CB4"></path><path d="M338.188 711.538C343.192 711.505 348.179 711.978 353.117 711.671C357.562 711.394 358.374 713.246 358.193 717.161C357.902 723.473 358.114 729.808 358.171 736.603C358.788 740.712 358.371 744.373 358.364 748.469C358.216 752.74 358.136 756.566 358.129 760.391C358.12 765.247 359.48 769.53 364.888 772.807C354.145 774.549 344.741 776.074 334.128 777.795C338.526 772.512 338.128 767.167 338.106 761.858C338.039 745.548 338.038 729.239 337.988 712.461C337.964 711.992 338.15 711.705 338.188 711.538Z" fill="#798CB4"></path><path d="M348.606 702.983C348.711 704.371 349.799 706.565 347.332 706.736C345.546 706.86 345.084 705.3 345 703.366C346.064 702.984 347.134 702.983 348.606 702.983Z" fill="#E3E8EF"></path><path d="M520.099 533.076C526.307 527.887 532.782 522.878 539.572 517.698C540.06 519.67 539.065 521.221 537.199 522.714C531.875 526.895 526.756 530.797 521.346 534.861C520.824 534.433 520.595 533.845 520.099 533.076Z" fill="#4076AF"></path><path d="M541.141 516.946C541.579 516.252 542.4 515.577 543.538 514.855C543.981 516.503 543.011 517.014 541.141 516.946Z" fill="#4076AF"></path><path d="M544.165 514.833C544.09 514.644 544.259 514.323 544.685 513.875C544.764 514.065 544.587 514.383 544.165 514.833Z" fill="#4076AF"></path><path d="M546.041 512.874C546.012 512.674 546.228 512.403 546.708 512.104C546.743 512.319 546.515 512.561 546.041 512.874Z" fill="#4076AF"></path><path d="M586.455 294.708C585.852 298.835 584.326 300.183 580.804 297.67C579.898 297.024 578.713 296.769 577.336 296.18C577.015 296.024 576.987 296.007 576.986 295.991C576.701 295.604 576.52 295.188 576.289 294.423C573.662 289.857 571.207 285.59 568.526 281.074C567.612 280.63 567.537 280.027 567.241 279.22C567.087 278.97 567.045 278.963 567.053 278.943C566.364 278.211 565.925 277.324 565.28 276.222C565.147 275.957 565.146 275.888 565.119 275.867C564.148 275.326 563.867 274.339 563.276 273.21C563.136 272.948 563.137 272.893 563.131 272.865C560.953 267.4 557.347 262.88 553.557 258.117C552.645 257.647 552.532 257.036 552.186 256.214C551.998 255.974 551.992 256.006 552.008 256.008C551.772 255.77 551.534 255.515 551.156 255.037C550.909 254.583 550.77 254.37 550.431 254.079C548.845 251.907 547.414 249.843 546.03 247.344C555.093 252.853 562.963 260.087 570.046 268.204C571.134 269.451 572.19 270.726 573.529 272.206C576.589 273.378 577.615 275.932 578.742 278.235C579.698 280.19 580.783 281.953 582.635 283.68C584.272 287.387 587.743 290.055 586.455 294.708Z" fill="#F8EC9C"></path><path d="M505.296 241.336C506.288 240.751 507.272 240.414 508.578 240.087C508.821 241.18 509.079 242.987 508.601 243.21C507.214 243.854 506.332 242.329 505.296 241.336Z" fill="#F7CDDE"></path><path d="M552.016 256.297C552.364 256.431 552.73 256.889 553.194 257.635C552.873 257.488 552.453 257.054 552.016 256.297Z" fill="#F89A60"></path><path d="M514.18 240.074C514.491 240.279 514.761 240.799 515.028 241.619C514.73 241.409 514.434 240.899 514.18 240.074Z" fill="#F89A60"></path><path d="M551.085 255.09C551.277 255.053 551.553 255.28 551.926 255.758C551.739 255.791 551.454 255.572 551.085 255.09Z" fill="#F89A60"></path><path d="M493.709 327.468C495.738 328.148 497.525 329.082 499.652 330.093C501.213 332.804 503.84 333.264 506.191 333.802C508.135 334.248 510.119 334.219 511.559 335.932C511.95 336.395 512.952 336.979 513.234 336.803C517.135 334.372 522.432 336.726 525.273 335.004C529.909 332.194 531.31 337.675 535.009 336.801C538.541 335.966 540.962 340.919 545.302 340.671C548.132 340.509 549.606 344.022 552.202 345.401C557.151 348.029 563.284 349.323 565.397 355.915C566.015 357.845 568.717 357.605 569.884 355.86C572.073 352.587 575.11 349.914 576.281 345.88C577.344 342.214 579.466 339.343 584.487 340.888C586.155 348.744 583.107 355.316 578.325 361.741C578.06 362.042 578.029 361.999 578.036 362.022C577.927 362.226 577.811 362.406 577.891 362.84C577.386 364.591 575.91 365.04 574.584 365.703C573.634 366.178 572.061 366.047 572.294 367.758C572.452 368.92 573.552 369.229 574.437 369.608C576.26 370.39 578.12 371.084 579.972 371.796C581.743 372.478 585.597 371.654 585.133 372.818C584.217 375.112 583.074 377.707 580.472 379.528C577.292 381.753 576.247 385.571 578.904 389.724C575.495 393.53 570.841 395.381 566.615 398.399C566.391 398.593 566.17 398.886 566.026 399C563.435 399.398 561.01 399.362 558.549 399.049C556.531 398.792 554.372 398.75 553.667 396.523C552.969 394.32 554.698 392.906 556.135 391.542C556.491 391.203 556.912 390.939 557.652 390.471C560.671 389.372 563.228 388.228 565.635 386.114C562.162 382.402 558.25 379.225 557.116 373.841C556.401 370.449 553.451 369.953 550.323 371.972C549.536 372.48 548.863 373.586 547.802 372.599C547.006 371.86 546.714 370.516 547.273 369.842C550.094 366.45 547.775 363.524 546.482 360.167C544.934 363.47 543.7 364.631 541.009 360.746C539.124 358.025 536.049 355.895 532.131 355.214C526.579 354.249 521.449 351.267 515.564 351.569C514.42 351.628 513.058 351.313 512.332 350.433C508.743 346.084 506.889 349.517 505.41 352.168C503.822 355.015 502.064 356.969 498.587 357.069C496.85 357.119 495.584 358.255 494.657 359.8C492.497 363.406 489.299 363.545 485.335 363.821C483.114 363.975 483.821 370.559 479.303 371.436C477.846 371.719 476.443 372.308 474.629 372.457C473.897 372.459 473.642 371.906 473.245 372.048C472.942 372.156 473.064 372.445 473.652 372.85C474.18 374.399 474.74 375.953 473.265 376.675C469.11 378.711 468.305 383.351 465.427 386.374C463.959 387.917 464.906 390.148 464.909 392.033C464.919 398.221 464.778 398.459 458.346 398.229C458.056 398.04 457.958 397.943 457.931 397.879C455.881 394.836 452.824 391.917 457.481 388.603C457.833 388.352 458.226 387.512 458.083 387.307C454.807 382.607 460.041 378.972 459.591 374.678C459.511 373.91 459.488 373.324 460.219 373.124C465.207 371.761 461.719 370.503 460.12 369.425C459.477 368.992 457.8 369.86 458.179 368.164C458.511 366.68 459.725 367.394 460.603 367.721C462.117 368.285 463.604 368.919 466.756 370.191C463.143 365.684 466.024 361.841 464.831 357.645C463.958 354.571 468.628 352.185 470.409 349.241C472.442 345.882 477.733 345.551 478.1 340.369C478.5 339.647 478.88 339.122 479.305 339.122C487.102 339.121 490.224 333.351 493.709 327.468Z" fill="#ED4FDE"></path><path d="M435.178 370.615C428.872 362.841 425.508 353.873 424.813 343.527C424.32 336.181 428.856 332.73 433.414 329.197C435.938 327.24 438.141 324.259 442.26 324.567C444.25 324.716 443.686 321.418 445.526 320.136C447.694 317.878 447.867 314.866 450.083 312.557C450.628 312.166 450.875 312.045 451.53 311.815C460.681 311.215 462.7 313.651 460.428 322.166C459.758 324.675 459.672 327.442 457.31 329.701C453.394 330.656 450.705 332.11 450.909 336.394C450.943 337.106 450.412 337.999 449.881 338.56C441.43 347.482 436.96 358.213 435.178 370.615Z" fill="#7048D5"></path><path d="M456.945 330.397C457.482 327.51 457.929 325.062 458.609 322.682C461.242 313.471 461.012 313.122 451.091 312.913C450.077 309.536 452.309 307.498 454.502 305.108C455.577 302.246 457.896 300.609 459.501 298.117C464.662 294.955 469.596 297.311 474.922 297.944C474.265 301.554 473.197 305.005 472.169 308.852C471.547 315.512 470.549 321.729 470.913 328.095C471.039 330.292 471.905 331.838 473.001 333.865C472.217 338.274 466.512 339.118 466.701 344.216C466.742 345.305 462.816 345.962 460.449 345.976C458.132 345.99 457.628 344.186 457.483 342.689C457.104 338.769 457.11 334.811 456.945 330.397Z" fill="#8658F1"></path><path d="M473.339 334.386C469.687 332.863 469.838 329.742 469.649 326.969C469.247 321.08 469.529 315.224 471.875 309.413C472.96 311.463 475.184 313.103 474.377 315.972C474.02 317.244 475.5 317.894 476.711 317.999C478.794 318.181 478.959 319.585 478.95 321.558C478.762 322.212 478.521 322.428 478.278 322.644C477.277 323.532 475.162 323.46 475.609 325.582C475.764 326.315 476.506 326.48 477.191 326.3C479.277 325.752 478.379 323.918 478.914 322.338C481.312 321.799 480.808 320.25 480.873 318.725C481.046 314.666 480.173 310.463 482.542 306.401C484.697 308.761 484.724 312.013 485.949 314.842C487.854 319.241 490.255 323.271 493.906 326.856C493.711 328.999 496.66 332.469 491.567 331.533C491.342 333.643 494.434 332.588 494.103 334.901C491.186 334.297 489.078 334.636 487.579 338.131C485.992 341.834 481.739 339.007 478.495 339.988C478.658 336.505 474.118 337.203 473.339 334.386Z" fill="#F86EDB"></path><path d="M453.056 357.11C453.318 355.497 453.988 354.987 455.069 355.941C455.873 356.65 456.282 357.722 455.247 358.475C454.187 359.247 453.433 358.581 453.056 357.11Z" fill="#ED4FDE"></path><path d="M337.553 221.342C339.974 223.614 342.13 225.636 344.291 227.662C333.113 236.55 333.087 236.55 320.658 227.597C323.534 224.902 326.368 222.16 329.309 219.537C331.75 217.358 332.219 215.502 329.212 213.317C327.074 211.764 325.345 209.659 323.285 207.983C321.345 206.406 321.657 205.403 323.774 204.522C323.926 204.459 324.08 204.374 324.198 204.262C331.165 197.689 337.412 200.738 343.731 205.876C341.592 207.965 339.661 210.291 337.308 212.053C333.082 215.216 333.073 218.069 337.553 221.342Z" fill="#0B191F"></path><path d="M340.405 215.442C342.51 213.566 344.348 211.923 346.548 209.957C347.763 214.358 346.754 218.492 347.118 222.98C343.522 222.078 341.694 219.422 339.371 217.557C338.479 216.841 339.513 216.171 340.405 215.442Z" fill="#0B191F"></path><path d="M319.282 211.034C327.165 216.165 327.168 216.168 319.953 221.753C319.59 222.034 319.137 222.2 318.196 222.702C318.419 218.53 317.035 214.692 319.282 211.034Z" fill="#0B191F"></path><path d="M804.911 563.364C805.354 562.915 805.597 562.71 805.929 562.256C806.374 561.616 806.69 561.179 807.118 560.49C807.715 559.981 808.2 559.724 808.852 559.243C809.305 558.869 809.551 558.668 809.883 558.214C810.293 557.855 810.535 557.651 810.874 557.206C811.292 556.846 811.543 556.643 811.92 556.216C814.62 556.013 816.134 558.205 818.671 559.017C816.034 563.046 812.823 566.436 807.257 566.495C804.812 566.521 803.731 566.26 804.911 563.364Z" fill="#D14EB2"></path><path d="M710.704 449.975C710.614 450.667 710.144 451.32 709.367 452.023C708.17 450.583 709.581 450.458 710.704 449.975Z" fill="#01011B"></path><path d="M719.81 441.426C719.828 441.773 719.616 442.247 719.161 442.841C719.138 442.491 719.359 442.022 719.81 441.426Z" fill="#86EFD8"></path><path d="M711.866 449.044C711.981 449.323 711.785 449.657 711.295 450.037C711.186 449.756 711.371 449.428 711.866 449.044Z" fill="#01011B"></path><path d="M555.75 533.96C554.202 533.928 552.847 533.732 553.821 532.092C554.412 531.097 555.791 530.507 556.802 531.292C558.183 532.364 557.08 533.206 555.75 533.96Z" fill="#61B7E6"></path><path d="M471.676 865.25C476.51 860.462 482.476 857.598 487.908 853.456C495.204 848.419 502.449 843.828 509.423 838.856C511.881 837.103 513.458 837.071 515.906 838.788C526.241 846.04 536.738 853.063 547.518 860.269C547.86 860.368 548.017 860.202 547.959 860.103C548.184 860.231 548.445 860.481 548.797 861.003C550.041 863.225 553.309 863.319 553.414 866.625C553.422 872.278 552.982 877.603 553.368 882.867C553.738 887.906 552.428 891.533 547.397 893.785C536.755 899.917 526.553 906.169 516.702 912.963C513.965 914.85 512.006 914.795 509.188 912.955C498.054 905.685 486.764 898.65 475.419 891.713C472.48 889.915 471.382 887.764 471.586 884.378C471.878 879.568 471.734 874.731 471.67 869.449C471.634 868.234 471.705 867.475 471.713 866.339C471.651 865.961 471.619 865.483 471.676 865.25Z" fill="#03031B"></path><path d="M427.016 315.591C426.443 310.374 428.254 305.362 430.633 300.167C431.07 299.805 431.259 299.701 431.672 299.828C432.061 301.539 432.037 302.993 431.211 304.701C429.822 308.467 428.524 311.88 427.016 315.591Z" fill="#61D6EC"></path><path d="M454.553 304.762C453.508 307.358 452.198 309.792 450.757 312.553C450.626 312.879 450.264 312.933 450.099 313.012C449.663 313.186 449.391 313.28 448.726 313.2C449.676 309.469 451.019 305.914 452.633 302.135C453.128 302.931 453.307 303.971 454.553 304.762Z" fill="#1B2859"></path><path d="M448.118 313.248C448.6 313.023 448.868 313.021 449.535 313.055C449.252 315.538 448.152 317.763 446.141 319.809C446.516 317.786 447.21 315.629 448.118 313.248Z" fill="#2C428C"></path><path d="M441.345 302.371C440.477 301.594 440.047 300.693 440.98 299.836C441.834 299.051 442.399 299.484 442.844 300.677C442.499 301.397 442.075 301.841 441.345 302.371Z" fill="#C2F9DA"></path><path d="M223.934 518.378C224.245 518.53 224.602 518.967 224.96 519.705C224.634 519.558 224.307 519.111 223.934 518.378Z" fill="#F89A60"></path><path d="M578.423 362.08C580.786 355.398 583.585 348.778 584.867 341.252C585.561 330.688 583.228 320.824 581.947 310.433C583.173 310.447 583.86 311.325 584.066 312.553C584.661 316.108 586.64 317.638 590.254 316.898C593.917 316.149 592.732 313.225 592.978 310.512C595.565 310.028 594.987 311.891 594.965 313.781C596.418 324.419 596.869 334.621 592.975 344.497C590.089 351.816 586.448 358.607 578.423 362.08Z" fill="#F86EDB"></path><path d="M595.278 313.977C593.684 313.242 594.267 311.61 593.25 310.292C592.4 307.999 591.81 305.907 591.119 303.476C592.928 299.358 595.991 298.369 602.64 299.758C602.995 300.023 603.005 299.999 602.993 299.998C603.421 300.423 603.473 301.019 603.85 301.77C605.812 305.35 608.023 308.503 608.97 312.628C604.379 311.082 600.013 312.576 595.278 313.977Z" fill="#D14EB2"></path><path d="M593.554 374.188C593.186 374.676 592.933 374.882 592.435 375.132C592.05 373.948 591.79 372.661 593.848 372.223C594.036 372.792 593.856 373.354 593.554 374.188Z" fill="#A331A4"></path><path d="M591.833 375.183C592.144 375.578 592.09 375.969 591.986 376.653C591.518 377.281 591.1 377.615 590.429 378.051C590.05 376.919 589.812 375.638 591.833 375.183Z" fill="#A331A4"></path><path d="M578.116 362.83C577.957 362.803 577.825 362.511 577.869 362.133C578.077 362.219 578.111 362.393 578.116 362.83Z" fill="#F86EDB"></path><path d="M589.906 378.241C590.022 378.466 589.87 378.792 589.47 379.244C589.361 379.027 589.499 378.685 589.906 378.241Z" fill="#A331A4"></path><path d="M801.401 514.905C801.328 514.516 801.48 513.954 801.915 513.274C802.008 513.681 801.816 514.207 801.401 514.905Z" fill="#F89A60"></path><path d="M798.422 522.896C798.336 522.529 798.45 521.958 798.82 521.225C798.925 521.606 798.774 522.15 798.422 522.896Z" fill="#F17187"></path><path d="M358.49 748.593C358.206 745.267 358.149 741.619 358.16 737.522C359.675 740.75 358.953 744.521 358.49 748.593Z" fill="#E3E8EF"></path><path d="M559.245 390.733C557.193 392.521 553.899 393.772 554.749 396.272C555.607 398.796 559.012 397.844 561.404 397.948C562.71 398.004 564.042 397.892 565.534 398.918C564.263 400.782 562.422 401.179 560.12 400.597C555.986 399.551 551.776 399.755 547.295 400.71C540.484 400.635 533.963 400.309 527.45 399.865C526.742 399.817 526.081 399.086 525.227 398.36C527.192 395.867 529.956 396.7 532.492 396.542C535.255 396.369 538.062 396.739 541.072 395.633C541.579 395.342 541.768 395.211 542.249 394.918C544.232 394.572 544.194 393.417 543.95 391.875C543.791 390.444 542.843 390.054 541.83 389.303C541.369 388.727 541.184 388.342 540.919 387.631C539.065 384.935 537.329 382.607 533.783 383.256C532.995 383.4 531.787 383.058 531.547 382.417C529.977 378.225 526.335 378.942 523.193 378.914C519.675 378.883 516.405 378.504 513.075 377.07C509.082 375.351 505.128 376.948 501.843 379.295C496.988 382.764 490.495 383.046 486.24 387.635C485.502 388.432 483.988 388.386 482.889 388.014C480.265 387.126 478.256 388.217 476.707 390.039C474.911 392.152 472.827 392.097 470.165 391.617C467.695 391.782 466.155 390.803 465.804 388.754C465.415 386.485 467.195 385.639 468.992 384.95C472.111 383.754 474.589 382.317 473.887 378.091C473.513 375.838 475.274 375.17 477.118 376.581C479.774 378.614 483.642 378.637 485.632 381.764C485.704 381.877 486.252 381.676 486.578 381.604C487.166 381.918 486.823 380.867 486.778 381.532C486.761 381.774 486.595 381.77 486.279 381.522C483.712 379.506 483.987 375.365 487.489 373.163C489.5 371.899 491.08 368.89 494.376 370.221C495.883 370.829 495.302 369.374 495.438 368.8C496.229 365.463 497.94 365.151 500.33 367.305C502.438 369.205 505.133 368.242 508.287 369.16C505.797 366.661 506.281 364.544 507.955 362.549C509.83 360.315 512.267 359.513 515.106 359.988C517.071 360.317 518.284 361.617 517.605 363.509C516.117 367.651 517.911 368.573 521.582 368.196C522.912 368.059 524.219 368.468 525.831 368.946C528.002 369.919 529.445 371.556 531.903 371.965C533.116 372.39 534.148 373.409 534.931 372.517C537.721 369.338 540.338 370.572 543.138 372.448C546.102 374.433 550.941 374.357 550.378 380.032C550.239 381.436 553.214 381.249 554.639 382.68C555.118 383.027 555.303 383.176 555.749 383.571C557.41 385.898 560.476 387.112 559.245 390.733Z" fill="#F3ACE1"></path><path d="M542.835 394.782C542.348 397.84 540.126 397.9 537.929 397.929C533.946 397.983 529.962 397.991 525.518 398.034C524.274 398.032 523.491 398.014 522.317 398.039C512.618 398.031 503.311 397.981 493.539 397.92C491.333 397.058 489.478 397.602 487.679 397.513C486.335 397.446 485.412 397.019 485.198 395.616C485.01 394.381 485.262 392.762 486.428 392.666C491.934 392.208 493.548 386.212 498.324 384.629C500.287 383.978 501.723 382.068 504.165 383.485C505.404 384.203 506.74 383.352 507.949 382.793C508.993 382.31 510.485 381.111 511.125 381.884C513.818 385.138 518.418 382.798 521.044 385.487C522.726 387.209 523.952 385.193 525.506 385.443C530.085 386.182 534.619 386.857 538.934 389.521C539.275 392.119 540.058 393.968 542.835 394.782Z" fill="#F4F5F7"></path><path d="M546.998 401.002C547.978 401.192 549.094 400.601 550.012 401.501C549.096 402.329 548.252 401.925 547.205 401.24C547.003 400.996 547 401 546.998 401.002Z" fill="#F3ACE1"></path><path d="M513.259 800.534C511.473 801.075 510.032 801.538 508.565 801.646C497.665 802.446 497.026 801.721 497.741 790.871C497.88 788.772 498.396 787.907 500.585 788.043C503.059 788.196 505.55 788.1 508.033 788.049C511.159 787.985 514.119 788.339 515.456 791.709C516.729 794.919 516.195 797.862 513.259 800.534Z" fill="#03031B"></path><path d="M348.91 357.406C348.827 356.95 349.01 356.524 349.05 356.296C351.378 354.198 353.774 354.166 356.51 356.065C358.203 359.575 358.212 363.221 361.067 365.807C364.809 369.196 368.735 371.886 373.977 370.48C379.448 369.013 383.803 365.676 384.721 359.895C385.496 355.016 388.713 356.442 391.401 356.315C395.066 356.143 393.803 359.048 394.046 360.951C394.734 366.332 392.841 370.028 387.607 372.302C383.062 374.278 378.789 376.918 374.52 379.472C371.896 381.041 369.695 380.885 367.198 379.194C364.179 377.151 361.108 375.019 357.762 373.661C350.416 370.682 347.491 365.585 348.91 357.406Z" fill="#030727"></path><path d="M349.375 354.127C349.101 352.212 349.06 350.577 348.958 348.545C348.48 343.757 350.53 341.196 354.534 339.454C358.639 337.668 362.616 335.472 366.368 333.024C369.726 330.834 372.823 330.797 376.157 332.668C382.327 336.13 389.027 338.803 393.849 344.793C393.892 347.413 393.809 349.702 393.664 352.418C390.335 352.404 386.671 354.453 383.533 351.063C382.121 350.11 381.019 349.394 380.018 348.499C372.546 341.82 367.658 342.102 361.026 349.697C357.961 353.208 354.867 356.351 349.375 354.127Z" fill="#03031B"></path><path d="M380.65 352.19C381.657 356.633 379.725 360.162 378.192 363.515C376.466 367.289 372.577 365.25 369.619 365.42C367.264 365.555 364.916 365.092 364.062 362.262C363.357 359.927 362.696 357.565 361.089 355.21C360.799 350.25 363.694 346.829 368.94 345.44C373.929 344.12 378.12 346.386 380.65 352.19Z" fill="#03031B"></path><path d="M380.851 352.248C374.378 343.457 367.004 344.063 361.048 354.53C359.446 354.378 357.743 353.074 356.838 356.115C354.569 355.3 352.274 355.455 349.521 356.011C349.072 355.573 349.054 355.078 349.089 354.215C353.857 354.506 357.582 353.028 360.073 348.825C362.287 345.088 366.834 344.187 369.575 341.066C370.155 340.405 371.022 340.337 371.763 340.991C375.406 344.204 380.885 345.16 383.143 350.508C382.511 351.192 381.793 351.547 380.851 352.248Z" fill="#D14EB2"></path><path d="M460.273 791.319C467.57 793.067 468.322 801.571 466.08 807.768C463.853 813.924 457.661 817.368 451.846 815.866C447.043 814.625 444.396 809.784 444.835 803.045C445.269 796.395 449.266 791.842 455.405 791.152C456.878 790.987 458.39 791.177 460.273 791.319Z" fill="#03031B"></path><path d="M360.695 540.958C363.292 543.417 365.939 545.381 368.501 547.45C369.303 548.097 370.954 548.378 370.444 549.849C370 551.129 368.639 550.846 367.476 550.96C366.037 551.102 364.644 551.711 362.912 552.314C362.593 552.51 362.573 552.572 362.576 552.605C362.598 552.906 362.616 553.175 362.251 553.569C361.696 556.621 359.696 557.981 357.3 558.961C352.064 561.102 346.746 562.979 341.222 564.273C334.88 565.759 327.415 561.381 325.598 555.193C325.204 553.853 325.758 553.384 326.526 552.777C330.129 549.928 333.744 547.094 338.107 543.663C338.107 547.287 338.084 550.04 338.114 552.792C338.141 555.172 338.789 556.844 341.992 555.363C344.265 552.545 347.392 552.258 350.115 551.343C353.812 550.101 355.978 547.973 356.103 543.606C356.675 542.246 357.59 541.822 358.877 541.28C359.228 541.135 359.63 541.163 359.828 541.131C360.256 540.901 360.485 540.702 360.695 540.958Z" fill="#030727"></path><path d="M317.259 520.668C321.905 521.969 324.103 526.588 327.981 529.749C326.785 533.35 328.567 535.42 330.968 537.19C333.231 538.858 333.31 540.349 331.127 542.284C328.136 544.935 325.144 547.535 321.701 549.608C318.542 551.51 317.187 550.593 317.201 547.056C317.237 538.412 317.265 529.769 317.259 520.668Z" fill="#030727"></path><path d="M333.938 524.401C337.689 524.549 339.653 527.665 342.231 529.824C345.658 532.694 348.88 535.807 352.486 538.963C353.101 539.235 353.386 539.419 353.802 539.85C353.964 540.049 353.998 540 353.978 540.022C354.96 540.719 356.252 541.122 356.254 542.981C352.67 547.579 347.992 549.542 342.468 550.173C343.677 541.086 339.189 535.274 332.198 530.388C332.816 528.428 334.746 527.086 333.938 524.401Z" fill="#030727"></path><path d="M342.165 550.352C346.977 548.367 351.333 545.963 355.841 543.078C356.322 542.862 356.475 542.779 356.829 542.861C358.017 548.323 355.924 551.492 350.618 552.704C348.043 553.293 345.56 554.286 342.663 555.097C342.24 553.66 342.189 552.222 342.165 550.352Z" fill="#1B2859"></path><path d="M361.952 553.971C361.798 553.351 361.892 553.061 362.363 552.73C362.701 553.403 363.412 554.183 362.521 554.922C362.36 554.697 362.198 554.472 361.952 553.971Z" fill="#61D6EC"></path><path d="M271.145 553.542C274.731 553.503 278.473 551.849 281.872 554.603C279.918 556.557 281.347 560.382 277.795 561.06C272.169 562.135 270.995 560.975 271.145 553.542Z" fill="#D14EB2"></path><path d="M526.134 369.814C523.415 369.776 520.974 369.291 518.601 369.516C514.885 369.87 514.61 368.063 515.547 365.35C516.036 363.934 518.214 362.304 515.762 361.289C513.457 360.334 510.758 360.683 509.062 363.071C508.114 364.406 506.111 365.762 508.59 367.574C509.224 368.038 509.641 368.8 510.699 370.077C505.734 369.628 500.931 371.687 497.824 366.489C496.23 368.427 495.814 370.247 497.876 372.558C491.787 370.682 487.905 372.834 485.59 377.902C483.985 381.418 487.254 380.58 488.469 381.622C485.344 382.97 485.364 382.953 483.192 380.376C482.917 380.051 482.294 379.88 481.83 379.876C479.109 379.856 476.346 379.99 475.233 375.763C477.202 382.202 473.695 385.191 469.422 386.551C463.655 388.386 466.934 389.462 469.633 391.013C472.434 390.831 472.15 392.727 472.252 394.598C471.592 398.034 470.227 399.326 466.748 398.734C464.148 398.291 461.331 399.442 458.336 398.301C464.344 397.768 465.09 396.371 463.522 387.578C463.423 387.028 462.302 386.288 462.921 385.97C467.206 383.764 467.175 377.628 471.993 376.057C474.316 375.3 471.56 373.448 472.976 372.294C474.905 371.391 476.786 370.766 478.69 370.218C481.072 369.533 482.792 368.715 482.681 365.519C482.614 363.589 483.087 360.905 486.949 362.356C489.844 363.444 492.798 361.863 493.859 358.561C494.729 355.855 497.39 355.076 499.03 355.406C502.127 356.031 503.169 354.503 503.656 352.356C504.205 349.939 506.074 348.822 507.616 347.434C509.365 345.859 511.36 344.021 512.231 348.47C512.704 350.887 516.394 351.019 517.116 350.454C519.712 348.423 520.882 349.403 522.679 351.373C523.258 352.007 525.141 352.284 526.555 352.495C530.597 353.099 535.606 352.042 538.105 356.916C538.248 357.195 538.631 357.634 538.773 357.589C543.566 356.07 541.825 360.887 543.538 362.627C545.328 362.342 541.946 358.246 546.329 359.116C548.24 359.495 548.278 359.096 548.054 360.825C547.895 362.058 547.632 362.784 549.9 362.784C551.854 362.785 551.104 365.668 550.146 367.192C549.208 368.683 547.424 369.769 548.413 372.269C549.598 369.668 552.066 369.064 554.088 367.832C555.522 370.604 559.284 372.016 559.274 375.442C559.266 377.947 559.547 379.054 562.297 379.127C563.958 379.171 565.76 379.829 563.481 382.077C562.207 383.334 564.095 382.926 564.483 383.213C565.771 384.165 567.605 384.309 568.724 386.196C565.493 387.471 563.285 390.366 559.389 391.016C559.691 387.763 556.11 386.988 555.134 384.297C555.184 383.804 555.379 383.618 555.57 383.428C555.762 383.238 555.699 383.303 555.198 383.818C553.406 384.253 552.914 382.035 551.091 382.404C548.007 383.029 547.959 381.27 548.469 378.876C548.748 377.564 550.92 374.067 546.18 376.2C545.505 376.503 542.374 373.895 540.58 372.427C538.343 370.596 536.872 371.254 536.078 373.472C534.601 377.596 533.692 373.878 532.289 373.176C529.832 372.458 529.608 368.589 526.134 369.814Z" fill="#F86EDB"></path><path d="M472.427 395.15C471.565 393.796 471.015 392.621 470.21 391.247C470.265 390.508 470.572 389.968 470.88 389.428C473.93 392.773 475.31 388.888 477.198 387.825C479.005 386.807 480.322 385.018 482.731 386.85C483.41 387.367 485.538 387.2 486.007 386.587C490.517 380.682 498.284 381.024 503.808 377.073C507.423 374.489 511.155 373.947 515.435 376.721C518.583 378.76 522.817 376.894 526.443 377.776C528.629 378.308 533.067 375.914 532 381.509C531.987 381.577 533.42 382.09 534.185 382.107C536.896 382.17 539.847 383.745 542.051 386.808C541.151 387.734 540.706 388.659 539.514 389.698C534.485 389.269 530.111 386.002 525.74 387.14C521.235 388.314 517.493 382.078 513.186 386.554C513.037 386.71 512.172 386.47 511.907 386.175C509.927 383.972 509.994 384.181 507.249 384.74C505.92 385.01 504.119 386.559 502.9 384.368C502.471 383.595 501.567 383.467 501.338 384.002C499.839 387.509 494.426 386.311 493.611 390.522C493.069 393.32 490.224 391.828 488.831 393.106C488.015 393.855 485.906 392.869 486.125 395.102C486.309 396.98 487.687 396.913 489.051 396.993C490.196 397.061 491.332 397.267 492.774 397.661C488.471 397.929 483.86 397.812 479.264 398.02C476.556 398.143 474.463 397.317 472.427 395.15Z" fill="#F7CDDE"></path><path d="M484.996 408.004C484.473 407.779 483.954 407.55 483.436 407.321C483.545 407.116 483.654 406.91 483.764 406.705C484.105 406.975 484.445 407.245 484.896 407.754C485.005 407.993 485 408 484.996 408.004Z" fill="#F7CDDE"></path><path d="M301.052 417.684C300.528 417.713 300.158 417.59 299.787 417.467C299.888 417.366 300.013 417.164 300.088 417.181C300.467 417.266 300.833 417.409 301.052 417.684Z" fill="#86EFD8"></path><path d="M415.483 146.426C414.009 149.472 411.708 149.504 409.462 148.579C408.069 148.006 408.3 146.528 408.78 145.143C409.551 142.92 411.206 141.859 413.275 142.231C415.031 142.547 416.761 143.632 415.483 146.426Z" fill="#1B2859"></path><path d="M398.831 608.761C398.536 609.304 398.063 609.628 397.289 609.966C397.165 609.063 397.178 607.956 398.831 608.761Z" fill="#A5FBD0"></path><path d="M190.109 546.188C190.327 546.047 190.6 546.219 190.932 546.696C190.706 546.853 190.43 546.686 190.109 546.188Z" fill="#F17187"></path><path d="M440.998 260.002C440.878 259.866 440.76 259.729 440.642 259.592C440.726 259.638 440.81 259.684 440.949 259.863C441.004 259.995 441 260 440.998 260.002Z" fill="#61D6EC"></path><path d="M431.924 299.803C431.727 300.043 431.557 300.026 431.134 299.959C431.031 299.613 431.239 299.366 431.742 299.101C431.967 299.203 431.958 299.375 431.924 299.803Z" fill="#86EFD8"></path><path d="M845.358 538.024C845.447 537.618 845.599 536.669 846.104 537.871C845.945 537.981 845.554 538.013 845.358 538.024Z" fill="#F17187"></path><path d="M835.22 545.879C835.098 545.646 835.293 545.394 835.813 545.133C835.918 545.358 835.718 545.604 835.22 545.879Z" fill="#F17187"></path><path d="M285.178 360.779C284.859 360.937 284.402 360.911 284.179 360.965C276.299 356.37 268.642 351.721 260.677 346.944C260.37 346.817 260.326 346.825 260.312 346.842C258.78 345.733 259.796 344.148 259.771 342.4C260.048 335.362 260.27 328.711 260.113 322.068C260.041 319.021 261.042 317.167 263.711 315.726C267.06 313.917 270.385 311.956 273.388 309.632C278.66 305.55 284.106 305.155 290.139 307.605C294.122 309.223 298.271 310.429 302.685 311.983C303.438 312.69 303.854 313.232 304.102 313.91C300.854 316.491 297.555 315.048 294.38 314.455C287.756 313.218 281.259 312.801 274.814 315.471C265.286 319.418 262.942 330.746 270.248 338.075C270.95 338.779 271.709 339.427 272.729 340.346C273.941 341.048 274.682 341.736 275.705 342.667C276.354 343.24 276.736 343.552 277.45 344.039C283.423 346.467 289.243 345.446 295.394 345.033C298.921 344.098 303.581 345.503 303.506 339.397C303.231 334.698 303.336 330.402 303.409 326.108C303.443 324.135 303.471 322.102 305.566 320.464C308.919 319.72 310.233 320.916 310.23 323.902C310.223 329.286 310.342 334.67 310.464 340.518C311.025 345.334 309.078 347.947 305.162 349.894C298.48 353.215 292.039 357.02 285.178 360.779Z" fill="#030727"></path><path d="M259.747 342.066C260.064 343.357 260.148 344.705 260.265 346.456C259.86 346.547 259.422 346.234 258.92 345.643C258.919 344.582 258.983 343.8 259.048 342.636C259.049 342.255 259.512 342.122 259.747 342.066Z" fill="#61B7E6"></path><path d="M285.815 363.887C285.262 364.007 285.027 363.573 285.532 362.765C285.769 362.87 285.791 363.16 285.815 363.887Z" fill="#4E99D0"></path><path d="M602.957 299.657C599.187 300.858 594.987 299.982 591.305 302.882C589.486 300.553 589.368 297.24 586.574 295.091C586.118 291.122 583.306 288.344 581.865 284.603C581.394 282.166 578.024 280.81 580.032 278.18C582.095 275.479 584.878 274.348 588.665 275.595C589.031 275.816 589.136 275.884 589.153 275.944C589.282 276.174 589.393 276.344 589.753 276.691C590.001 276.868 590.094 276.908 590.113 276.955C590.254 277.171 590.377 277.339 590.738 277.71C590.977 277.912 591.051 277.955 591.065 277.996C591.448 278.474 591.47 279.054 591.935 279.686C593.614 281.745 595.055 283.668 596.719 285.83C597.442 286.44 597.472 287.035 597.837 287.771C598.026 287.981 598 288.001 598.011 287.99C598.177 288.152 598.333 288.324 598.683 288.786C598.877 289.074 598.991 289.472 599.031 289.674C600.354 293.015 601.636 296.154 602.957 299.657Z" fill="#EC427F"></path><path d="M589.002 275.482C587.744 276.024 586.442 276.171 585.171 276.452C581.033 277.37 579.033 279.332 581.808 283.899C577.61 281.603 577.18 276.376 573.91 272.725C573.857 267.493 578.13 267.465 581.586 266.04C584.425 268.97 587.218 271.659 589.002 275.482Z" fill="#F17187"></path><path d="M592.13 279.546C591.807 279.422 591.441 279.022 591.076 278.33C591.414 278.448 591.751 278.86 592.13 279.546Z" fill="#F17187"></path><path d="M598.02 287.682C597.682 287.539 597.337 287.096 596.968 286.361C597.299 286.506 597.656 286.944 598.02 287.682Z" fill="#F17187"></path><path d="M598.834 288.827C598.561 288.952 598.323 288.742 598.092 288.212C598.278 288.18 598.535 288.38 598.834 288.827Z" fill="#F17187"></path><path d="M589.933 276.664C589.686 276.841 589.445 276.694 589.224 276.215C589.475 276.045 589.707 276.197 589.933 276.664Z" fill="#F17187"></path><path d="M590.912 277.7C590.667 277.855 590.428 277.693 590.195 277.214C590.446 277.051 590.685 277.213 590.912 277.7Z" fill="#F17187"></path><path d="M688.011 207.599C686.153 207.041 683.491 208.954 682.715 206.342C682.143 204.417 683.294 202.489 685.676 201.361C690.153 200.887 694.616 200.171 696.793 205.412C695.219 206.577 693.447 206.807 691.284 207.096C690.319 207.511 689.623 207.476 688.697 207.748C688.367 207.734 688.145 207.578 688.011 207.599Z" fill="#0B191F"></path><path d="M694.109 230.886C693.128 234.326 691.895 234.852 690.202 231.332C691.177 227.145 689.65 223.475 689.091 219.311C690.798 219.226 690.957 220.523 691.033 221.901C691.14 223.862 692.14 224.936 694.538 224.942C694.633 226.789 694.353 228.634 694.109 230.886Z" fill="#F17187"></path><path d="M688.709 207.785C688.989 207.514 689.612 207.294 690.569 207.13C690.286 207.403 689.669 207.62 688.709 207.785Z" fill="#F17187"></path><path d="M696.73 221.061C696.79 221.233 696.633 221.52 696.243 221.907C696.073 221.666 696.24 221.389 696.73 221.061Z" fill="#F17187"></path><path d="M689.126 216.911C688.964 216.993 688.898 216.557 688.896 216.338C689.283 216.212 689.609 216.341 689.126 216.911Z" fill="#F17187"></path><path d="M439.951 545.551C439.564 547.599 438.716 548.619 437.358 546.952C436.579 545.996 436.297 544.507 436.125 543.214C435.903 541.543 435.94 539.52 438.159 539.349C440.535 539.166 439.807 541.306 439.96 542.649C440.053 543.471 439.971 544.312 439.951 545.551Z" fill="#6DEFC4"></path><path d="M586.171 762.841C586.869 763.219 587.201 763.717 585.816 763.542C585.751 763.274 585.869 763.148 586.171 762.841Z" fill="#798CB4"></path><path d="M337.018 517.46C344.784 511.53 344.783 511.532 352.781 516.922C353.466 517.383 354.18 517.801 355.159 518.439C355.438 518.639 355.487 518.631 355.509 518.618C355.978 518.332 356.375 518.407 356.671 519.125C356.614 519.471 356.65 519.326 356.588 519.367C357.399 519.262 357.419 519.955 357.823 520.695C358.365 521.406 358.679 521.918 359.057 522.725C357.121 526.008 353.663 526.563 350.403 528.087C344.967 525.661 341.979 520.58 337.018 517.46Z" fill="#03031B"></path><path d="M359.71 524.161C364.428 527.534 365.343 531.648 362.728 538.161C361.554 538.6 360.944 538.352 360.214 537.448C359.834 537.083 359.696 536.987 359.316 536.817C356.86 536.573 355.485 535.21 354.236 533.155C354.083 532.862 354.117 532.414 354.186 532.201C355.048 528.808 357.848 526.981 359.71 524.161Z" fill="#030727"></path><path d="M359.974 523.749C359.582 527.443 357.193 529.582 354.555 531.871C352.082 531.948 351.645 529.802 350.184 528.441C352.083 525.221 355.761 525 358.755 523.037C359.396 523.18 359.67 523.34 359.974 523.749Z" fill="#4483B7"></path><path d="M354.061 533.242C355.645 533.971 357.208 535.079 358.922 536.465C355.105 539.398 354.771 536.188 354.061 533.242Z" fill="#7048D5"></path><path d="M357.286 542.878C357.032 543.027 356.607 542.909 356.388 542.927C355.511 542.168 354.854 541.392 354.077 540.33C355.46 540.357 356.962 540.669 358.846 541.058C358.665 541.666 358.103 542.197 357.286 542.878Z" fill="#7048D5"></path><path d="M359.978 537.569C360.57 537.433 361.168 537.688 362.049 538.121C361.886 539.125 361.439 539.951 360.834 541.094C360.677 541.412 360.299 541.366 360.163 541.233C360.012 540.053 359.997 539.007 359.978 537.569Z" fill="#7048D5"></path><path d="M334.001 524.004C333.894 523.923 333.767 523.858 333.639 523.792C333.78 523.769 333.921 523.745 334.001 523.887C333.94 524.052 333.98 524.02 334.001 524.004Z" fill="#030727"></path><path d="M353.845 539.806C353.652 539.894 353.34 539.74 352.904 539.347C353.096 539.26 353.411 539.412 353.845 539.806Z" fill="#7048D5"></path><path d="M617.513 138.064C619.143 139.719 620.234 141.392 620.754 143.74C619.988 147.847 618.19 150.93 614.011 151.635C610.314 152.259 607.589 150.63 605.551 147.164C604.895 144.858 604.85 142.802 606.052 140.504C609.309 136.94 612.821 135.46 617.513 138.064Z" fill="#03031B"></path><path d="M548.795 861.002C548.569 861.04 548.225 860.83 547.891 860.313C548.159 860.255 548.418 860.505 548.795 861.002Z" fill="#6DEFC4"></path><path d="M357.989 520.586C357.626 520.562 357.202 520.229 356.651 519.652C357.239 519.302 357.712 519.581 357.989 520.586Z" fill="#86EFD8"></path><path d="M356.611 519.16C356.277 519.429 356 519.278 355.657 518.812C355.891 518.687 356.25 518.767 356.611 519.16Z" fill="#86EFD8"></path><path d="M471.589 865.096C471.734 865.018 471.836 865.503 471.744 865.732C471.301 865.765 471.232 865.503 471.589 865.096Z" fill="#4E99D0"></path><path d="M320.858 313.662C319.526 316.425 317.438 316.296 315.008 315.336C314.813 315.015 315.033 314.616 315.061 314.389C315.412 313.633 315.495 313.017 315.972 312.293C317.299 311.246 317.939 309.315 319.481 309.667C321.163 310.051 320.768 311.924 320.858 313.662Z" fill="#1B2859"></path><path d="M315.944 312.269C316.013 312.692 315.791 313.245 315.33 313.981C315.277 313.575 315.465 312.987 315.944 312.269Z" fill="#61D6EC"></path><path d="M305.674 320.073C303.819 326.434 305.581 332.783 304.92 339.458C302.848 342.164 300.373 342.72 297.146 341.519C294.737 338.338 295.624 334.974 295.456 331.773C295.345 329.655 295.393 327.531 294.706 325.053C294.397 323.789 294.505 322.949 294.853 321.714C296.861 315.655 297.457 315.239 303.682 315.719C304.032 315.951 304.438 315.942 304.641 315.949C305.015 317.251 305.186 318.545 305.674 320.073Z" fill="#2C428C"></path><path d="M230.086 546.251C230.414 546.429 230.697 546.883 231.001 547.614C229.324 548.42 230.292 547.035 230.086 546.251Z" fill="#EC427F"></path><path d="M746.963 603.955C746.951 603.939 746.837 604.401 746.837 604.401C746.837 604.401 746.819 604.147 746.913 604.068C747.007 603.989 746.975 603.97 746.963 603.955Z" fill="#030727"></path><path d="M624.447 539.279C625.721 537.879 626.873 535.912 628.49 537.802C629.285 538.731 628.181 540.404 627.141 541.16C625.377 542.442 624.477 541.518 624.447 539.279Z" fill="#7048D5"></path><path d="M604.003 301.689C603.701 301.523 603.357 301.064 602.997 300.3C603.307 300.463 603.634 300.929 604.003 301.689Z" fill="#EC427F"></path><path d="M304.03 315.632C300.326 316.388 296.761 317.016 295.87 321.914C291.287 319.833 286.774 319.142 282.027 319.503C275.968 319.964 273.691 322.22 273.497 328.216C273.421 330.541 273.464 332.87 273.51 335.589C273.274 337.829 274.253 339.699 273.093 341.799C263.954 337.554 264.332 329.478 265.237 321.52C265.578 318.522 268.404 316.509 271.108 315.21C279.19 311.327 287.657 311.099 296.195 313.326C298.501 313.928 300.749 314.069 303.5 314.05C303.966 314.468 303.997 314.891 304.03 315.632Z" fill="#1B2859"></path><path d="M761.463 334.176C761.085 328.699 761.01 323.343 761 317.527C762.384 317.013 763.712 317.041 765.019 316.887C768.384 316.492 769.346 318.117 769.145 321.233C768.912 324.853 768.991 328.494 768.901 332.601C766.571 333.898 764.297 334.85 761.463 334.176Z" fill="#F17187"></path><path d="M693.474 235.455C693.522 235.428 693.426 235.482 693.474 235.455Z" fill="#01011B"></path><path d="M662.758 717.254C662.807 716.296 662.89 715.334 662.975 713.889C663.739 713.581 664.5 713.756 665.635 714.052C666.354 714.417 666.715 714.634 667.39 714.734C675.543 716.38 683.395 718.122 691.623 719.992C692.16 720.22 692.32 720.321 692.741 720.314C694.921 718.897 699.362 724.271 699.456 717.414C700.461 717.008 701.348 717.004 702.568 717.008C703.181 725.926 702.809 726.22 693.406 724.114C692.851 724.124 692.691 724.24 692.327 724.141C692.122 723.926 692.066 723.975 692.048 723.943C691.868 723.806 691.706 723.701 691.274 723.695C688.573 723.272 686.143 722.75 683.355 722.114C682.844 722.12 682.691 722.239 682.354 722.132C682.171 721.906 682.088 721.95 682.057 721.915C681.501 721.496 680.857 721.496 679.958 721.27C677.676 720.826 675.698 720.444 673.357 719.959C672.698 719.633 672.393 719.424 671.799 719.245C670.886 719.192 670.25 719.126 669.303 718.983C668.489 718.473 667.833 718.499 666.935 718.273C666.26 718.188 665.892 718.157 665.261 718.039C664.56 717.514 663.964 717.502 663.136 717.297C662.857 717.227 662.792 717.249 662.758 717.254Z" fill="#F8F9FB"></path><path d="M705.298 714.209C706.619 712.382 708.134 712.824 709.777 714.52C708.503 714.669 707.051 714.54 705.298 714.209Z" fill="#E3E8EF"></path><path d="M679.897 721.421C680.288 721.281 680.923 721.354 681.792 721.653C681.398 721.798 680.77 721.716 679.897 721.421Z" fill="#E3E8EF"></path><path d="M666.869 718.437C667.265 718.291 667.903 718.363 668.766 718.671C668.365 718.823 667.738 718.738 666.869 718.437Z" fill="#E3E8EF"></path><path d="M663.049 717.458C663.439 717.313 664.022 717.4 664.801 717.719C664.411 717.865 663.826 717.777 663.049 717.458Z" fill="#E3E8EF"></path><path d="M692.202 724.04C692.122 723.926 692.57 723.936 692.791 723.972C693.012 724.008 692.678 724.229 692.678 724.229C692.678 724.229 692.283 724.154 692.202 724.04Z" fill="#E3E8EF"></path><path d="M691.253 723.876C691.283 723.738 691.563 723.681 691.936 723.768C691.854 723.926 691.679 723.942 691.253 723.876Z" fill="#E3E8EF"></path><path d="M682.239 722.021C682.171 721.906 682.587 721.926 682.793 721.963C682.998 722 682.684 722.22 682.684 722.22C682.684 722.22 682.308 722.136 682.239 722.021Z" fill="#E3E8EF"></path><path d="M671.718 719.46C671.884 719.323 672.246 719.388 672.801 719.654C672.634 719.791 672.273 719.726 671.718 719.46Z" fill="#E3E8EF"></path><path d="M699.471 707.403C701.494 708.018 701.505 709.289 699.854 710.868C699.503 709.914 699.426 708.851 699.471 707.403Z" fill="#F8F9FB"></path><path d="M692.759 720.108C692.726 720.278 692.45 720.348 692.087 720.269C692.172 720.083 692.343 720.046 692.759 720.108Z" fill="#E3E8EF"></path><path d="M667.463 714.426C667.287 714.621 666.881 714.605 666.242 714.381C666.417 714.187 666.826 714.2 667.463 714.426Z" fill="#E3E8EF"></path><path d="M239.011 747.533C237.241 745.29 237.999 742.435 238.672 739.321C238.978 741.721 239.018 744.404 239.011 747.533Z" fill="#798CB4"></path><path d="M545.935 247.054C545.77 246.893 545.653 246.686 545.537 246.478C545.664 246.515 545.79 246.552 545.997 246.749C546.078 246.909 545.985 247.008 545.935 247.054Z" fill="#F8EC9C"></path><path d="M555.981 484.575C555.623 487.005 555.213 489.023 554.566 491.359C553.757 491.173 553.185 490.669 552.219 490.134C549.911 491.885 547.5 491.547 545.217 491.558C537.594 491.595 529.967 491.723 522.348 491.488C519.137 491.389 516.837 492.3 515.695 495.923C515.413 496.843 515.128 497.283 514.331 497.796C513.016 498.341 511.975 498.341 510.626 498.697C509.773 498.88 509.277 498.915 508.414 498.815C507.833 498.624 507.615 498.507 507.205 498.073C507.014 497.128 507.015 496.501 507.016 495.56C509.594 489.492 504.411 492.413 502.379 491.423C500.785 491.363 499.567 491.214 498.237 490.247C498.283 488.696 498.576 487.43 498.939 485.843C499.311 482.934 502.057 481.976 503.072 479.419C510.067 469.658 512.404 469.572 520.532 478.755C522.569 480.779 524.125 484.418 526.636 483.185C528.817 482.115 526.592 478.77 526.379 476.436C526.232 474.82 525.568 473.279 524.638 471.546C523.972 470.631 523.456 470.002 522.611 469.288C521.796 468.629 521.143 468.291 520.092 468.177C519.426 468.093 519.045 468.031 518.375 467.911C517.293 467.721 516.503 467.72 515.403 467.973C513.983 468.233 512.875 468.208 511.434 467.994C509.23 467.376 507.345 466.831 505.425 466.529C502.962 466.142 500.837 466.621 500.018 469.832C499.71 470.32 499.562 470.5 499.099 470.832C496.594 471.681 494.576 469.393 492.145 470.9C491.452 471.544 491.503 472.136 491.134 472.826C490.972 473.04 491.029 473.024 491.025 472.994C490.618 473.383 490.231 473.817 489.498 474.291C489.036 474.438 488.842 474.462 488.374 474.377C487.06 468.581 487.037 468.554 482.721 472.19C481.382 473.318 479.933 472.914 478.055 472.734C488.561 463.446 499.521 454.302 510.381 445.041C511.851 443.787 512.642 443.843 514.085 445.024C527.482 456.002 540.911 466.941 554.433 477.764C556.83 479.682 555.637 481.991 555.981 484.575Z" fill="#03031B"></path><path d="M477.342 472.713C478.015 474.422 477.051 474.983 475.034 474.904C475.436 474.195 476.24 473.511 477.342 472.713Z" fill="#03031B"></path><path d="M517.103 441.309C518.194 441.029 519.128 441.471 519.792 442.852C518.878 442.844 517.562 443.064 517.103 441.309Z" fill="#4996AF"></path><path d="M519.959 443.356C520.165 443.303 520.459 443.506 520.835 443.973C520.627 444.027 520.337 443.82 519.959 443.356Z" fill="#4996AF"></path><path d="M472.721 476.041C472.75 476.254 472.498 476.507 471.985 476.839C471.963 476.638 472.202 476.36 472.721 476.041Z" fill="#03031B"></path><path d="M510.464 466.518C512.325 466.594 513.766 466.664 515.637 466.677C516.499 466.55 516.934 466.526 517.672 466.687C518.393 466.912 518.814 467.007 519.559 467.074C520.658 467.697 521.653 467.401 522.733 467.931C523.509 468.689 524.071 469.176 524.769 469.909C524.743 473.922 522.803 476.957 520.493 479.953C518.516 477.06 514.929 476.488 513.115 473.597C512.117 472.006 509.68 472.995 508.385 474.457C506.972 476.053 505.813 477.874 504.27 479.793C501.411 480.402 498.748 481.224 496.766 478.219C496.718 475.531 497.625 473.586 498.731 471.335C498.786 470.985 499.053 470.665 499.078 470.459C501.427 465.131 505.962 466.484 510.464 466.518Z" fill="#4E99D0"></path><path d="M514.632 497.236C515.705 489.688 515.699 489.959 522.673 490.12C532.08 490.337 541.498 490.087 551.369 490.07C552.066 493.006 550.819 494.217 547.824 494.271C539.243 494.426 530.662 495.097 522.089 494.976C517.346 494.91 514.98 495.909 516.39 501.5C516.527 502.838 516.852 503.737 515.977 504.908C512.612 503.085 513.295 500.39 514.632 497.236Z" fill="#61B7E6"></path><path d="M497.533 490.068C499.44 490.05 500.889 490.137 502.754 490.359C504.039 491.456 506.63 490.932 505.93 493.111C505.291 495.103 503.175 494.311 501.342 494.729C493.236 494.909 485.434 494.926 477.631 494.878C475.836 494.867 473.768 495.065 473.941 492.182C474.11 489.365 476.17 490.343 477.641 490.323C484.118 490.233 490.597 490.216 497.533 490.068Z" fill="#61B7E6"></path><path d="M510.155 515.069C505.287 515.259 500.73 515.362 498.966 509.461C497.921 505.794 500.287 504.757 502.599 503.941C504.488 503.275 506.277 502.65 507.514 500.465C508.165 499.477 508.721 498.952 509.897 498.868C511.061 499.839 511.266 500.898 511.504 502.375C512.768 506.943 514.912 511.2 510.155 515.069Z" fill="#4483B7"></path><path d="M527.286 505.77C525.623 510.843 523.858 515.354 517.255 514.922C515.103 512.62 515.278 509.949 515.152 506.989C515.83 505.482 516.857 504.665 517.734 503.279C518.013 503.022 517.997 503.001 518.008 503.007C521.611 501.811 524.577 503.11 527.286 505.77Z" fill="#3765A8"></path><path d="M516.197 505.622C516.11 508.677 517.668 511.216 516.867 514.413C514.877 516.378 512.59 515.762 510.087 515.492C512.15 511.489 512.545 507.658 510.122 503.368C510.859 501.193 510.319 498.821 512.74 497.431C513.418 497.106 513.833 496.995 514.569 496.863C515.003 499.333 515.117 501.826 515.417 504.671C515.857 505.102 516.112 505.181 516.197 505.622Z" fill="#61D6EC"></path><path d="M508.76 500.708C507.739 503.125 506.547 505.167 503.498 505.026C501.273 504.923 500.077 506.609 499.012 508.735C497.044 507.4 497.193 504.897 496.406 502.772C495.394 500.038 496.326 498.81 499.317 498.769C501.605 498.738 503.887 498.23 506.592 497.845C507.013 497.756 507.431 497.957 507.657 498.011C508.889 498.635 508.375 499.639 508.76 500.708Z" fill="#2C428C"></path><path d="M527.508 505.934C524.43 505.162 521.596 504.128 518.39 503.054C518.447 501.05 517.174 498.209 519.899 497.404C522.963 496.499 526.734 496.915 528.966 498.594C531.237 500.303 528.442 503.275 527.508 505.934Z" fill="#2C428C"></path><path d="M537.747 508.788C536.192 510.018 534.917 511.028 533.478 512.169C534.679 501.238 536.859 499.113 546.165 501.369C543.063 504.113 540.545 506.34 537.747 508.788Z" fill="#61B7E6"></path><path d="M490.42 511.286C486.728 507.945 483.44 504.727 480.017 501.376C485.952 498.892 488.15 499.871 489.578 505.162C490.052 506.914 490.646 508.634 491.392 510.718C491.341 511.182 491.083 511.296 490.42 511.286Z" fill="#61B7E6"></path><path d="M487.959 474.562C488.101 474.267 488.542 474.143 488.75 474.047C490.166 473.62 490.365 474.396 490.232 475.665C489.704 476.967 489.4 477.913 489.069 478.849C486.9 484.984 486.898 484.984 479.458 483.261C481.62 479.701 485.181 477.716 487.959 474.562Z" fill="#86EFD8"></path><path d="M516.134 523.037C517.098 523.166 518.357 522.801 518.107 523.572C517.32 525.998 515.329 527.719 513.259 528.917C511.096 530.168 510.29 527.49 508.995 526.465C508.039 525.709 506.736 525.056 506.438 523.047C509.607 523.047 512.676 523.047 516.134 523.037Z" fill="#61B7E6"></path><path d="M496.574 478.061C498.604 480.067 501.408 478.243 503.728 479.714C503.093 482.195 501.992 484.243 499.36 485.435C497.92 485.427 496.83 485.331 495.387 485.125C494.592 482.621 495.807 480.547 496.574 478.061Z" fill="#4483B7"></path><path d="M501.463 494.968C501.489 494.111 502.263 493.995 503.083 493.885C507.652 493.275 503.379 492.009 503.227 490.772C504.637 490.37 506.105 490.228 507.575 490.127C509.201 490.016 509.967 490.878 510.119 492.429C510.284 494.124 509.992 495.397 507.425 495.158C505.307 495.171 503.598 495.096 501.463 494.968Z" fill="#C2F9DA"></path><path d="M516.314 505.845C515.956 505.824 515.884 505.665 515.708 505.264C515.743 504.235 515.882 503.448 516.193 502.3C516.753 502.254 517.141 502.568 517.771 502.952C518.035 504.176 517.524 505.05 516.314 505.845Z" fill="#2C428C"></path><path d="M490.231 475.761C489.853 475.43 489.686 474.835 489.238 474.095C489.455 473.481 489.953 473.011 490.735 472.753C491.305 473.918 490.964 474.728 490.231 475.761Z" fill="#798CB4"></path><path d="M491.237 472.932C490.375 472.33 491.066 471.951 491.655 471.333C491.791 471.736 491.647 472.28 491.237 472.932Z" fill="#798CB4"></path><path d="M490.121 511.415C490.278 511.14 490.542 511.117 491.202 511.081C491.867 511.111 492.031 511.265 491.882 511.941C491.191 512.124 490.709 511.896 490.121 511.415Z" fill="#2C428C"></path><path d="M494.98 484.97C494.965 484.952 494.87 485.3 494.87 485.3C494.87 485.3 494.86 485.094 494.947 485.054C495.033 485.015 494.995 484.988 494.98 484.97Z" fill="#4483B7"></path><path d="M492.019 511.999C492.214 512.129 492.292 512.374 492.369 512.619C492.225 512.615 492.081 512.61 491.805 512.479C491.674 512.352 491.9 512.113 492.019 511.999Z" fill="#2C428C"></path><path d="M574.838 330.69C569.299 330.806 565.749 333.344 563.515 337.973C562.793 339.468 561.587 340.943 560.529 338.49C558.411 333.576 555.134 330.435 548.575 330.332C556.707 326.999 557.026 326.609 562.311 314.053C563.042 316.933 563.447 319.32 564.539 321.496C566.218 324.844 567.79 327.965 572.305 328.091C573.222 328.116 575.625 328.09 574.838 330.69Z" fill="#F8F9FB"></path><path d="M516.674 325.012C515.526 322.244 515.826 320.031 518.697 318.369C523.17 315.425 523.362 320.164 524.475 321.695C525.798 323.515 523.842 325.348 521.739 325.934C520.133 326.381 518.45 326.236 516.674 325.012Z" fill="#F7CDDE"></path><path d="M504.009 306.58C502.463 306.965 501.902 306.13 502.023 304.356C503.526 304.024 504.107 304.835 504.009 306.58Z" fill="#F86EDB"></path><path d="M563.091 273.305C564.18 273.369 564.742 274.194 565.073 275.538C563.536 275.936 563.003 275.068 563.091 273.305Z" fill="#F17187"></path><path d="M565.126 276.28C566.17 276.42 566.702 277.278 567.045 278.612C565.952 278.536 565.253 277.802 565.126 276.28Z" fill="#F17187"></path><path d="M576.104 294.398C576.4 294.558 576.684 294.993 576.976 295.702C576.688 295.541 576.39 295.107 576.104 294.398Z" fill="#F3ACE1"></path><path d="M567.083 279.283C567.445 279.4 567.804 279.83 568.231 280.543C567.892 280.415 567.485 280.005 567.083 279.283Z" fill="#F17187"></path><path d="M496.243 347.097C497.173 347.147 497.872 347.275 497.632 348.12C497.449 348.768 496.876 349.113 496.206 348.878C495.176 348.518 495.238 347.88 496.243 347.097Z" fill="#F3ACE1"></path><path d="M489.63 348.552C490.411 348.334 490.695 348.608 490.577 349.215C490.552 349.341 490.373 349.512 490.247 349.53C489.636 349.618 489.376 349.321 489.63 348.552Z" fill="#F86EDB"></path><path d="M540.632 353.761C540.617 353.995 540.491 354.122 540.365 354.249C540.417 354.051 540.469 353.853 540.632 353.761Z" fill="#F86EDB"></path><path d="M472.99 372.008C472.865 371.872 472.75 371.729 472.635 371.586C472.721 371.631 472.808 371.675 472.954 371.851C473.014 371.982 472.999 372.001 472.99 372.008Z" fill="#F86EDB"></path><path d="M560.547 369.465C560.58 369.521 560.513 369.409 560.547 369.465Z" fill="#F86EDB"></path><path d="M545.536 353.468C545.563 353.518 545.509 353.417 545.536 353.468Z" fill="#D14EB2"></path><path d="M479.053 322.028C479.656 323.741 480.223 325.429 481.125 328.11C478.247 326.344 474.269 330.207 473.726 324.973C473.41 321.924 475.835 321.742 478.556 321.949C478.954 321.942 479.017 322.003 479.053 322.028Z" fill="#F3ACE1"></path><path d="M473.443 320.551C473.484 320.618 473.401 320.484 473.443 320.551Z" fill="#F3ACE1"></path><path d="M536.247 877.895C529.041 884.27 520.574 888.477 513.848 894.995C512.741 896.068 512.15 895.181 511.407 894.522C503.891 887.859 495.161 882.916 486.927 877.27C481.877 873.808 481.859 873.836 486.748 870.464C487.297 870.086 487.837 869.695 488.701 869.209C494.914 871.316 500.817 873.492 506.586 876.014C509.464 877.272 511.28 879.574 512.638 882.472C516.446 875.968 529.214 873.455 536.247 877.895Z" fill="#7048D5"></path><path d="M536.439 878.073C529.765 876.396 523.404 877.001 517.097 878.536C514.771 879.102 515.142 881.274 514.978 883.061C514.868 884.251 514.536 885.485 513.09 885.577C511.604 885.672 511.143 884.469 511.017 883.276C510.624 879.569 507.945 878.255 504.991 876.807C499.847 874.283 493.789 873.771 489.194 869.403C491.35 867.421 493.678 865.734 496.328 863.975C501.59 863.063 505.61 866.251 510.512 867.176C512.991 869.282 511.902 872.056 512.769 874.759C514.288 873.864 514.646 871.965 516.449 871.132C523.534 870.421 530.26 869.676 537.461 870.147C539.53 871.212 541.173 872.289 542.822 873.37C541.305 875.899 538.62 876.348 536.439 878.073Z" fill="#A546D7"></path><path d="M537.651 869.897C531.056 872.591 523.957 871.912 516.45 871.892C512.824 865.591 514.008 860.252 519.486 858.133C525.766 861.982 531.591 865.82 537.651 869.897Z" fill="#D14EB2"></path><path d="M519.69 857.903C513.678 860.892 516.72 866.521 515.977 871.42C515.663 872.799 515.141 873.718 515.068 874.673C514.917 876.633 513.658 877.362 512.082 877.203C510.371 877.03 511.14 875.392 511.049 874.387C510.884 872.578 510.923 870.752 510.845 868.491C508.449 864.949 509.925 860.351 506.828 857.25C511.452 851.192 515.46 854.182 519.69 857.903Z" fill="#F86EDB"></path><path d="M506.606 857.032C512.187 858.858 510.001 863.661 510.864 867.659C506.015 867.825 501.617 866.275 497.04 863.962C499.861 861.649 503.071 859.394 506.606 857.032Z" fill="#D14EB2"></path><path d="M543.025 395.054C542.235 394.976 541.444 394.88 540.653 394.792C537.474 394.436 537.422 392.844 538.996 390.304C538.998 390.002 539.001 389.999 539.001 389.999C539.649 389.355 540.297 388.714 541.613 388.819C543.175 389.43 545.302 387.843 545.414 390.764C543.688 391.728 544.298 393.469 543.28 394.786C543.046 395.033 543.025 395.038 543.025 395.054Z" fill="#F7CDDE"></path><path d="M526.135 370.128C526.87 368.969 526.533 367.115 528.328 366.223C529.551 368.27 530.753 370.284 531.993 372.647C529.675 373.127 527.806 372.246 526.135 370.128Z" fill="#F7CDDE"></path><path d="M543.29 395.185C543.199 393.611 542.395 391.85 544.826 391.056C545.392 392.249 545.759 393.491 545.713 394.719C545.637 396.774 544.764 396.896 543.29 395.185Z" fill="#F4F5F7"></path><path d="M541.942 388.638C541.163 389.281 540.397 389.615 539.317 389.974C539.093 388.513 539.697 387.435 541.608 387.112C541.944 387.504 541.949 387.916 541.942 388.638Z" fill="#F4F5F7"></path><path d="M538.442 378.541C538.48 378.602 538.404 378.479 538.442 378.541Z" fill="#F7CDDE"></path><path d="M372.754 334.871C373.999 336.29 375.684 336.961 373.535 339.008C371.246 341.189 369.863 340.735 367.677 339.142C366.345 338.171 365.558 337.485 366.596 336.074C368.097 334.034 369.936 332.813 372.754 334.871Z" fill="#F86EDB"></path><path d="M523.399 356.893C522.916 358.034 522.617 359.191 521.32 358.507C520.172 357.902 520.426 356.891 521.055 356.068C522.149 354.634 522.891 355.342 523.399 356.893Z" fill="#F3ACE1"></path><path d="M555.006 384.007C555.118 383.378 555.127 382.649 555.951 382.51C556.119 382.482 556.355 382.851 556.559 383.036C556.226 383.33 555.893 383.625 555.272 383.953C554.986 383.987 555 384 555.006 384.007Z" fill="#F3ACE1"></path><path d="M558.62 381.771C558.605 382.007 558.481 382.134 558.357 382.261C558.409 382.061 558.46 381.862 558.62 381.771Z" fill="#F3ACE1"></path><path d="M273.019 342.268C272.563 340.275 272.341 338.488 272.224 336.321C274.311 335.29 276.298 335.177 278.568 336.171C280.135 338.965 282.373 339.47 284.965 339.512C288.192 339.565 291.468 339.108 294.998 340.375C296.771 341.897 297.364 343.426 296.336 345.681C289.524 347.458 282.965 348.5 276.193 345.208C275.731 344.851 275.623 344.678 275.233 344.385C274.384 343.668 273.818 343.07 273.019 342.268Z" fill="#A546D7"></path><path d="M296.515 346.042C295.865 344.627 296.943 342.96 295.056 341.506C295.146 340.756 295.609 340.537 296.538 340.774C299.382 341.265 301.731 340.507 304.508 339.946C304.882 345.528 304.606 345.739 296.515 346.042Z" fill="#1B2859"></path><path d="M275.042 344.45C275.269 344.237 275.522 344.352 275.774 344.818C275.551 344.99 275.315 344.86 275.042 344.45Z" fill="#1B2859"></path><path d="M296.922 340.514C296.419 341.001 295.951 341.023 295.141 341.134C290.662 341.132 286.519 340.888 282.386 341.001C279.257 341.086 277.64 340.039 277.818 336.347C275.802 333.448 276.308 330.57 276.425 327.772C276.566 324.385 278.433 322.584 281.778 322.43C285.756 322.247 289.749 321.893 294.139 323.031C296.925 323.845 296.984 325.685 296.976 327.58C296.961 331.737 296.963 335.893 296.922 340.514Z" fill="#03031B"></path><path d="M294.656 323.085C290.172 324.16 285.671 324.146 281.276 323.69C278.084 323.359 277.696 324.558 277.815 327.111C277.939 329.743 277.824 332.387 277.754 335.484C276.16 337.023 274.587 337.542 272.611 336.106C272.269 333.455 272.17 330.968 272.156 328.481C272.117 321.117 274.818 318.26 282.349 318.321C286.827 318.357 291.756 317.188 295.381 321.793C295.253 322.367 294.992 322.638 294.656 323.085Z" fill="#F86EDB"></path><path d="M520.232 480.242C521.588 476.845 522.15 473.335 524.751 470.449C528.727 474.085 528.137 479.314 528.912 484.11C529.244 486.158 527.694 486.097 526.283 485.652C523.591 484.802 521.964 482.677 520.232 480.242Z" fill="#4483B7"></path><path d="M536.028 481.036C535.242 477.947 534.558 475.255 533.696 471.861C538.698 475.113 542.388 478.719 547.092 483.103C542.562 483.103 538.829 487.039 536.028 481.036Z" fill="#61D6EC"></path><path d="M511.546 453.22C515.293 453.823 516.176 457.159 518.961 459.668C514.134 459.668 510.138 459.668 506.038 459.668C506.578 456.525 509.804 455.725 511.546 453.22Z" fill="#86EFD8"></path><path d="M510.065 484.382C510.986 482.451 511.668 480.208 513.957 481.277C516.153 482.301 516.415 484.664 515.874 486.823C515.47 488.434 514.319 490.161 512.535 489.843C509.874 489.37 509.813 486.997 510.065 484.382Z" fill="#61B7E6"></path><path d="M510.571 466.349C507.064 467.299 502.947 467.075 499.415 470.052C498.824 465.568 501.68 464.674 505.47 465.11C507.086 465.296 508.665 465.809 510.571 466.349Z" fill="#030727"></path><path d="M512.673 497.122C512.186 498.987 511.37 500.758 510.329 502.76C510.056 501.907 510.006 500.822 509.925 499.33C509.747 498.761 509.599 498.598 509.704 498.225C510.673 497.492 511.263 496.666 512.673 497.122Z" fill="#61B7E6"></path><path d="M509.611 498.011C509.957 498.014 509.986 498.472 509.94 498.698C509.602 499.406 509.31 499.89 508.989 500.673C508.628 500.218 508.297 499.463 507.925 498.386C508.344 498.045 508.805 498.026 509.611 498.011Z" fill="#030727"></path><path d="M522.766 467.899C522.092 467.964 521.238 467.726 520.133 467.267C520.784 467.23 521.685 467.413 522.766 467.899Z" fill="#030727"></path><path d="M517.832 466.632C517.543 466.819 517.113 466.821 516.375 466.721C516.559 466.1 517.092 465.958 517.832 466.632Z" fill="#030727"></path></g><defs><filter id="filter0_d_112_252" x="-4" y="0" width="1032" height="1032" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_112_252"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_112_252" result="shape"></feBlend></filter><clipPath id="clip0_112_252"><rect width="1024" height="1024" fill="white"></rect></clipPath></defs></svg></div>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header class="bg-primary text-white grid grid-cols-3 lg:grid-cols-12"><div class="col-span-2 lg:col-span-4"><div class="w-32 lg:w-44 lg:h-44"><a href="/" class="">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a></div></div> <div class="lg:block place-self-center lg:col-span-4 lg:col-start-8 lg:text-3xl lg:place-self-center">${validate_component(MainNav, "MainNav").$$render($$result, {}, {}, {})}</div></header>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="bg-accent text-white"><nav data-svelte-h="svelte-1qihvfv"><ul><li><a href="/api/rss.xml" data-sveltekit-reload>RSS</a></li> <li><a href="/">Home</a></li></ul></nav> <nav>${validate_component(NavItems, "NavItems").$$render($$result, {}, {}, {})}</nav> <div><div class="h-44 w-44">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</div> <p>©${escape((/* @__PURE__ */ new Date()).getFullYear())} ${escape(siteAuthor)}</p></div></footer>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isMenuOpen, $$unsubscribe_isMenuOpen;
  let $$unsubscribe_currentPage;
  $$unsubscribe_isMenuOpen = subscribe(isMenuOpen, (value) => $isMenuOpen = value);
  $$unsubscribe_currentPage = subscribe(currentPage, (value) => value);
  let { data } = $$props;
  let overlay;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    currentPage.set(data.path);
  }
  $$unsubscribe_isMenuOpen();
  $$unsubscribe_currentPage();
  return `  ${$$result.head += `<!-- HEAD_svelte-18816ru_START --><link rel="alternate" type="application/rss+xml"${add_attribute("title", siteTitle, 0)} href="${"http://" + escape(siteURL, true) + "/api/rss.xml"}"><!-- HEAD_svelte-18816ru_END -->`, ""}  <div${add_classes(($isMenuOpen ? "open" : "").trim())}>${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main tabindex="-1">${slots.default ? slots.default({}) : ``} <div class="overlay fixed inset-0 bg-accent z-50 hidden"${add_attribute("this", overlay, 0)}><div class="h-44 w-44 flex">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</div></div></main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
