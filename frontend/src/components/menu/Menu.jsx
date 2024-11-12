import styles from "@/styles/Menu.module.css";
import { faMessage as farMessage, faPaste as farPaste, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { faCalendarDays, faCalendarPlus, faChalkboardUser, faHouse, faTasks, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Menu() {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPastaMenu, setShowPastaMenu] = useState(false);
  const [activeIcon, setActiveIcon] = useState('');

  useEffect(() => {
    switch (router.pathname) {
      case '/home':
        setActiveIcon('home');
        break;
      case '/atividades':
        setActiveIcon('atividades');
        break;
      case '/eventos':
        setActiveIcon('eventos');
        break;
      case '/mensagens':
        setActiveIcon('mensagens');
        break;
      case '/registrar_atividades':
        setActiveIcon('RegistrarAtividades');
        break;
      case '/registrar_evento':
        setActiveIcon('RegistrarEvento');
        break;
      case '/cadastro_professor':
      case '/cadastro_usuario':
        setActiveIcon('Cadastro');
        break;
      case '/turma':
      case '/disciplinas':
      case '/livros':
        setActiveIcon('Pastas');
        break;
      case '/perfil_config':
        setActiveIcon('perfil');
        break;
      default:
        setActiveIcon('');
    }
  }, [router.pathname]);

  const handleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    setShowPastaMenu(false);
  };

  const handlePastaMenu = () => {
    setShowPastaMenu(!showPastaMenu);
    setShowUserMenu(false);
  };

  const handleIconClick = (path) => {
    setShowUserMenu(false);
    setShowPastaMenu(false);
    router.push(path);
  };

  const getLiClass = (icon) => `${styles.menuItem} ${activeIcon === icon ? styles.active : ''}`;

  return (
    <nav className={styles.Menu}>
      <div className={styles.logo}>
        <a href="/tela_login">
          <img src="/assets/iconeMenu/Logotipo.svg" alt="Logo Schoolify" />
        </a>
      </div>

      <ul>
        <li onClick={() => handleIconClick('/home')} className={getLiClass('home')}>
          <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          <span>Home</span>
        </li>
        <li onClick={() => handleIconClick('/atividades')} className={getLiClass('atividades')}>
          <FontAwesomeIcon icon={faTasks} className={styles.icon} />
          <span>Atividades</span>
        </li>
        <li onClick={() => handleIconClick('/eventos')} className={getLiClass('eventos')}>
          <FontAwesomeIcon icon={faCalendarDays} className={styles.icon} />
          <span>Eventos</span>
        </li>
        <li onClick={() => handleIconClick('/mensagens')} className={getLiClass('mensagens')}>
          <FontAwesomeIcon icon={farMessage} className={styles.icon} />
          <span>Chat</span>
        </li>
      </ul>

      <div className={styles.linha}></div>

      {/* MENU ADM */}
      <ul>
        <li onClick={() => handleIconClick('/registrar_atividades')} className={getLiClass('RegistrarAtividades')}>
          <FontAwesomeIcon icon={faChalkboardUser} className={styles.icon} />
          <span>Registrar Atividade</span>
        </li>
        <li onClick={() => handleIconClick('/registrar_evento')} className={getLiClass('RegistrarEvento')}>
          <FontAwesomeIcon icon={faCalendarPlus} className={styles.icon} />
          <span>Registrar Evento</span>
        </li>
        <li onClick={handleUserMenu} aria-expanded={showUserMenu} className={getLiClass('Cadastro')}>
          <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
          <span>Cadastro</span>
          <ul className={`${styles.menuUser} ${showUserMenu ? styles.visible : ''}`}>
            <li onClick={() => handleIconClick('/cadastro_professor')}>Professor</li>
            <li onClick={() => handleIconClick('/cadastro_usuario')}>Usuário</li>
          </ul>
        </li>
        <li onClick={handlePastaMenu} aria-expanded={showPastaMenu} className={getLiClass('Pastas')}>
          <FontAwesomeIcon icon={farPaste} className={styles.icon} />
          <span>Pastas</span>
          <ul className={`${styles.menuUser} ${showPastaMenu ? styles.visible : ''}`}>
            <li onClick={() => handleIconClick('/turma')}>Turma</li>
            <li onClick={() => handleIconClick('/disciplinas')}>Disciplina</li>
            <li onClick={() => handleIconClick('/livros')}>Livros</li>
          </ul>
        </li>

        {/* PERFIL E CONFIG */}
        <div className={styles.profile}>
          <li onClick={() => handleIconClick('/perfil_config')} className={getLiClass('perfil')}>
            <FontAwesomeIcon icon={farUser} className={styles.icon} />
          </li>
        </div>
      </ul>
    </nav>
  );
}
