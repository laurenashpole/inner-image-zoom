import React, { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const FullscreenPortal = forwardRef(({ children }, ref) => {
  const [portal] = useState(() => {
    const el = document.createElement('div');
    el.classList.add('iiz__zoom-portal');
    return el;
  });

  useEffect(() => {
    document.body.appendChild(portal);
    return () => document.body.removeChild(portal);
  }, [portal]);

  return createPortal(<div ref={ref}>{children}</div>, portal);
});

FullscreenPortal.displayName = 'FullscreenPortal';

export default FullscreenPortal;
