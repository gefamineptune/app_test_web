function deletePosition(id) { 
    var options = { parameters: {
        "where": JSON.stringify({id: id})
        }
    };

  apiDeletePosition(options)
    .then(() => {
      sap.m.MessageToast.show("Data has been deleted");
    })
    .catch((error) => {
      console.error('Error deleting position:', error);
    });
  
  apiGetPositions();
}



