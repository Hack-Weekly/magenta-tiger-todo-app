import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';

export const Nav = ({ tasks }) => {
  const [tags, setTags] = useState([]);

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
    <nav className="hidden md:block md:bg-white-grey md:w-56 md:p-5">
      <h2 className="text-xl font-bold text-dark-blue text-center">
        🐯 Magenta Tiger Todo App
      </h2>

      <h3 className="text-base font-bold text-light-grey mt-4">Your tags</h3>
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
  );
};

export default Nav;
