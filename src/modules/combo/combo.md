# Serviços

Devemos criar um novo módulo para tratar o CRUD de serviços que a pessoa pode admnistrar no sistema.

Deve ter alguns parâmetros mínimos:
- Nome
- Descrição
- Tempo de duração?
- Preço

# Combo

O combo é um conjunto de serviços que podem estar relacionados de alguma forma, através de um grupo que define um período útil para controle.

Temos duas etapas para esse novo módulo:

O primeiro consiste em fazer o CRUD de um novo combo.

Deve ter os seguintes parâmetros:
- Nome
- Descrição
- Preço
- Serviços/Número de atendimentos

O segundo passo consiste em fazer a associação de um combo com um cliente.

Deve ser possível relacionar um combo já existente à um cliente existente. Para que seja possível associar a agenda ao combo do cliente.

Essa associação deve ter os saeguintes parâmetros:
- idCombo
- idClient
- Preço
- Data de inicio
- Data de Fim

# Agendas

Precisamos alterar a agenda para ser possível selecionar serviços e também selecionar um pacote já existente.