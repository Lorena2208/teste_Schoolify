import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/Calendario.module.css';

export default function Calendario({tamanho}){
    
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthYearElementRef = useRef(null);
    const dateGridElementRef = useRef(null);

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const today = new Date();

        if (monthYearElementRef.current) {
            monthYearElementRef.current.textContent = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase();
        }

        // Limpa o grid do calendário
        if (dateGridElementRef.current) {
            dateGridElementRef.current.innerHTML = '';
        }

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        // Enche os dias vazios antes do primeiro dia do mês
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add(styles.date, styles.empty);
            dateGridElementRef.current.appendChild(emptyDiv);
        }

        // Adiciona os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dateDiv = document.createElement('div');
            dateDiv.classList.add(styles.date);

            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dateDiv.classList.add(styles.today);
            }

            dateDiv.textContent = day;
            dateGridElementRef.current.appendChild(dateDiv);
        }
    };

    useEffect(() => {
        renderCalendar();
    }, [currentDate]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

   return(
    <div className={`${styles.calendar} ${styles[tamanho]}`}>
    <div className={styles.header}>
        <button className={styles.buttons} onClick={handlePrevMonth} id="prev">&lt;</button>
        <h2 ref={monthYearElementRef} id="monthYear"></h2>
        <button className={styles.buttons} onClick={handleNextMonth} id="next">&gt;</button>
    </div>
    <div className={styles.days}>
        <div className={styles.day}>Dom</div>
        <div className={styles.day}>Seg</div>
        <div className={styles.day}>Ter</div>
        <div className={styles.day}>Qua</div>
        <div className={styles.day}>Qui</div>
        <div className={styles.day}>Sex</div>
        <div className={styles.day}>Sáb</div>
    </div>
    <div ref={dateGridElementRef} id="dateGrid" className={styles.dateGrid}></div>
</div>
   )
}