import styles from './LoaddingSpinner.module.css';

export const LoadingSpinner = () => {

    return (
        <div className={styles.spinnerWrapper}>
            <div className={styles.spinner} />
        </div>
    );
};