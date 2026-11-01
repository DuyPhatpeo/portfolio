import React from "react";

type IconProps = {
  className?: string;
  style?: React.CSSProperties;
};

// Official new CSS logo (2024 W3C / CSS-Next rebeccapurple #663399 rounded badge)
export const CssNewIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className={className ?? "w-8 h-8"}
    role="img"
    aria-label="CSS"
  >
    <rect width="128" height="128" rx="22" fill="#663399" />
    <path
      fill="#FFFFFF"
      d="M52.8 88.2c0 8.9-6.6 14.8-16.2 14.8-9.8 0-16.8-6.7-16.8-16.7s7-16.7 16.8-16.7c9.4 0 15.8 5.6 16.2 14.2h-8.5c-.4-3.9-3.3-6.6-7.7-6.6-5.1 0-8.4 3.6-8.4 9.1s3.3 9.1 8.4 9.1c4.5 0 7.4-2.8 7.7-7.2h8.5Zm33.8 4.4c0 6.5-5.7 10.4-14.6 10.4-8.8 0-14.8-4.1-15.2-10.7h8.2c.4 2.7 3 4.3 7.1 4.3 3.9 0 6.3-1.4 6.3-3.5 0-2-1.8-3-6.2-3.8l-3.7-.7c-7.1-1.3-10.8-4.3-10.8-9.6 0-6.1 5.4-9.9 13.8-9.9 8.3 0 13.8 3.9 14.2 10.1h-8c-.4-2.4-2.6-3.8-6.3-3.8-3.5 0-5.6 1.3-5.6 3.3 0 1.8 1.6 2.8 5.7 3.6l3.8.7c7.6 1.4 11.3 4.2 11.3 9.6Zm32.4 0c0 6.5-5.7 10.4-14.6 10.4-8.8 0-14.8-4.1-15.2-10.7h8.2c.4 2.7 3 4.3 7.1 4.3 3.9 0 6.3-1.4 6.3-3.5 0-2-1.8-3-6.2-3.8l-3.7-.7c-7.1-1.3-10.8-4.3-10.8-9.6 0-6.1 5.4-9.9 13.8-9.9 8.3 0 13.8 3.9 14.2 10.1h-8c-.4-2.4-2.6-3.8-6.3-3.8-3.5 0-5.6 1.3-5.6 3.3 0 1.8 1.6 2.8 5.7 3.6l3.8.7c7.6 1.4 11.3 4.2 11.3 9.6Z"
    />
  </svg>
);

// Official Motion (Framer Motion rebrand — motion.dev) yellow mark
export const FramerMotionIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1103 386"
    className={className ?? "w-8 h-8"}
    role="img"
    aria-label="Framer Motion"
  >
    <path
      fill="#FFF312"
      d="M416.473 0 198.54 385.66H0L170.17 84.522C196.549 37.842 262.377 0 317.203 0Zm486.875 96.415c0-53.249 44.444-96.415 99.27-96.415 54.826 0 99.27 43.166 99.27 96.415 0 53.248-44.444 96.415-99.27 96.415-54.826 0-99.27-43.167-99.27-96.415ZM453.699 0h198.54L434.306 385.66h-198.54Zm234.492 0h198.542L716.56 301.138c-26.378 46.68-92.207 84.522-147.032 84.522h-99.27Z"
    />
  </svg>
);

// Official 2024 Google Firebase ribbon-flame logo
export const FirebaseIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 600"
    className={className ?? "w-8 h-8"}
    role="img"
    aria-label="Firebase"
  >
    <path
      d="M213.918 560.499C237.166 569.856 262.387 575.408 288.87 576.333C324.71 577.585 358.792 570.175 389.261 556.099C352.724 541.744 319.634 520.751 291.392 494.651C273.086 523.961 246.01 547.113 213.918 560.499Z"
      fill="#FF9100"
    />
    <path
      d="M291.389 494.66C226.923 435.038 187.815 348.743 191.12 254.092C191.228 251.019 191.39 247.947 191.58 244.876C180.034 241.89 167.98 240.068 155.576 239.635C137.821 239.015 120.626 241.217 104.393 245.788C87.1838 275.933 76.7989 310.521 75.5051 347.569C72.1663 443.18 130.027 526.723 213.914 560.508C246.007 547.121 273.082 523.998 291.389 494.66Z"
      fill="#FFC400"
    />
    <path
      d="M291.39 494.657C306.378 470.671 315.465 442.551 316.523 412.254C319.306 332.559 265.731 264.003 191.581 244.873C191.391 247.944 191.229 251.016 191.121 254.089C187.816 348.74 226.924 435.035 291.39 494.657Z"
      fill="#FF9100"
    />
    <path
      d="M308.231 20.8584C266 54.6908 232.652 99.302 212.475 150.693C200.924 180.129 193.665 211.748 191.546 244.893C265.696 264.023 319.272 332.579 316.489 412.273C315.431 442.57 306.317 470.663 291.355 494.677C319.595 520.804 352.686 541.77 389.223 556.124C462.56 522.224 514.593 449.278 517.606 362.997C519.558 307.096 498.08 257.273 467.731 215.219C435.68 170.742 308.231 20.8584 308.231 20.8584Z"
      fill="#DD2C00"
    />
  </svg>
);

