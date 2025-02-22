// Função para formatar valores monetários no padrão brasileiro
// Essa função recebe um valor numérico (value) e retorna uma string formatada como moeda brasileira
// Exemplo: Se value = 1000, a função retorna "R$ 1.000,00".
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

//O que significa os : após o valur por exemplo:
  // Nesse caso, value é o parametro da função formatCurrency e o : number indica que o parametro value é um numero.
  // Ou seja, no TypeScript os ":" servem para definir o tipo do dado. 
  // Isso significa que, se você tentar passar um valor que não seja um número (por exemplo, uma string ou um booleano), o TypeScript emitirá um erro
  // Ja os ': string' indica que o valor de retorno esperado é uma string