const id = 911;
const ids = [911];
const modules = {

/***/ 1911:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ layouts_default)
});

// EXTERNAL MODULE: ./node_modules/nuxt/dist/app/components/nuxt-link.mjs
var nuxt_link = __webpack_require__(2438);
// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(6609);
// EXTERNAL MODULE: external "vue/server-renderer"
var server_renderer_ = __webpack_require__(9344);


function ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = nuxt_link/* default */.Z;
  _push(`<div${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({ class: "nav" }, _attrs))}><div class="nav__contents"><div class="nav__link"><a href="//opensea.io/collection/canvas-confetti" target="_blank">Shop</a></div>`);
  _push((0, server_renderer_.ssrRenderComponent)(_component_NuxtLink, {
    class: "nav__link",
    to: "/about"
  }, {
    default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About`);
      } else {
        return [
          (0, external_vue_.createTextVNode)("About")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(4897);

const script = {}

;
const __exports__ = /*#__PURE__*/(0, exportHelper/* default */.Z)(script, [['ssrRender',ssrRender]]);

/* harmony default export */ const NavBar = (__exports__);


function Headervue_type_template_id_08ad2439_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = nuxt_link/* default */.Z;
  const _component_NavBar = NavBar;
  _push(`<div${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({ class: "header" }, _attrs))}><div class="logo">`);
  _push((0, server_renderer_.ssrRenderComponent)(_component_NuxtLink, {
    class: "logo__link",
    to: "/"
  }, {
    default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img src="/cc_logo_alt.png" alt="logo" class="header__logo"${_scopeId}>`);
      } else {
        return [
          (0, external_vue_.createVNode)("img", {
            src: "/cc_logo_alt.png",
            alt: "logo",
            class: "header__logo"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push((0, server_renderer_.ssrRenderComponent)(_component_NavBar, null, null, _parent));
  _push(`</div>`);
}

const Header_script = {}

;
const Header_exports_ = /*#__PURE__*/(0, exportHelper/* default */.Z)(Header_script, [['ssrRender',Headervue_type_template_id_08ad2439_ssrRender]]);

/* harmony default export */ const Header = (Header_exports_);


function defaultvue_type_template_id_c1e848c8_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Header = Header;
  _push(`<div${(0, server_renderer_.ssrRenderAttrs)(_attrs)}>`);
  _push((0, server_renderer_.ssrRenderComponent)(_component_Header, null, null, _parent));
  (0, server_renderer_.ssrRenderSlot)(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}

const default_script = {}

;
const default_exports_ = /*#__PURE__*/(0, exportHelper/* default */.Z)(default_script, [['ssrRender',defaultvue_type_template_id_c1e848c8_ssrRender]]);

/* harmony default export */ const layouts_default = (default_exports_);

/***/ })

};

export { id, ids, modules };
//# sourceMappingURL=911.mjs.map
