const id = 480;
const ids = [480];
const modules = {

/***/ 6480:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ error_500)
});

// EXTERNAL MODULE: ./node_modules/nuxt/dist/head/runtime/index.mjs + 1 modules
var runtime = __webpack_require__(9301);
// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(6609);
// EXTERNAL MODULE: external "vue/server-renderer"
var server_renderer_ = __webpack_require__(9344);


/* harmony default export */ const error_500vue_type_script_setup_true_lang_js = ({
  __name: "error-500",
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: Number,
      default: 500
    },
    statusMessage: {
      type: String,
      default: "Server error"
    },
    description: {
      type: String,
      default: "This page is temporarily unavailable."
    }
  },
  setup(__props) {
    const props = __props;
    (0, runtime/* useHead */.K)({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e0e0e0}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p{margin:0}h1{font-size:inherit;font-weight:inherit}`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, _attrs))} data-v-72cfbe0a><div class="fixed -bottom-1/2 left-0 right-0 h-1/2 spotlight" data-v-72cfbe0a></div><div class="max-w-520px text-center" data-v-72cfbe0a><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-72cfbe0a>${(0, server_renderer_.ssrInterpolate)(__props.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-72cfbe0a>${(0, server_renderer_.ssrInterpolate)(__props.description)}</p></div></div>`);
    };
  }
});
 
// EXTERNAL MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Adynamic-base-path!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-38.use[0]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-38.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Atree-shake-template!./node_modules/@nuxt/ui-templates/dist/templates/error-500.vue?vue&type=style&index=0&id=72cfbe0a&scoped=true&lang=css
__webpack_require__(6059);

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(4897);


const __exports__ = /*#__PURE__*/(0, exportHelper/* default */.Z)(error_500vue_type_script_setup_true_lang_js, [['__scopeId',"data-v-72cfbe0a"]]);

/* harmony default export */ const error_500 = (__exports__);

/***/ }),

/***/ 6059:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(5062);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2394);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".spotlight[data-v-72cfbe0a]{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);filter:blur(20vh)}.bg-white[data-v-72cfbe0a]{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.grid[data-v-72cfbe0a]{display:grid}.place-content-center[data-v-72cfbe0a]{place-content:center}.font-sans[data-v-72cfbe0a]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.font-medium[data-v-72cfbe0a]{font-weight:500}.font-light[data-v-72cfbe0a]{font-weight:300}.h-1\\/2[data-v-72cfbe0a]{height:50%}.text-8xl[data-v-72cfbe0a]{font-size:6rem;line-height:1}.text-xl[data-v-72cfbe0a]{font-size:1.25rem;line-height:1.75rem}.leading-tight[data-v-72cfbe0a]{line-height:1.25}.mb-8[data-v-72cfbe0a]{margin-bottom:2rem}.mb-16[data-v-72cfbe0a]{margin-bottom:4rem}.max-w-520px[data-v-72cfbe0a]{max-width:520px}.min-h-screen[data-v-72cfbe0a]{min-height:100vh}.overflow-hidden[data-v-72cfbe0a]{overflow:hidden}.px-8[data-v-72cfbe0a]{padding-left:2rem;padding-right:2rem}.fixed[data-v-72cfbe0a]{position:fixed}.left-0[data-v-72cfbe0a]{left:0}.right-0[data-v-72cfbe0a]{right:0}.-bottom-1\\/2[data-v-72cfbe0a]{bottom:-50%}.text-center[data-v-72cfbe0a]{text-align:center}.text-black[data-v-72cfbe0a]{--tw-text-opacity:1;color:rgba(0,0,0,var(--tw-text-opacity))}.antialiased[data-v-72cfbe0a]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (min-width:640px){.sm\\:text-4xl[data-v-72cfbe0a]{font-size:2.25rem;line-height:2.5rem}.sm\\:text-10xl[data-v-72cfbe0a]{font-size:10rem;line-height:1}.sm\\:px-0[data-v-72cfbe0a]{padding-left:0;padding-right:0}}@media (prefers-color-scheme:dark){.dark\\:bg-black[data-v-72cfbe0a]{--tw-bg-opacity:1;background-color:rgba(0,0,0,var(--tw-bg-opacity))}.dark\\:text-white[data-v-72cfbe0a]{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ })

};

export { id, ids, modules };
//# sourceMappingURL=480.mjs.map
