var form = document.getElementById('form')
var inputs = document.querySelectorAll('#form input')

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{8,16}$/, // MIN 8 MAX 16 Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{6,16}$/, // MIN 6 MAX 16 Letras y espacios, pueden llevar acentos.
    password: /^.{8,12}$/, // 8 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10,14}$/ // 10 a 14 numeros.
}
const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos[campo] = true
    } else {
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle')
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos[campo] = false
    }
}

const validarPass = () => {
    const input1 = document.getElementById('password')
    const input2 = document.getElementById('password2')

    if (input1.value !== input2.value) {
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle')
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle')
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto')
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos['password'] = false
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto')
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto')
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle')
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle')
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos['password'] = true
    }
}

var validarForm = (e) => {

    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario')
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre')
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password')
            validarPass()
            break;
        case "password2":
            validarPass()
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo')
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono')
            break;
    }

}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm)
    input.addEventListener('blur', validarForm)
})


form.addEventListener('submit', e => {
    e.preventDefault()
})
document.addEventListener('mousemove', e => {
    var term = document.getElementById('terminos')
    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && term.checked) {
        document.getElementById('send').disabled = false
    } else {
        document.getElementById('send').disabled = true
    }
})