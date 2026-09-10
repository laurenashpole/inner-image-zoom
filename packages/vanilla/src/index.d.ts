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

interface InnerImageZoom {
  $closeButton: HTMLElement | null;
  $container: HTMLElement;
  $el: HTMLElement;
  $hint: HTMLElement | null;
  $img: HTMLElement;
  $portal: HTMLElement | null;
  $zoomImg: HTMLElement;
  reinit(options?: InnerImageZoomOptions): void;
  uninit(): void;
}

interface InnerImageZoomConstructor {
  new (
    selector?: string,
    options?: InnerImageZoomOptions
  ): InnerImageZoom | InnerImageZoom[];
  prototype: InnerImageZoom;
}

declare const InnerImageZoom: InnerImageZoomConstructor;
