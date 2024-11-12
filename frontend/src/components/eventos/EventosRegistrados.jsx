import styles from "@/styles/Eventos.module.css"
import { faMessage as farMessage, faPaste as farPaste, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { faCalendarDays, faCalendarPlus, faChalkboardUser, faHouse, faTasks, faUserPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

export default function EventosRegistrados() {

    const eventos = [
        {
            id: 1,
            nome: 'Feira de Ciências',
            dataInicio: '04/11/2024',
            descricao: 'Local: Avenida Lua de Mel',
            imagem: 'https://img.freepik.com/vetores-premium/um-desenho-de-criancas-e-um-professor-com-um-livro-intitulado-citacoes-de-criancas_1245440-1879.jpg?semt=ais_hybrid',
        },

        {
            id: 2,
            nome: 'Reunião de Pais',
            dataInicio: '12/12/2024',
            descricao: 'Local: Avenida Lua de Mel',
            imagem: 'https://img.freepik.com/vetores-premium/uma-reuniao-da-associacao-de-bairro-com-foco-na-adesao-impulsiona-desenho-animado-de-ilustracao-vetorial_969863-309578.jpg',
        },
    ];

    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    const abrirPopUp = (evento) => {
        setEventoSelecionado(evento);
    };

    const fecharPopUp = () => {
        setEventoSelecionado(null);
    };

    const dataAtual = new Date();
    const dataAtualFormatada = dataAtual.toLocaleDateString('pt-BR');

    const eventosFuturos = eventos.filter(evento => evento.dataInicio >= dataAtualFormatada);

    return (
        <div className={styles.containerEventosRegistrados}>
            <h2>Eventos</h2>

            {eventosFuturos.length > 0 ? (
                <div className={styles.listaEventos}>
                    {eventosFuturos.map((evento) => (
                        <div key={evento.id} className={styles.cardEvento} onClick={() => abrirPopUp(evento)}>

                            <img src={evento.imagem} alt={evento.nome} />

                            <div className={styles.textosCardEvento}>
                                <span>{evento.nome}</span>
                                <p>Data: {evento.dataInicio}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.mensagemEvento}>Não há eventos registrados!</p>
            )}

            {eventoSelecionado && (
                <div className={styles.popUp}>
                    <div className={styles.popUpContent}>

                        <button className={styles.closeButton} onClick={fecharPopUp}>
                            <FontAwesomeIcon icon={faX} />
                        </button>

                        <div className={styles.headerPopUp}>
                            <img src={eventoSelecionado.imagem} />
                            <h3>{eventoSelecionado.nome}</h3>
                        </div>

                        <p>Data: {eventoSelecionado.dataInicio}</p>
                        <p>{eventoSelecionado.descricao}</p>

                    </div>

                </div>
            )}
        </div>
    )
}