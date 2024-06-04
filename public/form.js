const arrInput = ['#Name','#Email','#Celular','#Demanda']

async function sendData(event) {
    event.preventDefault();

    let name = document.querySelector('#Name').value;
    let email = document.querySelector('#Email').value;
    let celular = document.querySelector('#Celular').value;
    let info = document.querySelector('#Demanda').value;

    const data = {
        name: name,
        email: email,
        celular: celular,
        message:info
    }   

    

    const response = await fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        Swal.fire('Email enviado com sucesso!');
        arrInput.map((key)=> {
            document.querySelector(`${key}`).value = '';
        })
    } else {
        Swal.fire('Erro ao enviar email.');
        arrInput.map((key)=> {
            document.querySelector(`${key}`).value = '';
        })
    }
};