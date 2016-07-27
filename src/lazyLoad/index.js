import React, { PropTypes, Children } from 'react';
import { getParentNode, isInViewport } from '../utils/window';

class LazyLoad extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onVisibale: PropTypes.func,
    children: PropTypes.node,
  }
  constructor(props) {
    super(props);
    this.lazyLoadHandler = this.lazyLoadHandler.bind(this);
    this.state = {
      visiable: false,
    };
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
  getEventNode() {
    return getParentNode(this.lazyLoadContainer);
  }
  detachEventListener() {
    const eventNode = this.getEventNode();
    window.removeEventListener('resize', this.lazyLoadHandler, false);
    eventNode.removeEventListener('scroll', this.lazyLoadHandler, false);
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
  render() {
    const { children, className } = this.props;
    const { visiable } = this.state;
    const lazyLoadAttributes = {
      className,
      ref: el => this.lazyLoadContainer = el, // eslint-disable-line
    };
    return (
      <div {...lazyLoadAttributes}>
        {visiable && Children.only(children)}
      </div>
    );
  }
}
export default LazyLoad;
