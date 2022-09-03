export function getBounds(img, isFullscreen) {
  if (isFullscreen) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      left: 0,
      top: 0
    };
  }

  return img.getBoundingClientRect();
}

export function getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint) {
  return fullscreenOnMobile && window.matchMedia && window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches;
}

export function getImgPropsDefaults() {
  return {
    onLoadCallback: null,
    bounds: {},
    offsets: {},
    ratios: {},
    eventPosition: {},
    scaledDimensions: {}
  };
}

export function getOffsets(pageX, pageY, left, top) {
  return {
    x: pageX - left,
    y: pageY - top
  };
}

export function getRatios(bounds, dimensions) {
  return {
    x: (dimensions.width - bounds.width) / bounds.width,
    y: (dimensions.height - bounds.height) / bounds.height
  };
}

export function getScaledDimensions(zoomImg, zoomScale) {
  return {
    width: zoomImg.naturalWidth * zoomScale,
    height: zoomImg.naturalHeight * zoomScale
  };
}
