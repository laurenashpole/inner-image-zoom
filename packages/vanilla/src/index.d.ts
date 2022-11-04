export as namespace InnerImageZoom;

export = InnerImageZoom

declare class InnerImageZoom {
  constructor(
    selector?: string | undefined,
    options?: {
      moveType?: 'pan' | 'drag' | undefined;
      zoomType?: 'click' | 'hover' | undefined;
      zoomSrc?: string | undefined;
      zoomScale?: number | undefined;
      zoomPreload?: boolean | undefined;
      fadeDuration?: number | undefined;
      fullscreenOnMobile?: boolean | undefined;
      mobileBreakpoint?: number | undefined;
      hideCloseButton?: boolean | undefined;
      hideHint?: boolean | undefined;
      afterZoomIn?: (() => void) | undefined;
      afterZoomOut?: (() => void) | undefined;
    }
  );
}
