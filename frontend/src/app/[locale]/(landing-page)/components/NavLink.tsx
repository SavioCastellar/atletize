import Link from 'next/link';

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className='inline-block rounded-lg px-6 text-lg font-medium text-text-lp'
    >
      {children}
    </Link>
  );
}
