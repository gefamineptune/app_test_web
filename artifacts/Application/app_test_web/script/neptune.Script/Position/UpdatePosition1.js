function update() {
    if (Input_position.getValue() === ""){
        sap.m.MessageToast.show("Position must be filled");
        return
    };
    if (Input_description.getValue() === ""){
        sap.m.MessageToast.show("Description must be filled");
        return
    };

let final_data = { }

    final_data.id = IdInvisible.getText();
    final_data.position_name = Input_position.getValue();
    final_data.description = Input_description.getValue();

    var options = { 
    data : final_data
    };

apiUpdatePosition(options);
apiGetPositions();


App.to(PageMaster);


}


