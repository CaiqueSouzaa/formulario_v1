# formulario_v1

Este é o meu primeiro projeto, no qual busco desenvolver uma API para a criação de formulários.

# Objetivo
Desenvolvi esta API exclusivamente para fins de estudo. Planejo utilizar os conhecimentos adquiridos para criar novas APIs que solucionem os problemas identificados nesta versão inicial.

# Falha Identificada
O projeto apresenta uma falha significativa. Embora seja possível criar formulários, adicionar perguntas a eles e coletar respostas, há uma limitação no que diz respeito à filtragem dessas respostas.

# Limitação Atual
Ao responder às perguntas, não há uma maneira direta de filtrar as respostas com base nos formulários respondidos. Por exemplo, se Caique e Pedro responderam ao formulário "Solicitação de Compras" e ambas as respostas foram armazenadas, não é possível buscar apenas pelas respostas de Caique ou apenas pelas respostas de Pedro. No momento, só é possível recuperar todas as respostas do formulário "Solicitação de Compras".

# Rotas

* Formulários
    - Visualizar - GET - http://localhost:3000/formularios
    - Criar novo - POST - http://localhost:3000/formularios
        - body: {"nome": "Nome do formulário"}

* Tipos
    - Visualizar - GET - http://localhost:3000/tipos

* Questões
    - Visualizar - GET - http://localhost:3000/questoes/formulario_id. Exemplo: /questoes/1
    - Criar novo - POST - http://localhost:3000/questoes/formulario_id. Exemplo: /questoes/1
        - body: {"tipo_id": 2, "obrigatorio": true, "questao": "Qual o seu nome"}

* Respostas
    - Visualizar - GET - http://localhost:3000/respostas/formulario_id. Exemplo: /respostas/1
    - Criar novo - POST - http://localhost:3000/respostas/formulario_id. Exemplo: /respostas/1
        - body: {"respostas": [{"questao_id": 1, "resposta": "resposta da questão"}, {"questao_id": 4, "resposta": "resposta da questão"}]}


# Futuro do Projeto
Não planejo seguir atualizando esta API. Em vez disso, pretendo utilizar as experiências e aprendizados obtidos para criar novas APIs que abordem de maneira mais eficaz os desafios identificados aqui.

Sinta-se à vontade para utilizar este projeto como referência ou base para suas próprias iniciativas. Caso tenha interesse em colaborar ou fornecer sugestões, ficarei feliz em receber contribuições. Juntos, podemos impulsionar o desenvolvimento de soluções mais avançadas e eficientes.
