
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/views/Login/Login.vue';
import Overview from '@/components/views/Overview/Overview.vue';
import OrganizationUnit from '@/components/views/OrganizationUnit/OrganizationUnit.vue';
import OrganizationUnitCreate from '@/components/views/OrganizationUnit/OrganizationUnitCreate.vue';
import OrganizationUnitDetail from '@/components/views/OrganizationUnit/OrganizationUnitDetail.vue';
import OrganizationUnitEdit from '@/components/views/OrganizationUnit/OrganizationUnitEdit.vue';
import JobPosition from '@/components/views/JobPosition/JobPosition.vue';
import JobPositionCreate from '@/components/views/JobPosition/JobPositionCreate.vue';
import JobPositionDetail from '@/components/views/JobPosition/JobPositionDetail.vue';
import JobPositionEdit from '@/components/views/JobPosition/JobPositionEdit.vue';
import Employee from '@/components/views/Employee/Employee.vue'
import EmployeeCreate from '@/components/views/Employee/EmployeeCreate.vue';
import EmployeeDetail from '@/components/views/Employee/EmployeeDetail.vue';
import EmployeeEdit from '@/components/views/Employee/EmployeeEdit.vue';
import Contract from '@/components/views/Contract/Contract.vue';
import ContractCreate from '@/components/views/Contract/ContractCreate.vue';
import ContractDetail from '@/components/views/Contract/ContractDetail.vue';
import UserRole from '@/components/views/UserRole/UserRole.vue';
import UserRoleCreate from '@/components/views/UserRole/UserRoleCreate.vue';
import UserRoleDetail from '@/components/views/UserRole/UserRoleDetail.vue';
import UserList from '@/components/views/UserList/UserList.vue';
import UserListCreate from '@/components/views/UserList/UserListCreate.vue';
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    { 
        path: '/login', 
        name: 'login',
        component: Login
    },
    {
        path: '/overview',
        name: 'overview',
        component: Overview
    },
    {
        path: '/organization',
        name: 'organization',
        component: OrganizationUnit
    },
    {
        path: '/organization/create',
        name: 'organizationCreate',
        component: OrganizationUnitCreate
    },
    {
        path: '/organization/:id',
        name: 'organizationDetail',
        component: OrganizationUnitDetail
    },
    {
        path: '/organization/edit/:id',
        name: 'organizationEdit',
        component: OrganizationUnitEdit
    },
    {
        path: '/jobposition',
        name: 'jobPosition',
        component: JobPosition
    },
    {
        path: '/jobposition/create',
        name: 'jobPositionCreate',
        component: JobPositionCreate
    },
    {
        path: '/jobposition/:id',
        name: 'jobPositionDetail',
        component: JobPositionDetail
    },
    {
        path: '/jobposition/edit/:id',
        name: 'jobPositionEdit',
        component: JobPositionEdit
    },
    {
        path: '/employee',
        name: 'employee',
        component: Employee
    },
    {
        path: '/employee/create',
        name: 'employeeCreate',
        component: EmployeeCreate
    },
    {
        path: '/employee/:id',
        name: 'employeeDetail',
        component: EmployeeDetail
    },
    {
        path: '/employee/edit/:id',
        name: 'employeeEdit',
        component: EmployeeEdit
    },
    {
        path: '/contract',
        name: 'contract',
        component: Contract
    },
    {
        path: '/contract/create',
        name: 'contractCreate',
        component: ContractCreate
    },
    {
        path: '/contract/:id',
        name: 'contractDetail',
        component: ContractDetail
    },
    {
        path: '/user-role',
        name: 'userRole',
        component: UserRole
    },
    {
        path: '/user-role/create',
        name: 'userRoleCreate',
        component: UserRoleCreate
    },
    {
        path: '/user-role/:id',
        name: 'userRoleDetail',
        component: UserRoleDetail
    },
    {
        path: '/user-list',
        name: 'userList',
        component: UserList
    },
    {
        path: '/user-list/create',
        name: 'userListCreate',
        component: UserListCreate
    },
]

const router = createRouter({
    history: createWebHistory(),
    hash: false,
    routes
})

export default router;



