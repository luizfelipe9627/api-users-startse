// Está importando o Express de um outro diretório.
import express from "express";

// Está importando os códigos de status presente em outro arquivo.
import {StatusCodes} from 'http-status-codes';

// Variável constante que é responsável por chamar o express.
const app = express();

// Garante que todos os objetos criados e usados sejam enviados e trabalhados no formato JSON.
app.use(express.json());

// Criado uma variável constante responsável por armazenar a porta. Basicamente irá definir uma porta, se ele não conseguir ele vai definir em 3000.
// Para o Heroku reconhecer deve se escrever "PORT" em inglês mesmo.
const PORT = process.env.PORT || 3000;

// Criado um JSON que está contendo dois objetos como seus filhos.
let usuarios = [
  {
    id: 1,
    nome: 'Lucas Pereira',
    idade: 23,
  },
  {
    id: 2,
    nome: 'Rafaela Brito',
    idade: 18,
  }
];

// Quando o listen "escutar" essa porta vai executar a função criada.
app.listen(PORT, () => {
  // Irá apresentar a resposta no console.
  console.log(`Servidor rodando em http://localhost:${PORT}`)
});

// Irá obter a resposta, e atribuir no direcionamento definido.
// O get é utilizado para obter uma lista ou detalhes de usuários. Usa o status 200.
app.get('/', (requisicao, resposta) => {
  // Quando chegar na página raiz irá retornar e enviar uma resposta ao usuário.
  return resposta.send('<h1>Trabalhando com servidor express.</h1>');
});

// Irá obter toda a lista de usuários, e atribuir no direcionamento definido.
// O get é utilizado para obter uma lista ou detalhes de usuários. Usa o status 200.
app.get('/usuarios', (requisicao, resposta) => {
  // Quando ser acessado o /usuarios será enviado a lista de usuários para o navegador do usuário.
  return resposta.send(usuarios);
});

// Irá obter uma parte da lista de usuários e atribuir no direcionamento definido.
// O get é utilizado para obter uma lista ou detalhes de usuários. Usa o status 200.
app.get('/usuarios/:usuarioID', (requisicao, resposta) => {
  // O params é um objeto que contém propriedades mapeadas para os “parâmetros” da rota nomeada. Por exemplo, se você tiver a rota / aluno /: id, a propriedade “id” estará disponível como req.params.id.
  const usuarioID = requisicao.params.usuarioID;

  // O find é usado para percorrer cada elemento de algo, nesse caso irá percorrer a lista de usuários até que ele encontre o que foi pedido.
  const usuario = usuarios.find(u => {
    // Irá retornar o ID somente se for igual ao valor presente no userID.
    return (u.id === Number(usuarioID));
  });

  // Está retornando e enviando a lista de usuários para o navegador.
  return resposta.send(usuario);
});

// O post serve para obter/criar detalhes ou informações de um usuário. Usa o status 201.
app.post('/usuarios', (requisicao, resposta) => {
  // Está armazenando o body sendo um novo usuário na variável constante novoUsuario.
  const novoUsuario = requisicao.body;

  // Está pegando a lista e adicionando o novoUsuario no JSON users já existente.
  usuarios.push(novoUsuario);

  // Retorna e envia a resposta com um status 201(Create) e em seguida envia o novo usuário para o JSON.
  return resposta.status(StatusCodes.CREATED).send(novoUsuario);
});

// O put é utilizado para atualizar as informações de um usuário. Também usa o status 200.
app.put('/usuarios/:usuarioID', (requisicao, resposta) => {
  // O params é um objeto que contém propriedades mapeadas para os “parâmetros” da rota nomeada. Por exemplo, se você tiver a rota / aluno /: id, a propriedade “id” estará disponível como req.params.id.
  const usuarioID = requisicao.params.usuarioID;
  // Recebe as informações pelo body.
  const atualizacaoUsuario = requisicao.body;

  // O map é utilizado para criar uma nova lista de elementos.
  usuarios = usuarios.map(u => {
    // Se o usuarioID for exatamente igual ao id do usuario então ele.
    if(Number(usuarioID) === u.id) {
      // Vai atualizar o usuário.
      return atualizacaoUsuario;
    } else {
      // Se não ele vai continuar com o mesmo usuário.
      return u;
    }
  });

  // Irá retornar a resposta em seguida enviar a atualização do usuário.
  return resposta.send(atualizacaoUsuario);
})

// O delete é usado para remover um usuário ou alguma informação relacionada. O seu status é 204.
app.delete('/usuarios/:usuarioID', (requisicao, resposta) => {
  // O params é um objeto que contém propriedades mapeadas para os “parâmetros” da rota nomeada. Por exemplo, se você tiver a rota / aluno /: id, a propriedade “id” estará disponível como req.params.id.
  const usuarioID = requisicao.params.usuarioID;

  // O filter é usado para trabalhar com manipulação de arrays.
  // Todos os usuários que forem diferente do u.id irá retornar para a lista ou seja removendo um usuario especifico.
  usuarios = usuarios.filter((u => u.id !== Number(usuarioID)));

  // Está retornando a resposta com o status 204 e enviando para o usuário.
  return resposta.status(StatusCodes.NO_CONTENT).send();
});