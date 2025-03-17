import React from 'react';
import InnerImageZoom from '../../packages/react/src';
import '../../packages/react/src/styles.css';

const App = () => (
  <>
    <h1>react-inner-image-zoom Sandbox</h1>

    <div style={{ marginBottom: '30px' }}>
      <h2>Pan Example</h2>

      <InnerImageZoom
        src="https://images.unsplash.com/photo-1547894233-3b986939e29c?fit=crop&w=750&q=80"
        zoomSrc="https://images.unsplash.com/photo-1547894233-3b986939e29c?fit=crop&w=1500&q=80"
        fullscreenOnMobile={true}
        hideCloseButton={false}
        zoomType="hover"
        zoomPreload={true}
        imgAttributes={{
          src: 'test',
          'data-key': 'value',
          title: 'Title',
          alt: '',
          height: 1000,
          onLoad: () => console.log('Original image loaded')
        }}
      />
    </div>
  </>
);

export default App;
