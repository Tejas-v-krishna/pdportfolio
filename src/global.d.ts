interface Window {
  lenis: (import('lenis').default & {
    version?: string;
    horizontal?: boolean;
    snap?: boolean;
    touch?: boolean;
  }) | null;
}