// Official Next.js circular gradient-N mark (legible on both charcoal dark & light surfaces)
export const NextJsIcon = ({ className }: IconProps) => {
  const id = React.useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
      className={className ?? "w-8 h-8"}
      role="img"
      aria-label="Next.js"
    >
      <circle
        cx="90"
        cy="90"
        r="86"
        fill="#000000"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="6"
      />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill={`url(#${id}-a)`}
      />
      <rect x="115" y="54" width="12" height="72" fill={`url(#${id}-b)`} />
      <defs>
        <linearGradient
          id={`${id}-a`}
          x1="109"
          y1="116.5"
          x2="144.5"
          y2="160.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`${id}-b`}
          x1="121"
          y1="54"
          x2="120.799"
          y2="106.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Official modern Expo chevron mark
export const ExpoIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className ?? "w-8 h-8"}
    role="img"
    aria-label="Expo"
  >
    <path d="M10.42 2.91a1.82 1.82 0 0 1 3.16 0l9.96 16.56c.57.95-.44 2.04-1.43 1.54-.45-.23-.88-.58-1.18-1.08L12.56 5.95a.66.66 0 0 0-1.12 0L3.07 19.93c-.3.5-.73.85-1.18 1.08-.99.5-2-.59-1.43-1.54L10.42 2.91Z" />
  </svg>
);

// Official NativeWind mark (distinct rounded badge with mobile + utility wave)
export const NativeWindIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className={className ?? "w-8 h-8"}
    role="img"
    aria-label="NativeWind"
  >
    <rect width="128" height="128" rx="26" fill="#0F172A" stroke="#38BDF8" strokeWidth="6" />
    <path
      fill="#38BDF8"
      d="M64 36c-12.8 0-20.8 6.4-24 19.2 4.8-6.4 10.4-8.8 16.8-7.2 3.65.91 6.26 3.56 9.14 6.48C70.64 59.25 76.1 64.8 88 64.8c12.8 0 20.8-6.4 24-19.2-4.8 6.4-10.4 8.8-16.8 7.2-3.65-.91-6.26-3.56-9.14-6.48C81.36 41.55 75.9 36 64 36ZM40 64.8c-12.8 0-20.8 6.4-24 19.2 4.8-6.4 10.4-8.8 16.8-7.2 3.65.91 6.26 3.56 9.14 6.48C46.64 88.05 52.1 93.6 64 93.6c12.8 0 20.8-6.4 24-19.2-4.8 6.4-10.4 8.8-16.8 7.2-3.65-.91-6.26-3.56-9.14-6.48C57.36 70.35 51.9 64.8 40 64.8Z"
    />
  </svg>
);

// Official modern Node.js #5FA04E hexagon logo
export const NodeJsIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className={className ?? "w-8 h-8"}
    role="img"
    aria-label="Node.js"
  >
    <path
      fill="#5FA04E"
      d="M64 8a10.4 10.4 0 0 0-5.2 1.4L18.4 32.7A10.4 10.4 0 0 0 13.2 41.7v44.6c0 3.7 2 7.1 5.2 9l40.4 23.3a10.4 10.4 0 0 0 10.4 0l40.4-23.3c3.2-1.9 5.2-5.3 5.2-9V41.7c0-3.7-2-7.1-5.2-9L69.2 9.4A10.4 10.4 0 0 0 64 8Z"
    />
    <path
      fill="#FFFFFF"
      d="M55.4 44.5h8.2v30.1c0 8.5-4.8 13.2-12.8 13.2-4.2 0-7.7-1.2-10.3-3.4l3.5-6.1c1.7 1.4 3.8 2.3 6.2 2.3 3.3 0 5.2-1.9 5.2-5.8V44.5Zm31.7 18.8c7.9 1.6 11.7 4.7 11.7 10.9 0 7.4-6.1 11.9-15.6 11.9-6.6 0-12.5-2.1-16.5-5.7l4.2-6c3.2 2.8 7.4 4.5 12.2 4.5 4.6 0 7.3-1.6 7.3-4.3 0-2.4-2-3.6-7.6-4.8l-3.4-.7c-7.4-1.6-11.2-4.8-11.2-10.7 0-6.9 5.8-11.4 14.7-11.4 5.8 0 11 1.7 14.7 4.7l-4 6c-2.9-2.2-6.6-3.5-10.7-3.5-4.1 0-6.5 1.6-6.5 4.1 0 2.3 1.9 3.5 7.3 4.6l3.4.4Z"
    />
  </svg>
);

