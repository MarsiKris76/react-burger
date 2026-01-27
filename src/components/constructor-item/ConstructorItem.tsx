import React, { useRef } from 'react';
import styles from './ConstructorItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import {ConstructorItemProps} from "../../types/ComponentTypes";
import {moveIngredient} from "../../services/slices/BurgerConstructorSlice";
import {useDispatch} from "react-redux";


export const ConstructorItem: React.FC<ConstructorItemProps> = ({
                                                                     ingredient,
                                                                     index,
                                                                     onRemove
                                                                 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const handleMoveItem = (from: number, to: number) => {
        dispatch(moveIngredient({ from, to }));
    };

    const [{ isDragging }, drag] = useDrag({
        type: 'constructor-item',
        item: { index, id: ingredient.uuid, type: ingredient.type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'constructor-item',
        hover: (draggedItem: IConstructorItemDragObject, monitor) => {
            if (!ref.current) return;

            const dragIndex = draggedItem.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

            handleMoveItem(dragIndex, hoverIndex);
            draggedItem.index = hoverIndex;
        },
    });

    drag(drop(ref));

    return (
        <div ref={ref} className={`mb-2 ${isDragging ? styles.draggingItem : ''}`}>
            <div className={styles.content} >
                <DragIcon type="primary" />
                <ConstructorElement
                    isLocked={false}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => onRemove(ingredient.uuid)}
                />
            </div>
        </div>
    );
};

interface IConstructorItemDragObject {
    index: number;
    id: string;
    type: string;
}