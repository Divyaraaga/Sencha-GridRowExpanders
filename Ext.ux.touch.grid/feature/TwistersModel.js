var OldHtml;

Ext.define('Ext.ux.touch.grid.feature.TwistersModel', {
	extend : 'Ext.ux.touch.grid.feature.Abstract',
	requires : ['Ext.ux.touch.grid.feature.Abstract'],

	config : {
		events : {
			headerEl : {
				tap : 'onHeaderTap'
			},
			grid : {
				itemdoubletap : 'handleDoubleTap',
				itemtap : 'handleTap'
			}
		},

		checkboxCls : 'grid-checkbox',
		checkboxCellCls : 'checkbox-cell',
		checkboxSelectedCls : 'x-item-selected'
	},

	init : function(grid) {

		var columns = grid.getColumns(), button = cls = this.getCheckboxCls(), cellCls = this
				.getCheckboxCellCls();

		columns = [{
					width : 30,
					cls : cellCls,
					dataIndex : 'checkbox_selection',
					headerRenderer : function() {
						return '<div class="' + cls + '"></div>';
					},
					renderer : function() {
						return '<div class="' + cls + '"></div>';
					}

				}].concat(columns);

		grid.setMode('MULTI');
		grid.setColumns(columns);

	},

	onHeaderTap : function(e) {
		var grid = this.getGrid(), cls = this.getCheckboxCellCls(), isCheckbox = !!e
				.getTarget('.' + cls);

		console.log("cls" + cls);
		alert("isCheckbox  " + isCheckbox);

		if (isCheckbox) {
			if (this.isAllSelected(grid)) {
				console.log(this.isAllSelected(grid));
				grid.deselectAll();
			} else {
				grid.selectAll();
			}
		}
	},

	isAllSelected : function(grid) {
		if (!grid) {
			grid = this.getGrid();
		}

		var store = grid.getStore();
		var isAllSelected = true;

		store.each(function(record) {
					if (!grid.isSelected(record)) {

						// console.log(record);
						console
								.log("value of store "
										+ grid.isSelected(record))
						isAllSelected = false;
					}
				});

		return isAllSelected;
	},
	handleTap : function(grid, index, rowEl, rec, e) {

		var grid = this.getGrid();

		var cls = this.getCheckboxCellCls();
		// console.log("cls" + cls);
		var isCheckboxOut = !!e.getTarget('.' + cls);
		// console.log("isCheckboxOut " + isCheckboxOut);

		var selectedCls = this.getCheckboxSelectedCls();
		// console.log("cls" + selectedCls);
		var isCheckboxIn = !!e.getTarget('.' + selectedCls);
		// console.log("isCheckboxIn " + isCheckboxIn);
		
		if (isCheckboxOut == true) {
			// console.log("in if of checkboxout value" + isCheckboxOut);
			if (isCheckboxIn == true) {
				// OldHtml = rowEl.getHtml();
				htmlValue = reportCustomerContent;
				rowEl.setHtml(OldHtml + htmlValue);

				// grid.deselect(0);
			} else {
				rowEl.setHtml(OldHtml);
				// console.log("in else of checkboxIn value" + isCheckboxIn);
			}
		} else {
			grid.deselectAll();
			// console.log("in else of checkboxout value" + isCheckboxOut);
		}

	}

});

// for header renderer in columns
// <div align="center"><select name="mydropdown"><option value="Milk">Fresh
// Milk</option><option value="Cheese">Old Cheese</option><option
// value="Bread">Hot Bread</option></select></div>
