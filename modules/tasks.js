const modules = require("./modules.js");
const program = modules.program;

const tasks = program.command("tasks");

// Instancia y creacion de Directorio
let mStrFullPath = modules.path.join(modules.BASE_PATH, 'tasks');
modules.fs.mkdirSync(mStrFullPath, { recursive: true })

function addTask(){
    tasks.command("add")
        .argument("<string/>")
        .action((params) => {
            /**
             * Ruta General de Fichero
             */
            let mStrFilePath = modules.path.join(mStrFullPath, 'general.json')

            /**
             * Validamos si creamos el fichero o lo leemos
             * */
            if (modules.fs.existsSync(mStrFilePath)) {
                let mObjTasks = modules.fs.readFileSync(mStrFilePath);

                if (mObjTasks){
                    try{
                        /**
                         * Actualizacion de Informacion
                         * Agregamos nueva Tarea
                        */
                        mObjTasks = JSON.parse(mObjTasks);

                        mObjTasks.tasks?.push({
                            task: params,
                            done: false
                        })

                        mObjTasks.updatedAt = new Date();

                        /**
                         * Sobreescritura de Fichero
                        */
                        modules.fs.writeFileSync(mStrFilePath, JSON.stringify(mObjTasks, null, 2));

                    } catch(err) {
                        throw new Error("Error to asign the Task")
                    }
                }
            } else {
                let mObjFullObj = {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    tasks : []
                }

                mObjFullObj.tasks.push({
                    task: params,
                    done: false
                })

                modules.fs.writeFileSync(mStrFilePath, JSON.stringify(mObjFullObj, null, 2));
            }
        })
}

function listTask(){
    tasks.command("list")
        .action(() => {
            /**
             * Ruta General de Fichero
             */
            let mStrFilePath = modules.path.join(mStrFullPath, 'general.json')

            if (modules.fs.existsSync(mStrFilePath)) {
                let mObjTasks = modules.fs.readFileSync(mStrFilePath);

                if(mObjTasks){
                    mObjTasks = JSON.parse(mObjTasks);
                    mObjTasks.tasks
                        .filter(mRowTask => !mRowTask.done)
                        .map(mRowTask => mRowTask.task)
                        .forEach((mRowTask, mIntIndex) => {
                            console.log(`${mIntIndex+1}. ${mRowTask}`)
                        })
                }
            } else {
                console.log("Not exists Tasks to show");
            }
        })
}

function doneTask(){
    tasks.command("done")
        .argument("<number/>", "Number of the pendent task.")
        .action((params) => {
            let mStrFilePath = modules.path.join(mStrFullPath, 'general.json');

            if (modules.fs.existsSync(mStrFilePath)) {
                let mObjTasks = modules.fs.readFileSync(mStrFilePath);

                if (mObjTasks) {
                    mObjTasks = JSON.parse(mObjTasks);

                    if (mObjTasks.tasks[Number.parseInt(params)-1]) {
                        mObjTasks.tasks[params-1].done = true;
                        mObjTasks.tasks[params-1].finish = new Date();

                        /**
                         * Validacion de que exista Arreglo Done
                        */
                        mObjTasks.done = mObjTasks.done && Array.isArray(mObjTasks.done)
                            ? mObjTasks.done
                            : []

                        mObjTasks.done.push(mObjTasks.tasks[params-1]);
                        mObjTasks.tasks.splice(params-1, 1);

                        modules.fs.writeFileSync(mStrFilePath, JSON.stringify(mObjTasks, null, 2));
                    } else {
                        console.log("Not exist tasks");
                    }
                } else {
                    console.log("Not exist tasks");
                }
            } else {
                console.log("Not exist tasks");
            }
        })
}

function removeTask(){

}

function initTask(){
    addTask();
    listTask();
    doneTask();
    removeTask();
}

module.exports = {
    initTask
}