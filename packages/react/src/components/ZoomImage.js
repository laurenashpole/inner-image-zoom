import React, { Fragment } from 'react';

const ZoomImage = ({ src, fadeDuration, top, left, isZoomed, onLoad, onDragStart, onDragEnd, onClose, onFadeOut }) => {
  return (
    <Fragment>
      <img
        className={`iiz__zoom-img ${isZoomed ? 'iiz__zoom-img--visible' : ''}`}
        style={{
          top: top,
          left: left,
          transition: `opacity ${fadeDuration}ms linear, visibility ${fadeDuration}ms linear`
        }}
        src={src}
        onLoad={onLoad}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onTransitionEnd={onFadeOut}
        draggable="false"
        alt=""
      />

      {onClose && (
        <button
          className={`iiz__btn iiz__close ${isZoomed ? 'iiz__close--visible' : ''}`}
          style={{
            transition: `opacity ${fadeDuration}ms linear, visibility ${fadeDuration}ms linear`
          }}
          onClick={onClose}
          aria-label="Zoom Out"
        />
      )}
    </Fragment>
  );
};

export default ZoomImage;
