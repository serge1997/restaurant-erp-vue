import type { Restaurant } from "./restaurant";

export function createRestaurant(): Restaurant {
    return {
        id: null,
        name: '',
        corporate_name: '',
        corporate_registration: '',
        description: '',
        address: '',
        number: '',
        phone: '',
        email: '',
        logo: '',
        loss_margim: null,
        fix_margim: null,
        variable_margim: null,
        enable_technical_sheet: false,
        is_active: false,
        created_at: ''
    }
}