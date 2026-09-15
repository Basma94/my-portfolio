/* @ds-bundle: {"format":4,"namespace":"DesignSystem_e0e94d","components":[{"name":"Eyebrow","sourcePath":"components/brand/Eyebrow.jsx"},{"name":"GradientHeading","sourcePath":"components/brand/GradientHeading.jsx"},{"name":"Icon","sourcePath":"components/brand/Icon.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"LogoType","sourcePath":"components/brand/LogoType.jsx"},{"name":"ServiceCard","sourcePath":"components/brand/ServiceCard.jsx"},{"name":"StatTile","sourcePath":"components/brand/StatTile.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Dialog","sourcePath":"components/core/Dialog.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Tooltip","sourcePath":"components/core/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"components/brand/Eyebrow.jsx":"fc79aa3e09fb","components/brand/GradientHeading.jsx":"dbdcfedcea41","components/brand/Icon.jsx":"dd8370983b51","components/brand/Logo.jsx":"e4e30ed8d28d","components/brand/LogoType.jsx":"28b6f0be0225","components/brand/ServiceCard.jsx":"311b51f36e7a","components/brand/StatTile.jsx":"a182e70b6410","components/core/Badge.jsx":"8924ee4c3292","components/core/Button.jsx":"c94eb25dcf78","components/core/Card.jsx":"7da889eadad5","components/core/Dialog.jsx":"426c6b37cb78","components/core/IconButton.jsx":"c784895939d7","components/core/Tabs.jsx":"1a400953c50c","components/core/Tag.jsx":"bd6ea147b9b9","components/core/Tooltip.jsx":"582a2403d8a6","components/forms/Checkbox.jsx":"c3b7a1e7f011","components/forms/Input.jsx":"fd5c4893d47a","components/forms/Radio.jsx":"1994be6fa3be","components/forms/Select.jsx":"838edf466a15","components/forms/Switch.jsx":"8917acdf05c9","components/forms/Textarea.jsx":"cf07282525dc","ui_kits/website/ContactScreen.jsx":"c492ea07f7e3","ui_kits/website/HomeScreen.jsx":"45e2242259c2","ui_kits/website/InsightsScreen.jsx":"3d26f74fd386","ui_kits/website/ServicesScreen.jsx":"19e281ada153","ui_kits/website/SiteChrome.jsx":"4afa6a025b1d"},"inlinedExternals":[],"unexposedExports":[{"name":"iconNames","sourcePath":"components/brand/Icon.jsx"}]} */

