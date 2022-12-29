const express = require("express");

const cors = require("cors");

const admin = require("firebase-admin");

const Routes = "./routes";

var serviceAccount = require("./keys/muserpol-pvt-9d002-firebase-adminsdk-7wr01-a4f5c7d947.json");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      notification: '/api/notification',
    }

    this.firebase();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  firebase() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  middlewares() {
    this.app.use((express.json({ limit: '50mb' })));
    this.app.use((express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })));
    //cors
    this.app.use(cors());
    //lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static('src/public'));

  }

  routes() {
    this.app.use(
      this.paths.notification,
      require(`${Routes}/notification.route`)
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
module.exports = Server;
