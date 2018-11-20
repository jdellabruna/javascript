var calculadora = (function () {
  const MAXLONG = 8
  var digitos = 1
  var puntos = 0
  var operando1 = operando2 = ''
  var operador  = ''
  var puntoOp1  =  false
  var esElOp2 = blanquear =  false
  var signo = false
  var primerDigito = true

  procesaClicks = function() {

      function evaluar_signo( signo ) {
        if (!signo) {
          var temp = '-' + document.getElementById("display").innerHTML
          document.getElementById("display").innerHTML = temp
          signo = true;
        } else {
             var temp = document.getElementById("display").innerHTML
             document.getElementById("display").innerHTML = temp.substring(1);
             signo = false;
          }
        return signo
      }

      var attribute = this.getAttribute("id");

      switch(attribute) {
      case 'raiz':
          alert('Función no implementada')
          break;
      case 'on':
          document.getElementById("display").innerHTML = '0'
          primerDigito = true
          puntos = 0
          puntoOp1 = false
          esElOp2 = false
          operando1 = operando2 = 0
          signo = false
          blanquear = false
          digitos = 1
          break;
      case 'punto':
          if ((!puntoOp1 || esElOp2) && (puntos < 2)) {
            document.getElementById("display").innerHTML += '.'
            if (!esElOp2) { puntoOp1 = true }
            puntos++
          }
          break;
      case 'sign':
          var tmp = document.getElementById("display").innerHTML
          if (tmp != '0') {
            signo = evaluar_signo(signo) /* Llamada a funcion local */
          }
          break;
      case 'dividido':
          if ((!primerDigito) && (!esElOp2)) {
            esElOp2 = true
            blanquear = true
            digitos = 1
            operando1 = document.getElementById("display").innerHTML
            operador = '/'
          }
          break;
      case 'mas':
          if ((!primerDigito) && (!esElOp2)) {
            esElOp2 = true
            blanquear = true
            digitos = 1
            operando1 = document.getElementById("display").innerHTML
            operador = '+'
          }
          break;
      case 'menos':
          if ((!primerDigito) && (!esElOp2)) {
            esElOp2 = true
            blanquear = true
            digitos = 1
            operando1 = document.getElementById("display").innerHTML
            operador = '-'
          }
          break;
      case 'por':
          if ((!primerDigito) && (!esElOp2)) {
            esElOp2 = true
            blanquear = true
            digitos = 1
            operando1 = document.getElementById("display").innerHTML
            operador = '*'
          }
          break;
      case 'igual':
              operando2 = document.getElementById("display").innerHTML
              // No definida la división por cero
              if ((operando2 == 0) && (operador == '/')) {
                alert("Error: No es posible dividir por cero!")
              } else {
                  var str = eval(operando1 + operador + operando2).toString();
                  var resultado = str.substring(0, MAXLONG+1);
                  document.getElementById("display").innerHTML =  resultado
                }
              esElOp2= false
          break;

      default:
          if (digitos <= MAXLONG) {
             //si viene de clickearse una operación, blanquea para comenzar a guardar el segundo operando
             if (blanquear) {
               document.getElementById("display").innerHTML=''
               blanquear = false;
             }
             //si es el primer digito borra el cero
             if (primerDigito){
                if (attribute != '0') {
                  document.getElementById("display").innerHTML = attribute
                  primerDigito = false
                }
             } //si no, concateno el digito a lo que ya tenía
             else {
               document.getElementById("display").innerHTML += attribute
             }
             digitos++
          }
          break;
      }
  };
  /* ----------------------------------------------------------------- */
  return {
    iniciar: function(){
      var teclas = document.getElementsByClassName("tecla");
      for(i = 0; i < teclas.length; i++){
         teclas[i].addEventListener('click', procesaClicks, false);
      }
    }
  };
  /* ----------------------------------------------------------------- */
})();

calculadora.iniciar();
