import  type {ComponentPublicInstance} from "vue";
export type * from './VikeHooks'

declare global{
 interface Window{
 _vueApp_ : ComponentPublicInstance
 }
}
