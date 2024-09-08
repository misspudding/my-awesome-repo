/*
 * @Author: chenxiaoqian 472979229@qq.com
 * @Date: 2024-04-16 23:17:14
 * @LastEditors: chenxiaoqian 472979229@qq.com
 * @LastEditTime: 2024-08-14 00:25:21
 * @FilePath: \my-element-ui-project\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import About from '@/components/about.vue'
import initForm from '@/components/initForm.vue'
import tableF from '@/components/tableF.vue'
import firstTableView from '@/components/firstTableView.vue'
//页面
import firstTable from '@/view/firstTable.vue'
import secondTable from '@/view/secondTable.vue'
import Vue from "vue";
Vue.use(VueRouter)
// 定义路由
const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        // meta: { requiresAuth: true } // 你可以在这里添加路由元信息，比如是否需要认证
    },{
        path: '/form',
        name: 'form',
        component: initForm,
        // meta: { requiresAuth: true } // 你可以在这里添加路由元信息，比如是否需要认证
    },{
        path: '/tableF',
        name: 'tableF',
        component: tableF,
        // meta: { requiresAuth: true } // 你可以在这里添加路由元信息，比如是否需要认证
    },
    {
        //开始
        path: '/firstTable',
        name: 'firstTable',
        component: firstTable,
        // meta: { requiresAuth: true } // 你可以在这里添加路由元信息，比如是否需要认证
    },{
        //开始
        path: '/firstTableView',
        name: 'firstTableView',
        component: firstTableView,
        // meta: { requiresAuth: true } // 你可以在这里添加路由元信息，比如是否需要认证
    },{
        //开始
        path: '/secondTable',
        name: 'secondTable',
        component: secondTable,
        // meta: { requiresAuth: true } // 你可以在这里添加路由元信息，比如是否需要认证
    },
    // {
    //     path: '/user/:id',
    //     name: 'User',
    //     component: User,
    //     props: true // 允许传递参数给组件
    // }
]

// 创建 router 实例
const router = new VueRouter({
    routes,
    mode: 'history' // 你可以选择 'history' 或 'hash' 模式
})

// 如果你想要使用路由守卫，可以在这里添加
// router.beforeEach((to, from, next) => {
//     // if (to.meta.requiresAuth) {
//     //     // 这里可以添加认证逻辑
//     //     // 如果用户未认证，可以重定向到登录页面
//     //     if (!isAuthenticated()) {
//     //         next({ name: 'Login' }) // 假设你有一个名为 Login 的路由
//     //     } else {
//     //         next() // 用户已认证，继续前往目标路由
//     //     }
//     // } else {
//     //     next() // 路由不需要认证，直接放行
//     // }
// })

export default router