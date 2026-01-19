import styles from './ModalOverlay.module.css';
import {ModalOverlayProps} from "../../types/Types";



export const ModalOverlay = ({ onClick }: ModalOverlayProps) => {
    return (
        <div
            className={styles.overlay}
            onClick={onClick}
            role="presentation"
        />
    );
};