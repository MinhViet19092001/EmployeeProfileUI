 <template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="titleComponent" 
            :show-icon-back="true" 
            @backPage="backPage"
            :show-btn-add="false"
        >
            <template v-slot:custom-btn>
                <div class="btn-edit flex" @click="showFormEdit">
                    <div class="icon-pencil"></div>
                    <div class="title-edit">Sửa</div>
                </div>
            </template>
        </ToolbarComponent>
        <div class="organization-create-content flex flex-row">
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Họ và tên NLĐ:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.FullName ?? '-' }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Đơn vị ký hợp đồng lao động:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.OrganizationUnitName ?? '-' }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Vị trí công việc</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.JobPositionName ?? '-' }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Số hợp đồng:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.ContractNo ?? '-'}}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Tên hợp đồng:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.ContractName ?? '-'}}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Loại hợp đồng:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.ContractTypeName ?? '-'}}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Thời hạn hợp đồng:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.ContractPeriodName ?? '-'}}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Lương thỏa thuận chính thức:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.SalaryBase ?? '-'}}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Lương bảo hiểm:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.SalaryInsurance ?? '-'}}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Lương thỏa thuận thử việc:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.SalaryProbation ?? '-'}}</div>
                    </div>
                </div>
            </div>
            <div class="box-content flex flex-column">
               <div class="input-row flex">
                    <div class="title-input-row">Mã nhân viên:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.EmployeeCode ?? '-'}}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Hình thức làm việc:</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.WorkTypeName ?? '-'}}</div>
                    </div>
                </div>
                <div class="input-row flex">
                     <div class="title-input-row">Ngày ký:</div>
                     <div class="input-row-data flex">
                        <div class="value-show"> {{ formatDate(contract.SignedDate) ?? '-'}}</div>
                     </div>
                </div>
                <div class="input-row flex">
                     <div class="title-input-row">Ngày có hiệu lực:</div>
                     <div class="input-row-data flex">
                        <div class="value-show"> {{ formatDate(contract.StartDate) ?? '-'}}</div>
                     </div>
                </div>
                <div class="input-row flex">
                     <div class="title-input-row">Ngày hết hạn:</div>
                     <div class="input-row-data flex">
                        <div class="value-show"> {{ formatDate(contract.EndDate) ?? '-'}}</div>
                     </div>
                </div>
                <div class="input-row flex">
                     <div class="title-input-row">Người đại diện công ty ký:</div>
                     <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.OnBehalfOfEmployeeName ?? '-'}}</div>
                     </div>
                </div>
                <div class="input-row flex">
                     <div class="title-input-row">Chứ danh người đại diện ký:</div>
                     <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.OnBehalfOfEmployeeTitleName ?? '-'}}</div>
                     </div>
                </div>
                <div class="input-row flex">
                     <div class="title-input-row">Trạng thái ký:</div>
                     <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.ContractStatusSignName ?? '-'}}</div>
                     </div>
                </div>
                <div class="input-row flex">
                     <div class="title-input-row">Trạng thái hợp đồng:</div>
                     <div class="input-row-data flex">
                        <div class="value-show"> {{ contract.ContractStatusName ?? '-'}}</div>
                     </div>
                </div>
            </div>
        </div>
    </div>
 </template>
 <script>
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import {useRoute} from "vue-router";
import ContractAPI from '@/api/ContractAPI';
 export default {
    name: "ContractDetail",
    components:{
      ToolbarComponent,
    },
    setup(){
        const route = useRoute();
        const contractID = route.params.id;
        return{
         contractID
        }
    },
    created() {
        this.roleContract = this.$store.state?.roleContract?.join(', ');
        var me = this;
        //get ra data từ id
        ContractAPI.getDetailContract(this.contractID).then( 
            (res) => {
                me.contract = res;
                me.titleComponent = res.ContractNo + " - " + res.FullName;
                //Check quyền xem lương
                if(!this.roleContract.includes("ViewSalary")){
                    me.contract.SalaryBase = "0 VNĐ";
                    me.contract.SalaryInsurance = "0 VNĐ";
                    me.contract.SalaryProbation = "0 VNĐ";
                }
                else{
                    me.contract.SalaryBase = me.contract.SalaryBase ? me.contract.SalaryBase  + " VNĐ" : "0 VNĐ";
                    me.contract.SalaryInsurance = me.contract.SalaryInsurance ? me.contract.SalaryInsurance  + " VNĐ" : "0 VNĐ";
                    me.contract.SalaryProbation = me.contract.SalaryProbation ? me.contract.SalaryProbation  + " VNĐ" : "0 VNĐ";
                }
            },
            (error) => {

            }
        )
    },
    data() {
        return {
            titleComponent: "",
            contract: {},
            roleContract:""
        }
    },
    methods: {
      formatDate(date){
         if(date){
               var year = new Date(date).getFullYear();
               var valueMonth = new Date(date).getMonth() + 1;
               var valueDay = new Date(date).getDay();
               var displayMonth = valueMonth < 10 ? "0" + valueMonth : valueMonth;
               var displayDay = valueDay < 10 ? "0" + valueDay : valueDay;
               return displayDay + "/" + displayMonth + "/" + year;
         }
      },
      backPage(){
         this.$router.push('/contract');
      }
    },
 }
 </script>
 <style scoped>
 .organization-create-content{
    background-color: #fff;
    margin: 0 24px;
    border-radius: 4px;
    padding: 24px;
}
.organization-create-content .box-content{
    flex: 1;
    width: 50%;
}
.input-row{
    height: 36px;
    margin: 15px 10px;
    width: 100%;
}
.title-input-row{
    font-size: 14px;
    color: #1f1f20!important;
    width: 200px;
    line-height: 36px;
    min-width: 140px;
}
.input-row-data{
    width: 55%;
    border-bottom: 1px solid #e0e1e4;
}
.value-show{
    padding: 6px 10px;
    font-weight: 600;
    font-size: 14px;
}
.dot-status {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    margin-right: 16px;
}
.btn-edit{
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #1f1f20;
    cursor: pointer;
    min-width: 80px;
    font-size: 14px;
    border: 1px solid #dadce3;
}
.btn-edit:hover{
    background-color: #eff1f6;
}
.icon-pencil{
    margin-right: 4px;
}
 </style>