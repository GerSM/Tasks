//Para usar gitignore necesitas hacer un git init

//Importar las librerias que vamos a usar 
//http, path, fs, (leyendo archivos)

const http = require('http');
//http: sirve para crear un servidor y usar los metodos pertinentes
const path = require('path')
const fs = require('fs/promises')

const app = http.createServer( async (req, res ) => {

    //Metodo que se esta realizando 
    const method = req.method;
    const url = req.url;
    if (url === "/tasks"){
        const jsonPath = path.resolve('./data.json');
        const jsonFile =await fs.readFile(jsonPath, 'utf8')
        if(method === "GET" ){
            res.setHeader("Content-Type", "application/json")
            res.write(jsonFile)
        }
        if(method === "POST"){
           console.log(req.body);
           req.on("data", (data) => {
            //recibo un json
            //!Agregar la dat a data.json
                //?Necesito obtener la informacion *
                //?Necesito escribir en el archivo
                    //!Primero leer el archivo *
                        //*necesito la ruta del archivo *
                //?Escribir el archivo
            const newTask = JSON.parse(data);
            const arr = JSON.parse(jsonFile)
            arr.push(newTask)
            console.log(arr)
            const jsonRes = JSON.stringify(arr)
            fs.writeFile(jsonPath, jsonRes);
           }) 
        }
        if(method === "PUT"){
            req.on("data", async (data) => {
                /* const taskArray = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
                //const status = req.body
                const index = taskArray.findIndex((task) => task.id === id);
                taskArray[index].status = parse.status;
                await fs.writeFile(jsonPath, JSON.stringify(taskArray))
                res.writeHead("200"); */
                const parse = JSON.parse(data);
                //const taskArray = JSON.parse(data);
                const taskArray = JSON.parse(jsonFile);
                //const status = req.body;
                const index = taskArray.findIndex((task) => task.id === parse.id);
                taskArray[index].status = parse.status;
                const jsonRes = JSON.stringify(taskArray);
                fs.writeFile(jsonPath, jsonRes);
            })
        }
        if(method === "DELETE"){
            req.on("data", async (data) => {
                const parse = JSON.parse(data);
                const taskArray = JSON.parse(jsonFile);
                const filter = taskArray.filter((task) => task.id === parse.id);
                console.log(filter)
                const jsonRes = JSON.stringify(taskArray);
                fs.writeFile(jsonPath, jsonRes);
            })
        }
    }
        else{
            res.writeHead("503");
        }
    
    res.end();

});

const PORT = 8001;
app.listen(PORT);

console.log("Server Run")
