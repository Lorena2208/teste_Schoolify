import AtvRecentes from "@/components/home/AtvRecentes";
import ProximosEvent from "@/components/home/ProximosEvent";
import SugestLivros from "@/components/home/SugestLivros";
import Menu from "@/components/menu/Menu";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Menu />
      <div className="container_tela">
      <div className={styles.containerTela}>
        <AtvRecentes />
        <div className={styles.containersDireita}>
        <ProximosEvent />
        <SugestLivros />
      </div>
    </div>
      </div>
    </>
  );
}
