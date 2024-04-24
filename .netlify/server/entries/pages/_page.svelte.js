import { l as setContext, g as getContext, c as create_ssr_component, f as compute_rest_props, s as subscribe, h as spread, k as escape_object, a as add_attribute, v as validate_component, j as escape_attribute_value, e as escape } from "../../chunks/ssr.js";
import { o as omit, m as makeElement, d as disabledAttr, e as executeCallbacks, a as addMeltEventListener, s as styleToString, b as isHTMLElement, f as createElHelpers, k as kbd, g as getElementByMeltId, c as cn, i as is_void } from "../../chunks/gsapConfig.js";
import "clsx";
import "dequal";
import { t as toWritableStores, g as generateIds, o as overridable, a as tick, b as generateId, r as removeUndefined, c as createBitAttrs, d as getOptionUpdater, e as createDispatcher, I as Icon, s as slide } from "../../chunks/Icon.js";
import { d as derived, w as writable } from "../../chunks/index2.js";
import { a as siteDescription, s as siteTitle } from "../../chunks/config.js";
const { name, selector } = createElHelpers("accordion");
const defaults = {
  multiple: false,
  disabled: false,
  forceVisible: false
};
const createAccordion = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "onValueChange", "defaultValue"));
  const meltIds = generateIds(["root"]);
  const { disabled, forceVisible } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const isSelected = (key, v) => {
    if (v === void 0)
      return false;
    if (typeof v === "string")
      return v === key;
    return v.includes(key);
  };
  const isSelectedStore = derived(value, ($value) => {
    return (key) => isSelected(key, $value);
  });
  const root = makeElement(name(), {
    returned: () => ({
      "data-melt-id": meltIds.root
    })
  });
  const parseItemProps = (props2) => {
    if (typeof props2 === "string") {
      return { value: props2 };
    } else {
      return props2;
    }
  };
  const parseHeadingProps = (props2) => {
    if (typeof props2 === "number") {
      return { level: props2 };
    } else {
      return props2;
    }
  };
  const item = makeElement(name("item"), {
    stores: value,
    returned: ($value) => {
      return (props2) => {
        const { value: itemValue, disabled: disabled2 } = parseItemProps(props2);
        return {
          "data-state": isSelected(itemValue, $value) ? "open" : "closed",
          "data-disabled": disabledAttr(disabled2)
        };
      };
    }
  });
  const trigger = makeElement(name("trigger"), {
    stores: [value, disabled],
    returned: ([$value, $disabled]) => {
      return (props2) => {
        const { value: itemValue, disabled: disabled2 } = parseItemProps(props2);
        return {
          disabled: disabledAttr($disabled || disabled2),
          "aria-expanded": isSelected(itemValue, $value) ? true : false,
          "aria-disabled": disabled2 ? true : false,
          "data-disabled": disabledAttr(disabled2),
          "data-value": itemValue,
          "data-state": isSelected(itemValue, $value) ? "open" : "closed"
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const disabled2 = node.dataset.disabled === "true";
        const itemValue = node.dataset.value;
        if (disabled2 || !itemValue)
          return;
        handleValueUpdate(itemValue);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (![kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.HOME, kbd.END].includes(e.key)) {
          return;
        }
        e.preventDefault();
        if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
          const disabled2 = node.dataset.disabled === "true";
          const itemValue = node.dataset.value;
          if (disabled2 || !itemValue)
            return;
          handleValueUpdate(itemValue);
          return;
        }
        const el = e.target;
        const rootEl = getElementByMeltId(meltIds.root);
        if (!rootEl || !isHTMLElement(el))
          return;
        const items = Array.from(rootEl.querySelectorAll(selector("trigger")));
        const candidateItems = items.filter((item2) => {
          if (!isHTMLElement(item2))
            return false;
          return item2.dataset.disabled !== "true";
        });
        if (!candidateItems.length)
          return;
        const elIdx = candidateItems.indexOf(el);
        if (e.key === kbd.ARROW_DOWN) {
          candidateItems[(elIdx + 1) % candidateItems.length].focus();
        }
        if (e.key === kbd.ARROW_UP) {
          candidateItems[(elIdx - 1 + candidateItems.length) % candidateItems.length].focus();
        }
        if (e.key === kbd.HOME) {
          candidateItems[0].focus();
        }
        if (e.key === kbd.END) {
          candidateItems[candidateItems.length - 1].focus();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: [value, disabled, forceVisible],
    returned: ([$value, $disabled, $forceVisible]) => {
      return (props2) => {
        const { value: itemValue } = parseItemProps(props2);
        const isVisible = isSelected(itemValue, $value) || $forceVisible;
        return {
          "data-state": isVisible ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "data-value": itemValue,
          hidden: isVisible ? void 0 : true,
          style: styleToString({
            display: isVisible ? void 0 : "none"
          })
        };
      };
    },
    action: (node) => {
      tick().then(() => {
        const contentId = generateId();
        const triggerId = generateId();
        const parentTrigger = document.querySelector(`${selector("trigger")}, [data-value="${node.dataset.value}"]`);
        if (!isHTMLElement(parentTrigger))
          return;
        node.id = contentId;
        parentTrigger.setAttribute("aria-controls", contentId);
        parentTrigger.id = triggerId;
      });
    }
  });
  const heading = makeElement(name("heading"), {
    returned: () => {
      return (props2) => {
        const { level } = parseHeadingProps(props2);
        return {
          role: "heading",
          "aria-level": level,
          "data-heading-level": level
        };
      };
    }
  });
  function handleValueUpdate(itemValue) {
    value.update(($value) => {
      if ($value === void 0) {
        return withDefaults.multiple ? [itemValue] : itemValue;
      }
      if (Array.isArray($value)) {
        if ($value.includes(itemValue)) {
          return $value.filter((v) => v !== itemValue);
        }
        $value.push(itemValue);
        return $value;
      }
      return $value === itemValue ? void 0 : itemValue;
    });
  }
  return {
    ids: meltIds,
    elements: {
      root,
      item,
      trigger,
      content,
      heading
    },
    states: {
      value
    },
    helpers: {
      isSelected: isSelectedStore
    },
    options
  };
};
function getAccordionData() {
  const NAME = "accordion";
  const ITEM_NAME = "accordion-item";
  const PARTS = ["root", "content", "header", "item", "trigger"];
  return { NAME, ITEM_NAME, PARTS };
}
function setCtx(props) {
  const initAccordion = createAccordion(removeUndefined(props));
  const { NAME, PARTS } = getAccordionData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const accordion = {
    ...initAccordion,
    getAttrs,
    updateOption: getOptionUpdater(initAccordion.options)
  };
  setContext(NAME, accordion);
  return accordion;
}
function getCtx() {
  const { NAME } = getAccordionData();
  return getContext(NAME);
}
function setItem(props) {
  const { ITEM_NAME } = getAccordionData();
  setContext(ITEM_NAME, { ...props });
  const ctx = getCtx();
  return { ...ctx, props };
}
function getItemProps() {
  const { ITEM_NAME } = getAccordionData();
  return getContext(ITEM_NAME);
}
function getContent() {
  const ctx = getCtx();
  const { value: props } = getItemProps();
  return {
    ...ctx,
    props
  };
}
function getTrigger() {
  const ctx = getCtx();
  const { value, disabled } = getItemProps();
  return {
    ...ctx,
    props: { value, disabled }
  };
}
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}
const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["multiple", "value", "onValueChange", "disabled", "asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { multiple = false } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption, getAttrs } = setCtx({
    multiple,
    disabled,
    defaultValue: value,
    onValueChange: ({ next }) => {
      if (Array.isArray(next)) {
        if (!Array.isArray(value) || !arraysAreEqual(value, next)) {
          onValueChange?.(next);
          value = next;
          return next;
        }
        return next;
      }
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  const attrs = getAttrs("root");
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
    $$bindings.onValueChange(onValueChange);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  value !== void 0 && localValue.set(Array.isArray(value) ? [...value] : value);
  {
    updateOption("multiple", multiple);
  }
  {
    updateOption("disabled", disabled);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Accordion_item$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild", "el"]);
  let $item, $$unsubscribe_item;
  let { value } = $$props;
  let { disabled = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { item }, props, getAttrs } = setItem({ value, disabled });
  $$unsubscribe_item = subscribe(item, (value2) => $item = value2);
  const attrs = getAttrs("item");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $item(props);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Accordion_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["level", "asChild", "el"]);
  let $header, $$unsubscribe_header;
  let { level = 3 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { heading: header }, getAttrs } = getCtx();
  $$unsubscribe_header = subscribe(header, (value) => $header = value);
  const attrs = getAttrs("header");
  if ($$props.level === void 0 && $$bindings.level && level !== void 0)
    $$bindings.level(level);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $header(level);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_header();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Accordion_trigger$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, props, getAttrs } = getTrigger();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $trigger(props);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Accordion_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let $content, $$unsubscribe_content;
  let $isSelected, $$unsubscribe_isSelected;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, helpers: { isSelected }, props, getAttrs } = getContent();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_isSelected = subscribe(isSelected, (value) => $isSelected = value);
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
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $content(props);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_content();
  $$unsubscribe_isSelected();
  return `${asChild && $isSelected(props) ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Chevron_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ChevronDown = Chevron_down;
const GuyOne = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg viewBox="0 0 439 498" class="lg:h-96" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_22_367)" filter="url(#filter0_d_22_367)"><path d="M13.8223 137.564C19.2163 133.729 26.1585 142.181 22.3821 147.443C18.5647 152.762 10.2189 151.254 7.34518 145.823C3.6785 138.894 7.32988 130.651 13.2391 126.628C19.9517 122.058 28.1785 121.801 35.9293 122.229C43.7579 122.661 51.3975 123.236 59.1966 122.069C65.7985 121.065 72.2492 119.184 78.3909 116.474C91.0186 110.96 102.107 102.229 110.632 91.0859C114.61 85.8398 118.328 79.9435 120.605 73.6632C122.359 68.8258 123.19 62.4639 120.705 57.7288C120.164 56.6635 119.402 55.7367 118.474 55.0157C117.546 54.2947 116.475 53.7975 115.339 53.5603C114.203 53.3231 113.03 53.3519 111.906 53.6444C110.782 53.937 109.735 54.486 108.84 55.2517C104.698 58.779 103.58 65.3285 106.747 69.8925C110.145 74.7898 116.558 76.4685 122.079 75.5768C129.752 74.3376 135.965 68.707 141.839 63.8593L185.344 27.9581C192.517 22.0381 199.618 16.0034 206.884 10.2065C212.793 5.49238 220.003 0.921486 227.699 3.43943C230.801 4.45443 233.928 6.85811 234.703 10.3115C234.993 11.8928 234.862 13.5264 234.324 15.036C233.787 16.5457 232.863 17.8742 231.652 18.8783C231.1 19.3664 230.455 19.7297 229.76 19.9451C229.065 20.1604 228.334 20.2232 227.614 20.1294C226.894 20.0356 226.201 19.7873 225.579 19.4002C224.956 19.013 224.418 18.4956 223.998 17.8807C222.376 15.5295 222.243 12.1774 223.177 9.52069C225.673 2.42061 234.833 1.67778 240.946 2.25523C248.159 3.01494 255.126 5.3985 261.363 9.24018C274.281 17.0394 283.835 29.7266 289.439 43.9893C295.648 59.7924 297.56 77.2796 297.307 94.2443C297.255 97.7044 297.025 101.532 295.151 104.515C293.316 107.437 290.114 108.321 287.243 106.367C286.307 105.731 285.105 104.491 285.349 103.184C285.655 101.542 288.803 101.53 290.064 101.592C293.514 101.764 296.776 103.572 299.247 106.009C305.121 111.802 305.578 120.665 304.812 128.546C303.971 137.197 301.572 145.802 302.525 154.56C304.086 168.908 315.412 176.881 326.537 183.478C332.234 186.856 338.056 190.085 343.18 194.383C348.401 198.78 352.973 203.951 356.747 209.731C364.204 221.135 368.601 234.4 369.483 248.158C369.927 255.033 369.404 261.938 367.932 268.656C366.469 275.226 364.163 283.509 358.09 287.039C356.642 287.899 354.976 288.277 353.315 288.123C351.654 287.968 350.079 287.287 348.802 286.172C346.341 284.119 345.139 280.476 347.681 277.911C349.787 275.786 353.158 276.234 355.7 277.097C358.759 278.138 361.141 280.079 363.421 282.372C367.769 286.743 372.859 292.109 379.473 290.713C380.695 290.455 380.178 288.511 378.957 288.769C370.972 290.454 366.158 280.808 360.27 277.094C356.007 274.405 348.725 272.406 345.393 277.65C341.798 283.309 347.579 289.414 352.951 290.143C359.935 291.09 364.777 283.992 367.122 278.133C372.561 264.544 372.73 248.61 369.403 234.46C366.078 220.09 358.887 207 348.672 196.719C343.516 191.61 337.605 187.695 331.439 184.05C325.214 180.37 318.727 176.84 313.401 171.79C310.451 169.086 308.104 165.745 306.523 162.001C304.943 158.257 304.167 154.2 304.25 150.112C304.307 140.697 307.219 131.561 307.038 122.128C306.887 114.307 304.33 106.67 297.785 102.267C295.087 100.364 291.866 99.4299 288.611 99.605C287.287 99.7181 285.427 99.9499 284.337 100.812C283.458 101.505 283.292 103.13 283.469 104.18C283.89 106.674 286.159 108.406 288.364 109.1C289.703 109.548 291.142 109.566 292.492 109.152C293.842 108.738 295.041 107.911 295.932 106.779C298.052 104.234 298.788 100.841 299.088 97.573C299.494 93.146 299.27 88.5985 299.082 84.1642C298.319 66.1434 294.893 47.6912 285.883 32.0402C278.224 18.7363 266.313 7.58132 252.031 2.64619C245.301 0.320678 237.318 -1.07301 230.373 1.04201C224.399 2.86172 219.821 7.97292 220.807 14.7424C221.642 20.4727 227.355 24.4363 232.388 20.8194C233.576 19.9659 234.572 18.8561 235.31 17.5657C236.047 16.2753 236.508 14.8348 236.66 13.3424C236.813 11.8501 236.654 10.3411 236.194 8.91842C235.734 7.49578 234.984 6.19304 233.996 5.09914C229.13 -0.197918 221.195 -0.159797 215.123 2.5322C211.466 4.15334 208.228 6.58225 205.106 9.10553C201.126 12.3219 197.202 15.6154 193.253 18.8738L145.689 58.1258C141.934 61.2239 138.241 64.4351 134.361 67.3635C130.741 70.0962 126.747 72.6274 122.291 73.5047C116.015 74.7403 106.081 71.5001 106.842 63.2266C107.138 60.0136 109.185 56.4647 112.315 55.5434C115.382 54.6403 118.279 56.6916 119.419 59.5955C121.933 65.9973 118.981 73.3204 116.044 78.9404C108.773 92.8557 97.3032 104.188 83.8643 111.562C77.1375 115.262 69.9275 117.921 62.462 119.457C54.076 121.169 45.8474 120.834 37.3688 120.3C29.1498 119.781 20.5192 119.834 13.1937 124.286C7.18686 127.937 3.17974 134.557 4.14261 141.934C4.97875 148.34 9.92156 153.236 16.2965 152.695C21.6473 152.241 27.0232 147.491 25.1247 141.459C23.5527 136.463 17.4846 132.524 12.8434 135.824C11.8195 136.552 12.7885 138.299 13.8223 137.564Z" fill="#3F3D56"></path><path d="M424.798 283.099H377.812C377.078 283.1 376.374 283.404 375.855 283.943C375.336 284.483 375.044 285.214 375.043 285.977V316.384C375.044 317.147 375.336 317.879 375.855 318.418C376.374 318.958 377.078 319.261 377.812 319.262H424.798C425.532 319.261 426.236 318.958 426.755 318.418C427.274 317.879 427.566 317.147 427.567 316.384V285.977C427.566 285.214 427.274 284.483 426.755 283.943C426.236 283.404 425.532 283.1 424.798 283.099Z" fill="#F2F2F2"></path><path d="M424.798 283.099H377.812C377.078 283.1 376.374 283.404 375.855 283.943C375.336 284.483 375.044 285.214 375.043 285.977V316.384C375.044 317.147 375.336 317.879 375.855 318.418C376.374 318.958 377.078 319.261 377.812 319.262H424.798C425.532 319.261 426.236 318.958 426.755 318.418C427.274 317.879 427.566 317.147 427.567 316.384V285.977C427.566 285.214 427.274 284.483 426.755 283.943C426.236 283.404 425.532 283.1 424.798 283.099ZM425.706 304.941C425.695 308.036 424.517 311.004 422.425 313.207C420.333 315.41 417.493 316.674 414.516 316.726C409.748 316.79 417.154 316.815 411.404 316.815C398.255 316.815 384.545 316.685 379.429 316.6C378.756 316.586 378.116 316.298 377.644 315.799C377.172 315.3 376.906 314.63 376.903 313.93V285.98C376.904 285.729 376.999 285.489 377.17 285.311C377.34 285.134 377.571 285.034 377.812 285.033H424.796C425.037 285.033 425.268 285.133 425.439 285.31C425.609 285.487 425.706 285.726 425.706 285.977L425.706 304.941Z" fill="#E6E6E6"></path><path d="M419.014 265.59H383.216C382.899 265.591 382.59 265.693 382.331 265.882C382.072 266.072 381.876 266.34 381.769 266.65L376.24 282.773C376.158 283.014 376.132 283.272 376.165 283.525C376.199 283.778 376.29 284.019 376.431 284.228C376.573 284.437 376.761 284.607 376.979 284.725C377.197 284.843 377.439 284.905 377.685 284.905L425.696 284.994H425.698C425.952 284.994 426.202 284.928 426.426 284.803C426.65 284.678 426.84 284.497 426.98 284.276C427.12 284.056 427.205 283.803 427.227 283.54C427.25 283.276 427.209 283.012 427.109 282.769L420.425 266.557C420.307 266.27 420.11 266.025 419.859 265.853C419.608 265.681 419.314 265.59 419.014 265.59Z" fill="#E6E6E6"></path><path d="M427.234 283.119C427.234 283.335 427.191 283.549 427.109 283.748L420.426 296.227C420.307 296.514 420.109 296.758 419.859 296.93C419.608 297.101 419.314 297.193 419.014 297.193H383.216C382.899 297.193 382.59 297.091 382.331 296.901C382.072 296.712 381.876 296.444 381.769 296.134L376.241 283.744C376.173 283.546 376.143 283.337 376.154 283.128C376.164 282.918 376.213 282.713 376.3 282.524C376.386 282.334 376.508 282.165 376.657 282.024C376.807 281.884 376.982 281.775 377.172 281.705C377.336 281.643 377.51 281.612 377.684 281.612L383.549 281.6L385.943 281.596L417.441 281.538L419.836 281.534L425.696 281.523H425.698C426.105 281.523 426.496 281.691 426.784 281.99C427.072 282.29 427.234 282.696 427.234 283.119Z" fill="#E6E6E6"></path><path d="M381.334 305.908C382.044 305.908 391.792 306.527 391.792 307.265C391.792 308.003 382.044 308.58 381.334 308.58C380.993 308.58 380.666 308.439 380.425 308.189C380.184 307.938 380.049 307.598 380.049 307.244C380.049 306.889 380.184 306.55 380.425 306.299C380.666 306.049 380.993 305.908 381.334 305.908Z" fill="#E6E6E6"></path><path d="M416.785 255.782H386.6C385.791 255.783 385.016 256.117 384.444 256.712C383.872 257.306 383.55 258.112 383.549 258.953V297.193H419.014C419.305 297.194 419.59 297.108 419.836 296.945V258.953C419.835 258.112 419.513 257.306 418.941 256.712C418.369 256.117 417.594 255.783 416.785 255.782Z" fill="#F2F2F2"></path><path d="M405.264 258.353H388.722C387.985 258.354 387.279 258.658 386.758 259.199C386.237 259.741 385.944 260.475 385.943 261.24V297.193H417.441V271.01C417.437 267.655 416.153 264.437 413.87 262.065C411.587 259.692 408.492 258.357 405.264 258.353Z" fill="white"></path><path d="M412.074 294H391.309C391.129 294 390.957 294.075 390.83 294.206C390.703 294.338 390.632 294.517 390.632 294.704C390.632 294.891 390.703 295.069 390.83 295.201C390.957 295.333 391.129 295.407 391.309 295.407H412.074C412.254 295.407 412.426 295.333 412.553 295.201C412.68 295.069 412.751 294.891 412.751 294.704C412.751 294.517 412.68 294.338 412.553 294.206C412.426 294.075 412.254 294 412.074 294Z" fill="#E4E4E4"></path><path d="M412.075 291.218H391.309C391.129 291.218 390.957 291.292 390.83 291.424C390.703 291.556 390.631 291.735 390.631 291.922C390.631 292.109 390.703 292.288 390.83 292.42C390.957 292.552 391.129 292.626 391.309 292.626H412.075C412.163 292.626 412.252 292.608 412.334 292.573C412.416 292.537 412.491 292.486 412.554 292.42C412.616 292.355 412.666 292.277 412.7 292.192C412.734 292.106 412.752 292.015 412.752 291.922C412.752 291.83 412.734 291.738 412.7 291.653C412.666 291.567 412.616 291.49 412.554 291.424C412.491 291.359 412.416 291.307 412.334 291.272C412.252 291.236 412.163 291.218 412.075 291.218Z" fill="#E4E4E4"></path><path d="M400.31 288.437H391.309C391.129 288.437 390.957 288.511 390.83 288.643C390.703 288.775 390.632 288.954 390.632 289.14C390.632 289.327 390.703 289.506 390.83 289.638C390.957 289.77 391.129 289.844 391.309 289.844H400.31C400.49 289.844 400.662 289.77 400.789 289.638C400.916 289.506 400.987 289.327 400.987 289.14C400.987 288.954 400.916 288.775 400.789 288.643C400.662 288.511 400.49 288.437 400.31 288.437Z" fill="#E4E4E4"></path><path d="M412.074 282.611H391.309C391.13 282.611 390.958 282.686 390.831 282.818C390.705 282.95 390.633 283.129 390.633 283.315C390.633 283.501 390.705 283.68 390.831 283.812C390.958 283.944 391.13 284.019 391.309 284.019H412.074C412.164 284.02 412.252 284.002 412.334 283.966C412.417 283.931 412.492 283.879 412.555 283.814C412.618 283.748 412.668 283.671 412.702 283.585C412.736 283.499 412.754 283.408 412.754 283.315C412.754 283.222 412.736 283.131 412.702 283.045C412.668 282.959 412.618 282.882 412.555 282.816C412.492 282.751 412.417 282.699 412.334 282.664C412.252 282.629 412.164 282.611 412.074 282.611Z" fill="#E4E4E4"></path><path d="M412.074 279.83H391.309C391.129 279.83 390.957 279.904 390.83 280.036C390.703 280.168 390.632 280.347 390.632 280.533C390.632 280.72 390.703 280.899 390.83 281.031C390.957 281.163 391.129 281.237 391.309 281.237H412.074C412.254 281.237 412.426 281.163 412.553 281.031C412.68 280.899 412.751 280.72 412.751 280.533C412.751 280.347 412.68 280.168 412.553 280.036C412.426 279.904 412.254 279.83 412.074 279.83Z" fill="#E4E4E4"></path><path d="M400.31 277.047H391.309C391.129 277.047 390.957 277.122 390.83 277.254C390.703 277.386 390.631 277.565 390.631 277.752C390.631 277.938 390.703 278.118 390.83 278.25C390.957 278.382 391.129 278.456 391.309 278.456H400.31C400.49 278.456 400.662 278.382 400.79 278.25C400.917 278.118 400.988 277.938 400.988 277.752C400.988 277.565 400.917 277.386 400.79 277.254C400.662 277.122 400.49 277.047 400.31 277.047Z" fill="#E4E4E4"></path><path d="M412.074 271.221H391.309C391.13 271.222 390.958 271.296 390.831 271.428C390.705 271.56 390.633 271.739 390.633 271.926C390.633 272.112 390.705 272.291 390.831 272.423C390.958 272.555 391.13 272.629 391.309 272.63H412.074C412.164 272.63 412.252 272.612 412.334 272.577C412.417 272.542 412.492 272.49 412.555 272.424C412.618 272.359 412.668 272.281 412.702 272.196C412.736 272.11 412.754 272.018 412.754 271.926C412.754 271.833 412.736 271.741 412.702 271.656C412.668 271.57 412.618 271.492 412.555 271.427C412.492 271.361 412.417 271.31 412.334 271.274C412.252 271.239 412.164 271.221 412.074 271.221Z" fill="#E4E4E4"></path><path d="M412.074 268.44H391.309C391.13 268.441 390.958 268.515 390.831 268.647C390.705 268.779 390.633 268.958 390.633 269.145C390.633 269.331 390.705 269.51 390.831 269.642C390.958 269.774 391.13 269.848 391.309 269.849H412.074C412.164 269.849 412.252 269.831 412.334 269.796C412.417 269.761 412.492 269.709 412.555 269.643C412.618 269.578 412.668 269.5 412.702 269.415C412.736 269.329 412.754 269.237 412.754 269.145C412.754 269.052 412.736 268.96 412.702 268.875C412.668 268.789 412.618 268.711 412.555 268.646C412.492 268.58 412.417 268.529 412.334 268.493C412.252 268.458 412.164 268.44 412.074 268.44Z" fill="#E4E4E4"></path><path d="M400.31 265.658H391.309C391.129 265.658 390.957 265.732 390.83 265.864C390.703 265.996 390.631 266.175 390.631 266.362C390.631 266.549 390.703 266.728 390.83 266.86C390.957 266.992 391.129 267.066 391.309 267.066H400.31C400.399 267.066 400.488 267.048 400.57 267.013C400.652 266.977 400.727 266.926 400.79 266.86C400.852 266.795 400.902 266.717 400.936 266.632C400.97 266.546 400.988 266.455 400.988 266.362C400.988 266.27 400.97 266.178 400.936 266.093C400.902 266.007 400.852 265.93 400.79 265.864C400.727 265.799 400.652 265.747 400.57 265.712C400.488 265.676 400.399 265.658 400.31 265.658Z" fill="#E4E4E4"></path><path d="M176.676 133.798C187.743 133.798 196.714 124.473 196.714 112.97C196.714 101.467 187.743 92.1419 176.676 92.1419C165.61 92.1419 156.639 101.467 156.639 112.97C156.639 124.473 165.61 133.798 176.676 133.798Z" fill="#FFB6B6"></path><path d="M199.55 101.044C197.442 97.6547 193.486 95.3957 189.652 96.0305C189.295 93.4869 188.274 91.0939 186.699 89.1119C185.124 87.13 183.057 85.6351 180.721 84.79C178.386 83.9449 175.872 83.7821 173.453 84.3192C171.035 84.8563 168.805 86.0727 167.005 87.8361C166.414 87.4031 165.724 87.1362 165.004 87.0613C164.284 86.9864 163.558 87.106 162.895 87.4086C161.576 88.0323 160.427 88.9902 159.556 90.1946C157.356 93.0466 155.941 96.4655 155.462 100.087C154.982 103.709 155.457 107.398 156.835 110.761C156.366 108.991 158.073 107.325 159.798 106.927C161.523 106.53 163.333 106.906 165.082 106.647C167.324 106.316 169.339 104.964 171.585 104.659C173.472 104.404 175.37 104.907 177.21 105.411C179.051 105.915 180.943 106.429 182.833 106.196C184.723 105.962 187.158 113.407 187.125 118.651C187.119 119.645 187.316 120.92 188.25 121.131C189.401 121.391 190.067 119.74 191.163 119.291C191.667 119.14 192.208 119.199 192.672 119.456C193.136 119.712 193.485 120.145 193.648 120.664C193.786 121.192 193.8 121.746 193.691 122.281C193.581 122.816 193.35 123.316 193.017 123.739C192.344 124.578 191.545 125.298 190.65 125.873L191.102 126.262C191.852 127.293 193.408 127.337 194.489 126.7C195.523 125.972 196.361 124.981 196.922 123.821C198.922 120.362 200.677 116.677 201.383 112.709C202.089 108.74 201.657 104.434 199.55 101.044Z" fill="#2F2E41"></path><path d="M200.181 477.701L189.36 477.7L184.212 434.313L200.184 434.313L200.181 477.701Z" fill="#FFB6B6"></path><path d="M200.563 489.435L167.284 489.434V488.997C167.285 485.426 168.649 482.001 171.078 479.477C173.508 476.952 176.802 475.533 180.237 475.533H180.238L186.317 470.74L197.658 475.534L200.563 475.534L200.563 489.435Z" fill="#2F2E41"></path><path d="M219.696 457.84L211.206 464.814L181.28 434.098L193.811 423.802L219.696 457.84Z" fill="#FFB6B6"></path><path d="M226.996 466.799L200.89 488.25L200.629 487.907C198.498 485.106 197.526 481.54 197.925 477.993C198.324 474.447 200.062 471.21 202.757 468.996L202.758 468.995L204.666 461.316L216.424 457.766L218.702 455.894L226.996 466.799Z" fill="#2F2E41"></path><path d="M144.222 274.327L143.561 286.988L146.775 291.023L146.406 303.687L149.524 311.976L151.717 338.346L182.426 448.377L210.099 439.15L179.88 336.582L216.238 335.638L217.468 277.803L211.025 264.857L144.222 274.327Z" fill="#2F2E41"></path><path d="M212.741 326.919L216.238 335.638L202.718 458.411L183.748 459.851L175.557 322.595L212.741 326.919Z" fill="#2F2E41"></path><path d="M194.15 145.993L187.921 137.031L167.808 137.869L167.422 144.77L154.061 275.945L167.182 275.639L183.471 279.592L214.798 268.195L194.15 145.993Z" fill="#72EFDD"></path><path d="M159.221 278.37H128.375L136.422 219.326L139.685 195.394C139.685 195.394 137.376 178.289 136.257 169.353C136.153 168.399 136.312 167.434 136.716 166.571C137.081 165.762 137.559 165.013 138.133 164.348C141.885 159.851 150.324 155.951 155.616 153.817C158.341 152.724 160.235 152.095 160.235 152.095L167.421 144.772C177.736 158.168 159.221 278.37 159.221 278.37Z" fill="#3F3D56"></path><path d="M190.243 141.117L200.029 146.946C200.029 146.946 229.009 151.894 231.828 163.207L221.16 196.679V267.024L195.299 277.803C195.299 277.803 172.991 164.156 190.243 141.117Z" fill="#3F3D56"></path><path opacity="0.4" d="M180.338 319.752L175.557 377.315L183.697 444.308" fill="black"></path><path d="M64.9062 212.518C65.7033 211.923 66.6163 211.516 67.5809 211.327C68.5455 211.138 69.5382 211.171 70.4892 211.424C71.4401 211.677 72.3262 212.144 73.0849 212.791C73.8436 213.439 74.4565 214.251 74.8804 215.171L98.5896 212.384L92.9701 223.873L71.317 224.758C69.7825 225.396 68.0762 225.427 66.5215 224.844C64.9667 224.262 63.6715 223.107 62.8813 221.598C62.0911 220.089 61.8608 218.332 62.234 216.658C62.6072 214.985 63.558 213.512 64.9062 212.518Z" fill="#FFB6B6"></path><path d="M164.416 162.215L171.201 166.428L133.202 222.07L86.8217 226.166L84.9749 212.402L119.148 201.745L136.039 167.714L164.416 162.215Z" fill="#3F3D56"></path><path d="M302.711 207.815C301.914 207.219 301.001 206.813 300.037 206.624C299.072 206.435 298.079 206.468 297.128 206.721C296.178 206.974 295.291 207.441 294.533 208.088C293.774 208.735 293.161 209.548 292.737 210.468L269.028 207.681L274.648 219.169L296.301 220.055C297.835 220.692 299.541 220.723 301.096 220.141C302.651 219.558 303.946 218.403 304.736 216.895C305.527 215.386 305.757 213.628 305.384 211.955C305.01 210.281 304.06 208.808 302.711 207.815Z" fill="#FFB6B6"></path><path d="M203.201 157.511L196.417 161.724L234.415 217.367L280.796 221.463L282.642 207.698L248.47 197.042L231.579 163.01L203.201 157.511Z" fill="#3F3D56"></path><path d="M110.817 144.418V143.683H98.9565V126.528H98.2508V143.683H84.6582V130.435C84.4206 130.629 84.186 130.829 83.9544 131.035V143.683H74.9767C74.8769 143.926 74.7808 144.171 74.6901 144.418H83.9544V158.834H72.4515C72.4624 159.081 72.4788 159.324 72.4987 159.569H83.9544V171.069H75.3722C75.4774 171.316 75.588 171.559 75.7041 171.801H83.9544V181.468H84.6582V171.801H98.2508V181.468H98.9565V171.801H110.817V171.069H98.9565C98.9562 169.559 99.2421 168.063 99.798 166.668C100.354 165.272 101.169 164.005 102.196 162.937C103.224 161.869 104.444 161.022 105.786 160.444C107.128 159.866 108.567 159.569 110.02 159.569H110.817V158.834H98.9565V144.418H110.817ZM98.2508 171.069H84.6582V159.569H98.2508V171.069ZM98.2508 158.834H84.6582V158.545C84.6583 156.69 85.01 154.853 85.6932 153.139C86.3763 151.425 87.3776 149.867 88.6398 148.556C89.902 147.244 91.4004 146.203 93.0494 145.494C94.6985 144.784 96.4659 144.418 98.2508 144.418V158.834Z" fill="#E6E6E6"></path><path d="M213.861 42.6372C213.768 42.6768 213.664 42.6767 213.572 42.6369C213.479 42.597 213.406 42.5206 213.367 42.4245L212.385 39.9578C212.347 39.8616 212.347 39.7535 212.385 39.6573C212.424 39.5611 212.497 39.4847 212.59 39.4449C212.682 39.4051 212.786 39.4051 212.879 39.445C212.971 39.4849 213.045 39.5613 213.083 39.6575L214.065 42.1243C214.104 42.2205 214.103 42.3285 214.065 42.4247C214.027 42.5208 213.953 42.5972 213.861 42.6372Z" fill="#3F3D56"></path><path d="M233.67 24.3632L230.739 17.0002C230.516 16.4406 230.189 15.9321 229.777 15.5037C229.365 15.0753 228.876 14.7354 228.338 14.5034C227.8 14.2715 227.223 14.152 226.64 14.1518C226.057 14.1516 225.48 14.2707 224.942 14.5023L209.935 20.9578C209.396 21.1894 208.907 21.5289 208.495 21.957C208.083 22.3851 207.756 22.8934 207.532 23.4529C207.309 24.0124 207.194 24.6121 207.194 25.2177C207.194 25.8234 207.309 26.4231 207.531 26.9828L223.613 67.3765C223.836 67.9362 224.163 68.4447 224.575 68.8731C224.986 69.3015 225.475 69.6414 226.014 69.8734C226.552 70.1053 227.129 70.2248 227.712 70.225C228.294 70.2252 228.871 70.1061 229.41 69.8745L244.417 63.419C244.956 63.1874 245.445 62.8479 245.857 62.4198C246.269 61.9917 246.596 61.4834 246.819 60.9239C247.042 60.3644 247.157 59.7647 247.158 59.1591C247.158 58.5534 247.043 57.9537 246.82 57.394L235.757 29.6043C235.791 29.5897 235.821 29.5683 235.847 29.5413C235.873 29.5143 235.894 29.4822 235.908 29.4469C235.922 29.4117 235.929 29.3738 235.929 29.3356C235.929 29.2974 235.922 29.2596 235.908 29.2243L234.036 24.5208C234.021 24.4855 234.001 24.4534 233.975 24.4264C233.949 24.3994 233.918 24.3779 233.884 24.3633C233.85 24.3487 233.814 24.3411 233.777 24.3411C233.74 24.3411 233.704 24.3486 233.67 24.3632Z" fill="#3F3D56"></path><path d="M229.877 17.404L245.936 57.7397C246.27 58.5775 246.272 59.5184 245.942 60.3579C245.613 61.1974 244.977 61.8678 244.175 62.2234C244.165 62.23 244.154 62.2355 244.143 62.2399L229.062 68.7267C228.25 69.076 227.337 69.0756 226.525 68.7257C225.713 68.3757 225.068 67.7048 224.732 66.8606L208.673 26.5249C208.507 26.1069 208.421 25.6589 208.422 25.2066C208.422 24.7543 208.508 24.3065 208.675 23.8887C208.842 23.471 209.086 23.0914 209.394 22.7718C209.702 22.4522 210.067 22.1988 210.469 22.0261L212.298 21.2394C212.299 21.508 212.364 21.7722 212.487 22.0086C212.61 22.245 212.786 22.4464 213.002 22.5951C213.217 22.7437 213.464 22.835 213.721 22.8609C213.978 22.8868 214.238 22.8465 214.477 22.7435L223.075 19.0452C223.262 18.9643 223.432 18.8455 223.575 18.6956C223.723 18.5448 223.84 18.3653 223.92 18.1674C224.001 17.9695 224.043 17.7569 224.044 17.5421C224.045 17.3272 224.006 17.1142 223.928 16.9152C223.85 16.7163 223.734 16.5353 223.589 16.3827L225.55 15.5392C226.362 15.1901 227.274 15.1905 228.085 15.5402C228.897 15.8899 229.541 16.5603 229.877 17.404Z" fill="#72EFDD"></path><path d="M212.186 38.4292C212.093 38.4689 211.989 38.4688 211.897 38.4289C211.804 38.389 211.731 38.3127 211.692 38.2166L210.71 35.7498C210.672 35.6536 210.672 35.5455 210.71 35.4493C210.749 35.3532 210.822 35.2768 210.915 35.2369C211.007 35.1971 211.111 35.1972 211.204 35.237C211.296 35.2769 211.37 35.3534 211.408 35.4496L212.39 37.9163C212.428 38.0125 212.428 38.1206 212.39 38.2167C212.352 38.3129 212.278 38.3893 212.186 38.4292Z" fill="#3F3D56"></path><path d="M210.209 33.6708C210.117 33.7105 210.013 33.7104 209.92 33.6706C209.828 33.6307 209.754 33.5543 209.716 33.4582L208.734 30.9915C208.715 30.9438 208.705 30.8927 208.705 30.841C208.705 30.7893 208.714 30.7381 208.733 30.6904C208.752 30.6426 208.78 30.5992 208.815 30.5627C208.85 30.5261 208.892 30.4971 208.938 30.4774C208.984 30.4576 209.033 30.4475 209.083 30.4475C209.133 30.4476 209.182 30.4579 209.228 30.4777C209.274 30.4976 209.315 30.5267 209.35 30.5633C209.385 30.6 209.413 30.6434 209.432 30.6912L210.414 33.158C210.452 33.2542 210.452 33.3622 210.414 33.4584C210.375 33.5545 210.302 33.6309 210.209 33.6708Z" fill="#3F3D56"></path><path d="M215.738 20.2461C215.699 20.1498 215.699 20.0418 215.738 19.9457C215.776 19.8495 215.85 19.7731 215.942 19.7332L218.315 18.7124C218.408 18.6726 218.512 18.6726 218.604 18.7125C218.697 18.7524 218.77 18.8288 218.809 18.925C218.847 19.0212 218.847 19.1293 218.809 19.2255C218.77 19.3217 218.697 19.3981 218.604 19.4379L216.231 20.4587C216.138 20.4984 216.034 20.4983 215.942 20.4584C215.849 20.4186 215.776 20.3422 215.738 20.2461Z" fill="white"></path><path d="M219.786 18.8973C219.994 18.8973 220.164 18.7215 220.164 18.5047C220.164 18.2879 219.994 18.1121 219.786 18.1121C219.577 18.1121 219.408 18.2879 219.408 18.5047C219.408 18.7215 219.577 18.8973 219.786 18.8973Z" fill="white"></path><path d="M301.701 193.096C301.653 193.096 301.606 193.095 301.557 193.093C300.997 193.072 300.449 192.91 299.961 192.622C299.473 192.333 299.06 191.927 298.755 191.436C296.477 187.897 293.681 184.749 290.468 182.106C288.523 180.49 286.491 178.987 284.526 177.534C279.455 173.787 274.681 170.258 272.03 165.381C266.251 154.747 273.057 139.936 282.779 133.294C293.684 125.844 308.028 124.675 321.904 124.522C323.346 124.506 324.789 124.498 326.233 124.498C351.235 124.508 376.184 126.88 400.773 131.583C408.95 133.151 417.508 135.072 424.386 139.733C431.223 144.367 435.378 151.665 434.973 158.325C434.381 168.048 424.465 175.312 415.436 177.212C406.83 179.021 397.889 177.798 388.424 176.504C386.334 176.218 384.174 175.923 382.037 175.666C358.818 172.876 315.198 181.475 313.353 181.842L311.522 182.207L304.418 191.709C304.098 192.142 303.687 192.492 303.216 192.733C302.744 192.974 302.226 193.098 301.701 193.096Z" fill="#72EFDD"></path><path d="M405.101 145.665H306.959C306.393 145.665 305.85 145.431 305.449 145.015C305.049 144.599 304.824 144.034 304.824 143.445C304.824 142.857 305.049 142.292 305.449 141.876C305.85 141.46 306.393 141.226 306.959 141.226H405.101C405.667 141.226 406.21 141.46 406.611 141.876C407.011 142.292 407.236 142.857 407.236 143.445C407.236 144.034 407.011 144.599 406.611 145.015C406.21 145.431 405.667 145.665 405.101 145.665Z" fill="white"></path><path d="M405.101 159.289H306.959C306.393 159.289 305.851 159.055 305.45 158.639C305.05 158.223 304.825 157.66 304.824 157.071C304.824 156.483 305.048 155.919 305.447 155.502C305.847 155.086 306.389 154.851 306.955 154.85H405.101C405.666 154.851 406.209 155.085 406.608 155.501C407.008 155.917 407.232 156.481 407.232 157.069C407.232 157.657 407.008 158.221 406.608 158.637C406.209 159.053 405.666 159.288 405.101 159.289Z" fill="white"></path><path d="M318.396 172.912H306.959C306.393 172.911 305.851 172.677 305.452 172.261C305.052 171.845 304.827 171.281 304.827 170.693C304.827 170.105 305.052 169.541 305.452 169.125C305.851 168.709 306.393 168.474 306.959 168.473H318.396C318.962 168.474 319.504 168.709 319.904 169.125C320.303 169.541 320.528 170.105 320.528 170.693C320.528 171.281 320.303 171.845 319.904 172.261C319.504 172.677 318.962 172.911 318.396 172.912Z" fill="white"></path><path d="M302.913 208.57C308.645 208.57 313.292 203.74 313.292 197.781C313.292 191.822 308.645 186.992 302.913 186.992C297.18 186.992 292.533 191.822 292.533 197.781C292.533 203.74 297.18 208.57 302.913 208.57Z" fill="white"></path><path d="M302.913 208.702C300.835 208.702 298.804 208.061 297.076 206.861C295.348 205.661 294.001 203.956 293.206 201.96C292.411 199.965 292.203 197.769 292.608 195.651C293.014 193.532 294.014 191.586 295.484 190.059C296.953 188.532 298.825 187.492 300.863 187.07C302.901 186.649 305.014 186.865 306.933 187.692C308.853 188.518 310.494 189.918 311.648 191.714C312.803 193.51 313.419 195.621 313.419 197.781C313.416 200.676 312.308 203.452 310.338 205.499C308.369 207.547 305.698 208.698 302.913 208.702Z" fill="#3F3D56"></path><path d="M302.136 202.093C302.114 202.093 302.092 202.092 302.069 202.091C301.874 202.081 301.683 202.028 301.509 201.934C301.335 201.84 301.183 201.708 301.063 201.548L299.329 199.23C299.219 199.083 299.138 198.916 299.091 198.737C299.044 198.558 299.031 198.372 299.053 198.188C299.075 198.004 299.132 197.826 299.22 197.665C299.308 197.504 299.426 197.362 299.567 197.249L299.629 197.198C299.77 197.084 299.931 197 300.103 196.951C300.275 196.902 300.455 196.888 300.632 196.911C300.809 196.934 300.98 196.993 301.135 197.085C301.29 197.177 301.426 197.299 301.535 197.446C301.623 197.563 301.734 197.658 301.86 197.727C301.987 197.795 302.126 197.834 302.269 197.841C302.411 197.849 302.553 197.824 302.686 197.768C302.818 197.713 302.937 197.629 303.035 197.522L306.557 193.657C306.805 193.385 307.147 193.227 307.507 193.217C307.866 193.207 308.216 193.345 308.477 193.602L308.535 193.66C308.665 193.787 308.769 193.94 308.841 194.109C308.914 194.279 308.954 194.461 308.959 194.646C308.964 194.832 308.933 195.016 308.869 195.189C308.806 195.362 308.71 195.521 308.587 195.655L303.121 201.652C302.995 201.791 302.842 201.902 302.672 201.978C302.503 202.054 302.32 202.093 302.136 202.093Z" fill="white"></path><path d="M109.104 58.3179L102.754 18.6239C102.626 17.8203 102.811 16.9969 103.266 16.3344C103.722 15.6718 104.412 15.2242 105.185 15.0897L134.025 10.1047C134.798 9.97206 135.59 10.1635 136.228 10.6372C136.865 11.1108 137.296 11.8279 137.425 12.6312L143.775 52.3252C143.903 53.1288 143.719 53.9521 143.263 54.6147C142.808 55.2773 142.118 55.7249 141.345 55.8594L112.504 60.8443C111.731 60.977 110.939 60.7855 110.302 60.3119C109.664 59.8383 109.234 59.1212 109.104 58.3179Z" fill="#3F3D56"></path><path d="M109.398 45.9463L105.316 20.4273C105.196 19.6748 105.369 18.9036 105.796 18.2831C106.222 17.6626 106.869 17.2434 107.592 17.1174L132.378 12.8333C133.102 12.709 133.844 12.8883 134.441 13.3319C135.038 13.7754 135.441 14.447 135.563 15.1993L141.213 50.5216C141.333 51.2742 141.16 52.0453 140.734 52.6658C140.307 53.2863 139.661 53.7056 138.937 53.8315L123.583 56.4854C120.358 57.039 117.053 56.2402 114.394 54.2645C111.735 52.2887 109.938 49.2972 109.398 45.9463Z" fill="white"></path><path d="M110.468 26.8539C110.351 26.1185 110.52 25.365 110.937 24.7586C111.354 24.1523 111.985 23.7426 112.693 23.6195L129.887 20.6476C130.237 20.5871 130.595 20.5988 130.941 20.6823C131.287 20.7657 131.614 20.9191 131.903 21.1338C132.192 21.3485 132.437 21.6203 132.625 21.9336C132.813 22.2468 132.94 22.5955 132.998 22.9597C133.057 23.3239 133.045 23.6965 132.965 24.0561C132.885 24.4157 132.737 24.7554 132.531 25.0558C132.324 25.3561 132.063 25.6112 131.761 25.8066C131.46 26.0019 131.124 26.1336 130.774 26.1941L113.58 29.166C112.872 29.2875 112.147 29.1123 111.564 28.6788C110.981 28.2453 110.587 27.5891 110.468 26.8539Z" fill="#72EFDD"></path><path d="M111.848 35.4818C111.732 34.7464 111.9 33.9928 112.317 33.3865C112.734 32.7801 113.366 32.3705 114.073 32.2474L131.267 29.2755C131.974 29.1532 132.7 29.3281 133.283 29.7617C133.867 30.1953 134.261 30.8521 134.379 31.5876C134.496 32.3231 134.328 33.0771 133.911 33.6836C133.494 34.2902 132.862 34.6997 132.154 34.822L114.96 37.7939C114.253 37.9153 113.528 37.7401 112.944 37.3067C112.361 36.8732 111.967 36.2169 111.848 35.4818Z" fill="#72EFDD"></path><path d="M113.229 44.1097C113.112 43.3743 113.28 42.6207 113.697 42.0144C114.114 41.408 114.746 40.9983 115.453 40.8753L132.647 37.9034C132.997 37.8428 133.356 37.8546 133.702 37.938C134.048 38.0214 134.375 38.1748 134.664 38.3895C134.953 38.6042 135.198 38.876 135.386 39.1893C135.574 39.5026 135.701 39.8513 135.759 40.2155C135.817 40.5796 135.806 40.9522 135.725 41.3118C135.645 41.6715 135.498 42.0112 135.291 42.3115C135.084 42.6119 134.823 42.867 134.522 43.0623C134.22 43.2576 133.885 43.3893 133.534 43.4499L116.34 46.4218C115.633 46.5432 114.908 46.368 114.325 45.9345C113.741 45.5011 113.347 44.8448 113.229 44.1097Z" fill="#72EFDD"></path><path d="M259.79 462.01L260.247 451.327C265.012 448.679 270.327 447.281 275.73 447.253C268.294 453.572 269.223 465.755 264.181 474.253C262.589 476.891 260.447 479.123 257.912 480.783C255.377 482.444 252.516 483.49 249.539 483.844L243.316 487.805C242.462 482.856 242.65 477.775 243.868 472.909C245.085 468.044 247.303 463.511 250.368 459.622C252.109 457.459 254.104 455.531 256.308 453.886C257.798 457.971 259.79 462.01 259.79 462.01Z" fill="#F2F2F2"></path><path d="M342.301 488.956C342.302 489.094 342.276 489.229 342.226 489.356C342.175 489.483 342.101 489.598 342.008 489.695C341.915 489.792 341.804 489.869 341.682 489.921C341.56 489.974 341.429 490 341.297 490H71.0578C70.7915 490 70.5361 489.89 70.3478 489.694C70.1595 489.499 70.0537 489.233 70.0537 488.956C70.0537 488.68 70.1595 488.414 70.3478 488.218C70.5361 488.023 70.7915 487.913 71.0578 487.913H341.297C341.429 487.912 341.56 487.939 341.682 487.991C341.804 488.044 341.915 488.12 342.008 488.217C342.101 488.314 342.175 488.43 342.226 488.557C342.276 488.683 342.302 488.819 342.301 488.956Z" fill="#CCCCCC"></path><path d="M71.7091 207.142C66.9163 207.043 41.172 206.275 36.9503 206.464C36.7115 205.595 28.7084 216.255 28.5138 216.321C28.3841 216.464 28.2894 216.636 28.2379 216.825C28.1864 217.014 28.1796 217.212 28.218 217.404C28.2564 217.596 28.3389 217.776 28.4585 217.927C28.5781 218.079 28.7312 218.198 28.9048 218.275C29.3752 218.572 70.8784 217.774 71.3813 217.878C71.5988 217.874 71.8109 217.807 71.9932 217.684C72.1755 217.56 72.3205 217.386 72.4115 217.18L72.689 216.535C72.7178 215.43 73.0658 209.783 72.7534 208.818C72.83 208.636 72.8622 208.438 72.8469 208.241C72.8316 208.044 72.7694 207.853 72.6659 207.687C72.5624 207.521 72.4207 207.384 72.2537 207.289C72.0867 207.194 71.8995 207.143 71.7091 207.142Z" fill="#3F3D56"></path><path opacity="0.17" d="M72.6889 216.533C72.4453 217.142 72.1337 217.906 71.3812 217.878L29.343 218.369C29.1442 218.366 28.9492 218.311 28.777 218.208C28.6047 218.104 28.4608 217.957 28.3592 217.779C28.2576 217.602 28.2017 217.4 28.1968 217.193C28.1918 216.987 28.2381 216.782 28.3311 216.599L72.6889 216.533Z" fill="black"></path><path d="M37.1466 206.333C36.6941 205.519 25.4552 147.716 24.5172 147.232L16.8439 137.475L16.1581 136.939C15.2044 136.395 12.9166 136.763 13.1227 138.277C14.9254 147.261 26.5203 198.426 26.7744 206.403L28.1701 216.565C28.195 216.738 28.2545 216.904 28.3447 217.051C28.435 217.199 28.554 217.325 28.694 217.422C28.8341 217.519 28.9921 217.584 29.1579 217.614C29.3237 217.643 29.4937 217.636 29.6567 217.593C30.0568 217.549 30.4387 217.396 30.7649 217.151C31.091 216.906 31.3502 216.577 31.5167 216.196C31.6213 215.838 37.6721 206.541 37.1466 206.333Z" fill="#3F3D56"></path><path opacity="0.17" d="M16.842 137.476L31.5181 216.198C31.0273 217.49 28.7307 218.394 28.1958 216.7C28.1865 216.698 13.1398 138.325 13.1245 138.279C12.9642 136.392 15.9626 136.333 16.842 137.476Z" fill="black"></path><path d="M17.2841 140.695L24.738 151.494L33.1041 192.793L29.2145 196.319L17.2841 140.695Z" fill="#72EFDD"></path><path d="M66.8977 212.711L68.9598 212.798C68.9921 212.17 69.0918 211.548 69.2572 210.943C69.5674 209.411 69.8454 207.591 68.559 207.597C67.6864 207.51 67.389 208.659 67.2338 209.909C67.1938 210.85 67.0814 211.787 66.8977 212.711Z" fill="#2F2E41"></path><path d="M55.0681 209.828L56.4579 209.882L57.1302 209.909C57.1173 209.143 57.4599 207.564 56.626 207.174C56.4934 207.115 56.3502 207.085 56.2058 207.087C55.4236 207.04 55.1909 207.658 55.1198 208.37C55.0746 208.8 55.094 209.257 55.081 209.613C55.081 209.687 55.0746 209.761 55.0681 209.828Z" fill="#2F2E41"></path><path d="M50.9504 209.653L52.3467 209.714L53.0125 209.741C52.9996 208.861 53.4456 206.939 52.0881 206.912C50.834 206.838 50.9956 208.498 50.9633 209.438C50.9633 209.512 50.9569 209.586 50.9504 209.653Z" fill="#2F2E41"></path><path d="M46.8326 209.485L48.2225 209.539L48.8947 209.566C48.8818 208.693 49.3278 206.771 47.9703 206.744C46.7163 206.663 46.8779 208.323 46.8456 209.27C46.8455 209.344 46.8391 209.418 46.8326 209.485Z" fill="#2F2E41"></path><path d="M42.7148 209.311L44.1111 209.371L44.777 209.398C44.764 208.518 45.21 206.603 43.8525 206.569C42.5985 206.495 42.7601 208.155 42.7278 209.096C42.7278 209.17 42.7213 209.244 42.7148 209.311Z" fill="#2F2E41"></path><path d="M38.5972 209.143L39.987 209.196L40.6593 209.223C40.6463 208.417 41.0213 206.731 40.0258 206.442H40.0193C39.927 206.413 39.8311 206.4 39.7349 206.401C39.6175 206.39 39.4993 206.402 39.3858 206.435H39.3793C38.5131 206.67 38.6359 208.081 38.6101 208.928C38.6101 209.002 38.6036 209.076 38.5972 209.143Z" fill="#2F2E41"></path><path d="M62.7412 208.686L64.8033 208.773C64.8033 208.693 64.8033 208.605 64.8098 208.504C64.8608 207.993 64.8695 207.478 64.8356 206.966C64.7645 206.401 64.5318 205.958 63.8789 205.944C63.2131 205.904 62.9481 206.348 62.8446 206.919C62.8206 207.016 62.8033 207.115 62.7929 207.214V207.221C62.7412 207.745 62.7735 208.31 62.7412 208.686Z" fill="#2F2E41"></path><path d="M58.6235 208.511L60.6856 208.598C60.7294 208.022 60.7423 207.443 60.7244 206.865C60.6662 206.274 60.44 205.79 59.7612 205.776C59.076 205.729 58.811 206.213 58.7076 206.811C58.6106 207.389 58.6623 208.081 58.6235 208.511Z" fill="#2F2E41"></path><path d="M54.5057 208.343L55.1198 208.37L56.5678 208.43C56.5614 208.108 56.6195 207.638 56.626 207.174C56.6315 207.035 56.6272 206.896 56.6131 206.757C56.5614 206.132 56.348 205.615 55.6434 205.602C54.9259 205.561 54.6738 206.079 54.5833 206.71C54.4928 207.275 54.5445 207.927 54.5057 208.343Z" fill="#2F2E41"></path><path d="M62.78 212.543L64.8421 212.623C64.8357 211.75 65.2752 209.828 63.9177 209.801C62.5602 209.714 62.8576 211.662 62.78 212.543Z" fill="#2F2E41"></path><path d="M58.6622 212.368L60.7243 212.455C60.7179 211.575 61.1575 209.653 59.8 209.626C58.4424 209.546 58.7398 211.494 58.6622 212.368Z" fill="#2F2E41"></path><path d="M54.5446 212.2L56.6067 212.281C56.6002 211.656 56.8264 210.5 56.458 209.882C56.3776 209.745 56.263 209.633 56.1264 209.559C55.9898 209.484 55.8363 209.45 55.6823 209.459C55.4706 209.435 55.2579 209.49 55.0811 209.613C54.4217 210.063 54.6092 211.488 54.5446 212.2Z" fill="#2F2E41"></path><path d="M50.4268 212.025L52.4889 212.113C52.4824 211.488 52.7022 210.339 52.3467 209.714C52.2664 209.575 52.1511 209.461 52.0132 209.386C51.8753 209.31 51.7202 209.275 51.5645 209.284C51.3528 209.26 51.1397 209.314 50.9633 209.438C50.3039 209.902 50.4914 211.32 50.4268 212.025Z" fill="#2F2E41"></path><path d="M46.309 211.857L48.3711 211.938C48.3646 211.313 48.5908 210.157 48.2224 209.539C48.142 209.402 48.0274 209.291 47.8908 209.216C47.7542 209.141 47.6007 209.107 47.4467 209.116C47.235 209.093 47.0223 209.147 46.8455 209.27C46.1862 209.721 46.3736 211.145 46.309 211.857Z" fill="#2F2E41"></path><path d="M42.1913 211.683L44.2534 211.77C44.2469 211.145 44.4667 209.996 44.1112 209.371C44.0315 209.232 43.9163 209.118 43.7783 209.042C43.6403 208.966 43.4848 208.931 43.329 208.941C43.1173 208.917 42.9042 208.972 42.7278 209.096C42.0684 209.559 42.2559 210.977 42.1913 211.683Z" fill="#2F2E41"></path><path d="M38.0735 211.515L40.1356 211.595C40.1291 210.97 40.3489 209.821 39.9869 209.196C39.9071 209.059 39.7927 208.947 39.6559 208.872C39.5192 208.798 39.3653 208.763 39.2112 208.773C38.9996 208.75 38.7868 208.805 38.61 208.928C37.9507 209.385 38.1382 210.802 38.0735 211.515Z" fill="#2F2E41"></path></g><defs><filter id="filter0_d_22_367" x="0" y="0" width="439" height="498" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_22_367"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_22_367" result="shape"></feBlend></filter><clipPath id="clip0_22_367"><rect width="431" height="490" fill="white" transform="translate(4)"></rect></clipPath></defs></svg>`;
});
const GirlOne = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div data-svelte-h="svelte-1ivkqcm"><svg xmlns="http://www.w3.org/2000/svg" width="268" height="255" fill="none"><g clip-path="url(#a)"><path fill="#80FFDB" d="M82.76 187.062H49.19c-.847 0-1.536-.671-1.536-1.496s.689-1.495 1.535-1.495h33.57c.847 0 1.535.67 1.535 1.495 0 .825-.688 1.496-1.535 1.496Z"></path><path fill="#3F3D56" d="M22.805 195.068a.49.49 0 0 0 .497.485h85.344a.49.49 0 0 0 .498-.485.49.49 0 0 0-.498-.484H23.302a.49.49 0 0 0-.497.484Z"></path><path fill="#FF66B3" d="M202.868 97.46c14.998 0 27.155-11.847 27.155-26.462 0-14.614-12.157-26.46-27.155-26.46-14.997 0-27.154 11.846-27.154 26.46s12.157 26.462 27.154 26.462Z"></path><path fill="#3F3D56" d="M0 228.505a.49.49 0 0 0 .497.485H218.69a.49.49 0 0 0 .497-.485.489.489 0 0 0-.497-.484H.497a.489.489 0 0 0-.497.484ZM3.156 195.79l-.698-.745 68.122-60.574 24.543 10.721 26.503-44.289 21.775-10.228 20.175 32.766c10.892-27.478 38.208-56.227 70.94-85.394l.805.635c-30.699 28.64-56.965 57.412-71.872 86.516l-18.661-30.397c-.881-1.436-2.734-1.99-4.291-1.284-11.902 5.396-21.83 14.205-28.456 25.249l-16.601 27.67-3.79-1.655c-12.674-5.536-27.511-3.216-37.771 5.907L3.156 195.79Z"></path><path fill="#3F3D56" d="m236.052 43.562-1.034.07-1.669-3.525-3.737-.74-.145-1 6.159-.853.426 6.047Z"></path><path fill="#FFB6B6" d="m129.792 65.127 3.662-13.718 14.265-.669 4.269 18.91-22.196-4.523Z"></path><path fill="#000" d="m129.792 65.127 3.662-13.718 14.265-.669 4.269 18.91-22.196-4.523Z" opacity=".1"></path><path fill="#FFB6B6" d="M139.179 59.086c9.51 0 17.219-7.512 17.219-16.779s-7.709-16.779-17.219-16.779c-9.509 0-17.218 7.512-17.218 16.779s7.709 16.779 17.218 16.779Z"></path><path fill="#2F2E41" d="M148.679 45.859s-6.541-12.63-14.205-11.9c-7.664.729-11.701 1.615-11.701 1.615s-2.275-9.836 8.435-13.62c0 0-13.618-13.08 2.596-19.498 16.214-6.417 25.286 1.767 25.286 1.767s12.002 11.676-3.114 20.402c0 0 11.224 14.712-2.365 26.838 0 0 3.04-9.813-.132-8.003-3.171 1.81-4.8 2.399-4.8 2.399ZM120.181 134.508l-2.29 2.14-16.547 34.572-1.81 57.185h27.8l13.04-28.319 8.787 28.046h24.996l5.795-50.911-15.577-36.006-44.194-6.707Z"></path><path fill="#E6E6E6" d="M148.98 63.733h-18.566l-20.194 10.59 4.709 20.473s-1.087 12.355 1.449 21.533c2.535 9.178 1.449 21.18 1.449 21.18l46.548 3.706 1.449-41.653-.724-27.887-16.12-7.942Z"></path><path fill="#E6E6E6" d="M113.299 74.5s-11.23.352-13.041 7.412-3.26 43.419-3.26 43.419 1.086 21.574 13.222 11.316c12.135-10.257 11.048-41.321 11.048-41.321l-7.969-20.827Z"></path><path fill="#fff" d="M222.219 254.593h-66.177c-2.241 0-4.065-1.777-4.065-3.961v-66.665c0-2.184 1.824-3.961 4.065-3.961h66.177c2.242 0 4.065 1.777 4.065 3.961v66.665c0 2.184-1.823 3.961-4.065 3.961Z"></path><path fill="#3F3D56" d="M222.219 255h-66.177c-2.472 0-4.483-1.959-4.483-4.368v-66.665c0-2.408 2.011-4.368 4.483-4.368h66.177c2.472 0 4.483 1.96 4.483 4.368v66.665c0 2.409-2.011 4.368-4.483 4.368Zm-66.177-74.587c-2.011 0-3.647 1.595-3.647 3.554v66.665c0 1.96 1.636 3.554 3.647 3.554h66.177c2.011 0 3.647-1.594 3.647-3.554v-66.665c0-1.959-1.636-3.554-3.647-3.554h-66.177Z"></path><path class="chart" fill="#80FFDB" d="M191.742 237.079h-5.454c-.664 0-1.205-.406-1.205-.905V213.29c0-.499.541-.906 1.205-.906h5.454c.664 0 1.204.407 1.204.906v22.884c0 .499-.54.905-1.204.905ZM173.71 223.594c-.537 0-.973.328-.973.732v11.822c0 .404.436.732.973.732h5.454c.536 0 .973-.328.973-.732v-11.822c0-.404-.437-.732-.973-.732h-5.454ZM204.32 237.079h-5.454c-.664 0-1.204-.406-1.204-.905v-37.502c0-.5.54-.906 1.204-.906h5.454c.664 0 1.205.406 1.205.906v37.502c0 .499-.541.905-1.205.905ZM86.947 72.695h-6.23c-.76 0-1.376-.464-1.376-1.034V45.52c0-.57.617-1.034 1.375-1.034h6.23c.76 0 1.376.464 1.376 1.035V71.66c0 .57-.617 1.034-1.375 1.034ZM66.348 57.291c-.612 0-1.111.376-1.111.836v13.505c0 .46.499.836 1.111.836h6.23c.614 0 1.112-.376 1.112-.836V58.127c0-.46-.498-.836-1.111-.836h-6.23ZM101.315 72.695h-6.23c-.76 0-1.376-.464-1.376-1.034V28.823c0-.57.617-1.035 1.375-1.035h6.231c.758 0 1.375.465 1.375 1.035v42.838c0 .57-.617 1.034-1.375 1.034Z"></path><path fill="#FFB6B6" d="M178.985 189.706c3.227-.301 5.449-4.551 4.964-9.493a12.2 12.2 0 0 0-1.895-5.569l-.622-5.595.096-.028 1.563-26.525c.364-6.168-2.142-12.228-6.969-16.233-2.871-2.382-5.934-3.588-7.904-.578-3.269 4.995.965 25.584 3.745 37.29l1.078 12.509a12.133 12.133 0 0 0-.777 5.82c.485 4.941 3.494 8.703 6.721 8.402Z"></path><path fill="#E6E6E6" d="M161.115 72.381s9.419-3.53 13.766 7.06c4.347 10.59 9.056 62.833 9.056 62.833l-22.097-3.883-.725-66.01ZM31.788 67.201H19.106c-.846 0-1.535-.67-1.535-1.495 0-.825.689-1.496 1.535-1.496h12.682c.847 0 1.535.671 1.535 1.496s-.688 1.495-1.535 1.495ZM31.788 46H19.106c-.846 0-1.535-.67-1.535-1.495 0-.825.689-1.496 1.535-1.496h12.682c.847 0 1.535.67 1.535 1.496 0 .824-.688 1.495-1.535 1.495ZM31.788 30.711H19.106c-.846 0-1.535-.67-1.535-1.496 0-.824.689-1.495 1.535-1.495h12.682c.847 0 1.535.67 1.535 1.495 0 .825-.688 1.496-1.535 1.496Z"></path><path fill="#3F3D56" d="M17.063 72.77a.49.49 0 0 0 .497.484h85.344a.49.49 0 0 0 .498-.485.49.49 0 0 0-.498-.484H17.56a.49.49 0 0 0-.497.484ZM181.661 198.154a.49.49 0 0 0 .497.485h85.345a.49.49 0 0 0 .497-.485.49.49 0 0 0-.497-.484h-85.345a.49.49 0 0 0-.497.484ZM156.595 237.642a.49.49 0 0 0 .497.485h85.345a.49.49 0 0 0 .497-.485.49.49 0 0 0-.497-.484h-85.345a.49.49 0 0 0-.497.484Z"></path><path fill="#FFB6B6" d="M99.205 70.32c-3.227.302-5.45 4.55-4.964 9.494a12.208 12.208 0 0 0 1.895 5.569l.622 5.594-.096.028L95.1 117.53c-.364 6.168 2.142 12.228 6.969 16.233 2.871 2.383 5.934 3.589 7.904.579 3.269-4.995-.965-25.585-3.745-37.29l-1.078-12.51a12.13 12.13 0 0 0 .777-5.82c-.485-4.941-3.494-8.703-6.721-8.402Z"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h268v255H0z"></path></clipPath></defs></svg></div>`;
});
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("rounded-lg border bg-card text-card-foreground shadow-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("p-6 pt-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-1.5 p-6", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "tag"]);
  let { class: className = void 0 } = $$props;
  let { tag = "h3" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        {
          class: escape_attribute_value(cn("text-lg font-semibold leading-none tracking-tight", className))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const PricingCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card.Root").$$render(
    $$result,
    {
      class: "shadow-accent hover:shadow-primary shadow-xl"
    },
    {},
    {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `${slots.title ? slots.title({}) : `Missing Title`}`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${slots.content ? slots.content({}) : `Missing Content`}`;
          }
        })}`;
      }
    }
  )}`;
});
const Accordion_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = slide } = $$props;
  let { transitionConfig = { duration: 200 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Accordion_content$1, "AccordionPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("overflow-hidden text-sm transition-all", className)
      },
      { transition },
      { transitionConfig },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<div class="pb-4 pt-0">${slots.default ? slots.default({}) : ``}</div>`;
      }
    }
  )}`;
});
const Accordion_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${validate_component(Accordion_item$1, "AccordionPrimitive.Item").$$render($$result, Object.assign({}, { value }, { class: cn("border-b", className) }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Accordion_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "level"]);
  let { class: className = void 0 } = $$props;
  let { level = 3 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.level === void 0 && $$bindings.level && level !== void 0)
    $$bindings.level(level);
  return `${validate_component(Accordion_header, "AccordionPrimitive.Header").$$render($$result, { level, class: "flex" }, {}, {
    default: () => {
      return `${validate_component(Accordion_trigger$1, "AccordionPrimitive.Trigger").$$render(
        $$result,
        Object.assign(
          {},
          {
            class: cn("flex flex-1  items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className)
          },
          $$restProps
        ),
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``} ${validate_component(ChevronDown, "ChevronDown").$$render(
              $$result,
              {
                class: "h-4 w-4 transition-transform duration-200"
              },
              {},
              {}
            )}`;
          }
        }
      )}`;
    }
  })}`;
});
const Root = Accordion;
const Faqs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Root, "Accordion.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Accordion_item, "Accordion.Item").$$render(
        $$result,
        {
          class: "border-2 border-black shadow-xl ",
          value: "item-1"
        },
        {},
        {
          default: () => {
            return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render(
              $$result,
              {
                class: "border-none bg-primary text-white "
              },
              {},
              {
                default: () => {
                  return `Is it accessible?`;
                }
              }
            )} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
              default: () => {
                return `Yes. It adheres to the WAI-ARIA design pattern.`;
              }
            })}`;
          }
        }
      )} ${validate_component(Accordion_item, "Accordion.Item").$$render(
        $$result,
        {
          class: "border-2 border-black my-2 shadow-xl ",
          value: "item-2"
        },
        {},
        {
          default: () => {
            return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "border-none" }, {}, {
              default: () => {
                return `Is it accessible?`;
              }
            })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
              default: () => {
                return `Yes. It adheres to the WAI-ARIA design pattern.`;
              }
            })}`;
          }
        }
      )} ${validate_component(Accordion_item, "Accordion.Item").$$render(
        $$result,
        {
          class: "border-2 border-black shadow-xl",
          value: "item-3"
        },
        {},
        {
          default: () => {
            return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "border-none" }, {}, {
              default: () => {
                return `Is it accessible?`;
              }
            })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
              default: () => {
                return `Yes. It adheres to the WAI-ARIA design pattern.`;
              }
            })}`;
          }
        }
      )}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-n76hpb_START -->${$$result.title = `<title>${escape(siteTitle)}</title>`, ""}<meta data-key="description" name="description"${add_attribute("content", siteDescription, 0)}><meta property="og:type" content="article"><meta property="og:title"${add_attribute("content", siteTitle, 0)}><meta name="twitter:title"${add_attribute("content", siteTitle, 0)}><meta property="og:description"${add_attribute("content", siteDescription, 0)}><meta name="twitter:description"${add_attribute("content", siteDescription, 0)}><!-- HEAD_svelte-n76hpb_END -->`, ""} <section class="relative"><div class="bg-primary lg:p-10 md:grid md:grid-cols-2"><div class="bg-white place-self-center rounded-lg p-5 w-fit"><h1 class="text-2xl md:text-5xl">${escape(siteTitle)}</h1> <p class="max-w-prose" data-svelte-h="svelte-9v2p25">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur exercitationem sint quia
				incidunt nulla recusandae? Blanditiis nam omnis, hic accusantium voluptas in non eos odit
				tempore odio autem ex expedita.</p></div> <div class="place-self-center" data-svelte-h="svelte-14ez2kq">[Video will go here]</div></div> <img src="/images/tri1.svg" alt="" class="relative -top-[1px]"></section> <section class="lg:grid lg:grid-cols-3 lg:py-10"><div class="place-self-center" data-svelte-h="svelte-2ptniz"><h2 class="lg:text-2xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2> <p class="max-w-prose">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsa ratione, illo, quod quia
			dolorem, sapiente blanditiis cum accusamus soluta illum libero ad temporibus alias explicabo
			veritatis repellat deleniti voluptatibus.</p></div> <div class="h-full w-full lg:col-span-2 rounded-md flex justify-center bg-primary">${validate_component(GuyOne, "GuyOne").$$render($$result, {}, {}, {})}</div></section> <section class="lg:grid lg:grid-cols-2 bg-primary lg:p-5"><div class="flex justify-center">${validate_component(GirlOne, "GirlOne").$$render($$result, {}, {}, {})}</div> <div class="place-self-center flex flex-col items-center bg-white rounded-md w-full lg:p-10" data-svelte-h="svelte-4xupjw"><h2>Lorem Ipsum</h2> <ul class="flex gap-5"><li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li></ul></div></section> <section class="grid p-5 lg:p-10 lg:grid-cols-3 gap-5 lg:gap-10">${validate_component(PricingCard, "PricingCard").$$render($$result, {}, {}, {
    content: () => {
      return `<ul slot="content" data-svelte-h="svelte-f1zdhq"><li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li></ul>`;
    },
    title: () => {
      return `<h2 slot="title" data-svelte-h="svelte-p9qm69">Hello</h2>`;
    }
  })} ${validate_component(PricingCard, "PricingCard").$$render($$result, {}, {}, {
    content: () => {
      return `<ul slot="content" data-svelte-h="svelte-f1zdhq"><li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li></ul>`;
    },
    title: () => {
      return `<h2 slot="title" data-svelte-h="svelte-p9qm69">Hello</h2>`;
    }
  })} ${validate_component(PricingCard, "PricingCard").$$render($$result, {}, {}, {
    content: () => {
      return `<ul slot="content" data-svelte-h="svelte-f1zdhq"><li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li></ul>`;
    },
    title: () => {
      return `<h2 slot="title" data-svelte-h="svelte-p9qm69">Hello</h2>`;
    }
  })}</section> <section><div data-svelte-h="svelte-nq1ku6"><h2 class="text-2xl text-center uppercase">Faq&#39;s</h2></div> <div class="w-1/2 pb-5 mx-auto">${validate_component(Faqs, "Faqs").$$render($$result, {}, {}, {})}</div></section>`;
});
export {
  Page as default
};
