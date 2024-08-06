const departmentOptions = {
    'jsb1': ['其他'], // 科技信息文档部
    'jsb2': ['其他'], // 党群工作部（党委办公室）
    'jsb3': ['监理中心'], // 监理公司
    'jsb4': ['其他'], // 党委
    'jsb5': ['大修业务'], // 阳江项目部
    'jsb6': ['大修业务'], // 威海项目部
    'jsb7': ['大修业务'], // 技术服务部
    'jsb8': ['大修业务'], // 科技信息文档部
    'jsb9': ['大修业务'], // 科技信息文档部
    'jsb10': ['培训中心'], // 科技信息文档部
}
export default {
    namespaced: true,
    state: {
        curUserDept: '',//部门对应的业务中心
        technicalDepartmentList: [],//下拉数组
        requiredRoles: ['10000', '2006', '2007'],//限定的角色 技术部门领导2006   技术部门员工2007   技术部门经营接口人???
        disable:true
    },
    getters: {},
    mutations: {
        SET_TECHNICAL_DEPARTMENT_LIST(state, list) {
            state.technicalDepartmentList = list;
        },
        SET_DEPARTMENT_OPTIONS(state, val) {
            state.curUserDept = departmentOptions[val];
        },
        SET_DISABLE(state, val){
            state.disable = val;
            sessionStorage.setItem('aaa', JSON.stringify(val));
        }
    },
    actions: {

        async fetchTechnicalDepartmentList({rootState, commit}) {
            try {
                //获取当前角色
                const roles = rootState.user.roles

                //获取当前部门对应的业务中心
                const currentDepartmentKey = rootState.user.currentDepartmentKey//当前部门编码
                commit('SET_DEPARTMENT_OPTIONS', currentDepartmentKey);

                //限定角色判断
                const hasRequiredRole = rootState.technicalDepartment.requiredRoles.some(role => roles.includes(role));//是否含有限定的角色

               //返回业务中心列表
               //  ====================测试数据  Start  ↓====================
                const list = [{
                    label: '其他', value: '其他', code: '1'
                }, {
                    label: '监理中心', value: '监理中心', code: '2'
                }, {
                    label: '大修业务', value: '大修业务', code: '3'
                }, {
                    label: '培训中心', value: '培训中心', code: '4'
                }]

                let filterList = []
                if (hasRequiredRole) {
                    //含有限定的角色，按部门显示业务中心数据
                    filterList = list.filter(item => item.value === rootState.technicalDepartment.curUserDept);
                } else {
                    //否则等于接口返回
                    filterList = list
                }
                commit('SET_TECHNICAL_DEPARTMENT_LIST', filterList);
                commit('SET_DISABLE', true);



                // ====================测试数据  End  ↑====================


                // let filterList = []
                // const response = await Vue.prototype.$getRedisDict('responsibleDept');
                // if (response.code * 1 === 0) {
                //     if (hasRequiredRole) {
                //         //含有限定的角色，按部门显示业务中心数据
                //         filterList = response.data.filter(item => item.value === rootState.technicalDepartment.curUserDept[0]);
                //     } else {
                //         //否则等于接口返回
                //         filterList = response.data;
                //     }
                //     commit('SET_TECHNICAL_DEPARTMENT_LIST', filterList);
                // } else {
                //     throw new Error('Failed to fetch technical department list');
                // }
            } catch (error) {
                console.error('Error fetching technical department list:', error);
            }
        }
    }
}