import styles from '@/styles/Atividade.module.css';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Botao from "../botoes/Botao";

export default function AtvAberta({ atividade, onPrev, onNext, canGoPrev, canGoNext, onBack }) {
  return (
    <div className={styles.conteudo_atv}>
      <h1>Atividade</h1>
      <div className={styles.AtvAberta}>
        <h2>{atividade.titulo}</h2>
        <p><strong>Turma:</strong> {atividade.turma}</p>
        <p><strong>Data de Início:</strong> {atividade.dataInicio}</p>
        <p><strong>Data de Entrega:</strong> {atividade.dataEntrega}</p>
        <p><strong>Assunto:</strong> {atividade.assunto}</p>
        <p className={styles.descricao}><strong>Descrição:</strong> {atividade.descricao}</p>

        <div className={styles.nav_container}>
          <Botao onClick={onPrev} disabled={!canGoPrev} className={`${styles.seta_esquerda} ${!canGoPrev ? styles.disabled : ''}`}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Botao>
          <Botao onClick={onBack} className={styles.voltar}>Voltar para Atividades</Botao>
          <Botao onClick={onNext} disabled={!canGoNext} className={`${styles.seta_direita} ${!canGoNext ? styles.disabled : ''}`}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Botao>
        </div>
      </div>
    </div>
  );
}
