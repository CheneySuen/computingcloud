/*
 * @Author: XinyueShu xshuac@connect.hk.ust
 * @Date: 2023-05-13 01:43:42
 * @LastEditors: XinyueShu xshuac@connect.hk.ust
 * @LastEditTime: 2023-05-13 01:48:07
 * @FilePath: /computingcloud/frontend/src/plugins/vuetify.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
    theme: {
      themes: {
        light: {
            primary: '#DCE1E9',
            secondary: '#363732',
            accent: '#e88b01'
        },
         //fix
         dark: {
          primary: colors.blue.lighten3,
          background: colors.indigo.base
        }
      },
    },
  }

export default new Vuetify(opts)