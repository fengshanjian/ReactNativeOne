/**
 * Created by smartrabbit on 16/8/8.
 */

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'
export const NAVIGATIONBAR_HIDDEN = 'NAVIGATIONBAR_HIDDEN'
export const STATUSBAR_STYLE = 'STATUSBAR_STYLE'
export const STATUSBAR_COLOR = 'STATUSBAR_COLOR'
//导出加一的方法
export function increment(text){
    return {
        type: INCREMENT_COUNTER,
        text: text,  //这行代码只是示例，说明Action可以再带一个参数payload,这个动作携带的数据,参数名、内容
        //等均自定义
    }
}
//导出减一的方法
export function decrement(){
    return {
        type: DECREMENT_COUNTER
    }
}
export function changeNavibarHidden(hidden) {
    return{
        type:NAVIGATIONBAR_HIDDEN,
        hidden:hidden,
    }
}
export function changeStatusBarStyle(barStyle) {
    return{
        type:STATUSBAR_STYLE,
        barStyle:barStyle,
    }
}
export function changeStatusBarColor(barColor) {
    return{
        type:STATUSBAR_COLOR,
        barColor:barColor,
    }
}
