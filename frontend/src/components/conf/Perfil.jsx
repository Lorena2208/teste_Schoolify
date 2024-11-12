import styles from '@/styles/Config.module.css';
import { faEnvelope, faPhone, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function Perfil() {
  const [selectedIcon, setSelectedIcon] = useState(faUser);  

  const [profileData, setProfileData] = useState({
    name: '',
    id: '',
    class: '',
    phone: '',
    email: ''
  });

  // Simulação de uma chamada ao backend para obter dados do usuário
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // Aqui seria substituído por uma chamada real ao backend
    const userData = {
      name: 'Pai da Criança',
      id: '000',
      class: '4° - A',
      phone: '(00) 0000-0000',
      email: 'u7Ueh@example.com'
    };
    setProfileData(userData);
  };

  const handleIconToggle = () => {
    setSelectedIcon((prevIcon) =>
      prevIcon === faUser ? faUserTie : faUser
    );
  };

  return (
    <div className={styles.containerPerfil}>
      <div className={styles.profileIconContainer} onClick={handleIconToggle}>
        <FontAwesomeIcon className={styles.profileIcon} icon={selectedIcon} />
      </div>
      <h2>{profileData.name}</h2>
      <hr />
      <p>ID: {profileData.id}</p>
      <p>Turma / Série: {profileData.class}</p>
      <hr />
      <h3>Informações de Contato</h3>
      <p>
        <FontAwesomeIcon className={styles.icon} icon={faPhone} /> {profileData.phone}
      </p>
      <p>
        <FontAwesomeIcon className={styles.icon} icon={faEnvelope} /> {profileData.email}
      </p>
    </div>
  );
}

