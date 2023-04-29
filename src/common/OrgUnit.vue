<template>
    <div v-bind:style="{'height': '450px;'}">
        <DxDropDownBox
          v-model:value="treeBoxValue"
          v-model:opened="isTreeBoxOpened"
          :show-clear-button="true"
          :data-source="dataSource"
          value-expr="OrganizationUnitID"
          display-expr="OrganizationUnitName"
          placeholder="Tất cả đơn vị"
          @value-changed="syncTreeViewSelection($event)"
        >
          <template>
            <DxTreeView
              :ref="organizationUnitView"
              :data-source="dataSource"
              :select-by-click="true"
              data-structure="plain"
              key-expr="OrganizationUnitID"
              parent-id-expr="ParentID"
              selection-mode="single"
              display-expr="OrganizationUnitName"
              @content-ready="$event.component.selectItem(treeBoxValue)"
              @item-selection-changed="treeView_itemSelectionChanged($event)"
              @item-click="onTreeItemClick($event)"
            />
          </template>
        </DxDropDownBox>
    </div>
</template>
<script>
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxTreeView from 'devextreme-vue/tree-view';
export default {
    name: 'OrgUnit',
    components: {
        DxDropDownBox,
        DxTreeView
    },
    data() {
        return {
            treeDataSource: null,
            isTreeBoxOpened: false,
            treeBoxValue: null,
            treeViewRefName: 'tree-view',
            dataSource: [
                {
                    "OrganizationUnitID" : 1,
                    "OrganizationUnitCode": "TCT",
                    "OrganzaitionUnitName" : "Tổng công ty",
                    "Expanded" : true,
                },
                {
                    "OrganizationUnitID" : 2,
                    "OrganizationUnitCode": "BG",
                    "OrganzaitionUnitName" : "Chi nhánh Bắc Giang",
                    "Expanded" : false,
                    "Code": "/000/001/",
                },
                {
                    "OrganizationUnitID" : 3,
                    "OrganizationUnitCode": "SS",
                    "OrganzaitionUnitName" : "Chi nhánh Sóc Sơn",
                    "Expanded" : false,
                    "ParentID": "1",
                },
            ]
        }
    },
    created() {
        
    },
    methods: {
        syncTreeViewSelection() {
            if (!this.$refs[this.textBoxRefName]) return;
            if (!this.treeBoxValue) {
                this.$refs[this.textBoxRefName].instance.unselectAll();
            } else {
                this.$refs[this.textBoxRefName].instance.selectItem(this.treeBoxValue);
            }
        },
        treeView_itemSelectionChanged(e) {
            this.treeBoxValue = e.component.getSelectedNodeKeys();
        },
        onTreeItemClick() {
            this.isTreeBoxOpened = false;
        },
    },
}
</script>