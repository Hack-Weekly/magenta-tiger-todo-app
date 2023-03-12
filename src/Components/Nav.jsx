import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { menuBars, xMark } from './icons/icon';

export const Nav = ({ tasks }) => {
  const [tags, setTags] = useState([]);
  const [isMenuClosed, setIsMenuClosed] = useState(false);
  const [filteredTags, setFilteredTags] = useState([]);
  const [isSelected, setIsSelected] = useState('');

  const baseTags = ['all', 'favorite', 'completed'];

  console.log(isSelected);

  const openMenu = () => {
    setIsMenuClosed(!isMenuClosed);
  };

  const selectTag = (id) => {
    setIsSelected(id);

    if (window.innerWidth <= 768) {
      openMenu();
    }
  };

  //set Tags if tasks are available//
  useEffect(() => {
    if (tasks) {
      const newTags = tasks.map((todo) => {
        return { tagName: todo.tag, id: nanoid(), amount: 0 };
      });
      setTags(newTags);
    }
  }, [tasks]);

  //update tag amount//
  useEffect(() => {
    //prevent infinite loop//
    let shouldUpdate = false;
    const newTags = [...tags];
    newTags.forEach((tag) => {
      const newAmount = sumUp(newTags, tag.tagName);
      if (tag.amount !== newAmount) {
        tag.amount = newAmount;
        shouldUpdate = true;
      }
    });
    if (shouldUpdate) {
      setTags(newTags);
    }
    //Ensure duplicates are removed//
    const newFilteredTags = tags.filter((tag, index, self) => {
      return index === self.findIndex((item) => item.tagName === tag.tagName);
    });
    setFilteredTags(newFilteredTags);
  }, [tags]);

  function sumUp(arr, targetTag) {
    let sum = 0;
    arr.forEach((item) => {
      if (item.tagName === targetTag) {
        sum += 1;
      }
    });
    return sum;
  }

  return (
    <div>
      <button className="absolute top-5 right-5 md:hidden" onClick={openMenu}>
        {menuBars}
      </button>

      <nav
        className="absolute top-0 bottom-0 left-0 right-0 transition bg-white-grey md:relative md:h-full md:block md:w-56 md:-left-[100%]"
        style={{
          transform: !isMenuClosed && 'translateX(100%)',
        }}
      >
        <button className="absolute top-5 right-5 md:hidden" onClick={openMenu}>
          {xMark}
        </button>
        <h2 className="text-xl font-bold text-dark-blue text-center p-5 mt-8 md:mt-0">
          🐯 Magenta Tiger Todo App
        </h2>

        <ol className="flex flex-col gap-2 mt-4">
          {baseTags.map((tag) => (
            <li
              key={tag}
              style={{
                'background-color': tag === isSelected && 'var(--colors-blue)',
                color: tag === isSelected && 'var(--colors-white)',
              }}
              className="px-5 py-1 transition-colors"
            >
              <button
                onClick={(e) => {
                  selectTag(tag);
                }}
                className="inline-flex justify-between w-full"
              >
                <span className="first-letter:uppercase">{tag}</span>
              </button>
            </li>
          ))}
        </ol>

        <hr className="text-light-grey my-4 px-5" />

        <h3 className="text-base font-bold text-light-grey px-5">Your tags</h3>
        <ol className="flex flex-col gap-1 mt-2">
          {tags
            ? tags.map((tag) => {
                return (
                  <li
                    key={tag.id}
                    style={{
                      'background-color':
                        tag.id === isSelected && 'var(--colors-blue)',
                      color: tag.id === isSelected && 'var(--colors-white)',
                    }}
                    className="px-5 py-1 transition-colors"
                  >
                    <button
                      onClick={(e) => {
                        selectTag(tag.id);
                      }}
                      className="inline-flex justify-between w-full"
                    >
                      <span className="first-letter:uppercase">
                        {tag.tagName}
                      </span>
                      <span className="w-6 h-6 rounded-full bg-ice-blue text-dark-blue">
                        {tag.amount}
                      </span>
                    </button>
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
