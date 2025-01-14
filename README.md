## SISTEMA DE AGENDAMENTO DE SERVIÇOS

## Descrição Geral
O sistema foi desenvolvido para gerenciar agendamentos de serviços em salões de beleza, oferecendo uma experiência otimizada tanto para clientes quanto para administradores. Ele permite a seleção de serviços, preenchimento de dados do cliente, escolha do salão e finalização do agendamento de maneira intuitiva. No backend, utiliza Node.js com o framework, Express e Prisma como ORM (Object-Relational Mapping). O frontend utiliza tecnologias modernas, como HTML, CSS e JavaScript, organizadas em uma estrutura modular que prioriza a escalabilidade, a responsividade e a experiência do usuário.
- Desenvolvido por: Davi Lucas, Doglas Henrique e José Eduardo

## Funcionalidades Principais
- Agendamento de Serviços: Ferramenta para que os clientes possam selecionar um serviço, escolher uma data e horário e finalizar o agendamento.
- Seleção de Serviços: Permite ao cliente selecionar o serviço de  sua preferência.
- Seleção de Salões: Permite ao cliente selecionar o salão de preferência para realizar o serviço escolhido.

## Benefícios
- Eficiência Operacional: Simplifica e organiza a gestão de agendamentos, reduzindo erros e otimizando processos administrativos.
- Melhoria na Experiência do Cliente: Oferece um fluxo intuitivo para escolha de serviços e agendamentos, aumentando a satisfação e fidelização dos clientes.
- Controle Centralizado: Consolida informações importantes, como agendamentos e disponibilidade, em um único sistema fácil de acessar.

## Público-Alvo e necessidades
- O público-alvo são clientes de salões de beleza que buscam uma solução eficiente, prática e conveniente para o agendamento de seus serviços. Este sistema foi desenvolvido para atender às necessidades de consumidores que valorizam agilidade e facilidade no processo de marcação, permitindo que escolham o serviço desejado, preencham suas informações e agendem um horário de forma rápida e sem complicações. Com foco na experiência do usuário, o sistema proporciona comodidade, simplificando o processo e garantindo que os clientes possam gerenciar seus compromissos com eficiência e conforto.

## Explicação das Pastas e Arquivos:

- Backend (back-end/):
- node_modules/: Onde ficam as dependências do projeto (como express, prisma, etc).
- prisma/: Diretório relacionado ao ORM Prisma para manipulação de banco de dados Configurações do banco e o esquema de banco de dados.
- controllers/: Arquivos responsáveis pela lógica de controle das requisições.
- models/: módulos de acesso ao banco de dados.
- routes/: Arquivos que definem as rotas de cada recurso.
- server.js: Arquivo principal do backend, que configura o servidor express e inicia o projeto.
- Demais Arquivos: O yarn.lock e package-lock.json garantem versões consistentes de dependências no projeto. O package.json define as dependências e scripts do projeto. O .env armazena variáveis de ambiente sensíveis, como credenciais e configurações, fora do código-fonte.

- Frontend (front-end):
- Páginas administrativas, onde o cliente pode interagir com o sistema.
- Arquivos de estilo do projeto.

-Integração (JS):
- Arquivos JavaScript que integram o frontend com o backend.

## Bibliotecas, dependências e aplicações instaladas para o uso do sistema
- Prisma Studio
- Express
- Node.js e suas dependencias (Nodemon)
- Postgres
- Boostrap
