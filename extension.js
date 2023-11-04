import * as SwitcherPopup from 'resource:///org/gnome/shell/ui/switcherPopup.js';

import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class RemoveAltTabDelay extends Extension {

    constructor(metadata) {
        super(metadata);

        this._metadata = metadata;
        this._switcherPopup = SwitcherPopup || null;
    }

    enable() {
        let SwitcherPopupProto = this._switcherPopup.SwitcherPopup.prototype;

        SwitcherPopupProto.showOld = SwitcherPopupProto.show;

        SwitcherPopupProto.show = function (...args) {
            let res = this.showOld(...args);
            if (res) {
                this._showImmediately();
            }
            return res;
        };
    }

    disable() {
        let SwitcherPopupProto = this._switcherPopup.SwitcherPopup.prototype;

        if (SwitcherPopupProto.showOld) {
            SwitcherPopupProto.show = SwitcherPopupProto.showOld;
            delete(SwitcherPopupProto.showOld);
        }
    }
}
