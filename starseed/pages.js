function head(){
    return `
    <head>
        <title>St⭑rseed Pieces Customer Messages</title>
        <meta charset = "utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <link rel="stylesheet" href="scss/styles.css" type="text/css"/>
        <link rel="stylesheet" href="css/contact-style.css" type="text/css"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/f7a6d6f70c.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>   
        <link rel="shortcut icon" href="../images/logo.png">
        <link rel="icon" type="image/png" sizes="32x32" href="images/logo.png">
        <link rel="icon" type="image/png" sizes="16x16" href="images/logo.png">
        <style>
            img {
                width: 100%;
                margin 0 auto;
            }
            video {
                width: 50%;
                margin: 0 auto;
                display: block;
            }
        </style>
    </head>`
}

function footer() {
    return `
    <footer>
        <div id="footer">
            <div class="footer-links">
                <a href="/products">Product List</a>
                <a href="/messages">Customer Messages</a>
                <a href="/customer">Customer Info</a>
            </div>
            <p>Established 2021 Created by Team Star Rocket</p>
        </div>
    </footer>
    `
}

function renderMessagesPage(messages) { //FUCTION FOR CUSTOMER MESSAGES
    const messagesHtml = messages.map(msg => `
        <tr>
            <td>${msg.name}</td>
            <td>${msg.phone}</td>
            <td>${msg.email}</td>
            <td>${msg.message}</td>
        </tr>
    `).join('');

    return `
        <html>
        ${ head() }
        <body>
            <div class="container customer-messages">
                <h1 class="text-center">Customer Messages</h1>
                <form class="form-inline justify-content-center mt-4" action="/messages" method="GET">
                    <input class="form-control mr-2" type="search" name="search" placeholder="Search..." aria-label="Search">
                    <button class="btn" type="submit">Search</button>
                </form>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${messagesHtml || '<tr><td colspan="4" class="text-center text-danger">No messages found</td></tr>'}
                        </tbody>
                    </table>
                </div>
                <a href="/contact" class="back-btn">Back to Contact</a>
            </div>
            ${footer()}
        </body>
        </html>
    `;
}
function renderProductsPage(products) { // FUNCTION FOR CUSTOMER PRODUCTS
    const productsHtml = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>
                <ul>
                    ${product.description.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            </td>
            <td>${product.price}</td>
            <td class="text-center">
                <img src="${product.image}" alt="${product.name}" style="width: 150px; height: 150px; object-fit: cover;">
            </td>
        </tr>
    `).join('');

    return `
        <html>
        ${ head() }
        <body>
            <div class="container product-list">
                <h1 class="text-center">Product List</h1>
                <form class="form-inline justify-content-center mt-4" action="/products" method="GET">
                    <input class="form-control mr-2" type="search" name="search" placeholder="Search products..." aria-label="Search">
                    <button class="btn" type="submit">Search</button>
                </form>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productsHtml || '<tr><td colspan="4" class="text-center text-danger">No products found</td></tr>'}
                        </tbody>
                    </table>
                </div>
                <a href="/product" class="back-btn">Back to  Products</a>
            </div>
            ${footer()}
        </body>
        </html>
    `;
}
function renderCustomersPage(customers) { // FUNCTION FOR CUSTOMER NAMES
    const customersHtml = customers.map(customer => `
        <tr>
            <td>${customer.name}</td>
        </tr>
    `).join('');

    return `
        <html>
        ${ head() }
        <body>
            <div class="container customer-list">
                <h1 class="text-center">Customer Names</h1>
                <form class="form-inline justify-content-center mt-4" action="/customer" method="GET">
                    <input class="form-control mr-2" type="search" name="search" placeholder="Search customers..." aria-label="Search">
                    <button class="btn" type="submit">Search</button>
                </form>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${customersHtml || '<tr><td colspan="1" class="text-center text-danger">No customers found</td></tr>'}
                        </tbody>
                    </table>
                </div>
                <a href="/messages" class="back-btn">Back to Messages</a>
            </div>
            ${footer()}
        </body>
        </html>
    `;
}



function emailDisplay() {
    return `
    <html>
        ${head()}
        <body>
            <div class="container">
                <a href="/contact" class="back-btn">Back to Contact</a>
                <img src="images/mockups/email-starseed.png">
            </div>
        </body>
        ${footer()}
    </html>
    `
}
function facebookDisplay() {
    return `
    <html>
        ${head()}
        <body>
            <div class="container">
                <a href="/contact" class="back-btn">Back to Contact</a>
                <img src="images/mockups/fb-starseed.png">
            </div>
        </body>
        ${footer()}
    </html>
    `
}
function instaDisplay() {
    return `
    <html>
        ${head()}
        <body>
            <div class="container">
                <a href="/contact" class="back-btn">Back to Contact</a>
                <img src="images/mockups/ig-starseed.png">
            </div>
        </body>
        ${footer()}
    </html>
    `
}
function tiktokDisplay() {
    return `
    <html>
        ${head()}
        <body>
            <div class="container">
                <a href="/contact" class="back-btn">Back to Contact</a>
                <video loop muted controls autoplay>
                    <source src="images/mockups/tiktok-starseed.mp4">
                </video>
            </div>
        </body>
        ${footer()}
    </html>
    `
}
module.exports = { renderMessagesPage, emailDisplay, facebookDisplay, instaDisplay, tiktokDisplay, renderProductsPage, renderCustomersPage };
