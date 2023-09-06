import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'  
})

export class ApiService {

  // server
// headerurl: any = "http://143.110.241.155:8102";

//local
headerurl: any = "http://192.168.100.196:8888";

  constructor(private http: HttpClient) { }

  registerUser(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/users/register", body)
  }

  loginUser(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/users/login", body)
  }

  getUserRoles(companyId: any) {
    return this.http.get(this.headerurl + "/infra/materials/getUserRoles/" + companyId);
  }

  getProjects(id: any) {
    return this.http.get(this.headerurl + "/infra/materials/getProject/" + id);
  }

  getSubProjects(body: any) {
    return this.http.get(this.headerurl + "/infra/materials/getSubProject/" + body);
  }

  collectMaterial(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/addMaterial", body)
  }

  getMaterial(body: any) {
    return this.http.get(this.headerurl + "/infra/materials/getMaterial/" + body)
  }

  collectIssueMaterial(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/issueMaterial", body)
  }

  getIssueMaterial(body: any) {
    return this.http.get(this.headerurl + "/infra/materials/getIssueMaterial/" + body)
  }

  getCategeryDropDowns() {
    return this.http.get(this.headerurl + "/infra/materials/getMainCategory")
  }

  getSubCategeryDropDowns(mainCategery: any) {
    return this.http.get(this.headerurl + "/infra/materials/getSubCategory/" + mainCategery);
  }

  getMaterialNames(subCategery: any) {
    return this.http.get(this.headerurl + "/infra/materials/getMaterialDropdown/" + subCategery);
  }

  getMetrics() {
    return this.http.get(this.headerurl + "/infra/materials/getMetrics");
  }

  getVendors() {
    return this.http.get(this.headerurl + "/infra/materials/getVendors");
  }

  changePassword(body: any) {
    return this.http.put(this.headerurl + "/infra/users/changepassword", body);
  }

  postProjects(body: any) {
    return this.http.post(this.headerurl + "/infra/materials/updateProject", body)
  }

  getdeaultProjects(body: any) {
    return this.http.post(this.headerurl + "/infra/materials/postandGetUpdateProject", body);
  }

  postReceiptMaterialApproval(body: any) {
    return this.http.post(this.headerurl + "/infra/materials/materialApproveCntrl", body)
  }

  getReceptMaterialApprovals(projectname: any) {
    return this.http.get(this.headerurl + "/infra/materials/getPendingReceiptMaterial/" + projectname)
  }

  getIssueMaterialApprovals(projectname: any) {
    return this.http.get(this.headerurl + "/infra/materials/getPendingIssueMaterial/" + projectname)
  }

  getUsersApproval() {
    return this.http.get(this.headerurl + "/infra/users/getusers");
  }

  postIssueMaterialApproval(body: any) {
    return this.http.post(this.headerurl + "/infra/materials/approveMaterialIssue", body)
  }

  postUserApproval(body: any) {
    console.log(body, "userapprovals bodyyyyy")
    return this.http.post(this.headerurl + "/infra/users/approveUsers", body);
  }

  userDecline(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/users/declineUsers", body)
  }

  getSubMaterialFilter() {
    return this.http.get(this.headerurl + "/infra/materials/getSubMaterialCategory");
  }

  getDefualtReceipts(projectname: any) {
    return this.http.get(this.headerurl + "/infra/materials/get15DaysReceiptList/" + projectname);
  }

  getDefaultIssues(projectname: any) {
    return this.http.get(this.headerurl + "/infra/materials/get15DaysIssueList/" + projectname);
  }

  getDateFilterReceipts(body: any) {
    console.log("dateFilter receipts body", body)
    return this.http.post(this.headerurl + "/infra/materials/materialReceiptListOnDateFilter", body)
  }
  getDateFilterIssues(body: any) {
    console.log("dateFilter issues body", body)
    return this.http.post(this.headerurl + "/infra/materials/materialIssueListOnDateFilter", body)
  }

  getDateFilterAll(body: any) {
    console.log("dateFilter issues body", body)
    return this.http.post(this.headerurl + "/infra/materials/allTransactionDateFilter", body)
  }

  getAllTransactions(projectname: any) {
    return this.http.get(this.headerurl + "/infra/materials/getTransactionReport/" + projectname);
  }

  getStockData(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/stockAvailability", body);
  }

  materialCollection(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/materialImageCollection", body);
  }

  getEquipmentType() {
    return this.http.get(this.headerurl + "/infra/materials/getEquipmentValues");
  }

  getEquipmentMetrics() {
    return this.http.get(this.headerurl + "/infra/materials/subWorkEquipmentMetrics");
  }

  equipmentCollection(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/equipmentImageCollection", body);
  }

  stockPDFDownload(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/stockMaterialPDFfilter", body)
  }

  receiptsPDFDownload(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/materialPDFCntrlwithfilters", body)
  }

  issuesPDFDownload(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/issuePDFCntrlwithfilters", body)
  }

  allPDFDownload(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/allTransactionPDFWithFilters", body)
  }

  getStock(body: any) {
    return this.http.get(this.headerurl + "/infra/materials/getMaterialStock/" + body);
  }

  getWorkTypeMetrics() {
    return this.http.get(this.headerurl + "/infra/materials/workSubTypeMetrics");
  }

  postWorkProgressDetails(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/workProgress", body)
  }

  getWorkTypeDropdown() {
    return this.http.get(this.headerurl + "/infra/materials/getWorkType");
  }

  getSubWorkTypeDropDown(body: any) {
    console.log(body);
    return this.http.get(this.headerurl + "/infra/materials/getSubWorkType/" + body)
  }

  getMixedDesignTypes() {
    return this.http.get(this.headerurl + "/infra/materials/mixedDesignMaterial");
  }

