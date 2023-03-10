import type{ NextComponentType } from 'next';
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';

interface PropsInterface {
  placeholder: string;
  onChange?: () => void; 
}

const SearchBar = React.forwardRef<HTMLInputElement, PropsInterface>(({ placeholder, onChange }, ref) => {
  return (
    <div 
      className='bg-beige-200 h-14 w-full shadow-lg rounded-2xl flex flex-row items-center gap-2 pl-4 pr-6'
    >
      <AiOutlineSearch style={{ height: '1.8rem', width: '1.8rem', color: '#64748b' }} />
      <input 
        className="bg-transparent w-full outline-none font-raleway text-xl"
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
      />
    </div>
  )
});

SearchBar.displayName = "SearchBar";

export default SearchBar