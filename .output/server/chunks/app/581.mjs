const id = 581;
const ids = [581];
const modules = {

/***/ 5581:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ error_404)
});

// EXTERNAL MODULE: ./node_modules/nuxt/dist/head/runtime/index.mjs + 1 modules
var runtime = __webpack_require__(9301);
// EXTERNAL MODULE: ./node_modules/nuxt/dist/app/components/nuxt-link.mjs
var nuxt_link = __webpack_require__(2438);
// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(6609);
// EXTERNAL MODULE: external "vue/server-renderer"
var server_renderer_ = __webpack_require__(9344);


/* harmony default export */ const error_404vue_type_script_setup_true_lang_js = ({
  __name: "error-404",
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
      default: 404
    },
    statusMessage: {
      type: String,
      default: "Not Found"
    },
    description: {
      type: String,
      default: "Sorry, the page you are looking for could not be found."
    },
    backHome: {
      type: String,
      default: "Go back home"
    }
  },
  setup(__props) {
    const props = __props;
    (0, runtime/* useHead */.K)({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e0e0e0}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p{margin:0}h1{font-size:inherit;font-weight:inherit}`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = nuxt_link/* default */.Z;
      _push(`<div${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, _attrs))} data-v-2087a320><div class="fixed left-0 right-0 spotlight z-10" data-v-2087a320></div><div class="max-w-520px text-center z-20" data-v-2087a320><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-2087a320>${(0, server_renderer_.ssrInterpolate)(__props.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-2087a320>${(0, server_renderer_.ssrInterpolate)(__props.description)}</p><div class="w-full flex items-center justify-center" data-v-2087a320>`);
      _push((0, server_renderer_.ssrRenderComponent)(_component_NuxtLink, {
        to: "/",
        class: "gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
      }, {
        default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${(0, server_renderer_.ssrInterpolate)(__props.backHome)}`);
          } else {
            return [
              (0, external_vue_.createTextVNode)((0, external_vue_.toDisplayString)(__props.backHome), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
 
// EXTERNAL MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Adynamic-base-path!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-38.use[0]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-38.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Atree-shake-template!./node_modules/@nuxt/ui-templates/dist/templates/error-404.vue?vue&type=style&index=0&id=2087a320&scoped=true&lang=css
__webpack_require__(6374);

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(4897);


const __exports__ = /*#__PURE__*/(0, exportHelper/* default */.Z)(error_404vue_type_script_setup_true_lang_js, [['__scopeId',"data-v-2087a320"]]);

/* harmony default export */ const error_404 = (__exports__);

/***/ }),

/***/ 6374:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(5062);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2394);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".spotlight[data-v-2087a320]{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-30vh;filter:blur(20vh);height:40vh}.gradient-border[data-v-2087a320]{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:.5rem;position:relative}@media (prefers-color-scheme:light){.gradient-border[data-v-2087a320]{background-color:hsla(0,0%,100%,.3)}.gradient-border[data-v-2087a320]:before{background:linear-gradient(90deg,#e2e2e2,#e2e2e2 25%,#00dc82 50%,#36e4da 75%,#0047e1)}}@media (prefers-color-scheme:dark){.gradient-border[data-v-2087a320]{background-color:hsla(0,0%,8%,.3)}.gradient-border[data-v-2087a320]:before{background:linear-gradient(90deg,#303030,#303030 25%,#00dc82 50%,#36e4da 75%,#0047e1)}}.gradient-border[data-v-2087a320]:before{background-size:400% auto;border-radius:.5rem;bottom:0;content:\"\";left:0;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.5;padding:2px;position:absolute;right:0;top:0;transition:background-position .3s ease-in-out,opacity .2s ease-in-out;width:100%}.gradient-border[data-v-2087a320]:hover:before{background-position:-50% 0;opacity:1}.bg-white[data-v-2087a320]{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.cursor-pointer[data-v-2087a320]{cursor:pointer}.flex[data-v-2087a320]{display:flex}.grid[data-v-2087a320]{display:grid}.place-content-center[data-v-2087a320]{place-content:center}.items-center[data-v-2087a320]{align-items:center}.justify-center[data-v-2087a320]{justify-content:center}.font-sans[data-v-2087a320]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.font-medium[data-v-2087a320]{font-weight:500}.font-light[data-v-2087a320]{font-weight:300}.text-8xl[data-v-2087a320]{font-size:6rem;line-height:1}.text-xl[data-v-2087a320]{font-size:1.25rem;line-height:1.75rem}.leading-tight[data-v-2087a320]{line-height:1.25}.mb-8[data-v-2087a320]{margin-bottom:2rem}.mb-16[data-v-2087a320]{margin-bottom:4rem}.max-w-520px[data-v-2087a320]{max-width:520px}.min-h-screen[data-v-2087a320]{min-height:100vh}.overflow-hidden[data-v-2087a320]{overflow:hidden}.px-8[data-v-2087a320]{padding-left:2rem;padding-right:2rem}.py-2[data-v-2087a320]{padding-bottom:.5rem;padding-top:.5rem}.px-4[data-v-2087a320]{padding-left:1rem;padding-right:1rem}.fixed[data-v-2087a320]{position:fixed}.left-0[data-v-2087a320]{left:0}.right-0[data-v-2087a320]{right:0}.text-center[data-v-2087a320]{text-align:center}.text-black[data-v-2087a320]{--tw-text-opacity:1;color:rgba(0,0,0,var(--tw-text-opacity))}.antialiased[data-v-2087a320]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.w-full[data-v-2087a320]{width:100%}.z-10[data-v-2087a320]{z-index:10}.z-20[data-v-2087a320]{z-index:20}@media (min-width:640px){.sm\\:text-4xl[data-v-2087a320]{font-size:2.25rem;line-height:2.5rem}.sm\\:text-xl[data-v-2087a320]{font-size:1.25rem;line-height:1.75rem}.sm\\:text-10xl[data-v-2087a320]{font-size:10rem;line-height:1}.sm\\:px-0[data-v-2087a320]{padding-left:0;padding-right:0}.sm\\:py-3[data-v-2087a320]{padding-bottom:.75rem;padding-top:.75rem}.sm\\:px-6[data-v-2087a320]{padding-left:1.5rem;padding-right:1.5rem}}@media (prefers-color-scheme:dark){.dark\\:bg-black[data-v-2087a320]{--tw-bg-opacity:1;background-color:rgba(0,0,0,var(--tw-bg-opacity))}.dark\\:text-white[data-v-2087a320]{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ })

};

export { id, ids, modules };
//# sourceMappingURL=581.mjs.map
