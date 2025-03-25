import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const FullscreenPortal = ({ children }) => {
  const [portal] = useState(() => {
    const el = document.createElement('div');
    el.classList.add('iiz__zoom-portal');
    return el;
  });

  useEffect(() => {
    document.body.appendChild(portal);
    return () => document.body.removeChild(portal);
  }, [portal]);

  return createPortal(children, portal);
};

export default FullscreenPortal;
