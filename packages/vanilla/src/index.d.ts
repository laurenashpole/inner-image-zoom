export as namespace InnerImageZoom;

export = InnerImageZoom;

interface InnerImageZoomOptions {
  zoomSrc?: string;
  zoomScale?: number;
  zoomPreload?: boolean;
  moveType?: 'pan' | 'drag';
  zoomType?: 'click' | 'hover';
  fadeDuration?: number;
  fullscreenOnMobile?: boolean;
  mobileBreakpoint?: number;
  hideCloseButton?: boolean;
  hideHint?: boolean;
  afterZoomIn?: () => void;
  afterZoomOut?: () => void;
}

declare class InnerImageZoom {
  constructor(
    selector?: string,
    options?: InnerImageZoomOptions
  )

  reinit(options?: InnerImageZoomOptions): void;
  uninit(): void;
}
