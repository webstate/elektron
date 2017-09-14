var dataService = angular.module('dataService', []);

dataService.service('dataService', function(){
    var data = [];
    return{
        getData: getData,
        setData: setData,
        deleteFromList: deleteFromList
    }
    function setData(list){
        if(list.length === 0){
            data = [];
        }else if(checkIfInList(data, list.name)===true){
            data.push(list);
        }else{
            data.push(list);
        }

        console.log(data);
    }
    function getData(){
        console.log(data);
        return data;
    }
    function deleteFromList(name){
        for(i = 0; i < data.length;i++){
            if(data[i].name === name){
                data.splice(i, 1);
                break;
            }
        }
    }
    function checkIfInList(list, name){
        for(i = 0; i < list.length;i++){
            if(list[i].name === name){
                list.splice(i, 1);
                data = list;
                return true;
            }else if(i === list.length-1){
                return false;
            }
        }
    }
})
