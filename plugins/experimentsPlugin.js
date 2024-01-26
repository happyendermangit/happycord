window.experimentsPlugin = {
    onLoad: (h) => {
        Happycord.ShowToast('Happy Enderman has been stranding here...');
        let module = h.findByProps('getUsers');
        nodes = Object.values(module._dispatcher._actionHandlers._dependencyGraph.nodes);
        try {
            nodes.find(x => x.name == "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({
                user: {
                    flags: 1
                }
            });
        } catch (e) {}
        original = [module.getCurrentUser, module.getNonImpersonatedCurrentUser];
        module.getCurrentUser = module.getNonImpersonatedCurrentUser = () => ({
            isStaff: () => true
        });
        nodes.find(x => x.name == "DeveloperExperimentStore").actionHandler["OVERLAY_INITIALIZE"]();
        [module.getCurrentUser, module.getNonImpersonatedCurrentUser] = original;
    }
}
