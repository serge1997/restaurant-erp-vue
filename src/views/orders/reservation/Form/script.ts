import reservationService from "@/services/reservationService";
import { useFormMixin } from "@/stores/useFormMixin";
import { required } from "@/validators";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Form",
  setup(prop, ctx) {
    const form = reactive({
      id: null,
      customer: null,
      date: null,
      hour: null,
      quantity_of_person: null,
      observation: null,
      table_id: null
    })
    const {
      onClearForm,
      onSubmit,
      populateForm,
      getTitle,
      v
    } = useFormMixin(reservationService, form, ctx.emit)
    return {
      form,
      onClearForm,
      onSubmit,
      populateForm,
      getTitle,
      v
    }
  },

  data() {

  },
  validations() {
    return {
      form: {
        customer: { required },
        date: { required },
        hour: { required },
        quantity_of_person: { required },
        table_id: {required}
      }
    }
  }
})
