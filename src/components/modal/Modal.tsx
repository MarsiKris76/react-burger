// components/Modal/Modal.tsx
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import {ModalProps} from "../../types/ComponentTypes";
import {ModalOverlay} from "../modal-overlay/ModalOverlay";

export const Modal = ({ title, onClose, children }: ModalProps) => {
    const modalRoot = document.getElementById('modal-root') || document.body;

    const handleEscapeKey = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = '';
        };
    }, [handleEscapeKey]);

    return createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={`text text_type_main-large ${styles.title}`}>{title}</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Закрыть модальное окно"
                    >
                        <CloseIcon type="primary" />
                    </button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>,
        modalRoot
    );
};