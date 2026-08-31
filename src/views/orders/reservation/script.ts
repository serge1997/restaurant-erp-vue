import { defineComponent } from "vue";
import Form from "./Form/Form.vue"
import { usePageMixin } from "@/stores/usePageMixin";
import reservationService from "@/services/reservationService";
import { useFormStore } from "@/stores/formStore";
import { dateEngFormat, type FormRef } from "@/shared/utility";

export default defineComponent({
  components: {
    Form
  },
  setup(prop, ctx) {
    const formStore = useFormStore()
    const {
      data,
      paginate,
      onSearch
    } = usePageMixin(reservationService)
    return {
      data,
      paginate,
      onSearch,
      formStore
    }
  },

  data() {
    return {
      formRef: {} as FormRef,
      activeDayFilter: 'today',
      filters: {
        date_from: '',
        date_to: ''
      }
    }
  },
  computed: {
  },
  methods: {
    async getReservation(selected: any) {
      const { data } = await reservationService.getOne(selected.id)
      this.formStore.setDataEdit(data)
      this.formRef.populateForm(this.formStore.getDataEdit())
    },
    async applyFilter(day: string) {
      this.activeDayFilter = day
      const query = { [day]: true }
      this.paginate.query = query
      if (this.filters.date_to || this.filters.date_from) {
        this.activeDayFilter = ''
        this.paginate.query = {
          date_to: dateEngFormat(this.filters.date_to),
          date_from: dateEngFormat(this.filters.date_from)
        }
      }
      await this.onSearch(this.paginate)
    },
    activeDayFilterOn(day: string) {
      return this.activeDayFilter == day ? 'on' : ''
    }
  },
  mounted() {
    this.paginate.query = {[this.activeDayFilter]: true}
    this.onSearch(this.paginate)
    this.formRef = this.$refs.formRef as FormRef
  }
})
