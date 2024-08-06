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
        disable:true,

        roles:'',//角色
        dept:''//部门
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
        },
        SET_ROLES(state,val){
            state.roles = val
        },
        SET_DEPT(state,val){
            state.dept = val
        }

    },
    actions: {
        //获取角色与部门
        // getUserInfo({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         Api.getInfo('educationLevel').then(e => {
        //             if (!e || !e.result) {
        //                 reject('字典接口educationLevel - 返回格式不正确');
        //                 return;
        //             }
        //             commit('SET_ROLES', e.data.roles);
        //             commit('SET_DEPT', e.data.dept);
        //             resolve();
        //         }).catch(err => {
        //             console.error('[HY VUEX] getEducationLevel--', err);
        //             reject(err);
        //         });
        //     });
        // },


        //
        // async fetchTechnicalDepartmentList({ rootState, commit }) {
        //     try {
        //         // 获取当前角色
        //         const roles = rootState.user.roles;
        //
        //         // 获取当前部门对应的业务中心
        //         const currentDepartmentKey = rootState.user.currentDepartmentKey; // 当前部门编码
        //         commit('SET_DEPARTMENT_OPTIONS', currentDepartmentKey);
        //
        //         // 限定角色判断
        //         const hasRequiredRole = rootState.technicalDepartment.requiredRoles.some(role => roles.includes(role)); // 是否含有限定的角色
        //
        //         // 并行请求两个接口
        //         const [deptResponse, userResponse] = await Promise.all([
        //             Vue.prototype.$getRedisDict('responsibleDept'),
        //             Vue.prototype.$anotherDeptApi() // 假设这是另一个获取部门的接口
        //         ]);
        //
        //         if (deptResponse.code * 1 === 0 && userResponse.code * 1 === 0) {
        //             let filterList = [];
        //             if (hasRequiredRole) {
        //                 // 含有限定的角色，按部门显示业务中心数据
        //                 filterList = deptResponse.data.filter(item => item.value === rootState.technicalDepartment.curUserDept[0]);
        //             } else {
        //                 // 否则等于接口返回
        //                 filterList = responsibleDeptResponse.data;
        //             }
        //             // 你可以在这里处理另一个接口的返回数据 anotherDeptResponse
        //             // 例如，如果需要将两个接口的数据合并：
        //             // filterList = [...filterList, ...anotherDeptResponse.data];
        //
        //             commit('SET_TECHNICAL_DEPARTMENT_LIST', filterList);
        //         } else {
        //             throw new Error('Failed to fetch technical department list');
        //         }
        //     } catch (error) {
        //         console.error('Error fetching technical department list:', error);
        //     }
        // }
    }
}