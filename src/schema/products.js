

module.exports = [`
type ARQ_Inventory {
  createdAt: String
  updatedAt: String
  isRemove: Boolean
}

input ARQ_Inventory_filter {
  departmentId: String
}
 type Query{
  ARQ_Inventory(filter: ARQ_Inventory_filter):[ARQ_Inventory]
 }
#borrar esto y hacer bien el schema
`];