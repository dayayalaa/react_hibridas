import React from 'react';
import './App.css';
import Card from './Card'; 

function App() {
    const descripcion = "Viajar a Kioto es descubrir la esencia de Japón, con templos como Kinkaku-ji y los senderos de torii del Santuario Fushimi Inari. Su rica cultura, gastronomía y tradiciones te dejarán una experiencia inolvidable.";

    const productos = [
        { id: 1, nombre: 'Templo Kinkaku-ji', precio: '24USD' },
        { id: 2, nombre: 'Santuario Fushimi Inari Taisha', precio: 'Gratuito' },
        { id: 3, nombre: 'Templo Kiyomizu-dera', precio: '40USD' },
    ];

    return (
        <div className="App">
            <header className="App-header">
                <h1>Mi viaje a Kioto</h1>

                <p>{descripcion}</p>

                <img src="/kioto.jpg" alt="Ejemplo" width="300" />

                <h2>Lista de excursiones</h2>
                <div className="product-list">
                    {productos.map(producto => (
                        <Card key={producto.id} texto={producto.nombre} precio={producto.precio} />
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;
