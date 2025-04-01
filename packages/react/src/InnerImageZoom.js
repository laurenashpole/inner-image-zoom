import React, { forwardRef, Fragment, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Image from './components/Image';
import ZoomImage from './components/ZoomImage';
import FullscreenPortal from './components/FullscreenPortal';
import {
  getBounds,
  getFullscreenStatus,
  getImgPropsDefaults,
  getOffsets,
  getRatios,
  getScaledDimensions
} from 'inner-image-zoom/src/utils/images';
import {
  getDragMovePositions,
  getEventCoords,
  getInitialDragCoords,
  getIsValidDrag,
  getMouseMovePositions
} from 'inner-image-zoom/src/utils/events';

const InnerImageZoom = forwardRef(
  (
    {
      moveType = 'pan',
      zoomType = 'click',
      src,
      sources,
      width,
      height,
      hasSpacer,
      imgAttributes = {},
      zoomSrc,
      zoomScale = 1,
      zoomPreload,
      fadeDuration = 150,
      fullscreenOnMobile,
      mobileBreakpoint = 640,
      hideCloseButton,
      hideHint,
      className,
      afterZoomIn,
      afterZoomOut
    },
    ref
  ) => {
    const container = useRef(null);
    const zoomImg = useRef(null);
    const portal = useRef(null);
    const imgProps = useRef({});
    const [isActive, setIsActive] = useState(zoomPreload);
    const [isTouch, setIsTouch] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isValidDrag, setIsValidDrag] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const [currentMoveType, setCurrentMoveType] = useState(moveType);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);

    const handleMouseEnter = (e) => {
      setIsActive(true);
      setIsFading(false);
      zoomType === 'hover' && !isZoomed && handleClick(e);
    };

    const handleTouchStart = () => {
      setIsTouch(true);
      setIsFullscreen(getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint));
      setCurrentMoveType('drag');
    };

    const handleClick = (e) => {
      if (isZoomed) {
        if (isTouch) {
          hideCloseButton && handleClose(e);
        } else {
          !isValidDrag && zoomOut();
        }

        return;
      }

      isTouch && setIsActive(true);

      if (zoomImg.current) {
        handleLoad({ target: zoomImg.current });
        zoomIn(e);
      } else {
        imgProps.current.onLoadCallback = zoomIn.bind(this, e);
      }
    };

    const handleLoad = (e) => {
      const scaledDimensions = getScaledDimensions(e.target, zoomScale);
      zoomImg.current = e.target;
      zoomImg.current.setAttribute('width', scaledDimensions.width);
      zoomImg.current.setAttribute('height', scaledDimensions.height);
      imgProps.current.scaledDimensions = scaledDimensions;
      imgProps.current.bounds = getBounds(container.current, false);
      imgProps.current.ratios = getRatios(imgProps.current.bounds, scaledDimensions);

      if (imgProps.current.onLoadCallback) {
        imgProps.current.onLoadCallback();
        imgProps.current.onLoadCallback = null;
      }
    };

    const handleMouseMove = (e) => {
      const positions = getMouseMovePositions(e, imgProps.current);
      setLeft(positions.left);
      setTop(positions.top);
    };

    const handleDragStart = (e) => {
      const coords = getEventCoords(e);
      imgProps.current.offsets = getOffsets(coords.x, coords.y, zoomImg.current.offsetLeft, zoomImg.current.offsetTop);
      setIsDragging(true);

      if (!isTouch) {
        imgProps.current.eventPosition = coords;
      }
    };

    const handleDragMove = useCallback((e) => {
      e.stopPropagation();
      const positions = getDragMovePositions(e, imgProps.current);
      setLeft(positions.left);
      setTop(positions.top);
    }, []);

    const handleDragEnd = (e) => {
      setIsDragging(false);

      if (!isTouch) {
        setIsValidDrag(getIsValidDrag(e, imgProps.current));
      }
    };

    const handleMouseLeave = (e) => {
      currentMoveType === 'drag' && isZoomed ? handleDragEnd(e) : handleClose(e);
    };

    const handleClose = (e) => {
      if (!(!isTouch && e.target.classList.contains('iiz__close'))) {
        if (!isZoomed || isFullscreen || !fadeDuration) {
          handleFadeOut({}, true);
        } else {
          setIsFading(true);
        }
      }

      zoomOut();
    };

    const handleFadeOut = (e, noTransition) => {
      if (noTransition || (e.propertyName === 'opacity' && container.current.contains(e.target))) {
        if ((zoomPreload && isTouch) || !zoomPreload) {
          zoomImg.current = null;
          imgProps.current = getImgPropsDefaults();
          setIsActive(false);
        }

        setIsTouch(false);
        setIsFullscreen(false);
        setCurrentMoveType(moveType);
        setIsFading(false);
      }
    };

    const initialMove = (e) => {
      imgProps.current.offsets = getOffsets(
        window.pageXOffset,
        window.pageYOffset,
        -imgProps.current.bounds.left,
        -imgProps.current.bounds.top
      );
      handleMouseMove(e);
    };

    const initialDrag = (e) => {
      const initialDragCoords = getInitialDragCoords(e, imgProps.current, isFullscreen);
      imgProps.current.bounds = getBounds(container.current, isFullscreen);
      imgProps.current.offsets = getOffsets(0, 0, 0, 0);

      handleDragMove({
        ...initialDragCoords,
        stopPropagation: () => {}
      });
    };

    const zoomIn = (e) => {
      setIsZoomed(true);
      currentMoveType === 'drag' ? initialDrag(e) : initialMove(e);
      afterZoomIn && afterZoomIn();
    };

    const zoomOut = () => {
      setIsZoomed(false);
      afterZoomOut && afterZoomOut();
    };

    const zoomImageProps = {
      src: zoomSrc || src,
      fadeDuration: isFullscreen ? 0 : fadeDuration,
      top,
      left,
      isZoomed,
      onLoad: handleLoad,
      onDragStart: currentMoveType === 'drag' ? handleDragStart : null,
      onDragEnd: currentMoveType === 'drag' ? handleDragEnd : null,
      onClose: !hideCloseButton && currentMoveType === 'drag' ? handleClose : null,
      onFadeOut: isFading ? handleFadeOut : null
    };

    useEffect(() => {
      imgProps.current = getImgPropsDefaults();
    }, []);

    useEffect(() => {
      getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint) && setIsActive(false);
    }, [fullscreenOnMobile, mobileBreakpoint]);

    useEffect(() => {
      if (!zoomImg.current) {
        return;
      }

      const eventType = isTouch ? 'touchmove' : 'mousemove';

      if (isDragging) {
        zoomImg.current.addEventListener(eventType, handleDragMove, { passive: true });
      } else {
        zoomImg.current.removeEventListener(eventType, handleDragMove);
      }
    }, [isDragging, isTouch, handleDragMove]);

    useImperativeHandle(ref, () => ({
      container: container.current,
      portal: portal.current
    }));

    return (
      <figure
        className={`iiz ${currentMoveType === 'drag' ? 'iiz--drag' : ''} ${className ? className : ''}`}
        style={{ width: width }}
        ref={container}
        onTouchStart={isZoomed ? null : handleTouchStart}
        onClick={handleClick}
        onMouseEnter={isTouch ? null : handleMouseEnter}
        onMouseMove={currentMoveType === 'drag' || !isZoomed ? null : handleMouseMove}
        onMouseLeave={isTouch ? null : handleMouseLeave}
      >
        <Image
          src={src}
          sources={sources}
          width={width}
          height={height}
          hasSpacer={hasSpacer}
          imgAttributes={imgAttributes}
          fadeDuration={fadeDuration}
          isZoomed={isZoomed}
        />

        {isActive && (
          <Fragment>
            {isFullscreen ? (
              <FullscreenPortal ref={portal}>
                <ZoomImage {...zoomImageProps} />
              </FullscreenPortal>
            ) : (
              <ZoomImage {...zoomImageProps} />
            )}
          </Fragment>
        )}

        {!hideHint && !isZoomed && <span className="iiz__btn iiz__hint"></span>}
      </figure>
    );
  }
);

InnerImageZoom.displayName = 'InnerImageZoom';

export default InnerImageZoom;
