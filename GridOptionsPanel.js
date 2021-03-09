import { COLDEFS_WITH_GROUPING, COLDEFS_WITHOUT_GROUPING } from "./columnDefs";

const GridOptionsPanel = {
  name: "GridOptionsPanel",
  props: ["agGridApi", "agColumnApi"],
  data() {
    return {
      columnGrouping: false,
      groupByCountry: false,
      filterByArgentina: false,
      sortAthleteCol: false
    };
  },
  methods: {
    updateColumnGrouping(event) {
      const withColumnGroups = event.target.checked;

      this.agGridApi.setColumnDefs(
        withColumnGroups ? COLDEFS_WITH_GROUPING : COLDEFS_WITHOUT_GROUPING
      );
    },
    updateGroupByCountry(event) {
      this.agColumnApi.applyColumnState({
        state: [
          {
            colId: "country",
            rowGroup: event.target.checked
          }
        ],
        defaultState: {
          rowGroup: false
        }
      });
    },
    updateFilterByArgentina(event) {
      const countryFilterComponent = this.agGridApi.getFilterInstance(
        "country"
      );
      const filterModel = event.target.checked
        ? { values: ["Argentina"] }
        : null;
      countryFilterComponent.setModel(filterModel);
      this.agGridApi.onFilterChanged();
    },
    updateSortAthleteAsc(event) {
      let athleteSort = event.target.checked ? "asc" : null;

      this.agColumnApi.applyColumnState({
        state: [{ colId: "athlete", sort: athleteSort }],
        defaultState: { sort: null }
      });
    }
  },
  template: `
      <form>
      <h4 class="text-secondary">Grid Options</h4>
      <span class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="grid-setting-column-groups"
          v-model="columnGrouping"
          @change="updateColumnGrouping"
        />
        <label class="form-check-label" for="grid-setting-column-groups">
          Column Groups
        </label>
      </span>
      <span class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="grid-setting-group-country"
          v-model="groupByCountry"
          @change="updateGroupByCountry"
        />
        <label class="form-check-label" for="grid-setting-group-country">
          Group by "country"
        </label>
      </span>
      <span class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="grid-setting-filter-argentina"
          v-model="filterByArgentina"
          @change="updateFilterByArgentina"
        />
        <label class="form-check-label" for="grid-setting-filter-argentina">
          Filter by "Argentina"
        </label>
      </span>
      <span class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="grid-setting-sort-athlete-asc"
          v-model="sortAthleteCol"
          @change="updateSortAthleteAsc"
        />
        <label class="form-check-label" for="grid-setting-sort-athlete-asc">
          Sort Athlete (ascending)
        </label>
      </span>
    </form>
  `
};

export default GridOptionsPanel;
