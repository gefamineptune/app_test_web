function setData(){
  debugger;  
const jsonData = { 
        "contact": [
           {
                "type": "email",
                "value": "john.doe@example.com"
           },
           {
                "type": "email",
                "value": "cate.delan@example.com"
           },
            {           
                 "type": "email",
                 "value": "mark.doe@example.com"
            },
            {
                "type": "email",
                "value": "jenny.delan@example.com"
            }
        ]
   
};

modelMultiModel.setData(jsonData);
console.log(modelMultiModel.getData());
debugger;
}
