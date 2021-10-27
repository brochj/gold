# Diet App (Codinome)

## Conteúdo
- primeiro define a qntd de calorias no dia, parametros necessários, idade, peso, altura e nivel de atividade fisica
- e de uma lista de alimentos sugeridos para o cafe da manha, a pessoa clica e arrasta o alimento desejado, para o cafe da manha, almoco
- e ao mesmo tempo, vai mostrando qntas calorias ela tem disponivel para comer naquela refeicao/ dia
- Qndo a pesoa finalizar, fazer uma verificacao, se tem pouca fibra, muito carbo, pouca proteina, etc..e mostrar uma mensagem pra pessoa trocar alguns alimentos...
- No final gera o pdf
- Ou faz com banco de dados
- Gerar Lista de ingredientes para comprar no supermecado
- Colocar badge de alimento verificado para aqueles que eu revisei e confirmei os valores da tabela nutricional
- Criar tag para pesquisar refeicoes entre um range de calorias, tipo 100-200kcal

## Monetização
- Venda de planos de dietas prontos
- Liberar alguns planos de dietas com Ad reward
- Banner no footer de telas q não são muito acessadas, para nao estragar a experiencia do usuário
- Criar a possibilidade de conta  para nutricionistas
  - os nutris pagarão uma taxa mensal(100R$), com isso eles poderãom criar diversos modelos de dietas. Obs:  sistemas de pagamento deve ser feito no site, pois apple que 30% pra tudo q é produto digital for vendindo dentro do aplicativo (verificar isso)
  - Diversos tipos de combinacao de refeicao
  - sempre com fácil acesso a troca de gramas(g) para que ele possa personalizar a dieta pro cliente
  - Importante também é a criação de um pdf legalzinho com todo o plano de dieta, para passar pro seu cliente no seu consultório
  - e recomendariam o uso do aplicativo para seus clientes
  - e então o nutri teria todo o historio de refeicao do cliente em tempo real
  - Dar a possibilidade do nutricionista criar um copy/pagina personalizada dele dentro app. além do perfil dele
  - Dar a possibilidade do nutri criar planos de dieta (mais baratos pois não teria acompanhamento), eu tmbm ganharia uma porcentagem nessa venda

- Area para contratar os nutricionistas -- para ter uma dieta mais personalizada, o pagameto é feito no cartao, e eu recebo uma % dessa venda
- Nessa área aparecerá uma listas dos nutris, terá os avatar do nutris com umas informações básicas, tipo, número de clientes já atendidos, clientes ativos, cidade, especialidade (perca de peso, nutricao esportiva...). Depois, obviamente, terá que ter um perfil.
- a ideia é NÃO colocar avaliçao de 5 estrelas
- Fazer uma tela, onde será feita venda de produtos exclusivos(adicionais), como ebooks sobre dietas e receitas, q na verdade serão links de afiliados meus que levarao para a hotmart
- conta pra profissonais de educ. fisica
  -para rastrear progressao de peso, medidas, bodyFat BF, todas as outras coisas, praticamente uma platarfoma integrada

## Configurações

- Ter temas de cores mais femininos
- Dar a possibilidade de aumentar a fonte
- Aplicativo Modular: dar a possibilidade de desativar algumas funções como, tracking de agua, alguma recomendação na pagina principal


## Telas 

- **Dados pessoais**
  - inputs do usuário - Sexo, altura, idade, peso

- **Nível de atividade física**
  - Usuário indica seu nível atual de física diária
- **Gasto calórico**
  - Com os dados fornecidos, calcula-se a a qntd de calorias estimada que o usuário gasta por dia
- **Objetivo**
  - O usuário escolhe seu objetivo com a dieta, que é emgrecer, manter o peso ou ganhar massa
- **Dificuldade**
  - O usuário escolhe se deseja entrar em uma dieta mais difícil ou mais fácil
  - no sentido de perder -0,5kg na semana (fácil) ou perder -2,0kg (difícil)
- **Distribuicão das kcal**
  - Com as escolhas acima, é possível saber quantas calorias o usuário deve ingerir por dia para atingir o objetivo escolhido
  - Nessa tela, será feita a distribuição da calorias para cada refeição
  - Ex: de 2500 kcal diárias, 
  - 10% ou 250 kcal vai para café da manhã
  - 22% ou 550 kcal vai para o almoço
  - e assim por diante, até completar as 2500 kcal diárias
- **Area de criar receitas**
  - Colocar a opcao de visualizaçao, só mandar as props para a tela - ShowRecipe
