import { simpleHttpRequest } from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue";
import MyCellRenderer from "./MyCellRenderer.js";
import { COLDEFS_WITHOUT_GROUPING } from "./columnDefs";

import PDFExportPanel from "./pdfExport/PDFExportPanel";
import GridOptionsPanel from "./GridOptionsPanel";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import "./style.css";

export const App = {
  name: "App",
  data() {
    return {
      gridOptions: null,
      gridApi: null,
      columnApi: null
    };
  },
  components: {
    AgGridVue,
    MyCellRenderer,
    "pdf-export-panel": PDFExportPanel,
    "grid-options-panel": GridOptionsPanel
  },
  beforeMount() {
    this.gridOptions = {
      columnDefs: COLDEFS_WITHOUT_GROUPING,
      suppressPropertyNamesCheck: true,
      defaultColDef: {
        cellRendererFramework: "MyCellRenderer",
        filter: true,
        sortable: true,
        resizable: true,
        enableRowGroup: true,
        menuTabs: ["filterMenuTab"]
      },
      groupSelectsChildren: true,
      rowSelection: "multiple"
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;

      simpleHttpRequest({
        url: "https://www.ag-grid.com/example-assets/olympic-winners.json"
      }).then(function(data) {
        data.forEach(r => {
          r.date = new Date();
        });
        params.api.setRowData(data.slice(1500, 2000));
      });
    },
    onFirstDataRendered(params) {
      params.columnApi.autoSizeAllColumns();
    },
    onColumnEverythingChanged(params) {
      let selectionCol = params.columnApi.getColumn("selection-col");
      if (selectionCol) {
        params.columnApi.moveColumn(selectionCol, 0);
      }
    }
  },
  template: `
    <div>
      <div class="form-wrap">
        <grid-options-panel :agGridApi="gridApi" :agColumnApi="columnApi"/>
        <pdf-export-panel :agGridApi="gridApi" :agColumnApi="columnApi"/>
      </div>
      <div class="grid-container">
        <ag-grid-vue style="height: 100%;"
          class="ag-theme-alpine"
          :gridOptions="gridOptions"
          @column-everything-changed="onColumnEverythingChanged"
          @first-data-rendered="onFirstDataRendered"
          @grid-ready="onGridReady"
        >
        </ag-grid-vue>
      </div>
    </div>
  `
};
