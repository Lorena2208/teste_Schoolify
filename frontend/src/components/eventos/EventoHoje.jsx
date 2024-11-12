import styles from "@/styles/Eventos.module.css"

export default function EventoHoje() {

    const eventoHoje = [
        {
            id: 1,
            nome: 'Feira de Ciências',
            dataInicio: '04/11/2024',
            descricao: 'Local: Pátio da Escola',
            imagem: 'https://img.freepik.com/vetores-premium/um-desenho-de-criancas-e-um-professor-com-um-livro-intitulado-citacoes-de-criancas_1245440-1879.jpg?semt=ais_hybrid',
        },
    ];

    const dataAtual = new Date().toLocaleDateString('pt-BR');

    const eventosHoje = eventoHoje.filter(evento => evento.dataInicio === dataAtual);
    return (
        <div className={styles.eventoHoje}>
            {eventosHoje.length > 0 ? (

                <div className={styles.containerEventosHoje}>
                    {eventosHoje.map((evento) => (

                        <div key={evento.id} className={styles.cardEventoHoje}>
                            <img src={evento.imagem} alt={evento.nome} />
                            <div className={styles.textosCardEvento}>
                                <span>{evento.nome}</span>
                                <p>O evento ocorrerá hoje!</p>
                            </div>

                        </div>
                    ))}
                    
                </div>
            ) : (
                <p className={styles.mensagemEvento}>Não há eventos registrados para hoje!</p>
            )}
        </div>
    )
}