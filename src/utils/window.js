/*
* getStyle 获取某个元素的 css 属性值
* @param {element}
* @param {string} prop 属性
*/
export const getStyle = (element, prop) => {
  typeof getComputedStyle !== 'undefined' ? getComputedStyle(element, null)[prop] : element.currentStyle[prop];
};

/*
* getScrollParent 根据元素获取其滚动的容器
* @param {element}
*/
export const getParentNode = (element) => {
  if (!(element instanceof HTMLElement) || !parent.parentNode) {
    return window;
  }
  const overflow = (element) => {
    getStyle(parent, 'overflow') + getStyle(parent, 'overflow-x') + getStyle(parent, 'overflow-y')
  }
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
  return parent
}

export const getScrollValue = () => {
  const isSupportPageOffset = typeof window.pageYOffset == 'number';
  const documentElement = document.body || document.documentElement;
  return {
    pageYOffset: isSupportPageOffset ? window.pageYOffset : documentElement.scrollTop,
    pageXOffset: isSupportPageOffset ? window.pageXOffset : documentElement.scrollLeft,
  }
}

/*
* 获取元素相对 document 的定位
*/
export const getElementPosition = (element) => {
  const rect = element.getBoundingClientRect();
  const scrollObj = getScrollValue();
  return {
    top: rect.top + scrollObj.pageYOffset,
    left: rect.left + scrollObj.pageXOffset,
    right: rect.right + scrollObj.pageXOffset,
    bottom: rect.bottom + scrollObj.pageYOffset,
  }
}
/*
* isDisplayNone 判断元素的在页面中不存在
*/
export const isDisplayNone = (element) => {
  return element.offsetParent === null
}
/*
* isInView 判断元素是否在 container 可视区
* @param {element}
*/
export const isInViewport = (element, container=window) => {
  if (isDisplayNone(element)) return false;
  const containerPosition = getElementPosition(container);
  const elementPosition = getElementPosition(element);
  return (
    elementPosition.top <= container.bottom &&
    elementPosition.right >= container.left ||
    elementPosition.left <= container.right &&
    elementPosition.bottom >= container.top
  );
}
