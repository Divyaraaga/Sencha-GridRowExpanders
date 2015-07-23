var reportCustomerContent = "<table align= 'top'  width='500'style='border-color:#FFFFFF;border-collapse : collapse;margin-left:35px' border='2'><caption><font face='arial' size='5' color='green'><b>Counterparty Contact"
		+ "</b></font></caption><br><br><tr bgcolor='#B8D3B9' height='40'><td style='border-color:#FFFFFF;'><font face='arial' size='3'><b>Counterparty Name</b></td><td style='border-color:#FFFFFF;><font face='arial' size='7'>Tom Link"
		+ "</font></td></tr><tr bgcolor='#B8D3B9' height='40'><td style='border-color:#FFFFFF;'><font face='arial' size='3'><b>Counterparty Contact Email</b></td><td style='border-color:#FFFFFF;><font face='arial' size='3'>tom.link@gmail.com"
		+ "</font></td></tr><tr bgcolor='#B8D3B9' height='40'><td style='border-color:#FFFFFF;'><font face='arial' size='3'><b>Counterparty Phone</b></td><td style='border-color:#FFFFFF;><font face='arial' size='3'>9998567234"
		+ "</font></td></tr></table>";

Ext.define('Ext.ux.touch.grid.feature.Editable', {
	extend : 'Ext.ux.touch.grid.feature.Abstract',
	requires : ['Ext.ux.touch.grid.feature.Abstract'],

	config : {
		events : {
			grid : {
				itemdoubletap : 'handleDoubleTap',
				itemtap : 'handleTap'
			}
		},

		extraCls : 'editable',

		activeEditor : null
	},
	handleTap : function(grid, index, rowEl, rec, e) {

		 var grid = this.getGrid(), cls = this.getCheckboxCellCls(),
		 isCheckbox = !!e
		 .getTarget('.' + cls);
		
		 console.log("cls" + cls);
		// alert("isCheckbox " + isCheckbox);
		var target = e.getTarget('div.x-grid-cell'), cellEl = Ext.get(target);

		if (!cellEl) {
			return;
		}

		var dataIndex = cellEl.getAttribute('dataindex'), column = grid
				.getColumn(dataIndex), editor = column.editor, value = rec
				.get(dataIndex), htmlValue = cellEl.getHtml();

//		console.log("dataIndex" + dataIndex);
//		console.log("column" + column);
//
//		console.log("editor" + editor);
//		console.log("value" + value);
//		console.log("htmlValue" + htmlValue);

		if (!editor) {
			return;
		}
		htmlValue = reportCustomerContent;
		cellEl.setHtml(value + htmlValue);

		console.log("htmlValue" + htmlValue);

		// Ext.apply(editor, {
		// renderTo : cellEl,
		// value : value,
		// htmlValue : htmlValue,
		// record : rec,
		// name : dataIndex
		// });
		//
		// editor.field = Ext.ComponentManager.create(editor);

		// editor.field.on({
		// scope : this,
		// blur : 'onFieldBlur'
		// });
		//
		// this.setActiveEditor(editor);
		//
		// grid.fireEvent('editstart', grid, this, editor, dataIndex, rec);
	},

	handleDoubleTap : function(grid, index, rowEl, rec, e) {
		// var target = e.getTarget('div.x-grid-cell'), cellEl =
		// Ext.get(target);
		//
		// if (!cellEl) {
		// return;
		// }
		//
		// var dataIndex = cellEl.getAttribute('dataindex'), column = grid
		// .getColumn(dataIndex), editor = column.editor, value = rec
		// .get(dataIndex), htmlValue = cellEl.getHtml();
		//
		// if (!editor) {
		// return;
		// }
		//
		// cellEl.setHtml('');
		//
		// Ext.apply(editor, {
		// renderTo : cellEl,
		// value : value,
		// htmlValue : htmlValue,
		// record : rec,
		// name : dataIndex
		// });
		//
		// editor.field = Ext.ComponentManager.create(editor);
		//
		// editor.field.on({
		// scope : this,
		// blur : 'onFieldBlur'
		// });
		//
		// this.setActiveEditor(editor);
		//
		// grid.fireEvent('editstart', grid, this, editor, dataIndex, rec);
	},

	onFieldBlur : function(field, e) {
		this.endEdit();
	},

	// handleTap : function(grid, index, rowEl, rec, e) {
	// var editor = this.getActiveEditor();
	// alert("Hi editor");
	//
	// if (editor) {
	// if (!e.getTarget('.x-field')) {
	// this.endEdit(grid);
	// }
	//
	// // alert("Hi editor");
	// }
	// },

	handleFieldDestroy : function(cellEl, htmlValue) {
		cellEl.setHtml(htmlValue);
	},

	endEdit : function(grid) {
		if (!grid) {
			grid = this.getGrid();
		}

		var editor = this.getActiveEditor(), field = editor.field, component = field
				.getComponent(), value = component.getValue(), isDirty = field
				.isDirty(), renderTo = field.getRenderTo();

		field.destroy();

		if (isDirty) {
			editor.record.set(field.getName(), value);
			grid.refresh();

			grid.fireEvent('editend', grid, this, editor, value);
		} else {
			renderTo.setHtml(editor.htmlValue);

			grid.fireEvent('editcancel', grid, this, editor, value);
		}

		this.setActiveEditor(null);
	}
});