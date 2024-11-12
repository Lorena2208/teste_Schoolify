import styles from "@/styles/Home.module.css";
import Botao from "../botoes/Botao";

export default function SugestoesLivros() {
  const livros = [
    { 
      id: 1,
      imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_633731-MLB74222759181_012024-O.webp',
      nome: 'O menino maluquinho',
      link: 'https://www.bmmagazine.com.br/MLB-3579217355-livro-o-menino-maluquinho-autor-ziraldo-capa-carto-_JM',
    },
    { 
      id: 2,
      imgUrl: 'https://papelariacriativa.com.br/wp-content/uploads/livro-infantil-classic-stars-trs-porquinhos-os-todo-livro-812110-1.jpg',
      nome: 'Os Três Porquinhos',
      link: 'https://papelariacriativa.com.br/produto/livro-infantil-classic-stars-tres-porquinhos-os-todo-livro-812110/',
    },
    { 
      id: 3,
      imgUrl: 'https://m.media-amazon.com/images/I/81pNvn4iS4L._SL1500_.jpg',
      nome: 'O pequeno príncipe preto',
      link: 'https://www.amazon.com.br/Pequeno-Pr%C3%ADncipe-Preto-Rodrigo-Fran%C3%A7a/dp/8520938388/ref=asc_df_8520938388/?tag=googleshopp00-20&linkCode=df0&hvadid=709857900183&hvpos=&hvnetw=g&hvrand=9816482458083639234&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9101354&hvtargid=pla-883786461530&psc=1&mcid=1c66a1f86da9378889087290e3c9c40b&gad_source=1',
    },
    { 
      id: 4,
      imgUrl: 'https://m.media-amazon.com/images/I/71rQmmFSsEL._SL1000_.jpg',
      nome: 'Tulu',
      link: 'https://www.amazon.com.br/Tulu-Donaldo-W-Buchweitz/dp/8538091875/ref=asc_df_8538091875/?tag=googleshopp00-20&linkCode=df0&hvadid=709857900183&hvpos=&hvnetw=g&hvrand=9816482458083639234&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9101354&hvtargid=pla-1160497494152&psc=1&mcid=6239c4000c87364787133e42a737dc21&gad_source=1',
    },
  ];

  return (
    <div className={styles.sugestoesLivros}>
      <div className={styles.titulo}>
        <h2>Sugestões de Leitura</h2>
        <p>Essas são as sugestões de leitura da semana, seu filho vai adorar.</p>
      </div>

      <div className={styles.exibirLivro}>
        {livros.map((livro) => (
          <div key={livro.id} className={styles.livro}>
            <img src={livro.imgUrl} alt={livro.nome} />
            <span>{livro.nome}</span>
            <a
              href={livro.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Botao className={styles.botao_livro}> Ir para Site</Botao>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
