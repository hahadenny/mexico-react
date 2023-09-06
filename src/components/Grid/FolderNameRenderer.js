class FolderNameRenderer {
    init(params) {
        let value = params.data?.name;

        if (params.data?.parent) {
            value = params.data.parent.name + ' > ' + value;
        }

        const wrap = document.createElement('span');

        wrap.innerHTML = (params.data?._type === 'group' || params.node?.group)
            ? `<span class="folder"><svg class="folder-icon" viewBox="0 0 24 24"><path fill="#68FFDC" d="m9.17 6 2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg> ${value}</span>`
            : value;
        this.eGui = wrap.firstChild;
    }

    getGui() {
        return this.eGui;
    }

    refresh() {
        return false;
    }
}

export default FolderNameRenderer;
