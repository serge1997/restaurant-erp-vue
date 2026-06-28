import { required as _required, helpers } from "@vuelidate/validators";
import { i18n } from "@/i18n";
export const required = helpers.withMessage(
   () => i18n.global.t('validation.required'),
   _required
)