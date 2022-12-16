let runningTotal = 0;
let buffer = "0"; //capturamos lo q pasa en la pantalla//es string porque lo q siempre va a haber en la pantalla va a ser un string
let previousOperator = null;//cuando hacemos 20+2=22, tengo q guardar ese + en algún lado. De ahi esta variable
const screen = document.querySelector(".screen");//lo q vemos por la pantalla de la calcu

function buttonClick(value) { //algún valor (un n°, un signo) de los que están en los "calc-button"
    if(isNaN(value)){ //Antes estaba así: if(typeof parseInt(value)=== "number") parseInt va a forzar a transformar todo en numero y con typeof se pregunta qué tipo de dato es el que ingresa como valor
        //this is not a number
        handleSymbol(value);
     }else{
         //this is a number
         handleNumber(value);
     }
     screen.innerText = buffer;//renderiza lo q está en el buffer
}

function handleSymbol(symbol) { 

    console.log("simboloooo",symbol);
   /*
    if(symbol === "C"){
        buffer = "0";
        runningTotal =0;
    }
    */
   switch (symbol) {
        case "C":
          buffer = "0";
          runningTotal = 0;
          break;

        case "=":
          if (previousOperator === null) { //el usuario no ha elegido un operador todavía
            return;
          }
          flushOperation(parseInt(buffer)) //necesitamos hacer la operacion cuando se presione =, parseamos lo del buffer a numeros para ello
          previousOperator = null;
          buffer = runningTotal; //para mostrarle el resultado por pantalla al usuario
          runningTotal = 0; 
          break;

        case "+":
          handleMath(symbol)
          break;
    
        case "-":
            handleMath(symbol)
            break;

        case "←":   //que vuelva a lo anterior
            if (buffer.length === 1) {
                buffer = "0";
            }else{
                buffer = buffer.substring(0, buffer.length-2)                //"substring" toma un string largo y lo achica
            }                             //que empiece desde el principio y que se detenenga 1 antes de llegar hasta el final
            break;

        case "÷":
            handleMath(symbol)
            break;

        
        case "×":
            handleMath(symbol)
            break;    
   }
}

function handleMath(symbol) {
    if(buffer === "0"){
        //do nothing
        return;
    }
  const intBuffer = parseInt(buffer);//lo q aparezca en el buffer lo pasamos a numero y lo guardamos en intBuffer

    if(runningTotal === 0){
    runningTotal = intBuffer;
    } else {
    flushOperation(intBuffer);
   }
   previousOperator = symbol;
   buffer = "0";
}

function flushOperation(intBuffer){
    if(previousOperator === "+"){

        runningTotal += intBuffer; //runningTotal = runningTotal + intBuffer;

    } else if (previousOperator === "-"){

        runningTotal -= intBuffer;

    } else if (previousOperator === "×"){

        runningTotal *= intBuffer;
    }

    else{

        runningTotal /= intBuffer;
    }
    //console.log("running total", runningTotal);   
}

function handleNumber(numberString) {  //es un numero, pero lo toma como string -- para q nos acordemos! 
if (buffer === "0"){
    buffer = numberString; //se le reasigna a 0 el nuevo valor
}else{
    buffer = buffer + numberString; // o se puede poner buffer += numberString
}

}

function init(params) {   //funcion q con llamarla una vez me setea la calcu 
    document.querySelector(".calc-buttons")//tomamos todos los botones
    .addEventListener("click",function(event){ //"cuando haya un evento click, corré la función que le sigue" -- captura el evento q sucede en el browser: cuando haya un click, lo captura
        buttonClick(event.target.innerText)
        
    })
}

init();