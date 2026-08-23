import reservationService from "@/services/reservationService";
import tableService from "@/services/tableService";
import { dateEngFormat } from "@/shared/utility";
import { useFormMixin } from "@/stores/useFormMixin";
import { useUserStore } from "@/stores/userStore";
import { required } from "@/validators";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Form",
  setup(prop, ctx) {
    const userStore = useUserStore()
    const form = reactive({
      id: null,
      customer: null,
      state_registration: null,
      phone: null,
      email: null,
      date: new Date,
      hour: null,
      quantity_of_person: null,
      observation: null,
      table_id: null,
      waiter_id: null,
      duration: null,
    })
    const {
      onClearForm,
      onSubmit,
      populateForm,
      getTitle,
      notify,
      v
    } = useFormMixin(reservationService, form, ctx.emit)
    return {
      form,
      onClearForm,
      onSubmit,
      populateForm,
      getTitle,
      notify,
      userStore,
      v
    }
  },

  data() {
    return {
      tables: [] as any[],
      users: [] as any[]
    }
  },
  validations() {
    return {
      form: {
        customer: { required },
        date: { required },
        hour: { required },
        quantity_of_person: { required },
        table_id: { required }
      }
    }
  },

  methods: {
    async getTables(date: any) {
      const engFormat = dateEngFormat(date) || ''
      const { data } = await tableService.getForReservation(engFormat)
      this.tables = data as any[]
    },
    async selectedDate(event: any) {
      if (event < new Date) {
        this.notify.error('A data de reserva nao pode ser posterior')
        return
      }
      await this.getTables(event)
    }
  },

  async mounted() {
    await this.getTables(this.form.date)
    await this.userStore.loadUsers()
    this.users = this.userStore.users
  }
})
