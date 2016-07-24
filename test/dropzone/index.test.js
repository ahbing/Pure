import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Dropzone } from '../';

describe('<Dropzone /> use default props', () => {
  it('should contains <input type="file" multiple> element', () => {
    const wrapper = mount(<Dropzone />);
    expect(wrapper.containsAnyMatchingElements([<input type="file" multiple />])).to.equal(true);
    expect(wrapper.find('input[type="file"]')).length.to.be(1);
  });
  it('default props', () => {
    const wrapper = mount(<Dropzone />);
    expect(wrapper.props().className).to.equal('');
    expect(wrapper.props().multiple).to.equal(true);
    expect(wrapper.props().autoUpload).to.equal(true);
    expect(wrapper.props().disabled).to.equal(false);
    expect(wrapper.state().sState).to.equal('normal');
    expect(wrapper.state().infoMsg).to.equal('');
  });
});
describe('<Dropzone {...props}/> set props', () => {
  it('set dropzone theme', () => {
    const wrapper = shallow(<Dropzone />);
    wrapper.setProps({ theme: 'xiang' });
    expect(wrapper.find('.xiang_Dropzone')).to.have.length(1);
    expect(wrapper.find('.xiang_Dropzone-normal')).to.have.length(1);
    wrapper.setProps({ className: 'lan' });
    expect(wrapper.find('.lan')).to.have.length(1);
    expect(wrapper.find('.xiang_Dropzone')).to.have.length(1);
    wrapper.setState({ sState: 'disabled' });
    expect(wrapper.find('.xiang_Dropzone-normal')).to.have.length(0);
    expect(wrapper.find('.xiang_Dropzone-disabled')).to.have.length(1);
  });
});
