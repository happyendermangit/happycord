// original was from vencord web extension
// all credits go to them 
// i dont own this script in any way!


if (typeof browser === "undefined") {
    var browser = chrome;
}
console.log('[HAPPYCORD] Injecting....')
const script = document.createElement("script");
script.src = browser.runtime.getURL("src/HappyCord.js");
script.id = "happycord-script";
Object.assign(script.dataset, {
    extensionBaseUrl: browser.runtime.getURL(""),
    version: browser.runtime.getManifest()
        .version
});
document.documentElement.append(script), {
    once: true
}

const settingPanelscript = document.createElement("script");
settingPanelscript.src = browser.runtime.getURL("src/mods/settingPanel.js");
settingPanelscript.id = "happycord-mod-settingpanel";
Object.assign(script.dataset, {
    extensionBaseUrl: browser.runtime.getURL(""),
    version: browser.runtime.getManifest()
        .version
});



const style = document.createElement("link");
style.type = "text/css";
style.rel = "stylesheet";
style.id = "happycord-style"
style.href = browser.runtime.getURL("src/HappyCord.css");
document.addEventListener(
    "DOMContentLoaded",
    () => { 
            document.documentElement.append(style), {
                once: true
            }
            document.documentElement.append(settingPanelscript), {
                once: true
            }
    }
);



const Themesstyle = document.createElement("style");
Themesstyle.id = "happycord-themes"
document.addEventListener(
    "DOMContentLoaded",
    () => document.documentElement.append(Themesstyle), {
        once: true
    }
);
