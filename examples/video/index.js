import React, { Component } from 'react';
import { render } from 'react-dom';
import { Video, LazyLoad } from '../../src/index';

render(
  <Video src="http://www.w3school.com.cn/i/movie.ogg" className='my-video'/>,
  document.getElementById('root')
);
