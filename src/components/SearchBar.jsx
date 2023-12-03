import React from 'react';
import { useSpring, animated } from 'react-spring';
import BulkDeleteButton from './BulkDeleteButton';

const SearchBar = ({ searchQuery, onSearchChange, onDeleteSelected }) => {
  const fadeInOut = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const slideInOut = useSpring({
    marginLeft: 0,
    from: { marginLeft: -50 },
  });

  return (
    <animated.div
      style={fadeInOut}
      className="bg-white
       p-2 shadow-lg  flex justify-between 
        pl-5 t-[40px]
       items-center"
    >
      <animated.input
        style={slideInOut}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-40 sm:w-60
         text-black md:w-80 border-[2px] rounded p-2 focus:outline-none focus:ring focus:border-black"
      />
      <BulkDeleteButton onDeleteSelected={onDeleteSelected} />
    </animated.div>
  );
};

export default SearchBar;
