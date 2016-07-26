/*
* getStyle 获取某个元素的 css 属性值
* @param {element}
* @param {string} prop 属性
*/
export const getStyle = (element, prop) => {
  if (typeof getComputedStyle !== 'undefined') {
    return getComputedStyle(element, null)[prop];
  }
  return element.currentStyle[prop];
};

/*
* getScrollParent 根据元素获取其滚动的容器
* @param {element}
*/
export const getParentNode = (element) => {
  if (!(element instanceof HTMLElement)) {
    return window;
  }
  const overflow = (ele) => {
    const getAttrStr = attr => getStyle(ele, attr);
    return getAttrStr('overflow') + getAttrStr('overflow-x') + getAttrStr('overflow-y');
  };

  let parent = element;
  while (parent) {
    if (parent === (document.body || document.documentElement)) {
      break;
    }
    if (!parent.parentNode) {
      break;
    }
    if (/(auto|scroll)/.test(overflow(parent))) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return window;
};

export const getScrollValue = () => {
  const isSupportPageOffset = typeof window.pageYOffset === 'number';
  const documentElement = document.body || document.documentElement;
  return {
    pageYOffset: isSupportPageOffset ? window.pageYOffset : documentElement.scrollTop,
    pageXOffset: isSupportPageOffset ? window.pageXOffset : documentElement.scrollLeft,
  };
};

/*
* 获取元素相对 document 的定位
*/
export const getElementPosition = (element) => {
  const scrollObj = getScrollValue();
  let rect;
  if (element instanceof HTMLElement) {
    rect = element.getBoundingClientRect();
  } else {
    // 当作 window 处理
    rect = {
      top: scrollObj.pageYOffset,
      left: scrollObj.pageXOffset,
      right: scrollObj.pageXOffset + window.innerWidth,
      bottom: scrollObj.pageYOffset + window.innerHeight,
    };
  }
  return {
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
  };
};
/*
* isDisplayNone 判断元素的在页面中不存在
*/
export const isDisplayNone = (element) => element.offsetParent === null;
/*
* isInView 判断元素是否在 container 可视区
* @param {element}
*/
export const isInViewport = (element, container = window) => {
  if (!((element || container) instanceof HTMLElement)) {
    throw new Error(' node and eventNode should be a HTMLElement');
  }
  if (isDisplayNone(element)) return false;
  const containerPosition = getElementPosition(container);
  const elementPosition = getElementPosition(element);
  return (
    elementPosition.top <= containerPosition.bottom &&
    elementPosition.right >= containerPosition.left &&
    elementPosition.left <= containerPosition.right &&
    elementPosition.bottom >= containerPosition.top
  );
};
