import { DefineComponent } from 'vue';

export interface InnerImageZoomProps {
  moveType?: "pan" | "drag" | undefined;
  zoomType?: "click" | "hover" | undefined;
  src: string;
  sources?: Array<{
    srcSet?: string;
    media?: string;
    sizes?: string;
    type?: string;
  }>;
  width?: number | undefined;
  height?: number | undefined;
  hasSpacer?: boolean | undefined;
  imgAttributes?: Record<string, unknown>;
  zoomSrc?: string | undefined;
  zoomScale?: number | undefined;
  zoomPreload?: boolean | undefined;
  fadeDuration?: number | undefined;
  fullscreenOnMobile?: boolean | undefined;
  mobileBreakpoint?: number | undefined;
  hideCloseButton?: boolean | undefined;
  hideHint?: boolean | undefined;
  className?: string | undefined;
  afterZoomIn?: (() => void) | undefined;
  afterZoomOut?: (() => void) | undefined;
}

declare const InnerImageZoom: DefineComponent<InnerImageZoomProps>
export default InnerImageZoom;
