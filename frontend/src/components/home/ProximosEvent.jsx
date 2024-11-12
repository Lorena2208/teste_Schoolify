import styles from "@/styles/Home.module.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Botao from "../botoes/Botao";
import Calendario from "../calendario/Calendario";

export default function ProximosEvent() {

  const router = useRouter();
  const [cards, setCards] = useState([]);


  const fetchCards = () => {
    setCards([{
      id: 1,
      imgUrl: 'https://encurtador.com.br/hdafc',
      nome: 'Oficina de Artes',
      data: 'Terça-feira - 29/10/2024',
    }, {
      id: 2,
      imgUrl: 'https://encurtador.com.br/w2MEU',
      nome: 'Reunião de pais e mestres',
      data: 'Quinta-feira - 31/10/2024',
    }]);
  };

  useEffect(() => {
    fetchCards();
  }, []);



  return (
    <div className={styles.proximosEventos}>
      <div className={styles.titulo}>
        <h2>Próximos Eventos</h2>
      </div>
      <div className={styles.conteudoEventos}>
        <div className={styles.calendario}>
          <Calendario tamanho="pequeno" />
        </div>

        <div className={styles.cardsCalendario}>
          {cards.map((card) => (
            <div className={styles.card} key={card.id}>
              <img
                className={styles.imgCard}
                src={card.imgUrl}
                alt={card.nome}
              />
              <div className={styles.cardContent}>
                <h3>{card.nome}</h3>
                <p>{card.data}</p>
              </div>
              <Botao className={styles.botaoAtv} onClick={() => { router.push('/atividades_abertas'); }} type="button">
                Ir para Evento <FontAwesomeIcon icon={faChevronRight} />
              </Botao>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

