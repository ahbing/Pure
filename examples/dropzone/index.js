import React, { Component } from 'react';
import { render } from 'react-dom';
import { Dropzone } from '../../src/';

render(
  <Dropzone className='my-dropzone' autoUpload={false} accept='image/*'/>,
  document.getElementById('root')
);
