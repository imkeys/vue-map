import { XHR, mock } from 'mockjs'
import { param2Obj } from './utils'
import home from './apis/home'
import house from './apis/house'

const mocks = [
  ...home,
  ...house
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR () {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  XHR.prototype.proxy_send = XHR.prototype.send
  XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap (respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return mock(result)
    }
  }

  for (const i of mocks) {
    mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

export default {
  mocks,
  mockXHR
}
