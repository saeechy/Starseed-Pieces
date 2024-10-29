const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const { renderMessagesPage, emailDisplay, facebookDisplay, instaDisplay, tiktokDisplay, renderProductsPage, renderCustomersPage } = require('./pages');

const products = require('./data'); // Update the path as needed


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Mock database (in memory)
let messages = [];
const filePath = './messages.json';

if (fs.existsSync(filePath)) {
    messages = JSON.parse(fs.readFileSync(filePath));
}
const saveMessages = () => {
    fs.writeFileSync(filePath, JSON.stringify(messages, null));
};

// Serve the pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});
app.get('/featured', (req, res) => {
    res.sendFile(__dirname + '/public/html/featured.html');
});
app.get('/product', (req, res) => {
    res.sendFile(__dirname + '/public/html/product2.html');
});
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/html/contact.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, phone, email, message, platform } = req.body;
    messages.push({ name, phone, email, message });

    if (platform === 'email') {
        res.redirect('/email'); 
    } else if (platform === 'facebook') {
        res.redirect('/facebook'); 
    } else if (platform === 'instagram') {
        res.redirect('/instagram'); 
    } else if (platform === 'tiktok') {
        res.redirect('/tiktok'); 
    } else {
        res.redirect('/contact'); 
    }
});

// Display customer messages
app.get('/messages', (req, res) => {
    const searchQuery = req.query.search?.toLowerCase() || '';
    const filteredMessages = messages.filter(msg =>
        Object.values(msg).some(value => value.toLowerCase().includes(searchQuery))
    );

    const messagesPageHtml = renderMessagesPage(filteredMessages);
    res.send(messagesPageHtml);
});
app.get('/email', (req, res) => {
    res.send(emailDisplay())
});
app.get('/facebook', (req, res) => {
    res.send(facebookDisplay())
});
app.get('/instagram', (req, res) => {
    res.send(instaDisplay())
});
app.get('/tiktok', (req, res) => {
    res.send(tiktokDisplay())
});

// Display customer product list
app.get('/products', (req, res) => {
    const searchQuery = req.query.search?.toLowerCase() || '';
    const filteredProducts = products.filter(product =>
        Object.values(product).some(value => 
            typeof value === 'string' && value.toLowerCase().includes(searchQuery)
        )
    );

    const productsPageHtml = renderProductsPage(filteredProducts);
    res.send(productsPageHtml);
});

// Serve the customer names
app.get('/customer', (req, res) => {
    const searchQuery = req.query.search?.toLowerCase() || '';
    const filteredCustomers = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchQuery) // Filter only by name
    );

    const customersPageHtml = renderCustomersPage(filteredCustomers);
    res.send(customersPageHtml);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
