ARG GRAFANA_VERSION

FROM grafana/grafana:${GRAFANA_VERSION}

RUN grafana-cli plugins install redis-datasource

EXPOSE 3000