/**
 * @file mofron-event-rowrclick/index.js
 * @brief right click event for mofron
 * ## event function parameter
 *  - component: event target component object
 *  - event: "mouseover" event object by addEventListener
 *  - mixed: user specified parameter
 * @license MIT
 */

module.exports = class extends mofron.class.Event {
    /**
     * initialize event
     * 
     * @param (mixed) short-form parameter
     *                key-value: event config
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.modname('RowRClick');
            
	    this.confmng().add('tr-dom', { type: 'Dom', list: true });
            
	    if (undefined !== prm) {
                this.config(prm);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    clickCheck (e) {
        try {
            let mf_trlst = this.confmng('tr-dom');
	    /* check column */
	    let clk_td = e.target;
	    while ("TD" !== clk_td.nodeName) {
                clk_td = clk_td.parentNode;
	    }
            let clk_tr = clk_td.parentNode;
            
	    /* check row */
	    let row_idx = 0;
            for (let tr_idx in mf_trlst) {
		if (clk_tr.id === mf_trlst[tr_idx].id()) {
                    row_idx = tr_idx;
		    break;
		}
	    }
	    /* check column */
	    let mf_tdlst   = mf_trlst[row_idx].child();
	    let column_idx = 0;
            for (let td_idx in mf_tdlst) {
                if (clk_td.id === mf_tdlst[td_idx].id()) {
                    column_idx = td_idx;
		    break;
		}
	    }
            this.execListener({
                event:  e,
		row:    parseInt(row_idx),
		column: parseInt(column_idx)
	    });

	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    contents (tgt_dom) {
        try {
	    let conts = this.component().confmng('contents');
	    for (let cidx in conts) {
                //super.contents(conts[cidx][0].rootDom()[0].parent().parent());
		let tr_dom  = conts[cidx][0].rootDom()[0].parent().parent();
		this.confmng('tr-dom', tr_dom);
		//super.contents(tr_dom);
                let evt_obj = this;
                tr_dom.getRawDom()['oncontextmenu'] = (ev) => {
                    try {
                        evt_obj.clickCheck(ev);
                        return false;
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                };
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
