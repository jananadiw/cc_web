const dynamicChunks = {
 ['384.mjs']: () => import('../app/384.mjs'),
 ['480.mjs']: () => import('../app/480.mjs'),
 ['581.mjs']: () => import('../app/581.mjs'),
 ['666.mjs']: () => import('../app/666.mjs'),
 ['807.mjs']: () => import('../app/807.mjs'),
 ['911.mjs']: () => import('../app/911.mjs')
};

function dynamicRequire(id) {
  return dynamicChunks[id]();
}

export { dynamicRequire as default };
//# sourceMappingURL=_dynamic-require.mjs.map
