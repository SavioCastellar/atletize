import Image from 'next/image';

interface LogoV1Props {
  width?: number;
  height?: number;
}

export function LogoV1({ width = 70, height = 70 }: LogoV1Props) {
  return (
    <Image
      width={width}
      height={height}
      src={'/logo-alt.png'}
      alt='Logo'
      className='size-16'
    />
  );
}
