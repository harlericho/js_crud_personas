var app = new function () {
    const url = "http://localhost:5000/"
    this.id = document.getElementById("id")
    this.nombres = document.getElementById("nombres")
    this.dni = document.getElementById("dni")
    this.fecha = document.getElementById("fecha")
    this.correo = document.getElementById("correo")
    this.tbody = document.getElementById("tbody")

    this.listado = () => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                html = []
                data.datos.forEach(element => {
                    html += "<tr>"
                    html += "<td>" + (element['id'] - 2) + "</td>"
                    html += "<td>" + element['dni'] + "</td>"
                    html += "<td>" + element['nombres'] + "</td>"
                    html += "<td>" + element['fecha'] + "</td>"
                    html += "<td>" + element['correo'] + "</td>"
                    html += "<td><button type='button' class='btn btn-success btn-sm'  onClick='app.obtener(" + element['id'] + ")'>Editar</button></td>"
                    html += "<td><button type='button' class='btn btn-danger btn-sm' onClick='app.eliminar(" + element['id'] + ")'>Eliminar</button></td>"
                    html += "</tr>"
                })
                this.tbody.innerHTML = html
            })
            .catch(error => console.error(error))
    }
    this.guardar = () => {
        const info = {
            dni: this.dni.value,
            nombres: this.nombres.value,
            fecha: this.fecha.value,
            correo: this.correo.value
        }
        if (this.id.value === "") {
            fetch(url, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(info)
                })
                .then(response => response.json())
                .then((data) => {
                    if (data.dni) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(data.dni);
                        this.dni.focus()
                    } else if (data.correo) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(data.correo);
                        this.correo.focus()
                    } else if (data.nombres) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(data.nombres);
                        this.nombres.focus()
                    } else if (data.fecha) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(data.fecha);
                        this.fecha.focus()
                    } else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(data.datos);
                        this.listado()
                        this.limpiar()
                    }
                })
                .catch(error => console.error(error))
        } else {
            fetch(url + this.id.value, {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(info)
                })
                .then(response => response.json())
                .then((data) => {
                    if (data.dni) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(data.dni);
                        this.dni.focus()
                    } else if (data.correo) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(data.correo);
                        this.correo.focus()
                    } else if (data.nombres) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(data.nombres);
                        this.nombres.focus()
                    } else if (data.fecha) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(data.fecha);
                        this.fecha.focus()
                    } else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(data.datos);
                        this.listado()
                        this.limpiar()
                    }
                })
                .catch(error => console.error(error))
        }
    }
    this.limpiar = () => {
        document.getElementById("formulario").reset()
        this.dni.focus()
    }
    this.obtener = (id) => {
        fetch(url + id, {
                method: "GET",
            })
            .then(response => response.json())
            .then((data) => {
                this.id.value = data.datos['id']
                this.dni.value = data.datos['dni']
                this.nombres.value = data.datos['nombres']
                this.fecha.value = data.datos['fecha']
                this.correo.value = data.datos['correo']
                alertify.set('notifier', 'position', 'top-right');
                alertify.warning("Usted va a actualizar los datos");
            })
            .catch(error => console.error(error))
    }
    this.eliminar = (id) => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'Su archivo ha sido eliminado',
                    'success'
                )
                fetch(url + id, {
                        method: "DELETE",
                    })
                    .then(response => response.json())
                    .then((data) => {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(data.datos);
                        this.listado()
                    })
                    .catch(error => console.error(error))
            }
        })
    }
}
app.listado()