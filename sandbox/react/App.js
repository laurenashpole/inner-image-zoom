import React, { useRef } from 'react';
import '../../packages/react/src/styles.css';
import Demo from './Demo';

const App = () => {
  const ref = useRef();

  const handleZoom = () => {
    console.log('ref', ref.current);
  };

  return (
    <main>
      <h1>react-inner-image-zoom Sandbox</h1>

      <div>
        <h2>Pan Demo</h2>

        <Demo
          src="https://images.unsplash.com/photo-1630525037424-fc736b4fda86?fit=crop&w=750&q=80"
          zoomSrc="https://images.unsplash.com/photo-1630525037424-fc736b4fda86?fit=crop&w=1500&q=80"
          fullscreenOnMobile={true}
          imgAttributes={{
            title: 'Title',
            alt: 'Alt text',
            onLoad: () => console.log('Original image loaded'),
            'data-attribute': 'Data'
          }}
          ref={ref}
          afterZoomIn={handleZoom}
        />
      </div>

      <div>
        <h2>Drag Demo</h2>

        <Demo
          src="https://images.unsplash.com/photo-1622474413687-09fb95304d18?fit=crop&w=750&q=80"
          zoomSrc="https://images.unsplash.com/photo-1622474413687-09fb95304d18?fit=crop&w=1500&q=80"
          hideCloseButton={true}
          moveType="drag"
          zoomPreload={true}
          imgAttributes={{
            alt: 'Alt text'
          }}
        />
      </div>

      <div>
        <h2>Zoom on Hover Demo</h2>

        <Demo
          src="https://images.unsplash.com/photo-1547894233-3b986939e29c?fit=crop&w=750&q=80"
          zoomSrc="https://images.unsplash.com/photo-1547894233-3b986939e29c?fit=crop&w=1500&q=80"
          fullscreenOnMobile={true}
          hideHint={true}
          zoomPreload={true}
          zoomType="hover"
          imgAttributes={{
            alt: 'Alt text'
          }}
        />
      </div>
    </main>
  );
};

export default App;
