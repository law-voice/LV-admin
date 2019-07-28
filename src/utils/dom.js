/**
 * 获取指定dom元素距离窗口左边距离
 * @param {Object} element - 待查询的dom节点
 * @returns {string}
 */
function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

/**
 * 获取指定dom元素距离窗口距离
 * @param {Object} element - 待查询的dom节点
 * @returns {string}
 */
function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}
/**
 * 监听dom resize
 */
function domResizeListener() {
  const EleResize = {
    _handleResize(e) {
      const ele = e.target || e.srcElement;
      const trigger = ele.__resizeTrigger__;
      if (trigger) {
        const handlers = trigger.__z_resizeListeners;
        if (handlers) {
          const size = handlers.length;
          for (let i = 0; i < size; i++) {
            const h = handlers[i];
            const { handler } = h;
            const { context } = h;
            handler.apply(context, [e]);
          }
        }
      }
    },
    _removeHandler(ele, handler, context) {
      const handlers = ele.__z_resizeListeners;
      if (handlers) {
        const size = handlers.length;
        for (let i = 0; i < size; i++) {
          const h = handlers[i];
          if (h.handler === handler && h.context === context) {
            handlers.splice(i, 1);
            return;
          }
        }
      }
    },
    _createResizeTrigger(ele) {
      const obj = document.createElement('object');
      obj.setAttribute(
        'style',
        'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;',
      );
      obj.onload = EleResize._handleObjectLoad;
      obj.type = 'text/html';
      ele.appendChild(obj);
      obj.data = 'about:blank';
      return obj;
    },
    _handleObjectLoad(evt) {
      this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
      this.contentDocument.defaultView.addEventListener('resize', EleResize._handleResize);
    },
  };
  if (document.attachEvent) {
    // ie9-10
    EleResize.on = function(ele, handler, context) {
      let handlers = ele.__z_resizeListeners;
      if (!handlers) {
        handlers = [];
        ele.__z_resizeListeners = handlers;
        ele.__resizeTrigger__ = ele;
        ele.attachEvent('onresize', EleResize._handleResize);
      }
      handlers.push({
        handler,
        context,
      });
    };
    EleResize.off = function(ele, handler, context) {
      const handlers = ele.__z_resizeListeners;
      if (handlers) {
        EleResize._removeHandler(ele, handler, context);
        if (handlers.length === 0) {
          ele.detachEvent('onresize', EleResize._handleResize);
          delete ele.__z_resizeListeners;
        }
      }
    };
  } else {
    EleResize.on = function(ele, handler, context) {
      let handlers = ele.__z_resizeListeners;
      if (!handlers) {
        handlers = [];
        ele.__z_resizeListeners = handlers;

        if (getComputedStyle(ele, null).position === 'static') {
          ele.style.position = 'relative';
        }
        const obj = EleResize._createResizeTrigger(ele);
        ele.__resizeTrigger__ = obj;
        obj.__resizeElement__ = ele;
      }
      handlers.push({
        handler,
        context,
      });
    };
    EleResize.off = function(ele, handler, context) {
      const handlers = ele.__z_resizeListeners;
      if (handlers) {
        EleResize._removeHandler(ele, handler, context);
        if (handlers.length === 0) {
          const trigger = ele.__resizeTrigger__;
          if (trigger) {
            trigger.contentDocument.defaultView.removeEventListener('resize', EleResize._handleResize);
            ele.removeChild(trigger);
            delete ele.__resizeTrigger__;
          }
          delete ele.__z_resizeListeners;
        }
      }
    };
  }
  return EleResize;
}
/**
 * 获取指定dom文本行数
 * @param {Object} el 需要查询的 dom 节点
 * @returns {number} 行数
 */
function computedLines(el) {
  const height = parseFloat(el.offsetHeight);
  let lineHeight = window.getComputedStyle(el).getPropertyValue('line-height');
  const fontSize = parseFloat(window.getComputedStyle(el).getPropertyValue('font-size'));
  let signleLineHeight = lineHeight;
  if (Number.isNaN(parseFloat(lineHeight))) {
    // 1.3846 是在chrome上手工测试的默认行高
    lineHeight = 1.3846;
    signleLineHeight = fontSize * lineHeight;
  } else if (lineHeight.indexOf('px') === -1) {
    signleLineHeight = fontSize * lineHeight;
  }
  return Math.round(height / signleLineHeight);
}

/**
 * 将输入框焦点移至文本末尾
 * @param {HTMLElement} dom 要获取焦点的dom
 */
function moveFocusToEnd(dom) {
  const range = document.createRange();
  range.selectNodeContents(dom);
  range.collapse(false);
  const sel = window.getSelection();
  // 判断光标位置，如不需要可删除
  if (sel.anchorOffset !== 0) {
    return;
  }
  sel.removeAllRanges();
  sel.addRange(range);
}

export default {
  getElementLeft,
  getElementTop,
  domResizeListener,
  computedLines,
  moveFocusToEnd,
};
