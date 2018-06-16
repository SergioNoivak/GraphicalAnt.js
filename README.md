# GraphicalAnt.js

Esta aplicação fornece uma interface web a fim de demonstrar o uso do Algoritmo de colonização de formigas Antsystem. Este algoritmo é usado para resolver o problema NP-difícil de se encontrar o menor ciclo hamiltoniano em um grafo completo. Se trata de uma heurística onde são formadas formigas artificiais que atráves de heurísticas evolutivas, como o elitismo, encontram a melhor rota no grafo. 

![software](https://github.com/SergioNoivak/GraphicalAnt.js/blob/master/img/foto1.PNG)

# instalação

Para a instalação é preciso um servidor disponível, podendo ser o servidor Apache local ou similares. Após isso basta clonar o repositório na pasta do servidor e executar o arquivo `index.html`. O arquivo `index.html`, diponível no diretório `src` é o arquivo inicial do software.

# manual

Inicialmente a tela de desenho estará vazia, para adicionar nos, a fim de construir o grafo completo basta clicar nas outras partes da tela de desenho:
![software](https://github.com/SergioNoivak/GraphicalAnt.js/blob/master/img/foto2.PNG)



demonstração da adicao de um no:
O nó é adicionado e marcado com um número inteiro, que é unico.
![software](https://github.com/SergioNoivak/GraphicalAnt.js/blob/master/img/foto3.PNG)
A partir da adição de mais nós também são criadas arestas que podem ser editadas na barra lateral de edição de arestas.

![software](https://github.com/SergioNoivak/GraphicalAnt.js/blob/master/img/foto4.PNG)

Se algum nó for adicionado por engano, basta apaga-lo na barra de deleção de um nó:

![software](https://github.com/SergioNoivak/GraphicalAnt.js/blob/master/img/foto5.PNG)

A edição dos pesos das arestas é feita na barra de edição das arestas, as arestas também são na tela de desenho, sensíveis ao toque e preenchem automaticamente esses campos, deixando livre ao usuário digitar manualmente ou selecionar uma aresta.
![software](https://github.com/SergioNoivak/GraphicalAnt.js/blob/master/img/foto6.PNG)
Para executar o algoritmo basta clicar no botão executar, da barra de tarefas:
![software](https://github.com/SergioNoivak/GraphicalAnt.js/blob/master/img/foto7.PNG)

