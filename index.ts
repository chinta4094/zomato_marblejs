import { createServer } from '@marblejs/http';
import { IO } from 'fp-ts/lib/IO';
import listener from './listener/httpListener';
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/Marblejs",(err) : void => {
    if(!err){
       return console.log("CONNECTED TO DB!")
    }else{
       return console.log("NOT CONNECTED TO DB!")
    }
})

const server = createServer({
  port: 1337,
  hostname: '127.0.0.1',
  listener,
});

const main: IO<void> = async () =>
  await (await server)();

main();