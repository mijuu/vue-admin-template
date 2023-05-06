import SvgIcon from '@/components/SvgIcon/index.vue' // svg component

export default function installIcon(app) {
  // register globally
  app.component('svg-icon', SvgIcon)

  const req = require.context('./svg', false, /\.svg$/)
  const requireAll = (requireContext) => requireContext.keys().map(requireContext)
  requireAll(req)
}