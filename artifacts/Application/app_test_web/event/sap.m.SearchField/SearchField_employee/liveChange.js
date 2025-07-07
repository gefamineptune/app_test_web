// Multiple Filters using OR
const binding = TableEmployee.getBinding("items");
const filter = new sap.ui.model.Filter({
    filters: [
        new sap.ui.model.Filter("name", "Contains", this.getValue()),
       
    ],
    and: false
})
binding.filter([filter]);