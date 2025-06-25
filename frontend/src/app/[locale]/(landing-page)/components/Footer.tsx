import React from 'react';

import Link from 'next/link';
import { Copyright } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="w-full">
        <div className="flex flex-wrap justify-between py-2 px-20">
          <Link href="/" className="hover:text-zinc-800 hover:bg-zinc-100 rounded-md p-2">
            Início
          </Link>
          <Link href="/historia" className="hover:text-zinc-800 hover:bg-zinc-100 rounded-md p-2">
            Nossa história
          </Link>
          <Link href="/contato" className="hover:text-zinc-800 hover:bg-zinc-100 rounded-md p-2">
            Fale conosco
          </Link>
          <Link href="/loja" className="hover:text-zinc-800 hover:bg-zinc-100 rounded-md p-2">
            Loja
          </Link>
          <Link href="/modalidades" className="hover:text-zinc-800 hover:bg-zinc-100 rounded-md p-2">
            Modalidades
          </Link>
          <Link href="/socio" className="hover:text-zinc-800 hover:bg-zinc-100 rounded-md p-2">
            Torne-se um carcará
          </Link>
        </div>

        <Separator className="w-full border-t border-gray-500" />

        <div className="relative flex justify-between items-start py-4 px-8 overflow-hidden">
          {/* Dúvidas */}
          <div className="w-full">
            <h3 className="text-md font-semibold mb-2">DÚVIDAS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:font-semibold">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:font-semibold">
                  Suporte ao Cliente
                </Link>
              </li>
              <li>
                <Link href="/envio" className="hover:font-semibold">
                  Informações de Envio
                </Link>
              </li>
              <li>
                <Link href="/devolucoes" className="hover:font-semibold">
                  Política de Devolução
                </Link>
              </li>
            </ul>
          </div>

          {/* Área do Cliente */}
          <div className="w-full">
            <h3 className="text-md font-semibold mb-2">ÁREA DO CLIENTE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos" className="hover:font-semibold">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/carrinho" className="hover:font-semibold">
                  Carrinho
                </Link>
              </li>
              <li>
                <Link href="/favoritos" className="hover:font-semibold">
                  Favoritos
                </Link>
              </li>
              <li>
                <Link href="/pedidos" className="hover:font-semibold">
                  Meus Pedidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="w-full">
            <h3 className="text-md font-semibold mb-2">CONTATO</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER"
                  className="hover:font-semibold"
                >
                  (31) 9XXXX-XXXX
                </a>
              </li>
              <li>
                <a href="mailto:contato@exemplo.com" className="hover:font-semibold">
                  contato@exemplo.com
                </a>
              </li>
              <li>Atendimento: Seg a Sex, 9h - 18h</li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="w-full">
            <h3 className="text-md font-semibold mb-2">SIGA NOSSAS REDES SOCIAIS</h3>
            <div className="flex flex-col justify-start items-start space-y-2">
              <a
                href="https://www.instagram.com/YOUR_INSTAGRAM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <img height="20" width="20" src="https://cdn.simpleicons.org/instagram/000" />
                <h3>Instagram</h3>
              </a>
              <a
                href="https://www.instagram.com/YOUR_INSTAGRAM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <img height="20" width="20" src="https://cdn.simpleicons.org/facebook/000" />
                <h3>Facebook</h3>
              </a>
              <a
                href="https://www.instagram.com/YOUR_INSTAGRAM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <img height="20" width="20" src="https://cdn.simpleicons.org/tiktok/000" />
                <h3>TikTok</h3>
              </a>
              <a
                href="https://www.instagram.com/YOUR_INSTAGRAM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <img height="20" width="20" src="https://cdn.simpleicons.org/x/000" />
                <h3>X</h3>
              </a>

            </div>
          </div>

          {/* <img src="/logo.png" alt="" /> */}


          {/* Image after the last column */}
          <div className="self-center right-0 -mr-20 absolute">
            <img src="/logo.png" alt="Logo" className="h-40 w-full" />
          </div>
        </div>

        <Separator className="w-full border-t border-zinc-500" />

        <div className="flex flex-wrap justify-between text-sm py-4 px-20">
          <div className='flex items-center gap-1'>
            <Copyright size={12}/>
            <h5 className='text-sm'>2024 Atlética Martelada</h5>
          </div>
          <Link href="/socio" className='flex gap-2'>
            <h4 className='text-md'>Desenvolvido por Atletize</h4>
            <img src="/atletize.png" alt="Atletize" className="h-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
