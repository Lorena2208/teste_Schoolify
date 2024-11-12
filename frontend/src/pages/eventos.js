import Menu from "@/components/menu/Menu";
import styles from "@/styles/Eventos.module.css";
import Calendario from "@/components/calendario/Calendario";
import EventosRegistrados from "@/components/eventos/EventosRegistrados";
import EventoHoje from "@/components/eventos/EventoHoje";



export default function Eventos(){
    return(
        <>
        <Menu/>
        <div className="container_tela">
            <div className={styles.containerComponentes}>
                <div className={styles.containerCalendario}>
                    <h1>Calendário de Eventos</h1>
                    <Calendario tamanho="grande"/>
                    <EventoHoje/>
                </div>
                <EventosRegistrados/>
            </div>
        </div>
        </>
    )
}