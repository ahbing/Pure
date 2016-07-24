/* eslint prefer-template: 0 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import accepts from 'attr-accept';
import request from 'superagent';

class Dropzone extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    accept: PropTypes.string,
    // preview: PropTypes.bool,
    autoUpload: PropTypes.bool,
    action: PropTypes.string,
    // name: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    disabled: PropTypes.bool,
    onDroped: PropTypes.func,
    dropEffect: PropTypes.string,
  }
  static defaultProps = {
    theme: 'lan',
    className: '',
    multiple: true,
    // preview: true,
    accept: '',
    autoUpload: true,
    disabled: false,
    dropEffect: 'move',
  }
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      sState: 'normal',
      infoMsg: '',
    };
  }
  onClick(e) {
    e.preventDefault();
    if (!this.props.disabled) {
      this.open();
    }
  }
  onDragEnter(e) {
    e.preventDefault();
    if (this.props.disabled) {
      this.updateInfoState('disabled', '不支持拖动');
    }
  }
  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  onDragLeave(e) {
    e.preventDefault();
    this.updateInfoState('normal', '');
  }
  onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const max = this.props.multiple ? dropedFiles.length : Math.min(dropedFiles.length, 1);
    const files = Array(max);
    for (let i = 0; i < max; i++) {
      files[i] = dropedFiles[i];
    }
    if (this.isFilesAccepted(files)) {
      files.map(file => file.preview = window.URL.createObjectURL(file)); // eslint-disable-line
      if (this.props.onDroped) {
        this.props.onDroped.call(this, files, e);
      }
      // @todo 释放 ObjectURL
      this.upload(files);
    } else {
      this.updateInfoState('warning', '拖动文件，含有非法格式的文件。');
    }
  }
  isFilesAccepted(files) {
    for (let i = 0, len = files.length; i < len; i++) {
      if (!accepts(files[i], this.props.accept)) return false;
    }
    return true;
  }
  open() {
    this.fileInput.value = null;
    this.fileInput.click();
  }
  updateInfoState(sState, infoMsg) {
    this.setState({
      sState,
      infoMsg,
    });
  }
  upload(files) {
    if (this.props.autoUpload) {
      if (!this.props.action) {
        throw new Error('上传文件时，没有找到 action 配置！');
      }
      this.updateInfoState('processing', '文件正在上传...');
      const req = request.post(this.props.action);
      files.forEach((file) => {
        req.attach(file.name, file);
      });
      req.set('Accept', this.props.accept);
      req.end((err, res) => {
        if (err) {
          this.updateInfoState('error', `文件上传失败:${err}`);
          if (this.props.onError) {
            this.props.onError.call(this, err);
          }
        }
        this.updateInfoState('success', '文件上传成功');
        if (this.props.onSuccess) {
          this.props.onSuccess.call(this, res);
        }
      });
    }
  }
  render() {
    const componentName = 'Dropzone';
    const { className, theme, multiple } = this.props;
    const { sState } = this.state;
    const containerCN = classNames({
      [className]: !!className, // 外部用户提供的 className，其控制的样式应仅仅只是布局样式
      [`${theme}_${componentName}`]: true, // 控制内部元素的布局，尺寸等等
      [`${theme}_${componentName}-${sState}`]: !!sState, // 控制内部元素的颜色，背景， 边框， 阴影等等
    });
    const inputAttribute = {
      type: 'file',
      multiple,
      ref: el => this.fileInput = el, // eslint-disable-line
      onChange: this.onDrop,
    };
    // 根据不同的文件内容类型提供 <Tag/>
    // 内部状态改变提供 stateHook 样式状态
      // 禁用，正在处理，成功，失败，空闲...  对应 lan 的状态处理
    return (
      <div
        className={containerCN}
        onClick={this.onClick}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        <input {...inputAttribute} />
      </div>
    );
  }
}

export default Dropzone;
