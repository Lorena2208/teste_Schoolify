import styles from '@/styles/Atividade.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Atividade = () => {
  const router = useRouter();
  const [disciplinas, setDisciplinas] = useState([]); // Inicializa como um array vazio

  const fetchDisciplinas = () => {
    setDisciplinas([
      {
        id: 1,
        nome: 'Matemática',
        imgUrl: 'https://static.vecteezy.com/ti/vetor-gratis/p1/20277225-matematica-rabisco-definir-educacao-e-estude-conceito-escola-equipamento-matematicas-formulas-dentro-esboco-estilo-mao-desenhado-ector-ilustracao-isolado-em-branco-fundo-vetor.jpg',
      },
      {
        id: 2,
        nome: 'História',
        imgUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/236/242/small_2x/history-minimal-thin-line-icons-set-vector.jpg',
      },
      {
        id: 3,
        nome: 'Matemática',
        imgUrl: 'https://static.vecteezy.com/ti/vetor-gratis/p1/20277225-matematica-rabisco-definir-educacao-e-estude-conceito-escola-equipamento-matematicas-formulas-dentro-esboco-estilo-mao-desenhado-ector-ilustracao-isolado-em-branco-fundo-vetor.jpg',
      },
      {
        id: 4,
        nome: 'História',
        imgUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/236/242/small_2x/history-minimal-thin-line-icons-set-vector.jpg',
      },
      {
        id: 5,
        nome: 'Matemática',
        imgUrl: 'https://static.vecteezy.com/ti/vetor-gratis/p1/20277225-matematica-rabisco-definir-educacao-e-estude-conceito-escola-equipamento-matematicas-formulas-dentro-esboco-estilo-mao-desenhado-ector-ilustracao-isolado-em-branco-fundo-vetor.jpg',
      },
    ]);
  };

  useEffect(() => {
    fetchDisciplinas(); // Chama a função para definir as disciplinas
  }, []); // O array vazio significa que isso será chamado apenas uma vez após a montagem do componente

  const handleClick = (id) => {
    router.push(`/atividades_abertas`); 
    // router.push(`/atividades_abertas/${id}`); // Adiciona o ID da disciplina
  };

  return (
    <div className={styles.livroContainer}>
      <h1>Atividades</h1>
      <div className={styles.livro}>
        {disciplinas.length > 0 ? (
          disciplinas.map((disciplina) => (
            <div key={disciplina.id} className={styles.capaLivro} onClick={() => handleClick(disciplina.id)}>
              <div className={styles.linha}></div>
              <div className={styles.conteudo}>
                <img src={disciplina.imgUrl} alt={disciplina.nome} className={styles.capaImagem} />
                <h2>{disciplina.nome}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma disciplina disponível.</p>
        )}
      </div>
    </div>
  );
};

export default Atividade;

