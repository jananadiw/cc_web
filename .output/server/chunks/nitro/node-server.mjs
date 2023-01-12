globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr__default from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, joinURL, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu__default from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr__default(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu__default({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/Jananadi_Resume.pdf": {
    "type": "application/pdf",
    "etag": "\"1ec3d-xHpq4TskikFjA6jawH7yNU1nRLM\"",
    "mtime": "2023-01-12T15:05:45.056Z",
    "size": 126013,
    "path": "../public/Jananadi_Resume.pdf"
  },
  "/Jananadi_TechnicalPortfolio.pdf": {
    "type": "application/pdf",
    "etag": "\"1db07-buT7eezkHJEqrwPvquB5TnqknXY\"",
    "mtime": "2023-01-12T15:05:45.048Z",
    "size": 121607,
    "path": "../public/Jananadi_TechnicalPortfolio.pdf"
  },
  "/cc_logo.png": {
    "type": "image/png",
    "etag": "\"3480-fkd/jEGuc7oh2ROFyEhhTggrWYI\"",
    "mtime": "2023-01-12T15:05:45.037Z",
    "size": 13440,
    "path": "../public/cc_logo.png"
  },
  "/cc_logo_alt.png": {
    "type": "image/png",
    "etag": "\"9e4e-ibvirORHOLkBXuqa/0Oj4/U9mNI\"",
    "mtime": "2023-01-12T15:05:45.035Z",
    "size": 40526,
    "path": "../public/cc_logo_alt.png"
  },
  "/favicon.png": {
    "type": "image/png",
    "etag": "\"23f8-bz56uaEzLcxcfJbaU4IwTUJHG2w\"",
    "mtime": "2023-01-12T15:05:45.032Z",
    "size": 9208,
    "path": "../public/favicon.png"
  },
  "/favicon2.png": {
    "type": "image/png",
    "etag": "\"190f-k0agm9bGGvJvJ223OgS1DAo0o0k\"",
    "mtime": "2023-01-12T15:05:45.030Z",
    "size": 6415,
    "path": "../public/favicon2.png"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"1a3-QpKdl7A8RlLxcQUfArSTZV+OgHo\"",
    "mtime": "2023-01-12T15:05:44.694Z",
    "size": 419,
    "path": "../public/sw.js"
  },
  "/_nuxt/0db434d.js": {
    "type": "application/javascript",
    "etag": "\"fc9-wu7ouKyOtMffezRxWTL5B3Wl4CA\"",
    "mtime": "2023-01-12T15:05:44.692Z",
    "size": 4041,
    "path": "../public/_nuxt/0db434d.js"
  },
  "/_nuxt/1425537.js": {
    "type": "application/javascript",
    "etag": "\"1136-K7q8A3BvguA5F/q7NsVTKar1mWU\"",
    "mtime": "2023-01-12T15:05:44.691Z",
    "size": 4406,
    "path": "../public/_nuxt/1425537.js"
  },
  "/_nuxt/1cff1f5.js": {
    "type": "application/javascript",
    "etag": "\"965-ymQOOBYrIJB9tyQJwx1A6PBE1EQ\"",
    "mtime": "2023-01-12T15:05:44.690Z",
    "size": 2405,
    "path": "../public/_nuxt/1cff1f5.js"
  },
  "/_nuxt/421419b.js": {
    "type": "application/javascript",
    "etag": "\"3fa-bqKQ2//yM+RH5GTR3MgR6cK0JBs\"",
    "mtime": "2023-01-12T15:05:44.690Z",
    "size": 1018,
    "path": "../public/_nuxt/421419b.js"
  },
  "/_nuxt/b360dd6.js": {
    "type": "application/javascript",
    "etag": "\"836-NidTz5q9wPpEmt8gusUkX136Q9s\"",
    "mtime": "2023-01-12T15:05:44.689Z",
    "size": 2102,
    "path": "../public/_nuxt/b360dd6.js"
  },
  "/_nuxt/b560b5a.js": {
    "type": "application/javascript",
    "etag": "\"41d-bi+5otTw4doQYWua4cWxNF+zss4\"",
    "mtime": "2023-01-12T15:05:44.688Z",
    "size": 1053,
    "path": "../public/_nuxt/b560b5a.js"
  },
  "/_nuxt/b9ef778.js": {
    "type": "application/javascript",
    "etag": "\"7fd-W1SVl9smf4NIX9KjTjRemw93Cww\"",
    "mtime": "2023-01-12T15:05:44.687Z",
    "size": 2045,
    "path": "../public/_nuxt/b9ef778.js"
  },
  "/_nuxt/d66c7e8.js": {
    "type": "application/javascript",
    "etag": "\"6c5-2Q/K1GvP2E2D1+QzieDocahkXjI\"",
    "mtime": "2023-01-12T15:05:44.684Z",
    "size": 1733,
    "path": "../public/_nuxt/d66c7e8.js"
  },
  "/_nuxt/e83b844.js": {
    "type": "application/javascript",
    "etag": "\"456-s8iYQOf2UI6S7+w2AkcZ6Z71GnM\"",
    "mtime": "2023-01-12T15:05:44.683Z",
    "size": 1110,
    "path": "../public/_nuxt/e83b844.js"
  },
  "/_nuxt/f81d0bc.js": {
    "type": "application/javascript",
    "etag": "\"34096-JNqOnKVFjkSRp9B/KONXzbKjd2k\"",
    "mtime": "2023-01-12T15:05:44.682Z",
    "size": 213142,
    "path": "../public/_nuxt/f81d0bc.js"
  },
  "/images/Arashiyama.jpg": {
    "type": "image/jpeg",
    "etag": "\"2661a-4PLncUnDZkTdGkoxgct1rNjpzLU\"",
    "mtime": "2023-01-12T15:05:45.028Z",
    "size": 157210,
    "path": "../public/images/Arashiyama.jpg"
  },
  "/images/Balance.jpg": {
    "type": "image/jpeg",
    "etag": "\"8af71-1gmE1XbopfD/KkgRPKb7MExdnnk\"",
    "mtime": "2023-01-12T15:05:45.022Z",
    "size": 569201,
    "path": "../public/images/Balance.jpg"
  },
  "/images/Climber.jpg": {
    "type": "image/jpeg",
    "etag": "\"1efa9-AZwU/FvhYgUsLoVT0nof2OSnE/U\"",
    "mtime": "2023-01-12T15:05:45.007Z",
    "size": 126889,
    "path": "../public/images/Climber.jpg"
  },
  "/images/Fiji_From_Far.jpg": {
    "type": "image/jpeg",
    "etag": "\"223f1-BarVpVAzyNcIqumRR6PeeIb6BZE\"",
    "mtime": "2023-01-12T15:05:45.002Z",
    "size": 140273,
    "path": "../public/images/Fiji_From_Far.jpg"
  },
  "/images/Forest.jpg": {
    "type": "image/jpeg",
    "etag": "\"220a2-44H3glzB70Yn/JZSI4ZWpFgmK4Y\"",
    "mtime": "2023-01-12T15:05:44.999Z",
    "size": 139426,
    "path": "../public/images/Forest.jpg"
  },
  "/images/Guitarist.jpg": {
    "type": "image/jpeg",
    "etag": "\"7aae-uc5Z9IKftupMj/VCfgoIhP2T8gw\"",
    "mtime": "2023-01-12T15:05:44.993Z",
    "size": 31406,
    "path": "../public/images/Guitarist.jpg"
  },
  "/images/Himalayas.jpg": {
    "type": "image/jpeg",
    "etag": "\"22c82-nLTJsX+B/O6WyUhRw9xfAixkCTw\"",
    "mtime": "2023-01-12T15:05:44.992Z",
    "size": 142466,
    "path": "../public/images/Himalayas.jpg"
  },
  "/images/Hug_Me.jpg": {
    "type": "image/jpeg",
    "etag": "\"546c-VNcsG+5JfNwF+fXgoashrfxz0tQ\"",
    "mtime": "2023-01-12T15:05:44.989Z",
    "size": 21612,
    "path": "../public/images/Hug_Me.jpg"
  },
  "/images/River_at_Sunset.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ac9f-Vya+8/AECh0Qux2la8DV3RI7qIg\"",
    "mtime": "2023-01-12T15:05:44.986Z",
    "size": 109727,
    "path": "../public/images/River_at_Sunset.jpg"
  },
  "/images/Seascape.jpg": {
    "type": "image/jpeg",
    "etag": "\"25ae4d-3TlJi76Yj8cFu+olFyLOpKQn9m8\"",
    "mtime": "2023-01-12T15:05:44.977Z",
    "size": 2469453,
    "path": "../public/images/Seascape.jpg"
  },
  "/images/Snowy_Arashiyama.jpg": {
    "type": "image/jpeg",
    "etag": "\"2661a-4PLncUnDZkTdGkoxgct1rNjpzLU\"",
    "mtime": "2023-01-12T15:05:44.925Z",
    "size": 157210,
    "path": "../public/images/Snowy_Arashiyama.jpg"
  },
  "/images/SunsetFishing.jpg": {
    "type": "image/jpeg",
    "etag": "\"9a3af-VsLY3+qYupPx1gnwwQJhToai79w\"",
    "mtime": "2023-01-12T15:05:44.921Z",
    "size": 631727,
    "path": "../public/images/SunsetFishing.jpg"
  },
  "/images/Sunset_Kayaking.jpg": {
    "type": "image/jpeg",
    "etag": "\"2ed9ba-hMUgD1AdR6R77nxf5edRyMdKJoI\"",
    "mtime": "2023-01-12T15:05:44.911Z",
    "size": 3070394,
    "path": "../public/images/Sunset_Kayaking.jpg"
  },
  "/images/Surf_Crowd.jpg": {
    "type": "image/jpeg",
    "etag": "\"2e8323-3WOehN5nlqxe/0ygEjDde6GIpbw\"",
    "mtime": "2023-01-12T15:05:44.892Z",
    "size": 3048227,
    "path": "../public/images/Surf_Crowd.jpg"
  },
  "/images/Sweet_Summer.jpg": {
    "type": "image/jpeg",
    "etag": "\"11d9bc-jKt/62O59j9yb2vjNY49zb2GTjg\"",
    "mtime": "2023-01-12T15:05:44.874Z",
    "size": 1169852,
    "path": "../public/images/Sweet_Summer.jpg"
  },
  "/images/Teal.jpg": {
    "type": "image/jpeg",
    "etag": "\"1dd48-e2goAw4aRv/uQvyWJuW4BvjUEMo\"",
    "mtime": "2023-01-12T15:05:44.863Z",
    "size": 122184,
    "path": "../public/images/Teal.jpg"
  },
  "/images/Unknown.jpg": {
    "type": "image/jpeg",
    "etag": "\"1731cd-KYAOj+LxvR1jrZf9VXNtPqSB6AM\"",
    "mtime": "2023-01-12T15:05:44.860Z",
    "size": 1520077,
    "path": "../public/images/Unknown.jpg"
  },
  "/images/Water.jpg": {
    "type": "image/jpeg",
    "etag": "\"22f99-AHx6ebUStyG5AHwpMxcITO0f2gw\"",
    "mtime": "2023-01-12T15:05:44.849Z",
    "size": 143257,
    "path": "../public/images/Water.jpg"
  },
  "/images/Wave_wait_ 2.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d6741-xQYKEOuCYWgWTRG67k9e/5EXuSY\"",
    "mtime": "2023-01-12T15:05:44.832Z",
    "size": 6121281,
    "path": "../public/images/Wave_wait_ 2.jpg"
  },
  "/images/anotherSunset.jpg": {
    "type": "image/jpeg",
    "etag": "\"2d90d1-rKKLVMEiVELX9YDz3+nB55/H+kM\"",
    "mtime": "2023-01-12T15:05:44.796Z",
    "size": 2986193,
    "path": "../public/images/anotherSunset.jpg"
  },
  "/images/cc.png": {
    "type": "image/png",
    "etag": "\"8d18-RcxSajuVuzggkwK1ExN+A5s9XME\"",
    "mtime": "2023-01-12T15:05:44.780Z",
    "size": 36120,
    "path": "../public/images/cc.png"
  },
  "/images/cc_logo.png": {
    "type": "image/png",
    "etag": "\"3480-fkd/jEGuc7oh2ROFyEhhTggrWYI\"",
    "mtime": "2023-01-12T15:05:44.778Z",
    "size": 13440,
    "path": "../public/images/cc_logo.png"
  },
  "/images/cclogo.png": {
    "type": "image/png",
    "etag": "\"92c9-IC5am6xAArogoUGBcK5VHhReC5o\"",
    "mtime": "2023-01-12T15:05:44.776Z",
    "size": 37577,
    "path": "../public/images/cclogo.png"
  },
  "/images/clearWater.jpg": {
    "type": "image/jpeg",
    "etag": "\"25ae4d-3TlJi76Yj8cFu+olFyLOpKQn9m8\"",
    "mtime": "2023-01-12T15:05:44.770Z",
    "size": 2469453,
    "path": "../public/images/clearWater.jpg"
  },
  "/images/cv.png": {
    "type": "image/png",
    "etag": "\"390d-DYO4cX4xYqlfcwCI+krmmif/XNo\"",
    "mtime": "2023-01-12T15:05:44.757Z",
    "size": 14605,
    "path": "../public/images/cv.png"
  },
  "/images/cv2.png": {
    "type": "image/png",
    "etag": "\"2f80-2KFR1PyjIgqUlN31mPhcfTaCxXk\"",
    "mtime": "2023-01-12T15:05:44.755Z",
    "size": 12160,
    "path": "../public/images/cv2.png"
  },
  "/images/github.png": {
    "type": "image/png",
    "etag": "\"15e9-MEv8C0/j5v5TsU6bfexncBefjSw\"",
    "mtime": "2023-01-12T15:05:44.753Z",
    "size": 5609,
    "path": "../public/images/github.png"
  },
  "/images/ig.png": {
    "type": "image/png",
    "etag": "\"13d2-hJI5OqWce5Okv0NY011Me9n4h/s\"",
    "mtime": "2023-01-12T15:05:44.752Z",
    "size": 5074,
    "path": "../public/images/ig.png"
  },
  "/images/jeju.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c9563-l4sp3bvtK5H/6DIyWJxtlry1WpU\"",
    "mtime": "2023-01-12T15:05:44.743Z",
    "size": 2921827,
    "path": "../public/images/jeju.jpg"
  },
  "/images/logo.jpg": {
    "type": "image/jpeg",
    "etag": "\"8569-Uqt17nxQwbW2YuZz4ZwSY3mbK9c\"",
    "mtime": "2023-01-12T15:05:44.729Z",
    "size": 34153,
    "path": "../public/images/logo.jpg"
  },
  "/images/logoCanvasConfetti.png": {
    "type": "image/png",
    "etag": "\"8168-mRhGFl57To+LaqZkglLy9yixwdY\"",
    "mtime": "2023-01-12T15:05:44.727Z",
    "size": 33128,
    "path": "../public/images/logoCanvasConfetti.png"
  },
  "/images/portfolio.png": {
    "type": "image/png",
    "etag": "\"17b0-BSnQuF3dJnebkFJh6UjoXR+k3Ak\"",
    "mtime": "2023-01-12T15:05:44.725Z",
    "size": 6064,
    "path": "../public/images/portfolio.png"
  },
  "/images/resume.png": {
    "type": "image/png",
    "etag": "\"56c2-XZDFOtp8HJ++cfV/B2ZxxjgNsu8\"",
    "mtime": "2023-01-12T15:05:44.723Z",
    "size": 22210,
    "path": "../public/images/resume.png"
  },
  "/images/resume_alt.png": {
    "type": "image/png",
    "etag": "\"2e3f-Ft8HartfMN99jExMsIuCqDCT43E\"",
    "mtime": "2023-01-12T15:05:44.722Z",
    "size": 11839,
    "path": "../public/images/resume_alt.png"
  },
  "/images/riverSunset.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ac9f-Vya+8/AECh0Qux2la8DV3RI7qIg\"",
    "mtime": "2023-01-12T15:05:44.720Z",
    "size": 109727,
    "path": "../public/images/riverSunset.jpg"
  },
  "/images/sunriseSurfer.jpg": {
    "type": "image/jpeg",
    "etag": "\"3be042-wd6s7jITwhqHWIOLl5gC712BMkQ\"",
    "mtime": "2023-01-12T15:05:44.712Z",
    "size": 3924034,
    "path": "../public/images/sunriseSurfer.jpg"
  },
  "/_nuxt/css/22780ce.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e3e-c0HQZx257kccDj8TIWWmZNT5iBE\"",
    "mtime": "2023-01-12T15:05:44.686Z",
    "size": 3646,
    "path": "../public/_nuxt/css/22780ce.css"
  },
  "/_nuxt/css/5f0b2dd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"15fc-KgoVJFffKheW9r3mA3+2Zinx6+k\"",
    "mtime": "2023-01-12T15:05:44.686Z",
    "size": 5628,
    "path": "../public/_nuxt/css/5f0b2dd.css"
  },
  "/_nuxt/css/f829209.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-Tv2oOgFtlaId9fzLVLeI6/JjCe4\"",
    "mtime": "2023-01-12T15:05:44.685Z",
    "size": 1950,
    "path": "../public/_nuxt/css/f829209.css"
  },
  "/_nuxt/img/Arashiyama.8c95a97.jpg": {
    "type": "image/jpeg",
    "etag": "\"2661a-4PLncUnDZkTdGkoxgct1rNjpzLU\"",
    "mtime": "2023-01-12T15:05:44.680Z",
    "size": 157210,
    "path": "../public/_nuxt/img/Arashiyama.8c95a97.jpg"
  },
  "/_nuxt/img/Balance.7487857.jpg": {
    "type": "image/jpeg",
    "etag": "\"8af71-1gmE1XbopfD/KkgRPKb7MExdnnk\"",
    "mtime": "2023-01-12T15:05:44.678Z",
    "size": 569201,
    "path": "../public/_nuxt/img/Balance.7487857.jpg"
  },
  "/_nuxt/img/Climber.eec6f13.jpg": {
    "type": "image/jpeg",
    "etag": "\"1efa9-AZwU/FvhYgUsLoVT0nof2OSnE/U\"",
    "mtime": "2023-01-12T15:05:44.675Z",
    "size": 126889,
    "path": "../public/_nuxt/img/Climber.eec6f13.jpg"
  },
  "/_nuxt/img/Fiji_From_Far.ce337a1.jpg": {
    "type": "image/jpeg",
    "etag": "\"223f1-BarVpVAzyNcIqumRR6PeeIb6BZE\"",
    "mtime": "2023-01-12T15:05:44.674Z",
    "size": 140273,
    "path": "../public/_nuxt/img/Fiji_From_Far.ce337a1.jpg"
  },
  "/_nuxt/img/Forest.64e7384.jpg": {
    "type": "image/jpeg",
    "etag": "\"220a2-44H3glzB70Yn/JZSI4ZWpFgmK4Y\"",
    "mtime": "2023-01-12T15:05:44.673Z",
    "size": 139426,
    "path": "../public/_nuxt/img/Forest.64e7384.jpg"
  },
  "/_nuxt/img/Guitarist.a290ff8.jpg": {
    "type": "image/jpeg",
    "etag": "\"7aae-uc5Z9IKftupMj/VCfgoIhP2T8gw\"",
    "mtime": "2023-01-12T15:05:44.672Z",
    "size": 31406,
    "path": "../public/_nuxt/img/Guitarist.a290ff8.jpg"
  },
  "/_nuxt/img/Himalayas.a5a8aa4.jpg": {
    "type": "image/jpeg",
    "etag": "\"22c82-nLTJsX+B/O6WyUhRw9xfAixkCTw\"",
    "mtime": "2023-01-12T15:05:44.671Z",
    "size": 142466,
    "path": "../public/_nuxt/img/Himalayas.a5a8aa4.jpg"
  },
  "/_nuxt/img/Hug_Me.1ee7cc6.jpg": {
    "type": "image/jpeg",
    "etag": "\"546c-VNcsG+5JfNwF+fXgoashrfxz0tQ\"",
    "mtime": "2023-01-12T15:05:44.670Z",
    "size": 21612,
    "path": "../public/_nuxt/img/Hug_Me.1ee7cc6.jpg"
  },
  "/_nuxt/img/River_at_Sunset.578d29b.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ac9f-Vya+8/AECh0Qux2la8DV3RI7qIg\"",
    "mtime": "2023-01-12T15:05:44.669Z",
    "size": 109727,
    "path": "../public/_nuxt/img/River_at_Sunset.578d29b.jpg"
  },
  "/_nuxt/img/Seascape.d0965b1.jpg": {
    "type": "image/jpeg",
    "etag": "\"25ae4d-3TlJi76Yj8cFu+olFyLOpKQn9m8\"",
    "mtime": "2023-01-12T15:05:44.667Z",
    "size": 2469453,
    "path": "../public/_nuxt/img/Seascape.d0965b1.jpg"
  },
  "/_nuxt/img/Snowy_Arashiyama.8c95a97.jpg": {
    "type": "image/jpeg",
    "etag": "\"2661a-4PLncUnDZkTdGkoxgct1rNjpzLU\"",
    "mtime": "2023-01-12T15:05:44.652Z",
    "size": 157210,
    "path": "../public/_nuxt/img/Snowy_Arashiyama.8c95a97.jpg"
  },
  "/_nuxt/img/SunsetFishing.36cc7d6.jpg": {
    "type": "image/jpeg",
    "etag": "\"9a3af-VsLY3+qYupPx1gnwwQJhToai79w\"",
    "mtime": "2023-01-12T15:05:44.651Z",
    "size": 631727,
    "path": "../public/_nuxt/img/SunsetFishing.36cc7d6.jpg"
  },
  "/_nuxt/img/Sunset_Kayaking.09a8929.jpg": {
    "type": "image/jpeg",
    "etag": "\"2ed9ba-hMUgD1AdR6R77nxf5edRyMdKJoI\"",
    "mtime": "2023-01-12T15:05:44.648Z",
    "size": 3070394,
    "path": "../public/_nuxt/img/Sunset_Kayaking.09a8929.jpg"
  },
  "/_nuxt/img/Surf_Crowd.cf4b446.jpg": {
    "type": "image/jpeg",
    "etag": "\"2e8323-3WOehN5nlqxe/0ygEjDde6GIpbw\"",
    "mtime": "2023-01-12T15:05:44.547Z",
    "size": 3048227,
    "path": "../public/_nuxt/img/Surf_Crowd.cf4b446.jpg"
  },
  "/_nuxt/img/Sweet_Summer.b1d7807.jpg": {
    "type": "image/jpeg",
    "etag": "\"11d9bc-jKt/62O59j9yb2vjNY49zb2GTjg\"",
    "mtime": "2023-01-12T15:05:44.535Z",
    "size": 1169852,
    "path": "../public/_nuxt/img/Sweet_Summer.b1d7807.jpg"
  },
  "/_nuxt/img/Teal.17cbe89.jpg": {
    "type": "image/jpeg",
    "etag": "\"1dd48-e2goAw4aRv/uQvyWJuW4BvjUEMo\"",
    "mtime": "2023-01-12T15:05:44.530Z",
    "size": 122184,
    "path": "../public/_nuxt/img/Teal.17cbe89.jpg"
  },
  "/_nuxt/img/Unknown.87483a5.jpg": {
    "type": "image/jpeg",
    "etag": "\"1731cd-KYAOj+LxvR1jrZf9VXNtPqSB6AM\"",
    "mtime": "2023-01-12T15:05:44.528Z",
    "size": 1520077,
    "path": "../public/_nuxt/img/Unknown.87483a5.jpg"
  },
  "/_nuxt/img/Water.49d5746.jpg": {
    "type": "image/jpeg",
    "etag": "\"22f99-AHx6ebUStyG5AHwpMxcITO0f2gw\"",
    "mtime": "2023-01-12T15:05:44.519Z",
    "size": 143257,
    "path": "../public/_nuxt/img/Water.49d5746.jpg"
  },
  "/_nuxt/img/Wave_wait_ 2.fc077b1.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d6741-xQYKEOuCYWgWTRG67k9e/5EXuSY\"",
    "mtime": "2023-01-12T15:05:44.517Z",
    "size": 6121281,
    "path": "../public/_nuxt/img/Wave_wait_ 2.fc077b1.jpg"
  },
  "/_nuxt/img/anotherSunset.eaef88f.jpg": {
    "type": "image/jpeg",
    "etag": "\"2d90d1-rKKLVMEiVELX9YDz3+nB55/H+kM\"",
    "mtime": "2023-01-12T15:05:44.495Z",
    "size": 2986193,
    "path": "../public/_nuxt/img/anotherSunset.eaef88f.jpg"
  },
  "/_nuxt/img/cc.cc97770.png": {
    "type": "image/png",
    "etag": "\"8d18-RcxSajuVuzggkwK1ExN+A5s9XME\"",
    "mtime": "2023-01-12T15:05:44.484Z",
    "size": 36120,
    "path": "../public/_nuxt/img/cc.cc97770.png"
  },
  "/_nuxt/img/cc_logo.9519c93.png": {
    "type": "image/png",
    "etag": "\"3480-fkd/jEGuc7oh2ROFyEhhTggrWYI\"",
    "mtime": "2023-01-12T15:05:44.483Z",
    "size": 13440,
    "path": "../public/_nuxt/img/cc_logo.9519c93.png"
  },
  "/_nuxt/img/cclogo.81c38d8.png": {
    "type": "image/png",
    "etag": "\"92c9-IC5am6xAArogoUGBcK5VHhReC5o\"",
    "mtime": "2023-01-12T15:05:44.481Z",
    "size": 37577,
    "path": "../public/_nuxt/img/cclogo.81c38d8.png"
  },
  "/_nuxt/img/clearWater.d0965b1.jpg": {
    "type": "image/jpeg",
    "etag": "\"25ae4d-3TlJi76Yj8cFu+olFyLOpKQn9m8\"",
    "mtime": "2023-01-12T15:05:44.480Z",
    "size": 2469453,
    "path": "../public/_nuxt/img/clearWater.d0965b1.jpg"
  },
  "/_nuxt/img/cv.a354291.png": {
    "type": "image/png",
    "etag": "\"390d-DYO4cX4xYqlfcwCI+krmmif/XNo\"",
    "mtime": "2023-01-12T15:05:44.471Z",
    "size": 14605,
    "path": "../public/_nuxt/img/cv.a354291.png"
  },
  "/_nuxt/img/cv2.cd601dd.png": {
    "type": "image/png",
    "etag": "\"2f80-2KFR1PyjIgqUlN31mPhcfTaCxXk\"",
    "mtime": "2023-01-12T15:05:44.470Z",
    "size": 12160,
    "path": "../public/_nuxt/img/cv2.cd601dd.png"
  },
  "/_nuxt/img/github.2ef76c2.png": {
    "type": "image/png",
    "etag": "\"15e9-MEv8C0/j5v5TsU6bfexncBefjSw\"",
    "mtime": "2023-01-12T15:05:44.469Z",
    "size": 5609,
    "path": "../public/_nuxt/img/github.2ef76c2.png"
  },
  "/_nuxt/img/ig.42e3690.png": {
    "type": "image/png",
    "etag": "\"13d2-hJI5OqWce5Okv0NY011Me9n4h/s\"",
    "mtime": "2023-01-12T15:05:44.469Z",
    "size": 5074,
    "path": "../public/_nuxt/img/ig.42e3690.png"
  },
  "/_nuxt/img/jeju.6f04024.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c9563-l4sp3bvtK5H/6DIyWJxtlry1WpU\"",
    "mtime": "2023-01-12T15:05:44.467Z",
    "size": 2921827,
    "path": "../public/_nuxt/img/jeju.6f04024.jpg"
  },
  "/_nuxt/img/logo.067e928.jpg": {
    "type": "image/jpeg",
    "etag": "\"8569-Uqt17nxQwbW2YuZz4ZwSY3mbK9c\"",
    "mtime": "2023-01-12T15:05:44.457Z",
    "size": 34153,
    "path": "../public/_nuxt/img/logo.067e928.jpg"
  },
  "/_nuxt/img/logoCanvasConfetti.ab07744.png": {
    "type": "image/png",
    "etag": "\"8168-mRhGFl57To+LaqZkglLy9yixwdY\"",
    "mtime": "2023-01-12T15:05:44.455Z",
    "size": 33128,
    "path": "../public/_nuxt/img/logoCanvasConfetti.ab07744.png"
  },
  "/_nuxt/img/portfolio.b76ffd9.png": {
    "type": "image/png",
    "etag": "\"17b0-BSnQuF3dJnebkFJh6UjoXR+k3Ak\"",
    "mtime": "2023-01-12T15:05:44.454Z",
    "size": 6064,
    "path": "../public/_nuxt/img/portfolio.b76ffd9.png"
  },
  "/_nuxt/img/resume.b00e9ef.png": {
    "type": "image/png",
    "etag": "\"56c2-XZDFOtp8HJ++cfV/B2ZxxjgNsu8\"",
    "mtime": "2023-01-12T15:05:44.453Z",
    "size": 22210,
    "path": "../public/_nuxt/img/resume.b00e9ef.png"
  },
  "/_nuxt/img/resume_alt.4a8c9a2.png": {
    "type": "image/png",
    "etag": "\"2e3f-Ft8HartfMN99jExMsIuCqDCT43E\"",
    "mtime": "2023-01-12T15:05:44.452Z",
    "size": 11839,
    "path": "../public/_nuxt/img/resume_alt.4a8c9a2.png"
  },
  "/_nuxt/img/riverSunset.578d29b.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ac9f-Vya+8/AECh0Qux2la8DV3RI7qIg\"",
    "mtime": "2023-01-12T15:05:44.451Z",
    "size": 109727,
    "path": "../public/_nuxt/img/riverSunset.578d29b.jpg"
  },
  "/_nuxt/img/sunriseSurfer.ae97fd0.jpg": {
    "type": "image/jpeg",
    "etag": "\"3be042-wd6s7jITwhqHWIOLl5gC712BMkQ\"",
    "mtime": "2023-01-12T15:05:44.448Z",
    "size": 3924034,
    "path": "../public/_nuxt/img/sunriseSurfer.ae97fd0.jpg"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end();
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end();
      return;
    }
  }
  if (asset.type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.getHeader("ETag")) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.getHeader("Last-Modified")) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.res.getHeader("Content-Encoding")) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size && !event.res.getHeader("Content-Length")) {
    event.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_1tXw9K = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_1tXw9K, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_1tXw9K, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr__default(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr__default(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
