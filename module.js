Module = {};
    var baseDrink = [
        {name:"coffe", cost:"15"},
        {name:"tea", cost:"10"}
    ];
    var baseAddition = [
        {name:"milk", cost:"2"},
        {name:"sugar", cost:"1"},
        {name:"cinnamon", cost:"3"},
        {name:"lemon", cost:"1"}
    ];

    Module.drinks = [],
    Module.additions = [];

    //onload function to check drink and addition
    Module.check = function () {
        if(!window.localStorage["drink"]){
            for(var i=0,count=baseDrink.length; i<count; i++){
                drink_saver_reader.add(baseDrink[i].name,baseDrink[i].cost);
                drink_saver_reader.save();
            }
            Module.drinks = drink_saver_reader.read();
        }else{
            Module.drinks = drink_saver_reader.read();
        };
        if(!window.localStorage["addition"]){
            for(var i=0,count=baseAddition.length; i<count; i++){
                addition_saver_reader.add(baseAddition[i].name,baseAddition[i].cost);
                addition_saver_reader.save();
            }
            Module.additions = addition_saver_reader.read();
        }else{
            Module.additions = addition_saver_reader.read();
        };
    };


    //add new drink
    Module.addNewDrink = function (name,cost) {
        drink_saver_reader.add(name,cost);
        drink_saver_reader.save();
        drink_saver_reader.read();
    };
    //add new addition
    Module.addNewAddition = function (name,cost) {
        addition_saver_reader.add(name,cost);
        addition_saver_reader.save();
        addition_saver_reader.read();
    };

    //check the drinks
    Module.checkCorrectChoiseDrink = function (valueToCheckDrink) {
            for (t=0,compVal = Module.drinks.length; t<compVal;t++){
                if(valueToCheckDrink==Module.drinks[t].id){
                    return true;
                }
        }
        return false;
    };

    //check the addition
    Module.checkCorrectChoiseAddition = function (valueToCheck) {
        var temp = 0;
    for(var i=0,valToCheck = valueToCheck.length; i<valToCheck;i++){
        for (t=0,compVal = Module.additions.length; t<compVal;t++){
            if((valueToCheck[i]-1)==Module.additions[t].id){
                temp++;
            }
        }
    }
        if(temp==valueToCheck.length){
        return true;
        }else{
            return false;
        };
    };

    Module.paymentCount = function (numberofDrink,arrayOfAddition) {
        var tempResult = 0;
            if(numberofDrink){
                tempResult+=parseInt(Module.drinks[numberofDrink-1].cost);
            };
            if(arrayOfAddition&&(arrayOfAddition.length!=0)){
                for(var i=0,countAdd = arrayOfAddition.length;i<countAdd;i++){
                    if(arrayOfAddition[i]==""){return tempResult};
                    tempResult+=parseInt(Module.additions[arrayOfAddition[i]-1].cost);
                };
            }
            return tempResult;
    };

