import baseService from "./baseService";

export default {
  ...baseService,
  modulePath: "reservations",
  serviceTitle: "Reservaçao",

  status(id: number, status: number) {
    return this.client.put(`${this.modulePath}/${id}/status/${status}`, {})
  },
  listByTableAndDate(tableId: number, date: string) {
    return this.client.get(`${this.modulePath}/table/${tableId}/date/${date}`)
  }
}
