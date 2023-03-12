import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export const Nav = ({ tasks }) => {
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);

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
    <nav>
      <ol className="flex flex-col gap-3">
        {filteredTags.map((tag) => {
          return (
            <div className="flex w-40" key={tag.id}>
              <button
                className="text-left"
                onClick={(e) => {
                  filterByTag(todo.tagName);
                }}
              >
                {tag.tagName}
              </button>
              <p className="ml-auto">{tag.amount}</p>
            </div>
          );
        })}
      </ol>
    </nav>
  );
};

export default Nav;
