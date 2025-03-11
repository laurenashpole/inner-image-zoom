import { rem } from '@mantine/core';

const PlusIcon = ({ size, style, ...props }) => (
  <svg
    width={rem(size)}
    height={rem(size)}
    viewBox="0 0 68 68"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: rem(size), height: rem(size), ...style }}
    {...props}
  >
    <path
      fill="currentColor"
      d="M33 68c-2.6 0-4.8-.8-6.4-2.5-1.7-1.7-2.5-4.2-2.5-7.7V43H10.3c-3.5 0-6.1-.8-7.8-2.5C.8 38.8 0 36.8 0 34.3v-1.1c0-2.5.8-4.6 2.5-6.2s4.3-2.5 7.8-2.5h13.8V10.1c0-3.4.8-5.9 2.5-7.6C28.3.8 30.4 0 33 0h2c2.4 0 4.5.9 6.2 2.5 1.7 1.7 2.6 4.2 2.6 7.6v14.4h13.9c3.5 0 6.1.8 7.8 2.5 1.7 1.7 2.5 3.7 2.5 6.2v1.1c0 2.5-.8 4.6-2.5 6.2S61.2 43 57.7 43H43.8v14.8c0 3.5-.9 6.1-2.6 7.7-1.7 1.7-3.8 2.5-6.2 2.5h-2Z"
    />
  </svg>
);

export default PlusIcon;
