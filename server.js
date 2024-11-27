const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Хранилище сообщений (в реальной системе лучше использовать базу данных)
let messages = [];

// Middleware для обработки JSON и формы
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Обслуживание статики (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API для получения всех сообщений
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// API для отправки сообщения
app.post('/api/messages', (req, res) => {
    const { sender, content, recipient } = req.body;

    if (!sender || !content) {
        return res.status(400).json({ error: 'Поля "отправитель" и "сообщение" обязательны' });
    }

    const newMessage = {
        id: messages.length + 1,
        sender,
        content,
        recipient,
        timestamp: new Date()
    };

    messages.push(newMessage);
    res.status(201).json({ success: true, message: 'Сообщение отправлено', data: newMessage });
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
