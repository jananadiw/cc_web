const id = 807;
const ids = [807];
const modules = {

/***/ 807:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* reexport */ nuxt_error_page)
});

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(6609);
// EXTERNAL MODULE: external "vue/server-renderer"
var server_renderer_ = __webpack_require__(9344);





// Deliberately prevent reactive update when error is cleared
// eslint-disable-next-line vue/no-setup-props-destructure

/* harmony default export */ const nuxt_error_pagevue_type_script_setup_true_lang_js = ({
  __name: 'nuxt-error-page',
  __ssrInlineRender: true,
  props: {
  error: Object
},
  setup(__props) {

const { error } = __props;



// TODO: extract to a separate utility
(error.stack || '')
  .split('\n')
  .splice(1)
  .map((line) => {
    const text = line
      .replace('webpack:/', '')
      .replace('.vue', '.js') // TODO: Support sourcemap
      .trim();
    return {
      text,
      internal: (line.includes('node_modules') && !line.includes('.cache')) ||
        line.includes('internal') ||
        line.includes('new Promise')
    }
  }).map(i => `<span class="stack${i.internal ? ' internal' : ''}">${i.text}</span>`).join('\n');

// Error page props
const statusCode = Number(error.statusCode || 500);
const is404 = statusCode === 404;

const statusMessage = error.statusMessage ?? (is404 ? 'Page Not Found' : 'Internal Server Error');
const description = error.message || error.toString();
const stack =  undefined;

// TODO: Investigate side-effect issue with imports
const _Error404 = (0, external_vue_.defineAsyncComponent)(() => __webpack_require__.e(/* import() */ 581).then(__webpack_require__.bind(__webpack_require__, 5581)).then(r => r.default || r));
const _Error =  (0, external_vue_.defineAsyncComponent)(() => __webpack_require__.e(/* import() */ 480).then(__webpack_require__.bind(__webpack_require__, 6480)).then(r => r.default || r));

const ErrorTemplate = is404 ? _Error404 : _Error;

return (_ctx, _push, _parent, _attrs) => {
  _push((0, server_renderer_.ssrRenderComponent)((0, external_vue_.unref)(ErrorTemplate), (0, external_vue_.mergeProps)({ statusCode: (0, external_vue_.unref)(statusCode), statusMessage: (0, external_vue_.unref)(statusMessage), description: (0, external_vue_.unref)(description), stack: (0, external_vue_.unref)(stack) }, _attrs), null, _parent));
}
}

});



const __exports__ = nuxt_error_pagevue_type_script_setup_true_lang_js;

/* harmony default export */ const nuxt_error_page = (__exports__);




/***/ })

};

export { id, ids, modules };
//# sourceMappingURL=807.mjs.map
