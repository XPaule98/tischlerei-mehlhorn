// Type declarations for @google/model-viewer web component
declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        "auto-rotate"?: boolean | string;
        "camera-controls"?: boolean | string;
        "shadow-intensity"?: string;
        exposure?: string;
        ar?: boolean | string;
        "ar-modes"?: string;
        poster?: string;
        "environment-image"?: string;
        "skybox-image"?: string;
      },
      HTMLElement
    >;
  }
}
