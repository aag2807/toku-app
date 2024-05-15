import * as http from "node:http";
import {App} from "./lib/app";
import {TokuController} from "./controller/toku-controller";

const PORT: number = 3030;

const app: App = new App( );
app.registerControllers( new TokuController() )

http.createServer( app.fetch ).listen( PORT )

