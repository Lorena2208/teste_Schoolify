import styles from "@/styles/Config.module.css";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Deseja realmente sair?</h2>
        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={onConfirm}>SIM</button>
          <button className={styles.cancelButton} onClick={onClose}>NÃO</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
