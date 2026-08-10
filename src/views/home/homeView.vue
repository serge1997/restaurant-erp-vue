<template>
    <PageTemplate
        title=""
        :hasNewButton="false"
    >
        <div class="greeting">
            <div class="gr-left">
                <div class="gr-title" id="greeting-txt">Bom dia, <span>{{ user.name }}</span> 👋</div>
                <div class="gr-sub text-capitalize" id="greeting-date">{{ dateToLiteral() }}</div>
            </div>
        </div>
    
         <!-- KPIs -->
        <div class="kpi-grid">
            <div class="kpi kpi-1">
                <div class="kpi-header">
                    <span class="kpi-label">Faturamento do dia</span>
                    <div class="kpi-ico" style="background:var(--al)">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M7 1v1.5M7 11.5V13M3.5 3.5l1 1M9.5 9.5l1 1M2 7H3.5M10.5 7H12M3.5 10.5l1-1M9.5 4.5l1-1" stroke="var(--ac)" stroke-width="1.2" stroke-linecap="round"/><circle cx="7" cy="7" r="2.5" stroke="var(--ac)" stroke-width="1.2"/></svg>
                    </div>
                </div>
                <div class="kpi-val sm">R$<span id="kv-rev">{{ kpis?.today?.amount }}</span></div>
                <div class="kpi-delta delta-up">↑ +{{ kpis?.today?.diff }}% vs ontem</div>
            </div>
            <div class="kpi kpi-2">
                <div class="kpi-header">
                    <span class="kpi-label">Pedidos abertos</span>
                    <div class="kpi-ico" style="background:var(--aml)">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M2 2h10M2 5h8M2 8h9M2 11h5" stroke="var(--amber)" stroke-width="1.2" stroke-linecap="round"/></svg>
                    </div>
                </div>
                <div class="kpi-val" id="kv-open">{{ kpis?.opening?.quantity }}</div>
                <div class="kpi-delta delta-neutral">de {{ kpis?.tables?.all }} mesas</div>
            </div>
            <div class="kpi kpi-3">
                <div class="kpi-header">
                    <span class="kpi-label">Pedidos fechados</span>
                    <div class="kpi-ico" style="background:var(--gl)">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="var(--green)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                </div>
                <div class="kpi-val" id="kv-closed">{{ kpis?.closed?.quantity }}</div>
                <div class="kpi-delta delta-up">↑ +{{ kpis.closed?.diff }}% vs ontem</div>
            </div>
            <div class="kpi kpi-4">
                <div class="kpi-header">
                    <span class="kpi-label">Ticket médio</span>
                    <div class="kpi-ico" style="background:var(--pl)">
                        <svg viewBox="0 0 14 14" fill="none"><rect x="2" y="4" width="10" height="7" rx="1.5" stroke="var(--purple)" stroke-width="1.2"/><path d="M2 7h10M5 7V4" stroke="var(--purple)" stroke-width="1.2" stroke-linecap="round"/></svg>
                    </div>
                </div>
                <div class="kpi-val sm">R$<span id="kv-avg">{{ kpis?.medium_ticket?.amount }}</span></div>
                <div class="kpi-delta delta-up">↑ +{{ kpis?.medium_ticket?.diff }}% vs ontem</div>
            </div>
        </div>
        
        <div class="kpi-grid" style="margin-bottom:16px;">
            <div class="kpi kpi-5">
                <div class="kpi-header">
                    <span class="kpi-label">Mesas livres</span>
                    <div class="kpi-ico" style="background:var(--bl)">
                        <svg viewBox="0 0 14 14" fill="none"><rect x="2" y="5" width="10" height="6" rx="1" stroke="var(--blue)" stroke-width="1.2"/><path d="M5 5V4a2 2 0 014 0v1" stroke="var(--blue)" stroke-width="1.2" stroke-linecap="round"/></svg>
                    </div>
                </div>
                <div class="kpi-val" id="kv-free">{{ kpis?.tables?.free }}</div>
                <div class="kpi-delta delta-neutral">de {{ kpis?.tables?.all }} mesas no total</div>
            </div>
            <div class="kpi kpi-6">
                <div class="kpi-header">
                    <span class="kpi-label">Cancelamentos</span>
                    <div class="kpi-ico" style="background:var(--rl)">
                        <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="var(--red)" stroke-width="1.2"/><path d="M5 5l4 4M9 5l-4 4" stroke="var(--red)" stroke-width="1.2" stroke-linecap="round"/></svg>
                    </div>
                </div>
                <div class="kpi-val" id="kv-cancel">{{ kpis?.cancelled?.today }}</div>
                <div 
                    class="kpi-delta"
                    :class="isUp(kpis?.cancelled?.today, kpis?.cancelled?.yesterday) ? 'delta-up' : 'delta-down'"
                >
                    ↑ {{ isUp(kpis?.cancelled?.today, kpis?.cancelled?.yesterday) ? '+' : '-' }} {{ kpis?.cancelled?.yesterday }} vs ontem
                </div>
            </div>
            <div class="kpi kpi-3" style="--after-bg:var(--green)">
                <div class="kpi-header">
                    <span class="kpi-label">Tempo médio</span>
                    <div class="kpi-ico" style="background:var(--gl)">
                        <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="var(--green)" stroke-width="1.2"/><path d="M7 4.5V7l1.5 1.5" stroke="var(--green)" stroke-width="1.2" stroke-linecap="round"/></svg>
                    </div>
                </div>
                <div class="kpi-val">28<span style="font-size:13px;font-weight:400;color:var(--t3)">min</span></div>
                <div class="kpi-delta delta-neutral">por pedido fechado</div>
            </div>
            <div class="kpi kpi-1">
                <div class="kpi-header">
                    <span class="kpi-label">Garçons ativos</span>
                    <div class="kpi-ico" style="background:var(--al)">
                        <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="var(--ac)" stroke-width="1.2"/><path d="M2.5 12c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke="var(--ac)" stroke-width="1.2" stroke-linecap="round"/></svg>
                    </div>
                </div>
                <div class="kpi-val">{{ kpis?.waiters?.quantity }}</div>
                <div class="kpi-delta delta-neutral">em serviço agora</div>
            </div>
        </div>

        <div class="section-grid">
            <!-- MESAS -->
            <div class="card">
            <div class="card-head">
                <span class="card-title">Status das mesas</span>
                <span class="card-action">Ver salão completo</span>
            </div>
            <div class="card-body">
                <div class="mesas-grid" id="mesas-grid">
                    <div 
                        v-for="table in tables"
                        :class="`mesa-btn ${tableSeverity(table?.status)}`"
                    >
                        <span class="mesa-num">{{ table.number }}</span>
                    </div>
                </div>
                <div class="mesa-legend">
                    <div class="ml-item"><div class="ml-dot" style="background:var(--green)"></div>Livre</div>
                    <div class="ml-item"><div class="ml-dot" style="background:var(--amber)"></div>Ocupada</div>
                    <div class="ml-item"><div class="ml-dot" style="background:var(--red)"></div>Conta pedida</div>
                    <div class="ml-item"><div class="ml-dot" style="background:var(--blue)"></div>Reservada</div>
                </div>
            </div>
            </div>

              <!-- PEDIDOS RECENTES -->
            <div class="card">
                <div class="card-head">
                    <span class="card-title">Pedidos em aberto</span>
                    <span @click="$router.push({name: 'orders'})" class="card-action">Ver todos</span>
                </div>
                <div class="card-body">
                    <div class="order-list" id="order-list">
                        <div v-for="order in orders" class="order-item">
                            <div class="oi-mesa">{{ order.table.number }}</div>
                            <div class="oi-info">
                                <div class="oi-client">{{ order.customer_name }}</div>
                                <div class="oi-meta">{{ order.waiter.inicial }} · há {{ order.since }}</div>
                            </div>
                            <span class="oi-badge" :class="order.status.severity">{{ order.status.label }}</span>
                            <span class="oi-val">R$ {{ orderTotal(order.items) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-head">
                    <span class="card-title">Alertas do dia</span>
                    <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:10px;background:var(--rl);color:var(--red);">3</span>
                </div>
                <div class="card-body">
                    <div class="alerts-list">
                    <div class="alert-item alert-red">
                        <div class="ai-ico"><svg viewBox="0 0 12 12" fill="none"><path d="M6 1l5 9H1l5-9z" stroke="var(--red)" stroke-width="1.2" stroke-linejoin="round"/><path d="M6 5v2M6 8.5v.5" stroke="var(--red)" stroke-width="1.2" stroke-linecap="round"/></svg></div>
                        <div class="ai-info"><div class="ai-title">Estoque crítico</div><div class="ai-sub">Coca-Cola Lata — apenas 3 un.</div></div>
                    </div>
                    <div class="alert-item alert-red">
                        <div class="ai-ico"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="var(--red)" stroke-width="1.2"/><path d="M6 3.5V6l1.5 1.5" stroke="var(--red)" stroke-width="1.2" stroke-linecap="round"/></svg></div>
                        <div class="ai-info"><div class="ai-title">Mesa 7 — conta pendente</div><div class="ai-sub">Aguardando fechamento há 1h20</div></div>
                    </div>
                    <div class="alert-item alert-warn">
                        <div class="ai-ico"><svg viewBox="0 0 12 12" fill="none"><path d="M6 1l5 9H1l5-9z" stroke="var(--amber)" stroke-width="1.2" stroke-linejoin="round"/><path d="M6 5v2M6 8.5v.5" stroke="var(--amber)" stroke-width="1.2" stroke-linecap="round"/></svg></div>
                        <div class="ai-info"><div class="ai-title">Estoque baixo</div><div class="ai-sub">Salmão Fresco — 400g restantes</div></div>
                    </div>
                    <div class="alert-item alert-teal">
                        <div class="ai-ico"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="var(--ac)" stroke-width="1.2"/><path d="M6 5v3M6 3.5v.5" stroke="var(--ac)" stroke-width="1.2" stroke-linecap="round"/></svg></div>
                        <div class="ai-info"><div class="ai-title">Reserva às 19:30</div><div class="ai-sub">Mesa 4 · 4 pessoas · Carlos M.</div></div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    </PageTemplate>
</template>
<style src="./style.css" scoped></style>
<script src="./script.ts" lang="ts"></script>