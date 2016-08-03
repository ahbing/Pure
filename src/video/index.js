import React, { PropTypes } from 'react';
import { theme } from '../config';
import classNames from 'classnames';

import LazyLoad from '../lazyLoad';

class Video extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onVisibale: PropTypes.func,
  }
  static defaultProps = {
    className: '',
    autoPlay: false,
    loop: false,
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
  onVisibale() {
    this.setState({
      visiable: true,
    });
  }
  render() {
    const { theme, className, autoPlay, loop, src } = this.props;
    const { sState, visiable } = this.state;
    const componentCN = 'video';
    const containerCN = classNames({
      [className]: !!className,
      [`${theme}__pure__${componentCN}`]: true,
      [`${theme}__pure__${componentCN}--${sState}`]: !!sState,
    });
    const videoAttributes = {
      autoPlay,
      loop,
      src: visiable ? src : undefined,
      onClick: this.onClick,
      onMouseOver: this.onMouseOver,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      ref: el => this.video = el, // eslint-disable-line
    };
    return (
      <LazyLoad onVisibale={this.onVisibale} className={containerCN}>
        <video {...videoAttributes} />
      </LazyLoad>
    );
  }
}
export default Video;