(() => {

const __ds_ns = (window.DesignSystem_e0e94d = window.DesignSystem_e0e94d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Wide-tracked uppercase label that sits above headlines. */
function Eyebrow({
  children,
  tone = 'muted',
  as: Tag = 'div',
  style,
  ...rest
}) {
  const color = tone === 'brand' ? 'var(--brand-secondary)' : tone === 'inverse' ? 'rgba(255,255,255,.82)' : 'var(--text-muted)';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      font: `var(--fw-medium) var(--fs-caption)/1.2 var(--font-core)`,
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/GradientHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  display1: {
    fontSize: 'var(--fs-display-1)',
    lineHeight: 'var(--lh-tight)'
  },
  display2: {
    fontSize: 'var(--fs-display-2)',
    lineHeight: 'var(--lh-tight)'
  },
  h1: {
    fontSize: 'var(--fs-h1)',
    lineHeight: 'var(--lh-snug)'
  },
  h2: {
    fontSize: 'var(--fs-h2)',
    lineHeight: 'var(--lh-snug)'
  }
};

/** Headline where a trailing phrase carries the blue→violet brand gradient. */
function GradientHeading({
  children,
  accent,
  size = 'display2',
  as: Tag = 'h2',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: 'var(--font-core)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-heading)',
      margin: 0,
      textWrap: 'balance',
      ...SIZES[size],
      ...style
    }
  }, rest), children, accent ? /*#__PURE__*/React.createElement(React.Fragment, null, ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      backgroundImage: 'var(--gradient-headline)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }
  }, accent)) : null);
}
Object.assign(__ds_scope, { GradientHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/GradientHeading.jsx", error: String((e && e.message) || e) }); }

// components/brand/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Mingloo icon set — Lucide (ISC), 24x24, 2px stroke, round caps.
   Vendored inline so icons render offline and inherit currentColor. */
const PATHS = {
  'chart-column': "<line x1=\"12\" x2=\"12\" y1=\"20\" y2=\"10\" /> <line x1=\"18\" x2=\"18\" y1=\"20\" y2=\"4\" /> <line x1=\"6\" x2=\"6\" y1=\"20\" y2=\"16\" />",
  'settings': "<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" />",
  'network': "<rect x=\"16\" y=\"16\" width=\"6\" height=\"6\" rx=\"1\" /> <rect x=\"2\" y=\"16\" width=\"6\" height=\"6\" rx=\"1\" /> <rect x=\"9\" y=\"2\" width=\"6\" height=\"6\" rx=\"1\" /> <path d=\"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3\" /> <path d=\"M12 12V8\" />",
  'leaf': "<path d=\"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z\" /> <path d=\"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\" />",
  'target': "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <circle cx=\"12\" cy=\"12\" r=\"6\" /> <circle cx=\"12\" cy=\"12\" r=\"2\" />",
  'users': "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <circle cx=\"9\" cy=\"7\" r=\"4\" /> <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" /> <path d=\"M16 3.13a4 4 0 0 1 0 7.75\" />",
  'compass': "<path d=\"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z\" /> <circle cx=\"12\" cy=\"12\" r=\"10\" />",
  'sparkles': "<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\" /> <path d=\"M20 3v4\" /> <path d=\"M22 5h-4\" /> <path d=\"M4 17v2\" /> <path d=\"M5 18H3\" />",
  'arrow-right': "<path d=\"M5 12h14\" /> <path d=\"m12 5 7 7-7 7\" />",
  'arrow-up-right': "<path d=\"M7 7h10v10\" /> <path d=\"M7 17 17 7\" />",
  'check': "<path d=\"M20 6 9 17l-5-5\" />",
  'x': "<path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" />",
  'chevron-down': "<path d=\"m6 9 6 6 6-6\" />",
  'chevron-right': "<path d=\"m9 18 6-6-6-6\" />",
  'mail': "<rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\" /> <path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\" />",
  'phone': "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\" />",
  'search': "<circle cx=\"11\" cy=\"11\" r=\"8\" /> <path d=\"m21 21-4.3-4.3\" />",
  'download': "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /> <polyline points=\"7 10 12 15 17 10\" /> <line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\" />",
  'menu': "<line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\" /> <line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\" /> <line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\" />",
  'more-horizontal': "<circle cx=\"12\" cy=\"12\" r=\"1\" /> <circle cx=\"19\" cy=\"12\" r=\"1\" /> <circle cx=\"5\" cy=\"12\" r=\"1\" />",
  'trending-up': "<polyline points=\"22 7 13.5 15.5 8.5 10.5 2 17\" /> <polyline points=\"16 7 22 7 22 13\" />",
  'brain': "<path d=\"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z\" /> <path d=\"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z\" /> <path d=\"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4\" /> <path d=\"M17.599 6.5a3 3 0 0 0 .399-1.375\" /> <path d=\"M6.003 5.125A3 3 0 0 0 6.401 6.5\" /> <path d=\"M3.477 10.896a4 4 0 0 1 .585-.396\" /> <path d=\"M19.938 10.5a4 4 0 0 1 .585.396\" /> <path d=\"M6 18a4 4 0 0 1-1.967-.516\" /> <path d=\"M19.967 17.484A4 4 0 0 1 18 18\" />",
  'database': "<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" /> <path d=\"M3 5V19A9 3 0 0 0 21 19V5\" /> <path d=\"M3 12A9 3 0 0 0 21 12\" />",
  'shield-check': "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /> <path d=\"m9 12 2 2 4-4\" />",
  'lightbulb': "<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\" /> <path d=\"M9 18h6\" /> <path d=\"M10 22h4\" />",
  'globe': "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /> <path d=\"M2 12h20\" />",
  'quote': "<path d=\"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\" /> <path d=\"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\" />",
  'play': "<polygon points=\"6 3 20 12 6 21 6 3\" />",
  'linkedin': "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\" /> <rect width=\"4\" height=\"12\" x=\"2\" y=\"9\" /> <circle cx=\"4\" cy=\"4\" r=\"2\" />",
  'calendar': "<path d=\"M8 2v4\" /> <path d=\"M16 2v4\" /> <rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" /> <path d=\"M3 10h18\" />",
  'map-pin': "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" /> <circle cx=\"12\" cy=\"10\" r=\"3\" />",
  'plus': "<path d=\"M5 12h14\" /> <path d=\"M12 5v14\" />",
  'star': "<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\" />",
  'clock': "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <polyline points=\"12 6 12 12 16 14\" />",
  'file-text': "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M10 9H8\" /> <path d=\"M16 13H8\" /> <path d=\"M16 17H8\" />",
  'layers': "<path d=\"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z\" /> <path d=\"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65\" /> <path d=\"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65\" />",
  'zap': "<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\" />",
  'circle-check': "<path d=\"M21.801 10A10 10 0 1 1 17 3.335\" /> <path d=\"m9 11 3 3L22 4\" />"
};

/** Minimal line icon from the vendored Lucide set. Inherits currentColor. */
function Icon({
  name = 'sparkles',
  size = 20,
  strokeWidth = 2,
  color,
  style,
  ...rest
}) {
  const inner = PATHS[name] || PATHS.sparkles;
  return /*#__PURE__*/React.createElement("svg", _extends({
    role: "img",
    "aria-label": name,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color || 'currentColor',
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flex: '0 0 auto',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: inner
    }
  }, rest));
}

/** Every available icon name, in declaration order. */
const iconNames = Object.keys(PATHS);
Object.assign(__ds_scope, { Icon, iconNames });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SRC = {
  lockup: 'assets/logo-lockup.png',
  mark: 'assets/logo-mark.png',
  wordmark: 'assets/wordmark.png'
};
const RATIO = {
  lockup: 705 / 555,
  mark: 1062 / 552,
  wordmark: 630 / 255
};

/** The Mingloo Consulting logo. Always use the supplied artwork — never redraw it. */
function Logo({
  variant = 'lockup',
  height = 48,
  assetBase = '',
  chip = false,
  style,
  ...rest
}) {
  const base = assetBase ? assetBase.replace(/\/$/, '') + '/' : '';
  const img = /*#__PURE__*/React.createElement("img", _extends({
    src: base + SRC[variant],
    alt: "Mingloo Consulting",
    style: {
      height,
      width: height * RATIO[variant],
      objectFit: 'contain',
      display: 'block',
      ...(chip ? null : style)
    }
  }, chip ? null : rest));
  if (!chip) return img;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      padding: 'var(--space-4)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--white)',
      boxShadow: 'var(--shadow-md)',
      ...style
    }
  }, rest), img);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/LogoType.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Wordmark set as live Poppins — the correct brand treatment on dark or gradient grounds. */
function LogoType({
  size = 34,
  tone = 'inverse',
  showConsulting = true,
  style,
  ...rest
}) {
  const color = tone === 'inverse' ? 'var(--text-inverse)' : 'var(--text-heading)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-block',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: `var(--fw-bold) ${size}px/1 var(--font-core)`,
      letterSpacing: 'var(--ls-display)',
      color
    }
  }, "Mingloo"), showConsulting ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: Math.round(size * 0.22),
      font: `var(--fw-regular) ${Math.max(9, Math.round(size * 0.33))}px/1 var(--font-core)`,
      letterSpacing: 'var(--ls-wordmark)',
      color: tone === 'inverse' ? 'rgba(255,255,255,.78)' : 'var(--ink-600)'
    }
  }, "CONSULTING") : null);
}
Object.assign(__ds_scope, { LogoType });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/LogoType.jsx", error: String((e && e.message) || e) }); }