  postQunatityForMaterials(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/mulMaterial", body)
  }

  getMixedWorkComponentType(p_id: any, sp_id: any) {
    return this.http.get(this.headerurl + "/infra/materials/getWorkComponent/" + p_id + "/" + sp_id);
  }

  getMixedSubWorkComponentType(subProjectName: any) {
    return this.http.get(this.headerurl + "/infra/materials/getMDsubWork/" + subProjectName);
  }

  postMixedDesignTypeDetails(body: any) {
    console.log("bodyu mixed design", body);
    return this.http.post(this.headerurl + "/infra/materials/addMaterialDesignTransactions1", body)
  }

  downLoadStockCSV(body: any) {
    console.log("bodyu mixed design", body);
    return this.http.post(this.headerurl + "/infra/materials/stockMaterialCSVfilter", body)
  }

  downLoadReceiptCSV(body: any) {
    console.log("bodyu mixed design", body);
    return this.http.post(this.headerurl + "/infra/materials/receiptDataCSV", body)
  }
  downLoadIssueCSV(body: any) {
    console.log("bodyu mixed design", body);
    return this.http.post(this.headerurl + "/infra/materials/materialIssueCSV", body)
  }
  downLoadAllCSV(body: any) {
    console.log("bodyu mixed design", body);
    return this.http.post(this.headerurl + "/infra/materials/allTransactionDataCSV", body)
  }

  addWorkProgress(body: any) {
    console.log("add work form body", body);
    return this.http.post(this.headerurl + "/infra/materials/workProgressforWork", body)
  }

  getworkDoneLists(projectname: any) {
    return this.http.get(this.headerurl + "/infra/materials/getworkProgress/"+ projectname);
  }

  workProgressStatus(body: any) {
    console.log("add work form body", body);
    return this.http.post(this.headerurl + "/infra/materials/workProgresStatus", body)
  }

  getSteelType() {
    return this.http.get(this.headerurl + "/infra/materials/getSteelData")
  }

  getFuelType() {
    return this.http.get(this.headerurl + "/infra/materials/getPOLData")
  }

  getPolMetricsData() {
    return this.http.get(this.headerurl + "/infra/materials/getPOLMetricsData")
  }
  getMdMetricsData() {
    return this.http.get(this.headerurl + "/infra/materials/getMDMetricsData")
  }
  getSteelMetricsData() {
    return this.http.get(this.headerurl + "/infra/materials/getSteelMetricsData")
  }

  getWorkProgressStatus(body: any) {
    console.log("date status body", body)
    return this.http.post(this.headerurl + "/infra/materials/getWpStatusData", body)
  }

  getDailyReportDates(body: any) {
    console.log("date status body", body)
    return this.http.post(this.headerurl + "/infra/materials/getDates", body)
  }

  postPurchaseOrders(body: any) {
    console.log("purchase orders", body)
    return this.http.post(this.headerurl + "/infra/materials/postPurchaseOrder", body)
  }

  getPurchaseOrdersList(projectname: any) {
    return this.http.get(this.headerurl + "/infra/materials/getPurchaseOrderList/" + projectname)
  }

  getPurchaseOrdersDropdownList() {
    return this.http.get(this.headerurl + "/infra/materials/assets")
  }

  getPolMetrics(body: any) {
    return this.http.get(this.headerurl + "/infra/materials/getPOLMetricsData/" + body)
  }

  getCompanies() {
    return this.http.get(this.headerurl + "/infra/users/getCompanyNames")
  }

  postAsset(body: any) {
    console.log("asset body", body)
    return this.http.post(this.headerurl + "/infra/materials/assets", body)
  }

  getAssetsList(projectId: any){
    return this.http.get(this.headerurl + "/infra/materials/getAsset/" + projectId)
  }

  getEquipmentNumber(){
    return this.http.get(this.headerurl + "/infra/materials/getEquipmentNumber")
  }

  getPoItems(poId: any){
    return this.http.get(this.headerurl + "/infra/materials/getPOMaterials/"+ poId)
  }

  getAssignedCompanies(userId: any){
    return this.http.get(this.headerurl + "/infra/users/multipleCompanyInSettingsCntrl/" + userId)
  }

  UpdateRoleId(body: any) {
    console.log("RoleId body", body)
    return this.http.put(this.headerurl + "/infra/users/updateRoleId", body)
  }

  UpdateCompanyId(body: any) {
    console.log("Companyisss body", body)
    return this.http.put(this.headerurl + "/infra/users/updateCompany", body)
  }

  getAssignedUserRole(userId: any, comp_id: any) {
    return this.http.get(this.headerurl + "/infra/users/multipleRolesInSettings/" + userId + "/" + comp_id)
  }

  getMultipleProjects(UserId: any, comp_id: any){
    return this.http.get(this.headerurl + "/infra/users/multipleProjectsInSettings/" + UserId + "/" + comp_id)
  }

  getDefaultComapanyDetails(UserId: any){
    return this.http.get(this.headerurl + "/infra/users/getDefaultDetailsOfCompanyPage/" + UserId)
  }

  addProjects(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/addProjectsByAdmin", body)
  }

  addSubProjects(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/addSubProjectsByAdmin", body)
  }

  addMaterails(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/addMaterialByAdmin", body)
  }

  addVendors(body: any) {
    console.log(body);
    return this.http.post(this.headerurl + "/infra/materials/addVendorsByAdmin", body)
  }

  getMaterailsAdmin(id: any) {
    return this.http.get(this.headerurl + "/infra/materials/getMaterialsForAdmin/" + id)
  }

  getVendorsAdmin(id: any) {
    return this.http.get(this.headerurl + "/infra/materials/getVendorsForAdminPanal/" + id)
  }
}
