// Replace yourField with FieldName
const context = oEvent.oSource.getBindingContext();  

// Get Entire Model
const data = context.getObject();

modelContainerPositionDetail.setData(data);
populateDetailsPage();