import styles from "@/styles/Home.module.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Botao from "../botoes/Botao";

export default function AtvRecentes() {
  const router = useRouter();
  const [cards, setCards] = useState([]);

  const getNome = () => "Geovana";

  const fetchCards = () => {
    setCards([{
      id: 1,
      imgUrl: 'https://img.myloview.com.br/posters/ilustracao-matematica-redondo-400-75374335.jpg',
      nome: 'Atividade de Matemática',
      professor: 'Prof. Dominique',
    }, {
      id: 2,
      imgUrl: 'https://img.myloview.com.br/posters/ilustracao-matematica-redondo-400-75374335.jpg',
      nome: 'Atividade de Historia',
      professor: 'Prof. Dominique',
    }]);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className={styles.acontainerAtv}>
      <div className={styles.saudacao}>
        <h2>
          <span className={styles.ola}>Olá, </span>
          <span className={styles.nome}>{getNome()}</span>
        </h2>
        <p>Bom ter você de volta, aproveite nosso app.</p>
      </div>

      <div className={styles.atividadesRecentes}>
        <h2>Atividades recentes</h2>

        <div className={styles.cardsContainer}>
          {cards.map((card) => (
            <div className={styles.card} key={card.id}>
              <img
                className={styles.imgCard}
                src={card.imgUrl}
                alt={card.nome}
              />
              <div className={styles.cardContent}>
                <h3>{card.nome}</h3>
                <p>{card.professor}</p>
              </div>
              <Botao className={styles.botaoAtv} onClick={() => { router.push('/atividades_abertas'); }} type="button">
                Ir para Atividade <FontAwesomeIcon icon={faChevronRight} />
              </Botao>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

