
// departmentOptionsMixin.js
const departmentOptionsMixin = {//部门与业务中心的映射关系
    'jsb': ['aa', 'bb', 'cc', 'dd','ee','ff','gg','hh','ii'],//技术部
    'cwb': ['aa'],//财务部
    'rsb': ['bb'],//人事部
    'zjb':['dd'],//总监部
    // ...其他部门的映射
};

export default {
    data(){
        return {
            value: '', //选中的值
            currentDepartmentKey:'',//当前登录人员部门
            filteredOptions:[],//下拉菜单数组
        }
    },
    computed: {
        // filteredOptions() {
        //     return this.getOptionByDepartment(this.currentDepartmentKey).map(value => {
        //         return { value, label: this.getLabelByValue(value) };
        //     });
        // },
    },
    methods: {
        getOptionByDepartment(departmentKey) {
            return departmentOptionsMixin[departmentKey] || [];
        },
        getLabelByValue(value) {
            const labels = {
                'aa': '其他',
                'bb': '大修业务',
                'cc': '管理中心',
                'dd': '管理中心',
                'ee': '管理中心1',
                'ff': '管理中心2',
                'gg': '管理中心3',
                'hh': '管理中心4',
                'ii': '管理中心5',
                // ...其他 value 到 label 的映射
            };
            return labels[value] || '';
        },

        filteredCenterOptions() {
            this.filteredOptions =  this.getOptionByDepartment(this.currentDepartmentKey).map(value => {
                return { value, label: this.getLabelByValue(value) };
            });
        },

        getRoles(){
            this.currentDepartmentKey = 'cwb'
            const roles = ['1005', '2002', '3003']; // 当前用户的角色数组
            const requiredRoles = ['1005', '2001', '7009'];//限定的角色，如果当前用户角色，含有这些角色在内，就要更新下业务中心的数组filteredOptions

            const hasRequiredRole = requiredRoles.some(role => roles.includes(role));
            if(hasRequiredRole){
                this.filteredCenterOptions()
            }else{
                //调用数据字典的方法
            }
        }
    },
    mounted() {
        this.getRoles()
    }
};
