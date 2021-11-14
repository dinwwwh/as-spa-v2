import Vue from 'vue'
import VueFbCustomerChat from 'vue-fb-customer-chat'

export default function ({$app}, inject){
  Vue.use(VueFbCustomerChat, {
    page_id: $app.findConfig('fb_plugin_chat_id'), //  change 'null' to your Facebook Page ID,
    theme_color: '#333333', // theme color in HEX
    locale: 'vi_VN', // default 'en_US'
  })
}
