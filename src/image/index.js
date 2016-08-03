import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { theme } from '../config';
import LazyLoad from '../lazyLoad';

class Image extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string,
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onVisibale: PropTypes.func,
    alt: PropTypes.string,
  }
  static defaultProps = {
    className: '',
    alt: '',
    theme,
  }
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onVisibale = this.onVisibale.bind(this);
    this.state = {
      sState: 'normal',
      visiable: false,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visiable;
  }
  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick.call(this, e);
    }
  }
  onMouseOver(e) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver.call(this, e);
    }
  }
  onMouseEnter(e) {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter.call(this, e);
    }
  }
  onMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave.call(this, e);
    }
  }
  // LazyLoad 调用
  onVisibale() {
    this.setState({
      visiable: true,
    });
  }
  render() {
    const { theme, className, src, alt } = this.props;
    const { sState, visiable } = this.state;
    const placeholder = this.props.placeholder ? this.props.placeholder : undefined;
    const componentCN = 'image';
    const containerCN = classNames({
      [className]: !!className,
      [`${theme}__pure__${componentCN}`]: true,
      [`${theme}__pure__${componentCN}--${sState}`]: !!sState,
    });
    const imgAttributes = {
      src: visiable ? src : placeholder,
      onClick: this.onClick,
      onMouseOver: this.onMouseOver,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      ref: el => this.image = el, // eslint-disable-line
    };
    return (
      <LazyLoad onVisibale={this.onVisibale} className={containerCN}>
        <img {...imgAttributes} alt={alt} />
      </LazyLoad>
    );
  }
}

export default Image;
