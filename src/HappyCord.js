/** 
 * Happycord - the best client mod 
 * Copyright (c) 2023 Happy enderman
 

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * **/


window.Happycord = window.Happycord ?? {}

window.Happycord.localStorage = window.localStorage



const loadHappyCord = () => {
   
    window.Happycord.localStorage = localStorage
    
    fetch('https://raw.githubusercontent.com/happyendermangit/happycord/main/plugins.js')
    .then(e=>e.text())
    .then(e=>{
        eval(e)
    })

    const pluginsEnabled = JSON.parse(window.Happycord.localStorage?.pluginsEnabled ?? "[]")


    window.Happycord.pluginsEnabled = pluginsEnabled
    
    window.Happycord.pluginsLoaded = []

    //window.Happycord.pluginsEnabled.push('')
    

    window.Happycord.themes = JSON.parse(window.Happycord.localStorage?.themes ?? "[]") 

    
        
    if (window.Happycord.pluginsEnabled === undefined){
        window.Happycord.localStorage.setItem('pluginsEnabled','[]')
    }
    if (window.Happycord.themes === undefined){
        window.Happycord.localStorage.setItem('themes','[]')
    }
    
    // made by minerpl (791077984395591720)
    document.addEventListener('DOMContentLoaded',()=>{
        let wreq; webpackChunkdiscord_app.push([[Symbol()],{},(r) => wreq = r]);
        let _mods = Object.values(wreq.c)
            
    
        const findByProps = (...props) => {
            for (let m of _mods) {
                try {
                    if (!m.exports || m.exports === window) continue;
                    if (props.every((x) => m.exports?.[x])) return m.exports;
                    for (let ex in m.exports) {
                        if (props.every((x) => m.exports?.[ex]?.[x])) return m.exports[ex];
                    }
                } catch {}
            }
        }
        
       
        
        
        // essentiels
        window.Happycord.wreq = wreq
        window.Happycord._mods = _mods 
        window.Happycord.findByProps = findByProps
        window.Happycord.findStore = (store) => {
            let o = findByProps("getAll").getAll().find(e => e.constructor.displayName === store);
            return o 
        }
        window.Happycord.restApi = window.Happycord.findByProps('getAPIBaseURL')

        window.Happycord.getChunk = c => {
            for (_mod of window.Happycord._mods){
                if (_mod.id === c){
                    return _mod
                }
            }
        }
       
        window.Happycord.findByProps('BADGE_ICON').BADGE_ICON = _ => {
            if (_.startsWith('https://')){
                return _
            }
            "/badge-icons/".concat(_, ".png")
        }

        
        // discord componements modules

        window.Happycord.reactModules = window.Happycord.findByProps('useState')

        const { jsx, jsxs } = window.Happycord.findByProps('jsx');

        window.Happycord.reactModules.jsx = jsx;
        window.Happycord.reactModules.jsxs = jsxs;            

        window.Happycord.Components = {}

        window.Happycord.Margins = window.Happycord.getChunk('926622').exports

        window.Happycord.ToastTypes = window.Happycord.findByProps('showToast').ToastType

        window.Happycord.ShowToast = (text,type) => {
            let toastsModule = window.Happycord.findByProps('createToast')
            window.Happycord.findByProps('showToast').showToast(
                toastsModule.createToast(text,type)
            )
        }


        window.Happycord.openModal = data => {

            let openModalProps = window.Happycord.findByProps('openModal')
            openModalProps.openModal(e => jsx(openModalProps.ConfirmModal,{
                header: data?.header ?? "header",
                confirmText: data?.confirmText ?? "Ok.",
                cancelText: data?.cancelText ?? "Cancel.",
                onConfirm: (e)=>{data?.onConfirm(e)},
                confirmButtonColor: data?.confirmButtonColor ?? openModalProps.Button.Colors.BRAND,
                ...e,
                children: data?.children
            },!0));
            
        }

        
   

        window.Happycord.loadPlugin = (id) => {
            let url = `https://raw.githubusercontent.com/happyendermangit/happycord/main/plugins/${id}.js`
            fetch(url)
            .then(e=>{return e.text()})
            .then(e=>{
                if (e != "404: Not Found"){
                    console.log(`Loaded ${id}`)
                    var oScript = document.createElement("script");
                    var oScriptText = document.createTextNode(e);
                    oScript.appendChild(oScriptText);
                    document.body.appendChild(oScript);
                    try{
                        window[id].onLoad(window.Happycord)
                        window.Happycord.pluginsLoaded.push(id)
                    }
                    catch (e){
                        console.error(`%cHappyCord %c${e}`,'color:yellow;background:green;border-raduis:5px;','color:red')
                    }
                }
            })
        } 

        window.Happycord.loadLocalPlugin = (id) => {
            try {
                window[id].onLoad(window.Happycord)
            }
            catch (e) {
                console.error(`[HAPPYCORD] (${plugin.id}) failed to load: ${e}`)
            }
        }

    
        window.Happycord.loadPluginFromString = (code) => {
            
            console.log(`Loaded ${id}`)
            var oScript = document.createElement("script");
            var oScriptText = document.createTextNode(code);
            oScript.appendChild(oScriptText);
            document.body.appendChild(oScript);
            console.log(window[id])
            try{
                window[id].onLoad(window.Happycord)
            }
            catch (e){
                console.error(`%cHappyCord %c${e}`,'color:yellow;background:green;border-raduis:5px;','color:red')
            }
        
        } 
    
    
        window.Happycord.loadTheme = (url) => {
            fetch(url)
            .then(e=>{return e.text()})
            .then(e=>{
                if (e != "404: Not Found"){
                    console.log(`Loaded ${url}`)
                    document.getElementById('happycord-themes').textContent += e
                }
            })
        } 
    
        window.Happycord.loadThemes = () => {
            document.getElementById('happycord-themes').textContent = ""
            for (theme of window.Happycord.themes){
                window.Happycord.loadTheme(theme)
            }
        }
    
        Happycord.findByProps('_dispatch').addInterceptor(e=>{
          if (e.type === "CONNECTION_OPEN"){
            for (plugin of window.Happycord.pluginsEnabled){
                window.Happycord.loadPlugin(plugin)
            }
          }
        })
       
        window.Happycord.loadThemes()
    })
  
}

loadHappyCord()