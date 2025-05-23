// src/App.js
import React from 'react';
import EventCard from './EventCard';
import './App.css'; // Puedes dejar los estilos por defecto o modificarlos

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Aplicación de Agenda de Eventos</h1>
      </header>
      <main>
        <EventCard />
      </main>
    </div>
  );
}

export default App;