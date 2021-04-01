import {Engine} from './Engine.js'

class Main {

    public main(): void {
        let engine = new Engine();
        engine.run();
    }

}

let main = new Main();
main.main();