// Official modern Discord.js (#5865F2 Blurple Discord Clyde mark)
export const DiscordJsIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className={className ?? "w-8 h-8"}
    role="img"
    aria-label="Discord.js"
  >
    <rect width="128" height="128" rx="28" fill="#5865F2" />
    <path
      fill="#FFFFFF"
      d="M96.4 39.2A74.2 74.2 0 0 0 77.9 33.4c-.8 1.5-1.7 3.4-2.4 4.9a68.7 68.7 0 0 0-23 0c-.7-1.5-1.6-3.4-2.4-4.9a74.5 74.5 0 0 0-18.5 5.8C19.9 56.8 16.7 73.9 18.3 90.8a75.1 75.1 0 0 0 22.7 11.5c1.8-2.5 3.5-5.2 4.9-8a48.6 48.6 0 0 1-7.7-3.7c.6-.5 1.3-1 1.9-1.5 14.8 6.9 31 6.9 45.7 0 .6.5 1.3 1 1.9 1.5-2.5 1.5-5.1 2.7-7.7 3.7 1.4 2.8 3.1 5.5 4.9 8a74.8 74.8 0 0 0 22.8-11.5c1.9-19.6-3.2-36.6-11.3-51.6ZM49.2 80.4c-4.4 0-8.1-4.1-8.1-9.1s3.6-9.1 8.1-9.1c4.5 0 8.2 4.1 8.1 9.1 0 5-3.6 9.1-8.1 9.1Zm29.6 0c-4.4 0-8.1-4.1-8.1-9.1s3.6-9.1 8.1-9.1c4.5 0 8.2 4.1 8.1 9.1 0 5-3.6 9.1-8.1 9.1Z"
    />
  </svg>
);

// Official modern MongoDB #00ED64 spring-green leaf logo
export const MongoDbIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className={className ?? "w-8 h-8"}
    role="img"
    aria-label="MongoDB"
  >
    <path
      fill="#00ED64"
      d="M66.2 10.6c-1.1-1.9-1.9-3.6-2.2-4.6-.3 1-1.1 2.7-2.2 4.6-15.6 25.4-24.8 42.3-22.4 64.9 1.7 16.5 11.7 28.5 22.6 34.4l2 12.1h2l2-12.1c10.9-5.9 20.9-17.9 22.6-34.4 2.4-22.6-6.8-39.5-22.4-64.9Z"
    />
    <path
      fill="#00684A"
      d="M64 26v96h1l2-12.1c10.9-5.9 20.9-17.9 22.6-34.4 1.8-17.1-3.5-30.8-13.6-48.4C72 20.2 67.6 13.1 64 6v20Z"
      opacity="0.32"
    />
    <path fill="#C1E8D5" d="M62.6 109.9h2.8l-.6 12.1h-1.6l-.6-12.1Z" />
  </svg>
);

// Official square npm #CB3837 cube mark
export const NpmIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className={className ?? "w-8 h-8"}
    role="img"
    aria-label="npm"
  >
    <rect width="128" height="128" rx="14" fill="#CB3837" />
    <path fill="#FFFFFF" d="M24 24h80v80H80V44H64v60H24V24Z" />
  </svg>
);

// Official Astro two-tone brand mark (theme-adaptive hull + #FF5D01 thruster flame)
export const AstroIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 85 107"
    className={className ?? "w-8 h-8"}
    role="img"
    aria-label="Astro"
  >
    <path
      fill="currentColor"
      d="M0 69.587s14.314-6.973 28.668-6.973L39.49 29.12c.405-1.62 1.588-2.72 2.924-2.72 1.335 0 2.518 1.1 2.924 2.72L56.16 62.614c17 0 28.668 6.973 28.668 6.973S60.514 3.352 60.467 3.219C59.769 1.261 58.591 0 57.003 0H27.827c-1.588 0-2.718 1.261-3.464 3.22C24.311 3.35 0 69.586 0 69.586Z"
    />
    <path
      fill="#FF5D01"
      d="M27.59 91.136c-4.834-4.418-6.246-13.703-4.232-20.429 3.492 4.241 8.33 5.584 13.342 6.343 7.737 1.17 15.336.732 22.523-2.804.822-.405 1.582-.943 2.48-1.489.675 1.957.85 3.932.615 5.943-.573 4.896-3.01 8.678-6.885 11.545-1.55 1.147-3.19 2.172-4.79 3.253-4.917 3.323-6.247 7.22-4.4 12.888.044.139.084.277.183.614-2.51-1.124-4.344-2.76-5.742-4.911-1.475-2.27-2.177-4.78-2.214-7.498-.019-1.322-.019-2.656-.197-3.96-.434-3.178-1.926-4.601-4.737-4.683-2.884-.084-5.166 1.699-5.771 4.507-.046.216-.113.429-.18.68l.004.001Z"
    />
  </svg>
);
