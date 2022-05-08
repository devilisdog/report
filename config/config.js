// https://umijs.org/config/
import { defineConfig } from 'umi'
import defaultSettings from './defaultSettings'
import proxy from './proxy'
const { REACT_APP_ENV } = process.env

export default defineConfig({
    base: '/dist/',
    publicPath: '/dist/',
    history: { type: 'hash' },
    hash: true,
    antd: {},
    dva: {
        hmr: true,
    },
    locale: {
        // default zh-CN
        default: 'zh-CN',
        antd: true,
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes: [
        {
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [
                {
                    name: 'login',
                    path: '/user/login',
                    component: './user/login',
                },
            ],
        },
        {
            path: '/',
            component: '../layouts/SecurityLayout',
            routes: [
                {
                    path: '/',
                    component: '../layouts/BasicLayout',
                    // authority: ['admin', 'user'],
                    routes: [
                        {
                            path: '/',
                            redirect: '/user/login',
                        },
                        {
                            path: '/sales-contract',
                            name: '销售合同',
                            // icon: 'crown',
                            component: './salesContract',
                            // authority: ['admin'],
                            // routes: [
                            //   {
                            //     path: '/admin/sub-page',
                            //     name: 'sub-page',
                            //     icon: 'smile',
                            //     component: './buildOrder',
                            //     authority: ['admin'],
                            //   },
                            // ],
                        },
                        {
                            path: '/brand-gross-profit',
                            name: '单车毛利',
                            // icon: 'crown',
                            component: './brandGrossProfit',
                        },
                        {
                            path: '/sales-daily',
                            name: '销售日报',
                            // icon: 'crown',
                            component: './salesDaily',
                        },
                        {
                            path: '/consultant-ability',
                            name: '顾问战斗力',
                            // icon: 'crown',
                            component: './consultantAbility',
                        },
                        {
                            path: '/car-model-gross-profit',
                            name: '车型毛利',
                            // icon: 'crown',
                            component: './carModelGrossProfit',
                        },
                        {
                            path: '/car-sales-number',
                            name: '整车销售数量',
                            // icon: 'crown',
                            component: './carSalesNumber',
                        },
                        {
                            path: '/after-sales-gross-profit',
                            name: '售后毛利',
                            // icon: 'crown',
                            component: './afterSalesGrossProfit',
                        },
                        {
                            path: '/repair-parts-turnover',
                            name: '维修配件周转率',
                            // icon: 'crown',
                            component: './repairPartsTurnover',
                        },
                        {
                            path: '/after-sale-accessories-inventory-chain-ratio',
                            name: '售后产值及配件库存统计环比',
                            // icon: 'crown',
                            component: './afterSaleAccessoriesInventoryChainRatio',
                        },

                        {
                            component: './404',
                        },
                    ],
                },
                {
                    component: './404',
                },
            ],
        },
        {
            component: './404',
        },
    ],
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // ...darkTheme,
        'primary-color': defaultSettings.primaryColor,
    },
    // @ts-ignore
    title: false,
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/dist/',
    },
})
