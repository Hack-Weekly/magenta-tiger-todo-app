import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { menuBars, xMark } from './icons/icon';

export const Nav = ({ tasks }) => {
  const [tags, setTags] = useState([]);
  const [isMenuClosed, setIsMenuClosed] = useState(false);

  const openMenu = () => {
    console.log(isMenuClosed);
    setIsMenuClosed(!isMenuClosed);
  };

  useEffect(() => {
    if (tasks) {
      setTags(
        tasks.map((todo) => {
          return { tagName: todo.tag, id: nanoid() };
        })
      );
    }
  }, [tasks]);

  return (
    <div>
      <button className="absolute top-5 right-5 md:hidden" onClick={openMenu}>
        {menuBars}
      </button>

      <nav
        className="absolute top-0 bottom-0 left-0 right-0 transition bg-white-grey md:relative md:h-full md:block md:w-56 p-5"
        style={{
          transform: !isMenuClosed && 'translateX(100%)',
        }}
      >
        <button className="absolute top-5 right-5 md:hidden" onClick={openMenu}>
          {xMark}
        </button>
        <h2 className="text-xl font-bold text-dark-blue text-center mt-8 md:mt-0">
          🐯 Magenta Tiger Todo App
        </h2>

        <ol className="flex flex-col gap-2 mt-4">
          <li>All</li>
          <li>Favorites</li>
          <li>Completed</li>
        </ol>

        <hr className="text-light-grey my-4" />

        <h3 className="text-base font-bold text-light-grey ">Your tags</h3>
        <ol className="flex flex-col gap-2 mt-2">
          {tags
            ? tags.map((tag) => {
                return (
                  <li className="flex" key={tag.id}>
                    <button className="text-left first-letter:uppercase">
                      {tag.tagName}
                    </button>
                    <p className="ml-auto">5</p>{' '}
                    {/* temp fixed number for display*/}
                  </li>
                );
              })
            : ''}
        </ol>
      </nav>
    </div>
  );
};

export default Nav;
