/**
 * Created by smartrabbit on 16/8/11.
 * @flow
 */
 export const SWITCH_TAB = 'SWITCH_TAB';

 export type Tab =
    'picture'
  | 'read'
  | 'movie'
  ;
 export function switchTab(tab:Tab) {
   return {
       type: SWITCH_TAB,
       tab: tab
   }
 }
