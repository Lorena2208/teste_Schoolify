import Botao from '@/components/botoes/Botao';
import styles from '@/styles/Config.module.css';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function AlterarSenha() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações básicas
    if (newPassword !== confirmPassword) {
      setErrorMessage('As senhas não correspondem.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Aqui você pode adicionar a lógica para enviar a nova senha para o back-end

    console.log('Senha alterada com sucesso!');
    // Resetar campos após sucesso
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  return (
    <div className={styles.containerAlterarSenha}>
      <h2>Alterar Senha</h2>
      {errorMessage && <p className={styles.errorMensage}>{errorMessage}</p>}

      <form className={styles.formAlterarSenha} onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="current-password">Senha Atual</label>
          <div className={styles.inputContainer}>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className={styles.togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password">Nova Senha</label>
          <div className={styles.inputContainer}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className={styles.togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="confirm-password">Confirmar Senha</label>
          <div className={styles.inputContainer}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div>
          <Botao className={styles.botaoAlterarSenha} type="submit">Salvar</Botao>
        </div>
      </form>
    </div>
  );
}