// components/brand/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TINTS = {
  teal: ['var(--surface-tint-teal)', 'var(--teal-600)'],
  violet: ['var(--surface-tint-violet)', 'var(--violet-500)'],
  indigo: ['var(--surface-tint-indigo)', 'var(--indigo-500)'],
  pink: ['var(--surface-tint-pink)', 'var(--pink-500)'],
  blue: ['var(--info-50)', 'var(--blue-500)']
};

/** Capability tile: tinted rounded-square icon chip above a short label. */
function ServiceCard({
  icon = 'sparkles',
  title,
  description,
  tint = 'indigo',
  href,
  style,
  ...rest
}) {
  const [bg, fg] = TINTS[tint] || TINTS.indigo;
  const Tag = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: {
      display: 'block',
      textDecoration: 'none',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: 'var(--radius-md)',
      background: bg,
      display: 'grid',
      placeItems: 'center',
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 26,
    color: fg
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-semibold) var(--fs-body-lg)/1.35 var(--font-core)',
      color: 'var(--text-heading)',
      letterSpacing: 'var(--ls-heading)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'var(--space-2) 0 0',
      font: 'var(--fw-regular) var(--fs-body-sm)/var(--lh-relaxed) var(--font-core)',
      color: 'var(--text-muted)'
    }
  }, description) : null);
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/brand/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small glassy metric chip, as used on the hero's floating dashboard. */
function StatTile({
  label,
  value,
  delta,
  glass = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: 'var(--space-4) var(--space-5)',
      borderRadius: 'var(--radius-md)',
      background: glass ? 'var(--glass-bg)' : 'var(--surface-card)',
      backdropFilter: glass ? 'blur(var(--glass-blur))' : undefined,
      border: `1px solid ${glass ? 'var(--glass-border)' : 'var(--border-subtle)'}`,
      boxShadow: 'var(--shadow-md)',
      minWidth: 112,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-regular) var(--fs-caption)/1.2 var(--font-core)',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-2)',
      font: 'var(--fw-semibold) var(--fs-h4)/1.1 var(--font-core)',
      color: delta === 'down' ? 'var(--danger-500)' : 'var(--brand-tertiary)',
      letterSpacing: 'var(--ls-heading)'
    }
  }, value));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  brand: ['var(--surface-tint-teal)', 'var(--teal-600)'],
  violet: ['var(--surface-tint-violet)', 'var(--violet-600)'],
  indigo: ['var(--surface-tint-indigo)', 'var(--indigo-600)'],
  pink: ['var(--surface-tint-pink)', 'var(--pink-500)'],
  success: ['var(--success-50)', 'var(--success-500)'],
  warning: ['var(--warning-50)', '#B26A00'],
  danger: ['var(--danger-50)', 'var(--danger-500)'],
  neutral: ['var(--surface-subtle)', 'var(--text-muted)']
};

/** Small status pill. */
function Badge({
  children,
  tone = 'indigo',
  style,
  ...rest
}) {
  const [bg, fg] = TONES[tone] || TONES.indigo;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      height: 24,
      padding: '0 10px',
      borderRadius: 'var(--radius-pill)',
      background: bg,
      color: fg,
      font: 'var(--fw-medium) var(--fs-micro)/1 var(--font-core)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 36,
    padding: '0 18px',
    fontSize: 'var(--fs-body-sm)',
    gap: 8,
    icon: 16
  },
  md: {
    height: 46,
    padding: '0 26px',
    fontSize: 'var(--fs-body)',
    gap: 10,
    icon: 18
  },
  lg: {
    height: 56,
    padding: '0 34px',
    fontSize: 'var(--fs-body-lg)',
    gap: 12,
    icon: 20
  }
};
function skin(variant) {
  switch (variant) {
    case 'secondary':
      return {
        background: 'var(--surface-card)',
        color: 'var(--text-heading)',
        border: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-xs)'
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--text-link)',
        border: '1px solid transparent'
      };
    case 'tinted':
      return {
        background: 'var(--surface-tint-indigo)',
        color: 'var(--indigo-600)',
        border: '1px solid transparent'
      };
    case 'dark':
      return {
        background: 'var(--surface-inverse)',
        color: 'var(--text-inverse)',
        border: '1px solid transparent',
        boxShadow: 'var(--shadow-md)'
      };
    default:
      return {
        background: 'var(--gradient-cta)',
        color: 'var(--text-inverse)',
        border: '1px solid transparent',
        boxShadow: 'var(--shadow-cta)'
      };
  }
}

/** Pill-shaped action. Primary carries the teal→blue brand gradient. */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'end',
  disabled,
  fullWidth,
  as,
  href,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const Tag = as || (href ? 'a' : 'button');
  const glyph = icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }) : null;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: Tag === 'button' ? disabled : undefined,
    "aria-disabled": disabled || undefined,
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-core)',
      fontWeight: 'var(--fw-medium)',
      fontSize: s.fontSize,
      letterSpacing: 'var(--ls-body)',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)',
      ...skin(variant),
      ...style
    }
  }, rest), iconPosition === 'start' ? glyph : null, children, iconPosition === 'end' ? glyph : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The brand's surface container: 20px radius, hairline border, soft cool shadow. */
function Card({
  children,
  variant = 'default',
  padding = 'var(--space-6)',
  style,
  ...rest
}) {
  const skin = variant === 'raised' ? {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-lg)'
  } : variant === 'glass' ? {
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    border: '1px solid var(--glass-border)',
    boxShadow: 'var(--shadow-md)'
  } : variant === 'tint' ? {
    background: 'var(--gradient-wash)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'none'
  } : variant === 'inverse' ? {
    background: 'var(--gradient-deep)',
    border: '1px solid transparent',
    color: 'var(--text-inverse)',
    boxShadow: 'var(--shadow-xl)'
  } : {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-sm)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: 'var(--radius-lg)',
      padding,
      ...skin,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 32,
  md: 40,
  lg: 48
};

