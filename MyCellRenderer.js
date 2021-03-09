const MyCellRenderer = {
  name: "MyCellRenderer",
  data() {
    return {
      styles: {},
      link: null
    };
  },

  beforeMount() {
    const pdfExportOptions = this.params.column.colDef.pdfExportOptions;

    if (pdfExportOptions) {
      if (pdfExportOptions.styles) {
        const {
          fontSize,
          bold,
          alignment,
          background,
          color
        } = pdfExportOptions.styles;

        this.styles.fontSize = fontSize ? fontSize + "px" : null;
        this.styles.fontWeight = bold ? "bold" : null;
        this.styles.textAlign = alignment ? alignment : null;
        this.styles.background = background ? background : null;
        this.styles.color = color ? color : null;
      }

      if (pdfExportOptions.createURL) {
        this.link = pdfExportOptions.createURL(this.params.value);
      }
    }
  },
  methods: {
    openLink() {
      window.open(this.link, "popup", "width=600,height=600");
      return false;
    }
  },
  template: `
  <div>
      <div v-if="params.value === undefined"></div>
      <div 
        v-else
        :style="styles">
        <span v-if="link">
            <a
              :href="link"
              target="popup"
              @click="openLink"
            >
              {{params.value}}
            </a>
        </span>
        <span v-else>{{params.value}}</span>
      </div>
  </div>
  `
};

export default MyCellRenderer;
