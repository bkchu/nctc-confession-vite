import { createElement } from 'react';
import clsx from 'clsx';

type Props = {
  variant: 'jumbo' | 'h1' | 'h2' | 'eyebrow' | 'body' | 'link';
  as?: string;
  className?: string;
  children: React.ReactNode;
  color?: string;
};

export const Text = ({
  color = 'text-nctcBrown-100',
  variant = 'body',
  as = 'p',
  className,
  ...props
}: Props) => {
  const variantStyles: { [key: string]: string } = {
    jumbo: clsx('font-bold text-5xl md:text-6xl'),
    h1: clsx('font-bold text-5xl leading-none'),
    h2: clsx(''),
    eyebrow: clsx('tracking-[0.105em] uppercase font-bold'),
    body: clsx(''),
    link: clsx('')
  };

  return createElement(as, {
    className: clsx(color, variantStyles[variant], className),
    as,
    ...props
  });
};
