



function Roleta(vetorDeProbabilidades, somaAptidoes){
   
        var TotalParcial = 0;
        var p = 0.0;
        p = (Math.random() * somaAptidoes*100000) + 0;
        p/=100000;
        var i = -1;

        while(i < vetorDeProbabilidades.length && TotalParcial < p) {
            i = i+1;
            TotalParcial = TotalParcial + vetorDeProbabilidades[i];
        }
        return i;
    }




    
    function exibirListaAdjacencia(GrafoTeorico){
        
        $.each(GrafoTeorico.vetor, function(index, value) {
            console.log(index+" {");
            $.each(value.Adj, function(indice, valor){
                console.log("( "+indice+" , "+valor.peso+" , " + valor.feromonio+")");
            });
            console.log("}");
        }); 

    }



    function construirGrafoTeorico(cy,noInicio){

        var GrafoTeorico = {
            vetor : {},
            noInicio:{}
        }

        GrafoTeorico.noInicio = parseInt(noInicio.data('label'));

        cy.nodes().map(noDaTela=>{

            var noTeorico = {
                Adj:{},
                nome:""
            }

            var nomeNo = noDaTela.data('label');
            noTeorico.nome = parseInt(nomeNo);
            GrafoTeorico.vetor[parseInt(nomeNo)] = noTeorico;  
        });


        cy.edges().map(arestaDaTela=>{
            var arestaTeorica = {
                noFim:-1,
                peso:-1,
                feromonio:1
            }
            var valorSourceDaTela =parseInt( arestaDaTela.source().data('label'));
            var valorTargetDaTela =parseInt( arestaDaTela.target().data('label'));
            var valorPeso =parseFloat( arestaDaTela.data('label'));
            
            arestaTeorica.noFim = valorTargetDaTela;
            arestaTeorica.peso = valorPeso;

            GrafoTeorico.vetor[valorSourceDaTela].Adj[valorTargetDaTela] = arestaTeorica;
        })


        return GrafoTeorico;

    }



    function construirObjetoProbabilidades(GrafoTeorico,cidade,marcados){

        var ObjetoProbabilidades = {

            vetorDeProbabilidades:[],
            vetorDeNos:[],
            somaAptidoes:0.0
            
        };
        $.each(GrafoTeorico.vetor[cidade].Adj, (noFim,dados)=>{
            if(!marcados[noFim]){
            var aptidao = dados.feromonio*1/dados.peso;
            ObjetoProbabilidades.vetorDeProbabilidades.push(aptidao);
            ObjetoProbabilidades.vetorDeNos.push(parseInt(noFim));
            ObjetoProbabilidades.somaAptidoes+=aptidao;
        }
    })

        ObjetoProbabilidades.vetorDeProbabilidades= ObjetoProbabilidades.vetorDeProbabilidades.map(aptidao=>{
            return aptidao/ObjetoProbabilidades.somaAptidoes;
        });
        
        return ObjetoProbabilidades;
    }

    function depositarFeromonioNaAresta(cidadeAtual,cidadeAVisitar,GrafoTeorico,taxaDeEvaporacao){

            GrafoTeorico.vetor[cidadeAtual].Adj[cidadeAVisitar].feromonio+=taxaDeEvaporacao;
            GrafoTeorico.vetor[cidadeAVisitar].Adj[cidadeAtual].feromonio+=taxaDeEvaporacao;
            
    }


    function construirSolucao(GrafoTeorico,cidadeInicio){
        
        var noInicio = parseInt(cidadeInicio);
        var vetorCidades = [];
        var rotaFormiga = [];
        var marcados ={};
        var larguraCaminho = 0.0;
        
        rotaFormiga.push(noInicio);


        $.each(GrafoTeorico.vetor, index=>{
            if(parseInt(index)!=noInicio)
                vetorCidades.push(parseInt(index));
                marcados[index] = false;
        } );
        

        
        var cidadeAtual  = rotaFormiga[rotaFormiga.length-1];
        marcados[cidadeAtual]=true;
        
        var indiceEscolhido =-1;
        var cidadeAVisitar = -1;
        var ObjetoProbabilidades = undefined;
        while(vetorCidades.length>0){
        
        ObjetoProbabilidades= construirObjetoProbabilidades(GrafoTeorico,cidadeAtual,marcados);

        indiceEscolhido =  Roleta(ObjetoProbabilidades.vetorDeProbabilidades,1);

        cidadeAVisitar =  ObjetoProbabilidades.vetorDeNos[indiceEscolhido];
        larguraCaminho+= GrafoTeorico.vetor[cidadeAtual].Adj[cidadeAVisitar].peso;
        depositarFeromonioNaAresta(cidadeAtual,cidadeAVisitar,GrafoTeorico,1);
        rotaFormiga.push(cidadeAVisitar);
        marcados[cidadeAVisitar]=true;
        vetorCidades.splice(vetorCidades.indexOf(cidadeAVisitar),1);
        
        
        cidadeAtual =cidadeAVisitar;
  
        }

        rotaFormiga.push(noInicio);
        larguraCaminho+= GrafoTeorico.vetor[cidadeAtual].Adj[noInicio].peso;
        
   
        var solucao = {
            ciclo: rotaFormiga,
            aptidao: larguraCaminho
        }
        return solucao;
    }





    function getNoAleatorio(GrafoTeorico){

        var vetorNos =[];
        $.each(GrafoTeorico.vetor, index=>{

            vetorNos.push(parseInt(index));
    })

    var indiceSorteado = Math.ceil((Math.random() * vetorNos.length-1) + 0);
    if(indiceSorteado<0)
        indiceSorteado=0;
    return vetorNos[indiceSorteado];

    }


    function construirSolucaoParcial(GrafoTeorico,numeroDeFormigas){

        var solucaoElitista = {
            ciclo: [],
            aptidao: Number.MAX_VALUE
        
        }

        for(var i=0;i<numeroDeFormigas;i++){

            var solucaoCorrente = construirSolucao(GrafoTeorico,getNoAleatorio(GrafoTeorico));
            if(solucaoCorrente.aptidao<solucaoElitista.aptidao)
                solucaoElitista = solucaoCorrente;
            }

    
        return solucaoElitista;
    }



    function antSystem(GrafoTeorico,iteracoes){
        
        
        var solucaoElitista = {
            ciclo: [],
            aptidao: Number.MAX_VALUE
        
        }

        for(var i=0;i<iteracoes;i++){

            var solucaoCorrente = construirSolucaoParcial(GrafoTeorico,10);
            if(solucaoCorrente.aptidao<solucaoElitista.aptidao)
                solucaoElitista =solucaoCorrente;
        }

        return solucaoElitista;
    }