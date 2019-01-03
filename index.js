const Hapi = require('hapi');
const Mongoose = require('mongoose');
const Painting = require('./models/Painting');

const server = Hapi.server({
    port: 8000,
    host: 'localhost'
});

// Mongoose Config
Mongoose.connect('mongodb://<user>:<password>@<yourds>.mlab.com:<port>/<db-name>')


Mongoose.connection.once('open', () => {
    console.log('Connected to DB')
});

const init = async () => {
    server.route([
        {
            method:'GET',
            path: '/',
            handler: (request, reply) => {
                return `<h1>I was promised GraphQL</h1>`;
            }
        },
        {
            method: 'GET',
            path: '/api/v1/paintings',
            handler: (request, reply) => {
                return Painting.find()
            }
        },
        {
            method: 'POST',
            path: '/api/v1/paintings',
            handler: (request, reply) => {
                const { name, url, techniques } = request.payload
                const painting = new Painting({
                    name,
                    url,
                    techniques
                });
                
                return painting.save()
            }
        },
    ]);

    // Server Startup
    await server.start( (err) => {
        if(err){
            throw err;
        }
    });
    console.log(`Server running at: ${server.info.uri}`);
};

init();