import React, { ReactNode } from 'react'
import { IProductItemIntl } from '../domain/interfaces/IProductItemIntl';

interface ProductItemProps {
  intl: IProductItemIntl;
}

function ProductItem({intl}: ProductItemProps) {
  const price = intl.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  const installmentPrice = (intl.price/intl.installments).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

  return (
    <div className='flex flex-col w-72 h-64 bg-white shadow-[-2px_4px_4px_0_rgba(0,0,0,0.25)] rounded-2xl justify-center items-center'>
      <img className='h-48 -mt-28 overflow-visible' src={'/' + intl?.image + '.svg'} alt={intl?.image}/>
      <h3 className='text-white text-center font-bold bg-theme-color-1 w-full mb-2'>{intl?.discount} {intl?.discount ? ' DESONTO' : ''}</h3>
      <h1 className='text-xl text-blue/900 font-semibold'>{intl?.name}</h1>
      <h3 className='text-sm text-blue/900 font-medium'>{intl?.desc}</h3>
      <h1 className='mt-3 text-3xl text-blue/900 font-semibold'>{price}</h1>
      <p className='mt-1 text-sm text-white/ font-medium'>Ou {intl.installments}x de {installmentPrice} sem juros</p>
    </div>
  )
}

export default ProductItem
