


fetch('cy-style.json', {mode: 'no-cors'})
  .then(function(res) {
    return res.json()
  })
  .then(function(style) {
        
    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),
      
      boxSelectionEnabled: false,
      autounselectify: true,
      
      layout: {
        name: 'grid',
        cols: 3

      },
      
      style: style,
      
      elements: [
      ]
    });
  
  
  var configuracoesDeCriacao = {
     point : {first: -1, second:-1},
     contador : 0,
     estaEmUmNo : false,
     passivelDeSerFeitoAresta:false,
     passivelDeEscolherOutroNo : false,
     estaEmUmaAresta: false
  };

  
  



    cy.on("tap",evt=>{
      if(!configuracoesDeCriacao.estaEmUmNo)
      desenharNo(evt,configuracoesDeCriacao);

      });

      let botaoRemoverNo = document.getElementById("botaoRemoverNo");
      let botaoAdicionarPeso = document.getElementById('botaoAdicionarPeso');
      let botaoExecutar =document.getElementById('botaoExecutar');
      let inputNoRemover = document.getElementById("noRemover");

      


      botaoExecutar.addEventListener("click",evt=>{

        cy.nodes().map(no=>{
          no.style({"background-color":"gray"});

        });

        cy.edges().map(no=>{
          no.style({"line-color":"gray"});

        });
            var valorNoInicial = 0;
            if(valorNoInicial===undefined)
              return;
            
            var noInicio = cy.nodes("[label="+valorNoInicial+"]");
          noInicio.style({"background-color":"red"})
       
          var GrafoTeorico =construirGrafoTeorico(cy,noInicio);  
          
        var solucaoFinal =  antSystem(GrafoTeorico,10);



        var noIt=undefined;
        var primeiraIt = true;
        solucaoFinal.ciclo.forEach(element => {



          cy.nodes("[label="+element+"]").map(node=>{
            node.style({"background-color":"red"});
            if(!primeiraIt){

            noIt.edgesTo(node).style({"line-color":"red"});
            node.edgesTo(noIt).style({"line-color":"red"});
            
          }
            noIt = node;
          })


          primeiraIt=false;
          
      });   



      })
      botaoRemoverNo.addEventListener("click",evt=>{

        var inteiroNoRemover =  inputNoRemover.value;
        var collection = cy.elements("node[label="+inteiroNoRemover+"]");
        cy.remove( collection )
      })


      var geradorDeAresta = {contadorParidade:0, idNoInicio:'',idNoFim:''};


      botaoAdicionarPeso.addEventListener("click",evt=>{
        var valor_noInicio = document.getElementById("noInicio").value;  
        var valor_noFim = document.getElementById("noFim").value;  
        var valor_peso = document.getElementById("peso").value;  
        
        let NoInicio= cy.collection("node[label="+valor_noInicio+"]")[0];
        let NoFim = cy.collection("node[label="+valor_noFim+"]")[0];
        
        var arestaNova =  NoInicio.edgesTo(NoFim)[0];
        NoInicio.edgesTo(NoFim).map(ele=>{
            ele.data("label",valor_peso);
        })
        NoFim.edgesTo(NoInicio).map(ele=>{
          ele.data("label",valor_peso);
      })
 
    });
  });

