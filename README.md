# Site PetGood

O **PetGood** é uma aplicação Full Stack desenvolvida para otimizar o processo de cadastro e acompanhamento de serviços em petshops. A plataforma permite o gerenciamento completo de tutores e seus respectivos pets, integrando informações específicas de cuidados de acordo com a raça animal.

## Diferencial Técnico

Diferente de um CRUD comum, o sistema implementa uma **lógica de seleção dinâmica**: ao escolher uma raça, a aplicação fornece automaticamente dados sobre o tipo de pelagem e cuidados específicos necessários. Isso demonstra o uso avançado de estados no Front-end e uma estrutura de dados bem planejada no Back-end.

## Funcionalidades Principais

- **Cadastro Dual:** Registro simultâneo de dados do Tutor (Nome, CPF, Telefone) e do Pet (Nome, Idade, Raça).
- **Informação Inteligente:** Exibição automática de características da raça e orientações de cuidados.
- **Observações Personalizadas:** Campo dedicado para detalhes específicos de cada animal, garantindo um atendimento único.
- **Painel de Listagem:** Visualização organizada de todos os registros (Tutores e Pets) com ações de edição e exclusão.

## Stack Tecnológica

- **Interface:** React.js com CSS personalizado (Neon Estético).
- **Comunicação:** Axios para consumo da API.
- **Servidor:** Node.js com Express.
- **Banco de Dados:** MySQL (Relacionamento entre Tutores e Pets).