/** Square-ish icon-only control for toolbars, cards and dialog dismissals. */
function IconButton({
  icon = 'x',
  label,
  size = 'md',
  variant = 'plain',
  disabled,
  style,
  ...rest
}) {
  const d = SIZES[size] || SIZES.md;
  const skin = variant === 'filled' ? {
    background: 'var(--surface-subtle)',
    color: 'var(--text-heading)',
    border: '1px solid transparent'
  } : variant === 'outline' ? {
    background: 'var(--surface-card)',
    color: 'var(--text-body)',
    border: '1px solid var(--border-default)'
  } : {
    background: 'transparent',
    color: 'var(--text-muted)',
    border: '1px solid transparent'
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label || icon,
    disabled: disabled,
    style: {
      width: d,
      height: d,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)',
      ...skin,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 16 : size === 'lg' ? 22 : 18
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Centred modal on a navy scrim. */
function Dialog({
  open = true,
  title,
  description,
  children,
  footer,
  onClose,
  width = 520,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(18,18,58,.42)',
      backdropFilter: 'blur(4px)',
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--space-6)',
      zIndex: 50
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-xl)',
      padding: 'var(--space-8)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: 'var(--fw-semibold) var(--fs-h3)/1.25 var(--font-core)',
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--text-heading)'
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'var(--space-2) 0 0',
      font: 'var(--fw-regular) var(--fs-body-sm)/var(--lh-relaxed) var(--font-core)',
      color: 'var(--text-muted)'
    }
  }, description) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    onClick: onClose
  }) : null), children ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)'
    }
  }, children) : null, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-8)',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--space-3)'
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Underline tab bar. Controlled via value/onChange, or self-managed. */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id);
  const active = value ?? internal;
  const select = id => {
    setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      borderBottom: '1px solid var(--border-subtle)',
      ...style
    }
  }, rest), items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => select(it.id),
      style: {
        position: 'relative',
        padding: '0 0 14px',
        background: 'transparent',
        cursor: 'pointer',
        font: `${on ? 'var(--fw-semibold)' : 'var(--fw-regular)'} var(--fs-body)/1 var(--font-core)`,
        color: on ? 'var(--text-heading)' : 'var(--text-muted)',
        transition: 'color var(--dur-base) var(--ease-standard)'
      }
    }, it.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        borderRadius: 2,
        background: on ? 'var(--gradient-brand)' : 'transparent'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Sentence-case chip, optionally removable — used for filters and topics. */
function Tag({
  children,
  onRemove,
  selected = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      height: 32,
      padding: onRemove ? '0 8px 0 14px' : '0 14px',
      borderRadius: 'var(--radius-pill)',
      background: selected ? 'var(--surface-tint-indigo)' : 'var(--surface-card)',
      border: `1px solid ${selected ? 'var(--indigo-400)' : 'var(--border-default)'}`,
      color: selected ? 'var(--indigo-600)' : 'var(--text-body)',
      font: 'var(--fw-regular) var(--fs-body-sm)/1 var(--font-core)',
      ...style
    }
  }, rest), children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-pill)',
      background: 'transparent',
      color: 'inherit',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Dark navy tooltip shown on hover/focus of its child. */
function Tooltip({
  label,
  placement = 'top',
  children,
  style,
  ...rest
}) {
  const [on, setOn] = React.useState(false);
  const pos = placement === 'bottom' ? {
    top: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)'
  } : {
    bottom: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setOn(true),
    onMouseLeave: () => setOn(false),
    onFocus: () => setOn(true),
    onBlur: () => setOn(false)
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      ...pos,
      padding: '6px 10px',
      borderRadius: 'var(--radius-xs)',
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      font: 'var(--fw-regular) var(--fs-micro)/1.35 var(--font-core)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      opacity: on ? 1 : 0,
      transition: 'opacity var(--dur-fast) var(--ease-standard)',
      pointerEvents: 'none',
      ...style
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with brand-gradient checked state. */
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = checked ?? internal;
  const toggle = () => {
    if (disabled) return;
    setInternal(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    },
    onClick: toggle
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: '0 0 auto',
      marginTop: 1,
      borderRadius: 'var(--radius-xs)',
      display: 'grid',
      placeItems: 'center',
      background: on ? 'var(--gradient-brand)' : 'var(--surface-card)',
      border: `1px solid ${on ? 'transparent' : 'var(--border-strong)'}`,
      color: 'var(--text-inverse)',
      transition: 'background var(--dur-fast) var(--ease-standard)'
    }
  }, on ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14
  }) : null), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--fw-regular) var(--fs-body-sm)/1.45 var(--font-core)',
      color: 'var(--text-heading)'
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 2,
      font: 'var(--fw-regular) var(--fs-caption)/1.5 var(--font-core)',
      color: 'var(--text-faint)'
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  error,
  required,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      font: 'var(--fw-regular) var(--fs-body-sm)/1.4 var(--font-core)'
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 'var(--space-2)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-heading)'
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand-accent)'
    }
  }, " *") : null) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 'var(--space-2)',
      color: 'var(--danger-500)',
      fontSize: 'var(--fs-caption)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 'var(--space-2)',
      color: 'var(--text-faint)',
      fontSize: 'var(--fs-caption)'
    }
  }, hint) : null);
}

