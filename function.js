window.onload = function(){
	var originalContent = document.getElementById('display').innerHTML;
	var signCounter;
	var signStack = new Array();
	var numberStack = new Array();

	numberAction('number0', 0);
	numberAction('number1', 1);
	numberAction('number2', 2);
	numberAction('number3', 3);
	numberAction('number4', 4);
	numberAction('number5', 5);
	numberAction('number6', 6);
	numberAction('number7', 7);
	numberAction('number8', 8);
	numberAction('number9', 9);
	clearAction();
	dotAction();
	calculate();

	function calculate(){
		signAction('plus', '+');
		signAction('minus', '-');
		signAction('multiply', '*');
		signAction('divide', '/');

		var equal = document.getElementById('equal');
		equal.addEventListener('click', function(){
			if(signCounter == 0){
				numberStack.push(originalContent);
				var signValue = signStack.pop();
				while(signValue != null){
					if(signValue == '+'){
						var num1 = numberStack.pop();
						var num2 = numberStack.pop();
						numberStack.push(Number(num2) + Number(num1));
					}
					else if(signValue == '-'){
						var num1 = numberStack.pop();
						var num2 = numberStack.pop();
						numberStack.push(Number(num2) - Number(num1));
					//	alert(num1);
					//	alert(num2);
					}
					else if(signValue == '*'){
						var num1 = numberStack.pop();
						var num2 = numberStack.pop();
						numberStack.push(Number(num2) * Number(num1));
					//	alert(num1);
					//	alert(num2);
					}
					else if(signValue == '/'){
						var num1 = numberStack.pop();
						var num2 = numberStack.pop();
						numberStack.push(Number(num2) / Number(num1));
					}
					signValue = signStack.pop();
				}
				document.getElementById('display').innerHTML = numberStack.pop();
				originalContent = document.getElementById('display').innerHTML;
			}
		});
	}


	function dotAction(){
		var dot = document.getElementById('dot');
		dot.addEventListener('click', function(){
			if(document.getElementById('display').innerHTML.indexOf('.') == -1){
				document.getElementById('display').innerHTML = '.' + originalContent;
				originalContent = originalContent + '.';
			}
		});
	}

	function clearAction(){
		var clear = document.getElementById('clear');
		clear.addEventListener('click', function(){
			document.getElementById('display').innerHTML = '0';
			originalContent = '0';
			while(signStack.pop()){}
			while(numberStack.pop()){}
			signCounter = 0;
		});
	}

	function numberAction(name, value){
		var button = document.getElementById(name);
		button.addEventListener('click', function(){
			if(originalContent == '0'){
				document.getElementById('display').innerHTML = value;
				originalContent = document.getElementById('display').innerHTML;
			}
			else{
				document.getElementById('display').innerHTML = originalContent + value;
				originalContent = document.getElementById('display').innerHTML;
			}
			signCounter = 0;
		});
	}

	function signAction(name, sign){
		var button = document.getElementById(name);
		button.addEventListener('click', function(){
			if(signCounter == 0){
				numberStack.push(originalContent);
				var priorSign = signStack.pop();
				if((priorSign != null) && (sign == '+' || sign == '-')){
					while(priorSign == '*' || priorSign == '/'){
						if(priorSign == '*'){
							var num1 = numberStack.pop();
							var num2 = numberStack.pop();
							numberStack.push(Number(num1) * Number(num2));
						}
						else if(priorSign == '/'){
							var num1 = numberStack.pop();
							var num2 = numberStack.pop();
							numberStack.push(Number(num2) / Number(num1));
						}
						priorSign = signStack.pop();
					}
				}
				if(priorSign != null){
					signStack.push(priorSign);
				}
				signStack.push(sign);
				document.getElementById('display').innerHTML = '0';
				originalContent = '0';
				signCounter++;
				//alert(numberStack.pop());
			}
		});
	}
}
