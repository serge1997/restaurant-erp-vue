import { defineComponent } from "vue";
import Form from "./Form/Form.vue"
import { usePageMixin } from "@/stores/usePageMixin";
import reservationService from "@/services/reservationService";

export default defineComponent({
  components: {
    Form
  },
  setup(prop, ctx) {
    const {
      data,
      paginate,
      onSearch
    } = usePageMixin(reservationService)
    return {
      data,
      paginate,
      onSearch
    }
  },

  data() {
    return {

    }
  },
  mounted() {
      this.onSearch(this.paginate)
  }
})
