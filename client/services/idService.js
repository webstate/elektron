var idService = angular.module('idService', []);

idService.factory('idService', function(){
    var id = "";
    function setId(idToSet){
        id = idToSet;
        console.log("THIS IS ID TO SET: " + idToSet);
        console.log("THIS IS THE ID AFTER SETTING: " + id);
    }
    function getId(){
        return id;
    }
    return({
        setId:setId,
        getId: getId
    })
})
