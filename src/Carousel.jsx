import { useEffect, useState } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi";
const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [currentPerson, setCurrentPerson] = useState(0);
  const previousSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson - 1 + people.length) % people.length;
      return result;
    });
  };
  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson + 1) % people.length;
      return result;
    });
  };

  useEffect(() => {
    let id = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, [currentPerson]);
  return (
    <section className='slider-container'>
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            className='slide'
            key={id}
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              opacity: currentPerson === personIndex ? 1 : 0,
              visibility: currentPerson === personIndex ? "visible" : "hidden",
            }}
          >
            <img src={image} alt={name} className='person-img' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
        );
      })}
      <button type='button' className='prev' onClick={() => previousSlide()}>
        <FiChevronLeft />
      </button>
      <button type='button' className='next' onClick={() => nextSlide()}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default Carousel;
