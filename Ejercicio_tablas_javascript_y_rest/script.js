//Funcion que ejecuta el fetch contra la url que recibe como argumento.

function getDatos(url) {
    return new Promise(function (resolve, reject) {
        fetch(url).then(function (response) {
            setTimeout(function () {
                resolve(response.json())
            });

        }).catch(function (error) {
            reject(error);
        })
    })
}

//Declaracion de variables globales

let tbody = document.querySelector("#tbody");
let botonAdd = document.querySelector("#botonAdd");


//funcion que añade los empleados a la tabla
function cargarEmpleados() {
    let url = "empleados.json"
    getDatos(url).then(function (empleados) {
        for (let i = 0; i < empleados._embedded.employees.length; i++) {

            generarTabla(empleados._embedded.employees[i]);
    
        }
    })
}

//función que genera la tabla
function generarTabla(empleados){

    //declaracion y asignacion de variables, se crean los elementos de la tabla
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");
            let td6 = document.createElement("td");
            let td7 = document.createElement("td");

            //Añadimos id al tr creado
            var nombre = "id";
            var identificador;
            identificador = nombre.concat(empleados.identificador)
            tr.setAttribute("id", identificador);

            //Se añaden los elementos anteriormente creados
            tbody.appendChild(tr);
            tr.appendChild(td);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);


            //Se añade la información del empleado a la tabla
            td.innerHTML = empleados.nombre;
            td1.innerHTML = empleados.apellidos;
            td2.innerHTML = empleados.dni;
            td3.innerHTML = empleados.identificador;
            td4.innerHTML = empleados.fecha_alta;
            td5.innerHTML = empleados.fecha_baja;

            //Tabla jornadas
            let tablaJornada = document.createElement("table");
            let filaLunes = document.createElement("tr");
            let diaLunes = document.createElement("td");
            let horarioLunes = document.createElement("td");
            let filaMartes = document.createElement("tr");
            let diaMartes = document.createElement("td");
            let horarioMartes = document.createElement("td");
            let filaMiercoles = document.createElement("tr");
            let diaMiercoles = document.createElement("td");
            let horarioMiercoles = document.createElement("td");
            let filaJueves = document.createElement("tr");
            let diaJueves = document.createElement("td");
            let horarioJueves = document.createElement("td");
            let filaViernes = document.createElement("tr");
            let diaViernes = document.createElement("td");
            let horarioViernes = document.createElement("td");
            let filaSabado = document.createElement("tr");
            let diaSabado = document.createElement("td");
            let horarioSabado = document.createElement("td");
            let filaDomingo = document.createElement("tr");
            let diaDomingo = document.createElement("td");
            let horarioDomingo = document.createElement("td");
            let filaDescripcion = document.createElement("tr");
            let descripcion = document.createElement("td");
            let horarioDescripcion = document.createElement("td");
            
            tablaJornada.appendChild(filaDescripcion)
            filaDescripcion.appendChild(descripcion);
            filaDescripcion.appendChild(horarioDescripcion);
            tablaJornada.appendChild(filaLunes)
            filaLunes.appendChild(diaLunes);
            filaLunes.appendChild(horarioLunes);
            tablaJornada.appendChild(filaMartes);
            filaMartes.appendChild(diaMartes);
            filaMartes.appendChild(horarioMartes);
            tablaJornada.appendChild(filaMiercoles);
            filaMiercoles.appendChild(diaMiercoles);
            filaMiercoles.appendChild(horarioMiercoles);
            tablaJornada.appendChild(filaJueves);
            filaJueves.appendChild(diaJueves);
            filaJueves.appendChild(horarioJueves);
            tablaJornada.appendChild(filaViernes);
            filaViernes.appendChild(diaViernes);
            filaViernes.appendChild(horarioViernes);
            tablaJornada.appendChild(filaSabado);
            filaSabado.appendChild(diaSabado);
            filaSabado.appendChild(horarioSabado);
            tablaJornada.appendChild(filaDomingo);
            filaDomingo.appendChild(diaDomingo);
            filaDomingo.appendChild(horarioDomingo);
            
            td6.appendChild(tablaJornada);
            descripcion.innerHTML = "Descripción:"
            diaLunes.innerHTML = "Lunes:"
            diaMartes.innerHTML = "Martes:"
            diaMiercoles.innerHTML = "Martes:"
            diaJueves.innerHTML = "Jueves:";
            diaViernes.innerHTML ="Viernes";
            diaSabado.innerHTML = "Sabado";
            diaDomingo.innerHTML = "Domingo"

            //se llama con la url de las jornadas para obtener los datos.
            let url2 = "jornadas.json"
            getDatos(url2).then(function(jornada){
                for(let x=0; x< jornada.jornadas.length; x++){

                    if(jornada.jornadas[x].id == empleados.jornada){
                        horarioDescripcion.innerHTML = jornada.jornadas[x].descripcion;
                        horarioLunes.innerHTML = jornada.jornadas[x].lunes;
                        horarioMartes.innerHTML = jornada.jornadas[x].martes;
                        horarioMiercoles.innerHTML = jornada.jornadas[x].miercoles;
                        horarioJueves.innerHTML = jornada.jornadas[x].jueves;
                        horarioViernes.innerHTML = jornada.jornadas[x].viernes;
                        horarioSabado.innerHTML = jornada.jornadas[x].sabado;
                        horarioDomingo.innerHTML = jornada.jornadas[x].domingo

                    }
                }
            })
     
            //Boton para borrar la fila
            td7.innerHTML = `<button class="btn btn-danger" onclick="borrar(${identificador})">Borrar</button>`;
}

//Funcion para borrar la fila seleccionada
function borrar(identificador) {
    tbody.removeChild(identificador)
}

//Evento para añadir un nuevo empleado
botonAdd.addEventListener("click", () => {
    let inputNombre = document.querySelector("#inputNombre");
    let inputApellidos = document.querySelector("#inputApellidos");
    let inputDni = document.querySelector("#inputDni");
    let inputIdentificador = document.querySelector("#inputIdentificador");
    let inputFechaAlta = document.querySelector("#inputFechaAlta");
    let inputJornada = document.querySelector("#inputJornada");

    //Se crea el objeto empleado
    let empleados = {"nombre":inputNombre.value, "apellidos":inputApellidos.value, "dni":inputDni.value, "identificador":inputIdentificador.value, "fecha_alta":inputFechaAlta.value, "jornada":inputJornada.value};

    //Se llama a la funcion generar tabla con empleados de argumento.
    generarTabla(empleados);
    
})