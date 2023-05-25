import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import Icon from 'components/Icon';

type DragDropListProps = {
  items: Record<string, string>[];
};

const DragDropList: React.FC<DragDropListProps> = ({ items }) => {
  const [draggableItems, setDraggableItems] =
    useState<Record<string, string>[]>(items);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updatedItems = [...draggableItems];
    const [removed] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, removed);
    setDraggableItems(updatedItems);
  };

  console.log(items, '33333');

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={uuidv4()}>
        {(provided) => (
          <ul
            className="mt-3 space-y-1"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {draggableItems?.map((item, index) => (
              <Draggable key={index} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    className="flex items-center justify-between border border-solid border-neutral-200 rounded-17xl py-2 px-4"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    key={item.id}
                  >
                    <div className="flex items-center space-x-4">
                      <Icon name="reorder" />
                      <span className="mr-2">{item.value}</span>
                    </div>
                    <div className="flex space-x-4 items-center">
                      <Icon name="edit" size={20} />
                      <Icon
                        name="delete"
                        stroke="#F05252"
                        hover={false}
                        fill="#F05252"
                        size={20}
                        onClick={() => {
                          const updatedValues = draggableItems.filter(
                            (element) => element?.value !== item.value,
                          );
                          setDraggableItems(updatedValues);
                        }}
                      />
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropList;
