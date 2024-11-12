import styles from "@/styles/Config.module.css";
import { faCircleInfo, faLock, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from "./Modal";

export default function SubMenuConf({ setActiveComponent }) { 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    router.push('tela_login');
  };

  const handleLogoutCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <div className={styles.subMenuConf}>
        <h2>Perfil e Configurações</h2>

        <div className={styles.subMenu}>
          <ul>
            <li onClick={() => setActiveComponent('perfil')}> 
              <FontAwesomeIcon className={styles.icon} icon={faUser} />
              Perfil 
            </li>
            <li onClick={() => setActiveComponent('alterarSenha')}> 
              <FontAwesomeIcon className={styles.icon} icon={faLock} />
              Alterar Senha
            </li>
            <li onClick={() => setActiveComponent('termos')}> 
              <FontAwesomeIcon className={styles.icon} icon={faCircleInfo} />
              Termos de Uso e Política de Privacidade
            </li>
            <li className={styles.sair} onClick={handleLogoutClick}>
              <FontAwesomeIcon className={styles.icon} icon={faSignOut} />
              Sair
            </li>
          </ul>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleLogoutCancel} 
        onConfirm={handleLogoutConfirm} 
      />
    </>
  );
}
