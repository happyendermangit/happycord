window.happycordPlugin = {
  onLoad: (Happycord) => {
    Happycord.ShowToast("Hi! this is a plugin runned (onLoad)",4)
  },
  Settings: (h) => {
          return [
              // children of modal
              h.reactModules.jsx(window.Happycord.findByProps('Text').Text,{
                  varient:"text-md/medium",
                  children:"setttings of the example plugin"
              }),
              () => {
                  // on confirm
                  console.log('okay was pressed')
              }
          ]
      }
}