/** Single-line text field. */
function Input({
  label,
  hint,
  error,
  required,
  icon,
  size = 'md',
  disabled,
  style,
  ...rest
}) {
  const h = size === 'lg' ? 54 : size === 'sm' ? 38 : 46;
  return /*#__PURE__*/React.createElement(Field, {
    label: label,
    hint: hint,
    error: error,
    required: required
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 16,
      top: 0,
      height: h,
      display: 'grid',
      placeItems: 'center',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  })) : null, /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    style: {
      width: '100%',
      height: h,
      padding: icon ? '0 18px 0 46px' : '0 18px',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${error ? 'var(--danger-500)' : 'var(--border-default)'}`,
      background: disabled ? 'var(--surface-subtle)' : 'var(--surface-card)',
      font: 'var(--fw-regular) var(--fs-body)/1 var(--font-core)',
      color: 'var(--text-heading)',
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, rest))));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Radio group. */
function Radio({
  name,
  options = [],
  value,
  defaultValue,
  onChange,
  disabled,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const active = value ?? internal;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      ...style
    }
  }, rest), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    const on = opt.value === active;
    return /*#__PURE__*/React.createElement("label", {
      key: opt.value,
      onClick: () => {
        if (disabled) return;
        setInternal(opt.value);
        onChange && onChange(opt.value);
      },
      style: {
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        flex: '0 0 auto',
        borderRadius: 'var(--radius-pill)',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--surface-card)',
        border: `${on ? 6 : 1}px solid ${on ? 'var(--indigo-500)' : 'var(--border-strong)'}`,
        transition: 'border var(--dur-fast) var(--ease-standard)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--fw-regular) var(--fs-body-sm)/1.45 var(--font-core)',
        color: 'var(--text-heading)'
      }
    }, opt.label));
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  error,
  required,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      font: 'var(--fw-regular) var(--fs-body-sm)/1.4 var(--font-core)'
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 'var(--space-2)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-heading)'
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand-accent)'
    }
  }, " *") : null) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 'var(--space-2)',
      color: 'var(--danger-500)',
      fontSize: 'var(--fs-caption)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 'var(--space-2)',
      color: 'var(--text-faint)',
      fontSize: 'var(--fs-caption)'
    }
  }, hint) : null);
}

/** Native select styled to match Input. */
function Select({
  label,
  hint,
  error,
  required,
  options = [],
  placeholder,
  size = 'md',
  disabled,
  style,
  ...rest
}) {
  const h = size === 'lg' ? 54 : size === 'sm' ? 38 : 46;
  return /*#__PURE__*/React.createElement(Field, {
    label: label,
    hint: hint,
    error: error,
    required: required
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    disabled: disabled,
    defaultValue: placeholder ? '' : undefined,
    style: {
      width: '100%',
      height: h,
      padding: '0 44px 0 18px',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${error ? 'var(--danger-500)' : 'var(--border-default)'}`,
      background: disabled ? 'var(--surface-subtle)' : 'var(--surface-card)',
      font: 'var(--fw-regular) var(--fs-body)/1 var(--font-core)',
      color: 'var(--text-heading)',
      appearance: 'none',
      outline: 'none',
      cursor: 'pointer',
      ...style
    }
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 16,
      top: 0,
      height: h,
      display: 'grid',
      placeItems: 'center',
      color: 'var(--text-faint)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch. */
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = checked ?? internal;
  return /*#__PURE__*/React.createElement("label", _extends({
    onClick: () => {
      if (disabled) return;
      setInternal(!on);
      onChange && onChange(!on);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 24,
      borderRadius: 'var(--radius-pill)',
      padding: 3,
      background: on ? 'var(--gradient-brand)' : 'var(--border-default)',
      transition: 'background var(--dur-base) var(--ease-standard)',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--white)',
      boxShadow: 'var(--shadow-xs)',
      transform: on ? 'translateX(20px)' : 'translateX(0)',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  })), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-regular) var(--fs-body-sm)/1 var(--font-core)',
      color: 'var(--text-heading)'
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  error,
  required,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      font: 'var(--fw-regular) var(--fs-body-sm)/1.4 var(--font-core)'
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 'var(--space-2)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-heading)'
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand-accent)'
    }
  }, " *") : null) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 'var(--space-2)',
      color: 'var(--danger-500)',
      fontSize: 'var(--fs-caption)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 'var(--space-2)',
      color: 'var(--text-faint)',
      fontSize: 'var(--fs-caption)'
    }
  }, hint) : null);
}

