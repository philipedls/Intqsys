export class SchedulerDto {
    codigo: string;
    data: string;
    status: boolean;
    cancelado: boolean;
    data_atendimento: Date;
    horarios_id_horario: string;
    servicos_id_servico: string;
    pacientes_id_paciente: string;
    empresas_id_empresa: string;
}