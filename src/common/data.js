const listSex = [
    {
        SexID: 1,
        SexName: 'Nam'
    },
    {
        SexID: 2,
        SexName: 'Nữ'
    }
]

const listTypeIdentificationID = [
    {
        TypeIdentificationID: 1,
        TypeIdentificationName: 'CMND'
    },
    {
        TypeIdentificationID: 2,
        TypeIdentificationName: 'CCCD'
    }
]

const listLevelTrainning = [
    {
        LevelTrainningID: 1,
        LevelTrainningName: 'Đại học'
    },
    {
        LevelTrainningID: 2,
        LevelTrainningName: 'Cao đẳng'
    },
    {
        LevelTrainningID: 3,
        LevelTrainningName: 'Trung cấp'
    },
    {
        LevelTrainningID: 4,
        LevelTrainningName: 'Thạc sĩ'
    },
    {
        LevelTrainningID: 5,
        LevelTrainningName: 'Tiến sĩ'
    },
    {
        LevelTrainningID: 6,
        LevelTrainningName: 'Trung học phổ thông'
    },
    {
        LevelTrainningID: 7,
        LevelTrainningName: 'Trung học cơ sở'
    },
    {
        LevelTrainningID: 8,
        LevelTrainningName: 'Tiểu học'
    },
    {
        LevelTrainningID: 9,
        LevelTrainningName: 'Cao đẳng nghề'
    },
    {
        LevelTrainningID: 10,
        LevelTrainningName: 'Trung cấp nghề'
    },
    {
        LevelTrainningID: 11,
        LevelTrainningName: 'Sơ cấp nghề'
    },
    {
        LevelTrainningID: 12,
        LevelTrainningName: 'Dạy nghề thường xuyên'
    },
    {
        LevelTrainningID: 13,
        LevelTrainningName: 'Giáo dục thường xuyên'
    }
]

const listEducationDegree = [
    {
        EducationDegreeID: 1,
        EducationDegreeName: 'Xuất sắc'
    },
    {
        EducationDegreeID: 2,
        EducationDegreeName: 'Giỏi'
    },
    {
        EducationDegreeID: 3,
        EducationDegreeName: 'Khá'
    },
    {
        EducationDegreeID: 4,
        EducationDegreeName: 'Trung bình khá'
    },
    {
        EducationDegreeID: 5,
        EducationDegreeName: 'Trung bình'
    },
]

const listEmployeeStatus = [
    {
        EmployeeStatusID: 1,
        EmployeeStatusName: 'Đang làm việc'
    },
    {
        EmployeeStatusID: 2,
        EmployeeStatusName: 'Đã nghỉ việc'
    }
]

const listEmployeeEmployeeNature = [
    {
        EmployeeNatureID: 1,
        EmployeeNatureName: 'Học việc'
    },
    {
        EmployeeNatureID: 2,
        EmployeeNatureName: 'Thử việc'
    },
    {
        EmployeeNatureID: 3,
        EmployeeNatureName: 'Chính thức'
    },
    {
        EmployeeNatureID: 4,
        EmployeeNatureName: 'Nghỉ việc'
    },
    {
        EmployeeNatureID: 5,
        EmployeeNatureName: 'Sa thải'
    }
]

const listContractType = [
    {
        ContractTypeID: 1,
        ContractTypeName: "Thử việc"
    },
    {
        ContractTypeID: 2,
        ContractTypeName: "Hợp đồng xác định thời hạn"
    }
]

const listContractPeriod = [
    {
        ContractPeriodID: 1,
        ContractPeriodName: "2 tháng"
    },
    {
        ContractPeriodID: 2,
        ContractPeriodName: "6 tháng"
    },
    {
        ContractPeriodID: 3,
        ContractPeriodName: "1 năm"
    },
    {
        ContractPeriodID: 4,
        ContractPeriodName: "2 năm"
    },
    {
        ContractContractPeriodIDypeID: 5,
        ContractPeriodName: "5 năm"
    },
]

const listWorkType = [
    {
        WorkTypeID: 1,
        WorkTypeName: "Toàn thời gian"
    },
    {
        WorkTypeID: 2,
        WorkTypeName: "Bán thời gian"
    },
    {
        WorkTypeID: 3,
        WorkTypeName: "Cộng tác viên"
    },
]

const listContractStatusSign = [
    {
        ContractStatusSignID: 1,
        ContractStatusSignName: "Chưa ký"
    },
    {
        ContractStatusSignID: 2,
        ContractStatusSignName: "Đã ký"
    },
]

const listRole = [
    {
        RoleCode: "Add",
        RoleName: "Thêm",
    },
    {
        RoleCode: "Edit",
        RoleName: "Sửa",
    },
    {
        RoleCode: "Delete",
        RoleName: "Xóa",
    },
    {
        RoleCode: "ViewSalary",
        RoleName: "Xem thông tin lương",
    }
]

export default {
    getListSex() {
      return listSex;
    },
    getListTypeIdentification(){
        return listTypeIdentificationID;
    },
    getListLevelTrainning(){
        return listLevelTrainning;
    },
    getListEducationDegree(){
        return listEducationDegree;
    },
    getListEmployeeStatus(){
        return listEmployeeStatus;
    },
    getListEmployeeNature(){
        return listEmployeeEmployeeNature;
    },
    getListContractType(){
        return listContractType;
    },
    getListContractPeriod(){
        return listContractPeriod;
    },
    getListWorkType(){
        return listWorkType;
    },
    getListContractStatusSign(){
        return listContractStatusSign;
    },
    getListRole(){
        return listRole;
    }
  };