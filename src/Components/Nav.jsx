import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

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
    <nav>
      <ol className="flex flex-col gap-3">
        {tags
          ? tags.map((tag) => {
              return (
                <div className="flex w-40" key={tag.id}>
                  <button className="text-left">{tag.tagName}</button>
                  <p className="ml-auto">5</p>{' '}
                  {/* temp fixed number for display*/}
                </div>
              );
            })
          : ''}
      </ol>
    </nav>
  );
};

export default Nav;
