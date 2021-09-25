export default function({$axios}, inject){
  $axios.$get('../sanctum/csrf-cookie')
}
