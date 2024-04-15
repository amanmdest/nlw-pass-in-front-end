let participantes = [
    {
      nome: "Aman Modesto",
      email: "aman@gmail.com",
      dataInscricao: new Date(2024, 0, 22, 19, 20),
      dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
      nome: "John Frusciante",
      email: "frusciante@gmail.com",
      dataInscricao: new Date(2024, 3, 13, 9, 20),
      dataCheckIn: new Date(2024, 6, 15, 2, 0)
    },
    {
      nome: "Maria Silva",
      email: "maria@gmail.com",
      dataInscricao: new Date(2024, 2, 10, 14, 30),
      dataCheckIn: new Date(2024, 3, 20, 10, 45)
    },
    {
      nome: "Carlos Oliveira",
      email: "carlos@gmail.com",
      dataInscricao: new Date(2024, 1, 15, 11, 10),
      dataCheckIn: null
    },
    {
      nome: "Ana Costa",
      email: "ana@gmail.com",
      dataInscricao: new Date(2023, 3, 18, 17, 45),
      dataCheckIn: new Date(2023, 6, 7, 9, 30)
    },
    {
      nome: "Pedro Santos",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2023, 5, 5, 8, 0),
      dataCheckIn: null
    },
    {
      nome: "Laura Mendes",
      email: "laura@gmail.com",
      dataInscricao: new Date(2023, 6, 30, 21, 20),
      dataCheckIn: null
    },
    {
      nome: "Gabriel Almeida",
      email: "gabriel@gmail.com",
      dataInscricao: new Date(2023, 8, 8, 13, 15),
      dataCheckIn: new Date(2023, 11, 5, 8, 55)
    },
    {
      nome: "Juliana Lima",
      email: "juliana@gmail.com",
      dataInscricao: new Date(2023, 7, 25, 10, 30),
      dataCheckIn: new Date(2023, 10, 12, 15, 10)
    },
    {
      nome: "Fernando Souza",
      email: "fernando@gmail.com",
      dataInscricao: new Date(2023, 9, 12, 16, 50),
      dataCheckIn: new Date(2023, 11, 20, 20, 25)
    }
  ]
  
  const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  
    if(participante.dataCheckIn == null) {
      dataCheckIn = `
        <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
          Confirmar check-in
        </button>
      `
    }
  
    return `
      <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
  }
  
  const atualizarLista = (participantes) => {
    let output = ""
    for (let participante of participantes){
      output = output + criarNovoParticipante(participante)
    }
  
    document
    .querySelector('tbody')
    .innerHTML = output
  }
  
  atualizarLista(participantes)
  
  const adicionarParticipante = (event) => {
    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)
  
    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
    }
  
    const participanteExiste = participantes.find(
      (p) =>  p.email == participante.email
    )
  
    if(participanteExiste) {
      alert('Email já cadastrado')
      return
    }
  
    participantes= [participante, ...participantes]
    atualizarLista(participantes)
  
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
  
  }
  
  const fazerCheckIn = (event) => {
  
    const mensagemConfirmação = "Tem certeza que deseja fazer o check-in"
    if(confirm(mensagemConfirmação) == false) {
      return
    }
  
    const participante = participantes.find((p) => p.email == event.target.dataset.email)
  
    participante.dataCheckIn = new Date()
  
    atualizarLista(participantes)
  }
  