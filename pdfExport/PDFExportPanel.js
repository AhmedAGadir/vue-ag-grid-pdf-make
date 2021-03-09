import { createPicker } from "./utils";
import printDoc from "./printDoc";

const PDFExportPanel = {
  name: "pdfExportPanel",
  props: ["agGridApi", "agColumnApi"],
  data() {
    return {
      PDF_HEADER_COLOR: "#f8f8f8",
      PDF_INNER_BORDER_COLOR: "#dde2eb",
      PDF_OUTER_BORDER_COLOR: "#babfc7",
      PDF_LOGO:
        "https://raw.githubusercontent.com/AhmedAGadir/ag-grid-todo-list-react-typescript/master/src/assets/new-ag-grid-logo.png",
      PDF_PAGE_ORITENTATION: "landscape",
      PDF_WITH_HEADER_IMAGE: true,
      PDF_WITH_FOOTER_PAGE_COUNT: true,
      PDF_HEADER_HEIGHT: 25,
      PDF_ROW_HEIGHT: 15,
      PDF_ODD_BKG_COLOR: "#fcfcfc",
      PDF_EVEN_BKG_COLOR: "#ffffff",
      PDF_WITH_CELL_FORMATTING: true,
      PDF_WITH_COLUMNS_AS_LINKS: true,
      PDF_SELECTED_ROWS_ONLY: false
    };
  },
  methods: {
    submitFormHandler: function() {
      const printParams = this.$data;
      printDoc(printParams, this.agGridApi, this.agColumnApi);
    }
  },
  mounted() {
    const pickrOddRowBkgColor = createPicker(
      ".color-picker-odd-row-bkg",
      this.PDF_ODD_BKG_COLOR
    );

    const pickEvenRowBkgColor = createPicker(
      ".color-picker-even-row-bkg",
      this.PDF_EVEN_BKG_COLOR
    );

    pickrOddRowBkgColor.on("save", (color, instance) => {
      const updatedColor = color.toHEXA().toString();
      this.PDF_ODD_BKG_COLOR = updatedColor;
      instance.hide();
    });

    pickEvenRowBkgColor.on("save", (color, instance) => {
      const updatedColor = color.toHEXA().toString();
      this.PDF_EVEN_BKG_COLOR = updatedColor;
      instance.hide();
    });
  },
  template: `
  <form @submit.prevent="submitFormHandler">
      <h4 class="text-secondary">PDF Export Options</h4>
      <div class="mb-2">
        <input
          class="form-check-input"
          type="radio"
          name="orientation"
          id="landscape"
          value="landscape"
          v-model="PDF_PAGE_ORITENTATION"
        />
        <label class="form-check-label" for="landscape">
          Landscape
        </label>
        <input
          class="form-check-input"
          type="radio"
          name="orientation"
          id="portrait"
          value="portrait"
          v-model="PDF_PAGE_ORITENTATION"
        />
        <label class="form-check-label" for="portrait">
          Portrait
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="headerImage"
          v-model="PDF_WITH_HEADER_IMAGE"
        />
        <label class="form-check-label" for="headerImage">
          Header image (ag-Grid logo)
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="footerPageCount"
          v-model="PDF_WITH_FOOTER_PAGE_COUNT"
        />
        <label class="form-check-label" for="footerPageCount">
          Footer (page count)
        </label>
      </div>
      <div class="my-2">
        <input
          type="number"
          id="headerRowHeight"
          style="width: 50px; margin-right: 5px"
          v-model.number="PDF_HEADER_HEIGHT"
        />
        <label for="headerRowHeight">Header height</label>
      </div>
      <div class="my-2">
        <input
          type="number"
          id="cellRowHeight"
          style="width: 50px; margin-right: 5px"
          v-model.number="PDF_ROW_HEIGHT"
        />
        <label for="cellRowHeight">Cell height</label>
      </div>
      <div class="color-picker-container">
        <div class="color-picker-odd-row-bkg" />
        <div>Odd row background color</div>
      </div>
      <div class="color-picker-container">
        <div class="color-picker-even-row-bkg" />
        <div>Even row background color</div>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="exportWithFormatting"
          v-model="PDF_WITH_CELL_FORMATTING"
        />
        <label class="form-check-label" for="exportWithFormatting">
          Cell styles
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="exportColumnsAsLink"
          v-model="PDF_WITH_COLUMNS_AS_LINKS"
        />
        <label class="form-check-label" for="exportColumnsAsLink">
          Hyperlinks
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="selectedRowsOnly"
          v-model="PDF_SELECTED_ROWS_ONLY"
        />
        <label class="form-check-label" for="selectedRowsOnly">
          Selected rows only
        </label>
      </div>

      <button type="submit" class="btn btn-primary mt-3">
        Export to PDF
      </button>
    </form>
  `
};

export default PDFExportPanel;
