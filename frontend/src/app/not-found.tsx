import { Button } from './shared/components/Button';
import { Link } from './shared/components/Link';

export default function NotFound() {
  return (
    <>
      <div className='flex min-h-screen w-full flex-col items-center justify-center bg-gray/100'>
        <div className='max-w-md py-16 lg:max-w-lg'>
          <div className='flex justify-center'>
            <h1 className='text-9xl font-bold text-primary/700'>404</h1>
          </div>
          <h1 className='mt-12 text-center text-4xl font-bold text-primary/700'>
            Oops!
          </h1>
          <Link href={'/'}>
            <Button className='mt-5'>Voltar</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
