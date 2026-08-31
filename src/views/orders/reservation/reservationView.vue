<template>
    <PageTemplate
        title="Reservas"
    >
        <div class="row">
            <div class="stat-cards">
                <div class="stat-card">
                    <div class="stat-card-icon" style="background:#EAF5F5">
                        <svg viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="13" rx="2" stroke="#0E7C7B" stroke-width="1.3"/><path d="M1 6h14M5 1v3M11 1v3" stroke="#0E7C7B" stroke-width="1.3" stroke-linecap="round"/></svg>
                    </div>
                    <div>
                        <div class="stat-v">8</div>
                        <div class="stat-l">Hoje</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-icon" style="background:#ECFDF5">
                        <svg viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="#059669" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <div>
                        <div class="stat-v">5</div>
                        <div class="stat-l">Confirmadas</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-icon" style="background:#FFFBEB">
                        <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#D97706" stroke-width="1.3"/><path d="M8 5v3.5l2 1.5" stroke="#D97706" stroke-width="1.3" stroke-linecap="round"/></svg>
                    </div>
                    <div>
                        <div class="stat-v">2</div>
                        <div class="stat-l">Pendentes</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-icon" style="background:#EFF6FF">
                        <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="5" width="12" height="8" rx="1.5" stroke="#2563EB" stroke-width="1.3"/><path d="M5 5V4a3 3 0 016 0v1" stroke="#2563EB" stroke-width="1.3" stroke-linecap="round"/></svg>
                    </div>
                    <div>
                        <div class="stat-v">1</div>
                        <div class="stat-l">Sentados agora</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-shrink:0;">
                <div class="date-tabs">
                    <div @click="applyFilter('yesterday')" :class="activeDayFilterOn('yesterday')" class="dt">Ontem</div>
                    <div @click="applyFilter('today')" :class="activeDayFilterOn('today')" class="dt">Hoje</div>
                    <div @click="applyFilter('tomorrow')" :class="activeDayFilterOn('tomorrow')" class="dt">Amanhã</div>
                    <div class="dt d-none" @click="applyFilter('week')" :class="activeDayFilterOn('week')">Esta semana</div>
                    <div class="d-flex align-items-center gap-2">
                        <label>De</label>
                        <DatePicker
                            v-model="filters.date_from"
                            style="width: 140px;"
                            @date-selected="applyFilter('')"
                        />
                        <label>Até</label>
                        <DatePicker
                            v-model="filters.date_to"
                            style="width: 140px;"
                            @date-selected="applyFilter('')"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="timeline" id="timeline">
                <div v-for="(reservations, timeGroup) in data" class="tl-section">
                    <div class="tl-hour">{{timeGroup}}:00</div>
                    <div
                        class="res-card"
                        v-for="reservation in reservations"
                        @click="getReservation(reservation)"
                        :class="reservation.status.severity"
                    >
                        <div class="rc-time">
                            <div class="rc-time-val">{{ reservation.hour }}</div>
                            <div class="rc-time-dur">{{ reservation.duration ?? '-' }}</div>
                        </div>
                         <div class="rc-sep"></div>
                         <div class="rc-table">
                            <div class="rc-table-n">{{ reservation.table.number }}</div>
                            <div class="rc-table-l">Mesa</div>
                         </div>
                          <div class="rc-info">
                              <div class="rc-client">{{ reservation.customer }}</div>
                               <div class="rc-meta">
                                   <div class="rc-meta-item">
                                        <svg viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="4" r="2" stroke="currentColor" stroke-width="1.1"/><path d="M1.5 10c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
                                        {{ reservation.quantity_of_person }} pessoas
                                    </div>
                                     <div class="rc-meta-item">
                                        <svg viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="3.5" r="1.5" stroke="currentColor" stroke-width="1.1"/><path d="M2 9.5c0-1.9 1.6-3.5 3.5-3.5S9 7.6 9 9.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
                                        {{ reservation?.waiter?.name ?? '-'}}
                                     </div>
                                     <div class="rc-meta-item" style="color:#D97706">
                                        <svg viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" stroke-width="1.1"/><path d="M5.5 4v2M5.5 7.5v.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
                                        Obs.
                                     </div>
                               </div>
                          </div>
                           <span class="rc-badge" :class="reservation.status.label_severity">{{ reservation.status.label }}</span>
                           <div class="rc-actions" onclick="event.stopPropagation()">
                               <button class="ia confirm" title="Confirmar"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                               <button class="ia cancel" title="Cancelar"><svg viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></button>
                           </div>
                    </div>
                </div>
            </div>
        </div>
        <Form
            ref="formRef"
            :dataGrid="data"
            @submitted="onSearch"
        />
    </PageTemplate>
</template>

<style src="./style.css"></style>
<script src="./script.ts"></script>
