import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { defineComponent } from "vue";
import { useFormStore } from "@/stores/formStore";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from "primevue/inputtext";
import type { Paginate } from "@/shared/http/paginate";
import type { Service } from "@/services";
import type { DataTableColumn } from "@/shared/utility/types/dataTableColumns";


export default defineComponent({
    name: 'DataTableTemplate',

    components: {
        DataTable,
        Column,
        IconField,
        InputIcon,
        InputText
        
    },
    setup(){
        const formStore = useFormStore()
        return {
            formStore
        }
    },
    props: {
        data: {
            type: Object
        },
        columns:{
            type: Array<DataTableColumn>
        },
        expandedColumns: {
            type: Array<DataTableColumn>
        },
        service: {
            type: Object
        },
        paginate: {
            type: Object,
            required: true
        },
        isSortable: {
            default: false,
            type: Boolean
        },
        columnHeaderSize: {
            type: String,
            default: 'p-theader'
        },
        columnHeaderFw: {
            type: String,
            default: 'fw-medium'
        },
        tableRowCountTitle: {
            type: String,
            default: "Total registros"
        },
        columnContentSize: {
            type: String,
            default: "s-md"
        },
        hasHeader: {
            type: Boolean,
            default: true
        },
        waiterColWidth: String,
        tableColWidth: String,
        totalColWidth: String,
        statusColWidth: String,
        tagColWidth: String,
        actionColWidth: String,
        idColWidth: String,
        customerColWidth: String,
        expandedTitle: String,
        hasExpendedRows: {
            type: Boolean,
            default: false
        },
        editable: {
            type: Boolean,
            default: true
        },
        searchInputPlaceholder: {
            type: String,
            default: 'search...'
        }
    },
    watch: {
        data(newData) {
            this.entityData = newData
        }
    },
    data(){
        return{
            entityService: {} as Service,
            entityPaginate: {} as Paginate,
            entityData: {} as any,
            hasNextPage: true,
            expandedRows: {},
            tableHeight: '500px',
            observer: null as any,
            filters: {
                search: null
            }
        }
    },
    methods: {
        clearFilters(){
            this.filters.search = null
            this.$emit('on-search', {search: null})
            console.log("cleared ")
        },
        calcTableHeight() {
              const dt = this.$refs.dataTable as any
              if (!dt?.$el) return
          
              // pega o elemento raiz do DataTable
              const dtEl = dt.$el as HTMLElement
              const dtRect = dtEl.getBoundingClientRect()
          
              // espaço do topo do DataTable até o fim da viewport
              const availableFromTop = window.innerHeight - dtRect.top
          
              // desconta o footer
              const footerEl = document.querySelector('.footer') as HTMLElement
              const footerHeight = footerEl?.offsetHeight ?? 0
          
              // desconta folga mínima
              const folga = 12
          
              const height = availableFromTop - footerHeight - folga
          
              this.tableHeight = `${Math.max(height, 200)}px`
        },
            // ...resto dos methods
        onRowExpand(event: any){
            this.expandedRows = {[event.data.id]: true}
            this.$emit('onExpandedRow', event.data)
        },
        onRowCollapse(event: any){
            this.expandedRows = {}
        },
        async getElement(data: any) {
            if (this.editable){
                const response = await this.service?.getOne(data.id)
                this.formStore.setDataEdit(response.data)
                this.$emit('processDataEdit', response.data)
            }
            if (this.hasExpendedRows && !this.editable) {
                this.onRowExpand({data: data})
            }
        },
        async onScroll(event: any) {
            const { scrollHeight, clientHeight, scrollTop} = event.target
            const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1
            if (isBottom) {
                if(this.hasNextPage){
                    this.entityPaginate.offset += this.entityPaginate.limit
                    const response = await this.entityService.getAll<any>(this.entityPaginate)
                    if (response.data?.length) {
                        this.entityData?.push(...response.data)
                        if (response.meta?.total < this.entityPaginate.limit) {
                            this.hasNextPage = false;
                            return
                        }
                    }
                    this.hasNextPage = true
                }
            }
        },
        async onSearch() {
            this.entityPaginate.offset = 0 
            this.entityData = []
            const response = await this.entityService.getAll<any>(this.entityPaginate)
            if (response.data?.length) {
                this.entityData = response.data
            }
        }
    },
    mounted(){
        this.entityService = this.service as Service
        this.entityPaginate = this.paginate as Paginate
        const int = setInterval(() => {
            this.entityData = this.data
            if (this.entityData) {
                clearInterval(int)
            }
        }, 500)
        const dt = this.$refs.dataTable as any
        const wrapper = dt?.$el.querySelector('.p-datatable-wrapper')
        if (wrapper) {
            wrapper.addEventListener('scroll', this.onScroll)
        }

        this.$nextTick(() => {
            this.calcTableHeight()
        
            this.observer = new ResizeObserver(() => {
              this.calcTableHeight()
            })
        
            // observa o container pai do componente
            if (this.$el) {
              this.observer.observe(this.$el)
            }
            this.observer.observe(document.body)
        })
    }
})