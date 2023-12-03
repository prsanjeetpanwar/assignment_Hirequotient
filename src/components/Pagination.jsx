import React from 'react';
import { FaFastBackward, FaBackward, FaForward, FaFastForward } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const fadeInOut = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 300, friction: 15 },
  });

  const scaleInOut = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.8)' },
    config: { tension: 300, friction: 20 },
  });

  const rotateInOut = useSpring({
    transform: 'rotate(0deg)',
    from: { transform: 'rotate(-45deg)' },
    config: { tension: 300, friction: 10 },
  });

  return (
    <div className="flex items-end justify-end pr-5 space-x-4">
      <div className="text-gray-700 text-sm">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <animated.button
          style={fadeInOut}
          className="text-gray-700 border-[1px] shadow-lg px-3 py-1 rounded hover:bg-gray-200 focus:outline-none transition-all duration-300"
          onClick={() => handlePageChange(1)}
        >
          <FaFastBackward />
        </animated.button>
        <animated.button
          style={fadeInOut}
          className={`text-gray-700 border-[1px] shadow-lg px-3 py-1 rounded ${
            currentPage === 1 ? 'bg-gray-200' : 'hover:bg-gray-200'
          } focus:outline-none transition-all duration-300`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaBackward />
        </animated.button>
        {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, i) => (
          <animated.button
            key={i + 1}
            style={scaleInOut}
            className={`px-3 py-1 rounded border-[1px] shadow-lg focus:outline-none ${
              currentPage === i + 1
                ? 'text-white bg-gray-700 shadow-lg transform hover:scale-110 transition-transform'
                : 'text-gray-700 hover:bg-gray-200'
            } transition-all duration-300`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </animated.button>
        ))}
        <animated.button
          style={fadeInOut}
          className={`px-3 py-1 border-[1px] shadow-lg rounded ${
            currentPage === totalPages ? 'bg-gray-200' : 'hover:bg-gray-200'
          } text-gray-700 focus:outline-none transition-all duration-300`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaForward />
        </animated.button>
        <animated.button
          style={rotateInOut}
          className="px-3 py-1 border-[1px] shadow-lg rounded hover:bg-gray-200 focus:outline-none transition-all duration-300"
          onClick={() => handlePageChange(totalPages)}
        >
          <FaFastForward className='text-gray-700' />
        </animated.button>
      </div>
    </div>
  );
};

export default Pagination;
