import { forwardRef } from 'react';

const TVKLogo = forwardRef<SVGPathElement, React.SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg width="125" height="125" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        ref={ref}
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 38 H52 M37 38 V87 M55 48 L68 87 L82 48 M87 48 V87 M87 67 L103 48 M87 67 L103 87" 
      />
    </svg>
  );
});

TVKLogo.displayName = "TVKLogo";
export default TVKLogo;