/** Multi-line text field. */
function Textarea({
  label,
  hint,
  error,
  required,
  rows = 4,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(Field, {
    label: label,
    hint: hint,
    error: error,
    required: required
  }, /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    disabled: disabled,
    style: {
      width: '100%',
      padding: '14px 18px',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${error ? 'var(--danger-500)' : 'var(--border-default)'}`,
      background: disabled ? 'var(--surface-subtle)' : 'var(--surface-card)',
      font: 'var(--fw-regular) var(--fs-body)/var(--lh-relaxed) var(--font-core)',
      color: 'var(--text-heading)',
      resize: 'vertical',
      outline: 'none',
      ...style
    }
  }, rest)));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactScreen.jsx
try { (() => {
const {
  Eyebrow,
  GradientHeading,
  Card,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
  Icon,
  Dialog
} = window.DesignSystem_e0e94d;
function ContactScreen({
  onNavigate
}) {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(window.Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 'var(--space-16)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Contact"), /*#__PURE__*/React.createElement(GradientHeading, {
    as: "h1",
    size: "h1",
    accent: "What's Next",
    style: {
      marginTop: 'var(--space-5)'
    }
  }, "Let's Build"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-5)',
      font: 'var(--fw-regular) var(--fs-body)/var(--lh-relaxed) var(--font-core)',
      color: 'var(--text-body)'
    }
  }, "Tell us the decision you are stuck on. We will come back within two working days with a view, not a brochure."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-10)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, [['mail', 'hello@mingloo.com'], ['phone', '+44 20 7946 0112'], ['map-pin', 'London · Dubai'], ['calendar', 'Book a 30-minute call']].map(([i, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      font: 'var(--fw-regular) var(--fs-body)/1 var(--font-core)',
      color: 'var(--text-heading)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-tint-indigo)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 20,
    color: "var(--indigo-500)"
  })), l)))), /*#__PURE__*/React.createElement(Card, {
    variant: "raised",
    padding: "var(--space-10)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    placeholder: "Alex Moreau",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    placeholder: "you@company.com",
    icon: "mail",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Company",
    placeholder: "Northwind Group"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Service area",
    placeholder: "Choose one",
    options: window.PILLARS.map(p => p.title)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Textarea, {
    label: "What are you trying to solve?",
    rows: 4,
    hint: "A couple of sentences is plenty."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Send me the quarterly insight note",
    description: "Four emails a year. Unsubscribe anytime."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    icon: "arrow-right",
    onClick: () => setSent(true)
  }, "Let's Talk")))))), /*#__PURE__*/React.createElement(Dialog, {
    open: sent,
    title: "Thanks \u2014 that's with us",
    description: "We'll reply within two working days with a point of view and two or three questions.",
    onClose: () => setSent(false),
    footer: /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setSent(false);
        onNavigate('home');
      },
      icon: "arrow-right"
    }, "Back to home")
  }));
}
Object.assign(window, {
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Eyebrow,
  GradientHeading,
  ServiceCard,
  StatTile,
  Card,
  Icon,
  Badge
} = window.DesignSystem_e0e94d;
const PILLARS = [{
  icon: 'chart-column',
  tint: 'blue',
  title: 'Strategy & Advisory',
  description: 'Where to play, where to stop, and what it is worth.'
}, {
  icon: 'settings',
  tint: 'violet',
  title: 'Operational Excellence',
  description: 'Cost, process and throughput, measured end to end.'
}, {
  icon: 'network',
  tint: 'teal',
  title: 'Digital Transformation',
  description: 'Platforms, data and AI your teams actually adopt.'
}, {
  icon: 'leaf',
  tint: 'teal',
  title: 'Sustainability & ESG',
  description: 'Credible targets and reporting that holds up.'
}, {
  icon: 'target',
  tint: 'pink',
  title: 'Innovation & Growth',
  description: 'New propositions taken from idea to first revenue.'
}, {
  icon: 'users',
  tint: 'indigo',
  title: 'Change Management',
  description: 'Adoption planned as carefully as the technology.'
}];
function Hero({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--gradient-wash)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-20) var(--space-8)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-12)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Mingloo Consulting"), /*#__PURE__*/React.createElement(GradientHeading, {
    as: "h1",
    size: "display1",
    accent: "Impact",
    style: {
      marginTop: 'var(--space-5)'
    }
  }, "From Insight to"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-6)',
      maxWidth: 460,
      font: 'var(--fw-regular) var(--fs-body-lg)/var(--lh-relaxed) var(--font-core)',
      color: 'var(--text-body)'
    }
  }, "We help leadership teams turn data, AI and hard operating decisions into results they can report."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    icon: "arrow-right",
    onClick: () => onNavigate('contact')
  }, "Let's Build What's Next"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => onNavigate('insights')
  }, "See our work")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      marginTop: 'var(--space-12)',
      color: 'var(--text-muted)'
    }
  }, [['compass', 'Insight-Driven'], ['chart-column', 'Practical Solutions'], ['sparkles', 'Lasting Impact']].map(([i, l]) => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      font: 'var(--fw-regular) var(--fs-body-sm)/1 var(--font-core)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 20
  }), l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/hero-strategist.png",
    alt: "",
    style: {
      width: '100%',
      height: 520,
      objectFit: 'cover',
      objectPosition: '50% 18%',
      borderRadius: 'var(--radius-2xl)',
      boxShadow: 'var(--shadow-xl)',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -22,
      left: -28,
      display: 'flex',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Growth",
    value: "+24%",
    glass: true
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Efficiency",
    value: "+38%",
    glass: true
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "ROI",
    value: "+52%",
    glass: true
  })))));
}
function HomeScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "What we do"), /*#__PURE__*/React.createElement(GradientHeading, {
    size: "h1",
    accent: "Opportunity.",
    style: {
      marginTop: 'var(--space-4)',
      maxWidth: 560
    }
  }, "Turn Complexity into")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "arrow-right",
    onClick: () => onNavigate('services')
  }, "All services")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-12)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-6)'
    }
  }, PILLARS.map(p => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: p.title
  }, p))))), /*#__PURE__*/React.createElement(Section, {
    tint: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 'var(--space-16)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Client outcome"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 'var(--space-4)',
      font: 'var(--fw-semibold) var(--fs-h1)/var(--lh-snug) var(--font-core)',
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--text-heading)'
    }
  }, "Nine months from pilot to platform"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-5)',
      font: 'var(--fw-regular) var(--fs-body)/var(--lh-relaxed) var(--font-core)',
      color: 'var(--text-body)'
    }
  }, "A European insurer had forty analytics prototypes and no production path. We consolidated them into one governed platform, retired two thirds of the estate, and moved three models into live underwriting."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "indigo"
  }, "Financial services"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "Data & AI")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "arrow-right",
    style: {
      marginTop: 'var(--space-6)',
      paddingLeft: 0
    },
    onClick: () => onNavigate('insights')
  }, "Read the case study")), /*#__PURE__*/React.createElement(Card, {
    variant: "raised",
    padding: "var(--space-4)"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/insights-dashboard.png",
    alt: "",
    style: {
      width: '100%',
      borderRadius: 'var(--radius-md)',
      display: 'block'
    }
  })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-6)'
    }
  }, [['Engagements delivered', '140+'], ['Average payback', '11 months'], ['Client repeat rate', '84%'], ['Markets served', '17']].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-bold) var(--fs-h1)/1 var(--font-core)',
      letterSpacing: 'var(--ls-display)',
      background: 'var(--gradient-headline)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-3)',
      font: 'var(--fw-regular) var(--fs-body-sm)/1.4 var(--font-core)',
      color: 'var(--text-muted)'
    }
  }, l))))), /*#__PURE__*/React.createElement(CtaBand, {
    onNavigate: onNavigate
  }));
}
function CtaBand({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 var(--space-8) var(--space-24)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      background: 'var(--gradient-deep)',
      borderRadius: 'var(--radius-2xl)',
      padding: 'var(--space-16)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-12)',
      alignItems: 'center',
      boxShadow: 'var(--shadow-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "inverse"
  }, "Mingloo Consulting"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 'var(--space-4)',
      font: 'var(--fw-bold) var(--fs-h1)/var(--lh-snug) var(--font-core)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-inverse)'
    }
  }, "Turn Complexity", /*#__PURE__*/React.createElement("br", null), "into ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal-400)'
    }
  }, "Opportunity.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-5)',
      font: 'var(--fw-regular) var(--fs-body)/var(--lh-relaxed) var(--font-core)',
      color: 'rgba(255,255,255,.78)'
    }
  }, "Data. AI. Strategy. Real business impact."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    icon: "arrow-right",
    style: {
      marginTop: 'var(--space-8)'
    },
    onClick: () => onNavigate('contact')
  }, "Let's Talk")), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/insights-dashboard.png",
    alt: "",
    style: {
      width: '100%',
      borderRadius: 'var(--radius-lg)',
      display: 'block'
    }
  })));
}
Object.assign(window, {
  HomeScreen,
  CtaBand,
  PILLARS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/InsightsScreen.jsx
try { (() => {
const {
  Eyebrow,
  GradientHeading,
  Card,
  Tag,
  Badge,
  Button,
  Icon
} = window.DesignSystem_e0e94d;
const POSTS = [{
  t: 'The analytics estate nobody owns',
  k: 'Data & AI',
  r: '7 min',
  tint: 'indigo'
}, {
  t: 'What boards actually ask about AI',
  k: 'Strategy',
  r: '5 min',
  tint: 'violet'
}, {
  t: 'Reporting readiness before the deadline',
  k: 'ESG',
  r: '9 min',
  tint: 'teal'
}, {
  t: 'Adoption is a design problem',
  k: 'Change',
  r: '6 min',
  tint: 'pink'
}, {
  t: 'Pricing a proposition you have not built',
  k: 'Growth',
  r: '8 min',
  tint: 'indigo'
}, {
  t: 'Migration sequencing without a freeze',
  k: 'Technology',
  r: '11 min',
  tint: 'violet'
}];
function InsightsScreen({
  onNavigate
}) {
  const [filter, setFilter] = React.useState('All');
  const kinds = ['All', ...new Set(POSTS.map(p => p.k))];
  const shown = POSTS.filter(p => filter === 'All' || p.k === filter);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.Section, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Insights"), /*#__PURE__*/React.createElement(GradientHeading, {
    as: "h1",
    size: "display2",
    accent: "decisions.",
    style: {
      marginTop: 'var(--space-5)',
      maxWidth: 720
    }
  }, "Notes from the work, not"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-10)',
      flexWrap: 'wrap'
    }
  }, kinds.map(k => /*#__PURE__*/React.createElement(Tag, {
    key: k,
    selected: k === filter,
    onClick: () => setFilter(k),
    style: {
      cursor: 'pointer'
    }
  }, k))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-8)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-6)'
    }
  }, shown.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.t,
    padding: "0",
    style: {
      overflow: 'hidden',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 132,
      background: `var(--surface-tint-${p.tint})`,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 34,
    color: "var(--indigo-400)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: p.tint
  }, p.k), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 'var(--space-4)',
      font: 'var(--fw-semibold) var(--fs-h4)/1.35 var(--font-core)',
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--text-heading)'
    }
  }, p.t), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      font: 'var(--fw-regular) var(--fs-caption)/1 var(--font-core)',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 15
  }), p.r, " read")))))), /*#__PURE__*/React.createElement(window.Section, {
    tint: true
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    padding: "var(--space-12)",
    style: {
      display: 'grid',
      gridTemplateColumns: '60px 1fr',
      gap: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "quote",
    size: 44,
    color: "var(--violet-400)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--fw-light) var(--fs-h3)/1.5 var(--font-core)',
      color: 'var(--text-heading)'
    }
  }, "They were the first team who told us which two of our forty projects to stop. That conversation paid for the engagement."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)',
      font: 'var(--fw-medium) var(--fs-body-sm)/1.4 var(--font-core)',
      color: 'var(--text-muted)'
    }
  }, "Group COO \xB7 European insurer"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    icon: "arrow-right",
    onClick: () => onNavigate('contact')
  }, "Let's Talk"))));
}
Object.assign(window, {
  InsightsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/InsightsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServicesScreen.jsx
try { (() => {
const {
  Eyebrow,
  GradientHeading,
  Card,
  Icon,
  Tabs,
  Button,
  Badge
} = window.DesignSystem_e0e94d;
const DETAIL = {
  'chart-column': ['Board-level strategy reviews', 'Market entry and portfolio choices', 'Value cases and investment appraisal'],
  settings: ['Process and cost diagnostics', 'Operating model redesign', 'Service and supply resilience'],
  network: ['Data platform and AI roadmaps', 'Legacy migration sequencing', 'Delivery uplift and MLOps'],
  leaf: ['Baseline and target setting', 'Reporting readiness (CSRD, ISSB)', 'Decarbonisation business cases'],
  target: ['Proposition design and testing', 'Venture build and pricing', 'Commercial scale-up plans'],
  users: ['Stakeholder and adoption mapping', 'Capability and training design', 'Benefit tracking after go-live']
};
function ServicesScreen({
  onNavigate
}) {
  const [tab, setTab] = React.useState('all');
  const items = window.PILLARS.filter(p => tab === 'all' || (tab === 'tech' ? ['network', 'target'].includes(p.icon) : ['chart-column', 'settings', 'leaf', 'users'].includes(p.icon)));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--gradient-wash)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-20) var(--space-8) var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Services"), /*#__PURE__*/React.createElement(GradientHeading, {
    as: "h1",
    size: "display2",
    accent: "hold.",
    style: {
      marginTop: 'var(--space-5)',
      maxWidth: 760
    }
  }, "Six ways we make decisions that"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-6)',
      maxWidth: 560,
      font: 'var(--fw-regular) var(--fs-body-lg)/var(--lh-relaxed) var(--font-core)',
      color: 'var(--text-body)'
    }
  }, "Every engagement starts with the same question: what will be measurably different in twelve months?"))), /*#__PURE__*/React.createElement(window.Section, null, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      id: 'all',
      label: 'All services'
    }, {
      id: 'tech',
      label: 'Technology & AI'
    }, {
      id: 'biz',
      label: 'Business & people'
    }],
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-10)',
      display: 'grid',
      gap: 'var(--space-6)'
    }
  }, items.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.title,
    padding: "var(--space-8)",
    style: {
      display: 'grid',
      gridTemplateColumns: '84px 1fr 1.1fr',
      gap: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: 'var(--radius-md)',
      background: `var(--surface-tint-${p.tint === 'blue' ? 'indigo' : p.tint})`,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: p.icon,
    size: 26,
    color: "var(--indigo-500)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--fw-semibold) var(--fs-h3)/1.3 var(--font-core)',
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--text-heading)'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-3)',
      font: 'var(--fw-regular) var(--fs-body-sm)/var(--lh-relaxed) var(--font-core)',
      color: 'var(--text-muted)'
    }
  }, p.description), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "arrow-right",
    style: {
      marginTop: 'var(--space-4)',
      paddingLeft: 0
    },
    onClick: () => onNavigate('contact')
  }, "Talk to this team")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      paddingTop: 4
    }
  }, DETAIL[p.icon].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'center',
      font: 'var(--fw-regular) var(--fs-body-sm)/1.4 var(--font-core)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-check",
    size: 18,
    color: "var(--teal-600)"
  }), d))))))), /*#__PURE__*/React.createElement(window.Section, {
    tint: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "violet"
  }, "How we work"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 'var(--space-4)',
      font: 'var(--fw-semibold) var(--fs-h2)/1.2 var(--font-core)',
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--text-heading)'
    }
  }, "Four weeks to a decision, not a deck")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-5)',
      flex: 1,
      maxWidth: 620
    }
  }, [['search', 'Diagnose'], ['layers', 'Design'], ['zap', 'Prove'], ['trending-up', 'Scale']].map(([i, l], n) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 22,
    color: "var(--indigo-500)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-3)',
      font: 'var(--fw-semibold) var(--fs-body-sm)/1 var(--font-core)',
      color: 'var(--text-heading)'
    }
  }, n + 1, ". ", l)))))), /*#__PURE__*/React.createElement(window.CtaBand, {
    onNavigate: onNavigate
  }));
}
Object.assign(window, {
  ServicesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServicesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteChrome.jsx
try { (() => {
const {
  Logo,
  LogoType,
  Button,
  Icon,
  Eyebrow
} = window.DesignSystem_e0e94d;
const NAV = [{
  id: 'home',
  label: 'Home'
}, {
  id: 'services',
  label: 'Services'
}, {
  id: 'insights',
  label: 'Insights'
}, {
  id: 'contact',
  label: 'Contact'
}];
function SiteHeader({
  route,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(255,255,255,.86)',
      backdropFilter: 'blur(var(--glass-blur))',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--space-8)',
      height: 82,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate('home');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "mark",
    height: 38,
    assetBase: "../.."
  }), /*#__PURE__*/React.createElement(LogoType, {
    size: 24,
    tone: "ink",
    showConsulting: false
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      marginLeft: 'auto'
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate(n.id);
    },
    style: {
      textDecoration: 'none',
      font: `${route === n.id ? 'var(--fw-semibold)' : 'var(--fw-regular)'} var(--fs-body-sm)/1 var(--font-core)`,
      color: route === n.id ? 'var(--text-heading)' : 'var(--text-muted)'
    }
  }, n.label))), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "arrow-right",
    onClick: () => onNavigate('contact')
  }, "Let's Talk")));
}
function SiteFooter({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--gradient-deep)',
      color: 'var(--text-inverse)',
      padding: 'var(--space-16) var(--space-8) var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LogoType, {
    size: 34
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-5)',
      font: 'var(--fw-regular) var(--fs-body-sm)/var(--lh-relaxed) var(--font-core)',
      color: 'rgba(255,255,255,.72)',
      maxWidth: 300
    }
  }, "Data. AI. Strategy. Real business impact.")), [{
    h: 'Services',
    items: ['Strategy & Advisory', 'Operational Excellence', 'Digital Transformation', 'Sustainability & ESG']
  }, {
    h: 'Company',
    items: ['About', 'Insights', 'Careers', 'Contact']
  }, {
    h: 'Get in touch',
    items: ['hello@mingloo.com', '+44 20 7946 0112', 'London · Dubai']
  }].map(col => /*#__PURE__*/React.createElement("div", {
    key: col.h
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "inverse"
  }, col.h), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, col.items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      textDecoration: 'none',
      font: 'var(--fw-regular) var(--fs-body-sm)/1.4 var(--font-core)',
      color: 'rgba(255,255,255,.78)'
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: 'var(--space-12) auto 0',
      paddingTop: 'var(--space-6)',
      borderTop: '1px solid rgba(255,255,255,.14)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      font: 'var(--fw-regular) var(--fs-caption)/1 var(--font-core)',
      color: 'rgba(255,255,255,.6)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Mingloo Consulting"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'rgba(255,255,255,.6)'
    }
  }, "Privacy"), /*#__PURE__*/React.createElement(Icon, {
    name: "linkedin",
    size: 18
  }))));
}
function Section({
  children,
  tint = false,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-y) var(--space-8)',
      background: tint ? 'var(--surface-subtle)' : 'var(--surface-page)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, children));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  Section,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteChrome.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.GradientHeading = __ds_scope.GradientHeading;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.LogoType = __ds_scope.LogoType;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
