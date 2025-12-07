const express = require('express');
const session = require('express-session');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layout'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'segredo123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./src/routes/home'));
app.use('/produto', require('./src/routes/produto'));
app.use('/categoria', require('./src/routes/categoria'));
app.use('/carrinho', require('./src/routes/carrinho'));
app.use('/pedido', require('./src/routes/pedido'));
app.use('/usuario', require('./src/routes/usuario'));

app.listen(3000, () =>
    console.log("Rodando em http://localhost:3000")
);
