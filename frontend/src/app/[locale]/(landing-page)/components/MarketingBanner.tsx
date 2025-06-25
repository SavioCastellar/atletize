import { IMarketingBannerIntl } from '../domain/interfaces/IMarketingBannerIntl';

interface MarketingBannerProps {
  href: string;
  intl: IMarketingBannerIntl;
}

export function MarketingBanner({ intl, href }: MarketingBannerProps) {
  return (
    <div className='flex items-center justify-center gap-x-6 bg-primary/600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1'>
      <p className='text-sm leading-6 text-white'>
        <a href={href}>
          <strong className='font-semibold'>{intl?.leftText}</strong>
          <svg
            viewBox='0 0 2 2'
            className='mx-2 inline h-0.5 w-0.5 fill-current'
            aria-hidden='true'
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          {intl?.content}
        </a>
        <svg
          viewBox='0 0 2 2'
          className='mx-2 inline h-0.5 w-0.5 fill-current'
          aria-hidden='true'
        >
          <circle cx={1} cy={1} r={1} />
        </svg>
        <strong className='hidden font-semibold md:inline'>
          {intl?.rightText}
        </strong>
      </p>
      <div className='flex flex-1 justify-end'></div>
    </div>
  );
}
