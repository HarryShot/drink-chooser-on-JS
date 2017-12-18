window.addEventListener("load",init,false);

    function init() {
        var table_with_drinks = document.getElementById("table1");
        var table_with_addition = document.getElementById("table2");
        var calculate_button = document.getElementById("calculate");
        var result_show = document.getElementById("sum");
        var text_field_to_enter_drink_id = document.getElementById("drinkId");
        var text_fiel_to_enter_addition_id = document.getElementById("AdditionId");


        Module.check();
        addItemToTable(table_with_drinks,Module.drinks);
        addItemToTable(table_with_addition,Module.additions);

        calculate_button.addEventListener("click",function () {
            var drinkVal = document.getElementById("drinkId");
            var additionVal = document.getElementById("AdditionId");
            var arrayOfAddition = additionVal.value.split(",");


            if((drinkVal.value.length==0)||(!isFinite(drinkVal.value))||!Module.checkCorrectChoiseDrink(drinkVal.value-1)){
                drinkVal.value = "";
                alert("An error in the choice of drink");
            }else{
                if(!Module.checkCorrectChoiseAddition(arrayOfAddition)&&!(additionVal.value=="")){
                    additionVal.value = "";
                    alert("An error in the choice of addition");
                }else{
                    var res_answer = Module.paymentCount(parseInt(drinkVal.value),arrayOfAddition);
                    result_show.innerHTML = res_answer+"$";
                }
            }
        },false);

        text_field_to_enter_drink_id.addEventListener("focus",clearSum,false);
        text_fiel_to_enter_addition_id.addEventListener("focus",clearSum,false);

        function clearSum() {
            result_show.innerHTML = "";
        };


        function addItemToTable(elem,massive,number) {
            var temp = 0;
            if(number){temp=number}else{temp=0};
            for(var i=0, length = massive.length;i<length;i++){
                elem.innerHTML += "<tr><td>"+(i+1+temp)+"</td><td>"+massive[i].name+"</td><td>"+massive[i].cost+"$</td></tr>";
            }
        }


        function showModal(modal) {
            modal.style.display = "block";
        }
        function closeModal(modal) {
            modal.style.display = "none";
        }

        var drinkModal = document.getElementById("add_drink");
        var additionModal = document.getElementById("add_addition");
        var add_new_drink_button = document.getElementById("addNewDrink");
        var add_new_addition_button = document.getElementById("addNewAdd");
        var closeButt = document.getElementsByClassName("close_modal");
        var closeSpan = document.getElementsByClassName("close");

        add_new_drink_button.addEventListener("click",function(){showModal(drinkModal)},false);

        closeButt[0].addEventListener("click",function(){closeModal(drinkModal)},false);
        closeSpan[0].addEventListener("click",function(){closeModal(drinkModal)},false);

        add_new_addition_button.addEventListener("click",function(){showModal(additionModal)},false);

        closeButt[1].addEventListener("click",function(){closeModal(additionModal)},false);
        closeSpan[1].addEventListener("click",function(){closeModal(additionModal)},false);


        var addButtons = document.getElementsByClassName("add_new_item");
        addButtons[0].addEventListener("click",function () {
            var newDrinkName = document.getElementById("new_drink_name");
            var newDrinkCost = document.getElementById("new_drink_cost");
            if (newDrinkName.value==""){
                newDrinkName.value="";
                alert("Error in name of new drink");
            }else{
                if(newDrinkCost.value==""||!isFinite(newDrinkCost.value)){
                    newDrinkCost.value = "";
                    alert("Error in cost of new drink");
                }else{
                    Module.addNewDrink(newDrinkName.value,newDrinkCost.value);
                    var temp = [{name:newDrinkName.value, cost:newDrinkCost.value}];
                    addItemToTable(table_with_drinks,temp,Module.drinks.length-1);
                    closeModal(drinkModal);
                }
            }
        },false);

        addButtons[1].addEventListener("click",function () {
            var newAdditionName = document.getElementById("new_addition_name");
            var newAdditionCost = document.getElementById("new_addition_cost");
            if (newAdditionName.value==""){
                newAdditionName.value="";
                alert("Error in name of new addition");
            }else{
                if(newAdditionCost.value==""||!isFinite(newAdditionCost.value)){
                    newAdditionCost.value = "";
                    alert("Error in cost of new addition");
                }else{
                    Module.addNewAddition(newAdditionName.value,newAdditionCost.value);
                    var temp = [{name:newAdditionName.value, cost:newAdditionCost.value}];
                    addItemToTable(table_with_addition,temp,Module.additions.length-1);
                    closeModal(additionModal);
                }
            }
        },false);
    }