WITH date_bounds AS (
    SELECT 
        ($1 || '-01')::DATE AS start_dt,
        (($1 || '-01')::DATE + INTERVAL '1 month - 1 day')::DATE AS end_dt
)
SELECT 
    COALESCE(
        SUM(total_vista + total_prazo 
            - (desconto_vista + desconto_prazo) 
            + (acrescimo_vista + acrescimo_prazo) 
            + (frete_vista + frete_prazo) 
            - (cancel_vista + cancel_prazo) 
            - (devolucao_vista + devolucao_prazo)
        ), 0
    ) AS total_vendas_liquida
FROM date_bounds db
CROSS JOIN LATERAL total_vista_prazo(db.start_dt, db.end_dt);