export function getEventCoords(e) {
  return {
    x: typeof e.pageX === 'number' ? e.pageX : e.changedTouches[0].pageX,
    y: typeof e.pageY === 'number' ? e.pageY : e.changedTouches[0].pageY
  };
}

export function getInitialDragCoords(e, imgProps, isFullscreen) {
  const pageX = (e.pageX - (window.pageXOffset + imgProps.bounds.left)) * -imgProps.ratios.x;
  const pageY = (e.pageY - (window.pageYOffset + imgProps.bounds.top)) * -imgProps.ratios.y;

  return {
    pageX: pageX + (isFullscreen ? (window.innerWidth - imgProps.bounds.width) / 2 : 0),
    pageY: pageY + (isFullscreen ? (window.innerHeight - imgProps.bounds.height) / 2 : 0)
  };
}

export function getIsValidDrag(e, imgProps) {
  const moveX = Math.abs(e.pageX - imgProps.eventPosition.x);
  const moveY = Math.abs(e.pageY - imgProps.eventPosition.y);
  return moveX > 5 || moveY > 5;
}

export function getMouseMovePositions(e, imgProps) {
  const coords = getMoveCoords(e, imgProps);

  return {
    left: Math.max(Math.min(coords.x, imgProps.bounds.width), 0) * -imgProps.ratios.x,
    top: Math.max(Math.min(coords.y, imgProps.bounds.height), 0) * -imgProps.ratios.y
  };
}

export function getDragMovePositions(e, imgProps) {
  const coords = getMoveCoords(e, imgProps);

  return {
    left: Math.max(Math.min(coords.x, 0), (imgProps.scaledDimensions.width - imgProps.bounds.width) * -1),
    top: Math.max(Math.min(coords.y, 0), (imgProps.scaledDimensions.height - imgProps.bounds.height) * -1)
  };
}

function getMoveCoords(e, imgProps) {
  const coords = getEventCoords(e);

  return {
    x: coords.x - imgProps.offsets.x,
    y: coords.y - imgProps.offsets.y
  };
}
