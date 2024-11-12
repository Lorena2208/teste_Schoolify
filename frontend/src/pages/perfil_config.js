import AlterarSenha from "@/components/conf/AlterarSenha"; //
import Perfil from "@/components/conf/Perfil";
import SubMenuConf from "@/components/conf/SubMenuConf";
import Termos from "@/components/conf/Termos";
import { useState } from 'react';
import Menu from "../components/menu/Menu";
import styles from "../styles/Config.module.css";

export default function PerfilConfig() {
  const [activeComponent, setActiveComponent] = useState('perfil'); 

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'perfil':
        return <Perfil />;
      case 'alterarSenha':
        return <AlterarSenha />;
      case 'termos':
        return <Termos />;
      default:
        return <Perfil />;
    }
  };

  return (
    <>
      <Menu />
      <div className="container_tela">
        <div className={styles.containerConfig}>
          <div className={styles.content}>
            {renderActiveComponent()}
          </div>
          <div className={styles.contentMenu}>
            <SubMenuConf setActiveComponent={setActiveComponent} /> 
          </div>
        </div>
      </div>
    </>
  );
}
