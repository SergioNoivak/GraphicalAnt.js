


function adicionarArestas(cy,noAdicionado,configuracoesDeCriacao){
        
    cy.nodes().forEach(element => {
      if(element.id()!=noAdicionado.id()){
       var arestaAdicionada1 =  cy.add({ data: {label:'1', source:element.id() , target: noAdicionado.id(), directed :true}})
       var arestaAdicionada2 =  cy.add({ data: {label:'1', source:noAdicionado.id() , target: element.id(), directed :true}})
       
    arestaAdicionada1.on("tapdrag", evt=>{
        configuracoesDeCriacao.estaEmUmaAresta = true;
        configuracoesDeCriacao.estaEmUmNo=true;
        
    })

    arestaAdicionada1.on("mouseover", evt=>{
    
        configuracoesDeCriacao.estaEmUmNo=true;
    
    })


    arestaAdicionada1.on("mousedown", evt=>{
        
    document.getElementById("noInicio").value =cy.getElementById(arestaAdicionada1.data("source")).data("label");
    document.getElementById("noFim").value =cy.getElementById(arestaAdicionada1.data("target")).data("label");
    var inputPeso = document.getElementById("peso");
    inputPeso.value = parseFloat(arestaAdicionada1.data("label"));

    });

    arestaAdicionada2.on("mouseover", evt=>{
        configuracoesDeCriacao.estaEmUmNo=true;
    
    })

    arestaAdicionada2.on("mousedown", evt=>{
  
    document.getElementById("noInicio").value =cy.getElementById(arestaAdicionada1.data("source")).data("label");
    document.getElementById("noFim").value =cy.getElementById(arestaAdicionada1.data("target")).data("label");
    var inputPeso = document.getElementById("peso");
    inputPeso.value = parseFloat(arestaAdicionada1.data("label"));

    });
    

    arestaAdicionada1.on("mouseout", evt=>{
        
        configuracoesDeCriacao.estaEmUmaAresta = false;
        configuracoesDeCriacao.estaEmUmNo=false;
      configuracoesDeCriacao.passivelDeEscolherOutroNo = true;
    })

  
    arestaAdicionada2.on("mouseout", evt=>{
        
        configuracoesDeCriacao.estaEmUmaAresta = false;
        configuracoesDeCriacao.estaEmUmNo=false;
      configuracoesDeCriacao.passivelDeEscolherOutroNo = true;
    })

  


    }     
    });
}
function adicionarListenersNos(noAdicionado,evt,configuracoesDeCriacao){
    noAdicionado.on("tapdrag", evt=>{
        configuracoesDeCriacao.estaEmUmNo=true;
    })


    noAdicionado.on("click", evt=>{
       let valorDoLabel =parseInt( noAdicionado.data("label"));
        document.getElementById("noRemover").value = valorDoLabel;
        document.getElementById("AntSystemNoInicio").value = valorDoLabel;
    })

    noAdicionado.on("mouseout", evt=>{
        configuracoesDeCriacao.estaEmUmNo=false;
      configuracoesDeCriacao.valuepassivelDeEscolherOutroNo = true;
    

    })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
function desenharNo(evt,configuracoesDeCriacao){
      
    if(configuracoesDeCriacao.point.first!=-1 && configuracoesDeCriacao.point.second!=-1 && configuracoesDeCriacao.point.first==evt.position.x &&configuracoesDeCriacao.point.second==evt.position.y)
    return; 
    var noAdicionado =  cy.add(
      {
        id: configuracoesDeCriacao.contador,
        group: "nodes",
        data: { weight: 10, label: configuracoesDeCriacao.contador },
        position: { x: evt.position.x, y:evt.position.y  },
        
      });
      noAdicionado.style({
        'background-color': getRandomColor()
      }) ;
      configuracoesDeCriacao.contador++;
      
      adicionarArestas(cy,noAdicionado,configuracoesDeCriacao);
      adicionarListenersNos(noAdicionado,evt,configuracoesDeCriacao);
      configuracoesDeCriacao.point.first==evt.position.x ;
      configuracoesDeCriacao.point.second=evt.position.y ; 
    }





