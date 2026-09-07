import { defineComponent } from "vue";
import Form from "./Form/Form.vue"
import { usePageMixin } from "@/stores/usePageMixin";
import reservationService from "@/services/reservationService";
import { useFormStore } from "@/stores/formStore";
import { dateEngFormat, type FormRef } from "@/shared/utility";
import { useConfirm } from "primevue/useconfirm";
import { ReservationStatus } from "@/types/reservation/reservation";

export default defineComponent({
  components: {
    Form
  },
  setup(prop, ctx) {
    const formStore = useFormStore()
    const confirm = useConfirm()
    const {
      data,
      paginate,
      onSearch,
      metaData,
      notify
    } = usePageMixin(reservationService)
    return {
      data,
      paginate,
      onSearch,
      formStore,
      metaData,
      confirm,
      notify
    }
  },

  data() {
    return {
      formRef: {} as FormRef,
      activeDayFilter: 'today',
      filters: {
        date_from: '',
        date_to: ''
      },
      confirm_severity: '',
      updateStatusParams: {
        id: 0,
        status: 0
      }
    }
  },
  computed: {
  },
  methods: {
    async handleReservationStatus() {
      const { message } = await reservationService.status(this.updateStatusParams.id, this.updateStatusParams.status)
      this.notify.success(message)
      this.updateStatusParams.id = 0
      this.updateStatusParams.status = 0
      this.confirm.close()
      await this.onSearch(this.paginate)
    },
    confirmReservation(id: number) {
      this.confirm_severity = 'bg-green-alert-secondary';
      this.updateStatusParams.id = id
      this.updateStatusParams.status = ReservationStatus.CONFIRMED
      this.confirm.require({
        message: "Deseja realmente confirmar a reserva ?",
        group: 'reservation_status',
      })
    },
    cancelReservation(id: number) {
      this.confirm_severity = 'bg-danger-alert'
      this.updateStatusParams.id = id
      this.updateStatusParams.status = ReservationStatus.CANCELLED
      this.confirm.require({
        message: "Deseja realmente cancelar a reserva ?",
        group: 'reservation_status',
      })
    },
    async getReservation(selected: any) {
      const { data } = await reservationService.getOne(selected.id)
      this.formStore.setDataEdit(data)
      this.formRef.populateForm(this.formStore.getDataEdit())
    },
    async applyFilter(day: string) {
      this.activeDayFilter = day
      const query = { [day]: true }
      this.paginate.query = query
      if (day.length) {
        this.filters.date_to = ''
        this.filters.date_from = ''
      }
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
