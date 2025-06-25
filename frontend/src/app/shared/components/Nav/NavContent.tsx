import { useState } from "react";

interface NavContentProps {
  content: string;
}

export function NavContent({ content }: NavContentProps) {

  return (
    <span className='font-normal text-black/30 group-hover:text-black/60 group-data-[active=true]:text-black'>
      {content}
    </span>
  );
}
