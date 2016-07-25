import React, { PropTypes } from 'react';
import { Children } from 'react-dom';
import { getParentNode, isInViewport } from '../utils/winodw.js'

class LazyLoad extends React.Component {
  static PropTypes = {
    className: PropTypes.string,
    onVisibale: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      visiable: fasle
    }
  }
  componentDidMount() {
    const eventNode = this.getEventNode();
    this.lazyLoadHandler();
    window.addEventListener('resize', this.lazyLoadHandler, false);
    eventNode.addEventListener('scroll', this.lazyLoadHandler, false);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visiable;
  }
  componentWillUnmount() {
    this.detachEventListener();
  }
  lazyLoadHandler() {
    const node = this.lazyLoadContainer;
    const eventNode = this.getEventNode();
    const { onVisibale } = this.props;
    if (isInViewport(node, eventNode)) {
      this.setState({ visiable: true });
      this.detachEventListener();
      if (onVisibale) {
        // 执行用户函数
        onVisibale();
      }
    }
  }
  detachEventListener() {
    const eventNode = this.getEventNode();
    window.removeEventListener('resize', this.lazyLoadHandler, false);
    eventNode.removeEventListener('scroll', this.lazyLoadHandler, false);
  }
  getEventNode() {
    return getParentNode(this.lazyLoadContainer);
  }
  render() {
    const { children } = this.props;
    const { visiable } = this.state;
    const lazyLoadAttributes = {
      ref: c => this.lazyLoadContainer = c,
    };
    const childrenWithProp = React.cloneElement(child, {
      visiable,
    });
    return (
      <div {...lazyLoadAttributes}>
        { visiable && Children.only(childrenWithProp) }
      </div>
    )
  }
}
