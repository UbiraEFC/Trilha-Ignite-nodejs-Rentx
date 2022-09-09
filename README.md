# Cadastro de carro
**RF** (Requisito funcional)
Deve ser possível cadastrar um novo carro.

**RNF** (Requisito não funcional)

**RN** (Regra de negócio)
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, como disponível.
*O usuário reponsável pelo cadastro deve ser um usuário admistrador.

# Listagem de carros
**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RNF**

**RN** 
O usuário não precisa estar logado no sistema.

# Cadastro de especificações no carro
**RF**
Deve ser possível cadastrar uma especificação para um carro.

**RNF**

**RN** 
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagem do carro
**RF**
Deve ser possível cadasrtrar a imagem do carro.

**RNF**
Utilizar multer para upload dos arquivos.

**RN** 
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro
**RF**
Deve ser possível cadastrar um aluguel.

**RNF**

**RN** 
O aluguel deve ter duração minima de uma hora.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deve estar logado na aplicação