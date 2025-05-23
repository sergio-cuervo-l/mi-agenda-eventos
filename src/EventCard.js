import React, { useState } from 'react';
// Ya no necesitamos importar 'ics' si no vamos a generar el archivo .ics
// import * as ics from 'ics'; 
import './EventCard.css'; // Crearemos este archivo para estilos básicos

function EventCard() {
    const [eventName, setEventName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [comments, setComments] = useState('');
    // Nuevo estado para almacenar la lista de eventos/tarjetas
    const [eventCards, setEventCards] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir el envío tradicional del formulario

        if (!eventName || !email || !date || !time) {
            alert('Por favor, completa todos los campos obligatorios (Nombre del evento, Correo, Fecha, Hora).');
            return;
        }

        // Crear un objeto con los datos del evento actual
        const newEvent = {
            eventName,
            email,
            date,
            time,
            comments: comments || 'Sin comentarios', // Aseguramos que siempre haya un valor
            id: new Date().getTime(), // Un ID único para cada tarjeta (útil para React keys)
        };

        // Actualizar el estado añadiendo el nuevo evento a la lista
        setEventCards(prevCards => [...prevCards, newEvent]);

        alert('¡Evento guardado como tarjeta!');
        // Limpiar formulario
        setEventName('');
        setEmail('');
        setDate('');
        setTime('');
        setComments('');
    };

    return (
        <div className="event-card-container"> {/* Contenedor principal para el formulario y las tarjetas */}
            <div className="event-form">
                <h2>Agendar Nuevo Evento 🗓️</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="eventName">Nombre del Evento:</label>
                        <input
                            type="text"
                            id="eventName"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico (para el asistente):</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Fecha:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Hora:</label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comentarios:</label>
                        <textarea
                            id="comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="save-button">Guardar Información</button>
                </form>
            </div>

            <hr />

            <div className="event-cards-display">
                <h2>Eventos Agendados</h2>
                {eventCards.length === 0 ? (
                    <p>No hay eventos agendados aún. ¡Crea uno!</p>
                ) : (
                    <div className="cards-grid">
                        {eventCards.map((event) => (
                            <div key={event.id} className="event-display-card">
                                <h3>{event.eventName}</h3>
                                <p><strong>Correo:</strong> {event.email}</p>
                                <p><strong>Fecha:</strong> {event.date}</p>
                                <p><strong>Hora:</strong> {event.time}</p>
                                <p><strong>Comentarios:</strong> {event.comments}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventCard;