import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from 'path';

import * as ejs from 'ejs';
import * as ejsEngine from 'ejs-mate';
import { Routes } from "./routes/crmRoutes";
import { OrderRoutes } from "./routes/orderRoutes";
import * as mongoose from "mongoose";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public orderRt: OrderRoutes = new OrderRoutes();
    public mongoUrl: string = 'mongodb://localhost/CRMdb';
    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.orderRt.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/', express.static(path.join(__dirname, 'public')));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('ejs', ejsEngine);
        this.app.set('view engine', 'ejs');
       // this.app.set('view options', { layout:'index.ejs' });
    }
    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);

    }

}

export default new App().app;